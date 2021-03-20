import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

import { addGroup, updateGroup, removeGroup, removeGroups, Selectors, GroupFormData } from '../../store/slices/GroupSlice';
import ModalGroup, { CreateGroupData } from './ModalGroup';
import EnhancedTable from '../../components/DataTable';

const Groups: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  // const [groupsData, setGroupsData] = React.useState<any[]>([]);
  const [editGroup, setEditGroup] = React.useState<GroupFormData>();

  const dispatch = useAppDispatch();

  const groupsData = useAppSelector(Selectors.groups);

  const groupsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: CreateGroupData) => {
    const lastId = groupsData[groupsData.length - 1] ? groupsData[groupsData.length - 1].id + 1 : 1;

    dispatch(
      addGroup({
        id: lastId,
        ...data
      })
    );

    setModalOpen(!modalOpen);
  }

  const onEdit = (payload: string[]) => {
    console.log('editing', payload);
    const groupId = payload[payload.length - 1];
    const groupToEdit = groupsData.find(group => group.id === groupId);

    setEditGroup(groupToEdit);
  }

  const onDelete =(payload: string[]) => {
    if (window.confirm('Are you sure?')) {
      dispatch(
        removeGroups(payload)
      )
    }
  }

  return (
    <>
      <ModalGroup
        modalOpen={modalOpen}
        editGroup={editGroup}
        onSave={handleSave}
        onClose={() => setModalOpen(!modalOpen)}
      />
      <EnhancedTable
        title="Grupos"
        headers={groupsHeaders}
        data={groupsData}
        onNew={onNew}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default Groups;
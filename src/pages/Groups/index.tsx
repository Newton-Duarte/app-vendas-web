import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addGroup, updateGroup, removeGroups, Selectors, GroupFormData } from '../../store/slices/GroupSlice';
import ModalGroup from './ModalGroup';
import EnhancedTable from '../../components/DataTable';

const Groups: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingGroup, setEditingGroup] = React.useState<GroupFormData>();

  const dispatch = useAppDispatch();

  const groupsData = useAppSelector(Selectors.groups);

  const groupsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: GroupFormData) => {
    if (data.id) {
      dispatch(
        updateGroup(data)
      );
    } else {
      const lastId = groupsData[groupsData.length - 1] ? +groupsData[groupsData.length - 1].id + 1 : 1;
      data.id = lastId.toString();
  
      dispatch(
        addGroup({
          ...data
        })
      );
    }

    setModalOpen(!modalOpen);
    setEditingGroup({} as GroupFormData);
  }

  const onEdit = (payload: string[]) => {
    const groupId = payload[payload.length - 1];
    const groupToEdit = groupsData.find(group => group.id === groupId);

    setEditingGroup(groupToEdit);
    setModalOpen(true);
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
        editingGroup={editingGroup}
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
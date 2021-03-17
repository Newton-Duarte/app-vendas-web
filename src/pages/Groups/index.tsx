import React from 'react';

import ModalGroup, { CreateGroupData } from './ModalGroup';
import EnhancedTable from '../../components/DataTable';

const Groups: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [groupsData, setGroupsData] = React.useState<any[]>([]);
  const [editGroup, setEditGroup] = React.useState();

  const groupsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' }
  ]

  function onNew() {
    setModalOpen(true);
  }

  function handleSave(data: CreateGroupData) {
    const lastId = groupsData[groupsData.length - 1] ? groupsData[groupsData.length - 1].id + 1 : 1;

    setGroupsData([
      ...groupsData,
      {
        id: lastId,
        ...data
      }
    ]);

    setModalOpen(!modalOpen);
  }

  function onEdit(payload: string[]) {
    console.log('editing', payload);
    const groupId = payload[payload.length - 1];
    const groupToEdit = groupsData.find(group => group.id === groupId);

    setEditGroup(groupToEdit);
  }

  function onDelete(payload: string[]) {
    console.log('deleting', payload);
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
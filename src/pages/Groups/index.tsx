import React from 'react';

import Modal from '../../components/Modal';
import EnhancedTable from '../../components/DataTable';

const Groups: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const groupsData = [
    {
      id: '1',
      name: 'Group 01',
    },
    {
      id: '2',
      name: 'Group 02'
    },
    {
      id: '3',
      name: 'Group 03'
    },
    {
      id: '4',
      name: 'Group 04'
    },
    {
      id: '5',
      name: 'Group 05'
    }
  ];

  const groupsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' }
  ]

  function onNew() {
    setModalOpen(true);
  }

  function onEdit(payload: string[]) {
    console.log('editing', payload);
  }

  function onDelete(payload: string[]) {
    console.log('deleting', payload);
  }

  return (
    <>
      <Modal
        modalOpen={modalOpen}
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
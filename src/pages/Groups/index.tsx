import React from 'react';
import EnhancedTable from '../../components/DataTable';

const Groups: React.FC = () => {
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

  function onEdit(payload: string[]) {
    console.log('editing', payload);
  }

  function onDelete(payload: string[]) {
    console.log('deleting', payload);
  }

  return (
    <EnhancedTable
      title="Grupos"
      headers={groupsHeaders}
      data={groupsData}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default Groups;
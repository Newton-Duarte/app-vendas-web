import React from 'react';
import EnhancedTable from '../../components/DataTable';

const Products: React.FC = () => {
  const productsData = [
    {
      id: '1',
      name: 'Product 01',
      price: 10.50,
      group: 'Salgados'
    },
    {
      id: '2',
      name: 'Product 02',
      price: 10.50,
      group: 'Salgados'
    },
    {
      id: '3',
      name: 'Product 03',
      price: 10.50,
      group: 'Salgados'
    },
    {
      id: '4',
      name: 'Product 04',
      price: 10.50,
      group: 'Salgados'
    },
    {
      id: '5',
      name: 'Product 05',
      price: 10.50,
      group: 'Salgados'
    }
  ];

  const productsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' },
    { id: 'price', numeric: false, disablePadding: false, label: 'Preço' },
    { id: 'group', numeric: false, disablePadding: false, label: 'Grupo' },
  ]

  function onEdit(payload: string[]) {
    console.log('editing', payload);
  }

  function onDelete(payload: string[]) {
    console.log('deleting', payload);
  }

  return (
    <EnhancedTable
      title="Produtos"
      headers={productsHeaders}
      data={productsData}
      onNew={() => {}}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export default Products;
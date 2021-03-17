import React from 'react';
import EnhancedTable from '../../components/DataTable';
import ModalProduct, { CreateProductData } from './ModalProduct';

const Products: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [productsData, setProductsData] = React.useState<any[]>([]);
  const [editProduct, setEditProduct] = React.useState();

  const productsHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' },
    { id: 'unit', numeric: false, disablePadding: false, label: 'Unidade' },
    { id: 'buy_price', numeric: false, disablePadding: false, label: 'Preco de Compra' },
    { id: 'sale_price', numeric: false, disablePadding: false, label: 'Preco de Venda' },
    { id: 'group', numeric: false, disablePadding: false, label: 'Grupo' },
    { id: 'division', numeric: false, disablePadding: false, label: 'Divisão' },
  ];

  function onNew() {
    setModalOpen(true);
  }

  function handleSave(data: CreateProductData) {
    const lastId = productsData[productsData.length - 1] ? productsData[productsData.length - 1].id + 1 : 1;

    setProductsData([
      ...productsData,
      {
        id: lastId,
        ...data
      }
    ]);

    setModalOpen(!modalOpen);
  }

  function onEdit(payload: string[]) {
    console.log('editing', payload);
    const productId = payload[payload.length - 1];
    const productToEdit = productsData.find(product => product.id === productId);

    setEditProduct(productToEdit);
  }

  function onDelete(payload: string[]) {
    console.log('deleting', payload);
  }

  return (
    <>
      <ModalProduct
        modalOpen={modalOpen}
        editProduct={editProduct}
        onSave={handleSave}
        onClose={() => setModalOpen(!modalOpen)}
      />
      <EnhancedTable
        title="Produtos"
        headers={productsHeaders}
        data={productsData}
        onNew={onNew}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default Products;
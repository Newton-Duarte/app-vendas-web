import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addProduct, updateProduct, removeProducts, Selectors, ProductFormData } from '../../store/slices/ProductSlice';
import EnhancedTable from '../../components/DataTable';
import ModalProduct from './ModalProduct';

const Products: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<ProductFormData>();

  const dispatch = useAppDispatch();

  const productsData = useAppSelector(Selectors.products);

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

  function handleSave(data: ProductFormData) {
    if (data.id) {
      dispatch(
        updateProduct(data)
      );
    } else {
      const lastId = productsData[productsData.length - 1] ? +productsData[productsData.length - 1].id + 1 : 1;
      data.id = lastId.toString();
  
      dispatch(
        addProduct({
          ...data
        })
      );
    }

    setModalOpen(!modalOpen);
    setEditingProduct({} as ProductFormData);
  }

  function onEdit(payload: string[]) {
    const productId = payload[payload.length - 1];
    const productToEdit = productsData.find(product => product.id === productId);

    setEditingProduct(productToEdit);
    setModalOpen(true);
  }

  function onDelete(payload: string[]) {
    if (window.confirm('Are you sure?')) {
      dispatch(
        removeProducts(payload)
      )
    }
  }

  return (
    <>
      <ModalProduct
        modalOpen={modalOpen}
        editingProduct={editingProduct}
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
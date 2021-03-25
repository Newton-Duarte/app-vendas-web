import React from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addCustomer, updateCustomer, removeCustomers, Selectors, CustomerFormData } from '../../store/slices/CustomerSlice';
import ModalCustomer from './ModalCustomer';
import EnhancedTable from '../../components/DataTable';

const Customers: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState<CustomerFormData>();

  const dispatch = useAppDispatch();

  const customersData = useAppSelector(Selectors.customers);

  const customersHeaders = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Descrição' },
    { id: 'cpf_cnpj', numeric: false, disablePadding: false, label: 'CPF/CNPJ' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Telefone' },
    { id: 'email', numeric: false, disablePadding: false, label: 'E-mail' }
  ]

  const onNew = () => {
    setModalOpen(true);
  }

  const handleSave = (data: CustomerFormData) => {
    if (data.id) {
      dispatch(
        updateCustomer(data)
      );
    } else {
      const lastId = customersData[customersData.length - 1] ? +customersData[customersData.length - 1].id + 1 : 1;
      data.id = lastId.toString();
  
      dispatch(
        addCustomer({
          ...data
        })
      );
    }

    setModalOpen(!modalOpen);
    setEditingCustomer({} as CustomerFormData);
  }

  const onEdit = (payload: string[]) => {
    const customerId = payload[payload.length - 1];
    const customerToEdit = customersData.find(customer => customer.id === customerId);

    setEditingCustomer(customerToEdit);
    setModalOpen(true);
  }

  const onDelete =(payload: string[]) => {
    if (window.confirm('Are you sure?')) {
      dispatch(
        removeCustomers(payload)
      )
    }
  }

  return (
    <>
      <ModalCustomer
        modalOpen={modalOpen}
        editingCustomer={editingCustomer}
        onSave={handleSave}
        onClose={() => setModalOpen(!modalOpen)}
      />
      <EnhancedTable
        title="Clientes"
        headers={customersHeaders}
        data={customersData}
        onNew={onNew}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default Customers;
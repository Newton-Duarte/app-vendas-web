import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { CustomerFormData } from '../../../store/slices/CustomerSlice';
import { createCustomerModel } from '../customerUtils';
import TheSelect from '../../../components/TheSelect';

const useStyles = makeStyles({
  paper: {
    background: '#F0F0F5'
  }
});

interface ModalCustomerProps {
  modalOpen: boolean;
  editingCustomer: CustomerFormData | undefined;
  onSave(data: CustomerFormData): any;
  onClose(): void;
}

const ModalCustomer: React.FC<ModalCustomerProps> = ({
  modalOpen,
  editingCustomer,
  onSave,
  onClose
}) => {
  const customerObj = editingCustomer ? createCustomerModel(editingCustomer) : createCustomerModel() as CustomerFormData;
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CustomerFormData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        id: Yup.string(),
        type: Yup.string().required('Tipo do cliente obrigatório'),
        name: Yup.string().required('Nome do cliente obrigatório'),
        cpf_cnpj: Yup.string(),
        rg_ie: Yup.string(),
        birthdate: Yup.string(),
        phone: Yup.string(),
        email: Yup.string(),
        note: Yup.string()
      });
  
      await schema.validate(data, {
        abortEarly: false
      });

      onSave(data);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
  
        return;
      }

      // TODO: Create Toast
      console.log('Error', error);
    }
  }, [onSave]);

  return (
    <Modal
      modalOpen={modalOpen}
      onClose={onClose}
      classes={classes}
    >
      <DialogTitle id="form-dialog-title">Novo Cliente</DialogTitle>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={customerObj}
      >
        <DialogContent dividers>
          <TheSelect
            name="type"
            label="Tipo"
            onSelectChange={() => {}}
          />
          <Input
            type="hidden"
            id="id"
            name="id"
          />
          <Input
            variant="filled"
            margin="normal"
            id="name"
            name="name"
            label="Nome/Razão Social"
            autoFocus
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="cpf_cnpj"
            name="cpf_cnpj"
            label="CPF/CNPJ"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="rg_ie"
            name="rg_ie"
            label="RG/IE"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            type="date"
            id="birthdate"
            name="birthdate"
            label="Nascimento"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            type="tel"
            id="phone"
            name="phone"
            label="Telefone"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            type="email"
            id="email"
            name="email"
            label="E-mail"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="note"
            name="note"
            label="Note"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Form>
    </Modal>
  );
}

export default ModalCustomer;
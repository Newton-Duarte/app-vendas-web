import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import getValidationErrors from '../../../utils/getValidationErrors';

const useStyles = makeStyles({
  paper: {
    background: '#F0F0F5'
  }
})

export interface ProductFormData {
  id: string;
  name: string;
  unit: string;
  sale_price: string;
  buy_price: string;
  group: string;
  division: string
}

export interface CreateProductData {
  name: string;
  unit: string;
  sale_price: string;
  buy_price: string;
  group: string;
  division: string
}

interface ModalProductProps {
  modalOpen: boolean;
  editProduct: ProductFormData | undefined;
  onSave(data: Omit<ProductFormData, 'id'>): any;
  onClose(): void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  modalOpen,
  onSave,
  onClose
}) => {
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CreateProductData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do produto obrigatório'),
        unit: Yup.string().required('Unidade do produto obrigatório'),
        sale_price: Yup.string().required('Preco de venda do produto obrigatório'),
        buy_price: Yup.string().required('Preco de compra do produto obrigatório'),
        group: Yup.string().required('Grupo do produto obrigatório'),
        division: Yup.string().required('Divisão do produto obrigatório')
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

      // TODO: Criar Toast
      console.log('Error', error);
    }
  }, [onSave]);

  return (
    <Modal
      modalOpen={modalOpen}
      onClose={onClose}
      classes={classes}
    >
      <DialogTitle id="form-dialog-title">Novo Produto</DialogTitle>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <DialogContent dividers>
          <Input
            variant="filled"
            margin="normal"
            id="name"
            name="name"
            label="Produto"
            autoFocus
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="unit"
            name="unit"
            label="Unidade"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="sale_price"
            name="sale_price"
            label="Preco de Venda"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="buy_price"
            name="buy_price"
            label="Preco de Compra"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="group"
            name="group"
            label="Grupo"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="division"
            name="division"
            label="Divisão"
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

export default ModalProduct;
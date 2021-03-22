import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import Combobox from '../../../components/Combobox';
import getValidationErrors from '../../../utils/getValidationErrors';
import { ProductFormData } from '../../../store/slices/ProductSlice';
import { Selectors } from '../../../store/slices/GroupSlice';

const useStyles = makeStyles({
  paper: {
    background: '#F0F0F5'
  }
})

interface ModalProductProps {
  modalOpen: boolean;
  editingProduct: ProductFormData | undefined;
  onSave(data: ProductFormData): any;
  onClose(): void;
}

const ModalProduct: React.FC<ModalProductProps> = ({
  modalOpen,
  editingProduct,
  onSave,
  onClose
}) => {

  const productObj = editingProduct ? editingProduct : {} as ProductFormData;
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const dispatch = useAppDispatch();

  const groupsData = useAppSelector(Selectors.groups);

  const handleSubmit = useCallback(async (data: ProductFormData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        id: Yup.string(),
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
        initialData={productObj}
      >
        <DialogContent dividers>
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
          <Combobox
            id="group"
            name="group"
            label="Grupo"
            optionTitle="name"
            options={groupsData}
          />
          <Combobox
            id="division"
            name="division"
            label="Divisão"
            optionTitle="name"
            options={groupsData}
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
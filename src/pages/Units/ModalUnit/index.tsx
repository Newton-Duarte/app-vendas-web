import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { UnitFormData } from '../../../store/slices/UnitSlice';
// import TheCheckbox from '../../../components/TheCheckbox';

const useStyles = makeStyles({
  paper: {
    background: '#F0F0F5'
  }
});

interface ModalUnitProps {
  modalOpen: boolean;
  editingUnit: UnitFormData | undefined;
  onSave(data: UnitFormData): any;
  onClose(): void;
}

const ModalUnit: React.FC<ModalUnitProps> = ({
  modalOpen,
  editingUnit,
  onSave,
  onClose
}) => {
  const unitObj = editingUnit ? editingUnit : {} as UnitFormData;
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: UnitFormData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required('Nome da unidade obrigatório'),
        abbreviation: Yup.string().required('abreviação da unidade obrigatório'),
        quantity: Yup.string().required('Quantidade da unidade obrigatório')
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
      <DialogTitle id="form-dialog-title">Nova Unidade</DialogTitle>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={unitObj}
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
            label="Unidade"
            autoFocus
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="abbreviation"
            name="abbreviation"
            label="Abreviação"
            fullWidth
          />
          <Input
            variant="filled"
            margin="normal"
            id="quantity"
            name="quantity"
            label="Quantidade"
            fullWidth
          />
          {/* TODO: Learn how to use checkbox true or false fields */}
          {/* <TheCheckbox
            name="is_fraction"
            label="Fracionada?"
            value="is_fraction"
          /> */}
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

export default ModalUnit;
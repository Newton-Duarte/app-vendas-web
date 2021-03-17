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

export interface GroupFormData {
  id: string;
  name: string;
}

export interface CreateGroupData {
  name: string;
}

interface ModalGroupProps {
  modalOpen: boolean;
  editGroup: GroupFormData | undefined;
  onSave(data: Omit<GroupFormData, 'id'>): any;
  onClose(): void;
}

const ModalGroup: React.FC<ModalGroupProps> = ({
  modalOpen,
  onSave,
  onClose
}) => {
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CreateGroupData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do grupo obrigatório')
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
      <DialogTitle id="form-dialog-title">Novo Grupo</DialogTitle>
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
            label="Grupo"
            autoFocus
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

export default ModalGroup;
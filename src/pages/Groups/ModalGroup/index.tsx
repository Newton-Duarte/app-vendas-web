import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import getValidationErrors from '../../../utils/getValidationErrors';
import { GroupFormData } from '../../../store/slices/GroupSlice';

const useStyles = makeStyles({
  paper: {
    background: '#F0F0F5'
  }
});

interface ModalGroupProps {
  modalOpen: boolean;
  editingGroup: GroupFormData | undefined;
  onSave(data: GroupFormData): any;
  onClose(): void;
}

const ModalGroup: React.FC<ModalGroupProps> = ({
  modalOpen,
  editingGroup,
  onSave,
  onClose
}) => {
  const groupObj = editingGroup ? editingGroup : {} as GroupFormData;
  const classes = useStyles();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: GroupFormData) => {
    try {
      formRef.current?.setErrors({});
  
      const schema = Yup.object().shape({
        id: Yup.string(),
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
        initialData={groupObj}
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
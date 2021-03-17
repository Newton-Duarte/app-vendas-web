import React from 'react';
import { Dialog } from '@material-ui/core';

interface ModalProps {
  classes: any;
  modalOpen: boolean;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({
  classes,
  modalOpen,
  onClose,
  children,
  ...rest
}) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      classes={classes}
      {...rest}
    >
      {children}
    </Dialog>
  );
}

export default Modal;
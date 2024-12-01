import React from 'react';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";

const ConfirmPopup = ({ open, onClose, onConfirm, type, module }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      getPersistentElements={() => document.querySelectorAll(".Toastify")}
      backdrop={<div className="backdrop" />}
      className="dialog"
    >
      <DialogHeading className="heading">Are you sure?</DialogHeading>
      <p className="description">You want to {type === "update" ? 'Update' : 'Delete'} the {module}</p>
      <div className="buttons">
        <div onClick={onConfirm}>
          <Button className="button">{type === "update" ? 'Update' : 'Delete'}</Button>
        </div>
        <DialogDismiss className="button secondary" onClick={onClose}>
          Cancel
        </DialogDismiss>
      </div>
    </Dialog>
  );
};

export default ConfirmPopup;

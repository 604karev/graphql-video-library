import React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BlockIcon from "@mui/icons-material/Block";

import withHoc from "./MoviesDialogHoc";
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const MoviesDialog = (props: any) => {
  const handleDelete = () => {
    const { id, handleClose, deleteMovie } = props;
    deleteMovie(id);
    handleClose();
  };

  const { open, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sire that you want to delete element?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you click 'Confirm' this element will be removed from data base.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonBase onClick={handleClose} color="primary">
          <BlockIcon /> Cancel
        </ButtonBase>
        <ButtonBase onClick={handleDelete} color="primary" autoFocus>
          <DeleteForeverIcon /> Confirm
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
};

export default withHoc(MoviesDialog);

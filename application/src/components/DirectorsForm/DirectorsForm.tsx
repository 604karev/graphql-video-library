import React from "react";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SaveIcon from "@mui/icons-material/Save";

import withHocs from "./DirectorsFormHoc";
import { ButtonBase } from "@mui/material";
import theme from "../theme";

const DirectorsForm = (props: any):any => {
  const handleClose = () => {
    props.onClose();
  };

  const handleSave = () => {
    const { selectedValue, onClose, addDirector, updateDirector } = props;
    const { id, name, age } = selectedValue;
    id
      ? updateDirector({ id, name, age: Number(age) })
      : addDirector({ name, age: Number(age) });
    onClose();
  };

  const { classes, open, handleChange, selectedValue = {} } = props;
  const { name, age } = selectedValue;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Director information
      </DialogTitle>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={handleChange("name")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Age"
          className={classes.textField}
          value={age}
          onChange={handleChange("age")}
          type="number"
          margin="normal"
          variant="outlined"
        />
        <div className={classes.wrapper}>
          <ButtonBase
            sx={{ backgroundColor: theme.palette.primary.main }}
            onClick={handleSave}
            color="primary"
            className={classes.button}
          >
            <SaveIcon /> Save
          </ButtonBase>
        </div>
      </form>
    </Dialog>
  );
};

export default withHocs(DirectorsForm);

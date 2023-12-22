import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SaveIcon from "@mui/icons-material/Save";

import withHocs from "./MoviesFormHoc";
import { ButtonBase } from "@mui/material";
import theme from "../theme";

const MoviesForm = (props:any) => {
  const inputEl = useRef(null);
  const handleClose = () => {
    props.onClose();
  };

  const handleSave = () => {
    const { selectedValue, onClose, addMovie, updateMovie } = props;
    const { id, name, genre, rate, directorId, watched } = selectedValue;
    id
      ? updateMovie({
          id,
          name,
          genre,
          directorId,
          rate: Number(rate),
          watched: Boolean(watched),
        })
      : addMovie({
          name,
          genre,
          directorId,
          rate: Number(rate),
          watched: Boolean(watched),
        });
    onClose();
  };

  const {
    data = {},
    classes,
    open,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    selectedValue = {},
  } = props;
  const { name, genre, rate, directorId, watched } = selectedValue;
  const { directors = [] } = data;
  // console.log(props)
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Movie information
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
          id="outlined-genre"
          label="Genre"
          className={classes.textField}
          value={genre}
          onChange={handleChange("genre")}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-rate"
          label="Rate"
          value={rate}
          onChange={handleChange("rate")}
          type="number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <FormControl variant="outlined" className={classes.formControlSelect}>
          <InputLabel ref={inputEl} htmlFor="outlined-age-simple">
            Director
          </InputLabel>
          <Select
            value={directorId}
            onChange={handleSelectChange}
            input={<OutlinedInput name="directorId" id="outlined-director" />}
          >
            {directors.map((director: any) => (
              <MenuItem key={director.id} value={director.id}>
                {director.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.wrapper}>
          <FormControlLabel
            control={
              <Checkbox
                checked={watched}
                onChange={handleCheckboxChange("watched")}
                value="watched"
              />
            }
            label="Watched movie"
          />
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

export default withHocs(MoviesForm);

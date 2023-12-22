import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import MoviesTable from "../MoviesTable/MoviesTable";
import MoviesForm from "../MoviesForm/MoviesForm";

import { Box } from "@mui/material";
import withHocs from './MoviesHoc';


export const lazyStateChange = (name, value, stateSetter) => {
  stateSetter((state) => ({ ...state, ...{ [name]: value } }));
};

const Movies = (props) => {
  const [state, setState] = useState({
    open: false,
    name: "",
    genre: "",
    watched: false,
    rate: 0,
    directorId: "",
  });
  const { id, name, genre, watched, rate, directorId, open } = state;

  const handleClickOpen = (data = {}) => {
    setState({
      ...state,
      open: true,
      ...data,
      directorId: data.director ? data.director.id : "",
    });
  };

  const handleClose = () => {
    setState({
      name: "",
      genre: "",
      watched: false,
      rate: 0,
      directorId: "",
      open: false,
    });
  };

  const handleSelectChange = ({ target }) => {
    lazyStateChange(target.name, target.value, setState);
  };
  const handleCheckboxChange =
    (name) =>
    ({ target }) => {
      lazyStateChange(name, target.checked, setState);
    };
  const handleChange =
    (name) =>
    ({ target }) => {
      lazyStateChange(name, target.value, setState);
    };

  return (
    <>
      <MoviesForm
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCheckboxChange={handleCheckboxChange}
        selectedValue={{ id, name, genre, watched, rate, directorId }}
        open={open}
        onClose={handleClose}
      />
      <Box
        sx={{
          position: "relative",
          minHeight: "calc(100vh - 24px * 2 - 72px)",
        }}
      >
        <MoviesTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab
          onClick={() => handleClickOpen()}
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default withHocs(Movies)

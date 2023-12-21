import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DirectorsTable from '../DirectorsTable/DirectorsTable';
import DirectorsForm from '../DirectorsForm/DirectorsForm';
import { lazyStateChange } from "../Movies/Movies";

import withHocs from './DirectorsHoc';

const Directors = (props) => {
  const [state, setState] = useState({
    open: false,
    name: '',
    age: 0,
  })


  const handleClickOpen = (data) => {
    setState({
      ...state,
      open: true,
      ...data,
    });
  };

  const handleClose = () => {
    setState({
      name: '',
      age: 0,
      id: null,
      open: false
    });
  };


  const handleChange = name => ({ target }) => {
    lazyStateChange(name, target.value, setState)
  };


  const { name, age, id, open } = state;
  const { classes } = props;

  return (
    <>
      <DirectorsForm handleChange={handleChange} selectedValue={{ name, age, id }} open={open} onClose={handleClose} />
      <div className={classes.wrapper}>
        <DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab onClick={() => handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );

};

export default withHocs(Directors);

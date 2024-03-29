import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DirectorsTable from "../DirectorsTable/DirectorsTable";
import DirectorsForm from "../DirectorsForm/DirectorsForm";
import { lazyStateChange } from "../Movies/Movies";
import withHocs from "./DirectorsHoc";
import { Box } from "@mui/material";

const Directors = (props: any) => {
  const [state, setState] = useState<any>({
    open: false,
    name: "",
    age: 0,
  });

  const handleClickOpen = (data: any) => {
    setState({
      ...state,
      open: true,
      ...data,
    });
  };

  const handleClose = () => {
    setState({
      name: "",
      age: 0,
      id: null,
      open: false,
    });
  };

  const handleChange =
    (name: string) =>
    ({ target }: any) => {
      lazyStateChange(name, target.value, setState);
    };

  const { name, age, id, open } = state;

  return (
    <>
      <DirectorsForm
        handleChange={handleChange}
        selectedValue={{ name, age, id }}
        open={open}
        onClose={handleClose}
      />
      <Box
        sx={{
          position: "relative",
          minHeight: "calc(100vh - 24px * 2 - 72px)",
        }}
      >
        <DirectorsTable onOpen={handleClickOpen} onClose={handleClose} />
        <Fab
          onClick={() => handleClickOpen(null)}
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default withHocs(Directors);

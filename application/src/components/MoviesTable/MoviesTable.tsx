import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import MoviesDialog from "../MoviesDialog/MoviesDialog";
import MoviesSearch from "../MoviesSearch/MoviesSearch";

import withHocs from "./MoviesTableHoc";

const MoviesTable = (props: any) => {
  const [state, setState] = useState<any>({
    anchorEl: null,
    openDialog: false,
    name: "",
  });
  const { anchorEl, openDialog, data: activeElem = {}, name } = state;
  const { classes, data = {}, onOpen } = props;
  const { movies = [] } = data;

  const handleChange =
    (name: string) =>
    ({ target: { value } }: any) => {
      setState((state: any) => ({ ...state, ...{ [name]: value } }));
    };

  const handleSearch = (e: any) => {
    if (e.charCode === 13) {
      data.fetchMore({
        variables: { name },
        updateQuery: (previousResult: any, { fetchMoreResult }: any) =>
          fetchMoreResult,
      });
    }
  };

  const handleDialogOpen = () => {
    setState((state: any) => ({ ...state, ...{ openDialog: true } }));
  };
  const handleDialogClose = () => {
    setState((state: any) => ({ ...state, ...{ openDialog: false } }));
  };

  const handleClick = ({ currentTarget }: any, data: any) => {
    setState((state: any) => ({
      ...state,
      ...{
        anchorEl: currentTarget,
        data,
      },
    }));
  };

  const handleClose = () => {
    setState((state: any) => ({ ...state, ...{ anchorEl: null } }));
  };

  const handleEdit = () => {
    onOpen(state.data);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
    handleClose();
  };

  return (
    <>
      <Paper>
        <MoviesSearch
          name={name}
          handleChange={handleChange}
          handleSearch={handleSearch}
        />
      </Paper>
      <MoviesDialog
        open={openDialog}
        handleClose={handleDialogClose}
        id={activeElem.id}
      />
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell>Director</TableCell>
              <TableCell>Watched</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie: any) => {
              return (
                <TableRow key={movie.id}>
                  <TableCell component="th" scope="row">
                    {movie.name}
                  </TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell align="right">{movie.rate}</TableCell>
                  <TableCell>{movie.director && movie.director.name}</TableCell>
                  <TableCell>
                    <Checkbox checked={movie.watched} disabled />
                  </TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton
                        color="inherit"
                        onClick={(e) => handleClick(e, movie)}
                      >
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleEdit}>
                          <CreateIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                          <DeleteIcon /> Delete
                        </MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default withHocs(MoviesTable);

import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import withHocs from "./MoviesSearchHoc";

const MoviesSearch = (props:any):any => {
  const { classes, name, handleChange, handleSearch } = props;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={handleChange("name")}
        value={name}
        onKeyPress={(e) => handleSearch(e)}
        placeholder="Search…"
        classes={{
          root: classes.inputInput,
          input: classes.inputRoot,
        }}
      />
    </div>
  );
};

export default withHocs(MoviesSearch);

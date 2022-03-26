import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './MoviesSearchHoc';

const MoviesSearch = (props) => {


    const { classes, name, handleChange, handleSearch } = props;

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                onChange={handleChange('name')}
                value={name}
                onKeyPress={e => handleSearch(e)}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
        </div>
    );

};

export default withHocs(MoviesSearch);

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import CameraIcon from "@mui/icons-material/Camera";
import Movies from "../Movies/Movies";
import Directors from "../Directors/Directors";

import withHocs from "./TabsHoc";

const TabContainer = ({ children, dir }: any) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

const SimpleTabs = (props: any) => {
  const [value, setValue] = useState(0);
  const { classes, theme } = props;
  const handleChange = (event: any, value: any) => setValue(value);
  const handleChangeIndex = (index: any) => setValue(index);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          textColor="inherit"
          indicatorColor="secondary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Movies" icon={<CameraIcon />} />
          <Tab label="Directors" icon={<MovieCreationIcon />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        containerStyle={{
          transition: "transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s",
        }}
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <Movies />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Directors />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default withHocs(SimpleTabs);

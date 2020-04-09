import React from "react";
import { Paper, Tabs, makeStyles, Tab } from "@material-ui/core";
import GeographyIcon from "../CustomIcon/GeographyIcon";
import SportsIcon from "../CustomIcon/SportsIcon";
import ScienceIcon from "../CustomIcon/ScienceIcon";
import MiscIcon from "../CustomIcon/MiscIcon";
import PopCultureIcon from "../CustomIcon/PopCultureIcon";
import HistoryIcon from "../CustomIcon/HistoryIcon";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 50,
    fontSize: "0.6rem",
  },
}));

const CategoryTabs = (props) => {
  const { value, handleChange } = props;
  const classes = useStyles();
  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab
          classes={classes}
          icon={<GeographyIcon fontSize={"large"} />}
          label={"Geo"}
        />
        <Tab
          classes={classes}
          icon={<SportsIcon fontSize={"large"} />}
          label={"Sports"}
        />
        <Tab
          classes={classes}
          icon={<PopCultureIcon fontSize={"large"} />}
          label={"Culture"}
        />
        <Tab
          classes={classes}
          icon={<HistoryIcon fontSize={"large"} />}
          label={"History"}
        />
        <Tab
          classes={classes}
          icon={<ScienceIcon fontSize={"large"} />}
          label={"Science"}
        />
        <Tab
          classes={classes}
          icon={<MiscIcon fontSize={"large"} />}
          label={"Misc"}
        />
      </Tabs>
    </Paper>
  );
};

export default CategoryTabs;

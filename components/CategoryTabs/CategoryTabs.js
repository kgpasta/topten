import React from "react";
import { Paper, Tabs, makeStyles, Tab } from "@material-ui/core";
import Categories from "../../constants/Categories";

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
        onChange={(_, val) => handleChange(val)}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        {Object.entries(Categories).map(([slug, category]) => (
          <Tab
            key={slug}
            value={slug}
            classes={classes}
            icon={<category.icon fontSize={"large"} />}
            label={category.label}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default CategoryTabs;

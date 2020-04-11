import React from "react";
import { List, makeStyles, CircularProgress } from "@material-ui/core";
import TopTenCard from "../TopTenCard/TopTenCard";

const useStyles = makeStyles(() => ({
  list: {
    margin: 10,
  },
}));

const CategoryList = (props) => {
  const { loading, topTens, setOpen } = props;
  const classes = useStyles();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List className={classes.list}>
      {topTens.map((topTen) => (
        <TopTenCard key={topTen.id} topTen={topTen} setOpen={setOpen} />
      ))}
    </List>
  );
};

export default CategoryList;

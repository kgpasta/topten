import React from "react";
import { List, makeStyles, CircularProgress } from "@material-ui/core";
import TopTenCard from "../TopTenCard/TopTenCard";

const useStyles = makeStyles(() => ({
  list: {
    margin: 10,
  },
  circular: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
}));

const CategoryList = (props) => {
  const { loading, topTens, setOpen } = props;
  const classes = useStyles();

  if (loading) {
    return (
      <div className={classes.circular}>
        <CircularProgress />
      </div>
    );
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

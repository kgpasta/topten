import React from "react";
import { Typography, makeStyles, Paper } from "@material-ui/core";
import Categories from "../../constants/Categories";

const useStyles = makeStyles(() => ({
  card: {
    margin: 10,
    padding: 10,
  },
  icon_row: {
    marginLeft: -4,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginTop: 6,
  },
}));

const TopTenHeader = (props) => {
  const { room } = props;
  const classes = useStyles();
  const category = room && Categories[room.topTen.category];

  return (
    <Paper className={classes.card}>
      <div className={classes.icon_row}>
        {<category.icon />}
        <div className={classes.label}>{`${category.label}`}</div>
      </div>
      <Typography variant={"h6"}>{`${room.topTen.name}`}</Typography>
      <Typography
        variant={"caption"}
      >{`${room.topTen.description}`}</Typography>
    </Paper>
  );
};

export default TopTenHeader;

import React from "react";
import {
  ListItemText,
  Card,
  CardActionArea,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
  actionArea: {
    padding: 10,
  },
}));

const TopTenCard = (props) => {
  const classes = useStyles();
  const { topTen, setOpen } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => setOpen(true)}
      >
        <ListItemText
          primary={topTen.name}
          secondary={<React.Fragment>{topTen.description}</React.Fragment>}
        />
      </CardActionArea>
    </Card>
  );
};

export default TopTenCard;

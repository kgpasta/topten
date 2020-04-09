import React from "react";
import {
  List,
  ListItemText,
  Typography,
  Card,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  list: {
    margin: 10,
  },
  card: {
    padding: 10,
  },
}));

const CategoryList = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <Card className={classes.card}>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </Card>
    </List>
  );
};

export default CategoryList;

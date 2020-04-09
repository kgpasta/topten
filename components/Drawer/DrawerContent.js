import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { MoveToInbox, Mail } from "@material-ui/icons";
import { TextPrimary } from "../../constants/Colors";

const useStyles = makeStyles(() => ({
  icon: {
    color: TextPrimary,
  },
  spacer: {
    minHeight: 64,
  },
}));

const DrawerContent = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.spacer} />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <MoveToInbox className={classes.icon} />
              ) : (
                <Mail className={classes.icon} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;

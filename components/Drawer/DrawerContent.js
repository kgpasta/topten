import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Help, Favorite, Info, MeetingRoom } from "@material-ui/icons";
import { TextPrimary } from "../../constants/Colors";

const useStyles = makeStyles(() => ({
  icon: {
    color: TextPrimary,
  },
  spacer: {
    minHeight: 64,
  },
}));

const sections = (classes) => [
  {
    label: "How to Play",
    icon: <Help className={classes.icon} />,
  },
  {
    label: "Join a Room",
    icon: <MeetingRoom className={classes.icon} />,
  },
  {
    label: "Donate",
    icon: <Favorite className={classes.icon} />,
  },
  {
    label: "About",
    icon: <Info className={classes.icon} />,
  },
];

const DrawerContent = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.spacer} />
      <Divider />
      <List>
        {sections(classes).map(({ label, icon }) => (
          <ListItem button key={label}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;

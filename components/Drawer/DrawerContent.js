import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Help, Favorite, Info } from "@material-ui/icons";
import Link from "next/link";
import { TextPrimary } from "../../constants/Colors";

const useStyles = makeStyles(() => ({
  icon: {
    color: TextPrimary,
  },
  spacer: {
    minHeight: 64,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 48,
    cursor: "pointer",
  },
}));

const sections = (classes) => [
  {
    label: "How to Play",
    icon: <Help className={classes.icon} />,
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
      <div className={classes.spacer}>
        <Link href="/">
          <img
            src={"/logo.png"}
            alt={"Top Ten Logo"}
            className={classes.logo}
          />
        </Link>
      </div>
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

import React from "react";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  image: {
    height: 30,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    objectFit: "contain",
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => props.setMobileOpen(true)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <img
          alt="TopTen"
          src="/top10_logo_horizontal.svg"
          className={classes.image}
        />
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

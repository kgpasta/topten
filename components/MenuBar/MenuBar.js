import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { MeetingRoom } from "@material-ui/icons";

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
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.row}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => props.setMobileOpen(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <img
              alt="TopTen"
              src="/top10_logo_horizontal.svg"
              className={classes.image}
            />
          </Link>
        </Box>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          startIcon={<MeetingRoom />}
          onClick={() => props.setJoinDialog({ open: true })}
        >
          {"Join Room"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;

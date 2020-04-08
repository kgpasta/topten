import React from "react";
import {
  Hidden,
  Drawer as MaterialDrawer,
  makeStyles,
} from "@material-ui/core";
import DrawerContent from "./DrawerContent";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Drawer = (props) => {
  const classes = useStyles();
  const { container, mobileOpen, setMobileOpen } = props;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <MaterialDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerContent />
        </MaterialDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <MaterialDrawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open
        >
          <DrawerContent />
        </MaterialDrawer>
      </Hidden>
    </nav>
  );
};

export default Drawer;

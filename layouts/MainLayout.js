import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import MenuBar from "../components/MenuBar/MenuBar";
import Drawer from "../components/Drawer/Drawer";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  app: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div>
      <MenuBar setMobileOpen={setMobileOpen} />
      <Drawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={classes.app}>{props.children}</main>
    </div>
  );
};

export const getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default MainLayout;

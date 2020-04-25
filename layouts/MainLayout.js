import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import MenuBar from "../components/MenuBar/MenuBar";
import Drawer from "../components/Drawer/Drawer";
import JoinRoomDialog from "../components/JoinRoomDialog/JoinRoomDialog";

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
  const [joinDialog, setJoinDialog] = useState({ open: false });
  return (
    <div>
      <MenuBar setMobileOpen={setMobileOpen} setJoinDialog={setJoinDialog} />
      <Drawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={classes.app}>{props.children}</main>
      <JoinRoomDialog joinDialog={joinDialog} setJoinDialog={setJoinDialog} />
    </div>
  );
};

export const getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default MainLayout;

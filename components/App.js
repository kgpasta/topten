import React, { useState } from "react";
import MenuBar from "./MenuBar/MenuBar";
import { ThemeProvider } from "@material-ui/core";
import Theme from "../constants/Theme";
import Drawer from "./Drawer/Drawer";

const App = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <ThemeProvider theme={Theme}>
      <MenuBar setMobileOpen={setMobileOpen} />
      <Drawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>{props.children}</main>
    </ThemeProvider>
  );
};

export default App;

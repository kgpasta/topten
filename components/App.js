import React, { useState } from "react";
import MenuBar from "./MenuBar/MenuBar";
import Drawer from "./Drawer/Drawer";

const App = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div>
      <MenuBar setMobileOpen={setMobileOpen} />
      <Drawer mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>{props.children}</main>
    </div>
  );
};

export default App;

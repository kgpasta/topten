import { createMuiTheme } from "@material-ui/core";
import { Primary, Secondary, Background, Paper } from "./Colors";

const Theme = createMuiTheme({
  type: "dark",
  palette: {
    primary: { main: Primary },
    secondary: { main: Secondary },
    background: { default: Background, paper: Paper },
  },
});

export default Theme;

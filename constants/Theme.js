import { createMuiTheme } from "@material-ui/core";
import {
  Primary,
  Secondary,
  Background,
  Paper,
  TextPrimary,
  TextSecondary,
} from "./Colors";

const Theme = createMuiTheme({
  type: "dark",
  palette: {
    text: {
      primary: TextPrimary,
      secondary: TextSecondary,
    },
    primary: { main: Primary },
    secondary: { main: Secondary },
    background: { default: Background, paper: Paper },
  },
});

export default Theme;

import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const ErrorSnackbar = (props) => {
  const { snack, setSnack } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snack.open}
      autoHideDuration={6000}
      onClose={() => setSnack({ open: false })}
      message={snack.message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setSnack({ open: false })}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default ErrorSnackbar;

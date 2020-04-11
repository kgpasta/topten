import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const CreateRoomDialog = (props) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const createRoom = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{"Create a Room"}</DialogTitle>
      <DialogContent>
        <TextField
          color="secondary"
          autoFocus
          margin="none"
          id="roomName"
          label="Room Name"
          type="text"
          required
          fullWidth
        />
        <TextField
          color="secondary"
          margin="dense"
          id="yourName"
          label="Your Name"
          type="text"
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {"Cancel"}
        </Button>
        <Button onClick={createRoom} color="secondary">
          {"Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomDialog;

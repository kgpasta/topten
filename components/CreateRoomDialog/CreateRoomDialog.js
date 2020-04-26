import { useMutation } from "@apollo/react-hooks";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { CREATE_ROOM } from "../../data/mutations";
import { getUserId } from "../../data/user";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  circular: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const CreateRoomDialog = (props) => {
  const router = useRouter();
  const { roomDialog, setRoomDialog, setSnack } = props;
  const [roomName, setRoomName] = useState("");
  const [yourName, setYourName] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    setRoomDialog({ open: false, topTenId: null });
  };

  useEffect(() => {
    router.prefetch(`/room/[roomId]`);
  }, [props.roomDialog.topTenId]);

  const [createRoom, { loading }] = useMutation(CREATE_ROOM, {
    variables: {
      userId: getUserId(),
      request: {
        roomName,
        yourName,
        topTenId: roomDialog.topTenId,
      },
    },
    onCompleted: (response) => {
      const { id } = response.createRoom;
      setRoomDialog({ open: false, topTenId: null });
      router.push(`/room/${id}`);
    },
    onError: (err) => {
      setSnack({ open: true, message: err.toString(), type: "error" });
    },
  });

  const canCreate = roomName && yourName && !loading;

  return (
    <Dialog
      open={roomDialog.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{"Create a Room"}</DialogTitle>
      <DialogContent>
        {loading && (
          <div className={classes.circular}>
            <CircularProgress color="secondary" />
          </div>
        )}
        {!loading && (
          <>
            <TextField
              color="secondary"
              autoFocus
              margin="none"
              id="roomName"
              label="Room Name"
              fullWidth
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
            />
            <TextField
              color="secondary"
              margin="dense"
              id="yourName"
              label="Your Name"
              fullWidth
              value={yourName}
              onChange={(event) => setYourName(event.target.value)}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {"Cancel"}
        </Button>
        <Button
          type="submit"
          onClick={createRoom}
          color="secondary"
          disabled={!canCreate}
        >
          {"Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomDialog;

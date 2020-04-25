import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const JoinRoomDialog = (props) => {
  const router = useRouter();
  const { joinDialog, setJoinDialog } = props;
  const [roomCode, setRoomCode] = useState("");

  const handleClose = () => {
    setJoinDialog({ open: false });
  };

  useEffect(() => {
    if (roomCode.length === 9) {
      router.prefetch(`/room/[roomId]`);
    }
  }, [roomCode]);

  const joinRoom = () => {
    router.push(`/room/${format(roomCode)}`);
  };

  const format = (roomCode) => {
    if (roomCode) {
      const firstPart = roomCode.slice(0, 3);
      const secondPart = roomCode.length > 3 ? `-${roomCode.slice(3, 6)}` : "";
      const thirdPart = roomCode.length > 6 ? `-${roomCode.slice(6, 9)}` : "";

      return `${firstPart}${secondPart}${thirdPart}`;
    }

    return "";
  };

  const unformat = (val) => {
    const newVal = val.replace(/-/g, "").substring(0, 9).toUpperCase();
    setRoomCode(newVal);
  };

  return (
    <Dialog
      open={joinDialog.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{"Join a Room"}</DialogTitle>
      <DialogContent>
        <TextField
          color="secondary"
          autoFocus
          margin="none"
          id="roomCode"
          label="Room Code"
          fullWidth
          value={format(roomCode)}
          onChange={(event) => unformat(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {"Cancel"}
        </Button>
        <Button
          type="submit"
          onClick={joinRoom}
          color="secondary"
          disabled={!roomCode || (roomCode && roomCode.length !== 9)}
        >
          {"Go to Room"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomDialog;

import React, { useState } from "react";
import {
  makeStyles,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Chip,
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { getUserId, isMaster } from "../../data/user";
import { TextPrimary, Secondary } from "../../constants/Colors";
import { useMutation } from "@apollo/react-hooks";
import { JOIN_ROOM, START_GAME } from "../../data/mutations";
import { getCurrentTurn } from "../../utils";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    marginLeft: 10,
  },
  subheader: {
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  list_item: {
    paddingLeft: 2,
  },
  icon: {
    color: TextPrimary,
  },
  active_text: (props) => ({
    color: props.active && Secondary,
  }),
}));

const MemberListItem = (props) => {
  const { member, master, active } = props;
  const classes = useStyles({ active });
  return (
    <ListItem className={classes.list_item}>
      <ListItemText
        primary={`${member.name}`}
        className={classes.active_text}
      />
      {member.id === master && <Chip size="small" label="Question Master" />}
      {member.id !== master && (
        <ListItemSecondaryAction>
          <ListItemText primary={member.score || 0} />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const MemberList = (props) => {
  const { room, setSnack } = props;
  const [yourName, setYourName] = useState("");
  const classes = useStyles();
  const [joinRoom, { loading }] = useMutation(JOIN_ROOM);
  const [startGame] = useMutation(START_GAME);

  const onClick = () => {
    joinRoom({
      variables: {
        userId: getUserId(),
        request: {
          roomId: room.id,
          yourName,
        },
      },
    })
      .then(() => setSnack({ open: false }))
      .catch((err) => {
        setSnack({ open: true, message: err.toString(), type: "error" });
      });
  };

  const onStartClick = () => {
    startGame({
      variables: {
        userId: getUserId(),
        roomId: room.id,
      },
    })
      .then(() => setSnack({ open: false }))
      .catch((err) => {
        setSnack({ open: true, message: err.toString(), type: "error" });
      });
  };

  const showAdd = !room.members.some((m) => m.id === getUserId());
  const inProgress = room.status === "INPROGRESS";
  const master = isMaster(room);
  const currentTurn = getCurrentTurn(room.turn, room.members.length - 1);

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Typography variant="subtitle2" className={classes.subheader}>
          {"Scoreboard"}
        </Typography>
        {master && !inProgress && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={onStartClick}
          >
            {"Start Game"}
          </Button>
        )}
      </Grid>
      <List>
        {room.members.map((member, idx) => (
          <MemberListItem
            key={member.id}
            active={currentTurn === idx - 1}
            member={member}
            master={room.master}
          />
        ))}
      </List>
      {showAdd && (
        <FormControl fullWidth>
          <InputLabel>{"Add Player"}</InputLabel>
          <Input
            type={"text"}
            value={yourName}
            onChange={(event) => setYourName(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={!yourName || loading}
                  startIcon={<Add />}
                  classes={{
                    label: !yourName && classes.icon,
                  }}
                  onClick={() => onClick()}
                >
                  {"Add"}
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    </Box>
  );
};

export default MemberList;

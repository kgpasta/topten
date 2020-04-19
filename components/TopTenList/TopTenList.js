import React from "react";
import {
  ListItemAvatar,
  makeStyles,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemSecondaryAction,
  Paper,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@material-ui/core";
import { TextPrimary } from "../../constants/Colors";
import { useMutation } from "@apollo/react-hooks";
import { ASSIGN_ANSWER } from "../../data/mutations";

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 10,
  },
  root: {
    flex: 1,
  },
  subheader: {
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  add_icon: {
    color: TextPrimary,
  },
  list_item: {
    marginBottom: 10,
  },
  icon: {
    color: TextPrimary,
  },
  select: (props) => ({
    opacity: props.none ? 0.6 : 1,
  }),
}));

const TopTenListItem = (props) => {
  const { roomId, answer, index, members, setSnack } = props;

  const [assignAnswer] = useMutation(ASSIGN_ANSWER);
  const onSelectChange = (memberId) => {
    assignAnswer({
      variables: {
        request: {
          index,
          memberId,
          roomId,
        },
      },
    }).catch((err) => {
      setSnack({ open: true, message: err.toString(), type: "error" });
    });
  };

  const correctMember = members.find((m) =>
    m.correctAnswers.some(
      (correctAnswer) => correctAnswer.value === answer.value
    )
  );
  const classes = useStyles({ none: !correctMember });
  return (
    <Paper className={classes.list_item}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <div>{index + 1}</div>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${answer.value}`} />
        <ListItemSecondaryAction>
          <Select
            value={(correctMember && correctMember.id) || ""}
            onChange={(event) => onSelectChange(event.target.value)}
            displayEmpty
            classes={{
              icon: classes.icon,
              select: classes.select,
            }}
            disableUnderline={true}
          >
            <MenuItem value="" className={classes.none_item}>
              {"None"}
            </MenuItem>
            {members.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

const TopTenList = (props) => {
  const { room, setSnack } = props;
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="subtitle2" className={classes.subheader}>
        {"Answers"}
      </Typography>
      <List className={classes.root}>
        {room.topTen.answers.slice(0, 10).map((answer, index) => (
          <TopTenListItem
            key={index}
            index={index}
            answer={answer}
            members={room.members}
            roomId={room.id}
            setSnack={setSnack}
          />
        ))}
      </List>
    </Box>
  );
};

export default TopTenList;

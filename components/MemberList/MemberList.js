import React from "react";
import {
  makeStyles,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  ListSubheader,
  Chip,
} from "@material-ui/core";
import { TextPrimary } from "../../constants/Colors";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
  },
  add_icon: {
    color: TextPrimary,
  },
}));

const MemberListItem = (props) => {
  const { member, master } = props;
  return (
    <ListItem>
      <ListItemText primary={`${member.name}`} />
      {member.id === master && <Chip size="small" label="Question Master" />}
      <ListItemSecondaryAction>
        <ListItemText primary={member.score || 0} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const MemberList = (props) => {
  const { room } = props;
  const classes = useStyles();

  return (
    <List
      className={classes.root}
      subheader={<ListSubheader>{"Players"}</ListSubheader>}
    >
      {room.members.map((member) => (
        <MemberListItem key={member.id} member={member} master={room.master} />
      ))}
    </List>
  );
};

export default MemberList;

import React from "react";
import {
  makeStyles,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Chip,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    marginLeft: 10,
  },
  subheader: {
    marginLeft: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  list_item: {
    paddingLeft: 2,
  },
}));

const MemberListItem = (props) => {
  const { member, master } = props;
  const classes = useStyles();
  return (
    <ListItem className={classes.list_item}>
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
    <Box className={classes.root}>
      <Typography variant="subtitle2" className={classes.subheader}>
        {"Players"}
      </Typography>
      <List>
        {room.members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            master={room.master}
          />
        ))}
      </List>
    </Box>
  );
};

export default MemberList;

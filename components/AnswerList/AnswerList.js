import React from "react";
import {
  makeStyles,
  TextField,
  Box,
  Typography,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 10,
  },
  subheader: {
    marginLeft: 2,
    marginTop: 10,
    marginBottom: 5,
  },
  well: {
    marginTop: 10,
    padding: 10,
    minHeight: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },
}));

const AnswerList = (props) => {
  const { room } = props;
  const classes = useStyles();
  const incorrectAnswers = room.members.reduce(
    (prev, curr) => {
      return [
        ...prev,
        ...curr.wrongAnswers.map((ans) => ({ ...ans, member: curr })),
      ];
    },
    [{ value: "Hello", member: { name: "KG" } }]
  );

  return (
    <Box className={classes.container}>
      <Typography variant="subtitle2" className={classes.subheader}>
        {"Answer Pool"}
      </Typography>
      <TextField label="Enter Incorrect Answer" variant="filled" fullWidth />
      <Box className={classes.well}>
        {incorrectAnswers.map((ans) => (
          <Chip
            key={ans.value}
            label={`${ans.value} (${ans.member.name})`}
            onDelete={() => {}}
            color="secondary"
          />
        ))}
      </Box>
    </Box>
  );
};

export default AnswerList;

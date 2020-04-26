import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Box,
  Typography,
  Chip,
  Button,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { GUESS_WRONG_ANSWER } from "../../data/mutations";
import { getUserId } from "../../data/user";
import { getCurrentTurn } from "../../utils";

const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 10,
  },
  subheader: {
    marginLeft: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  well: {
    marginTop: 10,
    padding: 10,
    minHeight: 200,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.09)",
  },
  row_button: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text_box: {
    marginRight: 10,
  },
}));

const AnswerList = (props) => {
  const { room, setSnack } = props;
  const classes = useStyles();
  const [wrongAnswer, setWrongAnswer] = useState("");
  const incorrectAnswers = room.members.reduce((prev, curr) => {
    return [
      ...prev,
      ...curr.wrongAnswers.map((ans) => ({ ...ans, member: curr })),
    ];
  }, []);

  const currentTurn = getCurrentTurn(room.turn, room.members.length - 1);
  const memberId = room.members[currentTurn + 1].id;

  const [guessWrongAnswer] = useMutation(GUESS_WRONG_ANSWER);
  const submitWrongAnswer = () => {
    guessWrongAnswer({
      variables: {
        userId: getUserId(),
        request: {
          wrongAnswer,
          memberId,
          roomId: room.id,
        },
      },
    })
      .then(() => setWrongAnswer(""))
      .catch((err) => {
        setSnack({ open: true, message: err.toString(), type: "error" });
      });
  };

  return (
    <Box className={classes.container}>
      <Typography variant="subtitle2" className={classes.subheader}>
        {"Answer Pool"}
      </Typography>
      <Box className={classes.row_button}>
        <TextField
          label="Enter Incorrect Answer"
          variant="filled"
          fullWidth
          value={wrongAnswer}
          onChange={(event) => setWrongAnswer(event.target.value)}
          className={classes.text_box}
        />
        <Button variant="contained" color="primary" onClick={submitWrongAnswer}>
          Submit
        </Button>
      </Box>
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

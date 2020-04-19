import { gql } from "apollo-server-micro";

export const CREATE_ROOM = gql`
  mutation createRoom($request: RoomRequest!) {
    createRoom(room: $request) {
      id
    }
  }
`;

export const ASSIGN_ANSWER = gql`
  mutation assignAnswer($request: AssignAnswerRequest!) {
    assignAnswer(assignAnswer: $request) {
      members {
        id
        score
        correctAnswers {
          value
        }
      }
    }
  }
`;

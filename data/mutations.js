import { gql } from "apollo-server-micro";

export const CREATE_ROOM = gql`
  mutation createRoom($userId: String!, $request: RoomRequest!) {
    createRoom(userId: $userId, room: $request) {
      id
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation joinRoom($userId: String!, $request: JoinRoomRequest!) {
    joinRoom(userId: $userId, joinRoom: $request) {
      id
      members {
        id
        name
        score
        correctAnswers {
          value
        }
        wrongAnswers {
          value
        }
      }
    }
  }
`;

export const START_GAME = gql`
  mutation startGame($userId: String!, $roomId: String!) {
    startGame(userId: $userId, roomId: $roomId) {
      id
      status
    }
  }
`;

export const ASSIGN_ANSWER = gql`
  mutation assignAnswer($userId: String!, $request: AssignAnswerRequest!) {
    assignAnswer(userId: $userId, assignAnswer: $request) {
      id
      turn
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

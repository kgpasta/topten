import { gql } from "apollo-server-micro";

export const GET_TOP_TENS = gql`
  query toptens($category: String) {
    topTens(category: $category) {
      id
      name
      description
      category
      source
      creationDate
    }
  }
`;

export const GET_ROOM = gql`
  query room($userId: String, $roomId: String) {
    room(userId: $userId, id: $roomId) {
      id
      name
      turn
      master
      status
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
      topTen {
        name
        description
        category
        source
        creationDate
        answers {
          value
        }
      }
    }
  }
`;

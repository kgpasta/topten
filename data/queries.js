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
  query room($roomId: String) {
    room(id: $roomId) {
      id
      name
      members {
        id
        name
      }
      topTen {
        name
        description
        category
        source
        creationDate
      }
    }
  }
`;

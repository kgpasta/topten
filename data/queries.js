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

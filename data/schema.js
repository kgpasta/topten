import { gql } from "apollo-server-micro";

const schema = gql`
  type Member {
    id: ID!
    name: String!
    score: Int!
    correctAnswers: [Answer]!
    wrongAnswers: [Answer]!
  }
  type Answer {
    value: String!
    data: [KeyValue]!
  }
  type KeyValue {
    key: String!
    value: String!
  }
  type TopTen {
    id: ID!
    category: Category!
    name: String!
    answers: [Answer]!
    source: String
    creationDate: String
    description: String
  }
  type Room {
    id: ID!
    members: [Member]!
    topTen: TopTen!
    master: ID
    turn: Int!
    status: Status!
    creationDate: String
  }
  enum Category {
    GEOGRAPHY
    SPORTS
    POPCULTURE
    HISTORY
    SCIENCE
    MISC
  }
  enum Status {
    NOTSTARTED
    INPROGRESS
    COMPLETE
  }

  type Query {
    topTens: [TopTen]
    room: Room
  }
`;

export default schema;

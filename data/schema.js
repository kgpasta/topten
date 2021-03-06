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
    name: String!
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
    topTens(category: String): [TopTen]
    room(userId: String, id: String): Room
  }

  input TopTenRequest {
    category: Category!
    name: String!
    answers: [AnswerInput]!
    source: String
    description: String
  }

  input AnswerInput {
    value: String!
    data: [KeyValueInput]!
  }

  input KeyValueInput {
    key: String!
    value: String!
  }

  input RoomRequest {
    roomName: String!
    yourName: String!
    topTenId: String!
  }

  input JoinRoomRequest {
    roomId: String!
    yourName: String!
  }

  input AssignAnswerRequest {
    index: Int!
    roomId: String!
    memberId: String!
  }

  input GuessWrongAnswerRequest {
    roomId: String!
    memberId: String!
    wrongAnswer: String!
  }

  type Mutation {
    createTopTen(topTen: TopTenRequest!): TopTen!
    createRoom(userId: String!, room: RoomRequest!): Room!
    joinRoom(userId: String!, joinRoom: JoinRoomRequest!): Room!
    startGame(userId: String!, roomId: String!): Room!
    assignAnswer(userId: String!, assignAnswer: AssignAnswerRequest!): Room!
    guessWrongAnswer(
      userId: String!
      guessWrongAnswer: GuessWrongAnswerRequest!
    ): Room!
  }
`;

export default schema;

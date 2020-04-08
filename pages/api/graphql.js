import { ApolloServer } from "apollo-server-micro";
import { TopTens, Room } from "../../data/data";
import schema from "../../data/schema";

const resolvers = {
  Query: {
    topTens: () => TopTens,
    room: () => Room,
  },
};

const server = new ApolloServer({
  typeDefs: schema, //<-- note no './' in path and no gql
  resolvers,
  context: () => {
    return {};
  },
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

import { v4 } from "uuid";
import { writeFileSync } from "fs";
import { ApolloServer } from "apollo-server-micro";
import { Firestore } from "@google-cloud/firestore";
import { Room } from "../../data/data";
import schema from "../../data/schema";

if (process.env.STAGE === "PROD") {
  writeFileSync("./topten.json", process.env.CREDENTIAL_JSON);
}

const firestore = new Firestore();

const resolvers = {
  Query: {
    topTens: async (_, args) => {
      let toptens = firestore.collection("toptens");
      Object.keys(args).forEach(
        (key) => (toptens = toptens.where(key, "==", args[key]))
      );

      const results = await toptens.get();

      return results.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    room: () => Room,
  },
  Mutation: {
    createTopTen: async (_, args) => {
      const uuid = v4();
      const topten = firestore.doc(`toptens/${uuid}`);
      await topten.set({
        ...args.topTen,
        creationDate: new Date().toISOString(),
      });

      return topten.get();
    },
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

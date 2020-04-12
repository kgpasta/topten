import { v4 } from "uuid";
import path from "path";
import os from "os";
import { writeFileSync } from "fs";
import { ApolloServer } from "apollo-server-micro";
import { Firestore } from "@google-cloud/firestore";
import { makeCode } from "../../utils";
import schema from "../../data/schema";

if (process.env.STAGE === "PROD") {
  const filepath = path.join(os.tmpdir(), "topten.json");
  console.log(`writing credentails to ${filepath}`);
  writeFileSync(filepath, process.env.CREDENTIAL_JSON);
  process.env["GOOGLE_APPLICATION_CREDENTIALS"] = filepath;
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
    room: async (_, args) => {
      const room = firestore.collection("rooms").doc(args.id);

      const doc = await room.get();

      return { id: doc.id, ...doc.data() };
    },
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
    createRoom: async (_, args) => {
      const id = makeCode(9, 3);
      const topTen = await firestore.doc(`toptens/${args.room.topTenId}`).get();
      const room = firestore.doc(`rooms/${id}`);
      await room.set({
        name: args.room.roomName,
        members: [
          {
            id: v4(),
            name: args.room.yourName,
            score: 0,
            correctAnswers: [],
            wrongAnswers: [],
          },
        ],
        topTen: topTen.data(),
        turn: 0,
        status: "NOTSTARTED",
        creationDate: new Date().toISOString(),
      });

      return room.get();
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

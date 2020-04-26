import { v4 } from "uuid";
import path from "path";
import os from "os";
import { writeFileSync } from "fs";
import { ApolloServer } from "apollo-server-micro";
import { Firestore } from "@google-cloud/firestore";
import { makeCode, getCurrentTurn } from "../../utils";
import schema from "../../data/schema";

if (process.env.STAGE === "PROD") {
  const filepath = path.join(os.tmpdir(), "topten.json");
  console.log(`writing credentails to ${filepath}`);
  writeFileSync(filepath, process.env.CREDENTIAL_JSON);
  process.env["GOOGLE_APPLICATION_CREDENTIALS"] = filepath;
}

const calculateScore = (answers, correctAnswers) => {
  return correctAnswers.reduce((prev, curr) => {
    const score = 10 - answers.findIndex((ans) => curr.value === ans.value);
    return (prev += score);
  }, 0);
};

const getAvailableAnswers = (userId, room) => {
  return room.topTen.answers.map((a) => ({
    ...a,
    value:
      hasBeenAnswered(a.value, room.members) || room.master === userId
        ? a.value
        : "",
  }));
};

const hasBeenAnswered = (value, members) => {
  return members.some((m) =>
    m.correctAnswers.some((answer) => answer.value === value)
  );
};

const validateStartGame = (master, userId) => {
  if (master !== userId) {
    throw new Error("Only the question master can start the game");
  }
};

const validateAssignAnswer = (room, userId, assignMemberId) => {
  if (room.master !== userId) {
    throw new Error("Cannot assign answer unless you are the question master");
  }

  if (assignMemberId) {
    const currentTurn = getCurrentTurn(room.turn, room.members.length - 1);
    const assignTurn =
      room.members.findIndex((m) => m.id === assignMemberId) - 1;
    if (assignTurn !== currentTurn) {
      throw new Error("Cannot assign answer, not selected user's turn");
    }
  }
};

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

      const roomData = doc.data();

      return {
        id: doc.id,
        ...roomData,
        topTen: {
          ...roomData.topTen,
          answers: getAvailableAnswers(args.userId, roomData),
        },
      };
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
            id: args.userId,
            name: args.room.yourName,
            score: 0,
            correctAnswers: [],
            wrongAnswers: [],
          },
        ],
        topTen: { id: topTen.id, ...topTen.data() },
        master: args.userId,
        turn: 0,
        status: "NOTSTARTED",
        creationDate: new Date().toISOString(),
      });

      return room.get();
    },
    joinRoom: async (_, args) => {
      const { joinRoom, userId } = args;
      const room = firestore.doc(`rooms/${joinRoom.roomId}`);
      const { members: existingMembers } = (await room.get()).data();
      await room.set(
        {
          members: [
            ...existingMembers,
            {
              id: userId,
              name: joinRoom.yourName,
              score: 0,
              correctAnswers: [],
              wrongAnswers: [],
            },
          ],
        },
        { merge: true }
      );

      const updatedRoom = await room.get();
      return { id: updatedRoom.id, ...updatedRoom.data() };
    },
    startGame: async (_, args) => {
      const { roomId, userId } = args;
      const room = firestore.doc(`rooms/${roomId}`);
      const { master } = (await room.get()).data();
      validateStartGame(userId, master);
      await room.set(
        {
          status: "INPROGRESS",
        },
        { merge: true }
      );

      const updatedRoom = await room.get();
      return { id: updatedRoom.id, ...updatedRoom.data() };
    },
    assignAnswer: async (_, args) => {
      const { assignAnswer } = args;
      const room = firestore.doc(`rooms/${assignAnswer.roomId}`);
      const { topTen, members, turn, master } = (await room.get()).data();
      validateAssignAnswer(
        { master, turn, members },
        args.userId,
        assignAnswer.memberId
      );
      const answer = topTen.answers[assignAnswer.index];
      const updatedMembers = members.map((m) => {
        const updatedAnswers = m.correctAnswers.filter(
          (ans) => ans.value !== answer.value
        );
        if (m.id === assignAnswer.memberId) {
          updatedAnswers.push(answer);
        }

        return {
          ...m,
          correctAnswers: updatedAnswers,
          score: calculateScore(topTen.answers, updatedAnswers),
        };
      });

      await room.set(
        {
          members: updatedMembers,
          turn: turn + 1,
        },
        { merge: true }
      );

      const roomData = (await room.get()).data();
      return {
        id: room.id,
        ...roomData,
        topTen: {
          ...topTen,
          answers: getAvailableAnswers(args.userId, roomData),
        },
      };
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

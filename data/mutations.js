import { gql } from "apollo-server-micro";

export const CREATE_ROOM = gql`
  mutation createRoom($request: RoomRequest!) {
    createRoom(room: $request) {
      id
    }
  }
`;

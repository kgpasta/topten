import { v4 } from "uuid";

export const getUserId = () => {
  if (typeof window === "undefined") return null;
  const id = localStorage.getItem("topten:id");

  if (!id) {
    const id = v4();
    localStorage.setItem("topten:id", id);
    return id;
  }

  return id;
};

export const isMaster = (room) => {
  return getUserId() === room.master;
};

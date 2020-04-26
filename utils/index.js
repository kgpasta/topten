export const makeCode = (length, chunkSize) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (let i = 0; i < length; i++) {
    if (i && i % chunkSize === 0) {
      result += "-";
    }
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const getCurrentTurn = (turn, memberLength) => {
  const isReverse = Math.floor(turn / memberLength) % 2 === 1;

  const index = turn % memberLength;
  return isReverse ? memberLength - index - 1 : index;
};

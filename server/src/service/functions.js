export const arrayToObjectFn = (array) => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.nickname]: { _id: cur._id, owner: cur.owner, quests: cur.quests },
    }),
    {}
  );

  return object;
};

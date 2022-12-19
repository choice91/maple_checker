export const arrayToObjectFn = (array) => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur._id]: {
        nickname: cur.nickname,
        owner: cur.owner,
        quests: cur.quests,
      },
    }),
    {}
  );

  return object;
};

export const bossArrayToObjectFn = (array) => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur._id]: {
        nickname: cur.nickname,
        owner: cur.owner,
        quests: cur.quests,
      },
    }),
    {}
  );

  return object;
};

export const arrayToObjectFn = (array) => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur._id]: {
        nickname: cur.nickname,
        owner: cur.owner,
        monsterPark: cur.monsterPark,
        quest: cur.quest,
        weakly: cur.weakly,
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
        boss: cur.boss,
      },
    }),
    {}
  );

  return object;
};

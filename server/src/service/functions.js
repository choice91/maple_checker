export const arrayToObjectFn = (array) => {
  const object = array.reduce(
    (acc, cur) => ({
      ...acc,
      [cur._id]: {
        nickname: cur.nickname,
        owner: cur.owner,
        job: cur.job,
        daily: cur.daily,
        weekly: cur.weekly,
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
        job: cur.job,
        weekly: cur.weekly,
        monthly: cur.monthly,
      },
    }),
    {}
  );

  return object;
};

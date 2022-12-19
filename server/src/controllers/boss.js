import db from '../models';

export const addCharacterToBossDB = async (req, res) => {
  const {
    user: { id: loginUserId },
    body: { nickname },
  } = req;

  const character = await db.Boss.findOne({ owner: loginUserId, nickname });

  if (character) {
    res.status(400).json({
      ok: false,
      message: '이미 존재하는 캐릭터입니다.',
    });
    return;
  }

  const newCharacter = await db.Boss.create({ owner: loginUserId, nickname });

  const newCharObj = {
    [newCharacter._id]: {
      nickname: newCharacter.nickname,
      owner: newCharacter.owner,
      boss: newCharacter.boss,
    },
  };

  res.status(200).json({
    ok: true,
    newCharacter: newCharObj,
  });
};

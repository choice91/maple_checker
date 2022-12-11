import db from '../models';

export const saveNickname = async (req, res) => {
  const {
    body: { nickname },
    session: {
      user: { _id: loginUserId },
    },
  } = req;

  const quest = await db.Quest.findOne({ owner: loginUserId, nickname });

  // 이미 캐릭터가 등록되어 있는 경우
  if (quest) {
    res.status(400).json({
      ok: false,
      message: '이미 등록된 캐릭터입니다.',
    });
    return;
  }

  // 캐릭터 등록
  await db.Quest.create({
    owner: loginUserId,
    nickname,
  });

  res.status(200).json({
    ok: true,
    message: '캐릭터 추가 완료',
  });
};

export const deleteCharacter = async (req, res) => {
  const {
    session: {
      user: { _id: loginUserId },
    },
    body: { nickname },
  } = req;

  const response = await db.Quest.deleteOne({ owner: loginUserId, nickname });

  if (response.deletedCount !== 1) {
    res.status(400).json({
      ok: false,
      message: '삭제중 오류가 발생했습니다. 다시 시도해주세요.',
    });
    return;
  }

  res.status(200).json({
    ok: true,
    message: '닉네임 변경 성공',
  });
};

export const getDailyQuest = async (req, res) => {
  const { id: loginUserId } = req.user;

  const quest = await db.Quest.find({ owner: loginUserId });

  res.status(200).json({
    ok: true,
    quests: quest,
  });
};

export const questComplete = async (req, res) => {
  const {
    session: {
      user: { _id: loginUserId },
    },
    body: { nickname, questType },
  } = req;

  const quest = await db.Quest.findOne({ owner: loginUserId, nickname });

  if (!quest) {
    res.status(404).json({
      ok: false,
      message: '존재하지 않는 캐릭터입니다.',
    });
    return;
  }

  quest.quests[`${questType}`] = !quest.quests[`${questType}`];
  await quest.save();

  res.status(200).json({
    ok: true,
    message: quest.quests[`${questType}`] ? '완료' : '취소',
  });
};
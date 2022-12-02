import db from '../models/index';

export const saveNickname = async (req, res) => {
  const {
    body: { nickname },
    session: {
      user: { _id: loginUserId },
    },
  } = req;

  try {
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
  } catch (err) {
    res.status(404);
  }
};

export const getDailyQuest = async (req, res) => {
  const { _id: loginUserId } = req.session.user;

  try {
    const quest = await db.Quest.find({ owner: loginUserId });
    console.log(quest);

    res.render('home', {
      quests: quest,
    });
  } catch (err) {
    res.status(404);
  }
};

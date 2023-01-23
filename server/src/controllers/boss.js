import db from '../models';

import { bossArrayToObjectFn } from '../service/functions';

export default {
  addCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname, job },
    } = req;

    const character = await db.Boss.findOne({ owner: loginUserId, nickname });

    if (character) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 존재하는 캐릭터입니다.',
      });
      return;
    }

    const newCharacter = await db.Boss.create({
      owner: loginUserId,
      nickname,
      job,
    });

    await db.User.updateOne(
      { _id: loginUserId },
      { $push: { bossSeq: newCharacter._id } }
    );

    const newCharObj = {
      [newCharacter._id]: {
        nickname: newCharacter.nickname,
        owner: newCharacter.owner,
        job: newCharacter.job,
        weekly: newCharacter.weekly,
        monthly: newCharacter.monthly,
      },
    };

    res.status(200).json({
      ok: true,
      data: {
        newCharacter: newCharObj,
        newCharacterId: newCharacter._id,
      },
    });
  },

  updateNickname: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { newNickname, newJob },
      params: { bossId },
    } = req;

    if (!newNickname) {
      res.status(400).json({
        ok: false,
        errorMessage: '닉네임을 입력해주세요',
      });
      return;
    }

    const isExist = await db.Todo.exists({ nickname: newNickname });

    if (isExist) {
      res.status(409).json({
        ok: false,
        errorMessage: '이미 존재하는 닉네임입니다.',
      });
      return;
    }

    const updateResult = await db.Todo.updateOne(
      { _id: bossId, owner: loginUserId },
      { nickname: newNickname, job: newJob }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).json({
        ok: false,
        errorMessage: '캐릭터를 찾을 수 없습니다.',
      });
      return;
    }

    if (updateResult.modifiedCount === 0) {
      res.status(400).json({
        ok: false,
        errorMessage: '수정 실패',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: '삭제완료',
      data: {
        updatedId: bossId,
        newNickname,
      },
    });
  },

  deleteCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      params: { bossId },
    } = req;

    const bossDeleteResult = await db.Boss.deleteOne({
      owner: loginUserId,
      _id: bossId,
    });

    if (bossDeleteResult.deletedCount === 0) {
      res.status(404).json({
        ok: false,
        errorMessage: '삭제할 캐릭터가 없음',
      });
      return;
    }

    await db.User.updateOne(
      { _id: loginUserId },
      { $pull: { bossSeq: bossId } }
    );

    res.status(200).json({
      ok: true,
      message: '삭제완료',
      data: {
        deletedId: bossId,
      },
    });
  },

  getBossData: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const boss = await db.Boss.find({ owner: loginUserId }).lean();
    const bossObj = bossArrayToObjectFn(boss);

    const user = await db.User.findOne({ _id: loginUserId }).lean();

    res.status(200).json({
      ok: true,
      data: {
        bossData: bossObj,
        bossSeq: user.bossSeq,
      },
    });
  },

  bossCheck: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { bossId, category, bossType },
    } = req;

    const bossData = await db.Boss.findOne({ _id: bossId, owner: loginUserId });

    if (!bossData) {
      res.status(404).json({
        ok: false,
        errorMessage: '존재하지 않는 캐릭터',
      });
      return;
    }

    bossData[category][bossType] = !bossData[category][bossType];
    await bossData.save();

    res.status(200).json({
      ok: true,
      message: bossData[category][bossType] ? '체크' : '체크해제',
    });
  },

  resetBossData: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { category },
    } = req;

    if (category === 'weekly') {
      const weeklyDefaults = {
        zaqqum: false,
        magnus: false,
        hilla: false,
        papulatus: false,
        pierre: false,
        banban: false,
        bloodyQueen: false,
        vellum: false,
        pinkBean: false,
        lotus: false,
        damian: false,
        guardianAngelSlime: false,
        lucid: false,
        will: false,
        dusk: false,
        jinHilla: false,
        darknell: false,
        seren: false,
        kalos: false,
      };

      const weeklyResetResult = await db.Boss.updateMany(
        { owner: loginUserId },
        { $set: { weekly: weeklyDefaults } }
      );

      if (weeklyResetResult.modifiedCount === 0) {
        res.status(400).json({
          ok: false,
          errorMessage: '보스 데이터 초기화 에러',
        });
        return;
      }
    } else if (category === 'monthly') {
      const monthlyDefaults = { blackMagician: false };

      const monthlyResetResult = await db.Boss.updateMany(
        { owner: loginUserId },
        { monthly: monthlyDefaults }
      );

      if (monthlyResetResult.modifiedCount === 0) {
        res.status(400).json({
          ok: false,
          errorMessage: '보스 데이터 초기화 에러',
        });
        return;
      }
    }

    res.status(200).json({
      ok: true,
      message: '보스 데이터 초기화',
      data: {
        category,
      },
    });
  },

  changeSequence: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { index, direction },
    } = req;

    const user = await db.User.findById(loginUserId, { bossSeq: 1 });

    if (direction === 'left') {
      [user.bossSeq[index - 1], user.bossSeq[index]] = [
        user.bossSeq[index],
        user.bossSeq[index - 1],
      ];
    } else if (direction === 'right') {
      [user.bossSeq[index], user.bossSeq[index + 1]] = [
        user.bossSeq[index + 1],
        user.bossSeq[index],
      ];
    }
    await user.save();

    res.status(200).json({
      ok: true,
    });
  },
};

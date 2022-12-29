import db from '../models';

import { bossArrayToObjectFn } from '../service/functions';

export default {
  addCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname },
    } = req;

    const character = await db.Boss.findOne({ owner: loginUserId, nickname });

    if (character) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 존재하는 캐릭터입니다.',
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
  },

  updateNickname: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { prevNickname, newNickname },
      params: { bossId },
    } = req;

    const boss = await db.Boss.findOne({
      owner: loginUserId,
      _id: bossId,
      nickname: prevNickname,
    });

    if (!boss) {
      res.status(404).json({
        ok: false,
        errorMessage: '캐릭터를 찾을 수 없음',
      });
      return;
    }

    boss.nickname = newNickname;
    await boss.save();

    res.status(200).json({
      ok: true,
      message: '삭제완료',
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

    res.status(200).json({
      ok: true,
      message: '삭제완료',
    });
  },

  getBossData: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const boss = await db.Boss.find({ owner: loginUserId });

    const bossObj = bossArrayToObjectFn(boss);

    res.status(200).json({
      ok: true,
      bossData: bossObj,
    });
  },

  checkBossData: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname, bossType },
    } = req;

    const bossData = await db.Boss.findOne({ owner: loginUserId, nickname });

    if (!bossData) {
      res.status(404).json({
        ok: false,
        errorMessage: '존재하지 않는 캐릭터',
      });
      return;
    }

    bossData.boss[`${bossType}`] = !bossData.boss[`${bossType}`];
    await bossData.save();

    res.status(200).json({
      ok: true,
      message: '완료',
    });
  },

  resetBossData: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const bossDefaultValues = {
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

    const bossResetResponse = await db.Boss.updateMany(
      { owner: loginUserId },
      { $set: { boss: bossDefaultValues } }
    );

    if (bossResetResponse.modifiedCount === 0) {
      res.status(400).json({
        ok: false,
        errorMessage: '보스 데이터 초기화 에러',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: '보스 데이터 초기화',
    });
  },
};

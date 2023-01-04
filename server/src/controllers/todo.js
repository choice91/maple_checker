import db from '../models';

import { arrayToObjectFn } from '../service/functions';

export default {
  addCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname },
    } = req;

    const quest = await db.Todo.findOne({ owner: loginUserId, nickname });

    // 이미 캐릭터가 등록되어 있는 경우
    if (quest) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 등록된 캐릭터입니다.',
      });
      return;
    }

    // 캐릭터 등록
    const newCharacter = await db.Todo.create({
      owner: loginUserId,
      nickname,
    });

    const result = {
      [newCharacter._id]: {
        nickname: newCharacter.nickname,
        owner: newCharacter.owner,
        quest: newCharacter.quest,
        weakly: newCharacter.weakly,
        monsterPark: newCharacter.monsterPark,
      },
    };

    res.status(200).json({
      ok: true,
      message: '캐릭터 추가 완료',
      newCharacter: result,
    });
  },

  updateNickname: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { newNickname },
      params: { todoId },
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
      { _id: todoId, owner: loginUserId },
      { nickname: newNickname }
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
      message: '닉네임 변경 성공',
      data: {
        updatedId: todoId,
        newNickname,
      },
    });
  },

  deleteCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      params: { todoId },
    } = req;

    const response = await db.Todo.deleteOne({
      _id: todoId,
      owner: loginUserId,
    });

    if (response.deletedCount !== 1) {
      res.status(400).json({
        ok: false,
        errorMessage: '삭제중 오류가 발생했습니다. 다시 시도해주세요.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: '캐릭터 삭제',
      data: {
        deletedId: todoId,
      },
    });
  },

  getTodoData: async (req, res) => {
    const { id: loginUserId } = req.user;

    const quest = await db.Todo.find({ owner: loginUserId });
    const questObj = arrayToObjectFn(quest);

    res.status(200).json({
      ok: true,
      todos: questObj,
    });
  },

  questComplete: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { questId, questType },
    } = req;

    const quest = await db.Todo.findOne({ _id: questId, owner: loginUserId });

    if (!quest) {
      res.status(404).json({
        ok: false,
        message: '존재하지 않는 캐릭터입니다.',
      });
      return;
    }

    quest.quest[questType] = !quest.quest[questType];
    await quest.save();

    res.status(200).json({
      ok: true,
      message: quest.quest[questType] ? '완료' : '취소',
    });
  },

  resetQuestData: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const questDefaultValues = {
      yeoro: false,
      chuchu: false,
      lachelein: false,
      arcana: false,
      morass: false,
      esfera: false,
      cernium: false,
      burningCernium: false,
      arcs: false,
      odium: false,
    };

    const updateResponse = await db.Todo.updateMany(
      { owner: loginUserId },
      { $set: { quests: questDefaultValues } }
    );

    if (updateResponse.modifiedCount === 0) {
      res.status(400).json({
        ok: false,
        errorMessage: '초기화 에러',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: '퀘스트 데이터 초기화',
    });
  },
};

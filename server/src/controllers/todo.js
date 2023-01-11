import db from '../models';

import { arrayToObjectFn } from '../service/functions';

export default {
  addCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname },
    } = req;

    const todo = await db.Todo.findOne({ owner: loginUserId, nickname });

    // 이미 캐릭터가 등록되어 있는 경우
    if (todo) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 등록된 캐릭터입니다.',
      });
      return;
    }

    const newCharacter = await db.Todo.create({
      owner: loginUserId,
      nickname,
    });

    await db.User.updateOne(
      { _id: loginUserId },
      { $push: { todoSeq: newCharacter._id } }
    );

    const result = {
      [newCharacter._id]: {
        nickname: newCharacter.nickname,
        owner: newCharacter.owner,
        daily: newCharacter.daily,
        weekly: newCharacter.weekly,
      },
    };

    res.status(200).json({
      ok: true,
      message: '캐릭터 추가 완료',
      data: {
        newCharacter: result,
        newCharacterId: newCharacter._id,
      },
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

    const todos = await db.Todo.find({ owner: loginUserId }).lean();
    const todoObj = arrayToObjectFn(todos);

    const user = await db.User.findOne({ _id: loginUserId }).lean();

    res.status(200).json({
      ok: true,
      data: {
        todos: todoObj,
        todoSeq: user.todoSeq,
      },
    });
  },

  checkTodo: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { todoId, category, todoType },
    } = req;

    const todo = await db.Todo.findOne({ _id: todoId, owner: loginUserId });

    if (!todo) {
      res.status(404).json({
        ok: false,
        errorMessage: '존재하지 않는 캐릭터입니다.',
      });
      return;
    }

    todo[category][todoType] = !todo[category][todoType];
    await todo.save();

    res.status(200).json({
      ok: true,
      message: todo[category][todoType] ? '체크' : '체크해제',
    });
  },

  resetTodo: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const dailyDefaults = {
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

    const weeklyDefaults = {
      yeoro: false,
      chuchu: false,
      lachelein: false,
      arcana: false,
      morass: false,
      esfera: false,
    };

    const updateResponse = await db.Todo.updateMany(
      { owner: loginUserId },
      { $set: { daily: dailyDefaults, weekly: weeklyDefaults } }
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
      message: '퀘스트 데이터 초기화 성공',
    });
  },
};

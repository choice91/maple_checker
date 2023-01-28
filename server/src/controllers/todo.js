import db from '../models';

import { arrayToObjectFn } from '../service/functions';

export default {
  addCharacter: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { nickname, job },
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
      job,
    });

    await db.User.updateOne(
      { _id: loginUserId },
      { $push: { todoSeq: newCharacter._id } }
    );

    const result = {
      [newCharacter._id]: {
        nickname: newCharacter.nickname,
        owner: newCharacter.owner,
        job: newCharacter.job,
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

  updateCharacterInfo: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { newNickname, newJob },
      params: { todoId },
    } = req;

    if (!newNickname || !newJob) {
      res.status(400).json({
        ok: false,
        errorMessage: '닉네임 혹은 직업을 입력해주세요',
      });
      return;
    }

    const todos = await db.Todo.find(
      { owner: loginUserId, _id: { $ne: todoId } },
      { nickname: 1 }
    ).lean();

    const index = todos.findIndex((obj) => obj.nickname === newNickname);

    if (index > -1) {
      res.status(400).json({
        ok: false,
        errorMessage: '이미 등록된 닉네임입니다.',
      });
      return;
    }

    await db.Todo.updateOne(
      { _id: todoId, owner: loginUserId },
      { nickname: newNickname, job: newJob }
    );

    res.status(200).json({
      ok: true,
      message: '변경 성공',
      data: {
        updatedId: todoId,
        newNickname,
        newJob,
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

    await db.User.updateOne(
      { _id: loginUserId },
      { $pull: { todoSeq: todoId } }
    );

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
      body: { todoId, todoType },
    } = req;

    const todo = await db.Todo.findOne({ _id: todoId, owner: loginUserId });

    if (!todo) {
      res.status(404).json({
        ok: false,
        errorMessage: '존재하지 않는 캐릭터입니다.',
      });
      return;
    }

    todo.weekly[todoType] = !todo.weekly[todoType];
    await todo.save();

    res.status(200).json({
      ok: true,
      message: todo.weekly[todoType] ? '체크' : '체크해제',
    });
  },

  resetTodo: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { category },
    } = req;

    if (category === 'daily') {
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

      const updateResult = await db.Todo.updateMany(
        { owner: loginUserId },
        { daily: dailyDefaults }
      );

      if (updateResult.modifiedCount === 0) {
        res.status(400).json({
          ok: false,
          errorMessage: '초기화 에러',
        });
      }
    } else if (category === 'weekly') {
      const weeklyDefaults = {
        yeoro: false,
        chuchu: false,
        lachelein: false,
        arcana: false,
        morass: false,
        esfera: false,
      };

      const updateResult = await db.Todo.updateMany(
        { owner: loginUserId },
        { weekly: weeklyDefaults }
      );

      if (updateResult.modifiedCount === 0) {
        res.status(400).json({
          ok: false,
          errorMessage: '초기화 에러',
        });
      }
    }

    res.status(200).json({
      ok: true,
      message: '퀘스트 데이터 초기화 성공',
      data: {
        category,
      },
    });
  },

  changeTodoSequence: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { index, direction },
    } = req;

    const user = await db.User.findById(loginUserId, { todoSeq: 1 });

    if (direction === 'left') {
      [user.todoSeq[index - 1], user.todoSeq[index]] = [
        user.todoSeq[index],
        user.todoSeq[index - 1],
      ];
    } else if (direction === 'right') {
      [user.todoSeq[index], user.todoSeq[index + 1]] = [
        user.todoSeq[index + 1],
        user.todoSeq[index],
      ];
    }
    await user.save();

    res.status(200).json({
      ok: true,
    });
  },
};

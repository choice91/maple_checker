import bcrypt from 'bcrypt';

import db from '../models';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

export default {
  signup: async (req, res) => {
    const { id, password, password2, name } = req.body;

    if (password !== password2) {
      res.status(400).json({
        ok: false,
        type: 'password incorrect',
        errorMessage: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    const exists = await db.User.exists({
      id,
    });

    if (exists) {
      res.status(400).json({
        ok: false,
        type: 'exist id',
        errorMessage: '이미 존재하는 아이디입니다.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.User.create({
      id,
      password: hashedPassword,
      name,
    });

    res.status(200).json({
      ok: true,
      message: '회원가입 성공',
    });
  },

  idCheck: async (req, res) => {
    const { id } = req.body;

    const exists = await db.User.exists({ id });

    if (exists) {
      res.status(409).json({
        ok: false,
        message: 'ID가 중복입니다.',
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: '사용할 수 있는 ID입니다.',
    });
  },

  login: async (req, res) => {
    const { id, password } = req.body;

    const user = await db.User.findOne({ id });

    if (!user) {
      res.status(400).json({
        ok: false,
        errorMessage: '존재하지 않는 유저입니다.',
      });
      return;
    }

    const pwCompare = await bcrypt.compare(password, user.password);

    if (!pwCompare) {
      res.status(400).json({
        ok: false,
        errorMessage: '비밀번호가 틀렸습니다',
      });
      return;
    }

    const accessToken = await signAccessToken(user._id, user.name);
    const refreshToken = await signRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      ok: true,
      message: '로그인 성공',
      token: {
        accessToken,
        refreshToken,
      },
    });
  },
};

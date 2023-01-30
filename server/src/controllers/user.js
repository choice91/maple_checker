import bcrypt from "bcrypt";

import db from "../models";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export default {
  signup: async (req, res) => {
    const { id, password, password2, name } = req.body;

    if (password !== password2) {
      res.status(400).json({
        ok: false,
        type: "password incorrect",
        errorMessage: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    const exists = await db.User.exists({ id });

    if (exists) {
      res.status(400).json({
        ok: false,
        type: "exist id",
        errorMessage: "이미 존재하는 아이디입니다.",
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
      message: "회원가입 성공",
    });
  },

  idCheck: async (req, res) => {
    const {
      body: { id },
    } = req;

    const exists = await db.User.exists({ id });

    if (exists) {
      res.status(409).json({
        ok: false,
        errorMessage: "ID가 중복입니다.",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      message: "사용할 수 있는 ID입니다.",
    });
  },

  login: async (req, res) => {
    const { id, password } = req.body;

    const user = await db.User.findOne({ id });

    if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: "존재하지 않는 유저입니다.",
      });
      return;
    }

    const pwCompare = await bcrypt.compare(password, user.password);

    if (!pwCompare) {
      res.status(400).json({
        ok: false,
        errorMessage: "다시 시도해주세요",
      });
      return;
    }

    const accessToken = await signAccessToken(user._id, user.name);
    const refreshToken = await signRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      ok: true,
      message: "로그인 성공",
      token: {
        accessToken,
        refreshToken,
      },
    });
  },

  getUserProfile: async (req, res) => {
    const {
      user: { id: loginUserId },
    } = req;

    const user = await db.User.findById(loginUserId, { name: 1 });

    if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: "존재하지 않는 유저",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      user,
    });
  },

  updateUserProfile: async (req, res) => {
    const {
      user: { id: loginUserId },
      body: { name, curPw, newPw, verifyPw },
    } = req;

    if (newPw !== verifyPw) {
      res.status(400).json({
        ok: false,
        errorMessage: "변경할 비밀번호가 일치하지 않음",
      });
      return;
    }

    const user = await db.User.findById(loginUserId);

    if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: "존재하지 않는 유저",
      });
      return;
    }

    const pwCompare = await bcrypt.compare(curPw, user.password);

    if (!pwCompare) {
      res.status(400).json({
        ok: false,
        errorMessage: "현재 비밀번호가 일치하지 않음",
      });
      return;
    }

    const newHashedPassword = await bcrypt.hash(newPw, 12);
    await db.User.updateOne(
      { _id: loginUserId },
      { name, password: newHashedPassword }
    );

    res.status(200).json({
      ok: true,
      message: "변경완료",
    });
  },
};

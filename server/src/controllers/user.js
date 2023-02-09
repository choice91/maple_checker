import bcrypt from "bcrypt";

import db from "../models";
import { signAccessToken, signRefreshToken } from "../utils/jwt";

export default {
  signup: async (req, res) => {
    const { id, password, password2, name } = req.body;

    if (password !== password2) {
      res.status(400).json({
        ok: false,
        errorMessage: "password incorrect",
      });
      return;
    }

    const exists = await db.User.exists({ id });

    if (exists) {
      res.status(400).json({
        ok: false,
        errorMessage: "exist id",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.User.create({
      id,
      password: hashedPassword,
      name,
    });

    res.status(200).json({ ok: true, message: "signup success" });
  },

  idCheck: async (req, res) => {
    const {
      body: { id },
    } = req;

    const exists = await db.User.exists({ id });

    if (exists) {
      res.status(409).json({
        ok: false,
        errorMessage: "id duplication",
      });
      return;
    }

    res.status(200).json({ ok: true, message: "valid id" });
  },

  login: async (req, res) => {
    const { id, password } = req.body;

    const user = await db.User.findOne({ id });

    if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: "user not found",
      });
      return;
    }

    const pwCompare = await bcrypt.compare(password, user.password);

    if (!pwCompare) {
      res.status(400).json({
        ok: false,
        errorMessage: "incorrect password",
      });
      return;
    }

    const accessToken = await signAccessToken(user._id, user.name);
    const refreshToken = await signRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      ok: true,
      message: "success",
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

    const user = await db.User.findById(loginUserId);

    if (!user) {
      res.status(404).json({
        ok: false,
        errorMessage: "user not found",
      });
      return;
    }

    const pwCompare = await bcrypt.compare(curPw, user.password);

    if (!pwCompare) {
      res.status(400).json({
        ok: false,
        errorMessage: "incorrect password",
      });
      return;
    }

    if (curPw === newPw) {
      res.status(400).json({
        ok: false,
        errorMessage: "new password is same current password",
      });
      return;
    }

    if (newPw !== verifyPw) {
      res.status(400).json({
        ok: false,
        errorMessage: "password does not match",
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
      message: "success",
    });
  },
};

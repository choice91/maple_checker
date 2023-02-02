import jwt from "jsonwebtoken";

import db from "../models";

const { ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env;

export async function signAccessToken(userId, username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId, username },
      process.env.JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      }
    );
  });
}

export async function signRefreshToken() {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {},
      process.env.JWT_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      }
    );
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      ok: true,
      id: decoded.id,
      username: decoded.username,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
}

export async function verifyRefreshToken(token, userId) {
  try {
    const user = await db.User.findById(userId, { refreshToken: 1 }).lean();

    if (token === user.refreshToken) {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}

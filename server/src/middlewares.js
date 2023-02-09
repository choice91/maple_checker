import { verifyToken } from "./utils/jwt";

export const authJWT = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization.split(" ")[1];
  const decoded = verifyToken(token);

  if (decoded.ok) {
    req.user = {
      id: decoded.id,
      name: decoded.username,
    };

    next();
  } else {
    res.status(401).json({
      ok: false,
      errorMessage: decoded.message,
    });
  }
};

export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }

  return res.status(400).json({
    ok: false,
    errorMessage: '유저정보 없음',
  });
};

export const authJWT = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decodedToken.id,
      name: decodedToken.username,
    };

    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

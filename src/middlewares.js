export const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }

  return res.redirect('/login');
};

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

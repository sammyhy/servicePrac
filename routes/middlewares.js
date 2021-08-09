exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthentication()) {
    next();
  } else {
    res.status(403).send(" require login!");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthentication()) {
    next();
  } else {
    const message = encodeURIComponent("already LoggedIn");
    res.redirect(`/?error=${message}`);
  }
};

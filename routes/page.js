const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.folloewrCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "My Info - Twintter" });
});

router.get("/signUp", isNotLoggedIn, (req, res) => {
  res.render("signUp", { title: "signUp - Twintter" });
});

router.get("/", (req, res, next) => {
  const twits = [];
  res.render("main", {
    title: "Twintter",
    twits,
  });
});

module.exports = router;

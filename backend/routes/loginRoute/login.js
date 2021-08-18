const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("successfully Authenticated");
      });
    }
  })(req, res, next);
});

router.get("/user", (req, res) => {
  res.send(req.user);
});

module.exports = router;

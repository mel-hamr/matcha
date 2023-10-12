const express = require("express");
const userSignInWO = require("../WO/user/userSignInWO");
const router = express.Router();

router.post("/signup", (req, res) => {
  userWo = new userSignInWO(req.body);
  // if(/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._\-@]+(?<![_.])$/ig.test(userWo.username) == false)
  if(/^(?=.{8,20}$)[a-zA-Z0-9._\-@]+$/ig.test(userWo.username) == false)
    console.log("username uncorrect");
  else 
    console.log("username correct");
    res.send("ok");
  // let { status, message } = userWo.checkAllFields(res);
  // if (status) res.send("ok");
  // else res.status(400).send(message);

});

router.post("/login", (req, res) => {});

module.exports = router;

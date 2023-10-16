const express = require("express");
const generalCrude = require("../../data/db/crud");
const userSignInDTO = require("../DTO/user/userSignInDTO");
const router = express.Router();
const userSerivce = require("../../services/user/user-service");

router.post("/signup", async (req, res) => {
  userDTO = new userSignInDTO(req.body);
  let { status, message } = userDTO.checkAllFields(res);
  if (status){
    userSerivce.userSignIn(userDTO,res);
    res.status(200).send("ok");
  } 
  else res.status(400).send(message);
});

router.post("/login", (req, res) => {});

module.exports = router;

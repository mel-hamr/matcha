const generalCrude = require("../../data/db/crud");
const auth = require("../auth/jwt.utils")
const userRepo = require("../../data/user/user-repository")
const userSignIn = async (userWo,res)=>{
    let data
    let user;
    user = await userRepo.getUserByUsername(userWo.username,res);
    data = await generalCrude.createRecord(userWo, "users",res);
    console.log(auth.signJWT(data.username))
}

module.exports = { userSignIn }
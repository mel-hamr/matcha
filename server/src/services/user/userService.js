const generalCrude = require("../../data/db/crud");
const auth = require("../auth/jwt.utils")

const userSignIn = async (userWo,res)=>{
    let data = [];
    data = await generalCrude.createRecord(userWo, "users",res);
    console.log(auth.signJWT(data.username))
}

module.exports = {  userSignIn}
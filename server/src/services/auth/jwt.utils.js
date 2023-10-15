const jwt = require("jsonwebtoken");
require('dotenv').config()

const privateKey = process.env.JWT_SECRET;

const publicKey = process.env.JWT_PUBLIC_KEY;

const signJWT = (user) => {
    const token = jwt.sign(
        {
        iss: "Matcha",
        sub: user.username,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 60000),
        },
        privateKey,
        { algorithm: "RS256"}
    );
    return token;
}

module.exports = {
    signJWT,
}
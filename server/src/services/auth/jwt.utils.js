const jwt = require("jsonwebtoken");
require('dotenv').config()

const privateKey = process.env.JWT_SECRET;

const publicKey = process.env.JWT_PUBLIC_KEY;

const signJWT = (payload, expiresIn) => {
    const token = jwt.sign(
        payload,
        privateKey,
        { algorithm: "RS256" ,expiresIn: expiresIn}
    );
    return token;
}

module.exports = {
    signJWT,
}
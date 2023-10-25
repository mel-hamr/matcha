const generalCrude = require("../../data/db/crud");
const auth = require("../auth/jwt.utils");
const userRepo = require("../../data/user/user-repository");
const verifocationEmailHelper = require("./helper/verification-email-helper");
const bcrypt = require("bcrypt");

const userSignIn = async (userWo, res) => {
  let newUser;
  let user;
  user = await userRepo.getUserByUsername(userWo.username, res);
  if (user) {
    res.status(400).send("user already exist");
  }
  newUser = await generalCrude.createRecord(userWo, "users", res);
  if (newUser) {
    let accessToken = auth.signJWT(
      {
        username: userWo.username,
        email_address: userWo.email_address,
        user_id: newUser.id,
      },
      "5m"
    );
    let session = await generalCrude.createRecord(
      { user_id: newUser.id, username: newUser.username, valid: true },
      "sessions",
      res
    );
    console.log(session);
    let refreshToken = auth.signJWT({ session_id: session.id }, "1d");

    // set access token in cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
    });
    // set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 1000, // 1 year
      httpOnly: true,
    });
    verifocationEmailHelper.sendVerificationEmail(newUser, res);
    res.status(200).send(session);
  } else {
    res.status(400).send("error happend while creating user");
  }
};

const verifyUserEmail = async (userId, uniqueString, res) => {
  let user_verification = await generalCrude.getRecordBy(
    "user_verification",
    "user_id",
    userId,
    res
  );
  // check if user verification record exists
  if (user_verification) {
    //check if user verification record is expiret
    if (user_verification.expires_at < new Date()) {
      generalCrude.deleteRecord("user_verification", user_verification.id, res);
      generalCrude.deleteRecord("users", userId, res);
      let message = "Verification link has expired. Please sign up again.";
      res.redirect(`/user/verified/?error=true&message=${message}`);
    }
    // if user verification record is not expired
    else {
      bcrypt
        .compare(uniqueString, user_verification.unique_string)
        .then((result) => {
          if (result) {
            generalCrude.updateRecord(
              "users",
              userId,
              {
                verified: true,
              },
              res
            );
            generalCrude.deleteRecord(
              "user_verification",
              user_verification.id,
              res
            );
            res.redirect(`/user/verified/`);
          } else {
            let message =
              " invalid verification details passed. Check your inbox";
            res.redirect(`/user/verified/?error=true&message=${message}`);
          }
        })
        .catch((error) => {
          let message = "An error occured while comapring unique string";
          res.redirect(`/user/verified/?error=true&message=${message}`);
        });
    }
  } else {
    let message =
      "Account record doesn't exist or has been verified already. Plaese sign up or login.";
    res.redirect(`/user/verified/?error=true&message=${message}`);
  }
};

module.exports = { userSignIn, verifyUserEmail };

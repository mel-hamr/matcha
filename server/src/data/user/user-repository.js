const client = require("../db/createDB");
const matchaClient = client.matchaClient;
const userQueries = require("./user-queries");

const getUserByUsername = async (username, res) => {
  try {
    matchaClient.connect();
    let result = await matchaClient.query(userQueries.getByUsername, [
      username,
    ]);
    console.log(user);
    return result.rows[0];
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { getUserByUsername };

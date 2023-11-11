const client = require("../db/createDB");
const matchaClient = client.matchaClient;
const userQueries = require("./user-queries");

const getUserByUsername = async (username, res) => {
  try {
    if (!matchaClient._connected) matchaClient.connect();
    let result = await matchaClient.query(userQueries.getByUsername, [
      username,
    ]);
    return result.rows[0];
  } catch (e) {
    console.log(e);
    res.status(400);
    return null;
  }
};

module.exports = { getUserByUsername };

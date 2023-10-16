const { Client } = require("pg");
const client = require("./createDB");
const matchaClient = client.matchaClient;

const createRecord = async (user, table, res) => {
  const data = user;
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
  // console.log(query);
  let dota;

  if (!matchaClient._connected) matchaClient.connect().catch((e) => {});
  try {
    dota = await matchaClient.query(query, values);
    return dota.rows[0];
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// Read
async function getAllRecords(table) {
  const query = `SELECT * FROM ${table}`;
  return db.any(query);
}

async function getRecordById(table, id,res) {
  const query = `SELECT * FROM ${table} WHERE id = $1`;
  return db.oneOrNone(query, id);
}

// Update
const updateRecord = (req, res) => {
  const id = req.body.id;
  const table = req.body.table;
  const data = req.body.data;
  const columns = Object.keys(data);
  const values = Object.values(data);
  const setClause = columns.map((col, i) => `${col} = $${i + 2}`).join(", ");

  const query = `UPDATE ${table} SET ${setClause} WHERE id = $1 RETURNING *`;
  if (!matchaClient._connected) matchaClient.connect();
  matchaClient.query(query, [id, ...values], async (error, result) => {
    if (error) throw error;
    res.status(200).send(result.rows);
  });
};

// Delete
async function deleteRecord(table, id) {
  const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
  return db.oneOrNone(query, id);
}

module.exports = {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
};

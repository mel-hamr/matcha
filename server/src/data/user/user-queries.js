const getByUsername  = `SELECT * FROM users WHERE username = $1`

module.exports = { getByUsername }
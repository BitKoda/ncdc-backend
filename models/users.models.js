const db = require('../db/connection.js');

selectAllUsers = () => {
  return db.query(
    'SELECT * FROM users;'
  ).then(({ rows }) => {
    return rows;
  });
}

module.exports = {selectAllUsers}

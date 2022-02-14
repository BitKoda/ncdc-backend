const db = require('../db/connection.js');

selectAllTopics = () => {
  return db.query(
    'SELECT * FROM topics;'
  ).then(({ rows }) => {
    return rows;
  });
}

module.exports = {selectAllTopics}

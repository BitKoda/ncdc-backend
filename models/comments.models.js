const db = require('../db/connection.js');

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query('SELECT * FROM comments WHERE article_id = $1;', [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

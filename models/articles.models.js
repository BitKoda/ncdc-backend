const db = require('../db/connection.js');

exports.selectArticleById = (articleId) => {
  return db.query(
    'SELECT * FROM articles WHERE article_id = $1;', [articleId]
  ).then(({ rows }) => {
    // If no article is returned (does not exist)
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: "article not found"});
    }

    return rows[0];
  });
}

exports.updateArticleById = (articleId, body) => {
  const inc_votes = body.inc_votes;
  return db
    .query(
      'UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;', [articleId, inc_votes]
  ).then(({ rows }) => {
    return rows[0];
  });
}

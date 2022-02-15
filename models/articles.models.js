const db = require('../db/connection.js');

exports.selectArticleById = (articleId) => {
  return db.query(
    'SELECT * FROM articles WHERE article_id = $1;', [articleId]
  ).then(({ rows }) => {
    // If no article is returned (does not exist)
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: "article not found"});
    }

    return rows[0]; //console.log(rows);
  });
}

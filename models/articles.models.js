const db = require('../db/connection.js');

exports.selectAllArticles = () => {
  return db.query(
    'SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id;'
  ).then(({rows}) => {
    return rows;
  });
}

exports.selectArticleById = (articleId) => {
  return db.query(
    'SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;', [articleId]
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
    // If no article is returned (does not exist)
    if (rows.length === 0) {
      return Promise.reject({status: 404, msg: "article not found"});
    }
    
    return rows[0];
  });
};

exports.checkArticleExists = (article_id) => {
  return db
  .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
  .then(({ rows }) => {
    if (!rows.length)
      return Promise.reject({status: 404, msg: "article not found"});
    return rows;
  });
};

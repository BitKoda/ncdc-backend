const db = require('../db/connection.js');

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query('SELECT * FROM comments WHERE article_id = $1;', [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertCommentOnArticle = (newComment, article_id) => {
  const {author, body} = newComment;
  return db
    .query(
      'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;', [article_id, author, body]
    )
  .then(({rows}) => { 
    return rows[0];
  });
}

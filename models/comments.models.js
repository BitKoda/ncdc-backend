const db = require('../db/connection.js');

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query('SELECT * FROM comments WHERE article_id = $1;', [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.deleteCommentById = (comment_id) => {
  return db
    .query('DELETE FROM comments WHERE comment_id = $1;', [comment_id])
    .then((result) => {
      result.rows[0];
    });
  
exports.insertCommentOnArticle = (newComment, article_id) => {
  const {author, body} = newComment;
  console.log(author);
  return db
    .query(
      'INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;', [article_id, author, body]
    )
  .then(({rows}) => { 
    return rows[0];
  });
}

const { 
  selectCommentsByArticleId,  
  deleteCommentById,
} = require('../models/comments.models.js');
const { checkArticleExists } = require('../models/articles.models.js');

exports.getCommentsByArticleId = (req, res, next) => {
  const article_id = req.params.id;
  Promise.all([selectCommentsByArticleId(article_id), checkArticleExists(article_id)])
  .then(([comments]) => {
    res.status(200).send({ comments });
  })
  .catch((err) => {
    next(err);
  });
}

exports.removeCommentById = (req, res, next) => {
  const comment_id = req.params.comment_id;
  deleteCommentById(comment_id)
    .then((comment) => {
      res.status(204).send();
    });
}

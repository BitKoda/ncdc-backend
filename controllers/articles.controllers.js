const {
  selectArticleById,
} = require('../models/articles.models');

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.id;
  selectArticleById(articleId)
    .then((article) => {
    res.status(200).send({ article });
  })
  .catch((err) => {
    next(err);
  });  
}

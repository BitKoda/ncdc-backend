const {
  selectAllArticles,
  selectArticleById,
  updateArticleById,
} = require('../models/articles.models');

exports.getAllArticles = (req, res, next) => {
  selectAllArticles()
  .then((articles) => {
    res.status(200).send({articles});
  })
  .catch((err) => {
    next(err);
  });
}

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

exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.id;
  const currentVotes =
  updateArticleById(articleId, req.body)
  .then((article) => {
    res.status(200).send({article});
  })
  .catch((err) => {
//    console.log(err)
    next(err);
  });
};

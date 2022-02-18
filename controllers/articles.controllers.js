const {
  selectAllArticles,
  selectArticleById,
  updateArticleById,
} = require('../models/articles.models');

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order } = req.query;
  console.log(sort_by, "<<<--- SORT from controller query")
  console.log(order, "<<<--- ORDER from controller query")
  selectAllArticles(sort_by, order)
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

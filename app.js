const express = require('express');
const app = express();
app.use(express.json());

const { 
  handlePSQLerr, 
  handleCustomErr,
  handle500err 
} = require('./errors.js');

const data = require('./res.json');

const {
  getCommentsByArticleId,
  removeCommentById,
  postCommentWithArticleId,
} = require('./controllers/comments.controllers.js');

const {
  getAllUsers,
} = require('./controllers/users.controllers');

const {
  getAllTopics,
} = require('./controllers/topics.controllers');

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require('./controllers/articles.controllers');

// --- HOME --- //
app.get('/api', function (req, res) {
  res.json(data);
});

// --- USERS --- //
app.get('/api/users', getAllUsers);

// --- TOPICS --- //
app.get('/api/topics', getAllTopics);

// --- ARTICLES --- //
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:id', getArticleById);
app.patch('/api/articles/:id', patchArticleById);

// --- COMMENTS --- //
app.post('/api/articles/:id/comments', postCommentWithArticleId);
app.get('/api/articles/:id/comments', getCommentsByArticleId);
app.delete('/api/comments/:comment_id', removeCommentById);

// --- ERROR HANDLING --- //
app.all('/api/*', (req, res) => {
  res.status(404).send({msg: "path not found"});
});

app.use(handlePSQLerr);
app.use(handleCustomErr);
app.use(handle500err);

module.exports = app;

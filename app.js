const express = require('express');
const app = express();
app.use(express.json());

const { 
  handlePSQLerr, 
  handleCustomErr,
  handle500err 
} = require('./errors.js');

const {
  getAllTopics,
} = require('./controllers/topics.controllers');

const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require('./controllers/articles.controllers');

// --- TOPICS --- //
app.get('/api/topics', getAllTopics);

// --- ARTICLES --- //
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:id', getArticleById);
app.patch('/api/articles/:id', patchArticleById);

// --- ERROR HANDLING --- //
app.all('/api/*', (req, res) => {
  res.status(404).send({msg: "path not found"});
});

app.use(handlePSQLerr);
app.use(handleCustomErr);
app.use(handle500err);

//const server = app.listen(3000, () => {
//  console.log('Server running....')
//}

module.exports = app;

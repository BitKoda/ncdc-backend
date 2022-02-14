const express = require('express');
const app = express();
app.use(express.json());

const {getAllTopics} = require('./controllers/topics.controllers');

app.get('/api/topics', getAllTopics);

app.all('/api/*', (req, res) => {
  res.status(404).send({msg: "path not found"});
});

//const server = app.listen(3000, () => {
//  console.log('Server running....')
//}

module.exports = app;

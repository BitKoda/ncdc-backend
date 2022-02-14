const {
  selectAllTopics,
} = require('../models/topics.models');

const getAllTopics = (req, res) => {
  selectAllTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  })
}

module.exports = {getAllTopics}

const {
  selectAllUsers,
} = require('../models/users.models');

const getAllUsers = (req, res) => {
 selectAllUsers().then((users) => {
    res.status(200).send({ users: users });
  })
}

module.exports = {getAllUsers}

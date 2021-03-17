const express = require('express');

const router = express.Router();

const {
  updateUser,
  deleteUser,
  getUser,
} = require('../controller/userController');

// users == base path
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser);

module.exports = router;

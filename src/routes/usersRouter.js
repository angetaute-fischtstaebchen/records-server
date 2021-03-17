const express = require('express');
const router = express.Router();

const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getRecords,
  deleteRecords,
} = require('../controller/userController');

//users == base path
router.route('/signup').post(addUser);
router.route('/login').get(getUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/dashboard').get(getRecords).delete(deleteRecords);

module.exports = router;

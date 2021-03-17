const express = require('express');
const router = express.Router();

const { updateUser, deleteUser } = require('../controller/userController');

//users == base path
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;

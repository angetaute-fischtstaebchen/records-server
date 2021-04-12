const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/authentication');

const { updateUser, deleteUser } = require('../controller/userController');

// users == base path
router.route('/:id').patch(auth, updateUser).delete(auth, deleteUser);

module.exports = router;

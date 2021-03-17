const express = require('express');

const router = express.Router();

const { loginUser, addUser } = require('../controller/userController');

// '/'== base path
router.route('/login').post(loginUser);
router.route('/signup').post(addUser);

module.exports = router;

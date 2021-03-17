const express = require('express');
const router = express.Router();

const { getUser, addUser } = require('../controller/userController');

// '/'== base path
router.route('/login').get(getUser);
router.route('/signup').post(addUser);

module.exports = router;

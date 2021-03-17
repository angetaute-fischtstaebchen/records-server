const express = require('express');
const router = express.Router();

const { getUser } = require('../controller/userController');

//login == base path
router.route('/').get(getUser);

module.exports = router;

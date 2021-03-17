const express = require('express');
const router = express.Router();

const { addUser } = require('../controller/userController');

//signup == base path
router.route('/').post(addUser);

module.exports = router;

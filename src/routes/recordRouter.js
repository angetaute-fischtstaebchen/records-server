const express = require('express');
const router = express.Router();

const { getRecords, deleteRecords } = require('../controller/userController');

//dashboard == base path
router.route('/').get(getRecords).delete(deleteRecords);

module.exports = router;

const express = require('express');

const router = express.Router();

const { showOrders } = require('../controller/orderController');

// orders == base path
router.route('/').get(showOrders);

module.exports = router;

const Order = require('../models/Order');

const showOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.find().populate('recordId', '-_id ');
    console.log('print all orders');
    res.json(allOrders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  showOrders,
};

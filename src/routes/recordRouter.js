const express = require('express');
const router = express.Router();

const {
  getRecords,
  deleteRecords,
  addRecord,
} = require('../controller/recordController');

//dashboard == base path
router.route('/').get(getRecords).post(addRecord);
router.route('/:id').delete(deleteRecords);

module.exports = router;

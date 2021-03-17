const express = require('express');

const router = express.Router();

const {
  getRecords,
  deleteRecord,
  addRecord,
} = require('../controller/recordController');

// dashboard == base path
router.route('/').get(getRecords).post(addRecord);
router.route('/:id').delete(deleteRecord);

module.exports = router;

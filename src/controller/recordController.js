const Record = require('../models/Record');

const getRecords = async (req, res, next) => {
  try {
    const allRecords = await Record.find().sort('title');
    res.json(allRecords);
  } catch (err) {
    next(err);
  }
};

// for testing
const addRecord = async (req, res, next) => {
  const recordInfo = req.body;
  try {
    const newRecord = await Record.create(recordInfo);
    res.json(newRecord);
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    const RecordToDelete = await Record.findByIdAndDelete(id);
    res.json(RecordToDelete);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecords,
  deleteRecord,
  addRecord,
};

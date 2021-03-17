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
const getRecord = async (req, res, next) => {
  const { id } = req.params; // tbd
  try {
    const record = await Record.findById(id);
    res.json(record);
  } catch (err) {
    next(err);
  }
};

//for testing
const addRecord = async (req, res, next) => {
  const recordInfo = req.body;
  try {
    const newRecord = await Record.create(recordInfo);
    res.json(newRecord);
  } catch (err) {
    next(err);
  }
};

//not necessary till now
// const updateRecord = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const UpdatedRecord = await Record.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(UpdatedRecord);
//   } catch (err) {
//     next(err);
//   }
// };

const deleteRecords = async (req, res, next) => {
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
  deleteRecords,
  getRecord,
  addRecord,
};

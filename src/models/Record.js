const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const RecordSchema = new Schema(
  {
    cover: { type: String, required: true, default: 'xyz' },
    title: { type: String, required: true },
    artist: { type: String, required: false },
    year: { type: Number, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Record = model('Record', RecordSchema);

module.exports = Record;

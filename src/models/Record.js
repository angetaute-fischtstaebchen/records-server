const mongoose = require('mongoose');
// const path = require('path');

const { Schema, model } = mongoose;

const RecordSchema = new Schema(
  {
    cover: {
      type: String,
      default: 'http:localhost:5000/statics/assets/record01.png',
      required: true,
    },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Record = model('Record', RecordSchema);

module.exports = Record;

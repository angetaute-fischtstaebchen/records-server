const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default: 'http://localhost:5000/statics/avatar/dog.png',
    },
    baseAvatarUrl: {
      type: String,
      required: true,
      default: 'http://localhost:5000/statics/avatar',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model('User', UserSchema);

module.exports = User;

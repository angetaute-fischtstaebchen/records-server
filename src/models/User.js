const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: [true, 'First Name missing'] },
    lastName: { type: String, required: [true, 'Last Name missing'] },
    nickname: { type: String, required: false },
    email: {
      type: String,
      required: [true, 'Email address is missing'],
      unique: [true, 'The email address already exists'],
      validate: [validator.isEmail, 'Enter a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'You need a password to secure your account!'],
      minLength: [6, 'Password should be at least six characters'],
    },
    avatar: {
      type: String,
      default: 'http://localhost:5000/statics/avatar/dog.png',
    },
    baseAvatarUrl: {
      type: String,
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

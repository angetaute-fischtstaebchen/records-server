require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Schema, model } = mongoose;

const secretKey = process.env.JWT_SECRET;

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
// Pre save
// eslint-disable-next-line func-names
UserSchema.pre('save', function () {
  const user = this;

  // convert password to password hash
  if (user.isModified('password')) {
    user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds(default 10)
  }
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt
    // eslint-disable-next-line no-underscore-dangle
    .sign({ _id: user._id.toString() }, secretKey, {
      expiresIn: '1h',
    })
    .toString();

  return token;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  try {
    const decode = jwt.verify(token, secretKey);
    console.log('decode: ', decode);
    // eslint-disable-next-line no-underscore-dangle
    return User.findOne({ _id: decode._id });
  } catch (error) {
    return error;
  }
};

const User = model('User', UserSchema);

module.exports = User;

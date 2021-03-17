const User = require('../models/User');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
    if (user.length < 1) {
      throw new Error('User does not exists.Please signup');
    }
    res.json(user);
  } catch (err) {
    const error = new Error(
      `User with ${email} does not exist. Please signup.`
    );
    error.status = 400;
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  const userInfo = req.body;
  try {
    const newUser = await User.create(userInfo);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const UpdatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(UpdatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const UserToDelete = await User.findByIdAndDelete(id);
    res.json(UserToDelete);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};

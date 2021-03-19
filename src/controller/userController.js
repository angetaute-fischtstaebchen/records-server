const User = require('../models/User');
const { handleLoginError } = require('../helpers/handleLoginError');
const { handleFindOne } = require('../helpers/handleFindOne');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }, (err, person) => {
      handleFindOne({ person, email, password, next });
    });

    res.json(user);
  } catch (err) {
    next(handleLoginError(`Error login in the user`));
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
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userToDelete = await User.findByIdAndDelete(id);
    res.json(userToDelete);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  loginUser,
};

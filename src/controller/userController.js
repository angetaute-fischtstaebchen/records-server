const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { handleLoginError } = require('../helpers/handleLoginError');

// eslint-disable-next-line consistent-return
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return next(handleLoginError(`User with ${email} does not exist`, 401));

    // check password mit hashed one in db
    const pwCompareResult = bcryptjs.compareSync(password, user.password);

    if (!pwCompareResult) {
      return next(handleLoginError('Your password is wrong', 401));
    }

    const token = user.generateAuthToken();

    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 646800000),
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        // eslint-disable-next-line no-unneeded-ternary
        secure: process.env.NODE_ENV === 'production' ? true : false,
        // http on localhost, https on production});
        httpOnly: true,
      })
      .json(user);
  } catch (err) {
    next(handleLoginError(`Error login in the user`));
  }
};

// logout user

const logoutUser = async (req, res, next) => {
  res.clearCookie('token', {
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    // eslint-disable-next-line no-unneeded-ternary
    secure: process.env.NODE_ENV === 'production' ? true : false,
    // http on localhost, https on production
    httpOnly: true,
  }); // clear the cookie in the browser
  res.json({ message: 'Logged you out successfully' });
};

const addUser = async (req, res, next) => {
  const userInfo = req.body;
  try {
    const newUser = await User.create(userInfo);
    const token = newUser.generateAuthToken();
    res
      .cookie('token', token, {
        expires: new Date(Date.now() + 646800000),
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
        secure: process.env.NODE_ENV === 'production', // http on localhost, https on production
        httpOnly: true,
      })
      .json(newUser);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return next(handleLoginError(`there is no User with id ${id}`));
    Object.assign(user, req.body);

    const updatedUser = await User.save();
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
  logoutUser,
};

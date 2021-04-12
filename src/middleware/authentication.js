const { handleAuthError } = require('../helpers/handleAuthError');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('token', token);
    const user = await User.finndByToken(token);
    if (!user) next(handleAuthError('there is no user with the given token'));
  } catch (err) {
    next(handleAuthError(err));
  }
};

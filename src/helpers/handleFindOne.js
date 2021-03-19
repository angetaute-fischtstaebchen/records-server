/* eslint-disable consistent-return */
const { handleLoginError } = require('./handleLoginError');

const handleFindOne = ({ person, email, password, next }) => {
  if (person === null) {
    return next(
      handleLoginError(
        `User with email: ${email} does not exist. Please signup.`
      )
    );
  }
  if (person.password !== password) {
    return next(
      handleLoginError(
        `Hey, it seems like your password is wrong. Did you forget it?`
      )
    );
  }
};

module.exports = { handleFindOne };

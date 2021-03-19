/* eslint-disable consistent-return */
const {
  handleDuplicateKeyError,
} = require('../helpers/handleDuplicateKeyError');
const { handleValidationError } = require('../helpers/handleValidationError');

const errorController = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(err.status).send({
      messages: err.message,
    });
  }

  try {
    if (err.name === 'ValidationError') return handleValidationError(err, res);
    if (err.code && err.code === 11000)
      return handleDuplicateKeyError(err, res);
  } catch (error) {
    res.status(500).send(`An unknown error occurred ${error}`);
  }
};

module.exports = { errorController };

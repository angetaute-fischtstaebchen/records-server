const handleLoginError = (errorString) => {
  const error = new Error(errorString);
  error.status = 401;
  return error;
};

module.exports = { handleLoginError };

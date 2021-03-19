const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const fields = Object.values(err.errors).map((el) => el.path);
  const code = 400;

  if (errors.length > 1) {
    const formattedErrors = errors.join('. ');
    res.status(code).send({ messages: formattedErrors, fields });
  } else {
    res.status(code).send({ messages: errors, fields });
  }
};

module.exports = { handleValidationError };

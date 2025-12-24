const ApiError = require("../utils/api-error");

const validate = (schema) => (req, res, next) => {
  const toValidate = {
    body: req.body,
    query: req.query,
    params: req.params
  };
  const { error, value } = schema.validate(toValidate, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  });

  if (error) {
    return next(
      new ApiError(
        400,
        "Validation error",
        error.details.map((d) => d.message)
      )
    );
  }

  req.body = value.body || req.body;
  req.query = value.query || req.query;
  req.params = value.params || req.params;
  next();
};

module.exports = validate;

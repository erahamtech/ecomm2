const logger = require("../utils/logger");
const ApiResponse = require("../utils/response");

const notFound = (req, res, next) => {
  res.status(404).json(new ApiResponse(false, null, "Route not found"));
};

const globalErrorHandler = (err, req, res, next) => {
  logger.error("Error", {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500
  });

  const statusCode = err.statusCode || 500;
  const message =
    statusCode >= 500 ? "Something went wrong" : err.message || "Error";

  res.status(statusCode).json(
    new ApiResponse(false, err.details || null, message)
  );
};

module.exports = { notFound, globalErrorHandler };

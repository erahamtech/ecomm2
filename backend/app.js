const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const routes = require("./routes");

const { notFound, globalErrorHandler } = require("./middleware/error.middleware");
const { baseRateLimiter } = require("./middleware/ratelimit.middleware");
const securityMiddleware = require("./middleware/security.middleware");

const app = express();

// Security headers & basic middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());
app.use(mongoSanitize());
app.use(xssClean());
app.use(morgan("combined"));

// Rate limiting
app.use("/api", baseRateLimiter);

// Custom security (IP block etc.)
app.use(securityMiddleware);

// Routes
app.get("/api/", async (req, res) => {
  return res.json({ message: "Ecommerce Backend Running! Explore Apis."})
});

app.use("/api", routes);

// 404 & error handler
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;

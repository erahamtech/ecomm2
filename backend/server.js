require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db.config");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
})();

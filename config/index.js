const dotenv = require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8000,
  DB_HOST: process.env.DB_HOST_DEV || "127.0.0.1",
  DB_USER: process.env.DB_USER_DEV || "postgres",
  DB_PASS: process.env.DB_PASS_DEV || "root",
  DB_NAME: process.env.EMS_SERVER_DB || "yocket_task_db",
};

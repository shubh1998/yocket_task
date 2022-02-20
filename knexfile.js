// Update with your config settings.
const config = require("./config")
const path = require("path");
const migrations_path = path.join(__dirname, "./src/migrations");

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    migrations: {
      directory: migrations_path,
    },
    connection: {
      //All server-specific secrets are stored in the .env file
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASS,
      database: config.DB_NAME,
    },
    pool: {
      min: 0,
      max: 50,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      // host: config.DB_HOST_PROD,
      // user: config.DB_USER_PROD,
      // password: config.DB_PASS_PROD,
      // database: config.DB_NAME_PROD
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "cryptowallet_admin",
  host: "localhost",
  database: "users_db",
  password: "root",
  port: 5432,
});

module.exports = pool;
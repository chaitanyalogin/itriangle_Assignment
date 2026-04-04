const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "approval_system",
    password: "Musicislife.123",
    port: 5432,
});

module.exports = pool;
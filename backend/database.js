require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    port: process.env.DB_PORT || "3306",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

module.exports = db;


const mysql = require('mysql2');

//configuration du pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,      // ← Lit depuis .env
  user: process.env.DB_USER,      // ← Lit depuis .env
  password: process.env.DB_PASSWORD, // ← Lit depuis .env
  database: process.env.DB_NAME,  // ← Lit depuis .env
  
});

module.exports = db;


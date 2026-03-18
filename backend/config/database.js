const mysql = require('mysql2/promise');

//configuration du pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,      // ← Lit depuis .env
  user: process.env.DB_USER,      // ← Lit depuis .env
  password: process.env.DB_PASSWORD, // ← Lit depuis .env
  database: process.env.DB_NAME,  // ← Lit depuis .env
  
});

// Tester la connexion au démarrage
pool.getConnection()
  .then(connection => {
    console.log("Connexion à la base de données réussie !");
    connection.release();
  })
  .catch(error => {
    console.error("Erreur de connexion à la base de données :", error.message);
  });

module.exports = db;


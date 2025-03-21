const mysql = require('mysql2');

// Create a connection pool to handle multiple requests
const db = mysql.createPool({
  host: 'localhost', // MySQL server
  user: 'root',      // MySQL username
  password: '******',      // MySQL password
  database: 'url_shortener' // Database name
});

db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// ✅ Use promise-based pool
const promisePool = db.promise();

module.exports = promisePool;

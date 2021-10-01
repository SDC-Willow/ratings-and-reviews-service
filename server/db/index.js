const mysql = require('mysql2');

var dbConnection;
dbConnection = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: 'sdcReviews',
  charset: 'utf8mb4'
});
dbConnection.connect((err) => {
  if (err) {
    console.log('errrrrrrrrr', err);
  } else {
    console.log('🦄', 'yessssssss');
  }
});

module.exports = dbConnection;

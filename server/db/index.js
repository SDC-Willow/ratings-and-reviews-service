const mysql = require('mysql');

var dbConnection;
dbConnection = mysql.createConnection({
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'sdcReviews'
});
dbConnection.connect();

module.exports = dbConnection;

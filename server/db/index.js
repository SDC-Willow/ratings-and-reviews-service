var mysql = require('mysql');
var {password} = require('../password.js');

var dbConnection;
dbConnection = mysql.createConnection({
  user: 'root',
  password: password,
  database: 'sdcReviews'
});
dbConnection.connect();

module.exports = dbConnection;

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'q',
  password: ''
})

connection.connect();
//query goes here

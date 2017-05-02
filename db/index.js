const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'q',
  password: '',
});

connection.connect();
// query goes here

module.exports = {
  insertQ(values, callback) {
    const queryString = `INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;
    connection.query(queryString, values, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  getAll(callback) {
    connection.query('SELECT * FROM events', (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};

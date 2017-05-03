const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
    const queryString = `INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

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


  createUser(values, callback) {
    var password = values[1];
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        callback(err, console.log('Password cannot be hashed'));
      } else {
        values[1] = hash;
        const queryString = `INSERT INTO users (username, password, city, state, phone, contactEmail, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

        connection.query(queryString, values, (err, results) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results);
          }
        })
      }
    });
  },

  findUser(username, callback) {
    connection.query(`SELECT * FROM users WHERE username = ` + username + `;`, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

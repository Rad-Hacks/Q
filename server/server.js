const express = require('express');
// const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../db/index.js');
// const authConfig = require('./config/auth');

const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get info from html forms;
app.use(bodyParser.urlencoded({
  extended: true,
}));
// app.use(express.static(path.join(__dirname, '/../server/client/public')));

const hashUserId = (req) => {
  const userInfo = Object.keys(req.body).map(key => req.body[key]);
  const username = req.body.username;
  const cipher = crypto.createHash('sha1');
  cipher.update(username);
  const userId = cipher.digest('hex');
  userInfo.push(userId);
  return userInfo;
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/events', (req, res) => {
  db.getAll((err, eventsDb) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(eventsDb);
    }
  });
});

app.post('/api/events', (req, res) => {
  const values = Object.keys(req.body).map(key => req.body[key]);
  db.insertQ(values, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/api/users', (req, res) => {
  db.findUser(req.body.username, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else if (results.length > 0) {
      bcrypt.compare(req.body.password, results[0].password, (error, match) => {
        if (error) {
          res.sendStatus(500);
        }
        if (match) {
          res.send(200).json(results[0].user_id);
        } else {
          res.send(404);
        }
      });
    } else {
      res.send(500);
    }
  });
});

app.post('/api/users', (req, res) => {
  const userInfo = hashUserId(req);
  db.createUser(userInfo, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).json(userInfo[5]);
    }
  });
});

// user_id varchar (100) NOT NULL,
// username varchar (25) NOT NULL,
// password varchar (100) NOT NULL,
// city varchar (25) NOT NULL,
// state varchar (2) NOT NULL,
// phone varchar (11) NOT NULL,
// contactEmail

app.get('/api/googleusers', (req, res) => {
  console.log(req.body);
  db.findUser({ username: req.body.username }, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else if (results.length > 0) {
      res.status(200).json(results[0].user_id);
    }
  });
});

app.post('/api/googleusers', (req, res) => {
  const userInfo = hashUserId(req);
  db.createUser(userInfo, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(results);
      res.status(201).json(userInfo[5]);
    }
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080!');
});

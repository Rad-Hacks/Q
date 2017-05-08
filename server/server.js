const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const url = require('url');
const qs = require('query-string');
const db = require('../db/index.js');

const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get info from html forms;
app.use(bodyParser.urlencoded({
  extended: true,
}));
let sessLogin = null;
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

app.post('/api/usersLogin', (req, res) => {
  const user = JSON.stringify(req.body.username);
  db.findUser(user, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else if (results.length > 0) {
      bcrypt.compare(req.body.password, results[0].password, (error, match) => {
        if (error) {
          res.sendStatus(500);
        }
        if (match) {
          sessLogin = {
            userId: results[0].user_id,
            loggedIn: true,
          };
          res.status(201).json(sessLogin);
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
});

app.post('/api/usersCreate', (req, res) => {
  const userInfo = hashUserId(req);
  db.createUser(userInfo, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      sessLogin = {
        userId: userInfo[5],
        loggedIn: true,
      };
      res.status(201).json(sessLogin);
    }
  });
});

app.get('/api/googleusers', (req, res) => {
  const query = url.parse(req.url).query;
  const parsed = qs.parse(query);
  db.findUser(JSON.stringify(parsed.username), (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else if (results.length > 0) {
      sessLogin = {
        userId: results[0].user_id,
        loggedIn: true,
      };
      res.status(200).json(sessLogin);
    }
  });
});

app.post('/api/googleusers', (req, res) => {
  const userInfo = hashUserId(req);
  db.createUser(userInfo, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      sessLogin = {
        userId: userInfo[5],
        loggedIn: true,
      };
      res.status(201).json(sessLogin);
    }
  });
});

app.get('/api/logout', (req, res) => {
  sessLogin = null;
  res.send('loggedOut');
});

app.get('/api/insession', (req, res) => {
  if (sessLogin) {
    res.status(200).json(sessLogin);
  } else {
    res.status(200).json(false);
  }
});

app.listen(8080, () => {
  console.log('Listening on port 8080!');
});

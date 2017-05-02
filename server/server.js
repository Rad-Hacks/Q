const express = require('express');
// const path = require('path');
// const router = require('router');
const bodyParser = require('body-parser');
const db = require('../db/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
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
  console.log('Values at POST handle', values);
  db.insertQ(values, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});
app.listen(8080, () => {
  console.log('Listening on port 8080!');
});

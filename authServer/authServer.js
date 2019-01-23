const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { login, createUser } = require('./authFunctions.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/signup', createUser, login)

app.post('/api/login', login)

app.listen(3000,() => console.log("Auth on port 3000"))
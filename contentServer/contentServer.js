const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const {verifyToken} = require('./contentAuth.js');

const PORT = 3333;

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', verifyToken, (req,res) => {
  console.log('Token Verified')
})

app.listen(PORT, () => console.log('contentServer running on ', PORT))
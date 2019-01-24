const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const {verifyToken} = require('./contentAuth.js');
const {getPortfolio} = require('./portfolioActions.js');

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

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

app.get('/contentapi/portfolio', verifyToken, getPortfolio)

app.listen(PORT, () => console.log('contentServer running on ', PORT))
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const userAuth = require('./userAuth.js');
const dbCalls = require('./db-calls.js');
const tableCreater = require('./table-creator.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../client/dist')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', userAuth.quickCheck, (req,res,next)=> {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

app.post('/signup', userAuth.createUser, (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

// app.get('/home', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client/public/index.html'))
// })
app.post('/login', userAuth.checkAuth, dbCalls.getPosts)

app.post('/ddbPosts', dbCalls.makePosts)
app.get('/ddbinfo', userAuth.quickCheck, dbCalls.getPosts)
app.get('/create_table', tableCreater)

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`)
})
// const passport = require('passport');
const { Pool, Client } = require('pg'); 
const bcrypt = require('bcrypt');
const { authString } = require('./connection-string.js');
const uuid = require('uuid/v4');

const pool = new Pool({
  connectionString: authString
});

const seed = 10;
let fakePwd;

bcrypt.hash('fakePassword', seed, (err, hash) => {
  fakePwd = hash;
});

const userAuth = {
  // post('/signup')
  createUser: (req, res, next) => {
    text = 'INSERT INTO users(email, first_name, last_name, password) VALUES ($1,$2,$3,$4) RETURNING *'
    let values = [req.body.email, req.body.first_name, req.body.last_name];
    bcrypt.hash(req.body.password, seed, (err, hash)=>{
      values.push(hash);
      pool.connect((err, client, done) => {
        if(err) throw err;
        client.query(text, values, (err, data) => {
          done()
          console.log('createUser')
          if(err && err.code === '23505') res.send("User already exists");
          next()
        })
      })
    })
  },
  // put('/signin')
  checkAuth: (req, res, next) => {
    console.log('checkAuth', req.body)
    let text = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    // let eml = equals the email without special characters
    pool.connect((err, client, done) => {
      if(err) throw err;
      client.query(text, (err, data) => {
        done()
        let pwd = req.body.password;
        if(data.rows[0]) {
          bcrypt.compare(pwd, data.rows[0].password)
          .then(result => {
            if(result) {
              let key = currCookie // + eml
              let uniqueID = uuid()
              bcrypt.hash(uniqueID, 4, (err, hash) => {
                res.cookie(key, hash, { maxAge: 1000000});
                authCache[key] = uniqueID;
                next();
              })
            } else {
            res.json({creds: 'Invalid'});
            }
          })
        } else {
          bcrypt.compare(pwd, fakePwd)
          .then(result => {
            res.json({creds: 'Invalid'});
          })
        }
      })
    })
  },
  // get('/')
  quickCheck: (req, res, next) => {
    // let  xxx = eml concatenated with currCookie
    if(authCache[currCookie] && req.cookies[currCookie] /* xxx */) {
      bcrypt.compare(authCache[currCookie], req.cookies[currCookie])
      .then(result => {
        result ? res.redirect('/home') : next();
      })
    } else {
      next()
    }
  },
  cookieKeys: ['A3Z9c7','iJ73hN','X02d3B','s82nf3']
}

const currCookie = userAuth.cookieKeys[0];
const authCache = {};


module.exports = userAuth;
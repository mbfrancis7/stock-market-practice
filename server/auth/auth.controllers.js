const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg'); 
const bcrypt = require('bcrypt');

const { connectionString } = require('../../databaseConnections/connection-strings.js');

const pool = new Pool({connectionString});
const seed = 10;

const controllers = { 
  signup: (req, res, next) => {
    let { email, firstName, lastName } = req.body; // use regex to check rules
    let text = 'INSERT INTO users(email, firstName, lastName, password) VALUES ($1,$2,$3,$4) RETURNING *';
    let values = [email, firstName, lastName];
    bcrypt.hash(req.body.password, seed, (err, hash)=>{
      values.push(hash);
      pool.connect((err, db, done) => {
        if(err) throw err;
        db.query(text, values, (err, data) => {
          done()
          if(err) {
            if(err.code == '23505') {
              res.status(401).send({message:"User already exists"})
            } else {
              console.error(err)
              res.status(400).end()
            }
          } else {
            req.user = {firstName}
            next()
          }
        })
      })
    })
  },
  login: (req, res, next) => {
    let email = req.body.email // use regex to check
    let text = `SELECT * FROM users WHERE email = '${email}'`;
    pool.connect((err, client, done) => {
      if(err) throw err;
      client.query(text, (err, data) => {
        done()
        let userInfo = data.rows[0] ? data.rows[0] : null;
        if(userInfo) {
          let pwd = req.body.password;
          bcrypt.compare(pwd, userInfo.password)
          .then(result => {
            if(result) {
              req.user = {_id: userInfo._id, firstName: userInfo.firstname}
              next()
            } else {
              res.json({creds: 'Invalid'});
            }
          })
          .catch(err => {
            res.send({error: err})
          })
        } else {
          res.send({
            message: 'failed'
          })
        }
      })
    })
  },
  setToken: function(req,res) {
    console.log('setToken')
    let user = req.user;
    let token = jwt.sign(user,'secretKey', { expiresIn: 300 })
    res.set('Authorization', 'Bearer ' + token)
    res.send(user)
  },
  verifyToken: function(req,res,next) {
    if(!req.headers.authorization) {
      return res.status(401).end()
    }
    let token = req.headers.authorization.split(' ')[1]
    if(!token) {
      return res.status(401).end()
    }
    jwt.verify(token, 'secretKey', (err, data) => {
      if(err) {return res.json({message: err})}
      req.user = data;
      next()
    })
  },
  updateUser: function(req,res,next) {

  },
  deleteUser: function(req,res,next) {
    
  },
  resetPassword: function(req,res,next) {
    // get email and the send reset email
    res.send({message: 'Email Sent'})
  },
  updateId: function(req,res,next) {
    let text = `UPDATE users SET _id = '${req.user._id}' WHERE email = '${req.body.email}' RETURNING *`
    pool.connect((err, client) => {
      if(err) throw err;
      client.query(text, (err, data) => {
        if(err) throw err;
        console.log(data.rows);
        next()
      })
    })
    req.user._id
  }
}

module.exports = controllers;
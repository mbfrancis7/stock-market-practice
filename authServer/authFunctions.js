const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg'); 
const bcrypt = require('bcrypt');

const { authString } = require('../connection-string.js');

const pool = new Pool({connectionString: authString});
const seed = 10;

const authFunctions = { 
  createUser: (req, res, next) => {
  let email = req.body.email;
  let first = req.body.firstName;
  let last = req.body.lastName;
  let text = 'INSERT INTO users(email, first_name, last_name, password) VALUES ($1,$2,$3,$4) RETURNING *';
  let values = [email, first, last];
  bcrypt.hash(req.body.password, seed, (err, hash)=>{
    values.push(hash);
    pool.connect((err, db, done) => {
      if(err) throw err;
      db.query(text, values, (err, data) => {
        done()
        if(err && err.code === '23505') {
          res.send("User already exists")
        } else {
          next()
        }
      })
    })
  })
},

login: (req, res, next) => {
  let text = `SELECT * FROM users WHERE email = '${req.body.email}'`;
  console.log(req.body.email)
  pool.connect((err, client, done) => {
    if(err) throw err;
    client.query(text, (err, data) => {
      done()
      let pwd = req.body.password;
      let userInfo = data.rows[0] ? data.rows[0] : null;
      // if user exists in user database check password against stored bcryted password
      if(userInfo) {
        bcrypt.compare(pwd, userInfo.password)
        .then(result => {
          if(result) {
            let user = {
            name: userInfo.first_name + ' ' + userInfo.last_name,
            email: userInfo.email
            }
            let token = jwt.sign({user},'secretKey',{ expiresIn: 60 })
            console.log(token)
            res.cookie('Authorization', token, { maxAge: 60000, httpOnly: true })
            res.json({auth: true})
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
  // get('/')
verifyToken: (req, res, next) => {
    next()
}
}

module.exports = authFunctions;
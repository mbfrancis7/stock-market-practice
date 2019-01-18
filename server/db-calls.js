const { Pool } = require('pg');
const path = require('path');
const {authString} = require('./connection-string.js')

const pool = new Pool({
  connectionString: authString
})

module.exports = {
  makePosts: (req, res, next) => {
    let query = 'INSERT INTO posts(url, content, dog) VALUES ($1,$2,$3) RETURNING *'
    let relativePath = req.body.imgName;
    console.log(relativePath)
    let content = 'dog in a scarf';
    let dog = 'scout';
    let values = [relativePath, content, dog]
    pool.connect((err, client, done) => {
      if(err) throw err;
      client.query(query, values, (err, data) => {
        done()
        if(err) throw err;
        res.send(data)
      })
    })
  },
  getPosts: (req, res, next) => {
    let query = 'SELECT * FROM users'
    pool.connect((err, client, done) => {
      if(err) throw err;
      client.query(query, (err, data) => {
        done()
        console.log(data)
        res.send(data.rows)
      })
    })
  },
}

const { Pool, Client } = require('pg');

const connectionString = require('./connection-string.js');

const pool = new Pool({connectionString: connectionString.postString});

module.exports = (req, res) => {
  // let value = req.tableName;
  // let text = `CREATE TABLE users(email TEXT PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, password TEXT NOT NULL)`
  let text = `CREATE TABLE posts(url TEXT PRIMARY KEY, content TEXT NOT NULL, dog TEXT NOT NULL)`
  pool.connect((err, client, done) => {
    if(err) throw err;
    client.query(text, (err, data) => {
      if(err) throw err;
      res.send(data)
    })
  })
}
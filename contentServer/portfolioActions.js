const { Pool, Client } = require('pg');
const fetch = require('node-fetch');

const {connectionString} = require('../databaseConnections/connection-strings.js');

const pool = new Pool({connectionString})

module.exports = {
  getPortfolio: function(req,res,next) {
    let userId = req.body.token.user.id;
    let text = `SELECT * FROM portfolio WHERE id = '${userId}' AND current_shares > 0`;
    pool.connect((err, db, done) => {
      if(err) throw err;
      db.query(text, (err,data) => {
        if(err) throw err;
        console.log(data);
        res.json(data.rows)
      })
    })
  },
  makeTransaction: function(req,res,next) {
    let userId = res.body.token.user.id;
    let text = `INSERT INTO portfolio (id,stock,quantity, price, current_shares) VALUES ($1,$2,$3,$4) RETURNING *`
    let stock = res.body.purchase.stock;
    let quantity = res.body.purchase.quantity;
    let current_shares = res.body.purchase.current_shares;
    let values = [userId,stock,quantity,current_shares]
    pool.connect((err,db,done) => {
      if(err) throw err;
      db.query(text, values, (err, data) => {
        if(err) throw err;
        res.send(data);
      })
    })
  },
  quandlAPI: function(req, res, next) {
    fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${req.params.stock}.json?api_key=7hZZyEtskhzwT535qiJx&start_date=2013-03-27`)
    .then(response => response.json())
    .then(result => {
      // eventually this functionality will be moved to a python server
      let column_names = result.dataset.column_names;
      column_names = [column_names[0],column_names[4]]
      let data = result.dataset.data;
      for(let i in data) {
        data[i] = [data[i][0],data[i][4]]
      }
      res.json({column_names, data})
    });
  }
}

function connectAndQuery(text, values) {
  pool.connect((err,db,done) => {
    if(err) throw err;
    db.query(text,values,(err,data) => {
      if(err) throw err;
      
    })
  })
}

// CREATE TABLE portfolio(order_number INTEGER PRIMARY KEY DEFAULT nextval('order_number_seq'), id INTEGER NOT NULL, stock varchar(30) NOT NULL, quantity INTEGER NOT NULL, price INTEGER NOT NULL, current_shares INTEGER NOT NULL)
const { Pool, Client } = require('pg');
const fetch = require('node-fetch');
const mongoose = require('mongoose')

const {connectionString, mongodbUrl } = require('../../databaseConnections/configs.js');
const portfolio = require('./portfolio.schema.js')

const pool = new Pool({connectionString})

module.exports = {
  createPortfolio: function(req,res,next) {
    mongoose.connect(mongodbUrl, { useNewUrlParser: true })
    const mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'connection error:'));
    mongoDB.once('open', function() {
      portfolio.create({portfolio: {stock: 'test'}},(err, portfolio) => {
        mongoDB.close()
        if(err) throw err;
        req.user._id = portfolio._id
        next()
      })
    });
  },
  getPortfolio: function(req,res,next) {
    res.send({message: 'portfolio'})
  },
  updatePortfolio: function(req,res,next) {
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
  deletePortfolio: function(req,res,next) {

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

// mongoose.connect(mongodbUrl, { useNewUrlParser: true })

// const mongoDB = mongoose.connection;
// mongoDB.on('error', console.error.bind(console, 'connection error:'));
// mongoDB.once('open', function() {
//   const newPortfolio = new Portfolio({
//     id: 1,
//     portfolio: {message: 'test'}
//   })
//   newPortfolio.save((err, portfolio) => {
//     if(err) throw err;
//     console.log(portfolio)
//     mongoDB.close()
//   })
// });


// CREATE TABLE portfolio(order_number INTEGER PRIMARY KEY DEFAULT nextval('order_number_seq'), id INTEGER NOT NULL, stock varchar(30) NOT NULL, quantity INTEGER NOT NULL, price INTEGER NOT NULL, current_shares INTEGER NOT NULL)
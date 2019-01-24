const { Pool, Client } = require('pg');

const {connectionString} = require('../databaseConnections/connection-strings.js');

const pool = new Pool({connectionString})

module.exports = {
  getPortfolio: function(req,res,next) {
    
  },
  purchaseStock: function(req,res,next) {

  },
  sellStock: function(req,res,next) {

  }
}


// CREATE TABLE portfolio(order_number INTEGER PRIMARY KEY DEFAULT nextval('order_number_seq'), id INTEGER NOT NULL, stock varchar(30) NOT NULL, quantity INTEGER NOT NULL, current_shares INTEGER NOT NULL)
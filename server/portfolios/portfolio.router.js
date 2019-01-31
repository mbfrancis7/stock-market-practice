const express = require('express');
const { getPortfolio, updatePortfolio, deletePortfolio} = require('./portfolio.controllers.js');

const router = express.Router();

router.route('/')
  .get(getPortfolio)
  .put(updatePortfolio)
  .delete(deletePortfolio)

module.exports = router;
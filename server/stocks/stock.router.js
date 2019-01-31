const express = require('express');
const { getStock } = require('./stock.controllers')

const router = express.Router();

router.get('/:id', getStock)

module.exports = router;
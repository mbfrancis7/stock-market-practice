const express = require('express')
const {signup, login, updateUser, deleteUser, resetPassword, setToken, verifyToken, updateId} = require('./auth.controllers')
const { createPortfolio, deletePortfolio } = require('../portfolios/portfolio.controllers')

const router = express.Router()

router.post('/signup', signup, createPortfolio, updateId, setToken)

router.post('/login', login, setToken)

router.route('/:id')
  .post(resetPassword)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router;
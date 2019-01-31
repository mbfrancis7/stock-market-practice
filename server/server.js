const express = require('express');
const {json, urlencoded} = require('body-parser');
const path = require('path');
const cors = require('cors');
const authRouter = require('./auth/auth.router');
const portfolioRouter = require('./portfolios/portfolio.router');
const stockRouter = require('./stocks/stock.router');
const {verifyToken} = require('./auth/auth.controllers')

const PORT = 3333;

const app = express()

app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', (req,res,next) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

app.use('/auth', authRouter)

app.use('/api', verifyToken)

app.use('/api/portfolio', portfolioRouter)

app.use('/api/stocks', stockRouter)

app.listen(PORT, () => console.log('server running on ', PORT))
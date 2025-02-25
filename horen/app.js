const helmet = require('helmet')
const cors = require('cors')

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const usersRouter = require('./routes/users')
app.use('/horen', usersRouter)

module.exports = app
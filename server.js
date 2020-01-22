require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fetch = require('node-fetch')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const UserRouter = require('./routes/User')
app.use('/User', UserRouter)





app.listen(3000, () => console.log('server started'))






require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const UserRouter = require('./routes/User')
app.use('/User', UserRouter)


//Endpoint um aus der Weatherstack API die wetterdaten zu holen
//https://weatherstack.com/documentation durchgucken. route-handler funktioniert noch nicht wie gewollt.

const params = {
  access_key: process.env.WEATHER_STACK_API_KEY,
  query: 'Gummersbach'
}
app.get()
app.listen(3000, () => console.log('server started'))






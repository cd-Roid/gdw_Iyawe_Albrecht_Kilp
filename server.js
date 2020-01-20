//lädt die env datei
require ('dotenv').config()

//holt die express und mongoose dependencies
const express = require('express')
const app  = express()
const mongoose = require('mongoose')

//app wird mit mongoose verbunden
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

//database test
db.on('err', (err)=>console.error(err))
db.openUri('open',()=> console.log('Connected to DB'))

//Server initialisiert und verbunden
app.listen(3000, ()=> console.log('Server started'))
app.use(express.json())


//Express Routen
const UserRouten = require('./routes/User')
app.use('/User',UserRouten)
<<<<<<< HEAD



=======
>>>>>>> parent of fa0871e... get, post, patch und delete routes implimentiert

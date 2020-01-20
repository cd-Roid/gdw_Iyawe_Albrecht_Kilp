//lädt die env datei
require ('dotenv').config()
const UserRouten = require('./routes/User')



//holt die express und mongoose dependencies
const express = require('express')
const app  = express()
const mongoose = require('mongoose')
const User = require('../gdw_Iyawe_Albrecht_Kilp/models/Usermodel')

//app wird mit mongoose verbunden
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true ,useUnifiedTopology: true })
const db = mongoose.connection()

//database test
db.on('err', (err)=>console.error(err))
db.once('open',( ) => console.log('Connected to DB'))



//Server initialisiert und verbunden
app.listen(3000, ()=> console.log('Server started'))
app.use(express.json())

//middleware um die ids zu holen
app.get('/:id',  async function get_User_by_Id(req,res,next){
    console.log(req.params.id)
    let toGet = await User.findById(req.params.id)
    .then( Userfound => {
          if(!Userfound){ return res.status(404).end()}
         return  res.status(200).json(Userfound)
      })
      .catch(err => next(err))
    res.user = toGet;
    res.send(user.body)
    next();
})




app.use('/User',UserRouten);







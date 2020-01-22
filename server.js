require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fetch = require('node-fetch')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
/*app.get('/weather_atm/:id',async(req,res,next)=>{
  console.log(fetch_response)
  
  const Query_adress = await res.User.adress
  const weather_stack_api_link = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${Query_adress}`
  try {
    const fetch_response = (await fetch(weather_stack_api_link)).json
    res.User.body.weather_data = fetch_response
    const updated_weather = await res.User.save()
    res.User = updated_weather
    res.status(201).json({message: 'User updated with weather'})
  } catch (error){
    return res.status(500).json({message:error.message})
    next()
  }
})
*/
const UserRouter = require('./routes/User')
app.use('/User', UserRouter)


//Endpoint um aus der Weatherstack API die wetterdaten zu holen
//https://weatherstack.com/documentation durchgucken. route-handler funktioniert noch nicht wie gewollt.


app.listen(3000, () => console.log('server started'))






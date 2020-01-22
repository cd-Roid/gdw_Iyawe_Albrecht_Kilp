//User Route wird mit express initialisiert
const express = require('express')
const router = express.Router()
const User = require('../models/Usermodel')
const fetch = require('node-fetch')


// alle Nutzer werden angezeigt
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creating one User
router.post('/newUser', async (req, res) => {

  const postUser = new User({
    name: req.body.name,
    plants: req.body.plants,
    adress: req.body.adress,
    plant_data: {}
  })

  try {
    await postUser.save()
    res.json(postUser) 
  } catch (err) {
    res.status(400).json({ err: err.message })
  }
})

// Getting one User
router.get('/getUser/:id', getUser, (req, res) => {
  res.json(res.User)
})

// Updating one User
router.put('/updateUser/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.User.name = req.body.name
  }

  if (req.body.plants != null) {
    res.User.plants = req.body.plants
  }
  if (req.body.adress != null) {
    res.User.adress = req.body.adress
  }
  try {
    const updatedUser = await res.User.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

})
// Deleting one User
router.delete('/deleteOne/:id', getUser, async (req, res) => {
  try {
    if (res.User == null) res.status(404).json({ message: err.message })
    await res.User.remove()
    res.json({ message: 'Deleted This User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/deleteAll/', async (req, res) => {
  try {

    User.deleteMany({}, (err) => err)
    res.status(200).json({ message: "Deleted all Users" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
//Route holt aus trefle und weatherstack die entsprechenden Daten und vervollständigt das dazugehörige Usermodell in der Datenbank
router.get('/getPrecipitation/:id', getUser, async (req, res) => {
  const Query_adress = await res.User.adress
  const weather_stack_api_link = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${Query_adress}`
  try {
    let fetch_weatherStack = await fetch(weather_stack_api_link)
    let res_weatherStack = await fetch_weatherStack.json()
    console.log(res_weatherStack)
    //Niederschlagswerte werden aus dem Array geholt
    res.User.weather_precipitation = res_weatherStack.current.precip
    res.User.save()
    res.json(res.User)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


router.get('/plant_Precipitation/:id', getUser, async (req, res) => {
  const Query_plant = await res.User.plants
  //link für den API call  
  const trefle_api_link = `https://trefle.io/api/plants/?common_name=${Query_plant}&token=${process.env.TREFLE_API_KEY}`
  try {
    //holt die Grundlegenden Pflanzendaten
    const fetch_trefle = await fetch(trefle_api_link)
    const res_trefle = await fetch_trefle.json()
    let temp = res_trefle

    //greife auf den link zu in "plant_data" und hole den Niederschlagswert.
    let remove_brackets = temp[0]
    let id = remove_brackets.id
    const trefle_api_subQuery = `http://trefle.io/api/plants/${id}/?token=${process.env.TREFLE_API_KEY}`
    let subQuery = await fetch(trefle_api_subQuery)
    let subQuery_json = await subQuery.json()

    res.User.plant_percipitation_maximum = subQuery_json['main_species']['growth']['precipitation_maximum']['cm']
    res.json(res.User)
    res.User.save()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})


// Middleware um die User id zu holen. Wird bei jedem request weitergegeben der ne :id enthält.
async function getUser(req, res, next) {
  let userToFind
  try {
    userToFind = await User.findById(req.params.id)
    if (userToFind == null) {
      return res.status(404).json({ message: 'Cant find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.User = userToFind
  next()
}

module.exports = router 
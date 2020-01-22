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
    weather_data: {},
    plant_data: {}
  })

  try {
       await postUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one User
router.get('/:id', getUser, (req, res) => {
  res.json(res.User)
})

// Updating one User
router.put('/:id', getUser, async (req, res) => {
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
  } catch {
    res.status(400).json({ message: err.message })
  }

})
// Deleting one User
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.User.remove()
    res.json({ message: 'Deleted This User' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/',async(req,res)=>{
try {
  
  User.deleteMany({})
  res.status(200).json({message:"Deleted all Users"})
} catch (error) {
  res.status(500).json({message:error.message})
}
})
//Route holt aus trefle und weatherstack die entsprechenden Daten und vervollständigt das dazugehörige Usermodell in der Datenbank
router.get('/weather_atm/:id',getUser,async(req,res)=>{ 
   const Query_adress = await res.User.adress
   const weather_stack_api_link = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${Query_adress}`
   try {
      let fetch_weatherStack = await fetch(weather_stack_api_link)
      let res_weatherStack = await fetch_weatherStack.json()
      //res.User.weather_data = res_weatherStack
      //Niederschlagswerte werden aus dem Array geholt
      res.User.weather_precipitation = res_weatherStack.current.precip
      res.User.save()
      res.json(res.User)
   } catch (error){
     return res.status(500).json({error:error.message})
   }})
   

   router.get('/plant_data/:id',getUser,async(req,res)=>{ 
    
    const Query_plant = await res.User.plants
    //Zwischenfunktion um die Id aus der plant_data JSON zu holen da diese nicht einfach geQueried werden kann.
     
     //links für die API calls    
      const trefle_api_link = `https://trefle.io/api/plants/?common_name=${Query_plant}&token=${process.env.TREFLE_API_KEY}`
      
    try {
      //holt die Grundlegenden Pflanzendaten
       const fetch_trefle = await fetch(trefle_api_link)
       const res_trefle = await fetch_trefle.json()
       let temp = res_trefle
       
      //const plant_data_req = res.User.plant_data
       let remove_brackets = temp[0]
       let id = remove_brackets.id
       //greife auf den link zu in "plant_data" und hole den Niederschlagswert.
       const trefle_api_subQuery = `http://trefle.io/api/plants/${id}/?token=${process.env.TREFLE_API_KEY}`
       let subQuery = await fetch(trefle_api_subQuery)
       let subQuery_json = await subQuery.json()

       res.User.plant_percipitation_maximum = subQuery_json['main_species']['growth']['precipitation_maximum']['cm']
       res.json(res.User)
 
      res.User.save()
    } catch (error){
      return res.status(500).json({error:error.message})
    }})


    router.get('/plant_data_id/:id',getUser,async(req,res)=>{
      const plant_data_req = res.User.plant_data
        let remove_brackets = plant_data_req[0]
        let id = remove_brackets.id
      const trefle_api_subQuery = `http://trefle.io/api/plants/${id}/?token=${process.env.TREFLE_API_KEY}`
      try {
        let subQuery = await fetch(trefle_api_subQuery)
        let subQuery_json = await subQuery.json()
        console.log(subQuery_json['main_species']['growth']['precipitation_maximum']['cm'])
        
      } catch (error) {
        return res.status(500).json({error:error.message})
      }
    })


// Middleware um die User id zu holen. Wird bei jedem request weitergegeben der ne :id enthält.
async function getUser(req, res, next) {
 let userToFind
  try {
    userToFind = await User.findById(req.params.id)
    if (userToFind == null) {
      return res.status(404).json({ message: 'Cant find User'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.User = userToFind
  next()
}

module.exports = router 
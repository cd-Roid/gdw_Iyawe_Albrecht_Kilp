//User Route wird mit express initialisiert
const express = require('express')
const router = express.Router()
const User = require('../models/Usermodel')


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
    adress: req.body.adress
  })

  try {
       await postUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
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
  User.deleteMany({},(err)=>res.send(err))
} catch (error) {
  res.status(500).json({message:error.message})
}
})


// Middleware function for gettig User object by ID
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
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


//neuer Nutzer wird hinzugefügt
router.post("/newUser", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    plants: req.body.plants,
    adress: req.body.adress
  });
  try {
    const newUSer = await newUser.save();
    res.status(201).json(newUSer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id',async(req,res,next)=>{

  let toGet = await User.findById(req.params.id)
  .then( Userfound => {
        if(!Userfound){ return res.status(404).end()}
       return  res.status(200).json(Userfound)
    })
    .catch(err => (err))
    res.user = toGet;
    res.send(User.body)
 
})



//neue Pflanze wird dem Nutzer zugewiesen
router.put('/:id',async(req, res) => {
    let toGet = await User.findById(req.params.id)
    .then( Userfound => {
          if(!Userfound){ return res.status(404).end()}
         return  res.status(200).json(Userfound)
      })
      .catch(err => (err))
   
   
  .then
  try {
    if(req.body.name != null || req.body.plants !=null || req.body.adress != null ){
      const newUser = new User({
        name: res.body.name,
        plants: res.body.plants,
        adress: res.body.adress
      })
       replaced = newUser
    }
      replaced = await toGet.save()
    } catch (error) {
    res.status(500).json({error:error.message})
  }
  })









module.exports = router;
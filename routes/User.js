//User Route wird mit express initialisiert
const express = require("express");
const router = express.Router();
const User = require("../models/Usermodel");

// alle Nutzer werden angezeigt
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//ein Nutzer wird angezeigt
router.get("/:id" ,get_User_by_Id ,async (req, res) => {     
  res.json(res.get_User_by_Id)
})

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





//neue Pflanze wird dem Nutzer zugewiesen

router.put("/:id", get_User_by_Id,async(req, res) => {
    if(req.body.name != null || req.body.plants !=null || req.body.adress != null ){
      res.get_User_by_Id.name = req.body.name
      res.get_User_by_Id.plants = req.body.plants
      res.get_User_by_Id.adress = req.body.adress
    }

    try {
        const upadted_user = await res.get_User_by_Id.save()
        res.json(upadted_user)
    } catch (error) {
      res.status(400).json({message:error.message})
    }
    
});

//Nutzer wird gelöscht
  router.delete("/deleteUser/:id",get_User_by_Id, async (req, res) => {
    try {
        await res.get_User_by_Id.remove()
        //res.status(200).json({message:'User deleted'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    } 
  })



async function get_User_by_Id(req,res,next){
  let toGet = await User.findById(req.params.id)
  .then( Userfound => {
        if(!Userfound){ return res.status(404).end()}
       return  res.status(200).json(Userfound)
    })
    .catch(err => next(err))
  res.user = toGet
  next()
}



module.exports = router;





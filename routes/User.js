//User Route wird mit express initialisiert
const express = require('express')
const router = express.Router()
const User = require('../models/Usermodel')



// alle Nutzer werden angezeigt 
router.get('/all', async(req, res)=> {
    try {
            const allUsers = await User.find()
            res.json(allUsers)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//ein Nutzer wird angezeigt 
router.get('/getUser/:id', getUser,async(req, res)=> {
    try {
         res.json(res.tofind)
    } catch (error) {
        res.status(500).json({error:message})
    }
})

//neuer Nutzer wird hinzugefügt
router.post('/newUser',async (req, res)=> {
    const newUser = new User({
        name: req.body.name,
        plants: req.body.plants,
        adress: req.body.adress
    })
    try {
        const newUSer = await newUser.save()
        res.status(201).json(newUSer)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

//neue Pflanze wird dem Nutzer zugewiesen
router.patch('/:id/:plantname', getUser,(req, res)=> {

})


//Nutzer wird gelöscht
router.delete('/:id', getUser,async(req, res)=> {
    try {
        await res.User.remove()
        res.json({message:'Removed User'})
    } catch (error) {
        res.status(500).json({error:message})
    }
})

/*middleware um Nutzer nach Ids zu suchen.
Antwortet mit einem Nutzerobjekt
*/
async function  getUser (req,res,next){
    let tofind
    try {
        tofind = await User.findById(req.params.id)
        if(tofind == null) {
            return res.status(404).json({message:'Cannot find User'})
        }
    } catch (error) {
        res.status(500).json({error:message})
    }
    res.tofind = User
    next()
}
module.exports = router
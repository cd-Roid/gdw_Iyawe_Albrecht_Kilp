//User Route wird mit express initialisiert
const express = require('express')
const router = express.Router()
const User = require('../models/Usermodel')



// alle Nutzer werden angezeigt 
router.get('/', async(req, res)=> {
    try {
            const Users = await User.find()
            res.send
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//ein Nutzer wird angezeigt 
router.get('/:id', (req, res)=> {

})

//neuer Nutzer wird hinzugefügt
router.post('/', (req, res)=> {

})
//neue Pflanze wird dem Nutzer zugewiesen
router.patch('/:id', (req, res)=> {

})
//nutzer wird aktualisiert 
router.patch('/:id', (req, res)=> {

})

//Nutzer wird gelöscht
router.delete('/:id', (req, res)=> {

})
module.exports = router
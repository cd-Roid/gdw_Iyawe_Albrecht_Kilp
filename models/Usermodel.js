const mongoose = require('mongoose')


const Usermodel = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    plants:{
        type:JSON,
        required:true
    },
<<<<<<< HEAD
    adress:{
        type: Number,
        required: true
=======
    address:{
        type:JSON,
        required:true
>>>>>>> parent of fa0871e... get, post, patch und delete routes implimentiert
    }

})


module.exports = mongoose.model('User',Usermodel)
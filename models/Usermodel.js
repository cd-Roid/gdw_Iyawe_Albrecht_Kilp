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
    address:{
        type:JSON,
        required:true
    }

})


module.exports = mongoose.model('User',Usermodel)
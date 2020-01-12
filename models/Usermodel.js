const mongoose = require('mongoose')


const Usermodel = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    plants:{
        type:String,
        required:true
    },
    zipcode:{
        type: Number,
        required:true
    }
})


module.exports = mongoose.model('User',Usermodel)
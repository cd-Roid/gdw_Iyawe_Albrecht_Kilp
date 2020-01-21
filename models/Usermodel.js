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


    adress:{
        type: Number,
        required: true
    },
    plant_data:{
        type:JSON,
        required: false
    },
    weather_data:{
        type:JSON,
        required:false
    }
    })

module.exports = mongoose.model('User',Usermodel)
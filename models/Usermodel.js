const mongoose = require('mongoose')


const Usermodel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plants: {
        type: JSON,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    plant_data: {
        type: JSON,
        required: false
    },
    plant_percipitation_maximum: {
        type: Number,
        required: false,
        default: 0
    },
    weather_precipitation: {
        type: Number,
        required: false,
        default: 0
    }

})

module.exports = mongoose.model('User', Usermodel)
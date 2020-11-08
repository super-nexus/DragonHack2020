let mongoose = require('mongoose');


let IdealSchema = mongoose.Schema({
    tempAverage: {
        type: Number,
        required: true
    },
    humiAverage: {
        type: Number,
        required: true
    },
    brightAverage: {
        type: Number,
        required: true
    },
    noiseAverage: {
        type: Number,
        required: true
    }
});

let Ideal = mongoose.model('ideal', IdealSchema);
module.exports = Ideal;
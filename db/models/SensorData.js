const mongoose = require('mongoose');

let SensorDataScheme = new mongoose.Schema({
    temperature : {
        type: Number,
        required: true
    },
    humidity : {
        type: Number,
        required: true
    },
    brightness : {
        type: Number,
        required: true
    },
    noise : {
        type: Number,
        required : true
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
});


SensorDataScheme.statics.findByDate = date => {
    let SensorData = this;
    return SensorData.find({
        time: date
    });
};


var sensorDataModel = mongoose.model("sensorsdata", SensorDataScheme);

module.exports = sensorDataModel;
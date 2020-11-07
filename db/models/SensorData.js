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
        date: {
            type: String,
            default: new Date().toISOString().slice(0, 10)
        },
        hour: {
            type: Number,
            default: parseInt(new Date().toISOString().slice(11, 13))
        },
        minute: {
            type: Number,
            default: parseInt(new Date().toISOString().slice(14, 16))
        }
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
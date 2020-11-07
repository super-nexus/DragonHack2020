let mongoose = require('mongoose');


let FeelingSchema = mongoose.Schema({

    feeling: {
        type: String,
        enum: ["Ok", "Frustrated", "Fantastic"],
        required: true
    },
    userId: {
        type: String,
        required: true
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

let Feeling = mongoose.model('feeling', FeelingSchema);

module.exports = Feeling;
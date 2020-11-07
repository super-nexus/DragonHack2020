const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let User = new mongoose.model('user', UserSchema);
module.exports = User;

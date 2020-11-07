const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://andrija:kuzmanov123@ds235180.mlab.com:35180/dh', {useNewUrlParser: true});

module.exports = {
    mongoose
};
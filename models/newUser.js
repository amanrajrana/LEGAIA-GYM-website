const mongoose = require('mongoose');

const {Schema} = mongoose;

const newUser = new Schema ({
    name : String,
    email : String,
    phone : Number,
    way2contact : String,
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('newUser', newUser);
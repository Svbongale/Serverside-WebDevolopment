var mongoose = require('mongoose');
var passportLocalmongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalmongoose);
module.exports = mongoose.model('User', User);
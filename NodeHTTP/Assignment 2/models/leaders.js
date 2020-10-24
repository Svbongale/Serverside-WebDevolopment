const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// "name": "Peter Pan",
// "image": "images/alberto.png",
// "designation": "Chief Epicurious Officer",
// "abbr": "CEO",
// "description": "Our CEO, Peter, . . .",
// "featured": false


var leaderSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },

    image: {
        type: String, 
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    abbr: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        required: true
    },

    featured: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true   
     
});

var Leaders = mongoose.model('Leaders', leaderSchema);

module.exports = Leaders;
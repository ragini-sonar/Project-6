const mongoose = require("mongoose");

var locationsSchema = mongoose.Schema({
    locationName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true  
    },
    isValid:{
        type: Boolean,
        default: false
    },
    image:{
        data: String,
        contentType: String,
    },
    comments:{
        type: String,
        userName:{
            type: String
        },
        comment:{
            type: String
        }
    },
    recommend:{
        type: Number
    }

});

module.exports = mongoose.model('Locations', locationsSchema,'locations');

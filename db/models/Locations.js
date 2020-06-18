const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var locationsSchema = new Schema({
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
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Locations', locationsSchema);

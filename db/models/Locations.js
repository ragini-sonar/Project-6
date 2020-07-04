let mongoose = require("mongoose");

let locationsSchema = mongoose.Schema({
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
    comments:[{
        userName:{
            type: String
        },
        comment:{
            type: String
        }
    }],
    recommend:[{
        userId:{
            type:String
        }
    }],

});

module.exports = mongoose.model("Locations", locationsSchema, "L2"); //module name, schema, database name

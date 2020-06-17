const mongoose = require("mongoose");

exports.Location = mongoose.model(
  "Location",
  {
    name: String,
    description: String,
    isValidate: {
      type: Boolean,
      default: false,
    },
  },
  "LocationJefTest"
);

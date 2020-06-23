var express = require("express");
var router = express.Router();
const upload = require("../controllers/upload");
const { requireAuth } = require("../controllers/auth");
const fs = require("fs");
const path = require("path");
locationsModels = require("../db/models").Locations;


router.get("/", function (req, res, next) {
  res.render("locations",{user:req.user});

});

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("locations", {
        message: err,
      });
    } else {
      // If no file is uploaded
      if (req.file == undefined) {
        res.render("locations", {
          message: "Error: No File Selected!",
        });
      } else {
        // Display image
        res.render("locations", {
          message: "File Uploaded Successfully!",
          file: `/uploads/${req.file.filename}`,
          
        });

        // Store image path in database
        const { locationName, description } = req.body;

        // Define a JSONobject for the image attributes for saving to database
        var image = {
          contentType: req.file.mimetype,
          // Creates a new Buffer containing string (filename).
          data: req.file.filename,
        };

        // Include title and description
        var item = {
          locationName: locationName,
          description: description,
          isValid: false,
          image: image,
          comments
        };
        locationsModels.addNewLocation(item);
      }
    }
  });
});

module.exports = router;

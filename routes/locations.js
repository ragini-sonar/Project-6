var express = require('express');
var router = express.Router();
// const { upload } = require('../controllers/Location');
const multer = require('multer');
const fs = require('fs');
var mongoose = require('mongoose')
const db = mongoose.connection;
// const Locations = mongoose.Schema;
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override'); 


// Set Storage Engine
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './public/uploads/');
    },
     
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + file.originalname);
    }
    });
const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter: function(req,file,cb)
{
    checkFileType(file,cb);
}}).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test((file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }


/* GET locations listing. */
router.get('/', function(req, res, next) {
    res.render('locations');
});


router.post('/upload',( req, res, next) => {
    
    upload(req, res, (err) => {

        if(err){
            res.render('locations', {
                message: err
            });
        }else{
            // If no file is uploaded
            if(req.file == undefined){
                res.render('locations',{
                    message: 'Error: No File Selected!'
                })
            } else {
                res.render('locations', {
                  message: 'File Uploaded Successfully!',

                  file: `/uploads/${req.file.filename}` 
                });
                
                // var img = fs.readFileSync(req.file.path);
                // console.log("img: ",img)
                // var encode_image = img.toString('base64');
                // Define a JSONobject for the image attributes for saving to database
                 
                // var finalImg = {
                //      contentType: req.file.mimetype,
                //      image: Buffer.alloc((encode_image, 'base64'))
                //   };
                const {locationName, description} = req.body;
                console.log(req.file.path)

                var img = fs.readFileSync(req.file.path);

                // Define a JSONobject for the image attributes for saving to database
                var finalImg = {
                    contentType: req.file.mimetype,
                    data: img
                 };


                var item = {
                    locationName: locationName,
                    description: description,
                    image: finalImg
                    

                }
                
               db.collection('Locations').insertOne(item, (err, result) => {
                   console.log("Result...",result)
                
                   if (err) return console.log(err)
                
                   console.log('saved to database')
                //    res.redirect('/')
                  
                })


          
            }
        }
    })
})
  
  module.exports = router;
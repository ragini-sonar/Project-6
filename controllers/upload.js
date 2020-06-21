const multer = require('multer');
const path = require('path');

    // Set Storage Engine
    const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './public/uploads/');
    },
     
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
    });

    const upload = multer({
        storage:storage,
        // Limits file size at 1MB
        limits:{fileSize:1000000},
        // Only accept image file with jpeg|jpg|png|gif extension
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

module.exports = upload
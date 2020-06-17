const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = async()=>{
    try{
        mongoose.set('useFindAndModify', false);
        await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected...');
    }catch(err){
        console.log(err);
    }
}
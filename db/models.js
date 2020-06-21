
var mongoose = require('mongoose')
const db = mongoose.connection;
const Locations = require('./models/Locations')

module.exports.Locations = {

    addNewLocation:(item) => {
        return new Promise((resolve,reject)=>{
            db.collection('Locations').insertOne(item, (err, result) => {
                if (err) reject(err);
                console.log('inserted 1 record to database...')
                resolve(result);
    
            })
        }) 
    },

    getLatestLocations:() =>{
        return new Promise((resolve, reject) =>{    
            db.collection('Locations').find().sort({$natural:-1}).limit(10).toArray((err, results) => {
                if(err)reject(err);
                resolve(results)

            });
        })
    }


}
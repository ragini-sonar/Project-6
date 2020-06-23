
var mongoose = require('mongoose')
const db = mongoose.connection;
const Locations = require('./models/Locations');
const { ObjectId } = require('mongodb');

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
    },

    getLocationDetails:(id) => {
        return new Promise((resolve, reject) =>{
            db.collection('Locations').find({_id:ObjectId(id)}).toArray((err,results) =>{
                if(err)reject(err);
                resolve(results)
            })
        })

    },
    // Update comment and username
    addComment:(locationId, userName, comment) => {
        return new Promise((resolve, reject) =>{
            db.collection('Locations').updateOne({_id:ObjectId(locationId)},{
                $set:{
                    comments: {
                        userName: userName,
                        comment: comment
                    }
                }
            },(err,results) =>{              
                if(err)reject(err);
                console.log("inserted 1 comment")
                resolve(results)
            })

        })
    },

    addRecommed:() => {
        return new Promise((resolve, reject) =>{
            db.collection('Locations').find({_id:ObjectId(id)}).update({recommed})

        })
    }


}

const Locations = require('./models/Locations');
const { ObjectId } = require('mongodb');

module.exports = {

    addNewLocation:(item) => {
        return new Promise((resolve,reject)=>{
            Locations.insertOne(item, (err, result) => {
            if (err) reject(err);
            console.log('inserted 1 record to database...')
            resolve(result);
            })
        }) 
    },

    getLatestLocations: () => {
        return new Promise((resolve, reject) =>{  
            Locations.find({}).sort({_id: -1}).exec((err, results) => {
                if(err)reject(err);
                resolve(results)
            });
        })
    },

    getLocationDetails:(id) => {
        return new Promise((resolve, reject) =>{
            Locations.find({_id:ObjectId(id)},(err,results) =>{
                if(err)reject(err);
                console.log(results)
                resolve(results)
            })
        })

    },
    // Update comment and username
    addComment:(locationId, userName, comment) => {
        return new Promise((resolve, reject) =>{
            Locations.updateOne({_id:ObjectId(locationId)},{
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
            Locations.find({_id:ObjectId(id)}).update({recommed})

        })
    }

}
    
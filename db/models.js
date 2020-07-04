
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
                resolve(results);
            })
        })

    },
    // Update comment and username
    addComment:(locationId, userName, comment) => {
        return new Promise((resolve, reject) =>{
            Locations.updateOne({_id:ObjectId(locationId)},{
                $push:{
                    comments: {
                        userName: userName,
                        comment: comment
                    }
                }
            },(err,results) =>{              
                if(err)reject(err);
                console.log("inserted 1 comment to database...")
                resolve(results)
            })

        })
    },

    canRecommend:(locationId,userId) => {
        return new Promise((resolve,reject) =>{
            Locations.find({_id:locationId},{
                recommend:{
                    $elemMatch:{
                        userId:userId
                    }
                }          
            },(err,results) =>{              
                if(err)reject(err);
                if(results[0].recommend[0]!== undefined){
                    console.log("User already recommended")
                   resolve(false)
                }else{
                    console.log("User can recommend")
                   resolve(true)
                }

            })
        })

    },

    addRecommend:(locationId,userId) => {
        return new Promise((resolve, reject) =>{
            Locations.updateOne({_id:ObjectId(locationId)},{
                $push:{
                    recommend:{
                        userId:userId,
                    },
                }
            },(err,results) =>{              
                if(err)reject(err);
                console.log("1 recommend is added")
                resolve(results)
            })
        })
    },
    removeRecommend:(locationId,userId) => {
        return new Promise((resolve, reject)=>{
            Locations.update({_id:ObjectId(locationId)},{
                $pull:{
                    recommend:{
                        userId:userId
                    }
                }
            },(err,results) =>{              
                if(err)reject(err);
                console.log("1 recommend is removed")
                resolve(results)
            })
        })
    }

}
    
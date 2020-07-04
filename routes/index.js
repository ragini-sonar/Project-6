var express = require("express");
var router = express.Router();
const locationsModels = require("../db/models");
const controllers_user = require("../controllers/usersInfo");
const { requireAuth, unsetAuthToken } = require("../controllers/auth");

router.get("/",async function (req, res, next) {
  console.log("getting latest...")
  const latestLocationsList = await locationsModels.getLatestLocations();
    res.render("index",{
      latestLocationsList:latestLocationsList, 
      user: req.user
    })
});

router.get('/details/:id', async function(req, res, next){
  let locationId = req.params.id;
  const locationDetails = await locationsModels.getLocationDetails(locationId);
  const totalComment = locationDetails[0].comments.length;

  res.render("details", {
    locationDetails:locationDetails,
    totalComment:totalComment,
    user: req.user
  });

})

router.post('/details/:id',requireAuth, async function(req, res, next){
  let locationId = req.params.id;
  let userId = req.user;
  const {comment, recommend} = req.body;

  const userInfo = await controllers_user.getUserInfo(userId);
  const userName = userInfo[0].firstName;
  // console.log("userId",userId);
  //console.log("comment:", comment);
  // console.log("locationId: ", locationId)
  console.log("Recommend: ", recommend)

  if(userId === undefined){
    console.log(' User ID is undefined, please log in to recommend');
  }else{

    // User recommend 
    if( recommend == '1'){
        // Check if user can recommend
        const canRecommend = await locationsModels.canRecommend(locationId, userId)
      if(canRecommend === true ){
        await locationsModels.addRecommend(locationId, userId)
        await locationsModels.getLocationDetails(locationId).then((locationDetails) => {
            let totalRecommend = locationDetails[0].recommend.length
            res.send({totalRecommend:totalRecommend})
        })
          
      }
     }
    
    // // User unrecommend 
    else if( recommend == '0'){
      // Check if user is in the recommend list
      const userNotExist = await locationsModels.canRecommend(locationId, userId)
      if(userNotExist === false ){
        await locationsModels.removeRecommend(locationId, userId)
        await locationsModels.getLocationDetails(locationId).then((locationDetails) => {
            let totalRecommend = locationDetails[0].recommend.length 
            res.send({totalRecommend:totalRecommend, recommend:recommend}) 
        })
      }

    // User post comment only
    }else if(comment !== undefined){
      const addComment = await locationsModels.addComment(locationId, userName, comment);
      res.send({comment:comment,userName:userName}); 
    }
  }
 
})


module.exports = router;

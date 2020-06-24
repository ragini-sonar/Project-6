var express = require("express");
var router = express.Router();
const locationsModels = require("../db/models");
const controllers_user = require("../controllers/usersInfo");
const { requireAuth, unsetAuthToken } = require("../controllers/auth");

router.get("/",async function (req, res, next) {
  console.log("getting latest...")
  const latestLocationsList = await locationsModels.getLatestLocations()
    res.render("index",{
      latestLocationsList:latestLocationsList, 
      user: req.user
    })
});

router.get('/details/:id', async function(req, res, next){
  let locationId = req.params.id;
  console.log("The user is: ", req.user)
  const locationDetails = await locationsModels.getLocationDetails(locationId);
  res.render("details", {
    locationDetails:locationDetails,
    user: req.user
  });

})

router.post('/details/:id',requireAuth, async function(req, res, next){
  let locationId = req.params.id;
  let userId = req.user;
  const {comment, recommend} = req.body;
  console.log("R:", recommend)
  const userInfo = await controllers_user.getUserInfo(userId);
  const userName = userInfo[0].firstName;
  const addcomment = await locationsModels.addComment(locationId, userName, comment);
  res.redirect('back');
})


module.exports = router;

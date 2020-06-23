var express = require("express");
var router = express.Router();
const { requireAuth, unsetAuthToken } = require("../controllers/auth");
const controllers_regi = require("../controllers/registration");
const controllers_login = require("../controllers/login");
const controllers_user = require("../controllers/usersInfo");
const controllers_home = require("../controllers/home");
locationsModels = require("../db/models").Locations;

router.get("/",async function (req, res, next) {
  const latestLocationsList = await locationsModels.getLatestLocations();
  res.render("index",{
    latestLocationsList:latestLocationsList, 
    user: req.user
  })
});

router.get('/locations/:id', async function(req, res, next){
  let locationId = req.params.id;
  const locationDetails = await locationsModels.getLocationDetails(locationId);

  res.render("details", {
    locationDetails:locationDetails,
    user: req.user,
  });

})

router.post('/locations/:id',requireAuth, async function(req, res, next){
  let locationId = req.params.id;
  let userId = req.user;
  const {comment, recommend} = req.body;
  console.log("R:", recommend)
  const userInfo = await controllers_user.getUserInfo(userId);
  const userName = userInfo[0].firstName;
  const addcomment = await locationsModels.addComment(locationId, userName, comment);
  res.redirect('back');
})

router.get("/", controllers_home.homePage);

router.get("/login", controllers_login.getLogin);

router.post("/login", controllers_login.login);

router.get("/logout", controllers_login.logout);

router.get("/registration", controllers_regi.getRegistration);

router.post("/registration", controllers_regi.insertUserInfo);

router.get("/users/:id", requireAuth, async function(req, res){
  
  const userInfo = await controllers_user.getUserInfo(req.user);
  res.render("users", {
    firstName: userInfo[0].firstName,
    lastName: userInfo[0].lastName,
    email: userInfo[0].email,
    user: req.user,
  });
})

router.post("/users/:id", requireAuth, controllers_user.updateUser);

module.exports = router;

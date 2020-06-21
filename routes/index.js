var express = require("express");
var router = express.Router();
const { requireAuth, unsetAuthToken } = require("../controllers/auth");
const controllers_regi = require("../controllers/registration");
const controllers_login = require("../controllers/login");
const controllers_user = require("../controllers/usersInfo");
locationsModels = require("../db/models").Locations;

router.get("/", async function (req, res, next) {
  const latestLocationsList = await locationsModels.getLatestLocations();
  res.render("index", {
    latestLocationsList: latestLocationsList,
    user: req.user,
  });
});

router.get("/login", controllers_login.getLogin);

router.post("/login", controllers_login.login);

router.get("/logout", controllers_login.logout);

router.get("/registration", controllers_regi.getRegistration);

router.post("/registration", controllers_regi.insertUserInfo);

router.get("/users/:id", requireAuth, controllers_user.userInfo);

router.post("/users/:id", requireAuth, controllers_user.updateUser);

module.exports = router;

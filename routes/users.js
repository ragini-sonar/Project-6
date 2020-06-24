var express = require('express');
var router = express.Router();
const controllers_login = require("../controllers/login");
const controllers_admin = require("../controllers/admin");
const controllers_user = require("../controllers/usersInfo");
const controllers_regi = require("../controllers/registration");
const { requireAuth, unsetAuthToken } = require("../controllers/auth");


router.get("/login", controllers_login.getLogin);

router.post("/login", controllers_login.login);

router.get("/logout", controllers_login.logout);

router.get("/registration", controllers_regi.getRegistration);

router.post("/registration", controllers_regi.insertUserInfo);

router.get("/:id", requireAuth, async function(req, res){
  
  const userInfo = await controllers_user.getUserInfo(req.user);
  res.render("users", {
    firstName: userInfo[0].firstName,
    lastName: userInfo[0].lastName,
    email: userInfo[0].email,
    user: req.user,
  });
})

router.post("/:id", requireAuth, controllers_user.updateUser);

router.get(
  "/admin",
  requireAuth,
  controllers_admin.requireAdmin,
  controllers_admin.getAdminPage
);

module.exports = router;

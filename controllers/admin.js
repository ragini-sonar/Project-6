var User = require("../db/models/users");
var admin_id;

module.exports = {
  requireAdmin: (req, res, next) => {
    User.find({ _id: req.user }, (err, userInfo) => {
      console.log(userInfo);
      if (userInfo[0].role == undefined || !userInfo[0].role === "admin") {
        console.log("not admin");
        res.send("you are not admin");
      } else {
        next();
      }
    });
  },

  getAdminPage: (req, res) => {
    res.render("admin", {
      user: req.id,
      admin: admin_id,
    });
  },
};

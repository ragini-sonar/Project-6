const locationsModels = require("../db/models");
const userInfo = require("../controllers/login");
const Locations = require("../db/models/Locations");

module.exports = {
  getAdminPage: async (req, res) => {
    const latestLocationsList = await locationsModels.getLatestLocations();
    const userDetails = await userInfo.getUser(req, res);
    const admin = userDetails[0].isAdmin;

    res.render("admin", {
      latestLocationsList: latestLocationsList,
      user: req.user,
      isAdmin: admin,
    });
  },

  validateLocation: (req, res) => {
    console.log("in validate location");
    const { id, action } = req.body;
    if (action == "accept") {
      Locations.updateOne({ _id: id }, { $set: { isValid: true } }, function (
        err,
        result
      ) {
        console.log("In accept");
        if (err) throw err;
        res.send({
          messageClass: "alert-success",
          message: "Your location is submitted successfully ✅",
        });
      });
    } else {
      Locations.deleteOne({ _id: id }, function (err, result) {
        console.log("In reject");
        if (err) throw err;
        res.send({
          messageClass: "alert-danger",
          message: "❌ Location removed!",
        });
      });
    }
  },
};

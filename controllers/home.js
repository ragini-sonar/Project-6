locationsModels = require("../db/models").Locations;

module.exports = {
  homePage: async function (req, res, next) {
    const latestLocationsList = await locationsModels.getLatestLocations();
    res.render("index", {
      latestLocationsList: latestLocationsList,
      user: req.user,
    });
  },
};

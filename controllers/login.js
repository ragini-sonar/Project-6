const { getHashedPassword, setAuthToken, unsetAuthToken } = require("./auth");
var User = require("../db/models/users");

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);
    User.find({ email: email }, (err, userData) => {
      if (userData.length > 0) {
        if (hashedPassword == userData[0].password) {
          const auth_token = setAuthToken(userData[0]._id);
          res.cookie("AuthToken", auth_token);
          res.redirect("/");
        } else {
          res.render("login", {
            messageClass: "alert-danger",
            message: "Please Enter valid Passward..",
          });
        }
      } else {
        res.render("login", {
          messageClass: "alert-danger",
          message: "You are not registered, Please Register to login.",
        });
      }
    });
  },

  getLogin: (req, res) => {
    res.render("login");
  },

  logout: (req, res) => {
    unsetAuthToken(req.cookies["AuthToken"]);
    res.redirect("/");
  },
};

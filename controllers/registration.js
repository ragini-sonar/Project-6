const { getHashedPassword } = require("./auth");
var User = require("../db/models/users");

module.exports = {
  getRegistration: (req, res) => {
    res.render("registration");
  },

  insertUserInfo: (req, res) => {
    const { fname, lname, email, password, c_password } = req.body;
    const hashedPassword = getHashedPassword(password);
    if (password == c_password) {
      User.find({ email: email }, (err, userData) => {
        if (userData == 0) {
          let newUser = new User({
            firstName: fname,
            lastName: lname,
            email: email,
            password: hashedPassword,
          });
          newUser.save(function (err) {
            if (err) throw err;
            res.render("login", {
              messageClass: "alert-success",
              message: "Registration Successful. Please login.",
            });
          });
        } else {
          res.render("login", {
            messageClass: "alert-danger",
            message: "User already exists. Please login instead.",
          });
        }
      });
    } else {
      res.render("registration", {
        messageClass: "alert-danger",
        message: "Please Enter valid Password..",
      });
    }
  },
};

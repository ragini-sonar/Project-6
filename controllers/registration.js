const { getHashedPassword } = require("./auth");
var User = require("../db/models/users");

module.exports = {
  getRegistration: (req, res) => {
    res.render("registration");
  },

  insertUserInfo: (req, res) => {
    const { fname, lname, email, password, c_password } = req.body;
    const hashedPassword = getHashedPassword(password);
    var name = false;
    var pwd = false;
    var eml = false;

    // Check valid first name and last name
    var x = /^[A-Za-z]+$/;
    if (fname.match(x) && lname.match(x) && lname != "" && lname != "") {
      name = true;
    } else {
      console.log("Invalid user name");
    }

    // Check valid email id
    if (
      email != "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      eml = true;
    } else {
      console.log("Invalid Email");
    }

    // Check valid pwd
    if (
      password != "" &&
      c_password != "" &&
      password == c_password &&
      password.length > 4
    ) {
      pwd = true;
    } else {
      console.log("Invalid Password");
    }

    // Insert valid user details in data base
    if (name && eml && pwd) {
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
        message: "Please Enter valid Details..",
      });
    }
  },
};

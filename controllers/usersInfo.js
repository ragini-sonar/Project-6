const { getHashedPassword } = require("./auth");
var User = require("../db/models/users");

module.exports = {
  userInfo: (req, res) => {
    User.find({ _id: req.user }, (err, userInfo) => {
      res.render("users", {
        firstName: userInfo[0].firstName,
        lastName: userInfo[0].lastName,
        email: userInfo[0].email,
        // user_id: userInfo[0]._id,
        user: req.user,
      });
    });
  },

  updateUser: (req, res) => {
    // user: req.user;
    const { id } = req.params;
    console.log("in update user", typeof id);
    const { fname, lname, email, password, c_password } = req.body;
    if (fname) {
      console.log("change first name", fname);
      User.updateOne({ _id: id }, { $set: { firstName: fname } }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
      });
    }

    if (lname) {
      console.log("change last name", lname);
      User.update({ _id: id }, { $set: { lastName: lname } }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
      });
    }

    if (email) {
      console.log("change email", email);
      User.update({ _id: id }, { $set: { email: email } }, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
    }

    if (password) {
      if (password == c_password) {
        console.log("change password", password);
        let hashedPassword = getHashedPassword(password);
        User.update(
          { _id: id },
          { $set: { password: hashedPassword } },
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
        );
      } else {
        res.render("users", {
          messageClass: "alert-danger",
          message: "Please Enter valid Password..",
        });
      }
    }
    res.redirect("/users/:id");
  },
};

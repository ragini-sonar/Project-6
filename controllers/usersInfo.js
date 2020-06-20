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
    const { id } = req.params;
    const { fname, lname, email, password, c_password } = req.body;
    var x = /^[A-Za-z]+$/;

    // Update first name
    if (fname && fname.match(x)) {
      console.log("change first name", fname);
      User.updateOne({ _id: id }, { $set: { firstName: fname } }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
      });
    }

    // Update last name
    if (lname && lname.match(x)) {
      console.log("change last name", lname);
      User.update({ _id: id }, { $set: { lastName: lname } }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result);
      });
    }

    // Update email id
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      console.log("change email", email);
      User.update({ _id: id }, { $set: { email: email } }, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
    }

    // Update Passward
    if (password && password.length > 4 && password == c_password) {
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
        message: "Please Enter valid Password.. Minimum lenght is 5",
      });
    }

    res.redirect("/users/:id");
  },
};

var User = require("../db/models/users");

module.exports = {
  registration: (req, res) => {
    const { fname, lname, email, password, c_password } = req.body;
    console.log("inside regi");
    let newUser = new User({
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
      cPassword: c_password,
    });
    newUser.save(function (err) {
      if (err) throw err;
      res.render("login");
    });
  },
};

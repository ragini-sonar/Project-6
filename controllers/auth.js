const crypto = require("crypto");

const authTokens = {};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

module.exports = {
  setAuthToken: (userId, res) => {
    // Store authentication token
    const authToken = generateAuthToken();
    // Setting the auth token in cookies
    authTokens[authToken] = userId;
    console.log("In set token", userId);
    return authToken;
  },

  unsetAuthToken: (current_token, res) => {
    delete authTokens[current_token];
    console.log("Logout success. User token deleted.");
  },

  getSessionUser: (req_token, res, next) => {
    return authTokens[req_token];
  },

  requireAuth: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      return res.redirect("/users/login");
    }
  },

  getHashedPassword: (password) => {
    const sha256 = crypto.createHash("sha256");
    const hash = sha256.update(password).digest("base64");
    return hash;
  },
};

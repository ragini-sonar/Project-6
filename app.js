var express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var dbConnection = require("./db/dbConnection");
const auth = require("./controllers/auth");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var locationsRouter = require("./routes/locations");

var app = express();

dbConnection();

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layout",

  // create custom helpers
  helpers: {
    isdefined: function (file) {
      return file !== undefined;
    },
    isTrue: function (value) {
      return value === true;
    },
    isFalse: function (value) {
      return value === false;
    },
  },
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middleware to injest the user id in req header
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies["AuthToken"];
  // console.log("in app.js token", authToken);
  // Inject the user id into req.user
  req.user = auth.getSessionUser(authToken);
  console.log("in app.js user id", req.user);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/locations", locationsRouter);

app.listen("3000", () => {
  console.log("Server started on port 3000");
});

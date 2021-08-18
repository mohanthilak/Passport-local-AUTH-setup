require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const User = require("./models/user");

const app = express();

const dbUrl = process.env.DB_URL;
const secret = process.env.SECRET;

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("database Connected");
  }
);

const loginRoutes = require("./routes/loginRoute/login");
const registerRoutes = require("./routes/registerRoute/register");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(secret));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/", loginRoutes);
app.use("/", registerRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening at port: ${port}`));

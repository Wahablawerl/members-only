const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("./config/passport");
const authRouter = require("./routes/authRoutes");

const app = express();

// 1. Setup Views
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// 2. Middleware
app.use(express.urlencoded({ extended: false })); // Helps read form data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// In app.js
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// 3. Routes (We will create these next)
app.use("/", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

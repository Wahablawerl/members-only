const bcrypt = require("bcryptjs");
const userQueries = require("../models/userQueries");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

// Display the sign-up form
exports.signUpGet = (req, res) => {
  res.render("sign-up");
};

// Handle the form submission
exports.signUpPost = [
  body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  async (req, res, next) => {
    try {
      const { firstName, lastName, username, password } = req.body;

      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save to database using our Model
      await userQueries.insertUser(
        firstName,
        lastName,
        username,
        hashedPassword
      );

      //  Redirect to login page after success
      res.redirect("/log-in");
    } catch (err) {
      return next(err);
    }
  },
];

// Show the Log In form
exports.logInGet = (req, res) => {
  res.render("log-in");
};

// Handle Log In submission
exports.logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

// Handle Log Out
exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

// Show the secret passcode form
exports.joinClubGet = (req, res) => {
  if (!req.user) return res.redirect("/log-in");
  res.render("join-club");
};

// Handle the secret passcode submission
exports.joinClubPost = async (req, res, next) => {
  const secretPasscode = "abdul123"; // You can change this to whatever you like

  if (req.body.passcode === secretPasscode) {
    try {
      await userQueries.updateMembership(req.user.id);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  } else {
    // If wrong, we re-render with an error message
    res.render("join-club", { error: "Wrong passcode! Try again." });
  }
};

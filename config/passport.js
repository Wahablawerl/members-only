const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("./database"); // Importing your DB connection

// This function checks the username and password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // 1. Check if user exists
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // 2. Check if password matches using bcrypt
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      // 3. Success! Return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Stores the user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieves the full user object from the database using the ID in the session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

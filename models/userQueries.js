const pool = require("../config/database");

const userQueries = {
  // --- USER QUERIES ---
  async insertUser(firstName, lastName, username, hashedPassword) {
    const SQL = `
      INSERT INTO users (first_name, last_name, username, password, membership_status, is_admin)
      VALUES ($1, $2, $3, $4, false, false)
    `;
    await pool.query(SQL, [firstName, lastName, username, hashedPassword]);
  },

  async updateMembership(userId) {
    await pool.query(
      "UPDATE users SET membership_status = true WHERE id = $1",
      [userId]
    );
  },
};

module.exports = userQueries;

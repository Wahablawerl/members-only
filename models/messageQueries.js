const pool = require("../config/database");

const messageQueries = {
  async insertMessage(title, text, userId) {
    const SQL =
      "INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)";
    await pool.query(SQL, [title, text, userId]);
  },

  async getAllMessages() {
    const SQL = `
      SELECT messages.*, users.username 
      FROM messages 
      JOIN users ON messages.user_id = users.id 
      ORDER BY timestamp DESC
    `;
    const { rows } = await pool.query(SQL);
    return rows;
  },
  async deleteMessage(messageId) {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  },
};

module.exports = messageQueries;

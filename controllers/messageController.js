const messageQueries = require("../models/messageQueries");
const { body, validationResult } = require("express-validator");

exports.index = async (req, res, next) => {
  try {
    // For now, we'll just send an empty array or get real messages
    const messages = await messageQueries.getAllMessages();
    res.render("index", { messages: messages });
  } catch (err) {
    return next(err);
  }
};

// Show the form to create a new message
exports.createMessageGet = (req, res) => {
  if (!req.user) return res.redirect("/log-in");
  res.render("create-message");
};

// Save the message to the DB
exports.createMessagePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title is required"),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message cannot be empty"),
  async (req, res, next) => {
    try {
      const { title, text } = req.body;
      const userId = req.user.id; // Get the logged-in user's ID

      await messageQueries.insertMessage(title, text, userId);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.deleteMessagePost = async (req, res, next) => {
  // Only allow if user is an admin
  if (!req.user || !req.user.is_admin) {
    return res
      .status(403)
      .send("You do not have permission to delete messages.");
  }

  try {
    await messageQueries.deleteMessage(req.body.messageId);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

const { Router } = require("express");
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");

const router = Router();

router.get("/", messageController.index);
router.get("/sign-up", authController.signUpGet);
router.post("/sign-up", authController.signUpPost);
router.get("/log-in", authController.logInGet);
router.post("/log-in", authController.logInPost);
router.get("/log-out", authController.logOutGet);
router.get(
  "/join-club",
  authController.requireAuth,
  authController.joinClubGet
);
router.post(
  "/join-club",
  authController.requireAuth,
  authController.joinClubPost
);
router.get(
  "/create-message",
  authController.requireAuth,
  messageController.createMessageGet
);
router.post(
  "/create-message",
  authController.requireAuth,
  messageController.createMessagePost
);
router.post(
  "/delete-message",
  authController.requireAuth,
  messageController.deleteMessagePost
);

module.exports = router;

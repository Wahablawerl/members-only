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
router.get("/join-club", authController.joinClubGet);
router.post("/join-club", authController.joinClubPost);
router.get("/create-message", messageController.createMessageGet);
router.post("/create-message", messageController.createMessagePost);
router.post("/delete-message", messageController.deleteMessagePost);

module.exports = router;

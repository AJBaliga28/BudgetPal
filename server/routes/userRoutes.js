// /routes/userRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/verify-token", protect, (req, res) => {
  res.status(200).json({ username: req.user.username });
});

module.exports = router;

module.exports = router;

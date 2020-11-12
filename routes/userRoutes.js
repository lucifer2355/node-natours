const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

//! Protect all routes after this middleware
router.use(protect);

router.patch("/updateMyPassword", updatePassword);
router.route("/me", getMe, getUser);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

//! Router middleware
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

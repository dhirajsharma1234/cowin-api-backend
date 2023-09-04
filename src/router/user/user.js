import { user } from "../../controllers/user/user.js";
import { auth } from "../../utils/auth.js";
import express from "express";
const router = new express.Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/available-time-slots").get(auth,user.getAvailableTimeSlot);
router.route("/update-slot/:slot_id").patch(auth,user.updateSlot);


//admin
router.route("/updateStatus").patch(user.updateStatus);

export default router;

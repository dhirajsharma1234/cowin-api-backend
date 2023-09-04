import { admin } from "../../controllers/admin/admin.js";
import express from "express";
const router = new express.Router();

router.route("/login").post(admin.adminLogin);
router.route("/users").get(admin.getAllUsers);
router.route("/registeredSlots").get(admin.registeredSlots);

export default router;

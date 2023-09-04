import userRouter from "./user/user.js";
import adminRouter from "./admin/admin.js";
import express from "express";
const router = new express.Router();

router.use("/user",userRouter);
router.use("/admin",adminRouter);

export default router;

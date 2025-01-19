import express from "express";
import userRouter from "./userRoutes.js";
import accountRoute from "./accountRoutes.js";

const router = express.Router();
router.use("/user",userRouter)
router.use("/account",accountRoute)
export default router;

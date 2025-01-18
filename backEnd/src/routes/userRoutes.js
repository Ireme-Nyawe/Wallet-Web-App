import express from "express";
import { bodyValidation } from "../middlewares/validaitionMidlleware.js";
import { loginSchema } from "../modules/user/vlidation/userValidation.js";
import { isPassworValid, isUserExistByEmail } from "../middlewares/userMiddlewares.js";

const userRouter = express.Router();
userRouter.post("/login",bodyValidation(loginSchema),isUserExistByEmail,isPassworValid,)
export default userRouter;

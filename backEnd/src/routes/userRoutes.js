import express from "express";
import { bodyValidation } from "../middlewares/validaitionMidlleware.js";
import { loginSchema } from "../modules/user/vlidation/userValidation.js";
import {
  isPassworValid,
  isUserExistByEmail,
  isUserExistById,
} from "../middlewares/userMiddlewares.js";
import userController from "../modules/user/controller/userController.js";
import { isUserAuthorized } from "../middlewares/authorizationMidlleware.js";

const userRouter = express.Router();
userRouter.post(
  "/login",
  bodyValidation(loginSchema),
  isUserExistByEmail,
  isPassworValid,
  userController.userLogin
);
userRouter.get(
    "/profile",
    isUserAuthorized,
    isUserExistById,
    userController.viewUserProfile
  );
export default userRouter;

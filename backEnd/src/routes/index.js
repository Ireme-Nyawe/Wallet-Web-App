import express from "express";
import userRouter from "./userRoutes.js";
import accountRoute from "./accountRoutes.js";
import categoryRoute from "./categoryRoutes.js";
import transactionIn from "./transactioInRoutes.js";
import transactionOut from "./transactionOutRoutes.js";
import budgetRoute from "./budgetRoute.js";

const router = express.Router();
router.use("/user", userRouter);
router.use("/account", accountRoute);
router.use("/category", categoryRoute);
router.use("/budget",budgetRoute)
router.use("/transaction-in",transactionIn)
router.use("/transaction-out",transactionOut)
export default router;

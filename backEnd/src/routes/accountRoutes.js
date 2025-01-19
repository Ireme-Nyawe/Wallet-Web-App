import express from "express";
import {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccountById,
    deleteAccountById,
  } from "../modules/account.js";

const accountRoute = express.Router();
accountRoute.post("/", createAccount);
accountRoute.get("/", getAllAccounts);
accountRoute.get("/:id", getAccountById);
accountRoute.put("/:id", updateAccountById);
accountRoute.delete("/:id", deleteAccountById);

export default accountRoute;

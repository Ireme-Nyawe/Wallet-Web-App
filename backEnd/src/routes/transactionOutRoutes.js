import express from "express";
import { checkAccountBalance, checkBudgetBalance, createTransaction, getTransactionsByDateRange } from "../modules/transactionOut.js";

const transactionOut = express.Router();

transactionOut.post("/create", checkAccountBalance, checkBudgetBalance, createTransaction);
transactionOut.post("/transactions-by-date-range", getTransactionsByDateRange);
export default transactionOut;

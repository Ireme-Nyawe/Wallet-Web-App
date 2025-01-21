import express from "express";
import { checkAccountBalance, checkBudgetBalance, createTransaction, getTransactionsByDateRange, getTransactionsOut } from "../modules/transactionOut.js";

const transactionOut = express.Router();

transactionOut.post("/create",checkAccountBalance, checkBudgetBalance, createTransaction);
transactionOut.post("/transactions-by-date-range",getTransactionsByDateRange);
transactionOut.get("/",getTransactionsOut)
export default transactionOut;

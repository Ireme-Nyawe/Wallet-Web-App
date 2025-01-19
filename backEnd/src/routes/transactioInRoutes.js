import express from "express";
import { createInTransaction, getTransactionsInRange } from "../modules/transactionIn.js";


const transactionIn = express.Router();

transactionIn.post("/create", createInTransaction);
transactionIn.get("/transactions-in-range", getTransactionsInRange);

export default transactionIn;

import express from "express";
import { createInTransaction, getTransactionsIn, getTransactionsInRange } from "../modules/transactionIn.js";


const transactionIn = express.Router();

transactionIn.post("/create",createInTransaction);
transactionIn.post("/transactions-in-range",getTransactionsInRange);
transactionIn.get("/",getTransactionsIn)
export default transactionIn;

import express from "express";
import { createTransaction } from "../modules/transactionOut.js";


const transactionIn = express.Router();

transactionIn.post("/create", createTransaction);

export default transactionIn;

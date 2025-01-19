import express from "express";
import { createTransaction } from "../controllers/transactionController.js";

const transactionIn = express.Router();

transactionIn.post("/create", createTransaction);

export default transactionIn;

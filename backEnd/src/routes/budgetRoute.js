import express from "express";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
} from "../modules/budget.js";

const budgetRoute = express.Router();

budgetRoute.post("/", createBudget);
budgetRoute.get("/", getAllBudgets); 
budgetRoute.get("/:id", getBudgetById);
budgetRoute.put("/:id", updateBudgetById);
budgetRoute.delete("/:id", deleteBudgetById);

export default budgetRoute;

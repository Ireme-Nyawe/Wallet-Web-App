import express from "express";
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudgetById,
  deleteBudgetById,
} from "../controllers/budgetController.js";

const router = express.Router();

router.post("/", createBudget);
router.get("/", getAllBudgets); 
router.get("/:id", getBudgetById);
router.put("/:id", updateBudgetById);
router.delete("/:id", deleteBudgetById);

export default router;

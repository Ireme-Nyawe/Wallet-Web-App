import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
  } from "../modules/category.js";


const categoryRoute = express.Router();

categoryRoute.post("/", createCategory); // Create a category
categoryRoute.get("/", getAllCategories); // Get all categories
categoryRoute.get("/:id", getCategoryById); // Get a category by ID
categoryRoute.put("/:id", updateCategoryById); // Update a category by ID
categoryRoute.delete("/:id", deleteCategoryById); // Delete a category by ID

export default categoryRoute;

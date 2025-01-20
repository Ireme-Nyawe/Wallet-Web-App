import express from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
  } from "../modules/category.js";


const categoryRoute = express.Router();

categoryRoute.post("/", createCategory); 
categoryRoute.get("/", getAllCategories); 
categoryRoute.get("/:id", getCategoryById); 
categoryRoute.put("/:id", updateCategoryById);
categoryRoute.delete("/:id", deleteCategoryById);

export default categoryRoute;

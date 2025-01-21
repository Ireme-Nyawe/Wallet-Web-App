import Joi from "joi";
import httpStatus from "http-status";
import Category from "../database/models/category.js";

// Validation schema
const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(data);
};

// Create a new category
export const createCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  try {
    const newCategory = await Category.create(req.body);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    const errorMessage = err.code === 11000 ? "Category name must be unique" : "Failed to create category";
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: errorMessage,
      details: err.message,
    });
  }
};

// Retrieve all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve categories",
      details: err.message,
    });
  }
};

// Retrieve a category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Category not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve category",
      details: err.message,
    });
  }
};

// Update a category by ID
export const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Category not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to update category",
      details: err.message,
    });
  }
};

// Delete a category by ID
export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.deleteOne(id);
    if (!deletedCategory) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Category not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to delete category",
      details: err.message,
    });
  }
};

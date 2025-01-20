import Joi from "joi";
import httpStatus from "http-status";
import Budget from "../database/models/budget.js";

const validateBudget = (data) => {
  const schema = Joi.object({
    from: Joi.date().required(),
    to: Joi.date().greater(Joi.ref("from")).required().messages({
      "date.greater": `"to" must be greater than "from" date`,
    }),
    total: Joi.number().required(),
    balance: Joi.number(),
  });

  return schema.validate(data);
};

export const createBudget = async (req, res) => {
  const { error } = validateBudget(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  const { from, to } = req.body;

  // Check if the "from" date is after any existing budget period in MongoDB
  const existingBudget = await Budget.findOne({
    $or: [
      { from: { $gte: to } }, // Budget ends before the new budget's "to"
    ],
  });

  if (existingBudget) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "New budget period overlaps with an existing budget.",
    });
  }

  try {
    const newBudget = await Budget.create(req.body);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Budget created successfully",
      data: newBudget,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to create budget",
      details: err.message,
    });
  }
};

export const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Budgets retrieved successfully",
      data: budgets,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve budgets",
      details: err.message,
    });
  }
};

export const getBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Budget not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Budget retrieved successfully",
      data: budget,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve budget",
      details: err.message,
    });
  }
};

export const updateBudgetById = async (req, res) => {
  const { id } = req.params;
  const { error } = validateBudget(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBudget) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Budget not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Budget updated successfully",
      data: updatedBudget,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to update budget",
      details: err.message,
    });
  }
};

export const deleteBudgetById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Budget not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Budget deleted successfully",
      data: deletedBudget,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to delete budget",
      details: err.message,
    });
  }
};

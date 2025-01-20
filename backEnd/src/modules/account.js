import Joi from "joi";
import httpStatus from "http-status";
import Account from "../database/models/account.js";

const validateAccount = (data) => {
  const schema = Joi.object({
    accountName: Joi.string().required(),
    accountNumber: Joi.string().optional(),
    bankName: Joi.string().required(),
    balance: Joi.number().required(),
  });

  return schema.validate(data);
};

export const createAccount = async (req, res) => {
  const { error } = validateAccount(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  const { accountNumber, bankName } = req.body;

  try {
    // Validate no duplicate account exists
    const existingAccount = await Account.findOne({ accountNumber, bankName });
    if (existingAccount) {
      return res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        error: "Same account already exists in this bank.",
      });
    }

    // Create a new account
    const newAccount = await Account.create(req.body);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to create account",
      details: err.message,
    });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find(); // Returns all accounts
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Accounts retrieved successfully",
      data: accounts,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve accounts",
      details: err.message,
    });
  }
};

export const getAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id); // Mongoose-specific method
    if (!account) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Account not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Account retrieved successfully",
      data: account,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve account",
      details: err.message,
    });
  }
};

export const updateAccountById = async (req, res) => {
  const { id } = req.params;
  const { error } = validateAccount(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: error.details[0].message,
    });
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document
    );
    if (!updatedAccount) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Account not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Account updated successfully",
      data: updatedAccount,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to update account",
      details: err.message,
    });
  }
};

export const deleteAccountById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id); // Mongoose-specific method
    if (!deletedAccount) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Account not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "Account deleted successfully",
      data: deletedAccount,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to delete account",
      details: err.message,
    });
  }
};

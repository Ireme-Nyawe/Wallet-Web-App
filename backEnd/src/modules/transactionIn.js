import httpStatus from "http-status";
import Account from "../database/models/account.js";
import TransactionIn from "../database/models/transactionIn.js";

export const createInTransaction = async (req, res) => {
  const { accountId, amount, description } = req.body;

  if (!accountId || !amount || amount <= 0) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "Account ID and a valid amount are required",
    });
  }

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Account not found",
      });
    }

    account.balance = Number(account.balance) + Number(amount);
    await account.save();

    const transaction = new TransactionIn({
      account: accountId,
      amount,
      description,
    });
    await transaction.save();

    const populatedTransaction = await transaction.populate("account");

    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Transaction added successfully and account balance updated",
      data: {
        account,
        transaction: populatedTransaction,
      },
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to process transaction",
      details: err.message,
    });
  }
};

export const getTransactionsInRange = async (req, res) => {
  const { date1, date2 } = req.body;

  if (!date1 || !date2) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "Both date1 and date2 are required",
    });
  }

  if (new Date(date2) < new Date(date1)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "date2 must be greater than date1 or same for one day",
    });
  }

  try {
    const transactions = await TransactionIn.find({
      createdAt: { $gte: new Date(date1), $lte: new Date(date2) },
    }).populate("account");
    if (transactions.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No transactions found within the specified date range",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: transactions,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve transactions",
      details: err.message,
    });
  }
};

export const getTransactionsIn = async (req, res) => {
  try {
    const transactions = await TransactionIn.find().populate("account");

    if (transactions.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No transactions found within the specified date range",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: transactions,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve transactions",
      details: err.message,
    });
  }
};

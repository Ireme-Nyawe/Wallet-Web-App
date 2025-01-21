import httpStatus from "http-status";
import Account from "../database/models/account.js";
import Budget from "../database/models/budget.js";
import Transaction from "../database/models/transactionOut.js";

export const checkAccountBalance = async (req, res, next) => {
  const { accountId, amount } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "Account not found",
      });
    }

    if (account.balance < amount) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        error: "Insufficient funds in the account",
      });
    }

    next();
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to check account balance",
      details: err.message,
    });
  }
};

export const checkBudgetBalance = async (req, res, next) => {
  const { amount } = req.body;

  try {
    const currentBudget = await Budget.findOne({ from: { $lte: new Date() }, to: { $gte: new Date() } });

    if (!currentBudget) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "No budget set for the current period",
      });
    }

    if (currentBudget.balance < amount) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        error: "Transaction is not afforded by the budget, adjust budget before! ",
      });
    }

    next();
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to check budget balance",
      details: err.message,
    });
  }
};


export const createTransaction = async (req, res) => {
  const { categoryId, accountId, amount } = req.body;

  if (!categoryId || !accountId || !amount) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "Category, Account, and Amount are required",
    });
  }

  try {
    const transaction = new Transaction({
      category: categoryId,
      amount,
      account: accountId,
    });

    await transaction.save();

    const account = await Account.findById(accountId);
    account.balance -= amount;
    await account.save();

    const currentBudget = await Budget.findOne({
      from: { $lte: new Date() },
      to: { $gte: new Date() },
    });
    if (currentBudget) {
      currentBudget.balance -= amount;
      await currentBudget.save();
    }

    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "Transaction successfully created and balances updated",
      data: transaction,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to create transaction",
      details: err.message,
    });
  }
};

export const getTransactionsByDateRange = async (req, res) => {
  const { date1, date2 } = req.body;

  if (new Date(date1) > new Date(date2)) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      error: "from date should be less than or equal to limit last date",
    });
  }

  try {
    const transactions = await Transaction.find({
      createdAt: { $gte: new Date(date1), $lte: new Date(date2) },
    })
      .populate("account")
      .populate("category");
    

    if (transactions.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "No transactions found within the given date range",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: transactions,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve transactions",
      details: err.message,
    });
  }
};

  export const getTransactionsOut = async (req, res) => {
  try {
    const transactions = await Transaction.find()
    .populate("account")
    .populate("category")
 


    if (transactions.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        error: "No transactions found",
      });
    }

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: transactions,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Failed to retrieve transactions",
      details: err.message,
    });
  }
};

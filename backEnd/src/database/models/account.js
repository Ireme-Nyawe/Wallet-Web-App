import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: false,
    },
    bankName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AccountSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const TransactionIn = mongoose.model("transactionIns");
  const Transaction = mongoose.model("transactions");

  const accountId = this._id;

  const hasReferences =
    (await TransactionIn.exists({ account: accountId })) ||
    (await Transaction.exists({ account: accountId }));

  if (hasReferences) {
    const error = new Error("Account cannot be deleted as it has references in other models.");
    return next(error);
  }
  next();
});

const Account = mongoose.model("accounts", AccountSchema);

export default Account;

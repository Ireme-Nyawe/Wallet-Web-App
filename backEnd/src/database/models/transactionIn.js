import mongoose from "mongoose";

const transactionInSchema = new mongoose.Schema(
  {
    account: {
        type: ObjectId,
        ref: "accounts",
        required: true,

    },
    amount: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionIn = mongoose.model("transactionIns", transactionInSchema);

export default TransactionIn;

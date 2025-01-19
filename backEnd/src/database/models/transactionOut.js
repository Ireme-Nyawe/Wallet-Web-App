import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    category: {
        type: ObjectId,
        ref: "categories",
        required: true,

    },
    amount: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
    account: {
      type: ObjectId,
      ref: "accounts",
      required: true,

  },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("transactions", transactionSchema);

export default Transaction;

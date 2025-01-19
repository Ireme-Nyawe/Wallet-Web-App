import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const Budget = mongoose.model("budgets", budgetSchema);

export default Budget;

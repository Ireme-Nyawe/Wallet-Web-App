import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);


categorySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const Transaction = mongoose.model("transactions");

  const categoryId = this._id;

  const hasReferences = await Transaction.exists({ category: categoryId });

  if (hasReferences) {
    const error = new Error("Category cannot be deleted as it has references in other models.");
    return next(error);
  }
  next();
});

const Category = mongoose.model("categories", categorySchema);

export default Category;

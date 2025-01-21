import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { useToast } from "../../toasts/ToastManager";
import { viewCategories } from "../../../slices/categorySlice";
import {
    addTransactionOut,
} from "../../../slices/transactionSlice";
import { viewAccounts } from "../../../slices/accountSlice";

function NewTransactionOutModal({ onClose }) {
  const [formData, setFormData] = useState({
    accountId: "",
    amount: "",
    categoryId: "",
  });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToast();

  const getAvailableAccounts = async () => {
    const response = await viewAccounts();
    setAccounts(response.data);
  };

  useEffect(() => {
    getAvailableAccounts();
  }, []);

  const getAvailableCategories = async () => {
    const response = await viewCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    getAvailableCategories();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await addTransactionOut(formData);
      if (response.status === 201) {
        addToast("success", `Well, TransactionIn Made .`, 3000);
        setFormData({
          accountId: "",
          amount: "",
          categoryId: "",
        });
        onClose();
      } else {
        addToast("error", response.message || "Something went wrong!", 3000);
      }
    } catch (error) {
      setErrors({ submit: error.message });
      addToast("error", error.message, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed  w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-dark">
            Add My Expenses/ TransactionOut
          </h2>
          <button
            onClick={onClose}
            className="text-dark border rounded-full border-2 border-warning px-2 hover:text-warning font-bold text-xl"
          >
            &times;
          </button>
        </div>
        <hr className="pt-5" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-dark font-medium mb-1">
              Account Name
            </label>
            <select
              name="accountId"
              value={formData.accountId}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            >
              <option value="">Select account to add money to </option>
              {accounts && accounts.length > 0 ? (
                accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountName} - {account.bankName}
                  </option>
                ))
              ) : (
                <option value="">No Account - Add it first!</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Amount</label>
            <input
              type="Number"
              name="amount"
              value={formData.amount}
              required
              onChange={handleInputChange}
              placeholder="Enter  amount"
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>
          <div>
            <label className="block text-dark font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            >
              <option value="">Select expense category</option>
              {categories && categories.length > 0 ? (
                categories.map(
                  (
                    category
                  ) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )
                )
              ) : (
                <option value="">No expense Category - Add it first!</option>
              )}
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <Button title={"Save TransactioIn"} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTransactionOutModal;

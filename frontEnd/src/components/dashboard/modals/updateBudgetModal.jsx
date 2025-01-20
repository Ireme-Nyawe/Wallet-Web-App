import React, { useState, useEffect } from "react";
import { updateBudget, viewSingleBudget } from "../../../slices/budgetSlice";
import Button from "../../reusable/Button";
import { useToast } from "../../toasts/ToastManager";

function UpdateBudgetModal({ onClose, budgetId }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    total: "",
    balance: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await viewSingleBudget(budgetId);
        const data = response.data;
        setFormData({
          from: new Date(data.from).toISOString().split("T")[0],
          to: new Date(data.to).toISOString().split("T")[0],
          total: data.total,
          balance: data.balance,
        });
        setExistingData(data);
      } catch (error) {
        addToast("error", "Failed to fetch budget data.", 3000);
      }
    };

    if (budgetId) {
      fetchBudgetData();
    }
  }, [budgetId, addToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "total" && existingData) {
        const newTotal = parseFloat(value) || 0;
        const newBalance =
          newTotal - existingData.total + existingData.balance;

        return {
          ...prevData,
          [name]: value,
          balance: newBalance.toFixed(2),
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await updateBudget(existingData._id,formData);
      if (response.status === 200) {
        addToast(
          "success",
          `Budget updated for ${formData.from} - ${formData.to}.`,
          3000
        );
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
    <div className="fixed w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-primary w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-dark">Adjust Budget Now</h2>
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
            <label className="block text-dark font-medium mb-1">From</label>
            <input
              type="date"
              name="from"
              required
              value={formData.from}
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>
          <div>
            <label className="block text-dark font-medium mb-1">To</label>
            <input
              type="date"
              name="to"
              required
              value={formData.to}
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>
          <div>
            <label className="block text-dark font-medium mb-1">Total</label>
            <input
              type="number"
              name="total"
              required
              value={formData.total}
              onChange={handleInputChange}
              placeholder="Enter total amount"
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>
          <div>
            <label className="block text-dark font-medium mb-1">Balance</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              readOnly
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight cursor-not-allowed"
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button title="Update Budget" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBudgetModal;

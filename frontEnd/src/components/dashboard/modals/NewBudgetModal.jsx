import React, { useState } from "react";
import { createPeriodBudget } from "../../../slices/budgetSlice";
import Button from "../../reusable/Button";
import { useToast } from "../../toasts/ToastManager";
import { useNavigate } from "react-router-dom";

function NewBudgetModal({ onClose }) {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    total: 0,
    balance: 0,
  });
  const [errors, setErrors] = useState({ name: "", description: "" });
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      balance: formData.total, 
    };
  
    try {
      setLoading(true);
      const response = await createPeriodBudget(updatedFormData);
      if (response.status === 201) {
        addToast(
          "success",
          `Well, Budget for ${formData.from}-${formData.to} setted.`,
          3000
        );
        navigate("/dashboard")
        navigate("/dashboard/budget")
        setFormData({
          from: "",
          to: "",
          total: 0,
          balance: 0,
        });
        onClose();
      } else if (response.status === 400) {
        addToast("error", response.message, 3000);
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
          <h2 className="text-2xl font-bold text-dark">Add New Budget</h2>
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
              value={formData.to}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Total</label>
            <input
              type="number"
              name="total"
              value={formData.total}
              required
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
              value={formData.total}
              onChange={handleInputChange}
              placeholder="Enter remaining balance"
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight cursor-not-allowed "
              readOnly
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button title={"Set New Budget"} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBudgetModal;

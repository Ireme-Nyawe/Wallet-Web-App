import React, { useState, useEffect } from "react";
import Button from "../../reusable/Button";
import { useToast } from "../../toasts/ToastManager";
import { updateAccount, viewSingleAccount } from "../../../slices/accountSlice";

function AccountUpdateModal({ onClose, id }) {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    balance: 0,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await viewSingleAccount(id);
        const data = response.data;
        setFormData({
          accountName: data.accountName,
          accountNumber: data.accountNumber,
          bankName: data.bankName,
          balance: data.balance,
        });
        setExistingData(data);
      } catch (error) {
        addToast("error", "Failed to fetch data.", 3000);
      }
    };

    if (id) {
      fetchAccountData();
    }
  }, [id, addToast]);

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
      const response = await updateAccount(existingData._id, formData);
      if (response.status === 200) {
        addToast("success", `Account updated succesfully`, 3000);
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
            Update Account Details
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
            <input
              type="text"
              name="accountName"
              required
              value={formData.accountName}
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
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
              value={formData.balance}
              title="Balance is changed by Transaction In with description."
              onChange={handleInputChange}
              placeholder="balance"
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight cursor-not-allowed "
              readOnly
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button title={"Update Account"} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountUpdateModal;

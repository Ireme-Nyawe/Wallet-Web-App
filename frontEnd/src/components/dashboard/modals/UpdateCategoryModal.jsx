import React, { useState, useEffect } from "react";
import Button from "../../reusable/Button";
import { useToast } from "../../toasts/ToastManager";
import { updateCategory, viewSingleCategory } from "../../../slices/categorySlice";

function UpdateCategoryModal({ onClose, id }) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await viewSingleCategory(id);
        const data = response.data;
        setFormData({ name: data.name });
        setExistingData(data);
      } catch (error) {
        addToast("error", "Failed to fetch data.", 3000);
      }
    };

    if (id) {
      fetchCategoryData();
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
      const response = await updateCategory(existingData._id, formData);
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
            Update Category Details
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
            <label className="block text-dark font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          
          <div className="flex justify-end mt-4">
            <Button title={"Update Category"} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCategoryModal;

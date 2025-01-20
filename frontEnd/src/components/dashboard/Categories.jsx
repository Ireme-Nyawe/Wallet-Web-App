import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";

import { useToast } from "../toasts/ToastManager";
import { deleteCategory, viewCategories } from "../../slices/categorySlice";
import NewCategoryModal from "./modals/newCategoryModal";
import UpdateCategoryModal from "./modals/UpdateCategoryModal";


function Categories() {
  const [isNewCategoryModal, openNewCategoryModal] = useState(false);
  const [isUpdateCategoryModal, openUpdateCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const [fetching, setFetching] = useState(true);
  const [clickedBudgetId, setClickedBudgetId] = useState();
  const { addToast } = useToast();

  const getAvailableCategories = async () => {
    setFetching(true); 
    const response = await viewCategories();
    setCategories(response.data);
    setFetching(false);
  };

  useEffect(() => {
    getAvailableCategories();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const pageCategories =categories.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteCategory = async (id) => {
    const response = await deleteCategory(id);
    if (response.status === 200) {
      addToast("success", `Well, Category Removed Successfully.`, 3000);
      await getAvailableCategories();
    }
  };

  const handleUpdateCategory = (id) => {
    openUpdateCategoryModal(true);
    setClickedBudgetId(id);
  };

  const handleNewCategoryClose = async () => {
    openNewCategoryModal(false);
    await getAvailableCategories();
  };

  const handleUpdateCategoryClose = async () => {
    openUpdateCategoryModal(false);
    await getAvailableCategories();
  };

  return (
    <div>
      <TopHeading title="My Expense Categories" />
      <div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => openNewCategoryModal(true)}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            +New Category
          </button>
        </div>
        {fetching ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Category</th>
                <th className="px-6 py-3 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : categories.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
              <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Category Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <td className="px-6 py-3 border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {category.name}
                  </td>
                  
                  <td className="px-6 py-3 border-b border-gray-300">
                    <button
                      className="text-blue-500"
                      onClick={() => handleUpdateCategory(category._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Category found</div>
        )}
        {pageCategories.length > recordsPerPage && (
          <div className="mt-4 flex justify-center">
            <button
              className="px-4 py-2 bg-accent text-white"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-accent text-white ml-2"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastRecord >= budgets.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {isNewCategoryModal && (
        <NewCategoryModal onClose={handleNewCategoryClose} />
      )}
      {isUpdateCategoryModal && (
        <UpdateCategoryModal onClose={handleUpdateCategoryClose} id={clickedBudgetId} />
      )}
    </div>
  );
}

export default Categories;

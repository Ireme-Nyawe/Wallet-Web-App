import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";
import { deleteBudget, viewBudgets } from "../../slices/budgetSlice";
import NewBudgetModal from "./modals/NewBudgetModal";
import { useToast } from "../toasts/ToastManager";
import UpdateBudgetModal from "./modals/updateBudgetModal";

function Budget() {
  const [isNewBudgetModal, openNewBudgetModal] = useState(false);
  const [isUpdateBudgetModal, openUpdateBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [fetching, setFetching] = useState(true);
  const [clickedBudgetId, setClickedBudgetId] = useState();
  const { addToast } = useToast();

  const getAvailableBudgets = async () => {
    setFetching(true); 
    const response = await viewBudgets();
    setBudgets(response.data);
    setFetching(false);
  };

  useEffect(() => {
    getAvailableBudgets();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentBudgets = budgets.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteBudget = async (id) => {
    const response = await deleteBudget(id);
    if (response.status === 200) {
      addToast("success", `Well, Budget Removed Successfully.`, 3000);
      await getAvailableBudgets();
    }
  };

  const handleUpdateBudget = (id) => {
    openUpdateBudgetModal(true);
    setClickedBudgetId(id);
  };

  const handleNewBudgetClose = async () => {
    openNewBudgetModal(false);
    await getAvailableBudgets();
  };

  const handleUpdateBudgetClose = async () => {
    openUpdateBudgetModal(false);
    await getAvailableBudgets();
  };

  return (
    <div>
      <TopHeading title="My Budgets" />
      <div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => openNewBudgetModal(true)}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            + New Budget
          </button>
        </div>
        {fetching ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">From</th>
                <th className="px-6 py-3 border-b border-gray-300">To</th>
                <th className="px-6 py-3 border-b border-gray-300">Balance</th>
                <th className="px-6 py-3 border-b border-gray-300">Total</th>
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
        ) : currentBudgets.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">From</th>
                <th className="px-6 py-3 border-b border-gray-300">To</th>
                <th className="px-6 py-3 border-b border-gray-300">Balance</th>
                <th className="px-6 py-3 border-b border-gray-300">Total</th>
                <th className="px-6 py-3 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBudgets.map((budget, index) => (
                <tr key={budget._id}>
                  <td className="px-6 py-3 border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {new Date(budget.from).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {new Date(budget.to).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{budget.balance}</td>
                  <td className="px-6 py-3 border-b border-gray-300">{budget.total}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <button
                      className="text-blue-500"
                      onClick={() => handleUpdateBudget(budget._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleDeleteBudget(budget._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No budget found</div>
        )}
        {budgets.length > recordsPerPage && (
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
      {isNewBudgetModal && (
        <NewBudgetModal onClose={handleNewBudgetClose} />
      )}
      {isUpdateBudgetModal && (
        <UpdateBudgetModal onClose={handleUpdateBudgetClose} budgetId={clickedBudgetId} />
      )}
    </div>
  );
}

export default Budget;

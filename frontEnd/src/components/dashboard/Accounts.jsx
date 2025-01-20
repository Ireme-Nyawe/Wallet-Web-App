import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";

import { useToast } from "../toasts/ToastManager";
import { deleteAccount, viewAccounts } from "../../slices/accountSlice";
import NewAccountModal from "./modals/newAccountModal";
import AccountUpdateModal from "./modals/AccountUpdateModal";


function Accounts() {
  const [isNewAccountModal, openNewAccountModal] = useState(false);
  const [isUpdateAccountModal, openUpdateAccountModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [fetching, setFetching] = useState(true);
  const [clickedBudgetId, setClickedBudgetId] = useState();
  const { addToast } = useToast();

  const getAvailableAccounts = async () => {
    setFetching(true); 
    const response = await viewAccounts();
    setAccounts(response.data);
    setFetching(false);
  };

  useEffect(() => {
    getAvailableAccounts();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const pageAccounts = accounts.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteAccount = async (id) => {
    const response = await deleteAccount(id);
    if (response.status === 200) {
      addToast("success", `Well, Account Removed Successfully.`, 3000);
      await getAvailableAccounts();
    }
  };

  const handleUpdateAccount = (id) => {
    openUpdateAccountModal(true);
    setClickedBudgetId(id);
  };

  const handleNewAccountClose = async () => {
    openNewAccountModal(false);
    await getAvailableAccounts();
  };

  const handleUpdateBudgetClose = async () => {
    openUpdateAccountModal(false);
    await getAvailableAccounts();
  };

  return (
    <div>
      <TopHeading title="My Usable Accounts" />
      <div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => openNewAccountModal(true)}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            +New Account
          </button>
        </div>
        {fetching ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Number</th>
                <th className="px-6 py-3 border-b border-gray-300">Bank Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Balance</th>
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
        ) : accounts.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
              <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Number</th>
                <th className="px-6 py-3 border-b border-gray-300">Bank Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Balance</th>
                <th className="px-6 py-3 border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account._id}>
                  <td className="px-6 py-3 border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {account.accountName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{account.bankName}</td>
                  <td className="px-6 py-3 border-b border-gray-300">{account.balance}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <button
                      className="text-blue-500"
                      onClick={() => handleUpdateAccount(account._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleDeleteAccount(account._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Account found</div>
        )}
        {pageAccounts.length > recordsPerPage && (
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
      {isNewAccountModal && (
        <NewAccountModal onClose={handleNewAccountClose} />
      )}
      {isUpdateAccountModal && (
        <AccountUpdateModal onClose={handleUpdateBudgetClose} id={clickedBudgetId} />
      )}
    </div>
  );
}

export default Accounts;

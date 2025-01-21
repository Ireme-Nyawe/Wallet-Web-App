import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";

import { useToast } from "../toasts/ToastManager";
import { viewTransactionsIn, viewTransactionsOut } from "../../slices/transactionSlice";
import NewTransactionInModal from "./modals/newTransactionInModal";
import NewTransactionOutModal from "./modals/NewTransactionOutModal";


function Transactions() {
  const [isNewTransactionInModal, openNewTransactionInModal] = useState(false);
  const [isNewTransactionOutModal, openNewTransactionOutModal] = useState(false);
  const [TransactionsIn, setTransactionsIn] = useState([]);
  const [TransactionsOut, setTransactionsOut] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [recordsPerPage] = useState(8);
  const [recordsPerPage2] = useState(8);
  const [fetching, setFetching] = useState(true);
  const [fetching2, setFetching2] = useState(true);
  const [clickedBudgetId, setClickedBudgetId] = useState();
  const { addToast } = useToast();

  const getAvailableTransactionsIn = async () => {
    setFetching(true); 
    const response = await viewTransactionsIn();
    setTransactionsIn(response.data||[]);
    setFetching(false);
  };

  useEffect(() => {
    getAvailableTransactionsIn();
  }, []);

  const getAvailableTransactionsOut = async () => {
    setFetching2(true); 
    const response = await viewTransactionsOut();
    setTransactionsOut(response.data||[]);
    setFetching2(false);
  };

  useEffect(() => {
    getAvailableTransactionsOut();
  }, []);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const pageTransactionIn = TransactionsIn ? TransactionsIn.slice(indexOfFirstRecord, indexOfLastRecord) : [];
  
  const indexOfLastRecord2 = currentPage2 * recordsPerPage2;
  const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage2;
  const pageTransactionOut = TransactionsOut ? TransactionsOut.slice(indexOfFirstRecord2, indexOfLastRecord2) : [];
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

 

  const handleNewTransactionInClose = async () => {
    openNewTransactionInModal(false);
    await getAvailableTransactionsIn();
  };

  const handleNewTransactionOutClose = async () => {
    openNewTransactionOutModal(false);
    await getAvailableTransactionsOut();
  };

  return (
    <div>
      <TopHeading title="My Transactions " />
      <div>
        <div className="flex w-full justify-end">
          <button
            onClick={() => openNewTransactionInModal(true)}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            +New TransactionIn
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
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">Description</th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
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
        ) : TransactionsIn.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
              <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Number</th>
                <th className="px-6 py-3 border-b border-gray-300">Bank Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">Description</th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {TransactionsIn.map((tr, index) => (
                <tr key={tr._id}>
                  <td className="px-6 py-3 border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                  {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.account.bankName}</td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.amount}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.description}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No TransactionIn found</div>
        )}
        {pageTransactionIn.length > recordsPerPage && (
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

      <div className="mt-10">
        <div className="flex w-full justify-start">
          <button
            onClick={() => openNewTransactionOutModal(true)}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            +New TransactionOut
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
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">Category</th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
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
        ) : TransactionsOut.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
              <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Account Number</th>
                <th className="px-6 py-3 border-b border-gray-300">Bank Name</th>
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">Category</th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {TransactionsOut.map((tr, index) => (
                <tr key={tr._id}>
                  <td className="px-6 py-3 border-b border-gray-300">{index + 1}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                  {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.account.bankName}</td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.amount}</td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.category.name}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">{tr.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No TransactionOut found</div>
        )}
        {pageTransactionOut.length > recordsPerPage2 && (
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
              disabled={indexOfLastRecord2 >= budgets.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {isNewTransactionInModal && (
        <NewTransactionInModal onClose={handleNewTransactionInClose} />
      )}
      {isNewTransactionOutModal && (
        <NewTransactionOutModal onClose={handleNewTransactionOutClose} />
      )}
    </div>
  );
}

export default Transactions;

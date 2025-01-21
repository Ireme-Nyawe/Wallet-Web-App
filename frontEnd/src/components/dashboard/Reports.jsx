import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";

import {
  viewTransactionsIn,
  viewTransactionsInWithinRange,
  viewTransactionsOut,
  viewTransactionsOutWithinRange,
} from "../../slices/transactionSlice";
import Button from "../reusable/Button";

function Reports() {
  const [TransactionsIn, setTransactionsIn] = useState([]);
  const [TransactionsOut, setTransactionsOut] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [recordsPerPage] = useState(8);
  const [recordsPerPage2] = useState(8);
  const [fetching, setFetching] = useState(true);
  const [fetching2, setFetching2] = useState(true);
  const [isTransactionInClicked, setTransactionInClicked] = useState(false);
  const [isTransactionOutClicked, setTransactionOutClicked] = useState(false);
  const [reportClicked,setReportClicked] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date1: "",
    date2: "",
  });

  const getAvailableTransactionsIn = async () => {
    setFetching(true);
    const response = await viewTransactionsIn();
    setTransactionsIn(response.data || []);
    setFetching(false);
  };

  useEffect(() => {
    getAvailableTransactionsIn();
  }, []);

  const getAvailableTransactionsOut = async () => {
    setFetching2(true);
    const response = await viewTransactionsOut();
    setTransactionsOut(response.data || []);
    setFetching2(false);
  };

  useEffect(() => {
    getAvailableTransactionsOut();
  }, []);

  const getAvailableTransactionsInRange = async (date1, date2) => {
    setFetching(true);
    const response = await viewTransactionsInWithinRange(date1, date2);
    setTransactionsIn(response.data || []);
    setFetching(false);
  };

  const handleViewTransactionIn = (date1, date2) => {
    useEffect(() => {
      getAvailableTransactionsInRange(date1, date2);
    }, []);
  };
  const getAvailableTransactionsOutRange = async (date1, date2) => {
    setFetching2(true);
    const response = await viewTransactionsOutWithinRange(date1, date2);
    setTransactionsOut(response.data || []);
    setFetching2(false);
  };

  const handleViewTransactionOut = (data) => {
    useEffect(() => {
      getAvailableTransactionsOutRange(date1, date2);
    }, []);
  };
  const handleClickTransactionIn = () => {
    setTransactionOutClicked(false);
    setTransactionInClicked(true);
  setReportClicked(true)
  };
  const handleClickTransactionOut = () => {
    setTransactionInClicked(false);
    setTransactionOutClicked(true);
    setReportClicked(true)

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const pageTransactionIn = TransactionsIn
    ? TransactionsIn.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  const indexOfLastRecord2 = currentPage2 * recordsPerPage2;
  const indexOfFirstRecord2 = indexOfLastRecord2 - recordsPerPage2;
  const pageTransactionOut = TransactionsOut
    ? TransactionsOut.slice(indexOfFirstRecord2, indexOfLastRecord2)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

  return (
    <div>
      <TopHeading title="My Transactions " />
      <div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleClickTransactionIn}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            View TransactionIn Report
          </button>
        </div>
        {fetching ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Number
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Bank Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Description
                </th>
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
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Number
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Bank Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Description
                </th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {TransactionsIn.map((tr, index) => (
                <tr key={tr._id}>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.bankName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.amount}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.description}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.createdAt}
                  </td>
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
            onClick={handleClickTransactionOut}
            className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right"
          >
            View TransactionOut Report
          </button>
        </div>
        {fetching2 ? (
          <table className="min-w-full table-auto border-collapse border border-primary mt-2">
            <thead>
              <tr className="bg-secondary text-left">
                <th className="px-6 py-3 border-b border-gray-300">No</th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Number
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Bank Name
                </th>
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
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Account Number
                </th>
                <th className="px-6 py-3 border-b border-gray-300">
                  Bank Name
                </th>
                <th className="px-6 py-3 border-b border-gray-300">Amount</th>
                <th className="px-6 py-3 border-b border-gray-300">Category</th>
                <th className="px-6 py-3 border-b border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {TransactionsOut.map((tr, index) => (
                <tr key={tr._id}>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.accountNumber}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.account.bankName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.amount}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.category.name}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {tr.createdAt}
                  </td>
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
              onClick={() => paginate2(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-accent text-white ml-2"
              onClick={() => paginate2(currentPage + 1)}
              disabled={indexOfLastRecord2 >= budgets.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
      {reportClicked && (
        <div>
          <div>
            <label className="block text-dark font-medium mb-1">Date</label>
            <input
              type="text"
              name="name"
              required
              value={""}
              onChange={handleInputChange}
              className="w-full p-2 border border-neutral rounded focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div className="flex justify-end mt-4">
            {isTransactionInClicked ? (
              <button>transactionin</button>
            ) : (
              <button>out</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;

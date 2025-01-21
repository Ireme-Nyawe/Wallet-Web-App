import React, { useEffect, useState } from "react";
import TopHeading from "./TopHeading";
import { viewBudgets } from "../../slices/budgetSlice";
import { viewAccounts } from "../../slices/accountSlice";
import { viewTransactionsIn, viewTransactionsOut } from "../../slices/transactionSlice";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactionsIn, setTransactionsIn] = useState([]);
  const [transactionsOut, setTransactionsOut] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchData = async () => {
    setFetching(true);
    const [budgetsRes, accountsRes, transInRes, transOutRes] = await Promise.all([
      viewBudgets(),
      viewAccounts(),
      viewTransactionsIn(),
      viewTransactionsOut(),
    ]);
    setBudgets(budgetsRes.data || []);
    setAccounts(accountsRes.data || []);
    setTransactionsIn(transInRes.data || []);
    setTransactionsOut(transOutRes.data || []);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalBudgets = budgets.reduce((sum, b) => sum + b.total, 0);
  const usedBudgets = budgets.reduce((sum, b) => sum + (b.total - b.balance), 0);
  const totalTransactionsIn = transactionsIn.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactionsOut = transactionsOut.reduce((sum, t) => sum + t.amount, 0);

  const mostActiveAccount = accounts
    .map((acc) => ({
      ...acc,
      totalTransactions:
        transactionsIn.filter((t) => t.account === acc._id).length +
        transactionsOut.filter((t) => t.account === acc._id).length,
    }))
    .sort((a, b) => b.totalTransactions - a.totalTransactions)[0];

  const chartData = {
    labels: budgets.map((b, i) => `Budget ${i + 1}`),
    datasets: [
      {
        label: "Total Budget",
        data: budgets.map((b) => b.total),
        backgroundColor: "#D946EF",
      },
      {
        label: "Used Budget",
        data: budgets.map((b) => b.total - b.balance),
        backgroundColor: "#F472B6",
      },
    ],
  };

  return (
    <div className="p-6 bg-neutral min-h-screen">
      <TopHeading title="Wallet Dashboard" />
      {fetching ? (
        <p className="text-dark text-center">Loading data...</p>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-primary p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold text-dark">Total Budgets</h2>
              <p className="text-accent text-2xl">{totalBudgets.toFixed(2)}</p>
            </div>
            <div className="bg-primary p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold text-dark">Used Budgets</h2>
              <p className="text-accent text-2xl">{usedBudgets.toFixed(2)}</p>
            </div>
            <div className="bg-primary p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold text-dark">Transactions In</h2>
              <p className="text-accent text-2xl">{totalTransactionsIn.toFixed(2)}</p>
            </div>
            <div className="bg-primary p-4 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-bold text-dark">Transactions Out</h2>
              <p className="text-accent text-2xl">{totalTransactionsOut.toFixed(2)}</p>
            </div>
          </div>

          {mostActiveAccount && (
            <div className="bg-primary p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-dark">Most Active Account</h2>
              <p className="text-dark text-lg">
                {mostActiveAccount.accountName} ({mostActiveAccount.totalTransactions} transactions)
              </p>
            </div>
          )}

          <div className="bg-primary p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-dark mb-4">Budget Usage</h2>
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

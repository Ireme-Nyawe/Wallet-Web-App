import React from "react";
import TopHeading from "./TopHeading";
import { viewBudgets } from "../../slices/budgetSlice";

function Budget() {
  const availableBudgets = viewBudgets();
  return (
    <div>
      <TopHeading title="My Budgets" />
      <div>
        <div className="flex w-full justify-end">
          <button className="bg-highlight p-3 px-8 text-white hover:bg-accent items-right">
            New Budget
          </button>
        </div>
        <table class="min-w-full table-auto border-collapse border border-primary mt-2">
          <thead>
            <tr class="bg-secondary text-left">
              <th class="px-6 py-3 border-b border-gray-300">No</th>
              <th class="px-6 py-3 border-b border-gray-300">From</th>
              <th class="px-6 py-3 border-b border-gray-300">To</th>
              <th class="px-6 py-3 border-b border-gray-300">Balance</th>
              <th class="px-6 py-3 border-b border-gray-300">Total</th>
              <th class="px-6 py-3 border-b border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Budget;

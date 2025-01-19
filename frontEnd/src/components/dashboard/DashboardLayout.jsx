import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaWallet, FaListAlt, FaFileAlt, FaSignOutAlt, FaCog } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral">
      <aside className="w-64 bg-secondary min-h-screen flex flex-col">
        <div className="p-6 border-b border-primary">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary">
              <FaCog className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-dark font-medium text-lg">My Wallet</h2>
              <p className="text-sm text-dark">Financial Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-4 flex-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-accent text-primary rounded-lg mb-2 hover:bg-highlight transition-colors"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>
          
          <Link
            to="/dashboard/budget"
            className="flex items-center gap-3 px-4 py-3 text-dark hover:bg-highlight hover:text-primary rounded-lg mb-2 transition-colors"
          >
            <FaWallet />
            <span>Set Budget</span>
          </Link>
          
          <Link
            to="/dashboard/categories"
            className="flex items-center gap-3 px-4 py-3 text-dark hover:bg-highlight hover:text-primary rounded-lg mb-2 transition-colors"
          >
            <FaListAlt />
            <span>Categories</span>
          </Link>
          
          <Link
            to="/dashboard/transactions"
            className="flex items-center gap-3 px-4 py-3 text-dark hover:bg-highlight hover:text-primary rounded-lg mb-2 transition-colors"
          >
            <FaWallet />
            <span>Transactions</span>
          </Link>
          
          <Link
            to="/dashboard/report"
            className="flex items-center gap-3 px-4 py-3 text-dark hover:bg-highlight hover:text-primary rounded-lg mb-2 transition-colors"
          >
            <FaFileAlt />
            <span>Generate Report</span>
          </Link>
        </nav>
        
        <div className="p-4 mt-auto">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 text-dark hover:bg-highlight hover:text-primary rounded-lg mb-2 transition-colors"
          >
            <FaCog />
            <span>Settings</span>
          </Link>
          
          <Link
            to="/logout"
            className="flex items-center gap-3 px-4 py-3 bg-warning text-dark hover:bg-highlight hover:text-primary rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <header className="bg-accent text-primary py-4 px-6 rounded-lg shadow mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>
        
        <div className="bg-primary rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
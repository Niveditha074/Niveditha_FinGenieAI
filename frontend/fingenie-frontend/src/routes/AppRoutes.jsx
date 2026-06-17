import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Loan from "../pages/Loan";
import Investments from "../pages/Investments";
import Transactions from "../pages/Transactions";
import FraudAlerts from "../pages/FraudAlerts";
import ChatAssistant from "../pages/ChatAssistant";
import Accounts from "../pages/Accounts";

import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminTransactions from "../pages/AdminTransactions";
import AdminAccounts from "../pages/AdminAccounts";
import AdminFraudAlerts from "../pages/AdminFraudAlerts";
import AdminLoans from "../pages/AdminLoans";
import AdminInvestments from "../pages/AdminInvestments";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/admin-transactions" element={<AdminTransactions />} />
        <Route path="/admin-accounts" element={<AdminAccounts />} />
        <Route path="/admin-fraud-alerts" element={<AdminFraudAlerts />} />
        <Route path="/admin-loans" element={<AdminLoans />} />
        <Route path="/admin-investments" element={<AdminInvestments />} />

        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/fraud-alerts" element={<FraudAlerts />} />
        <Route path="/chat" element={<ChatAssistant />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
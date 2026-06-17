import React from "react";
import AdminBackButton from "../components/AdminBackButton";
import FraudAlerts from "./FraudAlerts";

function AdminFraudAlerts() {
  return (
    <div>
      <style>
        {`
          .admin-fraud-alerts-content > .container > button.btn-outline-secondary.mb-3:first-child {
            display: none;
          }
        `}
      </style>

      <div className="container mt-4">
        <AdminBackButton />
      </div>

      <div className="admin-fraud-alerts-content">
        <FraudAlerts />
      </div>
    </div>
  );
}

export default AdminFraudAlerts;
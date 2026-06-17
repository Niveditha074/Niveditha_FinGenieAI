import React from "react";
import { useNavigate } from "react-router-dom";

function AdminBackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary mb-3"
      onClick={() => navigate("/admin-dashboard")}
    >
      ← Back
    </button>
  );
}

export default AdminBackButton;
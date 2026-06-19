import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline-secondary mb-3"
      onClick={() => navigate("/dashboard")}
    >
      ← Back
    </button>
  );
}

export default BackButton;
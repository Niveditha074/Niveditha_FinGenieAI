import React, { useEffect, useState } from "react";
import AdminBackButton from "../components/AdminBackButton";
import { getInvestments } from "../services/investmentService";

function AdminInvestments() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const response = await getInvestments();
      setInvestments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #f7b2bd 0%, #cdb4db 30%, #a2d2ff 65%, #bde0fe 100%)",
        padding: "30px 0"
      }}
    >
      <div className="container">
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "22px",
            padding: "28px",
            boxShadow: "0 18px 45px rgba(72, 61, 139, 0.25)"
          }}
        >
          <AdminBackButton />

          <h2
            className="fw-bold mt-3"
            style={{
              color: "#2b2d42"
            }}
          >
            Admin Investments
          </h2>

          <p
            style={{
              color: "#5f6472"
            }}
          >
            Admin can view all investment records here.
          </p>

          <div
            className="card border-0 mt-4"
            style={{
              borderRadius: "18px",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "6px",
                background: "linear-gradient(135deg, #90e0ef, #48cae4)"
              }}
            ></div>

            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4
                    className="fw-bold mb-1"
                    style={{
                      color: "#2b2d42"
                    }}
                  >
                    Investment Records
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "#6c757d"
                    }}
                  >
                    View submitted investment details in one place.
                  </p>
                </div>

                <div
                  className="px-3 py-2"
                  style={{
                    borderRadius: "14px",
                    backgroundColor: "#caf0f8",
                    color: "#023047",
                    fontWeight: "600"
                  }}
                >
                  📈 Investment Monitoring
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#caf0f8"
                    }}
                  >
                    <tr>
                      <th>ID</th>
                      <th>Fund Name</th>
                      <th>Amount</th>
                      <th>Risk Level</th>
                      <th>User ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {investments.map((investment, index) => (
                      <tr key={investment.investmentId || index}>
                        <td>{investment.investmentId}</td>
                        <td>{investment.fundName}</td>
                        <td>{investment.amount}</td>
                        <td>{investment.riskLevel}</td>
                        <td>{investment.userId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="mt-3 p-3"
                style={{
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #e0f7fa 0%, #f1f8ff 100%)",
                  border: "1px solid #bde0fe"
                }}
              >
                <p
                  className="mb-0"
                  style={{
                    color: "#5f6472"
                  }}
                >
                  <strong>Note:</strong> This page is for admin monitoring only.
                  Admin can view investment records without creating new investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInvestments;

import React, { useEffect, useState } from "react";
import AdminBackButton from "../components/AdminBackButton";
import { getLoans } from "../services/loanService";

function AdminLoans() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const data = await getLoans();
      setLoans(data);
    } catch (error) {
      console.log(error);
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
            background: "rgba(255, 255, 255, 0.94)",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 18px 45px rgba(72, 61, 139, 0.25)"
          }}
        >
          <AdminBackButton />

          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#2b2d42"
              }}
            >
              Admin Loans
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Admin can view all loan applications here.
            </p>
          </div>

          <div
            className="card border-0"
            style={{
              borderRadius: "18px",
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.08)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "6px",
                background: "linear-gradient(135deg, #ffd166, #f4a261)"
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
                    Loan Application Records
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "#6c757d"
                    }}
                  >
                    View submitted loan details in one place.
                  </p>
                </div>

                <div
                  className="px-3 py-2"
                  style={{
                    borderRadius: "14px",
                    background: "#fff3cd",
                    color: "#664d03",
                    fontWeight: "600"
                  }}
                >
                  📄 Loan Monitoring
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#fff3cd"
                    }}
                  >
                    <tr>
                      <th>ID</th>
                      <th>Loan Type</th>
                      <th>Amount</th>
                      <th>Salary</th>
                      <th>Credit Score</th>
                      <th>Status</th>
                      <th>User ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loans.map((loan, index) => (
                      <tr key={loan.loanId || index}>
                        <td>{loan.loanId}</td>
                        <td>{loan.loanType}</td>
                        <td>{loan.amount}</td>
                        <td>{loan.salary}</td>
                        <td>{loan.creditScore}</td>
                        <td>{loan.status}</td>
                        <td>{loan.userId}</td>
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
                    "linear-gradient(135deg, #fff1e6 0%, #fde2e4 100%)",
                  border: "1px solid #f8c6cc"
                }}
              >
                <p
                  className="mb-0"
                  style={{
                    color: "#5f6472"
                  }}
                >
                  <strong>Note:</strong> This page is for admin monitoring only.
                  Admin can view loan applications without applying for loans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoans;
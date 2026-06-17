import React, { useEffect, useState } from "react";
import AdminBackButton from "../components/AdminBackButton";
import { getAllTransactions } from "../services/transactionService";

function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionTypeBadge = (type) => {
    const transactionType = type ? type.toLowerCase() : "";

    if (transactionType === "credit") {
      return "bg-success";
    }

    if (transactionType === "debit") {
      return "bg-danger";
    }

    return "bg-secondary";
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
              Admin Transactions
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Admin can view and monitor all transaction records here.
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
                background: "linear-gradient(135deg, #52b788, #40916c)"
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
                    Transaction Records
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "#6c757d"
                    }}
                  >
                    Total Transactions:{" "}
                    <span className="fw-bold text-success">
                      {transactions.length}
                    </span>
                  </p>
                </div>

                <div
                  className="px-3 py-2"
                  style={{
                    borderRadius: "14px",
                    background: "#d8f3dc",
                    color: "#1b4332",
                    fontWeight: "600"
                  }}
                >
                  💳 Transaction Monitoring
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#d8f3dc"
                    }}
                  >
                    <tr>
                      <th>ID</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Account ID</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <tr key={transaction.transactionId || index}>
                          <td>{transaction.transactionId || index + 1}</td>

                          <td>
                            <span className="fw-semibold">
                              ₹{transaction.amount}
                            </span>
                          </td>

                          <td>
                            {transaction.transactionType ? (
                              <span
                                className={`badge ${getTransactionTypeBadge(
                                  transaction.transactionType
                                )}`}
                              >
                                {transaction.transactionType}
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                Not Available
                              </span>
                            )}
                          </td>

                          <td>{transaction.description}</td>

                          <td>{transaction.accountId}</td>

                          <td>
                            {transaction.paymentStatus ? (
                              <span className="badge bg-success">
                                {transaction.paymentStatus}
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                -
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <div
                            style={{
                              color: "#6c757d",
                              fontWeight: "500"
                            }}
                          >
                            No transaction records found
                          </div>
                        </td>
                      </tr>
                    )}
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
                  Admin can view transaction records without creating new transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTransactions;
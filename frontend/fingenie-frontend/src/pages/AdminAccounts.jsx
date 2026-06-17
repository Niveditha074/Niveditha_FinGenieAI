import React, { useEffect, useState } from "react";
import AdminBackButton from "../components/AdminBackButton";
import { getAllAccounts } from "../services/accountService";

function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await getAllAccounts();

      console.log("ADMIN ACCOUNTS DATA =", data);

      if (Array.isArray(data)) {
        setAccounts(data);
      } else if (data && Array.isArray(data.data)) {
        setAccounts(data.data);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error("ERROR LOADING ADMIN ACCOUNTS =", error);
      setAccounts([]);
    }
  };

  const getAccountTypeBadgeClass = (accountType) => {
    const type = accountType ? accountType.toLowerCase() : "";

    if (type === "savings") {
      return "bg-success";
    }

    if (type === "current") {
      return "bg-primary";
    }

    if (type === "salary") {
      return "bg-info text-dark";
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
              Admin Accounts
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Admin can view all customer account records here.
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
                background: "linear-gradient(135deg, #5e60ce, #4ea8de)"
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
                    Customer Account Records
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "#6c757d"
                    }}
                  >
                    Total Accounts:{" "}
                    <span
                      className="fw-bold"
                      style={{
                        color: "#5e60ce"
                      }}
                    >
                      {accounts.length}
                    </span>
                  </p>
                </div>

                <div
                  className="px-3 py-2"
                  style={{
                    borderRadius: "14px",
                    background: "#e7f1ff",
                    color: "#1d3557",
                    fontWeight: "600"
                  }}
                >
                  🏦 Account Monitoring
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#e7f1ff"
                    }}
                  >
                    <tr>
                      <th>ID</th>
                      <th>Account Number</th>
                      <th>Account Type</th>
                      <th>Balance</th>
                      <th>User ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {accounts.length > 0 ? (
                      accounts.map((account, index) => (
                        <tr key={account.accountId || index}>
                          <td>{account.accountId || index + 1}</td>

                          <td>
                            <span className="fw-semibold">
                              {account.accountNumber}
                            </span>
                          </td>

                          <td>
                            {account.accountType ? (
                              <span
                                className={`badge ${getAccountTypeBadgeClass(
                                  account.accountType
                                )}`}
                              >
                                {account.accountType}
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                Not Available
                              </span>
                            )}
                          </td>

                          <td>
                            <span className="fw-semibold text-success">
                              ₹{account.balance}
                            </span>
                          </td>

                          <td>{account.userId}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <div
                            style={{
                              color: "#6c757d",
                              fontWeight: "500"
                            }}
                          >
                            No account records found
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
                  Admin can view customer account details without creating new accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccounts;
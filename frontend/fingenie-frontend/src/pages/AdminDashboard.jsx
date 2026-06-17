import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({
    totalTransactions: 0,
    totalInvestments: 0,
    totalFraudAlerts: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdminAnalytics();
  }, []);

  const getCountFromResponse = (responseData) => {
    if (Array.isArray(responseData)) {
      return responseData.length;
    }

    if (responseData && Array.isArray(responseData.data)) {
      return responseData.data.length;
    }

    if (responseData && Array.isArray(responseData.content)) {
      return responseData.content.length;
    }

    return 0;
  };

  const getFraudAlertCount = async () => {
    const possibleFraudEndpoints = [
      "/fraud-alerts",
      "/fraudalerts",
      "/fraud-alert",
      "/fraud",
      "/fraudAlerts"
    ];

    for (const endpoint of possibleFraudEndpoints) {
      try {
        const response = await api.get(endpoint);

        console.log("FRAUD ALERT ENDPOINT WORKING =", endpoint);
        console.log("FRAUD ALERT DATA =", response.data);

        return getCountFromResponse(response.data);
      } catch (error) {
        console.log("Fraud endpoint failed:", endpoint);
      }
    }

    return 0;
  };

  const loadAdminAnalytics = async () => {
    try {
      setLoading(true);

      const transactionsResponse = await api.get("/transactions");
      const investmentsResponse = await api.get("/investments");
      const fraudAlertCount = await getFraudAlertCount();

      const totalTransactions = getCountFromResponse(
        transactionsResponse.data
      );

      const totalInvestments = getCountFromResponse(
        investmentsResponse.data
      );

      setAnalytics({
        totalTransactions,
        totalInvestments,
        totalFraudAlerts: fraudAlertCount
      });
    } catch (error) {
      console.error("ERROR LOADING ADMIN ANALYTICS =", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Admin Logged Out Successfully");
    navigate("/admin-login");
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#2b2d42"
                }}
              >
                FinGenie Admin Dashboard
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#5f6472"
                }}
              >
                Monitor banking operations, analytics and admin modules from one place.
              </p>
            </div>

            <button
              type="button"
              className="btn px-4"
              onClick={handleLogout}
              style={{
                borderRadius: "12px",
                border: "1px solid #f28482",
                color: "#d62828",
                backgroundColor: "#ffffff",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </div>

          <div
            className="p-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg, #fff1e6 0%, #fde2e4 55%, #f8edeb 100%)",
              borderRadius: "18px",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 8px 20px rgba(242, 132, 130, 0.18)"
            }}
          >
            <h4
              className="fw-semibold mb-2"
              style={{
                color: "#2b2d42"
              }}
            >
              Welcome Admin!
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              You can monitor transactions, investments, fraud alerts, accounts and loan records from this dashboard.
            </p>
          </div>

          <h4
            className="fw-bold mt-4 mb-3"
            style={{
              color: "#2b2d42"
            }}
          >
            Admin Analytics
          </h4>

          <div className="row mb-4 g-4">
            <div className="col-md-4">
              <div
                className="card text-center border-0 h-100"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      background: "#d8f3dc",
                      fontSize: "28px"
                    }}
                  >
                    💳
                  </div>

                  <h5 className="card-title text-success fw-bold">
                    Total Transactions
                  </h5>

                  <h2
                    className="fw-bold"
                    style={{
                      color: "#2b2d42"
                    }}
                  >
                    {loading ? "..." : analytics.totalTransactions}
                  </h2>

                  <p className="text-muted mb-0">
                    Overall transaction records
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card text-center border-0 h-100"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      background: "#caf0f8",
                      fontSize: "28px"
                    }}
                  >
                    📈
                  </div>

                  <h5
                    className="card-title fw-bold"
                    style={{
                      color: "#0096c7"
                    }}
                  >
                    Total Investments
                  </h5>

                  <h2
                    className="fw-bold"
                    style={{
                      color: "#2b2d42"
                    }}
                  >
                    {loading ? "..." : analytics.totalInvestments}
                  </h2>

                  <p className="text-muted mb-0">
                    Overall investment records
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card text-center border-0 h-100"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    height: "6px",
                    background: "linear-gradient(135deg, #ff758f, #d62828)"
                  }}
                ></div>

                <div className="card-body p-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "50%",
                      background: "#ffe5ec",
                      fontSize: "28px"
                    }}
                  >
                    🚨
                  </div>

                  <h5 className="card-title text-danger fw-bold">
                    Total Fraud Alerts
                  </h5>

                  <h2
                    className="fw-bold"
                    style={{
                      color: "#2b2d42"
                    }}
                  >
                    {loading ? "..." : analytics.totalFraudAlerts}
                  </h2>

                  <p className="text-muted mb-0">
                    Detected fraud alert records
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h4
            className="fw-bold mb-3"
            style={{
              color: "#2b2d42"
            }}
          >
            Admin Modules
          </h4>

          <div className="row mt-4 g-4">
            <div className="col-md-3">
              <Link
                to="/admin-transactions"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 text-center"
                  style={{
                    borderRadius: "18px",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                    <div className="fs-2 mb-2">💳</div>

                    <h5 className="fw-bold text-success">
                      Transactions
                    </h5>

                    <p className="text-muted small">
                      View all transaction records.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #52b788, #40916c)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin-accounts"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 text-center"
                  style={{
                    borderRadius: "18px",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                    <div className="fs-2 mb-2">🏦</div>

                    <h5
                      className="fw-bold"
                      style={{
                        color: "#5e60ce"
                      }}
                    >
                      Accounts
                    </h5>

                    <p className="text-muted small">
                      View customer account records.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin-fraud-alerts"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 text-center"
                  style={{
                    borderRadius: "18px",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "6px",
                      background: "linear-gradient(135deg, #ff758f, #d62828)"
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div className="fs-2 mb-2">🚨</div>

                    <h5 className="fw-bold text-danger">
                      Fraud Alerts
                    </h5>

                    <p className="text-muted small">
                      Monitor suspicious activities.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ff758f, #d62828)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin-loans"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 text-center"
                  style={{
                    borderRadius: "18px",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                    <div className="fs-2 mb-2">📄</div>

                    <h5
                      className="fw-bold"
                      style={{
                        color: "#f4a261"
                      }}
                    >
                      Loans
                    </h5>

                    <p className="text-muted small">
                      View loan application records.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffd166, #f4a261)",
                        color: "#2b2d42",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3">
              <Link
                to="/admin-investments"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0 text-center"
                  style={{
                    borderRadius: "18px",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
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
                    <div className="fs-2 mb-2">📈</div>

                    <h5
                      className="fw-bold"
                      style={{
                        color: "#0096c7"
                      }}
                    >
                      Investment
                    </h5>

                    <p className="text-muted small">
                      View investment records.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #90e0ef, #48cae4)",
                        color: "#023047",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
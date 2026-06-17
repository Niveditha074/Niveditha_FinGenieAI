import BackButton from "../components/BackButton";
import React, { useState, useEffect } from "react";
import { getFraudAlerts } from "../services/fraudService";
import { getAllTransactions } from "../services/transactionService";

function FraudAlert() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const role = localStorage.getItem("role");
      const accountId = localStorage.getItem("accountId");

      const fraudResponse = await getFraudAlerts();
      const fraudData = fraudResponse.data;

      if (role === "ADMIN") {
        setAlerts(fraudData);
        return;
      }

      if (!accountId) {
        console.log("Account ID not found in localStorage");
        setAlerts([]);
        return;
      }

      const transactionData = await getAllTransactions();

      const userTransactions = transactionData.filter(
        (transaction) =>
          String(transaction.accountId) === String(accountId)
      );

      const userTransactionIds = userTransactions.map(
        (transaction) => String(transaction.transactionId)
      );

      const filteredAlerts = fraudData.filter((alert) =>
        userTransactionIds.includes(String(alert.transactionId))
      );

      setAlerts(filteredAlerts);
    } catch (error) {
      console.error("Error loading fraud alerts:", error);
    }
  };

  const getRiskScoreBadgeClass = (riskScore) => {
    if (riskScore >= 80) {
      return "bg-danger";
    }

    if (riskScore >= 50) {
      return "bg-warning text-dark";
    }

    return "bg-success";
  };

  const getStatusBadgeClass = (status) => {
    const alertStatus = status ? status.toLowerCase() : "";

    if (alertStatus === "high") {
      return "bg-danger";
    }

    if (alertStatus === "medium") {
      return "bg-warning text-dark";
    }

    if (alertStatus === "low") {
      return "bg-success";
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
          <BackButton />

          <div className="mb-4">
            <h2
              className="fw-bold mb-1"
              style={{
                color: "#2b2d42"
              }}
            >
              Fraud Alerts
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Review suspicious transactions and monitor fraud risk alerts.
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
                background: "linear-gradient(135deg, #ff758f, #d62828)"
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
                    Fraud Alert Records
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      color: "#6c757d"
                    }}
                  >
                    Total Alerts:{" "}
                    <span className="fw-bold text-danger">
                      {alerts.length}
                    </span>
                  </p>
                </div>

                <div
                  className="px-3 py-2"
                  style={{
                    borderRadius: "14px",
                    background: "#ffe5ec",
                    color: "#b00020",
                    fontWeight: "600"
                  }}
                >
                  🚨 Risk Monitoring
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#f8d7da"
                    }}
                  >
                    <tr>
                      <th>ID</th>
                      <th>Risk Score</th>
                      <th>Remarks</th>
                      <th>Status</th>
                      <th>Transaction ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {alerts.length > 0 ? (
                      alerts.map((alert) => (
                        <tr key={alert.fraudId}>
                          <td>{alert.fraudId}</td>

                          <td>
                            <span
                              className={`badge ${getRiskScoreBadgeClass(
                                alert.riskScore
                              )}`}
                            >
                              {alert.riskScore}
                            </span>
                          </td>

                          <td>{alert.remarks}</td>

                          <td>
                            {alert.status ? (
                              <span
                                className={`badge ${getStatusBadgeClass(
                                  alert.status
                                )}`}
                              >
                                {alert.status}
                              </span>
                            ) : (
                              <span className="badge bg-secondary">
                                Not Marked
                              </span>
                            )}
                          </td>

                          <td>{alert.transactionId}</td>
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
                            No Fraud Alerts Found
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
                  <strong>Note:</strong> High risk scores indicate transactions
                  that may require careful review before further processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FraudAlert;
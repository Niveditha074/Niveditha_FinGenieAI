import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
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
            background: "rgba(255, 255, 255, 0.92)",
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
                FinGenie Dashboard
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#5f6472"
                }}
              >
                Manage your banking services from one place
              </p>
            </div>

            <Link
              to="/"
              className="btn px-4"
              style={{
                borderRadius: "12px",
                border: "1px solid #f28482",
                color: "#d62828",
                backgroundColor: "#ffffff",
                fontWeight: "500"
              }}
            >
              Logout
            </Link>
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
              Welcome to FinGenie
            </h4>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Access transactions, loans, investments, fraud alerts and chat support easily.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <Link
                to="/transactions"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
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

                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-2">💳</div>

                    <h5 className="card-title text-success fw-bold">
                      Transactions
                    </h5>

                    <p className="card-text text-muted">
                      View transactions, QR payments and risk score checks.
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
                      Open Transactions
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/loan"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
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

                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-2">🏦</div>

                    <h5
                      className="card-title fw-bold"
                      style={{
                        color: "#f4a261"
                      }}
                    >
                      Loans
                    </h5>

                    <p className="card-text text-muted">
                      Apply for loans, calculate EMI and analyze credit score.
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
                      Open Loans
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/investments"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
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

                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-2">📈</div>

                    <h5
                      className="card-title fw-bold"
                      style={{
                        color: "#0096c7"
                      }}
                    >
                      Investments
                    </h5>

                    <p className="card-text text-muted">
                      Manage investments and use AI investment advisor tools.
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
                      Open Investments
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/fraud-alerts"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "6px",
                      background: "linear-gradient(135deg, #ffafcc, #f28482)"
                    }}
                  ></div>

                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-2">🚨</div>

                    <h5 className="card-title text-danger fw-bold">
                      Fraud Alerts
                    </h5>

                    <p className="card-text text-muted">
                      Check fraud alerts and suspicious transaction details.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffafcc, #f28482)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open Fraud Alerts
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/chat"
                className="text-decoration-none"
              >
                <div
                  className="card h-100 border-0"
                  style={{
                    borderRadius: "18px",
                    background: "#ffffff",
                    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.09)",
                    overflow: "hidden"
                  }}
                >
                  <div
                    style={{
                      height: "6px",
                      background: "linear-gradient(135deg, #6c757d, #343a40)"
                    }}
                  ></div>

                  <div className="card-body text-center p-4">
                    <div className="fs-1 mb-2">🤖</div>

                    <h5
                      className="card-title fw-bold"
                      style={{
                        color: "#2b2d42"
                      }}
                    >
                      Chat Assistant
                    </h5>

                    <p className="card-text text-muted">
                      Ask banking-related queries using the smart assistant.
                    </p>

                    <button
                      className="btn w-100"
                      style={{
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #6c757d, #343a40)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Open Chat Assistant
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

export default Dashboard;
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import BackButton from "../components/BackButton";

import {
  getAllTransactions,
  createTransaction
} from "../services/transactionService";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const [formData, setFormData] = useState({
    amount: "",
    transactionType: "",
    description: "",
    accountId: ""
  });

  const [qrPayment, setQrPayment] = useState({
    receiverUpiId: "",
    amount: ""
  });

  const [qrValue, setQrValue] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [qrMessage, setQrMessage] = useState("");

  const [showRiskChecker, setShowRiskChecker] = useState(false);

  const [riskData, setRiskData] = useState({
    receiverUpiId: "",
    amount: "",
    transactionType: ""
  });

  const [riskResult, setRiskResult] = useState(null);
  const [riskError, setRiskError] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const role = localStorage.getItem("role");
      const accountId = localStorage.getItem("accountId");

      const data = await getAllTransactions();

      if (role === "ADMIN") {
        setTransactions(data);
        return;
      }

      if (!accountId) {
        console.log("Account ID not found in localStorage");
        setTransactions([]);
        return;
      }

      const filteredTransactions = data.filter(
        (transaction) =>
          String(transaction.accountId) === String(accountId)
      );

      setTransactions(filteredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQrChange = (e) => {
    setQrPayment({
      ...qrPayment,
      [e.target.name]: e.target.value
    });
  };

  const handleRiskChange = (e) => {
    setRiskData({
      ...riskData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTransaction(formData);

      if (formData.accountId) {
        localStorage.setItem("accountId", formData.accountId);
      }

      alert("Transaction Created Successfully");

      setFormData({
        amount: "",
        transactionType: "",
        description: "",
        accountId: ""
      });

      loadTransactions();
    } catch (error) {
      alert("Error Creating Transaction");
      console.log(error);
    }
  };

  const handleGenerateQR = (e) => {
    e.preventDefault();

    if (!qrPayment.receiverUpiId || !qrPayment.amount) {
      setQrMessage("Please enter Receiver UPI ID and Amount");
      setQrValue("");
      setPaymentStatus("");
      return;
    }

    const upiQrData = `upi://pay?pa=${qrPayment.receiverUpiId}&pn=FinGenie User&am=${qrPayment.amount}&cu=INR`;

    setQrValue(upiQrData);
    setPaymentStatus("SUCCESS");
    setQrMessage("QR generated successfully. Payment status marked as SUCCESS.");

    const newTransaction = {
      transactionId: transactions.length + 1,
      amount: qrPayment.amount,
      transactionType: "DEBIT",
      description: `QR Payment to ${qrPayment.receiverUpiId}`,
      accountId: localStorage.getItem("accountId") || formData.accountId,
      paymentStatus: "SUCCESS"
    };

    setTransactions([...transactions, newTransaction]);
  };

  const resetQrPayment = () => {
    setQrPayment({
      receiverUpiId: "",
      amount: ""
    });

    setQrValue("");
    setPaymentStatus("");
    setQrMessage("");
  };

  const generateRiskScore = (e) => {
    e.preventDefault();

    const amount = parseFloat(riskData.amount);
    const transactionType = riskData.transactionType.toLowerCase();

    if (
      !riskData.receiverUpiId ||
      !riskData.amount ||
      !riskData.transactionType
    ) {
      setRiskError("Please enter Receiver UPI ID, Amount and Transaction Type");
      setRiskResult(null);
      return;
    }

    if (amount <= 0) {
      setRiskError("Transaction amount should be greater than 0");
      setRiskResult(null);
      return;
    }

    let riskScore = 0;
    let riskFactors = [];

    if (amount >= 1000000) {
      riskScore += 85;
      riskFactors.push("Extremely high transaction amount");
    } else if (amount >= 100000) {
      riskScore += 70;
      riskFactors.push("Very large transaction amount");
    } else if (amount >= 50000) {
      riskScore += 50;
      riskFactors.push("High transaction amount");
    } else if (amount >= 10000) {
      riskScore += 25;
      riskFactors.push("Moderate transaction amount");
    }

    if (!riskData.receiverUpiId.includes("@")) {
      riskScore += 25;
      riskFactors.push("Receiver UPI ID format looks suspicious");
    }

    if (
      transactionType !== "upi" &&
      transactionType !== "neft" &&
      transactionType !== "imps"
    ) {
      riskScore += 15;
      riskFactors.push("Uncommon transaction type entered");
    }

    if (riskScore > 100) {
      riskScore = 100;
    }

    let riskLevel = "";
    let safetyStatus = "";
    let recommendation = "";
    let badgeClass = "";

    if (riskScore >= 70) {
      riskLevel = "HIGH";
      safetyStatus = "Risky Transaction";
      recommendation =
        "Do not proceed immediately. Verify receiver details and transaction amount before payment.";
      badgeClass = "bg-danger";
    } else if (riskScore >= 40) {
      riskLevel = "MEDIUM";
      safetyStatus = "Moderate Risk Transaction";
      recommendation =
        "Please verify receiver UPI ID and amount carefully before continuing.";
      badgeClass = "bg-warning text-dark";
    } else {
      riskLevel = "LOW";
      safetyStatus = "Safe Transaction";
      recommendation =
        "Transaction looks safe, but always confirm receiver details before payment.";
      badgeClass = "bg-success";
    }

    setRiskResult({
      riskScore,
      riskLevel,
      safetyStatus,
      recommendation,
      riskFactors,
      badgeClass
    });

    setRiskError("");
  };

  const resetRiskChecker = () => {
    setRiskData({
      receiverUpiId: "",
      amount: "",
      transactionType: ""
    });

    setRiskResult(null);
    setRiskError("");
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
              style={{ color: "#2b2d42" }}
            >
              Transactions
            </h2>

            <p
              className="mb-0"
              style={{ color: "#5f6472" }}
            >
              Create transactions, make QR payments and check transaction risk scores.
            </p>
          </div>

          <div
            className="card border-0 mb-4"
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
              <h4
                className="fw-bold mb-3"
                style={{ color: "#2b2d42" }}
              >
                Create Transaction
              </h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  className="form-control mb-3"
                  value={formData.amount}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="text"
                  name="transactionType"
                  placeholder="Transaction Type"
                  className="form-control mb-3"
                  value={formData.transactionType}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control mb-3"
                  value={formData.description}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="accountId"
                  placeholder="Account ID"
                  className="form-control mb-3"
                  value={formData.accountId}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <button
                  type="submit"
                  className="btn px-4"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500"
                  }}
                >
                  Create Transaction
                </button>
              </form>
            </div>
          </div>

          <div
            className="card border-0 mb-4"
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
              <h3
                className="fw-bold mb-3"
                style={{ color: "#2b2d42" }}
              >
                QR-Based Payment
              </h3>

              <form onSubmit={handleGenerateQR}>
                <input
                  type="text"
                  name="receiverUpiId"
                  placeholder="Receiver UPI ID"
                  className="form-control mb-3"
                  value={qrPayment.receiverUpiId}
                  onChange={handleQrChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  className="form-control mb-3"
                  value={qrPayment.amount}
                  onChange={handleQrChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn px-4"
                    style={{
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #52b788, #40916c)",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: "500"
                    }}
                  >
                    Generate QR
                  </button>

                  <button
                    type="button"
                    className="btn px-4"
                    onClick={resetQrPayment}
                    style={{
                      borderRadius: "12px",
                      background: "#f1f3f5",
                      color: "#495057",
                      border: "1px solid #ced4da",
                      fontWeight: "500"
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>

              {qrMessage && (
                <p
                  className={
                    paymentStatus === "SUCCESS"
                      ? "text-success mt-3 mb-0"
                      : "text-danger mt-3 mb-0"
                  }
                >
                  {qrMessage}
                </p>
              )}

              {qrValue && (
                <div
                  className="mt-4 mb-2 p-4 text-center"
                  style={{
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg, #e0f7fa 0%, #f1f8ff 100%)",
                    border: "1px solid #bde0fe"
                  }}
                >
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "#2b2d42" }}
                  >
                    Generated QR Code
                  </h4>

                  <QRCodeCanvas value={qrValue} size={200} />

                  <p className="mt-3 mb-1">
                    <strong>Receiver UPI ID:</strong> {qrPayment.receiverUpiId}
                  </p>

                  <p className="mb-1">
                    <strong>Amount:</strong> ₹{qrPayment.amount}
                  </p>

                  <p className="mb-0">
                    <strong>Payment Status:</strong>{" "}
                    <span className="badge bg-success">
                      {paymentStatus}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            className="card border-0 mb-4"
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
              <button
                type="button"
                className="btn mb-3"
                onClick={() => setShowRiskChecker(!showRiskChecker)}
                style={{
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ffd166, #f4a261)",
                  color: "#2b2d42",
                  border: "none",
                  fontWeight: "500"
                }}
              >
                {showRiskChecker
                  ? "Hide Transaction Risk Checker & Risk Score Generator"
                  : "Transaction Risk Checker & Risk Score Generator"}
              </button>

              {showRiskChecker && (
                <div
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#fffaf0",
                    border: "1px solid #ffe5b4",
                    padding: "20px"
                  }}
                >
                  <h4
                    className="fw-bold mb-3"
                    style={{ color: "#2b2d42" }}
                  >
                    Transaction Risk Checker & Risk Score Generator
                  </h4>

                  <form onSubmit={generateRiskScore}>
                    <input
                      type="text"
                      name="receiverUpiId"
                      placeholder="Receiver UPI ID"
                      className="form-control mb-3"
                      value={riskData.receiverUpiId}
                      onChange={handleRiskChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="number"
                      name="amount"
                      placeholder="Transaction Amount"
                      className="form-control mb-3"
                      value={riskData.amount}
                      onChange={handleRiskChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="text"
                      name="transactionType"
                      placeholder="Transaction Type e.g. UPI, NEFT, IMPS"
                      className="form-control mb-3"
                      value={riskData.transactionType}
                      onChange={handleRiskChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <button
                      type="submit"
                      className="btn me-2"
                      style={{
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, #5e60ce, #4ea8de)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "500"
                      }}
                    >
                      Generate Risk Score
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetRiskChecker}
                      style={{
                        borderRadius: "12px"
                      }}
                    >
                      Reset
                    </button>
                  </form>

                  {riskError && (
                    <p className="text-danger mt-3">{riskError}</p>
                  )}

                  {riskResult && (
                    <div
                      className="mt-4 p-4"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #f1dca7"
                      }}
                    >
                      <h5
                        className="fw-bold"
                        style={{ color: "#2b2d42" }}
                      >
                        Generated Risk Score Result
                      </h5>

                      <p>
                        <strong>Risk Score:</strong> {riskResult.riskScore}/100
                      </p>

                      <p>
                        <strong>Risk Level:</strong>{" "}
                        <span className={`badge ${riskResult.badgeClass}`}>
                          {riskResult.riskLevel}
                        </span>
                      </p>

                      <p>
                        <strong>Safety Status:</strong>{" "}
                        {riskResult.safetyStatus}
                      </p>

                      <p>
                        <strong>Recommendation:</strong>{" "}
                        {riskResult.recommendation}
                      </p>

                      <p>
                        <strong>Risk Factors:</strong>
                      </p>

                      <ul>
                        {riskResult.riskFactors.length > 0 ? (
                          riskResult.riskFactors.map((factor, index) => (
                            <li key={index}>{factor}</li>
                          ))
                        ) : (
                          <li>No major risk factors found</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                background: "linear-gradient(135deg, #cdb4db, #ffafcc)"
              }}
            ></div>

            <div className="card-body p-4">
              <h4
                className="fw-bold mb-3"
                style={{ color: "#2b2d42" }}
              >
                Transaction History
              </h4>

              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead
                    style={{
                      backgroundColor: "#f3e8ff"
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
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.transactionId || index}>
                        <td>{transaction.transactionId || index + 1}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.accountId}</td>
                        <td>
                          {transaction.paymentStatus ? (
                            <span className="badge bg-success">
                              {transaction.paymentStatus}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Transactions;

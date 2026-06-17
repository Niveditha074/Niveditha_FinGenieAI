import BackButton from "../components/BackButton";
import React, { useEffect, useState } from "react";
import { getLoans, applyLoan } from "../services/loanService";

function Loan() {
  const [loans, setLoans] = useState([]);

  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    salary: "",
    creditScore: "",
    userId: ""
  });

  const [showEmiCalculator, setShowEmiCalculator] = useState(false);
  const [showCreditAnalysis, setShowCreditAnalysis] = useState(false);

  const [emiData, setEmiData] = useState({
    principalAmount: "",
    annualInterestRate: "",
    tenureInMonths: ""
  });

  const [emiResult, setEmiResult] = useState(null);
  const [emiError, setEmiError] = useState("");

  const [creditScoreInput, setCreditScoreInput] = useState("");
  const [creditResult, setCreditResult] = useState(null);
  const [creditError, setCreditError] = useState("");

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const loggedInUserId = localStorage.getItem("userId");

      console.log("LOGGED IN USER ID =", loggedInUserId);

      const response = await getLoans();

      const data = Array.isArray(response)
        ? response
        : response?.data
        ? response.data
        : [];

      console.log("ALL LOANS DATA =", data);

      if (!loggedInUserId) {
        console.log("User ID not found in localStorage");
        setLoans([]);
        return;
      }

      const filteredLoans = data.filter(
        (loan) => String(loan.userId) === String(loggedInUserId)
      );

      console.log("FILTERED LOANS =", filteredLoans);

      setLoans(filteredLoans);
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

  const handleEmiChange = (e) => {
    setEmiData({
      ...emiData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.userId) {
        localStorage.setItem("userId", formData.userId);
      }

      await applyLoan(formData);

      alert("Loan Applied Successfully");

      setFormData({
        loanType: "",
        amount: "",
        salary: "",
        creditScore: "",
        userId: ""
      });

      loadLoans();
    } catch (error) {
      console.log(error);
      alert("Error Applying Loan");
    }
  };

  const calculateEMI = (e) => {
    e.preventDefault();

    const principal = parseFloat(emiData.principalAmount);
    const annualRate = parseFloat(emiData.annualInterestRate);
    const tenure = parseInt(emiData.tenureInMonths);

    if (!principal || !annualRate || !tenure) {
      setEmiError("Please enter all EMI calculator details");
      setEmiResult(null);
      return;
    }

    if (principal <= 0 || annualRate <= 0 || tenure <= 0) {
      setEmiError("Loan amount, interest rate and tenure should be greater than 0");
      setEmiResult(null);
      return;
    }

    const monthlyRate = annualRate / 12 / 100;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    setEmiResult({
      monthlyEmi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });

    setEmiError("");
  };

  const resetEmiCalculator = () => {
    setEmiData({
      principalAmount: "",
      annualInterestRate: "",
      tenureInMonths: ""
    });

    setEmiResult(null);
    setEmiError("");
  };

  const analyzeCreditScore = (e) => {
    e.preventDefault();

    const score = parseInt(creditScoreInput);

    if (!score) {
      setCreditError("Please enter credit score");
      setCreditResult(null);
      return;
    }

    if (score < 300 || score > 900) {
      setCreditError("Credit score should be between 300 and 900");
      setCreditResult(null);
      return;
    }

    let category = "";
    let riskLevel = "";
    let eligibility = "";
    let suggestion = "";
    let badgeClass = "";

    if (score >= 750) {
      category = "Excellent";
      riskLevel = "Low Risk";
      eligibility = "High chance of loan approval";
      suggestion = "You may get better loan offers and lower interest rates.";
      badgeClass = "bg-success";
    } else if (score >= 700) {
      category = "Good";
      riskLevel = "Moderate Risk";
      eligibility = "Good chance of loan approval";
      suggestion = "Maintain timely payments to improve your score further.";
      badgeClass = "bg-primary";
    } else if (score >= 650) {
      category = "Fair";
      riskLevel = "Medium Risk";
      eligibility = "Loan approval may depend on salary and other factors";
      suggestion = "Improve your repayment history and avoid delayed payments.";
      badgeClass = "bg-warning text-dark";
    } else if (score >= 600) {
      category = "Average";
      riskLevel = "High Risk";
      eligibility = "Low chance of loan approval";
      suggestion = "Improve credit score before applying for a bigger loan.";
      badgeClass = "bg-danger";
    } else {
      category = "Poor";
      riskLevel = "Very High Risk";
      eligibility = "Very low chance of loan approval";
      suggestion = "Clear pending dues and maintain regular repayment history.";
      badgeClass = "bg-dark";
    }

    setCreditResult({
      score,
      category,
      riskLevel,
      eligibility,
      suggestion,
      badgeClass
    });

    setCreditError("");
  };

  const resetCreditAnalysis = () => {
    setCreditScoreInput("");
    setCreditResult(null);
    setCreditError("");
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
              Loans
            </h2>

            <p
              className="mb-0"
              style={{ color: "#5f6472" }}
            >
              Apply for loans, calculate EMI and analyze your credit score.
            </p>
          </div>

          <div className="mb-4 d-flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowEmiCalculator(!showEmiCalculator)}
              className="btn"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #52b788, #40916c)",
                color: "#ffffff",
                border: "none",
                fontWeight: "500",
                padding: "10px 18px"
              }}
            >
              {showEmiCalculator ? "Hide EMI Calculator" : "EMI Calculator"}
            </button>

            <button
              type="button"
              onClick={() => setShowCreditAnalysis(!showCreditAnalysis)}
              className="btn"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #90e0ef, #48cae4)",
                color: "#023047",
                border: "none",
                fontWeight: "500",
                padding: "10px 18px"
              }}
            >
              {showCreditAnalysis
                ? "Hide Credit Score Analysis"
                : "Credit Score Analysis"}
            </button>
          </div>

          {showEmiCalculator && (
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
                <h4
                  className="fw-bold mb-3"
                  style={{ color: "#2b2d42" }}
                >
                  EMI Calculator
                </h4>

                <form onSubmit={calculateEMI}>
                  <input
                    type="number"
                    name="principalAmount"
                    placeholder="Principal Loan Amount"
                    className="form-control mb-3"
                    value={emiData.principalAmount}
                    onChange={handleEmiChange}
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#fbfbff"
                    }}
                  />

                  <input
                    type="number"
                    name="annualInterestRate"
                    placeholder="Annual Interest Rate (%)"
                    className="form-control mb-3"
                    value={emiData.annualInterestRate}
                    onChange={handleEmiChange}
                    style={{
                      borderRadius: "12px",
                      backgroundColor: "#fbfbff"
                    }}
                  />

                  <input
                    type="number"
                    name="tenureInMonths"
                    placeholder="Tenure in Months"
                    className="form-control mb-3"
                    value={emiData.tenureInMonths}
                    onChange={handleEmiChange}
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
                      background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: "500"
                    }}
                  >
                    Calculate EMI
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetEmiCalculator}
                    style={{
                      borderRadius: "12px"
                    }}
                  >
                    Reset
                  </button>
                </form>

                {emiError && (
                  <p className="text-danger mt-3">
                    {emiError}
                  </p>
                )}

                {emiResult && (
                  <div
                    className="mt-4 p-4"
                    style={{
                      borderRadius: "18px",
                      background:
                        "linear-gradient(135deg, #e0f7fa 0%, #f1f8ff 100%)",
                      border: "1px solid #bde0fe"
                    }}
                  >
                    <h5
                      className="fw-bold"
                      style={{ color: "#2b2d42" }}
                    >
                      EMI Calculation Result
                    </h5>

                    <p>
                      <strong>Monthly EMI:</strong> ₹{emiResult.monthlyEmi}
                    </p>

                    <p>
                      <strong>Total Interest:</strong> ₹{emiResult.totalInterest}
                    </p>

                    <p className="mb-0">
                      <strong>Total Payable Amount:</strong> ₹{emiResult.totalAmount}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {showCreditAnalysis && (
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
                  background: "linear-gradient(135deg, #90e0ef, #48cae4)"
                }}
              ></div>

              <div className="card-body p-4">
                <h4
                  className="fw-bold mb-3"
                  style={{ color: "#2b2d42" }}
                >
                  Credit Score Analysis
                </h4>

                <form onSubmit={analyzeCreditScore}>
                  <input
                    type="number"
                    placeholder="Enter Credit Score"
                    className="form-control mb-3"
                    value={creditScoreInput}
                    onChange={(e) => setCreditScoreInput(e.target.value)}
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
                      background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: "500"
                    }}
                  >
                    Analyze Score
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetCreditAnalysis}
                    style={{
                      borderRadius: "12px"
                    }}
                  >
                    Reset
                  </button>
                </form>

                {creditError && (
                  <p className="text-danger mt-3">
                    {creditError}
                  </p>
                )}

                {creditResult && (
                  <div
                    className="mt-4 p-4"
                    style={{
                      borderRadius: "18px",
                      background:
                        "linear-gradient(135deg, #fff1e6 0%, #fde2e4 100%)",
                      border: "1px solid #f8c6cc"
                    }}
                  >
                    <h5
                      className="fw-bold"
                      style={{ color: "#2b2d42" }}
                    >
                      Credit Score Result
                    </h5>

                    <p>
                      <strong>Credit Score:</strong> {creditResult.score}
                    </p>

                    <p>
                      <strong>Category:</strong>{" "}
                      <span className={`badge ${creditResult.badgeClass}`}>
                        {creditResult.category}
                      </span>
                    </p>

                    <p>
                      <strong>Risk Level:</strong> {creditResult.riskLevel}
                    </p>

                    <p>
                      <strong>Loan Eligibility:</strong> {creditResult.eligibility}
                    </p>

                    <p className="mb-0">
                      <strong>Suggestion:</strong> {creditResult.suggestion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

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
              <h4
                className="fw-bold mb-3"
                style={{ color: "#2b2d42" }}
              >
                Apply Loan
              </h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="loanType"
                  placeholder="Loan Type"
                  className="form-control mb-3"
                  value={formData.loanType}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Loan Amount"
                  className="form-control mb-3"
                  value={formData.amount}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  className="form-control mb-3"
                  value={formData.salary}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="creditScore"
                  placeholder="Credit Score"
                  className="form-control mb-3"
                  value={formData.creditScore}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="number"
                  name="userId"
                  placeholder="User ID"
                  className="form-control mb-3"
                  value={formData.userId}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <button
                  type="submit"
                  className="btn"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500",
                    padding: "10px 18px"
                  }}
                >
                  Apply Loan
                </button>
              </form>
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
                Loan Applications
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
                      <th>Loan Type</th>
                      <th>Amount</th>
                      <th>Salary</th>
                      <th>Credit Score</th>
                      <th>Status</th>
                      <th>User ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan.loanId}>
                        <td>{loan.loanId}</td>
                        <td>{loan.loanType}</td>
                        <td>{loan.amount}</td>
                        <td>{loan.salary}</td>
                        <td>{loan.creditScore}</td>
                        <td>
                          {loan.status === "APPROVED" ? (
                            <span className="badge bg-success">
                              {loan.status}
                            </span>
                          ) : loan.status === "REJECTED" ? (
                            <span className="badge bg-danger">
                              {loan.status}
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              {loan.status}
                            </span>
                          )}
                        </td>
                        <td>{loan.userId}</td>
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

export default Loan;
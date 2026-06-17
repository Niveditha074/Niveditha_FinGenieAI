import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

import {
  getInvestments,
  createInvestment
} from "../services/investmentService";

function Investments() {
  const [investments, setInvestments] = useState([]);

  const [formData, setFormData] = useState({
    fundName: "",
    amount: "",
    riskLevel: "",
    userId: ""
  });

  const [showRiskProfile, setShowRiskProfile] = useState(false);
  const [showFundSuggestions, setShowFundSuggestions] = useState(false);
  const [showSavingsEngine, setShowSavingsEngine] = useState(false);
  const [showPortfolioAnalytics, setShowPortfolioAnalytics] = useState(false);

  const [riskProfileData, setRiskProfileData] = useState({
    age: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    riskPreference: ""
  });

  const [riskProfileResult, setRiskProfileResult] = useState(null);
  const [riskProfileError, setRiskProfileError] = useState("");

  const [fundRiskLevel, setFundRiskLevel] = useState("");
  const [fundSuggestions, setFundSuggestions] = useState([]);

  const [savingsData, setSavingsData] = useState({
    monthlyIncome: "",
    monthlyExpenses: "",
    currentSavings: ""
  });

  const [savingsResult, setSavingsResult] = useState(null);
  const [savingsError, setSavingsError] = useState("");

  const [portfolioResult, setPortfolioResult] = useState(null);

  useEffect(() => {
    loadInvestments();
  }, []);

  const loadInvestments = async () => {
    try {
      const loggedInUserId = localStorage.getItem("userId");

      console.log("LOGGED IN USER ID =", loggedInUserId);

      const response = await getInvestments();

      const data = Array.isArray(response)
        ? response
        : response?.data
        ? response.data
        : [];

      console.log("ALL INVESTMENTS DATA =", data);

      if (!loggedInUserId) {
        console.log("User ID not found in localStorage");
        setInvestments([]);
        return;
      }

      const filteredInvestments = data.filter(
        (investment) => String(investment.userId) === String(loggedInUserId)
      );

      console.log("FILTERED INVESTMENTS =", filteredInvestments);

      setInvestments(filteredInvestments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.userId) {
        localStorage.setItem("userId", formData.userId);
      }

      await createInvestment(formData);

      alert("Investment Added Successfully");

      setFormData({
        fundName: "",
        amount: "",
        riskLevel: "",
        userId: ""
      });

      loadInvestments();
    } catch (error) {
      console.error(error);
      alert("Error Creating Investment");
    }
  };

  const handleRiskProfileChange = (e) => {
    setRiskProfileData({
      ...riskProfileData,
      [e.target.name]: e.target.value
    });
  };

  const analyzeRiskProfile = (e) => {
    e.preventDefault();

    const age = parseInt(riskProfileData.age);
    const income = parseFloat(riskProfileData.monthlyIncome);
    const expenses = parseFloat(riskProfileData.monthlyExpenses);
    const preference = riskProfileData.riskPreference.toLowerCase();

    if (
      !riskProfileData.age ||
      !riskProfileData.monthlyIncome ||
      !riskProfileData.monthlyExpenses ||
      !riskProfileData.riskPreference
    ) {
      setRiskProfileError("Please enter all risk profiling details");
      setRiskProfileResult(null);
      return;
    }

    if (age <= 0 || income <= 0 || expenses < 0) {
      setRiskProfileError("Please enter valid age, income and expenses");
      setRiskProfileResult(null);
      return;
    }

    let score = 0;

    if (age <= 30) {
      score += 30;
    } else if (age <= 45) {
      score += 20;
    } else {
      score += 10;
    }

    const monthlySavings = income - expenses;

    if (monthlySavings >= income * 0.4) {
      score += 30;
    } else if (monthlySavings >= income * 0.2) {
      score += 20;
    } else {
      score += 10;
    }

    if (preference === "high") {
      score += 40;
    } else if (preference === "medium") {
      score += 25;
    } else if (preference === "low") {
      score += 10;
    } else {
      setRiskProfileError("Risk preference should be Low, Medium or High");
      setRiskProfileResult(null);
      return;
    }

    let profile = "";
    let suggestion = "";
    let badgeClass = "";

    if (score >= 75) {
      profile = "Aggressive";
      suggestion =
        "You can consider equity mutual funds, index funds and long-term growth funds.";
      badgeClass = "bg-danger";
    } else if (score >= 45) {
      profile = "Moderate";
      suggestion =
        "You can consider balanced advantage funds, hybrid funds and index funds.";
      badgeClass = "bg-warning text-dark";
    } else {
      profile = "Conservative";
      suggestion =
        "You can consider debt mutual funds, liquid funds and low-risk hybrid funds.";
      badgeClass = "bg-success";
    }

    setRiskProfileResult({
      score,
      profile,
      suggestion,
      badgeClass
    });

    setRiskProfileError("");
  };

  const resetRiskProfile = () => {
    setRiskProfileData({
      age: "",
      monthlyIncome: "",
      monthlyExpenses: "",
      riskPreference: ""
    });

    setRiskProfileResult(null);
    setRiskProfileError("");
  };

  const generateFundSuggestions = (e) => {
    e.preventDefault();

    const risk = fundRiskLevel.toLowerCase();

    if (!fundRiskLevel) {
      setFundSuggestions([
        "Please enter risk level as Low, Medium, High, Conservative, Moderate or Aggressive"
      ]);
      return;
    }

    if (risk === "low" || risk === "conservative") {
      setFundSuggestions([
        "Debt Mutual Funds",
        "Liquid Funds",
        "Short Duration Funds",
        "Low Risk Hybrid Funds"
      ]);
    } else if (risk === "medium" || risk === "moderate") {
      setFundSuggestions([
        "Balanced Advantage Funds",
        "Hybrid Mutual Funds",
        "Index Funds",
        "Large Cap Mutual Funds"
      ]);
    } else if (risk === "high" || risk === "aggressive") {
      setFundSuggestions([
        "Equity Mutual Funds",
        "Small Cap Funds",
        "Mid Cap Funds",
        "Sectoral Funds"
      ]);
    } else {
      setFundSuggestions([
        "Please enter risk level as Low, Medium, High, Conservative, Moderate or Aggressive"
      ]);
    }
  };

  const resetFundSuggestions = () => {
    setFundRiskLevel("");
    setFundSuggestions([]);
  };

  const handleSavingsChange = (e) => {
    setSavingsData({
      ...savingsData,
      [e.target.name]: e.target.value
    });
  };

  const calculateSavingsRecommendation = (e) => {
    e.preventDefault();

    const income = parseFloat(savingsData.monthlyIncome);
    const expenses = parseFloat(savingsData.monthlyExpenses);
    const currentSavings = parseFloat(savingsData.currentSavings);

    if (
      !savingsData.monthlyIncome ||
      !savingsData.monthlyExpenses ||
      !savingsData.currentSavings
    ) {
      setSavingsError("Please enter all savings details");
      setSavingsResult(null);
      return;
    }

    if (income <= 0 || expenses < 0 || currentSavings < 0) {
      setSavingsError("Please enter valid savings details");
      setSavingsResult(null);
      return;
    }

    const availableSavings = income - expenses;
    const emergencyFund = expenses * 3;

    if (availableSavings <= 0) {
      setSavingsResult({
        availableSavings,
        recommendedSip: 0,
        emergencyFund,
        status: "Needs Improvement",
        suggestion:
          "Your expenses are equal to or more than your income. Try reducing expenses before investing."
      });

      setSavingsError("");
      return;
    }

    const recommendedSip = availableSavings * 0.5;

    let status = "";
    let suggestion = "";

    if (currentSavings >= emergencyFund) {
      status = "Good";
      suggestion =
        "Your emergency savings are good. You can start or increase monthly SIP investments.";
    } else {
      status = "Improve Savings";
      suggestion =
        "Build an emergency fund first, then invest regularly through SIP.";
    }

    setSavingsResult({
      availableSavings,
      recommendedSip,
      emergencyFund,
      status,
      suggestion
    });

    setSavingsError("");
  };

  const resetSavingsRecommendation = () => {
    setSavingsData({
      monthlyIncome: "",
      monthlyExpenses: "",
      currentSavings: ""
    });

    setSavingsResult(null);
    setSavingsError("");
  };

  const calculatePortfolioAnalytics = () => {
    if (!investments || investments.length === 0) {
      setPortfolioResult({
        totalAmount: 0,
        totalInvestments: 0,
        lowRiskCount: 0,
        mediumRiskCount: 0,
        highRiskCount: 0,
        portfolioStatus: "No Portfolio Data",
        suggestion: "Please add investments to view portfolio analytics."
      });
      return;
    }

    let totalAmount = 0;
    let lowRiskCount = 0;
    let mediumRiskCount = 0;
    let highRiskCount = 0;

    investments.forEach((investment) => {
      totalAmount += Number(investment.amount) || 0;

      const risk = investment.riskLevel
        ? investment.riskLevel.toLowerCase()
        : "";

      if (risk === "low") {
        lowRiskCount++;
      } else if (risk === "medium" || risk === "moderate") {
        mediumRiskCount++;
      } else if (risk === "high") {
        highRiskCount++;
      }
    });

    let portfolioStatus = "";
    let suggestion = "";

    if (highRiskCount > mediumRiskCount && highRiskCount > lowRiskCount) {
      portfolioStatus = "High Risk Portfolio";
      suggestion =
        "Your portfolio has more high-risk investments. Add some low or medium risk funds for balance.";
    } else if (lowRiskCount > mediumRiskCount && lowRiskCount > highRiskCount) {
      portfolioStatus = "Safe Portfolio";
      suggestion =
        "Your portfolio is mostly low risk. You can add moderate funds for better growth.";
    } else if (
      mediumRiskCount >= lowRiskCount &&
      mediumRiskCount >= highRiskCount
    ) {
      portfolioStatus = "Moderate Portfolio";
      suggestion =
        "Your portfolio has moderate risk. Continue diversifying across fund types.";
    } else {
      portfolioStatus = "Balanced Portfolio";
      suggestion =
        "Your portfolio has mixed risk levels. Continue maintaining diversification.";
    }

    setPortfolioResult({
      totalAmount,
      totalInvestments: investments.length,
      lowRiskCount,
      mediumRiskCount,
      highRiskCount,
      portfolioStatus,
      suggestion
    });
  };

  const resetPortfolioAnalytics = () => {
    setPortfolioResult(null);
  };

  const getRiskBadgeClass = (riskLevel) => {
    const risk = riskLevel ? riskLevel.toLowerCase() : "";

    if (risk === "high") {
      return "bg-danger";
    }

    if (risk === "medium" || risk === "moderate") {
      return "bg-warning text-dark";
    }

    if (risk === "low") {
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
            <h2 className="fw-bold mb-1" style={{ color: "#2b2d42" }}>
              Investments
            </h2>

            <p className="mb-0" style={{ color: "#5f6472" }}>
              Manage investments and use AI-powered investment advisor tools.
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
              <h4 className="fw-bold mb-3" style={{ color: "#2b2d42" }}>
                Create Investment
              </h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fundName"
                  placeholder="Fund Name"
                  className="form-control mb-3"
                  value={formData.fundName}
                  onChange={handleChange}
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
                  value={formData.amount}
                  onChange={handleChange}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <input
                  type="text"
                  name="riskLevel"
                  placeholder="Risk Level"
                  className="form-control mb-3"
                  value={formData.riskLevel}
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
                  Create Investment
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
              <h3 className="fw-bold mb-2" style={{ color: "#2b2d42" }}>
                AI Investment Advisor
              </h3>

              <p className="mb-4" style={{ color: "#5f6472" }}>
                Analyze risk, get fund suggestions, plan savings and review portfolio performance.
              </p>

              <div className="mb-3 d-flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowRiskProfile(!showRiskProfile)}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #52b788, #40916c)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500"
                  }}
                >
                  {showRiskProfile ? "Hide Risk Profiling" : "Risk Profiling"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowFundSuggestions(!showFundSuggestions)}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #90e0ef, #48cae4)",
                    color: "#023047",
                    border: "none",
                    fontWeight: "500"
                  }}
                >
                  {showFundSuggestions
                    ? "Hide Mutual Fund Suggestions"
                    : "Mutual Fund Suggestions"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowSavingsEngine(!showSavingsEngine)}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ffd166, #f4a261)",
                    color: "#2b2d42",
                    border: "none",
                    fontWeight: "500"
                  }}
                >
                  {showSavingsEngine
                    ? "Hide Savings Recommendation Engine"
                    : "Savings Recommendation Engine"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setShowPortfolioAnalytics(!showPortfolioAnalytics);
                    calculatePortfolioAnalytics();
                  }}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #6c757d, #343a40)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500"
                  }}
                >
                  {showPortfolioAnalytics
                    ? "Hide Portfolio Analytics"
                    : "Portfolio Analytics"}
                </button>
              </div>

              {showRiskProfile && (
                <div
                  className="mt-4 p-4"
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#f0fff4",
                    border: "1px solid #c7f9cc"
                  }}
                >
                  <h4 className="fw-bold mb-3" style={{ color: "#2b2d42" }}>
                    Risk Profiling
                  </h4>

                  <form onSubmit={analyzeRiskProfile}>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      className="form-control mb-3"
                      value={riskProfileData.age}
                      onChange={handleRiskProfileChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="number"
                      name="monthlyIncome"
                      placeholder="Monthly Income"
                      className="form-control mb-3"
                      value={riskProfileData.monthlyIncome}
                      onChange={handleRiskProfileChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="number"
                      name="monthlyExpenses"
                      placeholder="Monthly Expenses"
                      className="form-control mb-3"
                      value={riskProfileData.monthlyExpenses}
                      onChange={handleRiskProfileChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="text"
                      name="riskPreference"
                      placeholder="Risk Preference: Low / Medium / High"
                      className="form-control mb-3"
                      value={riskProfileData.riskPreference}
                      onChange={handleRiskProfileChange}
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
                      Analyze Risk Profile
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetRiskProfile}
                      style={{
                        borderRadius: "12px"
                      }}
                    >
                      Reset
                    </button>
                  </form>

                  {riskProfileError && (
                    <p className="text-danger mt-3">
                      {riskProfileError}
                    </p>
                  )}

                  {riskProfileResult && (
                    <div
                      className="mt-4 p-4"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #b7e4c7"
                      }}
                    >
                      <h5 className="fw-bold" style={{ color: "#2b2d42" }}>
                        Risk Profile Result
                      </h5>

                      <p>
                        <strong>Risk Score:</strong>{" "}
                        {riskProfileResult.score}/100
                      </p>

                      <p>
                        <strong>Risk Profile:</strong>{" "}
                        <span className={`badge ${riskProfileResult.badgeClass}`}>
                          {riskProfileResult.profile}
                        </span>
                      </p>

                      <p className="mb-0">
                        <strong>Suggestion:</strong>{" "}
                        {riskProfileResult.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {showFundSuggestions && (
                <div
                  className="mt-4 p-4"
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#e0f7fa",
                    border: "1px solid #90e0ef"
                  }}
                >
                  <h4 className="fw-bold mb-3" style={{ color: "#2b2d42" }}>
                    Mutual Fund Suggestions
                  </h4>

                  <form onSubmit={generateFundSuggestions}>
                    <input
                      type="text"
                      placeholder="Enter Risk Level: Low / Medium / High"
                      className="form-control mb-3"
                      value={fundRiskLevel}
                      onChange={(e) => setFundRiskLevel(e.target.value)}
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
                      Get Suggestions
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetFundSuggestions}
                      style={{
                        borderRadius: "12px"
                      }}
                    >
                      Reset
                    </button>
                  </form>

                  {fundSuggestions.length > 0 && (
                    <div
                      className="mt-4 p-4"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #90e0ef"
                      }}
                    >
                      <h5 className="fw-bold" style={{ color: "#2b2d42" }}>
                        Suggested Mutual Funds
                      </h5>

                      <ul className="mb-0">
                        {fundSuggestions.map((fund, index) => (
                          <li key={index}>{fund}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {showSavingsEngine && (
                <div
                  className="mt-4 p-4"
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#fffaf0",
                    border: "1px solid #ffe5b4"
                  }}
                >
                  <h4 className="fw-bold mb-3" style={{ color: "#2b2d42" }}>
                    Savings Recommendation Engine
                  </h4>

                  <form onSubmit={calculateSavingsRecommendation}>
                    <input
                      type="number"
                      name="monthlyIncome"
                      placeholder="Monthly Income"
                      className="form-control mb-3"
                      value={savingsData.monthlyIncome}
                      onChange={handleSavingsChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="number"
                      name="monthlyExpenses"
                      placeholder="Monthly Expenses"
                      className="form-control mb-3"
                      value={savingsData.monthlyExpenses}
                      onChange={handleSavingsChange}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: "#fbfbff"
                      }}
                    />

                    <input
                      type="number"
                      name="currentSavings"
                      placeholder="Current Savings"
                      className="form-control mb-3"
                      value={savingsData.currentSavings}
                      onChange={handleSavingsChange}
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
                      Generate Savings Recommendation
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetSavingsRecommendation}
                      style={{
                        borderRadius: "12px"
                      }}
                    >
                      Reset
                    </button>
                  </form>

                  {savingsError && (
                    <p className="text-danger mt-3">
                      {savingsError}
                    </p>
                  )}

                  {savingsResult && (
                    <div
                      className="mt-4 p-4"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #f1dca7"
                      }}
                    >
                      <h5 className="fw-bold" style={{ color: "#2b2d42" }}>
                        Savings Recommendation Result
                      </h5>

                      <p>
                        <strong>Available Monthly Savings:</strong> ₹
                        {savingsResult.availableSavings}
                      </p>

                      <p>
                        <strong>Recommended Monthly SIP:</strong> ₹
                        {savingsResult.recommendedSip}
                      </p>

                      <p>
                        <strong>Emergency Fund Needed:</strong> ₹
                        {savingsResult.emergencyFund}
                      </p>

                      <p>
                        <strong>Savings Status:</strong>{" "}
                        {savingsResult.status}
                      </p>

                      <p className="mb-0">
                        <strong>Suggestion:</strong>{" "}
                        {savingsResult.suggestion}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {showPortfolioAnalytics && (
                <div
                  className="mt-4 p-4"
                  style={{
                    borderRadius: "18px",
                    backgroundColor: "#f3e8ff",
                    border: "1px solid #cdb4db"
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4
                      className="fw-bold mb-0"
                      style={{ color: "#2b2d42" }}
                    >
                      Portfolio Analytics
                    </h4>

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetPortfolioAnalytics}
                      style={{
                        borderRadius: "12px"
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  {portfolioResult ? (
                    <div
                      className="p-4"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #cdb4db"
                      }}
                    >
                      <h5 className="fw-bold" style={{ color: "#2b2d42" }}>
                        Simple Portfolio Summary
                      </h5>

                      <p>
                        <strong>Total Investment Amount:</strong> ₹
                        {portfolioResult.totalAmount}
                      </p>

                      <p>
                        <strong>Total Number of Investments:</strong>{" "}
                        {portfolioResult.totalInvestments}
                      </p>

                      <p>
                        <strong>Low Risk Investments:</strong>{" "}
                        {portfolioResult.lowRiskCount}
                      </p>

                      <p>
                        <strong>Medium Risk Investments:</strong>{" "}
                        {portfolioResult.mediumRiskCount}
                      </p>

                      <p>
                        <strong>High Risk Investments:</strong>{" "}
                        {portfolioResult.highRiskCount}
                      </p>

                      <p>
                        <strong>Portfolio Status:</strong>{" "}
                        {portfolioResult.portfolioStatus}
                      </p>

                      <p className="mb-0">
                        <strong>Suggestion:</strong>{" "}
                        {portfolioResult.suggestion}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="p-4 text-center"
                      style={{
                        borderRadius: "18px",
                        background: "#ffffff",
                        border: "1px solid #cdb4db"
                      }}
                    >
                      <p className="mb-0 text-muted">
                        Portfolio analytics result has been reset. Click Portfolio Analytics again to generate summary.
                      </p>
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
              <h4 className="fw-bold mb-3" style={{ color: "#2b2d42" }}>
                Investment Records
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
                      <th>Fund Name</th>
                      <th>Amount</th>
                      <th>Risk Level</th>
                      <th>User ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {investments.map((investment) => (
                      <tr key={investment.investmentId}>
                        <td>{investment.investmentId}</td>
                        <td>{investment.fundName}</td>
                        <td>{investment.amount}</td>
                        <td>
                          <span
                            className={`badge ${getRiskBadgeClass(
                              investment.riskLevel
                            )}`}
                          >
                            {investment.riskLevel}
                          </span>
                        </td>
                        <td>{investment.userId}</td>
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

export default Investments;
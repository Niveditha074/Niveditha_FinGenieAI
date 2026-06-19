import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showOtpSection, setShowOtpSection] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [tempUserId, setTempUserId] = useState("");
  const [tempRole, setTempRole] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      console.log("USER LOGIN RESPONSE =", response);

      const token =
        typeof response === "string"
          ? response
          : response.token;

      const userId =
        typeof response === "object" && response !== null
          ? response.userId
          : "";

      const role =
        typeof response === "object" && response !== null
          ? response.role
          : "";

      if (!token) {
        alert("Login failed: token not received from backend");
        return;
      }

      const otp = generateOtp();

      setGeneratedOtp(otp);
      setTempToken(token);
      setTempUserId(userId || "");
      setTempRole(role || "USER");
      setShowOtpSection(true);
      setEnteredOtp("");
      setOtpError("");

      alert("Login successful. OTP generated for MFA verification.");
    } catch (error) {
      console.error("LOGIN ERROR =", error);

      if (error.response) {
        console.log("ERROR STATUS =", error.response.status);
        console.log("ERROR DATA =", error.response.data);
      }

      alert("Login Failed");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!enteredOtp) {
      setOtpError("Please enter OTP");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setOtpError("Invalid OTP. Please enter correct OTP.");
      return;
    }

    localStorage.setItem("token", tempToken);

    if (tempUserId) {
      localStorage.setItem("userId", tempUserId);
    }

    if (tempRole) {
      localStorage.setItem("role", tempRole);
    } else {
      localStorage.setItem("role", "USER");
    }

    alert("OTP Verified Successfully");

    navigate("/dashboard");
  };

  const handleResendOtp = () => {
    const newOtp = generateOtp();

    setGeneratedOtp(newOtp);
    setEnteredOtp("");
    setOtpError("");

    alert("New OTP generated");
  };

  const handleBackToLogin = () => {
    setShowOtpSection(false);
    setGeneratedOtp("");
    setEnteredOtp("");
    setTempToken("");
    setTempUserId("");
    setTempRole("");
    setOtpError("");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #f7b2bd 0%, #cdb4db 30%, #a2d2ff 65%, #bde0fe 100%)",
        padding: "30px"
      }}
    >
      <div
        className="card border-0"
        style={{
          width: "100%",
          maxWidth: "540px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 20px 50px rgba(72, 61, 139, 0.28)"
        }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "78px",
                height: "78px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ffafcc, #a2d2ff)",
                fontSize: "36px",
                boxShadow: "0 10px 24px rgba(123, 44, 191, 0.25)"
              }}
            >
              🏦
            </div>

            <h2
              className="fw-bold mb-1"
              style={{
                color: "#2b2d42"
              }}
            >
              FinGenie Login
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Login to access your banking dashboard
            </p>
          </div>

          {!showOtpSection && (
            <>
              <form onSubmit={handleSubmit}>
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#3d405b" }}
                >
                  Email Address
                </label>

                <input
                  className="form-control mb-3 py-2"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #c9c9dd",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <label
                  className="form-label fw-semibold"
                  style={{ color: "#3d405b" }}
                >
                  Password
                </label>

                <input
                  className="form-control mb-3 py-2"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #c9c9dd",
                    backgroundColor: "#fbfbff"
                  }}
                />

                <button
                  className="btn w-100 py-2 fw-semibold"
                  type="submit"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                    border: "none",
                    color: "#ffffff",
                    boxShadow: "0 10px 22px rgba(78, 168, 222, 0.35)"
                  }}
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted">
                  New User?{" "}
                </span>

                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none"
                  style={{
                    color: "#7b2cbf"
                  }}
                >
                  Register
                </Link>
              </div>

              <div className="text-center mt-3">
                <Link
                  to="/admin-login"
                  className="btn w-100 py-2 fw-semibold"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ffafcc, #f28482)",
                    color: "#ffffff",
                    border: "none",
                    boxShadow: "0 10px 22px rgba(242, 132, 130, 0.35)"
                  }}
                >
                  Admin Login
                </Link>
              </div>
            </>
          )}

          {showOtpSection && (
            <div className="mt-3">
              <div className="text-center mb-3">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "66px",
                    height: "66px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #80ed99, #48cae4)",
                    fontSize: "32px",
                    boxShadow: "0 10px 22px rgba(72, 202, 228, 0.35)"
                  }}
                >
                  🔐
                </div>

                <h4
                  className="fw-bold"
                  style={{
                    color: "#2b2d42"
                  }}
                >
                  MFA OTP Verification
                </h4>

                <p className="text-muted">
                  Enter the OTP to continue to your dashboard
                </p>
              </div>

              <div
                className="alert text-center"
                style={{
                  backgroundColor: "#caf0f8",
                  border: "1px solid #90e0ef",
                  color: "#023e8a",
                  borderRadius: "14px"
                }}
              >
                <strong>Demo OTP:</strong> {generatedOtp}
              </div>

              <form onSubmit={handleVerifyOtp}>
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#3d405b" }}
                >
                  Enter OTP
                </label>

                <input
                  className="form-control mb-3 py-2 text-center"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  required
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #c9c9dd",
                    backgroundColor: "#fbfbff"
                  }}
                />

                {otpError && (
                  <p className="text-danger">
                    {otpError}
                  </p>
                )}

                <button
                  className="btn w-100 mb-2 py-2 fw-semibold"
                  type="submit"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #52b788, #40916c)",
                    border: "none",
                    color: "#ffffff"
                  }}
                >
                  Verify OTP
                </button>

                <button
                  className="btn w-100 mb-2 py-2"
                  type="button"
                  onClick={handleResendOtp}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#f1f3f5",
                    border: "1px solid #ced4da",
                    color: "#495057"
                  }}
                >
                  Resend OTP
                </button>

                <button
                  className="btn w-100 py-2"
                  type="button"
                  onClick={handleBackToLogin}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #5e60ce",
                    color: "#5e60ce"
                  }}
                >
                  Back to Login
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
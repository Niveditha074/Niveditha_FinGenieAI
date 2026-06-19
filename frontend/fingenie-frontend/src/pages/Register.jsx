import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "USER"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData);

    try {
      await registerUser(formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      alert("Registration Failed");
    }
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
          maxWidth: "620px",
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
                background: "linear-gradient(135deg, #b9fbc0, #a2d2ff)",
                fontSize: "36px",
                boxShadow: "0 10px 24px rgba(82, 183, 136, 0.25)"
              }}
            >
              📝
            </div>

            <h2
              className="fw-bold mb-1"
              style={{
                color: "#2b2d42"
              }}
            >
              FinGenie Register
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Create your account to access FinGenie banking services
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              className="form-label fw-semibold"
              style={{ color: "#3d405b" }}
            >
              Full Name
            </label>

            <input
              className="form-control mb-3 py-2"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
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

            <label
              className="form-label fw-semibold"
              style={{ color: "#3d405b" }}
            >
              Phone Number
            </label>

            <input
              className="form-control mb-3 py-2"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
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
              Role
            </label>

            <select
              className="form-control mb-4 py-2"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                borderRadius: "12px",
                border: "1px solid #c9c9dd",
                backgroundColor: "#fbfbff"
              }}
            >
              <option value="USER">
                USER
              </option>

              <option value="ADMIN">
                ADMIN
              </option>
            </select>

            <button
              className="btn w-100 py-2 fw-semibold"
              type="submit"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #52b788, #40916c)",
                border: "none",
                color: "#ffffff",
                boxShadow: "0 10px 22px rgba(82, 183, 136, 0.35)"
              }}
            >
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">
              Already have an account?{" "}
            </span>

            <Link
              to="/"
              className="fw-semibold text-decoration-none"
              style={{
                color: "#5e60ce"
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

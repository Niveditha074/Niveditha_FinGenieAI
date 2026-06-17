import BackButton from "../components/BackButton";import Back, { useState } from "react";

function ChatAssistant() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {
    const msg = message.toLowerCase();

    let reply = "";

    if (msg.includes("account")) {
      reply =
        "Accounts Module helps create and manage bank accounts.";
    } else if (msg.includes("transaction")) {
      reply =
        "Transactions Module helps perform deposits and withdrawals.";
    } else if (msg.includes("loan")) {
      reply =
        "Loans Module helps users apply for loans and track loan status.";
    } else if (msg.includes("investment")) {
      reply =
        "Investments Module helps users manage investment portfolios.";
    } else if (msg.includes("fraud")) {
      reply =
        "Fraud Alerts are automatically generated for large transactions above ₹50,000.";
    } else {
      reply =
        "Please ask about Accounts, Transactions, Loans, Investments or Fraud Alerts.";
    }

    setResponse(reply);
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
              FinGenie Chat Assistant
            </h2>

            <p
              className="mb-0"
              style={{
                color: "#5f6472"
              }}
            >
              Ask banking-related questions about accounts, transactions, loans,
              investments and fraud alerts.
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
              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #cdb4db, #a2d2ff)",
                    fontSize: "34px",
                    boxShadow: "0 10px 24px rgba(123, 44, 191, 0.18)"
                  }}
                >
                  🤖
                </div>

                <h4
                  className="fw-bold mb-1"
                  style={{
                    color: "#2b2d42"
                  }}
                >
                  Smart Banking Assistant
                </h4>

                <p
                  className="mb-0"
                  style={{
                    color: "#6c757d"
                  }}
                >
                  Type your question below and get instant help.
                </p>
              </div>

              <div
                className="p-4 mb-4"
                style={{
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #e0f7fa 0%, #f1f8ff 100%)",
                  border: "1px solid #bde0fe"
                }}
              >
                <label
                  className="form-label fw-semibold"
                  style={{
                    color: "#2b2d42"
                  }}
                >
                  Your Question
                </label>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Ask a question..."
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  style={{
                    borderRadius: "12px",
                    backgroundColor: "#fbfbff",
                    padding: "10px 14px"
                  }}
                />

                <button
                  className="btn w-100"
                  onClick={handleSend}
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #5e60ce, #4ea8de)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: "500",
                    padding: "10px"
                  }}
                >
                  Send
                </button>
              </div>

              <div
                className="p-4"
                style={{
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #fff1e6 0%, #fde2e4 100%)",
                  border: "1px solid #f8c6cc"
                }}
              >
                <h5
                  className="fw-bold mb-3"
                  style={{
                    color: "#2b2d42"
                  }}
                >
                  Response
                </h5>

                <div
                  className="p-3"
                  style={{
                    minHeight: "55px",
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1d3d8",
                    color: "#343a40"
                  }}
                >
                  {response ? (
                    <span>{response}</span>
                  ) : (
                    <span className="text-muted">
                      Your assistant response will appear here.
                    </span>
                  )}
                </div>
              </div>

              <div
                className="mt-4 p-3"
                style={{
                  borderRadius: "16px",
                  background: "#f3e8ff",
                  border: "1px solid #cdb4db"
                }}
              >
                <p
                  className="mb-0"
                  style={{
                    color: "#5f6472"
                  }}
                >
                  <strong>Try asking:</strong> account, transaction, loan,
                  investment or fraud related questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAssistant;

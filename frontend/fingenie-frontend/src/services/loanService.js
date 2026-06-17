import api from "./api";

export const getLoans = async () => {
  const response = await api.get("/loans");
  return response.data;
};

export const applyLoan = async (loanData) => {
  const response = await api.post(
    "/loans/apply",
    loanData
  );
  return response.data;
};
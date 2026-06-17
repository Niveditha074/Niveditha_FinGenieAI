import api from "./api";
 
export const getInvestments = () =>
  api.get("/investments");
 
export const createInvestment = (data) =>
  api.post("/investments", data);
 
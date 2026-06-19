import api from "./api";
 
export const getFraudAlerts = () =>
  api.get("fraud");
 
export const createFraudAlert = (data) =>
  api.post("fraud", data);
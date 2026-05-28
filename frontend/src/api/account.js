import { api } from "./client";

export const getAccounts = () => api("/accounts");
export const getTransactions = () => api("/transactions");
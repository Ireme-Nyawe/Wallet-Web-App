import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";

export const addMoneyToAccount = async (data) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/transaction-in/create",data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewTransactionsInWithinRange = async () => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/transaction-in/transactions-in-range");
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewTransactionsIn = async () => {
    try {
      const response = await axiosInstance.get("/wallet-app-api/transaction-in/");
      return response.data;
    } catch (error) {
      const handledError = handleError(error);
      return handledError;
    }
  };

export const addTransactionOut = async (data) => {
    try {
      const response = await axiosInstance.post("/wallet-app-api/transaction-out/create",data);
      return response.data;
    } catch (error) {
      const handledError = handleError(error);
      return handledError;
    }
  };
  export const viewTransactionsOutWithinRange = async () => {
    try {
      const response = await axiosInstance.post("/wallet-app-api/transaction-out/transactions-by-date-range");
      return response.data;
    } catch (error) {
      const handledError = handleError(error);
      return handledError;
    }
  };
  
  export const viewTransactionsOut = async () => {
    try {
      const response = await axiosInstance.get("/wallet-app-api/transaction-out/");
      return response.data;
    } catch (error) {
      const handledError = handleError(error);
      return handledError;
    }
  };
  
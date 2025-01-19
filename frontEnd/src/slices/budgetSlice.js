import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";

export const createPeriodBudget = async (from, to, total, balance) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/budget/", {
      from,
      to,
      total,
      balance,
    });
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewBudgets = async () => {
  try {
    const response = await axiosInstance.get("/wallet-app-api/budget/");
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};

import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";

export const createPeriodBudget = async (data) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/budget/",data);
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
export const updateBudget = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/wallet-app-api/budget/${id}`,data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewSingleBudget = async (id) => {
  try {
    const response = await axiosInstance.get(`/wallet-app-api/budget/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const deleteBudget = async (id) => {
  try {
    const response = await axiosInstance.delete(`/wallet-app-api/budget/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
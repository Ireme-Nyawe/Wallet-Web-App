import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";

export const addExpenseCategory = async (data) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/category/",data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewCategories = async () => {
  try {
    const response = await axiosInstance.get("/wallet-app-api/category/");
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const updateCategory = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/wallet-app-api/category/${id}`,data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewSingleCategory = async (id) => {
  try {
    const response = await axiosInstance.get(`/wallet-app-api/category/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/wallet-app-api/category/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
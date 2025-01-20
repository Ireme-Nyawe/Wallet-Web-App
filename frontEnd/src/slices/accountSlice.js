import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";

export const addUsableAccount = async (data) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/account/",data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewAccounts = async () => {
  try {
    const response = await axiosInstance.get("/wallet-app-api/account/");
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const updateAccount = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/wallet-app-api/account/${id}`,data);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const viewSingleAccount = async (id) => {
  try {
    const response = await axiosInstance.get(`/wallet-app-api/account/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
export const deleteAccount = async (id) => {
  try {
    const response = await axiosInstance.delete(`/wallet-app-api/account/${id}`);
    return response.data;
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
};
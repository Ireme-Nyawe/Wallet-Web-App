import axiosInstance from "../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
import { handleError } from ".";



export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/wallet-app-api/user/login", {
      email,
      password
    })
    return response.data
  } catch (error) {
    const handledError = handleError(error);
    return handledError;
  }
}
export const userViewProfile = async () => {
  try {
      const response = await axiosInstance.get("/wallet-app-api/user/profile");
      return response.data
  } catch (error) {
      const handledError = handleError(error);
      return handledError
  }
}
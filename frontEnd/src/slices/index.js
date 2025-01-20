export const handleError = (error) => {
  if (error.response) {
    const message =
      error.response.data.message ||
      error.response.data.error ||
      "Something went wrong. Please try again.";
    return {
      status: error.response.status,
      message,
    };
  }
  return {
    status: 500,
    message: error.message || "Unexpected error occurred. Please try again.",
  };
};

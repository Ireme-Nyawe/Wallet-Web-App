export const handleError = (error) => {
    if (error.response) {
      return {
        status: error.response.status,
        message:
          error.response.data.message ||
          "Something went wrong. Please try again.",
      };
    }
    return {
      status: 500,
      message: error.message || "Unexpected error occurred. Please try again.",
    };
  };
  
  
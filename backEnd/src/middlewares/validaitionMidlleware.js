import httpStatus from "http-status";

export const bodyValidation = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      throw new Error(
        error.details
          .map((detail) => detail.message.replace(/"/g, ""))
          .join(", ")
      );
    }
    return next();
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: httpStatus.BAD_REQUEST, message: error.message });
  }
};

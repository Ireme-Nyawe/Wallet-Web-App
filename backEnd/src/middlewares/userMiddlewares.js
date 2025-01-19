import { comparePassword } from "../helper/userHelper.js";
import userRepository from "../modules/user/repository/userRepository.js";

export const isUserExistByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userRepository.findUserByEmail(email);

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const isPassworValid = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userPassword = req.user.password;

    if (!(await comparePassword(password, userPassword))) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect password!",
      });
    }

    return next();
  } catch (error) {
    console.error("Error validating password:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const isUserExistById = async (req, res, next) => {
    try {
      const user = await userRepository.findUserById(req.user._id);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: httpStatus.NOT_FOUND,
          message: "User not found!",
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  };
  export const isUserExist = async (req, res, next) => {
    try {
      const user = await userRepository.findUserById(req.params.userId);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          status: httpStatus.NOT_FOUND,
          message: "User not found!",
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  };

import httpStatus from "http-status";
import { decodeToken } from "../helper/userHelper.js";
import userRepository from "../modules/user/repository/userRepository.js";


export const isUserAuthorized = async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      
      if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          status: httpStatus.UNAUTHORIZED,
          message: "No token provided",
        });
      }
      
      const decoded = await decodeToken(token);
      const session = await userRepository.findSessionByToken(
        token
      );
      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          status: httpStatus.UNAUTHORIZED,
          message: "Session expired !",
        });
      }
      const user = await userRepository.findUserById(decoded.id);
      
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          status: httpStatus.UNAUTHORIZED,
          message: "User not found!",
        });
      }
     
      req.user = user;
      req.session = session;
      return next();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  };


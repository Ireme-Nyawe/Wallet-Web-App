import userRepository from "../repository/userRepository.js";
import httpStatus from "http-status";
import { generateToken } from "../../../helper/userHelper.js";

const userLogin = async (req, res) => {
  try {
    const userId = req.user._id
    const token = await generateToken(userId);
    const session = await userRepository.saveSession({
      userId: userId,
      content: token,
  })
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: "User logged successful!",
      session
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

export default { userLogin };

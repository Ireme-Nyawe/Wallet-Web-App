import User from "../../../database/models/user.js";
import Session from "../../../database/models/session.js";
const findUserByEmail = (email) => {
  return User.findOne({ email: email });
};
const findUserById = async (userId) => {
    return await User.findById(userId);
  }
const saveSession = (sessionData) => {
  return Session.create(sessionData);
};
const deleteSession = async (_id) => {
  await Session.findByIdAndDelete(_id);
};
const findSessionByToken = async (token) => {
  return Session.findOne({ content: token });
};
export default { findUserByEmail,saveSession,deleteSession,findSessionByToken,findUserById };

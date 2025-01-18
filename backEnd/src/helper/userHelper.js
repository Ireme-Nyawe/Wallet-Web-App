import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const { sign } = jwt;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}
export const comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
  };

  export const generateOTP = (id) => {
    const currentTime = new Date().getTime();
    const randomSeed = Math.random().toString().slice(2, 8);
    const combined = id.toString() + currentTime.toString() + randomSeed;
  
    const hash = Array.from(combined).reduce((acc, char) => {
      return (acc + char.charCodeAt(0)) % 1000000;
    }, 0);
  
    let otp = hash.toString().padStart(6, '0');
  
    while (otp[0] === '0') {
      otp = otp.slice(1) + Math.floor(Math.random() * 9 + 1).toString();
    }
  
    return otp;
  };
  export const generateToken = async (id) => {
    return sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  export const decodeToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
  };
  
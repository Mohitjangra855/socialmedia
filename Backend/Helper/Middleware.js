import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const hashedPasswordFunction = async (password) => {
  return await bcrypt.hash(password, 10);
};
export const comparePasswrodFunction = async (password, hashedPassword) => {
  return await bcrypt.compare(password,hashedPassword);
};

export const jwtTokenFunction = async (_id) => {
  return await jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

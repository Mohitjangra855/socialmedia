import { Users } from "../Models/User.js";
import {
  hashedPasswordFunction,
  comparePasswrodFunction,
  jwtTokenFunction,
} from "../Helper/Middleware.js";
export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      res.status(400).json({ message: "user already exist. plz login" });
    }
    const hashedPassword = await hashedPasswordFunction(password);
    const user = new Users({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const Token = await jwtTokenFunction(user._id);
    res.cookie("token", Token);
    res.status(200).json({ message: "signup successfully", Token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in signup" });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user not found" });
    }
    const checkPassword = await comparePasswrodFunction(
      password,
      userExist.password
    );
    if (!checkPassword) {
      return res.status(400).json({ message: "password not match" });
    }

    const Token = await jwtTokenFunction(userExist._id);
    res.cookie("token", Token);
    res.status(200).json({ message: "login successfully", Token });
  } catch (err) {
    console.log(err);
    res.status(402).json({ err });
  }
};

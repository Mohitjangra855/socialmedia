import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", userSchema);
export { Users };

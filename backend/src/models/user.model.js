import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    code: {
      type: Number,
      require: true,
    },
    codeExpires: {
      type: Date,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["not-verified", "verified"],
      default: "not-verified",
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userModel);

export default User;

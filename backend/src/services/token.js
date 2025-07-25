import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (_id, res) => {
  const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

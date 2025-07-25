import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookie.token;

    if (!token) return res.status(403).json({ message: "Access denied" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) return res.status(401).json({ message: "Access denied" });

    const user = User.findById(decode._id).select("-password");

    if (!user) return res.status(400).json({ message: "User not exist" });

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectedRoute", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

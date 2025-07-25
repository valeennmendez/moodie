import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/token.js";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if ((!name, !email, !password)) {
      return res.status(400).json({ error: "Is necesary all camps." });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist)
      return res.status(400).json({ error: "The email is already used" });

    const hashSalt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, hashSalt);

    const newUser = new User({
      name: name,
      email: email,
      password: passwordHashed,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res
        .status(201)
        .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
    } else {
      console.log("Error creating new user.");
      return res.status(400).json({ error: "Error creating new user." });
    }
  } catch (error) {
    console.log("Error in sigupController: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ error: "All fields are required!" });

    const userLogin = await User.findOne({ email });
    const compareHash = await bcrypt.compare(password, userLogin.password);

    if (!compareHash)
      return res.status(400).json({ error: "Incorrect password" });

    generateToken(userLogin._id, res);
    return res.status(200).json({ message: "Logged account!" });
  } catch (error) {
    console.log("Error in loginController");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out account!" });
  } catch (error) {
    console.log("Error in logoutController");
    return res.status(500).json({ message: "Internal server error" });
  }
};

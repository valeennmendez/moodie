import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/token.js";
import { sendEmailCode } from "../utils/sendEmailCode.js";
import { randomCode } from "../utils/random-code.js";

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if ((!name, !email, !password)) {
      return res
        .status(400)
        .json({ error: "Is necesary all camps.", code: "MISSING_FIELDS" });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist)
      return res.status(400).json({
        error: "The email is already used",
        code: "EMAIL_ALREADY_REGISTERED",
      });

    const hashSalt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, hashSalt);

    const code = randomCode();

    const newUser = new User({
      name: name,
      email: email,
      password: passwordHashed,
      code: code,
      codeExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    if (!newUser) {
      return res.status(400).json({
        error: "Error creating new user",
        code: "USER_CREATION_FAILED",
      });
    }

    const resEmail = sendEmailCode(code, newUser);

    if (!resEmail) {
      return res
        .status(400)
        .json({ error: "Email not send", code: "EMAIL_SEND_FAILED" });
    }

    await newUser.save();

    res
      .status(200)
      .json({ message: "Email verification send.", user: newUser });
  } catch (error) {
    console.log("Error in sigupController: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "All fields are required!", code: "MISSING_FIELDS" });

    const userLogin = await User.findOne({ email });
    const compareHash = await bcrypt.compare(password, userLogin.password);

    if (!compareHash)
      return res
        .status(400)
        .json({ error: "Incorrect password", code: "INCORRECT_PASSWORD" });

    if (userLogin.status === "not-verified") {
      return res.status(400).json({
        error: "The account has not been activated.",
        code: "ACCOUNT_NOT_VERIFIED",
      });
    }

    generateToken(userLogin._id, res);
    return res.status(200).json({ message: "Logged account!" });
  } catch (error) {
    console.log("Error in loginController: ", error);
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

export const verificationController = async (req, res) => {
  const { email, codeInput } = req.body;

  try {
    console.log(email, codeInput);

    if (!email || !codeInput) {
      return res
        .status(400)
        .json({ error: "All filds are required.", code: "MISSING_FIELDS" });
    }

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ error: "User not found.", code: "USER_NOT_FOUND" });

    const code = user.code;
    const codeExpiration = user.codeExpiration;
    const timeNow = Date.now();

    if (codeExpiration < timeNow) {
      return res
        .status(400)
        .json({ error: "The code expired", code: "CODE_EXPIRED" });
    }

    if (codeInput !== code) {
      return res.status(400).json({
        error: "The code entered does not match",
        code: "CODE_NOT_MATCH",
      });
    }

    user.status = "verified";
    user.code = null;
    user.codeExpiration = null;

    await user.save();

    res.status(200).json({ message: "Account verified.", user: user });
  } catch (error) {
    console.log("Error in verificationController: ", error);
    return res.status(500).json({ error: "Error in verificationController" });
  }
};

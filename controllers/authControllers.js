import bcrypt from "bcrypt";
import { createToken } from "../middleware/authMiddleware.js";
import User, { Verification } from "../models/userModel.js";
import { sendVerificationMail } from "../utils/sendVerificationMail.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide name, email and password" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body,
      last_name: name.split(" ")[0],
      first_name: name.split(" ")[1],
      password: password,
      is_active: false, //user will need to confirm thier email b4 this is true
    });

    // send email confirmation to mail... moved this to post save hook for better code performance
    const token = await sendVerificationMail(user);
    res.status(201).json({
      ...token,
      msg: "user created, check mail for email confirmation",
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

export const confirmEmailController = async (req, res) => {
  try {
    const { token } = req.body;
    const { userId } = req.params;
    console.log("user id is:", userId, "\ntoken is:", token);

    // Check for matching verification record
    const record = await Verification.findOne({ userId, code: token });
    console.log("record:", record);
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Activate the user
    await User.findByIdAndUpdate(userId, { is_active: true });

    // Optionally delete the verification record to prevent reuse
    await Verification.deleteOne({ _id: record._id });

    res.status(200).json({ msg: "Token verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Verification failed", error: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "invalid credentials" });
    const compare_pswd = await bcrypt.compare(password, user.password);
    if (!compare_pswd) {
      return res.status(401).json({ msg: "invalid credentials" });
    }

    // generate token
    const token = createToken(user);
    res.status(200).json({ msg: "login successfully", token: token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email does not exist" });
    }

    const token = await sendVerificationMail(user);

    res
      .status(200)
      .json({ ...token, msg: "Check your email for verification code" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred", error: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  console.log("password reset route hit");
  // const { token } = req.params; //email will be more robust as some user's token might not exist or is expired
  const { password } = req.body;
  const { email } = req.params;

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(decoded.id);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "invalid user" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ msg: "password reset successfull" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ err: "token has expired, pls request new reset link" });
    }
    res.status(400).json({ err: "Invalid or expired token" });
  }
};

import User from "../models/userModel";

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

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const { userId } = req.params;

    // Check for matching verification record
    const record = await Verification.findOne({ userId, code: token });

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

export const login = async (req, res) => {
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

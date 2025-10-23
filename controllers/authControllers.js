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

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authMiddleware = (req, res, next) => {
  // steps are
  // check for token in req header
  // check for token validity (expired token)
  // add decoded user from token to req object

  // check for token in req header
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "unauthorized, no token" });

  // check for token validity
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // add decoded user to req object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export default authMiddleware;

// create jwt token
export const createToken = (user, is_password_reset_token = 0) => {
  if (is_password_reset_token) {
    console.log("create token for pswd reset called");
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: `${is_password_reset_token}m` }
    );
  }

  // else block
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET
  );
};

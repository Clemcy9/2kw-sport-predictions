import mongoose from "mongoose";
import bcrypt from "bcrypt";
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

export const Group = mongoose.model("Group", groupSchema);

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

export const Permission = mongoose.model("Permission", permissionSchema);

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    first_name: String,
    last_name: String,
    is_active: Boolean,
    is_superuser: Boolean,
    last_login: Date,

    // relationships
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    user_permissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

// create a compound unique index
userSchema.index({ first_name: 1, last_name: 1 }, { unique: true });

// hashes password automatically before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("new user request no password update");
    return next();
  }
  console.log("password reset request made");
  this.password = await bcrypt.hash(this.password, 10);
  this.is_new = true; //temp field used to check if user is just created, it exist only in memory not in db
  next();
});

const verificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// this automatically delete token after expiration
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

export const Verification = mongoose.model("Verification", verificationSchema);

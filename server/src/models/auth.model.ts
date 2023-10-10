import mongoose from "mongoose";
import { IAuth, ILoginTypes } from "../interfaces/models/user.interface";
import { Collections } from "../constants/collections";
import argon2 from "argon2";

const AuthSchema = new mongoose.Schema<IAuth>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    loginType: {
      type: String,
      enum: Object.values(ILoginTypes),
      required: true,
      default: ILoginTypes.email,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

AuthSchema.pre("save", async function () {
  if (this.loginType != ILoginTypes.email) return;
  if (!this.isModified("password")) return;
  else {
    const passwordHash = await argon2.hash(this.password);
    this.password = passwordHash;
  }
});

AuthSchema.methods.confirmPassword = async function (
  password: string
): Promise<Boolean> {
  return await argon2.verify(this.password, password);
};

const Auth = mongoose.model(Collections.auth, AuthSchema);

export default Auth;

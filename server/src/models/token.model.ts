import mongoose from "mongoose";
import { IToken, ITokenTypes } from "../interfaces/models/user.interface";
import { Collections } from "../constants/collections";
import { v4 } from "uuid";

const FIFTEEN_MINUTES = 60 * 15;

const TokenSchema = new mongoose.Schema<IToken>(
  {
    tokenType: {
      type: String,
      required: true,
      enum: Object.values(ITokenTypes),
    },
    value: { type: String, default: v4() },
    email: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, expires: FIFTEEN_MINUTES },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Token = mongoose.model(Collections.token, TokenSchema);

export default Token;

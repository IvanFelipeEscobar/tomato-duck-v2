import mongoose, { Schema } from "mongoose";

const tokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  vToken: {
    type: String,
    default: "",
  },
  rToken: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

export const Token = mongoose.model('Token', tokenSchema)
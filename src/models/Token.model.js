import mongoose from "mongoose";
import Tokentypes from "../config/token.js";

const TokenSchema = new mongoose.Schema(
  {
    token: { type: String, require: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
    type: {
      type: String,
      enum: [
        Tokentypes.REFRESH,
        Tokentypes.RESET_PASSWORD,
        Tokentypes.VERIFY_EMAIL,
      ],
      require: true,
    },
    expires: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", TokenSchema);

export default Token;

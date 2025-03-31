import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  image?: string;
  role: "admin" | "user";
  emailVerified?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    emailVerified: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

import mongoose, { Schema, Types } from "mongoose";
import { ITask } from "./Task";

export interface ISession {
  name: string;
  ownerId: Types.ObjectId;
  participants: Types.ObjectId[];
  tasks: ITask[];
  estimationType: "fibonacci" | "tshirt";
  status: "active" | "completed";
  shareLink: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tasks: [
      {
        title: {
          type: String,
          required: true,
        },
        description: String,
        jiraId: String,
        estimates: [
          {
            userId: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
            value: Schema.Types.Mixed,
          },
        ],
        aiEstimate: Schema.Types.Mixed,
        finalEstimate: Schema.Types.Mixed,
        status: {
          type: String,
          enum: ["pending", "active", "completed"],
          default: "pending",
        },
      },
    ],
    estimationType: {
      type: String,
      enum: ["fibonacci", "tshirt"],
      default: "fibonacci",
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    shareLink: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Session ||
  mongoose.model<ISession>("Session", SessionSchema);

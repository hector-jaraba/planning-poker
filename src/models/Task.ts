import { Types } from "mongoose";

export interface IEstimate {
  userId: Types.ObjectId;
  value: string | number;
}

export interface ITask {
  title: string;
  description?: string;
  jiraId?: string;
  estimates: IEstimate[];
  aiEstimate?: string | number;
  finalEstimate?: string | number;
  status: "pending" | "active" | "completed";
}

import { Schema, model, Document } from "mongoose";

export interface alertDataInterface extends Document {
  day: string;
  alert: string;
  count: number;
  createdAt: Date;
}

const alertSchema = new Schema<alertDataInterface>({
  day: {
    type: String,
    required: true,
  },
  alert: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const alertModel = model<alertDataInterface>("Alert", alertSchema);

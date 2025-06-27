import { Schema, model, Document } from "mongoose";

export interface weatherDataInterface extends Document {
  record_time: Date;
  air_pres: number;
  air_temp: number;
  water_temp: number;
  wind_dir: number;
  wind_speed: number;
}

const weatherSchema = new Schema<weatherDataInterface>({
  record_time: {
    type: Date,
    required: true,
  },
  air_pres: {
    type: Number,
    required: true,
  },
  air_temp: {
    type: Number,
    required: true,
  },
  water_temp: {
    type: Number,
    required: true,
  },
  wind_dir: {
    type: Number,
    required: true,
  },
  wind_speed: {
    type: Number,
    required: true,
  },
});
export const weatherModel = model<weatherDataInterface>(
  "weatherData",
  weatherSchema
);

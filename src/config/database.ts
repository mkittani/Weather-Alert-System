import mongoose from "mongoose";
import dotenv from "dotenv";
import { pino } from "pino";

const logger = pino();

dotenv.config();

const DB_URI =
  process.env.DB_URI || "mongodb://localhost:27017/weatherAlertsDB";

export async function connectToDB(): Promise<void>  {
  try {
    await mongoose.connect(DB_URI);
    logger.info("Connected to the database");
  } catch (error) {
    logger.error(`Connection to DB FAILED: ${error}`);
    process.exit(1);
  }
}

export async function disconnectFromDB(): Promise<void>  {
  try {
    await mongoose.connection.close();
    logger.info("Database connection closed");
  } catch (error) {
    logger.error(`Error occurred while closing the DB: ${error}`);
    process.exit(1);
  }
}

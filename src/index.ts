import { parseCSV } from "./services/parseCSV";
import { weatherAlerts } from "./services/alertService";
// import { saveWeatherData } from "./config/weatherConfig";
import { weatherDataInterface } from "./models/weatherModel";
import { saveDailyAlerts, DailyAlerts } from "./config/alertConfig";
import { connectToDB, disconnectFromDB } from "./config/database";
import dotenv from "dotenv";
import {pino} from "pino";

const logger = pino();
dotenv.config();

async function main(): Promise<void> {
  try {
    const filePath = process.argv[2] || process.env.DATASET_PATH;

    if (!filePath) {
      logger.error("dataset path was not provided");
      process.exit(1);
    }

    logger.info("parsing CSV file");
    // console.log("parsing CSV file");
    const weatherData = await parseCSV(filePath);
    logger.info(`parsed ${weatherData.length} records from the CSV file`);
    // console.log("parsed ",weatherData.length, "records from the CSV file");

    logger.info("loading weather alerts");
    // console.log("loading weather alerts");
    let previousData: weatherDataInterface;
    let lastAlertDay: string | null = null;
    const dailyAlerts: DailyAlerts = {};

    weatherData.forEach((currentData) => {
      const currentDay = currentData.record_time.toISOString().split("T")[0];
    
      // To check for any alert that needs calculations
      if (lastAlertDay !== currentDay) {
        const alerts = weatherAlerts(currentData, previousData);
    
        if (alerts.length > 0) {
          if (!dailyAlerts[currentDay]) {
            dailyAlerts[currentDay] = {}; // Fix: Ensure it's initialized
          }
    
          alerts.forEach((alert) => {
            dailyAlerts[currentDay][alert] = (dailyAlerts[currentDay][alert] ?? 0) + 1;
          });
    
          lastAlertDay = currentDay;
        }
      }
      previousData = currentData;
    });
    

    logger.info("saving data to MongoDB");
    await connectToDB();
    await saveDailyAlerts(dailyAlerts);
    // await saveWeatherData(weatherData);
    await disconnectFromDB();
    logger.info("all data saved successfully to MongoDB");
  } catch (error) {
    logger.error(`an error occurred: ${error}`);
    // console.error("error occerured: ", error);
  }
}

main().catch((error) => logger.error("main func execution failed:", error));

import csvParser from "csv-parser";
import fs from "fs";
import { weatherDataInterface } from "../models/weatherModel";
import { pino } from "pino";

const logger = pino();

export async function parseCSV(filePath: string): Promise<weatherDataInterface[]> {
  const results: weatherDataInterface[] = [];

  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);

    readStream
      .pipe(csvParser())
      .on("data", (data) => {
        try {
          const record_time = new Date(data.record_time);
          if (isNaN(record_time.getTime())) {
            logger.error(`Invalid record_time: ${data.record_time}`);
            return; 
          }

          const air_pres = data.air_pres ? parseFloat(data.air_pres) : NaN;
          const air_temp = data.air_temp ? parseFloat(data.air_temp) : NaN;
          const water_temp = data.water_temp ? parseFloat(data.water_temp) : NaN;
          const wind_dir = data.wind_dir ? parseFloat(data.wind_dir) : NaN;
          const wind_speed = data.wind_speed ? parseFloat(data.wind_speed) : NaN;

          results.push({
            record_time,
            air_pres,
            air_temp,
            water_temp,
            wind_dir,
            wind_speed,
          } as weatherDataInterface);
        } catch (error) {
          logger.error(`Error processing row: ${error}`);
        }
      })
      .on("end", () => resolve(results))
      .on("error", (error) => {
        logger.error(`Error reading file: ${error.message}`);
        reject(error);
      });
  });
}

import { weatherModel, weatherDataInterface } from "../models/weatherModel";
import { pino } from "pino";

const logger = pino();

interface GroupedWeatherData {
  [date: string]: weatherDataInterface[];
}

type ChunkSize = number;

function groupDataByDay(data: weatherDataInterface[]): GroupedWeatherData {
  const groupedData: GroupedWeatherData = {};

  data.forEach((entry) => {
    const dataKey = entry.record_time.toISOString().split("T")[0];
    if (!groupedData[dataKey]) {
      groupedData[dataKey] = [];
    }
    groupedData[dataKey].push(entry);
  });

  return groupedData;
}

// get the last inserted date from the database
async function getLastInsertedDate(): Promise<Date | null> {
  const lastEntry = await weatherModel
    .findOne()
    .sort({ record_time: -1 })
    .lean();
  return lastEntry ? lastEntry.record_time : null;
}

function isDateProcessed(
  currentDate: Date,
  lastInsertedDate: Date | null
): boolean {
  return lastInsertedDate !== null && currentDate <= lastInsertedDate;
}

export async function saveWeatherData (
  data: weatherDataInterface[],
  chunkSize: ChunkSize = 500
): Promise<void>  {
  try {
    const lastInsertedDate = await getLastInsertedDate();
    const groupedData = groupDataByDay(data);

    for (const date in groupedData) {
      const currentDate = new Date(date);

      if (isDateProcessed(currentDate, lastInsertedDate)) {continue;}

      const dailyData = groupedData[date];
      // Insert data in chunks
      for (let i = 0; i < dailyData.length; i += chunkSize) {
        const chunk = dailyData.slice(i, i + chunkSize);
        await weatherModel.insertMany(chunk);
      }
    }
  } catch (error) {
    logger.error(`Error saving weather data: ${error}`);
  }
}

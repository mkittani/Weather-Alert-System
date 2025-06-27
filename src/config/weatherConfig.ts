import { weatherDataInterface, weatherModel } from "../models/weatherModel";
import { pino } from "pino";

const logger = pino();

export async function saveWeatherData(weatherData: weatherDataInterface[]): Promise<void>  {
  try {
    await weatherModel.insertMany(weatherData);
    logger.info("Weather data saved successfully");
  } catch (error) {
    logger.error(`Error saving weather data: ${error}`);
  }
}

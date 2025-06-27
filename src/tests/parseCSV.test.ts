import fs from "fs";
import path from "path";
import { parseCSV } from "../services/parseCSV";
import { weatherDataInterface } from "../models/weatherModel";
import { pino } from "pino";

jest.mock("pino", () => {
  return {
    pino: jest.fn().mockReturnValue({
      error: jest.fn(),
    }),
  };
});

const logger = pino();

describe("parseCSV", () => {
  it("should parse CSV correctly", async () => {
    const mockCSV = `record_time,air_pres,air_temp,water_temp,wind_dir,wind_speed
2025-03-01T00:00:00Z,1013.25,23.5,19.2,90,10
2025-03-02T00:00:00Z,1012.50,24.1,20.0,180,12`;

    const tempFilePath = path.join(__dirname, "temp.csv");
    fs.writeFileSync(tempFilePath, mockCSV);

    const result: weatherDataInterface[] = await parseCSV(tempFilePath);

    expect(result).toHaveLength(2);
    expect(result[0].record_time).toEqual(new Date("2025-03-01T00:00:00Z"));
    expect(result[0].air_pres).toBe(1013.25);
    expect(result[0].air_temp).toBe(23.5);
    expect(result[0].water_temp).toBe(19.2);
    expect(result[0].wind_dir).toBe(90);
    expect(result[0].wind_speed).toBe(10);

    fs.unlinkSync(tempFilePath);
  });

  it("should log error for invalid record_time", async () => {
    const mockCSVInvalid = `record_time,air_pres,air_temp,water_temp,wind_dir,wind_speed
InvalidDate,1013.25,23.5,19.2,90,10`;

    const tempFilePath = path.join(__dirname, "temp_invalid.csv");
    fs.writeFileSync(tempFilePath, mockCSVInvalid);

    const loggerErrorSpy = jest.spyOn(logger, "error");

    await parseCSV(tempFilePath);

    expect(loggerErrorSpy).toHaveBeenCalledWith("Invalid record_time: InvalidDate");

    fs.unlinkSync(tempFilePath);
  });

  it("should reject the promise if there is an error during file reading", async () => {
    // Mocking fs.createReadStream to simulate ENOENT error
    jest.spyOn(fs, 'createReadStream').mockImplementationOnce(() => {
      throw new Error("ENOENT: no such file or directory, open 'non-existent-file.csv'");
    });

    await expect(parseCSV("non-existent-file.csv")).rejects.toThrowError(
      "ENOENT: no such file or directory, open 'non-existent-file.csv'"
    );
  });

  jest.setTimeout(15000);
});

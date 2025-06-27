import { alertModel } from "../models/alertModel";
import { pino } from "pino";

const logger = pino();
// Define and export interfaces for the structure of dailyAlerts
export interface DailyAlertCounts {
  [alert: string]: number;
}

export interface DailyAlerts {
  [day: string]: DailyAlertCounts;
}

export async function saveDailyAlerts(dailyAlerts: DailyAlerts): Promise<void> {
  try {
    for (const day in dailyAlerts) {
      const alertCounts = dailyAlerts[day];
      
      const uniqueAlerts = new Set<string>(Object.keys(alertCounts));

      for (const alert of uniqueAlerts) {
        // Check if the alert already exists
        const existingAlert = await alertModel.exists({
          day: day,
          alert: alert,
        });

        if (!existingAlert) {
          // Create a new alert only if it doesn't exist
          await alertModel.create({
            day: day,
            alert: alert,
            count: alertCounts[alert], // Store the count for each alert
            createdAt: new Date(),
          });
        }
      }
    }
  } catch (error) {
    logger.error(`Error saving alerts: ${error}`);
  }
}


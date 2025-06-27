import { weatherDataInterface } from "../models/weatherModel";

export function weatherAlerts(
  currentData: weatherDataInterface,
  previousData?: weatherDataInterface
): string[] {
  const alerts: string[] = [];
  let suddenPresDrop = false;

  // 1
  if (!isNaN(currentData.wind_speed)) {
    if (currentData.wind_speed > 80) {alerts.push("High Wind Speed Alert");}
    else if (currentData.wind_speed >= 40) {alerts.push("Strong Wind Advisory");}
    else if (currentData.wind_speed < 2) {alerts.push("Calm Wind Alert");}
  }

  // 2
  if (!isNaN(currentData.air_temp)) {
    if (currentData.air_temp < -10) {alerts.push("Extreme Cold Alert");}
    else if (currentData.air_temp > 40) {alerts.push("Heatwave Alert");}
  }

  // 3
  if (!isNaN(currentData.water_temp)) {
    if (currentData.water_temp < 5) {alerts.push("Cold Water Alert");}
    else if (currentData.water_temp > 30) {alerts.push("Hot Water Alert");}
  }

  // 4
  if (!isNaN(currentData.air_pres)) {
    if (currentData.air_pres < 980) {alerts.push("Low Pressure Alert");}
    else if (currentData.air_pres > 1030) {alerts.push("High Pressure Alert");}
  }

  // CALCULATIONS
  if (previousData) {
    const validPrevTemp =
      !isNaN(previousData.air_temp) && !isNaN(currentData.air_temp);
    const validPrevPres =
      !isNaN(previousData.air_pres) && !isNaN(currentData.air_pres);
    const validPrevWindDir =
      !isNaN(previousData.wind_dir) && !isNaN(currentData.wind_dir);
    const validPrevWaterTemp =
      !isNaN(previousData.water_temp) && !isNaN(currentData.water_temp);

    // 2
    if (
      validPrevTemp &&
      Math.abs(previousData.air_temp - currentData.air_temp) > 10
    ) {
      alerts.push("Rapid Temperature Drop Alert");
    }

    // 4
    if (
      validPrevPres &&
      Math.abs(previousData.air_pres - currentData.air_pres) > 10
    ) {
      alerts.push("Rapid Pressure Drop Alert");
      suddenPresDrop = true;
    }

    // 5
    if (
      validPrevWindDir &&
      Math.abs(previousData.wind_dir - currentData.wind_dir) > 90
    ) {
      alerts.push("Sudden Wind Shift Alert");
    }

    // 6
    if (
      validPrevWaterTemp &&
      validPrevPres &&
      Math.abs(previousData.water_temp - currentData.water_temp) > 10 &&
      currentData.air_pres < 980
    ) {
      alerts.push("Tsunami Risk Alert");
    }
  }

  // 6
  if (!isNaN(currentData.wind_speed) && !isNaN(currentData.air_pres)) {
    if (currentData.wind_speed > 120 && currentData.air_pres < 970) {
      alerts.push("Hurricane Alert");
    }
    if (currentData.wind_speed > 60 && suddenPresDrop) {
      alerts.push("Lightning Storm Alert");
    }
  }

  return alerts;
}

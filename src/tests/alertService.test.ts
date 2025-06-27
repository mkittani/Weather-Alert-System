import { weatherAlerts } from "../services/alertService";
import { weatherDataInterface } from "../models/weatherModel";

describe('weatherAlerts', () => {
  it('should trigger "High Wind Speed Alert" if wind speed is greater than 80', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 90, 
    } as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 80,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('High Wind Speed Alert');
  });

  it('should trigger "Strong Wind Advisory" if wind speed is between 40 and 80', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 60, 
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 50,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Strong Wind Advisory');
  });

  it('should trigger "Calm Wind Alert" if wind speed is less than 2', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 1, 
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 1,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Calm Wind Alert');
  });



  it('should trigger "Extreme Cold Alert" if air temperature is less than -10', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: -15, 
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: -5,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Extreme Cold Alert');
  });

  it('should trigger "Heatwave Alert" if air temperature is greater than 40', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 45, 
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 35,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Heatwave Alert');
  });

  it('should trigger "Rapid Temperature Drop Alert" if the temperature drops more than 10 degrees from previous data', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 5, 
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 20, 
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Rapid Temperature Drop Alert');
  });



  it('should trigger "Cold Water Alert" if water temperature is less than 5', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 4, 
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 10,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Cold Water Alert');
  });

  it('should trigger "Hot Water Alert" if water temperature is greater than 30', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 35, 
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 28,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Hot Water Alert');
  });



  it('should trigger "Low Pressure Alert" if air pressure is below 980', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 970, 
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 990,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Low Pressure Alert');
  });

  it('should trigger "High Pressure Alert" if air pressure is above 1030', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1040, 
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('High Pressure Alert');
  });

  it('should trigger "Rapid Pressure Drop Alert" if air pressure drops more than 10 from previous data', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 970, 
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 990,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Rapid Pressure Drop Alert');
  });



  it('should trigger "Sudden Wind Shift Alert" if wind direction shifts more than 90 degrees', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 180,
      wind_speed: 10,
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 45, 
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Sudden Wind Shift Alert');
  });

  

  it('should trigger "Hurricane Alert" if wind speed > 120 and air pressure < 970', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 960, 
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 130, 
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 100,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Hurricane Alert');
  });

  it('should trigger "Lightning Storm Alert" if wind speed > 60 and sudden pressure drop', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 950, 
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 70, 
    }as weatherDataInterface;
    const previousData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 60,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, previousData);
    expect(alerts).toContain('Lightning Storm Alert');
  });

  // it('should trigger "Tsunami Risk Alert" if conditions are met for water temperature drop and low air pressure', () => {
  //   const currentData: weatherDataInterface = {
  //     record_time: new Date(),
  //     air_pres: 975, 
  //     air_temp: 25,
  //     water_temp: 30, 
  //     wind_dir: 90,
  //     wind_speed: 10,
  //   }as weatherDataInterface;
  //   const previousData: weatherDataInterface = {
  //     record_time: new Date(),
  //     air_pres: 1010, 
  //     air_temp: 25,
  //     water_temp: 40, 
  //     wind_dir: 90,
  //     wind_speed: 10,
  //   }as weatherDataInterface;

  //   const alerts = weatherAlerts(currentData, previousData);
  //   expect(alerts).toContain('Tsunami Risk Alert');
  // });



  it('should handle no previous data gracefully', () => {
    const currentData: weatherDataInterface = {
      record_time: new Date(),
      air_pres: 1010,
      air_temp: 25,
      water_temp: 18,
      wind_dir: 90,
      wind_speed: 10,
    }as weatherDataInterface;

    const alerts = weatherAlerts(currentData, undefined);
    expect(alerts).toEqual([]);
  });
});

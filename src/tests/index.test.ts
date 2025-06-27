// import { main } from '../index';
// import { connectToDB, disconnectFromDB } from '../config/database';
// import { saveDailyAlerts } from '../config/alertConfig';
// import { parseCSV } from '../services/parseCSV';
// import { weatherAlerts } from './services/alertService';
// import { jest } from '@jest/globals';

// // Mocking necessary imports
// jest.mock('./config/database');
// jest.mock('./services/parseCSV');
// jest.mock('./config/alertConfig');
// jest.mock('./services/alertService');

// describe('Main Application', () => {
//   it('should successfully process CSV, load data, and save alerts to MongoDB', async () => {
//     const mockWeatherData = [
//       {
//         record_time: new Date(),
//         air_pres: 1010,
//         air_temp: 25,
//         water_temp: 18,
//         wind_dir: 90,
//         wind_speed: 10,
//       },
//     ];

//     parseCSV.mockResolvedValueOnce(mockWeatherData);
//     saveDailyAlerts.mockResolvedValueOnce(undefined);
//     connectToDB.mockResolvedValueOnce(undefined);
//     disconnectFromDB.mockResolvedValueOnce(undefined);

//     await main();

//     expect(connectToDB).toHaveBeenCalled();
//     expect(saveDailyAlerts).toHaveBeenCalled();
//     expect(disconnectFromDB).toHaveBeenCalled();
//   });

//   it('should handle errors gracefully', async () => {
//     parseCSV.mockRejectedValueOnce(new Error('CSV Parsing Error'));

//     await expect(main()).rejects.toThrow('CSV Parsing Error');
//   });
// });

// import { saveWeatherData } from '../services/weatherService';
// import { weatherModel } from '../models/weatherModel';
// import { weatherDataInterface } from '../models/weatherModel';
// import { jest } from '@jest/globals';

// // Mocking weatherModel
// jest.mock('./models/weatherModel', () => ({
//   weatherModel: {
//     insertMany: jest.fn(),
//     findOne: jest.fn(),
//   },
// }));

// describe('Weather Service', () => {
//   it('should save weather data into MongoDB', async () => {
//     const weatherData: weatherDataInterface[] = [
//       {
//         record_time: new Date('2023-03-03T12:00:00Z'),
//         air_pres: 1010,
//         air_temp: 25,
//         water_temp: 18,
//         wind_dir: 90,
//         wind_speed: 10,
//       },
//     ];

//     await saveWeatherData(weatherData);
//     expect(weatherModel.insertMany).toHaveBeenCalledWith(weatherData);
//   });

//   it('should handle error while saving weather data', async () => {
//     const error = new Error('Insert error');
//     weatherModel.insertMany.mockRejectedValueOnce(error);
//     const weatherData: weatherDataInterface[] = [
//       {
//         record_time: new Date('2023-03-03T12:00:00Z'),
//         air_pres: 1010,
//         air_temp: 25,
//         water_temp: 18,
//         wind_dir: 90,
//         wind_speed: 10,
//       },
//     ];

//     await expect(saveWeatherData(weatherData)).rejects.toThrow(error);
//   });
// });

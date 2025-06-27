# 🌦️ Weather Alert System

A robust, extensible Node.js application for ingesting, analyzing, and alerting on weather data. This system parses weather datasets, detects significant weather events, and stores both raw data and alerts in MongoDB for further analysis and reporting.

---

## 🚀 Features

- **CSV Weather Data Ingestion**: Efficiently parses large weather datasets.
- **Automated Weather Alerts**: Detects and classifies a variety of weather events (e.g., storms, heatwaves, tsunamis).
- **Daily Alert Aggregation**: Summarizes and stores daily alert counts.
- **MongoDB Integration**: Persists both weather data and alerts for historical analysis.
- **Extensive Testing**: Includes a suite of unit tests for core logic.
- **Configurable & Extensible**: Easily adapt alert logic or data models for new requirements.
- **Structured Logging**: Uses `pino` for fast, readable logs.

---

## 🧩 How It Works

### 1. Data Ingestion

- The app expects a CSV file containing weather records (timestamp, air pressure, temperature, wind, etc.).
- The file path can be provided as a CLI argument or via the `DATASET_PATH` environment variable.

### 2. Parsing & Processing

- The CSV is parsed into structured weather records.
- For each record, the system:
  - Compares with previous data (if available).
  - Runs a series of alert checks (see below).
  - Aggregates alerts by day.

### 3. Alert Logic

Alerts are generated for:
- **Wind**: High wind speed, strong wind, calm wind.
- **Temperature**: Extreme cold, heatwave, rapid temperature drop.
- **Water**: Cold/hot water, tsunami risk.
- **Pressure**: Low/high pressure, rapid pressure drop.
- **Wind Direction**: Sudden wind shift.
- **Compound Events**: Hurricane, lightning storm.

All alert logic is encapsulated in `src/services/alertService.ts` for easy extension.

### 4. Data Storage

- **Weather Data**: Stored in MongoDB using the `weatherModel`.
- **Alerts**: Daily alert counts are stored using the `alertModel`.

---

## 🛠️ Setup & Usage

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or remote instance)

### Installation

```bash
git clone https://github.com/mkittani/Weather-Alert-System.git
cd Weather-Alert-System
npm install
```

### Configuration

Create a `.env` file in the root directory:
```
DB_URI=mongodb://localhost:27017/weatherAlertsDB
DATASET_PATH=./path/to/your/weather.csv
```


### Running the Application

```bash
npm start -- ./path/to/your/weather.csv
# or rely on DATASET_PATH in .env
npm start
```

### Running Tests

```bash
npm test
```

---

## 🧪 Example CSV Format

| record_time          | air_pres | air_temp | water_temp | wind_dir | wind_speed |
|----------------------|----------|----------|------------|----------|------------|
| 2024-06-01T12:00:00Z | 1012     | 25       | 20         | 180      | 15         |
| ...                  | ...      | ...      | ...        | ...      | ...        |

---

## 📦 Main Components

### Models

- **weatherModel**: Stores each weather record.
- **alertModel**: Stores daily alert counts.

### Services

- **parseCSV**: Parses CSV files into weather records.
- **alertService**: Contains all alert-detection logic.
- **weatherService**: Handles weather data grouping and storage.

### Config

- **database.ts**: Handles MongoDB connection.
- **alertConfig.ts**: Aggregates and saves daily alerts.
- **weatherConfig.ts**: (Optional) For saving weather data in bulk.

---

## 📝 Extending the System

- **Add New Alerts**: Edit `src/services/alertService.ts` to add new alert types.
- **Change Data Model**: Update `src/models/` as needed.
- **Integrate APIs**: Replace or supplement CSV ingestion with live weather APIs.

---


## 🛡️ Testing

- Tests are located in `src/tests/`
- Run with `npm test`
- Covers alert logic, CSV parsing, and service integration

---

## 📚 Dependencies

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [csv-parser](https://www.npmjs.com/package/csv-parser)
- [pino](https://getpino.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Jest](https://jestjs.io/) (for testing)

---

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 📄 License

This project is licensed under the MIS License.

---

## ✨ Inspiration

This project was built to demonstrate how real-time weather data can be processed and analyzed for actionable insights, using modern Node.js and TypeScript best practices.



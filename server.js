require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

const API = process.env.API_KEY;

// File Logging
const fs = require("fs");
fs.chmod("app.log", 0o600, (err) => {
  if (err) throw err;
  console.log('The permissions for file "app.log" have been changed!');
});

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} : ${message}\n`;

  fs.appendFile("app.log", logMessage, (err) => {
    if (err) {
      console.error("Error writing to app.log: ", err);
    }
  });
}

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes in milliseconds
  limit: 50, //maximum of 50 requests
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, knock it off.",
});

app.use(limiter);

app.get("/api/weather", async (req, res) => {
  const zip = req.query.zip;
  if (!zip) {
    return res.status(400).json({ error: "ZIP required" });
  }
  try {
    const weatherURL = "https://api.weatherapi.com/v1/forecast.json";
    const response = await axios.get(weatherURL, {
      params: {
        key: API,
        q: zip,
        days: 3,
      },
      timeout: 5000,
    });

    log(`[SUCCESS] - API called for ZIP: ${zip}`);

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching weather data:`, error);
    log(`[ERROR] - API call failed for ZIP: ${zip} - ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy running at http://localhost:${PORT}/api/weather`);
});

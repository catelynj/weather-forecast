require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

const API = process.env.API_KEY;

app.use(cors());

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
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error.response) {
      res.status(400).json({
        error: true,
        message: "INVALID ZIP",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy running at http://localhost:${PORT}/api/weather`);
});

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async ({ lat, lon }) => {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  }
);

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city) => {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  }
);

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Add debug logging
console.log('API Key length:', API_KEY?.length);
console.log('First 4 chars of API key:', API_KEY?.substring(0, 4));

const validateApiKey = () => {
  if (!API_KEY) {
    throw new Error('Weather API key is missing');
  }
  const trimmedKey = API_KEY.trim();
  console.log('Trimmed API key length:', trimmedKey.length);
  return trimmedKey;
};

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchWeatherByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const key = validateApiKey();
      console.log('Making request with coords:', { lat, lon }); // Debug log
      
      const response = await axios.get(BASE_URL, {
        params: {
          lat,
          lon,
          appid: key,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Weather API Error:', error.response || error); // Debug log
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Failed to fetch weather data',
        status: error.response?.status,
        details: error.response?.data
      });
    }
  }
);

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city, { rejectWithValue }) => {
    try {
      const key = validateApiKey();
      console.log('Making request for city:', city); // Debug log
      
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: key,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Weather API Error:', error.response || error); // Debug log
      return rejectWithValue({
        message: error.response?.data?.message || error.message || 'Failed to fetch weather data',
        status: error.response?.status,
        details: error.response?.data
      });
    }
  }
);

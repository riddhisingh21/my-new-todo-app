import { createSlice } from '@reduxjs/toolkit';
import { fetchWeatherByCoords, fetchWeatherByCity } from '../../api/weatherApi';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
    locationStatus: 'idle',
  },
  reducers: {
    setLocationStatus: (state, action) => {
      state.locationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setLocationStatus } = weatherSlice.actions;
export default weatherSlice.reducer;

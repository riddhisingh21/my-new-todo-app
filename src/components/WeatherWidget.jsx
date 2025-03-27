import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCoords, fetchWeatherByCity } from '../api/weatherApi';
import { setLocationStatus } from '../redux/slices/weatherSlice';

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);
  const [city, setCity] = useState('');

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      '01d': '☀️', // clear sky day
      '01n': '🌙', // clear sky night
      '02d': '⛅', // few clouds day
      '02n': '☁️', // few clouds night
      '03d': '☁️', // scattered clouds
      '03n': '☁️',
      '04d': '☁️', // broken clouds
      '04n': '☁️',
      '09d': '🌧️', // shower rain
      '09n': '🌧️',
      '10d': '🌦️', // rain
      '10n': '🌧️',
      '11d': '⛈️', // thunderstorm
      '11n': '⛈️',
      '13d': '🌨️', // snow
      '13n': '🌨️',
      '50d': '🌫️', // mist
      '50n': '🌫️',
    };
    return icons[weatherCode] || '🌡️';
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      dispatch(setLocationStatus('requesting'));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setLocationStatus('granted'));
          console.log('Getting weather for coordinates:', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          dispatch(fetchWeatherByCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
          dispatch(setLocationStatus('denied'));
          // Fall back to default city
          dispatch(fetchWeatherByCity('New York'));
        }
      );
    } else {
      dispatch(setLocationStatus('unsupported'));
      dispatch(fetchWeatherByCity('New York'));
    }
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherByCity(city));
      setCity('');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const renderWeatherContent = () => {
    if (weather.status === 'loading') {
      return <div className="weather-loading">Loading weather data... 🌤️</div>;
    }

    if (weather.status === 'failed') {
      return (
        <div className="weather-error">
          <p>Error: {weather.error?.message || 'Failed to fetch weather data'} ⚠️</p>
          {weather.error?.status && (
            <p className="error-details">Status: {weather.error.status}</p>
          )}
          {weather.error?.details && (
            <p className="error-details">Details: {JSON.stringify(weather.error.details)}</p>
          )}
        </div>
      );
    }

    if (weather.status === 'succeeded' && weather.data) {
      const weatherIcon = getWeatherIcon(weather.data.weather[0].icon);
      return (
        <div className="weather-info">
          <h3 className="weather-title">Weather in {weather.data.name}</h3>
          <div className="weather-details">
            <div className="weather-main">
              <span className="weather-icon">{weatherIcon}</span>
              <p className="temperature">{Math.round(weather.data.main.temp)}°C</p>
            </div>
            <p className="condition">{weather.data.weather[0].description}</p>
            <div className="additional-info">
              <div className="info-item">
                <span className="info-icon">💧</span>
                <p>Humidity: {weather.data.main.humidity}%</p>
              </div>
              <div className="info-item">
                <span className="info-icon">🌬️</span>
                <p>Wind: {weather.data.wind.speed} m/s</p>
              </div>
              <div className="info-item">
                <span className="info-icon">🌡️</span>
                <p>Feels like: {Math.round(weather.data.main.feels_like)}°C</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="weather-widget">
      {weather.locationStatus === 'denied' && (
        <div className="location-notice">
          <p>Location access denied. Showing default city weather.</p>
        </div>
      )}
      {renderWeatherContent()}
      <form onSubmit={handleCitySubmit} className="city-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button type="submit" className="city-submit">
          Get Weather
        </button>
      </form>
    </div>
  );
};

export default WeatherWidget;

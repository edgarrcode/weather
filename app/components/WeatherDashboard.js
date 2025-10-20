'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Eye, Gauge } from 'lucide-react';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Replace with your actual API key from OpenWeatherMap
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      setCity('');
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );

      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (weather) {
      fetchWeatherByCoords(weather.coord.lat, weather.coord.lon);
    }
  }, [unit]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Weather Dashboard
          </h1>
          
          <form onSubmit={handleSearch} className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search for a city..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition font-semibold"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>

          <button
            onClick={handleGeolocation}
            className="w-full py-3 border-2 border-blue-500 text-blue-500 rounded-xl hover:bg-blue-50 transition font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            <MapPin size={20} />
            Use My Location
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="text-gray-600 text-lg mt-1 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
              <button
                onClick={toggleUnit}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                {unit === 'metric' ? '°F' : '°C'}
              </button>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <img
                  src={getWeatherIcon(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  className="w-32 h-32"
                />
                <div className="text-7xl font-bold text-gray-800">
                  {Math.round(weather.main.temp)}
                  <span className="text-4xl">{tempUnit}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Gauge size={20} />
                  <span className="font-semibold">Feels Like</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(weather.main.feels_like)}{tempUnit}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Droplets size={20} />
                  <span className="font-semibold">Humidity</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Wind size={20} />
                  <span className="font-semibold">Wind Speed</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(weather.wind.speed)} {speedUnit}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Eye size={20} />
                  <span className="font-semibold">Visibility</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Getting Started Notice */}
        {!weather && !loading && !error && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              🌤️ Search for a city or use your location to get started!
            </p>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-left">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                ⚠️ Setup Required:
              </p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Sign up at <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">OpenWeatherMap</a></li>
                <li>Get your free API key</li>
                <li>Replace 'YOUR_API_KEY_HERE' in the code with your actual key</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
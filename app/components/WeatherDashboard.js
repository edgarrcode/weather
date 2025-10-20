'use client';
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Eye, Gauge, Cloud } from 'lucide-react';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

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

  const handleSearch = () => {
    fetchWeather(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cloud className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Weather</h1>
          </div>
          {weather && (
            <button
              onClick={toggleUnit}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              Switch to {unit === 'metric' ? '°F' : '°C'}
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {!weather && !loading && (
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              See everything.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Know the weather.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real-time weather data for any location worldwide. Simple, fast, and accurate.
            </p>
          </div>
        )}

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for any city..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-white placeholder:text-slate-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            <button
              onClick={handleGeolocation}
              className="w-full py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition font-medium flex items-center justify-center gap-2 border border-slate-800"
              disabled={loading}
            >
              <MapPin size={18} />
              Use current location
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-900/30 text-red-400 rounded-xl border border-red-800/50 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="max-w-6xl mx-auto">
            {/* Main Weather Card */}
            <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-4xl font-bold text-white">
                      {weather.name}
                    </h3>
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm font-medium">
                      {weather.sys.country}
                    </span>
                  </div>
                  <p className="text-lg text-slate-400 capitalize mb-6">
                    {weather.weather[0].description}
                  </p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-bold text-white">
                      {Math.round(weather.main.temp)}
                    </span>
                    <span className="text-4xl font-semibold text-slate-500">
                      {tempUnit}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 mt-2">
                    Feels like {Math.round(weather.main.feels_like)}{tempUnit}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={getWeatherIcon(weather.weather[0].icon)}
                    alt={weather.weather[0].description}
                    className="w-48 h-48 drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <Gauge className="text-blue-400" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-400">Pressure</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {weather.main.pressure}
                </p>
                <p className="text-sm text-slate-500 mt-1">hPa</p>
              </div>

              <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20">
                    <Droplets className="text-cyan-400" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-400">Humidity</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {weather.main.humidity}
                </p>
                <p className="text-sm text-slate-500 mt-1">percent</p>
              </div>

              <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/20">
                    <Wind className="text-indigo-400" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-400">Wind Speed</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {Math.round(weather.wind.speed)}
                </p>
                <p className="text-sm text-slate-500 mt-1">{speedUnit}</p>
              </div>

              <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                    <Eye className="text-purple-400" size={20} />
                  </div>
                  <span className="text-sm font-medium text-slate-400">Visibility</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {(weather.visibility / 1000).toFixed(1)}
                </p>
                <p className="text-sm text-slate-500 mt-1">kilometers</p>
              </div>
            </div>
          </div>
        )}

        {/* Setup Notice */}
        {!weather && !loading && !error && (
          <div className="max-w-2xl mx-auto bg-amber-900/20 border border-amber-800/50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-amber-400 mb-2">Setup Required</h3>
                <ol className="text-sm text-amber-300/80 space-y-1.5 list-decimal list-inside">
                  <li>Sign up at OpenWeatherMap</li>
                  <li>Get your free API key</li>
                  <li>Add it to your .env.local file</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherDashboard;
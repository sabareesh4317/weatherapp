import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { WeatherInfo } from './WeatherInfo';
import { WeatherStats } from './WeatherStats';
import { WeatherAlerts } from './WeatherAlerts';
import { ThemeToggle } from './ui/ThemeToggle';
import { useWeather } from '../hooks/useWeather';
import { WeatherScene } from './3d/WeatherScene';
import { Loading } from './ui/Loading';
import { useWeatherStore } from '../store/weatherStore';

export const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('London');
  const { weatherData, loading, error } = useWeather(city);
  const { alerts, dismissAlert } = useWeatherStore();

  useEffect(() => {
    if (weatherData) {
      // Example of adding weather alerts based on conditions
      if (weatherData.main.temp > 303.15) { // > 30°C
        useWeatherStore.getState().addAlert({
          type: 'warning',
          message: 'High temperature alert: Stay hydrated and avoid prolonged sun exposure',
          time: new Date().toLocaleTimeString(),
        });
      }
    }
  }, [weatherData]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-blue-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <header className="w-full p-4 flex justify-between items-center">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Weather3D
        </motion.h1>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <SearchBar onSearch={setCity} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <motion.div 
            className="lg:col-span-3 h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <WeatherScene weather={weatherData?.weather[0]?.main} />
          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {loading ? (
              <div className="h-full flex justify-center items-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                {error}
              </div>
            ) : weatherData ? (
              <WeatherInfo data={weatherData} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 p-4">
                No weather data available
              </div>
            )}
          </motion.div>
        </div>

        {weatherData && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <WeatherStats data={weatherData} />
          </motion.div>
        )}
      </main>

      <WeatherAlerts alerts={alerts} onDismiss={dismissAlert} />

      <footer className="text-center p-4 text-gray-600 dark:text-gray-400 text-sm">
        <p>© 2025 Weather3D | Powered by OpenWeatherMap</p>
      </footer>
    </div>
  );
};
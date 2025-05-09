import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Thermometer, Calendar, Clock } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherInfoProps {
  data: WeatherData;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ data }) => {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <motion.div 
        className="p-6 text-center border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{data.name}, {data.sys.country}</h2>
        <div className="flex items-center justify-center space-x-2">
          <Calendar size={16} className="text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{formatDate(data.dt)}</span>
          <Clock size={16} className="text-blue-500 ml-2" />
          <span className="text-sm text-gray-600 dark:text-gray-300">{formatTime(data.dt)}</span>
        </div>
      </motion.div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={getWeatherIcon(data.weather[0].icon)} 
              alt={data.weather[0].description} 
              className="w-20 h-20"
            />
            <div>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
                {kelvinToCelsius(data.main.temp)}°C
              </h3>
              <p className="text-gray-600 dark:text-gray-300 capitalize">
                {data.weather[0].description}
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-gray-700 dark:text-gray-300">
              Feels like: <span className="font-semibold text-gray-800 dark:text-white">
                {kelvinToCelsius(data.main.feels_like)}°C
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Max: <span className="font-semibold text-gray-800 dark:text-white">
                {kelvinToCelsius(data.main.temp_max)}°C
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Min: <span className="font-semibold text-gray-800 dark:text-white">
                {kelvinToCelsius(data.main.temp_min)}°C
              </span>
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
            <Wind className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {Math.round(data.wind.speed * 3.6)} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
            <Droplets className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {data.main.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
            <Thermometer className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pressure</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {data.main.pressure} hPa
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise & Sunset</p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-gray-800 dark:text-white font-medium">
                {formatTime(data.sys.sunrise)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sunrise</p>
            </div>
            <div className="h-0.5 flex-grow mx-4 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full"></div>
            <div>
              <p className="text-gray-800 dark:text-white font-medium">
                {formatTime(data.sys.sunset)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sunset</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
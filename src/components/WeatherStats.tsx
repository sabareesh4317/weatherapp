import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Compass, Wind, Droplets, Sun } from 'lucide-react';

interface WeatherStatsProps {
  data: any; // Replace with proper type
}

export const WeatherStats: React.FC<WeatherStatsProps> = ({ data }) => {
  // Mock forecast data - replace with real API data
  const forecastData = Array.from({ length: 24 }, (_, i) => ({
    time: format(new Date(Date.now() + i * 3600000), 'HH:mm'),
    temperature: Math.round(20 + Math.sin(i / 3) * 5),
    humidity: Math.round(60 + Math.cos(i / 4) * 10),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">24-Hour Forecast</h3>
      
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9CA3AF" opacity={0.2} />
            <XAxis 
              dataKey="time"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg"
        >
          <Wind className="w-6 h-6 text-blue-500 mb-2" />
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Wind Direction</h4>
          <div className="flex items-center mt-1">
            <Compass className="w-4 h-4 text-blue-500 mr-2" />
            <p className="text-lg font-medium text-gray-800 dark:text-white">NE 12 km/h</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-50 dark:bg-slate-700 p-4 rounded-lg"
        >
          <Droplets className="w-6 h-6 text-purple-500 mb-2" />
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Precipitation</h4>
          <p className="text-lg font-medium text-gray-800 dark:text-white">30%</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-50 dark:bg-slate-700 p-4 rounded-lg"
        >
          <Sun className="w-6 h-6 text-orange-500 mb-2" />
          <h4 className="text-sm text-gray-500 dark:text-gray-400">UV Index</h4>
          <p className="text-lg font-medium text-gray-800 dark:text-white">6 - High</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-50 dark:bg-slate-700 p-4 rounded-lg"
        >
          <div className="w-6 h-6 text-green-500 mb-2">AQI</div>
          <h4 className="text-sm text-gray-500 dark:text-gray-400">Air Quality</h4>
          <p className="text-lg font-medium text-gray-800 dark:text-white">Good - 42</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';

export const useWeather = (city: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // NOTE: In a real application, you would use your own API key and properly secure it
        // For demonstration purposes, we're using a mock API fetch implementation
        // const API_KEY = 'your-api-key';
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        
        // Mock API response for demonstration
        const mockWeatherData = getMockWeatherData(city);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setWeatherData(mockWeatherData);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, loading, error };
};

// Mock weather data generator for demonstration
const getMockWeatherData = (city: string): WeatherData => {
  // Get a consistent but random-looking weather type based on city name
  const cityHash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const weatherTypes = ['Clear', 'Rain', 'Clouds', 'Snow', 'Thunderstorm'];
  const weatherType = weatherTypes[cityHash % weatherTypes.length];
  
  // Generate a random but reasonable temperature based on weather type
  let tempBase;
  switch (weatherType) {
    case 'Snow':
      tempBase = 268; // Around -5°C
      break;
    case 'Rain':
    case 'Thunderstorm':
      tempBase = 283; // Around 10°C
      break;
    case 'Clouds':
      tempBase = 288; // Around 15°C
      break;
    case 'Clear':
      tempBase = 298; // Around 25°C
      break;
    default:
      tempBase = 293; // Around 20°C
  }
  
  // Add some random variation
  const temp = tempBase + (Math.random() * 5 - 2.5);
  
  // Calculate sunrise and sunset times
  const now = Math.floor(Date.now() / 1000);
  const sunrise = now - 21600; // 6 hours ago
  const sunset = now + 21600; // 6 hours from now
  
  return {
    coord: {
      lon: 10,
      lat: 10
    },
    weather: [
      {
        id: 800,
        main: weatherType,
        description: weatherType.toLowerCase(),
        icon: getWeatherIcon(weatherType)
      }
    ],
    base: 'stations',
    main: {
      temp: temp,
      feels_like: temp - 2,
      temp_min: temp - 2,
      temp_max: temp + 2,
      pressure: 1013,
      humidity: weatherType === 'Rain' || weatherType === 'Thunderstorm' ? 85 : 60
    },
    visibility: 10000,
    wind: {
      speed: 3 + Math.random() * 5,
      deg: Math.floor(Math.random() * 360)
    },
    clouds: {
      all: weatherType === 'Clear' ? 0 : weatherType === 'Clouds' ? 75 : 100
    },
    dt: Math.floor(Date.now() / 1000),
    sys: {
      type: 1,
      id: 12345,
      country: 'Demo',
      sunrise: sunrise,
      sunset: sunset
    },
    timezone: 0,
    id: 123456,
    name: city,
    cod: 200
  };
};

// Helper to determine weather icon based on condition
const getWeatherIcon = (weatherType: string): string => {
  switch (weatherType) {
    case 'Clear':
      return '01d';
    case 'Clouds':
      return '03d';
    case 'Rain':
      return '10d';
    case 'Snow':
      return '13d';
    case 'Thunderstorm':
      return '11d';
    default:
      return '01d';
  }
};
import { create } from 'zustand';
import { WeatherData } from '../types/weather';

interface Alert {
  id: string;
  type: 'warning' | 'severe' | 'info';
  message: string;
  time: string;
}

interface WeatherStore {
  weatherData: WeatherData | null;
  alerts: Alert[];
  setWeatherData: (data: WeatherData | null) => void;
  addAlert: (alert: Omit<Alert, 'id'>) => void;
  dismissAlert: (id: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  alerts: [],
  setWeatherData: (data) => set({ weatherData: data }),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        ...state.alerts,
        {
          ...alert,
          id: Math.random().toString(36).substring(7),
        },
      ],
    })),
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
}));
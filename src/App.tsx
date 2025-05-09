import React, { useState, useEffect } from 'react';
import { WeatherApp } from './components/WeatherApp';
import { Loading } from './components/ui/Loading';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {loading ? (
        <Loading />
      ) : (
        <WeatherApp />
      )}
    </ThemeProvider>
  );
}

export default App;
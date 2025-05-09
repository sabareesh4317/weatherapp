import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

// Popular cities for suggestions
const POPULAR_CITIES = [
  'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 
  'Berlin', 'Rome', 'Madrid', 'Moscow', 'Dubai',
  'Singapore', 'Toronto', 'San Francisco', 'Miami'
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = POPULAR_CITIES.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative" ref={inputRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="w-full p-4 pl-12 pr-16 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-2 border-blue-200 dark:border-blue-900 focus:border-blue-400 dark:focus:border-blue-600 shadow-lg outline-none transition-all duration-300 text-gray-800 dark:text-gray-200"
        />
        <Search className="absolute left-4 text-blue-500 dark:text-blue-400" size={20} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="absolute right-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300"
        >
          Search
        </motion.button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute mt-2 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
        >
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 hover:bg-blue-100 dark:hover:bg-slate-700 cursor-pointer text-gray-800 dark:text-gray-200 transition-colors duration-150"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};
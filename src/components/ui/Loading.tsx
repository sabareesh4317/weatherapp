import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Cloud className="w-20 h-20 text-blue-500 dark:text-blue-400" />
      </motion.div>
      
      <motion.div 
        className="mt-6 w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      <motion.p 
        className="mt-4 text-gray-600 dark:text-gray-300 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading Weather Data...
      </motion.p>
    </div>
  );
};
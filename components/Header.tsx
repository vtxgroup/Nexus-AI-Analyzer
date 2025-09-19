
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, SystemIcon } from './icons/ThemeIcons';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const iconMap = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <SystemIcon />,
  };
  
  const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];

  return (
    <header className="py-4 px-4 md:px-8 border-b border-light-border dark:border-dark-border bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl md:text-2xl font-display font-bold text-light-primary dark:text-dark-primary">
            Nexus AI Analyzer
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-1 bg-light-bg dark:bg-dark-bg p-1 rounded-full border border-light-border dark:border-dark-border"
        >
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`relative p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg focus:ring-light-primary dark:focus:ring-dark-primary ${
                theme !== t ? 'hover:bg-gray-200 dark:hover:bg-gray-700' : ''
              }`}
              aria-label={`Switch to ${t} theme`}
            >
              <span className="relative z-10 w-6 h-6 flex items-center justify-center text-light-text dark:text-dark-text">
                {iconMap[t]}
              </span>
              {theme === t && (
                <motion.div
                  layoutId="theme-bubble"
                  className="absolute inset-0 bg-white dark:bg-dark-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

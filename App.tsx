
import React from 'react';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/Header';
import ContentProcessor from './components/ContentProcessor';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-500">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <ContentProcessor />
        </main>
        <footer className="text-center p-4 text-xs text-gray-500 dark:text-gray-400">
          <p>Powered by Gemini API. Designed for futuristic analysis.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;

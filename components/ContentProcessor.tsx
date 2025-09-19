
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeText } from '../services/geminiService';
import type { AnalysisResult } from '../types';
import SummaryDisplay from './SummaryDisplay';
import KeywordsDisplay from './KeywordsDisplay';
import Loader from './Loader';
import { BrainCircuitIcon } from './icons/AppIcons';

const ContentProcessor: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeText(inputText);
      setAnalysisResult(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border">
        <h2 className="text-lg font-bold mb-4 text-light-primary dark:text-dark-primary font-display">Input Text</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or type your text here for AI analysis..."
          className="w-full h-48 p-4 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-all duration-300 resize-none"
          disabled={isLoading}
        />
        <div className="mt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalysis}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-light-primary dark:bg-dark-primary text-white font-bold rounded-full shadow-md hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 animate-pulse-glow"
          >
            {isLoading ? (
              <>
                <Loader />
                Analyzing...
              </>
            ) : (
               <>
                <BrainCircuitIcon />
                Analyze
               </>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg"
          >
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <SummaryDisplay summary={analysisResult.summary} />
            <KeywordsDisplay keywords={analysisResult.keywords} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentProcessor;

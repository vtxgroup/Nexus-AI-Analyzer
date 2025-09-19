
import React from 'react';
import { motion } from 'framer-motion';
import { TagsIcon } from './icons/AppIcons';

interface KeywordsDisplayProps {
  keywords: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } },
};

const KeywordsDisplay: React.FC<KeywordsDisplayProps> = ({ keywords }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <TagsIcon />
        <h3 className="text-lg font-bold text-light-primary dark:text-dark-primary font-display">Extracted Keywords</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {keywords.map((keyword, index) => (
          <motion.span
            key={index}
            variants={tagVariants}
            className="px-4 py-2 bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-text border border-light-primary/20 dark:border-dark-primary/40 rounded-full text-sm font-medium"
          >
            {keyword}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default KeywordsDisplay;

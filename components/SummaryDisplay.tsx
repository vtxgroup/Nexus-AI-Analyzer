
import React from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon } from './icons/AppIcons';

interface SummaryDisplayProps {
  summary: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
};

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border border-light-border dark:border-dark-border"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
         <FileTextIcon />
        <h3 className="text-lg font-bold text-light-primary dark:text-dark-primary font-display">AI Summary</h3>
      </motion.div>
      <motion.p variants={itemVariants} className="text-base leading-relaxed whitespace-pre-wrap">
        {summary}
      </motion.p>
    </motion.div>
  );
};

export default SummaryDisplay;

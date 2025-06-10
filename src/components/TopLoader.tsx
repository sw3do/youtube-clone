import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopLoaderProps {
  loading: boolean;
}

export default function TopLoader({ loading }: TopLoaderProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 z-[9999] origin-left shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.3)'
          }}
        >
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
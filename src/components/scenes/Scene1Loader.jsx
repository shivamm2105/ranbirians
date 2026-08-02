import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

export default function Scene1Loader({ onStartJourney }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12 + 6);
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-[#080503]"
    >
      {/* Background Soft Glow Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* School Crest / Badge Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 150 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl glass-panel border border-amber-400/40 flex items-center justify-center shadow-2xl gold-glow">
          <GraduationCap className="w-12 h-12 md:w-16 md:h-16 text-amber-400 animate-pulse" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute -inset-3 rounded-full border border-dashed border-amber-400/30 pointer-events-none"
        />
      </motion.div>

      {/* Chalk / Handwriting Reveals */}
      <div className="space-y-4 max-w-xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-3xl font-handwriting text-amber-300 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
          ✨ Welcome Ranbirians ✨
          <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-md"
        >
          Ranbir International School
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="inline-block px-5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 font-semibold text-sm md:text-base tracking-widest uppercase"
        >
          Class X - Batch 2020
        </motion.div>
      </div>

      {/* Progress & Start Journey Section */}
      <div className="mt-12 w-full max-w-sm flex flex-col items-center">
        {!isLoaded ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full space-y-3"
          >
            <div className="flex justify-between items-center text-xs font-semibold text-amber-300/80 px-1">
              <span className="font-handwriting text-lg">Loading Memories...</span>
              <span>{loadingProgress}%</span>
            </div>

            {/* Custom Glowing Progress Bar */}
            <div className="w-full h-3 rounded-full bg-black/60 border border-amber-500/30 overflow-hidden p-0.5 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                style={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="flex flex-col items-center space-y-4"
          >
            <p className="text-xl md:text-2xl font-handwriting text-amber-200 animate-pulse">
              Memories are waiting...
            </p>

            <motion.button
              onClick={onStartJourney}
              whileHover={{ scale: 1.08, boxShadow: "0 0 35px rgba(251, 191, 36, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-extrabold text-lg md:text-xl shadow-2xl flex items-center gap-3 group tracking-wider uppercase border border-yellow-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                START JOURNEY 🚀
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Button Shimmer Overlay */}
              <div className="absolute inset-0 shimmer-beam opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

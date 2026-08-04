import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { endingTexts } from '../../data/creditsData';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

export default function FinalPhotoEnding({ onReplay }) {
  const [textStep, setTextStep] = useState(0);

  useEffect(() => {
    // Step progression for cinematic photo text overlay
    const interval = setInterval(() => {
      setTextStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-amber-50 py-16 px-4"
    >
      {/* BACKGROUND CLASS GROUP PHOTO (Ken Burns Effect + Golden Filter) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Placeholder Group Photo - Easily replaceable with local photo e.g. /images/group-photo.jpg */}
        <motion.img
          src="/images/memory/farewell.jpeg"
          alt="Ranbirians Class Group Photo"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover filter sepia-[0.25] contrast-[1.08] brightness-[0.45] hue-rotate-[-10deg]"
        />

        {/* Soft Vignette & Golden Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center, transparent 30%, rgba(8, 5, 3, 0.85) 80%, rgba(0, 0, 0, 0.98) 100%),
              linear-gradient(to bottom, rgba(8, 5, 3, 0.7) 0%, transparent 20%, transparent 80%, rgba(0, 0, 0, 0.95) 100%)
            `
          }}
        />

        {/* Golden Warm Shimmer Particles */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* OVERLAY CONTENT */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center min-h-[70vh] space-y-8 px-4">

        {/* TEXT SEQUENCE STEPS 0 - 3 */}
        {textStep < 4 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={textStep}
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -25 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-4 py-8"
            >
              <motion.h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                {endingTexts[textStep]}
              </motion.h2>
            </motion.div>
          </AnimatePresence>
        )}

        {/* STEP 4: FINAL THANK YOU & REPLAY BUTTON */}
        {textStep >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="space-y-10 py-6 flex flex-col items-center"
          >
            {/* Main Thank You Message */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-amber-400/40 text-amber-300 text-sm font-semibold uppercase tracking-widest"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Final Destination
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif-heading gold-gradient-text tracking-wider uppercase drop-shadow-[0_15px_30px_rgba(245,158,11,0.3)]">
                Thank You ❤️
              </h1>

              <p className="text-base sm:text-xl font-handwriting text-amber-200/90 tracking-widest pt-2">
                See You Again, Ranbirians...
              </p>
            </div>

            {/* REPLAY JOURNEY BUTTON */}
            <motion.button
              onClick={onReplay}
              whileHover={{ scale: 1.08, boxShadow: "0 0 35px rgba(245, 158, 11, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-bold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_25px_rgba(245,158,11,0.3)] border border-amber-300/60 transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5 text-black group-hover:-rotate-180 transition-transform duration-700 ease-out" />
              <span>Replay Journey</span>
            </motion.button>


          </motion.div>
        )}

      </div>
    </motion.div>
  );
}

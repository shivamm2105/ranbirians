import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ChevronDown, Heart, Bookmark } from 'lucide-react';

export default function Scene4Hero({ onScrollToWall }) {
  const [isDiaryOpen, setIsDiaryOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden bg-[#080503] pt-24">
      {/* Background Slow Zoom Image Placeholder with Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full bg-cover bg-center opacity-25 filter blur-sm"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(8, 5, 3, 0.95) 80%), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop')`
          }}
        />
        {/* Soft Radial Ambient Spotlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080503] via-transparent to-[#080503]/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 my-auto">
        {/* Top Crest Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-amber-400/40 text-amber-300 font-semibold text-xs md:text-sm tracking-widest uppercase shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          Ranbirians Batch 2020
          <Sparkles className="w-4 h-4 text-amber-400" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif-heading gold-gradient-text tracking-tight drop-shadow-2xl leading-none"
        >
          Ranbir International School
        </motion.h1>

        {/* Batch Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl font-bold text-amber-200/90 font-serif-heading tracking-wide"
        >
          Class X - Batch 2020
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl font-handwriting text-amber-300 max-w-2xl flex items-center justify-center gap-2"
        >
          "The chapter we will never forget <Heart className="w-5 h-5 text-rose-500 fill-current inline" />"
        </motion.p>

        {/* ANIMATED SCHOOL DIARY / CARD OPENING EFFECT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="w-full max-w-md my-6 perspective-1000"
        >
          <div
            onClick={() => setIsDiaryOpen(!isDiaryOpen)}
            className="cursor-pointer group relative rounded-3xl glass-card border border-amber-500/40 p-6 md:p-8 shadow-2xl transition-all duration-500 hover:border-amber-400/80 overflow-hidden"
          >
            {/* Diary Ribbon Bookmark */}
            <div className="absolute top-0 right-8 text-amber-500 opacity-80 group-hover:opacity-100 transition-opacity">
              <Bookmark className="w-8 h-10 fill-current" />
            </div>

            <div className="flex items-center justify-center gap-3 text-amber-400 mb-3">
              <BookOpen className={`w-8 h-8 transition-transform duration-500 ${isDiaryOpen ? 'rotate-12 scale-110' : ''}`} />
              <span className="text-sm font-bold uppercase tracking-widest text-amber-300">
                {isDiaryOpen ? 'Class X Memory Diary Opened 📖' : 'Click to Open School Diary 🎒'}
              </span>
            </div>

            {/* Inner Animated Diary Text */}
            <motion.div
              animate={{ height: isDiaryOpen ? 'auto' : '60px' }}
              className="overflow-hidden"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold font-handwriting text-amber-100 mt-2">
                Our Story Begins Here...
              </h3>

              {isDiaryOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans space-y-2 border-t border-amber-500/20 pt-3"
                >
                  <p>
                    From morning assemblies to last bench gossip, from sharing lunch boxes to studying 1 day before exams...
                  </p>
                  <p className="font-semibold text-amber-400">
                    Scroll down to walk down memory lane with all 26 Ranbirians! ✨
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={onScrollToWall}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="relative z-10 flex flex-col items-center gap-2 text-amber-400/80 hover:text-amber-200 transition-colors group cursor-pointer pb-6"
      >
        <span className="text-sm md:text-base font-handwriting tracking-wider text-amber-300">
          ↓ Enter Memories
        </span>
        <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center glass-panel group-hover:border-amber-400 shadow-lg">
          <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </motion.button>
    </section>
  );
}

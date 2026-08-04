import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memoryList } from '../../data/memoryData';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Heart, Calendar, Bookmark } from 'lucide-react';

export default function MemoryNotebook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [isFlipping, setIsFlipping] = useState(false);

  const currentMemory = memoryList[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === memoryList.length - 1;

  const handleNext = () => {
    if (isLastPage || isFlipping) return;
    setIsFlipping(true);
    setDirection(1);
    setCurrentPage((prev) => prev + 1);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handlePrev = () => {
    if (isFirstPage || isFlipping) return;
    setIsFlipping(true);
    setDirection(-1);
    setCurrentPage((prev) => prev - 1);
    setTimeout(() => setIsFlipping(false), 600);
  };

  // Render stylized SVG art fallback if image fails to load
  const renderFallbackSVG = (svgType) => {
    return (
      <svg viewBox="0 0 400 250" className="w-full h-full object-cover">
        <defs>
          <linearGradient id={`notebook-grad-${svgType}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2A1B0E" />
            <stop offset="50%" stopColor="#191008" />
            <stop offset="100%" stopColor="#0A0603" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#notebook-grad-${svgType})`} />
        <circle cx="200" cy="125" r="90" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
        <text x="50%" y="45%" dominantBaseline="middle" textAnchor="middle" fill="#FFD700" fontSize="28" fontFamily="serif" fontWeight="bold">
          Ranbirian Memory
        </text>
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#F59E0B" fontSize="16" fontFamily="sans-serif" opacity="0.8">
          Class X • Batch 2020
        </text>
      </svg>
    );
  };

  return (
    <section className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#080503] overflow-hidden my-12">
      {/* Soft Background Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TITLE ABOVE NOTEBOOK */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          Memory Vault Diary
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-xl"
        >
          Let's Open Our Memory Diary 📖
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl font-handwriting text-amber-200/90"
        >
          "Flip through the pages of our unforgettable school days..."
        </motion.p>
      </div>

      {/* NOTEBOOK CONTAINER WITH 3D PERSPECTIVE */}
      <div className="relative z-10 max-w-4xl mx-auto perspective-1200 px-2 sm:px-4">
        {/* Realistic Notebook Exterior Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="relative w-full rounded-2xl md:rounded-3xl p-3 sm:p-5 md:p-8 bg-gradient-to-br from-[#2b1b11] via-[#1c120a] to-[#120a05] border border-amber-600/30 shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
        >
          {/* Leather Stitching Edge Line */}
          <div className="absolute inset-2 sm:inset-3 rounded-xl md:rounded-2xl border border-dashed border-amber-500/20 pointer-events-none" />

          {/* Diary Binder Spiral Rings on Left / Spine */}
          <div className="absolute top-6 bottom-6 left-2 sm:left-4 w-4 flex flex-col justify-between z-30 pointer-events-none hidden sm:flex">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-6 h-3 rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-900 -ml-2" />
            ))}
          </div>

          {/* Top Bookmark Ribbon */}
          <div className="absolute top-0 right-10 text-amber-500 z-30 filter drop-shadow-md">
            <Bookmark className="w-8 h-12 fill-amber-500 text-amber-400" />
          </div>

          {/* AGED PAPER INSIDE PAGE */}
          <div className="relative w-full min-h-[460px] md:min-h-[520px] rounded-xl bg-[#FAF5E8] text-slate-900 p-5 sm:p-8 md:p-10 shadow-inner flex flex-col justify-between overflow-hidden border border-amber-900/10">
            {/* Paper Texture Overlay & Subtle Ruling Lines */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#d4a373 0.75px, transparent 0.75px), linear-gradient(to bottom, rgba(180, 130, 80, 0.08) 1px, transparent 1px)`,
                backgroundSize: `24px 24px, 100% 32px`
              }}
            />

            {/* 3D PAGE TURN FLIP ANIMATION WRAPPER */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                initial={{
                  rotateY: direction > 0 ? 80 : -80,
                  opacity: 0,
                  transformOrigin: direction > 0 ? "left center" : "right center"
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] }
                }}
                exit={{
                  rotateY: direction > 0 ? -80 : 80,
                  opacity: 0,
                  transformOrigin: direction > 0 ? "right center" : "left center",
                  transition: { duration: 0.45, ease: [0.5, 0, 0.75, 0] }
                }}
                className="relative z-10 flex flex-col items-center flex-1 justify-between"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* PAGE HEADER */}
                <div className="w-full flex items-center justify-between border-b-2 border-amber-900/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-widest font-serif text-amber-900">
                      MEMORY NOTEBOOK
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full border border-amber-900/20">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentMemory.date}</span>
                  </div>
                </div>

                {/* MEMORY PHOTO FRAME */}
                <div className="w-full max-w-xl aspect-[16/9] sm:aspect-[16/10] rounded-lg overflow-hidden bg-slate-900 border-4 border-white shadow-xl relative group my-2">
                  <img
                    src={currentMemory.image}
                    alt={currentMemory.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to stylized SVG if image link fails
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden absolute inset-0">
                    {renderFallbackSVG(currentMemory.svgType)}
                  </div>

                  {/* Photo Corner Strips */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/80 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/80 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/80 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/80 pointer-events-none" />
                </div>

                {/* MEMORY TITLE & SUBTITLE */}
                <div className="text-center my-4 space-y-2 max-w-xl px-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-handwriting text-slate-900 leading-snug">
                    "{currentMemory.title}"
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 font-sans leading-relaxed">
                    {currentMemory.subtitle}
                  </p>
                </div>

                {/* PAGE NUMBER COUNTER */}
                <div className="w-full flex items-center justify-between border-t border-amber-900/15 pt-3 mt-2 text-xs font-bold text-amber-900/70">
                  <span className="font-handwriting text-base text-amber-800">
                    Ranbirians Batch 2020
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-amber-200/50 border border-amber-900/20 font-mono">
                    Page {currentPage + 1} of {memoryList.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* BOTTOM CONTROLS (PREV & NEXT BUTTONS) */}
        <div className="mt-8 flex items-center justify-between max-w-xl mx-auto px-4">
          <motion.button
            onClick={handlePrev}
            disabled={isFirstPage || isFlipping}
            whileHover={!isFirstPage ? { scale: 1.05 } : {}}
            whileTap={!isFirstPage ? { scale: 0.95 } : {}}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm md:text-base tracking-wider uppercase shadow-xl transition-all ${isFirstPage
              ? 'opacity-40 cursor-not-allowed bg-amber-950/40 text-amber-600/50 border border-amber-900/30'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 text-amber-950 hover:brightness-110 border border-amber-300 shadow-amber-500/20'
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>PREV</span>
          </motion.button>

          {/* Quick Page Indicator Dots */}
          <div className="flex space-x-1.5">
            {memoryList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isFlipping) return;
                  setDirection(idx > currentPage ? 1 : -1);
                  setCurrentPage(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentPage
                  ? 'w-7 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                  : 'bg-amber-800/50 hover:bg-amber-600'
                  }`}
                title={`Go to page ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={isLastPage || isFlipping}
            whileHover={!isLastPage ? { scale: 1.05 } : {}}
            whileTap={!isLastPage ? { scale: 0.95 } : {}}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm md:text-base tracking-wider uppercase shadow-xl transition-all ${isLastPage
              ? 'opacity-40 cursor-not-allowed bg-amber-950/40 text-amber-600/50 border border-amber-900/30'
              : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 hover:brightness-110 border border-yellow-200 shadow-amber-500/20'
              }`}
          >
            <span>NEXT</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* ENDING OF THIS SECTION: Emotional Quote */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="relative z-10 max-w-2xl mx-auto text-center mt-16 px-4"
      >
        <div className="p-6 rounded-2xl glass-panel border border-amber-400/30 shadow-xl">
          <p className="text-xl md:text-3xl font-handwriting text-amber-200 leading-relaxed">
            "Every pic has a story... Every memory has a feeling <Heart className="w-5 h-5 text-rose-500 inline fill-current" />"
          </p>
        </div>
      </motion.div>
    </section>
  );
}

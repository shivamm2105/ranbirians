import React from 'react';
import { motion } from 'framer-motion';
import { creditsContent } from '../../data/creditsData';

export default function CreditsRoll({ onComplete }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[650px] sm:h-[700px] overflow-hidden flex justify-center items-center py-6 px-4">
      {/* Top and Bottom Gradient Fades for Cinematic Depth */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

      {/* Rolling Credits Container */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 40,
          ease: "linear"
        }}
        onAnimationComplete={onComplete}
        className="w-full flex flex-col items-center text-center space-y-14 py-8 text-amber-100 font-sans pointer-events-auto"
      >
        {/* Header */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="text-amber-400 text-4xl mb-2 animate-bounce">🎓</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif-heading gold-gradient-text tracking-wider uppercase drop-shadow-lg">
            {creditsContent.header.school}
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-semibold text-amber-200/90 tracking-[0.25em] uppercase">
            {creditsContent.header.class} • {creditsContent.header.batch}
          </p>
          <div className="text-3xl text-red-500 animate-pulse pt-2">
            {creditsContent.header.icon}
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent my-4" />

        {/* Dynamic Sections */}
        {creditsContent.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-6 max-w-lg mx-auto w-full">
            <h3 className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-amber-400/90 border-b border-amber-500/30 pb-2.5">
              {section.title}
            </h3>

            <div className="flex flex-col items-center space-y-2.5">
              {section.items.map((item, iIdx) => (
                <p
                  key={iIdx}
                  className={`tracking-wide ${section.title === "OUR RANBIRIANS"
                    ? "text-base sm:text-lg md:text-xl font-bold text-amber-100 hover:text-amber-300 transition-colors py-0.5"
                    : "text-sm sm:text-base font-medium text-amber-200/90"
                    }`}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

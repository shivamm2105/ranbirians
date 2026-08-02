import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { memoryLetters } from '../../data/memoryLetters';
import { Mail, MailOpen, X, Heart, Sparkles, Send, Stamp, Feather } from 'lucide-react';

export default function MemoryLetters() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!selectedLetter) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText('');
    const fullText = selectedLetter.message;
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [selectedLetter]);

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#080503] overflow-hidden my-8">
      {/* Background Soft Glow & Paper Dust Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest"
        >
          <Mail className="w-4 h-4 text-amber-400" />
          Scene 7 • Secret Letters Box
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-heading text-amber-200/90 tracking-wide"
        >
          "Some words we never forget..."
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-xl"
        >
          Let's read them today ❤️
        </motion.h2>
      </div>

      {/* VINTAGE MEMORY ENVELOPE BOX */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 100 }}
          className="p-6 sm:p-8 md:p-12 rounded-3xl glass-card border border-amber-500/30 shadow-2xl relative"
        >
          {/* Subtle Box Header Badge */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-8">
            <div className="flex items-center gap-2 text-amber-300">
              <Feather className="w-5 h-5 text-amber-400" />
              <span className="font-serif-heading text-lg font-bold">
                Ranbirian Memory Box
              </span>
            </div>
            <span className="text-xs font-semibold text-amber-400/70 uppercase tracking-widest">
              {memoryLetters.length} Unopened Letters
            </span>
          </div>

          {/* ENVELOPES GRID */}
          {/* Mobile: 1 column | Tablet: 2 columns | Desktop: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {memoryLetters.map((letter, index) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedLetter(letter)}
                className="cursor-pointer group relative rounded-2xl bg-gradient-to-br from-[#27190f] via-[#1a100a] to-[#100905] p-5 border border-amber-600/30 shadow-xl hover:border-amber-400/70 transition-all duration-300 overflow-hidden"
              >
                {/* Envelope Flap & Wax Seal Stamp Effect */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-bl from-amber-500/20 via-transparent to-transparent rounded-bl-3xl" />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:text-amber-200 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>

                  <div className="px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-[11px] font-bold text-amber-300 font-mono">
                    Letter {letter.letterNo}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {letter.tag}
                  </span>
                  <h4 className="text-xl font-bold font-serif-heading text-amber-100 group-hover:text-amber-300 transition-colors pt-1">
                    {letter.title}
                  </h4>
                  <p className="text-xs text-amber-400/60 font-sans line-clamp-1">
                    From: {letter.sender}
                  </p>
                </div>

                {/* Click to open prompt */}
                <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between text-xs text-amber-300/80 font-semibold group-hover:text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Click to Open ✉️
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* INTERACTIVE OPENED LETTER MODAL WITH PAPER SLIDE & TYPING ANIMATION */}
      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLetter(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Letter Paper Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative w-full max-w-2xl bg-[#FAF5E8] text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-800/30 z-10 my-auto overflow-hidden"
            >
              {/* Paper Lines & Vintage Texture */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(180, 130, 80, 0.1) 1px, transparent 1px)`,
                  backgroundSize: `100% 32px`
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-900 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Opened Letter Header */}
              <div className="relative z-10 border-b-2 border-amber-900/20 pb-4 mb-6 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-800/80">
                    RANBIRIAN SECRET LETTER {selectedLetter.letterNo}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif-heading text-slate-900 mt-0.5">
                    {selectedLetter.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600">
                  <Stamp className="w-5 h-5" />
                </div>
              </div>

              {/* Main Handwritten Message Body with Typing Effect */}
              <div className="relative z-10 min-h-[160px] py-2">
                <p className="text-xl sm:text-2xl md:text-3xl font-handwriting text-slate-900 leading-relaxed">
                  "{displayedText}"
                  {isTyping && <span className="inline-block w-1.5 h-6 bg-amber-700 animate-pulse ml-1" />}
                </p>
              </div>

              {/* Opened Letter Footer */}
              <div className="relative z-10 border-t border-amber-900/20 pt-4 mt-6 flex items-center justify-between text-xs sm:text-sm font-semibold text-amber-900">
                <div className="flex items-center gap-1.5 text-amber-800">
                  <Feather className="w-4 h-4 text-amber-700" />
                  <span>From: {selectedLetter.sender}</span>
                </div>
                <div className="px-3 py-1 bg-amber-200/60 rounded-full border border-amber-900/20 font-bold text-amber-950 flex items-center gap-1">
                  <span>Batch 2022</span>
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ENDING OF SCENE 7: Transition Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl mx-auto text-center mt-20 md:mt-28 space-y-3"
      >
        <p className="text-2xl md:text-4xl font-serif-heading font-bold text-amber-300/90 tracking-wide">
          "Yahi baatein to hmesa yaad aayengi ❤️"
        </p>

      </motion.div>
    </section>
  );
}

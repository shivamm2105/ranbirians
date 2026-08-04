import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { guessWhoQuestions } from '../../data/guessWhoData';
import { HelpCircle, Sparkles, Trophy, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuessWho() {
  // State for card statuses: { [cardId]: { status: 'unrevealed' | 'counting' | 'revealed', count: number } }
  const [cardStates, setCardStates] = useState({});

  const startCountdown = (cardId) => {
    // If already counting or revealed, ignore
    const current = cardStates[cardId]?.status;
    if (current === 'counting' || current === 'revealed') return;

    setCardStates((prev) => ({
      ...prev,
      [cardId]: { status: 'counting', count: 3 }
    }));

    let currentCount = 3;
    const interval = setInterval(() => {
      currentCount -= 1;
      if (currentCount > 0) {
        setCardStates((prev) => ({
          ...prev,
          [cardId]: { status: 'counting', count: currentCount }
        }));
      } else {
        clearInterval(interval);
        setCardStates((prev) => ({
          ...prev,
          [cardId]: { status: 'revealed', count: 0 }
        }));

        // Confetti Burst upon reveal
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#F59E0B', '#10B981', '#EC4899']
        });
      }
    }, 700);
  };

  const resetCard = (cardId) => {
    setCardStates((prev) => ({
      ...prev,
      [cardId]: { status: 'unrevealed', count: 3 }
    }));
  };

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#080503] overflow-hidden my-8">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          Ranbirian Quiz Time
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-xl"
        >
          Guess Who? 🤔
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl font-handwriting text-amber-200/90"
        >
          "Some memories are funny... Some names are unforgettable 😂"
        </motion.p>
      </div>

      {/* CARDS GRID */}
      {/* Desktop: exactly 3 cards per row | Mobile: single column */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {guessWhoQuestions.map((q, idx) => {
          const state = cardStates[q.id]?.status || 'unrevealed';
          const count = cardStates[q.id]?.count || 3;

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
              whileHover={{ y: -8 }}
              className="relative w-full glass-card rounded-3xl p-6 md:p-8 border border-amber-500/30 shadow-2xl flex flex-col justify-between min-h-[300px] overflow-hidden group"
            >
              {/* TOP: Question Number & Tag */}
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">
                  Question {q.questionNo}
                </span>
                <span className="text-[11px] font-semibold text-amber-300/80 bg-amber-500/15 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  {q.tag}
                </span>
              </div>

              {/* CARD CONTENT STATES */}
              <AnimatePresence mode="wait">
                {state === 'unrevealed' && (
                  <motion.div
                    key="unrevealed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between space-y-6 my-auto"
                  >
                    {/* MIDDLE: Question Text */}
                    <div className="my-auto py-2">
                      <h4 className="text-xl sm:text-2xl font-bold font-serif-heading text-amber-100 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* BOTTOM: REVEAL ANSWER Button */}
                    <motion.button
                      onClick={() => startCountdown(q.id)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-extrabold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 border border-yellow-200 group-hover:shadow-amber-500/30 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-amber-950" />
                      REVEAL ANSWER
                    </motion.button>
                  </motion.div>
                )}

                {state === 'counting' && (
                  <motion.div
                    key="counting"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="flex-1 flex flex-col items-center justify-center py-6 space-y-3"
                  >
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                      Revealing in...
                    </span>

                    {/* Countdown Number Animation */}
                    <motion.div
                      key={count}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-6xl font-black font-serif-heading gold-gradient-text gold-glow-intense my-2"
                    >
                      {count}
                    </motion.div>
                  </motion.div>
                )}

                {state === 'revealed' && (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col justify-between space-y-4 my-auto text-center"
                  >
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded-full border border-emerald-500/30 mx-auto">
                      <PartyPopper className="w-3.5 h-3.5" />
                      Correct Answer 🎉
                    </div>

                    <div className="py-3">
                      <p className="text-xs text-amber-400/70 uppercase tracking-wider font-semibold mb-1">
                        Question: {q.question}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-handwriting text-amber-200 gold-glow">
                        {q.answer}
                      </h3>
                    </div>

                    <button
                      onClick={() => resetCard(q.id)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-200 transition-colors pt-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Guess Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

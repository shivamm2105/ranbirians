import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Scene2Celebration({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  const textSequence = [
    "One Batch...",
    "One Classroom...",
    "Countless Memories ❤️",
    "Welcome To Our Secret Memory Vault"
  ];

  useEffect(() => {
    // 1. Confetti & Fireworks Explosion
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    // Initial big burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA000', '#FF6F00', '#FFFFFF', '#EC4899']
    });

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#FFD700', '#F59E0B', '#EF4444', '#10B981']
      });
    }, 450);

    // 2. Text sequence timer
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < textSequence.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepTimer);
          return prev;
        }
      });
    }, 900);

    // 3. Move to Scene 3 after 3.8s
    const sceneTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearInterval(interval);
      clearInterval(stepTimer);
      clearTimeout(sceneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-[#080503]"
    >
      {/* Floating Animated Balloons in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '105vh', x: `${10 + i * 10}vw`, opacity: 0.8 }}
            animate={{ y: '-10vh', x: `${8 + i * 11}vw` }}
            transition={{
              duration: 4 + Math.random() * 2,
              ease: 'linear',
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute text-3xl md:text-5xl filter drop-shadow-lg"
          >
            {['🎈', '✨', '🎈', '🎉', '🎈', '✨'][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Cinematic Center Text Container */}
      <div className="relative z-10 max-w-2xl px-4 py-8 glass-panel rounded-3xl border border-amber-400/30 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.h2
            key={stepIndex}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`font-serif-heading font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-wide ${
              stepIndex === 3 ? 'gold-gradient-text gold-glow-intense' : 'text-amber-100'
            }`}
          >
            {textSequence[stepIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

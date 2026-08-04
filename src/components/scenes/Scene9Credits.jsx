import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { introTexts } from '../../data/creditsData';
import CreditsRoll from '../common/CreditsRoll';
import FinalPhotoEnding from '../common/FinalPhotoEnding';
import BackgroundParticles from '../common/BackgroundParticles';

export default function Scene9Credits({ onReplay }) {
  // Phase 0: Intro Text ("The End...", etc.)
  // Phase 1: Movie Credit Roll
  // Phase 2: Bonus Cinematic Photo Ending
  const [phase, setPhase] = useState(0);
  const [introStep, setIntroStep] = useState(0);

  const sectionRef = useRef(null);

  // Smoothly reduce background music volume to ~35% (0.35) when Scene 9 is active
  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      const initialVolume = audio.volume;
      const targetVolume = 0.35;
      const duration = 2000; // 2 seconds fade
      const steps = 20;
      const stepTime = duration / steps;
      const volumeStep = (initialVolume - targetVolume) / steps;

      let currentStep = 0;
      const fadeInterval = setInterval(() => {
        currentStep++;
        if (audio.volume - volumeStep > targetVolume) {
          audio.volume -= volumeStep;
        } else {
          audio.volume = targetVolume;
          clearInterval(fadeInterval);
        }

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
        }
      }, stepTime);

      return () => {
        clearInterval(fadeInterval);
      };
    }
  }, []);

  // Intro text sequence step management
  useEffect(() => {
    if (phase === 0) {
      const timer = setInterval(() => {
        setIntroStep((prev) => {
          if (prev < introTexts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            // Pause then transition to Phase 1 (Credits Roll)
            setTimeout(() => {
              setPhase(1);
            }, 2500);
            return prev;
          }
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  // When Credits Roll completes
  const handleCreditsComplete = () => {
    setPhase(2);
  };

  // Replay handler
  const handleReplayClick = () => {
    // Restore audio volume to normal if audio exists
    const audio = document.querySelector('audio');
    if (audio) {
      audio.volume = 0.6;
    }

    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="movie-credits"
      className="relative min-h-screen w-full bg-black text-amber-50 overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Floating Golden Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <BackgroundParticles />
      </div>

      {/* PHASE 0: INTRO TEXT SEQUENCE */}
      {phase === 0 && (
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-20 min-h-[60vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={introStep}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif-heading gold-gradient-text tracking-wider drop-shadow-2xl">
                {introTexts[introStep]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* PHASE 1: MOVIE STYLE CREDIT ROLL */}
      {phase === 1 && (
        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            <CreditsRoll onComplete={handleCreditsComplete} />
          </motion.div>
        </div>
      )}

      {/* PHASE 2: BONUS CINEMATIC PHOTO ENDING */}
      {phase === 2 && (
        <div className="relative z-10 w-full">
          <FinalPhotoEnding onReplay={handleReplayClick} />
        </div>
      )}
    </section>
  );
}

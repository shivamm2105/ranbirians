import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Scenes & Components
import Scene1Loader from './components/scenes/Scene1Loader';
import Scene2Celebration from './components/scenes/Scene2Celebration';
import Scene3Vault from './components/scenes/Scene3Vault';
import Scene4Hero from './components/scenes/Scene4Hero';
import Scene5MemoryWall from './components/scenes/Scene5MemoryWall';

import BackgroundParticles from './components/common/BackgroundParticles';
import AudioPlayer from './components/common/AudioPlayer';

export default function App() {
  const isMaintenance = true;
  if (isMaintenance) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img
          src="/images/memory/notice.jpg" /* Yahan apni image ka naam daalein */
          alt="Notice"
          className="w-full h-full object-contain max-w-4xl p-4"
        />
      </div>
    );
  }
  // Baaki saara purana code waisa hi rahega...
  const [currentScene, setCurrentScene] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const memoryWallRef = useRef(null);

  const handleStartJourney = () => {
    setCurrentScene(2);
  };

  const handleCelebrationComplete = () => {
    setCurrentScene(3);
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setCurrentScene(4);
  };

  const handleScrollToWall = () => {
    if (memoryWallRef.current) {
      memoryWallRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayJourney = () => {
    setCurrentScene(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#080503] text-amber-50 selection:bg-amber-500 selection:text-black overflow-x-hidden font-sans">
      {/* Golden Background Particles */}
      <BackgroundParticles />

      {/* Global Audio Controller */}
      <AudioPlayer isUnlocked={isUnlocked} />

      {/* Scene Transitions */}
      <AnimatePresence mode="wait">
        {currentScene === 1 && (
          <Scene1Loader key="scene1" onStartJourney={handleStartJourney} />
        )}

        {currentScene === 2 && (
          <Scene2Celebration key="scene2" onComplete={handleCelebrationComplete} />
        )}

        {currentScene === 3 && (
          <Scene3Vault key="scene3" onUnlockSuccess={handleUnlockSuccess} />
        )}

        {currentScene === 4 && (
          <motion.div
            key="scene4-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Header Brand Bar */}
            <nav className="fixed top-0 inset-x-0 z-40 bg-[#080503]/75 backdrop-blur-md border-b border-amber-500/20 px-6 py-3.5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <span className="font-serif-heading font-extrabold text-amber-200 tracking-wide text-sm md:text-base">
                  Ranbir International
                </span>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                Batch 2020
              </div>
            </nav>

            {/* Scene 4: Hero Section */}
            <Scene4Hero onScrollToWall={handleScrollToWall} />

            {/* Scene 5: Classmate Memory Wall & Final Movie Credits (Scene 9) */}
            <Scene5MemoryWall sectionRef={memoryWallRef} onReplayJourney={handleReplayJourney} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

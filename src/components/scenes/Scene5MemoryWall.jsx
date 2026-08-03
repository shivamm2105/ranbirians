import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { classmates } from '../../data/classmatesData';
import PolaroidCard from '../common/PolaroidCard';
import CardDetailModal from '../modals/CardDetailModal';
import MemoryNotebook from '../common/MemoryNotebook';
import MemoryLetters from '../common/MemoryLetters';
import GuessWho from '../common/GuessWho';
import Footer from '../common/Footer';
import { Sparkles, Search, Heart, Award, Flame } from 'lucide-react';

export default function Scene5MemoryWall({ sectionRef }) {
  const [selectedClassmate, setSelectedClassmate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClassmates = classmates.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section 
      ref={sectionRef} 
      id="memory-wall" 
      className="relative min-h-screen w-full py-20 px-4 sm:px-6 lg:px-12 bg-[#080503] overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          The Classmate Wall of Fame
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif-heading gold-gradient-text tracking-wide drop-shadow-xl"
        >
          Aayiye... Recall Karte Hai Apne Classmates Ko ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl font-handwriting text-amber-200/90 max-w-xl mx-auto"
        >
          "The people who made these years unforgettable..."
        </motion.p>

        {/* Search Bar for Classmates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-md mx-auto pt-4"
        >
          <div className="relative">
            <Search className="w-4 h-4 text-amber-400/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search classmate name or title..."
              className="w-full pl-11 pr-4 py-3 rounded-full glass-input text-amber-100 placeholder-amber-500/40 text-sm focus:outline-none focus:border-amber-400 transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber-400/70 hover:text-amber-200"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* POLAROID PHOTO WALL GRID */}
      {/* Mobile: 1 column | Tablet: 2 columns | Desktop: exactly 3 columns as required */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-14 pt-4">
        {filteredClassmates.map((classmate, idx) => (
          <PolaroidCard
            key={classmate.id}
            classmate={classmate}
            index={idx}
            onClick={(c) => setSelectedClassmate(c)}
          />
        ))}
      </div>

      {/* SCENE 6: Interactive 3D Memory Notebook */}
      <MemoryNotebook />

      {/* SCENE 7: Messages From The Heart */}
      <MemoryLetters />

      {/* SCENE 8: Guess Who Quiz Game */}
      <GuessWho />

      {/* FINAL EMOTIONAL ENDING SEQUENCE */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mt-20 md:mt-32 space-y-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-4xl font-serif-heading font-bold text-amber-300/90 tracking-wide">
            "Different Names..."
          </p>

          <p className="text-2xl md:text-4xl font-serif-heading font-bold text-amber-300/90 tracking-wide">
            "Different Stories..."
          </p>

          <p className="text-xl md:text-3xl font-serif-heading font-medium text-amber-400/80 tracking-wide">
            "But One Thing Was Common..."
          </p>
        </motion.div>

        {/* Large Text: WE WERE RANBIRIANS ❤️ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          className="pt-6"
        >
          <div className="inline-block p-8 md:p-12 rounded-3xl glass-panel border border-amber-400/40 shadow-2xl gold-glow-intense">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-serif-heading gold-gradient-text tracking-wider uppercase">
              WE WERE RANBIRIANS ❤️
            </h1>
            <p className="text-base md:text-xl font-handwriting text-amber-200 mt-4">
              Class X - Batch 2022 Forever In Our Hearts
            </p>
          </div>
        </motion.div>

        {/* Footer Note & Developer Credit */}
        <Footer />
      </div>

      {/* Classmate Detail Modal */}
      {selectedClassmate && (
        <CardDetailModal
          classmate={selectedClassmate}
          onClose={() => setSelectedClassmate(null)}
        />
      )}
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, MessageSquare, Send, Quote, UserCheck } from 'lucide-react';

export default function CardDetailModal({ classmate, onClose }) {
  const [noteInput, setNoteInput] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!classmate) return;
    const key = `ranbirians_notes_${classmate.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setSavedNotes(JSON.parse(stored));
      } catch (e) {}
    } else {
      setSavedNotes([]);
    }
  }, [classmate]);

  if (!classmate) return null;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    const newNote = {
      id: Date.now(),
      text: noteInput.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    localStorage.setItem(`ranbirians_notes_${classmate.id}`, JSON.stringify(updated));
    setNoteInput('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="relative w-full max-w-2xl glass-card rounded-3xl p-6 md:p-8 border border-amber-500/30 z-10 shadow-2xl overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-black/50 text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-200 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Avatar & Quick Info */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl bg-slate-900 relative group">
                {classmate.image ? (
                  <img
                    src={classmate.image}
                    alt={classmate.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'block';
                      }
                    }}
                  />
                ) : null}
                <div style={{ display: classmate.image ? 'none' : 'block' }} className="w-full h-full">
                  <svg viewBox="0 0 160 160" className="w-full h-full object-cover">
                    <rect width="160" height="160" fill={classmate.themeColor + '35'} />
                    <circle cx="80" cy="85" rx="32" ry="38" fill="#E5C19C" />
                    <circle cx="68" cy="80" r="4.5" fill="#2E1805" />
                    <circle cx="92" cy="80" r="4.5" fill="#2E1805" />
                    <path d="M 70 99 Q 80 108 90 99" stroke="#9E2A2B" strokeWidth="2.5" fill="none" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-2">
                  <span className="text-xs font-semibold text-amber-200 uppercase tracking-widest flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" /> Ranbirian 2022
                  </span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-amber-200 mt-4 font-serif-heading">
                {classmate.name}
              </h2>
              <span className="mt-1 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs font-bold text-amber-300 uppercase tracking-wider">
                {classmate.title}
              </span>

              <button
                onClick={() => setLiked(!liked)}
                className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  liked 
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 scale-105' 
                    : 'bg-white/5 border-white/10 text-amber-200/70 hover:text-rose-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="text-xs font-semibold">{liked ? 'Memory Saved ❤️' : 'Send Respect'}</span>
              </button>
            </div>

            {/* Right Column: Story & Notes */}
            <div className="md:col-span-7 space-y-4">
              {/* Quote */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/20 relative">
                <Quote className="w-6 h-6 text-amber-500/30 absolute top-2 right-2" />
                <p className="text-sm font-handwriting text-2xl text-amber-200 italic leading-relaxed">
                  "{classmate.quote || "Ranbirians for life!"}"
                </p>
              </div>

              {/* Memory Story */}
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Class X Classroom Memory
                </h4>
                <p className="text-sm text-amber-100/80 leading-relaxed font-sans">
                  {classmate.details}
                </p>
              </div>

              {/* Personal Notes / Wishes Section */}
              <div className="pt-2 border-t border-amber-500/20">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Secret Wishbook ({savedNotes.length})
                </h4>

                <form onSubmit={handleAddNote} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder={`Leave a memory note for ${classmate.name}...`}
                    className="flex-1 px-3 py-2 text-xs rounded-xl glass-input text-amber-100 placeholder-amber-500/50 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold text-xs hover:brightness-110 flex items-center gap-1 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" /> Post
                  </button>
                </form>

                {/* Stored Notes List */}
                <div className="max-h-28 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {savedNotes.length === 0 ? (
                    <p className="text-xs text-amber-400/50 italic text-center py-2">
                      No secret notes yet. Be the first to leave a message!
                    </p>
                  ) : (
                    savedNotes.map((note) => (
                      <div key={note.id} className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/10 text-xs flex justify-between items-start">
                        <span className="text-amber-100/90">{note.text}</span>
                        <span className="text-[10px] text-amber-500/60 ml-2 whitespace-nowrap">{note.date}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

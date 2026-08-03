import React from 'react';
import { Heart, Instagram } from 'lucide-react';

export default function Footer({ compact = false }) {
  return (
    <footer className={`w-full ${compact ? 'mt-6 py-2' : 'pt-16 pb-8 border-t border-amber-500/10 mt-16'}`}>
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs md:text-sm text-amber-400/60 font-medium">
        <div>
          Ranbir International School • Class X Batch 2022
        </div>

        <a
          href="https://instagram.com/codebyshivam"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 hover:border-amber-400/70 text-amber-300/90 hover:text-amber-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-105"
        >
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline animate-pulse" /> by <strong className="text-amber-200 font-semibold">Shivam</strong>
          </span>
          <span className="text-amber-500/40">•</span>
          <div className="flex items-center gap-1.5 text-pink-400 group-hover:text-pink-300 font-semibold">
            <Instagram className="w-4 h-4" />
            <span>codebyshivam</span>
          </div>
        </a>
      </div>
    </footer>
  );
}

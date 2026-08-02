import React from 'react';
import { motion } from 'framer-motion';

export default function TeddyAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center justify-center my-4"
    >
      {/* Cute Teddy Vector Animation Container */}
      <motion.div
        animate={{
          rotate: [0, -10, 10, -10, 10, -5, 5, 0],
          x: [0, -6, 6, -6, 6, -3, 3, 0],
        }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
        className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center filter drop-shadow-xl"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Teddy Ears */}
          <motion.circle
            cx="45" cy="55" r="28" fill="#8B4513"
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <circle cx="45" cy="55" r="16" fill="#D2B48C" />
          <motion.circle
            cx="155" cy="55" r="28" fill="#8B4513"
            animate={{ rotate: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <circle cx="155" cy="55" r="16" fill="#D2B48C" />

          {/* Teddy Head */}
          <circle cx="100" cy="105" r="62" fill="#A0522D" />

          {/* Teddy Snout & Nose */}
          <ellipse cx="100" cy="120" rx="30" ry="22" fill="#F5DEB3" />
          <ellipse cx="100" cy="112" rx="14" ry="9" fill="#2E1503" />

          {/* Cute Confused Mouth */}
          <path
            d="M 90 128 Q 100 122 110 128"
            stroke="#2E1503"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Surprised / Confused Eyes */}
          <g>
            <circle cx="72" cy="92" r="11" fill="#FFFFFF" />
            <motion.circle
              cx="72" cy="92" r="6" fill="#2E1503"
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <circle cx="70" cy="89" r="2.5" fill="#FFFFFF" />
          </g>

          <g>
            <circle cx="128" cy="92" r="11" fill="#FFFFFF" />
            <motion.circle
              cx="128" cy="92" r="6" fill="#2E1503"
              animate={{ x: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <circle cx="126" cy="89" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Cute Blush Cheeks */}
          <circle cx="55" cy="112" r="10" fill="#FF8080" opacity="0.6" />
          <circle cx="145" cy="112" r="10" fill="#FF8080" opacity="0.6" />

          {/* Cute Confused Sweat Drop */}
          <motion.path
            d="M 155 70 C 155 70 162 82 155 88 C 148 88 147 80 155 70 Z"
            fill="#38BDF8"
            animate={{ y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          />

          {/* Paw Scratching Head */}
          <motion.g
            animate={{ rotate: [-10, 15, -10], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <ellipse cx="160" cy="130" rx="16" ry="24" fill="#A0522D" transform="rotate(30 160 130)" />
            <circle cx="168" cy="140" r="8" fill="#F5DEB3" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Cute Error Message Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 text-center px-4 py-3 rounded-2xl glass-card border border-amber-500/30 max-w-xs shadow-lg"
      >
        <p className="text-lg font-bold text-amber-300 font-serif-heading">Oops! 😅</p>
        <p className="text-sm text-amber-100/90 mt-1 font-medium">
          Lagta hai tum secret bhool gaye...
        </p>
        <p className="text-xs text-amber-400 font-semibold mt-1 uppercase tracking-wider">
          Try Again Ranbirian!
        </p>
      </motion.div>
    </motion.div>
  );
}

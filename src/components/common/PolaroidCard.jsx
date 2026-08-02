import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function PolaroidCard({ classmate, index, onClick }) {
  const { name, title, description, rotation, themeColor, gender, avatarSeed } = classmate;

  // Custom SVG Avatar Generator matching individual personality
  const renderAvatarSVG = () => {
    return (
      <svg viewBox="0 0 160 160" className="w-full h-full object-cover">
        <defs>
          <radialGradient id={`grad-${classmate.id}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={themeColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a0705" stopOpacity="0.95" />
          </radialGradient>
        </defs>
        
        {/* Background Circle */}
        <rect width="160" height="160" fill={`url(#grad-${classmate.id})`} />

        {/* Subtle Background Pattern */}
        <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Hair Back */}
        {gender === 'female' ? (
          <path d="M 40 70 C 35 120 125 120 120 70 C 120 30 40 30 40 70 Z" fill="#2A1B0E" />
        ) : (
          <path d="M 45 60 C 45 40 115 40 115 60 Z" fill="#1C130B" />
        )}

        {/* Neck & Shoulders */}
        <path d="M 60 125 L 100 125 L 105 160 L 55 160 Z" fill="#D2A679" />
        {/* Uniform Shirt / Blazer */}
        <path d="M 35 160 L 60 125 L 80 140 L 100 125 L 125 160 Z" fill="#1E293B" />
        <path d="M 80 140 L 80 160" stroke="#F59E0B" strokeWidth="3" />
        <polygon points="76,140 84,140 82,152 78,152" fill="#DC2626" />

        {/* Face */}
        <ellipse cx="80" cy="85" rx="32" ry="38" fill="#E5C19C" />

        {/* Eyes */}
        <circle cx="68" cy="80" r="4.5" fill="#2E1805" />
        <circle cx="92" cy="80" r="4.5" fill="#2E1805" />
        <circle cx="69.5" cy="78.5" r="1.5" fill="#FFFFFF" />
        <circle cx="93.5" cy="78.5" r="1.5" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M 61 73 Q 68 70 74 74" stroke="#2E1805" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 86 74 Q 92 70 99 73" stroke="#2E1805" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Glasses for specific personas */}
        {(classmate.id === 'abhishek' || classmate.id === 'sanchita' || classmate.id === 'mayank') && (
          <g stroke="#F59E0B" strokeWidth="2" fill="none">
            <circle cx="68" cy="80" r="9" />
            <circle cx="92" cy="80" r="9" />
            <line x1="77" y1="80" x2="83" y2="80" />
          </g>
        )}

        {/* Nose */}
        <path d="M 80 82 Q 77 90 82 92" stroke="#B88A5E" strokeWidth="2" fill="none" />

        {/* Mouth / Smile */}
        <path d="M 70 99 Q 80 108 90 99" stroke="#9E2A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Hair Front */}
        {gender === 'female' ? (
          <path d="M 46 65 C 50 45 110 45 114 65 C 100 50 60 50 46 65 Z" fill="#3D2612" />
        ) : (
          <path d="M 46 62 C 55 42 105 42 114 62 C 95 50 65 48 46 62 Z" fill="#2E1C0C" />
        )}
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: rotation,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.7, 
        delay: (index % 3) * 0.15,
        type: "spring",
        stiffness: 120
      }}
      className="relative pt-6 pb-2 px-2 flex flex-col items-center group cursor-pointer"
      onClick={() => onClick && onClick(classmate)}
      style={{ '--tw-rotate': `${rotation}deg` }}
    >
      {/* Clip & Thread Hanger Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400/80 via-amber-600/60 to-amber-700/80 shadow-md"></div>
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 border border-amber-200/60 shadow-lg flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-950"></div>
        </div>
      </div>

      {/* Hanging Swing Motion wrapper */}
      <motion.div
        animate={{
          rotate: [rotation, rotation + 2, rotation - 2, rotation],
        }}
        transition={{
          repeat: Infinity,
          duration: 4 + (index % 3),
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.06,
          rotate: 0,
          y: -8,
          transition: { duration: 0.3 }
        }}
        className="w-full polaroid-frame p-4 pb-6 rounded-sm border border-amber-900/10 shadow-2xl group-hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.35)] transition-all duration-300"
      >
        {/* TOP: Student Name */}
        <div className="flex items-center justify-between mb-3 border-b border-amber-900/10 pb-2">
          <h3 className="text-xl md:text-2xl font-bold font-handwriting text-slate-900 tracking-wide group-hover:text-amber-700 transition-colors">
            {name}
          </h3>
          <Sparkles className="w-4 h-4 text-amber-500 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
        </div>

        {/* MIDDLE: Student Image with Hover Zoom */}
        <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-slate-900 border border-amber-900/20 shadow-inner group">
          {classmate.image ? (
            <img
              src={classmate.image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'block';
                }
              }}
            />
          ) : null}
          <div style={{ display: classmate.image ? 'none' : 'block' }} className="w-full h-full">
            {renderAvatarSVG()}
          </div>
          
          {/* Subtle Vintage Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-amber-500/10 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
          
          {/* Click hint overlay */}
          <div className="absolute inset-0 bg-amber-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-amber-400 text-amber-950 text-xs font-bold rounded-full shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
              View Memory ✨
            </span>
          </div>
        </div>

        {/* BOTTOM: Funny Title & Short Description */}
        <div className="mt-4 text-center">
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-950 shadow-sm mb-2"
            style={{ backgroundColor: `${themeColor}25`, border: `1px solid ${themeColor}60` }}
          >
            {title}
          </div>
          <p className="text-xs md:text-sm font-medium text-slate-700 font-sans line-clamp-2 leading-relaxed px-1">
            "{description}"
          </p>
        </div>

        {/* Heart Badge on Corner */}
        <div className="absolute bottom-2 right-2 text-rose-500/40 group-hover:text-rose-500 transition-colors">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </div>
      </motion.div>
    </motion.div>
  );
}

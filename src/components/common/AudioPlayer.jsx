import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ isUnlocked }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize HTML5 Audio with local music file
    audioRef.current = new Audio('/audio/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;

    if (isUnlocked) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay blocked by browser policy:", err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isUnlocked]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Playback error:", err));
    }
  };

  if (!isUnlocked) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel border border-amber-500/40 text-amber-200 hover:text-amber-100 transition-all duration-300 shadow-xl ${
          isPlaying ? 'shadow-amber-500/20 border-amber-400/60' : 'opacity-70 hover:opacity-100'
        }`}
        title="Toggle Background Music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase">🎵 MUSIC ON</span>
            <span className="flex space-x-0.5 items-end h-3 ml-1">
              <span className="w-1 bg-amber-400 h-full animate-bounce"></span>
              <span className="w-1 bg-amber-300 h-2/3 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1 bg-amber-500 h-4/5 animate-bounce [animation-delay:0.4s]"></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-amber-500/70" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400/80">🔇 MUSIC OFF</span>
          </>
        )}
      </button>
    </div>
  );
}

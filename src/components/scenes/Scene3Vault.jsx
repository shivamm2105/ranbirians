import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import TeddyAnimation from '../common/TeddyAnimation';

export default function Scene3Vault({ onUnlockSuccess }) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'wrong' | 'success'
  const [attempts, setAttempts] = useState(0);

  const CORRECT_PASSWORD = "2020";

  const handleUnlock = (e) => {
    e.preventDefault();
    const cleaned = password.trim().toLowerCase();

    if (cleaned === CORRECT_PASSWORD) {
      setStatus('success');

      // Screen Flash & Confetti Burst
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#F59E0B', '#10B981', '#3B82F6']
      });

      // Transition to Main Hero Section after 2.2s
      setTimeout(() => {
        onUnlockSuccess();
      }, 2200);
    } else {
      setStatus('wrong');
      setAttempts(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-[#080503]"
    >
      {/* Screen flash on success */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-amber-300 pointer-events-none z-50"
        />
      )}

      {/* Main Glass Vault Card */}
      <motion.div
        animate={status === 'wrong' ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card rounded-3xl p-6 md:p-8 border border-amber-500/30 shadow-2xl relative z-10"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            animate={status === 'success' ? { scale: [1, 1.25, 1], rotate: [0, -15, 15, 0] } : {}}
            className="w-20 h-20 rounded-2xl glass-panel border border-amber-400/50 flex items-center justify-center mb-3 text-amber-400 shadow-xl gold-glow"
          >
            {status === 'success' ? (
              <Unlock className="w-10 h-10 text-emerald-400 animate-bounce" />
            ) : (
              <Lock className="w-10 h-10 text-amber-400" />
            )}
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-extrabold font-serif-heading gold-gradient-text">
            🔒 Ranbirian's Memories Vault
          </h2>
          <p className="text-xs md:text-sm text-amber-300/80 font-medium uppercase tracking-widest mt-1">
            Only Ranbirians Allowed
          </p>
        </div>

        {/* Animate Wrong Attempt Teddy vs Success Screen vs Password Input */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-3"
            >
              <div className="flex justify-center text-emerald-400">
                <CheckCircle2 className="w-16 h-16 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-300 font-serif-heading">
                Access Granted ✅
              </h3>
              <p className="text-lg font-handwriting text-amber-200">
                Welcome Back Ranbirian ❤️
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleUnlock}
              className="space-y-5"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400/60">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (status === 'wrong') setStatus('idle');
                  }}
                  placeholder="Enter Secret Password"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input text-amber-100 placeholder-amber-500/40 text-center text-lg font-semibold tracking-widest focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition-all shadow-inner"
                  autoFocus
                />
              </div>

              {/* UNLOCK Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-amber-950 font-extrabold text-lg tracking-wider uppercase shadow-xl hover:shadow-amber-500/30 flex items-center justify-center gap-2 border border-yellow-200"
              >
                <Sparkles className="w-5 h-5 text-amber-950" />
                UNLOCK
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Cute Teddy reaction on Wrong Password */}
        {status === 'wrong' && (
          <TeddyAnimation key={attempts} />
        )}
      </motion.div>
    </motion.div>
  );
}

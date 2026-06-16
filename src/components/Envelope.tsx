import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface Props {
  username: string;
  onNext: () => void;
}

export default function Envelope({ username, onNext }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowButton(true), 1800);
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full mt-24"
    >
      <div className="text-center mb-16 h-8">
        {!isOpen && (
          <p className="text-pink-600 font-serif italic animate-pulse text-lg md:text-xl">
            You have a message, {username}... Click to open.
          </p>
        )}
      </div>

      <div 
        className="relative w-[320px] h-[220px] md:w-[480px] md:h-[320px] cursor-pointer perspective-1000"
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* Back of Envelope */}
        <div className="absolute inset-0 bg-rose-200 rounded-sm shadow-inner z-0" />

        {/* Letter */}
        <motion.div
          className="absolute left-3 right-3 bg-[#fdfbf7] p-6 md:p-8 rounded-md shadow-xl border border-rose-50 flex flex-col"
          initial={{ y: '5%', height: '90%', zIndex: 20, scale: 1 }}
          animate={isOpen ? { 
            y: ['5%', '-100%', '-15%'], 
            height: ['90%', '90%', '130%'],
            zIndex: [20, 20, 50],
            scale: [1, 1, 1.05]
          } : { 
            y: '5%', height: '90%', zIndex: 20, scale: 1 
          }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.5, 1],
            ease: "easeInOut", 
            delay: isOpen ? 0.2 : 0 
          }}
        >
          <div className="flex-grow font-serif text-gray-800 overflow-y-auto custom-scrollbar relative flex flex-col pt-2 pb-10 md:pb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-rose-800">Dear {username},</h2>
            <p className="mb-4 text-sm md:text-base leading-relaxed whitespace-pre-wrap flex-grow opacity-90 relative z-10">
              I've been wanting to share these thoughts with you. Every smile you share feels like a spark of magic, brightening even the grayest of days. You have this incredible way of making the world feel so much warmer and softer.
              <br/><br/>
              Thank you for just being you. I wanted to take this small moment to remind you of how genuinely special you are.
            </p>
            <p className="text-right font-medium text-rose-700 mt-2 text-sm md:text-base">
              Yours truly,<br/>
              Someone who cares
            </p>

            <AnimatePresence>
              {showButton && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center pb-2 sticky bottom-0 z-20"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="px-6 py-2.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md text-sm md:text-base font-sans font-medium hover:-translate-y-0.5"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Envelope Front Left */}
        <div 
          className="absolute inset-0 bg-rose-300 pointer-events-none rounded-sm shadow-[inset_-2px_0_10px_rgba(0,0,0,0.05)] z-30"
          style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }}
        />
        {/* Envelope Front Right */}
        <div 
          className="absolute inset-0 bg-rose-300 pointer-events-none rounded-sm shadow-[inset_2px_0_10px_rgba(0,0,0,0.05)] z-30"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}
        />
        {/* Envelope Front Bottom */}
        <div 
          className="absolute inset-0 bg-rose-400 pointer-events-none rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] z-30"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }}
        />

        {/* Envelope Flap (Top) */}
        <motion.div 
          className="absolute inset-0 bg-rose-400 origin-top rounded-sm shadow-sm"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
          initial={{ rotateX: 0, zIndex: 40 }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 10 : 40 }}
          transition={{ duration: 0.6, ease: "easeInOut", zIndex: { duration: 0, delay: isOpen ? 0 : 0.6 } }}
        />

        {/* Heart Seal */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-red-500 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-xl border-2 border-white/20">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
}

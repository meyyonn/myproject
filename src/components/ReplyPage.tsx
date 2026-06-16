import { useState } from 'react';
import { motion } from 'motion/react';
import { ReplyMessage } from '../types';

interface Props {
  username: string;
  onNext: () => void;
}

export default function ReplyPage({ username, onNext }: Props) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    setIsSending(true);
    
    // Simulate slight delay for animation
    setTimeout(() => {
      const newReply: ReplyMessage = {
        username,
        message: message.trim(),
        timestamp: Date.now()
      };

      const existing = localStorage.getItem('replies');
      const replies: ReplyMessage[] = existing ? JSON.parse(existing) : [];
      replies.push(newReply);
      localStorage.setItem('replies', JSON.stringify(replies));

      setSent(true);
      setIsSending(false);

      setTimeout(() => {
        onNext();
      }, 1500); // Wait 1.5s then go to end page
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex w-full"
    >
      <div className="glass p-8 md:p-10 rounded-2xl w-full max-w-2xl mx-auto relative overflow-hidden shadow-xl border border-white/60">
        {/* Paper styling texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col h-full">
          <h2 className="text-2xl font-serif text-pink-900 mb-6 border-b border-pink-200 pb-3">Leave a Reply...</h2>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-48 md:h-64 bg-transparent resize-none outline-none font-serif text-gray-700 leading-relaxed custom-scrollbar placeholder-pink-300 text-lg"
            placeholder="Write your thoughts here..."
            disabled={isSending || sent}
            style={{ 
              backgroundImage: 'linear-gradient(transparent, transparent 29px, rgba(236, 72, 153, 0.2) 30px)',
              backgroundSize: '100% 30px',
              lineHeight: '30px'
            }}
          />

          <div className="mt-8 flex justify-end items-center h-12">
            {!sent ? (
              <button
                onClick={handleSend}
                disabled={isSending || !message.trim()}
                className={`px-8 py-3 rounded-full font-medium shadow-md transition-all font-sans text-sm md:text-base
                  ${message.trim() && !isSending 
                    ? 'bg-pink-500 hover:bg-pink-600 text-white hover:shadow-lg hover:-translate-y-0.5' 
                    : 'bg-pink-200 text-pink-400 cursor-not-allowed'
                  }`}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-pink-600 font-medium font-sans flex items-center gap-2 bg-pink-100/50 px-4 py-2 rounded-full"
              >
                <span className="bg-green-100 text-green-600 p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </span>
                Sent Successfully
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

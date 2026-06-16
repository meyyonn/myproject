import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ReplyMessage } from '../types';
import { Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [replies, setReplies] = useState<ReplyMessage[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const existing = localStorage.getItem('replies');
    if (existing) {
      setReplies(JSON.parse(existing));
    }
  }, []);

  const toggleSelect = (timestamp: number) => {
    setSelected(prev => 
      prev.includes(timestamp) 
        ? prev.filter(t => t !== timestamp)
        : [...prev, timestamp]
    );
  };

  const handleDeleteSelected = () => {
    if (selected.length === 0) return;
    const remaining = replies.filter(r => !selected.includes(r.timestamp));
    setReplies(remaining);
    localStorage.setItem('replies', JSON.stringify(remaining));
    setSelected([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-2 md:p-8 w-full font-sans"
    >
      <div className="glass p-6 md:p-10 rounded-3xl min-h-[70vh] shadow-xl border border-white/60">
        <div className="flex justify-between items-center mb-8 border-b border-pink-200 pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-serif text-pink-900">Admin Inbox</h1>
            {selected.length > 0 && (
              <button 
                onClick={handleDeleteSelected}
                className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border border-red-200"
              >
                <Trash2 size={16} />
                Delete ({selected.length})
              </button>
            )}
          </div>
          <span className="bg-pink-100 border border-pink-200 text-pink-800 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-bold animate-pulse shadow-sm">
            Secret Access
          </span>
        </div>

        {replies.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-pink-400 font-serif text-lg italic bg-white/30 rounded-2xl border border-dashed border-pink-200">
            No replies yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {[...replies].sort((a,b) => b.timestamp - a.timestamp).map((reply, i) => (
              <div key={reply.timestamp} className="bg-white/70 p-6 rounded-2xl shadow-sm border border-white hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6">
                  <input 
                    type="checkbox" 
                    checked={selected.includes(reply.timestamp)}
                    onChange={() => toggleSelect(reply.timestamp)}
                    className="w-5 h-5 accent-pink-500 cursor-pointer rounded border-gray-300"
                  />
                </div>
                <div className="flex justify-between items-start md:items-center mb-4 flex-col md:flex-row gap-2 pr-8">
                  <h3 className="font-semibold text-lg text-pink-900">From: {reply.username}</h3>
                  <span className="text-xs font-mono text-gray-500 bg-pink-50 px-2.5 py-1 rounded-md border border-pink-100 mt-1 md:mt-0">
                    {new Date(reply.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 font-serif leading-relaxed whitespace-pre-wrap border-l-4 border-pink-300 pl-4 py-1">
                  {reply.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

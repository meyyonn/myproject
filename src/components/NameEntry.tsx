import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  onNext: (name: string) => void;
}

export default function NameEntry({ onNext }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('username', name.trim());
      onNext(name.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="glass p-8 md:p-12 rounded-3xl max-w-md w-full mx-4 text-center">
        <h1 className="text-3xl font-serif text-pink-800 mb-6">Enter Your Name</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name..."
            className="px-5 py-4 rounded-xl bg-white/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400 transition-all font-sans text-lg"
            required
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition-colors shadow-md hover:shadow-lg text-lg"
          >
            Enter
          </button>
        </form>
      </div>
    </motion.div>
  );
}

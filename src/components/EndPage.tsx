import React from 'react';
import { motion } from 'motion/react';

export default function EndPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="glass p-10 md:p-16 rounded-3xl max-w-xl mx-auto shadow-2xl border border-white/60 text-center">
        <HeartAnimation />
        <h1 className="text-4xl md:text-5xl font-serif text-pink-800 mb-6 mt-6">Thank you for reading</h1>
        <p className="text-pink-600 font-sans mb-12 text-lg">Wishing you a wonderful day ahead.</p>
        
        <div className="flex justify-center flex-wrap gap-4">
          <SocialButton icon={<InstagramIcon />} title="Instagram" href="https://www.instagram.com/myonn.zfr" color="hover:text-pink-600 hover:bg-pink-100" />
          <SocialButton icon={<TikTokIcon />} title="TikTok" href="https://www.tiktok.com/@myyyul" color="hover:text-black hover:bg-gray-100" />
          <SocialButton icon={<FacebookIcon />} title="Facebook" href="https://www.facebook.com/amirul.azfar.9659/" color="hover:text-blue-600 hover:bg-blue-100" />
        </div>
      </div>
    </motion.div>
  );
}

function SocialButton({ icon, title, href, color }: { icon: React.ReactNode, title: string, href: string, color: string }) {
  return (
    <a 
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-white/50 backdrop-blur-sm border border-white/50 w-14 h-14 rounded-full flex items-center justify-center text-gray-700 transition-all shadow-sm hover:scale-110 ${color}`}
    >
      {icon}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5.64 5.64 0 0 1-1.04-.1z"/>
    </svg>
  );
}

function HeartAnimation() {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 shadow-sm"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </motion.div>
  );
}

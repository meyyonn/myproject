import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle promise to avoid "play() failed because the user didn't interact" errors
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback prevented:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 
        Using a reliable, royalty-free audio file from an open CDN for the placeholder music.
        Users can drop their own mp3 replacing this source.
      */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_511977759d.mp3" 
        loop
      />
      <button
        onClick={togglePlay}
        className="w-14 h-14 rounded-full glass bg-white/40 flex items-center justify-center text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-all shadow-xl border border-white/60 hover:scale-105 active:scale-95"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="ml-1 fill-current" />}
      </button>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../types';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  BookOpen, 
  Music2, 
  Sparkles 
} from 'lucide-react';

interface AudioPlayerBarProps {
  currentTrack: Post | null;
  onClose: () => void;
  onOpenLyrics: (post: Post) => void;
  lang: 'ur' | 'en' | 'roman';
}

export default function AudioPlayerBar({
  currentTrack,
  onClose,
  onOpenLyrics,
  lang
}: AudioPlayerBarProps) {
  if (!currentTrack) return null;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current && currentTrack.audioUrl) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!duration && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/95 backdrop-blur-xl border-t border-stone-800 shadow-2xl px-4 py-2.5 transition-all">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=peaceful-islamic-ambient-110825.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-[240px] sm:max-w-xs">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-stone-700 shadow-md bg-stone-950">
            <img
              src={currentTrack.imageUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h4 className="font-urdu text-sm font-bold text-stone-100 truncate text-right leading-relaxed">
              {currentTrack.titleUrdu}
            </h4>
            <p className="text-[11px] text-emerald-400 font-medium truncate">
              {currentTrack.authorOrReciter || currentTrack.poet || 'Naat Sharif'}
            </p>
          </div>
        </div>

        {/* Center Controls & Progress Bar */}
        <div className="flex-1 max-w-xl flex flex-col items-center gap-1">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.max(0, currentTime - 10);
              }}
              className="text-stone-400 hover:text-stone-200 text-xs hidden sm:block"
              title="Back 10s"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 hover:scale-105 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = Math.min(duration, currentTime + 10);
              }}
              className="text-stone-400 hover:text-stone-200 text-xs hidden sm:block"
              title="Forward 10s"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Slider */}
          <div className="w-full flex items-center gap-2 text-[10px] text-stone-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right side: Lyrics opener, Volume, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Read Lyrics Button */}
          <button
            onClick={() => onOpenLyrics(currentTrack)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/60 text-xs font-medium cursor-pointer transition-colors"
            title="Read Lyrics"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline font-urdu text-xs">{lang === 'ur' ? 'کلام پڑھیں' : 'Lyrics'}</span>
          </button>

          {/* Volume Control */}
          <div className="hidden lg:flex items-center gap-1.5 text-stone-400">
            <button onClick={toggleMute} className="hover:text-stone-200">
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Close Player */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

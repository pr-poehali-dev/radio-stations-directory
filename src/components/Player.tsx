import { useEffect, useRef } from 'react';
import { useRadioStore } from '@/store/radioStore';
import Icon from '@/components/ui/icon';

export default function Player() {
  const { currentStation, isPlaying, volume, togglePlay, setVolume, stop } = useRadioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume / 100;
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current || !currentStation) return;
    audioRef.current.src = currentStation.streamUrl;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentStation]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!currentStation) return null;

  return (
    <div className="player-bar fixed bottom-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Лого и название */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl ${isPlaying ? 'live-pulse' : ''}`}>
              {currentStation.logo}
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold font-oswald truncate text-foreground">
              {currentStation.name}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {currentStation.genre} · {currentStation.city}
            </div>
          </div>
        </div>

        {/* Волны и кнопка */}
        <div className="flex items-center gap-3">
          {isPlaying && (
            <div className="flex items-end gap-[2px] h-5 hidden sm:flex">
              <div className="wave-bar" style={{ height: '8px' }} />
              <div className="wave-bar" style={{ height: '14px' }} />
              <div className="wave-bar" style={{ height: '10px' }} />
              <div className="wave-bar" style={{ height: '18px' }} />
              <div className="wave-bar" style={{ height: '12px' }} />
            </div>
          )}

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity glow-orange flex-shrink-0"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={18} />
          </button>

          <button
            onClick={stop}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <Icon name="Square" size={14} />
          </button>
        </div>

        {/* Громкость */}
        <div className="items-center gap-2 hidden md:flex">
          <button
            onClick={() => setVolume(volume === 0 ? 80 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'} size={16} />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-track w-24"
          />
          <span className="text-xs text-muted-foreground w-8">{volume}%</span>
        </div>

        {/* LIVE badge */}
        <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/40 rounded-full px-2 py-1 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] font-oswald font-semibold text-red-400 tracking-widest">LIVE</span>
        </div>
      </div>
    </div>
  );
}

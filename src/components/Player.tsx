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
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentStation]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  if (!currentStation) return null;

  return (
    <div className="player-bar fixed bottom-0 left-0 right-0 z-30 lg:left-60">
      {/* Progress accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/20" />

      <div className="flex items-center gap-3 px-4 py-3 max-w-6xl">
        {/* Cover + Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
            {currentStation.cover
              ? <img src={currentStation.cover} alt={currentStation.name} className="w-full h-full object-cover" />
              : <span className="absolute inset-0 flex items-center justify-center text-lg">{currentStation.logo}</span>
            }
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="wave-bars scale-[0.65]">
                  <div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" />
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold font-oswald truncate">{currentStation.name}</div>
            <div className="text-xs text-muted-foreground truncate">{currentStation.genre} · {currentStation.city}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 active:scale-95 transition-all glow-purple"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={16} />
          </button>
          <button
            onClick={stop}
            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="Square" size={12} />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <button onClick={() => setVolume(volume === 0 ? 75 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name={volume === 0 ? 'VolumeX' : volume < 50 ? 'Volume1' : 'Volume2'} size={15} />
          </button>
          <input type="range" min="0" max="100" value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="volume-track w-20" />
          <span className="text-xs text-muted-foreground w-7 text-right">{volume}%</span>
        </div>

        {/* LIVE */}
        <div className="hidden sm:flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-full px-2.5 py-1 flex-shrink-0">
          <div className="live-dot" />
          <span className="text-[10px] font-oswald font-semibold text-red-400 tracking-widest">LIVE</span>
        </div>
      </div>
    </div>
  );
}

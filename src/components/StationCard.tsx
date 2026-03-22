import { useRadioStore } from '@/store/radioStore';
import { Station } from '@/data/stations';
import Icon from '@/components/ui/icon';

interface StationCardProps {
  station: Station;
  compact?: boolean;
}

function formatListeners(n?: number): string {
  if (!n) return '';
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

export default function StationCard({ station, compact = false }: StationCardProps) {
  const { currentStation, isPlaying, play, togglePlay, toggleFavorite, isFavorite } = useRadioStore();
  const isActive = currentStation?.id === station.id;
  const isThisPlaying = isActive && isPlaying;

  const handlePlay = () => {
    if (isActive) togglePlay();
    else play(station);
  };

  if (compact) {
    return (
      <div
        className={`station-card group flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-colors ${
          isActive
            ? 'playing border-primary/50 bg-primary/5'
            : 'border-border bg-card hover:border-primary/20'
        }`}
        onClick={handlePlay}
      >
        <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
          {station.cover
            ? <img src={station.cover} alt={station.name} className="w-full h-full object-cover" />
            : <span className="absolute inset-0 flex items-center justify-center text-xl">{station.logo}</span>
          }
          {isThisPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="wave-bars scale-75">
                <div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate font-oswald">{station.name}</div>
          <div className="text-xs text-muted-foreground truncate">{station.genre} · {station.city}</div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {station.frequency && (
            <span className="text-[10px] text-muted-foreground hidden sm:block">{station.frequency}</span>
          )}
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isThisPlaying
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'
          }`}>
            <Icon name={isThisPlaying ? 'Pause' : 'Play'} size={12} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`station-card group relative flex flex-col rounded-2xl overflow-hidden border bg-card ${
      isActive ? 'playing border-primary/60' : 'border-border'
    }`}>
      {/* Cover image */}
      <div className="relative w-full aspect-square overflow-hidden bg-secondary">
        {station.cover
          ? <img src={station.cover} alt={station.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-5xl">{station.logo}</div>
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {station.isPopular && (
            <span className="text-[10px] bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full font-semibold tracking-wider uppercase">
              ТОП
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(station.id); }}
            className={`ml-auto w-8 h-8 rounded-full glass flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
              isFavorite(station.id) ? 'text-red-400' : 'text-white/60 hover:text-red-400'
            }`}
          >
            <Icon name="Heart" size={14} className={isFavorite(station.id) ? 'fill-red-400' : ''} />
          </button>
        </div>

        {/* Playing indicator */}
        {isThisPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="wave-bars">
              <div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" />
              <div className="wave-bar" /><div className="wave-bar" />
            </div>
          </div>
        )}

        {/* Name over image */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-oswald font-bold text-white text-base leading-tight">{station.name}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-white/70">{station.genre}</span>
            {station.frequency && (
              <>
                <span className="text-white/40">·</span>
                <span className="text-[11px] text-white/70">{station.frequency}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-3 py-2.5 gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
          <Icon name="MapPin" size={11} />
          <span className="truncate">{station.city}</span>
          {station.listeners && (
            <>
              <span className="text-border mx-0.5">·</span>
              <Icon name="Users" size={11} />
              <span>{formatListeners(station.listeners)}</span>
            </>
          )}
        </div>

        <button
          onClick={handlePlay}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all active:scale-95 ${
            isThisPlaying
              ? 'bg-primary text-primary-foreground glow-purple'
              : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          <Icon name={isThisPlaying ? 'Pause' : 'Play'} size={11} />
          {isThisPlaying ? 'Пауза' : 'Слушать'}
        </button>
      </div>
    </div>
  );
}

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
  const isCurrentStation = currentStation?.id === station.id;
  const isThisPlaying = isCurrentStation && isPlaying;

  const handlePlay = () => {
    if (isCurrentStation) {
      togglePlay();
    } else {
      play(station);
    }
  };

  if (compact) {
    return (
      <div
        className={`station-card flex items-center gap-3 p-3 rounded-xl border bg-card cursor-pointer ${
          isCurrentStation ? 'playing border-primary/50' : 'border-border hover:border-border/80'
        }`}
        onClick={handlePlay}
      >
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg flex-shrink-0">
          {station.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold font-oswald truncate">{station.name}</div>
          <div className="text-xs text-muted-foreground">{station.genre}</div>
        </div>
        <div className="flex items-center gap-2">
          {isThisPlaying ? (
            <div className="flex items-end gap-[2px] h-4">
              <div className="wave-bar" style={{ height: '6px' }} />
              <div className="wave-bar" style={{ height: '10px' }} />
              <div className="wave-bar" style={{ height: '8px' }} />
              <div className="wave-bar" style={{ height: '14px' }} />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
              <Icon name="Play" size={12} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`station-card group flex flex-col p-4 rounded-2xl border bg-card ${
        isCurrentStation ? 'playing border-primary/60' : 'border-border'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
          {station.logo}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(station.id); }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorite(station.id) ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
          }`}
        >
          <Icon name="Heart" size={15} className={isFavorite(station.id) ? 'fill-red-400' : ''} />
        </button>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-oswald font-semibold text-base leading-tight">{station.name}</h3>
          {station.isPopular && (
            <span className="text-[9px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded-full font-oswald tracking-wider">
              ТОП
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{station.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="bg-secondary px-2 py-0.5 rounded-full">{station.genre}</span>
          {station.frequency && <span>{station.frequency}</span>}
          {station.listeners && (
            <span className="flex items-center gap-1">
              <Icon name="Users" size={10} />
              {formatListeners(station.listeners)}
            </span>
          )}
        </div>
      </div>

      {/* Play button */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-muted-foreground">{station.city}</div>
        <button
          onClick={handlePlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            isThisPlaying
              ? 'bg-primary text-primary-foreground glow-orange'
              : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          {isThisPlaying ? (
            <>
              <div className="flex items-end gap-[2px] h-3">
                <div className="wave-bar" style={{ height: '5px' }} />
                <div className="wave-bar" style={{ height: '9px' }} />
                <div className="wave-bar" style={{ height: '6px' }} />
              </div>
              Слушаю
            </>
          ) : (
            <>
              <Icon name="Play" size={12} />
              Слушать
            </>
          )}
        </button>
      </div>
    </div>
  );
}

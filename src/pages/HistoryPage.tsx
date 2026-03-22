import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import Icon from '@/components/ui/icon';
import { Page } from '@/components/Navbar';

interface HistoryPageProps {
  onNavigate: (page: Page) => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 60) return 'только что';
  if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function HistoryPage({ onNavigate }: HistoryPageProps) {
  const { stations, history } = useRadioStore();

  const historyStations = history
    .map((h) => ({
      station: stations.find((s) => s.id === h.stationId),
      listenedAt: h.listenedAt,
    }))
    .filter((h) => h.station !== undefined);

  if (historyStations.length === 0) {
    return (
      <div className="animate-fade-in">
        <h1 className="font-oswald text-3xl font-bold mb-8">История прослушивания</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Icon name="Clock" size={32} className="text-muted-foreground/40" />
          </div>
          <h2 className="font-oswald text-xl font-semibold mb-2">История пуста</h2>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Как только вы начнёте слушать станции, они появятся здесь
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="Radio" size={16} />
            Начать слушать
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-oswald text-3xl font-bold">История</h1>
          <p className="text-muted-foreground text-sm mt-1">{historyStations.length} записей</p>
        </div>
        <Icon name="Clock" size={22} className="text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {historyStations.map(({ station, listenedAt }, i) => (
          <div key={`${station!.id}-${i}`} className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
              {station!.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-oswald font-semibold text-sm">{station!.name}</div>
              <div className="text-xs text-muted-foreground">{station!.genre} · {station!.city}</div>
            </div>
            <div className="text-xs text-muted-foreground text-right flex-shrink-0">
              {formatDate(listenedAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

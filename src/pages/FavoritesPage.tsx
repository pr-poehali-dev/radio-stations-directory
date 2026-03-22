import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import Icon from '@/components/ui/icon';
import { Page } from '@/components/Navbar';

interface FavoritesPageProps {
  onNavigate: (page: Page) => void;
}

export default function FavoritesPage({ onNavigate }: FavoritesPageProps) {
  const { stations, favorites } = useRadioStore();
  const favoriteStations = stations.filter((s) => favorites.includes(s.id));

  if (favoriteStations.length === 0) {
    return (
      <div className="animate-fade-in">
        <h1 className="font-oswald text-3xl font-bold mb-8">Избранное</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Icon name="Heart" size={32} className="text-muted-foreground/40" />
          </div>
          <h2 className="font-oswald text-xl font-semibold mb-2">Пока пусто</h2>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Нажмите на сердечко в карточке станции, чтобы добавить её в избранное
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="Radio" size={16} />
            Перейти к каталогу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-oswald text-3xl font-bold">Избранное</h1>
          <p className="text-muted-foreground text-sm mt-1">{favoriteStations.length} станций</p>
        </div>
        <Icon name="Heart" size={24} className="text-red-400 fill-red-400" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteStations.map((station, i) => (
          <div key={station.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fade-in">
            <StationCard station={station} />
          </div>
        ))}
      </div>
    </div>
  );
}

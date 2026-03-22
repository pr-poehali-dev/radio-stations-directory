import { useRadioStore } from '@/store/radioStore';
import Icon from '@/components/ui/icon';

export default function ProfilePage() {
  const { stations, favorites, history } = useRadioStore();

  const favoriteStations = stations.filter((s) => favorites.includes(s.id));
  const topGenres = favoriteStations.reduce((acc: Record<string, number>, s) => {
    acc[s.genre] = (acc[s.genre] || 0) + 1;
    return acc;
  }, {});
  const sortedGenres = Object.entries(topGenres).sort(([, a], [, b]) => b - a).slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-oswald text-3xl font-bold">Профиль</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 p-6 bg-card border border-border rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
          <Icon name="User" size={28} className="text-primary-foreground" />
        </div>
        <div>
          <div className="font-oswald text-xl font-bold">Слушатель</div>
          <div className="text-sm text-muted-foreground">Любитель хорошего радио</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { icon: 'Heart', label: 'Избранных', value: favorites.length, color: 'text-red-400' },
          { icon: 'Clock', label: 'Прослушано', value: history.length, color: 'text-primary' },
          { icon: 'Radio', label: 'Всего станций', value: stations.length, color: 'text-blue-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <Icon name={stat.icon} size={22} className={`${stat.color} mx-auto mb-2`} />
            <div className="font-oswald text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Favourite genres */}
      {sortedGenres.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-oswald text-lg font-semibold mb-3">Любимые жанры</h2>
          <div className="space-y-2">
            {sortedGenres.map(([genre, count]) => (
              <div key={genre} className="flex items-center gap-3">
                <span className="text-sm font-medium w-24">{genre}</span>
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(count / (favoriteStations.length || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder settings */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h2 className="font-oswald text-lg font-semibold mb-3">Настройки</h2>
        <div className="space-y-3">
          {[
            { label: 'Уведомления', icon: 'Bell' },
            { label: 'Тема оформления', icon: 'Palette' },
            { label: 'Качество звука', icon: 'Settings2' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3 text-sm">
                <Icon name={item.icon} size={16} className="text-muted-foreground" />
                {item.label}
              </div>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

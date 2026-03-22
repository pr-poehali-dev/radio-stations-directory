import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import Icon from '@/components/ui/icon';
import { Page } from '@/components/Navbar';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { stations } = useRadioStore();
  const popular = stations.filter((s) => s.isPopular).slice(0, 6);
  const recent = stations.slice(0, 4);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-card to-background border border-border p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-primary/8 rounded-full translate-y-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-end gap-[3px] h-5">
              <div className="wave-bar" style={{ height: '8px' }} />
              <div className="wave-bar" style={{ height: '14px' }} />
              <div className="wave-bar" style={{ height: '10px' }} />
              <div className="wave-bar" style={{ height: '18px' }} />
              <div className="wave-bar" style={{ height: '12px' }} />
            </div>
            <span className="text-xs font-oswald tracking-widest text-primary uppercase">В эфире</span>
          </div>
          <h1 className="font-oswald text-4xl md:text-6xl font-bold text-foreground leading-tight mb-3">
            Радио России<br />
            <span className="text-primary">онлайн</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mb-6">
            Слушайте лучшие радиостанции страны — джаз, рок, поп, классика и новости прямо сейчас
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity glow-orange"
            >
              <Icon name="Play" size={16} />
              Слушать сейчас
            </button>
            <button
              onClick={() => onNavigate('search')}
              className="flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition-colors"
            >
              <Icon name="Search" size={16} />
              Найти станцию
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: 'Radio', value: `${stations.length}+`, label: 'Станций' },
          { icon: 'Music', value: '12', label: 'Жанров' },
          { icon: 'MapPin', value: '30+', label: 'Городов' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
            <Icon name={stat.icon} size={20} className="text-primary mx-auto mb-2" />
            <div className="font-oswald text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Popular stations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-oswald text-xl font-semibold">🔥 Популярные</h2>
          <button onClick={() => onNavigate('catalog')} className="text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-1">
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((station, i) => (
            <div key={station.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fade-in">
              <StationCard station={station} />
            </div>
          ))}
        </div>
      </div>

      {/* All stations preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-oswald text-xl font-semibold">📻 Недавно добавленные</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recent.map((station) => (
            <StationCard key={station.id} station={station} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

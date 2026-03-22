import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import Icon from '@/components/ui/icon';
import { Page } from '@/components/Navbar';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { stations } = useRadioStore();
  const popular = stations.filter(s => s.isPopular).slice(0, 6);
  const recent = stations.slice(-6);

  return (
    <div className="space-y-10 animate-fade-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12"
        style={{
          background: 'linear-gradient(135deg, hsla(262,83%,15%,0.8) 0%, hsla(224,18%,10%,0.9) 60%, hsla(172,66%,10%,0.6) 100%)',
          border: '1px solid hsla(262,83%,68%,0.15)',
        }}>
        {/* Декоративные круги */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(262,83%,68%), transparent)' }} />
        <div className="absolute -bottom-10 left-1/3 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(172,66%,50%), transparent)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="wave-bars">
              <div className="wave-bar" /><div className="wave-bar" /><div className="wave-bar" />
              <div className="wave-bar" /><div className="wave-bar" />
            </div>
            <span className="text-xs font-oswald tracking-widest text-primary/80 uppercase">В эфире прямо сейчас</span>
          </div>

          <h1 className="font-oswald text-4xl md:text-6xl font-bold leading-tight mb-3">
            Лучшие радиостанции<br />
            <span className="text-gradient">России онлайн</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-7">
            Слушайте джаз, рок, поп, классику и новости — {stations.length}+ станций со всей страны
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all glow-purple">
              <Icon name="Play" size={16} />
              Слушать сейчас
            </button>
            <button onClick={() => onNavigate('search')}
              className="flex items-center gap-2 bg-white/8 text-foreground border border-white/10 px-6 py-3 rounded-full font-semibold hover:bg-white/12 transition-colors">
              <Icon name="Search" size={16} />
              Найти станцию
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: 'Radio',  value: `${stations.length}+`, label: 'Станций',  color: 'text-primary' },
          { icon: 'Music2', value: '12',                   label: 'Жанров',   color: 'text-accent' },
          { icon: 'MapPin', value: '30+',                  label: 'Городов',  color: 'text-purple-300' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-2xl p-4 text-center">
            <Icon name={stat.icon} size={20} className={`${stat.color} mx-auto mb-2`} />
            <div className="font-oswald text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Popular */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-oswald text-xl font-semibold flex items-center gap-2">
            🔥 <span>Популярные</span>
          </h2>
          <button onClick={() => onNavigate('catalog')}
            className="text-sm text-primary hover:opacity-80 transition-opacity flex items-center gap-1">
            Все станции <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {popular.map((station, i) => (
            <div key={station.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
              <StationCard station={station} />
            </div>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section>
        <h2 className="font-oswald text-xl font-semibold mb-4">🎵 Недавно добавленные</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {recent.map(station => (
            <StationCard key={station.id} station={station} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

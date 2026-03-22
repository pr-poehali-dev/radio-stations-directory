import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import { GENRES, Genre } from '@/data/stations';
import Icon from '@/components/ui/icon';

export default function CatalogPage() {
  const { stations } = useRadioStore();
  const [activeGenre, setActiveGenre] = useState<Genre | null>(null);
  const [sortBy, setSortBy] = useState<'listeners' | 'name'>('listeners');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = stations
    .filter(s => !activeGenre || s.genre === activeGenre)
    .sort((a, b) => sortBy === 'listeners'
      ? (b.listeners || 0) - (a.listeners || 0)
      : a.name.localeCompare(b.name, 'ru'));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-oswald text-3xl font-bold">Каталог</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeGenre ? `${activeGenre} · ` : ''}{filtered.length} станций
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden border border-border">
            {(['grid', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-2.5 py-2 text-xs transition-colors ${view === v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                <Icon name={v === 'grid' ? 'LayoutGrid' : 'List'} size={14} />
              </button>
            ))}
          </div>
          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'name' | 'listeners')}
            className="bg-secondary border border-border text-foreground text-sm rounded-xl px-3 py-2 outline-none focus:border-primary/60 transition-colors">
            <option value="listeners">По популярности</option>
            <option value="name">По алфавиту</option>
          </select>
        </div>
      </div>

      {/* Genre filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveGenre(null)}
          className={`genre-pill px-3.5 py-1.5 rounded-full text-sm font-medium bg-secondary ${activeGenre === null ? 'active' : ''}`}>
          Все
        </button>
        {GENRES.map(genre => (
          <button key={genre} onClick={() => setActiveGenre(activeGenre === genre ? null : genre)}
            className={`genre-pill px-3.5 py-1.5 rounded-full text-sm font-medium bg-secondary ${activeGenre === genre ? 'active' : ''}`}>
            {genre}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="Radio" size={40} className="text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">Станции не найдены</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((station, i) => (
            <div key={station.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <StationCard station={station} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filtered.map((station, i) => (
            <div key={station.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
              <StationCard station={station} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

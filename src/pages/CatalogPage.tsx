import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import { GENRES, Genre } from '@/data/stations';
import Icon from '@/components/ui/icon';

export default function CatalogPage() {
  const { stations } = useRadioStore();
  const [activeGenre, setActiveGenre] = useState<Genre | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'listeners'>('listeners');

  const filtered = stations
    .filter((s) => !activeGenre || s.genre === activeGenre)
    .sort((a, b) => {
      if (sortBy === 'listeners') return (b.listeners || 0) - (a.listeners || 0);
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-oswald text-3xl font-bold">Каталог</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} радиостанций</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">Сортировка:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'listeners')}
            className="bg-secondary border border-border text-foreground text-sm rounded-lg px-3 py-1.5 outline-none focus:border-primary"
          >
            <option value="listeners">По слушателям</option>
            <option value="name">По алфавиту</option>
          </select>
        </div>
      </div>

      {/* Genres filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveGenre(null)}
          className={`genre-pill px-3 py-1.5 rounded-full text-sm border transition-all ${
            activeGenre === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-secondary text-muted-foreground border-border hover:border-primary/40'
          }`}
        >
          Все
        </button>
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(activeGenre === genre ? null : genre)}
            className={`genre-pill px-3 py-1.5 rounded-full text-sm border transition-all ${
              activeGenre === genre
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:border-primary/40'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Icon name="Radio" size={40} className="text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">Станции не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((station, i) => (
            <div key={station.id} style={{ animationDelay: `${i * 0.04}s` }} className="animate-fade-in">
              <StationCard station={station} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

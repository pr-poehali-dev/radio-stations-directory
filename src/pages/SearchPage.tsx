import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import Icon from '@/components/ui/icon';

export default function SearchPage() {
  const { stations } = useRadioStore();
  const [query, setQuery] = useState('');

  const results = query.trim().length >= 1
    ? stations.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.genre.toLowerCase().includes(query.toLowerCase()) ||
          s.city.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popular = stations.slice(0, 8);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-oswald text-3xl font-bold">Поиск</h1>

      {/* Search input */}
      <div className="relative">
        <Icon
          name="Search"
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Название, жанр, город..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full bg-card border border-border rounded-2xl pl-11 pr-4 py-4 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors text-base"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Results */}
      {query.trim() ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            {results.length > 0 ? `Найдено: ${results.length}` : 'Ничего не найдено'}
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((station, i) => (
                <div key={station.id} style={{ animationDelay: `${i * 0.04}s` }} className="animate-fade-in">
                  <StationCard station={station} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Icon name="SearchX" size={40} className="text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Попробуйте другой запрос</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground mb-4">Популярные станции</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popular.map((station) => (
              <StationCard key={station.id} station={station} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import StationCard from '@/components/StationCard';
import { GENRES, Genre } from '@/data/stations';
import Icon from '@/components/ui/icon';

const GENRE_ICONS: Record<Genre, string> = {
  'Поп': '🎵',
  'Рок': '🎸',
  'Джаз': '🎷',
  'Классика': '🎻',
  'Хип-хоп': '🎤',
  'Электронная': '🎧',
  'Новости': '📰',
  'Разговорное': '🗣️',
  'Ретро': '📼',
  'Детское': '🧸',
  'Спорт': '⚽',
  'Народная': '🪗',
};

const GENRE_DESC: Record<Genre, string> = {
  'Поп': 'Современные хиты',
  'Рок': 'Энергия и гитарные риффы',
  'Джаз': 'Живая джазовая сцена',
  'Классика': 'Мировая классика',
  'Хип-хоп': 'Рэп и биты',
  'Электронная': 'Клубная электроника',
  'Новости': 'Актуальные новости',
  'Разговорное': 'Ток-шоу и интервью',
  'Ретро': '70-е, 80-е, 90-е',
  'Детское': 'Для малышей',
  'Спорт': 'Спортивные трансляции',
  'Народная': 'Фольклор и традиции',
};

export default function GenresPage() {
  const { stations } = useRadioStore();
  const [activeGenre, setActiveGenre] = useState<Genre | null>(null);

  const genreCount = (genre: Genre) => stations.filter((s) => s.genre === genre).length;
  const filteredStations = activeGenre ? stations.filter((s) => s.genre === activeGenre) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="font-oswald text-3xl font-bold">Жанры</h1>

      {/* Genre grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GENRES.map((genre) => {
          const count = genreCount(genre);
          const isActive = activeGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setActiveGenre(isActive ? null : genre)}
              className={`station-card flex flex-col items-start p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-primary/10 border-primary/60 shadow-[0_0_20px_hsla(28,100%,50%,0.12)]'
                  : 'bg-card border-border hover:border-primary/30'
              } ${count === 0 ? 'opacity-40' : ''}`}
              disabled={count === 0}
            >
              <span className="text-3xl mb-2">{GENRE_ICONS[genre]}</span>
              <div className="font-oswald font-semibold text-base">{genre}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{GENRE_DESC[genre]}</div>
              {count > 0 && (
                <div className={`text-xs mt-2 font-mono ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {count} ст.
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected genre stations */}
      {activeGenre && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{GENRE_ICONS[activeGenre]}</span>
            <h2 className="font-oswald text-xl font-semibold">{activeGenre}</h2>
            <span className="text-sm text-muted-foreground">— {filteredStations.length} станций</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map((station, i) => (
              <div key={station.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fade-in">
                <StationCard station={station} />
              </div>
            ))}
          </div>
          {filteredStations.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Radio" size={32} className="text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-muted-foreground">Станций в этом жанре пока нет</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'search' | 'favorites' | 'genres' | 'history' | 'profile' | 'admin' | 'contacts' | 'support';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: 'home' as Page, label: 'Главная', icon: 'Radio' },
  { id: 'catalog' as Page, label: 'Каталог', icon: 'List' },
  { id: 'search' as Page, label: 'Поиск', icon: 'Search' },
  { id: 'favorites' as Page, label: 'Избранное', icon: 'Heart' },
  { id: 'genres' as Page, label: 'Жанры', icon: 'Music' },
  { id: 'history' as Page, label: 'История', icon: 'Clock' },
  { id: 'profile' as Page, label: 'Профиль', icon: 'User' },
  { id: 'admin' as Page, label: 'Админ', icon: 'Settings' },
  { id: 'contacts' as Page, label: 'Контакты', icon: 'Mail' },
  { id: 'support' as Page, label: 'Поддержать', icon: 'Heart' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useRadioStore();

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 fixed top-0 left-0 h-full bg-card border-r border-border z-40 py-6">
        {/* Logo */}
        <div className="px-5 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Radio" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-oswald text-xl font-semibold tracking-wide text-foreground">
              Radio<span className="text-primary">Wave</span>
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 ml-10">Радио России</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isFav = item.id === 'favorites';
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon
                  name={item.icon}
                  size={16}
                  className={isActive ? 'text-primary-foreground' : ''}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {isFav && favorites.length > 0 && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-mono ${isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/20 text-primary'}`}>
                    {favorites.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-5 mt-4">
          <div className="text-[10px] text-muted-foreground">
            © 2024 RadioWave
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Radio" size={13} className="text-primary-foreground" />
          </div>
          <span className="font-oswald text-lg font-semibold text-foreground">
            Radio<span className="text-primary">Wave</span>
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground"
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur pt-16">
          <nav className="p-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur border-t border-border px-2 py-2 flex justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="text-[9px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export type { Page };

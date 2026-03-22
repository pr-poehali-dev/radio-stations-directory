import { useState } from 'react';
import { useRadioStore } from '@/store/radioStore';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'search' | 'favorites' | 'genres' | 'history' | 'profile' | 'admin' | 'contacts' | 'support';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const mainNav = [
  { id: 'home'      as Page, label: 'Главная',   icon: 'Home' },
  { id: 'catalog'   as Page, label: 'Каталог',   icon: 'LayoutGrid' },
  { id: 'search'    as Page, label: 'Поиск',     icon: 'Search' },
  { id: 'favorites' as Page, label: 'Избранное', icon: 'Heart' },
  { id: 'genres'    as Page, label: 'Жанры',     icon: 'Music2' },
  { id: 'history'   as Page, label: 'История',   icon: 'Clock' },
];

const secondaryNav = [
  { id: 'profile'  as Page, label: 'Профиль',   icon: 'User' },
  { id: 'admin'    as Page, label: 'Админ',      icon: 'ShieldCheck' },
  { id: 'contacts' as Page, label: 'Контакты',   icon: 'Mail' },
  { id: 'support'  as Page, label: 'Поддержать', icon: 'Gem' },
];

const mobileNav = [
  { id: 'home'      as Page, label: 'Главная', icon: 'Home' },
  { id: 'catalog'   as Page, label: 'Каталог', icon: 'LayoutGrid' },
  { id: 'search'    as Page, label: 'Поиск',   icon: 'Search' },
  { id: 'favorites' as Page, label: 'Сохр.',   icon: 'Heart' },
  { id: 'profile'   as Page, label: 'Профиль', icon: 'User' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useRadioStore();

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const NavItem = ({ item }: { item: { id: Page; label: string; icon: string } }) => {
    const isActive = currentPage === item.id;
    return (
      <button
        onClick={() => handleNav(item.id)}
        className={`nav-link w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative ${
          isActive ? 'active' : 'text-muted-foreground'
        }`}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
        )}
        <Icon name={item.icon} size={16} className={isActive ? 'text-primary' : ''} />
        <span className="flex-1 text-left">{item.label}</span>
        {item.id === 'favorites' && favorites.length > 0 && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'}`}>
            {favorites.length}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-60 z-40 py-5"
        style={{ background: 'hsla(224,22%,5%,0.97)', borderRight: '1px solid hsla(255,100%,100%,0.05)' }}>
        <div className="px-5 mb-7">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-purple">
              <Icon name="Radio" size={17} className="text-primary-foreground" />
            </div>
            <div>
              <div className="font-oswald text-xl font-bold tracking-wide leading-none">
                Radio<span className="text-gradient">Wave</span>
              </div>
              <div className="text-[10px] text-muted-foreground tracking-wider">РАДИО ОНЛАЙН</div>
            </div>
          </div>
        </div>

        <div className="px-3 flex-1 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] text-muted-foreground/50 px-3 mb-2 uppercase tracking-widest">Навигация</p>
          {mainNav.map(item => <NavItem key={item.id} item={item} />)}
          <div className="border-t border-border/40 my-3" />
          <p className="text-[10px] text-muted-foreground/50 px-3 mb-2 uppercase tracking-widest">Ещё</p>
          {secondaryNav.map(item => <NavItem key={item.id} item={item} />)}
        </div>

        <div className="px-5 pt-4 border-t border-border/30">
          <div className="text-[10px] text-muted-foreground/40">© 2024 RadioWave</div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: 'hsla(224,22%,6%,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsla(255,100%,100%,0.06)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Radio" size={14} className="text-primary-foreground" />
          </div>
          <span className="font-oswald text-lg font-bold">Radio<span className="text-gradient">Wave</span></span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </header>

      {/* Mobile full menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col animate-fade-in"
          style={{ background: 'hsla(224,22%,6%,0.98)', backdropFilter: 'blur(32px)' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <span className="font-oswald text-lg font-bold">Radio<span className="text-gradient">Wave</span></span>
            <button onClick={() => setMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-muted-foreground">
              <Icon name="X" size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {[...mainNav, ...secondaryNav].map(item => {
                const isActive = currentPage === item.id;
                return (
                  <button key={item.id} onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all active:scale-95 ${
                      isActive
                        ? 'bg-primary/15 text-primary border border-primary/30'
                        : 'bg-secondary/60 text-muted-foreground border border-border/50'
                    }`}>
                    <Icon name={item.icon} size={16} className={isActive ? 'text-primary' : ''} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-2 py-2"
        style={{ background: 'hsla(224,22%,6%,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid hsla(255,100%,100%,0.06)' }}>
        {mobileNav.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl transition-all active:scale-90 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
              <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-primary/15' : ''}`}>
                <Icon name={item.icon} size={18} />
              </div>
              <span className="text-[9px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export type { Page };

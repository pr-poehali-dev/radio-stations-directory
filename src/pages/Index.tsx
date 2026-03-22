import { useState } from 'react';
import Navbar, { Page } from '@/components/Navbar';
import Player from '@/components/Player';
import { useRadioStore } from '@/store/radioStore';
import Icon from '@/components/ui/icon';

import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import SearchPage from './SearchPage';
import FavoritesPage from './FavoritesPage';
import GenresPage from './GenresPage';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import AdminPage from './AdminPage';
import ContactsPage from './ContactsPage';
import SupportPage from './SupportPage';
import TermsPage from './TermsPage';

type ExtPage = Page | 'terms';

export default function Index() {
  const [page, setPage] = useState<ExtPage>('home');
  const { currentStation } = useRadioStore();

  const navPage = (p: Page) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case 'home':     return <HomePage onNavigate={navPage} />;
      case 'catalog':  return <CatalogPage />;
      case 'search':   return <SearchPage />;
      case 'favorites':return <FavoritesPage onNavigate={navPage} />;
      case 'genres':   return <GenresPage />;
      case 'history':  return <HistoryPage onNavigate={navPage} />;
      case 'profile':  return <ProfilePage />;
      case 'admin':    return <AdminPage />;
      case 'contacts': return <ContactsPage />;
      case 'support':  return <SupportPage />;
      case 'terms':    return <TermsPage onNavigate={navPage} />;
      default:         return <HomePage onNavigate={navPage} />;
    }
  };

  const playerShown = !!currentStation;

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={page as Page} onNavigate={navPage} />

      {/* Main content */}
      <main className={`
        lg:ml-60
        pt-16 lg:pt-0
        ${playerShown ? 'pb-28 lg:pb-24' : 'pb-20 lg:pb-8'}
        px-4 md:px-6 lg:px-8
        py-6 lg:py-8
      `}>
        <div className="max-w-5xl mx-auto">
          {renderPage()}
        </div>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto mt-16 pt-6 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-primary/80 flex items-center justify-center">
                <Icon name="Radio" size={11} className="text-primary-foreground" />
              </div>
              <span className="font-oswald font-semibold text-sm text-foreground/70">RadioWave</span>
              <span>© 2024</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setPage('terms')} className="hover:text-primary transition-colors">
                Пользовательское соглашение
              </button>
              <button onClick={() => navPage('contacts')} className="hover:text-primary transition-colors">
                Контакты
              </button>
              <button onClick={() => navPage('support')} className="hover:text-primary transition-colors">
                Поддержать проект
              </button>
            </div>
          </div>
        </footer>
      </main>

      <Player />
    </div>
  );
}

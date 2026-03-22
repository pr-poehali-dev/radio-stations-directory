import { useState } from 'react';
import Navbar, { Page } from '@/components/Navbar';
import Player from '@/components/Player';
import { useRadioStore } from '@/store/radioStore';

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

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const { currentStation } = useRadioStore();

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={setPage} />;
      case 'catalog': return <CatalogPage />;
      case 'search': return <SearchPage />;
      case 'favorites': return <FavoritesPage onNavigate={setPage} />;
      case 'genres': return <GenresPage />;
      case 'history': return <HistoryPage onNavigate={setPage} />;
      case 'profile': return <ProfilePage />;
      case 'admin': return <AdminPage />;
      case 'contacts': return <ContactsPage />;
      case 'support': return <SupportPage />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={page} onNavigate={setPage} />

      <main className={`lg:ml-56 pt-16 lg:pt-0 ${currentStation ? 'pb-28 lg:pb-24' : 'pb-16 lg:pb-8'} px-4 lg:px-8 py-6 lg:py-8 max-w-full`}>
        <div className="max-w-5xl">
          {renderPage()}
        </div>
      </main>

      <Player />
    </div>
  );
}

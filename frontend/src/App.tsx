import { useEffect, useState } from 'react';
import { defaultContent, loadContent, SESSION_KEY, type SiteContent, type View } from '@/types';
import { AdminPage } from '@/components/AdminPage';
import { MarketingSite } from '@/components/MarketingSite';

function App() {
  const [view, setView] = useState<View>(window.location.hash === '#admin' ? 'admin' : 'home');
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    const syncView = () => setView(window.location.hash === '#admin' ? 'admin' : 'home');
    window.addEventListener('hashchange', syncView);
    return () => window.removeEventListener('hashchange', syncView);
  }, []);

  useEffect(() => {
    setContent(loadContent());
    setSignedIn(sessionStorage.getItem(SESSION_KEY) === 'true');
  }, []);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setMobileOpen(false);
  };
  const goHome = () => {
    window.location.hash = '';
    setMobileOpen(false);
  };

  if (view === 'admin') {
    return <AdminPage content={content} setContent={setContent} signedIn={signedIn} setSignedIn={setSignedIn} onBack={goHome} />;
  }

  return <MarketingSite content={content} onAdmin={openAdmin} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />;
}

export default App;

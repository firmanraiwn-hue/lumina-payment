import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { Menu, Globe } from 'lucide-react';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Navbar() {
  const { lang, setLang } = useLangStore();
  const t = translations[lang].nav;

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-emerald-900">
          {siteConfig.logo}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link to="/" className="hover:text-emerald-800 transition-colors">{t.home}</Link>
          <Link to="/villas" className="hover:text-emerald-800 transition-colors">{t.villas}</Link>
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-800 transition-colors">{t.contact}</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-emerald-800 transition-colors px-2 py-1 rounded-md hover:bg-stone-200"
          >
            <Globe className="w-4 h-4" />
            {lang.toUpperCase()}
          </button>
          <Link to="/villas" className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-emerald-900">
            {t.bookNow}
          </Link>
          <button className="md:hidden p-2 text-stone-600">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

import { siteConfig } from '../config/siteConfig';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Footer() {
  const { lang } = useLangStore();
  const t = translations[lang].footer;
  const desc = siteConfig.description[lang];

  return (
    <footer className="border-t border-stone-200 bg-stone-100 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-emerald-900">{siteConfig.siteName}</h3>
            <p className="text-stone-500 text-sm max-w-xs">
              {desc}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-stone-900">{t.links}</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li><a href="/" className="hover:text-emerald-800 transition-colors">{translations[lang].nav.home}</a></li>
              <li><a href="/villas" className="hover:text-emerald-800 transition-colors">{translations[lang].nav.villas}</a></li>
              <li><a href="#" className="hover:text-emerald-800 transition-colors">{t.about}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-stone-900">{t.contact}</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li>{siteConfig.address}</li>
              <li>WhatsApp: +{siteConfig.whatsappNumber}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-200 text-center text-sm text-stone-400">
          &copy; {new Date().getFullYear()} {siteConfig.siteName}. {t.rights}
        </div>
      </div>
    </footer>
  );
}

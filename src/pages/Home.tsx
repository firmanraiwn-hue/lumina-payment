import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { cottages } from '../data/cottages';
import { Star, MapPin } from 'lucide-react';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Home() {
  const { lang } = useLangStore();
  const t = translations[lang].home;
  const heroData = siteConfig.hero[lang];
  const featuredCottages = cottages.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={siteConfig.hero.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg"
          >
            {heroData.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-stone-100 drop-shadow-md"
          >
            {heroData.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              to="/villas" 
              className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-800 px-8 text-sm font-medium text-white shadow-lg transition-colors hover:bg-emerald-900"
            >
              {t.viewAllBtn}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-emerald-900 text-emerald-50 py-4">
        <div className="container mx-auto px-4 text-center text-sm font-medium">
          {t.promo} <span className="text-yellow-400 font-bold">WELCOME15</span>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-stone-900">{t.featuredTitle}</h2>
              <p className="text-stone-500">{t.featuredSub}</p>
            </div>
            <Link to="/villas" className="hidden md:block text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-900">
              {t.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCottages.map((cottage, index) => (
              <motion.div 
                key={cottage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/villas/${cottage.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-sm">
                    <img 
                      src={cottage.images[0]} 
                      alt={cottage.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg text-stone-900">{cottage.name}</h3>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{cottage.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{cottage.location}</span>
                  </div>
                  <p className="text-sm text-stone-600 line-clamp-2 mb-3">{cottage.description[lang]}</p>
                  <div className="font-medium text-emerald-900">
                    Rp {cottage.price.toLocaleString('id-ID')} <span className="text-stone-500 font-normal text-sm">{t.night}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/villas" className="inline-flex h-10 items-center justify-center rounded-md border border-stone-300 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-stone-100 text-stone-900">
              {t.viewAllBtn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

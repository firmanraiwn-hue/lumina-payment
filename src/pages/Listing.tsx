import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cottages } from '../data/cottages';
import { Star, MapPin, Users } from 'lucide-react';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Listing() {
  const { lang } = useLangStore();
  const t = translations[lang].listing;
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: t.all },
    { id: '1-2', label: `1-2 ${t.guests}` },
    { id: '3-4', label: `3-4 ${t.guests}` },
    { id: '5+', label: `5+ ${t.guests}` }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-stone-900">{t.title}</h1>
        <p className="text-stone-500 max-w-2xl">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {filterOptions.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.id 
                ? 'bg-emerald-800 text-white' 
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cottages.map((cottage, index) => (
          <motion.div 
            key={cottage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex flex-col h-full border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            <Link to={`/villas/${cottage.id}`} className="flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={cottage.images[0]} 
                  alt={cottage.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg leading-tight text-stone-900">{cottage.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium shrink-0">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span>{cottage.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone-500 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{cottage.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{t.upTo} {cottage.maxGuests}</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="font-semibold text-emerald-900">
                    Rp {cottage.price.toLocaleString('id-ID')} <span className="text-stone-500 font-normal text-sm">{translations[lang].home.night}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

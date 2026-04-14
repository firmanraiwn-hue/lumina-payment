import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/useBookingStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Booking() {
  const navigate = useNavigate();
  const { booking, setBookingDetails } = useBookingStore();
  const { cottage, checkIn, checkOut, nights, totalPrice } = booking;
  
  const { lang } = useLangStore();
  const t = translations[lang].booking;

  const [formData, setFormData] = useState({
    guestName: booking.guestName || '',
    guestEmail: booking.guestEmail || '',
    guestPhone: booking.guestPhone || '',
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!cottage || !checkIn || !checkOut) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4 text-stone-900">{t.notFound}</h2>
        <button onClick={() => navigate('/villas')} className="text-emerald-700 underline">{t.back}</button>
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = () => {
    if (!promoCode) return;
    if (promoCode.toUpperCase() === 'WELCOME15') {
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingDetails(formData);
    navigate('/payment');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-stone-900">{t.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-stone-900">{t.yourDetails}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t.fullName}</label>
              <input 
                type="text" 
                name="guestName"
                required
                value={formData.guestName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 focus:border-transparent outline-none transition-all bg-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t.email}</label>
              <input 
                type="email" 
                name="guestEmail"
                required
                value={formData.guestEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 focus:border-transparent outline-none transition-all bg-white"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t.phone}</label>
              <input 
                type="tel" 
                name="guestPhone"
                required
                value={formData.guestPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-800 focus:border-transparent outline-none transition-all bg-white"
                placeholder="+62..."
              />
            </div>

            <hr className="my-8 border-stone-200" />

            <h2 className="text-xl font-semibold mb-6 text-stone-900">{t.cancelPolicy}</h2>
            <p className="text-stone-600 text-sm mb-8">
              {t.cancelText}
            </p>

            <button 
              type="submit"
              className="w-full bg-emerald-800 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-900 transition-colors shadow-md"
            >
              {t.continue}
            </button>
          </form>
        </div>

        {/* Summary Card */}
        <div>
          <div className="border border-stone-200 rounded-2xl p-6 sticky top-24 bg-white shadow-sm">
            <div className="flex gap-4 mb-6 pb-6 border-b border-stone-200">
              <img 
                src={cottage.images[0]} 
                alt={cottage.name} 
                className="w-24 h-24 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-semibold text-lg text-stone-900">{cottage.name}</h3>
                <p className="text-sm text-stone-500">{cottage.location}</p>
                <div className="flex items-center gap-1 text-sm mt-1">
                  <span className="font-medium text-stone-900">{cottage.rating}</span>
                  <span className="text-stone-500">({cottage.reviews} {translations[lang].detail.reviews})</span>
                </div>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="mb-6 pb-6 border-b border-stone-200">
              <h3 className="font-semibold text-sm mb-3 text-stone-900">{t.promoTitle}</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoStatus('idle'); }}
                  placeholder={t.promoPlaceholder}
                  className="flex-1 px-3 py-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-800 focus:border-transparent outline-none uppercase transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  {t.apply}
                </button>
              </div>
              <AnimatePresence>
                {promoStatus === 'success' && (
                  <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-emerald-600 text-xs mt-2 flex items-center gap-1 font-medium overflow-hidden">
                    <CheckCircle2 className="w-3.5 h-3.5"/> {t.promoSuccess}
                  </motion.p>
                )}
                {promoStatus === 'error' && (
                  <motion.p initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="text-red-500 text-xs mt-2 font-medium overflow-hidden">
                    {t.promoError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <h3 className="font-semibold text-lg mb-4 text-stone-900">{t.priceDetails}</h3>
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-stone-200 text-stone-700">
              <div className="flex justify-between">
                <span>Rp {cottage.price.toLocaleString('id-ID')} x {nights} {t.nights}</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>{translations[lang].detail.serviceFee}</span>
                <span>Rp 0</span>
              </div>
              {promoStatus === 'success' && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>{t.promoDiscount}</span>
                  <span>- Rp 0</span>
                </div>
              )}
            </div>

            <div className="flex justify-between font-bold text-lg text-stone-900">
              <span>{t.totalPayment}</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

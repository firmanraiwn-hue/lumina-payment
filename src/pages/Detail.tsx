import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cottages } from '../data/cottages';
import { useBookingStore } from '../store/useBookingStore';
import { Star, MapPin, Users, Check } from 'lucide-react';
import { format, differenceInDays, addDays } from 'date-fns';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cottage = cottages.find(c => c.id === id);
  const setBookingDetails = useBookingStore(state => state.setBookingDetails);
  
  const { lang } = useLangStore();
  const t = translations[lang].detail;

  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(addDays(new Date(), 2));
  const [guests, setGuests] = useState(1);

  if (!cottage) {
    return <div className="container mx-auto px-4 py-24 text-center">Not found</div>;
  }

  const nights = checkIn && checkOut ? Math.max(1, differenceInDays(checkOut, checkIn)) : 0;
  const totalPrice = nights * cottage.price;

  const handleBookNow = () => {
    if (!checkIn || !checkOut) {
      alert(t.alertDates);
      return;
    }
    setBookingDetails({
      cottage,
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice
    });
    navigate('/booking');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-stone-900">{cottage.name}</h1>
        <div className="flex items-center gap-4 text-sm font-medium text-stone-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span>{cottage.rating} ({cottage.reviews} {t.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{cottage.location}</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-12 h-[400px] md:h-[500px]">
        <div className="md:col-span-2 h-full">
          <img src={cottage.images[0]} alt={cottage.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <img src={cottage.images[1]} alt={cottage.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <img src={cottage.images[2] || cottage.images[0]} alt={cottage.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
          <img src={cottage.images[0]} alt={cottage.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <img src={cottage.images[1]} alt={cottage.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 pb-6 border-b border-stone-200 mb-6">
            <h2 className="text-xl font-semibold text-stone-900">{t.hostedBy} Lumina</h2>
            <div className="ml-auto flex items-center gap-2 text-sm text-stone-500">
              <Users className="w-4 h-4" />
              <span>{translations[lang].listing.upTo} {cottage.maxGuests} {translations[lang].listing.guests}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-stone-900">{t.about}</h3>
            <p className="text-stone-600 leading-relaxed">{cottage.description[lang]}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-stone-900">{t.facilities}</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {cottage.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-3 text-stone-700">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>{facility[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Panel (Sticky) */}
        <div className="relative">
          <div className="sticky top-24 border border-stone-200 rounded-2xl p-6 shadow-xl bg-white">
            <div className="mb-6">
              <span className="text-2xl font-bold text-emerald-900">Rp {cottage.price.toLocaleString('id-ID')}</span>
              <span className="text-stone-500"> {translations[lang].home.night}</span>
            </div>

            <div className="border border-stone-300 rounded-lg mb-6 overflow-hidden">
              <div className="flex border-b border-stone-300">
                <div className="flex-1 p-3 border-r border-stone-300">
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">{t.checkIn}</label>
                  <input 
                    type="date" 
                    value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full text-sm outline-none bg-transparent text-stone-900"
                    min={format(new Date(), 'yyyy-MM-dd')}
                  />
                </div>
                <div className="flex-1 p-3">
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">{t.checkOut}</label>
                  <input 
                    type="date" 
                    value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
                    onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full text-sm outline-none bg-transparent text-stone-900"
                    min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                  />
                </div>
              </div>
              <div className="p-3">
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">{t.guests}</label>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-sm outline-none bg-transparent text-stone-900"
                >
                  {Array.from({ length: cottage.maxGuests }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num} {translations[lang].listing.guests}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={handleBookNow}
              className="w-full bg-emerald-800 text-white py-3 rounded-lg font-semibold hover:bg-emerald-900 transition-colors mb-4"
            >
              {t.reserve}
            </button>
            <p className="text-center text-sm text-stone-500 mb-6">{t.noChargeYet}</p>

            {nights > 0 && (
              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex justify-between">
                  <span className="underline">Rp {cottage.price.toLocaleString('id-ID')} x {nights} {translations[lang].booking.nights}</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">{t.serviceFee}</span>
                  <span>Rp 0</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-base text-stone-900">
                  <span>{t.total}</span>
                  <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

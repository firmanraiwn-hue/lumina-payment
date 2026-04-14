import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingStore } from '../store/useBookingStore';
import { siteConfig } from '../config/siteConfig';
import { format } from 'date-fns';
import { Copy, CheckCircle2, CreditCard, QrCode, MessageCircle, Info } from 'lucide-react';
import { useLangStore } from '../store/useLangStore';
import { translations } from '../i18n/translations';

export function Payment() {
  const navigate = useNavigate();
  const { booking } = useBookingStore();
  const { cottage, checkIn, checkOut, totalPrice, guestName } = booking;
  
  const { lang } = useLangStore();
  const t = translations[lang].payment;

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'qris'>('bank');
  const [selectedBank, setSelectedBank] = useState(siteConfig.payment.bankAccounts[0].id);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [waClicked, setWaClicked] = useState(false);

  useEffect(() => {
    if (!cottage) {
      navigate('/');
    }
  }, [cottage, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!cottage || !checkIn || !checkOut) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppLink = () => {
    const method = paymentMethod === 'bank' 
      ? `${t.bankTransfer} (${siteConfig.payment.bankAccounts.find(b => b.id === selectedBank)?.bankName})` 
      : t.qris;
      
    const message = lang === 'id' 
      ? `Halo, saya sudah melakukan pembayaran untuk pesanan saya:\n\n*Nama:* ${guestName}\n*Villa:* ${cottage.name}\n*Tanggal:* ${format(checkIn, 'dd MMM yyyy')} - ${format(checkOut, 'dd MMM yyyy')}\n*Total:* Rp ${totalPrice.toLocaleString('id-ID')}\n*Metode Pembayaran:* ${method}\n\nBerikut adalah bukti transfer saya:`
      : `Hello, I have made a payment for my booking:\n\n*Name:* ${guestName}\n*Villa:* ${cottage.name}\n*Date:* ${format(checkIn, 'dd MMM yyyy')} - ${format(checkOut, 'dd MMM yyyy')}\n*Total:* Rp ${totalPrice.toLocaleString('id-ID')}\n*Payment Method:* ${method}\n\nHere is my transfer receipt:`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
  };

  const handleWaClick = () => {
    setWaClicked(true);
    setTimeout(() => setWaClicked(false), 8000);
  };

  const activeBank = siteConfig.payment.bankAccounts.find(b => b.id === selectedBank);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Visual Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">1</div>
              <span className="text-xs font-medium mt-2 text-emerald-800">{t.step1}</span>
            </div>
            <div className="flex-1 h-1 bg-emerald-800 -mt-6"></div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm ring-4 ring-emerald-100 shadow-sm">2</div>
              <span className="text-xs font-bold mt-2 text-emerald-800">{t.step2}</span>
            </div>
            <div className="flex-1 h-1 bg-stone-200 -mt-6"></div>
            <div className="flex flex-col items-center relative z-10">
              <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-xs font-medium mt-2 text-stone-500">{t.step3}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-900 text-white p-6 md:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"></div>
            <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
            <p className="text-emerald-100 mb-6">{t.subtitle}</p>
            
            <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-3xl font-mono tracking-wider font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Order Summary */}
            <div className="bg-stone-50 rounded-2xl p-5 mb-8 border border-stone-200">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-semibold text-stone-900">{cottage.name}</h3>
                  <p className="text-sm text-stone-500">{format(checkIn, 'dd MMM yyyy')} - {format(checkOut, 'dd MMM yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500">{t.totalBill}</p>
                  <p className="font-bold text-xl text-emerald-900">Rp {totalPrice.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <h3 className="font-semibold text-lg mb-4 text-stone-900">{t.selectMethod}</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'bank' 
                    ? 'border-emerald-800 bg-emerald-50' 
                    : 'border-stone-100 hover:border-stone-200 bg-white'
                }`}
              >
                <CreditCard className={`w-6 h-6 mb-2 ${paymentMethod === 'bank' ? 'text-emerald-800' : 'text-stone-400'}`} />
                <span className={`font-medium ${paymentMethod === 'bank' ? 'text-emerald-900' : 'text-stone-500'}`}>{t.bankTransfer}</span>
              </button>
              <button
                onClick={() => setPaymentMethod('qris')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'qris' 
                    ? 'border-emerald-800 bg-emerald-50' 
                    : 'border-stone-100 hover:border-stone-200 bg-white'
                }`}
              >
                <QrCode className={`w-6 h-6 mb-2 ${paymentMethod === 'qris' ? 'text-emerald-800' : 'text-stone-400'}`} />
                <span className={`font-medium ${paymentMethod === 'qris' ? 'text-emerald-900' : 'text-stone-500'}`}>{t.qris}</span>
              </button>
            </div>

            {/* Payment Details */}
            <motion.div
              key={paymentMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {paymentMethod === 'bank' ? (
                <div className="space-y-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {siteConfig.payment.bankAccounts.map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => setSelectedBank(bank.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap ${
                          selectedBank === bank.id
                            ? 'border-emerald-800 bg-emerald-800 text-white shadow-sm'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-50 bg-white'
                        }`}
                      >
                        {bank.bankName}
                      </button>
                    ))}
                  </div>

                  {activeBank && (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <img src={activeBank.logo} alt={activeBank.bankName} className="h-8 object-contain" referrerPolicy="no-referrer" />
                        <span className="text-xs font-medium text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-full">{t.manualTransfer}</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t.accountNumber}</p>
                          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-stone-200 shadow-sm">
                            <span className="font-mono font-bold text-lg tracking-wider text-stone-900">{activeBank.accountNumber}</span>
                            <button 
                              onClick={() => handleCopy(activeBank.accountNumber)}
                              className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 text-sm font-medium"
                            >
                              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                              {copied ? t.copied : t.copy}
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-stone-500 mb-1">{t.accountHolder}</p>
                          <p className="font-medium text-stone-900">{activeBank.accountHolder}</p>
                        </div>
                      </div>

                      {/* WhatsApp Instructions */}
                      <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                        <h5 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" /> {t.howToConfirm}
                        </h5>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-emerald-800">
                          <li>{t.inst1}</li>
                          <li>{t.inst2}</li>
                          <li>{t.inst3}</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center">
                  <img 
                    src={siteConfig.payment.qrisImage} 
                    alt="QRIS" 
                    className="w-48 h-48 mx-auto mb-6 object-contain bg-white p-2 rounded-xl shadow-sm border border-stone-100"
                    referrerPolicy="no-referrer"
                  />
                  <h4 className="font-bold text-lg mb-2 text-stone-900">{t.scanToPay}</h4>
                  <p className="text-sm text-stone-500 max-w-xs mx-auto">
                    {t.scanInstruction}
                  </p>
                </div>
              )}
            </motion.div>

            <hr className="my-8 border-stone-200" />

            {/* WhatsApp Confirmation */}
            <div className="text-center">
              <h4 className="font-semibold mb-2 text-stone-900">{t.alreadyPaid}</h4>
              <p className="text-sm text-stone-500 mb-6">{t.sendProof}</p>
              
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWaClick}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-green-500/20"
              >
                <MessageCircle className="w-6 h-6" />
                {t.confirmWa}
              </a>

              <AnimatePresence>
                {waClicked && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-start gap-3 text-left overflow-hidden"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t.openingWa}</p>
                      <p className="text-xs mt-1 text-emerald-700">{t.waPrepared}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

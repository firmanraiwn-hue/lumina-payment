import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cottage } from '../data/cottages';

export interface BookingDetails {
  cottage: Cottage | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  totalPrice: number;
  nights: number;
}

interface BookingStore {
  booking: BookingDetails;
  setBookingDetails: (details: Partial<BookingDetails>) => void;
  clearBooking: () => void;
}

const initialBooking: BookingDetails = {
  cottage: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  totalPrice: 0,
  nights: 0,
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      booking: initialBooking,
      setBookingDetails: (details) =>
        set((state) => ({
          booking: { ...state.booking, ...details },
        })),
      clearBooking: () => set({ booking: initialBooking }),
    }),
    {
      name: 'booking-storage',
    }
  )
);

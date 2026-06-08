import { create } from 'zustand';
import { Activity, Booking } from '@/types';

interface BookingState {
  selectedActivity: Activity | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  step: number;
  bookings: Booking[];
  reset: () => void;
  setActivity: (activity: Activity) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  confirmBooking: () => Promise<Booking>;
  cancelBooking: (id: string) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedActivity: null,
  selectedDate: null,
  selectedTime: null,
  step: 1,
  bookings: [],
  reset: () => set({ 
    selectedActivity: null, 
    selectedDate: null, 
    selectedTime: null, 
    step: 1 
  }),
  setActivity: (activity) => set({ selectedActivity: activity }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  confirmBooking: async () => {
    const { selectedActivity, selectedDate, selectedTime } = get();
    if (!selectedActivity || !selectedDate || !selectedTime) {
      throw new Error('Missing booking data');
    }
    
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      activityId: selectedActivity.id,
      childId: 'child-1',
      date: selectedDate.toISOString(),
      timeSlot: selectedTime,
      status: 'confirmed',
      qrCode: `qr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({ bookings: [...state.bookings, booking] }));
    return booking;
  },
  cancelBooking: (id) => set((state) => ({ 
    bookings: state.bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b) 
  })),
}));
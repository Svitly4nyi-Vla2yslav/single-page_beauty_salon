import { addDays, format } from 'date-fns';

export type BookingServiceId =
  | 'lashes'
  | 'brows'
  | 'facial'
  | 'pmu'
  | 'headSpa'
  | 'antiAging'
  | 'makeup'
  | 'consulting';

export type SpecialistId = 'any' | 'lara' | 'amina' | 'sofia';

export type TimeSlot = {
  time: string;
  available: boolean;
};

export const bookingServices: Array<{
  id: BookingServiceId;
  priceRange: string;
  durationMinutes: number;
}> = [
  { id: 'lashes', priceRange: '89-129 EUR', durationMinutes: 120 },
  { id: 'brows', priceRange: '39-59 EUR', durationMinutes: 60 },
  { id: 'facial', priceRange: '79-119 EUR', durationMinutes: 75 },
  { id: 'pmu', priceRange: '249-320 EUR', durationMinutes: 150 },
  { id: 'headSpa', priceRange: '99-129 EUR', durationMinutes: 90 },
  { id: 'antiAging', priceRange: '109-139 EUR', durationMinutes: 80 },
  { id: 'makeup', priceRange: '69-140 EUR', durationMinutes: 70 },
  { id: 'consulting', priceRange: '35-55 EUR', durationMinutes: 45 },
] as const;

export const specialists: SpecialistId[] = ['any', 'lara', 'amina', 'sofia'];

export const businessTimeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
] as const;

const bookedOverrides: Record<string, string[]> = {
  '2026-03-20': ['09:30', '12:30', '15:00'],
  '2026-03-21': ['10:00', '11:30', '14:30', '16:30'],
  '2026-03-24': ['09:00', '09:30', '13:00', '17:30'],
  '2026-03-26': ['10:30', '12:00', '14:00'],
  '2026-03-28': ['11:00', '13:30', '15:30'],
  '2026-04-02': ['09:30', '11:00', '16:00'],
  '2026-04-08': ['10:00', '14:30', '17:00'],
  '2026-04-16': ['09:00', '12:00', '15:00'],
  '2026-04-23': ['11:30', '13:00', '16:30'],
};

const generateSeededBookedTimes = (dateKey: string) => {
  const seed = dateKey
    .split('-')
    .map(Number)
    .reduce((sum, item, index) => sum + item * (index + 3), 0);

  const count = seed % 4;
  const slots = new Set<string>();
  for (let index = 0; index < count; index += 1) {
    const slotIndex = (seed + index * 5) % businessTimeSlots.length;
    slots.add(businessTimeSlots[slotIndex]);
  }
  return [...slots];
};

export const isStudioClosed = (date: Date) => {
  const day = date.getDay();
  return day === 0;
};

export const getAvailabilityForDate = (date: Date): TimeSlot[] => {
  if (isStudioClosed(date)) {
    return businessTimeSlots.map((time) => ({
      time,
      available: false,
    }));
  }

  const dateKey = format(date, 'yyyy-MM-dd');
  const occupied = new Set([...(bookedOverrides[dateKey] ?? []), ...generateSeededBookedTimes(dateKey)]);

  return businessTimeSlots.map((time) => ({
    time,
    available: !occupied.has(time),
  }));
};

export const getSuggestedBookingDays = (startDate: Date, amount: number) =>
  Array.from({ length: amount }, (_, index) => addDays(startDate, index)).filter((date) => !isStudioClosed(date));

export const getServiceMeta = (serviceId: BookingServiceId) =>
  bookingServices.find((service) => service.id === serviceId) ?? bookingServices[0];

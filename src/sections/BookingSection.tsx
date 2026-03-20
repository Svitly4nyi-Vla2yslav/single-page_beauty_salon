import { zodResolver } from '@hookform/resolvers/zod';
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { de, enUS, tr as trLocale, uk } from 'date-fns/locale';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import {
  bookingServices,
  getAvailabilityForDate,
  getServiceMeta,
  specialists,
  type BookingServiceId,
  type SpecialistId,
} from '../data/booking';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionHeading } from '../components/SectionHeading';

const localeMap = {
  de,
  en: enUS,
  uk,
  tr: trLocale,
} as const;

export const BookingSection = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  const schema = z.object({
    fullName: z.string().min(2, t('booking.validation.fullName')),
    phone: z.string().min(6, t('booking.validation.phone')),
    email: z.string().email(t('booking.validation.email')),
    service: z.string().min(1, t('booking.validation.service')),
    specialist: z.string().optional(),
    date: z.string().min(1, t('booking.validation.date')),
    time: z.string().min(1, t('booking.validation.time')),
    note: z.string().optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: t('booking.validation.consent') }),
    }),
  });

  type BookingFormValues = z.infer<typeof schema>;

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 20));
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const locale = localeMap[i18n.language as keyof typeof localeMap] ?? de;
  const availability = useMemo(() => getAvailabilityForDate(selectedDate), [selectedDate]);
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    const days: Date[] = [];
    for (let date = start; date <= end; date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
      days.push(new Date(date));
    }
    return days;
  }, [currentMonth]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 6 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
  }, [selectedDate]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      service: 'lashes',
      specialist: 'any',
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: '',
      note: '',
      consent: true,
    },
  });

  const selectedService = watch('service') as BookingServiceId;
  const selectedSpecialist = watch('specialist') as SpecialistId;
  const serviceMeta = getServiceMeta(selectedService);

  useEffect(() => {
    setValue('date', format(selectedDate, 'yyyy-MM-dd'));
  }, [selectedDate, setValue]);

  useEffect(() => {
    setValue('time', selectedSlot);
  }, [selectedSlot, setValue]);

  const onSubmit = async (values: BookingFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSuccess(true);
    reset({
      ...values,
      fullName: '',
      phone: '',
      email: '',
      note: '',
      time: '',
    });
    setSelectedSlot('');
  };

  return (
    <section id="booking" ref={sectionRef} className="section-shell px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('booking.eyebrow')}
          title={t('booking.title')}
          description={t('booking.description')}
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal="blur" className="rounded-[2.6rem] border border-black/8 bg-white/80 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.06)] backdrop-blur md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">{t('booking.calendar')}</p>
                <h3 className="mt-2 font-display text-4xl text-ink">{format(currentMonth, 'LLLL yyyy', { locale })}</h3>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentMonth((current) => subMonths(current, 1))}
                  className="rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-black/70"
                >
                  {t('booking.prevMonth')}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonth((current) => addMonths(current, 1))}
                  className="rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-black/70"
                >
                  {t('booking.nextMonth')}
                </button>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/8 bg-black/[0.02] p-4">
              <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <span key={dayIndex}>{format(new Date(2026, 2, 16 + dayIndex), 'EEEEE', { locale })}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-7 gap-2">
                {calendarDays.map((day) => {
                  const inCurrentMonth = isSameMonth(day, currentMonth);
                  const active = isSameDay(day, selectedDate);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day);
                        setSelectedSlot('');
                      }}
                      className={`aspect-square rounded-2xl text-sm font-semibold transition ${
                        active
                          ? 'bg-ink text-white'
                          : inCurrentMonth
                            ? 'bg-white text-black/70 hover:bg-black/5'
                            : 'bg-black/[0.03] text-black/25'
                      }`}
                    >
                      <span className="flex h-full flex-col items-center justify-center gap-1">
                        <span>{format(day, 'd')}</span>
                        {isToday(day) ? <span className="h-1.5 w-1.5 rounded-full bg-gold" /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-black/45">{t('booking.week')}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-6">
                {weekDays.map((day) => (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedSlot('');
                    }}
                    className={`rounded-[1.4rem] border p-4 text-left transition ${
                      isSameDay(day, selectedDate)
                        ? 'border-black bg-ink text-white'
                        : 'border-black/8 bg-white/75 text-black/70'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] opacity-60">
                      {format(day, 'EEE', { locale })}
                    </p>
                    <p className="mt-2 text-lg font-semibold">{format(day, 'd LLL', { locale })}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">{t('booking.day')}</p>
                <span className="text-xs font-medium text-black/45">{t('booking.occupiedNote')}</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-4">
                {availability.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    className={`rounded-[1.2rem] border px-4 py-4 text-sm font-semibold transition ${
                      selectedSlot === slot.time
                        ? 'border-black bg-ink text-white'
                        : slot.available
                          ? 'border-black/10 bg-white text-black/70 hover:-translate-y-0.5'
                          : 'cursor-not-allowed border-black/6 bg-black/[0.04] text-black/25'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div data-reveal="fade-left" className="rounded-[2.6rem] border border-black/8 bg-white/82 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.06)] backdrop-blur md:p-8">
            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="rounded-[2rem] border border-gold/20 bg-gold/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-black/45">{t('booking.summary')}</p>
                <div className="mt-4 grid gap-3 text-sm text-black/68">
                  <div className="flex justify-between gap-4">
                    <span>{t('booking.service')}</span>
                    <span className="font-semibold text-black">{t(`services.items.${selectedService}.title`)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>{t('booking.selectedDate')}</span>
                    <span className="font-semibold text-black">{format(selectedDate, 'dd.MM.yyyy')}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>{t('booking.selectedTime')}</span>
                    <span className="font-semibold text-black">{selectedSlot || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>{t('booking.selectedSpecialist')}</span>
                    <span className="font-semibold text-black">
                      {t(`booking.specialists.${selectedSpecialist}`)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>{t('booking.selectedPrice')}</span>
                    <span className="font-semibold text-black">{serviceMeta.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.fields.fullName')}</label>
                  <input
                    {...register('fullName')}
                    className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                    placeholder={t('booking.fields.placeholderName')}
                  />
                  {errors.fullName ? <p className="mt-2 text-sm text-ruby">{errors.fullName.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.fields.phone')}</label>
                  <input
                    {...register('phone')}
                    className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                    placeholder={t('booking.fields.placeholderPhone')}
                  />
                  {errors.phone ? <p className="mt-2 text-sm text-ruby">{errors.phone.message}</p> : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.fields.email')}</label>
                <input
                  {...register('email')}
                  className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                  placeholder={t('booking.fields.placeholderEmail')}
                />
                {errors.email ? <p className="mt-2 text-sm text-ruby">{errors.email.message}</p> : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.service')}</label>
                  <select
                    {...register('service')}
                    className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                  >
                    {bookingServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {t(`services.items.${service.id}.title`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.specialist')}</label>
                  <select
                    {...register('specialist')}
                    className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                  >
                    {specialists.map((specialist) => (
                      <option key={specialist} value={specialist}>
                        {t(`booking.specialists.${specialist}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <input type="hidden" {...register('date')} />
              <input type="hidden" {...register('time')} />
              {errors.date ? <p className="text-sm text-ruby">{errors.date.message}</p> : null}
              {errors.time ? <p className="text-sm text-ruby">{errors.time.message}</p> : null}

              <div>
                <label className="mb-2 block text-sm font-semibold text-black/65">{t('booking.fields.note')}</label>
                <textarea
                  {...register('note')}
                  rows={4}
                  className="w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none"
                  placeholder={t('booking.fields.placeholderNote')}
                />
              </div>

              <label className="flex items-start gap-3 rounded-[1.2rem] border border-black/8 bg-black/[0.02] px-4 py-4 text-sm text-black/65">
                <input type="checkbox" {...register('consent')} className="mt-1" />
                <span>{t('booking.fields.consent')}</span>
              </label>
              {errors.consent ? <p className="text-sm text-ruby">{errors.consent.message}</p> : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white"
                >
                  {isSubmitting ? '...' : t('booking.buttons.submit')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSelectedSlot('');
                    setSuccess(false);
                  }}
                  className="rounded-full border border-black/10 px-6 py-4 text-sm font-semibold text-black/70"
                >
                  {t('booking.buttons.reset')}
                </button>
              </div>
            </form>

            {success ? (
              <div className="mt-6 rounded-[2rem] border border-gold/25 bg-gold/10 p-5">
                <p className="font-display text-3xl text-ink">{t('booking.success.title')}</p>
                <p className="mt-3 text-sm leading-7 text-black/65">{t('booking.success.description')}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

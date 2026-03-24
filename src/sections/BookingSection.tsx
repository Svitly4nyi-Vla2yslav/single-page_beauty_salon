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
import styled from 'styled-components';
import { z } from 'zod';
import { SectionHeading } from '../components/SectionHeading';
import {
  bookingServices,
  getAvailabilityForDate,
  getServiceMeta,
  specialists,
  type BookingServiceId,
  type SpecialistId,
} from '../data/booking';
import { useScrollReveal } from '../hooks/useScrollReveal';

const localeMap = {
  de,
  en: enUS,
  uk,
  tr: trLocale,
} as const;

const Section = styled.section.attrs({
  className: 'section-shell px-4 py-24 md:px-8 md:py-32',
})``;

const Container = styled.div.attrs({
  className: 'mx-auto max-w-7xl',
})``;

const MainGrid = styled.div.attrs({
  className: 'mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]',
})``;

const CalendarCard = styled.div.attrs({
  className:
    'rounded-[2.6rem] border border-black/8 bg-white/80 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.06)] backdrop-blur md:p-8',
  'data-reveal': 'blur',
})``;

const FormCard = styled.div.attrs({
  className:
    'rounded-[2.6rem] border border-black/8 bg-white/82 p-6 shadow-[0_30px_80px_rgba(17,17,17,0.06)] backdrop-blur md:p-8',
  'data-reveal': 'fade-left',
})``;

const RowBetween = styled.div.attrs({
  className: 'flex flex-wrap items-center justify-between gap-4',
})``;

const SectionLabel = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.24em] text-black/45',
})``;

const MonthTitle = styled.h3.attrs({
  className: 'mt-2 font-display text-4xl text-ink',
})``;

const NavButtons = styled.div.attrs({
  className: 'flex gap-3',
})``;

const GhostButton = styled.button.attrs({
  className: 'rounded-full border border-black/10 px-4 py-3 text-sm font-semibold text-black/70',
})``;

const CalendarShell = styled.div.attrs({
  className: 'mt-8 overflow-hidden rounded-[2rem] border border-black/8 bg-black/[0.02] p-4',
})``;

const DaysHeader = styled.div.attrs({
  className: 'grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40',
})``;

const DaysGrid = styled.div.attrs({
  className: 'mt-4 grid grid-cols-7 gap-2',
})``;

const DayButton = styled.button.attrs<{ $active: boolean; $inMonth: boolean }>(
  ({ $active, $inMonth }) => ({
    className: `aspect-square rounded-2xl text-sm font-semibold transition ${
      $active
        ? 'bg-ink text-white'
        : $inMonth
          ? 'bg-white text-black/70 hover:bg-black/5'
          : 'bg-black/[0.03] text-black/25'
    }`,
  }),
)``;

const DayContent = styled.span.attrs({
  className: 'flex h-full flex-col items-center justify-center gap-1',
})``;

const TodayDot = styled.span.attrs({
  className: 'h-1.5 w-1.5 rounded-full bg-gold',
})``;

const WeekWrap = styled.div.attrs({
  className: 'mt-8',
})``;

const WeekGrid = styled.div.attrs({
  className: 'mt-4 grid gap-3 md:grid-cols-6',
})``;

const WeekButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: `rounded-[1.4rem] border p-4 text-left transition ${
    $active ? 'border-black bg-ink text-white' : 'border-black/8 bg-white/75 text-black/70'
  }`,
}))``;

const WeekDay = styled.p.attrs({
  className: 'text-xs uppercase tracking-[0.18em] opacity-60',
})``;

const WeekDate = styled.p.attrs({
  className: 'mt-2 text-lg font-semibold',
})``;

const SlotsWrap = styled.div.attrs({
  className: 'mt-8',
})``;

const OccupiedNote = styled.span.attrs({
  className: 'text-xs font-medium text-black/45',
})``;

const SlotsGrid = styled.div.attrs({
  className: 'mt-4 grid gap-3 md:grid-cols-4',
})``;

const SlotButton = styled.button.attrs<{ $state: 'selected' | 'available' | 'disabled' }>(
  ({ $state }) => ({
    className: `rounded-[1.2rem] border px-4 py-4 text-sm font-semibold transition ${
      $state === 'selected'
        ? 'border-black bg-ink text-white'
        : $state === 'available'
          ? 'border-black/10 bg-white text-black/70 hover:-translate-y-0.5'
          : 'cursor-not-allowed border-black/6 bg-black/[0.04] text-black/25'
    }`,
  }),
)``;

const Form = styled.form.attrs({
  className: 'grid gap-5',
})``;

const SummaryCard = styled.div.attrs({
  className: 'rounded-[2rem] border border-gold/20 bg-gold/10 p-5',
})``;

const SummaryGrid = styled.div.attrs({
  className: 'mt-4 grid gap-3 text-sm text-black/68',
})``;

const SummaryRow = styled.div.attrs({
  className: 'flex justify-between gap-4',
})``;

const SummaryValue = styled.span.attrs({
  className: 'font-semibold text-black',
})``;

const TwoColGrid = styled.div.attrs({
  className: 'grid gap-4 md:grid-cols-2',
})``;

const FieldWrap = styled.div.attrs({})``;

const Label = styled.label.attrs({
  className: 'mb-2 block text-sm font-semibold text-black/65',
})``;

const Input = styled.input.attrs({
  className: 'w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none',
})``;

const Select = styled.select.attrs({
  className: 'w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none',
})``;

const Textarea = styled.textarea.attrs({
  className: 'w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-4 outline-none',
})``;

const ErrorText = styled.p.attrs({
  className: 'mt-2 text-sm text-ruby',
})``;

const InlineError = styled.p.attrs({
  className: 'text-sm text-ruby',
})``;

const ConsentLabel = styled.label.attrs({
  className:
    'flex items-start gap-3 rounded-[1.2rem] border border-black/8 bg-black/[0.02] px-4 py-4 text-sm text-black/65',
})``;

const ConsentCheckbox = styled.input.attrs({
  className: 'mt-1',
})``;

const Actions = styled.div.attrs({
  className: 'flex flex-wrap gap-3',
})``;

const SubmitButton = styled.button.attrs({
  className: 'rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white',
})``;

const ResetButton = styled.button.attrs({
  className: 'rounded-full border border-black/10 px-6 py-4 text-sm font-semibold text-black/70',
})``;

const SuccessCard = styled.div.attrs({
  className: 'mt-6 rounded-[2rem] border border-gold/25 bg-gold/10 p-5',
})``;

const SuccessTitle = styled.p.attrs({
  className: 'font-display text-3xl text-ink',
})``;

const SuccessBody = styled.p.attrs({
  className: 'mt-3 text-sm leading-7 text-black/65',
})``;

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
    <Section id="booking" ref={sectionRef}>
      <Container>
        <SectionHeading
          eyebrow={t('booking.eyebrow')}
          title={t('booking.title')}
          description={t('booking.description')}
        />

        <MainGrid>
          <CalendarCard>
            <RowBetween>
              <div>
                <SectionLabel>{t('booking.calendar')}</SectionLabel>
                <MonthTitle>{format(currentMonth, 'LLLL yyyy', { locale })}</MonthTitle>
              </div>
              <NavButtons>
                <GhostButton
                  type="button"
                  onClick={() => setCurrentMonth((current) => subMonths(current, 1))}
                >
                  {t('booking.prevMonth')}
                </GhostButton>
                <GhostButton
                  type="button"
                  onClick={() => setCurrentMonth((current) => addMonths(current, 1))}
                >
                  {t('booking.nextMonth')}
                </GhostButton>
              </NavButtons>
            </RowBetween>

            <CalendarShell>
              <DaysHeader>
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <span key={dayIndex}>{format(new Date(2026, 2, 16 + dayIndex), 'EEEEE', { locale })}</span>
                ))}
              </DaysHeader>
              <DaysGrid>
                {calendarDays.map((day) => {
                  const inCurrentMonth = isSameMonth(day, currentMonth);
                  const active = isSameDay(day, selectedDate);

                  return (
                    <DayButton
                      key={day.toISOString()}
                      type="button"
                      onClick={() => {
                        setSelectedDate(day);
                        setSelectedSlot('');
                      }}
                      $active={active}
                      $inMonth={inCurrentMonth}
                    >
                      <DayContent>
                        <span>{format(day, 'd')}</span>
                        {isToday(day) ? <TodayDot /> : null}
                      </DayContent>
                    </DayButton>
                  );
                })}
              </DaysGrid>
            </CalendarShell>

            <WeekWrap>
              <SectionLabel>{t('booking.week')}</SectionLabel>
              <WeekGrid>
                {weekDays.map((day) => (
                  <WeekButton
                    key={day.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedSlot('');
                    }}
                    $active={isSameDay(day, selectedDate)}
                  >
                    <WeekDay>{format(day, 'EEE', { locale })}</WeekDay>
                    <WeekDate>{format(day, 'd LLL', { locale })}</WeekDate>
                  </WeekButton>
                ))}
              </WeekGrid>
            </WeekWrap>

            <SlotsWrap>
              <RowBetween>
                <SectionLabel>{t('booking.day')}</SectionLabel>
                <OccupiedNote>{t('booking.occupiedNote')}</OccupiedNote>
              </RowBetween>
              <SlotsGrid>
                {availability.map((slot) => (
                  <SlotButton
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.time)}
                    $state={
                      selectedSlot === slot.time
                        ? 'selected'
                        : slot.available
                          ? 'available'
                          : 'disabled'
                    }
                  >
                    {slot.time}
                  </SlotButton>
                ))}
              </SlotsGrid>
            </SlotsWrap>
          </CalendarCard>

          <FormCard>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <SummaryCard>
                <SectionLabel>{t('booking.summary')}</SectionLabel>
                <SummaryGrid>
                  <SummaryRow>
                    <span>{t('booking.service')}</span>
                    <SummaryValue>{t(`services.items.${selectedService}.title`)}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{t('booking.selectedDate')}</span>
                    <SummaryValue>{format(selectedDate, 'dd.MM.yyyy')}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{t('booking.selectedTime')}</span>
                    <SummaryValue>{selectedSlot || '-'}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{t('booking.selectedSpecialist')}</span>
                    <SummaryValue>{t(`booking.specialists.${selectedSpecialist}`)}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <span>{t('booking.selectedPrice')}</span>
                    <SummaryValue>{serviceMeta.priceRange}</SummaryValue>
                  </SummaryRow>
                </SummaryGrid>
              </SummaryCard>

              <TwoColGrid>
                <FieldWrap>
                  <Label htmlFor="booking-fullName">{t('booking.fields.fullName')}</Label>
                  <Input
                    id="booking-fullName"
                    {...register('fullName')}
                    placeholder={t('booking.fields.placeholderName')}
                  />
                  {errors.fullName ? <ErrorText>{errors.fullName.message}</ErrorText> : null}
                </FieldWrap>
                <FieldWrap>
                  <Label htmlFor="booking-phone">{t('booking.fields.phone')}</Label>
                  <Input
                    id="booking-phone"
                    {...register('phone')}
                    placeholder={t('booking.fields.placeholderPhone')}
                  />
                  {errors.phone ? <ErrorText>{errors.phone.message}</ErrorText> : null}
                </FieldWrap>
              </TwoColGrid>

              <FieldWrap>
                <Label htmlFor="booking-email">{t('booking.fields.email')}</Label>
                <Input
                  id="booking-email"
                  {...register('email')}
                  placeholder={t('booking.fields.placeholderEmail')}
                />
                {errors.email ? <ErrorText>{errors.email.message}</ErrorText> : null}
              </FieldWrap>

              <TwoColGrid>
                <FieldWrap>
                  <Label htmlFor="booking-service">{t('booking.service')}</Label>
                  <Select id="booking-service" {...register('service')}>
                    {bookingServices.map((service) => (
                      <option key={service.id} value={service.id}>
                        {t(`services.items.${service.id}.title`)}
                      </option>
                    ))}
                  </Select>
                </FieldWrap>
                <FieldWrap>
                  <Label htmlFor="booking-specialist">{t('booking.specialist')}</Label>
                  <Select id="booking-specialist" {...register('specialist')}>
                    {specialists.map((specialist) => (
                      <option key={specialist} value={specialist}>
                        {t(`booking.specialists.${specialist}`)}
                      </option>
                    ))}
                  </Select>
                </FieldWrap>
              </TwoColGrid>

              <input type="hidden" {...register('date')} />
              <input type="hidden" {...register('time')} />
              {errors.date ? <InlineError>{errors.date.message}</InlineError> : null}
              {errors.time ? <InlineError>{errors.time.message}</InlineError> : null}

              <FieldWrap>
                <Label htmlFor="booking-note">{t('booking.fields.note')}</Label>
                <Textarea
                  id="booking-note"
                  {...register('note')}
                  rows={4}
                  placeholder={t('booking.fields.placeholderNote')}
                />
              </FieldWrap>

              <ConsentLabel htmlFor="booking-consent">
                <ConsentCheckbox id="booking-consent" type="checkbox" {...register('consent')} />
                <span>{t('booking.fields.consent')}</span>
              </ConsentLabel>
              {errors.consent ? <InlineError>{errors.consent.message}</InlineError> : null}

              <Actions>
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '...' : t('booking.buttons.submit')}
                </SubmitButton>
                <ResetButton
                  type="button"
                  onClick={() => {
                    reset();
                    setSelectedSlot('');
                    setSuccess(false);
                  }}
                >
                  {t('booking.buttons.reset')}
                </ResetButton>
              </Actions>
            </Form>

            {success ? (
              <SuccessCard>
                <SuccessTitle>{t('booking.success.title')}</SuccessTitle>
                <SuccessBody>{t('booking.success.description')}</SuccessBody>
              </SuccessCard>
            ) : null}
          </FormCard>
        </MainGrid>
      </Container>
    </Section>
  );
};

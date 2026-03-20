export const languageOptions = [
  { code: 'de', label: 'DE' },
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
] as const;

export const navigationItems = [
  { key: 'home', href: '#hero' },
  { key: 'services', href: '#services' },
  { key: 'results', href: '#results' },
  { key: 'experience', href: '#experience' },
  { key: 'booking', href: '#booking' },
  { key: 'prices', href: '#prices' },
  { key: 'reviews', href: '#reviews' },
  { key: 'about', href: '#about' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
] as const;

export const heroSlides = [
  {
    id: 'luxury',
    labelKey: 'hero.labels.luxury',
    primaryHref: '#services',
    secondaryHref: '#about',
    align: 'left',
    gradientClass:
      'from-[#111111] via-[#1b1b1b] to-[#33270f]',
    orbClass: 'from-[#D4AF37]/35 via-white/10 to-transparent',
  },
  {
    id: 'transformation',
    labelKey: 'hero.labels.results',
    primaryHref: '#results',
    secondaryHref: '#prices',
    align: 'right',
    gradientClass:
      'from-[#130f13] via-[#27121d] to-[#5c1320]',
    orbClass: 'from-[#FF6B6B]/35 via-[#D7263D]/20 to-transparent',
  },
  {
    id: 'booking',
    labelKey: 'hero.labels.booking',
    primaryHref: '#booking',
    secondaryHref: '#prices',
    align: 'left',
    gradientClass:
      'from-[#0c1220] via-[#112447] to-[#2F80ED]',
    orbClass: 'from-[#6EC6FF]/35 via-[#2F80ED]/25 to-transparent',
  },
  {
    id: 'trust',
    labelKey: 'hero.labels.trust',
    primaryHref: '#reviews',
    secondaryHref: '#faq',
    align: 'left',
    gradientClass:
      'from-[#111111] via-[#1a1a1a] to-[#122740]',
    orbClass: 'from-[#D4AF37]/25 via-[#6EC6FF]/20 to-transparent',
  },
] as const;

export const serviceCards = [
  { id: 'lashes', reveal: 'fade-left', size: 'md:col-span-4 lg:col-span-4' },
  { id: 'brows', reveal: 'rotate', size: 'md:col-span-2 lg:col-span-2' },
  { id: 'facial', reveal: 'blur', size: 'md:col-span-2 lg:col-span-3' },
  { id: 'pmu', reveal: 'fade-right', size: 'md:col-span-4 lg:col-span-3' },
  { id: 'headSpa', reveal: 'scale-in', size: 'md:col-span-3 lg:col-span-3' },
  { id: 'antiAging', reveal: 'fade-up', size: 'md:col-span-3 lg:col-span-3' },
  { id: 'makeup', reveal: 'fade-left', size: 'md:col-span-3 lg:col-span-2' },
  { id: 'consulting', reveal: 'fade-right', size: 'md:col-span-3 lg:col-span-3' },
] as const;

export const galleryFilters = ['all', 'lashes', 'brows', 'skin', 'pmu', 'makeup'] as const;

export const galleryItems = [
  {
    id: 'airLashes',
    category: 'lashes',
    accent: 'from-[#f2d786] via-[#111111] to-[#6EC6FF]',
    grid: 'md:col-span-4 lg:col-span-4',
  },
  {
    id: 'softBrows',
    category: 'brows',
    accent: 'from-[#FFF4DA] via-[#d0b568] to-[#111111]',
    grid: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 'glassSkin',
    category: 'skin',
    accent: 'from-[#d7f1ff] via-[#6EC6FF] to-[#2F80ED]',
    grid: 'md:col-span-3 lg:col-span-3',
  },
  {
    id: 'lipBlush',
    category: 'pmu',
    accent: 'from-[#ffe2e0] via-[#FF6B6B] to-[#D7263D]',
    grid: 'md:col-span-3 lg:col-span-3',
  },
  {
    id: 'bridalGlow',
    category: 'makeup',
    accent: 'from-[#fff7ef] via-[#D4AF37] to-[#FF6B6B]',
    grid: 'md:col-span-4 lg:col-span-4',
  },
  {
    id: 'browLift',
    category: 'brows',
    accent: 'from-[#e7eef9] via-[#c9a227] to-[#111111]',
    grid: 'md:col-span-2 lg:col-span-2',
  },
] as const;

export const experienceSteps = [
  { id: 'consultation', accent: 'from-[#D4AF37] to-[#ffffff]', icon: '01' },
  { id: 'analysis', accent: 'from-[#6EC6FF] to-[#ffffff]', icon: '02' },
  { id: 'treatment', accent: 'from-[#FF6B6B] to-[#ffffff]', icon: '03' },
  { id: 'aftercare', accent: 'from-[#2F80ED] to-[#ffffff]', icon: '04' },
  { id: 'followUp', accent: 'from-[#C9A227] to-[#6EC6FF]', icon: '05' },
] as const;

export const priceGroups = [
  { id: 'signature', itemIds: ['signatureHeadSpa', 'signatureAntiAging'] },
  { id: 'eyes', itemIds: ['eyesClassic', 'eyesVolume', 'eyesBrows'] },
  { id: 'skin', itemIds: ['skinHydra', 'skinConsulting', 'skinLift'] },
  { id: 'pmu', itemIds: ['pmuBrows', 'pmuLips', 'pmuRefresh'] },
] as const;

export const reviewIds = ['one', 'two', 'three', 'four', 'five'] as const;
export const trustBadgeIds = ['hygiene', 'certified', 'consulting', 'products'] as const;
export const teamIds = ['lara', 'amina', 'sofia'] as const;
export const faqIds = [
  'bookingChanges',
  'cancellation',
  'duration',
  'preparation',
  'aftercare',
  'payment',
] as const;
export const legalKeys = ['imprint', 'privacy', 'cookies'] as const;

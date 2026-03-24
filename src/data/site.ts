import beforeAfterImage from '../assets/image/beforeafter.png';
import transformationPortraitImage from '../assets/image/brows_lashes_transformation.png';
import luxuryStudioImage from '../assets/image/luxury_treatmen_tstudio_atmosphere.png';
import skinCareImage from '../assets/image/skin_treatment_calm_premium_care.png';

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

export type HeroSlideDefinition = {
  id: 'luxury' | 'transformation' | 'booking' | 'trust';
  labelKey: string;
  primaryHref: string;
  secondaryHref: string;
  image: string;
  mobileImage: string;
  imagePosition: string;
  mobileImagePosition: string;
  ambientClass: string;
  glowClass: string;
  detailLabel: string;
  detailValue: string;
  mediaNote: string;
};

export const heroSlides = [
  {
    id: 'luxury',
    labelKey: 'hero.labels.luxury',
    primaryHref: '#services',
    secondaryHref: '#about',
    image: luxuryStudioImage,
    mobileImage: luxuryStudioImage,
    imagePosition: 'object-[52%_center]',
    mobileImagePosition: 'object-[48%_center]',
    ambientClass:
      'champagne-studio',
    glowClass: 'gold-soft-blue',
    detailLabel: 'Suite 01',
    detailValue: 'Quiet luxury',
    mediaNote: 'Studio atmosphere',
  },
  {
    id: 'transformation',
    labelKey: 'hero.labels.results',
    primaryHref: '#results',
    secondaryHref: '#prices',
    image: beforeAfterImage,
    mobileImage: beforeAfterImage,
    imagePosition: 'object-[50%_center]',
    mobileImagePosition: 'object-[50%_center]',
    ambientClass:
      'ivory-portrait',
    glowClass: 'rose-champagne',
    detailLabel: 'Refined finish',
    detailValue: 'Before / After',
    mediaNote: 'Balanced results',
  },
  {
    id: 'booking',
    labelKey: 'hero.labels.booking',
    primaryHref: '#booking',
    secondaryHref: '#prices',
    image: transformationPortraitImage,
    mobileImage: transformationPortraitImage,
    imagePosition: 'object-[40%_center]',
    mobileImagePosition: 'object-[42%_center]',
    ambientClass:
      'linen-editorial',
    glowClass: 'blue-rose-air',
    detailLabel: 'Atelier booking',
    detailValue: 'Fast selection',
    mediaNote: 'Clear flow',
  },
  {
    id: 'trust',
    labelKey: 'hero.labels.trust',
    primaryHref: '#reviews',
    secondaryHref: '#faq',
    image: skinCareImage,
    mobileImage: skinCareImage,
    imagePosition: 'object-[55%_center]',
    mobileImagePosition: 'object-[60%_center]',
    ambientClass:
      'soft-care',
    glowClass: 'champagne-ivory',
    detailLabel: 'Calm protocols',
    detailValue: 'Premium care',
    mediaNote: 'Trusted execution',
  },
] as const satisfies readonly HeroSlideDefinition[];

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

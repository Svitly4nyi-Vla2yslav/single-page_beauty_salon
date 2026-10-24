// HeroStat описує одну коротку метрику слайда: стабільний id, значення й підпис.
export type HeroStat = {
  id: string;
  value: string;
  label: string;
};

// HeroSlide є повним контрактом презентаційного слайда: тексти й CTA,
// набір метрик, desktop/mobile медіа та CSS-класи позиціювання і підсвічування.
// Посилання CTA передаються готовими якорями; тип не виконує навігацію самостійно.
export type HeroSlide = {
  id: string;
  eyebrow: string;
  subtitle: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryHref: string;
  secondaryCtaLabel: string;
  secondaryHref: string;
  stats: HeroStat[];
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

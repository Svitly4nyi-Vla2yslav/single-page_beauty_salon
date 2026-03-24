export type HeroStat = {
  id: string;
  value: string;
  label: string;
};

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

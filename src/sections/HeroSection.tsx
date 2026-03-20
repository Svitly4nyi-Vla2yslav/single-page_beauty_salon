import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { A11y, Autoplay, Pagination, Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { heroSlides } from '../data/site';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import 'swiper/css';
import 'swiper/css/pagination';

const contentMotion = [
  { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: -20, y: 30 }, animate: { opacity: 1, x: 0, y: 0 } },
] as const;

export const HeroSection = () => {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotionPreference();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="hero" className="relative min-h-screen px-4 pb-8 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination, Parallax, A11y]}
          speed={reducedMotion ? 0 : 1100}
          loop
          parallax={!reducedMotion}
          autoplay={reducedMotion ? false : { delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="overflow-hidden rounded-[2.8rem] shadow-[0_45px_100px_rgba(17,17,17,0.12)]"
        >
          {heroSlides.map((slide, index) => {
            const motionPreset = contentMotion[index];
            const isActive = activeSlide === index;

            return (
              <SwiperSlide key={slide.id}>
                <div
                  className={`relative min-h-[82vh] overflow-hidden bg-gradient-to-br ${slide.gradientClass} text-white`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%)]" />
                  <div
                    className={`absolute -left-12 top-16 h-64 w-64 rounded-full bg-gradient-to-br ${slide.orbClass} blur-3xl`}
                    data-swiper-parallax="-120"
                  />
                  <div
                    className="absolute bottom-0 right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-white/10 blur-3xl"
                    data-swiper-parallax="-220"
                  />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                      backgroundSize: '72px 72px',
                    }}
                    data-swiper-parallax="-80"
                  />

                  <div className="relative z-10 grid min-h-[82vh] gap-12 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-14">
                    <div
                      className={`flex flex-col justify-between gap-10 ${
                        slide.align === 'right' ? 'lg:order-2 lg:text-right' : ''
                      }`}
                    >
                      <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/70 backdrop-blur">
                          <span className="h-2 w-2 rounded-full bg-gold" />
                          {t(slide.labelKey)}
                        </div>

                        <motion.div
                          key={`${slide.id}-${isActive ? 'active' : 'idle'}`}
                          initial={motionPreset.initial}
                          animate={isActive ? motionPreset.animate : { opacity: 0.7, x: 0, y: 0 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-8"
                        >
                          <h1 className="max-w-[16ch] font-display text-5xl leading-[0.95] text-white md:text-6xl lg:text-7xl">
                            {t(`hero.slides.${slide.id}.title`)}
                          </h1>
                          <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                            {t(`hero.slides.${slide.id}.description`)}
                          </p>
                          <div className="mt-8 flex flex-wrap gap-4">
                            <a
                              href={slide.primaryHref}
                              className="rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:-translate-y-1"
                            >
                              {t(`hero.slides.${slide.id}.primary`)}
                            </a>
                            <a
                              href={slide.secondaryHref}
                              className="rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                            >
                              {t(`hero.slides.${slide.id}.secondary`)}
                            </a>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {(['clients', 'rating', 'quality'] as const).map((statKey) => (
                          <div
                            key={statKey}
                            className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5 backdrop-blur-md"
                          >
                            <p className="text-sm leading-6 text-white/78">{t(`hero.stats.${statKey}`)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`relative flex items-center ${slide.align === 'right' ? 'lg:order-1' : ''}`}>
                      <div className="relative mx-auto w-full max-w-xl" data-swiper-parallax="-180">
                        <div className="glass-panel luxury-border relative rounded-[2.4rem] border border-white/10 bg-white/10 p-6 backdrop-blur-2xl">
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/60">
                            <span>Lumina Atelier</span>
                            <span>Berlin</span>
                          </div>
                          <div className="mt-6 overflow-hidden rounded-[2rem] bg-black/15 p-5">
                            <div className="h-[18rem] rounded-[1.6rem] bg-[linear-gradient(140deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04)),radial-gradient(circle_at_top_left,rgba(110,198,255,0.55),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,107,107,0.38),transparent_30%),linear-gradient(145deg,#0f1722,#25354b_45%,#0e1114)]" />
                            <div className="mt-5 grid gap-3 md:grid-cols-2">
                              <div className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/50">Treatment</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                  {t(`services.items.${index === 0 ? 'lashes' : index === 1 ? 'pmu' : index === 2 ? 'headSpa' : 'facial'}.title`)}
                                </p>
                              </div>
                              <div className="rounded-[1.2rem] border border-white/10 bg-white/8 p-4">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/50">Mood</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                  {index === 0
                                    ? 'Quiet luxury'
                                    : index === 1
                                      ? 'Soft transformation'
                                      : index === 2
                                        ? 'Digital booking'
                                        : 'Trusted quality'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="absolute -right-8 top-10 hidden h-28 w-28 rounded-[2rem] border border-white/14 bg-white/10 p-4 text-right backdrop-blur-xl md:block"
                            data-swiper-parallax="-250"
                          >
                            <p className="text-xs uppercase tracking-[0.24em] text-white/55">Refined</p>
                            <p className="mt-4 font-display text-3xl text-white">0{index + 1}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

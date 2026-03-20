import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CookieConsent } from './components/CookieConsent';
import { FloatingCTA } from './components/FloatingCTA';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PremiumCursor } from './components/PremiumCursor';
import { Seo } from './components/Seo';
import { AboutSection } from './sections/AboutSection';
import { BookingSection } from './sections/BookingSection';
import { ContactSection } from './sections/ContactSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { FaqSection } from './sections/FaqSection';
import { HeroSection } from './sections/HeroSection';
import { PricesSection } from './sections/PricesSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { SignatureServicesSection } from './sections/SignatureServicesSection';

const BeforeAfterSection = lazy(() => import('./sections/BeforeAfterSection'));

function App() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-x-clip">
      <Seo />
      <PremiumCursor />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#6EC6FF]/15 blur-3xl" />
        <div className="absolute right-[-6rem] top-[18rem] h-72 w-72 rounded-full bg-[#D4AF37]/12 blur-3xl" />
        <div className="absolute bottom-[12rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10">
        <HeroSection />
        <SignatureServicesSection />
        <Suspense
          fallback={
            <section className="px-4 py-24 md:px-8">
              <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-black/10 bg-white/80 px-8 py-16 text-center text-black/60 backdrop-blur-xl">
                {t('common.loadingSection')}
              </div>
            </section>
          }
        >
          <BeforeAfterSection />
        </Suspense>
        <ExperienceSection />
        <BookingSection />
        <PricesSection />
        <ReviewsSection />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </div>
  );
}

export default App;

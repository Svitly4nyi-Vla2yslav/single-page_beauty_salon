import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const siteUrl = 'https://lumina-beauty-studio.de';

/**
 * Формує локалізовані SEO-теги та JSON-LD опис BeautySalon для активної мови.
 * Компонент бере title/description із i18next, будує canonical і social image URL,
 * після чого Helmet оновлює `<head>`; видимого інтерфейсу функція не створює.
 */
export const Seo = () => {
  const { t, i18n } = useTranslation();
  const title = t('seo.title');
  const description = t('seo.description');
  const canonical = `${siteUrl}/${i18n.language}`;
  const image = `${siteUrl}/social-preview.svg`;

  // JSON-LD повторно використовує локалізований опис і ті самі canonical/image URL.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Lumina Atelier',
    description,
    image,
    url: canonical,
    telephone: '+49 30 555 82 10',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Knesebeckstrasse 18',
      addressLocality: 'Berlin',
      postalCode: '10623',
      addressCountry: 'DE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '17:00',
      },
    ],
    sameAs: ['https://instagram.com', 'https://wa.me/49305558210'],
  };

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

'use client';

import Image from 'next/image';

import Link from 'next/link';

const SITE_FOUNDING_YEAR = 2010;
const CURRENT_YEAR = new Date().getFullYear();

interface FooterContent {
  quickLinks: { label: string; href: string }[];
  products: { label: string; href: string }[];
  company: { label: string; href: string }[];
  contact: { label: string; value: string; href?: string }[];
  copyright: string;
  followUs: string;
}

const footerContent: Record<string, FooterContent> = {
  en: {
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About HousePlus', href: '/about-us' },
      { label: 'Products', href: '/products' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'OEM/ODM', href: '/oem-odm' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
    products: [
      { label: 'Solar Systems', href: '/products' },
      { label: 'Home Appliances', href: '/products' },
      { label: '3C Electronics', href: '/products' },
      { label: 'OEM/ODM Services', href: '/oem-odm' },
    ],
    company: [
      { label: 'Factory', href: '/factory' },
      { label: 'Team', href: '/team' },
      { label: 'News', href: '/news' },
      { label: 'Support', href: '/support' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
    contact: [
      { label: 'Email', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: `© ${SITE_FOUNDING_YEAR}-${CURRENT_YEAR} HousePlus Group. All rights reserved.`,
    followUs: 'Follow HousePlus',
  },
  es: {
    quickLinks: [
      { label: 'Inicio', href: '/' },
      { label: 'Sobre Nosotros', href: '/about-us' },
      { label: 'Productos', href: '/products' },
      { label: 'Certificaciones', href: '/certifications' },
      { label: 'OEM/ODM', href: '/oem-odm' },
      { label: 'Casos de Éxito', href: '/case-studies' },
      { label: 'Contacto', href: '/contact' },
    ],
    products: [
      { label: 'Sistemas Solares', href: '/products' },
      { label: 'Electrodomésticos', href: '/products' },
      { label: 'Electrónica 3C', href: '/products' },
      { label: 'Servicios OEM/ODM', href: '/oem-odm' },
    ],
    company: [
      { label: 'Fábrica', href: '/factory' },
      { label: 'Equipo', href: '/team' },
      { label: 'Noticias', href: '/news' },
      { label: 'Soporte', href: '/support' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Términos', href: '/terms' },
      { label: 'Cookies', href: '/cookie-policy' },
    ],
    contact: [
      { label: 'Correo', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: `© ${SITE_FOUNDING_YEAR}-${CURRENT_YEAR} HousePlus Group. Todos los derechos reservados.`,
    followUs: 'Síguenos',
  },
  de: {
    quickLinks: [
      { label: 'Startseite', href: '/' },
      { label: 'Über Uns', href: '/about-us' },
      { label: 'Produkte', href: '/products' },
      { label: 'Zertifizierungen', href: '/certifications' },
      { label: 'OEM/ODM', href: '/oem-odm' },
      { label: 'Fallstudien', href: '/case-studies' },
      { label: 'Kontakt', href: '/contact' },
    ],
    products: [
      { label: 'Solarsysteme', href: '/products' },
      { label: 'Haushaltsgeräte', href: '/products' },
      { label: '3C-Elektronik', href: '/products' },
      { label: 'OEM/ODM-Dienste', href: '/oem-odm' },
    ],
    company: [
      { label: 'Fabrik', href: '/factory' },
      { label: 'Team', href: '/team' },
      { label: 'News', href: '/news' },
      { label: 'Support', href: '/support' },
      { label: 'Datenschutz', href: '/privacy' },
      { label: 'AGB', href: '/terms' },
      { label: 'Cookies', href: '/cookie-policy' },
    ],
    contact: [
      { label: 'E-Mail', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: `© ${SITE_FOUNDING_YEAR}-${CURRENT_YEAR} HousePlus Group. Alle Rechte vorbehalten.`,
    followUs: 'Folgen Sie uns',
  },
  fr: {
    quickLinks: [
      { label: 'Accueil', href: '/' },
      { label: 'À Propos', href: '/about-us' },
      { label: 'Produits', href: '/products' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'OEM/ODM', href: '/oem-odm' },
      { label: 'Études de Cas', href: '/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
    products: [
      { label: 'Systèmes Solaires', href: '/products' },
      { label: 'Électroménagers', href: '/products' },
      { label: 'Électronique 3C', href: '/products' },
      { label: 'Services OEM/ODM', href: '/oem-odm' },
    ],
    company: [
      { label: 'Usine', href: '/factory' },
      { label: 'Équipe', href: '/team' },
      { label: 'Actualités', href: '/news' },
      { label: 'Support', href: '/support' },
      { label: 'Confidentialité', href: '/privacy' },
      { label: 'Conditions', href: '/terms' },
      { label: 'Cookies', href: '/cookie-policy' },
    ],
    contact: [
      { label: 'Email', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: `© ${SITE_FOUNDING_YEAR}-${CURRENT_YEAR} HousePlus Group. Tous droits réservés.`,
    followUs: 'Suivez-nous',
  },
  ar: {
    quickLinks: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about-us' },
      { label: 'المنتجات', href: '/products' },
      { label: 'الشهادات', href: '/certifications' },
      { label: 'OEM/ODM', href: '/oem-odm' },
      { label: 'دراسات الحالة', href: '/case-studies' },
      { label: 'اتصل بنا', href: '/contact' },
    ],
    products: [
      { label: 'الأنظمة الشمسية', href: '/products' },
      { label: 'الأجهزة المنزلية', href: '/products' },
      { label: 'الإلكترونيات 3C', href: '/products' },
      { label: 'خدمات OEM/ODM', href: '/oem-odm' },
    ],
    company: [
      { label: 'المصنع', href: '/factory' },
      { label: 'الفريق', href: '/team' },
      { label: 'الأخبار', href: '/news' },
      { label: 'الدعم', href: '/support' },
      { label: 'الخصوصية', href: '/privacy' },
      { label: 'الشروط', href: '/terms' },
      { label: 'ملفات تعريف الارتباط', href: '/cookie-policy' },
    ],
    contact: [
      { label: 'البريد', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'واتس آب', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'ويتشات', value: 'JackHousePlus' },
    ],
    copyright: `© ${SITE_FOUNDING_YEAR}-${CURRENT_YEAR} مجموعة HousePlus. جميع الحقوق محفوظة.`,
    followUs: 'تابعنا',
  },
};

const BASE_URL = 'https://www.houseplus-ch.com';
const FOOTER_LOGO_URL = 'https://images.houseplus-ch.com/media/houseplus-horizontal-logo/';

const footerUi: Record<string, Record<string, string>> = {
  en: { brandDescription: 'HousePlus supports global wholesale buyers of solar systems, home appliances and 3C electronics.', quickLinks: 'Quick Links', company: 'HousePlus Group', directSupport: 'Direct Support', sitemap: 'Sitemap', privacy: 'Privacy', terms: 'Terms', cookies: 'Cookies' },
  es: { brandDescription: 'HousePlus apoya a compradores mayoristas globales de sistemas solares, electrodomésticos y electrónica 3C.', quickLinks: 'Enlaces rápidos', company: 'Grupo HousePlus', directSupport: 'Soporte directo', sitemap: 'Mapa del sitio', privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies' },
  de: { brandDescription: 'HousePlus unterstützt globale Großhandelskäufer von Solarsystemen, Haushaltsgeräten und 3C-Elektronik.', quickLinks: 'Schnelllinks', company: 'HousePlus Group', directSupport: 'Direkter Support', sitemap: 'Sitemap', privacy: 'Datenschutz', terms: 'AGB', cookies: 'Cookies' },
  fr: { brandDescription: 'HousePlus accompagne les acheteurs grossistes internationaux de systèmes solaires, d’électroménagers et d’électronique 3C.', quickLinks: 'Liens rapides', company: 'Groupe HousePlus', directSupport: 'Support direct', sitemap: 'Plan du site', privacy: 'Confidentialité', terms: 'Conditions', cookies: 'Cookies' },
  ar: { brandDescription: 'تدعم HousePlus المشترين بالجملة حول العالم لأنظمة الطاقة الشمسية والأجهزة المنزلية وإلكترونيات 3C.', quickLinks: 'روابط سريعة', company: 'مجموعة HousePlus', directSupport: 'الدعم المباشر', sitemap: 'خريطة الموقع', privacy: 'الخصوصية', terms: 'الشروط', cookies: 'ملفات تعريف الارتباط' },
};

export default function Footer({ lang }: { lang: string }) {
  const content = footerContent[lang] || footerContent.en;
  const ui = footerUi[lang] || footerUi.en;
  const isRTL = lang === 'ar';
  const localizedUrl = (href: string) => `${BASE_URL}/${lang}${href}`.replace(/([^:]\/)\/+/, '$1');
  const footerLinks = [...content.quickLinks, ...content.company];
  const footerSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'HousePlus Group',
        alternateName: 'HousePlus',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${FOOTER_LOGO_URL}#logo`,
          url: FOOTER_LOGO_URL,
          contentUrl: FOOTER_LOGO_URL,
          width: 611,
          height: 246,
          caption: 'Official HousePlus Group horizontal logo',
          representativeOfPage: true,
          license: `${BASE_URL}/terms`,
          acquireLicensePage: `${BASE_URL}/en/contact`,
          creditText: 'HousePlus Group',
          copyrightNotice: '© HousePlus Group. All rights reserved.',
          copyrightHolder: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
          creator: { '@type': 'Organization', '@id': `${BASE_URL}/#organization`, name: 'HousePlus Group' },
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+86-155-7811-9543',
          email: 'jack@houseplus-ch.com',
          availableLanguage: ['English', 'Chinese'],
          areaServed: 'Worldwide',
        },
        sameAs: [
          'https://www.facebook.com/houseplusgroup',
          'https://www.linkedin.com/company/houseplus-group',
          'https://www.youtube.com/@houseplusgroup',
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${BASE_URL}/#footer-navigation-${lang}`,
        name: 'HousePlus footer navigation',
        inLanguage: lang,
        itemListElement: footerLinks.map((link, index) => ({
          '@type': 'SiteNavigationElement',
          position: index + 1,
          name: link.label,
          url: localizedUrl(link.href),
        })),
      },
    ],
  };

  return (
    <footer id="site-footer" role="contentinfo" aria-label="HousePlus site footer" className={`bg-slate-900 text-slate-400 py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className={isRTL ? 'text-right' : ''}>
            <Link href={`/${lang}`} aria-label="HousePlus home" className={`mb-6 inline-flex rounded-xl bg-white p-2.5 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.02] ${isRTL ? 'ml-0 mr-auto' : ''}`}>
              <Image
                src="https://images.houseplus-ch.com/media/houseplus-horizontal-logo/"
                alt="HousePlus Group horizontal logo"
                title="HousePlus Group official logo"
                width={611}
                height={246}
                loading="lazy"
                decoding="async"
                className="h-auto w-48 sm:w-52"
               sizes="100vw" />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {ui.brandDescription}
            </p>
            <nav aria-label="HousePlus social and contact channels" className={`flex gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <a href="https://wa.me/8615578119543" aria-label="Contact HousePlus on WhatsApp" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><span aria-hidden="true">W</span></a>
              <a href="mailto:jack@houseplus-ch.com" aria-label="Email the HousePlus sales team" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><span aria-hidden="true">@</span></a>
              <a href="https://www.facebook.com/houseplusgroup" aria-label="Visit HousePlus on Facebook" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><span aria-hidden="true">f</span></a>
              <a href="https://www.linkedin.com/company/houseplus-group" aria-label="Visit HousePlus on LinkedIn" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><span aria-hidden="true">in</span></a>
              <a href="https://www.youtube.com/@houseplusgroup" aria-label="Visit HousePlus on YouTube" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white"><span aria-hidden="true">Y</span></a>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links-heading" className={isRTL ? 'text-right' : ''}>
            <h2 id="footer-quick-links-heading" className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{ui.quickLinks}</h2>
            <ul className="space-y-4">
              {content.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company-links-heading" className={isRTL ? 'text-right' : ''}>
            <h2 id="footer-company-links-heading" className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{ui.company}</h2>
            <ul className="space-y-4">
              {content.company.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <section aria-labelledby="footer-support-heading" className={isRTL ? 'text-right' : ''}>
            <h2 id="footer-support-heading" className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{ui.directSupport}</h2>
            <ul className="space-y-4">
              {content.contact.map((item, idx) => (
                <li key={idx} className="text-sm">
                  <span className="block text-slate-500 text-xs mb-1">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} aria-label={`${item.label}: ${item.value}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={`pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-xs text-slate-500">{content.copyright}</p>
          <nav aria-label="Footer legal links" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href={`/${lang}/sitemap-page`} className="text-xs text-slate-500 hover:text-white">{ui.sitemap}</Link>
            <Link href={`/${lang}/privacy`} className="text-xs text-slate-500 hover:text-white">{ui.privacy}</Link>
            <Link href={`/${lang}/terms`} className="text-xs text-slate-500 hover:text-white">{ui.terms}</Link>
            <Link href={`/${lang}/cookie-policy`} className="text-xs text-slate-500 hover:text-white">{ui.cookies}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

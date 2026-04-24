'use client';

import Link from 'next/link';

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
      { label: 'About Us', href: '/about-us' },
      { label: 'Products', href: '/products' },
      { label: 'Contact Us', href: '/contact' },
    ],
    products: [
      { label: 'Solar Systems', href: '/products' },
      { label: 'Home Appliances', href: '/products' },
      { label: '3C Electronics', href: '/products' },
      { label: 'Custom Solutions', href: '/service' },
    ],
    company: [
      { label: 'About Factory', href: '/factory' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'News & Blog', href: '/news' },
    ],
    contact: [
      { label: 'Email', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'Chinese WhatsApp', value: '+8615578119543', href: 'https://wa.me/8615578119543' },
      { label: 'Nigerian WhatsApp', value: '+2349078080738', href: 'https://wa.me/2349078080738' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 HousePlus Group. All rights reserved.',
    followUs: 'Follow Us',
  },
  es: {
    quickLinks: [
      { label: 'Inicio', href: '/' },
      { label: 'Acerca de', href: '/about-us' },
      { label: 'Productos', href: '/products' },
      { label: 'Contacto', href: '/contact' },
    ],
    products: [
      { label: 'Sistemas Solares', href: '/products' },
      { label: 'Electrodomésticos', href: '/products' },
      { label: 'Electrónica 3C', href: '/products' },
      { label: 'Soluciones Personalizadas', href: '/service' },
    ],
    company: [
      { label: 'Acerca de la Fábrica', href: '/factory' },
      { label: 'Nuestro Equipo', href: '/team' },
      { label: 'Carreras', href: '/careers' },
      { label: 'Noticias y Blog', href: '/news' },
    ],
    contact: [
      { label: 'Correo', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp Chino', value: '+8615578119543', href: 'https://wa.me/8615578119543' },
      { label: 'WhatsApp Nigeriano', value: '+2349078080738', href: 'https://wa.me/2349078080738' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 HousePlus Group. Todos los derechos reservados.',
    followUs: 'Síguenos',
  },
  de: {
    quickLinks: [
      { label: 'Startseite', href: '/' },
      { label: 'Über Uns', href: '/about-us' },
      { label: 'Produkte', href: '/products' },
      { label: 'Kontakt', href: '/contact' },
    ],
    products: [
      { label: 'Solarsysteme', href: '/products' },
      { label: 'Haushaltsgeräte', href: '/products' },
      { label: '3C-Elektronik', href: '/products' },
      { label: 'Maßgeschneiderte Lösungen', href: '/service' },
    ],
    company: [
      { label: 'Über die Fabrik', href: '/factory' },
      { label: 'Unser Team', href: '/team' },
      { label: 'Karriere', href: '/careers' },
      { label: 'Nachrichten & Blog', href: '/news' },
    ],
    contact: [
      { label: 'E-Mail', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'Chinesisches WhatsApp', value: '+8615578119543', href: 'https://wa.me/8615578119543' },
      { label: 'Nigerianisches WhatsApp', value: '+2349078080738', href: 'https://wa.me/2349078080738' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 HousePlus Group. Alle Rechte vorbehalten.',
    followUs: 'Folgen Sie uns',
  },
  fr: {
    quickLinks: [
      { label: 'Accueil', href: '/' },
      { label: 'À Propos', href: '/about-us' },
      { label: 'Produits', href: '/products' },
      { label: 'Contact', href: '/contact' },
    ],
    products: [
      { label: 'Systèmes Solaires', href: '/products' },
      { label: 'Électroménagers', href: '/products' },
      { label: 'Électronique 3C', href: '/products' },
      { label: 'Solutions Personnalisées', href: '/service' },
    ],
    company: [
      { label: 'À Propos de l\'Usine', href: '/factory' },
      { label: 'Notre Équipe', href: '/team' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Actualités et Blog', href: '/news' },
    ],
    contact: [
      { label: 'Email', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp Chinois', value: '+8615578119543', href: 'https://wa.me/8615578119543' },
      { label: 'WhatsApp Nigérian', value: '+2349078080738', href: 'https://wa.me/2349078080738' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 HousePlus Group. Tous droits réservés.',
    followUs: 'Suivez-nous',
  },
  ar: {
    quickLinks: [
      { label: 'الرئيسية', href: '/' },
      { label: 'من نحن', href: '/about-us' },
      { label: 'المنتجات', href: '/products' },
      { label: 'اتصل بنا', href: '/contact' },
    ],
    products: [
      { label: 'الأنظمة الشمسية', href: '/products' },
      { label: 'الأجهزة المنزلية', href: '/products' },
      { label: 'الإلكترونيات 3C', href: '/products' },
      { label: 'حلول مخصصة', href: '/service' },
    ],
    company: [
      { label: 'حول المصنع', href: '/factory' },
      { label: 'فريقنا', href: '/team' },
      { label: 'الوظائف', href: '/careers' },
      { label: 'الأخبار والمدونة', href: '/news' },
    ],
    contact: [
      { label: 'البريد الإلكتروني', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'واتس آب صيني', value: '+8615578119543', href: 'https://wa.me/8615578119543' },
      { label: 'واتس آب نيجيري', value: '+2349078080738', href: 'https://wa.me/2349078080738' },
      { label: 'ويتشات', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 مجموعة HousePlus. جميع الحقوق محفوظة.',
    followUs: 'تابعنا',
  },
};

export default function Footer({ lang }: { lang: string }) {
  const content = footerContent[lang] || footerContent.en;
  const isRTL = lang === 'ar';

  return (
    <footer className={`bg-gray-900 text-gray-300 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 ${isRTL ? 'flex flex-col-reverse' : ''}`}>
          {/* Company Info */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-white font-bold text-lg mb-4">HousePlus</h3>
            <p className="text-sm leading-relaxed mb-4">
              {lang === 'en' && 'Professional manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.'}
              {lang === 'es' && 'Fabricante profesional de sistemas solares, electrodomésticos y electrónica 3C para compradores mayoristas globales.'}
              {lang === 'de' && 'Professioneller Hersteller von Solarsystemen, Haushaltsgeräten und 3C-Elektronik für globale Großhandelskäufer.'}
              {lang === 'fr' && 'Fabricant professionnel de systèmes solaires, d\'électroménagers et d\'électronique 3C pour les acheteurs en gros mondiaux.'}
              {lang === 'ar' && 'مصنع احترافي للأنظمة الشمسية والأجهزة المنزلية والإلكترونيات 3C للمشترين بالجملة العالميين.'}
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.745h3.554v1.379c-.009.015-.023.029-.032.043h.032v-.043c.43-.664 1.195-1.61 2.910-1.61 2.126 0 3.719 1.395 3.719 4.391v5.585zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.958-1.715 1.187 0 1.927.762 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.707h3.891v10.745zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
              <a href="https://wa.me/8615578119543" className="text-gray-400 hover:text-white transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.271c-1.477.784-2.748 1.925-3.756 3.235C1.215 10.94 0 13.555 0 16.202c0 2.34.584 4.629 1.69 6.641L.254 23.75l7.364-1.855c1.926 1.035 4.087 1.582 6.323 1.582 6.522 0 11.823-5.376 11.823-11.998 0-3.199-1.185-6.21-3.353-8.495-2.167-2.286-5.147-3.622-8.294-3.622z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-white font-semibold mb-4">
              {lang === 'en' && 'Quick Links'}
              {lang === 'es' && 'Enlaces Rápidos'}
              {lang === 'de' && 'Schnelllinks'}
              {lang === 'fr' && 'Liens Rapides'}
              {lang === 'ar' && 'روابط سريعة'}
            </h4>
            <ul className="space-y-2">
              {content.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-white font-semibold mb-4">
              {lang === 'en' && 'Products'}
              {lang === 'es' && 'Productos'}
              {lang === 'de' && 'Produkte'}
              {lang === 'fr' && 'Produits'}
              {lang === 'ar' && 'المنتجات'}
            </h4>
            <ul className="space-y-2">
              {content.products.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-white font-semibold mb-4">
              {lang === 'en' && 'Company'}
              {lang === 'es' && 'Empresa'}
              {lang === 'de' && 'Unternehmen'}
              {lang === 'fr' && 'Entreprise'}
              {lang === 'ar' && 'الشركة'}
            </h4>
            <ul className="space-y-2">
              {content.company.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-white font-semibold mb-4">
              {lang === 'en' && 'Contact'}
              {lang === 'es' && 'Contacto'}
              {lang === 'de' && 'Kontakt'}
              {lang === 'fr' && 'Contact'}
              {lang === 'ar' && 'اتصل'}
            </h4>
            <ul className="space-y-2">
              {content.contact.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors text-sm">
                      <span className="font-medium">{item.label}:</span> {item.value}
                    </a>
                  ) : (
                    <span className="text-sm">
                      <span className="font-medium">{item.label}:</span> {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'flex-col-reverse' : ''}`}>
            <p className="text-sm text-gray-400">{content.copyright}</p>
            <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href={`/${lang}/privacy`} className="text-sm text-gray-400 hover:text-white transition-colors">
                {lang === 'en' && 'Privacy Policy'}
                {lang === 'es' && 'Política de Privacidad'}
                {lang === 'de' && 'Datenschutzrichtlinie'}
                {lang === 'fr' && 'Politique de Confidentialité'}
                {lang === 'ar' && 'سياسة الخصوصية'}
              </Link>
              <Link href={`/${lang}/support`} className="text-sm text-gray-400 hover:text-white transition-colors">
                {lang === 'en' && 'Support'}
                {lang === 'es' && 'Soporte'}
                {lang === 'de' && 'Unterstützung'}
                {lang === 'fr' && 'Support'}
                {lang === 'ar' && 'الدعم'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

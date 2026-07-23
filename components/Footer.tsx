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
    copyright: '© 2024-2025 HousePlus Group. All rights reserved.',
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
    copyright: '© 2024-2025 HousePlus Group. Todos los derechos reservados.',
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
    copyright: '© 2024-2025 HousePlus Group. Alle Rechte vorbehalten.',
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
    copyright: '© 2024-2025 HousePlus Group. Tous droits réservés.',
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
    copyright: '© 2024-2025 مجموعة HousePlus. جميع الحقوق محفوظة.',
    followUs: 'تابعنا',
  },
};

export default function Footer({ lang }: { lang: string }) {
  const content = footerContent[lang] || footerContent.en;
  const isRTL = lang === 'ar';

  return (
    <footer className={`bg-slate-900 text-slate-400 py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-black text-2xl mb-6">HousePlus</h3>
            <p className="text-sm leading-relaxed mb-6">
              Professional HousePlus manufacturer of solar systems, home appliances, and 3C electronics for global wholesale buyers.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/8615578119543" aria-label="WhatsApp" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">W</a>
              <a href="mailto:jack@houseplus-ch.com" aria-label="Email" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">@</a>
              <a href="https://www.facebook.com/houseplusgroup" aria-label="Facebook" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">f</a>
              <a href="https://www.linkedin.com/company/houseplus-group" aria-label="LinkedIn" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">in</a>
              <a href="https://www.youtube.com/@houseplusgroup" aria-label="YouTube" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">Y</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {content.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={`/${lang}${link.href}`} className="hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">HousePlus Group</h4>
            <ul className="space-y-4">
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
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Direct Support</h4>
            <ul className="space-y-4">
              {content.contact.map((item, idx) => (
                <li key={idx} className="text-sm">
                  <span className="block text-slate-500 text-xs mb-1">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:text-blue-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">{content.copyright}</p>
          <div className="flex gap-6">
            <Link href={`/${lang}/sitemap-page`} className="text-xs text-slate-500 hover:text-white">Sitemap</Link>
            <Link href={`/${lang}/privacy`} className="text-xs text-slate-500 hover:text-white">Privacy</Link>
            <Link href={`/${lang}/terms`} className="text-xs text-slate-500 hover:text-white">Terms</Link>
            <Link href={`/${lang}/cookie-policy`} className="text-xs text-slate-500 hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

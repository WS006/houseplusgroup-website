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
      { label: 'HousePlus Products', href: '/products' },
      { label: 'Contact HousePlus', href: '/contact' },
    ],
    products: [
      { label: 'HousePlus Solar', href: '/products' },
      { label: 'HousePlus Appliances', href: '/products' },
      { label: 'HousePlus Electronics', href: '/products' },
      { label: 'HousePlus OEM/ODM', href: '/service' },
    ],
    company: [
      { label: 'HousePlus Factory', href: '/factory' },
      { label: 'HousePlus Team', href: '/team' },
      { label: 'HousePlus Support', href: '/support' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
    contact: [
      { label: 'Email', value: 'jack@houseplus-ch.com', href: 'mailto:jack@houseplus-ch.com' },
      { label: 'WhatsApp', value: '+86 155 7811 9543', href: 'https://wa.me/8615578119543' },
      { label: 'WeChat', value: 'JackHousePlus' },
    ],
    copyright: '© 2024 HousePlus Group. All rights reserved.',
    followUs: 'Follow HousePlus',
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
              <a href="https://wa.me/8615578119543" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">W</a>
              <a href="mailto:jack@houseplus-ch.com" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-white">@</a>
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
            <Link href={`/${lang}/privacy`} className="text-xs text-slate-500 hover:text-white">Privacy</Link>
            <Link href={`/${lang}/support`} className="text-xs text-slate-500 hover:text-white">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

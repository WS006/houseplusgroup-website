
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n-config';

export default async function Footer({ lang }: { lang: string }) {
  const dictionary = await getDictionary(lang);
  const footerContent = dictionary.footer;
  const isRTL = lang === 'ar';

  if (!footerContent) {
    return null; // Or render a fallback footer
  }

  return (
    <footer className={`bg-slate-900 text-slate-400 py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info & Logo */}
          <div>
            <Link href={`/${lang}`} className="flex items-center mb-4">
              <Image src="/logo.png" alt="HousePlus Logo" width={150} height={40} className="mr-3" />
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              {footerContent.description}
            </p>
            <p className="text-sm mb-2"><strong>{footerContent.companyName}</strong></p>
            <p className="text-sm mb-2">{footerContent.address}</p>
            <p className="text-sm mb-2">Email: <a href={`mailto:${footerContent.email}`} className="hover:text-white transition-colors">{footerContent.email}</a></p>
            <p className="text-sm mb-6">Phone: <a href={`tel:${footerContent.phone}`} className="hover:text-white transition-colors">{footerContent.phone}</a></p>
            
            {/* Service Areas */}
            <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-xs">Our Service Areas</h4>
            <p className="text-sm">{footerContent.serviceAreas}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{footerContent.quickLinks}</h4>
            <ul className="space-y-4">
              <li><Link href={`/${lang}`} className="hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href={`/${lang}/about-us`} className="hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href={`/${lang}/products`} className="hover:text-white transition-colors text-sm">Products</Link></li>
              <li><Link href={`/${lang}/factory`} className="hover:text-white transition-colors text-sm">Factory</Link></li>
              <li><Link href={`/${lang}/contact`} className="hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products (Example, can be dynamic) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Products</h4>
            <ul className="space-y-4">
              <li><Link href={`/${lang}/products/solar-systems`} className="hover:text-white transition-colors text-sm">Solar Systems</Link></li>
              <li><Link href={`/${lang}/products/home-appliances`} className="hover:text-white transition-colors text-sm">Home Appliances</Link></li>
              <li><Link href={`/${lang}/products/3c-electronics`} className="hover:text-white transition-colors text-sm">3C Electronics</Link></li>
            </ul>
          </div>

          {/* Contact Us (Simplified) */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{footerContent.contactUs}</h4>
            <ul className="space-y-4">
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-1">Email</span>
                <a href={`mailto:${footerContent.email}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                  {footerContent.email}
                </a>
              </li>
              <li className="text-sm">
                <span className="block text-slate-500 text-xs mb-1">Phone</span>
                <a href={`tel:${footerContent.phone}`} className="text-white font-medium hover:text-blue-400 transition-colors">
                  {footerContent.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2026 {footerContent.companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href={`/${lang}/privacy`} className="text-xs text-slate-500 hover:text-white">Privacy Policy</Link>
            <Link href={`/${lang}/terms`} className="text-xs text-slate-500 hover:text-white">Terms of Service</Link>
            <Link href={`/${lang}/sitemap.xml`} className="text-xs text-slate-500 hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

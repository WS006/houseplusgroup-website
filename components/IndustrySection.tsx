'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface IndustrySectionProps {
  lang?: string;
  title: string;
  description: string;
  image: {
    filename: string;
    alt: string;
  };
  industry_type: 'solar' | 'appliances' | 'electronics';
  button_link?: string;
  button_text?: string;
}

const industryConfig = {
  solar: {
    color: 'from-yellow-400 to-orange-500',
    icon: '☀️',
    slug: 'solar-systems',
    label: 'HousePlus Solar',
  },
  appliances: {
    color: 'from-blue-400 to-blue-600',
    icon: '⚙️',
    slug: 'home-appliances',
    label: 'HousePlus Appliances',
  },
  electronics: {
    color: 'from-purple-400 to-pink-500',
    icon: '📱',
    slug: '3c-electronics',
    label: 'HousePlus Electronics',
  },
};

export default function IndustrySection({
  lang = 'en',
  title,
  description,
  image,
  industry_type,
  button_link,
  button_text = 'Explore HousePlus Solutions',
}: IndustrySectionProps) {
  const isEven = industry_type === 'appliances';
  const config = industryConfig[industry_type];
  const localeCopy: Record<string, { labels: Record<string, string>; fields: Array<{ label: string; value: string }> }> = {
    en: { labels: { solar: 'HousePlus Solar', appliances: 'HousePlus Appliances', electronics: 'HousePlus Electronics' }, fields: [{ label: 'Order configuration', value: 'Confirmed by quote' }, { label: 'Shipping terms', value: 'Confirmed by quote' }, { label: 'Sourcing support', value: 'OEM/ODM' }, { label: 'Product documentation', value: 'Available on request' }] },
    es: { labels: { solar: 'Solar HousePlus', appliances: 'Electrodomésticos HousePlus', electronics: 'Electrónica HousePlus' }, fields: [{ label: 'Configuración del pedido', value: 'Confirmada por cotización' }, { label: 'Condiciones de envío', value: 'Confirmadas por cotización' }, { label: 'Soporte de abastecimiento', value: 'OEM/ODM' }, { label: 'Documentación de producto', value: 'Disponible bajo solicitud' }] },
    de: { labels: { solar: 'HousePlus Solar', appliances: 'HousePlus Haushaltsgeräte', electronics: 'HousePlus Elektronik' }, fields: [{ label: 'Auftragskonfiguration', value: 'Durch Angebot bestätigt' }, { label: 'Versandbedingungen', value: 'Durch Angebot bestätigt' }, { label: 'Beschaffungsunterstützung', value: 'OEM/ODM' }, { label: 'Produktdokumentation', value: 'Auf Anfrage verfügbar' }] },
    fr: { labels: { solar: 'Solaire HousePlus', appliances: 'Appareils HousePlus', electronics: 'Électronique HousePlus' }, fields: [{ label: 'Configuration de commande', value: 'Confirmée par devis' }, { label: 'Conditions d’expédition', value: 'Confirmées par devis' }, { label: 'Assistance sourcing', value: 'OEM/ODM' }, { label: 'Documentation produit', value: 'Disponible sur demande' }] },
    ar: { labels: { solar: 'HousePlus للطاقة الشمسية', appliances: 'أجهزة HousePlus', electronics: 'إلكترونيات HousePlus' }, fields: [{ label: 'إعداد الطلب', value: 'يؤكد بعرض سعر' }, { label: 'شروط الشحن', value: 'تؤكد بعرض سعر' }, { label: 'دعم التوريد', value: 'OEM/ODM' }, { label: 'وثائق المنتج', value: 'متاحة عند الطلب' }] },
  };
  const copy = localeCopy[lang] || localeCopy.en;
  const [imgSrc, setImgSrc] = useState(image?.filename || '');
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    // Direct fallback to colored background with icon — no external image dependencies
    setImgError(true);
  };

  return (
    <section
      className="py-16 md:py-20 bg-white overflow-hidden"
      aria-label={title}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 ${
            isEven ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full">
              <span className="text-2xl">{config.icon}</span>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                {copy.labels[industry_type]}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              {title}
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{copy.fields[0].label}</p>
                <p className="text-lg font-black text-slate-900">{copy.fields[0].value}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{copy.fields[1].label}</p>
                <p className="text-lg font-black text-slate-900">{copy.fields[1].value}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{copy.fields[2].label}</p>
                <p className="text-lg font-black text-slate-900">{copy.fields[2].value}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{copy.fields[3].label}</p>
                <p className="text-lg font-black text-slate-900">{copy.fields[3].value}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={button_link || `/${lang}/products?category=${config.slug}`}
                className="inline-block bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1"
              >
                {button_text}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="relative h-[350px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              {!imgError && imgSrc && (
                <Image
                  src={imgSrc}
                  alt={image.alt || title}
                  title={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                  onError={handleImageError}
                />
              )}
              {imgError && (
                <div className={`w-full h-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <span className="text-8xl opacity-30">{config.icon}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl font-bold bg-black/30 px-6 py-3 rounded-2xl backdrop-blur-sm">
                      {copy.labels[industry_type]}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {/* Decorative gradient blob */}
            <div
              className={`absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br ${config.color} rounded-full -z-10 blur-3xl opacity-20`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

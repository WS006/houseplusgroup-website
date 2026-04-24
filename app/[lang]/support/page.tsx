import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import SEOHead from '@/components/SEOHead';
import { generateOrganizationSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'HousePlus Support Center - Customer Service & Technical Help',
    es: 'Centro de Soporte HousePlus - Servicio al Cliente',
    de: 'HousePlus Support Center - Kundenservice & Hilfe',
    fr: 'Centre de Support HousePlus - Service Client',
    ar: 'مركز دعم HousePlus - خدمة العملاء والمساعدة التقنية',
  };

  const descriptions: Record<string, string> = {
    en: 'Get professional support for HousePlus solar systems, home appliances, and 3C electronics. Contact HousePlus technical team for wholesale inquiries and after-sales service.',
    es: 'Obtenga soporte profesional para sistemas solares HousePlus, electrodomésticos y electrónica 3C. Contacte al equipo técnico de HousePlus.',
    de: 'Erhalten Sie professionellen Support für HousePlus Solarsysteme, Haushaltsgeräte und 3C-Elektronik. Kontaktieren Sie das HousePlus-Team.',
    fr: 'Obtenez un support professionnel pour les systèmes solaires HousePlus, les appareils ménagers et l\'électronique 3C.',
    ar: 'احصل على دعم احترافي لأنظمة HousePlus الشمسية والأجهزة المنزلية وإلكترونيات 3C. تواصل مع فريق HousePlus التقني.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['HousePlus support', 'HousePlus wholesale', 'HousePlus technical help', 'HousePlus customer service'],
    url: `/${lang}/support`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function SupportPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const content: Record<string, any> = {
    en: {
      title: 'HousePlus Customer Support Center',
      subtitle: 'HousePlus is here to help you succeed. Our dedicated HousePlus support team is available 6 days a week to assist with all your wholesale needs.',
      contactTitle: 'Contact HousePlus Team',
      contactChannels: [
        {
          icon: '📧',
          title: 'HousePlus Email Support',
          value: 'jack@houseplus-ch.com',
          desc: 'Send us your HousePlus inquiry and we will respond within 24 hours on business days.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Send Email',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chat with our HousePlus sales team directly via WhatsApp for fast responses.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Open WhatsApp',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Our HousePlus Africa regional team is available to assist Nigerian and West African buyers.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Open WhatsApp',
        },
        {
          icon: '📱',
          title: 'HousePlus WeChat',
          value: 'JackHousePlus',
          desc: 'Add our HousePlus WeChat ID for direct communication with our China-based team.',
          link: null,
          linkText: 'ID: JackHousePlus',
        },
      ],
      hoursTitle: 'HousePlus Business Hours',
      hours: [
        { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM (GMT+8)' },
        { day: 'Saturday', time: '9:00 AM – 1:00 PM (GMT+8)' },
        { day: 'Sunday', time: 'Closed' },
      ],
      supportTypesTitle: 'How HousePlus Supports You',
      supportTypes: [
        {
          icon: '📦',
          title: 'HousePlus Order Support',
          desc: 'HousePlus assistance with order placement, tracking, and delivery coordination. We keep you informed at every stage.',
        },
        {
          icon: '🔧',
          title: 'HousePlus Technical Help',
          desc: 'HousePlus product specifications, installation guides, and technical documentation in multiple languages.',
        },
        {
          icon: '🛡️',
          title: 'HousePlus Warranty',
          desc: 'All HousePlus products come with a 12-24 month warranty. HousePlus handles warranty claims efficiently.',
        },
        {
          icon: '📋',
          title: 'HousePlus Documents',
          desc: 'HousePlus assistance with certificates of origin and other customs documentation required for import.',
        },
        {
          icon: '🎨',
          title: 'HousePlus OEM/ODM',
          desc: 'Expert HousePlus guidance on custom product development, branding, and private label manufacturing.',
        },
        {
          icon: '🌍',
          title: 'HousePlus Market Entry',
          desc: 'HousePlus advice on product selection and market entry strategies for global markets.',
        },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'What is the HousePlus minimum order quantity (MOQ) for wholesale?',
          a: 'The standard HousePlus MOQ starts at 100 units per product line. For mixed-container orders, HousePlus can accommodate lower quantities per SKU. Contact HousePlus to discuss your specific requirements.',
        },
        {
          q: 'How long does HousePlus shipping take?',
          a: 'HousePlus standard lead time is 20-35 days for sea freight after order confirmation. HousePlus air freight options are available for urgent orders (7-14 days).',
        },
        {
          q: 'Does HousePlus provide product samples?',
          a: 'Yes, HousePlus provides professional samples for evaluation. Sample fees apply and are typically refundable upon placing a bulk HousePlus order.',
        },
        {
          q: 'What certifications do HousePlus products carry?',
          a: 'All HousePlus products carry CE, FCC, RoHS, and ISO 9001 certifications. HousePlus solar products hold IEC 61215 and IEC 61730 certifications.',
        },
        {
          q: 'Can I visit the HousePlus factory?',
          a: 'Yes, HousePlus welcomes factory visits from serious buyers. Please contact HousePlus in advance to schedule your visit to our manufacturing facilities.',
        },
        {
          q: 'What payment terms does HousePlus offer?',
          a: 'HousePlus accepts T/T, L/C, and Western Union. Standard HousePlus terms are 30% deposit and 70% before shipment.',
        },
      ],
      ctaTitle: 'Ready to Place a HousePlus Order?',
      ctaDesc: 'Contact our HousePlus sales team today to discuss your wholesale requirements or request a HousePlus product catalog.',
      ctaButton: 'Contact HousePlus Sales',
    },
  };

  // Safe fallback to English for all languages to ensure no blank pages
  const t = content.en;

  const schemas = [
    generateOrganizationSchema({
      title: 'HousePlus Support',
      description: 'Professional HousePlus customer support and technical assistance.',
      url: `https://www.houseplus-ch.com/${lang}/support`,
      lang,
      type: 'Organization',
    }),
    generateFAQSchema(t.faqs.map((f: any) => ({ question: f.q, answer: f.a }))),
    generateBreadcrumbSchema([
      { name: 'Home', url: `https://www.houseplus-ch.com/${lang}` },
      { name: 'Support', url: `https://www.houseplus-ch.com/${lang}/support` },
    ]),
  ];

  return (
    <>
      <SEOHead schemas={schemas} />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <Image 
                src="https://images.unsplash.com/photo-1521791136064-7986c295944b?w=1600&q=80" 
                alt="HousePlus Support Background" 
                fill 
                className="object-cover"
             />
          </div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl md:text-6xl font-black mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-slate-300">{t.subtitle}</p>
          </div>
        </section>

        <section className="py-20 px-4 max-w-7xl mx-auto">
          {/* Contact Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {t.contactChannels.map((channel: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all text-center">
                <div className="text-5xl mb-6">{channel.icon}</div>
                <h3 className="font-black text-slate-900 mb-3 text-lg">{channel.title}</h3>
                <p className="text-blue-600 font-black mb-3 break-all">{channel.value}</p>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{channel.desc}</p>
                {channel.link ? (
                  <Link href={channel.link} className="inline-block w-full py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-colors">
                    {channel.linkText}
                  </Link>
                ) : (
                  <div className="py-3 bg-slate-100 text-slate-600 rounded-xl font-black">
                    {channel.linkText}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            {/* Support Types */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black text-slate-900 mb-10">{t.supportTypesTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.supportTypes.map((type: any, idx: number) => (
                  <div key={idx} className="flex gap-6 p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all">
                    <div className="text-4xl shrink-0">{type.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-2 text-xl">{type.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{type.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] h-fit shadow-2xl">
              <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4">{t.hoursTitle}</h2>
              <div className="space-y-6">
                {t.hours.map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">{item.day}</span>
                    <span className="font-black text-lg">{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-2">HousePlus Time Zone</p>
                <p className="font-black text-blue-400">China Standard Time (GMT+8)</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">{t.faqTitle}</h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {t.faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
                  <h4 className="text-xl font-black text-slate-900 mb-4 flex gap-4">
                    <span className="text-blue-600">Q:</span>
                    {faq.q}
                  </h4>
                  <div className="text-slate-600 pl-10 flex gap-4 leading-relaxed">
                    <span className="text-slate-300 font-black italic">A:</span>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 rounded-[3rem] p-16 text-center shadow-2xl shadow-blue-200 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">{t.ctaTitle}</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">{t.ctaDesc}</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href={`/${lang}/contact`} className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all shadow-xl hover:-translate-y-1">
                {t.ctaButton}
              </Link>
              <Link href="https://wa.me/8615578119543" className="px-12 py-5 bg-blue-700 text-white rounded-2xl font-black text-xl hover:bg-blue-800 transition-all hover:-translate-y-1">
                WhatsApp HousePlus
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

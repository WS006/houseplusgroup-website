import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'Customer Support - HousePlus Wholesale',
    es: 'Soporte al Cliente - HousePlus Wholesale',
    de: 'Kundensupport - HousePlus Wholesale',
    fr: 'Support Client - HousePlus Wholesale',
    ar: 'دعم العملاء - HousePlus للجملة',
  };

  const descriptions: Record<string, string> = {
    en: 'Get comprehensive support from HousePlus. Contact our team via WhatsApp, email, or WeChat for wholesale inquiries, order support, technical assistance, and after-sales service.',
    es: 'Obtenga soporte integral de HousePlus. Contacte a nuestro equipo para consultas mayoristas, soporte de pedidos, asistencia técnica y servicio posventa.',
    de: 'Erhalten Sie umfassenden Support von HousePlus. Kontaktieren Sie unser Team für Großhandelsanfragen, Bestellsupport, technische Hilfe und After-Sales-Service.',
    fr: 'Obtenez un support complet de HousePlus. Contactez notre équipe pour les demandes de gros, le support des commandes, l\'assistance technique et le service après-vente.',
    ar: 'احصل على دعم شامل من HousePlus. تواصل مع فريقنا للاستفسارات عن الجملة ودعم الطلبات والمساعدة التقنية وخدمة ما بعد البيع.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['HousePlus support', 'wholesale customer service', 'after-sales support', 'technical assistance'],
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
          title: 'Email Support',
          value: 'jack@houseplus-ch.com',
          desc: 'Send us your HousePlus inquiry and we will respond within 24 hours on business days.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Send Email',
          color: 'blue',
        },
        {
          icon: '💬',
          title: 'WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chat with our HousePlus sales team directly via WhatsApp for fast responses.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Open WhatsApp',
          color: 'green',
        },
        {
          icon: '💬',
          title: 'WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Our HousePlus Africa regional team is available to assist Nigerian and West African buyers.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Open WhatsApp',
          color: 'green',
        },
        {
          icon: '🔵',
          title: 'WeChat',
          value: 'JackHousePlus',
          desc: 'Add our HousePlus WeChat ID for direct communication with our China-based team.',
          link: null,
          linkText: 'WeChat ID: JackHousePlus',
          color: 'blue',
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
          title: 'Order Support',
          desc: 'HousePlus assistance with order placement, tracking, and delivery coordination. We keep you informed at every stage.',
        },
        {
          icon: '🔧',
          title: 'Technical Assistance',
          desc: 'HousePlus product specifications, installation guides, and technical documentation in multiple languages.',
        },
        {
          icon: '🛡️',
          title: 'Warranty & After-Sales',
          desc: 'All HousePlus products come with a 12-24 month warranty. HousePlus handles warranty claims efficiently.',
        },
        {
          icon: '📋',
          title: 'Documentation Support',
          desc: 'HousePlus assistance with certificates of origin and other customs documentation required for import.',
        },
        {
          icon: '🎨',
          title: 'OEM/ODM Consultation',
          desc: 'Expert HousePlus guidance on custom product development, branding, and private label manufacturing.',
        },
        {
          icon: '🌍',
          title: 'Regional Market Guidance',
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
          a: 'Yes, HousePlus provides product samples for evaluation. Sample fees apply and are typically refundable upon placing a bulk HousePlus order.',
        },
        {
          q: 'What certifications do HousePlus products carry?',
          a: 'HousePlus products carry CE, FCC, RoHS, and ISO 9001:2015 certifications. HousePlus solar products hold IEC 61215 and IEC 61730 certifications.',
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
    },
    es: {
      title: 'Centro de Soporte HousePlus',
      subtitle: 'HousePlus está aquí para ayudarle. Nuestro equipo de soporte dedicado de HousePlus está disponible 6 días a la semana.',
      faqTitle: 'Preguntas Frecuentes de HousePlus',
      faqs: [
        { q: '¿Cuál es el MOQ de HousePlus?', a: 'El MOQ estándar de HousePlus comienza en 100 unidades. Contacte a HousePlus para sus requisitos específicos.' },
        { q: '¿Cuánto tarda el envío de HousePlus?', a: 'El tiempo de entrega estándar de HousePlus es de 20-35 días para flete marítimo.' },
        { q: '¿Proporciona HousePlus muestras?', a: 'Sí, HousePlus proporciona muestras para evaluación. Las tarifas son reembolsables con un pedido de HousePlus.' },
      ],
    },
  };

  const t = content[lang] || content.en;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.contactChannels?.map((channel: any, idx: number) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow text-center">
              <div className="text-4xl mb-4">{channel.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{channel.title}</h3>
              <p className="text-blue-600 font-medium mb-2 break-all">{channel.value}</p>
              <p className="text-sm text-slate-500 mb-4">{channel.desc}</p>
              {channel.link && (
                <Link href={channel.link} className="inline-block w-full py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">
                  {channel.linkText}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Support Types */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.supportTypesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.supportTypes?.map((type: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-3xl shrink-0">{type.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{type.title}</h4>
                    <p className="text-sm text-slate-600">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl h-fit">
            <h2 className="text-2xl font-bold mb-6">{t.hoursTitle}</h2>
            <div className="space-y-4">
              {t.hours?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0">
                  <span className="font-medium opacity-70">{item.day}</span>
                  <span className="font-bold">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-white/10 rounded-xl text-sm">
              <p className="font-bold mb-1">Current Time Zone:</p>
              <p className="opacity-70">China Standard Time (GMT+8)</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{t.faqTitle}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {t.faqs?.map((faq: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3 flex gap-3">
                  <span className="text-blue-600">Q:</span>
                  {faq.q}
                </h4>
                <div className="text-slate-600 pl-8 flex gap-3">
                  <span className="text-slate-400 font-bold italic">A:</span>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-3xl p-12 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.ctaTitle}</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${lang}/contact`} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Contact Sales Team
            </Link>
            <Link href="https://wa.me/8615578119543" className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:border-slate-900 transition-colors">
              WhatsApp: +86 155 7811 9543
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from 'next';
import Image from 'next/image';
import SEOHead from '@/components/SEOHead';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateFAQSchema } from '@/lib/schema-generator';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles: Record<string, string> = {
    en: 'FAQ - Frequently Asked Questions | HousePlus',
    es: 'Preguntas Frecuentes - HousePlus',
    de: 'Häufig Gestellte Fragen - HousePlus',
    fr: 'FAQ - Questions Fréquemment Posées | HousePlus',
    ar: 'الأسئلة الشائعة - HousePlus',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: 'Find answers to frequently asked questions about HousePlus products, services, and ordering.',
    keywords: ['FAQ', 'questions', 'answers', 'help', 'support'],
    url: `/${lang}/faq`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const faqs: Record<string, any[]> = {
    en: [
      {
        category: 'General',
        items: [
          { q: 'What is HousePlus?', a: 'HousePlus is a professional manufacturer specializing in solar systems, home appliances, and 3C electronics for global wholesale buyers.' },
          { q: 'How long has HousePlus been in business?', a: 'HousePlus was founded in 2010 and has over 10 years of experience in manufacturing and international trade.' },
          { q: 'Where is HousePlus located?', a: 'HousePlus is based in China with manufacturing facilities and a global distribution network.' },
          { q: 'Does HousePlus serve international markets?', a: 'Yes, we serve 500+ clients across 50+ countries worldwide.' },
        ]
      },
      {
        category: 'Products & Specifications',
        items: [
          { q: 'What products does HousePlus manufacture?', a: 'We manufacture solar panels, power stations, home appliances, and 3C electronics.' },
          { q: 'Are your products certified?', a: 'Yes, all products comply with CE, FCC, RoHS, ISO 9001, and other international standards.' },
          { q: 'What is the warranty on your products?', a: 'Standard warranty is 12-24 months depending on product category. Extended warranty options are available.' },
          { q: 'Can I customize products?', a: 'Yes, we offer comprehensive OEM/ODM services with custom design, branding, and specifications.' },
        ]
      },
      {
        category: 'Ordering & Pricing',
        items: [
          { q: 'What is the minimum order quantity (MOQ)?', a: 'Standard MOQ is 100 pieces. Customized products typically require 500 pieces minimum.' },
          { q: 'What is the lead time?', a: 'Standard lead time is 20-35 days. Stock items can be shipped within 5-10 days.' },
          { q: 'Do you offer bulk pricing?', a: 'Yes, we provide tiered pricing based on order volume. Contact our sales team for detailed quotes.' },
          { q: 'What payment methods do you accept?', a: 'We accept T/T (bank transfer), L/C, PayPal, and Alibaba Trade Assurance.' },
        ]
      },
      {
        category: 'Shipping & Logistics',
        items: [
          { q: 'What shipping options are available?', a: 'We offer FOB, CIF, and DDP terms with major couriers (DHL, FedEx, UPS) and sea freight options.' },
          { q: 'Do you provide shipping insurance?', a: 'Yes, cargo insurance can be arranged upon request.' },
          { q: 'How do I track my shipment?', a: 'We provide real-time tracking information and regular updates throughout the shipping process.' },
          { q: 'What is the typical delivery time?', a: 'Delivery time varies by destination, typically 5-15 days for express shipping and 20-45 days for sea freight.' },
        ]
      },
      {
        category: 'Support & Service',
        items: [
          { q: 'What technical support do you provide?', a: 'We offer 24/7 technical support, product documentation, installation guides, and troubleshooting assistance.' },
          { q: 'Do you provide training for resellers?', a: 'Yes, we offer comprehensive training programs for your sales and support teams.' },
          { q: 'What is your customer service response time?', a: 'We respond to all inquiries within 24 hours during business hours.' },
          { q: 'How do I contact HousePlus?', a: 'You can reach us via email (jack@houseplus-ch.com), WhatsApp (+8615578119543), or through our contact form.' },
        ]
      },
    ],
    es: [
      {
        category: 'General',
        items: [
          { q: '¿Qué es HousePlus?', a: 'HousePlus es un fabricante profesional especializado en sistemas solares, electrodomésticos y electrónica 3C para compradores mayoristas globales.' },
          { q: '¿Cuánto tiempo lleva HousePlus en el negocio?', a: 'HousePlus fue fundada en 2010 y tiene más de 10 años de experiencia en fabricación y comercio internacional.' },
          { q: '¿Dónde está ubicada HousePlus?', a: 'HousePlus tiene sede en China con instalaciones de fabricación y una red de distribución global.' },
          { q: '¿HousePlus sirve a mercados internacionales?', a: 'Sí, servimos a 500+ clientes en 50+ países en todo el mundo.' },
        ]
      },
      {
        category: 'Productos y Especificaciones',
        items: [
          { q: '¿Qué productos fabrica HousePlus?', a: 'Fabricamos paneles solares, estaciones de energía, electrodomésticos y electrónica 3C.' },
          { q: '¿Sus productos están certificados?', a: 'Sí, todos los productos cumplen con CE, FCC, RoHS, ISO 9001 y otros estándares internacionales.' },
          { q: '¿Cuál es la garantía de sus productos?', a: 'La garantía estándar es de 12-24 meses según la categoría del producto. Hay opciones de garantía extendida disponibles.' },
          { q: '¿Puedo personalizar los productos?', a: 'Sí, ofrecemos servicios integrales de OEM/ODM con diseño personalizado, marca y especificaciones.' },
        ]
      },
      {
        category: 'Pedidos y Precios',
        items: [
          { q: '¿Cuál es la cantidad mínima de pedido (MOQ)?', a: 'La MOQ estándar es de 100 piezas. Los productos personalizados típicamente requieren un mínimo de 500 piezas.' },
          { q: '¿Cuál es el tiempo de entrega?', a: 'El tiempo de entrega estándar es de 20-35 días. Los artículos en stock se pueden enviar en 5-10 días.' },
          { q: '¿Ofrecen precios al por mayor?', a: 'Sí, proporcionamos precios escalonados según el volumen del pedido. Contacte a nuestro equipo de ventas para cotizaciones detalladas.' },
          { q: '¿Qué métodos de pago acepta?', a: 'Aceptamos T/T (transferencia bancaria), L/C, PayPal y Alibaba Trade Assurance.' },
        ]
      },
      {
        category: 'Envío y Logística',
        items: [
          { q: '¿Qué opciones de envío están disponibles?', a: 'Ofrecemos términos FOB, CIF y DDP con transportistas principales (DHL, FedEx, UPS) y opciones de flete marítimo.' },
          { q: '¿Proporcionan seguro de envío?', a: 'Sí, el seguro de carga se puede arreglar bajo solicitud.' },
          { q: '¿Cómo rastreo mi envío?', a: 'Proporcionamos información de seguimiento en tiempo real y actualizaciones regulares durante todo el proceso de envío.' },
          { q: '¿Cuál es el tiempo de entrega típico?', a: 'El tiempo de entrega varía según el destino, típicamente 5-15 días para envío rápido y 20-45 días para flete marítimo.' },
        ]
      },
      {
        category: 'Soporte y Servicio',
        items: [
          { q: '¿Qué soporte técnico proporcionan?', a: 'Ofrecemos soporte técnico 24/7, documentación de productos, guías de instalación y asistencia para solucionar problemas.' },
          { q: '¿Proporcionan capacitación para revendedores?', a: 'Sí, ofrecemos programas de capacitación integral para sus equipos de ventas y soporte.' },
          { q: '¿Cuál es su tiempo de respuesta del servicio al cliente?', a: 'Respondemos a todas las consultas dentro de 24 horas durante el horario comercial.' },
          { q: '¿Cómo contacto a HousePlus?', a: 'Puede comunicarse con nosotros por correo electrónico (jack@houseplus-ch.com), WhatsApp (+8615578119543) o a través de nuestro formulario de contacto.' },
        ]
      },
    ],
  };

  const content = faqs[lang] || faqs.en;

  // Generate FAQ schema
  const allFaqs = content.flatMap((cat: any) => cat.items.map((item: any) => ({ question: item.q, answer: item.a })));
  const faqSchema = generateFAQSchema(allFaqs);

  return (
    <>
      <SEOHead schemas={[faqSchema]} />
      <main className="min-h-screen bg-white">
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900">
              {lang === 'en' && 'Frequently Asked Questions'}
              {lang === 'es' && 'Preguntas Frecuentes'}
              {lang === 'de' && 'Häufig Gestellte Fragen'}
              {lang === 'fr' && 'Questions Fréquemment Posées'}
              {lang === 'ar' && 'الأسئلة الشائعة'}
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === 'en' && 'Find answers to common questions about HousePlus products and services.'}
              {lang === 'es' && 'Encuentre respuestas a preguntas comunes sobre productos y servicios de HousePlus.'}
              {lang === 'de' && 'Finden Sie Antworten auf häufig gestellte Fragen zu HousePlus-Produkten und -Dienstleistungen.'}
              {lang === 'fr' && 'Trouvez des réponses aux questions courantes sur les produits et services de HousePlus.'}
              {lang === 'ar' && 'ابحث عن إجابات للأسئلة الشائعة حول منتجات وخدمات HousePlus.'}
            </p>
          </div>
        </section>

        {/* FAQ Banner Image */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop"
                alt="HousePlus customer support team answering wholesale buyer questions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/30" />
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {content.map((category: any, catIdx: number) => (
              <div key={catIdx} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-slate-900 pb-4 border-b-2 border-blue-200">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.items.map((item: any, itemIdx: number) => (
                    <div key={itemIdx} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold mb-3 text-slate-900">Q: {item.q}</h3>
                      <p className="text-slate-600 leading-relaxed">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-4 bg-blue-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              {lang === 'en' && 'Still have questions?'}
              {lang === 'es' && '¿Aún tiene preguntas?'}
              {lang === 'de' && 'Haben Sie noch Fragen?'}
              {lang === 'fr' && 'Vous avez encore des questions?'}
              {lang === 'ar' && 'هل لديك أسئلة أخرى؟'}
            </h2>
            <p className="text-slate-600 mb-8">
              {lang === 'en' && 'Contact our support team for more information.'}
              {lang === 'es' && 'Comuníquese con nuestro equipo de soporte para más información.'}
              {lang === 'de' && 'Kontaktieren Sie unser Support-Team für weitere Informationen.'}
              {lang === 'fr' && 'Contactez notre équipe d\'assistance pour plus d\'informations.'}
              {lang === 'ar' && 'اتصل بفريق الدعم لدينا للحصول على مزيد من المعلومات.'}
            </p>
            <a href={`/${lang}/contact`} className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
              {lang === 'en' && 'Contact Us'}
              {lang === 'es' && 'Contáctenos'}
              {lang === 'de' && 'Kontaktieren Sie uns'}
              {lang === 'fr' && 'Nous contacter'}
              {lang === 'ar' && 'اتصل بنا'}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

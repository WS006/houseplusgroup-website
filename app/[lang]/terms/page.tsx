import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    en: 'Terms of Service - HousePlus',
    es: 'Términos de Servicio - HousePlus',
    de: 'Nutzungsbedingungen - HousePlus',
    fr: "Conditions d'Utilisation - HousePlus",
    ar: 'شروط الخدمة - HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus Terms of Service — Read our wholesale trading terms, conditions of sale, payment terms, and dispute resolution policy.',
    es: 'Términos de Servicio de HousePlus — Lea nuestros términos de comercio mayorista, condiciones de venta y política de resolución de disputas.',
    de: 'HousePlus Nutzungsbedingungen — Lesen Sie unsere Grosshandels-Handelsbedingungen, Verkaufsbedingungen und Streitbeilegungsrichtlinie.',
    fr: "Conditions d'Utilisation HousePlus — Lisez nos conditions générales de vente en gros, les modalités de paiement et la politique de résolution des litiges.",
    ar: 'شروط خدمة HousePlus — اقرأ شروط تجارة الجملة وشروط البيع وسياسة حل النزاعات.',
  };

  return generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['terms of service', 'terms and conditions', 'wholesale terms', 'trading conditions', 'HousePlus terms'],
    url: `/${lang}/terms`,
    lang: lang as any,
    type: 'website',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const sections = [
    {
      title: '1. Agreement to Terms',
      content: 'By accessing or using the HousePlus website (houseplus-ch.com) or placing any order with HousePlus Group, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our site or services. These terms apply to all wholesale buyers, distributors, and business partners who engage with HousePlus.',
    },
    {
      title: '2. Wholesale Account & Eligibility',
      content: `These Terms of Service are intended for business-to-business (B2B) transactions only. To place orders with HousePlus, you must:

- Be a registered business entity (company, sole proprietor, or equivalent)
- Provide accurate company registration information and contact details
- Maintain a valid business address and tax identification number where applicable
- Be at least 18 years of age and legally authorised to conduct business

HousePlus reserves the right to refuse service or cancel accounts at our discretion. All wholesale accounts are subject to approval.`,
    },
    {
      title: '3. Products, Pricing & Specifications',
      content: `All products listed on our website are subject to availability. HousePlus reserves the right to:

- Modify product specifications, features, or design without prior notice
- Adjust pricing in response to raw material costs, currency fluctuations, or market conditions
- Discontinue any product line at any time

Published prices on our website are indicative only and may differ from quoted prices. Official pricing is provided via formal quotations issued by HousePlus sales representatives. All prices are in USD unless otherwise specified, and exclude shipping, customs duties, and applicable taxes.`,
    },
    {
      title: '4. Orders & Minimum Order Quantity (MOQ)',
      content: `All orders are subject to our standard MOQ policy:

- **Standard products**: MOQ 100 pieces per SKU
- **OEM/ODM customised products**: MOQ 500 pieces per SKU (subject to project scope)
- **Sample orders**: Available upon request; sample fees may apply and are credited against bulk orders

Orders become binding upon receipt of written confirmation from HousePlus and payment of the agreed deposit. HousePlus reserves the right to decline orders that do not meet MOQ requirements or where credit terms cannot be established.`,
    },
    {
      title: '5. Payment Terms',
      content: `Standard payment terms for wholesale orders are:

- **Deposit**: 30% of total order value upon order confirmation
- **Balance**: 70% prior to shipment or upon presentation of shipping documents (T/T payment)
- **Accepted payment methods**: Bank Transfer (T/T), LC at sight (for orders exceeding USD 50,000)
- **Currency**: USD (United States Dollars) unless otherwise agreed in writing

Late payments may incur interest at the rate of 1.5% per month on the outstanding balance. HousePlus reserves the right to withhold shipment until full payment is received.`,
    },
    {
      title: '6. Shipping, Delivery & Risk',
      content: `HousePlus offers the following standard trade terms (Incoterms 2020):

- **FOB (Free On Board)**: Default shipping term; risk transfers to buyer when goods pass ship's rail at origin port
- **CIF (Cost, Insurance and Freight)**: Available upon request; HousePlus arranges shipping and insurance to destination port
- **DDP (Delivered Duty Paid)**: Available for select destinations; includes all customs duties and delivery to specified address

Lead times: Standard products 20–35 working days from order confirmation; stock items 5–10 working days. HousePlus is not liable for delays caused by force majeure, customs clearance issues, or events beyond our control.`,
    },
    {
      title: '7. Quality Assurance & Warranty',
      content: `HousePlus products are manufactured to international quality standards and carry the following warranty:

- **Solar systems and electronics**: 24-month warranty from shipment date
- **Small kitchen appliances**: 12-month warranty from shipment date
- **Structural components and accessories**: 6-month warranty from shipment date

Warranty covers manufacturing defects under normal use conditions. Warranty is void if products are modified, improperly installed, or damaged due to misuse, accident, or forces beyond normal operating conditions. Warranty claims must be submitted with photographic evidence and batch production records within the warranty period.`,
    },
    {
      title: '8. Returns, Refunds & Disputes',
      content: `Goods may only be returned with prior written authorisation from HousePlus. The following conditions apply:

- **Quality defects**: Defective goods within warranty period will be replaced or credited at HousePlus's discretion
- **Wrong goods shipped**: HousePlus will bear return shipping costs and replace or refund affected items
- **Buyer remorse or specification changes**: Returns are not accepted after order confirmation; modifications to order specifications must be agreed in writing before production commences

Disputes arising from transactions with HousePlus shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes may be referred to arbitration under the rules of the China International Economic and Trade Arbitration Commission (CIETAC) in Guangzhou, China.`,
    },
    {
      title: '9. Intellectual Property',
      content: 'All content on the HousePlus website — including product descriptions, images, logos, trademarks, and technical documentation — is the intellectual property of HousePlus Group and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content for commercial purposes without prior written consent from HousePlus. OEM/ODM clients retain ownership of their custom designs and brand assets submitted to HousePlus for production purposes.',
    },
    {
      title: '10. Limitation of Liability',
      content: 'To the fullest extent permitted by applicable law, HousePlus shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products or services. Our total liability for any claim related to a specific order shall not exceed the total value of that order. HousePlus makes no warranties, expressed or implied, beyond those specifically stated in these Terms of Service and the applicable product warranty documentation.',
    },
    {
      title: '11. Governing Law',
      content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the People\'s Republic of China, without regard to its conflict of law provisions. The parties consent to the exclusive jurisdiction of competent courts in Guangzhou, Guangdong Province, China for resolution of any disputes not settled by arbitration.',
    },
    {
      title: '12. Amendments to Terms',
      content: 'HousePlus reserves the right to modify these Terms of Service at any time. Material changes will be communicated via email to registered wholesale account holders or by posting a notice on our website. Continued use of our services after any changes constitutes acceptance of the new terms. We recommend reviewing these terms periodically.',
    },
    {
      title: '13. Contact Information',
      content: `For questions regarding these Terms of Service, please contact:

**HousePlus Group**
Email: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Business Hours: Monday – Friday 9:00 AM – 6:00 PM (GMT+8); Saturday 9:00 AM – 1:00 PM

We aim to respond to all enquiries within 2 business days.`,
    },
  ];

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate-600 leading-relaxed mb-2">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-800">{part}</strong> : part)}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-slate-600 ml-4 list-disc mb-1">{line.substring(2)}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-slate-600 leading-relaxed mb-2">{line}</p>;
    });
  };

  const h1Labels: Record<string, string> = {
    en: 'Terms of Service',
    es: 'Términos de Servicio',
    de: 'Nutzungsbedingungen',
    fr: "Conditions d'Utilisation",
    ar: 'شروط الخدمة',
  };

  const lastUpdated: Record<string, string> = {
    en: 'Last Updated: January 15, 2025',
    es: 'Última Actualización: 15 de enero de 2025',
    de: 'Zuletzt aktualisiert: 15. Januar 2025',
    fr: 'Dernière mise à jour : 15 janvier 2025',
    ar: 'آخر تحديث: 15 يناير 2025',
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            HousePlus Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            {h1Labels[lang] || h1Labels.en}
          </h1>
          <p className="text-gray-500 text-sm mb-4">{lastUpdated[lang] || lastUpdated.en}</p>
          <p className="text-lg text-slate-600 leading-relaxed">
            These terms govern your use of the HousePlus website and wholesale services. Please read them carefully before placing any order with HousePlus Group.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-10 pb-10 border-b border-gray-200 last:border-0">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">{section.title}</h2>
              <div className="prose max-w-none">
                {renderContent(section.content)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Questions About Our Terms?</h2>
          <p className="text-slate-600 mb-6">Our team is available to clarify any aspect of our wholesale trading terms and conditions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:jack@houseplus-ch.com"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/8615578119543"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              WhatsApp: +86 155 7811 9543
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

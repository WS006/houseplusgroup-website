import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SchemaRenderer from '@/components/SchemaRenderer';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import { generateOrganizationSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'] as const;
type Locale = typeof validLangs[number];
type Market = { title: string; desc: string; bullets: string[]; cta: string };
const schemaDescriptions: Record<Locale, string> = {
  en: 'HousePlus global wholesale markets across Africa, Southeast Asia and Europe.',
  es: 'Mercados mayoristas globales de HousePlus en África, Sudeste Asiático y Europa.',
  de: 'HousePlus globale Großhandelsmärkte in Afrika, Südostasien und Europa.',
  fr: 'Marchés de gros mondiaux HousePlus en Afrique, en Asie du Sud-Est et en Europe.',
  ar: 'أسواق الجملة العالمية من HousePlus في أفريقيا وجنوب شرق آسيا وأوروبا.',
};
type PageCopy = {
  hero: { title: string; subtitle: string };
  image: { alt: string; title: string };
  heading: string;
  markets: { africa: Market; southeastAsia: Market; europe: Market };
  why: { heading: string; expertiseTitle: string; expertiseDesc: string; logisticsTitle: string; logisticsDesc: string };
  cta: { heading: string; subheading: string; contact: string; whatsapp: string };
};

export const dynamicParams = false;
export function generateStaticParams() { return validLangs.map((lang) => ({ lang })); }

export async function generateMetadata(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const titles: Record<string, string> = {
    en: 'HousePlus Global Wholesale Markets - Africa, Southeast Asia, Europe', es: 'Mercados Mayoristas Globales de HousePlus - África, Sudeste Asiático, Europa', de: 'HousePlus Globale Großhandelsmärkte - Afrika, Südostasien, Europa', fr: 'Marchés de Gros Mondiaux HousePlus - Afrique, Asie du Sud-Est, Europe', ar: 'أسواق الجملة العالمية HousePlus - أفريقيا، جنوب شرق آسيا، أوروبا',
  };
  const descriptions: Record<string, string> = {
    en: 'HousePlus specialized wholesale solutions for Africa, Southeast Asia, and Europe. Local support, fast shipping, and certified products for global B2B buyers.', es: 'Soluciones mayoristas especializadas de HousePlus para África, Sudeste Asiático y Europa. Soporte local, envíos rápidos y productos certificados para compradores B2B globales.', de: 'HousePlus spezialisierte Großhandelslösungen für Afrika, Südostasien und Europa. Lokaler Support, schnelle Lieferungen und zertifizierte Produkte für globale B2B-Käufer.', fr: 'Solutions de gros spécialisées HousePlus pour l’Afrique, l’Asie du Sud-Est et l’Europe. Support local, livraison rapide et produits certifiés pour les acheteurs B2B mondiaux.', ar: 'حلول الجملة المتخصصة HousePlus لأفريقيا وجنوب شرق آسيا وأوروبا. دعم محلي، شحن سريع، ومنتجات موثقة للمشترين B2B العالميين.',
  };
  return generateSEOMetadata({ title: titles[lang] || titles.en, description: descriptions[lang] || descriptions.en, keywords: ['global wholesale', 'regional distribution', 'Africa', 'Southeast Asia', 'Europe', 'HousePlus', 'international trade', 'B2B wholesale', 'OEM ODM'], url: `/${lang}/regions`, lang: lang as Locale, type: 'website', geoRegion: 'CN-GD', geoPlacename: 'Guangdong' });
}

const copy: Record<Locale, PageCopy> = {
  en: {
    hero: { title: 'HousePlus Global Wholesale Markets', subtitle: 'Specialized HousePlus wholesale solutions for Africa, Southeast Asia, and Europe.' }, image: { alt: 'HousePlus global wholesale markets - Africa, Southeast Asia, and Europe', title: 'HousePlus global wholesale markets - Africa, Southeast Asia, and Europe' }, heading: 'Select Your HousePlus Region',
    markets: { africa: { title: '🌍 Africa', desc: 'HousePlus serving Nigeria, Kenya, South Africa, Egypt, Ghana, and more.', bullets: ['✓ 10+ HousePlus countries covered', '✓ HousePlus FOB/CIF payment terms', '✓ 20–35 days HousePlus lead time'], cta: 'Explore Africa →' }, southeastAsia: { title: '🌏 Southeast Asia', desc: 'HousePlus serving Vietnam, Thailand, Indonesia, Philippines, and more.', bullets: ['✓ 10+ HousePlus countries covered', '✓ HousePlus flexible payment terms', '✓ 15–25 days HousePlus lead time'], cta: 'Explore Asia →' }, europe: { title: '🌎 Europe', desc: 'HousePlus serving Germany, France, UK, Spain, Netherlands, and more.', bullets: ['✓ 12+ HousePlus countries covered', '✓ HousePlus CE certified products', '✓ 25–35 days HousePlus lead time'], cta: 'Explore Europe →' } },
    why: { heading: 'Why Choose HousePlus for Regional Wholesale?', expertiseTitle: '🎯 HousePlus Market Expertise', expertiseDesc: 'Deep understanding of regional market needs and HousePlus product compliance across global markets.', logisticsTitle: '📦 HousePlus Logistics', logisticsDesc: 'Optimized HousePlus shipping routes and efficient customs clearance processes for each region.' }, cta: { heading: 'Ready to Start HousePlus Wholesale Partnership?', subheading: 'Contact our regional HousePlus sales teams for customized quotes.', contact: 'Contact HousePlus Sales', whatsapp: 'WhatsApp HousePlus' },
  },
  es: {
    hero: { title: 'Mercados mayoristas globales de HousePlus', subtitle: 'Soluciones mayoristas especializadas de HousePlus para África, Sudeste Asiático y Europa.' }, image: { alt: 'Mercados mayoristas globales de HousePlus - África, Sudeste Asiático y Europa', title: 'Mercados mayoristas globales de HousePlus - África, Sudeste Asiático y Europa' }, heading: 'Seleccione su región de HousePlus',
    markets: { africa: { title: '🌍 África', desc: 'HousePlus atiende a Nigeria, Kenia, Sudáfrica, Egipto, Ghana y más.', bullets: ['✓ 10+ países HousePlus cubiertos', '✓ Condiciones de pago HousePlus FOB/CIF', '✓ 20–35 días de plazo de entrega HousePlus'], cta: 'Explorar África →' }, southeastAsia: { title: '🌏 Sudeste Asiático', desc: 'HousePlus atiende a Vietnam, Tailandia, Indonesia, Filipinas y más.', bullets: ['✓ 10+ países HousePlus cubiertos', '✓ Condiciones de pago flexibles de HousePlus', '✓ 15–25 días de plazo de entrega HousePlus'], cta: 'Explorar Asia →' }, europe: { title: '🌎 Europa', desc: 'HousePlus atiende a Alemania, Francia, Reino Unido, España, Países Bajos y más.', bullets: ['✓ 12+ países HousePlus cubiertos', '✓ Productos HousePlus certificados CE', '✓ 25–35 días de plazo de entrega HousePlus'], cta: 'Explorar Europa →' } },
    why: { heading: '¿Por qué elegir HousePlus para el comercio mayorista regional?', expertiseTitle: '🎯 Experiencia de mercado de HousePlus', expertiseDesc: 'Profunda comprensión de las necesidades del mercado regional y del cumplimiento de productos HousePlus en los mercados globales.', logisticsTitle: '📦 Logística de HousePlus', logisticsDesc: 'Rutas de envío de HousePlus optimizadas y procesos de despacho aduanero eficientes para cada región.' }, cta: { heading: '¿Listo para empezar una colaboración mayorista con HousePlus?', subheading: 'Contacte a nuestros equipos regionales de ventas de HousePlus para cotizaciones personalizadas.', contact: 'Contactar ventas de HousePlus', whatsapp: 'WhatsApp HousePlus' },
  },
  de: {
    hero: { title: 'HousePlus Globale Großhandelsmärkte', subtitle: 'Spezialisierte HousePlus Großhandelslösungen für Afrika, Südostasien und Europa.' }, image: { alt: 'HousePlus globale Großhandelsmärkte – Afrika, Südostasien und Europa', title: 'HousePlus globale Großhandelsmärkte – Afrika, Südostasien und Europa' }, heading: 'Wählen Sie Ihre HousePlus-Region',
    markets: { africa: { title: '🌍 Afrika', desc: 'HousePlus beliefert Nigeria, Kenia, Südafrika, Ägypten, Ghana und mehr.', bullets: ['✓ 10+ HousePlus-Länder abgedeckt', '✓ HousePlus FOB/CIF Zahlungsbedingungen', '✓ 20–35 Tage HousePlus Vorlaufzeit'], cta: 'Afrika erkunden →' }, southeastAsia: { title: '🌏 Südostasien', desc: 'HousePlus beliefert Vietnam, Thailand, Indonesien, die Philippinen und mehr.', bullets: ['✓ 10+ HousePlus-Länder abgedeckt', '✓ Flexible HousePlus Zahlungsbedingungen', '✓ 15–25 Tage HousePlus Vorlaufzeit'], cta: 'Asien erkunden →' }, europe: { title: '🌎 Europa', desc: 'HousePlus beliefert Deutschland, Frankreich, UK, Spanien, die Niederlande und mehr.', bullets: ['✓ 12+ HousePlus-Länder abgedeckt', '✓ HousePlus CE-zertifizierte Produkte', '✓ 25–35 Tage HousePlus Vorlaufzeit'], cta: 'Europa erkunden →' } },
    why: { heading: 'Warum HousePlus für regionalen Großhandel?', expertiseTitle: '🎯 HousePlus Marktexpertise', expertiseDesc: 'Tiefes Verständnis regionaler Marktanforderungen und HousePlus Produktkonformität in globalen Märkten.', logisticsTitle: '📦 HousePlus Logistik', logisticsDesc: 'Optimierte HousePlus Versandrouten und effiziente Zollabfertigung für jede Region.' }, cta: { heading: 'Bereit, eine HousePlus Großhandelspartnerschaft zu starten?', subheading: 'Kontaktieren Sie unsere regionalen HousePlus Vertriebsteams für individuelle Angebote.', contact: 'HousePlus Vertrieb kontaktieren', whatsapp: 'WhatsApp HousePlus' },
  },
  fr: {
    hero: { title: 'Marchés de gros mondiaux HousePlus', subtitle: 'Solutions de gros spécialisées de HousePlus pour l’Afrique, l’Asie du Sud-Est et l’Europe.' }, image: { alt: 'Marchés de gros mondiaux HousePlus – Afrique, Asie du Sud-Est et Europe', title: 'Marchés de gros mondiaux HousePlus – Afrique, Asie du Sud-Est et Europe' }, heading: 'Sélectionnez votre région HousePlus',
    markets: { africa: { title: '🌍 Afrique', desc: 'HousePlus dessert le Nigeria, le Kenya, l’Afrique du Sud, l’Égypte, le Ghana, et plus.', bullets: ['✓ 10+ pays HousePlus couverts', '✓ Conditions de paiement HousePlus FOB/CIF', '✓ Délai de livraison HousePlus de 20–35 jours'], cta: 'Explorer l’Afrique →' }, southeastAsia: { title: '🌏 Asie du Sud-Est', desc: 'HousePlus dessert le Vietnam, la Thaïlande, l’Indonésie, les Philippines, et plus.', bullets: ['✓ 10+ pays HousePlus couverts', '✓ Conditions de paiement HousePlus flexibles', '✓ Délai de livraison HousePlus de 15–25 jours'], cta: 'Explorer l’Asie →' }, europe: { title: '🌎 Europe', desc: 'HousePlus dessert l’Allemagne, la France, le Royaume-Uni, l’Espagne, les Pays-Bas, et plus.', bullets: ['✓ 12+ pays HousePlus couverts', '✓ Produits HousePlus certifiés CE', '✓ Délai de livraison HousePlus de 25–35 jours'], cta: 'Explorer l’Europe →' } },
    why: { heading: 'Pourquoi choisir HousePlus pour le commerce de gros régional ?', expertiseTitle: '🎯 Expertise marché HousePlus', expertiseDesc: 'Une compréhension approfondie des besoins des marchés régionaux et de la conformité des produits HousePlus sur les marchés mondiaux.', logisticsTitle: '📦 Logistique HousePlus', logisticsDesc: 'Itinéraires d’expédition HousePlus optimisés et procédures de dédouanement efficaces pour chaque région.' }, cta: { heading: 'Prêt à lancer un partenariat de gros avec HousePlus ?', subheading: 'Contactez nos équipes commerciales régionales HousePlus pour des devis personnalisés.', contact: 'Contacter les ventes HousePlus', whatsapp: 'WhatsApp HousePlus' },
  },
  ar: {
    hero: { title: 'أسواق الجملة العالمية من HousePlus', subtitle: 'حلول جملة متخصصة من HousePlus لأفريقيا وجنوب شرق آسيا وأوروبا.' }, image: { alt: 'أسواق الجملة العالمية من HousePlus - أفريقيا، جنوب شرق آسيا، أوروبا', title: 'أسواق الجملة العالمية من HousePlus - أفريقيا، جنوب شرق آسيا، أوروبا' }, heading: 'اختر منطقة HousePlus الخاصة بك',
    markets: { africa: { title: '🌍 أفريقيا', desc: 'تخدم HousePlus نيجيريا وكينيا وجنوب أفريقيا ومصر وغانا وغيرها.', bullets: ['✓ تغطي HousePlus أكثر من 10 دول', '✓ شروط دفع HousePlus FOB/CIF', '✓ 20–35 يوماً زمن تنفيذ HousePlus'], cta: 'استكشاف أفريقيا →' }, southeastAsia: { title: '🌏 جنوب شرق آسيا', desc: 'تخدم HousePlus فيتنام وتايلاند وإندونيسيا والفلبين وغيرها.', bullets: ['✓ تغطي HousePlus أكثر من 10 دول', '✓ شروط دفع مرنة من HousePlus', '✓ 15–25 يوماً زمن تنفيذ HousePlus'], cta: 'استكشاف آسيا →' }, europe: { title: '🌎 أوروبا', desc: 'تخدم HousePlus ألمانيا وفرنسا والمملكة المتحدة وإسبانيا وهولندا وغيرها.', bullets: ['✓ تغطي HousePlus أكثر من 12 دولة', '✓ منتجات HousePlus معتمدة CE', '✓ 25–35 يوماً زمن تنفيذ HousePlus'], cta: 'استكشاف أوروبا →' } },
    why: { heading: 'لماذا تختار HousePlus للجملة الإقليمية؟', expertiseTitle: '🎯 خبرة HousePlus في الأسواق', expertiseDesc: 'فهم عميق لاحتياجات الأسواق الإقليمية والامتثال لمنتجات HousePlus عبر الأسواق العالمية.', logisticsTitle: '📦 لوجستيات HousePlus', logisticsDesc: 'مسارات شحن HousePlus محسّنة وإجراءات تخليص جمركي فعّالة لكل منطقة.' }, cta: { heading: 'هل أنت مستعد لبدء شراكة جملة مع HousePlus؟', subheading: 'تواصل مع فرق مبيعات HousePlus الإقليمية للحصول على عروض أسعار مخصّصة.', contact: 'التواصل مع مبيعات HousePlus', whatsapp: 'واتساب HousePlus' },
  },
};

function getLocale(value: string): Locale { return (validLangs as readonly string[]).includes(value) ? value as Locale : 'en'; }

export default async function RegionsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const locale = getLocale(params.lang);
  const t = copy[locale];
  const schemas = [generateOrganizationSchema({ title: 'HousePlus', description: schemaDescriptions[locale], url: `https://www.houseplus-ch.com/${locale}/regions`, lang: locale, type: 'Organization' })];
  const cards: { market: Market; href: string; style: string; color: string }[] = [
    { market: t.markets.africa, href: `/${locale}/regions/africa`, style: 'from-orange-50 to-orange-100 border-orange-200', color: 'text-orange-600' },
    { market: t.markets.southeastAsia, href: `/${locale}/regions/southeast_asia`, style: 'from-green-50 to-green-100 border-green-200', color: 'text-green-600' },
    { market: t.markets.europe, href: `/${locale}/regions/europe`, style: 'from-blue-50 to-blue-100 border-blue-200', color: 'text-blue-600' },
  ];
  return <SchemaRenderer schemas={schemas}><main className="min-h-screen bg-white">
    <Breadcrumb lang={locale} slug="regions" />
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 md:px-8"><div className="max-w-6xl mx-auto"><h1 className="text-4xl md:text-5xl font-black mb-4">{t.hero.title}</h1><p className="text-xl opacity-90">{t.hero.subtitle}</p></div></section>
    <section className="py-8 px-4 md:px-8"><div className="max-w-6xl mx-auto"><div className="relative h-80 rounded-2xl overflow-hidden shadow-xl"><img src="https://images.houseplus-ch.com/media/houseplus-site-global-world-map-markets/" alt={t.image.alt} title={t.image.title} className="object-cover" decoding="async" /><div className="absolute inset-0 bg-blue-900/30" /></div></div></section>
    <section className="py-16 px-4 md:px-8"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-bold mb-12 text-center">{t.heading}</h2><div className="grid md:grid-cols-3 gap-8">{cards.map(({ market, href, style, color }) => <Link key={href} href={href}><div className={`bg-gradient-to-br ${style} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer h-full border`}><h3 className={`text-3xl font-bold mb-4 ${color}`}>{market.title}</h3><p className="text-gray-700 mb-6">{market.desc}</p><ul className="space-y-2 text-sm text-gray-600 mb-6">{market.bullets.map((item) => <li key={item}>{item}</li>)}</ul><span className={`${color} font-bold hover:opacity-80`}>{market.cta}</span></div></Link>)}</div></div></section>
    <section className="py-16 px-4 md:px-8 bg-gray-50"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-bold mb-12 text-center">{t.why.heading}</h2><div className="grid md:grid-cols-2 gap-8"><div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-2xl font-bold mb-4 text-blue-600">{t.why.expertiseTitle}</h3><p className="text-gray-700">{t.why.expertiseDesc}</p></div><div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-2xl font-bold mb-4 text-blue-600">{t.why.logisticsTitle}</h3><p className="text-gray-700">{t.why.logisticsDesc}</p></div></div></div></section>
    <section className="bg-slate-900 text-white py-16 px-4 md:px-8"><div className="max-w-4xl mx-auto text-center"><h2 className="text-3xl md:text-4xl font-bold mb-6">{t.cta.heading}</h2><p className="text-xl mb-8 opacity-90">{t.cta.subheading}</p><div className="flex flex-wrap gap-4 justify-center"><Link href={`/${locale}/contact`} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900">{t.cta.contact}</Link><a href="https://wa.me/8615578119543" className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-900">{t.cta.whatsapp}</a></div></div></section>
  </main></SchemaRenderer>;
}

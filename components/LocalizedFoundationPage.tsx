import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { FoundationLocale, FoundationPageSlug, foundationPageCopy } from '@/lib/foundation-page-copy';
import { getCompanyFacts } from '@/lib/company-facts';

type Props = { slug: FoundationPageSlug; lang: FoundationLocale };

const actions: Record<FoundationLocale, { products: string; contact: string; note: string; cards: [string, string, string] }> = {
  es: { products: 'Ver productos', contact: 'Solicitar cotización', note: 'Los detalles comerciales se confirman según el producto, el destino y los requisitos de su solicitud.', cards: ['Información del producto', 'Documentación bajo solicitud', 'Confirmación por cotización'] },
  de: { products: 'Produkte ansehen', contact: 'Angebot anfragen', note: 'Kaufmännische Details werden anhand von Produkt, Zielort und den Anforderungen Ihrer Anfrage bestätigt.', cards: ['Produktinformationen', 'Unterlagen auf Anfrage', 'Bestätigung per Angebot'] },
  fr: { products: 'Voir les produits', contact: 'Demander un devis', note: 'Les détails commerciaux sont confirmés selon le produit, la destination et les exigences de votre demande.', cards: ['Informations produit', 'Documentation sur demande', 'Confirmation par devis'] },
  ar: { products: 'تصفح المنتجات', contact: 'اطلب عرض سعر', note: 'تُؤكد التفاصيل التجارية وفقًا للمنتج والوجهة ومتطلبات طلبك.', cards: ['معلومات المنتج', 'وثائق عند الطلب', 'تأكيد عبر عرض السعر'] },
};

export default function LocalizedFoundationPage({ slug, lang }: Props) {
  const [title, heading, body] = foundationPageCopy[slug][lang];
  const action = actions[lang];
  const facts = getCompanyFacts(lang);
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40">
      <Breadcrumb lang={lang} slug={slug} />
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">HousePlus · B2B</p>
          <h1 className="text-3xl font-black leading-tight text-slate-900 md:text-5xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={`/${lang}/products`} className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">{action.products}</Link>
            <Link href={`/${lang}/contact`} className="rounded-xl border-2 border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-800 transition hover:border-blue-400 hover:text-blue-700">{action.contact}</Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-slate-500">{action.note}</p>
        </div>
      </section>
      <section className="border-y border-blue-100 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[facts.factoryArea, facts.manufacturingSince, facts.wholesaleClients, facts.markets].map((value, index) => (
            <div key={facts.labels[index]} className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-center">
              <p className="text-2xl font-black text-blue-700">{value}</p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{facts.labels[index]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-y border-blue-100 bg-white px-4 py-12">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {action.cards.map((item) => <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-700">{item}</div>)}
        </div>
      </section>
    </main>
  );
}

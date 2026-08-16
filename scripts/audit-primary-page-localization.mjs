import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.argv[2] || 'https://www.houseplus-ch.com';
const outputDir = process.argv[3] || path.join(process.cwd(), 'audit', 'primary-page-localization');
const locales = ['es', 'de', 'fr', 'ar'];
const pages = [
  { slug: 'about-us', required: { es: 'Sobre', de: 'Über', fr: 'À', ar: 'من' } },
  { slug: 'brand', required: { es: 'HousePlus', de: 'HousePlus', fr: 'HousePlus', ar: 'HousePlus' } },
  { slug: 'careers', required: { es: 'Carreras', de: 'Karriere', fr: 'Carrières', ar: 'وظائف' } },
  { slug: 'case-studies', required: { es: 'Casos', de: 'Fallstudien', fr: 'Études', ar: 'دراسات' } },
  { slug: 'certifications', required: { es: 'Certificaciones', de: 'Zertifizierungen', fr: 'Certifications', ar: 'الشهادات' } },
  { slug: 'factory', required: { es: 'Fábrica', de: 'Fabrik', fr: 'Usine', ar: 'المصنع' } },
  { slug: 'faq', required: { es: 'Preguntas', de: 'Häufig', fr: 'Questions', ar: 'الأسئلة' } },
  { slug: 'news', required: { es: 'Noticias', de: 'News', fr: 'Actualités', ar: 'الأخبار' } },
  { slug: 'oem-odm', required: { es: 'OEM', de: 'OEM', fr: 'OEM', ar: 'OEM' } },
  { slug: 'products', required: { es: 'Productos', de: 'Produkte', fr: 'Produits', ar: 'المنتجات' } },
  { slug: 'regions', required: { es: 'Mercados mayoristas', de: 'Großhandelsmärkte', fr: 'Marchés de gros', ar: 'أسواق الجملة' } },
  { slug: 'service', required: { es: 'Servicio', de: 'Service', fr: 'Service', ar: 'الخدمة' } },
  { slug: 'support', required: { es: 'Soporte', de: 'Support', fr: 'Support', ar: 'الدعم' } },
  { slug: 'team', required: { es: 'Equipo', de: 'Team', fr: 'Équipe', ar: 'فريق' } },
];

const genericTemplateSignatures = {
  es: ['Información del producto', 'Los detalles comerciales se confirman según el producto'],
  de: ['Produktinformationen', 'Kaufmännische Details werden anhand von Produkt'],
  fr: ['Informations produit', 'Les détails commerciaux sont confirmés selon le produit'],
  ar: ['معلومات المنتج', 'تُؤكد التفاصيل التجارية وفقًا للمنتج'],
};
const jobs = pages.flatMap((page) => locales.map((locale) => ({ page, locale })));

async function checkPage({ page, locale }) {
  const url = `${baseUrl}/${locale}/${page.slug}`;
  try {
    const isLocal = /^http:\/\/(?:localhost|127\.0\.0\.1)/.test(url);
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(30000),
      headers: isLocal ? { 'x-forwarded-proto': 'https' } : undefined,
    });
    const html = await response.text();
    const genericTemplate = genericTemplateSignatures[locale].every((marker) => html.includes(marker));
    const expectedPageText = html.includes(`lang="${locale}"`) && html.includes(page.required[locale]);
    return {
      locale,
      slug: page.slug,
      status: response.status,
      finalUrl: response.url,
      htmlBytes: Buffer.byteLength(html),
      expectedPageText,
      genericTemplate,
      pass: response.ok && expectedPageText && !genericTemplate && Buffer.byteLength(html) > 10000,
    };
  } catch (error) {
    return { locale, slug: page.slug, status: 0, finalUrl: url, htmlBytes: 0, expectedPageText: false, genericTemplate: false, pass: false, error: error instanceof Error ? error.message : String(error) };
  }
}

const checks = [];
for (let start = 0; start < jobs.length; start += 4) {
  checks.push(...await Promise.all(jobs.slice(start, start + 4).map(checkPage)));
}

const report = {
  baseUrl,
  checkedAt: new Date().toISOString(),
  expectedChecks: checks.length,
  passed: checks.filter((check) => check.pass).length,
  failed: checks.filter((check) => !check.pass),
  checks,
};

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'primary-page-localization.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ expectedChecks: report.expectedChecks, passed: report.passed, failed: report.failed.length }, null, 2));
if (report.failed.length > 0) process.exitCode = 1;

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';
import Breadcrumb from '@/components/Breadcrumb';
import SEOHead from '@/components/SEOHead';
import { generateOrganizationSchema, generateFAQSchema } from '@/lib/schema-generator';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

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

export default async function SupportPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;

  const content: Record<string, any> = {
    en: {
      title: 'HousePlus Customer Support Center',
      subtitle: 'HousePlus is here to help you succeed. Our dedicated HousePlus support team is available 6 days a week to assist with all your wholesale needs.',
      heroImage: {
        alt: 'HousePlus Support Background',
        title: 'HousePlus Support Background',
      },
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
      timezoneLabel: 'HousePlus Time Zone',
      timezoneValue: 'China Standard Time (GMT+8)',
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
          desc: 'All HousePlus products come with a 12-month warranty. HousePlus handles warranty claims efficiently.',
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
      faqLabelQ: 'Q:',
      faqLabelA: 'A:',
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
      whatsappButton: 'WhatsApp HousePlus',
    },
    es: {
      title: 'Centro de Atención al Cliente de HousePlus',
      subtitle: 'HousePlus está aquí para ayudarle a tener éxito. Nuestro equipo de soporte dedicado está disponible 6 días a la semana para ayudarle con todas sus necesidades de compra al por mayor.',
      heroImage: {
        alt: 'Fondo del soporte de HousePlus',
        title: 'Fondo del soporte de HousePlus',
      },
      contactTitle: 'Contactar con el equipo de HousePlus',
      contactChannels: [
        {
          icon: '📧',
          title: 'Soporte por correo electrónico de HousePlus',
          value: 'jack@houseplus-ch.com',
          desc: 'Envíenos su consulta para HousePlus y responderemos en un plazo de 24 horas en días laborables.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Enviar correo',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chatee directamente con nuestro equipo de ventas de HousePlus por WhatsApp para obtener respuestas rápidas.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Abrir WhatsApp',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Nuestro equipo regional de África de HousePlus está disponible para ayudar a compradores de Nigeria y África Occidental.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Abrir WhatsApp',
        },
        {
          icon: '📱',
          title: 'HousePlus WeChat',
          value: 'JackHousePlus',
          desc: 'Agregue nuestro ID de WeChat de HousePlus para comunicarse directamente con nuestro equipo en China.',
          link: null,
          linkText: 'ID: JackHousePlus',
        },
      ],
      hoursTitle: 'Horario de atención de HousePlus',
      hours: [
        { day: 'Lunes – Viernes', time: '9:00 AM – 6:00 PM (GMT+8)' },
        { day: 'Sábado', time: '9:00 AM – 1:00 PM (GMT+8)' },
        { day: 'Domingo', time: 'Cerrado' },
      ],
      timezoneLabel: 'Zona horaria de HousePlus',
      timezoneValue: 'Hora estándar de China (GMT+8)',
      supportTypesTitle: 'Cómo HousePlus le apoya',
      supportTypes: [
        {
          icon: '📦',
          title: 'Soporte de pedidos HousePlus',
          desc: 'Asistencia de HousePlus con la realización de pedidos, el seguimiento y la coordinación de la entrega. Le mantenemos informado en cada etapa.',
        },
        {
          icon: '🔧',
          title: 'Ayuda técnica HousePlus',
          desc: 'Especificaciones de productos HousePlus, guías de instalación y documentación técnica en varios idiomas.',
        },
        {
          icon: '🛡️',
          title: 'Garantía HousePlus',
          desc: 'Todos los productos HousePlus incluyen una garantía de 12 meses. HousePlus gestiona las reclamaciones de garantía de forma eficiente.',
        },
        {
          icon: '📋',
          title: 'Documentos HousePlus',
          desc: 'Asistencia de HousePlus con certificados de origen y otra documentación aduanera requerida para la importación.',
        },
        {
          icon: '🎨',
          title: 'HousePlus OEM/ODM',
          desc: 'Asesoría experta de HousePlus sobre desarrollo de productos a medida, branding y fabricación de marca privada.',
        },
        {
          icon: '🌍',
          title: 'Entrada a mercados con HousePlus',
          desc: 'Consejos de HousePlus sobre selección de productos y estrategias de entrada a mercados globales.',
        },
      ],
      faqTitle: 'Preguntas frecuentes',
      faqLabelQ: 'P:',
      faqLabelA: 'R:',
      faqs: [
        {
          q: '¿Cuál es la cantidad mínima de pedido (MOQ) de HousePlus para ventas al por mayor?',
          a: 'El MOQ estándar de HousePlus comienza en 100 unidades por línea de producto. Para pedidos de contenedor mixto, HousePlus puede aceptar cantidades menores por SKU. Contacte con HousePlus para comentar sus requisitos específicos.',
        },
        {
          q: '¿Cuánto tarda el envío de HousePlus?',
          a: 'El plazo estándar de HousePlus es de 20–35 días por transporte marítimo después de la confirmación del pedido. Hay opciones de transporte aéreo disponibles para pedidos urgentes (7–14 días).',
        },
        {
          q: '¿HousePlus proporciona muestras de producto?',
          a: 'Sí, HousePlus proporciona muestras profesionales para evaluación. Se aplican tarifas de muestra y normalmente son reembolsables al realizar un pedido a granel de HousePlus.',
        },
        {
          q: '¿Qué certificaciones tienen los productos HousePlus?',
          a: 'Todos los productos HousePlus cuentan con certificaciones CE, FCC, RoHS e ISO 9001. Los productos solares de HousePlus cuentan con certificaciones IEC 61215 e IEC 61730.',
        },
        {
          q: '¿Puedo visitar la fábrica de HousePlus?',
          a: 'Sí, HousePlus recibe visitas a fábrica de compradores serios. Por favor, contacte con HousePlus con antelación para programar su visita a nuestras instalaciones de fabricación.',
        },
        {
          q: '¿Qué condiciones de pago ofrece HousePlus?',
          a: 'HousePlus acepta T/T, L/C y Western Union. Las condiciones estándar de HousePlus son 30% de anticipo y 70% antes del envío.',
        },
      ],
      ctaTitle: '¿Listo para realizar un pedido a HousePlus?',
      ctaDesc: 'Póngase en contacto con nuestro equipo de ventas de HousePlus hoy para comentar sus requisitos de compra al por mayor o solicitar un catálogo de productos de HousePlus.',
      ctaButton: 'Contactar con ventas de HousePlus',
      whatsappButton: 'WhatsApp de HousePlus',
    },
    de: {
      title: 'HousePlus Kundenservice-Center',
      subtitle: 'HousePlus hilft Ihnen, erfolgreich zu sein. Unser engagiertes Supportteam ist 6 Tage pro Woche verfügbar und unterstützt Sie bei allen Anforderungen im Großhandel.',
      heroImage: {
        alt: 'HousePlus Support Hintergrund',
        title: 'HousePlus Support Hintergrund',
      },
      contactTitle: 'HousePlus-Team kontaktieren',
      contactChannels: [
        {
          icon: '📧',
          title: 'HousePlus E-Mail-Support',
          value: 'jack@houseplus-ch.com',
          desc: 'Senden Sie uns Ihre HousePlus-Anfrage, und wir antworten an Werktagen innerhalb von 24 Stunden.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'E-Mail senden',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chatten Sie direkt mit unserem HousePlus-Vertriebsteam über WhatsApp für schnelle Antworten.',
          link: 'https://wa.me/8615578119543',
          linkText: 'WhatsApp öffnen',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Unser regionales HousePlus-Afrika-Team unterstützt Käufer in Nigeria und Westafrika.',
          link: 'https://wa.me/2349078080738',
          linkText: 'WhatsApp öffnen',
        },
        {
          icon: '📱',
          title: 'HousePlus WeChat',
          value: 'JackHousePlus',
          desc: 'Fügen Sie unsere HousePlus WeChat-ID hinzu, um direkt mit unserem Team in China zu kommunizieren.',
          link: null,
          linkText: 'ID: JackHousePlus',
        },
      ],
      hoursTitle: 'HousePlus Geschäftszeiten',
      hours: [
        { day: 'Montag – Freitag', time: '9:00–18:00 Uhr (GMT+8)' },
        { day: 'Samstag', time: '9:00–13:00 Uhr (GMT+8)' },
        { day: 'Sonntag', time: 'Geschlossen' },
      ],
      timezoneLabel: 'HousePlus Zeitzone',
      timezoneValue: 'Chinesische Standardzeit (GMT+8)',
      supportTypesTitle: 'Wie HousePlus Sie unterstützt',
      supportTypes: [
        {
          icon: '📦',
          title: 'HousePlus Bestell-Support',
          desc: 'Unterstützung von HousePlus bei Bestellaufgabe, Sendungsverfolgung und Lieferkoordination. Wir halten Sie auf jeder Etappe informiert.',
        },
        {
          icon: '🔧',
          title: 'HousePlus Technischer Support',
          desc: 'Produkt­spezifikationen, Installationsanleitungen und technische Dokumentation von HousePlus in mehreren Sprachen.',
        },
        {
          icon: '🛡️',
          title: 'HousePlus Garantie',
          desc: 'Alle HousePlus Produkte verfügen über 12 Monate Garantie. HousePlus bearbeitet Garantieansprüche effizient.',
        },
        {
          icon: '📋',
          title: 'HousePlus Dokumente',
          desc: 'Unterstützung von HousePlus bei Ursprungszeugnissen und weiteren Zolldokumenten, die für den Import erforderlich sind.',
        },
        {
          icon: '🎨',
          title: 'HousePlus OEM/ODM',
          desc: 'Expertenberatung von HousePlus zu kundenspezifischer Produktentwicklung, Branding und Private Label Fertigung.',
        },
        {
          icon: '🌍',
          title: 'HousePlus Markteintritt',
          desc: 'HousePlus Beratung zur Produktauswahl und zu Markteintrittsstrategien für globale Märkte.',
        },
      ],
      faqTitle: 'Häufig gestellte Fragen',
      faqLabelQ: 'F:',
      faqLabelA: 'A:',
      faqs: [
        {
          q: 'Wie hoch ist die HousePlus Mindestbestellmenge (MOQ) für den Großhandel?',
          a: 'Der Standard-MOQ von HousePlus beginnt bei 100 Einheiten pro Produktlinie. Bei Mischcontainer-Bestellungen kann HousePlus geringere Mengen pro SKU ermöglichen. Kontaktieren Sie HousePlus, um Ihre spezifischen Anforderungen zu besprechen.',
        },
        {
          q: 'Wie lange dauert der Versand bei HousePlus?',
          a: 'Die Standarddurchlaufzeit von HousePlus beträgt 20–35 Tage per Seefracht nach Auftragsbestätigung. Luftfrachtoptionen sind für eilige Bestellungen verfügbar (7–14 Tage).',
        },
        {
          q: 'Stellt HousePlus Produktmuster zur Verfügung?',
          a: 'Ja, HousePlus stellt professionelle Muster zur Bewertung bereit. Mustergebühren fallen an und werden in der Regel bei Aufgabe einer HousePlus Großbestellung erstattet.',
        },
        {
          q: 'Welche Zertifizierungen haben HousePlus Produkte?',
          a: 'Alle HousePlus Produkte tragen CE-, FCC-, RoHS- und ISO 9001-Zertifizierungen. HousePlus Solarprodukte verfügen über IEC 61215 und IEC 61730 Zertifizierungen.',
        },
        {
          q: 'Kann ich die HousePlus Fabrik besuchen?',
          a: 'Ja, HousePlus begrüßt Fabrikbesuche von ernsthaften Käufern. Bitte kontaktieren Sie HousePlus im Voraus, um Ihren Besuch in unseren Produktionsstätten zu planen.',
        },
        {
          q: 'Welche Zahlungsbedingungen bietet HousePlus an?',
          a: 'HousePlus akzeptiert T/T, L/C und Western Union. Die Standardbedingungen von HousePlus sind 30 % Anzahlung und 70 % vor dem Versand.',
        },
      ],
      ctaTitle: 'Bereit, eine HousePlus-Bestellung aufzugeben?',
      ctaDesc: 'Kontaktieren Sie noch heute unser HousePlus-Vertriebsteam, um Ihre Großhandelsanforderungen zu besprechen oder einen HousePlus Produktkatalog anzufordern.',
      ctaButton: 'HousePlus Vertrieb kontaktieren',
      whatsappButton: 'WhatsApp von HousePlus',
    },
    fr: {
      title: 'Centre d’assistance client HousePlus',
      subtitle: 'HousePlus est là pour vous aider à réussir. Notre équipe d’assistance dédiée est disponible 6 jours sur 7 pour vous accompagner dans tous vos besoins de gros.',
      heroImage: {
        alt: 'Arrière-plan du support HousePlus',
        title: 'Arrière-plan du support HousePlus',
      },
      contactTitle: 'Contacter l’équipe HousePlus',
      contactChannels: [
        {
          icon: '📧',
          title: 'Assistance e-mail HousePlus',
          value: 'jack@houseplus-ch.com',
          desc: 'Envoyez-nous votre demande HousePlus et nous répondrons sous 24 h les jours ouvrables.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Envoyer un e-mail',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (Chine)',
          value: '+86 155 7811 9543',
          desc: 'Discutez directement avec notre équipe commerciale HousePlus via WhatsApp pour des réponses rapides.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Ouvrir WhatsApp',
        },
        {
          icon: '💬',
          title: 'HousePlus WhatsApp (Nigéria)',
          value: '+234 9078080738',
          desc: 'Notre équipe régionale HousePlus Afrique est disponible pour assister les acheteurs du Nigéria et d’Afrique de l’Ouest.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Ouvrir WhatsApp',
        },
        {
          icon: '📱',
          title: 'HousePlus WeChat',
          value: 'JackHousePlus',
          desc: 'Ajoutez notre identifiant WeChat HousePlus pour communiquer directement avec notre équipe basée en Chine.',
          link: null,
          linkText: 'ID: JackHousePlus',
        },
      ],
      hoursTitle: 'Horaires d’ouverture de HousePlus',
      hours: [
        { day: 'Lundi – Vendredi', time: '9:00 – 18:00 (GMT+8)' },
        { day: 'Samedi', time: '9:00 – 13:00 (GMT+8)' },
        { day: 'Dimanche', time: 'Fermé' },
      ],
      timezoneLabel: 'Fuseau horaire HousePlus',
      timezoneValue: 'Heure standard de Chine (GMT+8)',
      supportTypesTitle: 'Comment HousePlus vous accompagne',
      supportTypes: [
        {
          icon: '📦',
          title: 'Assistance aux commandes HousePlus',
          desc: 'Aide de HousePlus pour la passation de commandes, le suivi et la coordination de la livraison. Nous vous tenons informé à chaque étape.',
        },
        {
          icon: '🔧',
          title: 'Aide technique HousePlus',
          desc: 'Spécifications des produits HousePlus, guides d’installation et documentation technique en plusieurs langues.',
        },
        {
          icon: '🛡️',
          title: 'Garantie HousePlus',
          desc: 'Tous les produits HousePlus sont couverts par une garantie de 12 mois. HousePlus traite les réclamations de garantie avec efficacité.',
        },
        {
          icon: '📋',
          title: 'Documents HousePlus',
          desc: 'Assistance HousePlus pour les certificats d’origine et autres documents douaniers requis pour l’importation.',
        },
        {
          icon: '🎨',
          title: 'HousePlus OEM/ODM',
          desc: 'Conseils d’experts HousePlus sur le développement de produits personnalisés, le branding et la fabrication en marque blanche.',
        },
        {
          icon: '🌍',
          title: 'Accès au marché HousePlus',
          desc: 'Conseils HousePlus sur la sélection de produits et les stratégies d’entrée sur les marchés mondiaux.',
        },
      ],
      faqTitle: 'Foire aux questions',
      faqLabelQ: 'Q :',
      faqLabelA: 'R :',
      faqs: [
        {
          q: 'Quelle est la quantité minimale de commande (MOQ) de HousePlus pour le gros ?',
          a: 'Le MOQ standard de HousePlus commence à 100 unités par ligne de produit. Pour les commandes de conteneur mixte, HousePlus peut accepter des quantités plus faibles par SKU. Contactez HousePlus pour discuter de vos besoins spécifiques.',
        },
        {
          q: 'Combien de temps dure l’expédition HousePlus ?',
          a: 'Le délai standard de HousePlus est de 20 à 35 jours par transport maritime après confirmation de commande. Des options de fret aérien sont disponibles pour les commandes urgentes (7 à 14 jours).',
        },
        {
          q: 'HousePlus fournit-il des échantillons de produits ?',
          a: 'Oui, HousePlus fournit des échantillons professionnels pour évaluation. Des frais d’échantillon s’appliquent et sont généralement remboursables lors d’une commande HousePlus en volume.',
        },
        {
          q: 'Quelles certifications possèdent les produits HousePlus ?',
          a: 'Tous les produits HousePlus possèdent les certifications CE, FCC, RoHS et ISO 9001. Les produits solaires HousePlus disposent des certifications IEC 61215 et IEC 61730.',
        },
        {
          q: 'Puis-je visiter l’usine HousePlus ?',
          a: 'Oui, HousePlus accueille les visites d’usine des acheteurs sérieux. Veuillez contacter HousePlus à l’avance pour planifier votre visite de nos installations de fabrication.',
        },
        {
          q: 'Quelles conditions de paiement HousePlus propose-t-il ?',
          a: 'HousePlus accepte T/T, L/C et Western Union. Les conditions standard de HousePlus sont 30 % d’acompte et 70 % avant expédition.',
        },
      ],
      ctaTitle: 'Prêt à passer une commande HousePlus ?',
      ctaDesc: 'Contactez dès aujourd’hui notre équipe commerciale HousePlus pour discuter de vos besoins de gros ou demander un catalogue de produits HousePlus.',
      ctaButton: 'Contacter les ventes HousePlus',
      whatsappButton: 'WhatsApp de HousePlus',
    },
    ar: {
      title: 'مركز دعم عملاء HousePlus',
      subtitle: 'نحن في HousePlus هنا لمساعدتك على النجاح. فريق الدعم المخصص لدينا متاح 6 أيام في الأسبوع لمساعدتك في جميع متطلبات الشراء بالجملة.',
      heroImage: {
        alt: 'خلفية دعم HousePlus',
        title: 'خلفية دعم HousePlus',
      },
      contactTitle: 'التواصل مع فريق HousePlus',
      contactChannels: [
        {
          icon: '📧',
          title: 'دعم البريد الإلكتروني من HousePlus',
          value: 'jack@houseplus-ch.com',
          desc: 'أرسل إلينا استفسارك الخاص بـ HousePlus وسنرد خلال 24 ساعة في أيام العمل.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'إرسال بريد إلكتروني',
        },
        {
          icon: '💬',
          title: 'HousePlus واتساب (الصين)',
          value: '+86 155 7811 9543',
          desc: 'تحدث مباشرة مع فريق مبيعات HousePlus عبر واتساب للحصول على ردود سريعة.',
          link: 'https://wa.me/8615578119543',
          linkText: 'فتح واتساب',
        },
        {
          icon: '💬',
          title: 'HousePlus واتساب (نيجيريا)',
          value: '+234 9078080738',
          desc: 'فريق HousePlus الإقليمي في أفريقيا متاح لمساعدة المشترين في نيجيريا وغرب أفريقيا.',
          link: 'https://wa.me/2349078080738',
          linkText: 'فتح واتساب',
        },
        {
          icon: '📱',
          title: 'HousePlus WeChat',
          value: 'JackHousePlus',
          desc: 'أضف معرّف WeChat الخاص بـ HousePlus للتواصل مباشرة مع فريقنا في الصين.',
          link: null,
          linkText: 'ID: JackHousePlus',
        },
      ],
      hoursTitle: 'ساعات عمل HousePlus',
      hours: [
        { day: 'الاثنين – الجمعة', time: '9:00 ص – 6:00 م (GMT+8)' },
        { day: 'السبت', time: '9:00 ص – 1:00 م (GMT+8)' },
        { day: 'الأحد', time: 'مغلق' },
      ],
      timezoneLabel: 'المنطقة الزمنية لـ HousePlus',
      timezoneValue: 'التوقيت القياسي للصين (GMT+8)',
      supportTypesTitle: 'كيف تدعمك HousePlus',
      supportTypes: [
        {
          icon: '📦',
          title: 'دعم الطلبات من HousePlus',
          desc: 'مساعدة HousePlus في تقديم الطلبات والتتبع وتنسيق التسليم. نُبقيك على اطلاع في كل مرحلة.',
        },
        {
          icon: '🔧',
          title: 'مساعدة فنية من HousePlus',
          desc: 'مواصفات منتجات HousePlus وأدلة التثبيت والوثائق الفنية بعدة لغات.',
        },
        {
          icon: '🛡️',
          title: 'ضمان HousePlus',
          desc: 'جميع منتجات HousePlus تأتي مع ضمان لمدة 12 شهراً. تتولى HousePlus معالجة مطالبات الضمان بكفاءة.',
        },
        {
          icon: '📋',
          title: 'مستندات HousePlus',
          desc: 'مساعدة HousePlus في شهادات المنشأ وغيرها من مستندات الجمارك المطلوبة للاستيراد.',
        },
        {
          icon: '🎨',
          title: 'HousePlus OEM/ODM',
          desc: 'إرشاد احترافي من HousePlus لتطوير المنتجات المخصصة والعلامة التجارية والتصنيع بعلامة خاصة.',
        },
        {
          icon: '🌍',
          title: 'دخول الأسواق مع HousePlus',
          desc: 'نصائح من HousePlus بشأن اختيار المنتجات واستراتيجيات دخول الأسواق العالمية.',
        },
      ],
      faqTitle: 'الأسئلة الشائعة',
      faqLabelQ: 'س:',
      faqLabelA: 'ج:',
      faqs: [
        {
          q: 'ما هي أقل كمية للطلب (MOQ) لدى HousePlus للطلب بالجملة؟',
          a: 'يبدأ MOQ القياسي لدى HousePlus من 100 وحدة لكل خط منتج. بالنسبة لطلبات الحاويات المختلطة، يمكن لـ HousePlus قبول كميات أقل لكل SKU. يرجى التواصل مع HousePlus لمناقشة متطلباتك المحددة.',
        },
        {
          q: 'كم يستغرق شحن HousePlus؟',
          a: 'المدة القياسية لدى HousePlus هي 20–35 يوماً للشحن البحري بعد تأكيد الطلب. تتوفر خيارات الشحن الجوي للطلبات العاجلة (7–14 يوماً).',
        },
        {
          q: 'هل توفر HousePlus عينات منتجات؟',
          a: 'نعم، توفر HousePlus عينات احترافية للتقييم. تُطبق رسوم العينة وغالباً ما تُسترد عند تقديم طلب HousePlus بالجملة.',
        },
        {
          q: 'ما الشهادات التي تحملها منتجات HousePlus؟',
          a: 'جميع منتجات HousePlus تحمل شهادات CE وFCC وRoHS وISO 9001. وتحمل المنتجات الشمسية من HousePlus شهادات IEC 61215 وIEC 61730.',
        },
        {
          q: 'هل يمكنني زيارة مصنع HousePlus؟',
          a: 'نعم، ترحّب HousePlus بزيارات المصنع من المشترين الجادين. يرجى التواصل مسبقاً لتحديد موعد زيارة لمرافقنا التصنيعية.',
        },
        {
          q: 'ما شروط الدفع التي تقدمها HousePlus؟',
          a: 'تقبل HousePlus T/T وL/C وWestern Union. الشروط القياسية لدى HousePlus هي 30% دفعة مقدمة و70% قبل الشحن.',
        },
      ],
      ctaTitle: 'هل أنت مستعد لتقديم طلب لدى HousePlus؟',
      ctaDesc: 'تواصل اليوم مع فريق مبيعات HousePlus لمناقشة متطلبات الشراء بالجملة أو لطلب كتالوج منتجات HousePlus.',
      ctaButton: 'التواصل مع مبيعات HousePlus',
      whatsappButton: 'واتساب HousePlus',
    },
  };

  // Use the appropriate language content, fallback to English if not available
  const t = content[lang] || content.en;

  const schemas = [
    generateOrganizationSchema({
      title: 'HousePlus Support',
      description: 'Professional HousePlus customer support and technical assistance.',
      url: `https://www.houseplus-ch.com/${lang}/support`,
      lang,
      type: 'Organization',
    }),
    generateFAQSchema(t.faqs.map((f: any) => ({ question: f.q, answer: f.a }))),
  ];

  return (
    <>
      <SEOHead schemas={schemas} />
      <main className="min-h-screen bg-white">
        <Breadcrumb lang={lang} slug="support" />
        {/* Hero Section */}
        <section className="py-24 px-4 bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <Image
                src="https://images.houseplus-ch.com/media/houseplus-site-support-customer-service/"
                alt={t.heroImage.alt}
                title={t.heroImage.title}
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
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
                <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-2">{t.timezoneLabel}</p>
                <p className="font-black text-blue-400">{t.timezoneValue}</p>
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
                    <span className="text-blue-600">{t.faqLabelQ}</span>
                    {faq.q}
                  </h4>
                  <div className="text-slate-600 pl-10 flex gap-4 leading-relaxed">
                    <span className="text-slate-300 font-black italic">{t.faqLabelA}</span>
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
                {t.whatsappButton}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

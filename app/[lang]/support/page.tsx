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
      title: 'Customer Support Center',
      subtitle: 'We are here to help you succeed. Our dedicated support team is available 6 days a week to assist with all your wholesale needs.',
      contactTitle: 'Contact Our Team',
      contactChannels: [
        {
          icon: '📧',
          title: 'Email Support',
          value: 'jack@houseplus-ch.com',
          desc: 'Send us your inquiry and we will respond within 24 hours on business days.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Send Email',
          color: 'blue',
        },
        {
          icon: '💬',
          title: 'WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chat with our sales team directly via WhatsApp for fast responses.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Open WhatsApp',
          color: 'green',
        },
        {
          icon: '💬',
          title: 'WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Our Africa regional team is available to assist Nigerian and West African buyers.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Open WhatsApp',
          color: 'green',
        },
        {
          icon: '🔵',
          title: 'WeChat',
          value: 'JackHousePlus',
          desc: 'Add our WeChat ID for direct communication with our China-based team.',
          link: null,
          linkText: 'WeChat ID: JackHousePlus',
          color: 'blue',
        },
      ],
      hoursTitle: 'Business Hours',
      hours: [
        { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM (GMT+8)' },
        { day: 'Saturday', time: '9:00 AM – 1:00 PM (GMT+8)' },
        { day: 'Sunday', time: 'Closed' },
      ],
      supportTypesTitle: 'How We Support You',
      supportTypes: [
        {
          icon: '📦',
          title: 'Order Support',
          desc: 'Assistance with order placement, tracking, modifications, and delivery coordination. We keep you informed at every stage of your order.',
        },
        {
          icon: '🔧',
          title: 'Technical Assistance',
          desc: 'Product specifications, installation guides, troubleshooting support, and technical documentation in multiple languages.',
        },
        {
          icon: '🛡️',
          title: 'Warranty & After-Sales',
          desc: 'All HousePlus products come with a 12-24 month warranty. We handle warranty claims, spare parts supply, and product replacement efficiently.',
        },
        {
          icon: '📋',
          title: 'Documentation Support',
          desc: 'Assistance with certificates of origin, packing lists, commercial invoices, and other customs documentation required for import clearance.',
        },
        {
          icon: '🎨',
          title: 'OEM/ODM Consultation',
          desc: 'Expert guidance on custom product development, branding, packaging design, and private label manufacturing for your specific market.',
        },
        {
          icon: '🌍',
          title: 'Regional Market Guidance',
          desc: 'Advice on product selection, regulatory requirements, and market entry strategies for Africa, Southeast Asia, Europe, and the Middle East.',
        },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'What is the minimum order quantity (MOQ) for wholesale?',
          a: 'Our standard MOQ starts at 100 units per product line. For mixed-container orders, we can accommodate lower quantities per SKU. Contact us to discuss your specific requirements.',
        },
        {
          q: 'How long does shipping take?',
          a: 'Standard lead time is 20-35 days for sea freight after order confirmation. Air freight options are available for urgent orders (7-14 days). Lead times may vary based on order volume and product customization.',
        },
        {
          q: 'Do you provide product samples?',
          a: 'Yes, we provide product samples for evaluation. Sample fees apply and are typically refundable upon placing a bulk order. Contact our sales team to request samples.',
        },
        {
          q: 'What certifications do your products carry?',
          a: 'Our products carry CE (Europe), FCC (USA/Canada), RoHS, and ISO 9001:2015 certifications. Solar products additionally hold IEC 61215 and IEC 61730 certifications. Full documentation is provided with each order.',
        },
        {
          q: 'Can I visit your factory?',
          a: 'Yes, we welcome factory visits from serious buyers. Please contact us in advance to schedule your visit. We can arrange accommodation and transportation assistance for international visitors.',
        },
        {
          q: 'What payment terms do you offer?',
          a: 'We accept T/T (bank transfer), L/C (Letter of Credit), and Western Union for established partners. Standard terms are 30% deposit and 70% before shipment. Flexible terms are available for long-term partners.',
        },
      ],
      ctaTitle: 'Ready to Place an Order?',
      ctaDesc: 'Contact our sales team today to discuss your wholesale requirements, request a product catalog, or get a customized price quote.',
    },
    es: {
      title: 'Centro de Soporte al Cliente',
      subtitle: 'Estamos aquí para ayudarle a tener éxito. Nuestro equipo de soporte dedicado está disponible 6 días a la semana para ayudarle con todas sus necesidades mayoristas.',
      contactTitle: 'Contacte a Nuestro Equipo',
      contactChannels: [
        {
          icon: '📧',
          title: 'Soporte por Correo Electrónico',
          value: 'jack@houseplus-ch.com',
          desc: 'Envíenos su consulta y responderemos dentro de las 24 horas en días hábiles.',
          link: 'mailto:jack@houseplus-ch.com',
          linkText: 'Enviar Correo',
          color: 'blue',
        },
        {
          icon: '💬',
          title: 'WhatsApp (China)',
          value: '+86 155 7811 9543',
          desc: 'Chatee directamente con nuestro equipo de ventas a través de WhatsApp.',
          link: 'https://wa.me/8615578119543',
          linkText: 'Abrir WhatsApp',
          color: 'green',
        },
        {
          icon: '💬',
          title: 'WhatsApp (Nigeria)',
          value: '+234 9078080738',
          desc: 'Nuestro equipo regional de África está disponible para compradores nigerianos y de África Occidental.',
          link: 'https://wa.me/2349078080738',
          linkText: 'Abrir WhatsApp',
          color: 'green',
        },
        {
          icon: '🔵',
          title: 'WeChat',
          value: 'JackHousePlus',
          desc: 'Agregue nuestro ID de WeChat para comunicación directa con nuestro equipo en China.',
          link: null,
          linkText: 'ID de WeChat: JackHousePlus',
          color: 'blue',
        },
      ],
      hoursTitle: 'Horario de Atención',
      hours: [
        { day: 'Lunes – Viernes', time: '9:00 AM – 6:00 PM (GMT+8)' },
        { day: 'Sábado', time: '9:00 AM – 1:00 PM (GMT+8)' },
        { day: 'Domingo', time: 'Cerrado' },
      ],
      supportTypesTitle: 'Cómo le Apoyamos',
      supportTypes: [
        { icon: '📦', title: 'Soporte de Pedidos', desc: 'Asistencia con la colocación de pedidos, seguimiento, modificaciones y coordinación de entrega.' },
        { icon: '🔧', title: 'Asistencia Técnica', desc: 'Especificaciones de productos, guías de instalación, soporte de solución de problemas y documentación técnica en múltiples idiomas.' },
        { icon: '🛡️', title: 'Garantía y Posventa', desc: 'Todos los productos HousePlus vienen con una garantía de 12-24 meses. Manejamos reclamaciones de garantía y suministro de repuestos.' },
        { icon: '📋', title: 'Soporte de Documentación', desc: 'Asistencia con certificados de origen, listas de empaque, facturas comerciales y otros documentos aduaneros.' },
        { icon: '🎨', title: 'Consultoría OEM/ODM', desc: 'Orientación experta sobre desarrollo de productos personalizados, marca y fabricación de etiqueta privada.' },
        { icon: '🌍', title: 'Orientación de Mercado Regional', desc: 'Asesoramiento sobre selección de productos, requisitos regulatorios y estrategias de entrada al mercado.' },
      ],
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        { q: '¿Cuál es la cantidad mínima de pedido (MOQ) para mayoristas?', a: 'Nuestro MOQ estándar comienza en 100 unidades por línea de productos. Contáctenos para discutir sus requisitos específicos.' },
        { q: '¿Cuánto tiempo tarda el envío?', a: 'El tiempo de entrega estándar es de 20-35 días para flete marítimo después de la confirmación del pedido. Las opciones de flete aéreo están disponibles para pedidos urgentes (7-14 días).' },
        { q: '¿Proporcionan muestras de productos?', a: 'Sí, proporcionamos muestras de productos para evaluación. Se aplican tarifas de muestra y generalmente son reembolsables al realizar un pedido al por mayor.' },
        { q: '¿Qué certificaciones llevan sus productos?', a: 'Nuestros productos llevan certificaciones CE, FCC, RoHS e ISO 9001:2015. La documentación completa se proporciona con cada pedido.' },
        { q: '¿Puedo visitar su fábrica?', a: 'Sí, damos la bienvenida a visitas de compradores serios. Por favor contáctenos con anticipación para programar su visita.' },
        { q: '¿Qué términos de pago ofrecen?', a: 'Aceptamos T/T (transferencia bancaria), L/C (Carta de Crédito) y Western Union. Los términos estándar son 30% de depósito y 70% antes del envío.' },
      ],
      ctaTitle: '¿Listo para Hacer un Pedido?',
      ctaDesc: 'Contacte a nuestro equipo de ventas hoy para discutir sus requisitos mayoristas, solicitar un catálogo de productos u obtener una cotización de precio personalizada.',
    },
    de: {
      title: 'Kundensupport-Center',
      subtitle: 'Wir sind hier, um Ihnen zum Erfolg zu verhelfen. Unser engagiertes Support-Team ist 6 Tage die Woche verfügbar, um Ihnen bei allen Großhandelsanforderungen zu helfen.',
      contactTitle: 'Kontaktieren Sie unser Team',
      contactChannels: [
        { icon: '📧', title: 'E-Mail-Support', value: 'jack@houseplus-ch.com', desc: 'Senden Sie uns Ihre Anfrage und wir antworten innerhalb von 24 Stunden an Werktagen.', link: 'mailto:jack@houseplus-ch.com', linkText: 'E-Mail senden', color: 'blue' },
        { icon: '💬', title: 'WhatsApp (China)', value: '+86 155 7811 9543', desc: 'Chatten Sie direkt mit unserem Vertriebsteam über WhatsApp.', link: 'https://wa.me/8615578119543', linkText: 'WhatsApp öffnen', color: 'green' },
        { icon: '💬', title: 'WhatsApp (Nigeria)', value: '+234 9078080738', desc: 'Unser Afrika-Regionalteam steht nigerianischen und westafrikanischen Käufern zur Verfügung.', link: 'https://wa.me/2349078080738', linkText: 'WhatsApp öffnen', color: 'green' },
        { icon: '🔵', title: 'WeChat', value: 'JackHousePlus', desc: 'Fügen Sie unsere WeChat-ID für direkte Kommunikation mit unserem China-Team hinzu.', link: null, linkText: 'WeChat-ID: JackHousePlus', color: 'blue' },
      ],
      hoursTitle: 'Geschäftszeiten',
      hours: [
        { day: 'Montag – Freitag', time: '9:00 – 18:00 Uhr (GMT+8)' },
        { day: 'Samstag', time: '9:00 – 13:00 Uhr (GMT+8)' },
        { day: 'Sonntag', time: 'Geschlossen' },
      ],
      supportTypesTitle: 'Wie wir Sie unterstützen',
      supportTypes: [
        { icon: '📦', title: 'Bestellsupport', desc: 'Unterstützung bei Bestellaufgabe, Tracking, Änderungen und Lieferkoordination.' },
        { icon: '🔧', title: 'Technische Hilfe', desc: 'Produktspezifikationen, Installationsanleitungen, Fehlerbehebungssupport und technische Dokumentation in mehreren Sprachen.' },
        { icon: '🛡️', title: 'Garantie & After-Sales', desc: 'Alle HousePlus-Produkte werden mit einer 12-24-monatigen Garantie geliefert. Wir bearbeiten Garantieansprüche und Ersatzteilversorgung.' },
        { icon: '📋', title: 'Dokumentationssupport', desc: 'Unterstützung bei Ursprungszeugnissen, Packlisten, Handelsrechnungen und anderen Zolldokumenten.' },
        { icon: '🎨', title: 'OEM/ODM-Beratung', desc: 'Expertenberatung zur individuellen Produktentwicklung, Branding und Private-Label-Fertigung.' },
        { icon: '🌍', title: 'Regionale Marktberatung', desc: 'Beratung zu Produktauswahl, regulatorischen Anforderungen und Markteintrittsstrategien.' },
      ],
      faqTitle: 'Häufig Gestellte Fragen',
      faqs: [
        { q: 'Was ist die Mindestbestellmenge (MOQ) für den Großhandel?', a: 'Unsere Standard-MOQ beginnt bei 100 Einheiten pro Produktlinie. Kontaktieren Sie uns, um Ihre spezifischen Anforderungen zu besprechen.' },
        { q: 'Wie lange dauert der Versand?', a: 'Die Standard-Vorlaufzeit beträgt 20-35 Tage für Seefracht nach Auftragsbestätigung. Luftfrachtoptionen sind für dringende Bestellungen verfügbar (7-14 Tage).' },
        { q: 'Stellen Sie Produktmuster zur Verfügung?', a: 'Ja, wir stellen Produktmuster zur Bewertung zur Verfügung. Mustergebühren fallen an und sind bei Aufgabe einer Großbestellung in der Regel erstattungsfähig.' },
        { q: 'Welche Zertifizierungen tragen Ihre Produkte?', a: 'Unsere Produkte tragen CE-, FCC-, RoHS- und ISO 9001:2015-Zertifizierungen. Vollständige Dokumentation wird mit jeder Bestellung bereitgestellt.' },
        { q: 'Kann ich Ihre Fabrik besuchen?', a: 'Ja, wir begrüßen Fabrikbesuche von ernsthaften Käufern. Bitte kontaktieren Sie uns im Voraus, um Ihren Besuch zu planen.' },
        { q: 'Welche Zahlungsbedingungen bieten Sie an?', a: 'Wir akzeptieren T/T (Banküberweisung), L/C (Akkreditiv) und Western Union. Standardbedingungen sind 30% Anzahlung und 70% vor Versand.' },
      ],
      ctaTitle: 'Bereit, eine Bestellung aufzugeben?',
      ctaDesc: 'Kontaktieren Sie noch heute unser Vertriebsteam, um Ihre Großhandelsanforderungen zu besprechen, einen Produktkatalog anzufordern oder ein individuelles Preisangebot zu erhalten.',
    },
    fr: {
      title: 'Centre de Support Client',
      subtitle: 'Nous sommes là pour vous aider à réussir. Notre équipe de support dédiée est disponible 6 jours par semaine pour vous aider avec tous vos besoins en gros.',
      contactTitle: 'Contactez Notre Équipe',
      contactChannels: [
        { icon: '📧', title: 'Support par E-mail', value: 'jack@houseplus-ch.com', desc: 'Envoyez-nous votre demande et nous répondrons dans les 24 heures les jours ouvrables.', link: 'mailto:jack@houseplus-ch.com', linkText: 'Envoyer un E-mail', color: 'blue' },
        { icon: '💬', title: 'WhatsApp (Chine)', value: '+86 155 7811 9543', desc: 'Discutez directement avec notre équipe de vente via WhatsApp.', link: 'https://wa.me/8615578119543', linkText: 'Ouvrir WhatsApp', color: 'green' },
        { icon: '💬', title: 'WhatsApp (Nigeria)', value: '+234 9078080738', desc: 'Notre équipe régionale Afrique est disponible pour les acheteurs nigérians et ouest-africains.', link: 'https://wa.me/2349078080738', linkText: 'Ouvrir WhatsApp', color: 'green' },
        { icon: '🔵', title: 'WeChat', value: 'JackHousePlus', desc: 'Ajoutez notre ID WeChat pour une communication directe avec notre équipe en Chine.', link: null, linkText: 'ID WeChat : JackHousePlus', color: 'blue' },
      ],
      hoursTitle: 'Heures d\'Ouverture',
      hours: [
        { day: 'Lundi – Vendredi', time: '9h00 – 18h00 (GMT+8)' },
        { day: 'Samedi', time: '9h00 – 13h00 (GMT+8)' },
        { day: 'Dimanche', time: 'Fermé' },
      ],
      supportTypesTitle: 'Comment Nous Vous Soutenons',
      supportTypes: [
        { icon: '📦', title: 'Support de Commande', desc: 'Assistance pour la passation de commandes, le suivi, les modifications et la coordination de livraison.' },
        { icon: '🔧', title: 'Assistance Technique', desc: 'Spécifications de produits, guides d\'installation, support de dépannage et documentation technique en plusieurs langues.' },
        { icon: '🛡️', title: 'Garantie et Après-Vente', desc: 'Tous les produits HousePlus sont livrés avec une garantie de 12 à 24 mois. Nous traitons les réclamations de garantie et l\'approvisionnement en pièces détachées.' },
        { icon: '📋', title: 'Support de Documentation', desc: 'Assistance avec les certificats d\'origine, les listes de colisage, les factures commerciales et autres documents douaniers.' },
        { icon: '🎨', title: 'Consultation OEM/ODM', desc: 'Conseils d\'experts sur le développement de produits personnalisés, l\'image de marque et la fabrication en marque privée.' },
        { icon: '🌍', title: 'Orientation du Marché Régional', desc: 'Conseils sur la sélection de produits, les exigences réglementaires et les stratégies d\'entrée sur le marché.' },
      ],
      faqTitle: 'Questions Fréquemment Posées',
      faqs: [
        { q: 'Quelle est la quantité minimale de commande (MOQ) pour le gros?', a: 'Notre MOQ standard commence à 100 unités par ligne de produits. Contactez-nous pour discuter de vos besoins spécifiques.' },
        { q: 'Combien de temps prend l\'expédition?', a: 'Le délai standard est de 20 à 35 jours pour le fret maritime après confirmation de commande. Des options de fret aérien sont disponibles pour les commandes urgentes (7-14 jours).' },
        { q: 'Fournissez-vous des échantillons de produits?', a: 'Oui, nous fournissons des échantillons de produits pour évaluation. Des frais d\'échantillon s\'appliquent et sont généralement remboursables lors d\'une commande en vrac.' },
        { q: 'Quelles certifications vos produits portent-ils?', a: 'Nos produits portent les certifications CE, FCC, RoHS et ISO 9001:2015. La documentation complète est fournie avec chaque commande.' },
        { q: 'Puis-je visiter votre usine?', a: 'Oui, nous accueillons les visites d\'usine des acheteurs sérieux. Veuillez nous contacter à l\'avance pour planifier votre visite.' },
        { q: 'Quelles conditions de paiement proposez-vous?', a: 'Nous acceptons T/T (virement bancaire), L/C (Lettre de Crédit) et Western Union. Les conditions standard sont 30% d\'acompte et 70% avant expédition.' },
      ],
      ctaTitle: 'Prêt à Passer une Commande?',
      ctaDesc: 'Contactez notre équipe commerciale dès aujourd\'hui pour discuter de vos besoins en gros, demander un catalogue de produits ou obtenir un devis personnalisé.',
    },
    ar: {
      title: 'مركز دعم العملاء',
      subtitle: 'نحن هنا لمساعدتك على النجاح. فريق الدعم المخصص لدينا متاح 6 أيام في الأسبوع لمساعدتك في جميع احتياجات الجملة الخاصة بك.',
      contactTitle: 'تواصل مع فريقنا',
      contactChannels: [
        { icon: '📧', title: 'دعم البريد الإلكتروني', value: 'jack@houseplus-ch.com', desc: 'أرسل لنا استفسارك وسنرد خلال 24 ساعة في أيام العمل.', link: 'mailto:jack@houseplus-ch.com', linkText: 'إرسال بريد إلكتروني', color: 'blue' },
        { icon: '💬', title: 'واتساب (الصين)', value: '9543 7811 155 86+', desc: 'تحدث مباشرة مع فريق المبيعات لدينا عبر واتساب.', link: 'https://wa.me/8615578119543', linkText: 'فتح واتساب', color: 'green' },
        { icon: '💬', title: 'واتساب (نيجيريا)', value: '80738 9078 234+', desc: 'فريقنا الإقليمي في أفريقيا متاح لمساعدة المشترين النيجيريين وغرب أفريقيا.', link: 'https://wa.me/2349078080738', linkText: 'فتح واتساب', color: 'green' },
        { icon: '🔵', title: 'وي تشات', value: 'JackHousePlus', desc: 'أضف معرف WeChat الخاص بنا للتواصل المباشر مع فريقنا في الصين.', link: null, linkText: 'معرف WeChat: JackHousePlus', color: 'blue' },
      ],
      hoursTitle: 'ساعات العمل',
      hours: [
        { day: 'الاثنين – الجمعة', time: '9:00 صباحًا – 6:00 مساءً (GMT+8)' },
        { day: 'السبت', time: '9:00 صباحًا – 1:00 ظهرًا (GMT+8)' },
        { day: 'الأحد', time: 'مغلق' },
      ],
      supportTypesTitle: 'كيف ندعمك',
      supportTypes: [
        { icon: '📦', title: 'دعم الطلبات', desc: 'المساعدة في تقديم الطلبات والتتبع والتعديلات وتنسيق التسليم.' },
        { icon: '🔧', title: 'المساعدة التقنية', desc: 'مواصفات المنتج وأدلة التثبيت ودعم استكشاف الأخطاء والوثائق التقنية بلغات متعددة.' },
        { icon: '🛡️', title: 'الضمان وما بعد البيع', desc: 'تأتي جميع منتجات HousePlus بضمان 12-24 شهرًا. نتعامل مع مطالبات الضمان وتوريد قطع الغيار.' },
        { icon: '📋', title: 'دعم التوثيق', desc: 'المساعدة في شهادات المنشأ وقوائم التعبئة والفواتير التجارية وغيرها من وثائق الجمارك.' },
        { icon: '🎨', title: 'استشارة OEM/ODM', desc: 'إرشادات خبراء حول تطوير المنتجات المخصصة والعلامة التجارية وتصنيع العلامة الخاصة.' },
        { icon: '🌍', title: 'توجيه السوق الإقليمي', desc: 'المشورة بشأن اختيار المنتجات والمتطلبات التنظيمية واستراتيجيات دخول السوق.' },
      ],
      faqTitle: 'الأسئلة الشائعة',
      faqs: [
        { q: 'ما هو الحد الأدنى لكمية الطلب (MOQ) للجملة؟', a: 'يبدأ MOQ القياسي لدينا من 100 وحدة لكل خط منتج. تواصل معنا لمناقشة متطلباتك المحددة.' },
        { q: 'كم يستغرق الشحن؟', a: 'وقت التسليم القياسي هو 20-35 يومًا للشحن البحري بعد تأكيد الطلب. خيارات الشحن الجوي متاحة للطلبات العاجلة (7-14 يومًا).' },
        { q: 'هل تقدمون عينات من المنتجات؟', a: 'نعم، نقدم عينات من المنتجات للتقييم. تُطبق رسوم العينات وعادةً ما تكون قابلة للاسترداد عند تقديم طلب بالجملة.' },
        { q: 'ما الشهادات التي تحملها منتجاتكم؟', a: 'تحمل منتجاتنا شهادات CE وFCC وRoHS وISO 9001:2015. يتم تقديم الوثائق الكاملة مع كل طلب.' },
        { q: 'هل يمكنني زيارة مصنعكم؟', a: 'نعم، نرحب بزيارات المصنع من المشترين الجادين. يرجى التواصل معنا مسبقًا لتحديد موعد زيارتك.' },
        { q: 'ما شروط الدفع التي تقدمونها؟', a: 'نقبل T/T (تحويل مصرفي) وL/C (خطاب اعتماد) وWestern Union. الشروط القياسية هي دفعة أولى 30% و70% قبل الشحن.' },
      ],
      ctaTitle: 'هل أنت مستعد لتقديم طلب؟',
      ctaDesc: 'تواصل مع فريق المبيعات لدينا اليوم لمناقشة متطلبات الجملة الخاصة بك أو طلب كتالوج المنتجات أو الحصول على عرض سعر مخصص.',
    },
  };

  const data = content[lang] || content.en;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl opacity-90 max-w-3xl">{data.subtitle}</p>
        </div>
      </section>

      {/* Support Banner Image */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=500&fit=crop"
              alt="HousePlus customer support team ready to assist wholesale buyers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-blue-900/20" />
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">{data.contactTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.contactChannels.map((channel: any, idx: number) => (
              <div key={idx} className={`bg-${channel.color === 'green' ? 'green' : 'blue'}-50 border-2 border-${channel.color === 'green' ? 'green' : 'blue'}-200 p-6 rounded-xl text-center`}>
                <div className="text-4xl mb-3">{channel.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{channel.title}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-2">{channel.value}</p>
                <p className="text-sm text-slate-600 mb-4">{channel.desc}</p>
                {channel.link ? (
                  <a
                    href={channel.link}
                    target={channel.link.startsWith('http') ? '_blank' : undefined}
                    rel={channel.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`inline-block px-4 py-2 bg-${channel.color === 'green' ? 'green' : 'blue'}-600 text-white rounded-lg text-sm font-semibold hover:bg-${channel.color === 'green' ? 'green' : 'blue'}-700 transition`}
                  >
                    {channel.linkText}
                  </a>
                ) : (
                  <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold">
                    {channel.linkText}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-8 text-slate-900">{data.hoursTitle}</h2>
              <div className="space-y-4">
                {data.hours.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-semibold text-slate-700">{item.day}</span>
                    <span className={`text-sm px-3 py-1 rounded-full ${item.time === 'Closed' || item.time === 'Cerrado' || item.time === 'Geschlossen' || item.time === 'Fermé' || item.time === 'مغلق' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"
                alt="HousePlus office environment - professional customer support workspace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">{data.supportTypesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.supportTypes.map((type: any, idx: number) => (
              <div key={idx} className="bg-white border-2 border-blue-100 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{type.title}</h3>
                <p className="text-slate-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">{data.faqTitle}</h2>
          <div className="space-y-6">
            {data.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-slate-900">Q: {faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{data.ctaTitle}</h2>
          <p className="text-xl opacity-90 mb-8">{data.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {lang === 'en' && 'Contact Sales Team'}
              {lang === 'es' && 'Contactar Equipo de Ventas'}
              {lang === 'de' && 'Vertriebsteam kontaktieren'}
              {lang === 'fr' && 'Contacter l\'équipe commerciale'}
              {lang === 'ar' && 'اتصل بفريق المبيعات'}
            </Link>
            <a
              href="https://wa.me/8615578119543"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              WhatsApp: +86 155 7811 9543
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

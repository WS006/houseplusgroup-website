import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo-utils';

const validLangs = ['en', 'es', 'de', 'fr', 'ar'];

export const dynamicParams = false;

export function generateStaticParams() {
  return validLangs.map((lang) => ({ lang }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  const titles: Record<string, string> = {
    en: 'Privacy Policy - HousePlus',
    es: 'Política de Privacidad - HousePlus',
    de: 'Datenschutzrichtlinie - HousePlus',
    fr: 'Politique de Confidentialité - HousePlus',
    ar: 'سياسة الخصوصية - HousePlus',
  };

  const descriptions: Record<string, string> = {
    en: 'HousePlus privacy policy for wholesale buyers. GDPR compliant data handling. 16 years trusted manufacturer. 441+ clients across 53+ countries. Secure inquiry and order processing from ISO 9001 certified 20,000 m² facility.',
    es: 'Política de Privacidad de HousePlus - Aprenda cómo recopilamos, usamos y protegemos su información personal.',
    de: 'HousePlus Datenschutzrichtlinie - Erfahren Sie, wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.',
    fr: 'Politique de Confidentialité de HousePlus - Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles.',
    ar: 'سياسة خصوصية HousePlus - تعرف على كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.',
  };

  const seoMetadata = generateSEOMetadata({
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['privacy policy', 'GDPR', 'data protection', 'HousePlus privacy'],
    url: `/${lang}/privacy`,
    lang: lang as any,
    type: 'website',
  });

  return {
    ...seoMetadata,
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;

  const content: Record<string, any> = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 15, 2025',
      intro: 'HousePlus Group ("HousePlus", "we", "us", or "our") is committed to protecting your privacy. With 16 years of trusted manufacturing experience, 441+ wholesale clients across 53+ countries, and ISO 9001 certified 20,000 m² facilities, we handle all inquiry and order data securely and in full GDPR compliance. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.houseplus-ch.com or engage with our wholesale business services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.',
      sections: [
        {
          title: '1. Information We Collect',
          content: `We may collect information about you in a variety of ways. The information we may collect on the Site includes:

**Personal Data:** Personally identifiable information, such as your name, company name, email address, telephone number, country of residence, and business registration details, that you voluntarily give to us when you register with the Site, submit an inquiry form, or when you choose to participate in various activities related to the Site, such as online chat, requesting product samples, or submitting wholesale inquiries.

**Business Information:** Information about your company, including company size, annual purchasing volume, product categories of interest, target markets, and trade references, which you provide when establishing a wholesale account with HousePlus.

**Derivative Data:** Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.

**Financial Data:** Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, or request information about our services. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly with questions.`,
        },
        {
          title: '2. Use of Your Information',
          content: `Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:

- Create and manage your wholesale account
- Process your orders and manage your transactions
- Send you product catalogs, price lists, and promotional materials (with your consent)
- Respond to your inquiries and provide customer support
- Notify you about updates to our product range, pricing, and company news
- Monitor and analyze usage and trends to improve your experience with the Site
- Perform other business activities as needed
- Comply with legal obligations and resolve disputes
- Prevent fraudulent transactions and monitor against theft
- Request feedback and contact you about your use of the Site

We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described in this Privacy Policy.`,
        },
        {
          title: '3. Disclosure of Your Information',
          content: `We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

**By Law or to Protect Rights:** If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

**Third-Party Service Providers:** We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.

**Business Partners:** We may share your information with our business partners, including freight forwarders, customs agents, and logistics providers, to fulfill your orders and provide related services.

**Business Transfers:** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.

**International Transfers:** As HousePlus operates globally, your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.`,
        },
        {
          title: '4. Security of Your Information',
          content: `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information. We recommend that you use strong passwords, keep your login credentials confidential, and notify us immediately if you suspect any unauthorized access to your account.`,
        },
        {
          title: '5. Policy for Children',
          content: `We do not knowingly solicit information from or market to children under the age of 18. If you become aware of any data we have collected from children under age 18, please contact us using the contact information provided below. HousePlus services are intended for business-to-business (B2B) wholesale transactions and are not directed at individuals under 18 years of age.`,
        },
        {
          title: '6. Cookies and Tracking Technologies',
          content: `We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.

We use the following types of cookies:
- **Essential Cookies:** Required for the operation of our website
- **Analytics Cookies:** Help us understand how visitors interact with our website
- **Marketing Cookies:** Used to track visitors across websites for marketing purposes
- **Preference Cookies:** Enable the website to remember your preferences and settings`,
        },
        {
          title: '7. Your Rights Under GDPR',
          content: `If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). HousePlus aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.

If you wish to be informed about what Personal Data we hold about you and if you want it to be removed from our systems, please contact us. In certain circumstances, you have the following data protection rights:

- **Right to Access:** You have the right to request copies of your personal data
- **Right to Rectification:** You have the right to request that we correct any information you believe is inaccurate
- **Right to Erasure:** You have the right to request that we erase your personal data, under certain conditions
- **Right to Restrict Processing:** You have the right to request that we restrict the processing of your personal data
- **Right to Data Portability:** You have the right to request that we transfer the data we have collected to another organization, or directly to you
- **Right to Object:** You have the right to object to our processing of your personal data`,
        },
        {
          title: '8. Changes to This Privacy Policy',
          content: `We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.`,
        },
        {
          title: '9. Contact Us',
          content: `If you have questions or comments about this Privacy Policy, please contact us at:

**HousePlus Group**
Email: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Alternative Phone: +234 9078080738 (Nigeria)

Business Hours: Monday – Friday: 9:00 AM – 6:00 PM (GMT+8)
Saturday: 9:00 AM – 1:00 PM (GMT+8)

We will respond to your inquiry within 2 business days.`,
        },
      ],
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última Actualización: 15 de enero de 2025',
      intro: 'HousePlus Group ("HousePlus", "nosotros", "nos" o "nuestro") está comprometido a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web www.houseplus-ch.com o se relaciona con nuestros servicios de negocios mayoristas.',
      sections: [
        {
          title: '1. Información que Recopilamos',
          content: `Podemos recopilar información sobre usted de diversas maneras. La información que podemos recopilar en el Sitio incluye:

**Datos Personales:** Información de identificación personal, como su nombre, nombre de empresa, dirección de correo electrónico, número de teléfono, país de residencia y detalles de registro comercial, que usted nos proporciona voluntariamente cuando se registra en el Sitio o envía una consulta.

**Información Comercial:** Información sobre su empresa, incluido el tamaño de la empresa, el volumen de compras anual, las categorías de productos de interés y los mercados objetivo.

**Datos Derivados:** Información que nuestros servidores recopilan automáticamente cuando accede al Sitio, como su dirección IP, tipo de navegador y sistema operativo.`,
        },
        {
          title: '2. Uso de su Información',
          content: `Podemos usar la información recopilada sobre usted a través del Sitio para crear y administrar su cuenta mayorista, procesar sus pedidos, enviarle catálogos de productos y materiales promocionales, responder a sus consultas, y cumplir con las obligaciones legales.`,
        },
        {
          title: '3. Seguridad de su Información',
          content: `Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información personal. Si bien hemos tomado medidas razonables para asegurar la información personal que nos proporciona, tenga en cuenta que ninguna medida de seguridad es perfecta o impenetrable.`,
        },
        {
          title: '4. Sus Derechos bajo el RGPD',
          content: `Si es residente del Espacio Económico Europeo (EEE), tiene ciertos derechos de protección de datos bajo el Reglamento General de Protección de Datos (RGPD), incluyendo el derecho de acceso, rectificación, supresión, restricción del procesamiento y portabilidad de datos.`,
        },
        {
          title: '5. Contáctenos',
          content: `Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:

**HousePlus Group**
Email: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Teléfono alternativo: +234 9078080738 (Nigeria)

Horario de atención: Lunes – Viernes: 9:00 AM – 6:00 PM (GMT+8)`,
        },
      ],
    },
    de: {
      title: 'Datenschutzrichtlinie',
      lastUpdated: 'Zuletzt aktualisiert: 15. Januar 2025',
      intro: 'HousePlus Group ("HousePlus", "wir", "uns" oder "unser") ist verpflichtet, Ihre Privatsphäre zu schützen. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unsere Website www.houseplus-ch.com besuchen oder unsere Großhandelsdienstleistungen in Anspruch nehmen.',
      sections: [
        {
          title: '1. Informationen, die wir sammeln',
          content: `Wir können Informationen über Sie auf verschiedene Arten sammeln. Zu den Informationen, die wir auf der Website sammeln können, gehören:

**Persönliche Daten:** Persönlich identifizierbare Informationen wie Ihr Name, Firmenname, E-Mail-Adresse, Telefonnummer, Wohnsitzland und Geschäftsregistrierungsdetails.

**Geschäftsinformationen:** Informationen über Ihr Unternehmen, einschließlich Unternehmensgröße, jährliches Einkaufsvolumen und Produktkategorien von Interesse.

**Abgeleitete Daten:** Informationen, die unsere Server automatisch sammeln, wenn Sie auf die Website zugreifen, wie Ihre IP-Adresse und Ihren Browsertyp.`,
        },
        {
          title: '2. Verwendung Ihrer Informationen',
          content: `Wir können die über Sie gesammelten Informationen verwenden, um Ihr Großhandelskonto zu erstellen und zu verwalten, Ihre Bestellungen zu verarbeiten, Ihnen Produktkataloge und Werbematerialien zu senden, auf Ihre Anfragen zu antworten und rechtliche Verpflichtungen zu erfüllen.`,
        },
        {
          title: '3. Sicherheit Ihrer Informationen',
          content: `Wir verwenden administrative, technische und physische Sicherheitsmaßnahmen, um Ihre persönlichen Informationen zu schützen. Obwohl wir angemessene Schritte unternommen haben, sind keine Sicherheitsmaßnahmen perfekt oder undurchdringlich.`,
        },
        {
          title: '4. Ihre Rechte unter der DSGVO',
          content: `Wenn Sie im Europäischen Wirtschaftsraum (EWR) ansässig sind, haben Sie bestimmte Datenschutzrechte gemäß der Datenschutz-Grundverordnung (DSGVO), einschließlich des Rechts auf Zugang, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit.`,
        },
        {
          title: '5. Kontaktieren Sie uns',
          content: `Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns unter:

**HousePlus Group**
E-Mail: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Alternatives Telefon: +234 9078080738 (Nigeria)

Geschäftszeiten: Montag – Freitag: 9:00 – 18:00 Uhr (GMT+8)`,
        },
      ],
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdated: 'Dernière mise à jour : 15 janvier 2025',
      intro: 'HousePlus Group ("HousePlus", "nous", "notre" ou "nos") s\'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web www.houseplus-ch.com ou utilisez nos services de commerce de gros.',
      sections: [
        {
          title: '1. Informations que nous collectons',
          content: `Nous pouvons collecter des informations vous concernant de diverses manières. Les informations que nous pouvons collecter sur le Site comprennent:

**Données Personnelles:** Des informations personnellement identifiables, telles que votre nom, nom de société, adresse e-mail, numéro de téléphone, pays de résidence et détails d'enregistrement commercial.

**Informations Commerciales:** Des informations sur votre entreprise, y compris la taille de l'entreprise, le volume d'achats annuel et les catégories de produits d'intérêt.

**Données Dérivées:** Des informations que nos serveurs collectent automatiquement lorsque vous accédez au Site, telles que votre adresse IP et le type de navigateur.`,
        },
        {
          title: '2. Utilisation de vos informations',
          content: `Nous pouvons utiliser les informations collectées vous concernant via le Site pour créer et gérer votre compte de gros, traiter vos commandes, vous envoyer des catalogues de produits et des matériaux promotionnels, répondre à vos demandes et respecter les obligations légales.`,
        },
        {
          title: '3. Sécurité de vos informations',
          content: `Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables, aucune mesure de sécurité n'est parfaite ou impénétrable.`,
        },
        {
          title: '4. Vos droits en vertu du RGPD',
          content: `Si vous résidez dans l'Espace économique européen (EEE), vous disposez de certains droits de protection des données en vertu du Règlement général sur la protection des données (RGPD), notamment le droit d'accès, de rectification, d'effacement, de restriction du traitement et de portabilité des données.`,
        },
        {
          title: '5. Contactez-nous',
          content: `Si vous avez des questions sur cette Politique de Confidentialité, veuillez nous contacter à:

**HousePlus Group**
E-mail : jack@houseplus-ch.com
WhatsApp : +86 155 7811 9543
WeChat : JackHousePlus
Téléphone alternatif : +234 9078080738 (Nigeria)

Heures d'ouverture : Lundi – Vendredi : 9h00 – 18h00 (GMT+8)`,
        },
      ],
    },
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث: 15 يناير 2025',
      intro: 'تلتزم HousePlus Group ("HousePlus" أو "نحن" أو "لنا" أو "خاصتنا") بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وإفصاحنا وحمايتنا لمعلوماتك عند زيارة موقعنا الإلكتروني www.houseplus-ch.com أو التعامل مع خدمات أعمال الجملة الخاصة بنا.',
      sections: [
        {
          title: '1. المعلومات التي نجمعها',
          content: `قد نجمع معلومات عنك بطرق متنوعة. تشمل المعلومات التي قد نجمعها على الموقع:

**البيانات الشخصية:** معلومات تعريفية شخصية مثل اسمك واسم شركتك وعنوان بريدك الإلكتروني ورقم هاتفك وبلد إقامتك وتفاصيل تسجيل الأعمال.

**معلومات الأعمال:** معلومات حول شركتك، بما في ذلك حجم الشركة وحجم المشتريات السنوي وفئات المنتجات محل الاهتمام.

**البيانات المشتقة:** المعلومات التي تجمعها خوادمنا تلقائيًا عند وصولك إلى الموقع، مثل عنوان IP الخاص بك ونوع المتصفح.`,
        },
        {
          title: '2. استخدام معلوماتك',
          content: `قد نستخدم المعلومات المجمعة عنك عبر الموقع لإنشاء وإدارة حساب الجملة الخاص بك، ومعالجة طلباتك، وإرسال كتالوجات المنتجات والمواد الترويجية، والرد على استفساراتك، والامتثال للالتزامات القانونية.`,
        },
        {
          title: '3. أمان معلوماتك',
          content: `نستخدم تدابير أمنية إدارية وتقنية ومادية للمساعدة في حماية معلوماتك الشخصية. على الرغم من أننا اتخذنا خطوات معقولة، لا توجد تدابير أمنية مثالية أو منيعة.`,
        },
        {
          title: '4. حقوقك بموجب اللائحة العامة لحماية البيانات',
          content: `إذا كنت مقيمًا في المنطقة الاقتصادية الأوروبية، فلديك حقوق معينة لحماية البيانات بموجب اللائحة العامة لحماية البيانات (GDPR)، بما في ذلك حق الوصول والتصحيح والمسح وتقييد المعالجة وقابلية نقل البيانات.`,
        },
        {
          title: '5. اتصل بنا',
          content: `إذا كانت لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:

**HousePlus Group**
البريد الإلكتروني: jack@houseplus-ch.com
واتساب: 9543 7811 155 86+
وي تشات: JackHousePlus
هاتف بديل: 80738 9078 234+ (نيجيريا)

ساعات العمل: الاثنين – الجمعة: 9:00 صباحًا – 6:00 مساءً (GMT+8)`,
        },
      ],
    },
  };

  const data = content[lang] || content.en;
  const additionalSections: Record<string, any[]> = {
    es: [
      { title: '3. Divulgación de su información', content: `Podemos compartir información en circunstancias concretas:

**Por ley o para proteger derechos:** cuando sea necesario para atender un procedimiento legal, investigar infracciones de políticas o proteger derechos, bienes y seguridad.

**Proveedores de servicios y socios comerciales:** podemos compartir datos con proveedores que prestan procesamiento de pagos, análisis, correo electrónico, alojamiento, atención al cliente o asistencia de marketing, y con transitarios, agentes de aduana y operadores logísticos para cumplir pedidos.

**Transferencias empresariales e internacionales:** los datos pueden transferirse en relación con una fusión, venta, financiación o adquisición. Como operamos globalmente, también pueden procesarse fuera de su país, donde las leyes de protección de datos pueden ser distintas.` },
      { title: '5. Política para menores', content: 'No solicitamos deliberadamente información de menores de 18 años ni dirigimos marketing a ellos. Si conoce datos que hayamos recopilado de un menor de 18 años, contáctenos usando los datos indicados abajo. Los servicios HousePlus están destinados a transacciones mayoristas B2B y no se dirigen a menores.' },
      { title: '6. Cookies y tecnologías de seguimiento', content: `Podemos utilizar cookies, balizas web, píxeles de seguimiento y tecnologías similares para personalizar el sitio y mejorar su experiencia. Puede eliminar o rechazar cookies en su navegador, aunque ello puede afectar la disponibilidad o funcionalidad del sitio.

Utilizamos **cookies esenciales** para operar el sitio, **cookies analíticas** para comprender la interacción de visitantes, **cookies de marketing** para fines promocionales y **cookies de preferencias** para recordar ajustes.` },
      { title: '8. Cambios en esta Política de Privacidad', content: 'Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas o por motivos operativos, legales o regulatorios. Publicaremos la nueva política en esta página y actualizaremos la fecha de última actualización. Le recomendamos revisarla periódicamente.' },
    ],
    de: [
      { title: '3. Weitergabe Ihrer Informationen', content: `Wir können Informationen in bestimmten Situationen weitergeben:

**Aufgrund gesetzlicher Vorgaben oder zum Schutz von Rechten:** wenn dies für Rechtsverfahren, die Untersuchung möglicher Richtlinienverstöße oder den Schutz von Rechten, Eigentum und Sicherheit erforderlich ist.

**Dienstleister und Geschäftspartner:** Daten können mit Dienstleistern für Zahlungsabwicklung, Analyse, E-Mail, Hosting, Kundenservice oder Marketing sowie mit Spediteuren, Zollagenten und Logistikdienstleistern zur Auftragserfüllung geteilt werden.

**Unternehmens- und internationale Übertragungen:** Daten können im Zusammenhang mit Fusionen, Verkäufen, Finanzierungen oder Übernahmen übertragen werden. Da wir global tätig sind, können Daten auch in Ländern verarbeitet werden, deren Datenschutzgesetze abweichen.` },
      { title: '5. Richtlinie für Minderjährige', content: 'Wir fordern wissentlich keine Informationen von Personen unter 18 Jahren an und richten kein Marketing an sie. Falls Sie Kenntnis von Daten erhalten, die wir von Minderjährigen unter 18 Jahren erhoben haben, kontaktieren Sie uns bitte über die unten genannten Angaben. HousePlus-Dienste sind für B2B-Großhandel bestimmt und richten sich nicht an Minderjährige.' },
      { title: '6. Cookies und Tracking-Technologien', content: `Wir können Cookies, Web-Beacons, Tracking-Pixel und ähnliche Technologien einsetzen, um die Website anzupassen und Ihr Nutzungserlebnis zu verbessern. Sie können Cookies in Ihrem Browser entfernen oder ablehnen; dies kann jedoch Verfügbarkeit oder Funktionalität der Website beeinträchtigen.

Wir verwenden **notwendige Cookies** für den Betrieb, **Analyse-Cookies** zum Verständnis der Besucherinteraktion, **Marketing-Cookies** zu Werbezwecken und **Präferenz-Cookies** zum Speichern von Einstellungen.` },
      { title: '8. Änderungen dieser Datenschutzerklärung', content: 'Wir können diese Datenschutzerklärung aktualisieren, um Änderungen unserer Praktiken oder betriebliche, rechtliche bzw. regulatorische Anforderungen widerzuspiegeln. Die neue Erklärung wird auf dieser Seite veröffentlicht und das Aktualisierungsdatum angepasst. Bitte überprüfen Sie die Erklärung regelmäßig.' },
    ],
    fr: [
      { title: '3. Divulgation de vos informations', content: `Nous pouvons partager des informations dans certaines situations :

**En vertu de la loi ou pour protéger des droits :** lorsqu’il est nécessaire de répondre à une procédure légale, d’enquêter sur une violation de nos politiques ou de protéger les droits, les biens et la sécurité.

**Prestataires et partenaires commerciaux :** les données peuvent être partagées avec les prestataires de paiement, d’analyse, d’e-mail, d’hébergement, de service client ou d’assistance marketing, ainsi qu’avec les transitaires, agents en douane et prestataires logistiques pour exécuter les commandes.

**Transferts d’entreprise et internationaux :** les données peuvent être transférées dans le cadre d’une fusion, d’une vente, d’un financement ou d’une acquisition. Notre activité étant mondiale, elles peuvent aussi être traitées dans des pays dont les lois de protection diffèrent.` },
      { title: '5. Politique relative aux mineurs', content: 'Nous ne sollicitons pas sciemment d’informations auprès de personnes de moins de 18 ans et ne leur adressons pas de communications marketing. Si vous avez connaissance de données recueillies auprès d’un mineur, contactez-nous aux coordonnées ci-dessous. Les services HousePlus sont destinés aux transactions B2B de gros et non aux mineurs.' },
      { title: '6. Cookies et technologies de suivi', content: `Nous pouvons utiliser des cookies, balises web, pixels de suivi et technologies similaires afin de personnaliser le site et d’améliorer votre expérience. Vous pouvez supprimer ou refuser les cookies dans votre navigateur, mais cela peut affecter la disponibilité ou les fonctionnalités du site.

Nous utilisons des **cookies essentiels** pour le fonctionnement du site, des **cookies analytiques** pour comprendre les interactions, des **cookies marketing** à des fins promotionnelles et des **cookies de préférences** pour mémoriser vos réglages.` },
      { title: '8. Modifications de cette Politique de Confidentialité', content: 'Nous pouvons mettre à jour cette Politique de Confidentialité afin de refléter l’évolution de nos pratiques ou pour des raisons opérationnelles, légales ou réglementaires. La nouvelle politique sera publiée sur cette page et la date de mise à jour sera modifiée. Nous vous invitons à la consulter régulièrement.' },
    ],
    ar: [
      { title: '3. الإفصاح عن معلوماتك', content: `قد نشارك المعلومات في حالات محددة:

**بموجب القانون أو لحماية الحقوق:** عندما يكون الإفصاح ضرورياً للاستجابة لإجراء قانوني أو التحقيق في انتهاك محتمل لسياساتنا أو حماية الحقوق والممتلكات والسلامة.

**مقدمو الخدمات وشركاء الأعمال:** قد نشارك البيانات مع جهات تعالج المدفوعات أو تقدم التحليلات أو البريد الإلكتروني أو الاستضافة أو خدمة العملاء أو المساعدة التسويقية، ومع وكلاء الشحن والجمارك والخدمات اللوجستية لتنفيذ طلباتك.

**التحويلات التجارية والدولية:** قد تنقل البيانات فيما يتعلق باندماج أو بيع أو تمويل أو استحواذ. وبما أننا نعمل عالمياً، فقد تعالج البيانات في بلدان تختلف قوانين حماية البيانات فيها.` },
      { title: '5. سياسة القاصرين', content: 'لا نطلب عن علم معلومات من أشخاص دون 18 عاماً ولا نسوق لهم. إذا علمت بأننا جمعنا بيانات من شخص دون 18 عاماً، يرجى التواصل معنا باستخدام بيانات الاتصال أدناه. خدمات HousePlus مخصصة لمعاملات الجملة بين الشركات وليست موجهة إلى القاصرين.' },
      { title: '6. ملفات تعريف الارتباط وتقنيات التتبع', content: `قد نستخدم ملفات تعريف الارتباط وإشارات الويب وبكسلات التتبع وتقنيات مشابهة لتخصيص الموقع وتحسين تجربتك. يمكنك إزالة ملفات تعريف الارتباط أو رفضها من المتصفح، لكن ذلك قد يؤثر في توفر الموقع أو وظائفه.

نستخدم **ملفات أساسية** لتشغيل الموقع، و**ملفات تحليلية** لفهم تفاعل الزوار، و**ملفات تسويقية** للأغراض الترويجية، و**ملفات تفضيلات** لتذكر إعداداتك.` },
      { title: '8. التغييرات على سياسة الخصوصية', content: 'قد نحدّث سياسة الخصوصية هذه لتعكس تغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية. سننشر السياسة الجديدة على هذه الصفحة ونحدّث تاريخ آخر تعديل. ننصحك بمراجعتها بصورة دورية.' },
    ],
  };
  const sections = lang === 'en'
    ? data.sections
    : [data.sections[0], data.sections[1], ...(additionalSections[lang]?.slice(0, 1) || []), data.sections[2], ...(additionalSections[lang]?.slice(1, 3) || []), data.sections[3], ...(additionalSections[lang]?.slice(3) || []), data.sections[4]];
  const uiCopy: Record<string, { badge: string; privacyCommitment: string; dataTitle: string; dataBody: string; whatsapp: string }> = {
    en: { badge: '🏭 HousePlus Privacy Policy', privacyCommitment: 'HousePlus is committed to protecting your privacy.', dataTitle: '🏭 HousePlus Privacy & Data Protection', dataBody: 'For questions about how HousePlus handles your data, please contact our privacy team.', whatsapp: 'WhatsApp: +86 155 7811 9543' },
    es: { badge: '🏭 Política de Privacidad de HousePlus', privacyCommitment: 'HousePlus se compromete a proteger su privacidad.', dataTitle: '🏭 Privacidad y Protección de Datos de HousePlus', dataBody: 'Para consultas sobre cómo HousePlus maneja sus datos, contacte con nuestro equipo de privacidad.', whatsapp: 'WhatsApp: +86 155 7811 9543' },
    de: { badge: '🏭 Datenschutzrichtlinie von HousePlus', privacyCommitment: 'HousePlus verpflichtet sich, Ihre Privatsphäre zu schützen.', dataTitle: '🏭 Datenschutz und Datensicherheit bei HousePlus', dataBody: 'Bei Fragen zur Verarbeitung Ihrer Daten durch HousePlus wenden Sie sich bitte an unser Datenschutzteam.', whatsapp: 'WhatsApp: +86 155 7811 9543' },
    fr: { badge: '🏭 Politique de Confidentialité HousePlus', privacyCommitment: 'HousePlus s’engage à protéger votre vie privée.', dataTitle: '🏭 Confidentialité et Protection des Données HousePlus', dataBody: 'Pour toute question sur le traitement de vos données par HousePlus, contactez notre équipe chargée de la confidentialité.', whatsapp: 'WhatsApp : +86 155 7811 9543' },
    ar: { badge: '🏭 سياسة خصوصية HousePlus', privacyCommitment: 'تلتزم HousePlus بحماية خصوصيتك.', dataTitle: '🏭 خصوصية البيانات وحمايتها لدى HousePlus', dataBody: 'للأسئلة حول كيفية تعامل HousePlus مع بياناتك، يرجى التواصل مع فريق الخصوصية لدينا.', whatsapp: 'واتساب: +86 155 7811 9543' },
  };
  const ui = uiCopy[lang] || uiCopy.en;

  // Helper to render markdown-like bold text
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-slate-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-slate-600 leading-relaxed mb-2">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-800">{part}</strong> : part)}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-slate-600 ml-4 list-disc">{line.substring(2)}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-slate-600 leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
              {ui.badge}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">🏭 {data.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{data.lastUpdated}</p>
          <p className="text-lg text-slate-600 leading-relaxed"><strong>HousePlus</strong> {ui.privacyCommitment.replace('HousePlus ', '')} {data.intro}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((section: any, idx: number) => (
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
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">{ui.dataTitle}</h2>
          <p className="text-slate-600 mb-6">{ui.dataBody}</p>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            {lang === 'en' && 'Questions About Our Privacy Policy?'}
            {lang === 'es' && '¿Preguntas Sobre Nuestra Política de Privacidad?'}
            {lang === 'de' && 'Fragen zu unserer Datenschutzrichtlinie?'}
            {lang === 'fr' && 'Questions sur notre Politique de Confidentialité?'}
            {lang === 'ar' && 'أسئلة حول سياسة الخصوصية الخاصة بنا؟'}
          </h2>
          <p className="text-slate-600 mb-6">
            {lang === 'en' && 'Our team is available to answer any questions you may have about how we handle your data.'}
            {lang === 'es' && 'Nuestro equipo está disponible para responder cualquier pregunta que pueda tener sobre cómo manejamos sus datos.'}
            {lang === 'de' && 'Unser Team steht zur Verfügung, um Fragen zu beantworten, die Sie möglicherweise zu unserem Umgang mit Ihren Daten haben.'}
            {lang === 'fr' && 'Notre équipe est disponible pour répondre à toutes les questions que vous pourriez avoir sur la façon dont nous traitons vos données.'}
            {lang === 'ar' && 'فريقنا متاح للإجابة على أي أسئلة قد تكون لديك حول كيفية تعاملنا مع بياناتك.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:jack@houseplus-ch.com"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              jack@houseplus-ch.com
            </a>
            <a
              href="https://wa.me/8615578119543"
              className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {ui.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

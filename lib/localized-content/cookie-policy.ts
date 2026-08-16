export type LegalSection = { title: string; content: string };
export type CookiePolicyCopy = {
  kicker: string; title: string; updated: string; intro: string; sections: LegalSection[];
  relatedTitle: string; relatedDescription: string; privacy: string; terms: string;
};

export const cookiePolicyLocales: Record<string, CookiePolicyCopy> = {
  es: {
    kicker: 'Información legal de HousePlus', title: 'Política de Cookies', updated: 'Última actualización: 15 de enero de 2025',
    intro: 'Esta Política de Cookies explica cómo HousePlus Group utiliza cookies y tecnologías de seguimiento similares cuando visita houseplus-ch.com.',
    sections: [
      { title: '1. ¿Qué son las cookies?', content: 'Las cookies son pequeños archivos de texto que se colocan en su dispositivo (ordenador, tableta o móvil) al visitar un sitio web. Ayudan a que los sitios funcionen de forma eficiente, mejoran la navegación y proporcionan información estadística sobre los visitantes. Por sí solas, no contienen información que permita identificarle personalmente.' },
      { title: '2. Cómo utiliza HousePlus las cookies', content: `HousePlus utiliza cookies en houseplus-ch.com para los siguientes fines:

**Cookies esenciales:** Son necesarias para el funcionamiento del sitio y habilitan seguridad, navegación y acceso a zonas protegidas. Sin ellas el sitio no puede funcionar correctamente.

**Cookies analíticas:** Utilizamos herramientas como Google Analytics para comprender las páginas visitadas, el tiempo de permanencia y el contenido más consultado. Los datos son agregados y anónimos.

**Cookies de preferencias:** Recuerdan su idioma, región y preferencias de visualización.

**Cookies de marketing:** Podemos usarlas para medir campañas, seguir visitantes entre sitios y mostrar publicidad relevante. Solo utilizamos proveedores externos de confianza.` },
      { title: '3. Cookies de terceros', content: `Los servicios de terceros mostrados en nuestro sitio pueden establecer sus propias cookies, incluidos:

- **Google Analytics:** análisis del tráfico y comportamiento de usuarios
- **Cloudflare:** seguridad, rendimiento y protección DDoS
- **Storyblok:** cookies funcionales relacionadas con la entrega de contenidos

No controlamos estas cookies de terceros. Consulte la política de privacidad de cada proveedor para conocer cómo las utiliza.` },
      { title: '4. Gestión y desactivación de cookies', content: `Puede aceptar o rechazar las cookies. La mayoría de los navegadores las aceptan automáticamente, pero puede modificar su configuración para rechazarlas.

**Configuración del navegador:** En Configuración, Privacidad o Seguridad puede ver las cookies guardadas, eliminar una o todas, bloquear sitios concretos o bloquear todas las cookies. El bloqueo total puede afectar al funcionamiento del sitio.

**Herramientas de exclusión:** Para Google Analytics puede instalar el complemento disponible en tools.google.com/dlpage/gaoptout.

La desactivación de ciertas cookies puede afectar al sitio. Las cookies esenciales no pueden desactivarse porque son necesarias para su funcionamiento básico.` },
      { title: '5. Plazos de conservación', content: `Las cookies tienen diferentes plazos de conservación:

- **Cookies de sesión:** se eliminan al cerrar el navegador
- **Cookies analíticas:** normalmente se conservan entre 12 y 13 meses
- **Cookies de preferencias:** hasta 12 meses
- **Cookies de marketing:** normalmente entre 30 y 90 días

Puede eliminar cookies en cualquier momento desde la configuración de su navegador.` },
      { title: '6. Actualizaciones de esta política', content: 'Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies utilizadas o por razones operativas, legales o regulatorias. Revise esta página periódicamente. La fecha superior indica la última actualización.' },
      { title: '7. Contacto', content: `Si tiene preguntas sobre nuestro uso de cookies, contáctenos:

**HousePlus Group**
Correo electrónico: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Horario comercial: lunes a sábado, 9:00–18:00 (GMT+8)` },
    ],
    relatedTitle: 'Políticas relacionadas', relatedDescription: 'Para más información sobre cómo HousePlus trata sus datos, consulte nuestras políticas relacionadas.', privacy: 'Política de Privacidad', terms: 'Términos de Servicio',
  },
  de: {
    kicker: 'Rechtliche Hinweise von HousePlus', title: 'Cookie-Richtlinie', updated: 'Zuletzt aktualisiert: 15. Januar 2025',
    intro: 'Diese Cookie-Richtlinie erläutert, wie die HousePlus Group Cookies und ähnliche Tracking-Technologien verwendet, wenn Sie houseplus-ch.com besuchen.',
    sections: [
      { title: '1. Was sind Cookies?', content: 'Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät (Computer, Tablet oder Mobiltelefon) gespeichert werden. Sie helfen Websites, effizient zu funktionieren, verbessern die Nutzung und liefern Websitebetreibern statistische Besucherinformationen. Cookies enthalten für sich genommen keine personenbezogenen Identifikationsdaten.' },
      { title: '2. Wie HousePlus Cookies verwendet', content: `HousePlus verwendet Cookies auf houseplus-ch.com für folgende Zwecke:

**Notwendige Cookies:** Sie sind für den Betrieb der Website erforderlich und ermöglichen Sicherheit, Navigation sowie den Zugang zu geschützten Bereichen. Ohne sie kann die Website nicht ordnungsgemäß funktionieren.

**Analyse-Cookies:** Mit Werkzeugen wie Google Analytics verstehen wir besuchte Seiten, Verweildauer und beliebte Inhalte. Die Daten werden aggregiert und anonym erhoben.

**Präferenz-Cookies:** Sie speichern Ihre Sprache, Region und Anzeigeeinstellungen.

**Marketing-Cookies:** Wir können sie zur Messung von Marketingmaßnahmen, für websiteübergreifendes Tracking und relevante Werbung einsetzen. Dabei nutzen wir nur vertrauenswürdige Drittanbieter.` },
      { title: '3. Cookies von Drittanbietern', content: `Auf unserer Website angezeigte Dienste Dritter können eigene Cookies setzen, einschließlich:

- **Google Analytics:** Analyse von Websiteverkehr und Nutzerverhalten
- **Cloudflare:** Sicherheit, Leistungsoptimierung und DDoS-Schutz
- **Storyblok:** funktionale Cookies zur Inhaltsbereitstellung

Wir kontrollieren Drittanbieter-Cookies nicht. Bitte informieren Sie sich in den Datenschutzerklärungen der jeweiligen Anbieter über deren Cookie-Nutzung.` },
      { title: '4. Cookies verwalten und deaktivieren', content: `Sie können Cookies akzeptieren oder ablehnen. Die meisten Browser akzeptieren sie automatisch, aber Sie können die Browsereinstellungen ändern.

**Browsereinstellungen:** Unter Einstellungen, Datenschutz oder Sicherheit können Sie gespeicherte Cookies anzeigen, einzelne oder alle Cookies löschen, Cookies bestimmter Websites oder alle Cookies blockieren. Eine vollständige Blockierung kann Websitefunktionen beeinträchtigen.

**Opt-out-Tools:** Für Google Analytics ist das Deaktivierungs-Add-on unter tools.google.com/dlpage/gaoptout verfügbar.

Das Deaktivieren bestimmter Cookies kann die Websitefunktion beeinträchtigen. Notwendige Cookies können nicht deaktiviert werden, da sie für den Grundbetrieb erforderlich sind.` },
      { title: '5. Speicherdauer von Cookies', content: `Cookies haben unterschiedliche Speicherdauern:

- **Sitzungs-Cookies:** werden beim Schließen des Browsers gelöscht
- **Analyse-Cookies:** werden normalerweise 12–13 Monate gespeichert
- **Präferenz-Cookies:** bis zu 12 Monate
- **Marketing-Cookies:** normalerweise 30–90 Tage

Sie können Cookies jederzeit in den Browsereinstellungen löschen.` },
      { title: '6. Aktualisierungen dieser Richtlinie', content: 'Wir können diese Cookie-Richtlinie wegen Änderungen unserer Cookies oder aus betrieblichen, rechtlichen oder regulatorischen Gründen aktualisieren. Bitte besuchen Sie diese Seite regelmäßig. Das Datum am Anfang zeigt die letzte Aktualisierung an.' },
      { title: '7. Kontakt', content: `Bei Fragen zu unserer Cookie-Nutzung kontaktieren Sie uns bitte:

**HousePlus Group**
E-Mail: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Geschäftszeiten: Montag – Samstag, 9:00–18:00 Uhr (GMT+8)` },
    ],
    relatedTitle: 'Verwandte Richtlinien', relatedDescription: 'Weitere Informationen zur Verarbeitung Ihrer Daten durch HousePlus finden Sie in unseren verwandten Richtlinien.', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen',
  },
  fr: {
    kicker: 'Informations juridiques HousePlus', title: 'Politique de Cookies', updated: 'Dernière mise à jour : 15 janvier 2025',
    intro: 'Cette Politique de Cookies explique comment HousePlus Group utilise des cookies et technologies de suivi similaires lorsque vous consultez houseplus-ch.com.',
    sections: [
      { title: '1. Que sont les cookies ?', content: 'Les cookies sont de petits fichiers texte déposés sur votre appareil (ordinateur, tablette ou téléphone mobile) lorsque vous consultez un site. Ils aident les sites à fonctionner efficacement, améliorent la navigation et fournissent aux propriétaires des informations statistiques sur les visiteurs. Ils ne contiennent pas, à eux seuls, de données permettant de vous identifier personnellement.' },
      { title: '2. Utilisation des cookies par HousePlus', content: `HousePlus utilise des cookies sur houseplus-ch.com aux fins suivantes :

**Cookies essentiels :** Ils sont nécessaires au fonctionnement du site et assurent la sécurité, la navigation et l’accès aux zones sécurisées. Sans eux, le site ne fonctionne pas correctement.

**Cookies analytiques :** Nous utilisons notamment Google Analytics pour comprendre les pages visitées, la durée des visites et les contenus populaires. Les données collectées sont agrégées et anonymes.

**Cookies de préférences :** Ils mémorisent votre langue, votre région et vos préférences d’affichage.

**Cookies marketing :** Nous pouvons les utiliser pour mesurer l’efficacité des campagnes, suivre les visiteurs entre sites et afficher une publicité pertinente. Nous ne faisons appel qu’à des prestataires tiers reconnus.` },
      { title: '3. Cookies tiers', content: `Des services tiers affichés sur notre site peuvent déposer leurs propres cookies, notamment :

- **Google Analytics :** analyse du trafic et du comportement des utilisateurs
- **Cloudflare :** sécurité, optimisation des performances et protection DDoS
- **Storyblok :** cookies fonctionnels liés à la diffusion de contenus

Nous ne contrôlons pas les cookies tiers. Consultez les politiques de confidentialité de chaque fournisseur pour connaître son utilisation des cookies.` },
      { title: '4. Gérer et désactiver les cookies', content: `Vous pouvez accepter ou refuser les cookies. La plupart des navigateurs les acceptent automatiquement, mais vous pouvez modifier leurs paramètres.

**Paramètres du navigateur :** Dans Paramètres, Confidentialité ou Sécurité, vous pouvez voir les cookies enregistrés, supprimer un ou tous les cookies, bloquer certains sites ou tous les cookies. Le blocage total peut affecter le fonctionnement du site.

**Outils d’exclusion :** Pour Google Analytics, vous pouvez installer le module disponible sur tools.google.com/dlpage/gaoptout.

La désactivation de certains cookies peut affecter le site. Les cookies essentiels ne peuvent pas être désactivés car ils sont nécessaires à son fonctionnement de base.` },
      { title: '5. Durées de conservation', content: `Les cookies ont différentes durées de conservation :

- **Cookies de session :** supprimés à la fermeture du navigateur
- **Cookies analytiques :** généralement conservés 12 à 13 mois
- **Cookies de préférences :** jusqu’à 12 mois
- **Cookies marketing :** généralement 30 à 90 jours

Vous pouvez supprimer les cookies à tout moment dans les paramètres du navigateur.` },
      { title: '6. Mises à jour de cette politique', content: 'Nous pouvons mettre à jour cette Politique de Cookies afin de refléter l’évolution des cookies utilisés ou pour des raisons opérationnelles, légales ou réglementaires. Consultez régulièrement cette page. La date en haut indique la dernière mise à jour.' },
      { title: '7. Nous contacter', content: `Pour toute question sur notre utilisation des cookies, contactez-nous :

**HousePlus Group**
E-mail : jack@houseplus-ch.com
WhatsApp : +86 155 7811 9543
WeChat : JackHousePlus
Heures d’ouverture : lundi – samedi, 9:00–18:00 (GMT+8)` },
    ],
    relatedTitle: 'Politiques associées', relatedDescription: 'Pour en savoir plus sur le traitement de vos données par HousePlus, consultez nos politiques associées.', privacy: 'Politique de confidentialité', terms: 'Conditions d’utilisation',
  },
  ar: {
    kicker: 'المعلومات القانونية لدى HousePlus', title: 'سياسة ملفات تعريف الارتباط', updated: 'آخر تحديث: 15 يناير 2025',
    intro: 'توضح سياسة ملفات تعريف الارتباط هذه كيفية استخدام HousePlus Group لملفات تعريف الارتباط وتقنيات التتبع المشابهة عند زيارة houseplus-ch.com.',
    sections: [
      { title: '1. ما هي ملفات تعريف الارتباط؟', content: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة توضع على جهازك، مثل الكمبيوتر أو الجهاز اللوحي أو الهاتف المحمول، عند زيارة موقع ويب. تساعد المواقع على العمل بكفاءة وتحسين تجربة التصفح وتزويد مالكي المواقع بمعلومات إحصائية عن الزوار. ولا تتضمن هذه الملفات، بمفردها، معلومات تحدد هويتك الشخصية.' },
      { title: '2. كيف تستخدم HousePlus ملفات تعريف الارتباط', content: `تستخدم HousePlus ملفات تعريف الارتباط على houseplus-ch.com للأغراض التالية:

**ملفات تعريف الارتباط الأساسية:** تعد ضرورية لتشغيل الموقع، وتتيح الأمان والتنقل والوصول إلى المناطق المحمية. وبدونها لن يعمل الموقع بشكل صحيح.

**ملفات تعريف الارتباط التحليلية:** نستخدم أدوات مثل Google Analytics لفهم الصفحات التي يزورها المستخدمون ومدة بقائهم والمحتوى الشائع. وتكون البيانات المجمعة مجهولة الهوية.

**ملفات تعريف الارتباط الخاصة بالتفضيلات:** تحفظ اللغة والمنطقة وتفضيلات العرض.

**ملفات تعريف الارتباط التسويقية:** قد نستخدمها لقياس فعالية الحملات وتتبع الزوار عبر المواقع وعرض إعلانات ذات صلة. ولا نستخدم إلا مزودي خدمات خارجيين موثوقين.` },
      { title: '3. ملفات تعريف الارتباط التابعة لجهات خارجية', content: `قد تضبط الخدمات التابعة لجهات خارجية المعروضة على موقعنا ملفات تعريف الارتباط الخاصة بها، ومنها:

- **Google Analytics:** تحليل حركة المرور وسلوك المستخدمين
- **Cloudflare:** أمان الموقع وتحسين الأداء والحماية من هجمات DDoS
- **Storyblok:** ملفات وظيفية مرتبطة بتقديم المحتوى

لا نتحكم في ملفات تعريف الارتباط التابعة لجهات خارجية. يرجى الرجوع إلى سياسات الخصوصية الخاصة بكل مزود لمعرفة كيفية استخدامه لهذه الملفات.` },
      { title: '4. إدارة ملفات تعريف الارتباط وتعطيلها', content: `يمكنك قبول ملفات تعريف الارتباط أو رفضها. تقبل معظم المتصفحات هذه الملفات تلقائياً، لكن يمكنك تعديل إعدادات المتصفح.

**إعدادات المتصفح:** ضمن الإعدادات أو الخصوصية أو الأمان، يمكنك عرض الملفات المحفوظة أو حذف ملف واحد أو جميعها أو حظر مواقع محددة أو حظر جميع الملفات. وقد يؤثر الحظر الكامل في عمل الموقع.

**أدوات إلغاء الاشتراك:** بالنسبة إلى Google Analytics، يمكنك تثبيت إضافة إلغاء الاشتراك المتاحة على tools.google.com/dlpage/gaoptout.

قد يؤثر تعطيل بعض الملفات في وظائف الموقع. ولا يمكن تعطيل الملفات الأساسية لأنها مطلوبة للتشغيل الأساسي.` },
      { title: '5. فترات الاحتفاظ', content: `تختلف فترات الاحتفاظ بحسب نوع الملف:

- **ملفات الجلسة:** تحذف عند إغلاق المتصفح
- **الملفات التحليلية:** يحتفظ بها عادة من 12 إلى 13 شهراً
- **ملفات التفضيلات:** حتى 12 شهراً
- **الملفات التسويقية:** عادة من 30 إلى 90 يوماً

يمكنك حذف ملفات تعريف الارتباط في أي وقت من إعدادات المتصفح.` },
      { title: '6. تحديثات هذه السياسة', content: 'قد نحدّث سياسة ملفات تعريف الارتباط لتعكس التغييرات في الملفات المستخدمة أو لأسباب تشغيلية أو قانونية أو تنظيمية. يرجى مراجعة هذه الصفحة بانتظام. ويشير التاريخ في أعلاها إلى آخر تحديث.' },
      { title: '7. تواصل معنا', content: `إذا كانت لديك أسئلة حول استخدامنا لملفات تعريف الارتباط، يرجى التواصل معنا:

**HousePlus Group**
البريد الإلكتروني: jack@houseplus-ch.com
واتساب: +86 155 7811 9543
WeChat: JackHousePlus
ساعات العمل: الاثنين – السبت، 9:00–18:00 (GMT+8)` },
    ],
    relatedTitle: 'سياسات ذات صلة', relatedDescription: 'لمزيد من المعلومات حول كيفية تعامل HousePlus مع بياناتك، يرجى مراجعة السياسات ذات الصلة.', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة',
  },
};

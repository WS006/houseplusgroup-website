export type TermsSection = { title: string; content: string };
export type TermsCopy = { kicker: string; intro: string; compliance: string; sections: TermsSection[]; ctaTitle: string; ctaText: string; email: string; whatsapp: string };

export const termsLocales: Record<string, TermsCopy> = {
  es: {
    kicker: 'Información legal de HousePlus',
    intro: 'Estos términos regulan el uso del sitio web y los servicios mayoristas de HousePlus. Léalos atentamente antes de realizar un pedido a HousePlus Group.',
    compliance: 'Declaración de cumplimiento: HousePlus Group opera una instalación de fabricación de 20.000 m² con certificación ISO 9001 en Guangdong, China, establecida en 2010. Con 16 años de experiencia B2B, hemos atendido a más de 441 clientes mayoristas en más de 53 países. Nuestros productos cumplen las normas CE, FCC, RoHS e IEC. El MOQ estándar es de 100 piezas (500 para OEM/ODM), con un plazo de 20–35 días y una garantía de 12 meses.',
    sections: [
      { title: '1. Aceptación de los términos', content: 'Al acceder o utilizar el sitio web de HousePlus (houseplus-ch.com) o realizar un pedido a HousePlus Group, acepta quedar obligado por estos Términos de Servicio y por las leyes y normativas aplicables. Si no acepta alguno de estos términos, tiene prohibido utilizar o acceder a nuestro sitio o servicios. Estos términos se aplican a todos los compradores mayoristas, distribuidores y socios comerciales que trabajen con HousePlus.' },
      { title: '2. Cuenta mayorista y requisitos', content: `Estos Términos de Servicio están destinados únicamente a transacciones entre empresas (B2B). Para realizar pedidos con HousePlus, debe:

- Ser una entidad comercial registrada (empresa, autónomo o equivalente)
- Facilitar datos correctos de registro de empresa y contacto
- Mantener una dirección comercial válida y un número de identificación fiscal cuando corresponda
- Tener al menos 18 años y estar legalmente autorizado para realizar negocios

HousePlus se reserva el derecho de rechazar el servicio o cancelar cuentas a su discreción. Todas las cuentas mayoristas están sujetas a aprobación.` },
      { title: '3. Productos, precios y especificaciones', content: `Todos los productos mostrados en nuestro sitio están sujetos a disponibilidad. HousePlus se reserva el derecho de:

- Modificar especificaciones, características o diseño sin previo aviso
- Ajustar precios según costes de materias primas, fluctuaciones monetarias o condiciones de mercado
- Suspender cualquier línea de productos en cualquier momento

Los precios publicados son solo indicativos y pueden diferir de los cotizados. Los precios oficiales se facilitan mediante cotizaciones formales de los representantes de ventas de HousePlus. Salvo pacto escrito diferente, todos los precios están en USD y excluyen envío, aranceles e impuestos aplicables.` },
      { title: '4. Pedidos y cantidad mínima de pedido (MOQ)', content: `Todos los pedidos están sujetos a nuestra política de MOQ:

- **Productos estándar:** MOQ de 100 piezas por SKU
- **Productos OEM/ODM personalizados:** MOQ de 500 piezas por SKU, sujeto al alcance del proyecto
- **Pedidos de muestra:** disponibles bajo solicitud; pueden aplicarse cargos que se acreditan contra pedidos al por mayor

Los pedidos son vinculantes cuando HousePlus recibe la confirmación escrita y el depósito acordado. HousePlus puede rechazar pedidos que no cumplan el MOQ o cuando no sea posible establecer condiciones de crédito.` },
      { title: '5. Condiciones de pago', content: `Las condiciones estándar de pago para pedidos mayoristas son:

- **Depósito:** 30 % del valor total al confirmar el pedido
- **Saldo:** 70 % antes del envío o contra presentación de documentos de transporte (pago T/T)
- **Métodos aceptados:** transferencia bancaria (T/T) y carta de crédito a la vista para pedidos superiores a 20.000 USD
- **Moneda:** USD, salvo acuerdo escrito distinto

Los pagos tardíos pueden generar intereses del 1,5 % mensual sobre el saldo pendiente. HousePlus puede retener el envío hasta recibir el pago completo.` },
      { title: '6. Envío, entrega y riesgo', content: `HousePlus ofrece las siguientes condiciones comerciales estándar conforme a Incoterms 2020:

- **FOB:** condición predeterminada; el riesgo se transfiere al comprador cuando la mercancía supera la borda del buque en el puerto de origen
- **CIF:** disponible bajo solicitud; HousePlus organiza el transporte y seguro hasta el puerto de destino
- **DDP:** disponible para destinos seleccionados; incluye aranceles y entrega en la dirección indicada

Plazos: productos estándar de 20–35 días laborables desde la confirmación; artículos en stock de 5–10 días laborables. HousePlus no responde por retrasos por fuerza mayor, despacho aduanero o hechos fuera de su control.` },
      { title: '7. Garantía de calidad y cobertura', content: `Los productos HousePlus se fabrican conforme a normas internacionales y tienen la siguiente garantía:

- **Sistemas solares y electrónica:** 12 meses desde la fecha de envío
- **Pequeños electrodomésticos de cocina:** 12 meses desde la fecha de envío
- **Componentes estructurales y accesorios:** 6 meses desde la fecha de envío

La garantía cubre defectos de fabricación en condiciones normales de uso. Queda anulada si los productos se modifican, se instalan incorrectamente o se dañan por uso indebido, accidente o condiciones fuera del funcionamiento normal. Las reclamaciones deben presentarse dentro del plazo de garantía con pruebas fotográficas y registros de lote.` },
      { title: '8. Devoluciones, reembolsos y disputas', content: `La mercancía solo puede devolverse con autorización previa por escrito de HousePlus. Se aplican estas condiciones:

- **Defectos de calidad:** la mercancía defectuosa dentro de garantía se sustituirá o acreditará a criterio de HousePlus
- **Mercancía enviada por error:** HousePlus asumirá la devolución y sustituirá o reembolsará los artículos afectados
- **Cambio de decisión del comprador o de especificaciones:** no se aceptan devoluciones después de confirmar el pedido; los cambios deben acordarse por escrito antes de comenzar la producción

Las disputas se resolverán primero mediante negociación de buena fe. Si no se resuelven en 30 días, podrán someterse a arbitraje bajo las reglas de CIETAC en Guangzhou, China.` },
      { title: '9. Propiedad intelectual', content: 'Todo el contenido del sitio HousePlus, incluidas descripciones de productos, imágenes, logotipos, marcas y documentación técnica, es propiedad intelectual de HousePlus Group y está protegido por las leyes aplicables. No puede reproducir, distribuir ni usar contenido con fines comerciales sin autorización escrita. Los clientes OEM/ODM conservan la titularidad de sus diseños y activos de marca entregados a HousePlus para fabricación.' },
      { title: '10. Limitación de responsabilidad', content: 'En la máxima medida permitida por la ley aplicable, HousePlus no será responsable de daños indirectos, incidentales, especiales, consecuenciales o punitivos derivados del uso de productos o servicios. Nuestra responsabilidad total por una reclamación relacionada con un pedido no excederá el valor total de ese pedido. HousePlus no ofrece garantías, expresas o implícitas, adicionales a las establecidas en estos términos y en la documentación de garantía aplicable.' },
      { title: '11. Ley aplicable', content: 'Estos Términos de Servicio se regirán e interpretarán conforme a las leyes de la República Popular China, sin atender a sus normas de conflicto de leyes. Las partes aceptan la jurisdicción exclusiva de los tribunales competentes de Guangzhou, provincia de Guangdong, China, para disputas no resueltas mediante arbitraje.' },
      { title: '12. Modificaciones de los términos', content: 'HousePlus puede modificar estos Términos de Servicio en cualquier momento. Los cambios materiales se comunicarán por correo electrónico a los titulares de cuentas mayoristas registradas o mediante aviso en el sitio. El uso continuado de nuestros servicios después de los cambios supone la aceptación de los nuevos términos. Recomendamos revisarlos periódicamente.' },
      { title: '13. Información de contacto', content: `Para preguntas sobre estos Términos de Servicio, contacte con:

**HousePlus Group**
Correo electrónico: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Horario comercial: lunes a viernes, 9:00–18:00 (GMT+8); sábado, 9:00–13:00

Nuestro objetivo es responder a todas las consultas en un plazo de 2 días laborables.` },
    ],
    ctaTitle: '¿Preguntas sobre nuestros términos?', ctaText: 'Nuestro equipo puede aclarar cualquier aspecto de las condiciones de comercio mayorista.', email: 'Envíenos un correo', whatsapp: 'WhatsApp: +86 155 7811 9543',
  },
  de: {
    kicker: 'Rechtliche Hinweise von HousePlus',
    intro: 'Diese Bedingungen regeln die Nutzung der HousePlus-Website und unserer Großhandelsleistungen. Bitte lesen Sie sie vor einer Bestellung bei der HousePlus Group sorgfältig.',
    compliance: 'Compliance-Erklärung: Die HousePlus Group betreibt seit 2010 eine 20.000 m² große, ISO-9001-zertifizierte Produktionsstätte in Guangdong, China. Mit 16 Jahren B2B-Erfahrung haben wir mehr als 441 Großhandelskunden in über 53 Ländern betreut. Unsere Produkte erfüllen CE-, FCC-, RoHS- und IEC-Standards. Die Standard-MOQ beträgt 100 Stück, für OEM/ODM 500 Stück, bei 20–35 Tagen Lieferzeit und 12 Monaten Garantie.',
    sections: [
      { title: '1. Zustimmung zu den Bedingungen', content: 'Durch den Zugriff auf oder die Nutzung der HousePlus-Website (houseplus-ch.com) oder durch eine Bestellung bei der HousePlus Group erklären Sie sich mit diesen Nutzungsbedingungen sowie allen geltenden Gesetzen und Vorschriften einverstanden. Wenn Sie nicht zustimmen, dürfen Sie unsere Website oder Dienste nicht nutzen. Diese Bedingungen gelten für alle Großhandelskäufer, Händler und Geschäftspartner von HousePlus.' },
      { title: '2. Großhandelskonto und Berechtigung', content: `Diese Nutzungsbedingungen gelten ausschließlich für Business-to-Business-Transaktionen. Um bei HousePlus zu bestellen, müssen Sie:

- ein registriertes Unternehmen, Einzelunternehmen oder eine gleichwertige Geschäftseinheit sein
- korrekte Registrierungs- und Kontaktdaten angeben
- eine gültige Geschäftsadresse und, soweit erforderlich, eine Steueridentifikationsnummer führen
- mindestens 18 Jahre alt und rechtlich zur Geschäftstätigkeit befugt sein

HousePlus kann Leistungen ablehnen oder Konten nach eigenem Ermessen kündigen. Alle Großhandelskonten unterliegen einer Genehmigung.` },
      { title: '3. Produkte, Preise und Spezifikationen', content: `Alle auf unserer Website aufgeführten Produkte sind abhängig von der Verfügbarkeit. HousePlus behält sich das Recht vor:

- Produktspezifikationen, Funktionen oder Design ohne vorherige Ankündigung zu ändern
- Preise aufgrund von Rohstoffkosten, Wechselkursschwankungen oder Marktbedingungen anzupassen
- Produktlinien jederzeit einzustellen

Veröffentlichte Preise sind unverbindlich und können von Angeboten abweichen. Verbindliche Preise werden durch formelle Angebote der HousePlus-Vertriebsmitarbeiter mitgeteilt. Sofern nicht schriftlich anders vereinbart, verstehen sich alle Preise in USD ohne Versand, Zölle und anwendbare Steuern.` },
      { title: '4. Bestellungen und Mindestbestellmenge (MOQ)', content: `Für alle Bestellungen gilt unsere MOQ-Richtlinie:

- **Standardprodukte:** MOQ 100 Stück pro SKU
- **Kundenspezifische OEM/ODM-Produkte:** MOQ 500 Stück pro SKU, abhängig vom Projektumfang
- **Musterbestellungen:** auf Anfrage verfügbar; Mustergebühren können anfallen und werden mit Großbestellungen verrechnet

Bestellungen werden mit schriftlicher Bestätigung durch HousePlus und Zahlung der vereinbarten Anzahlung verbindlich. HousePlus kann Bestellungen ablehnen, die die MOQ nicht erfüllen oder für die keine Kreditbedingungen vereinbart werden können.` },
      { title: '5. Zahlungsbedingungen', content: `Die Standard-Zahlungsbedingungen für Großhandelsbestellungen sind:

- **Anzahlung:** 30 % des Gesamtbestellwerts bei Auftragsbestätigung
- **Restbetrag:** 70 % vor Versand oder gegen Vorlage der Versanddokumente (T/T-Zahlung)
- **Akzeptierte Zahlungsmethoden:** Banküberweisung (T/T) und Akkreditiv bei Sicht für Bestellungen über 20.000 USD
- **Währung:** USD, sofern nicht schriftlich anders vereinbart

Für verspätete Zahlungen können 1,5 % Zinsen pro Monat auf den ausstehenden Betrag anfallen. HousePlus kann den Versand bis zum vollständigen Zahlungseingang zurückhalten.` },
      { title: '6. Versand, Lieferung und Gefahrübergang', content: `HousePlus bietet die folgenden Standard-Handelsklauseln nach Incoterms 2020:

- **FOB:** Standardversandbedingung; das Risiko geht im Ursprungshafen auf den Käufer über
- **CIF:** auf Anfrage; HousePlus organisiert Fracht und Versicherung bis zum Bestimmungshafen
- **DDP:** für ausgewählte Ziele verfügbar; umfasst Zölle und Lieferung an die angegebene Adresse

Lieferzeiten: Standardprodukte 20–35 Arbeitstage ab Auftragsbestätigung, Lagerartikel 5–10 Arbeitstage. HousePlus haftet nicht für Verzögerungen durch höhere Gewalt, Zollabfertigung oder Ereignisse außerhalb unseres Einflusses.` },
      { title: '7. Qualitätssicherung und Garantie', content: `HousePlus-Produkte werden nach internationalen Qualitätsstandards gefertigt und haben folgende Garantie:

- **Solarsysteme und Elektronik:** 12 Monate ab Versanddatum
- **Kleine Küchengeräte:** 12 Monate ab Versanddatum
- **Strukturteile und Zubehör:** 6 Monate ab Versanddatum

Die Garantie deckt Herstellungsfehler bei normaler Nutzung ab. Sie erlischt bei Veränderung, falscher Installation oder Schäden durch Missbrauch, Unfall oder außergewöhnliche Betriebsbedingungen. Garantieansprüche müssen innerhalb der Garantiezeit mit Fotobelegen und Chargenunterlagen eingereicht werden.` },
      { title: '8. Rückgaben, Erstattungen und Streitigkeiten', content: `Waren dürfen nur mit vorheriger schriftlicher Genehmigung von HousePlus zurückgegeben werden. Es gelten folgende Bedingungen:

- **Qualitätsmängel:** Fehlerhafte Waren innerhalb der Garantiezeit werden nach Ermessen von HousePlus ersetzt oder gutgeschrieben
- **Falsch gelieferte Waren:** HousePlus trägt die Rücksendekosten und ersetzt oder erstattet die betroffenen Artikel
- **Meinungsänderung oder Spezifikationsänderungen des Käufers:** Nach Auftragsbestätigung keine Rücknahme; Änderungen müssen vor Produktionsbeginn schriftlich vereinbart werden

Streitigkeiten werden zunächst durch Verhandlungen in gutem Glauben gelöst. Bleiben sie nach 30 Tagen ungelöst, können sie nach den Regeln der CIETAC in Guangzhou, China, einem Schiedsverfahren unterbreitet werden.` },
      { title: '9. Geistiges Eigentum', content: 'Alle Inhalte der HousePlus-Website, einschließlich Produktbeschreibungen, Bilder, Logos, Marken und technischer Dokumentation, sind geistiges Eigentum der HousePlus Group und durch geltendes Recht geschützt. Ohne vorherige schriftliche Zustimmung dürfen Sie Inhalte nicht vervielfältigen, verbreiten oder gewerblich nutzen. OEM/ODM-Kunden behalten das Eigentum an ihren eigenen Designs und Markenwerten, die HousePlus zur Produktion überlassen werden.' },
      { title: '10. Haftungsbeschränkung', content: 'Soweit gesetzlich zulässig, haftet HousePlus nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden aus der Nutzung unserer Produkte oder Dienste. Die Gesamthaftung für einen Anspruch zu einer bestimmten Bestellung übersteigt nicht deren Gesamtwert. HousePlus übernimmt keine über die ausdrücklich in diesen Bedingungen und den jeweiligen Garantieunterlagen genannten Garantien hinausgehenden ausdrücklichen oder stillschweigenden Zusagen.' },
      { title: '11. Anwendbares Recht', content: 'Diese Nutzungsbedingungen unterliegen den Gesetzen der Volksrepublik China und werden nach ihnen ausgelegt, ohne Berücksichtigung kollisionsrechtlicher Regeln. Für Streitigkeiten, die nicht durch Schiedsverfahren beigelegt werden, stimmen die Parteien der ausschließlichen Zuständigkeit der zuständigen Gerichte in Guangzhou, Provinz Guangdong, China, zu.' },
      { title: '12. Änderungen der Bedingungen', content: 'HousePlus kann diese Nutzungsbedingungen jederzeit ändern. Wesentliche Änderungen werden registrierten Großhandelskonto-Inhabern per E-Mail oder durch einen Hinweis auf der Website mitgeteilt. Die weitere Nutzung unserer Dienste nach Änderungen gilt als Annahme der neuen Bedingungen. Wir empfehlen eine regelmäßige Überprüfung.' },
      { title: '13. Kontaktinformationen', content: `Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie bitte:

**HousePlus Group**
E-Mail: jack@houseplus-ch.com
WhatsApp: +86 155 7811 9543
WeChat: JackHousePlus
Geschäftszeiten: Montag bis Freitag 9:00–18:00 Uhr (GMT+8); Samstag 9:00–13:00 Uhr

Wir bemühen uns, alle Anfragen innerhalb von 2 Arbeitstagen zu beantworten.` },
    ],
    ctaTitle: 'Fragen zu unseren Bedingungen?', ctaText: 'Unser Team erläutert Ihnen gerne jeden Aspekt unserer Großhandelsbedingungen.', email: 'E-Mail senden', whatsapp: 'WhatsApp: +86 155 7811 9543',
  },
  fr: {
    kicker: 'Informations juridiques HousePlus',
    intro: 'Ces Conditions d’utilisation régissent l’utilisation du site HousePlus et de nos services de gros. Veuillez les lire attentivement avant de passer une commande auprès de HousePlus Group.',
    compliance: 'Déclaration de conformité : HousePlus Group exploite depuis 2010 une usine de 20 000 m² certifiée ISO 9001 à Guangdong, en Chine. Forts de 16 années d’expérience B2B, nous avons accompagné plus de 441 clients grossistes dans plus de 53 pays. Nos produits répondent aux normes CE, FCC, RoHS et IEC. Le MOQ standard est de 100 pièces, ou 500 pièces pour l’OEM/ODM, avec un délai de 20 à 35 jours et une garantie de 12 mois.',
    sections: [
      { title: '1. Acceptation des conditions', content: 'En accédant au site HousePlus (houseplus-ch.com), en l’utilisant ou en passant une commande auprès de HousePlus Group, vous acceptez d’être lié par les présentes Conditions d’utilisation ainsi que par les lois et réglementations applicables. Si vous n’acceptez pas ces conditions, vous ne pouvez pas utiliser notre site ou nos services. Elles s’appliquent à tous les acheteurs en gros, distributeurs et partenaires commerciaux travaillant avec HousePlus.' },
      { title: '2. Compte grossiste et admissibilité', content: `Les présentes Conditions d’utilisation sont exclusivement destinées aux transactions interentreprises (B2B). Pour commander auprès de HousePlus, vous devez :

- être une entité commerciale enregistrée (société, entrepreneur individuel ou équivalent)
- fournir des informations d’enregistrement et de contact exactes
- disposer d’une adresse professionnelle valide et, le cas échéant, d’un numéro d’identification fiscale
- avoir au moins 18 ans et être légalement autorisé à exercer une activité commerciale

HousePlus se réserve le droit de refuser un service ou d’annuler un compte à sa discrétion. Tous les comptes grossistes sont soumis à approbation.` },
      { title: '3. Produits, prix et spécifications', content: `Tous les produits présentés sur notre site sont soumis à disponibilité. HousePlus se réserve le droit de :

- modifier les spécifications, fonctionnalités ou le design sans préavis
- ajuster les prix en fonction des coûts des matières premières, des fluctuations monétaires ou des conditions du marché
- interrompre toute ligne de produits à tout moment

Les prix publiés sont indicatifs et peuvent différer des prix proposés. Les prix officiels sont communiqués par devis formel des représentants commerciaux HousePlus. Sauf accord écrit contraire, tous les prix sont libellés en USD, hors transport, droits de douane et taxes applicables.` },
      { title: '4. Commandes et quantité minimale de commande (MOQ)', content: `Toutes les commandes sont soumises à notre politique de MOQ :

- **Produits standard :** MOQ de 100 pièces par SKU
- **Produits OEM/ODM personnalisés :** MOQ de 500 pièces par SKU, selon le périmètre du projet
- **Commandes d’échantillons :** disponibles sur demande ; des frais peuvent s’appliquer et être déduits des commandes en gros

Les commandes deviennent contraignantes à réception de la confirmation écrite de HousePlus et du dépôt convenu. HousePlus peut refuser les commandes ne respectant pas la MOQ ou pour lesquelles les conditions de crédit ne peuvent pas être établies.` },
      { title: '5. Conditions de paiement', content: `Les conditions de paiement standard pour les commandes de gros sont :

- **Acompte :** 30 % de la valeur totale à la confirmation de commande
- **Solde :** 70 % avant expédition ou contre présentation des documents de transport (paiement T/T)
- **Méthodes acceptées :** virement bancaire (T/T) et crédit documentaire à vue pour les commandes supérieures à 20 000 USD
- **Devise :** USD, sauf accord écrit contraire

Les paiements tardifs peuvent être soumis à des intérêts de 1,5 % par mois sur le solde impayé. HousePlus peut retenir l’expédition jusqu’au paiement intégral.` },
      { title: '6. Expédition, livraison et transfert des risques', content: `HousePlus propose les conditions commerciales standard suivantes selon les Incoterms 2020 :

- **FOB :** condition d’expédition par défaut ; le risque est transféré à l’acheteur au port d’origine
- **CIF :** disponible sur demande ; HousePlus organise le fret et l’assurance jusqu’au port de destination
- **DDP :** disponible pour certaines destinations ; comprend les droits de douane et la livraison à l’adresse indiquée

Délais : produits standard sous 20 à 35 jours ouvrables après confirmation ; articles en stock sous 5 à 10 jours ouvrables. HousePlus n’est pas responsable des retards dus à la force majeure, au dédouanement ou à des événements indépendants de notre volonté.` },
      { title: '7. Assurance qualité et garantie', content: `Les produits HousePlus sont fabriqués selon des normes internationales et bénéficient de la garantie suivante :

- **Systèmes solaires et électronique :** 12 mois à compter de l’expédition
- **Petits appareils de cuisine :** 12 mois à compter de l’expédition
- **Composants structurels et accessoires :** 6 mois à compter de l’expédition

La garantie couvre les défauts de fabrication dans des conditions normales d’utilisation. Elle est annulée si les produits sont modifiés, mal installés ou endommagés par mauvaise utilisation, accident ou conditions anormales. Les demandes doivent être soumises pendant la période de garantie avec preuves photographiques et dossiers de lot.` },
      { title: '8. Retours, remboursements et litiges', content: `Les marchandises ne peuvent être retournées qu’avec l’autorisation écrite préalable de HousePlus. Les conditions suivantes s’appliquent :

- **Défauts de qualité :** les marchandises défectueuses pendant la garantie seront remplacées ou créditées à la discrétion de HousePlus
- **Marchandises erronées :** HousePlus prendra en charge le retour et remplacera ou remboursera les articles concernés
- **Changement d’avis ou de spécifications de l’acheteur :** aucun retour après confirmation ; les changements doivent être convenus par écrit avant le début de la production

Les litiges seront d’abord résolus par négociation de bonne foi. Sans résolution sous 30 jours, ils pourront être soumis à l’arbitrage selon les règles de la CIETAC à Guangzhou, Chine.` },
      { title: '9. Propriété intellectuelle', content: 'Tout le contenu du site HousePlus, notamment les descriptions de produits, images, logos, marques et documents techniques, constitue la propriété intellectuelle de HousePlus Group et est protégé par les lois applicables. Vous ne pouvez reproduire, distribuer ou utiliser ce contenu à des fins commerciales sans autorisation écrite préalable. Les clients OEM/ODM conservent la propriété de leurs designs et actifs de marque transmis à HousePlus pour la production.' },
      { title: '10. Limitation de responsabilité', content: 'Dans la mesure maximale permise par la loi, HousePlus ne saurait être responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs liés à l’utilisation de ses produits ou services. Notre responsabilité totale pour toute réclamation liée à une commande donnée ne peut excéder la valeur totale de cette commande. HousePlus n’accorde aucune garantie expresse ou implicite au-delà de celles précisées dans les présentes conditions et dans la documentation de garantie applicable.' },
      { title: '11. Droit applicable', content: 'Les présentes Conditions d’utilisation sont régies et interprétées conformément aux lois de la République populaire de Chine, sans égard aux règles de conflit de lois. Les parties acceptent la compétence exclusive des tribunaux compétents de Guangzhou, province de Guangdong, Chine, pour tout litige non réglé par arbitrage.' },
      { title: '12. Modifications des conditions', content: 'HousePlus peut modifier les présentes Conditions d’utilisation à tout moment. Les changements importants seront communiqués aux titulaires de comptes grossistes enregistrés par e-mail ou via un avis sur notre site. La poursuite de l’utilisation de nos services après les modifications vaut acceptation des nouvelles conditions. Nous recommandons de les consulter régulièrement.' },
      { title: '13. Coordonnées', content: `Pour toute question concernant ces Conditions d’utilisation, contactez :

**HousePlus Group**
E-mail : jack@houseplus-ch.com
WhatsApp : +86 155 7811 9543
WeChat : JackHousePlus
Heures d’ouverture : lundi à vendredi, 9:00–18:00 (GMT+8) ; samedi, 9:00–13:00

Nous nous efforçons de répondre à toutes les demandes sous 2 jours ouvrables.` },
    ],
    ctaTitle: 'Des questions sur nos conditions ?', ctaText: 'Notre équipe peut clarifier tout aspect de nos conditions de commerce de gros.', email: 'Nous envoyer un e-mail', whatsapp: 'WhatsApp : +86 155 7811 9543',
  },
  ar: {
    kicker: 'المعلومات القانونية لدى HousePlus',
    intro: 'تنظم هذه الشروط استخدام موقع HousePlus وخدمات الجملة الخاصة بنا. يرجى قراءتها بعناية قبل تقديم أي طلب إلى HousePlus Group.',
    compliance: 'بيان الامتثال: تدير HousePlus Group منشأة تصنيع بمساحة 20,000 م² وحاصلة على شهادة ISO 9001 في قوانغدونغ بالصين، تأسست عام 2010. وبخبرة 16 عاماً في B2B، خدمنا أكثر من 441 عميلاً بالجملة في أكثر من 53 دولة. تفي منتجاتنا بمعايير CE وFCC وRoHS وIEC. الحد الأدنى القياسي للطلب هو 100 قطعة، أو 500 قطعة لخدمات OEM/ODM، مع مهلة 20–35 يوماً وضمان 12 شهراً.',
    sections: [
      { title: '1. الموافقة على الشروط', content: 'عند الدخول إلى موقع HousePlus ‏(houseplus-ch.com) أو استخدامه أو تقديم طلب لدى HousePlus Group، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح السارية. إذا لم توافق على أي من هذه الشروط، يحظر عليك استخدام موقعنا أو خدماتنا. تنطبق هذه الشروط على جميع مشتري الجملة والموزعين وشركاء الأعمال الذين يتعاملون مع HousePlus.' },
      { title: '2. حساب الجملة والأهلية', content: `تهدف شروط الخدمة هذه إلى المعاملات بين الشركات فقط (B2B). ولتقديم طلبات إلى HousePlus، يجب عليك:

- أن تكون كياناً تجارياً مسجلاً، مثل شركة أو مالك وحيد أو ما يعادله
- تقديم معلومات تسجيل الشركة وبيانات الاتصال الصحيحة
- الاحتفاظ بعنوان تجاري صالح ورقم تعريف ضريبي عند الاقتضاء
- أن يكون عمرك 18 عاماً على الأقل ومخولاً قانوناً لمزاولة الأعمال

تحتفظ HousePlus بالحق في رفض الخدمة أو إلغاء الحسابات وفق تقديرها. وتخضع جميع حسابات الجملة للموافقة.` },
      { title: '3. المنتجات والأسعار والمواصفات', content: `تخضع جميع المنتجات المعروضة على موقعنا للتوافر. وتحتفظ HousePlus بالحق في:

- تعديل مواصفات المنتج أو خصائصه أو تصميمه دون إشعار مسبق
- تعديل الأسعار استجابة لتكاليف المواد الخام أو تقلبات العملات أو ظروف السوق
- إيقاف أي خط منتجات في أي وقت

الأسعار المنشورة إرشادية فقط وقد تختلف عن الأسعار المعروضة في عروض الأسعار. تصدر الأسعار الرسمية عبر عروض أسعار رسمية من ممثلي مبيعات HousePlus. وما لم يتم الاتفاق كتابةً على خلاف ذلك، تكون جميع الأسعار بالدولار الأمريكي ولا تشمل الشحن أو الرسوم الجمركية أو الضرائب المطبقة.` },
      { title: '4. الطلبات والحد الأدنى لكمية الطلب', content: `تخضع جميع الطلبات لسياسة الحد الأدنى للطلب لدينا:

- **المنتجات القياسية:** 100 قطعة كحد أدنى لكل SKU
- **منتجات OEM/ODM المخصصة:** 500 قطعة كحد أدنى لكل SKU، حسب نطاق المشروع
- **طلبات العينات:** متاحة عند الطلب؛ قد تطبق رسوم للعينات وتحتسب مقابل طلبات الجملة

تصبح الطلبات ملزمة عند استلام تأكيد كتابي من HousePlus ودفع الدفعة المقدمة المتفق عليها. ويحق لـ HousePlus رفض الطلبات التي لا تفي بالحد الأدنى أو التي لا يمكن تحديد شروط ائتمان لها.` },
      { title: '5. شروط الدفع', content: `شروط الدفع القياسية لطلبات الجملة هي:

- **الدفعة المقدمة:** 30٪ من إجمالي قيمة الطلب عند تأكيده
- **الرصيد:** 70٪ قبل الشحن أو عند تقديم مستندات الشحن (دفع T/T)
- **طرق الدفع المقبولة:** التحويل المصرفي (T/T) والاعتماد المستندي عند الاطلاع للطلبات التي تتجاوز 20,000 دولار أمريكي
- **العملة:** الدولار الأمريكي، ما لم يتفق كتابةً على غير ذلك

قد يترتب على التأخر في الدفع فائدة بنسبة 1.5٪ شهرياً على الرصيد المستحق. ويجوز لـ HousePlus حجب الشحنة حتى استلام كامل المبلغ.` },
      { title: '6. الشحن والتسليم وانتقال المخاطر', content: `تقدم HousePlus شروط التجارة القياسية التالية وفق Incoterms 2020:

- **FOB:** شرط الشحن الافتراضي؛ تنتقل المخاطر إلى المشتري في ميناء المنشأ
- **CIF:** متاح عند الطلب؛ ترتب HousePlus الشحن والتأمين إلى ميناء الوصول
- **DDP:** متاح لوجهات مختارة؛ ويشمل الرسوم الجمركية والتسليم إلى العنوان المحدد

المهل: المنتجات القياسية 20–35 يوم عمل من تأكيد الطلب، والمنتجات المتوفرة 5–10 أيام عمل. لا تتحمل HousePlus مسؤولية التأخيرات الناتجة عن القوة القاهرة أو التخليص الجمركي أو أحداث خارج سيطرتنا.` },
      { title: '7. ضمان الجودة والضمان', content: `تصنع منتجات HousePlus وفق معايير الجودة الدولية وتحمل الضمان التالي:

- **الأنظمة الشمسية والإلكترونيات:** 12 شهراً من تاريخ الشحن
- **أجهزة المطبخ الصغيرة:** 12 شهراً من تاريخ الشحن
- **المكونات الهيكلية والملحقات:** 6 أشهر من تاريخ الشحن

يغطي الضمان عيوب التصنيع في ظروف الاستخدام العادية. ويبطل إذا تم تعديل المنتجات أو تركيبها على نحو غير صحيح أو إتلافها بسبب سوء الاستخدام أو الحوادث أو الظروف غير العادية. يجب تقديم مطالبات الضمان خلال مدته مع أدلة فوتوغرافية وسجلات دفعة الإنتاج.` },
      { title: '8. المرتجعات والمبالغ المستردة والنزاعات', content: `لا يجوز إرجاع البضائع إلا بتفويض كتابي مسبق من HousePlus. وتنطبق الشروط التالية:

- **عيوب الجودة:** تستبدل البضائع المعيبة خلال الضمان أو تمنح قيمة ائتمانية حسب تقدير HousePlus
- **شحن بضائع غير صحيحة:** تتحمل HousePlus تكلفة الإرجاع وتستبدل أو ترد قيمة العناصر المتأثرة
- **تغيير رأي المشتري أو المواصفات:** لا تقبل المرتجعات بعد تأكيد الطلب؛ ويجب الاتفاق كتابةً على التعديلات قبل بدء الإنتاج

تحل النزاعات أولاً بالتفاوض بحسن نية. وإذا لم تحل خلال 30 يوماً، يجوز إحالتها إلى التحكيم وفق قواعد CIETAC في قوانغتشو بالصين.` },
      { title: '9. الملكية الفكرية', content: 'جميع محتويات موقع HousePlus، بما في ذلك أوصاف المنتجات والصور والشعارات والعلامات التجارية والوثائق الفنية، هي ملكية فكرية لـ HousePlus Group ومحمية بالقوانين السارية. لا يجوز نسخ أي محتوى أو توزيعه أو استخدامه تجارياً دون موافقة كتابية مسبقة. ويحتفظ عملاء OEM/ODM بملكية تصاميمهم المخصصة وأصول علاماتهم التي يقدمونها إلى HousePlus لأغراض الإنتاج.' },
      { title: '10. تحديد المسؤولية', content: 'إلى أقصى حد يسمح به القانون، لا تكون HousePlus مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناشئة عن استخدام المنتجات أو الخدمات. ولا تتجاوز مسؤوليتنا الإجمالية عن مطالبة متعلقة بطلب محدد القيمة الإجمالية لذلك الطلب. ولا تقدم HousePlus أي ضمانات صريحة أو ضمنية تتجاوز ما نصت عليه هذه الشروط ووثائق ضمان المنتج المعمول بها.' },
      { title: '11. القانون الحاكم', content: 'تخضع شروط الخدمة هذه وتفسر وفق قوانين جمهورية الصين الشعبية، دون اعتبار لقواعد تنازع القوانين. ويوافق الطرفان على الاختصاص الحصري للمحاكم المختصة في قوانغتشو، مقاطعة قوانغدونغ، الصين، لحل أي نزاعات لا تسوى بالتحكيم.' },
      { title: '12. تعديلات الشروط', content: 'تحتفظ HousePlus بالحق في تعديل شروط الخدمة هذه في أي وقت. وسيتم إبلاغ أصحاب حسابات الجملة المسجلة بالتغييرات الجوهرية عبر البريد الإلكتروني أو بإشعار على موقعنا. ويشكل استمرار استخدام خدماتنا بعد أي تغيير قبولاً للشروط الجديدة. ونوصي بمراجعتها دورياً.' },
      { title: '13. معلومات الاتصال', content: `للأسئلة المتعلقة بشروط الخدمة هذه، يرجى التواصل مع:

**HousePlus Group**
البريد الإلكتروني: jack@houseplus-ch.com
واتساب: +86 155 7811 9543
WeChat: JackHousePlus
ساعات العمل: الاثنين إلى الجمعة 9:00–18:00 (GMT+8)؛ السبت 9:00–13:00

نهدف إلى الرد على جميع الاستفسارات خلال يومي عمل.` },
    ],
    ctaTitle: 'هل لديك أسئلة حول شروطنا؟', ctaText: 'يتوفر فريقنا لتوضيح أي جانب من جوانب شروط وأحكام تجارة الجملة.', email: 'راسلنا عبر البريد الإلكتروني', whatsapp: 'واتساب: +86 155 7811 9543',
  },
};

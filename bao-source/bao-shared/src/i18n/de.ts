import type { EnKey, I18nDictionary } from "./en";

/** DE translation dictionary generated from the English source. */
export const de = {
  "app.name": "Betriebsplattform",
  "app.tagline": "\nIntelligenz für den Anlagenbetrieb",
  "layout.brand": "\nBetriebskonsole",
  "layout.appHeader": "Anwendungs-Kopfzeile",
  "layout.mobileNav": "Primäre mobile Navigation",
  "layout.sync": "\nSync",
  "layout.toggleTheme": "\nFarbmodus umschalten",
  "layout.authChromeNav": "\nAnmeldenavigation",
  "layout.toggleDarkMode": "\nDunkelmodus umschalten",
  "layout.userMenu": "\nBenutzermenü",
  "layout.userMenuOpen": "\nBenutzermenü für {name}",
  "layout.signOut": "\nAbmelden",
  "layout.language": " öffnen\nSprache",
  "layout.languageMenu": "\nSprachmenü",
  "layout.languageDescription": "\nAnzeigesprache ändern",
  "layout.languageCurrent": "\nAktuelle Sprache: {language}",
  "layout.languageSelectAria": "\nSprache auf {language}",
  "layout.languageSaved": " umstellen\nSprache aktualisiert.",
  "layout.releaseStage": "\nVorab-Build",
  "layout.footerNav": "\nFußzeilennavigation",
  "layout.footerTagline":
    "\nVom Server gerenderte Betriebsoberflächen für Asset-Intelligence, Wartungsfluss und Transaktionstransparenz.",
  "layout.footerThemeNote": "\n{brandName}-Themensystem",
  "layout.footerCopyright": "\nCopyright © 2026 {brandName}",
  "layout.logoAlt": "Betriebsplattform",
  "roles.admin": "\nAdministrator",
  "roles.estateManager": "\nNachlassverwalter",
  "roles.maintenanceLead": "\nWartungsleiter",
  "roles.fieldTechnician": "\nAußendiensttechniker",
  "roles.financeOfficer": "\nFinanzbeauftragter",
  "roles.unknown": "\nBetreiber",
  "admin.systemCounters": "\nSystemzähler",
  "admin.createAdmin.databaseRequired":
    "\nLegen Sie DATABASE_URL fest, bevor Sie das Admin-Bootstrap-Skript ausführen.",
  "admin.createAdmin.credentialsRequired":
    "\nLegen Sie CREATE_ADMIN_EMAIL und CREATE_ADMIN_PASSWORD fest, bevor Sie das Admin-Bootstrap-Skript ausführen.",
  "admin.createAdmin.updatedRole": "\nVorhandener Benutzer {email} zur ADMIN-Rolle aktualisiert.",
  "admin.createAdmin.createdUser": "\nErstellter Admin-Benutzer: {email}",
  "common.summary": "\nZusammenfassung",
  "common.applyFilters": "\nFilter anwenden",
  "common.userFallback": "\nBetreiber",
  "common.moreInfo": "\nWeitere Informationen",
  "common.moreInfoFor": "\nWeitere Informationen zu {subject}",
  "addDevice.form.submitAria": "\nGeräteregistrierung senden",
  "layout.mobileNavigation": "\nMobile Navigation",
  "layout.headerNavigation": "\nKopfzeilennavigation",
  "layout.sidebarNavigation": "\nPrimäre Navigation",
  "nav.dashboard": "Uebersicht",
  "nav.assets": "\nVermögenswerte",
  "nav.section.core": "\nKern",
  "nav.section.assets": "\nVermögenswerte",
  "nav.section.account": "\nKonto",
  "nav.section.operations": "\nOperationen",
  "nav.section.insights": "\nEinblicke",
  "nav.section.finance": "\nFinanzen",
  "nav.section.documents": "\nDokumente",
  "nav.section.admin": "\nVerwaltung",
  "nav.section.home": "\nStartseite",
  "nav.section.operate": "\nBetreiben",
  "nav.section.monitor": "\nMonitor",
  "nav.section.plan": "\nPlan",
  "nav.section.commercial": "\nKommerziell",
  "nav.section.procurement": "\nBeschaffung",
  "nav.section.control": "\nKontrolle",
  "nav.predictions": "\nVorhersagen",
  "nav.tasks": "\nAufgaben",
  "nav.finance": "\nFinanzen",
  "nav.financePlanning": "\nFinanzplanung",
  "nav.estate": "\nNachlass",
  "nav.portfolio": "\nPortfolio",
  "nav.rfqs": "\nAusschreibungen",
  "nav.customerOrders": "\nKundenbestellungen",
  "nav.workOrders": "\nArbeitsaufträge",
  "nav.purchaseOrders": "\nBestellungen",
  "nav.invoices": "\nRechnungen",
  "nav.fleet": "\nFlotte",
  "nav.buildings": "\nGebäude",
  "nav.sensors": "\nSensoren",
  "nav.reports": "\nBerichte",
  "nav.aiPlayground": "KI-Playground",
  "nav.agentic": "Agentisch",
  "nav.agenticStorage": "Agentischer Speicher",
  "app.nav.git": "Arbeitsbereiche",
  "app.nav.repos": "Gehostete Repositories",
  "app.nav.activity": "Launch-Bereitschaftsaktivität",
  "registry.nav.publish": "Pakete veröffentlichen",
  "nav.sandbox": "Sandbox-Berechtigungen",
  "nav.utilisation": "\nAuslastung",
  "nav.admin": "Verwaltung",
  "nav.digitalTwin": "\nDigitaler Zwilling",
  "nav.openSidebar": "\nSeitenleiste öffnen",
  "nav.closeSidebar": "\nSeitenleiste schließen",
  "nav.skipToContent": "\nZum Hauptinhalt springen",
  "nav.breadcrumb": "\nBreadcrumb",
  "nav.breadcrumbTruncated": "Mehr",
  "nav.profile": "\nProfil",
  "nav.customisation": "\nAnpassung",
  "nav.kanban": "\nKanban",
  "nav.addDevice": "\nGerät",
  "nav.deviceHistory": " hinzufügen\nGeräteverlauf",
  "nav.userRole": "\nBenutzerrolle",
  "locale.option.en": "\nEnglisch",
  "locale.option.de": "\nDeutsch",
  "locale.option.fr": "\nFranzösisch",
  "locale.option.es": "\nSpanisch",
  "locale.option.it": "\nItalienisch",
  "locale.option.pt": "\nPortugiesisch",
  "public.meta.description":
    "\nEine Plattform für die Erfassung öffentlicher Nachfrage, kommerzielle Dokumente, Partnersichtbarkeit, KI-Anleitung, Berichterstattung und maschinengestützten Handel.",
  "public.nav.home": "\nStartseite",
  "public.nav.catalog": "\nKatalog",
  "public.nav.requestQuote": "\nAngebot anfordern",
  "public.nav.startRfq": "\nRFQ",
  "public.nav.signIn": " starten\nAnmelden",
  "public.assistant.breadcrumb.session": "\nAssistentensitzung",
  "public.assistant.breadcrumb.transcript": "\nTranskript",
  "public.footer.description":
    "\nÖffentliche Aufnahme, kommerzielle Kontrolle, Partnersichtbarkeit, KI-Anleitung, Berichterstattung und Automatisierung für dokumentengesteuerte Abläufe.",
  "public.footer.rfq": "Angebotsanfrage (RFQ)",
  "public.footer.portalSignIn": "\nPortal-Anmeldung",
  "public.page.catalog": "\nKatalog",
  "public.page.requestQuote": "\nAngebot anfordern",
  "public.page.rfqSubmitted": "\nAngebotsanfrage eingereicht",
  "public.assistant.panel.eyebrow": "\nÖffentlicher Assistent",
  "public.assistant.panel.formAria": "\nStarten Sie eine öffentliche Assistentensitzung",
  "public.assistant.panel.titleLabel": "\nSitzungstitel",
  "public.assistant.panel.descriptionLabel": "\nSitzungsaufforderung",
  "public.assistant.panel.titleHint":
    "\nVerwenden Sie eine Kurzbezeichnung, die dem Serviceumfang oder der vorbereiteten Anfrage entspricht.",
  "public.assistant.panel.descriptionHint":
    "Fassen Sie Umfang, Zeitrahmen, Genehmigungen und Lieferbeschränkungen zusammen, die der Assistent einhalten sollte.",
  "public.assistant.panel.titlePlaceholder": "\nBeispiel: Anlagenzuverlässigkeitsplanung",
  "public.assistant.panel.descriptionPlaceholder":
    "\nBeispiel: Erfassen Sie den Site-Bereich, die angeforderten Daten, Abhängigkeiten und Eskalationsauslöser, bevor die Angebotsanfrage übermittelt wird.",
  "public.assistant.panel.helpText":
    "\nDadurch wird eine öffentliche Assistentensitzung für den aktuellen Seitenkontext erstellt.",
  "public.assistant.panel.launchError":
    "\nDie Assistentensitzung konnte nicht gestartet werden. Überprüfen Sie den aktuellen Kontext und versuchen Sie es erneut.",
  "public.assistant.panel.submit": "\nAssistentensitzung starten",
  "public.assistant.catalog.title": "\nKatalogassistent",
  "public.assistant.catalog.description":
    "\nVerwenden Sie das aktuelle Katalogdetail als Kontext und übergeben Sie es dann an die öffentliche Assistentensitzung.",
  "public.assistant.rfq.title": "\nRFQ-Assistent",
  "public.assistant.rfq.description":
    "\nErstellen Sie eine öffentliche Assistentensitzung mit dem RFQ-Seitenkontext, bevor die Anfrage übermittelt wird.",
  "public.assistant.rfq.prompt":
    "\nErfassen Sie den Anforderungskontext, klären Sie den Umfang und bereiten Sie die öffentliche Übergabe vor.",
  "public.assistant.rfq.bundlePrompt":
    "\nErfassen Sie den gebündelten Anforderungskontext für {services}, klären Sie den Umfang und bereiten Sie die öffentliche Übergabe vor.",
  "public.assistant.started.description":
    "\nDie öffentliche Assistentensitzung ist fertig. Verfeinern Sie die Anfrage weiter mit demselben Kontext.",
  "public.assistant.started.openAction": "\nSitzung öffnen",
  "public.assistant.started.sessionLabel": "\nÖffentliche Sitzungs-ID",
  "public.assistant.started.restartAction": "\nEine weitere Sitzung starten",
  "public.assistant.started.nextStepsTitle": "\nNächste Schritte",
  "public.assistant.started.nextStep.session":
    "\nSetzen Sie die Live-Sitzung fort, um Klarstellungen zu erfassen und den Kontext des Käufers beizubehalten.",
  "public.assistant.started.nextStep.context":
    "\nKehren Sie zur aktuellen Seite zurück, wenn Sie den Umfang, die RFQ-Details oder den Katalogkontext aktualisieren müssen.",
  "public.assistant.started.nextStep.handoff":
    "\nEskalieren Sie innerhalb der Sitzung, wenn eine Überprüfung durch den Bediener oder eine öffentliche Übergabe erforderlich ist.",
  "public.assistant.workspace.eyebrow": "\nÖffentliche Assistentensitzung",
  "public.assistant.workspace.summaryTitle": "\nSitzungszusammenfassung",
  "public.assistant.workspace.sessionBadge": "\nLive-Sitzung",
  "public.assistant.workspace.sessionIdLabel": "\nSitzungs-ID",
  "public.assistant.workspace.contextLabel": "\nErfasster Kontext",
  "public.assistant.workspace.messageCountLabel": "\nErfasste Nachrichten",
  "public.assistant.workspace.participantCountLabel": "\nTeilnehmer",
  "public.assistant.workspace.linkedRecordCountLabel": "\nVerknüpfte Datensätze",
  "public.assistant.workspace.sameThreadLabel": "\nThread-Modell",
  "public.assistant.workspace.sameThreadValue": "\nEinzelner persistenter Thread",
  "public.assistant.workspace.completenessLabel": "\nVollständigkeit",
  "public.assistant.workspace.completenessReady": "\nBereit zur kommerziellen Übergabe",
  "public.assistant.workspace.completenessNeedsWork": "\nVor der Übergabe mehr Umfang erfassen",
  "public.assistant.workspace.historyTitle": "\nSitzungsverlauf",
  "public.assistant.workspace.historyStartedTitle": "\nGespräch begonnen",
  "public.assistant.workspace.historyStartedEmpty": "\nWarten auf die erste erfasste Nachricht.",
  "public.assistant.workspace.historyStartedDescription":
    "\nDie erste bereichsbezogene Nachricht wurde bei {timestamp}.",
  "public.assistant.workspace.historyLatestTitle": " erfasst.\nLetztes Update",
  "public.assistant.workspace.historyLatestEmpty": "\nEs wurde noch kein Follow-up aufgezeichnet.",
  "public.assistant.workspace.historyLatestDescription":
    "\n{author} hat das neueste Update unter {timestamp}.",
  "public.assistant.workspace.historyTranscriptTitle": " gepostet\nTranskriptabdeckung",
  "public.assistant.workspace.historyTranscriptDescription":
    "{count} Transkripteinträge stehen zum Export und zur Überprüfung zur Verfügung.",
  "public.assistant.workspace.historyParticipantsTitle": "\nTeilnehmerkontinuität",
  "public.assistant.workspace.historyParticipantsDescription":
    "\n{participants} Teilnehmerprofile werden an denselben persistenten Thread angehängt.",
  "public.assistant.workspace.historyShareTitle": "\nGeteilter Datensatz",
  "public.assistant.workspace.historyShareEmpty":
    "\nEs ist noch kein zugehöriger RFQ- oder Katalogdatensatz verknüpft.",
  "public.assistant.workspace.historyShareDescription":
    "\nVerknüpft mit {record} für die nächste Workflow-Übergabe.",
  "public.assistant.workspace.historyCloseoutTitle": "\nGlattstellungsbereitschaft",
  "public.assistant.workspace.historyCloseoutReady":
    "\nDie Sitzung verfügt über genügend Kontext zum Exportieren, Teilen und Weiterleiten an den nächsten Workflow.",
  "public.assistant.workspace.historyCloseoutPending":
    "\nErfassen Sie etwas mehr Umfang oder Verknüpfung, bevor Sie diese Sitzung als übergabebereit behandeln.",
  "public.assistant.workspace.exportTranscript": "\nTranskript exportieren",
  "public.assistant.transcript.documentTitle": "\nAssistententranskript",
  "public.assistant.transcript.eyebrow": "\nÖffentlicher Assistent",
  "public.assistant.transcript.description":
    "\nVollständiger Nachrichtenverlauf für diese Sitzung. Drucken oder als PDF speichern über den Browser.",
  "public.assistant.transcript.backToConversation": "\nZurück zur Unterhaltung",
  "public.assistant.transcript.fallbackTitle": "\nSitzung {id}",
  "public.assistant.transcript.tableAria": "\nGesprächstranskript",
  "public.assistant.transcript.colTime": "\nZeit",
  "public.assistant.transcript.colAuthor": "\nSprecher",
  "public.assistant.transcript.colMessage": "\nNachricht",
  "public.assistant.transcript.emptyTitle": "\nNoch keine Nachrichten",
  "public.assistant.transcript.emptyDescription":
    "\nNachrichten erscheinen hier, sobald der Assistent Antworten in dieser Sitzung erfasst.",
  "public.assistant.transcript.notFoundTitle": "\nSitzung nicht verfügbar",
  "public.assistant.transcript.notFoundDescription":
    "\nDiese Unterhaltung konnte nicht geladen werden. Sie ist möglicherweise abgelaufen oder der Link ist falsch.",
  "public.assistant.workspace.shareSummary": "\nZusammenfassung teilen",
  "public.assistant.workspace.shareHistoryHint":
    "\nTeilen Sie die Thread-Zusammenfassung oder exportieren Sie das Transkript, bevor Sie die Aufnahme in einen nachgelagerten Workflow verschieben.",
  "public.assistant.workspace.shareSubject":
    "\nZusammenfassung der öffentlichen Assistenten: {title}",
  "public.assistant.workspace.continuityTitle": "\nKontinuitätsschnappschuss",
  "public.assistant.workspace.continuityDescription":
    "\nHalten Sie den Live-Sitzungskontext, verknüpfte Datensätze und die letzte Antwort vor der Übergabe sichtbar.",
  "public.assistant.workspace.continuityContextLabel": "\nSeitenkontext",
  "public.assistant.workspace.continuityParticipantsValue": "\n{count} Teilnehmer",
  "public.assistant.workspace.continuityContextFallback":
    "\nDieser öffentlichen Assistentensitzung ist noch kein Seitenkontext zugeordnet.",
  "public.assistant.workspace.continuityLinkedLabel": "\nVerknüpfte Datensätze",
  "public.assistant.workspace.continuityLinkedValue": "\n{count} verknüpfte Datensätze",
  "public.assistant.workspace.continuityLatestLabel": "\nLetzte Antwort",
  "public.assistant.workspace.continuityLatestValue": "\n{author} antwortete unter {timestamp}.",
  "public.assistant.workspace.handoffTitle": "\nSo funktioniert die Übergabe",
  "public.assistant.workspace.handoffDescription":
    "\nNutzen Sie diese Sitzung, um den Umfang zu erfassen, Anforderungen zu klären und in den Betrieb zu eskalieren, wenn eine kommerzielle Überprüfung erforderlich ist.",
  "public.assistant.workspace.stepCaptureTitle": "\nErfassungsbereich",
  "public.assistant.workspace.stepCaptureDescription":
    "\nBehalten Sie Käuferumfang, Termine, Genehmigungen und Einschränkungen in derselben dauerhaften Sitzung bei.",
  "public.assistant.workspace.stepClarifyTitle": "\nKlären Sie mit AI",
  "public.assistant.workspace.stepClarifyDescription":
    "\nVerwenden Sie Zusammenfassungen und Antworten, um die Anfrage zu präzisieren, ohne den bestehenden Thread-Kontext zu verlieren.",
  "public.assistant.workspace.stepEscalateTitle": "\nSauber eskalieren",
  "public.assistant.workspace.stepEscalateDescription":
    "\nErstellen Sie eine Übergabenotiz, wenn die Sitzung zur internen Überprüfung durch den Bediener bereit ist.",
  "public.assistant.workspace.composeDescription":
    "\nFügen Sie dauerhafte Sitzungsnotizen hinzu, damit Umfang, Liefertermine und Genehmigungen mit demselben Aufnahmethread verknüpft bleiben.",
  "public.assistant.workspace.composeHint":
    "\nErfassen Sie hier den Kontext des Käufers, bevor Sie eine Übergabe durch den Operator anfordern.",
  "public.assistant.workspace.aiActionsDescription":
    "\nVerwenden Sie Zusammenfassungen, um den Thread zu straffen, und Übergabenotizen, um die öffentliche Aufnahme in den Betrieb zu steigern.",
  "public.assistant.workspace.returnAction": "\nZurück zur Quellseite",
  "public.assistant.workspace.missingTitle": "\nÖffentliche Assistentensitzung nicht verfügbar",
  "public.assistant.workspace.missingDescription":
    "Die angeforderte Assistentensitzung konnte nicht geladen werden. Kehren Sie zur Katalogdetail- oder RFQ-Seite zurück, um eine neue Sitzung zu starten.",
  "public.catalog.card.track": "\nServicegleis",
  "public.catalog.card.viewScope": "\nScope",
  "public.catalog.card.requestQuote": " anzeigen\nAngebot anfordern",
  "public.catalog.card.deliverables": "Leistungen",
  "public.home.page.title":
    "\nEine Plattform für Bedarfserfassung, Lieferkontrolle und Partnertransparenz.",
  "public.home.page.description":
    "\n{brandName} verwandelt verstreute Anfragen in nachverfolgte Aufträge.",
  "public.home.hero.badge": "\nÖffentliche Website, Betrieb, Portal, KI und UCP",
  "public.home.hero.title":
    "\nVerwandeln Sie Anfragen, Bestellungen, Außendienst, Beschaffung und Berichterstattung in einen zusammenhängenden Betriebsablauf.",
  "public.home.hero.description":
    "\nDonnerstag einreichen, Freitag genehmigt, bis zur Rechnung verfolgt.",
  "public.home.hero.primaryCta": "\nStarten Sie eine RFQ",
  "public.home.hero.secondaryCta": "\nDurchsuchen Sie Lösungen",
  "public.home.hero.stat.documents": "\nDokumenttypen",
  "public.home.hero.stat.documentsValue": "6",
  "public.home.hero.stat.surfaces": "\nOberflächen",
  "public.home.hero.stat.surfacesValue": "4",
  "public.home.hero.stat.surfacesDesc": "Web, API, Portal, UCP",
  "public.home.hero.stat.database": "\nArbeitsbereiche",
  "public.home.hero.stat.databaseValue": "3",
  "public.home.hero.stat.databaseDesc": "Betrieb, Handel, Portal",
  "public.home.delivery.eyebrow": "\nLiefermodell",
  "public.home.delivery.title": "\nZitiert, umfangreich, für Partner sichtbar.",
  "public.home.delivery.step.submit": "\nRFQ senden",
  "public.home.delivery.step.qualify": "\nQualifizieren und zitieren",
  "public.home.delivery.step.convert": "\nIn order",
  "public.home.delivery.step.track": " umwandeln\nAusführung und Rechnungsstellung verfolgen",
  "public.home.map.aria": "\nZusammenfassung der Plattformfähigkeit",
  "public.home.map.intake.title": "\nAufnahme",
  "public.home.map.intake.value": "\nÖffentliche Website und UCP",
  "public.home.map.intake.description":
    "\nErfassen Sie Anfragen von Käufern, Partnern und maschinengestützten Checkout-Abläufen.",
  "public.home.map.documents.title": "\nDokumente",
  "public.home.map.documents.value": "\nRFQs zu Rechnungen",
  "public.home.map.documents.description":
    "\nBehalten Sie Preisgestaltung, Genehmigungen, Erfüllung, Beschaffung und Abrechnung in einem Dokumentpfad bei.",
  "public.home.map.operations.title": "\nOperationen",
  "public.home.map.operations.value": "\nVermögenswerte, Arbeit und Telemetrie",
  "public.home.map.operations.description":
    "\nTeams entsenden, Aktivität überwachen, Abschluss erfassen.",
  "public.home.map.intelligence.title": "\nIntelligenz",
  "public.home.map.intelligence.value": "\nKI, Automatisierung und ML",
  "public.home.map.intelligence.description":
    "\nKI-Zusammenfassungen, geplante Aktionen, Engpassvorhersagen.",
  "public.home.flow.eyebrow": "\nGeschäftsablauf",
  "public.home.flow.title": "\nWie sich Arbeit über die Plattform bewegt",
  "public.home.flow.description":
    "\n{brandName} sorgt dafür, dass Bedarfserfassung, Lieferung, Partnersichtbarkeit und Folgeaktionen im selben Datensatz erfolgen, anstatt die Arbeit über nicht verbundene Tools hinweg erneut einzugeben.",
  "public.home.flow.step.capture.label": "\nCapture",
  "public.home.flow.step.capture.content":
    "\nKunden, Partner oder Maschinenkunden beginnen mit dem Katalog-, RFQ- oder UCP-Checkout-Kontext.",
  "public.home.flow.step.qualify.label": "\nQualifizieren",
  "public.home.flow.step.qualify.content": "\nUmfang, Zeitplan und Preise festlegen.",
  "public.home.flow.step.deliver.label": "\nLiefern",
  "public.home.flow.step.deliver.content": "\nArbeitsauftrag erstellt, Portal aktualisiert.",
  "public.home.flow.step.improve.label": "\nVerbessern",
  "public.home.flow.step.improve.content": "\nWarnungen, Prognosen und Compliance-Bewertungen.",
  "public.home.flow.card.eyebrow": "\nExtern beginnen, mit control",
  "public.home.flow.card.title":
    " abschließen\nBeginnen Sie mit dem geschäftlichen Bedarf, nicht mit einer weiteren unzusammenhängenden Form.",
  "public.home.flow.card.description":
    "\nDie öffentliche Aufnahme bleibt mit nachgelagerten Dokumenten, Erfüllungsnachweisen, Portalaktualisierungen und Rechnungsstatus verbunden.",
  "public.home.flow.card.cta": "\nStarten Sie eine RFQ",
  "public.home.surfaces.eyebrow": "\nPlattformoberflächen",
  "public.home.surfaces.title": "\nEine Plattform, vier verbundene Wege in",
  "public.home.surfaces.description":
    "\nUnterschiedliche Zielgruppen nutzen unterschiedliche Arbeitsbereiche, aber sie sind alle auf denselben zugrunde liegenden Geschäftsdatensatz angewiesen.",
  "public.home.surfaces.public.eyebrow": "\nÖffentlich",
  "public.home.surfaces.public.title": "\nÖffentliche Website und Maschinenhandel",
  "public.home.surfaces.public.description":
    "\nNutzen Sie Katalogseiten, RFQ-Annahme und UCP-Händler-Endpunkte, um die Nachfrage von Käufern oder Maschinen anzukurbeln.",
  "public.home.surfaces.commerce.eyebrow": "\nKommerziell",
  "public.home.surfaces.commerce.title": "\nKommerzielle Kontrolle",
  "public.home.surfaces.commerce.description":
    "\nHalten Sie RFQs, Kundenbestellungen, Bestellungen, Arbeitsaufträge und Rechnungen miteinander verbunden, anstatt sie in verschiedenen Tools erneut einzugeben.",
  "public.home.surfaces.operations.eyebrow": "\nOperationen",
  "public.home.surfaces.operations.title": "\nOperative Lieferung",
  "public.home.surfaces.operations.description":
    "\nVerwalten Sie Anlagen, Aufgaben, Planung, Finanzen, Nutzung, Flotte, Gebäude, Sensoren und die Überwachung digitaler Zwillinge.",
  "public.home.surfaces.portal.eyebrow": "\nPortal",
  "public.home.surfaces.portal.title": "\nSichtbarkeit auf Partnerebene",
  "public.home.surfaces.portal.description":
    "\nBieten Sie Kunden und Partnern gemeinsame Statuseinsicht und Chat, ohne den gesamten internen Arbeitsbereich freizugeben.",
  "public.home.persona.eyebrow": "\nWählen Sie Ihren Ausgangspunkt",
  "public.home.persona.title":
    "\nLeiten Sie jede Zielgruppe zuerst in den richtigen Arbeitsbereich",
  "public.home.persona.description":
    "\nKäufer sollten mit der Bereichserfassung beginnen, Bediener sollten im Befehlsarbeitsbereich landen und Partner sollten das gemeinsame Portal betreten, ohne über zusätzliche Bildschirme suchen zu müssen.",
  "public.home.persona.buyer.eyebrow": "\nKäufer",
  "public.home.persona.buyer.title": "\nErfassen Sie eine Anforderung und gehen Sie direkt zu RFQ",
  "public.home.persona.buyer.description": "\nDurchsuchen, vergleichen und Angebot anfordern.",
  "public.home.persona.buyer.action": "Käuferaufnahme starten",
  "public.home.persona.operations.eyebrow": "\nBetreiber",
  "public.home.persona.operations.title": "\nZurück zum Live-Betriebsarbeitsbereich",
  "public.home.persona.operations.description": "\nEntsenden, überwachen und Abschluss bestätigen.",
  "public.home.persona.operations.action": "\nArbeitsbereich „Operationen“ öffnen",
  "public.home.persona.partner.eyebrow": "\nPartner",
  "public.home.persona.partner.title":
    "\nMelden Sie sich mit dem richtigen Konto beim Partnerportal an",
  "public.home.persona.partner.description":
    "\nLieferungen verfolgen und Rechnungen herunterladen.",
  "public.home.persona.partner.action": "\nOffener Partnerzugang",
  "public.home.catalog.eyebrow": "\nKatalog",
  "public.home.catalog.title": "\nServicegleise, die auf dem gleichen Betriebsmodell basieren",
  "public.home.catalog.description":
    "\nDiese öffentlichen Angebote zeigen, wie die Plattform allgemeine Serviceanträge in eine kontrollierte Lieferung und eine für den Partner sichtbare Ausführung umwandelt.",
  "public.home.catalog.seeAll": "\nAlle Angebote ansehen",
  "public.home.catalog.compareTitle":
    "\nVergleichen Sie die operative Passung, bevor Sie ein Angebot öffnen",
  "public.home.catalog.continuityTitle":
    "\nHalten Sie die Auswahlliste stabil, während die Aufnahme weiterläuft",
  "public.home.catalog.fitLabel": "\nOperative Passung",
  "public.home.intelligence.eyebrow": "\nIntelligenzschicht",
  "public.home.intelligence.title":
    "\nKI, Berichterstellung, Automatisierung und ML bleiben mit denselben Datensätzen verbunden",
  "public.home.intelligence.description":
    "\nBei diesen Funktionen handelt es sich nicht um separate Produkte oder Exporte. Sie verwenden dieselben Aufträge, Arbeiten, Telemetriedaten und denselben Partnerkontext, mit denen Teams bereits arbeiten.",
  "public.home.intelligence.supportTitle": "\nWas mit demselben Datensatz verbunden bleibt",
  "public.home.intelligence.ai.eyebrow": "\nKI-Assistent",
  "public.home.intelligence.ai.title": "\nKI, die im Geschäftskontext funktioniert",
  "public.home.intelligence.ai.description":
    "\nFassen Sie Anfragen zusammen, erläutern Sie den Kontext, vergleichen Sie verwandte Aktivitäten und helfen Sie Teams bei der Auswahl des nächsten operativen Schritts.",
  "public.home.intelligence.reporting.eyebrow": "\nReporting und Datenwissenschaft",
  "public.home.intelligence.reporting.title":
    "\nBerichte und Datenwissenschaft, die nah an der Umsetzung bleiben",
  "public.home.intelligence.reporting.description":
    "\nErstellen Sie Berichtspakete, Betriebsüberprüfungen, Prognosen und Anomalieansichten, ohne die Arbeit in ein zweites System zu verlagern.",
  "public.home.intelligence.automation.eyebrow": "\nAutomatisierung",
  "public.home.intelligence.automation.title": "\nAutomatisierung auf derselben Steuerungsebene",
  "public.home.intelligence.automation.description":
    "\nLösen Sie Bun-native Workflows, geplante Folgemaßnahmen und ML-gestützte Aktionen über dieselbe Steuerungsebene aus.",
  "public.home.cta.title":
    "\nSind Sie bereit, Aufnahme, Lieferung, Berichterstattung und Partnersichtbarkeit zu verbinden?",
  "public.home.cta.description":
    "\nBeginnen Sie mit einer Angebotsanfrage, wenn Sie die Anforderung bereits kennen, oder durchsuchen Sie den Katalog, wenn Sie zuerst die Service-Tracks sehen möchten.",
  "public.home.cta.primary": "\nStarten Sie eine RFQ",
  "public.home.cta.secondary": "\nDurchsuchen Sie Lösungen",
  "public.catalog.index.eyebrow": "\nKatalog",
  "public.catalog.index.title": "\nDokumentgesteuerte Betriebsangebote",
  "public.catalog.index.description":
    "Wählen Sie den Betriebspfad aus, der zum Bestand, zum Anbieter oder zur Serviceanforderung passt, und starten Sie dann die Ausschreibung im richtigen Kontext.",
  "public.catalog.detail.eyebrow": "\nKatalogdetail",
  "public.catalog.detail.startRfq": "\nRFQ",
  "public.catalog.detail.backToCatalog": "\nZurück zum Katalog",
  "public.catalog.detail.includedTitle": "\nWas ist enthalten",
  "public.catalog.detail.whyTitle": "\nWarum RFQ-first",
  "public.catalog.detail.tab.scope": "\nGeltungsbereich",
  "public.catalog.detail.tab.approval": "\nGenehmigung",
  "public.catalog.detail.tab.delivery": "\nLieferung",
  "public.catalog.detail.summaryTitle": "\nZusammenfassung der Entscheidung",
  "public.catalog.detail.summaryScopeValue": "\nScoping bereit",
  "public.catalog.detail.summaryApprovalValue": "\nKommerzielle Rezension ausgerichtet",
  "public.catalog.detail.summaryDeliveryValue": "\nÜbergabe vorbereitet",
  "public.catalog.detail.shortlistLabel": "\nHaltung vergleichen",
  "public.catalog.detail.shortlistSelectedValue": "\nBereits auf der Shortlist",
  "public.catalog.detail.shortlistAvailableValue": "\nVerfügbar zum Vergleichen und Bundle",
  "public.catalog.detail.continuityLabel": "\nKontinuität",
  "public.catalog.detail.continuityBundled": "\nBündeln Sie diesen Service im gemeinsamen RFQ",
  "public.catalog.detail.continuitySingle": "\nTragen Sie diesen Service in eine einzige RFQ",
  "public.catalog.detail.shareHistoryTitle": " ein.\nTeilen und Vortrag",
  "public.catalog.detail.shareHistoryDescription":
    "\nBehalten Sie den gleichen Servicekontext bei, während Sie das Briefing exportieren, das Paket teilen und in den RFQ- oder Assistenten-Workflow wechseln.",
  "public.catalog.detail.shareHistoryShortlistTitle": "\nShortlist Haltung",
  "public.catalog.detail.shareHistoryShortlistReady":
    "\nDieser Service ist bereits in der engeren Auswahl und kann in der gemeinsamen Ausschreibung gebündelt werden.",
  "public.catalog.detail.shareHistoryShortlistSingle":
    "\nDieser Service kann als Einzelservice-Anfrage beginnen und später erweitert werden, ohne dass der Kontext verloren geht.",
  "public.catalog.detail.shareHistoryBriefTitle": "\nKurzer Export",
  "public.catalog.detail.shareHistoryBriefDescription":
    "\nExportieren Sie das Briefing, wenn interne Prüfer die Servicezusammenfassung vor Beginn der Angebotsanfrage benötigen.",
  "public.catalog.detail.shareHistoryAssistantTitle": "\nAssistentenübergabe",
  "public.catalog.detail.shareHistoryAssistantDescription":
    "\nVerwenden Sie den Assistenten-Start- und Bundle-Pfad {href}, um den gleichen Dienstkontext an die nächste Aufnahme anzuhängen.",
  "public.catalog.detail.checklistScope": "\nBestätigen Sie den Betriebsumfang",
  "public.catalog.detail.checklistApproval":
    "\nPreisgestaltung und Genehmigungsstatus aufeinander abstimmen",
  "public.catalog.detail.checklistHandoff":
    "\nÜbertragen Sie den Kontext in die Ausschreibung oder die Überprüfung durch den Assistenten",
  "public.catalog.detail.exportBrief": "\nKurzbeschreibung exportieren",
  "public.catalog.detail.sharePack": "\nTeilen pack",
  "public.catalog.detail.whyDescription":
    "\nDie Ausschreibung erfasst den Umfang, die Kundenkontakte, die gewünschten Termine und den kommerziellen Kontext im Voraus, wodurch nachgelagerte Arbeitsaufträge und Rechnungen im gleichen Dokumentenpfad verankert bleiben.",
  "public.catalog.compare.title": "\nAuswahl treffen und vergleichen",
  "public.catalog.compare.description":
    "\nHalten Sie eine kleine Arbeitsauswahlliste sichtbar, während Sie Service-Tracks vergleichen, und übertragen Sie dann den ausgewählten Umfang in eine gebündelte Angebotsanfrage.",
  "public.catalog.compare.shortlistLabel": "\nArbeitsauswahlliste",
  "public.catalog.compare.shortlistValue": "\n{count} Dienste sichtbar",
  "public.catalog.compare.bundleLabel": "\nRFQ-Übertrag",
  "public.catalog.compare.bundleValue": "\nÜbertragen Sie den ausgewählten Bereich in eine Anfrage",
  "public.catalog.compare.compareLabel": "\nVergleichsmodus",
  "public.catalog.compare.compareValue":
    "\nRezensionstitel, Zusammenfassung und Highlights nebeneinander",
  "public.catalog.compare.continuityLabel": "\nKontinuitätshaltung",
  "public.catalog.compare.continuityReady": "\nAuswahlliste bereit für gebündeltes RFQ",
  "public.catalog.compare.continuityWaiting": "Fügen Sie zuerst Dienste zur Auswahlliste hinzu",
  "public.catalog.compare.continuityPanelTitle": "\nKontinuität der Auswahlliste",
  "public.catalog.compare.continuityPanelDescription":
    "\nDie Auswahlliste folgt demselben öffentlichen Arbeitsablauf, sodass die Vergleichsarbeit über erneute Besuche, Anmeldungen und RFQ-Übertragungen hinweg fortgesetzt werden kann.",
  "public.catalog.compare.continuityPersistTitle": "\nShortlist beibehalten",
  "public.catalog.compare.continuityPersistReady":
    "\nDie aktuelle Auswahlliste ist bereits aktiv und bereit zum Vergleich oder zur Übertragung der Angebotsanfrage.",
  "public.catalog.compare.continuityPersistWaiting":
    "\nFügen Sie den ersten Dienst hinzu, um die persistente Auswahlliste für diesen Workflow zu starten.",
  "public.catalog.compare.continuityMergeTitle": "\nBei der Anmeldung zusammenführen",
  "public.catalog.compare.continuityMergeDescription":
    "\nAnonyme Auswahllisten werden mit der angemeldeten Auswahlliste zusammengeführt, wenn derselbe Benutzer die Aufnahme fortsetzt.",
  "public.catalog.compare.continuityBundleTitle": "\nBündel Downstream",
  "public.catalog.compare.continuityBundleDescription":
    "\nÜbertragen Sie die in die engere Wahl gezogenen Dienste in eine Ausschreibung, anstatt die Vergleichsentscheidung später erneut zu erstellen.",
  "public.catalog.compare.progressTitle": "\nWorkflow vergleichen",
  "public.catalog.compare.progressDescription":
    "\nWählen Sie die Auswahlliste, vergleichen Sie die sichtbaren Optionen und bündeln Sie dann den ausgewählten Bereich in der RFQ.",
  "public.catalog.compare.workspaceHint":
    "\nÜberprüfen Sie jeden Dienst auf demselben Bildschirm, bevor Sie ihn fortsetzen.",
  "public.catalog.compare.stepShortlist": "\nAuswahlliste",
  "public.catalog.compare.stepCompare": "\nVergleichen",
  "public.catalog.compare.stepBundle": "\nBündel RFQ",
  "public.catalog.compare.priceLabel": "\nRichtpreis",
  "public.catalog.compare.bundleAction": "\nBundle in die engere Wahl gezogener Umfang",
  "public.catalog.compare.empty":
    "\nWählen Sie hier Dienste aus, um die Vergleichsleiste dauerhaft zu halten.",
  "public.catalog.shortlist.add": "\nZur Auswahlliste hinzufügen",
  "public.catalog.shortlist.remove": "\nAus der Auswahlliste entfernen",
  "public.rfq.eyebrow": "\nAngebotsanfrage",
  "public.rfq.title": "\nErfassen Sie die Arbeit, bevor sie beginnt.",
  "public.rfq.description":
    "\nReichen Sie einmalig den Betriebsbedarf ein. Wir verwenden es, um den Umfang und die Preise für die Arbeit zu qualifizieren und die Nachverfolgbarkeit der Partnerlieferungen bis zur Erfüllung sicherzustellen.",
  "public.rfq.bundle.label": "\nGebündelte Dienste",
  "public.rfq.bundle.loaded": "\nGebündelter Bereich für {services}.",
  "public.rfq.bundle.returnToCatalog": " geladen\nZurück zum gebündelten Katalogumfang",
  "public.rfq.bundle.summarySingle": "\nFordern Sie ein Angebot für {title}.",
  "public.rfq.bundle.summaryMultiple":
    " an\nFordern Sie ein Angebot für den gebündelten Umfang an: {titles}.",
  "public.rfq.bundle.titleSingle": "\nAngebotsanfrage für {title}",
  "public.rfq.bundle.titleMultiple": "\nAngebotsanfrage für {primary} + {count} mehr",
  "public.rfq.form.aria": "\nAngebotsanfrageformular",
  "public.rfq.form.title": "\nTitel anfordern",
  "public.rfq.form.summary": "\nBetriebszusammenfassung",
  "public.rfq.form.contactEmail": "\nKontakt-E-Mail",
  "public.rfq.form.requestedBy": "\nAngefordert von",
  "public.rfq.form.budget": "\nBudgetberatung",
  "public.rfq.form.requirements": "\nAnforderungen oder Einzelposten",
  "public.rfq.form.requirementsPlaceholder": "\nEine Anforderung pro Zeile",
  "public.rfq.submit": "\nRFQ senden",
  "public.rfq.reviewCatalog": "\nRezensionskatalog",
  "public.rfq.workspace.title": "\nRFQ-Arbeitsbereich",
  "public.rfq.workspace.description":
    "\nErfassen Sie die Betriebszusammenfassung, die Anforderungsdetails und den kommerziellen Zeitplan in einem abgestuften Arbeitsbereich, bevor die Anfrage nachgelagert konvertiert wird.",
  "public.rfq.workspace.fact.scopeLabel": "\nScope-Haltung",
  "public.rfq.workspace.fact.scopeValue": "\nKäuferbrief in Bearbeitung",
  "public.rfq.workspace.fact.responseLabel": "\nAntwortmodell",
  "public.rfq.workspace.fact.responseValue": "Qualifizierung, Angebot und Portal-Follow-up",
  "public.rfq.workspace.draftTitle": "\nEntwurfsarbeitsbereich",
  "public.rfq.workspace.draftDescription":
    "\nDiese Angebotsanfrage bleibt im Entwurf, bis Sie sie absenden. Nutzen Sie zunächst den Assistenten und die Katalogüberprüfung, um das Briefing zu verfeinern.",
  "public.rfq.workspace.draftStatusLabel": "\nEntwurfsstatus",
  "public.rfq.workspace.draftStatusValue": "\nArbeitsentwurf",
  "public.rfq.workspace.resumeLabel": "\nLebenslaufpfad",
  "public.rfq.workspace.resumeValue": "\nLassen Sie den gleichen Anforderungskontext hier geöffnet",
  "public.rfq.workspace.draftHint":
    "\nSpeichern Sie den Entwurf hier und kehren Sie dann zum gleichen Anforderungskontext zurück, ohne die Aufnahme neu zu erstellen.",
  "public.rfq.workspace.draftEmptyTitle": "Noch keine Felder ausgefüllt",
  "public.rfq.workspace.draftEmptyFields": "0 von 6 Feldern ausgefüllt",
  "public.rfq.workflow.progressLabel": "\nEntwurfsabschluss",
  "public.rfq.workflow.progressValue": "\n{percent}% abgeschlossen",
  "public.rfq.workflow.reviewStageLabel": "\nÜberprüfungsphase",
  "public.rfq.workflow.lastUpdatedLabel": "\nLetzte Aktualisierung",
  "public.rfq.workflow.collaboratorHeading": "\nStatus des Mitarbeiters",
  "public.rfq.workflow.collaboratorPending": "\nWarten auf Mitarbeiterkontakt",
  "public.rfq.workflow.collaboratorValue": "\nRezensent: {email}",
  "public.rfq.workflow.supportTitle": "\nHaltung zur Überprüfung und Zusammenarbeit",
  "public.rfq.workflow.supportDescription":
    "\nHalten Sie die aktuelle Überprüfungsphase, den Mitarbeiterstatus und die neueste Entwurfsaktualisierung sichtbar, bevor die Anfrage übermittelt wird.",
  "public.rfq.workflow.stage.capture": "\nErfassungsbereich",
  "public.rfq.workflow.stage.review": "\nRezensionsentwurf",
  "public.rfq.workflow.stage.ready": "\nBereit zur Übermittlung",
  "public.rfq.workflow.historyTitle": "\nEntwurfsaktivität",
  "public.rfq.workflow.historyDescription":
    "\n{count} Nachverfolgte Aktualisierungen halten die Anfrage in einem gemeinsamen Workflow-Verlauf.",
  "public.rfq.workflow.activity.placeholderTitle": "\nEntwurf gestartet",
  "public.rfq.workflow.activity.placeholderDescription":
    "\nHalten Sie die Käuferbeschreibung hier, bevor sie zu einer eingereichten Angebotsanfrage wird.",
  "public.rfq.workflow.activity.createdTitle": "\nEntwurf erstellt",
  "public.rfq.workflow.activity.createdDescription":
    "\n{actor} hat {requestNumber} als verfolgten Entwurf geöffnet.",
  "public.rfq.workflow.activity.updatedTitle": "\nEntwurf aktualisiert",
  "public.rfq.workflow.activity.updatedDescription":
    "\n{actor} hat das Briefing auf {progress} und {reviewStage} verschoben.",
  "public.rfq.workflow.systemActor": "\nSystemworkflow",
  "public.rfq.draft.save": "\nEntwurf speichern",
  "public.rfq.draft.saved": "\nGespeicherter Entwurf {requestNumber}.",
  "public.rfq.draft.loaded": "\nWiederaufgenommener Entwurf {requestNumber}.",
  "public.rfq.draft.resumeReady": "\nSetzen Sie die gespeicherte Käuferbeschreibung hier fort",
  "public.rfq.draft.fallbackTitle": "\nÖffentlicher RFQ-Entwurf",
  "public.rfq.draft.error.empty":
    "\nFügen Sie mindestens ein Feld hinzu, bevor Sie einen Entwurf speichern.",
  "public.rfq.workspace.checklist.summaryTitle": "\nFassen Sie den Betriebsbedarf zusammen",
  "public.rfq.workspace.checklist.summaryDescription":
    "\nBeschreiben Sie das kommerzielle Ziel, die betroffenen Standorte und die Dringlichkeit, damit die Triage im richtigen Geschäftskontext beginnt.",
  "public.rfq.workspace.checklist.requirementsTitle":
    "\nAnforderungen und Einzelpostendetails hinzufügen",
  "public.rfq.workspace.checklist.requirementsDescription":
    "\nListen Sie Einschränkungen, Mengen und Anhänge auf, bevor der Preis für die Anfrage festgelegt oder in Arbeit umgewandelt wird.",
  "public.rfq.workspace.checklist.handoffTitle": "\nBereiten Sie die Downstream-Übergabe vor",
  "public.rfq.workspace.checklist.handoffDescription":
    "\nBehalten Sie Kontakt, Termine und Budgetvorgaben im selben Datensatz bei, damit das nächste Team die Aufnahme nicht erneut startet.",
  "public.rfq.next.title": "\nWas passiert als nächstes",
  "public.rfq.next.step.qualify": "\nÜberprüfung der Qualifikation und Eignung vor Ort",
  "public.rfq.next.step.convert": "\nAngebots-, Auftrags- und Arbeitsauftragsumwandlung",
  "public.rfq.next.step.portal": "\nAktualisierungen des Partnerportals bis zur Fertigstellung",
  "public.rfq.workspace.stepDraft": "\nEntwurf",
  "public.rfq.workspace.stepReview": "\nRezension",
  "public.rfq.workspace.stepSubmit": "\nSenden",
  "public.rfq.workspace.stepPortal": "\nPortalübergabe",
  "public.rfq.thanks.alert": "\nRFQ {requestNumber} wurde erfolgreich übermittelt.",
  "public.rfq.thanks.title": "Ihre Anfrage befindet sich in der Triage.",
  "public.rfq.thanks.description":
    "\nBewahren Sie die Referenznummer für die Nachverfolgung auf. Wenn Ihr Team eine Portaleinladung erhält, wird dieselbe Anfrage im Verlauf des freigegebenen Dokuments angezeigt.",
  "public.rfq.thanks.returnCatalog": "\nZurück zum Katalog",
  "public.rfq.thanks.submitAnother": "\nSenden Sie eine weitere RFQ",
  "public.rfq.thanks.pending": "\nAusstehend",
  "public.rfq.thanks.nextTitle": "\nSetzen Sie die Anfrage fort, ohne den Kontext zu verlieren",
  "public.rfq.thanks.nextDescription":
    "\nLaden Sie Mitarbeiter ein, bewegen Sie unterstützende Dateien weiter und leiten Sie dieselbe Anfragenummer in die nächste Konversation weiter, anstatt eine zweite Aufnahme zu starten.",
  "public.rfq.thanks.collaborate": "\nMitarbeiter einladen",
  "public.rfq.thanks.collaborationSubject": "\nÜberprüfen Sie die Angebotsanfrage {requestNumber}",
  "public.rfq.thanks.collaborationBody":
    "\nRFQ {requestNumber} ist zur Überprüfung bereit. Bitte fahren Sie mit derselben Anfrage fort, anstatt eine neue Aufnahme zu beginnen.",
  "public.catalog.assetReliability.title": "\nAnlagenzuverlässigkeitsprogramme",
  "public.catalog.assetReliability.summary":
    "\nGeplante Wartung, Kritizitätstriage und Lebenszyklusausführung für verteilte Standorte.",
  "public.catalog.assetReliability.detail":
    "\nBündeln Sie Zuverlässigkeitsplanung, Arbeitsauftragsausführung und Berichterstattung in einem einzigen Betriebsrhythmus für Standorte und Außendienstteams.",
  "public.catalog.assetReliability.highlight1": "\nZuverlässigkeitsprüfungen und Backlog-Shaping",
  "public.catalog.assetReliability.highlight2": "\nStandortbezogene Arbeitsauftragsplanung",
  "public.catalog.assetReliability.highlight3":
    "\nFertigstellungsnachweise und Wiederherstellungsberichte",
  "public.catalog.procureToPay.title": "\nProcure-to-Pay-Vorgänge",
  "public.catalog.procureToPay.summary":
    "\nRFQ-, Bestell-, Empfangs- und Abrechnungsworkflows mit Partnertransparenz.",
  "public.catalog.procureToPay.detail":
    "\nVerlagern Sie die Beschaffung von isolierten Ereignissen in eine anbieterbewusste Dokumentenkontrolle mit Genehmigungs-, Empfangs- und Rechnungsverlauf.",
  "public.catalog.procureToPay.highlight1": "\nLieferanten-Onboarding und RFQ-Koordination",
  "public.catalog.procureToPay.highlight2": "\nVerfolgung des Bestelllebenszyklus",
  "public.catalog.procureToPay.highlight3":
    "\nSichtbarkeit von Belegen, Rechnungen und Durchlaufzeit",
  "public.catalog.fieldServices.title": "\nDokumentgesteuerte Außendienstdienste",
  "public.catalog.fieldServices.summary":
    "\nKundenaufträge, Arbeitsaufträge, Rechnungen und Portalaktualisierungen aus einem gemeinsamen Betriebsdiagramm.",
  "public.catalog.fieldServices.detail":
    "\nVerwandeln Sie eingehende Anforderungen in kontrollierte Arbeit, für den Partner sichtbare Fortschritte und rechnungsfertige Ausgaben, ohne die Abwicklung komplizierter zu machen.",
  "public.catalog.fieldServices.highlight1": "\nRFQ-zu-Auftrag-Konvertierung",
  "public.catalog.fieldServices.highlight2": "\nTaskCard-gestützte Ausführung",
  "public.catalog.fieldServices.highlight3": "\nRechnungs- und Zahlungsstatusverfolgung",
  "auth.signIn.title": "\nAnmelden",
  "auth.signIn.subtitle": "\nGreifen Sie auf die Betriebsplattform zu",
  "auth.signIn.pageTitle": "\nAnmelden – Betriebsplattform",
  "auth.signIn.moreDetailsSummary": "\nSitzungsdetails und weitere Anmeldeoptionen",
  "auth.signIn.ssoContinueLoading": "\nWird fortgesetzt…",
  "auth.signIn.heading": "\nWillkommen zurück",
  "auth.signIn.subheading": "\nMelden Sie sich an, um auf die Plattform zuzugreifen",
  "auth.signIn.email": "\nE-Mail-Adresse",
  "auth.signIn.emailLabel": "\nE-Mail-Adresse",
  "auth.signIn.emailPlaceholder": "\njane@company.com",
  "auth.signIn.password": "\nPasswort",
  "auth.signIn.passwordLabel": "\nPasswort",
  "auth.signIn.passwordPlaceholder": "\n••••••••",
  "auth.signIn.helper": "\nVerwenden Sie Ihre registrierten Anmeldeinformationen",
  "auth.signIn.loading": "\nAnmelden...",
  "auth.signIn.submit": "\nBeim Arbeitsbereich anmelden",
  "auth.signIn.forgotPassword": "\nPasswort vergessen?",
  "auth.signIn.unauthorized": "\nBitte melden Sie sich an, um fortzufahren.",
  "auth.required": "\nAuthentifizierung erforderlich.",
  "auth.signOut": "\nAbmelden",
  "dashboard.title": "\nBetriebs-Dashboard",
  "dashboard.subtitle": "\nLive-Performance und Intelligence-Zusammenfassung",
  "dashboard.welcome": "\nWillkommen zurück, {name}",
  "dashboard.kpi.assetHealth": "\nAnlagenzustand",
  "dashboard.kpi.openTasks": "\nOffene Aufgaben",
  "dashboard.kpi.predictionAlerts": "\nVorhersagewarnungen",
  "dashboard.kpi.utilisation": "\nAuslastung",
  "dashboard.kpi.spend": "\nHandelsausgaben",
  "dashboard.kpi.depreciation": "\nAbschreibungsrisiko",
  "dashboard.kpi.placeholderValue": "\nLoading",
  "dashboard.kpi.predictionsDueDescription": "\nVerbleibende Lebensdauer <= {days} Tage",
  "dashboard.kpi.totalAssetsDescription": "\nAuf allen Websites",
  "dashboard.kpi.activeTasksDescription": "\nRückstand, geplant und in Bearbeitung",
  "dashboard.kpi.utilisationDescription": "\nAbgeleitet aus durchschnittlichen Nutzungsstunden",
  "dashboard.kpi.noOverdueTasks": "\nKeine überfälligen Aufgaben",
  "dashboard.kpi.deadlinePassed": "\nFrist ist abgelaufen",
  "dashboard.kpi.depreciationDescription": "\nGesamter aktueller Buchwert",
  "dashboard.refresh": "\nAutomatische Aktualisierung alle {seconds} Sekunden",
  "dashboard.quickActions": "\nSchnellaktionen",
  "dashboard.quickActions.subtitle": "\nNavigieren Sie zu wichtigen Bereichen der Plattform",
  "dashboard.greeting.morning": "\nGuten Morgen, {name}",
  "dashboard.greeting.afternoon": "\nGuten Tag, {name}",
  "dashboard.greeting.evening": "\nGuten Abend, {name}",
  "dashboard.kpi.sectionTitle": "\nLeistungsmetriken",
  "dashboard.kpi.sectionSubtitle": "\nLive-Performance und Intelligence-Zusammenfassung",
  "dashboard.kpi.trendVsPreviousMonth": "\ngegenüber dem Vormonat",
  "dashboard.kpi.trendPendingComparison": "\nVergleichsdaten sind noch nicht verfügbar.",
  "dashboard.dateLabel": "\nHeute",
  "dashboard.chat.pageContext":
    "\nBetriebs-Dashboard. Wichtige Kennzahlen: {kpis}. Benutzerrolle: {role}.",
  "dashboard.quickAction.assets": "\nDurchsuchen Sie das Asset-Register",
  "dashboard.quickAction.addDevice": "\nNeues Gerät registrieren",
  "dashboard.quickAction.deviceHistory": "\nWartungsverlauf anzeigen",
  "dashboard.quickAction.digitalTwin": "\nEntdecken Sie den digitalen 3D-Zwilling",
  "dashboard.quickAction.tasks": "\nTaskboard verwalten",
  "dashboard.quickAction.kanban": "\nKanban-Board",
  "dashboard.quickAction.predictions": " ansehen\nKI-Vorhersagen und Warnungen",
  "dashboard.quickAction.utilisation": "\nAuslastungscockpit",
  "dashboard.quickAction.fleet": "\nFahrzeughaltung und Wartungslast",
  "dashboard.quickAction.buildings": "\nAnlagenabdeckung und Zwillingsbereitschaft",
  "dashboard.quickAction.sensors": "\nTelemetrieabdeckung und Gerätezustand",
  "dashboard.quickAction.reports": "\nBerichte erstellen",
  "dashboard.quickAction.finance": "\nAbschreibung und Bewertung",
  "dashboard.quickAction.financePlanning": "\nBudgets, Szenarien und Kapitallage",
  "dashboard.quickAction.admin": "\nSystemadministration",
  "dashboard.quickAction.apiExplorer": "\nAPI-Referenz",
  "dashboard.quickAction.profile": "\nIhr Profil",
  "dashboard.quickAction.customisation": "\nThema und Vorlieben",
  "assets.title": "\nVermögensregister",
  "assets.subtitle": "\nInfrastrukturanlagen durchsuchen, prüfen und selektieren",
  "assets.searchLabel": "\nAssets durchsuchen",
  "assets.searchPlaceholder": "\nGeben Sie den Asset-Namen, RFID oder Site",
  "assets.filterLabel": " ein.\nAnlagentyp",
  "assets.filterAll": "\nAlle Typen",
  "assets.savedView.label": "\nGespeicherte Ansicht",
  "assets.savedView.all": "\nAlle Assets",
  "assets.savedView.critical": "\nKritischer Zustand",
  "assets.savedView.fatiguing": "\nErmüdender Lebenszyklus",
  "assets.savedView.watch": "\nMerkliste",
  "assets.columnSet.label": "\nSpaltensatz",
  "assets.columnSet.description":
    "\nWechseln Sie die Spalten des Asset-Arbeitsbereichs zur Betriebs-, Portfolio- oder Governance-Perspektive.",
  "assets.columnSet.footer":
    "\nVerwenden Sie den Spaltensatz, der dem aktuellen Überprüfungskontext entspricht, bevor Sie den Arbeitsbereich exportieren oder freigeben.",
  "assets.columnSet.operations": "\nBetrieb",
  "assets.columnSet.portfolio": "\nPortfolio",
  "assets.columnSet.governance": "\nGovernance",
  "assets.compare.add": "\nZum Vergleich hinzufügen",
  "assets.compare.remove": "\nAus Compare",
  "assets.compare.title": " entfernen\nVergleichen Sie Tray",
  "assets.compare.description":
    "\nBehalten Sie bis zu {count} Assets nebeneinander bei, während Sie Zustand, Hierarchie und Site-Kontext überprüfen.",
  "assets.compare.emptyDescription":
    "Wählen Sie Assets aus der Tabelle aus, damit hier eine Live-Vergleichsleiste sichtbar bleibt.",
  "assets.compare.savedViewDescription":
    "\nHalten Sie den Kontext der gespeicherten Ansicht sichtbar, während Sie zwischen der Vergleichs- und der Spaltensatzperspektive wechseln.",
  "assets.compare.footer":
    "\nVergleichsauswahlen bleiben für einen gemeinsamen Überprüfungspfad mit der aktuellen Arbeitsbereichs-URL verknüpft.",
  "assets.filterApply": "\nFilter anwenden",
  "assets.kpi.total": "\nGesamtvermögen",
  "assets.kpi.critical": "\nKritischer Zustand",
  "assets.kpi.fatiguing": "\nErmüdender Lebenszyklus",
  "assets.summary.title": "\nVermögensportfolio",
  "assets.summary.description": "\nBasislinie des operativen Inventars",
  "assets.table.name": "\nAsset",
  "assets.table.type": "\nTyp",
  "assets.table.site": "\nSite",
  "assets.table.condition": "\nBedingung",
  "assets.table.hierarchy": "\nHierarchie",
  "assets.table.lifecycle": "\nLebenszyklus",
  "assets.table.bookValue": "\nBuchwert",
  "assets.table.lastInspection": "\nLetzte Inspektion",
  "assets.table.action": "\nAktion",
  "assets.table.open": "\nÖffnen",
  "assets.export.csv": "\nCSV",
  "assets.export.pdf": " exportieren\nPDF",
  "assets.export.id": "Kennung",
  "assets.export.purchaseDate": " exportieren\nKaufdatum",
  "assets.export.purchasePrice": "\nKaufpreis",
  "assets.export.rfidTag": "\nRFID-Tag",
  "assets.export.hierarchy": "\nHierarchieebene",
  "assets.export.parentAsset": "\nÜbergeordnetes Asset",
  "assets.export.capability": "\nFähigkeitsverknüpfung",
  "assets.export.utilisationHours": "\nNutzungsstunden",
  "assets.export.unsupportedFormat": "\nNicht unterstütztes Format. Verwenden Sie format=csv",
  "assets.inspector.aiPrompt":
    "\nÜberprüfen Sie Asset {name} bei {site}. Fassen Sie das aktuelle Risiko, die Bereitschaft und die nächstbeste Aktion aus dem ausgewählten Inspektorkontext zusammen.",
  "assets.workspace.summaryTitle": "Asset-Register",
  "assets.workspace.summarySupporting": "Alle Typen, alle Standorte",
  "assets.workspace.filterBarEyebrow": "Filter",
  "assets.workspace.filterBarTitle": "Assets finden und eingrenzen",
  "assets.workspace.filterBarDescription":
    "\nDie Suche aktualisiert das Register nach einer kurzen Eingangspause. Listenfelder wirken sofort; „Filter anwenden“ aktualisiert nach manuellen Änderungen.",
  "assets.inspector.emptyEyebrow": "Asset-Inspektor",
  "assets.inspector.emptyTitle": "Kein Asset ausgewählt",
  "assets.inspector.conditionLabel": "Zustand",
  "assets.inspector.openTasksLabel": "Offene Aufgaben",
  "assets.inspector.predictionsLabel": "Vorhersagen",
  "assets.inspector.emptyDescription":
    "\nWählen Sie eine Zeile aus dem Anlagenregister aus, um Risiko, Bereitschaft und empfohlene Maßnahmen zu überprüfen.",
  "assets.media.title": "\nFotos",
  "assets.media.empty": "\nNoch keine Fotos",
  "assets.media.upload": "\nFoto hochladen",
  "assets.media.viewImage": "\nBild ansehen",
  "assets.media.annotate": "\nKommentieren",
  "addDevice.title": "\nGerät",
  "addDevice.subtitle":
    "\nRegistrieren Sie ein neues Gerät und ordnen Sie es Ihrer Betriebsflotte zu",
  "addDevice.form.title": "\nGeräteregistrierung",
  "addDevice.form.nameLabel": "\nGerätename",
  "addDevice.form.serialLabel": "\nSerielles / HF-Signal",
  "addDevice.form.typeLabel": "\nGerätekategorie",
  "addDevice.form.siteLabel": "\nBereitstellungsstandort",
  "addDevice.form.sitePlaceholder": "\nWählen Sie einen Bereitstellungsstandort aus",
  "addDevice.form.siteHint":
    "\nWählen Sie aus {count} aktiven Standorten im Live-Betriebsregister.",
  "addDevice.form.siteLabelWithId": "\nBereitstellungsstandort / ID",
  "addDevice.form.lifecycleLabel": "\nLebenszyklusphase",
  "addDevice.form.lifecycleActive": "\nAktiv",
  "addDevice.form.lifecycleMonitor": "\nÜberwachung",
  "addDevice.form.lifecycleFatiguing": "\nErmüdend",
  "addDevice.form.lifecycleDisposed": "\nEntsorgt",
  "addDevice.form.lifecycleDefault": "\nAktiv",
  "addDevice.form.conditionLabel": "\nBedingung",
  "addDevice.form.conditionAny": "\nAny",
  "addDevice.form.gpsLatLabel": "\nGPS-Breitengrad",
  "addDevice.form.gpsLonLabel": "\nGPS-Längengrad",
  "addDevice.form.purchasePriceLabel": "\nKaufpreis",
  "addDevice.form.bookValueLabel": "\nBuchwert",
  "addDevice.form.requiredHint": "\nMit * gekennzeichnete Felder sind Pflichtfelder",
  "addDevice.form.submit": "\nGerät",
  "addDevice.validation.unauthorized": " erstellen\nKeine Berechtigung zum Erstellen von Geräten",
  "addDevice.validation.nameRequired": "\nGerätename ist erforderlich",
  "addDevice.validation.typeRequired": "\nGerätekategorie ist erforderlich",
  "addDevice.validation.siteRequired": "\nWebsite ist erforderlich",
  "addDevice.validation.locationRequired": "\nGPS-Koordinaten sind erforderlich",
  "addDevice.validation.locationInvalidRange": "\nGPS-Koordinaten liegen außerhalb der Grenzen",
  "addDevice.validation.numericValuesRequired": "\nKaufpreis und Buchwert müssen numerisch sein",
  "addDevice.validation.siteNotFound": "\nDie angegebene Site existiert nicht",
  "addDevice.validation.rfidUsed": "\nDas RF-Signal/RFID-Tag wird bereits verwendet",
  "addDevice.prerequisite.databaseUnavailableTitle":
    "\nFür die Geräteeinrichtung sind Live-Standortdaten erforderlich",
  "addDevice.prerequisite.siteUnavailableTitle":
    "\nFügen Sie eine aktive Site hinzu, bevor Sie Geräte registrieren",
  "addDevice.prerequisite.siteUnavailableDescription":
    "Erstellen Sie eine Basis oder Einrichtung im Arbeitsbereich des Anwesens und kehren Sie dann hierher zurück, um Geräte im Live-Site-Katalog zu registrieren oder zu importieren.",
  "addDevice.prerequisite.openEstate": "\nOffener Arbeitsbereich „Nachlass“",
  "addDevice.feedback.created": "\nGerät {name} erfolgreich registriert",
  "addDevice.form.postCreateNote":
    "\nFügen Sie nach der Registrierung Telemetriedaten, Fotos und Wartungsaktivitäten aus dem Anlagendatensatz hinzu.",
  "addDevice.massImport.title": "\nMassenimport",
  "addDevice.massImport.subtitle":
    "\nWählen Sie eine CSV-Datei zum Importieren von Gerätedatensätzen",
  "addDevice.massImport.acceptedTypes": "\nNur CSV-Dateien",
  "addDevice.massImport.maxFiles": "\nEine Datei nach der anderen",
  "addDevice.massImport.importing": "\nImportieren…",
  "addDevice.massImport.success": "\nImportierte {created} von {total} Geräten",
  "addDevice.massImport.partial": "\n{created} von {total} importiert. {failed} fehlgeschlagen.",
  "addDevice.massImport.error": "\nImport fehlgeschlagen: {message}",
  "addDevice.massImport.emptyFile": "\nCSV hat keine Datenzeilen",
  "addDevice.massImport.fileLabel": "\nCSV-Datei",
  "addDevice.massImport.submit": "\nGeräte importieren",
  "addDevice.massImport.downloadTemplate": "\nCSV-Vorlage herunterladen",
  "addDevice.massImport.editorTitle": "\nÜberprüfen und bearbeiten Sie Importinhalte",
  "addDevice.massImport.editorDescription":
    "\nLaden Sie eine CSV-Datei hoch, fügen Sie Tabellenzeilen ein oder bearbeiten Sie einzelne Zellen vor dem Import.",
  "addDevice.massImport.contentLabel": "\nInhalt importieren",
  "addDevice.massImport.contentPlaceholder":
    "\nFügen Sie hier CSV-Zeilen ein. Für den Direktimport ist die Kopfzeile erforderlich.",
  "addDevice.massImport.notesLabel": "\nRohnotizen für die KI-Analyse",
  "addDevice.massImport.notesPlaceholder":
    "\nFügen Sie Aufzählungslisten, kopierte Tabellen, E-Mails oder Technikernotizen ein und lassen Sie sie von der KI in importfertige Zeilen umwandeln.",
  "addDevice.massImport.parseWithAi": "\nMit AI",
  "addDevice.massImport.aiParsing": " analysieren\nInhalte werden analysiert…",
  "addDevice.massImport.aiSuccess": "\nKI hat {count} Importzeilen vorbereitet",
  "addDevice.massImport.aiError": "\nAI-Analyse fehlgeschlagen: {message}",
  "addDevice.massImport.gridTitle": "\nZelleneditor",
  "addDevice.massImport.addRow": "\nZeile",
  "addDevice.massImport.clearContent": " hinzufügen\nInhalt löschen",
  "addDevice.massImport.emptyGrid":
    "\nFügen Sie Inhalte ein oder analysieren Sie sie, um mit der Bearbeitung von Zeilen zu beginnen.",
  "addDevice.massImport.fileImported": "\nImportierte Datei in den Editor",
  "addDevice.massImport.parseEmpty": "\nFügen Sie Rohnotizen hinzu, bevor Sie AI-Parsing verwenden",
  "addDevice.massImport.invalidContent":
    "\nIm Editorinhalt wurden keine importierbaren Zeilen gefunden",
  "addDevice.massImport.templateSeed":
    "\nName,Typ,SiteName,rfidTag,gpsLat,gpsLon,purchasePrice,bookValue,condition,lifecycleStage",
  "addDevice.massImport.columns.name": "\nName",
  "addDevice.massImport.columns.type": "\nTyp",
  "addDevice.massImport.columns.siteName": "\nSite",
  "addDevice.massImport.columns.rfidTag": "\nRFID / Seriell",
  "addDevice.massImport.columns.gpsLat": "\nLatitude",
  "addDevice.massImport.columns.gpsLon": "\nLängengrad",
  "addDevice.massImport.columns.purchasePrice": "\nKaufpreis",
  "addDevice.massImport.columns.bookValue": "\nBuchwert",
  "addDevice.massImport.columns.condition": "\nBedingung",
  "addDevice.massImport.columns.lifecycleStage": "\nLebenszyklus",
  "addDevice.massImport.formatTableTitle": "\nImportformatreferenz",
  "addDevice.massImport.formatTableColumnName": "\nSpalte",
  "addDevice.massImport.formatTableColumnRequired": "\nErforderlich",
  "addDevice.massImport.formatTableColumnExample": "\nBeispiel",
  "addDevice.massImport.columns.required.name": "\nJa",
  "addDevice.massImport.columns.required.type": "\nJa",
  "addDevice.massImport.columns.required.siteName": "\nJa",
  "addDevice.massImport.columns.required.rfidTag": "\nNein",
  "addDevice.massImport.columns.required.gpsLat": "\nJa",
  "addDevice.massImport.columns.required.gpsLon": "\nJa",
  "addDevice.massImport.columns.required.purchasePrice": "\nJa",
  "addDevice.massImport.columns.required.bookValue": "\nJa",
  "addDevice.massImport.columns.required.condition": "\nNein",
  "addDevice.massImport.columns.required.lifecycleStage": "\nNein",
  "addDevice.massImport.columns.example.name": "\nSensoreinheit A1",
  "addDevice.massImport.columns.example.type": "TRAININGSBEREICH",
  "addDevice.massImport.columns.example.siteName": "\nSite Alpha",
  "addDevice.massImport.columns.example.rfidTag": "RF-00123 (Beispiel)",
  "addDevice.massImport.columns.example.gpsLat": "51.5074 (Beispiel)",
  "addDevice.massImport.columns.example.gpsLon": "-0.1278 (Beispiel)",
  "addDevice.massImport.columns.example.purchasePrice": "1200.00 (Beispiel)",
  "addDevice.massImport.columns.example.bookValue": "950.00 (Beispiel)",
  "addDevice.massImport.columns.example.condition": "\ngut",
  "addDevice.massImport.columns.example.lifecycleStage": "\naktiv",
  "addDevice.massImport.formatTableRequiredYes": "\nJa",
  "addDevice.massImport.formatTableRequiredNo": "\nNein",
  "addDevice.workflow.title": "\nGestaffelte Geräteüberprüfung",
  "addDevice.workflow.description":
    "\nRegistrieren Sie das Gerät, validieren Sie die Importzeilen und überprüfen Sie das Ergebnis vor der Übermittlung.",
  "deviceHistory.title": " hinzufügen\nGeräteverlauf",
  "deviceHistory.subtitle":
    "\nAktuelle Lebenszyklus- und Wartungsmaßnahmen in Ihrer gesamten Flotte",
  "deviceHistory.filterLabel": "\nFiltern nach Gerät",
  "deviceHistory.filter.assigneeLabel": "\nBeauftragter",
  "deviceHistory.filter.assigneePlaceholder": "\nSuche nach Beauftragter",
  "deviceHistory.filter.statusLabel": "\nStatus",
  "deviceHistory.filter.statusAll": "\nAlle Status",
  "deviceHistory.table.device": "\nGerät",
  "deviceHistory.table.event": "\nEreignis",
  "deviceHistory.table.timestamp": "\nZeitstempel",
  "deviceHistory.table.updatedAt": "\nAktualisiert um",
  "deviceHistory.table.status": "\nStatus",
  "deviceHistory.table.assignee": "\nBeauftragter",
  "deviceHistory.table.priority": "\nPriorität",
  "deviceHistory.table.ariaLabel": "\nEreignisse im Geräteverlauf",
  "deviceHistory.table.notes": "\nNotizen",
  "deviceHistory.table.emptyTitle": "\nNoch kein Geräteverlauf",
  "deviceHistory.table.emptyDescription":
    "Passen Sie die Filter an oder warten Sie, bis in diesem Feed neue Lebenszyklusaktivitäten angezeigt werden.",
  "deviceHistory.table.errorTitle": "\nGeräteverlauf nicht verfügbar",
  "deviceHistory.table.errorDescription":
    "\nDer Geräteverlaufs-Feed konnte nicht geladen werden. Wiederholen Sie die Anfrage.",
  "deviceHistory.decisionTitle": "\nDifferenz- und Anomalieüberprüfung",
  "deviceHistory.decisionDescription":
    "\nVergleichen Sie aktuelle Ereignisse, achten Sie auf Anomalien und exportieren Sie das Beweispaket.",
  "deviceHistory.eventTask": "\nAufgabenereignis",
  "deviceHistory.empty": "\nKeine Ereignisse im Geräteverlauf entsprechen Ihren Filtern.",
  "profile.title": "\nProfil",
  "profile.subtitle": "\nKontodetails und Rollenkontext",
  "profile.displayName": "\nAnzeigename",
  "profile.email": "\nE-Mail",
  "profile.role": "\nAktuelle Rolle",
  "profile.lastSignIn": "\nLetzte Anmeldung",
  "profile.lastSignInUnavailable": "Nicht verfügbar",
  "profile.workspaceHome": "\nArbeitsbereich home",
  "profile.activeSessions": "\nAktive Sitzungen",
  "profile.sessions.title": "\nAktive Sitzungen",
  "profile.sessions.subtitle": "\nLetzte Anmeldungen und Gerätekontext für Ihr Konto",
  "profile.sessions.empty": "\nKeine aktuellen Sitzungen aufgezeichnet",
  "profile.sessions.emptyDescription":
    "\nNach der Authentifizierung werden hier aktive und aktuelle Anmeldungen angezeigt.",
  "profile.sessions.current": "\nAktuelle Sitzung",
  "profile.sessions.unknownAddress": "\nUnbekanntes Netzwerk",
  "profile.sessions.unknownDevice": "\nUnbekanntes Gerät",
  "profile.sessions.started": "\nBegonnen",
  "profile.sessions.expires": "\nLäuft ab",
  "profile.sessions.deviceInventory": "\nGesehene Geräte",
  "profile.sessions.networkCoverage": "\nGesehene Netzwerke",
  "profile.sessions.activityTitle": "\nAktuelle Sicherheitsaktivität",
  "profile.sessions.activityDescription":
    "\nÜberprüfen Sie die neuesten Sitzungs-, Geräte- und Netzwerkänderungen, bevor Sie den Zugriff beenden oder Anmeldeinformationen wechseln.",
  "profile.sessions.activityCurrentTitle": "\nAktuelle Sitzungshaltung",
  "profile.sessions.activityCurrentDescription": "\nAktuelle Sitzung eingerichtet {value}.",
  "profile.sessions.activityCurrentEmpty":
    "\nEs ist keine aktuelle Sitzung zur Überprüfung verfügbar.",
  "profile.sessions.activityDeviceTitle": "\nGeräte-Footprint",
  "profile.sessions.activityDeviceDescription":
    "\n{count} Geräteprofile sind in der letzten Sitzungsprüfung sichtbar.",
  "profile.sessions.activityNetworkTitle": "\nNetzwerk-Footprint",
  "profile.sessions.activityNetworkDescription":
    "\n{count} Netzwerkursprünge sind in der letzten Sitzungsprüfung sichtbar.",
  "profile.sessions.expiringSoon": "\nLäuft bald ab",
  "profile.sessions.activityExpiringDescription":
    "\n{count} aktive Sitzung(en) müssen überprüft werden, bevor das aktuelle Zugriffsfenster geschlossen wird.",
  "profile.sessions.expiresSoon": "\nLäuft bald ab",
  "profile.sessions.remoteContext": "\nRemote-Kontext",
  "profile.sessions.activityRemoteDescription":
    "\n{count} Sitzung(en) sind außerhalb des primären vertrauenswürdigen Netzwerkkontexts aktiv.",
  "profile.signOutLabel": "\nAbmelden",
  "profile.security.title": "Security controls",
  "profile.security.description":
    "Manage passkeys, two-factor verification, and bearer sessions for this account.",
  "profile.security.errorTitle": "Security controls unavailable",
  "profile.security.passkeys.title": "Passkeys",
  "profile.security.passkeys.description":
    "Register hardware-backed credentials for secure sign-in on trusted devices.",
  "profile.security.passkeys.disabled": "Passkeys are disabled",
  "profile.security.passkeys.disabledDescription":
    "Enable the Better Auth passkey capability before managing device credentials here.",
  "profile.security.passkeys.empty": "No passkeys registered",
  "profile.security.passkeys.emptyDescription":
    "Add a passkey to let this account use WebAuthn-backed sign-in.",
  "profile.security.passkeys.add": "Add passkey",
  "profile.security.passkeys.delete": "Delete",
  "profile.security.passkeys.defaultName": "Primary passkey",
  "profile.security.passkeys.unsupported":
    "This browser does not support passkey registration on the current origin.",
  "profile.security.passkeys.errorGeneric": "The passkey change could not be completed.",
  "profile.security.passkeys.registered": "Passkey registered.",
  "profile.security.passkeys.deleted": "Passkey deleted.",
  "profile.security.passkeys.devicePlatform": "Platform authenticator",
  "profile.security.passkeys.deviceCrossPlatform": "Cross-platform authenticator",
  "profile.security.passkeys.backedUp": "Backed up",
  "profile.security.passkeys.notBackedUp": "Not backed up",
  "profile.security.passkeys.createdAt": "Registered {value}.",
  "profile.security.twoFactor.title": "Two-factor verification",
  "profile.security.twoFactor.description":
    "Manage TOTP setup and backup code rotation for interactive sign-in.",
  "profile.security.twoFactor.disabled": "Two-factor verification is disabled",
  "profile.security.twoFactor.disabledDescription":
    "Enable the Better Auth two-factor capability before managing verification here.",
  "profile.security.twoFactor.enabled": "Enabled",
  "profile.security.twoFactor.enabledDescription":
    "Use the current TOTP seed and backup codes to complete sign-in challenges.",
  "profile.security.twoFactor.empty": "Not configured",
  "profile.security.twoFactor.emptyDescription":
    "Enable two-factor verification to issue a TOTP seed and backup codes.",
  "profile.security.twoFactor.enable": "Enable",
  "profile.security.twoFactor.disable": "Disable",
  "profile.security.twoFactor.regenerate": "Regenerate backup codes",
  "profile.security.twoFactor.totpUri": "TOTP URI",
  "profile.security.twoFactor.totpUriHint":
    "Scan this URI with a TOTP application before leaving the page.",
  "profile.security.twoFactor.backupCodes": "Backup codes",
  "profile.security.twoFactor.enabledSuccess": "Two-factor verification enabled.",
  "profile.security.twoFactor.disabledSuccess": "Two-factor verification disabled.",
  "profile.security.twoFactor.backupCodesRegenerated": "Backup codes regenerated.",
  "profile.security.twoFactor.errorGeneric":
    "The two-factor verification change could not be completed.",
  "profile.security.bearer.title": "Bearer sessions",
  "profile.security.bearer.description":
    "Inspect active bearer-backed API sessions and revoke stale access.",
  "profile.security.bearer.disabled": "Bearer sessions are disabled",
  "profile.security.bearer.disabledDescription":
    "Enable the Better Auth bearer capability before managing API sessions here.",
  "profile.security.bearer.empty": "No bearer sessions active",
  "profile.security.bearer.emptyDescription":
    "Bearer-backed API sessions will appear here after a token-authenticated request succeeds.",
  "profile.security.bearer.current": "Current",
  "profile.security.bearer.reveal": "Reveal token",
  "profile.security.bearer.revoke": "Revoke",
  "profile.security.bearer.revoked": "Bearer session revoked.",
  "profile.security.bearer.errorGeneric": "The bearer session change could not be completed.",
  "profile.security.bearer.tokenLabel": "Session token",
  "profile.security.bearer.tokenHidden": "Token value is hidden until it is explicitly revealed.",
  "profile.security.bearer.sessionStarted": "Started",
  "profile.security.bearer.sessionExpires": "Expires",
  "digitalTwin.title": "\nDigitaler Zwilling",
  "digitalTwin.subtitle": "\nRäumliche Hotspot-Sichtbarkeit und Live-Asset-Kontext",
  "digitalTwin.scene.title": "\nRaumoperationsszene",
  "digitalTwin.scene.description":
    "\nServergesteuerte Doppelansicht mit Live-Hotspot-Abdeckung und anlagenbezogenen Koordinaten.",
  "digitalTwin.scene.streamTitle": "\nLive-Stream",
  "digitalTwin.scene.streamDescription":
    "\nSSE-Schnappschüsse veröffentlichen aktuelle Hotspot-Koordinaten.",
  "digitalTwin.videoStreams.title": "\nLive-Feeds",
  "digitalTwin.videoStreams.empty": "\nKeine Livestreams konfiguriert",
  "digitalTwin.videoStreams.live": "\nLive",
  "digitalTwin.videoStreams.noStream": "\nKeine Stream-URL",
  "digitalTwin.videoStreams.openStream": "\nStream öffnen",
  "digitalTwin.videoStreams.notFound": "\nStream nicht gefunden",
  "iot.telemetry.ingest": "\nTelemetrie aufnehmen",
  "iot.devices.title": "\nIoT-Geräte",
  "iot.apiKeyInvalid": "\nUngültiger oder fehlender API-Schlüssel",
  "iot.assetNotFound": "\nAsset nicht gefunden",
  "iot.siteNotFound": "\nWebsite nicht gefunden",
  "iot.devices.empty": "\nKeine IoT-Geräte registriert",
  "iot.devices.register": "\nGerät registrieren",
  "iot.devices.mqttTopic": "\nMQTT-Thema",
  "iot.devices.mqttPlaceholder": "\ntelemetry/site1/device1",
  "iot.devices.site": "\nSite",
  "iot.devices.asset": "\nAsset",
  "iot.devices.assetPlaceholder": "\nAsset-ID",
  "iot.devices.lastSeen": "\nZuletzt gesehen",
  "iot.devices.validation.required": "MQTT-Thema und -Site sind erforderlich.",
  "iot.devices.validation.topicInUse": "\nMQTT-Thema wird bereits verwendet.",
  "iot.devices.feedback.deviceAdded": "\nGerät registrieren – Gerät hinzugefügt.",
  "iot.devices.table.ariaLabel": "\nRegistrierte IoT-Geräte",
  "iot.apiKeyNotConfigured": "\nDer IoT-API-Schlüssel ist nicht konfiguriert.",
  "iot.deviceNotFound": "\nGerät nicht gefunden",
  "edgeControl.validation.payloadJsonInvalid": "\nDie Nutzlast muss gültiges JSON.",
  "edgeControl.validation.commandRequired":
    " sein.\nWählen Sie ein Gerät aus und geben Sie einen Befehlsnamen ein.",
  "edgeControl.validation.deviceRequired": "\nWählen Sie ein gültiges Gerät aus.",
  "edgeControl.validation.automationTitleRequired": "\nAutomatisierungstitel ist erforderlich.",
  "edgeControl.validation.automationDeviceRequired":
    "\nWählen Sie ein Gerät und einen Befehl aus, um einen Automatisierungslauf in die Warteschlange zu stellen.",
  "edgeControl.validation.automationKindRequired":
    "\nWählen Sie eine gültige Automatisierungsart aus.",
  "edgeControl.commands.title": "\nGerätebefehlswarteschlange",
  "edgeControl.commands.description":
    "\nHardwaresichere Befehle für registrierte Edge-Geräte in die Warteschlange stellen und den Lieferstatus überwachen.",
  "edgeControl.commands.device": "\nGerät",
  "edgeControl.commands.devicePlaceholder": "\nWählen Sie ein Gerät",
  "edgeControl.commands.command": "\nBefehl",
  "edgeControl.commands.commandPlaceholder": "\nneu starten, kalibrieren, sync-config",
  "edgeControl.commands.payload": "\nNutzlast JSON",
  "edgeControl.commands.payloadPlaceholder": '{"ziel":"zone-a"}',
  "edgeControl.commands.submit": "\nWarteschlangenbefehl",
  "edgeControl.commands.empty": "\nEs sind noch keine Gerätebefehle in der Warteschlange.",
  "edgeControl.commands.notFound": "\nGerätebefehl nicht gefunden.",
  "edgeControl.commands.failed": "\nGerät hat Befehlsfehler gemeldet.",
  "edgeControl.commands.feedback.queued":
    "\nGerätebefehl für Edge-Zustellung in der Warteschlange.",
  "edgeControl.commands.table.device": "\nGerät",
  "edgeControl.commands.table.command": "\nBefehl",
  "edgeControl.commands.table.status": "\nStatus",
  "edgeControl.commands.table.automation": "\nAutomatisierung",
  "edgeControl.commands.table.updatedAt": "\nAktualisiert",
  "edgeControl.commands.status.QUEUED": "\nIn der Warteschlange",
  "edgeControl.commands.status.DELIVERED": "\nGeliefert",
  "edgeControl.commands.status.ACKNOWLEDGED": "\nBestätigt",
  "edgeControl.commands.status.FAILED": "\nFehlgeschlagen",
  "edgeControl.commands.status.CANCELED": "\nAbgesagt",
  "edgeControl.automation.title": "\nAutomatisierung läuft",
  "edgeControl.automation.description":
    "\nErstellen Sie dauerhafte Laufaufzeichnungen, die die Gerätearbeit in die Warteschlange stellen, und bewahren Sie den Ausführungsverlauf im Kontrollzentrum auf.",
  "edgeControl.automation.runTitle": "\nFühren Sie title",
  "edgeControl.automation.runTitlePlaceholder": " aus\nNächtlicher Kühler-Reset",
  "edgeControl.automation.kindLabel": "\nAutomatisierungsart",
  "edgeControl.automation.device": "\nGerät",
  "edgeControl.automation.command": "\nBefehl",
  "edgeControl.automation.payload": "\nNutzlast JSON",
  "edgeControl.automation.notes": "\nNotizen",
  "edgeControl.automation.notesPlaceholder": "\nOptionaler Betreiberhinweis",
  "edgeControl.automation.submit": "\nWarteschlangenautomatisierung",
  "edgeControl.automation.empty": "\nEs wurden noch keine Automatisierungsläufe erstellt.",
  "edgeControl.automation.feedback.queued":
    "\nAutomatisierungslauf mit einem Edge-Befehl in die Warteschlange gestellt.",
  "edgeControl.automation.table.title": "\nAusführen",
  "edgeControl.automation.table.kind": "\nArt",
  "edgeControl.automation.table.status": "\nStatus",
  "edgeControl.automation.table.device": "\nGerät",
  "edgeControl.automation.table.updatedAt": "\nAktualisiert",
  "edgeControl.automation.kind.DEVICE_COMMAND": "\nGerätebefehl",
  "edgeControl.automation.kind.EDGE_RUNBOOK": "\nEdge-Runbook",
  "edgeControl.automation.status.QUEUED": "\nIn der Warteschlange",
  "edgeControl.automation.status.RUNNING": "\nLaufen",
  "edgeControl.automation.status.SUCCEEDED": "\nErfolgreich",
  "edgeControl.automation.status.FAILED": "\nFehlgeschlagen",
  "edgeControl.automation.status.CANCELED": "\nAbgesagt",
  "deployment.validation.airgappedProviderRequired":
    "\nDie Airgapped-Bereitstellung erlaubt nur lokale KI-Anbieter wie RamaLama oder Ollama.",
  "deployment.title": "\nBereitstellungsrichtlinie",
  "deployment.description":
    "\nDer Bereitstellungsmodus regelt den ausgehenden Netzwerkzugriff, die KI-Anbieterrichtlinie und die Speichergrenzen.",
  "deployment.policyTitle": "\nRichtlinie",
  "deployment.policy.airgapped":
    "\nExterne Netzwerkanrufe werden blockiert und AI ist auf lokale Anbieter beschränkt, die innerhalb der Bereitstellungsgrenzen bedient werden.",
  "deployment.policy.cloud":
    "\nCloud-Bereitstellungen ermöglichen ausgehende Integrationen und behalten gleichzeitig den Edge-Befehls- und Automatisierungsstatus in der gemeinsamen Steuerungsebene bei.",
  "deployment.policy.onPrem":
    "\nLokale Bereitstellungen bleiben selbstgehostet und ermöglichen dennoch explizit konfigurierte externe Integrationen.",
  "deployment.edgeControlTitle": "\nKantensteuerung",
  "deployment.edgeControlDescription":
    "\nGerätebefehlswarteschlangen und Automatisierungsausführungen bleiben in Prisma dauerhaft, sodass durch die Skalierung der App keine Arbeit während des Betriebs verloren geht.",
  "deployment.mode.CLOUD": "\nCloud",
  "deployment.mode.ON_PREM": "\nLokal",
  "deployment.mode.AIRGAPPED": "Luftspalt",
  "deployment.capability.externalNetworkEnabled": "\nExternes Netzwerk aktiviert",
  "deployment.capability.externalNetworkDisabled": "\nExternes Netzwerk blockiert",
  "deployment.capability.externalEmailEnabled": "\nExterne E-Mail erlaubt",
  "deployment.capability.externalEmailDisabled": "\nExterne E-Mail blockiert",
  "deployment.capability.localProtocolReferencesOnly": "\nNur lokale Protokollreferenzen",
  "deployment.capability.remoteProtocolReferencesAllowed": "\nRemote-Protokollreferenzen zulässig",
  "deployment.capability.localAiOnly": "\nNur lokale KI",
  "deployment.capability.hybridAiAllowed": "\nHybrid-KI erlaubt",
  "deployment.capability.localDeviceStorageOnly": "\nNur lokaler Speicher",
  "deployment.capability.objectStorageAllowed": "\nObjektspeicher erlaubt",
  "assets.media.noFile": "\nKeine Datei bereitgestellt",
  "assets.media.invalidFileType": "\nUngültiger Dateityp. Zulässig: JPEG, PNG, GIF, WebP.",
  "assets.media.fileTooLarge": "\nDatei zu groß. Maximal 10 MB.",
  "assets.media.notFound": "\nMedien nicht gefunden",
  "assets.media.fileNotFound": "\nDatei nicht gefunden",
  "assets.media.assetNotFound": "\nAsset nicht gefunden",
  "assets.annotations.title": "\nBildanmerkungen",
  "assets.annotations.empty": "\nNoch keine Anmerkungen",
  "assets.annotations.open": "\nAnmerkungsarbeitsbereich öffnen",
  "assets.annotations.segment": "\nFühren Sie segmentation",
  "assets.annotations.segmentSuccess": " aus\nSegmentierungsvorschläge erstellt",
  "assets.annotations.segmentUnavailable":
    "\nDie Segmentierung ist mit der aktuellen AI-Konfiguration nicht verfügbar. Manuelle Anmerkungen sind weiterhin verfügbar.",
  "assets.annotations.segmentInvalid":
    "\nDie Segmentierungsantwort konnte nicht in eine gültige Annotationsgeometrie konvertiert werden.",
  "assets.annotations.manualAdd": "\nManuelle Anmerkung hinzufügen",
  "assets.annotations.edit": "\nPolygon",
  "assets.annotations.confirm": " bearbeiten\nBestätigen",
  "assets.annotations.reject": "\nAblehnen",
  "assets.annotations.archive": "\nArchiv",
  "assets.annotations.save": "\nAnmerkung speichern",
  "assets.annotations.clearDraft": "\nKlarer Entwurf",
  "assets.annotations.label": "\nLabel",
  "assets.annotations.status": "\nStatus",
  "assets.annotations.source": "\nQuelle",
  "assets.annotations.confidence": "\nVertrauen",
  "assets.annotations.mask": "\nMaske",
  "assets.annotations.maskToggle": "\nMaskenüberlagerung anzeigen",
  "assets.annotations.boxTool": "\nKastenwerkzeug",
  "assets.annotations.polygonTool": "\nPolygon-Werkzeug",
  "assets.annotations.regions": "\nRegionen",
  "assets.annotations.prompt": "\nSegmentierungsaufforderung",
  "assets.annotations.promptPlaceholder":
    "\nMarkieren Sie Lecks, Korrosion, Risse, Kontrollen oder andere wichtige Bereiche",
  "assets.annotations.defaultLabel": "\nRegion",
  "assets.annotations.status.proposed": "\nVorgeschlagen",
  "assets.annotations.status.confirmed": "\nBestätigt",
  "assets.annotations.status.rejected": "\nAbgelehnt",
  "assets.annotations.status.archived": "\nArchiviert",
  "assets.annotations.source.ai": "KI",
  "assets.annotations.source.manual": "\nHandbuch",
  "assets.annotations.validation.labelRequired": "\nLabel ist erforderlich",
  "assets.annotations.validation.polygonInvalid":
    "\nDas Polygon muss mindestens drei normalisierte Punkte enthalten",
  "assets.annotations.validation.mediaNotFound": "\nAnmerkungsmedium wurde nicht gefunden",
  "assets.annotations.validation.annotationNotFound": "\nAnmerkung nicht gefunden",
  "assets.annotations.saved": "\nAnmerkung gespeichert",
  "assets.annotations.archived": "\nAnmerkung archiviert",
  "storage.notConfigured":
    "\nSpeicher nicht konfiguriert. Legen Sie OBJECT_STORAGE_*-Umgebungsvariablen fest.",
  "storage.operationFailed": "\nSpeichervorgang fehlgeschlagen",
  "assets.type.BUILDING": "\nGebäude",
  "assets.type.INFRASTRUCTURE": "\nInfrastruktur",
  "assets.type.TRAINING_RANGE": "\nTrainingsbereich",
  "assets.type.RANGE_SAFETY_SYSTEM": "\nRange-Sicherheitssystem",
  "assets.type.TARGETRY_SYSTEM": "\nZielsystem",
  "assets.type.HVAC": "HLK",
  "assets.type.ELECTRICAL": "\nElektrik",
  "assets.type.PLUMBING": "\nSanitär",
  "assets.type.STRUCTURAL": "\nStrukturell",
  "assets.type.MECHANICAL": "\nMechanisch",
  "assets.type.FIRE_SAFETY": "\nBrandschutz",
  "assets.type.SECURITY": "\nSicherheit",
  "assets.type.IT_INFRASTRUCTURE": "\nIT-Infrastruktur",
  "assets.type.VEHICLE": "\nFahrzeug",
  "assets.type.PLANT_HEAVY_MACHINERY": "\nAnlagen und Schwermaschinen",
  "assets.type.KITCHEN_CATERING_EQUIPMENT": "\nKüchen- und Catering-Ausrüstung",
  "assets.type.FORESTRY_ASSET": "\nForstwirtschaftsanlage",
  "assets.type.RURAL_ESTATE_ASSET": "\nLändliches Anwesen-Asset",
  "assets.type.HERITAGE_ASSET": "\nKulturerbe-Asset",
  "assets.type.ENVIRONMENTAL_ASSET": "\nUmweltvermögenswert",
  "assets.type.GOVERNMENT_FURNISHED_EQUIPMENT": "\nVon der Regierung bereitgestellte Ausrüstung",
  "assets.type.EQUIPMENT": "\nAusrüstung",
  "assets.type.OTHER": "\nAndere",
  "assets.hierarchy.ESTATE": "\nNachlass",
  "assets.hierarchy.FACILITY": "\nEinrichtung",
  "assets.hierarchy.SYSTEM": "\nSystem",
  "assets.hierarchy.SUBSYSTEM": "\nSubsystem",
  "assets.hierarchy.COMPONENT": "\nKomponente",
  "assets.condition.OPERATIONAL": "\nBetriebsbereit",
  "assets.condition.DEGRADED": "\nDegradiert",
  "assets.condition.CRITICAL": "\nKritisch",
  "assets.condition.FATIGUING": "\nErmüdend",
  "assets.condition.DECOMMISSIONED": "\nStillgelegt",
  "assets.condition.unknown": "\nUnbekannt",
  "assets.lifecycle.ACTIVE": "\nAktiv",
  "assets.lifecycle.MONITORING": "\nÜberwachung",
  "assets.lifecycle.FATIGUING": "\nErmüdend",
  "assets.lifecycle.DISPOSED": "\nEntsorgt",
  "digitalTwin.scene.hotspotTitle": "\nHotspot-Abdeckung",
  "digitalTwin.scene.hotspotDescription":
    "\nBetriebsmarkierungen werden vom letzten beibehaltenen Zwillingsstatus aktualisiert.",
  "digitalTwin.scene.assetTitle": "\nAsset-Kontext",
  "digitalTwin.scene.assetDescription":
    "\nJeder Hotspot kann mit dem verfolgten Infrastruktur-Asset verknüpft werden.",
  "digitalTwin.hotspots.title": "\nHotspot-Registrierung",
  "digitalTwin.hotspots.empty":
    "Für den aktuellen digitalen Zwilling sind keine Hotspots verfügbar.",
  "digitalTwin.hotspots.noDescription": "\nEs wurde keine Hotspot-Beschreibung aufgezeichnet.",
  "digitalTwin.hotspots.openTarget": "\nZiel",
  "digitalTwin.coords.x": "X-Achse",
  "digitalTwin.coords.y": "Y-Achse",
  "digitalTwin.coords.z": "Z-Achse",
  "kanban.title": " öffnen\nKanban-Board",
  "kanban.subtitle": "\nAusführungspipeline für Aufgaben, Terminplanung und Teamfluss",
  "tasks.title": "\nAufgabenboard",
  "tasks.subtitle": "\nKanban-Ausführungspipeline und Crew-Flow",
  "tasks.filter.priority": "\nPriorität",
  "tasks.filter.priority.all": "\nAlle Prioritäten",
  "tasks.filter.status": "\nStatus",
  "tasks.filter.site": "\nSite",
  "tasks.filter.assignee": "\nBeauftragter",
  "tasks.filter.assigneePlaceholder": "\nSuchen Sie nach Asset, Beauftragtem oder Crew",
  "tasks.filter.priority.low": "\nNiedrig",
  "tasks.filter.priority.medium": "\nMittel",
  "tasks.filter.priority.high": "\nHoch",
  "tasks.filter.priority.critical": "\nKritisch",
  "tasks.filter.site.allSites": "\nAlle Websites",
  "tasks.filter.site.northTraining": "\nTrainingsgelände Nord",
  "tasks.filter.site.centralCommand": "\nZentralkommando",
  "tasks.column.backlog": "\nRückstand",
  "tasks.column.scheduled": "\nGeplant",
  "tasks.column.inProgress": "\nIn Bearbeitung",
  "tasks.column.completed": "\nAbgeschlossen",
  "tasks.column.empty": "\nKeine Aufgaben in dieser Spalte",
  "tasks.status.draft": "\nEntwurf",
  "tasks.status.cancelled": "\nAbgesagt",
  "tasks.priority.LOW": "\nNiedrig",
  "tasks.priority.MEDIUM": "\nMittel",
  "tasks.priority.HIGH": "\nHoch",
  "tasks.priority.CRITICAL": "\nKritisch",
  "tasks.type.INSPECTION": "\nInspektion",
  "tasks.type.REPAIR": "\nReparatur",
  "tasks.type.REPLACEMENT": "\nErsatz",
  "tasks.type.CALIBRATION": "\nKalibrierung",
  "tasks.type.EMERGENCY": "\nNotfall",
  "tasks.card.asset": "\nAsset",
  "tasks.card.deadline": "\nFrist",
  "tasks.card.crew": "\nCrew",
  "tasks.card.priority": "\nPriorität",
  "tasks.card.open": "\nTask",
  "tasks.card.openAria": " anzeigen\nAufgabendetails für {id}",
  "tasks.summary.pendingApproval": " öffnen\nAusstehende Genehmigung",
  "tasks.detail.title": "\nAufgabendetail",
  "tasks.detail.subtitle":
    "\nWählen Sie eine Aufgabenkarte aus, um den Aufgabenkontext zu überprüfen",
  "tasks.detail.listTitle": "\nCheckliste für den Aufgabenabschluss",
  "tasks.detail.completionCriteria": "\nAbschlusskriterien",
  "tasks.detail.requiredParts": "\nBenötigte Teile",
  "tasks.detail.aiConfidence": "\nKI-Vertrauen",
  "tasks.workspace.title": "\nAufgabe Mission Control",
  "tasks.workspace.heroEyebrow": "\nOperations-Workbench",
  "tasks.workspace.heroNarrative":
    "\nDie {mode}-Ansicht konzentrierte sich auf {preset}. {total} bereichsbezogene Aufgaben, {active} aktiv im Flow, {unassigned} ohne Besitzer, {dueSoon} bald fällig.",
  "tasks.workspace.modeLabel": "\nAufgaben-Workbench-Modus",
  "tasks.workspace.mode.queue": "\nPrioritätswarteschlange",
  "tasks.workspace.mode.board": "\nFlowboard",
  "tasks.workspace.mode.copilot": "\nCopilot",
  "tasks.workspace.navigatorTitle": "\nNavigator",
  "tasks.workspace.navigatorSubtitle":
    "\nSpeichern Sie das mentale Modell des Bedieners: Wählen Sie eine Linse aus und teilen Sie dann den Datensatz auf.",
  "tasks.workspace.queueTitle": "\nAusführungswarteschlange",
  "tasks.workspace.queueSubtitle":
    "\nList-First-Drillthrough für Disposition, Triage und Bedienerüberprüfung.",
  "tasks.workspace.boardTitle": "\nAusführungsablauf",
  "tasks.workspace.boardSubtitle":
    "\nBoard-First-Lane-Ansicht für Planung, WIP-Überwachung und Statusänderungen.",
  "tasks.workspace.detailTitle": "\nDrillthrough",
  "tasks.workspace.detailSubtitle":
    "\nAusgewählte Aufgabe, empfohlener Besitzer und nächster Aktionspfad.",
  "tasks.workspace.detailEmpty":
    "\nWählen Sie eine Aufgabenkarte aus, um den Ausführungskontext und die KI-Empfehlungen zu überprüfen.",
  "tasks.workspace.presetLabel": "\nVoreinstellung",
  "tasks.workspace.preset.all": "\nGesamte Arbeitslast",
  "tasks.workspace.preset.myQueue": "\nMeine Warteschlange",
  "tasks.workspace.preset.triage": "\nBenötigt Triage",
  "tasks.workspace.preset.unassigned": "\nNicht zugewiesen",
  "tasks.workspace.preset.dueSoon": "\nBald fällig",
  "tasks.workspace.preset.active": "\nAktiver Fluss",
  "tasks.workspace.preset.completed": "\nKürzlich abgeschlossen",
  "tasks.workspace.preset.aiGenerated": "\nKI-Ursprung",
  "tasks.workspace.preset.allDesc":
    "\nVollständige gefilterte Arbeitslast für Planung und Ausführung.",
  "tasks.workspace.preset.myQueueDesc": "\nDem aktuellen Operator bereits zugewiesene Aufgaben.",
  "tasks.workspace.preset.triageDesc":
    "\nEntwurfs- und Rückstandselemente, die noch einer Entscheidung bedürfen.",
  "tasks.workspace.preset.unassignedDesc": "\nArbeiten ohne Einzel- oder Mannschaftseigentum.",
  "tasks.workspace.preset.dueSoonDesc": "\nAufgaben, die in den nächsten sieben Tagen fällig sind.",
  "tasks.workspace.preset.activeDesc":
    "\nGeplante Arbeiten und Arbeiten während des Flugs verbrauchen derzeit Kapazität.",
  "tasks.workspace.preset.completedDesc":
    "\nKürzlich abgeschlossene Arbeiten zur Validierung und Übergabe.",
  "tasks.workspace.preset.aiGeneratedDesc":
    "\nVorhersagebezogene oder KI-bewertete Arbeitselemente.",
  "tasks.workspace.savedViewLabel": "\nGespeicherte Aufrufe",
  "tasks.workspace.savedView.dispatch": "Versandwarteschlange",
  "tasks.workspace.savedView.dispatchDesc":
    "\nHalten Sie nicht zugewiesene Arbeit und Personaldruck sichtbar, um eine schnelle Weiterleitung zu ermöglichen.",
  "tasks.workspace.savedView.slaWatch": "\nSLA-Uhr",
  "tasks.workspace.savedView.slaWatchDesc":
    "\nBleiben Sie bei bald fälligen und überfälligen Arbeiten, die zuerst ein Eingreifen erfordern.",
  "tasks.workspace.savedView.automation": "\nAutomatisierungsuhr",
  "tasks.workspace.savedView.automationDesc":
    "\nÜberprüfen Sie KI-basierte Aufgaben, bevor sie in die Planung und Ausführung vor Ort übergehen.",
  "tasks.workspace.savedView.execution": "\nAusführungsfokus",
  "tasks.workspace.savedView.executionDesc":
    "\nVerfolgen Sie geplante und laufende Arbeiten, ohne die Werkbank zu verlassen.",
  "tasks.workspace.metric.total": "\nUmfangreiche Aufgaben",
  "tasks.workspace.metric.totalDesc":
    "\nSichtbare Arbeitsbelastung nach Anwendung der aktuellen Filter.",
  "tasks.workspace.metric.active": "\nIn Ausführung",
  "tasks.workspace.metric.activeDesc": "\nGeplante und laufende Aufgaben in der aktuellen Ansicht.",
  "tasks.workspace.metric.unassigned": "\nUnbesessen",
  "tasks.workspace.metric.unassignedDesc": "\nAufgaben ohne direkten Beauftragten oder Team.",
  "tasks.workspace.metric.dueSoon": "\nBald fällig",
  "tasks.workspace.metric.dueSoonDesc": "\nAufgaben mit Fristen in den nächsten sieben Tagen.",
  "tasks.workspace.metric.overdue": "\nÜberfällig",
  "tasks.workspace.primaryAction": "\nAufgabe",
  "tasks.workspace.filtersHint":
    " hinzufügen\nDas Ändern eines Slicers aktualisiert die Board-Abfrage und sorgt dafür, dass die URL gemeinsam genutzt werden kann.",
  "tasks.workspace.slaTitle": "\nSLA-Alterung",
  "tasks.workspace.slaDescription":
    "\nHalten Sie überfällige, bald fällige und Neuzuweisungsarbeiten sichtbar, bevor sie in die nächste Schicht übergehen.",
  "tasks.workspace.slaAging.overdue": "\n{count} Tag(e) überfällig",
  "tasks.workspace.slaAging.today": "\nHeute fällig",
  "tasks.workspace.slaAging.dueIn": "\nFällig in {count} Tag(en)",
  "tasks.workspace.slaAging.onTrack": "\nAuf dem richtigen Weg",
  "tasks.workspace.bulkCueTitle": "\nMassentriage-Cues",
  "tasks.workspace.bulkCueDescription":
    "\nWechseln Sie zu Triage-, Neuzuweisungs- oder Closeout-Slices, ohne die aktuellen Filter neu zu erstellen.",
  "tasks.workspace.bulkTriageTitle": "\nMassentriage",
  "tasks.workspace.bulkTriageDescription":
    "\nFegen Sie überfällige, bald fällige und aufmerksamkeitsintensive Aufgaben, bevor sie in die nächste Schicht übergehen.",
  "tasks.workspace.bulkReassignTitle": "\nNeuzuweisungshinweise",
  "tasks.workspace.bulkReassignDescription":
    "\nSorgen Sie dafür, dass nicht zugewiesene Arbeiten sichtbar bleiben, damit Disposition und Teamübergabe vor der Warteschlange bleiben.",
  "tasks.workspace.shortcutTitle": "\nTastaturkürzel",
  "tasks.workspace.shortcutDescription":
    "\nVerwenden Sie die Workbench-Verknüpfungen für die schnelle Aufgabenerstellung, Board-Änderungen und KI-Übergabe.",
  "tasks.workspace.bulkReassign": "\nNicht im Besitz befindliches Werk neu zuweisen",
  "tasks.workspace.bulkHandoff": "\nÜbergabewarteschlange vorbereiten",
  "tasks.workspace.bulkCloseReady": "\nÜberprüfen Sie die fertige Arbeit",
  "tasks.workspace.wipTitle": "\nWIP-Haltung",
  "tasks.workspace.wipDescription":
    "\nVerfolgen Sie die Flugkapazität pro Spur, damit blockierte Arbeiten eskaliert werden, bevor die Besatzungen ins Stocken geraten.",
  "tasks.workspace.wipHealthy": "\nDer Fluss liegt innerhalb der aktuellen WIP-Grenzen.",
  "tasks.workspace.wipAtRisk": "\n{count} Fahrspur(en) liegen über den aktuellen WIP-Leitplanken.",
  "tasks.workspace.swimlaneTitle": "\nSwimlane-Fokus",
  "tasks.workspace.swimlaneDescription":
    "\nHalten Sie den aktuellen Site- und Eigentümerkontext sichtbar, während Sie zwischen Warteschlangen- und Board-Modus wechseln.",
  "tasks.workspace.clearFilterAria": "\nFilter löschen {label}",
  "tasks.workspace.unassignedValue": "\nNicht zugewiesen",
  "tasks.workspace.aiConfidence": "\nKI-Vertrauen",
  "tasks.workspace.aiOriginLabel": "\nKI-Ursprung",
  "tasks.workspace.aiOrigin.prediction": "\nVorhersagegeneriert",
  "tasks.workspace.column.backlogDesc":
    "\nFormbereite Arbeit, bevor Arbeits- oder Kalenderkapazität festgelegt wird.",
  "tasks.workspace.column.scheduledDesc":
    "Engagierte Arbeit für Teams, Übergaben und Standortfenster.",
  "tasks.workspace.column.inProgressDesc":
    "\nAktive Feldausführung, die Blockerentfernung und SLA-Überwachung erfordert.",
  "tasks.workspace.column.completedDesc":
    "\nAbgeschlossene Arbeiten warten auf Validierung, Prüfung oder Übergabe an Stakeholder.",
  "tasks.workspace.workflowTitle": "\nWorkflow-Fortschritt",
  "tasks.workspace.moveTitle": "\nAufgabe verschieben",
  "tasks.workspace.empty.BACKLOG":
    "\nKeine Backlog-Elemente stimmen mit dem aktuellen Datensatzsegment überein.",
  "tasks.workspace.empty.SCHEDULED":
    "\nKeine geplante Arbeit entspricht dem aktuellen Datensatzsegment.",
  "tasks.workspace.empty.IN_PROGRESS":
    "\nKeine aktive Ausführungsarbeit entspricht dem aktuellen Datensatz-Slice.",
  "tasks.workspace.empty.COMPLETED":
    "\nKeine abgeschlossene Arbeit entspricht dem aktuellen Datensatzsegment.",
  "tasks.workspace.queue.attention": "\nBenötigt Aufmerksamkeit",
  "tasks.workspace.queue.attentionDesc":
    "\nÜberfällige oder kurzfristige Arbeiten, die jetzt einer Betreiberentscheidung bedürfen.",
  "tasks.workspace.queue.dispatch": "\nVersand und Personalbesetzung",
  "tasks.workspace.queue.dispatchDesc":
    "\nVerwenden Sie diese Liste, um nicht im Besitz befindliche Arbeit zuzuweisen, bevor sie zu Flow Debt wird.",
  "tasks.workspace.queue.active": "\nIn Ausführung",
  "tasks.workspace.queue.activeDesc":
    "\nAktuelle geplante und laufende Arbeiten, sortiert nach Fälligkeitsdatum und Priorität.",
  "tasks.workspace.queue.closed": "\nAktuelle Fertigstellungen",
  "tasks.workspace.queue.closedDesc":
    "\nKürzlich abgeschlossene Arbeiten für Prüfung, Übergabe und Nachbereitung.",
  "tasks.workspace.queue.empty":
    "\nDiese Warteschlange ist derzeit für das ausgewählte Slice frei.",
  "tasks.workspace.filteredEmpty.title": "\nKeine Ergebnisse entsprechen Ihren Filtern",
  "tasks.workspace.filteredEmpty.description":
    "\nPassen Sie Ihre Filter an oder löschen Sie sie, um Aufgaben in dieser Spur wieder zu sehen.",
  "tasks.workspace.recommendation.title": "\nEmpfehlung zur KI-Personalbesetzung",
  "tasks.workspace.recommendation.confidenceLabel": "\nEmpfehlungsvertrauen",
  "tasks.workspace.recommendation.noMatch": "\nNoch keine Besetzungsübereinstimmung verfügbar",
  "tasks.workspace.recommendation.assigneeRecommended": "\nEmpfohlene Einzelaufgabe",
  "tasks.workspace.recommendation.crewRecommended": "\nEmpfohlene Besatzungszuweisung",
  "tasks.workspace.recommendation.reason.assigneeContinuity":
    "\nDie {role}-Abdeckung bei {site} behält den aktuellen Aufgabenkontext mit {openTasks} aktiven Aufgaben bei.",
  "tasks.workspace.recommendation.reason.assigneeLoad":
    "\nDie {role}-Abdeckung bei {site} hat die geringste aktive Arbeitslast bei {openTasks}-Aufgaben.",
  "tasks.workspace.recommendation.reason.crewEscalation":
    "\n{crew} deckt {site} mit einem Wartungsvorsprung bei Rotation für diese {taskType}-Aufgabe ab.",
  "tasks.workspace.recommendation.reason.crewCapacity":
    "\n{crew} deckt {site} mit {memberCount} aktiven Mitgliedern und {openTasks} aktiven Aufgaben ab.",
  "tasks.workspace.recommendation.reason.noMatch":
    "\nFür {site} ist noch kein Standortpersonal oder Techniker konfiguriert.",
  "tasks.workspace.test.completionCriterionSample":
    "\nÜberprüfen Sie die Normalisierung des Luftstroms",
  "tasks.workspace.test.requiredPartSample": "\nFilterpaket",
  "tasks.workspace.chat.noSelection": "\nDerzeit ist keine Aufgabe ausgewählt.",
  "tasks.workspace.chat.selection":
    "\nAusgewählte Aufgabe {task}, Status {status}, Priorität {priority}, Besitzer {assignee}.",
  "tasks.workspace.chat.pageContext":
    "\nAufgaben-Workbench in der Ansicht {mode}. {stats}. {filters}. {task}.",
  "tasks.workspace.copilot.title": "\nKI-Copilot",
  "tasks.workspace.copilot.subtitle":
    "\nAufforderungsbereite Aktionen bleiben an den sichtbaren Datensatz und den Drillthrough-Status gebunden.",
  "tasks.workspace.copilot.description":
    "Halten Sie den Assistenten nah an der Arbeit: Fassen Sie die sichtbare Arbeitslast zusammen, diagnostizieren Sie Flussengpässe oder erstellen Sie Übergabenotizen, ohne die Kommandozentrale zu verlassen.",
  "tasks.workspace.copilot.askAi": "\nFragen Sie AI",
  "tasks.workspace.copilot.openPrompt":
    "\nÜberprüfen Sie den Arbeitsbereich für sichtbare Aufgaben und helfen Sie mir bei der Entscheidung über die nächste operative Aktion.",
  "tasks.workspace.copilot.brief": "\nBetriebsbeschreibung",
  "tasks.workspace.copilot.briefPrompt":
    "\nFassen Sie den aktuellen Aufgabenarbeitsbereich {mode} für die Voreinstellung {preset} zusammen. Heben Sie dringende Punkte, Personallücken und empfohlene nächste Maßnahmen hervor.",
  "tasks.workspace.copilot.bottleneck": "\nEngpässe finden",
  "tasks.workspace.copilot.bottleneckPrompt":
    "\nSehen Sie sich die sichtbare Aufgabenauslastung an und identifizieren Sie die wichtigsten Engpässe, Blocker und WIP-Risiken.",
  "tasks.workspace.copilot.handoff": "\nEntwurfsübergabe",
  "tasks.workspace.copilot.handoffPrompt":
    "\nEntwerfen Sie eine prägnante Übergabe an den Bediener für die sichtbare Aufgabenauslastung, einschließlich der Änderungen, der Blockierungen und der nächsten Schritte.",
  "tasks.workspace.copilot.executionPlan": "\nEntwurf eines Ausführungsplans",
  "tasks.workspace.copilot.executionPlanPrompt":
    "\nErstellen Sie einen Ausführungsplan für Aufgabe {task} für Anlage {asset} am Standort {site}. Berücksichtigen Sie die Reihenfolge, zu überprüfende Blocker und Kommunikationsschritte.",
  "tasks.workspace.copilot.blockers": "\nBlocker analysieren",
  "tasks.workspace.copilot.blockersPrompt":
    "\nAnalysieren Sie wahrscheinliche Blocker, fehlende Daten und Risikopunkte für Aufgabe {task}.",
  "tasks.workspace.copilot.statusUpdate": "\nEntwurfsstatusaktualisierung",
  "tasks.workspace.copilot.statusUpdatePrompt":
    "\nSchreiben Sie eine kurze Statusaktualisierung für Aufgabe {task}. Der aktuelle Workflow-Status ist {status}.",
  "predictions.title": "\nVorhersagen Feed",
  "predictions.subtitle": "\nKI-generierte Wartungs- und Lebenszyklusrisikosignale",
  "predictions.filter.severity": "\nSchweregrad",
  "predictions.filter.severity.all": "\nAlle",
  "predictions.filter.severity.info": "\nInfo",
  "predictions.filter.severity.warning": "\nWarnung",
  "predictions.filter.severity.critical": "\nKritisch",
  "predictions.filter.severity.emergency": "\nNotfall",
  "predictions.filter.site": "\nSite",
  "predictions.filter.site.allSites": "\nAlle Websites",
  "predictions.filter.site.northTraining": "\nTrainingsgelände Nord",
  "predictions.filter.site.westCompound": "\nWestgelände",
  "predictions.filter.assetType": " ein.\nAnlagentyp",
  "predictions.filter.assetType.all": "\nAlle Typen",
  "predictions.filter.assetType.electrical": "\nElektrik",
  "predictions.filter.assetType.plumbing": "\nSanitär",
  "predictions.filter.assetType.hvac": "HLK",
  "predictions.feed.title": "\nLive-Vorhersage-Warteschlange",
  "predictions.feed.reasoning": "\nBegründung",
  "predictions.feed.remainingLife": "\nVerbleibende Lebensdauer",
  "predictions.feed.confidence": "\nVertrauen",
  "predictions.feed.expand": "\nKette",
  "predictions.feed.generatorFailureTitle": " erweitern\nFehlerfenster Generator A-21",
  "predictions.feed.pumpCollapseTitle": "\nDruckzusammenbruch der Pumpe P-08",
  "predictions.feed.generatorRemainingLife": "\n14 Tage",
  "predictions.feed.pumpRemainingLife": "\n6 Tage",
  "predictions.feed.generatorConfidence": "86 % (Beispiel)",
  "predictions.feed.pumpConfidence": "93 % (Beispiel)",
  "predictions.reasoning.title": "\nArgumentationskette",
  "predictions.reasoning.subtitle": "\nModellzusammenfassung, Kontext und Empfehlung",
  "predictions.reasoning.list.variance":
    "\nDie Telemetrievarianz überstieg die rollierende Basislinie um 42 %.",
  "predictions.reasoning.list.seal":
    "\nDie Wartungshistorie weist auf wiederholte Dichtungsverschlechterungsmuster hin.",
  "predictions.reasoning.list.action":
    "\nEmpfohlene Maßnahme: Entwurfsersetzungsaufgabe automatisch innerhalb von 48 Stunden erstellen.",
  "predictions.reasoning.placeholder":
    "\nReasoning Trace wird gestreamt, wenn Vorhersagen verfügbar sind.",
  "predictions.reasoning.asset": "\nAsset",
  "predictions.reasoning.model": "\nModell",
  "predictions.reasoning.confidence": "\nVertrauen",
  "predictions.type.failure": "\nFehler",
  "predictions.type.degradation": "\nAbbau",
  "predictions.type.maintenanceDue": "\nWartung fällig",
  "predictions.type.lifecycleEnd": "\nLebenszyklusende",
  "predictions.workspace.eyebrow": "\nKI-Risikobefehl",
  "predictions.workspace.title":
    "\nVorhersage, Bestandsaufnahme und Aktionsablauf in einer Bedienoberfläche",
  "predictions.workspace.description":
    "Ein Arbeitsbereich im Power BI-Stil zum Einordnen von Live-KI-Risikosignalen in Bezug auf den Anlagenbestand, den Betriebsrückstand und den nachgelagerten Beschaffungs- oder Entsorgungsdruck.",
  "predictions.workspace.live": "\nAktualisiert alle {seconds}s",
  "predictions.workspace.filtersTitle": "\nBefehlsleiste filtern",
  "predictions.workspace.filtersDescription":
    "\nSuchen Sie nach Assets und schränken Sie den aktuellen Vorhersagesatz nach Schweregrad, Standort, Asset-Typ und Aktualität der Vorhersage ein.",
  "predictions.workspace.searchLabel": "\nInventar durchsuchen",
  "predictions.workspace.searchPlaceholder": "\nNach Asset-Namen oder Standort",
  "predictions.workspace.legendDescription":
    " filtern\nDie Farben des Schweregrads bleiben auf allen Spotlight-Karten, im Inventarraster und in der Erklärbarkeitsleiste konsistent.",
  "predictions.workspace.methodologyTitle": "\nRanking-Modell",
  "predictions.workspace.methodologyDescription":
    "\nScores kombinieren KI-Dringlichkeit mit Inventar, Arbeitsablauf und Geschäftsfluss, sodass Bediener von einer Warteschlange aus arbeiten können.",
  "predictions.workspace.methodologyItemSignals":
    "\nKI-Vertrauen, Vorhersagetyp und verbleibende Lebensdauerfenster bestimmen die grundlegende betriebliche Dringlichkeit.",
  "predictions.workspace.methodologyItemInventory":
    "\nInventarwert, Anlagenzustand und Lebenszyklusphase erhöhen den Druck auf stark gefährdete Anlagen.",
  "predictions.workspace.methodologyItemWorkflow":
    "\nOffene Aufgaben plus aktive Beschaffungs- oder Entsorgungstätigkeit bestimmen, was als nächstes passieren soll.",
  "predictions.workspace.panelTitle": "\nRisiko-Kommandozentrale",
  "predictions.workspace.panelDescription":
    "\nÜberwachen Sie die stärksten KI-Signale, ihre Bestandsrisiken und den Betriebsablauf, der sich bereits um sie herum aufbaut.",
  "predictions.workspace.generatedAt": "\nAktualisiert {generatedAt}",
  "predictions.workspace.kpi.activeSignals": "\nAktive Signale",
  "predictions.workspace.kpi.activeSignalsHint":
    "\nGefilterte KI-Vorhersagen, die sich derzeit in der Unternehmenswarteschlange befinden.",
  "predictions.workspace.kpi.activeSignalsTrend": "\n{count} kritisch oder Notfall",
  "predictions.workspace.kpi.dueSoon": "\nBald fällig",
  "predictions.workspace.kpi.dueSoonHint":
    "\nSignale, deren Restlebensdauer innerhalb der Eingriffsschwelle liegt.",
  "predictions.workspace.kpi.inventoryExposure": "\nBestandsrisiko",
  "predictions.workspace.kpi.inventoryExposureHint":
    "\nBuchwert, dargestellt durch den gefilterten Vorhersagesatz.",
  "predictions.workspace.kpi.aiCoverage": "\nKI-Abdeckung",
  "predictions.workspace.kpi.aiCoverageHint":
    "\nAssets im aktuellen Inventarsegment mit Vorhersageverlauf.",
  "predictions.workspace.kpi.averageConfidenceTrend":
    "\n{confidence}% durchschnittliches Vertrauen",
  "predictions.workspace.kpi.liveTrend": "\nLive ab {generatedAt}",
  "predictions.workspace.distribution.severity": "\nSchweregradmix",
  "predictions.workspace.distribution.assetMix": "\nVermögensmix",
  "predictions.workspace.distribution.siteMix": "\nSite-Mix",
  "predictions.workspace.boardTitle": "\nRangiertes Risikoboard",
  "predictions.workspace.boardDescription":
    "\nDie stärksten Signale in den Bereichen Ausfall, Beeinträchtigung, Wartung und Lebenszyklusdruck, geordnet nach Dringlichkeit und Auswirkungen auf das Unternehmen.",
  "predictions.workspace.boardEmpty":
    "\nEs sind noch keine gefilterten Vorhersagen verfügbar. Erweitern Sie die Filter oder warten Sie, bis weitere Telemetriedaten eintreffen.",
  "predictions.workspace.table.title": "\nBestandsrisikoraster",
  "predictions.workspace.table.description":
    "Ein dichtes Bedienerraster zum Scannen von Asset-Exposition, Arbeitsdruck und der nächsten Erklärbarkeitsaktion.",
  "predictions.workspace.table.asset": "\nAsset",
  "predictions.workspace.table.severity": "\nSignal",
  "predictions.workspace.table.inventory": "\nInventar",
  "predictions.workspace.table.workflow": "\nWorkflow",
  "predictions.workspace.table.inspect": "\nOffene Beweise",
  "predictions.workspace.tableEmpty":
    "\nKeine Inventarzeilen stimmen mit dem aktuellen Filtersatz überein.",
  "predictions.workspace.railTitle": "\nErklärbarkeitsschiene",
  "predictions.workspace.railDescription":
    "\nEin prägnantes KI-Briefing sowie das Modell des ausgewählten Signals, Quelldaten und unterstützende Betriebsnachweise.",
  "predictions.workspace.assistant.title": "\nKurzbeschreibung der KI-Operationen",
  "predictions.workspace.assistant.description":
    "\nEine kurze Unternehmenszusammenfassung basierend auf dem aktiven Vorhersagedatensatz und dem ausgewählten Signal.",
  "predictions.workspace.assistant.sourceAI": "\nKI-Brief",
  "predictions.workspace.assistant.sourceSystem": "\nSystemübersicht",
  "predictions.workspace.assistant.generatedAt": "\nGeneriert {generatedAt}",
  "predictions.workspace.chatContext":
    "\nVorhersage-Kontrollzentrum. Einheitlicher Arbeitsbereich für KI-Risikosignale, Bestandsrisiko, Betriebsrückstand und nachgelagerten Beschaffungsdruck. Steuerelemente: Suche, Schweregrad, Standort, Asset-Typ und Datumsbereich. Hauptabschnitte: KPI-Streifen, Rangfolge-Risikotafel, Inventarraster und KI-Beweisleiste.",
  "predictions.workspace.assistant.headlineCritical":
    "\nKritisches Risiko ist die Festlegung der Betriebslage",
  "predictions.workspace.assistant.headlineMonitor":
    "\nInterventionsfenster werden in der gesamten Warteschlange komprimiert",
  "predictions.workspace.assistant.headlineStable":
    "\nDie Warteschlange ist aktiv, wird aber weitgehend kontrolliert",
  "predictions.workspace.assistant.fallbackLead":
    "\n{asset} bei {site} ist der führende Interventionskandidat mit {days} verbleibenden Tagen bei {confidence} % Konfidenz.",
  "predictions.workspace.assistant.fallbackEmpty":
    "\nDerzeit führt keine dominante Vorhersage die gefilterte Warteschlange an. Sorgen Sie für eine gesunde Telemetrieabdeckung und überwachen Sie neue Signale, sobald sie eintreffen.",
  "predictions.workspace.assistant.fallbackCoverage":
    "\nDer aktuelle Abschnitt enthält {signals} Live-Signale, die etwa {exposure} der Bestandsgefährdung darstellen, wobei {dueSoon} Interventionsfenster bereits innerhalb des kurzfristigen Schwellenwerts liegen.",
  "predictions.workspace.card.score": "\nPunktzahl",
  "predictions.workspace.card.scoreValue": "\nPunktzahl {score}",
  "predictions.workspace.card.remainingLifeValue": "\n{days} Tage",
  "predictions.workspace.card.inventory": "\nInventar",
  "predictions.workspace.card.signalCoverage": "\nQuelldaten",
  "predictions.workspace.card.signalCoverageValue": "\n{count} Funktionsgruppen",
  "predictions.workspace.card.openTasksValue": "\n{count} offene Aufgaben",
  "predictions.workspace.card.workOrdersValue": "\n{count} aktive Arbeitsaufträge",
  "predictions.workspace.card.documentsValue": "\n{count} offene Dokumente",
  "predictions.workspace.card.generatedTask": "\nAufgabe generiert",
  "predictions.workspace.action.escalate":
    "\nSofortige Eskalation an die Wartungsleitung und Validierung der Interventionsfähigkeit innerhalb des nächsten Betriebsfensters.",
  "predictions.workspace.action.procure":
    "\nBestätigen Sie die Teileabdeckung, richten Sie die Beschaffung aus und verschieben Sie die Anlage in den nächsten verfügbaren Interventionsslot.",
  "predictions.workspace.action.schedule":
    "Planen Sie eine Wartungsüberprüfung und stellen Sie sicher, dass der Rückstand und der Bestandsplan das Signal absorbieren können, bevor es sich verfestigt.",
  "predictions.workspace.action.monitor":
    "\nHalten Sie die Telemetrieerfassung stabil, überprüfen Sie die Asset-Trendlinie und überwachen Sie auf weitere Verschlechterungen, bevor Sie mit der Arbeit beginnen.",
  "predictions.workspace.detail.evidence": "\nBetriebsbeweis",
  "predictions.workspace.detail.evidenceDescription":
    "\nDeterministische Beweise, die aus Asset-, Workflow- und Transaktionsdokumentdatensätzen rund um das ausgewählte Signal zusammengestellt wurden.",
  "predictions.workspace.detail.sourceData": "\nQuelldaten und Modellmetadaten",
  "predictions.workspace.detail.sourceDataDescription":
    "\nAus der gespeicherten Eingabenutzlast erfasste Funktionsgruppen sowie Modell- und Anbietermetadaten.",
  "predictions.workspace.detail.lifecycle": "\nLebenszyklus",
  "predictions.workspace.detail.condition": "\nBedingung",
  "predictions.workspace.detail.generatedAt": "\nErstellt am",
  "predictions.workspace.detail.openTasksEvidence":
    "\nFür dieses Asset sind bereits {count} aktive Wartungsaufgaben offen.",
  "predictions.workspace.detail.noOpenTasksEvidence":
    "\nDerzeit ist keine aktive Wartungsaufgabe mit diesem Asset verknüpft.",
  "predictions.workspace.detail.workOrdersEvidence":
    "\n{count} aktive Arbeitsaufträge sind bereits mit dieser Anlage verknüpft.",
  "predictions.workspace.detail.customerOrdersEvidence":
    "\n{count} Kundenbestellung(en) durchlaufen derzeit diesen Asset-Kontext.",
  "predictions.workspace.detail.purchaseOrdersEvidence":
    "\n{count} Bestellungen sind für diesen Asset-Kontext noch offen.",
  "predictions.workspace.detail.invoicesEvidence":
    "\n{count} Rechnung(en) unterliegen für diesen Asset-Kontext noch Inkasso- oder Erfüllungsdruck.",
  "predictions.workspace.detail.noDocumentEvidence":
    "\nDerzeit sind keine verknüpften Arbeitsaufträge, Kundenaufträge, Bestellungen oder Rechnungen geöffnet.",
  "predictions.workspace.detail.createdEvidence": "\nSignal erzeugt {generatedAt}.",
  "predictions.workspace.outcomeTitle": "\nErgebnisse aus der Förderung in die Tat umsetzen",
  "predictions.workspace.outcomeDescription":
    "\nVerschieben Sie das stärkste Signal in die Aufgaben-, Beschaffungs- oder Überwachungsverfolgung.",
  "finance.title": "\nFinanzen",
  "finance.subtitle": "\nAbschreibungsrisiko und KI-bereinigte Bewertungen",
  "financePlanning.title": "\nFinanzplanung",
  "financePlanning.subtitle": "\nBudgetlage, Kapitaldruck und Lebenszyklusplanung",
  "financePlanning.coverage":
    "\nNutzen Sie die aktuelle Anlagen-, Standort-, Dokument- und Prognoselage als Grundlage für die Budget- und Szenarioplanung.",
  "financePlanning.kpi.assets": "\nVerfolgte Vermögenswerte",
  "financePlanning.kpi.assetsDesc": "\nVermögenswerte, die in Planungsszenarien einfließen können",
  "financePlanning.kpi.sites": "\nWebsites im Geltungsbereich",
  "financePlanning.kpi.sitesDesc": "\nStandorte, die zur Budgetplanung beitragen",
  "financePlanning.kpi.openDocuments": "\nDokumente öffnen",
  "financePlanning.kpi.openDocumentsDesc":
    "\nDerzeit aktive Transaktionsdokumente für Nachfrage, Lieferung, Einkauf und Abrechnung",
  "financePlanning.kpi.dueSoon": "\nBald fällige Signale",
  "financePlanning.kpi.dueSoonDesc":
    "\nSignale, die sich zu einer Ersatznachfrage verfestigen können",
  "financePlanning.summary.alertTitle":
    "\nDie Planungshaltung kann bereits auf Live-Portfoliodaten basieren",
  "financePlanning.summary.alertDescription":
    "Verwenden Sie Standortplanungsprofile, bald fällige Asset-Signale, ausführungsbereite Dokumente und gespeicherte Berichte, um Budgets und Szenarien ohne separaten Planungsstapel bereitzustellen.",
  "financePlanning.summary.tab.readiness": "\nBereitschaft",
  "financePlanning.summary.tab.handoff": "\nÜbergabe",
  "financePlanning.summary.tab.intake": "\nDomainübergreifende Aufnahme",
  "financePlanning.summary.siteTitle": "\nBereitschaft zur Standortplanung",
  "financePlanning.summary.siteDescription":
    "\nPlanungsprofile sind die aktuelle Struktur für die Einbeziehung von Anlagen-, Flotten- und Betriebskontexten in Finanzentscheidungen.",
  "financePlanning.summary.siteProfiles": "\nPlanungsprofile",
  "financePlanning.summary.siteProfilesDesc":
    "\n{total} Standorte stehen derzeit zur Planung zur Verfügung.",
  "financePlanning.summary.assetScope": "\nPortfolio im Umfang",
  "financePlanning.summary.assetScopeDesc":
    "\nDie aktuell verwaltete Asset-Basis ist bereits groß genug, um szenariogesteuerte Planungsabschnitte zu unterstützen.",
  "financePlanning.summary.postureTitle": "\nBereitschaftshaltung",
  "financePlanning.summary.postureDescription":
    "\nFördern Sie den Standortplanungskontext, ausführungsreife Dokumente und Risikosignale gemeinsam, sodass die Finanzplanung zu einem vernetzten Arbeitsablauf und nicht zu einem Tabellenkalkulationsexport wird.",
  "financePlanning.summary.badgeSites": "\nWebsites",
  "financePlanning.summary.badgeDocuments": "\nDokumente",
  "financePlanning.summary.badgeSignals": "\nSignale",
  "financePlanning.summary.pressureTitle": "\nBald fälliger Kapitaldruck",
  "financePlanning.summary.pressureDesc":
    "\nPrognosen innerhalb des kurzfristigen Zeitfensters sind der aktuelle Frühindikator für Budget und Ersatzbedarf.",
  "financePlanning.summary.documentsTitle": "\nAusführungsfertige Dokumente",
  "financePlanning.summary.documentsDesc":
    "\nGenehmigte und ausgestellte Betriebsdokumente liegen bereits für die Lieferung, den Einkauf und die Nachverfolgung der Abholung vor.",
  "financePlanning.summary.reportTitle": "\nGespeicherte Planungsausgaben",
  "financePlanning.summary.reportDesc":
    "\nGespeicherte Berichte sind die aktuelle Übergabeoberfläche für die Paketerstellung und Planungsüberprüfung durch die Beteiligten.",
  "financePlanning.summary.intakeTitle": "\nBereichsübergreifende Planungsaufnahme",
  "financePlanning.summary.intakeDescription":
    "\nDie Finanzplanung ist jetzt die Rollup-Oberfläche für den betrieblichen Bedarf, der in Flotte, Gebäuden und Sensoren erfasst wird.",
  "financePlanning.summary.intakeFleetTitle": "\nFlotteninitiativen warten auf Szenariopaketierung",
  "financePlanning.summary.intakeFleetDesc":
    "\nFahrzeugersatz-, Compliance- und Wartungsinitiativen können jetzt als direkte Finanzierungsbeiträge gezählt werden.",
  "financePlanning.summary.intakeBuildingsTitle":
    "\nEinrichtungsinitiativen bereit für die Budgeterstellung",
  "financePlanning.summary.intakeBuildingsDesc":
    "\nFür die Gestaltung von Kapital- und Betriebsszenarien stehen Gebäudesystem- und Rauminitiativen zur Verfügung.",
  "financePlanning.summary.intakeSensorsTitle": "\nSensoralarme signalisieren Planungsdruck",
  "financePlanning.summary.intakeSensorsDesc":
    "\nSensoralarmregeln identifizieren Telemetriebedingungen, die einen Eingriff, Ersatzteile oder ein Ersatzbudget rechtfertigen können.",
  "financePlanning.summary.intakeAlert":
    "Nutzen Sie diese Eingangsspur, um betriebliche Arbeit in Planungsszenarien umzuwandeln, ohne denselben Entscheidungskontext erneut einzugeben.",
  "financePlanning.summary.intakeTotal": "\nEingehende Betriebssignale",
  "financePlanning.summary.intakeTotalDesc":
    "\nDerzeit verfügbare domänenübergreifende Initiativen und Regeln zur Umsetzung in Finanzplanungsszenarien.",
  "financePlanning.summary.scenarioDrafts": "\nSzenarien an Deck",
  "financePlanning.summary.scenarioDraftsDesc":
    "\nVorhandene Planungsszenarien, die bereits im Arbeitsbereich „Finanzplanung“ erfasst wurden.",
  "financePlanning.summary.badgeFleet": "\nFlotte",
  "financePlanning.summary.badgeBuildings": "\nGebäude",
  "financePlanning.summary.badgeSensors": "\nSensoren",
  "financePlanning.summary.intakePosture":
    "\nDer Arbeitsbereich „Finanzplanung“ kann nun als gemeinsamer Übergabepunkt zwischen der Erfassung operativer Initiativen und der Budgetgestaltung auf Portfolioebene fungieren.",
  "financePlanning.seed.ready": "\nBereit zur Aussaat",
  "financePlanning.seed.empty": "\nEs liegt noch kein Planungssignal für die Aussaat vor.",
  "financePlanning.seed.count": "\n{count} Signale im Einlass",
  "financePlanning.seed.apply": "\nSeed-Szenario",
  "financePlanning.seed.unavailable": "\nKein Saatgut verfügbar",
  "financePlanning.seed.applied": "\n{source} Kontext in das Szenarioformular kopiert.",
  "financePlanning.seed.fleet.title": "\nSaatgut von Fleet",
  "financePlanning.seed.fleet.description":
    "\nNutzen Sie die neueste Flotteninitiative, um ein Planungsszenario mit Umfang, Dringlichkeit und Betriebshinweisen vorab auszufüllen.",
  "financePlanning.seed.buildings.title": "\nSaatgut aus Gebäuden",
  "financePlanning.seed.buildings.description":
    "\nNutzen Sie die neueste Einrichtungsinitiative, um den Kapital- oder Betriebsplanungskontext vorab auszufüllen.",
  "financePlanning.seed.sensors.title": "\nSaatgut von Sensoren",
  "financePlanning.seed.sensors.description":
    "\nNutzen Sie die neueste Sensoralarmregel, um den Telemetriedruck in einen Planungsszenario-Starter zu verwandeln.",
  "financePlanning.seed.fleetPrefix": "\nFlottenübergabe",
  "financePlanning.seed.fleetContext":
    "\nAus Flotteninitiative gesät. Kategorie: {category}. Priorität: {priority}.",
  "financePlanning.seed.fleetSummary": "\nNeueste Flotteninitiative aktualisiert {updatedAt}.",
  "financePlanning.seed.buildingsPrefix": "\nÜbergabe der Einrichtungen",
  "financePlanning.seed.buildingsContext":
    "\nAussaat durch Facility-Initiative. Kategorie: {category}. Phase: {phase}.",
  "financePlanning.seed.buildingsSummary":
    "\nNeueste Einrichtungsinitiative aktualisiert {updatedAt}.",
  "financePlanning.seed.sensorsPrefix": "\nSensorübergabe",
  "financePlanning.seed.sensorsContext":
    "\nAus der Sensoralarmregel gesetzt. Serie: {seriesKey}. Komparator: {comparator}. Schwellenwert: {threshold}. Schweregrad: {severity}.",
  "financePlanning.seed.sensorsSummary": "\nLetzte Sensoralarmregel aktualisiert {updatedAt}.",
  "financePlanning.form.title": "\nErstellen Sie ein Planungsszenario",
  "financePlanning.form.description":
    "\nErfassen Sie das nächste Budget- oder Kapitalszenario direkt aus der Live-Planung und übergeben Sie es dann an die Finanz-, Dokument-Workflows und Berichtsflüsse.",
  "financePlanning.form.badge": "\nLanglebiger SSR-Durchfluss",
  "financePlanning.form.nameLabel": "\nSzenariotitel",
  "financePlanning.form.namePlaceholder": "\nCampus-HVAC-Aktualisierung 2027",
  "financePlanning.form.nameHint":
    "\nBenennen Sie die Entscheidungspaketoperatoren, die sie später erkennen werden.",
  "financePlanning.form.scopeLabel": "\nGeltungsbereich",
  "financePlanning.form.scopePlaceholder": "Gebäude, Flotte, Sensoren oder Portfolio-Slice",
  "financePlanning.form.scopeHint":
    "\nHalten Sie den Umfang auf eine Abteilung, eine Site-Gruppe oder ein Portfolio-Thema ausgerichtet.",
  "financePlanning.form.horizonLabel": "\nPlanungshorizont",
  "financePlanning.form.horizonHint": "\n{min}-{max} Monate, je nach Planungszyklus.",
  "financePlanning.form.horizonUnit": "\nMonate",
  "financePlanning.form.horizonValue": "\n{months} Monate",
  "financePlanning.form.notesLabel": "\nHinweise und Annahmen",
  "financePlanning.form.notesPlaceholder":
    "\nErfassen Sie Ausgabenannahmen, zeitliche Einschränkungen, die Risikolage und was als nächstes in die Beschaffung oder Berichterstattung einfließen sollte.",
  "financePlanning.form.notesHint":
    "\nVerwenden Sie dies, um die Begründung aufzuzeichnen, die in Genehmigungen und Berichtspaketen enthalten sein soll.",
  "financePlanning.form.requiredHint": "\nTitel, Umfang und Horizont sind erforderlich.",
  "financePlanning.form.submit": "\nSzenario speichern",
  "financePlanning.form.submitAria": "\nFinanzplanungsszenario speichern",
  "financePlanning.form.recentTitle": "\nAktuelle Szenarien",
  "financePlanning.form.recentDescription":
    "\nDiese Szenarien werden nun als dauerhafte Finanzplanungsdatensätze beibehalten, ohne den SSR-Fluss zu verlassen.",
  "financePlanning.form.empty": "\nNoch keine Finanzplanungsszenarien erfasst.",
  "financePlanning.form.savedAt": "\nAktualisiert {updatedAt}",
  "financePlanning.form.notesEmpty": "\nNoch keine Notizen erfasst.",
  "financePlanning.validation.titleRequired": "Szenariotitel ist erforderlich.",
  "financePlanning.validation.scopeRequired": "\nSzenarioumfang ist erforderlich.",
  "financePlanning.validation.seedSourceInvalid":
    "\nDie Saatgutquelle muss von einer Flotte, Gebäuden oder Sensoren stammen.",
  "financePlanning.validation.horizonRange":
    "\nDer Planungshorizont muss zwischen {min} und {max} Monaten liegen.",
  "financePlanning.feedback.draftSaved":
    "\nFinanzszenario im Finanzplanungsarbeitsbereich gespeichert.",
  "financePlanning.feedback.draftSaveFailed":
    "\nDas Finanzszenario kann derzeit nicht beibehalten werden.",
  "financePlanning.status.draft": "\nSzenario",
  "financePlanning.draft.promoteReports": "In Berichten oeffnen",
  "financePlanning.readiness.assets":
    "\nDie Anlagen- und Standortlage trägt bereits zum Planungsspielraum bei.",
  "financePlanning.readiness.documents":
    "\nAusschreibungen, Bestellungen, Arbeitsaufträge, Bestellungen und Rechnungen können direkt in Szenarioentscheidungen einfließen.",
  "financePlanning.readiness.reporting":
    "\nAktuelle Berichtsoberflächen können Planungsergebnisse ohne einen neuen Stack bündeln.",
  "financePlanning.page.eyebrow": "\nFinanzen",
  "financePlanning.action.createScenario": "\nSzenario erstellen",
  "financePlanning.action.finance":
    "\nÜberprüfen Sie die aktuelle Abschreibungssituation, bevor Sie den Plan ändern.",
  "financePlanning.action.documents":
    "\nÜbertragen Sie Szenarioentscheidungen in die Dokumentarbeitsbereiche zur Angebots-, Bestell- und Einkaufsverfolgung.",
  "financePlanning.action.reports":
    "\nVerpacken Sie den Planungsstand in Stakeholder-orientierte Berichtspakete.",
  "financePlanning.action.fleet":
    "\nVerbinden Sie Bedarfs- und Ersatzdruck wieder mit dem Fahrzeugbetrieb.",
  "financePlanning.action.buildings":
    "\nFolgen Sie dem Kapitaldruck in Bezug auf Einrichtungen und Gebäudesystemabdeckung.",
  "financePlanning.action.sensors":
    "\nVerwenden Sie Sensoren und Alarmhaltung, um die Bereitschaft und Planungsannahmen unter Druck zu testen.",
  "estate.title": "\nNachlass",
  "estate.subtitle": "Portfolio-Governance, Service-Sicherung, Bereitschaft und Programmkontrollen",
  "estate.coverage":
    "\nEine maßgebende Nachlasskontrollebene für Register, FM-Governance, Bereitschaft, Partnerschaften, Verwaltung und Berichtsmaßnahmen.",
  "estate.kpi.assets": "\nRegistrierte Vermögenswerte",
  "estate.kpi.assetsDesc":
    "\nAktuelle Abdeckung des Immobilienvermögensregisters für alle verwalteten Vermögensklassen.",
  "estate.kpi.facilities": "\nStandorte der Einrichtung",
  "estate.kpi.facilitiesDesc":
    "\nStandorte, die bereits als Einrichtungen innerhalb der Immobilienhierarchie markiert sind.",
  "estate.kpi.workOrders": "\nAktive Arbeitsaufträge",
  "estate.kpi.workOrdersDesc":
    "\nDie operative Umsetzung läuft derzeit über FM und Nachlassabwicklung.",
  "estate.kpi.approvals": "\nAusstehende Genehmigungen",
  "estate.kpi.approvalsDesc":
    "\nNachlassinitiativen und Projektgenehmigungen warten derzeit auf den Fortschritt durch die Governance.",
  "estate.summary.alertTitle":
    "\nDie Nachlassverwaltung basiert jetzt auf Live-Betriebssystemen der Aufzeichnung",
  "estate.summary.alertDescription":
    "\nNutzen Sie die aktuelle Registrierung, den FM-Lieferfluss, das kommerzielle Dokumentendiagramm und die Genehmigungskontrollen, um Portfolio-Governance, -Sicherung und -Bereitschaft über eine verbundene Nachlassoberfläche auszuführen.",
  "estate.summary.tab.registry": "\nRegistrierung",
  "estate.summary.tab.delivery": "\nServicebereitstellung",
  "estate.summary.tab.maintenance": "\nFM-Governance",
  "estate.summary.tab.readiness": "\nBereitschaft",
  "estate.summary.tab.partnerships": "\nGrundstücke und Partner",
  "estate.summary.tab.stewardship": "\nVerwaltung",
  "estate.summary.tab.operations": "\nBereiche und GFE",
  "estate.summary.tab.strategy": "\nStrategie",
  "estate.summary.tab.programme": "\nProgramm",
  "estate.summary.registryTitle": "\nBereitschaft zur Anlagenregistrierung",
  "estate.summary.registryDescription":
    "\nDie Vermögens- und Anlagenabdeckung stellt nun die maßgebliche Nachlasshierarchie für die Portfoliosteuerung, -sicherung und Investitionsüberprüfung dar.",
  "estate.summary.registryAssets": "\nVermögenswerte im Geltungsbereich",
  "estate.summary.registryAssetsDesc":
    "\n{total} Einrichtungen befinden sich derzeit innerhalb der verwalteten Grundstücksfläche.",
  "estate.summary.registryTelemetry": "\nMit Telemetrie verknüpfte Assets",
  "estate.summary.registryTelemetryDesc":
    "\nAngeschlossene Anlagen bieten Live-Zustand und Nutzungskontext für die Priorisierung.",
  "estate.summary.registryHierarchy": "\nHierarchisch zugeordnete Vermögenswerte",
  "estate.summary.registryHierarchyDesc":
    "\n{coverage} des Registers trägt jetzt eine explizite Nachlasshierarchieplatzierung.",
  "estate.summary.registryCapability": "\nCapability-Linked Assets",
  "estate.summary.registryCapabilityDesc":
    "\n{coverage} der Registrierung benennt nun die Betriebsfähigkeit, die jedes Asset unterstützt.",
  "estate.summary.postureTitle": "\nKontrollieren Sie die Körperhaltung",
  "estate.summary.postureDescription":
    "\nHalten Sie die Vermögensabdeckung, aktuelle Betriebssignale und dauerhafte Initiativen aufeinander abgestimmt, damit das strategische Immobilienmanagement mit der Umsetzung verbunden bleibt.",
  "estate.summary.badgeIso": "ISO 55001-konform",
  "estate.summary.badgeFm": "\nFM-Lieferung",
  "estate.summary.badgeP3m": "P3M-Stufe",
  "estate.summary.deliveryTitle": "\nOperative Leistungserbringung",
  "estate.summary.deliveryDescription":
    "Hard-FM-Ausführung, Vertragsaktivität und nachgelagerte Dokumente zeigen den aktuellen Lieferdruck im gesamten Betriebsmodell des Anwesens.",
  "estate.summary.deliveryOpenWorkOrders": "\nOffene Arbeitsaufträge",
  "estate.summary.deliveryOpenWorkOrdersDesc":
    "\nDerzeit aktive Ausführung im Wartungs-, Sicherungs- und Wiederherstellungsablauf.",
  "estate.summary.deliveryOverdueWorkOrders": "\nÜberfällige Arbeitsaufträge",
  "estate.summary.deliveryOverdueWorkOrdersDesc":
    "\nGeplante Arbeiten liegen bereits außerhalb der Zieltermine und erfordern Maßnahmen zur Schadensbegrenzung.",
  "estate.summary.deliveryDocuments": "\nAktive Betriebsdokumente",
  "estate.summary.deliveryDocumentsDesc":
    "\nAngebotsanfragen, Bestellungen, Bestellungen, Rechnungen und Arbeitsaufträge bewegen sich noch durch das Vertragsdiagramm.",
  "estate.summary.deliveryExecutionReady": "\nAusführungsfertige Dokumente",
  "estate.summary.deliveryExecutionReadyDesc":
    "\nDokumente, deren Eingang bereits freigegeben wurde und die Liefer- oder Abrechnungsaktivität vorantreiben können.",
  "estate.summary.maintenanceAlertTitle":
    "\nHarte und weiche FM-Governance befinden sich jetzt im selben strategischen Arbeitsbereich",
  "estate.summary.maintenanceAlertDescription":
    "\nVerwenden Sie ein dauerhaftes Register für SFG20-Pläne, gesetzliche Inspektionen, Assurance-Reviews, Soft-FM-Dienste und Benchmark-Signale, anstatt die FM-Governance vom Gesamtbild des Nachlasses zu trennen.",
  "estate.summary.maintenanceTitle": "\nFM-Governance-Haltung",
  "estate.summary.maintenanceDescription":
    "\nVerfolgen Sie geplante Wartungsarbeiten, gesetzliche Inspektionen, die Bereitstellung von Soft-FM-Diensten und den Benchmark-Druck, ohne die SSR-Anwesenheitskontrollebene zu verlassen.",
  "estate.summary.maintenanceRegister": "\nFM-Governance-Register",
  "estate.summary.maintenanceRegisterDesc":
    "\n{count} Datensätze erfordern derzeit Compliance oder Zustelleingriffe.",
  "estate.summary.maintenanceHardFm": "\nHarte FM-Steuerung",
  "estate.summary.maintenanceHardFmDesc":
    "\n{count} Gesetzliche Prüfungen finden derzeit im Wartungsregister statt.",
  "estate.summary.maintenanceSoftFm": "\nSoft-FM-Steuerung",
  "estate.summary.maintenanceSoftFmDesc":
    "\n{count} Benchmarking-Aufzeichnungen vergleichen derzeit Service-Output und Produktivitätsstatus.",
  "estate.summary.maintenancePerformance": "\nServiceleistung",
  "estate.summary.maintenancePerformanceDesc":
    "\n{count} geplante Serviceaufzeichnungen prägen derzeit den operativen FM-Kalender.",
  "estate.summary.maintenancePerformanceEmpty": "\nNoch keine Punktzahl",
  "estate.summary.maintenancePerformanceValue": "\n{score}% durchschnittliche Punktzahl",
  "estate.summary.readinessAlertTitle":
    "\nDie Bereitschaft des Kombis spiegelt sich jetzt im Live-Betriebsdiagramm wider",
  "estate.summary.readinessAlertDescription":
    "\nReichweitenbezogene Fähigkeitsressourcen, Infrastrukturbeschränkungen, Inspektionsschulden, Arbeitskräfteaktivitäten und Projektrisiken werden in einer SSR-Bereitschaftsansicht zusammengefasst.",
  "estate.summary.readinessTitle": "\nBereitschaftshaltung für den Nachlass",
  "estate.summary.readinessDescription":
    "Verwenden Sie diese Bereitschaftsschicht, um Reichweitenverfügbarkeit, Infrastruktureinschränkungen, Fähigkeitsstatus und Auswirkungen auf die Belegschaft zu überwachen, ohne die Kontrollebene des Standorts zu verlassen.",
  "estate.summary.readinessRangeAvailability": "\nBereichsverfügbarkeit",
  "estate.summary.readinessRangeAvailabilityDesc":
    "\n{total} Reichweiten- und trainingsbezogene Ressourcen werden derzeit zur Überwachung der Bereitschaft verfolgt.",
  "estate.summary.readinessConstraints": "\nInfrastruktureinschränkungen",
  "estate.summary.readinessConstraintsDesc":
    "\n{assets} begrenzte Vermögenswerte und {projects} Hochrisikoprojekte tragen derzeit zum Immobiliendruck bei.",
  "estate.summary.readinessCapability": "\nFähigkeitsbereitschaft",
  "estate.summary.readinessCapabilityDesc":
    "\n{watch} Fähigkeitsgruppierungen bleiben in allen {total} verfolgten Bereitschaftsgruppierungen unter Beobachtung.",
  "estate.summary.readinessWorkforce": "\nErfasste Arbeitsstunden",
  "estate.summary.readinessWorkforceDesc":
    "\n{inspections} Überfällige Inspektionsaufgaben bleiben im Vergleich zum aktuellen Bereitschaftsbild offen.",
  "estate.summary.programmeTitle": "\nProgramm- und Genehmigungsablauf",
  "estate.summary.programmeDescription":
    "\nNachlassinitiativen, Projektregister, Genehmigungsphasen und Finanzszenarien liefern den aktuellen Übergang zur P3M-Bereitstellung, DIO-Überprüfung und Programmberichterstattung.",
  "estate.summary.programmeInitiatives": "\nNachlassinitiativen",
  "estate.summary.programmeInitiativesDesc":
    "\nDauerhafte Programmdatensätze werden jetzt im Nachlassarbeitsbereich erfasst.",
  "estate.summary.programmeProjects": "\nProjektregister",
  "estate.summary.programmeProjectsDesc":
    "\nBei langlebigen Immobilienprojekten werden jetzt die Art der Lieferung, die Kostenlage, der Ressourcendruck und der Genehmigungsstatus erfasst.",
  "estate.summary.programmeApprovalQueue": "\nProjektgenehmigungen",
  "estate.summary.programmeApprovalQueueDesc":
    "\n{delayed} verzögerte Elemente verbleiben derzeit in der aktiven Projektgenehmigungswarteschlange.",
  "estate.summary.programmeControls": "\nProjektsteuerung",
  "estate.summary.programmeControlsDesc":
    "\n{changes} Projektänderungselemente verbleiben derzeit im aktiven Projektkontrollfluss.",
  "estate.summary.partnershipsAlertTitle":
    "\nDie Aufsicht über Grundstücke, Gewerbe und Gastronomie liegt jetzt im strategischen Arbeitsbereich des Anwesens",
  "estate.summary.partnershipsAlertDescription":
    "\nLändliche Lizenzen und Pachtverträge, Einkommensunterlagen Dritter und die ESS-Gastronomieaufsicht werden jetzt als dauerhafte Unterlagen zu Grundstücksverträgen erfasst, die an Standorte und Ausrüstung gebunden sind.",
  "estate.summary.partnershipsTitle": "\nGrundstücks- und Partnerkoordination",
  "estate.summary.partnershipsDescription":
    "\nVerwenden Sie dieses Register, um die landwirtschaftliche Landnutzung, kommerzielle Aktivitäten Dritter und die Koordinierung der Gastronomie anhand desselben Standorts und Vermögensdiagramms zu verwalten, das den Betrieb des Anwesens steuert.",
  "estate.summary.partnershipsRegister": "\nVereinbarungsregister",
  "estate.summary.partnershipsRegisterDesc":
    "{count} Vereinbarungseinträge sind derzeit im Nachlassregister aktiv.",
  "estate.summary.partnershipsRural": "\nLändliche Vereinbarungen",
  "estate.summary.partnershipsRuralDesc":
    "\nWeide-, Pacht- und Landzugangsaufzeichnungen werden nun neben den Grundstücksbetrieben geführt.",
  "estate.summary.partnershipsCommercial": "\nKommerzielle Einnahmen",
  "estate.summary.partnershipsCommercialDesc":
    "\n{count} Vereinbarungsdatensätze sind derzeit zur Nutzungsüberwachung direkt mit einem Vermögenswert verknüpft.",
  "estate.summary.partnershipsCoordination": "\nKoordinationskonflikte",
  "estate.summary.partnershipsCoordinationDesc":
    "\nDie Aufsicht über das Catering liegt derzeit im Durchschnitt bei {score} aller bewerteten Serviceaufzeichnungen.",
  "estate.summary.partnershipsCateringValue": "\n{score}% durchschnittliche Punktzahl",
  "estate.summary.partnershipsCateringValueEmpty": "\nkeine gewerteten Datensätze",
  "estate.summary.stewardshipAlertTitle":
    "\nForst-, Kulturerbe- und Umweltkontrollen nutzen jetzt ein gemeinsames Nachlassverwaltungsregister",
  "estate.summary.stewardshipAlertDescription":
    "\nWaldpläne, Genehmigungsdruck für das Kulturerbe, Habitatüberwachung und Aufzeichnungen über geschützte Arten befinden sich jetzt im selben Standort- und Vermögensdiagramm wie Lieferung und Bereitschaft.",
  "estate.summary.stewardshipTitle": "\nHaltung der Nachlassverwaltung",
  "estate.summary.stewardshipDescription":
    "\nVerwenden Sie dieses Register, um forstwirtschaftliche Tätigkeiten, den Zustand des Kulturerbes und den Genehmigungsdruck sowie Umweltschutzverpflichtungen zu koordinieren, ohne den Arbeitsbereich des Anwesens zu verlassen.",
  "estate.summary.stewardshipRegister": "\nVerwaltungsregister",
  "estate.summary.stewardshipRegisterDesc":
    "\n{count} Stewardship-Datensätze erfordern derzeit risikobehaftete oder Compliance-gesteuerte Aufmerksamkeit.",
  "estate.summary.stewardshipForestry": "\nForstwirtschaftliche Aufzeichnungen",
  "estate.summary.stewardshipForestryDesc":
    "\nDer erfasste Holzproduktionswert beläuft sich derzeit auf insgesamt {value} aller erfassten forstwirtschaftlichen Erträge.",
  "estate.summary.stewardshipHeritage": "\nKulturerbe-Aufzeichnungen",
  "estate.summary.stewardshipHeritageDesc":
    "\n{count} Arbeitsgenehmigungselemente verbleiben derzeit in der Denkmalgenehmigungswarteschlange.",
  "estate.summary.stewardshipEnvironment": "\nUmweltaufzeichnungen",
  "estate.summary.stewardshipEnvironmentDesc":
    "\n{count} Artenschutzeinträge sind derzeit im Verwaltungsregister aktiv.",
  "estate.summary.operationsAlertTitle":
    "\nSchießstandbetrieb, Sicherheit, Zieljagd und GFE teilen sich jetzt ein dauerhaftes Nachlasskontrollregister",
  "estate.summary.operationsAlertDescription":
    "\nTrainingsbereichsbereitschaft, Sicherheitsmängel, Zielverfügbarkeit und GFE-Ersatzposition befinden sich jetzt auf derselben Site und demselben Asset-Diagramm wie Lieferung, Bereitschaft und P3M-Kontrollen.",
  "estate.summary.operationsTitle": "\nBetriebskontrollen des Ausbildungsgeländes",
  "estate.summary.operationsDescription":
    "\nVerwenden Sie dieses Register, um die TAROM-Aktivität, die Einhaltung der MOD-Sicherheit, den Lebenszyklus des Zielobjekts und den Status der von der Regierung bereitgestellten Ausrüstung zu verwalten, ohne den Arbeitsbereich des Anwesens zu verlassen.",
  "estate.summary.operationsRegister": "Betriebskontrollregister",
  "estate.summary.operationsRegisterDesc":
    "\n{count} Datensätze weisen derzeit einen eingeschränkten oder nicht konformen Betriebszustand auf.",
  "estate.summary.operationsRanges": "\nBereichsoperationen",
  "estate.summary.operationsRangesDesc":
    "\n{count} Bereichsverfügbarkeitseinträge sind derzeit als verfügbar markiert.",
  "estate.summary.operationsTargetry": "\nZieldatensätze",
  "estate.summary.operationsTargetryDesc":
    "\n{count} Zielspuren oder -systeme werden derzeit als verfügbar erfasst.",
  "estate.summary.operationsGfe": "\nGFE-Datensätze",
  "estate.summary.operationsGfeDesc":
    "\n{count} Ersatzartikel verbleiben derzeit in der aktiven GFE-Warteschlange.",
  "estate.summary.strategyAlertTitle":
    "\nStrategische Vermögenspläne befinden sich jetzt im selben Nachlassarbeitsbereich wie Finanzen, Lieferung und Genehmigungen",
  "estate.summary.strategyAlertDescription":
    "\nFühren Sie den Strategic Asset Management Plan als dauerhaftes Nachlassregister, das mit Lebenszyklusphasen, Priorisierungsstatus und optionalen Finanzplanungsszenarien verknüpft ist.",
  "estate.summary.strategyTitle": "\nStrategische Vermögensverwaltungshaltung",
  "estate.summary.strategyDescription":
    "\nNutzen Sie diese Ebene, um die ISO 55001-Planung an Unternehmenszielen, risikoorientierter Priorisierung, Anlagenleistungszielen und langfristigen Infrastrukturinvestitionsentscheidungen auszurichten.",
  "estate.summary.strategyRegister": "\nStrategische Pläne",
  "estate.summary.strategyRegisterDesc":
    "\n{count} Planelemente verbleiben derzeit in der aktiven Strategiegenehmigungswarteschlange.",
  "estate.summary.strategyLongHorizon": "\nLangfristige Pläne",
  "estate.summary.strategyLongHorizonDesc":
    "\nPläne mit Infrastruktur- oder Lebenszyklushorizonten auf oder über der langfristigen Planungsschwelle.",
  "estate.summary.strategyFinanceLinked": "\nFinanzbezogene Pläne",
  "estate.summary.strategyFinanceLinkedDesc":
    "\nStrategische Pläne sind bereits direkt mit gespeicherten Finanzplanungsszenarien verknüpft.",
  "estate.summary.strategyRiskLed": "\nRisikoorientierte Pläne",
  "estate.summary.strategyRiskLedDesc":
    "\nDer durchschnittliche strategische Planungshorizont beträgt derzeit im gesamten Register {average} Monate.",
  "estate.strategyForm.title": "\nPflegen Sie den strategischen Vermögensverwaltungsplan",
  "estate.strategyForm.description":
    "\nErfassen Sie ISO 55001-konforme Nachlassstrategieaufzeichnungen, die Unternehmensziele, Lebenszykluslage, risikobasierte Priorisierung und langfristige Investitionsplanung miteinander verbinden.",
  "estate.strategyForm.badge": "\nStrategischer SAM-Plan",
  "estate.strategyForm.nameLabel": "\nPlantitel",
  "estate.strategyForm.namePlaceholder": "\nStrategischer Erneuerungsplan für Northern Estate",
  "estate.strategyForm.nameHint":
    "\nVerwenden Sie einen Titel, der über Governance-Pakete, DIO-Berichte und Planungsüberprüfungen hinweg stabil bleibt.",
  "estate.strategyForm.scopeLabel": "\nNachlassumfang",
  "estate.strategyForm.scopePlaceholder":
    "\nNorth Training Estate, Regional Ranges oder Enterprise Estate Slice",
  "estate.strategyForm.scopeHint":
    "Halten Sie den Umfang auf den vom Plan geregelten Bestand oder das Fähigkeitsportfolio abgestimmt.",
  "estate.strategyForm.objectiveLabel": "\nOrganisationsziel",
  "estate.strategyForm.objectiveHint":
    "\nWählen Sie das primäre Organisationsziel, auf das dieser strategische Plan ausgerichtet ist.",
  "estate.strategyForm.lifecycleLabel": "\nLebenszyklusfokus",
  "estate.strategyForm.lifecycleHint":
    "\nNennen Sie die dominante Lebenszyklusphase, die der Plan derzeit verwaltet.",
  "estate.strategyForm.prioritisationLabel": "\nPriorisierungsbasis",
  "estate.strategyForm.prioritisationHint":
    "\nZeigen Sie, ob der Plan von Risiko, Leistung, Compliance, Nachfrage oder Werthaltung geleitet wird.",
  "estate.strategyForm.horizonLabel": "\nPlanungshorizont",
  "estate.strategyForm.horizonHint":
    "\nNutzen Sie das Planungsfenster in Monaten für langfristige Infrastruktur- und Lebenszyklusentscheidungen.",
  "estate.strategyForm.financeScenarioLabel": "\nFinanzplanungsszenario",
  "estate.strategyForm.financeScenarioHint":
    "\nVerknüpfen Sie den Plan optional direkt mit einem gespeicherten Finanzplanungsszenario zur Investitionsübergabe.",
  "estate.strategyForm.financeScenarioOptional": "\nKein verknüpftes Finanzszenario",
  "estate.strategyForm.performanceTargetLabel": "\nLeistungsziel",
  "estate.strategyForm.performanceTargetPlaceholder":
    "\nStellen Sie eine Reichweitenverfügbarkeit von 95 % auf eingeschränkten Spuren wieder her",
  "estate.strategyForm.performanceTargetHint":
    "\nNennen Sie den messbaren Service, die Bereitschaft oder das Zustandsergebnis, das dieser Plan vorantreibt.",
  "estate.strategyForm.investmentCaseLabel": "\nInvestitions- und Infrastrukturfall",
  "estate.strategyForm.investmentCasePlaceholder":
    "\nSequenzierung von Zivil-, Versorgungs- und Lebenszyklusaktualisierungen im nächsten Kontrollzeitraum.",
  "estate.strategyForm.investmentCaseHint":
    "\nFassen Sie den langfristigen Infrastrukturinvestitionsfall oder die Lebenszyklus-Interventionslogik zusammen.",
  "estate.strategyForm.approvalLabel": "\nGenehmigungsstatus",
  "estate.strategyForm.approvalHint":
    "\nVerfolgen Sie, ob sich der strategische Plan noch im Entwurf befindet, eingereicht, genehmigt oder abgelehnt wird.",
  "estate.strategyForm.notesLabel": "\nLieferscheine",
  "estate.strategyForm.notesPlaceholder":
    "\nErfassen Sie Abhängigkeiten, überprüfen Sie die Häufigkeit oder überwachen Sie die Anlagenleistung.",
  "estate.strategyForm.notesHint":
    "\nVerwenden Sie Notizen für den Governance-Kontext, die während der Planwartung sichtbar bleiben sollten.",
  "estate.strategyForm.requiredHint":
    "\nErforderliche Felder müssen ausgefüllt werden, bevor der Plan gespeichert werden kann.",
  "estate.strategyForm.submit": "\nStrategischen Plan speichern",
  "estate.strategyForm.submitAria": "\nStrategischen Vermögensverwaltungsplan speichern",
  "estate.strategyForm.recentTitle": "\nStrategisches Planregister",
  "estate.strategyForm.recentDescription":
    "\nAktuelle strategische Pläne werden zusammen mit ihrem Lebenszyklusstatus, ihrem Genehmigungsstatus und ihrer Finanzverknüpfung angezeigt.",
  "estate.strategyForm.empty": "\nEs wurden noch keine strategischen Vermögenspläne erfasst.",
  "estate.strategyForm.notesEmpty": "\nEs wurden keine zusätzlichen Lieferscheine erfasst.",
  "estate.strategyForm.feedback.saved":
    "\nStrategischer Vermögensverwaltungsplan im Nachlassarbeitsbereich gespeichert.",
  "estate.strategyForm.feedback.saveFailed":
    "\nDer strategische Vermögensverwaltungsplan kann derzeit nicht beibehalten werden.",
  "estate.strategyForm.summary.approvalQueue": "{count} im Genehmigungsablauf",
  "estate.strategyForm.summary.financeLinked": "\n{count} finanzgebunden",
  "estate.strategyForm.summary.horizonPosture":
    "\n{long} Pläne mit langem Horizont, {risk} risikoorientierte Pläne, {average} durchschnittlicher Monatshorizont.",
  "estate.strategyForm.tableAria": "\nStrategische Vermögensverwaltungspläne",
  "estate.strategyForm.table.plan": "\nPlan",
  "estate.strategyForm.table.scope": "\nUmfang und Ziel",
  "estate.strategyForm.table.lifecycle": "\nLebenszyklus und Priorität",
  "estate.strategyForm.table.performance": "\nLeistung und Horizont",
  "estate.strategyForm.table.approval": "\nGenehmigungs- und Finanzierungslink",
  "estate.strategyForm.table.investment": "\nInvestitionsfall",
  "estate.strategyForm.table.updatedAt": "\nAktualisiert {date}",
  "estate.strategyForm.table.horizonValue": "\n{months} Monate",
  "estate.strategyForm.table.financeScenarioUnlinked": "\nKein verknüpftes Finanzszenario",
  "estate.strategyForm.validation.titleRequired":
    "\nDer Titel des Strategieplans ist erforderlich.",
  "estate.strategyForm.validation.scopeRequired":
    "\nDer Umfang des strategischen Plans ist erforderlich.",
  "estate.strategyForm.validation.objectiveRequired":
    "\nFür den Plan ist ein strategisches Ziel erforderlich.",
  "estate.strategyForm.validation.lifecycleRequired":
    "\nFür den Plan ist ein Lebenszyklusfokus erforderlich.",
  "estate.strategyForm.validation.prioritisationRequired":
    "\nFür den Plan ist eine Priorisierungsbasis erforderlich.",
  "estate.strategyForm.validation.horizonRange":
    "\nDer Planungshorizont muss zwischen {min} und {max} Monaten liegen.",
  "estate.strategyForm.validation.performanceTargetRequired":
    "\nFür den Plan ist ein Leistungsziel erforderlich.",
  "estate.strategyForm.validation.investmentCaseRequired":
    "\nFür den Plan ist ein Investitions- und Infrastrukturfall erforderlich.",
  "estate.strategyForm.validation.financeScenarioInvalid":
    "\nDas ausgewählte Finanzplanungsszenario konnte nicht gefunden werden.",
  "estate.strategyForm.validation.approvalRequired":
    "\nFür den Plan ist eine gültige Genehmigung erforderlich.",
  "estate.strategyForm.objective.CAPABILITY_READINESS": "\nFähigkeitsbereitschaft",
  "estate.strategyForm.objective.COMPLIANCE_ASSURANCE": "\nCompliance-Sicherung",
  "estate.strategyForm.objective.SERVICE_PERFORMANCE": "\nServiceleistung",
  "estate.strategyForm.objective.LIFECYCLE_SUSTAINMENT": "\nLebenszykluserhaltung",
  "estate.strategyForm.objective.INFRASTRUCTURE_INVESTMENT": "\nInfrastrukturinvestition",
  "estate.strategyForm.lifecycle.ACQUIRE": "\nErwerben",
  "estate.strategyForm.lifecycle.OPERATE": "\nBetreiben",
  "estate.strategyForm.lifecycle.MAINTAIN": "\nBehalten",
  "estate.strategyForm.lifecycle.REFRESH": "\nAktualisieren",
  "estate.strategyForm.lifecycle.DISPOSE": "\nEntsorgen",
  "estate.strategyForm.prioritisation.RISK": "\nRisikoorientiert",
  "estate.strategyForm.prioritisation.PERFORMANCE": "\nLeistungsorientiert",
  "estate.strategyForm.prioritisation.COMPLIANCE": "\nCompliance-geleitet",
  "estate.strategyForm.prioritisation.DEMAND": "\nNachfragegesteuert",
  "estate.strategyForm.prioritisation.VALUE": "\nWertorientiert",
  "estate.initiativeForm.title": "\nErstellen Sie eine Nachlassinitiative",
  "estate.initiativeForm.description":
    "\nErfassen Sie einen strategischen Bestandsdatensatz, der in Genehmigungen, Programmüberprüfungen, FM-Folgemaßnahmen und Berichtspakete übergehen kann.",
  "estate.initiativeForm.badge": "\nDauerhafter Immobilienfluss",
  "estate.initiativeForm.nameLabel": "\nTitel der Initiative",
  "estate.initiativeForm.namePlaceholder": "\nTraining Nachlass hart FM Erholung",
  "estate.initiativeForm.nameHint":
    "\nVerwenden Sie einen Titel, der über Genehmigungen, Berichte und Bedienerübergaben hinweg stabil bleiben kann.",
  "estate.initiativeForm.scopeLabel": "\nNachlassumfang",
  "estate.initiativeForm.scopePlaceholder":
    "\nSüdgebiete, historische Gebäude oder regionale Flottenunterstützung",
  "estate.initiativeForm.scopeHint":
    "\nBenennen Sie den betroffenen Grundstücksbereich, die Geografie, das Vertragsgebiet oder den betroffenen Betriebsstandort.",
  "estate.initiativeForm.domainLabel": "\nDomäne",
  "estate.initiativeForm.domainHint":
    "\nWählen Sie den Nachlass-Workstream aus, den die Initiative in erster Linie vorantreibt.",
  "estate.initiativeForm.domain.STRATEGIC_ASSET": "\nStrategisches Asset Management",
  "estate.initiativeForm.domain.HARD_FM": "\nHart FM",
  "estate.initiativeForm.domain.SOFT_FM": "\nSoft FM",
  "estate.initiativeForm.domain.RANGE_OPERATIONS": "\nBereichsoperationen",
  "estate.initiativeForm.domain.RANGE_SAFETY": "\nReichweitensicherheit",
  "estate.initiativeForm.domain.TARGETRY": "\nTargetry",
  "estate.initiativeForm.domain.GFE": "Von der Regierung bereitgestellte Ausrüstung",
  "estate.initiativeForm.domain.FLEET": "\nFlotte und Ausrüstung",
  "estate.initiativeForm.domain.RURAL": "\nLändliches Anwesen",
  "estate.initiativeForm.domain.FORESTRY": "\nForstwirtschaft",
  "estate.initiativeForm.domain.HERITAGE": "\nErbe",
  "estate.initiativeForm.domain.ENVIRONMENT": "\nUmweltverantwortung",
  "estate.initiativeForm.domain.COMMERCIAL": "\nEinkünfte Dritter",
  "estate.initiativeForm.domain.CATERING": "\nCatering-Integration",
  "estate.initiativeForm.domain.P3M": "\nP3M-Lieferung",
  "estate.initiativeForm.priorityLabel": "\nPriorität",
  "estate.initiativeForm.priorityHint":
    "\nPlatzieren Sie die Initiative im aktuellen Betriebshorizont des Anwesens.",
  "estate.initiativeForm.priority.NOW": "\nJetzt",
  "estate.initiativeForm.priority.NEXT": "\nWeiter",
  "estate.initiativeForm.priority.LATER": "\nSpäter",
  "estate.initiativeForm.priority.WATCH": "\nAnsehen",
  "estate.initiativeForm.approvalLabel": "\nGenehmigungsstatus",
  "estate.initiativeForm.approvalHint":
    "\nVerfolgen Sie, wo sich die Initiative derzeit im Programmgenehmigungspfad befindet.",
  "estate.initiativeForm.approval.DRAFT": "\nEntwurf",
  "estate.initiativeForm.approval.SUBMITTED": "\nEingereicht",
  "estate.initiativeForm.approval.APPROVED": "Genehmigt",
  "estate.initiativeForm.approval.REJECTED": "\nAbgelehnt",
  "estate.initiativeForm.notesLabel": "\nHinweise und Annahmen",
  "estate.initiativeForm.notesPlaceholder":
    "\nErfassen Sie Risiken, Fähigkeitsverknüpfungen, vertragliche Auswirkungen oder Lebenszyklusannahmen.",
  "estate.initiativeForm.notesHint":
    "\nVerwenden Sie dies, um den Kontext beizubehalten, der in Genehmigungen, Finanzplanung und Berichten erhalten bleiben soll.",
  "estate.initiativeForm.requiredHint":
    "\nTitel, Nachlassumfang, Domäne, Priorität und Genehmigungsstatus sind erforderlich.",
  "estate.initiativeForm.submit": "\nInitiative „Nachlass retten“",
  "estate.initiativeForm.submitAria": "\nInitiative „Nachlass retten“",
  "estate.initiativeForm.recentTitle": "\nAktuelle Immobilieninitiativen",
  "estate.initiativeForm.recentDescription":
    "\nDiese Initiativen bleiben nun als dauerhafte Nachlassdaten bestehen, ohne den SSR-Arbeitsbereich zu verlassen.",
  "estate.initiativeForm.empty": "\nNoch keine Nachlassinitiativen erfasst.",
  "estate.initiativeForm.savedAt": "\nAktualisiert {updatedAt}",
  "estate.initiativeForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "estate.initiativeForm.validation.titleRequired": "\nDer Titel der Initiative ist erforderlich.",
  "estate.initiativeForm.validation.scopeRequired": "\nNachlassumfang ist erforderlich.",
  "estate.initiativeForm.validation.domainRequired": "\nDomain ist erforderlich.",
  "estate.initiativeForm.validation.priorityRequired": "\nPriorität ist erforderlich.",
  "estate.initiativeForm.validation.approvalRequired": "\nDer Genehmigungsstatus ist erforderlich.",
  "estate.initiativeForm.feedback.saved":
    "\nNachlassinitiative im Nachlassarbeitsbereich gespeichert.",
  "estate.initiativeForm.feedback.saveFailed":
    "\nDie Nachlassinitiative kann derzeit nicht fortgesetzt werden.",
  "estate.projectForm.title": "\nRegistrieren Sie ein Immobilienprojekt",
  "estate.projectForm.description":
    "\nErfassen Sie einen dauerhaften Nachlassprojektdatensatz mit Genehmigungs-, Finanz-, Ressourcen- und Risikostatus im SSR-Nachlassarbeitsbereich.",
  "estate.projectForm.badge": "\nP3M-Register",
  "estate.projectForm.nameLabel": "\nProjekttitel",
  "estate.projectForm.namePlaceholder": "\nWiederherstellung der regionalen Bereichsinfrastruktur",
  "estate.projectForm.nameHint":
    "\nVerwenden Sie einen Titel, der über Register, Genehmigungen, Finanzprüfungen und Lieferberichte hinweg stabil bleibt.",
  "estate.projectForm.programmeLabel": "\nProgrammname",
  "estate.projectForm.programmePlaceholder": "\nSteigerung des Schulungsbestandslebenszyklus",
  "estate.projectForm.programmeHint":
    "\nGruppieren Sie das Projekt in der Programm- oder Portfoliozeile, die für die Nachlassberichterstattung verwendet wird.",
  "estate.projectForm.scopeLabel": "\nNachlassumfang",
  "estate.projectForm.scopePlaceholder":
    "\nSouth-Ranges-Paket, Heritage-Cluster oder regionaler Hard-FM-Rückstand",
  "estate.projectForm.scopeHint":
    "\nBenennen Sie die betroffene Geografie, das Vertragsgebiet, den Grundstücksbereich oder den betroffenen Betriebsstandort.",
  "estate.projectForm.deliveryTypeLabel": "\nLieferart",
  "estate.projectForm.deliveryTypeHint":
    "\nUnterscheiden Sie zwischen großvolumigen Projektabläufen und komplexer Infrastrukturbereitstellung.",
  "estate.projectForm.deliveryType.HIGH_VOLUME_LOW_VALUE": "\nGroßes Volumen, geringer Wert",
  "estate.projectForm.deliveryType.COMPLEX_INFRASTRUCTURE": "\nKomplexe Infrastruktur",
  "estate.projectForm.approvalLabel": "\nGenehmigungsstatus",
  "estate.projectForm.approvalHint":
    "\nVerfolgen Sie, ob das Projekt noch im Entwurfsstadium ist, sich aktiv in der Genehmigung befindet, genehmigt oder abgelehnt wurde.",
  "estate.projectForm.approvalStageLabel": "\nGenehmigungsphase",
  "estate.projectForm.approvalStageHint":
    "\nVerfolgen Sie, wo sich das Projekt derzeit im DIO und im internen Governance-Ablauf befindet.",
  "estate.projectForm.approvalStage.REGISTERED": "\nRegistriert",
  "estate.projectForm.approvalStage.BUSINESS_CASE": "\nGeschäftsfall",
  "estate.projectForm.approvalStage.DIO_REVIEW": "\nDIO-Rezension",
  "estate.projectForm.approvalStage.COMMERCIAL_REVIEW": "\nKommerzielle Rezension",
  "estate.projectForm.approvalStage.DELIVERY_AUTHORIZATION": "\nLiefergenehmigung",
  "estate.projectForm.approvalStage.IN_DELIVERY": "\nIn Lieferung",
  "estate.projectForm.approvalStage.CLOSED": "\nGeschlossen",
  "estate.projectForm.approvalAuthorityLabel": "\nGenehmigungsbehörde",
  "estate.projectForm.approvalAuthorityPlaceholder":
    "DIO-Regionalleiter, Handelsvorstand oder Nachlassliefergremium",
  "estate.projectForm.approvalAuthorityHint":
    "\nNennen Sie die Behörde oder den Vorstand, der derzeit für die nächste Genehmigungsentscheidung zuständig ist.",
  "estate.projectForm.budgetAmountLabel": "\nBudgetbetrag",
  "estate.projectForm.budgetAmountHint":
    "\nErfassen Sie die aktuell genehmigte oder vorgeschlagene Budgetbasis für das Projekt.",
  "estate.projectForm.committedCostLabel": "\nZugesagte Kosten",
  "estate.projectForm.committedCostHint":
    "\nErfassen Sie die aktuellen zugesagten Kosten, die bereits mit dem Projekt verbunden sind.",
  "estate.projectForm.forecastFinalCostLabel": "\nPrognostizierte Endkosten",
  "estate.projectForm.forecastFinalCostHint":
    "\nVerfolgen Sie die neuesten prognostizierten Endkosten für die Lieferüberwachung.",
  "estate.projectForm.retentionAmountLabel": "\nEinbehaltsbetrag",
  "estate.projectForm.retentionAmountHint":
    "\nErfassen Sie den einbehaltenen Handelswert, der bis zur Fertigstellung oder Abnahme noch verbleibt.",
  "estate.projectForm.riskProvisionAmountLabel": "\nRisikovorsorge",
  "estate.projectForm.riskProvisionAmountHint":
    "\nVerfolgen Sie die aktuelle finanzielle Rückstellung, die für Projektrisiken reserviert ist.",
  "estate.projectForm.plannedResourcesLabel": "\nGeplante Ressourcen",
  "estate.projectForm.plannedResourcesHint":
    "\nErfassen Sie die geplante Personal- oder Lieferressourcenzuteilung.",
  "estate.projectForm.actualResourcesLabel": "\nTatsächliche Ressourcen",
  "estate.projectForm.actualResourcesHint":
    "\nErfassen Sie die tatsächliche Auslastung der Arbeitskräfte oder Lieferressourcen, die derzeit zugewiesen sind.",
  "estate.projectForm.riskLevelLabel": "\nRisikostufe",
  "estate.projectForm.riskLevelHint":
    "\nHeben Sie die aktuelle qualitative Lieferrisikolage für das Projekt hervor.",
  "estate.projectForm.riskLevel.LOW": "\nNiedrig",
  "estate.projectForm.riskLevel.MODERATE": "\nModerat",
  "estate.projectForm.riskLevel.HIGH": "\nHoch",
  "estate.projectForm.riskLevel.CRITICAL": "\nKritisch",
  "estate.projectForm.notesLabel": "\nHinweise und Annahmen",
  "estate.projectForm.notesPlaceholder":
    "\nErfassen Sie Änderungs-, Abhängigkeits-, Risiko-, Geschäfts- oder DIO-Genehmigungsannahmen, die in die Berichterstattung einfließen sollen.",
  "estate.projectForm.notesHint":
    "\nVerwenden Sie dies, um den Governance- und Bereitstellungskontext neben dem Projektregistereintrag beizubehalten.",
  "estate.projectForm.requiredHint":
    "\nProjekttitel, Programm, Umfang, Genehmigungsfelder, Finanzfelder, Ressourcenfelder und Risikostufe sind erforderlich.",
  "estate.projectForm.submit": "\nNachlassprojekt speichern",
  "estate.projectForm.submitAria": "\nNachlassprojekt speichern",
  "estate.projectForm.recentTitle": "\nAktuelle Immobilienprojekte",
  "estate.projectForm.recentDescription":
    "\nAktuelle Projektregistereinträge zeigen Genehmigungsdruck, Finanzlage und Ressourcenkonflikte innerhalb des Nachlassarbeitsbereichs.",
  "estate.projectForm.empty": "\nNoch keine Immobilienprojekte erfasst.",
  "estate.projectForm.summary.approvalQueue": "\n{count} wartet auf Genehmigung",
  "estate.projectForm.summary.delayed": "\n{count} verzögert",
  "estate.projectForm.summary.resourcePressure":
    "\n{count}-Projekte weisen derzeit Ressourcenkonflikte auf und {risk} gelten als hochriskant.",
  "estate.projectForm.tableAria": "\nImmobilienprojekte",
  "estate.projectForm.table.project": "\nProjekt",
  "estate.projectForm.table.scope": "\nGeltungsbereich",
  "estate.projectForm.table.approval": "\nGenehmigung",
  "estate.projectForm.table.authority": "\nAutorität",
  "estate.projectForm.table.budget": "\nBudget",
  "estate.projectForm.table.provisions": "\nRückstellungen",
  "estate.projectForm.table.resources": "\nRessourcen",
  "estate.projectForm.table.risk": "\nRisiko",
  "estate.projectForm.table.daysInStage": "\n{days} Tage in der Phase",
  "estate.projectForm.table.forecastValue": "\nPrognose {value}",
  "estate.projectForm.table.resourcesValue": "\nGeplant {planned} / Ist {actual}",
  "estate.projectForm.table.resourceConflict": "\nRessourcenkonflikt",
  "estate.projectForm.table.delayFlag": "\nGenehmigungsverzögerung",
  "estate.projectForm.validation.titleRequired": "\nProjekttitel ist erforderlich.",
  "estate.projectForm.validation.programmeRequired": "\nProgrammname ist erforderlich.",
  "estate.projectForm.validation.scopeRequired": "\nNachlassumfang ist erforderlich.",
  "estate.projectForm.validation.deliveryTypeRequired": "\nLieferart ist erforderlich.",
  "estate.projectForm.validation.approvalRequired": "\nDer Genehmigungsstatus ist erforderlich.",
  "estate.projectForm.validation.approvalStageRequired": "\nGenehmigungsphase ist erforderlich.",
  "estate.projectForm.validation.approvalAuthorityRequired": "Genehmigungsbehörde erforderlich.",
  "estate.projectForm.validation.budgetAmount": "\nDer Budgetbetrag muss null oder größer sein.",
  "estate.projectForm.validation.committedCost":
    "\nDie zugesagten Kosten müssen null oder größer sein.",
  "estate.projectForm.validation.forecastFinalCost":
    "\nDie prognostizierten Endkosten müssen null oder größer sein.",
  "estate.projectForm.validation.retentionAmount":
    "\nDer Einbehaltsbetrag muss null oder größer sein.",
  "estate.projectForm.validation.riskProvisionAmount":
    "\nDie Risikovorsorge muss Null oder größer sein.",
  "estate.projectForm.validation.plannedResources":
    "\nGeplante Ressourcen müssen eine ganze Zahl größer oder gleich Null sein.",
  "estate.projectForm.validation.actualResources":
    "\nDie tatsächlichen Ressourcen müssen eine ganze Zahl größer oder gleich Null sein.",
  "estate.projectForm.validation.riskLevelRequired": "\nRisikostufe ist erforderlich.",
  "estate.projectForm.feedback.saved": "\nNachlassprojekt im Nachlassarbeitsbereich gespeichert.",
  "estate.projectForm.feedback.saveFailed":
    "\nDas Nachlassprojekt kann derzeit nicht beibehalten werden.",
  "estate.projectControls.emptyTitle":
    "\nErstellen Sie ein Projekt, bevor Sie Steuerelemente erfassen",
  "estate.projectControls.emptyDescription":
    "\nRisikoregister und Änderungskontrollaufzeichnungen werden direkt an einen Eintrag im Nachlassprojektregister angehängt.",
  "estate.projectControls.emptyProjects": "\nKeine Immobilienprojekte verfügbar",
  "estate.projectRiskForm.title": "\nProjektrisikoregister",
  "estate.projectRiskForm.description":
    "\nErfassen Sie dauerhafte P3M-Risikoaufzeichnungen für Immobilienprojekte, damit Gefährdung und Schadensbegrenzung über die Genehmigungen und Berichte hinausgehen.",
  "estate.projectRiskForm.projectLabel": "\nNachlassprojekt",
  "estate.projectRiskForm.projectHint":
    "\nWählen Sie den Projektregistereintrag aus, der Eigentümer dieses Risikodatensatzes ist.",
  "estate.projectRiskForm.nameLabel": "\nRisikotitel",
  "estate.projectRiskForm.namePlaceholder": "\nVerzögerte DIO-Überprüfung des Range Civils-Pakets",
  "estate.projectRiskForm.nameHint":
    "\nVerwenden Sie einen kurzen Titel, der in allen Projektboards und Berichten stabil bleibt.",
  "estate.projectRiskForm.impactAreaLabel": "\nAufprallbereich",
  "estate.projectRiskForm.impactAreaHint":
    "\nIdentifizieren Sie den primären Lieferbereich, der von der Risikoexposition betroffen ist.",
  "estate.projectRiskForm.impactArea.COST": "\nKosten",
  "estate.projectRiskForm.impactArea.SCHEDULE": "\nZeitplan",
  "estate.projectRiskForm.impactArea.CAPABILITY": "\nFähigkeit",
  "estate.projectRiskForm.impactArea.SAFETY": "\nSicherheit",
  "estate.projectRiskForm.impactArea.COMPLIANCE": "\nCompliance",
  "estate.projectRiskForm.severityLabel": "\nSchweregrad",
  "estate.projectRiskForm.severityHint":
    "\nVerwenden Sie die gleiche qualitative Schweregradskala wie im Projektregister.",
  "estate.projectRiskForm.statusLabel": "\nRisikostatus",
  "estate.projectRiskForm.statusHint":
    "\nVerfolgen Sie, ob das Risiko offen ist, gemindert wird, formell akzeptiert oder geschlossen ist.",
  "estate.projectRiskForm.status.OPEN": "\nÖffnen",
  "estate.projectRiskForm.status.MITIGATING": "\nMildernde",
  "estate.projectRiskForm.status.ACCEPTED": "\nAkzeptiert",
  "estate.projectRiskForm.status.CLOSED": "\nGeschlossen",
  "estate.projectRiskForm.ownerLabel": "\nBesitzer",
  "estate.projectRiskForm.ownerPlaceholder": "\nProgramm steuert Lead",
  "estate.projectRiskForm.ownerHint":
    "\nBenennen Sie den verantwortlichen Eigentümer, der für die Eindämmung oder Akzeptanz verantwortlich ist.",
  "estate.projectRiskForm.mitigationLabel": "\nSchadensbegrenzungsplan",
  "estate.projectRiskForm.mitigationPlaceholder":
    "\nErfassen Sie den Reaktionsplan, den Eskalationspfad oder die Akzeptanzgründe.",
  "estate.projectRiskForm.mitigationHint":
    "\nBehalten Sie die nächste mildernde Maßnahme bei, damit sie in Governance-Paketen erhalten bleibt.",
  "estate.projectRiskForm.targetDateLabel": "\nZieldatum",
  "estate.projectRiskForm.targetDateHint":
    "\nOptionales Zieldatum für den nächsten Kontrollpunkt zur Schadensbegrenzung oder Schließungsentscheidung.",
  "estate.projectRiskForm.requiredHint":
    "Projekt, Risikotitel, Auswirkungsbereich, Schweregrad, Status, Risikominderungsplan und Eigentümer sind erforderlich.",
  "estate.projectRiskForm.submit": "\nProjektrisiko einsparen",
  "estate.projectRiskForm.submitAria": "\nProjektrisiko einsparen",
  "estate.projectRiskForm.summary.critical": "\n{count} kritisch",
  "estate.projectRiskForm.tableAria": "\nProjektrisikoregister",
  "estate.projectRiskForm.table.risk": "\nRisiko",
  "estate.projectRiskForm.table.exposure": "\nBelichtung",
  "estate.projectRiskForm.table.status": "\nStatus",
  "estate.projectRiskForm.table.owner": "\nBesitzer",
  "estate.projectRiskForm.table.mitigation": "\nSchadensbegrenzung",
  "estate.projectRiskForm.table.targetDateValue": "\nZiel {date}",
  "estate.projectRiskForm.table.targetDateEmpty": "\nKein Zieldatum festgelegt",
  "estate.projectRiskForm.empty": "\nNoch keine Projektrisiken erfasst.",
  "estate.projectRiskForm.validation.projectRequired":
    "\nWählen Sie ein gültiges Immobilienprojekt aus.",
  "estate.projectRiskForm.validation.titleRequired": "\nRisikotitel ist erforderlich.",
  "estate.projectRiskForm.validation.impactAreaRequired": "\nAufprallbereich ist erforderlich.",
  "estate.projectRiskForm.validation.severityRequired": "\nSchweregrad ist erforderlich.",
  "estate.projectRiskForm.validation.statusRequired": "\nRisikostatus ist erforderlich.",
  "estate.projectRiskForm.validation.mitigationRequired":
    "\nEin Schadensbegrenzungsplan ist erforderlich.",
  "estate.projectRiskForm.validation.ownerRequired": "\nRisikoinhaber ist erforderlich.",
  "estate.projectRiskForm.validation.targetDate":
    "\nZieldatum muss ein gültiges Kalenderdatum sein.",
  "estate.projectRiskForm.feedback.saved": "\nProjektrisiko im Estate-Arbeitsbereich gespeichert.",
  "estate.projectRiskForm.feedback.saveFailed":
    "\nDas Projektrisiko kann derzeit nicht aufrechterhalten werden.",
  "estate.projectChangeForm.title": "\nProjektänderungskontrolle",
  "estate.projectChangeForm.description":
    "\nErfassen Sie Änderungsanfragen, Auswirkungen auf Kosten und Zeitplan sowie den Genehmigungsstatus innerhalb des Programmablaufs für dauerhafte Immobilien.",
  "estate.projectChangeForm.projectLabel": "\nNachlassprojekt",
  "estate.projectChangeForm.projectHint":
    "\nWählen Sie den Projektregistereintrag aus, der dieses Änderungselement besitzt.",
  "estate.projectChangeForm.nameLabel": "\nTitel ändern",
  "estate.projectChangeForm.namePlaceholder":
    "\nErweitern Sie den Umfang des Zivilpakets um Zielspuren",
  "estate.projectChangeForm.nameHint":
    "\nVerwenden Sie einen Kurztitel, der über Genehmigungs- und Lieferaktualisierungen hinweg bestehen bleiben kann.",
  "estate.projectChangeForm.typeLabel": "\nTyp ändern",
  "estate.projectChangeForm.typeHint":
    "\nIdentifizieren Sie die Hauptkontrollkategorie, die von diesem Änderungselement betroffen ist.",
  "estate.projectChangeForm.type.SCOPE": "\nGeltungsbereich",
  "estate.projectChangeForm.type.SCHEDULE": "\nZeitplan",
  "estate.projectChangeForm.type.COST": "\nKosten",
  "estate.projectChangeForm.type.RESOURCE": "\nRessource",
  "estate.projectChangeForm.type.COMPLIANCE": "\nCompliance",
  "estate.projectChangeForm.statusLabel": "\nStatus ändern",
  "estate.projectChangeForm.statusHint":
    "\nVerfolgen Sie, ob die Änderung vorgeschlagen, geprüft, genehmigt, abgelehnt oder implementiert wird.",
  "estate.projectChangeForm.status.PROPOSED": "\nVorgeschlagen",
  "estate.projectChangeForm.status.IN_REVIEW": "\nIm Test",
  "estate.projectChangeForm.status.APPROVED": "Genehmigt",
  "estate.projectChangeForm.status.REJECTED": "\nAbgelehnt",
  "estate.projectChangeForm.status.IMPLEMENTED": "\nImplementiert",
  "estate.projectChangeForm.scheduleImpactLabel": "\nAuswirkungen auf den Zeitplan (Tage)",
  "estate.projectChangeForm.scheduleImpactHint":
    "\nZeichnen Sie den aktuellen Zeitplaneffekt auf, der erwartet wird, wenn die Änderung fortgeführt wird.",
  "estate.projectChangeForm.costImpactLabel": "\nKostenauswirkung",
  "estate.projectChangeForm.costImpactHint":
    "\nErfassen Sie die aktuellen geschätzten Kostenauswirkungen der Änderungsanforderung.",
  "estate.projectChangeForm.requestedByLabel": "\nAngefordert von",
  "estate.projectChangeForm.requestedByPlaceholder": "\nRegionaler Lieferleiter",
  "estate.projectChangeForm.requestedByHint":
    "\nNennen Sie den Sponsor, den Vorstand oder den operativen Leiter, der die Änderung beantragt.",
  "estate.projectChangeForm.notesLabel": "\nNotizen ändern",
  "estate.projectChangeForm.notesPlaceholder":
    "\nErfassen Sie die angeforderten Änderungen, Abhängigkeiten und erforderlichen Genehmigungen.",
  "estate.projectChangeForm.notesHint":
    "\nBehalten Sie ausreichend Kontext für Prüfungsausschüsse und Lieferberichte bei.",
  "estate.projectChangeForm.requiredHint":
    "\nProjekt, Änderungstitel, Typ, Status, Zeitplanauswirkungen, Kostenauswirkungen, Antragsteller und Notizen sind erforderlich.",
  "estate.projectChangeForm.submit": "\nProjektänderung speichern",
  "estate.projectChangeForm.submitAria": "\nProjektänderung speichern",
  "estate.projectChangeForm.summary.pending": "\n{count} ausstehend",
  "estate.projectChangeForm.summary.approved": "\n{count} genehmigt oder implementiert",
  "estate.projectChangeForm.tableAria": "\nProjektänderungskontrolle",
  "estate.projectChangeForm.table.change": "\nÄndern",
  "estate.projectChangeForm.table.type": "\nTyp",
  "estate.projectChangeForm.table.status": "\nStatus",
  "estate.projectChangeForm.table.impact": "\nAuswirkung",
  "estate.projectChangeForm.table.requestedBy": "\nAngefordert von",
  "estate.projectChangeForm.table.scheduleValue": "\n{days} Auswirkungen auf den Tagesplan",
  "estate.projectChangeForm.empty": "\nNoch keine Projektänderungen erfasst.",
  "estate.projectChangeForm.validation.projectRequired":
    "\nWählen Sie ein gültiges Immobilienprojekt aus.",
  "estate.projectChangeForm.validation.titleRequired": "Titel ändern ist erforderlich.",
  "estate.projectChangeForm.validation.changeTypeRequired": "\nÄnderungstyp ist erforderlich.",
  "estate.projectChangeForm.validation.statusRequired": "\nÄnderungsstatus ist erforderlich.",
  "estate.projectChangeForm.validation.scheduleImpactDays":
    "\nDie Auswirkung auf den Zeitplan muss eine ganze Zahl größer oder gleich Null sein.",
  "estate.projectChangeForm.validation.costImpactAmount":
    "\nDie Kostenauswirkungen müssen null oder größer sein.",
  "estate.projectChangeForm.validation.requestedByRequired": "\nAnforderer ist erforderlich.",
  "estate.projectChangeForm.validation.notesRequired": "\nÄnderungshinweise sind erforderlich.",
  "estate.projectChangeForm.feedback.saved":
    "\nProjektänderung im Estate-Arbeitsbereich gespeichert.",
  "estate.projectChangeForm.feedback.saveFailed":
    "\nDie Projektänderung kann derzeit nicht beibehalten werden.",
  "estate.agreementForm.title": "\nRegistrieren Sie einen Nachlassvertrag",
  "estate.agreementForm.description":
    "\nErfassen Sie ländliche Landnutzung, kommerzielle Aktivitäten Dritter und die ESS-Gastronomieaufsicht in einem dauerhaften Nachlassregister.",
  "estate.agreementForm.alertTitle":
    "\nEin Register deckt jetzt die Koordinierung im ländlichen Raum, im Handel und in der Gastronomie ab",
  "estate.agreementForm.alertDescription":
    "\nLändliche Aufzeichnungen erfordern ein Landzustandssignal, kommerzielle Aufzeichnungen erfordern Einnahmen und Nutzung und Gastronomieaufzeichnungen erfordern eine Servicebewertung.",
  "estate.agreementForm.domainLabel": "\nDomäne",
  "estate.agreementForm.domainHint":
    "\nWählen Sie aus, ob dieser Datensatz zur Verwaltung ländlicher Grundstücke, zur gewerblichen Nutzung oder zur Aufsicht über die Gastronomie gehört.",
  "estate.agreementForm.domain.RURAL": "\nLandgut",
  "estate.agreementForm.domain.COMMERCIAL": "\nEinkünfte Dritter",
  "estate.agreementForm.domain.CATERING": "\nCatering-Integration",
  "estate.agreementForm.typeLabel": "\nVereinbarungstyp",
  "estate.agreementForm.typeHint":
    "\nWählen Sie die Lizenz, den Mandanten, den Zugriff oder den Diensttyp aus, der am besten zur ausgewählten Domäne passt.",
  "estate.agreementForm.type.GRAZING_LICENSE": "\nWeidelizenz",
  "estate.agreementForm.type.AGRICULTURAL_TENANCY": "\nLandwirtschaftliche Pacht",
  "estate.agreementForm.type.LAND_ACCESS": "\nLandzugangsvereinbarung",
  "estate.agreementForm.type.COMMERCIAL_LICENSE": "\nKommerzielle Nutzungslizenz",
  "estate.agreementForm.type.EVENT_LICENSE": "\nVeranstaltungs- und Besucherlizenz",
  "estate.agreementForm.type.CATERING_SERVICE": "\nCatering-Service",
  "estate.agreementForm.nameLabel": "\nVereinbarungstitel",
  "estate.agreementForm.namePlaceholder": "\nWeidelizenz für die South Ranges",
  "estate.agreementForm.nameHint":
    "\nVerwenden Sie einen Titel, der in Aufsichtsbesprechungen, Partnerbewertungen und Berichten Bestand haben kann.",
  "estate.agreementForm.siteLabel": "\nSite",
  "estate.agreementForm.siteHint":
    "\nHängen Sie den Datensatz an die Grundstücksseite an, die für die Betriebskoordination zuständig ist.",
  "estate.agreementForm.assetLabel": "\nVerknüpfte Anlage oder Ausrüstung",
  "estate.agreementForm.assetHint":
    "\nVerknüpfen Sie den Datensatz optional mit einem bestimmten Vermögenswert oder Catering-Gerät auf derselben Site.",
  "estate.agreementForm.assetOptional": "\nKein verknüpfter Vermögenswert",
  "estate.agreementForm.counterpartyLabel": "\nGegenpartei",
  "estate.agreementForm.counterpartyPlaceholder":
    "\nESS, Hill Farm Partnership oder Regional Events Ltd",
  "estate.agreementForm.counterpartyHint":
    "\nNennen Sie den Mieter, Partner, Lieferanten oder kommerziellen Kontrahenten, der Eigentümer der Vereinbarung ist.",
  "estate.agreementForm.statusLabel": "\nVereinbarungsstatus",
  "estate.agreementForm.statusHint":
    "\nVerfolgen Sie, ob der Datensatz als Entwurf, aktiv, überwacht oder abgelaufen ist.",
  "estate.agreementForm.status.DRAFT": "\nEntwurf",
  "estate.agreementForm.status.ACTIVE": "\nAktiv",
  "estate.agreementForm.status.WATCH": "\nAnsehen",
  "estate.agreementForm.status.EXPIRED": "\nAbgelaufen",
  "estate.agreementForm.coordinationLabel": "\nTrainingskoordination",
  "estate.agreementForm.coordinationHint":
    "Zeigen Sie, ob die Vereinbarung derzeit mit der Schulungsaktivität übereinstimmt, überwacht werden muss oder in Konflikt steht.",
  "estate.agreementForm.coordination.ALIGNED": "\nAusgerichtet",
  "estate.agreementForm.coordination.WATCH": "\nAnsehen",
  "estate.agreementForm.coordination.CONFLICT": "\nKonflikt",
  "estate.agreementForm.landConditionLabel": "\nGrundstückszustand",
  "estate.agreementForm.landConditionHint":
    "\nErforderlich für ländliche Aufzeichnungen zur Überwachung des Weidedrucks, der Zugangsbedingungen oder der Haltung der Mieter.",
  "estate.agreementForm.landCondition.GOOD": "\nGut",
  "estate.agreementForm.landCondition.WATCH": "\nAnsehen",
  "estate.agreementForm.landCondition.RECOVERY": "\nWiederherstellung erforderlich",
  "estate.agreementForm.revenueLabel": "\nJahreswert",
  "estate.agreementForm.revenueHint":
    "\nErforderlich für kommerzielle Aufzeichnungen zur Verfolgung des Jahresumsatzes oder des Lizenzwerts.",
  "estate.agreementForm.utilisationLabel": "\nAuslastung in Prozent",
  "estate.agreementForm.utilisationHint":
    "\nErforderlich für kommerzielle Aufzeichnungen, um nachzuverfolgen, wie stark die lizenzierte Website oder Anlage genutzt wird.",
  "estate.agreementForm.performanceLabel": "\nService-Score",
  "estate.agreementForm.performanceHint":
    "\nErforderlich für Catering-Aufzeichnungen zur Erfassung der aktuellen ESS-Serviceleistung.",
  "estate.agreementForm.startDateLabel": "\nStartdatum",
  "estate.agreementForm.startDateHint":
    "\nOptionales Startdatum für die aktuelle Vertragslaufzeit oder den Überwachungszeitraum.",
  "estate.agreementForm.endDateLabel": "\nEnddatum",
  "estate.agreementForm.endDateHint":
    "\nOptionales Enddatum für die aktuelle Vertragslaufzeit oder das aktuelle Lizenzfenster.",
  "estate.agreementForm.notesLabel": "\nBetriebshinweise",
  "estate.agreementForm.notesPlaceholder":
    "\nErfassen Sie Schulungsbeschränkungen, Zugangsfenster, Partnerverpflichtungen oder Geräteabdeckung.",
  "estate.agreementForm.notesHint":
    "\nNutzen Sie dies, um den Kontext beizubehalten, der in Nachlassprüfungen und Partnerkoordination einfließen muss.",
  "estate.agreementForm.requiredHint":
    "\nTitel, Domäne, Typ, Standort, Gegenpartei, Vertragsstatus, Koordinationsstatus und Notizen sind immer erforderlich. Domainspezifische Metriken werden automatisch validiert.",
  "estate.agreementForm.submit": "\nNachlassvereinbarung",
  "estate.agreementForm.submitAria": "\nNachlassvereinbarung",
  "estate.agreementForm.summary.active": " speichern\n{count} aktiv",
  "estate.agreementForm.summary.conflicts": "\n{count} Konflikte",
  "estate.agreementForm.empty": "\nNoch keine Nachlassverträge erfasst.",
  "estate.agreementForm.emptySites": "\nKeine aktiven Websites verfügbar",
  "estate.agreementForm.emptySitesTitle":
    "\nErstellen Sie eine Website, bevor Sie Nachlassverträge erfassen",
  "estate.agreementForm.emptySitesDescription":
    "\nLändliche, kommerzielle und gastronomische Aufzeichnungen werden direkt einem verwalteten Standort und optional einem Vermögenswert desselben Standorts zugeordnet.",
  "estate.agreementForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "estate.agreementForm.tableAria": "\nNachlassverträge",
  "estate.agreementForm.table.agreement": "\nVereinbarung",
  "estate.agreementForm.table.domain": "\nDomäne",
  "estate.agreementForm.table.site": "\nStandort und Asset",
  "estate.agreementForm.table.status": "\nStatus",
  "estate.agreementForm.table.signal": "\nBetriebssignal",
  "estate.agreementForm.table.notes": "\nNotizen",
  "estate.agreementForm.table.signalRural": "\nGrundstückszustand: {condition}",
  "estate.agreementForm.table.signalCommercial": "\nUmsatz {revenue} · {utilisation}",
  "estate.agreementForm.table.signalCatering": "\nService {score} · Anlage {asset}",
  "estate.agreementForm.table.signalUtilisation": "\n{percent}% genutzt",
  "estate.agreementForm.table.signalScore": "\n{score}% Punktzahl",
  "estate.agreementForm.table.signalNone": "\nNoch kein Betriebssignal aufgezeichnet.",
  "estate.agreementForm.table.metricEmpty": "\nnicht aufgezeichnet",
  "estate.agreementForm.table.assetUnlinked": "\nKein verknüpfter Vermögenswert",
  "estate.agreementForm.table.startDateValue": "\nGestartet {date}",
  "estate.agreementForm.table.startDateEmpty": "\nKein Startdatum aufgezeichnet",
  "estate.agreementForm.validation.titleRequired": "\nDer Titel der Vereinbarung ist erforderlich.",
  "estate.agreementForm.validation.domainRequired": "\nWählen Sie eine gültige Vertragsdomäne.",
  "estate.agreementForm.validation.typeRequired": "\nWählen Sie einen gültigen Vereinbarungstyp.",
  "estate.agreementForm.validation.typeDomainMismatch":
    "Wählen Sie einen Vereinbarungstyp, der der ausgewählten Domäne entspricht.",
  "estate.agreementForm.validation.siteRequired": "\nWählen Sie eine gültige Immobilienseite aus.",
  "estate.agreementForm.validation.assetMismatch":
    "\nVerknüpfte Assets müssen zur ausgewählten Immobilienseite gehören.",
  "estate.agreementForm.validation.counterpartyRequired": "\nGegenpartei ist erforderlich.",
  "estate.agreementForm.validation.statusRequired": "\nDer Vereinbarungsstatus ist erforderlich.",
  "estate.agreementForm.validation.coordinationRequired":
    "\nDer Schulungskoordinationsstatus ist erforderlich.",
  "estate.agreementForm.validation.landConditionRequired":
    "\nLändliche Aufzeichnungen erfordern einen Landzustandsstatus.",
  "estate.agreementForm.validation.revenueRequired":
    "\nFür kommerzielle Aufzeichnungen ist ein Jahreswert erforderlich.",
  "estate.agreementForm.validation.utilisationRequired":
    "\nFür kommerzielle Aufzeichnungen ist ein Nutzungsprozentsatz erforderlich.",
  "estate.agreementForm.validation.performanceRequired":
    "\nCatering-Aufzeichnungen erfordern eine Servicebewertung.",
  "estate.agreementForm.validation.revenueInvalid": "\nDer Jahreswert muss null oder größer sein.",
  "estate.agreementForm.validation.utilisationInvalid":
    "\nDer Auslastungsprozentsatz muss eine ganze Zahl zwischen 0 und 100 sein.",
  "estate.agreementForm.validation.performanceInvalid":
    "\nDer Service-Score muss eine ganze Zahl zwischen 0 und 100 sein.",
  "estate.agreementForm.validation.dateInvalid":
    "\nDatumsangaben müssen gültige Kalenderwerte sein.",
  "estate.agreementForm.validation.dateOrderInvalid":
    "\nDas Enddatum muss am oder nach dem Startdatum liegen.",
  "estate.agreementForm.feedback.saved":
    "\nNachlassvereinbarung im Nachlassarbeitsbereich gespeichert.",
  "estate.agreementForm.feedback.saveFailed":
    "\nDie Nachlassvereinbarung kann derzeit nicht aufrechterhalten werden.",
  "estate.stewardshipForm.title": "\nRegistrieren Sie einen Verwalterdatensatz",
  "estate.stewardshipForm.description":
    "\nErfassen Sie Forstbetriebe, Denkmalschutz und Umweltschutzverpflichtungen in einem dauerhaften Nachlassregister.",
  "estate.stewardshipForm.alertTitle":
    "\nEin Verwaltungsregister deckt jetzt Forstwirtschaft, Kulturerbe und Umweltkontrollen ab",
  "estate.stewardshipForm.alertDescription":
    "\nAufzeichnungen über die Holzproduktion erfordern einen gemessenen Wert, Aufzeichnungen über Arbeitsgenehmigungen erfordern ein Zieldatum, und jede Aufzeichnung enthält einen gemeinsamen Zustand und eine gemeinsame Einhaltung der Vorschriften.",
  "estate.stewardshipForm.domainLabel": "\nDomäne",
  "estate.stewardshipForm.domainHint":
    "\nWählen Sie aus, ob der Datensatz zu Forstbetrieben, Denkmalpflege oder Umweltschutz gehört.",
  "estate.stewardshipForm.domain.FORESTRY": "\nForstbetriebe",
  "estate.stewardshipForm.domain.HERITAGE": "\nDenkmalpflege",
  "estate.stewardshipForm.domain.ENVIRONMENT": "\nUmweltverantwortung",
  "estate.stewardshipForm.recordTypeLabel": "\nDatensatztyp",
  "estate.stewardshipForm.recordTypeHint":
    "\nWählen Sie den Betriebsdatensatz, die Umfrage, den Zeitplan oder das Einwilligungselement aus, der am besten zum gewählten Verwaltungsbereich passt.",
  "estate.stewardshipForm.recordType.WOODLAND_ASSET": "\nWaldanlage",
  "estate.stewardshipForm.recordType.PLANTING_SCHEDULE": "\nPflanzplan",
  "estate.stewardshipForm.recordType.HARVEST_SCHEDULE": "\nErnteplan",
  "estate.stewardshipForm.recordType.TIMBER_OUTPUT": "\nHolzproduktion",
  "estate.stewardshipForm.recordType.HERITAGE_ASSET": "\nKulturerbegut",
  "estate.stewardshipForm.recordType.CONSERVATION_SURVEY": "\nNaturschutzumfrage",
  "estate.stewardshipForm.recordType.WORKS_CONSENT": "\nBaugenehmigung",
  "estate.stewardshipForm.recordType.BIODIVERSITY_MONITORING": "\nBiodiversitätsüberwachung",
  "estate.stewardshipForm.recordType.HABITAT_SURVEY": "\nLebensraumerhebung",
  "estate.stewardshipForm.recordType.ENVIRONMENTAL_INSPECTION": "\nUmweltinspektion",
  "estate.stewardshipForm.recordType.PROTECTED_SPECIES": "\nEintrag geschützter Arten",
  "estate.stewardshipForm.nameLabel": "\nAufnahmetitel",
  "estate.stewardshipForm.namePlaceholder": "\nSouth Woodland-Ausgabe return",
  "estate.stewardshipForm.nameHint":
    "Verwenden Sie einen Titel, der in Stewardship-Reviews, Compliance-Diskussionen und Berichtspaketen Bestand haben kann.",
  "estate.stewardshipForm.siteLabel": "\nSite",
  "estate.stewardshipForm.siteHint":
    "\nHängen Sie den Datensatz an die Website an, die Eigentümer der aktuellen Verantwortungsverpflichtung oder -aktivität ist.",
  "estate.stewardshipForm.assetLabel": "\nVerknüpftes Asset",
  "estate.stewardshipForm.assetHint":
    "\nVerknüpfen Sie den Datensatz optional mit einer Anlage am selben Standort, z. B. einer denkmalgeschützten Struktur, einer Waldanlage oder einem überwachten System.",
  "estate.stewardshipForm.assetOptional": "\nKein verknüpfter Vermögenswert",
  "estate.stewardshipForm.statusLabel": "\nDatensatzstatus",
  "estate.stewardshipForm.statusHint":
    "\nVerfolgen Sie, ob der Stewardship-Datensatz „Entwurf“, „Aktiv“, „Unter Beobachtung“ oder „Geschlossen“ ist.",
  "estate.stewardshipForm.status.DRAFT": "\nEntwurf",
  "estate.stewardshipForm.status.ACTIVE": "\nAktiv",
  "estate.stewardshipForm.status.WATCH": "\nAnsehen",
  "estate.stewardshipForm.status.CLOSED": "\nGeschlossen",
  "estate.stewardshipForm.conditionStatusLabel": "\nZustand Haltung",
  "estate.stewardshipForm.conditionStatusHint":
    "\nErfassen Sie, ob das Waldgebiet, das Kulturerbe oder das Umweltsignal günstig ist, sich erholt oder gefährdet ist.",
  "estate.stewardshipForm.conditionStatus.FAVOURABLE": "\nGünstig",
  "estate.stewardshipForm.conditionStatus.RECOVERING": "\nWiederherstellung",
  "estate.stewardshipForm.conditionStatus.AT_RISK": "\nIn Gefahr",
  "estate.stewardshipForm.complianceStatusLabel": "\nCompliance-Haltung",
  "estate.stewardshipForm.complianceStatusHint":
    "\nVerfolgen Sie, ob der aktuelle Datensatz konform ist, überwacht wird, auf Zustimmung wartet oder nicht konform ist.",
  "estate.stewardshipForm.complianceStatus.COMPLIANT": "\nKonform",
  "estate.stewardshipForm.complianceStatus.WATCH": "\nAnsehen",
  "estate.stewardshipForm.complianceStatus.CONSENT_REQUIRED": "\nZustimmung erforderlich",
  "estate.stewardshipForm.complianceStatus.NON_COMPLIANT": "\nNicht konform",
  "estate.stewardshipForm.metricValueLabel": "\nMesswert",
  "estate.stewardshipForm.metricValueHint":
    "\nVerwenden Sie dies für die Holzproduktion, Biodiversitätszählungen oder andere quantifizierte Stewardship-Maßnahmen.",
  "estate.stewardshipForm.metricUnitLabel": "\nMetrische Einheit",
  "estate.stewardshipForm.metricUnitPlaceholder": "\nTonnen, Hektar oder Sichtungen",
  "estate.stewardshipForm.metricUnitHint":
    "\nBenennen Sie die Einheit, die dem Messwert bei der Aufzeichnung zugeordnet ist.",
  "estate.stewardshipForm.targetDateLabel": "\nZieldatum",
  "estate.stewardshipForm.targetDateHint":
    "\nVerwenden Sie dies für Erntefenster, Vermessungstermine, Inspektionsfristen oder erforderliche Zustimmungsmeilensteine.",
  "estate.stewardshipForm.notesLabel": "\nBetriebshinweise",
  "estate.stewardshipForm.notesPlaceholder":
    "\nErfassen Sie Stewardship-Einschränkungen, Compliance-Kontext, Schutzbereiche oder betriebliche Abhängigkeiten.",
  "estate.stewardshipForm.notesHint":
    "\nBehalten Sie genügend Details für Compliance-Überprüfungen, Lieferkoordination und Nachlassberichte bei.",
  "estate.stewardshipForm.requiredHint":
    "\nTitel, Domäne, Datensatztyp, Standort, Status, Zustandsstatus, Konformitätsstatus und Notizen sind immer erforderlich. Domainspezifische Metriken werden automatisch validiert.",
  "estate.stewardshipForm.submit": "\nVerwaltungseintrag speichern",
  "estate.stewardshipForm.submitAria": "\nVerwaltungseintrag speichern",
  "estate.stewardshipForm.summary.atRisk": "\n{count} gefährdet",
  "estate.stewardshipForm.summary.consents": "\n{count} Zustimmungswarteschlange",
  "estate.stewardshipForm.empty": "\nEs wurden noch keine Verwaltungsunterlagen erfasst.",
  "estate.stewardshipForm.emptySites": "\nKeine aktiven Websites verfügbar",
  "estate.stewardshipForm.emptySitesTitle":
    "\nErstellen Sie eine Website, bevor Sie Verwaltungsunterlagen erfassen",
  "estate.stewardshipForm.emptySitesDescription":
    "\nAufzeichnungen über Forstwirtschaft, Kulturerbe und Umweltschutz werden direkt einem verwalteten Standort und optional einem Vermögenswert desselben Standorts zugeordnet.",
  "estate.stewardshipForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "estate.stewardshipForm.tableAria": "\nAufzeichnungen über die Verwaltung",
  "estate.stewardshipForm.table.record": "\nRecord",
  "estate.stewardshipForm.table.domain": "\nDomäne",
  "estate.stewardshipForm.table.site": "\nStandort und Asset",
  "estate.stewardshipForm.table.status": "\nStatus",
  "estate.stewardshipForm.table.signal": "\nBetriebssignal",
  "estate.stewardshipForm.table.notes": "\nNotizen",
  "estate.stewardshipForm.table.assetUnlinked": "\nKein verknüpfter Vermögenswert",
  "estate.stewardshipForm.table.updatedAt": "\nAktualisiert {date}",
  "estate.stewardshipForm.table.signalTimberOutput": "\n{value} {unit} aufgezeichnet",
  "estate.stewardshipForm.table.signalConsent": "Einwilligungshaltung: {status}",
  "estate.stewardshipForm.table.signalProtectedSpecies": "\nGeschützte Artenhaltung: {condition}",
  "estate.stewardshipForm.table.signalTargetDate": "\nZieldatum {date}",
  "estate.stewardshipForm.table.signalNone": "\nNoch kein Betriebssignal aufgezeichnet.",
  "estate.stewardshipForm.validation.titleRequired":
    "\nDer Titel eines Verwalters ist erforderlich.",
  "estate.stewardshipForm.validation.domainRequired":
    "\nWählen Sie eine gültige Stewardship-Domain.",
  "estate.stewardshipForm.validation.recordTypeRequired":
    "\nWählen Sie einen gültigen Stewardship-Datensatztyp.",
  "estate.stewardshipForm.validation.recordTypeDomainMismatch":
    "\nWählen Sie einen Datensatztyp aus, der der ausgewählten Stewardship-Domäne entspricht.",
  "estate.stewardshipForm.validation.siteRequired":
    "\nWählen Sie eine gültige Immobilienseite aus.",
  "estate.stewardshipForm.validation.assetMismatch":
    "\nVerknüpfte Assets müssen zur ausgewählten Immobilienseite gehören.",
  "estate.stewardshipForm.validation.statusRequired": "\nDer Stewardship-Status ist erforderlich.",
  "estate.stewardshipForm.validation.conditionStatusRequired":
    "\nKonditionshaltung ist erforderlich.",
  "estate.stewardshipForm.validation.complianceStatusRequired":
    "\nCompliance-Haltung ist erforderlich.",
  "estate.stewardshipForm.validation.metricValueRequired":
    "\nHolzausbringungsaufzeichnungen erfordern einen gemessenen Wert.",
  "estate.stewardshipForm.validation.metricValueInvalid":
    "\nDer gemessene Wert muss Null oder größer sein.",
  "estate.stewardshipForm.validation.metricUnitRequired":
    "\nBei der Messwerterfassung ist die metrische Einheit erforderlich.",
  "estate.stewardshipForm.validation.targetDateRequired":
    "\nBetriebsgenehmigungsaufzeichnungen erfordern ein Zieldatum.",
  "estate.stewardshipForm.validation.targetDateInvalid":
    "\nDas Zieldatum muss ein gültiger Kalenderwert sein.",
  "estate.stewardshipForm.feedback.saved":
    "\nDer Verwaltungsdatensatz wurde im Nachlassarbeitsbereich gespeichert.",
  "estate.stewardshipForm.feedback.saveFailed":
    "\nDer Stewardship-Datensatz kann derzeit nicht beibehalten werden.",
  "estate.fmGovernanceForm.title": "\nRegistrieren Sie einen FM-Governance-Datensatz",
  "estate.fmGovernanceForm.description":
    "\nErfassen Sie Hard-FM-Governance, gesetzliche Sicherheit, Servicepläne und Soft-FM-Benchmark-Status in einem Nachlassregister.",
  "estate.fmGovernanceForm.alertTitle":
    "\nSFG20, SOP19 und Soft-FM-Governance befinden sich jetzt in einer Nachlasskontrolloberfläche",
  "estate.fmGovernanceForm.alertDescription":
    "\nZeitplan-, Inspektions-, Audit- und Serviceaufzeichnungen verwenden Zieldaten, während reaktive Wartungs- und Benchmark-Aufzeichnungen gemessene Ausgabewerte enthalten.",
  "estate.fmGovernanceForm.domainLabel": "\nDomäne",
  "estate.fmGovernanceForm.domainHint":
    "\nTrennen Sie die Hard-FM-Wartungs-Governance von den Soft-FM-Service- und Benchmark-Kontrollen.",
  "estate.fmGovernanceForm.domain.HARD_FM": "\nHarte FM-Governance",
  "estate.fmGovernanceForm.domain.SOFT_FM": "\nSoft-FM-Governance",
  "estate.fmGovernanceForm.recordTypeLabel": "\nDatensatztyp",
  "estate.fmGovernanceForm.recordTypeHint":
    "\nWählen Sie die geplante Wartung, Sicherung, den Service oder die Benchmark-Kontrolle aus, die aufgezeichnet werden soll.",
  "estate.fmGovernanceForm.recordType.PPM_SCHEDULE": "\nGeplanter vorbeugender Wartungsplan",
  "estate.fmGovernanceForm.recordType.SFG20_SCHEDULE": "\nSFG20-Wartungsplan",
  "estate.fmGovernanceForm.recordType.STATUTORY_INSPECTION": "\nGesetzliche Inspektion",
  "estate.fmGovernanceForm.recordType.REACTIVE_MAINTENANCE": "\nReaktive Wartungsleistung",
  "estate.fmGovernanceForm.recordType.COMPLIANCE_AUDIT": "\nCompliance-Audit",
  "estate.fmGovernanceForm.recordType.ASSURANCE_REVIEW": "\nÜberprüfung der Wartungssicherheit",
  "estate.fmGovernanceForm.recordType.SERVICE_SCHEDULE": "\nSoft FM-Dienstplan",
  "estate.fmGovernanceForm.recordType.GROUNDS_PROGRAMME": "\nGeländepflegeprogramm",
  "estate.fmGovernanceForm.recordType.WASTE_SERVICE": "\nAbfalldienstprogramm",
  "estate.fmGovernanceForm.recordType.SERVICE_PERFORMANCE": "\nServiceleistungsmaß",
  "estate.fmGovernanceForm.recordType.PRODUCTIVITY_BENCHMARK": "\nProduktivitätsbenchmark",
  "estate.fmGovernanceForm.recordType.INDUSTRY_BENCHMARK": "\nBranchen-Benchmark",
  "estate.fmGovernanceForm.nameLabel": "\nAufnahmetitel",
  "estate.fmGovernanceForm.namePlaceholder": "\nGesetzlicher Inspektionszyklus für North Estate",
  "estate.fmGovernanceForm.nameHint":
    "\nBenennen Sie das FM-Governance-Element, damit es in Betriebsüberprüfungen und Nachlasssicherungspaketen überlebt.",
  "estate.fmGovernanceForm.siteLabel": "\nSite",
  "estate.fmGovernanceForm.siteHint":
    "Wählen Sie den Immobilienstandort aus, der Eigentümer des Wartungs- oder Service-Governance-Elements ist.",
  "estate.fmGovernanceForm.assetLabel": "\nVerknüpftes Asset",
  "estate.fmGovernanceForm.assetHint":
    "\nVerknüpfen Sie die Steuerung mit einer Anlage, wenn der Datensatz für ein bestimmtes Anlagenelement oder eine Infrastrukturkomponente gilt.",
  "estate.fmGovernanceForm.assetOptional": "\nKein verknüpfter Vermögenswert",
  "estate.fmGovernanceForm.statusLabel": "\nDatensatzstatus",
  "estate.fmGovernanceForm.statusHint":
    "\nLegen Sie fest, ob das Governance-Element aktiv, überwacht oder geschlossen ist.",
  "estate.fmGovernanceForm.status.DRAFT": "\nEntwurf",
  "estate.fmGovernanceForm.status.ACTIVE": "\nAktiv",
  "estate.fmGovernanceForm.status.WATCH": "\nAnsehen",
  "estate.fmGovernanceForm.status.CLOSED": "\nGeschlossen",
  "estate.fmGovernanceForm.deliveryStatusLabel": "\nLieferhaltung",
  "estate.fmGovernanceForm.deliveryStatusHint":
    "\nErfassen Sie, ob der Zeitplan oder Service auf dem richtigen Weg ist, unter Druck steht oder nicht auf dem richtigen Weg ist.",
  "estate.fmGovernanceForm.deliveryStatus.ON_TRACK": "\nAuf dem richtigen Weg",
  "estate.fmGovernanceForm.deliveryStatus.UNDER_PRESSURE": "\nUnter Druck",
  "estate.fmGovernanceForm.deliveryStatus.OFF_TRACK": "\nAus der Spur",
  "estate.fmGovernanceForm.complianceStatusLabel": "\nCompliance-Haltung",
  "estate.fmGovernanceForm.complianceStatusHint":
    "\nVerfolgen Sie, ob die Kontrolle konform ist, Maßnahmen erfordert oder in die Nichteinhaltung übergegangen ist.",
  "estate.fmGovernanceForm.complianceStatus.COMPLIANT": "\nKonform",
  "estate.fmGovernanceForm.complianceStatus.WATCH": "\nAnsehen",
  "estate.fmGovernanceForm.complianceStatus.ACTION_REQUIRED": "\nAktion erforderlich",
  "estate.fmGovernanceForm.complianceStatus.NON_COMPLIANT": "\nNicht konform",
  "estate.fmGovernanceForm.metricValueLabel": "\nMesswert",
  "estate.fmGovernanceForm.metricValueHint":
    "\nVerwenden Sie einen Wert für reaktive Wartung, Leistung und Benchmark-Bewertung.",
  "estate.fmGovernanceForm.metricUnitLabel": "\nMetrische Einheit",
  "estate.fmGovernanceForm.metricUnitPlaceholder":
    "\nPunktzahl, Arbeitsplätze, Hektar oder Stunden",
  "estate.fmGovernanceForm.metricUnitHint":
    "\nBeschreiben Sie die Einheit, die für den gemessenen Service- oder Benchmark-Wert verwendet wird.",
  "estate.fmGovernanceForm.targetDateLabel": "\nZieldatum",
  "estate.fmGovernanceForm.targetDateHint":
    "\nVerwenden Sie Zieltermine für Zeitpläne, Inspektionen, Audits, Sicherheitsüberprüfungen und Serviceprogramme.",
  "estate.fmGovernanceForm.notesLabel": "\nBetriebshinweise",
  "estate.fmGovernanceForm.notesPlaceholder":
    "\nErfassen Sie Details zu SFG20, SOP19, Serviceleistung, Benchmark oder Schadensbegrenzung, die im Nachlassdatensatz verbleiben sollen.",
  "estate.fmGovernanceForm.notesHint":
    "\nHalten Sie Ihre Notizen kurz, sachlich und spezifisch für das FM-Governance-Element.",
  "estate.fmGovernanceForm.requiredHint":
    "\nTitel, Domäne, Typ, Site, Status und Notizen sind erforderlich. Einige Datensatztypen erfordern auch eine Metrik oder ein Zieldatum.",
  "estate.fmGovernanceForm.submit": "\nFM-Governance-Datensatz speichern",
  "estate.fmGovernanceForm.submitAria": "\nFM-Governance-Datensatz speichern",
  "estate.fmGovernanceForm.summary.complianceAttention": "\n{count} brauche Aufmerksamkeit",
  "estate.fmGovernanceForm.summary.benchmarks": "\n{count} Benchmarks verfolgt",
  "estate.fmGovernanceForm.empty": "\nEs wurden noch keine FM-Governance-Datensätze erfasst.",
  "estate.fmGovernanceForm.emptySites": "\nKeine aktiven Websites verfügbar",
  "estate.fmGovernanceForm.emptySitesTitle":
    "\nErstellen Sie eine Site, bevor Sie FM-Governance-Datensätze erfassen",
  "estate.fmGovernanceForm.emptySitesDescription":
    "\nDas FM-Governance-Register hängt von der Standortliste des Anwesens ab, sodass Zeitpläne und Dienste mit dem richtigen Standort verknüpft werden können.",
  "estate.fmGovernanceForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "estate.fmGovernanceForm.tableAria": "\nFM-Governance-Datensätze",
  "estate.fmGovernanceForm.table.record": "\nRecord",
  "estate.fmGovernanceForm.table.domain": "\nDomäne",
  "estate.fmGovernanceForm.table.site": "\nStandort und Asset",
  "estate.fmGovernanceForm.table.status": "\nStatus",
  "estate.fmGovernanceForm.table.signal": "\nBetriebssignal",
  "estate.fmGovernanceForm.table.notes": "\nNotizen",
  "estate.fmGovernanceForm.table.assetUnlinked": "\nKein verknüpfter Vermögenswert",
  "estate.fmGovernanceForm.table.updatedAt": "\nAktualisiert {date}",
  "estate.fmGovernanceForm.table.signalMetric": "\n{value} {unit} aufgezeichnet",
  "estate.fmGovernanceForm.table.signalTargetDate": "\nZieldatum {date}",
  "estate.fmGovernanceForm.table.signalCompliance": "\nCompliance-Status: {status}",
  "estate.fmGovernanceForm.validation.titleRequired": "\nFM-Governance-Titel ist erforderlich.",
  "estate.fmGovernanceForm.validation.domainRequired":
    "\nWählen Sie eine gültige FM-Governance-Domäne.",
  "estate.fmGovernanceForm.validation.recordTypeRequired":
    "\nWählen Sie einen gültigen FM-Governance-Datensatztyp.",
  "estate.fmGovernanceForm.validation.recordTypeDomainMismatch":
    "\nWählen Sie einen Datensatztyp aus, der der ausgewählten FM-Governance-Domäne entspricht.",
  "estate.fmGovernanceForm.validation.siteRequired":
    "\nWählen Sie eine gültige Immobilienseite aus.",
  "estate.fmGovernanceForm.validation.assetMismatch":
    "\nDer verknüpfte Vermögenswert muss zur ausgewählten Grundstücksseite gehören.",
  "estate.fmGovernanceForm.validation.statusRequired":
    "\nDer FM-Governance-Status ist erforderlich.",
  "estate.fmGovernanceForm.validation.deliveryStatusRequired":
    "FM-Governance-Lieferstatus ist erforderlich.",
  "estate.fmGovernanceForm.validation.complianceStatusRequired":
    "\nDer Compliance-Status der FM-Governance ist erforderlich.",
  "estate.fmGovernanceForm.validation.metricValueRequired":
    "\nReaktive Wartungs-, Leistungs- und Benchmark-Aufzeichnungen erfordern einen Messwert.",
  "estate.fmGovernanceForm.validation.metricValueInvalid":
    "\nDer gemessene Wert muss Null oder größer sein.",
  "estate.fmGovernanceForm.validation.metricUnitRequired":
    "\nBei der Messwerterfassung ist die metrische Einheit erforderlich.",
  "estate.fmGovernanceForm.validation.targetDateRequired":
    "\nZeitplan-, Inspektions-, Audit-, Sicherungs- und Serviceaufzeichnungen erfordern ein Zieldatum.",
  "estate.fmGovernanceForm.validation.targetDateInvalid":
    "\nDas Zieldatum muss ein gültiger Kalenderwert sein.",
  "estate.fmGovernanceForm.feedback.saved":
    "\nFM-Governance-Datensatz im Estate-Arbeitsbereich gespeichert.",
  "estate.fmGovernanceForm.feedback.saveFailed":
    "\nDer FM-Governance-Datensatz kann derzeit nicht beibehalten werden.",
  "estate.rangeControlForm.title":
    "\nRegistrieren Sie einen Bereich und einen GFE-Kontrolldatensatz",
  "estate.rangeControlForm.description":
    "\nErfassen Sie TAROM-Aktivitäten, Sicherheitskontrollen im Schießstand, die Lebenszyklushaltung des Zielobjekts und Signale der von der Regierung bereitgestellten Ausrüstung in einem dauerhaften Nachlassregister.",
  "estate.rangeControlForm.alertTitle":
    "\nEin Betriebskontrollregister deckt jetzt Entfernungen, Sicherheit, Zielgenauigkeit und GFE",
  "estate.rangeControlForm.alertDescription":
    " ab.\nVerfügbarkeits- und Auslastungsaufzeichnungen erfordern einen gemessenen Wert, Inspektions- und Wiederherstellungsaktionen erfordern ein Zieldatum und Ziel- oder GFE-Datensätze erfordern eine verknüpfte Anlage am selben Standort.",
  "estate.rangeControlForm.domainLabel": "\nDomäne",
  "estate.rangeControlForm.domainHint":
    "\nWählen Sie, ob der Datensatz zur TAROM-Bereitstellung, zur Einhaltung der Bereichssicherheit, zur Zielverwaltung oder zur GFE-Lebenszyklusüberwachung gehört.",
  "estate.rangeControlForm.domain.RANGE_OPERATIONS": "\nTrainingsbereiche und Schießstandbetrieb",
  "estate.rangeControlForm.domain.RANGE_SAFETY": "\nSicherheitskonformität des Bereichs",
  "estate.rangeControlForm.domain.TARGETRY": "\nZielgruppen-Lebenszyklusmanagement",
  "estate.rangeControlForm.domain.GFE": "\nVon der Regierung bereitgestellte Ausrüstung",
  "estate.rangeControlForm.recordTypeLabel": "\nDatensatztyp",
  "estate.rangeControlForm.recordTypeHint":
    "\nWählen Sie den Betriebskontroll-, Inspektions-, Verfügbarkeits-, Speicher- oder Ersatzdatensatz aus, der am besten zur ausgewählten Domäne passt.",
  "estate.rangeControlForm.recordType.RANGE_REGISTRY": "\nBereichsregistrierungsdatensatz",
  "estate.rangeControlForm.recordType.RANGE_AVAILABILITY": "\nBereichsverfügbarkeit",
  "estate.rangeControlForm.recordType.RANGE_PREPARATION": "\nBereichsvorbereitungsfenster",
  "estate.rangeControlForm.recordType.RANGE_RECOVERY": "\nBereichswiederherstellungsfenster",
  "estate.rangeControlForm.recordType.SAFETY_INSPECTION": "\nSicherheitsinspektion",
  "estate.rangeControlForm.recordType.SAFETY_DEFECT": "\nSicherheitsmangel",
  "estate.rangeControlForm.recordType.CORRECTIVE_ACTION": "\nKorrekturmaßnahme",
  "estate.rangeControlForm.recordType.TARGET_ASSET": "\nZielvermögenswert",
  "estate.rangeControlForm.recordType.TARGET_DEPLOYMENT": "\nZielbereitstellungsfenster",
  "estate.rangeControlForm.recordType.TARGET_STORAGE": "\nZielspeicherort",
  "estate.rangeControlForm.recordType.TARGET_AVAILABILITY": "\nZielverfügbarkeit",
  "estate.rangeControlForm.recordType.GFE_CONDITION": "\nGFE-Bedingung",
  "estate.rangeControlForm.recordType.GFE_UTILISATION": "\nGFE-Nutzung",
  "estate.rangeControlForm.recordType.GFE_REPLACEMENT": "\nGFE-Ersatzplan",
  "estate.rangeControlForm.nameLabel": "\nAufnahmetitel",
  "estate.rangeControlForm.namePlaceholder": "\nZielverfügbarkeit des nördlichen Sektors return",
  "estate.rangeControlForm.nameHint":
    "\nVerwenden Sie einen Titel, der Range Boards, Compliance-Überprüfungen und Betriebsberichten standhält.",
  "estate.rangeControlForm.siteLabel": "\nSite",
  "estate.rangeControlForm.siteHint":
    "\nHängen Sie den Datensatz an die Website des Schulungsgeländes an, die derzeit Eigentümer der Aktivität oder Kontrolle ist.",
  "estate.rangeControlForm.assetLabel": "\nVerknüpfte Anlage oder Ausrüstung",
  "estate.rangeControlForm.assetHint":
    "\nVerknüpfen Sie Targetry- und GFE-Datensätze mit derselben Anlage oder Ausrüstung am selben Standort, die sie direkt beschreiben.",
  "estate.rangeControlForm.assetOptional": "\nKein verknüpfter Vermögenswert",
  "estate.rangeControlForm.statusLabel": "\nDatensatzstatus",
  "estate.rangeControlForm.statusHint":
    "Verfolgen Sie, ob der Datensatz Entwurf, aktiv, überwacht oder geschlossen ist.",
  "estate.rangeControlForm.status.DRAFT": "\nEntwurf",
  "estate.rangeControlForm.status.ACTIVE": "\nAktiv",
  "estate.rangeControlForm.status.WATCH": "\nAnsehen",
  "estate.rangeControlForm.status.CLOSED": "\nGeschlossen",
  "estate.rangeControlForm.operationalStatusLabel": "\nBetriebshaltung",
  "estate.rangeControlForm.operationalStatusHint":
    "\nErfassen Sie, ob die Reichweite, das Sicherheitssystem, das Zielgerät oder das GFE-Element verfügbar, eingeschränkt oder nicht verfügbar ist.",
  "estate.rangeControlForm.operationalStatus.AVAILABLE": "\nVerfügbar",
  "estate.rangeControlForm.operationalStatus.CONSTRAINED": "\nEingeschränkt",
  "estate.rangeControlForm.operationalStatus.UNAVAILABLE": "\nNicht verfügbar",
  "estate.rangeControlForm.complianceStatusLabel": "\nCompliance-Haltung",
  "estate.rangeControlForm.complianceStatusHint":
    "\nVerfolgen Sie, ob die aktuelle Kontrolle konform ist, überwacht wird, Maßnahmen erfordert oder nicht konform ist.",
  "estate.rangeControlForm.complianceStatus.COMPLIANT": "\nKonform",
  "estate.rangeControlForm.complianceStatus.WATCH": "\nAnsehen",
  "estate.rangeControlForm.complianceStatus.ACTION_REQUIRED": "\nAktion erforderlich",
  "estate.rangeControlForm.complianceStatus.NON_COMPLIANT": "\nNicht konform",
  "estate.rangeControlForm.metricValueLabel": "\nMesswert",
  "estate.rangeControlForm.metricValueHint":
    "\nVerwenden Sie dies für Verfügbarkeitszählungen, Auslastungssummen oder andere quantifizierte Betriebssignale.",
  "estate.rangeControlForm.metricUnitLabel": "\nMetrische Einheit",
  "estate.rangeControlForm.metricUnitPlaceholder": "\nReichweiten, Spuren, Fahrzeuge oder Stunden",
  "estate.rangeControlForm.metricUnitHint":
    "\nBenennen Sie die Einheit, die dem Messwert bei der Aufzeichnung zugeordnet ist.",
  "estate.rangeControlForm.targetDateLabel": "\nZieldatum",
  "estate.rangeControlForm.targetDateHint":
    "\nVerwenden Sie dies für Inspektionstermine, Vorbereitungs- und Wiederherstellungsfenster, Bereitstellungen oder Ersatzmeilensteine.",
  "estate.rangeControlForm.notesLabel": "\nBetriebshinweise",
  "estate.rangeControlForm.notesPlaceholder":
    "\nErfassen Sie die Koordination von Live-Feuern, den Sicherheitskontext, Wartungseinschränkungen, Einsatzdetails oder Ersatzannahmen.",
  "estate.rangeControlForm.notesHint":
    "\nBehalten Sie ausreichend Kontext für die TAROM-Planung, Sicherheitsgewährleistung und DIO-bezogene Betriebsberichterstattung bei.",
  "estate.rangeControlForm.requiredHint":
    "\nTitel, Domäne, Datensatztyp, Standort, Workflow-Status, Betriebsstatus, Compliance-Status und Notizen sind immer erforderlich. Asset-, Metrik- und Zieldatumsregeln werden automatisch validiert.",
  "estate.rangeControlForm.submit": "\nBetriebskontrollsatz speichern",
  "estate.rangeControlForm.submitAria": "\nBetriebskontrollsatz speichern",
  "estate.rangeControlForm.summary.constraints": "\n{count} eingeschränkt",
  "estate.rangeControlForm.summary.actions": "\n{count} Aktion erforderlich",
  "estate.rangeControlForm.empty": "\nNoch keine Betriebskontrolldatensätze erfasst.",
  "estate.rangeControlForm.emptySites": "\nKeine aktiven Websites verfügbar",
  "estate.rangeControlForm.emptySitesTitle":
    "\nErstellen Sie eine Site, bevor Sie Reichweiten- und GFE-Kontrolldatensätze erfassen",
  "estate.rangeControlForm.emptySitesDescription":
    "\nAufzeichnungen zu Betriebsreichweite, Sicherheit, Zielerfassung und GFE werden direkt an einen verwalteten Standort und optional an ein Asset am selben Standort angehängt.",
  "estate.rangeControlForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "estate.rangeControlForm.tableAria": "\nReichweiten- und GFE-Kontrolldatensätze",
  "estate.rangeControlForm.table.record": "\nRecord",
  "estate.rangeControlForm.table.domain": "\nDomäne",
  "estate.rangeControlForm.table.site": "\nStandort und Asset",
  "estate.rangeControlForm.table.status": "\nStatus",
  "estate.rangeControlForm.table.signal": "\nBetriebssignal",
  "estate.rangeControlForm.table.notes": "\nNotizen",
  "estate.rangeControlForm.table.assetUnlinked": "\nKein verknüpfter Vermögenswert",
  "estate.rangeControlForm.table.updatedAt": "\nAktualisiert {date}",
  "estate.rangeControlForm.table.signalRangeAvailability": "\n{value} {unit} verfügbar",
  "estate.rangeControlForm.table.signalTargetAvailability": "\n{value} {unit} verfügbar",
  "estate.rangeControlForm.table.signalGfeUtilisation": "\n{value} {unit} genutzt",
  "estate.rangeControlForm.table.signalSafetyDefect": "\nFehlerhaltung: {status}",
  "estate.rangeControlForm.table.signalTargetDate": "\nZieldatum {date}",
  "estate.rangeControlForm.table.signalNone": "\nNoch kein Betriebssignal aufgezeichnet.",
  "estate.rangeControlForm.validation.titleRequired": "\nBetriebskontrolltitel ist erforderlich.",
  "estate.rangeControlForm.validation.domainRequired":
    "\nWählen Sie eine gültige Bereichskontrolldomäne.",
  "estate.rangeControlForm.validation.recordTypeRequired":
    "\nWählen Sie einen gültigen Bereichskontrolldatensatztyp.",
  "estate.rangeControlForm.validation.recordTypeDomainMismatch":
    "\nWählen Sie einen Datensatztyp, der der ausgewählten Bereichskontrolldomäne entspricht.",
  "estate.rangeControlForm.validation.siteRequired":
    "\nWählen Sie eine gültige Immobilienseite aus.",
  "estate.rangeControlForm.validation.assetRequired":
    "\nTargetry- und GFE-Datensätze erfordern ein verknüpftes Asset derselben Site.",
  "estate.rangeControlForm.validation.assetMismatch":
    "\nVerknüpfte Assets müssen zur ausgewählten Immobilienseite gehören.",
  "estate.rangeControlForm.validation.statusRequired": "\nBetriebskontrollstatus ist erforderlich.",
  "estate.rangeControlForm.validation.operationalStatusRequired":
    "\nBetriebshaltung ist erforderlich.",
  "estate.rangeControlForm.validation.complianceStatusRequired":
    "\nCompliance-Haltung ist erforderlich.",
  "estate.rangeControlForm.validation.metricValueRequired":
    "Verfügbarkeits- und Nutzungsaufzeichnungen erfordern einen Messwert.",
  "estate.rangeControlForm.validation.metricValueInvalid":
    "\nDer gemessene Wert muss Null oder größer sein.",
  "estate.rangeControlForm.validation.metricUnitRequired":
    "\nBei der Messwerterfassung ist die metrische Einheit erforderlich.",
  "estate.rangeControlForm.validation.targetDateRequired":
    "\nDieser Datensatztyp erfordert ein Zieldatum.",
  "estate.rangeControlForm.validation.targetDateInvalid":
    "\nDas Zieldatum muss ein gültiger Kalenderwert sein.",
  "estate.rangeControlForm.validation.safetyDefectComplianceMismatch":
    "\nSicherheitsmängel können nicht als konform erfasst werden.",
  "estate.rangeControlForm.feedback.saved":
    "\nBetriebskontrolldatensatz im Estate-Workspace gespeichert.",
  "estate.rangeControlForm.feedback.saveFailed":
    "\nDer Betriebskontrolldatensatz kann derzeit nicht beibehalten werden.",
  "estate.rangeControlForm.feedback.updated": "\nBetriebskontrolldatensatz aktualisiert.",
  "estate.rangeControlForm.feedback.deleted":
    "\nBetriebskontrolldatensatz aus dem Arbeitsbereich entfernt.",
  "estate.rangeControlForm.feedback.deleteFailed":
    "\nDer Betriebskontrolldatensatz kann derzeit nicht entfernt werden.",
  "estate.rangeControlForm.validation.recordNotFound":
    "\nDer angeforderte Bereichskontrolldatensatz wurde nicht gefunden.",
  "estate.readiness.assets":
    "\nDie Vermögens- und Anlagenlage liefert bereits die aktuelle Basislinie des Anwesens.",
  "estate.readiness.delivery":
    "\nArbeitsaufträge und Betriebsdokumente verankern bereits die FM-Liefer- und Vertragsüberwachung.",
  "estate.readiness.programme":
    "\nProjektregister, Finanzplanung und dauerhafte Initiativen können Genehmigungen bereits in den Programmablauf übertragen.",
  "estate.action.assets":
    "\nÜberprüfen Sie das maßgebliche Asset-Register, die Hierarchie, den Zustand und den Lebenszyklusstatus.",
  "estate.action.workOrders":
    "\nSteigen Sie direkt in die Bereiche aktives Hard FM, Sanierung und gesetzliche Arbeit zur Gestaltung der Nachlassversicherung ein.",
  "estate.action.finance":
    "\nTragen Sie den Nachlassdruck in die Budgetgestaltung, Planungsszenarien und Genehmigungsgespräche ein.",
  "estate.action.reports":
    "\nPacken Sie Bestandsstatus, Bereitschaft, Leistung und Schadensbegrenzungsaktivitäten in Executive-Berichtspakete.",
  "estate.action.buildings":
    "\nÜberprüfen Sie die Einrichtungen, den Stand der gebauten Anlagen und die Bereitschaft zur Zwillingsbewirtschaftung in der gesamten Immobilienhierarchie.",
  "estate.page.eyebrow": "\nNachlasskontrollflugzeug",
  "estate.page.readinessRailDescription":
    "\nVerfolgen Sie das aktuelle Portfolio-Signal hinsichtlich Asset-Verfügbarkeit, Live-Lieferdruck und Programmblockern, bevor Sie die Arbeit an nachgelagerte Domänen weiterleiten.",
  "estate.page.readinessRail.assetSignal":
    "\nDie Verfügbarkeit von Vermögenswerten und der Reichweite bleibt das wichtigste Signal für die Einsatzbereitschaft und Schulungsunterstützung.",
  "estate.page.readinessRail.deliverySignal":
    "\nDer Lieferdruck erfasst offene Arbeiten, überfällige Inspektionen und Schadensbegrenzungsaktivitäten, die sich auf den Sicherheitsstatus auswirken.",
  "estate.page.readinessRail.programmeSignal":
    "\nProgrammkontrollen zeigen, wo Genehmigungen, Hochrisikoprojekte und Finanzierungsabhängigkeiten die operative Erholung behindern.",
  "estate.page.readinessRail.sites":
    "{count} Eingeschränkte Standortsignale erfordern eine Abschwächung der Bereitschaft und operative Folgemaßnahmen.",
  "estate.page.readinessRail.inspections":
    "\n{count} Überfällige Inspektionssignale bleiben im gesamten Bild des Anwesens aktiv.",
  "estate.page.readinessRail.delivery":
    "\n{count} Verstoß gegen Arbeitsauftragssignale prägen das aktuelle Lieferbild.",
  "estate.page.performanceTitle": "\nLiefererfüllung und Vertragskontrolle",
  "estate.page.performanceDescription":
    "\nÜberwachen Sie den Ausführungsdurchsatz, die Personalkapazität, die Produktivität und den Verbesserungsbedarf innerhalb derselben Verwaltungsebene.",
  "estate.page.performanceControlsTitle": "\nVerbesserungsmaßnahmen",
  "estate.page.performanceControlsDescription":
    "\n{changes} Vertragsergebnisse bleiben überfällig und prägen weiterhin die aktive Verbesserungswarteschlange.",
  "estate.page.decisionBoardTitle": "\nAusnahmebefehlsplatine",
  "estate.page.decisionBoardDescription":
    "\nBeheben Sie Bereitschaftsblocker, Lieferverstöße, Genehmigungen und Abhängigkeitsprobleme, die vor dem nächsten Betriebszyklus Maßnahmen erfordern.",
  "estate.page.decisionBoardBriefTitle": "\nSofortige Aufmerksamkeit",
  "estate.page.decisionBoardBriefDescription":
    "\nBeginnen Sie mit eingeschränkten Standorten, fehlerhafter Arbeit, instabilen Abhängigkeiten oder verzögerten Genehmigungen, bevor Sie den Aufwand in Berichte und Pakete umleiten.",
  "estate.page.overviewActionsDescription":
    "\nWechseln Sie direkt von der Ausnahmetriage zu den Berichtspaketen, Verwaltungsoberflächen und Planungsworkflows, die für die Nachlasswiederherstellung zuständig sind.",
  "estate.page.approvalsFocusDescription":
    "\nFühren Sie mit verspäteten Genehmigungen, risikoreichen Initiativen und Ressourcendruck, bevor Sie sich der Strategie, Initiativen und Projektkontrollen zuwenden.",
  "estate.page.assuranceFocusDescription":
    "\nFühren Sie sich mit Asset-Risiken, Lieferverstößen und offenen Verbesserungsmaßnahmen auseinander, bevor Sie sich mit der Registrierung, der FM-Governance und den Beweisen für die Verwaltung befassen.",
  "estate.page.partnershipsFocusDescription":
    "\nFühren Sie sich mit Vereinbarungskonflikten, Servicequalität und Integrationsaufmerksamkeit durch, bevor Sie sich den detaillierten Vertrags- und Abhängigkeitsoberflächen zuwenden.",
  "estate.page.commandCard.watchTitle": "\nBeobachtungslistenfunktionen",
  "estate.page.commandCard.watchDescription":
    "\n{total} Verfolgte Fähigkeitssignale sind im gesamten Anwesen im Einsatz.",
  "estate.page.commandCard.constrainedSitesTitle": "\nEingeschränkte Websites",
  "estate.page.commandCard.constrainedSitesDescription":
    "\n{inspections} überfällige Inspektionssignale prägen das Bild der eingeschränkten Situation.",
  "estate.page.commandCard.inspectionsTitle": "\nÜberfällige Inspektionen",
  "estate.page.commandCard.inspectionsDescription":
    "\nKlare gesetzliche und Bereitschaftsprüfungen, bevor sich die Versicherungsschuld auf den gesamten Nachlass ausweitet.",
  "estate.page.commandCard.highRiskTitle": "\nHochrisikoprojekte",
  "estate.page.commandCard.highRiskDescription":
    "{conflicts} Ressourcenkonfliktsignale wirken sich bereits auf die Genehmigungs- und Lieferlinie aus.",
  "estate.page.commandCard.resourceConflictsTitle": "\nRessourcenkonflikte",
  "estate.page.commandCard.resourceConflictsDescription":
    "\nTragen Sie Personal-, Finanzierungs- und Lieferdruck in die Planungsoberflächen ein, bevor die Kontrollen verrutschen.",
  "estate.page.commandCard.deliveryBreachesTitle": "\nVerstoß gegen Arbeitsaufträge",
  "estate.page.commandCard.deliveryBreachesDescription":
    "\n{actions} Offene Verbesserungsmaßnahmen liegen immer noch hinter dem aktuellen Bild der Lieferverletzung.",
  "estate.page.commandCard.partnershipConflictsTitle": "\nKoordinationskonflikte",
  "estate.page.commandCard.partnershipConflictsDescription":
    "\n{agreements} aktive Vereinbarungssignale erfordern noch eine abgestimmte kommerzielle und betriebliche Weiterverfolgung.",
  "estate.page.commandCard.cateringTitle": "\nCatering-Service-Score",
  "estate.page.commandCard.cateringDescription":
    "\nBehandeln Sie die ESS-Qualität als Live-Betriebsmaßnahme neben Vereinbarungen, Abhängigkeiten und Bauunterstützung.",
  "estate.page.commandCard.integrationsDescription":
    "\n{configured} von {total} Estate-Linked-Integrationen sind derzeit innerhalb der Steuerungsebene konfiguriert.",
  "estate.page.decisionCard.readinessTitle": "\nKlare Bereitschaftsblocker",
  "estate.page.decisionCard.readinessDescription":
    "\nEskalieren Sie eingeschränkte Standorte, überfällige Inspektionen und Beobachtungslistenfunktionen in die Arbeitsabläufe, die für die Schadensbegrenzung zuständig sind.",
  "estate.page.decisionCard.performanceTitle": "\nLieferperformance stabilisieren",
  "estate.page.decisionCard.performanceDescription":
    "\nHandeln Sie bei Verstößen gegen Arbeitsaufträge, Arbeitsdruck und Vertragsverbesserungsmaßnahmen, bevor sich die Leistungsfristen erweitern.",
  "estate.page.decisionCard.dependenciesTitle": "\nKritische Abhängigkeiten wiederherstellen",
  "estate.page.decisionCard.dependenciesDescription":
    "\nBehandeln Sie Finanz-, Dokumenten-, Beschaffungs- und ESS-Integrationen als Live-Betriebskontrollen und nicht als Administrator-Metadaten.",
  "estate.page.decisionCard.approvalsTitle": "\nProgrammentscheidungen entsperren",
  "estate.page.decisionCard.approvalsDescription":
    "\nBeseitigen Sie verspätete Genehmigungen, finanziellen Druck und Kontrolländerungen, bevor sie die Nachlasssanierung und -sicherung ins Stocken bringen.",
  "estate.page.launchpadsTitle": "\nExecutive-Launchpads",
  "estate.page.launchpadsDescription":
    "\nWechseln Sie vom Nachlassstatus zum DIO-Reporting, zur FM-Sicherung, zur Stewardship-Überwachung und zur Überprüfung der Integrationsabhängigkeiten, ohne die Hülle zu verlassen.",
  "estate.page.launchpadsBadge": "\nPortfoliokontrollen",
  "estate.page.launchpadsBriefTitle": "\nBetreiberbrief",
  "estate.page.launchpadsBriefDescription":
    "\nVerwenden Sie diese Launchpads, wenn die Kontrollkonversation vom Live-Status in Berichtspakete, Sicherheitsnachweise oder unterstützende Systemabhängigkeiten übergehen muss.",
  "estate.page.launchpadsLane.governanceTitle": "\nGovernance",
  "estate.page.launchpadsLane.governanceHeadline":
    "\nBehalten Sie Strategie, Genehmigungen und Investitionsentscheidungen im Blick.",
  "estate.page.launchpadsLane.governanceDescription":
    "Halten Sie Ihre Nachlassstrategie, Programmkontrollen und Finanzplanung aufeinander abgestimmt, bevor Entscheidungen die Kontrollebene verlassen.",
  "estate.page.launchpadsLane.assuranceTitle": "\nSicherheit",
  "estate.page.launchpadsLane.assuranceHeadline":
    "\nVerknüpfen Sie FM-Liefer-, Stewardship- und Vertragssignale mit revisionssicheren Beweisen.",
  "estate.page.launchpadsLane.assuranceDescription":
    "\nVerwenden Sie FM-Governance- und Stewardship-Pakete, um Compliance-, Leistungs- und Wiederherstellungsprobleme mit einem gemeinsamen Betriebskontext zu besprechen.",
  "estate.page.launchpadsLane.readinessTitle": "\nBereitschaft",
  "estate.page.launchpadsLane.readinessHeadline":
    "\nEskalieren Sie Reichweiten-, Leistungsfähigkeits- und Infrastrukturblocker frühzeitig.",
  "estate.page.launchpadsLane.readinessDescription":
    "\nBringen Sie Bereitschaftssignale in die Berichterstellung und Planung ein, bevor Einschränkungen zu Service-, Schulungs- oder Genehmigungsfehlern führen.",
  "estate.page.launchpadsLane.externalTitle": "\nAbhängigkeiten",
  "estate.page.launchpadsLane.externalHeadline":
    "\nBehandeln Sie Unternehmensintegrationen und Partnersysteme als operative Kontrollen.",
  "estate.page.launchpadsLane.externalDescription":
    "\nÜberprüfen Sie Finanz-, Dokumenten-, Beschaffungs- und Catering-Abhängigkeiten als Teil des Betriebsbildes des Anwesens und nicht als separate Verwaltungsdaten.",
  "estate.readiness.actionsTitle": "\nBereitschaftsworkflow-Aktionen",
  "estate.readiness.actionsDescription":
    "\nEskalieren Sie den Bereitschaftsstatus in die verbundenen Arbeitsabläufe, die über Nachweise zur Schadensbegrenzung, Finanzierung und Sicherheit verfügen.",
  "estate.readiness.action.report": "\nBereitschaftspaket öffnen",
  "estate.readiness.action.workOrders": "\nOffene Arbeitsaufträge",
  "estate.readiness.action.finance": "\nOffene Finanzplanung",
  "estate.operationalPicture.actionsTitle": "\nOperative Bildaktionen",
  "estate.operationalPicture.actionsDescription":
    "\nWechseln Sie vom integrierten Kontrollbild zu den detaillierten Oberflächen, die Registrierungsnachweise, Arbeitsausführung und Executive Reporting umfassen.",
  "estate.operationalPicture.action.report": "\nBetriebspaket öffnen",
  "estate.operationalPicture.action.assets": "\nOffene Assets",
  "estate.operationalPicture.action.workOrders": "\nOffene Arbeitsaufträge",
  "fleet.title": "\nFlotte",
  "fleet.subtitle": "\nFahrzeughaltung, Auslastung und Wartungsdruck",
  "fleet.coverage":
    "\nBeginnen Sie mit dem aktuellen Fahrzeugbereich der Plattform und erweitern Sie dann die Bereiche Versand, Compliance und Telematik.",
  "fleet.view.overview": "\nÜbersicht",
  "fleet.view.operations": "\nOperationen",
  "fleet.view.initiatives": "\nInitiativen",
  "fleet.view.dependencies": "\nAbhängigkeiten",
  "fleet.kpi.vehicles": "\nFahrzeuge",
  "fleet.kpi.vehiclesDesc": "\nDerzeit als Fahrzeugflotte klassifizierte Vermögenswerte",
  "fleet.kpi.telemetry": "\nTelemetriegestützte Fahrzeuge",
  "fleet.kpi.telemetryDesc": "\nFahrzeuge melden bereits Betriebssignale",
  "fleet.kpi.tasks": "\nOffene Flottenaufgaben",
  "fleet.kpi.tasksDesc": "\nWartungsrückstand bei Fahrzeuganlagen",
  "fleet.kpi.operations": "\nFlottenkontrollen",
  "fleet.kpi.operationsDesc": "\nAufzeichnungen über dauerhaften Zustand, Unfälle und Austausch",
  "fleet.kpi.sites": "\nFlottenstandorte",
  "fleet.kpi.sitesDesc": "\nStandorte, die derzeit mindestens ein Fahrzeug-Asset",
  "fleet.summary.alertTitle":
    " hosten\nFlotten-Rollout kann bereits in Live-Betriebsdaten verankert werden",
  "fleet.summary.alertDescription":
    "Nutzen Sie Telemetrieabdeckung, aktive Arbeit und KI-Signale, um Versand, Compliance und Wartungserweiterung ohne separaten Flottenstapel durchzuführen.",
  "fleet.summary.tab.coverage": "\nAbdeckung",
  "fleet.summary.tab.maintenance": "\nWartungsdruck",
  "fleet.summary.tab.operations": "\nBetriebssteuerung",
  "fleet.summary.telemetryTitle": "\nFahrzeugtelemetriebereitschaft",
  "fleet.summary.telemetryDescription":
    "\nTelemetriegestützte Fahrzeuge bilden die aktuelle Grundlage für zuverlässige Versandabwicklung und einen auslastungsbewussten Flottenbetrieb.",
  "fleet.summary.telemetryConnected": "\nTelemetrievernetzte Fahrzeuge",
  "fleet.summary.telemetryConnectedDesc":
    "\n{total} Fahrzeuge befinden sich derzeit im aktiven Flottenbereich.",
  "fleet.summary.telemetryStale": "\nVeraltete Telemetriefahrzeuge",
  "fleet.summary.telemetryStaleDesc":
    "\n{coverage} der Flotte läuft derzeit mit veralteter Telemetrie.",
  "fleet.summary.postureTitle": "\nBereitschaftshaltung",
  "fleet.summary.postureDescription":
    "\nFördern Sie gemeinsam die Aktualität der Telemetrie, den KI-Signalkontext und die Aufgabenverfolgung, damit die Flotte zu einem betriebsbereiten System und nicht zu einer gefilterten Asset-Liste wird.",
  "fleet.summary.badgeTelemetry": "\nTelemetrie",
  "fleet.summary.badgeStaleness": "\nAbgestandenheit",
  "fleet.summary.badgeSignals": "\nKI-Signale",
  "fleet.summary.openTasksTitle": "\nOffene Wartungsaufgaben",
  "fleet.summary.openTasksDesc":
    "\nRückstand, geplante und laufende Arbeiten, die derzeit an Fahrzeuganlagen angebracht sind.",
  "fleet.summary.overdueTasksTitle": "\nÜberfällige Arbeit",
  "fleet.summary.overdueTasksDesc":
    "\nÜberfällige Fahrzeugaufgaben sind das deutlichste Signal für wartungsbedingten Ausfalldruck.",
  "fleet.summary.signalsTitle": "\nSignalgestützte Fahrzeuge",
  "fleet.summary.signalsDesc":
    "\nFahrzeuge mit aktiven KI-Vorhersagen können für den Versand, Austausch oder Eingriff priorisiert werden.",
  "fleet.summary.operationsTitle": "Betriebskontrollregister",
  "fleet.summary.operationsDescription":
    "\nErfassen Sie Aufzeichnungen über langlebigen Zustand, Unfälle, Wartung, Nutzung und Austausch im selben SSR-Flottenarbeitsbereich.",
  "fleet.summary.operationsCountLabel":
    "\n{count} Flottenvorgänge befinden sich im aktuellen Register.",
  "fleet.summary.accidentsTitle": "\nUnfallaufzeichnungen",
  "fleet.summary.accidentsDesc":
    "\nProtokollierte Flottenvorfälle bleiben jetzt als dauerhafte Betriebskontrollen statt als Ad-hoc-Notizen bestehen.",
  "fleet.summary.downtimeTitle": "\nAusfallzeit oder Austausch fällig",
  "fleet.summary.downtimeDesc":
    "\nHerabgesetzte oder ersatzfällige Datensätze zeigen, wo die Flottenverfügbarkeit bereits eingeschränkt ist.",
  "fleet.summary.replacementTitle": "\nErsatzplanung",
  "fleet.summary.replacementDesc":
    "\nErsatzpläne stehen jetzt neben der aktuellen Flottenstruktur, sodass sich der Lebenszyklusdruck auf die Finanzen und die Berichterstattung verlagern kann.",
  "fleet.initiativeForm.title": "\nErstellen Sie eine Flotteninitiative",
  "fleet.initiativeForm.description":
    "\nPlanen Sie den nächsten Flottenversand, die nächste Wartung, die Einhaltung von Vorschriften oder den Austausch direkt aus Live-Telemetrie und Arbeitshaltung.",
  "fleet.initiativeForm.badge": "\nDauerhafter Flottenfluss",
  "fleet.initiativeForm.nameLabel": "\nTitel der Initiative",
  "fleet.initiativeForm.namePlaceholder":
    "\nSprint zur Reduzierung der Ausfallzeiten von Transportern",
  "fleet.initiativeForm.nameHint":
    "Verwenden Sie einen Titel, der in Berichten und Bedienerübergaben erhalten bleiben kann.",
  "fleet.initiativeForm.scopeLabel": "\nFlottenumfang",
  "fleet.initiativeForm.scopePlaceholder":
    "\nKritische Transporter, Depot West oder Compliance-empfindliche Routen",
  "fleet.initiativeForm.scopeHint":
    "\nBenennen Sie die betroffene Routengruppe, Fahrzeugklasse, Depot oder Service-Slice.",
  "fleet.initiativeForm.categoryLabel": "\nKategorie",
  "fleet.initiativeForm.categoryHint":
    "\nKlassifizieren Sie die Initiative nach dem Hauptergebnis der Flotte.",
  "fleet.initiativeForm.category.DISPATCH": "\nVersand",
  "fleet.initiativeForm.category.UTILISATION": "\nAuslastung",
  "fleet.initiativeForm.category.MAINTENANCE": "\nWartung",
  "fleet.initiativeForm.category.COMPLIANCE": "\nCompliance",
  "fleet.initiativeForm.category.ENERGY": "\nEnergie",
  "fleet.initiativeForm.category.REPLACEMENT": "\nErsatz",
  "fleet.initiativeForm.priorityLabel": "\nPriorität",
  "fleet.initiativeForm.priorityHint":
    "\nPlatzieren Sie die Initiative im aktuellen Betriebshorizont.",
  "fleet.initiativeForm.priority.NOW": "\nJetzt",
  "fleet.initiativeForm.priority.NEXT": "\nWeiter",
  "fleet.initiativeForm.priority.LATER": "\nSpäter",
  "fleet.initiativeForm.priority.WATCH": "\nAnsehen",
  "fleet.initiativeForm.notesLabel": "\nHinweise und Annahmen",
  "fleet.initiativeForm.notesPlaceholder":
    "\nErfassen Sie Ausfalldruck, Compliance-Bedenken, Versandbeschränkungen oder Ersatzsignale hinter dieser Initiative.",
  "fleet.initiativeForm.notesHint":
    "\nNotieren Sie die Gründe, die bei der Versand- und Wartungsverfolgung berücksichtigt werden sollten.",
  "fleet.initiativeForm.requiredHint":
    "\nTitel, Flottenumfang, Kategorie und Priorität sind erforderlich.",
  "fleet.initiativeForm.submit": "\nInitiative zur Rettung der Flotte",
  "fleet.initiativeForm.submitAria": "\nInitiative zur Rettung der Flotte",
  "fleet.initiativeForm.recentTitle": "\nAktuelle Flotteninitiativen",
  "fleet.initiativeForm.recentDescription":
    "\nDiese Initiativen bleiben nun als dauerhafte Flottendatensätze bestehen, ohne den SSR-Arbeitsbereich zu verlassen.",
  "fleet.initiativeForm.empty": "\nNoch keine Flotteninitiativen erfasst.",
  "fleet.initiativeForm.emptyCta":
    "\nErstellen Sie Ihre erste Flotteninitiative, um betriebliche Verbesserungen zu verfolgen.",
  "fleet.initiativeForm.savedAt": "\nAktualisiert {updatedAt}",
  "fleet.initiativeForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "fleet.initiativeForm.validation.titleRequired": "\nDer Titel der Initiative ist erforderlich.",
  "fleet.initiativeForm.validation.scopeRequired": "\nFlottenumfang ist erforderlich.",
  "fleet.initiativeForm.validation.categoryRequired": "\nKategorie ist erforderlich.",
  "fleet.initiativeForm.validation.priorityRequired": "\nPriorität ist erforderlich.",
  "fleet.initiativeForm.feedback.saved":
    "\nFlotteninitiative im Flottenarbeitsbereich gespeichert.",
  "fleet.initiativeForm.feedback.saveFailed":
    "\nDie Flotteninitiative kann derzeit nicht fortgesetzt werden.",
  "fleet.operationsForm.title": "\nErfassen Sie einen Flottenbetriebsdatensatz",
  "fleet.operationsForm.description":
    "\nProtokollieren Sie Fahrzeugzustand, Unfälle, Wartungsaktivitäten, Nutzungsüberprüfungen und Ersatzplanung direkt im Live-Flottenarbeitsbereich.",
  "fleet.operationsForm.badge": "\nDauerhafte Betriebskontrolle",
  "fleet.operationsForm.nameLabel": "\nAufnahmetitel",
  "fleet.operationsForm.namePlaceholder": "\nÜberprüfung der Austauschbereitschaft für Fahrzeug 12",
  "fleet.operationsForm.nameHint":
    "\nVerwenden Sie einen Titel, der in Berichten, Übergaben und Finanzgesprächen dennoch Sinn macht.",
  "fleet.operationsForm.assetLabel": "\nVerknüpftes Flotten-Asset",
  "fleet.operationsForm.assetPlaceholder": "\nWählen Sie ein Flotten-Asset aus",
  "fleet.operationsForm.assetHint":
    "\nVerknüpfen Sie den Datensatz mit dem Fahrzeugvermögenswert, der das Betriebsauswirkungs- oder Überprüfungssignal trägt.",
  "fleet.operationsForm.assetOption": "Anlage: {name} – {siteName}",
  "fleet.operationsForm.recordTypeLabel": "\nDatensatztyp",
  "fleet.operationsForm.recordTypeHint":
    "\nWählen Sie die Betriebskontrolle aus, die dieser Datensatz dem Flottenregister hinzufügt.",
  "fleet.operationsForm.recordType.CONDITION_CHECK": "\nZustandsprüfung",
  "fleet.operationsForm.recordType.ACCIDENT_RECORD": "\nUnfallaufzeichnung",
  "fleet.operationsForm.recordType.MAINTENANCE_ACTIVITY": "\nWartungsaktivität",
  "fleet.operationsForm.recordType.UTILISATION_REVIEW": "\nNutzungsüberprüfung",
  "fleet.operationsForm.recordType.REPLACEMENT_PLAN": "\nErsatzplan",
  "fleet.operationsForm.statusLabel": "\nWorkflow-Status",
  "fleet.operationsForm.statusHint":
    "\nVerwenden Sie den Workflow-Status, um anzugeben, ob das Steuerelement aktiv, überwacht oder geschlossen ist.",
  "fleet.operationsForm.status.DRAFT": "\nEntwurf",
  "fleet.operationsForm.status.ACTIVE": "\nAktiv",
  "fleet.operationsForm.status.WATCH": "\nAnsehen",
  "fleet.operationsForm.status.CLOSED": "\nGeschlossen",
  "fleet.operationsForm.conditionStatusLabel": "\nZustand Haltung",
  "fleet.operationsForm.conditionStatusHint":
    "Erfassen Sie den Betriebszustand der verknüpften Flottenanlage.",
  "fleet.operationsForm.conditionStatus.OPERATIONAL": "\nBetriebsbereit",
  "fleet.operationsForm.conditionStatus.WATCH": "\nAnsehen",
  "fleet.operationsForm.conditionStatus.DOWN": "\nDown",
  "fleet.operationsForm.conditionStatus.REPLACEMENT_DUE": "\nErsatz fällig",
  "fleet.operationsForm.metricValueLabel": "\nMesswert",
  "fleet.operationsForm.metricValuePlaceholder": "z. B. 78",
  "fleet.operationsForm.metricValueHint":
    "\nVerwenden Sie dies für Auslastungswerte, Ausgabezahlen oder andere gemessene Flottensignale.",
  "fleet.operationsForm.metricUnitLabel": "\nMetrische Einheit",
  "fleet.operationsForm.metricUnitPlaceholder": "\nProzent, Stunden oder Fahrten",
  "fleet.operationsForm.metricUnitHint":
    "\nFügen Sie bei jeder Aufzeichnung eines Messwerts eine Einheit hinzu, damit Berichte interpretierbar bleiben.",
  "fleet.operationsForm.incidentDateLabel": "\nDatum des Vorfalls",
  "fleet.operationsForm.incidentDateHint":
    "\nUnfallaufzeichnungen erfordern das Kalenderdatum des Vorfalls.",
  "fleet.operationsForm.targetDateLabel": "\nZieldatum",
  "fleet.operationsForm.targetDateHint":
    "\nErsatzpläne sollten das nächste Zielüberprüfungs- oder Aktionsdatum enthalten.",
  "fleet.operationsForm.notesLabel": "\nHinweise und betrieblicher Kontext",
  "fleet.operationsForm.notesPlaceholder":
    "\nErfassen Sie die Auswirkungen von Ausfallzeiten, Nutzungsergebnisse, Korrekturmaßnahmen oder Lebenszyklusannahmen hinter diesem Datensatz.",
  "fleet.operationsForm.notesHint":
    "\nDiese Notizen sollten in Berichte, Wartungsmaßnahmen und Ersatzplanung einfließen.",
  "fleet.operationsForm.requiredHint":
    "\nTitel, verknüpftes Flotten-Asset, Datensatztyp, Workflow-Status, Zustandsstatus und Notizen sind erforderlich.",
  "fleet.operationsForm.submit": "\nFlottenbetriebsdatensatz speichern",
  "fleet.operationsForm.submitAria": "\nFlottenbetriebsdatensatz speichern",
  "fleet.operationsForm.recentTitle": "\nAktuelle Aufzeichnungen zum Flottenbetrieb",
  "fleet.operationsForm.recentDescription":
    "\nDas Flottenregister speichert nun Betriebskontrolldatensätze direkt im SSR-Arbeitsbereich.",
  "fleet.operationsForm.empty": "\nEs wurden noch keine Aufzeichnungen zum Flottenbetrieb erfasst.",
  "fleet.operationsForm.emptyCta":
    "\nErfassen Sie einen Flottenbetriebsdatensatz, um mit dem Aufbau des Kontrollregisters zu beginnen.",
  "fleet.operationsForm.emptyVehiclesTitle":
    "\nNoch sind keine Flottenanlagen für die Betriebskontrolle bereit",
  "fleet.operationsForm.emptyVehiclesDescription":
    "\nErstellen oder klassifizieren Sie zunächst Fahrzeuganlagen, damit Flottenzustands- und Austauschaufzeichnungen mit realen Anlagen verknüpft werden können.",
  "fleet.operationsForm.savedAt": "\nAktualisiert {updatedAt}",
  "fleet.operationsForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "fleet.operationsForm.signal.asset": "\nAsset",
  "fleet.operationsForm.signal.metric": "\nGemessenes Signal",
  "fleet.operationsForm.signal.incidentDate": "\nDatum des Vorfalls",
  "fleet.operationsForm.signal.targetDate": "\nZieldatum",
  "fleet.operationsForm.validation.titleRequired": "\nDatensatztitel ist erforderlich.",
  "fleet.operationsForm.validation.assetRequired":
    "\nEs ist ein verknüpftes Flotten-Asset erforderlich.",
  "fleet.operationsForm.validation.recordTypeRequired": "\nDatensatztyp ist erforderlich.",
  "fleet.operationsForm.validation.statusRequired": "\nDer Workflow-Status ist erforderlich.",
  "fleet.operationsForm.validation.conditionStatusRequired":
    "\nKonditionshaltung ist erforderlich.",
  "fleet.operationsForm.validation.notesRequired": "\nBetriebshinweise sind erforderlich.",
  "fleet.operationsForm.validation.metricValueInvalid":
    "\nDer gemessene Wert muss eine gültige Zahl sein, die größer oder gleich Null ist.",
  "fleet.operationsForm.validation.metricValueRequired":
    "\nFür Nutzungsüberprüfungen ist ein Messwert erforderlich.",
  "fleet.operationsForm.validation.metricUnitRequired":
    "\nBei der Messwerterfassung ist die metrische Einheit erforderlich.",
  "fleet.operationsForm.validation.incidentDateInvalid":
    "\nDas Vorfalldatum muss ein gültiger Kalenderwert sein.",
  "fleet.operationsForm.validation.incidentDateRequired":
    "\nUnfallaufzeichnungen erfordern ein Vorfalldatum.",
  "fleet.operationsForm.validation.targetDateInvalid":
    "\nDas Zieldatum muss ein gültiger Kalenderwert sein.",
  "fleet.operationsForm.validation.targetDateRequired": "\nErsatzpläne erfordern ein Zieldatum.",
  "fleet.operationsForm.validation.assetNotFound":
    "\nDas verknüpfte Flotten-Asset konnte nicht gefunden werden.",
  "fleet.operationsForm.feedback.saved":
    "\nFlottenbetriebsdatensatz im Flottenarbeitsbereich gespeichert.",
  "fleet.operationsForm.feedback.saveFailed":
    "Der Flottenbetriebsdatensatz kann derzeit nicht beibehalten werden.",
  "fleet.readiness.vehicles":
    "\nFahrzeugklassifizierte Vermögenswerte bieten bereits eine erste Flottenbasislinie.",
  "fleet.readiness.telemetry":
    "\nTelemetriegestützte Fahrzeuge können Versand- und Compliance-Rollouts verankern.",
  "fleet.readiness.tasks": "\nBestehende Wartungsabläufe beinhalten bereits Flottenarbeit.",
  "fleet.page.eyebrow": "\nEinsatzfähiges Flottencockpit",
  "fleet.page.readinessRailDescription":
    "\nVerwenden Sie diese Schiene, um zu entscheiden, wo Servicerisiken, Wartungsdruck und Ersatz-Governance Aufmerksamkeit erfordern, bevor Sie mit Warteschlangen-, Finanz- oder Berichtsworkflows fortfahren.",
  "fleet.page.readinessRail.vehicleSignal":
    "\nFahrzeugverfügbarkeit und Telemetrieabdeckung bleiben die Grundlage für die Flottensicherheit.",
  "fleet.page.readinessRail.maintenanceSignal":
    "\nAusfallzeiten, Unfallverfolgung und überfällige Aufgaben bestimmen den unmittelbaren Betriebsdruck.",
  "fleet.page.readinessRail.replacementSignal":
    "\nErsatzkandidaten und alternde Flotten sollten vor Serviceausfallfenstern in die Finanzplanung einsteigen.",
  "fleet.page.commandTitle": "\nHaltung des Flottenkommandos",
  "fleet.page.commandDescription":
    "\nKombinieren Sie Fahrzeugverfügbarkeit, Wartungsverfolgung, Störungskontrolle und Austauschdruck in einem für den Bediener sichtbaren Flottenbild.",
  "fleet.page.launchpadsTitle": "\nFlottenentscheidungs-Launchpads",
  "fleet.page.launchpadsDescription":
    "\nGehen Sie von betrieblicher Telemetrie und Serviceunterbrechung zu geregelten Maßnahmen für Nutzung, Wartung, Austausch und Berichterstellung über.",
  "fleet.page.launchpadsBadge": "\nUnternehmensworkflow",
  "fleet.page.launchpadsBriefTitle":
    "\nDie Flotte verhält sich jetzt wie ein verwaltetes Betriebsportfolio",
  "fleet.page.launchpadsBriefDescription":
    "\nDas Cockpit kann Depot-, Routen-, Compliance- und Ersatzentscheidungen unterstützen, ohne das Flottenkontrollflugzeug zu verlassen.",
  "fleet.page.launchpadsLane.maintenanceTitle": "\nWartungskontrolle",
  "fleet.page.launchpadsLane.maintenanceHeadline":
    "\nVerwenden Sie dauerhafte Aufzeichnungen und aktive Arbeitswarteschlangen, um zu verhindern, dass Ausfallzeiten zu Serviceverlusten führen.",
  "fleet.page.launchpadsLane.maintenanceDescription":
    "\nKoppeln Sie Vorfallaufzeichnungen, Zustandsstatus und offene Arbeiten mit der Wartungswarteschlange und den operativen Lieferpaketen.",
  "fleet.page.launchpadsLane.utilisationTitle": "\nAuslastungsdruck",
  "fleet.page.launchpadsLane.utilisationHeadline":
    "\nErklären Sie Spitzen bei der Fahrzeugnachfrage mit Live-Telemetrie- und Servicerückstandssignalen.",
  "fleet.page.launchpadsLane.utilisationDescription":
    "\nLeiten Sie den Auslastungsdruck in das Auslastungscockpit, bevor unterausgelastete oder überlastete Flotten die Planung verzerren.",
  "fleet.page.launchpadsLane.replacementTitle": "\nErsatz-Governance",
  "fleet.page.launchpadsLane.replacementHeadline":
    "Berücksichtigen Sie veraltete Fahrzeuge in der Investitionsplanung, während die Servicekontinuität noch kontrollierbar ist.",
  "fleet.page.launchpadsLane.replacementDescription":
    "\nNutzen Sie Austauschpläne, Ausfallmuster und Kapitalgespräche gemeinsam statt isolierter Registerzeilen.",
  "fleet.page.launchpadsLane.assuranceTitle": "\nPrüfung und Berichterstattung",
  "fleet.page.launchpadsLane.assuranceHeadline":
    "\nPaketieren Sie Fahrzeugstatus, Rückstand und Bereitschaft für Betreiber, Finanzleiter und Governance-Überprüfungen.",
  "fleet.page.launchpadsLane.assuranceDescription":
    "\nHalten Sie Berichtspakete und Finanzgespräche an denselben Live-Kontrollen ausgerichtet, die auch das operative Team verwendet.",
  "fleet.action.utilisation":
    "\nNutzen Sie die Auslastungslage, um Nachfragespitzen und ungenutzte Kapazitäten zu erkennen.",
  "fleet.action.tasks":
    "\nGehen Sie direkt in die Arbeitswarteschlange, um Fahrzeugausfallzeiten zu beseitigen.",
  "fleet.action.reports":
    "\nFassen Sie die Flottensituation für Betreiber und Finanzakteure zusammen.",
  "fleet.action.sensors":
    "\nÜberprüfen Sie die Live-Telemetrieabdeckung und prüfen Sie veraltete Geräte, die das Flottenvertrauen beeinträchtigen.",
  "fleet.action.buildings":
    "\nKoordinieren Sie den Kontext von Depots, Werften und Einrichtungen mit der Flottennachfrage.",
  "fleet.action.addVehicle": "\nNeues Fahrzeug als Asset in der Flotte registrieren.",
  "buildings.title": "\nGebäude",
  "buildings.subtitle": "\nAnlagenstatus, Doppelabdeckung und betrieblicher Fußabdruck",
  "buildings.coverage":
    "\nBauen Sie das Facility Management auf der Grundlage aktueller Standorte, Nicht-Fahrzeug-Assets, digitaler Zwillinge und angeschlossener Geräte auf.",
  "buildings.view.overview": "\nÜbersicht",
  "buildings.view.initiatives": "\nInitiativen",
  "buildings.view.performance": "\nLeistung",
  "buildings.view.dependencies": "\nAbhängigkeiten",
  "buildings.kpi.facilities": "\nAusstattung",
  "buildings.kpi.facilitiesDesc": "\nDerzeit als Einrichtungen gekennzeichnete Standorte",
  "buildings.kpi.assets": "\nAnlagenvermögen",
  "buildings.kpi.assetsDesc":
    "\nNicht-Fahrzeugvermögenswerte, die sich derzeit in Anlagenbetrieb befinden",
  "buildings.kpi.twins": "\nDigitale Zwillinge",
  "buildings.kpi.twinsDesc": "\nZwillingsmodelle bereits an den Kombi angebaut",
  "buildings.kpi.devices": "\nAngeschlossene Geräte",
  "buildings.kpi.devicesDesc":
    "\nIoT-Geräte sind bereits für den Rollout von Einrichtungen verfügbar",
  "buildings.summary.alertTitle":
    "\nDie Einführung von Einrichtungen kann bereits auf Live-Anwesenheitsdaten basieren",
  "buildings.summary.alertDescription":
    "\nVerwenden Sie Planungsprofile, digitale Zwillinge und angeschlossene Geräte, um die Gebäudehierarchie und den Betriebs-Rollout zu inszenieren, ohne einen parallelen Anlagenstapel zu erstellen.",
  "buildings.summary.tab.facility": "\nAnlagenhaltung",
  "buildings.summary.tab.operations": "\nBetriebsabdeckung",
  "buildings.summary.planningTitle": "\nPlanungs- und Hierarchiebereitschaft",
  "buildings.summary.planningDescription":
    "\nStandortplanungsprofile sind der aktuelle Anker für Fläche, Flottenkapazität und Betriebsstundenkontext.",
  "buildings.summary.planningProfiles": "\nPlanungsprofile",
  "buildings.summary.planningProfilesDesc":
    "\n{total} Einrichtungen sind derzeit im Geltungsbereich.",
  "buildings.summary.facilityAssets": "\nAnlagenvermögen",
  "buildings.summary.facilityAssetsDesc":
    "\nNicht-Fahrzeug-Assets sind die aktuelle Basisebene für Systeme, Komponenten und den Rollout auf Raumebene.",
  "buildings.summary.postureTitle": "\nBereitschaftshaltung",
  "buildings.summary.postureDescription":
    "Fördern Sie den Planungskontext, räumliche Zwillinge und angeschlossene Geräte gemeinsam, sodass Gebäude zu einer betrieblichen Hierarchie statt zu einer flachen Standortliste werden.",
  "buildings.summary.badgePlanning": "\nPlanung",
  "buildings.summary.badgeTwin": "\nTwin-linked",
  "buildings.summary.badgeSensors": "\nSensorbereit",
  "buildings.summary.twinLinkedTitle": "\nZwillingsverbundanlagen",
  "buildings.summary.twinLinkedDesc":
    "\nAnlagen mit mindestens einem bereits angeschlossenen digitalen Zwilling für räumliche Arbeitsabläufe.",
  "buildings.summary.sensorReadyTitle": "\nSensorfähige Einrichtungen",
  "buildings.summary.sensorReadyDesc":
    "\nEinrichtungen mit angeschlossenen IoT-Geräten können die Erweiterung der Raum-, Zonen- und Systemtelemetrie unterstützen.",
  "buildings.initiativeForm.title": "\nErstellen Sie eine Einrichtungsinitiative",
  "buildings.initiativeForm.description":
    "\nBereiten Sie den nächsten Anlagen-Rollout oder das Sanierungspaket direkt aus der Live-Planung, der Zwillings- und Sensorabdeckung vor.",
  "buildings.initiativeForm.badge": "\nLanglebiger Anlagenfluss",
  "buildings.initiativeForm.nameLabel": "\nTitel der Initiative",
  "buildings.initiativeForm.namePlaceholder": "\nHVAC-Wiederinbetriebnahme für belegte Etagen",
  "buildings.initiativeForm.nameHint":
    "\nVerwenden Sie einen Titel, der in Berichte und Folgearbeiten einfließen kann.",
  "buildings.initiativeForm.scopeLabel": "\nEinrichtungsbereich",
  "buildings.initiativeForm.scopePlaceholder":
    "\nHauptsitz Nord, Campus West oder Cluster kritischer Einrichtungen",
  "buildings.initiativeForm.scopeHint":
    "\nBenennen Sie die betroffene Einrichtungsgruppe, den Campusbereich oder den betroffenen Betriebsbereich.",
  "buildings.initiativeForm.categoryLabel": "\nKategorie",
  "buildings.initiativeForm.categoryHint":
    "\nKlassifizieren Sie die Initiative nach dem Hauptergebnis der Einrichtungen.",
  "buildings.initiativeForm.category.SPACE": "\nLeerzeichen",
  "buildings.initiativeForm.category.SYSTEM": "\nSystem",
  "buildings.initiativeForm.category.ENERGY": "\nEnergie",
  "buildings.initiativeForm.category.COMPLIANCE": "\nCompliance",
  "buildings.initiativeForm.phaseLabel": "\nPhase",
  "buildings.initiativeForm.phaseHint":
    "\nPlatzieren Sie die Initiative im aktuellen Rollout-Horizont.",
  "buildings.initiativeForm.phase.NOW": "\nJetzt",
  "buildings.initiativeForm.phase.NEXT": "\nWeiter",
  "buildings.initiativeForm.phase.LATER": "\nSpäter",
  "buildings.initiativeForm.notesLabel": "\nHinweise und Annahmen",
  "buildings.initiativeForm.notesPlaceholder":
    "\nErfassen Sie den betrieblichen Druck, den räumlichen Kontext, die Compliance-Anforderungen oder das Energieziel hinter dieser Initiative.",
  "buildings.initiativeForm.notesHint":
    "\nNotieren Sie die Begründung, die in die Überprüfung der Einrichtungen und die Übergabe von Führungskräften einfließen soll.",
  "buildings.initiativeForm.requiredHint":
    "\nTitel, Einrichtungsumfang, Kategorie und Phase sind erforderlich.",
  "buildings.initiativeForm.submit": "\nInitiative zur Rettung von Einrichtungen",
  "buildings.initiativeForm.submitAria": "\nBausparinitiative",
  "buildings.initiativeForm.recentTitle": "\nAktuelle Initiativen für Einrichtungen",
  "buildings.initiativeForm.recentDescription":
    "\nDiese Initiativen bleiben nun als dauerhafte Einrichtungsdatensätze bestehen, ohne den SSR-Arbeitsbereich zu verlassen.",
  "buildings.initiativeForm.recentCountLabel":
    "\n{count} Initiativen prägen aktuell das Gebäuderegister.",
  "buildings.initiativeForm.empty": "\nNoch keine Einrichtungsinitiativen erfasst.",
  "buildings.initiativeForm.emptyCta":
    "\nErstellen Sie Ihre erste Einrichtungsinitiative, um mit der Verfolgung von Gebäudeverbesserungen zu beginnen.",
  "buildings.initiativeForm.savedAt": "\nAktualisiert {updatedAt}",
  "buildings.initiativeForm.notesEmpty": "\nNoch keine Notizen erfasst.",
  "buildings.initiativeForm.validation.titleRequired":
    "\nDer Titel der Initiative ist erforderlich.",
  "buildings.initiativeForm.validation.scopeRequired":
    "\nDer Umfang der Einrichtung ist erforderlich.",
  "buildings.initiativeForm.validation.categoryRequired": "\nKategorie ist erforderlich.",
  "buildings.initiativeForm.validation.phaseRequired": "\nPhase ist erforderlich.",
  "buildings.initiativeForm.feedback.saved":
    "\nDie Initiative „Einrichtungen“ wurde im Arbeitsbereich „Gebäude“ gespeichert.",
  "buildings.initiativeForm.feedback.saveFailed":
    "\nDie Einrichtungsinitiative kann derzeit nicht fortgesetzt werden.",
  "buildings.readiness.facilities":
    "\nStandort- und Anlagenstatus bilden bereits die erste Ebene der Gebäudehierarchie.",
  "buildings.readiness.twins":
    "Die digitale Zwillingsabdeckung kann Raum-, Zonen- und Systemworkflows verankern.",
  "buildings.readiness.devices":
    "\nAngeschlossene Geräte können in Telemetrieansichten der Einrichtungen hochgestuft werden.",
  "buildings.page.eyebrow": "\nAnlagensteuerungsebene",
  "buildings.page.readinessRailDescription":
    "\nNutzen Sie diese Schiene, um die Verwaltung von Einrichtungen, die Doppelabdeckung und die Compliance-Bereitschaft zu beurteilen, bevor Sie mit Berichten, Telemetrie oder Kapitalplanung beginnen.",
  "buildings.page.readinessRail.facilitySignal":
    "\nDie Hierarchie der Einrichtungen und die Haltung der Initiative definieren die aktuelle Betriebsbasis des Gebäudes.",
  "buildings.page.readinessRail.twinSignal":
    "\nDoppelt verbundene Einrichtungen sind der beste Anker für Raum, System und Interventionskontext.",
  "buildings.page.readinessRail.complianceSignal":
    "\nSensorbereite und prüfungsgesteuerte Einrichtungen zeigen, wo Sicherheitsnachweise heute vertrauenswürdig sind.",
  "buildings.page.commandTitle": "\nEinrichtungen befehlen Haltung",
  "buildings.page.commandDescription":
    "\nKombinieren Sie Anlagenhierarchie, Zwillingsverknüpfung, Telemetriebereitschaft und Verbesserungsmaßnahmendruck in einer einzigen Unternehmensanlagenansicht.",
  "buildings.page.launchpadsTitle": "\nLaunchpads für Anlagenentscheidungen",
  "buildings.page.launchpadsDescription":
    "\nÜbertragen Sie die Gebäudelage in räumliche Abläufe, Compliance-Sicherung und Kapitalgespräche, ohne einen separaten Planungsstapel zu erstellen.",
  "buildings.page.launchpadsBadge": "\nUnternehmensworkflow",
  "buildings.page.launchpadsBriefTitle":
    "\nGebäude lesen sich jetzt als verwaltetes Anlagenportfolio",
  "buildings.page.launchpadsBriefDescription":
    "\nDer Arbeitsbereich kann die Verwaltung von Einrichtungen, die Verfolgung digitaler Zwillinge und die Kapitaleskalation von einer einzigen Betriebsoberfläche aus unterstützen.",
  "buildings.page.launchpadsLane.governanceTitle": "\nFacility Governance",
  "buildings.page.launchpadsLane.governanceHeadline":
    "\nSorgen Sie dafür, dass die Initiativen Ihrer Einrichtung an die Hierarchie der Wohnanlagen und das Bild des Betriebsrisikos gebunden sind.",
  "buildings.page.launchpadsLane.governanceDescription":
    "\nNutzen Sie das Initiativregister als dauerhafte Kontrolloberfläche für System-, Raum-, Energie- und Compliance-Arbeiten.",
  "buildings.page.launchpadsLane.twinTitle": "\nZwilling und Telemetrie",
  "buildings.page.launchpadsLane.twinHeadline":
    "\nFördern Sie doppelt verbundene und sensorbereite Einrichtungen als räumliche Beweise, bevor Sie größere Eingriffe vornehmen.",
  "buildings.page.launchpadsLane.twinDescription":
    "\nVergleichen Sie die Haltung der Einrichtungen anhand digitaler Zwillinge und Sensoroberflächen, anstatt die Planung nur anhand von narrativen Notizen durchzuführen.",
  "buildings.page.launchpadsLane.complianceTitle": "\nCompliance-Sicherung",
  "buildings.page.launchpadsLane.complianceHeadline":
    "\nNutzen Sie die Gebäudehaltung, um Inspektionen, gesetzliche Nachweise und Sicherungsberichte durchzuführen.",
  "buildings.page.launchpadsLane.complianceDescription":
    "Die gleiche Steuerungsebene der Einrichtungen unterstützt jetzt die betriebliche Nachverfolgung und prüfungsbereite Berichterstattung.",
  "buildings.page.launchpadsLane.capitalTitle": "\nKapitalkoordination",
  "buildings.page.launchpadsLane.capitalHeadline":
    "\nEskalieren Sie Gebäuderisiken, Verbesserungsdruck und Lebenszyklusarbeiten früher in Finanz- und Programmpakete.",
  "buildings.page.launchpadsLane.capitalDescription":
    "\nWechseln Sie vom Anlagenstatus zu Bereitschafts-, FM-Governance- und Betriebspaketen für den Standort, ohne die Datengeschichte neu erstellen zu müssen.",
  "buildings.action.twin":
    "\nÖffnen Sie die vorhandene digitale Zwillingsoberfläche für den Kontext räumlicher Operationen.",
  "buildings.action.assets":
    "\nInspizieren Sie den Nichtfahrzeugbereich, der den Baubetrieb unterstützt.",
  "buildings.action.reports":
    "\nLeistung von Paketeinrichtungen für Compliance und Überprüfung durch die Geschäftsleitung.",
  "buildings.action.sensors":
    "\nVerfolgen Sie Gebäudeprobleme in Live-Telemetrie und Geräteabdeckung.",
  "buildings.action.fleet":
    "\nKoordinieren Sie mobile Anlagen, Depots und Feldlogistik mit Gebäuden.",
  "buildings.action.add": "\nNeues Gebäude oder Anlage registrieren.",
  "sensors.title": "\nSensoren",
  "sensors.subtitle": "\nTelemetrieabdeckung, Gerätestatus und Signalbereitschaft",
  "sensors.coverage": "Asset-Telemetrie-Abdeckung",
  "sensors.view.overview": "\nÜbersicht",
  "sensors.view.alertRules": "\nWarnungsregeln",
  "sensors.view.quality": "\nQualität",
  "sensors.view.dependencies": "\nAbhängigkeiten",
  "sensors.kpi.devices": "\nRegistrierte Geräte",
  "sensors.kpi.devicesDesc": "\nDerzeit in der Steuerungsebene registrierte Geräte",
  "sensors.kpi.telemetry": "\nTelemetriepunkte",
  "sensors.kpi.telemetryDesc": "\nRohe Telemetrieproben bereits gespeichert",
  "sensors.kpi.coverage": "\nAssets mit Telemetrie",
  "sensors.kpi.coverageDesc": "\nBestimmte Anlagen empfangen bereits Telemetrie",
  "sensors.kpi.unseen": "\nNie gesehene Geräte",
  "sensors.kpi.unseenDesc": "\nRegistrierte Geräte, die noch nicht gemeldet wurden",
  "sensors.summary.alertTitle": "\nDie Sensorsemantik steht zur Operationalisierung bereit",
  "sensors.summary.alertDescription":
    "\nVerfolgen Sie die Vervollständigung der Gerätemetadaten und das semantische Telemetrie-Tagging, bevor Sie es auf Protokolladapter erweitern und Warnungen auslösen.",
  "sensors.summary.tab.device": "\nGerätehaltung",
  "sensors.summary.tab.semantic": "\nSemantische Telemetrie",
  "sensors.summary.metadataTitle": "\nGerätemetadaten-Bereitschaft",
  "sensors.summary.metadataDescription":
    "\nZählen Sie Geräte mit ausreichend identifizierenden Details, um Betriebs-, Kalibrierungs- und Inbetriebnahme-Workflows zu unterstützen.",
  "sensors.summary.metadataReady": "\nMetadatenfähige Geräte",
  "sensors.summary.metadataReadyDesc":
    "\n{count} insgesamt registrierte Geräte in der Steuerungsebene.",
  "sensors.summary.commissioned": "\nIn Betrieb genommene Geräte",
  "sensors.summary.commissionedDesc":
    "\n{coverage} der registrierten Geräte enthalten ein Inbetriebnahmedatum.",
  "sensors.summary.postureTitle": "\nBereitschaftshaltung",
  "sensors.summary.postureDescription":
    "\nBewerben Sie Hersteller-, Modell-, Firmware-, Installationsort- und Inbetriebnahmedaten, bevor Sie die Registrierung als dauerhaften Sensorbestand behandeln.",
  "sensors.summary.badgeMetadata": "\nMetadaten",
  "sensors.summary.badgeInstall": "context",
  "sensors.summary.badgeCommissioning": " installieren\nInbetriebnahme",
  "sensors.summary.seriesKeyTitle": "\nSerienschlüssel",
  "sensors.summary.seriesKeyDesc": "\n{total} Telemetrieproben sind derzeit gespeichert.",
  "sensors.summary.unitTitle": "\nAngeschlossene Einheiten",
  "sensors.summary.unitDesc":
    "\nEinheiten sind der minimale semantische Vertrag für vergleichbare Telemetrie.",
  "sensors.summary.qualityTitle": "\nQualität getagged",
  "sensors.summary.qualityDesc":
    "\nQualitätskennzeichen ermöglichen es nachgelagerten Arbeitsabläufen, vertrauenswürdige und geschätzte Daten zu unterscheiden.",
  "sensors.alertRuleForm.title": "\nErstellen Sie eine Benachrichtigungsregel",
  "sensors.alertRuleForm.description":
    "\nErstellen Sie schwellenwertbasierte Alarme direkt aus der Live-Telemetriebereitschaft innerhalb des dauerhaften Sensorsteuerungsebenenflusses.",
  "sensors.alertRuleForm.badge": "\nDauerhafte Regel",
  "sensors.alertRuleForm.nameLabel": "\nRegeltitel",
  "sensors.alertRuleForm.namePlaceholder": "\nHoher CO2-Ausstoß in bewohnten Räumen",
  "sensors.alertRuleForm.nameHint":
    "\nVerwenden Sie einen Titel, den Bediener in Berichten und beim Aufbau von Folgemaßnahmen wiederverwenden können.",
  "sensors.alertRuleForm.seriesKeyLabel": "\nSerienschlüssel",
  "sensors.alertRuleForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertRuleForm.seriesKeyHint":
    "\nPassen Sie den semantischen Telemetrieschlüssel an, der ausgewertet werden soll.",
  "sensors.alertRuleForm.comparatorLabel": "\nKomparator",
  "sensors.alertRuleForm.comparatorHint":
    "\nWählen Sie aus, wie der Live-Messwert mit dem Schwellenwert verglichen werden soll.",
  "sensors.alertRuleForm.comparator.GT": "Größer",
  "sensors.alertRuleForm.comparator.LT": "Kleiner",
  "sensors.alertRuleForm.comparator.EQ": "Gleich",
  "sensors.alertRuleForm.thresholdLabel": "\nSchwelle",
  "sensors.alertRuleForm.thresholdPlaceholder": "z. B. 1200",
  "sensors.alertRuleForm.thresholdHint":
    "\nVerwenden Sie den numerischen Grenzwert, der die Regel auslösen soll.",
  "sensors.alertRuleForm.severityLabel": "\nSchweregrad",
  "sensors.alertRuleForm.severityHint":
    "\nLegen Sie die für den Bediener sichtbare Dringlichkeit für die Regel fest.",
  "sensors.alertRuleForm.severity.INFO": "\nInfo",
  "sensors.alertRuleForm.severity.WARNING": "\nWarnung",
  "sensors.alertRuleForm.severity.CRITICAL": "\nKritisch",
  "sensors.alertRuleForm.requiredHint":
    "\nTitel, Serienschlüssel, Komparator, Schwellenwert und Schweregrad sind erforderlich.",
  "sensors.alertRuleForm.submit": "\nWarnungsregel speichern",
  "sensors.alertRuleForm.submitAria": "\nSensoralarmregel speichern",
  "sensors.alertRules.feedback.saved":
    "\nSensoralarmregel im Arbeitsbereich „Sensoren“ gespeichert.",
  "sensors.alertForm.title": "\nErstellen Sie eine Benachrichtigungsregel",
  "sensors.alertForm.description":
    "\nErstellen Sie schwellenwertbasierte Alarme direkt aus der Live-Telemetriebereitschaft innerhalb des dauerhaften Workflows der Sensorsteuerungsebene.",
  "sensors.alertForm.badge": "\nDauerhafte Regel",
  "sensors.alertForm.nameLabel": "\nRegeltitel",
  "sensors.alertForm.namePlaceholder": "\nHoher CO2-Ausstoß in bewohnten Räumen",
  "sensors.alertForm.nameHint":
    "\nVerwenden Sie einen Titel, den Bediener in Berichten und beim Aufbau von Folgemaßnahmen wiederverwenden können.",
  "sensors.alertForm.seriesKeyLabel": "\nSerienschlüssel",
  "sensors.alertForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertForm.seriesKeyHint":
    "\nPassen Sie den semantischen Telemetrieschlüssel an, der ausgewertet werden soll.",
  "sensors.alertForm.comparatorLabel": "\nKomparator",
  "sensors.alertForm.comparatorHint":
    "\nWählen Sie aus, wie der Live-Messwert mit dem Schwellenwert verglichen werden soll.",
  "sensors.alertForm.comparator.GT": "Größer",
  "sensors.alertForm.comparator.LT": "Kleiner",
  "sensors.alertForm.comparator.EQ": "Gleich",
  "sensors.alertForm.thresholdLabel": "\nSchwelle",
  "sensors.alertForm.thresholdPlaceholder": "z. B. 1200",
  "sensors.alertForm.thresholdHint":
    "\nVerwenden Sie den numerischen Grenzwert, der die Regel auslösen soll.",
  "sensors.alertForm.severityLabel": "\nSchweregrad",
  "sensors.alertForm.severityHint":
    "\nLegen Sie die für den Bediener sichtbare Dringlichkeit für die Regel fest.",
  "sensors.alertForm.severity.INFO": "\nInfo",
  "sensors.alertForm.severity.WARNING": "\nWarnung",
  "sensors.alertForm.severity.CRITICAL": "\nKritisch",
  "sensors.alertForm.requiredHint":
    "\nTitel, Serienschlüssel, Komparator, Schwellenwert und Schweregrad sind erforderlich.",
  "sensors.alertForm.submit": "\nWarnungsregel speichern",
  "sensors.alertForm.submitAria": "\nSensoralarmregel speichern",
  "sensors.alertForm.recentTitle": "\nAktuelle Alarmregeln",
  "sensors.alertForm.recentDescription":
    "\nAlarmregeln bleiben jetzt direkt im Modell der dauerhaften Sensorsteuerungsebene bestehen.",
  "sensors.alertForm.empty": "\nEs wurden noch keine Sensoralarmregeln erfasst.",
  "sensors.alertForm.emptyCta":
    "\nErstellen Sie Ihre erste Alarmregel, um mit der Überwachung der Sensortelemetrie zu beginnen.",
  "sensors.alertForm.savedAt": "\nAktualisiert {updatedAt}",
  "sensors.alertForm.validation.titleRequired": "\nDer Titel der Warnungsregel ist erforderlich.",
  "sensors.alertForm.validation.seriesKeyRequired": "\nSerienschlüssel ist erforderlich.",
  "sensors.alertForm.validation.comparatorRequired": "\nKomparator ist erforderlich.",
  "sensors.alertForm.validation.thresholdRequired": "\nDer Schwellenwert muss numerisch sein.",
  "sensors.alertForm.validation.severityRequired": "\nSchweregrad ist erforderlich.",
  "sensors.alertForm.feedback.saved":
    "\nSensoralarmregel im Arbeitsbereich „Sensoren“ gespeichert.",
  "sensors.alertForm.feedback.saveFailed":
    "\nDie Sensoralarmregel kann derzeit nicht beibehalten werden.",
  "sensors.alertRules.title": "\nRegeln für dauerhafte Warnungen",
  "sensors.alertRules.description":
    "\nHeraufgestufte Regeln bleiben im Modell der Sensorsteuerungsebene bestehen und können nachgelagerte Ausführungsarbeiten auslösen.",
  "sensors.alertRules.empty":
    "\nEs wurden noch keine dauerhaften Regeln für Sensorwarnungen erstellt.",
  "sensors.alertRules.promote": "\nHeraufstufen zu Rule",
  "sensors.alertRules.column.title": "\nRegel",
  "sensors.alertRules.column.seriesKey": "\nSerienschlüssel",
  "sensors.alertRules.column.threshold": "\nSchwelle",
  "sensors.alertRules.column.severity": "\nSchweregrad",
  "sensors.alertRules.column.updatedAt": "\nAktualisiert",
  "sensors.alertRules.badge.enabled": "\nAktiviert",
  "sensors.alertRules.badge.disabled": "\nDeaktiviert",
  "sensors.alertRules.validation.titleRequired":
    "\nDer Titel der dauerhaften Warnungsregel ist erforderlich.",
  "sensors.alertRules.validation.seriesKeyRequired":
    "\nDer Schlüssel für die dauerhafte Warnungsregelserie ist erforderlich.",
  "sensors.alertRules.validation.thresholdRequired":
    "\nDer Schwellenwert für die dauerhafte Warnungsregel muss numerisch sein.",
  "sensors.alertRules.feedback.saveFailed":
    "Die dauerhafte Sensoralarmregel kann derzeit nicht beibehalten werden.",
  "sensors.readiness.devices":
    "\nDie aktuelle Geräteregistrierung unterstützt bereits eine Control-Plane-Baseline.",
  "sensors.readiness.telemetry":
    "\nLive-Telemetrieproben können in semantische Serienmodelle normalisiert werden.",
  "sensors.readiness.coverage":
    "\nAsset-Linked-Telemetrie bietet bereits eine erste Betriebsabdeckung.",
  "sensors.page.eyebrow": "\nTelemetrie-Steuerungsebene",
  "sensors.page.readinessRailDescription":
    "\nVerwenden Sie diese Schiene, um den Zustand der Metadaten, die Vollständigkeit der Inbetriebnahme und die Signalqualität zu beurteilen, bevor Sie die Telemetrie in Warnungen, Berichte oder nachgelagerte Betriebsentscheidungen umwandeln.",
  "sensors.page.readinessRail.metadataSignal":
    "\nDie Vollständigkeit der Metadaten ist die Grundlage für vertrauenswürdigen Gerätebesitz und Routing.",
  "sensors.page.readinessRail.commissioningSignal":
    "\nDie Inbetriebnahmelage bestimmt, ob Live-Messwerte eine betriebliche Eskalation unterstützen können.",
  "sensors.page.readinessRail.qualitySignal":
    "\nQualitätsgekennzeichnete Telemetrie ist die Kontrolle, die vertrauenswürdige Signale von verrauschten Feeds trennt.",
  "sensors.page.commandTitle": "\nTelemetrie-Befehlshaltung",
  "sensors.page.commandDescription":
    "\nKombinieren Sie Metadatenbereitschaft, Inbetriebnahmeabdeckung, semantische Reihentiefe und Qualitätskennzeichnung in einem für den Bediener sichtbaren Telemetriebild.",
  "sensors.page.launchpadsTitle": "\nLaunchpads für Telemetrieentscheidungen",
  "sensors.page.launchpadsDescription":
    "\nFördern Sie den Gerätestatus und die Signalqualität in Warnungen, Analysen und Unternehmensberichten, ohne den Telemetrievertrag zu fragmentieren.",
  "sensors.page.launchpadsBadge": "\nUnternehmensworkflow",
  "sensors.page.launchpadsBriefTitle":
    "\nSensoren verhalten sich jetzt wie eine verwaltete Telemetrieanlage",
  "sensors.page.launchpadsBriefDescription":
    "\nDer Arbeitsbereich kann semantische Governance, Regelförderung und nachgelagerte betriebliche Eskalation von einer Steuerungsebene aus unterstützen.",
  "sensors.page.launchpadsLane.metadataTitle": "\nMetadaten-Governance",
  "sensors.page.launchpadsLane.metadataHeadline":
    "\nStandardisieren Sie Gerätebesitz, Serienschlüssel und semantische Bedeutung, bevor Sie Warnungen oder Analysen skalieren.",
  "sensors.page.launchpadsLane.metadataDescription":
    "\nNutzen Sie den Geräte- und Metadatenstatus als Qualitätstor für jeden nachgelagerten Betriebsverbraucher.",
  "sensors.page.launchpadsLane.alertingTitle": "\nWarnungssicherung",
  "sensors.page.launchpadsLane.alertingHeadline":
    "\nVerwandeln Sie vertrauenswürdige Serien in dauerhafte Regeln, auf die Betreiber gebäude- und flottenübergreifend reagieren können.",
  "sensors.page.launchpadsLane.alertingDescription":
    "\nAlarmregeln sollten geregelte Telemetrie widerspiegeln und keine einmaligen Schwellenwerte, die von der Steuerungsebene getrennt sind.",
  "sensors.page.launchpadsLane.analyticsTitle": "\nBetriebsanalytik",
  "sensors.page.launchpadsLane.analyticsHeadline":
    "Verwandeln Sie semantische Telemetrie in Nutzung, Bereitschaft und strategische Entscheidungsbeweise.",
  "sensors.page.launchpadsLane.analyticsDescription":
    "\nNutzen Sie Serienqualität und Schwellenwerte, um prädiktive und operative Analysen zu stärken.",
  "sensors.page.launchpadsLane.escalationTitle": "\nEskalation und Berichterstattung",
  "sensors.page.launchpadsLane.escalationHeadline":
    "\nGehen Sie von Geräteproblemen zu Bereitschafts- und Berichtspaket-Workflows über, bevor das Vertrauen zwischen den Teams nachlässt.",
  "sensors.page.launchpadsLane.escalationDescription":
    "\nSorgen Sie dafür, dass Berichte, Arbeitsaufträge und betriebliche Entscheidungspakete auf denselben Telemetrievertrag abgestimmt sind.",
  "sensors.action.utilisation":
    "\nNutzen Sie die Telemetriequalität, um Nutzungsvertrauen und -lücken zu erklären.",
  "sensors.action.twin":
    "\nÜberlagern Sie die Gerätehaltung mit dem räumlichen Zwilling und dem Hotspot-Kontext.",
  "sensors.action.reports":
    "\nExportieren Sie den Gerätezustand und die Signalabdeckung in Berichtspakete.",
  "sensors.action.buildings":
    "\nVerfolgen Sie Raum- und Anlagenprobleme zurück in den Sensorzustand.",
  "sensors.action.fleet":
    "\nVerbinden Sie tote Winkel der Fahrzeugtelemetrie mit dem Flottenarbeitsbereich.",
  "sensors.action.add": "\nNeuen Sensor oder ein Gerät registrieren.",
  "common.liveSummary": "\nLive-Zusammenfassung",
  "common.domainCoverage": "\nDomain-Abdeckung",
  "common.nextActions": "\nNächste Aktionen",
  "common.readinessSummary": "\nAktuelle Rollout-Bereitschaft",
  "common.connectedWorkflows": "\nVerbundene Arbeitsabläufe",
  "common.connectedWorkflowsHint":
    "\nBinden Sie diese Domäne wieder an den Betrieb, die Finanzen und die Berichterstattung an, ohne die Shell zu verlassen.",
  "common.workflowOps": "\nOperative Begleitung",
  "common.workflowOpsHint":
    "\nVerwenden Sie Aufgaben-, Auslastungs- und Feldausführungsoberflächen, um auf das Live-Signal zu reagieren.",
  "common.workflowFinance": "\nFinanzielle Ausrichtung",
  "common.workflowFinanceHint":
    "\nTragen Sie Risiken, Bedarf und Genehmigungen in Budgets, Szenarien und den Dokumentenfluss ein.",
  "common.workflowReporting": "\nStakeholder-Verpackung",
  "common.workflowReportingHint":
    "\nFassen Sie den Live-Status in Berichtspaketen zusammen, sobald der Arbeitssatz stabil ist.",
  "common.workspaceGuide": "\nArbeitsbereich-Anleitung",
  "common.now": "\nJetzt",
  "common.next": "\nWeiter",
  "common.later": "\nSpäter",
  "common.autoRefreshMinute": "\nJede Minute automatisch aktualisieren",
  "common.guideAlertTitle": "\nBetreiberbereiter Rollout-Pfad",
  "common.guideAlertDescription":
    "\nVerwenden Sie zuerst die Live-Zusammenfassung und gehen Sie dann in die verbundenen Systeme über, bevor Sie das Ergebnis verpacken.",
  "common.timelineNowTitle": "\nLesen Sie die Live-Haltung",
  "common.timelineNowDescription":
    "\nBeginnen Sie mit der automatisch aktualisierten Zusammenfassung und überprüfen Sie, was im aktuellen Bestand bereits abgedeckt ist.",
  "common.timelineNextTitle": "\nHandeln Sie in verbundenen Arbeitsabläufen",
  "common.timelineNextDescription":
    "\nWechseln Sie zu Aufgaben, Finanzen, Flotte, Gebäuden, Sensoren oder Berichten, basierend auf der Druckoberfläche, die Sie lösen müssen.",
  "common.timelineLaterTitle": "\nFörderung einer dauerhaften Programmarbeit",
  "common.timelineLaterDescription":
    "Sobald der Live-Pfad stabil ist, härten Sie ihn in Genehmigungen, Hierarchie, Semantik und Executive Reporting aus.",
  "common.workflowHint":
    "\nBeziehen Sie sich auf die verbundenen Live-Oberflächen, die diese Erweiterung bereits unterstützen.",
  "common.strategicWorkspace.chatContext":
    "\n{title} Arbeitsbereich. {subtitle} Verbunden mit der aktuellen, vom Server gerenderten Operations-Shell, der gemeinsamen Authentifizierungsgrenze und dem HTMX-Teilmodell.",
  "iot.assetRequired": "\nFür die Telemetrieaufnahme ist ein Asset-Kontext erforderlich.",
  "iot.metricRequired": "\nEin Telemetriemetrik- oder Serienschlüssel ist erforderlich.",
  "finance.action.assets":
    "\nÜberprüfen Sie den aktuellen Portfolioanteil, bevor Sie Kapital neu zuweisen.",
  "finance.action.planning":
    "\nÜbergang vom Abschreibungsrisiko zu Planungsszenarien und Genehmigungen.",
  "finance.action.purchaseOrders":
    "\nÜberprüfen Sie die Bestellverpflichtungen und die Einhaltung der Lieferantenanforderungen, die sich auf die Finanzlage auswirken.",
  "finance.action.reports":
    "\nVerpacken Sie den sichtbaren Portfoliostatus in einen Executive Report.",
  "finance.workspace.title": "\nAbschreibungs-Kommandozentrale",
  "finance.workspace.description":
    "\nVerfolgen Sie Bewertungsabweichungen, Konzentrationsrisiken und aktuelle Wertverlustrisiken im gesamten Portfolio.",
  "finance.relatedLinks.title": "\nVerwandte",
  "finance.relatedLinks.description":
    "\nWechseln Sie zum Anlagenregister oder zu den Dokumentarbeitsbereichen, um die finanzielle Nachverfolgung zu koordinieren.",
  "finance.cockpit.filters.eyebrow": "\nFilter",
  "finance.cockpit.filters.title": "\nUmfang des Cockpits",
  "finance.cockpit.filters.description":
    "\nFiltern Sie das Finanz-Cockpit nach Standort, Geschäftszeitraum und Tabellendichte, bevor Sie den aktuellen Slice exportieren.",
  "finance.cockpit.filters.exportDescription":
    "\nExportieren Sie das aktuell gefilterte Abschreibungsportfolio als CSV oder PDF.",
  "finance.cockpit.actions.eyebrow": "\nVerbundene Arbeitsabläufe",
  "finance.cockpit.actions.title": "\nÜbergang von der Bewertung zur Aktion",
  "finance.cockpit.actions.description":
    "\nSteigen Sie direkt in die operativen Systeme ein, die Portfolioabweichungen erklären oder beheben.",
  "finance.cockpit.hero.eyebrow": "\nFinanzcockpit",
  "finance.cockpit.hero.title":
    "\nKI-angepasste Exposition, Warteschlangendruck und Konzentration in einem Arbeitsbereich",
  "finance.cockpit.hero.description":
    "\nEin vom Server gerendertes Finanz-Cockpit zur gleichzeitigen Überprüfung der Bewertungsabweichung, der Standortkonzentration, des Aufgabendrucks und des Beschaffungs- oder Entsorgungsflusses.",
  "finance.cockpit.hero.live": "\nAutomatische Aktualisierung alle {seconds} Sekunden",
  "finance.cockpit.chat.pageContext":
    "Finanz-Cockpit-Seite. Einheitlicher Arbeitsbereich für KI-angepasste Exposition, Standortkonzentration, Wartungsrückstand, Dokumentgenehmigungen und Portfolioabweichung. Steuerelemente: Site-Filter, Geschäftszeitraum, Seitengröße, CSV-Export, PDF-Export. Hauptabschnitte: KI-Portfolio-Briefing, Datensatzabdeckung, KPI-Streifen, Site-Bestenliste, Aktionswarteschlange, Konzentrationskarten und Portfolio-Tabelle.",
  "finance.cockpit.action.disposalReview": "\nÜberprüfen Sie die Entsorgung",
  "finance.cockpit.action.immediateIntervention": "\nSofortige Intervention",
  "finance.cockpit.action.replacementPlan": "\nErsatz planen",
  "finance.cockpit.action.procurementReview": "\nÜberprüfen Sie die Beschaffung",
  "finance.cockpit.action.workOrderFollowUp": "\nFolgearbeitsauftrag",
  "finance.cockpit.action.invoiceFollowUp": "\nFolgerechnung",
  "finance.cockpit.action.purchaseOrderFollowUp": "\nFolgebestellung",
  "finance.cockpit.action.customerOrderFollowUp": "\nNachverfolgung der Kundenbestellung",
  "finance.cockpit.action.monitor": "\nBelichtung überwachen",
  "finance.cockpit.briefing.eyebrow": "\nPortfolio-Kurzfassung",
  "finance.cockpit.briefing.title": "\nFinanzbericht",
  "finance.cockpit.briefing.summary":
    "\nFür {site} über {period} liegt das KI-bereinigte Engagement bei {adjustedExposure} mit einem Bewertungsdelta von {delta}. {signalCount} signalgestützte Vermögenswerte und {openTasks} offene Aufgaben prägen den aktuellen finanziellen Druck.",
  "finance.cockpit.briefing.recommendationTitle": "\nEmpfohlener nächster Schritt",
  "finance.cockpit.briefing.recommendationPortfolio":
    "\nKein einzelnes Asset dominiert die Warteschlange. Überprüfen Sie die Konzentration und den offenen Dokumentenfluss über {site}, bevor Sie Kapital neu zuweisen.",
  "finance.cockpit.briefing.recommendationAsset":
    "\nPriorisieren Sie als nächstes {asset} und verschieben Sie es in „{action}“, damit sich das Bewertungsrisiko und die betriebliche Belastung nicht verstärken.",
  "finance.cockpit.generatedAt": "\nGeneriert {date}",
  "finance.cockpit.datasets.title": "\nDatensatzabdeckung",
  "finance.cockpit.datasets.description":
    "\nDas Cockpit vereint Bewertung, KI-Risiko, Wartungsaufwand und Transaktionsdokumentfluss in einer finanziellen Entscheidungsoberfläche.",
  "finance.cockpit.datasets.assetsTitle": "\nVermögenswerte im Geltungsbereich",
  "finance.cockpit.datasets.assetsDescription":
    "\nVermögenswerte, die derzeit zum gefilterten Finanzportfolio beitragen.",
  "finance.cockpit.datasets.signalsTitle": "\nKI-gestützte Signale",
  "finance.cockpit.datasets.signalsDescription":
    "\n{critical} kritische/Notfall- und {warning} Warnsignale beeinflussen die Bewertung.",
  "finance.cockpit.datasets.tasksTitle": "\nOffene Arbeitselemente",
  "finance.cockpit.datasets.tasksDescription":
    "\n{overdue} Überfällige Aufgaben erhöhen kurzfristig den finanziellen Druck.",
  "finance.cockpit.datasets.documentsTitle": "\nDokumentenfluss öffnen",
  "finance.cockpit.datasets.documentsDescription":
    "\n{workOrders} Arbeitsaufträge, {purchaseOrders} Bestellungen und {invoices} Rechnungen sind noch aktiv.",
  "finance.cockpit.kpi.adjustedExposure": "\nKI-Anpassungsrate {rate}",
  "finance.cockpit.kpi.deltaTitle": "\nBewertungsdelta",
  "finance.cockpit.kpi.deltaDescription":
    "\nUnterschied zwischen Standard-Abschreibungsrisiko und KI-bereinigter Bewertung.",
  "finance.cockpit.kpi.highRiskDescription":
    "\n{count} Vermögenswerte bergen derzeit das höchste finanzielle und betriebliche Risiko.",
  "finance.cockpit.kpi.confidenceTitle": "Durchschnittliches Vertrauen",
  "finance.cockpit.kpi.confidenceDescription":
    "\n{due} Vermögenswerte befinden sich bereits innerhalb des Prognosefensters für die baldige Fälligkeit.",
  "finance.cockpit.condition.description":
    "\nDer Exposure-Mix nach Vermögenszustand hilft aufzuzeigen, ob sich das Kapitalrisiko um beschädigte Vermögenswerte herum konzentriert.",
  "finance.cockpit.type.description":
    "\nSehen Sie, welche Vermögenswertarten den größten Anteil des aktuellen finanziellen Risikos ausmachen.",
  "finance.cockpit.lifecycle.title": "\nLebenszyklusmix",
  "finance.cockpit.lifecycle.description":
    "\nDie Lebenszyklusverteilung zeigt, wie viel des aktuellen Portfolios sich im aktiven, überwachten, ermüdenden oder entsorgten Zustand befindet.",
  "finance.cockpit.lifecycle.share": "\n{share} der sichtbaren Belichtung",
  "finance.cockpit.lifecycle.assets": "\nVermögenswerte",
  "finance.cockpit.site.title": "\nStandortkonzentration",
  "finance.cockpit.site.description":
    "\nVergleichen Sie die angepasste Gefährdung auf Standortebene, Vermögenswerte mit hohem Risiko, aktive Aufgaben und den offenen Dokumentenfluss.",
  "finance.cockpit.site.share": "\n{share} der sichtbaren Belichtung",
  "finance.cockpit.site.risk": "\nHohes Risiko",
  "finance.cockpit.site.tasks": "\nOffene Aufgaben",
  "finance.cockpit.site.queue": "\nAusstehende Warteschlange",
  "finance.cockpit.queue.title": "\nAktionswarteschlange",
  "finance.cockpit.queue.description":
    "\nVermögenswerte sortiert nach Bewertungsabweichung, Risikoschwere und nachgelagerter Arbeit oder Dokumentendruck.",
  "finance.cockpit.queue.summary": "\n{tasks} aktive Aufgaben • {documents} offene Dokumente",
  "finance.cockpit.opportunity.purchaseOrdersTitle": "\nBestellexposition",
  "finance.cockpit.opportunity.purchaseOrdersDescription":
    "\n{count} Kaufaufträge für finanziell exponierte Vermögenswerte sind noch offen.",
  "finance.cockpit.opportunity.invoicesTitle": "\nSammlungen Exposure",
  "finance.cockpit.opportunity.invoicesDescription":
    "\n{count} Rechnungen weisen noch offenen Inkassodruck im Portfolio auf.",
  "finance.cockpit.opportunity.tasksTitle": "\nÜberfällige Arbeit",
  "finance.cockpit.opportunity.tasksDescription":
    "\nÜberfällige Wartungsarbeiten erhöhen den Bewertungsverlust und das Betriebsrisiko.",
  "finance.cockpit.opportunity.dueSoonTitle": "\nBald fällige Signale",
  "finance.cockpit.opportunity.dueSoonDescription":
    "\nPrognosefenster, die kurz vor einer Intervention stehen und sich wahrscheinlich auf die Kapitalplanung auswirken.",
  "finance.overview.documentSummary": "\nDokumentenfluss öffnen",
  "finance.overview.documentSummaryDescription":
    "\nDerzeit sind {workOrders} Arbeitsaufträge, {purchaseOrders} Bestellungen und {invoices} Rechnungen geöffnet.",
  "finance.cockpit.table.title": "\nFinanzportfolio",
  "finance.cockpit.table.description":
    "\nSortierbare Portfolioansicht, die Standardwert, KI-bereinigten Wert, Konfidenz und Warteschlangendruck kombiniert.",
  "finance.cockpit.table.live": "\nLive-Tabelle",
  "finance.cockpit.table.asset": "\nAsset",
  "finance.cockpit.table.signal": "\nSignal",
  "finance.cockpit.table.aiAdjusted": "\nKI-bereinigt",
  "finance.cockpit.table.delta": "\nDelta",
  "finance.cockpit.table.confidence": "\nVertrauen",
  "finance.cockpit.table.queue": "\nWarteschlange",
  "finance.cockpit.table.remainingLifeNone":
    "\nMit diesem Vermögenswert ist keine Prognose für die verbleibende Lebensdauer verbunden.",
  "finance.cockpit.table.remainingLifeValue": "\n{days} Tage verbleibende Lebensdauer",
  "finance.cockpit.table.activeTasksValue": "\n{count} aktive Aufgaben",
  "finance.cockpit.table.overdueTasksValue": "\n{count} überfällig",
  "finance.cockpit.pdf.title": "\nFinanz-Cockpit-Bericht",
  "finance.cockpit.pdf.subject": "\nKI-bereinigtes Abschreibungsrisiko und Portfoliovarianz",
  "finance.cockpit.pdf.scope": "\nGeltungsbereich: {site} • {period}",
  "finance.cockpit.pdf.summary.adjustedExposure": "\nAngepasste Belichtung: {value}",
  "finance.cockpit.pdf.summary.delta": "\nBewertungsdelta: {value} ({percent})",
  "finance.cockpit.pdf.summary.risk": "\nHochrisikoengagement: {value} über {count} Vermögenswerte",
  "finance.cockpit.pdf.summary.queue": "\nOffene Aufgaben: {tasks} • Offene Dokumente: {documents}",
  "reports.title": "\nBerichte",
  "reports.subtitle": "Anlagenberichte, Abschreibungszusammenfassungen und MOD-Export",
  "reports.category.financial": "\nFinanzielle",
  "reports.category.financialDesc": "\nAbschreibungs-, Bewertungs- und Finanzrisikoberichte",
  "reports.category.operations": "\nVermögenswerte und Betrieb",
  "reports.category.operationsDesc": "\nAnlageninventar, Prognosen und Nutzungsanalysen",
  "reports.category.executive": "\nGeschäftsführer",
  "reports.category.executiveDesc": "\nExecutive Dashboards und wichtige Leistungsindikatoren",
  "reports.workspace.chat.categoryLine": "\n{label}: {count} Datensätze",
  "reports.workspace.chat.noAiBrief": "\nEs ist kein aktives KI-Briefing geladen.",
  "reports.workspace.chat.aiBriefActive":
    "\nAktives Briefing: {title}. Zielgruppe {audience}. Fokus {focusLabel}. Abdeckung {coverageScore} Prozent.",
  "reports.workspace.chat.journeyStep": "{title} ({statusPart}) → {targetLabel}",
  "reports.workspace.chat.stepStatusRecommended": "\n{status}, empfohlen",
  "reports.workspace.chat.priorityDataset":
    "\nPrioritäts-Drilldown-Datensatz: {title}. Gesundheit {health}.",
  "reports.workspace.chat.noPinnedSources":
    "\nDerzeit sind keine zugehörigen Quellaktionen angepinnt.",
  "reports.workspace.chat.pinnedSourcesPrefix": "\nZugehörige Quellaktionen:",
  "reports.workspace.chat.sourceLink": "{label} → {supporting}",
  "reports.workspace.chat.generalCoverage": "\nallgemeine Berichterstattung",
  "reports.workspace.chat.mission": "\nNächster empfohlener Zug: {title}. Ziel {targetLabel}.",
  "reports.workspace.chat.builder":
    "\nZielgruppe {audience}. Fokus {focus}. Abschnitte {sections}.",
  "reports.workspace.chat.pageIntro": "\nArbeitsbereich „Berichte“.",
  "reports.workspace.chat.workflowInventory":
    "\nDie Seite umfasst einen Workflow-Navigator, eine Datensatz-Befehlszentrale, eine KI-Befehlsleiste, einen Berichtsersteller, eine Vorlagenleiste, einen Quelldaten-Hub, ein Drilldown-Panel und eine gespeicherte Berichtschronologie.",
  "reports.workspace.chat.body":
    "{intro} Kategorien: {categorySummary}. Datensätze: {datasetSummary}. {prioritySummary} {sourceSummary} {missionSummary} {builderSummary} {aiSummary} Arbeitsschritte: {journeySummary}. {workflowInventory}",
  "reports.workspace.heroEyebrow": "\nUnternehmensberichterstattung",
  "reports.workspace.title": "\nKommandozentrale für Portfolioberichte",
  "reports.workspace.description":
    "\nVorstandsfertige Berichtspakete, Betriebssicherungsansichten und evidenzbasierte Drilldowns, bereitgestellt über einen servergerenderten Arbeitsbereich.",
  "reports.workspace.sectionTitle": "\nBerichtskatalog",
  "reports.workspace.sectionDescription":
    "\nWechseln Sie zwischen Finanz-, Betriebs- und Executive-Paketen, ohne den Berichtsarbeitsbereich zu verlassen.",
  "reports.workspace.datasetTitle": "\nDatensatz-Kommandozentrale",
  "reports.workspace.datasetDescription":
    "\nÜberprüfen Sie Live-Finanz-, Betriebs- und Führungsdatensätze, bevor Sie ein Berichtspaket erstellen oder Drilldowns öffnen.",
  "reports.workspace.aiBriefTitle": "\nKI-Briefing",
  "reports.workspace.aiBriefDescription":
    "\nEine entscheidungsreife Erzählung, synthetisiert aus dem aktiven Paket, unterstützenden Beweisen und dem aktuellen Workflow-Status.",
  "reports.workspace.aiBriefEmpty":
    "\nErstellen Sie ein Berichtspaket, um ein KI-Briefing für die Finanz-, Betriebs- oder Führungsebene zu erstellen.",
  "reports.workspace.launchpadTitle": "\nEntscheidungs-Launchpad",
  "reports.workspace.launchpadDescription":
    "\nWechseln Sie direkt zu Executive Packs, Betriebssicherungsansichten oder Abhängigkeitsprüfungen, ohne den Kontext neu erstellen zu müssen.",
  "reports.workspace.launchpad.priorityDatasetTitle": "\nPrioritätsdatensatz",
  "reports.workspace.launchpad.offlineSourcesTitle": "\nOffline-Quellen",
  "reports.workspace.launchpad.reportingScopeTitle": "\nBerichtsumfang",
  "reports.workspace.launchpad.openPack": "\nPackung öffnen",
  "reports.workspace.launchpad.openWorkspace": "\nArbeitsbereich öffnen",
  "reports.workspace.launchpad.openEstateWorkspace": "\nOffener Arbeitsbereich „Nachlass“",
  "reports.workspace.launchpad.openFinancePlanningWorkspace":
    "Arbeitsbereich „Finanzplanung“ öffnen",
  "reports.workspace.launchpad.lane.boardBadge": "\nBoard-Paket",
  "reports.workspace.launchpad.lane.boardTitle": "\nStrategisches Entscheidungsintelligenzpaket",
  "reports.workspace.launchpad.lane.boardDescription":
    "\nFühren Sie das Board-orientierte Paket für Lebenszyklus-Kompromisse, Risikolage und Investitionssequenzierung ein.",
  "reports.workspace.launchpad.lane.operationsBadge": "\nBetriebspaket",
  "reports.workspace.launchpad.lane.operationsTitle": "\nBildpaket zum Betrieb des Anwesens",
  "reports.workspace.launchpad.lane.operationsDescription":
    "\nÖffnen Sie das Betriebssicherungspaket für Bereitschaftsblocker, FM-Lieferdruck und Nachlasskontrollsignale.",
  "reports.workspace.launchpad.lane.dependenciesBadge": "\nAbhängigkeitsüberprüfung",
  "reports.workspace.launchpad.lane.dependenciesTitle":
    "\nÜberprüfung der Abhängigkeit der Unternehmensintegration",
  "reports.workspace.launchpad.lane.dependenciesDescription":
    "\nSteigen Sie in die Integrationshaltung ein, wenn Finanz-, Personal-, Beschaffungs- oder Catering-Partnersysteme das Berichtsvertrauen prägen.",
  "reports.workspace.activePackDescription":
    "\nDas aktive Berichtspaket kombiniert KI-Erzählung, datensatzübergreifende Beweise und exportfähige Abschnitte in einem vom Server gerenderten Arbeitsbereich.",
  "reports.workspace.mission.title": "\nEmpfohlener nächster Schritt",
  "reports.workspace.mission.description":
    "\nDer Arbeitsbereich wandelt den Portfoliostatus in einen entscheidungsbereiten nächsten Schritt um, sodass Bediener ein Paket bereitstellen, Beweise öffnen oder eine kurze Führung abgeben können, ohne die gesamte Seite neu interpretieren zu müssen.",
  "reports.workspace.mission.progressTitle": "\nWorkflow-Bereitschaft",
  "reports.workspace.mission.progressValue": "\n{completed}/{total} bereit",
  "reports.workspace.mission.progressDescription":
    "\n{completed} von {total} Reiseschritten sind bereit. Die aktuelle Workflow-Bereitschaft beträgt {percent}%.",
  "reports.workspace.mission.progressStatDescription":
    "\n{percent} % des Berichtsflusses sind zur Übergabe bereit.",
  "reports.workspace.mission.nextStageTitle": "\nNächste Stufe",
  "reports.workspace.mission.priorityDatasetTitle": "\nPrioritätsdatensatz",
  "reports.workspace.mission.dataTitle": "\nQuellenabdeckung wiederherstellen",
  "reports.workspace.mission.dataDescription":
    "\n{count} Datensätze sind offline. Beginnen Sie mit {source}, um das Vertrauen vor dem Export wiederherzustellen.",
  "reports.workspace.mission.firstPackTitle": "\nStellen Sie das erste Paket zusammen",
  "reports.workspace.mission.firstPackDescription":
    "\nVerwenden Sie {dataset} als Ausgangspunkt und geben Sie dann Stage Builder-Eingaben für die Zielgruppe {audience} ein.",
  "reports.workspace.mission.drilldownTitle": "\nUntersuchen Sie {dataset}",
  "reports.workspace.mission.drilldownDescription":
    "\n{dataset} ist mit {health} gekennzeichnet. Öffnen Sie den Drilldown-Beweis, bevor Sie die Story ändern.",
  "reports.workspace.mission.coverageTitle": "\nErhöhen Sie die Paketabdeckung",
  "reports.workspace.mission.coverageDescription":
    "\n{pack} hat derzeit eine Abdeckung von {score} %. Präzisieren Sie Abschnitte, Drilldowns oder Erläuterungen, bevor Sie sie teilen.",
  "reports.workspace.mission.briefTitle": "\nEntwerfen Sie das Entscheidungsbriefing",
  "reports.workspace.mission.briefDescription":
    "\n{pack} ist strukturiert und bereit für eine KI-Zusammenfassung, einen Q&A-Pass oder ein zielgruppenspezifisches Briefing.",
  "reports.workspace.mission.briefPrompt":
    "Entwerfen Sie ein entscheidungsreifes Briefing für das Berichtspaket {pack}. Die aktiven Abschnitte sind {sections}. Fassen Sie die Hauptrisiken zusammen, erläutern Sie die stärksten Beweise und bereiten Sie mögliche Folgefragen vor.",
  "reports.workspace.journey.selectTitle": "\nAbdeckung auswählen",
  "reports.workspace.journey.selectDescription":
    "\nBeginnen Sie mit dem wesentlichsten Datensatz: {dataset}. Bestätigen Sie, ob es in das nächste Paket gehört.",
  "reports.workspace.journey.gotoDataset": "\nDatensätze öffnen",
  "reports.workspace.journey.askAi": "\nFragen Sie AI",
  "reports.workspace.journey.changeTitle": "\nÄndere die Geschichte",
  "reports.workspace.journey.changeDescription":
    "\nÜberprüfen Sie die Mischung der aktiven Abschnitte, bevor Sie die Erzählung oder den Stakeholder-Rahmen ändern: {sections}.",
  "reports.workspace.journey.gotoActivePack": "\nAktives Paket öffnen",
  "reports.workspace.journey.changePrompt":
    "\nHelfen Sie mir, die aktuelle Berichtsgeschichte zu ändern. Die aktiven Abschnitte sind {sections}. Empfehlen Sie, was hervorgehoben, abgeschwächt oder umgeschrieben werden sollte.",
  "reports.workspace.journey.modifyTitle": "\nÄndern Sie das Paket",
  "reports.workspace.journey.modifyDescription":
    "\nRichten Sie den aktuellen Bericht erneut auf die Zielgruppe {audience} aus, ohne die Schlüsselsignale zu verlieren.",
  "reports.workspace.journey.gotoBuilder": "\nÖffnen Sie builder",
  "reports.workspace.journey.modifyPrompt":
    "\nHelfen Sie mir, das aktuelle Berichtspaket für die {audience}-Zielgruppe mit einem {focus}-Fokus zu ändern. Empfehlen Sie, wie Sie die Builder-Eingaben anpassen.",
  "reports.workspace.journey.drilldownTitle": "\nDrill in die Varianz",
  "reports.workspace.journey.drilldownDescription":
    "\nWechseln Sie von Zusammenfassungskarten zu Beweistabellen für {dataset}.",
  "reports.workspace.journey.gotoDrilldown": "\nDrilldown öffnen",
  "reports.workspace.journey.drilldownPrompt":
    "\nUntersuchen Sie den Datensatz {dataset}. Es ist derzeit mit {health} gekennzeichnet. Erklären Sie die wahrscheinlichen Treiber und die nächsten Drilldown-Fragen, die ich stellen sollte.",
  "reports.workspace.journey.addDataTitle": "\nQuelldaten hinzufügen",
  "reports.workspace.journey.addDataDescription":
    "\nWenn das Vertrauen gering ist, öffnen Sie {source} und fügen Sie die zugrunde liegenden Beweise hinzu oder aktualisieren Sie sie.",
  "reports.workspace.journey.gotoSource": "\nOpen Source",
  "reports.workspace.journey.addDataPrompt":
    "\nSagen Sie mir, welche zusätzlichen Daten ich aus {source} hinzufügen sollte, um das aktive Berichtspaket ({activePack}) zu verbessern.",
  "reports.workspace.ai.explainPostureTitle": "\nErklären Sie die aktuelle Körperhaltung",
  "reports.workspace.ai.explainPostureDescription":
    "\nFassen Sie die wichtigsten Signale zusammen, beginnend mit {dataset}.",
  "reports.workspace.ai.explainDriversTitle": "\nErklären Sie Treiber und Vertrauen",
  "reports.workspace.ai.explainDriversDescription":
    "\nVerfolgen Sie die Haupttreiber, Unsicherheiten und unterstützenden Beweise hinter {dataset}.",
  "reports.workspace.ai.explainDriversPrompt":
    "Erklären Sie für den Datensatz {dataset} die wichtigsten Treiber, das Konfidenzniveau, die Unsicherheit und welche Beweise die Entscheidung am meisten ändern würden. Gesundheit ist {health}. Das aktive Paket ist {pack}. Aktive Abschnitte sind {sections}. Es gibt {count} Offline-Datensätze. Überprüfen Sie den Bestand, den Aufgabenrückstand, die Auslastung, die Finanzen sowie die Beschaffungs- oder Entsorgungssignale, wenn entsprechende Beweise vorliegen.",
  "reports.workspace.ai.modifyPackTitle": "\nRetargeting dieses Pakets",
  "reports.workspace.ai.modifyPackDescription":
    "\nEmpfehlen Sie, wie sich das Paket {pack} für eine andere Zielgruppe oder einen anderen Entscheidungsträger ändern sollte.",
  "reports.workspace.ai.modifyPackPrompt":
    "\nHelfen Sie mir, das Berichtspaket {pack} zu ändern. Die aktuellen Abschnitte sind {sections}. Empfehlen Sie, was hinzugefügt, entfernt oder festgezogen werden soll.",
  "reports.workspace.ai.comparePackTitle": "\nVergleichen Sie mit Chronologie",
  "reports.workspace.ai.comparePackDescription":
    "\nÜberprüfen Sie, wie sich das aktuelle Paket {pack} von der gespeicherten Chronologie unterscheidet und was sich geändert hat.",
  "reports.workspace.ai.comparePackPrompt":
    "\nVergleichen Sie das aktuelle Berichtspaket {pack} mit der gespeicherten Berichtschronologie. Die aktiven Abschnitte sind {sections}. Heben Sie hervor, was sich geändert hat, was noch ungelöst ist und was vor dem Teilen einen Drilldown verdient.",
  "reports.workspace.ai.findGapsTitle": "\nDatenlücken finden",
  "reports.workspace.ai.findGapsDescription":
    "\nEs gibt {count} Offline-Datensätze, die sich auf die Berichtszuverlässigkeit auswirken.",
  "reports.workspace.ai.findGapsPrompt":
    "\nIdentifizieren Sie die fehlenden oder veralteten Daten in diesem Berichtsarbeitsbereich. Derzeit gibt es {count} Offline-Datensätze. Erklären Sie, welche Quellsysteme zuerst aktualisiert werden sollen.",
  "reports.workspace.ai.explainSelectionTitle": "\nErklären Sie die Auswahl",
  "reports.workspace.ai.explainSelectionDescription":
    "\nNutzen Sie die aktuelle Textauswahl, um im Chat nach einer verständlichen Erklärung zu fragen.",
  "reports.workspace.source.estate":
    "\nÖffnen Sie den Estate-Arbeitsbereich, um die Bereitschaft, Projektgenehmigungen und den strategischen Programmstatus hinter diesem Bericht zu überprüfen.",
  "reports.workspace.source.assets":
    "\nÖffnen Sie das Anlagenregister, um die diesem Bericht zugrunde liegenden Gerätedatensätze hinzuzufügen oder zu korrigieren.",
  "reports.workspace.source.buildings":
    "\nÖffnen Sie Gebäude, um die Anlagenhierarchie, die FM-Stellung und die Bereitschaftsblockaden zu überprüfen, die diesen Bericht beeinflussen.",
  "reports.workspace.source.fleet":
    "\nÖffnen Sie die Flotte, um Auslastung, Ausfallzeiten, Austauschdruck und Betriebszustand der Ausrüstung hinter diesem Bericht zu überprüfen.",
  "reports.workspace.source.financePlanning":
    "Öffnen Sie die Finanzplanung, um den Genehmigungsdruck, Investitionsszenarien und Kapitalkonflikte im Zusammenhang mit diesem Bericht zu untersuchen.",
  "reports.workspace.source.admin":
    "\nÖffnen Sie Admin-Integrationen, um den Zustand des Partnersystems und die Abhängigkeitseffekte zu überprüfen, die diesen Bericht prägen.",
  "reports.workspace.source.sensors":
    "\nÖffnen Sie Sensoren, um die Telemetrieabdeckung, Inbetriebnahmelücken und Gerätequalitätsprobleme hinter diesem Bericht zu untersuchen.",
  "reports.workspace.source.tasks":
    "\nÖffnen Sie Aufgabenvorgänge, um Rückstände, Wartungsdruck und überfällige Aktionen zu validieren.",
  "reports.workspace.source.predictions":
    "\nÖffnen Sie Vorhersagevorgänge, um Fehlerfenster, Schweregrad und Modellabdeckung zu überprüfen.",
  "reports.workspace.source.finance":
    "\nOffene Finanzierung zur Validierung des Abschreibungsrisikos, der Bewertungsdrift und des Konzentrationsrisikos.",
  "reports.workspace.source.utilisation":
    "\nOffene Nutzung zur Überprüfung telemetriegestützter Last-, Sättigungs- und Belegungsnachweise.",
  "reports.workspace.source.rfqs":
    "\nÖffnen Sie den RFQ-Arbeitsbereich, um die eingehende Nachfrage, die Angebotsaktivität und die Konvertierungsbereitschaft zu überprüfen.",
  "reports.workspace.source.customerOrders":
    "\nÖffnen Sie Kundenaufträge, um den Pipeline-Fortschritt, Genehmigungen und die Erfüllungsbereitschaft zu validieren.",
  "reports.workspace.source.workOrders":
    "\nÖffnen Sie Arbeitsaufträge, um den Ausführungsablauf, den SLA-Status und den Lieferdruck zu überprüfen.",
  "reports.workspace.source.purchaseOrders":
    "\nÖffnen Sie Bestellungen, um Lieferantenverpflichtungen, Quittungen und Fälligkeitsdaten zu überprüfen.",
  "reports.workspace.source.invoices":
    "\nÖffnen Sie Rechnungen, um die Ausstellung, den Inkassostatus und überfällige Beträge zu überprüfen.",
  "reports.navigation.title": "\nWorkflow-Navigator",
  "reports.navigation.description":
    "\nWechseln Sie von der Datensatzauswahl zum Packen von Änderungen, Drilldowns und zur Überprüfung von Datenlücken, ohne den Berichtsarbeitsbereich zu verlassen.",
  "reports.navigation.menuTitle": "\nAbschnitte",
  "reports.navigation.menuDescription":
    "\nSpringen Sie direkt zur aktuellen Phase des Reporting-Workflows.",
  "reports.navigation.lanesTitle": "\nEntscheidungswege",
  "reports.navigation.lanesDescription":
    "\nWechseln Sie zwischen den Absichten des Bedieners, bevor Sie tiefer in die Aktionen auf Abschnittsebene eintauchen oder den aktuellen Status an den Chat weitergeben.",
  "reports.navigation.cluster.decideTitle": "\nEntscheide",
  "reports.navigation.cluster.decideDescription":
    "\nÜberprüfen Sie die aktuelle Haltung, den empfohlenen nächsten Schritt und die Datensatzbereitschaft, bevor Sie das Paket wechseln.",
  "reports.navigation.cluster.composeTitle": "\nVerfassen",
  "reports.navigation.cluster.composeDescription":
    "\nÄndern Sie Zielgruppe, Fokus, Abschnitte und aktive Berichtsstruktur, bevor Sie ein Briefing durchführen oder exportieren.",
  "reports.navigation.cluster.investigateTitle": "\nUntersuchen",
  "reports.navigation.cluster.investigateDescription":
    "\nGehen Sie von der Zusammenfassung zu Beweisen über, vergleichen Sie die Chronologie und validieren Sie, was sich geändert hat.",
  "reports.navigation.cluster.improveTitle": "\nVerbessern",
  "reports.navigation.cluster.improveDescription":
    "Nutzen Sie Chat- und Quellsysteme, um Lücken zu schließen, die Abdeckung wiederherzustellen und das Vertrauen zu stärken.",
  "reports.navigation.cluster.itemCount": "\n{count} Abschnitte",
  "reports.navigation.stage.overview": "\nÜbersicht",
  "reports.navigation.stage.overviewDesc":
    "\nPortfolio-Status, zusammenfassende KPIs und das aktive KI-Briefing.",
  "reports.navigation.stage.journey": "\nReise",
  "reports.navigation.stage.journeyDesc":
    "\nEntscheidungsgesteuerte Schritte zur Auswahl der Abdeckung, Änderung des Fokus und Analyse der Varianz.",
  "reports.navigation.stage.datasets": "\nDatensätze",
  "reports.navigation.stage.datasetsDesc":
    "\nLive-Finanz-, Betriebs- und Führungsdatensätze, die in jedes Berichtspaket einfließen.",
  "reports.navigation.stage.aiCopilot": "\nKI-Copilot",
  "reports.navigation.stage.aiCopilotDesc":
    "\nVorgefertigte Eingabeaufforderungen, die den Chat mit dem bereits angehängten aktuellen Berichtsstatus öffnen.",
  "reports.navigation.stage.builder": "\nBauherr",
  "reports.navigation.stage.builderDesc":
    "\nZielgruppe, Fokus, Datumsbereich, Abschnitte und narrative Steuerelemente.",
  "reports.navigation.stage.templates": "\nVorlagen",
  "reports.navigation.stage.templatesDesc":
    "\nIntegrierte und gespeicherte Berichtspakete, die im Arbeitsbereich gestartet werden können.",
  "reports.navigation.stage.sourceHub": "\nQuellhub",
  "reports.navigation.stage.sourceHubDesc":
    "\nBetriebssysteme, die Beweise hinzufügen, die Abdeckung aktualisieren oder eine Datenlücke schließen können.",
  "reports.navigation.stage.drilldown": "\nDrilldown",
  "reports.navigation.stage.drilldownDesc":
    "\nDetail- und Konzentrationssignale auf Zeilenebene hinter der aktuellen Zusammenfassung.",
  "reports.navigation.stage.history": "\nChronologie",
  "reports.navigation.stage.historyDesc":
    "\nGespeicherter Berichtsverlauf für Vergleich, Wiedergabe und Governance.",
  "reports.navigation.stage.activePack": "\nAktives Paket",
  "reports.navigation.stage.activePackDesc":
    "\nDas aktuelle, vom Server gerenderte Berichtspaket, die Beschreibung und die exportbereiten Abschnitte.",
  "reports.navigation.badge.live": "\nAlle live",
  "reports.navigation.badge.ready": "\nBereit",
  "reports.navigation.badge.offlineCount": "\n{count} offline",
  "reports.navigation.badge.datasetCount": "\n{count} Datensätze",
  "reports.navigation.badge.sectionCount": "\n{count} Abschnitte",
  "reports.navigation.badge.stepCount": "\n{count} Schritte",
  "reports.navigation.badge.templateCount": "\n{count} packt",
  "reports.navigation.badge.aiActionCount": "\n{count} fordert",
  "reports.navigation.badge.sourceCount": " auf\n{count} Quellen",
  "reports.navigation.badge.savedCount": "\n{count} gespeichert",
  "reports.navigation.badge.coverage": "\nAbdeckung {score}%",
  "reports.navigation.badge.focus": "\n{focus} Fokus",
  "reports.navigation.badge.attention": "Aufmerksamkeit: {label}",
  "reports.navigation.status.recommended": "\nEmpfohlen",
  "reports.navigation.status.complete": "\nKomplett",
  "reports.navigation.status.attention": "\nAchtung",
  "reports.navigation.status.ready": "\nBereit",
  "reports.navigation.action.jump": "\nAbschnitt öffnen",
  "reports.navigation.action.askAi": "\nFragen Sie AI",
  "reports.navigation.action.loadBuilder": "\nBühnenbauer",
  "reports.navigation.action.loadBuilderAria": "\nBühnenbildner von {name}",
  "reports.navigation.action.loadDrilldown": "\nDrilldown laden",
  "reports.navigation.whyNow": "\nWarum jetzt",
  "reports.navigation.whyNowComplete":
    "\nDieser Schritt befindet sich bereits in einem verwendbaren Zustand. Öffnen Sie es erneut, wenn sich das Paket, die Beweise oder die Entscheidungszielgruppe ändert.",
  "reports.navigation.whyNowAttention":
    "\nBeheben Sie die hier gemeldete Abweichung, veraltete Quelle oder fehlende Beweise, bevor Sie das Paket freigeben.",
  "reports.navigation.whyNowReady":
    "\nDieser Schritt ist verfügbar, wenn Sie die Geschichte verfeinern, Beweise offenlegen oder unterstützende Daten hinzufügen müssen.",
  "reports.journey.title": "\nEntscheidungsreise",
  "reports.journey.description":
    "\nEin Finanz-First-Workflow zum Auswählen der Abdeckung, Ändern des Fokus, Ändern von Paketen, Drillen in die Varianz und Identifizieren fehlender Daten.",
  "reports.ai.title": "\nKI-Copilot",
  "reports.ai.description":
    "\nSenden Sie den aktuellen Berichtsstatus mit vorgefertigten Eingabeaufforderungen an den Chat oder erläutern Sie ausgewählte Zeilen aus einer beliebigen Tabelle.",
  "reports.workspace.health.healthy": "Gesund",
  "reports.workspace.health.monitor": "\nMonitor",
  "reports.workspace.health.attention": "\nBenötigt Aufmerksamkeit",
  "reports.workspace.health.offline": "\nOffline",
  "reports.posture.title": "\nHaltung melden",
  "reports.posture.description":
    "\nAktuelle Live-Berichterstattung über Finanz-, Betriebs- und Führungsberichtspakete.",
  "reports.generatedAt": "\nGeneriert {date}",
  "reports.overview.reportCount": "\nBerichtspakete",
  "reports.overview.assetsCovered": "\nAbgedeckte Vermögenswerte",
  "reports.overview.predictionsDue": "\nVorhersagen fällig",
  "reports.card.cadence.daily": "\nTäglich",
  "reports.card.cadence.weekly": "\nWöchentlich",
  "reports.card.cadence.monthly": "\nMonatlich",
  "reports.card.metric.totalTypes": "\nAsset-Typen",
  "reports.card.metric.criticalAssets": "\nKritische Vermögenswerte",
  "reports.card.metric.criticalSignals": "\nKritische Signale",
  "reports.types.depreciation": "\nAbschreibungsübersicht",
  "reports.types.depreciationDesc":
    "\nBuchwert, AI-bereinigtes Risiko und Top-Vermögenswerte nach Abschreibung",
  "reports.types.assets": "\nAsset-Zusammenfassung",
  "reports.types.assetsDesc": "\nVermögenswerte nach Art, Zustand und Buchwertaufschlüsselung",
  "reports.types.predictions": "\nZusammenfassung der Vorhersagen",
  "reports.types.predictionsDesc":
    "\nAusfall- und Verschlechterungsvorhersagen nach Schweregrad und Typ",
  "reports.types.utilisation": "\nNutzungszusammenfassung",
  "reports.types.utilisationDesc": "\nAsset-Nutzungsraten und Belegungskennzahlen",
  "reports.types.executive": "\nZusammenfassung",
  "reports.types.executiveDesc": "\nWichtige Leistungsindikatoren und Systemübersicht",
  "reports.types.estateOperational": "\nBetriebsbild des Anwesens",
  "reports.types.estateOperationalDesc":
    "\nIntegrierte DIO-bezogene Berichterstattung über Zustand, Lebenszyklus, Bereitschaft, Projekte, Inspektionen und Personalaktivität",
  "reports.types.strategicDecision": "\nStrategische Entscheidungsintelligenz",
  "reports.types.strategicDecisionDesc":
    "\nLebenszyklusanalyse, Infrastrukturrisiko, Vorhersagedruck, Leistungsanalyse und Investitionspriorisierung in einem Entscheidungspaket",
  "reports.types.workOrders": "\nArbeitsauftragsdurchsatz",
  "reports.types.workOrdersDesc":
    "\nBetriebsdurchsatz, Produktivität der Belegschaft, SLA-Druck und Schadensbegrenzungskosten für alle Arbeitsaufträge",
  "reports.types.purchaseOrders": "\nFälligkeit der Bestellung",
  "reports.types.purchaseOrdersDesc":
    "\nLieferdruck des Lieferanten, Durchlaufzeit und zugesagte Ausgaben für alle Bestellungen",
  "reports.types.customerOrders": "\nKundenbestellungstrichter",
  "reports.types.customerOrdersDesc":
    "\nVerlauf der Kundenbestellung von der Genehmigung bis zur Erfüllung und Fertigstellung",
  "reports.types.invoices": "\nRechnungsalterung",
  "reports.types.invoicesDesc":
    "\nAusstehende Salden, Inkassostatus und Überfälligkeitsdruck auf allen Rechnungen",
  "reports.types.rfqs": "\nRFQ-Konvertierung",
  "reports.types.rfqsDesc":
    "\nRFQ-Qualifizierung, Angebotserstellung, Annahme und Umsetzung in Kundenaufträge",
  "reports.summary": "\nZusammenfassung",
  "reports.topAssets": "\nTop-Assets",
  "reports.asset": "\nAsset",
  "reports.bookValue": "\nBuchwert",
  "reports.severity": "\nSchweregrad",
  "reports.severity.info": "\nInfo",
  "reports.severity.warning": "\nWarnung",
  "reports.severity.critical": "\nKritisch",
  "reports.severity.emergency": "\nNotfall",
  "reports.totalAssets": "\nGesamtvermögen",
  "reports.totalBookValue": "\nGesamtbuchwert",
  "reports.adjustedExposure": "\nAngepasste Belichtung",
  "reports.byType": "\nNach Typ",
  "reports.byCondition": "\nNach Bedingung",
  "reports.bySeverity": "\nVon Severity",
  "reports.type": "\nTyp",
  "reports.condition": "\nBedingung",
  "reports.status": "\nStatus",
  "reports.columns.workOrder": "\nArbeitsauftrag",
  "reports.columns.activity": "\nAktivität",
  "reports.columns.region": "\nRegion",
  "reports.columns.labourHours": "\nArbeitsstunden",
  "reports.columns.productivity": "\nProduktivität",
  "reports.columns.cycleHours": "\nZyklusstunden",
  "reports.columns.cost": "\nKosten",
  "reports.columns.mitigation": "\nSchadensbegrenzung",
  "reports.columns.purchaseOrder": "\nBestellung",
  "reports.columns.vendor": "\nAnbieter",
  "reports.columns.ageDays": "\nAlterstage",
  "reports.columns.order": "\nBestellen",
  "reports.columns.customer": "\nKunde",
  "reports.columns.workOrders": "\nArbeitsaufträge",
  "reports.columns.invoice": "\nRechnung",
  "reports.columns.due": "\nFällig",
  "reports.columns.rfq": "Angebotsanfrage",
  "reports.columns.title": "\nTitel",
  "reports.count": "\nCount",
  "reports.recentPredictions": "\nAktuelle Vorhersagen",
  "reports.remainingDays": "\nTage übrig",
  "reports.confidence": "\nVertrauen",
  "reports.avgUtilisation": "\nDurchschnittliche Auslastung",
  "reports.minMax": "\nMin. – Max.",
  "reports.topByUtilisation": "\nTop nach Nutzung",
  "reports.utilisation": "\nAuslastung",
  "reports.metric": "\nMetrik",
  "reports.value": "\nWert",
  "reports.overdueMaintenance": "\nÜberfällige Wartung",
  "reports.openDocuments": "\nDokumente öffnen",
  "reports.workOrders.open": "\nOffene Arbeitsaufträge",
  "reports.workOrders.reviewQueue": "\nRezensionswarteschlange",
  "reports.workOrders.completed": "\nAbgeschlossene Arbeitsaufträge",
  "reports.workOrders.breached": "\nSLA verletzt",
  "reports.workOrders.averageCycle": "\nDurchschnittlicher Zyklus",
  "reports.workOrders.productivity": "\nDurchschnittliche Produktivität",
  "reports.workOrders.mitigationCost": "\nSchadensbegrenzungskosten",
  "reports.workOrders.mitigationHours": "Schadensbegrenzungsstunden",
  "reports.workOrders.regionWatch": "\nBeobachtete Region",
  "reports.workOrders.improvementFocus": "\nVerbesserungsfokus",
  "reports.workOrders.mitigationActive": "\nSchadensbegrenzung aktiv",
  "reports.workOrders.mitigationClear": "\nAm Ziel",
  "reports.estate.readiness": "\nFähigkeitsbereitschaft",
  "reports.estate.rangeReadiness": "\nReichweitenbereitschaft",
  "reports.estate.criticalSignals": "\nKritische Signale",
  "reports.estate.approvalPressure": "\nGenehmigungsdruck",
  "reports.estate.approvalDelays": "\nVerspätete Genehmigungen",
  "reports.estate.labourHours": "\nProtokollierte Arbeitsstunden",
  "reports.strategy.priorityFocus": "\nPrioritätsfokus",
  "reports.strategy.lifecyclePressure": "\nLebenszyklusdruck",
  "reports.strategy.infrastructureRisk": "\nInfrastrukturrisiko",
  "reports.strategy.predictiveSignals": "\nVorhersagesignale",
  "reports.strategy.investmentPressure": "\nInvestitionsdruck",
  "reports.strategic.focus.lifecycle": "\nLebenszykluserneuerung",
  "reports.strategic.focus.infrastructure": "\nInfrastrukturrisiko",
  "reports.strategic.focus.predictive": "\nVorausschauende Wartung",
  "reports.strategic.focus.performance": "\nBetriebsleistung",
  "reports.strategic.focus.investment": "\nInvestitionspriorisierung",
  "reports.purchaseOrders.awaitingReceipt": "\nWarte auf Erhalt",
  "reports.purchaseOrders.overdue": "\nÜberfällige Bestellungen",
  "reports.purchaseOrders.avgLeadTime": "\nDurchschnittliche Vorlaufzeit",
  "reports.purchaseOrders.committed": "\nZugesagte Ausgaben",
  "reports.customerOrders.pending": " öffnen\nAusstehende Genehmigung",
  "reports.customerOrders.confirmed": "\nBestätigte Bestellungen",
  "reports.customerOrders.fulfilment": "\nIn Erfüllung",
  "reports.customerOrders.converted": "\nKonvertiert von RFQ",
  "reports.customerOrders.booked": "\nGebuchter Wert",
  "reports.invoices.outstanding": "\nAusstehender Betrag",
  "reports.invoices.overdue": "\nÜberfällige Rechnungen",
  "reports.invoices.collected": "\nBargeld gesammelt",
  "reports.invoices.partial": "\nTeilweise bezahlt",
  "reports.rfqs.submitted": "\nEingereichte RFQs",
  "reports.rfqs.quoted": "\nAngebotene RFQs",
  "reports.rfqs.accepted": "\nAkzeptierte RFQs",
  "reports.rfqs.converted": "\nKonvertierte RFQs",
  "reports.rfqs.averageBudget": "\nDurchschnittliches Budget",
  "reports.rfqs.pipeline": "\nAktive Pipeline",
  "reports.downloadPdf": "\nPDF",
  "reports.viewAnalysis": " herunterladen\nAnalyse",
  "reports.analysis": " anzeigen\nDatenanalyse",
  "reports.analysisLoading": "\nLadeanalyse…",
  "reports.ai.askAi": "\nFragen Sie AI",
  "reports.ai.askAiMissionAria": "\nFragen Sie AI nach dem empfohlenen nächsten Schritt",
  "reports.ai.askAiTemplateAria": "\nFragen Sie AI nach der Vorlage {name}",
  "reports.ai.askAiPackAria": "\nFragen Sie AI nach dem Berichtspaket {name}",
  "reports.ai.askAiSectionAria": "\nFragen Sie AI nach Abschnitt {name}",
  "reports.ai.askAiDrilldownAria": "\nFragen Sie AI nach Drilldown {name}",
  "reports.insights": "\nEinblicke",
  "reports.insights.depreciationCritical":
    "\n{count} kritische Vorhersage(n), die sich auf die Bewertung auswirken",
  "reports.insights.depreciationHealthy":
    "\nKeine kritischen Vorhersagen, die die Bewertung beeinflussen",
  "reports.insights.depreciationTotal": "\n{count} Vermögenswerte im Abschreibungsumfang",
  "reports.insights.topAssetType": "\n{type}: {count} Vermögenswerte",
  "reports.insights.noAssets": "\nKeine Assets im System",
  "reports.insights.criticalAssets": "\n{count} Vermögenswerte in kritischem Zustand",
  "reports.insights.noCritical": "\nKeine Vermögenswerte in kritischem Zustand",
  "reports.insights.predictionsDue": "\n{count} Vorhersage(n) fällig innerhalb von {days} Tagen",
  "reports.insights.noPredictionsDue": "\nKeine Vorhersagen innerhalb von {days} Tagen",
  "reports.insights.criticalPredictions": " fällig\n{count} kritische/Notfallvorhersage(n)",
  "reports.insights.highUtilisation":
    "\nHohe Auslastung – Kapazitätsüberprüfung in Betracht ziehen",
  "reports.insights.utilisationNormal": "\nAuslastung im Normalbereich",
  "reports.insights.utilisationMonitor":
    "\nDie Auslastung liegt außerhalb des bevorzugten Bereichs und sollte überwacht werden",
  "reports.insights.assetCount": "\n{count} Assets verfolgt",
  "reports.insights.overdueTasks": "\n{count} überfällige Wartungsaufgabe(n)",
  "reports.insights.noOverdue": "\nKeine überfälligen Wartungsaufgaben",
  "reports.insights.workOrders.breached":
    "\n{count} Arbeitsaufträge liegen derzeit außerhalb des SLA.",
  "reports.insights.workOrders.noBreach":
    "\nKeine der Stichproben-Arbeitsaufträge liegen außerhalb des SLA.",
  "reports.insights.workOrders.avgCycle":
    "\nDer durchschnittliche Fertigstellungszyklus beträgt {hours} Stunden aller letzten Fertigstellungen.",
  "reports.insights.workOrders.noCompleted":
    "\nFür die Durchsatzanalyse sind keine abgeschlossenen Arbeitsaufträge verfügbar.",
  "reports.insights.workOrders.productivity":
    "\nDie durchschnittliche Produktivität beträgt {rate} Produktionseinheiten pro Arbeitsstunde über {hours} protokollierte Stunden.",
  "reports.insights.workOrders.mitigationCost":
    "{count} verletzte Arbeitsanweisungen führen derzeit zu {cost} Schadensersatz über {hours} Arbeitsstunden.",
  "reports.insights.workOrders.noMitigation":
    "\nDerzeit gibt es für keine verletzten Arbeitsaufträge nachverfolgte Schadensbegrenzungsmaßnahmen.",
  "reports.insights.workOrders.activityWatch":
    "\n{activity} ist der Arbeitstyp mit der niedrigsten Produktivität bei {rate} Produktionseinheiten pro Arbeitsstunde.",
  "reports.insights.workOrders.regionWatch":
    "\n{region} ist die schwächste regionale Arbeitsbelastung bei {rate} Produktionseinheiten pro Arbeitsstunde.",
  "reports.insights.workOrders.improvementFocus":
    "\nPriorisieren Sie Maßnahmen zur Leistungsverbesserung rund um {focus}.",
  "reports.insights.workOrders.noImprovementFocus":
    "\nAus der aktuellen Arbeitsauftragsstichprobe zeichnet sich kein einzelner Verbesserungsschwerpunkt ab.",
  "reports.insights.estateOperational.infrastructureRisk":
    "\n{count} Immobilienrisikosignale sind in allen Zustands-, Inspektions- und Vorhersagedaten aktiv.",
  "reports.insights.estateOperational.infrastructureRiskClear":
    "\nIm gesamten integrierten Immobilienbild sind keine kritischen Immobilienrisikosignale aktiv.",
  "reports.insights.estateOperational.readinessGap":
    "\n{ready} der {total} verfolgten Funktionen sind vollständig bereit, wobei {constrainedSites} eingeschränkte Standort(e) die Bereitschaft noch beeinträchtigen.",
  "reports.insights.estateOperational.readinessClear":
    "\nNachverfolgte Funktionen sind derzeit ohne Einschränkungen auf Bestandsebene bereit.",
  "reports.insights.estateOperational.approvalDelay":
    "\n{delayed} Projektgenehmigung(en) verzögern sich, {queue} weitere Projekte befinden sich noch in der Warteschlange.",
  "reports.insights.estateOperational.approvalQueue":
    "\n{queue} Projektgenehmigung(en) verbleiben in der aktuellen Warteschlange.",
  "reports.insights.estateOperational.approvalClear":
    "\nDerzeit sind keine Projektgenehmigungen verzögert oder in der Warteschlange.",
  "reports.insights.estateOperational.inspectionBacklog":
    "\n{count} Prüfartikel sind überfällig, während {hours} Arbeitsstunden für die aktuelle Lieferaktivität protokolliert werden.",
  "reports.insights.estateOperational.workforceSignal":
    "\n{hours} Arbeitsstunden werden derzeit über die gesamte operative Lieferaktivität protokolliert.",
  "reports.insights.estateOperational.investmentPressure":
    "\n{count} Investitionsdrucksignale sind in {projects} Projekten und {initiatives} strategischen Initiative(n) aktiv.",
  "reports.insights.estateOperational.investmentStable":
    "\nStrategische Initiativen bleiben ohne zusätzliche Investitionsdrucksignale über den aktuellen Basiswert von {initiatives}.",
  "reports.insights.strategicDecision.lifecyclePressure":
    " hinaus registriert.\n{count} Lifecycle-Watch-Assets sind aktiv und repräsentieren {rate} % der aktuellen Immobilienbasis.",
  "reports.insights.strategicDecision.lifecycleStable":
    "\nDerzeit verzerren keine Lifecycle-Watch-Assets die strategische Investitionshaltung.",
  "reports.insights.strategicDecision.infrastructureRisk":
    "\n{count} Infrastrukturrisikosignale sind aktiv, was {rate} % der aktuellen Immobilienbasis entspricht.",
  "reports.insights.strategicDecision.infrastructureRiskClear":
    "Die Signale für Infrastrukturrisiken sind derzeit im gesamten strategischen Bild deutlich erkennbar.",
  "reports.insights.strategicDecision.predictiveLoad":
    "\n{count} Signale für die vorausschauende Wartung sind aktiv, einschließlich {critical} kritischer Vorhersage(n), wobei {rate} % der Vermögenswerte bald fällig sind.",
  "reports.insights.strategicDecision.predictiveClear":
    "\nDerzeit sind im gesamten überwachten Bereich deutliche Signale für die vorausschauende Wartung zu erkennen.",
  "reports.insights.strategicDecision.performanceSignal":
    "\nDie Betriebsleistung wird weiterhin von {focus} geprägt, mit einer Bereitschaft von {readiness} % und einer Produktivität von {productivity} Produktionseinheiten pro Arbeitsstunde.",
  "reports.insights.strategicDecision.performanceStable":
    "\nDie Betriebsleistung bleibt stabil mit einer Bereitschaft von {readiness} % und einer Produktivität von {productivity} Produktionseinheiten pro Arbeitsstunde.",
  "reports.insights.strategicDecision.investmentPriority":
    "\nDie Investitionspriorisierung wird derzeit von {focus} angeführt, wobei {count} verknüpfte Signale und {delayed} verzögerte Genehmigung(en) immer noch Auswirkungen auf die Warteschlange haben.",
  "reports.insights.strategicDecision.investmentStable":
    "\nDie strategische Investitionslage ist stabil, wobei {focus} weiterhin der führende Beobachtungsbereich und kein aktiver Druckkanal ist.",
  "reports.insights.purchaseOrders.overdue":
    "\n{count} Bestellungen haben ihr Fälligkeitsdatum überschritten.",
  "reports.insights.purchaseOrders.noOverdue": "\nDerzeit sind keine Bestellungen überfällig.",
  "reports.insights.purchaseOrders.awaitingReceipt":
    "\n{count} Bestellungen warten noch auf den vollständigen Eingang.",
  "reports.insights.purchaseOrders.avgLeadTime":
    "\nDie durchschnittliche Lieferzeit des Lieferanten beträgt {days} Tage.",
  "reports.insights.customerOrders.fulfilment":
    "\n{count} Kundenbestellung(en) befinden sich derzeit in der Ausführung.",
  "reports.insights.customerOrders.noFulfilment":
    "\nDerzeit befinden sich keine Kundenbestellungen in der Ausführung.",
  "reports.insights.customerOrders.converted":
    "\n{count} Kundenbestellung(en) wurden aus akzeptierten RFQs erstellt.",
  "reports.insights.invoices.overdue":
    "\n{count} Rechnung(en) sind überfällig und erfordern Nachverfolgung des Inkassos.",
  "reports.insights.invoices.noOverdue": "\nDerzeit sind keine Rechnungen überfällig.",
  "reports.insights.invoices.paymentMix":
    "\n{paidCount} Rechnung(en) sind vollständig bezahlt und {partialCount} bleiben teilweise bezahlt.",
  "reports.insights.rfqs.converted": "\n{count} RFQ(s) wurden in Kundenaufträge umgewandelt.",
  "reports.insights.rfqs.pipeline":
    "\n{count} RFQ(s) bleiben in der Qualifizierungs- oder Angebotsphase aktiv.",
  "reports.insights.rfqs.noPipeline":
    "\nDerzeit sind keine Ausschreibungen in der kommerziellen Pipeline aktiv.",
  "reports.unknownReportType": "\nUnbekannter Berichtstyp",
  "reports.generateFailed": "\nBerichterstellung fehlgeschlagen",
  "reports.dataset.prompt":
    "Überprüfen Sie den Datensatz {dataset}. Gesundheit ist {health}. Wichtige Kennzahlen: {metrics}. Einblicke: {insights}. Erklären Sie, was sich geändert hat, warum es wichtig ist und ob dieser Datensatz zum aktuellen Berichtspaket gehört.",
  "reports.pdfAuthor": "{brandName}",
  "reports.rawMetrics": "\nRohmetriken",
  "reports.rawMetricsLower": "\nRohmetriken",
  "reports.viewAnalysisAria": "\nAnalyse für {label}",
  "reports.journey.prompt.select":
    " ansehen\nWelche Datensätze sollte ich basierend auf dem aktuellen Berichtsarbeitsbereich und den ausgewählten Abschnitten ({sections}) in das nächste Paket aufnehmen und warum?",
  "reports.journey.prompt.change":
    "\nHelfen Sie mir, den aktuellen Bericht für die {audience}-Zielgruppe mit einem {focus}-Fokus zu ändern. Empfehlen Sie, wie Sie die Zielgruppe, den Fokus oder den Zeitraum anpassen und erläutern Sie die Kompromisse.",
  "reports.journey.prompt.modify":
    "\nSehen Sie sich das aktuelle Berichtspaket mit den Abschnitten {sections} an. Schlagen Sie konkrete Änderungen an der Erzählung, der Abschnittsmischung und der Reihenfolge vor.",
  "reports.journey.prompt.drilldown":
    "\nUntersuchen Sie den Datensatz {dataset}. Es ist derzeit mit {health} gekennzeichnet. Erklären Sie die wahrscheinlichen Treiber und die nächsten Drilldown-Fragen, die ich stellen sollte.",
  "reports.journey.prompt.drilldownUnavailable":
    "\nDerzeit ist kein Datensatz für den Drilldown priorisiert.",
  "reports.journey.prompt.drilldownFallback":
    "\nIdentifizieren Sie den nächsten Berichtsbereich, der einen Drilldown verdient, und erläutern Sie, welche Beweise ich zuerst untersuchen sollte.",
  "reports.journey.prompt.addData":
    "\nIdentifizieren Sie fehlende oder veraltete Daten in diesem Berichtsarbeitsbereich. Derzeit gibt es {offlineCount} Offline-Datensätze. Erklären Sie, welche Daten als Nächstes hinzugefügt oder aktualisiert werden sollen.",
  "reports.journey.prompt.addDataSource":
    "\nSagen Sie mir, welche zusätzlichen Beweise ich in {source} hinzufügen oder aktualisieren sollte, um dieses Berichtspaket zu verbessern.",
  "reports.ai.prompt.explainPosture":
    "\nErläutern Sie die aktuelle Berichterstattungslage, die wichtigsten Signale und worauf sich ein Leser aus der Finanz- oder Führungsebene als Nächstes konzentrieren sollte.",
  "reports.ai.prompt.modifyPack":
    "\nHelfen Sie mir, das aktuelle Berichtspaket für die {audience}-Zielgruppe mit einem {focus}-Fokus zu ändern. Die aktuellen Abschnitte sind {sections}. Empfehlen Sie, was hinzugefügt, entfernt oder festgezogen werden soll.",
  "reports.ai.prompt.findGaps":
    "\nIdentifizieren Sie fehlende Abdeckung oder veraltete Daten in diesem Berichtsarbeitsbereich und erläutern Sie, welche zusätzlichen Datensätze, Filter oder Aktualisierungen das Vertrauen verbessern würden.",
  "reports.ai.prompt.findGapsWithSource":
    "\nIdentifizieren Sie fehlende Abdeckung oder veraltete Daten in diesem Berichtsarbeitsbereich. Beginnen Sie mit {source} und erklären Sie, wie es das aktive Paket {pack}.",
  "reports.ai.prompt.sectionAnalysis":
    "Abschnitt {section} analysieren. Erklären Sie die wichtigsten Signale, Ausreißer und die nächsten Fragen, die ein Bediener stellen sollte.",
  "reports.templates.builtin.financeControl": "\nFinanzkontrollpaket",
  "reports.templates.builtin.financeControlDesc":
    "\nAbschreibungsrisiko und Zusammenfassung für die Finanzaufsicht",
  "reports.templates.builtin.riskWatch": "\nRisikoüberwachungspaket",
  "reports.templates.builtin.riskWatchDesc":
    "\nVorhersagen, Nutzung und Zusammenfassung für den Betrieb",
  "reports.templates.builtin.boardPack": "\nBoard-Paket",
  "reports.templates.builtin.boardPackDesc":
    "\nZusammenfassung mit Abschreibungen und Vermögensaufschlüsselung für die Führung",
  "reports.templates.builtin.fmGovernance": "\nFM-Governance-Paket",
  "reports.templates.builtin.fmGovernanceDesc":
    "\nFM-Governance-Haltung, Arbeitsauftragsdurchsatz und strategische Entscheidungsinformationen zur Risikoüberprüfung",
  "reports.templates.builtin.stewardship": "\nStewardship-Paket",
  "reports.templates.builtin.stewardshipDesc":
    "\nHaltung der Nachlassverwaltung mit Vermögensabdeckung und strategischer Entscheidungsintelligenz zur betrieblichen Überprüfung",
  "reports.templates.builtin.cateringEss": "\nCatering / ESS Pack",
  "reports.templates.builtin.cateringEssDesc":
    "\nBetriebsbild des Anwesens, Lieferdurchsatz und Führungsposition für Catering und ESS-Überwachung",
  "reports.templates.builtin.programmeControls": "\nProgrammsteuerungspaket",
  "reports.templates.builtin.programmeControlsDesc":
    "\nFührungsposition, Nachlassbereitstellungssignale und strategische Entscheidungsinformationen für die Programmsteuerung",
  "reports.builder.eyebrow": "\nBauträgerstudio",
  "reports.builder.title": "\nBenutzerdefinierter Berichtsgenerator",
  "reports.builder.description":
    "\nStellen Sie funktionsübergreifende Berichtspakete mit KI-Erzählungen, gespeicherten Vorlagen und tieferen Drilldowns zusammen.",
  "reports.builder.aiTitle": "\nBauherr-Copilot",
  "reports.builder.aiDescription":
    "\nNutzen Sie den Chat, um den Abschnittsmix, die Zielgruppeneinteilung und die Builder-Anleitung vor der Generierung einem Drucktest zu unterziehen.",
  "reports.builder.ai.planTitle": "\nAbschnitt mix",
  "reports.builder.ai.planDescription":
    " empfehlen\nÜberprüfen Sie die aktuelle Zielgruppe, den Fokus und die ausgewählten Abschnitte, bevor Sie das Paket neu generieren.",
  "reports.builder.ai.planPrompt":
    "\nEmpfehlen Sie die beste Abschnittsmischung für einen Bericht, der sich an die {audience}-Zielgruppe mit einem {focus}-Fokus richtet. Die aktuell ausgewählten Abschnitte sind {sections}. Erklären Sie, was vor der Generierung beibehalten, entfernt oder hinzugefügt werden soll.",
  "reports.builder.ai.guidanceTitle": "\nEntwurf einer Bedieneranleitung",
  "reports.builder.ai.guidanceDescription":
    "\nVerwandeln Sie das aktuelle Builder-Setup in eine prägnante Anleitung, die der Bediener anwenden oder in das Formular einfügen kann.",
  "reports.builder.ai.guidancePrompt":
    "Entwerfen Sie einen prägnanten Builder-Leitfaden für einen Bericht, der sich an die {audience}-Zielgruppe mit einem {focus}-Fokus richtet. Ausgewählte Abschnitte sind {sections}. Erzählung ist {includeNarrative}. Drilldowns sind {includeDrilldowns}. Schlagen Sie den endgültigen Leittext vor und erklären Sie, warum er das Paket verbessern wird.",
  "reports.builder.controlsTitle": "\nBuild-Parameter",
  "reports.builder.controlsDescription":
    "\nDefinieren Sie Zielgruppe, Fokus, Abdeckung und Bedienerführung für das generierte Berichtspaket.",
  "reports.builder.reportTitleLabel": "\nTitel des Berichts",
  "reports.builder.reportTitleHint":
    "\nWird als Überschrift für das generierte Berichtspaket verwendet.",
  "reports.builder.audienceLabel": "\nZielgruppe",
  "reports.builder.audience.risk": "\nRisiko und Sicherheit",
  "reports.builder.focusLabel": "\nFokus",
  "reports.builder.sectionsLabel": "\nAbschnitte",
  "reports.builder.sectionsHint":
    "\nWählen Sie mindestens einen Berichtsabschnitt aus, der einbezogen werden soll.",
  "reports.builder.includeNarrative": "\nErstellen Sie eine narrative Zusammenfassung",
  "reports.builder.includeNarrativeHint":
    "\nVerwendet den konfigurierten KI-Anbieter und greift bei Nichtverfügbarkeit auf eine deterministische Zusammenfassung zurück.",
  "reports.builder.includeDrilldowns": "\nDrilldowns einschließen",
  "reports.builder.includeDrilldownsHint":
    "\nFügen Sie jedem ausgewählten Abschnitt Betriebsdetails und tiefere Metriken auf Tabellenebene hinzu.",
  "reports.builder.guidanceLabel": "\nAnleitung",
  "reports.builder.guidanceHint":
    "\nOptionale Anleitung, die die generierte Erzählung und den Schwerpunkt prägt.",
  "reports.builder.seed.financePlanning.source": "\nFinanzplanung",
  "reports.builder.seed.financePlanning.alert":
    "\nGesät von {source}: {title}. Überprüfen Sie den geerbten Bereich, bevor Sie das Paket generieren.",
  "reports.builder.seed.financePlanning.title": "\nÜbergabe der Finanzplanung",
  "reports.builder.seed.financePlanning.description":
    "\nDiese Builder-Sitzung wurde aus einem Finanzszenario vorgeladen, sodass das Berichtspaket den genehmigten Planungskontext wiederverwenden kann.",
  "reports.builder.seed.financePlanning.scopeLabel": "\nGeltungsbereich",
  "reports.builder.seed.financePlanning.horizonLabel": "\nHorizont",
  "reports.builder.seed.financePlanning.horizonValue": "\n{months} Monate",
  "reports.builder.seed.financePlanning.guidanceLabel": "\nGeerbte Anleitung",
  "reports.builder.generate": "\nBerichtspaket generieren",
  "reports.builder.loadDataset": "\nDatensatz laden",
  "reports.builder.loadDatasetAria": "\nDatensatz {name} in den Builder laden",
  "reports.builder.loadTemplate": "\nVorlage laden",
  "reports.builder.loadTemplateAria": "\nVorlage {name} in den Builder laden",
  "reports.builder.loadCurrentPack": "\nAktuelles Paket laden",
  "reports.builder.loadCurrentPackAria": "\nAktuelles Paket {name} in den Builder laden",
  "reports.builder.loadSection": "\nAbschnitt laden",
  "reports.builder.loadSectionAria": "\nAbschnitt {name} in den Builder laden",
  "reports.builder.loadDrilldown": "\nDrilldown laden",
  "reports.builder.loadDrilldownAria": "\nDrilldown {name} in den Builder laden",
  "reports.builder.loadedDataset": "\nBuilder aktualisiert aus Datensatz {name}.",
  "reports.builder.loadedTemplate": "\nBuilder aktualisiert von der Vorlage {name}.",
  "reports.builder.loadedSection": "\nDer Builder konzentrierte sich auf Abschnitt {name}.",
  "reports.builder.loadedPack": "\nBuilder aktualisiert vom Berichtspaket {name}.",
  "reports.builder.audience.finance": "\nFinanzen",
  "reports.builder.audience.operations": "\nOperationen",
  "reports.builder.audience.executive": "\nGeschäftsführer",
  "reports.templates.saveTitle": "\nAktuellen Builder als template",
  "reports.templates.saveDescription":
    " speichern\nBehalten Sie die aktuelle Abschnittsmischung, Zielgruppe und Berichtsoptionen als wiederverwendbares Paket bei.",
  "reports.templates.nameLabel": "\nVorlagenname",
  "reports.templates.descriptionLabel": "\nBeschreibung",
  "reports.templates.saveAction": "\nVorlage speichern",
  "reports.templates.error.invalid":
    "\nUngültige Vorlage. Name und mindestens ein Abschnitt sind erforderlich.",
  "reports.templates.error.saveFailed":
    "\nVorlage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",
  "reports.builder.focus.financial": "\nFinanzielle",
  "reports.builder.focus.operations": "\nOperationen",
  "reports.builder.focus.risk": "\nRisiko",
  "reports.builder.focus.executive": "\nGeschäftsführer",
  "reports.custom.sectionsTitle": "Verfügbare Abschnitte",
  "reports.custom.previewTitle": "\nAktiver Berichtsarbeitsbereich",
  "reports.custom.previewDescription":
    "\nVom Server gerendertes Berichtspaket mit Beschreibung, Abschnittsanalyse und Live-Drilldown-Daten.",
  "reports.custom.error.invalid":
    "\nWählen Sie mindestens einen Berichtsabschnitt aus, um ein benutzerdefiniertes Paket zu generieren.",
  "reports.custom.generatedTitleSingle": "Für {audience}: {primarySection}",
  "reports.custom.generatedTitlePair": "Für {audience}: {primarySection} und {secondarySection}",
  "reports.custom.fallbackNarrativeIntro":
    "\nDie Berichterstattung umfasst {count} Abschnitte für die {audience} Zielgruppe mit einem {focus} Fokus.",
  "reports.custom.narrativeDisabled":
    "\nDie narrative Synthese ist für diesen Berichtsbuild deaktiviert.",
  "reports.custom.workspaceEmpty":
    "\nFühren Sie eine Vorlage aus oder wählen Sie Abschnitte aus, um ein Live-Berichtspaket zusammenzustellen.",
  "reports.custom.fallbackNarrativeGuidance": "\nBedienerführung: {guidance}.",
  "reports.custom.section.depreciation":
    "\nDas Abschreibungsrisiko beträgt {adjustedExposure} für {totalAssets} Vermögenswerte.",
  "reports.custom.section.assets":
    "\n{criticalAssets} kritische Assets werden auf {totalTypes} verfolgte Asset-Typen verteilt.",
  "reports.custom.section.predictions":
    "\nBald sind {predictionsDue} Vorhersagefenster fällig, darunter {criticalCount} kritische Signale.",
  "reports.custom.section.utilisation":
    "\nDie durchschnittliche Auslastung beträgt {utilisationRate} über {assetCount} aktive Assets.",
  "reports.custom.section.executive":
    "\n{activeTasks} offene Aufgaben und {openDocuments} Betriebsdokumente bleiben in allen Liefer- und Umsatz-Workflows aktiv.",
  "reports.custom.section.estateOperational":
    "\n{criticalSignals} Immobilienrisikosignale bleiben aktiv, die Fähigkeitsbereitschaft liegt bei {readiness} und {delayed} Projektgenehmigung(en) sind verzögert.",
  "reports.custom.section.strategicDecision":
    "\nStrategische Entscheidungsintelligenz wird derzeit von {focus} geleitet, mit {riskCount} Signalen für Infrastrukturrisiken und {investmentCount} Signalen für Investitionsdruck.",
  "reports.custom.section.workOrders":
    "\n{breachedCount} Arbeitsaufträge liegen außerhalb des SLA, die durchschnittliche Produktivität beträgt {productivityRate} und die Schadensbegrenzungskosten belaufen sich auf {mitigationCost}.",
  "reports.custom.section.purchaseOrders":
    "\n{overdueCount} Bestellungen sind überfällig und die durchschnittliche Vorlaufzeit beträgt {avgLeadDays} Tage.",
  "reports.custom.section.customerOrders":
    "\n{fulfilmentCount} Kundenaufträge befinden sich in der Ausführung und {convertedCount} stammen aus RFQs.",
  "reports.custom.section.invoices":
    "\n{overdueCount} Rechnungen sind überfällig und {outstandingAmount} sind noch ausstehend.",
  "reports.custom.section.rfqs":
    "\n{convertedCount} RFQs wurden in Bestellungen umgewandelt und {quotedCount} verbleiben im Angebotsstadium.",
  "reports.drilldown.band.overloaded": "\nÜberladen",
  "reports.drilldown.band.watch": "\nAnsehen",
  "reports.drilldown.band.stable": "\nStabil",
  "reports.drilldown.depreciationTitle": "\nDrilldown zum Abschreibungsrisiko",
  "reports.drilldown.depreciationDescription":
    "\nHöchstwertkonzentration, aktueller Zustand und aktuelle Schweresignale für abschreibungsempfindliche Vermögenswerte.",
  "reports.drilldown.assetsTitle": "\nDrilldown zur Vermögenszusammensetzung",
  "reports.drilldown.assetsDescription":
    "\nPortfoliozusammensetzung nach Standort, Art, Zustand und aktueller Buchwertkonzentration.",
  "reports.drilldown.predictionsTitle": "Prognosedruck-Drilldown",
  "reports.drilldown.predictionsDescription":
    "\nAktuelle Vorhersageereignisse mit Schweregrad, Konfidenz und verbleibendem Lebenskontext.",
  "reports.drilldown.utilisationTitle": "\nDrilldown zur Auslastungsintensität",
  "reports.drilldown.utilisationDescription":
    "\nAuf den Arbeitsbereich abgestimmter Nutzungsstatus im gesamten aktuellen Portfolio mit Standort, Asset-Typ und aktuellem Lastkontext.",
  "reports.drilldown.maxUtilisation": "\nSpitzenauslastung",
  "reports.drilldown.bandTitle": "\nHaltung",
  "reports.drilldown.executiveTitle": "\nDrilldown zum Führungsdruck",
  "reports.drilldown.executiveDescription":
    "\nBetriebsdrucksignale, die sich über den Wartungsrückstand, das prognostizierte Risiko, den Dokumentenfluss und den Portfoliowert erstrecken.",
  "reports.drilldown.estateOperationalTitle": "\nDrilldown zum Betriebsbild des Anwesens",
  "reports.drilldown.estateOperationalDescription":
    "\nIntegrierte Lage auf Immobilienebene über Zustand, Lebenszyklus, Bereitschaft, Inspektionen, Projektgenehmigungen und Lieferdruck.",
  "reports.drilldown.strategicDecisionTitle":
    "\nDrilldown zur strategischen Entscheidungsintelligenz",
  "reports.drilldown.strategicDecisionDescription":
    "\nVerfolgen Sie Lebenszyklusrisiken, Infrastrukturrisiken, vorausschauende Nachfrage, Betriebsleistung und Investitionsschwerpunkte aus einem strategischen Informationspaket.",
  "reports.drilldown.workOrdersTitle": "\nDrilldown zum Arbeitsauftragsdurchsatz",
  "reports.drilldown.workOrdersDescription":
    "\nAktuelle Arbeitsaufträge mit regionalem Umfang, Aktivitätsmix, Produktivitätsstatus, Schadensbegrenzungsstatus und nachverfolgten Ausführungskosten.",
  "reports.drilldown.purchaseOrdersTitle": "\nDrilldown zur Fälligkeit der Bestellung",
  "reports.drilldown.purchaseOrdersDescription":
    "\nAktuelle Bestellungen mit Anbietereigentum, Fälligkeit, Lieferstatus und zugesagtem Handelswert.",
  "reports.drilldown.customerOrdersTitle": "\nDrilldown zum Kundenauftragstrichter",
  "reports.drilldown.customerOrdersDescription":
    "\nAktuelle Kundenbestellungen mit Erfüllungsstatus, verknüpftem Arbeitsauftragsvolumen und gebuchtem Wert.",
  "reports.drilldown.invoicesTitle": "\nDrilldown zur Fälligkeit der Rechnung",
  "reports.drilldown.invoicesDescription":
    "\nAktuelle Rechnungen mit Kundeneigentum, ordnungsgemäßem Status, ausstehendem Wert und Zahlungsbewegung.",
  "reports.drilldown.rfqsTitle": "\nRFQ-Konvertierungs-Drilldown",
  "reports.drilldown.rfqsDescription":
    "\nAktuelle Ausschreibungen mit kommerzieller Phase, angegebenem Budget und Transparenz der nachgelagerten Auftragskonvertierung.",
  "reports.drilldown.empty.workOrders": "\nFür den Drilldown sind keine Arbeitsaufträge verfügbar.",
  "reports.drilldown.empty.estateOperational":
    "\nFür den Drilldown sind keine Betriebsbildsignale des Anwesens verfügbar.",
  "reports.drilldown.empty.strategicDecision":
    "\nFür den Drilldown sind keine strategischen Entscheidungsintelligenzsignale verfügbar.",
  "reports.drilldown.empty.purchaseOrders":
    "\nFür den Drilldown sind keine Bestellungen verfügbar.",
  "reports.drilldown.empty.customerOrders":
    "\nEs sind keine Kundenaufträge für den Drilldown verfügbar.",
  "reports.drilldown.empty.invoices": "\nEs sind keine Rechnungen für den Drilldown verfügbar.",
  "reports.drilldown.empty.rfqs": "Für den Drilldown sind keine RFQs verfügbar.",
  "reports.drilldown.outlookTitle": "\nAusblick",
  "reports.drilldown.noteTitle": "\nHinweis",
  "reports.drilldown.executive.openDocumentsNote":
    "\n{count} Betriebsdokumente bleiben aktiv: {rfqs} RFQs, {customerOrders} Kundenaufträge, {workOrders} Arbeitsaufträge, {purchaseOrders} Bestellungen und {invoices} Rechnungen.",
  "reports.drilldown.executive.openDocumentsClear":
    "\nDerzeit sind keine Betriebsdokumente geöffnet.",
  "reports.drilldown.executive.bookValueNote":
    "\nDie durchschnittliche Auslastung im gesamten Anwesen beträgt derzeit {rate}.",
  "reports.drilldown.estateOperational.row.condition": "\nZustand des Anwesens",
  "reports.drilldown.estateOperational.row.lifecycle": "\nLebenszyklusrisiko",
  "reports.drilldown.estateOperational.row.readiness": "\nTrainingsbereitschaft",
  "reports.drilldown.estateOperational.row.inspection": "\nInspektion und Personal",
  "reports.drilldown.estateOperational.row.approvals": "\nProjektgenehmigungen",
  "reports.drilldown.estateOperational.row.delivery": "\nProjektlieferung",
  "reports.drilldown.strategicDecision.row.lifecycle": "\nAnalyse des Asset-Lebenszyklus",
  "reports.drilldown.strategicDecision.row.infrastructure": "\nRisikobewertung der Infrastruktur",
  "reports.drilldown.strategicDecision.row.predictive": "\nPrädiktive Wartungsmodellierung",
  "reports.drilldown.strategicDecision.row.performance": "\nBetriebsleistungsanalyse",
  "reports.drilldown.strategicDecision.row.investment": "\nInvestitionspriorisierung",
  "reports.drilldown.estateOperational.value.condition":
    "\n{critical} kritisch für {total} verfolgte Assets",
  "reports.drilldown.estateOperational.value.lifecycle":
    "\n{critical} kritische Signale • {due} bald fällig",
  "reports.drilldown.estateOperational.value.readiness": "\n{ready} von {total} Fähigkeiten bereit",
  "reports.drilldown.estateOperational.value.inspection": "\n{count} überfällige Inspektion(en)",
  "reports.drilldown.estateOperational.value.approvals":
    "\n{delayed} verzögert • {queue} in der Warteschlange",
  "reports.drilldown.estateOperational.value.delivery":
    "\n{highRisk} hohes Risiko • {conflicts} Konflikt(e)",
  "reports.drilldown.strategicDecision.value.lifecycle":
    "\n{count} Lifecycle-Watch-Assets machen derzeit {rate} der Nachlassbasis aus.",
  "reports.drilldown.strategicDecision.value.infrastructure":
    "\n{count} Infrastrukturrisikosignale machen derzeit {rate} der Immobilienbasis aus.",
  "reports.drilldown.strategicDecision.value.predictive":
    "\n{count} vorausschauende Wartungssignale sind aktiv, einschließlich {critical} kritischer Vorhersage(n).",
  "reports.drilldown.strategicDecision.value.performance":
    "\nDie Fähigkeitsbereitschaft beträgt {readiness} und die Produktivität beträgt {productivity} Produktionseinheiten pro Arbeitsstunde.",
  "reports.drilldown.strategicDecision.value.investment":
    "\n{count} Anlagedrucksignal(e) sind aktiv, angeführt von {focus}.",
  "reports.drilldown.estateOperational.note.condition":
    "\n{watch} Vermögenswerte befinden sich in Überwachungs- oder Ermüdungsstadien des Lebenszyklus.",
  "reports.drilldown.estateOperational.note.lifecycle":
    "\n{initiatives} strategische Initiative(n) bleiben im Nachlassprogrammregister.",
  "reports.drilldown.estateOperational.note.readiness":
    "\n{rate} Reichweitenbereitschaft mit {constrainedSites} eingeschränkten Standort(en).",
  "reports.drilldown.estateOperational.note.inspection":
    "\n{hours} Arbeitsstunden, die über die aktuelle betriebliche Lieferaktivität protokolliert wurden.",
  "reports.drilldown.estateOperational.note.approvals":
    "\n{projects} Projekte, die derzeit im Immobilienportfolio registriert sind.",
  "reports.drilldown.estateOperational.note.delivery":
    "\n{count} aggregierte(s) Investitionsdrucksignal(e) sind aktiv.",
  "reports.drilldown.strategicDecision.note.lifecycle":
    "\n{total} Gesamtvermögenswert(e) sind in der aktuellen strategischen Basis dargestellt.",
  "reports.drilldown.strategicDecision.note.infrastructure":
    "\n{constrained} eingeschränkte Standorte und {inspections} überfällige Inspektion(en) tragen weiterhin zum Infrastrukturrisiko bei.",
  "reports.drilldown.strategicDecision.note.predictive":
    "{due} Vorhersage(n) sind bald fällig, was {rate} der Nachlassbasis entspricht.",
  "reports.drilldown.strategicDecision.note.performance":
    "\n{focus} ist derzeit der führende Leistungsüberwachungsbereich, wobei {mitigationCost} mit Abhilfemaßnahmen verknüpft ist.",
  "reports.drilldown.strategicDecision.note.investment":
    "\n{delayed} verspätete Genehmigung(en) und {projects} Projektabgabedrucksignal(e) bleiben aktiv.",
  "reports.drilldown.open": "\nDrilldown öffnen",
  "reports.drilldown.openAria": "\nDrilldown für {label}",
  "reports.drilldown.tableAria": " anzeigen\nDrilldown-Daten für {title}",
  "reports.drilldown.consoleEyebrow": "\nDrilldown-Konsole",
  "reports.drilldown.consoleDescription":
    "\nGehen Sie von zusammenfassenden Metriken zu operativen Zeilen, Konzentrationssignalen und handlungsbereiten Details über.",
  "reports.drilldown.consoleTitle": "\nDrilldown-Konsole",
  "reports.custom.sourceAi": "\nKI-Erzählung",
  "reports.custom.sourceSystem": "\nRegelbasierte Zusammenfassung",
  "reports.custom.provenance.financePlanning": "\nGesät aus Finance Planning",
  "reports.custom.provenance.summary":
    "\nGesät von {title} für {scope} über einen Planungshorizont von {months} Monaten.",
  "reports.custom.templateApplied": "\nVorlage: {name}",
  "reports.custom.coverageTitle": "\nAbdeckungswert",
  "reports.custom.coverageDescription": "\n{count} Abschnitte sind in diesem Paket enthalten.",
  "reports.custom.tablePreview":
    "\nIn dieser Abschnittsvorschau werden {visible} von {total} Zeilen angezeigt.",
  "reports.custom.guidanceApplied": "\nAngewendete Leitlinien: {guidance}",
  "reports.custom.narrativeTitle": "\nZusammenfassung der Erzählung",
  "reports.templates.libraryTitle": "\nVorlagenbibliothek",
  "reports.templates.libraryDescription":
    "\nIntegrierte und gespeicherte Berichtspakete, die Bediener direkt im aktiven Berichtsarbeitsbereich starten können.",
  "reports.templates.badgeBuiltin": "\nEingebaut",
  "reports.templates.badgeCustom": "\nGespeichert",
  "reports.templates.badgeNarrative": "\nErzählung",
  "reports.templates.badgeDrilldowns": "\nDrilldowns",
  "reports.templates.run": "\nFühren Sie pack",
  "reports.templates.runAria": " aus\nPaket ausführen: {name}",
  "reports.templates.saved": "\nVorlage in der Bibliothek gespeichert.",
  "utilisation.title": "\nAuslastung",
  "utilisation.subtitle":
    "\nEnterprise-Nutzungscockpit für Telemetrie, KI-Signale und Betriebsabläufe",
  "utilisation.cockpit.chatContext":
    "\nAuslastungs-Cockpit-Seite. Einheitlicher Arbeitsbereich für Flottenauslastungsstatus, Telemetrieaktualität, KI-Vorhersagekontext, Wartungsrückstand, Standortvergleich, Befehlsstatistiken, KI-Copilot-Aktionen, Workflow-Drillthrough, Standort-Bestenliste, Auslastungsmatrix, Aktionswarteschlange, Trendboard, Chronologie und die sortierbare Portfoliotabelle. Steuerelemente: Website-Filter, Datumsbereich, Seitengröße, CSV-Export und Filter löschen.",
  "utilisation.cockpit.hero.eyebrow": "\nAuslastungscockpit",
  "utilisation.cockpit.hero.title":
    "\nTelemetrie, KI-Signale und Kapazitätsfluss in einem Arbeitsbereich",
  "utilisation.cockpit.hero.description":
    "\nVerfolgen Sie den Standortdruck, nicht ausgelastete Kapazitäten, veraltete Telemetriedaten und den Wartungskontext in einem Power BI-ähnlichen Auslastungscockpit, das für die betriebliche Entscheidungsfindung konzipiert ist.",
  "utilisation.cockpit.hero.live": "\nAutomatische Aktualisierung alle {seconds} Sekunden",
  "utilisation.cockpit.filters.eyebrow": "\nFilter",
  "utilisation.cockpit.filters.title": "\nBereich des Arbeitsbereichs",
  "utilisation.cockpit.filters.description":
    "Filtern Sie das Cockpit nach Standort und Zeitfenster, optimieren Sie die Tabellendichte und exportieren Sie die aktuelle Analyseansicht.",
  "utilisation.cockpit.filters.exportDescription":
    "\nExportiert das aktuell gefilterte Nutzungsportfolio im CSV-Format.",
  "utilisation.cockpit.legend.eyebrow": "\nPerformance-Bands",
  "utilisation.cockpit.legend.title": "\nLesen Sie die Haltungsbänder",
  "utilisation.cockpit.legend.description":
    "\nJeder Vermögenswert wird in eine deterministische Betriebsstellung eingeteilt, sodass dieselben Schwellenwerte für Karten, Warteschlangen und die Portfoliotabelle gelten.",
  "utilisation.cockpit.legend.optimal":
    "\nAnlagen, die im bevorzugten Nutzungsband mit ausgeglichener Last und gesunder Telemetrieabdeckung laufen.",
  "utilisation.cockpit.legend.watch":
    "\nVermögenswerte tendieren außerhalb des bevorzugten Bereichs und sollten beobachtet werden, bevor sie zu Druckpunkten werden.",
  "utilisation.cockpit.legend.under":
    "\nAnlagen, die unterhalb des Zielbands betrieben werden, was auf freie Kapazität oder ein mögliches Nachfrageungleichgewicht hinweist.",
  "utilisation.cockpit.legend.over":
    "\nVermögenswerte, die über dem Schwellenwert betrieben werden und höchstwahrscheinlich eine Entlastung, Inspektion oder Neuzuweisung benötigen.",
  "utilisation.cockpit.actions.eyebrow": "\nVerbundene Arbeitsabläufe",
  "utilisation.cockpit.actions.title": "\nHalten Sie den Fluss in Bewegung",
  "utilisation.cockpit.actions.description":
    "\nSpringen Sie direkt vom Auslastungsstatus in die Arbeitsabläufe, die den Kapazitätsdruck erklären oder beheben.",
  "utilisation.cockpit.actions.predictions":
    "\nÜberprüfen Sie KI-Vorhersagen und Restlebensdauersignale, die sich auf heiße oder instabile Anlagen auswirken.",
  "utilisation.cockpit.actions.tasks":
    "\nBeseitigen Sie Wartungsrückstände und überfällige Arbeiten im Zusammenhang mit Auslastungsdruck.",
  "utilisation.cockpit.actions.reports":
    "\nGenerieren Sie Stakeholder-bereite Berichte aus demselben Nutzungsdatensatz.",
  "utilisation.filters.title": "\nPortfoliofilter",
  "utilisation.filters.description":
    "\nWenden Sie Änderungen an Website, Zeitfenster und Seitengröße gemeinsam an, bevor Sie das Nutzungsregister aktualisieren.",
  "utilisation.filters.batchMode": "\nBatch-Filter",
  "utilisation.filters.applyHint":
    "\nVerwenden Sie „Filter anwenden“, um den Zusammenfassungsstreifen, das Register und den Inspektor gemeinsam zu aktualisieren.",
  "utilisation.cockpit.briefing.title": "\nNutzungsbeschreibung",
  "utilisation.cockpit.briefing.eyebrow": "\nPortfolio-Kurzfassung",
  "utilisation.cockpit.briefing.headlineDemand":
    "\nDer Nachfragedruck konzentriert sich auf eine kleine Gruppe von Vermögenswerten",
  "utilisation.cockpit.briefing.headlineCapacity":
    "\nDie freie Kapazität ist im gesamten aktuellen Portfolio sichtbar",
  "utilisation.cockpit.briefing.headlineData":
    "\nDie Aktualität der Telemetrie schränkt die Auslastung ein. picture",
  "utilisation.cockpit.briefing.headlineBalanced":
    "\nDie Auslastungslage ist im aktuellen Umfang weitgehend ausgewogen",
  "utilisation.cockpit.briefing.summary":
    "\nFür {site} über {period} beträgt die durchschnittliche Flottenauslastung {average}. Die Telemetrie deckt derzeit {telemetry}-Assets ab, wobei {over} heiß läuft und {under} freie Kapazität anzeigt.",
  "utilisation.cockpit.briefing.recommendationTitle": "\nEmpfohlener nächster Schritt",
  "utilisation.cockpit.briefing.recommendationPortfolio":
    "Derzeit dominiert kein einzelnes Asset die Warteschlange. Halten Sie die Telemetrie im gesamten {site} auf dem neuesten Stand und konzentrieren Sie sich auf die Aufrechterhaltung einer ausgewogenen Abdeckung.",
  "utilisation.cockpit.briefing.recommendationAsset":
    "\nPriorisieren Sie als nächstes {asset}. Basierend auf dem Nutzungsstatus, dem KI-Signalkontext und dem aktiven Arbeitsrückstand ist es derzeit der stärkste Kandidat für „{action}“.",
  "utilisation.cockpit.generatedAt": "\nGeneriert {date}",
  "utilisation.cockpit.datasets.title": "\nDatensatzabdeckung",
  "utilisation.cockpit.datasets.description":
    "\nDas Cockpit kombiniert Telemetrie, KI-Vorhersagekontext und Arbeitsausführungssignale in einer Entscheidungsoberfläche.",
  "utilisation.cockpit.datasets.assetsTitle": "\nVermögenswerte im Geltungsbereich",
  "utilisation.cockpit.datasets.assetsDescription":
    "\n{sites} Websites, die im aktuell gefilterten Portfolio vertreten sind",
  "utilisation.cockpit.datasets.telemetryTitle": "\nTelemetriewerte",
  "utilisation.cockpit.datasets.telemetryDescription":
    "\n{count} Assets mit Telemetrie im ausgewählten Zeitraum",
  "utilisation.cockpit.datasets.aiTitle": "\nKI-gestützte Signale",
  "utilisation.cockpit.datasets.aiDescription":
    "\n{due} Vermögenswerte bald fällig, basierend auf der prognostizierten Restlaufzeit",
  "utilisation.cockpit.datasets.tasksTitle": "\nOffene Arbeitselemente",
  "utilisation.cockpit.datasets.tasksDescription":
    "\n{overdue} überfällige Aufgaben beeinträchtigen derzeit den Kapazitätsfluss",
  "utilisation.cockpit.command.coverageTitle": "\nTelemetrieabdeckung",
  "utilisation.cockpit.command.coverageDescription":
    "\n{covered} abgedeckt • {blind} blinde Flecken • {stale} veraltete Feeds",
  "utilisation.cockpit.command.aiTitle": "\nKI-Abdeckung",
  "utilisation.cockpit.command.aiDescription":
    "\n{signals} Assets mit KI-Signalen • {due} bald fällig",
  "utilisation.cockpit.command.pressureTitle": "\nDruckmittel",
  "utilisation.cockpit.command.pressureDescription":
    "\n{hot} heiß • {under} nicht ausreichend genutzt • {stale} veraltet",
  "utilisation.cockpit.command.documentsTitle": "\nDokumentenfluss öffnen",
  "utilisation.cockpit.command.documentsDescription":
    "\n{workOrders} Arbeitsaufträge und {documents} insgesamt verknüpfte Dokumente bleiben aktiv.",
  "utilisation.cockpit.kpi.averageTitle": "\nFlottendurchschnitt",
  "utilisation.cockpit.kpi.averageDescription":
    "\nDurchschnittliche Auslastung im gesamten gefilterten Portfolio, normalisiert auf eine Betriebsskala von 0–100.",
  "utilisation.cockpit.kpi.optimalTitle": "\nOptimale Vermögenswerte",
  "utilisation.cockpit.kpi.optimalDescription":
    "\nVermögenswerte, die innerhalb des bevorzugten Nutzungsbandes betrieben werden.",
  "utilisation.cockpit.kpi.warningTitle": "\nWatchlist-Assets",
  "utilisation.cockpit.kpi.warningDescription":
    "\n{under} nicht ausreichend genutzt und {watch} außerhalb des bevorzugten Bandes, aber noch nicht kritisch.",
  "utilisation.cockpit.kpi.criticalTitle": "\nKritische Aufmerksamkeit",
  "utilisation.cockpit.kpi.criticalDescription":
    "\n{over} läuft heiß und {stale} mit fehlender oder veralteter Telemetrie.",
  "utilisation.inspector.summary.pressureBadge": "\n{count} Live-Ausnahmen",
  "utilisation.inspector.summary.telemetryBadge": "\n{count} Telemetrieausnahmen",
  "utilisation.inspector.summary.averageHint":
    "\nAktueller Portfoliodurchschnitt über den gefilterten Nutzungsumfang.",
  "utilisation.inspector.summary.exceptionTitle": "\nAusnahmen",
  "utilisation.inspector.summary.exceptionHint":
    "\n{over} überlastet, {under} nicht ausreichend genutzt und {stale} veraltete Telemetrieressourcen sind aktiv.",
  "utilisation.inspector.summary.coverageHint":
    "\n{blind} blinde Flecken und {stale} veraltete Feeds schränken immer noch das Vertrauen ein.",
  "utilisation.cockpit.posture.optimal": "\nOptimal",
  "utilisation.cockpit.posture.watch": "\nAnsehen",
  "utilisation.cockpit.posture.under": "\nNicht ausreichend genutzt",
  "utilisation.cockpit.posture.over": "\nÜberladen",
  "utilisation.cockpit.site.title": "\nSite-Bestenliste",
  "utilisation.cockpit.site.description":
    "\nVergleichen Sie die Standortlage nach durchschnittlicher Auslastung, Live-Telemetrie-Abdeckung und Druckmix.",
  "utilisation.cockpit.site.empty":
    "Für die aktuellen Filter sind keine Website-Leistungsdaten verfügbar.",
  "utilisation.cockpit.site.meta": "\n{assets} Assets • {telemetry} mit Telemetrie",
  "utilisation.cockpit.site.share": "\n{share} der sichtbaren Assets",
  "utilisation.cockpit.site.over": "\n{count} heiß",
  "utilisation.cockpit.site.under": "\n{count} nicht ausreichend genutzt",
  "utilisation.cockpit.site.watch": "\n{count} ansehen",
  "utilisation.cockpit.site.optimal": "\n{count} optimal",
  "utilisation.cockpit.queue.title": "\nAktionswarteschlange",
  "utilisation.cockpit.queue.description":
    "\nAnlagen sortiert nach Druck, Aktualität der Telemetrie, Schweregrad des KI-Signals und ungelöster betrieblicher Arbeit.",
  "utilisation.cockpit.queue.empty":
    "\nDerzeit sind keine Elemente der Nutzungsaktionswarteschlange aktiv.",
  "utilisation.cockpit.queue.current": "\nAktuell {current} • Durchschnitt {average}",
  "utilisation.cockpit.queue.tasks": "\n{open} offene Aufgaben • {overdue} überfällig",
  "utilisation.cockpit.queue.lifeUnknown":
    "\nMit diesem Vermögenswert ist keine Prognose für die verbleibende Lebensdauer verbunden.",
  "utilisation.cockpit.queue.lifeValue": "\n{days} Tage verbleibende Lebensdauer",
  "utilisation.cockpit.queue.telemetryMissing": "\nDerzeit ist keine Live-Telemetrie verfügbar.",
  "utilisation.cockpit.queue.telemetryFresh": "\nNeueste Telemetrie {date}",
  "utilisation.cockpit.mix.title": "\nHaltungsmix",
  "utilisation.cockpit.mix.description":
    "\nSehen Sie, wie sich das sichtbare Asset-Portfolio über die operativen Statusbänder verteilt.",
  "utilisation.cockpit.mix.empty": "\nFür das aktuelle Portfolio ist kein Haltungsmix verfügbar.",
  "utilisation.cockpit.mix.assetCount": "\n{count} Vermögenswerte",
  "utilisation.cockpit.mix.average": "\nDurchschnittlich {value}",
  "utilisation.cockpit.matrix.title": "\nAuslastungsmatrix",
  "utilisation.cockpit.matrix.description":
    "\nEin ausgewogenes Fokusraster für überlastete, nicht ausreichend genutzte, überwachte und optimale Vermögenswerte, geordnet nach betrieblicher Wesentlichkeit.",
  "utilisation.cockpit.matrix.empty":
    "\nFür die aktuellen Filter sind keine Nutzungsmatrix-Assets verfügbar.",
  "utilisation.cockpit.matrix.average": "\nDurchschnittlich {value}",
  "utilisation.cockpit.copilot.title": "\nKI-Copilot",
  "utilisation.cockpit.copilot.description":
    "\nVerwandeln Sie den aktuellen Umfang in ein Executive Briefing, eine Datenvertrauensprüfung oder einen Interventionsplan, ohne das Cockpit zu verlassen.",
  "utilisation.cockpit.copilot.focus": "\nAktueller Fokus",
  "utilisation.cockpit.copilot.brief": "\nSchreiben Sie kurz",
  "utilisation.cockpit.copilot.briefPrompt":
    "\nSchreiben Sie einen Nutzungsbericht für Führungskräfte für {site} über {period}. Heben Sie die durchschnittliche Auslastung von {average}, {over} überlasteten Assets, {under} nicht ausreichend genutzten Assets und {stale} veralteten Telemetrie-Feeds hervor. Empfehlen Sie die nächsten operativen Maßnahmen.",
  "utilisation.cockpit.copilot.data": "\nDatenvertrauen prüfen",
  "utilisation.cockpit.copilot.dataPrompt":
    "\nBewerten Sie die Datenqualität für den aktuellen Auslastungsarbeitsbereich. Es gibt {covered}-Assets mit Telemetrie, {blind} ohne Telemetrie und {stale} veraltete Feeds. Erklären Sie, wie viel Vertrauen Betreiber in dieses Cockpit setzen sollten und welche Datenlücken zuerst behoben werden müssen.",
  "utilisation.cockpit.copilot.intervention": "\nEntwurf eines Interventionsplans",
  "utilisation.cockpit.copilot.interventionPromptAsset":
    "Entwerfen Sie einen Interventionsplan für Anlage {asset} bei {site}. Die aktuelle Auslastung beträgt {current}, der Durchschnitt ist {average}, die Körperhaltung ist {posture}, die empfohlene Aktion ist {action}, es gibt {open} offene Aufgaben und {overdue} überfällige Aufgaben und die verbleibende Lebensdauer beträgt {life}.",
  "utilisation.cockpit.copilot.interventionPromptPortfolio":
    "\nEntwerfen Sie einen Interventionsplan auf Portfolioebene für {site} über {period}. Konzentrieren Sie sich auf überlastete, nicht ausreichend genutzte und veraltete Telemetrieressourcen und planen Sie die nächsten Aktionen.",
  "utilisation.cockpit.workflow.title": "\nSystemübergreifendes Follow-through",
  "utilisation.cockpit.workflow.description":
    "\nGehen Sie von der Nutzungshaltung zu den Systemen über, die Risiken erklären, Arbeit klären oder die Geschichte für Stakeholder verpacken.",
  "utilisation.cockpit.workflow.predictionsMeta":
    "\n{signals} signalgestützte Vermögenswerte • {due} bald fällig",
  "utilisation.cockpit.workflow.tasksMeta": "\n{open} offene Aufgaben • {overdue} überfällig",
  "utilisation.cockpit.workflow.reportsMeta":
    "\n{blind} Telemetrie-Blindflecken • {documents} offene Dokumente",
  "utilisation.cockpit.workflow.fleetMeta":
    "\n{vehicles} Assets in Bewegung • {backlog} offene Aufgaben",
  "utilisation.cockpit.workflow.sensorsMeta":
    "\n{blind} Telemetrie-Blindflecken • {stale} veraltete Feeds",
  "utilisation.cockpit.workflow.buildingsMeta":
    "\n{sites} aktive Websites • {signals} KI-gestützte Assets",
  "utilisation.cockpit.trend.title": "\nTrendboard",
  "utilisation.cockpit.trend.description":
    "\nTägliche Nutzungstrendpunkte helfen Betreibern, Drift, Volatilität und Probenahmedichte im Laufe der Zeit zu erkennen.",
  "utilisation.cockpit.trend.empty":
    "\nFür das aktuelle Zeitfenster sind keine Auslastungstrendpunkte verfügbar.",
  "utilisation.cockpit.trend.samples": "\n{count} Telemetrieproben",
  "utilisation.cockpit.trend.low": "\nNiedrig {value}",
  "utilisation.cockpit.trend.high": "\nHoch {value}",
  "utilisation.cockpit.chronology.title": "\nNutzungschronologie",
  "utilisation.cockpit.chronology.description":
    "\nAktuelle Telemetrieereignisse bieten einen schnellen Prüfpfad darüber, wie die aktuelle Haltung beobachtet wurde.",
  "utilisation.cockpit.chronology.empty":
    "\nFür den aktuellen Filterbereich ist keine Telemetriechronologie verfügbar.",
  "utilisation.cockpit.chronology.value": "\nBeobachtet {value}",
  "utilisation.cockpit.table.title": "\nNutzungsportfolio",
  "utilisation.cockpit.table.description":
    "\nSortierbare Portfolioansicht, die aktuelle Auslastung, Trendrichtung, KI-Signalkontext und Warteschlangendruck kombiniert.",
  "utilisation.cockpit.table.live": "\nLive-Tabelle",
  "utilisation.cockpit.table.asset": "\nAsset",
  "utilisation.cockpit.table.current": "\nAktuell",
  "utilisation.cockpit.table.trend": "\nTrend",
  "utilisation.cockpit.table.signal": "\nSignal",
  "utilisation.cockpit.table.queue": "\nWarteschlange",
  "utilisation.cockpit.table.average": "\nDurchschn. {value}",
  "utilisation.cockpit.table.trendValue": "Trend {direction} {value}",
  "utilisation.cockpit.table.trendUp": "\nUp",
  "utilisation.cockpit.table.trendDown": "\nDown",
  "utilisation.cockpit.table.trendFlat": "\nFlach",
  "utilisation.cockpit.table.tasksValue": "\n{count} offene Aufgaben",
  "utilisation.cockpit.table.queueValue":
    "\n{overdue} überfällig • {workOrders} Arbeitsaufträge • {documents} Dokumente",
  "utilisation.cockpit.table.empty":
    "\nFür die ausgewählten Filter sind keine Nutzungsdaten verfügbar. Verbinden Sie Telemetrie oder erweitern Sie das Zeitfenster zum Auffüllen des Portfolios.",
  "utilisation.cockpit.table.emptyAction": "\nAssets ansehen",
  "utilisation.inspector.title": "\nAusgewählte Interpretation",
  "utilisation.inspector.subtitle":
    "Überprüfen Sie das aktive Asset, seine aktuellen Ausnahmen und die nächste Berichtsaktion von einem Inspektor.",
  "utilisation.inspector.emptyTitle": "\nWählen Sie ein Asset aus",
  "utilisation.inspector.emptyDescription":
    "\nWählen Sie eine Registerzeile aus, um den Auslastungsstatus, Ausnahmegründe und Berichtsaktionen zu überprüfen.",
  "utilisation.inspector.generatedLabel": "\nInspektor-Aktualisierung",
  "utilisation.inspector.assetSubtitle": "{site} • {type} • {condition} • {lifecycle}",
  "utilisation.inspector.stats.signalHint":
    "\n{tasks} offene Aufgaben und {workOrders} aktive Arbeitsaufträge tragen zur aktuellen Empfehlung bei.",
  "utilisation.inspector.reasonsTitle": "\nAusnahmegründe",
  "utilisation.inspector.aiPrompt":
    "\nFassen Sie den Auslastungsstatus für {asset} bei {site} zusammen. Die aktuelle Auslastung beträgt {current}, die durchschnittliche Auslastung beträgt {average} und die aktuell empfohlene Aktion ist {action}. Erläutern Sie die wahrscheinlichen Ursachen, das Betriebsrisiko und die nächste Meldemaßnahme.",
  "utilisation.inspector.tableSubtitle":
    "\nVerwenden Sie das Register als primäre Analyseoberfläche. Wählen Sie eine Zeile aus, um das rechte Interpretationsfeld zu aktualisieren.",
  "utilisation.inspector.tableBadge": "\nDominantes Register",
  "utilisation.inspector.interpretation.noTelemetry":
    "\n{asset} bei {site} kann betrieblich nicht als vertrauenswürdig eingestuft werden, da keine aktuellen Telemetriedaten vorliegen, die die Auslastungsansicht speisen.",
  "utilisation.inspector.interpretation.staleTelemetry":
    "\n{asset} zeigt die aktuelle Auslastung von {current} im Vergleich zu einem Durchschnitt von {average} an, aber der Feed ist veraltet und erfordert eine Telemetriebestätigung, bevor die Bediener handeln.",
  "utilisation.inspector.interpretation.overloaded":
    "\n{asset} arbeitet über dem bevorzugten Band bei aktueller Auslastung von {current} gegenüber einem Durchschnitt von {average}. Als nächstes sollte eine Nachfrageentlastung oder eine Umverteilung der Arbeitsbelastung geprüft werden.",
  "utilisation.inspector.interpretation.underused":
    "\n{asset} liegt bei {current} aktueller Auslastung unterhalb des bevorzugten Bandes gegenüber einem Durchschnitt von {average}. Möglicherweise steht freie Kapazität für eine erneute Bereitstellung zur Verfügung.",
  "utilisation.inspector.interpretation.watch":
    "\n{asset} liegt bei {current} aktueller Auslastung außerhalb des ausgeglichenen Bandes gegenüber einem Durchschnitt von {average}. Behalten Sie die Überprüfung der Warteschlange bei, bevor die Ausnahme schwerwiegender wird.",
  "utilisation.inspector.interpretation.balanced":
    "\n{asset} ist derzeit bei einer aktuellen Auslastung von {current} im Vergleich zu einem Durchschnitt von {average} ausgeglichen, ohne dass eine dominante Ausnahme eine sofortige Eskalation erfordert.",
  "utilisation.inspector.reason.noTelemetry":
    "Live-Telemetrie fehlt, daher wird der Nutzungsstatus derzeit aus einem teilweisen Betriebskontext abgeleitet.",
  "utilisation.inspector.reason.staleTelemetry":
    "\nDie Aktualität der Telemetrie ist beeinträchtigt, daher muss der letzte Auslastungswert bestätigt werden.",
  "utilisation.inspector.reason.overloaded":
    "\nDie Auslastung liegt über dem bevorzugten Betriebsband und erfordert möglicherweise eine Nachfrageentlastung.",
  "utilisation.inspector.reason.underused":
    "\nDie Auslastung liegt unter dem bevorzugten Betriebsband und kann auf freie Kapazität hinweisen.",
  "utilisation.inspector.reason.watch":
    "\nDie Auslastung liegt außerhalb des ausgeglichenen Bandes und sollte auf der Beobachtungsliste bleiben.",
  "utilisation.inspector.reason.remainingLife":
    "\nDie verbleibende KI-Lebensdauer beträgt nur noch {days} Tage und sollte bei den nächsten Maßnahmen berücksichtigt werden.",
  "utilisation.inspector.reason.overdueTasks":
    "\n{count} Für diese Anlage sind noch überfällige Wartungsaufgaben offen.",
  "utilisation.inspector.reason.workOrders":
    "\n{count} aktive Arbeitsaufträge sind bereits mit dieser Anlage verknüpft.",
  "utilisation.inspector.reason.documents":
    "\n{count} verknüpfte Dokumente bleiben im gesamten kommerziellen Workflow geöffnet.",
  "utilisation.inspector.reason.none":
    "\nÜber den aktuellen Nutzungsstatus hinaus ist keine dominante Ausnahme aktiv.",
  "utilisation.cockpit.csv.asset": "\nAsset",
  "utilisation.cockpit.csv.site": "\nSite",
  "utilisation.cockpit.csv.type": "\nTyp",
  "utilisation.cockpit.csv.condition": "\nBedingung",
  "utilisation.cockpit.csv.lifecycle": "\nLebenszyklus",
  "utilisation.cockpit.csv.current": "\nAktuelle Auslastung",
  "utilisation.cockpit.csv.average": "\nDurchschnittliche Auslastung",
  "utilisation.cockpit.csv.trend": "\nTrenddelta",
  "utilisation.cockpit.csv.posture": "\nHaltung",
  "utilisation.cockpit.csv.latestTelemetry": "\nNeueste Telemetrie",
  "utilisation.cockpit.csv.telemetrySamples": "\nTelemetriebeispiele",
  "utilisation.cockpit.csv.severity": "\nKI-Schweregrad",
  "utilisation.cockpit.csv.confidence": "\nKI-Vertrauen",
  "utilisation.cockpit.csv.remainingLifeDays": "\nVerbleibende Lebenstage",
  "utilisation.cockpit.csv.openTasks": "\nOffene Aufgaben",
  "utilisation.cockpit.csv.overdueTasks": "\nÜberfällige Aufgaben",
  "utilisation.cockpit.csv.activeWorkOrders": "\nAktive Arbeitsaufträge",
  "utilisation.cockpit.csv.openDocuments": "\nDokumente öffnen",
  "utilisation.cockpit.csv.recommendedAction": "\nEmpfohlene Aktion",
  "utilisation.cockpit.action.connectData": "\nTelemetrie verbinden",
  "utilisation.cockpit.action.refreshTelemetry": "\nTelemetrie aktualisieren",
  "utilisation.cockpit.action.inspectAsset": "\nAsset",
  "utilisation.cockpit.action.relieveDemand": " prüfen\nNachfrage entlasten",
  "utilisation.cockpit.action.clearBacklog": "\nRückstand löschen",
  "utilisation.cockpit.action.redeployCapacity": "\nKapazität neu bereitstellen",
  "utilisation.cockpit.action.coordinateWorkOrders": "\nArbeitsaufträge koordinieren",
  "utilisation.cockpit.action.alignDocuments": "\nDokumentenfluss ausrichten",
  "utilisation.cockpit.action.monitorFlow": "\nDurchfluss überwachen",
  "admin.title": "\nAdmin-Kontrollzentrum",
  "admin.subtitle":
    "\nUnternehmensarbeitsbereich für Identität, Standorte, KI, Unternehmensintegrationen, Sicherheit und Governance",
  "admin.audit.at": "\nAt",
  "admin.audit.timestamp": "\nZeitstempel",
  "admin.audit.actor": "\nSchauspieler",
  "admin.audit.action": "\nAktion",
  "admin.audit.entity": "\nEntität",
  "admin.system.users": "\nBenutzer",
  "admin.system.assets": "\nVermögenswerte",
  "admin.system.tasks": "\nAufgaben",
  "admin.system.predictions": "\nVorhersagen",
  "admin.system.registeredRoutes": "\nRegistrierte Routen",
  "admin.system.apiRoutes": "\nAPI-Routen",
  "admin.system.htmlRoutes": "\nHTML-Routen",
  "admin.system.staticRoutes": "\nStatische Routen",
  "admin.system.authRoutes": "\nAuthentifizierungsrouten",
  "admin.system.databaseConfigured": "\nDatenbank konfiguriert",
  "admin.system.selfHostedAssets": "\nSelbstgehostete Assets",
  "utilisation.chart.metaTitle": "\nTrend- und Zusammenfassungspanel",
  "utilisation.chart.summaryLabel": "\nAktuelles 24-Stunden-Auslastungsaggregat.",
  "utilisation.chart.avgMinMax": "\nDurchschnittlich {avg}%, Min. {min}%, Max. {max}%",
  "finance.depreciation.summary.title": "\nAbschreibungsrisiko",
  "finance.depreciation.summary.description": "\nKombinierte Standard- und KI-bereinigte Bewertung",
  "finance.depreciation.summary.totalAssetsDescription": "\nGesamtvermögen: {count}",
  "finance.depreciation.summary.adjustmentHint": "\nAngewandte KI-Anpassungsfaktoren",
  "finance.depreciation.summary.severityCount": "\n{critical} kritisch, {warning} Warnung",
  "finance.depreciation.summary.delta": "\nKI-Bewertungsdelta",
  "finance.depreciation.summary.deltaDescription": "\n{amount} Abweichung vom Basisbuchwert",
  "finance.depreciation.summary.highRiskExposure": "\nHochriskante Exposition",
  "finance.depreciation.summary.highRiskExposureDescription":
    "\n{count} Vermögenswerte in kritischem oder ermüdendem Zustand",
  "finance.depreciation.summary.adjustmentRate": "\nAnpassungsrate {rate}",
  "finance.depreciation.mix.assetCount": "\n{count} Vermögenswerte",
  "finance.depreciation.conditionMix.title": "\nBedingungskonzentration",
  "finance.depreciation.conditionMix.description":
    "Buchwertrisiko gruppiert nach aktuellem Vermögenszustand.",
  "finance.depreciation.typeMix.title": "\nTypkonzentration",
  "finance.depreciation.typeMix.description":
    "\nDie Anlageklassen mit dem höchsten Wert bestimmen die aktuelle Abschreibungssituation.",
  "finance.depreciation.topAssets.title": "\nVorrangige Vermögenswerte",
  "finance.depreciation.topAssets.description":
    "\nVermögenswerte mit dem höchsten Wert und der größten Abschreibungsauswirkung.",
  "finance.depreciation.topAssets.empty": "\nKeine Vermögenswerte",
  "finance.depreciation.topAssets.aiAdjusted": "\nKI-bereinigt",
  "finance.depreciation.table.title": "\nAbschreibungstabelle",
  "finance.depreciation.table.description":
    "\nStandardbuchwert im Vergleich zum AI-bereinigten Risiko, Zustandszustand und Live-Risikosignal.",
  "finance.depreciation.table.site": "\nSite",
  "finance.depreciation.table.type": "\nTyp",
  "finance.depreciation.table.condition": "\nBedingung",
  "finance.depreciation.table.signal": "\nSignal",
  "finance.depreciation.table.aiAdjusted": "\nKI-bereinigt",
  "finance.depreciation.table.variance": "\nVarianz",
  "finance.depreciation.stage.acquisition": "\nAnschaffung",
  "finance.depreciation.stage.activeService": "\nAktiver Betrieb",
  "finance.depreciation.stage.midLife": "\nMittlere Lebensphase",
  "finance.depreciation.stage.endOfLife": "\nEnde der Lebensdauer",
  "finance.depreciation.stage.disposal": "\nAussonderung",
  "finance.depreciation.stage.lifecycleLabel": "\nAsset-Lebenszyklusphasen",
  "finance.period.currentQuarter": "\nAktuelles Quartal",
  "finance.period.lastQuarter": "\nLetztes Quartal",
  "finance.period.ytd": "\nBisheriges Jahr",
  "finance.period.all": "\nAlle Zeiten",
  "finance.tab.overview": "\nÜbersicht",
  "finance.tab.depreciation": "\nAbschreibungsanalyse",
  "finance.tab.costAnalysis": "\nKosten und Bewertung",
  "finance.overview.portfolioValue": "\nPortfoliowert",
  "finance.overview.portfolioDescription": "\nGesamtbuchwert aller Vermögenswerte",
  "finance.overview.aiExposure": "\nKI-angepasste Belichtung",
  "finance.overview.aiExposureDescription": "\nRisikoadjustierte Bewertung",
  "finance.overview.depreciationRate": "\nAnpassungsrate",
  "finance.overview.depreciationRateDescription": "\nKI-gesteuerter Abschreibungsmultiplikator",
  "finance.overview.assetCount": "\nVerfolgte Vermögenswerte",
  "finance.overview.assetCountDescription": "\nGesamtes verwaltetes Vermögen",
  "finance.overview.byDepMethod": "\nNach Abschreibungsmethode",
  "finance.overview.byCondition": "\nNach Bedingung",
  "finance.depMethod.STRAIGHT_LINE": "\nGerade Linie",
  "finance.depMethod.DECLINING_BALANCE": "\nSinkender Saldo",
  "finance.depMethod.UNITS_OF_PRODUCTION": "\nProduktionseinheiten",
  "finance.depMethod.AI_ADJUSTED": "\nKI-bereinigt",
  "finance.costAnalysis.purchaseVsBook": "\nKauf vs. Buchwert",
  "finance.costAnalysis.totalPurchasePrice": "\nGesamtkaufpreis",
  "finance.costAnalysis.totalBookValue": "\nAktueller Buchwert",
  "finance.costAnalysis.totalDepreciation": "\nGesamtabschreibung",
  "finance.costAnalysis.totalDepreciationDescription": "\nGesamtabschreibung: {amount}",
  "finance.costAnalysis.depreciationPercent": "\nAbschreibung %",
  "finance.costAnalysis.topDepreciating": "\nAm stärksten abschreibende Vermögenswerte",
  "finance.costAnalysis.topDepreciatingEmpty":
    "\nFür die ausgewählten Filter sind keine Abschreibungsdaten verfügbar.",
  "finance.costAnalysis.byLifecycle": "\nNach Lebenszyklusphase",
  "finance.costAnalysis.avgAge": "\nDurchschnittliches Vermögensalter",
  "finance.costAnalysis.avgAgeDescription": "\nVom Kaufdatum bis heute",
  "finance.costAnalysis.days": "\n{count} Tage",
  "finance.costAnalysis.currencyMix": "Currency Flow",
  "finance.costAnalysis.currencyMixDescription":
    "Open invoices and settled receipts grouped by transaction currency.",
  "finance.costAnalysis.currencyMixSummary":
    "{count} documents are moving across {currencies} currencies. Operational close currency: {currency}.",
  "finance.costAnalysis.currencyMixEmpty":
    "No invoice or receipt currency activity matched the selected filters.",
  "finance.costAnalysis.currency": "Currency",
  "finance.costAnalysis.currencyCount": "Currencies in flow",
  "finance.costAnalysis.openInvoices": "Open invoices",
  "finance.costAnalysis.settledReceipts": "Settled receipts",
  "opsReporting.nav.title": "Operations reports",
  "opsReporting.index.title": "Operations reports",
  "opsReporting.index.subtitle": "Catalog, preview, and export operational intelligence reports.",
  "opsReporting.preview.title": "Report preview",
  "opsReporting.preview.subtitle": "Metrics and drilldowns for the selected report type.",
  "opsReporting.preview.sectionLabel": "Report preview content",
  "opsReporting.export.title": "Report export",
  "opsReporting.actions.preview": "Preview",
  "opsReporting.drilldown.ariaLabel": "Report drilldown table",
  "opsReporting.errors.invalidReportType": "The requested report type is not supported.",
  "opsReporting.coverageScore": "Data coverage",
  "opsReporting.periodDelta": "Change vs prior period",
  "opsReporting.regressionDetected": "Metric regression detected",
  "opsReporting.preview.narrative": "Narrative",
  "opsReporting.preview.customComposite": "Custom composite report",
  "opsReporting.pack.timeline": "Report pack status",
  "opsReporting.pack.state.DRAFT": "Draft",
  "opsReporting.pack.state.BUILDING": "Building",
  "opsReporting.pack.state.READY": "Ready",
  "opsReporting.provenance.source": "Provenance source",
  "opsReporting.provenance.horizonMonths": "Planning horizon (months)",
  "opsReporting.provenance.scope": "Scope",
  "opsReporting.scenario.baseline": "Baseline",
  "opsReporting.scenario.adjusted": "Adjusted",
  "opsReporting.funnel.stage.orders": "Orders",
  "opsReporting.funnel.stage.invoices": "Invoices",
  "opsReporting.funnel.stage.receipts": "Receipts",
  "opsReporting.sparkline.ariaLabel": "Spend period trend sparkline",
  "opsReporting.sparkline.period": "Period",
  "opsReporting.sparkline.amount": "Spend",
  "opsReporting.sparkline.trend": "Trend",
  "finance.costAnalysis.documents": "Documents",
  "finance.costAnalysis.documentShare": "Document share",
  "finance.costAnalysis.operational": "Operational",
  "finance.costAnalysis.analyticsTitle": "Valuation Analytics",
  "finance.costAnalysis.analyticsDescription":
    "A fitted age-to-loss model highlights depreciation pressure and accelerated loss outliers.",
  "finance.costAnalysis.sampleSize": "Sample size",
  "finance.costAnalysis.ageLossCorrelation": "Age/loss correlation",
  "finance.costAnalysis.currentVsForecast": "Current vs 12-month forecast",
  "finance.costAnalysis.outliers": "Accelerated-loss outliers",
  "finance.costAnalysis.forecastLossDescription":
    "The fitted depreciation trend moves from {current} today to {future} over the next 12 months.",
  "finance.costAnalysis.averageAgeMonthsDescription":
    "Average tracked asset age is {months} months with an age-to-loss correlation of {correlation}.",
  "finance.costAnalysis.outliersDescription":
    "{count} assets are losing value faster than the fitted age curve.",
  "finance.costAnalysis.analyticsEmpty": "Not enough valuation samples",
  "finance.costAnalysis.analyticsEmptyDescription":
    "Add assets with purchase price and book value to compute the age-to-loss model.",
  "finance.costAnalysis.outliersEmpty": "No accelerated-loss outliers matched the selected scope.",
  "finance.costAnalysis.acceleratedLossTable": "Accelerated-loss detail",
  "finance.costAnalysis.acceleratedLossDescription":
    "Assets whose actual loss is above the fitted age-to-loss curve.",
  "finance.costAnalysis.expectedLoss": "Expected loss",
  "finance.costAnalysis.actualLoss": "Actual loss",
  "finance.costAnalysis.residualLoss": "Residual loss",
  "finance.costAnalysis.exportsTitle": "Export finance pack",
  "finance.costAnalysis.exportsDescription":
    "Generate PDF, CSV, Excel, Arrow, and Parquet exports for the current cockpit scope.",
  "reports.tab.financial": "\nFinanzielle",
  "reports.tab.operations": "\nOperationen",
  "reports.tab.executive": "\nGeschäftsführer",
  "reports.summary.totalReports": "\nVerfügbare Berichte",
  "reports.summary.totalReportsDesc": "\nIn allen Kategorien",
  "reports.summary.criticalPredictions": "\nKritische Vorhersagen",
  "reports.summary.criticalPredictionsDesc": "\nBeeinflussung der Vermögensbewertung",
  "reports.summary.totalBookValue": "\nGesamtbuchwert",
  "reports.summary.totalBookValueDesc": "\nAktuelle Portfoliobewertung",
  "reports.summary.assetCount": "\nVerfolgte Vermögenswerte",
  "reports.summary.assetCountDesc": "\nUnter aktiver Leitung",
  "admin.system.online": "\nSystem online",
  "admin.aiSettings.title": "\nKI-Anbieter",
  "admin.aiSettings.subtitle":
    "\nLegen Sie den aktiven Anbieter, den Laufzeitschlüsselstatus und die Modellkennung fest.",
  "admin.aiSettings.provider": "\nAnbieter",
  "admin.aiSettings.apiKey": "\nAPI-Schlüssel",
  "admin.aiSettings.apiKeyPlaceholder":
    "\nLassen Sie das Feld leer, um den aktuellen Schlüssel beizubehalten",
  "admin.aiSettings.model": "\nModell",
  "admin.aiSettings.modelPlaceholder": "\nGeben Sie die anbieterspezifische Modell-ID",
  "admin.aiSettings.save": " ein.\nEinstellungen speichern",
  "admin.aiSettings.saved": "\nEinstellungen gespeichert und auf neue AI-Anfragen angewendet.",
  "admin.aiSettings.current": "\nAktueller Laufzeitwert",
  "admin.aiSettings.currentProvider": "\nAktueller Anbieter",
  "admin.aiSettings.currentModel": "\nAktuelles Modell",
  "admin.aiSettings.currentSource": "\nAktuelle Quelle",
  "admin.aiSettings.providerPlaceholder": "\nAnbieter auswählen",
  "admin.aiSettings.notConfigured": "\nNicht konfiguriert",
  "admin.aiSettings.apiKeyConfigured": "\nKonfiguriert",
  "admin.aiSettings.source.environment": "\nUmgebungsstandardwerte",
  "admin.aiSettings.source.systemConfig": "\nSystemkonfiguration",
  "admin.aiSettings.validation.providerRequired": "\nWählen Sie einen gültigen KI-Anbieter aus.",
  "admin.aiSettings.validation.modelRequired": "\nModellkennung ist erforderlich.",
  "admin.aiSettings.saveFailed": "\nDie KI-Einstellungen können derzeit nicht gespeichert werden.",
  "admin.aiSettings.systemConfigDescription":
    "\nBehaltene AI-Laufzeiteinstellungen werden auf neue AI-Anfragen angewendet.",
  "admin.aiSettings.airgappedHint":
    "\nAirgapped-Bereitstellungen erlauben nur lokale KI-Anbieter wie RamaLama oder Ollama.",
  "admin.aiSettings.airgappedCurrentProviderBlocked":
    "Der persistente Anbieter liegt außerhalb der Airgap-Richtlinie. Wählen Sie einen lokalen Anbieter aus, um eine kompatible Laufzeiteinstellung zu speichern.",
  "admin.aiSettings.envNote":
    "\nDie Systemkonfiguration überschreibt die Umgebungsstandards für neue KI-Anfragen. Legen Sie AI_BASE_URL nur dann in der Umgebung fest, wenn Sie einen benutzerdefinierten Anbieterendpunkt benötigen.",
  "admin.section.overview": "\nÜbersicht",
  "admin.section.overviewDescription":
    "\nÜberwachen Sie Identität, Plattformabhängigkeit, KI-Laufzeit und Governance-Status von einer Steuerungsebene aus.",
  "admin.section.users": "\nBenutzerverwaltung",
  "admin.section.usersDescription":
    "\nÜberprüfen, ändern und regeln Sie den Bedienerzugriff, die Sitzungen und die Einstellungen.",
  "admin.section.branding": "Branding",
  "admin.section.brandingDescription":
    "Manage default and party-owned brands, domain mappings, metadata, and runtime theme tokens.",
  "admin.section.locations": "\nStandorte und Rand",
  "admin.section.locationsDescription":
    "\nVerwalten Sie Standorte, Betriebsflächen und Geräteabdeckung im gesamten Unternehmen.",
  "admin.section.ai": "\nKI-Operationen",
  "admin.section.aiDescription":
    "\nKontrollieren Sie die Laufzeitkonfiguration und verfolgen Sie sie auf die Datensätze zurück, die die Plattform antreiben.",
  "admin.section.integrations": "\nUnternehmensintegrationen",
  "admin.section.integrationsDescription":
    "\nRegistrieren Sie HR-, Finanz-, Beschaffungs- und Dokumentensysteme, die weiterhin die externen Aufzeichnungssysteme sind.",
  "admin.section.security": "\nSicherheitslage",
  "admin.section.securityDescription":
    "\nÜberprüfen Sie den rollenbasierten Zugriff, die Überwachungsaktivität und den Status der Speichergrenzen von einem Arbeitsbereich aus.",
  "admin.section.governance": "\nGovernance",
  "admin.section.governanceDescription":
    "\nSuchen, exportieren und untersuchen Sie Verwaltungs- und Authentifizierungsereignisse.",
  "admin.nav.metricDatabaseOnline": "\nDatenbank online",
  "admin.nav.metricDatabaseOffline": "\nDatenbank offline",
  "admin.nav.metricUnavailable": "\nNicht verfügbar",
  "admin.nav.usersMetric": "\n{count} Benutzer • {sessions} Live-Sitzungen",
  "admin.nav.brandingMetric": "{count} brands managed",
  "admin.nav.locationsMetric": "\n{count} Standorte • {devices} Geräte",
  "admin.nav.aiMetric": "Anbieter: {provider} • Modell: {model}",
  "admin.nav.integrationsMetric": "\n{count} Systeme konfiguriert",
  "admin.nav.securityMetric": "\n{privileged} privilegiert • {events} Ereignisse",
  "admin.nav.governanceMetric": "\n{count} aktuelle Ereignisse",
  "admin.controlCenter.kicker": "\nUnternehmensverwaltung",
  "admin.controlCenter.description":
    "\nWechseln Sie vom Standortstatus zu Benutzer-, Standort-, KI-, Integrations-, Sicherheits- und Governance-Details, ohne das Kontrollzentrum zu verlassen.",
  "admin.summary.activeWorkspace": "\nAktiver Arbeitsbereich",
  "admin.summary.aiRuntime": "\nKI-Laufzeit",
  "admin.summary.userSessions": "\nLive-Sitzungen",
  "admin.summary.userSessionsHint": "\nGleichzeitige Operatorsitzungen sind derzeit aktiv",
  "admin.copilot.title": "\nAdmin-Copilot",
  "admin.copilot.description":
    "\nStarten Sie im Chat eine Untersuchung, einen Änderungsplan oder eine Bedienerunterweisung im aktuellen Arbeitsbereichskontext.",
  "admin.launchpads.title": "\nWorkspace-Launchpads",
  "admin.launchpads.description":
    "\nSpringen Sie direkt in die Arbeitsbereiche, die über Zugriff, Laufzeit, Integrationen und Prüfstatus verfügen, mit Live-Metriken, die in jede Spur übertragen werden.",
  "admin.launchpads.metricTitle": "\nAktuelle Körperhaltung",
  "admin.launchpads.openWorkspace": "\nArbeitsbereich öffnen",
  "admin.navigation.title": "\nKontrollzentrum",
  "admin.navigation.description":
    "Tief verlinkbare Admin-Arbeitsbereiche für Identität, Integrationen, Sicherheit und betriebliche Abhängigkeiten.",
  "admin.overview.managedUsers": "\nVerwaltete Benutzer",
  "admin.overview.managedUsersHint":
    "\nIdentitäts- und Zugriffsdatensätze derzeit im Geltungsbereich",
  "admin.overview.verifiedIdentities": "\nVerifizierte Identitäten",
  "admin.overview.verifiedIdentitiesHint": "\n{count} Identitäten müssen noch überprüft werden",
  "admin.overview.edgeFootprint": "\nKanten-Footprint",
  "admin.overview.edgeFootprintHint":
    "\n{count} aktive Standorte, die mit dem Anwesen verbunden sind",
  "admin.overview.auditWindow": "\n24-Stunden-Governance",
  "admin.overview.auditWindowHint":
    "\nAktuelle Authentifizierungs- und Änderungsaktivitäten im gesamten Kontrollzentrum",
  "admin.overview.datasetLedger": "\nAI-Datensatz-Ledger",
  "admin.overview.datasetLedgerDescription":
    "\nBetriebsdatensätze, die Vorhersagen, Annotationsfluss und Berichte liefern.",
  "admin.overview.predictions": "\nVorhersagen",
  "admin.overview.annotations": "\nAnmerkungen",
  "admin.overview.savedReports": "\nGespeicherte Berichte",
  "admin.overview.copilotDescription":
    "\nVerwenden Sie KI, um Körperhaltung und Oberflächenanomalien zusammenzufassen oder eine Bedienerübergabe aus dem aktuellen Zustand des Kontrollzentrums zu generieren.",
  "admin.users.stats.total": "\nVerzeichnisgröße",
  "admin.users.stats.totalHint": "\nBenutzer, die den aktuellen Verzeichnisfiltern entsprechen",
  "admin.users.stats.active": "\nAktiv",
  "admin.users.stats.activeHint":
    "\nBenutzer mit Live-Sitzungen und keinem offenen Aufmerksamkeitssignal",
  "admin.users.stats.attention": "\nBenötigt Aufmerksamkeit",
  "admin.users.stats.attentionHint":
    "\nBenutzer mit Verifizierungs-, Präferenz- oder Sitzungsstatusrisiken",
  "admin.users.stats.inactive": "\nInaktiv",
  "admin.users.stats.inactiveHint": "\nBenutzer ohne aktive Sitzungen im aktuellen Ergebnissatz",
  "admin.users.detailTitle": "\nBenutzerverzeichnis",
  "admin.users.detailDescription":
    "\nWählen Sie einen Operator aus, um Zugriff, Sitzungen, Einstellungen und den aktuellen Governance-Verlauf zu überprüfen.",
  "admin.users.searchLabel": "\nBenutzer suchen",
  "admin.users.searchPlaceholder": "\nSuche nach Name oder E-Mail",
  "admin.users.roleFilterLabel": "\nRolle",
  "admin.users.roleAll": "\nAlle Rollen",
  "admin.users.activityFilterLabel": "\nAktivität",
  "admin.users.activityAll": "\nAlle Aktivitäten",
  "admin.users.applyFilters": "\nFilter anwenden",
  "admin.users.table.person": "\nPerson",
  "admin.users.table.access": "\nZugriff",
  "admin.users.table.sessions": "\nSitzungen",
  "admin.users.table.preferences": "\nPräferenzen",
  "admin.users.table.signal": "\nSignal",
  "admin.users.activeSessionCount": "\n{count} aktive Sitzungen",
  "admin.users.lastSeenNever": "\nKeine aktuelle Sitzungsaktivität",
  "admin.users.chatEnabled": "\nChat aktiviert",
  "admin.users.chatDisabled": "\nChat deaktiviert",
  "admin.users.notificationsEnabled": "\nBenachrichtigungen aktiviert",
  "admin.users.notificationsDisabled": "\nBenachrichtigungen stummgeschaltet",
  "admin.users.empty": "\nKeine Benutzer stimmten mit den aktuellen Filtern überein.",
  "admin.users.returnOverview": "\nZurück zur Übersicht",
  "admin.users.selectPrompt": "\nWählen Sie einen Benutzer aus, um den Detailbereich zu öffnen.",
  "admin.users.detail.activeSessions": "\nAktive Sitzungen",
  "admin.users.detail.activeSessionsHint": "\nÜber {count} Sitzungen insgesamt",
  "admin.users.detail.assignedTasks": "\nZugewiesene Aufgaben",
  "admin.users.detail.assignedTasksHint": "\nAktuelle Arbeit im Besitz des ausgewählten Betreibers",
  "admin.users.detail.approvals": "\nDokumentengenehmigungen",
  "admin.users.detail.approvalsHint":
    "\nGenehmigte Arbeitsaufträge, Kundenaufträge und Bestellungen, die diesem Bediener zugeordnet sind",
  "admin.users.detail.editTitle": "\nZugriff und Einstellungen",
  "admin.users.detail.editDescription":
    "\nÄndern Sie Rolle, Gebietsschema und Assistentenverfügbarkeit für den ausgewählten Operator.",
  "admin.users.roleLabel": "\nRolle",
  "admin.users.save": "\nÄnderungen speichern",
  "admin.users.savedSuccess": "\nBenutzerzugriff und Einstellungen aktualisiert.",
  "admin.users.revokeSessions": "\nSitzungen widerrufen",
  "admin.users.revokeSuccess": "\nAlle Sitzungen wurden für den ausgewählten Operator widerrufen.",
  "admin.users.detail.revokeTitle": "\nSitzung zurückgesetzt",
  "admin.users.detail.revokeDescription":
    "\nErzwingen Sie eine erneute Anmeldung im Browser und in zwischengespeicherten Sitzungen für diesen Operator.",
  "admin.users.detail.sessionsTitle": "\nLetzte Sitzungen",
  "admin.users.detail.sessionsDescription":
    "Aktuelle Sitzungsaktivität und Ablaufstatus für den ausgewählten Operator.",
  "admin.users.detail.auditTitle": "\nAktuelle Governance-Aktivität",
  "admin.users.detail.auditDescription":
    "\nAktuelle Audit-Einträge, die dem ausgewählten Operator zugeordnet sind.",
  "admin.users.sessionExpiresAt": "\nLäuft ab {value}",
  "admin.users.sessionsEmpty":
    "\nFür diesen Betreiber wurden keine aktuellen Sitzungen aufgezeichnet.",
  "admin.users.signal.privileged": "\nPrivilegiert",
  "admin.users.signal.unverified": "\nNicht bestätigt",
  "admin.users.signal.concurrentSessions": "\nGleichzeitige Sitzungen",
  "admin.users.signal.preferencesMissing": "\nEinstellungen fehlen",
  "admin.users.signal.noSessions": "\nKeine Sitzungen",
  "admin.users.status.active": "\nAktiv",
  "admin.users.status.attention": "\nBenötigt Aufmerksamkeit",
  "admin.users.status.inactive": "\nInaktiv",
  "admin.users.error.invalidRole": "\nWählen Sie vor dem Speichern eine gültige Rolle aus.",
  "admin.users.error.invalidName": "\nGeben Sie vor dem Speichern einen gültigen Anzeigenamen ein.",
  "admin.users.error.notFound": "\nDer ausgewählte Benutzer konnte nicht gefunden werden.",
  "admin.users.error.saveFailed":
    "\nDie Benutzeränderungen konnten momentan nicht gespeichert werden.",
  "admin.locations.totalSites": "\nRegistrierte Websites",
  "admin.locations.totalSitesHint": "\nIn der Plattform verwaltete Stützpunkte und Einrichtungen",
  "admin.locations.activeSites": "\nAktive Websites",
  "admin.locations.activeSitesHint": "\nDerzeit als aktiv für den Betrieb markierte Standorte",
  "admin.locations.totalDevices": "\nAngeschlossene Geräte",
  "admin.locations.totalDevicesHint": "\nDem verwalteten Bereich zugeordnete Edge-Geräte",
  "admin.locations.devicesDescription":
    "\nRegistrieren und überprüfen Sie die Geräteabdeckung zusammen mit der Standortstruktur, der das Gerät gehört.",
  "admin.aiOps.provider": "\nAnbieter",
  "admin.aiOps.providerHint":
    "\nLaufzeitanbieter, der neue Assistenten- und Vorhersageanfragen bedient",
  "admin.aiOps.model": "\nModell",
  "admin.aiOps.sourceLabel": "\nQuelle: {value}",
  "admin.aiOps.predictions": "\nVorhersagen",
  "admin.aiOps.predictionsHint": "\nAktive Vorhersagedatensätze im gesamten Anwesen",
  "admin.aiOps.annotations": "\nAnmerkungen",
  "admin.aiOps.annotationsHint": "\nErfasste Bewertungslabels und Anmerkungsdatensätze",
  "admin.aiOps.datasetTitle": "\nDatensatzoperationen",
  "admin.aiOps.datasetDescription":
    "\nVerknüpfen Sie Laufzeitänderungen mit den Datensätzen, die Vorhersagen, Berichte und Betriebsüberprüfungen vorantreiben.",
  "admin.aiOps.savedReports": "\nGespeicherte Berichte",
  "admin.aiOps.managedUsers": "\nVerwaltete Benutzer",
  "admin.aiOps.copilotDescription":
    "\nVerwenden Sie KI, um den Laufzeitstatus auf Modell-, Datensatz- und Operatoränderungen zurückzuführen, bevor Sie die Konfiguration ändern.",
  "admin.operationalContext.title": "\nBetriebskontext",
  "admin.operationalContext.description":
    "\nDiese Werte stammen aus Serverumgebungsvariablen und stimmen mit dem in KI-Assistenten eingegebenen Kontext überein: OPERATIONAL_CURRENCY, FACILITY_TIMEZONE, FACILITY_LATITUDE und FACILITY_LONGITUDE (für das Wetter sind sowohl Breiten- als auch Längengrad erforderlich).",
  "admin.operationalContext.currencyLabel": "\nStandard-Handelswährung",
  "admin.operationalContext.facilityTimeLabel": "\nOrtszeit der Einrichtung",
  "admin.operationalContext.facilityTimeBody": "Zeitzone: {timezone} — {localTime}",
  "admin.operationalContext.facilityTimeEmpty":
    "\nStellen Sie FACILITY_TIMEZONE auf eine IANA-Zeitzone (z. B. Europa/London) ein, um die Uhr der Einrichtung anzuzeigen.",
  "admin.operationalContext.coordinatesLabel": "\nEinrichtungskoordinaten (WGS84)",
  "admin.operationalContext.coordinatesBody": "Lat: {lat}, Lon: {lon}",
  "admin.operationalContext.coordinatesEmpty":
    "\nLegen Sie FACILITY_LATITUDE und FACILITY_LONGITUDE zusammen fest, um Koordinaten und Live-Wetter zu ermöglichen, wenn ausgehender Netzwerkzugriff zulässig ist.",
  "admin.operationalContext.weatherLabel": "\nWetterschnappschuss",
  "admin.operationalContext.weatherOk":
    "\n{tempC} °C, Wind {windKmh} km/h, WMO-Code {code} (Open-Meteo).",
  "admin.operationalContext.weatherSkippedAirgapped":
    "Das Wetter wird in AIRGAPPED-Bereitstellungen nicht abgerufen.",
  "admin.operationalContext.weatherSkippedNoCoordinates":
    "\nKonfigurieren Sie den Breiten- und Längengrad der Einrichtung, um die aktuellen Bedingungen abzurufen.",
  "admin.operationalContext.weatherUnavailable":
    "\nWetterdaten sind vorübergehend nicht verfügbar. Versuchen Sie es später noch einmal.",
  "admin.integrations.totalDomains": "\nErforderliche Domänen",
  "admin.integrations.totalDomainsHint":
    "\nUnternehmenssysteme, in die die Plattform integriert werden muss",
  "admin.integrations.configured": "\nKonfiguriert",
  "admin.integrations.configuredHint": "\nDomänenintegrationen mit aktivem Systemregistereintrag",
  "admin.integrations.degraded": "\nDegradiert",
  "admin.integrations.degradedHint":
    "\nRegistrierte Systeme arbeiten derzeit unterhalb der Zielposition",
  "admin.integrations.offline": "\nOffline",
  "admin.integrations.offlineHint":
    "\nRegistrierte Systeme, die derzeit eine Wiederherstellung oder einen Fallback erfordern",
  "admin.branding.totalBrands": "Total brands",
  "admin.branding.totalBrandsHint":
    "Default and party-owned brands currently managed by the platform",
  "admin.branding.activeBrands": "Active brands",
  "admin.branding.activeBrandsHint": "Brands currently available for host resolution and rendering",
  "admin.branding.assignedBrands": "Assigned brands",
  "admin.branding.assignedBrandsHint":
    "Brands linked directly to a customer or partner party record",
  "admin.branding.activeDomains": "Active domains",
  "admin.branding.activeDomainsHint": "Hostnames currently available for trusted brand resolution",
  "admin.branding.operationalCurrencyLabel": "Handelswährung",
  "admin.branding.operationalCurrencyHint":
    "Die Währung für Finanzen, Checkout und Dokumente bleibt eine globale Laufzeiteinstellung und kein markenspezifischer Override.",
  "admin.branding.supportedLocalesLabel": "Unterstützte Sprachen",
  "admin.branding.supportedLocalesHint":
    "Marken-Shells und Metadaten laufen über die gemeinsam ausgelieferten Locale-Wörterbücher der Plattform.",
  "admin.branding.createTitle": "Create brand profile",
  "admin.branding.createDescription":
    "Register a new platform or party-owned brand with hostnames, metadata, assets, and theme tokens.",
  "admin.branding.create": "Create brand",
  "admin.branding.jumpToCreate": "Jump to create form",
  "admin.branding.displayNameLabel": "Display name",
  "admin.branding.displayNameHint":
    "Primary brand name rendered across shells, titles, and navigation.",
  "admin.branding.displayNamePlaceholder": "Enter the brand display name",
  "admin.branding.appTaglineLabel": "Tagline",
  "admin.branding.appTaglineHint": "Short strapline shown in shell and supporting brand surfaces.",
  "admin.branding.appTaglinePlaceholder": "Enter the brand tagline",
  "admin.branding.partyLabel": "Assigned party",
  "admin.branding.partyHint": "Optionally link this brand to a specific party owner.",
  "admin.branding.partyUnassigned": "Unassigned",
  "admin.branding.statusLabel": "Status",
  "admin.branding.statusHint":
    "Inactive brands remain visible in admin but should not resolve for live hosts.",
  "admin.branding.status.ACTIVE": "Active",
  "admin.branding.status.INACTIVE": "Inactive",
  "admin.branding.metaTitleLabel": "Meta title",
  "admin.branding.metaTitleHint": "Document title base used for branded pages and shell metadata.",
  "admin.branding.metaTitlePlaceholder": "Enter the branded meta title",
  "admin.branding.metaDescriptionLabel": "Meta description",
  "admin.branding.metaDescriptionHint":
    "Shared brand description used for metadata and fallback shell copy.",
  "admin.branding.metaDescriptionPlaceholder":
    "Describe this brand for metadata and shell surfaces",
  "admin.branding.logoUrlLabel": "Logo asset path",
  "admin.branding.logoSquareUrlLabel": "Square logo asset path",
  "admin.branding.faviconUrlLabel": "Favicon asset path",
  "admin.branding.assetHint": "Use a rooted local static asset path.",
  "admin.branding.assetPlaceholder": "/static/images/brand-asset.svg",
  "admin.branding.defaultLabel": "Default platform brand",
  "admin.branding.defaultHint": "Only one brand can be the platform default fallback at a time.",
  "admin.branding.defaultHelper": "Use this brand when the host matches a platform-owned domain.",
  "admin.branding.defaultPill": "Default",
  "admin.branding.domainMappingsTitle": "Domain mappings",
  "admin.branding.domainMappingsHint":
    "Map active hostnames to this brand and designate a single primary hostname for canonical URLs.",
  "admin.branding.domainHostnameLabel": "Hostname",
  "admin.branding.domainHostnamePlaceholder": "brand.example.com",
  "admin.branding.domainPrimaryLabel": "Primary domain",
  "admin.branding.lightThemeTitle": "Light theme tokens",
  "admin.branding.darkThemeTitle": "Dark theme tokens",
  "admin.branding.tokenHint": "Provide semantic brand colors as CSS-compatible values.",
  "admin.branding.tokenPlaceholder": "#000000",
  "admin.branding.token.primary": "Primary",
  "admin.branding.token.primaryContent": "Primary content",
  "admin.branding.token.secondary": "Secondary",
  "admin.branding.token.secondaryContent": "Secondary content",
  "admin.branding.token.accent": "Accent",
  "admin.branding.token.accentContent": "Accent content",
  "admin.branding.token.neutral": "Neutral",
  "admin.branding.token.neutralContent": "Neutral content",
  "admin.branding.token.base100": "Base 100",
  "admin.branding.token.base200": "Base 200",
  "admin.branding.token.base300": "Base 300",
  "admin.branding.token.baseContent": "Base content",
  "admin.branding.token.info": "Info",
  "admin.branding.token.infoContent": "Info content",
  "admin.branding.token.success": "Success",
  "admin.branding.token.successContent": "Success content",
  "admin.branding.token.warning": "Warning",
  "admin.branding.token.warningContent": "Warning content",
  "admin.branding.token.error": "Error",
  "admin.branding.token.errorContent": "Error content",
  "admin.branding.save": "Save brand",
  "admin.branding.delete": "Delete brand",
  "admin.branding.deleteTitle": "Delete brand profile",
  "admin.branding.deleteDescription":
    "This branded profile and its domain mappings will be removed permanently.",
  "admin.branding.deleteConfirm": "Delete brand",
  "admin.branding.emptyTitle": "No additional brands configured",
  "admin.branding.emptyDescription":
    "Create the first party-owned brand to start managing branded domains, assets, and theme tokens.",
  "admin.branding.feedback.created": "Brand profile created successfully.",
  "admin.branding.feedback.updated": "Brand profile updated successfully.",
  "admin.branding.feedback.deleted": "Brand profile deleted successfully.",
  "admin.branding.error.invalidInput":
    "Enter a complete brand profile with valid metadata, assets, and domain mappings.",
  "admin.branding.error.notFound": "Brand profile could not be found.",
  "admin.branding.error.conflict":
    "This brand conflicts with an existing party assignment or hostname mapping.",
  "admin.branding.error.defaultDelete": "The default brand profile cannot be deleted.",
  "admin.branding.error.defaultRequired":
    "One brand profile must remain assigned as the platform default.",
  "admin.integrations.systemsOfRecordHint":
    "\nDie unternehmensinternen Personal-, Finanz-, Beschaffungs- und Dokumentensysteme bleiben die Aufzeichnungssysteme. Dieses Register verfolgt den Integrationsvertrag und den Betriebsstatus innerhalb von {brandName}.",
  "admin.integrations.formTitle": "\nIntegrationsregister",
  "admin.integrations.formDescription":
    "\nErstellen oder aktualisieren Sie den Integrationsvertrag für eine erforderliche Unternehmensdomäne.",
  "admin.integrations.registerTitle": "\nAktuelles Register",
  "admin.integrations.registerDescription":
    "\nAlle erforderlichen Unternehmensdomänen, einschließlich nicht konfigurierter Bereiche, die noch ein Onboarding benötigen.",
  "admin.integrations.domainLabel": "\nUnternehmensdomäne",
  "admin.integrations.systemNameLabel": "\nSystemname",
  "admin.integrations.systemNamePlaceholder": "\nGeben Sie den Firmensystemnamen",
  "admin.integrations.syncModeLabel": " ein.\nSynchronisierungsmodus",
  "admin.integrations.statusLabel": "\nBetriebsstatus",
  "admin.integrations.ownerLabel": "\nDienstinhaber",
  "admin.integrations.ownerPlaceholder":
    "\nGeben Sie den verantwortlichen Eigentümer oder das verantwortliche Team",
  "admin.integrations.lastSyncLabel": " ein.\nLetzte verifizierte Synchronisierung",
  "admin.integrations.notesLabel": "\nNotizen",
  "admin.integrations.notesPlaceholder":
    "\nVertrags-, Betriebs- oder Datengrenzennotizen aufzeichnen",
  "admin.integrations.save": "\nIntegration",
  "admin.integrations.saved": " speichern\nEingliederungsregister aktualisiert.",
  "admin.integrations.systemOfRecord": "\nAufzeichnungssystem",
  "admin.integrations.unconfigured": "\nUnkonfiguriert",
  "admin.integrations.domain.HR": "Personal",
  "admin.integrations.domain.FINANCE": "\nFinanzen",
  "admin.integrations.domain.PROCUREMENT": "\nBeschaffung",
  "admin.integrations.domain.DOCUMENT_MANAGEMENT": "\nDokumentenverwaltung",
  "admin.integrations.domain.CATERING_SERVICES": "\nGastronomie / ESS",
  "admin.integrations.syncMode.API": "API-Schnittstelle",
  "admin.integrations.syncMode.FILE_DROP": "\nDatei-Drop",
  "admin.integrations.syncMode.MANUAL": "\nHandbuch",
  "admin.integrations.status.HEALTHY": "Gesund",
  "admin.integrations.status.DEGRADED": "\nDegradiert",
  "admin.integrations.status.OFFLINE": "\nOffline",
  "admin.integrations.table.domain": "\nDomäne",
  "admin.integrations.table.system": "\nSystem",
  "admin.integrations.table.syncMode": " ein.\nSynchronisierungsmodus",
  "admin.integrations.table.owner": "\nBesitzer",
  "admin.integrations.table.lastSync": "\nLetzte Synchronisierung",
  "admin.integrations.table.updatedAt": "\nAktualisiert",
  "admin.integrations.error.invalidSystemName":
    "\nGeben Sie vor dem Speichern einen gültigen Systemnamen ein.",
  "admin.integrations.error.invalidSelection":
    "\nWählen Sie eine gültige Unternehmensdomäne, einen Synchronisierungsmodus und einen Betriebsstatus aus.",
  "admin.integrations.error.saveFailed":
    "\nDas Eingliederungsregister konnte momentan nicht gespeichert werden.",
  "admin.integrations.systemConfigDescription":
    "\nRegister der Unternehmenssystemintegration und Betriebslage.",
  "admin.integrations.dependenciesTitle": "\nAbhängigkeitskarte",
  "admin.integrations.dependenciesDescription":
    "\nVerfolgen Sie die Betriebsflächen, Besitzer und nächsten Aktionen für jede erforderliche Unternehmensabhängigkeit.",
  "admin.integrations.dependency.systemLabel": "\nSystem",
  "admin.integrations.dependency.ownerLabel": "\nBesitzer",
  "admin.integrations.dependency.syncLabel": "\nSynchronisierung: {syncMode}",
  "admin.integrations.dependency.lastSyncLabel": "\nLetzte Synchronisierung",
  "admin.integrations.dependency.updatedLabel": "\nZuletzt aktualisiert",
  "admin.integrations.dependency.notesLabel": "\nBetriebshinweise",
  "admin.integrations.dependency.impactLabel": "\nBetroffene Arbeitsabläufe",
  "admin.integrations.dependency.noteEmpty": "\nNoch keine Betriebsnotizen erfasst.",
  "admin.integrations.dependency.remediationLabel": "\nNächste Aktion",
  "admin.integrations.dependency.lastSyncEmpty":
    "\nEs wurde noch keine erfolgreiche Synchronisierung aufgezeichnet.",
  "admin.integrations.dependency.updatedEmpty":
    "\nNoch keine Registeraktualisierung aufgezeichnet.",
  "admin.integrations.dependency.emptyTitle": "\nKein Abhängigkeitsstatus verfügbar",
  "admin.integrations.dependency.emptyDescription":
    "Aktualisieren Sie die Integrationsabhängigkeitskarte, sobald die unterstützenden Arbeitsbereichsdaten verfügbar sind.",
  "admin.integrations.dependency.errorTitle": "\nAbhängigkeitskarte nicht verfügbar",
  "admin.integrations.dependency.errorDescription":
    "\nDas Integrationsabhängigkeitsfenster konnte nicht aktualisiert werden. Wiederholen Sie die Anfrage oder überprüfen Sie das Upstream-Register.",
  "admin.integrations.dependency.posture.HEALTHY": "Gesund",
  "admin.integrations.dependency.posture.DEGRADED": "\nDegradiert",
  "admin.integrations.dependency.posture.OFFLINE": "\nOffline",
  "admin.integrations.dependency.posture.UNCONFIGURED": "\nUnkonfiguriert",
  "admin.integrations.dependency.remediation.HEALTHY":
    "\nÜberwachen Sie weiterhin den Status der geplanten Synchronisierung und halten Sie den Downstream-Arbeitsbereich an dem aktuellen Aufzeichnungssystem ausgerichtet.",
  "admin.integrations.dependency.remediation.DEGRADED":
    "\nÜberprüfen Sie die neuesten Synchronisierungsnotizen, bestätigen Sie die Upstream-Verfügbarkeit und beheben Sie den beeinträchtigten Workflow, bevor Bediener auf veraltete Daten angewiesen sind.",
  "admin.integrations.dependency.remediation.OFFLINE":
    "\nEskalieren Sie den Abhängigkeitsausfall, stellen Sie nachgelagerte Teams auf manuelle Kontrollen um und stellen Sie das Aufzeichnungssystem vor dem nächsten Betriebszyklus wieder her.",
  "admin.integrations.dependency.remediation.UNCONFIGURED":
    "\nRegistrieren Sie das Aufzeichnungssystem, weisen Sie einen Eigentümer zu und definieren Sie den Synchronisierungsmodus, bevor diese Abhängigkeit als betriebsbereit behandelt wird.",
  "admin.integrations.dependency.attentionTitle": "\nIntegrationsaufmerksamkeit erforderlich",
  "admin.integrations.dependency.attentionDescription":
    "\n{degraded} degradiert, {offline} offline und {unconfigured} nicht konfigurierte Abhängigkeiten erfordern Maßnahmen.",
  "admin.integrations.dependency.healthyTitle": "\nAbhängigkeiten ausgerichtet",
  "admin.integrations.dependency.healthyDescription":
    "\nAlle erforderlichen Abhängigkeiten sind konfiguriert und funktionieren derzeit im erwarteten Zustand.",
  "admin.integrations.dependency.action.HR": "\nBenutzeroperationen öffnen",
  "admin.integrations.dependency.action.FINANCE": "\nOffene Finanzplanung",
  "admin.integrations.dependency.action.PROCUREMENT": "\nFlottenarbeitsbereich öffnen",
  "admin.integrations.dependency.action.DOCUMENT_MANAGEMENT": "\nArbeitsbereich „Berichte öffnen",
  "admin.integrations.dependency.action.CATERING_SERVICES": "\nOffener Arbeitsbereich „Nachlass“",
  "admin.integrations.dependency.description.HR":
    "“\nIdentität, Personalbesetzung und Betreiberabdeckung hängen davon ab, dass das HR-System weiterhin auf die Plattformrollen und -eigentümer abgestimmt bleibt.",
  "admin.integrations.dependency.description.FINANCE":
    "\nHaushaltslage, Planungsszenarien und Finanzkontrollen hängen davon ab, dass das Finanzsystem der Aufzeichnungen synchronisiert bleibt.",
  "admin.integrations.dependency.description.PROCUREMENT":
    "\nBeschaffungsverpflichtungen, Lieferantenaktivitäten und Flottenausführung hängen von rechtzeitigen Einkaufs- und Vertragsabläufen ab.",
  "admin.integrations.dependency.description.DOCUMENT_MANAGEMENT":
    "\nBerichte, Genehmigungen und Dokumentennachweise hängen von der Verfügbarkeit des gemeinsamen Dokumentenmanagementsystems ab.",
  "admin.integrations.dependency.description.CATERING_SERVICES":
    "\nDie Lieferung des Anwesens, die ESS-Bereitschaft und die Catering-Koordination hängen davon ab, dass dieser Servicevertrag betriebsbereit bleibt.",
  "admin.integrations.dependency.impact.HR.primary": "\nRollenzuweisungen",
  "admin.integrations.dependency.impact.HR.secondary": "\nBewertungen des privilegierten Zugriffs",
  "admin.integrations.dependency.impact.HR.tertiary":
    "\nÜbergaben zur Bereitschaft der Belegschaft",
  "admin.integrations.dependency.impact.FINANCE.primary": "\nSzenarioplanung",
  "admin.integrations.dependency.impact.FINANCE.secondary": "\nBudgetkontrollen",
  "admin.integrations.dependency.impact.FINANCE.tertiary": "\nExecutive-Reporting-Pakete",
  "admin.integrations.dependency.impact.PROCUREMENT.primary": "Lieferantenausführung",
  "admin.integrations.dependency.impact.PROCUREMENT.secondary": "\nFlottenauslieferungshaltung",
  "admin.integrations.dependency.impact.PROCUREMENT.tertiary":
    "\nKommerzielles Fulfillment-Routing",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.primary": "\nBeweispakete",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.secondary": "\nGenehmigungsworkflows",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.tertiary": "\nVeröffentlichung melden",
  "admin.integrations.dependency.impact.CATERING_SERVICES.primary": "\nESS-Bereitschaft",
  "admin.integrations.dependency.impact.CATERING_SERVICES.secondary":
    "\nKoordination der Nachlasslieferung",
  "admin.integrations.dependency.impact.CATERING_SERVICES.tertiary":
    "\nÜbergabe der Catering-Unterstützung",
  "admin.integrations.dependency.surface.HR": "\nBenutzer, Rollen und Bereitschaft der Belegschaft",
  "admin.integrations.dependency.surface.FINANCE":
    "\nBudgetierung, Planungsszenarien und Finanzaufsicht der Geschäftsleitung",
  "admin.integrations.dependency.surface.PROCUREMENT":
    "\nFlottenlieferung, Lieferantenausführung und Beschaffungskoordination",
  "admin.integrations.dependency.surface.DOCUMENT_MANAGEMENT":
    "\nBerichte, Beweispakete und betriebliche Dokumenten-Workflows",
  "admin.integrations.dependency.surface.CATERING_SERVICES":
    "\nNachlasslieferung, Catering-Unterstützung und ESS-Koordinationsflächen",
  "admin.security.privilegedUsers": "\nPrivilegierte Benutzer",
  "admin.security.privilegedUsersHint":
    "\nAdministratoren verfügen derzeit über privilegierten Zugriff",
  "admin.security.unverifiedPrivilegedUsers": "\nNicht verifizierter privilegierter",
  "admin.security.unverifiedPrivilegedUsersHint":
    "\nBei privilegierten Identitäten fehlt immer noch die E-Mail-Bestätigung",
  "admin.security.concurrentSessionWarnings": "\nGleichzeitige Sitzungen",
  "admin.security.concurrentSessionWarningsHint":
    "\nOperatoren mit mehreren aktiven Sitzungen, die überprüft werden müssen",
  "admin.security.totalEvents": "\n7d Sicherheitsereignisse",
  "admin.security.totalEventsHint":
    "\nAuthentifizierungs- und zugriffsbezogene Änderungsaktivität im aktuellen Sicherheitsfenster",
  "admin.security.rbacTitle": "\nRollenbasierte Zugriffskontrolle",
  "admin.security.rbacDescription":
    "\nÜberprüfen Sie die Rollenverteilung, den aktiven Zugriffs-Footprint und den Verifizierungsstatus aller internen Operatoren.",
  "admin.security.storageTitle": "\nSicherer Datenspeicherstatus",
  "admin.security.storageDescription":
    "\nVerfolgen Sie die Kontrollen der Bereitstellungsgrenzen, die den Speicherort, den Referenzort und die externe Exposition beeinflussen.",
  "admin.security.auditTitle": "\nAktuelle Sicherheitsaktivität",
  "admin.security.auditDescription":
    "\nAuthentifizierungs- und zugriffsbezogene Prüfeinträge aus dem aktuellen siebentägigen Sicherheitsfenster.",
  "admin.security.auditEmpty":
    "\nIm aktuellen Fenster wurden keine aktuellen Sicherheitsereignisse aufgezeichnet.",
  "admin.security.roleTable.role": "\nRolle",
  "admin.security.roleTable.users": "\nBenutzer",
  "admin.security.roleTable.activeSessions": "\nAktive Sitzungen",
  "admin.security.roleTable.unverified": "\nNicht bestätigt",
  "admin.security.authEvents": "\nAuthentifizierungsereignisse",
  "admin.security.accessChangeEvents": "\nZugriffsänderungen",
  "admin.security.databaseLabel": "\nDatenbank",
  "admin.governance.totalEvents": "\nGefilterte Ereignisse",
  "admin.governance.totalEventsHint": "\nPrüfereignisse im aktuellen Governance-Slice",
  "admin.governance.authEvents": "\nAuthentifizierungsereignisse",
  "admin.governance.authEventsHint": "\nAnmelde- und Abmeldeaktivität im aktuellen Slice",
  "admin.governance.changeEvents": "\nEreignisse ändern",
  "admin.governance.changeEventsHint": "\nAktionen im Bereich ",
  "admin.governance.searchLabel":
    " erstellen, aktualisieren, genehmigen, löschen und exportieren\nSuche Governance",
  "admin.governance.searchPlaceholder": "\nSuchen Sie nach Akteur, Entität oder Anfrage-ID",
  "admin.governance.actionLabel": "\nAktion",
  "admin.governance.actionAll": "\nAlle Aktionen",
  "admin.governance.windowLabel": "\nZeitfenster",
  "admin.governance.window.24h": "\nLetzte 24 Stunden",
  "admin.governance.window.7d": "\nLetzte 7 Tage",
  "admin.governance.window.30d": "\nLetzte 30 Tage",
  "admin.governance.window.all": "\nAlle Zeiten",
  "admin.governance.applyFilters": "\nFilter anwenden",
  "admin.governance.exportFiltered": "\nGefilterte CSV",
  "admin.governance.requestId": " exportieren\nAnfrage-ID",
  "admin.governance.requestIdValue": "\nAnfrage-ID {value}",
  "admin.governance.empty":
    "\nKeine Governance-Ereignisse stimmten mit den aktuellen Filtern überein.",
  "admin.chat.overviewReviewLabel": "\nHaltung zusammenfassen",
  "admin.chat.overviewReviewPrompt":
    "Fassen Sie die aktuelle Administratorübersicht zusammen, heben Sie Anomalien bei Benutzern, Datensätzen und Governance hervor und empfehlen Sie die nächsten Verwaltungsmaßnahmen.",
  "admin.chat.overviewOpsLabel": "\nLeitstellenaktionen planen",
  "admin.chat.overviewOpsPrompt":
    "\nSchlagen Sie mithilfe der aktuellen Administratorübersicht einen priorisierten Aktionsplan für Benutzerverwaltung, Standorte, KI-Operationen und Governance vor.",
  "admin.chat.userReviewLabel": "\nÜberprüfen Sie den ausgewählten Benutzer",
  "admin.chat.userReviewPrompt":
    "\nÜberprüfen Sie den ausgewählten Benutzer, erläutern Sie die Zugriffs-, Sitzungs- und Präferenzrisiken und empfehlen Sie die nächsten Verwaltungsmaßnahmen.",
  "admin.chat.userOpsLabel": "\nEntwurf eines Zugriffsänderungsplans",
  "admin.chat.userOpsPrompt":
    "\nErstellen Sie mithilfe des aktuellen Benutzerverwaltungsarbeitsbereichs einen genauen Plan zur Aktualisierung von Rollen, zum Widerrufen von Sitzungen bei Bedarf und zur Kommunikation der Änderungen.",
  "admin.chat.brandingReviewLabel": "Review brand posture",
  "admin.chat.brandingReviewPrompt":
    "Review the current brand register, identify domain, metadata, or theming gaps, and recommend the next branding actions.",
  "admin.chat.locationsReviewLabel": "\nKanten-Footprint überprüfen",
  "admin.chat.locationsReviewPrompt":
    "\nÜberprüfen Sie die aktuellen Standorte und den Status der Edge-Geräte, heben Sie Lücken oder Anomalien hervor und empfehlen Sie die nächsten operativen Maßnahmen.",
  "admin.chat.aiReviewLabel": "\nÜberprüfen Sie die KI-Haltung",
  "admin.chat.aiReviewPrompt":
    "\nÜberprüfen Sie den aktuellen Stand der KI-Laufzeit und des Datensatzes, erläutern Sie Risiken und empfehlen Sie die nächsten Verwaltungsmaßnahmen.",
  "admin.chat.aiOpsLabel": "\nEntwurf eines KI-Einführungsplans",
  "admin.chat.aiOpsPrompt":
    "\nErstellen Sie mithilfe des aktuellen KI-Betriebsarbeitsbereichs einen Rollout-Plan für Laufzeitänderungen, Auswirkungen auf Datensätze und Bedienerkommunikation.",
  "admin.chat.integrationsReviewLabel": "\nÜberprüfen Sie Unternehmensintegrationen",
  "admin.chat.integrationsReviewPrompt":
    "\nÜberprüfen Sie das Unternehmensintegrationsregister, identifizieren Sie Onboarding- oder Resilienzlücken in den Personal-, Finanz-, Beschaffungs- und Dokumentensystemen und empfehlen Sie die nächsten Verwaltungsmaßnahmen.",
  "admin.chat.securityReviewLabel": "\nÜberprüfen Sie den Sicherheitsstatus",
  "admin.chat.securityReviewPrompt":
    "\nÜberprüfen Sie den aktuellen Sicherheitsarbeitsbereich, fassen Sie RBAC-, Audit- und Speichergrenzenrisiken zusammen und empfehlen Sie die nächsten Compliance-Maßnahmen.",
  "admin.chat.governanceReviewLabel": "\nÜberprüfen Sie die Governance-Aktivität",
  "admin.chat.governanceReviewPrompt":
    "\nÜberprüfen Sie den aktuellen Governance-Arbeitsbereich, fassen Sie wichtige Zugriffs- oder Änderungsereignisse zusammen und empfehlen Sie die nächsten Compliance-Maßnahmen.",
  "admin.audit.action.CREATE": "\nErstellt",
  "admin.audit.action.UPDATE": "\nAktualisiert",
  "admin.audit.action.DELETE": "\nGelöscht",
  "admin.audit.action.APPROVE": "Genehmigt",
  "admin.audit.action.LOGIN": "\nEingeloggt",
  "admin.audit.action.LOGOUT": "\nAbgemeldet",
  "admin.audit.action.EXPORT": "\nExportiert",
  "admin.invite.title": "\nBenutzereinladungen",
  "admin.invite.description":
    "\nLaden Sie neue Operatoren per E-Mail mit einer vorab zugewiesenen Rolle und einem Ablauffenster ein.",
  "admin.invite.emailLabel": "\nE-Mail-Adresse",
  "admin.invite.emailPlaceholder": "Operator@example.com",
  "admin.invite.roleLabel": "\nRolle",
  "admin.invite.expiresLabel": "\nLäuft in (Tagen)",
  "admin.invite.send": " ab\nEinladung senden",
  "admin.invite.sent": "\nEinladung erfolgreich gesendet.",
  "admin.invite.pending": "\nAusstehend",
  "admin.invite.expired": "\nAbgelaufen",
  "admin.invite.accepted": "\nAkzeptiert",
  "admin.invite.revoked": "\nWiderrufen",
  "admin.invite.resend": "\nErneut senden",
  "admin.invite.pendingTitle": "\nAusstehende Einladungen",
  "admin.invite.pendingDescription":
    "\nEinladungen warten auf Annahme durch eingeladene Betreiber.",
  "admin.invite.table.email": "\nE-Mail",
  "admin.invite.table.role": "\nRolle",
  "admin.invite.table.status": "\nStatus",
  "admin.invite.table.expiresAt": "\nLäuft ab",
  "admin.invite.table.invitedBy": "\nEingeladen von",
  "admin.invite.table.createdAt": "\nGesendet",
  "admin.invite.empty": "\nKeine ausstehenden Einladungen.",
  "admin.invite.error.invalidEmail": "\nGeben Sie eine gültige E-Mail-Adresse ein.",
  "admin.invite.error.invalidRole": "\nWählen Sie eine gültige Rolle aus.",
  "admin.invite.error.sendFailed": "\nDie Einladung kann derzeit nicht gesendet werden.",
  "admin.invite.error.alreadyInvited": "\nFür diese E-Mail ist bereits eine Einladung ausstehend.",
  "admin.bulkImport.title": "\nMassenbenutzerimport",
  "admin.bulkImport.description":
    "\nLaden Sie eine CSV-Datei hoch, um mehrere Betreiberkonten gleichzeitig bereitzustellen.",
  "admin.bulkImport.uploadLabel": "\nCSV-Datei",
  "admin.bulkImport.uploadHint": "\nErwartete Spalten: Name, E-Mail, Rolle",
  "admin.bulkImport.previewTitle": "\nVorschau importieren",
  "admin.bulkImport.previewDescription":
    "\nÜberprüfen Sie die analysierten Zeilen, bevor Sie den Import bestätigen.",
  "admin.bulkImport.confirmImport": "\nImport bestätigen",
  "admin.bulkImport.rowCount": "\n{count} Zeilen analysiert",
  "admin.bulkImport.validRows": "\n{count} gültig",
  "admin.bulkImport.errorRows": "\n{count} Fehler",
  "admin.bulkImport.table.row": "\nZeile",
  "admin.bulkImport.table.name": "\nName",
  "admin.bulkImport.table.email": "\nE-Mail",
  "admin.bulkImport.table.role": "\nRolle",
  "admin.bulkImport.table.status": "\nStatus",
  "admin.bulkImport.table.error": "\nFehler",
  "admin.bulkImport.statusValid": "\nGültig",
  "admin.bulkImport.statusError": "\nFehler",
  "admin.bulkImport.imported": "\n{count} Benutzer erfolgreich importiert.",
  "admin.bulkImport.error.noFile": "\nWählen Sie eine CSV-Datei zum Hochladen aus.",
  "admin.bulkImport.error.parseFailed": "\nDie CSV-Datei kann nicht analysiert werden.",
  "admin.bulkImport.error.importFailed": "\nDer Import kann derzeit nicht abgeschlossen werden.",
  "admin.bulkImport.error.noValidRows": "\nKeine gültigen Zeilen zum Importieren.",
  "admin.bulkImport.validation.missingName": "\nFehlender Name",
  "admin.bulkImport.validation.invalidEmail": "\nUngültige E-Mail-Adresse",
  "admin.bulkImport.validation.invalidRole": "\nUngültige Rolle",
  "admin.health.title": "\nSystemzustand",
  "admin.health.description":
    "\nEchtzeit-Plattformdiagnose mit live aktualisierten Systemmetriken.",
  "admin.health.uptime": "\nBetriebszeit",
  "admin.health.uptimeHint": "\nVerstrichene Zeit seit Beginn des Bun-Prozesses",
  "admin.health.latencyP50": "\nLatenz P50",
  "admin.health.latencyP50Hint": "\nMittlere Anforderungslatenz über aktuelle Stichproben",
  "admin.health.latencyP99": "\nLatenz P99",
  "admin.health.latencyP99Hint": "\nTail-Request-Latenz über aktuelle Samples",
  "admin.health.memoryUsage": "\nSpeichernutzung",
  "admin.health.memoryUsageHint": "\nHeap-Speicherverbrauch der Bun-Laufzeit",
  "admin.health.dbConnections": "\nDatenbankstatus",
  "admin.health.dbConnectionsHint": "\nZustand des PostgreSQL-Verbindungspools",
  "admin.health.errorRate": "\nFehlerrate",
  "admin.health.errorRateHint":
    "\nProzentsatz der Antworten mit dem Status 5xx im aktuellen Fenster",
  "admin.health.refreshInterval": "\nAutomatische Aktualisierung alle 5 Sekunden",
  "admin.health.statusOnline": "\nOnline",
  "admin.health.statusDegraded": "\nDegradiert",
  "admin.health.statusOffline": "\nOffline",
  "admin.apiKeys.title": "\nAPI-Schlüsselverwaltung",
  "admin.apiKeys.description":
    "\nAPI-Schlüssel für Systemintegrationen erstellen, rotieren und widerrufen.",
  "admin.apiKeys.create": "\nAPI-Schlüssel erstellen",
  "admin.apiKeys.nameLabel": "\nSchlüsselname",
  "admin.apiKeys.namePlaceholder": "\nz.B. CI-Pipeline, Überwachungsagent",
  "admin.apiKeys.scopeLabel": "\nGeltungsbereich",
  "admin.apiKeys.scopeRead": "\nLesen",
  "admin.apiKeys.scopeWrite": "\nSchreiben",
  "admin.apiKeys.scopeAdmin": "\nAdmin",
  "admin.apiKeys.expiresLabel": "\nLäuft in (Tagen)",
  "admin.apiKeys.expiresNever": "\nNie",
  "admin.apiKeys.lastUsed": "\nZuletzt verwendet",
  "admin.apiKeys.lastUsedNever": "\nNie benutzt",
  "admin.apiKeys.revoke": "\nWiderrufen",
  "admin.apiKeys.revokeTitle": "\nAPI-Schlüssel widerrufen",
  "admin.apiKeys.revokeDescription":
    "\nDieser API-Schlüssel wird dauerhaft deaktiviert. Diese Aktion kann nicht rückgängig gemacht werden.",
  "admin.apiKeys.revokeConfirm": "\nSchlüssel",
  "admin.apiKeys.revoked": " widerrufen\nAPI-Schlüssel wurde widerrufen.",
  "admin.apiKeys.created":
    "\nAPI-Schlüssel erstellt. Kopieren Sie jetzt den Schlüssel – er wird nicht mehr angezeigt.",
  "admin.apiKeys.table.name": "\nName",
  "admin.apiKeys.table.prefix": "\nSchlüsselpräfix",
  "admin.apiKeys.table.scope": "\nGeltungsbereich",
  "admin.apiKeys.table.createdBy": "\nErstellt von",
  "admin.apiKeys.table.expiresAt": "\nLäuft ab",
  "admin.apiKeys.table.lastUsedAt": "\nZuletzt verwendet",
  "admin.apiKeys.table.status": "\nStatus",
  "admin.apiKeys.table.actions": "\nAktionen",
  "admin.apiKeys.statusActive": "\nAktiv",
  "admin.apiKeys.statusRevoked": "\nWiderrufen",
  "admin.apiKeys.statusExpired": "\nAbgelaufen",
  "admin.apiKeys.empty": "\nEs wurden keine API-Schlüssel erstellt.",
  "admin.apiKeys.error.invalidName": "\nGeben Sie einen gültigen Schlüsselnamen ein.",
  "admin.apiKeys.error.invalidScope": "\nWählen Sie einen gültigen Bereich aus.",
  "admin.apiKeys.error.createFailed": "Der API-Schlüssel kann derzeit nicht erstellt werden.",
  "admin.apiKeys.error.revokeFailed": "\nDer API-Schlüssel kann derzeit nicht widerrufen werden.",
  "admin.lms.title": "\nLernmanagementsystem",
  "admin.lms.description":
    "\nVerwalten Sie Bildungsinhalte, Lehrpläne und die Nachverfolgung des Lernerfortschritts.",
  "admin.lms.courses.title": "\nKurse",
  "admin.lms.modules.title": "\nModule",
  "admin.lms.enrollments.title": "\nAnmeldungen",
  "admin.lms.createCourse": "\nKurs erstellen",
  "admin.lms.table.courseName": "\nKursname",
  "admin.lms.table.instructor": "\nAusbilder",
  "admin.lms.table.enrolled": "\nAngemeldet",
  "admin.lms.table.completionRate": "\nAbschlussrate",
  "admin.lms.status.published": "\nVeröffentlicht",
  "admin.lms.status.draft": "\nEntwurf",
  "admin.lms.status.archived": "\nArchiviert",

  "admin.webhooks.title": "\nWebhook-Konfiguration",
  "admin.webhooks.description":
    "\nRegistrieren Sie Webhook-Endpunkte für die Bereitstellung von Ereignissen in Echtzeit an externe Systeme.",
  "admin.webhooks.urlLabel": "\nEndpunkt-URL",
  "admin.webhooks.urlPlaceholder": "\nhttps://example.com/webhooks/platform",
  "admin.webhooks.secretLabel": "\nSigniergeheimnis",
  "admin.webhooks.eventsLabel": "\nAbonnierte Ereignisse",
  "admin.webhooks.eventsPlaceholder": "\nworkOrder.created, task.completed",
  "admin.webhooks.eventsHint":
    "\nDurch Kommas getrennte Ereignistypen (z. B. workOrder.created, task.completed)",
  "admin.webhooks.activeLabel": "\nAktiv",
  "admin.webhooks.create": "\nWebhook",
  "admin.webhooks.created": " registrieren\nWebhook wurde erfolgreich registriert.",
  "admin.webhooks.test": "\nTest",
  "admin.webhooks.deliveryLog": " senden\nLieferprotokoll",
  "admin.webhooks.table.url": "\nEndpunkt",
  "admin.webhooks.table.events": "\nEreignisse",
  "admin.webhooks.table.status": "\nStatus",
  "admin.webhooks.table.lastDelivered": "\nZuletzt geliefert",
  "admin.webhooks.table.createdBy": "\nErstellt von",
  "admin.webhooks.table.actions": "\nAktionen",
  "admin.webhooks.statusActive": "\nAktiv",
  "admin.webhooks.statusInactive": "\nInaktiv",
  "admin.webhooks.empty": "\nEs wurden keine Webhooks registriert.",
  "admin.webhooks.deleteTitle": "\nWebhook",
  "admin.webhooks.deleteDescription":
    " entfernen\nDieser Webhook wird dauerhaft deaktiviert und entfernt.",
  "admin.webhooks.deleteConfirm": "\nWebhook",
  "admin.webhooks.deleted": "\nWebhook wurde entfernt.",
  "admin.webhooks.error.invalidUrl": "\nGeben Sie eine gültige HTTPS-URL ein.",
  "admin.webhooks.error.invalidEvents": "\nWählen Sie mindestens einen Ereignistyp aus.",
  "admin.webhooks.error.createFailed": "\nDer Webhook kann derzeit nicht registriert werden.",
  "admin.webhooks.error.deleteFailed": "\nDer Webhook kann derzeit nicht entfernt werden.",
  "system.databaseUnavailable":
    "\nDer Live-Datenbankzugriff ist nicht konfiguriert. Legen Sie DATABASE_URL fest, um datengestützte Routen zu aktivieren.",
  "brand.error.hostNotConfigured": "\nDieser Host ist nicht für einen Markenkontext konfiguriert.",
  "kpi.total_assets": "\nGesamtvermögen",
  "kpi.active_tasks": "\nAktive Aufgaben",
  "kpi.predictions_due": "\nVorhersagen fällig",
  "kpi.utilisation_rate": "\nAuslastungsrate",
  "kpi.overdue_maintenance": "\nÜberfällige Wartung",
  "kpi.depreciation_total": "\nAbschreibung Gesamt",
  "common.title": "Title",
  "common.compare": "Compare",
  "common.confidence": "Confidence",
  "common.rationale": "Rationale",
  "common.savedView": "Saved view",
  "common.whatChanged": "What changed",
  "common.back": "\nZurück",
  "common.close": "\nSchließen",
  "common.closeIcon": "✖",
  "common.confirmDelete": "\nDieses Element löschen?",
  "common.delete": "\nLöschen",
  "common.notFound": "\nNicht gefunden",
  "common.yes": "\nja",
  "common.no": "\nnein",
  "common.retry": "\nWiederholen",
  "common.key.alt": "\nAlt",
  "common.key.enter": "\nGeben Sie",
  "common.key.shift": " ein\nShift",
  "common.open": "\nÖffnen",
  "common.refresh": "\nAktualisieren",
  "common.selectionNone": "\nKeine Artikel ausgewählt",
  "common.selectionOne": "\nEins",
  "common.selectAllVisible": "\nAlle sichtbaren auswählen",
  "common.selectAllResults": "\nAlle Ergebnisse auswählen",
  "common.lastUpdated": "\nZuletzt aktualisiert",
  "common.updatedAt": "\nAktualisiert",
  "common.live": "\nLive",
  "common.loading": "\nLoading",
  "common.offlineMessage": "\nSie scheinen offline zu sein. Bitte überprüfen Sie Ihre Verbindung.",
  "common.tabs": "\nTabs",
  "common.toolbar": "\nSymbolleiste",
  "common.emptyValue": "Nicht verfügbar",
  "common.filterChipAria": "\nFilter löschen {label}: {value}",
  "common.pending": "Ausstehend",
  "common.enabled": "\nAktiviert",
  "common.disabled": "\nDeaktiviert",
  "common.percentFormat": "\n{value}%",
  "common.optional": "\noptional",
  "common.system": "\nsystem",
  "common.unknownRole": "\nUnbekannt",
  "common.status": "\nStatus",
  "common.actions": "\nAktionen",
  "common.confirm": " bearbeiten\nBestätigen",
  "common.confirmAction": "\nSind Sie sicher?",
  "common.createdBy": "\nErstellt von",
  "common.date": "\nDatum",
  "common.sharedBy": "\nGeteilt von",
  "common.notifications": "\nBenachrichtigungen",
  "common.period": "\nZeitraum",
  "common.empty": "\nKeine Daten verfügbar",
  "common.emptyTable": "\nKeine Daten zum Anzeigen",
  "common.no_results": "\nKeine Ergebnisse",
  "common.emptySearch": "\nKeine Ergebnisse. Versuchen Sie, Ihre Filter anzupassen.",
  "common.error": "\nEtwas ist schiefgelaufen",
  "common.success": "\nErfolg",
  "workspace.livePanel.lastUpdatedEmpty": "\nWarten auf erste Aktualisierung",
  "workspace.livePanel.emptyDescription":
    "\nFür dieses Live-Panel liegen noch keine Daten vor. Aktualisieren Sie zuerst die Oberfläche oder schließen Sie den Upstream-Workflow ab.",
  "workspace.livePanel.errorDescription":
    "\nDieses Live-Panel konnte nicht aktualisiert werden. Wiederholen Sie die Anfrage oder überprüfen Sie den Upstream-Dienst.",
  "assets.table.empty": "\nNoch kein Vermögen. Registrieren Sie Ihr erstes Gerät, um loszulegen.",
  "assets.table.emptyAction": "\nGerät",
  "finance.depreciation.table.empty":
    "\nKeine Abschreibungsdaten. Hier erscheinen Vermögenswerte mit Kauf- und Buchwerten.",
  "finance.depreciation.table.emptyAction": "\nAssets",
  "common.unknownError": " anzeigen\nUnbekannter Fehler",
  "common.unauthorized": "\nSie haben keinen Zugriff auf diese Ansicht",
  "errors.crossOriginRequestBlocked": "\nCross-Origin-Anfrage blockiert",
  "errors.invalidFileName": "\nUngültiger Dateiname",
  "errors.invalidOriginHeader": "\nUngültiger Ursprungsheader",
  "errors.requestOriginRequired": "Der Ursprung der Anfrage konnte nicht überprüft werden",
  "errors.pageTitle": "\nFehler",
  "errors.backToDashboard": "\nZurück zum Dashboard",
  "errors.genericMessage":
    "\nEtwas ist schief gelaufen. Bitte versuchen Sie es erneut oder kehren Sie zum Dashboard zurück.",
  "common.pagination.page": "\nSeite {page} von {totalPages}",
  "common.pagination.ariaLabel": "\nSeiten-Navigation",
  "common.pagination.resultCount": "{start}–{end} von {count}",
  "common.pagination.range": "{start}–{end} von {total}",
  "common.pagination.pageSize": "\nArtikel pro Seite",
  "common.pagination.previous": "\nVorherige Seite",
  "common.pagination.next": "\nNächste Seite",
  "common.pagination.pageN": "\nSeite {n}",
  "common.pagination.ellipsis": "\nWeitere Seiten",
  "common.sort.asc": "\nAufsteigend sortieren",
  "common.sort.desc": "\nAbsteigend sortieren",
  "common.sort.unsorted": "\nNach dieser Spalte sortieren",
  "chat.bubble.title": "\nKI-Assistent",
  "chat.bubble.placeholder": "\nStellen Sie eine Frage...",
  "chat.bubble.send": "\nSenden",
  "chat.bubble.open": "\nKI-Chat öffnen",
  "chat.bubble.close": "\nChat schließen",
  "chat.bubble.intro": "\nFragen Sie nach Ressourcen, Aufgaben, Prognosen oder Nutzung.",
  "chat.bubble.assistantName": "\nAssistent",
  "chat.bubble.emptyMessageError": "\nGeben Sie vor dem Senden eine Nachricht ein.",
  "chat.bubble.sending": "\nSenden...",
  "chat.bubble.networkError": "\nNetzwerkfehler. Bitte versuchen Sie es erneut.",
  "chat.bubble.voiceStart": "\nSpracheingabe starten",
  "chat.bubble.voiceStop": "\nSpracheingabe stoppen",
  "chat.bubble.voiceUnsupported": "\nSpracheingabe wird in diesem Browser nicht unterstützt.",
  "chat.bubble.voiceListening": "\nZuhören...",
  "chat.bubble.contextSelectionLabel": "\nAuswahl",
  "chat.bubble.contextTitle": "\nIntelligenter Kontext",
  "chat.bubble.contextSubtitle":
    "\nAktueller Seitenkontext, ausgewählter Text und abgelegte Dateien werden in die nächste Antwort übernommen.",
  "chat.bubble.contextPageLabel": "\nSeite",
  "chat.bubble.contextAttachmentLabel": "\nDateien",
  "chat.bubble.addFiles": "\nDateien hinzufügen",
  "chat.bubble.smartChipSummary": "\nSeite",
  "chat.bubble.smartChipSummaryPrompt":
    " zusammenfassen\nFassen Sie den wichtigsten Kontext auf dieser Seite zusammen.",
  "chat.bubble.smartChipActions": "\nNächste Aktionen",
  "chat.bubble.smartChipActionsPrompt":
    "\nIdentifizieren Sie die nächsten Aktionen basierend auf dem aktuellen Seitenkontext.",
  "chat.bubble.smartChipSelection": "\nErklären Sie die Auswahl",
  "chat.bubble.smartChipSelectionPrompt":
    "\nErklären Sie den ausgewählten Inhalt im Kontext dieser Seite.",
  "chat.bubble.dropHint":
    "\nLegen Sie Bilder oder Dokumente hier ab oder klicken Sie zum Anhängen.",
  "chat.bubble.dropMeta":
    "\nBilder werden an multimodale Anbieter gesendet, sofern dies unterstützt wird. Dokumente tragen zum extrahierten Kontext bei.",
  "chat.bubble.composeLabel": "\nPrompt",
  "chat.bubble.composeHint":
    "\nDrücken Sie zum Senden die Eingabetaste. Verwenden Sie Umschalt+Eingabetaste für eine neue Zeile.",
  "chat.bubble.attachmentMetadataOnly": "\nNur Metadaten",
  "chat.bubble.attachmentUnsupported":
    "\nNicht unterstützte Datei. Verwenden Sie ein Bild-, PDF-, TXT-, MD-, CSV-, JSON-, HTML- oder XML-Dokument.",
  "chat.bubble.attachmentLimitReached":
    "\nSie können bis zu {count} Dateien pro Nachricht anhängen.",
  "chat.bubble.attachmentImageTooLarge":
    "\nDer Bildanhang überschreitet die Größenbeschränkung für den KI-Chat.",
  "chat.bubble.attachmentDocumentTooLarge":
    "\nDer Dokumentanhang überschreitet die Größenbeschränkung für den KI-Chat.",
  "chat.bubble.attachmentRemove": "\nAnhang entfernen",
  "chat.bubble.defaultContextPrompt":
    "\nVerwenden Sie den verfügbaren Seitenkontext und die Anhänge, um bei dieser Anfrage zu helfen.",
  "chat.bubble.advisoryOnly":
    "NUR BERATUNG – erfordert eine menschliche Genehmigung vor der Ausführung.",
  "chat.systemPrompt.pageContext": "\n\n\n**Aktueller Seitenkontext:**",
  "chat.systemPrompt.selectionContext": "\n\n\n**Ausgewählter Seitentext:**",
  "chat.systemPrompt.attachmentContext": "\n\n\n**Kontext der angehängten Datei:**",
  "chat.systemPrompt.relevantDocs":
    "\n\n\n**Relevante Dokumentation (zur Information Ihrer Antwort verwenden):**\n",
  "chat.systemPrompt.operationalContextHeader": "\n\n\n**Betriebskontext:**",
  "chat.systemPrompt.operationalCurrencyLine": "\n- Standard-Handelswährung: {currency}",
  "chat.systemPrompt.facilityLocalTimeLine":
    "\n- Ortszeit der Einrichtung ({timezone}): {localTime}",
  "chat.systemPrompt.facilityWeatherLine":
    "- Wetterschnappschuss der Anlage (Open-Meteo): {tempC} °C, Wind {windKmh} km/h, WMO-Code {code}.",
  "chat.error.network": "\nNetzwerkfehler. Bitte versuchen Sie es erneut.",
  "chat.error.auth":
    "\nDie Authentifizierung ist fehlgeschlagen. Bitte überprüfen Sie Ihren API-Schlüssel.",
  "chat.error.rateLimit": "\nRatenlimit überschritten. Bitte versuchen Sie es später noch einmal.",
  "chat.error.invalidResponse": "\nUngültige Antwort vom AI-Dienst.",
  "chat.error.providerError": "Fehler: {message}",
  "chat.error.httpStatus": "\nHTTP {status}",
  "context7.error.fetchFailed": "\nDas Abrufen der Context7-Dokumentation ist fehlgeschlagen.",
  "context7.error.rateLimitExceeded":
    "\nDas Ratenlimit von Context7 wurde überschritten. Versuchen Sie es später noch einmal.",
  "context7.error.apiKeyInvalid": "\nContext7-API-Schlüssel ungültig.",
  "context7.error.searchFailed": "\nContext7-Suche fehlgeschlagen: {status}",
  "context7.error.responseParseFailed": "\nDas Parsen der Context7-Antwort ist fehlgeschlagen.",
  "context7.error.contextFailed": "\nContext7-Kontext fehlgeschlagen: {status}",
  "context7.error.textReadFailed": "\nDas Lesen des Context7-Textes ist fehlgeschlagen.",
  "context7.error.jsonParseFailed": "\nDie JSON-Analyse von Context7 ist fehlgeschlagen.",
  "auth.signIn.rememberMe": "\nErinnere dich an mich",
  "auth.signIn.recoveryHelp":
    "\nPasswort vergessen? Nutzen Sie den Wiederherstellungsablauf Ihres Unternehmens.",
  "auth.signIn.accountProvisioning":
    "\nNeu auf der Plattform? Wenden Sie sich bezüglich der Kontobereitstellung an Ihren Administrator.",
  "auth.signIn.requestAccess": "Request access",
  "auth.signIn.forgotPasswordLink": "\nPasswort vergessen?",
  "auth.signIn.createAccount": "\nNeues Konto erstellen",
  "auth.signIn.validationEmail": "\nGeben Sie eine gültige E-Mail-Adresse ein",
  "auth.signIn.validationPassword": "\nDas Passwort muss mindestens 8 Zeichen lang sein",
  "auth.signIn.heroAlt": "\nAbbildung: Sichere Anmeldung",
  "auth.signIn.errorInvalidCredentials":
    "\nUngültige E-Mail-Adresse oder ungültiges Passwort. Bitte versuchen Sie es erneut.",
  "auth.signIn.errorGeneric": "\nDie Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
  "auth.signIn.loggedOut": "\nSie wurden abgemeldet. Bitte melden Sie sich erneut an.",
  "auth.signIn.securityEyebrow": "\nSicherheitslage",
  "auth.signIn.contextTitle": "\nAnmeldekontext",
  "auth.signIn.contextDescription":
    "\nBringen Sie Benutzer zum richtigen Arbeitsbereich zurück, halten Sie die Wiederherstellung in der Nähe und machen Sie den Sicherheitsstatus vor der Authentifizierung sichtbar.",
  "auth.signIn.destinationLabel": "\nRückflugziel",
  "auth.signIn.capabilitiesLabel": "\nAktivierte Authentifizierungsmethoden",
  "auth.signIn.capabilityPasswordOnly": "\nDie Passwortauthentifizierung ist derzeit aktiviert.",
  "auth.signIn.capabilityPasswordPasskey":
    "\nFür diesen Arbeitsbereich sind Kennwort- und Passkey-Authentifizierung aktiviert.",
  "auth.signIn.capabilityPasswordSso":
    "\nFür diesen Arbeitsbereich sind Passwort und Single Sign-On aktiviert.",
  "auth.signIn.capabilityPasswordPasskeySso":
    "\nKennwort, Hauptschlüssel und Single Sign-On sind für diesen Arbeitsbereich aktiviert.",
  "auth.signIn.passkeyLabel": "\nAuthentifizierungsoptionen",
  "auth.signIn.passkeyValue": "\nPasswort heute, Passkey und SSO bereit",
  "auth.signIn.methodTitle": "\nAuthentifizierungsmethoden",
  "auth.signIn.methodDescription":
    "\nWählen Sie den Anmeldepfad für diesen Arbeitsbereich. Das Passwort bleibt auch dann verfügbar, wenn die Unternehmensidentität aktiviert ist.",
  "auth.signIn.methodPasswordTitle": "\nPasswort-Anmeldung",
  "auth.signIn.methodPasswordDescription":
    "\nVerwenden Sie Ihre E-Mail-Adresse und Ihr Passwort, um den gewünschten Arbeitsbereich direkt zu betreten.",
  "auth.signIn.methodPasswordBadge": "\nStandard",
  "auth.signIn.methodPasswordAction": "\nPasswort verwenden",
  "auth.signIn.methodPasskeyTitle": "\nAnmeldung mit Passkey",
  "auth.signIn.methodPasskeyDescription":
    "\nVerwenden Sie einen Passkey auf diesem Gerät, um sich ohne Eingabe Ihres Passworts anzumelden.",
  "auth.signIn.methodPasskeyAction": "Weiter mit Passkey",
  "auth.signIn.methodSsoTitle": "\nEinmaliges Anmelden",
  "auth.signIn.methodSsoDescription":
    "\nFahren Sie mit dem Identitätsanbieter Ihres Unternehmens fort und kehren Sie nach der Überprüfung zum angeforderten Arbeitsbereich zurück.",
  "auth.signIn.methodSsoBadge": "\nEmpfohlen",
  "auth.signIn.methodSsoAction": "Weiter mit SSO",
  "auth.signIn.passkeyAutoFillHint":
    "\nWenn Ihr Browser es unterstützt, kann ein gespeicherter Passkey in der Autofill-Auswahl dieser Seite erscheinen.",
  "auth.signIn.passkeyPending": "\nSchließen Sie die Passkey-Bestätigung ab, um fortzufahren.",
  "auth.signIn.errorPasskeyUnavailable":
    "\nDie Passkey-Anmeldung ist in diesem Browser nicht verfügbar.",
  "auth.signIn.errorPasskeyFailed":
    "\nDie Passkey-Anmeldung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
  "auth.signIn.errorSsoUnavailable":
    "\nSingle Sign-On ist für diesen Arbeitsbereich noch nicht verfügbar.",
  "auth.signIn.errorSsoStart":
    "\nSingle Sign-On konnte nicht gestartet werden. Bitte versuchen Sie es erneut.",
  "auth.signIn.progressTitle": "\nAnmeldeablauf",
  "auth.signIn.progressDescription":
    "\nBestätigen Sie das Ziel, authentifizieren Sie sich und überprüfen Sie dann den Sicherheitsstatus, bevor Sie den Arbeitsbereich betreten.",
  "auth.signIn.progressStep.destination": "\nZiel",
  "auth.signIn.progressStep.authenticate": "\nAuthentifizieren",
  "auth.signIn.progressStep.review": "\nÜberprüfen Sie den Zugriff",
  "auth.signIn.securityPointOne":
    "\nDurch den rollenbezogenen Zugriff bleiben Finanz-, Betriebs- und Berichtsoberflächen isoliert.",
  "auth.signIn.securityPointTwo":
    "\nVom Server gerenderte Workflows reduzieren die Gefährdung von Betriebsdaten auf der Clientseite.",
  "auth.signIn.securityPointThree":
    "\nAudit-gestützte Asset-, Aufgaben- und Berichtsaktionen bleiben nach der Anmeldung nachvollziehbar.",
  "auth.password.showPassword": "\nPasswort anzeigen",
  "auth.password.hidePassword": "\nPasswort ausblenden",
  "apiExplorer.page.eyebrow": "\nEntwickler-Tools",
  "apiExplorer.title": "\nAPI-Explorer",
  "api.docs.title": "Baohaus API",
  "api.docs.description": "Public, operations, and partner APIs surfaced by the Baohaus platform.",
  "apiExplorer.subtitle": "\nDurchsuchen Sie alle registrierten Routen, Endpunkte und Oberflächen",
  "apiExplorer.searchLabel": "\nRouten suchen",
  "apiExplorer.searchPlaceholder": "\nNach Pfad oder Methode filtern",
  "apiExplorer.filters.title": "\nRouteninventar verfeinern",
  "apiExplorer.filters.description":
    "Das registrierte Routeninventar nach Oberflaeche oder Suchbegriff filtern.",
  "apiExplorer.filters.surface": "Oberflaeche",
  "apiExplorer.table.index": "Nr.",
  "apiExplorer.table.method": "\nMethode",
  "apiExplorer.table.path": "\nPfad",
  "apiExplorer.table.surface": "\nOberfläche",
  "apiExplorer.table.action": "Route oeffnen",
  "apiExplorer.summary.filtered": "\nGefiltert",
  "apiExplorer.summary.filteredDescription": "\nDerzeit in diesem Arbeitsbereich sichtbare Routen",
  "apiExplorer.summary.total": "\nGesamt",
  "apiExplorer.summary.totalDescription": "\nÜber die Anwendung registrierte Routen",
  "apiExplorer.summary.htmlDescription": "\nIn der authentifizierten Shell verfügbare SSR-Seiten",
  "apiExplorer.summary.apiDescription": "\nBetriebs- und Plattform-API-Endpunkte",
  "apiExplorer.summary.regionAria": "\nZusammenfassung der API Explorer-Routen",
  "apiExplorer.results.title": "\nRouteninventar",
  "apiExplorer.results.initialLimitTitle": "\nDie ersten {shown} Routen werden angezeigt",
  "apiExplorer.results.initialLimitDescription":
    "\nVerwenden Sie Oberflächenfilter oder die Suche, um das vollständige Verzeichnis mit {total} registrierten Routen zu prüfen.",
  "apiExplorer.results.summary": "\n{filtered} gefiltert / {total} insgesamt",
  "apiExplorer.empty.title": "\nKeine Routen entsprechen diesen Filtern",
  "apiExplorer.empty.description":
    "Aktuelle Filter zuruecksetzen oder den Suchbegriff erweitern, um mehr vom Routeninventar zu sehen.",
  "apiExplorer.openHtmlAria": "Arbeitsbereichsroute oeffnen",
  "apiExplorer.openEndpointAria": "Endpunkt oeffnen",
  "apiExplorer.tab.all": "\nAlle",
  "apiExplorer.tab.api": "API-Schnittstelle",
  "apiExplorer.tab.html": "HTML-Ansicht",
  "apiExplorer.tab.static": "\nStatisch",
  "apiExplorer.tab.auth": "\nAuth",
  "nav.apiExplorer": "\nAPI-Explorer",
  "customisation.title": "\nAnpassung",
  "customisation.subtitle": "\nThema, Einstellungen und Anzeigeoptionen",
  "customisation.theme": "\nThema",
  "customisation.themeDescription":
    "\nWählen Sie den hellen oder dunklen Modus für die Schnittstelle",
  "customisation.preferences": "\nPräferenzen",
  "customisation.lightMode": "\nLichtmodus",
  "customisation.preferencesDescription": "\nAnzeige- und Benachrichtigungseinstellungen.",
  "customisation.chatBubble": "\nKI-Chat-Blase auf Dashboard anzeigen",
  "customisation.workspaceDefaults.title": "\nArbeitsbereich-Standardwerte",
  "customisation.workspaceDefaults.subtitle":
    "\nLegen Sie die Zielseite und die Assistenten fest, die Ihren täglichen Ausgangspunkt prägen.",
  "customisation.autoSaveHint": "Änderungen werden automatisch gespeichert",
  "customisation.workspacePresets.title": "\nArbeitsbereich-Voreinstellungen",
  "customisation.workspacePresets.subtitle":
    "\nWählen Sie Task-Workbench-Standardeinstellungen, die an Ihre Workspace-Cookies gebunden bleiben.",
  "customisation.workspacePresets.primaryView": "\nPrimäre Aufgabenansicht",
  "customisation.workspacePresets.secondaryView": "\nSekundäre Aufgabenansicht",
  "customisation.workspacePresets.taskView.activeBoard": "\nAktives Board",
  "customisation.workspacePresets.taskView.activeBoardDescription":
    "\nÖffnen Sie das Flowboard für aktive Arbeiten, die bereits ausgeführt werden.",
  "customisation.workspacePresets.taskView.triageBoard": "\nTriage-Board",
  "customisation.workspacePresets.taskView.triageBoardDescription":
    "\nBeginnen Sie mit dem Rückstand und entwerfen Sie Arbeiten, für die noch eine Entscheidung des Bedieners erforderlich ist.",
  "customisation.workspacePresets.taskView.dispatchQueue": "Versandwarteschlange",
  "customisation.workspacePresets.taskView.dispatchQueueDescription":
    "Öffnen Sie die Warteschlange mit nicht zugewiesener Arbeit, die für die Personalbesetzung und -planung bereitsteht.",
  "customisation.workspacePresets.taskView.slaQueue": "\nSLA-Warteschlange",
  "customisation.workspacePresets.taskView.slaQueueDescription":
    "\nBleiben Sie bei fälliger Arbeit, wobei der Termindruck standardmäßig sichtbar ist.",
  "customisation.workspacePresets.taskView.myQueue": "\nMeine Warteschlange",
  "customisation.workspacePresets.taskView.myQueueDescription":
    "\nBeginnen Sie mit den Aufgaben, die bereits dem aktuellen Betreiber gehören.",
  "customisation.defaultLanding.title": "\nStandard-Landingpage",
  "customisation.defaultLanding.description":
    "\nWählen Sie aus, welcher Arbeitsbereich sofort nach der Anmeldung geöffnet wird.",
  "digitalTwin.view3D": "\n3D-Ansicht",
  "digitalTwin.view2D": "\n2D-Ansicht",
  "digitalTwin.viewToggle": "\nDigitaler Zwillingsansicht umschalten",
  "digitalTwin.filters": "\nFilter",
  "digitalTwin.overlays": "\nOverlays",
  "digitalTwin.loadModel": "\nUSD-Modell laden",
  "digitalTwin.filter.showHotspots": "\nHotspots anzeigen",
  "digitalTwin.filter.showGrid": "\nGitter anzeigen",
  "digitalTwin.filter.showAssetLabels": "\nAsset-Labels anzeigen",
  "digitalTwin.badge.view3D": "3D-Ansicht",
  "digitalTwin.badge.stream": "Streaming",
  "digitalTwin.error.modelLoadFailed":
    "\nDas Laden des Modells ist fehlgeschlagen. Fallback wird angezeigt.",
  "digitalTwin.error.viewerInitFailed": "\nDie Initialisierung des 3D-Viewers ist fehlgeschlagen.",
  "nav.collapseSidebar": "\nSeitenleiste einklappen",
  "nav.expandSidebar": "\nSeitenleiste erweitern",
  "nav.commandPalette": "\nBefehlspalette",
  "nav.commandPaletteHint": "\nSuchseiten, Assets, Aufgaben und Aktionen...",
  "nav.commandPaletteOpen": "\nBefehlspalette öffnen",
  "nav.commandPaletteDismissKey": "\nEsc",
  "nav.commandPaletteEmpty": "\nKeine Ergebnisse gefunden",
  "nav.commandPaletteNavigation": "\nNavigation",
  "nav.commandPaletteAssets": "\nVermögenswerte",
  "nav.commandPaletteTasks": "\nAufgaben",
  "nav.commandPaletteActions": "\nAktionen",
  "common.sortAsc": "\nAufsteigend sortieren",
  "common.sortDesc": "\nAbsteigend sortieren",
  "common.sortNone": "\nUnsortiert",
  "common.bulkSelect": "\nWählen Sie",
  "common.bulkActions": "\nMassenaktionen",
  "common.bulkSelectAll": "\nAlles auswählen",
  "common.clearFilters": "\nAlle Filter löschen",
  "common.clearSelection": "\nAuswahl aufheben",
  "common.selectedCount": "\n{selected} von {total} ausgewählt",
  "common.stats": "\nStatistiken",
  "common.dashboard": "\nDashboard",
  "filter.label": "\nErgebnisse filtern",
  "filter.resultCount": "\n{count} Ergebnisse",
  "list.empty.description": "\nKeine Elemente zum Anzeigen",
  "nav.no_tiles": "\nKeine Navigationskacheln",
  "nav.no_tiles.description": "\nIn diesem Abschnitt sind keine Elemente verfügbar",
  "common.filter.search": "\nSuchen…",
  "common.markReviewed": "\nAls bewertet markieren",
  "common.filterChipClear": "\nFilter entfernen",
  "common.clearAll": "\nAlles löschen",
  "common.exportCsv": "\nCSV",
  "common.dateRange": "\nDatumsbereich",
  "common.dateRange.7d": "\nLetzte 7 Tage",
  "common.dateRange.30d": "\nLetzte 30 Tage",
  "common.dateRange.90d": "\nLetzte 90 Tage",
  "common.dateRange.custom": "\nBenutzerdefinierter Bereich",
  "common.last7Days": "\nLetzte 7 Tage",
  "common.last30Days": "\nLetzte 30 Tage",
  "common.last90Days": "\nLetzte 90 Tage",
  "common.allTime": "\nAlle Zeiten",
  "common.currentQuarter": "\nAktuelles Quartal",
  "common.lastQuarter": "\nLetztes Quartal",
  "common.yearToDate": "\nBisheriges Jahr",
  "common.addAnother": "\nWeiteres hinzufügen",
  "common.edit": "\nBearbeiten",
  "common.save": "\nSpeichern",
  "common.cancel": "\nAbbrechen",
  "common.noData": "\nKeine Daten verfügbar",
  "common.tryAgain": "\nVersuchen Sie es erneut",
  "common.loadingSkeleton": "\nInhalt wird geladen",
  "common.stepOf": "\nSchritt {current} von {total}",
  "common.getStarted": "\nErste Schritte",
  "common.learnMore": "\nErfahren Sie mehr",
  "common.viewAll": "\nAlle anzeigen",
  "common.collapse": "\nZusammenbruch",
  "common.expand": "\nErweitern",
  "assets.bulkExport": "\nAusgewählte exportieren",
  "assets.bulkStatusUpdate": "\nAktualisierungsstatus",
  "assets.bulkExportSuccess": "\nVorbereiteter Export für {count} Assets",
  "assets.bulkStatusSuccess": "\nStatusaktualisierung in der Warteschlange für {count} Assets",
  "assets.empty": "\nKeine Assets gefunden",
  "assets.emptyCta": "\nGerät",
  "assets.mediaEmpty": "\nKeine Medien – Dateien hierher ziehen oder zum Hochladen klicken",
  "assets.mediaFormats": "\nAkzeptiert: JPEG, PNG, WebP",
  "assets.mediaMaxSize": "\nMaximale Dateigröße: 10 MB",
  "assets.editAsset": "\nAsset",
  "assets.detail.metadata": " bearbeiten\nAsset-Metadaten",
  "assets.detail.pinnedTitle": "\nAngehefteter Fokus",
  "assets.detail.pinnedDescription":
    "\nLassen Sie die aktuelle Registerkarte angeheftet, während Sie zwischen den Risiko-, Lebenszyklus- und Governance-Ansichten wechseln.",
  "assets.detail.pinnedBadge": "\nAngepinnt",
  "assets.detail.pinnedCurrent": "\nAktuelle angeheftete Ansicht",
  "assets.detail.pinnedOpen": "\nAngepinnte Ansicht öffnen",
  "assets.detail.pinnedReset": "\nZur Übersicht zurücksetzen",
  "assets.detail.unresolvedInspectionEmpty": "\nNoch keine Inspektion erfasst.",
  "assets.detail.unresolvedRisk": "\nRisikohaltung",
  "assets.detail.unresolvedRiskDescription":
    "\nÜberprüfen Sie die aktuellen Risikotreiber, KI-Signale und überfälligen Inspektionen.",
  "assets.detail.unresolvedLifecycle": "\nLebenszyklushaltung",
  "assets.detail.unresolvedLifecycleDescription":
    "\nÜberprüfen Sie die Lebenszykluskosten, die verbleibende Lebensdauer und die Ersatzplanung.",
  "assets.detail.unresolvedGovernance": "\nGovernance-Haltung",
  "assets.detail.unresolvedGovernanceDescription":
    "\nÜberprüfen Sie die FM-Governance, die Compliance-Abdeckung und die verknüpften Datensätze.",
  "assets.detail.unresolvedTitle": "\nUngelöste Schwerpunktbereiche",
  "assets.detail.unresolvedDescription":
    "\nNutzen Sie diese Einstiegspunkte, um direkt zum nächsten ungelösten Vermögensproblem überzugehen.",
  "assets.detail.unresolvedBadge": "\nMuss überprüft werden",
  "assets.detail.summaryTitle": "\nArbeitsbereichszusammenfassung",
  "assets.detail.summaryDescription":
    "Halten Sie beim Navigieren den aktuellen Anlagenkontext, die letzte Inspektion und die verknüpfte Arbeitslast sichtbar.",
  "assets.detail.summarySiteDescription": "\nSite- und Asset-Typ",
  "assets.detail.summaryInspectionTitle": "\nLetzte Inspektion",
  "assets.detail.summaryInspectionDescription":
    "\nZuletzt für diese Anlage aufgezeichneter Inspektionsstatus.",
  "assets.detail.summaryInspectionSupporting":
    "\nDer Inspektionsverlauf folgt dem gemeinsamen Wartungsprotokoll.",
  "assets.detail.summaryWorkOrderTitle": "\nVerknüpfte Arbeitsaufträge",
  "assets.detail.summaryWorkOrderDescription":
    "\nAktuelle verknüpfte Arbeitslast über die gesamte Lebenszyklusaktivität hinweg.",
  "assets.detail.navigatorTitle": "\nAbschnittsnavigator",
  "assets.detail.navigatorDescription":
    "\nWechseln Sie zwischen Asset-Detailabschnitten, ohne den aktuellen Asset-Kontext zu verlieren.",
  "assets.detail.priorityTitle": "\nRisikopriorisierung und Leistung",
  "assets.detail.priorityDescription":
    "\nAbgeleitete Haltung für risikobasierte Wartungspriorisierung unter Verwendung des aktuellen Zustands, offener Arbeiten, Inspektionen und KI-Vorhersagesignalen.",
  "assets.detail.priorityStateStable": "\nStabil",
  "assets.detail.priorityStateWatch": "\nAnsehen",
  "assets.detail.priorityStateCritical": "\nKritisch",
  "assets.detail.priorityAlertCriticalTitle": "\nSofortiges Eingreifen wird empfohlen",
  "assets.detail.priorityAlertCriticalDescription":
    "\n{count} Kritische Vorhersagesignale, eingeschränkter Zustand oder überfällige Inspektionen führen dazu, dass dieses Asset an die Spitze der Warteschlange gelangt.",
  "assets.detail.priorityAlertWatchTitle": "\nAktive Überwachung und Planung sind erforderlich",
  "assets.detail.priorityAlertWatchDescription":
    "\n{count} offene Aufgaben, aktive Arbeit oder unkritische Signale erfordern noch die Aufmerksamkeit des Bedieners für dieses Asset.",
  "assets.detail.priorityAlertStableTitle":
    "\nDie Anlage wird innerhalb der kontrollierten Basislinie",
  "assets.detail.priorityAlertStableDescription":
    " betrieben.\nDerzeit erhöhen keine aktiven Bedingungs-, Inspektions-, Arbeitsauftrags- oder Vorhersagetreiber dieses Asset.",
  "assets.detail.priorityConditionDriver": "\nDie Zustandshaltung trägt zur Priorisierung bei.",
  "assets.detail.prioritySignalsDriver":
    "\nKI-Vorhersagesignale erhöhen die Dringlichkeit von Interventionen.",
  "assets.detail.priorityInspectionsDriver":
    "\nÜberfällige Inspektionen schränken die Bereitschaft ein.",
  "assets.detail.priorityWorkOrdersDriver":
    "\nAktive Arbeitsaufträge weisen auf eine ungelöste betriebliche Arbeitsbelastung hin.",
  "assets.detail.priorityTasksDriver":
    "\nDer Rückstand offener Aufgaben erfordert weiterhin Asset-Aufmerksamkeit.",
  "assets.detail.priorityNoDrivers": "\nKeine aktiven Priorisierungstreiber.",
  "assets.detail.priorityUtilisationTitle": "\nNutzungsstunden",
  "assets.detail.priorityUtilisationDescription":
    "\nVerfolgtes Betriebsstundensignal, das derzeit in diesem Asset-Datensatz enthalten ist.",
  "assets.detail.priorityOpenTasksTitle": "\nOffene Aufgaben",
  "assets.detail.priorityOpenTasksDescription":
    "\nRückstände, geplante und laufende Aufgaben, die mit diesem Asset verknüpft sind.",
  "assets.detail.priorityInspectionsTitle": "\nÜberfällige Inspektionen",
  "assets.detail.priorityInspectionsDescription":
    "\nInspektionsaufgaben sind abgelaufen und immer noch ungelöst.",
  "assets.detail.priorityWorkOrdersTitle": "\nAktive Arbeitsaufträge",
  "assets.detail.priorityWorkOrdersDescription":
    "\nVerknüpfte Arbeitsaufträge durchlaufen noch die operative Lieferung.",
  "assets.detail.priorityPredictionsTitle": "\nAktuelle Vorhersagesignale",
  "assets.detail.priorityPredictionsDescription":
    "\n{count} Gesamtvorhersagesignale sind derzeit mit diesem Asset verknüpft.",
  "assets.detail.priorityPredictionsEmpty":
    "Derzeit sind keine Vorhersagesignale mit diesem Asset verknüpft.",
  "assets.detail.priorityPredictionsColumnType": "\nSignal",
  "assets.detail.priorityPredictionsColumnSeverity": "\nSchweregrad",
  "assets.detail.priorityPredictionsColumnRemainingLife": "\nVerbleibende Lebensdauer",
  "assets.detail.priorityPredictionsColumnConfidence": "\nVertrauen",
  "assets.detail.priorityPredictionsColumnAction": "\nGenerierte Aktion",
  "assets.detail.priorityPredictionsRemainingLifeValue": "\n{days} Tage",
  "assets.detail.priorityGeneratedTask": "\nGenerierte Aufgabe",
  "assets.detail.priorityGeneratedWorkOrderAria":
    "\nÖffnen Sie den generierten Arbeitsauftrag {number}",
  "assets.detail.priorityNoAction": "\nKeine generierte Aktion",
  "assets.detail.readinessTitle": "\nBetriebsbereitschaft und Verfügbarkeit",
  "assets.detail.readinessDescription":
    "\nBereitschaftsstatus auf Anlagenebene unter Verwendung verknüpfter Entfernungs-, Sicherheits-, Zielerfassungs- und GFE-Kontrolldatensätze zusammen mit der aktuellen Inspektions- und Lieferarbeitslast.",
  "assets.detail.readinessStateReady": "\nBereit",
  "assets.detail.readinessStateWatch": "\nAnsehen",
  "assets.detail.readinessStateConstrained": "\nEingeschränkt",
  "assets.detail.readinessAlertConstrainedTitle":
    "\nDie betriebliche Verfügbarkeit ist derzeit eingeschränkt",
  "assets.detail.readinessAlertConstrainedDescription":
    "\n{controls} verknüpfte Kontrolldatensätze erfordern Maßnahmen und {inspections} überfällige Inspektionsaufgaben bleiben für diese Anlage offen.",
  "assets.detail.readinessAlertCoverageGapTitle":
    "\nDie Bereitschaftsabdeckung muss eingerichtet werden",
  "assets.detail.readinessAlertCoverageGapDescription":
    "\nDieses fähigkeitsbezogene Asset ist noch nicht durch verknüpfte Betriebskontrolldatensätze für {capability} abgesichert. Erfassen Sie Bereitschaftskontrollen, um die direkte Verfügbarkeitstransparenz wiederherzustellen.",
  "assets.detail.readinessAlertWatchTitle": "\nDie Bereitschaft sollte genau überwacht werden",
  "assets.detail.readinessAlertWatchDescription":
    "\n{controls} verknüpfte Kontrolldatensätze bleiben unter Beobachtung und {workOrders} aktive Arbeitsaufträge wirken sich immer noch auf diese Anlage aus.",
  "assets.detail.readinessAlertReadyTitle":
    "\nDerzeit sind keine aktiven Bereitschaftsblocker erfasst",
  "assets.detail.readinessAlertReadyDescription":
    "\n{controls} verknüpfte Kontrolldatensätze sind derzeit für dieses Asset verfügbar und konform.",
  "assets.detail.readinessControlDriver":
    "\nVerknüpfte Betriebskontrolldatensätze fehlen oder weisen einen frühen Verfügbarkeitsdruck auf.",
  "assets.detail.readinessComplianceDriver":
    "\nDie Compliance-Situation schränkt die Asset-Bereitschaft aktiv ein.",
  "assets.detail.readinessConditionDriver":
    "\nDer Anlagenzustand trägt zur aktuellen Bereitschaftslage bei.",
  "assets.detail.readinessInspectionDriver":
    "\nÜberfällige Inspektionen schränken die Betriebsverfügbarkeit ein.",
  "assets.detail.readinessWorkOrderDriver":
    "\nAktive Arbeitsaufträge beeinflussen immer noch die Anlagenverfügbarkeit.",
  "assets.detail.readinessTaskDriver":
    "\nFür dieses Asset müssen noch offene operative Aufgaben geklärt werden.",
  "assets.detail.readinessCapabilityDriver":
    "\nPeer-Assets in derselben Fähigkeitskohorte bleiben eingeschränkt.",
  "assets.detail.readinessNoDrivers": "\nKeine aktiven Bereitschaftstreiber.",
  "assets.detail.readinessDriversTitle": "\nBereitschaftstreiber",
  "assets.detail.readinessCapabilityValue": "\nFähigkeit: {capability}",
  "assets.detail.readinessLinkedControlsTitle": "\nVerknüpfte Kontrolldatensätze",
  "assets.detail.readinessLinkedControlsDescription":
    "\n{available} derzeit verfügbar oder kompatibel, neuestes Update {timestamp}.",
  "assets.detail.readinessLinkedControlsEmptyDescription":
    "\nFür diese Anlage wurden noch keine verknüpften Betriebskontrolldatensätze erfasst.",
  "assets.detail.readinessActionRequiredTitle": "\nSteuerelemente, die Maßnahmen erfordern",
  "assets.detail.readinessActionRequiredDescription":
    "\n{watch} weitere Kontrolldatensätze bleiben unter Beobachtung.",
  "assets.detail.readinessInspectionTitle": "\nÜberfällige Inspektionen",
  "assets.detail.readinessInspectionDescription":
    "Inspektionsaufgaben, deren Frist überschritten und noch ungelöst ist.",
  "assets.detail.readinessWorkOrdersTitle": "\nAktive Arbeitsaufträge",
  "assets.detail.readinessWorkOrdersDescription":
    "\nVerknüpfte Arbeitsaufträge durchlaufen derzeit die operative Lieferung.",
  "assets.detail.readinessTasksTitle": "\nOffene operative Aufgaben",
  "assets.detail.readinessTasksDescription":
    "\nRückstand, geplante und laufende Arbeiten sind immer noch mit dieser Anlage verknüpft.",
  "assets.detail.readinessCapabilityTitle": "\nFähigkeitskohorte",
  "assets.detail.readinessCapabilityValueShort": "\n{ready}/{total} bereit",
  "assets.detail.readinessCapabilityDescription":
    "\n{constrained} Peer-Assets bleiben in dieser verknüpften Fähigkeitskohorte eingeschränkt.",
  "assets.detail.readinessCapabilityEmptyDescription":
    "\nFür diese Anlage ist derzeit keine Betriebsfähigkeitsverknüpfung erfasst.",
  "assets.detail.readinessRecordsTitle": "\nVerknüpfte Bereitschaftsdatensätze",
  "assets.detail.readinessRecordsDescription":
    "\nAktuelle Aufzeichnungen zu Reichweite, Sicherheit, Zielgenauigkeit und GFE-Kontrolle, die direkt mit diesem Asset verknüpft sind.",
  "assets.detail.readinessRecordsEmpty":
    "\nFür dieses Asset wurden noch keine verknüpften Bereitschafts- oder Verfügbarkeitsdatensätze erfasst.",
  "assets.detail.readinessControlColumn": "\nKontrolle",
  "assets.detail.readinessOperationalColumn": "\nBetriebshaltung",
  "assets.detail.readinessComplianceColumn": "\nCompliance-Haltung",
  "assets.detail.readinessSignalColumn": "\nBetriebssignal",
  "assets.detail.readinessUpdatedColumn": "\nAktualisiert",
  "assets.detail.readinessSignalMetric": "{value} ",
  "assets.detail.readinessSignalMetricWithUnit": "Wert: {value} {unit}",
  "assets.detail.readinessSignalTargetDate": "\nZieldatum {date}",
  "assets.detail.readinessSignalNone": "\nNoch kein Betriebssignal aufgezeichnet.",
  "assets.detail.readinessOpenWorkspace": "\nOffener Arbeitsbereich „Nachlass“",
  "assets.detail.readinessOpenWorkspaceAria": "\nOffener Arbeitsbereich „Nachlass“",
  "assets.detail.fmGovernanceTitle": "\nFM-Governance und Compliance-Haltung",
  "assets.detail.fmGovernanceDescription":
    "\nFacility-Management-Governance auf Anlagenebene mithilfe verknüpfter SFG20-Pläne, gesetzlicher Inspektionen, Compliance-Aufzeichnungen und damit verbundener Lieferarbeiten.",
  "assets.detail.fmGovernanceStateAssured": "\nGesichert",
  "assets.detail.fmGovernanceStateWatch": "\nAnsehen",
  "assets.detail.fmGovernanceStateActionRequired": "\nAktion erforderlich",
  "assets.detail.fmGovernanceAlertActionRequiredTitle":
    "\nFM-Governance erfordert sofortige Aufmerksamkeit",
  "assets.detail.fmGovernanceAlertActionRequiredDescription":
    "\n{attention} verknüpfte Governance-Datensätze erfordern Maßnahmen und {overdue} Zeitplanelemente sind für dieses Asset bereits überfällig.",
  "assets.detail.fmGovernanceAlertCoverageGapTitle":
    "\nDie FM-Governance-Abdeckung wurde nicht eingerichtet",
  "assets.detail.fmGovernanceAlertCoverageGapDescription":
    "\nFür dieses Asset werden derzeit keine verknüpften FM-Governance-Datensätze erfasst. Fügen Sie gesetzliche, SFG20- oder Service-Governance-Datensätze hinzu, um die Transparenz der Absicherung wiederherzustellen.",
  "assets.detail.fmGovernanceAlertWatchTitle": "\nDie FM-Governance sollte genau überwacht werden",
  "assets.detail.fmGovernanceAlertWatchDescription":
    "\n{watch} verknüpfte Governance-Datensätze bleiben unter Beobachtung, {dueSoon} sind bald fällig und {workOrders} verknüpfte Arbeitsaufträge sind noch aktiv.",
  "assets.detail.fmGovernanceAlertAssuredTitle": "\nDie FM-Governance ist derzeit gewährleistet",
  "assets.detail.fmGovernanceAlertAssuredDescription":
    "\n{linked} verknüpfte Governance-Datensätze werden derzeit ohne aktive FM-Compliance-Blocker für dieses Asset verfolgt.",
  "assets.detail.fmGovernanceCoverageDriver":
    "\nFür diesen Vermögenswert fehlt die verknüpfte FM-Governance-Abdeckung.",
  "assets.detail.fmGovernanceAttentionDriver":
    "\nFür einen oder mehrere FM-Governance-Datensätze sind bereits Korrekturmaßnahmen erforderlich.",
  "assets.detail.fmGovernanceMonitoringDriver":
    "\nGovernance-Daten bleiben unter Beobachtung und müssen genau überwacht werden.",
  "assets.detail.fmGovernanceScheduleDriver":
    "\nAnstehende oder überfällige Governance-Termine bestimmen die aktuelle Lage.",
  "assets.detail.fmGovernanceWorkOrdersDriver":
    "Verknüpfte Arbeitsaufträge bewegen weiterhin FM-Governance-Aktionen bis zur Lieferung.",
  "assets.detail.fmGovernanceNoDrivers": "\nKeine aktiven FM-Governance-Treiber.",
  "assets.detail.fmGovernanceDriversTitle": "\nFM-Governance-Treiber",
  "assets.detail.fmGovernanceLinkedRecordsTitle": "\nVerknüpfte Governance-Datensätze",
  "assets.detail.fmGovernanceLinkedRecordsDescription":
    "\nLetzte Governance-Aktivität aktualisiert {timestamp}.",
  "assets.detail.fmGovernanceLinkedRecordsEmptyDescription":
    "\nMit diesem Asset wurden noch keine FM-Governance-Datensätze verknüpft.",
  "assets.detail.fmGovernanceAttentionTitle": "\nAufmerksamkeitsaufzeichnungen",
  "assets.detail.fmGovernanceAttentionDescription":
    "\n{watch} weitere Governance-Datensätze bleiben unter Beobachtung.",
  "assets.detail.fmGovernanceScheduleTitle": "\nÜberfällige Zeitpläne",
  "assets.detail.fmGovernanceScheduleDescription":
    "\n{dueSoon} Weitere Governance-Datensätze sind in Kürze fällig.",
  "assets.detail.fmGovernanceWorkOrdersTitle": "\nAktiv verknüpfte Arbeitsaufträge",
  "assets.detail.fmGovernanceWorkOrdersDescription":
    "\nArbeitsaufträge, die direkt mit der FM-Governance-Lieferung für diese Anlage verbunden sind.",
  "assets.detail.fmGovernanceStatutoryTitle": "\nGesetzliche Inspektionen",
  "assets.detail.fmGovernanceStatutoryDescription":
    "\nMit diesem Vermögenswert verknüpfte direkte Aufzeichnungen zur gesetzlichen Inspektionsverwaltung.",
  "assets.detail.fmGovernanceSfg20Title": "\nSFG20-Zeitpläne",
  "assets.detail.fmGovernanceSfg20Description":
    "\nVerknüpfte SFG20-Wartungspläne, die für diese Anlage verfolgt werden.",
  "assets.detail.fmGovernanceRecordsTitle": "\nAktuelle FM-Governance-Aufzeichnungen",
  "assets.detail.fmGovernanceRecordsDescription":
    "\nAktuelle Facility-Management-Governance-Datensätze, die direkt mit diesem Asset verknüpft sind.",
  "assets.detail.fmGovernanceRecordsEmpty":
    "\nFür dieses Asset wurden noch keine FM-Governance- oder Compliance-Datensätze erfasst.",
  "assets.detail.fmGovernanceRecordColumn": "\nRecord",
  "assets.detail.fmGovernanceDomainColumn": "\nDomäne",
  "assets.detail.fmGovernancePostureColumn": "\nHaltung",
  "assets.detail.fmGovernanceDueColumn": "\nFällig und messbar",
  "assets.detail.fmGovernanceWorkOrderColumn": "\nVerknüpfter Arbeitsauftrag",
  "assets.detail.fmGovernanceUpdatedColumn": "\nAktualisiert",
  "assets.detail.fmGovernanceDueOverdue": "\nÜberfällig",
  "assets.detail.fmGovernanceDueSoon": "\nBald fällig",
  "assets.detail.fmGovernanceDueScheduled": "\nGeplant",
  "assets.detail.fmGovernanceDueUnset": "\nKein Fälligkeitsdatum",
  "assets.detail.fmGovernanceDueDateValue": "\nFällig {date}",
  "assets.detail.fmGovernanceDueUnsetDescription":
    "\nFür dieses Governance-Element ist derzeit kein Fälligkeitsdatum erfasst.",
  "assets.detail.fmGovernanceMetricValue": "\n{value} aufgezeichnet",
  "assets.detail.fmGovernanceMetricValueWithUnit": "\n{value} {unit} aufgezeichnet",
  "assets.detail.fmGovernanceNoWorkOrder": "\nKein verknüpfter Arbeitsauftrag",
  "assets.detail.fmGovernanceLinkedWorkOrdersValue": "\n{count} verknüpfte Arbeitsaufträge",
  "assets.detail.fmGovernanceOpenWorkspace": "\nOffener Arbeitsbereich „Nachlass“",
  "assets.detail.fmGovernanceOpenWorkspaceAria": "\nOffener Arbeitsbereich „Nachlass“",
  "assets.detail.fmGovernanceOpenWorkOrderAria": "\nOffener FM-Governance-Arbeitsauftrag {number}",
  "assets.detail.performanceTitle": "\nAuslastungs- und Leistungsüberwachung",
  "assets.detail.performanceDescription":
    "\nLive-Auslastungsstatus für dieses Asset anhand erfasster Telemetrie, Registrierungsbetriebsstunden und verknüpfter Betriebsauslastung.",
  "assets.detail.performanceStateBlindSpot": "\nToter Winkel der Telemetrie",
  "assets.detail.performanceStateStale": "\nTelemetrie veraltet",
  "assets.detail.performanceAlertBlindSpotTitle":
    "\nLive-Nutzungstelemetrie ist noch nicht verfügbar",
  "assets.detail.performanceAlertBlindSpotDescription":
    "\nDieses Asset ist derzeit auf die Registrierungsbasislinie von {current} angewiesen, bis die Nutzungstelemetrie mit der Berichterstellung beginnt.",
  "assets.detail.performanceAlertStaleTitle":
    "\nDie Auslastungstelemetrie erfordert Aufmerksamkeit",
  "assets.detail.performanceAlertStaleDescription":
    "\nDas letzte Nutzungsbeispiel wurde am {timestamp} erfasst. Aktualisieren Sie die Geräte- oder Telemetrieabdeckung, um die aktuelle Überwachung wiederherzustellen.",
  "assets.detail.performanceAlertOverTitle":
    "\nDie Anlage wird oberhalb des optimalen Nutzungsbandes betrieben",
  "assets.detail.performanceAlertOverDescription":
    "Die aktuelle Auslastung beträgt {current} gegenüber einem Durchschnitt von {average}, wobei {critical} kritische Signale bereits mit diesem Asset verknüpft sind.",
  "assets.detail.performanceAlertUnderTitle":
    "\nDie Auslastung liegt unter dem erwarteten Betriebsband",
  "assets.detail.performanceAlertUnderDescription":
    "\nDie aktuelle Auslastung beträgt {current} gegenüber einem Durchschnitt von {average}. Überprüfen Sie die Bereitstellungs-, Verfügbarkeits- oder Planungseinschränkungen.",
  "assets.detail.performanceAlertWatchTitle": "\nDie Auslastung sollte genau überwacht werden",
  "assets.detail.performanceAlertWatchDescription":
    "\nDie aktuelle Auslastung beträgt {current} gegenüber einem Durchschnitt von {average}. Die Anlage nähert sich einer Über- oder Unterauslastung.",
  "assets.detail.performanceAlertOptimalTitle":
    "\nDie Auslastung liegt im ausgeglichenen Betriebsband",
  "assets.detail.performanceAlertOptimalDescription":
    "\nDie aktuelle Auslastung beträgt {current} gegenüber einem Durchschnitt von {average} und die Telemetrieabdeckung ist für dieses Asset aktiv.",
  "assets.detail.performanceRecordedHoursTitle": "\nErfasste Betriebsstunden",
  "assets.detail.performanceRecordedHoursValue": "\n{hours} Stunden",
  "assets.detail.performanceRecordedHoursDescription":
    "\nVerfolgte Betriebsstundenzahl, die derzeit im Anlagendatensatz gespeichert ist.",
  "assets.detail.performanceCurrentTitle": "\nAktuelle Auslastung",
  "assets.detail.performanceCurrentDescription":
    "\nZuletzt erfasste Nutzungstelemetrie für dieses Asset.",
  "assets.detail.performanceCurrentFallbackDescription":
    "\nDer aktuelle Status verwendet die Baseline der Registrierungs-Betriebsstunden, da keine Telemetrie verfügbar ist.",
  "assets.detail.performanceAverageTitle": "\nDurchschnittliche Auslastung",
  "assets.detail.performanceAverageDescription":
    "\nDurchschnittliche Nutzung aller erfassten Telemetrieproben.",
  "assets.detail.performanceCoverageTitle": "\nTelemetrieabdeckung",
  "assets.detail.performanceCoverageDescription":
    "\n{timestamp} war die letzte für diese Anlage erfasste Nutzungsprobe.",
  "assets.detail.performanceCoverageEmptyDescription":
    "\nFür dieses Asset wurden noch keine Auslastungstelemetrieproben erfasst.",
  "assets.detail.performanceTasksTitle": "\nOffene operative Arbeitsauslastung",
  "assets.detail.performanceTasksDescription":
    "\nOffene Aufgaben, die im Rahmen der Inspektions- und Wartungslieferung noch mit dieser Anlage verknüpft sind.",
  "assets.detail.performanceSignalsTitle": "\nVorhersagesignale",
  "assets.detail.performanceSignalsDescription":
    "\n{count} Kritische Signale sind derzeit mit diesem Asset verknüpft.",
  "assets.detail.performanceSamplesTitle": "\nAktuelle Nutzungsbeispiele",
  "assets.detail.performanceSamplesDescription":
    "\nAktuelle Telemetrieproben für diese Anlage mit einem aktuellen Bereich von {min} bis {max} und {activeWorkOrders} aktiven Arbeitsaufträgen in der Ausführung.",
  "assets.detail.performanceSamplesEmpty":
    "\nFür dieses Asset wurden noch keine Nutzungstelemetriedaten erfasst.",
  "assets.detail.performanceTimestampColumn": "\nErfasst",
  "assets.detail.performanceUtilisationColumn": "\nAuslastung",
  "assets.detail.performancePostureColumn": "\nHaltung",
  "assets.detail.performanceOpenWorkspace": "\nOffener Nutzungsarbeitsbereich",
  "assets.detail.performanceOpenWorkspaceAria": "\nOffener Nutzungsarbeitsbereich",
  "assets.detail.replacementTitle": "\nErsatzplanung und Kapitalhaltung",
  "assets.detail.replacementDescription":
    "\nAbgeleiteter Ersatzstatus für dieses Asset unter Verwendung von Lebenszyklusstatus, Zustand, KI-Vorhersagesignalen und aktiven Ersatzarbeiten.",
  "assets.detail.replacementStateBaseline": "\nGrundlinie",
  "assets.detail.replacementStatePlan": "\nPlan",
  "assets.detail.replacementStateReplace": "\nErsetzen",
  "assets.detail.replacementAlertReplaceTitle": "\nJetzt Ersatzplanung durchführen",
  "assets.detail.replacementAlertReplaceDescription":
    "Dringende Lebenszyklus-, Zustands-, Vorhersage- oder aktive Arbeitsauftragssignale weisen darauf hin, dass diese Anlage in die aktive Ersatzausführung übergehen sollte.",
  "assets.detail.replacementAlertPlanTitle": "\nBereiten Sie den Kapitalfall vor",
  "assets.detail.replacementAlertPlanDescription":
    "\nAufgrund des sich abzeichnenden Lebenszyklusdrucks oder anstehender Austauscharbeiten sollte dieser Vermögenswert in die Finanzplanung und Austauschprüfung einbezogen werden.",
  "assets.detail.replacementAlertBaselineTitle": "\nEs wurde kein aktiver Ersatzdruck erkannt",
  "assets.detail.replacementAlertBaselineDescription":
    "\nAktuelle Lebenszyklus-, Zustands- und Arbeitssignale erfordern noch keine Ersatzplanungsreaktion für diese Anlage.",
  "assets.detail.replacementLifecycleDriver":
    "\nDie Lebenszykluslage drängt dazu, diese Anlage zu ersetzen.",
  "assets.detail.replacementConditionDriver":
    "\nDie Verschlechterung des Zustands trägt zur Ersatzplanung bei.",
  "assets.detail.replacementPredictionDriver":
    "\nVorhersagesignale deuten auf eine kürzere Restlaufzeit der Landebahn hin.",
  "assets.detail.replacementTasksDriver":
    "\nFür dieses Asset stehen bereits Ersatzaufgaben in der Warteschlange.",
  "assets.detail.replacementWorkOrdersDriver":
    "\nAktive Ersatzarbeitsaufträge zeigen, dass die Lieferung bereits im Gange ist.",
  "assets.detail.replacementNoDrivers": "\nKeine aktiven Ersatztreiber.",
  "assets.detail.replacementDriversTitle": "\nErsatztreiber",
  "assets.detail.replacementBookValueTitle": "\nAktueller Buchwert",
  "assets.detail.replacementBookValueDescription":
    "\nAktueller Buchwert, der für diesen Vermögensdatensatz gehalten wird.",
  "assets.detail.replacementAdjustedValueTitle": "\nAngepasster Wiederbeschaffungswert",
  "assets.detail.replacementAdjustedValueDescription":
    "\nGeschätzter Ersatzwert, angepasst an den aktuellen Vorhersageschweregrad.",
  "assets.detail.replacementCapitalGapTitle": "\nKapitallücke",
  "assets.detail.replacementCapitalGapDescription":
    "\nAbweichung vom aktuellen Buchwert: {percent}.",
  "assets.detail.replacementLifeTitle": "\nVerbleibende Lebensdauer",
  "assets.detail.replacementLifeValue": "\n{days} Tage",
  "assets.detail.replacementLifeDescription":
    "\nNeuestes vorhergesagtes Restlebensdauersignal, sofern verfügbar.",
  "assets.detail.replacementTasksTitle": "\nErsatzaufgaben",
  "assets.detail.replacementTasksDescription":
    "\n{count} aktive Ersatzarbeitsaufträge sind derzeit mit dieser Anlage verknüpft.",
  "assets.detail.replacementActionsTitle": "\nAktive Ersatzaktionen",
  "assets.detail.replacementActionsDescription":
    "\nAktuelle Ersatzaufgaben und verknüpfte Arbeitsaufträge steuern derzeit die Ersatzlieferung.",
  "assets.detail.replacementActionsEmpty":
    "\nMit diesem Asset sind noch keine aktiven Austauschaktionen verknüpft.",
  "assets.detail.replacementPriorityColumn": "\nPriorität",
  "assets.detail.replacementStatusColumn": "\nStatus",
  "assets.detail.replacementWorkOrderColumn": "\nVerknüpfter Arbeitsauftrag",
  "assets.detail.replacementAssigneeColumn": "\nBeauftragter",
  "assets.detail.replacementDeadlineColumn": "\nFrist",
  "assets.detail.replacementUpdatedColumn": "\nAktualisiert",
  "assets.detail.replacementStandalone": "\nEigenständige Ersetzungsaufgabe",
  "assets.detail.replacementNoAssignee": "\nKein Beauftragter",
  "assets.detail.replacementNoDeadline": "\nKeine Frist",
  "assets.detail.replacementOpenPlanning": "\nOffene Finanzplanung",
  "assets.detail.replacementOpenPlanningAria": "Arbeitsbereich „Finanzplanung“ öffnen",
  "assets.detail.replacementOpenWorkOrderAria": "\nOffener Ersatzarbeitsauftrag {number}",
  "assets.detail.inspectionsTitle": "\nInspektionsprotokolle",
  "assets.detail.inspectionsDescription":
    "\nKürzlich durchgeführte Inspektionsaufgaben und verknüpfte Arbeitsaufträge für diese Anlage, geordnet nach der letzten Betriebsaktivität.",
  "assets.detail.inspectionsEmpty":
    "\nFür diese Anlage wurden noch keine Inspektionsaufzeichnungen erfasst.",
  "assets.detail.inspectionsStatus": "\nInspektionsstatus",
  "assets.detail.inspectionsWorkOrder": "\nVerknüpfter Arbeitsauftrag",
  "assets.detail.inspectionsAssignee": "\nBeauftragter",
  "assets.detail.inspectionsDeadline": "\nFrist",
  "assets.detail.inspectionsCompleted": "\nAbgeschlossen",
  "assets.detail.inspectionsUpdated": "\nAktualisiert",
  "assets.detail.inspectionsStandalone": "\nEigenständige Inspektionsaufgabe",
  "assets.detail.inspectionsUnassigned": "\nKein Beauftragter",
  "assets.detail.inspectionsNoDeadline": "\nKeine Frist",
  "assets.detail.inspectionsNoCompletion": "\nNicht abgeschlossen",
  "assets.detail.maintenanceTitle": "\nWartungsaktivität",
  "assets.detail.maintenanceDescription":
    "Kürzlich mit dieser Anlage verknüpfte Reparatur-, Kalibrierungs- und Notfallarbeiten, einschließlich Aufgabenstatus und verbundener Arbeitsauftragslieferung.",
  "assets.detail.maintenanceAlertActiveTitle": "\nWartungsarbeitslast ist aktiv",
  "assets.detail.maintenanceAlertActiveDescription":
    "\n{openTasks} offene Wartungsaufgaben und {activeWorkOrders} aktive Arbeitsaufträge sind derzeit mit dieser Anlage verknüpft.",
  "assets.detail.maintenanceAlertIdleTitle": "\nEs ist kein aktiver Wartungs-Workload geöffnet",
  "assets.detail.maintenanceAlertIdleDescription":
    "\nDerzeit sind keine aktiven Reparatur-, Kalibrierungs- oder Notfallarbeitselemente mit dieser Anlage verknüpft.",
  "assets.detail.maintenanceOpenTasksTitle": "\nOffene Wartungsaufgaben",
  "assets.detail.maintenanceOpenTasksDescription":
    "\nReparatur-, Kalibrierungs- und Notfallaufgaben sind noch im Gange.",
  "assets.detail.maintenanceCompletedTasksTitle": "\nAbgeschlossene Wartungsaufgaben",
  "assets.detail.maintenanceCompletedTasksDescription":
    "\nWartungsaufgaben für diese Anlage wurden bereits abgeschlossen.",
  "assets.detail.maintenanceActiveWorkOrdersTitle": "\nAktive Wartungsaufträge",
  "assets.detail.maintenanceActiveWorkOrdersDescription":
    "\nVerknüpfte Arbeitsaufträge durchlaufen noch die operative Lieferung.",
  "assets.detail.maintenanceCompletedWorkOrdersTitle": "\nAbgeschlossene Wartungsaufträge",
  "assets.detail.maintenanceCompletedWorkOrdersDescription":
    "\nVerknüpfte Arbeitsaufträge für diese Anlage bereits abgeschlossen.",
  "assets.detail.maintenanceRecordsTitle": "\nAktuelle Wartungsaufzeichnungen",
  "assets.detail.maintenanceRecordsDescription":
    "\nDie neuesten Wartungsaufgaben und verknüpften Arbeitsaufträge, sortiert nach der letzten Bewegung.",
  "assets.detail.maintenanceEmpty":
    "\nFür diese Anlage wurden noch keine Reparatur-, Kalibrierungs- oder Notfallwartungsaufzeichnungen erfasst.",
  "assets.detail.maintenanceTypeColumn": "\nTyp",
  "assets.detail.maintenancePriorityColumn": "\nPriorität",
  "assets.detail.maintenanceStatusColumn": "\nStatus",
  "assets.detail.maintenanceWorkOrderColumn": "\nVerknüpfter Arbeitsauftrag",
  "assets.detail.maintenanceAssigneeColumn": "\nBeauftragter",
  "assets.detail.maintenanceDeadlineColumn": "\nFrist",
  "assets.detail.maintenanceCompletedColumn": "\nAbgeschlossen",
  "assets.detail.maintenanceUpdatedColumn": "\nAktualisiert",
  "assets.detail.maintenanceStandalone": "\nEigenständige Wartungsaufgabe",
  "assets.detail.maintenanceNoAssignee": "\nKein Beauftragter",
  "assets.detail.maintenanceNoDeadline": "\nKeine Frist",
  "assets.detail.maintenanceNoCompletion": "\nNicht abgeschlossen",
  "assets.detail.maintenanceOpenWorkOrders": "\nOffene Arbeitsaufträge",
  "assets.detail.maintenanceOpenWorkOrdersAria": "\nArbeitsbereich „Arbeitsaufträge öffnen",
  "assets.detail.maintenanceOpenWorkOrderAria": "“\nOffener Wartungsauftrag {number}",
  "assets.detail.costsTitle": "\nLebenszykluskostenzuordnung",
  "assets.detail.costsDescription":
    "\nZuweisung der aktuellen Arbeitsauftragskosten, die mit dieser Anlage verknüpft sind, einschließlich Arbeits-, Material- und anderer Betriebsausgaben.",
  "assets.detail.costsEmpty":
    "\nFür diese Anlage wurden noch keine verknüpften Arbeitsauftragskostendatensätze erfasst.",
  "assets.detail.costsTotalTitle": "\nGesamte verknüpfte Kosten",
  "assets.detail.costsTotalDescription": "\n{count} verknüpfte Arbeitsaufträge",
  "assets.detail.costsActiveTitle": "\nAktive Arbeitsaufträge",
  "assets.detail.costsActiveDescription":
    "\nDie Betriebsauslastung für diese Anlage ist noch im Gange.",
  "assets.detail.costsLabourTitle": "\nArbeitszuteilung",
  "assets.detail.costsLabourDescription":
    "\nGesamte protokollierte Arbeitskosten über verknüpfte Arbeitsaufträge.",
  "assets.detail.costsMaterialTitle": "\nMaterialzuordnung",
  "assets.detail.costsMaterialDescription":
    "\nDurch Arbeitsauftragslieferung verknüpfte Materialverpflichtungen.",
  "assets.detail.costsWorkOrder": "\nArbeitsauftrag",
  "assets.detail.costsStatus": "\nStatus",
  "assets.detail.costsLabourColumn": "\nArbeit",
  "assets.detail.costsMaterialColumn": "\nMaterial",
  "assets.detail.costsOtherColumn": "\nAndere",
  "assets.detail.costsTotalColumn": "\nGesamt",
  "assets.detail.costsUpdatedColumn": "\nNeueste Bewegung",
  "assets.detail.costsCompletedValue": "\nAbgeschlossen {date}",
  "assets.lifecycleProfile.title": "\nLebenszyklusmanagementprofil",
  "assets.lifecycleProfile.description":
    "\nVerfolgen Sie den aktuellen Betriebszustand, den Lebenszyklusstatus und die letzte bestätigte Inspektion für diese Anlage.",
  "assets.lifecycleProfile.conditionLabel": "\nBedingung",
  "assets.lifecycleProfile.conditionHint":
    "\nLegen Sie den aktuellen Betriebszustand fest, der von der Lebenszyklusanalyse, dem Bereitschaftsbericht und der Priorisierung verwendet wird.",
  "assets.lifecycleProfile.lifecycleLabel": "\nLebenszyklusphase",
  "assets.lifecycleProfile.lifecycleHint":
    "Wählen Sie den aktuellen Lebenszyklusstatus, damit im strategischen Asset-Reporting zwischen aktiven, überwachten und ausgedienten Assets unterschieden werden kann.",
  "assets.lifecycleProfile.lastInspectionLabel": "\nDatum der letzten Inspektion",
  "assets.lifecycleProfile.lastInspectionHint":
    "\nErfassen Sie das letzte bestätigte Inspektionsdatum, wenn die obige Chronologie noch nicht den aktuellen Nachlassdatensatz widerspiegelt.",
  "assets.lifecycleProfile.submit": "\nLebenszyklusprofil speichern",
  "assets.lifecycleProfile.submitAria": "\nSpeichern Sie das Asset-Lifecycle-Management-Profil",
  "assets.lifecycleProfile.snapshotTitle": "\nMomentaufnahme der Lebenszyklushaltung",
  "assets.lifecycleProfile.snapshotDescription":
    "\nDer aktuelle Lebenszyklusstatus, der von der Bereitschafts-, Zustands- und Ersatzplanungsanalyse verwendet wird.",
  "assets.lifecycleProfile.snapshotCondition": "\nBedingung",
  "assets.lifecycleProfile.snapshotLifecycle": "\nLebenszyklusphase",
  "assets.lifecycleProfile.snapshotInspection": "\nLetzte Inspektion",
  "assets.lifecycleProfile.snapshotUpdated": "\nZuletzt aktualisiert",
  "assets.lifecycleProfile.historyTitle": "\nLebenszyklusverlauf",
  "assets.lifecycleProfile.historyDescription":
    "\nVersionierte Lebenszyklusänderungen werden hier für die Zustandsverwaltung und Entsorgungsplanung erfasst.",
  "assets.lifecycleProfile.historyEmpty":
    "\nEs wurden noch keine Lebenszyklusänderungen erfasst. Speichern Sie ein Update, um den Prüfpfad zu starten.",
  "assets.lifecycleProfile.historyUpdated": "\nLebenszyklus-Update",
  "assets.lifecycleProfile.historyFrom": "\nVon",
  "assets.lifecycleProfile.historyTo": "\nTo",
  "assets.lifecycleProfile.history.fieldCondition": "\nBedingung",
  "assets.lifecycleProfile.history.fieldStage": "\nLebenszyklusphase",
  "assets.lifecycleProfile.history.fieldInspection": "\nLetzte Inspektion",
  "assets.lifecycleProfile.feedback.saved": "\nAsset-Lebenszyklusprofil gespeichert.",
  "assets.lifecycleProfile.feedback.loadFailed":
    "\nDas Asset-Lebenszyklusprofil kann derzeit nicht geladen werden.",
  "assets.lifecycleProfile.feedback.saveFailed":
    "\nDas Asset-Lebenszyklusprofil kann derzeit nicht gespeichert werden.",
  "assets.lifecycleProfile.validation.conditionRequired": "\nWählen Sie eine gültige Bedingung.",
  "assets.lifecycleProfile.validation.lifecycleRequired":
    "\nWählen Sie eine gültige Lebenszyklusphase.",
  "assets.lifecycleProfile.validation.lastInspectionInvalid":
    "\nVerwenden Sie ein gültiges Inspektionsdatum.",
  "assets.registry.title": "\nNachlassregisterprofil",
  "assets.registry.description":
    "\nOrdnen Sie dieses Asset der Nachlasshierarchie zu und verknüpfen Sie es mit der Schulungsfunktion, die es unterstützt.",
  "assets.registry.hierarchyLabel": "\nHierarchieebene",
  "assets.registry.parentLabel": "\nÜbergeordnetes Asset",
  "assets.registry.capabilityLabel": "\nVerknüpfung der Betriebsfähigkeit",
  "assets.registry.capabilityPlaceholder":
    "\nBeispiel: Reichweitenverfügbarkeit, Unterbringungsbereitschaft, Fahrzeugabfertigung",
  "assets.registry.capabilityHint":
    "\nBeschreiben Sie das Betriebsergebnis, das dieses Asset ermöglicht, damit die Bestandsberichterstattung nach Kapazität zusammengefasst werden kann.",
  "assets.registry.parentHint":
    "\nWählen Sie einen übergeordneten Standort desselben Standorts aus, wenn sich diese Anlage unter einer Einrichtung, einem System oder einem Subsystem in der Grundstückshierarchie befindet.",
  "assets.registry.hierarchyHint":
    "\nVerwenden Sie Estate → Facility → System → Subsystem → Component, um die Registrierung konsistent zu halten.",
  "assets.registry.parentRoot": "\nKein übergeordneter Vermögenswert",
  "assets.registry.submit": "\nRegistrierungsprofil speichern",
  "assets.registry.submitAria": "\nNachlassregisterprofil speichern",
  "assets.registry.snapshotTitle": "\nSnapshot der Registrierungsverknüpfung",
  "assets.registry.snapshotDescription":
    "\nDie aktuelle Hierarchiekette und das Fähigkeits-Rollup, die von der Bestandsstrategie, der Arbeitsauftragsplanung und den Exporten verwendet werden.",
  "assets.registry.snapshotParent": "\nÜbergeordnetes Asset",
  "assets.registry.snapshotChildren": "\nDirektes untergeordnetes Vermögen",
  "assets.registry.snapshotCapability": "\nFähigkeitsverknüpfung",
  "assets.registry.snapshotUpdated": "\nZuletzt aktualisiert",
  "assets.registry.historyTitle": "\nÄnderungsverlauf",
  "assets.registry.historyDescription":
    "Versionierte Registrierungsaktualisierungen werden hier für Hierarchie- und Funktionskontrolle erfasst.",
  "assets.registry.historyEmpty":
    "\nEs wurden noch keine Registrierungsänderungen aufgezeichnet. Speichern Sie ein Update, um den Prüfpfad zu starten.",
  "assets.registry.historyUpdated": "\nRegistrierungsaktualisierung",
  "assets.registry.historyFrom": "\nVon",
  "assets.registry.historyTo": "\nTo",
  "assets.registry.history.fieldHierarchy": "\nHierarchieebene",
  "assets.registry.history.fieldParent": "\nÜbergeordnetes Asset",
  "assets.registry.history.fieldCapability": "\nVerknüpfung der Betriebsfähigkeit",
  "assets.registry.feedback.saved": "\nAsset-Registrierungsprofil gespeichert.",
  "assets.registry.feedback.loadFailed":
    "\nDas Asset-Registrierungsprofil kann derzeit nicht geladen werden.",
  "assets.registry.feedback.saveFailed":
    "\nDas Asset-Registrierungsprofil kann derzeit nicht gespeichert werden.",
  "assets.registry.validation.hierarchyLevelRequired": "\nWählen Sie eine gültige Hierarchieebene.",
  "assets.registry.validation.parentSelf":
    "\nEin Vermögenswert kann nicht sein eigener übergeordneter Vermögenswert sein.",
  "assets.registry.validation.parentMissing":
    "\nWählen Sie ein gültiges übergeordnetes Asset aus dieser Registrierung aus.",
  "assets.registry.validation.parentSiteMismatch":
    "\nÜbergeordnete Vermögenswerte müssen zum selben Standort gehören, um die Integrität der Nachlasshierarchie zu wahren.",
  "assets.registry.validation.parentLevel":
    "\nWählen Sie ein übergeordnetes Asset aus, das über der ausgewählten Hierarchieebene liegt.",
  "assets.registry.validation.parentCycle":
    "\nDieses übergeordnete Element würde eine kreisförmige Nachlasshierarchie erstellen.",
  "tasks.quickAdd": "\nTask schnell hinzufügen",
  "tasks.quickAddAsset": "\nAsset",
  "tasks.quickAddSuccess": "\nAufgabe erstellt",
  "tasks.quickAddPlaceholder": "\nAufgabentitel...",
  "tasks.newTask": "\nNeue Aufgabe",
  "tasks.quickAddAdd": "\nAdd",
  "tasks.quickAddStatus": "\nStatus",
  "tasks.dragToReorder": "\nZiehen, um den Status zu ändern",
  "tasks.detail": "\nAufgabendetail",
  "tasks.statusUpdated": "\nAufgabenstatus aktualisiert",
  "tasks.empty": "\nKeine passenden Aufgaben gefunden",
  "tasks.emptyBacklog": "\nKeine Aufgaben im Backlog",
  "tasks.emptyInProgress": "\nKeine Aufgaben in Bearbeitung",
  "tasks.emptyReview": "\nKeine Aufgaben in Überprüfung",
  "tasks.emptyDone": "\nKeine abgeschlossenen Aufgaben",
  "tasks.addToColumn": "\nAufgabe",
  "tasks.moveToStatus": "\nZum Status",
  "predictions.markReviewed": "\nAls bewertet markieren",
  "predictions.emptyExplainer":
    " wechseln\nVorhersagen werden angezeigt, wenn Geräte Telemetriedaten für mehr als 7 Tage melden",
  "predictions.severityLegend": "\nSchweregradlegende",
  "predictions.severityInfo": "\nZur Information – keine Aktion erforderlich",
  "predictions.severityWarning": "\nAufmerksamkeit erforderlich – Wartung planen",
  "predictions.severityCritical": "\nSofortiges Handeln erforderlich",
  "profile.edit": "\nProfil bearbeiten",
  "profile.editName": "\nName bearbeiten",
  "profile.nameRequired": "\nName ist erforderlich",
  "profile.saved": "\nProfil aktualisiert",
  "profile.preferencesSaved": "\nEinstellungen gespeichert",
  "profile.notificationPreferences": "\nBenachrichtigungseinstellungen",
  "profile.enableNotifications": "\nE-Mail-Benachrichtigungen aktivieren",
  "profile.locale": "\nGebietsschema",
  "profile.localeEnGb": "\nEnglisch (UK)",
  "profile.localeEnUs": "\nEnglisch (USA)",
  "profile.savePreferences": "\nEinstellungen speichern",
  "profile.languageLocale": "\nSprache / Gebietsschema",
  "profile.avatarAlt": "\nProfil-Avatar",
  "auth.forgotPassword": "\nPasswort vergessen?",
  "auth.forgotPassword.documentTitle": "\nPasswort vergessen – Betriebsplattform",
  "auth.forgotPasswordHelp": "\nGeben Sie die für Ihr Konto verwendete E-Mail-Adresse ein.",
  "auth.forgotPasswordPageHelp":
    "\nWir senden Ihnen einen sicheren Link zum Zurücksetzen des Passworts, wenn das Konto vorhanden ist.",
  "auth.forgotPassword.contextTitle": "\nWiederherstellungsarbeitsbereich",
  "auth.forgotPassword.contextDescription":
    "\nFühren Sie die Wiederherstellung im gleichen sicheren Ablauf durch, bestätigen Sie die Kontoadresse und machen Sie den nächsten Schritt explizit, bevor Sie diesen Bildschirm verlassen.",
  "auth.forgotPassword.progressTitle": "\nWiederherstellungsfluss",
  "auth.forgotPassword.progressDescription":
    "\nFordern Sie den Link an, überprüfen Sie Ihren Posteingang, legen Sie ein neues Passwort fest und überprüfen Sie dann die aktiven Sitzungen.",
  "auth.forgotPassword.progressStep.request": "\nLink anfordern",
  "auth.forgotPassword.progressStep.inbox": "\nÜberprüfen Sie den Posteingang",
  "auth.forgotPassword.progressStep.reset": "\nPasswort zurücksetzen",
  "auth.forgotPassword.responseWindowLabel": "\nLiefererwartung",
  "auth.forgotPassword.responseWindowValue":
    "\nDie Linkbereitstellung beginnt unmittelbar nach der Übermittlung",
  "auth.forgotPassword.channelLabel": "Wiederherstellungskanal",
  "auth.forgotPassword.channelValue": "\nE-Mail-basiertes Zurücksetzen mit sicherer Weiterleitung",
  "auth.forgotPassword.checklist.accountTitle":
    "\nBestätigen Sie zuerst die E-Mail-Adresse des Kontos",
  "auth.forgotPassword.checklist.accountDescription":
    "\nVerwenden Sie die Adresse, die bereits Zugriff auf den Arbeitsbereich der Organisation hat, um einen Neustart des Wiederherstellungsablaufs zu vermeiden.",
  "auth.forgotPassword.checklist.inboxTitle": "\nPosteingang und Spam-Ordner beobachten",
  "auth.forgotPassword.checklist.inboxDescription":
    "\nDer sichere Link kann je nach E-Mail-Gateway der Organisation einige Augenblicke nach der Übermittlung eintreffen.",
  "auth.forgotPassword.checklist.supportTitle":
    "\nVerwenden Sie denselben Wiederherstellungspfad für support",
  "auth.forgotPassword.checklist.supportDescription":
    "\nWenn die Nachricht nicht eintrifft, versuchen Sie es von diesem Bildschirm aus erneut und behalten Sie den gleichen Kontokontext bei, anstatt einen neuen Anmeldepfad zu erstellen.",
  "auth.forgotPassword.timingTitle": "\nWiederherstellungszeitpunkt",
  "auth.forgotPassword.timingDescription":
    "\nHalten Sie den Operator darüber auf dem Laufenden, wann die Anfrage eintrifft, wann der Posteingang überprüft werden sollte und wann er es erneut versuchen muss.",
  "auth.forgotPassword.timingSubmittedTitle": "\nAnfrage eingereicht",
  "auth.forgotPassword.timingSubmittedDescription":
    "\nWir stellen die E-Mail zum sicheren Zurücksetzen in die Warteschlange, sobald die Anfrage angenommen wurde.",
  "auth.forgotPassword.timingInboxTitle": "\nÜberprüfen Sie den Posteingang",
  "auth.forgotPassword.timingInboxDescription":
    "\nSuchen Sie zuerst im primären Posteingang nach der Wiederherstellungs-E-Mail und dann in den Spam- oder Quarantäneordnern.",
  "auth.forgotPassword.timingRetryTitle":
    "\nVersuchen Sie es erst erneut, nachdem das Fenster bestanden hat",
  "auth.forgotPassword.timingRetryDescription":
    "\nWenn der Link nach dem erwarteten Fenster nicht angekommen ist, versuchen Sie es von dieser Seite aus erneut, damit derselbe Wiederherstellungspfad aktiv bleibt.",
  "auth.forgotPasswordResetTitle": "\nSetzen Sie Ihr Passwort zurück",
  "auth.resetPassword.documentTitle": "\nPasswort zurücksetzen – Betriebsplattform",
  "auth.forgotPasswordCheckEmail": "\nÜberprüfen Sie Ihre E-Mail",
  "auth.forgotPassword.sent.documentTitle": "\nÜberprüfen Sie Ihre E-Mail – Betriebsplattform",
  "auth.forgotPasswordCheckEmailDesc":
    "\nWenn ein Konto mit dieser E-Mail-Adresse vorhanden ist, haben wir einen Link zum Zurücksetzen des Passworts gesendet.",
  "auth.forgotPassword.sentTitle": "\nWiederherstellungslink gesendet",
  "auth.forgotPassword.sentDescription":
    "\nVerwenden Sie den sicheren Link aus Ihrem Posteingang und kehren Sie dann zum gleichen Anmeldevorgang zurück, damit das Arbeitsbereichsziel erhalten bleibt.",
  "auth.forgotPassword.sentTimingTitle": "\nWas passiert als nächstes",
  "auth.forgotPassword.sentTimingDescription":
    "\nVerwenden Sie umgehend den E-Mail-Link, versuchen Sie es nur bei Bedarf erneut und lassen Sie den Sicherheitskontext während des Wartens sichtbar.",
  "auth.forgotPassword.sentTimingArrivalTitle": "\nLink Ankunft",
  "auth.forgotPassword.sentTimingArrivalDescription":
    "\nDie Zurücksetzungs-E-Mail sollte je nach E-Mail-Gateway der Organisation kurz nach der Übermittlung eintreffen.",
  "auth.forgotPassword.sentTimingRetryTitle": "\nAnleitung erneut versuchen",
  "auth.forgotPassword.sentTimingRetryDescription":
    "\nWenn nach dem erwarteten Fenster nichts eintrifft, senden Sie die Anfrage erneut über denselben Wiederherstellungsablauf, anstatt woanders von vorne zu beginnen.",
  "auth.forgotPassword.sentTimingSecurityTitle": "\nSicherheitserinnerung",
  "auth.forgotPassword.sentTimingSecurityDescription":
    "Verwenden Sie nur den Link vom vertrauenswürdigen E-Mail-Kanal und ignorieren Sie unerwartete Nachrichten zum Zurücksetzen des Passworts.",
  "auth.sendResetLink": "\nLink zum Zurücksetzen senden",
  "auth.backToSignIn": "\nZurück zur Anmeldung",
  "auth.forgotPasswordSent":
    "\nÜberprüfen Sie Ihre E-Mails auf einen Link zum Zurücksetzen des Passworts",
  "auth.resetPasswordHelp": "\nWählen Sie ein neues Passwort für Ihr Konto.",
  "auth.resetPassword.contextTitle": "\nÜberprüfung des Passwort-Resets",
  "auth.resetPassword.contextDescription":
    "\nAktualisieren Sie die Anmeldeinformationen, bestätigen Sie das neue Geheimnis einmal und lassen Sie den nächsten Sicherheitsschritt sichtbar, bevor Sie fortfahren.",
  "auth.resetPassword.progressTitle": "\nWorkflow zurücksetzen",
  "auth.resetPassword.progressDescription":
    "\nLegen Sie das neue Passwort fest, bestätigen Sie es einmal und überprüfen Sie die Sitzungen nach dem Zurücksetzen.",
  "auth.resetPassword.progressStep.request": "\nLink anfordern",
  "auth.resetPassword.progressStep.reset": "\nNeues Passwort festlegen",
  "auth.resetPassword.progressStep.review": "\nÜberprüfungssitzungen",
  "auth.resetPasswordNewPasswordLabel": "\nNeues Passwort",
  "auth.resetPasswordConfirmPasswordLabel": "\nNeues Passwort bestätigen",
  "auth.resetPasswordNewPasswordHint": "\nVerwenden Sie mindestens {count} Zeichen.",
  "auth.resetPasswordConfirmPasswordHint": "\nGeben Sie dasselbe Passwort erneut ein.",
  "auth.resetPassword.policyLabel": "\nPasswortrichtlinie",
  "auth.resetPassword.policyValue": "\nMindestens {count} Zeichen mit einem eindeutigen Wert",
  "auth.resetPassword.sessionLabel": "\nNach dem Zurücksetzen",
  "auth.resetPassword.sessionValue":
    "\nÜberprüfen Sie die Sitzungen und kehren Sie zum gesicherten Arbeitsbereich zurück",
  "auth.resetPassword.checklist.passwordTitle": "\nErstellen Sie ein neues Passwort",
  "auth.resetPassword.checklist.passwordDescription":
    "\nVerwenden Sie mindestens {count} Zeichen und vermeiden Sie die Wiederverwendung von Anmeldeinformationen, die von mehreren Tools gemeinsam genutzt wurden.",
  "auth.resetPassword.checklist.confirmTitle": "\nÜbereinstimmung mit dem Bestätigungsfeld",
  "auth.resetPassword.checklist.confirmDescription":
    "\nBestätigen Sie das Passwort auf diesem Bildschirm, damit der Wiederherstellungsvorgang ohne einen zweiten Wiederholungsversuch abgeschlossen wird.",
  "auth.resetPassword.checklist.securityTitle": "\nÜberprüfen Sie die Kontosicherheit weiter",
  "auth.resetPassword.checklist.securityDescription":
    "\nNachdem das Zurücksetzen erfolgreich war, melden Sie sich erneut an und überprüfen Sie die letzten Sitzungen, bevor Sie mit der täglichen Arbeit fortfahren.",
  "auth.resetPassword.monitoringTitle": "\nBereitschaft zurücksetzen",
  "auth.resetPassword.monitoringDescription":
    "\nVerfolgen Sie die Passwortstärke, den Bestätigungsstatus und die abschließende Sicherheitsüberprüfung, bevor Sie das Zurücksetzen absenden.",
  "auth.resetPassword.monitoringStep.passwordTitle": "\nErfüllen Sie die Passwortrichtlinie",
  "auth.resetPassword.monitoringStep.passwordDescription":
    "\nVerwenden Sie mindestens {count} Zeichen und vermeiden Sie Anmeldeinformationen, die bereits an anderer Stelle verwendet wurden.",
  "auth.resetPassword.monitoringStep.matchTitle": "\nBestätigen Sie das neue Passwort",
  "auth.resetPassword.monitoringStep.matchDescription":
    "\nPassen Sie das Bestätigungsfeld genau an, damit das Zurücksetzen in einem Durchgang abgeschlossen werden kann.",
  "auth.resetPassword.monitoringStep.reviewTitle":
    "\nÜberprüfen Sie den nächsten Sicherheitsschritt",
  "auth.resetPassword.monitoringStep.reviewDescription":
    "\nPlanen Sie, sich erneut anzumelden und die letzten Sitzungen zu überprüfen, sobald die Passwortaktualisierung erfolgreich war.",
  "auth.resetPassword.monitoringLengthLabel": "\nPasswortlänge",
  "auth.resetPassword.monitoringLengthPending":
    "\nFügen Sie mindestens {count} Zeichen hinzu, um der aktuellen Passwortrichtlinie zu entsprechen.",
  "auth.resetPassword.monitoringLengthReady": "\nAnforderung an die Passwortlänge erfüllt.",
  "auth.resetPassword.monitoringPending": "\nAusstehend",
  "auth.resetPassword.monitoringReady": "\nBereit",
  "auth.resetPassword.monitoringMatchLabel": "\nBestätigungsübereinstimmung",
  "auth.resetPassword.monitoringMatchPending":
    "\nGeben Sie dasselbe Passwort in das Bestätigungsfeld ein, um fortzufahren.",
  "auth.resetPassword.monitoringMatchReady":
    "Passwörter stimmen überein und können übermittelt werden.",
  "auth.resetPassword.monitoringReviewLabel": "\nSicherheitsnachverfolgung",
  "auth.resetPassword.monitoringReviewValue":
    "\nMelden Sie sich erneut an, überprüfen Sie die letzten Sitzungen und bestätigen Sie den Wiederherstellungspfad, bevor Sie zur Arbeit zurückkehren.",
  "auth.resetPassword.monitoringReviewState": "\nÜberprüfung nach Reset",
  "auth.resetPassword.monitoringLiveIdle":
    "\nDie Passwort-Reset-Überwachung wartet auf ein Passwort, das der Richtlinie entspricht.",
  "auth.resetPassword.monitoringLiveConfirm":
    "\nPasswortrichtlinie erfüllt. Bestätigen Sie das Passwort, um den Reset abzuschließen.",
  "auth.resetPassword.monitoringLiveReady":
    "\nDie Anforderungen zum Zurücksetzen des Passworts sind vollständig und können eingereicht werden.",
  "auth.resetPasswordSubmit": "\nPasswort zurücksetzen",
  "auth.resetPasswordSuccessTitle": "\nPasswort aktualisiert",
  "auth.resetPassword.success.documentTitle": "\nPasswort aktualisiert – Betriebsplattform",
  "auth.resetPasswordSuccessBody":
    "\nIhr Passwort wurde aktualisiert. Sie können sich jetzt mit dem neuen Passwort anmelden.",
  "auth.resetPassword.reviewSecurity": "\nÜberprüfen Sie die Sicherheit nach der Anmeldung",
  "auth.resetPasswordMissingToken":
    "\nDieser Link zum Zurücksetzen des Passworts ist unvollständig. Fordern Sie ein neues an, um fortzufahren.",
  "auth.resetPasswordInvalidToken":
    "\nDieser Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen. Fordern Sie ein neues an, um fortzufahren.",
  "auth.resetPasswordPasswordsDoNotMatch": "\nDie Passwortbestätigung stimmt nicht überein.",
  "auth.resetPasswordPasswordTooShort": "\nDas Passwort muss mindestens {count} Zeichen umfassen.",
  "auth.resetPasswordRequestEmailRequired":
    "\nGeben Sie die mit Ihrem Konto verknüpfte E-Mail-Adresse ein.",
  "auth.resetPasswordEmailSubject": "\nSetzen Sie Ihr {brandName}-Passwort zurück",
  "auth.resetPasswordEmailIntro":
    "\nVerwenden Sie den folgenden Link, um Ihr {brandName}-Passwort zurückzusetzen:",
  "auth.resetPasswordEmailOutro":
    "\nWenn Sie diese Änderung nicht angefordert haben, können Sie diese E-Mail ignorieren.",
  "auth.tooManyAttempts":
    "\nZu viele Versuche. Bitte versuchen Sie es in {minutes} Minuten erneut.",
  "dashboard.dateRange": "\nDatumsbereich",
  "dashboard.last7Days": "\nLetzte 7 Tage",
  "dashboard.last30Days": "\nLetzte 30 Tage",
  "dashboard.last90Days": "\nLetzte 90 Tage",
  "dashboard.activityFeed.title": "\nLetzte Aktivität",
  "dashboard.activityFeed.subtitle": "\nNeueste Plattformereignisse und Statusänderungen",
  "dashboard.platformStats": "\nPlattformzusammenfassung",
  "dashboard.onboardingTitle": "\nBeginnen Sie mit {brandName}",
  "dashboard.onboardingStep1": "\nFügen Sie Ihr erstes Gerät hinzu",
  "dashboard.onboardingStep2": "\nKI-Vorhersagen ansehen",
  "dashboard.onboardingStep3": "\nBerichte konfigurieren",
  "finance.empty": "\nFür keine Anlagen sind Abschreibungsdaten konfiguriert",
  "finance.fiscalPeriod": "\nGeschäftsjahr",
  "finance.exportData": "\nDaten exportieren",
  "finance.export.csvTooltip": "\nLädt die aktuelle gefilterte Ansicht im CSV-Format herunter",
  "finance.depreciation.table.accumulatedDepreciation": "\nKumulierte Abschreibung",
  "finance.depreciation.table.netBookValue": "\nNettobuchwert",
  "reports.dateRange": "\nDatumsbereich",
  "reports.reportHistory": "\nBerichtsverlauf",
  "reports.noHistory": "\nNoch keine Berichte generiert",
  "reports.history.title": "\nChronologie des gespeicherten Berichts",
  "reports.history.description":
    "\nBehalten Sie generierte benutzerdefinierte Berichte bei, überprüfen Sie die Chronologie und öffnen Sie aktuelle Ausgaben erneut.",
  "reports.history.empty":
    "\nNoch keine gespeicherten Berichte. Erstellen und speichern Sie einen benutzerdefinierten Bericht, um die Chronologie zu starten.",
  "reports.history.emptyFinancePlanning":
    "\nEs wurden noch keine vordefinierten Finanzplanungsberichte gespeichert.",
  "reports.history.filter.all": "\nAlle",
  "reports.history.filter.financePlanning": "\nFinanzplanung",
  "reports.history.saveAction": "\nBericht speichern",
  "reports.history.saved": "\nBericht in Chronologie",
  "reports.history.savedMeta":
    "{generatedAt} • {sectionCount} Abschnitte • Abdeckung {coverageScore}% • {createdBy}",
  "reports.history.loadAria": " gespeichert\nGespeicherten Bericht {name} in den Builder laden",
  "reports.history.askAiAria": "\nFragen Sie AI nach dem gespeicherten Bericht {name}",
  "reports.history.reviewPrompt":
    "Überprüfen Sie den gespeicherten Bericht {report}. Es richtet sich an die Zielgruppe {audience} mit einem Fokus auf {focus} und umfasst {sections}. Erklären Sie, wann dieser Chronologieeintrag wiederverwendet, aktualisiert oder entfernt werden sollte.",
  "reports.history.comparePrompt":
    "\nVergleichen Sie den gespeicherten Bericht {report} mit dem aktiven Paket {activePack}. Das gespeicherte Paket richtet sich an die {audience}-Zielgruppe mit einem {focus}-Fokus und umfasst {sections}. Erklären Sie, was sich geändert hat, was noch wichtig ist und welche Drilldowns oder Datenaktualisierungen als nächstes erfolgen sollten.",
  "reports.history.error.invalid":
    "\nDer generierte Bericht ist unvollständig und konnte nicht gespeichert werden.",
  "reports.history.error.saveFailed":
    "\nDer Chronologieeintrag des Berichts kann derzeit nicht gespeichert werden.",
  "sites.title": "\nStützpunkte und Einrichtungen",
  "sites.subtitle": "\nVerwalten Sie Betriebsstandorte, Klassifizierungen und Abhängigkeiten.",
  "sites.kind.base": "\nBase",
  "sites.kind.facility": "\nEinrichtung",
  "sites.stats.active": "\nAktive Websites",
  "sites.stats.bases": "\nBasen",
  "sites.stats.facilities": "\nAusstattung",
  "sites.table.name": "\nStandort",
  "sites.table.kind": "\nTyp",
  "sites.table.coordinates": "\nKoordinaten",
  "sites.table.dependencies": "\nAbhängigkeiten",
  "sites.table.status": "\nStatus",
  "sites.metrics.assets": "\n{count} Vermögenswerte",
  "sites.metrics.crews": "\n{count} Crews",
  "sites.metrics.iot": "\n{count} IoT-Geräte",
  "sites.status.active": "\nAktiv",
  "sites.status.inactive": "\nInaktiv",
  "sites.actions.edit": "\nStandort bearbeiten",
  "sites.actions.delete": "\nStandort löschen",
  "sites.form.nameLabel": "\nName",
  "sites.form.kindLabel": "\nKlassifizierung",
  "sites.form.locationLabel": "\nStandort",
  "sites.form.descriptionLabel": "\nBeschreibung",
  "sites.form.gpsLatLabel": "\nLatitude",
  "sites.form.gpsLonLabel": "\nLängengrad",
  "sites.form.activeLabel": "\nAktiv und für den Betrieb verfügbar",
  "sites.form.updateAction": "\nÄnderungen speichern",
  "sites.form.createAction": "\nStandort erstellen",
  "sites.form.createTitle": "\nBasis oder Einrichtung hinzufügen",
  "sites.form.createDescription":
    "\nErstellen Sie eine neue Betriebswebsite und stellen Sie sie für alle Finanz-, Dokumenten- und Nutzungsworkflows zur Verfügung.",
  "sites.feedback.created": "\nStandort erfolgreich erstellt.",
  "sites.feedback.updated": "\nStandort erfolgreich aktualisiert.",
  "sites.feedback.deleted": "\nStandort erfolgreich gelöscht.",
  "sites.error.invalid": "\nGeben Sie einen gültigen Site-Namen und Standort ein.",
  "sites.error.invalidCoordinates": "\nDer Breiten- oder Längengrad liegt außerhalb der Grenzen.",
  "sites.error.inUse":
    "\nDiese Site weist weiterhin betriebliche Abhängigkeiten auf und kann nicht gelöscht werden.",
  "sites.error.notFound": "\nDie angeforderte Site konnte nicht gefunden werden.",
  "sites.error.saveFailed": "\nDie Site-Änderung konnte nicht gespeichert werden.",
  "documentWorkspace.section.eyebrow": "\nTransaktionsarbeitsbereich",
  "documentWorkspace.section.filtersAria": "\nArbeitsbereichsfilter",
  "documentWorkspace.section.savedViewTitle": "\nRollenbasierte gespeicherte Ansichten",
  "documentWorkspace.section.savedViewDescription":
    "\nHalten Sie die aktuelle Kombination aus Rolle, Filter und Registerkarte als dauerhaften Arbeitsbereichsausschnitt verfügbar.",
  "documentWorkspace.section.commandTitle": "\nBefehlshaltung",
  "documentWorkspace.section.commandDescription":
    "\nVerfolgen Sie die aktuelle Dokumentphase, die Lieferübergabe und den Kontrolldruck, bevor Sie sich mit Live-Datensätzen befassen.",
  "documentWorkspace.section.recentTitle": "\nAktuelle Dokumente",
  "documentWorkspace.section.recentDescription": "\nNeueste Datensätze im aktuellen Bereich.",
  "documentWorkspace.section.historyTitle": "\nLebenszyklusverlauf",
  "documentWorkspace.history.approvalRoutedTitle": "\nGenehmigung weitergeleitet",
  "documentWorkspace.history.approvalRoutedDescription":
    "\nDie Finanzabteilung hat den nächsten Überprüfungsschritt in die Warteschlange gestellt.",
  "documentWorkspace.section.historyDescription":
    "\nUnveränderliche Chronologie für die Dokumentenbewegung.",
  "documentWorkspace.section.compareTitle": "\nEntscheidung vergleichen Tray",
  "documentWorkspace.section.compareDescription":
    "Halten Sie das führende Dokument, den Genehmigungsdruck und den Exportstatus in einer gemeinsamen Schiene sichtbar.",
  "documentWorkspace.section.approvalInboxTitle": "\nGenehmigungsposteingang",
  "documentWorkspace.section.approvalInboxDescription":
    "\nZeigen Sie die nächste ausstehende Entscheidung an und halten Sie die Genehmigungswarteschlange sichtbar.",
  "documentWorkspace.section.exportPackTitle": "\nExport- und Beweispaket",
  "documentWorkspace.section.exportPackDescription":
    "\nVerpacken Sie den ausgewählten Datensatz, den Verlauf und die unterstützenden Beweise für den nächsten Workflow.",
  "documentWorkspace.section.collectionsTitle": "\nSammlungen und Diskrepanzfluss",
  "documentWorkspace.section.collectionsDescription":
    "\nVerfolgen Sie den verbleibenden Zahlungs-, Empfangs- oder Abweichungsdruck, bevor er zum Blocker wird.",
  "documentWorkspace.section.relatedActivityTitle": "\nVerwandter Aktivitätskontext",
  "documentWorkspace.section.relatedActivityDescription":
    "\nHalten Sie die neuesten Bewegungen, verknüpften Datensätze und die Übergabe durch den Bediener im selben Arbeitsbereich sichtbar.",
  "documentWorkspace.metricTone.neutral": "\nStetig",
  "documentWorkspace.metricTone.primary": "\nPriorität",
  "documentWorkspace.metricTone.info": "\nIm Test",
  "documentWorkspace.metricTone.success": "\nAuf dem richtigen Weg",
  "documentWorkspace.metricTone.warning": "\nAchtung",
  "documentWorkspace.metricTone.error": "\nEskaliert",
  "documentWorkspace.table.document": "\nDokument",
  "documentWorkspace.table.status": "\nStatus",
  "documentWorkspace.table.amount": "\nBetrag",
  "documentWorkspace.table.date": "\nDatum",
  "documentWorkspace.list.filterBarAria": "\nFilter für die Dokumentliste",
  "documentWorkspace.list.searchPlaceholder": "\nDokumente durchsuchen…",
  "documentWorkspace.list.searchAria": "\nDokumente durchsuchen",
  "documentWorkspace.list.statusFilterAria": "\nNach Status filtern",
  "documentWorkspace.list.tableAria": "\nDokumente — {documentType}",
  "documentWorkspace.list.emptyTitle": "\nNoch keine Dokumente",
  "documentWorkspace.list.emptyCta": "\nDokument erstellen",
  "documentWorkspace.list.tableLoading": "\nDokumente werden geladen",
  "documentWorkspace.list.sectionAria": "\nDokumentliste",
  "documentWorkspace.tab.overview": "\nÜbersicht",
  "documentWorkspace.tab.documents": "\nDokumente",
  "documentWorkspace.tab.history": "\nGeschichte",
  "documentWorkspace.filter.all": "\nAlle",
  "documentWorkspace.metric.total": "\nGesamt",
  "documentWorkspace.metric.completed": "\nAbgeschlossen",
  "documentWorkspace.emptyCta":
    "\nErstellen Sie Ihr erstes Dokument, um mit der Verfolgung dieses Workflows zu beginnen.",
  "documentWorkspace.emptyTimelineCta":
    "\nDie Dokumentaktivität wird hier angezeigt, sobald Datensätze erstellt wurden.",
  "documentWorkspace.rfq.heading": "\nAusschreibungen",
  "documentWorkspace.rfq.description":
    "\nEingehender Qualifizierungstrichter für öffentliche Anfragen, Partnergespräche und Angebotsumwandlung.",
  "documentWorkspace.rfq.empty": "\nEs sind noch keine RFQ-Anfragen verfügbar.",
  "documentWorkspace.rfq.timelineEmpty": "\nEs ist noch kein RFQ-Verlauf verfügbar.",
  "documentWorkspace.rfq.timelineFallback": "\nRFQ-Workflow aktualisiert.",
  "documentWorkspace.rfq.metric.submitted": "\nEingereicht",
  "documentWorkspace.rfq.metric.quoted": "\nZitiert",
  "documentWorkspace.rfq.metric.accepted": "\nAkzeptiert",
  "documentWorkspace.rfq.filter.submitted": "\nEingereicht",
  "documentWorkspace.rfq.filter.quoted": "\nZitiert",
  "documentWorkspace.rfq.filter.accepted": "\nAkzeptiert",
  "documentWorkspace.rfq.step.draft": "\nEntwurf",
  "documentWorkspace.rfq.step.submitted": "\nEingereicht",
  "documentWorkspace.rfq.step.qualified": "\nQualifiziert",
  "documentWorkspace.rfq.step.quoted": "\nZitiert",
  "documentWorkspace.rfq.step.accepted": "\nAkzeptiert",
  "documentWorkspace.rfq.step.declined": "\nAbgelehnt",
  "documentWorkspace.rfq.step.expired": "\nAbgelaufen",
  "documentWorkspace.rfq.secondaryFallback": "\nAnonyme Anfrage",
  "documentWorkspace.rfq.amountFallback": "\nBudget TBD",
  "documentWorkspace.rfq.notFound": "\nRFQ wurde nicht gefunden.",
  "documentWorkspace.rfq.submitted": "\nRFQ {requestNumber} eingereicht.",
  "documentWorkspace.rfq.lineItemFallback": "\nAllgemeiner Projektumfang",
  "documentWorkspace.rfq.validation.title": "\nSagen Sie uns, worum es bei der Anfrage geht.",
  "documentWorkspace.rfq.validation.summary":
    "\nFügen Sie eine kurze operative Zusammenfassung hinzu, damit die Triage mit dem Kontext beginnt.",
  "documentWorkspace.rfq.validation.email": "\nGeben Sie eine gültige Kontakt-E-Mail-Adresse ein.",
  "documentWorkspace.rfq.validation.dueDate": "\nVerwenden Sie ein gültiges Anforderungsdatum.",
  "documentWorkspace.rfq.validation.budget": "\nVerwenden Sie ein gültiges numerisches Budget.",
  "documentWorkspace.rfq.validation.error":
    "\nBei der Einreichung der Angebotsanfrage sind einige Korrekturen erforderlich.",
  "documentWorkspace.workOrder.heading": "\nArbeitsaufträge",
  "documentWorkspace.workOrder.description":
    "\nGenehmigung, Terminplanung, SLA und Abschlussverlauf für die operative Bereitstellung.",
  "documentWorkspace.workOrder.empty": "\nEs liegen noch keine Arbeitsaufträge vor.",
  "documentWorkspace.workOrder.timelineEmpty":
    "\nEs ist noch kein Arbeitsauftragsverlauf verfügbar.",
  "documentWorkspace.workOrder.timelineFallback": "\nArbeitsauftragslebenszyklus aktualisiert.",
  "documentWorkspace.workOrder.metric.inProgress": "\nIn Bearbeitung",
  "documentWorkspace.workOrder.metric.reviewQueue": "\nÜberprüfungswarteschlange",
  "documentWorkspace.workOrder.filter.triage": "\nTriage",
  "documentWorkspace.workOrder.filter.scheduled": "\nGeplant",
  "documentWorkspace.workOrder.filter.review": "\nBereit zur Rezension",
  "documentWorkspace.workOrder.step.draft": "\nEntwurf",
  "documentWorkspace.workOrder.step.triage": "\nTriage",
  "documentWorkspace.workOrder.step.approved": "Genehmigt",
  "documentWorkspace.workOrder.step.scheduled": "\nGeplant",
  "documentWorkspace.workOrder.step.inProgress": "\nIn Bearbeitung",
  "documentWorkspace.workOrder.step.readyForReview": "\nBereit zur Rezension",
  "documentWorkspace.workOrder.step.completed": "\nAbgeschlossen",
  "documentWorkspace.workOrder.step.cancelled": "\nAbgesagt",
  "documentWorkspace.workOrder.notFound": "\nArbeitsauftrag wurde nicht gefunden.",
  "workOrders.detail.title": "\nArbeitsauftragsdetails",
  "workOrders.detail.subtitle":
    "\nVerfolgen Sie die Arbeitszuteilung, die Arbeitsleistung und die Kostenerfassung anhand eines Betriebsauftrags.",
  "workOrders.detail.summaryTitle": "\nAusführungszusammenfassung",
  "workOrders.detail.summaryDescription":
    "\nAktueller Lieferstatus, Kontext des Beauftragten und der für diesen Auftrag erfasste Kosten-Rollup.",
  "workOrders.detail.site": "\nSite",
  "workOrders.detail.customerOrder": "\nKundenauftrag",
  "workOrders.detail.assignee": "\nBeauftragter",
  "workOrders.detail.schedule": "\nGeplantes Fenster",
  "workOrders.detail.costs.labour": "\nArbeitskosten",
  "workOrders.detail.costs.material": "\nMaterialkosten",
  "workOrders.detail.costs.other": "\nSonstige Kosten",
  "workOrders.detail.assigneeRole": "Zugewiesene Rolle",
  "workOrders.detail.updatedAt": "\nZuletzt aktualisiert",
  "workOrders.detail.outputUnits": "\nAusgabeeinheiten",
  "workOrders.detail.signoffPending": "\nDie Freigabe durch den Vorgesetzten steht noch aus",
  "workOrders.detail.signoffReady": "\nBereit zur Abmeldung durch den Vorgesetzten",
  "workOrders.detail.signoffComplete": "\nAbmeldung durch Vorgesetzten abgeschlossen",
  "workOrders.detail.descriptionTitle": "\nBetriebsbeschreibung",
  "workOrders.detail.descriptionDescription":
    "\nHalten Sie die Beschreibung des Umfangs und die Ausführungsvermerke neben dem Arbeitsbuch.",
  "workOrders.labor.feedback.saved":
    "\nArbeitseintrag gespeichert und Arbeitsauftragskosten-Rollup aktualisiert.",
  "workOrders.labor.activity.inspection": "\nInspektion",
  "workOrders.labor.activity.maintenance": "\nWartung",
  "workOrders.labor.activity.repair": "\nReparatur",
  "workOrders.labor.activity.installation": "\nInstallation",
  "workOrders.labor.activity.range_support": "\nBereichsunterstützung",
  "workOrders.labor.activity.soft_fm": "\nSoft FM",
  "workOrders.labor.activity.compliance": "\nCompliance",
  "workOrders.labor.summary.totalHours": "\nProtokollierte Stunden",
  "workOrders.labor.summary.totalHoursDesc":
    "\nVerfolgter Arbeitsaufwand im gesamten aktuellen Hauptbuch.",
  "workOrders.labor.summary.totalCost": "\nGebuchte Arbeitskosten",
  "workOrders.labor.summary.totalCostDesc": "\nIn das Arbeitsauftragsfeld „Arbeitskosten“ gerollt.",
  "workOrders.labor.summary.workerCount": "\nZugewiesene Arbeitskräfte",
  "workOrders.labor.summary.workerCountDesc":
    "\nEinzelne Mitarbeiter wurden gegen diese Anordnung registriert.",
  "workOrders.labor.summary.productivity": "\nProduktivitätsrate",
  "workOrders.labor.summary.productivityDesc":
    "\n{output} Ausgabeeinheiten, die im aktuellen Hauptbuch erfasst werden.",
  "workOrders.labor.form.title": "\nErfassen Sie die Aktivität der Belegschaft",
  "workOrders.labor.form.description":
    "\nProtokollieren Sie den Zeiterfassungsaufwand, die Ausgabeeinheiten und die Arbeitskosten direkt im operativen Arbeitsauftrag.",
  "workOrders.labor.form.submitAria": "\nArbeitsauftragseintrag speichern",
  "workOrders.labor.form.employee": "\nMitarbeiter",
  "workOrders.labor.form.employeePlaceholder": "\nWählen Sie einen Mitarbeiter aus",
  "workOrders.labor.form.employeeHint":
    "\nNutzen Sie das gemeinsam genutzte interne Benutzerverzeichnis als Quelle der Wahrheit für die Belegschaft.",
  "workOrders.labor.form.activity": "\nAktivität",
  "workOrders.labor.form.activityPlaceholder": "\nAktivität auswählen",
  "workOrders.labor.form.activityHint":
    "\nKlassifizieren Sie die Betriebsleistung, damit Produktivität und Personalmix verglichen werden können.",
  "workOrders.labor.form.entryDate": "\nEintrittsdatum",
  "workOrders.labor.form.entryDateHint":
    "\nErfassen Sie das Datum, an dem die Arbeit ausgeführt wurde.",
  "workOrders.labor.form.hours": "\nStunden",
  "workOrders.labor.form.hoursHint":
    "\nVerwenden Sie Dezimalstunden für den erfassten Arbeitsaufwand.",
  "workOrders.labor.form.hourlyRate": "\nStundensatz",
  "workOrders.labor.form.hourlyRateHint":
    "\nIn {currency} erfasst und in die Arbeitskosten übernommen.",
  "workOrders.labor.form.outputUnits": "\nAusgabeeinheiten",
  "workOrders.labor.form.outputUnitsHint":
    "\nOptionale Produktivitätsmenge, die zum Vergleich des Betriebsdurchsatzes verwendet wird.",
  "workOrders.labor.form.notes": "\nNotizen",
  "workOrders.labor.form.notesHint":
    "\nErfassen Sie Schichtnotizen, Blocker oder Sicherheitskommentare.",
  "workOrders.labor.form.submit": "\nArbeitseintrag hinzufügen",
  "workOrders.labor.table.title": "\nArbeitsbuch",
  "workOrders.labor.table.description":
    "\nDauerhafte Arbeitseinträge im Stundenzettel-Stil, die mit einer betrieblichen Ausgabe verknüpft sind.",
  "workOrders.labor.table.employee": "\nMitarbeiter",
  "workOrders.labor.table.activity": "\nAktivität",
  "workOrders.labor.table.entryDate": "\nDatum",
  "workOrders.labor.table.hours": "\nStunden",
  "workOrders.labor.table.outputUnits": "\nAusgabe",
  "workOrders.labor.table.totalCost": "\nKosten",
  "workOrders.labor.table.notes": "\nNotizen",
  "workOrders.labor.table.loggedBy": "\nGeloggt von {name}",
  "workOrders.labor.table.empty":
    "\nFür diesen Arbeitsauftrag wurden noch keine Arbeitseinträge erfasst.",
  "workOrders.labor.validation.formInvalid":
    "\nKorrigieren Sie das Arbeitseingabeformular vor dem Speichern.",
  "workOrders.labor.validation.employeeId":
    "\nWählen Sie den Mitarbeiter aus, der die Arbeit abgeschlossen hat.",
  "workOrders.labor.validation.employeeMissing":
    "\nDer ausgewählte Mitarbeiter steht nicht mehr für die Arbeitszuteilung zur Verfügung.",
  "workOrders.labor.validation.activity": "\nWählen Sie eine gültige Arbeitsaktivität aus.",
  "workOrders.labor.validation.entryDate": "\nVerwenden Sie ein gültiges Arbeitseintrittsdatum.",
  "workOrders.labor.validation.hours": "\nGeben Sie die geleisteten Arbeitsstunden ein.",
  "workOrders.labor.validation.hoursPositive": "\nStunden müssen größer als Null sein.",
  "workOrders.labor.validation.hourlyRate": "\nVerwenden Sie einen gültigen Stundensatz.",
  "workOrders.labor.validation.outputUnits": "\nVerwenden Sie einen gültigen Ausgabeeinheitswert.",
  "documentWorkspace.purchaseOrder.heading": "\nBestellungen",
  "documentWorkspace.purchaseOrder.description":
    "Lieferantengenehmigungen, Quittungsverfolgung und Rechnungskontrollpunkte für Procure-to-Pay.",
  "documentWorkspace.purchaseOrder.empty": "\nEs liegen noch keine Bestellungen vor.",
  "documentWorkspace.purchaseOrder.timelineEmpty": "\nEs ist noch keine Bestellhistorie verfügbar.",
  "documentWorkspace.purchaseOrder.timelineFallback": "\nBestelllebenszyklus aktualisiert.",
  "documentWorkspace.purchaseOrder.metric.pending": "\nAusstehend",
  "documentWorkspace.purchaseOrder.metric.received": "\nErhalten",
  "documentWorkspace.purchaseOrder.metric.billed": "\nIn Rechnung gestellt",
  "documentWorkspace.purchaseOrder.filter.requested": "\nAngefordert",
  "documentWorkspace.purchaseOrder.filter.sent": "\nGesendet",
  "documentWorkspace.purchaseOrder.filter.received": "\nErhalten",
  "documentWorkspace.purchaseOrder.step.draft": "\nEntwurf",
  "documentWorkspace.purchaseOrder.step.requested": "\nAngefordert",
  "documentWorkspace.purchaseOrder.step.approved": "Genehmigt",
  "documentWorkspace.purchaseOrder.step.sent": "\nGesendet",
  "documentWorkspace.purchaseOrder.step.partiallyReceived": "\nTeilweise erhalten",
  "documentWorkspace.purchaseOrder.step.received": "\nErhalten",
  "documentWorkspace.purchaseOrder.step.billed": "\nIn Rechnung gestellt",
  "documentWorkspace.purchaseOrder.step.closed": "\nGeschlossen",
  "documentWorkspace.purchaseOrder.step.cancelled": "\nAbgesagt",
  "documentWorkspace.purchaseOrder.notFound": "\nBestellung wurde nicht gefunden.",
  "documentWorkspace.customerOrder.heading": "\nKundenbestellungen",
  "documentWorkspace.customerOrder.description":
    "\nKommerzielle Verpflichtungen, Genehmigungen, Erfüllung und Umsetzung von RFQs.",
  "documentWorkspace.customerOrder.empty": "\nEs liegen noch keine Kundenbestellungen vor.",
  "documentWorkspace.customerOrder.timelineEmpty":
    "\nEs ist noch keine Bestellhistorie des Kunden verfügbar.",
  "documentWorkspace.customerOrder.timelineFallback":
    "\nLebenszyklus der Kundenbestellung aktualisiert.",
  "documentWorkspace.customerOrder.metric.approvalQueue": "\nGenehmigungswarteschlange",
  "documentWorkspace.customerOrder.metric.inFulfilment": "\nIn Erfüllung",
  "documentWorkspace.customerOrder.filter.approval": "\nAusstehende Genehmigung",
  "documentWorkspace.customerOrder.filter.confirmed": "\nBestätigt",
  "documentWorkspace.customerOrder.filter.fulfilment": "\nIn Erfüllung",
  "documentWorkspace.customerOrder.step.draft": "\nEntwurf",
  "documentWorkspace.customerOrder.step.pendingApproval": "\nAusstehende Genehmigung",
  "documentWorkspace.customerOrder.step.approved": "Genehmigt",
  "documentWorkspace.customerOrder.step.confirmed": "\nBestätigt",
  "documentWorkspace.customerOrder.step.inFulfilment": "\nIn Erfüllung",
  "documentWorkspace.customerOrder.step.completed": "\nAbgeschlossen",
  "documentWorkspace.customerOrder.step.cancelled": "\nAbgesagt",
  "documentWorkspace.customerOrder.secondaryFallback": "\nDirektkonto",
  "documentWorkspace.customerOrder.notFound": "\nKundenbestellung wurde nicht gefunden.",
  "documentWorkspace.invoice.heading": "\nRechnungen",
  "documentWorkspace.invoice.description":
    "\nOperative AR-Verfolgung, Inkasso und Rechnungsalterung vor dem Buchhaltungsexport.",
  "documentWorkspace.invoice.empty": "\nEs sind noch keine Rechnungen verfügbar.",
  "documentWorkspace.invoice.timelineEmpty": "\nEs ist noch kein Rechnungsverlauf verfügbar.",
  "documentWorkspace.invoice.timelineFallback": "\nRechnungslebenszyklus aktualisiert.",
  "documentWorkspace.invoice.metric.openExposure": "\nExposure",
  "documentWorkspace.invoice.metric.paid": " öffnen\nBezahlt",
  "documentWorkspace.invoice.metric.draft": "\nEntwurf",
  "documentWorkspace.invoice.filter.issued": "\nAusgestellt",
  "documentWorkspace.invoice.filter.partiallyPaid": "\nTeilweise bezahlt",
  "documentWorkspace.invoice.filter.paid": " öffnen\nBezahlt",
  "documentWorkspace.invoice.step.draft": "\nEntwurf",
  "documentWorkspace.invoice.step.issued": "\nAusgestellt",
  "documentWorkspace.invoice.step.partiallyPaid": "\nTeilweise bezahlt",
  "documentWorkspace.invoice.step.paid": " öffnen\nBezahlt",
  "documentWorkspace.invoice.step.void": "\nLeere",
  "documentWorkspace.invoice.step.writtenOff": "\nAbgeschrieben",
  "documentWorkspace.invoice.notFound": "\nRechnung wurde nicht gefunden.",
  "portal.title": "\nPartnerportal",
  "portal.logoLabel": "\nPortal",
  "portal.authenticatedWorkspace": "\nAuthentifizierter Arbeitsbereich",
  "portal.sidebar.title": "\nZugriff auf freigegebene Dokumente",
  "portal.sidebar.description":
    "\nBestellungen, Arbeiten, Rechnungen und Beschaffung, die sich auf die Mitgliedschaft in Ihrer Organisation beziehen.",
  "portal.nav.overview": "\nÜbersicht",
  "portal.nav.orders": "\nBestellungen",
  "portal.nav.workOrders": "\nArbeitsaufträge",
  "portal.nav.invoices": "\nRechnungen",
  "portal.nav.purchaseOrders": "\nBestellungen",
  "portal.summary.eyebrow": "\nPartnerarbeitsbereich",
  "portal.summary.totalLabel": "gesamt",
  "portal.summary.title": "\nGeteilter kommerzieller Schnappschuss",
  "portal.summary.description":
    "\nAktuelle Auftrags-, Arbeits-, Rechnungs- und Beschaffungstransparenz für den authentifizierten Organisationsbereich.",
  "portal.summary.actionHubTitle": "\nVorrangige Aktionsspur",
  "portal.summary.actionHubDescription":
    "\nSorgen Sie in der Portalübersicht dafür, dass die nächste Dokumentenbewegung, der nachvollziehbare Arbeitsablauf und die Nachverfolgung für Partner sichtbar sind.",
  "portal.summary.activityTitle": "\nAktuelle Partneraktivität",
  "portal.summary.activityDescription":
    "\nVerfolgen Sie die neuesten Kundenbestellungen, Arbeitsaufträge, Rechnungen und Beschaffungsbewegungen von einem Ort aus.",
  "portal.summary.activityFallback": "\nEs wurden noch keine Partneraktivitäten aufgezeichnet.",
  "portal.summary.exceptionTitle": "\nAusnahme watch",
  "portal.summary.exceptionDescription":
    "\nBeobachten Sie die Punkte, die noch einer Bestätigung, Antwort oder Eskalation vom Partnerteam bedürfen.",
  "portal.summary.exceptionFallbackTitle":
    "\nDerzeit müssen keine aktiven Ausnahmen weiterverfolgt werden.",
  "portal.summary.exceptionFallbackDescription":
    "\nÜberwachen Sie Dokumentarbeitsbereiche weiterhin auf neue Genehmigungen, Einsprüche und Erfüllungsblocker.",
  "portal.summary.exceptionItem": "Dokument {document}: {status}",
  "portal.summary.exceptionItemDescription": "Titel {title} – {date}",
  "portal.summary.nextOrders": "\nArbeitsbereich „Offene Bestellungen“",
  "portal.summary.ordersDescription": "Kundenaufträge anzeigen und verwalten.",
  "portal.summary.workOrdersDescription": "Arbeitsauftragsfortschritt und -erfüllung verfolgen.",
  "portal.summary.invoicesDescription": "Ausstehende und bezahlte Rechnungen prüfen.",
  "portal.summary.purchaseOrdersDescription": "Bestellungen bei Lieferanten verwalten.",
  "portal.summary.nextWorkOrders": "\nArbeitsbereich „Arbeitsaufträge öffnen",
  "portal.summary.nextInvoices": "\nArbeitsbereich „Rechnungen öffnen“",
  "portal.summary.nextPurchaseOrders": "\nArbeitsbereich „Bestellungen öffnen“",
  "portal.page.orders": "\nPortalbestellungen",
  "portal.page.workOrders": "\nPortal-Arbeitsaufträge",
  "portal.page.invoices": "\nPortal-Rechnungen",
  "portal.page.purchaseOrders": "Portalbestellungen",
  "portal.documentList.sectionTitle": "Dokumente",
  "portal.documentList.tableCaption": "Dokumentenliste",
  "portal.documentList.col.id": "ID",
  "portal.documentList.col.document": "Dokument",
  "portal.documentList.col.status": "Status",
  "portal.documentList.col.value": "Wert",
  "portal.documentList.col.date": "Datum",
  "portal.documentList.col.amount": "Betrag",
  "portal.documentList.col.actions": "Aktionen",
  "portal.documentList.viewAction": "Ansehen",
  "portal.documentList.filtersLabel": "Nach Status filtern",
  "portal.documentList.loading": "Dokumente werden geladen…",
  "portal.documentList.empty.title": "Keine Dokumente",
  "portal.documentList.empty.cta": "Dokument erstellen",
  "portal.documentList.error.description": "Die Dokumente konnten nicht geladen werden.",
  "portal.documentList.searchPlaceholder": "Dokumente suchen…",
  "portal.documentList.searchLabel": "Dokumente suchen",
  "portal.documentList.resultCount": "{count} Dokumente",
  "portal.documentList.paginationInfo": "Seite {page} von {totalPages} ({totalCount} gesamt)",
  "portal.documentDetail.loading": "Dokument wird geladen…",
  "portal.documentDetail.overviewTitle": "Übersicht",
  "portal.documentDetail.lineItemsTitle": "Positionen",
  "portal.documentDetail.timelineTitle": "Aktivitätszeitachse",
  "portal.documentDetail.actionsTitle": "Verfügbare Aktionen",
  "portal.documentDetail.downloadInvoice": "Rechnung herunterladen",
  "portal.documentDetail.contactSupport": "Support kontaktieren",
  "portal.documentDetail.payInvoice": "Rechnung bezahlen",
  "portal.documentDetail.empty.title": "Dokument nicht gefunden",
  "portal.documentDetail.empty.description":
    "Das angeforderte Dokument konnte nicht gefunden werden.",
  "portal.documentDetail.empty.fields": "Keine Details verfügbar.",
  "portal.documentDetail.empty.lineItems": "Keine Positionen.",
  "portal.documentDetail.empty.timeline": "Keine Aktivität aufgezeichnet.",
  "portal.documentDetail.error.description": "Das Dokument konnte nicht geladen werden.",
  "portal.documentDetail.relatedLinksTitle": "Verwandte Links",
  "portal.documentDetail.delete.title": "Dokument löschen",
  "portal.documentDetail.delete.description":
    'Sind Sie sicher, dass Sie "{title}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
  "portal.chat.contextTitle": "\nDienstbesitzspur",
  "portal.chat.contextDescription":
    "\nHalten Sie den aktuellen Eigentümer, die verknüpften kommerziellen Aufzeichnungen und den Eskalationspfad sichtbar, während der Partner-Thread aktiv ist.",
  "portal.chat.ownerLabel": "\nAktueller Besitzer",
  "portal.chat.ownerFallback": "\nWeisen Sie einen Partnereigentümer zu",
  "portal.chat.latestFallback": "\nEs wurde noch kein Thread-Update aufgezeichnet.",
  "portal.chat.checklistOwnerTitle": "\nErfassen Sie den verantwortlichen Eigentümer",
  "portal.chat.checklistOwnerDescription":
    "\nGeben Sie an, wer für den nächsten Antwort- oder Erfüllungsschritt verantwortlich ist, bevor der Thread den Besitzer wechselt.",
  "portal.chat.checklistSlaTitle": "\nLegen Sie das Antwortfenster fest",
  "portal.chat.checklistSlaDescription":
    "\nBestätigen Sie den Zeitpunkt im Thread, wenn Lieferung, Rechnungsstellung oder Servicenachweise blockiert sind.",
  "portal.chat.checklistEscalationTitle": "\nMit verknüpften Datensätzen eskalieren",
  "portal.chat.checklistEscalationDescription":
    "\nÖffnen Sie das zugehörige Dokument oder den Mitgliederarbeitsbereich, wenn die Konversation operativ weiterverfolgt werden muss.",
  "portal.chat.openLinkedAction": "\nVerknüpften Datensatz öffnen",
  "portal.chat.composeDescription":
    "\nVerwenden Sie den Partner-Thread, um Eigentum, Antwortzeitpunkt und alle blockierten kommerziellen Schritte zu erfassen.",
  "portal.chat.composeHint":
    "\nLassen Sie den nächsten Besitzer und das versprochene Antwortfenster in jeder Antwort sichtbar.",
  "portal.chat.aiActionsDescription":
    "\nNutzen Sie KI-Aktionen, um den Partner-Thread zusammenzufassen, bevor er in Bestellungen, Arbeiten oder Rechnungsnachverfolgung eskaliert.",
  "deviceHistory.exportCsv": "\nCSV",
  "customisation.chatBubbleToggle": "\nKI-Chat-Blase",
  "customisation.chatBubbleDescription": "\nSchwebende Chat-Blase für KI-Assistenten anzeigen",
  "apiExplorer.searchRoutes": "\nRouten suchen...",
  "apiExplorer.tryIt": "\nProbieren Sie es aus",
  "apiExplorer.response": "\nAntwort",
  "apiExplorer.errorPrefix": "\nFehler:",
  "transfer.title": "\nVermögenswert übertragen",
  "transfer.subtitle":
    "\nVerschieben Sie dieses Asset an einen anderen Standort oder eine andere Einrichtung",
  "transfer.form.destination": "\nZielsite",
  "transfer.form.destinationPlaceholder": "\nZiel auswählen",
  "transfer.form.reason": "\nGrund der Überweisung",
  "transfer.form.reasonPlaceholder": "\nGrund für die Überweisung eingeben",
  "transfer.form.notes": "\nZusätzliche Hinweise",
  "transfer.form.notesPlaceholder": "\nOptionale Hinweise zu dieser Übertragung",
  "transfer.form.submit": "\nÜbertragung bestätigen",
  "transfer.form.cancel": "\nAbbrechen",
  "transfer.validation.sameLocation":
    "\nDas Ziel darf nicht mit dem aktuellen Standort identisch sein",
  "transfer.validation.assetNotFound": "\nAsset nicht gefunden",
  "transfer.validation.siteNotFound": "\nZielseite nicht gefunden",
  "transfer.validation.destinationRequired": "\nZielsite ist erforderlich",
  "transfer.feedback.success": "\nVermögenswert erfolgreich übertragen",
  "transfer.feedback.error": "\nAsset",
  "transfer.history.title": " konnte nicht übertragen werden\nÜbertragungshistorie",
  "transfer.history.empty": "\nKeine Übertragungshistorie für dieses Asset",
  "transfer.history.from": "\nVon",
  "transfer.history.to": "\nTo",
  "transfer.history.date": "\nDatum",
  "transfer.history.initiatedBy": "\nInitiiert von",
  "transfer.history.reason": "\nGrund",
  "transfer.history.notes": "\nNotizen",
  "transfer.modal.title": "\nVermögenswert übertragen",
  "transfer.modal.description":
    "\nWählen Sie den Zielstandort aus, an den dieses Asset übertragen werden soll",
  "transfer.modal.confirm": "\nÜbertragen",
  "transfer.action": "\nÜbertragen",
  "ucp.checkout.notFound": "Checkout-Sitzung wurde nicht gefunden.",
  "ucp.order.notFound": "\nBestellung wurde nicht gefunden.",
  "ucp.checkout.error.currency":
    "\nDie Währung {currency} wird für diese Katalogauswahl nicht unterstützt.",
  "ucp.checkout.error.itemUnavailable":
    "\nEin oder mehrere ausgewählte Katalogartikel sind nicht verfügbar.",
  "ucp.checkout.error.empty":
    "\nFügen Sie mindestens einen Katalogartikel hinzu, bevor Sie den Bestellvorgang abschließen.",
  "ucp.checkout.error.paymentHandler":
    "Wählen Sie ein unterstütztes Zahlungsinstrument aus, bevor Sie den Bestellvorgang abschließen.",
  "ucp.checkout.error.terminal": "\nDiese Checkout-Sitzung kann nicht mehr geändert werden.",
  "ucp.checkout.error.idMismatch": "\nCheckout-ID stimmt nicht überein.",
  "ucp.checkout.ai.single":
    "\n{title}: {summary} Gesamt {total} {currency}. Überprüfen Sie die Käuferdetails und schließen Sie dann den Kaufvorgang ab, um den operativen Auftrag zu erstellen.",
  "ucp.checkout.ai.multi":
    "\nAusgewählte Betriebspakete {count}: {titles}. Insgesamt {total} {currency}. Bestätigen Sie die Ausrichtung des Umfangs und schließen Sie dann den Checkout ab, um die Bestellung zu erstellen.",
  "ucp.checkout.completed":
    "Checkout abgeschlossen. Bestellung {orderNumber} ist jetzt bestaetigt.",
  "ucp.checkout.canceled": "\nKasse abgebrochen.",
  "ucp.reference.service.title": "\n{merchantName} Einkaufsservice",
  "ucp.reference.checkout.specTitle": "\nShopping-Checkout-Funktion",
  "ucp.reference.checkout.schemaTitle": "\nShopping-Checkout-Funktionsschema",
  "ucp.reference.order.specTitle": "\nEinkaufsbestellfunktion",
  "ucp.reference.order.schemaTitle": "\nEinkaufsbestellfähigkeitsschema",
  "ucp.reference.fulfillment.specTitle": "\nEinkaufsabwicklungsfähigkeit",
  "ucp.reference.fulfillment.schemaTitle": "\nEinkaufsabwicklungsfunktionsschema",
  "ucp.reference.buyerConsent.specTitle": "\nFunktion zur Einwilligung des Shopping-Käufers",
  "ucp.reference.buyerConsent.schemaTitle": "\nSchema",
  "ucp.reference.paymentHandler.specTitle":
    " für die Einwilligungsfunktion des Shopping-Käufers\nSpezifikation des Händler-Zahlungsabwicklers",
  "ucp.reference.paymentHandler.configSchemaTitle":
    "\nKonfigurationsschema für Händler-Zahlungsabwickler",
  "ucp.reference.paymentHandler.instrumentSchemaTitle": "\nKartenzahlungsinstrument Schema",
  "nav.chat": "\nChat",
  "nav.automations": "\nAutomatisierungen",
  "chat.title": "\nTeam-Chat",
  "chat.subtitle":
    "\nGemeinsame Kollaborationsthreads über Betriebs-, Portal- und KI-Übergaben hinweg",
  "chat.workspace.eyebrow": "\nKollaborative Operationen",
  "chat.workspace.internalTitle": "\nZusammenarbeit im operativen Bereich",
  "chat.workspace.internalDescription":
    "\nInterne Raumthreads für Bediener, Analysten und KI-Copilot-Workflows.",
  "chat.workspace.portalTitle": "\nPartnerzusammenarbeit",
  "chat.workspace.portalDescription":
    "\nPortalsichere Konversationsthreads für die Zustellungskoordination, den Dokumentenkontext und die KI-gestützte Übergabe.",
  "chat.workspace.publicTitle": "\nÖffentliche Assistentensitzungen",
  "chat.workspace.publicDescription":
    "\nÖffentliche Aufnahmesitzungen mit KI-Prinzip, die zu Portal- oder Betriebsabläufen eskalieren können.",
  "chat.workspace.threadListTitle": "\nThemen",
  "chat.workspace.threadListDescription":
    "\nJeder Thread wird beibehalten, sodass KI-Aktionen, Übergaben und Bereitstellungskontext mit demselben Entitätsverlauf verknüpft bleiben.",
  "chat.workspace.composeTitle": "\nUpdate",
  "chat.workspace.composeDescription":
    " senden\nNachrichten werden als erstklassige Kollaborationsereignisse gespeichert, sodass Automatisierung, Berichterstellung und KI-Aktionen auf denselben Thread verweisen können.",
  "chat.workspace.messageLabel": "\nNachricht",
  "chat.workspace.messagePlaceholder":
    "\nSchreiben Sie ein Team-Update, eine Anfrage oder eine Eskalationsnotiz",
  "chat.workspace.composeHint":
    "\nVerwenden Sie die gemeinsame KI-Blase für geführte Eingabeaufforderungen. Verwenden Sie dieses Formular für dauerhafte Thread-Updates.",
  "chat.workspace.sendAction": "\nNachricht senden",
  "chat.workspace.askAiAction": "\nFragen Sie AI im Thread",
  "chat.workspace.summarizeThreadAction": "Thread",
  "chat.workspace.automationRunAction": " zusammenfassen\nWarteschlangenautomatisierungslauf",
  "chat.workspace.reportPackBuildAction": "\nBerichtspaket erstellen",
  "chat.workspace.reportPackCompareAction": "\nPaketversionen vergleichen",
  "chat.workspace.convertTaskAction": "\nIn task",
  "chat.workspace.convertReportAction": " konvertieren\nIn report",
  "chat.workspace.mlAnalysisAction": " konvertieren\nFordern Sie eine ML-Analyse an",
  "chat.workspace.publicHandoffAction": "\nÜbergabenotiz erstellen",
  "chat.workspace.aiActionsTitle": "\nAssistentenaktionen",
  "chat.workspace.aiActionsDescription":
    "\nBehalten Sie Assistentenantworten, Zusammenfassungen und Steuerungsebenenaktionen im selben Thread-Verlauf bei.",
  "chat.workspace.aiDefaultPrompt":
    "\nÜberprüfen Sie den aktuellen Thread und helfen Sie bei der nächsten Bedieneraktion.",
  "chat.workspace.emptyThread":
    "\nWählen Sie eine Konversation aus, um deren Nachrichtenverlauf anzuzeigen.",
  "chat.workspace.noThreadsTitle": "\nEs sind noch keine Kollaborationsthreads aktiv.",
  "chat.workspace.noThreadsDescription":
    "\nErstellen Sie eine Konversation oder leiten Sie sie an diese Oberfläche weiter, bevor Sie den freigegebenen Thread-Verlauf und die Assistentenaktionen verwenden.",
  "chat.workspace.composeUnavailableTitle":
    "\nWählen Sie einen Thread aus, bevor Sie Hilfsaktionen veröffentlichen oder ausführen.",
  "chat.workspace.composeUnavailableDescription":
    "\nThread-Nachrichten, Zusammenfassungen, Automatisierungsläufe und Übergabenotizen bleiben alle in einer aktiven Konversation bestehen.",
  "chat.workspace.surfaceInternal": "\nIntern",
  "chat.workspace.surfacePortal": "\nPortal",
  "chat.workspace.surfacePublic": "\nÖffentlich",
  "chat.workspace.threadCount": "\n{count} Threads",
  "chat.workspace.typeChannel": "\nKanal",
  "chat.workspace.typeDirectMessage": "\nDirektnachricht",
  "chat.workspace.typeEntityThread": "\nEntitätsthread",
  "chat.workspace.typePartyThread": "\nPartnerthread",
  "chat.workspace.typePublicAssistant": "\nAssistentensitzung",
  "chat.workspace.participantsTitle": "\nTeilnehmer",
  "chat.workspace.participantsDescription":
    "\nWer ist in dieser Konversation aktiv und kann in neuen Nachrichten markiert werden.",
  "chat.workspace.noParticipants": "\nDieser Unterhaltung sind noch keine Teilnehmer zugeordnet.",
  "chat.workspace.featuresTitle": "\nThread-Funktionen",
  "chat.workspace.featuresDescription":
    "\nKonversationstyp, verknüpfte Datensätze, Nachrichtenvolumen und KI-Bereitschaft bleiben neben dem Thread sichtbar.",
  "chat.workspace.linkedRecordsTitle": "\nVerknüpfte Datensätze",
  "chat.workspace.linkedRecordsDescription":
    "\nAn dieses Gespräch angehängte kommerzielle und betriebliche Aufzeichnungen bleiben im selben Arbeitsbereich sichtbar.",
  "chat.workspace.noLinkedRecords":
    "\nAn diese Konversation sind noch keine verknüpften Datensätze angehängt.",
  "chat.workspace.tagPeopleTitle": "\nMarkieren Sie Personen und AI",
  "chat.workspace.tagPeopleDescription":
    "\nAusgewählte Teilnehmer werden mit der Nachricht gespeichert, sodass Übergaben und Folgearbeiten im gleichen Kontext bleiben.",
  "chat.workspace.tagParticipantAria": "\nTaggen Sie {participant} in dieser Nachricht",
  "chat.workspace.noTagTargets": "\nFür diese Konversation sind noch keine Tag-Ziele verfügbar.",
  "chat.workspace.participantCount": "\n{count} Teilnehmer",
  "chat.workspace.messageCount": "\n{count} Nachrichten",
  "chat.workspace.linkedRecordCount": "\n{count} verknüpfte Datensätze",
  "chat.workspace.participantMetricLabel": "\nTeilnehmer",
  "chat.workspace.messageMetricLabel": "\nNachrichten",
  "chat.workspace.linkedRecordMetricLabel": "\nVerlinkt",
  "chat.workspace.slaQueueTitle": "\nSLA-Warteschlange",
  "chat.workspace.slaQueueDescription":
    "\nUngelesene oder frisch aktualisierte Threads, die eine zeitgesteuerte Nachverfolgung oder Eskalationsentscheidung erfordern.",
  "chat.workspace.ownerQueueTitle": "\nHaltung des Besitzers",
  "chat.workspace.ownerQueueDescription":
    "\nHalten Sie den aktiven Teilnehmersatz und die Nachrichtentiefe sichtbar, bevor Sie den nächsten Eigentümer zuweisen.",
  "chat.workspace.triageModesTitle": "\nTriage-Modi",
  "chat.workspace.triageModesDescription":
    "Wechseln Sie von der Thread-Überprüfung zur Aufgabenkonvertierung, Berichterstellung oder Nachverfolgung des Eigentümers, ohne den Konversationskontext zu verlieren.",
  "chat.workspace.aiEnabled": "\nKI bereit",
  "chat.workspace.aiDisabled": "\nKI aus",
  "chat.workspace.participantAudienceAi": "KI",
  "chat.workspace.participantAudienceOperator": "\nBetreiber",
  "chat.workspace.participantAudiencePartner": "\nPartner",
  "chat.workspace.participantAudiencePublic": "\nÖffentlich",
  "chat.workspace.participantRoleOwner": "\nBesitzer",
  "chat.workspace.participantRoleMember": "\nMitglied",
  "chat.workspace.participantRoleObserver": "\nBeobachter",
  "chat.workspace.participantRoleAssistant": "\nAssistent",
  "chat.workspace.viewerParticipant": "\nDu",
  "chat.validation.messageRequired": "\nNachrichteninhalt ist erforderlich.",
  "chat.validation.conversationNotFound": "\nKonversation wurde nicht gefunden.",
  "chat.validation.mentionNotFound":
    "\nEin oder mehrere getaggte Teilnehmer konnten nicht aufgelöst werden.",
  "chat.assistant.action.automationRunCreated":
    "\nAutomatisierungslauf in der Warteschlange für {title}. Aktueller Status: {status}.",
  "chat.assistant.action.reportPackBuilt":
    "\nErstellte eine neue Report-Pack-Version für {title}. Aktive Versions-ID: {versionId}.",
  "chat.assistant.action.publicHandoffStarted":
    "\nÖffentliche Übergabe für {title} gestartet. Interner Eskalationsthread: {threadId}.",
  "chat.assistant.action.publicHandoffAutomationQueued":
    "\nAutomatisierungslauf in der Warteschlange {runId}, um die Eskalation weiterzuleiten.",
  "chat.assistant.action.mlRunRequested":
    "\nML-Analyse in der Warteschlange ausgeführt {runId}. Aktueller Status: {status}.",
  "chat.assistant.handoff.threadTitle": "\nÖffentliche Übergabe: {title}",
  "chat.assistant.handoff.threadDescription":
    "\nInterner Eskalationsthread, erstellt aus einer öffentlichen Assistentensitzung.",
  "chat.assistant.handoff.seedMessage":
    "\nÖffentlicher Assistent eskalierte {title}. Letzter Kontext: {summary}",
  "chat.assistant.handoff.runNotes":
    "\nÖffentliche Übergabe für {title}. Quellkonversations-ID: {conversationId}.",
  "chat.seed.actors.ai": "KI",
  "chat.seed.actors.operator": "\nBetreiber",
  "chat.seed.actors.partner": "\nPartner",
  "chat.seed.internal.operationsTitle": "\nTriage der Betriebsbereitschaft",
  "chat.seed.internal.operationsDescription":
    "\nFunktionsübergreifende Bereitschaftsaktualisierungen, die Assets, Pakete und Eskalationen verknüpfen.",
  "chat.seed.internal.operationsPreview":
    "\nAI hat zwei Bereitschaftsunterschiede festgestellt und vorgeschlagen, das Board-Paket vor dem Briefing um 18:00 Uhr aufzufrischen.",
  "chat.seed.internal.operationsAiMessage":
    "\nIch habe zwei Bereitschaftsdeltas gefunden, die sich auf das aktuelle Board-Paket auswirken. Aktualisieren Sie das Betriebspaket vor dem nächsten Briefing.",
  "chat.seed.internal.operationsUserMessage":
    "\nEskalieren Sie die Deltas in das aktive Paket und benachrichtigen Sie den Immobilienleiter, wenn die Auslastungsprognose erneut sinkt.",
  "chat.seed.internal.estateLead": "\nNachlassleitung",
  "chat.seed.internal.operationsAnchorPack": "\nOperations Pack v3",
  "chat.seed.internal.operationsAnchorEstate": "\nNachlassbereitschaft",
  "chat.seed.internal.reportsTitle": "\nBerichtspaketrezensionen",
  "chat.seed.internal.reportsDescription":
    "\nThread-Kommentare für gespeicherte Berichte, Paketrevisionen und Chronologievergleiche.",
  "chat.seed.internal.reportsPreview":
    "\nBoard Pack v3 ist mit aktualisiertem Anomaliekontext und kommerziellen Risikohinweisen zur Überprüfung bereit.",
  "chat.seed.portal.fulfilmentTitle": "\nÜbergabe der Partnererfüllung",
  "chat.seed.portal.fulfilmentDescription":
    "\nIm Portal sichtbarer Thread zur Bestätigung des Arbeitsumfangs, des Dokumentstatus und KI-gestützter Antwortentwürfe.",
  "chat.seed.portal.fulfilmentPreview":
    "\n.bao Operator hat eine Übergabezusammenfassung für den neuesten Arbeitsauftragsmeilenstein und die Rechnungssperre erstellt.",
  "chat.seed.portal.fulfilmentMessage":
    "Bestätigen Sie den überarbeiteten Arbeitsauftragsmeilenstein und teilen Sie uns mit, ob die Rechnungssperre jetzt aufgehoben werden kann.",
  "chat.seed.portal.operatorLabel": "\nBetriebskoordinator",
  "chat.seed.portal.anchorLabel": "\nMeilenstein für Partner-Arbeitsaufträge",
  "chat.seed.public.assistantTitle": "\nAusschreibungsassistent",
  "chat.seed.public.assistantDescription":
    "\nÖffentlicher KI-Annahmethread mit Bezug zu Käuferfragen und RFQ-Kontext.",
  "chat.seed.public.assistantPreview":
    "\nDer Assistent erfasste die Anforderungen des Käufers, klärte den Liefertermin und bereitete einen Eskalationspfad vor.",
  "chat.seed.public.assistantMessage":
    "\nIch kann Ihre Anforderungen sammeln, den Umfang zusammenfassen und es an einen Betreiber weiterleiten, wenn eine kommerzielle Überprüfung erforderlich ist.",
  "chat.seed.public.buyerLabel": "\nKäufer",
  "chat.seed.public.anchorLabel": "\nRFQ-Einnahme",
  "controlPlane.validation.definitionNotFound":
    "\nAutomatisierungsdefinition wurde nicht gefunden.",
  "controlPlane.validation.definitionRequired": "\nAutomatisierungsdefinition ist erforderlich.",
  "controlPlane.validation.definitionTitleRequired":
    "\nDer Titel der Automatisierungsdefinition ist erforderlich.",
  "controlPlane.validation.definitionStatusInvalid":
    "\nDer angeforderte Statusübergang ist ungültig.",
  "controlPlane.validation.automationActivationRequiresTrigger":
    "\nFügen Sie mindestens einen Trigger hinzu, bevor Sie diese Automatisierungsdefinition aktivieren.",
  "controlPlane.validation.automationActivationRequiresSteps":
    "\nFügen Sie mindestens einen Schritt hinzu, bevor Sie diese Automatisierungsdefinition aktivieren.",
  "controlPlane.validation.automationActivationRequiresSchedule":
    "\nGeplante Automatisierungsdefinitionen benötigen vor der Aktivierung mindestens einen Zeitplan.",
  "controlPlane.validation.automationTriggerNameRequired":
    "\nDer Name des Automatisierungstriggers ist erforderlich.",
  "controlPlane.validation.automationStepNameRequired":
    "\nDer Name des Automatisierungsschritts ist erforderlich.",
  "controlPlane.validation.automationScheduleRuleRequired":
    "\nAutomatisierungsplanregel ist erforderlich.",
  "controlPlane.validation.automationScheduleTimezoneRequired":
    "\nDie Zeitzone des Automatisierungsplans ist erforderlich.",
  "controlPlane.validation.automationScheduleTimestampInvalid":
    "\nZeitstempel des Automatisierungszeitplans müssen gültige Datums-/Uhrzeitwerte sein.",
  "controlPlane.validation.automationArtifactTitleRequired":
    "\nDer Titel des Automatisierungsartefakts ist erforderlich.",
  "controlPlane.validation.automationRunNotFound": "\nAutomatisierungslauf wurde nicht gefunden.",
  "controlPlane.validation.automationRunTransitionInvalid":
    "\nDer angeforderte Automatisierungslaufübergang ist ungültig.",
  "controlPlane.validation.automationRunDefinitionRequired":
    "\nDieser Automatisierungslauf ist nicht mit einer wiederverwendbaren Definition verknüpft.",
  "controlPlane.validation.automationRunRetryInvalid":
    "\nNur fehlgeschlagene oder abgebrochene Automatisierungsläufe können wiederholt werden.",
  "controlPlane.definition.created": "\nAutomatisierungsdefinition „{title}“ erstellt.",
  "controlPlane.definition.statusUpdated": "\nStatus aktualisiert auf {status}.",
  "controlPlane.validation.reportPackNotFound": "\nBerichtspaket wurde nicht gefunden.",
  "controlPlane.validation.reportPackCompareRequiresVersions":
    "\nFür den Vergleich sind mindestens zwei Berichtspaketversionen erforderlich.",
  "controlPlane.validation.mlExperimentNotFound": "\nML-Experiment wurde nicht gefunden.",
  "controlPlane.validation.modelVersionNotFound": "\nModellversion wurde nicht gefunden.",
  "controlPlane.validation.mlRequestTargetRequired":
    "\nWählen Sie ein ML-Experiment oder eine Modellversion aus, bevor Sie eine Analyse anfordern.",
  "controlPlane.reportPack.compareSummary":
    "\nVerglichen die neuesten Report-Pack-Versionen für {title}. Neuere Version: {newerVersionId}. Vorherige Version: {olderVersionId}.",
  "controlPlane.seed.automation.packRefreshTitle": "\nAktualisierung des strategischen Pakets",
  "controlPlane.seed.automation.packRefreshDescription":
    "Erstellen Sie das aktive Board-Paket neu, veröffentlichen Sie die neuesten Chronologie-Deltas und benachrichtigen Sie den Review-Thread.",
  "controlPlane.seed.automation.packRefreshArtifactBoardPackTitle": "\nBoard-Paket v3",
  "controlPlane.seed.automation.packRefreshArtifactInputSnapshotTitle":
    "\nSchnappschuss der Führungseingaben",
  "controlPlane.seed.automation.packRefreshArtifactDraftTitle": "\nBoard-Pack-Entwurf",
  "controlPlane.seed.automation.portalHandoffTitle": "\nÜbergabe der Portalerfüllung",
  "controlPlane.seed.automation.portalHandoffDescription":
    "\nErstellen Sie eine für den Partner sichtbare Zusammenfassung, wenn sich Arbeitsaufträge, Rechnungen oder Liefermeilensteine ändern.",
  "controlPlane.seed.automation.portalHandoffArtifactMemoTitle": "\nMemo zur Portalübergabe",
  "controlPlane.seed.automation.portalHandoffArtifactNoteTitle":
    "\nHinweis zur Übergabe an das Partnerportal",
  "controlPlane.seed.datasets.estateTitle": "\nDatensatz zur Nachlasshaltung",
  "controlPlane.seed.datasets.estateDescription":
    "\nArbeitsbereichsübergreifende Haltungsmetriken für Bereitschaft, Auslastung und Interventionsrisiko.",
  "controlPlane.seed.datasets.orderTitle": "\nAuftragsflussdatensatz",
  "controlPlane.seed.datasets.orderDescription":
    "\nKommerzielle Zeitachsenmetriken, die RFQs, Kundenaufträge, Arbeitsaufträge und Rechnungen abdecken.",
  "controlPlane.seed.packs.boardTitle": "\nBoard-Paket",
  "controlPlane.seed.packs.boardDescription":
    "\nStrategisches Entscheidungspaket mit Chronologie, Haltung und kommerziellem Risikokontext.",
  "controlPlane.seed.packs.operationsTitle": "\nOperationspaket",
  "controlPlane.seed.packs.operationsDescription":
    "\nBetriebsfeldpaket mit Auslastungs-, Bereitschafts- und Arbeitsausführungsdeltas.",
  "controlPlane.seed.ml.demandForecastTitle": "\nExperiment zur Nachfrageprognose",
  "controlPlane.seed.ml.demandForecastObjective":
    "\nPrognostizieren Sie die kommerzielle Nachfrage und Anomalieauslöser für den nächsten Betriebshorizont.",
  "controlPlane.seed.models.demandTitle": "\nNachfrageprognosemodell",
  "controlPlane.seed.models.demandDescription":
    "\nRegistrierungseintrag für genehmigte Bedarfsprognoseversionen und deren Bereitstellungsstatus.",
  "insurance.seed.policy.generalLiabilityDescription":
    "\nAllgemeine Haftpflichtversicherung für den Betrieb des North Training Site.",
  "insurance.seed.policy.propertyDescription":
    "\nSachversicherung für Gebäude und Infrastruktur im West Compound.",
  "insurance.seed.policy.cyberDescription":
    "\nCyber-Haftpflichtversicherung für Plattform- und IoT-Vermögen.",
  "insurance.seed.coverage.bodilyInjury": "\nKörperverletzung pro Vorfall",
  "insurance.seed.coverage.propertyDamage": "\nSachschaden pro Ereignis",
  "insurance.seed.coverage.aggregate": "\nAllgemeines Aggregat",
  "insurance.seed.claim.waterDamageDescription":
    "\nWasserschaden am Dach der Trainingsanlage nach Sturm. Provisorische Reparaturen abgeschlossen.",
  "insurance.seed.claim.vehicleDamageDescription":
    "\nKleiner Fahrzeugschaden auf dem Parkplatz des Geländes. Keine Verletzungen.",
  "reports.expansion.title": "\nDatenwissenschaft und Automatisierungssteuerungsebene",
  "reports.expansion.description":
    "\nDatensätze, Berichtspakete, ML-Überwachung und Automatisierungsauslöser bleiben mit dem Berichtsarbeitsbereich verbunden, anstatt in separate Tools zu fragmentieren.",
  "reports.expansion.openChat": "\nChat öffnen",
  "reports.expansion.datasetsTitle": "\nDatensatzregistrierung",
  "reports.expansion.datasetsDescription":
    "\nLive- und überwachte Analysedatensätze, die Pakete, Metriken und Modell-Snapshots versorgen.",
  "reports.expansion.openDatasets": "\nAbschnitt „Datensätze“ öffnen",
  "reports.expansion.packsTitle": "\nBerichtspakete",
  "reports.expansion.packsDescription":
    "\nVersionierte Board- und Betriebspakete mit dauerhafter Status-, Abstammungs- und Chronologieunterstützung.",
  "reports.expansion.openPacks": "\nAbschnitt „Aktives Paket“ öffnen",
  "reports.expansion.mlTitle": "ML-Steuerungsebene",
  "reports.expansion.mlDescription":
    "\nExperimente, Läufe und Registrierungseinträge, die neben der Berichtserstellung auch Prognosen und Anomalien offenlegen.",
  "reports.expansion.openModels": "\nOffene KI-Governance",
  "reports.expansion.automationsTitle": "\nAutomatisierungsregistrierung",
  "reports.expansion.automationsDescription":
    "\nBun-native Automatisierungsdefinitionen zur Koordinierung von Berichtsaktualisierungen, Benachrichtigungen und chatverknüpften Arbeitsabläufen.",
  "reports.expansion.openAutomations": "\nAutomatisierungsarbeitsbereich öffnen",
  "automations.title": "\nAutomatisierungen",
  "automations.subtitle":
    "\nDefinitionen, Ausführungen und Ausführungsstatus über eine SSR-Kontrolloberfläche",
  "automations.workspace.eyebrow": "\nAutomatisierungsarbeitsbereich",
  "automations.workspace.title": "\nDedizierte Automatisierungssteuerungsebene",
  "automations.workspace.description":
    "\nÜberprüfen Sie Automatisierungsdefinitionen, aktuelle Ausführungen, Triggerarten und Ausführungsstatus, ohne die Operations-Shell zu verlassen.",
  "automations.workspace.definitionTitle": "\nAutomatisierungsdefinitionen",
  "automations.workspace.definitionDescription":
    "\nDefinitionsdatensätze, Triggermodi und nächster Laufzeitpunkt für den aktuellen Automatisierungskatalog.",
  "automations.workspace.runTitle": "\nLetzte Automatisierungsläufe",
  "automations.workspace.runDescription":
    "\nDie letzten in der Warteschlange befindlichen, laufenden und abgeschlossenen Läufe wurden von der Steuerungsebene angezeigt.",
  "automations.workspace.definitionCount": "\n{count} Definitionen",
  "automations.workspace.runCount": "\n{count} läuft",
  "automations.workspace.activeDefinitionCount": "\n{count} aktive Definitionen",
  "automations.workspace.runningRunCount": "\n{count} läuft läuft",
  "automations.workspace.definitionTrigger": "\nAuslöser",
  "automations.workspace.definitionSteps": "\n{count} Schritte",
  "automations.workspace.definitionNextRun": "\nNächster Lauf",
  "automations.workspace.definitionSurface": "\nOberfläche",
  "automations.workspace.definitionState": "\nStaat",
  "automations.workspace.runsEmpty": "\nEs sind noch keine Automatisierungsläufe verfügbar.",
  "automations.workspace.definitionsEmpty":
    "\nEs sind noch keine Automatisierungsdefinitionen verfügbar.",
  "automations.workspace.runCreatedAt": "\nErstellt",
  "automations.workspace.runCompletedAt": "\nAbgeschlossen",
  "automations.workspace.runDefinition": "\nDefinition",
  "automations.workspace.runKind": "\nArt",
  "automations.workspace.runStatus": "\nStatus",
  "automations.workspace.openReports": "\nOffene Berichte",
  "automations.workspace.openAdmin": "\nÖffnen Sie die Admin-Governance",
  "automations.workspace.posture.title": "Execution posture",
  "automations.workspace.posture.description":
    "Keep approvals, live runs, and execution pressure visible while you work definitions or review recent activity.",
  "automations.workspace.posture.approvals":
    "{count} definition(s) still require approval coverage before all runs can start cleanly.",
  "automations.workspace.posture.pending":
    "{count} run(s) are waiting for an approval decision before leaving the queue.",
  "automations.workspace.posture.running":
    "{count} run(s) are currently executing across the active automation surface.",
  "automations.workspace.stats.definitions": "\nDefinitionen",
  "automations.workspace.stats.running": "\nLaufen",
  "automations.workspace.stats.successRate": "\nErfolgsquote",
  "automations.workspace.runDetail.status": "\nStatus",
  "automations.workspace.runDetail.created": "\nErstellt",
  "automations.workspace.runDetail.completed": "\nAbgeschlossen",
  "automations.workspace.runDetail.definition": "\nDefinition",
  "automations.workspace.runDetail.steps": "\nAusführungsschritte",
  "automations.workspace.runDetail.artifacts": "\nArtefakte",
  "automations.workspace.runDetail.artifactsEmpty": "\nKeine Artefakte generiert",
  "automations.workspace.definitionPreview.title": "\nWorkflow-Vorschau",
  "automations.workspace.definitionPreview.steps": "\nSchritte",
  "automations.workspace.definitionPreview.description":
    "\nÜberprüfen Sie die ausgewählte Workflow-Sequenz, den Zeitplanstatus und die neuesten Artefakte.",
  "automations.workspace.definitionPreview.empty":
    "\nWählen Sie eine Definition aus, um deren Workflow und die neuesten Automatisierungsartefakte zu überprüfen.",
  "automations.workspace.definitionPreview.guideFlow":
    "Inspect the current workflow sequence before moving the automation into downstream review or incident response.",
  "automations.workspace.definitionPreview.guideSchedule":
    "Keep the next run window and timezone visible while reviewing trigger cadence and operating coverage.",
  "automations.workspace.definitionPreview.guideArtifacts":
    "Use the latest artifacts to confirm the workflow is still producing the expected operational output.",
  "automations.workspace.definitionPreview.timezone": "\nZeitzone",
  "automations.workspace.filters.definitionStatus": "\nAutomatisierungsdefinitionen nach Status",
  "automations.workspace.filters.runStatus": " filtern\nAutomatisierungsläufe nach Status",
  "automations.workspace.filters.definitionScope":
    " filtern\nFilterautomatisierung läuft per Definition",
  "automations.workspace.filters.allStatuses": "\nAlle Status",
  "automations.workspace.filters.allDefinitions": "\nAlle Definitionen",
  "automations.workspace.actions.preview": "\nVorschau-Workflow",
  "automations.workspace.actions.showRuns": "\nShowläufe",
  "automations.workspace.runDetail.notFound":
    "\nDer angeforderte Automatisierungslauf konnte nicht gefunden werden.",
  "automations.workspace.runDetail.started": "\nBegonnen",
  "automations.workspace.runDetail.claimed": "\nBeansprucht",
  "automations.workspace.runDetail.heartbeat": "\nHerzschlag",
  "automations.workspace.runDetail.surface": "\nOberfläche",
  "automations.workspace.runDetail.trigger": "\nAuslöser",
  "automations.workspace.runDetail.notes": "\nNotizen",
  "automations.workspace.manualRun.title": "\nManueller Start launch",
  "automations.workspace.manualRun.description":
    "\nStellen Sie eine Live-Workflow-Ausführung in die Warteschlange, ohne den Automatisierungsarbeitsbereich zu verlassen.",
  "automations.workspace.manualRun.databaseRequired":
    "\nManuelle Starts sind nur verfügbar, wenn die datenbankgestützte Steuerungsebene konfiguriert ist.",
  "automations.workspace.manualRun.noActiveDefinitions":
    "\nDerzeit sind keine aktiven Automatisierungsdefinitionen für den manuellen Start verfügbar.",
  "automations.workspace.manualRun.definitionLabel": "\nDefinition für queue",
  "automations.workspace.manualRun.definitionHint":
    "In diesem Arbeitsbereich können nur aktive Automatisierungsdefinitionen in die Warteschlange gestellt werden.",
  "automations.workspace.manualRun.notesLabel": "\nFühren Sie Notes",
  "automations.workspace.manualRun.notesHint":
    " aus\nOptionaler Operatorkontext zum Anhängen an den Automatisierungslauf in der Warteschlange.",
  "automations.workspace.manualRun.submit": "\nrun",
  "automations.workspace.manualRun.created":
    " starten\n{title} wurde erfolgreich in die Warteschlange gestellt.",
  "automations.workspace.definitionStatus.DRAFT": "\nEntwurf",
  "automations.workspace.definitionStatus.ACTIVE": "\nAktiv",
  "automations.workspace.definitionStatus.PAUSED": "\nPausiert",
  "automations.workspace.definitionStatus.ARCHIVED": "\nArchiviert",
  "automations.workspace.runStatus.QUEUED": "\nIn der Warteschlange",
  "automations.workspace.runStatus.RUNNING": "\nLaufen",
  "automations.workspace.runStatus.SUCCEEDED": "\nErfolgreich",
  "automations.workspace.runStatus.FAILED": "\nFehlgeschlagen",
  "automations.workspace.runStatus.CANCELED": "\nAbgesagt",
  "automations.workspace.runKind.REPORT_PACK": "\nBerichtspaket",
  "automations.workspace.runKind.WORKFLOW": "\nWorkflow",
  "automations.workspace.runKind.EDGE_RUNBOOK": "\nEdge-Runbook",
  "automations.workspace.runKind.DEVICE_COMMAND": "\nGerätebefehl",
  "automations.workspace.runKind.ML_PIPELINE": "\nML-Pipeline",
  "automations.workspace.runStatus.AWAITING_APPROVAL": "\nWarten auf Genehmigung",
  "automations.workspace.triggerKind.COMPLETION_OF": "\nFertigstellung von",
  "automations.workspace.approvalGate.title": "\nGenehmigungsgate",
  "automations.workspace.approvalGate.description":
    "\nDiese Automatisierung erfordert eine manuelle Genehmigung, bevor mit der Ausführung begonnen wird.",
  "automations.workspace.approvalGate.approve": "\nLauf genehmigen",
  "automations.workspace.approvalGate.reject": "\nrun",
  "automations.workspace.approvalGate.pending": " öffnen\nAusstehende Genehmigung",
  "automations.workspace.approvalGate.approvedBy": " ablehnen\nGenehmigt von {name}",
  "automations.workspace.approvalGate.approvedAt": "\nGenehmigt am",
  "automations.workspace.approvalGate.confirmTitle": "\nGenehmigung bestätigen",
  "automations.workspace.approvalGate.confirmDescription":
    "\nWenn Sie diesen Lauf genehmigen, wird er in den Status „LÄUFT“ versetzt. Diese Aktion kann nicht rückgängig gemacht werden.",
  "automations.workspace.approvalGate.rejectTitle": "\nAblehnung bestätigen",
  "automations.workspace.approvalGate.rejectDescription":
    "\nWenn Sie diesen Lauf ablehnen, wird er abgebrochen. Diese Aktion kann nicht rückgängig gemacht werden.",
  "automations.workspace.approvalGate.requiresApproval": "\nErfordert Genehmigung",
  "automations.workspace.approvalGate.noApprovalRequired": "\nKeine Genehmigung erforderlich",
  "automations.workspace.scheduleEditor.title": "\nZeitplaneditor",
  "automations.workspace.scheduleEditor.description":
    "\nKonfigurieren Sie mithilfe von Wochentags-, Stunden- und Zeitzonenselektoren, wann diese Automatisierung ausgeführt wird.",
  "automations.workspace.scheduleEditor.cronLabel": "\nWiederholungsregel",
  "automations.workspace.scheduleEditor.timezoneLabel": "\nZeitzone",
  "automations.workspace.scheduleEditor.previewLabel": "\nVorschau des nächsten Laufs",
  "automations.workspace.scheduleEditor.save": "\nZeitplan speichern",
  "automations.workspace.scheduleEditor.daysOfWeek": "\nWochentage",
  "automations.workspace.scheduleEditor.hourLabel": "\nStunde (24h)",
  "automations.workspace.scheduleEditor.minuteLabel": "\nMinute",
  "automations.workspace.scheduleEditor.monday": "\nMo",
  "automations.workspace.scheduleEditor.tuesday": "\nDi",
  "automations.workspace.scheduleEditor.wednesday": "\nMi",
  "automations.workspace.scheduleEditor.thursday": "\nDo",
  "automations.workspace.scheduleEditor.friday": "\nFr",
  "automations.workspace.scheduleEditor.saturday": "\nSa",
  "automations.workspace.scheduleEditor.sunday": "\nSun",
  "automations.workspace.retryPolicy.title": "\nWiederholungsrichtlinie",
  "automations.workspace.retryPolicy.description":
    "\nAutomatisches Wiederholungsverhalten für fehlgeschlagene Automatisierungsläufe konfigurieren.",
  "automations.workspace.retryPolicy.maxAttempts": "\nMax. Wiederholungsversuche",
  "automations.workspace.retryPolicy.backoffMs": "\nBackoff-Intervall (ms)",
  "automations.workspace.retryPolicy.retryOnLabel": "\nWiederholen Sie den Status",
  "automations.workspace.retryPolicy.save": "\nWiederholungsrichtlinie speichern",
  "automations.workspace.retryPolicy.noPolicy": "\nKeine Wiederholungsrichtlinie konfiguriert.",
  "automations.workspace.retryPolicy.attempt": "\nWiederholungsversuch {attempt}",
  "automations.workspace.retryPolicy.parentRun": "\nÜbergeordneter Lauf",
  "automations.workspace.auditTrail.title": "\nAudit-Trail",
  "automations.workspace.auditTrail.description":
    "\nSehen Sie, wer Automatisierungsläufe gestartet hat, wann sie ausgelöst wurden und welche Ergebnisse sie erzielt haben.",
  "automations.workspace.auditTrail.whoRan": "\nAngefordert von",
  "automations.workspace.auditTrail.triggeredBy": "\nAuslöser",
  "automations.workspace.auditTrail.definition": "\nDefinition",
  "automations.workspace.auditTrail.outcome": "\nErgebnis",
  "automations.workspace.auditTrail.timestamp": "\nZeitstempel",
  "automations.workspace.auditTrail.empty": "\nKeine Audit-Trail-Einträge gefunden.",
  "automations.workspace.auditTrail.filterByUser": "\nFiltern nach Benutzer",
  "automations.workspace.auditTrail.filterByDefinition": "\nNach Definition filtern",
  "automations.workspace.auditTrail.filterByDateRange": "\nNach Datumsbereich filtern",
  "automations.workspace.auditTrail.searchPlaceholder": "\nAudit-Trail durchsuchen...",
  "automations.workspace.auditTrail.searchAria": "\nAudit-Trail-Einträge durchsuchen",
  "automations.workspace.chainedSequence.title": "\nVerkettete Sequenz",
  "automations.workspace.chainedSequence.description":
    "\nVerketten Sie diese Automatisierung, um sie nach Abschluss einer anderen Definition auszulösen.",
  "automations.workspace.chainedSequence.upstream": "\nUpstream-Definition",
  "automations.workspace.chainedSequence.downstream": "\nDownstream-Definitionen",
  "automations.workspace.chainedSequence.selectUpstream": "\nWählen Sie die Upstream-Definition",
  "automations.workspace.chainedSequence.save": " aus\nKette speichern",
  "automations.workspace.chainedSequence.noChain": "\nKeine Kette konfiguriert.",
  "automations.workspace.chainedSequence.chainVisualization": "\nKettenvisualisierung",
  "admin.aiSettings.provider.RAMALAMA": "\nRamaLama",
  "admin.aiSettings.provider.OLLAMA": "\nOllama",
  "admin.aiSettings.provider.OPENAI": "\nOpenAI",
  "admin.aiSettings.provider.CLAUDE": "\nClaude",
  "admin.aiSettings.provider.HUGGINGFACE": "\nUmarmendes Gesicht",
  "admin.aiSettings.provider.GEMINI": "\nZwillinge",
  "documentWorkflow.bar.label": "\nDokumentenworkflow",
  "documentWorkflow.action.submit": "\nSenden",
  "documentWorkflow.action.approve": "\nGenehmigen",
  "documentWorkflow.action.reject": "\nAblehnen",
  "documentWorkflow.action.qualify": "\nQualifizieren",
  "documentWorkflow.action.quote": "\nZitat",
  "documentWorkflow.action.accept": "\nAkzeptieren",
  "documentWorkflow.action.decline": "\nAblehnen",
  "documentWorkflow.action.confirm": " bearbeiten\nBestätigen",
  "documentWorkflow.action.startFulfilment": "\nErfüllung starten",
  "documentWorkflow.action.complete": "\nKomplett",
  "documentWorkflow.action.schedule": "\nZeitplan",
  "documentWorkflow.action.startWork": "\nBeginnen Sie mit der Arbeit",
  "documentWorkflow.action.submitReview": "\nZur Überprüfung einreichen",
  "documentWorkflow.action.send": "\nSenden",
  "documentWorkflow.action.close": "\nSchließen",
  "documentWorkflow.action.receiveItems": "\nArtikel erhalten",
  "documentWorkflow.action.recordPayment": "\nZahlung aufzeichnen",
  "documentWorkflow.action.issue": "\nProblem",
  "documentWorkflow.action.void": "\nLeere",
  "documentWorkflow.status.draft": "\nEntwurf",
  "documentWorkflow.status.submitted": "\nEingereicht",
  "documentWorkflow.status.qualified": "\nQualifiziert",
  "documentWorkflow.status.quoted": "\nZitiert",
  "documentWorkflow.status.accepted": "\nAkzeptiert",
  "documentWorkflow.status.declined": "\nAbgelehnt",
  "documentWorkflow.status.pendingApproval": "\nAusstehende Genehmigung",
  "documentWorkflow.status.approved": "Genehmigt",
  "documentWorkflow.status.confirmed": "\nBestätigt",
  "documentWorkflow.status.inFulfilment": "\nIn Erfüllung",
  "documentWorkflow.status.completed": "\nAbgeschlossen",
  "documentWorkflow.status.triage": "\nTriage",
  "documentWorkflow.status.scheduled": "\nGeplant",
  "documentWorkflow.status.inProgress": "\nIn Bearbeitung",
  "documentWorkflow.status.readyForReview": "\nBereit zur Rezension",
  "documentWorkflow.status.requested": "\nAngefordert",
  "documentWorkflow.status.sent": "\nGesendet",
  "documentWorkflow.status.partiallyReceived": "\nTeilweise erhalten",
  "documentWorkflow.status.received": "\nErhalten",
  "documentWorkflow.status.billed": "\nIn Rechnung gestellt",
  "documentWorkflow.status.closed": "\nGeschlossen",
  "documentWorkflow.status.issued": "\nAusgestellt",
  "documentWorkflow.status.partiallyPaid": "\nTeilweise bezahlt",
  "documentWorkflow.status.paid": " öffnen\nBezahlt",
  "documentWorkflow.status.cancelled": "\nAbgesagt",
  "documentWorkflow.status.void": "\nLeere",
  "documentWorkflow.status.writtenOff": "\nAbgeschrieben",
  "documentWorkflow.status.expired": "\nAbgelaufen",
  "nav.mlops": "\nMLOps",
  "mlops.title": "\nMLOps",
  "mlops.subtitle":
    "\nLive-Experimente, Modellfreigaben, Bereitstellungen und Upstream-Datenstatus",
  "mlops.heroEyebrow": "ML-Steuerungsebene",
  "mlops.coverage":
    "Verfolgen Sie den Status des Experiments, Ausführungen in der Warteschlange, bereitgestellte Modelle und Upstream-Datenabhängigkeiten von einem Live-Server-gerenderten Arbeitsbereich aus.",
  "mlops.chatContext":
    "\nMLOps-Arbeitsbereich. {experiments} Experimente, {runs} aktive Ausführungen, {models} Registrierungseinträge und {deployments} bereitgestellte oder aktive Bereitstellungen.",
  "mlops.stats.experiments": "\nExperimente",
  "mlops.stats.experimentsDescription":
    "\nDerzeit im Live-Steuerungsebenendiagramm verfolgte Experimentdefinitionen.",
  "mlops.stats.activeRuns": "\nAktive Läufe",
  "mlops.stats.activeRunsDescription":
    "\nML- und Automatisierungsläufe befinden sich derzeit in der Warteschlange oder werden in der Pipeline ausgeführt.",
  "mlops.stats.failedRuns": "\nFehlgeschlagene Läufe",
  "mlops.stats.failedRunsDescription":
    "\nLäufe, die derzeit untersucht werden müssen, bevor die Modellförderung fortgesetzt wird.",
  "mlops.stats.models": "\nRegistrierungseinträge",
  "mlops.stats.modelsDescription":
    "\nModelldatensätze, die zur Evaluierung, Bereitstellung oder Freigabe verfügbar sind.",
  "mlops.stats.deployments": "\nLive-Bereitstellungen",
  "mlops.stats.deploymentsDescription":
    "\nDerzeit bereitgestellte oder aktive Bereitstellungen im gesamten Modellbereitstellungspfad.",
  "mlops.stats.dataSources": "\nUpstream-Quellen",
  "mlops.stats.dataSourcesDescription":
    "\nDatensätze und Berichtspakete, die die aktuelle MLOps-Überprüfungsoberfläche versorgen.",
  "mlops.actions.eyebrow": "\nVerbundene Arbeitsabläufe",
  "mlops.actions.title": "\nWechseln Sie von der Modellhaltung zur Aktion",
  "mlops.actions.description":
    "\nÖffnen Sie die verbundenen Arbeitsbereiche, die bereits über Berichte, Automatisierung und KI-gestützte Untersuchungen für diese Steuerungsebene verfügen.",
  "mlops.action.reports":
    "\nUntersuchen Sie Datensätze, Berichtspakete und nachgelagerte Analysen, die mit dem aktuellen Modelllebenszyklus verknüpft sind.",
  "mlops.action.automations":
    "\nÜberprüfen Sie Automatisierungsausführungen in der Warteschlange und die Workflowdefinitionen, die die Bereitstellungsförderung unterstützen.",
  "mlops.action.chat":
    "\nÖffnen Sie den gemeinsamen KI-Arbeitsbereich, um Anomalien zu untersuchen, die Haltung zusammenzufassen und die nächste Aktion zu planen.",
  "mlops.manualRun.title": "\nManuelles Starten von run",
  "mlops.manualRun.description":
    "\nStellen Sie eine manuelle ML-Ausführung für ein Experiment, eine bereitgestellte Modellversion oder beide in die Warteschlange, ohne den Arbeitsbereich zu verlassen.",
  "mlops.manualRun.databaseRequired":
    "\nKonfigurieren Sie die Datenbank, bevor Sie manuelle ML-Ausführungen von diesem Arbeitsbereich aus starten.",
  "mlops.manualRun.noTargets":
    "\nFür manuelle ML-Ausführungen sind noch keine Experimente oder bereitgestellten Modellversionen verfügbar.",
  "mlops.manualRun.experimentLabel": "\nExperiment",
  "mlops.manualRun.experimentHint":
    "\nOptional. Wählen Sie ein Experiment aus, wenn der Lauf an einen aktiven Bewertungstrack angehängt werden soll.",
  "mlops.manualRun.experimentOptional": "\nKein Testziel",
  "mlops.manualRun.modelVersionLabel": "\nBereitgestellte Modellversion",
  "mlops.manualRun.modelVersionHint":
    "Optional. Wählen Sie eine bereitgestellte Modellversion aus, wenn der Lauf ein hochgestuftes Release-Ziel auswerten soll.",
  "mlops.manualRun.modelVersionOptional": "\nKeine bereitgestellte Modellversion target",
  "mlops.manualRun.submit": "\nManuelle Ausführung der Warteschlange",
  "mlops.manualRun.created":
    "\nDie manuelle ML-Ausführung wurde erfolgreich in die Warteschlange gestellt.",
  "mlops.summary.eyebrow": "\nBetriebsbeschreibung",
  "mlops.summary.title": "\nAktuelle MLOps-Haltung",
  "mlops.summary.description":
    "\nDieser Arbeitsbereich konsolidiert die Experimentausführung, die Bereitstellungsbereitschaft, die Aktualität der Upstream-Daten und den Automatisierungsdruck aus dem Live-Diagramm.",
  "mlops.workspace.control.title": "Control lane",
  "mlops.workspace.control.description":
    "Keep the release lane readable enough to judge single-owner intervention, shared review, and broader portfolio escalation without leaving the page.",
  "mlops.workspace.control.runs":
    "{active} active run(s) and {failed} failed run(s) are shaping the current release lane.",
  "mlops.workspace.control.registry":
    "{models} registry entry(ies) and {deployments} live deployment(s) currently anchor the promoted surface.",
  "mlops.workspace.control.dependencies":
    "{offline} offline source(s) and {monitored} monitored source(s) can still block promotion.",
  "mlops.workspace.control.reportPacks":
    "{ready} ready pack(s), {building} building pack(s), and {automations} automation run(s) keep downstream review moving.",
  "mlops.summary.datasets":
    "\n{live} live, {monitor} unter Beobachtung, {offline} Offline-Datensätze.",
  "mlops.summary.reportPacks":
    "\n{ready} bereit, {building} im Aufbau, {failed} fehlgeschlagene Berichtspakete.",
  "mlops.summary.automationRuns":
    "\n{count} Automatisierungsläufe befinden sich derzeit in der Warteschlange oder werden ausgeführt.",
  "mlops.summary.deployments": "\n{count} Bereitstellungen sind derzeit bereitgestellt oder aktiv.",
  "mlops.runQueue.title": "\nFühren Sie queue",
  "mlops.runQueue.description":
    " aus\nPriorisieren Sie die Modell- und Automatisierungsausführungen, die derzeit in der Warteschlange stehen, ausgeführt werden oder durch einen Fehler blockiert sind.",
  "mlops.runQueue.empty":
    "\nDerzeit erfordern keine aktiven oder fehlgeschlagenen Läufe Ihre Aufmerksamkeit.",
  "mlops.runQueue.table.item": "\nArtikel",
  "mlops.runQueue.table.type": "\nTyp",
  "mlops.runQueue.table.status": "\nStatus",
  "mlops.runQueue.table.updated": "\nAktualisiert",
  "mlops.runQueue.kind.ml": "\nML-Lauf",
  "mlops.runQueue.kind.automation": "\nAutomatisierung / {kind}",
  "mlops.runQueue.mlFallbackTitle": "\nNicht zugewiesener ML-Lauf",
  "mlops.experiments.title": "\nExperimente",
  "mlops.experiments.description":
    "\nÜberprüfen Sie die Versuchsziele, den aktuellen Status und die Laufabdeckung, bevor Sie neue Modellversionen bewerben.",
  "mlops.experiments.name": "\nName",
  "mlops.experiments.objective": "\nZiel",
  "mlops.experiments.status": "\nStatus",
  "mlops.experiments.runCount": "\nLäuft",
  "mlops.experiments.lastUpdated": "\nZuletzt aktualisiert",
  "mlops.experiments.empty": "\nEs sind noch keine ML-Experimente verbunden.",
  "mlops.registry.title": "\nModellregistrierung",
  "mlops.registry.description":
    "\nÜberprüfen Sie die Registrierungseinträge und die neueste Bereitstellungsphase, bevor Sie Versionen in die Produktion verschieben.",
  "mlops.registry.name": "\nModell",
  "mlops.registry.stage": "\nBühne",
  "mlops.registry.versions": "\nVersionen",
  "mlops.registry.empty": "\nEs sind noch keine Modellregistrierungseinträge verfügbar.",
  "mlops.deployments.title": "\nBereitstellungen",
  "mlops.deployments.description":
    "\nÜberprüfen Sie den Bereitstellungs-Footprint, den Promotion-Status und die neuesten Release-Zeitstempel aus dem Live-Modelldiagramm.",
  "mlops.deployments.model": "\nModell",
  "mlops.deployments.version": "\nVersion",
  "mlops.deployments.environment": "\nUmwelt",
  "mlops.deployments.status": "\nStatus",
  "mlops.deployments.deployedAt": "\nBereitgestellt",
  "mlops.deployments.empty": "\nEs sind noch keine Modellbereitstellungen aktiv.",
  "mlops.upstream.title": "\nUpstream-Abhängigkeiten",
  "mlops.upstream.description":
    "\nVerfolgen Sie die Aktualität von Datensätzen und den Erstellungsstatus des Berichtspakets, der die Modellbereitstellung und nachgelagerte Analyse blockieren kann.",
  "mlops.upstream.empty": "\nEs sind noch keine Upstream-Datensätze oder Berichtspakete verbunden.",
  "mlops.upstream.table.item": "\nArtikel",
  "mlops.upstream.table.kind": "\nArt",
  "mlops.upstream.table.status": "\nStatus",
  "mlops.upstream.table.updated": "\nAktualisiert",
  "mlops.upstream.kind.dataset": "\nDatensatz",
  "mlops.upstream.kind.pack": "\nBerichtspaket",
  "mlops.runStatus.QUEUED": "\nIn der Warteschlange",
  "mlops.runStatus.RUNNING": "\nLaufen",
  "mlops.runStatus.SUCCEEDED": "\nErfolgreich",
  "mlops.runStatus.FAILED": "\nFehlgeschlagen",
  "mlops.runStatus.CANCELED": "\nAbgesagt",
  "mlops.deploymentStatus.DRAFT": "\nEntwurf",
  "mlops.deploymentStatus.STAGED": "\nInszeniert",
  "mlops.deploymentStatus.ACTIVE": "\nAktiv",
  "mlops.deploymentStatus.ROLLED_BACK": "\nZurückgesetzt",
  "mlops.deploymentStatus.RETIRED": "\nIm Ruhestand",
  "mlops.datasetFreshness.LIVE": "\nLive",
  "mlops.datasetFreshness.MONITOR": "\nMonitor",
  "mlops.datasetFreshness.OFFLINE": "\nOffline",
  "mlops.reportPackState.DRAFT": "\nEntwurf",
  "mlops.reportPackState.BUILDING": "\nGebäude",
  "mlops.reportPackState.READY": "\nBereit",
  "mlops.reportPackState.FAILED": "\nFehlgeschlagen",
  "mlops.reportPackState.ARCHIVED": "\nArchiviert",
  "mlops.automationKind.DEVICE_COMMAND": "\nGerätebefehl",
  "mlops.automationKind.EDGE_RUNBOOK": "\nEdge-Runbook",
  "mlops.automationKind.WORKFLOW": "\nWorkflow",
  "mlops.automationKind.REPORT_PACK": "\nBerichtspaket",
  "mlops.automationKind.ML_PIPELINE": "\nML-Pipeline",
  "nav.training": "\nSchulung",
  "training.title": "\nTrainingsbereitschaft",
  "training.subtitle": "\nSchießstände, Sicherheitssysteme, Zielhaltung und operative Maßnahmen",
  "training.heroEyebrow": "\nTrainingsbetrieb",
  "training.coverage":
    "Nutzen Sie Live-Übungsressourcen, Aufzeichnungen zur Bereichskontrolle, Rückstandsdruck und Standortprobleme, um die Bereitschaft von einem SSR-Arbeitsbereich aus zu steigern.",
  "training.view.readiness": "\nBereitschaft",
  "training.view.controls": "\nSteuerelemente",
  "training.view.incidents": "\nVorfälle",
  "training.view.history": "\nGeschichte",
  "training.chatContext":
    "\nArbeitsbereich für Schulungsbereitschaft. {assets} Assets auf {sites} Standorten. {actions} offene Aktionen. {controls} Live-Bereichskontrollaufzeichnungen.",
  "training.stats.assets": "\nVerfolgte Vermögenswerte",
  "training.stats.assetsDescription":
    "\nTrainingsbereiche, Sicherheitssysteme und Zielausrüstung im Geltungsbereich.",
  "training.stats.readyAssets": "\nJetzt bereit",
  "training.stats.readyAssetsDescription":
    "\nVermögenswerte, die derzeit in Betrieb sind oder eher beeinträchtigt als eingeschränkt sind.",
  "training.stats.sites": "\nAbgedeckte Websites",
  "training.stats.sitesDescription": "\nWebsites mit Schulungsressourcen im Live-Diagramm.",
  "training.stats.actions": "\nOffene Aktionen",
  "training.stats.actionsDescription":
    "\nAufgaben, kritische Vorhersagen und aktive Support-Tickets, die weiterverfolgt werden müssen.",
  "training.stats.controls": "\nLive-Steuerung",
  "training.stats.controlsDescription":
    "\nAufzeichnungen zur Reichweitenkontrolle, die dem Ausbildungsstandort zur Verfügung stehen.",
  "training.actions.eyebrow": "\nVerbundene Arbeitsabläufe",
  "training.actions.title": "\nÜbergang von der Bereitschaft zur Ausführung",
  "training.actions.description":
    "\nÖffnen Sie die verbundenen Arbeitsbereiche, die bereits über Korrektur, Support und Berichterstellung für den Schulungsbereich verfügen.",
  "training.action.assets":
    "\nÜberprüfen Sie das Live-Asset-Register und die unterstützende Systemhierarchie.",
  "training.action.tasks":
    "\nVersandinspektionen, Reparaturen und Austauscharbeiten für Trainingssysteme.",
  "training.action.support":
    "\nÜberprüfen Sie Live-Site-Eskalationen und Support-Warteschlangen, die mit Schulungssites verknüpft sind.",
  "training.action.reports":
    "\nÖffnen Sie das Board-Ready-Ready-Pack, ohne die Shell zu verlassen.",
  "training.action.estate":
    "\nÖffnen Sie die Nachlasskontrollebene für verknüpfte Governance und Kontrollen.",
  "training.workspace.brief.title": "Operational handoff",
  "training.workspace.brief.description":
    "Judge readiness coverage, pending controls, and support pressure before moving through controls, incidents, or history.",
  "training.summary.eyebrow": "\nBereitschaftsbrief",
  "training.summary.title": "\nAktuelle Bereitschaftshaltung",
  "training.summary.description":
    "\nDieser Arbeitsbereich konsolidiert die Schulungsverfügbarkeit, die Kontrollaktivität und den Folgedruck aus dem Live-Betriebsdiagramm.",
  "training.summary.capabilities":
    "\n{ready} von {total} verfolgten Trainingsfunktionen sind derzeit verfügbar.",
  "training.summary.inspections":
    "\n{count} Überfällige Inspektionsaufgaben beeinträchtigen derzeit die Bereitschaft.",
  "training.summary.controls":
    "\n{count} Bereichskontrolldatensätze sind für eine erforderliche Aktion gekennzeichnet.",
  "training.summary.replacementQueue": "\n{count} Ersatzartikel bleiben in der Warteschlange.",
  "training.readiness.title": "\nTrainingsbereitschaftstafel",
  "training.readiness.description":
    "\nÜberprüfen Sie die Fähigkeitsabdeckung, den Inspektionsdruck und den Kontrollstatus, bevor Sie operative Arbeiten einleiten.",
  "training.readiness.empty": "\nEs sind noch keine Live-Schulungsressourcen verbunden.",
  "training.readiness.capabilities": "\nVerfolgte Funktionen",
  "training.readiness.capabilitiesDescription":
    "Fähigkeitsbezeichnungen, die derzeit Trainingsressourcen und -bereichen zugeordnet sind.",
  "training.readiness.readyCapabilities": "\nBereite Funktionen",
  "training.readiness.readyCapabilitiesDescription":
    "\nFunktionen ohne Site- oder Bedingungsblocker im Moment.",
  "training.readiness.watchCapabilities": "\nFunktionen ansehen",
  "training.readiness.watchCapabilitiesDescription":
    "\nKapazitäten werden derzeit aufgrund von Beeinträchtigungen oder Standortdruck überwacht.",
  "training.readiness.overdueInspections": "\nÜberfällige Inspektionen",
  "training.readiness.overdueInspectionsDescription":
    "\nInspektionsarbeiten, die die Schulungsverfügbarkeit direkt reduzieren können.",
  "training.readiness.alertTitle": "\nBetriebskontrollhaltung",
  "training.readiness.alertDescription":
    "\n{actionRequired} Kontrolldatensätze erfordern Maßnahmen, {replacementQueue} Ersatzartikel bleiben in der Warteschlange und {labourHours} Arbeitskräfte wurden für die Bereitschaftsarbeiten protokolliert.",
  "training.siteFocus.title": "\nSite-Fokus",
  "training.siteFocus.subtitle":
    "\nPriorisieren Sie die Standorte, an denen eingeschränkte Ressourcen, Rückstände oder Live-Tickets die Schulungsdurchführung unterbrechen können.",
  "training.siteFocus.empty": "\nEs sind noch keine Schulungsseiten verfügbar.",
  "training.siteFocus.itemDescription":
    "\n{assets} Assets, {constrained} eingeschränkt, {tasks} offene Aufgaben, {predictions} kritische Vorhersagen, {tickets} Live-Tickets.",
  "training.attentionAssets.title": "\nAchtung Assets",
  "training.attentionAssets.subtitle":
    "\nÜberprüfen Sie die Assets, die dem größten Bereitschaftsdruck ausgesetzt sind, bevor Probleme in die Lieferung übergehen.",
  "training.attentionAssets.empty":
    "\nDerzeit ist für keine Schulungsressourcen eine Eskalation erforderlich.",
  "training.attentionAssets.itemDescription":
    "\n{site} / {type} / {condition} / Letzte Inspektion: {lastInspection} / {signals} Live-Signale.",
  "training.attentionAssets.lastInspectionNone": "\nNicht aufgezeichnet",
  "training.actionQueue.title": "\nAktionswarteschlange",
  "training.actionQueue.description":
    "\nIn dieser Warteschlange werden überfällige Arbeiten, kritische Vorhersagen und Live-Support-Probleme im Zusammenhang mit Schulungsstandorten angezeigt.",
  "training.actionQueue.empty":
    "\nDerzeit ist für keine Schulungsmaßnahme eine Eskalation erforderlich.",
  "training.actionQueue.kind.task": "\nAufgabe",
  "training.actionQueue.kind.prediction": "\nVorhersage",
  "training.actionQueue.kind.support": "\nSupport",
  "training.actionQueue.taskDescription": "\n{status} / {site} / Fällig {deadline}.",
  "training.actionQueue.predictionDescription":
    "\n{severity} / {site} / {remainingLife} Tage verbleibende Lebensdauer.",
  "training.actionQueue.supportDescription": "\n{status} / {site} / {priority} Priorität.",
  "training.rangeControls.title": "\nAktuelle Bereichskontrollen",
  "training.rangeControls.description":
    "\nVerwenden Sie die neuesten Sortimentskontrollaufzeichnungen, um den Betriebs- und Compliance-Status zu bestätigen.",
  "training.rangeControls.empty": "\nEs sind noch keine Reichweitenkontrolldatensätze verfügbar.",
  "training.rangeControls.table.record": "\nRecord",
  "training.rangeControls.table.location": "\nStandort",
  "training.rangeControls.table.signal": "\nSignal",
  "training.rangeControls.table.updated": "\nAktualisiert",
  "training.rangeControls.signalSummary":
    "Status {status} / Betrieb {operational} / Konformität {compliance}",
  "training.quickLog.title": "\nProtokollbereichskontrolle",
  "training.quickLog.description":
    "\nErfassen Sie die neuesten Betriebs- oder Compliance-Kontrollen, ohne den Bereitschaftsarbeitsbereich zu verlassen.",
  "training.quickLog.databaseRequired":
    "\nEine konfigurierte Datenbank ist erforderlich, bevor Aktualisierungen der Trainingssteuerung protokolliert werden können.",
  "training.quickLog.empty":
    "\nFür die Kontrollprotokollierung sind noch keine Schulungsstandorte verfügbar.",
  "training.quickLog.emptyDescription":
    "Bringen Sie zunächst Schulungsressourcen in den Geltungsbereich, damit Kontrollaktualisierungen an die richtige Standort- oder Bereichsanlage angehängt werden können.",
  "training.quickLog.assetOptional": "\nNur Kontrolle auf Site-Ebene",
  "training.quickLog.helper":
    "\nZeichnen Sie hier die aktuelle Kontrollhaltung auf und lassen Sie dann den Live-Arbeitsbereich das Bereitschaftsbild um ihn herum aktualisieren.",
  "training.quickLog.submit": "\nAktualisierung der Protokollsteuerung",
  "training.quickLog.submitAria": "\nAktualisierung der Protokolltrainingsbereichssteuerung",
  "training.quickLog.feedback.saved":
    "\nAktualisierung der Trainingssteuerung erfolgreich protokolliert.",
  "notifications.title": "\nBenachrichtigungen",
  "notifications.bell": "\nOffene Benachrichtigungen",
  "notifications.empty": "\nAlles klar",
  "notifications.emptyDescription": "\nIm Moment keine neuen Benachrichtigungen.",
  "notifications.unread": "\nUngelesen",
  "notifications.markRead": "\nAls gelesen markieren",
  "notifications.dismiss": "\nEntlassen",
  "chat.workspace.systemEvent": "\nSystem",
  "chat.workspace.toolResult": "\nWerkzeug",
  "chat.workspace.handoffNote": "\nÜbergabe",
  "chat.workspace.delivered": "\nGeliefert",
  "chat.workspace.unreadCount": "\n{count} ungelesen",
  "admin.integrationHealth.title": "\nIntegration Gesundheit",
  "admin.integrationHealth.subtitle": "\nStatus über verbundene Systeme hinweg synchronisieren",
  "admin.integrationHealth.syncsTotal": "\nGesamtsynchronisierungen",
  "admin.integrationHealth.syncsFailed": "\nFehlgeschlagen",
  "admin.integrationHealth.syncsSuccess": "\nErfolgreich",
  "admin.integrationHealth.lastSync": "\nLetzte Synchronisierung",
  "admin.auditTimeline.title": "\nAudit-Protokoll",
  "admin.auditTimeline.subtitle": "\nAktuelle Systemereignisse und Statusänderungen",
  "admin.iotCommands.title": "\nIoT-Befehlslebenszyklus",
  "admin.iotCommands.subtitle": "\nZustellungs- und Bestätigungsstatus des Gerätebefehls",
  "admin.iotCommands.queued": "\nIn der Warteschlange",
  "admin.iotCommands.delivered": "\nGeliefert",
  "admin.iotCommands.acknowledged": "\nBestätigt",
  "admin.iotCommands.completed": "\nAbgeschlossen",
  "admin.iotCommands.failed": "\nFehlgeschlagen",
  "admin.portalMembership.title": "\nPortalmitgliedschaft",
  "admin.portalMembership.subtitle": "\nPartnerzugang und Einladungsverwaltung",
  "admin.portalMembership.email": "\nE-Mail",
  "admin.portalMembership.role": "\nRolle",
  "admin.portalMembership.status": "\nStatus",
  "admin.portalMembership.invited": "\nEingeladen",
  "admin.portalMembership.active": "\nAktiv",
  "admin.portalMembership.pending": "\nAusstehend",
  "fleet.stats.vehicles": "\nFahrzeuge",
  "fleet.stats.activeOps": "\nAktive Operationen",
  "fleet.stats.initiatives": "\nInitiativen",
  "fleet.accordion.operations": "\nZusammenfassung der Vorgänge",
  "fleet.accordion.regional": "\nRegionaler Vergleich",
  "fleet.accordion.focus": "\nVerbesserungsfokus",
  "buildings.stats.total": "\nGebäude",
  "buildings.stats.initiatives": "\nInitiativen",
  "buildings.stats.contracts": "\nVertragsmaßnahmen",
  "buildings.accordion.performance": "\nLeistungsvergleich",
  "buildings.accordion.initiatives": "\nFortschritt der Initiative",
  "sensors.stats.total": "\nSensoren",
  "sensors.stats.activeAlerts": "\nAktive Warnungen",
  "sensors.stats.alertRules": "\nWarnungsregeln",
  "sensors.health.title": "\nSensorzustand",
  "predictions.stats.total": "\nVorhersagen",
  "predictions.stats.critical": "\nKritisch",
  "predictions.stats.avgConfidence": "\nDurchschnittliches Vertrauen",
  "predictions.timeline.title": "\nKommende Vorhersagen",
  "predictions.timeline.subtitle": "\nVorhersagen sortiert nach erwartetem Datum",
  "predictions.filter.all": "\nAlle",
  "predictions.filter.critical": "\nKritisch",
  "predictions.filter.high": "\nHoch",
  "predictions.filter.medium": "\nMittel",
  "predictions.filter.low": "\nNiedrig",
  "digitalTwin.hotspot.title": "\nHotspot-Detail",
  "digitalTwin.hotspot.created": "\nHotspot „{title}“ erstellt.",
  "digitalTwin.hotspot.deleted": "\nHotspot entfernt.",
  "digitalTwin.hotspots.noTwinAvailable":
    "\nEs ist kein digitaler Zwilling konfiguriert. Erstellen Sie zuerst einen Zwilling für eine Site.",
  "digitalTwin.overlay.sensors": "\nSensorüberlagerung",
  "digitalTwin.overlay.status": "\nGerätestatus",
  "financePlanning.compare.title": "\nSzenariovergleich",
  "financePlanning.compare.subtitle": "\nParallele Projektionsanalyse",
  "financePlanning.compare.scenarioA": "\nSzenario A",
  "financePlanning.compare.scenarioB": "\nSzenario B",
  "financePlanning.compare.delta": "\nDelta",
  "financePlanning.compare.select": "\nSzenarien auswählen",
  "estate.governance.title": "\nGovernance",
  "estate.governance.agreements": "\nVereinbarungen",
  "estate.governance.fmControls": "\nFM-Steuerung",
  "estate.governance.stewardship": "\nVerwaltung",
  "estate.governance.rangeControls": "\nBereichskontrollen",
  "estate.tabs.overview": "\nÜbersicht",
  "estate.tabs.governance": "\nZulassungen",
  "estate.tabs.assurance": "\nVermögenswerte und Sicherheit",
  "estate.tabs.readiness": "\nBereitschaft",
  "estate.tabs.partnerships": "\nVerträge und Integrationen",
  "analytics.title": "\nAnalytics",
  "analytics.subtitle": "\nDatensatzverwaltung und Metrikdefinitionen",
  "analytics.datasets.name": "\nDatensatz",
  "analytics.datasets.freshness": "\nFrische",
  "analytics.datasets.metrics": "\nMetriken",
  "analytics.datasets.empty": "\nKeine Datensätze konfiguriert",
  "analytics.datasets.emptyCta":
    "\nKonfigurieren Sie Ihren ersten Analysedatensatz, um mit der Verfolgung von Metriken zu beginnen.",
  "portal.members.title": "\nMitglieder",
  "portal.members.subtitle": "\nPartnerzugang und Einladungsverwaltung",
  "portal.members.invite": "\nMitglied einladen",
  "portal.members.email": "\nE-Mail",
  "portal.members.role": "\nRolle",
  "portal.members.status": "\nStatus",
  "portal.members.status.active": "\nAktiv",
  "portal.members.status.pending": "\nAusstehend",
  "portal.members.status.expired": "\nAbgelaufen",
  "portal.members.stage.invited": "\nEingeladen",
  "portal.members.stage.accepted": "\nAngenommen",
  "portal.members.stage.active": "\nAktiv",
  "portal.members.empty": "\nNoch keine Mitglieder",
  "portal.members.emptyCta": "\nLaden Sie Ihren ersten Partner zum Portal ein.",
  "portal.members.searchPlaceholder": "\nMitglieder suchen…",
  "portal.members.searchLabel": "\nPortalmitglieder suchen",
  "portal.members.filter.allStatuses": "\nAlle Status",
  "portal.members.filter.allParties": "\nAlle Parteien",
  "onboarding.title": "\nErste Schritte",
  "onboarding.subtitle": "\nFühren Sie diese Schritte aus, um Ihren Arbeitsbereich einzurichten",
  "onboarding.step.registerAsset": "\nRegistrieren Sie das erste Asset",
  "onboarding.step.configureIntegrations": "\nIntegrationen konfigurieren",
  "onboarding.step.inviteTeam": "\nTeammitglieder einladen",
  "onboarding.step.setupAutomation": "\nErste Automatisierung einrichten",
  "onboarding.step.generateReport": "\nErstelle ersten Bericht",
  "onboarding.dismiss": "\nAnleitung schließen",
  "customisation.dashboard.title": "\nDashboard-Widgets",
  "customisation.dashboard.subtitle":
    "\nWählen Sie aus, welche Abschnitte auf Ihrem Dashboard angezeigt werden",
  "customisation.dashboard.kpiWidgets": "\nKPI-Widgets",
  "customisation.dashboard.activityFeed": "\nAktivitätsfeed",
  "customisation.dashboard.quickActions": "Schnelle Aktionen",
  "customisation.dashboardPreset.title": "\nDashboard-Voreinstellungen",
  "customisation.dashboardPreset.commandCenter": "\nKommandozentrale",
  "customisation.dashboardPreset.commandCenterDescription":
    "\nZeigen Sie KPI-Widgets, den Aktivitätsfeed und schnelle Aktionen zusammen an.",
  "customisation.dashboardPreset.shiftFocus": "\nFokus verschieben",
  "customisation.dashboardPreset.shiftFocusDescription":
    "\nHalten Sie KPI-Widgets und Schnellaktionen sichtbar, während Sie den Aktivitäts-Feed stummschalten.",
  "customisation.dashboardPreset.quiet": "\nRuhiges Brett",
  "customisation.dashboardPreset.quietDescription":
    "\nReduzieren Sie das Dashboard auf KPI-Widgets für eine geräuscharme tägliche Landingpage.",
  "customisation.dashboardPreset.custom": "\nBenutzerdefiniertes Layout",
  "customisation.dashboardPreset.customDescription":
    "\nDie aktuellen Dashboard-Einstellungen stimmen nicht mit einer der integrierten Voreinstellungen überein.",
  "customisation.dashboardPreset.subtitle":
    "\nWählen Sie die Armaturenbretthaltung, die am besten zu Ihrem aktuellen Arbeitsrhythmus passt.",
  "nav.supportTickets": "\nSupport-Tickets",
  "supportTickets.title": "\nSupport-Tickets",
  "supportTickets.subtitle": "\nSupportanfragen verfolgen und verwalten",
  "supportTickets.status.OPEN": "\nÖffnen",
  "supportTickets.status.IN_PROGRESS": "\nIn Bearbeitung",
  "supportTickets.status.AWAITING_CUSTOMER": "\nWarten auf den Kunden",
  "supportTickets.status.RESOLVED": "\nGelöst",
  "supportTickets.status.CLOSED": "\nGeschlossen",
  "supportTickets.priority.LOW": "\nNiedrig",
  "supportTickets.priority.MEDIUM": "\nMittel",
  "supportTickets.priority.HIGH": "\nHoch",
  "supportTickets.priority.URGENT": "\nDringend",
  "supportTickets.category.GENERAL_INQUIRY": "\nAllgemeine Anfrage",
  "supportTickets.category.TECHNICAL_ISSUE": "\nTechnisches Problem",
  "supportTickets.category.BILLING": "\nAbrechnung",
  "supportTickets.category.FEATURE_REQUEST": "\nFunktionsanfrage",
  "supportTickets.category.BUG_REPORT": "\nFehlerbericht",
  "supportTickets.category.ACCOUNT_ACCESS": "\nKontozugriff",
  "supportTickets.category.INTEGRATION": "\nIntegration",
  "supportTickets.category.OTHER": "\nAndere",
  "supportTickets.stats.total": "\nGesamtzahl der Tickets",
  "supportTickets.stats.breached": "Breached",
  "supportTickets.stats.open": "\nÖffnen",
  "supportTickets.stats.inProgress": "\nIn Bearbeitung",
  "supportTickets.stats.resolved": "\nGelöst",
  "supportTickets.tab.all": "\nAlle Tickets",
  "supportTickets.tab.open": "\nÖffnen",
  "supportTickets.tab.inProgress": "\nIn Bearbeitung",
  "supportTickets.tab.resolved": "\nGelöst",
  "supportTickets.tab.closed": "\nGeschlossen",
  "supportTickets.table.ticketNumber": "\nTicket #",
  "supportTickets.table.subject": "\nBetreff",
  "supportTickets.table.status": "\nStatus",
  "supportTickets.table.priority": "\nPriorität",
  "supportTickets.table.category": "\nKategorie",
  "supportTickets.table.assignedTo": "\nZugewiesen an",
  "supportTickets.table.createdAt": "\nErstellt",
  "supportTickets.table.updatedAt": "\nAktualisiert",
  "supportTickets.table.ariaLabel": "\nListe der Support-Tickets",
  "supportTickets.searchPlaceholder": "\nTickets suchen…",
  "supportTickets.searchLabel": "\nSupport-Tickets suchen",
  "supportTickets.empty": "\nKeine Support-Tickets gefunden.",
  "supportTickets.emptyCta": "\nErstellen Sie ein neues Ticket, um loszulegen.",
  "supportTickets.workspace.listTitle": "Ticket inbox",
  "supportTickets.workspace.listDescription":
    "Review the queue, then open a ticket to continue triage, replies, and status changes in the workbench.",
  "supportTickets.workspace.listEmptyDescription":
    "This queue is clear. Adjust filters or create a new ticket to start the next response thread.",
  "supportTickets.create.title": "\nNeues Support-Ticket",
  "supportTickets.create.subject": "\nBetreff",
  "supportTickets.create.subjectPlaceholder": "\nKurze Beschreibung des Problems",
  "supportTickets.create.description": "\nBeschreibung",
  "supportTickets.create.descriptionPlaceholder": "\nGeben Sie Details zum Problem an",
  "supportTickets.create.priority": "\nPriorität",
  "supportTickets.create.category": "\nKategorie",
  "supportTickets.create.site": "\nSite",
  "supportTickets.create.sitePlaceholder": "\nWählen Sie eine Site aus",
  "supportTickets.create.submit": "\nTicket erstellen",
  "supportTickets.create.submitting": "\nErstellen…",
  "supportTickets.create.success": "\nTicket {ticketNumber} erfolgreich erstellt.",
  "supportTickets.create.error": "\nTicket konnte nicht erstellt werden: {message}",
  "supportTickets.detail.title": "\nTicketdetails",
  "supportTickets.detail.statusLabel": "\nStatus",
  "supportTickets.detail.priorityLabel": "\nPriorität",
  "supportTickets.detail.categoryLabel": "\nKategorie",
  "supportTickets.detail.assigneeLabel": "\nBeauftragter",
  "supportTickets.detail.siteLabel": "\nSite",
  "supportTickets.detail.createdLabel": "\nErstellt",
  "supportTickets.detail.updatedLabel": "\nZuletzt aktualisiert",
  "supportTickets.detail.resolvedLabel": "\nGelöst",
  "supportTickets.detail.closedLabel": "\nGeschlossen",
  "supportTickets.detail.unassigned": "\nNicht zugewiesen",
  "supportTickets.detail.noSite": "\nKeine Website",
  "supportTickets.detail.selectPromptTitle": "\nWählen Sie ein Ticket",
  "supportTickets.detail.selectPromptDescription":
    "\nWählen Sie ein Support-Ticket, um Nachrichten zu überprüfen, den Status zu aktualisieren und Antworten zu senden.",
  "supportTickets.detail.selectGuideMessages":
    "Read the full conversation and internal notes before drafting the next reply.",
  "supportTickets.detail.selectGuideActions":
    "Promote the next status, request evidence, or hand the ticket to the next owner without leaving the workbench.",
  "supportTickets.detail.selectGuideCloseout":
    "Keep timestamps, site context, and final updates visible for an audit-ready closeout.",
  "supportTickets.detail.messages": "\nNachrichten",
  "supportTickets.detail.messagesEmpty": "\nNoch keine Nachrichten.",
  "supportTickets.detail.addMessage": "\nAntwort hinzufügen",
  "supportTickets.detail.messagePlaceholder": "\nGeben Sie Ihre Antwort ein…",
  "supportTickets.detail.sendMessage": "\nSenden",
  "supportTickets.detail.internalNote": "\nInterne Notiz",
  "supportTickets.detail.updateStatus": "\nAktualisierungsstatus",
  "supportTickets.detail.close": "\nTicket",
  "supportTickets.detail.reopen": " schließen\nTicket erneut öffnen",
  "supportTickets.filter.status": "\nStatus",
  "supportTickets.filter.priority": "\nPriorität",
  "supportTickets.filter.category": "\nKategorie",
  "supportTickets.filter.site": "\nSite",
  "supportTickets.filter.allStatuses": "\nAlle Status",
  "supportTickets.filter.allPriorities": "\nAlle Prioritäten",
  "supportTickets.filter.allCategories": "\nAlle Kategorien",
  "supportTickets.filter.allSites": "\nAlle Websites",
  "supportTickets.validation.subjectRequired": "\nBetreff ist erforderlich.",
  "supportTickets.validation.descriptionRequired": "\nBeschreibung ist erforderlich.",
  "supportTickets.message.sent": "\nAntwort gesendet.",
  "supportTickets.message.error": "\nAntwort konnte nicht gesendet werden: {message}",
  "supportTickets.statusUpdate.success": "\nTicketstatus aktualisiert.",
  "supportTickets.statusUpdate.error": "\nStatus konnte nicht aktualisiert werden: {message}",
  "chat.workspace.threadPanelTitle": "\nThread",
  "common.emptySearchTitle": "\nKeine Ergebnisse gefunden",
  "common.emptySearchDescription": "\nVersuchen Sie, Ihre Such- oder Filterkriterien anzupassen.",
  "common.pagination.summary": "\nZeigt {from}–{to} von {total}",
  "documentDetail.breadcrumb.navAria": "\nBrotkrumennavigation",
  "documentDetail.title": "\nDokumentdetail",
  "documentDetail.loading": "\nDokument wird geladen…",
  "documentDetail.error.title": "\nFehler beim Laden von document",
  "documentDetail.error.description":
    "\nDas Dokument konnte nicht geladen werden. Bitte versuchen Sie es erneut.",
  "documentDetail.field.title": "\nTitel",
  "documentDetail.field.customer": "\nKunde",
  "documentDetail.field.customerEmail": "\nKunden-E-Mail",
  "documentDetail.field.customerOrder": "\nKundenauftrag",
  "documentDetail.field.createdOrder": "\nErstellt order",
  "documentDetail.field.site": "\nSite",
  "documentDetail.field.dueDate": "\nFälligkeitsdatum",
  "documentDetail.field.requestedAt": "\nAngefordert unter",
  "documentDetail.field.requestedBy": "\nAngefordert von",
  "documentDetail.field.requestedDeliveryAt": "\nAngeforderte Lieferung",
  "documentDetail.field.totalAmount": "\nGesamtbetrag",
  "documentDetail.field.budget": "\nBudget",
  "documentDetail.field.approvedBy": "\nGenehmigt von",
  "documentDetail.field.assignee": "\nBeauftragter",
  "documentDetail.field.estimatedCloseAt": "\nGeschätzter Abschluss",
  "documentDetail.field.issuedAt": "\nAusgestellt am",
  "documentDetail.field.paidAt": "\nBezahlt bei",
  "documentDetail.field.paymentTerm": "\nZahlungsbedingung",
  "documentDetail.field.labourCost": "\nArbeitskosten",
  "documentDetail.field.materialCost": "\nMaterialkosten",
  "documentDetail.field.outstandingAmount": "\nAusstehender Betrag",
  "documentDetail.field.receipts": "\nQuittungen",
  "documentDetail.field.discrepancy": "\nDiskrepanz",
  "documentDetail.field.dispatchWindow": "\nVersandfenster",
  "documentDetail.field.sla": "Servicelevel",
  "documentDetail.field.signoff": "\nAbmeldung",
  "documentDetail.field.scheduleWindow": "Zeitplanfenster",
  "documentDetail.field.sourceRfq": "\nQuelle RFQ",
  "documentDetail.field.updatedAt": "\nAktualisiert am",
  "documentDetail.field.vendor": "\nAnbieter",
  "documentDetail.field.vendorReference": "\nLieferantenreferenz",
  "documentDetail.field.workOrder": "\nArbeitsauftrag",
  "documentDetail.section.overviewTitle": "\nÜbersicht",
  "documentDetail.section.overviewDescription": "\nWichtige Details zu diesem Dokument.",
  "documentDetail.section.lineItemsTitle": "\nWerbebuchungen",
  "documentDetail.section.lineItemsDescription": "\nIn diesem Dokument enthaltene Elemente.",
  "documentDetail.section.relatedTitle": "\nVerwandte Dokumente",
  "documentDetail.section.relatedDescription": "\nMit diesem Datensatz verknüpfte Dokumente.",
  "documentDetail.table.description": "\nBeschreibung",
  "documentDetail.table.quantity": "\nMenge",
  "documentDetail.table.amount": "\nBetrag",
  "documentDetail.table.total": "\nGesamt",
  "documentDetail.empty.lineItems": "\nKeine Werbebuchungen.",
  "documentDetail.empty.related": "\nKeine zugehörigen Dokumente.",
  "documentDetail.empty.timeline": "\nKeine Timeline-Einträge.",
  "documentWorkflow.feedback.updated": "\nWorkflow-Status aktualisiert.",
  "documentWorkflow.feedback.invalidAction": "\nUngültige Workflow-Aktion.",
  "estate.focus.title": "\nNachlassfokus",
  "estate.integration.title": "\nIntegrationen",
  "estate.integration.coverageLabel": "\n{configured} von {total} Integrationen sind konfiguriert.",
  "mlops.summary.experiments": "\nExperimente",
  "mlops.summary.registry": "\nModellregistrierung",
  "portal.invite.title": "\nPortaleinladung",
  "portal.invite.subtitle": "\nSie wurden eingeladen, dem Portal beizutreten.",
  "portal.invite.accept": "\nEinladung annehmen",
  "portal.invite.email": "\nE-Mail",
  "portal.invite.party": "\nOrganisation",
  "portal.invite.expires": "\nLäuft ab",
  "portal.invite.metadata": "\nEinladungsdetails",
  "portal.invite.accessTitle": "\nVorschau des Partnerzugriffs",
  "portal.invite.accessDescription":
    "\nSehen Sie sich die eingeladene Organisation in der Vorschau an, bestätigen Sie das Empfängerkonto und behalten Sie den Annahmepfad auf demselben sicheren Bildschirm bei.",
  "portal.invite.openPortal": "\nPortal öffnen",
  "portal.invite.signIn": "\nAnmelden",
  "portal.invite.signOut": "\nAbmelden",
  "portal.invite.signedInAs": "\nAngemeldet als {email}",
  "portal.invite.checklist.scopeTitle": "\nBewerten Sie die eingeladene Organisation",
  "portal.invite.checklist.scopeDescription":
    "\nDiese Einladung gewährt nur der aufgeführten Organisation eingeschränkten Zugriff auf die freigegebene Portaloberfläche.",
  "portal.invite.checklist.expiryTitle": "\nAkzeptieren Sie, bevor die Einladung abläuft",
  "portal.invite.checklist.expiryDescription":
    "\nVerwenden Sie vor dem Ablaufdatum denselben Einladungspfad, damit die Annahme mit der ursprünglichen Anfrage verbunden bleibt.",
  "portal.invite.checklist.supportTitle": "\nBenutze das eingeladene Konto oder wechsle sauber",
  "portal.invite.checklist.supportDescription":
    "\nMelden Sie sich mit der eingeladenen E-Mail-Adresse an, um fortzufahren. Wenn der Zugriff immer noch fehlschlägt, versuchen Sie es erneut mit dieser Einladung, anstatt einen separaten Portalpfad zu öffnen.",
  "portal.invite.checklist.switchAccountDescription":
    "\nWenn Sie mit der falschen E-Mail-Adresse angemeldet sind, melden Sie sich zuerst ab und kehren Sie zu dieser Einladung zurück, damit die Berechtigung erhalten bleibt.",
  "portal.invite.error.expired": "\nDiese Einladung ist abgelaufen.",
  "portal.invite.error.invalid": "\nDiese Einladung ist ungültig.",
  "portal.invite.error.unauthenticated":
    "\nBitte melden Sie sich an, um diese Einladung anzunehmen.",
  "portal.invite.error.emailMismatch":
    "\nDiese Einladung wurde an eine andere E-Mail-Adresse gesendet.",
  "portal.members.access.invite": "\nMitglied einladen",
  "portal.members.access.pendingAcceptance": "\nAusstehende Annahme",
  "portal.members.access.membership": "\nMitgliedschaft",
  "portal.members.rolePending": "\nAusstehend",
  "portal.members.error.alreadyMember": "\nDieser Benutzer ist bereits Mitglied.",
  "portal.members.error.invalidInput":
    "\nBitte überprüfen Sie das Formular und versuchen Sie es erneut.",
  "portal.members.error.partyNotFound": "\nOrganisation nicht gefunden.",
  "portal.members.error.notFound": "\nDas ausgewählte Mitglied konnte nicht gefunden werden.",
  "portal.members.error.invalidRole": "\nWählen Sie eine gültige Portalrolle.",
  "portal.members.error.roleUnavailable":
    "\nRollenänderungen sind nur für aktive Mitgliedschaften verfügbar.",
  "portal.members.roleChange": "\nRollenwechsel",
  "portal.members.updateRole": "\nRolle",
  "portal.members.revoke": " aktualisieren\nZugriff widerrufen",
  "portal.members.revokeDescription":
    "\nWiderrufen Sie die ausgewählte Einladung oder Mitgliedschaft, ohne den aktuellen Arbeitsbereichskontext zu verlassen.",
  "portal.members.unavailable.title": "\nPortalmitglieder nicht verfügbar",
  "portal.members.unavailable.description":
    "\nDer Mitgliederarbeitsbereich ist nicht verfügbar, solange die Datenbank offline ist. Filter, Einladungen und Mitgliederaktionen sind deaktiviert, bis die Verbindung wiederhergestellt ist.",
  "portal.members.history.title": "\nZugriffshistorie",
  "portal.members.history.invitedTitle": "\nEinladung ausgestellt",
  "portal.members.history.invitedDescription": "Der Erstzugang wurde am {date}.",
  "portal.members.history.inviteAccessTitle": " vorbereitet\nStatus des Einladungszugriffs",
  "portal.members.history.membershipAccessTitle": "\nStatus des Mitgliedschaftszugriffs",
  "portal.members.history.accessDescription": "\nAktueller Zugriffsstatus: {state}.",
  "portal.members.history.systemActor": "\nSystemworkflow",
  "portal.members.history.acceptedTitle": "\nEinladung angenommen",
  "portal.members.history.acceptedDescription":
    "\n{actor} nahm die Portaleinladung an und fuhr mit dem Partnerarbeitsbereich fort.",
  "portal.members.history.activatedTitle": "\nMitgliedschaft aktiviert",
  "portal.members.history.activatedDescription":
    "\n{actor} hat die Workspace-Mitgliedschaft für diesen Partykontakt aktiviert.",
  "portal.members.history.roleUpdatedTitle": "\nRolle aktualisiert",
  "portal.members.history.roleUpdatedDescription":
    "\n{actor} hat die Rolle von {previousRole} in {nextRole} geändert.",
  "portal.members.history.revokedTitle": "\nZugriff widerrufen",
  "portal.members.history.revokedDescription":
    "\n{actor} hat diesen Zugriff vom Portal widerrufen.",
  "portal.members.history.summaryTitle": "\nGovernance-Zusammenfassung",
  "portal.members.history.summaryDescription":
    "\nHalten Sie die Ausstellung von Einladungen, Rollenänderungen, Widerrufen und das neueste Governance-Ereignis sichtbar, während Sie den Zugriff verwalten.",
  "portal.members.history.trackedChangesLabel": "\nVerfolgte Einträge",
  "portal.members.history.roleChangeCountLabel": "\nRollenänderungen",
  "portal.members.history.revokeCountLabel": "\nWiderrufe",
  "portal.members.history.latestEventLabel": "\nNeuestes Governance-Ereignis",
  "portal.members.history.latestEventFallback": "\nWarten auf das nächste Governance-Update",
  "portal.members.reissue": "\nEinladung erneut ausstellen",
  "portal.members.alert.inviteSuccess": "\nEinladung vorbereitet für {email} in {party}.",
  "portal.members.alert.reissueSuccess": "\nEinladung für {email} in {party}.",
  "portal.members.alert.roleSuccess": " neu ausgestellt\nRolle für {email} in {party}.",
  "portal.members.alert.revokeSuccess": " aktualisiert\nZugriff für {email} in {party}.",
  "portal.nav.collaboration": " widerrufen\nZusammenarbeit",
  "portal.nav.documents": "\nDokumente",
  "portal.nav.members": "\nMitglieder",
  "reports.activePackage.title": "\nAktives Paket",
  "reports.datasets.title": "\nDatensätze",
  "reports.schedule.title": "\nGeplante Lieferung",
  "reports.schedule.description":
    "\nKonfigurieren Sie die automatische Berichtszustellung per E-Mail nach einem wiederkehrenden Zeitplan.",
  "reports.schedule.frequency": "\nHäufigkeit",
  "reports.schedule.daily": "\nTäglich",
  "reports.schedule.weekly": "\nWöchentlich",
  "reports.schedule.monthly": "\nMonatlich",
  "reports.schedule.deliveryChannel": "\nLieferkanal",
  "reports.schedule.email": "\nE-Mail",
  "reports.schedule.webhook": "\nWebhook",
  "reports.schedule.recipientsLabel": "\nEmpfänger",
  "reports.schedule.recipientsPlaceholder": "\nGeben Sie E-Mail-Adressen durch Kommas getrennt ein",
  "reports.schedule.timezoneLabel": "\nZeitzone",
  "reports.schedule.save": "\nZeitplan speichern",
  "reports.schedule.disable": "\nZeitplan deaktivieren",
  "reports.schedule.nextDelivery": "\nNächste Lieferung",
  "reports.schedule.lastDelivery": "\nLetzte Lieferung",
  "reports.schedule.active": "\nAktiv",
  "reports.schedule.inactive": "\nInaktiv",
  "reports.schedule.created": "\nZeitplan erfolgreich erstellt.",
  "reports.schedule.updated": "\nZeitplan erfolgreich aktualisiert.",
  "reports.schedule.empty": "\nKeine Lieferpläne konfiguriert.",
  "reports.schedule.emptyAction":
    "\nFügen Sie einen Zeitplan hinzu, um diesen Bericht automatisch bereitzustellen.",
  "reports.sharing.title": "\nFreigabe und Berechtigungen",
  "reports.sharing.description": "\nSteuern Sie, wer diesen Bericht anzeigen oder bearbeiten kann.",
  "reports.sharing.addUser": "\nBenutzer hinzufügen",
  "reports.sharing.addRole": "\nRolle hinzufügen",
  "reports.sharing.permissionView": "\nAnzeigen",
  "reports.sharing.permissionEdit": "\nBearbeiten",
  "reports.sharing.permissionAdmin": "\nAdmin",
  "reports.sharing.remove": "\nRemove",
  "reports.sharing.userLabel": "\nBenutzer",
  "reports.sharing.userPlaceholder": "\nWählen Sie einen Benutzer aus",
  "reports.sharing.permissionLabel": "\nErlaubnis",
  "reports.sharing.save": "\nBericht teilen",
  "reports.sharing.empty": "\nDieser Bericht wurde mit niemandem geteilt.",
  "reports.sharing.emptyAction": "\nTeilen Sie diesen Bericht mit Teammitgliedern.",
  "reports.sharing.shared": "\nBericht erfolgreich geteilt.",
  "reports.sharing.removed": "\nZugriff erfolgreich entfernt.",
  "reports.export.title": "\nBericht exportieren",
  "reports.export.pdf": " exportieren\nPDF",
  "reports.export.csv": "\nCSV",
  "reports.export.excel": "\nExcel",
  "reports.export.arrow": "\nArrow",
  "reports.export.parquet": "\nParquet",
  "reports.export.generating": " exportieren\nExport wird generiert...",
  "reports.export.download": "\nHerunterladen",
  "reports.export.error": "\nDer Export ist fehlgeschlagen. Bitte versuchen Sie es erneut.",
  "reports.dateRange.custom": "\nBenutzerdefinierter Datumsbereich",
  "reports.dateRange.from": "\nVon",
  "reports.dateRange.to": "\nTo",
  "reports.dateRange.apply": "\nBereich anwenden",
  "reports.dateRange.clear": "\nBereich löschen",
  "reports.dateRange.hint": "\nWählen Sie Start- und Enddatum aus, um Berichtsdaten zu filtern.",
  "reports.drilldown.clickToExpand": "\nKlicken Sie hier, um Details anzuzeigen",
  "reports.drilldown.backToSummary": "\nZurück zur Zusammenfassung",
  "reports.drilldown.breadcrumbRoot": "\nZusammenfassung",
  "reports.drilldown.loadingDetail": "\nDetailansicht wird geladen...",
  "reports.drilldown.detailTitle": "\nDetailansicht",
  "reports.drilldown.detailBreakdown": "\nDetaillierte Aufschlüsselung für {item}",
  "reports.drilldown.detailContent": "Detaillierte Aufschlüsselung für Artikel {item}.",
  "workOrderDetail.title": "\nArbeitsauftragsdetail",
  "training.courses.title": "\nSchulungen",
  "training.courses.description": "\nVerwalten Sie Schulungen, Module und Mitarbeiteranmeldungen.",
  "training.courses.create": "\nKurs erstellen",
  "training.courses.editTitle": "\nKurs",
  "training.courses.moduleCount": " bearbeiten\n{count} Module",
  "training.courses.enrolledCount": "\n{count} eingeschrieben",
  "training.courses.completionRate": "\n{rate}% Fertigstellung",
  "training.courses.durationLabel": "\nDauer",
  "training.courses.mandatoryLabel": "\nObligatorisch",
  "training.courses.optionalLabel": "\nOptional",
  "training.courses.empty": "\nEs wurden noch keine Schulungen erstellt.",
  "training.modules.title": "\nKursmodule",
  "training.modules.add": "\nModul",
  "training.modules.contentType": " hinzufügen\nInhaltstyp",
  "training.modules.video": "\nVideo",
  "training.modules.document": "\nDokument",
  "training.modules.quiz": "\nQuiz",
  "training.modules.sortOrder": "\nBestellen",
  "training.modules.duration": "\nDauer (Min.)",
  "training.certification.title": "\nZertifizierungen",
  "training.certification.description":
    "\nVerfolgen Sie die Gültigkeit und den Ablauf der Zertifizierung zur Gewährleistung der Compliance.",
  "training.certification.expiresAt": "\nLäuft ab",
  "training.certification.daysUntilExpiry": "\n{days} verbleibende Tage",
  "training.certification.expired": "\nAbgelaufen",
  "training.certification.expiringSoon": "\nLäuft bald ab",
  "training.certification.valid": "\nGültig",
  "training.certification.expiringAlert":
    "\n{count} Zertifizierungen, die innerhalb von 30 Tagen ablaufen",
  "training.certification.renewAction": "\nErneuern",
  "training.certification.downloadCertificate": "\nZertifikat herunterladen",
  "training.certification.issuedBy": "\nHerausgegeben von",
  "training.certification.issuedAt": "\nAusgestellt am",
  "training.certification.name": "\nZertifikatsname",
  "training.certification.empty": "\nKeine Zertifizierungen vorhanden.",
  "training.competencyMatrix.title": "\nKompetenzmatrix",
  "training.competencyMatrix.description":
    "\nOrdnen Sie die erforderlichen Kompetenzen den tatsächlichen Mitarbeiterqualifikationen zu.",
  "training.competencyMatrix.requiredLevel": "\nErforderlich",
  "training.competencyMatrix.currentLevel": "\nAktuell",
  "training.competencyMatrix.gap": "\nLücke",
  "training.competencyMatrix.noGap": "\nMet",
  "training.competencyMatrix.employee": "\nMitarbeiter",
  "training.competencyMatrix.competency": "\nKompetenz",
  "training.competencyMatrix.level": "\nEbene",
  "training.competencyMatrix.empty": "\nNoch keine Kompetenzdefinitionen konfiguriert.",
  "training.competencyMatrix.emptyEmployee":
    "\nEs wurden keine Mitarbeiterkompetenzbeurteilungen erfasst.",
  "common.approvalSignoff": "\nGenehmigung und Freigabe",
  "common.dispatchBoard": "\nVersandbrett",
  "common.serviceBoard": "\nServiceplatine",
  "common.ownerQueue": "\nEigentümerwarteschlange",
  "common.slaTimers": "\nSLA-Timer",
  "common.macros": "\nMakros",
  "common.certificationWorkflow": "\nZertifizierungsworkflow",
  "common.escalationWorkflow": "\nEskalationsworkflow",
  "common.cohortCompare": "\nKohortenvergleich",
  "common.pinboard": "\nProblempinnwand",
  "common.governanceControls": "\nGovernance-Kontrollen",
  "predictions.workspace.promote.eyebrow": "\nHeraufstufen zu action",
  "predictions.workspace.promote.title": "\nFördern Sie das Signal in der Arbeit",
  "predictions.workspace.promote.description":
    "\nÜbertragen Sie die Live-Vorhersage in den Versand, die Servicewiederherstellung, die Planung oder ein Berichtspaket, ohne den Arbeitsbereich zu verlassen.",
  "predictions.workspace.promote.dispatchLabel": "\nVersandverfolgung",
  "predictions.workspace.promote.dispatchDescription":
    "\nÖffnen Sie die Aufgabenwarteschlange unter Berücksichtigung der Live-Vorhersage.",
  "predictions.workspace.promote.serviceLabel": "\nServiceplatine öffnen",
  "predictions.workspace.promote.serviceDescription":
    "\nVerschieben Sie das aktive Signal in die Arbeitsauftragskoordination und Feldausführung.",
  "predictions.workspace.promote.planningLabel": "\nHeraufstufen zu Planning",
  "predictions.workspace.promote.planningDescription":
    "\nTragen Sie das Risikosignal in die Finanzplanung und Investitionsüberprüfung ein.",
  "predictions.workspace.promote.reportLabel": "\nBerichtspaket erstellen",
  "predictions.workspace.promote.reportDescription":
    "\nErfassen Sie die aktuellen KI-Beweise in einem dauerhaften Berichtsworkflow.",
  "predictions.workspace.ownerQueue.eyebrow": "\nEigentümerwarteschlange",
  "predictions.workspace.ownerQueue.title": "\nÜbergabe des aktuellen Eigentümers",
  "predictions.workspace.ownerQueue.description":
    "\nHalten Sie die nächsten Betreiber, Zuverlässigkeits- und Beschaffungseigentümer neben der Risikotafel sichtbar.",
  "predictions.workspace.ownerQueue.dispatchItem":
    "\nVersandeigentümer bestätigt die nächste Feldaktion und das Fälligkeitsfenster.",
  "predictions.workspace.ownerQueue.reliabilityItem":
    "\nDer Zuverlässigkeitseigentümer validiert die KI-Beweise, bevor das Signal zu wiederholter Arbeit führt.",
  "predictions.workspace.ownerQueue.procurementItem":
    "Der Beschaffungsverantwortliche hält Ausschau nach Ersatzteilen, Ersatzteilen oder Entsorgungsdruck.",
  "finance.cockpit.savedSlices.title": "\nGespeicherte Finanzanteile",
  "finance.cockpit.savedSlices.description":
    "\nWechseln Sie zwischen den Finanzabschnitten, die Betreiber während der Überprüfung und Freigabe am häufigsten erneut öffnen.",
  "finance.cockpit.savedSlices.portfolio": "\nPortfolio watch",
  "finance.cockpit.savedSlices.depreciation": "\nAbschreibungsüberwachung",
  "finance.cockpit.savedSlices.controls": "\nKontrollüberprüfung",
  "finance.cockpit.savedSlices.reviewWindow": "\nÜberprüfungsfenster",
  "finance.cockpit.savedSlices.ownerQueue": "\nEigentümerwarteschlange",
  "finance.cockpit.savedSlices.packReady": "\nPack bereit",
  "finance.cockpit.signoff.title": "\nSignoff- und Verteilungsschleife",
  "finance.cockpit.signoff.description":
    "\nSorgen Sie dafür, dass die Planungsgrundlage, die Beschaffungsverfolgung und die Berichtsverteilung in einem einzigen Freigabefach sichtbar sind.",
  "finance.cockpit.signoff.planTitle": "\nPlanungsgrundlinie",
  "finance.cockpit.signoff.planDescription":
    "\nÜberprüfen Sie die Basislinie der aktiven Finanzplanung.",
  "finance.cockpit.signoff.planSupport":
    "\nÜbertragen Sie den aktuellen Abschreibungsstand in die nächste Genehmigungsrunde.",
  "finance.cockpit.signoff.procurementTitle": "\nBeschaffungsverfolgung",
  "finance.cockpit.signoff.procurementDescription":
    "\nÜberprüfen Sie den Bestellpfad, bevor Sie Ausgaben freigeben.",
  "finance.cockpit.signoff.procurementSupport":
    "\nHalten Sie nachgelagerte Kaufaktionen neben dem aktuellen Finanzbereich sichtbar.",
  "finance.cockpit.signoff.distributionTitle": "\nBerichtsverteilung",
  "finance.cockpit.signoff.distributionDescription":
    "\nBringen Sie die aktuelle Finanzlage in das nächste Stakeholder-Paket.",
  "finance.cockpit.signoff.distributionSupport":
    "\nLeiten Sie die genehmigte Zusammenfassung in die gespeicherte Berichtschronologie und -verteilung um.",
  "financePlanning.workflow.title": "\nGenehmigungsrhythmus",
  "financePlanning.workflow.description":
    "\nVerfolgen Sie die aktuelle Baseline, den Freigabedruck und die Verteilungsbereitschaft, bevor sich Szenarien nach unten bewegen.",
  "financePlanning.workflow.baseline":
    "\n{count} Basisszenario(s) bleiben im aktiven Überprüfungssatz.",
  "financePlanning.workflow.approvals":
    "\n{count} Genehmigungs- oder Abhängigkeitssignale müssen vor der Veröffentlichung noch genehmigt werden.",
  "financePlanning.workflow.distribution":
    "\n{count} Angeschlossene Verteilungspfade sind für das nächste zertifizierte Paket bereit.",
  "utilisation.cockpit.savedViews.title": "\nGespeicherte Nutzungsansichten",
  "utilisation.cockpit.savedViews.description":
    "\nWechseln Sie zwischen den gespeicherten Kohortenabschnitten, die Betreiber verwenden, um ausgeglichene, unter Druck stehende und sich erholende Nachfrage zu vergleichen.",
  "utilisation.cockpit.savedViews.cohort": "\nKohortenvergleich",
  "utilisation.cockpit.savedViews.workflow": "\nWorkflow-Übergabe",
  "utilisation.cockpit.cohortCompare.title": "\nKohortenvergleich",
  "utilisation.cockpit.cohortCompare.description":
    "\nVerwenden Sie das aktuelle Datumssegment als Basis für den Peer-Site- und Peer-Asset-Vergleich.",
  "utilisation.cockpit.cohortCompare.supporting":
    "\nTragen Sie diese Kohortenansicht in die nächste Berichterstattung oder Interventionsübergabe ein.",
  "apiExplorer.savedRequests.title": "\nGespeicherte Anfragen",
  "apiExplorer.savedRequests.description":
    "\nHalten Sie die gängigen HTML-, API- und Authentifizierungstests für wiederholte Untersuchungen griffbereit.",
  "apiExplorer.savedRequests.dashboard": "\nDashboard-HTML probe",
  "apiExplorer.savedRequests.ucp": "\nUCP-API-Probe",
  "apiExplorer.savedRequests.auth": "\nAuthentifizierungspfad probe",
  "apiExplorer.history.title": "\nAnfrageverlauf",
  "apiExplorer.history.description":
    "\nAktuelle Anforderungsmuster bleiben sichtbar, sodass Bediener Filter wiederholen können, ohne sie neu erstellen zu müssen.",
  "apiExplorer.history.active": "Aktive Fläche: {surface}",
  "apiExplorer.history.html": "\nAktuelle HTML-Navigationstests bleiben hier angepinnt.",
  "apiExplorer.history.api": "\nAktuelle API-Prüfungen bleiben hier zur Wiedergabe angeheftet.",
  "supportTickets.workspace.sla.title": "\nSLA und Warteschlangenstatus",
  "supportTickets.workspace.sla.description":
    "\nHalten Sie die aktive Warteschlange und den Status des ausgewählten Tickets sichtbar, während Sie den Detailbereich durchsuchen.",
  "supportTickets.workspace.sla.openQueue":
    "\n{count} offene Tickets verbleiben derzeit im aktiven SLA-Fenster.",
  "supportTickets.workspace.sla.activeQueue":
    "\n{count} Ticket(s) bleiben in der aktuellen Support-Warteschlange aktiv.",
  "supportTickets.workspace.sla.selectTicket":
    "\nWählen Sie ein Ticket aus, um den aktuellen SLA-Status und die Übergabe an den Eigentümer zu überprüfen.",
  "supportTickets.workspace.sla.selectedTicket":
    "\nAusgewähltes Ticket ist {status} mit {priority} Priorität.",
  "supportTickets.workspace.macros.title": "\nUnterstützen Sie Makros",
  "supportTickets.workspace.macros.description":
    "\nVerwenden Sie wiederholbare Antwortmakros, um Triage, Beweisanfragen und Abschluss konsistent zu halten.",
  "supportTickets.workspace.macros.requestEvidence":
    "\nMakro: Kundenbeweis anfordern, bevor das Ticket die aktive Warteschlange verlässt.",
  "supportTickets.workspace.macros.escalate":
    "\nMakro: Eskalieren Sie das Ticket an den nächsten Serviceeigentümer, wobei der aktuelle Kontext intakt bleibt.",
  "supportTickets.workspace.macros.closeLoop":
    "\nMakro: Schließen Sie den Kreis mit einer abschließenden Statusaktualisierung und einer revisionssicheren Zusammenfassung.",
  "training.workflow.certificationTitle": "\nWiederkehrender Zertifizierungsrhythmus",
  "training.workflow.certificationDescription":
    "\nHalten Sie Bereitschaftsüberprüfungen, Kontrollaktualisierungen und Zertifizierungsnachweise in einem wiederkehrenden Workflow aufrecht.",
  "training.workflow.certificationReadiness":
    "\n{count} Die Datensätze zur Bereitschaftsfähigkeit sind derzeit stark genug für eine Zertifizierungsprüfung.",
  "training.workflow.certificationReview":
    "\n{count} Kontrollüberprüfungselemente müssen noch von der Zertifizierung genehmigt werden.",
  "training.workflow.certificationHistory":
    "\n{count} Aktuelle(s) Kontrollupdate(s) sind als wiederkehrender Zertifizierungsnachweis verfügbar.",
  "training.workflow.escalationTitle": "\nEskalationsworkflow",
  "training.workflow.escalationDescription":
    "\nÜbertragen Sie überfällige Inspektionen, offenen Support und Aktionswarteschlangen in eine Eskalationsspur.",
  "training.workflow.escalationActions":
    "\n{count} Aktionselemente warten derzeit in der Eskalationswarteschlange.",
  "training.workflow.escalationInspections":
    "\n{count} überfällige Inspektion(en) bleiben im aktuellen Trainingsabschnitt aktiv.",
  "training.workflow.escalationSupport":
    "\n{count} Offene Support-Tickets müssen noch einer Eskalation unterzogen werden.",
  "fleet.dispatch.title": "\nVersandbrett",
  "fleet.dispatch.description":
    "\nVerschieben Sie Flottenprobleme in das richtige operative Gremium, bevor sie zu Verfügbarkeitsverlusten führen.",
  "fleet.dispatch.taskQueue": "\nAufgabenwarteschlange",
  "fleet.dispatch.taskQueueDescription":
    "\nÜberprüfen Sie den aktuellen Versandrückstand und weisen Sie die nächste Crew zu.",
  "fleet.dispatch.serviceBoard": "\nServiceplatine",
  "fleet.dispatch.serviceBoardDescription":
    "\nLeiten Sie aktive Vorfälle und Ausfallzeiten in die Servicewiederherstellung um.",
  "fleet.dispatch.reportPack": "\nBerichtspaket",
  "fleet.dispatch.reportPackDescription":
    "Packen Sie den aktuellen Flottendruck in die nächste Entscheidungsvorlage ein.",
  "fleet.ownerQueue.title": "\nFlottenbesitzer-Warteschlange",
  "fleet.ownerQueue.description":
    "\nHalten Sie die Versand-, Wartungs- und Ersatzeigentümer auf dem aktuellen Flottenabschnitt ausgerichtet.",
  "fleet.ownerQueue.dispatch": "\n{count} Flottendatensätze warten auf den Versand als Eigentümer.",
  "fleet.ownerQueue.recovery":
    "\n{count} aktive Arbeitsaufträge befinden sich noch in der Wiederherstellung.",
  "fleet.ownerQueue.replacement":
    "\n{count} Ersatzplanartikel bleiben zur Überprüfung in der Warteschlange.",
  "fleet.serviceBoard.title": "\nServiceplatine",
  "fleet.serviceBoard.description":
    "\nFassen Sie den aktuellen Wartungs- und Ausfallzeitdruck in einer Betriebsservicespur zusammen.",
  "fleet.serviceBoard.accidents":
    "\n{count} Unfallaufzeichnung(en) müssen derzeit überprüft werden.",
  "fleet.serviceBoard.downtime":
    "\n{count} Ausfallzeitdatensätze bleiben in der Servicespur aktiv.",
  "fleet.serviceBoard.replacement":
    "\n{count} Ersatzplanungselemente müssen noch an den Flottenservice angepasst werden.",
  "buildings.heatmap.title": "\nPortfolio-Heatmap",
  "buildings.heatmap.description":
    "\nHeben Sie den aktuellen Gebäudedruck in Bezug auf Bereitschaft, Sensorabdeckung, Sicherheit und Programmauslastung hervor.",
  "buildings.heatmap.readiness": "\nBereitschaftsdruck",
  "buildings.heatmap.readinessDescription":
    "\nVermögenswerte und Arbeitsaufträge prägen derzeit die Baubereitschaft.",
  "buildings.heatmap.coverage": "\nSensorabdeckung",
  "buildings.heatmap.coverageDescription":
    "\nSensorbezogene Überprüfungslast in der aktuellen Gebäudekohorte.",
  "buildings.heatmap.assurance": "\nVersicherungsrisiko",
  "buildings.heatmap.assuranceDescription":
    "\nOffene Assurance-Maßnahmen prägen weiterhin die Portfoliolage.",
  "buildings.heatmap.programme": "\nProgramm laden",
  "buildings.heatmap.programmeDescription":
    "\nInitiativen, die die aktuelle Gebäudekohorte noch betreffen.",
  "buildings.compare.title": "\nPortfolio vergleichen",
  "buildings.compare.description":
    "\nWechseln Sie von der Gebäude-Heatmap zum nächsten Bericht oder Baseline-Vergleich, ohne den Kontext neu erstellen zu müssen.",
  "buildings.compare.reportPack": "\nBerichtspaket öffnen",
  "buildings.compare.reportPackDescription":
    "\nStarten Sie den aktuellen Gebäudeabschnitt im Berichtsarbeitsbereich.",
  "buildings.compare.portfolioBaseline": "\nBaseline-Vergleich öffnen",
  "buildings.compare.portfolioBaselineDescription":
    "\nVerwenden Sie die aktuelle Gebäudelage als nächste Portfolio-Basislinie.",
  "buildings.compare.ownerQueueTitle": "\nGebäudeeigentümer-Warteschlange",
  "buildings.compare.ownerQueueDescription":
    "\nZeigen Sie, welche Gebäudeeigentümer als Nächstes in den Bereichen Planung, Sensoren und Sicherheit reagieren müssen.",
  "buildings.compare.ownerQueuePlanning":
    "\n{count} Planungselemente müssen noch vom Bauherrn überprüft werden.",
  "buildings.compare.ownerQueueSensors":
    "\n{count} sensorverknüpfte Bewertungselemente bleiben in dieser Kohorte aktiv.",
  "buildings.compare.ownerQueueAssurance":
    "\n{count} Sicherheitsmaßnahmen warten noch auf die Durchsetzung durch den Eigentümer.",
  "sensors.calibration.title": "\nKalibrierungs- und Simulationsspur",
  "sensors.calibration.description":
    "Verschieben Sie Sensorprobleme in die Kalibrierung, Regelüberprüfung oder Eskalation, ohne das Cockpit zu verlassen.",
  "sensors.calibration.queueLabel": "\nKalibrierungswarteschlange",
  "sensors.calibration.queueDescription":
    "\nÜberprüfen Sie die aktuelle Kalibrierungsarbeitslast für den aktiven Sensorsatz.",
  "sensors.calibration.rulesLabel": "\nRegelsimulation",
  "sensors.calibration.rulesDescription":
    "\nÜberprüfen Sie Änderungen an den Warnregeln, bevor sie in die Live-Lane hochgestuft werden.",
  "sensors.calibration.escalationLabel": "\nEskalationsspur",
  "sensors.calibration.escalationDescription":
    "\nTragen Sie die Probleme mit dem höchsten Drucksensor in die nächste Eigentümerübergabe ein.",
  "sensors.ownerQueue.title": "\nWarteschlange für Sensorbesitzer",
  "sensors.ownerQueue.description":
    "\nHalten Sie die Kalibrierungs-, SLA- und Sicherungseigentümer auf den aktuellen Ausnahmesatz ausgerichtet.",
  "sensors.ownerQueue.calibration":
    "\n{count} Alarmregel oder Kalibrierungselement(e) verbleiben in der aktiven Warteschlange.",
  "sensors.ownerQueue.slaLane":
    "\n{count} verletzte sensorgesteuerte Arbeitselemente prägen die SLA-Spur.",
  "sensors.ownerQueue.assurance":
    "\n{count} Sicherungsmaßnahmen benötigen noch einen benannten Eigentümer.",
  "digitalTwin.pinboard.title": "\nProblempinnwand",
  "digitalTwin.pinboard.description":
    "\nMarkieren Sie die wichtigsten Hotspots, Abdeckungsprobleme und Ausgangskontrollen neben der Live-Szene.",
  "digitalTwin.pinboard.hotspotItem":
    "\nDer Hotspot-Pin bleibt aktiv und erfordert eine Bestätigung durch den Bediener in der aktuellen Zwillingsansicht.",
  "digitalTwin.pinboard.coverageItem":
    "\nDer Abdeckungslückenstift bleibt für die aktuelle Telemetrie und den aktuellen Kameraausschnitt offen.",
  "digitalTwin.pinboard.egressItem":
    "\nDer Egress- und Flow-Pin ist bereit für die nächste exemplarische Vorgehensweise.",
  "digitalTwin.actions.title": "\nAktionsschiene",
  "digitalTwin.actions.description":
    "\nVerschieben Sie das aktive Zwillingsproblem in die Arbeit, den Support oder die Beweiserfassung, ohne den Betrachter zu verlassen.",
  "digitalTwin.actions.dispatchLabel": "\nVersandverfolgung",
  "digitalTwin.actions.dispatchDescription":
    "\nÖffnen Sie die Betriebswarteschlange für das aktive Zwillingsproblem.",
  "digitalTwin.actions.supportLabel": "\nSupport-Lane öffnen",
  "digitalTwin.actions.supportDescription":
    "\nEskalieren Sie das Zwillingsproblem mit dem aktuellen Kontext in den Support-Arbeitsbereich.",
  "digitalTwin.actions.evidenceLabel": "\nBeweise erfassen",
  "digitalTwin.actions.evidenceDescription":
    "\nÖffnen Sie den Hotspot-Beweisfeed für die aktive Zwillingsszene.",
  "reports.workspace.distributionTitle": "\nVerteilungskontrollen",
  "reports.workspace.distributionDescription":
    "\nHalten Sie Genehmigungen, Abonnements und Versionsvergleiche sichtbar, während Sie sich durch den Berichtsarbeitsbereich bewegen.",
  "reports.workspace.distributionApprovals": "\nGenehmigungsstatus",
  "reports.workspace.distributionApprovalsValue":
    "\n{count} gespeicherte Pakete bleiben zur Genehmigung oder Wiederverwendung verfügbar.",
  "reports.workspace.distributionSubscriptions": "\nAbonnementstatus",
  "reports.workspace.distributionSubscriptionsValue":
    "\n{count} Vorlagenroute(n) bleiben für die wiederholte Verteilung verfügbar.",
  "reports.workspace.distributionCompare": "\nVersionsvergleich",
  "reports.workspace.distributionCompareHistory":
    "\nDie Verlaufsansicht ist für die Chronologie und den Vergleich gespeicherter Pakete bereit.",
  "reports.workspace.distributionCompareReview":
    "\nÜberprüfen Sie das aktive Paket, bevor Sie die nächste verteilte Version bewerben.",
  "mlops.governance.title": "\nMLOps-Governance",
  "mlops.governance.description":
    "Verfolgen Sie Promotion-Gates, Risikodruck und Automatisierungsauswirkungen neben dem Live-MLOps-Arbeitsbereich.",
  "mlops.governance.riskRegister":
    "\n{count} Fehlgeschlagene Ausführungen oder Offline-Datensatzelemente gehören derzeit zum Risikoregister.",
  "mlops.governance.promotionGate":
    "\n{count} Bereitstellungs-Promotion-Gate(s) sind derzeit aktiv.",
  "tasks.dependency.title": "\nAbhängigkeiten",
  "tasks.dependency.description": "\nAufgabenblocker und verwandte Aufgaben verwalten.",
  "tasks.dependency.blockedBy": "\nBlockiert von",
  "tasks.dependency.blocking": "\nBlockieren",
  "tasks.dependency.add": "\nAbhängigkeit hinzufügen",
  "tasks.dependency.remove": "\nAbhängigkeit",
  "tasks.dependency.circularError":
    " entfernen\nZirkuläre Abhängigkeit kann nicht erstellt werden.",
  "tasks.dependency.type.blocks": "\nBlöcke",
  "tasks.dependency.type.related": "\nVerwandte",
  "tasks.dependency.empty": "\nKeine Abhängigkeiten konfiguriert.",
  "tasks.dependency.blockedBadge": "\nBlockiert",
  "tasks.dependency.selectTask": "\nWählen Sie eine Aufgabe",
  "tasks.dependency.selectTaskHint": "\nSuche nach Aufgabenbezeichnung oder ID.",
  "tasks.comments.title": "\nAktivität und Kommentare",
  "tasks.comments.description": "\nDiskussionsthread und Aktivitätsprotokoll für diese Aufgabe.",
  "tasks.comments.placeholder": "\nKommentar hinzufügen...",
  "tasks.comments.submit": "\nKommentar posten",
  "tasks.comments.empty": "\nNoch keine Kommentare. Starten Sie das Gespräch.",
  "tasks.comments.postedBy": "\nGepostet von {author}",
  "tasks.timeTracking.title": "\nZeiterfassung",
  "tasks.timeTracking.description": "\nProtokollieren Sie die für diese Aufgabe aufgewendete Zeit.",
  "tasks.timeTracking.logTime": "\nProtokollzeit",
  "tasks.timeTracking.minutes": "\nMinuten",
  "tasks.timeTracking.minutesHint": "\nDauer in Minuten.",
  "tasks.timeTracking.descriptionLabel": "\nBeschreibung",
  "tasks.timeTracking.descriptionHint": "\nKurze Anmerkung zu den durchgeführten Arbeiten.",
  "tasks.timeTracking.date": "\nDatum",
  "tasks.timeTracking.dateHint": "\nDatum, an dem die Arbeit ausgeführt wurde.",
  "tasks.timeTracking.totalLogged": "\nInsgesamt protokolliert",
  "tasks.timeTracking.totalLoggedDesc": "\nSumme aller Zeiteinträge für diese Aufgabe.",
  "tasks.timeTracking.entries": "\nZeiteinträge",
  "tasks.timeTracking.empty": "\nEs wurde noch keine Zeit protokolliert.",
  "tasks.timeTracking.durationHoursMinutes": "\n{hours}h {minutes}m",
  "tasks.timeTracking.durationMinutesOnly": "\n{minutes}m",
  "tasks.timeTracking.submitAria": "\nZeiteintrag senden",
  "workOrders.templates.title": "\nArbeitsauftragsvorlagen",
  "workOrders.templates.description":
    "\nWiederverwendbare Vorlagen für wiederkehrende Arbeitsauftragstypen.",
  "workOrders.templates.create": "\nVorlage erstellen",
  "workOrders.templates.useTemplate": "\nVerwenden Sie template",
  "workOrders.templates.defaultLines": "\nStandardwerbebuchungen",
  "workOrders.templates.defaultSla": "\nStandard-SLA (Stunden)",
  "workOrders.templates.empty":
    "\nKeine Vorlagen verfügbar. Erstellen Sie eines, um die Erstellung von Arbeitsaufträgen zu beschleunigen.",
  "workOrders.templates.titleLabel": "\nVorlagenname",
  "workOrders.templates.titleHint": "\nEin kurzer beschreibender Name für die Vorlage.",
  "workOrders.templates.descriptionLabel": "\nBeschreibung",
  "workOrders.templates.descriptionHint":
    "\nOptionale Beschreibung, wann diese Vorlage verwendet werden soll.",
  "workOrders.templates.scopeLabel": "\nGeltungsbereich",
  "workOrders.templates.scopeHint": "\nStandardumfang für Bestellungen aus dieser Vorlage.",
  "workOrders.templates.selectTemplate": "\nWählen Sie eine Vorlage",
  "workOrders.templates.selectTemplateHint":
    "\nWählen Sie eine Vorlage zum Vorabausfüllen von Arbeitsauftragsfeldern.",
  "workOrders.templates.submitAria": "\nArbeitsauftragsvorlage speichern",
  "addDevice.review.title": "\nVor dem Absenden überprüfen",
  "addDevice.review.description":
    "\nBestätigen Sie die Einrichtung, den Importstatus und die endgültigen Registrierungsdetails, bevor Sie das Gerät erstellen.",
  "addDevice.review.items.setup":
    "\nÜberprüfen Sie den Geräte-Setup- und Bereitstellungsstandortkontext.",
  "addDevice.review.items.import":
    "\nBestätigen Sie importierte Felder und alle generierten Standardwerte.",
  "addDevice.review.items.confirm":
    "\nGenehmigen Sie die endgültige Registrierungsnutzlast zur Übermittlung.",
  "addDevice.review.pending": "\nAusstehende Überprüfung",
  "addDevice.presets.title": "\nVoreinstellungsbibliothek",
  "addDevice.presets.description":
    "\nVerwenden Sie Startervorlagen für gängige Rollout-Muster, bevor Sie Geräte erstellen oder importieren.",
  "addDevice.presets.apply": "\nVoreinstellung anwenden",
  "addDevice.presets.template": "\nVorlage",
  "addDevice.presets.baseline.title": "\nBasisgeräte-Rollout",
  "addDevice.presets.baseline.description":
    "Beginnen Sie mit dem standardmäßigen Betriebsregistrierungsmuster mit Standard-Asset- und Telemetriefeldern.",
  "addDevice.presets.fieldKit.title": "\nBereitstellung des Field Kits",
  "addDevice.presets.fieldKit.description":
    "\nVerwenden Sie ein einsatzbereites Setup für tragbare Geräte, die eine schnelle Standortzuweisung und Importüberprüfung benötigen.",
  "addDevice.presets.capital.title": "\nKapitalaufnahme",
  "addDevice.presets.capital.description":
    "\nStufen Sie finanzbezogene Standardvorgaben für höherwertige Geräte ein, die eine engere Lebenszyklus- und Wertverfolgung erfordern.",
  "addDevice.workflow.stepSetup": "\nSetup",
  "addDevice.workflow.stepImport": "\nImport",
  "addDevice.workflow.stepReview": "\nRezension",
  "deviceHistory.review.title": "\nHaltung überprüfen",
  "deviceHistory.review.description":
    "\nVergleichen Sie den aktuellen Verlauf, den Anomaliekontext und den Exportstatus, bevor Sie den Ereignispfad eskalieren.",
  "deviceHistory.review.diffTitle": "\nRezension ändern",
  "deviceHistory.review.diffDescription":
    "\nVerfolgen Sie die neueste Konfiguration oder das neueste Lebenszyklusdelta, bevor Sie das Update akzeptieren.",
  "deviceHistory.review.diffValue": "\nNeuester Unterschied im Bereich",
  "deviceHistory.review.anomalyTitle": "\nAnomalie watch",
  "deviceHistory.review.anomalyDescription":
    "\nHalten Sie ungewöhnliche Lebenszyklus- oder Wartungsmuster sichtbar, um eine schnelle Nachverfolgung zu ermöglichen.",
  "deviceHistory.review.anomalyValue": "\nAnomalieüberprüfung bereit",
  "deviceHistory.review.exportTitle": "\nBeweisexport",
  "deviceHistory.review.exportDescription":
    "\nPacken Sie den gefilterten Verlauf und die Bewertungslage in einen Bericht oder eine CSV-Übergabe.",
  "deviceHistory.review.openReports": "\nOffene Berichte",
  "deviceHistory.review.raiseFollowUp": "\nFollow-up erhöhen",
  "documentDetail.section.activityTitle": "\nVerwandte Aktivität",
  "documentDetail.section.activityDescription":
    "\nHalten Sie die neuesten Bewegungen, verknüpften Datensätze und den nachgelagerten Betriebskontext sichtbar.",
  "documentDetail.section.nextDecisionTitle": "\nNächste Entscheidung",
  "documentDetail.section.nextDecisionDescription":
    "\nErmitteln Sie den nächsten kommerziellen oder betrieblichen Schritt, bevor Sie den Workflow-Status ändern.",
  "documentDetail.section.signoffTitle": "\nAbzeichnung und Genehmigung",
  "documentDetail.section.signoffDescription":
    "\nHalten Sie Genehmigungen, Freigabestatus und unterstützende Nachweise auf einer Schiene sichtbar.",
  "documentWorkspace.role.procurement": "\nBeschaffung",
  "documentWorkspace.section.discrepancyTitle": "\nDiskrepanzauflösung",
  "documentWorkspace.section.discrepancyDescription":
    "\nVerfolgen Sie Abweichungen, Ausnahmen und Folgeaktivitäten, bevor der Datensatz geschlossen wird.",
  "documentWorkspace.section.nextDecisionTitle": "\nNächste Entscheidung",
  "documentWorkspace.section.nextDecisionDescription":
    "\nHalten Sie die nächste Genehmigung, den nächsten kommerziellen Umzug oder die nächste Bedienerübergabe im Arbeitsbereich sichtbar.",
  "documentWorkspace.section.receiptTitle": "\nEmpfang und Aufnahme",
  "documentWorkspace.section.receiptDescription":
    "\nBeobachten Sie die erhaltenen Beweise, die Aufnahmebestätigung und alle verbleibenden Quittungslücken.",
  "documentWorkspace.section.slaTitle": "\nSLA-Uhr",
  "documentWorkspace.section.slaDescription":
    "\nÜberwachen Sie Servicefenster, Timer und alle ausstehenden Druckstöße von derselben Schiene.",
  "layout.analysisCanvas.leftRail": "\nFilter",
  "layout.analysisCanvas.stage": "\nHauptinhalt",
  "layout.analysisCanvas.rightRail": "\nDetails",
  "common.view": "\nAnsehen",
  "training.view.library": "\nBibliothek",
  "training.view.enrollments": "\nAnmeldungen",
  "training.library.title": "\nKursbibliothek",
  "training.library.description": "\nVerwalten Sie verfügbare Schulungskurse und Module.",
  "training.library.titleColumn": "\nTitel",
  "training.library.durationColumn": "\nDauer",
  "training.library.modulesColumn": "\nModule",
  "training.library.enrollmentsColumn": "\nAnmeldungen",
  "training.library.empty": "\nKeine Kurse verfügbar.",
  "training.library.mandatory": "\nObligatorisch",
  "training.library.optional": "\nOptional",
  "training.enrollment.description":
    "\nVerfolgen Sie den Fortschritt bei allen Pflicht- und Wahlkursen.",
  "training.enrollment.learnerColumn": "\nLernender",
  "training.enrollment.courseColumn": "\nKurs",
  "training.enrollment.completed": "\nAbgeschlossen",
  "training.enrollment.notStarted": "\nNicht gestartet",
  "training.enrollment.title": "\nAnmeldungsverfolgung",
  "training.enrollment.empty": "\nKeine Anmeldungen gefunden.",

  // Commerce – cart
  "cart.browseProducts": "Produkte durchsuchen",
  "cart.category": "Kategorie",
  "cart.clearCart": "Warenkorb leeren",
  "cart.empty": "Warenkorb ist leer",
  "cart.emptyDescription":
    "Ihr Warenkorb ist leer. Durchsuchen Sie unseren Katalog, um Artikel hinzuzufügen.",
  "cart.emptyTitle": "Keine Artikel im Warenkorb",
  "cart.items": "Artikel",
  "cart.itemCount": "{count} Artikel",
  "cart.loadError": "Warenkorb konnte nicht geladen werden. Bitte versuchen Sie es erneut.",
  "cart.loading": "Warenkorb wird geladen",
  "cart.poNumber": "Bestellnummer",
  "cart.poNumberPlaceholder": "Bestellnummer eingeben",
  "cart.proceedToCheckout": "Zur Kasse",
  "cart.product": "Produkt",
  "cart.quantity": "Menge",
  "cart.removeItem": "{name} entfernen",
  "cart.saveCart": "Warenkorb speichern",
  "cart.summary": "Bestellübersicht",
  "cart.title": "Warenkorb",
  "cart.total": "Gesamt",
  "cart.unitPrice": "Stückpreis",
  "cart.updateQuantity": "Menge für {name} aktualisieren",
  "cart.lineItemsTableAria": "Warenkorbpositionen",

  // Commerce – checkout
  "checkout.backToCart": "Zurück zum Warenkorb",
  "checkout.billingInformation": "Rechnungsinformationen",
  "checkout.items": "Bestellartikel",
  "checkout.noShippingAddresses": "Keine Lieferadressen verfügbar.",
  "checkout.notes": "Bestellnotizen",
  "checkout.notesPlaceholder": "Besondere Anweisungen oder Notizen hinzufügen",
  "checkout.orderSummary": "Bestellübersicht",
  "checkout.placeOrder": "Bestellung aufgeben",
  "checkout.poNumber": "Bestellnummer",
  "checkout.poNumberPlaceholder": "Bestellnummer eingeben",
  "checkout.paymentMethod": "Zahlungsmethode",
  "checkout.shippingAddress": "Lieferadresse",
  "checkout.step.billing": "Rechnung",
  "checkout.step.cart": "Warenkorb",
  "checkout.step.confirm": "Bestätigen",
  "checkout.step.review": "Überprüfen",
  "checkout.step.shipping": "Versand",
  "checkout.subtitle": "Überprüfen Sie Ihre Bestellung und schließen Sie den Kauf ab.",
  "checkout.title": "Kasse",
  "checkout.total": "Gesamt",

  // Commerce – approvals and inventory
  "commerce.approvals.title": "Genehmigungen",
  "commerce.approvals.subtitle":
    "Ausstehende Entscheidungen prüfen und abgeschlossene Genehmigungen nachvollziehen.",
  "commerce.approvals.documentType": "Document type",
  "commerce.approvals.documentNumber": "Document",
  "commerce.approvals.amount": "Amount",
  "commerce.approvals.assignedTo": "Assigned to",
  "commerce.approvals.status": "Status",
  "commerce.approvals.date": "Date",
  "commerce.approvals.approve": "Approve request",
  "commerce.approvals.reject": "Reject request",
  "commerce.approvals.view": "View document",
  "commerce.approvals.unassigned": "Unassigned",
  "commerce.approvals.tabPending": "Pending",
  "commerce.approvals.tabDecided": "Decided",
  "commerce.approvals.emptyPendingTitle": "No pending approvals",
  "commerce.approvals.emptyPendingDescription":
    "When documents need your decision, they appear in this list.",
  "commerce.approvals.emptyDecidedTitle": "No completed approvals yet",
  "commerce.approvals.emptyDecidedDescription": "Finished decisions appear here for audit.",
  "commerce.approvals.pendingTableAria": "Pending approvals",
  "commerce.approvals.decidedTableAria": "Completed approvals",

  "commerce.inventory.product": "Product",
  "commerce.inventory.warehouse": "Warehouse",
  "commerce.inventory.onHand": "On hand",
  "commerce.inventory.reserved": "Reserved",
  "commerce.inventory.available": "Available",
  "commerce.inventory.reorderPoint": "Reorder point",
  "commerce.inventory.status": "Status",
  "commerce.inventory.lowStock": "Low stock",
  "commerce.inventory.ok": "OK",
  "commerce.inventory.adjustStock": "Adjust stock",
  "commerce.inventory.transfer": "Transfer stock",
  "commerce.inventory.stockCount": "Run stock count",
  "commerce.inventory.totalProducts": "Total products",
  "commerce.inventory.totalStockValue": "Total stock value",
  "commerce.inventory.lowStockAlerts": "Low stock alerts",
  "commerce.inventory.actionNeeded": "Action needed",
  "commerce.inventory.pendingReplenishments": "Pending replenishments",
  "commerce.inventory.stockLevelsTableAria": "Stock levels by warehouse",

  "commerce.warehouse.title": "Warehouses",
  "commerce.warehouse.subtitle": "Register sites, monitor stock, and manage replenishment alerts.",
  "commerce.warehouse.name": "Name",
  "commerce.warehouse.code": "Code",
  "commerce.warehouse.type": "Type",
  "commerce.warehouse.site": "Site",
  "commerce.warehouse.status": "Status",
  "commerce.warehouse.active": "Active",
  "commerce.warehouse.inactive": "Inactive",
  "commerce.warehouse.delete": "Delete warehouse",
  "commerce.warehouse.product": "Product",
  "commerce.warehouse.sku": "SKU",
  "commerce.warehouse.onHand": "On hand",
  "commerce.warehouse.reserved": "Reserved",
  "commerce.warehouse.available": "Available",
  "commerce.warehouse.lowStock": "Low stock",
  "commerce.warehouse.ok": "OK",
  "commerce.warehouse.replenish": "Replenish",
  "commerce.warehouse.replenishmentAlerts": "Replenishment alerts",
  "commerce.warehouse.addWarehouse": "Add warehouse",
  "commerce.warehouse.selectType": "Select type",
  "commerce.warehouse.saveWarehouse": "Save warehouse",
  "commerce.warehouse.emptyTitle": "No warehouses yet",
  "commerce.warehouse.emptyDescription": "Create a warehouse to track stock by location.",
  "commerce.warehouse.warehousesTableAria": "Warehouses",
  "commerce.warehouse.warehouseStockTableAria": "Warehouse stock levels",

  "commerce.vending.title": "Vending devices",
  "commerce.vending.subtitle": "Monitor device health, access rules, and dispense events.",
  "commerce.vending.serial": "Serial",
  "commerce.vending.type": "Type",
  "commerce.vending.warehouse": "Warehouse",
  "commerce.vending.lastHeartbeat": "Last heartbeat",
  "commerce.vending.viewDetails": "View details",
  "commerce.vending.accessRules": "Access rules",
  "commerce.vending.user": "User",
  "commerce.vending.role": "Role",
  "commerce.vending.access": "Access",
  "commerce.vending.allowed": "Allowed",
  "commerce.vending.denied": "Denied",
  "commerce.vending.eventLog": "Event log",
  "commerce.vending.noEvents": "No events recorded yet.",
  "commerce.vending.emptyTitle": "No vending devices",
  "commerce.vending.emptyDescription": "Register devices to monitor availability and access.",
  "commerce.vending.accessRulesTableAria": "Device access rules",

  "commerce.punchout.title": "Punchout profiles",
  "commerce.punchout.subtitle": "Configure punchout integrations and connection tests.",
  "commerce.punchout.test": "Test connection",
  "commerce.punchout.edit": "Edit profile",
  "commerce.punchout.delete": "Delete profile",
  "commerce.punchout.protocol": "Protocol",
  "commerce.punchout.status": "Status",
  "commerce.punchout.lastTest": "Last test",
  "commerce.punchout.testResult": "Test result",
  "commerce.punchout.addProfile": "Add punchout profile",
  "commerce.punchout.selectProtocol": "Select protocol",
  "commerce.punchout.saveProfile": "Save profile",
  "commerce.punchout.emptyTitle": "No punchout profiles",
  "commerce.punchout.emptyDescription": "Add a profile to connect procurement systems.",
  "commerce.punchout.profilesTableAria": "Punchout profiles",

  "commerce.threeWayMatch.lineItemsTableAria": "Three-way match line items",

  "commerce.usageReports.resultsTableAria": "Usage report results",

  "commerce.postGoLive.title": "Post go-live",
  "commerce.postGoLive.subtitle": "Track rollout tasks and adoption after integration.",
  "commerce.postGoLive.progress": "Rollout progress",
  "commerce.postGoLive.complete": "Mark complete",
  "commerce.postGoLive.task": "Task",
  "commerce.postGoLive.completedAt": "Completed",
  "commerce.postGoLive.completedBy": "Completed by",
  "commerce.postGoLive.adoptionMetrics": "Adoption metrics",
  "commerce.postGoLive.emptyTitle": "No checklist items",
  "commerce.postGoLive.emptyDescription":
    "Checklist items appear when your integration is configured.",
  "commerce.postGoLive.checklistTableAria": "Go-live checklist",

  "commerce.orderToCash.title": "Order to cash",
  "commerce.orderToCash.description": "Pipeline throughput from orders through to paid invoices.",
  "commerce.orderToCash.timeline": "Timeline",
  "commerce.orderToCash.period": "Period",
  "commerce.orderToCash.placed": "Placed",
  "commerce.orderToCash.approved": "Approved",
  "commerce.orderToCash.fulfilled": "Fulfilled",
  "commerce.orderToCash.invoicesIssued": "Invoices issued",
  "commerce.orderToCash.invoicesPaid": "Invoices paid",
  "commerce.orderToCash.revenue": "Revenue",
  "commerce.orderToCash.totalRevenue": "Total revenue",
  "commerce.orderToCash.dateRange": "Date range",
  "commerce.orderToCash.timelineTableAria": "Order-to-cash timeline",

  "commerce.integrations.title": "Integrations",
  "commerce.integrations.subtitle": "Monitor connections, tests, and go-live readiness.",
  "commerce.integrations.testConnection": "Test connection",
  "commerce.integrations.sourceSystem": "Source system",
  "commerce.integrations.type": "Type",
  "commerce.integrations.lastSync": "Last sync",
  "commerce.integrations.status": "Status",
  "commerce.integrations.testPlan": "Test plan",
  "commerce.integrations.goLiveChecklist": "Go-live checklist",
  "commerce.integrations.goLiveProgress": "Go-live progress",
  "commerce.integrations.emptyTitle": "No integrations",
  "commerce.integrations.emptyDescription": "Connect systems to sync catalogue and orders.",
  "commerce.integrations.integrationsTableAria": "Integrations",

  "commerce.compliance.title": "Compliance",
  "commerce.compliance.subtitle": "Certifications, contract posture, and purchasing guidance.",
  "commerce.compliance.certifications": "Certifications",
  "commerce.compliance.name": "Name",
  "commerce.compliance.status": "Status",
  "commerce.compliance.expiry": "Expiry",
  "commerce.compliance.issuer": "Issuer",
  "commerce.compliance.contractDocuments": "Contract documents",
  "commerce.compliance.noContractDocs": "No contract documents",
  "commerce.compliance.purchasingGuidance": "Purchasing guidance",
  "commerce.compliance.learnMore": "Learn more",
  "commerce.compliance.emptyTitle": "No compliance data",
  "commerce.compliance.emptyDescription":
    "Compliance artefacts appear when configured for your tenant.",
  "commerce.compliance.certificationsTableAria": "Certifications",

  "commerce.asn.title": "Shipment tracking",
  "commerce.asn.subtitle": "ASN {asnNumber} status, timeline, and line items.",
  "commerce.asn.shipmentSummary": "Shipment summary",
  "commerce.asn.carrier": "Carrier",
  "commerce.asn.trackingNumber": "Tracking number",
  "commerce.asn.shipDate": "Ship date",
  "commerce.asn.estimatedArrival": "Estimated arrival",
  "commerce.asn.trackingHistory": "Tracking history",
  "commerce.asn.product": "Product",
  "commerce.asn.sku": "SKU",
  "commerce.asn.quantity": "Quantity",
  "commerce.asn.lineItemsTableAria": "Shipment line items",
  "commerce.buyingLists.title": "Einkaufslisten",
  "commerce.buyingLists.shared": "Geteilt",
  "commerce.buyingLists.itemCount": "{count} Positionen",
  "commerce.buyingLists.emptyTitle": "Noch keine Einkaufslisten",
  "commerce.buyingLists.emptyDescription":
    "Legen Sie eine Einkaufsliste an, um Katalogpositionen vor dem Checkout vorzubereiten.",
  "commerce.buyingLists.subtitle":
    "Bündeln Sie Katalogpositionen und übergeben Sie sie bei Bedarf an den Warenkorb.",
  "commerce.buyingLists.createNew": "Einkaufsliste anlegen",
  "commerce.buyingLists.detail.eyebrow": "Einkaufsliste",
  "commerce.buyingLists.detail.shellTitle": "Einkaufsliste",
  "commerce.buyingLists.detail.notFoundTitle": "Einkaufsliste nicht gefunden",
  "commerce.buyingLists.detail.notFoundDescription":
    "Diese Liste existiert nicht oder Sie haben keinen Zugriff.",
  "commerce.buyingLists.detail.tableCaption": "Positionen der Einkaufsliste",
  "commerce.buyingLists.detail.col.product": "Produkt",
  "commerce.buyingLists.detail.col.sku": "SKU",
  "commerce.buyingLists.detail.col.quantity": "Menge",
  "commerce.buyingLists.detail.col.unitPrice": "Stückpreis",
  "commerce.buyingLists.detail.col.lineTotal": "Zeilensumme",
  "commerce.buyingLists.detail.convertToCart": "Liste in Warenkorb legen",
  "commerce.buyingLists.detail.emptyRows":
    "Diese Liste enthält noch keine Positionen. Ergänzen Sie Produkte aus dem Katalog.",
  "commerce.cart.title": "Warenkorb",
  "commerce.checkout.title": "Kasse",
  "commerce.inventory.title": "Inventar",
  "commerce.inventory.subtitle":
    "Bestände, Niedrigbestandswarnungen und Auffüllaktionen im Blick behalten.",

  "commerce.workspace.operationsLead":
    "Beschaffungs- und Katalogwerkzeuge in Ihrem Arbeitsbereich.",
  "commerce.workspace.cartLead": "Warenkorbpositionen, Mengen und Summen vor dem Checkout prüfen.",
  "commerce.workspace.buyingListDetailLead":
    "Gebündelte Positionen prüfen und die Liste bei Bedarf in den Warenkorb legen.",
  "commerce.workspace.productDetailLead":
    "Spezifikationen, Preise und Verfügbarkeit für diesen Katalogartikel.",

  // Commerce – compliance
  "commerce.compliance.contract": "Vertrag",
  "commerce.compliance.contractTooltip": "Zu Vertragspreisen gekauft",
  "commerce.compliance.offContract": "Außerhalb des Vertrags",
  "commerce.compliance.offContractWithCatalog": "Außerhalb des Vertrags ({catalogType})",

  // Commerce – fulfilment
  "commerce.fulfilment.blindFulfilment": "Blinder Versand",
  "commerce.fulfilment.blindFulfilmentDescription":
    "Lieferantendetails auf Lieferscheinen und Versanddokumenten ausblenden.",
  "commerce.fulfilment.configDescription":
    "Blinden Versand und Verpackungsregeln für diesen Partner konfigurieren.",
  "commerce.fulfilment.configTitle": "Versandkonfiguration",
  "commerce.fulfilment.packagingRules": "Verpackungsregeln",
  "commerce.fulfilment.saveConfig": "Konfiguration speichern",
  "commerce.fulfilment.toggleBlind": "Blinden Versand umschalten",

  // Commerce – orders (customer order history list)
  "commerce.orders.date": "Datum",
  "commerce.orders.emptyDescription":
    "Sobald Sie Bestellungen aufgeben, erscheinen sie hier mit Status und Summen.",
  "commerce.orders.emptyTitle": "Noch keine Bestellungen",
  "commerce.orders.filterBarDescription":
    "Die Ergebnisse aktualisieren sich nach einer kurzen Eingangspause. Mit „Alle Filter löschen“ setzen Sie die Liste zurück.",
  "commerce.orders.filterBarEyebrow": "Filter",
  "commerce.orders.filterBarTitle": "Bestellungen durchsuchen",
  "commerce.orders.filteredEmptyDescription":
    "Probieren Sie andere Suchbegriffe oder löschen Sie die Filter, um alle Bestellungen zu sehen.",
  "commerce.orders.filteredEmptyTitle": "Keine Treffer zu Ihren Filtern",
  "commerce.orders.items": "Positionen",
  "commerce.orders.orderNumber": "Bestellung",
  "commerce.orders.reorder": "Erneut bestellen",
  "commerce.orders.resultCount": "{count} Bestellungen",
  "commerce.orders.search": "Suchen",
  "commerce.orders.searchLabel": "Bestellungen durchsuchen",
  "commerce.orders.searchPlaceholder": "Nach Bestellnummer suchen…",
  "commerce.orders.status": "Status",
  "commerce.orders.subtitle": "Vergangene Einkäufe, Summen und Nachbestellungen an einem Ort.",
  "commerce.orders.tableLabel": "Bestellverlauf",
  "commerce.orders.title": "Bestellverlauf",
  "commerce.orders.total": "Gesamt",
  "commerce.orders.view": "Bestellung anzeigen",

  // Commerce – knowledge base
  "commerce.knowledgeBase.categoryLegend": "Kategorien",
  "commerce.knowledgeBase.emptyDescription": "Anleitungen und Antworten für Partner und Betrieb.",
  "commerce.knowledgeBase.emptyTitle": "Noch keine Artikel",
  "commerce.knowledgeBase.filterBarDescription":
    "Die Ergebnisse aktualisieren sich nach einer kurzen Eingangspause. Kategorien bleiben aktiv, bis Sie „Alle“ wählen oder „Alle Filter löschen“.",
  "commerce.knowledgeBase.filterBarEyebrow": "Filter",
  "commerce.knowledgeBase.filterBarTitle": "Artikel durchsuchen",
  "commerce.knowledgeBase.filteredEmptyDescription":
    "Andere Suchbegriffe, eine andere Kategorie oder alle Filter löschen.",
  "commerce.knowledgeBase.filteredEmptyTitle": "Keine Treffer zu Ihren Filtern",
  "commerce.knowledgeBase.loadingArticles": "Artikel werden geladen",
  "commerce.knowledgeBase.resultCount": "{count} Artikel",
  "commerce.knowledgeBase.search": "Suchen",
  "commerce.knowledgeBase.searchLabel": "Artikel durchsuchen",
  "commerce.knowledgeBase.searchPlaceholder": "Titel und Schlagwörter durchsuchen…",
  "commerce.knowledgeBase.subtitle": "Produkthinweise, Richtlinien und Anleitungen finden.",
  "commerce.knowledgeBase.title": "Wissensdatenbank",
  "commerce.knowledgeBase.views": "Aufrufe",

  // Commerce – products
  "commerce.products.addToCart": "In den Warenkorb",
  "commerce.products.allProducts": "Alle Produkte",
  "commerce.products.availability": "Verfügbarkeit",
  "commerce.products.categories": "Kategorien",
  "commerce.products.categoryNav": "Produktkategorienavigation",
  "commerce.products.customerPartNumber": "Kundenteilenummer",
  "commerce.products.days": "Tage",
  "commerce.products.description": "Beschreibung",
  "commerce.products.emptyDescription":
    "Versuchen Sie, Ihre Suche oder Filter anzupassen, um das Gewünschte zu finden.",
  "commerce.products.emptyTitle": "Keine Produkte gefunden",
  "commerce.products.imageGallery": "Produktbildergalerie",
  "commerce.products.inStock": "auf Lager",
  "commerce.products.leadTime": "Lieferzeit",
  "commerce.products.loadingProducts": "Produkte werden geladen",
  "commerce.products.minOrderQty": "Mindestbestellmenge",
  "commerce.products.noSearchResults": 'Keine Ergebnisse für „{query}".',
  "commerce.products.noStockInfo": "Lagerinformationen sind für dieses Produkt nicht verfügbar.",
  "commerce.products.notFound": "Produkt nicht gefunden",
  "commerce.products.notFoundDescription":
    "Das gesuchte Produkt existiert nicht oder wurde entfernt.",
  "commerce.products.pricing": "Preise",
  "commerce.products.quantity": "Menge",
  "commerce.products.relatedProducts": "Ähnliche Produkte",
  "commerce.products.search": "Suchen",
  "commerce.products.searchLabel": "Produkte suchen",
  "commerce.products.searchPlaceholder": "Produkte suchen...",
  "commerce.products.searchResults": "Suchergebnisse",
  "commerce.products.specifications": "Spezifikationen",
  "commerce.products.subtitle": "Durchsuchen Sie unseren Produktkatalog.",
  "commerce.products.filterBarEyebrow": "Filter",
  "commerce.products.filterBarTitle": "Katalog durchsuchen",
  "commerce.products.filterBarDescription":
    "\nDie Ergebnisse aktualisieren sich nach einer kurzen Eingangspause. Die Kategorie bleibt aktiv, bis Sie „Alle Produkte“ wählen oder „Alle Filter löschen“.",
  "commerce.products.title": "Produkte",
  "commerce.products.unitOfMeasure": "Maßeinheit",
  "commerce.products.viewAllResults": "Alle {count} Ergebnisse anzeigen",
  "commerce.products.viewDetails": "Details anzeigen",

  // Commerce – reseller
  "commerce.reseller.blindFulfillment": "Blinder Versand",
  "commerce.reseller.contactSupport": "Support kontaktieren",
  "commerce.reseller.refreshOrders": "Bestellverlauf aktualisieren",
  "commerce.reseller.refreshInvoices": "Rechnungen aktualisieren",
  "commerce.reseller.dashboardDescription":
    "Verwalten Sie Ihr Wiederverkäuferprofil und verfolgen Sie die Leistung.",
  "commerce.reseller.dashboardTitle": "Wiederverkäufer-Dashboard",
  "commerce.reseller.date": "Datum",
  "commerce.reseller.discount": "Rabatt",
  "commerce.reseller.discountRate": "Rabattsatz",
  "commerce.reseller.freightEligible": "Versandberechtigt",
  "commerce.reseller.invoiceNumber": "Rechnungsnr.",
  "commerce.reseller.invoices": "Rechnungen",
  "commerce.reseller.invoicesEmptyDescription":
    "Rechnungen erscheinen hier, sobald abrechenbare Dokumente vorliegen.",
  "commerce.reseller.invoicesEmptyTitle": "Noch keine Rechnungen",
  "commerce.reseller.invoicesTableAria": "Wiederverkäuferrechnungen",
  "commerce.reseller.onboarded": "Eingearbeitet",
  "commerce.reseller.orderHistory": "Bestellverlauf",
  "commerce.reseller.orderNumber": "Bestellnr.",
  "commerce.reseller.ordersEmptyDescription":
    "Bestellungen erscheinen hier, nachdem Sie sie über das Portal aufgegeben haben.",
  "commerce.reseller.ordersEmptyTitle": "Noch keine Bestellungen",
  "commerce.reseller.ordersTableAria": "Bestellverlauf des Wiederverkäufers",
  "commerce.reseller.profileInfo": "Profilinformationen",
  "commerce.reseller.status": "Status",
  "commerce.reseller.tier": "Stufe",
  "commerce.reseller.total": "Gesamt",
  "commerce.reseller.partyName": "Partner",
  "commerce.reseller.blind": "Blindversand",
  "commerce.reseller.freight": "Fracht",
  "commerce.reseller.volumeThreshold": "Volumenschwelle",
  "commerce.reseller.actions": "Aktionen",
  "commerce.reseller.adminTitle": "Wiederverkäuferverwaltung",
  "commerce.reseller.adminDescription": "Partnerstufen, Versandflags und Onboarding-Status prüfen.",
  "commerce.reseller.createProfile": "Wiederverkäuferprofil anlegen",
  "commerce.reseller.totalResellers": "Wiederverkäufer gesamt",
  "commerce.reseller.activeResellers": "Aktive Wiederverkäufer",
  "commerce.reseller.noResellers": "Keine Wiederverkäuferprofile entsprechen dem aktuellen Filter.",
  "commerce.reseller.profilesTableAria": "Wiederverkäuferprofile",

  // Commerce – spending limits
  "commerce.spending.active": "Aktiv",
  "commerce.spending.addLimit": "Ausgabenlimit hinzufügen",
  "commerce.spending.annually": "Jährlich",
  "commerce.spending.currency": "Währung",
  "commerce.spending.delete": "Löschen",
  "commerce.spending.edit": "Bearbeiten",
  "commerce.spending.emptyDescription":
    "Richten Sie Ausgabenlimits ein, um Einkaufsbudgets nach Rolle zu steuern.",
  "commerce.spending.emptyTitle": "Keine Ausgabenlimits konfiguriert",
  "commerce.spending.inactive": "Inaktiv",
  "commerce.spending.limit": "Limit",
  "commerce.spending.limitAmount": "Limitbetrag",
  "commerce.spending.monthly": "Monatlich",
  "commerce.spending.period": "Zeitraum",
  "commerce.spending.quarterly": "Vierteljährlich",
  "commerce.spending.role": "Rolle",
  "commerce.spending.saveLimit": "Limit speichern",
  "commerce.spending.selectRole": "Rolle auswählen",
  "commerce.spending.status": "Status",
  "commerce.spending.subtitle": "Ausgabenlimits und Budgets für Beschaffungsrollen verwalten.",
  "commerce.spending.limitsTableAria": "Ausgabenlimits",
  "commerce.spending.title": "Ausgabenlimits",
  "commerce.spending.user": "Benutzer",

  // Commerce – three-way match
  "commerce.threeWayMatch.discrepanciesFound": "Abweichungen gefunden",
  "commerce.threeWayMatch.discrepancy": "Abweichung",
  "commerce.threeWayMatch.discrepancyCount": "{count} Abweichung(en)",
  "commerce.threeWayMatch.invoiceTotal": "Rechnungsgesamt",
  "commerce.threeWayMatch.invoiceUnitPrice": "Rechnungsstückpreis",
  "commerce.threeWayMatch.invoicedQty": "Rechnungsmenge",
  "commerce.threeWayMatch.matched": "Übereinstimmend",
  "commerce.threeWayMatch.ok": "OK",
  "commerce.threeWayMatch.poQty": "Bestellmenge",
  "commerce.threeWayMatch.poTotal": "Bestellgesamt",
  "commerce.threeWayMatch.poUnitPrice": "Bestellstückpreis",
  "commerce.threeWayMatch.product": "Produkt",
  "commerce.threeWayMatch.shipmentTotal": "Versandgesamt",
  "commerce.threeWayMatch.shippedQty": "Versandte Menge",
  "commerce.threeWayMatch.subtitle": "Dreifachabgleich für Bestellung {poNumber}.",
  "commerce.threeWayMatch.title": "Dreifachabgleich",
  "commerce.threeWayMatch.viewPO": "Bestellung anzeigen",

  // Commerce – usage reports
  "commerce.usageReports.dateFrom": "Datum von",
  "commerce.usageReports.dateTo": "Datum bis",
  "commerce.usageReports.emptyDescription":
    "Führen Sie einen Bericht aus, um Einkaufsdaten anzuzeigen.",
  "commerce.usageReports.export": "Exportieren",
  "commerce.usageReports.filterLabel": "Nutzungsbericht-Filter",
  "commerce.usageReports.grandTotal": "Gesamtsumme",
  "commerce.usageReports.groupBy": "Gruppieren nach",
  "commerce.usageReports.groupLabel": "Gruppe",
  "commerce.usageReports.orderCount": "Bestellungen",
  "commerce.usageReports.runReport": "Bericht ausführen",
  "commerce.usageReports.subtitle": "Kaufmuster und Ausgaben nach Kategorie analysieren.",
  "commerce.usageReports.title": "Nutzungsberichte",
  "commerce.usageReports.totalQuantity": "Gesamtmenge",
  "commerce.usageReports.totalSpend": "Gesamtausgaben",

  // Common – additional keys
  "common.breadcrumb": "Brotkrümelnavigation",

  /* ── API error messages ──────────────────────────────────── */
  "errors.unauthorized": "Nicht autorisiert",
  "errors.cartNotFound": "Warenkorb nicht gefunden",
  "errors.articleNotFound": "Artikel nicht gefunden",
  "errors.resellerProfileNotFound": "Wiederverkäuferprofil nicht gefunden",
  "errors.tenantNotFound": "Mandant nicht gefunden",
  "errors.deploymentNotFound": "Bereitstellung nicht gefunden",
  "errors.schemaMigrationGovernance":
    "Schema-Migrations-Governance-Voraussetzung wurde nicht erfüllt.",
  "errors.deploymentMigrationGate":
    "Deployment abgelehnt: Jede aufgeführte Schema-Migration muss mit einem Genehmiger abgeschlossen sein.",
  "errors.configVersionNotFound": "Konfigurationsversion nicht gefunden.",
  "errors.promotedDirectly": "Direkt befördert (keine Gates konfiguriert).",
  "errors.noActiveConfigVersion": "Keine aktive Konfigurationsversion zum Zurücksetzen vorhanden.",
  "errors.targetVersionAlreadyActive": "Zielversion ist bereits aktiv.",
  "errors.approvalNotFound": "Genehmigung nicht gefunden oder nicht ausstehend.",
  "errors.noActiveCatalogItem": "Produkt hat keinen aktiven Katalogartikel für diese Partei.",
  "errors.noResultsFound": "Keine Ergebnisse gefunden",
  "errors.dsarNotFound": "DSAR-Anfrage nicht gefunden.",
  "errors.dsarExportInvalidStatus":
    "Der Export kann nur für Anfragen im Entwurf- oder eingereicht-Status vorbereitet werden.",
  "errors.dsarPurgeInvalidStatus":
    "Die Löschung kann erst ausgeführt werden, nachdem die Anfrage zur Löschung freigegeben wurde.",

  /* ── Success messages ────────────────────────────────────── */
  "success.promotionApproved": "Beförderung genehmigt.",
  "success.configVersionActivated": "Konfigurationsversion aktiviert.",
  "success.shipmentCreated": "Sendung erstellt.",

  /* ── Labels ──────────────────────────────────────────────── */
  "labels.savings.automation": "Automatisierung",
  "labels.savings.inventory": "Bestand",

  /* ── Commerce ────────────────────────────────────────────── */
  "commerce.quickOrder.exampleSkus": "SKU-001 x 10\nSKU-002 x 5\nSKU-003 x 25",

  "commerce.customerOrders.title": "Kundenaufträge",
  "commerce.customerOrders.subtitle": "Offene Aufträge, Beträge und Fulfillment prüfen.",
  "commerce.customerOrders.action.browseCatalog": "Katalog durchsuchen",
  "commerce.customerOrders.action.viewOrder": "Auftrag ansehen",
  "commerce.customerOrders.search": "Aufträge durchsuchen",
  "commerce.customerOrders.searchLabel": "Kundenaufträge durchsuchen",
  "commerce.customerOrders.searchPlaceholder": "Nach Auftragsnummer oder Kunde suchen",
  "commerce.customerOrders.tableCaption": "Kundenaufträge",
  "commerce.customerOrders.listRegionLabel": "Kundenaufträge – Ergebnisse",
  "commerce.customerOrders.col.id": "Auftrag",
  "commerce.customerOrders.col.customer": "Kunde",
  "commerce.customerOrders.col.status": "Status",
  "commerce.customerOrders.col.amount": "Betrag",
  "commerce.customerOrders.col.date": "Aktualisiert",
  "commerce.customerOrders.pagination.count": "{start}–{end} von {count} Aufträgen",
  "commerce.customerOrders.empty.title": "Noch keine Kundenaufträge",
  "commerce.customerOrders.empty.description":
    "Aufträge aus Katalog und Angeboten erscheinen hier nach Bestellung.",
  "commerce.customerOrders.empty.cta": "Liste aktualisieren",
  "commerce.customerOrders.error.title": "Aufträge konnten nicht geladen werden",
  "commerce.customerOrders.error.retry": "Erneut versuchen",
  "commerce.customerOrders.detail.eyebrow": "Kundenauftrag",
  "commerce.customerOrders.detail.summaryLabel": "Auftragsübersicht",
  "commerce.customerOrders.detail.stat.status": "Status",
  "commerce.customerOrders.detail.attributesLabel": "Details",
  "commerce.customerOrders.detail.attributesTitle": "Auftragsattribute",
  "commerce.customerOrders.detail.fieldset.identity": "Identität und Kunde",
  "commerce.customerOrders.detail.fieldset.schedule": "Planung",
  "commerce.customerOrders.detail.lineItemsLabel": "Positionen",
  "commerce.customerOrders.detail.lineItemsTitle": "Produkte zu diesem Auftrag",
  "commerce.customerOrders.detail.lineItemsEmpty": "Keine Positionen für diesen Auftrag.",
  "commerce.customerOrders.detail.lineItemsTableCaption": "Auftragspositionen",
  "commerce.customerOrders.detail.col.description": "Beschreibung",
  "commerce.customerOrders.detail.col.qty": "Menge",
  "commerce.customerOrders.detail.col.total": "Zeilensumme",
  "commerce.customerOrders.detail.historyLabel": "Aktivität",
  "commerce.customerOrders.detail.historyTitle": "Zeitleiste Auftrag",
  "commerce.customerOrders.detail.timelineEmpty": "Noch keine Ereignisse.",
  "commerce.customerOrders.detail.action.editOrder": "Auftrag bearbeiten",
  "commerce.customerOrders.detail.action.deleteOrder": "Auftrag löschen",

  "commerce.rfqs.title": "Preisanfragen",
  "commerce.rfqs.subtitle": "RFV-Volumen, Verantwortliche und Nachfassen im Blick behalten.",
  "commerce.rfqs.action.createRequest": "Öffentliche RFQ starten",
  "commerce.rfqs.action.viewRequest": "Anfrage ansehen",
  "commerce.rfqs.search": "Anfragen durchsuchen",
  "commerce.rfqs.searchLabel": "RFQs durchsuchen",
  "commerce.rfqs.searchPlaceholder": "Nach Nr., Titel oder Kunde suchen",
  "commerce.rfqs.tableCaption": "Preisanfragen",
  "commerce.rfqs.listRegionLabel": "RFQ-Ergebnisse",
  "commerce.rfqs.col.id": "Anfrage",
  "commerce.rfqs.col.name": "Titel",
  "commerce.rfqs.col.customer": "Kunde",
  "commerce.rfqs.col.status": "Status",
  "commerce.rfqs.col.amount": "Budget",
  "commerce.rfqs.col.date": "Angefragt",
  "commerce.rfqs.pagination.count": "{start}–{end} von {count} Anfragen",
  "commerce.rfqs.empty.title": "Noch keine RFQs",
  "commerce.rfqs.empty.description": "Anfragen aus dem Shop erscheinen hier nach Eingang.",
  "commerce.rfqs.empty.cta": "Liste aktualisieren",
  "commerce.rfqs.error.title": "RFQs konnten nicht geladen werden",
  "commerce.rfqs.error.retry": "Erneut versuchen",
  "commerce.rfqs.detail.eyebrow": "Preisanfrage",
  "commerce.rfqs.detail.summaryLabel": "RFQ-Übersicht",
  "commerce.rfqs.detail.stat.status": "Status",
  "commerce.rfqs.detail.attributesLabel": "Details",
  "commerce.rfqs.detail.attributesTitle": "RFQ-Attribute",
  "commerce.rfqs.detail.fieldset.identity": "Identität und Kunde",
  "commerce.rfqs.detail.fieldset.schedule": "Planung",
  "commerce.rfqs.detail.lineItemsLabel": "Positionen",
  "commerce.rfqs.detail.lineItemsTitle": "Angefragte Positionen",
  "commerce.rfqs.detail.lineItemsEmpty": "Keine Positionen zu dieser Anfrage.",
  "commerce.rfqs.detail.lineItemsTableCaption": "RFQ-Positionen",
  "commerce.rfqs.detail.col.description": "Beschreibung",
  "commerce.rfqs.detail.col.qty": "Menge",
  "commerce.rfqs.detail.col.unitPrice": "Stückpreis",
  "commerce.rfqs.detail.historyLabel": "Aktivität",
  "commerce.rfqs.detail.historyTitle": "RFQ-Zeitleiste",
  "commerce.rfqs.detail.timelineEmpty": "Noch keine Ereignisse.",
  "commerce.rfqs.detail.action.editRequest": "Anfrage bearbeiten",
  "commerce.rfqs.detail.action.deleteRequest": "Anfrage löschen",

  /* ── Form aria-labels ──────────────────────────────────── */
  "forms.checkout.paymentMethod": "Zahlungsmethode auswählen",
  "forms.punchout.partyName": "Partnername",
  "forms.punchout.protocol": "Protokoll auswählen",
  "forms.quickOrder.csvFile": "CSV-Datei",
  "forms.spending.role": "Rolle auswählen",
  "forms.spending.limitAmount": "Limitbetrag",
  "forms.spending.currency": "Währung",
  "forms.spending.period": "Zeitraum auswählen",
  "forms.usageReports.groupBy": "Gruppieren nach",
  "forms.warehouse.name": "Lagername",
  "forms.warehouse.code": "Lagercode",
  "forms.warehouse.type": "Lagertyp auswählen",
  "forms.warehouse.site": "Lagerstandort",

  /* ── Additional errors ─────────────────────────────────── */
  "errors.faqNotFound": "FAQ nicht gefunden",

  /* ── UI standards (audit) ──────────────────────────────── */
  "common.undo": "Rückgängig",
  "common.moreActions": "Weitere Aktionen",
  "common.required": "erforderlich",
  "common.submitting": "Wird übermittelt…",
  "common.saving": "Wird gespeichert…",
  "common.bulkActionBar": "Stapelaktionsleiste",
  "common.dismissNotification": "Benachrichtigung schließen",
  "public.catalog.index.gridTitle": "Service-Tracks",
  "public.catalog.index.empty.title": "Noch keine Service-Tracks",
  "public.catalog.index.empty.description":
    "Service-Tracks erscheinen hier, sobald sie veröffentlicht sind.",
  "public.catalog.card.cardLabel": "Service-Track {title} ansehen",
  "public.home.catalog.cardLabel": "{title} ansehen",
  "public.products.empty.title": "Keine Produkte passen zu Ihrer Suche",
  "public.products.empty.description":
    "Versuchen Sie einen anderen Suchbegriff oder löschen Sie aktive Filter.",
  "public.products.empty.clear": "Suche zurücksetzen",
  "public.products.card.cardLabel": "Produkt {name} ansehen",
  "rfq.form.submitting": "Wird übermittelt…",
  "rfq.form.eyebrow": "Angebot anfragen",
  "rfq.form.pageDescription":
    "Beschreiben Sie Ihre Anforderungen — wir antworten innerhalb eines Werktages.",
  "rfq.thanks.returnToCatalog": "Zurück zum Katalog",
  "rfq.draft.title": "RFQ-Entwürfe",
  "rfq.draft.description": "Setzen Sie einen Entwurf fort, um Ihre Anfrage abzuschließen.",
  "assistant.stream.live": "Konversationsnachrichten",
  "assistant.empty.title": "Konversation starten",
  "assistant.empty.description":
    "Stellen Sie eine Frage zu Umfang, Lieferung oder kommerziellen Konditionen.",
  "assistant.error.disconnected.title": "Verbindung getrennt",
  "assistant.error.disconnected.description":
    "Der Konversationsstream wurde getrennt. Die Seite stellt automatisch eine neue Verbindung her.",
  "digital.twin.unsupported.title": "Ihr Browser unterstützt keine 3D-Anzeige",
  "digital.twin.unsupported.description":
    "Aktualisieren Sie auf einen modernen Browser oder aktivieren Sie WebGL, um den digitalen Zwilling anzuzeigen.",
  "admin.dsar.purgeConfirm.title": "Datensubjekt-Datensatz löschen?",
  "admin.dsar.purgeConfirm.description":
    "Dadurch werden alle Daten zu {subject} dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
  "admin.dsar.purgeConfirm.action": "Daten löschen",
  "admin.user.deleteConfirm.title": "Benutzer löschen?",
  "admin.user.deleteConfirm.description":
    "Damit werden alle Zugriffe für {user} entzogen und persönliche Daten entfernt. Nicht rückgängig zu machen.",
  "admin.user.deleteConfirm.action": "Benutzer löschen",
  "admin.tenant.suspendConfirm.title": "Mandant sperren?",
  "admin.tenant.suspendConfirm.description":
    "Alle Mitglieder von {tenant} verlieren sofort den Zugriff. Sie können später reaktivieren.",
  "admin.tenant.suspendConfirm.action": "Mandant sperren",
  "admin.config.promoteConfirm.title": "Konfiguration nach {env} promoten?",
  "admin.config.promoteConfirm.description":
    "Die ausgewählte Konfiguration wird in {env} aktiviert. Bestehende Werte werden archiviert.",
  "admin.config.promoteConfirm.action": "Konfiguration promoten",
  "profile.security.session.revokeConfirm.title": "Sitzung widerrufen?",
  "profile.security.session.revokeConfirm.description":
    "Die ausgewählte Sitzung wird auf dem Gerät sofort abgemeldet.",
  "profile.security.session.revokeConfirm.action": "Sitzung widerrufen",
  "profile.security.passkey.deleteConfirm.title": "Passkey löschen?",
  "profile.security.passkey.deleteConfirm.description":
    "Sie können sich mit diesem Passkey nicht mehr anmelden. Sie können jederzeit einen neuen registrieren.",
  "profile.security.passkey.deleteConfirm.action": "Passkey löschen",
  "tasks.kanban.moveTo": "Verschieben nach {status}",
  "cart.toast.removed": "Artikel aus Warenkorb entfernt",
  "support.replyForm.legend": "Auf Ticket antworten",
  "governance.generated.warning":
    "Dieses Artefakt wird generiert. Bearbeiten Sie stattdessen die kanonische Quelle.",
  "commerce.product.relatedHeading": "Verwandte Produkte",
  "common.a11y.toggleSidebar": "Seitenleiste umschalten",
  "common.a11y.toggleTheme": "Design umschalten",
  "common.a11y.mainNavigation": "Hauptnavigation",
  "common.a11y.topNavigation": "Obere Leiste",
  "common.a11y.openProfileMenu": "Profilmenü öffnen",
  "common.actions.settings": "Einstellungen",
  "common.actions.logout": "Abmelden",
  "hub.notifications.navbarTitle": "Benachrichtigungen",
  "nav.ecosystemSection": "Ökosystem",
} satisfies I18nDictionary<EnKey>;

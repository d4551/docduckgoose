import type { EnKey, I18nDictionary } from "./en";

/** FR translation dictionary generated from the English source. */
export const fr = {
  "app.name": "Plateforme d'exploitation",
  "app.tagline": "\nIntelligence opérationnelle des actifs",
  "layout.brand": "\nConsole d'exploitation",
  "layout.appHeader": "En-tête de l'application",
  "layout.mobileNav": "Navigation mobile principale",
  "layout.sync": "\nSynchronisation",
  "layout.toggleTheme": "\nChanger le mode couleur",
  "layout.authChromeNav": "\nNavigation de connexion",
  "layout.toggleDarkMode": "\nActiver le mode sombre",
  "layout.userMenu": "\nMenu utilisateur",
  "layout.userMenuOpen": "\nOuvrir le menu utilisateur pour {name}",
  "layout.signOut": "\nSe déconnecter",
  "layout.language": "\nLangue",
  "layout.languageMenu": "\nMenu de langue",
  "layout.languageDescription": "\nChanger la langue d'affichage",
  "layout.languageCurrent": "\nLangue actuelle : {language}",
  "layout.languageSelectAria": "\nChanger la langue en {language}",
  "layout.languageSaved": "\nLangue mise à jour.",
  "layout.releaseStage": "\nVersion préliminaire",
  "layout.footerNav": "\nNavigation en pied de page",
  "layout.footerTagline":
    "\nSurfaces d'opérations rendues par le serveur pour l'intelligence des actifs, le flux de maintenance et la visibilité transactionnelle.",
  "layout.footerThemeNote": "\nSystème de thèmes {brandName}",
  "layout.footerCopyright": "\nCopyright © 2026 {brandName}",
  "layout.logoAlt": "Plateforme d'exploitation",
  "roles.admin": "\nAdministrateur",
  "roles.estateManager": "\nGestionnaire immobilier",
  "roles.maintenanceLead": "\nResponsable de maintenance",
  "roles.fieldTechnician": "\nTechnicien de terrain",
  "roles.financeOfficer": "\nAgent financier",
  "roles.unknown": "\nOpérateur",
  "admin.systemCounters": "\nCompteurs système",
  "admin.createAdmin.databaseRequired":
    "\nDéfinissez DATABASE_URL avant d'exécuter le script d'amorçage de l'administrateur.",
  "admin.createAdmin.credentialsRequired":
    "\nDéfinissez CREATE_ADMIN_EMAIL et CREATE_ADMIN_PASSWORD avant d'exécuter le script d'amorçage de l'administrateur.",
  "admin.createAdmin.updatedRole":
    "\nL'utilisateur existant {email} a été mis à jour vers le rôle ADMIN.",
  "admin.createAdmin.createdUser": "\nUtilisateur administrateur créé : {email}",
  "common.summary": "\nRésumé",
  "common.applyFilters": "\nAppliquer des filtres",
  "common.userFallback": "\nOpérateur",
  "common.moreInfo": "\nPlus d’informations",
  "common.moreInfoFor": "\nPlus d’informations sur {subject}",
  "addDevice.form.submitAria": "\nSoumettre l'enregistrement de l'appareil",
  "layout.mobileNavigation": "\nNavigation mobile",
  "layout.headerNavigation": "\nNavigation d'en-tête",
  "layout.sidebarNavigation": "\nNavigation principale",
  "nav.dashboard": "\nTableau de bord",
  "nav.assets": "\nActifs",
  "nav.section.core": "\nNoyau",
  "nav.section.assets": "\nActifs",
  "nav.section.account": "\nCompte",
  "nav.section.operations": "\nOpérations",
  "nav.section.insights": "\nAperçus",
  "nav.section.finance": "\nFinances",
  "nav.section.documents": "\nDocuments",
  "nav.section.admin": "\nAdministration",
  "nav.section.home": "\nAccueil",
  "nav.section.operate": "\nUtiliser",
  "nav.section.monitor": "\nMoniteur",
  "nav.section.plan": "\nPlan",
  "nav.section.commercial": "\nCommercial",
  "nav.section.procurement": "\nApprovisionnement",
  "nav.section.control": "\nContrôle",
  "nav.predictions": "\nPrédictions",
  "nav.tasks": "\nTâches",
  "nav.finance": "\nFinances",
  "nav.financePlanning": "\nPlanification financière",
  "nav.estate": "\nSuccession",
  "nav.portfolio": "\nPortefeuille",
  "nav.rfqs": "\nAppels d'offres",
  "nav.customerOrders": "\nCommandes clients",
  "nav.workOrders": "\nBons de travail",
  "nav.purchaseOrders": "\nBons de commande",
  "nav.invoices": "\nFactures",
  "nav.fleet": "\nFlotte",
  "nav.buildings": "\nBâtiments",
  "nav.sensors": "\nCapteurs",
  "nav.reports": "\nRapports",
  "nav.aiPlayground": "Aire de jeu IA",
  "nav.agentic": "Agentique",
  "nav.agenticStorage": "Stockage agentique",
  "app.nav.git": "Espaces de travail",
  "app.nav.repos": "Dépôts hébergés",
  "app.nav.activity": "Activité de préparation au lancement",
  "registry.nav.publish": "Publier des paquets",
  "nav.sandbox": "Autorisations sandbox",
  "nav.utilisation": "\nUtilisation",
  "nav.admin": "Administration",
  "nav.digitalTwin": "\nJumeau numérique",
  "nav.openSidebar": "\nOuvrir la barre latérale",
  "nav.closeSidebar": "\nFermer la barre latérale",
  "nav.skipToContent": "\nPasser au contenu principal",
  "nav.breadcrumb": "\nFil d'Ariane",
  "nav.breadcrumbTruncated": "Plus",
  "nav.profile": "\nProfil",
  "nav.customisation": "\nPersonnalisation",
  "nav.kanban": "\nKanban",
  "nav.addDevice": "\nAjouter un appareil",
  "nav.deviceHistory": "\nHistorique de l'appareil",
  "nav.userRole": "\nRôle utilisateur",
  "locale.option.en": "\nAnglais",
  "locale.option.de": "\nAllemand",
  "locale.option.fr": "\nFrançais",
  "locale.option.es": "\nEspagnol",
  "locale.option.it": "\nItalien",
  "locale.option.pt": "\nPortugais",
  "public.meta.description":
    "\nUne plateforme unique pour la capture de la demande publique, les documents commerciaux, la visibilité des partenaires, les conseils de l'IA, le reporting et le commerce assisté par machine.",
  "public.nav.home": "\nAccueil",
  "public.nav.catalog": "\nCatalogue",
  "public.nav.requestQuote": "\nDemander un devis",
  "public.nav.startRfq": "\nDémarrer la demande de prix",
  "public.nav.signIn": "\nConnectez-vous",
  "public.assistant.breadcrumb.session": "\nSession assistant",
  "public.assistant.breadcrumb.transcript": "\nTranscription",
  "public.footer.description":
    "\nPrise en charge du public, contrôle commercial, visibilité des partenaires, conseils en matière d'IA, reporting et automatisation pour les opérations basées sur les documents.",
  "public.footer.rfq": "Demande de devis (RFQ)",
  "public.footer.portalSignIn": "\nConnexion au portail",
  "public.page.catalog": "\nCatalogue",
  "public.page.requestQuote": "\nDemander un devis",
  "public.page.rfqSubmitted": "\nDemande de prix soumise",
  "public.assistant.panel.eyebrow": "\nAssistant public",
  "public.assistant.panel.formAria": "\nDémarrer une session d'assistance publique",
  "public.assistant.panel.titleLabel": "\nTitre de la session",
  "public.assistant.panel.descriptionLabel": "\nInvite de session",
  "public.assistant.panel.titleHint":
    "\nUtilisez une étiquette courte qui correspond à l'étendue du service ou à la demande en cours de préparation.",
  "public.assistant.panel.descriptionHint":
    "Résumez la portée, le calendrier, les approbations et les contraintes de livraison que l'assistant doit préserver.",
  "public.assistant.panel.titlePlaceholder": "\nExemple : Planification de la fiabilité des actifs",
  "public.assistant.panel.descriptionPlaceholder":
    "\nExemple : capturez la portée du site, les dates demandées, les dépendances et les déclencheurs d'escalade avant la soumission de la demande d'offre.",
  "public.assistant.panel.helpText":
    "\nCela crée une session d'assistant public pour le contexte de la page actuelle.",
  "public.assistant.panel.launchError":
    "\nLa session assistant n'a pas pu être démarrée. Passez en revue le contexte actuel et réessayez.",
  "public.assistant.panel.submit": "\nDémarrer la session de l'assistant",
  "public.assistant.catalog.title": "\nAssistante catalogue",
  "public.assistant.catalog.description":
    "\nUtilisez les détails du catalogue actuel comme contexte, puis transmettez-le à la session de l'assistant public.",
  "public.assistant.rfq.title": "\nAssistant RFQ",
  "public.assistant.rfq.description":
    "\nCréez une session d'assistant public avec le contexte de la page RFQ avant de soumettre la demande.",
  "public.assistant.rfq.prompt":
    "\nCapturez le contexte de la demande, clarifiez la portée et préparez le transfert public.",
  "public.assistant.rfq.bundlePrompt":
    "\nCapturez le contexte de la demande groupée pour {services}, clarifiez la portée et préparez le transfert public.",
  "public.assistant.started.description":
    "\nLa séance d'assistance publique est prête. Continuez à affiner la demande avec le même contexte.",
  "public.assistant.started.openAction": "\nSession ouverte",
  "public.assistant.started.sessionLabel": "\nID de session publique",
  "public.assistant.started.restartAction": "\nDémarrer une autre session",
  "public.assistant.started.nextStepsTitle": "\nÉtapes suivantes",
  "public.assistant.started.nextStep.session":
    "\nContinuez la session en direct pour capturer les clarifications et préserver le contexte de l'acheteur.",
  "public.assistant.started.nextStep.context":
    "\nRevenez à la page actuelle lorsque vous devez mettre à jour la portée, les détails de la demande d'offre ou le contexte du catalogue.",
  "public.assistant.started.nextStep.handoff":
    "\nEscalader au sein de la session lorsqu'un examen par l'opérateur ou un transfert public est requis.",
  "public.assistant.workspace.eyebrow": "\nSéance d'assistance publique",
  "public.assistant.workspace.summaryTitle": "\nRésumé de la séance",
  "public.assistant.workspace.sessionBadge": "\nSession en direct",
  "public.assistant.workspace.sessionIdLabel": "\nID de session",
  "public.assistant.workspace.contextLabel": "\nContexte capturé",
  "public.assistant.workspace.messageCountLabel": "\nMessages capturés",
  "public.assistant.workspace.participantCountLabel": "\nParticipants",
  "public.assistant.workspace.linkedRecordCountLabel": "\nEnregistrements liés",
  "public.assistant.workspace.sameThreadLabel": "\nModèle de fil",
  "public.assistant.workspace.sameThreadValue": "\nFil de discussion unique persistant",
  "public.assistant.workspace.completenessLabel": "\nComplétude",
  "public.assistant.workspace.completenessReady": "\nPrêt pour le transfert commercial",
  "public.assistant.workspace.completenessNeedsWork":
    "\nCapturez plus de portée avant le transfert",
  "public.assistant.workspace.historyTitle": "\nHistorique des sessions",
  "public.assistant.workspace.historyStartedTitle": "\nConversation démarrée",
  "public.assistant.workspace.historyStartedEmpty": "\nEn attente du premier message capturé.",
  "public.assistant.workspace.historyStartedDescription":
    "\nLe premier message étendu a été capturé à {timestamp}.",
  "public.assistant.workspace.historyLatestTitle": "\nDernière mise à jour",
  "public.assistant.workspace.historyLatestEmpty": "\nAucun suivi n'a encore été enregistré.",
  "public.assistant.workspace.historyLatestDescription":
    "\n{author} a publié la dernière mise à jour sur {timestamp}.",
  "public.assistant.workspace.historyTranscriptTitle": "\nCouverture du relevé de notes",
  "public.assistant.workspace.historyTranscriptDescription":
    "Les entrées de transcription {count} sont disponibles pour l'exportation et la révision.",
  "public.assistant.workspace.historyParticipantsTitle": "\nContinuité des participants",
  "public.assistant.workspace.historyParticipantsDescription":
    "\nLes profils de participants {participants} sont attachés au même fil de discussion persistant.",
  "public.assistant.workspace.historyShareTitle": "\nEnregistrement partagé",
  "public.assistant.workspace.historyShareEmpty":
    "\nAucun enregistrement de demande de prix ou de catalogue associé n'est encore lié.",
  "public.assistant.workspace.historyShareDescription":
    "\nLié à {record} pour le prochain transfert de flux de travail.",
  "public.assistant.workspace.historyCloseoutTitle": "\nPréparation à la clôture",
  "public.assistant.workspace.historyCloseoutReady":
    "\nLa session dispose de suffisamment de contexte pour exporter, partager et acheminer vers le flux de travail suivant.",
  "public.assistant.workspace.historyCloseoutPending":
    "\nCapturez un peu plus de portée ou de lien avant de traiter cette session comme étant prête à être transférée.",
  "public.assistant.workspace.exportTranscript": "\nExporter la transcription",
  "public.assistant.transcript.documentTitle": "\nTranscription de l’assistant",
  "public.assistant.transcript.eyebrow": "\nAssistant public",
  "public.assistant.transcript.description":
    "\nHistorique complet des messages pour cette session. Utilisez votre navigateur pour imprimer ou enregistrer en PDF.",
  "public.assistant.transcript.backToConversation": "\nRetour à la conversation",
  "public.assistant.transcript.fallbackTitle": "\nSession {id}",
  "public.assistant.transcript.tableAria": "\nTranscription de la conversation",
  "public.assistant.transcript.colTime": "\nHeure",
  "public.assistant.transcript.colAuthor": "\nIntervenant",
  "public.assistant.transcript.colMessage": "\nMessage",
  "public.assistant.transcript.emptyTitle": "\nPas encore de messages",
  "public.assistant.transcript.emptyDescription":
    "\nLes messages apparaissent ici lorsque l’assistant enregistre des réponses dans cette session.",
  "public.assistant.transcript.notFoundTitle": "\nSession indisponible",
  "public.assistant.transcript.notFoundDescription":
    "\nImpossible de charger cette conversation. Elle a peut‑être expiré ou le lien est incorrect.",
  "public.assistant.workspace.shareSummary": "\nPartager le résumé",
  "public.assistant.workspace.shareHistoryHint":
    "\nPartagez le résumé du fil de discussion ou exportez la transcription avant de déplacer l'admission vers un flux de travail en aval.",
  "public.assistant.workspace.shareSubject": "\nRésumé de l'assistant public : {title}",
  "public.assistant.workspace.continuityTitle": "\nInstantané de continuité",
  "public.assistant.workspace.continuityDescription":
    "\nGardez le contexte de la session en direct, les enregistrements liés et la dernière réponse visibles avant le transfert.",
  "public.assistant.workspace.continuityContextLabel": "\nContexte de la page",
  "public.assistant.workspace.continuityParticipantsValue": "\n{count} participant(s)",
  "public.assistant.workspace.continuityContextFallback":
    "\nAucun contexte de page n'est encore attaché à cette session d'assistant public.",
  "public.assistant.workspace.continuityLinkedLabel": "\nEnregistrements liés",
  "public.assistant.workspace.continuityLinkedValue": "\n{count} enregistrement(s) lié(s)",
  "public.assistant.workspace.continuityLatestLabel": "\nDernière réponse",
  "public.assistant.workspace.continuityLatestValue": "\n{author} a répondu à {timestamp}.",
  "public.assistant.workspace.handoffTitle": "\nComment fonctionne le transfert",
  "public.assistant.workspace.handoffDescription":
    "\nUtilisez cette session pour saisir la portée, clarifier les exigences et passer aux opérations lorsqu'un examen commercial est nécessaire.",
  "public.assistant.workspace.stepCaptureTitle": "\nPortée de capture",
  "public.assistant.workspace.stepCaptureDescription":
    "\nConservez la portée, les dates, les approbations et les contraintes de l'acheteur dans la même session persistante.",
  "public.assistant.workspace.stepClarifyTitle": "\nClarifier avec AI",
  "public.assistant.workspace.stepClarifyDescription":
    "\nUtilisez des résumés et des réponses pour resserrer la demande sans perdre le contexte du fil de discussion existant.",
  "public.assistant.workspace.stepEscalateTitle": "\nEscalader proprement",
  "public.assistant.workspace.stepEscalateDescription":
    "\nCréez une note de transfert lorsque la session est prête pour l'examen interne par l'opérateur.",
  "public.assistant.workspace.composeDescription":
    "\nAjoutez des notes de session durables afin que la portée, le délai de livraison et les approbations restent attachés au même fil de discussion d'admission.",
  "public.assistant.workspace.composeHint":
    "\nCapturez le contexte de l'acheteur ici avant de demander un transfert d'opérateur.",
  "public.assistant.workspace.aiActionsDescription":
    "\nUtilisez des résumés pour resserrer le fil et des notes de transfert pour faire passer l'admission du public aux opérations.",
  "public.assistant.workspace.returnAction": "\nRetour à la page source",
  "public.assistant.workspace.missingTitle": "\nSession d'assistant public indisponible",
  "public.assistant.workspace.missingDescription":
    "La session d'assistant demandée n'a pas pu être chargée. Revenez à la page de détail du catalogue ou à la page RFQ pour démarrer une nouvelle session.",
  "public.catalog.card.track": "\nPiste de service",
  "public.catalog.card.viewScope": "\nAfficher la portée",
  "public.catalog.card.requestQuote": "\nDemander un devis",
  "public.catalog.card.deliverables": "livrables",
  "public.home.page.title":
    "\nUne plateforme unique pour la capture de la demande, le contrôle des livraisons et la visibilité des partenaires.",
  "public.home.page.description":
    "\n{brandName} transforme les demandes dispersées en commandes suivies.",
  "public.home.hero.badge": "\nSite public, opérations, portail, IA et UCP",
  "public.home.hero.title":
    "\nTransformez les demandes, les commandes, le travail sur le terrain, les achats et les rapports en un seul flux opérationnel connecté.",
  "public.home.hero.description":
    "\nSoumis jeudi, approuvé vendredi, suivi jusqu'à la facturation.",
  "public.home.hero.primaryCta": "\nLancer une RFQ",
  "public.home.hero.secondaryCta": "\nParcourir les solutions",
  "public.home.hero.stat.documents": "\nTypes de documents",
  "public.home.hero.stat.documentsValue": "6",
  "public.home.hero.stat.surfaces": "\nSurfaces",
  "public.home.hero.stat.surfacesValue": "4",
  "public.home.hero.stat.surfacesDesc": "Web, API, portail, UCP",
  "public.home.hero.stat.database": "\nEspaces de travail",
  "public.home.hero.stat.databaseValue": "3",
  "public.home.hero.stat.databaseDesc": "Ops, commerce, portail",
  "public.home.delivery.eyebrow": "\nModèle de livraison",
  "public.home.delivery.title": "\nCité, limité, visible par le partenaire.",
  "public.home.delivery.step.submit": "\nSoumettre la demande de prix",
  "public.home.delivery.step.qualify": "\nQualifier et citer",
  "public.home.delivery.step.convert": "\nConvertir en commande",
  "public.home.delivery.step.track": "\nSuivre l'exécution et la facturation",
  "public.home.map.aria": "\nRésumé des capacités de la plateforme",
  "public.home.map.intake.title": "\nAdmission",
  "public.home.map.intake.value": "\nSite public et UCP",
  "public.home.map.intake.description":
    "\nCapturez les demandes des acheteurs, des partenaires et les flux de paiement assistés par machine.",
  "public.home.map.documents.title": "\nDocuments",
  "public.home.map.documents.value": "\nAppels d'offres pour factures",
  "public.home.map.documents.description":
    "\nConservez les prix, les approbations, l'exécution, l'approvisionnement et la facturation dans un seul document.",
  "public.home.map.operations.title": "\nOpérations",
  "public.home.map.operations.value": "\nActifs, travail et télémétrie",
  "public.home.map.operations.description":
    "\nDéployer les équipes, surveiller l'activité, capturer l'achèvement.",
  "public.home.map.intelligence.title": "\nIntelligence",
  "public.home.map.intelligence.value": "\nIA, automatisation et ML",
  "public.home.map.intelligence.description":
    "\nRésumés IA, actions planifiées, prédictions de pénurie.",
  "public.home.flow.eyebrow": "\nFlux commercial",
  "public.home.flow.title": "\nComment le travail circule sur la plateforme",
  "public.home.flow.description":
    "\n{brandName} conserve la capture de la demande, la livraison, la visibilité des partenaires et les actions de suivi dans le même enregistrement au lieu de réintégrer le travail à travers des outils déconnectés.",
  "public.home.flow.step.capture.label": "\nCapturer",
  "public.home.flow.step.capture.content":
    "\nLes clients, partenaires ou clients machine commencent par un contexte de paiement de catalogue, de demande d'offre ou d'UCP.",
  "public.home.flow.step.qualify.label": "\nQualifier",
  "public.home.flow.step.qualify.content":
    "\nVerrouiller le périmètre, le calendrier et les tarifs.",
  "public.home.flow.step.deliver.label": "\nLivrer",
  "public.home.flow.step.deliver.content": "\nOrdre de travail émis, portail mis à jour.",
  "public.home.flow.step.improve.label": "\nAméliorer",
  "public.home.flow.step.improve.content": "\nAlertes, prévisions et scores de conformité.",
  "public.home.flow.card.eyebrow": "\nCommencez en externe, terminez par control",
  "public.home.flow.card.title":
    "\nCommencez par le besoin de l'entreprise, pas par un autre formulaire déconnecté.",
  "public.home.flow.card.description":
    "\nL'admission publique reste connectée aux documents en aval, aux preuves d'exécution, aux mises à jour du portail et à l'état des factures.",
  "public.home.flow.card.cta": "\nLancer une RFQ",
  "public.home.surfaces.eyebrow": "\nSurfaces de la plate-forme",
  "public.home.surfaces.title": "\nUne plateforme, quatre voies connectées dans",
  "public.home.surfaces.description":
    "\nDifférents publics utilisent des espaces de travail différents, mais ils dépendent tous du même dossier commercial sous-jacent.",
  "public.home.surfaces.public.eyebrow": "\nPublique",
  "public.home.surfaces.public.title": "\nSite public et commerce de machines",
  "public.home.surfaces.public.description":
    "\nUtilisez les pages de catalogue, la réception des appels d'offres et les points de terminaison du commerçant UCP pour lancer la demande des acheteurs ou des machines.",
  "public.home.surfaces.commerce.eyebrow": "\nCommercial",
  "public.home.surfaces.commerce.title": "\nContrôle commercial",
  "public.home.surfaces.commerce.description":
    "\nGardez les appels d'offres, les commandes clients, les bons de commande, les bons de travail et les factures connectés au lieu de les saisir à nouveau dans les outils.",
  "public.home.surfaces.operations.eyebrow": "\nOpérations",
  "public.home.surfaces.operations.title": "\nLivraison opérationnelle",
  "public.home.surfaces.operations.description":
    "\nGérez les actifs, les tâches, la planification, les finances, l'utilisation, la flotte, les bâtiments, les capteurs et la surveillance des jumeaux numériques.",
  "public.home.surfaces.portal.eyebrow": "\nPortail",
  "public.home.surfaces.portal.title": "\nVisibilité à l'échelle du partenaire",
  "public.home.surfaces.portal.description":
    "\nOffrez aux clients et partenaires une visibilité sur le statut partagé et discutez sans exposer l'ensemble de l'espace de travail interne.",
  "public.home.persona.eyebrow": "\nChoisissez votre point de départ",
  "public.home.persona.title": "\nAcheminez d'abord chaque public vers le bon espace de travail",
  "public.home.persona.description":
    "\nLes acheteurs doivent commencer par la capture de la portée, les opérateurs doivent atterrir dans l'espace de travail de commande et les partenaires doivent accéder au portail partagé sans chercher sur des écrans supplémentaires.",
  "public.home.persona.buyer.eyebrow": "\nAcheteur",
  "public.home.persona.buyer.title": "\nCapturez un besoin et passez directement à RFQ",
  "public.home.persona.buyer.description": "\nParcourir, comparer et demander un devis.",
  "public.home.persona.buyer.action": "Démarrer la collecte d'acheteurs",
  "public.home.persona.operations.eyebrow": "\nOpérateur",
  "public.home.persona.operations.title":
    "\nRevenir à l'espace de travail des opérations en direct",
  "public.home.persona.operations.description": "\nDéployer, surveiller et confirmer l'achèvement.",
  "public.home.persona.operations.action": "\nEspace de travail des opérations ouvertes",
  "public.home.persona.partner.eyebrow": "\nPartenaire",
  "public.home.persona.partner.title": "\nConnectez-vous au portail partenaire avec le bon compte",
  "public.home.persona.partner.description": "\nSuivre les livraisons et télécharger les factures.",
  "public.home.persona.partner.action": "\nAccès partenaire ouvert",
  "public.home.catalog.eyebrow": "\nCatalogue",
  "public.home.catalog.title": "\nVoies de service construites sur le même modèle opérationnel",
  "public.home.catalog.description":
    "\nCes offres publiques montrent comment la plateforme transforme les mouvements de services communs en livraison contrôlée et en exécution visible par les partenaires.",
  "public.home.catalog.seeAll": "\nVoir toutes les offres",
  "public.home.catalog.compareTitle":
    "\nComparez l'adéquation opérationnelle avant d'ouvrir un devis",
  "public.home.catalog.continuityTitle":
    "\nGardez la liste restreinte stable pendant que la demande progresse",
  "public.home.catalog.fitLabel": "\nAdéquation opérationnelle",
  "public.home.intelligence.eyebrow": "\nCouche de renseignement",
  "public.home.intelligence.title":
    "\nL'IA, le reporting, l'automatisation et le ML restent attachés aux mêmes enregistrements",
  "public.home.intelligence.description":
    "\nCes capacités ne constituent pas des produits ou des exportations distincts. Ils utilisent les mêmes commandes, travail, télémétrie et contexte de partenariat sur lesquels les équipes opèrent déjà.",
  "public.home.intelligence.supportTitle": "\nCe qui reste attaché au même enregistrement",
  "public.home.intelligence.ai.eyebrow": "\n.bao",
  "public.home.intelligence.ai.title": "\n.bao fabric avec contexte métier",
  "public.home.intelligence.ai.description":
    "\nRésumez les demandes, expliquez le contexte, comparez les activités associées et aidez les équipes à choisir la prochaine étape opérationnelle.",
  "public.home.intelligence.reporting.eyebrow": "\nReporting et science des données",
  "public.home.intelligence.reporting.title":
    "\nDes rapports et une science des données proches de l'exécution",
  "public.home.intelligence.reporting.description":
    "\nCréez des packs de rapports, des revues opérationnelles, des prévisions et des vues d'anomalies sans déplacer le travail vers un deuxième système.",
  "public.home.intelligence.automation.eyebrow": "\nAutomatisation",
  "public.home.intelligence.automation.title": "\nAutomatisation sur le même plan de contrôle",
  "public.home.intelligence.automation.description":
    "\nDéclenchez des workflows natifs Bun, un suivi planifié et des actions basées sur le ML à partir du même plan de contrôle.",
  "public.home.cta.title":
    "\nPrêt à connecter l'admission, la livraison, le reporting et la visibilité des partenaires ?",
  "public.home.cta.description":
    "\nCommencez par un appel d'offres si vous connaissez déjà le besoin, ou parcourez le catalogue si vous souhaitez d'abord voir les pistes de service.",
  "public.home.cta.primary": "\nLancer une RFQ",
  "public.home.cta.secondary": "\nParcourir les solutions",
  "public.catalog.index.eyebrow": "\nCatalogue",
  "public.catalog.index.title": "\nOffres d'exploitation basées sur des documents",
  "public.catalog.index.description":
    "Choisissez la piste opérationnelle qui correspond aux exigences du domaine, du fournisseur ou du service, puis lancez la demande d'offre avec le bon contexte.",
  "public.catalog.detail.eyebrow": "\nDétail du catalogue",
  "public.catalog.detail.startRfq": "\nDémarrer la demande de prix",
  "public.catalog.detail.backToCatalog": "\nRetour au catalogue",
  "public.catalog.detail.includedTitle": "\nCe qui est inclus",
  "public.catalog.detail.whyTitle": "\nPourquoi RFQ-first",
  "public.catalog.detail.tab.scope": "\nPortée",
  "public.catalog.detail.tab.approval": "\nApprobation",
  "public.catalog.detail.tab.delivery": "\nLivraison",
  "public.catalog.detail.summaryTitle": "\nRésumé de la décision",
  "public.catalog.detail.summaryScopeValue": "\nCadrage prêt",
  "public.catalog.detail.summaryApprovalValue": "\nRevue commerciale alignée",
  "public.catalog.detail.summaryDeliveryValue": "\nTransfert préparé",
  "public.catalog.detail.shortlistLabel": "\nComparez la posture",
  "public.catalog.detail.shortlistSelectedValue": "\nDéjà sur la liste restreinte",
  "public.catalog.detail.shortlistAvailableValue": "\nDisponible pour comparer et regrouper",
  "public.catalog.detail.continuityLabel": "\nContinuité",
  "public.catalog.detail.continuityBundled": "\nRegroupez ce service dans le RFQ",
  "public.catalog.detail.continuitySingle": " partagé\nRéalisez ce service dans un seul RFQ",
  "public.catalog.detail.shareHistoryTitle": "\nPartager et reporter",
  "public.catalog.detail.shareHistoryDescription":
    "\nGardez le même contexte de service visible pendant que vous exportez le brief, partagez le pack et passez au workflow RFQ ou assistant.",
  "public.catalog.detail.shareHistoryShortlistTitle": "\nPosture de la présélection",
  "public.catalog.detail.shareHistoryShortlistReady":
    "\nCe service figure déjà sur la liste restreinte et peut être regroupé dans l'appel d'offres partagé.",
  "public.catalog.detail.shareHistoryShortlistSingle":
    "\nCe service peut démarrer comme un appel d'offres pour un seul service et se développer ultérieurement sans perdre le contexte.",
  "public.catalog.detail.shareHistoryBriefTitle": "\nBrief export",
  "public.catalog.detail.shareHistoryBriefDescription":
    "\nExportez le brief lorsque les réviseurs internes ont besoin du résumé du service avant le début de la demande d'offre.",
  "public.catalog.detail.shareHistoryAssistantTitle": "\nTransfert de l'assistant",
  "public.catalog.detail.shareHistoryAssistantDescription":
    "\nUtilisez le lancement de l'assistant et le chemin du bundle {href} pour conserver le même contexte de service attaché à l'apport suivant.",
  "public.catalog.detail.checklistScope": "\nConfirmer le champ d'application",
  "public.catalog.detail.checklistApproval":
    "\nAligner la posture de tarification et d'approbation",
  "public.catalog.detail.checklistHandoff":
    "\nTransférer le contexte dans la demande de prix ou la révision adjointe",
  "public.catalog.detail.exportBrief": "\nExporter le brief",
  "public.catalog.detail.sharePack": "\nPartager le pack",
  "public.catalog.detail.whyDescription":
    "\nLa RFQ capture la portée, les contacts clients, les dates demandées et le contexte commercial dès le départ, ce qui permet de maintenir les bons de travail et les factures en aval ancrés dans la même trace documentaire.",
  "public.catalog.compare.title": "\nPrésélectionner et comparer",
  "public.catalog.compare.description":
    "\nGardez une petite liste restreinte de travail visible pendant que vous comparez les pistes de service, puis transférez la portée sélectionnée dans un RFQ groupé.",
  "public.catalog.compare.shortlistLabel": "\nListe restreinte de travail",
  "public.catalog.compare.shortlistValue": "\n{count} prestations visibles",
  "public.catalog.compare.bundleLabel": "\nReport de la demande de prix",
  "public.catalog.compare.bundleValue":
    "\nTransporter la portée sélectionnée dans une seule requête",
  "public.catalog.compare.compareLabel": "\nMode de comparaison",
  "public.catalog.compare.compareValue":
    "\nExaminez le titre, le résumé et les faits saillants côte à côte",
  "public.catalog.compare.continuityLabel": "\nPosture de continuité",
  "public.catalog.compare.continuityReady": "\nListe restreinte prête pour l'appel d'offres groupé",
  "public.catalog.compare.continuityWaiting": "Ajoutez d'abord des services à la liste restreinte",
  "public.catalog.compare.continuityPanelTitle": "\nContinuité de la liste restreinte",
  "public.catalog.compare.continuityPanelDescription":
    "\nLa liste restreinte suit le même flux de travail public afin que le travail de comparaison puisse se poursuivre lors des nouvelles visites, des connexions et du report des appels d'offres.",
  "public.catalog.compare.continuityPersistTitle": "\nConserver la liste restreinte",
  "public.catalog.compare.continuityPersistReady":
    "\nLa liste restreinte actuelle est déjà active et prête à être comparée ou reportée à la demande de prix.",
  "public.catalog.compare.continuityPersistWaiting":
    "\nAjoutez le premier service pour démarrer la liste restreinte persistante pour ce flux de travail.",
  "public.catalog.compare.continuityMergeTitle": "\nFusionner lors de la connexion",
  "public.catalog.compare.continuityMergeDescription":
    "\nLes choix de la liste restreinte anonyme sont fusionnés dans la liste restreinte connecté lorsque le même utilisateur poursuit la sélection.",
  "public.catalog.compare.continuityBundleTitle": "\nRegrouper en aval",
  "public.catalog.compare.continuityBundleDescription":
    "\nRegroupez les services présélectionnés dans une seule demande de prix au lieu de recréer la décision de comparaison ultérieurement.",
  "public.catalog.compare.progressTitle": "\nComparer le flux de travail",
  "public.catalog.compare.progressDescription":
    "\nChoisissez la liste restreinte, comparez les options visibles, puis regroupez la portée sélectionnée dans la RFQ.",
  "public.catalog.compare.workspaceHint":
    "\nPassez en revue chaque service sur le même écran avant de le poursuivre.",
  "public.catalog.compare.stepShortlist": "\nListe restreinte",
  "public.catalog.compare.stepCompare": "\nComparez",
  "public.catalog.compare.stepBundle": "\nAppel d'offres groupé",
  "public.catalog.compare.priceLabel": "\nPrix indicatif",
  "public.catalog.compare.bundleAction": "\nPortée présélectionnée du bundle",
  "public.catalog.compare.empty":
    "\nPrésélectionnez les services ici pour que le plateau de comparaison reste persistant.",
  "public.catalog.shortlist.add": "\nAjouter à la liste restreinte",
  "public.catalog.shortlist.remove": "\nSupprimer de la liste restreinte",
  "public.rfq.eyebrow": "\nDemande de devis",
  "public.rfq.title": "\nCapturez le travail avant qu'il ne commence.",
  "public.rfq.description":
    "\nSoumettez le besoin d’exploitation une seule fois. Nous l'utilisons pour qualifier la portée, le prix du travail et assurer la traçabilité de la livraison des partenaires jusqu'à l'exécution.",
  "public.rfq.bundle.label": "\nServices groupés",
  "public.rfq.bundle.loaded": "\nPortée groupée chargée pour {services}.",
  "public.rfq.bundle.returnToCatalog": "\nRevenir à la portée du catalogue groupé",
  "public.rfq.bundle.summarySingle": "\nDemander un devis pour {title}.",
  "public.rfq.bundle.summaryMultiple": "\nRequest a quote for the bundled scope: {titles}.",
  "public.rfq.bundle.titleSingle": "\nDemande de prix pour {title}",
  "public.rfq.bundle.titleMultiple": "\nRFQ pour {primary} + {count} plus",
  "public.rfq.form.aria": "\nFormulaire de demande de devis",
  "public.rfq.form.title": "\nTitre de la demande",
  "public.rfq.form.summary": "\nRésumé opérationnel",
  "public.rfq.form.contactEmail": "\nE-mail de contact",
  "public.rfq.form.requestedBy": "\nDemandé par",
  "public.rfq.form.budget": "\nOrientations budgétaires",
  "public.rfq.form.requirements": "\nExigences ou éléments de campagne",
  "public.rfq.form.requirementsPlaceholder": "\nUne exigence par ligne",
  "public.rfq.submit": "\nSoumettre la demande de prix",
  "public.rfq.reviewCatalog": "\nRevoir le catalogue",
  "public.rfq.workspace.title": "\nEspace de travail RFQ",
  "public.rfq.workspace.description":
    "\nCapturez le résumé opérationnel, les détails des exigences et le calendrier commercial dans un espace de travail intermédiaire avant que la demande ne soit convertie en aval.",
  "public.rfq.workspace.fact.scopeLabel": "\nPosture de la lunette",
  "public.rfq.workspace.fact.scopeValue": "\nBrief acheteur en cours",
  "public.rfq.workspace.fact.responseLabel": "\nModèle de réponse",
  "public.rfq.workspace.fact.responseValue": "Qualification, devis et suivi du portail",
  "public.rfq.workspace.draftTitle": "\nEspace de travail brouillon",
  "public.rfq.workspace.draftDescription":
    "\nCette demande de prix reste à l'état de brouillon jusqu'à ce que vous la soumettiez. Utilisez l'assistant et la révision du catalogue pour affiner d'abord le brief.",
  "public.rfq.workspace.draftStatusLabel": "\nStatut du brouillon",
  "public.rfq.workspace.draftStatusValue": "\nProjet de travail",
  "public.rfq.workspace.resumeLabel": "\nReprendre le chemin",
  "public.rfq.workspace.resumeValue": "\nGardez le même contexte de demande ouvert ici",
  "public.rfq.workspace.draftHint":
    "\nEnregistrez le brouillon ici, puis revenez au même contexte de demande sans reconstruire l'admission.",
  "public.rfq.workspace.draftEmptyTitle": "Aucun champ rempli",
  "public.rfq.workspace.draftEmptyFields": "0 sur 6 champs remplis",
  "public.rfq.workflow.progressLabel": "\nAchèvement du projet",
  "public.rfq.workflow.progressValue": "\n{percent}% terminé",
  "public.rfq.workflow.reviewStageLabel": "\nÉtape de révision",
  "public.rfq.workflow.lastUpdatedLabel": "\nDernière mise à jour",
  "public.rfq.workflow.collaboratorHeading": "\nÉtat du collaborateur",
  "public.rfq.workflow.collaboratorPending": "\nEn attente du contact collaborateur",
  "public.rfq.workflow.collaboratorValue": "\nRéviseur : {email}",
  "public.rfq.workflow.supportTitle": "\nPosture de révision et de collaboration",
  "public.rfq.workflow.supportDescription":
    "\nGardez l'étape de révision actuelle, l'état du collaborateur et le dernier brouillon de mise à jour visibles avant que la demande ne soit soumise.",
  "public.rfq.workflow.stage.capture": "\nPortée de capture",
  "public.rfq.workflow.stage.review": "\nRéviser le brouillon",
  "public.rfq.workflow.stage.ready": "\nPrêt à soumettre",
  "public.rfq.workflow.historyTitle": "\nBrouillon d'activité",
  "public.rfq.workflow.historyDescription":
    "\nLes mises à jour suivies {count} conservent la demande dans un historique de flux de travail partagé.",
  "public.rfq.workflow.activity.placeholderTitle": "\nBrouillon commencé",
  "public.rfq.workflow.activity.placeholderDescription":
    "\nGardez le brief de l'acheteur en mouvement ici avant qu'il ne devienne une demande d'offre soumise.",
  "public.rfq.workflow.activity.createdTitle": "\nBrouillon créé",
  "public.rfq.workflow.activity.createdDescription":
    "\n{actor} a ouvert {requestNumber} en tant que brouillon suivi.",
  "public.rfq.workflow.activity.updatedTitle": "\nBrouillon mis à jour",
  "public.rfq.workflow.activity.updatedDescription":
    "\n{actor} a déplacé le brief vers {progress} et {reviewStage}.",
  "public.rfq.workflow.systemActor": "\nFlux de travail du système",
  "public.rfq.draft.save": "\nEnregistrer le brouillon",
  "public.rfq.draft.saved": "\nBrouillon enregistré {requestNumber}.",
  "public.rfq.draft.loaded": "\nReprise du brouillon {requestNumber}.",
  "public.rfq.draft.resumeReady": "\nReprenez le brief acheteur enregistré ici",
  "public.rfq.draft.fallbackTitle": "\nProjet de demande de prix publique",
  "public.rfq.draft.error.empty": "\nAjoutez au moins un champ avant d'enregistrer un brouillon.",
  "public.rfq.workspace.checklist.summaryTitle": "\nRésumer le besoin opérationnel",
  "public.rfq.workspace.checklist.summaryDescription":
    "\nDécrivez l'objectif commercial, les sites concernés et l'urgence afin que le tri commence par le bon contexte commercial.",
  "public.rfq.workspace.checklist.requirementsTitle":
    "\nAjouter des exigences et des détails sur les éléments de campagne",
  "public.rfq.workspace.checklist.requirementsDescription":
    "\nRépertoriez les contraintes, les quantités et les pièces jointes avant que la demande ne soit tarifée ou convertie en travail.",
  "public.rfq.workspace.checklist.handoffTitle": "\nPréparer le transfert en aval",
  "public.rfq.workspace.checklist.handoffDescription":
    "\nConservez les contacts, les dates et les orientations budgétaires dans le même dossier afin que l'équipe suivante ne recommence pas la collecte.",
  "public.rfq.next.title": "\nQue se passe-t-il ensuite",
  "public.rfq.next.step.qualify": "\nExamen de la qualification et de l'adéquation du site",
  "public.rfq.next.step.convert": "\nConversion de devis, de commandes et d'ordres de travail",
  "public.rfq.next.step.portal": "\nMises à jour du portail partenaire jusqu'à la fin",
  "public.rfq.workspace.stepDraft": "\nBrouillon",
  "public.rfq.workspace.stepReview": "\nAvis",
  "public.rfq.workspace.stepSubmit": "\nSoumettre",
  "public.rfq.workspace.stepPortal": "\nTransfert du portail",
  "public.rfq.thanks.alert": "\nLa demande de prix {requestNumber} a été soumise avec succès.",
  "public.rfq.thanks.title": "Votre demande est en cours de triage.",
  "public.rfq.thanks.description":
    "\nConservez le numéro de référence pour le suivi. Si votre équipe reçoit une invitation au portail, la même demande apparaîtra dans l'historique des documents partagés.",
  "public.rfq.thanks.returnCatalog": "\nRetour au catalogue",
  "public.rfq.thanks.submitAnother": "\nSoumettre une autre RFQ",
  "public.rfq.thanks.pending": "\nEn attente",
  "public.rfq.thanks.nextTitle": "\nContinuer la demande sans perdre le contexte",
  "public.rfq.thanks.nextDescription":
    "\nInvitez des collaborateurs, continuez à déplacer les fichiers de support et acheminez le même numéro de demande vers la conversation suivante au lieu de démarrer une deuxième prise.",
  "public.rfq.thanks.collaborate": "\nInviter des collaborateurs",
  "public.rfq.thanks.collaborationSubject": "\nExamen de la demande de prix {requestNumber}",
  "public.rfq.thanks.collaborationBody":
    "\nLa RFQ {requestNumber} est prête à être examinée. Veuillez continuer la même demande au lieu de commencer une nouvelle admission.",
  "public.catalog.assetReliability.title": "\nProgrammes de fiabilité des actifs",
  "public.catalog.assetReliability.summary":
    "\nMaintenance planifiée, triage de la criticité et exécution du cycle de vie pour les sites distribués.",
  "public.catalog.assetReliability.detail":
    "\nRegroupez la planification de la fiabilité, l'exécution des ordres de travail et le reporting en un seul rythme opérationnel pour les parcs et les équipes de terrain.",
  "public.catalog.assetReliability.highlight1": "\nAudits de fiabilité et gestion du backlog",
  "public.catalog.assetReliability.highlight2": "\nPlanification des interventions site par site",
  "public.catalog.assetReliability.highlight3": "\nPreuve d'achèvement et rapport de récupération",
  "public.catalog.procureToPay.title": "\nOpérations Procure-to-Pay",
  "public.catalog.procureToPay.summary":
    "\nWorkflows de demande d’offre, de bon de commande, de réception et de facturation avec visibilité des partenaires.",
  "public.catalog.procureToPay.detail":
    "\nDéplacez les achats d'événements isolés vers un contrôle des documents adapté aux fournisseurs avec un historique d'approbation, de réception et de facturation.",
  "public.catalog.procureToPay.highlight1":
    "\nIntégration des fournisseurs et coordination des appels d'offres",
  "public.catalog.procureToPay.highlight2": "\nSuivi du cycle de vie des bons de commande",
  "public.catalog.procureToPay.highlight3":
    "\nVisibilité sur la réception, la facturation et les délais",
  "public.catalog.fieldServices.title": "\nServices sur le terrain basés sur les documents",
  "public.catalog.fieldServices.summary":
    "\nCommandes clients, bons de travail, factures et mises à jour du portail à partir d'un graphique opérationnel partagé.",
  "public.catalog.fieldServices.detail":
    "\nTransformez les exigences entrantes en travail contrôlé, en progrès visibles par les partenaires et en résultats prêts à être facturés sans ajouter de complexité au paiement.",
  "public.catalog.fieldServices.highlight1": "\nConversion de l'appel d'offres à la commande",
  "public.catalog.fieldServices.highlight2": "\nExécution basée sur TaskCard",
  "public.catalog.fieldServices.highlight3": "\nSuivi des factures et du statut des paiements",
  "auth.signIn.title": "\nConnectez-vous",
  "auth.signIn.subtitle": "\nAccédez à la plateforme d'exploitation",
  "auth.signIn.pageTitle": "\nSe connecter — Plateforme d'exploitation",
  "auth.signIn.moreDetailsSummary": "\nDétails de session et autres options de connexion",
  "auth.signIn.ssoContinueLoading": "\nPoursuite…",
  "auth.signIn.heading": "\nBienvenue",
  "auth.signIn.subheading": "\nConnectez-vous pour accéder à la plateforme",
  "auth.signIn.email": "\nAdresse e-mail",
  "auth.signIn.emailLabel": "\nAdresse e-mail",
  "auth.signIn.emailPlaceholder": "\njane@company.com",
  "auth.signIn.password": "\nMot de passe",
  "auth.signIn.passwordLabel": "\nMot de passe",
  "auth.signIn.passwordPlaceholder": "\n••••••••",
  "auth.signIn.helper": "\nUtilisez vos informations d'identification enregistrées",
  "auth.signIn.loading": "\nConnexion...",
  "auth.signIn.submit": "\nSe connecter à l'espace de travail",
  "auth.signIn.forgotPassword": "\nMot de passe oublié ?",
  "auth.signIn.unauthorized": "\nVeuillez vous connecter pour continuer.",
  "auth.required": "\nAuthentification requise.",
  "auth.signOut": "\nDéconnexion",
  "dashboard.title": "\nTableau de bord des opérations",
  "dashboard.subtitle": "\nRésumé des performances en direct et des renseignements",
  "dashboard.welcome": "\nBon retour, {name}",
  "dashboard.kpi.assetHealth": "\nSanté des actifs",
  "dashboard.kpi.openTasks": "\nTâches ouvertes",
  "dashboard.kpi.predictionAlerts": "\nAlertes de prédiction",
  "dashboard.kpi.utilisation": "\nUtilisation",
  "dashboard.kpi.spend": "\nDépenses commerciales",
  "dashboard.kpi.depreciation": "\nExposition à la dépréciation",
  "dashboard.kpi.placeholderValue": "\nChargement",
  "dashboard.kpi.predictionsDueDescription": "\nDurée de vie restante <= {days} jours",
  "dashboard.kpi.totalAssetsDescription": "\nSur tous les sites",
  "dashboard.kpi.activeTasksDescription": "\nCarnet de commandes, planifié et en cours",
  "dashboard.kpi.utilisationDescription": "\nDérivé des heures d'utilisation moyennes",
  "dashboard.kpi.noOverdueTasks": "\nAucune tâche en retard",
  "dashboard.kpi.deadlinePassed": "\nLa date limite est passée",
  "dashboard.kpi.depreciationDescription": "\nValeur comptable actuelle totale",
  "dashboard.refresh": "\nActualisation automatique toutes les {seconds} secondes",
  "dashboard.quickActions": "\nActions rapides",
  "dashboard.quickActions.subtitle": "\nAccédez aux zones clés de la plateforme",
  "dashboard.greeting.morning": "\nBonjour, {name}",
  "dashboard.greeting.afternoon": "\nBonjour, {name}",
  "dashboard.greeting.evening": "\nBonsoir, {name}",
  "dashboard.kpi.sectionTitle": "\nIndicateurs de performances",
  "dashboard.kpi.sectionSubtitle": "\nRésumé des performances en direct et des renseignements",
  "dashboard.kpi.trendVsPreviousMonth": "\npar rapport au mois précédent",
  "dashboard.kpi.trendPendingComparison":
    "\nLes données comparatives ne sont pas encore disponibles.",
  "dashboard.dateLabel": "\nAujourd'hui",
  "dashboard.chat.pageContext":
    "\nTableau de bord des opérations. Indicateurs clés : {kpis}. Rôle utilisateur : {role}.",
  "dashboard.quickAction.assets": "\nParcourir le registre des actifs",
  "dashboard.quickAction.addDevice": "\nEnregistrer un nouvel appareil",
  "dashboard.quickAction.deviceHistory": "\nAfficher l'historique de maintenance",
  "dashboard.quickAction.digitalTwin": "\nExplorez le jumeau numérique 3D",
  "dashboard.quickAction.tasks": "\nGérer le tableau des tâches",
  "dashboard.quickAction.kanban": "\nAfficher le tableau Kanban",
  "dashboard.quickAction.predictions": "\nPrédictions et alertes IA",
  "dashboard.quickAction.utilisation": "\nCockpit d'utilisation",
  "dashboard.quickAction.fleet": "\nPosition du véhicule et charge d'entretien",
  "dashboard.quickAction.buildings": "\nCouverture des installations et préparation aux jumeaux",
  "dashboard.quickAction.sensors": "\nCouverture de télémétrie et santé de l'appareil",
  "dashboard.quickAction.reports": "\nGénérer des rapports",
  "dashboard.quickAction.finance": "\nAmortissement et valorisation",
  "dashboard.quickAction.financePlanning": "\nBudgets, scénarios et situation du capital",
  "dashboard.quickAction.admin": "\nAdministration du système",
  "dashboard.quickAction.apiExplorer": "\nRéférence API",
  "dashboard.quickAction.profile": "\nVotre profil",
  "dashboard.quickAction.customisation": "\nThème et préférences",
  "assets.title": "\nRegistre des actifs",
  "assets.subtitle": "\nRechercher, inspecter et trier les actifs d'infrastructure",
  "assets.searchLabel": "\nRechercher des éléments",
  "assets.searchPlaceholder": "\nSaisissez le nom de l'actif, la RFID ou le site",
  "assets.filterLabel": "\nType d'actif",
  "assets.filterAll": "\nTous types",
  "assets.savedView.label": "\nVue enregistrée",
  "assets.savedView.all": "\nTous les actifs",
  "assets.savedView.critical": "\nÉtat critique",
  "assets.savedView.fatiguing": "\nCycle de vie fatigant",
  "assets.savedView.watch": "\nListe de surveillance",
  "assets.columnSet.label": "\nEnsemble de colonnes",
  "assets.columnSet.description":
    "\nBasculez les colonnes de l'espace de travail des actifs vers la perspective opérationnelle, de portefeuille ou de gouvernance.",
  "assets.columnSet.footer":
    "\nUtilisez l'ensemble de colonnes qui correspond au contexte de révision actuel avant d'exporter ou de partager l'espace de travail.",
  "assets.columnSet.operations": "\nOpérationnel",
  "assets.columnSet.portfolio": "\nPortefeuille",
  "assets.columnSet.governance": "\nGouvernance",
  "assets.compare.add": "\nAjouter pour comparer",
  "assets.compare.remove": "\nSupprimer de compare",
  "assets.compare.title": "\nComparer le bac",
  "assets.compare.description":
    "\nConservez jusqu'à {count} actifs côte à côte pendant que vous examinez l'état, la hiérarchie et le contexte du site.",
  "assets.compare.emptyDescription":
    "Sélectionnez les actifs dans le tableau pour conserver un plateau de comparaison en direct visible ici.",
  "assets.compare.savedViewDescription":
    "\nGardez le contexte de la vue enregistrée visible lorsque vous vous déplacez entre les perspectives de comparaison et celles de l'ensemble de colonnes.",
  "assets.compare.footer":
    "\nLes sélections de comparaison restent attachées à l'URL de l'espace de travail actuel pour un chemin de révision partagé.",
  "assets.filterApply": "\nAppliquer des filtres",
  "assets.kpi.total": "\nActif total",
  "assets.kpi.critical": "\nÉtat critique",
  "assets.kpi.fatiguing": "\nCycle de vie fatigant",
  "assets.summary.title": "\nPortefeuille d'actifs",
  "assets.summary.description": "\nRéférence de l'inventaire opérationnel",
  "assets.table.name": "\nActif",
  "assets.table.type": "\nTapez",
  "assets.table.site": "\nSite",
  "assets.table.condition": "\nÉtat",
  "assets.table.hierarchy": "\nHiérarchie",
  "assets.table.lifecycle": "\nCycle de vie",
  "assets.table.bookValue": "\nValeur comptable",
  "assets.table.lastInspection": "\nDernière inspection",
  "assets.table.action": "\nAction",
  "assets.table.open": "\nOuvert",
  "assets.export.csv": "\nExporter CSV",
  "assets.export.pdf": "\nExporter PDF",
  "assets.export.id": "Identifiant",
  "assets.export.purchaseDate": "\nDate d'achat",
  "assets.export.purchasePrice": "\nPrix d'achat",
  "assets.export.rfidTag": "\nÉtiquette RFID",
  "assets.export.hierarchy": "\nNiveau hiérarchique",
  "assets.export.parentAsset": "\nActif parent",
  "assets.export.capability": "\nLien de capacité",
  "assets.export.utilisationHours": "\nHeures d'utilisation",
  "assets.export.unsupportedFormat": "\nFormat non pris en charge. Utilisez format=csv",
  "assets.inspector.aiPrompt":
    "\nExaminez l’actif {name} à {site}. Résumez le risque actuel, l'état de préparation et la prochaine meilleure action dans le contexte de l'inspecteur sélectionné.",
  "assets.workspace.summaryTitle": "Registre d'actifs",
  "assets.workspace.summarySupporting": "Tous types, tous sites",
  "assets.workspace.filterBarEyebrow": "Filtres",
  "assets.workspace.filterBarTitle": "Rechercher et affiner les actifs",
  "assets.workspace.filterBarDescription":
    "\nLa recherche met à jour le registre après une courte pause de saisie. Les listes s'appliquent immédiatement ; utilisez Appliquer les filtres pour actualiser après des modifications manuelles.",
  "assets.inspector.emptyEyebrow": "Inspecteur d'actifs",
  "assets.inspector.emptyTitle": "Aucun actif sélectionné",
  "assets.inspector.conditionLabel": "État",
  "assets.inspector.openTasksLabel": "Tâches ouvertes",
  "assets.inspector.predictionsLabel": "Prédictions",
  "assets.inspector.emptyDescription":
    "\nChoisissez une ligne dans le registre des actifs pour inspecter les risques, l'état de préparation et les actions recommandées.",
  "assets.media.title": "\nPhotos",
  "assets.media.empty": "\nPas encore de photo",
  "assets.media.upload": "\nTélécharger la photo",
  "assets.media.viewImage": "\nVoir l'image",
  "assets.media.annotate": "\nAnnoter",
  "addDevice.title": "\nAjouter un appareil",
  "addDevice.subtitle":
    "\nEnregistrez un nouvel appareil et mappez-le à votre flotte opérationnelle",
  "addDevice.form.title": "\nEnregistrement de l'appareil",
  "addDevice.form.nameLabel": "\nNom de l'appareil",
  "addDevice.form.serialLabel": "\nSignal série/RF",
  "addDevice.form.typeLabel": "\nCatégorie d'appareil",
  "addDevice.form.siteLabel": "\nSite de déploiement",
  "addDevice.form.sitePlaceholder": "\nSélectionnez un site de déploiement",
  "addDevice.form.siteHint":
    "\nChoisissez parmi {count} sites actifs dans le registre opérationnel en direct.",
  "addDevice.form.siteLabelWithId": "\nSite de déploiement / ID",
  "addDevice.form.lifecycleLabel": "\nÉtape du cycle de vie",
  "addDevice.form.lifecycleActive": "\nActif",
  "addDevice.form.lifecycleMonitor": "\nSurveillance",
  "addDevice.form.lifecycleFatiguing": "\nFatiguant",
  "addDevice.form.lifecycleDisposed": "\nÉliminé",
  "addDevice.form.lifecycleDefault": "\nActif",
  "addDevice.form.conditionLabel": "\nÉtat",
  "addDevice.form.conditionAny": "\nN'importe lequel",
  "addDevice.form.gpsLatLabel": "\nLatitude GPS",
  "addDevice.form.gpsLonLabel": "\nLongitude GPS",
  "addDevice.form.purchasePriceLabel": "\nPrix d'achat",
  "addDevice.form.bookValueLabel": "\nValeur comptable",
  "addDevice.form.requiredHint": "\nLes champs marqués d'un * sont obligatoires",
  "addDevice.form.submit": "\nCréer un appareil",
  "addDevice.validation.unauthorized": "\nNon autorisé à créer des appareils",
  "addDevice.validation.nameRequired": "\nLe nom de l'appareil est requis",
  "addDevice.validation.typeRequired": "\nLa catégorie d'appareil est requise",
  "addDevice.validation.siteRequired": "\nLe site est requis",
  "addDevice.validation.locationRequired": "\nLes coordonnées GPS sont requises",
  "addDevice.validation.locationInvalidRange": "\nLes coordonnées GPS sont hors limites",
  "addDevice.validation.numericValuesRequired":
    "\nLe prix d'achat et la valeur comptable doivent être numériques",
  "addDevice.validation.siteNotFound": "\nLe site spécifié n'existe pas",
  "addDevice.validation.rfidUsed": "\nLe signal RF/l'étiquette RFID est déjà utilisé",
  "addDevice.prerequisite.databaseUnavailableTitle":
    "\nLa configuration de l'appareil nécessite les données du site en direct",
  "addDevice.prerequisite.siteUnavailableTitle":
    "\nAjoutez un site actif avant d'enregistrer des appareils",
  "addDevice.prerequisite.siteUnavailableDescription":
    "Créez une base ou une installation dans l'espace de travail du domaine, puis revenez ici pour enregistrer ou importer des appareils dans le catalogue du site en ligne.",
  "addDevice.prerequisite.openEstate": "\nEspace de travail ouvert",
  "addDevice.feedback.created": "\nAppareil {name} enregistré avec succès",
  "addDevice.form.postCreateNote":
    "\nAprès l'enregistrement, joignez la télémétrie, les photos et l'activité de maintenance à partir de l'enregistrement de l'actif.",
  "addDevice.massImport.title": "\nImportation en masse",
  "addDevice.massImport.subtitle":
    "\nChoisissez un fichier CSV pour importer les enregistrements de l'appareil",
  "addDevice.massImport.acceptedTypes": "\nFichiers CSV uniquement",
  "addDevice.massImport.maxFiles": "\nUn fichier à la fois",
  "addDevice.massImport.importing": "\nImportation…",
  "addDevice.massImport.success": "\nImportation de {created} d'appareils {total}",
  "addDevice.massImport.partial": "\nImporté {created} de {total}. {failed} a échoué.",
  "addDevice.massImport.error": "\nÉchec de l'importation : {message}",
  "addDevice.massImport.emptyFile": "\nLe CSV ne contient aucune ligne de données",
  "addDevice.massImport.fileLabel": "\nFichier CSV",
  "addDevice.massImport.submit": "\nImporter des appareils",
  "addDevice.massImport.downloadTemplate": "\nTélécharger le modèle CSV",
  "addDevice.massImport.editorTitle": "\nVérifier et modifier le contenu importé",
  "addDevice.massImport.editorDescription":
    "\nTéléchargez un fichier CSV, collez les lignes d'une feuille de calcul ou modifiez des cellules individuelles avant l'importation.",
  "addDevice.massImport.contentLabel": "\nImporter du contenu",
  "addDevice.massImport.contentPlaceholder":
    "\nCollez les lignes CSV ici. La ligne d'en-tête est requise pour l'importation directe.",
  "addDevice.massImport.notesLabel": "\nNotes brutes pour l'analyse de l'IA",
  "addDevice.massImport.notesPlaceholder":
    "\nCollez des listes à puces, des tableaux copiés, des e-mails ou des notes de technicien et laissez l'IA les convertir en lignes prêtes à être importées.",
  "addDevice.massImport.parseWithAi": "\nAnalyser avec AI",
  "addDevice.massImport.aiParsing": "\nAnalyse du contenu…",
  "addDevice.massImport.aiSuccess": "\nL'IA a préparé {count} lignes d'importation",
  "addDevice.massImport.aiError": "\nÉchec de l'analyse de l'IA : {message}",
  "addDevice.massImport.gridTitle": "\nÉditeur de cellules",
  "addDevice.massImport.addRow": "\nAjouter la ligne",
  "addDevice.massImport.clearContent": "\nEffacer le contenu",
  "addDevice.massImport.emptyGrid":
    "\nCollez ou analysez le contenu pour commencer à modifier les lignes.",
  "addDevice.massImport.fileImported": "\nFichier importé dans l'éditeur",
  "addDevice.massImport.parseEmpty": "\nAjoutez des notes brutes avant d'utiliser l'analyse AI",
  "addDevice.massImport.invalidContent":
    "\nAucune ligne importable n'a été trouvée dans l'éditeur content",
  "addDevice.massImport.templateSeed":
    "\nnom, type, nom du site, tag rfid, gpsLat, gpsLon, prix d'achat, valeur du livre, condition, cycle de vie Étape ",
  "addDevice.massImport.columns.name": "\nNom",
  "addDevice.massImport.columns.type": "\nTapez",
  "addDevice.massImport.columns.siteName": "\nSite",
  "addDevice.massImport.columns.rfidTag": "\nRFID / Série",
  "addDevice.massImport.columns.gpsLat": "\nLatitude",
  "addDevice.massImport.columns.gpsLon": "\nLongitude",
  "addDevice.massImport.columns.purchasePrice": "\nPrix d'achat",
  "addDevice.massImport.columns.bookValue": "\nValeur comptable",
  "addDevice.massImport.columns.condition": "\nÉtat",
  "addDevice.massImport.columns.lifecycleStage": "\nCycle de vie",
  "addDevice.massImport.formatTableTitle": "\nRéférence du format d'importation",
  "addDevice.massImport.formatTableColumnName": "\nColonne",
  "addDevice.massImport.formatTableColumnRequired": "\nObligatoire",
  "addDevice.massImport.formatTableColumnExample": "\nExemple",
  "addDevice.massImport.columns.required.name": "\nOui",
  "addDevice.massImport.columns.required.type": "\nOui",
  "addDevice.massImport.columns.required.siteName": "\nOui",
  "addDevice.massImport.columns.required.rfidTag": "\nNon",
  "addDevice.massImport.columns.required.gpsLat": "\nOui",
  "addDevice.massImport.columns.required.gpsLon": "\nOui",
  "addDevice.massImport.columns.required.purchasePrice": "\nOui",
  "addDevice.massImport.columns.required.bookValue": "\nOui",
  "addDevice.massImport.columns.required.condition": "\nNon",
  "addDevice.massImport.columns.required.lifecycleStage": "\nNon",
  "addDevice.massImport.columns.example.name": "\nUnité de capteur A1",
  "addDevice.massImport.columns.example.type": "PLAGE_DE_FORMATION",
  "addDevice.massImport.columns.example.siteName": "\nSite Alpha",
  "addDevice.massImport.columns.example.rfidTag": "RF-00123 (exemple)",
  "addDevice.massImport.columns.example.gpsLat": "51.5074 (exemple)",
  "addDevice.massImport.columns.example.gpsLon": "-0.1278 (exemple)",
  "addDevice.massImport.columns.example.purchasePrice": "1200.00 (exemple)",
  "addDevice.massImport.columns.example.bookValue": "950.00 (exemple)",
  "addDevice.massImport.columns.example.condition": "\nbien",
  "addDevice.massImport.columns.example.lifecycleStage": "\nactif",
  "addDevice.massImport.formatTableRequiredYes": "\nOui",
  "addDevice.massImport.formatTableRequiredNo": "\nNon",
  "addDevice.workflow.title": "\nExamen progressif des appareils",
  "addDevice.workflow.description":
    "\nEnregistrez l'appareil, validez les lignes d'importation et examinez le résultat avant de le soumettre.",
  "deviceHistory.title": "\nHistorique de l'appareil",
  "deviceHistory.subtitle": "\nActions récentes de cycle de vie et de maintenance sur votre flotte",
  "deviceHistory.filterLabel": "\nFiltrer par appareil",
  "deviceHistory.filter.assigneeLabel": "\nDestinataire",
  "deviceHistory.filter.assigneePlaceholder": "\nRecherche par responsable",
  "deviceHistory.filter.statusLabel": "\nStatut",
  "deviceHistory.filter.statusAll": "\nTous les statuts",
  "deviceHistory.table.device": "\nAppareil",
  "deviceHistory.table.event": "\nÉvénement",
  "deviceHistory.table.timestamp": "\nHorodatage",
  "deviceHistory.table.updatedAt": "\nMis à jour à ",
  "deviceHistory.table.status": "\nStatut",
  "deviceHistory.table.assignee": "\nDestinataire",
  "deviceHistory.table.priority": "\nPriorité",
  "deviceHistory.table.ariaLabel": "\nÉvénements de l'historique de l'appareil",
  "deviceHistory.table.notes": "\nRemarques",
  "deviceHistory.table.emptyTitle": "\nAucun historique de l'appareil pour l'instant",
  "deviceHistory.table.emptyDescription":
    "Ajustez les filtres ou attendez qu'une nouvelle activité de cycle de vie apparaisse dans ce flux.",
  "deviceHistory.table.errorTitle": "\nHistorique de l'appareil indisponible",
  "deviceHistory.table.errorDescription":
    "\nLe flux de l'historique de l'appareil n'a pas pu être chargé. Réessayez la demande.",
  "deviceHistory.decisionTitle": "\nExamen des différences et des anomalies",
  "deviceHistory.decisionDescription":
    "\nComparez les événements récents, surveillez les anomalies et exportez le pack de preuves.",
  "deviceHistory.eventTask": "\nÉvénement de tâche",
  "deviceHistory.empty":
    "\nAucun événement de l'historique de l'appareil ne correspond à vos filtres.",
  "profile.title": "\nProfil",
  "profile.subtitle": "\nDétails du compte et contexte du rôle",
  "profile.displayName": "\nNom d'affichage",
  "profile.email": "\nE-mail",
  "profile.role": "\nRôle actuel",
  "profile.lastSignIn": "\nDernière connexion",
  "profile.lastSignInUnavailable": "Non disponible",
  "profile.workspaceHome": "\nAccueil de l'espace de travail",
  "profile.activeSessions": "\nSessions actives",
  "profile.sessions.title": "\nSessions actives",
  "profile.sessions.subtitle": "\nConnexions récentes et contexte de l'appareil pour votre compte",
  "profile.sessions.empty": "\nAucune session récente enregistrée",
  "profile.sessions.emptyDescription":
    "\nLes connexions actives et récentes apparaîtront ici après votre authentification.",
  "profile.sessions.current": "\nSession en cours",
  "profile.sessions.unknownAddress": "\nRéseau inconnu",
  "profile.sessions.unknownDevice": "\nAppareil inconnu",
  "profile.sessions.started": "\nCommencé",
  "profile.sessions.expires": "\nExpire",
  "profile.sessions.deviceInventory": "\nAppareils vus",
  "profile.sessions.networkCoverage": "\nRéseaux vus",
  "profile.sessions.activityTitle": "\nActivité de sécurité récente",
  "profile.sessions.activityDescription":
    "\nExaminez les dernières modifications apportées à la session, à l'appareil et au réseau avant de mettre fin à l'accès ou de modifier les informations d'identification.",
  "profile.sessions.activityCurrentTitle": "\nPosture de la session actuelle",
  "profile.sessions.activityCurrentDescription": "\nSession actuelle établie {value}.",
  "profile.sessions.activityCurrentEmpty":
    "\nAucune session en cours n'est disponible pour examen.",
  "profile.sessions.activityDeviceTitle": "\nEmpreinte de l'appareil",
  "profile.sessions.activityDeviceDescription":
    "\nLes profils d'appareil {count} sont visibles lors de l'audit de session récent.",
  "profile.sessions.activityNetworkTitle": "\nEmpreinte réseau",
  "profile.sessions.activityNetworkDescription":
    "\nLes origines du réseau {count} sont visibles lors de l'audit de session récent.",
  "profile.sessions.expiringSoon": "\nExpire bientôt",
  "profile.sessions.activityExpiringDescription":
    "\n{count} session(s) active(s) doivent être examinées avant la fermeture de la fenêtre d'accès actuelle.",
  "profile.sessions.expiresSoon": "\nExpire bientôt",
  "profile.sessions.remoteContext": "\nContexte distant",
  "profile.sessions.activityRemoteDescription":
    "\nLes sessions {count} sont actives en dehors du contexte du réseau de confiance principal.",
  "profile.signOutLabel": "\nDéconnexion",
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
  "digitalTwin.title": "\nJumeau numérique",
  "digitalTwin.subtitle":
    "\nVisibilité des points chauds spatiaux et contexte des actifs en direct",
  "digitalTwin.scene.title": "\nScène d'opérations spatiales",
  "digitalTwin.scene.description":
    "\nVue jumelle pilotée par le serveur montrant la couverture des points d'accès en direct et les coordonnées liées aux actifs.",
  "digitalTwin.scene.streamTitle": "\nDiffusion en direct",
  "digitalTwin.scene.streamDescription":
    "\nLes instantanés SSE publient les coordonnées actuelles du point d'accès.",
  "digitalTwin.videoStreams.title": "\nFlux en direct",
  "digitalTwin.videoStreams.empty": "\nAucun flux en direct configuré",
  "digitalTwin.videoStreams.live": "\nEn direct",
  "digitalTwin.videoStreams.noStream": "\nAucune URL de flux",
  "digitalTwin.videoStreams.openStream": "\nOuvrir le flux",
  "digitalTwin.videoStreams.notFound": "\nFlux introuvable",
  "iot.telemetry.ingest": "\nIngérer la télémétrie",
  "iot.devices.title": "\nAppareils IoT",
  "iot.apiKeyInvalid": "\nClé API invalide ou manquante",
  "iot.assetNotFound": "\nActif introuvable",
  "iot.siteNotFound": "\nSite introuvable",
  "iot.devices.empty": "\nAucun appareil IoT enregistré",
  "iot.devices.register": "\nEnregistrer l'appareil",
  "iot.devices.mqttTopic": "\nSujet MQTT",
  "iot.devices.mqttPlaceholder": "\ntélémétrie/site1/appareil1",
  "iot.devices.site": "\nSite",
  "iot.devices.asset": "\nActif",
  "iot.devices.assetPlaceholder": "\nID d'actif",
  "iot.devices.lastSeen": "\nVu pour la dernière fois",
  "iot.devices.validation.required": "Le sujet et le site MQTT sont requis.",
  "iot.devices.validation.topicInUse": "\nLe sujet MQTT est déjà utilisé.",
  "iot.devices.feedback.deviceAdded": "\nEnregistrer l'appareil – appareil ajouté.",
  "iot.devices.table.ariaLabel": "\nAppareils IoT enregistrés",
  "iot.apiKeyNotConfigured": "\nLa clé API IoT n'est pas configurée.",
  "iot.deviceNotFound": "\nAppareil introuvable",
  "edgeControl.validation.payloadJsonInvalid": "\nLa charge utile doit être un JSON.",
  "edgeControl.validation.commandRequired":
    " valide.\nSélectionnez un appareil et entrez un nom de commande.",
  "edgeControl.validation.deviceRequired": "\nSélectionnez un appareil valide.",
  "edgeControl.validation.automationTitleRequired": "\nLe titre d’automatisation est requis.",
  "edgeControl.validation.automationDeviceRequired":
    "\nSélectionnez un périphérique et une commande pour mettre en file d'attente une exécution d'automatisation.",
  "edgeControl.validation.automationKindRequired":
    "\nSélectionnez un type d'automatisation valide.",
  "edgeControl.commands.title": "\nFile d'attente de commandes de périphérique",
  "edgeControl.commands.description":
    "\nMettez en file d'attente les commandes matérielles sécurisées pour les périphériques Edge enregistrés et surveillez l'état de livraison.",
  "edgeControl.commands.device": "\nAppareil",
  "edgeControl.commands.devicePlaceholder": "\nSélectionnez un appareil",
  "edgeControl.commands.command": "\nCommande",
  "edgeControl.commands.commandPlaceholder": "\nredémarrer, calibrer, sync-config",
  "edgeControl.commands.payload": "\nCharge utile JSON",
  "edgeControl.commands.payloadPlaceholder": '{"cible":"zone-a"}',
  "edgeControl.commands.submit": "\nCommande de file d'attente",
  "edgeControl.commands.empty": "\nAucune commande de périphérique n'est encore en file d'attente.",
  "edgeControl.commands.notFound": "\nCommande de périphérique introuvable.",
  "edgeControl.commands.failed": "\nL'appareil a signalé un échec de commande.",
  "edgeControl.commands.feedback.queued":
    "\nCommande de périphérique mise en file d'attente pour la livraison Edge.",
  "edgeControl.commands.table.device": "\nAppareil",
  "edgeControl.commands.table.command": "\nCommande",
  "edgeControl.commands.table.status": "\nStatut",
  "edgeControl.commands.table.automation": "\nAutomatisation",
  "edgeControl.commands.table.updatedAt": "\nMise à jour",
  "edgeControl.commands.status.QUEUED": "\nEn file d'attente",
  "edgeControl.commands.status.DELIVERED": "\nLivré",
  "edgeControl.commands.status.ACKNOWLEDGED": "\nAccusé de réception",
  "edgeControl.commands.status.FAILED": "\nÉchec",
  "edgeControl.commands.status.CANCELED": "\nAnnulé",
  "edgeControl.automation.title": "\nL'automatisation fonctionne",
  "edgeControl.automation.description":
    "\nCréez des enregistrements d'exécution durables qui mettent en file d'attente le travail du périphérique et conservent l'historique d'exécution dans le centre de contrôle.",
  "edgeControl.automation.runTitle": "\nExécuter le titre",
  "edgeControl.automation.runTitlePlaceholder": "\nRéinitialisation nocturne du refroidisseur",
  "edgeControl.automation.kindLabel": "\nType d'automatisation",
  "edgeControl.automation.device": "\nAppareil",
  "edgeControl.automation.command": "\nCommande",
  "edgeControl.automation.payload": "\nCharge utile JSON",
  "edgeControl.automation.notes": "\nRemarques",
  "edgeControl.automation.notesPlaceholder": "\nRemarque facultative pour l'opérateur",
  "edgeControl.automation.submit": "\nAutomatisation de la file d'attente",
  "edgeControl.automation.empty": "\nAucune exécution d'automatisation créée pour l'instant.",
  "edgeControl.automation.feedback.queued":
    "\nExécution de l'automatisation mise en file d'attente avec une commande Edge.",
  "edgeControl.automation.table.title": "\nExécuter",
  "edgeControl.automation.table.kind": "\nGenre",
  "edgeControl.automation.table.status": "\nStatut",
  "edgeControl.automation.table.device": "\nAppareil",
  "edgeControl.automation.table.updatedAt": "\nMise à jour",
  "edgeControl.automation.kind.DEVICE_COMMAND": "\nCommande de l'appareil",
  "edgeControl.automation.kind.EDGE_RUNBOOK": "\nRunbook Edge",
  "edgeControl.automation.status.QUEUED": "\nEn file d'attente",
  "edgeControl.automation.status.RUNNING": "\nEn cours d'exécution",
  "edgeControl.automation.status.SUCCEEDED": "\nRéussi",
  "edgeControl.automation.status.FAILED": "\nÉchec",
  "edgeControl.automation.status.CANCELED": "\nAnnulé",
  "deployment.validation.airgappedProviderRequired":
    "\nLe déploiement Airgapped autorise uniquement les fournisseurs d'IA locaux tels que RamaLama ou Ollama.",
  "deployment.title": "\nPolitique de déploiement",
  "deployment.description":
    "\nLe mode de déploiement régit l'accès au réseau sortant, la politique du fournisseur d'IA et les limites de stockage.",
  "deployment.policyTitle": "\nPolitique",
  "deployment.policy.airgapped":
    "\nLes appels réseau externes sont bloqués et l'IA est limitée aux fournisseurs locaux desservis à l'intérieur de la limite de déploiement.",
  "deployment.policy.cloud":
    "\nLes déploiements cloud permettent des intégrations sortantes tout en conservant l'état de commande et d'automatisation de périphérie dans le plan de contrôle partagé.",
  "deployment.policy.onPrem":
    "\nLes déploiements sur site restent auto-hébergés tout en permettant des intégrations externes explicitement configurées.",
  "deployment.edgeControlTitle": "\nContrôle des bords",
  "deployment.edgeControlDescription":
    "\nLes files d'attente de commandes de périphérique et les exécutions d'automatisation restent durables dans Prisma, de sorte que la mise à l'échelle de l'application n'interrompt pas le travail en cours.",
  "deployment.mode.CLOUD": "\nNuage",
  "deployment.mode.ON_PREM": "\nSur site",
  "deployment.mode.AIRGAPPED": "Espace aérien",
  "deployment.capability.externalNetworkEnabled": "\nRéseau externe activé",
  "deployment.capability.externalNetworkDisabled": "\nRéseau externe bloqué",
  "deployment.capability.externalEmailEnabled": "\nE-mail externe autorisé",
  "deployment.capability.externalEmailDisabled": "\nE-mail externe bloqué",
  "deployment.capability.localProtocolReferencesOnly": "\nRéférences de protocole local uniquement",
  "deployment.capability.remoteProtocolReferencesAllowed":
    "\nRéférences de protocole distant autorisées",
  "deployment.capability.localAiOnly": "\nIA locale uniquement",
  "deployment.capability.hybridAiAllowed": "\nIA hybride autorisée",
  "deployment.capability.localDeviceStorageOnly": "\nStockage local uniquement",
  "deployment.capability.objectStorageAllowed": "\nStockage d'objets autorisé",
  "assets.media.noFile": "\nAucun fichier fourni",
  "assets.media.invalidFileType": "\nType de fichier invalide. Autorisés : JPEG, PNG, GIF, WebP.",
  "assets.media.fileTooLarge": "\nFichier trop volumineux. Max 10 Mo.",
  "assets.media.notFound": "\nMédia introuvable",
  "assets.media.fileNotFound": "\nFichier introuvable",
  "assets.media.assetNotFound": "\nActif introuvable",
  "assets.annotations.title": "\nAnnotations d'images",
  "assets.annotations.empty": "\nAucune annotation pour l'instant",
  "assets.annotations.open": "\nOuvrir l'espace de travail d'annotation",
  "assets.annotations.segment": "\nExécuter la segmentation",
  "assets.annotations.segmentSuccess": "\nPropositions de segmentation créées",
  "assets.annotations.segmentUnavailable":
    "\nLa segmentation n'est pas disponible avec la configuration AI actuelle. L'annotation manuelle est toujours disponible.",
  "assets.annotations.segmentInvalid":
    "\nLa réponse de segmentation n'a pas pu être convertie en géométrie d'annotation valide.",
  "assets.annotations.manualAdd": "\nAjouter une annotation manuelle",
  "assets.annotations.edit": "\nModifier le polygone",
  "assets.annotations.confirm": "\nConfirm",
  "assets.annotations.reject": "\nRejeter",
  "assets.annotations.archive": "\nArchive",
  "assets.annotations.save": "\nEnregistrer l'annotation",
  "assets.annotations.clearDraft": "\nEffacer le brouillon",
  "assets.annotations.label": "\nÉtiquette",
  "assets.annotations.status": "\nStatut",
  "assets.annotations.source": "\nSource",
  "assets.annotations.confidence": "\nConfiance",
  "assets.annotations.mask": "\nMasque",
  "assets.annotations.maskToggle": "\nAfficher la superposition du masque",
  "assets.annotations.boxTool": "\nBoîte à outils",
  "assets.annotations.polygonTool": "\nOutil Polygone",
  "assets.annotations.regions": "\nRégions",
  "assets.annotations.prompt": "\nInvite de segmentation",
  "assets.annotations.promptPlaceholder":
    "\nMettez en surbrillance les fuites, la corrosion, les fissures, les contrôles ou d'autres régions importantes",
  "assets.annotations.defaultLabel": "\nRégion",
  "assets.annotations.status.proposed": "\nProposé",
  "assets.annotations.status.confirmed": "\nConfirmé",
  "assets.annotations.status.rejected": "\nRejeté",
  "assets.annotations.status.archived": "\nArchivé",
  "assets.annotations.source.ai": "IA",
  "assets.annotations.source.manual": "\nManuel",
  "assets.annotations.validation.labelRequired": "\nL'étiquette est requise",
  "assets.annotations.validation.polygonInvalid":
    "\nLe polygone doit contenir au moins trois points normalisés",
  "assets.annotations.validation.mediaNotFound": "\nLe support d'annotation n'a pas été trouvé",
  "assets.annotations.validation.annotationNotFound": "\nAnnotation introuvable",
  "assets.annotations.saved": "\nAnnotation enregistrée",
  "assets.annotations.archived": "\nAnnotation archivée",
  "storage.notConfigured":
    "\nStockage non configuré. Définir les variables d'environnement OBJECT_STORAGE_*.",
  "storage.operationFailed": "\nÉchec de l'opération de stockage",
  "assets.type.BUILDING": "\nBâtiment",
  "assets.type.INFRASTRUCTURE": "\nInfrastructure",
  "assets.type.TRAINING_RANGE": "\nPlage d'entraînement",
  "assets.type.RANGE_SAFETY_SYSTEM": "\nSystème de sécurité de cuisinière",
  "assets.type.TARGETRY_SYSTEM": "\nSystème de ciblage",
  "assets.type.HVAC": "CVC",
  "assets.type.ELECTRICAL": "\nÉlectrique",
  "assets.type.PLUMBING": "\nPlumbing",
  "assets.type.STRUCTURAL": "\nStructurel",
  "assets.type.MECHANICAL": "\nMécanique",
  "assets.type.FIRE_SAFETY": "\nSécurité incendie",
  "assets.type.SECURITY": "\nSécurité",
  "assets.type.IT_INFRASTRUCTURE": "\nInfrastructure informatique",
  "assets.type.VEHICLE": "\nVéhicule",
  "assets.type.PLANT_HEAVY_MACHINERY": "\nUsines et machinerie lourde",
  "assets.type.KITCHEN_CATERING_EQUIPMENT": "\nÉquipement de cuisine et de restauration",
  "assets.type.FORESTRY_ASSET": "\nActif forestier",
  "assets.type.RURAL_ESTATE_ASSET": "\nActif du domaine rural",
  "assets.type.HERITAGE_ASSET": "\nBien patrimonial",
  "assets.type.ENVIRONMENTAL_ASSET": "\nActif environnemental",
  "assets.type.GOVERNMENT_FURNISHED_EQUIPMENT": "\nÉquipement fourni par le gouvernement",
  "assets.type.EQUIPMENT": "\nÉquipement",
  "assets.type.OTHER": "\nAutre",
  "assets.hierarchy.ESTATE": "\nSuccession",
  "assets.hierarchy.FACILITY": "\nInstallation",
  "assets.hierarchy.SYSTEM": "\nSystème",
  "assets.hierarchy.SUBSYSTEM": "\nSous-système",
  "assets.hierarchy.COMPONENT": "\nComposant",
  "assets.condition.OPERATIONAL": "\nOpérationnel",
  "assets.condition.DEGRADED": "\nDégradé",
  "assets.condition.CRITICAL": "\nCritique",
  "assets.condition.FATIGUING": "\nFatiguant",
  "assets.condition.DECOMMISSIONED": "\nDésarmé",
  "assets.condition.unknown": "\nInconnu",
  "assets.lifecycle.ACTIVE": "\nActif",
  "assets.lifecycle.MONITORING": "\nSurveillance",
  "assets.lifecycle.FATIGUING": "\nFatiguant",
  "assets.lifecycle.DISPOSED": "\nÉliminé",
  "digitalTwin.scene.hotspotTitle": "\nCouverture des points d'accès",
  "digitalTwin.scene.hotspotDescription":
    "\nLes marqueurs opérationnels sont actualisés à partir du dernier état jumeau persistant.",
  "digitalTwin.scene.assetTitle": "\nContexte de l'actif",
  "digitalTwin.scene.assetDescription":
    "\nChaque point d'accès peut être lié à l'actif d'infrastructure suivi.",
  "digitalTwin.hotspots.title": "\nRegistre des points d'accès",
  "digitalTwin.hotspots.empty":
    "Aucun point d'accès n'est disponible pour le jumeau numérique actuel.",
  "digitalTwin.hotspots.noDescription":
    "\nAucune description de point d'accès n'a été enregistrée.",
  "digitalTwin.hotspots.openTarget": "\nCible ouverte",
  "digitalTwin.coords.x": "Axe X",
  "digitalTwin.coords.y": "Axe Y",
  "digitalTwin.coords.z": "Axe Z",
  "kanban.title": "\nTableau Kanban",
  "kanban.subtitle":
    "\nPipeline d'exécution pour les missions, la planification et le flux de l'équipe",
  "tasks.title": "\nTableau des tâches",
  "tasks.subtitle": "\nPipeline d’exécution Kanban et flux d’équipe",
  "tasks.filter.priority": "\nPriorité",
  "tasks.filter.priority.all": "\nToutes les priorités",
  "tasks.filter.status": "\nStatut",
  "tasks.filter.site": "\nSite",
  "tasks.filter.assignee": "\nDestinataire",
  "tasks.filter.assigneePlaceholder": "\nRechercher un actif, un responsable ou une équipe",
  "tasks.filter.priority.low": "\nFaible",
  "tasks.filter.priority.medium": "\nMoyen",
  "tasks.filter.priority.high": "\nÉlevé",
  "tasks.filter.priority.critical": "\nCritique",
  "tasks.filter.site.allSites": "\nTous les sites",
  "tasks.filter.site.northTraining": "\nSite d'entraînement Nord",
  "tasks.filter.site.centralCommand": "\nCommandement central",
  "tasks.column.backlog": "\nCarnet de commandes",
  "tasks.column.scheduled": "\nProgrammé",
  "tasks.column.inProgress": "\nEn cours",
  "tasks.column.completed": "\nTerminé",
  "tasks.column.empty": "\nAucune tâche dans cette colonne",
  "tasks.status.draft": "\nBrouillon",
  "tasks.status.cancelled": "\nAnnulé",
  "tasks.priority.LOW": "\nFaible",
  "tasks.priority.MEDIUM": "\nMoyen",
  "tasks.priority.HIGH": "\nÉlevé",
  "tasks.priority.CRITICAL": "\nCritique",
  "tasks.type.INSPECTION": "\nInspection",
  "tasks.type.REPAIR": "\nRéparation",
  "tasks.type.REPLACEMENT": "\nRemplacement",
  "tasks.type.CALIBRATION": "\nÉtalonnage",
  "tasks.type.EMERGENCY": "\nUrgence",
  "tasks.card.asset": "\nActif",
  "tasks.card.deadline": "\nDate limite",
  "tasks.card.crew": "\nÉquipage",
  "tasks.card.priority": "\nPriorité",
  "tasks.card.open": "\nAfficher la tâche",
  "tasks.card.openAria": "\nOuvrir les détails de la tâche pour {id}",
  "tasks.summary.pendingApproval": "\nEn attente d'approbation",
  "tasks.detail.title": "\nDétail de la tâche",
  "tasks.detail.subtitle":
    "\nSélectionnez une fiche de tâche pour inspecter le contexte d'affectation",
  "tasks.detail.listTitle": "\nListe de contrôle pour l'achèvement des tâches",
  "tasks.detail.completionCriteria": "\nCritères de réalisation",
  "tasks.detail.requiredParts": "\nPièces requises",
  "tasks.detail.aiConfidence": "\nConfiance en IA",
  "tasks.workspace.title": "\nContrôle de mission de tâche",
  "tasks.workspace.heroEyebrow": "\nAtelier des opérations",
  "tasks.workspace.heroNarrative":
    "\nVue {mode} centrée sur {preset}. {total} tâches limitées, {active} actives dans le flux, {unassigned} sans propriétaire, {dueSoon} à venir bientôt.",
  "tasks.workspace.modeLabel": "\nMode atelier de tâches",
  "tasks.workspace.mode.queue": "\nFile d'attente prioritaire",
  "tasks.workspace.mode.board": "\nTableau de flux",
  "tasks.workspace.mode.copilot": "\nCopilote",
  "tasks.workspace.navigatorTitle": "\nNavigateur",
  "tasks.workspace.navigatorSubtitle":
    "\nEnregistrez le modèle mental de l'opérateur : choisissez un objectif, puis découpez l'ensemble de données.",
  "tasks.workspace.queueTitle": "\nFile d'attente d'exécution",
  "tasks.workspace.queueSubtitle":
    "\nExploration en premier de la liste pour la répartition, le tri et l'examen par l'opérateur.",
  "tasks.workspace.boardTitle": "\nFlux d'exécution",
  "tasks.workspace.boardSubtitle":
    "\nVue de la première voie du tableau pour la planification, la surveillance des en-cours et les changements de statut.",
  "tasks.workspace.detailTitle": "\nExploration",
  "tasks.workspace.detailSubtitle":
    "\nTâche sélectionnée, propriétaire recommandé et chemin d'action suivant.",
  "tasks.workspace.detailEmpty":
    "\nSélectionnez une fiche de tâche pour inspecter le contexte d'exécution et les recommandations de l'IA.",
  "tasks.workspace.presetLabel": "Preconfiguration",
  "tasks.workspace.preset.all": "\nToute la charge de travail",
  "tasks.workspace.preset.myQueue": "\nMa file d'attente",
  "tasks.workspace.preset.triage": "\nNécessite un triage",
  "tasks.workspace.preset.unassigned": "\nNon attribué",
  "tasks.workspace.preset.dueSoon": "\nÀ rendre bientôt",
  "tasks.workspace.preset.active": "\nFlux actif",
  "tasks.workspace.preset.completed": "\nRécemment terminé",
  "tasks.workspace.preset.aiGenerated": "\nOriginaire de l'IA",
  "tasks.workspace.preset.allDesc":
    "\nCharge de travail entièrement filtrée tout au long de la planification et de l'exécution.",
  "tasks.workspace.preset.myQueueDesc": "\nTâches déjà assignées à l'opérateur actuel.",
  "tasks.workspace.preset.triageDesc":
    "\nÉléments de brouillon et d'arriéré qui nécessitent encore une décision.",
  "tasks.workspace.preset.unassignedDesc": "\nTravaillez sans propriété individuelle ou d'équipe.",
  "tasks.workspace.preset.dueSoonDesc": "\nTâches à rendre dans les sept prochains jours.",
  "tasks.workspace.preset.activeDesc":
    "\nLes travaux planifiés et en vol consomment actuellement de la capacité.",
  "tasks.workspace.preset.completedDesc":
    "\nTravaux récemment clôturés pour validation et transfert.",
  "tasks.workspace.preset.aiGeneratedDesc":
    "\nÉléments de travail liés à la prédiction ou notés par l'IA.",
  "tasks.workspace.savedViewLabel": "\nVues enregistrées",
  "tasks.workspace.savedView.dispatch": "File d'attente de répartition",
  "tasks.workspace.savedView.dispatchDesc":
    "\nGardez le travail non attribué et la pression du personnel visibles pour un routage rapide.",
  "tasks.workspace.savedView.slaWatch": "\nMontre SLA",
  "tasks.workspace.savedView.slaWatchDesc":
    "\nRestez sur les travaux à venir et en retard qui nécessitent une intervention en premier.",
  "tasks.workspace.savedView.automation": "\nMontre d'automatisation",
  "tasks.workspace.savedView.automationDesc":
    "\nExaminez les tâches créées par l'IA avant de passer à la planification et à l'exécution sur le terrain.",
  "tasks.workspace.savedView.execution": "\nObjectif d'exécution",
  "tasks.workspace.savedView.executionDesc":
    "\nSuivez les travaux planifiés et en cours sans quitter l'établi.",
  "tasks.workspace.metric.total": "\nTâches délimitées",
  "tasks.workspace.metric.totalDesc":
    "\nCharge de travail visible après l'application des filtres actuels.",
  "tasks.workspace.metric.active": "\nEn exécution",
  "tasks.workspace.metric.activeDesc": "\nTâches planifiées et en cours dans la vue actuelle.",
  "tasks.workspace.metric.unassigned": "\nSans propriétaire",
  "tasks.workspace.metric.unassignedDesc": "\nTâches sans cessionnaire direct ni équipe.",
  "tasks.workspace.metric.dueSoon": "\nÀ rendre bientôt",
  "tasks.workspace.metric.dueSoonDesc": "\nTâches avec des délais dans les sept prochains jours.",
  "tasks.workspace.metric.overdue": "\nEn retard",
  "tasks.workspace.primaryAction": "\nAjouter une tâche",
  "tasks.workspace.filtersHint":
    "\nLa modification d'un slicer met à jour la requête du forum et conserve l'URL partageable.",
  "tasks.workspace.slaTitle": "\nVieillissement du SLA",
  "tasks.workspace.slaDescription":
    "\nGardez les travaux en retard, à venir et de réaffectation visibles avant qu'ils ne passent à l'équipe suivante.",
  "tasks.workspace.slaAging.overdue": "\n{count} jour(s) de retard",
  "tasks.workspace.slaAging.today": "\nÀ rendre aujourd'hui",
  "tasks.workspace.slaAging.dueIn": "\nÀ payer dans {count} jour(s)",
  "tasks.workspace.slaAging.onTrack": "\nEn bonne voie",
  "tasks.workspace.bulkCueTitle": "\nIndices de triage en masse",
  "tasks.workspace.bulkCueDescription":
    "\nAccédez aux tranches de tri, de réaffectation ou de clôture sans reconstruire les filtres actuels.",
  "tasks.workspace.bulkTriageTitle": "\nTriage en masse",
  "tasks.workspace.bulkTriageDescription":
    "\nBalayez les tâches en retard, à venir et qui demandent beaucoup d'attention avant qu'elles ne passent à l'équipe suivante.",
  "tasks.workspace.bulkReassignTitle": "\nIndices de réaffectation",
  "tasks.workspace.bulkReassignDescription":
    "\nGardez le travail non attribué visible afin que la répartition et le transfert de l'équipe restent en avance sur la file d'attente.",
  "tasks.workspace.shortcutTitle": "\nRaccourcis clavier",
  "tasks.workspace.shortcutDescription":
    "\nUtilisez les raccourcis de l'atelier pour créer rapidement des tâches, modifier le tableau et transférer l'IA.",
  "tasks.workspace.bulkReassign": "\nRéaffecter le travail sans propriétaire",
  "tasks.workspace.bulkHandoff": "\nPréparer la file d'attente de transfert",
  "tasks.workspace.bulkCloseReady": "\nRevoir le travail finalisé",
  "tasks.workspace.wipTitle": "\nPosture en cours",
  "tasks.workspace.wipDescription":
    "\nSuivez la capacité en vol par voie afin que les travaux bloqués soient intensifiés avant que les équipages ne décrochent.",
  "tasks.workspace.wipHealthy": "\nLe flux se situe dans les limites actuelles des en-cours.",
  "tasks.workspace.wipAtRisk": "\n{count} les voies sont au-dessus des garde-corps WIP actuels.",
  "tasks.workspace.swimlaneTitle": "\nFocus sur le couloir",
  "tasks.workspace.swimlaneDescription":
    "\nGardez le site actuel et le contexte du propriétaire visibles pendant que vous basculez entre les modes file d'attente et tableau.",
  "tasks.workspace.clearFilterAria": "\nEffacer le filtre {label}",
  "tasks.workspace.unassignedValue": "\nNon attribué",
  "tasks.workspace.aiConfidence": "\nConfiance en IA",
  "tasks.workspace.aiOriginLabel": "\nOrigine de l'IA",
  "tasks.workspace.aiOrigin.prediction": "\nGénéré par la prédiction",
  "tasks.workspace.column.backlogDesc":
    "\nTravail prêt à façonner avant que la capacité de travail ou de calendrier ne soit engagée.",
  "tasks.workspace.column.scheduledDesc":
    "Travail engagé organisé pour les équipes, les transferts et les fenêtres de site.",
  "tasks.workspace.column.inProgressDesc":
    "\nExécution active sur le terrain nécessitant la suppression du bloqueur et la surveillance SLA.",
  "tasks.workspace.column.completedDesc":
    "\nTravail terminé en attente de validation, d'audit ou de transfert aux parties prenantes.",
  "tasks.workspace.workflowTitle": "\nProgression du flux de travail",
  "tasks.workspace.moveTitle": "\nDéplacer la tâche",
  "tasks.workspace.empty.BACKLOG":
    "\nAucun élément du backlog ne correspond à la tranche actuelle de l'ensemble de données.",
  "tasks.workspace.empty.SCHEDULED":
    "\nAucun travail planifié ne correspond à la tranche actuelle de l'ensemble de données.",
  "tasks.workspace.empty.IN_PROGRESS":
    "\nAucun travail d'exécution actif ne correspond à la tranche actuelle de l'ensemble de données.",
  "tasks.workspace.empty.COMPLETED":
    "\nAucun travail terminé ne correspond à la tranche actuelle de l'ensemble de données.",
  "tasks.workspace.queue.attention": "\nA besoin d'attention",
  "tasks.workspace.queue.attentionDesc":
    "\nTravaux en retard ou à court terme qui nécessitent une décision de l'opérateur maintenant.",
  "tasks.workspace.queue.dispatch": "\nRépartition et dotation en personnel",
  "tasks.workspace.queue.dispatchDesc":
    "\nUtilisez cette liste pour attribuer des travaux sans propriétaire avant qu'ils ne deviennent une dette de flux.",
  "tasks.workspace.queue.active": "\nEn exécution",
  "tasks.workspace.queue.activeDesc":
    "\nTravaux actuellement planifiés et en cours classés par date d'échéance et priorité.",
  "tasks.workspace.queue.closed": "\nRéalisations récentes",
  "tasks.workspace.queue.closedDesc":
    "\nTravaux récemment terminés pour l'audit, le transfert et le suivi.",
  "tasks.workspace.queue.empty":
    "\nCette file d'attente est actuellement vide pour la tranche choisie.",
  "tasks.workspace.filteredEmpty.title": "\nAucun résultat ne correspond à vos filtres",
  "tasks.workspace.filteredEmpty.description":
    "\nModifiez vos filtres ou effacez-les pour voir à nouveau les tâches dans cette voie.",
  "tasks.workspace.recommendation.title": "\nRecommandation en matière de personnel d'IA",
  "tasks.workspace.recommendation.confidenceLabel": "\nConfiance des recommandations",
  "tasks.workspace.recommendation.noMatch":
    "\nAucune correspondance de dotation disponible pour l'instant",
  "tasks.workspace.recommendation.assigneeRecommended": "\nMission individuelle recommandée",
  "tasks.workspace.recommendation.crewRecommended": "\nAffectation d'équipage recommandée",
  "tasks.workspace.recommendation.reason.assigneeContinuity":
    "\nLa couverture {role} à {site} conserve le contexte de tâche actuel avec {openTasks} tâches actives.",
  "tasks.workspace.recommendation.reason.assigneeLoad":
    "\nLa couverture {role} à {site} a la charge de travail active la plus légère pour les tâches {openTasks}.",
  "tasks.workspace.recommendation.reason.crewEscalation":
    "\n{crew} couvre {site} avec un responsable de maintenance en rotation pour cette tâche {taskType}.",
  "tasks.workspace.recommendation.reason.crewCapacity":
    "\n{crew} couvre {site} avec {memberCount} membres actifs et {openTasks} tâches actives.",
  "tasks.workspace.recommendation.reason.noMatch":
    "\nAucune couverture d'équipe de site ou de technicien n'est encore configurée pour {site}.",
  "tasks.workspace.test.completionCriterionSample": "\nVérifier la normalisation du débit d'air",
  "tasks.workspace.test.requiredPartSample": "\nPack de filtres",
  "tasks.workspace.chat.noSelection": "\nAucune tâche n'est actuellement sélectionnée.",
  "tasks.workspace.chat.selection":
    "\nTâche sélectionnée {task}, statut {status}, priorité {priority}, propriétaire {assignee}.",
  "tasks.workspace.chat.pageContext":
    "\nAtelier de tâches dans la vue {mode}. {stats}. {filters}. {task}.",
  "tasks.workspace.copilot.title": "\nCopilote IA",
  "tasks.workspace.copilot.subtitle":
    "\nLes actions prêtes à être invitées restent liées à l'ensemble de données visible et à l'état d'extraction.",
  "tasks.workspace.copilot.description":
    "Gardez l'assistant proche du travail : résumez la charge de travail visible, diagnostiquez les goulots d'étranglement des flux ou rédigez des notes de transfert sans quitter le centre de commande.",
  "tasks.workspace.copilot.askAi": "\nDemandez à AI",
  "tasks.workspace.copilot.openPrompt":
    "\nExaminez l'espace de travail des tâches visible et aidez-moi à décider de la prochaine action opérationnelle.",
  "tasks.workspace.copilot.brief": "\nBrief opérationnel",
  "tasks.workspace.copilot.briefPrompt":
    "\nRésumez l’espace de travail de tâche {mode} actuel pour le préréglage {preset}. Mettez en surbrillance les points urgents, les lacunes en matière de personnel et les prochaines actions recommandées.",
  "tasks.workspace.copilot.bottleneck": "\nTrouver les goulots d'étranglement",
  "tasks.workspace.copilot.bottleneckPrompt":
    "\nExaminez la charge de travail visible des tâches et identifiez les principaux goulots d'étranglement, bloqueurs et risques WIP.",
  "tasks.workspace.copilot.handoff": "\nTransfert du brouillon",
  "tasks.workspace.copilot.handoffPrompt":
    "\nRédigez un transfert concis de l'opérateur pour la charge de travail de la tâche visible, y compris ce qui a changé, ce qui est bloqué et ce qui devrait se passer ensuite.",
  "tasks.workspace.copilot.executionPlan": "\nProjet de plan d'exécution",
  "tasks.workspace.copilot.executionPlanPrompt":
    "\nCréez un plan d'exécution pour la tâche {task} sur l'actif {asset} sur le site {site}. Incluez le séquençage, les bloqueurs à vérifier et les étapes de communication.",
  "tasks.workspace.copilot.blockers": "\nAnalyser les bloqueurs",
  "tasks.workspace.copilot.blockersPrompt":
    "\nAnalysez les bloqueurs probables, les données manquantes et les points de risque pour la tâche {task}.",
  "tasks.workspace.copilot.statusUpdate": "\nMise à jour de l'état du brouillon",
  "tasks.workspace.copilot.statusUpdatePrompt":
    "\nRédigez une mise à jour concise du statut de la tâche {task}. L'état actuel du flux de travail est {status}.",
  "predictions.title": "\nFlux de prédictions",
  "predictions.subtitle": "\nSignaux de risque de maintenance et de cycle de vie générés par l'IA",
  "predictions.filter.severity": "\nGravité",
  "predictions.filter.severity.all": "\nTous",
  "predictions.filter.severity.info": "\nInfos",
  "predictions.filter.severity.warning": "\nAvertissement",
  "predictions.filter.severity.critical": "\nCritique",
  "predictions.filter.severity.emergency": "\nUrgence",
  "predictions.filter.site": "\nSite",
  "predictions.filter.site.allSites": "\nTous les sites",
  "predictions.filter.site.northTraining": "\nSite d'entraînement Nord",
  "predictions.filter.site.westCompound": "\nComposé Ouest",
  "predictions.filter.assetType": "\nType d'actif",
  "predictions.filter.assetType.all": "\nTous les types",
  "predictions.filter.assetType.electrical": "\nÉlectrique",
  "predictions.filter.assetType.plumbing": "\nPlumbing",
  "predictions.filter.assetType.hvac": "CVC",
  "predictions.feed.title": "\nFile d'attente de prédiction en direct",
  "predictions.feed.reasoning": "\nRaisonnement",
  "predictions.feed.remainingLife": "\nDurée de vie restante",
  "predictions.feed.confidence": "\nConfiance",
  "predictions.feed.expand": "\nDévelopper la chaîne",
  "predictions.feed.generatorFailureTitle": "\nFenêtre de défaillance du générateur A-21",
  "predictions.feed.pumpCollapseTitle": "\nEffondrement de pression de la pompe P-08",
  "predictions.feed.generatorRemainingLife": "\n14 jours",
  "predictions.feed.pumpRemainingLife": "\n6 jours",
  "predictions.feed.generatorConfidence": "86 % (exemple)",
  "predictions.feed.pumpConfidence": "93 % (exemple)",
  "predictions.reasoning.title": "\nChaîne de raisonnement",
  "predictions.reasoning.subtitle": "\nRésumé du modèle, contexte et recommandation",
  "predictions.reasoning.list.variance":
    "\nLa variance de la télémétrie a dépassé la ligne de base mobile de 42 %.",
  "predictions.reasoning.list.seal":
    "\nL'historique de maintenance indique un schéma de dégradation répétée du joint.",
  "predictions.reasoning.list.action":
    "\nAction recommandée : créer automatiquement une tâche de remplacement de brouillon dans les 48 heures.",
  "predictions.reasoning.placeholder":
    "\nLa trace du raisonnement sera diffusée lorsque les prédictions seront disponibles.",
  "predictions.reasoning.asset": "\nActif",
  "predictions.reasoning.model": "\nModèle",
  "predictions.reasoning.confidence": "\nConfiance",
  "predictions.type.failure": "\nÉchec",
  "predictions.type.degradation": "\nDégradation",
  "predictions.type.maintenanceDue": "\nEntretien dû",
  "predictions.type.lifecycleEnd": "\nFin du cycle de vie",
  "predictions.workspace.eyebrow": "\nCommande de risque IA",
  "predictions.workspace.title":
    "\nPrédiction, inventaire et flux d'action dans une seule surface de contrôle",
  "predictions.workspace.description":
    "Un espace de travail de type Power BI pour classer les signaux de risque d'IA en direct par rapport à l'inventaire des actifs, au retard opérationnel et à la pression d'approvisionnement ou d'élimination en aval.",
  "predictions.workspace.live": "\nActualisation tous les {seconds}s",
  "predictions.workspace.filtersTitle": "\nBarre de commande de filtre",
  "predictions.workspace.filtersDescription":
    "\nRecherchez des actifs et affinez la prédiction actuelle définie par gravité, site, type d'actif et récence de la prédiction.",
  "predictions.workspace.searchLabel": "\nRechercher dans l'inventaire",
  "predictions.workspace.searchPlaceholder": "\nFiltrer par nom d'actif ou de site",
  "predictions.workspace.legendDescription":
    "\nLes couleurs de gravité restent cohérentes sur les cartes Spotlight, la grille d'inventaire et le rail d'explicabilité.",
  "predictions.workspace.methodologyTitle": "\nModèle de classement",
  "predictions.workspace.methodologyDescription":
    "\nLes scores combinent l'urgence de l'IA avec l'inventaire, le flux de travail et le flux commercial afin que les opérateurs puissent travailler à partir d'une seule file d'attente.",
  "predictions.workspace.methodologyItemSignals":
    "\nLa confiance de l'IA, le type de prédiction et les fenêtres de durée de vie restante déterminent l'urgence opérationnelle de base.",
  "predictions.workspace.methodologyItemInventory":
    "\nLa valeur des stocks, l'état des actifs et l'étape du cycle de vie augmentent la pression sur les actifs hautement exposés.",
  "predictions.workspace.methodologyItemWorkflow":
    "\nLes tâches ouvertes ainsi que les activités actives d'approvisionnement ou d'élimination déterminent ce qui devrait évoluer ensuite.",
  "predictions.workspace.panelTitle": "\nCentre de commandement des risques",
  "predictions.workspace.panelDescription":
    "\nSurveillez les signaux d'IA les plus forts, leur exposition aux stocks et le flux opérationnel déjà construit autour d'eux.",
  "predictions.workspace.generatedAt": "\nMise à jour {generatedAt}",
  "predictions.workspace.kpi.activeSignals": "\nSignaux actifs",
  "predictions.workspace.kpi.activeSignalsHint":
    "\nPrédictions IA filtrées actuellement dans la file d'attente de l'entreprise.",
  "predictions.workspace.kpi.activeSignalsTrend": "\n{count} critique ou urgence",
  "predictions.workspace.kpi.dueSoon": "\nÀ rendre bientôt",
  "predictions.workspace.kpi.dueSoonHint":
    "\nSignaux dont la durée de vie restante se situe à l'intérieur du seuil d'intervention.",
  "predictions.workspace.kpi.inventoryExposure": "\nExposition aux stocks",
  "predictions.workspace.kpi.inventoryExposureHint":
    "\nValeur comptable représentée par l'ensemble de prédictions filtré.",
  "predictions.workspace.kpi.aiCoverage": "\nCouverture IA",
  "predictions.workspace.kpi.aiCoverageHint":
    "\nActifs dans la tranche d'inventaire actuelle avec historique de prédiction.",
  "predictions.workspace.kpi.averageConfidenceTrend": "\n{confidence}% de confiance moyenne",
  "predictions.workspace.kpi.liveTrend": "\nEn direct à partir du {generatedAt}",
  "predictions.workspace.distribution.severity": "\nMélange de gravité",
  "predictions.workspace.distribution.assetMix": "\nRépartition de l'actif",
  "predictions.workspace.distribution.siteMix": "\nMélange de sites",
  "predictions.workspace.boardTitle": "\nTableau des risques classés",
  "predictions.workspace.boardDescription":
    "\nLes signaux les plus forts en matière de défaillance, de dégradation, de maintenance et de pression sur le cycle de vie, classés par urgence et impact sur l'entreprise.",
  "predictions.workspace.boardEmpty":
    "\nAucune prédiction filtrée n’est encore disponible. Développez les filtres ou attendez que davantage de télémétrie arrive.",
  "predictions.workspace.table.title": "\nGrille des risques de stocks",
  "predictions.workspace.table.description":
    "Une grille d'opérateurs dense pour analyser l'exposition des actifs, la pression du flux de travail et la prochaine action d'explicabilité.",
  "predictions.workspace.table.asset": "\nActif",
  "predictions.workspace.table.severity": "\nSignal",
  "predictions.workspace.table.inventory": "\nInventaire",
  "predictions.workspace.table.workflow": "\nFlux de travail",
  "predictions.workspace.table.inspect": "\nPreuve ouverte",
  "predictions.workspace.tableEmpty":
    "\nAucune ligne d'inventaire ne correspond à l'ensemble de filtres actuel.",
  "predictions.workspace.railTitle": "\nRail d'explicabilité",
  "predictions.workspace.railDescription":
    "\nUn briefing concis sur l'IA ainsi que le modèle du signal sélectionné, les données sources et les preuves opérationnelles à l'appui.",
  "predictions.workspace.assistant.title": "\nRésumé des opérations IA",
  "predictions.workspace.assistant.description":
    "\nUn bref résumé de l'entreprise fondé sur l'ensemble de données de prédiction active et le signal sélectionné.",
  "predictions.workspace.assistant.sourceAI": "\nBrève IA",
  "predictions.workspace.assistant.sourceSystem": "\nPrésentation du système",
  "predictions.workspace.assistant.generatedAt": "\nGénéré {generatedAt}",
  "predictions.workspace.chatContext":
    "\nCentre de contrôle des prévisions. Espace de travail unifié pour les signaux de risque de l'IA, l'exposition aux stocks, le retard opérationnel et la pression des achats en aval. Contrôles : recherche, gravité, site, type d'actif et plage de dates. Sections principales : bande de KPI, tableau des risques classés, grille d'inventaire et rail de preuves d'IA.",
  "predictions.workspace.assistant.headlineCritical":
    "\nLe risque critique consiste à définir la posture opérationnelle",
  "predictions.workspace.assistant.headlineMonitor":
    "\nLes fenêtres d'intervention sont compressées dans la file d'attente",
  "predictions.workspace.assistant.headlineStable":
    "\nLa file d'attente est active mais largement contrôlée",
  "predictions.workspace.assistant.fallbackLead":
    "\n{asset} à {site} est le principal candidat à l'intervention avec {days} jours de vie restante à {confidence} % de confiance.",
  "predictions.workspace.assistant.fallbackEmpty":
    "\nAucune prédiction dominante n’est actuellement en tête de la file d’attente filtrée. Maintenez une couverture télémétrique saine et surveillez les nouveaux signaux dès leur arrivée.",
  "predictions.workspace.assistant.fallbackCoverage":
    "\nLa tranche actuelle contient {signals} signaux en direct représentant environ {exposure} d'exposition aux stocks, avec {dueSoon} fenêtres d'intervention déjà à l'intérieur du seuil à court terme.",
  "predictions.workspace.card.score": "\nNote",
  "predictions.workspace.card.scoreValue": "\nNote {score}",
  "predictions.workspace.card.remainingLifeValue": "\n{days} jours",
  "predictions.workspace.card.inventory": "\nInventaire",
  "predictions.workspace.card.signalCoverage": "\nDonnées sources",
  "predictions.workspace.card.signalCoverageValue": "\n{count} groupes de fonctionnalités",
  "predictions.workspace.card.openTasksValue": "\n{count} tâches ouvertes",
  "predictions.workspace.card.workOrdersValue": "\n{count} bons de travail actifs",
  "predictions.workspace.card.documentsValue": "\n{count} documents ouverts",
  "predictions.workspace.card.generatedTask": "\nTâche générée",
  "predictions.workspace.action.escalate":
    "\nTransmettre immédiatement à la direction de la maintenance et valider la capacité d'intervention dans la prochaine fenêtre opérationnelle.",
  "predictions.workspace.action.procure":
    "\nConfirmez la couverture des pièces, alignez les achats et déplacez l'actif vers le prochain emplacement d'intervention disponible.",
  "predictions.workspace.action.schedule":
    "Planifiez un examen de maintenance et vérifiez que le carnet de commandes et le plan d'inventaire peuvent absorber le signal avant qu'il ne se durcisse.",
  "predictions.workspace.action.monitor":
    "\nMaintenez la stabilité de la collecte de télémétrie, examinez la ligne de tendance des actifs et surveillez toute dégradation supplémentaire avant de répartir le travail.",
  "predictions.workspace.detail.evidence": "\nPreuve opérationnelle",
  "predictions.workspace.detail.evidenceDescription":
    "\nPreuves déterministes assemblées à partir d'ensembles de données d'actifs, de flux de travail et de documents transactionnels autour du signal sélectionné.",
  "predictions.workspace.detail.sourceData": "\nDonnées sources et métadonnées du modèle",
  "predictions.workspace.detail.sourceDataDescription":
    "\nGroupes de fonctionnalités capturés à partir de la charge utile d'entrée stockée, ainsi que les métadonnées du modèle et du fournisseur.",
  "predictions.workspace.detail.lifecycle": "\nCycle de vie",
  "predictions.workspace.detail.condition": "\nÉtat",
  "predictions.workspace.detail.generatedAt": "\nGénéré à ",
  "predictions.workspace.detail.openTasksEvidence":
    "\n{count} tâches de maintenance actives sont déjà ouvertes pour cet actif.",
  "predictions.workspace.detail.noOpenTasksEvidence":
    "\nAucune tâche de maintenance active n'est actuellement liée à cet actif.",
  "predictions.workspace.detail.workOrdersEvidence":
    "\n{count} bon(s) de travail actif(s) sont déjà liés à cet actif.",
  "predictions.workspace.detail.customerOrdersEvidence":
    "\n{count} commande(s) client transite actuellement par ce contexte d'actif.",
  "predictions.workspace.detail.purchaseOrdersEvidence":
    "\n{count} bons de commande sont toujours ouverts dans ce contexte d'actif.",
  "predictions.workspace.detail.invoicesEvidence":
    "\nLes factures {count} subissent toujours une pression de recouvrement ou d'exécution pour ce contexte d'actif.",
  "predictions.workspace.detail.noDocumentEvidence":
    "\nAucun bon de travail, commande client, bon de commande ou facture lié n'est actuellement ouvert.",
  "predictions.workspace.detail.createdEvidence": "\nSignal généré {generatedAt}.",
  "predictions.workspace.outcomeTitle": "\nRésultats de la promotion en action",
  "predictions.workspace.outcomeDescription":
    "\nDéplacez le signal le plus fort vers le suivi des tâches, des achats ou de la surveillance.",
  "finance.title": "\nFinances",
  "finance.subtitle": "\nExposition à la dépréciation et valorisations ajustées par l'IA",
  "financePlanning.title": "\nPlanification financière",
  "financePlanning.subtitle":
    "\nSituation budgétaire, pression sur les capitaux et planification du cycle de vie",
  "financePlanning.coverage":
    "\nUtilisez l'état actuel des actifs, des sites, des documents et des prévisions comme base de référence pour la planification du budget et des scénarios.",
  "financePlanning.kpi.assets": "\nActifs suivis",
  "financePlanning.kpi.assetsDesc":
    "\nActifs pouvant être intégrés dans des scénarios de planification",
  "financePlanning.kpi.sites": "\nSites concernés",
  "financePlanning.kpi.sitesDesc": "\nLieux contribuant à la planification budgétaire",
  "financePlanning.kpi.openDocuments": "\nDocuments ouverts",
  "financePlanning.kpi.openDocumentsDesc":
    "\nDocuments transactionnels actuellement actifs pour la demande, la livraison, l'achat et la facturation",
  "financePlanning.kpi.dueSoon": "\nSignaux à échéance prochainement",
  "financePlanning.kpi.dueSoonDesc": "\nSignaux pouvant se transformer en demande de remplacement",
  "financePlanning.summary.alertTitle":
    "\nLa posture de planification peut déjà être fondée sur les données de portefeuille en direct",
  "financePlanning.summary.alertDescription":
    "Utilisez des profils de planification de site, des signaux d'actifs à venir, des documents prêts à être exécutés et des rapports enregistrés pour établir des budgets et des scénarios sans pile de planification distincte.",
  "financePlanning.summary.tab.readiness": "\nÉtat de préparation",
  "financePlanning.summary.tab.handoff": "\nTransfert",
  "financePlanning.summary.tab.intake": "\nApport inter-domaines",
  "financePlanning.summary.siteTitle": "\nPréparation à la planification du site",
  "financePlanning.summary.siteDescription":
    "\nLes profils de planification constituent la structure actuelle permettant d'intégrer le contexte des installations, de la flotte et de l'exploitation dans les décisions financières.",
  "financePlanning.summary.siteProfiles": "\nProfils de planification",
  "financePlanning.summary.siteProfilesDesc":
    "\n{total} sites sont actuellement disponibles pour la planification.",
  "financePlanning.summary.assetScope": "\nPortefeuille dans le champ d'application",
  "financePlanning.summary.assetScopeDesc":
    "\nLa base d'actifs gérés actuelle est déjà suffisamment importante pour prendre en charge des tranches de planification basées sur des scénarios.",
  "financePlanning.summary.postureTitle": "\nPosture de préparation",
  "financePlanning.summary.postureDescription":
    "\nPromouvez ensemble le contexte de planification du site, les documents prêts à être exécutés et les signaux de risque afin que la planification financière devienne un flux de travail connecté au lieu d'une exportation de feuille de calcul.",
  "financePlanning.summary.badgeSites": "\nSites",
  "financePlanning.summary.badgeDocuments": "\nDocuments",
  "financePlanning.summary.badgeSignals": "\nSignaux",
  "financePlanning.summary.pressureTitle": "\nPression sur les capitaux à venir",
  "financePlanning.summary.pressureDesc":
    "\nLes prévisions à court terme constituent l’indicateur avancé actuel du budget et de la demande de remplacement.",
  "financePlanning.summary.documentsTitle": "\nDocuments prêts à être exécutés",
  "financePlanning.summary.documentsDesc":
    "\nLes documents opérationnels approuvés et émis sont déjà préparés pour la livraison, les achats et le suivi des collections.",
  "financePlanning.summary.reportTitle": "\nRésultats de planification enregistrés",
  "financePlanning.summary.reportDesc":
    "\nLes rapports enregistrés constituent la surface de transfert actuelle pour le conditionnement et l'examen de la planification par les parties prenantes.",
  "financePlanning.summary.intakeTitle": "\nApport de planification interdomaine",
  "financePlanning.summary.intakeDescription":
    "\nLa planification financière constitue désormais la surface de cumul des demandes opérationnelles capturées dans la flotte, les bâtiments et les capteurs.",
  "financePlanning.summary.intakeFleetTitle":
    "\nInitiatives de flotte en attente d'élaboration de scénarios",
  "financePlanning.summary.intakeFleetDesc":
    "\nLes initiatives de remplacement, de conformité et d’entretien des véhicules peuvent désormais être considérées comme des apports financiers directs.",
  "financePlanning.summary.intakeBuildingsTitle":
    "\nInitiatives en matière d'installations prêtes pour le cadrage budgétaire",
  "financePlanning.summary.intakeBuildingsDesc":
    "\nDes initiatives en matière de systèmes de construction et d'espace sont disponibles pour l'élaboration de scénarios d'investissement et d'exploitation.",
  "financePlanning.summary.intakeSensorsTitle":
    "\nAlertes de capteur signalant la pression de planification",
  "financePlanning.summary.intakeSensorsDesc":
    "\nLes règles d'alerte des capteurs identifient les conditions de télémétrie qui peuvent justifier une intervention, des pièces de rechange ou un budget de remplacement.",
  "financePlanning.summary.intakeAlert":
    "Utilisez cette voie d'admission pour transformer le travail opérationnel en scénarios de planification sans retaper le même contexte décisionnel.",
  "financePlanning.summary.intakeTotal": "\nSignaux opérationnels entrants",
  "financePlanning.summary.intakeTotalDesc":
    "\nInitiatives et règles interdomaines actuellement disponibles pour être traduites en scénarios de planification financière.",
  "financePlanning.summary.scenarioDrafts": "\nScénarios sur le pont",
  "financePlanning.summary.scenarioDraftsDesc":
    "\nScénarios de planification existants déjà capturés dans l'espace de travail de planification financière.",
  "financePlanning.summary.badgeFleet": "\nFlotte",
  "financePlanning.summary.badgeBuildings": "\nBâtiments",
  "financePlanning.summary.badgeSensors": "\nCapteurs",
  "financePlanning.summary.intakePosture":
    "\nL'espace de travail de planification financière peut désormais servir de point de transfert partagé entre la capture des initiatives opérationnelles et l'élaboration du budget au niveau du portefeuille.",
  "financePlanning.seed.ready": "\nPrêt à semer",
  "financePlanning.seed.empty":
    "\nAucun signal de planification n'est encore disponible pour l'amorçage.",
  "financePlanning.seed.count": "\n{count} signaux en entrée",
  "financePlanning.seed.apply": "\nScénario de départ",
  "financePlanning.seed.unavailable": "\nAucune graine disponible",
  "financePlanning.seed.applied": "\nContexte {source} copié dans la fiche scénario.",
  "financePlanning.seed.fleet.title": "\nSemences de la flotte",
  "financePlanning.seed.fleet.description":
    "\nUtilisez la dernière initiative de flotte pour pré-remplir un scénario de planification avec la portée, l'urgence et les notes d'exploitation.",
  "financePlanning.seed.buildings.title": "\nSemences des bâtiments",
  "financePlanning.seed.buildings.description":
    "\nUtilisez la dernière initiative en matière d'installations pour pré-remplir le contexte de planification des investissements ou des opérations.",
  "financePlanning.seed.sensors.title": "\nGraine provenant des capteurs",
  "financePlanning.seed.sensors.description":
    "\nUtilisez la dernière règle d'alerte des capteurs pour transformer la pression télémétrique en un démarreur de scénario de planification.",
  "financePlanning.seed.fleetPrefix": "\nTransfert de flotte",
  "financePlanning.seed.fleetContext":
    "\nIssu de l’initiative de la flotte. Catégorie : {category}. Priorité : {priority}.",
  "financePlanning.seed.fleetSummary": "\nDernière initiative de flotte mise à jour {updatedAt}.",
  "financePlanning.seed.buildingsPrefix": "\nTransfert des installations",
  "financePlanning.seed.buildingsContext":
    "\nIssu de l’initiative des installations. Catégorie : {category}. Phase : {phase}.",
  "financePlanning.seed.buildingsSummary":
    "\nDernière initiative en matière d'installations mise à jour {updatedAt}.",
  "financePlanning.seed.sensorsPrefix": "\nTransfert du capteur",
  "financePlanning.seed.sensorsContext":
    "\nGénéré à partir de la règle d’alerte du capteur. Série : {seriesKey}. Comparateur : {comparator}. Seuil : {threshold}. Gravité : {severity}.",
  "financePlanning.seed.sensorsSummary":
    "\nDernière règle d'alerte de capteur mise à jour {updatedAt}.",
  "financePlanning.form.title": "\nCréer un scénario de planification",
  "financePlanning.form.description":
    "\nCapturez le prochain budget ou scénario d'investissement directement à partir de la position de planification en direct, puis transmettez-le aux finances, aux flux de documents et aux flux de reporting.",
  "financePlanning.form.badge": "\nFlux SSR durable",
  "financePlanning.form.nameLabel": "\nTitre du scénario",
  "financePlanning.form.namePlaceholder": "\nActualisation CVC du campus 2027",
  "financePlanning.form.nameHint":
    "\nNommez le paquet de décisions que les opérateurs reconnaîtront plus tard.",
  "financePlanning.form.scopeLabel": "\nPortée",
  "financePlanning.form.scopePlaceholder": "Bâtiments, flotte, capteurs ou tranche de portefeuille",
  "financePlanning.form.scopeHint":
    "\nGardez la portée alignée sur un département, un groupe de sites ou un thème de portefeuille.",
  "financePlanning.form.horizonLabel": "\nHorizon de planification",
  "financePlanning.form.horizonHint": "\n{min}-{max} mois, selon le cycle de planification.",
  "financePlanning.form.horizonUnit": "\nmois",
  "financePlanning.form.horizonValue": "\n{months} mois",
  "financePlanning.form.notesLabel": "\nNotes et hypothèses",
  "financePlanning.form.notesPlaceholder":
    "\nCapturez les hypothèses de dépenses, les contraintes de calendrier, la position en matière de risque et ce qui devrait ensuite être intégré aux achats ou aux rapports.",
  "financePlanning.form.notesHint":
    "\nUtilisez-le pour enregistrer le raisonnement qui devrait survivre dans les approbations et les packs de rapports.",
  "financePlanning.form.requiredHint": "\nLe titre, la portée et l'horizon sont requis.",
  "financePlanning.form.submit": "\nEnregistrer le scénario",
  "financePlanning.form.submitAria": "\nEnregistrer le scénario de planification financière",
  "financePlanning.form.recentTitle": "\nScénarios récents",
  "financePlanning.form.recentDescription":
    "\nCes scénarios sont désormais conservés sous forme d'enregistrements de planification financière durables sans quitter le flux RSS.",
  "financePlanning.form.empty":
    "\nAucun scénario de planification financière n'a encore été capturé.",
  "financePlanning.form.savedAt": "\nMise à jour {updatedAt}",
  "financePlanning.form.notesEmpty": "\nAucune note capturée pour l'instant.",
  "financePlanning.validation.titleRequired": "Le titre du scenario est obligatoire.",
  "financePlanning.validation.scopeRequired": "\nLa portée du scénario est requise.",
  "financePlanning.validation.seedSourceInvalid":
    "\nLa source de semences doit provenir d'une flotte, de bâtiments ou de capteurs.",
  "financePlanning.validation.horizonRange":
    "\nL’horizon de planification doit être compris entre {min} et {max} mois.",
  "financePlanning.feedback.draftSaved":
    "\nScénario financier enregistré dans l'espace de travail de planification financière.",
  "financePlanning.feedback.draftSaveFailed":
    "\nImpossible de conserver le scénario financier pour le moment.",
  "financePlanning.status.draft": "\nScénario",
  "financePlanning.draft.promoteReports": "Ouvrir dans les rapports",
  "financePlanning.readiness.assets":
    "\nLa situation des actifs et du site alimente déjà le périmètre de planification.",
  "financePlanning.readiness.documents":
    "\nLes appels d'offres, les commandes, les bons de travail, les bons de commande et les factures peuvent être intégrés directement dans les décisions de scénario.",
  "financePlanning.readiness.reporting":
    "\nLes surfaces de reporting actuelles peuvent regrouper les résultats de la planification sans nouvelle pile.",
  "financePlanning.page.eyebrow": "\nFinances",
  "financePlanning.action.createScenario": "\nCréer un scénario",
  "financePlanning.action.finance":
    "\nExaminez le risque de dépréciation en temps réel avant de modifier le plan.",
  "financePlanning.action.documents":
    "\nTransférez les décisions de scénario dans les espaces de travail du document pour le suivi des devis, des commandes et des achats.",
  "financePlanning.action.reports":
    "\nRegroupez la posture de planification dans des packs de rapports destinés aux parties prenantes.",
  "financePlanning.action.fleet":
    "\nReliez la demande et la pression de remplacement aux opérations des véhicules.",
  "financePlanning.action.buildings":
    "\nSuivez la pression des capitaux sur la couverture des installations et des systèmes de bâtiments.",
  "financePlanning.action.sensors":
    "\nUtilisez le capteur et la posture d'alerte pour tester la pression et les hypothèses de planification.",
  "estate.title": "\nSuccession",
  "estate.subtitle":
    "Gouvernance du portefeuille, assurance des services, préparation et contrôles du programme",
  "estate.coverage":
    "\nUn plan de contrôle successoral faisant autorité pour les actions d'enregistrement, de gouvernance FM, de préparation, de partenariats, de gestion et de reporting.",
  "estate.kpi.assets": "\nActifs enregistrés",
  "estate.kpi.assetsDesc":
    "\nCouverture actuelle du registre des actifs immobiliers dans toutes les classes d’actifs gérés.",
  "estate.kpi.facilities": "\nSites des installations",
  "estate.kpi.facilitiesDesc":
    "\nSites déjà marqués comme installations dans la hiérarchie du domaine.",
  "estate.kpi.workOrders": "\nBons de travail actifs",
  "estate.kpi.workOrdersDesc":
    "\nLa livraison opérationnelle passe actuellement par la gestion financière et l'exécution du patrimoine.",
  "estate.kpi.approvals": "\nApprobations en attente",
  "estate.kpi.approvalsDesc":
    "\nLes initiatives immobilières et les approbations de projets attendent actuellement leur progression via la gouvernance.",
  "estate.summary.alertTitle":
    "\nLa gouvernance successorale repose désormais sur des systèmes opérationnels opérationnels de référence",
  "estate.summary.alertDescription":
    "\nUtilisez le registre actuel, le flux de livraison FM, le graphique des documents commerciaux et les contrôles d'approbation pour gérer la gouvernance, l'assurance et la préparation du portefeuille à partir d'une seule surface de patrimoine connectée.",
  "estate.summary.tab.registry": "\nRegistre",
  "estate.summary.tab.delivery": "\nPrestation de services",
  "estate.summary.tab.maintenance": "\nGouvernance FM",
  "estate.summary.tab.readiness": "\nÉtat de préparation",
  "estate.summary.tab.partnerships": "\nTerrain et partenaires",
  "estate.summary.tab.stewardship": "\nIntendance",
  "estate.summary.tab.operations": "\nGammes et GFE",
  "estate.summary.tab.strategy": "\nStratégie",
  "estate.summary.tab.programme": "\nProgramme",
  "estate.summary.registryTitle": "\nPréparation au registre des actifs",
  "estate.summary.registryDescription":
    "\nLa couverture des actifs et des installations constitue désormais la hiérarchie successorale faisant autorité pour la gouvernance, l'assurance et l'examen des investissements du portefeuille.",
  "estate.summary.registryAssets": "\nActifs concernés par le champ d'application",
  "estate.summary.registryAssetsDesc":
    "\nLes installations {total} se trouvent actuellement à l’intérieur de l’empreinte du domaine géré.",
  "estate.summary.registryTelemetry": "\nActifs liés à la télémétrie",
  "estate.summary.registryTelemetryDesc":
    "\nLes actifs connectés fournissent des conditions de fonctionnement et un contexte d'utilisation pour la priorisation.",
  "estate.summary.registryHierarchy": "\nActifs mappés par hiérarchie",
  "estate.summary.registryHierarchyDesc":
    "\n{coverage} du registre comporte désormais un placement explicite dans la hiérarchie successorale.",
  "estate.summary.registryCapability": "\nActifs liés aux capacités",
  "estate.summary.registryCapabilityDesc":
    "\n{coverage} du registre nomme désormais la capacité opérationnelle prise en charge par chaque actif.",
  "estate.summary.postureTitle": "\nPosture de contrôle",
  "estate.summary.postureDescription":
    "\nGardez la couverture des actifs, les signaux opérationnels en direct et les initiatives durables alignées afin que la gestion stratégique du patrimoine reste liée à l'exécution.",
  "estate.summary.badgeIso": "ISO 55001 conforme",
  "estate.summary.badgeFm": "\nLivraison FM",
  "estate.summary.badgeP3m": "P3M Niveau",
  "estate.summary.deliveryTitle": "\nPrestation de services opérationnels",
  "estate.summary.deliveryDescription":
    "L'exécution dure du FM, l'activité contractuelle et les documents en aval montrent la pression actuelle en matière de livraison dans l'ensemble du modèle opérationnel du domaine.",
  "estate.summary.deliveryOpenWorkOrders": "\nBons de travail ouverts",
  "estate.summary.deliveryOpenWorkOrdersDesc":
    "\nExécution actuellement active dans les flux de maintenance, d’assurance et de récupération.",
  "estate.summary.deliveryOverdueWorkOrders": "\nBons de travail en retard",
  "estate.summary.deliveryOverdueWorkOrdersDesc":
    "\nTravaux planifiés déjà en dehors des dates cibles et nécessitant une attention particulière en matière d'atténuation.",
  "estate.summary.deliveryDocuments": "\nDocuments opérationnels actifs",
  "estate.summary.deliveryDocumentsDesc":
    "\nLes appels d'offres, les commandes, les bons de commande, les factures et les bons de travail continuent de parcourir le graphique du contrat.",
  "estate.summary.deliveryExecutionReady": "\nDocuments prêts à être exécutés",
  "estate.summary.deliveryExecutionReadyDesc":
    "\nDocuments qui ont déjà été acceptés et qui peuvent générer des activités de livraison ou de facturation.",
  "estate.summary.maintenanceAlertTitle":
    "\nLa gouvernance hard et soft FM s'inscrit désormais dans le même espace de travail stratégique immobilier",
  "estate.summary.maintenanceAlertDescription":
    "\nUtilisez un registre durable pour les calendriers SFG20, les inspections réglementaires, les examens d'assurance, les services FM souples et les signaux de référence au lieu de séparer la gouvernance FM de l'ensemble du patrimoine.",
  "estate.summary.maintenanceTitle": "\nPosture de gouvernance FM",
  "estate.summary.maintenanceDescription":
    "\nSuivez la maintenance planifiée, l'inspection réglementaire, la prestation de services Soft FM et la pression de référence sans quitter la couche de contrôle du domaine SSR.",
  "estate.summary.maintenanceRegister": "\nRegistre de gouvernance FM",
  "estate.summary.maintenanceRegisterDesc":
    "\nLes enregistrements {count} nécessitent actuellement une intervention de conformité ou de livraison.",
  "estate.summary.maintenanceHardFm": "\nCommandes FM dures",
  "estate.summary.maintenanceHardFmDesc":
    "\nLes contrôles réglementaires {count} sont actuellement conservés dans le registre d'entretien.",
  "estate.summary.maintenanceSoftFm": "\nCommandes FM douces",
  "estate.summary.maintenanceSoftFmDesc":
    "\nLes enregistrements d'analyse comparative {count} comparent actuellement les résultats des services et l'état de la productivité.",
  "estate.summary.maintenancePerformance": "\nPerformances des services",
  "estate.summary.maintenancePerformanceDesc":
    "\nLes enregistrements de service programmés {count} façonnent actuellement le calendrier FM opérationnel.",
  "estate.summary.maintenancePerformanceEmpty": "\nPas encore de score",
  "estate.summary.maintenancePerformanceValue": "\n{score}% score moyen",
  "estate.summary.readinessAlertTitle":
    "\nL'état de préparation du domaine reflète désormais le graphique opérationnel en direct",
  "estate.summary.readinessAlertDescription":
    "\nLes actifs capacitaires liés à la portée, les contraintes d'infrastructure, la dette d'inspection, l'activité de la main-d'œuvre et les risques du projet sont combinés dans une seule vue de préparation à la RSS.",
  "estate.summary.readinessTitle": "\nPosture de préparation à la succession",
  "estate.summary.readinessDescription":
    "Utilisez cette couche de préparation pour surveiller la disponibilité de la plage, les contraintes d'infrastructure, l'état des capacités et l'impact sur la main-d'œuvre sans quitter le plan de contrôle du domaine.",
  "estate.summary.readinessRangeAvailability": "\nDisponibilité de la gamme",
  "estate.summary.readinessRangeAvailabilityDesc":
    "\nLes actifs liés au champ de tir et à l'entraînement {total} sont actuellement suivis pour le suivi de l'état de préparation.",
  "estate.summary.readinessConstraints": "\nContraintes d'infrastructure",
  "estate.summary.readinessConstraintsDesc":
    "\n{assets} actifs limités et {projects} projets à haut risque contribuent actuellement à la pression successorale.",
  "estate.summary.readinessCapability": "\nÉtat de préparation des capacités",
  "estate.summary.readinessCapabilityDesc":
    "\nLes groupements de capacités {watch} restent sous surveillance dans les groupements de préparation suivis {total}.",
  "estate.summary.readinessWorkforce": "\nHeures de travail enregistrées",
  "estate.summary.readinessWorkforceDesc":
    "\n{inspections} les tâches d'inspection en retard restent ouvertes par rapport à l'état de préparation actuel.",
  "estate.summary.programmeTitle": "\nProgramme et flux d'approbation",
  "estate.summary.programmeDescription":
    "\nLes initiatives immobilières, les registres de projets, les étapes d'approbation et les scénarios financiers fournissent le transfert actuel vers la livraison P3M, l'examen DIO et le reporting du programme.",
  "estate.summary.programmeInitiatives": "\nInitiatives successorales",
  "estate.summary.programmeInitiativesDesc":
    "\nLes enregistrements de programme durables sont désormais capturés dans l'espace de travail du domaine.",
  "estate.summary.programmeProjects": "\nRegistre des projets",
  "estate.summary.programmeProjectsDesc":
    "\nLes projets immobiliers durables capturent désormais le type de livraison, la position des coûts, la pression sur les ressources et l'état d'approbation.",
  "estate.summary.programmeApprovalQueue": "\nApprobations du projet",
  "estate.summary.programmeApprovalQueueDesc":
    "\n{delayed} éléments en retard restent actuellement dans la file d'attente d'approbation de projet active.",
  "estate.summary.programmeControls": "\nContrôles du projet",
  "estate.summary.programmeControlsDesc":
    "\n{changes} les éléments de modification du projet restent actuellement dans le flux de contrôle de projet actif.",
  "estate.summary.partnershipsAlertTitle":
    "\nLa surveillance foncière, commerciale et de restauration se situe désormais dans l'espace de travail stratégique du domaine",
  "estate.summary.partnershipsAlertDescription":
    "\nLes licences et locations rurales, les registres de revenus de tiers et la surveillance de la restauration par l'ESS sont désormais capturés sous forme de registres d'accords de succession durables liés aux sites et à l'équipement.",
  "estate.summary.partnershipsTitle": "\nCoordination foncière et partenaires",
  "estate.summary.partnershipsDescription":
    "\nUtilisez ce registre pour gérer l'utilisation des terres rurales, les activités commerciales de tiers et la coordination de la restauration par rapport au même graphique de site et d'actifs qui pilote les opérations immobilières.",
  "estate.summary.partnershipsRegister": "\nRegistre des accords",
  "estate.summary.partnershipsRegisterDesc":
    "Les enregistrements d'accord {count} sont actuellement actifs dans le registre successoral.",
  "estate.summary.partnershipsRural": "\nAccords ruraux",
  "estate.summary.partnershipsRuralDesc":
    "\nLes registres de pâturage, de location et d'accès aux terres cohabitent désormais aux côtés des opérations immobilières.",
  "estate.summary.partnershipsCommercial": "\nRevenus commerciaux",
  "estate.summary.partnershipsCommercialDesc":
    "\nLes enregistrements d'accord {count} sont actuellement directement liés à un actif pour la surveillance de l'utilisation.",
  "estate.summary.partnershipsCoordination": "\nConflits de coordination",
  "estate.summary.partnershipsCoordinationDesc":
    "\nLa surveillance de la restauration est actuellement en moyenne de {score} sur l'ensemble des dossiers de service notés.",
  "estate.summary.partnershipsCateringValue": "\n{score}% score moyen",
  "estate.summary.partnershipsCateringValueEmpty": "\naucun record marqué",
  "estate.summary.stewardshipAlertTitle":
    "\nLes contrôles forestiers, patrimoniaux et environnementaux partagent désormais un seul registre d'intendance du domaine",
  "estate.summary.stewardshipAlertDescription":
    "\nLes calendriers forestiers, la pression du consentement au patrimoine, la surveillance de l'habitat et les enregistrements des espèces protégées se trouvent désormais sur le même site et le même graphique d'actifs que la livraison et l'état de préparation.",
  "estate.summary.stewardshipTitle": "\nPosture de gestion successorale",
  "estate.summary.stewardshipDescription":
    "\nUtilisez ce registre pour coordonner les opérations forestières, l'état du patrimoine et les pressions de consentement, ainsi que les obligations de gestion environnementale sans quitter l'espace de travail du domaine.",
  "estate.summary.stewardshipRegister": "\nRegistre d'intendance",
  "estate.summary.stewardshipRegisterDesc":
    "\nLes dossiers de gestion {count} nécessitent actuellement une attention à risque ou axée sur la conformité.",
  "estate.summary.stewardshipForestry": "\nRegistres forestiers",
  "estate.summary.stewardshipForestryDesc":
    "\nLa valeur de la production de bois suivie s'élève actuellement à {value} pour l'ensemble des retours forestiers enregistrés.",
  "estate.summary.stewardshipHeritage": "\nRegistres du patrimoine",
  "estate.summary.stewardshipHeritageDesc":
    "\n{count} élément(s) d'autorisation de travaux restent actuellement dans la file d'attente d'approbation du patrimoine.",
  "estate.summary.stewardshipEnvironment": "\nDossiers environnementaux",
  "estate.summary.stewardshipEnvironmentDesc":
    "\n{count} les enregistrements d'espèces protégées sont actuellement actifs dans le registre d'intendance.",
  "estate.summary.operationsAlertTitle":
    "\nLes opérations de tir, la sécurité, le ciblage et le GFE partagent désormais un registre de contrôle immobilier durable",
  "estate.summary.operationsAlertDescription":
    "\nL'état de préparation du champ d'entraînement, les défauts de sécurité, la disponibilité des cibles et la posture de remplacement du GFE se trouvent désormais sur le même site et le même graphique d'actifs que les contrôles de livraison, de préparation et P3M.",
  "estate.summary.operationsTitle": "\nContrôles opérationnels du domaine de formation",
  "estate.summary.operationsDescription":
    "\nUtilisez ce registre pour gérer l'activité TAROM, la conformité en matière de sécurité MOD, le cycle de vie des cibles et la posture des équipements fournis par le gouvernement sans quitter l'espace de travail du domaine.",
  "estate.summary.operationsRegister": "Registre de contrôle opérationnel",
  "estate.summary.operationsRegisterDesc":
    "\n{count} enregistrement(s) montrent actuellement une posture opérationnelle contrainte ou non conforme.",
  "estate.summary.operationsRanges": "\nOpérations de plage",
  "estate.summary.operationsRangesDesc":
    "\nLes enregistrements de disponibilité de la plage {count} sont actuellement marqués comme disponibles.",
  "estate.summary.operationsTargetry": "\nEnregistrements de ciblage",
  "estate.summary.operationsTargetryDesc":
    "\n{count} les voies ou systèmes cibles sont actuellement enregistrés comme disponibles.",
  "estate.summary.operationsGfe": "\nEnregistrements GFE",
  "estate.summary.operationsGfeDesc":
    "\n{count} élément(s) de remplacement restent actuellement dans la file d'attente GFE active.",
  "estate.summary.strategyAlertTitle":
    "\nLes plans d'actifs stratégiques se trouvent désormais dans le même espace de travail immobilier que les finances, la livraison et les approbations",
  "estate.summary.strategyAlertDescription":
    "\nMaintenir le plan de gestion stratégique des actifs en tant que registre successoral durable lié aux étapes du cycle de vie, à la position de priorisation et aux scénarios facultatifs de planification financière.",
  "estate.summary.strategyTitle": "\nPosture de gestion stratégique des actifs",
  "estate.summary.strategyDescription":
    "\nUtilisez cette couche pour que la planification ISO 55001 reste alignée sur les objectifs organisationnels, la priorisation basée sur les risques, les objectifs de performance des actifs et les décisions d'investissement dans les infrastructures à long terme.",
  "estate.summary.strategyRegister": "\nPlans stratégiques",
  "estate.summary.strategyRegisterDesc":
    "\n{count} éléments de plan restent actuellement dans la file d'attente d'approbation de stratégie active.",
  "estate.summary.strategyLongHorizon": "\nPlans à long terme",
  "estate.summary.strategyLongHorizonDesc":
    "\nPlans dont les horizons d'infrastructure ou de cycle de vie sont égaux ou supérieurs au seuil de planification à long terme.",
  "estate.summary.strategyFinanceLinked": "\nPlans liés au financement",
  "estate.summary.strategyFinanceLinkedDesc":
    "\nPlans stratégiques déjà liés directement aux scénarios de planification financière enregistrés.",
  "estate.summary.strategyRiskLed": "\nPlans axés sur les risques",
  "estate.summary.strategyRiskLedDesc":
    "\nL’horizon moyen de planification stratégique est actuellement de {average} mois pour l’ensemble du registre.",
  "estate.strategyForm.title": "\nMaintenir le plan stratégique de gestion des actifs",
  "estate.strategyForm.description":
    "\nCapturez des enregistrements de stratégie immobilière alignés sur la norme ISO 55001 qui relient les objectifs organisationnels, la position du cycle de vie, la priorisation basée sur les risques et la planification des investissements à long terme.",
  "estate.strategyForm.badge": "\nPlan stratégique SAM",
  "estate.strategyForm.nameLabel": "\nTitre du régime",
  "estate.strategyForm.namePlaceholder": "\nPlan stratégique de renouvellement du domaine du Nord",
  "estate.strategyForm.nameHint":
    "\nUtilisez un titre qui peut rester stable dans les packs de gouvernance, les rapports DIO et les révisions de planification.",
  "estate.strategyForm.scopeLabel": "\nPortée du patrimoine",
  "estate.strategyForm.scopePlaceholder":
    "\nDomaine d'entraînement Nord, gammes régionales ou tranche de domaine d'entreprise",
  "estate.strategyForm.scopeHint":
    "Gardez la portée alignée sur l’empreinte du domaine ou le portefeuille de capacités régi par le plan.",
  "estate.strategyForm.objectiveLabel": "\nObjectif organisationnel",
  "estate.strategyForm.objectiveHint":
    "\nChoisissez l’objectif organisationnel principal sur lequel ce plan stratégique s’aligne.",
  "estate.strategyForm.lifecycleLabel": "\nFocus sur le cycle de vie",
  "estate.strategyForm.lifecycleHint":
    "\nNommez l’étape dominante du cycle de vie que le plan gère actuellement.",
  "estate.strategyForm.prioritisationLabel": "\nBase de priorisation",
  "estate.strategyForm.prioritisationHint":
    "\nIndiquez si le plan est axé sur le risque, la performance, la conformité, la demande ou la valeur.",
  "estate.strategyForm.horizonLabel": "\nHorizon de planification",
  "estate.strategyForm.horizonHint":
    "\nUtilisez la fenêtre de planification en mois pour les décisions à long terme en matière d'infrastructure et de cycle de vie.",
  "estate.strategyForm.financeScenarioLabel": "\nScénario de planification financière",
  "estate.strategyForm.financeScenarioHint":
    "\nVous pouvez éventuellement lier le plan directement à un scénario de planification financière enregistré pour le transfert de l'investissement.",
  "estate.strategyForm.financeScenarioOptional": "\nAucun scénario financier lié",
  "estate.strategyForm.performanceTargetLabel": "\nObjectif de performances",
  "estate.strategyForm.performanceTargetPlaceholder":
    "\nRestaurer une disponibilité de 95 % sur les voies restreintes",
  "estate.strategyForm.performanceTargetHint":
    "\nNommez le résultat mesurable en matière de service, de préparation ou de condition que ce plan entraîne.",
  "estate.strategyForm.investmentCaseLabel": "\nCas d’investissement et d’infrastructure",
  "estate.strategyForm.investmentCasePlaceholder":
    "\nSéquencez l'actualisation des civils, des utilitaires et du cycle de vie au cours de la prochaine période de contrôle.",
  "estate.strategyForm.investmentCaseHint":
    "\nRésumez le dossier d’investissement dans les infrastructures à long terme ou la logique d’intervention sur le cycle de vie.",
  "estate.strategyForm.approvalLabel": "\nPosture d'approbation",
  "estate.strategyForm.approvalHint":
    "\nVérifiez si le plan stratégique est encore en ébauche, soumis, approuvé ou rejeté.",
  "estate.strategyForm.notesLabel": "\nBons de livraison",
  "estate.strategyForm.notesPlaceholder":
    "\nCapturez les dépendances, la cadence de révision ou les points de surveillance des performances des actifs.",
  "estate.strategyForm.notesHint":
    "\nUtilisez des notes pour le contexte de gouvernance qui doivent rester visibles pendant la maintenance du plan.",
  "estate.strategyForm.requiredHint":
    "\nLes champs obligatoires doivent être remplis avant que le plan puisse être enregistré.",
  "estate.strategyForm.submit": "\nEnregistrer le plan stratégique",
  "estate.strategyForm.submitAria": "\nEnregistrer le plan de gestion stratégique des actifs",
  "estate.strategyForm.recentTitle": "\nRegistre du plan stratégique",
  "estate.strategyForm.recentDescription":
    "\nLes plans stratégiques récents restent affichés parallèlement à leur état de cycle de vie, leur état d'approbation et leur lien financier.",
  "estate.strategyForm.empty": "\nAucun plan d'actifs stratégiques n'a encore été capturé.",
  "estate.strategyForm.notesEmpty": "\nAucun bon de livraison supplémentaire n'a été capturé.",
  "estate.strategyForm.feedback.saved":
    "\nPlan de gestion stratégique des actifs enregistré dans l'espace de travail du domaine.",
  "estate.strategyForm.feedback.saveFailed":
    "\nImpossible de maintenir le plan stratégique de gestion des actifs pour le moment.",
  "estate.strategyForm.summary.approvalQueue": "{count} dans le flux d'approbation",
  "estate.strategyForm.summary.financeLinked": "\n{count} lié à la finance",
  "estate.strategyForm.summary.horizonPosture":
    "\n{long} plan(s) à long terme, {risk} plan(s) axé(s) sur le risque, {average} horizon moyen mensuel.",
  "estate.strategyForm.tableAria": "\nPlans de gestion stratégique des actifs",
  "estate.strategyForm.table.plan": "\nPlan",
  "estate.strategyForm.table.scope": "\nPortée et objectif",
  "estate.strategyForm.table.lifecycle": "\nCycle de vie et priorité",
  "estate.strategyForm.table.performance": "\nPerformance et horizon",
  "estate.strategyForm.table.approval": "\nLien d'approbation et de financement",
  "estate.strategyForm.table.investment": "\nDossier d'investissement",
  "estate.strategyForm.table.updatedAt": "\nMise à jour {date}",
  "estate.strategyForm.table.horizonValue": "\n{months} mois",
  "estate.strategyForm.table.financeScenarioUnlinked": "\nAucun scénario financier lié",
  "estate.strategyForm.validation.titleRequired": "\nLe titre du plan stratégique est requis.",
  "estate.strategyForm.validation.scopeRequired": "\nLa portée du plan stratégique est requise.",
  "estate.strategyForm.validation.objectiveRequired":
    "\nUn objectif stratégique est requis pour le plan.",
  "estate.strategyForm.validation.lifecycleRequired":
    "\nLe plan doit être axé sur le cycle de vie.",
  "estate.strategyForm.validation.prioritisationRequired":
    "\nUne base de priorisation est requise pour le plan.",
  "estate.strategyForm.validation.horizonRange":
    "\nL’horizon de planification doit être compris entre {min} et {max} mois.",
  "estate.strategyForm.validation.performanceTargetRequired":
    "\nUn objectif de performance est requis pour le plan.",
  "estate.strategyForm.validation.investmentCaseRequired":
    "\nUn dossier d’investissement et d’infrastructure est requis pour le plan.",
  "estate.strategyForm.validation.financeScenarioInvalid":
    "\nLe scénario de planification financière sélectionné est introuvable.",
  "estate.strategyForm.validation.approvalRequired":
    "\nUne posture d'approbation valide est requise pour le plan.",
  "estate.strategyForm.objective.CAPABILITY_READINESS": "\nÉtat de préparation des capacités",
  "estate.strategyForm.objective.COMPLIANCE_ASSURANCE": "\nAssurance de conformité",
  "estate.strategyForm.objective.SERVICE_PERFORMANCE": "\nPerformances des services",
  "estate.strategyForm.objective.LIFECYCLE_SUSTAINMENT": "\nMaintien du cycle de vie",
  "estate.strategyForm.objective.INFRASTRUCTURE_INVESTMENT":
    "\nInvestissement dans les infrastructures",
  "estate.strategyForm.lifecycle.ACQUIRE": "\nAcquérir",
  "estate.strategyForm.lifecycle.OPERATE": "\nUtiliser",
  "estate.strategyForm.lifecycle.MAINTAIN": "\nMaintenir",
  "estate.strategyForm.lifecycle.REFRESH": "\nActualiser",
  "estate.strategyForm.lifecycle.DISPOSE": "\nÉliminer",
  "estate.strategyForm.prioritisation.RISK": "\nMené par le risque",
  "estate.strategyForm.prioritisation.PERFORMANCE": "\nAxé sur la performance",
  "estate.strategyForm.prioritisation.COMPLIANCE": "\nMené par la conformité",
  "estate.strategyForm.prioritisation.DEMAND": "\nAxé sur la demande",
  "estate.strategyForm.prioritisation.VALUE": "\nAxé sur la valeur",
  "estate.initiativeForm.title": "\nCréer une initiative successorale",
  "estate.initiativeForm.description":
    "\nCapturez un dossier de patrimoine stratégique qui peut survivre dans les approbations, les revues de programmes, le suivi FM et les packs de rapports.",
  "estate.initiativeForm.badge": "\nFlux successoral durable",
  "estate.initiativeForm.nameLabel": "\nTitre de l'initiative",
  "estate.initiativeForm.namePlaceholder": "\nDomaine d'entraînement récupération FM dure",
  "estate.initiativeForm.nameHint":
    "\nUtilisez un titre qui peut rester stable au fil des approbations, des rapports et des transferts entre opérateurs.",
  "estate.initiativeForm.scopeLabel": "\nPortée du patrimoine",
  "estate.initiativeForm.scopePlaceholder":
    "\nSupport pour les chaînes sud, les bâtiments patrimoniaux ou la flotte régionale",
  "estate.initiativeForm.scopeHint":
    "\nNommez la tranche de domaine, la géographie, la zone contractuelle ou l’empreinte opérationnelle affectée.",
  "estate.initiativeForm.domainLabel": "\nDomaine",
  "estate.initiativeForm.domainHint":
    "\nChoisissez le domaine de travail successoral sur lequel l'initiative avance principalement.",
  "estate.initiativeForm.domain.STRATEGIC_ASSET": "\nGestion stratégique des actifs",
  "estate.initiativeForm.domain.HARD_FM": "\nDur FM",
  "estate.initiativeForm.domain.SOFT_FM": "\nFM doux",
  "estate.initiativeForm.domain.RANGE_OPERATIONS": "\nOpérations de portée",
  "estate.initiativeForm.domain.RANGE_SAFETY": "\nSécurité de la cuisinière",
  "estate.initiativeForm.domain.TARGETRY": "\nCiblage",
  "estate.initiativeForm.domain.GFE": "Équipement fourni par le gouvernement",
  "estate.initiativeForm.domain.FLEET": "\nFlotte et équipement",
  "estate.initiativeForm.domain.RURAL": "\nDomaine rural",
  "estate.initiativeForm.domain.FORESTRY": "\nForesterie",
  "estate.initiativeForm.domain.HERITAGE": "\nPatrimoine",
  "estate.initiativeForm.domain.ENVIRONMENT": "\nGérance environnementale",
  "estate.initiativeForm.domain.COMMERCIAL": "\nRevenus de tiers",
  "estate.initiativeForm.domain.CATERING": "\nIntégration restauration",
  "estate.initiativeForm.domain.P3M": "\nLivraison P3M",
  "estate.initiativeForm.priorityLabel": "\nPriorité",
  "estate.initiativeForm.priorityHint":
    "\nPlacez l'initiative dans l'horizon d'exploitation actuel du domaine.",
  "estate.initiativeForm.priority.NOW": "\nMaintenant",
  "estate.initiativeForm.priority.NEXT": "\nSuivant",
  "estate.initiativeForm.priority.LATER": "\nPlus tard",
  "estate.initiativeForm.priority.WATCH": "\nRegarder",
  "estate.initiativeForm.approvalLabel": "\nStatut d'approbation",
  "estate.initiativeForm.approvalHint":
    "\nSuivez où se situe actuellement l’initiative dans le processus d’approbation du programme.",
  "estate.initiativeForm.approval.DRAFT": "\nBrouillon",
  "estate.initiativeForm.approval.SUBMITTED": "\nSoumis",
  "estate.initiativeForm.approval.APPROVED": "Approuvé",
  "estate.initiativeForm.approval.REJECTED": "\nRejeté",
  "estate.initiativeForm.notesLabel": "\nNotes et hypothèses",
  "estate.initiativeForm.notesPlaceholder":
    "\nCapturez les risques, les liens de capacités, les implications contractuelles ou les hypothèses de cycle de vie.",
  "estate.initiativeForm.notesHint":
    "\nUtilisez-le pour préserver le contexte qui devrait survivre dans les approbations, la planification financière et les rapports.",
  "estate.initiativeForm.requiredHint":
    "\nLe titre, la portée de la succession, le domaine, la priorité et le statut d'approbation sont requis.",
  "estate.initiativeForm.submit": "\nInitiative de sauvegarde du patrimoine",
  "estate.initiativeForm.submitAria": "\nInitiative de sauvegarde du patrimoine",
  "estate.initiativeForm.recentTitle": "\nInitiatives successorales récentes",
  "estate.initiativeForm.recentDescription":
    "\nCes initiatives perdurent désormais sous forme de dossiers patrimoniaux durables sans quitter l'espace de travail SSR.",
  "estate.initiativeForm.empty": "\nAucune initiative successorale capturée pour l'instant.",
  "estate.initiativeForm.savedAt": "\nMise à jour {updatedAt}",
  "estate.initiativeForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "estate.initiativeForm.validation.titleRequired": "\nLe titre de l’initiative est requis.",
  "estate.initiativeForm.validation.scopeRequired": "\nLa portée de la succession est requise.",
  "estate.initiativeForm.validation.domainRequired": "\nLe domaine est requis.",
  "estate.initiativeForm.validation.priorityRequired": "\nLa priorité est requise.",
  "estate.initiativeForm.validation.approvalRequired": "\nLe statut d'approbation est requis.",
  "estate.initiativeForm.feedback.saved":
    "\nInitiative successorale enregistrée dans l'espace de travail du domaine.",
  "estate.initiativeForm.feedback.saveFailed":
    "\nImpossible de poursuivre l'initiative successorale pour le moment.",
  "estate.projectForm.title": "\nEnregistrez un projet immobilier",
  "estate.projectForm.description":
    "\nCapturez un enregistrement de projet immobilier durable avec l'approbation, les finances, les ressources et la position en matière de risque dans l'espace de travail du domaine SSR.",
  "estate.projectForm.badge": "\nRegistre P3M",
  "estate.projectForm.nameLabel": "\nTitre du projet",
  "estate.projectForm.namePlaceholder":
    "\nRécupération des infrastructures de l’aire de répartition régionale",
  "estate.projectForm.nameHint":
    "\nUtilisez un titre qui reste stable dans les registres, les approbations, les examens financiers et les rapports de livraison.",
  "estate.projectForm.programmeLabel": "\nNom du programme",
  "estate.projectForm.programmePlaceholder":
    "\nAmélioration du cycle de vie du domaine de formation",
  "estate.projectForm.programmeHint":
    "\nRegroupez le projet dans la ligne de programme ou de portefeuille utilisée pour le reporting successoral.",
  "estate.projectForm.scopeLabel": "\nPortée du patrimoine",
  "estate.projectForm.scopePlaceholder":
    "\nForfait Chaînes Sud, cluster du patrimoine ou arriéré régional de FM dur",
  "estate.projectForm.scopeHint":
    "\nNommez la géographie, la zone contractuelle, la tranche de propriété ou l’empreinte opérationnelle affectée.",
  "estate.projectForm.deliveryTypeLabel": "\nType de livraison",
  "estate.projectForm.deliveryTypeHint":
    "\nFaites la distinction entre un flux de projets à volume élevé et la livraison d'infrastructures complexes.",
  "estate.projectForm.deliveryType.HIGH_VOLUME_LOW_VALUE": "\nGros volume et faible valeur",
  "estate.projectForm.deliveryType.COMPLEX_INFRASTRUCTURE": "\nInfrastructure complexe",
  "estate.projectForm.approvalLabel": "\nStatut d'approbation",
  "estate.projectForm.approvalHint":
    "\nVérifiez si le projet est encore à l'état de brouillon, activement en cours d'approbation, approuvé ou rejeté.",
  "estate.projectForm.approvalStageLabel": "\nÉtape d'approbation",
  "estate.projectForm.approvalStageHint":
    "\nSuivez où se situe actuellement le projet dans le DIO et le flux de gouvernance interne.",
  "estate.projectForm.approvalStage.REGISTERED": "\nInscrit",
  "estate.projectForm.approvalStage.BUSINESS_CASE": "\nAnalyse de rentabilisation",
  "estate.projectForm.approvalStage.DIO_REVIEW": "\nRevue DIO",
  "estate.projectForm.approvalStage.COMMERCIAL_REVIEW": "\nRevue commerciale",
  "estate.projectForm.approvalStage.DELIVERY_AUTHORIZATION": "\nAutorisation de livraison",
  "estate.projectForm.approvalStage.IN_DELIVERY": "\nEn livraison",
  "estate.projectForm.approvalStage.CLOSED": "\nFermé",
  "estate.projectForm.approvalAuthorityLabel": "\nAutorité d'approbation",
  "estate.projectForm.approvalAuthorityPlaceholder":
    "Responsable régional DIO, conseil commercial ou panel de livraison successorale",
  "estate.projectForm.approvalAuthorityHint":
    "\nNommez l’autorité ou le conseil actuellement responsable de la prochaine décision d’approbation.",
  "estate.projectForm.budgetAmountLabel": "\nMontant budgétaire",
  "estate.projectForm.budgetAmountHint":
    "\nSaisissez la référence budgétaire actuelle approuvée ou proposée pour le projet.",
  "estate.projectForm.committedCostLabel": "\nCoût engagé",
  "estate.projectForm.committedCostHint":
    "\nEnregistrez le coût engagé actuel déjà attaché au projet.",
  "estate.projectForm.forecastFinalCostLabel": "\nCoût final prévu",
  "estate.projectForm.forecastFinalCostHint":
    "\nSuivez le dernier coût final prévu pour le suivi des livraisons.",
  "estate.projectForm.retentionAmountLabel": "\nMontant de rétention",
  "estate.projectForm.retentionAmountHint":
    "\nCapturez la valeur commerciale conservée encore détenue jusqu'à l'achèvement ou l'acceptation.",
  "estate.projectForm.riskProvisionAmountLabel": "\nProvision pour risques",
  "estate.projectForm.riskProvisionAmountHint":
    "\nSuivre la provision financière actuelle réservée à l'exposition aux risques du projet.",
  "estate.projectForm.plannedResourcesLabel": "\nRessources planifiées",
  "estate.projectForm.plannedResourcesHint":
    "\nCapturez la main-d'œuvre prévue ou l'allocation des ressources de livraison.",
  "estate.projectForm.actualResourcesLabel": "\nRessources réelles",
  "estate.projectForm.actualResourcesHint":
    "\nCapturez l'utilisation réelle de la main-d'œuvre ou des ressources de livraison actuellement affectée.",
  "estate.projectForm.riskLevelLabel": "\nNiveau de risque",
  "estate.projectForm.riskLevelHint":
    "\nMettez en évidence la situation actuelle en matière de risque de livraison qualitative pour le projet.",
  "estate.projectForm.riskLevel.LOW": "\nFaible",
  "estate.projectForm.riskLevel.MODERATE": "\nModéré",
  "estate.projectForm.riskLevel.HIGH": "\nÉlevé",
  "estate.projectForm.riskLevel.CRITICAL": "\nCritique",
  "estate.projectForm.notesLabel": "\nNotes et hypothèses",
  "estate.projectForm.notesPlaceholder":
    "\nCapturez les hypothèses de changement, de dépendance, de risque, commerciales ou d'approbation DIO qui devraient survivre dans les rapports.",
  "estate.projectForm.notesHint":
    "\nUtilisez-le pour préserver le contexte de gouvernance et de livraison parallèlement à l'entrée du registre du projet.",
  "estate.projectForm.requiredHint":
    "\nLe titre du projet, le programme, la portée, les champs d'approbation, les champs financiers, les champs de ressources et le niveau de risque sont obligatoires.",
  "estate.projectForm.submit": "\nSauvegarder le projet immobilier",
  "estate.projectForm.submitAria": "\nSauvegarder le projet immobilier",
  "estate.projectForm.recentTitle": "\nProjets immobiliers récents",
  "estate.projectForm.recentDescription":
    "\nLes entrées récentes du registre des projets montrent des pressions d'approbation, une situation financière et des conflits de ressources au sein de l'espace de travail du domaine.",
  "estate.projectForm.empty": "\nAucun projet immobilier capturé pour l'instant.",
  "estate.projectForm.summary.approvalQueue": "\n{count} en attente d'approbation",
  "estate.projectForm.summary.delayed": "\n{count} retardé",
  "estate.projectForm.summary.resourcePressure":
    "\nLes projets {count} présentent actuellement un conflit de ressources et {risk} sont marqués à haut risque.",
  "estate.projectForm.tableAria": "\nProjets immobiliers",
  "estate.projectForm.table.project": "\nProjet",
  "estate.projectForm.table.scope": "\nPortée",
  "estate.projectForm.table.approval": "\nApprobation",
  "estate.projectForm.table.authority": "\nAutorité",
  "estate.projectForm.table.budget": "\nBudget",
  "estate.projectForm.table.provisions": "\nDispositions",
  "estate.projectForm.table.resources": "\nRessources",
  "estate.projectForm.table.risk": "\nRisque",
  "estate.projectForm.table.daysInStage": "\n{days} jours dans l'étape",
  "estate.projectForm.table.forecastValue": "\nPrévisions {value}",
  "estate.projectForm.table.resourcesValue": "\nPrévu {planned} / Réel {actual}",
  "estate.projectForm.table.resourceConflict": "\nConflit de ressources",
  "estate.projectForm.table.delayFlag": "\nDélai d'approbation",
  "estate.projectForm.validation.titleRequired": "\nLe titre du projet est requis.",
  "estate.projectForm.validation.programmeRequired": "\nLe nom du programme est requis.",
  "estate.projectForm.validation.scopeRequired": "\nLa portée de la succession est requise.",
  "estate.projectForm.validation.deliveryTypeRequired": "\nLe type de livraison est requis.",
  "estate.projectForm.validation.approvalRequired": "\nLe statut d'approbation est requis.",
  "estate.projectForm.validation.approvalStageRequired": "\nL’étape d’approbation est requise.",
  "estate.projectForm.validation.approvalAuthorityRequired":
    "Une autorité d'approbation est requise.",
  "estate.projectForm.validation.budgetAmount":
    "\nLe montant du budget doit être nul ou supérieur.",
  "estate.projectForm.validation.committedCost": "\nLe coût engagé doit être nul ou supérieur.",
  "estate.projectForm.validation.forecastFinalCost":
    "\nLe coût final prévu doit être nul ou supérieur.",
  "estate.projectForm.validation.retentionAmount":
    "\nLe montant de la rétention doit être nul ou supérieur.",
  "estate.projectForm.validation.riskProvisionAmount":
    "\nLa provision pour risque doit être nulle ou supérieure.",
  "estate.projectForm.validation.plannedResources":
    "\nLes ressources planifiées doivent être un nombre entier égal ou supérieur à zéro.",
  "estate.projectForm.validation.actualResources":
    "\nLes ressources réelles doivent être un nombre entier égal ou supérieur à zéro.",
  "estate.projectForm.validation.riskLevelRequired": "\nLe niveau de risque est requis.",
  "estate.projectForm.feedback.saved":
    "\nProjet immobilier enregistré dans l'espace de travail du domaine.",
  "estate.projectForm.feedback.saveFailed":
    "\nImpossible de poursuivre le projet immobilier pour le moment.",
  "estate.projectControls.emptyTitle": "\nCréez un projet avant de capturer les contrôles",
  "estate.projectControls.emptyDescription":
    "\nLes registres des risques et les enregistrements de contrôle des modifications sont directement joints à une entrée du registre du projet immobilier.",
  "estate.projectControls.emptyProjects": "\nAucun projet immobilier disponible",
  "estate.projectRiskForm.title": "\nRegistre des risques du projet",
  "estate.projectRiskForm.description":
    "\nCapturez des enregistrements durables des risques P3M par rapport aux projets immobiliers afin que l'exposition et l'atténuation survivent aux approbations et aux rapports.",
  "estate.projectRiskForm.projectLabel": "\nProjet immobilier",
  "estate.projectRiskForm.projectHint":
    "\nSélectionnez l'entrée du registre de projet qui possède cet enregistrement de risque.",
  "estate.projectRiskForm.nameLabel": "\nTitre du risque",
  "estate.projectRiskForm.namePlaceholder": "\nExamen DIO retardé sur le package Civils Range",
  "estate.projectRiskForm.nameHint":
    "\nUtilisez un titre court qui peut rester stable dans tous les tableaux de projet et dans les rapports.",
  "estate.projectRiskForm.impactAreaLabel": "\nZone d'impact",
  "estate.projectRiskForm.impactAreaHint":
    "\nIdentifiez la principale zone de livraison affectée par l’exposition au risque.",
  "estate.projectRiskForm.impactArea.COST": "\nCoût",
  "estate.projectRiskForm.impactArea.SCHEDULE": "\nCalendrier",
  "estate.projectRiskForm.impactArea.CAPABILITY": "\nCapacité",
  "estate.projectRiskForm.impactArea.SAFETY": "\nSécurité",
  "estate.projectRiskForm.impactArea.COMPLIANCE": "\nConformité",
  "estate.projectRiskForm.severityLabel": "\nGravité",
  "estate.projectRiskForm.severityHint":
    "\nUtiliser la même échelle de gravité qualitative que le registre du projet.",
  "estate.projectRiskForm.statusLabel": "\nStatut de risque",
  "estate.projectRiskForm.statusHint":
    "\nVérifiez si le risque est ouvert, en cours d'atténuation, formellement accepté ou clôturé.",
  "estate.projectRiskForm.status.OPEN": "\nOuvert",
  "estate.projectRiskForm.status.MITIGATING": "\nAtténuation",
  "estate.projectRiskForm.status.ACCEPTED": "\nAccepté",
  "estate.projectRiskForm.status.CLOSED": "\nFermé",
  "estate.projectRiskForm.ownerLabel": "\nPropriétaire",
  "estate.projectRiskForm.ownerPlaceholder": "\nFil de contrôle du programme",
  "estate.projectRiskForm.ownerHint":
    "\nNommez le propriétaire responsable responsable de la conduite des mesures d’atténuation ou d’acceptation.",
  "estate.projectRiskForm.mitigationLabel": "\nPlan d'atténuation",
  "estate.projectRiskForm.mitigationPlaceholder":
    "\nCapturez le plan de réponse, le chemin de remontée ou la justification de l'acceptation.",
  "estate.projectRiskForm.mitigationHint":
    "\nPréserver la prochaine mesure d'atténuation afin qu'elle survive dans les packs de gouvernance.",
  "estate.projectRiskForm.targetDateLabel": "\nDate cible",
  "estate.projectRiskForm.targetDateHint":
    "\nDate cible facultative pour le prochain point de contrôle d’atténuation ou la prochaine décision de fermeture.",
  "estate.projectRiskForm.requiredHint":
    "Le projet, le titre du risque, la zone d'impact, la gravité, l'état, le plan d'atténuation et le propriétaire sont requis.",
  "estate.projectRiskForm.submit": "\nEnregistrer les risques du projet",
  "estate.projectRiskForm.submitAria": "\nEnregistrer les risques du projet",
  "estate.projectRiskForm.summary.critical": "\n{count} critique",
  "estate.projectRiskForm.tableAria": "\nRegistre des risques du projet",
  "estate.projectRiskForm.table.risk": "\nRisque",
  "estate.projectRiskForm.table.exposure": "\nExposition",
  "estate.projectRiskForm.table.status": "\nStatut",
  "estate.projectRiskForm.table.owner": "\nPropriétaire",
  "estate.projectRiskForm.table.mitigation": "\nAtténuation",
  "estate.projectRiskForm.table.targetDateValue": "\nCible {date}",
  "estate.projectRiskForm.table.targetDateEmpty": "\nAucune date cible définie",
  "estate.projectRiskForm.empty": "\nAucun risque de projet n'a encore été capturé.",
  "estate.projectRiskForm.validation.projectRequired":
    "\nSélectionnez un projet immobilier valide.",
  "estate.projectRiskForm.validation.titleRequired": "\nLe titre du risque est requis.",
  "estate.projectRiskForm.validation.impactAreaRequired": "\nLa zone d'impact est requise.",
  "estate.projectRiskForm.validation.severityRequired": "\nLa gravité est requise.",
  "estate.projectRiskForm.validation.statusRequired": "\nLe statut de risque est requis.",
  "estate.projectRiskForm.validation.mitigationRequired": "\nUn plan d’atténuation est requis.",
  "estate.projectRiskForm.validation.ownerRequired": "\nLe propriétaire du risque est requis.",
  "estate.projectRiskForm.validation.targetDate":
    "\nLa date cible doit être une date calendaire valide.",
  "estate.projectRiskForm.feedback.saved":
    "\nRisque du projet enregistré dans l'espace de travail du domaine.",
  "estate.projectRiskForm.feedback.saveFailed":
    "\nImpossible de persister le risque du projet pour le moment.",
  "estate.projectChangeForm.title": "\nContrôle des modifications du projet",
  "estate.projectChangeForm.description":
    "\nCapturez les demandes de modification, l'impact sur les coûts et les délais, ainsi que l'état d'approbation dans le flux du programme immobilier durable.",
  "estate.projectChangeForm.projectLabel": "\nProjet immobilier",
  "estate.projectChangeForm.projectHint":
    "\nSélectionnez l'entrée de registre de projet qui possède cet élément de modification.",
  "estate.projectChangeForm.nameLabel": "\nChanger le titre",
  "estate.projectChangeForm.namePlaceholder":
    "\nÉlargir la portée du package Civils pour inclure les voies cibles",
  "estate.projectChangeForm.nameHint":
    "\nUtilisez un titre court qui peut persister lors des mises à jour d'approbation et de livraison.",
  "estate.projectChangeForm.typeLabel": "\nChanger le type",
  "estate.projectChangeForm.typeHint":
    "\nIdentifiez la catégorie de contrôle principale affectée par cet élément de modification.",
  "estate.projectChangeForm.type.SCOPE": "\nPortée",
  "estate.projectChangeForm.type.SCHEDULE": "\nCalendrier",
  "estate.projectChangeForm.type.COST": "\nCoût",
  "estate.projectChangeForm.type.RESOURCE": "\nRessource",
  "estate.projectChangeForm.type.COMPLIANCE": "\nConformité",
  "estate.projectChangeForm.statusLabel": "\nChanger le statut",
  "estate.projectChangeForm.statusHint":
    "\nVérifiez si le changement est proposé, en cours d'examen, approuvé, rejeté ou mis en œuvre.",
  "estate.projectChangeForm.status.PROPOSED": "\nProposé",
  "estate.projectChangeForm.status.IN_REVIEW": "\nEn revue",
  "estate.projectChangeForm.status.APPROVED": "Approuvé",
  "estate.projectChangeForm.status.REJECTED": "\nRejeté",
  "estate.projectChangeForm.status.IMPLEMENTED": "\nImplémenté",
  "estate.projectChangeForm.scheduleImpactLabel": "\nImpact sur le planning (jours)",
  "estate.projectChangeForm.scheduleImpactHint":
    "\nEnregistrez l'effet de calendrier actuel attendu si le changement se poursuit.",
  "estate.projectChangeForm.costImpactLabel": "\nImpact sur les coûts",
  "estate.projectChangeForm.costImpactHint":
    "\nEnregistrez l'effet de coût estimé actuel de la demande de modification.",
  "estate.projectChangeForm.requestedByLabel": "\nDemandé par",
  "estate.projectChangeForm.requestedByPlaceholder": "\nResponsable de livraison régional",
  "estate.projectChangeForm.requestedByHint":
    "\nNommez le sponsor, le conseil d'administration ou le responsable opérationnel qui demande le changement.",
  "estate.projectChangeForm.notesLabel": "\nModifier les notes",
  "estate.projectChangeForm.notesPlaceholder":
    "\nCapturez la modification demandée, les dépendances et les approbations requises.",
  "estate.projectChangeForm.notesHint":
    "\nPréservez suffisamment de contexte pour les comités d'examen et les rapports de livraison.",
  "estate.projectChangeForm.requiredHint":
    "\nLe projet, le titre du changement, le type, le statut, l'impact sur le calendrier, l'impact sur les coûts, le demandeur et les notes sont requis.",
  "estate.projectChangeForm.submit": "\nEnregistrer la modification du projet",
  "estate.projectChangeForm.submitAria": "\nEnregistrer la modification du projet",
  "estate.projectChangeForm.summary.pending": "\n{count} en attente",
  "estate.projectChangeForm.summary.approved": "\n{count} approuvé ou mis en œuvre",
  "estate.projectChangeForm.tableAria": "\nContrôle des modifications du projet",
  "estate.projectChangeForm.table.change": "\nChanger",
  "estate.projectChangeForm.table.type": "\nTapez",
  "estate.projectChangeForm.table.status": "\nStatut",
  "estate.projectChangeForm.table.impact": "\nImpact",
  "estate.projectChangeForm.table.requestedBy": "\nDemandé par",
  "estate.projectChangeForm.table.scheduleValue": "\n{days} impact sur l'horaire du jour",
  "estate.projectChangeForm.empty": "\nAucune modification du projet n'a encore été capturée.",
  "estate.projectChangeForm.validation.projectRequired":
    "\nSélectionnez un projet immobilier valide.",
  "estate.projectChangeForm.validation.titleRequired": "Le changement de titre est requis.",
  "estate.projectChangeForm.validation.changeTypeRequired": "\nLe type de changement est requis.",
  "estate.projectChangeForm.validation.statusRequired": "\nLe changement de statut est requis.",
  "estate.projectChangeForm.validation.scheduleImpactDays":
    "\nL'impact sur le planning doit être un nombre entier égal ou supérieur à zéro.",
  "estate.projectChangeForm.validation.costImpactAmount":
    "\nL'impact sur les coûts doit être nul ou supérieur.",
  "estate.projectChangeForm.validation.requestedByRequired": "\nLe demandeur est requis.",
  "estate.projectChangeForm.validation.notesRequired": "\nDes notes de modification sont requises.",
  "estate.projectChangeForm.feedback.saved":
    "\nModification du projet enregistrée dans l'espace de travail du domaine.",
  "estate.projectChangeForm.feedback.saveFailed":
    "\nImpossible de conserver le changement de projet pour le moment.",
  "estate.agreementForm.title": "\nEnregistrer un contrat successoral",
  "estate.agreementForm.description":
    "\nCapturez l'utilisation des terres rurales, l'activité commerciale de tiers et la surveillance de la restauration ESS dans un seul registre foncier durable.",
  "estate.agreementForm.alertTitle":
    "\nUn seul registre couvre désormais la coordination rurale, commerciale et de restauration",
  "estate.agreementForm.alertDescription":
    "\nLes registres ruraux nécessitent un signal sur l'état du terrain, les registres commerciaux nécessitent des revenus et une utilisation, et les registres de restauration nécessitent un score de service.",
  "estate.agreementForm.domainLabel": "\nDomaine",
  "estate.agreementForm.domainHint":
    "\nChoisissez si cet enregistrement appartient à la gestion d'un domaine rural, à un usage commercial ou à la surveillance de la restauration.",
  "estate.agreementForm.domain.RURAL": "\nDomaine rural",
  "estate.agreementForm.domain.COMMERCIAL": "\nRevenus de tiers",
  "estate.agreementForm.domain.CATERING": "\nIntégration restauration",
  "estate.agreementForm.typeLabel": "\nType d'accord",
  "estate.agreementForm.typeHint":
    "\nSélectionnez la licence, la location, l'accès ou le type de service qui correspond le mieux au domaine sélectionné.",
  "estate.agreementForm.type.GRAZING_LICENSE": "\nPermis de pâturage",
  "estate.agreementForm.type.AGRICULTURAL_TENANCY": "\nLocation agricole",
  "estate.agreementForm.type.LAND_ACCESS": "\nAccord d'accès au terrain",
  "estate.agreementForm.type.COMMERCIAL_LICENSE": "\nLicence d'utilisation commerciale",
  "estate.agreementForm.type.EVENT_LICENSE": "\nLicence événementiel et visiteur",
  "estate.agreementForm.type.CATERING_SERVICE": "\nService traiteur",
  "estate.agreementForm.nameLabel": "\nTitre de l'accord",
  "estate.agreementForm.namePlaceholder": "\nPermis de pâturage des chaînes sud",
  "estate.agreementForm.nameHint":
    "\nUtilisez un titre qui peut survivre aux réunions de supervision, aux examens des partenaires et aux rapports.",
  "estate.agreementForm.siteLabel": "\nSite",
  "estate.agreementForm.siteHint":
    "\nJoindre le dossier au site immobilier propriétaire de la coordination opérationnelle.",
  "estate.agreementForm.assetLabel": "\nActif ou équipement lié",
  "estate.agreementForm.assetHint":
    "\nLiez éventuellement l'enregistrement à un actif spécifique ou à un élément d'équipement de restauration sur le même site.",
  "estate.agreementForm.assetOptional": "\nAucun élément lié",
  "estate.agreementForm.counterpartyLabel": "\nContrepartie",
  "estate.agreementForm.counterpartyPlaceholder":
    "\nESS, Hill Farm Partnership ou Regional Events Ltd",
  "estate.agreementForm.counterpartyHint":
    "\nNommez le locataire, le partenaire, le fournisseur ou la contrepartie commerciale propriétaire du contrat.",
  "estate.agreementForm.statusLabel": "\nStatut de l'accord",
  "estate.agreementForm.statusHint":
    "\nSuivez si l'enregistrement est en brouillon, actif, sous surveillance ou expiré.",
  "estate.agreementForm.status.DRAFT": "\nBrouillon",
  "estate.agreementForm.status.ACTIVE": "\nActif",
  "estate.agreementForm.status.WATCH": "\nRegarder",
  "estate.agreementForm.status.EXPIRED": "\nExpiré",
  "estate.agreementForm.coordinationLabel": "\nCoordination des formations",
  "estate.agreementForm.coordinationHint":
    "Indiquez si l'accord est actuellement conforme à l'activité de formation, doit être surveillé ou est en conflit.",
  "estate.agreementForm.coordination.ALIGNED": "\nAligné",
  "estate.agreementForm.coordination.WATCH": "\nRegarder",
  "estate.agreementForm.coordination.CONFLICT": "\nConflit",
  "estate.agreementForm.landConditionLabel": "\nÉtat du terrain",
  "estate.agreementForm.landConditionHint":
    "\nObligatoire pour les registres ruraux afin de surveiller la pression du pâturage, les conditions d'accès ou la situation de location.",
  "estate.agreementForm.landCondition.GOOD": "\nBien",
  "estate.agreementForm.landCondition.WATCH": "\nRegarder",
  "estate.agreementForm.landCondition.RECOVERY": "\nRécupération requise",
  "estate.agreementForm.revenueLabel": "\nValeur annuelle",
  "estate.agreementForm.revenueHint":
    "\nObligatoire pour les enregistrements commerciaux afin de suivre les revenus annuels ou la valeur sous licence.",
  "estate.agreementForm.utilisationLabel": "\nPourcentage d'utilisation",
  "estate.agreementForm.utilisationHint":
    "\nObligatoire pour les enregistrements commerciaux afin de suivre l'intensité d'utilisation du site ou de l'actif sous licence.",
  "estate.agreementForm.performanceLabel": "\nNote de service",
  "estate.agreementForm.performanceHint":
    "\nObligatoire pour les enregistrements de restauration afin de capturer les performances actuelles du service ESS.",
  "estate.agreementForm.startDateLabel": "\nDate de début",
  "estate.agreementForm.startDateHint":
    "\nDate de début facultative pour la durée actuelle de l’accord ou la période de surveillance.",
  "estate.agreementForm.endDateLabel": "\nDate de fin",
  "estate.agreementForm.endDateHint":
    "\nDate de fin facultative pour la durée actuelle du contrat ou la fenêtre de licence.",
  "estate.agreementForm.notesLabel": "\nNotes opérationnelles",
  "estate.agreementForm.notesPlaceholder":
    "\nCapturez les contraintes de formation, les fenêtres d’accès, les obligations des partenaires ou la couverture des équipements.",
  "estate.agreementForm.notesHint":
    "\nUtilisez-le pour préserver le contexte qui doit survivre dans les révisions successorales et la coordination des partenaires.",
  "estate.agreementForm.requiredHint":
    "\nLe titre, le domaine, le type, le site, la contrepartie, le statut de l'accord, le statut de coordination et les notes sont toujours requis. Les métriques spécifiques au domaine sont validées automatiquement.",
  "estate.agreementForm.submit": "\nEnregistrer le contrat successoral",
  "estate.agreementForm.submitAria": "\nEnregistrer le contrat successoral",
  "estate.agreementForm.summary.active": "\n{count} actif",
  "estate.agreementForm.summary.conflicts": "\n{count} conflits",
  "estate.agreementForm.empty": "\nAucun accord successoral n'a encore été capturé.",
  "estate.agreementForm.emptySites": "\nAucun site actif disponible",
  "estate.agreementForm.emptySitesTitle":
    "\nCréez un site avant de capturer les accords successoraux",
  "estate.agreementForm.emptySitesDescription":
    "\nLes enregistrements ruraux, commerciaux et de restauration sont directement associés à un site géré et à un actif facultatif du même site.",
  "estate.agreementForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "estate.agreementForm.tableAria": "\nAccords successoraux",
  "estate.agreementForm.table.agreement": "\nAccord",
  "estate.agreementForm.table.domain": "\nDomaine",
  "estate.agreementForm.table.site": "\nSite et actif",
  "estate.agreementForm.table.status": "\nStatut",
  "estate.agreementForm.table.signal": "\nSignal opérationnel",
  "estate.agreementForm.table.notes": "\nRemarques",
  "estate.agreementForm.table.signalRural": "\nÉtat du terrain : {condition}",
  "estate.agreementForm.table.signalCommercial": "\nRevenus {revenue} · {utilisation}",
  "estate.agreementForm.table.signalCatering": "\nService {score} · Actif {asset}",
  "estate.agreementForm.table.signalUtilisation": "\n{percent}% utilisé",
  "estate.agreementForm.table.signalScore": "\n{score}% score",
  "estate.agreementForm.table.signalNone": "\nAucun signal opérationnel enregistré pour l'instant.",
  "estate.agreementForm.table.metricEmpty": "\nnon enregistré",
  "estate.agreementForm.table.assetUnlinked": "\nAucun élément lié",
  "estate.agreementForm.table.startDateValue": "\nDémarré {date}",
  "estate.agreementForm.table.startDateEmpty": "\nAucune date de début enregistrée",
  "estate.agreementForm.validation.titleRequired": "\nLe titre de l’accord est requis.",
  "estate.agreementForm.validation.domainRequired": "\nChoisissez un domaine d'accord valide.",
  "estate.agreementForm.validation.typeRequired": "\nChoisissez un type d'accord valide.",
  "estate.agreementForm.validation.typeDomainMismatch":
    "Choisissez un type d'accord qui correspond au domaine sélectionné.",
  "estate.agreementForm.validation.siteRequired": "\nSélectionnez un site immobilier valide.",
  "estate.agreementForm.validation.assetMismatch":
    "\nLes actifs liés doivent appartenir au site immobilier sélectionné.",
  "estate.agreementForm.validation.counterpartyRequired": "\nUne contrepartie est requise.",
  "estate.agreementForm.validation.statusRequired": "\nLe statut de l'accord est requis.",
  "estate.agreementForm.validation.coordinationRequired":
    "\nLe statut de coordination de la formation est requis.",
  "estate.agreementForm.validation.landConditionRequired":
    "\nLes registres ruraux nécessitent un statut d'état des terres.",
  "estate.agreementForm.validation.revenueRequired":
    "\nLes registres commerciaux nécessitent une valeur annuelle.",
  "estate.agreementForm.validation.utilisationRequired":
    "\nLes enregistrements commerciaux nécessitent un pourcentage d'utilisation.",
  "estate.agreementForm.validation.performanceRequired":
    "\nLes dossiers de restauration nécessitent un score de service.",
  "estate.agreementForm.validation.revenueInvalid":
    "\nLa valeur annuelle doit être égale ou supérieure à zéro.",
  "estate.agreementForm.validation.utilisationInvalid":
    "\nLe pourcentage d'utilisation doit être un nombre entier compris entre 0 et 100.",
  "estate.agreementForm.validation.performanceInvalid":
    "\nLe score de service doit être un nombre entier compris entre 0 et 100.",
  "estate.agreementForm.validation.dateInvalid":
    "\nLes dates doivent être des valeurs de calendrier valides.",
  "estate.agreementForm.validation.dateOrderInvalid":
    "\nLa date de fin doit être identique ou postérieure à la date de début.",
  "estate.agreementForm.feedback.saved":
    "\nAccord successoral enregistré dans l'espace de travail de la succession.",
  "estate.agreementForm.feedback.saveFailed":
    "\nImpossible de conserver le contrat de succession pour le moment.",
  "estate.stewardshipForm.title": "\nEnregistrez un dossier d'intendance",
  "estate.stewardshipForm.description":
    "\nCapturez les opérations forestières, les contrôles du patrimoine et les obligations de gestion de l'environnement dans un seul registre foncier durable.",
  "estate.stewardshipForm.alertTitle":
    "\nUn registre d'intendance couvre désormais les contrôles forestiers, patrimoniaux et environnementaux",
  "estate.stewardshipForm.alertDescription":
    "\nLes enregistrements de production de bois nécessitent une valeur mesurée, les enregistrements de consentement aux travaux nécessitent une date cible et chaque enregistrement comporte une condition et une posture de conformité partagées.",
  "estate.stewardshipForm.domainLabel": "\nDomaine",
  "estate.stewardshipForm.domainHint":
    "\nChoisissez si le document appartient aux opérations forestières, à la gestion du patrimoine ou à la gestion de l'environnement.",
  "estate.stewardshipForm.domain.FORESTRY": "\nOpérations forestières",
  "estate.stewardshipForm.domain.HERITAGE": "\nGestion du patrimoine",
  "estate.stewardshipForm.domain.ENVIRONMENT": "\nGérance de l'environnement",
  "estate.stewardshipForm.recordTypeLabel": "\nType d'enregistrement",
  "estate.stewardshipForm.recordTypeHint":
    "\nSélectionnez l'enregistrement opérationnel, l'enquête, le calendrier ou l'élément de consentement qui correspond le mieux au domaine de gestion choisi.",
  "estate.stewardshipForm.recordType.WOODLAND_ASSET": "\nActif forestier",
  "estate.stewardshipForm.recordType.PLANTING_SCHEDULE": "\nCalendrier de plantation",
  "estate.stewardshipForm.recordType.HARVEST_SCHEDULE": "\nCalendrier de récolte",
  "estate.stewardshipForm.recordType.TIMBER_OUTPUT": "\nProduction de bois",
  "estate.stewardshipForm.recordType.HERITAGE_ASSET": "\nBien patrimonial",
  "estate.stewardshipForm.recordType.CONSERVATION_SURVEY": "\nEnquête de conservation",
  "estate.stewardshipForm.recordType.WORKS_CONSENT": "\nAutorisation de travaux",
  "estate.stewardshipForm.recordType.BIODIVERSITY_MONITORING": "\nSurveillance de la biodiversité",
  "estate.stewardshipForm.recordType.HABITAT_SURVEY": "\nEnquête sur l'habitat",
  "estate.stewardshipForm.recordType.ENVIRONMENTAL_INSPECTION": "\nInspection environnementale",
  "estate.stewardshipForm.recordType.PROTECTED_SPECIES": "\nRegistre des espèces protégées",
  "estate.stewardshipForm.nameLabel": "\nTitre du disque",
  "estate.stewardshipForm.namePlaceholder": "\nRendement de production des forêts du sud",
  "estate.stewardshipForm.nameHint":
    "Utilisez un titre qui peut survivre dans les examens de gestion, les discussions sur la conformité et les packs de rapports.",
  "estate.stewardshipForm.siteLabel": "\nSite",
  "estate.stewardshipForm.siteHint":
    "\nJoignez l'enregistrement au site qui possède l'obligation ou l'activité de gestion actuelle.",
  "estate.stewardshipForm.assetLabel": "\nActif lié",
  "estate.stewardshipForm.assetHint":
    "\nLiez éventuellement l'enregistrement à un actif du même site tel qu'une structure classée, un actif forestier ou un système surveillé.",
  "estate.stewardshipForm.assetOptional": "\nAucun élément lié",
  "estate.stewardshipForm.statusLabel": "\nStatut de l'enregistrement",
  "estate.stewardshipForm.statusHint":
    "\nSuivez si le dossier d'intendance est en ébauche, actif, sous surveillance ou fermé.",
  "estate.stewardshipForm.status.DRAFT": "\nBrouillon",
  "estate.stewardshipForm.status.ACTIVE": "\nActif",
  "estate.stewardshipForm.status.WATCH": "\nRegarder",
  "estate.stewardshipForm.status.CLOSED": "\nFermé",
  "estate.stewardshipForm.conditionStatusLabel": "\nCondition de posture",
  "estate.stewardshipForm.conditionStatusHint":
    "\nIndiquez si la forêt, l'élément patrimonial ou le signal environnemental est favorable, en voie de rétablissement ou en péril.",
  "estate.stewardshipForm.conditionStatus.FAVOURABLE": "\nFavorable",
  "estate.stewardshipForm.conditionStatus.RECOVERING": "\nRécupération de ",
  "estate.stewardshipForm.conditionStatus.AT_RISK": "\nÀ risque",
  "estate.stewardshipForm.complianceStatusLabel": "\nPosture de conformité",
  "estate.stewardshipForm.complianceStatusHint":
    "\nSuivez si le dossier actuel est conforme, sous surveillance, en attente de consentement ou non conforme.",
  "estate.stewardshipForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.stewardshipForm.complianceStatus.WATCH": "\nRegarder",
  "estate.stewardshipForm.complianceStatus.CONSENT_REQUIRED": "\nConsentement requis",
  "estate.stewardshipForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.stewardshipForm.metricValueLabel": "\nValeur mesurée",
  "estate.stewardshipForm.metricValueHint":
    "\nUtilisez-le pour la production de bois, les décomptes de biodiversité ou d'autres mesures d'intendance quantifiées.",
  "estate.stewardshipForm.metricUnitLabel": "\nUnité métrique",
  "estate.stewardshipForm.metricUnitPlaceholder": "\ntonnes, hectares ou observations",
  "estate.stewardshipForm.metricUnitHint":
    "\nNommez l’unité associée à la valeur mesurée lorsqu’elle est enregistrée.",
  "estate.stewardshipForm.targetDateLabel": "\nDate cible",
  "estate.stewardshipForm.targetDateHint":
    "\nUtilisez-le pour les fenêtres de récolte, les dates d'enquête, les délais d'inspection ou les étapes de consentement requises.",
  "estate.stewardshipForm.notesLabel": "\nNotes opérationnelles",
  "estate.stewardshipForm.notesPlaceholder":
    "\nCapturez les contraintes d'intendance, le contexte de conformité, les zones protégées ou les dépendances opérationnelles.",
  "estate.stewardshipForm.notesHint":
    "\nConservez suffisamment de détails pour les examens de conformité, la coordination de la livraison et les rapports sur la succession.",
  "estate.stewardshipForm.requiredHint":
    "\nLe titre, le domaine, le type d'enregistrement, le site, le statut, l'état de la condition, l'état de conformité et les notes sont toujours requis. Les métriques spécifiques au domaine sont validées automatiquement.",
  "estate.stewardshipForm.submit": "\nEnregistrer le dossier d'intendance",
  "estate.stewardshipForm.submitAria": "\nEnregistrer le dossier d'intendance",
  "estate.stewardshipForm.summary.atRisk": "\n{count} à risque",
  "estate.stewardshipForm.summary.consents": "\n{count} file d'attente de consentement",
  "estate.stewardshipForm.empty": "\nAucun enregistrement d'intendance n'a encore été capturé.",
  "estate.stewardshipForm.emptySites": "\nAucun site actif disponible",
  "estate.stewardshipForm.emptySitesTitle":
    "\nCréez un site avant de capturer les enregistrements d'intendance",
  "estate.stewardshipForm.emptySitesDescription":
    "\nLes dossiers forestiers, patrimoniaux et de gestion environnementale sont directement rattachés à un site géré et à un actif facultatif du même site.",
  "estate.stewardshipForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "estate.stewardshipForm.tableAria": "\nDossiers d'intendance",
  "estate.stewardshipForm.table.record": "\nEnregistrer",
  "estate.stewardshipForm.table.domain": "\nDomaine",
  "estate.stewardshipForm.table.site": "\nSite et actif",
  "estate.stewardshipForm.table.status": "\nStatut",
  "estate.stewardshipForm.table.signal": "\nSignal opérationnel",
  "estate.stewardshipForm.table.notes": "\nRemarques",
  "estate.stewardshipForm.table.assetUnlinked": "\nAucun élément lié",
  "estate.stewardshipForm.table.updatedAt": "\nMise à jour {date}",
  "estate.stewardshipForm.table.signalTimberOutput": "\n{value} {unit} enregistré",
  "estate.stewardshipForm.table.signalConsent": "Posture de consentement : {status}",
  "estate.stewardshipForm.table.signalProtectedSpecies":
    "\nPosture des espèces protégées : {condition}",
  "estate.stewardshipForm.table.signalTargetDate": "\nDate cible {date}",
  "estate.stewardshipForm.table.signalNone":
    "\nAucun signal opérationnel enregistré pour l'instant.",
  "estate.stewardshipForm.validation.titleRequired": "\nLe titre d’intendance est requis.",
  "estate.stewardshipForm.validation.domainRequired": "\nChoisissez un domaine de gestion valide.",
  "estate.stewardshipForm.validation.recordTypeRequired":
    "\nChoisissez un type d'enregistrement de gestion valide.",
  "estate.stewardshipForm.validation.recordTypeDomainMismatch":
    "\nChoisissez un type d'enregistrement qui correspond au domaine de gestion sélectionné.",
  "estate.stewardshipForm.validation.siteRequired": "\nSélectionnez un site immobilier valide.",
  "estate.stewardshipForm.validation.assetMismatch":
    "\nLes actifs liés doivent appartenir au site immobilier sélectionné.",
  "estate.stewardshipForm.validation.statusRequired": "\nLe statut d'intendance est requis.",
  "estate.stewardshipForm.validation.conditionStatusRequired":
    "\nUne posture de condition est requise.",
  "estate.stewardshipForm.validation.complianceStatusRequired":
    "\nUne posture de conformité est requise.",
  "estate.stewardshipForm.validation.metricValueRequired":
    "\nLes enregistrements de production de bois nécessitent une valeur mesurée.",
  "estate.stewardshipForm.validation.metricValueInvalid":
    "\nLa valeur mesurée doit être nulle ou supérieure.",
  "estate.stewardshipForm.validation.metricUnitRequired":
    "\nL'unité métrique est requise lorsqu'une valeur mesurée est enregistrée.",
  "estate.stewardshipForm.validation.targetDateRequired":
    "\nLes dossiers de consentement aux travaux nécessitent une date cible.",
  "estate.stewardshipForm.validation.targetDateInvalid":
    "\nLa date cible doit être une valeur de calendrier valide.",
  "estate.stewardshipForm.feedback.saved":
    "\nDossier d'intendance enregistré dans l'espace de travail du domaine.",
  "estate.stewardshipForm.feedback.saveFailed":
    "\nImpossible de conserver le dossier d'intendance pour le moment.",
  "estate.fmGovernanceForm.title": "\nEnregistrez un enregistrement de gouvernance FM",
  "estate.fmGovernanceForm.description":
    "\nCapturez la gouvernance FM dure, l'assurance statutaire, les calendriers de service et la position de référence FM douce dans un seul registre successoral.",
  "estate.fmGovernanceForm.alertTitle":
    "\nSFG20, SOP19 et la gouvernance soft FM se trouvent désormais au sein d'une seule surface de contrôle successoral",
  "estate.fmGovernanceForm.alertDescription":
    "\nLes enregistrements de calendrier, d'inspection, d'audit et de service utilisent des dates cibles, tandis que les enregistrements de maintenance réactive et de référence contiennent des valeurs de sortie mesurées.",
  "estate.fmGovernanceForm.domainLabel": "\nDomaine",
  "estate.fmGovernanceForm.domainHint":
    "\nSéparez la gouvernance de la maintenance FM matérielle du service FM logiciel et des contrôles de référence.",
  "estate.fmGovernanceForm.domain.HARD_FM": "\nGouvernance FM dure",
  "estate.fmGovernanceForm.domain.SOFT_FM": "\nGouvernance FM douce",
  "estate.fmGovernanceForm.recordTypeLabel": "\nType d'enregistrement",
  "estate.fmGovernanceForm.recordTypeHint":
    "\nChoisissez la maintenance planifiée, l'assurance, le service ou le contrôle de référence à enregistrer.",
  "estate.fmGovernanceForm.recordType.PPM_SCHEDULE":
    "\nCalendrier de maintenance préventive planifié",
  "estate.fmGovernanceForm.recordType.SFG20_SCHEDULE": "\nCalendrier de maintenance SFG20",
  "estate.fmGovernanceForm.recordType.STATUTORY_INSPECTION": "\nContrôle légal",
  "estate.fmGovernanceForm.recordType.REACTIVE_MAINTENANCE":
    "\nPerformances de maintenance réactive",
  "estate.fmGovernanceForm.recordType.COMPLIANCE_AUDIT": "\nAudit de conformité",
  "estate.fmGovernanceForm.recordType.ASSURANCE_REVIEW":
    "\nExamen de l'assurance de la maintenance",
  "estate.fmGovernanceForm.recordType.SERVICE_SCHEDULE": "\nHoraire du service Soft FM",
  "estate.fmGovernanceForm.recordType.GROUNDS_PROGRAMME": "\nProgramme d'entretien du terrain",
  "estate.fmGovernanceForm.recordType.WASTE_SERVICE": "\nProgramme de service des déchets",
  "estate.fmGovernanceForm.recordType.SERVICE_PERFORMANCE": "\nMesure des performances du service",
  "estate.fmGovernanceForm.recordType.PRODUCTIVITY_BENCHMARK": "\nRepère de productivité",
  "estate.fmGovernanceForm.recordType.INDUSTRY_BENCHMARK": "\nRéférence du secteur",
  "estate.fmGovernanceForm.nameLabel": "\nTitre du disque",
  "estate.fmGovernanceForm.namePlaceholder": "\nCycle de contrôle légal du domaine Nord",
  "estate.fmGovernanceForm.nameHint":
    "\nNommez l’élément de gouvernance FM afin qu’il survive dans les revues opérationnelles et les packs d’assurance successorale.",
  "estate.fmGovernanceForm.siteLabel": "\nSite",
  "estate.fmGovernanceForm.siteHint":
    "Sélectionnez l'emplacement du domaine qui possède l'élément de maintenance ou de gouvernance de service.",
  "estate.fmGovernanceForm.assetLabel": "\nActif lié",
  "estate.fmGovernanceForm.assetHint":
    "\nLiez le contrôle à un actif lorsque l'enregistrement s'applique à un élément d'installation ou un composant d'infrastructure spécifique.",
  "estate.fmGovernanceForm.assetOptional": "\nAucun élément lié",
  "estate.fmGovernanceForm.statusLabel": "\nStatut de l'enregistrement",
  "estate.fmGovernanceForm.statusHint":
    "\nDéfinissez si l'élément de gouvernance est actif, sous surveillance ou fermé.",
  "estate.fmGovernanceForm.status.DRAFT": "\nBrouillon",
  "estate.fmGovernanceForm.status.ACTIVE": "\nActif",
  "estate.fmGovernanceForm.status.WATCH": "\nRegarder",
  "estate.fmGovernanceForm.status.CLOSED": "\nFermé",
  "estate.fmGovernanceForm.deliveryStatusLabel": "\nPosture de livraison",
  "estate.fmGovernanceForm.deliveryStatusHint":
    "\nIndiquez si le calendrier ou le service est sur la bonne voie, sous pression ou hors piste.",
  "estate.fmGovernanceForm.deliveryStatus.ON_TRACK": "\nEn bonne voie",
  "estate.fmGovernanceForm.deliveryStatus.UNDER_PRESSURE": "\nSous pression",
  "estate.fmGovernanceForm.deliveryStatus.OFF_TRACK": "\nHors piste",
  "estate.fmGovernanceForm.complianceStatusLabel": "\nPosture de conformité",
  "estate.fmGovernanceForm.complianceStatusHint":
    "\nVérifiez si le contrôle est conforme, nécessite une action ou est devenu non-conforme.",
  "estate.fmGovernanceForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.fmGovernanceForm.complianceStatus.WATCH": "\nRegarder",
  "estate.fmGovernanceForm.complianceStatus.ACTION_REQUIRED": "\nAction requise",
  "estate.fmGovernanceForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.fmGovernanceForm.metricValueLabel": "\nValeur mesurée",
  "estate.fmGovernanceForm.metricValueHint":
    "\nUtilisez une valeur pour la maintenance réactive, les performances et l'évaluation des performances.",
  "estate.fmGovernanceForm.metricUnitLabel": "\nUnité métrique",
  "estate.fmGovernanceForm.metricUnitPlaceholder": "\nscore, emplois, hectares ou heures",
  "estate.fmGovernanceForm.metricUnitHint":
    "\nDécrire l'unité utilisée pour le service mesuré ou la valeur de référence.",
  "estate.fmGovernanceForm.targetDateLabel": "\nDate cible",
  "estate.fmGovernanceForm.targetDateHint":
    "\nUtilisez des dates cibles pour les calendriers, les inspections, les audits, les examens d'assurance et les programmes de service.",
  "estate.fmGovernanceForm.notesLabel": "\nNotes opérationnelles",
  "estate.fmGovernanceForm.notesPlaceholder":
    "\nCapturez les détails SFG20, SOP19, performances de service, référence ou atténuation qui doivent persister dans l'enregistrement du domaine.",
  "estate.fmGovernanceForm.notesHint":
    "\nGardez des notes courtes, opérationnelles et spécifiques à l'élément de gouvernance FM.",
  "estate.fmGovernanceForm.requiredHint":
    "\nLe titre, le domaine, le type, le site, les statuts et les notes sont requis. Certains types d'enregistrement nécessitent également une mesure ou une date cible.",
  "estate.fmGovernanceForm.submit": "\nEnregistrer le dossier de gouvernance FM",
  "estate.fmGovernanceForm.submitAria": "\nEnregistrer le dossier de gouvernance FM",
  "estate.fmGovernanceForm.summary.complianceAttention": "\n{count} a besoin d'attention",
  "estate.fmGovernanceForm.summary.benchmarks": "\n{count} benchmarks suivis",
  "estate.fmGovernanceForm.empty":
    "\nAucun enregistrement de gouvernance FM capturé pour l'instant.",
  "estate.fmGovernanceForm.emptySites": "\nAucun site actif disponible",
  "estate.fmGovernanceForm.emptySitesTitle":
    "\nCréez un site avant de capturer les enregistrements de gouvernance FM",
  "estate.fmGovernanceForm.emptySitesDescription":
    "\nLe registre de gouvernance FM dépend de la liste des sites du domaine afin que les horaires et les services puissent être liés au bon emplacement.",
  "estate.fmGovernanceForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "estate.fmGovernanceForm.tableAria": "\nDossiers de gouvernance FM",
  "estate.fmGovernanceForm.table.record": "\nEnregistrer",
  "estate.fmGovernanceForm.table.domain": "\nDomaine",
  "estate.fmGovernanceForm.table.site": "\nSite et actif",
  "estate.fmGovernanceForm.table.status": "\nStatut",
  "estate.fmGovernanceForm.table.signal": "\nSignal opérationnel",
  "estate.fmGovernanceForm.table.notes": "\nRemarques",
  "estate.fmGovernanceForm.table.assetUnlinked": "\nAucun élément lié",
  "estate.fmGovernanceForm.table.updatedAt": "\nMise à jour {date}",
  "estate.fmGovernanceForm.table.signalMetric": "\n{value} {unit} enregistré",
  "estate.fmGovernanceForm.table.signalTargetDate": "\nDate cible {date}",
  "estate.fmGovernanceForm.table.signalCompliance": "\nPosture de conformité : {status}",
  "estate.fmGovernanceForm.validation.titleRequired": "\nLe titre de gouvernance FM est requis.",
  "estate.fmGovernanceForm.validation.domainRequired":
    "\nChoisissez un domaine de gouvernance FM valide.",
  "estate.fmGovernanceForm.validation.recordTypeRequired":
    "\nChoisissez un type d'enregistrement de gouvernance FM valide.",
  "estate.fmGovernanceForm.validation.recordTypeDomainMismatch":
    "\nChoisissez un type d'enregistrement qui correspond au domaine de gouvernance FM sélectionné.",
  "estate.fmGovernanceForm.validation.siteRequired": "\nSélectionnez un site immobilier valide.",
  "estate.fmGovernanceForm.validation.assetMismatch":
    "\nL'actif lié doit appartenir au site immobilier sélectionné.",
  "estate.fmGovernanceForm.validation.statusRequired": "\nLe statut de gouvernance FM est requis.",
  "estate.fmGovernanceForm.validation.deliveryStatusRequired":
    "Une posture de mise en œuvre de la gouvernance FM est requise.",
  "estate.fmGovernanceForm.validation.complianceStatusRequired":
    "\nUne posture de conformité en matière de gouvernance FM est requise.",
  "estate.fmGovernanceForm.validation.metricValueRequired":
    "\nLes enregistrements de maintenance réactive, de performances et de référence nécessitent une valeur mesurée.",
  "estate.fmGovernanceForm.validation.metricValueInvalid":
    "\nLa valeur mesurée doit être nulle ou supérieure.",
  "estate.fmGovernanceForm.validation.metricUnitRequired":
    "\nL'unité métrique est requise lorsqu'une valeur mesurée est enregistrée.",
  "estate.fmGovernanceForm.validation.targetDateRequired":
    "\nLes dossiers de calendrier, d’inspection, d’audit, d’assurance et de service nécessitent une date cible.",
  "estate.fmGovernanceForm.validation.targetDateInvalid":
    "\nLa date cible doit être une valeur de calendrier valide.",
  "estate.fmGovernanceForm.feedback.saved":
    "\nEnregistrement de gouvernance FM enregistré dans l'espace de travail du domaine.",
  "estate.fmGovernanceForm.feedback.saveFailed":
    "\nImpossible de conserver le record de gouvernance FM pour le moment.",
  "estate.rangeControlForm.title": "\nEnregistrez une plage et un enregistrement de contrôle GFE",
  "estate.rangeControlForm.description":
    "\nCapturez l'activité TAROM, les contrôles de sécurité du champ de tir, la posture du cycle de vie des cibles et les signaux des équipements fournis par le gouvernement dans un seul registre immobilier durable.",
  "estate.rangeControlForm.alertTitle":
    "\nUn registre de contrôle opérationnel couvre désormais les portées, la sécurité, le ciblage et GFE",
  "estate.rangeControlForm.alertDescription":
    "\nLes enregistrements de disponibilité et d'utilisation nécessitent une valeur mesurée, les actions d'inspection et de récupération nécessitent une date cible et les enregistrements de ciblage ou GFE nécessitent un actif lié sur le même site.",
  "estate.rangeControlForm.domainLabel": "\nDomaine",
  "estate.rangeControlForm.domainHint":
    "\nChoisissez si l'enregistrement appartient à la livraison TAROM, à la conformité en matière de sécurité du champ de tir, à la gestion des cibles ou à la surveillance du cycle de vie GFE.",
  "estate.rangeControlForm.domain.RANGE_OPERATIONS":
    "\nZones d'entraînement et opérations sur le stand",
  "estate.rangeControlForm.domain.RANGE_SAFETY": "\nConformité à la sécurité de la cuisinière",
  "estate.rangeControlForm.domain.TARGETRY": "\nGestion du cycle de vie des cibles",
  "estate.rangeControlForm.domain.GFE": "\nÉquipement fourni par le gouvernement",
  "estate.rangeControlForm.recordTypeLabel": "\nType d'enregistrement",
  "estate.rangeControlForm.recordTypeHint":
    "\nSélectionnez l'enregistrement de contrôle opérationnel, d'inspection, de disponibilité, de stockage ou de remplacement qui correspond le mieux au domaine sélectionné.",
  "estate.rangeControlForm.recordType.RANGE_REGISTRY": "\nEnregistrement de registre de plage",
  "estate.rangeControlForm.recordType.RANGE_AVAILABILITY": "\nDisponibilité de la gamme",
  "estate.rangeControlForm.recordType.RANGE_PREPARATION":
    "\nFenêtre de préparation de la cuisinière",
  "estate.rangeControlForm.recordType.RANGE_RECOVERY": "\nFenêtre de récupération de portée",
  "estate.rangeControlForm.recordType.SAFETY_INSPECTION": "\nInspection de sécurité",
  "estate.rangeControlForm.recordType.SAFETY_DEFECT": "\nDéfaut de sécurité",
  "estate.rangeControlForm.recordType.CORRECTIVE_ACTION": "\nAction corrective",
  "estate.rangeControlForm.recordType.TARGET_ASSET": "\nActif cible",
  "estate.rangeControlForm.recordType.TARGET_DEPLOYMENT": "\nFenêtre de déploiement cible",
  "estate.rangeControlForm.recordType.TARGET_STORAGE": "\nEmplacement de stockage cible",
  "estate.rangeControlForm.recordType.TARGET_AVAILABILITY": "\nDisponibilité cible",
  "estate.rangeControlForm.recordType.GFE_CONDITION": "\nÉtat GFE",
  "estate.rangeControlForm.recordType.GFE_UTILISATION": "\nUtilisation du GFE",
  "estate.rangeControlForm.recordType.GFE_REPLACEMENT": "\nPlan de remplacement du GFE",
  "estate.rangeControlForm.nameLabel": "\nTitre du disque",
  "estate.rangeControlForm.namePlaceholder": "\nRetour de disponibilité cible secteur Nord",
  "estate.rangeControlForm.nameHint":
    "\nUtilisez un titre qui peut survivre aux tableaux de répartition, aux examens de conformité et aux rapports opérationnels.",
  "estate.rangeControlForm.siteLabel": "\nSite",
  "estate.rangeControlForm.siteHint":
    "\nJoignez l'enregistrement au site du domaine de formation qui possède actuellement l'activité ou le contrôle.",
  "estate.rangeControlForm.assetLabel": "\nActif ou équipement lié",
  "estate.rangeControlForm.assetHint":
    "\nLiez les enregistrements de ciblage et de GFE à l'actif ou à l'équipement du même site qu'ils décrivent directement.",
  "estate.rangeControlForm.assetOptional": "\nAucun élément lié",
  "estate.rangeControlForm.statusLabel": "\nStatut de l'enregistrement",
  "estate.rangeControlForm.statusHint":
    "Suivez si l'enregistrement est en brouillon, actif, sous surveillance ou fermé.",
  "estate.rangeControlForm.status.DRAFT": "\nBrouillon",
  "estate.rangeControlForm.status.ACTIVE": "\nActif",
  "estate.rangeControlForm.status.WATCH": "\nRegarder",
  "estate.rangeControlForm.status.CLOSED": "\nFermé",
  "estate.rangeControlForm.operationalStatusLabel": "\nPosture opérationnelle",
  "estate.rangeControlForm.operationalStatusHint":
    "\nCapturez si la portée, le système de sécurité, l'actif de cible ou l'élément GFE est disponible, contraint ou indisponible.",
  "estate.rangeControlForm.operationalStatus.AVAILABLE": "\nDisponible",
  "estate.rangeControlForm.operationalStatus.CONSTRAINED": "\nContraint",
  "estate.rangeControlForm.operationalStatus.UNAVAILABLE": "\nIndisponible",
  "estate.rangeControlForm.complianceStatusLabel": "\nPosture de conformité",
  "estate.rangeControlForm.complianceStatusHint":
    "\nSuivez si le contrôle actuel est conforme, sous surveillance, nécessite une action ou n'est pas conforme.",
  "estate.rangeControlForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.rangeControlForm.complianceStatus.WATCH": "\nRegarder",
  "estate.rangeControlForm.complianceStatus.ACTION_REQUIRED": "\nAction requise",
  "estate.rangeControlForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.rangeControlForm.metricValueLabel": "\nValeur mesurée",
  "estate.rangeControlForm.metricValueHint":
    "\nUtilisez-le pour les décomptes de disponibilité, les totaux d'utilisation ou d'autres signaux opérationnels quantifiés.",
  "estate.rangeControlForm.metricUnitLabel": "\nUnité métrique",
  "estate.rangeControlForm.metricUnitPlaceholder": "\nplages, voies, véhicules ou heures",
  "estate.rangeControlForm.metricUnitHint":
    "\nNommez l’unité associée à la valeur mesurée lorsqu’elle est enregistrée.",
  "estate.rangeControlForm.targetDateLabel": "\nDate cible",
  "estate.rangeControlForm.targetDateHint":
    "\nUtilisez-le pour les dates d'inspection, les fenêtres de préparation et de récupération, les déploiements ou les jalons de remplacement.",
  "estate.rangeControlForm.notesLabel": "\nNotes opérationnelles",
  "estate.rangeControlForm.notesPlaceholder":
    "\nCapturez la coordination des tirs réels, le contexte de sécurité, les contraintes de maintenance, les détails de déploiement ou les hypothèses de remplacement.",
  "estate.rangeControlForm.notesHint":
    "\nPréservez suffisamment de contexte pour la planification TAROM, l'assurance de la sécurité et les rapports opérationnels orientés DIO.",
  "estate.rangeControlForm.requiredHint":
    "\nLe titre, le domaine, le type d'enregistrement, le site, l'état du flux de travail, la posture opérationnelle, la posture de conformité et les notes sont toujours requis. Les règles relatives aux actifs, aux mesures et aux dates cibles sont validées automatiquement.",
  "estate.rangeControlForm.submit": "\nEnregistrer l'enregistrement de contrôle opérationnel",
  "estate.rangeControlForm.submitAria": "\nEnregistrer l'enregistrement de contrôle opérationnel",
  "estate.rangeControlForm.summary.constraints": "\n{count} contraint",
  "estate.rangeControlForm.summary.actions": "\n{count} action requise",
  "estate.rangeControlForm.empty":
    "\nAucun enregistrement de contrôle opérationnel capturé pour l'instant.",
  "estate.rangeControlForm.emptySites": "\nAucun site actif disponible",
  "estate.rangeControlForm.emptySitesTitle":
    "\nCréez un site avant de capturer les enregistrements de plage et de contrôle GFE",
  "estate.rangeControlForm.emptySitesDescription":
    "\nLes enregistrements de portée opérationnelle, de sécurité, de ciblage et GFE sont directement associés à un site géré et à un actif facultatif du même site.",
  "estate.rangeControlForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "estate.rangeControlForm.tableAria": "\nEnregistrements de portée et de contrôle GFE",
  "estate.rangeControlForm.table.record": "\nEnregistrer",
  "estate.rangeControlForm.table.domain": "\nDomaine",
  "estate.rangeControlForm.table.site": "\nSite et actif",
  "estate.rangeControlForm.table.status": "\nStatut",
  "estate.rangeControlForm.table.signal": "\nSignal opérationnel",
  "estate.rangeControlForm.table.notes": "\nRemarques",
  "estate.rangeControlForm.table.assetUnlinked": "\nAucun élément lié",
  "estate.rangeControlForm.table.updatedAt": "\nMise à jour {date}",
  "estate.rangeControlForm.table.signalRangeAvailability": "\n{value} {unit} disponible",
  "estate.rangeControlForm.table.signalTargetAvailability": "\n{value} {unit} disponible",
  "estate.rangeControlForm.table.signalGfeUtilisation": "\n{value} {unit} utilisé",
  "estate.rangeControlForm.table.signalSafetyDefect": "\nPosture défectueuse : {status}",
  "estate.rangeControlForm.table.signalTargetDate": "\nDate cible {date}",
  "estate.rangeControlForm.table.signalNone":
    "\nAucun signal opérationnel enregistré pour l'instant.",
  "estate.rangeControlForm.validation.titleRequired":
    "\nLe titre de contrôle opérationnel est requis.",
  "estate.rangeControlForm.validation.domainRequired":
    "\nChoisissez un domaine de contrôle de plage valide.",
  "estate.rangeControlForm.validation.recordTypeRequired":
    "\nChoisissez un type d'enregistrement de contrôle de plage valide.",
  "estate.rangeControlForm.validation.recordTypeDomainMismatch":
    "\nChoisissez un type d'enregistrement qui correspond au domaine de contrôle de plage sélectionné.",
  "estate.rangeControlForm.validation.siteRequired": "\nSélectionnez un site immobilier valide.",
  "estate.rangeControlForm.validation.assetRequired":
    "\nLes enregistrements Targetry et GFE nécessitent un actif lié sur le même site.",
  "estate.rangeControlForm.validation.assetMismatch":
    "\nLes actifs liés doivent appartenir au site immobilier sélectionné.",
  "estate.rangeControlForm.validation.statusRequired":
    "\nL'état de contrôle opérationnel est requis.",
  "estate.rangeControlForm.validation.operationalStatusRequired":
    "\nUne posture opérationnelle est requise.",
  "estate.rangeControlForm.validation.complianceStatusRequired":
    "\nUne posture de conformité est requise.",
  "estate.rangeControlForm.validation.metricValueRequired":
    "Les enregistrements de disponibilité et d'utilisation nécessitent une valeur mesurée.",
  "estate.rangeControlForm.validation.metricValueInvalid":
    "\nLa valeur mesurée doit être nulle ou supérieure.",
  "estate.rangeControlForm.validation.metricUnitRequired":
    "\nL'unité métrique est requise lorsqu'une valeur mesurée est enregistrée.",
  "estate.rangeControlForm.validation.targetDateRequired":
    "\nCe type d'enregistrement nécessite une date cible.",
  "estate.rangeControlForm.validation.targetDateInvalid":
    "\nLa date cible doit être une valeur de calendrier valide.",
  "estate.rangeControlForm.validation.safetyDefectComplianceMismatch":
    "\nLes défauts de sécurité ne peuvent être constatés comme conformes.",
  "estate.rangeControlForm.feedback.saved":
    "\nEnregistrement de contrôle opérationnel enregistré dans l'espace de travail du domaine.",
  "estate.rangeControlForm.feedback.saveFailed":
    "\nImpossible de conserver l'enregistrement de contrôle opérationnel pour le moment.",
  "estate.rangeControlForm.feedback.updated": "\nDossier de contrôle opérationnel mis à jour.",
  "estate.rangeControlForm.feedback.deleted":
    "\nEnregistrement de contrôle opérationnel supprimé de l'espace de travail.",
  "estate.rangeControlForm.feedback.deleteFailed":
    "\nImpossible de supprimer l'enregistrement de contrôle opérationnel pour le moment.",
  "estate.rangeControlForm.validation.recordNotFound":
    "\nL'enregistrement de contrôle de portée demandé n'a pas été trouvé.",
  "estate.readiness.assets":
    "\nLa situation des actifs et des installations fournit déjà la référence actuelle du patrimoine.",
  "estate.readiness.delivery":
    "\nLes bons de travail et les documents opérationnels ancrent déjà la livraison FM et le suivi des contrats.",
  "estate.readiness.programme":
    "\nLes registres de projets, la planification financière et les initiatives durables peuvent déjà intégrer les approbations dans le déroulement du programme.",
  "estate.action.assets":
    "\nInspectez le registre des actifs faisant autorité, la hiérarchie, l’état et la position du cycle de vie.",
  "estate.action.workOrders":
    "\nPassez directement au Hard FM actif, au recouvrement et au travail statutaire façonnant l'assurance successorale.",
  "estate.action.finance":
    "\nPortez la pression successorale dans l'élaboration du budget, les scénarios de planification et les discussions d'approbation.",
  "estate.action.reports":
    "\nRegroupez la situation du patrimoine, l'état de préparation, les performances et les activités d'atténuation dans des packs de rapports exécutifs.",
  "estate.action.buildings":
    "\nInspectez les installations, l'état des actifs bâtis et l'état de préparation des jumeaux dans toute la hiérarchie du domaine.",
  "estate.page.eyebrow": "\nPlan de contrôle du domaine",
  "estate.page.readinessRailDescription":
    "\nSuivez le signal actuel du portefeuille en fonction de la disponibilité des actifs, de la pression de livraison en direct et des bloqueurs de programmes avant d'acheminer le travail vers les domaines en aval.",
  "estate.page.readinessRail.assetSignal":
    "\nLa disponibilité liée aux actifs et à la gamme reste le principal signal de préparation du domaine et de soutien à la formation.",
  "estate.page.readinessRail.deliverySignal":
    "\nLa pression de livraison capture les travaux en cours, les inspections en retard et les activités d'atténuation affectant la posture d'assurance.",
  "estate.page.readinessRail.programmeSignal":
    "\nLes contrôles du programme montrent où les approbations, les projets à haut risque et les dépendances financières entravent la reprise opérationnelle.",
  "estate.page.readinessRail.sites":
    "{count} les signaux de site contraints nécessitent une atténuation de préparation et un suivi opérationnel.",
  "estate.page.readinessRail.inspections":
    "\n{count} les signaux d'inspection en retard restent actifs dans l'ensemble du domaine.",
  "estate.page.readinessRail.delivery":
    "\n{count} les signaux d'ordre de travail non respectés façonnent le tableau actuel de la livraison.",
  "estate.page.performanceTitle": "\nExécution des livraisons et contrôle des contrats",
  "estate.page.performanceDescription":
    "\nSurveillez le débit d'exécution, la capacité de la main-d'œuvre, la productivité et la demande d'amélioration au sein du même plan de contrôle du domaine.",
  "estate.page.performanceControlsTitle": "\nActions d'amélioration",
  "estate.page.performanceControlsDescription":
    "\nLe(s) résultat(s) du contrat {changes} restent en retard et continuent de façonner la file d'attente d'amélioration active.",
  "estate.page.decisionBoardTitle": "\nCarte de commande d'exception",
  "estate.page.decisionBoardDescription":
    "\nRésolvez les obstacles à la préparation, les violations de livraison, les approbations et les problèmes de dépendance qui nécessitent une action avant le prochain cycle d'exploitation.",
  "estate.page.decisionBoardBriefTitle": "\nAttention immédiate",
  "estate.page.decisionBoardBriefDescription":
    "\nCommencez par des sites contraints, des problèmes de travail, des dépendances instables ou des approbations retardées avant de transférer les efforts vers des rapports et des packs.",
  "estate.page.overviewActionsDescription":
    "\nPassez directement du tri des exceptions aux packs de rapports, aux surfaces d'administration et aux workflows de planification responsables de la récupération du patrimoine.",
  "estate.page.approvalsFocusDescription":
    "\nDiriger les approbations retardées, les initiatives à haut risque et la pression sur les ressources avant de passer à la stratégie, aux initiatives et aux contrôles du projet.",
  "estate.page.assuranceFocusDescription":
    "\nDirigez la gestion des risques liés aux actifs, des violations de livraison et des actions d'amélioration ouvertes avant d'explorer les preuves de registre, de gouvernance FM et de gestion.",
  "estate.page.partnershipsFocusDescription":
    "\nDirigez-vous avec les conflits d'accords, la qualité du service et l'attention à l'intégration avant de passer aux surfaces détaillées du contrat et des dépendances.",
  "estate.page.commandCard.watchTitle": "\nCapacités de la liste de surveillance",
  "estate.page.commandCard.watchDescription":
    "\n{total} des signaux de capacité suivis sont en jeu dans toute la posture du domaine.",
  "estate.page.commandCard.constrainedSitesTitle": "\nSites contraints",
  "estate.page.commandCard.constrainedSitesDescription":
    "\n{inspections} les signaux d’inspection en retard façonnent le tableau du patrimoine contraint.",
  "estate.page.commandCard.inspectionsTitle": "\nInspections en retard",
  "estate.page.commandCard.inspectionsDescription":
    "\nDes inspections statutaires et de préparation claires avant que la dette d'assurance ne s'élargisse à l'ensemble du domaine.",
  "estate.page.commandCard.highRiskTitle": "\nProjets à haut risque",
  "estate.page.commandCard.highRiskDescription":
    "Les signaux de conflit de ressources {conflicts} affectent déjà la ligne d'approbation et de livraison.",
  "estate.page.commandCard.resourceConflictsTitle": "\nConflits de ressources",
  "estate.page.commandCard.resourceConflictsDescription":
    "\nAppliquez la pression en matière de personnel, de financement et de livraison dans les surfaces de planification avant que les contrôles ne glissent.",
  "estate.page.commandCard.deliveryBreachesTitle": "\nOrdres de travail non respectés",
  "estate.page.commandCard.deliveryBreachesDescription":
    "\n{actions} les actions d'amélioration en cours se situent toujours derrière le tableau actuel des violations de livraison.",
  "estate.page.commandCard.partnershipConflictsTitle": "\nConflits de coordination",
  "estate.page.commandCard.partnershipConflictsDescription":
    "\n{agreements} les signaux d’accord actifs nécessitent encore un suivi commercial et opérationnel aligné.",
  "estate.page.commandCard.cateringTitle": "\nNote du service traiteur",
  "estate.page.commandCard.cateringDescription":
    "\nTraitez la qualité ESS comme une mesure opérationnelle en direct aux côtés des accords, des dépendances et du support de construction.",
  "estate.page.commandCard.integrationsDescription":
    "\n{configured} des {total} intégrations liées au domaine sont actuellement configurées dans le plan de contrôle.",
  "estate.page.decisionCard.readinessTitle": "\nSupprimer les bloqueurs de préparation",
  "estate.page.decisionCard.readinessDescription":
    "\nTransférez les sites soumis à contraintes, les inspections en retard et les fonctionnalités de liste de surveillance dans les flux de travail responsables de l'atténuation.",
  "estate.page.decisionCard.performanceTitle": "\nStabiliser les performances de livraison",
  "estate.page.decisionCard.performanceDescription":
    "\nAgissez sur les ordres de travail violés, la pression du travail et les actions d'amélioration des contrats avant que les bons de service ne s'élargissent.",
  "estate.page.decisionCard.dependenciesTitle": "\nRestaurer les dépendances critiques",
  "estate.page.decisionCard.dependenciesDescription":
    "\nTraitez les intégrations financières, documentaires, d'approvisionnement et ESS comme des contrôles opérationnels en direct plutôt que comme des métadonnées d'administration.",
  "estate.page.decisionCard.approvalsTitle": "\nDébloquer les décisions du programme",
  "estate.page.decisionCard.approvalsDescription":
    "\nDéplacez les approbations retardées, les pressions financières et les changements de contrôle avant qu'ils ne bloquent les travaux de recouvrement et d'assurance de la succession.",
  "estate.page.launchpadsTitle": "\nBarres de lancement exécutives",
  "estate.page.launchpadsDescription":
    "\nPassez de la position successorale aux rapports DIO, à l'assurance FM, à la surveillance de la gestion et à l'examen des dépendances d'intégration sans quitter le shell.",
  "estate.page.launchpadsBadge": "\nContrôles de portefeuille",
  "estate.page.launchpadsBriefTitle": "\nBrief opérateur",
  "estate.page.launchpadsBriefDescription":
    "\nUtilisez ces rampes de lancement lorsque la conversation de contrôle doit passer d'une position en direct à des packs de rapports, des preuves d'assurance ou des dépendances système de prise en charge.",
  "estate.page.launchpadsLane.governanceTitle": "\nGouvernance",
  "estate.page.launchpadsLane.governanceHeadline":
    "\nGardez la stratégie, les approbations et les décisions d'investissement dans un seul champ de vision.",
  "estate.page.launchpadsLane.governanceDescription":
    "Gardez la stratégie successorale, les contrôles du programme et la planification financière alignés avant que les décisions ne quittent le plan de contrôle.",
  "estate.page.launchpadsLane.assuranceTitle": "\nAssurance",
  "estate.page.launchpadsLane.assuranceHeadline":
    "\nReliez la livraison FM, la gestion et les signaux contractuels aux preuves prêtes à être auditées.",
  "estate.page.launchpadsLane.assuranceDescription":
    "\nUtilisez les packs de gouvernance et de gestion FM pour présenter les problèmes de conformité, de performance et de récupération avec un contexte opérationnel partagé.",
  "estate.page.launchpadsLane.readinessTitle": "\nÉtat de préparation",
  "estate.page.launchpadsLane.readinessHeadline":
    "\nAugmentez rapidement la portée, les capacités et les bloqueurs d'infrastructure.",
  "estate.page.launchpadsLane.readinessDescription":
    "\nIntégrez les signaux de préparation dans les rapports et la planification avant que les contraintes ne se transforment en échecs de service, de formation ou d'approbation.",
  "estate.page.launchpadsLane.externalTitle": "\nDépendances",
  "estate.page.launchpadsLane.externalHeadline":
    "\nTraitez les intégrations d'entreprise et les systèmes partenaires comme des contrôles opérationnels.",
  "estate.page.launchpadsLane.externalDescription":
    "\nExaminez les dépendances en matière de finances, de documents, d'approvisionnement et de restauration dans le cadre du tableau d'exploitation du domaine plutôt que comme des données administratives distinctes.",
  "estate.readiness.actionsTitle": "\nActions du workflow de préparation",
  "estate.readiness.actionsDescription":
    "\nFaites passer l'état de préparation aux flux de travail connectés qui possèdent des preuves d'atténuation, de financement et d'assurance.",
  "estate.readiness.action.report": "\nOuvrir le pack de préparation",
  "estate.readiness.action.workOrders": "\nBons de travail ouverts",
  "estate.readiness.action.finance": "\nPlanification financière ouverte",
  "estate.operationalPicture.actionsTitle": "\nActions en image opérationnelle",
  "estate.operationalPicture.actionsDescription":
    "\nPassez de l'image de contrôle intégré aux surfaces détaillées qui possèdent les preuves du registre, l'exécution du travail et les rapports de direction.",
  "estate.operationalPicture.action.report": "\nOuvrir le pack opérationnel",
  "estate.operationalPicture.action.assets": "\nActifs ouverts",
  "estate.operationalPicture.action.workOrders": "\nBons de travail ouverts",
  "fleet.title": "\nFlotte",
  "fleet.subtitle": "\nPosition du véhicule, utilisation et pression d'entretien",
  "fleet.coverage":
    "\nCommencez par la tranche de véhicule actuelle de la plate-forme, puis évoluez vers la profondeur de la répartition, de la conformité et de la télématique.",
  "fleet.view.overview": "\nAperçu",
  "fleet.view.operations": "\nOpérations",
  "fleet.view.initiatives": "\nInitiatives",
  "fleet.view.dependencies": "\nDépendances",
  "fleet.kpi.vehicles": "\nVéhicules",
  "fleet.kpi.vehiclesDesc": "\nActifs actuellement classés comme flotte de véhicules",
  "fleet.kpi.telemetry": "\nVéhicules soutenus par la télémétrie",
  "fleet.kpi.telemetryDesc": "\nVéhicules signalant déjà des signaux opérationnels",
  "fleet.kpi.tasks": "\nTâches de flotte ouvertes",
  "fleet.kpi.tasksDesc": "\nCarnet de maintenance lié aux actifs du véhicule",
  "fleet.kpi.operations": "\nContrôles de flotte",
  "fleet.kpi.operationsDesc": "\nÉtat durable, dossiers d'accidents et de remplacement",
  "fleet.kpi.sites": "\nSites de flotte",
  "fleet.kpi.sitesDesc": "\nSites hébergeant actuellement au moins un élément de véhicule",
  "fleet.summary.alertTitle":
    "\nLe déploiement de la flotte peut déjà être ancré dans les données opérationnelles en direct",
  "fleet.summary.alertDescription":
    "Utilisez la couverture de télémétrie, le travail actif et les signaux d'IA pour organiser l'expansion de la répartition, de la conformité et de la maintenance sans pile de flotte distincte.",
  "fleet.summary.tab.coverage": "\nCouverture",
  "fleet.summary.tab.maintenance": "\nPression d'entretien",
  "fleet.summary.tab.operations": "\nContrôle des opérations",
  "fleet.summary.telemetryTitle": "\nPréparation à la télémétrie du véhicule",
  "fleet.summary.telemetryDescription":
    "\nLes véhicules basés sur la télémétrie constituent la base actuelle pour une répartition fiable et des opérations de flotte sensibles à l'utilisation.",
  "fleet.summary.telemetryConnected": "\nVéhicules connectés par télémétrie",
  "fleet.summary.telemetryConnectedDesc":
    "\nLes véhicules {total} font actuellement partie de la tranche de flotte active.",
  "fleet.summary.telemetryStale": "\nVéhicules de télémétrie obsolètes",
  "fleet.summary.telemetryStaleDesc":
    "\n{coverage} de la flotte fonctionne actuellement avec une télémétrie obsolète.",
  "fleet.summary.postureTitle": "\nPosture de préparation",
  "fleet.summary.postureDescription":
    "\nPromouvez ensemble la fraîcheur de la télémétrie, le contexte des signaux d'IA et le suivi des tâches afin que la flotte devienne un système opérationnel au lieu d'une liste d'actifs filtrée.",
  "fleet.summary.badgeTelemetry": "\nTélémétrie",
  "fleet.summary.badgeStaleness": "\nObsolescence",
  "fleet.summary.badgeSignals": "\nSignaux IA",
  "fleet.summary.openTasksTitle": "\nTâches de maintenance ouvertes",
  "fleet.summary.openTasksDesc":
    "\nArriéré, travaux planifiés et en cours actuellement liés aux actifs des véhicules.",
  "fleet.summary.overdueTasksTitle": "\nTravaux en retard",
  "fleet.summary.overdueTasksDesc":
    "\nLes tâches en retard sur les véhicules sont le signal le plus clair de la pression des temps d'arrêt dus à la maintenance.",
  "fleet.summary.signalsTitle": "\nVéhicules dotés de signaux",
  "fleet.summary.signalsDesc":
    "\nLes véhicules dotés de prédictions d'IA actives peuvent être priorisés pour l'expédition, le remplacement ou l'intervention.",
  "fleet.summary.operationsTitle": "Registre de contrôle opérationnel",
  "fleet.summary.operationsDescription":
    "\nCapturez les enregistrements d'état durable, d'accident, de maintenance, d'utilisation et de remplacement dans le même espace de travail de la flotte SSR.",
  "fleet.summary.operationsCountLabel":
    "\n{count} enregistrements de flotte figurent dans le registre actuel.",
  "fleet.summary.accidentsTitle": "\nDossiers d'accident",
  "fleet.summary.accidentsDesc":
    "\nLes incidents de flotte enregistrés persistent désormais sous forme de contrôles opérationnels durables au lieu de notes ad hoc.",
  "fleet.summary.downtimeTitle": "\nTemps d'arrêt ou remplacement dû",
  "fleet.summary.downtimeDesc":
    "\nLes enregistrements marqués ou à remplacer indiquent où la disponibilité de la flotte est déjà limitée.",
  "fleet.summary.replacementTitle": "\nPlanification du remplacement",
  "fleet.summary.replacementDesc":
    "\nLes plans de remplacement s'ajoutent désormais à l'état actuel de la flotte afin que la pression du cycle de vie puisse se déplacer vers les finances et le reporting.",
  "fleet.initiativeForm.title": "\nCréer une initiative de flotte",
  "fleet.initiativeForm.description":
    "\nOrganisez la prochaine opération de répartition, de maintenance, de conformité ou de remplacement de la flotte directement à partir de la télémétrie en direct et de la posture de travail.",
  "fleet.initiativeForm.badge": "\nFlux de flotte durable",
  "fleet.initiativeForm.nameLabel": "\nTitre de l'initiative",
  "fleet.initiativeForm.namePlaceholder": "\nSprint de réduction des temps d'arrêt des fourgons",
  "fleet.initiativeForm.nameHint":
    "Utilisez un titre qui peut survivre dans les rapports et les transferts d'opérateurs.",
  "fleet.initiativeForm.scopeLabel": "\nPortée de la flotte",
  "fleet.initiativeForm.scopePlaceholder":
    "\nFourgons critiques, dépôt ouest ou itinéraires sensibles à la conformité",
  "fleet.initiativeForm.scopeHint":
    "\nNommez le groupe d'itinéraires, la classe de véhicule, le dépôt ou la tranche de service concerné.",
  "fleet.initiativeForm.categoryLabel": "\nCatégorie",
  "fleet.initiativeForm.categoryHint":
    "\nClassez l'initiative selon le résultat principal de la flotte.",
  "fleet.initiativeForm.category.DISPATCH": "\nExpédition",
  "fleet.initiativeForm.category.UTILISATION": "\nUtilisation",
  "fleet.initiativeForm.category.MAINTENANCE": "\nEntretien",
  "fleet.initiativeForm.category.COMPLIANCE": "\nConformité",
  "fleet.initiativeForm.category.ENERGY": "\nÉnergie",
  "fleet.initiativeForm.category.REPLACEMENT": "\nRemplacement",
  "fleet.initiativeForm.priorityLabel": "\nPriorité",
  "fleet.initiativeForm.priorityHint": "\nPlacez l'initiative dans l'horizon opérationnel actuel.",
  "fleet.initiativeForm.priority.NOW": "\nMaintenant",
  "fleet.initiativeForm.priority.NEXT": "\nSuivant",
  "fleet.initiativeForm.priority.LATER": "\nPlus tard",
  "fleet.initiativeForm.priority.WATCH": "\nRegarder",
  "fleet.initiativeForm.notesLabel": "\nNotes et hypothèses",
  "fleet.initiativeForm.notesPlaceholder":
    "\nCapturez la pression des temps d'arrêt, les problèmes de conformité, les contraintes de répartition ou les signaux de remplacement derrière cette initiative.",
  "fleet.initiativeForm.notesHint":
    "\nEnregistrez le raisonnement qui devrait survivre dans le suivi de l'expédition et de la maintenance.",
  "fleet.initiativeForm.requiredHint":
    "\nLe titre, la portée de la flotte, la catégorie et la priorité sont requis.",
  "fleet.initiativeForm.submit": "\nInitiative de sauvegarde de la flotte",
  "fleet.initiativeForm.submitAria": "\nInitiative de sauvegarde de la flotte",
  "fleet.initiativeForm.recentTitle": "\nInitiatives récentes de la flotte",
  "fleet.initiativeForm.recentDescription":
    "\nCes initiatives persistent désormais sous forme d'enregistrements de flotte durables sans quitter l'espace de travail SSR.",
  "fleet.initiativeForm.empty": "\nAucune initiative de flotte capturée pour l'instant.",
  "fleet.initiativeForm.emptyCta":
    "\nCréez votre première initiative de flotte pour commencer à suivre les améliorations opérationnelles.",
  "fleet.initiativeForm.savedAt": "\nMise à jour {updatedAt}",
  "fleet.initiativeForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "fleet.initiativeForm.validation.titleRequired": "\nLe titre de l’initiative est requis.",
  "fleet.initiativeForm.validation.scopeRequired": "\nLa portée de la flotte est requise.",
  "fleet.initiativeForm.validation.categoryRequired": "\nLa catégorie est obligatoire.",
  "fleet.initiativeForm.validation.priorityRequired": "\nLa priorité est requise.",
  "fleet.initiativeForm.feedback.saved":
    "\nInitiative de flotte enregistrée dans l'espace de travail de flotte.",
  "fleet.initiativeForm.feedback.saveFailed":
    "\nImpossible de maintenir l'initiative de flotte pour le moment.",
  "fleet.operationsForm.title": "\nCapturer un enregistrement d'opération de flotte",
  "fleet.operationsForm.description":
    "\nEnregistrez l'état du véhicule, les accidents, les activités de maintenance, les examens d'utilisation et la planification du remplacement directement à partir de l'espace de travail de la flotte en direct.",
  "fleet.operationsForm.badge": "\nContrôle opérationnel durable",
  "fleet.operationsForm.nameLabel": "\nTitre du disque",
  "fleet.operationsForm.namePlaceholder":
    "\nExamen de l'état de préparation au remplacement du véhicule 12",
  "fleet.operationsForm.nameHint":
    "\nUtilisez un titre qui aura toujours un sens dans les rapports, les transferts et les discussions financières.",
  "fleet.operationsForm.assetLabel": "\nActif de flotte lié",
  "fleet.operationsForm.assetPlaceholder": "\nSélectionnez un actif de flotte",
  "fleet.operationsForm.assetHint":
    "\nLiez l'enregistrement à l'actif du véhicule portant l'impact opérationnel ou le signal de révision.",
  "fleet.operationsForm.assetOption": "Actif : {name} – {siteName}",
  "fleet.operationsForm.recordTypeLabel": "\nType d'enregistrement",
  "fleet.operationsForm.recordTypeHint":
    "\nChoisissez le contrôle opérationnel que cet enregistrement ajoute au registre de la flotte.",
  "fleet.operationsForm.recordType.CONDITION_CHECK": "\nContrôle d'état",
  "fleet.operationsForm.recordType.ACCIDENT_RECORD": "\nDossier d'accident",
  "fleet.operationsForm.recordType.MAINTENANCE_ACTIVITY": "\nActivité de maintenance",
  "fleet.operationsForm.recordType.UTILISATION_REVIEW": "\nBilan d'utilisation",
  "fleet.operationsForm.recordType.REPLACEMENT_PLAN": "\nPlan de remplacement",
  "fleet.operationsForm.statusLabel": "\nStatut du flux de travail",
  "fleet.operationsForm.statusHint":
    "\nUtilisez l'état du flux de travail pour indiquer si le contrôle est actif, surveillé ou fermé.",
  "fleet.operationsForm.status.DRAFT": "\nBrouillon",
  "fleet.operationsForm.status.ACTIVE": "\nActif",
  "fleet.operationsForm.status.WATCH": "\nRegarder",
  "fleet.operationsForm.status.CLOSED": "\nFermé",
  "fleet.operationsForm.conditionStatusLabel": "\nCondition de posture",
  "fleet.operationsForm.conditionStatusHint":
    "Enregistrez la condition opérationnelle portée par l'actif de la flotte lié.",
  "fleet.operationsForm.conditionStatus.OPERATIONAL": "\nOpérationnel",
  "fleet.operationsForm.conditionStatus.WATCH": "\nRegarder",
  "fleet.operationsForm.conditionStatus.DOWN": "\nVers le bas",
  "fleet.operationsForm.conditionStatus.REPLACEMENT_DUE": "\nRemplacement dû",
  "fleet.operationsForm.metricValueLabel": "\nValeur mesurée",
  "fleet.operationsForm.metricValuePlaceholder": "p. ex. 78",
  "fleet.operationsForm.metricValueHint":
    "\nUtilisez-le pour les scores d'utilisation, les décomptes de sorties ou d'autres signaux de flotte mesurés.",
  "fleet.operationsForm.metricUnitLabel": "\nUnité métrique",
  "fleet.operationsForm.metricUnitPlaceholder": "\npourcentage, heures ou trajets",
  "fleet.operationsForm.metricUnitHint":
    "\nAjoutez une unité chaque fois qu'une valeur mesurée est enregistrée afin que les rapports restent interprétables.",
  "fleet.operationsForm.incidentDateLabel": "\nDate de l'incident",
  "fleet.operationsForm.incidentDateHint":
    "\nLes dossiers d'accident nécessitent la date calendaire de l'incident.",
  "fleet.operationsForm.targetDateLabel": "\nDate cible",
  "fleet.operationsForm.targetDateHint":
    "\nLes plans de remplacement doivent porter la prochaine date cible de révision ou d’action.",
  "fleet.operationsForm.notesLabel": "\nNotes et contexte opérationnel",
  "fleet.operationsForm.notesPlaceholder":
    "\nCapturez l'impact des temps d'arrêt, les résultats d'utilisation, les actions correctives ou les hypothèses de cycle de vie derrière cet enregistrement.",
  "fleet.operationsForm.notesHint":
    "\nCes notes doivent survivre dans les rapports, le suivi de la maintenance et la planification du remplacement.",
  "fleet.operationsForm.requiredHint":
    "\nLe titre, l'actif de flotte lié, le type d'enregistrement, l'état du flux de travail, l'état de la condition et les notes sont requis.",
  "fleet.operationsForm.submit": "\nEnregistrer l'enregistrement des opérations de la flotte",
  "fleet.operationsForm.submitAria": "\nEnregistrer l'enregistrement des opérations de la flotte",
  "fleet.operationsForm.recentTitle": "\nDossiers d'exploitation récents de la flotte",
  "fleet.operationsForm.recentDescription":
    "\nLe registre de flotte conserve désormais les enregistrements de contrôle opérationnel directement dans l'espace de travail SSR.",
  "fleet.operationsForm.empty":
    "\nAucun enregistrement d'opération de flotte n'a encore été capturé.",
  "fleet.operationsForm.emptyCta":
    "\nCapturez un enregistrement d'opération de flotte pour commencer à créer le registre de contrôle.",
  "fleet.operationsForm.emptyVehiclesTitle":
    "\nAucun actif de la flotte n'est encore prêt pour les contrôles opérationnels",
  "fleet.operationsForm.emptyVehiclesDescription":
    "\nCréez ou classifiez d'abord les actifs des véhicules afin que les enregistrements sur l'état de la flotte et les remplacements puissent être liés aux actifs réels.",
  "fleet.operationsForm.savedAt": "\nMise à jour {updatedAt}",
  "fleet.operationsForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "fleet.operationsForm.signal.asset": "\nActif",
  "fleet.operationsForm.signal.metric": "\nSignal mesuré",
  "fleet.operationsForm.signal.incidentDate": "\nDate de l'incident",
  "fleet.operationsForm.signal.targetDate": "\nDate cible",
  "fleet.operationsForm.validation.titleRequired": "\nLe titre de l'enregistrement est requis.",
  "fleet.operationsForm.validation.assetRequired": "\nUn actif de flotte lié est requis.",
  "fleet.operationsForm.validation.recordTypeRequired": "\nLe type d'enregistrement est requis.",
  "fleet.operationsForm.validation.statusRequired": "\nL’état du workflow est requis.",
  "fleet.operationsForm.validation.conditionStatusRequired":
    "\nUne posture de condition est requise.",
  "fleet.operationsForm.validation.notesRequired": "\nDes notes opérationnelles sont requises.",
  "fleet.operationsForm.validation.metricValueInvalid":
    "\nLa valeur mesurée doit être un nombre valide supérieur ou égal à zéro.",
  "fleet.operationsForm.validation.metricValueRequired":
    "\nLes évaluations d'utilisation nécessitent une valeur mesurée.",
  "fleet.operationsForm.validation.metricUnitRequired":
    "\nL'unité métrique est requise lorsqu'une valeur mesurée est enregistrée.",
  "fleet.operationsForm.validation.incidentDateInvalid":
    "\nLa date de l'incident doit être une valeur calendaire valide.",
  "fleet.operationsForm.validation.incidentDateRequired":
    "\nLes dossiers d'accident nécessitent une date d'incident.",
  "fleet.operationsForm.validation.targetDateInvalid":
    "\nLa date cible doit être une valeur de calendrier valide.",
  "fleet.operationsForm.validation.targetDateRequired":
    "\nLes plans de remplacement nécessitent une date cible.",
  "fleet.operationsForm.validation.assetNotFound": "\nL'actif de flotte lié est introuvable.",
  "fleet.operationsForm.feedback.saved":
    "\nEnregistrement des opérations de la flotte enregistré dans l'espace de travail de la flotte.",
  "fleet.operationsForm.feedback.saveFailed":
    "Impossible de conserver l'enregistrement des opérations de la flotte pour le moment.",
  "fleet.readiness.vehicles":
    "\nLes actifs classés par véhicule fournissent déjà une base de référence initiale pour la flotte.",
  "fleet.readiness.telemetry":
    "\nLes véhicules basés sur la télémétrie peuvent ancrer les déploiements de répartition et de conformité.",
  "fleet.readiness.tasks":
    "\nLes flux de travail de maintenance existants effectuent déjà le travail de la flotte.",
  "fleet.page.eyebrow": "\nCockpit de flotte opérationnel",
  "fleet.page.readinessRailDescription":
    "\nUtilisez ce rail pour décider où le risque de service, la pression de maintenance et la gouvernance de remplacement nécessitent une attention particulière avant de passer aux workflows de file d'attente, de finance ou de reporting.",
  "fleet.page.readinessRail.vehicleSignal":
    "\nLa disponibilité des véhicules et la couverture télémétrique restent la base de l'assurance de la flotte.",
  "fleet.page.readinessRail.maintenanceSignal":
    "\nLes temps d'arrêt, le suivi des accidents et les tâches en retard définissent la pression opérationnelle immédiate.",
  "fleet.page.readinessRail.replacementSignal":
    "\nLes candidats au remplacement et les flottes vieillissantes devraient passer à la planification financière avant les fenêtres de panne de service.",
  "fleet.page.commandTitle": "\nPosture de commandement de la flotte",
  "fleet.page.commandDescription":
    "\nCombinez la disponibilité des véhicules, le suivi de la maintenance, le contrôle des incidents et la pression de remplacement dans une seule image de la flotte destinée à l'opérateur.",
  "fleet.page.launchpadsTitle": "\nPlateformes de lancement des décisions de flotte",
  "fleet.page.launchpadsDescription":
    "\nPassez de la télémétrie opérationnelle et des interruptions de service à des actions régies pour l'utilisation, la maintenance, le remplacement et le reporting.",
  "fleet.page.launchpadsBadge": "\nFlux de travail d'entreprise",
  "fleet.page.launchpadsBriefTitle":
    "\nLa flotte se comporte désormais comme un portefeuille opérationnel géré",
  "fleet.page.launchpadsBriefDescription":
    "\nLe cockpit peut prendre en charge les décisions de dépôt, d'itinéraire, de conformité et de remplacement sans quitter le plan de contrôle de la flotte.",
  "fleet.page.launchpadsLane.maintenanceTitle": "\nContrôle d'entretien",
  "fleet.page.launchpadsLane.maintenanceHeadline":
    "\nUtilisez des enregistrements durables et des files d'attente de travail actives pour éviter que les temps d'arrêt ne se transforment en perte de service.",
  "fleet.page.launchpadsLane.maintenanceDescription":
    "\nAssociez les enregistrements d'incidents, la posture de condition et les travaux ouverts avec la file d'attente de maintenance et les packs de livraison opérationnels.",
  "fleet.page.launchpadsLane.utilisationTitle": "\nPression d'utilisation",
  "fleet.page.launchpadsLane.utilisationHeadline":
    "\nExpliquez les pics de demande de véhicules grâce à la télémétrie en direct et aux signaux de retard de service.",
  "fleet.page.launchpadsLane.utilisationDescription":
    "\nAcheminez la pression d'utilisation vers le cockpit d'utilisation avant que les flottes sous-utilisées ou surchargées ne faussent la planification.",
  "fleet.page.launchpadsLane.replacementTitle": "\nGouvernance de remplacement",
  "fleet.page.launchpadsLane.replacementHeadline":
    "Promouvoir les véhicules vieillissants dans la planification des investissements tout en gardant la continuité du service contrôlable.",
  "fleet.page.launchpadsLane.replacementDescription":
    "\nUtilisez ensemble les plans de remplacement, les modèles de temps d'arrêt et les conversations capitales au lieu de lignes de registre isolées.",
  "fleet.page.launchpadsLane.assuranceTitle": "\nAssurance et reporting",
  "fleet.page.launchpadsLane.assuranceHeadline":
    "\nPrésentez la situation, le retard et l'état de préparation du véhicule pour les opérateurs, les responsables financiers et les examens de gouvernance.",
  "fleet.page.launchpadsLane.assuranceDescription":
    "\nGardez les packs de rapports et les conversations financières alignés sur les mêmes contrôles en direct utilisés par l'équipe opérationnelle.",
  "fleet.action.utilisation":
    "\nUtilisez la posture d'utilisation pour identifier les pics de demande et les capacités inutilisées.",
  "fleet.action.tasks":
    "\nAccédez directement à la file d'attente de travail pour éliminer les temps d'arrêt du véhicule.",
  "fleet.action.reports":
    "\nRésumer la situation de la flotte pour les opérateurs et les parties prenantes financières.",
  "fleet.action.sensors":
    "\nInspectez la couverture de télémétrie en direct et les appareils obsolètes affectant la confiance de la flotte.",
  "fleet.action.buildings":
    "\nCoordonner le contexte des dépôts, des chantiers et des installations avec la demande de la flotte.",
  "fleet.action.addVehicle": "\nEnregistrer un nouveau véhicule comme asset dans la flotte.",
  "buildings.title": "\nBâtiments",
  "buildings.subtitle":
    "\nSituation des installations, couverture double et empreinte opérationnelle",
  "buildings.coverage":
    "\nDéveloppez la gestion des installations au-dessus des sites actuels, des actifs autres que les véhicules, des jumeaux numériques et des appareils connectés.",
  "buildings.view.overview": "\nAperçu",
  "buildings.view.initiatives": "\nInitiatives",
  "buildings.view.performance": "\nPerformances",
  "buildings.view.dependencies": "\nDépendances",
  "buildings.kpi.facilities": "\nInstallations",
  "buildings.kpi.facilitiesDesc": "\nSites actuellement marqués comme installations",
  "buildings.kpi.assets": "\nActifs de l'installation",
  "buildings.kpi.assetsDesc":
    "\nActifs autres que des véhicules actuellement en exploitation des installations",
  "buildings.kpi.twins": "\nJumeaux numériques",
  "buildings.kpi.twinsDesc": "\nModèles jumeaux déjà attachés au domaine",
  "buildings.kpi.devices": "\nAppareils connectés",
  "buildings.kpi.devicesDesc":
    "\nAppareils IoT déjà disponibles pour le déploiement des installations",
  "buildings.summary.alertTitle":
    "\nLe déploiement des installations peut déjà être fondé sur les données du domaine en direct",
  "buildings.summary.alertDescription":
    "\nUtilisez des profils de planification, des jumeaux numériques et des appareils connectés pour organiser la hiérarchie des bâtiments et le déploiement des opérations sans créer de pile d'installations parallèles.",
  "buildings.summary.tab.facility": "\nPosture de l'établissement",
  "buildings.summary.tab.operations": "\nCouverture opérationnelle",
  "buildings.summary.planningTitle": "\nPréparation à la planification et à la hiérarchie",
  "buildings.summary.planningDescription":
    "\nLes profils de planification de site constituent le point d'ancrage actuel pour la zone, la capacité de la flotte et le contexte des heures d'exploitation.",
  "buildings.summary.planningProfiles": "\nProfils de planification",
  "buildings.summary.planningProfilesDesc":
    "\nLes installations {total} sont actuellement concernées.",
  "buildings.summary.facilityAssets": "\nActifs de l'installation",
  "buildings.summary.facilityAssetsDesc":
    "\nLes actifs autres que les véhicules constituent la couche de base actuelle pour le déploiement des systèmes, des composants et au niveau de la pièce.",
  "buildings.summary.postureTitle": "\nPosture de préparation",
  "buildings.summary.postureDescription":
    "Promouvoir le contexte de planification, les jumeaux spatiaux et les appareils connectés ensemble afin que les bâtiments deviennent une hiérarchie opérationnelle au lieu d'une liste de sites plate.",
  "buildings.summary.badgePlanning": "\nPlanification",
  "buildings.summary.badgeTwin": "\nJumelé",
  "buildings.summary.badgeSensors": "\nPrêt pour le capteur",
  "buildings.summary.twinLinkedTitle": "\nInstallations jumelées",
  "buildings.summary.twinLinkedDesc":
    "\nInstallations avec au moins un jumeau numérique déjà connecté pour les flux de travail spatiaux.",
  "buildings.summary.sensorReadyTitle": "\nInstallations prêtes pour les capteurs",
  "buildings.summary.sensorReadyDesc":
    "\nLes installations auxquelles sont connectés des appareils IoT peuvent prendre en charge l’extension de la télémétrie des salles, des zones et du système.",
  "buildings.initiativeForm.title": "\nCréer une initiative d'installations",
  "buildings.initiativeForm.description":
    "\nOrganisez le prochain déploiement des installations ou le package de remédiation directement à partir de la planification en direct, de la couverture des jumeaux et des capteurs.",
  "buildings.initiativeForm.badge": "\nFlux d'installations durables",
  "buildings.initiativeForm.nameLabel": "\nTitre de l'initiative",
  "buildings.initiativeForm.namePlaceholder": "\nRemise en service CVC pour étages occupés",
  "buildings.initiativeForm.nameHint":
    "\nUtilisez un titre qui peut se retrouver dans les rapports et le suivi des travaux.",
  "buildings.initiativeForm.scopeLabel": "\nPortée de l'installation",
  "buildings.initiativeForm.scopePlaceholder":
    "\nSiège nord, campus ouest ou cluster d'installations critiques",
  "buildings.initiativeForm.scopeHint":
    "\nNommez le groupe d'établissements, la zone du campus ou la tranche d'exploitation concernée.",
  "buildings.initiativeForm.categoryLabel": "\nCatégorie",
  "buildings.initiativeForm.categoryHint":
    "\nClassez l’initiative selon le résultat principal des installations.",
  "buildings.initiativeForm.category.SPACE": "\nEspace",
  "buildings.initiativeForm.category.SYSTEM": "\nSystème",
  "buildings.initiativeForm.category.ENERGY": "\nÉnergie",
  "buildings.initiativeForm.category.COMPLIANCE": "\nConformité",
  "buildings.initiativeForm.phaseLabel": "\nPhase",
  "buildings.initiativeForm.phaseHint":
    "\nPlacez l'initiative dans l'horizon de déploiement actuel.",
  "buildings.initiativeForm.phase.NOW": "\nMaintenant",
  "buildings.initiativeForm.phase.NEXT": "\nSuivant",
  "buildings.initiativeForm.phase.LATER": "\nPlus tard",
  "buildings.initiativeForm.notesLabel": "\nNotes et hypothèses",
  "buildings.initiativeForm.notesPlaceholder":
    "\nCapturez la pression opérationnelle, le contexte spatial, le besoin de conformité ou l'objectif énergétique derrière cette initiative.",
  "buildings.initiativeForm.notesHint":
    "\nEnregistrez le raisonnement qui devrait survivre dans les examens des installations et les transferts de direction.",
  "buildings.initiativeForm.requiredHint":
    "\nLe titre, la portée de l'installation, la catégorie et la phase sont requis.",
  "buildings.initiativeForm.submit": "\nInitiative de sauvegarde des installations",
  "buildings.initiativeForm.submitAria": "\nInitiative de sauvegarde du bâtiment",
  "buildings.initiativeForm.recentTitle": "\nInitiatives récentes en matière d'installations",
  "buildings.initiativeForm.recentDescription":
    "\nCes initiatives perdurent désormais sous la forme d'installations durables qui enregistrent sans quitter l'espace de travail RSS.",
  "buildings.initiativeForm.recentCountLabel":
    "\n{count} initiatives façonnent actuellement le registre des installations.",
  "buildings.initiativeForm.empty":
    "\nAucune initiative relative aux installations n'a encore été capturée.",
  "buildings.initiativeForm.emptyCta":
    "\nCréez votre première initiative d'installations pour commencer à suivre les améliorations du bâtiment.",
  "buildings.initiativeForm.savedAt": "\nMise à jour {updatedAt}",
  "buildings.initiativeForm.notesEmpty": "\nAucune note capturée pour l'instant.",
  "buildings.initiativeForm.validation.titleRequired": "\nLe titre de l’initiative est requis.",
  "buildings.initiativeForm.validation.scopeRequired": "\nLa portée de l'installation est requise.",
  "buildings.initiativeForm.validation.categoryRequired": "\nLa catégorie est obligatoire.",
  "buildings.initiativeForm.validation.phaseRequired": "\nUne phase est requise.",
  "buildings.initiativeForm.feedback.saved":
    "\nInitiative d'installations enregistrée dans l'espace de travail du bâtiment.",
  "buildings.initiativeForm.feedback.saveFailed":
    "\nImpossible de maintenir l'initiative relative aux installations pour le moment.",
  "buildings.readiness.facilities":
    "\nLa posture du site et des installations fournit déjà la première couche hiérarchique du bâtiment.",
  "buildings.readiness.twins":
    "La couverture du jumeau numérique peut ancrer les flux de travail des pièces, des zones et du système.",
  "buildings.readiness.devices":
    "\nLes appareils connectés peuvent être promus dans les vues de télémétrie des installations.",
  "buildings.page.eyebrow": "\nPlan de contrôle des installations",
  "buildings.page.readinessRailDescription":
    "\nUtilisez ce rail pour évaluer la gouvernance des installations, la couverture double et l'état de préparation à la conformité avant de passer aux rapports, à la télémétrie ou à la planification des investissements.",
  "buildings.page.readinessRail.facilitySignal":
    "\nLa hiérarchie des installations et la posture d'initiative définissent la base de référence opérationnelle actuelle du bâtiment.",
  "buildings.page.readinessRail.twinSignal":
    "\nLes installations jumelées constituent le meilleur point d’ancrage pour le contexte de la pièce, du système et de l’intervention.",
  "buildings.page.readinessRail.complianceSignal":
    "\nLes installations prêtes à recevoir des capteurs et pilotées par l'examen indiquent à quel niveau les preuves d'assurance peuvent être fiables aujourd'hui.",
  "buildings.page.commandTitle": "\nPosture de commandement des installations",
  "buildings.page.commandDescription":
    "\nCombinez la hiérarchie des installations, la double liaison, la préparation à la télémétrie et la pression des actions d'amélioration dans une seule vue des installations de l'entreprise.",
  "buildings.page.launchpadsTitle": "\nPlateformes de décision relatives aux installations",
  "buildings.page.launchpadsDescription":
    "\nTraduisez la posture du bâtiment en opérations spatiales, en assurance de conformité et en conversations capitales sans créer une pile de planification distincte.",
  "buildings.page.launchpadsBadge": "\nFlux de travail d'entreprise",
  "buildings.page.launchpadsBriefTitle":
    "\nLes bâtiments se lisent désormais comme un portefeuille d'installations gérées",
  "buildings.page.launchpadsBriefDescription":
    "\nL'espace de travail peut prendre en charge la gouvernance des installations, le suivi des jumeaux numériques et l'augmentation des capitaux à partir d'une seule surface opérationnelle.",
  "buildings.page.launchpadsLane.governanceTitle": "\nGouvernance des installations",
  "buildings.page.launchpadsLane.governanceHeadline":
    "\nGardez les initiatives des installations liées à la hiérarchie du domaine résidentiel et à l'image des risques opérationnels.",
  "buildings.page.launchpadsLane.governanceDescription":
    "\nUtilisez le registre d'initiative comme surface de contrôle durable pour les travaux liés aux systèmes, à l'espace, à l'énergie et à la conformité.",
  "buildings.page.launchpadsLane.twinTitle": "\nTwin et télémétrie",
  "buildings.page.launchpadsLane.twinHeadline":
    "\nPromouvoir les installations jumelées et prêtes pour les capteurs en preuves spatiales avant de lancer des interventions majeures.",
  "buildings.page.launchpadsLane.twinDescription":
    "\nVérifiez la position des installations par rapport aux jumeaux numériques et aux surfaces de capteurs au lieu de planifier uniquement à partir de notes narratives.",
  "buildings.page.launchpadsLane.complianceTitle": "\nAssurance de conformité",
  "buildings.page.launchpadsLane.complianceHeadline":
    "\nUtilisez la posture du bâtiment pour organiser les inspections, les preuves réglementaires et les rapports d'assurance.",
  "buildings.page.launchpadsLane.complianceDescription":
    "Le même plan de contrôle des installations prend désormais en charge le suivi opérationnel et les rapports prêts pour l'audit.",
  "buildings.page.launchpadsLane.capitalTitle": "\nCoordination des capitaux",
  "buildings.page.launchpadsLane.capitalHeadline":
    "\nIntégrez plus tôt les risques liés au bâtiment, les pressions d'amélioration et les travaux sur le cycle de vie aux packs de finances et de programmes.",
  "buildings.page.launchpadsLane.capitalDescription":
    "\nPassez de l'état des installations à l'état de préparation, à la gouvernance FM et aux packs opérationnels du domaine sans reconstruire l'histoire des données.",
  "buildings.action.twin":
    "\nOuvrez la surface de jumeau numérique existante pour le contexte des opérations spatiales.",
  "buildings.action.assets":
    "\nInspecter le domaine non véhiculaire soutenant les opérations du bâtiment.",
  "buildings.action.reports":
    "\nPerformances des installations de package pour la conformité et l’examen par la direction.",
  "buildings.action.sensors":
    "\nSuivez les problèmes de construction dans la télémétrie en direct et la couverture des appareils.",
  "buildings.action.fleet":
    "\nCoordonner les actifs mobiles, les dépôts et la logistique sur le terrain avec les bâtiments.",
  "buildings.action.add": "\nEnregistrer un nouveau bâtiment ou une installation.",
  "sensors.title": "\nCapteurs",
  "sensors.subtitle":
    "\nCouverture de télémétrie, posture de l'appareil et état de préparation du signal",
  "sensors.coverage": "Couverture télémétrie des actifs",
  "sensors.view.overview": "\nAperçu",
  "sensors.view.alertRules": "\nRègles d'alerte",
  "sensors.view.quality": "\nQualité",
  "sensors.view.dependencies": "\nDépendances",
  "sensors.kpi.devices": "\nAppareils enregistrés",
  "sensors.kpi.devicesDesc": "\nAppareils actuellement enregistrés dans le plan de contrôle",
  "sensors.kpi.telemetry": "\nPoints de télémétrie",
  "sensors.kpi.telemetryDesc": "\nÉchantillons de télémétrie bruts déjà stockés",
  "sensors.kpi.coverage": "\nActifs avec télémétrie",
  "sensors.kpi.coverageDesc": "\nActifs distincts recevant déjà la télémétrie",
  "sensors.kpi.unseen": "\nAppareils jamais vus",
  "sensors.kpi.unseenDesc": "\nAppareils enregistrés qui n'ont pas encore signalé ",
  "sensors.summary.alertTitle": "\nLa sémantique des capteurs est prête à être opérationnalisée",
  "sensors.summary.alertDescription":
    "\nSuivez l'achèvement des métadonnées de l'appareil et le marquage de télémétrie sémantique avant de développer des adaptateurs de protocole et des alertes.",
  "sensors.summary.tab.device": "\nPosition de l'appareil",
  "sensors.summary.tab.semantic": "\nTélémétrie sémantique",
  "sensors.summary.metadataTitle": "\nPréparation des métadonnées de l'appareil",
  "sensors.summary.metadataDescription":
    "\nComptez les appareils avec suffisamment de détails d'identification pour prendre en charge les flux de travail d'opérations, d'étalonnage et de mise en service.",
  "sensors.summary.metadataReady": "\nAppareils prêts pour les métadonnées",
  "sensors.summary.metadataReadyDesc":
    "\n{count} nombre total d'appareils enregistrés dans le plan de contrôle.",
  "sensors.summary.commissioned": "\nAppareils mis en service",
  "sensors.summary.commissionedDesc":
    "\n{coverage} des appareils enregistrés incluent une date de mise en service.",
  "sensors.summary.postureTitle": "\nPosture de préparation",
  "sensors.summary.postureDescription":
    "\nFaites la promotion des données sur le fournisseur, le modèle, le micrologiciel, l'emplacement d'installation et la mise en service avant de traiter le registre comme un inventaire durable des capteurs.",
  "sensors.summary.badgeMetadata": "\nMétadonnées",
  "sensors.summary.badgeInstall": "Contexte d'installation",
  "sensors.summary.badgeCommissioning": "\nMise en service",
  "sensors.summary.seriesKeyTitle": "\nClés de série",
  "sensors.summary.seriesKeyDesc": "\n{total} échantillons de télémétrie actuellement stockés.",
  "sensors.summary.unitTitle": "\nUnités attachées",
  "sensors.summary.unitDesc":
    "\nLes unités constituent le contrat sémantique minimum pour une télémétrie comparable.",
  "sensors.summary.qualityTitle": "\nQualité marquée",
  "sensors.summary.qualityDesc":
    "\nLes indicateurs de qualité permettent aux flux de travail en aval de distinguer les données fiables et estimées.",
  "sensors.alertRuleForm.title": "\nCréer une règle d'alerte",
  "sensors.alertRuleForm.description":
    "\nCréez des alertes basées sur des seuils directement à partir de la préparation de la télémétrie en direct dans le flux durable du plan de contrôle des capteurs.",
  "sensors.alertRuleForm.badge": "\nRègle durable",
  "sensors.alertRuleForm.nameLabel": "\nTitre de la règle",
  "sensors.alertRuleForm.namePlaceholder": "\nCO2 élevé dans les pièces occupées",
  "sensors.alertRuleForm.nameHint":
    "\nUtilisez un titre que les opérateurs peuvent réutiliser dans les rapports et le suivi des bâtiments.",
  "sensors.alertRuleForm.seriesKeyLabel": "\nClé de série",
  "sensors.alertRuleForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertRuleForm.seriesKeyHint":
    "\nFaites correspondre la clé de télémétrie sémantique qui doit être évaluée.",
  "sensors.alertRuleForm.comparatorLabel": "\nComparateur",
  "sensors.alertRuleForm.comparatorHint":
    "\nChoisissez comment la lecture en direct doit être comparée au seuil.",
  "sensors.alertRuleForm.comparator.GT": "Supérieur",
  "sensors.alertRuleForm.comparator.LT": "Inférieur",
  "sensors.alertRuleForm.comparator.EQ": "Égal",
  "sensors.alertRuleForm.thresholdLabel": "\nSeuil",
  "sensors.alertRuleForm.thresholdPlaceholder": "1200 (ex.)",
  "sensors.alertRuleForm.thresholdHint":
    "\nUtilisez la limite numérique qui doit déclencher la règle.",
  "sensors.alertRuleForm.severityLabel": "\nGravité",
  "sensors.alertRuleForm.severityHint":
    "\nDéfinissez l'urgence visible par l'opérateur pour la règle.",
  "sensors.alertRuleForm.severity.INFO": "\nInfos",
  "sensors.alertRuleForm.severity.WARNING": "\nAvertissement",
  "sensors.alertRuleForm.severity.CRITICAL": "\nCritique",
  "sensors.alertRuleForm.requiredHint":
    "\nLe titre, la clé de série, le comparateur, le seuil et la gravité sont requis.",
  "sensors.alertRuleForm.submit": "\nEnregistrer la règle d'alerte",
  "sensors.alertRuleForm.submitAria": "\nEnregistrer la règle d'alerte du capteur",
  "sensors.alertRules.feedback.saved":
    "\nRègle d'alerte de capteur enregistrée dans l'espace de travail des capteurs.",
  "sensors.alertForm.title": "\nCréer une règle d'alerte",
  "sensors.alertForm.description":
    "\nCréez des alertes basées sur des seuils directement à partir de la préparation de la télémétrie en direct dans le flux de travail durable du plan de contrôle des capteurs.",
  "sensors.alertForm.badge": "\nRègle durable",
  "sensors.alertForm.nameLabel": "\nTitre de la règle",
  "sensors.alertForm.namePlaceholder": "\nCO2 élevé dans les pièces occupées",
  "sensors.alertForm.nameHint":
    "\nUtilisez un titre que les opérateurs peuvent réutiliser dans les rapports et le suivi des bâtiments.",
  "sensors.alertForm.seriesKeyLabel": "\nClé de série",
  "sensors.alertForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertForm.seriesKeyHint":
    "\nFaites correspondre la clé de télémétrie sémantique qui doit être évaluée.",
  "sensors.alertForm.comparatorLabel": "\nComparateur",
  "sensors.alertForm.comparatorHint":
    "\nChoisissez comment la lecture en direct doit être comparée au seuil.",
  "sensors.alertForm.comparator.GT": "Supérieur",
  "sensors.alertForm.comparator.LT": "Inférieur",
  "sensors.alertForm.comparator.EQ": "Égal",
  "sensors.alertForm.thresholdLabel": "\nSeuil",
  "sensors.alertForm.thresholdPlaceholder": "1200 (ex.)",
  "sensors.alertForm.thresholdHint": "\nUtilisez la limite numérique qui doit déclencher la règle.",
  "sensors.alertForm.severityLabel": "\nGravité",
  "sensors.alertForm.severityHint": "\nDéfinissez l'urgence visible par l'opérateur pour la règle.",
  "sensors.alertForm.severity.INFO": "\nInfos",
  "sensors.alertForm.severity.WARNING": "\nAvertissement",
  "sensors.alertForm.severity.CRITICAL": "\nCritique",
  "sensors.alertForm.requiredHint":
    "\nLe titre, la clé de série, le comparateur, le seuil et la gravité sont requis.",
  "sensors.alertForm.submit": "\nEnregistrer la règle d'alerte",
  "sensors.alertForm.submitAria": "\nEnregistrer la règle d'alerte du capteur",
  "sensors.alertForm.recentTitle": "\nRègles d'alerte récentes",
  "sensors.alertForm.recentDescription":
    "\nLes règles d'alerte persistent désormais directement dans le modèle de plan de contrôle du capteur durable.",
  "sensors.alertForm.empty": "\nAucune règle d'alerte de capteur capturée pour l'instant.",
  "sensors.alertForm.emptyCta":
    "\nCréez votre première règle d'alerte pour commencer à surveiller la télémétrie du capteur.",
  "sensors.alertForm.savedAt": "\nMise à jour {updatedAt}",
  "sensors.alertForm.validation.titleRequired": "\nLe titre de la règle d'alerte est obligatoire.",
  "sensors.alertForm.validation.seriesKeyRequired": "\nLa clé de série est requise.",
  "sensors.alertForm.validation.comparatorRequired": "\nUn comparateur est requis.",
  "sensors.alertForm.validation.thresholdRequired": "\nLe seuil doit être numérique.",
  "sensors.alertForm.validation.severityRequired": "\nLa gravité est requise.",
  "sensors.alertForm.feedback.saved":
    "\nRègle d'alerte de capteur enregistrée dans l'espace de travail des capteurs.",
  "sensors.alertForm.feedback.saveFailed":
    "\nImpossible de conserver la règle d'alerte du capteur pour le moment.",
  "sensors.alertRules.title": "\nRègles d'alerte durables",
  "sensors.alertRules.description":
    "\nLes règles promues persistent dans le modèle de plan de contrôle du capteur et peuvent lancer le travail d'exécution en aval.",
  "sensors.alertRules.empty": "\nAucune règle d'alerte de capteur durable n'a encore été créée.",
  "sensors.alertRules.promote": "\nPromouvoir la règle",
  "sensors.alertRules.column.title": "\nRègle",
  "sensors.alertRules.column.seriesKey": "\nClé de série",
  "sensors.alertRules.column.threshold": "\nSeuil",
  "sensors.alertRules.column.severity": "\nGravité",
  "sensors.alertRules.column.updatedAt": "\nMise à jour",
  "sensors.alertRules.badge.enabled": "\nActivé",
  "sensors.alertRules.badge.disabled": "\nDésactivé",
  "sensors.alertRules.validation.titleRequired":
    "\nLe titre de la règle d’alerte durable est requis.",
  "sensors.alertRules.validation.seriesKeyRequired":
    "\nUne clé de série de règles d’alerte durables est requise.",
  "sensors.alertRules.validation.thresholdRequired":
    "\nLe seuil de règle d'alerte durable doit être numérique.",
  "sensors.alertRules.feedback.saveFailed":
    "Impossible de conserver la règle d'alerte de capteur durable pour le moment.",
  "sensors.readiness.devices":
    "\nLe registre actuel des appareils prend déjà en charge une référence de plan de contrôle.",
  "sensors.readiness.telemetry":
    "\nLes échantillons de télémétrie en direct peuvent être normalisés en modèles de séries sémantiques.",
  "sensors.readiness.coverage":
    "\nLa télémétrie liée aux actifs fournit déjà une couverture opérationnelle initiale.",
  "sensors.page.eyebrow": "\nPlan de contrôle de télémétrie",
  "sensors.page.readinessRailDescription":
    "\nUtilisez ce rail pour juger de l'état des métadonnées, de l'exhaustivité de la mise en service et de la qualité du signal avant de promouvoir la télémétrie dans des alertes, des rapports ou des décisions opérationnelles en aval.",
  "sensors.page.readinessRail.metadataSignal":
    "\nL'exhaustivité des métadonnées constitue la base d'une propriété et d'un routage fiables des appareils.",
  "sensors.page.readinessRail.commissioningSignal":
    "\nLa posture de mise en service détermine si les lectures en direct peuvent prendre en charge une escalade opérationnelle.",
  "sensors.page.readinessRail.qualitySignal":
    "\nLa télémétrie avec étiquette de qualité est le contrôle qui sépare les signaux fiables des flux bruyants.",
  "sensors.page.commandTitle": "\nPosture de commande de télémétrie",
  "sensors.page.commandDescription":
    "\nCombinez la préparation des métadonnées, la couverture de mise en service, la profondeur des séries sémantiques et le marquage de qualité dans une seule image télémétrique destinée à l'opérateur.",
  "sensors.page.launchpadsTitle": "\nPlateformes de lancement de décisions de télémétrie",
  "sensors.page.launchpadsDescription":
    "\nPromouvoir la posture de l'appareil et la qualité du signal dans les alertes, les analyses et les rapports d'entreprise sans fragmenter le contrat de télémétrie.",
  "sensors.page.launchpadsBadge": "\nFlux de travail d'entreprise",
  "sensors.page.launchpadsBriefTitle":
    "\nLes capteurs se comportent désormais comme un domaine de télémétrie gouverné",
  "sensors.page.launchpadsBriefDescription":
    "\nL'espace de travail peut prendre en charge la gouvernance sémantique, la promotion de règles et la remontée opérationnelle en aval à partir d'un seul plan de contrôle.",
  "sensors.page.launchpadsLane.metadataTitle": "\nGouvernance des métadonnées",
  "sensors.page.launchpadsLane.metadataHeadline":
    "\nStandardisez la propriété des appareils, les clés de série et la signification sémantique avant de mettre à l'échelle les alertes ou les analyses.",
  "sensors.page.launchpadsLane.metadataDescription":
    "\nUtilisez l’état de l’appareil et des métadonnées comme portail de qualité pour chaque consommateur opérationnel en aval.",
  "sensors.page.launchpadsLane.alertingTitle": "\nAssurance d'alerte",
  "sensors.page.launchpadsLane.alertingHeadline":
    "\nTransformez des séries fiables en règles durables sur lesquelles les opérateurs peuvent agir dans l'ensemble des bâtiments et de la flotte.",
  "sensors.page.launchpadsLane.alertingDescription":
    "\nLes règles d'alerte doivent refléter une télémétrie gouvernée, et non des seuils ponctuels déconnectés du plan de contrôle.",
  "sensors.page.launchpadsLane.analyticsTitle": "\nAnalyse opérationnelle",
  "sensors.page.launchpadsLane.analyticsHeadline":
    "Transformez la télémétrie sémantique en preuves d'utilisation, de préparation et de décision stratégique.",
  "sensors.page.launchpadsLane.analyticsDescription":
    "\nUtilisez la qualité des séries et la posture des seuils pour renforcer les analyses prédictives et opérationnelles.",
  "sensors.page.launchpadsLane.escalationTitle": "\nEscalade et reporting",
  "sensors.page.launchpadsLane.escalationHeadline":
    "\nPassez des problèmes liés aux appareils aux workflows de préparation et de création de rapports avant que la confiance ne se dégrade entre les équipes.",
  "sensors.page.launchpadsLane.escalationDescription":
    "\nConservez les rapports, les bons de travail et les dossiers de décisions opérationnelles alignés sur le même contrat de télémétrie.",
  "sensors.action.utilisation":
    "\nUtilisez la qualité de la télémétrie pour expliquer la confiance dans l'utilisation et les écarts.",
  "sensors.action.twin":
    "\nSuperposer la posture de l'appareil sur le contexte du jumeau spatial et du point d'accès.",
  "sensors.action.reports":
    "\nExportez l’état de santé de l’appareil et la couverture du signal dans des packs de rapports.",
  "sensors.action.buildings":
    "\nSuivez les problèmes des chambres et des installations jusqu'à l'état du capteur.",
  "sensors.action.fleet":
    "\nConnectez les angles morts de télémétrie du véhicule à l’espace de travail de la flotte.",
  "sensors.action.add": "\nEnregistrer un nouveau capteur ou appareil.",
  "common.liveSummary": "\nRésumé en direct",
  "common.domainCoverage": "\nCouverture du domaine",
  "common.nextActions": "\nActions suivantes",
  "common.readinessSummary": "\nÉtat de préparation actuel au déploiement",
  "common.connectedWorkflows": "\nFlux de travail connectés",
  "common.connectedWorkflowsHint":
    "\nReliez ce domaine aux opérations, aux finances et au reporting sans quitter le shell.",
  "common.workflowOps": "\nSuivi opérationnel",
  "common.workflowOpsHint":
    "\nUtilisez les surfaces d'exécution de tâches, d'utilisation et de terrain pour agir sur le signal en direct.",
  "common.workflowFinance": "\nAlignement financier",
  "common.workflowFinanceHint":
    "\nIntégrez les risques, les demandes et les approbations dans les budgets, les scénarios et le flux de documents.",
  "common.workflowReporting": "\nEmballage des parties prenantes",
  "common.workflowReportingHint":
    "\nRésumez l’état actuel dans des packs de rapports une fois que l’ensemble de travail est stable.",
  "common.workspaceGuide": "\nGuide de l'espace de travail",
  "common.now": "\nMaintenant",
  "common.next": "\nSuivant",
  "common.later": "\nPlus tard",
  "common.autoRefreshMinute": "\nActualisation automatique toutes les minutes",
  "common.guideAlertTitle": "\nChemin de déploiement prêt pour l'opérateur",
  "common.guideAlertDescription":
    "\nUtilisez d’abord le résumé en direct, puis accédez aux systèmes connectés avant de conditionner le résultat.",
  "common.timelineNowTitle": "\nLire la posture en direct",
  "common.timelineNowDescription":
    "\nCommencez par le résumé à actualisation automatique et vérifiez ce qui est déjà couvert dans le domaine actuel.",
  "common.timelineNextTitle": "\nAgir dans des flux de travail connectés",
  "common.timelineNextDescription":
    "\nAccédez aux tâches, aux finances, à la flotte, aux bâtiments, aux capteurs ou aux rapports en fonction de la surface de pression que vous devez résoudre.",
  "common.timelineLaterTitle": "\nPromouvoir un travail de programme durable",
  "common.timelineLaterDescription":
    "Une fois que le cheminement en direct est stable, renforcez-le dans les approbations, la hiérarchie, la sémantique et les rapports de direction.",
  "common.workflowHint":
    "\nAccédez aux surfaces actives connectées qui prennent déjà en charge cette extension.",
  "common.strategicWorkspace.chatContext":
    "\nEspace de travail {title}. {subtitle} Connecté au shell d'opérations rendu par le serveur actuel, à la limite d'authentification partagée et au modèle partiel HTMX.",
  "iot.assetRequired": "\nLe contexte de l'actif est requis pour l'ingestion de télémétrie.",
  "iot.metricRequired": "\nUne clé de métrique ou de série de télémétrie est requise.",
  "finance.action.assets":
    "\nInspectez la tranche actuelle du portefeuille avant de réaffecter le capital.",
  "finance.action.planning":
    "\nPasser de l’exposition à la dépréciation aux scénarios de planification et aux approbations.",
  "finance.action.purchaseOrders":
    "\nExaminer les engagements relatifs aux bons de commande et le suivi des fournisseurs affectant la situation financière.",
  "finance.action.reports": "\nRegroupez l’état visible du portefeuille dans un rapport exécutif.",
  "finance.workspace.title": "\nCentre de commande d'amortissement",
  "finance.workspace.description":
    "\nSuivez la dérive de valorisation, le risque de concentration et l’exposition à la dépréciation en direct dans l’ensemble du portefeuille.",
  "finance.relatedLinks.title": "\nConnexe",
  "finance.relatedLinks.description":
    "\nAccédez au registre des actifs ou aux espaces de travail de documents pour coordonner le suivi financier.",
  "finance.cockpit.filters.eyebrow": "\nFiltres",
  "finance.cockpit.filters.title": "\nPortez le cockpit",
  "finance.cockpit.filters.description":
    "\nFiltrez le cockpit financier par site, période fiscale et densité de table avant d'exporter la tranche actuelle.",
  "finance.cockpit.filters.exportDescription":
    "\nExportez le portefeuille d'amortissements actuellement filtré au format CSV ou PDF.",
  "finance.cockpit.actions.eyebrow": "\nFlux de travail connectés",
  "finance.cockpit.actions.title": "\nPasser de l'évaluation à l'action",
  "finance.cockpit.actions.description":
    "\nAccédez directement aux systèmes opérationnels qui expliquent ou résolvent les écarts de portefeuille.",
  "finance.cockpit.hero.eyebrow": "\nCockpit financier",
  "finance.cockpit.hero.title":
    "\nExposition, pression dans la file d'attente et concentration ajustées par l'IA dans un seul espace de travail",
  "finance.cockpit.hero.description":
    "\nUn cockpit financier rendu par un serveur pour examiner côte à côte la dérive de valorisation, la concentration du site, la pression des tâches et le flux d'approvisionnement ou d'élimination.",
  "finance.cockpit.hero.live": "\nActualisation automatique toutes les {seconds} secondes",
  "finance.cockpit.chat.pageContext":
    "Page du cockpit financier. Espace de travail unifié pour une exposition ajustée par l'IA, la concentration des sites, le retard de maintenance, les approbations de documents et les variations de portefeuille. Contrôles : filtre de site, période fiscale, taille de page, export CSV, export PDF. Sections principales : briefing du portefeuille d'IA, couverture de l'ensemble de données, bande de KPI, classement du site, file d'attente d'actions, cartes de concentration et tableau du portefeuille.",
  "finance.cockpit.action.disposalReview": "\nVérifier l'élimination",
  "finance.cockpit.action.immediateIntervention": "\nIntervention immédiate",
  "finance.cockpit.action.replacementPlan": "\nPlan de remplacement",
  "finance.cockpit.action.procurementReview": "\nExaminer les achats",
  "finance.cockpit.action.workOrderFollowUp": "\nBon de travail de suivi",
  "finance.cockpit.action.invoiceFollowUp": "\nFacture de suivi",
  "finance.cockpit.action.purchaseOrderFollowUp": "\nSuivi du bon de commande",
  "finance.cockpit.action.customerOrderFollowUp": "\nSuivi de la commande client",
  "finance.cockpit.action.monitor": "\nSurveiller l'exposition",
  "finance.cockpit.briefing.eyebrow": "\nPrésentation du portfolio",
  "finance.cockpit.briefing.title": "\nFiche financière",
  "finance.cockpit.briefing.summary":
    "\nPour {site} au-delà de {period}, l’exposition ajustée par l’IA s’élève à {adjustedExposure} avec un delta de valorisation de {delta}. Les actifs soutenus par des signaux {signalCount} et les tâches ouvertes {openTasks} façonnent la pression financière actuelle.",
  "finance.cockpit.briefing.recommendationTitle": "\nProchain coup recommandé",
  "finance.cockpit.briefing.recommendationPortfolio":
    "\nAucun actif ne domine la file d’attente. Examinez la concentration et ouvrez le flux de documents dans {site} avant de réaffecter le capital.",
  "finance.cockpit.briefing.recommendationAsset":
    "\nDonnez ensuite la priorité à {asset} et déplacez-le vers « {action} » afin que le risque de valorisation et le frein opérationnel ne s'aggravent pas.",
  "finance.cockpit.generatedAt": "\nGénéré {date}",
  "finance.cockpit.datasets.title": "\nCouverture de l'ensemble de données",
  "finance.cockpit.datasets.description":
    "\nLe cockpit combine l'évaluation, le risque d'IA, la charge de travail de maintenance et le flux de documents transactionnels dans une seule surface de décision financière.",
  "finance.cockpit.datasets.assetsTitle": "\nActifs concernés par le champ d'application",
  "finance.cockpit.datasets.assetsDescription":
    "\nActifs contribuant actuellement au portefeuille financier filtré.",
  "finance.cockpit.datasets.signalsTitle": "\nSignaux basés sur l'IA",
  "finance.cockpit.datasets.signalsDescription":
    "\nLes signaux critiques/d’urgence {critical} et les signaux d’avertissement {warning} influencent la valorisation.",
  "finance.cockpit.datasets.tasksTitle": "\nÉléments de travail ouverts",
  "finance.cockpit.datasets.tasksDescription":
    "\n{overdue} les tâches en retard augmentent la pression financière à court terme.",
  "finance.cockpit.datasets.documentsTitle": "\nOuvrir le flux de documents",
  "finance.cockpit.datasets.documentsDescription":
    "\n{workOrders} bons de travail, {purchaseOrders} bons de commande et {invoices} factures sont toujours actifs.",
  "finance.cockpit.kpi.adjustedExposure": "\nTaux d'ajustement de l'IA {rate}",
  "finance.cockpit.kpi.deltaTitle": "\nDelta de valorisation",
  "finance.cockpit.kpi.deltaDescription":
    "\nDifférence entre l'exposition à la dépréciation standard et la valorisation ajustée par l'IA.",
  "finance.cockpit.kpi.highRiskDescription":
    "\nLes actifs {count} comportent actuellement le risque financier et opérationnel le plus élevé.",
  "finance.cockpit.kpi.confidenceTitle": "Confiance moyenne",
  "finance.cockpit.kpi.confidenceDescription":
    "\nLes actifs {due} se trouvent déjà dans la fenêtre de prédiction à échéance prochaine.",
  "finance.cockpit.condition.description":
    "\nLa répartition des expositions en fonction de la condition des actifs permet de déterminer si le risque de capital se concentre autour d'actifs dégradés.",
  "finance.cockpit.type.description":
    "\nDécouvrez quels types d'actifs représentent la plus grande part de l'exposition financière actuelle.",
  "finance.cockpit.lifecycle.title": "\nMélange du cycle de vie",
  "finance.cockpit.lifecycle.description":
    "\nLa distribution du cycle de vie montre quelle part du portefeuille actuel se trouve dans des états actif, de surveillance, de fatigue ou éliminé.",
  "finance.cockpit.lifecycle.share": "\n{share} d'exposition visible",
  "finance.cockpit.lifecycle.assets": "\nActifs",
  "finance.cockpit.site.title": "\nConcentration du site",
  "finance.cockpit.site.description":
    "\nComparez l'exposition ajustée au niveau du site, les actifs à haut risque, les tâches actives et le flux de documents ouverts.",
  "finance.cockpit.site.share": "\n{share} d'exposition visible",
  "finance.cockpit.site.risk": "\nRisque élevé",
  "finance.cockpit.site.tasks": "\nTâches ouvertes",
  "finance.cockpit.site.queue": "\nFile d'attente en attente",
  "finance.cockpit.queue.title": "\nFile d'attente d'actions",
  "finance.cockpit.queue.description":
    "\nActifs classés par écart de valorisation, gravité du risque et pression de travail ou de document en aval.",
  "finance.cockpit.queue.summary": "\n{tasks} tâches actives • {documents} documents ouverts",
  "finance.cockpit.opportunity.purchaseOrdersTitle": "\nExposition aux bons de commande",
  "finance.cockpit.opportunity.purchaseOrdersDescription":
    "\n{count} bons de commande sont toujours ouverts pour des actifs financièrement exposés.",
  "finance.cockpit.opportunity.invoicesTitle": "\nExposition des collections",
  "finance.cockpit.opportunity.invoicesDescription":
    "\nLes factures {count} portent toujours une pression de recouvrement ouverte dans le portefeuille.",
  "finance.cockpit.opportunity.tasksTitle": "\nTravaux en retard",
  "finance.cockpit.opportunity.tasksDescription":
    "\nLes tâches de maintenance en retard amplifient la traînée de valorisation et le risque opérationnel.",
  "finance.cockpit.opportunity.dueSoonTitle": "\nSignaux à échéance prochainement",
  "finance.cockpit.opportunity.dueSoonDescription":
    "\nFenêtres de prévision proches de l’intervention et susceptibles d’affecter la planification des investissements.",
  "finance.overview.documentSummary": "\nOuvrir le flux de documents",
  "finance.overview.documentSummaryDescription":
    "\n{workOrders} bons de travail, {purchaseOrders} bons de commande et {invoices} factures sont actuellement ouverts.",
  "finance.cockpit.table.title": "\nPortefeuille financier",
  "finance.cockpit.table.description":
    "\nVue de portefeuille triable combinant valeur standard, valeur ajustée par l'IA, confiance et pression dans la file d'attente.",
  "finance.cockpit.table.live": "\nTable en direct",
  "finance.cockpit.table.asset": "\nActif",
  "finance.cockpit.table.signal": "\nSignal",
  "finance.cockpit.table.aiAdjusted": "\nAjusté par l'IA",
  "finance.cockpit.table.delta": "\nDelta",
  "finance.cockpit.table.confidence": "\nConfiance",
  "finance.cockpit.table.queue": "\nFile d'attente",
  "finance.cockpit.table.remainingLifeNone":
    "\nAucune prévision de durée de vie restante n'est associée à cet actif.",
  "finance.cockpit.table.remainingLifeValue": "\n{days} jours de vie restante",
  "finance.cockpit.table.activeTasksValue": "\n{count} tâches actives",
  "finance.cockpit.table.overdueTasksValue": "\n{count} en retard",
  "finance.cockpit.pdf.title": "\nRapport du cockpit financier",
  "finance.cockpit.pdf.subject":
    "\nExposition à la dépréciation ajustée par l'IA et variance du portefeuille",
  "finance.cockpit.pdf.scope": "\nPortée : {site} • {period}",
  "finance.cockpit.pdf.summary.adjustedExposure": "\nExposition ajustée : {value}",
  "finance.cockpit.pdf.summary.delta": "\nDelta de valorisation : {value} ({percent})",
  "finance.cockpit.pdf.summary.risk": "\nExposition à haut risque : {value} sur {count} actifs",
  "finance.cockpit.pdf.summary.queue":
    "\nTâches ouvertes : {tasks} • Documents ouverts : {documents}",
  "reports.title": "\nRapports",
  "reports.subtitle": "Rapports sur les actifs, résumés d'amortissement et export MOD",
  "reports.category.financial": "\nFinancier",
  "reports.category.financialDesc":
    "\nRapports sur l'amortissement, les évaluations et les risques financiers",
  "reports.category.operations": "\nActifs et opérations",
  "reports.category.operationsDesc":
    "\nInventaire des actifs, prévisions et analyses d'utilisation",
  "reports.category.executive": "\nExécutif",
  "reports.category.executiveDesc":
    "\nTableaux de bord exécutifs et indicateurs de performance clés",
  "reports.workspace.chat.categoryLine": "\n{label} : ensembles de données {count}",
  "reports.workspace.chat.noAiBrief": "\nAucun briefing IA actif n'est chargé.",
  "reports.workspace.chat.aiBriefActive":
    "\nBriefing actif : {title}. Public {audience}. Concentrez-vous sur {focusLabel}. Couverture {coverageScore} pour cent.",
  "reports.workspace.chat.journeyStep": "{title} ({statusPart}) → {targetLabel}",
  "reports.workspace.chat.stepStatusRecommended": "\n{status}, recommandé",
  "reports.workspace.chat.priorityDataset":
    "\nEnsemble de données d'analyse prioritaire : {title}. Santé {health}.",
  "reports.workspace.chat.noPinnedSources":
    "\nAucune action source associée n'est actuellement épinglée.",
  "reports.workspace.chat.pinnedSourcesPrefix": "\nActions sources associées :",
  "reports.workspace.chat.sourceLink": "{label} → {supporting}",
  "reports.workspace.chat.generalCoverage": "\ncouverture générale",
  "reports.workspace.chat.mission":
    "\nProchain mouvement recommandé : {title}. Cible {targetLabel}.",
  "reports.workspace.chat.builder":
    "\nPublic {audience}. Concentrez-vous sur {focus}. Sections {sections}.",
  "reports.workspace.chat.pageIntro": "\nEspace de travail Rapports.",
  "reports.workspace.chat.workflowInventory":
    "\nLa page comprend un navigateur de flux de travail, un centre de commande d'ensemble de données, un rail de commande IA, un générateur de rapports, un rail de modèles, un hub de données sources, un panneau d'exploration et une chronologie de rapport enregistrée.",
  "reports.workspace.chat.body":
    "{intro} Catégories : {categorySummary}. Jeux de données: {datasetSummary}. {prioritySummary} {sourceSummary} {missionSummary} {builderSummary} {aiSummary} Étapes du workflow : {journeySummary}. {workflowInventory}",
  "reports.workspace.heroEyebrow": "\nRapports d'entreprise",
  "reports.workspace.title": "\nCentre de commande de reporting de portefeuille",
  "reports.workspace.description":
    "\nDes packs de rapports prêts à l'emploi, des vues d'assurance opérationnelle et des analyses approfondies liées aux preuves, fournis via un espace de travail rendu par un serveur.",
  "reports.workspace.sectionTitle": "\nCatalogue de rapports",
  "reports.workspace.sectionDescription":
    "\nBasculez entre les packs Finance, Opérations et Exécutif sans quitter l'espace de travail de reporting.",
  "reports.workspace.datasetTitle": "\nCentre de commande de l'ensemble de données",
  "reports.workspace.datasetDescription":
    "\nExaminez les ensembles de données en direct sur les finances, les opérations et les dirigeants avant de générer un ensemble de rapports ou d'ouvrir des analyses approfondies.",
  "reports.workspace.aiBriefTitle": "\nBriefing IA",
  "reports.workspace.aiBriefDescription":
    "\nUn récit prêt à la décision, synthétisé à partir du pack actif, des preuves à l'appui et de l'état actuel du flux de travail.",
  "reports.workspace.aiBriefEmpty":
    "\nGénérez un pack de rapports pour créer un briefing sur l'IA destiné aux parties prenantes financières, opérationnelles ou exécutives.",
  "reports.workspace.launchpadTitle": "\nBarre de lancement de décision",
  "reports.workspace.launchpadDescription":
    "\nAccédez directement aux packs exécutifs, aux vues d'assurance opérationnelle ou aux revues de dépendances sans reconstruire le contexte.",
  "reports.workspace.launchpad.priorityDatasetTitle": "\nEnsemble de données prioritaire",
  "reports.workspace.launchpad.offlineSourcesTitle": "\nSources hors ligne",
  "reports.workspace.launchpad.reportingScopeTitle": "\nPérimètre de reporting",
  "reports.workspace.launchpad.openPack": "\nEmballage ouvert",
  "reports.workspace.launchpad.openWorkspace": "\nEspace de travail ouvert",
  "reports.workspace.launchpad.openEstateWorkspace": "\nEspace de travail ouvert",
  "reports.workspace.launchpad.openFinancePlanningWorkspace":
    "Espace de travail ouvert de planification financière",
  "reports.workspace.launchpad.lane.boardBadge": "\nPack de cartes",
  "reports.workspace.launchpad.lane.boardTitle": "\nPack d'intelligence décisionnelle stratégique",
  "reports.workspace.launchpad.lane.boardDescription":
    "\nLancez le pack destiné aux conseils d'administration pour les compromis sur le cycle de vie, la posture de risque et le séquençage des investissements.",
  "reports.workspace.launchpad.lane.operationsBadge": "\nPack opérationnel",
  "reports.workspace.launchpad.lane.operationsTitle": "\nPack photos opérationnel du domaine",
  "reports.workspace.launchpad.lane.operationsDescription":
    "\nOuvrez le pack d'assurance opérationnelle pour les bloqueurs de préparation, la pression de livraison FM et les signaux de contrôle du domaine.",
  "reports.workspace.launchpad.lane.dependenciesBadge": "\nExamen des dépendances",
  "reports.workspace.launchpad.lane.dependenciesTitle":
    "\nExamen des dépendances de l'intégration d'entreprise",
  "reports.workspace.launchpad.lane.dependenciesDescription":
    "\nPassez à la posture d'intégration lorsque les systèmes des partenaires financiers, RH, achats ou restauration façonnent la confiance dans les rapports.",
  "reports.workspace.activePackDescription":
    "\nLe package de rapports actif combine la narration de l'IA, les preuves de plusieurs ensembles de données et les sections prêtes à l'exportation dans un seul espace de travail rendu par le serveur.",
  "reports.workspace.mission.title": "\nProchain coup recommandé",
  "reports.workspace.mission.description":
    "\nL'espace de travail transforme l'état du portefeuille en une prochaine étape prête à prendre une décision afin que les opérateurs puissent préparer un dossier, ouvrir des preuves ou faire un bref exposé sans réinterpréter la page entière.",
  "reports.workspace.mission.progressTitle": "\nPréparation du flux de travail",
  "reports.workspace.mission.progressValue": "\n{completed}/{total} prêt",
  "reports.workspace.mission.progressDescription":
    "\n{completed} des {total} étapes du voyage sont prêtes. L'état de préparation actuel du flux de travail est de {percent}%.",
  "reports.workspace.mission.progressStatDescription":
    "\n{percent} % du flux de reporting est prêt à être transféré.",
  "reports.workspace.mission.nextStageTitle": "\nÉtape suivante",
  "reports.workspace.mission.priorityDatasetTitle": "\nEnsemble de données prioritaire",
  "reports.workspace.mission.dataTitle": "\nReconnecter la couverture de la source",
  "reports.workspace.mission.dataDescription":
    "\nLes ensembles de données {count} sont hors ligne. Commencez par {source} pour rétablir la confiance avant d'exporter.",
  "reports.workspace.mission.firstPackTitle": "\nAssemblez le premier pack",
  "reports.workspace.mission.firstPackDescription":
    "\nUtilisez {dataset} comme point de départ, puis les entrées du générateur de scène pour le public {audience}.",
  "reports.workspace.mission.drilldownTitle": "\nEnquêter sur {dataset}",
  "reports.workspace.mission.drilldownDescription":
    "\n{dataset} est marqué {health}. Open the drilldown evidence before changing the story.",
  "reports.workspace.mission.coverageTitle": "\nAugmenter la couverture du pack",
  "reports.workspace.mission.coverageDescription":
    "\n{pack} a actuellement une couverture de {score} %. Resserrez les sections, les détails ou le récit avant de le partager.",
  "reports.workspace.mission.briefTitle": "\nRédiger le briefing décisionnel",
  "reports.workspace.mission.briefDescription":
    "\n{pack} est structuré et prêt pour un résumé de l'IA, une passe de questions-réponses ou un briefing spécifique à un public.",
  "reports.workspace.mission.briefPrompt":
    "Rédigez un briefing prêt à prendre une décision pour le pack de rapports {pack}. Les sections actives sont {sections}. Résumez les principaux risques, expliquez les preuves les plus solides et préparez des questions de suivi probables.",
  "reports.workspace.journey.selectTitle": "\nSélectionnez la couverture",
  "reports.workspace.journey.selectDescription":
    "\nCommencez par l’ensemble de données le plus important : {dataset}. Confirmez s'il appartient au prochain pack.",
  "reports.workspace.journey.gotoDataset": "\nEnsembles de données ouverts",
  "reports.workspace.journey.askAi": "\nDemandez à AI",
  "reports.workspace.journey.changeTitle": "\nChangez l'histoire",
  "reports.workspace.journey.changeDescription":
    "\nExaminez la composition des sections actives avant de modifier le récit ou le cadrage des parties prenantes : {sections}.",
  "reports.workspace.journey.gotoActivePack": "\nOuvrir le pack actif",
  "reports.workspace.journey.changePrompt":
    "\nAidez-moi à modifier l'histoire actuelle du rapport. Les sections actives sont {sections}. Recommandez ce qui devrait être souligné, atténué ou réécrit.",
  "reports.workspace.journey.modifyTitle": "\nModifier le pack",
  "reports.workspace.journey.modifyDescription":
    "\nReciblez le rapport actuel pour l'audience {audience} sans perdre les signaux clés.",
  "reports.workspace.journey.gotoBuilder": "\nOuvrir le constructeur",
  "reports.workspace.journey.modifyPrompt":
    "\nAidez-moi à modifier le pack de rapports actuel pour l'audience {audience} en mettant l'accent sur {focus}. Recommander comment ajuster les entrées du constructeur.",
  "reports.workspace.journey.drilldownTitle": "\nExplorer la variance",
  "reports.workspace.journey.drilldownDescription":
    "\nPasser des fiches récapitulatives aux tableaux de preuves pour {dataset}.",
  "reports.workspace.journey.gotoDrilldown": "\nOuvrir l'exploration",
  "reports.workspace.journey.drilldownPrompt":
    "\nExaminez l’ensemble de données {dataset}. Il est actuellement marqué {health}. Expliquez les facteurs probables et les prochaines questions approfondies que je devrais poser.",
  "reports.workspace.journey.addDataTitle": "\nAjouter des données sources",
  "reports.workspace.journey.addDataDescription":
    "\nSi la confiance est faible, ouvrez {source} et ajoutez ou actualisez les preuves sous-jacentes.",
  "reports.workspace.journey.gotoSource": "\nSource ouverte",
  "reports.workspace.journey.addDataPrompt":
    "\nDites-moi quelles données supplémentaires je dois ajouter à partir de {source} pour améliorer le pack de rapports actif ({activePack}).",
  "reports.workspace.ai.explainPostureTitle": "\nExpliquer la posture actuelle",
  "reports.workspace.ai.explainPostureDescription":
    "\nRésumez les signaux les plus importants, en commençant par {dataset}.",
  "reports.workspace.ai.explainDriversTitle":
    "\nExpliquer les facteurs déterminants et la confiance",
  "reports.workspace.ai.explainDriversDescription":
    "\nRetracez les principaux facteurs déterminants, l'incertitude et les preuves à l'appui derrière {dataset}.",
  "reports.workspace.ai.explainDriversPrompt":
    "Pour l'ensemble de données {dataset}, expliquez les principaux facteurs déterminants, le niveau de confiance, l'incertitude et les preuves qui modifieraient le plus la décision. La santé est {health}. Le pack actif est {pack}. Les sections actives sont {sections}. Il existe {count} ensembles de données hors ligne. Vérifiez l'inventaire, l'arriéré des tâches, l'utilisation, le financement et les signaux d'approvisionnement ou d'élimination lorsque ces preuves existent.",
  "reports.workspace.ai.modifyPackTitle": "\nReciblez ce pack",
  "reports.workspace.ai.modifyPackDescription":
    "\nRecommandez comment le pack {pack} devrait changer pour un public ou un décideur différent.",
  "reports.workspace.ai.modifyPackPrompt":
    "\nAidez-moi à modifier le pack de rapports {pack}. Les sections actuelles sont {sections}. Recommandez ce qu'il faut ajouter, supprimer ou resserrer.",
  "reports.workspace.ai.comparePackTitle": "\nComparer avec la chronologie",
  "reports.workspace.ai.comparePackDescription":
    "\nVérifiez en quoi le pack actuel {pack} diffère de la chronologie enregistrée et ce qui a changé.",
  "reports.workspace.ai.comparePackPrompt":
    "\nComparez le pack de rapports actuel {pack} avec la chronologie des rapports enregistrée. Les sections actives sont {sections}. Mettez en évidence ce qui a changé, ce qui reste non résolu et ce qui mérite d'être approfondi avant de le partager.",
  "reports.workspace.ai.findGapsTitle": "\nTrouver les lacunes dans les données",
  "reports.workspace.ai.findGapsDescription":
    "\nIl existe {count} ensembles de données hors ligne qui affectent la fiabilité des rapports.",
  "reports.workspace.ai.findGapsPrompt":
    "\nIdentifiez les données manquantes ou obsolètes dans cet espace de travail de reporting. Il existe actuellement {count} ensembles de données hors ligne. Expliquez quels systèmes sources mettre à jour en premier.",
  "reports.workspace.ai.explainSelectionTitle": "\nExpliquez la sélection",
  "reports.workspace.ai.explainSelectionDescription":
    "\nUtilisez la sélection de texte actuelle pour demander une explication en langage simple dans le chat.",
  "reports.workspace.source.estate":
    "\nOuvrez l'espace de travail du domaine pour examiner l'état de préparation, les approbations de projet et la posture stratégique du programme derrière ce rapport.",
  "reports.workspace.source.assets":
    "\nOuvrez le registre des actifs pour ajouter ou corriger les enregistrements d'équipement à l'appui de ce rapport.",
  "reports.workspace.source.buildings":
    "\nOuvrez les bâtiments pour inspecter la hiérarchie des installations, la posture FM et les bloqueurs de préparation qui influencent ce rapport.",
  "reports.workspace.source.fleet":
    "\nFlotte ouverte pour inspecter l'utilisation, les temps d'arrêt, la pression de remplacement et la position opérationnelle des équipements derrière ce rapport.",
  "reports.workspace.source.financePlanning":
    "Planification financière ouverte pour inspecter la pression d'approbation, les scénarios d'investissement et les compromis en capital liés à ce rapport.",
  "reports.workspace.source.admin":
    "\nIntégrations d'administration ouvertes pour inspecter la santé du système partenaire et les effets de dépendance qui façonnent ce rapport.",
  "reports.workspace.source.sensors":
    "\nOuvrez des capteurs pour inspecter la couverture télémétrique, les lacunes de mise en service et les problèmes de qualité des appareils à l'origine de ce rapport.",
  "reports.workspace.source.tasks":
    "\nOuvrir les opérations de tâches pour valider le retard, la pression de maintenance et les actions en retard.",
  "reports.workspace.source.predictions":
    "\nOuvrez les opérations de prédiction pour examiner les fenêtres de défaillance, la gravité et la couverture du modèle.",
  "reports.workspace.source.finance":
    "\nFinancement ouvert pour valider l’exposition à la dépréciation, la dérive de valorisation et le risque de concentration.",
  "reports.workspace.source.utilisation":
    "\nUtilisation ouverte pour inspecter les preuves de charge, de saturation et d'occupation basées sur la télémétrie.",
  "reports.workspace.source.rfqs":
    "\nOuvrez l'espace de travail RFQ pour examiner la demande entrante, l'activité de devis et la préparation à la conversion.",
  "reports.workspace.source.customerOrders":
    "\nOuvrez les commandes des clients pour valider la progression du pipeline, les approbations et l'état de préparation de l'exécution.",
  "reports.workspace.source.workOrders":
    "\nOuvrez les ordres de travail pour inspecter le flux d'exécution, la posture SLA et la pression de livraison.",
  "reports.workspace.source.purchaseOrders":
    "\nOuvrez les bons de commande pour examiner les engagements des fournisseurs, les reçus et l'ancienneté.",
  "reports.workspace.source.invoices":
    "\nOuvrez les factures pour vérifier leur émission, l'état du recouvrement et les soldes en souffrance.",
  "reports.navigation.title": "\nNavigateur de flux de travail",
  "reports.navigation.description":
    "\nPassez de la sélection d'ensembles de données au regroupement des modifications, aux analyses approfondies et à l'examen des lacunes dans les données sans quitter l'espace de travail de création de rapports.",
  "reports.navigation.menuTitle": "\nSections",
  "reports.navigation.menuDescription":
    "\nAccédez directement à l'étape actuelle du flux de travail de création de rapports.",
  "reports.navigation.lanesTitle": "\nVoies de décision",
  "reports.navigation.lanesDescription":
    "\nBasculez entre les intentions de l'opérateur avant d'explorer les actions au niveau de la section ou de transmettre l'état actuel au chat.",
  "reports.navigation.cluster.decideTitle": "\nDécidez",
  "reports.navigation.cluster.decideDescription":
    "\nVérifiez la posture actuelle, le prochain mouvement recommandé et l'état de préparation de l'ensemble de données avant de changer de pack.",
  "reports.navigation.cluster.composeTitle": "\nComposer",
  "reports.navigation.cluster.composeDescription":
    "\nModifiez l'audience, l'orientation, les sections et la structure active du rapport avant de présenter ou d'exporter.",
  "reports.navigation.cluster.investigateTitle": "\nEnquêter",
  "reports.navigation.cluster.investigateDescription":
    "\nPassez du résumé aux preuves, comparez la chronologie et validez ce qui a changé.",
  "reports.navigation.cluster.improveTitle": "\nAméliorer",
  "reports.navigation.cluster.improveDescription":
    "Utilisez les systèmes de discussion et de source pour combler les lacunes, restaurer la couverture et renforcer la confiance.",
  "reports.navigation.cluster.itemCount": "\n{count} sections",
  "reports.navigation.stage.overview": "\nAperçu",
  "reports.navigation.stage.overviewDesc":
    "\nPosition du portefeuille, KPI récapitulatifs et briefing actif sur l'IA.",
  "reports.navigation.stage.journey": "\nVoyage",
  "reports.navigation.stage.journeyDesc":
    "\nÉtapes basées sur la décision pour sélectionner la couverture, changer d'orientation et explorer la variance.",
  "reports.navigation.stage.datasets": "\nEnsembles de données",
  "reports.navigation.stage.datasetsDesc":
    "\nEnsembles de données en direct sur les finances, les opérations et les dirigeants qui alimentent chaque pack de rapports.",
  "reports.navigation.stage.aiCopilot": "\nCopilote IA",
  "reports.navigation.stage.aiCopilotDesc":
    "\nInvites prédéfinies qui ouvrent le chat avec l'état actuel du rapport déjà joint.",
  "reports.navigation.stage.builder": "\nConstructeur",
  "reports.navigation.stage.builderDesc":
    "\nAudience, focus, plage de dates, sections et commandes narratives.",
  "reports.navigation.stage.templates": "\nModèles",
  "reports.navigation.stage.templatesDesc":
    "\nPacks de rapports intégrés et enregistrés pouvant être lancés dans l'espace de travail.",
  "reports.navigation.stage.sourceHub": "\nConcentrateur source",
  "reports.navigation.stage.sourceHubDesc":
    "\nSystèmes opérationnels qui peuvent ajouter des preuves, actualiser la couverture ou résoudre une lacune dans les données.",
  "reports.navigation.stage.drilldown": "\nAnalyse détaillée",
  "reports.navigation.stage.drilldownDesc":
    "\nDétails au niveau des lignes et signaux de concentration derrière le résumé actuel.",
  "reports.navigation.stage.history": "\nChronologie",
  "reports.navigation.stage.historyDesc":
    "\nHistorique des rapports enregistré à des fins de comparaison, de relecture et de gouvernance.",
  "reports.navigation.stage.activePack": "\nPack actif",
  "reports.navigation.stage.activePackDesc":
    "\nLe package de rapports actuel rendu par le serveur, les sections narratives et prêtes à l'exportation.",
  "reports.navigation.badge.live": "\nTous en direct",
  "reports.navigation.badge.ready": "\nPrêt",
  "reports.navigation.badge.offlineCount": "\n{count} hors ligne",
  "reports.navigation.badge.datasetCount": "\n{count} ensembles de données",
  "reports.navigation.badge.sectionCount": "\n{count} sections",
  "reports.navigation.badge.stepCount": "\n{count} étapes",
  "reports.navigation.badge.templateCount": "\n{count} paquets",
  "reports.navigation.badge.aiActionCount": "\n{count} invite",
  "reports.navigation.badge.sourceCount": "\n{count} sources",
  "reports.navigation.badge.savedCount": "\n{count} enregistré",
  "reports.navigation.badge.coverage": "\nCouverture {score}%",
  "reports.navigation.badge.focus": "\n{focus} focus",
  "reports.navigation.badge.attention": "Attention : {label}",
  "reports.navigation.status.recommended": "\nRecommandé",
  "reports.navigation.status.complete": "\nTerminé",
  "reports.navigation.status.attention": "\nAttention",
  "reports.navigation.status.ready": "\nPrêt",
  "reports.navigation.action.jump": "\nOuvrir la section",
  "reports.navigation.action.askAi": "\nDemandez à AI",
  "reports.navigation.action.loadBuilder": "\nConstructeur de scène",
  "reports.navigation.action.loadBuilderAria": "\nConstructeur de scènes de {name}",
  "reports.navigation.action.loadDrilldown": "\nCharger l'analyse détaillée",
  "reports.navigation.whyNow": "\nPourquoi maintenant",
  "reports.navigation.whyNowComplete":
    "\nCette étape est déjà dans un état utilisable. Rouvrez-le lorsque le pack, les preuves ou l'audience de décision changent.",
  "reports.navigation.whyNowAttention":
    "\nRésolvez ici la divergence signalée, la source obsolète ou les preuves manquantes avant de partager le pack.",
  "reports.navigation.whyNowReady":
    "\nCette étape est disponible lorsque vous devez affiner l'histoire, ouvrir des preuves ou ajouter des données à l'appui.",
  "reports.journey.title": "\nParcours décisionnel",
  "reports.journey.description":
    "\nUn workflow axé sur la finance pour sélectionner la couverture, changer d'orientation, modifier les packs, explorer les écarts et identifier les données manquantes.",
  "reports.ai.title": "\nCopilote IA",
  "reports.ai.description":
    "\nEnvoyez l'état actuel du rapport dans le chat avec des invites prédéfinies ou expliquez les lignes sélectionnées dans n'importe quelle table.",
  "reports.workspace.health.healthy": "En bonne santé",
  "reports.workspace.health.monitor": "\nMoniteur",
  "reports.workspace.health.attention": "\nA besoin d'attention",
  "reports.workspace.health.offline": "\nHors ligne",
  "reports.posture.title": "\nPosture de rapport",
  "reports.posture.description":
    "\nCouverture actuelle en direct des packs de rapports sur les finances, les opérations et le leadership.",
  "reports.generatedAt": "\nGénéré {date}",
  "reports.overview.reportCount": "\nPacks de rapports",
  "reports.overview.assetsCovered": "\nActifs couverts",
  "reports.overview.predictionsDue": "\nPrédictions dues",
  "reports.card.cadence.daily": "\nQuotidien",
  "reports.card.cadence.weekly": "\nHebdomadaire",
  "reports.card.cadence.monthly": "\nMensuel",
  "reports.card.metric.totalTypes": "\nTypes d'actifs",
  "reports.card.metric.criticalAssets": "\nActifs critiques",
  "reports.card.metric.criticalSignals": "\nSignaux critiques",
  "reports.types.depreciation": "\nRécapitulatif de l'amortissement",
  "reports.types.depreciationDesc":
    "\nValeur comptable, exposition ajustée par l'IA et principaux actifs par dépréciation",
  "reports.types.assets": "\nRésumé des actifs",
  "reports.types.assetsDesc": "\nActifs par type, état et répartition de la valeur comptable",
  "reports.types.predictions": "\nRésumé des prédictions",
  "reports.types.predictionsDesc":
    "\nPrédictions de défaillance et de dégradation par gravité et type",
  "reports.types.utilisation": "\nRésumé d'utilisation",
  "reports.types.utilisationDesc": "\nTaux d'utilisation des actifs et indicateurs d'occupation",
  "reports.types.executive": "\nRésumé exécutif",
  "reports.types.executiveDesc": "\nIndicateurs de performance clés et aperçu du système",
  "reports.types.estateOperational": "\nImage opérationnelle du domaine",
  "reports.types.estateOperationalDesc":
    "\nRapports intégrés destinés au DIO sur l'état, le cycle de vie, la préparation, les projets, les inspections et l'activité du personnel",
  "reports.types.strategicDecision": "\nIntelligence décisionnelle stratégique",
  "reports.types.strategicDecisionDesc":
    "\nAnalyse du cycle de vie, risque d'infrastructure, pression prédictive, analyse des performances et priorisation des investissements dans un seul pack de décision",
  "reports.types.workOrders": "\nDébit des ordres de travail",
  "reports.types.workOrdersDesc":
    "\nDébit opérationnel, productivité de la main-d'œuvre, pression des SLA et coûts d'atténuation sur les ordres de travail",
  "reports.types.purchaseOrders": "\nVieillissement des bons de commande",
  "reports.types.purchaseOrdersDesc":
    "\nPression de livraison des fournisseurs, délais de livraison et dépenses engagées sur les bons de commande",
  "reports.types.customerOrders": "\nEntonnoir de commande client",
  "reports.types.customerOrdersDesc":
    "\nProgression de la commande client depuis l'approbation jusqu'à l'exécution et l'achèvement",
  "reports.types.invoices": "\nÂge des factures",
  "reports.types.invoicesDesc":
    "\nSoldes impayés, état de recouvrement et pressions en souffrance sur les factures",
  "reports.types.rfqs": "\nConversion de la demande de prix",
  "reports.types.rfqsDesc":
    "\nQualification, devis, acceptation et conversion des demandes de prix en commandes clients",
  "reports.summary": "\nRésumé",
  "reports.topAssets": "\nPrincipaux atouts",
  "reports.asset": "\nActif",
  "reports.bookValue": "\nValeur comptable",
  "reports.severity": "\nGravité",
  "reports.severity.info": "\nInfos",
  "reports.severity.warning": "\nAvertissement",
  "reports.severity.critical": "\nCritique",
  "reports.severity.emergency": "\nUrgence",
  "reports.totalAssets": "\nActif total",
  "reports.totalBookValue": "\nValeur comptable totale",
  "reports.adjustedExposure": "\nExposition ajustée",
  "reports.byType": "\nPar type",
  "reports.byCondition": "\nPar état",
  "reports.bySeverity": "\nPar gravité",
  "reports.type": "\nTapez",
  "reports.condition": "\nÉtat",
  "reports.status": "\nStatut",
  "reports.columns.workOrder": "\nBon de travail",
  "reports.columns.activity": "\nActivité",
  "reports.columns.region": "\nRégion",
  "reports.columns.labourHours": "\nHeures de travail",
  "reports.columns.productivity": "\nProductivité",
  "reports.columns.cycleHours": "\nHeures de cycle",
  "reports.columns.cost": "\nCoût",
  "reports.columns.mitigation": "\nAtténuation",
  "reports.columns.purchaseOrder": "\nBon de commande",
  "reports.columns.vendor": "\nFournisseur",
  "reports.columns.ageDays": "\nÂge Jours",
  "reports.columns.order": "\nCommande",
  "reports.columns.customer": "\nClient",
  "reports.columns.workOrders": "\nBons de travail",
  "reports.columns.invoice": "\nFacture",
  "reports.columns.due": "\nDue",
  "reports.columns.rfq": "Demande de devis",
  "reports.columns.title": "\nTitre",
  "reports.count": "\nCompte",
  "reports.recentPredictions": "\nPrédictions récentes",
  "reports.remainingDays": "\nJours restants",
  "reports.confidence": "\nConfiance",
  "reports.avgUtilisation": "\nUtilisation moyenne",
  "reports.minMax": "\nMin – Max",
  "reports.topByUtilisation": "\nHaut par Utilisation",
  "reports.utilisation": "\nUtilisation",
  "reports.metric": "\nMétrique",
  "reports.value": "\nValeur",
  "reports.overdueMaintenance": "\nMaintenance en retard",
  "reports.openDocuments": "\nDocuments ouverts",
  "reports.workOrders.open": "\nBons de travail ouverts",
  "reports.workOrders.reviewQueue": "\nFile d'attente de révision",
  "reports.workOrders.completed": "\nBons de travail terminés",
  "reports.workOrders.breached": "\nSLA violé",
  "reports.workOrders.averageCycle": "\nCycle moyen",
  "reports.workOrders.productivity": "\nProductivité moyenne",
  "reports.workOrders.mitigationCost": "\nCoût d'atténuation",
  "reports.workOrders.mitigationHours": "Heures d'atténuation",
  "reports.workOrders.regionWatch": "\nRégion sous surveillance",
  "reports.workOrders.improvementFocus": "\nObjectif d'amélioration",
  "reports.workOrders.mitigationActive": "\nAtténuation active",
  "reports.workOrders.mitigationClear": "\nSur la cible",
  "reports.estate.readiness": "\nÉtat de préparation des capacités",
  "reports.estate.rangeReadiness": "\nDisponibilité de la portée",
  "reports.estate.criticalSignals": "\nSignaux critiques",
  "reports.estate.approvalPressure": "\nPression d'approbation",
  "reports.estate.approvalDelays": "\nApprobations retardées",
  "reports.estate.labourHours": "\nHeures de travail enregistrées",
  "reports.strategy.priorityFocus": "\nObjectif prioritaire",
  "reports.strategy.lifecyclePressure": "\nPression du cycle de vie",
  "reports.strategy.infrastructureRisk": "\nRisque lié aux infrastructures",
  "reports.strategy.predictiveSignals": "\nSignaux prédictifs",
  "reports.strategy.investmentPressure": "\nPression d'investissement",
  "reports.strategic.focus.lifecycle": "\nRenouvellement du cycle de vie",
  "reports.strategic.focus.infrastructure": "\nRisque lié aux infrastructures",
  "reports.strategic.focus.predictive": "\nMaintenance prédictive",
  "reports.strategic.focus.performance": "\nPerformance opérationnelle",
  "reports.strategic.focus.investment": "\nPriorisation des investissements",
  "reports.purchaseOrders.awaitingReceipt": "\nEn attente de réception",
  "reports.purchaseOrders.overdue": "\nBons de commande en retard",
  "reports.purchaseOrders.avgLeadTime": "\nDélai moyen",
  "reports.purchaseOrders.committed": "\nDépenses engagées",
  "reports.customerOrders.pending": "\nEn attente d'approbation",
  "reports.customerOrders.confirmed": "\nCommandes confirmées",
  "reports.customerOrders.fulfilment": "\nEn accomplissement",
  "reports.customerOrders.converted": "\nConverti à partir de RFQ",
  "reports.customerOrders.booked": "\nValeur réservée",
  "reports.invoices.outstanding": "\nMontant restant dû",
  "reports.invoices.overdue": "\nFactures en souffrance",
  "reports.invoices.collected": "\nArgent collecté",
  "reports.invoices.partial": "\nPartiellement payé",
  "reports.rfqs.submitted": "\nDemandes de prix soumises",
  "reports.rfqs.quoted": "\nAppels d'offres cités",
  "reports.rfqs.accepted": "\nAppels d'offres acceptés",
  "reports.rfqs.converted": "\nAppels d'offres convertis",
  "reports.rfqs.averageBudget": "\nBudget moyen",
  "reports.rfqs.pipeline": "\nPipeline actif",
  "reports.downloadPdf": "\nTélécharger le PDF",
  "reports.viewAnalysis": "\nVoir l'analyse",
  "reports.analysis": "\nAnalyse des données",
  "reports.analysisLoading": "\nChargement de l'analyse…",
  "reports.ai.askAi": "\nDemandez à AI",
  "reports.ai.askAiMissionAria": "\nInterrogez l'IA sur le prochain mouvement recommandé",
  "reports.ai.askAiTemplateAria": "\nInterrogez AI à propos du modèle {name}",
  "reports.ai.askAiPackAria": "\nInterrogez AI à propos du pack de rapports {name}",
  "reports.ai.askAiSectionAria": "\nInterrogez AI à propos de la section {name}",
  "reports.ai.askAiDrilldownAria": "\nInterrogez l'IA à propos de l'exploration {name}",
  "reports.insights": "\nAperçus",
  "reports.insights.depreciationCritical":
    "\n{count} prédiction(s) critique(s) affectant la valorisation",
  "reports.insights.depreciationHealthy": "\nAucune prédiction critique affectant la valorisation",
  "reports.insights.depreciationTotal": "\n{count} actifs dans le périmètre d'amortissement",
  "reports.insights.topAssetType": "\n{type} : {count} actifs",
  "reports.insights.noAssets": "\nAucun élément dans le système",
  "reports.insights.criticalAssets": "\n{count} actif(s) dans un état critique",
  "reports.insights.noCritical": "\nAucun actif dans un état critique",
  "reports.insights.predictionsDue": "\n{count} prédiction(s) attendue(s) dans {days} jours",
  "reports.insights.noPredictionsDue": "\nAucune prédiction due dans {days} jours",
  "reports.insights.criticalPredictions": "\n{count} prédiction(s) critique/urgence",
  "reports.insights.highUtilisation": "\nUtilisation élevée – envisagez une révision des capacités",
  "reports.insights.utilisationNormal": "\nUtilisation dans la plage normale",
  "reports.insights.utilisationMonitor":
    "\nL'utilisation est en dehors de la bande préférée et doit être surveillée",
  "reports.insights.assetCount": "\n{count} actifs suivis",
  "reports.insights.overdueTasks": "\n{count} tâche(s) de maintenance en retard",
  "reports.insights.noOverdue": "\nAucune tâche de maintenance en retard",
  "reports.insights.workOrders.breached":
    "\n{count} ordre(s) de travail sont actuellement en dehors du SLA.",
  "reports.insights.workOrders.noBreach":
    "\nAucun ordre de travail échantillonné n'est en dehors du SLA.",
  "reports.insights.workOrders.avgCycle":
    "\nLe cycle d'achèvement moyen est de {hours} heures pour les achèvements récents.",
  "reports.insights.workOrders.noCompleted":
    "\nAucun ordre de travail terminé n'est disponible pour l'analyse du débit.",
  "reports.insights.workOrders.productivity":
    "\nLa productivité moyenne est de {rate} unités de production par heure de travail sur {hours} heures enregistrées.",
  "reports.insights.workOrders.mitigationCost":
    "{count} ordres de travail violés entraînent actuellement {cost} d'atténuation sur {hours} heures de travail.",
  "reports.insights.workOrders.noMitigation":
    "\nAucun ordre de travail enfreint ne comporte actuellement de main d'œuvre d'atténuation suivie.",
  "reports.insights.workOrders.activityWatch":
    "\n{activity} est le type de travail le moins productif avec {rate} unités de production par heure de travail.",
  "reports.insights.workOrders.regionWatch":
    "\n{region} est la charge de travail régionale échantillonnée la plus faible à {rate} unités de production par heure de travail.",
  "reports.insights.workOrders.improvementFocus":
    "\nPrioriser les actions d'amélioration des performances autour de {focus}.",
  "reports.insights.workOrders.noImprovementFocus":
    "\nAucun objectif d’amélioration ne ressort de l’échantillon actuel d’ordres de travail.",
  "reports.insights.estateOperational.infrastructureRisk":
    "\n{count} les signaux de risque immobilier sont actifs dans les données d'état, d'inspection et de prévision.",
  "reports.insights.estateOperational.infrastructureRiskClear":
    "\nAucun signal de risque successoral critique n’est actif dans l’ensemble du patrimoine intégré.",
  "reports.insights.estateOperational.readinessGap":
    "\n{ready} des {total} capacités suivies sont entièrement prêtes, avec {constrainedSites} site(s) contraint(s) affectant toujours l'état de préparation.",
  "reports.insights.estateOperational.readinessClear":
    "\nLes capacités suivies sont actuellement prêtes à être rapportées sans contraintes au niveau du domaine.",
  "reports.insights.estateOperational.approvalDelay":
    "\nL'approbation du ou des projets {delayed} est retardée, et {queue} projet(s) supplémentaire(s) sont toujours en file d'attente.",
  "reports.insights.estateOperational.approvalQueue":
    "\n{queue} approbation(s) de projet restent dans la file d'attente actuelle.",
  "reports.insights.estateOperational.approvalClear":
    "\nAucune approbation de projet n'est actuellement retardée ou mise en file d'attente.",
  "reports.insights.estateOperational.inspectionBacklog":
    "\n{count} article(s) d'inspection sont en retard tandis que {hours} heures de travail sont enregistrées par rapport à l'activité de livraison en cours.",
  "reports.insights.estateOperational.workforceSignal":
    "\n{hours} heures de travail sont actuellement enregistrées pour l'activité de livraison opérationnelle.",
  "reports.insights.estateOperational.investmentPressure":
    "\n{count} signal(s) de pression d’investissement sont actifs dans {projects} projets et {initiatives} initiative(s) stratégique(s).",
  "reports.insights.estateOperational.investmentStable":
    "\nLes initiatives stratégiques restent enregistrées sans signaux supplémentaires de pression sur les investissements au-delà de la référence actuelle de {initiatives}.",
  "reports.insights.strategicDecision.lifecyclePressure":
    "\n{count} actifs de surveillance du cycle de vie sont actifs, représentant {rate} % de la base actuelle du patrimoine.",
  "reports.insights.strategicDecision.lifecycleStable":
    "\nAucun actif de surveillance du cycle de vie ne fausse actuellement la posture d’investissement stratégique.",
  "reports.insights.strategicDecision.infrastructureRisk":
    "\n{count} signal(s) de risque d'infrastructure sont actifs, équivalents à {rate} % de la base actuelle du patrimoine.",
  "reports.insights.strategicDecision.infrastructureRiskClear":
    "Les signaux de risque liés aux infrastructures sont actuellement clairs dans l’ensemble du tableau stratégique.",
  "reports.insights.strategicDecision.predictiveLoad":
    "\n{count} signal(s) de maintenance prédictive sont actifs, y compris {critical} prédiction(s) critique(s), avec {rate} % des actifs à échéance prochaine.",
  "reports.insights.strategicDecision.predictiveClear":
    "\nLes signaux de maintenance prédictive sont actuellement clairs dans l’ensemble du domaine surveillé.",
  "reports.insights.strategicDecision.performanceSignal":
    "\nLes performances opérationnelles restent façonnées par {focus}, avec une préparation à {readiness} % et une productivité à {productivity} unités de production par heure de travail.",
  "reports.insights.strategicDecision.performanceStable":
    "\nLes performances opérationnelles restent stables avec une disponibilité à {readiness} % et une productivité à {productivity} unités de sortie par heure de travail.",
  "reports.insights.strategicDecision.investmentPriority":
    "\nLa priorisation des investissements est actuellement dirigée par {focus}, avec {count} signal(s) lié(s) et {delayed} approbation(s) retardée(s) affectant toujours la file d'attente.",
  "reports.insights.strategicDecision.investmentStable":
    "\nLa posture d'investissement stratégique est stable, {focus} restant la principale zone de surveillance plutôt qu'une voie de pression active.",
  "reports.insights.purchaseOrders.overdue":
    "\n{count} les bons de commande ont dépassé leur date d'échéance.",
  "reports.insights.purchaseOrders.noOverdue":
    "\nAucun bon de commande n'est actuellement en retard.",
  "reports.insights.purchaseOrders.awaitingReceipt":
    "\nLes bons de commande {count} sont toujours en attente de réception complète.",
  "reports.insights.purchaseOrders.avgLeadTime":
    "\nLe délai de livraison moyen des fournisseurs est de {days} jours.",
  "reports.insights.customerOrders.fulfilment":
    "\n{count} commande(s) client est actuellement en cours d'exécution.",
  "reports.insights.customerOrders.noFulfilment":
    "\nAucune commande client n'est actuellement en cours d'exécution.",
  "reports.insights.customerOrders.converted":
    "\n{count} commande(s) client ont été créées à partir des appels d'offres acceptés.",
  "reports.insights.invoices.overdue":
    "\nLes factures {count} sont en retard et nécessitent un suivi du recouvrement.",
  "reports.insights.invoices.noOverdue": "\nAucune facture n'est actuellement en retard.",
  "reports.insights.invoices.paymentMix":
    "\n{paidCount} facture(s) sont entièrement payées et {partialCount} restent partiellement payées.",
  "reports.insights.rfqs.converted": "\n{count} RFQ(s) ont été convertis en commandes client.",
  "reports.insights.rfqs.pipeline":
    "\n{count} RFQ(s) restent actifs dans les étapes de qualification ou de devis.",
  "reports.insights.rfqs.noPipeline":
    "\nAucune demande d'offre n'est actuellement active dans le pipeline commercial.",
  "reports.unknownReportType": "\nType de rapport inconnu",
  "reports.generateFailed": "\nÉchec de la génération du rapport",
  "reports.dataset.prompt":
    "Examinez l’ensemble de données {dataset}. La santé est {health}. Indicateurs clés : {metrics}. Aperçus : {insights}. Expliquez ce qui a changé, pourquoi cela est important et si cet ensemble de données appartient au pack de rapports actuel.",
  "reports.pdfAuthor": "{brandName}",
  "reports.rawMetrics": "\nMétriques brutes",
  "reports.rawMetricsLower": "\nmétriques brutes",
  "reports.viewAnalysisAria": "\nAfficher l'analyse pour {label}",
  "reports.journey.prompt.select":
    "\nEn fonction de l'espace de travail de reporting actuel et des sections sélectionnées ({sections}), quels ensembles de données dois-je inclure dans le prochain pack et pourquoi ?",
  "reports.journey.prompt.change":
    "\nAidez-moi à modifier le rapport actuel pour l'audience {audience} en mettant l'accent sur {focus}. Recommandez comment ajuster l'audience, la cible ou la plage de dates et expliquez les compromis.",
  "reports.journey.prompt.modify":
    "\nConsultez le pack de rapports actuel avec les sections {sections}. Suggérer des modifications concrètes au récit, à la composition des sections et à l'ordre.",
  "reports.journey.prompt.drilldown":
    "\nExaminez l’ensemble de données {dataset}. Il est actuellement marqué {health}. Expliquez les facteurs probables et les prochaines questions approfondies que je devrais poser.",
  "reports.journey.prompt.drilldownUnavailable":
    "\nAucun ensemble de données n'est actuellement prioritaire pour l'exploration.",
  "reports.journey.prompt.drilldownFallback":
    "\nIdentifiez la zone de rapport suivante qui mérite une analyse approfondie et expliquez quelles preuves je dois inspecter en premier.",
  "reports.journey.prompt.addData":
    "\nIdentifiez les données manquantes ou obsolètes dans cet espace de travail de reporting. Il existe actuellement {offlineCount} ensembles de données hors ligne. Expliquez quelles données ajouter ou actualiser ensuite.",
  "reports.journey.prompt.addDataSource":
    "\nDites-moi quelles preuves supplémentaires je devrais ajouter ou actualiser dans {source} pour améliorer ce pack de rapports.",
  "reports.ai.prompt.explainPosture":
    "\nExpliquez la posture actuelle en matière de reporting, les signaux les plus importants et sur quoi un lecteur financier ou exécutif devrait se concentrer ensuite.",
  "reports.ai.prompt.modifyPack":
    "\nAidez-moi à modifier le pack de rapports actuel pour l'audience {audience} en mettant l'accent sur {focus}. Les sections actuelles sont {sections}. Recommandez ce qu'il faut ajouter, supprimer ou resserrer.",
  "reports.ai.prompt.findGaps":
    "\nIdentifiez la couverture manquante ou les données obsolètes dans cet espace de travail de création de rapports et expliquez quels ensembles de données, filtres ou actualisations supplémentaires amélioreraient la confiance.",
  "reports.ai.prompt.findGapsWithSource":
    "\nIdentifiez la couverture manquante ou les données obsolètes dans cet espace de travail de création de rapports. Commencez par {source} et expliquez comment cela améliorerait le pack actif {pack}.",
  "reports.ai.prompt.sectionAnalysis":
    "Analysez la section {section}. Expliquez les signaux clés, les valeurs aberrantes et les prochaines questions qu'un opérateur devrait poser.",
  "reports.templates.builtin.financeControl": "\nPack de contrôle financier",
  "reports.templates.builtin.financeControlDesc":
    "\nExposition à la dépréciation et résumé pour la surveillance financière",
  "reports.templates.builtin.riskWatch": "\nPack de surveillance des risques",
  "reports.templates.builtin.riskWatchDesc":
    "\nPrédictions, utilisation et résumé pour les opérations",
  "reports.templates.builtin.boardPack": "\nPack de cartes",
  "reports.templates.builtin.boardPackDesc":
    "\nRésumé analytique avec amortissement et répartition des actifs pour le leadership",
  "reports.templates.builtin.fmGovernance": "\nPack Gouvernance FM",
  "reports.templates.builtin.fmGovernanceDesc":
    "\nPosture de gouvernance FM, débit des ordres de travail et intelligence décisionnelle stratégique pour l'examen des risques",
  "reports.templates.builtin.stewardship": "\nPack d'intendance",
  "reports.templates.builtin.stewardshipDesc":
    "\nPosture de gestion successorale avec couverture des actifs et intelligence décisionnelle stratégique pour l’examen opérationnel",
  "reports.templates.builtin.cateringEss": "\nRestauration / Pack ESS",
  "reports.templates.builtin.cateringEssDesc":
    "\nAperçu opérationnel du domaine, débit de livraison et posture de la direction pour la restauration et la supervision de l'ESS",
  "reports.templates.builtin.programmeControls": "\nPack de contrôles de programme",
  "reports.templates.builtin.programmeControlsDesc":
    "\nPosture de la direction, signaux de livraison du patrimoine et intelligence décisionnelle stratégique pour la gouvernance du programme",
  "reports.builder.eyebrow": "\nAtelier de construction",
  "reports.builder.title": "\nGénérateur de rapports personnalisés",
  "reports.builder.description":
    "\nAssemblez des packs de rapports interfonctionnels avec des récits d'IA, des modèles enregistrés et des analyses plus approfondies.",
  "reports.builder.aiTitle": "\nCopilote constructeur",
  "reports.builder.aiDescription":
    "\nUtilisez le chat pour tester la pression du mixage des sections, du cadrage de l'audience et des conseils du créateur avant la génération.",
  "reports.builder.ai.planTitle": "\nRecommander la section mix",
  "reports.builder.ai.planDescription":
    "\nPassez en revue l'audience actuelle, la priorité et les sections sélectionnées avant de régénérer le pack.",
  "reports.builder.ai.planPrompt":
    "\nRecommandez la meilleure combinaison de sections pour un rapport destiné au public {audience} et axé sur {focus}. Les sections actuellement sélectionnées sont {sections}. Expliquez ce qu'il faut conserver, supprimer ou ajouter avant la génération.",
  "reports.builder.ai.guidanceTitle": "\nProjet de guide pour l'opérateur",
  "reports.builder.ai.guidanceDescription":
    "\nTransformez la configuration actuelle du générateur en conseils concis que l'opérateur peut appliquer ou coller dans le formulaire.",
  "reports.builder.ai.guidancePrompt":
    "Rédigez des directives de création concises pour un rapport destiné au public {audience} et axé sur {focus}. Les sections sélectionnées sont {sections}. Le récit est {includeNarrative}. Les analyses sont {includeDrilldowns}. Suggérez le texte d'orientation final et expliquez pourquoi il améliorera le pack.",
  "reports.builder.controlsTitle": "\nParamètres de construction",
  "reports.builder.controlsDescription":
    "\nDéfinissez le public, l'objectif, la couverture et les conseils de l'opérateur pour le pack de rapports généré.",
  "reports.builder.reportTitleLabel": "\nTitre du rapport",
  "reports.builder.reportTitleHint": "\nUtilisé comme titre pour le pack de rapports généré.",
  "reports.builder.audienceLabel": "\nPublic",
  "reports.builder.audience.risk": "\nRisque et assurance",
  "reports.builder.focusLabel": "\nConcentrez-vous",
  "reports.builder.sectionsLabel": "\nSections",
  "reports.builder.sectionsHint": "\nSélectionnez au moins une section de rapport à inclure.",
  "reports.builder.includeNarrative": "\nGénérer un résumé narratif",
  "reports.builder.includeNarrativeHint":
    "\nUtilise le fournisseur d'IA configuré et revient à un résumé déterministe lorsqu'il n'est pas disponible.",
  "reports.builder.includeDrilldowns": "\nInclure les analyses détaillées",
  "reports.builder.includeDrilldownsHint":
    "\nJoignez des détails opérationnels au niveau du tableau et des mesures plus approfondies à chaque section sélectionnée.",
  "reports.builder.guidanceLabel": "\nConseils",
  "reports.builder.guidanceHint":
    "\nDes conseils facultatifs qui façonnent le récit et l'accent générés.",
  "reports.builder.seed.financePlanning.source": "\nPlanification financière",
  "reports.builder.seed.financePlanning.alert":
    "\nSemé à partir de {source} : {title}. Vérifiez la portée héritée avant de générer le pack.",
  "reports.builder.seed.financePlanning.title": "\nTransfert de la planification financière",
  "reports.builder.seed.financePlanning.description":
    "\nCette session de création a été préchargée à partir d'un scénario financier afin que le pack de rapports puisse réutiliser le contexte de planification approuvé.",
  "reports.builder.seed.financePlanning.scopeLabel": "\nPortée",
  "reports.builder.seed.financePlanning.horizonLabel": "\nHorizon",
  "reports.builder.seed.financePlanning.horizonValue": "\n{months} mois",
  "reports.builder.seed.financePlanning.guidanceLabel": "\nConseils hérités",
  "reports.builder.generate": "\nGénérer un pack de rapports",
  "reports.builder.loadDataset": "\nCharger l'ensemble de données",
  "reports.builder.loadDatasetAria": "\nCharger l'ensemble de données {name} dans le générateur",
  "reports.builder.loadTemplate": "\nCharger le modèle",
  "reports.builder.loadTemplateAria": "\nCharger le modèle {name} dans le constructeur",
  "reports.builder.loadCurrentPack": "\nPack de courant de charge",
  "reports.builder.loadCurrentPackAria": "\nCharger le pack actuel {name} dans le constructeur",
  "reports.builder.loadSection": "\nSection de charge",
  "reports.builder.loadSectionAria": "\nCharger la section {name} dans le constructeur",
  "reports.builder.loadDrilldown": "\nCharger l'analyse détaillée",
  "reports.builder.loadDrilldownAria": "\nCharger l'exploration {name} dans le générateur",
  "reports.builder.loadedDataset":
    "\nGénérateur mis à jour à partir de l'ensemble de données {name}.",
  "reports.builder.loadedTemplate": "\nGénérateur mis à jour à partir du modèle {name}.",
  "reports.builder.loadedSection": "\nConstructeur concentré sur la section {name}.",
  "reports.builder.loadedPack": "\nGénérateur mis à jour à partir du pack de rapports {name}.",
  "reports.builder.audience.finance": "\nFinances",
  "reports.builder.audience.operations": "\nOpérations",
  "reports.builder.audience.executive": "\nExécutif",
  "reports.templates.saveTitle": "\nEnregistrer le constructeur actuel en tant que modèle",
  "reports.templates.saveDescription":
    "\nConserver les options actuelles de combinaison de sections, d'audience et de rapport sous la forme d'un pack réutilisable.",
  "reports.templates.nameLabel": "\nNom du modèle",
  "reports.templates.descriptionLabel": "\nDescription",
  "reports.templates.saveAction": "\nEnregistrer le modèle",
  "reports.templates.error.invalid":
    "\nModèle invalide. Le nom et au moins une section sont requis.",
  "reports.templates.error.saveFailed":
    "\nÉchec de l'enregistrement du modèle. Veuillez réessayer.",
  "reports.builder.focus.financial": "\nFinancier",
  "reports.builder.focus.operations": "\nOpérations",
  "reports.builder.focus.risk": "\nRisque",
  "reports.builder.focus.executive": "\nExécutif",
  "reports.custom.sectionsTitle": "Sections disponibles",
  "reports.custom.previewTitle": "\nEspace de travail de rapport actif",
  "reports.custom.previewDescription":
    "\nPackage de rapports rendus par le serveur avec des données narratives, d'analyse de section et d'exploration en direct.",
  "reports.custom.error.invalid":
    "\nSélectionnez au moins une section de rapport pour générer un pack personnalisé.",
  "reports.custom.generatedTitleSingle": "Pour {audience} : {primarySection}",
  "reports.custom.generatedTitlePair": "Pour {audience} : {primarySection} et {secondarySection}",
  "reports.custom.fallbackNarrativeIntro":
    "\nLa couverture couvre {count} sections pour le public {audience} avec un accent sur {focus}.",
  "reports.custom.narrativeDisabled":
    "\nLa synthèse narrative est désactivée pour cette version de rapport.",
  "reports.custom.workspaceEmpty":
    "\nExécutez un modèle ou choisissez des sections pour assembler un package de rapports en direct.",
  "reports.custom.fallbackNarrativeGuidance": "\nConseils à l'opérateur : {guidance}.",
  "reports.custom.section.depreciation":
    "\nL’exposition à la dépréciation s’élève à {adjustedExposure} pour {totalAssets} actifs.",
  "reports.custom.section.assets":
    "\n{criticalAssets} actifs critiques sont répartis entre {totalTypes} types d'actifs suivis.",
  "reports.custom.section.predictions":
    "\nLes fenêtres de prédiction {predictionsDue} sont attendues bientôt, y compris les signaux critiques {criticalCount}.",
  "reports.custom.section.utilisation":
    "\nL'utilisation moyenne est de {utilisationRate} sur {assetCount} actifs actifs.",
  "reports.custom.section.executive":
    "\n{activeTasks} tâches ouvertes et {openDocuments} documents opérationnels restent actifs dans les workflows de livraison et de revenus.",
  "reports.custom.section.estateOperational":
    "\nLes signaux de risque immobilier {criticalSignals} restent actifs, l'état de préparation des capacités est {readiness} et les approbations de projet {delayed} sont retardées.",
  "reports.custom.section.strategicDecision":
    "\nL'intelligence décisionnelle stratégique est actuellement dirigée par {focus}, avec {riskCount} signal(s) de risque d'infrastructure et {investmentCount} signal(s) de pression d'investissement.",
  "reports.custom.section.workOrders":
    "\n{breachedCount} ordres de travail sont en dehors du SLA, la productivité moyenne est de {productivityRate} et le coût d'atténuation s'élève à {mitigationCost}.",
  "reports.custom.section.purchaseOrders":
    "\n{overdueCount} bons de commande sont en retard et le délai de livraison moyen est de {avgLeadDays} jours.",
  "reports.custom.section.customerOrders":
    "\n{fulfilmentCount} commandes clients sont en cours d'exécution et {convertedCount} proviennent d'appels d'offres.",
  "reports.custom.section.invoices":
    "\nLes factures {overdueCount} sont en retard et {outstandingAmount} toujours impayées.",
  "reports.custom.section.rfqs":
    "\n{convertedCount} RFQ ont été converties en commandes et {quotedCount} restent au stade du devis.",
  "reports.drilldown.band.overloaded": "\nSurchargé",
  "reports.drilldown.band.watch": "\nRegarder",
  "reports.drilldown.band.stable": "\nStable",
  "reports.drilldown.depreciationTitle": "\nDétail de l'exposition à la dépréciation",
  "reports.drilldown.depreciationDescription":
    "\nConcentration de valeur maximale, état actuel et derniers signaux de gravité pour les actifs sensibles à la dépréciation.",
  "reports.drilldown.assetsTitle": "\nDétail de la composition des actifs",
  "reports.drilldown.assetsDescription":
    "\nComposition du portefeuille par site, type, état et concentration actuelle de la valeur comptable.",
  "reports.drilldown.predictionsTitle": "Analyse détaillée de la pression de prévision",
  "reports.drilldown.predictionsDescription":
    "\nÉvénements de prédiction récents avec gravité, confiance et contexte de la durée de vie restante.",
  "reports.drilldown.utilisationTitle": "\nAnalyse détaillée de l'intensité d'utilisation",
  "reports.drilldown.utilisationDescription":
    "\nPosition d'utilisation alignée sur l'espace de travail dans l'ensemble du portefeuille actuel avec le contexte du site, du type d'actif et de la charge actuelle.",
  "reports.drilldown.maxUtilisation": "\nUtilisation maximale",
  "reports.drilldown.bandTitle": "\nPosture",
  "reports.drilldown.executiveTitle": "\nAnalyse détaillée de la pression exécutive",
  "reports.drilldown.executiveDescription":
    "\nSignaux de pression opérationnelle couvrant le retard de maintenance, l’exposition aux prévisions, le flux de documents et la valeur du portefeuille.",
  "reports.drilldown.estateOperationalTitle": "\nDétail opérationnel du domaine",
  "reports.drilldown.estateOperationalDescription":
    "\nPosture intégrée au niveau du domaine en termes d'état, de cycle de vie, de préparation, d'inspections, d'approbations de projet et de pression de livraison.",
  "reports.drilldown.strategicDecisionTitle":
    "\nAnalyse approfondie de l'intelligence décisionnelle stratégique",
  "reports.drilldown.strategicDecisionDescription":
    "\nSuivez l'exposition au cycle de vie, les risques liés à l'infrastructure, la demande prédictive, les performances opérationnelles et l'orientation des investissements à partir d'un seul pack d'intelligence stratégique.",
  "reports.drilldown.workOrdersTitle": "\nAnalyse détaillée du débit des ordres de travail",
  "reports.drilldown.workOrdersDescription":
    "\nOrdres de travail récents avec portée régionale, répartition des activités, état de productivité, statut d'atténuation et coût d'exécution suivi.",
  "reports.drilldown.purchaseOrdersTitle": "\nAnalyse chronologique des bons de commande",
  "reports.drilldown.purchaseOrdersDescription":
    "\nBons de commande récents avec propriété du fournisseur, ancienneté, état de livraison et valeur commerciale engagée.",
  "reports.drilldown.customerOrdersTitle":
    "\nAnalyse détaillée de l'entonnoir de commande des clients",
  "reports.drilldown.customerOrdersDescription":
    "\nCommandes clients récentes avec statut d'exécution, volume d'ordres de travail lié et valeur réservée.",
  "reports.drilldown.invoicesTitle": "\nAnalyse de l'ancienneté des factures",
  "reports.drilldown.invoicesDescription":
    "\nFactures récentes avec propriété du client, état d'échéance, valeur impayée et mouvement de paiement.",
  "reports.drilldown.rfqsTitle": "\nAnalyse détaillée de la conversion de l'appel d'offres",
  "reports.drilldown.rfqsDescription":
    "\nAppels d'offres récents avec étape commerciale, budget déclaré et visibilité sur la conversion des commandes en aval.",
  "reports.drilldown.empty.workOrders":
    "\nAucun ordre de travail n'est disponible pour l'exploration.",
  "reports.drilldown.empty.estateOperational":
    "\nAucun signal d'image opérationnel du domaine n'est disponible pour l'exploration.",
  "reports.drilldown.empty.strategicDecision":
    "\nAucun signal d'intelligence décisionnelle stratégique n'est disponible pour l'exploration.",
  "reports.drilldown.empty.purchaseOrders":
    "\nAucun bon de commande n'est disponible pour l'exploration.",
  "reports.drilldown.empty.customerOrders":
    "\nAucune commande client n'est disponible pour l'exploration.",
  "reports.drilldown.empty.invoices": "\nAucune facture n'est disponible pour l'exploration.",
  "reports.drilldown.empty.rfqs": "Aucune demande d'offre n'est disponible pour l'exploration.",
  "reports.drilldown.outlookTitle": "\nPerspectives",
  "reports.drilldown.noteTitle": "\nRemarque",
  "reports.drilldown.executive.openDocumentsNote":
    "\n{count} documents opérationnels restent actifs : {rfqs} RFQ, {customerOrders} commandes clients, {workOrders} bons de travail, {purchaseOrders} bons de commande et {invoices} factures.",
  "reports.drilldown.executive.openDocumentsClear":
    "\nAucun document opérationnel n'est actuellement ouvert.",
  "reports.drilldown.executive.bookValueNote":
    "\nL'utilisation moyenne dans l'ensemble du domaine est actuellement de {rate}.",
  "reports.drilldown.estateOperational.row.condition": "\nÉtat du bien",
  "reports.drilldown.estateOperational.row.lifecycle": "\nRisque lié au cycle de vie",
  "reports.drilldown.estateOperational.row.readiness": "\nPréparation à la formation",
  "reports.drilldown.estateOperational.row.inspection": "\nInspection et main-d'œuvre",
  "reports.drilldown.estateOperational.row.approvals": "\nApprobations du projet",
  "reports.drilldown.estateOperational.row.delivery": "\nLivraison du projet",
  "reports.drilldown.strategicDecision.row.lifecycle": "\nAnalyse du cycle de vie des actifs",
  "reports.drilldown.strategicDecision.row.infrastructure":
    "\nÉvaluation des risques liés aux infrastructures",
  "reports.drilldown.strategicDecision.row.predictive":
    "\nModélisation de la maintenance prédictive",
  "reports.drilldown.strategicDecision.row.performance":
    "\nAnalyse des performances opérationnelles",
  "reports.drilldown.strategicDecision.row.investment": "\nPriorisation des investissements",
  "reports.drilldown.estateOperational.value.condition":
    "\n{critical} critique sur {total} actifs suivis",
  "reports.drilldown.estateOperational.value.lifecycle":
    "\n{critical} signaux critiques • {due} à venir",
  "reports.drilldown.estateOperational.value.readiness": "\n{ready} sur {total} capacités prêtes",
  "reports.drilldown.estateOperational.value.inspection": "\n{count} inspection(s) en retard",
  "reports.drilldown.estateOperational.value.approvals":
    "\n{delayed} retardé • {queue} en file d'attente",
  "reports.drilldown.estateOperational.value.delivery":
    "\n{highRisk} à haut risque • {conflicts} conflit(s)",
  "reports.drilldown.strategicDecision.value.lifecycle":
    "\n{count} les actifs de surveillance du cycle de vie représentent actuellement {rate} de la base du patrimoine.",
  "reports.drilldown.strategicDecision.value.infrastructure":
    "\n{count} le(s) signal(s) de risque d’infrastructure représentent actuellement {rate} de la base immobilière.",
  "reports.drilldown.strategicDecision.value.predictive":
    "\n{count} signal(s) de maintenance prédictive sont actifs, y compris {critical} prédiction(s) critique(s).",
  "reports.drilldown.strategicDecision.value.performance":
    "\nL'état de préparation des capacités est de {readiness} et la productivité est de {productivity} unités de production par heure de travail.",
  "reports.drilldown.strategicDecision.value.investment":
    "\nLes signaux de pression d'investissement {count} sont actifs, dirigés par {focus}.",
  "reports.drilldown.estateOperational.note.condition":
    "\n{watch} actifs sont en phase de surveillance ou en phase de fatigue dans leur cycle de vie.",
  "reports.drilldown.estateOperational.note.lifecycle":
    "\n{initiatives} initiative(s) stratégique(s) restent inscrites au registre du programme successoral.",
  "reports.drilldown.estateOperational.note.readiness":
    "\nPréparation de la plage {rate} avec {constrainedSites} site(s) contraint(s).",
  "reports.drilldown.estateOperational.note.inspection":
    "\n{hours} heures de travail enregistrées au cours de l'activité de livraison opérationnelle actuelle.",
  "reports.drilldown.estateOperational.note.approvals":
    "\n{projects} projet(s) actuellement inscrit(s) dans le portefeuille immobilier.",
  "reports.drilldown.estateOperational.note.delivery":
    "\n{count} les signaux globaux de pression d’investissement sont actifs.",
  "reports.drilldown.strategicDecision.note.lifecycle":
    "\n{total} les actifs totaux sont représentés dans la base stratégique actuelle.",
  "reports.drilldown.strategicDecision.note.infrastructure":
    "\n{constrained} site(s) soumis à des contraintes et {inspections} inspection(s) en retard contribuent toujours au risque lié aux infrastructures.",
  "reports.drilldown.strategicDecision.note.predictive":
    "{due} prédiction(s) sont attendues prochainement, représentant {rate} de la base successorale.",
  "reports.drilldown.strategicDecision.note.performance":
    "\n{focus} est actuellement le principal domaine de surveillance des performances, avec {mitigationCost} lié aux activités d'atténuation.",
  "reports.drilldown.strategicDecision.note.investment":
    "\n{delayed} approbation(s) retardée(s) et {projects} signal(s) de pression de livraison du projet restent actifs.",
  "reports.drilldown.open": "\nOuvrir l'exploration",
  "reports.drilldown.openAria": "\nAfficher l'analyse détaillée pour {label}",
  "reports.drilldown.tableAria": "\nDonnées détaillées pour {title}",
  "reports.drilldown.consoleEyebrow": "\nConsole d'exploration",
  "reports.drilldown.consoleDescription":
    "\nPassez des mesures récapitulatives aux lignes opérationnelles, aux signaux de concentration et aux détails prêts à l'action.",
  "reports.drilldown.consoleTitle": "\nConsole d'exploration",
  "reports.custom.sourceAi": "\nRécit de l'IA",
  "reports.custom.sourceSystem": "\nRésumé basé sur des règles",
  "reports.custom.provenance.financePlanning": "\nIssu de la planification financière",
  "reports.custom.provenance.summary":
    "\nSemé à partir de {title} pour {scope} sur un horizon de planification de {months} mois.",
  "reports.custom.templateApplied": "\nModèle : {name}",
  "reports.custom.coverageTitle": "\nScore de couverture",
  "reports.custom.coverageDescription": "\nLes sections {count} sont incluses dans ce pack.",
  "reports.custom.tablePreview":
    "\nAffichage de {visible} sur {total} lignes dans cet aperçu de section.",
  "reports.custom.guidanceApplied": "\nDirectives appliquées : {guidance}",
  "reports.custom.narrativeTitle": "\nRésumé narratif",
  "reports.templates.libraryTitle": "\nBibliothèque de modèles",
  "reports.templates.libraryDescription":
    "\nPacks de rapports intégrés et enregistrés que les opérateurs peuvent lancer directement dans l'espace de travail de rapport actif.",
  "reports.templates.badgeBuiltin": "\nIntégré",
  "reports.templates.badgeCustom": "\nEnregistré",
  "reports.templates.badgeNarrative": "\nRécit",
  "reports.templates.badgeDrilldowns": "\nAnalyses",
  "reports.templates.run": "\nExécuter le pack",
  "reports.templates.runAria": "\nPack d'exécution : {name}",
  "reports.templates.saved": "\nModèle enregistré dans la bibliothèque.",
  "utilisation.title": "\nUtilisation",
  "utilisation.subtitle":
    "\nCockpit d'utilisation d'entreprise pour la télémétrie, les signaux d'IA et le flux opérationnel",
  "utilisation.cockpit.chatContext":
    "\nPage du cockpit d'utilisation. Espace de travail unifié pour la posture d'utilisation de la flotte, la fraîcheur de la télémétrie, le contexte de prédiction de l'IA, le retard de maintenance, la comparaison des sites, les statistiques de commande, les actions du copilote de l'IA, l'exploration du flux de travail, le classement du site, la matrice d'utilisation, la file d'attente des actions, le tableau des tendances, la chronologie et le tableau de portefeuille triable. Contrôles : filtre de site, plage de dates, taille de page, exportation CSV et filtres clairs.",
  "utilisation.cockpit.hero.eyebrow": "\nCockpit d'utilisation",
  "utilisation.cockpit.hero.title":
    "\nTélémétrie, signaux d'IA et flux de capacité dans un seul espace de travail",
  "utilisation.cockpit.hero.description":
    "\nSuivez la pression du site, la capacité sous-utilisée, la télémétrie obsolète et le contexte de maintenance dans un cockpit d'utilisation de type Power BI conçu pour la prise de décision opérationnelle.",
  "utilisation.cockpit.hero.live": "\nActualisation automatique toutes les {seconds} secondes",
  "utilisation.cockpit.filters.eyebrow": "\nFiltres",
  "utilisation.cockpit.filters.title": "\nÉtendez l'espace de travail",
  "utilisation.cockpit.filters.description":
    "Filtrez le cockpit par site et par fenêtre horaire, ajustez la densité des tables et exportez la vue analytique actuelle.",
  "utilisation.cockpit.filters.exportDescription":
    "\nExporte le portefeuille d'utilisation filtré actuel au format CSV.",
  "utilisation.cockpit.legend.eyebrow": "\nGroupes de performance",
  "utilisation.cockpit.legend.title": "\nLire les bandes de posture",
  "utilisation.cockpit.legend.description":
    "\nChaque actif est classé dans une posture opérationnelle déterministe, de sorte que les mêmes seuils pilotent les cartes, la file d'attente et la table de portefeuille.",
  "utilisation.cockpit.legend.optimal":
    "\nActifs fonctionnant dans la bande d’utilisation préférée avec une charge équilibrée et une couverture télémétrique saine.",
  "utilisation.cockpit.legend.watch":
    "\nActifs qui évoluent en dehors de la fourchette préférée et méritent d'être surveillés avant qu'ils ne se transforment en points de pression.",
  "utilisation.cockpit.legend.under":
    "\nActifs fonctionnant en dessous de la bande cible, indiquant une capacité inutilisée ou un éventuel déséquilibre de la demande.",
  "utilisation.cockpit.legend.over":
    "\nActifs fonctionnant au-dessus du seuil et nécessitant très probablement un allègement de charge, une inspection ou une réaffectation.",
  "utilisation.cockpit.actions.eyebrow": "\nFlux de travail connectés",
  "utilisation.cockpit.actions.title": "\nGardez le flux en mouvement",
  "utilisation.cockpit.actions.description":
    "\nPassez directement de la posture d'utilisation aux flux de travail qui expliquent ou résolvent la pression sur la capacité.",
  "utilisation.cockpit.actions.predictions":
    "\nExaminez les prédictions de l'IA et les signaux de durée de vie restante affectant les actifs chauds ou instables.",
  "utilisation.cockpit.actions.tasks":
    "\nSupprimer les retards de maintenance et les travaux en retard liés à la pression d'utilisation.",
  "utilisation.cockpit.actions.reports":
    "\nGénérez des rapports prêts pour les parties prenantes à partir du même ensemble de données d'utilisation.",
  "utilisation.filters.title": "\nFiltres de portefeuille",
  "utilisation.filters.description":
    "\nAppliquez ensemble les modifications du site, de la fenêtre horaire et de la taille de la page avant d'actualiser le registre d'utilisation.",
  "utilisation.filters.batchMode": "\nFiltres par lots",
  "utilisation.filters.applyHint":
    "\nUtilisez Appliquer les filtres pour actualiser ensemble la bande récapitulative, l'enregistrement et l'inspecteur.",
  "utilisation.cockpit.briefing.title": "\nFiche d'utilisation",
  "utilisation.cockpit.briefing.eyebrow": "\nPrésentation du portfolio",
  "utilisation.cockpit.briefing.headlineDemand":
    "\nLa pression de la demande se concentre autour d’un petit ensemble d’actifs",
  "utilisation.cockpit.briefing.headlineCapacity":
    "\nLa capacité disponible est visible dans l'ensemble du portefeuille actuel",
  "utilisation.cockpit.briefing.headlineData":
    "\nLa fraîcheur de la télémétrie limite l'utilisation image",
  "utilisation.cockpit.briefing.headlineBalanced":
    "\nLa posture d'utilisation est globalement équilibrée dans l'ensemble de la portée actuelle",
  "utilisation.cockpit.briefing.summary":
    "\nPour {site} sur {period}, l’utilisation moyenne de la flotte est de {average}. La télémétrie couvre actuellement les actifs {telemetry}, {over} fonctionnant à chaud et {under} affichant une capacité disponible.",
  "utilisation.cockpit.briefing.recommendationTitle": "\nProchain coup recommandé",
  "utilisation.cockpit.briefing.recommendationPortfolio":
    "Aucun actif ne domine actuellement la file d’attente. Gardez la télémétrie à jour tout au long de {site} et concentrez-vous sur le maintien d'une couverture équilibrée.",
  "utilisation.cockpit.briefing.recommendationAsset":
    "\nDonnez ensuite la priorité à {asset}. Il s'agit actuellement du candidat le plus puissant pour « {action} » en fonction de la posture d'utilisation, du contexte du signal d'IA et du retard de travail actif.",
  "utilisation.cockpit.generatedAt": "\nGénéré {date}",
  "utilisation.cockpit.datasets.title": "\nCouverture de l'ensemble de données",
  "utilisation.cockpit.datasets.description":
    "\nLe cockpit combine la télémétrie, le contexte de prédiction de l'IA et les signaux d'exécution du travail en une seule surface de décision.",
  "utilisation.cockpit.datasets.assetsTitle": "\nActifs concernés par le champ d'application",
  "utilisation.cockpit.datasets.assetsDescription":
    "\n{sites} sites représentés dans le portefeuille filtré actuel",
  "utilisation.cockpit.datasets.telemetryTitle": "\nLectures de télémétrie",
  "utilisation.cockpit.datasets.telemetryDescription":
    "\n{count} actifs avec télémétrie dans la période sélectionnée",
  "utilisation.cockpit.datasets.aiTitle": "\nSignaux basés sur l'IA",
  "utilisation.cockpit.datasets.aiDescription":
    "\n{due} actifs à échéance prochaine en fonction de la durée de vie restante prévue",
  "utilisation.cockpit.datasets.tasksTitle": "\nÉléments de travail ouverts",
  "utilisation.cockpit.datasets.tasksDescription":
    "\n{overdue} tâches en retard affectent actuellement le flux de capacité",
  "utilisation.cockpit.command.coverageTitle": "\nCouverture télémétrique",
  "utilisation.cockpit.command.coverageDescription":
    "\n{covered} couvert • {blind} angles morts • {stale} aliments périmés",
  "utilisation.cockpit.command.aiTitle": "\nCouverture IA",
  "utilisation.cockpit.command.aiDescription":
    "\nActifs {signals} avec signaux IA • {due} bientôt attendu",
  "utilisation.cockpit.command.pressureTitle": "\nActifs sous pression",
  "utilisation.cockpit.command.pressureDescription":
    "\n{hot} chaud • {under} sous-utilisé • {stale} rassis",
  "utilisation.cockpit.command.documentsTitle": "\nOuvrir le flux de documents",
  "utilisation.cockpit.command.documentsDescription":
    "\n{workOrders} bons de travail et {documents} total de documents liés restent actifs.",
  "utilisation.cockpit.kpi.averageTitle": "\nMoyenne de la flotte",
  "utilisation.cockpit.kpi.averageDescription":
    "\nUtilisation moyenne sur l'ensemble du portefeuille filtré, normalisée sur une échelle opérationnelle de 0 à 100.",
  "utilisation.cockpit.kpi.optimalTitle": "\nActifs optimaux",
  "utilisation.cockpit.kpi.optimalDescription":
    "\nActifs fonctionnant à l’intérieur de la bande d’utilisation privilégiée.",
  "utilisation.cockpit.kpi.warningTitle": "\nActifs de la liste de surveillance",
  "utilisation.cockpit.kpi.warningDescription":
    "\n{under} sous-utilisé et {watch} en dehors de la bande préférée mais pas encore critique.",
  "utilisation.cockpit.kpi.criticalTitle": "\nAttention critique",
  "utilisation.cockpit.kpi.criticalDescription":
    "\n{over} chauffe et {stale} avec une télémétrie manquante ou obsolète.",
  "utilisation.inspector.summary.pressureBadge": "\n{count} exceptions en direct",
  "utilisation.inspector.summary.telemetryBadge": "\n{count} exceptions de télémétrie",
  "utilisation.inspector.summary.averageHint":
    "\nMoyenne actuelle du portefeuille sur l'ensemble du périmètre d'utilisation filtré.",
  "utilisation.inspector.summary.exceptionTitle": "\nExceptions",
  "utilisation.inspector.summary.exceptionHint":
    "\n{over} surchargé, {under} sous-utilisé et {stale} les ressources de télémétrie obsolètes sont actives.",
  "utilisation.inspector.summary.coverageHint":
    "\nLes angles morts {blind} et les flux {stale} périmés limitent toujours la confiance.",
  "utilisation.cockpit.posture.optimal": "\nOptimal",
  "utilisation.cockpit.posture.watch": "\nRegarder",
  "utilisation.cockpit.posture.under": "\nSous-utilisé",
  "utilisation.cockpit.posture.over": "\nSurchargé",
  "utilisation.cockpit.site.title": "\nClassement du site",
  "utilisation.cockpit.site.description":
    "\nComparez la situation du site en fonction de l'utilisation moyenne, de la couverture de télémétrie en direct et de la combinaison de pressions.",
  "utilisation.cockpit.site.empty":
    "Aucune donnée sur les performances du site n'est disponible pour les filtres actuels.",
  "utilisation.cockpit.site.meta": "\nActifs {assets} • {telemetry} avec télémétrie",
  "utilisation.cockpit.site.share": "\n{share} d'actifs visibles",
  "utilisation.cockpit.site.over": "\n{count} hot",
  "utilisation.cockpit.site.under": "\n{count} sous-utilisé",
  "utilisation.cockpit.site.watch": "\n{count} montre",
  "utilisation.cockpit.site.optimal": "\n{count} optimal",
  "utilisation.cockpit.queue.title": "\nFile d'attente d'actions",
  "utilisation.cockpit.queue.description":
    "\nActifs classés par pression, fraîcheur de la télémétrie, gravité du signal IA et travail opérationnel non résolu.",
  "utilisation.cockpit.queue.empty":
    "\nAucun élément de la file d'attente des actions d'utilisation n'est actif pour le moment.",
  "utilisation.cockpit.queue.current": "\nCourant {current} • Moyenne {average}",
  "utilisation.cockpit.queue.tasks": "\n{open} tâches ouvertes • {overdue} en retard",
  "utilisation.cockpit.queue.lifeUnknown":
    "\nAucune prévision de durée de vie restante n'est associée à cet actif.",
  "utilisation.cockpit.queue.lifeValue": "\n{days} jours de vie restante",
  "utilisation.cockpit.queue.telemetryMissing":
    "\nAucune télémétrie en direct n'est actuellement disponible.",
  "utilisation.cockpit.queue.telemetryFresh": "\nDernière télémétrie {date}",
  "utilisation.cockpit.mix.title": "\nMélange de postures",
  "utilisation.cockpit.mix.description":
    "\nDécouvrez comment le portefeuille d'actifs visible est réparti entre les tranches de posture opérationnelle.",
  "utilisation.cockpit.mix.empty":
    "\nAucune combinaison de postures n'est disponible pour le portefeuille actuel.",
  "utilisation.cockpit.mix.assetCount": "\n{count} actifs",
  "utilisation.cockpit.mix.average": "\nMoyenne {value}",
  "utilisation.cockpit.matrix.title": "\nMatrice d'utilisation",
  "utilisation.cockpit.matrix.description":
    "\nUne grille de concentration équilibrée entre les actifs surchargés, sous-utilisés, sous surveillance et optimaux, classés par importance opérationnelle.",
  "utilisation.cockpit.matrix.empty":
    "\nAucune ressource de matrice d'utilisation n'est disponible pour les filtres actuels.",
  "utilisation.cockpit.matrix.average": "\nMoyenne {value}",
  "utilisation.cockpit.copilot.title": "\nCopilote IA",
  "utilisation.cockpit.copilot.description":
    "\nTransformez le périmètre actuel en un briefing exécutif, un examen de la confiance des données ou un plan d'intervention sans quitter le cockpit.",
  "utilisation.cockpit.copilot.focus": "\nObjectif actuel",
  "utilisation.cockpit.copilot.brief": "\nRédiger un brief",
  "utilisation.cockpit.copilot.briefPrompt":
    "\nRédigez un mémoire d'utilisation exécutif pour {site} sur {period}. Mettez en évidence l’utilisation moyenne {average}, {over} actifs surchargés, {under} actifs sous-utilisés et {stale} flux de télémétrie obsolètes. Recommander les prochaines actions opérationnelles.",
  "utilisation.cockpit.copilot.data": "\nVérifier la confiance des données",
  "utilisation.cockpit.copilot.dataPrompt":
    "\nÉvaluez la qualité des données pour l’espace de travail d’utilisation actuel. Il existe des ressources {covered} avec télémétrie, {blind} sans télémétrie et {stale} flux périmés. Expliquez le degré de confiance que les opérateurs devraient accorder à ce cockpit et quelles lacunes dans les données doivent être corrigées en premier.",
  "utilisation.cockpit.copilot.intervention": "\nProjet de plan d'intervention",
  "utilisation.cockpit.copilot.interventionPromptAsset":
    "Rédiger un plan d'intervention pour le bien {asset} à {site}. L'utilisation actuelle est de {current}, la moyenne est de {average}, la posture est de {posture}, l'action recommandée est de {action}, il y a {open} tâches ouvertes et {overdue} tâches en retard, et la durée de vie restante est de {life}.",
  "utilisation.cockpit.copilot.interventionPromptPortfolio":
    "\nRédiger un plan d'intervention au niveau du portefeuille pour {site} sur {period}. Concentrez-vous sur les ressources de télémétrie surchargées, sous-utilisées et obsolètes et séquencez les actions suivantes.",
  "utilisation.cockpit.workflow.title": "\nSuivi intersystème",
  "utilisation.cockpit.workflow.description":
    "\nPassez de la posture d'utilisation aux systèmes qui expliquent les risques, clarifient le travail ou présentent l'histoire aux parties prenantes.",
  "utilisation.cockpit.workflow.predictionsMeta":
    "\n{signals} actifs adossés à des signaux • {due} à échéance prochaine",
  "utilisation.cockpit.workflow.tasksMeta": "\n{open} tâches ouvertes • {overdue} en retard",
  "utilisation.cockpit.workflow.reportsMeta":
    "\n{blind} angles morts de la télémétrie • {documents} documents ouverts",
  "utilisation.cockpit.workflow.fleetMeta":
    "\n{vehicles} actifs en mouvement • {backlog} tâches ouvertes",
  "utilisation.cockpit.workflow.sensorsMeta":
    "\n{blind} angles morts de télémétrie • {stale} flux périmés",
  "utilisation.cockpit.workflow.buildingsMeta":
    "\n{sites} sites actifs • {signals} actifs soutenus par l'IA",
  "utilisation.cockpit.trend.title": "\nTableau des tendances",
  "utilisation.cockpit.trend.description":
    "\nLes points de tendance d'utilisation quotidienne aident les opérateurs à repérer la dérive, la volatilité et la densité d'échantillonnage au fil du temps.",
  "utilisation.cockpit.trend.empty":
    "\nAucun point de tendance d'utilisation n'est disponible pour la fenêtre horaire actuelle.",
  "utilisation.cockpit.trend.samples": "\n{count} échantillons de télémétrie",
  "utilisation.cockpit.trend.low": "\nFaible {value}",
  "utilisation.cockpit.trend.high": "\nÉlevé {value}",
  "utilisation.cockpit.chronology.title": "\nChronologie d'utilisation",
  "utilisation.cockpit.chronology.description":
    "\nLes événements de télémétrie récents fournissent une piste d'audit rapide de la façon dont la posture actuelle a été observée.",
  "utilisation.cockpit.chronology.empty":
    "\nAucune chronologie de télémétrie n'est disponible pour la portée de filtre actuelle.",
  "utilisation.cockpit.chronology.value": "\nObservé {value}",
  "utilisation.cockpit.table.title": "\nPortefeuille d'utilisation",
  "utilisation.cockpit.table.description":
    "\nVue de portefeuille triable combinant l'utilisation actuelle, la direction de la tendance, le contexte du signal IA et la pression de la file d'attente.",
  "utilisation.cockpit.table.live": "\nTable en direct",
  "utilisation.cockpit.table.asset": "\nActif",
  "utilisation.cockpit.table.current": "\nActuel",
  "utilisation.cockpit.table.trend": "\nTendance",
  "utilisation.cockpit.table.signal": "\nSignal",
  "utilisation.cockpit.table.queue": "\nFile d'attente",
  "utilisation.cockpit.table.average": "\nMoy. {value}",
  "utilisation.cockpit.table.trendValue": "Tendance {direction} {value}",
  "utilisation.cockpit.table.trendUp": "\nVers le haut",
  "utilisation.cockpit.table.trendDown": "\nVers le bas",
  "utilisation.cockpit.table.trendFlat": "\nAppartement",
  "utilisation.cockpit.table.tasksValue": "\n{count} tâches ouvertes",
  "utilisation.cockpit.table.queueValue":
    "\n{overdue} en retard • {workOrders} bons de travail • {documents} documents",
  "utilisation.cockpit.table.empty":
    "\nAucune donnée d'utilisation n'est disponible pour les filtres sélectionnés. Connectez la télémétrie ou élargissez la fenêtre temporelle pour remplir le portefeuille.",
  "utilisation.cockpit.table.emptyAction": "\nAfficher les éléments",
  "utilisation.inspector.title": "\nInterprétation sélectionnée",
  "utilisation.inspector.subtitle":
    "Examinez l'actif actif, ses exceptions actuelles et la prochaine action de rapport d'un inspecteur.",
  "utilisation.inspector.emptyTitle": "\nSélectionnez un actif",
  "utilisation.inspector.emptyDescription":
    "\nChoisissez une ligne de registre pour inspecter la situation d'utilisation, les raisons d'exception et les actions de reporting.",
  "utilisation.inspector.generatedLabel": "\nInspector refresh",
  "utilisation.inspector.assetSubtitle": "{site} • {type} • {condition} • {lifecycle}",
  "utilisation.inspector.stats.signalHint":
    "\n{tasks} tâches ouvertes et {workOrders} ordres de travail actifs contribuent à la recommandation actuelle.",
  "utilisation.inspector.reasonsTitle": "\nMotifs d'exception",
  "utilisation.inspector.aiPrompt":
    "\nRésumez la posture d’utilisation pour {asset} à {site}. L'utilisation actuelle est {current}, l'utilisation moyenne est {average} et l'action actuellement recommandée est {action}. Expliquez les causes probables, le risque opérationnel et la prochaine action de reporting.",
  "utilisation.inspector.tableSubtitle":
    "\nUtiliser le registre comme surface d'analyse principale ; sélectionnez une ligne pour mettre à jour le panneau d'interprétation de droite.",
  "utilisation.inspector.tableBadge": "\nRegistre dominant",
  "utilisation.inspector.interpretation.noTelemetry":
    "\n{asset} à {site} n'est pas fiable sur le plan opérationnel car aucune télémétrie actuelle n'alimente la vue d'utilisation.",
  "utilisation.inspector.interpretation.staleTelemetry":
    "\n{asset} affiche l'utilisation actuelle de {current} par rapport à une moyenne de {average}, mais l'alimentation est périmée et nécessite une confirmation télémétrique avant que les opérateurs n'agissent.",
  "utilisation.inspector.interpretation.overloaded":
    "\n{asset} fonctionne au-dessus de la bande préférée avec une utilisation actuelle de {current} contre une moyenne de {average}. L’allègement de la demande ou la redistribution de la charge de travail devraient être examinés ensuite.",
  "utilisation.inspector.interpretation.underused":
    "\n{asset} fonctionne en dessous de la bande préférée à {current} utilisation actuelle contre une moyenne de {average}. Des capacités inutilisées peuvent être disponibles pour le redéploiement.",
  "utilisation.inspector.interpretation.watch":
    "\n{asset} est en dehors de la bande équilibrée avec une utilisation actuelle de {current} contre une moyenne de {average}. Gardez la file d'attente sous contrôle avant que l'exception ne se durcisse.",
  "utilisation.inspector.interpretation.balanced":
    "\n{asset} est actuellement équilibré à {current} utilisation actuelle contre une moyenne de {average}, sans exception dominante exigeant une escalade immédiate.",
  "utilisation.inspector.reason.noTelemetry":
    "La télémétrie en direct est manquante, donc la posture d'utilisation est actuellement déduite d'un contexte opérationnel partiel.",
  "utilisation.inspector.reason.staleTelemetry":
    "\nLa fraîcheur de la télémétrie est dégradée, la dernière lecture d'utilisation doit donc être confirmée.",
  "utilisation.inspector.reason.overloaded":
    "\nL'utilisation est supérieure à la bande d'exploitation privilégiée et peut nécessiter un allègement de la demande.",
  "utilisation.inspector.reason.underused":
    "\nL'utilisation est inférieure à la bande d'exploitation préférée et peut indiquer une capacité disponible.",
  "utilisation.inspector.reason.watch":
    "\nL'utilisation est en dehors de la bande équilibrée et devrait rester sur la liste de surveillance.",
  "utilisation.inspector.reason.remainingLife":
    "\nLa posture de vie restante de l'IA est tombée à {days} jours et devrait être prise en compte dans les prochaines actions.",
  "utilisation.inspector.reason.overdueTasks":
    "\n{count} tâches de maintenance en retard sont toujours en cours pour cet actif.",
  "utilisation.inspector.reason.workOrders":
    "\n{count} bons de travail actifs sont déjà liés à cet actif.",
  "utilisation.inspector.reason.documents":
    "\nLes documents liés {count} restent ouverts tout au long du flux de travail commercial.",
  "utilisation.inspector.reason.none":
    "\nAucune exception dominante n'est active au-delà de la posture d'utilisation actuelle.",
  "utilisation.cockpit.csv.asset": "\nActif",
  "utilisation.cockpit.csv.site": "\nSite",
  "utilisation.cockpit.csv.type": "\nTapez",
  "utilisation.cockpit.csv.condition": "\nÉtat",
  "utilisation.cockpit.csv.lifecycle": "\nCycle de vie",
  "utilisation.cockpit.csv.current": "\nUtilisation actuelle",
  "utilisation.cockpit.csv.average": "\nUtilisation moyenne",
  "utilisation.cockpit.csv.trend": "\nDelta de tendance",
  "utilisation.cockpit.csv.posture": "\nPosture",
  "utilisation.cockpit.csv.latestTelemetry": "\nDernière télémétrie",
  "utilisation.cockpit.csv.telemetrySamples": "\nÉchantillons de télémétrie",
  "utilisation.cockpit.csv.severity": "\nGravité de l'IA",
  "utilisation.cockpit.csv.confidence": "\nConfiance en IA",
  "utilisation.cockpit.csv.remainingLifeDays": "\nJours de vie restants",
  "utilisation.cockpit.csv.openTasks": "\nTâches ouvertes",
  "utilisation.cockpit.csv.overdueTasks": "\nTâches en retard",
  "utilisation.cockpit.csv.activeWorkOrders": "\nBons de travail actifs",
  "utilisation.cockpit.csv.openDocuments": "\nDocuments ouverts",
  "utilisation.cockpit.csv.recommendedAction": "\nAction recommandée",
  "utilisation.cockpit.action.connectData": "\nConnecter la télémétrie",
  "utilisation.cockpit.action.refreshTelemetry": "\nActualiser la télémétrie",
  "utilisation.cockpit.action.inspectAsset": "\nInspecter l'actif",
  "utilisation.cockpit.action.relieveDemand": "\nSoulager la demande",
  "utilisation.cockpit.action.clearBacklog": "\nSupprimer le retard",
  "utilisation.cockpit.action.redeployCapacity": "\nRedéployer la capacité",
  "utilisation.cockpit.action.coordinateWorkOrders": "\nCoordonner les bons de travail",
  "utilisation.cockpit.action.alignDocuments": "\nAligner le flux de documents",
  "utilisation.cockpit.action.monitorFlow": "\nSurveiller le débit",
  "admin.title": "\nCentre de contrôle d'administration",
  "admin.subtitle":
    "\nEspace de travail d'entreprise pour l'identité, les emplacements, l'IA, les intégrations d'entreprise, la sécurité et la gouvernance",
  "admin.audit.at": "\nÀ",
  "admin.audit.timestamp": "\nHorodatage",
  "admin.audit.actor": "\nActeur",
  "admin.audit.action": "\nAction",
  "admin.audit.entity": "\nEntité",
  "admin.system.users": "\nUtilisateurs",
  "admin.system.assets": "\nActifs",
  "admin.system.tasks": "\nTâches",
  "admin.system.predictions": "\nPrédictions",
  "admin.system.registeredRoutes": "\nItinéraires enregistrés",
  "admin.system.apiRoutes": "\nRoutes API",
  "admin.system.htmlRoutes": "\nItinéraires HTML",
  "admin.system.staticRoutes": "\nItinéraires statiques",
  "admin.system.authRoutes": "\nRoutes d'authentification",
  "admin.system.databaseConfigured": "\nBase de données configurée",
  "admin.system.selfHostedAssets": "\nActifs auto-hébergés",
  "utilisation.chart.metaTitle": "\nPanneau de tendances et de résumé",
  "utilisation.chart.summaryLabel": "\nDernier agrégat d'utilisation sur 24 heures.",
  "utilisation.chart.avgMinMax": "\nMoyenne {avg}%, Min {min}%, Max {max}%",
  "finance.depreciation.summary.title": "\nExposition à la dépréciation",
  "finance.depreciation.summary.description":
    "\nValorisation combinée standard et ajustée par l'IA",
  "finance.depreciation.summary.totalAssetsDescription": "\nActif total : {count}",
  "finance.depreciation.summary.adjustmentHint": "\nFacteurs d'ajustement IA appliqués",
  "finance.depreciation.summary.severityCount": "\n{critical} critique, {warning} avertissement",
  "finance.depreciation.summary.delta": "\nDelta de valorisation de l'IA",
  "finance.depreciation.summary.deltaDescription":
    "\n{amount} écart par rapport à la valeur comptable de référence",
  "finance.depreciation.summary.highRiskExposure": "\nExposition à haut risque",
  "finance.depreciation.summary.highRiskExposureDescription":
    "\n{count} biens dans un état critique ou fatigant",
  "finance.depreciation.summary.adjustmentRate": "\nTaux d'ajustement {rate}",
  "finance.depreciation.mix.assetCount": "\n{count} actifs",
  "finance.depreciation.conditionMix.title": "\nConcentration des conditions",
  "finance.depreciation.conditionMix.description":
    "Exposition à la valeur comptable regroupée selon l’état actuel de l’actif.",
  "finance.depreciation.typeMix.title": "\nType de concentration",
  "finance.depreciation.typeMix.description":
    "\nLes classes d’actifs les plus valorisées déterminent la posture de dépréciation actuelle.",
  "finance.depreciation.topAssets.title": "\nActifs prioritaires",
  "finance.depreciation.topAssets.description":
    "\nActifs de plus grande valeur avec l'impact de la dépréciation le plus important.",
  "finance.depreciation.topAssets.empty": "\nAucun actif",
  "finance.depreciation.topAssets.aiAdjusted": "\nAjusté par l'IA",
  "finance.depreciation.table.title": "\nTableau d'amortissement",
  "finance.depreciation.table.description":
    "\nValeur comptable standard par rapport à l'exposition ajustée par l'IA, à l'état de l'état et au signal de risque réel.",
  "finance.depreciation.table.site": "\nSite",
  "finance.depreciation.table.type": "\nTapez",
  "finance.depreciation.table.condition": "\nÉtat",
  "finance.depreciation.table.signal": "\nSignal",
  "finance.depreciation.table.aiAdjusted": "\nIA ajustée",
  "finance.depreciation.table.variance": "\nÉcart",
  "finance.depreciation.stage.acquisition": "\nAcquisition",
  "finance.depreciation.stage.activeService": "\nService actif",
  "finance.depreciation.stage.midLife": "\nMi-vie",
  "finance.depreciation.stage.endOfLife": "\nFin de vie",
  "finance.depreciation.stage.disposal": "\nMise au rebut",
  "finance.depreciation.stage.lifecycleLabel": "\nÉtapes du cycle de vie de l'actif",
  "finance.period.currentQuarter": "\nTrimestre en cours",
  "finance.period.lastQuarter": "\nDernier trimestre",
  "finance.period.ytd": "\nAnnée à ce jour",
  "finance.period.all": "\nTout le temps",
  "finance.tab.overview": "\nAperçu",
  "finance.tab.depreciation": "\nAnalyse de l'amortissement",
  "finance.tab.costAnalysis": "\nCoût et évaluation",
  "finance.overview.portfolioValue": "\nValeur du portefeuille",
  "finance.overview.portfolioDescription": "\nValeur comptable totale pour tous les actifs",
  "finance.overview.aiExposure": "\nExposition ajustée par l'IA",
  "finance.overview.aiExposureDescription": "\nValorisation ajustée au risque",
  "finance.overview.depreciationRate": "\nTaux d'ajustement",
  "finance.overview.depreciationRateDescription":
    "\nMultiplicateur d'amortissement piloté par l'IA",
  "finance.overview.assetCount": "\nActifs suivis",
  "finance.overview.assetCountDescription": "\nTotal des actifs sous gestion",
  "finance.overview.byDepMethod": "\nPar méthode d'amortissement",
  "finance.overview.byCondition": "\nPar état",
  "finance.depMethod.STRAIGHT_LINE": "\nLigne droite",
  "finance.depMethod.DECLINING_BALANCE": "\nSolde dégressif",
  "finance.depMethod.UNITS_OF_PRODUCTION": "\nUnités de production",
  "finance.depMethod.AI_ADJUSTED": "\nIA ajustée",
  "finance.costAnalysis.purchaseVsBook": "\nAchat par rapport à la valeur comptable",
  "finance.costAnalysis.totalPurchasePrice": "\nPrix d'achat total",
  "finance.costAnalysis.totalBookValue": "\nValeur comptable actuelle",
  "finance.costAnalysis.totalDepreciation": "\nAmortissement total",
  "finance.costAnalysis.totalDepreciationDescription": "\nAmortissement total : {amount}",
  "finance.costAnalysis.depreciationPercent": "\nAmortissement %",
  "finance.costAnalysis.topDepreciating": "\nPrincipaux actifs dépréciés",
  "finance.costAnalysis.topDepreciatingEmpty":
    "\nAucune donnée d'amortissement disponible pour les filtres sélectionnés.",
  "finance.costAnalysis.byLifecycle": "\nPar étape du cycle de vie",
  "finance.costAnalysis.avgAge": "\nÂge moyen des actifs",
  "finance.costAnalysis.avgAgeDescription": "\nDe la date d'achat à aujourd'hui",
  "finance.costAnalysis.days": "\n{count} jours",
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
  "reports.tab.financial": "\nFinancier",
  "reports.tab.operations": "\nOpérations",
  "reports.tab.executive": "\nExécutif",
  "reports.summary.totalReports": "\nRapports disponibles",
  "reports.summary.totalReportsDesc": "\nDans toutes les catégories",
  "reports.summary.criticalPredictions": "\nPrédictions critiques",
  "reports.summary.criticalPredictionsDesc": "\nAffectant les évaluations des actifs",
  "reports.summary.totalBookValue": "\nValeur comptable totale",
  "reports.summary.totalBookValueDesc": "\nValorisation actuelle du portefeuille",
  "reports.summary.assetCount": "\nActifs suivis",
  "reports.summary.assetCountDesc": "\nSous gestion active",
  "admin.system.online": "\nSystème en ligne",
  "admin.aiSettings.title": "\nFournisseur d'IA",
  "admin.aiSettings.subtitle":
    "\nDéfinissez le fournisseur actif, l'état de la clé d'exécution et l'identifiant du modèle.",
  "admin.aiSettings.provider": "\nFournisseur",
  "admin.aiSettings.apiKey": "\nClé API",
  "admin.aiSettings.apiKeyPlaceholder": "\nLaissez vide pour conserver la clé actuelle",
  "admin.aiSettings.model": "\nModèle",
  "admin.aiSettings.modelPlaceholder": "\nSaisissez l'ID de modèle spécifique au fournisseur",
  "admin.aiSettings.save": "\nEnregistrer les paramètres",
  "admin.aiSettings.saved": "\nParamètres enregistrés et appliqués aux nouvelles requêtes AI.",
  "admin.aiSettings.current": "\nValeur d'exécution actuelle",
  "admin.aiSettings.currentProvider": "\nFournisseur actuel",
  "admin.aiSettings.currentModel": "\nModèle actuel",
  "admin.aiSettings.currentSource": "\nSource actuelle",
  "admin.aiSettings.providerPlaceholder": "\nSélectionnez le fournisseur",
  "admin.aiSettings.notConfigured": "\nNon configuré",
  "admin.aiSettings.apiKeyConfigured": "\nConfiguré",
  "admin.aiSettings.source.environment": "\nValeurs par défaut de l'environnement",
  "admin.aiSettings.source.systemConfig": "\nConfiguration du système",
  "admin.aiSettings.validation.providerRequired": "\nSélectionnez un fournisseur d'IA valide.",
  "admin.aiSettings.validation.modelRequired": "\nL'identifiant du modèle est requis.",
  "admin.aiSettings.saveFailed": "\nImpossible d'enregistrer les paramètres IA pour le moment.",
  "admin.aiSettings.systemConfigDescription":
    "\nParamètres d'exécution d'IA persistants appliqués aux nouvelles requêtes d'IA.",
  "admin.aiSettings.airgappedHint":
    "\nLes déploiements Airgapped autorisent uniquement les fournisseurs d'IA locaux tels que RamaLama ou Ollama.",
  "admin.aiSettings.airgappedCurrentProviderBlocked":
    "Le fournisseur persistant se trouve en dehors de la stratégie d’espacement aérien. Sélectionnez un fournisseur local pour enregistrer un paramètre d'exécution conforme.",
  "admin.aiSettings.envNote":
    "\nLa configuration du système remplace les paramètres par défaut de l'environnement pour les nouvelles requêtes AI. Définissez AI_BASE_URL dans l'environnement uniquement lorsque vous avez besoin d'un point de terminaison de fournisseur personnalisé.",
  "admin.section.overview": "\nAperçu",
  "admin.section.overviewDescription":
    "\nSurveillez l'identité, la dépendance à la plateforme, le temps d'exécution de l'IA et la posture de gouvernance à partir d'un seul plan de contrôle.",
  "admin.section.users": "\nGestion des utilisateurs",
  "admin.section.usersDescription":
    "\nInspectez, modifiez et régissez l’accès, les sessions et les préférences des opérateurs.",
  "admin.section.branding": "Branding",
  "admin.section.brandingDescription":
    "Manage default and party-owned brands, domain mappings, metadata, and runtime theme tokens.",
  "admin.section.locations": "\nEmplacements et périphérie",
  "admin.section.locationsDescription":
    "\nGérez les sites, l'empreinte opérationnelle et la couverture des appareils dans l'ensemble du domaine.",
  "admin.section.ai": "\nOpérations IA",
  "admin.section.aiDescription":
    "\nContrôlez la configuration du runtime et tracez-la jusqu'aux ensembles de données qui alimentent la plateforme.",
  "admin.section.integrations": "\nIntégrations d'entreprise",
  "admin.section.integrationsDescription":
    "\nEnregistrez les systèmes RH, financiers, d'approvisionnement et documentaires qui restent les systèmes d'enregistrement externes.",
  "admin.section.security": "\nPosture de sécurité",
  "admin.section.securityDescription":
    "\nExaminez l’accès basé sur les rôles, l’activité d’audit et l’état des limites de stockage à partir d’un espace de travail.",
  "admin.section.governance": "\nGouvernance",
  "admin.section.governanceDescription":
    "\nRecherchez, exportez et examinez les événements d'administration et d'authentification.",
  "admin.nav.metricDatabaseOnline": "\nBase de données en ligne",
  "admin.nav.metricDatabaseOffline": "\nBase de données hors ligne",
  "admin.nav.metricUnavailable": "\nIndisponible",
  "admin.nav.usersMetric": "\nUtilisateurs {count} • {sessions} sessions en direct",
  "admin.nav.brandingMetric": "{count} brands managed",
  "admin.nav.locationsMetric": "\nSites {count} • Appareils {devices}",
  "admin.nav.aiMetric": "Fournisseur : {provider} • Modèle : {model}",
  "admin.nav.integrationsMetric": "\n{count} systèmes configurés",
  "admin.nav.securityMetric": "\n{privileged} privilégié • {events} événements",
  "admin.nav.governanceMetric": "\n{count} événements récents",
  "admin.controlCenter.kicker": "\nAdministration d'entreprise",
  "admin.controlCenter.description":
    "\nPassez de la position du domaine aux détails de l'utilisateur, de l'emplacement, de l'IA, de l'intégration, de la sécurité et de la gouvernance sans quitter le centre de contrôle.",
  "admin.summary.activeWorkspace": "\nEspace de travail actif",
  "admin.summary.aiRuntime": "\nExécution de l'IA",
  "admin.summary.userSessions": "\nSéances en direct",
  "admin.summary.userSessionsHint": "\nSessions d'opérateur simultanées actives en ce moment",
  "admin.copilot.title": "\nCopilote administrateur",
  "admin.copilot.description":
    "\nLancez une enquête, un plan de changement ou un briefing opérateur dans le chat en utilisant le contexte actuel de l'espace de travail.",
  "admin.launchpads.title": "\nBarres de lancement de l'espace de travail",
  "admin.launchpads.description":
    "\nAccédez directement aux espaces de travail qui possèdent l'accès, l'exécution, les intégrations et la posture d'audit, avec des métriques en direct transportées dans chaque voie.",
  "admin.launchpads.metricTitle": "\nPosture actuelle",
  "admin.launchpads.openWorkspace": "\nEspace de travail ouvert",
  "admin.navigation.title": "\nCentre de contrôle",
  "admin.navigation.description":
    "Espaces de travail d'administration profondément liés pour l'identité, les intégrations, la sécurité et les dépendances opérationnelles.",
  "admin.overview.managedUsers": "\nUtilisateurs gérés",
  "admin.overview.managedUsersHint":
    "\nEnregistrements d'identité et d'accès actuellement dans la portée",
  "admin.overview.verifiedIdentities": "\nIdentités vérifiées",
  "admin.overview.verifiedIdentitiesHint": "\nLes identités {count} doivent encore être vérifiées",
  "admin.overview.edgeFootprint": "\nEmpreinte de bord",
  "admin.overview.edgeFootprintHint": "\n{count} sites actifs connectés au domaine",
  "admin.overview.auditWindow": "\nGouvernance 24h",
  "admin.overview.auditWindowHint":
    "\nActivité récente d'authentification et de modification dans le centre de contrôle",
  "admin.overview.datasetLedger": "\nGrand livre des ensembles de données IA",
  "admin.overview.datasetLedgerDescription":
    "\nEnsembles de données opérationnels alimentant les prédictions, le flux d'annotations et les rapports.",
  "admin.overview.predictions": "\nPrédictions",
  "admin.overview.annotations": "\nAnnotations",
  "admin.overview.savedReports": "\nRapports enregistrés",
  "admin.overview.copilotDescription":
    "\nUtilisez l'IA pour résumer la posture, les anomalies de surface ou générer un transfert d'opérateur à partir de l'état actuel du centre de contrôle.",
  "admin.users.stats.total": "\nTaille du répertoire",
  "admin.users.stats.totalHint": "\nUtilisateurs correspondant aux filtres du répertoire actuel",
  "admin.users.stats.active": "\nActif",
  "admin.users.stats.activeHint":
    "\nUtilisateurs avec des sessions en direct et aucun signal d'attention ouvert",
  "admin.users.stats.attention": "\nA besoin d'attention",
  "admin.users.stats.attentionHint":
    "\nUtilisateurs présentant des risques de vérification, de préférence ou de posture de session",
  "admin.users.stats.inactive": "\nInactif",
  "admin.users.stats.inactiveHint":
    "\nUtilisateurs sans sessions actives dans le jeu de résultats actuel",
  "admin.users.detailTitle": "\nAnnuaire des utilisateurs",
  "admin.users.detailDescription":
    "\nSélectionnez un opérateur pour inspecter l'accès, les sessions, les préférences et l'historique de gouvernance récent.",
  "admin.users.searchLabel": "\nRechercher des utilisateurs",
  "admin.users.searchPlaceholder": "\nRechercher par nom ou par e-mail",
  "admin.users.roleFilterLabel": "\nRôle",
  "admin.users.roleAll": "\nTous les rôles",
  "admin.users.activityFilterLabel": "\nActivité",
  "admin.users.activityAll": "\nToutes les activités",
  "admin.users.applyFilters": "\nAppliquer des filtres",
  "admin.users.table.person": "\nPersonne",
  "admin.users.table.access": "\nAccès",
  "admin.users.table.sessions": "\nSéances",
  "admin.users.table.preferences": "\nPréférences",
  "admin.users.table.signal": "\nSignal",
  "admin.users.activeSessionCount": "\n{count} sessions actives",
  "admin.users.lastSeenNever": "\nAucune activité de session récente",
  "admin.users.chatEnabled": "\nChat activé",
  "admin.users.chatDisabled": "\nChat désactivé",
  "admin.users.notificationsEnabled": "\nNotifications activées",
  "admin.users.notificationsDisabled": "\nNotifications désactivées",
  "admin.users.empty": "\nAucun utilisateur ne correspond aux filtres actuels.",
  "admin.users.returnOverview": "\nRetour à l'aperçu",
  "admin.users.selectPrompt": "\nSélectionnez un utilisateur pour ouvrir le volet de détails.",
  "admin.users.detail.activeSessions": "\nSessions actives",
  "admin.users.detail.activeSessionsHint": "\nSur {count} sessions au total",
  "admin.users.detail.assignedTasks": "\nTâches assignées",
  "admin.users.detail.assignedTasksHint":
    "\nTravaux en cours appartenant à l'opérateur sélectionné",
  "admin.users.detail.approvals": "\nApprobations des documents",
  "admin.users.detail.approvalsHint":
    "\nBons de travail approuvés, commandes client et bons de commande attribués à cet opérateur",
  "admin.users.detail.editTitle": "\nAccès et préférences",
  "admin.users.detail.editDescription":
    "\nModifiez le rôle, les paramètres régionaux et la disponibilité de l'assistant pour l'opérateur sélectionné.",
  "admin.users.roleLabel": "\nRôle",
  "admin.users.save": "\nEnregistrer les modifications",
  "admin.users.savedSuccess": "\nAccès utilisateur et préférences mis à jour.",
  "admin.users.revokeSessions": "\nRévoquer des sessions",
  "admin.users.revokeSuccess":
    "\nToutes les sessions ont été révoquées pour l'opérateur sélectionné.",
  "admin.users.detail.revokeTitle": "\nRéinitialisation de la session",
  "admin.users.detail.revokeDescription":
    "\nForcer une nouvelle connexion dans le navigateur et les sessions mises en cache pour cet opérateur.",
  "admin.users.detail.sessionsTitle": "\nSessions récentes",
  "admin.users.detail.sessionsDescription":
    "Dernière activité de session et position d'expiration pour l'opérateur sélectionné.",
  "admin.users.detail.auditTitle": "\nActivité récente de gouvernance",
  "admin.users.detail.auditDescription":
    "\nEntrées d'audit récentes associées à l'opérateur sélectionné.",
  "admin.users.sessionExpiresAt": "\nExpire le {value}",
  "admin.users.sessionsEmpty": "\nAucune session récente enregistrée pour cet opérateur.",
  "admin.users.signal.privileged": "\nPrivilégié",
  "admin.users.signal.unverified": "\nNon vérifié",
  "admin.users.signal.concurrentSessions": "\nSessions simultanées",
  "admin.users.signal.preferencesMissing": "\nPréférences manquantes",
  "admin.users.signal.noSessions": "\nAucune séance",
  "admin.users.status.active": "\nActif",
  "admin.users.status.attention": "\nA besoin d'attention",
  "admin.users.status.inactive": "\nInactif",
  "admin.users.error.invalidRole": "\nSélectionnez un rôle valide avant d'enregistrer.",
  "admin.users.error.invalidName": "\nEntrez un nom d'affichage valide avant d'enregistrer.",
  "admin.users.error.notFound": "\nL'utilisateur sélectionné est introuvable.",
  "admin.users.error.saveFailed":
    "\nLes modifications utilisateur n'ont pas pu être enregistrées pour le moment.",
  "admin.locations.totalSites": "\nSites enregistrés",
  "admin.locations.totalSitesHint": "\nBases et installations gérées dans la plateforme",
  "admin.locations.activeSites": "\nSites actifs",
  "admin.locations.activeSitesHint":
    "\nSites actuellement marqués comme actifs pour les opérations",
  "admin.locations.totalDevices": "\nAppareils connectés",
  "admin.locations.totalDevicesHint": "\nAppareils Edge mappés au domaine géré",
  "admin.locations.devicesDescription":
    "\nEnregistrez et inspectez la couverture des appareils aux côtés de la structure du site qui en est propriétaire.",
  "admin.aiOps.provider": "\nFournisseur",
  "admin.aiOps.providerHint":
    "\nFournisseur d'exécution servant de nouvelles requêtes d'assistant et de prédiction",
  "admin.aiOps.model": "\nModèle",
  "admin.aiOps.sourceLabel": "\nSource : {value}",
  "admin.aiOps.predictions": "\nPrédictions",
  "admin.aiOps.predictionsHint": "\nEnregistrements de prédiction actifs dans tout le domaine",
  "admin.aiOps.annotations": "\nAnnotations",
  "admin.aiOps.annotationsHint":
    "\nLibellés d'évaluation et enregistrements d'annotations capturés",
  "admin.aiOps.datasetTitle": "\nOpérations sur les ensembles de données",
  "admin.aiOps.datasetDescription":
    "\nReliez les modifications d'exécution aux ensembles de données qui génèrent des prévisions, des rapports et un examen opérationnel.",
  "admin.aiOps.savedReports": "\nRapports enregistrés",
  "admin.aiOps.managedUsers": "\nUtilisateurs gérés",
  "admin.aiOps.copilotDescription":
    "\nUtilisez l'IA pour retracer la posture d'exécution jusqu'aux modifications du modèle, de l'ensemble de données et des opérateurs avant de modifier la configuration.",
  "admin.operationalContext.title": "\nContexte opérationnel",
  "admin.operationalContext.description":
    "\nCes valeurs proviennent de variables d'environnement du serveur et correspondent au contexte injecté dans les assistants IA : OPERATIONAL_CURRENCY, FACILITY_TIMEZONE, FACILITY_LATITUDE et FACILITY_LONGITUDE (la latitude et la longitude sont requises pour la météo).",
  "admin.operationalContext.currencyLabel": "\nDevise commerciale par défaut",
  "admin.operationalContext.facilityTimeLabel": "\nHeure locale de l'établissement",
  "admin.operationalContext.facilityTimeBody": "Fuseau horaire : {timezone} — {localTime}",
  "admin.operationalContext.facilityTimeEmpty":
    "\nDéfinissez FACILITY_TIMEZONE sur un fuseau horaire IANA (par exemple Europe/Londres) pour afficher l'horloge de l'installation.",
  "admin.operationalContext.coordinatesLabel": "\nCoordonnées de l'établissement (WGS84)",
  "admin.operationalContext.coordinatesBody": "Lat: {lat}, Lon: {lon}",
  "admin.operationalContext.coordinatesEmpty":
    "\nDéfinissez FACILITY_LATITUDE et FACILITY_LONGITUDE ensemble pour activer les coordonnées et la météo en direct lorsque l'accès au réseau sortant est autorisé.",
  "admin.operationalContext.weatherLabel": "\nAperçu météo",
  "admin.operationalContext.weatherOk":
    "\n{tempC} °C, vent {windKmh} km/h, code OMM {code} (Open-Meteo).",
  "admin.operationalContext.weatherSkippedAirgapped":
    "La météo n'est pas récupérée dans les déploiements AIRGAPPED.",
  "admin.operationalContext.weatherSkippedNoCoordinates":
    "\nConfigurez la latitude et la longitude de l'installation pour récupérer les conditions actuelles.",
  "admin.operationalContext.weatherUnavailable":
    "\nLes données météorologiques sont temporairement indisponibles. Réessayez plus tard.",
  "admin.integrations.totalDomains": "\nDomaines requis",
  "admin.integrations.totalDomainsHint":
    "\nSystèmes d'entreprise avec lesquels la plateforme doit intégrer",
  "admin.integrations.configured": "\nConfiguré",
  "admin.integrations.configuredHint":
    "\nIntégrations de domaines avec une entrée de registre système active",
  "admin.integrations.degraded": "\nDégradé",
  "admin.integrations.degradedHint":
    "\nLes systèmes enregistrés fonctionnent actuellement en dessous de la posture cible",
  "admin.integrations.offline": "\nHors ligne",
  "admin.integrations.offlineHint":
    "\nSystèmes enregistrés qui nécessitent actuellement une récupération ou un repli",
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
  "admin.branding.operationalCurrencyLabel": "Devise commerciale",
  "admin.branding.operationalCurrencyHint":
    "La devise utilisée pour la finance, le checkout et les documents reste un paramètre global d’exécution, pas une surcharge par marque.",
  "admin.branding.supportedLocalesLabel": "Langues prises en charge",
  "admin.branding.supportedLocalesHint":
    "Les shells de marque et les métadonnées passent par les dictionnaires de langue partagés livrés avec la plateforme.",
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
    "\nLes systèmes de gestion des ressources humaines, des finances, des achats et des documents d'entreprise restent les systèmes d'enregistrement. Ce registre suit le contrat d'intégration et la posture opérationnelle dans {brandName}.",
  "admin.integrations.formTitle": "\nRegistre d'intégration",
  "admin.integrations.formDescription":
    "\nCréez ou mettez à jour le contrat d'intégration pour un domaine d'entreprise requis.",
  "admin.integrations.registerTitle": "\nRegistre actuel",
  "admin.integrations.registerDescription":
    "\nTous les domaines d'entreprise requis, y compris les zones non configurées qui doivent encore être intégrées.",
  "admin.integrations.domainLabel": "\nDomaine d'entreprise",
  "admin.integrations.systemNameLabel": "\nNom du système",
  "admin.integrations.systemNamePlaceholder": "\nEntrez le nom du système d'entreprise",
  "admin.integrations.syncModeLabel": "\nMode de synchronisation",
  "admin.integrations.statusLabel": "\nÉtat opérationnel",
  "admin.integrations.ownerLabel": "\nPropriétaire du service",
  "admin.integrations.ownerPlaceholder": "\nEntrez le propriétaire ou l'équipe responsable",
  "admin.integrations.lastSyncLabel": "\nDernière synchronisation vérifiée",
  "admin.integrations.notesLabel": "\nRemarques",
  "admin.integrations.notesPlaceholder":
    "\nEnregistrer des notes contractuelles, opérationnelles ou limites de données",
  "admin.integrations.save": "\nEnregistrer l'intégration",
  "admin.integrations.saved": "\nRegistre d'intégration en entreprise mis à jour.",
  "admin.integrations.systemOfRecord": "\nSystème d'enregistrement",
  "admin.integrations.unconfigured": "\nNon configuré",
  "admin.integrations.domain.HR": "RH",
  "admin.integrations.domain.FINANCE": "\nFinances",
  "admin.integrations.domain.PROCUREMENT": "\nApprovisionnement",
  "admin.integrations.domain.DOCUMENT_MANAGEMENT": "\nGestion des documents",
  "admin.integrations.domain.CATERING_SERVICES": "\nRestauration / ESS",
  "admin.integrations.syncMode.API": "Interface API",
  "admin.integrations.syncMode.FILE_DROP": "\nDépôt de fichier",
  "admin.integrations.syncMode.MANUAL": "\nManuel",
  "admin.integrations.status.HEALTHY": "En bonne santé",
  "admin.integrations.status.DEGRADED": "\nDégradé",
  "admin.integrations.status.OFFLINE": "\nHors ligne",
  "admin.integrations.table.domain": "\nDomaine",
  "admin.integrations.table.system": "\nSystème",
  "admin.integrations.table.syncMode": "\nMode de synchronisation",
  "admin.integrations.table.owner": "\nPropriétaire",
  "admin.integrations.table.lastSync": "\nDernière synchronisation",
  "admin.integrations.table.updatedAt": "\nMise à jour",
  "admin.integrations.error.invalidSystemName":
    "\nEntrez un nom de système valide avant d'enregistrer.",
  "admin.integrations.error.invalidSelection":
    "\nSélectionnez un domaine d'entreprise, un mode de synchronisation et un état opérationnel valides.",
  "admin.integrations.error.saveFailed":
    "\nLe registre d'intégration d'entreprise n'a pas pu être sauvegardé pour le moment.",
  "admin.integrations.systemConfigDescription":
    "\nRegistre d'intégration des systèmes d'entreprise et posture opérationnelle.",
  "admin.integrations.dependenciesTitle": "\nCarte des dépendances",
  "admin.integrations.dependenciesDescription":
    "\nSuivez les surfaces opérationnelles, les propriétaires et les prochaines actions pour chaque dépendance d'entreprise requise.",
  "admin.integrations.dependency.systemLabel": "\nSystème",
  "admin.integrations.dependency.ownerLabel": "\nPropriétaire",
  "admin.integrations.dependency.syncLabel": "\nSynchronisation : {syncMode}",
  "admin.integrations.dependency.lastSyncLabel": "\nDernière synchronisation",
  "admin.integrations.dependency.updatedLabel": "\nDernière mise à jour",
  "admin.integrations.dependency.notesLabel": "\nNotes opérationnelles",
  "admin.integrations.dependency.impactLabel": "\nFlux de travail concernés",
  "admin.integrations.dependency.noteEmpty":
    "\nAucune note opérationnelle enregistrée pour le moment.",
  "admin.integrations.dependency.remediationLabel": "\nAction suivante",
  "admin.integrations.dependency.lastSyncEmpty":
    "\nAucune synchronisation réussie n'a encore été enregistrée.",
  "admin.integrations.dependency.updatedEmpty":
    "\nAucune mise à jour du registre n'a encore été enregistrée.",
  "admin.integrations.dependency.emptyTitle": "\nAucune posture de dépendance disponible",
  "admin.integrations.dependency.emptyDescription":
    "Actualisez la carte des dépendances d'intégration une fois que les données de l'espace de travail prises en charge sont disponibles.",
  "admin.integrations.dependency.errorTitle": "\nCarte des dépendances indisponible",
  "admin.integrations.dependency.errorDescription":
    "\nLe panneau des dépendances d'intégration n'a pas pu être actualisé. Réessayez la demande ou vérifiez le registre en amont.",
  "admin.integrations.dependency.posture.HEALTHY": "En bonne santé",
  "admin.integrations.dependency.posture.DEGRADED": "\nDégradé",
  "admin.integrations.dependency.posture.OFFLINE": "\nHors ligne",
  "admin.integrations.dependency.posture.UNCONFIGURED": "\nNon configuré",
  "admin.integrations.dependency.remediation.HEALTHY":
    "\nContinuez à surveiller la posture de synchronisation planifiée et maintenez l'espace de travail en aval aligné sur le système d'enregistrement actuel.",
  "admin.integrations.dependency.remediation.DEGRADED":
    "\nConsultez les dernières notes de synchronisation, confirmez la disponibilité en amont et supprimez le flux de travail dégradé avant que les opérateurs ne dépendent de données obsolètes.",
  "admin.integrations.dependency.remediation.OFFLINE":
    "\nAugmentez la panne de dépendance, faites basculer les équipes en aval vers des contrôles manuels et restaurez le système d'enregistrement avant le prochain cycle d'exploitation.",
  "admin.integrations.dependency.remediation.UNCONFIGURED":
    "\nEnregistrez le système d'enregistrement, attribuez un propriétaire et définissez le mode de synchronisation avant que cette dépendance ne soit considérée comme opérationnellement prête.",
  "admin.integrations.dependency.attentionTitle": "\nAttention à l'intégration requise",
  "admin.integrations.dependency.attentionDescription":
    "\nLes dépendances {degraded} dégradées, {offline} hors ligne et {unconfigured} non configurées nécessitent une action.",
  "admin.integrations.dependency.healthyTitle": "\nDépendances alignées",
  "admin.integrations.dependency.healthyDescription":
    "\nToutes les dépendances requises sont configurées et fonctionnent actuellement dans la posture attendue.",
  "admin.integrations.dependency.action.HR": "\nOuvrir les opérations utilisateur",
  "admin.integrations.dependency.action.FINANCE": "\nPlanification financière ouverte",
  "admin.integrations.dependency.action.PROCUREMENT": "\nEspace de travail de flotte ouvert",
  "admin.integrations.dependency.action.DOCUMENT_MANAGEMENT":
    "\nOuvrir l'espace de travail des rapports",
  "admin.integrations.dependency.action.CATERING_SERVICES": "\nEspace de travail ouvert",
  "admin.integrations.dependency.description.HR":
    "\nL'identité, le personnel et la couverture des opérateurs dépendent du fait que le système RH reste aligné sur les rôles et la propriété de la plateforme.",
  "admin.integrations.dependency.description.FINANCE":
    "\nLa posture budgétaire, les scénarios de planification et les contrôles financiers dépendent de la synchronisation du système financier enregistré.",
  "admin.integrations.dependency.description.PROCUREMENT":
    "\nLes engagements en matière d'approvisionnement, l'activité des fournisseurs et l'exécution de la flotte dépendent de la ponctualité des achats et des flux contractuels.",
  "admin.integrations.dependency.description.DOCUMENT_MANAGEMENT":
    "\nLes rapports, les approbations et les preuves documentaires dépendent de la disponibilité du système de gestion de documents partagé.",
  "admin.integrations.dependency.description.CATERING_SERVICES":
    "\nLa livraison du domaine, la préparation ESS et la coordination de la restauration dépendent du maintien de ce contrat de service opérationnel.",
  "admin.integrations.dependency.impact.HR.primary": "\nAttributions de rôles",
  "admin.integrations.dependency.impact.HR.secondary": "\nAvis d'accès privilégié",
  "admin.integrations.dependency.impact.HR.tertiary":
    "\nTransferts de préparation de la main-d'œuvre",
  "admin.integrations.dependency.impact.FINANCE.primary": "\nPlanification de scénarios",
  "admin.integrations.dependency.impact.FINANCE.secondary": "\nContrôles budgétaires",
  "admin.integrations.dependency.impact.FINANCE.tertiary": "\nPacks de reporting exécutif",
  "admin.integrations.dependency.impact.PROCUREMENT.primary": "Exécution du fournisseur",
  "admin.integrations.dependency.impact.PROCUREMENT.secondary":
    "\nPosture de livraison de la flotte",
  "admin.integrations.dependency.impact.PROCUREMENT.tertiary":
    "\nAcheminement des commandes commerciales",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.primary": "\nPacks de preuves",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.secondary":
    "\nFlux de travail d'approbation",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.tertiary": "\nPublication du rapport",
  "admin.integrations.dependency.impact.CATERING_SERVICES.primary": "\nPréparation à l'ESS",
  "admin.integrations.dependency.impact.CATERING_SERVICES.secondary":
    "\nCoordination de la livraison successorale",
  "admin.integrations.dependency.impact.CATERING_SERVICES.tertiary":
    "\nTransfert du support restauration",
  "admin.integrations.dependency.surface.HR": "\nUtilisateurs, rôles et préparation du personnel",
  "admin.integrations.dependency.surface.FINANCE":
    "\nBudgétisation, scénarios de planification et contrôle financier exécutif",
  "admin.integrations.dependency.surface.PROCUREMENT":
    "\nLivraison de la flotte, exécution des fournisseurs et coordination des achats",
  "admin.integrations.dependency.surface.DOCUMENT_MANAGEMENT":
    "\nRapports, ensembles de preuves et flux de travail de documents opérationnels",
  "admin.integrations.dependency.surface.CATERING_SERVICES":
    "\nSurfaces de livraison de succession, de restauration et de coordination ESS",
  "admin.security.privilegedUsers": "\nUtilisateurs privilégiés",
  "admin.security.privilegedUsersHint":
    "\nAdministrateurs détenant actuellement un accès privilégié",
  "admin.security.unverifiedPrivilegedUsers": "\nPrivilégié non vérifié",
  "admin.security.unverifiedPrivilegedUsersHint":
    "\nIl manque toujours une vérification par e-mail pour les identités privilégiées",
  "admin.security.concurrentSessionWarnings": "\nSessions simultanées",
  "admin.security.concurrentSessionWarningsHint":
    "\nOpérateurs avec plusieurs sessions actives nécessitant une révision",
  "admin.security.totalEvents": "\nÉvénements de sécurité 7j",
  "admin.security.totalEventsHint":
    "\nActivité de modification liée à l'authentification et à l'accès dans la fenêtre de sécurité actuelle",
  "admin.security.rbacTitle": "\nContrôle d'accès basé sur les rôles",
  "admin.security.rbacDescription":
    "\nExaminez la répartition des rôles, l'empreinte d'accès actif et la posture de vérification entre les opérateurs internes.",
  "admin.security.storageTitle": "\nPosition de stockage sécurisée des données",
  "admin.security.storageDescription":
    "\nSuivez les contrôles des limites de déploiement qui influencent la localité de stockage, la localité de référence et l'exposition externe.",
  "admin.security.auditTitle": "\nActivité de sécurité récente",
  "admin.security.auditDescription":
    "\nEntrées d'audit liées à l'authentification et à l'accès à partir de la fenêtre de sécurité actuelle de sept jours.",
  "admin.security.auditEmpty":
    "\nAucun événement de sécurité récent n'a été enregistré dans la fenêtre actuelle.",
  "admin.security.roleTable.role": "\nRôle",
  "admin.security.roleTable.users": "\nUtilisateurs",
  "admin.security.roleTable.activeSessions": "\nSessions actives",
  "admin.security.roleTable.unverified": "\nNon vérifié",
  "admin.security.authEvents": "\nÉvénements d'authentification",
  "admin.security.accessChangeEvents": "\nAccéder aux modifications",
  "admin.security.databaseLabel": "\nBase de données",
  "admin.governance.totalEvents": "\nÉvénements filtrés",
  "admin.governance.totalEventsHint":
    "\nÉvénements d'audit dans la tranche de gouvernance actuelle",
  "admin.governance.authEvents": "\nÉvénements d'authentification",
  "admin.governance.authEventsHint":
    "\nActivité de connexion et de déconnexion dans la tranche actuelle",
  "admin.governance.changeEvents": "\nModifier les événements",
  "admin.governance.changeEventsHint":
    "\nCréer, mettre à jour, approuver, supprimer et exporter des actions dans la portée",
  "admin.governance.searchLabel": "\nRechercher la gouvernance",
  "admin.governance.searchPlaceholder": "\nRechercher un acteur, une entité ou une demande ID",
  "admin.governance.actionLabel": "\nAction",
  "admin.governance.actionAll": "\nToutes les actions",
  "admin.governance.windowLabel": "\nFenêtre horaire",
  "admin.governance.window.24h": "\nDernières 24 heures",
  "admin.governance.window.7d": "\n7 derniers jours",
  "admin.governance.window.30d": "\n30 derniers jours",
  "admin.governance.window.all": "\nTout le temps",
  "admin.governance.applyFilters": "\nAppliquer des filtres",
  "admin.governance.exportFiltered": "\nExporter le CSV filtré",
  "admin.governance.requestId": "\nID de demande",
  "admin.governance.requestIdValue": "\nNuméro de demande {value}",
  "admin.governance.empty": "\nAucun événement de gouvernance ne correspond aux filtres actuels.",
  "admin.chat.overviewReviewLabel": "\nRésumer la posture",
  "admin.chat.overviewReviewPrompt":
    "Résumez la présentation actuelle de l'administrateur, mettez en évidence les anomalies parmi les utilisateurs, les ensembles de données et la gouvernance, et recommandez les prochaines actions administratives.",
  "admin.chat.overviewOpsLabel": "\nPlanifier les actions du centre de contrôle",
  "admin.chat.overviewOpsPrompt":
    "\nÀ l'aide de la présentation actuelle de l'administrateur, proposez un plan d'action hiérarchisé pour la gestion des utilisateurs, les emplacements, les opérations d'IA et la gouvernance.",
  "admin.chat.userReviewLabel": "\nVérifier l'utilisateur sélectionné",
  "admin.chat.userReviewPrompt":
    "\nExaminez l'utilisateur sélectionné, expliquez les risques d'accès, de session et de préférence, et recommandez les prochaines actions administratives.",
  "admin.chat.userOpsLabel": "\nProjet de plan de changement d'accès",
  "admin.chat.userOpsPrompt":
    "\nÀ l'aide de l'espace de travail actuel de gestion des utilisateurs, rédigez un plan précis pour mettre à jour les rôles, révoquer les sessions si nécessaire et communiquer les modifications.",
  "admin.chat.brandingReviewLabel": "Review brand posture",
  "admin.chat.brandingReviewPrompt":
    "Review the current brand register, identify domain, metadata, or theming gaps, and recommend the next branding actions.",
  "admin.chat.locationsReviewLabel": "\nExaminer l'empreinte périphérique",
  "admin.chat.locationsReviewPrompt":
    "\nExaminez les emplacements actuels et la position des appareils de périphérie, mettez en évidence les lacunes ou les anomalies et recommandez les prochaines actions opérationnelles.",
  "admin.chat.aiReviewLabel": "\nRéviser la posture de l'IA",
  "admin.chat.aiReviewPrompt":
    "\nExaminez l'environnement d'exécution actuel de l'IA et la situation de l'ensemble de données, expliquez les risques et recommandez les prochaines actions administratives.",
  "admin.chat.aiOpsLabel": "\nProjet de plan de déploiement de l'IA",
  "admin.chat.aiOpsPrompt":
    "\nÀ l'aide de l'espace de travail actuel des opérations d'IA, rédigez un plan de déploiement pour les modifications d'exécution, les impacts sur les ensembles de données et la communication avec l'opérateur.",
  "admin.chat.integrationsReviewLabel": "\nExaminer les intégrations d'entreprise",
  "admin.chat.integrationsReviewPrompt":
    "\nExaminez le registre d'intégration d'entreprise, identifiez les lacunes en matière d'intégration ou de résilience dans les systèmes RH, financiers, d'approvisionnement et documentaires, et recommandez les prochaines actions administratives.",
  "admin.chat.securityReviewLabel": "\nExaminer la posture de sécurité",
  "admin.chat.securityReviewPrompt":
    "\nExaminez l'espace de travail de sécurité actuel, résumez les risques RBAC, d'audit et de limite de stockage, et recommandez les prochaines actions de conformité.",
  "admin.chat.governanceReviewLabel": "\nExaminer l'activité de gouvernance",
  "admin.chat.governanceReviewPrompt":
    "\nExaminez l'espace de travail de gouvernance actuel, résumez les événements d'accès ou de modification notables et recommandez les prochaines actions de conformité.",
  "admin.audit.action.CREATE": "\nCréé",
  "admin.audit.action.UPDATE": "\nMise à jour",
  "admin.audit.action.DELETE": "\nSupprimé",
  "admin.audit.action.APPROVE": "Approuvé",
  "admin.audit.action.LOGIN": "\nConnecté",
  "admin.audit.action.LOGOUT": "\nDéconnecté",
  "admin.audit.action.EXPORT": "\nExporté",
  "admin.invite.title": "\nInvitations des utilisateurs",
  "admin.invite.description":
    "\nInvitez de nouveaux opérateurs par e-mail avec un rôle pré-attribué et une fenêtre d'expiration.",
  "admin.invite.emailLabel": "\nAdresse e-mail",
  "admin.invite.emailPlaceholder": "opérateur@exemple.com",
  "admin.invite.roleLabel": "\nRôle",
  "admin.invite.expiresLabel": "\nExpire dans (jours)",
  "admin.invite.send": "\nEnvoyer une invitation",
  "admin.invite.sent": "\nInvitation envoyée avec succès.",
  "admin.invite.pending": "\nEn attente",
  "admin.invite.expired": "\nExpiré",
  "admin.invite.accepted": "\nAccepté",
  "admin.invite.revoked": "\nRévoqué",
  "admin.invite.resend": "\nRenvoyer",
  "admin.invite.pendingTitle": "\nInvitations en attente",
  "admin.invite.pendingDescription":
    "\nInvitations en attente d'acceptation des opérateurs invités.",
  "admin.invite.table.email": "\nE-mail",
  "admin.invite.table.role": "\nRôle",
  "admin.invite.table.status": "\nStatut",
  "admin.invite.table.expiresAt": "\nExpire",
  "admin.invite.table.invitedBy": "\nInvité par",
  "admin.invite.table.createdAt": "\nEnvoyé",
  "admin.invite.empty": "\nAucune invitation en attente.",
  "admin.invite.error.invalidEmail": "\nSaisissez une adresse e-mail valide.",
  "admin.invite.error.invalidRole": "\nSélectionnez un rôle valide.",
  "admin.invite.error.sendFailed": "\nImpossible d'envoyer l'invitation pour le moment.",
  "admin.invite.error.alreadyInvited": "\nCet e-mail contient déjà une invitation en attente.",
  "admin.bulkImport.title": "\nImportation groupée d'utilisateurs",
  "admin.bulkImport.description":
    "\nTéléchargez un fichier CSV pour provisionner plusieurs comptes d'opérateur à la fois.",
  "admin.bulkImport.uploadLabel": "\nFichier CSV",
  "admin.bulkImport.uploadHint": "\nColonnes attendues : nom, email, rôle",
  "admin.bulkImport.previewTitle": "\nAperçu de l'importation",
  "admin.bulkImport.previewDescription":
    "\nExaminez les lignes analysées avant de confirmer l'importation.",
  "admin.bulkImport.confirmImport": "\nConfirmer l'importation",
  "admin.bulkImport.rowCount": "\n{count} lignes analysées",
  "admin.bulkImport.validRows": "\n{count} valide",
  "admin.bulkImport.errorRows": "\nErreurs {count}",
  "admin.bulkImport.table.row": "\nLigne",
  "admin.bulkImport.table.name": "\nNom",
  "admin.bulkImport.table.email": "\nE-mail",
  "admin.bulkImport.table.role": "\nRôle",
  "admin.bulkImport.table.status": "\nStatut",
  "admin.bulkImport.table.error": "\nErreur",
  "admin.bulkImport.statusValid": "\nValide",
  "admin.bulkImport.statusError": "\nErreur",
  "admin.bulkImport.imported": "\nLes utilisateurs de {count} ont été importés avec succès.",
  "admin.bulkImport.error.noFile": "\nSélectionnez un fichier CSV à télécharger.",
  "admin.bulkImport.error.parseFailed": "\nImpossible d'analyser le fichier CSV.",
  "admin.bulkImport.error.importFailed": "\nImpossible de terminer l'importation pour le moment.",
  "admin.bulkImport.error.noValidRows": "\nAucune ligne valide à importer.",
  "admin.bulkImport.validation.missingName": "\nNom manquant",
  "admin.bulkImport.validation.invalidEmail": "\nE-mail invalide",
  "admin.bulkImport.validation.invalidRole": "\nRôle invalide",
  "admin.health.title": "\nÉtat du système",
  "admin.health.description":
    "\nDiagnostics de plateforme en temps réel avec métriques système actualisées en direct.",
  "admin.health.uptime": "\nTemps de disponibilité",
  "admin.health.uptimeHint": "\nTemps écoulé depuis le démarrage du processus Bun",
  "admin.health.latencyP50": "\nLatence P50",
  "admin.health.latencyP50Hint": "\nLatence médiane des requêtes sur les échantillons récents",
  "admin.health.latencyP99": "\nLatence P99",
  "admin.health.latencyP99Hint": "\nLatence des requêtes de queue sur les échantillons récents",
  "admin.health.memoryUsage": "\nUtilisation de la mémoire",
  "admin.health.memoryUsageHint": "\nConsommation de mémoire de tas du runtime Bun",
  "admin.health.dbConnections": "\nÉtat de la base de données",
  "admin.health.dbConnectionsHint": "\nÉtat du pool de connexions PostgreSQL",
  "admin.health.errorRate": "\nTaux d'erreur",
  "admin.health.errorRateHint":
    "\nPourcentage de réponses avec le statut 5xx dans la fenêtre actuelle",
  "admin.health.refreshInterval": "\nActualisation automatique toutes les 5 secondes",
  "admin.health.statusOnline": "\nEn ligne",
  "admin.health.statusDegraded": "\nDégradé",
  "admin.health.statusOffline": "\nHors ligne",
  "admin.apiKeys.title": "\nGestion des clés API",
  "admin.apiKeys.description":
    "\nCréez, faites pivoter et révoquez des clés API pour les intégrations système.",
  "admin.apiKeys.create": "\nCréer une clé API",
  "admin.apiKeys.nameLabel": "\nNom de la clé",
  "admin.apiKeys.namePlaceholder": "\npar ex. Pipeline CI, agent de surveillance",
  "admin.apiKeys.scopeLabel": "\nPortée",
  "admin.apiKeys.scopeRead": "\nLire",
  "admin.apiKeys.scopeWrite": "\nÉcrivez",
  "admin.apiKeys.scopeAdmin": "\nAdministrateur",
  "admin.apiKeys.expiresLabel": "\nExpire dans (jours)",
  "admin.apiKeys.expiresNever": "\nJamais",
  "admin.apiKeys.lastUsed": "\nDernière utilisation",
  "admin.apiKeys.lastUsedNever": "\nJamais utilisé",
  "admin.apiKeys.revoke": "\nRévoquer",
  "admin.apiKeys.revokeTitle": "\nRévoquer la clé API",
  "admin.apiKeys.revokeDescription":
    "\nCette clé API sera définitivement désactivée. Cette action ne peut pas être annulée.",
  "admin.apiKeys.revokeConfirm": "\nRévoquer la clé",
  "admin.apiKeys.revoked": "\nLa clé API a été révoquée.",
  "admin.apiKeys.created":
    "\nClé API créée. Copiez la clé maintenant : elle ne sera plus affichée.",
  "admin.apiKeys.table.name": "\nNom",
  "admin.apiKeys.table.prefix": "\nPréfixe de clé",
  "admin.apiKeys.table.scope": "\nPortée",
  "admin.apiKeys.table.createdBy": "\nCréé par",
  "admin.apiKeys.table.expiresAt": "\nExpire",
  "admin.apiKeys.table.lastUsedAt": "\nDernière utilisation",
  "admin.apiKeys.table.status": "\nStatut",
  "admin.apiKeys.table.actions": "\nActions",
  "admin.apiKeys.statusActive": "\nActif",
  "admin.apiKeys.statusRevoked": "\nRévoqué",
  "admin.apiKeys.statusExpired": "\nExpiré",
  "admin.apiKeys.empty": "\nAucune clé API n'a été créée.",
  "admin.apiKeys.error.invalidName": "\nEntrez un nom de clé valide.",
  "admin.apiKeys.error.invalidScope": "\nSélectionnez une étendue valide.",
  "admin.apiKeys.error.createFailed": "Impossible de créer la clé API pour le moment.",
  "admin.apiKeys.error.revokeFailed": "\nImpossible de révoquer la clé API pour le moment.",
  "admin.lms.title": "\nSystème de gestion de l'apprentissage",
  "admin.lms.description":
    "\nGérer le contenu éducatif, les programmes et le suivi des progrès des apprenants.",
  "admin.lms.courses.title": "\nCours",
  "admin.lms.modules.title": "\nModules",
  "admin.lms.enrollments.title": "\nInscriptions",
  "admin.lms.createCourse": "\nCréer un cours",
  "admin.lms.table.courseName": "\nNom du cours",
  "admin.lms.table.instructor": "\nInstructeur",
  "admin.lms.table.enrolled": "\nInscrit",
  "admin.lms.table.completionRate": "\nTaux de complétion",
  "admin.lms.status.published": "\nPublié",
  "admin.lms.status.draft": "\nBrouillon",
  "admin.lms.status.archived": "\nArchivé",

  "admin.webhooks.title": "\nConfiguration du webhook",
  "admin.webhooks.description":
    "\nEnregistrez les points de terminaison du webhook pour la diffusion d'événements en temps réel vers des systèmes externes.",
  "admin.webhooks.urlLabel": "\nURL du point de terminaison",
  "admin.webhooks.urlPlaceholder": "\nhttps://example.com/webhooks/platform",
  "admin.webhooks.secretLabel": "\nSecret de signature",
  "admin.webhooks.eventsLabel": "\nÉvénements abonnés",
  "admin.webhooks.eventsPlaceholder": "\nworkOrder.created, tâche.completed",
  "admin.webhooks.eventsHint":
    "\nTypes d'événements séparés par des virgules (par exemple, workOrder.created, task.completed)",
  "admin.webhooks.activeLabel": "\nActif",
  "admin.webhooks.create": "\nEnregistrer le webhook",
  "admin.webhooks.created": "\nWebhook enregistré avec succès.",
  "admin.webhooks.test": "\nEnvoyer le test",
  "admin.webhooks.deliveryLog": "\nJournal de livraison",
  "admin.webhooks.table.url": "\nPoint de terminaison",
  "admin.webhooks.table.events": "\nÉvénements",
  "admin.webhooks.table.status": "\nStatut",
  "admin.webhooks.table.lastDelivered": "\nDernière livraison",
  "admin.webhooks.table.createdBy": "\nCréé par",
  "admin.webhooks.table.actions": "\nActions",
  "admin.webhooks.statusActive": "\nActif",
  "admin.webhooks.statusInactive": "\nInactif",
  "admin.webhooks.empty": "\nAucun webhook n'a été enregistré.",
  "admin.webhooks.deleteTitle": "\nSupprimer le webhook",
  "admin.webhooks.deleteDescription": "\nCe webhook sera définitivement désactivé et supprimé.",
  "admin.webhooks.deleteConfirm": "\nSupprimer le webhook",
  "admin.webhooks.deleted": "\nLe webhook a été supprimé.",
  "admin.webhooks.error.invalidUrl": "\nSaisissez une URL HTTPS valide.",
  "admin.webhooks.error.invalidEvents": "\nSélectionnez au moins un type d'événement.",
  "admin.webhooks.error.createFailed": "\nImpossible d'enregistrer le webhook pour le moment.",
  "admin.webhooks.error.deleteFailed": "\nImpossible de supprimer le webhook pour le moment.",
  "system.databaseUnavailable":
    "\nL'accès à la base de données en direct n'est pas configuré. Définissez DATABASE_URL pour activer les itinéraires basés sur des données.",
  "brand.error.hostNotConfigured": "\nCet hôte n’est pas configuré pour un contexte de marque.",
  "kpi.total_assets": "\nActif total",
  "kpi.active_tasks": "\nTâches actives",
  "kpi.predictions_due": "\nPrédictions dues",
  "kpi.utilisation_rate": "\nTaux d'utilisation",
  "kpi.overdue_maintenance": "\nMaintenance en retard",
  "kpi.depreciation_total": "\nTotal de l'amortissement",
  "common.title": "Title",
  "common.compare": "Compare",
  "common.confidence": "Confidence",
  "common.rationale": "Rationale",
  "common.savedView": "Saved view",
  "common.whatChanged": "What changed",
  "common.back": "\nRetour",
  "common.close": "\nFermer",
  "common.closeIcon": "✖",
  "common.confirmDelete": "\nSupprimer cet élément ?",
  "common.delete": "\nSupprimer",
  "common.notFound": "\nIntrouvable",
  "common.yes": "\noui",
  "common.no": "\nnon",
  "common.retry": "\nRéessayez",
  "common.key.alt": "\nAlt",
  "common.key.enter": "\nEntrez",
  "common.key.shift": "\nMaj",
  "common.open": "\nOuvert",
  "common.refresh": "\nActualiser",
  "common.selectionNone": "\nAucun élément sélectionné",
  "common.selectionOne": "\nUn",
  "common.selectAllVisible": "\nSélectionnez tout ce qui est visible",
  "common.selectAllResults": "\nSélectionner tous les résultats",
  "common.lastUpdated": "\nDernière mise à jour",
  "common.updatedAt": "\nMise à jour",
  "common.live": "\nEn direct",
  "common.loading": "\nChargement",
  "common.offlineMessage": "\nVous semblez être hors ligne. Veuillez vérifier votre connexion.",
  "common.tabs": "\nOnglets",
  "common.toolbar": "\nBarre d'outils",
  "common.emptyValue": "Non disponible",
  "common.filterChipAria": "\nSupprimer le filtre {label} : {value}",
  "common.pending": "En attente",
  "common.enabled": "\nActivé",
  "common.disabled": "\nDésactivé",
  "common.percentFormat": "\n{value}%",
  "common.optional": "\nfacultatif",
  "common.system": "\nsystème",
  "common.unknownRole": "\nInconnu",
  "common.status": "\nStatut",
  "common.actions": "\nActions",
  "common.confirm": "\nConfirm",
  "common.confirmAction": "\nEtes-vous sûr ?",
  "common.createdBy": "\nCréé par",
  "common.date": "\nDate",
  "common.sharedBy": "\nPartagé par",
  "common.notifications": "\nNotifications",
  "common.period": "\nPériode",
  "common.empty": "\nAucune donnée disponible",
  "common.emptyTable": "\nAucune donnée à afficher",
  "common.no_results": "\nAucun résultat",
  "common.emptySearch": "\nAucun résultat. Essayez d'ajuster vos filtres.",
  "common.error": "\nQuelque chose s'est mal passé",
  "common.success": "\nSuccès",
  "workspace.livePanel.lastUpdatedEmpty": "\nEn attente de la première actualisation",
  "workspace.livePanel.emptyDescription":
    "\nCe panel en direct n'a pas encore de données. Actualisez la surface ou terminez d'abord le flux de travail en amont.",
  "workspace.livePanel.errorDescription":
    "\nCe panneau en direct n'a pas pu être actualisé. Réessayez la demande ou vérifiez le service en amont.",
  "assets.table.empty":
    "\nAucun actif pour l'instant. Enregistrez votre premier appareil pour commencer.",
  "assets.table.emptyAction": "\nAjouter un appareil",
  "finance.depreciation.table.empty":
    "\nAucune donnée d'amortissement. Les actifs avec valeurs d'achat et comptable apparaîtront ici.",
  "finance.depreciation.table.emptyAction": "\nAfficher les actifs",
  "common.unknownError": "\nErreur inconnue",
  "common.unauthorized": "\nVous n'avez pas accès à cette vue",
  "errors.crossOriginRequestBlocked": "\nRequête d'origine croisée bloquée",
  "errors.invalidFileName": "\nNom de fichier invalide",
  "errors.invalidOriginHeader": "\nEn-tête d'origine invalide",
  "errors.requestOriginRequired": "L'origine de la demande n'a pas pu être vérifiée",
  "errors.pageTitle": "\nErreur",
  "errors.backToDashboard": "\nRetour au tableau de bord",
  "errors.genericMessage":
    "\nQuelque chose s'est mal passé. Veuillez réessayer ou revenir au tableau de bord.",
  "common.pagination.page": "\nPage {page} de {totalPages}",
  "common.pagination.ariaLabel": "\nPagination",
  "common.pagination.resultCount": "{start}–{end} sur {count}",
  "common.pagination.range": "{start}–{end} sur {total}",
  "common.pagination.pageSize": "\nArticles par page",
  "common.pagination.previous": "\nPage précédente",
  "common.pagination.next": "\nPage suivante",
  "common.pagination.pageN": "\nPage {n}",
  "common.pagination.ellipsis": "\nAutres pages",
  "common.sort.asc": "\nTrier par ordre croissant",
  "common.sort.desc": "\nTrier par ordre décroissant",
  "common.sort.unsorted": "\nTrier par cette colonne",
  "chat.bubble.title": "\n.bao Chat",
  "chat.bubble.placeholder": "\nAsk through .bao...",
  "chat.bubble.send": "\nEnvoyer",
  "chat.bubble.open": "\nOpen .bao chat",
  "chat.bubble.close": "\nFermer le chat",
  "chat.bubble.intro":
    "\nRenseignez-vous sur les actifs, les tâches, les prévisions ou l'utilisation.",
  "chat.bubble.assistantName": "\n.bao",
  "chat.bubble.emptyMessageError": "\nSaisissez un message avant de l'envoyer.",
  "chat.bubble.sending": "\nEnvoi...",
  "chat.bubble.networkError": "\nErreur réseau. Veuillez réessayer.",
  "chat.bubble.voiceStart": "\nDémarrer la saisie vocale",
  "chat.bubble.voiceStop": "\nArrêter la saisie vocale",
  "chat.bubble.voiceUnsupported":
    "\nLa saisie vocale n'est pas prise en charge dans ce navigateur.",
  "chat.bubble.voiceListening": "\nÀ l'écoute...",
  "chat.bubble.contextSelectionLabel": "\nSélection",
  "chat.bubble.contextTitle": "\nContexte intelligent",
  "chat.bubble.contextSubtitle":
    "\nLe contexte de la page actuelle, le texte sélectionné et les fichiers supprimés sont transférés dans la réponse suivante.",
  "chat.bubble.contextPageLabel": "\nPage",
  "chat.bubble.contextAttachmentLabel": "\nFichiers",
  "chat.bubble.addFiles": "\nAjouter des fichiers",
  "chat.bubble.smartChipSummary": "\nRésumer la page",
  "chat.bubble.smartChipSummaryPrompt": "\nRésumez le contexte le plus important sur cette page.",
  "chat.bubble.smartChipActions": "\nActions suivantes",
  "chat.bubble.smartChipActionsPrompt":
    "\nIdentifiez les prochaines actions en fonction du contexte de la page actuelle.",
  "chat.bubble.smartChipSelection": "\nExpliquez la sélection",
  "chat.bubble.smartChipSelectionPrompt":
    "\nExpliquez le contenu sélectionné dans le contexte de cette page.",
  "chat.bubble.dropHint": "\nDéposez des images ou des documents ici, ou cliquez pour joindre.",
  "chat.bubble.dropMeta":
    "\nLes images sont envoyées aux fournisseurs multimodaux lorsqu'elles sont prises en charge. Les documents contribuent au contexte extrait.",
  "chat.bubble.composeLabel": "\nInvite",
  "chat.bubble.composeHint":
    "\nAppuyez sur Entrée pour envoyer. Utilisez Shift+Entrée pour une nouvelle ligne.",
  "chat.bubble.attachmentMetadataOnly": "\nmétadonnées uniquement",
  "chat.bubble.attachmentUnsupported":
    "\nFichier non pris en charge. Utilisez un document image, PDF, TXT, MD, CSV, JSON, HTML ou XML.",
  "chat.bubble.attachmentLimitReached":
    "\nVous pouvez joindre jusqu'à {count} fichiers par message.",
  "chat.bubble.attachmentImageTooLarge":
    "\nL'image jointe dépasse la limite de taille du chat .bao.",
  "chat.bubble.attachmentDocumentTooLarge":
    "\nLa pièce jointe au document dépasse la taille limite du chat .bao.",
  "chat.bubble.attachmentRemove": "\nSupprimer la pièce jointe",
  "chat.bubble.defaultContextPrompt":
    "\nUtilisez le contexte de page et les pièces jointes disponibles pour vous aider avec cette demande.",
  "chat.bubble.advisoryOnly":
    "AVIS UNIQUEMENT – nécessite une approbation humaine avant exécution.",

  "chat.systemPrompt.pageContext": "\n\n\n**Contexte de la page actuelle :**",
  "chat.systemPrompt.selectionContext": "\n\n\n**Texte de la page sélectionnée :**",
  "chat.systemPrompt.attachmentContext": "\n\n\n**Contexte du fichier joint :**",
  "chat.systemPrompt.relevantDocs":
    "\n\n\n**Documentation pertinente (à utiliser pour éclairer votre réponse) :**\n",
  "chat.systemPrompt.operationalContextHeader": "\n\n\n**Contexte opérationnel :**",
  "chat.systemPrompt.operationalCurrencyLine": "\n- Devise commerciale par défaut : {currency}",
  "chat.systemPrompt.facilityLocalTimeLine":
    "\n- Heure locale de l'établissement ({timezone}) : {localTime}",
  "chat.systemPrompt.facilityWeatherLine":
    "- Aperçu météo de l'installation (Open-Meteo) : {tempC} °C, vent {windKmh} km/h, code OMM {code}.",
  "chat.error.network": "\nErreur réseau. Veuillez réessayer.",
  "chat.error.auth": "\nL'authentification a échoué. Veuillez vérifier votre clé API.",
  "chat.error.rateLimit": "\nLimite de débit dépassée. Veuillez réessayer plus tard.",
  "chat.error.invalidResponse": "\nRéponse non valide du service AI.",
  "chat.error.providerError": "Erreur : {message}",
  "chat.error.httpStatus": "\nHTTP {status}",
  "context7.error.fetchFailed": "\nLa récupération de la documentation Context7 a échoué.",
  "context7.error.rateLimitExceeded": "\nLimite de débit Context7 dépassée. Réessayez plus tard.",
  "context7.error.apiKeyInvalid": "\nClé API Context7 non valide.",
  "context7.error.searchFailed": "\nÉchec de la recherche Context7 : {status}",
  "context7.error.responseParseFailed": "\nÉchec de l'analyse de la réponse Context7.",
  "context7.error.contextFailed": "\nÉchec du contexte Context7 : {status}",
  "context7.error.textReadFailed": "\nÉchec de la lecture du texte Context7.",
  "context7.error.jsonParseFailed": "\nÉchec de l'analyse JSON Context7.",
  "auth.signIn.rememberMe": "\nSouviens-toi de moi",
  "auth.signIn.recoveryHelp":
    "\nMot de passe oublié ? Utilisez le flux de récupération de votre organisation.",
  "auth.signIn.accountProvisioning":
    "\nNouveau sur la plateforme ? Contactez votre administrateur pour la configuration du compte.",
  "auth.signIn.requestAccess": "Request access",
  "auth.signIn.forgotPasswordLink": "\nMot de passe oublié ?",
  "auth.signIn.createAccount": "\nCréer un nouveau compte",
  "auth.signIn.validationEmail": "\nEntrez une adresse e-mail valide",
  "auth.signIn.validationPassword": "\nLe mot de passe doit comporter au moins 8 caractères",
  "auth.signIn.heroAlt": "\nIllustration de connexion sécurisée",
  "auth.signIn.errorInvalidCredentials": "\nEmail ou mot de passe invalide. Veuillez réessayer.",
  "auth.signIn.errorGeneric": "\nLa connexion a échoué. Veuillez réessayer.",
  "auth.signIn.loggedOut": "\nVous avez été déconnecté. Veuillez vous reconnecter.",
  "auth.signIn.securityEyebrow": "\nPosture de sécurité",
  "auth.signIn.contextTitle": "\nContexte de connexion",
  "auth.signIn.contextDescription":
    "\nRenvoyez les utilisateurs au bon espace de travail, gardez la récupération à proximité et rendez la posture de sécurité visible avant l'authentification.",
  "auth.signIn.destinationLabel": "\nDestination de retour",
  "auth.signIn.capabilitiesLabel": "\nMéthodes d'authentification activées",
  "auth.signIn.capabilityPasswordOnly":
    "\nL'authentification par mot de passe est actuellement activée.",
  "auth.signIn.capabilityPasswordPasskey":
    "\nL'authentification par mot de passe et par clé d'accès est activée pour cet espace de travail.",
  "auth.signIn.capabilityPasswordSso":
    "\nLe mot de passe et l'authentification unique sont activés pour cet espace de travail.",
  "auth.signIn.capabilityPasswordPasskeySso":
    "\nLe mot de passe, la clé d'accès et l'authentification unique sont activés pour cet espace de travail.",
  "auth.signIn.passkeyLabel": "\nOptions d'authentification",
  "auth.signIn.passkeyValue": "\nMot de passe aujourd'hui, mot de passe et SSO prêts",
  "auth.signIn.methodTitle": "\nMéthodes d'authentification",
  "auth.signIn.methodDescription":
    "\nChoisissez le chemin de connexion pour cet espace de travail. Le mot de passe reste disponible même lorsque l'identité d'entreprise est activée.",
  "auth.signIn.methodPasswordTitle": "\nConnexion par mot de passe",
  "auth.signIn.methodPasswordDescription":
    "\nUtilisez votre e-mail et votre mot de passe pour accéder directement à l'espace de travail demandé.",
  "auth.signIn.methodPasswordBadge": "\nPar défaut",
  "auth.signIn.methodPasswordAction": "\nUtiliser le mot de passe",
  "auth.signIn.methodPasskeyTitle": "\nConnexion par passkey",
  "auth.signIn.methodPasskeyDescription":
    "\nUtilisez une passkey enregistrée sur cet appareil pour vous authentifier sans saisir votre mot de passe.",
  "auth.signIn.methodPasskeyAction": "Continuer avec une passkey",
  "auth.signIn.methodSsoTitle": "\nAuthentification unique",
  "auth.signIn.methodSsoDescription":
    "\nContinuez avec le fournisseur d'identité de votre organisation et revenez à l'espace de travail demandé après vérification.",
  "auth.signIn.methodSsoBadge": "\nRecommandé",
  "auth.signIn.methodSsoAction": "Continuer avec SSO",
  "auth.signIn.passkeyAutoFillHint":
    "\nSi votre navigateur le prend en charge, une passkey enregistrée peut apparaître dans le remplissage automatique de cette page.",
  "auth.signIn.passkeyPending": "\nTerminez la vérification par passkey pour continuer.",
  "auth.signIn.errorPasskeyUnavailable":
    "\nLa connexion par passkey n'est pas disponible dans ce navigateur.",
  "auth.signIn.errorPasskeyFailed":
    "\nLa connexion par passkey n’a pas pu être terminée. Veuillez réessayer.",
  "auth.signIn.errorSsoUnavailable":
    "\nL’authentification unique n’est pas encore disponible pour cet espace de travail.",
  "auth.signIn.errorSsoStart":
    "\nL'authentification unique n'a pas pu être démarrée. Veuillez réessayer.",
  "auth.signIn.progressTitle": "\nFlux de connexion",
  "auth.signIn.progressDescription":
    "\nConfirmez la destination, authentifiez-vous, puis vérifiez la posture de sécurité avant d'entrer dans l'espace de travail.",
  "auth.signIn.progressStep.destination": "\nDestination",
  "auth.signIn.progressStep.authenticate": "\nAuthentifier",
  "auth.signIn.progressStep.review": "\nAccès en revue",
  "auth.signIn.securityPointOne":
    "\nL'accès limité aux rôles maintient les surfaces financières, opérationnelles et de reporting isolées.",
  "auth.signIn.securityPointTwo":
    "\nLes flux de travail rendus par le serveur réduisent l'exposition côté client aux données opérationnelles.",
  "auth.signIn.securityPointThree":
    "\nLes actions sur les actifs, les tâches et les rapports basés sur un audit restent traçables après la connexion.",
  "auth.password.showPassword": "\nAfficher le mot de passe",
  "auth.password.hidePassword": "\nMasquer le mot de passe",
  "apiExplorer.page.eyebrow": "\nOutils développeur",
  "apiExplorer.title": "\nExplorateur d'API",
  "api.docs.title": "Baohaus API",
  "api.docs.description": "Public, operations, and partner APIs surfaced by the Baohaus platform.",
  "apiExplorer.subtitle":
    "\nParcourez tous les itinéraires, points de terminaison et surfaces enregistrés",
  "apiExplorer.searchLabel": "\nRechercher des itinéraires",
  "apiExplorer.searchPlaceholder": "\nFiltrer par chemin ou méthode",
  "apiExplorer.filters.title": "\nAffiner l'inventaire des itinéraires",
  "apiExplorer.filters.description":
    "\nFiltrez le manifeste d'itinéraire enregistré par surface ou requête.",
  "apiExplorer.filters.surface": "\nSurface",
  "apiExplorer.table.index": "N°",
  "apiExplorer.table.method": "\nMéthode",
  "apiExplorer.table.path": "\nChemin",
  "apiExplorer.table.surface": "\nSurface",
  "apiExplorer.table.action": "\nItinéraire ouvert",
  "apiExplorer.summary.filtered": "\nFiltré",
  "apiExplorer.summary.filteredDescription":
    "\nItinéraires actuellement visibles dans cet espace de travail",
  "apiExplorer.summary.total": "\nTotal",
  "apiExplorer.summary.totalDescription": "\nItinéraires enregistrés dans l'application",
  "apiExplorer.summary.htmlDescription": "\nPages SSR disponibles dans le shell authentifié",
  "apiExplorer.summary.apiDescription":
    "\nPoints de terminaison de l'API des opérations et de la plateforme",
  "apiExplorer.summary.regionAria": "\nRésumé de l'itinéraire de l'API Explorer",
  "apiExplorer.results.title": "\nInventaire des itinéraires",
  "apiExplorer.results.initialLimitTitle": "\nAffichage des {shown} premières routes",
  "apiExplorer.results.initialLimitDescription":
    "\nUtilisez les filtres de surface ou la recherche pour examiner l’inventaire complet des {total} routes enregistrées.",
  "apiExplorer.results.summary": "\n{filtered} filtré / {total} total",
  "apiExplorer.empty.title": "\nAucun itinéraire ne correspond à ces filtres",
  "apiExplorer.empty.description":
    "\nEffacez les filtres actuels ou élargissez le terme de recherche pour inspecter davantage l'inventaire des itinéraires.",
  "apiExplorer.openHtmlAria": "\nItinéraire de l'espace de travail ouvert",
  "apiExplorer.openEndpointAria": "\nOuvrir le point de terminaison",
  "apiExplorer.tab.all": "\nTous",
  "apiExplorer.tab.api": "Interface API",
  "apiExplorer.tab.html": "Vue HTML",
  "apiExplorer.tab.static": "\nStatique",
  "apiExplorer.tab.auth": "\nAuth",
  "nav.apiExplorer": "\nExplorateur d'API",
  "customisation.title": "\nPersonnalisation",
  "customisation.subtitle": "\nThème, préférences et options d'affichage",
  "customisation.theme": "\nThème",
  "customisation.themeDescription": "\nChoisissez le mode clair ou sombre pour l'interface",
  "customisation.preferences": "\nPréférences",
  "customisation.lightMode": "\nMode d'éclairage",
  "customisation.preferencesDescription": "\nPréférences d'affichage et de notification.",
  "customisation.chatBubble": "\nAfficher la bulle de discussion IA sur le tableau de bord",
  "customisation.workspaceDefaults.title": "\nValeurs par défaut de l'espace de travail",
  "customisation.workspaceDefaults.subtitle":
    "\nDéfinissez la page de destination et les assistants qui façonnent votre point de départ quotidien.",
  "customisation.autoSaveHint": "Les modifications sont enregistrées automatiquement",
  "customisation.workspacePresets.title": "\nPréréglages de l'espace de travail",
  "customisation.workspacePresets.subtitle":
    "\nChoisissez les valeurs par défaut de Task-Workbench qui restent épinglées aux cookies de votre espace de travail.",
  "customisation.workspacePresets.primaryView": "\nVue des tâches principales",
  "customisation.workspacePresets.secondaryView": "\nVue des tâches secondaires",
  "customisation.workspacePresets.taskView.activeBoard": "\nTableau actif",
  "customisation.workspacePresets.taskView.activeBoardDescription":
    "\nOuvrez le tableau de flux sur les travaux actifs déjà en exécution.",
  "customisation.workspacePresets.taskView.triageBoard": "\nTableau de triage",
  "customisation.workspacePresets.taskView.triageBoardDescription":
    "\nPartez du retard et des ébauches de travail qui nécessitent encore une décision de l'opérateur.",
  "customisation.workspacePresets.taskView.dispatchQueue": "File d'attente de répartition",
  "customisation.workspacePresets.taskView.dispatchQueueDescription":
    "Ouvrez la file d'attente avec le travail non attribué prêt pour la dotation en personnel et la planification.",
  "customisation.workspacePresets.taskView.slaQueue": "\nFile d'attente SLA",
  "customisation.workspacePresets.taskView.slaQueueDescription":
    "\nContinuez à travailler bientôt avec la pression des délais visible par défaut.",
  "customisation.workspacePresets.taskView.myQueue": "\nMa file d'attente",
  "customisation.workspacePresets.taskView.myQueueDescription":
    "\nCommencez par les tâches déjà possédées par l'opérateur actuel.",
  "customisation.defaultLanding.title": "\nPage de destination par défaut",
  "customisation.defaultLanding.description":
    "\nChoisissez quel espace de travail s'ouvre immédiatement après la connexion.",
  "digitalTwin.view3D": "\nVue 3D",
  "digitalTwin.view2D": "\nVue 2D",
  "digitalTwin.viewToggle": "\nBasculement de la vue jumelle numérique",
  "digitalTwin.filters": "\nFiltres",
  "digitalTwin.overlays": "\nSuperpositions",
  "digitalTwin.loadModel": "\nCharger le modèle USD",
  "digitalTwin.filter.showHotspots": "\nAfficher les points chauds",
  "digitalTwin.filter.showGrid": "\nAfficher la grille",
  "digitalTwin.filter.showAssetLabels": "\nAfficher les libellés des éléments",
  "digitalTwin.badge.view3D": "Vue 3D",
  "digitalTwin.badge.stream": "Flux SSE",
  "digitalTwin.error.modelLoadFailed":
    "\nLe chargement du modèle a échoué. Affichage de la solution de secours.",
  "digitalTwin.error.viewerInitFailed": "\nL'initialisation de la visionneuse 3D a échoué.",
  "nav.collapseSidebar": "\nRéduire la barre latérale",
  "nav.expandSidebar": "\nDévelopper la barre latérale",
  "nav.commandPalette": "\nPalette de commandes",
  "nav.commandPaletteHint": "\nRechercher des pages, des ressources, des tâches et des actions...",
  "nav.commandPaletteOpen": "\nOuvrir la palette de commandes",
  "nav.commandPaletteDismissKey": "\nÉchap",
  "nav.commandPaletteEmpty": "\nAucun résultat trouvé",
  "nav.commandPaletteNavigation": "\nNavigation",
  "nav.commandPaletteAssets": "\nActifs",
  "nav.commandPaletteTasks": "\nTâches",
  "nav.commandPaletteActions": "\nActions",
  "common.sortAsc": "\nTrier par ordre croissant",
  "common.sortDesc": "\nTrier par ordre décroissant",
  "common.sortNone": "\nNon trié",
  "common.bulkSelect": "\nSélectionnez",
  "common.bulkActions": "\nActions groupées",
  "common.bulkSelectAll": "\nTout sélectionner",
  "common.clearFilters": "\nSupprimer tous les filtres",
  "common.clearSelection": "\nEffacer la sélection",
  "common.selectedCount": "\n{selected} sur {total} sélectionné(s)",
  "common.stats": "\nStatistiques",
  "common.dashboard": "\nTableau de bord",
  "filter.label": "\nFiltrer les résultats",
  "filter.resultCount": "\n{count} résultats",
  "list.empty.description": "\nAucun élément à afficher",
  "nav.no_tiles": "\nAucune tuile de navigation",
  "nav.no_tiles.description": "\nAucun élément disponible dans cette section",
  "common.filter.search": "\nRechercher…",
  "common.markReviewed": "\nMarquer comme révisé",
  "common.filterChipClear": "\nSupprimer le filtre",
  "common.clearAll": "\nTout effacer",
  "common.exportCsv": "\nExporter CSV",
  "common.dateRange": "\nPlage de dates",
  "common.dateRange.7d": "\n7 derniers jours",
  "common.dateRange.30d": "\n30 derniers jours",
  "common.dateRange.90d": "\n90 derniers jours",
  "common.dateRange.custom": "\nPlage personnalisée",
  "common.last7Days": "\n7 derniers jours",
  "common.last30Days": "\n30 derniers jours",
  "common.last90Days": "\n90 derniers jours",
  "common.allTime": "\nTout le temps",
  "common.currentQuarter": "\nTrimestre en cours",
  "common.lastQuarter": "\nDernier trimestre",
  "common.yearToDate": "\nAnnée à ce jour",
  "common.addAnother": "\nAjoutez un autre",
  "common.edit": "\nModifier",
  "common.save": "\nEnregistrer",
  "common.cancel": "\nAnnuler",
  "common.noData": "\nAucune donnée disponible",
  "common.tryAgain": "\nRéessayez",
  "common.loadingSkeleton": "\nChargement du contenu",
  "common.stepOf": "\nÉtape {current} de {total}",
  "common.getStarted": "\nCommencez",
  "common.learnMore": "\nEn savoir plus",
  "common.viewAll": "\nTout afficher",
  "common.collapse": "\nRéduire",
  "common.expand": "\nDévelopper",
  "assets.bulkExport": "\nExporter la sélection",
  "assets.bulkStatusUpdate": "\nMettre à jour l'état",
  "assets.bulkExportSuccess": "\nExportation préparée pour les actifs {count}",
  "assets.bulkStatusSuccess": "\nMise à jour de l'état en file d'attente pour les éléments {count}",
  "assets.empty": "\nAucun élément trouvé",
  "assets.emptyCta": "\nAjouter un appareil",
  "assets.mediaEmpty":
    "\nAucun média – faites glisser les fichiers ici ou cliquez pour télécharger",
  "assets.mediaFormats": "\nAcceptés : JPEG, PNG, WebP",
  "assets.mediaMaxSize": "\nTaille maximale du fichier : 10 Mo",
  "assets.editAsset": "\nModifier l'élément",
  "assets.detail.metadata": "\nMétadonnées de l'élément",
  "assets.detail.pinnedTitle": "\nFocus épinglé",
  "assets.detail.pinnedDescription":
    "\nGardez l'onglet actuel épinglé pendant que vous passez des vues de risque, de cycle de vie et de gouvernance.",
  "assets.detail.pinnedBadge": "\nÉpinglé",
  "assets.detail.pinnedCurrent": "\nVue épinglée actuelle",
  "assets.detail.pinnedOpen": "\nOuvrir la vue épinglée",
  "assets.detail.pinnedReset": "\nRéinitialiser à l'aperçu",
  "assets.detail.unresolvedInspectionEmpty": "\nAucune inspection enregistrée pour le moment.",
  "assets.detail.unresolvedRisk": "\nPosition de risque",
  "assets.detail.unresolvedRiskDescription":
    "\nExaminez les facteurs de risque actuels, les signaux de l'IA et les inspections en retard.",
  "assets.detail.unresolvedLifecycle": "\nPosture du cycle de vie",
  "assets.detail.unresolvedLifecycleDescription":
    "\nExaminez le coût du cycle de vie, la durée de vie restante et la planification du remplacement.",
  "assets.detail.unresolvedGovernance": "\nPosture de gouvernance",
  "assets.detail.unresolvedGovernanceDescription":
    "\nExaminez la gouvernance FM, la couverture de conformité et les enregistrements liés.",
  "assets.detail.unresolvedTitle": "\nDomaines d'intervention non résolus",
  "assets.detail.unresolvedDescription":
    "\nUtilisez ces points d’entrée pour passer directement au prochain problème d’actif non résolu.",
  "assets.detail.unresolvedBadge": "\nBesoin d'un examen",
  "assets.detail.summaryTitle": "\nRésumé de l'espace de travail",
  "assets.detail.summaryDescription":
    "Gardez le contexte actuel de l'actif, la dernière inspection et la charge de travail associée visibles pendant que vous naviguez.",
  "assets.detail.summarySiteDescription": "\nType de site et d'actif",
  "assets.detail.summaryInspectionTitle": "\nDernière inspection",
  "assets.detail.summaryInspectionDescription":
    "\nStatut d'inspection le plus récent enregistré sur cet actif.",
  "assets.detail.summaryInspectionSupporting":
    "\nL'historique d'inspection suit le dossier de maintenance partagé.",
  "assets.detail.summaryWorkOrderTitle": "\nBons de travail liés",
  "assets.detail.summaryWorkOrderDescription":
    "\nCharge de travail liée actuelle tout au long de l'activité du cycle de vie.",
  "assets.detail.navigatorTitle": "\nNavigateur de section",
  "assets.detail.navigatorDescription":
    "\nDéplacez-vous entre les sections de détails de l'actif sans perdre le contexte actuel de l'actif.",
  "assets.detail.priorityTitle": "\nPriorisation des risques et performance",
  "assets.detail.priorityDescription":
    "\nPosture dérivée pour la priorisation de la maintenance basée sur les risques en utilisant l'état actuel, les travaux ouverts, les inspections et les signaux de prédiction de l'IA.",
  "assets.detail.priorityStateStable": "\nStable",
  "assets.detail.priorityStateWatch": "\nRegarder",
  "assets.detail.priorityStateCritical": "\nCritique",
  "assets.detail.priorityAlertCriticalTitle": "\nUne intervention immédiate est recommandée",
  "assets.detail.priorityAlertCriticalDescription":
    "\n{count} un ou plusieurs signaux de prédiction critiques, une condition contrainte ou des inspections en retard placent cet actif en haut de la file d'attente.",
  "assets.detail.priorityAlertWatchTitle":
    "\nUne surveillance et une planification actives sont requises",
  "assets.detail.priorityAlertWatchDescription":
    "\n{count} tâches ouvertes, travaux actifs ou signaux non critiques nécessitent toujours l'attention de l'opérateur pour cet actif.",
  "assets.detail.priorityAlertStableTitle":
    "\nL'actif fonctionne dans le cadre de la référence contrôlée",
  "assets.detail.priorityAlertStableDescription":
    "\nAucune condition active, inspection, ordre de travail ou pilote de prédiction n'élève actuellement cet actif.",
  "assets.detail.priorityConditionDriver":
    "\nLa posture conditionnelle contribue à la priorisation.",
  "assets.detail.prioritySignalsDriver":
    "\nLes signaux de prédiction de l’IA augmentent l’urgence d’une intervention.",
  "assets.detail.priorityInspectionsDriver":
    "\nLes inspections en retard limitent l’état de préparation.",
  "assets.detail.priorityWorkOrdersDriver":
    "\nLes ordres de travail actifs indiquent une charge de travail opérationnelle non résolue.",
  "assets.detail.priorityTasksDriver":
    "\nLe retard des tâches ouvertes nécessite toujours une attention particulière aux actifs.",
  "assets.detail.priorityNoDrivers": "\nAucun pilote de priorisation actif.",
  "assets.detail.priorityUtilisationTitle": "\nHeures d'utilisation",
  "assets.detail.priorityUtilisationDescription":
    "\nSignal d'heures de fonctionnement suivies actuellement détenu sur cet enregistrement d'actif.",
  "assets.detail.priorityOpenTasksTitle": "\nTâches ouvertes",
  "assets.detail.priorityOpenTasksDescription":
    "\nTâches en retard, planifiées et en cours liées à cet actif.",
  "assets.detail.priorityInspectionsTitle": "\nInspections en retard",
  "assets.detail.priorityInspectionsDescription":
    "\nTâches d'inspection dépassées et toujours non résolues.",
  "assets.detail.priorityWorkOrdersTitle": "\nBons de travail actifs",
  "assets.detail.priorityWorkOrdersDescription":
    "\nLes bons de travail liés sont toujours en cours de livraison opérationnelle.",
  "assets.detail.priorityPredictionsTitle": "\nSignaux de prédiction récents",
  "assets.detail.priorityPredictionsDescription":
    "\n{count} signal(s) de prédiction total sont actuellement liés à cet actif.",
  "assets.detail.priorityPredictionsEmpty":
    "Aucun signal de prédiction n'est actuellement lié à cet actif.",
  "assets.detail.priorityPredictionsColumnType": "\nSignal",
  "assets.detail.priorityPredictionsColumnSeverity": "\nGravité",
  "assets.detail.priorityPredictionsColumnRemainingLife": "\nDurée de vie restante",
  "assets.detail.priorityPredictionsColumnConfidence": "\nConfiance",
  "assets.detail.priorityPredictionsColumnAction": "\nAction générée",
  "assets.detail.priorityPredictionsRemainingLifeValue": "\n{days} jours",
  "assets.detail.priorityGeneratedTask": "\nTâche générée",
  "assets.detail.priorityGeneratedWorkOrderAria": "\nBon de travail généré ouvert {number}",
  "assets.detail.priorityNoAction": "\nAucune action générée",
  "assets.detail.readinessTitle": "\nDisponibilité opérationnelle",
  "assets.detail.readinessDescription":
    "\nÉtat de préparation au niveau des actifs utilisant les enregistrements liés de portée, de sécurité, de ciblage et de contrôle GFE ainsi que la charge de travail actuelle d'inspection et de livraison.",
  "assets.detail.readinessStateReady": "\nPrêt",
  "assets.detail.readinessStateWatch": "\nRegarder",
  "assets.detail.readinessStateConstrained": "\nContraint",
  "assets.detail.readinessAlertConstrainedTitle":
    "\nLa disponibilité opérationnelle est actuellement limitée",
  "assets.detail.readinessAlertConstrainedDescription":
    "\n{controls} enregistrements de contrôle liés nécessitent une action et {inspections} tâches d'inspection en retard restent ouvertes pour cet actif.",
  "assets.detail.readinessAlertCoverageGapTitle":
    "\nLa couverture de préparation doit être établie",
  "assets.detail.readinessAlertCoverageGapDescription":
    "\nCet actif lié aux capacités n'est pas encore soutenu par des enregistrements de contrôle opérationnel liés pour {capability}. Capturez les contrôles de préparation pour restaurer la visibilité directe de la disponibilité.",
  "assets.detail.readinessAlertWatchTitle": "\nL'état de préparation doit être surveillé de près",
  "assets.detail.readinessAlertWatchDescription":
    "\n{controls} enregistrement(s) de contrôle lié(s) restent sous surveillance et {workOrders} bon(s) de travail actif(s) influencent toujours cet actif.",
  "assets.detail.readinessAlertReadyTitle":
    "\nAucun bloqueur de préparation actif n'est actuellement enregistré",
  "assets.detail.readinessAlertReadyDescription":
    "\n{controls} enregistrements de contrôle liés sont actuellement disponibles et conformes pour cet actif.",
  "assets.detail.readinessControlDriver":
    "\nLes enregistrements de contrôle opérationnel liés sont manquants ou montrent une pression de disponibilité précoce.",
  "assets.detail.readinessComplianceDriver":
    "\nLa posture de conformité limite activement l’état de préparation des actifs.",
  "assets.detail.readinessConditionDriver":
    "\nL’état des actifs contribue à l’état de préparation actuel.",
  "assets.detail.readinessInspectionDriver":
    "\nLes inspections en retard limitent la disponibilité opérationnelle.",
  "assets.detail.readinessWorkOrderDriver":
    "\nLes ordres de travail actifs influencent toujours la disponibilité des actifs.",
  "assets.detail.readinessTaskDriver":
    "\nLes tâches opérationnelles ouvertes doivent encore être rapprochées de cet actif.",
  "assets.detail.readinessCapabilityDriver":
    "\nLes actifs homologues dans la même cohorte de capacités restent limités.",
  "assets.detail.readinessNoDrivers": "\nAucun pilote de préparation actif.",
  "assets.detail.readinessDriversTitle": "\nPilotes de préparation",
  "assets.detail.readinessCapabilityValue": "\nCapacité : {capability}",
  "assets.detail.readinessLinkedControlsTitle": "\nEnregistrements de contrôle liés",
  "assets.detail.readinessLinkedControlsDescription":
    "\n{available} actuellement disponible ou conforme, dernière mise à jour {timestamp}.",
  "assets.detail.readinessLinkedControlsEmptyDescription":
    "\nAucun enregistrement de contrôle opérationnel lié n'a encore été capturé pour cet actif.",
  "assets.detail.readinessActionRequiredTitle": "\nContrôles nécessitant une action",
  "assets.detail.readinessActionRequiredDescription":
    "\n{watch} des enregistrements de contrôle supplémentaires restent sous surveillance.",
  "assets.detail.readinessInspectionTitle": "\nInspections en retard",
  "assets.detail.readinessInspectionDescription":
    "Tâches d'inspection qui ont dépassé la date limite et qui ne sont toujours pas résolues.",
  "assets.detail.readinessWorkOrdersTitle": "\nBons de travail actifs",
  "assets.detail.readinessWorkOrdersDescription":
    "\nOrdres de travail liés en cours de livraison opérationnelle.",
  "assets.detail.readinessTasksTitle": "\nTâches opérationnelles ouvertes",
  "assets.detail.readinessTasksDescription":
    "\nCarnet de commandes, travaux planifiés et en cours toujours liés à cet actif.",
  "assets.detail.readinessCapabilityTitle": "\nCohorte de capacités",
  "assets.detail.readinessCapabilityValueShort": "\n{ready}/{total} prêt",
  "assets.detail.readinessCapabilityDescription":
    "\n{constrained} les actifs homologues restent limités dans cette cohorte de capacités liées.",
  "assets.detail.readinessCapabilityEmptyDescription":
    "\nAucun lien de capacité opérationnelle n'est actuellement capturé pour cet actif.",
  "assets.detail.readinessRecordsTitle": "\nEnregistrements de préparation liés",
  "assets.detail.readinessRecordsDescription":
    "\nEnregistrements récents de portée, de sécurité, de ciblage et de contrôle GFE liés directement à cet actif.",
  "assets.detail.readinessRecordsEmpty":
    "\nAucun enregistrement de préparation ou de disponibilité lié n'a encore été capturé pour cet actif.",
  "assets.detail.readinessControlColumn": "\nContrôle",
  "assets.detail.readinessOperationalColumn": "\nPosture opérationnelle",
  "assets.detail.readinessComplianceColumn": "\nPosture de conformité",
  "assets.detail.readinessSignalColumn": "\nSignal opérationnel",
  "assets.detail.readinessUpdatedColumn": "\nMise à jour",
  "assets.detail.readinessSignalMetric": "{value} ",
  "assets.detail.readinessSignalMetricWithUnit": "Valeur : {value} {unit}",
  "assets.detail.readinessSignalTargetDate": "\nDate cible {date}",
  "assets.detail.readinessSignalNone": "\nAucun signal opérationnel enregistré pour l'instant.",
  "assets.detail.readinessOpenWorkspace": "\nEspace de travail ouvert",
  "assets.detail.readinessOpenWorkspaceAria": "\nEspace de travail ouvert",
  "assets.detail.fmGovernanceTitle": "\nGouvernance FM et posture de conformité",
  "assets.detail.fmGovernanceDescription":
    "\nGouvernance de la gestion des installations au niveau des actifs à l'aide des calendriers SFG20 liés, des inspections réglementaires, des dossiers de conformité et des travaux de livraison connectés.",
  "assets.detail.fmGovernanceStateAssured": "\nAssuré",
  "assets.detail.fmGovernanceStateWatch": "\nRegarder",
  "assets.detail.fmGovernanceStateActionRequired": "\nAction requise",
  "assets.detail.fmGovernanceAlertActionRequiredTitle":
    "\nLa gouvernance FM nécessite une attention immédiate",
  "assets.detail.fmGovernanceAlertActionRequiredDescription":
    "\n{attention} enregistrement(s) de gouvernance lié(s) nécessitent une action et {overdue} élément(s) de planification sont déjà en retard pour cet actif.",
  "assets.detail.fmGovernanceAlertCoverageGapTitle":
    "\nLa couverture de la gouvernance FM n’a pas été établie",
  "assets.detail.fmGovernanceAlertCoverageGapDescription":
    "\nAucun enregistrement de gouvernance FM lié n'est actuellement capturé pour cet actif. Ajoutez des enregistrements statutaires, SFG20 ou de gouvernance de service pour restaurer la visibilité de l'assurance.",
  "assets.detail.fmGovernanceAlertWatchTitle": "\nLa gouvernance FM doit être surveillée de près",
  "assets.detail.fmGovernanceAlertWatchDescription":
    "\nLes enregistrements de gouvernance liés {watch} restent sous surveillance, {dueSoon} sont attendus prochainement et les ordres de travail liés {workOrders} sont toujours actifs.",
  "assets.detail.fmGovernanceAlertAssuredTitle": "\nLa gouvernance FM est actuellement assurée",
  "assets.detail.fmGovernanceAlertAssuredDescription":
    "\nLes enregistrements de gouvernance liés {linked} sont actuellement suivis sans bloqueurs de conformité FM actifs pour cet actif.",
  "assets.detail.fmGovernanceCoverageDriver":
    "\nLa couverture de gouvernance FM liée est manquante pour cet actif.",
  "assets.detail.fmGovernanceAttentionDriver":
    "\nUn ou plusieurs enregistrements de gouvernance FM nécessitent déjà une action corrective.",
  "assets.detail.fmGovernanceMonitoringDriver":
    "\nLes dossiers de gouvernance restent sous surveillance et nécessitent une surveillance étroite.",
  "assets.detail.fmGovernanceScheduleDriver":
    "\nLes dates de gouvernance à venir ou en retard déterminent la situation actuelle.",
  "assets.detail.fmGovernanceWorkOrdersDriver":
    "Les ordres de travail liés continuent de faire avancer les actions de gouvernance FM jusqu'à la livraison.",
  "assets.detail.fmGovernanceNoDrivers": "\nAucun moteur de gouvernance FM actif.",
  "assets.detail.fmGovernanceDriversTitle": "\nFacteurs de gouvernance FM",
  "assets.detail.fmGovernanceLinkedRecordsTitle": "\nDossiers de gouvernance liés",
  "assets.detail.fmGovernanceLinkedRecordsDescription":
    "\nDernière activité de gouvernance mise à jour {timestamp}.",
  "assets.detail.fmGovernanceLinkedRecordsEmptyDescription":
    "\nAucun enregistrement de gouvernance FM n'a encore été lié à cet actif.",
  "assets.detail.fmGovernanceAttentionTitle": "\nEnregistrements d'attention",
  "assets.detail.fmGovernanceAttentionDescription":
    "\n{watch} des enregistrements de gouvernance supplémentaires restent sous surveillance.",
  "assets.detail.fmGovernanceScheduleTitle": "\nCalendriers en retard",
  "assets.detail.fmGovernanceScheduleDescription":
    "\n{dueSoon} des enregistrements de gouvernance supplémentaires seront bientôt attendus.",
  "assets.detail.fmGovernanceWorkOrdersTitle": "\nBons de travail liés actifs",
  "assets.detail.fmGovernanceWorkOrdersDescription":
    "\nBons de travail directement connectés à la livraison de la gouvernance FM pour cet actif.",
  "assets.detail.fmGovernanceStatutoryTitle": "\nContrôles réglementaires",
  "assets.detail.fmGovernanceStatutoryDescription":
    "\nDossiers de gouvernance d'inspection statutaire directe liés à cet actif.",
  "assets.detail.fmGovernanceSfg20Title": "\nHoraires SFG20",
  "assets.detail.fmGovernanceSfg20Description":
    "\nCalendriers de maintenance SFG20 liés suivis par rapport à cet actif.",
  "assets.detail.fmGovernanceRecordsTitle": "\nDossiers récents de gouvernance FM",
  "assets.detail.fmGovernanceRecordsDescription":
    "\nDossiers récents de gouvernance de la gestion des installations liés directement à cet actif.",
  "assets.detail.fmGovernanceRecordsEmpty":
    "\nAucun enregistrement de gouvernance ou de conformité FM n'a encore été capturé pour cet actif.",
  "assets.detail.fmGovernanceRecordColumn": "\nEnregistrer",
  "assets.detail.fmGovernanceDomainColumn": "\nDomaine",
  "assets.detail.fmGovernancePostureColumn": "\nPosture",
  "assets.detail.fmGovernanceDueColumn": "\nDue et mesure",
  "assets.detail.fmGovernanceWorkOrderColumn": "\nBon de travail lié",
  "assets.detail.fmGovernanceUpdatedColumn": "\nMise à jour",
  "assets.detail.fmGovernanceDueOverdue": "\nEn retard",
  "assets.detail.fmGovernanceDueSoon": "\nÀ rendre bientôt",
  "assets.detail.fmGovernanceDueScheduled": "\nProgrammé",
  "assets.detail.fmGovernanceDueUnset": "\nPas de date d'échéance",
  "assets.detail.fmGovernanceDueDateValue": "\nÀ payer {date}",
  "assets.detail.fmGovernanceDueUnsetDescription":
    "\nAucune date d'échéance n'est actuellement enregistrée pour ce poste de gouvernance.",
  "assets.detail.fmGovernanceMetricValue": "\n{value} enregistré",
  "assets.detail.fmGovernanceMetricValueWithUnit": "\n{value} {unit} enregistré",
  "assets.detail.fmGovernanceNoWorkOrder": "\nAucun bon de travail lié",
  "assets.detail.fmGovernanceLinkedWorkOrdersValue": "\n{count} bon(s) de travail lié(s)",
  "assets.detail.fmGovernanceOpenWorkspace": "\nEspace de travail ouvert",
  "assets.detail.fmGovernanceOpenWorkspaceAria": "\nEspace de travail ouvert",
  "assets.detail.fmGovernanceOpenWorkOrderAria":
    "\nBon de travail sur la gouvernance FM ouverte {number}",
  "assets.detail.performanceTitle": "\nSuivi de l'utilisation et des performances",
  "assets.detail.performanceDescription":
    "\nPosition d'utilisation en direct pour cet actif à l'aide de la télémétrie capturée, des heures de fonctionnement du registre et de la charge de travail opérationnelle liée.",
  "assets.detail.performanceStateBlindSpot": "\nAngle mort de télémétrie",
  "assets.detail.performanceStateStale": "\nTélémétrie obsolète",
  "assets.detail.performanceAlertBlindSpotTitle":
    "\nLa télémétrie d'utilisation en direct n'est pas encore disponible",
  "assets.detail.performanceAlertBlindSpotDescription":
    "\nCet actif s'appuie actuellement sur la base de référence du registre {current} jusqu'à ce que la télémétrie d'utilisation commence à générer des rapports.",
  "assets.detail.performanceAlertStaleTitle":
    "\nLa télémétrie d'utilisation nécessite une attention particulière",
  "assets.detail.performanceAlertStaleDescription":
    "\nLe dernier échantillon d’utilisation a été capturé {timestamp}. Actualisez l'appareil ou la couverture de télémétrie pour restaurer la surveillance actuelle.",
  "assets.detail.performanceAlertOverTitle":
    "\nL'actif fonctionne au-dessus de la bande d'utilisation optimale",
  "assets.detail.performanceAlertOverDescription":
    "L'utilisation actuelle est de {current} contre une moyenne de {average}, avec {critical} signal(s) critique(s) déjà lié(s) à cet actif.",
  "assets.detail.performanceAlertUnderTitle":
    "\nL'utilisation est inférieure à la bande de fonctionnement prévue",
  "assets.detail.performanceAlertUnderDescription":
    "\nL'utilisation actuelle est de {current} contre une moyenne de {average}. Examinez les contraintes de déploiement, de disponibilité ou de planification.",
  "assets.detail.performanceAlertWatchTitle": "\nL'utilisation doit être surveillée de près",
  "assets.detail.performanceAlertWatchDescription":
    "\nL'utilisation actuelle est de {current} contre une moyenne de {average}. L'actif s'approche d'une situation de surutilisation ou de sous-utilisation.",
  "assets.detail.performanceAlertOptimalTitle":
    "\nL'utilisation se situe dans la bande de fonctionnement équilibrée",
  "assets.detail.performanceAlertOptimalDescription":
    "\nL'utilisation actuelle est de {current} contre une moyenne de {average}, et la couverture télémétrique est active pour cet actif.",
  "assets.detail.performanceRecordedHoursTitle": "\nHeures de fonctionnement enregistrées",
  "assets.detail.performanceRecordedHoursValue": "\n{hours} heures",
  "assets.detail.performanceRecordedHoursDescription":
    "\nChiffre des heures de fonctionnement suivies actuellement stocké dans l'enregistrement de l'actif.",
  "assets.detail.performanceCurrentTitle": "\nUtilisation actuelle",
  "assets.detail.performanceCurrentDescription":
    "\nDernière télémétrie d'utilisation capturée pour cet actif.",
  "assets.detail.performanceCurrentFallbackDescription":
    "\nLa posture actuelle utilise la référence des heures de fonctionnement du registre car aucune télémétrie n'est disponible.",
  "assets.detail.performanceAverageTitle": "\nUtilisation moyenne",
  "assets.detail.performanceAverageDescription":
    "\nUtilisation moyenne sur les échantillons de télémétrie capturés.",
  "assets.detail.performanceCoverageTitle": "\nCouverture télémétrique",
  "assets.detail.performanceCoverageDescription":
    "\n{timestamp} était le dernier échantillon d'utilisation capturé pour cet actif.",
  "assets.detail.performanceCoverageEmptyDescription":
    "\nAucun échantillon de télémétrie d'utilisation n'a encore été capturé pour cet actif.",
  "assets.detail.performanceTasksTitle": "\nCharge de travail opérationnelle ouverte",
  "assets.detail.performanceTasksDescription":
    "\nTâches ouvertes toujours liées à cet actif lors de la livraison d'inspection et de maintenance.",
  "assets.detail.performanceSignalsTitle": "\nSignaux de prédiction",
  "assets.detail.performanceSignalsDescription":
    "\n{count} signal(s) critique(s) sont actuellement liés à cet actif.",
  "assets.detail.performanceSamplesTitle": "\nExemples d'utilisation récents",
  "assets.detail.performanceSamplesDescription":
    "\nÉchantillons de télémétrie récents pour cet actif, avec une plage actuelle de {min} à {max} et {activeWorkOrders} ordre(s) de travail actif en vol.",
  "assets.detail.performanceSamplesEmpty":
    "\nAucune télémétrie d'utilisation n'a encore été capturée pour cet actif.",
  "assets.detail.performanceTimestampColumn": "\nCapturé",
  "assets.detail.performanceUtilisationColumn": "\nUtilisation",
  "assets.detail.performancePostureColumn": "\nPosture",
  "assets.detail.performanceOpenWorkspace": "\nEspace de travail à utilisation ouverte",
  "assets.detail.performanceOpenWorkspaceAria": "\nEspace de travail à utilisation ouverte",
  "assets.detail.replacementTitle": "\nPlanification du remplacement et situation du capital",
  "assets.detail.replacementDescription":
    "\nPosture de remplacement dérivée pour cet actif à l'aide de l'état du cycle de vie, de la condition, des signaux de prédiction de l'IA et du travail de remplacement actif.",
  "assets.detail.replacementStateBaseline": "\nRéférence",
  "assets.detail.replacementStatePlan": "\nPlan",
  "assets.detail.replacementStateReplace": "\nRemplacer",
  "assets.detail.replacementAlertReplaceTitle":
    "\nExécuter la planification du remplacement maintenant",
  "assets.detail.replacementAlertReplaceDescription":
    "Des signaux urgents de cycle de vie, d’état, de prédiction ou d’ordre de travail actif indiquent que cet actif doit passer à l’exécution de remplacement actif.",
  "assets.detail.replacementAlertPlanTitle": "\nPréparer le dossier capital",
  "assets.detail.replacementAlertPlanDescription":
    "\nLa pression émergente du cycle de vie ou les travaux de remplacement en attente signifient que cet actif doit faire l'objet d'un examen de planification financière et de remplacement.",
  "assets.detail.replacementAlertBaselineTitle":
    "\nAucune pression de remplacement active n'est détectée",
  "assets.detail.replacementAlertBaselineDescription":
    "\nLe cycle de vie actuel, l'état et les signaux de travail ne nécessitent pas encore de réponse de planification de remplacement pour cet actif.",
  "assets.detail.replacementLifecycleDriver":
    "\nLa posture du cycle de vie pousse cet actif vers le remplacement.",
  "assets.detail.replacementConditionDriver":
    "\nLa dégradation de l’état contribue à la planification du remplacement.",
  "assets.detail.replacementPredictionDriver":
    "\nLes signaux de prévision indiquent une piste à durée de vie restante plus courte.",
  "assets.detail.replacementTasksDriver":
    "\nDes tâches de remplacement sont déjà en file d'attente pour cet actif.",
  "assets.detail.replacementWorkOrdersDriver":
    "\nLes bons de travail de remplacement actifs indiquent que la livraison est déjà en cours.",
  "assets.detail.replacementNoDrivers": "\nAucun pilote de remplacement actif.",
  "assets.detail.replacementDriversTitle": "\nPilotes de remplacement",
  "assets.detail.replacementBookValueTitle": "\nValeur comptable actuelle",
  "assets.detail.replacementBookValueDescription":
    "\nValeur comptable actuelle détenue par rapport à cet enregistrement d'actif.",
  "assets.detail.replacementAdjustedValueTitle": "\nValeur de remplacement ajustée",
  "assets.detail.replacementAdjustedValueDescription":
    "\nValeur de remplacement estimée ajustée en fonction de la gravité de la prévision actuelle.",
  "assets.detail.replacementCapitalGapTitle": "\nÉcart de capital",
  "assets.detail.replacementCapitalGapDescription":
    "\nÉcart par rapport à la valeur comptable actuelle : {percent}.",
  "assets.detail.replacementLifeTitle": "\nDurée de vie restante",
  "assets.detail.replacementLifeValue": "\n{days} jours",
  "assets.detail.replacementLifeDescription":
    "\nDernier signal de durée de vie restante prévu, lorsqu'il est disponible.",
  "assets.detail.replacementTasksTitle": "\nTâches de remplacement",
  "assets.detail.replacementTasksDescription":
    "\n{count} bon(s) de travail de remplacement actif sont actuellement liés à cet actif.",
  "assets.detail.replacementActionsTitle": "\nActions de remplacement actives",
  "assets.detail.replacementActionsDescription":
    "\nTâches de remplacement récentes et ordres de travail liés qui déterminent actuellement la livraison de remplacement.",
  "assets.detail.replacementActionsEmpty":
    "\nAucune action de remplacement active n'est encore liée à cet actif.",
  "assets.detail.replacementPriorityColumn": "\nPriorité",
  "assets.detail.replacementStatusColumn": "\nStatut",
  "assets.detail.replacementWorkOrderColumn": "\nBon de travail lié",
  "assets.detail.replacementAssigneeColumn": "\nDestinataire",
  "assets.detail.replacementDeadlineColumn": "\nDate limite",
  "assets.detail.replacementUpdatedColumn": "\nMise à jour",
  "assets.detail.replacementStandalone": "\nTâche de remplacement autonome",
  "assets.detail.replacementNoAssignee": "\nAucun cessionnaire",
  "assets.detail.replacementNoDeadline": "\nPas de date limite",
  "assets.detail.replacementOpenPlanning": "\nPlanification financière ouverte",
  "assets.detail.replacementOpenPlanningAria":
    "Espace de travail ouvert de planification financière",
  "assets.detail.replacementOpenWorkOrderAria":
    "\nOrdre de travail de remplacement ouvert {number}",
  "assets.detail.inspectionsTitle": "\nDossiers d'inspection",
  "assets.detail.inspectionsDescription":
    "\nTâches d'inspection récentes et ordres de travail associés pour cet actif, classés par dernière activité opérationnelle.",
  "assets.detail.inspectionsEmpty":
    "\nAucun enregistrement d'inspection n'a encore été capturé pour cet actif.",
  "assets.detail.inspectionsStatus": "\nStatut d'inspection",
  "assets.detail.inspectionsWorkOrder": "\nBon de travail lié",
  "assets.detail.inspectionsAssignee": "\nDestinataire",
  "assets.detail.inspectionsDeadline": "\nDate limite",
  "assets.detail.inspectionsCompleted": "\nTerminé",
  "assets.detail.inspectionsUpdated": "\nMise à jour",
  "assets.detail.inspectionsStandalone": "\nTâche d'inspection autonome",
  "assets.detail.inspectionsUnassigned": "\nAucun cessionnaire",
  "assets.detail.inspectionsNoDeadline": "\nPas de date limite",
  "assets.detail.inspectionsNoCompletion": "\nNon terminé",
  "assets.detail.maintenanceTitle": "\nActivité de maintenance",
  "assets.detail.maintenanceDescription":
    "Travaux récents de réparation, d'étalonnage et d'urgence liés à cet actif, y compris l'état des tâches et la livraison des bons de travail connectés.",
  "assets.detail.maintenanceAlertActiveTitle": "\nLa charge de travail de maintenance est active",
  "assets.detail.maintenanceAlertActiveDescription":
    "\n{openTasks} tâche(s) de maintenance ouverte et {activeWorkOrders} ordre(s) de travail actif sont actuellement liés à cet actif.",
  "assets.detail.maintenanceAlertIdleTitle":
    "\nAucune charge de travail de maintenance active n'est ouverte",
  "assets.detail.maintenanceAlertIdleDescription":
    "\nIl n'y a aucun élément de travail actif de réparation, d'étalonnage ou d'urgence actuellement lié à cet actif.",
  "assets.detail.maintenanceOpenTasksTitle": "\nTâches de maintenance ouvertes",
  "assets.detail.maintenanceOpenTasksDescription":
    "\nTâches de réparation, d'étalonnage et d'urgence toujours en vol.",
  "assets.detail.maintenanceCompletedTasksTitle": "\nTâches de maintenance terminées",
  "assets.detail.maintenanceCompletedTasksDescription":
    "\nTâches de maintenance déjà clôturées pour cet actif.",
  "assets.detail.maintenanceActiveWorkOrdersTitle": "\nBons de travail de maintenance actifs",
  "assets.detail.maintenanceActiveWorkOrdersDescription":
    "\nLes bons de travail liés sont toujours en cours de livraison opérationnelle.",
  "assets.detail.maintenanceCompletedWorkOrdersTitle":
    "\nOrdres de travaux de maintenance terminés",
  "assets.detail.maintenanceCompletedWorkOrdersDescription":
    "\nOrdres de travail liés déjà terminés pour cet actif.",
  "assets.detail.maintenanceRecordsTitle": "\nDossiers d'entretien récents",
  "assets.detail.maintenanceRecordsDescription":
    "\nLes dernières tâches de maintenance et les ordres de travail liés, classés par mouvement le plus récent.",
  "assets.detail.maintenanceEmpty":
    "\nAucun enregistrement de réparation, d'étalonnage ou de maintenance d'urgence n'a encore été capturé pour cet actif.",
  "assets.detail.maintenanceTypeColumn": "\nTapez",
  "assets.detail.maintenancePriorityColumn": "\nPriorité",
  "assets.detail.maintenanceStatusColumn": "\nStatut",
  "assets.detail.maintenanceWorkOrderColumn": "\nBon de travail lié",
  "assets.detail.maintenanceAssigneeColumn": "\nDestinataire",
  "assets.detail.maintenanceDeadlineColumn": "\nDate limite",
  "assets.detail.maintenanceCompletedColumn": "\nTerminé",
  "assets.detail.maintenanceUpdatedColumn": "\nMise à jour",
  "assets.detail.maintenanceStandalone": "\nTâche de maintenance autonome",
  "assets.detail.maintenanceNoAssignee": "\nAucun cessionnaire",
  "assets.detail.maintenanceNoDeadline": "\nPas de date limite",
  "assets.detail.maintenanceNoCompletion": "\nNon terminé",
  "assets.detail.maintenanceOpenWorkOrders": "\nBons de travail ouverts",
  "assets.detail.maintenanceOpenWorkOrdersAria":
    "\nEspace de travail des ordres de travail ouverts",
  "assets.detail.maintenanceOpenWorkOrderAria": "\nOrdre de travail de maintenance ouvert {number}",
  "assets.detail.costsTitle": "\nRépartition des coûts du cycle de vie",
  "assets.detail.costsDescription":
    "\nRépartition des coûts d'ordre de travail récents liés à cet actif, y compris la main-d'œuvre, les matériaux et autres dépenses opérationnelles.",
  "assets.detail.costsEmpty":
    "\nAucun enregistrement de coût d'ordre de travail lié n'a encore été capturé pour cet actif.",
  "assets.detail.costsTotalTitle": "\nCoût total lié",
  "assets.detail.costsTotalDescription": "\n{count} bon(s) de travail lié(s)",
  "assets.detail.costsActiveTitle": "\nBons de travail actifs",
  "assets.detail.costsActiveDescription":
    "\nCharge de travail opérationnelle toujours en cours pour cet actif.",
  "assets.detail.costsLabourTitle": "\nAllocation de main d'œuvre",
  "assets.detail.costsLabourDescription":
    "\nCoût total de la main-d'œuvre enregistré pour les ordres de travail liés.",
  "assets.detail.costsMaterialTitle": "\nAllocation de matériel",
  "assets.detail.costsMaterialDescription":
    "\nEngagements matériels liés à la livraison des bons de travail.",
  "assets.detail.costsWorkOrder": "\nBon de travail",
  "assets.detail.costsStatus": "\nStatut",
  "assets.detail.costsLabourColumn": "\nTravail",
  "assets.detail.costsMaterialColumn": "\nMatériel",
  "assets.detail.costsOtherColumn": "\nAutre",
  "assets.detail.costsTotalColumn": "\nTotal",
  "assets.detail.costsUpdatedColumn": "\nDernier mouvement",
  "assets.detail.costsCompletedValue": "\nTerminé {date}",
  "assets.lifecycleProfile.title": "\nProfil de gestion du cycle de vie",
  "assets.lifecycleProfile.description":
    "\nSuivez l'état de fonctionnement actuel, l'état du cycle de vie et la dernière inspection confirmée pour cet actif.",
  "assets.lifecycleProfile.conditionLabel": "\nÉtat",
  "assets.lifecycleProfile.conditionHint":
    "\nDéfinissez la condition de fonctionnement actuelle utilisée par l'analyse du cycle de vie, les rapports de préparation et la priorisation.",
  "assets.lifecycleProfile.lifecycleLabel": "\nÉtape du cycle de vie",
  "assets.lifecycleProfile.lifecycleHint":
    "Choisissez la position actuelle du cycle de vie afin que les rapports stratégiques sur les actifs puissent distinguer les actifs actifs, surveillés et en fin de vie.",
  "assets.lifecycleProfile.lastInspectionLabel": "\nDate de la dernière inspection",
  "assets.lifecycleProfile.lastInspectionHint":
    "\nCapturez la dernière date d'inspection confirmée lorsque la chronologie ci-dessus ne reflète pas encore l'enregistrement actuel de la succession.",
  "assets.lifecycleProfile.submit": "\nEnregistrer le profil de cycle de vie",
  "assets.lifecycleProfile.submitAria":
    "\nEnregistrer le profil de gestion du cycle de vie des actifs",
  "assets.lifecycleProfile.snapshotTitle": "\nInstantané de la posture du cycle de vie",
  "assets.lifecycleProfile.snapshotDescription":
    "\nL'état actuel du cycle de vie utilisé par l'analyse de préparation, d'état et de planification du remplacement.",
  "assets.lifecycleProfile.snapshotCondition": "\nÉtat",
  "assets.lifecycleProfile.snapshotLifecycle": "\nÉtape du cycle de vie",
  "assets.lifecycleProfile.snapshotInspection": "\nDernière inspection",
  "assets.lifecycleProfile.snapshotUpdated": "\nDernière mise à jour",
  "assets.lifecycleProfile.historyTitle": "\nHistorique du cycle de vie",
  "assets.lifecycleProfile.historyDescription":
    "\nLes modifications versionnées du cycle de vie sont capturées ici pour la gouvernance des conditions et la planification de l'élimination.",
  "assets.lifecycleProfile.historyEmpty":
    "\nAucun changement dans le cycle de vie n'a encore été enregistré. Enregistrez une mise à jour pour démarrer la piste d'audit.",
  "assets.lifecycleProfile.historyUpdated": "\nMise à jour du cycle de vie",
  "assets.lifecycleProfile.historyFrom": "\nÀ partir de",
  "assets.lifecycleProfile.historyTo": "\nÀ",
  "assets.lifecycleProfile.history.fieldCondition": "\nÉtat",
  "assets.lifecycleProfile.history.fieldStage": "\nÉtape du cycle de vie",
  "assets.lifecycleProfile.history.fieldInspection": "\nDernière inspection",
  "assets.lifecycleProfile.feedback.saved": "\nProfil de cycle de vie des actifs enregistré.",
  "assets.lifecycleProfile.feedback.loadFailed":
    "\nImpossible de charger le profil de cycle de vie des actifs pour le moment.",
  "assets.lifecycleProfile.feedback.saveFailed":
    "\nImpossible d'enregistrer le profil du cycle de vie des actifs pour le moment.",
  "assets.lifecycleProfile.validation.conditionRequired": "\nChoisissez une condition valide.",
  "assets.lifecycleProfile.validation.lifecycleRequired":
    "\nChoisissez une étape de cycle de vie valide.",
  "assets.lifecycleProfile.validation.lastInspectionInvalid":
    "\nUtilisez une date d'inspection valide.",
  "assets.registry.title": "\nProfil du registre successoral",
  "assets.registry.description":
    "\nMappez cet actif dans la hiérarchie du domaine et associez-le à la capacité de formation qu'il prend en charge.",
  "assets.registry.hierarchyLabel": "\nNiveau hiérarchique",
  "assets.registry.parentLabel": "\nActif parent",
  "assets.registry.capabilityLabel": "\nLien avec la capacité opérationnelle",
  "assets.registry.capabilityPlaceholder":
    "\nExemple : disponibilité du champ de tir, préparation à l'hébergement, répartition des véhicules",
  "assets.registry.capabilityHint":
    "\nDécrivez le résultat opérationnel que cet actif permet afin que les rapports sur le patrimoine puissent être regroupés par capacité.",
  "assets.registry.parentHint":
    "\nChoisissez un parent du même site lorsque cet actif se trouve sous une installation, un système ou un sous-système dans la hiérarchie du domaine.",
  "assets.registry.hierarchyHint":
    "\nUtilisez Domaine → Installation → Système → Sous-système → Composant pour maintenir la cohérence du registre.",
  "assets.registry.parentRoot": "\nAucun élément parent",
  "assets.registry.submit": "\nEnregistrer le profil de registre",
  "assets.registry.submitAria": "\nEnregistrer le profil du registre successoral",
  "assets.registry.snapshotTitle": "\nInstantané de liaison de registre",
  "assets.registry.snapshotDescription":
    "\nChaîne hiérarchique actuelle et cumul de capacités utilisés par la stratégie immobilière, la planification des ordres de travail et les exportations.",
  "assets.registry.snapshotParent": "\nActif parent",
  "assets.registry.snapshotChildren": "\nActifs directs des enfants",
  "assets.registry.snapshotCapability": "\nLien de capacité",
  "assets.registry.snapshotUpdated": "\nDernière mise à jour",
  "assets.registry.historyTitle": "\nModifier l'historique",
  "assets.registry.historyDescription":
    "Les mises à jour du registre versionnées sont capturées ici pour la gouvernance de la hiérarchie et des capacités.",
  "assets.registry.historyEmpty":
    "\nAucune modification du registre n'a encore été enregistrée. Enregistrez une mise à jour pour démarrer la piste d'audit.",
  "assets.registry.historyUpdated": "\nMise à jour du registre",
  "assets.registry.historyFrom": "\nÀ partir de",
  "assets.registry.historyTo": "\nÀ",
  "assets.registry.history.fieldHierarchy": "\nNiveau hiérarchique",
  "assets.registry.history.fieldParent": "\nActif parent",
  "assets.registry.history.fieldCapability": "\nLien avec la capacité opérationnelle",
  "assets.registry.feedback.saved": "\nProfil de registre d'actifs enregistré.",
  "assets.registry.feedback.loadFailed":
    "\nImpossible de charger le profil du registre d'actifs pour le moment.",
  "assets.registry.feedback.saveFailed":
    "\nImpossible d'enregistrer le profil du registre d'actifs pour le moment.",
  "assets.registry.validation.hierarchyLevelRequired":
    "\nChoisissez un niveau hiérarchique valide.",
  "assets.registry.validation.parentSelf": "\nUn actif ne peut pas être son propre parent.",
  "assets.registry.validation.parentMissing":
    "\nChoisissez un actif parent valide dans ce registre.",
  "assets.registry.validation.parentSiteMismatch":
    "\nLes actifs parents doivent appartenir au même site pour préserver l'intégrité de la hiérarchie successorale.",
  "assets.registry.validation.parentLevel":
    "\nChoisissez un actif parent situé au-dessus du niveau hiérarchique sélectionné.",
  "assets.registry.validation.parentCycle":
    "\nCe parent créerait une hiérarchie successorale circulaire.",
  "tasks.quickAdd": "\nTâche d'ajout rapide",
  "tasks.quickAddAsset": "\nActif",
  "tasks.quickAddSuccess": "\nTâche créée",
  "tasks.quickAddPlaceholder": "\nTitre de la tâche...",
  "tasks.newTask": "\nNouvelle tâche",
  "tasks.quickAddAdd": "\nAjouter",
  "tasks.quickAddStatus": "\nStatut",
  "tasks.dragToReorder": "\nFaites glisser pour changer le statut",
  "tasks.detail": "\nDétail de la tâche",
  "tasks.statusUpdated": "\nStatut de la tâche mis à jour",
  "tasks.empty": "\nAucune tâche correspondante trouvée",
  "tasks.emptyBacklog": "\nAucune tâche dans le Backlog",
  "tasks.emptyInProgress": "\nAucune tâche en cours",
  "tasks.emptyReview": "\nAucune tâche en révision",
  "tasks.emptyDone": "\nAucune tâche terminée",
  "tasks.addToColumn": "\nAjouter une tâche",
  "tasks.moveToStatus": "\nPasser au statut",
  "predictions.markReviewed": "\nMarquer comme révisé",
  "predictions.emptyExplainer":
    "\nLes prédictions s'affichent lorsque les appareils signalent des données de télémétrie pendant plus de 7 jours",
  "predictions.severityLegend": "\nLégende de gravité",
  "predictions.severityInfo": "\nInformatif – aucune action requise",
  "predictions.severityWarning": "\nAttention requise – planifier la maintenance",
  "predictions.severityCritical": "\nAction immédiate requise",
  "profile.edit": "\nModifier le profil",
  "profile.editName": "\nModifier le nom",
  "profile.nameRequired": "\nLe nom est requis",
  "profile.saved": "\nProfil mis à jour",
  "profile.preferencesSaved": "\nPréférences enregistrées",
  "profile.notificationPreferences": "\nPréférences de notification",
  "profile.enableNotifications": "\nActiver les notifications par e-mail",
  "profile.locale": "\nParamètres régionaux",
  "profile.localeEnGb": "\nAnglais (Royaume-Uni)",
  "profile.localeEnUs": "\nAnglais (États-Unis)",
  "profile.savePreferences": "\nEnregistrer les préférences",
  "profile.languageLocale": "\nLangue / paramètres régionaux",
  "profile.avatarAlt": "\nAvatar du profil",
  "auth.forgotPassword": "\nMot de passe oublié ?",
  "auth.forgotPassword.documentTitle": "\nMot de passe oublié — Plateforme d'exploitation",
  "auth.forgotPasswordHelp": "\nSaisissez l'adresse e-mail utilisée pour votre compte.",
  "auth.forgotPasswordPageHelp":
    "\nNous vous enverrons un lien sécurisé de réinitialisation du mot de passe si le compte existe.",
  "auth.forgotPassword.contextTitle": "\nEspace de travail de récupération",
  "auth.forgotPassword.contextDescription":
    "\nContinuez la récupération sur le même flux sécurisé, confirmez l'adresse du compte et explicitez l'étape suivante avant de quitter cet écran.",
  "auth.forgotPassword.progressTitle": "\nFlux de récupération",
  "auth.forgotPassword.progressDescription":
    "\nDemandez le lien, vérifiez votre boîte de réception, définissez un nouveau mot de passe, puis consultez les sessions actives.",
  "auth.forgotPassword.progressStep.request": "\nDemander le lien",
  "auth.forgotPassword.progressStep.inbox": "\nVérifier la boîte de réception",
  "auth.forgotPassword.progressStep.reset": "\nRéinitialiser le mot de passe",
  "auth.forgotPassword.responseWindowLabel": "\nEspérance de livraison",
  "auth.forgotPassword.responseWindowValue":
    "\nLa livraison du lien commence immédiatement après la soumission",
  "auth.forgotPassword.channelLabel": "Canal de récupération",
  "auth.forgotPassword.channelValue": "\nRéinitialisation par e-mail avec redirection sécurisée",
  "auth.forgotPassword.checklist.accountTitle": "\nConfirmez d'abord l'adresse e-mail du compte",
  "auth.forgotPassword.checklist.accountDescription":
    "\nUtilisez l'adresse qui a déjà accès à l'espace de travail de l'organisation pour éviter de redémarrer le flux de récupération.",
  "auth.forgotPassword.checklist.inboxTitle":
    "\nSurveiller la boîte de réception et les dossiers spam",
  "auth.forgotPassword.checklist.inboxDescription":
    "\nLe lien sécurisé peut arriver quelques instants après la soumission en fonction de la passerelle de messagerie de l'organisation.",
  "auth.forgotPassword.checklist.supportTitle":
    "\nUtilisez le même chemin de récupération pour le support",
  "auth.forgotPassword.checklist.supportDescription":
    "\nSi le message n'arrive pas, réessayez à partir de cet écran et conservez le même contexte de compte au lieu de créer un nouveau chemin de connexion.",
  "auth.forgotPassword.timingTitle": "\nDélai de récupération",
  "auth.forgotPassword.timingDescription":
    "\nTenez l'opérateur informé du moment où la demande arrive, du moment où la boîte de réception doit être vérifiée et du moment où réessayer.",
  "auth.forgotPassword.timingSubmittedTitle": "\nDemande soumise",
  "auth.forgotPassword.timingSubmittedDescription":
    "\nNous mettons en file d'attente l'e-mail de réinitialisation sécurisée dès que la demande est acceptée.",
  "auth.forgotPassword.timingInboxTitle": "\nVérifiez la boîte de réception",
  "auth.forgotPassword.timingInboxDescription":
    "\nRecherchez d'abord l'e-mail de récupération dans la boîte de réception principale, puis dans les dossiers spam ou quarantaine.",
  "auth.forgotPassword.timingRetryTitle": "\nRéessayez seulement une fois la fenêtre passée",
  "auth.forgotPassword.timingRetryDescription":
    "\nSi le lien n'est pas arrivé après la fenêtre attendue, réessayez à partir de cette page afin que le même chemin de récupération reste actif.",
  "auth.forgotPasswordResetTitle": "\nRéinitialisez votre mot de passe",
  "auth.resetPassword.documentTitle": "\nRéinitialiser le mot de passe — Plateforme d'exploitation",
  "auth.forgotPasswordCheckEmail": "\nVérifiez votre email",
  "auth.forgotPassword.sent.documentTitle": "\nVérifiez votre email — Plateforme d'exploitation",
  "auth.forgotPasswordCheckEmailDesc":
    "\nSi un compte existe avec cette adresse e-mail, nous avons envoyé un lien de réinitialisation du mot de passe.",
  "auth.forgotPassword.sentTitle": "\nLien de récupération envoyé",
  "auth.forgotPassword.sentDescription":
    "\nUtilisez le lien sécurisé de votre boîte de réception, puis revenez au même flux de connexion afin que la destination de l'espace de travail soit préservée.",
  "auth.forgotPassword.sentTimingTitle": "\nQue se passe-t-il ensuite",
  "auth.forgotPassword.sentTimingDescription":
    "\nUtilisez le lien de courrier électronique rapidement, réessayez uniquement si nécessaire et gardez le contexte de sécurité visible pendant que vous attendez.",
  "auth.forgotPassword.sentTimingArrivalTitle": "\nArrivée du lien",
  "auth.forgotPassword.sentTimingArrivalDescription":
    "\nL'e-mail de réinitialisation devrait arriver peu de temps après l'envoi, en fonction de la passerelle de messagerie de l'organisation.",
  "auth.forgotPassword.sentTimingRetryTitle": "\nRéessayez les conseils",
  "auth.forgotPassword.sentTimingRetryDescription":
    "\nSi rien n'arrive après la fenêtre attendue, renvoyez la demande à partir du même flux de récupération au lieu de recommencer ailleurs.",
  "auth.forgotPassword.sentTimingSecurityTitle": "\nRappel de sécurité",
  "auth.forgotPassword.sentTimingSecurityDescription":
    "Utilisez uniquement le lien du canal de messagerie de confiance et ignorez les messages inattendus de réinitialisation de mot de passe.",
  "auth.sendResetLink": "\nEnvoyer le lien de réinitialisation",
  "auth.backToSignIn": "\nRetour à la connexion",
  "auth.forgotPasswordSent":
    "\nVérifiez votre courrier électronique pour un lien de réinitialisation de mot de passe",
  "auth.resetPasswordHelp": "\nChoisissez un nouveau mot de passe pour votre compte.",
  "auth.resetPassword.contextTitle": "\nExamen de la réinitialisation du mot de passe",
  "auth.resetPassword.contextDescription":
    "\nMettez à jour les informations d'identification, confirmez une fois le nouveau secret et laissez la prochaine étape de sécurité visible avant de continuer.",
  "auth.resetPassword.progressTitle": "\nRéinitialiser le flux de travail",
  "auth.resetPassword.progressDescription":
    "\nDéfinissez le nouveau mot de passe, confirmez-le une fois et examinez les sessions après la réinitialisation.",
  "auth.resetPassword.progressStep.request": "\nDemander le lien",
  "auth.resetPassword.progressStep.reset": "\nDéfinir un nouveau mot de passe",
  "auth.resetPassword.progressStep.review": "\nSéances de révision",
  "auth.resetPasswordNewPasswordLabel": "\nNouveau mot de passe",
  "auth.resetPasswordConfirmPasswordLabel": "\nConfirmer le nouveau mot de passe",
  "auth.resetPasswordNewPasswordHint": "\nUtilisez au moins {count} caractères.",
  "auth.resetPasswordConfirmPasswordHint": "\nSaisissez à nouveau le même mot de passe.",
  "auth.resetPassword.policyLabel": "\nPolitique de mot de passe",
  "auth.resetPassword.policyValue": "\nMinimum {count} caractères avec une valeur unique",
  "auth.resetPassword.sessionLabel": "\nAprès la réinitialisation",
  "auth.resetPassword.sessionValue":
    "\nRévision des sessions et retour à l'espace de travail sécurisé",
  "auth.resetPassword.checklist.passwordTitle": "\nCréez un nouveau mot de passe",
  "auth.resetPassword.checklist.passwordDescription":
    "\nUtilisez au moins {count} caractères et évitez de réutiliser les informations d'identification partagées entre les outils.",
  "auth.resetPassword.checklist.confirmTitle": "\nFaites correspondre le champ de confirmation",
  "auth.resetPassword.checklist.confirmDescription":
    "\nConfirmez le mot de passe sur cet écran afin que le flux de récupération se termine sans deuxième tentative.",
  "auth.resetPassword.checklist.securityTitle": "\nVérifier la sécurité du compte ensuite",
  "auth.resetPassword.checklist.securityDescription":
    "\nUne fois la réinitialisation réussie, reconnectez-vous et vérifiez les sessions récentes avant de reprendre votre travail quotidien.",
  "auth.resetPassword.monitoringTitle": "\nRéinitialisation de la préparation",
  "auth.resetPassword.monitoringDescription":
    "\nSuivez la force du mot de passe, l'état de confirmation et l'examen de sécurité final avant de soumettre la réinitialisation.",
  "auth.resetPassword.monitoringStep.passwordTitle": "\nRespecter la politique de mot de passe",
  "auth.resetPassword.monitoringStep.passwordDescription":
    "\nUtilisez au moins {count} caractères et évitez les informations d'identification déjà utilisées ailleurs.",
  "auth.resetPassword.monitoringStep.matchTitle": "\nConfirmez le nouveau mot de passe",
  "auth.resetPassword.monitoringStep.matchDescription":
    "\nFaites correspondre exactement le champ de confirmation afin que la réinitialisation puisse se terminer en une seule passe.",
  "auth.resetPassword.monitoringStep.reviewTitle":
    "\nPassez en revue la prochaine étape de sécurité",
  "auth.resetPassword.monitoringStep.reviewDescription":
    "\nPrévoyez de vous reconnecter et d'inspecter les sessions récentes une fois la mise à jour du mot de passe réussie.",
  "auth.resetPassword.monitoringLengthLabel": "\nLongueur du mot de passe",
  "auth.resetPassword.monitoringLengthPending":
    "\nAjoutez au moins {count} caractères pour respecter la politique de mot de passe actuelle.",
  "auth.resetPassword.monitoringLengthReady": "\nExigence de longueur de mot de passe respectée.",
  "auth.resetPassword.monitoringPending": "\nEn attente",
  "auth.resetPassword.monitoringReady": "\nPrêt",
  "auth.resetPassword.monitoringMatchLabel": "\nCorrespondance de confirmation",
  "auth.resetPassword.monitoringMatchPending":
    "\nSaisissez le même mot de passe dans le champ de confirmation pour continuer.",
  "auth.resetPassword.monitoringMatchReady":
    "Les mots de passe correspondent et sont prêts à être soumis.",
  "auth.resetPassword.monitoringReviewLabel": "\nSuivi de sécurité",
  "auth.resetPassword.monitoringReviewValue":
    "\nReconnectez-vous, examinez les sessions récentes et confirmez le chemin de récupération avant de retourner au travail.",
  "auth.resetPassword.monitoringReviewState": "\nRévision après réinitialisation",
  "auth.resetPassword.monitoringLiveIdle":
    "\nLa surveillance de la réinitialisation du mot de passe attend un mot de passe conforme à la stratégie.",
  "auth.resetPassword.monitoringLiveConfirm":
    "\nPolitique de mot de passe respectée. Confirmez le mot de passe pour terminer la réinitialisation.",
  "auth.resetPassword.monitoringLiveReady":
    "\nLes exigences de réinitialisation du mot de passe sont remplies et prêtes à être soumises.",
  "auth.resetPasswordSubmit": "\nRéinitialiser le mot de passe",
  "auth.resetPasswordSuccessTitle": "\nMot de passe mis à jour",
  "auth.resetPassword.success.documentTitle":
    "\nMot de passe mis à jour — Plateforme d'exploitation",
  "auth.resetPasswordSuccessBody":
    "\nVotre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec le nouveau mot de passe.",
  "auth.resetPassword.reviewSecurity": "\nVérifier la sécurité après la connexion",
  "auth.resetPasswordMissingToken":
    "\nCe lien de réinitialisation du mot de passe est incomplet. Demandez-en un nouveau pour continuer.",
  "auth.resetPasswordInvalidToken":
    "\nCe lien de réinitialisation de mot de passe n'est pas valide ou a expiré. Demandez-en un nouveau pour continuer.",
  "auth.resetPasswordPasswordsDoNotMatch": "\nLa confirmation du mot de passe ne correspond pas.",
  "auth.resetPasswordPasswordTooShort":
    "\nLe mot de passe doit contenir au moins {count} caractères.",
  "auth.resetPasswordRequestEmailRequired": "\nSaisissez l'adresse e-mail associée à votre compte.",
  "auth.resetPasswordEmailSubject": "\nRéinitialisez votre mot de passe {brandName}",
  "auth.resetPasswordEmailIntro":
    "\nUtilisez le lien ci-dessous pour réinitialiser votre mot de passe {brandName} :",
  "auth.resetPasswordEmailOutro":
    "\nSi vous n'avez pas demandé cette modification, vous pouvez ignorer cet e-mail.",
  "auth.tooManyAttempts": "\nTrop de tentatives. Veuillez réessayer dans {minutes} minutes.",
  "dashboard.dateRange": "\nPlage de dates",
  "dashboard.last7Days": "\n7 derniers jours",
  "dashboard.last30Days": "\n30 derniers jours",
  "dashboard.last90Days": "\n90 derniers jours",
  "dashboard.activityFeed.title": "\nActivité récente",
  "dashboard.activityFeed.subtitle": "\nDerniers événements de plate-forme et changements d'état",
  "dashboard.platformStats": "\nRésumé de la plateforme",
  "dashboard.onboardingTitle": "\nCommencez avec {brandName}",
  "dashboard.onboardingStep1": "\nAjoutez votre premier appareil",
  "dashboard.onboardingStep2": "\nAfficher les prédictions de l'IA",
  "dashboard.onboardingStep3": "\nConfigurer les rapports",
  "finance.empty": "\nAucun actif n'a de données d'amortissement configurées",
  "finance.fiscalPeriod": "\nPériode fiscale",
  "finance.exportData": "\nExporter les données",
  "finance.export.csvTooltip": "\nTélécharge la vue filtrée actuelle au format CSV",
  "finance.depreciation.table.accumulatedDepreciation": "\nAmortissement cumulé",
  "finance.depreciation.table.netBookValue": "\nValeur comptable nette",
  "reports.dateRange": "\nPlage de dates",
  "reports.reportHistory": "\nHistorique des rapports",
  "reports.noHistory": "\nAucun rapport généré pour l'instant",
  "reports.history.title": "\nChronologie du rapport enregistré",
  "reports.history.description":
    "\nConservez les rapports personnalisés générés, examinez la chronologie et rouvrez les sorties récentes.",
  "reports.history.empty":
    "\nAucun rapport enregistré pour l'instant. Générez et enregistrez un rapport personnalisé pour démarrer la chronologie.",
  "reports.history.emptyFinancePlanning":
    "\nAucun rapport prédéfini de planification financière n'a encore été enregistré.",
  "reports.history.filter.all": "\nTous",
  "reports.history.filter.financePlanning": "\nPlanification financière",
  "reports.history.saveAction": "\nEnregistrer le rapport",
  "reports.history.saved": "\nRapport enregistré dans la chronologie",
  "reports.history.savedMeta":
    "{generatedAt} • {sectionCount} sections • Couverture {coverageScore}% • {createdBy}",
  "reports.history.loadAria": "\nCharger le rapport enregistré {name} dans le générateur",
  "reports.history.askAiAria": "\nInterrogez AI à propos du rapport enregistré {name}",
  "reports.history.reviewPrompt":
    "Consultez le rapport enregistré {report}. Il cible le public {audience} avec un focus {focus} et inclut {sections}. Expliquez quand cette entrée de chronologie doit être réutilisée, actualisée ou retirée.",
  "reports.history.comparePrompt":
    "\nComparez le rapport enregistré {report} avec le pack actif {activePack}. Le pack enregistré cible le public {audience} avec un focus {focus} et comprend {sections}. Expliquez ce qui a changé, ce qui compte toujours et quelles analyses ou mises à jour des données devraient avoir lieu ensuite.",
  "reports.history.error.invalid":
    "\nLe rapport généré est incomplet et n'a pas pu être enregistré.",
  "reports.history.error.saveFailed":
    "\nImpossible d'enregistrer l'entrée de chronologie du rapport pour le moment.",
  "sites.title": "\nBases et installations",
  "sites.subtitle":
    "\nGérer les emplacements opérationnels, les classifications et les dépendances.",
  "sites.kind.base": "\nBase",
  "sites.kind.facility": "\nInstallation",
  "sites.stats.active": "\nSites actifs",
  "sites.stats.bases": "\nBases",
  "sites.stats.facilities": "\nInstallations",
  "sites.table.name": "\nEmplacement",
  "sites.table.kind": "\nTapez",
  "sites.table.coordinates": "\nCoordonnées",
  "sites.table.dependencies": "\nDépendances",
  "sites.table.status": "\nStatut",
  "sites.metrics.assets": "\n{count} actifs",
  "sites.metrics.crews": "\n{count} équipages",
  "sites.metrics.iot": "\n{count} Appareils IoT",
  "sites.status.active": "\nActif",
  "sites.status.inactive": "\nInactif",
  "sites.actions.edit": "\nModifier l'emplacement",
  "sites.actions.delete": "\nSupprimer l'emplacement",
  "sites.form.nameLabel": "\nNom",
  "sites.form.kindLabel": "\nClassement",
  "sites.form.locationLabel": "\nEmplacement",
  "sites.form.descriptionLabel": "\nDescription",
  "sites.form.gpsLatLabel": "\nLatitude",
  "sites.form.gpsLonLabel": "\nLongitude",
  "sites.form.activeLabel": "\nActif et disponible pour les opérations",
  "sites.form.updateAction": "\nEnregistrer les modifications",
  "sites.form.createAction": "\nCréer un emplacement",
  "sites.form.createTitle": "\nAjouter une base ou une installation",
  "sites.form.createDescription":
    "\nCréez un nouveau site opérationnel et rendez-le disponible dans les workflows financiers, documentaires et d'utilisation.",
  "sites.feedback.created": "\nEmplacement créé avec succès.",
  "sites.feedback.updated": "\nEmplacement mis à jour avec succès.",
  "sites.feedback.deleted": "\nEmplacement supprimé avec succès.",
  "sites.error.invalid": "\nEntrez un nom de site et un emplacement valides.",
  "sites.error.invalidCoordinates": "\nLa latitude ou la longitude est hors limites.",
  "sites.error.inUse":
    "\nCe site comporte toujours des dépendances opérationnelles et ne peut pas être supprimé.",
  "sites.error.notFound": "\nLe site demandé est introuvable.",
  "sites.error.saveFailed": "\nLa modification du site n'a pas pu être enregistrée.",
  "documentWorkspace.section.eyebrow": "\nEspace de travail transactionnel",
  "documentWorkspace.section.filtersAria": "\nFiltres d'espace de travail",
  "documentWorkspace.section.savedViewTitle": "\nVues enregistrées basées sur les rôles",
  "documentWorkspace.section.savedViewDescription":
    "\nConservez la combinaison actuelle de rôle, de filtre et d'onglets disponible en tant que tranche d'espace de travail durable.",
  "documentWorkspace.section.commandTitle": "\nPosture de commandement",
  "documentWorkspace.section.commandDescription":
    "\nSuivez la phase actuelle du document, le transfert de livraison et la pression de contrôle avant d'explorer les enregistrements en direct.",
  "documentWorkspace.section.recentTitle": "\nDocuments récents",
  "documentWorkspace.section.recentDescription":
    "\nDerniers enregistrements dans la portée actuelle.",
  "documentWorkspace.section.historyTitle": "\nHistorique du cycle de vie",
  "documentWorkspace.history.approvalRoutedTitle": "\nApprobation acheminée",
  "documentWorkspace.history.approvalRoutedDescription":
    "\nLe service financier a mis en file d'attente la prochaine étape d'examen.",
  "documentWorkspace.section.historyDescription":
    "\nChronologie immuable pour le mouvement des documents.",
  "documentWorkspace.section.compareTitle": "\nPlateau de comparaison de décision",
  "documentWorkspace.section.compareDescription":
    "Gardez le document principal, la pression d'approbation et la position d'exportation visibles dans un seul rail partagé.",
  "documentWorkspace.section.approvalInboxTitle": "\nBoîte de réception d'approbation",
  "documentWorkspace.section.approvalInboxDescription":
    "\nFaites apparaître la prochaine décision en attente et gardez la file d'attente d'approbation visible.",
  "documentWorkspace.section.exportPackTitle": "\nPack d'exportation et de preuves",
  "documentWorkspace.section.exportPackDescription":
    "\nRegroupez l'enregistrement sélectionné, l'historique et les preuves à l'appui pour le prochain flux de travail.",
  "documentWorkspace.section.collectionsTitle": "\nFlux de recouvrements et d'écarts",
  "documentWorkspace.section.collectionsDescription":
    "\nSuivez le paiement, le reçu ou la pression d'écart restant avant qu'ils ne deviennent un bloqueur.",
  "documentWorkspace.section.relatedActivityTitle": "\nContexte de l'activité connexe",
  "documentWorkspace.section.relatedActivityDescription":
    "\nGardez le dernier mouvement, les enregistrements liés et le transfert de l'opérateur visibles depuis le même espace de travail.",
  "documentWorkspace.metricTone.neutral": "\nStable",
  "documentWorkspace.metricTone.primary": "\nPriorité",
  "documentWorkspace.metricTone.info": "\nEn revue",
  "documentWorkspace.metricTone.success": "\nEn bonne voie",
  "documentWorkspace.metricTone.warning": "\nAttention",
  "documentWorkspace.metricTone.error": "\nEscaladé",
  "documentWorkspace.table.document": "\nDocument",
  "documentWorkspace.table.status": "\nStatut",
  "documentWorkspace.table.amount": "\nMontant",
  "documentWorkspace.table.date": "\nDate",
  "documentWorkspace.list.filterBarAria": "\nFiltres de la liste de documents",
  "documentWorkspace.list.searchPlaceholder": "\nRechercher des documents…",
  "documentWorkspace.list.searchAria": "\nRechercher des documents",
  "documentWorkspace.list.statusFilterAria": "\nFiltrer par statut",
  "documentWorkspace.list.tableAria": "\nDocuments — {documentType}",
  "documentWorkspace.list.emptyTitle": "\nAucun document pour le moment",
  "documentWorkspace.list.emptyCta": "\nCréer un document",
  "documentWorkspace.list.tableLoading": "\nChargement des documents",
  "documentWorkspace.list.sectionAria": "\nListe des documents",
  "documentWorkspace.tab.overview": "\nAperçu",
  "documentWorkspace.tab.documents": "\nDocuments",
  "documentWorkspace.tab.history": "\nHistoire",
  "documentWorkspace.filter.all": "\nTous",
  "documentWorkspace.metric.total": "\nTotal",
  "documentWorkspace.metric.completed": "\nTerminé",
  "documentWorkspace.emptyCta":
    "\nCréez votre premier document pour commencer à suivre ce flux de travail.",
  "documentWorkspace.emptyTimelineCta":
    "\nL'activité du document apparaîtra ici une fois les enregistrements créés.",
  "documentWorkspace.rfq.heading": "\nAppels d'offres",
  "documentWorkspace.rfq.description":
    "\nEntonnoir de qualification entrant pour les demandes publiques, les conversations avec les partenaires et la conversion de devis.",
  "documentWorkspace.rfq.empty": "\nAucune demande d'appel d'offres n'est encore disponible.",
  "documentWorkspace.rfq.timelineEmpty":
    "\nAucun historique des appels d'offres n'est encore disponible.",
  "documentWorkspace.rfq.timelineFallback": "\nFlux de travail des appels d'offres mis à jour.",
  "documentWorkspace.rfq.metric.submitted": "\nSoumis",
  "documentWorkspace.rfq.metric.quoted": "\nCité",
  "documentWorkspace.rfq.metric.accepted": "\nAccepté",
  "documentWorkspace.rfq.filter.submitted": "\nSoumis",
  "documentWorkspace.rfq.filter.quoted": "\nCité",
  "documentWorkspace.rfq.filter.accepted": "\nAccepté",
  "documentWorkspace.rfq.step.draft": "\nBrouillon",
  "documentWorkspace.rfq.step.submitted": "\nSoumis",
  "documentWorkspace.rfq.step.qualified": "\nQualifié",
  "documentWorkspace.rfq.step.quoted": "\nCité",
  "documentWorkspace.rfq.step.accepted": "\nAccepté",
  "documentWorkspace.rfq.step.declined": "\nRefusé",
  "documentWorkspace.rfq.step.expired": "\nExpiré",
  "documentWorkspace.rfq.secondaryFallback": "\nDemande anonyme",
  "documentWorkspace.rfq.amountFallback": "\nBudget à déterminer",
  "documentWorkspace.rfq.notFound": "\nLa demande de prix n'a pas été trouvée.",
  "documentWorkspace.rfq.submitted": "\nRFQ {requestNumber} soumis.",
  "documentWorkspace.rfq.lineItemFallback": "\nPortée générale du projet",
  "documentWorkspace.rfq.validation.title": "\nDites-nous à quoi sert la demande.",
  "documentWorkspace.rfq.validation.summary":
    "\nAjoutez un bref résumé opérationnel pour que le tri commence par le contexte.",
  "documentWorkspace.rfq.validation.email": "\nSaisissez une adresse e-mail de contact valide.",
  "documentWorkspace.rfq.validation.dueDate": "\nUtilisez une date de péremption valide.",
  "documentWorkspace.rfq.validation.budget": "\nUtilisez un budget numérique valide.",
  "documentWorkspace.rfq.validation.error":
    "\nLa soumission de la demande de prix nécessite quelques corrections.",
  "documentWorkspace.workOrder.heading": "\nBons de travail",
  "documentWorkspace.workOrder.description":
    "\nApprobation, planification, SLA et historique d'achèvement pour la livraison opérationnelle.",
  "documentWorkspace.workOrder.empty": "\nAucun bon de travail n'est encore disponible.",
  "documentWorkspace.workOrder.timelineEmpty":
    "\nAucun historique des bons de travail n'est encore disponible.",
  "documentWorkspace.workOrder.timelineFallback":
    "\nCycle de vie de l'ordre de travail mis à jour.",
  "documentWorkspace.workOrder.metric.inProgress": "\nEn cours",
  "documentWorkspace.workOrder.metric.reviewQueue": "\nFile d'attente de révision",
  "documentWorkspace.workOrder.filter.triage": "\nTriage",
  "documentWorkspace.workOrder.filter.scheduled": "\nProgrammé",
  "documentWorkspace.workOrder.filter.review": "\nPrêt pour l'examen",
  "documentWorkspace.workOrder.step.draft": "\nBrouillon",
  "documentWorkspace.workOrder.step.triage": "\nTriage",
  "documentWorkspace.workOrder.step.approved": "Approuvé",
  "documentWorkspace.workOrder.step.scheduled": "\nProgrammé",
  "documentWorkspace.workOrder.step.inProgress": "\nEn cours",
  "documentWorkspace.workOrder.step.readyForReview": "\nPrêt pour l'examen",
  "documentWorkspace.workOrder.step.completed": "\nTerminé",
  "documentWorkspace.workOrder.step.cancelled": "\nAnnulé",
  "documentWorkspace.workOrder.notFound": "\nLe bon de travail n'a pas été trouvé.",
  "workOrders.detail.title": "\nDétails de l'ordre de travail",
  "workOrders.detail.subtitle":
    "\nSuivez l'allocation de la main-d'œuvre, le rendement de la main-d'œuvre et la capture des coûts par rapport à une seule commande opérationnelle.",
  "workOrders.detail.summaryTitle": "\nRésumé de l'exécution",
  "workOrders.detail.summaryDescription":
    "\nÉtat de livraison actuel, contexte du destinataire et cumul des coûts appliqués à cette commande.",
  "workOrders.detail.site": "\nSite",
  "workOrders.detail.customerOrder": "\nCommande client",
  "workOrders.detail.assignee": "\nDestinataire",
  "workOrders.detail.schedule": "\nFenêtre planifiée",
  "workOrders.detail.costs.labour": "\nCoût de la main d'œuvre",
  "workOrders.detail.costs.material": "\nCoût du matériel",
  "workOrders.detail.costs.other": "\nAutre coût",
  "workOrders.detail.assigneeRole": "Rôle attribué",
  "workOrders.detail.updatedAt": "\nDernière mise à jour",
  "workOrders.detail.outputUnits": "\nUnités de sortie",
  "workOrders.detail.signoffPending": "\nApprobation du superviseur en attente",
  "workOrders.detail.signoffReady": "\nPrêt pour l'approbation du superviseur",
  "workOrders.detail.signoffComplete": "\nApprobation du superviseur terminée",
  "workOrders.detail.descriptionTitle": "\nBrief opérationnel",
  "workOrders.detail.descriptionDescription":
    "\nConservez le récit de la portée et les notes d'exécution à côté du grand livre de la main-d'œuvre.",
  "workOrders.labor.feedback.saved":
    "\nSaisie de main d'œuvre enregistrée et cumul des coûts d'ordre de travail actualisé.",
  "workOrders.labor.activity.inspection": "\nInspection",
  "workOrders.labor.activity.maintenance": "\nEntretien",
  "workOrders.labor.activity.repair": "\nRéparation",
  "workOrders.labor.activity.installation": "\nInstallation",
  "workOrders.labor.activity.range_support": "\nPrise en charge de la gamme",
  "workOrders.labor.activity.soft_fm": "\nFM doux",
  "workOrders.labor.activity.compliance": "\nConformité",
  "workOrders.labor.summary.totalHours": "\nHeures enregistrées",
  "workOrders.labor.summary.totalHoursDesc":
    "\nSuivi de l'effort de main-d'œuvre dans le grand livre actuel.",
  "workOrders.labor.summary.totalCost": "\nCoût de la main d'œuvre réservée",
  "workOrders.labor.summary.totalCostDesc":
    "\nIntégré dans le champ Coût de la main-d'œuvre de l'ordre de travail.",
  "workOrders.labor.summary.workerCount": "\nTravailleurs affectés",
  "workOrders.labor.summary.workerCountDesc":
    "\nEmployés distincts enregistrés en regard de cet ordre.",
  "workOrders.labor.summary.productivity": "\nTaux de productivité",
  "workOrders.labor.summary.productivityDesc":
    "\n{output} unités de sortie enregistrées dans le grand livre actuel.",
  "workOrders.labor.form.title": "\nCapturer l'activité de la main-d'œuvre",
  "workOrders.labor.form.description":
    "\nEnregistrez l'effort sur la feuille de temps, les unités de sortie et le coût de la main-d'œuvre directement par rapport à l'ordre de travail opérationnel.",
  "workOrders.labor.form.submitAria":
    "\nEnregistrer l'entrée de main d'œuvre de l'ordre de travail",
  "workOrders.labor.form.employee": "\nEmployé",
  "workOrders.labor.form.employeePlaceholder": "\nSélectionnez un employé",
  "workOrders.labor.form.employeeHint":
    "\nUtilisez l’annuaire d’utilisateurs interne partagé comme source de vérité sur le personnel.",
  "workOrders.labor.form.activity": "\nActivité",
  "workOrders.labor.form.activityPlaceholder": "\nSélectionnez l'activité",
  "workOrders.labor.form.activityHint":
    "\nClassez la production opérationnelle afin que la productivité et la composition de la main-d'œuvre puissent être comparées.",
  "workOrders.labor.form.entryDate": "\nDate d'entrée",
  "workOrders.labor.form.entryDateHint":
    "\nSaisissez la date à laquelle le travail a été effectué.",
  "workOrders.labor.form.hours": "\nHeures",
  "workOrders.labor.form.hoursHint":
    "\nUtilisez des heures décimales pour l'effort de travail enregistré.",
  "workOrders.labor.form.hourlyRate": "\nTaux horaire",
  "workOrders.labor.form.hourlyRateHint":
    "\nCapturé en {currency} et intégré au coût de main-d'œuvre.",
  "workOrders.labor.form.outputUnits": "\nUnités de sortie",
  "workOrders.labor.form.outputUnitsHint":
    "\nQuantité de productivité facultative utilisée pour comparer le débit opérationnel.",
  "workOrders.labor.form.notes": "\nRemarques",
  "workOrders.labor.form.notesHint":
    "\nCapturez les notes de quart de travail, les bloqueurs ou les commentaires d'assurance.",
  "workOrders.labor.form.submit": "\nAjouter une entrée de main d'oeuvre",
  "workOrders.labor.table.title": "\nGrand livre de main d'œuvre",
  "workOrders.labor.table.description":
    "\nEntrées de travail durables de type feuille de temps liées à un seul résultat opérationnel.",
  "workOrders.labor.table.employee": "\nEmployé",
  "workOrders.labor.table.activity": "\nActivité",
  "workOrders.labor.table.entryDate": "\nDate",
  "workOrders.labor.table.hours": "\nHeures",
  "workOrders.labor.table.outputUnits": "\nSortie",
  "workOrders.labor.table.totalCost": "\nCoût",
  "workOrders.labor.table.notes": "\nRemarques",
  "workOrders.labor.table.loggedBy": "\nEnregistré par {name}",
  "workOrders.labor.table.empty":
    "\nAucune entrée de main d'œuvre n'a encore été capturée pour cet ordre de travail.",
  "workOrders.labor.validation.formInvalid":
    "\nCorrigez le formulaire de saisie du travail avant de sauvegarder.",
  "workOrders.labor.validation.employeeId": "\nSélectionnez l'employé qui a terminé le travail.",
  "workOrders.labor.validation.employeeMissing":
    "\nL'employé sélectionné n'est plus disponible pour l'allocation de main-d'œuvre.",
  "workOrders.labor.validation.activity": "\nSélectionnez une activité de travail valide.",
  "workOrders.labor.validation.entryDate": "\nUtilisez une date d’entrée en main-d’œuvre valide.",
  "workOrders.labor.validation.hours": "\nEntrez les heures travaillées.",
  "workOrders.labor.validation.hoursPositive": "\nLes heures doivent être supérieures à zéro.",
  "workOrders.labor.validation.hourlyRate": "\nUtilisez un taux horaire valide.",
  "workOrders.labor.validation.outputUnits": "\nUtilisez une valeur d'unité de sortie valide.",
  "documentWorkspace.purchaseOrder.heading": "\nBons de commande",
  "documentWorkspace.purchaseOrder.description":
    "Approbations des fournisseurs, suivi des reçus et points de contrôle de facturation pour le Procure-to-Pay.",
  "documentWorkspace.purchaseOrder.empty": "\nAucun bon de commande n'est encore disponible.",
  "documentWorkspace.purchaseOrder.timelineEmpty":
    "\nAucun historique des bons de commande n'est encore disponible.",
  "documentWorkspace.purchaseOrder.timelineFallback":
    "\nCycle de vie du bon de commande mis à jour.",
  "documentWorkspace.purchaseOrder.metric.pending": "\nEn attente",
  "documentWorkspace.purchaseOrder.metric.received": "\nReçu",
  "documentWorkspace.purchaseOrder.metric.billed": "\nFacturé",
  "documentWorkspace.purchaseOrder.filter.requested": "\nDemandé",
  "documentWorkspace.purchaseOrder.filter.sent": "\nEnvoyé",
  "documentWorkspace.purchaseOrder.filter.received": "\nReçu",
  "documentWorkspace.purchaseOrder.step.draft": "\nBrouillon",
  "documentWorkspace.purchaseOrder.step.requested": "\nDemandé",
  "documentWorkspace.purchaseOrder.step.approved": "Approuvé",
  "documentWorkspace.purchaseOrder.step.sent": "\nEnvoyé",
  "documentWorkspace.purchaseOrder.step.partiallyReceived": "\nPartiellement reçu",
  "documentWorkspace.purchaseOrder.step.received": "\nReçu",
  "documentWorkspace.purchaseOrder.step.billed": "\nFacturé",
  "documentWorkspace.purchaseOrder.step.closed": "\nFermé",
  "documentWorkspace.purchaseOrder.step.cancelled": "\nAnnulé",
  "documentWorkspace.purchaseOrder.notFound": "\nLe bon de commande est introuvable.",
  "documentWorkspace.customerOrder.heading": "\nCommandes clients",
  "documentWorkspace.customerOrder.description":
    "\nEngagements commerciaux, approbations, exécution et conversion à partir des appels d'offres.",
  "documentWorkspace.customerOrder.empty": "\nAucune commande client n'est encore disponible.",
  "documentWorkspace.customerOrder.timelineEmpty":
    "\nAucun historique des commandes client n'est encore disponible.",
  "documentWorkspace.customerOrder.timelineFallback":
    "\nCycle de vie des commandes client mis à jour.",
  "documentWorkspace.customerOrder.metric.approvalQueue": "\nFile d'attente d'approbation",
  "documentWorkspace.customerOrder.metric.inFulfilment": "\nEn réalisation",
  "documentWorkspace.customerOrder.filter.approval": "\nEn attente d'approbation",
  "documentWorkspace.customerOrder.filter.confirmed": "\nConfirmé",
  "documentWorkspace.customerOrder.filter.fulfilment": "\nEn réalisation",
  "documentWorkspace.customerOrder.step.draft": "\nBrouillon",
  "documentWorkspace.customerOrder.step.pendingApproval": "\nEn attente d'approbation",
  "documentWorkspace.customerOrder.step.approved": "Approuvé",
  "documentWorkspace.customerOrder.step.confirmed": "\nConfirmé",
  "documentWorkspace.customerOrder.step.inFulfilment": "\nEn réalisation",
  "documentWorkspace.customerOrder.step.completed": "\nTerminé",
  "documentWorkspace.customerOrder.step.cancelled": "\nAnnulé",
  "documentWorkspace.customerOrder.secondaryFallback": "\nCompte direct",
  "documentWorkspace.customerOrder.notFound": "\nLa commande client n'a pas été trouvée.",
  "documentWorkspace.invoice.heading": "\nFactures",
  "documentWorkspace.invoice.description":
    "\nSuivi opérationnel des AR, encaissements et ancienneté des factures avant export comptable.",
  "documentWorkspace.invoice.empty": "\nAucune facture n'est encore disponible.",
  "documentWorkspace.invoice.timelineEmpty":
    "\nAucun historique de facture n'est encore disponible.",
  "documentWorkspace.invoice.timelineFallback": "\nCycle de vie de la facture mis à jour.",
  "documentWorkspace.invoice.metric.openExposure": "\nExposition ouverte",
  "documentWorkspace.invoice.metric.paid": "\nPayé",
  "documentWorkspace.invoice.metric.draft": "\nBrouillon",
  "documentWorkspace.invoice.filter.issued": "\nPublié",
  "documentWorkspace.invoice.filter.partiallyPaid": "\nPartiellement payé",
  "documentWorkspace.invoice.filter.paid": "\nPayé",
  "documentWorkspace.invoice.step.draft": "\nBrouillon",
  "documentWorkspace.invoice.step.issued": "\nPublié",
  "documentWorkspace.invoice.step.partiallyPaid": "\nPartiellement payé",
  "documentWorkspace.invoice.step.paid": "\nPayé",
  "documentWorkspace.invoice.step.void": "\nAnnuler",
  "documentWorkspace.invoice.step.writtenOff": "\nRadié",
  "documentWorkspace.invoice.notFound": "\nLa facture est introuvable.",
  "portal.title": "\nPortail partenaires",
  "portal.logoLabel": "\nPortail",
  "portal.authenticatedWorkspace": "\nEspace de travail authentifié",
  "portal.sidebar.title": "\nAccès aux documents partagés",
  "portal.sidebar.description":
    "\nCommandes, travaux, factures et approvisionnements limités aux membres de votre organisation.",
  "portal.nav.overview": "\nAperçu",
  "portal.nav.orders": "\nCommandes",
  "portal.nav.workOrders": "\nBons de travail",
  "portal.nav.invoices": "\nFactures",
  "portal.nav.purchaseOrders": "\nBons de commande",
  "portal.summary.eyebrow": "\nEspace de travail partenaire",
  "portal.summary.totalLabel": "total",
  "portal.summary.title": "\nInstantané commercial partagé",
  "portal.summary.description":
    "\nVisibilité actuelle des commandes, des travaux, des factures et des achats pour la portée de l'organisation authentifiée.",
  "portal.summary.actionHubTitle": "\nVoie d'action prioritaire",
  "portal.summary.actionHubDescription":
    "\nGardez le prochain mouvement de document, le flux de travail responsable et le suivi des partenaires visibles depuis la vue d'ensemble du portail.",
  "portal.summary.activityTitle": "\nActivité récente du partenaire",
  "portal.summary.activityDescription":
    "\nSuivez les dernières commandes clients, bons de travail, factures et mouvements d'approvisionnement à partir d'un seul endroit.",
  "portal.summary.activityFallback": "\nAucune activité de partenaire n'a encore été enregistrée.",
  "portal.summary.exceptionTitle": "\nMontre d'exception",
  "portal.summary.exceptionDescription":
    "\nSurveillez les éléments qui nécessitent encore un accusé de réception, une réponse ou une escalade de la part de l'équipe partenaire.",
  "portal.summary.exceptionFallbackTitle":
    "\nAucune exception active ne nécessite de suivi pour le moment.",
  "portal.summary.exceptionFallbackDescription":
    "\nContinuez à surveiller les espaces de travail des documents pour détecter les nouvelles approbations, les litiges et les blocages d'exécution.",
  "portal.summary.exceptionItem": "Document {document}: {status}",
  "portal.summary.exceptionItemDescription": "Titre {title} – {date}",
  "portal.summary.nextOrders": "\nEspace de travail des commandes ouvertes",
  "portal.summary.ordersDescription": "Afficher et gérer les commandes clients.",
  "portal.summary.workOrdersDescription":
    "Suivre l'avancement et l'exécution des ordres de travail.",
  "portal.summary.invoicesDescription": "Examiner les factures en attente et payées.",
  "portal.summary.purchaseOrdersDescription": "Gérer les bons de commande auprès des fournisseurs.",
  "portal.summary.nextWorkOrders": "\nEspace de travail des ordres de travail ouverts",
  "portal.summary.nextInvoices": "\nEspace de travail Ouvrir les factures",
  "portal.summary.nextPurchaseOrders": "\nEspace de travail Ouvrir les bons de commande",
  "portal.page.orders": "\nCommandes du portail",
  "portal.page.workOrders": "\nBons de travail du portail",
  "portal.page.invoices": "\nFactures du portail",
  "portal.page.purchaseOrders": "Bons de commande du portail",
  "portal.documentList.sectionTitle": "Documents",
  "portal.documentList.tableCaption": "Liste des documents",
  "portal.documentList.col.id": "ID",
  "portal.documentList.col.document": "Document",
  "portal.documentList.col.status": "Statut",
  "portal.documentList.col.value": "Valeur",
  "portal.documentList.col.date": "Date",
  "portal.documentList.col.amount": "Montant",
  "portal.documentList.col.actions": "Actions",
  "portal.documentList.viewAction": "Voir",
  "portal.documentList.filtersLabel": "Filtrer par statut",
  "portal.documentList.loading": "Chargement des documents…",
  "portal.documentList.empty.title": "Aucun document",
  "portal.documentList.empty.cta": "Créer un document",
  "portal.documentList.error.description": "Les documents n'ont pas pu être chargés.",
  "portal.documentList.searchPlaceholder": "Rechercher des documents…",
  "portal.documentList.searchLabel": "Rechercher des documents",
  "portal.documentList.resultCount": "{count} documents",
  "portal.documentList.paginationInfo": "Page {page} sur {totalPages} ({totalCount} au total)",
  "portal.documentDetail.loading": "Chargement du document…",
  "portal.documentDetail.overviewTitle": "Aperçu",
  "portal.documentDetail.lineItemsTitle": "Lignes",
  "portal.documentDetail.timelineTitle": "Chronologie des activités",
  "portal.documentDetail.actionsTitle": "Actions disponibles",
  "portal.documentDetail.downloadInvoice": "Télécharger la facture",
  "portal.documentDetail.contactSupport": "Contacter le support",
  "portal.documentDetail.payInvoice": "Payer la facture",
  "portal.documentDetail.empty.title": "Document introuvable",
  "portal.documentDetail.empty.description": "Le document demandé est introuvable.",
  "portal.documentDetail.empty.fields": "Aucun détail disponible.",
  "portal.documentDetail.empty.lineItems": "Aucune ligne.",
  "portal.documentDetail.empty.timeline": "Aucune activité enregistrée.",
  "portal.documentDetail.error.description": "Le document n'a pas pu être chargé.",
  "portal.documentDetail.relatedLinksTitle": "Liens connexes",
  "portal.documentDetail.delete.title": "Supprimer le document",
  "portal.documentDetail.delete.description":
    'Êtes-vous sûr de vouloir supprimer "{title}" ? Cette action est irréversible.',
  "portal.chat.contextTitle": "\nVoie de propriété du service",
  "portal.chat.contextDescription":
    "\nGardez le propriétaire actuel, les enregistrements commerciaux liés et le chemin de remontée visibles pendant que le fil de discussion partenaire est actif.",
  "portal.chat.ownerLabel": "\nPropriétaire actuel",
  "portal.chat.ownerFallback": "\nAttribuer un propriétaire partenaire",
  "portal.chat.latestFallback":
    "\nAucune mise à jour du fil de discussion n'a encore été enregistrée.",
  "portal.chat.checklistOwnerTitle": "\nCapturez le propriétaire responsable",
  "portal.chat.checklistOwnerDescription":
    "\nIndiquez à qui appartient la prochaine étape de réponse ou d'exécution avant que le fil de discussion ne change de mains.",
  "portal.chat.checklistSlaTitle": "\nDéfinir la fenêtre de réponse",
  "portal.chat.checklistSlaDescription":
    "\nConfirmez le timing dans le fil de discussion chaque fois que la livraison, la facturation ou la preuve de service est bloquée.",
  "portal.chat.checklistEscalationTitle": "\nEscalader avec les enregistrements liés",
  "portal.chat.checklistEscalationDescription":
    "\nOuvrez le document ou l'espace de travail membre associé lorsque la conversation nécessite un suivi opérationnel.",
  "portal.chat.openLinkedAction": "\nOuvrir l'enregistrement lié",
  "portal.chat.composeDescription":
    "\nUtilisez le fil de discussion des partenaires pour capturer la propriété, le délai de réponse et toute étape commerciale bloquée.",
  "portal.chat.composeHint":
    "\nGardez le prochain propriétaire et la fenêtre de réponse promise visibles dans chaque réponse.",
  "portal.chat.aiActionsDescription":
    "\nUtilisez des actions d'IA pour résumer le fil de discussion du partenaire avant de passer au suivi des commandes, des travaux ou des factures.",
  "deviceHistory.exportCsv": "\nExporter CSV",
  "customisation.chatBubbleToggle": "\nBulle de discussion IA",
  "customisation.chatBubbleDescription":
    "\nAfficher la bulle de discussion flottante de l'assistant IA",
  "apiExplorer.searchRoutes": "\nRechercher des itinéraires...",
  "apiExplorer.tryIt": "\nEssayez-le",
  "apiExplorer.response": "\nRéponse",
  "apiExplorer.errorPrefix": "\nErreur :",
  "transfer.title": "\nTransférer l'actif",
  "transfer.subtitle": "\nDéplacer cet actif vers un autre site ou une autre installation",
  "transfer.form.destination": "\nSite de destination",
  "transfer.form.destinationPlaceholder": "\nSélectionnez la destination",
  "transfer.form.reason": "\nRaison du transfert",
  "transfer.form.reasonPlaceholder": "\nEntrez le motif du transfert",
  "transfer.form.notes": "\nNotes complémentaires",
  "transfer.form.notesPlaceholder": "\nNotes facultatives sur ce transfert",
  "transfer.form.submit": "\nConfirmer le transfert",
  "transfer.form.cancel": "\nAnnuler",
  "transfer.validation.sameLocation":
    "\nLa destination ne peut pas être la même que l'emplacement actuel",
  "transfer.validation.assetNotFound": "\nActif introuvable",
  "transfer.validation.siteNotFound": "\nSite de destination introuvable",
  "transfer.validation.destinationRequired": "\nLe site de destination est requis",
  "transfer.feedback.success": "\nActif transféré avec succès",
  "transfer.feedback.error": "\nÉchec du transfert de l'actif",
  "transfer.history.title": "\nHistorique des transferts",
  "transfer.history.empty": "\nAucun historique de transfert pour cet actif",
  "transfer.history.from": "\nÀ partir de",
  "transfer.history.to": "\nÀ",
  "transfer.history.date": "\nDate",
  "transfer.history.initiatedBy": "\nInitié par",
  "transfer.history.reason": "\nRaison",
  "transfer.history.notes": "\nRemarques",
  "transfer.modal.title": "\nTransférer l'actif",
  "transfer.modal.description":
    "\nSélectionnez le site de destination pour transférer cet actif vers ",
  "transfer.modal.confirm": "\nTransfert",
  "transfer.action": "\nTransfert",
  "ucp.checkout.notFound": "La session de checkout est introuvable.",
  "ucp.order.notFound": "\nLa commande n'a pas été trouvée.",
  "ucp.checkout.error.currency":
    "\nLa devise {currency} n'est pas prise en charge pour cette sélection de catalogue.",
  "ucp.checkout.error.itemUnavailable":
    "\nUn ou plusieurs éléments de catalogue sélectionnés ne sont pas disponibles.",
  "ucp.checkout.error.empty":
    "\nAjoutez au moins un article du catalogue avant de finaliser le paiement.",
  "ucp.checkout.error.paymentHandler":
    "Sélectionnez un instrument de paiement pris en charge avant de finaliser le paiement.",
  "ucp.checkout.error.terminal": "\nCette session de paiement ne peut plus être modifiée.",
  "ucp.checkout.error.idMismatch": "\nIncohérence de l'identifiant de paiement.",
  "ucp.checkout.ai.single":
    "\n{title} : {summary} Total {total} {currency}. Vérifiez les détails de l'acheteur, puis finalisez le paiement pour créer la commande opérationnelle.",
  "ucp.checkout.ai.multi":
    "\n{count} packages opérationnels sélectionnés : {titles}. Total {total} {currency}. Confirmez l'alignement de la portée, puis finalisez le paiement pour créer la commande.",
  "ucp.checkout.completed":
    "Checkout finalise. La commande {orderNumber} est maintenant confirmee.",
  "ucp.checkout.canceled": "\nPaiement annulé.",
  "ucp.reference.service.title": "\n{merchantName} service d'achat",
  "ucp.reference.checkout.specTitle": "\nCapacité de paiement des achats",
  "ucp.reference.checkout.schemaTitle": "\nSchéma de la fonctionnalité de paiement des achats",
  "ucp.reference.order.specTitle": "\nCapacité de commande d'achat",
  "ucp.reference.order.schemaTitle": "\nSchéma de fonctionnalité de commande d'achat",
  "ucp.reference.fulfillment.specTitle": "\nCapacité de traitement des achats",
  "ucp.reference.fulfillment.schemaTitle": "\nSchéma de capacité de traitement des achats",
  "ucp.reference.buyerConsent.specTitle": "\nCapacité de consentement de l'acheteur Shopping",
  "ucp.reference.buyerConsent.schemaTitle":
    "\nSchéma de capacité de consentement de l'acheteur Shopping",
  "ucp.reference.paymentHandler.specTitle": "\nSpécification du gestionnaire de paiement marchand",
  "ucp.reference.paymentHandler.configSchemaTitle":
    "\nSchéma de configuration du gestionnaire de paiement marchand",
  "ucp.reference.paymentHandler.instrumentSchemaTitle":
    "\nSchéma de l'instrument de paiement par carte",
  "nav.chat": "\nChat",
  "nav.automations": "\nAutomatisations",
  "chat.title": "\nChat d'équipe",
  "chat.subtitle":
    "\nFils de collaboration partagés entre les opérations, le portail et les transferts d'IA",
  "chat.workspace.eyebrow": "\nOpérations collaboratives",
  "chat.workspace.internalTitle": "\nCollaboration opérationnelle",
  "chat.workspace.internalDescription":
    "\nFils de discussion internes pour les opérateurs, les analystes et les flux de travail du copilote IA.",
  "chat.workspace.portalTitle": "\nCollaboration avec les partenaires",
  "chat.workspace.portalDescription":
    "\nFils de conversation sécurisés sur le portail pour la coordination de la livraison, le contexte du document et le transfert assisté par l'IA.",
  "chat.workspace.publicTitle": "\nSéances d'assistance publique",
  "chat.workspace.publicDescription":
    "\nSessions d'admission publiques axées sur l'IA qui peuvent dégénérer en workflows de portail ou d'opérations.",
  "chat.workspace.threadListTitle": "\nSujets",
  "chat.workspace.threadListDescription":
    "\nChaque thread est conservé afin que les actions de l'IA, les transferts et le contexte de livraison restent attachés au même historique d'entité.",
  "chat.workspace.composeTitle": "\nEnvoyer la mise à jour",
  "chat.workspace.composeDescription":
    "\nLes messages sont stockés sous forme d'événements de collaboration de premier ordre afin que les actions d'automatisation, de création de rapports et d'IA puissent faire référence au même fil de discussion.",
  "chat.workspace.messageLabel": "\nMessage",
  "chat.workspace.messagePlaceholder":
    "\nRédiger une mise à jour, une demande ou une note d'escalade pour l'équipe",
  "chat.workspace.composeHint":
    "\nUtilisez la bulle d'IA partagée pour les invites guidées ; utilisez ce formulaire pour des mises à jour durables du fil de discussion.",
  "chat.workspace.sendAction": "\nEnvoyer un message",
  "chat.workspace.askAiAction": "\nDemandez à AI dans le fil",
  "chat.workspace.summarizeThreadAction": "Résumer le fil",
  "chat.workspace.automationRunAction": "\nExécution d'automatisation de file d'attente",
  "chat.workspace.reportPackBuildAction": "\nCréer un pack de rapports",
  "chat.workspace.reportPackCompareAction": "\nComparez les versions du pack",
  "chat.workspace.convertTaskAction": "\nConvertir en tâche",
  "chat.workspace.convertReportAction": "\nConvertir en rapport",
  "chat.workspace.mlAnalysisAction": "\nDemander une analyse ML",
  "chat.workspace.publicHandoffAction": "\nCréer une note de transfert",
  "chat.workspace.aiActionsTitle": "\nActions de l'assistant",
  "chat.workspace.aiActionsDescription":
    "\nConserver les réponses de l'assistant, les résumés et les actions du plan de contrôle dans le même historique de thread.",
  "chat.workspace.aiDefaultPrompt":
    "\nConsultez le fil de discussion actuel et aidez-nous à effectuer la prochaine action de l'opérateur.",
  "chat.workspace.emptyThread":
    "\nSélectionnez une conversation pour consulter son historique des messages.",
  "chat.workspace.noThreadsTitle": "\nAucun fil de collaboration n'est encore actif.",
  "chat.workspace.noThreadsDescription":
    "\nCréez ou acheminez une conversation vers cette surface avant d'utiliser l'historique du fil de discussion partagé et les actions de l'assistant.",
  "chat.workspace.composeUnavailableTitle":
    "\nSélectionnez un fil de discussion avant de publier ou d'exécuter des actions d'assistant.",
  "chat.workspace.composeUnavailableDescription":
    "\nLes messages de fil de discussion, les résumés, les exécutions d'automatisation et les notes de transfert persistent tous dans une conversation active.",
  "chat.workspace.surfaceInternal": "\nInterne",
  "chat.workspace.surfacePortal": "\nPortail",
  "chat.workspace.surfacePublic": "\nPublique",
  "chat.workspace.threadCount": "\n{count} fils",
  "chat.workspace.typeChannel": "\nCanal",
  "chat.workspace.typeDirectMessage": "\nMessage direct",
  "chat.workspace.typeEntityThread": "\nFil d'exécution d'entité",
  "chat.workspace.typePartyThread": "\nFil de discussion partenaire",
  "chat.workspace.typePublicAssistant": "\nSession assistante",
  "chat.workspace.participantsTitle": "\nParticipants",
  "chat.workspace.participantsDescription":
    "\nQui est actif dans cette conversation et peut être identifié dans de nouveaux messages.",
  "chat.workspace.noParticipants": "\nAucun participant n'est encore associé à cette conversation.",
  "chat.workspace.featuresTitle": "\nCaractéristiques du fil",
  "chat.workspace.featuresDescription":
    "\nLe type de conversation, les enregistrements liés, le volume des messages et la préparation à l'IA restent visibles à côté du fil de discussion.",
  "chat.workspace.linkedRecordsTitle": "\nEnregistrements liés",
  "chat.workspace.linkedRecordsDescription":
    "\nLes enregistrements commerciaux et opérationnels joints à cette conversation restent visibles dans le même espace de travail.",
  "chat.workspace.noLinkedRecords":
    "\nAucun enregistrement lié n'est encore joint à cette conversation.",
  "chat.workspace.tagPeopleTitle": "\nTaguez des personnes et AI",
  "chat.workspace.tagPeopleDescription":
    "\nLes participants sélectionnés sont stockés avec le message afin que les transferts et le travail de suivi conservent le même contexte.",
  "chat.workspace.tagParticipantAria": "\nIdentifiez {participant} dans ce message",
  "chat.workspace.noTagTargets":
    "\nAucune cible de balise n'est encore disponible pour cette conversation.",
  "chat.workspace.participantCount": "\n{count} participants",
  "chat.workspace.messageCount": "\n{count} messages",
  "chat.workspace.linkedRecordCount": "\n{count} enregistrements liés",
  "chat.workspace.participantMetricLabel": "\nParticipants",
  "chat.workspace.messageMetricLabel": "\nMessages",
  "chat.workspace.linkedRecordMetricLabel": "\nLié",
  "chat.workspace.slaQueueTitle": "\nFile d'attente SLA",
  "chat.workspace.slaQueueDescription":
    "\nSujets de discussion non lus ou récemment mis à jour qui nécessitent un suivi ou une décision de remontée programmée.",
  "chat.workspace.ownerQueueTitle": "\nPosture du propriétaire",
  "chat.workspace.ownerQueueDescription":
    "\nGardez l'ensemble des participants actifs et la profondeur du message visibles avant d'attribuer le prochain propriétaire.",
  "chat.workspace.triageModesTitle": "\nModes de tri",
  "chat.workspace.triageModesDescription":
    "Passez de l'examen du fil de discussion à la conversion de tâches, au reporting ou au suivi du propriétaire sans perdre le contexte de la conversation.",
  "chat.workspace.aiEnabled": "\nPrêt pour l'IA",
  "chat.workspace.aiDisabled": "\nIA désactivée",
  "chat.workspace.participantAudienceAi": "IA",
  "chat.workspace.participantAudienceOperator": "\nOpérateur",
  "chat.workspace.participantAudiencePartner": "\nPartenaire",
  "chat.workspace.participantAudiencePublic": "\nPublique",
  "chat.workspace.participantRoleOwner": "\nPropriétaire",
  "chat.workspace.participantRoleMember": "\nMembre",
  "chat.workspace.participantRoleObserver": "\nObservateur",
  "chat.workspace.participantRoleAssistant": "\nAssistant",
  "chat.workspace.viewerParticipant": "\nVous",
  "chat.validation.messageRequired": "\nLe contenu du message est obligatoire.",
  "chat.validation.conversationNotFound": "\nLa conversation n'a pas été trouvée.",
  "chat.validation.mentionNotFound":
    "\nUn ou plusieurs participants marqués n'ont pas pu être résolus.",
  "chat.assistant.action.automationRunCreated":
    "\nExécution d'automatisation en file d'attente pour {title}. Statut actuel : {status}.",
  "chat.assistant.action.reportPackBuilt":
    "\nCréation d'une nouvelle version du pack de rapports pour {title}. Identifiant de la version active : {versionId}.",
  "chat.assistant.action.publicHandoffStarted":
    "\nDémarrage du transfert public pour {title}. Fil de remontée interne : {threadId}.",
  "chat.assistant.action.publicHandoffAutomationQueued":
    "\nL'automatisation en file d'attente exécute {runId} pour acheminer l'escalade.",
  "chat.assistant.action.mlRunRequested":
    "\nL'analyse ML en file d'attente s'exécute {runId}. Statut actuel : {status}.",
  "chat.assistant.handoff.threadTitle": "\nTransfert public : {title}",
  "chat.assistant.handoff.threadDescription":
    "\nFil de transmission interne créé à partir d'une session d'assistant public.",
  "chat.assistant.handoff.seedMessage":
    "\nL'assistant public a signalé {title}. Dernier contexte : {summary}",
  "chat.assistant.handoff.runNotes":
    "\nTransfert public pour {title}. Identifiant de la conversation source : {conversationId}.",
  "chat.seed.actors.ai": "IA",
  "chat.seed.actors.operator": "\nOpérateur",
  "chat.seed.actors.partner": "\nPartenaire",
  "chat.seed.internal.operationsTitle": "\nTriage de préparation aux opérations",
  "chat.seed.internal.operationsDescription":
    "\nMises à jour de préparation interfonctionnelle reliant les actifs, les packs et les escalades.",
  "chat.seed.internal.operationsPreview":
    "\nAI a signalé deux deltas de préparation et a suggéré de rafraîchir le tableau de bord avant le briefing de 18h00.",
  "chat.seed.internal.operationsAiMessage":
    "\nJ'ai trouvé deux deltas de préparation qui affectent le pack de cartes actuel. Actualisez le pack opérationnel avant le prochain briefing.",
  "chat.seed.internal.operationsUserMessage":
    "\nFaites remonter les deltas dans le pack actif et informez le responsable du domaine si la prévision d'utilisation baisse à nouveau.",
  "chat.seed.internal.estateLead": "\nResponsable de la succession",
  "chat.seed.internal.operationsAnchorPack": "\nPack d'opérations v3",
  "chat.seed.internal.operationsAnchorEstate": "\nÉtat de préparation à la succession",
  "chat.seed.internal.reportsTitle": "\nCommentaires sur le pack de rapports",
  "chat.seed.internal.reportsDescription":
    "\nCommentaires en fil de discussion pour les rapports enregistrés, les révisions de packs et les comparaisons chronologiques.",
  "chat.seed.internal.reportsPreview":
    "\nLe Board Pack v3 est prêt à être révisé avec un contexte d'anomalie mis à jour et des notes d'exposition commerciale.",
  "chat.seed.portal.fulfilmentTitle": "\nTransfert d'exécution du partenaire",
  "chat.seed.portal.fulfilmentDescription":
    "\nFil de discussion visible sur le portail pour confirmer la portée du travail, le statut du document et les brouillons de réponse assistés par l'IA.",
  "chat.seed.portal.fulfilmentPreview":
    "\nL'opérateur AI a rédigé un résumé de transfert pour le dernier jalon de l'ordre de travail et la facture bloquée.",
  "chat.seed.portal.fulfilmentMessage":
    "Confirmez le jalon révisé du bon de travail et indiquez-nous si le blocage de la facture peut maintenant être effacé.",
  "chat.seed.portal.operatorLabel": "\nCoordonnateur des opérations",
  "chat.seed.portal.anchorLabel": "\nJalon de l'ordre de travail du partenaire",
  "chat.seed.public.assistantTitle": "\nAssistant d'admission aux appels d'offres",
  "chat.seed.public.assistantDescription":
    "\nFil de discussion public sur l'IA lié aux questions des acheteurs et au contexte de l'appel d'offres.",
  "chat.seed.public.assistantPreview":
    "\nL'Assistant a saisi les exigences de l'acheteur, clarifié le délai de livraison et préparé un chemin de remontée.",
  "chat.seed.public.assistantMessage":
    "\nJe peux recueillir vos besoins, résumer la portée et les transmettre à un opérateur lorsqu'un examen commercial est nécessaire.",
  "chat.seed.public.buyerLabel": "\nAcheteur",
  "chat.seed.public.anchorLabel": "\nAppel d'offres",
  "controlPlane.validation.definitionNotFound":
    "\nLa définition de l'automatisation est introuvable.",
  "controlPlane.validation.definitionRequired": "\nLa définition de l'automatisation est requise.",
  "controlPlane.validation.definitionTitleRequired":
    "\nLe titre de la définition d’automatisation est requis.",
  "controlPlane.validation.definitionStatusInvalid":
    "\nLa transition de statut demandée n'est pas valide.",
  "controlPlane.validation.automationActivationRequiresTrigger":
    "\nAjoutez au moins un déclencheur avant d'activer cette définition d'automatisation.",
  "controlPlane.validation.automationActivationRequiresSteps":
    "\nAjoutez au moins une étape avant d'activer cette définition d'automatisation.",
  "controlPlane.validation.automationActivationRequiresSchedule":
    "\nLes définitions d'automatisation planifiées nécessitent au moins une planification avant l'activation.",
  "controlPlane.validation.automationTriggerNameRequired":
    "\nLe nom du déclencheur d’automatisation est requis.",
  "controlPlane.validation.automationStepNameRequired":
    "\nLe nom de l’étape d’automatisation est requis.",
  "controlPlane.validation.automationScheduleRuleRequired":
    "\nUne règle de planification d'automatisation est requise.",
  "controlPlane.validation.automationScheduleTimezoneRequired":
    "\nLe fuseau horaire du calendrier d’automatisation est requis.",
  "controlPlane.validation.automationScheduleTimestampInvalid":
    "\nLes horodatages du calendrier d'automatisation doivent être des valeurs date-heure valides.",
  "controlPlane.validation.automationArtifactTitleRequired":
    "\nLe titre de l'artefact d'automatisation est requis.",
  "controlPlane.validation.automationRunNotFound":
    "\nL'exécution d'automatisation est introuvable.",
  "controlPlane.validation.automationRunTransitionInvalid":
    "\nLa transition d'exécution d'automatisation demandée n'est pas valide.",
  "controlPlane.validation.automationRunDefinitionRequired":
    "\nCette exécution d'automatisation n'est pas liée à une définition réutilisable.",
  "controlPlane.validation.automationRunRetryInvalid":
    "\nSeules les exécutions d'automatisation ayant échoué ou annulées peuvent être réessayées.",
  "controlPlane.definition.created": '\nDéfinition d\'automatisation "{title}" créée.',
  "controlPlane.definition.statusUpdated": "\nStatut mis à jour à {status}.",
  "controlPlane.validation.reportPackNotFound": "\nLe pack de rapports est introuvable.",
  "controlPlane.validation.reportPackCompareRequiresVersions":
    "\nAu moins deux versions du pack de rapports sont requises avant la comparaison.",
  "controlPlane.validation.mlExperimentNotFound": "\nL'expérience ML n'a pas été trouvée.",
  "controlPlane.validation.modelVersionNotFound": "\nLa version du modèle est introuvable.",
  "controlPlane.validation.mlRequestTargetRequired":
    "\nSélectionnez une expérience ML ou une version de modèle avant de demander une analyse.",
  "controlPlane.reportPack.compareSummary":
    "\nComparaison des dernières versions du pack de rapports pour {title}. Version plus récente : {newerVersionId}. Version précédente : {olderVersionId}.",
  "controlPlane.seed.automation.packRefreshTitle": "\nActualisation du pack stratégique",
  "controlPlane.seed.automation.packRefreshDescription":
    "Reconstruisez le pack de cartes actif, publiez les derniers deltas de chronologie et informez le fil de révision.",
  "controlPlane.seed.automation.packRefreshArtifactBoardPackTitle": "\nPack de cartes v3",
  "controlPlane.seed.automation.packRefreshArtifactInputSnapshotTitle":
    "\nAperçu des commentaires de la direction",
  "controlPlane.seed.automation.packRefreshArtifactDraftTitle": "\nBrouillon du pack de cartes",
  "controlPlane.seed.automation.portalHandoffTitle": "\nTransfert d'exécution du portail",
  "controlPlane.seed.automation.portalHandoffDescription":
    "\nCréez un résumé visible par le partenaire lorsque les étapes d'un bon de travail, d'une facture ou d'une livraison changent.",
  "controlPlane.seed.automation.portalHandoffArtifactMemoTitle": "\nMémo de transfert du portail",
  "controlPlane.seed.automation.portalHandoffArtifactNoteTitle":
    "\nNote de transfert du portail partenaire",
  "controlPlane.seed.datasets.estateTitle": "\nEnsemble de données sur l'état du domaine",
  "controlPlane.seed.datasets.estateDescription":
    "\nMesures de posture inter-espaces de travail pour la préparation, l’utilisation et le risque d’intervention.",
  "controlPlane.seed.datasets.orderTitle": "\nEnsemble de données de flux de commandes",
  "controlPlane.seed.datasets.orderDescription":
    "\nMesures de calendrier commercial couvrant les appels d'offres, les commandes clients, les bons de travail et les factures.",
  "controlPlane.seed.packs.boardTitle": "\nPack de cartes",
  "controlPlane.seed.packs.boardDescription":
    "\nPack de décisions stratégiques avec chronologie, posture et contexte de risque commercial.",
  "controlPlane.seed.packs.operationsTitle": "\nPack d'opérations",
  "controlPlane.seed.packs.operationsDescription":
    "\nPack de terrain opérationnel avec deltas d'utilisation, de préparation et d'exécution du travail.",
  "controlPlane.seed.ml.demandForecastTitle": "\nExpérience de prévision de la demande",
  "controlPlane.seed.ml.demandForecastObjective":
    "\nPrévoir la demande commerciale et les déclencheurs d’anomalies pour le prochain horizon opérationnel.",
  "controlPlane.seed.models.demandTitle": "\nModèle de prévision de la demande",
  "controlPlane.seed.models.demandDescription":
    "\nEntrée de registre pour les versions de prévision de la demande approuvées et leur posture de déploiement.",
  "insurance.seed.policy.generalLiabilityDescription":
    "\nCouverture de responsabilité générale pour les opérations du site d’entraînement Nord.",
  "insurance.seed.policy.propertyDescription":
    "\nCouverture des biens pour les bâtiments et les infrastructures du complexe ouest.",
  "insurance.seed.policy.cyberDescription":
    "\nCouverture de cyber-responsabilité pour la plate-forme et le patrimoine IoT.",
  "insurance.seed.coverage.bodilyInjury": "\nBlessure corporelle par événement",
  "insurance.seed.coverage.propertyDamage": "\nDommages matériels par événement",
  "insurance.seed.coverage.aggregate": "\nTotal général",
  "insurance.seed.claim.waterDamageDescription":
    "\nDégâts des eaux sur le toit du centre de formation suite à une tempête. Réparations temporaires terminées.",
  "insurance.seed.claim.vehicleDamageDescription":
    "\nDommages mineurs au véhicule dans l'aire de stationnement de l'enceinte. Aucune blessure.",
  "reports.expansion.title": "\nPlan de contrôle de la science des données et de l'automatisation",
  "reports.expansion.description":
    "\nLes ensembles de données, les packs de rapports, la surveillance du ML et les déclencheurs d'automatisation restent connectés à l'espace de travail de reporting au lieu d'être fragmentés en outils distincts.",
  "reports.expansion.openChat": "\nOuvrir le chat",
  "reports.expansion.datasetsTitle": "\nRegistre des ensembles de données",
  "reports.expansion.datasetsDescription":
    "\nEnsembles de données analytiques en direct et surveillés alimentant des packs, des métriques et des instantanés de modèles.",
  "reports.expansion.openDatasets": "\nSection Ouvrir les ensembles de données",
  "reports.expansion.packsTitle": "\nPacks de rapports",
  "reports.expansion.packsDescription":
    "\nPacks de cartes et d'opérations versionnés avec prise en charge durable de l'état, de la lignée et de la chronologie.",
  "reports.expansion.openPacks": "\nOuvrir la section pack actif",
  "reports.expansion.mlTitle": "Plan de contrôle ML",
  "reports.expansion.mlDescription":
    "\nExpériences, exécutions et entrées de registre exposant les prévisions et les anomalies en plus de la composition du rapport.",
  "reports.expansion.openModels": "\nGouvernance ouverte de l'IA",
  "reports.expansion.automationsTitle": "\nRegistre d'automatisation",
  "reports.expansion.automationsDescription":
    "\nDéfinitions d'automatisation natives Bun coordonnant l'actualisation des rapports, les notifications et les flux de travail liés au chat.",
  "reports.expansion.openAutomations": "\nEspace de travail d'automatisation ouvert",
  "automations.title": "\nAutomatisations",
  "automations.subtitle":
    "\nDéfinitions, exécutions et posture d'exécution à partir d'une surface de contrôle SSR",
  "automations.workspace.eyebrow": "\nEspace de travail d'automatisation",
  "automations.workspace.title": "\nPlan de contrôle d'automatisation dédié",
  "automations.workspace.description":
    "\nPassez en revue les définitions d'automatisation, les exécutions récentes, les types de déclencheurs et la posture d'exécution sans quitter le shell des opérations.",
  "automations.workspace.definitionTitle": "\nDéfinitions d'automatisation",
  "automations.workspace.definitionDescription":
    "\nEnregistrements de définition, modes de déclenchement et calendrier de prochaine exécution pour le catalogue d'automatisation actuel.",
  "automations.workspace.runTitle": "\nExécutions d'automatisation récentes",
  "automations.workspace.runDescription":
    "\nLes dernières exécutions en file d'attente, en cours d'exécution et terminées sont apparues à partir du plan de contrôle.",
  "automations.workspace.definitionCount": "\n{count} définitions",
  "automations.workspace.runCount": "\n{count} exécute",
  "automations.workspace.activeDefinitionCount": "\n{count} définitions actives",
  "automations.workspace.runningRunCount": "\n{count} exécutions en cours",
  "automations.workspace.definitionTrigger": "\nDéclencheur",
  "automations.workspace.definitionSteps": "\n{count} étapes",
  "automations.workspace.definitionNextRun": "\nExécution suivante",
  "automations.workspace.definitionSurface": "\nSurface",
  "automations.workspace.definitionState": "\nÉtat",
  "automations.workspace.runsEmpty": "\nAucune exécution d'automatisation n'est encore disponible.",
  "automations.workspace.definitionsEmpty":
    "\nAucune définition d'automatisation n'est encore disponible.",
  "automations.workspace.runCreatedAt": "\nCréé",
  "automations.workspace.runCompletedAt": "\nTerminé",
  "automations.workspace.runDefinition": "\nDéfinition",
  "automations.workspace.runKind": "\nGenre",
  "automations.workspace.runStatus": "\nStatut",
  "automations.workspace.openReports": "\nOuvrir des rapports",
  "automations.workspace.openAdmin": "\nGouvernance d'administration ouverte",
  "automations.workspace.posture.title": "Execution posture",
  "automations.workspace.posture.description":
    "Keep approvals, live runs, and execution pressure visible while you work definitions or review recent activity.",
  "automations.workspace.posture.approvals":
    "{count} definition(s) still require approval coverage before all runs can start cleanly.",
  "automations.workspace.posture.pending":
    "{count} run(s) are waiting for an approval decision before leaving the queue.",
  "automations.workspace.posture.running":
    "{count} run(s) are currently executing across the active automation surface.",
  "automations.workspace.stats.definitions": "\nDéfinitions",
  "automations.workspace.stats.running": "\nEn cours d'exécution",
  "automations.workspace.stats.successRate": "\nTaux de réussite",
  "automations.workspace.runDetail.status": "\nStatut",
  "automations.workspace.runDetail.created": "\nCréé",
  "automations.workspace.runDetail.completed": "\nTerminé",
  "automations.workspace.runDetail.definition": "\nDéfinition",
  "automations.workspace.runDetail.steps": "\nÉtapes d'exécution",
  "automations.workspace.runDetail.artifacts": "\nArtefacts",
  "automations.workspace.runDetail.artifactsEmpty": "\nAucun artefact généré",
  "automations.workspace.definitionPreview.title": "\nAperçu du flux de travail",
  "automations.workspace.definitionPreview.steps": "\nÉtapes",
  "automations.workspace.definitionPreview.description":
    "\nInspectez la séquence de flux de travail sélectionnée, la posture de planification et les derniers artefacts.",
  "automations.workspace.definitionPreview.empty":
    "\nChoisissez une définition pour inspecter son flux de travail et les derniers artefacts d'automatisation.",
  "automations.workspace.definitionPreview.guideFlow":
    "Inspect the current workflow sequence before moving the automation into downstream review or incident response.",
  "automations.workspace.definitionPreview.guideSchedule":
    "Keep the next run window and timezone visible while reviewing trigger cadence and operating coverage.",
  "automations.workspace.definitionPreview.guideArtifacts":
    "Use the latest artifacts to confirm the workflow is still producing the expected operational output.",
  "automations.workspace.definitionPreview.timezone": "\nFuseau horaire",
  "automations.workspace.filters.definitionStatus":
    "\nFiltrer les définitions d'automatisation par statut",
  "automations.workspace.filters.runStatus": "\nL'automatisation du filtre s'exécute par statut",
  "automations.workspace.filters.definitionScope":
    "\nL'automatisation du filtre s'exécute par définition",
  "automations.workspace.filters.allStatuses": "\nTous les statuts",
  "automations.workspace.filters.allDefinitions": "\nToutes les définitions",
  "automations.workspace.actions.preview": "\nAperçu du flux de travail",
  "automations.workspace.actions.showRuns": "\nAfficher les séquences",
  "automations.workspace.runDetail.notFound":
    "\nL'exécution d'automatisation demandée est introuvable.",
  "automations.workspace.runDetail.started": "\nCommencé",
  "automations.workspace.runDetail.claimed": "\nRéclamé",
  "automations.workspace.runDetail.heartbeat": "\nBattement de coeur",
  "automations.workspace.runDetail.surface": "\nSurface",
  "automations.workspace.runDetail.trigger": "\nDéclencheur",
  "automations.workspace.runDetail.notes": "\nRemarques",
  "automations.workspace.manualRun.title": "\nLancement manuel",
  "automations.workspace.manualRun.description":
    "\nMettez en file d'attente une exécution de flux de travail en direct sans quitter l'espace de travail d'automatisation.",
  "automations.workspace.manualRun.databaseRequired":
    "\nLes lancements manuels ne sont disponibles que lorsque le plan de contrôle basé sur la base de données est configuré.",
  "automations.workspace.manualRun.noActiveDefinitions":
    "\nAucune définition d'automatisation active n'est actuellement disponible pour un lancement manuel.",
  "automations.workspace.manualRun.definitionLabel": "\nDéfinition de la file d'attente",
  "automations.workspace.manualRun.definitionHint":
    "Seules les définitions d'automatisation actives peuvent être mises en file d'attente à partir de cet espace de travail.",
  "automations.workspace.manualRun.notesLabel": "\nExécuter des notes",
  "automations.workspace.manualRun.notesHint":
    "\nContexte d'opérateur facultatif à attacher à l'exécution d'automatisation en file d'attente.",
  "automations.workspace.manualRun.submit": "\nLancer l'exécution",
  "automations.workspace.manualRun.created": "\n{title} a été mis en file d'attente avec succès.",
  "automations.workspace.definitionStatus.DRAFT": "\nBrouillon",
  "automations.workspace.definitionStatus.ACTIVE": "\nActif",
  "automations.workspace.definitionStatus.PAUSED": "\nEn pause",
  "automations.workspace.definitionStatus.ARCHIVED": "\nArchivé",
  "automations.workspace.runStatus.QUEUED": "\nEn file d'attente",
  "automations.workspace.runStatus.RUNNING": "\nEn cours d'exécution",
  "automations.workspace.runStatus.SUCCEEDED": "\nRéussi",
  "automations.workspace.runStatus.FAILED": "\nÉchec",
  "automations.workspace.runStatus.CANCELED": "\nAnnulé",
  "automations.workspace.runKind.REPORT_PACK": "\nPack de rapports",
  "automations.workspace.runKind.WORKFLOW": "\nFlux de travail",
  "automations.workspace.runKind.EDGE_RUNBOOK": "\nRunbook Edge",
  "automations.workspace.runKind.DEVICE_COMMAND": "\nCommande de l'appareil",
  "automations.workspace.runKind.ML_PIPELINE": "\nPipeline ML",
  "automations.workspace.runStatus.AWAITING_APPROVAL": "\nEn attente d'approbation",
  "automations.workspace.triggerKind.COMPLETION_OF": "\nAchèvement de ",
  "automations.workspace.approvalGate.title": "\nPorte d'approbation",
  "automations.workspace.approvalGate.description":
    "\nCette automatisation nécessite une approbation manuelle avant le début de l'exécution.",
  "automations.workspace.approvalGate.approve": "\nApprouver l'exécution",
  "automations.workspace.approvalGate.reject": "\nRejeter l'exécution",
  "automations.workspace.approvalGate.pending": "\nEn attente d'approbation",
  "automations.workspace.approvalGate.approvedBy": "\nApprouvé par {name}",
  "automations.workspace.approvalGate.approvedAt": "\nApprouvé à ",
  "automations.workspace.approvalGate.confirmTitle": "\nConfirmer l'approbation",
  "automations.workspace.approvalGate.confirmDescription":
    "\nL’approbation de cette exécution la fera passer à l’état RUNNING. Cette action ne peut pas être annulée.",
  "automations.workspace.approvalGate.rejectTitle": "\nConfirmer le rejet",
  "automations.workspace.approvalGate.rejectDescription":
    "\nLe rejet de cette exécution l'annulera. Cette action ne peut pas être annulée.",
  "automations.workspace.approvalGate.requiresApproval": "\nNécessite une approbation",
  "automations.workspace.approvalGate.noApprovalRequired": "\nAucune approbation requise",
  "automations.workspace.scheduleEditor.title": "\nÉditeur de planning",
  "automations.workspace.scheduleEditor.description":
    "\nConfigurez le moment où cette automatisation s'exécute à l'aide des sélecteurs de jour de la semaine, d'heure et de fuseau horaire.",
  "automations.workspace.scheduleEditor.cronLabel": "\nRègle de récurrence",
  "automations.workspace.scheduleEditor.timezoneLabel": "\nFuseau horaire",
  "automations.workspace.scheduleEditor.previewLabel": "\nAperçu de la prochaine exécution",
  "automations.workspace.scheduleEditor.save": "\nEnregistrer le planning",
  "automations.workspace.scheduleEditor.daysOfWeek": "\nJours de la semaine",
  "automations.workspace.scheduleEditor.hourLabel": "\nHeure (24h)",
  "automations.workspace.scheduleEditor.minuteLabel": "\nMinute",
  "automations.workspace.scheduleEditor.monday": "\nLun",
  "automations.workspace.scheduleEditor.tuesday": "\nmar",
  "automations.workspace.scheduleEditor.wednesday": "\nMer",
  "automations.workspace.scheduleEditor.thursday": "\njeu",
  "automations.workspace.scheduleEditor.friday": "\nVen",
  "automations.workspace.scheduleEditor.saturday": "\nSamedi",
  "automations.workspace.scheduleEditor.sunday": "\nSoleil",
  "automations.workspace.retryPolicy.title": "\nPolitique de nouvelle tentative",
  "automations.workspace.retryPolicy.description":
    "\nConfigurez le comportement des nouvelles tentatives automatiques pour les exécutions d'automatisation ayant échoué.",
  "automations.workspace.retryPolicy.maxAttempts": "\nNombre maximal de nouvelles tentatives",
  "automations.workspace.retryPolicy.backoffMs": "\nIntervalle d'attente (ms)",
  "automations.workspace.retryPolicy.retryOnLabel": "\nRéessayez avec le statut",
  "automations.workspace.retryPolicy.save": "\nEnregistrer la politique de nouvelle tentative",
  "automations.workspace.retryPolicy.noPolicy":
    "\nAucune stratégie de nouvelle tentative configurée.",
  "automations.workspace.retryPolicy.attempt": "\nRéessayez {attempt}",
  "automations.workspace.retryPolicy.parentRun": "\nExécution parentale",
  "automations.workspace.auditTrail.title": "\nPiste d'audit",
  "automations.workspace.auditTrail.description":
    "\nVisualisez qui a lancé les exécutions d'automatisation, quand elles ont été déclenchées et leurs résultats.",
  "automations.workspace.auditTrail.whoRan": "\nDemandé par",
  "automations.workspace.auditTrail.triggeredBy": "\nDéclencheur",
  "automations.workspace.auditTrail.definition": "\nDéfinition",
  "automations.workspace.auditTrail.outcome": "\nRésultat",
  "automations.workspace.auditTrail.timestamp": "\nHorodatage",
  "automations.workspace.auditTrail.empty": "\nAucune entrée de piste d'audit trouvée.",
  "automations.workspace.auditTrail.filterByUser": "\nFiltrer par utilisateur",
  "automations.workspace.auditTrail.filterByDefinition": "\nFiltrer par définition",
  "automations.workspace.auditTrail.filterByDateRange": "\nFiltrer par plage de dates",
  "automations.workspace.auditTrail.searchPlaceholder": "\nRechercher une piste d'audit...",
  "automations.workspace.auditTrail.searchAria": "\nRechercher des entrées de piste d'audit",
  "automations.workspace.chainedSequence.title": "\nSéquence chaînée",
  "automations.workspace.chainedSequence.description":
    "\nChaînez cette automatisation pour qu'elle se déclenche à la fin d'une autre définition.",
  "automations.workspace.chainedSequence.upstream": "\nDéfinition en amont",
  "automations.workspace.chainedSequence.downstream": "\nDéfinitions en aval",
  "automations.workspace.chainedSequence.selectUpstream": "\nSélectionnez la définition en amont",
  "automations.workspace.chainedSequence.save": "\nEnregistrer la chaîne",
  "automations.workspace.chainedSequence.noChain": "\nAucune chaîne configurée.",
  "automations.workspace.chainedSequence.chainVisualization": "\nVisualisation de la chaîne",
  "admin.aiSettings.provider.RAMALAMA": "\nRamaLama",
  "admin.aiSettings.provider.OLLAMA": "\nOllama",
  "admin.aiSettings.provider.OPENAI": "\nOuvrirAI",
  "admin.aiSettings.provider.CLAUDE": "\nClaude",
  "admin.aiSettings.provider.HUGGINGFACE": "\nVisage câlin",
  "admin.aiSettings.provider.GEMINI": "\nGémeaux",
  "documentWorkflow.bar.label": "\nFlux de travail documentaire",
  "documentWorkflow.action.submit": "\nSoumettre",
  "documentWorkflow.action.approve": "\nApprouver",
  "documentWorkflow.action.reject": "\nRejeter",
  "documentWorkflow.action.qualify": "\nQualifier",
  "documentWorkflow.action.quote": "\nCitation",
  "documentWorkflow.action.accept": "\nAccepter",
  "documentWorkflow.action.decline": "\nRefuser",
  "documentWorkflow.action.confirm": "\nConfirm",
  "documentWorkflow.action.startFulfilment": "\nCommencer l'exécution",
  "documentWorkflow.action.complete": "\nTerminé",
  "documentWorkflow.action.schedule": "\nCalendrier",
  "documentWorkflow.action.startWork": "\nCommencer le travail",
  "documentWorkflow.action.submitReview": "\nSoumettre pour examen",
  "documentWorkflow.action.send": "\nEnvoyer",
  "documentWorkflow.action.close": "\nFermer",
  "documentWorkflow.action.receiveItems": "\nRecevoir des articles",
  "documentWorkflow.action.recordPayment": "\nEnregistrer le paiement",
  "documentWorkflow.action.issue": "\nNuméro",
  "documentWorkflow.action.void": "\nAnnuler",
  "documentWorkflow.status.draft": "\nBrouillon",
  "documentWorkflow.status.submitted": "\nSoumis",
  "documentWorkflow.status.qualified": "\nQualifié",
  "documentWorkflow.status.quoted": "\nCité",
  "documentWorkflow.status.accepted": "\nAccepté",
  "documentWorkflow.status.declined": "\nRefusé",
  "documentWorkflow.status.pendingApproval": "\nEn attente d'approbation",
  "documentWorkflow.status.approved": "Approuvé",
  "documentWorkflow.status.confirmed": "\nConfirmé",
  "documentWorkflow.status.inFulfilment": "\nEn réalisation",
  "documentWorkflow.status.completed": "\nTerminé",
  "documentWorkflow.status.triage": "\nTriage",
  "documentWorkflow.status.scheduled": "\nProgrammé",
  "documentWorkflow.status.inProgress": "\nEn cours",
  "documentWorkflow.status.readyForReview": "\nPrêt pour l'examen",
  "documentWorkflow.status.requested": "\nDemandé",
  "documentWorkflow.status.sent": "\nEnvoyé",
  "documentWorkflow.status.partiallyReceived": "\nPartiellement reçu",
  "documentWorkflow.status.received": "\nReçu",
  "documentWorkflow.status.billed": "\nFacturé",
  "documentWorkflow.status.closed": "\nFermé",
  "documentWorkflow.status.issued": "\nPublié",
  "documentWorkflow.status.partiallyPaid": "\nPartiellement payé",
  "documentWorkflow.status.paid": "\nPayé",
  "documentWorkflow.status.cancelled": "\nAnnulé",
  "documentWorkflow.status.void": "\nAnnuler",
  "documentWorkflow.status.writtenOff": "\nRadié",
  "documentWorkflow.status.expired": "\nExpiré",
  "nav.mlops": "\nMLOps",
  "mlops.title": "\nMLOps",
  "mlops.subtitle":
    "\nExpériences en direct, versions de modèles, déploiements et état des données en amont",
  "mlops.heroEyebrow": "Plan de contrôle ML",
  "mlops.coverage":
    "Suivez la situation des expériences, les exécutions en file d'attente, les modèles déployés et les dépendances de données en amont à partir d'un espace de travail rendu en direct par le serveur.",
  "mlops.chatContext":
    "\nEspace de travail MLOps. {experiments} expériences, {runs} exécutions actives, {models} entrées de registre et {deployments} déploiements par étapes ou actifs.",
  "mlops.stats.experiments": "\nExpériences",
  "mlops.stats.experimentsDescription":
    "\nDéfinitions d'expériences actuellement suivies dans le graphique du plan de contrôle en direct.",
  "mlops.stats.activeRuns": "\nCourses actives",
  "mlops.stats.activeRunsDescription":
    "\nLes exécutions de ML et d'automatisation sont actuellement en file d'attente ou en cours d'exécution dans le pipeline.",
  "mlops.stats.failedRuns": "\nÉchec des exécutions",
  "mlops.stats.failedRunsDescription":
    "\nExécutions qui nécessitent actuellement une enquête avant que la promotion du modèle ne se poursuive.",
  "mlops.stats.models": "\nEntrées de registre",
  "mlops.stats.modelsDescription":
    "\nModèle d'enregistrements disponibles pour évaluation, préparation ou publication.",
  "mlops.stats.deployments": "\nDéploiements en direct",
  "mlops.stats.deploymentsDescription":
    "\nDéploiements actuellement en cours ou actifs tout au long du parcours de livraison du modèle.",
  "mlops.stats.dataSources": "\nSources en amont",
  "mlops.stats.dataSourcesDescription":
    "\nEnsembles de données et packs de rapports alimentant la surface d'examen MLOps actuelle.",
  "mlops.actions.eyebrow": "\nFlux de travail connectés",
  "mlops.actions.title": "\nPasser de la posture de modèle à l'action",
  "mlops.actions.description":
    "\nOuvrez les espaces de travail connectés qui possèdent déjà des rapports, des automatisations et des investigations assistées par l'IA pour ce plan de contrôle.",
  "mlops.action.reports":
    "\nInspectez les ensembles de données, les packs de rapports et les analyses en aval liées au cycle de vie actuel du modèle.",
  "mlops.action.automations":
    "\nExaminez les exécutions d'automatisation en file d'attente et les définitions de flux de travail qui prennent en charge la promotion du déploiement.",
  "mlops.action.chat":
    "\nOuvrez l'espace de travail partagé de l'IA pour enquêter sur les anomalies, résumer la posture et planifier la prochaine action.",
  "mlops.manualRun.title": "\nLancer l'exécution manuelle",
  "mlops.manualRun.description":
    "\nMettez en file d'attente une exécution manuelle de ML sur une expérience, une version de modèle déployée ou les deux sans quitter l'espace de travail.",
  "mlops.manualRun.databaseRequired":
    "\nConfigurez la base de données avant de lancer des exécutions de ML manuelles à partir de cet espace de travail.",
  "mlops.manualRun.noTargets":
    "\nAucune expérience ni version de modèle déployée n'est encore disponible pour les exécutions manuelles de ML.",
  "mlops.manualRun.experimentLabel": "\nExpérience",
  "mlops.manualRun.experimentHint":
    "\nFacultatif. Choisissez une expérience lorsque l'exécution doit être associée à une piste d'évaluation active.",
  "mlops.manualRun.experimentOptional": "\nAucune cible de test",
  "mlops.manualRun.modelVersionLabel": "\nVersion du modèle déployé",
  "mlops.manualRun.modelVersionHint":
    "Facultatif. Choisissez une version de modèle déployée lorsque l'exécution doit évaluer une cible de version promue.",
  "mlops.manualRun.modelVersionOptional": "\nAucune version cible du modèle déployé",
  "mlops.manualRun.submit": "\nExécution manuelle de la file d'attente",
  "mlops.manualRun.created":
    "\nL'exécution manuelle du ML a été mise en file d'attente avec succès.",
  "mlops.summary.eyebrow": "\nBrief opérationnel",
  "mlops.summary.title": "\nPosture MLOps actuelle",
  "mlops.summary.description":
    "\nCet espace de travail consolide l'exécution des expériences, la préparation au déploiement, la fraîcheur des données en amont et la pression d'automatisation du graphique en direct.",
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
    "\n{live} en direct, {monitor} sous surveillance, {offline} ensembles de données hors ligne.",
  "mlops.summary.reportPacks":
    "\n{ready} prêt, {building} bâtiment, {failed} échec des packs de rapports.",
  "mlops.summary.automationRuns":
    "\n{count} exécutions d'automatisation sont actuellement en file d'attente ou en cours d'exécution.",
  "mlops.summary.deployments":
    "\nLes déploiements {count} sont actuellement en préparation ou actifs.",
  "mlops.runQueue.title": "\nExécuter la file d'attente",
  "mlops.runQueue.description":
    "\nDonnez la priorité aux exécutions de modèles et d'automatisation actuellement en file d'attente, en cours d'exécution ou bloquées par un échec.",
  "mlops.runQueue.empty":
    "\nAucune exécution active ou échouée ne nécessite une attention particulière pour le moment.",
  "mlops.runQueue.table.item": "\nArticle",
  "mlops.runQueue.table.type": "\nTapez",
  "mlops.runQueue.table.status": "\nStatut",
  "mlops.runQueue.table.updated": "\nMise à jour",
  "mlops.runQueue.kind.ml": "\nExécution ML",
  "mlops.runQueue.kind.automation": "\nAutomatisation / {kind}",
  "mlops.runQueue.mlFallbackTitle": "\nExécution ML non attribuée",
  "mlops.experiments.title": "\nExpériences",
  "mlops.experiments.description":
    "\nExaminez les objectifs du test, l'état actuel et la couverture d'exécution avant de promouvoir de nouvelles versions du modèle.",
  "mlops.experiments.name": "\nNom",
  "mlops.experiments.objective": "\nObjectif",
  "mlops.experiments.status": "\nStatut",
  "mlops.experiments.runCount": "\nExécute",
  "mlops.experiments.lastUpdated": "\nDernière mise à jour",
  "mlops.experiments.empty": "\nAucune expérience ML n'est encore connectée.",
  "mlops.registry.title": "\nRegistre des modèles",
  "mlops.registry.description":
    "\nExaminez les entrées de registre et la dernière étape de déploiement avant de déplacer les versions en production.",
  "mlops.registry.name": "\nModèle",
  "mlops.registry.stage": "\nÉtape",
  "mlops.registry.versions": "\nVersions",
  "mlops.registry.empty": "\nAucune entrée de registre de modèle n'est encore disponible.",
  "mlops.deployments.title": "\nDéploiements",
  "mlops.deployments.description":
    "\nInspectez l'empreinte du déploiement, l'état de la promotion et les horodatages des dernières versions à partir du graphique du modèle en direct.",
  "mlops.deployments.model": "\nModèle",
  "mlops.deployments.version": "\nVersion",
  "mlops.deployments.environment": "\nEnvironnement",
  "mlops.deployments.status": "\nStatut",
  "mlops.deployments.deployedAt": "\nDéployé",
  "mlops.deployments.empty": "\nAucun déploiement de modèle n'est encore actif.",
  "mlops.upstream.title": "\nDépendances en amont",
  "mlops.upstream.description":
    "\nSuivez la fraîcheur des ensembles de données et l'état de création des packs de rapports qui peuvent bloquer la livraison du modèle et l'analyse en aval.",
  "mlops.upstream.empty":
    "\nAucun ensemble de données ou pack de rapports en amont n'est encore connecté.",
  "mlops.upstream.table.item": "\nArticle",
  "mlops.upstream.table.kind": "\nGenre",
  "mlops.upstream.table.status": "\nStatut",
  "mlops.upstream.table.updated": "\nMise à jour",
  "mlops.upstream.kind.dataset": "\nEnsemble de données",
  "mlops.upstream.kind.pack": "\nPack de rapports",
  "mlops.runStatus.QUEUED": "\nEn file d'attente",
  "mlops.runStatus.RUNNING": "\nEn cours d'exécution",
  "mlops.runStatus.SUCCEEDED": "\nRéussi",
  "mlops.runStatus.FAILED": "\nÉchec",
  "mlops.runStatus.CANCELED": "\nAnnulé",
  "mlops.deploymentStatus.DRAFT": "\nBrouillon",
  "mlops.deploymentStatus.STAGED": "\nMise en scène",
  "mlops.deploymentStatus.ACTIVE": "\nActif",
  "mlops.deploymentStatus.ROLLED_BACK": "\nAnnulé",
  "mlops.deploymentStatus.RETIRED": "\nRetraité",
  "mlops.datasetFreshness.LIVE": "\nEn direct",
  "mlops.datasetFreshness.MONITOR": "\nMoniteur",
  "mlops.datasetFreshness.OFFLINE": "\nHors ligne",
  "mlops.reportPackState.DRAFT": "\nBrouillon",
  "mlops.reportPackState.BUILDING": "\nBâtiment",
  "mlops.reportPackState.READY": "\nPrêt",
  "mlops.reportPackState.FAILED": "\nÉchec",
  "mlops.reportPackState.ARCHIVED": "\nArchivé",
  "mlops.automationKind.DEVICE_COMMAND": "\nCommande de l'appareil",
  "mlops.automationKind.EDGE_RUNBOOK": "\nRunbook Edge",
  "mlops.automationKind.WORKFLOW": "\nFlux de travail",
  "mlops.automationKind.REPORT_PACK": "\nPack de rapports",
  "mlops.automationKind.ML_PIPELINE": "\nPipeline ML",
  "nav.training": "\nFormation",
  "training.title": "\nPréparation à la formation",
  "training.subtitle":
    "\nChamps de tir, systèmes de sécurité, posture de tir et actions opérationnelles",
  "training.heroEyebrow": "\nOpérations de formation",
  "training.coverage":
    "Utilisez les ressources du champ d'entraînement en direct, les enregistrements de contrôle du champ de tir, la pression du retard et les problèmes de site pour piloter la préparation à partir d'un seul espace de travail SSR.",
  "training.view.readiness": "\nÉtat de préparation",
  "training.view.controls": "\nContrôles",
  "training.view.incidents": "\nIncidents",
  "training.view.history": "\nHistoire",
  "training.chatContext":
    "\nEspace de travail de préparation à la formation. Actifs {assets} sur {sites} sites. {actions} actions ouvertes. {controls} enregistrements de contrôle de portée en direct.",
  "training.stats.assets": "\nActifs suivis",
  "training.stats.assetsDescription":
    "\nChamps d'entraînement, systèmes de sécurité et ressources de tir couvertes.",
  "training.stats.readyAssets": "\nPrêt maintenant",
  "training.stats.readyAssetsDescription":
    "\nActifs actuellement opérationnels ou dégradés plutôt que contraints.",
  "training.stats.sites": "\nEmplacements couverts",
  "training.stats.sitesDescription":
    "\nSites avec des actifs de domaine de formation dans le graphique en direct.",
  "training.stats.actions": "\nActions ouvertes",
  "training.stats.actionsDescription":
    "\nTâches, prédictions critiques et tickets d'assistance actifs nécessitant un suivi.",
  "training.stats.controls": "\nContrôles en direct",
  "training.stats.controlsDescription":
    "\nDossiers de contrôle de portée disponibles pour le domaine d'entraînement.",
  "training.actions.eyebrow": "\nFlux de travail connectés",
  "training.actions.title": "\nPasser de la préparation à l'exécution",
  "training.actions.description":
    "\nOuvrez les espaces de travail connectés qui possèdent déjà la correction, le support et la création de rapports pour le domaine de formation.",
  "training.action.assets":
    "\nInspectez le registre des actifs de la plage en direct et la hiérarchie du système de support.",
  "training.action.tasks":
    "\nRépartir les inspections, les réparations et les travaux de remplacement des systèmes de formation.",
  "training.action.support":
    "\nExaminez les escalades de sites en direct et les files d'attente d'assistance liées aux sites de formation.",
  "training.action.reports": "\nOuvrez le pack de préparation à la carte sans quitter le shell.",
  "training.action.estate":
    "\nOuvrez le plan de contrôle de la succession pour la gouvernance et les contrôles liés.",
  "training.workspace.brief.title": "Operational handoff",
  "training.workspace.brief.description":
    "Judge readiness coverage, pending controls, and support pressure before moving through controls, incidents, or history.",
  "training.summary.eyebrow": "\nNote de préparation",
  "training.summary.title": "\nÉtat de préparation actuel",
  "training.summary.description":
    "\nCet espace de travail consolide la disponibilité de la formation, l'activité de contrôle et la pression de suivi à partir du graphique opérationnel en direct.",
  "training.summary.capabilities":
    "\n{ready} des {total} capacités de formation suivies sont actuellement prêtes.",
  "training.summary.inspections":
    "\n{count} les tâches d'inspection en retard affectent actuellement l'état de préparation.",
  "training.summary.controls":
    "\n{count} les enregistrements de contrôle de portée sont signalés pour une action requise.",
  "training.summary.replacementQueue":
    "\n{count} éléments de remplacement restent en file d'attente.",
  "training.readiness.title": "\nTableau de préparation à la formation",
  "training.readiness.description":
    "\nExaminez la couverture des capacités, la pression d’inspection et la posture de contrôle avant de répartir le travail opérationnel.",
  "training.readiness.empty": "\nAucune ressource de formation en direct n'est encore connectée.",
  "training.readiness.capabilities": "\nCapacités suivies",
  "training.readiness.capabilitiesDescription":
    "Les étiquettes de capacité sont actuellement mappées aux ressources et aux plages de formation.",
  "training.readiness.readyCapabilities": "\nCapacités prêtes",
  "training.readiness.readyCapabilitiesDescription":
    "\nCapacités sans bloqueur de site ou de condition pour le moment.",
  "training.readiness.watchCapabilities": "\nCapacités de surveillance",
  "training.readiness.watchCapabilitiesDescription":
    "\nCapacités actuellement sous surveillance en raison de dégradations ou de pression sur le site.",
  "training.readiness.overdueInspections": "\nInspections en retard",
  "training.readiness.overdueInspectionsDescription":
    "\nTravaux d'inspection pouvant réduire directement la disponibilité de la formation.",
  "training.readiness.alertTitle": "\nPosture de contrôle opérationnel",
  "training.readiness.alertDescription":
    "\n{actionRequired} enregistrements de contrôle nécessitent une action, {replacementQueue} articles de remplacement restent en file d'attente et {labourHours} de main d'œuvre a été enregistrée lors du travail de préparation.",
  "training.siteFocus.title": "\nObjectif du site",
  "training.siteFocus.subtitle":
    "\nDonnez la priorité aux sites sur lesquels des ressources limitées, un retard ou des tickets en direct peuvent interrompre la prestation de la formation.",
  "training.siteFocus.empty": "\nAucun site de formation n'est encore disponible.",
  "training.siteFocus.itemDescription":
    "\n{assets} actifs, {constrained} contraints, {tasks} tâches ouvertes, {predictions} prédictions critiques, {tickets} tickets en direct.",
  "training.attentionAssets.title": "\nAtouts de l'attention",
  "training.attentionAssets.subtitle":
    "\nExaminez les actifs qui subissent le plus de pression en matière de préparation avant que les problèmes ne se répercutent sur la livraison.",
  "training.attentionAssets.empty":
    "\nAucun actif de formation ne nécessite actuellement une escalade.",
  "training.attentionAssets.itemDescription":
    "\n{site} / {type} / {condition} / Dernière inspection : {lastInspection} / {signals} signaux en direct.",
  "training.attentionAssets.lastInspectionNone": "\nNon enregistré",
  "training.actionQueue.title": "\nFile d'attente d'actions",
  "training.actionQueue.description":
    "\nCette file d'attente fait apparaître les travaux en retard, les prédictions critiques et les problèmes d'assistance en direct liés aux sites de formation.",
  "training.actionQueue.empty":
    "\nAucune action de formation ne nécessite une escalade pour le moment.",
  "training.actionQueue.kind.task": "\nTâche",
  "training.actionQueue.kind.prediction": "\nPrédiction",
  "training.actionQueue.kind.support": "\nAssistance",
  "training.actionQueue.taskDescription": "\n{status} / {site} / Due {deadline}.",
  "training.actionQueue.predictionDescription":
    "\n{severity} / {site} / {remainingLife} jours de vie restante.",
  "training.actionQueue.supportDescription": "\n{status} / {site} / {priority} priorité.",
  "training.rangeControls.title": "\nContrôles de portée récents",
  "training.rangeControls.description":
    "\nUtilisez les derniers enregistrements de contrôle de portée pour confirmer la posture opérationnelle et de conformité.",
  "training.rangeControls.empty":
    "\nAucun enregistrement de contrôle de portée n'est encore disponible.",
  "training.rangeControls.table.record": "\nEnregistrer",
  "training.rangeControls.table.location": "\nEmplacement",
  "training.rangeControls.table.signal": "\nSignal",
  "training.rangeControls.table.updated": "\nMise à jour",
  "training.rangeControls.signalSummary":
    "Statut {status} / Opérationnel {operational} / Conformité {compliance}",
  "training.quickLog.title": "\nContrôle de la plage de journalisation",
  "training.quickLog.description":
    "\nCapturez les derniers contrôles opérationnels ou de conformité sans quitter l'espace de travail de préparation.",
  "training.quickLog.databaseRequired":
    "\nUne base de données configurée est requise avant que les mises à jour du contrôle de formation puissent être enregistrées.",
  "training.quickLog.empty":
    "\nAucun site de formation n'est encore disponible pour la journalisation de contrôle.",
  "training.quickLog.emptyDescription":
    "Intégrez d'abord les actifs de formation dans la portée afin que les mises à jour de contrôle puissent être associées au site ou à l'actif de champ de tir correct.",
  "training.quickLog.assetOptional": "\nContrôle au niveau du site uniquement",
  "training.quickLog.helper":
    "\nEnregistrez la posture de contrôle actuelle ici, puis laissez l'espace de travail en direct actualiser l'image de préparation qui l'entoure.",
  "training.quickLog.submit": "\nMise à jour du contrôle des journaux",
  "training.quickLog.submitAria": "\nMise à jour du contrôle du champ d'entraînement du journal",
  "training.quickLog.feedback.saved":
    "\nLa mise à jour du contrôle d'entraînement a été enregistrée avec succès.",
  "notifications.title": "\nNotifications",
  "notifications.bell": "\nOuvrir les notifications",
  "notifications.empty": "\nTout est clair",
  "notifications.emptyDescription": "\nAucune nouvelle notification pour le moment.",
  "notifications.unread": "\nNon lu",
  "notifications.markRead": "\nMarquer comme lu",
  "notifications.dismiss": "\nIgnorer",
  "chat.workspace.systemEvent": "\nSystème",
  "chat.workspace.toolResult": "\nOutil",
  "chat.workspace.handoffNote": "\nTransfert",
  "chat.workspace.delivered": "\nLivré",
  "chat.workspace.unreadCount": "\n{count} non lu",
  "admin.integrationHealth.title": "\nSanté de l'intégration",
  "admin.integrationHealth.subtitle": "\nÉtat de synchronisation sur les systèmes connectés",
  "admin.integrationHealth.syncsTotal": "\nSynchronisations totales",
  "admin.integrationHealth.syncsFailed": "\nÉchec",
  "admin.integrationHealth.syncsSuccess": "\nRéussi",
  "admin.integrationHealth.lastSync": "\nDernière synchronisation",
  "admin.auditTimeline.title": "\nJournal d'audit",
  "admin.auditTimeline.subtitle": "\nÉvénements système récents et changements d'état",
  "admin.iotCommands.title": "\nCycle de vie des commandes IoT",
  "admin.iotCommands.subtitle": "\nEnvoi des commandes de l'appareil et état d'acquittement",
  "admin.iotCommands.queued": "\nEn file d'attente",
  "admin.iotCommands.delivered": "\nLivré",
  "admin.iotCommands.acknowledged": "\nAccusé de réception",
  "admin.iotCommands.completed": "\nTerminé",
  "admin.iotCommands.failed": "\nÉchec",
  "admin.portalMembership.title": "\nAdhésion au portail",
  "admin.portalMembership.subtitle": "\nGestion des accès et des invitations des partenaires",
  "admin.portalMembership.email": "\nE-mail",
  "admin.portalMembership.role": "\nRôle",
  "admin.portalMembership.status": "\nStatut",
  "admin.portalMembership.invited": "\nInvité",
  "admin.portalMembership.active": "\nActif",
  "admin.portalMembership.pending": "\nEn attente",
  "fleet.stats.vehicles": "\nVéhicules",
  "fleet.stats.activeOps": "\nOpérations actives",
  "fleet.stats.initiatives": "\nInitiatives",
  "fleet.accordion.operations": "\nRésumé des opérations",
  "fleet.accordion.regional": "\nComparaison régionale",
  "fleet.accordion.focus": "\nObjectif d'amélioration",
  "buildings.stats.total": "\nBâtiments",
  "buildings.stats.initiatives": "\nInitiatives",
  "buildings.stats.contracts": "\nMesures contractuelles",
  "buildings.accordion.performance": "\nComparaison des performances",
  "buildings.accordion.initiatives": "\nAvancement de l'initiative",
  "sensors.stats.total": "\nCapteurs",
  "sensors.stats.activeAlerts": "\nAlertes actives",
  "sensors.stats.alertRules": "\nRègles d'alerte",
  "sensors.health.title": "\nÉtat du capteur",
  "predictions.stats.total": "\nPrédictions",
  "predictions.stats.critical": "\nCritique",
  "predictions.stats.avgConfidence": "\nConfiance moyenne",
  "predictions.timeline.title": "\nPrédictions à venir",
  "predictions.timeline.subtitle": "\nPrédictions triées par date prévue",
  "predictions.filter.all": "\nTous",
  "predictions.filter.critical": "\nCritique",
  "predictions.filter.high": "\nÉlevé",
  "predictions.filter.medium": "\nMoyen",
  "predictions.filter.low": "\nFaible",
  "digitalTwin.hotspot.title": "\nDétail du point d'accès",
  "digitalTwin.hotspot.created": '\nPoint d\'accès "{title}" créé.',
  "digitalTwin.hotspot.deleted": "\nPoint d'accès supprimé.",
  "digitalTwin.hotspots.noTwinAvailable":
    "\nAucun jumeau numérique n'est configuré. Créez d'abord un jumeau pour un site.",
  "digitalTwin.overlay.sensors": "\nSuperposition de capteurs",
  "digitalTwin.overlay.status": "\nÉtat de l'appareil",
  "financePlanning.compare.title": "\nComparaison de scénarios",
  "financePlanning.compare.subtitle": "\nAnalyse de projection côte à côte",
  "financePlanning.compare.scenarioA": "\nScénario A",
  "financePlanning.compare.scenarioB": "\nScénario B",
  "financePlanning.compare.delta": "\nDelta",
  "financePlanning.compare.select": "\nSélectionnez des scénarios",
  "estate.governance.title": "\nGouvernance",
  "estate.governance.agreements": "\nAccords",
  "estate.governance.fmControls": "\nCommandes FM",
  "estate.governance.stewardship": "\nIntendance",
  "estate.governance.rangeControls": "\nCommandes de portée",
  "estate.tabs.overview": "\nAperçu",
  "estate.tabs.governance": "\nApprobations",
  "estate.tabs.assurance": "\nActifs et assurance",
  "estate.tabs.readiness": "\nÉtat de préparation",
  "estate.tabs.partnerships": "\nContrats et intégrations",
  "analytics.title": "\nAnalyse",
  "analytics.subtitle": "\nGestion des ensembles de données et définitions de métriques",
  "analytics.datasets.name": "\nEnsemble de données",
  "analytics.datasets.freshness": "\nFraîcheur",
  "analytics.datasets.metrics": "\nMétriques",
  "analytics.datasets.empty": "\nAucun ensemble de données configuré",
  "analytics.datasets.emptyCta":
    "\nConfigurez votre premier ensemble de données analytiques pour commencer à suivre les métriques.",
  "portal.members.title": "\nMembres",
  "portal.members.subtitle": "\nGestion des accès et des invitations des partenaires",
  "portal.members.invite": "\nInviter un membre",
  "portal.members.email": "\nE-mail",
  "portal.members.role": "\nRôle",
  "portal.members.status": "\nStatut",
  "portal.members.status.active": "\nActif",
  "portal.members.status.pending": "\nEn attente",
  "portal.members.status.expired": "\nExpiré",
  "portal.members.stage.invited": "\nInvité",
  "portal.members.stage.accepted": "\nAccepté",
  "portal.members.stage.active": "\nActif",
  "portal.members.empty": "\nPas encore de membres",
  "portal.members.emptyCta": "\nInvitez votre premier partenaire sur le portail.",
  "portal.members.searchPlaceholder": "\nRechercher des membres…",
  "portal.members.searchLabel": "\nRechercher des membres du portail",
  "portal.members.filter.allStatuses": "\nTous les statuts",
  "portal.members.filter.allParties": "\nToutes les parties",
  "onboarding.title": "\nCommencez",
  "onboarding.subtitle": "\nSuivez ces étapes pour configurer votre espace de travail",
  "onboarding.step.registerAsset": "\nEnregistrez le premier actif",
  "onboarding.step.configureIntegrations": "\nConfigurer les intégrations",
  "onboarding.step.inviteTeam": "\nInviter les membres de l'équipe",
  "onboarding.step.setupAutomation": "\nConfigurer la première automatisation",
  "onboarding.step.generateReport": "\nGénérer le premier rapport",
  "onboarding.dismiss": "\nIgnorer le guide",
  "customisation.dashboard.title": "\nWidgets du tableau de bord",
  "customisation.dashboard.subtitle":
    "\nChoisissez les sections qui apparaissent sur votre tableau de bord",
  "customisation.dashboard.kpiWidgets": "\nWidgets KPI",
  "customisation.dashboard.activityFeed": "\nFlux d'activité",
  "customisation.dashboard.quickActions": "Actions rapides",
  "customisation.dashboardPreset.title": "\nPréréglages du tableau de bord",
  "customisation.dashboardPreset.commandCenter": "\nCentre de commandement",
  "customisation.dashboardPreset.commandCenterDescription":
    "\nAffichez ensemble les widgets KPI, le flux d'activité et les actions rapides.",
  "customisation.dashboardPreset.shiftFocus": "\nChanger de focus",
  "customisation.dashboardPreset.shiftFocusDescription":
    "\nGardez les widgets KPI et les actions rapides visibles tout en désactivant le flux d'activité.",
  "customisation.dashboardPreset.quiet": "\nTableau silencieux",
  "customisation.dashboardPreset.quietDescription":
    "\nRéduisez le tableau de bord aux widgets KPI pour une page de destination quotidienne à faible bruit.",
  "customisation.dashboardPreset.custom": "\nMise en page personnalisée",
  "customisation.dashboardPreset.customDescription":
    "\nLes paramètres actuels du tableau de bord ne correspondent à aucun des préréglages intégrés.",
  "customisation.dashboardPreset.subtitle":
    "\nChoisissez la position du tableau de bord qui correspond le mieux à votre rythme de fonctionnement actuel.",
  "nav.supportTickets": "\nBillets d'assistance",
  "supportTickets.title": "\nBillets d'assistance",
  "supportTickets.subtitle": "\nSuivre et gérer les demandes d'assistance",
  "supportTickets.status.OPEN": "\nOuvert",
  "supportTickets.status.IN_PROGRESS": "\nEn cours",
  "supportTickets.status.AWAITING_CUSTOMER": "\nEn attente du client",
  "supportTickets.status.RESOLVED": "\nRésolu",
  "supportTickets.status.CLOSED": "\nFermé",
  "supportTickets.priority.LOW": "\nFaible",
  "supportTickets.priority.MEDIUM": "\nMoyen",
  "supportTickets.priority.HIGH": "\nÉlevé",
  "supportTickets.priority.URGENT": "\nUrgent",
  "supportTickets.category.GENERAL_INQUIRY": "\nDemande générale",
  "supportTickets.category.TECHNICAL_ISSUE": "\nProblème technique",
  "supportTickets.category.BILLING": "\nFacturation",
  "supportTickets.category.FEATURE_REQUEST": "\nDemande de fonctionnalité",
  "supportTickets.category.BUG_REPORT": "\nRapport de bug",
  "supportTickets.category.ACCOUNT_ACCESS": "\nAccès au compte",
  "supportTickets.category.INTEGRATION": "\nIntégration",
  "supportTickets.category.OTHER": "\nAutre",
  "supportTickets.stats.total": "\nTotal des billets",
  "supportTickets.stats.breached": "Breached",
  "supportTickets.stats.open": "\nOuvert",
  "supportTickets.stats.inProgress": "\nEn cours",
  "supportTickets.stats.resolved": "\nRésolu",
  "supportTickets.tab.all": "\nTous les billets",
  "supportTickets.tab.open": "\nOuvert",
  "supportTickets.tab.inProgress": "\nEn cours",
  "supportTickets.tab.resolved": "\nRésolu",
  "supportTickets.tab.closed": "\nFermé",
  "supportTickets.table.ticketNumber": "Ticket no",
  "supportTickets.table.subject": "\nSujet",
  "supportTickets.table.status": "\nStatut",
  "supportTickets.table.priority": "\nPriorité",
  "supportTickets.table.category": "\nCatégorie",
  "supportTickets.table.assignedTo": "\nAttribué à",
  "supportTickets.table.createdAt": "\nCréé",
  "supportTickets.table.updatedAt": "\nMise à jour",
  "supportTickets.table.ariaLabel": "\nListe des tickets d'assistance",
  "supportTickets.searchPlaceholder": "\nRechercher des billets…",
  "supportTickets.searchLabel": "\nRechercher des tickets d'assistance",
  "supportTickets.empty": "\nAucun ticket d'assistance trouvé.",
  "supportTickets.emptyCta": "\nCréez un nouveau ticket pour commencer.",
  "supportTickets.workspace.listTitle": "Ticket inbox",
  "supportTickets.workspace.listDescription":
    "Review the queue, then open a ticket to continue triage, replies, and status changes in the workbench.",
  "supportTickets.workspace.listEmptyDescription":
    "This queue is clear. Adjust filters or create a new ticket to start the next response thread.",
  "supportTickets.create.title": "\nNouveau ticket d'assistance",
  "supportTickets.create.subject": "\nSujet",
  "supportTickets.create.subjectPlaceholder": "\nBrève description du problème",
  "supportTickets.create.description": "\nDescription",
  "supportTickets.create.descriptionPlaceholder": "\nFournissez des détails sur le problème",
  "supportTickets.create.priority": "\nPriorité",
  "supportTickets.create.category": "\nCatégorie",
  "supportTickets.create.site": "\nSite",
  "supportTickets.create.sitePlaceholder": "\nSélectionnez un site",
  "supportTickets.create.submit": "\nCréer un ticket",
  "supportTickets.create.submitting": "\nCréation…",
  "supportTickets.create.success": "\nTicket {ticketNumber} créé avec succès.",
  "supportTickets.create.error": "\nÉchec de la création du ticket : {message}",
  "supportTickets.detail.title": "\nDétails du billet",
  "supportTickets.detail.statusLabel": "\nStatut",
  "supportTickets.detail.priorityLabel": "\nPriorité",
  "supportTickets.detail.categoryLabel": "\nCatégorie",
  "supportTickets.detail.assigneeLabel": "\nDestinataire",
  "supportTickets.detail.siteLabel": "\nSite",
  "supportTickets.detail.createdLabel": "\nCréé",
  "supportTickets.detail.updatedLabel": "\nDernière mise à jour",
  "supportTickets.detail.resolvedLabel": "\nRésolu",
  "supportTickets.detail.closedLabel": "\nFermé",
  "supportTickets.detail.unassigned": "\nNon attribué",
  "supportTickets.detail.noSite": "\nAucun site",
  "supportTickets.detail.selectPromptTitle": "\nSélectionnez un billet",
  "supportTickets.detail.selectPromptDescription":
    "\nChoisissez un ticket d'assistance pour consulter les messages, mettre à jour le statut et envoyer des réponses.",
  "supportTickets.detail.selectGuideMessages":
    "Read the full conversation and internal notes before drafting the next reply.",
  "supportTickets.detail.selectGuideActions":
    "Promote the next status, request evidence, or hand the ticket to the next owner without leaving the workbench.",
  "supportTickets.detail.selectGuideCloseout":
    "Keep timestamps, site context, and final updates visible for an audit-ready closeout.",
  "supportTickets.detail.messages": "\nMessages",
  "supportTickets.detail.messagesEmpty": "\nAucun message pour l'instant.",
  "supportTickets.detail.addMessage": "\nAjouter la réponse",
  "supportTickets.detail.messagePlaceholder": "\nTapez votre réponse…",
  "supportTickets.detail.sendMessage": "\nEnvoyer",
  "supportTickets.detail.internalNote": "\nNote interne",
  "supportTickets.detail.updateStatus": "\nÉtat de la mise à jour",
  "supportTickets.detail.close": "\nFermer le ticket",
  "supportTickets.detail.reopen": "\nRéouvrir le ticket",
  "supportTickets.filter.status": "\nStatut",
  "supportTickets.filter.priority": "\nPriorité",
  "supportTickets.filter.category": "\nCatégorie",
  "supportTickets.filter.site": "\nSite",
  "supportTickets.filter.allStatuses": "\nTous les statuts",
  "supportTickets.filter.allPriorities": "\nToutes les priorités",
  "supportTickets.filter.allCategories": "\nToutes les catégories",
  "supportTickets.filter.allSites": "\nTous les sites",
  "supportTickets.validation.subjectRequired": "\nLe sujet est obligatoire.",
  "supportTickets.validation.descriptionRequired": "\nUne description est requise.",
  "supportTickets.message.sent": "\nRéponse envoyée.",
  "supportTickets.message.error": "\nÉchec de l'envoi de la réponse : {message}",
  "supportTickets.statusUpdate.success": "\nStatut du billet mis à jour.",
  "supportTickets.statusUpdate.error": "\nÉchec de la mise à jour du statut : {message}",
  "chat.workspace.threadPanelTitle": "\nSujet",
  "common.emptySearchTitle": "\nAucun résultat trouvé",
  "common.emptySearchDescription": "\nEssayez d'ajuster vos critères de recherche ou de filtre.",
  "common.pagination.summary": "\nAffichage de {from}–{to} sur {total}",
  "documentDetail.breadcrumb.navAria": "\nFil d’Ariane",
  "documentDetail.title": "\nDétail du document",
  "documentDetail.loading": "\nChargement du document…",
  "documentDetail.error.title": "\nErreur lors du chargement du document",
  "documentDetail.error.description": "\nLe document n'a pas pu être chargé. Veuillez réessayer.",
  "documentDetail.field.title": "\nTitre",
  "documentDetail.field.customer": "\nClient",
  "documentDetail.field.customerEmail": "\nE-mail client",
  "documentDetail.field.customerOrder": "\nCommande client",
  "documentDetail.field.createdOrder": "\nCommande créée",
  "documentDetail.field.site": "\nSite",
  "documentDetail.field.dueDate": "\nDate d'échéance",
  "documentDetail.field.requestedAt": "\nDemandé à ",
  "documentDetail.field.requestedBy": "\nDemandé par",
  "documentDetail.field.requestedDeliveryAt": "\nLivraison demandée",
  "documentDetail.field.totalAmount": "\nMontant total",
  "documentDetail.field.budget": "\nBudget",
  "documentDetail.field.approvedBy": "\nApprouvé par",
  "documentDetail.field.assignee": "\nDestinataire",
  "documentDetail.field.estimatedCloseAt": "\nClôture estimée",
  "documentDetail.field.issuedAt": "\nPublié à",
  "documentDetail.field.paidAt": "\nPayé à ",
  "documentDetail.field.paymentTerm": "\nConditions de paiement",
  "documentDetail.field.labourCost": "\nCoût de la main d'œuvre",
  "documentDetail.field.materialCost": "\nCoût du matériel",
  "documentDetail.field.outstandingAmount": "\nMontant restant dû",
  "documentDetail.field.receipts": "\nReçus",
  "documentDetail.field.discrepancy": "\nÉcart",
  "documentDetail.field.dispatchWindow": "\nFenêtre d'expédition",
  "documentDetail.field.sla": "Niveau de service",
  "documentDetail.field.signoff": "\nSignature",
  "documentDetail.field.scheduleWindow": "Fenêtre de planification",
  "documentDetail.field.sourceRfq": "\nSource RFQ",
  "documentDetail.field.updatedAt": "\nMis à jour le ",
  "documentDetail.field.vendor": "\nFournisseur",
  "documentDetail.field.vendorReference": "\nRéférence du fournisseur",
  "documentDetail.field.workOrder": "\nBon de travail",
  "documentDetail.section.overviewTitle": "\nAperçu",
  "documentDetail.section.overviewDescription": "\nDétails clés de ce document.",
  "documentDetail.section.lineItemsTitle": "\nÉléments de campagne",
  "documentDetail.section.lineItemsDescription": "\nÉléments inclus dans ce document.",
  "documentDetail.section.relatedTitle": "\nDocuments associés",
  "documentDetail.section.relatedDescription": "\nDocuments liés à cet enregistrement.",
  "documentDetail.table.description": "\nDescription",
  "documentDetail.table.quantity": "\nQté",
  "documentDetail.table.amount": "\nMontant",
  "documentDetail.table.total": "\nTotal",
  "documentDetail.empty.lineItems": "\nAucun élément de campagne.",
  "documentDetail.empty.related": "\nAucun document connexe.",
  "documentDetail.empty.timeline": "\nAucune entrée dans la chronologie.",
  "documentWorkflow.feedback.updated": "\nÉtat du workflow mis à jour.",
  "documentWorkflow.feedback.invalidAction": "\nAction de flux de travail non valide.",
  "estate.focus.title": "\nFocus immobilier",
  "estate.integration.title": "\nIntégrations",
  "estate.integration.coverageLabel": "\n{configured} intégrations sur {total} sont configurées.",
  "mlops.summary.experiments": "\nExpériences",
  "mlops.summary.registry": "\nRegistre des modèles",
  "portal.invite.title": "\nInvitation au portail",
  "portal.invite.subtitle": "\nVous avez été invité à rejoindre le portail.",
  "portal.invite.accept": "\nAccepter l'invitation",
  "portal.invite.email": "\nE-mail",
  "portal.invite.party": "\nOrganisation",
  "portal.invite.expires": "\nExpire",
  "portal.invite.metadata": "\nDétails de l'invitation",
  "portal.invite.accessTitle": "\nAperçu de l'accès aux partenaires",
  "portal.invite.accessDescription":
    "\nPrévisualisez l'organisation invitée, confirmez le compte destinataire et conservez le chemin d'acceptation sur le même écran sécurisé.",
  "portal.invite.openPortal": "\nOuvrir le portail",
  "portal.invite.signIn": "\nConnectez-vous",
  "portal.invite.signOut": "\nDéconnexion",
  "portal.invite.signedInAs": "\nConnecté sous le nom {email}",
  "portal.invite.checklist.scopeTitle": "\nExaminez l’organisation invitée",
  "portal.invite.checklist.scopeDescription":
    "\nCette invitation accorde un accès limité à la surface du portail partagé pour l'organisation répertoriée uniquement.",
  "portal.invite.checklist.expiryTitle": "\nAccepter avant l'expiration de l'invitation",
  "portal.invite.checklist.expiryDescription":
    "\nUtilisez le même chemin d'invitation avant la date d'expiration afin que l'acceptation reste attachée à la demande d'origine.",
  "portal.invite.checklist.supportTitle": "\nUtilisez le compte invité ou changez proprement",
  "portal.invite.checklist.supportDescription":
    "\nConnectez-vous avec l'adresse e-mail invitée pour continuer. Si l'accès échoue toujours, réessayez à partir de cette invitation au lieu d'ouvrir un chemin de portail distinct.",
  "portal.invite.checklist.switchAccountDescription":
    "\nSi vous êtes connecté avec une mauvaise adresse e-mail, déconnectez-vous d'abord et revenez à cette invitation afin que les droits restent alignés.",
  "portal.invite.error.expired": "\nCette invitation a expiré.",
  "portal.invite.error.invalid": "\nCette invitation n'est pas valide.",
  "portal.invite.error.unauthenticated":
    "\nVeuillez vous connecter pour accepter cette invitation.",
  "portal.invite.error.emailMismatch":
    "\nCette invitation a été envoyée à une autre adresse e-mail.",
  "portal.members.access.invite": "\nInviter un membre",
  "portal.members.access.pendingAcceptance": "\nEn attente d'acceptation",
  "portal.members.access.membership": "\nAdhésion",
  "portal.members.rolePending": "\nEn attente",
  "portal.members.error.alreadyMember": "\nCet utilisateur est déjà membre.",
  "portal.members.error.invalidInput": "\nVeuillez vérifier le formulaire et réessayer.",
  "portal.members.error.partyNotFound": "\nOrganisation introuvable.",
  "portal.members.error.notFound": "\nLe membre sélectionné est introuvable.",
  "portal.members.error.invalidRole": "\nChoisissez un rôle de portail valide.",
  "portal.members.error.roleUnavailable":
    "\nLes changements de rôle ne sont disponibles que pour les adhésions actives.",
  "portal.members.roleChange": "\nChangement de rôle",
  "portal.members.updateRole": "\nMettre à jour le rôle",
  "portal.members.revoke": "\nRévoquer l'accès",
  "portal.members.revokeDescription":
    "\nRévoquer l'invitation ou l'adhésion sélectionnée sans quitter le contexte actuel de l'espace de travail.",
  "portal.members.unavailable.title": "\nMembres du portail indisponibles",
  "portal.members.unavailable.description":
    "\nL’espace de travail des membres est indisponible tant que la base de données est hors ligne. Les filtres, les invitations et les actions sur les membres sont désactivés jusqu’au retour de la connexion.",
  "portal.members.history.title": "\nHistorique des accès",
  "portal.members.history.invitedTitle": "\nInvitation émise",
  "portal.members.history.invitedDescription": "L'accès initial a été préparé le {date}.",
  "portal.members.history.inviteAccessTitle": "\nÉtat d'accès à l'invitation",
  "portal.members.history.membershipAccessTitle": "\nÉtat d'accès à l'adhésion",
  "portal.members.history.accessDescription": "\nPosture d'accès actuelle : {state}.",
  "portal.members.history.systemActor": "\nFlux de travail du système",
  "portal.members.history.acceptedTitle": "\nInvitation acceptée",
  "portal.members.history.acceptedDescription":
    "\n{actor} a accepté l'invitation au portail et a continué dans l'espace de travail du partenaire.",
  "portal.members.history.activatedTitle": "\nAdhésion activée",
  "portal.members.history.activatedDescription":
    "\n{actor} a activé l'adhésion à l'espace de travail pour ce contact du groupe.",
  "portal.members.history.roleUpdatedTitle": "\nRôle mis à jour",
  "portal.members.history.roleUpdatedDescription":
    "\n{actor} a changé le rôle de {previousRole} à {nextRole}.",
  "portal.members.history.revokedTitle": "\nAccès révoqué",
  "portal.members.history.revokedDescription": "\n{actor} a révoqué cet accès du portail.",
  "portal.members.history.summaryTitle": "\nRésumé de la gouvernance",
  "portal.members.history.summaryDescription":
    "\nGardez l'émission d'invitations, les changements de rôle, les révocations et le dernier événement de gouvernance visibles lors de la gestion des accès.",
  "portal.members.history.trackedChangesLabel": "\nEntrées suivies",
  "portal.members.history.roleChangeCountLabel": "\nChangements de rôle",
  "portal.members.history.revokeCountLabel": "\nRévocations",
  "portal.members.history.latestEventLabel": "\nDernier événement de gouvernance",
  "portal.members.history.latestEventFallback":
    "\nEn attente de la prochaine mise à jour de la gouvernance",
  "portal.members.reissue": "\nRééditer l'invitation",
  "portal.members.alert.inviteSuccess": "\nInvitation préparée pour {email} en {party}.",
  "portal.members.alert.reissueSuccess": "\nInvitation rééditée pour {email} en {party}.",
  "portal.members.alert.roleSuccess": "\nRôle mis à jour pour {email} dans {party}.",
  "portal.members.alert.revokeSuccess": "\nAccès révoqué pour {email} dans {party}.",
  "portal.nav.collaboration": "\nCollaboration",
  "portal.nav.documents": "\nDocuments",
  "portal.nav.members": "\nMembres",
  "reports.activePackage.title": "\nForfait actif",
  "reports.datasets.title": "\nEnsembles de données",
  "reports.schedule.title": "\nLivraison prévue",
  "reports.schedule.description":
    "\nConfigurez l'envoi automatique de rapports par e-mail selon un calendrier récurrent.",
  "reports.schedule.frequency": "\nFréquence",
  "reports.schedule.daily": "\nQuotidien",
  "reports.schedule.weekly": "\nHebdomadaire",
  "reports.schedule.monthly": "\nMensuel",
  "reports.schedule.deliveryChannel": "\nCanal de diffusion",
  "reports.schedule.email": "\nE-mail",
  "reports.schedule.webhook": "\nWebhook",
  "reports.schedule.recipientsLabel": "\nDestinataires",
  "reports.schedule.recipientsPlaceholder":
    "\nSaisissez les adresses e-mail séparées par des virgules",
  "reports.schedule.timezoneLabel": "\nFuseau horaire",
  "reports.schedule.save": "\nEnregistrer le planning",
  "reports.schedule.disable": "\nDésactiver le planning",
  "reports.schedule.nextDelivery": "\nProchaine livraison",
  "reports.schedule.lastDelivery": "\nDernière livraison",
  "reports.schedule.active": "\nActif",
  "reports.schedule.inactive": "\nInactif",
  "reports.schedule.created": "\nPlanification créée avec succès.",
  "reports.schedule.updated": "\nCalendrier mis à jour avec succès.",
  "reports.schedule.empty": "\nAucun calendrier de livraison configuré.",
  "reports.schedule.emptyAction":
    "\nAjoutez un calendrier pour fournir ce rapport automatiquement.",
  "reports.sharing.title": "\nPartage et autorisations",
  "reports.sharing.description": "\nContrôlez qui peut consulter ou modifier ce rapport.",
  "reports.sharing.addUser": "\nAjouter un utilisateur",
  "reports.sharing.addRole": "\nAjouter un rôle",
  "reports.sharing.permissionView": "\nAfficher",
  "reports.sharing.permissionEdit": "\nModifier",
  "reports.sharing.permissionAdmin": "\nAdministrateur",
  "reports.sharing.remove": "\nSupprimer",
  "reports.sharing.userLabel": "\nUtilisateur",
  "reports.sharing.userPlaceholder": "\nSélectionnez un utilisateur",
  "reports.sharing.permissionLabel": "\nAutorisation",
  "reports.sharing.save": "\nPartager le rapport",
  "reports.sharing.empty": "\nCe rapport n'a été partagé avec personne.",
  "reports.sharing.emptyAction": "\nPartagez ce rapport avec les membres de l'équipe.",
  "reports.sharing.shared": "\nRapport partagé avec succès.",
  "reports.sharing.removed": "\nAccès supprimé avec succès.",
  "reports.export.title": "\nExporter le rapport",
  "reports.export.pdf": "\nExporter PDF",
  "reports.export.csv": "\nExporter CSV",
  "reports.export.excel": "\nExporter Excel",
  "reports.export.arrow": "\nExporter Arrow",
  "reports.export.parquet": "\nExporter Parquet",
  "reports.export.generating": "\nGénération de l'exportation...",
  "reports.export.download": "\nTélécharger",
  "reports.export.error": "\nL'exportation a échoué. Veuillez réessayer.",
  "reports.dateRange.custom": "\nPlage de dates personnalisée",
  "reports.dateRange.from": "\nÀ partir de",
  "reports.dateRange.to": "\nÀ",
  "reports.dateRange.apply": "\nAppliquer la plage",
  "reports.dateRange.clear": "\nEffacer la plage",
  "reports.dateRange.hint":
    "\nSélectionnez les dates de début et de fin pour filtrer les données du rapport.",
  "reports.drilldown.clickToExpand": "\nCliquez pour voir les détails",
  "reports.drilldown.backToSummary": "\nRetour au sommaire",
  "reports.drilldown.breadcrumbRoot": "\nRésumé",
  "reports.drilldown.loadingDetail": "\nChargement de la vue détaillée...",
  "reports.drilldown.detailTitle": "\nVue détaillée",
  "reports.drilldown.detailBreakdown": "\nRépartition détaillée pour {item}",
  "reports.drilldown.detailContent": "Répartition détaillée de l'article {item}.",
  "workOrderDetail.title": "\nDétail de l'ordre de travail",
  "training.courses.title": "\nCours de formation",
  "training.courses.description":
    "\nGérer les cours de formation, les modules et les inscriptions des employés.",
  "training.courses.create": "\nCréer un cours",
  "training.courses.editTitle": "\nModifier le cours",
  "training.courses.moduleCount": "\n{count} modules",
  "training.courses.enrolledCount": "\n{count} inscrit",
  "training.courses.completionRate": "\n{rate}% d'achèvement",
  "training.courses.durationLabel": "\nDurée",
  "training.courses.mandatoryLabel": "\nObligatoire",
  "training.courses.optionalLabel": "\nFacultatif",
  "training.courses.empty": "\nAucune formation n'a encore été créée.",
  "training.modules.title": "\nModules de cours",
  "training.modules.add": "\nAjouter un module",
  "training.modules.contentType": "\nType de contenu",
  "training.modules.video": "\nVidéo",
  "training.modules.document": "\nDocument",
  "training.modules.quiz": "\nQuiz",
  "training.modules.sortOrder": "\nCommande",
  "training.modules.duration": "\nDurée (min)",
  "training.certification.title": "\nCertifications",
  "training.certification.description":
    "\nSuivre la validité et l'expiration de la certification pour vérifier la conformité.",
  "training.certification.expiresAt": "\nExpire",
  "training.certification.daysUntilExpiry": "\n{days} jours restants",
  "training.certification.expired": "\nExpiré",
  "training.certification.expiringSoon": "\nExpire bientôt",
  "training.certification.valid": "\nValide",
  "training.certification.expiringAlert": "\nCertifications {count} expirant dans les 30 jours",
  "training.certification.renewAction": "\nRenouveler",
  "training.certification.downloadCertificate": "\nTélécharger le certificat",
  "training.certification.issuedBy": "\nPublié par",
  "training.certification.issuedAt": "\nPublié à",
  "training.certification.name": "\nNom du certificat",
  "training.certification.empty": "\nAucune certification enregistrée.",
  "training.competencyMatrix.title": "\nMatrice de compétences",
  "training.competencyMatrix.description":
    "\nMapper les compétences requises avec les qualifications réelles des employés.",
  "training.competencyMatrix.requiredLevel": "\nObligatoire",
  "training.competencyMatrix.currentLevel": "\nActuel",
  "training.competencyMatrix.gap": "\nÉcart",
  "training.competencyMatrix.noGap": "\nMet",
  "training.competencyMatrix.employee": "\nEmployé",
  "training.competencyMatrix.competency": "\nCompétence",
  "training.competencyMatrix.level": "\nNiveau",
  "training.competencyMatrix.empty": "\nAucune définition de compétence configurée pour le moment.",
  "training.competencyMatrix.emptyEmployee":
    "\nAucune évaluation des compétences des employés enregistrée.",
  "common.approvalSignoff": "\nApprobation et signature",
  "common.dispatchBoard": "\nTableau de répartition",
  "common.serviceBoard": "\nCarte de service",
  "common.ownerQueue": "\nFile d'attente des propriétaires",
  "common.slaTimers": "\nMinuteries SLA",
  "common.macros": "\nMacros",
  "common.certificationWorkflow": "\nFlux de travail de certification",
  "common.escalationWorkflow": "\nWorkflow de remontée d'informations",
  "common.cohortCompare": "\nComparaison de cohortes",
  "common.pinboard": "\nTableau d'affichage des problèmes",
  "common.governanceControls": "\nContrôles de gouvernance",
  "predictions.workspace.promote.eyebrow": "\nPromouvoir l'action",
  "predictions.workspace.promote.title": "\nPromouvoir le signal dans le travail",
  "predictions.workspace.promote.description":
    "\nTransférez la prédiction en direct dans la répartition, la récupération de service, la planification ou un pack de rapports sans quitter l'espace de travail.",
  "predictions.workspace.promote.dispatchLabel": "\nSuivi des expéditions",
  "predictions.workspace.promote.dispatchDescription":
    "\nOuvrez la file d'attente des tâches en gardant à l'esprit la posture de prédiction en direct.",
  "predictions.workspace.promote.serviceLabel": "\nTableau de service ouvert",
  "predictions.workspace.promote.serviceDescription":
    "\nDéplacez le signal actif vers la coordination des ordres de travail et l'exécution sur le terrain.",
  "predictions.workspace.promote.planningLabel": "\nPromouvoir vers la planification",
  "predictions.workspace.promote.planningDescription":
    "\nTransmettez le signal de risque dans la planification financière et l’examen des investissements.",
  "predictions.workspace.promote.reportLabel": "\nCréer un pack de rapports",
  "predictions.workspace.promote.reportDescription":
    "\nCapturez les preuves actuelles de l'IA dans un flux de travail de rapport durable.",
  "predictions.workspace.ownerQueue.eyebrow": "\nFile d'attente des propriétaires",
  "predictions.workspace.ownerQueue.title": "\nTransfert du propriétaire actuel",
  "predictions.workspace.ownerQueue.description":
    "\nGardez le prochain opérateur, la fiabilité et les propriétaires d'approvisionnement visibles à côté du tableau des risques classés.",
  "predictions.workspace.ownerQueue.dispatchItem":
    "\nLe propriétaire de l'expédition confirme la prochaine action sur le terrain et la fenêtre d'échéance.",
  "predictions.workspace.ownerQueue.reliabilityItem":
    "\nLe propriétaire de la fiabilité valide les preuves de l'IA avant que le signal ne se transforme en un travail répété.",
  "predictions.workspace.ownerQueue.procurementItem":
    "Le propriétaire de l'approvisionnement reste à l'affût des pièces, des remplacements ou de la pression d'élimination.",
  "finance.cockpit.savedSlices.title": "\nTranches financières enregistrées",
  "finance.cockpit.savedSlices.description":
    "\nPassez d'une tranche financière à l'autre que les opérateurs rouvrent le plus souvent lors de l'examen et de l'approbation.",
  "finance.cockpit.savedSlices.portfolio": "\nSurveillance du portefeuille",
  "finance.cockpit.savedSlices.depreciation": "\nSurveillance de dépréciation",
  "finance.cockpit.savedSlices.controls": "\nRevue de contrôle",
  "finance.cockpit.savedSlices.reviewWindow": "\nFenêtre de révision",
  "finance.cockpit.savedSlices.ownerQueue": "\nFile d'attente des propriétaires",
  "finance.cockpit.savedSlices.packReady": "\nPack prêt",
  "finance.cockpit.signoff.title": "\nBoucle d'approbation et de distribution",
  "finance.cockpit.signoff.description":
    "\nGardez la base de planification, le suivi des achats et la distribution des rapports visibles dans un seul plateau d'approbation.",
  "finance.cockpit.signoff.planTitle": "\nRéférence de planification",
  "finance.cockpit.signoff.planDescription":
    "\nExaminez la base de référence de la planification financière active.",
  "finance.cockpit.signoff.planSupport":
    "\nMaintenir la position de dépréciation actuelle lors du prochain cycle d'approbation.",
  "finance.cockpit.signoff.procurementTitle": "\nSuivi des approvisionnements",
  "finance.cockpit.signoff.procurementDescription":
    "\nVérifiez le chemin du bon de commande avant de débloquer les dépenses.",
  "finance.cockpit.signoff.procurementSupport":
    "\nGardez les actions d'achat en aval visibles à côté de la tranche financière actuelle.",
  "finance.cockpit.signoff.distributionTitle": "\nDistribution des rapports",
  "finance.cockpit.signoff.distributionDescription":
    "\nIntégrez la situation financière actuelle au prochain pack de parties prenantes.",
  "finance.cockpit.signoff.distributionSupport":
    "\nAcheminez le résumé approuvé vers la chronologie et la distribution du rapport enregistré.",
  "financePlanning.workflow.title": "\nCadence d'approbation",
  "financePlanning.workflow.description":
    "\nSuivez la ligne de base actuelle, la pression d'approbation et l'état de préparation à la distribution avant que les scénarios ne se déplacent vers l'aval.",
  "financePlanning.workflow.baseline":
    "\n{count} scénario(s) de référence restent dans l'ensemble de révision actif.",
  "financePlanning.workflow.approvals":
    "\n{count} les signaux d'approbation ou de dépendance doivent encore être approuvés avant la publication.",
  "financePlanning.workflow.distribution":
    "\n{count} chemin(s) de distribution connecté(s) sont prêts pour le prochain pack certifié.",
  "utilisation.cockpit.savedViews.title": "\nVues d'utilisation enregistrées",
  "utilisation.cockpit.savedViews.description":
    "\nBasculez entre les tranches de cohorte enregistrées que les opérateurs utilisent pour comparer la demande équilibrée, sous pression et en reprise.",
  "utilisation.cockpit.savedViews.cohort": "\nComparaison de cohortes",
  "utilisation.cockpit.savedViews.workflow": "\nTransfert du flux de travail",
  "utilisation.cockpit.cohortCompare.title": "\nComparaison de cohortes",
  "utilisation.cockpit.cohortCompare.description":
    "\nUtilisez la tranche de date actuelle comme référence pour la comparaison des sites homologues et des actifs homologues.",
  "utilisation.cockpit.cohortCompare.supporting":
    "\nPortez cette vue de cohorte dans le prochain transfert de rapport ou d’intervention.",
  "apiExplorer.savedRequests.title": "\nDemandes enregistrées",
  "apiExplorer.savedRequests.description":
    "\nGardez les sondes HTML, API et d'authentification courantes à portée de main pour une enquête répétée.",
  "apiExplorer.savedRequests.dashboard": "\nSonde HTML du tableau de bord",
  "apiExplorer.savedRequests.ucp": "\nSonde API UCP",
  "apiExplorer.savedRequests.auth": "\nSonde du chemin d'authentification",
  "apiExplorer.history.title": "\nHistorique des demandes",
  "apiExplorer.history.description":
    "\nLes modèles de requêtes récentes restent visibles afin que les opérateurs puissent répéter les filtres sans les reconstruire.",
  "apiExplorer.history.active": "Surface active : {surface}",
  "apiExplorer.history.html": "\nLes sondes de navigation HTML récentes restent épinglées ici.",
  "apiExplorer.history.api": "\nLes sondes API récentes restent épinglées ici pour être rejouées.",
  "supportTickets.workspace.sla.title": "\nSLA et état de la file d'attente",
  "supportTickets.workspace.sla.description":
    "\nGardez la file d'attente active et la posture du ticket sélectionnée visibles lors du tri du volet de détails.",
  "supportTickets.workspace.sla.openQueue":
    "\n{count} ticket(s) ouvert(s) restent actuellement dans la fenêtre SLA active.",
  "supportTickets.workspace.sla.activeQueue":
    "\n{count} ticket(s) restent actifs dans la file d’attente d’assistance actuelle.",
  "supportTickets.workspace.sla.selectTicket":
    "\nSélectionnez un ticket pour inspecter la posture actuelle du SLA et le transfert du propriétaire.",
  "supportTickets.workspace.sla.selectedTicket":
    "\nLe ticket sélectionné est {status} avec la priorité {priority}.",
  "supportTickets.workspace.macros.title": "\nMacros de support",
  "supportTickets.workspace.macros.description":
    "\nUtilisez des macros de réponse reproductibles pour assurer la cohérence du tri, des demandes de preuves et de la clôture.",
  "supportTickets.workspace.macros.requestEvidence":
    "\nMacro : demander une preuve client avant que le ticket ne quitte la file d'attente active.",
  "supportTickets.workspace.macros.escalate":
    "\nMacro : transmettre le ticket au prochain propriétaire du service avec le contexte actuel intact.",
  "supportTickets.workspace.macros.closeLoop":
    "\nMacro : bouclez la boucle avec une mise à jour du statut final et un résumé prêt pour l'audit.",
  "training.workflow.certificationTitle": "\nCadence de certification récurrente",
  "training.workflow.certificationDescription":
    "\nContinuez à effectuer les examens de préparation, les mises à jour de contrôle et les preuves de certification via un flux de travail récurrent.",
  "training.workflow.certificationReadiness":
    "\nLes enregistrements de capacité de préparation {count} sont actuellement suffisamment solides pour un examen de certification.",
  "training.workflow.certificationReview":
    "\n{count} les éléments d'examen de contrôle nécessitent encore l'approbation de la certification.",
  "training.workflow.certificationHistory":
    "\n{count} les mises à jour de contrôle récentes sont disponibles comme preuve de certification récurrente.",
  "training.workflow.escalationTitle": "\nWorkflow de remontée d'informations",
  "training.workflow.escalationDescription":
    "\nRegroupez les inspections en retard, l'assistance ouverte et les files d'attente d'action dans une seule voie d'escalade.",
  "training.workflow.escalationActions":
    "\n{count} éléments d'action sont actuellement en attente dans la file d'attente d'escalade.",
  "training.workflow.escalationInspections":
    "\n{count} les inspections en retard restent actives dans la tranche de formation en cours.",
  "training.workflow.escalationSupport":
    "\n{count} les tickets d'assistance ouverts nécessitent encore un suivi de remontée.",
  "fleet.dispatch.title": "\nTableau de répartition",
  "fleet.dispatch.description":
    "\nDéplacez les problèmes de flotte vers le bon tableau opérationnel avant qu'ils ne se transforment en perte de disponibilité.",
  "fleet.dispatch.taskQueue": "\nFile d'attente des tâches",
  "fleet.dispatch.taskQueueDescription":
    "\nExaminez le retard de répartition actuel et affectez l'équipe suivante.",
  "fleet.dispatch.serviceBoard": "\nCarte de service",
  "fleet.dispatch.serviceBoardDescription":
    "\nAcheminez les incidents actifs et les temps d'arrêt vers la récupération du service.",
  "fleet.dispatch.reportPack": "\nPack de rapports",
  "fleet.dispatch.reportPackDescription":
    "Intégrez la pression actuelle de la flotte dans le prochain mémoire de décision.",
  "fleet.ownerQueue.title": "\nFile d'attente des propriétaires de flotte",
  "fleet.ownerQueue.description":
    "\nGardez les propriétaires de répartition, de maintenance et de remplacement alignés sur la tranche de flotte actuelle.",
  "fleet.ownerQueue.dispatch":
    "\n{count} enregistrements de flotte sont en attente de propriété de répartition.",
  "fleet.ownerQueue.recovery":
    "\n{count} bon(s) de travail actif(s) sont toujours en cours de récupération de service.",
  "fleet.ownerQueue.replacement":
    "\n{count} éléments du plan de remplacement restent en file d'attente pour examen.",
  "fleet.serviceBoard.title": "\nCarte de service",
  "fleet.serviceBoard.description":
    "\nRésumez la pression actuelle en matière de maintenance et de temps d'arrêt dans une voie de service opérationnelle.",
  "fleet.serviceBoard.accidents":
    "\nLes dossiers d'accidents {count} nécessitent actuellement un examen.",
  "fleet.serviceBoard.downtime":
    "\n{count} les enregistrements de temps d'arrêt restent actifs dans le couloir de service.",
  "fleet.serviceBoard.replacement":
    "\n{count} les éléments de planification du remplacement nécessitent encore un alignement sur le service de la flotte.",
  "buildings.heatmap.title": "\nCarte thermique du portefeuille",
  "buildings.heatmap.description":
    "\nMettez en évidence la pression actuelle du bâtiment en termes de préparation, de couverture des capteurs, d'assurance et de charge du programme.",
  "buildings.heatmap.readiness": "\nPression de préparation",
  "buildings.heatmap.readinessDescription":
    "\nLes actifs et les ordres de travail façonnent actuellement l'état de préparation du bâtiment.",
  "buildings.heatmap.coverage": "\nCouverture du capteur",
  "buildings.heatmap.coverageDescription":
    "\nCharge d'examen liée aux capteurs dans la cohorte de bâtiments actuelle.",
  "buildings.heatmap.assurance": "\nRisque d'assurance",
  "buildings.heatmap.assuranceDescription":
    "\nLes actions d’assurance ouvertes façonnent toujours la posture du portefeuille.",
  "buildings.heatmap.programme": "\nChargement du programme",
  "buildings.heatmap.programmeDescription":
    "\nDes initiatives qui touchent encore la cohorte actuelle du bâtiment.",
  "buildings.compare.title": "\nComparaison du portefeuille",
  "buildings.compare.description":
    "\nPassez de la carte thermique du bâtiment au rapport suivant ou à la comparaison de référence sans reconstruire le contexte.",
  "buildings.compare.reportPack": "\nOuvrir le pack de rapports",
  "buildings.compare.reportPackDescription":
    "\nLancez la tranche de bâtiment actuelle dans l'espace de travail de reporting.",
  "buildings.compare.portfolioBaseline": "\nComparaison de référence ouverte",
  "buildings.compare.portfolioBaselineDescription":
    "\nUtilisez la situation actuelle du bâtiment comme prochaine référence de portefeuille.",
  "buildings.compare.ownerQueueTitle": "\nFile d'attente des propriétaires du bâtiment",
  "buildings.compare.ownerQueueDescription":
    "\nMontrez quels propriétaires de bâtiments doivent réagir ensuite en termes de planification, de capteurs et d'assurance.",
  "buildings.compare.ownerQueuePlanning":
    "\n{count} élément(s) de planification doivent encore être examinés par le propriétaire du bâtiment.",
  "buildings.compare.ownerQueueSensors":
    "\n{count} les éléments d'évaluation liés aux capteurs restent actifs dans cette cohorte.",
  "buildings.compare.ownerQueueAssurance":
    "\n{count} les actions d'assurance sont toujours en attente du suivi du propriétaire.",
  "sensors.calibration.title": "\nPiste d'étalonnage et de simulation",
  "sensors.calibration.description":
    "Déplacez les problèmes de capteur vers l'étalonnage, la révision des règles ou l'escalade sans quitter le cockpit.",
  "sensors.calibration.queueLabel": "\nFile d'attente d'étalonnage",
  "sensors.calibration.queueDescription":
    "\nExaminez la charge de travail d'étalonnage actuelle pour l'ensemble de capteurs actifs.",
  "sensors.calibration.rulesLabel": "\nSimulation de règles",
  "sensors.calibration.rulesDescription":
    "\nVérifiez les modifications apportées aux règles d'alerte avant qu'elles ne soient promues sur la voie active.",
  "sensors.calibration.escalationLabel": "\nVoie d'escalade",
  "sensors.calibration.escalationDescription":
    "\nReportez les problèmes de capteur de pression la plus élevée lors du prochain transfert du propriétaire.",
  "sensors.ownerQueue.title": "\nFile d'attente du propriétaire du capteur",
  "sensors.ownerQueue.description":
    "\nGardez les propriétaires d’étalonnage, de SLA et d’assurance alignés sur l’ensemble d’exceptions actuel.",
  "sensors.ownerQueue.calibration":
    "\n{count} la règle d'alerte ou les éléments d'étalonnage restent dans la file d'attente active.",
  "sensors.ownerQueue.slaLane":
    "\n{count} des éléments de travail pilotés par des capteurs qui ont été violés façonnent la voie SLA.",
  "sensors.ownerQueue.assurance":
    "\n{count} les actions d'assurance nécessitent toujours un propriétaire nommé.",
  "digitalTwin.pinboard.title": "\nTableau d'affichage des problèmes",
  "digitalTwin.pinboard.description":
    "\nÉpinglez les points chauds clés, les problèmes de couverture et les contrôles de sortie à côté de la scène en direct.",
  "digitalTwin.pinboard.hotspotItem":
    "\nLe code PIN du point d'accès reste actif et nécessite la confirmation de l'opérateur dans la vue jumelle actuelle.",
  "digitalTwin.pinboard.coverageItem":
    "\nLa broche d'écart de couverture reste ouverte pour la tranche de télémétrie et de caméra actuelle.",
  "digitalTwin.pinboard.egressItem":
    "\nLa broche de sortie et de flux est prête pour la prochaine présentation de la scène.",
  "digitalTwin.actions.title": "\nRail d'action",
  "digitalTwin.actions.description":
    "\nDéplacez le problème jumeau actif vers le travail, le support ou la capture de preuves sans quitter le spectateur.",
  "digitalTwin.actions.dispatchLabel": "\nSuivi des expéditions",
  "digitalTwin.actions.dispatchDescription":
    "\nOuvrez la file d'attente opérationnelle pour le problème de jumeau actif.",
  "digitalTwin.actions.supportLabel": "\nVoie d'assistance ouverte",
  "digitalTwin.actions.supportDescription":
    "\nFaites remonter le problème jumeau dans l'espace de travail de support avec le contexte actuel.",
  "digitalTwin.actions.evidenceLabel": "\nCapturer des preuves",
  "digitalTwin.actions.evidenceDescription":
    "\nOuvrez le flux de preuves de points chauds pour la scène jumelle active.",
  "reports.workspace.distributionTitle": "\nContrôles de distribution",
  "reports.workspace.distributionDescription":
    "\nGardez les approbations, les abonnements et la comparaison des versions visibles tout en vous déplaçant dans l'espace de travail du rapport.",
  "reports.workspace.distributionApprovals": "\nPosture d'approbation",
  "reports.workspace.distributionApprovalsValue":
    "\n{count} pack(s) enregistré(s) restent disponibles pour approbation ou réutilisation.",
  "reports.workspace.distributionSubscriptions": "\nPosture d'abonnement",
  "reports.workspace.distributionSubscriptionsValue":
    "\nLes itinéraires modèles {count} restent disponibles pour une distribution répétée.",
  "reports.workspace.distributionCompare": "\nComparaison des versions",
  "reports.workspace.distributionCompareHistory":
    "\nLa vue historique est prête pour la chronologie et la comparaison des packs enregistrés.",
  "reports.workspace.distributionCompareReview":
    "\nVérifiez le pack actif avant de promouvoir la prochaine version distribuée.",
  "mlops.governance.title": "\nGouvernance MLOps",
  "mlops.governance.description":
    "Suivez les étapes de promotion, la pression des risques et l'impact de l'automatisation à côté de l'espace de travail MLOps en direct.",
  "mlops.governance.riskRegister":
    "\n{count} les éléments d'ensemble de données ayant échoué ou hors ligne appartiennent actuellement au registre des risques.",
  "mlops.governance.promotionGate":
    "\n{count} les portes de promotion de déploiement sont actuellement actives.",
  "tasks.dependency.title": "\nDépendances",
  "tasks.dependency.description": "\nGérer les bloqueurs de tâches et les tâches associées.",
  "tasks.dependency.blockedBy": "\nBloqué par",
  "tasks.dependency.blocking": "\nBlocage",
  "tasks.dependency.add": "\nAjouter une dépendance",
  "tasks.dependency.remove": "\nSupprimer la dépendance",
  "tasks.dependency.circularError": "\nImpossible de créer une dépendance circulaire.",
  "tasks.dependency.type.blocks": "\nBlocs",
  "tasks.dependency.type.related": "\nConnexe",
  "tasks.dependency.empty": "\nAucune dépendance configurée.",
  "tasks.dependency.blockedBadge": "\nBloqué",
  "tasks.dependency.selectTask": "\nSélectionnez une tâche",
  "tasks.dependency.selectTaskHint": "\nRechercher par étiquette de tâche ou ID.",
  "tasks.comments.title": "\nActivité et commentaires",
  "tasks.comments.description": "\nFil de discussion et journal d'activité pour cette tâche.",
  "tasks.comments.placeholder": "\nAjouter un commentaire...",
  "tasks.comments.submit": "\nPublier un commentaire",
  "tasks.comments.empty": "\nPas encore de commentaires. Démarrez la conversation.",
  "tasks.comments.postedBy": "\nPublié par {author}",
  "tasks.timeTracking.title": "\nSuivi du temps",
  "tasks.timeTracking.description": "\nEnregistrez le temps passé sur cette tâche.",
  "tasks.timeTracking.logTime": "\nHeure d'enregistrement",
  "tasks.timeTracking.minutes": "\nMinutes",
  "tasks.timeTracking.minutesHint": "\nDurée en minutes.",
  "tasks.timeTracking.descriptionLabel": "\nDescription",
  "tasks.timeTracking.descriptionHint": "\nBrève note sur le travail effectué.",
  "tasks.timeTracking.date": "\nDate",
  "tasks.timeTracking.dateHint": "\nDate à laquelle les travaux ont été effectués.",
  "tasks.timeTracking.totalLogged": "\nTotal connecté",
  "tasks.timeTracking.totalLoggedDesc": "\nSomme de toutes les entrées de temps pour cette tâche.",
  "tasks.timeTracking.entries": "\nEntrées de temps",
  "tasks.timeTracking.empty": "\nAucune heure n'a encore été enregistrée.",
  "tasks.timeTracking.durationHoursMinutes": "\n{hours}h {minutes}m",
  "tasks.timeTracking.durationMinutesOnly": "\n{minutes}m",
  "tasks.timeTracking.submitAria": "\nSoumettre l'entrée de temps",
  "workOrders.templates.title": "\nModèles de bons de travail",
  "workOrders.templates.description":
    "\nModèles réutilisables pour les types d’ordres de travail récurrents.",
  "workOrders.templates.create": "\nCréer un modèle",
  "workOrders.templates.useTemplate": "\nUtiliser le modèle",
  "workOrders.templates.defaultLines": "\nÉléments de campagne par défaut",
  "workOrders.templates.defaultSla": "\nSLA par défaut (heures)",
  "workOrders.templates.empty":
    "\nAucun modèle disponible. Créez-en un pour accélérer la création des bons de travail.",
  "workOrders.templates.titleLabel": "\nNom du modèle",
  "workOrders.templates.titleHint": "\nUn nom descriptif court pour le modèle.",
  "workOrders.templates.descriptionLabel": "\nDescription",
  "workOrders.templates.descriptionHint":
    "\nDescription facultative indiquant quand utiliser ce modèle.",
  "workOrders.templates.scopeLabel": "\nPortée",
  "workOrders.templates.scopeHint":
    "\nPortée de travail par défaut pour les commandes de ce modèle.",
  "workOrders.templates.selectTemplate": "\nSélectionnez un modèle",
  "workOrders.templates.selectTemplateHint":
    "\nChoisissez un modèle pour pré-remplir les champs du bon de travail.",
  "workOrders.templates.submitAria": "\nEnregistrer le modèle de bon de travail",
  "addDevice.review.title": "\nExaminez avant de soumettre",
  "addDevice.review.description":
    "\nConfirmez la configuration, la posture d'importation et les détails d'enregistrement finaux avant de créer l'appareil.",
  "addDevice.review.items.setup":
    "\nVérifiez la configuration de l'appareil et le contexte du site de déploiement.",
  "addDevice.review.items.import":
    "\nConfirmez les champs importés et toutes les valeurs par défaut générées.",
  "addDevice.review.items.confirm":
    "\nApprouvez la charge utile d’enregistrement finale pour soumission.",
  "addDevice.review.pending": "\nEn attente d'examen",
  "addDevice.presets.title": "\nBibliothèque de préréglages",
  "addDevice.presets.description":
    "\nUtilisez des modèles de démarrage pour les modèles de déploiement courants avant de créer ou d'importer des appareils.",
  "addDevice.presets.apply": "\nAppliquer le préréglage",
  "addDevice.presets.template": "\nModèle",
  "addDevice.presets.baseline.title": "\nDéploiement de base des appareils",
  "addDevice.presets.baseline.description":
    "Commencez par le modèle d'enregistrement opérationnel par défaut avec les champs standard d'actifs et de télémétrie.",
  "addDevice.presets.fieldKit.title": "\nDéploiement du kit de terrain",
  "addDevice.presets.fieldKit.description":
    "\nUtilisez une configuration prête à l'emploi pour les appareils portables qui nécessitent une attribution de site et une révision d'importation rapides.",
  "addDevice.presets.capital.title": "\nAdmission d'immobilisations",
  "addDevice.presets.capital.description":
    "\nÉchelonner les défauts liés au financement pour les appareils de plus grande valeur qui nécessitent un cycle de vie et un suivi de la valeur plus stricts.",
  "addDevice.workflow.stepSetup": "\nConfiguration",
  "addDevice.workflow.stepImport": "\nImporter",
  "addDevice.workflow.stepReview": "\nAvis",
  "deviceHistory.review.title": "\nRéviser la posture",
  "deviceHistory.review.description":
    "\nComparez l'historique récent, le contexte de l'anomalie et la position d'exportation avant de transmettre le suivi des événements.",
  "deviceHistory.review.diffTitle": "\nModifier l'avis",
  "deviceHistory.review.diffDescription":
    "\nSuivez la dernière configuration ou le delta du cycle de vie avant d'accepter la mise à jour.",
  "deviceHistory.review.diffValue": "\nDernière différence dans la portée",
  "deviceHistory.review.anomalyTitle": "\nSurveillance des anomalies",
  "deviceHistory.review.anomalyDescription":
    "\nGardez visibles les cycles de vie ou les modèles de maintenance inhabituels pour un suivi rapide.",
  "deviceHistory.review.anomalyValue": "\nExamen des anomalies prêt",
  "deviceHistory.review.exportTitle": "\nExportation de preuves",
  "deviceHistory.review.exportDescription":
    "\nRegroupez l'historique filtré et l'état de révision dans un rapport ou un transfert CSV.",
  "deviceHistory.review.openReports": "\nOuvrir des rapports",
  "deviceHistory.review.raiseFollowUp": "\nAugmenter le suivi",
  "documentDetail.section.activityTitle": "\nActivité connexe",
  "documentDetail.section.activityDescription":
    "\nGardez visibles les derniers mouvements, les enregistrements liés et le contexte opérationnel en aval.",
  "documentDetail.section.nextDecisionTitle": "\nDécision suivante",
  "documentDetail.section.nextDecisionDescription":
    "\nFaites apparaître la prochaine étape commerciale ou opérationnelle avant de modifier l'état du flux de travail.",
  "documentDetail.section.signoffTitle": "\nApprobation et approbation",
  "documentDetail.section.signoffDescription":
    "\nGardez les approbations, la position de signature et les preuves à l’appui visibles dans un seul rail.",
  "documentWorkspace.role.procurement": "\nApprovisionnement",
  "documentWorkspace.section.discrepancyTitle": "\nRésolution des écarts",
  "documentWorkspace.section.discrepancyDescription":
    "\nSuivez les écarts, les exceptions et les activités de suivi avant la fermeture de l'enregistrement.",
  "documentWorkspace.section.nextDecisionTitle": "\nDécision suivante",
  "documentWorkspace.section.nextDecisionDescription":
    "\nGardez la prochaine approbation, le déménagement commercial ou le transfert de l'opérateur visible dans l'espace de travail.",
  "documentWorkspace.section.receiptTitle": "\nRéception et admission",
  "documentWorkspace.section.receiptDescription":
    "\nSurveillez les preuves reçues, la confirmation d'admission et toutes les lacunes restantes dans les reçus.",
  "documentWorkspace.section.slaTitle": "\nMontre SLA",
  "documentWorkspace.section.slaDescription":
    "\nSurveillez les fenêtres de service, les minuteries et toute pression de rupture en attente provenant du même rail.",
  "layout.analysisCanvas.leftRail": "\nFiltres",
  "layout.analysisCanvas.stage": "\nContenu principal",
  "layout.analysisCanvas.rightRail": "\nDétails",
  "common.view": "\nVoir",
  "training.view.library": "\nBibliothèque",
  "training.view.enrollments": "\nInscriptions",
  "training.library.title": "\nBibliothèque de cours",
  "training.library.description": "\nGérer les cours de formation disponibles et les modules.",
  "training.library.titleColumn": "\nTitre",
  "training.library.durationColumn": "\nDurée",
  "training.library.modulesColumn": "\nModules",
  "training.library.enrollmentsColumn": "\nInscriptions",
  "training.library.empty": "\nAucun cours disponible.",
  "training.library.mandatory": "\nObligatoire",
  "training.library.optional": "\nFacultatif",
  "training.enrollment.description":
    "\nSuivez la progression de tous les cours obligatoires et optional.",
  "training.enrollment.learnerColumn": "\nApprenant",
  "training.enrollment.courseColumn": "\nCours",
  "training.enrollment.completed": "\nTerminé",
  "training.enrollment.notStarted": "\nNon démarré",
  "training.enrollment.title": "\nSuivi des inscriptions",
  "training.enrollment.empty": "\nAucune inscription trouvée.",

  // Commerce – cart
  "cart.browseProducts": "Parcourir les produits",
  "cart.category": "Catégorie",
  "cart.clearCart": "Vider le panier",
  "cart.empty": "Le panier est vide",
  "cart.emptyDescription":
    "Votre panier est vide. Parcourez notre catalogue pour ajouter des articles.",
  "cart.emptyTitle": "Aucun article dans le panier",
  "cart.items": "articles",
  "cart.itemCount": "{count} article(s)",
  "cart.loadError": "Impossible de charger le panier. Veuillez réessayer.",
  "cart.loading": "Chargement du panier",
  "cart.poNumber": "Numéro de BC",
  "cart.poNumberPlaceholder": "Entrez le numéro de bon de commande",
  "cart.proceedToCheckout": "Passer à la caisse",
  "cart.product": "Produit",
  "cart.quantity": "Quantité",
  "cart.removeItem": "Retirer {name}",
  "cart.saveCart": "Enregistrer le panier",
  "cart.summary": "Récapitulatif de commande",
  "cart.title": "Panier",
  "cart.total": "Total",
  "cart.unitPrice": "Prix unitaire",
  "cart.updateQuantity": "Mettre à jour la quantité pour {name}",
  "cart.lineItemsTableAria": "Lignes du panier",

  // Commerce – checkout
  "checkout.backToCart": "Retour au panier",
  "checkout.billingInformation": "Informations de facturation",
  "checkout.items": "Articles de la commande",
  "checkout.noShippingAddresses": "Aucune adresse de livraison disponible.",
  "checkout.notes": "Notes de commande",
  "checkout.notesPlaceholder": "Ajoutez des instructions spéciales ou des notes",
  "checkout.orderSummary": "Récapitulatif de commande",
  "checkout.placeOrder": "Passer la commande",
  "checkout.poNumber": "Numéro de BC",
  "checkout.poNumberPlaceholder": "Entrez le numéro de bon de commande",
  "checkout.paymentMethod": "Mode de paiement",
  "checkout.shippingAddress": "Adresse de livraison",
  "checkout.step.billing": "Facturation",
  "checkout.step.cart": "Panier",
  "checkout.step.confirm": "Confirmer",
  "checkout.step.review": "Vérifier",
  "checkout.step.shipping": "Livraison",
  "checkout.subtitle": "Vérifiez votre commande et finalisez votre achat.",
  "checkout.title": "Paiement",
  "checkout.total": "Total",

  // Commerce – approvals and inventory
  "commerce.approvals.title": "Approbations",
  "commerce.approvals.subtitle":
    "Examinez les décisions en attente et auditez les approbations terminées.",
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
  "commerce.buyingLists.title": "Listes d'achat",
  "commerce.buyingLists.shared": "Partagée",
  "commerce.buyingLists.itemCount": "{count} articles",
  "commerce.buyingLists.emptyTitle": "Pas encore de listes d'achat",
  "commerce.buyingLists.emptyDescription":
    "Créez une liste d'achat pour rassembler des lignes catalogue avant le paiement.",
  "commerce.buyingLists.subtitle":
    "Regroupez des lignes catalogue et transférez-les vers le panier lorsque vous êtes prêt.",
  "commerce.buyingLists.createNew": "Créer une liste",
  "commerce.buyingLists.detail.eyebrow": "Liste d'achat",
  "commerce.buyingLists.detail.shellTitle": "Liste d'achat",
  "commerce.buyingLists.detail.notFoundTitle": "Liste d'achat introuvable",
  "commerce.buyingLists.detail.notFoundDescription":
    "Cette liste n'existe pas ou vous n'y avez pas accès.",
  "commerce.buyingLists.detail.tableCaption": "Lignes de la liste d'achat",
  "commerce.buyingLists.detail.col.product": "Produit",
  "commerce.buyingLists.detail.col.sku": "SKU",
  "commerce.buyingLists.detail.col.quantity": "Qté",
  "commerce.buyingLists.detail.col.unitPrice": "Prix unitaire",
  "commerce.buyingLists.detail.col.lineTotal": "Total ligne",
  "commerce.buyingLists.detail.convertToCart": "Envoyer la liste au panier",
  "commerce.buyingLists.detail.emptyRows":
    "Cette liste ne contient encore aucune ligne. Ajoutez des produits depuis le catalogue.",
  "commerce.cart.title": "Panier",
  "commerce.checkout.title": "Paiement",
  "commerce.inventory.title": "Inventaire",
  "commerce.inventory.subtitle":
    "Surveillez les niveaux de stock, les alertes de stock faible et les actions de réapprovisionnement.",

  "commerce.workspace.operationsLead":
    "Outils d’achats et de catalogue dans votre espace de travail.",
  "commerce.workspace.cartLead":
    "Vérifiez les lignes du panier, les quantités et les totaux avant le paiement.",
  "commerce.workspace.buyingListDetailLead":
    "Examinez les lignes préparées et envoyez la liste au panier lorsque vous êtes prêt.",
  "commerce.workspace.productDetailLead":
    "Spécifications, tarification et disponibilité pour cet article du catalogue.",

  // Commerce – compliance
  "commerce.compliance.contract": "Contrat",
  "commerce.compliance.contractTooltip": "Acheté à des prix contractuels",
  "commerce.compliance.offContract": "Hors contrat",
  "commerce.compliance.offContractWithCatalog": "Hors contrat ({catalogType})",

  // Commerce – fulfilment
  "commerce.fulfilment.blindFulfilment": "Exécution à l'aveugle",
  "commerce.fulfilment.blindFulfilmentDescription":
    "Masquer les détails du fournisseur sur les bordereaux de livraison et les documents d'expédition.",
  "commerce.fulfilment.configDescription":
    "Configurez l'exécution à l'aveugle et les règles d'emballage pour ce partenaire.",
  "commerce.fulfilment.configTitle": "Configuration de l'exécution",
  "commerce.fulfilment.packagingRules": "Règles d'emballage",
  "commerce.fulfilment.saveConfig": "Enregistrer la configuration",
  "commerce.fulfilment.toggleBlind": "Basculer l'exécution à l'aveugle",

  // Commerce – orders (customer order history list)
  "commerce.orders.date": "Date",
  "commerce.orders.emptyDescription":
    "Lorsque vous passez des commandes, elles apparaissent ici avec le statut et les totaux.",
  "commerce.orders.emptyTitle": "Aucune commande pour le moment",
  "commerce.orders.filterBarDescription":
    "Les résultats se mettent à jour après une courte pause de saisie. Utilisez « Effacer tous les filtres » pour réinitialiser la liste.",
  "commerce.orders.filterBarEyebrow": "Filtres",
  "commerce.orders.filterBarTitle": "Rechercher des commandes",
  "commerce.orders.filteredEmptyDescription":
    "Essayez d'autres mots-clés ou effacez les filtres pour voir toutes les commandes.",
  "commerce.orders.filteredEmptyTitle": "Aucun résultat ne correspond à vos filtres",
  "commerce.orders.items": "Articles",
  "commerce.orders.orderNumber": "Commande",
  "commerce.orders.reorder": "Commander à nouveau",
  "commerce.orders.resultCount": "{count} commandes",
  "commerce.orders.search": "Rechercher",
  "commerce.orders.searchLabel": "Rechercher des commandes",
  "commerce.orders.searchPlaceholder": "Rechercher par numéro de commande…",
  "commerce.orders.status": "Statut",
  "commerce.orders.subtitle":
    "Consultez les achats passés, les totaux et recommandez en un seul endroit.",
  "commerce.orders.tableLabel": "Historique des commandes",
  "commerce.orders.title": "Historique des commandes",
  "commerce.orders.total": "Total",
  "commerce.orders.view": "Voir la commande",

  // Commerce – knowledge base
  "commerce.knowledgeBase.categoryLegend": "Catégories",
  "commerce.knowledgeBase.emptyDescription":
    "Parcourez des guides et réponses rédigés pour les partenaires et les opérations.",
  "commerce.knowledgeBase.emptyTitle": "Aucun article pour le moment",
  "commerce.knowledgeBase.filterBarDescription":
    "Les résultats se mettent à jour après une courte pause de saisie. Les catégories restent actives jusqu'à ce que vous choisissiez « Tous » ou « Effacer tous les filtres ».",
  "commerce.knowledgeBase.filterBarEyebrow": "Filtres",
  "commerce.knowledgeBase.filterBarTitle": "Rechercher des articles",
  "commerce.knowledgeBase.filteredEmptyDescription":
    "Essayez d'autres mots-clés, une autre catégorie ou effacez tous les filtres.",
  "commerce.knowledgeBase.filteredEmptyTitle": "Aucun résultat ne correspond à vos filtres",
  "commerce.knowledgeBase.loadingArticles": "Chargement des articles",
  "commerce.knowledgeBase.resultCount": "{count} articles",
  "commerce.knowledgeBase.search": "Rechercher",
  "commerce.knowledgeBase.searchLabel": "Rechercher des articles",
  "commerce.knowledgeBase.searchPlaceholder": "Rechercher dans les titres et les étiquettes…",
  "commerce.knowledgeBase.subtitle":
    "Trouvez des guides produits, des politiques et des articles pratiques.",
  "commerce.knowledgeBase.title": "Base de connaissances",
  "commerce.knowledgeBase.views": "vues",

  // Commerce – products
  "commerce.products.addToCart": "Ajouter au panier",
  "commerce.products.allProducts": "Tous les produits",
  "commerce.products.availability": "Disponibilité",
  "commerce.products.categories": "Catégories",
  "commerce.products.categoryNav": "Navigation par catégorie de produits",
  "commerce.products.customerPartNumber": "Référence client",
  "commerce.products.days": "jours",
  "commerce.products.description": "Description",
  "commerce.products.emptyDescription":
    "Essayez d'ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.",
  "commerce.products.emptyTitle": "Aucun produit trouvé",
  "commerce.products.imageGallery": "Galerie d'images du produit",
  "commerce.products.inStock": "en stock",
  "commerce.products.leadTime": "Délai de livraison",
  "commerce.products.loadingProducts": "Chargement des produits",
  "commerce.products.minOrderQty": "Quantité minimale de commande",
  "commerce.products.noSearchResults": "Aucun résultat trouvé pour « {query} ».",
  "commerce.products.noStockInfo":
    "Les informations de stock ne sont pas disponibles pour ce produit.",
  "commerce.products.notFound": "Produit non trouvé",
  "commerce.products.notFoundDescription":
    "Le produit que vous recherchez n'existe pas ou a été supprimé.",
  "commerce.products.pricing": "Tarification",
  "commerce.products.quantity": "Quantité",
  "commerce.products.relatedProducts": "Produits similaires",
  "commerce.products.search": "Rechercher",
  "commerce.products.searchLabel": "Rechercher des produits",
  "commerce.products.searchPlaceholder": "Rechercher des produits...",
  "commerce.products.searchResults": "Résultats de recherche",
  "commerce.products.specifications": "Spécifications",
  "commerce.products.subtitle": "Parcourez notre catalogue de produits.",
  "commerce.products.filterBarEyebrow": "Filtres",
  "commerce.products.filterBarTitle": "Rechercher dans le catalogue",
  "commerce.products.filterBarDescription":
    "\nLes résultats se mettent à jour après une courte pause de saisie. La catégorie reste appliquée jusqu'à ce que vous choisissiez Tous les produits ou Effacer tous les filtres.",
  "commerce.products.title": "Produits",
  "commerce.products.unitOfMeasure": "Unité de mesure",
  "commerce.products.viewAllResults": "Voir les {count} résultats",
  "commerce.products.viewDetails": "Voir les détails",

  // Commerce – reseller
  "commerce.reseller.blindFulfillment": "Exécution à l'aveugle",
  "commerce.reseller.contactSupport": "Contacter le support",
  "commerce.reseller.refreshOrders": "Actualiser l’historique des commandes",
  "commerce.reseller.refreshInvoices": "Actualiser les factures",
  "commerce.reseller.dashboardDescription":
    "Gérez votre profil de revendeur et suivez les performances.",
  "commerce.reseller.dashboardTitle": "Tableau de bord revendeur",
  "commerce.reseller.date": "Date",
  "commerce.reseller.discount": "Remise",
  "commerce.reseller.discountRate": "Taux de remise",
  "commerce.reseller.freightEligible": "Éligible au fret",
  "commerce.reseller.invoiceNumber": "Facture n°",
  "commerce.reseller.invoices": "Factures",
  "commerce.reseller.invoicesEmptyDescription":
    "Les factures apparaissent ici lorsque vous recevez des documents facturables.",
  "commerce.reseller.invoicesEmptyTitle": "Aucune facture pour le moment",
  "commerce.reseller.invoicesTableAria": "Factures revendeur",
  "commerce.reseller.onboarded": "Intégré",
  "commerce.reseller.orderHistory": "Historique des commandes",
  "commerce.reseller.orderNumber": "Commande n°",
  "commerce.reseller.ordersEmptyDescription":
    "Les commandes apparaissent ici après les avoir passées via le portail.",
  "commerce.reseller.ordersEmptyTitle": "Aucune commande pour le moment",
  "commerce.reseller.ordersTableAria": "Historique des commandes revendeur",
  "commerce.reseller.profileInfo": "Informations du profil",
  "commerce.reseller.status": "Statut",
  "commerce.reseller.tier": "Niveau",
  "commerce.reseller.total": "Total",
  "commerce.reseller.partyName": "Partenaire",
  "commerce.reseller.blind": "Exécution à l'aveugle",
  "commerce.reseller.freight": "Fret",
  "commerce.reseller.volumeThreshold": "Seuil de volume",
  "commerce.reseller.actions": "Actions",
  "commerce.reseller.adminTitle": "Administration des revendeurs",
  "commerce.reseller.adminDescription":
    "Consultez les niveaux partenaires, les options d'exécution et l'état d'intégration.",
  "commerce.reseller.createProfile": "Créer un profil revendeur",
  "commerce.reseller.totalResellers": "Revendeurs au total",
  "commerce.reseller.activeResellers": "Revendeurs actifs",
  "commerce.reseller.noResellers": "Aucun profil revendeur ne correspond au filtre actuel.",
  "commerce.reseller.profilesTableAria": "Profils revendeur",

  // Commerce – spending limits
  "commerce.spending.active": "Actif",
  "commerce.spending.addLimit": "Ajouter une limite de dépenses",
  "commerce.spending.annually": "Annuellement",
  "commerce.spending.currency": "Devise",
  "commerce.spending.delete": "Supprimer",
  "commerce.spending.edit": "Modifier",
  "commerce.spending.emptyDescription":
    "Configurez des limites de dépenses pour contrôler les budgets d'achat par rôle.",
  "commerce.spending.emptyTitle": "Aucune limite de dépenses configurée",
  "commerce.spending.inactive": "Inactif",
  "commerce.spending.limit": "Limite",
  "commerce.spending.limitAmount": "Montant de la limite",
  "commerce.spending.monthly": "Mensuel",
  "commerce.spending.period": "Période",
  "commerce.spending.quarterly": "Trimestriel",
  "commerce.spending.role": "Rôle",
  "commerce.spending.saveLimit": "Enregistrer la limite",
  "commerce.spending.selectRole": "Sélectionner un rôle",
  "commerce.spending.status": "Statut",
  "commerce.spending.subtitle":
    "Gérez les limites de dépenses et les budgets pour les rôles d'approvisionnement.",
  "commerce.spending.limitsTableAria": "Limites de dépenses",
  "commerce.spending.title": "Limites de dépenses",
  "commerce.spending.user": "Utilisateur",

  // Commerce – three-way match
  "commerce.threeWayMatch.discrepanciesFound": "Écarts trouvés",
  "commerce.threeWayMatch.discrepancy": "Écart",
  "commerce.threeWayMatch.discrepancyCount": "{count} écart(s)",
  "commerce.threeWayMatch.invoiceTotal": "Total facture",
  "commerce.threeWayMatch.invoiceUnitPrice": "Prix unitaire facture",
  "commerce.threeWayMatch.invoicedQty": "Qté facturée",
  "commerce.threeWayMatch.matched": "Concordant",
  "commerce.threeWayMatch.ok": "OK",
  "commerce.threeWayMatch.poQty": "Qté BC",
  "commerce.threeWayMatch.poTotal": "Total BC",
  "commerce.threeWayMatch.poUnitPrice": "Prix unitaire BC",
  "commerce.threeWayMatch.product": "Produit",
  "commerce.threeWayMatch.shipmentTotal": "Total expédition",
  "commerce.threeWayMatch.shippedQty": "Qté expédiée",
  "commerce.threeWayMatch.subtitle": "Rapprochement triple pour le BC {poNumber}.",
  "commerce.threeWayMatch.title": "Rapprochement triple",
  "commerce.threeWayMatch.viewPO": "Voir le BC",

  // Commerce – usage reports
  "commerce.usageReports.dateFrom": "Date de début",
  "commerce.usageReports.dateTo": "Date de fin",
  "commerce.usageReports.emptyDescription":
    "Exécutez un rapport pour afficher les données d'utilisation des achats.",
  "commerce.usageReports.export": "Exporter",
  "commerce.usageReports.filterLabel": "Filtres du rapport d'utilisation",
  "commerce.usageReports.grandTotal": "Total général",
  "commerce.usageReports.groupBy": "Grouper par",
  "commerce.usageReports.groupLabel": "Groupe",
  "commerce.usageReports.orderCount": "Commandes",
  "commerce.usageReports.runReport": "Exécuter le rapport",
  "commerce.usageReports.subtitle": "Analysez les habitudes d'achat et les dépenses par catégorie.",
  "commerce.usageReports.title": "Rapports d'utilisation",
  "commerce.usageReports.totalQuantity": "Qté totale",
  "commerce.usageReports.totalSpend": "Dépenses totales",

  // Common – additional keys
  "common.breadcrumb": "Fil d'Ariane",

  /* ── API error messages ──────────────────────────────────── */
  "errors.unauthorized": "Non autorisé",
  "errors.cartNotFound": "Panier introuvable",
  "errors.articleNotFound": "Article introuvable",
  "errors.resellerProfileNotFound": "Profil de revendeur introuvable",
  "errors.tenantNotFound": "Locataire introuvable",
  "errors.deploymentNotFound": "Déploiement introuvable",
  "errors.schemaMigrationGovernance":
    "La condition de gouvernance des migrations de schéma n’a pas été remplie.",
  "errors.deploymentMigrationGate":
    "Déploiement refusé : chaque migration de schéma listée doit être terminée avec un approbateur.",
  "errors.configVersionNotFound": "Version de configuration introuvable.",
  "errors.promotedDirectly": "Promu directement (aucune passerelle configurée).",
  "errors.noActiveConfigVersion": "Aucune version de configuration active à restaurer.",
  "errors.targetVersionAlreadyActive": "La version cible est déjà active.",
  "errors.approvalNotFound": "Approbation introuvable ou non en attente.",
  "errors.noActiveCatalogItem":
    "Le produit n'a aucun article de catalogue actif pour cette partie.",
  "errors.noResultsFound": "Aucun résultat trouvé",
  "errors.dsarNotFound": "Demande de la personne concernée introuvable.",
  "errors.dsarExportInvalidStatus":
    "L'exportation ne peut être préparée que pour les demandes en brouillon ou soumises.",
  "errors.dsarPurgeInvalidStatus":
    "La purge ne peut s’exécuter qu’après approbation de la demande pour purge.",

  /* ── Success messages ────────────────────────────────────── */
  "success.promotionApproved": "Promotion approuvée.",
  "success.configVersionActivated": "Version de configuration activée.",
  "success.shipmentCreated": "Expédition créée.",

  /* ── Labels ──────────────────────────────────────────────── */
  "labels.savings.automation": "Automatisation",
  "labels.savings.inventory": "Inventaire",

  /* ── Commerce ────────────────────────────────────────────── */
  "commerce.quickOrder.exampleSkus": "SKU-001 x 10\nSKU-002 x 5\nSKU-003 x 25",

  "commerce.customerOrders.title": "Commandes clients",
  "commerce.customerOrders.subtitle": "Suivez commandes ouvertes, montants et statut de livraison.",
  "commerce.customerOrders.action.browseCatalog": "Parcourir le catalogue",
  "commerce.customerOrders.action.viewOrder": "Voir commande",
  "commerce.customerOrders.search": "Rechercher commandes",
  "commerce.customerOrders.searchLabel": "Recherche commandes clients",
  "commerce.customerOrders.searchPlaceholder": "Rechercher par numéro de commande ou client",
  "commerce.customerOrders.tableCaption": "Commandes clients",
  "commerce.customerOrders.listRegionLabel": "Résultats commandes",
  "commerce.customerOrders.col.id": "Commande",
  "commerce.customerOrders.col.customer": "Client",
  "commerce.customerOrders.col.status": "Statut",
  "commerce.customerOrders.col.amount": "Montant",
  "commerce.customerOrders.col.date": "Mis à jour",
  "commerce.customerOrders.pagination.count": "{start}\u2013{end} sur {count} commandes",
  "commerce.customerOrders.empty.title": "Pas encore de commandes",
  "commerce.customerOrders.empty.description":
    "Les commandes catalogue/devis apparaissent après validation.",
  "commerce.customerOrders.empty.cta": "Actualiser la liste",
  "commerce.customerOrders.error.title": "Chargement des commandes impossible",
  "commerce.customerOrders.error.retry": "Réessayer",
  "commerce.customerOrders.detail.eyebrow": "Commande client",
  "commerce.customerOrders.detail.summaryLabel": "Synthèse commande",
  "commerce.customerOrders.detail.stat.status": "Statut",
  "commerce.customerOrders.detail.attributesLabel": "Détails",
  "commerce.customerOrders.detail.attributesTitle": "Attributs commande",
  "commerce.customerOrders.detail.fieldset.identity": "Identité et client",
  "commerce.customerOrders.detail.fieldset.schedule": "Planification",
  "commerce.customerOrders.detail.lineItemsLabel": "Lignes",
  "commerce.customerOrders.detail.lineItemsTitle": "Produits commandés",
  "commerce.customerOrders.detail.lineItemsEmpty": "Pas de lignes pour cette commande.",
  "commerce.customerOrders.detail.lineItemsTableCaption": "Lignes de commande",
  "commerce.customerOrders.detail.col.description": "Libellé",
  "commerce.customerOrders.detail.col.qty": "Qté",
  "commerce.customerOrders.detail.col.total": "Total ligne",
  "commerce.customerOrders.detail.historyLabel": "Activité",
  "commerce.customerOrders.detail.historyTitle": "Chronologie commande",
  "commerce.customerOrders.detail.timelineEmpty": "Pas encore d’évènements.",
  "commerce.customerOrders.detail.action.editOrder": "Modifier commande",
  "commerce.customerOrders.detail.action.deleteOrder": "Supprimer commande",

  "commerce.rfqs.title": "Demandes de devis",
  "commerce.rfqs.subtitle": "Suivez le volume RFQ, propriétaires et relances clients.",
  "commerce.rfqs.action.createRequest": "RFQ publique",
  "commerce.rfqs.action.viewRequest": "Voir demande",
  "commerce.rfqs.search": "Rechercher demandes",
  "commerce.rfqs.searchLabel": "Rechercher RFQ",
  "commerce.rfqs.searchPlaceholder": "N°, titre ou client",
  "commerce.rfqs.tableCaption": "Demandes de devis",
  "commerce.rfqs.listRegionLabel": "Résultats RFQ",
  "commerce.rfqs.col.id": "Demande",
  "commerce.rfqs.col.name": "Intitulé",
  "commerce.rfqs.col.customer": "Client",
  "commerce.rfqs.col.status": "Statut",
  "commerce.rfqs.col.amount": "Budget",
  "commerce.rfqs.col.date": "Demandé",
  "commerce.rfqs.pagination.count": "{start}\u2013{end} sur {count} demandes",
  "commerce.rfqs.empty.title": "Pas encore de RFQ",
  "commerce.rfqs.empty.description": "Les demandes envoyées depuis le catalogue apparaissent ici.",
  "commerce.rfqs.empty.cta": "Actualiser la liste",
  "commerce.rfqs.error.title": "Chargement RFQ impossible",
  "commerce.rfqs.error.retry": "Réessayer",
  "commerce.rfqs.detail.eyebrow": "Demande de devis",
  "commerce.rfqs.detail.summaryLabel": "Synthèse RFQ",
  "commerce.rfqs.detail.stat.status": "Statut",
  "commerce.rfqs.detail.attributesLabel": "Détails",
  "commerce.rfqs.detail.attributesTitle": "Attributs RFQ",
  "commerce.rfqs.detail.fieldset.identity": "Identité et client",
  "commerce.rfqs.detail.fieldset.schedule": "Planification",
  "commerce.rfqs.detail.lineItemsLabel": "Lignes",
  "commerce.rfqs.detail.lineItemsTitle": "Postes demandés",
  "commerce.rfqs.detail.lineItemsEmpty": "Aucune ligne sur cette demande.",
  "commerce.rfqs.detail.lineItemsTableCaption": "Lignes RFQ",
  "commerce.rfqs.detail.col.description": "Libellé",
  "commerce.rfqs.detail.col.qty": "Qté",
  "commerce.rfqs.detail.col.unitPrice": "Prix unitaire",
  "commerce.rfqs.detail.historyLabel": "Activité",
  "commerce.rfqs.detail.historyTitle": "Chronologie RFQ",
  "commerce.rfqs.detail.timelineEmpty": "Pas encore d’évènements.",
  "commerce.rfqs.detail.action.editRequest": "Modifier demande",
  "commerce.rfqs.detail.action.deleteRequest": "Supprimer demande",

  /* ── Form aria-labels ──────────────────────────────────── */
  "forms.checkout.paymentMethod": "Sélectionner le mode de paiement",
  "forms.punchout.partyName": "Nom du partenaire",
  "forms.punchout.protocol": "Sélectionner le protocole",
  "forms.quickOrder.csvFile": "Fichier CSV",
  "forms.spending.role": "Sélectionner le rôle",
  "forms.spending.limitAmount": "Montant de la limite",
  "forms.spending.currency": "Devise",
  "forms.spending.period": "Sélectionner la période",
  "forms.usageReports.groupBy": "Grouper par",
  "forms.warehouse.name": "Nom de l'entrepôt",
  "forms.warehouse.code": "Code de l'entrepôt",
  "forms.warehouse.type": "Sélectionner le type d'entrepôt",
  "forms.warehouse.site": "Site de l'entrepôt",

  /* ── Additional errors ─────────────────────────────────── */
  "errors.faqNotFound": "FAQ introuvable",

  /* ── UI standards (audit) ──────────────────────────────── */
  "common.undo": "Annuler",
  "common.moreActions": "Plus d’actions",
  "common.required": "requis",
  "common.submitting": "Envoi…",
  "common.saving": "Enregistrement…",
  "common.bulkActionBar": "Barre d’actions groupées",
  "common.dismissNotification": "Fermer la notification",
  "public.catalog.index.gridTitle": "Tracks de service",
  "public.catalog.index.empty.title": "Aucun track de service pour l’instant",
  "public.catalog.index.empty.description":
    "Les tracks de service apparaîtront ici dès leur publication.",
  "public.catalog.card.cardLabel": "Voir le track de service {title}",
  "public.home.catalog.cardLabel": "Voir {title}",
  "public.products.empty.title": "Aucun produit ne correspond à votre recherche",
  "public.products.empty.description": "Essayez un autre mot-clé ou effacez les filtres actifs.",
  "public.products.empty.clear": "Effacer la recherche",
  "public.products.card.cardLabel": "Voir le produit {name}",
  "rfq.form.submitting": "Envoi…",
  "rfq.form.eyebrow": "Demander un devis",
  "rfq.form.pageDescription": "Décrivez vos besoins — nous répondons sous un jour ouvré.",
  "rfq.thanks.returnToCatalog": "Retour au catalogue",
  "rfq.draft.title": "Brouillons de RFQ",
  "rfq.draft.description": "Reprenez un brouillon pour terminer votre demande.",
  "assistant.stream.live": "Messages de la conversation",
  "assistant.empty.title": "Démarrer la conversation",
  "assistant.empty.description":
    "Posez une question sur le périmètre, la livraison ou les conditions commerciales.",
  "assistant.error.disconnected.title": "Connexion perdue",
  "assistant.error.disconnected.description":
    "Le flux de la conversation est déconnecté. La page se reconnectera automatiquement.",
  "digital.twin.unsupported.title": "Votre navigateur ne prend pas en charge la 3D",
  "digital.twin.unsupported.description":
    "Passez à un navigateur moderne ou activez WebGL pour voir le jumeau numérique.",
  "admin.dsar.purgeConfirm.title": "Purger l’enregistrement de la personne concernée ?",
  "admin.dsar.purgeConfirm.description":
    "Cela supprimera définitivement toutes les données liées à {subject}. Cette action est irréversible.",
  "admin.dsar.purgeConfirm.action": "Purger les données",
  "admin.user.deleteConfirm.title": "Supprimer l’utilisateur ?",
  "admin.user.deleteConfirm.description":
    "Tous les accès de {user} seront révoqués et ses données personnelles supprimées. Irréversible.",
  "admin.user.deleteConfirm.action": "Supprimer l’utilisateur",
  "admin.tenant.suspendConfirm.title": "Suspendre le tenant ?",
  "admin.tenant.suspendConfirm.description":
    "Tous les membres de {tenant} perdront leur accès immédiatement. Vous pourrez réactiver plus tard.",
  "admin.tenant.suspendConfirm.action": "Suspendre le tenant",
  "admin.config.promoteConfirm.title": "Promouvoir la configuration vers {env} ?",
  "admin.config.promoteConfirm.description":
    "La configuration sélectionnée sera activée dans {env}. Les valeurs existantes seront archivées.",
  "admin.config.promoteConfirm.action": "Promouvoir la configuration",
  "profile.security.session.revokeConfirm.title": "Révoquer la session ?",
  "profile.security.session.revokeConfirm.description":
    "La session sélectionnée sera immédiatement déconnectée sur son appareil.",
  "profile.security.session.revokeConfirm.action": "Révoquer la session",
  "profile.security.passkey.deleteConfirm.title": "Supprimer le passkey ?",
  "profile.security.passkey.deleteConfirm.description":
    "Vous ne pourrez plus vous connecter avec ce passkey. Vous pouvez en enregistrer un nouveau à tout moment.",
  "profile.security.passkey.deleteConfirm.action": "Supprimer le passkey",
  "tasks.kanban.moveTo": "Déplacer vers {status}",
  "cart.toast.removed": "Article retiré du panier",
  "support.replyForm.legend": "Répondre au ticket",
  "governance.generated.warning": "Cet artefact est généré. Modifiez plutôt la source canonique.",
  "commerce.product.relatedHeading": "Produits associés",
  "common.a11y.toggleSidebar": "Basculer la barre latérale",
  "common.a11y.toggleTheme": "Basculer le thème",
  "common.a11y.mainNavigation": "Navigation principale",
  "common.a11y.topNavigation": "Barre supérieure",
  "common.a11y.openProfileMenu": "Ouvrir le menu du profil",
  "common.actions.settings": "Paramètres",
  "common.actions.logout": "Se déconnecter",
  "hub.notifications.navbarTitle": "Notifications",
  "nav.ecosystemSection": "Écosystème",
} satisfies I18nDictionary<EnKey>;

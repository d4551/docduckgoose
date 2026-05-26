import type { EnKey, I18nDictionary } from "./en";

/** IT translation dictionary generated from the English source. */
export const it = {
  "app.name": "Piattaforma operativa",
  "app.tagline": "\nIntelligenza operativa degli asset",
  "layout.brand": "\nConsole operativa",
  "layout.appHeader": "Intestazione dell'applicazione",
  "layout.mobileNav": "Navigazione mobile principale",
  "layout.sync": "\nSincronizza",
  "layout.toggleTheme": "\nAttiva/disattiva modalità colore",
  "layout.authChromeNav": "\nNavigazione accesso",
  "layout.toggleDarkMode": "\nAttiva/disattiva la modalità oscura",
  "layout.userMenu": "\nMenù utente",
  "layout.userMenuOpen": "\nApri il menu utente per {name}",
  "layout.signOut": "\nEsci",
  "layout.language": "\nLingua",
  "layout.languageMenu": "\nMenù lingua",
  "layout.languageDescription": "\nCambia lingua di visualizzazione",
  "layout.languageCurrent": "\nLingua corrente: {language}",
  "layout.languageSelectAria": "\nCambia lingua in {language}",
  "layout.languageSaved": "\nLingua aggiornata.",
  "layout.releaseStage": "\nBuild pre-rilascio",
  "layout.footerNav": "\nNavigazione piè di pagina",
  "layout.footerTagline":
    "\nSuperfici operative rese dal server per intelligence sugli asset, flusso di manutenzione e visibilità transazionale.",
  "layout.footerThemeNote": "\nSistema di temi {brandName}",
  "layout.footerCopyright": "\nCopyright © 2026 {brandName}",
  "layout.logoAlt": "Piattaforma operativa",
  "roles.admin": "\nAmministratore",
  "roles.estateManager": "\nDirettore immobiliare",
  "roles.maintenanceLead": "\nResponsabile manutenzione",
  "roles.fieldTechnician": "\nTecnico sul campo",
  "roles.financeOfficer": "\nResponsabile finanziario",
  "roles.unknown": "\nOperatore",
  "admin.systemCounters": "\nContatori di sistema",
  "admin.createAdmin.databaseRequired":
    "\nImposta DATABASE_URL prima di eseguire lo script di bootstrap di amministrazione.",
  "admin.createAdmin.credentialsRequired":
    "\nImposta CREATE_ADMIN_EMAIL e CREATE_ADMIN_PASSWORD prima di eseguire lo script bootstrap di amministrazione.",
  "admin.createAdmin.updatedRole": "\nUtente esistente {email} aggiornato al ruolo ADMIN.",
  "admin.createAdmin.createdUser": "\nUtente amministratore creato: {email}",
  "common.summary": "\nRiepilogo",
  "common.applyFilters": "\nApplica filtri",
  "common.userFallback": "\nOperatore",
  "common.moreInfo": "\nUlteriori informazioni",
  "common.moreInfoFor": "\nUlteriori informazioni su {subject}",
  "addDevice.form.submitAria": "\nInvia registrazione dispositivo",
  "layout.mobileNavigation": "\nNavigazione mobile",
  "layout.headerNavigation": "\nNavigazione dell'intestazione",
  "layout.sidebarNavigation": "\nNavigazione principale",
  "nav.dashboard": "Cruscotto",
  "nav.assets": "\nRisorse",
  "nav.section.core": "\nNucleo",
  "nav.section.assets": "\nRisorse",
  "nav.section.account": "\nConto",
  "nav.section.operations": "\nOperazioni",
  "nav.section.insights": "\nApprofondimenti",
  "nav.section.finance": "\nFinanza",
  "nav.section.documents": "\nDocumenti",
  "nav.section.admin": "\nAmministrazione",
  "nav.section.home": "\nCasa",
  "nav.section.operate": "\nAziona",
  "nav.section.monitor": "\nMonitor",
  "nav.section.plan": "\nPiano",
  "nav.section.commercial": "\nCommerciale",
  "nav.section.procurement": "\nApprovvigionamento",
  "nav.section.control": "\nControllo",
  "nav.predictions": "\nPronostici",
  "nav.tasks": "\nCompiti",
  "nav.finance": "\nFinanza",
  "nav.financePlanning": "\nPianificazione finanziaria",
  "nav.estate": "\nImmobiliare",
  "nav.portfolio": "\nPortafoglio",
  "nav.rfqs": "\nRichieste di offerta",
  "nav.customerOrders": "\nOrdini cliente",
  "nav.workOrders": "\nOrdini di lavoro",
  "nav.purchaseOrders": "\nOrdini di acquisto",
  "nav.invoices": "\nFatture",
  "nav.fleet": "\nFlotta",
  "nav.buildings": "\nEdifici",
  "nav.sensors": "\nSensori",
  "nav.reports": "\nRapporti",
  "nav.aiPlayground": "Playground IA",
  "nav.agentic": "Agentico",
  "nav.agenticStorage": "Archiviazione agentica",
  "app.nav.git": "Aree di lavoro",
  "app.nav.repos": "Repository ospitati",
  "app.nav.activity": "Attività di preparazione al lancio",
  "registry.nav.publish": "Pubblica pacchetti",
  "nav.sandbox": "Autorizzazioni sandbox",
  "nav.utilisation": "\nUtilizzo",
  "nav.admin": "Amministrazione",
  "nav.digitalTwin": "\nGemello digitale",
  "nav.openSidebar": "\nApri la barra laterale",
  "nav.closeSidebar": "\nChiudi barra laterale",
  "nav.skipToContent": "\nPassa al contenuto principale",
  "nav.breadcrumb": "\nPangrattato",
  "nav.breadcrumbTruncated": "Altro",
  "nav.profile": "\nProfilo",
  "nav.customisation": "\nPersonalizzazione",
  "nav.kanban": "\nKanban",
  "nav.addDevice": "\nAggiungi dispositivo",
  "nav.deviceHistory": "\nCronologia dispositivo",
  "nav.userRole": "\nRuolo utente",
  "locale.option.en": "\nInglese",
  "locale.option.de": "\nTedesco",
  "locale.option.fr": "\nFrancese",
  "locale.option.es": "\nSpagnolo",
  "locale.option.it": "\nItaliano",
  "locale.option.pt": "\nPortoghese",
  "public.meta.description":
    "\nUna piattaforma per l'acquisizione della domanda pubblica, documenti commerciali, visibilità dei partner, guida AI, reporting e commercio assistito da macchine.",
  "public.nav.home": "\nCasa",
  "public.nav.catalog": "\nCatalogo",
  "public.nav.requestQuote": "\nRichiedi preventivo",
  "public.nav.startRfq": "\nAvvia richiesta di offerta",
  "public.nav.signIn": "\nAccedi",
  "public.assistant.breadcrumb.session": "\nSessione assistente",
  "public.assistant.breadcrumb.transcript": "\nTrascrizione",
  "public.footer.description":
    "\nAssunzione del pubblico, controllo commerciale, visibilità dei partner, guida dell'intelligenza artificiale, reporting e automazione per operazioni basate su documenti.",
  "public.footer.rfq": "Richiesta di preventivo (RFQ)",
  "public.footer.portalSignIn": "\nAccesso al portale",
  "public.page.catalog": "\nCatalogo",
  "public.page.requestQuote": "\nRichiedi preventivo",
  "public.page.rfqSubmitted": "\nRichiesta di offerta inviata",
  "public.assistant.panel.eyebrow": "\nAssistente pubblico",
  "public.assistant.panel.formAria": "\nAvvia una sessione dell'assistente pubblico",
  "public.assistant.panel.titleLabel": "\nTitolo della sessione",
  "public.assistant.panel.descriptionLabel": "\nRichiesta sessione",
  "public.assistant.panel.titleHint":
    "\nUtilizza un'etichetta breve che corrisponda all'ambito del servizio o alla richiesta in preparazione.",
  "public.assistant.panel.descriptionHint":
    "Riepilogare ambito, tempistica, approvazioni e vincoli di consegna che l'assistente dovrebbe preservare.",
  "public.assistant.panel.titlePlaceholder":
    "\nEsempio: pianificazione dell'affidabilità degli asset",
  "public.assistant.panel.descriptionPlaceholder":
    "\nEsempio: acquisire l'ambito del sito, le date richieste, le dipendenze e i trigger di escalation prima dell'invio della richiesta di offerta.",
  "public.assistant.panel.helpText":
    "\nCiò crea una sessione dell'assistente pubblico per il contesto della pagina corrente.",
  "public.assistant.panel.launchError":
    "\nImpossibile avviare la sessione dell'assistente. Esamina il contesto corrente e riprova.",
  "public.assistant.panel.submit": "\nAvvia sessione assistente",
  "public.assistant.catalog.title": "\nAssistente catalogo",
  "public.assistant.catalog.description":
    "\nUtilizza i dettagli del catalogo corrente come contesto, quindi passa alla sessione dell'assistente pubblico.",
  "public.assistant.rfq.title": "\nAssistente RFQ",
  "public.assistant.rfq.description":
    "\nCrea una sessione dell'assistente pubblico con il contesto della pagina RFQ prima dell'invio della richiesta.",
  "public.assistant.rfq.prompt":
    "\nAcquisisci il contesto della richiesta, chiarisci l'ambito e prepara il trasferimento pubblico.",
  "public.assistant.rfq.bundlePrompt":
    "\nAcquisisci il contesto della richiesta in bundle per {services}, chiarisci l'ambito e prepara il trasferimento pubblico.",
  "public.assistant.started.description":
    "\nLa sessione dell'assistente pubblico è pronta. Continua a perfezionare la richiesta con lo stesso contesto.",
  "public.assistant.started.openAction": "\nApri sessione",
  "public.assistant.started.sessionLabel": "\nID sessione pubblica",
  "public.assistant.started.restartAction": "\nInizia un'altra sessione",
  "public.assistant.started.nextStepsTitle": "\nPassaggi successivi",
  "public.assistant.started.nextStep.session":
    "\nContinua la sessione dal vivo per acquisire chiarimenti e preservare il contesto dell'acquirente.",
  "public.assistant.started.nextStep.context":
    "\nTorna alla pagina corrente quando è necessario aggiornare l'ambito, i dettagli della richiesta di offerta o il contesto del catalogo.",
  "public.assistant.started.nextStep.handoff":
    "\nEffettuare l'escalation all'interno della sessione quando è richiesta la revisione dell'operatore o un trasferimento pubblico.",
  "public.assistant.workspace.eyebrow": "\nSessione dell'assistente pubblico",
  "public.assistant.workspace.summaryTitle": "\nRiepilogo sessione",
  "public.assistant.workspace.sessionBadge": "\nSessione dal vivo",
  "public.assistant.workspace.sessionIdLabel": "\nID sessione",
  "public.assistant.workspace.contextLabel": "\nContesto catturato",
  "public.assistant.workspace.messageCountLabel": "\nMessaggi catturati",
  "public.assistant.workspace.participantCountLabel": "\nPartecipanti",
  "public.assistant.workspace.linkedRecordCountLabel": "\nRecord collegati",
  "public.assistant.workspace.sameThreadLabel": "\nModello filettatura",
  "public.assistant.workspace.sameThreadValue": "\nThread singolo persistente",
  "public.assistant.workspace.completenessLabel": "\nCompletezza",
  "public.assistant.workspace.completenessReady": "\nPronto per la consegna commerciale",
  "public.assistant.workspace.completenessNeedsWork":
    "\nAcquisisci più ambito prima del trasferimento",
  "public.assistant.workspace.historyTitle": "\nCronologia sessioni",
  "public.assistant.workspace.historyStartedTitle": "\nConversazione iniziata",
  "public.assistant.workspace.historyStartedEmpty": "\nIn attesa del primo messaggio catturato.",
  "public.assistant.workspace.historyStartedDescription":
    "\nIl primo messaggio con ambito è stato acquisito alle {timestamp}.",
  "public.assistant.workspace.historyLatestTitle": "\nUltimo aggiornamento",
  "public.assistant.workspace.historyLatestEmpty": "\nNessun follow-up è stato ancora registrato.",
  "public.assistant.workspace.historyLatestDescription":
    "\n{author} ha pubblicato l'ultimo aggiornamento su {timestamp}.",
  "public.assistant.workspace.historyTranscriptTitle": "\nCopertura della trascrizione",
  "public.assistant.workspace.historyTranscriptDescription":
    "Le voci della trascrizione {count} sono disponibili per l'esportazione e la revisione.",
  "public.assistant.workspace.historyParticipantsTitle": "\nContinuità partecipante",
  "public.assistant.workspace.historyParticipantsDescription":
    "\nI profili dei partecipanti {participants} sono allegati allo stesso thread persistente.",
  "public.assistant.workspace.historyShareTitle": "\nRecord condiviso",
  "public.assistant.workspace.historyShareEmpty":
    "\nNessuna richiesta di offerta o record di catalogo correlato è ancora collegato.",
  "public.assistant.workspace.historyShareDescription":
    "\nCollegato a {record} per il prossimo trasferimento del flusso di lavoro.",
  "public.assistant.workspace.historyCloseoutTitle": "\nDisponibilità alla chiusura",
  "public.assistant.workspace.historyCloseoutReady":
    "\nLa sessione ha un contesto sufficiente per essere esportata, condivisa e instradata nel flusso di lavoro successivo.",
  "public.assistant.workspace.historyCloseoutPending":
    "\nAcquisisci un po' più di ambito o collegamento prima di considerare questa sessione come pronta per il trasferimento.",
  "public.assistant.workspace.exportTranscript": "\nEsporta trascrizione",
  "public.assistant.transcript.documentTitle": "\nTrascrizione dell’assistente",
  "public.assistant.transcript.eyebrow": "\nAssistente pubblico",
  "public.assistant.transcript.description":
    "\nCronologia completa dei messaggi per questa sessione. Usa il browser per stampare o salvare come PDF.",
  "public.assistant.transcript.backToConversation": "\nTorna alla conversazione",
  "public.assistant.transcript.fallbackTitle": "\nSessione {id}",
  "public.assistant.transcript.tableAria": "\nTrascrizione della conversazione",
  "public.assistant.transcript.colTime": "\nOra",
  "public.assistant.transcript.colAuthor": "\nAutore",
  "public.assistant.transcript.colMessage": "\nMessaggio",
  "public.assistant.transcript.emptyTitle": "\nNessun messaggio ancora",
  "public.assistant.transcript.emptyDescription":
    "\nI messaggi compaiono qui quando l’assistente registra risposte in questa sessione.",
  "public.assistant.transcript.notFoundTitle": "\nSessione non disponibile",
  "public.assistant.transcript.notFoundDescription":
    "\nImpossibile caricare questa conversazione. Potrebbe essere scaduta o il link non è corretto.",
  "public.assistant.workspace.shareSummary": "\nCondividi riepilogo",
  "public.assistant.workspace.shareHistoryHint":
    "\nCondividi il riepilogo del thread o esporta la trascrizione prima di spostare l'assunzione in un flusso di lavoro a valle.",
  "public.assistant.workspace.shareSubject": "\nRiepilogo dell'assistente pubblico: {title}",
  "public.assistant.workspace.continuityTitle": "\nIstantanea di continuità",
  "public.assistant.workspace.continuityDescription":
    "\nMantieni visibili il contesto della sessione live, i record collegati e l'ultima risposta prima del trasferimento.",
  "public.assistant.workspace.continuityContextLabel": "\nContesto pagina",
  "public.assistant.workspace.continuityParticipantsValue": "\n{count} partecipante/i",
  "public.assistant.workspace.continuityContextFallback":
    "\nNessun contesto di pagina è ancora allegato a questa sessione dell'assistente pubblico.",
  "public.assistant.workspace.continuityLinkedLabel": "\nRecord collegati",
  "public.assistant.workspace.continuityLinkedValue": "\n{count} record collegati",
  "public.assistant.workspace.continuityLatestLabel": "\nUltima risposta",
  "public.assistant.workspace.continuityLatestValue": "\n{author} ha risposto a {timestamp}.",
  "public.assistant.workspace.handoffTitle": "\nCome funziona il trasferimento",
  "public.assistant.workspace.handoffDescription":
    "\nUtilizza questa sessione per acquisire l'ambito, chiarire i requisiti e passare alle operazioni quando è necessaria una revisione commerciale.",
  "public.assistant.workspace.stepCaptureTitle": "\nAmbito di cattura",
  "public.assistant.workspace.stepCaptureDescription":
    "\nMantieni l'ambito, le date, le approvazioni e i vincoli dell'acquirente nella stessa sessione persistente.",
  "public.assistant.workspace.stepClarifyTitle": "\nChiarisci con AI",
  "public.assistant.workspace.stepClarifyDescription":
    "\nUtilizza riepiloghi e risposte per restringere la richiesta senza perdere il contesto del thread esistente.",
  "public.assistant.workspace.stepEscalateTitle": "\nInoltra in modo pulito",
  "public.assistant.workspace.stepEscalateDescription":
    "\nCrea una nota di passaggio quando la sessione è pronta per la revisione da parte dell'operatore interno.",
  "public.assistant.workspace.composeDescription":
    "\nAggiungi note durevoli sulla sessione in modo che ambito, tempi di consegna e approvazioni rimangano collegati allo stesso thread di assunzione.",
  "public.assistant.workspace.composeHint":
    "\nAcquisisci qui il contesto dell'acquirente prima di richiedere un trasferimento da parte dell'operatore.",
  "public.assistant.workspace.aiActionsDescription":
    "\nUtilizza i riepiloghi per rendere più serrato il thread e le note di trasferimento per intensificare l'assunzione del pubblico nelle operazioni.",
  "public.assistant.workspace.returnAction": "\nRitorna alla pagina di origine",
  "public.assistant.workspace.missingTitle": "\nSessione dell'assistente pubblico non disponibile",
  "public.assistant.workspace.missingDescription":
    "Impossibile caricare la sessione dell'assistente richiesta. Torna ai dettagli del catalogo o alla pagina RFQ per iniziare una nuova sessione.",
  "public.catalog.card.track": "\nPista di servizio",
  "public.catalog.card.viewScope": "\nVisualizza ambito",
  "public.catalog.card.requestQuote": "\nRichiedi preventivo",
  "public.catalog.card.deliverables": "deliverable",
  "public.home.page.title":
    "\nUna piattaforma per l'acquisizione della domanda, il controllo della consegna e la visibilità dei partner.",
  "public.home.page.description": "\n{brandName} trasforma richieste sparse in ordini tracciati.",
  "public.home.hero.badge": "\nSito pubblico, operazioni, portale, AI e UCP",
  "public.home.hero.title":
    "\nTrasforma richieste, ordini, lavoro sul campo, approvvigionamento e reporting in un unico flusso operativo connesso.",
  "public.home.hero.description":
    "\nInviato giovedì, approvato venerdì, tracciato fino alla fatturazione.",
  "public.home.hero.primaryCta": "\nAvvia una richiesta di offerta",
  "public.home.hero.secondaryCta": "\nSfoglia le soluzioni",
  "public.home.hero.stat.documents": "\nTipi di documento",
  "public.home.hero.stat.documentsValue": "6",
  "public.home.hero.stat.surfaces": "\nSuperfici",
  "public.home.hero.stat.surfacesValue": "4",
  "public.home.hero.stat.surfacesDesc": "Web, API, portale, UCP",
  "public.home.hero.stat.database": "\nSpazi di lavoro",
  "public.home.hero.stat.databaseValue": "3",
  "public.home.hero.stat.databaseDesc": "Ops, commercio, portale",
  "public.home.delivery.eyebrow": "\nModello di consegna",
  "public.home.delivery.title": "\nTra virgolette, ambito, visibile ai partner.",
  "public.home.delivery.step.submit": "\nInvia richiesta di offerta",
  "public.home.delivery.step.qualify": "\nQualifica e preventivo",
  "public.home.delivery.step.convert": "\nConverti in ordine",
  "public.home.delivery.step.track": "\nTieni traccia dell'esecuzione e della fatturazione",
  "public.home.map.aria": "\nRiepilogo delle funzionalità della piattaforma",
  "public.home.map.intake.title": "\nAspirazione",
  "public.home.map.intake.value": "\nSito pubblico e UCP",
  "public.home.map.intake.description":
    "\nAcquisisci richieste da acquirenti, partner e flussi di pagamento assistiti da macchine.",
  "public.home.map.documents.title": "\nDocumenti",
  "public.home.map.documents.value": "\nRichieste di offerta per fatture",
  "public.home.map.documents.description":
    "\nMantieni prezzi, approvazioni, evasione, approvvigionamento e fatturazione in un unico percorso documentale.",
  "public.home.map.operations.title": "\nOperazioni",
  "public.home.map.operations.value": "\nRisorse, lavoro e telemetria",
  "public.home.map.operations.description":
    "\nDispiegare squadre, monitorare attività, acquisire completamento.",
  "public.home.map.intelligence.title": "\nIntelligenza",
  "public.home.map.intelligence.value": "\nIA, automazione e ML",
  "public.home.map.intelligence.description":
    "\nRiepiloghi IA, azioni programmate, previsioni di carenza.",
  "public.home.flow.eyebrow": "\nFlusso aziendale",
  "public.home.flow.title": "\nCome si muove il lavoro attraverso la piattaforma",
  "public.home.flow.description":
    "\n{brandName} mantiene l'acquisizione della domanda, la distribuzione, la visibilità dei partner e le azioni di follow-up sullo stesso record invece di reinserire il lavoro attraverso strumenti disconnessi.",
  "public.home.flow.step.capture.label": "\nCattura",
  "public.home.flow.step.capture.content":
    "\nI clienti, i partner o i client macchina iniziano con il contesto di catalogo, richiesta di offerta o pagamento UCP.",
  "public.home.flow.step.qualify.label": "\nQualificazione",
  "public.home.flow.step.qualify.content": "\nBloccare ambito, tempistiche e tariffe.",
  "public.home.flow.step.deliver.label": "\nConsegna",
  "public.home.flow.step.deliver.content": "\nOrdine di lavoro emesso, portale aggiornato.",
  "public.home.flow.step.improve.label": "\nMigliora",
  "public.home.flow.step.improve.content": "\nAvvisi, previsioni e punteggi di conformità.",
  "public.home.flow.card.eyebrow": "\nInizia esternamente, finisci con control",
  "public.home.flow.card.title":
    "\nInizia con l'esigenza aziendale, non con un altro modulo sconnesso.",
  "public.home.flow.card.description":
    "\nL'assunzione pubblica rimane connessa ai documenti successivi, alle prove di adempimento, agli aggiornamenti del portale e allo stato delle fatture.",
  "public.home.flow.card.cta": "\nAvvia una richiesta di offerta",
  "public.home.surfaces.eyebrow": "\nSuperfici della piattaforma",
  "public.home.surfaces.title": "\nUna piattaforma, quattro vie connesse in",
  "public.home.surfaces.description":
    "\nPubblici diversi utilizzano spazi di lavoro diversi, ma dipendono tutti dallo stesso record aziendale sottostante.",
  "public.home.surfaces.public.eyebrow": "\nPubblico",
  "public.home.surfaces.public.title": "\nSito pubblico e commercio automatico",
  "public.home.surfaces.public.description":
    "\nUtilizza le pagine del catalogo, l'assunzione di richieste di offerta e gli endpoint del commerciante UCP per avviare la domanda da parte di acquirenti o macchine.",
  "public.home.surfaces.commerce.eyebrow": "\nCommerciale",
  "public.home.surfaces.commerce.title": "\nControllo commerciale",
  "public.home.surfaces.commerce.description":
    "\nMantieni le richieste di offerta, gli ordini cliente, gli ordini di acquisto, gli ordini di lavoro e le fatture collegate invece di reinserirle negli strumenti.",
  "public.home.surfaces.operations.eyebrow": "\nOperazioni",
  "public.home.surfaces.operations.title": "\nConsegna operativa",
  "public.home.surfaces.operations.description":
    "\nGestisci risorse, attività, pianificazione, finanza, utilizzo, flotta, edifici, sensori e supervisione dei gemelli digitali.",
  "public.home.surfaces.portal.eyebrow": "\nPortale",
  "public.home.surfaces.portal.title": "\nVisibilità a livello di partner",
  "public.home.surfaces.portal.description":
    "\nOffri a clienti e partner visibilità condivisa dello stato e chat senza esporre l'intero spazio di lavoro interno.",
  "public.home.persona.eyebrow": "\nScegli il tuo punto di partenza",
  "public.home.persona.title": "\nIndirizza prima ciascun pubblico allo spazio di lavoro giusto",
  "public.home.persona.description":
    "\nGli acquirenti dovrebbero iniziare con l'acquisizione dell'ambito, gli operatori dovrebbero accedere all'area di lavoro di comando e i partner dovrebbero accedere al portale condiviso senza cercare schermate aggiuntive.",
  "public.home.persona.buyer.eyebrow": "\nAcquirente",
  "public.home.persona.buyer.title": "\nCattura un requisito e passa direttamente a RFQ",
  "public.home.persona.buyer.description": "\nSfogliare, confrontare e richiedere un preventivo.",
  "public.home.persona.buyer.action": "Inizia l'assunzione di acquirenti",
  "public.home.persona.operations.eyebrow": "\nOperatore",
  "public.home.persona.operations.title": "\nRitorna all'area di lavoro delle operazioni live",
  "public.home.persona.operations.description":
    "\nInviare, monitorare e confermare il completamento.",
  "public.home.persona.operations.action": "\nApri area di lavoro operazioni",
  "public.home.persona.partner.eyebrow": "\nPartner",
  "public.home.persona.partner.title": "\nAccedi al portale partner con l'account corretto",
  "public.home.persona.partner.description": "\nTracciare le consegne e scaricare le fatture.",
  "public.home.persona.partner.action": "\nApri accesso partner",
  "public.home.catalog.eyebrow": "\nCatalogo",
  "public.home.catalog.title": "\nPercorsi di servizio costruiti sullo stesso modello operativo",
  "public.home.catalog.description":
    "\nQueste offerte pubbliche mostrano come la piattaforma trasforma i movimenti di servizio comuni in una consegna controllata ed un'esecuzione visibile ai partner.",
  "public.home.catalog.seeAll": "\nVedi tutte le offerte",
  "public.home.catalog.compareTitle":
    "\nConfronta l’aderenza operativa prima di aprire un preventivo",
  "public.home.catalog.continuityTitle":
    "\nMantieni stabile la shortlist mentre la richiesta avanza",
  "public.home.catalog.fitLabel": "\nAderenza operativa",
  "public.home.intelligence.eyebrow": "\nLivello di intelligenza",
  "public.home.intelligence.title":
    "\nAI, reporting, automazione e ML rimangono collegati agli stessi record",
  "public.home.intelligence.description":
    "\nQueste capacità non sono prodotti o esportazioni separati. Utilizzano gli stessi ordini, lavoro, telemetria e contesto partner su cui già operano i team.",
  "public.home.intelligence.supportTitle": "\nCosa resta collegato allo stesso record",
  "public.home.intelligence.ai.eyebrow": "\nAssistente IA",
  "public.home.intelligence.ai.title":
    "\nL'intelligenza artificiale che funziona dal contesto aziendale",
  "public.home.intelligence.ai.description":
    "\nRiepiloga le richieste, spiega il contesto, confronta le attività correlate e aiuta i team a scegliere la fase operativa successiva.",
  "public.home.intelligence.reporting.eyebrow": "\nReporting e scienza dei dati",
  "public.home.intelligence.reporting.title": "\nReport e data science vicini all'esecuzione",
  "public.home.intelligence.reporting.description":
    "\nCrea pacchetti di report, revisioni operative, previsioni e visualizzazioni di anomalie senza spostare il lavoro in un secondo sistema.",
  "public.home.intelligence.automation.eyebrow": "\nAutomazione",
  "public.home.intelligence.automation.title": "\nAutomazione sullo stesso piano di controllo",
  "public.home.intelligence.automation.description":
    "\nAttiva flussi di lavoro nativi di Bun, follow-up pianificato e azioni supportate da ML dallo stesso piano di controllo.",
  "public.home.cta.title":
    "\nPronto a connettere assunzione, erogazione, reporting e visibilità dei partner?",
  "public.home.cta.description":
    "\nInizia con una richiesta di offerta se conosci già i requisiti oppure sfoglia il catalogo se desideri prima vedere le tracce del servizio.",
  "public.home.cta.primary": "\nAvvia una richiesta di offerta",
  "public.home.cta.secondary": "\nSfoglia le soluzioni",
  "public.catalog.index.eyebrow": "\nCatalogo",
  "public.catalog.index.title": "\nOfferte operative documentate",
  "public.catalog.index.description":
    "Scegli il percorso operativo più adatto ai requisiti immobiliari, del fornitore o del servizio, quindi avvia la richiesta di offerta con il contesto corretto.",
  "public.catalog.detail.eyebrow": "\nDettaglio catalogo",
  "public.catalog.detail.startRfq": "\nAvvia richiesta di offerta",
  "public.catalog.detail.backToCatalog": "\nTorna al catalogo",
  "public.catalog.detail.includedTitle": "\nCosa è incluso",
  "public.catalog.detail.whyTitle": "\nPerché RFQ-first",
  "public.catalog.detail.tab.scope": "\nAmbito",
  "public.catalog.detail.tab.approval": "\nApprovazione",
  "public.catalog.detail.tab.delivery": "\nConsegna",
  "public.catalog.detail.summaryTitle": "\nRiepilogo della decisione",
  "public.catalog.detail.summaryScopeValue": "\nAnalisi dell'ambito pronta",
  "public.catalog.detail.summaryApprovalValue": "\nRevisione commerciale allineata",
  "public.catalog.detail.summaryDeliveryValue": "\nTrasferimento preparato",
  "public.catalog.detail.shortlistLabel": "\nConfronta la postura",
  "public.catalog.detail.shortlistSelectedValue": "\nGià nella lista dei candidati",
  "public.catalog.detail.shortlistAvailableValue": "\nDisponibile per il confronto e il bundle",
  "public.catalog.detail.continuityLabel": "\nContinuità",
  "public.catalog.detail.continuityBundled": "\nRaggruppa questo servizio nella RFQ",
  "public.catalog.detail.continuitySingle": " condivisa\nRiporta questo servizio in un'unica RFQ",
  "public.catalog.detail.shareHistoryTitle": "\nCondividi e riporta",
  "public.catalog.detail.shareHistoryDescription":
    "\nMantieni visibile lo stesso contesto del servizio mentre esporti il brief, condividi il pacchetto e passi alla richiesta di offerta o al flusso di lavoro dell'assistente.",
  "public.catalog.detail.shareHistoryShortlistTitle": "\nPostura nella lista dei candidati",
  "public.catalog.detail.shareHistoryShortlistReady":
    "\nQuesto servizio è già presente nell'elenco dei candidati e può essere raggruppato nella RFQ condivisa.",
  "public.catalog.detail.shareHistoryShortlistSingle":
    "\nQuesto servizio può iniziare come una richiesta di offerta a servizio singolo ed espandersi successivamente senza perdere il contesto.",
  "public.catalog.detail.shareHistoryBriefTitle": "\nBreve esportazione",
  "public.catalog.detail.shareHistoryBriefDescription":
    "\nEsporta il brief quando i revisori interni necessitano del riepilogo del servizio prima dell'inizio della richiesta di offerta.",
  "public.catalog.detail.shareHistoryAssistantTitle": "\nTrasferimento dell'assistente",
  "public.catalog.detail.shareHistoryAssistantDescription":
    "\nUtilizza il percorso di lancio e bundle dell'assistente {href} per mantenere lo stesso contesto di servizio collegato all'assunzione successiva.",
  "public.catalog.detail.checklistScope": "\nConferma l'ambito operativo",
  "public.catalog.detail.checklistApproval": "\nAllinea prezzi e atteggiamento di approvazione",
  "public.catalog.detail.checklistHandoff":
    "\nInserisci il contesto nella richiesta di offerta o nella revisione dell'assistente",
  "public.catalog.detail.exportBrief": "\nEsporta brief",
  "public.catalog.detail.sharePack": "\nCondividi pacchetto",
  "public.catalog.detail.whyDescription":
    "\nLa richiesta di offerta acquisisce in anticipo l'ambito, i contatti dei clienti, le date richieste e il contesto commerciale, mantenendo gli ordini di lavoro e le fatture a valle ancorati allo stesso percorso documentale.",
  "public.catalog.compare.title": "\nSeleziona e confronta",
  "public.catalog.compare.description":
    "\nMantieni visibile un piccolo elenco di candidati attivi mentre confronti i percorsi di servizio, quindi trasferisci l'ambito selezionato in una richiesta di offerta in bundle.",
  "public.catalog.compare.shortlistLabel": "\nLista dei candidati in lavorazione",
  "public.catalog.compare.shortlistValue": "\n{count} servizi visibili",
  "public.catalog.compare.bundleLabel": "\nRiporto richiesta di offerta",
  "public.catalog.compare.bundleValue": "\nTrasferisci l'ambito selezionato in una richiesta",
  "public.catalog.compare.compareLabel": "\nModalità confronto",
  "public.catalog.compare.compareValue": "\nRivedi titolo, riepilogo ed evidenziazioni affiancati",
  "public.catalog.compare.continuityLabel": "\nPostura di continuità",
  "public.catalog.compare.continuityReady": "\nElenco pronto per RFQ in bundle",
  "public.catalog.compare.continuityWaiting": "Aggiungi prima i servizi all'elenco",
  "public.catalog.compare.continuityPanelTitle": "\nContinuità della lista ristretta",
  "public.catalog.compare.continuityPanelDescription":
    "\nL'elenco dei candidati segue lo stesso flusso di lavoro pubblico, pertanto il confronto del lavoro può continuare tra rivisitazione, accesso e riporto della richiesta di offerta.",
  "public.catalog.compare.continuityPersistTitle": "\nMantieni la lista",
  "public.catalog.compare.continuityPersistReady":
    "\nL'attuale lista dei candidati è già attiva e pronta per il confronto o il riporto della RFQ.",
  "public.catalog.compare.continuityPersistWaiting":
    "\nAggiungi il primo servizio per avviare l'elenco persistente per questo flusso di lavoro.",
  "public.catalog.compare.continuityMergeTitle": "\nUnisci all'accesso",
  "public.catalog.compare.continuityMergeDescription":
    "\nLe scelte anonime dell'elenco dei candidati vengono unite all'elenco dei candidati a cui è stato effettuato l'accesso quando lo stesso utente continua l'assunzione.",
  "public.catalog.compare.continuityBundleTitle": "\nFascio a valle",
  "public.catalog.compare.continuityBundleDescription":
    "\nTrasferisci i servizi selezionati in una RFQ invece di ricreare la decisione di confronto in un secondo momento.",
  "public.catalog.compare.progressTitle": "\nConfronta flusso di lavoro",
  "public.catalog.compare.progressDescription":
    "\nScegli l'elenco dei candidati, confronta le opzioni visibili, quindi raggruppa l'ambito selezionato nella RFQ.",
  "public.catalog.compare.workspaceHint":
    "\nEsamina ciascun servizio sulla stessa schermata prima di portarlo avanti.",
  "public.catalog.compare.stepShortlist": "\nLista selezionata",
  "public.catalog.compare.stepCompare": "\nConfronta",
  "public.catalog.compare.stepBundle": "\nRichiesta di offerta pacchetto",
  "public.catalog.compare.priceLabel": "\nPrezzo indicativo",
  "public.catalog.compare.bundleAction": "\nAmbito selezionato per il pacchetto",
  "public.catalog.compare.empty":
    "\nSeleziona qui i servizi per mantenere persistente la barra di confronto.",
  "public.catalog.shortlist.add": "\nAggiungi alla lista",
  "public.catalog.shortlist.remove": "\nRimuovi dalla lista",
  "public.rfq.eyebrow": "\nRichiesta di preventivo",
  "public.rfq.title": "\nCattura il lavoro prima che inizi.",
  "public.rfq.description":
    "\nInviare l'esigenza operativa una volta. Lo utilizziamo per qualificare l'ambito, valutare il lavoro e mantenere tracciabile la consegna dei partner fino all'adempimento.",
  "public.rfq.bundle.label": "\nServizi in bundle",
  "public.rfq.bundle.loaded": "\nAmbito in bundle caricato per {services}.",
  "public.rfq.bundle.returnToCatalog": "\nTorna all'ambito del catalogo in bundle",
  "public.rfq.bundle.summarySingle": "\nRichiedi un preventivo per {title}.",
  "public.rfq.bundle.summaryMultiple": "\nRichiedi un preventivo per l'ambito in bundle: {titles}.",
  "public.rfq.bundle.titleSingle": "\nRichiesta di offerta per {title}",
  "public.rfq.bundle.titleMultiple": "\nRichiesta di offerta per {primary} + {count} altro",
  "public.rfq.form.aria": "\nModulo richiesta preventivo",
  "public.rfq.form.title": "\nRichiedi titolo",
  "public.rfq.form.summary": "\nRiepilogo operativo",
  "public.rfq.form.contactEmail": "\nE-mail di contatto",
  "public.rfq.form.requestedBy": "\nRichiesto da",
  "public.rfq.form.budget": "\nIndicazioni sul budget",
  "public.rfq.form.requirements": "\nRequisiti o elementi pubblicitari",
  "public.rfq.form.requirementsPlaceholder": "\nUn requisito per riga",
  "public.rfq.submit": "\nInvia richiesta di offerta",
  "public.rfq.reviewCatalog": "\nConsulta il catalogo",
  "public.rfq.workspace.title": "\nArea di lavoro RFQ",
  "public.rfq.workspace.description":
    "\nCattura il riepilogo operativo, i dettagli dei requisiti e le tempistiche commerciali in un unico spazio di lavoro prima che la richiesta venga convertita a valle.",
  "public.rfq.workspace.fact.scopeLabel": "\nPostura del mirino",
  "public.rfq.workspace.fact.scopeValue": "\nBrief dell'acquirente in corso",
  "public.rfq.workspace.fact.responseLabel": "\nModello di risposta",
  "public.rfq.workspace.fact.responseValue": "Qualifica, preventivo e follow-up del portale",
  "public.rfq.workspace.draftTitle": "\nBozza dell'area di lavoro",
  "public.rfq.workspace.draftDescription":
    "\nQuesta richiesta di offerta rimane in bozza finché non la invii. Utilizza l'assistente e la revisione del catalogo per perfezionare prima il brief.",
  "public.rfq.workspace.draftStatusLabel": "\nStato bozza",
  "public.rfq.workspace.draftStatusValue": "\nBozza di lavoro",
  "public.rfq.workspace.resumeLabel": "\nRiprendi percorso",
  "public.rfq.workspace.resumeValue": "\nMantieni aperto lo stesso contesto della richiesta qui",
  "public.rfq.workspace.draftHint":
    "\nSalva qui la bozza, quindi torna allo stesso contesto della richiesta senza ricostruire l'assunzione.",
  "public.rfq.workspace.draftEmptyTitle": "Nessun campo compilato",
  "public.rfq.workspace.draftEmptyFields": "0 di 6 campi compilati",
  "public.rfq.workflow.progressLabel": "\nBozza di completamento",
  "public.rfq.workflow.progressValue": "\n{percent}% completato",
  "public.rfq.workflow.reviewStageLabel": "\nFase di revisione",
  "public.rfq.workflow.lastUpdatedLabel": "\nUltimo aggiornamento",
  "public.rfq.workflow.collaboratorHeading": "\nStato collaboratore",
  "public.rfq.workflow.collaboratorPending": "\nIn attesa del contatto collaboratore",
  "public.rfq.workflow.collaboratorValue": "\nRevisore: {email}",
  "public.rfq.workflow.supportTitle": "\nAtteggiamento di revisione e collaborazione",
  "public.rfq.workflow.supportDescription":
    "\nMantieni visibili la fase di revisione corrente, lo stato del collaboratore e l'ultimo aggiornamento della bozza prima dell'invio della richiesta.",
  "public.rfq.workflow.stage.capture": "\nAmbito di cattura",
  "public.rfq.workflow.stage.review": "\nRivedi bozza",
  "public.rfq.workflow.stage.ready": "\nPronto per l'invio",
  "public.rfq.workflow.historyTitle": "\nBozza di attività",
  "public.rfq.workflow.historyDescription":
    "\nGli aggiornamenti tracciati {count} mantengono la richiesta in una cronologia del flusso di lavoro condivisa.",
  "public.rfq.workflow.activity.placeholderTitle": "\nBozza iniziata",
  "public.rfq.workflow.activity.placeholderDescription":
    "\nMantieni qui il briefing dell'acquirente prima che diventi una richiesta di offerta inviata.",
  "public.rfq.workflow.activity.createdTitle": "\nBozza creata",
  "public.rfq.workflow.activity.createdDescription":
    "\n{actor} ha aperto {requestNumber} come bozza tracciata.",
  "public.rfq.workflow.activity.updatedTitle": "\nBozza aggiornata",
  "public.rfq.workflow.activity.updatedDescription":
    "\n{actor} ha spostato il brief in {progress} e {reviewStage}.",
  "public.rfq.workflow.systemActor": "\nFlusso di lavoro del sistema",
  "public.rfq.draft.save": "\nSalva bozza",
  "public.rfq.draft.saved": "\nBozza salvata {requestNumber}.",
  "public.rfq.draft.loaded": "\nBozza ripresa {requestNumber}.",
  "public.rfq.draft.resumeReady": "\nRiprendi il brief dell'acquirente salvato qui",
  "public.rfq.draft.fallbackTitle": "\nBozza della richiesta di offerta pubblica",
  "public.rfq.draft.error.empty": "\nAggiungi almeno un campo prima di salvare una bozza.",
  "public.rfq.workspace.checklist.summaryTitle": "\nRiepilogare l'esigenza operativa",
  "public.rfq.workspace.checklist.summaryDescription":
    "\nDescrivi l'obiettivo commerciale, i siti interessati e l'urgenza in modo che la valutazione inizi con il giusto contesto aziendale.",
  "public.rfq.workspace.checklist.requirementsTitle":
    "\nAggiungi requisiti e dettagli dell'elemento pubblicitario",
  "public.rfq.workspace.checklist.requirementsDescription":
    "\nElenca vincoli, quantità e allegati prima che la richiesta venga prezzata o convertita in lavoro.",
  "public.rfq.workspace.checklist.handoffTitle": "\nPreparare il trasferimento a valle",
  "public.rfq.workspace.checklist.handoffDescription":
    "\nMantieni i contatti, le date e le indicazioni sul budget nello stesso record in modo che il team successivo non ricominci l'assunzione.",
  "public.rfq.next.title": "\nCosa succede dopo",
  "public.rfq.next.step.qualify": "\nRevisione della qualifica e dell'idoneità del sito",
  "public.rfq.next.step.convert": "\nConversione preventivo, ordine e ordine di lavoro",
  "public.rfq.next.step.portal": "\nAggiornamenti del portale partner fino al completamento",
  "public.rfq.workspace.stepDraft": "\nBozza",
  "public.rfq.workspace.stepReview": "\nRecensione",
  "public.rfq.workspace.stepSubmit": "\nInvia",
  "public.rfq.workspace.stepPortal": "\nTrasferimento del portale",
  "public.rfq.thanks.alert":
    "\nLa richiesta di offerta {requestNumber} è stata inviata correttamente.",
  "public.rfq.thanks.title": "La tua richiesta è in fase di valutazione.",
  "public.rfq.thanks.description":
    "\nConservare il numero di riferimento per il follow-up. Se il tuo team riceve un invito al portale, la stessa richiesta verrà visualizzata nella cronologia dei documenti condivisi.",
  "public.rfq.thanks.returnCatalog": "\nTorna al catalogo",
  "public.rfq.thanks.submitAnother": "\nInvia un'altra richiesta di offerta",
  "public.rfq.thanks.pending": "\nIn sospeso",
  "public.rfq.thanks.nextTitle": "\nContinua la richiesta senza perdere il contesto",
  "public.rfq.thanks.nextDescription":
    "\nInvita collaboratori, continua a spostare i file di supporto e instrada lo stesso numero di richiesta nella conversazione successiva invece di avviare una seconda assunzione.",
  "public.rfq.thanks.collaborate": "\nInvita collaboratori",
  "public.rfq.thanks.collaborationSubject": "\nEsamina la richiesta di offerta {requestNumber}",
  "public.rfq.thanks.collaborationBody":
    "\nLa richiesta di offerta {requestNumber} è pronta per la revisione. Si prega di continuare la stessa richiesta invece di iniziare una nuova assunzione.",
  "public.catalog.assetReliability.title": "\nProgrammi di affidabilità degli asset",
  "public.catalog.assetReliability.summary":
    "\nManutenzione pianificata, valutazione delle criticità ed esecuzione del ciclo di vita per siti distribuiti.",
  "public.catalog.assetReliability.detail":
    "\nUnisci la pianificazione dell'affidabilità, l'esecuzione degli ordini di lavoro e il reporting in un unico ritmo operativo per le proprietà e le squadre sul campo.",
  "public.catalog.assetReliability.highlight1":
    "\nAudit di affidabilità e modellazione del backlog",
  "public.catalog.assetReliability.highlight2":
    "\nPianificazione degli ordini di lavoro sito per sito",
  "public.catalog.assetReliability.highlight3": "\nProve di completamento e reporting di recupero",
  "public.catalog.procureToPay.title": "\nOperazioni Procure-to-Pay",
  "public.catalog.procureToPay.summary":
    "\nFlussi di lavoro per richieste di offerta, ordini di acquisto, ricevute e fatturazione con visibilità dei partner.",
  "public.catalog.procureToPay.detail":
    "\nSposta l'approvvigionamento da eventi isolati al controllo dei documenti in base al fornitore con cronologia di approvazioni, ricevute e fatturazione.",
  "public.catalog.procureToPay.highlight1":
    "\nOnboarding del fornitore e coordinamento della richiesta di offerta",
  "public.catalog.procureToPay.highlight2":
    "\nMonitoraggio del ciclo di vita dell'ordine di acquisto",
  "public.catalog.procureToPay.highlight3":
    "\nVisibilità su ricevute, fatturazione e tempi di consegna",
  "public.catalog.fieldServices.title": "\nServizi sul campo basati su documenti",
  "public.catalog.fieldServices.summary":
    "\nOrdini cliente, ordini di lavoro, fatture e aggiornamenti del portale da un grafico operativo condiviso.",
  "public.catalog.fieldServices.detail":
    "\nTrasforma i requisiti in entrata in lavoro controllato, progressi visibili ai partner e risultati pronti per la fatturazione senza aggiungere complessità al checkout.",
  "public.catalog.fieldServices.highlight1": "\nConversione da richiesta di offerta a ordine",
  "public.catalog.fieldServices.highlight2": "\nEsecuzione supportata da TaskCard",
  "public.catalog.fieldServices.highlight3":
    "\nMonitoraggio dello stato delle fatture e dei pagamenti",
  "auth.signIn.title": "\nAccedi",
  "auth.signIn.subtitle": "\nAccedi alla piattaforma operativa",
  "auth.signIn.pageTitle": "\nAccedi — Piattaforma operativa",
  "auth.signIn.moreDetailsSummary": "\nDettagli della sessione e altre opzioni di accesso",
  "auth.signIn.ssoContinueLoading": "\nContinuazione…",
  "auth.signIn.heading": "\nBentornato",
  "auth.signIn.subheading": "\nEffettua il login per accedere alla piattaforma",
  "auth.signIn.email": "\nIndirizzo e-mail",
  "auth.signIn.emailLabel": "\nIndirizzo e-mail",
  "auth.signIn.emailPlaceholder": "\njane@company.com",
  "auth.signIn.password": "\nPassword",
  "auth.signIn.passwordLabel": "\nPassword",
  "auth.signIn.passwordPlaceholder": "\n••••••••",
  "auth.signIn.helper": "\nUtilizza le tue credenziali registrate",
  "auth.signIn.loading": "\nAccesso in corso...",
  "auth.signIn.submit": "\nAccedi all'area di lavoro",
  "auth.signIn.forgotPassword": "\nHai dimenticato la password?",
  "auth.signIn.unauthorized": "\nAccedi per continuare.",
  "auth.required": "\nAutenticazione richiesta.",
  "auth.signOut": "\nEsci",
  "dashboard.title": "\nCruscotto operativo",
  "dashboard.subtitle": "\nPerformance dal vivo e riepilogo dell'intelligence",
  "dashboard.welcome": "\nBentornato, {name}",
  "dashboard.kpi.assetHealth": "\nStato delle risorse",
  "dashboard.kpi.openTasks": "\nApri attività",
  "dashboard.kpi.predictionAlerts": "\nAvvisi di previsione",
  "dashboard.kpi.utilisation": "\nUtilizzo",
  "dashboard.kpi.spend": "\nSpesa commerciale",
  "dashboard.kpi.depreciation": "\nEsposizione alla svalutazione",
  "dashboard.kpi.placeholderValue": "\nCaricamento in corso",
  "dashboard.kpi.predictionsDueDescription": "\nVita rimanente <= {days} giorni",
  "dashboard.kpi.totalAssetsDescription": "\nIn tutti i siti",
  "dashboard.kpi.activeTasksDescription": "\nArretrato, pianificato e in corso",
  "dashboard.kpi.utilisationDescription": "\nDerivato dalle ore medie di utilizzo",
  "dashboard.kpi.noOverdueTasks": "\nNessuna attività scaduta",
  "dashboard.kpi.deadlinePassed": "\nLa scadenza è passata",
  "dashboard.kpi.depreciationDescription": "\nValore contabile corrente totale",
  "dashboard.refresh": "\nAggiorna automaticamente ogni {seconds} secondi",
  "dashboard.quickActions": "\nAzioni rapide",
  "dashboard.quickActions.subtitle": "\nNaviga verso le aree chiave della piattaforma",
  "dashboard.greeting.morning": "\nBuongiorno, {name}",
  "dashboard.greeting.afternoon": "\nBuon pomeriggio, {name}",
  "dashboard.greeting.evening": "\nBuonasera, {name}",
  "dashboard.kpi.sectionTitle": "\nMetriche delle prestazioni",
  "dashboard.kpi.sectionSubtitle": "\nPerformance dal vivo e riepilogo dell'intelligence",
  "dashboard.kpi.trendVsPreviousMonth": "\nrispetto al mese precedente",
  "dashboard.kpi.trendPendingComparison": "\nI dati comparativi non sono ancora disponibili.",
  "dashboard.dateLabel": "\nOggi",
  "dashboard.chat.pageContext":
    "\nCruscotto operativo. Metriche chiave: {kpis}. Ruolo utente: {role}.",
  "dashboard.quickAction.assets": "\nSfoglia il registro delle risorse",
  "dashboard.quickAction.addDevice": "\nRegistra nuovo dispositivo",
  "dashboard.quickAction.deviceHistory": "\nVisualizza cronologia manutenzione",
  "dashboard.quickAction.digitalTwin": "\nEsplora il gemello digitale 3D",
  "dashboard.quickAction.tasks": "\nGestisci bacheca attività",
  "dashboard.quickAction.kanban": "\nVisualizza la scheda Kanban",
  "dashboard.quickAction.predictions": "\nPrevisioni e avvisi AI",
  "dashboard.quickAction.utilisation": "\nCockpit di utilizzo",
  "dashboard.quickAction.fleet": "\nPostura veicolo e carico di manutenzione",
  "dashboard.quickAction.buildings": "\nCopertura delle strutture e disponibilità dei gemelli",
  "dashboard.quickAction.sensors": "\nCopertura telemetrica e integrità del dispositivo",
  "dashboard.quickAction.reports": "\nGenera rapporti",
  "dashboard.quickAction.finance": "\nAmmortamento e valutazione",
  "dashboard.quickAction.financePlanning": "\nBudget, scenari e postura del capitale",
  "dashboard.quickAction.admin": "\nAmministrazione del sistema",
  "dashboard.quickAction.apiExplorer": "\nRiferimento API",
  "dashboard.quickAction.profile": "\nIl tuo profilo",
  "dashboard.quickAction.customisation": "\nTema e preferenze",
  "assets.title": "\nRegistro risorse",
  "assets.subtitle": "\nRicerca, ispezione e classificazione delle risorse infrastrutturali",
  "assets.searchLabel": "\nCerca risorse",
  "assets.searchPlaceholder": "\nDigita il nome della risorsa, RFID o sito",
  "assets.filterLabel": "\nTipo di risorsa",
  "assets.filterAll": "\nTutti i tipi",
  "assets.savedView.label": "\nVisualizzazione salvata",
  "assets.savedView.all": "\nTutte le risorse",
  "assets.savedView.critical": "\nCondizione critica",
  "assets.savedView.fatiguing": "\nCiclo di vita faticoso",
  "assets.savedView.watch": "\nLista di controllo",
  "assets.columnSet.label": "\nSet di colonne",
  "assets.columnSet.description":
    "\nCambia le colonne dell'area di lavoro delle risorse nella prospettiva operativa, di portafoglio o di governance.",
  "assets.columnSet.footer":
    "\nUtilizza il set di colonne che corrisponde al contesto di revisione corrente prima di esportare o condividere l'area di lavoro.",
  "assets.columnSet.operations": "\nOperativa",
  "assets.columnSet.portfolio": "\nPortafoglio",
  "assets.columnSet.governance": "\nGovernance",
  "assets.compare.add": "\nAggiungi per confrontare",
  "assets.compare.remove": "\nRimuovi dal confronto",
  "assets.compare.title": "\nConfronta vassoio",
  "assets.compare.description":
    "\nMantieni fino a {count} risorse affiancate mentre esamini la condizione, la gerarchia e il contesto del sito.",
  "assets.compare.emptyDescription":
    "Seleziona le risorse dalla tabella per mantenere visibile qui una barra di confronto in tempo reale.",
  "assets.compare.savedViewDescription":
    "\nMantieni visibile il contesto della visualizzazione salvata mentre ti sposti tra le prospettive di confronto e di set di colonne.",
  "assets.compare.footer":
    "\nIl confronto delle selezioni rimane collegato all'URL dell'area di lavoro corrente per un percorso di revisione condiviso.",
  "assets.filterApply": "\nApplica filtri",
  "assets.kpi.total": "\nTotale attivo",
  "assets.kpi.critical": "\nCondizione critica",
  "assets.kpi.fatiguing": "\nCiclo di vita faticoso",
  "assets.summary.title": "\nPortafoglio di asset",
  "assets.summary.description": "\nBase di riferimento inventario operativo",
  "assets.table.name": "\nRisorsa",
  "assets.table.type": "\nTipo",
  "assets.table.site": "\nSito",
  "assets.table.condition": "\nCondizione",
  "assets.table.hierarchy": "\nGerarchia",
  "assets.table.lifecycle": "\nCiclo di vita",
  "assets.table.bookValue": "\nValore contabile",
  "assets.table.lastInspection": "\nUltima ispezione",
  "assets.table.action": "\nAzione",
  "assets.table.open": "\nApri",
  "assets.export.csv": "\nEsporta CSV",
  "assets.export.pdf": "\nEsporta PDF",
  "assets.export.id": "Identificatore",
  "assets.export.purchaseDate": "\nData di acquisto",
  "assets.export.purchasePrice": "\nPrezzo d'acquisto",
  "assets.export.rfidTag": "\nEtichetta RFID",
  "assets.export.hierarchy": "\nLivello gerarchia",
  "assets.export.parentAsset": "\nAsset principale",
  "assets.export.capability": "\nCollegamento capacità",
  "assets.export.utilisationHours": "\nOre di utilizzo",
  "assets.export.unsupportedFormat": "\nFormato non supportato. Usa formato=csv",
  "assets.inspector.aiPrompt":
    "\nEsamina la risorsa {name} alle {site}. Riepiloga il rischio attuale, la preparazione e la migliore azione successiva dal contesto dell'ispettore selezionato.",
  "assets.workspace.summaryTitle": "Registro risorse",
  "assets.workspace.summarySupporting": "Tutti i tipi, tutti i siti",
  "assets.workspace.filterBarEyebrow": "Filtri",
  "assets.workspace.filterBarTitle": "Trova e restringi le risorse",
  "assets.workspace.filterBarDescription":
    "\nLa ricerca aggiorna il registro dopo una breve pausa di digitazione. I menu a tendina si applicano subito; usa Applica filtri per aggiornare dopo modifiche manuali.",
  "assets.inspector.emptyEyebrow": "Ispettore risorse",
  "assets.inspector.emptyTitle": "Nessuna risorsa selezionata",
  "assets.inspector.conditionLabel": "Condizione",
  "assets.inspector.openTasksLabel": "Attività aperte",
  "assets.inspector.predictionsLabel": "Previsioni",
  "assets.inspector.emptyDescription":
    "\nScegli una riga dal registro delle risorse per verificare il rischio, la preparazione e le azioni consigliate.",
  "assets.media.title": "\nFoto",
  "assets.media.empty": "\nNessuna foto ancora",
  "assets.media.upload": "\nCarica foto",
  "assets.media.viewImage": "\nVisualizza immagine",
  "assets.media.annotate": "\nAnnota",
  "addDevice.title": "\nAggiungi dispositivo",
  "addDevice.subtitle": "\nRegistra un nuovo dispositivo e mappalo sulla tua flotta operativa",
  "addDevice.form.title": "\nRegistrazione dispositivo",
  "addDevice.form.nameLabel": "\nNome dispositivo",
  "addDevice.form.serialLabel": "\nSegnale seriale/RF",
  "addDevice.form.typeLabel": "\nCategoria dispositivo",
  "addDevice.form.siteLabel": "\nSito di distribuzione",
  "addDevice.form.sitePlaceholder": "\nSeleziona un sito di distribuzione",
  "addDevice.form.siteHint":
    "\nScegli tra {count} siti attivi nel registro operativo in tempo reale.",
  "addDevice.form.siteLabelWithId": "\nSito di distribuzione/ID",
  "addDevice.form.lifecycleLabel": "\nFase del ciclo di vita",
  "addDevice.form.lifecycleActive": "\nAttivo",
  "addDevice.form.lifecycleMonitor": "\nMonitoraggio",
  "addDevice.form.lifecycleFatiguing": "\nAffaticante",
  "addDevice.form.lifecycleDisposed": "\nSmaltito",
  "addDevice.form.lifecycleDefault": "\nAttivo",
  "addDevice.form.conditionLabel": "\nCondizione",
  "addDevice.form.conditionAny": "\nQualsiasi",
  "addDevice.form.gpsLatLabel": "\nLatitudine GPS",
  "addDevice.form.gpsLonLabel": "\nLongitudine GPS",
  "addDevice.form.purchasePriceLabel": "\nPrezzo d'acquisto",
  "addDevice.form.bookValueLabel": "\nValore contabile",
  "addDevice.form.requiredHint": "\nI campi contrassegnati con * sono obbligatori",
  "addDevice.form.submit": "\nCrea dispositivo",
  "addDevice.validation.unauthorized": "\nNon autorizzato a creare dispositivi",
  "addDevice.validation.nameRequired": "\nIl nome del dispositivo è obbligatorio",
  "addDevice.validation.typeRequired": "\nLa categoria del dispositivo è obbligatoria",
  "addDevice.validation.siteRequired": "\nIl sito è obbligatorio",
  "addDevice.validation.locationRequired": "\nSono richieste le coordinate GPS",
  "addDevice.validation.locationInvalidRange": "\nLe coordinate GPS sono fuori limite",
  "addDevice.validation.numericValuesRequired":
    "\nIl prezzo di acquisto e il valore contabile devono essere numerici",
  "addDevice.validation.siteNotFound": "\nIl sito specificato non esiste",
  "addDevice.validation.rfidUsed": "\nIl segnale RF/tag RFID è già in uso",
  "addDevice.prerequisite.databaseUnavailableTitle":
    "\nLa configurazione del dispositivo richiede dati del sito in tempo reale",
  "addDevice.prerequisite.siteUnavailableTitle":
    "\nAggiungi un sito attivo prima di registrare i dispositivi",
  "addDevice.prerequisite.siteUnavailableDescription":
    "Crea una base o una struttura nell'area di lavoro della tenuta, quindi torna qui per registrare o importare dispositivi rispetto al catalogo del sito live.",
  "addDevice.prerequisite.openEstate": "\nSpazio di lavoro aperto",
  "addDevice.feedback.created": "\nDispositivo {name} registrato correttamente",
  "addDevice.form.postCreateNote":
    "\nDopo la registrazione, allega telemetria, foto e attività di manutenzione dal record dell'asset.",
  "addDevice.massImport.title": "\nImportazione di massa",
  "addDevice.massImport.subtitle": "\nScegli un file CSV per importare i record del dispositivo",
  "addDevice.massImport.acceptedTypes": "\nSolo file CSV",
  "addDevice.massImport.maxFiles": "\nUn file alla volta",
  "addDevice.massImport.importing": "\nImportazione…",
  "addDevice.massImport.success": "\nImportato {created} di {total} dispositivi",
  "addDevice.massImport.partial": "\nImportato {created} di {total}. {failed} non riuscito.",
  "addDevice.massImport.error": "\nImportazione non riuscita: {message}",
  "addDevice.massImport.emptyFile": "\nIl CSV non contiene righe di dati",
  "addDevice.massImport.fileLabel": "\nFile CSV",
  "addDevice.massImport.submit": "\nImporta dispositivi",
  "addDevice.massImport.downloadTemplate": "\nScarica il modello CSV",
  "addDevice.massImport.editorTitle": "\nRivedi e modifica i contenuti importati",
  "addDevice.massImport.editorDescription":
    "\nCarica un CSV, incolla righe del foglio di calcolo o modifica singole celle prima dell'importazione.",
  "addDevice.massImport.contentLabel": "\nImporta contenuto",
  "addDevice.massImport.contentPlaceholder":
    "\nIncolla qui le righe CSV. La riga di intestazione è obbligatoria per l'importazione diretta.",
  "addDevice.massImport.notesLabel": "\nNote grezze per l'analisi AI",
  "addDevice.massImport.notesPlaceholder":
    "\nIncolla elenchi puntati, tabelle copiate, e-mail o note tecniche e lascia che l'intelligenza artificiale li converta in righe pronte per l'importazione.",
  "addDevice.massImport.parseWithAi": "\nAnalizza con AI",
  "addDevice.massImport.aiParsing": "\nAnalisi del contenuto…",
  "addDevice.massImport.aiSuccess": "\nAI preparato {count} importa righe",
  "addDevice.massImport.aiError": "\nAnalisi AI non riuscita: {message}",
  "addDevice.massImport.gridTitle": "\nEditor di celle",
  "addDevice.massImport.addRow": "\nAggiungi riga",
  "addDevice.massImport.clearContent": "\nCancella contenuto",
  "addDevice.massImport.emptyGrid":
    "\nIncolla o analizza il contenuto per iniziare a modificare le righe.",
  "addDevice.massImport.fileImported": "\nFile importato nell'editor",
  "addDevice.massImport.parseEmpty": "\nAggiungi note grezze prima di utilizzare l'analisi AI",
  "addDevice.massImport.invalidContent": "\nNessuna riga importabile trovata nell'editor content",
  "addDevice.massImport.templateSeed":
    "\nnome,tipo,nomesito,rfidTag,gpsLat,gpsLon,prezzoacquisto,valorelibro,condizione,ciclo di vitaStage",
  "addDevice.massImport.columns.name": "\nNome",
  "addDevice.massImport.columns.type": "\nTipo",
  "addDevice.massImport.columns.siteName": "\nSito",
  "addDevice.massImport.columns.rfidTag": "\nRFID/Seriale",
  "addDevice.massImport.columns.gpsLat": "\nLatitudine",
  "addDevice.massImport.columns.gpsLon": "\nLongitudine",
  "addDevice.massImport.columns.purchasePrice": "\nPrezzo d'acquisto",
  "addDevice.massImport.columns.bookValue": "\nValore contabile",
  "addDevice.massImport.columns.condition": "\nCondizione",
  "addDevice.massImport.columns.lifecycleStage": "\nCiclo di vita",
  "addDevice.massImport.formatTableTitle": "\nRiferimento formato di importazione",
  "addDevice.massImport.formatTableColumnName": "\nColonna",
  "addDevice.massImport.formatTableColumnRequired": "\nRichiesto",
  "addDevice.massImport.formatTableColumnExample": "\nEsempio",
  "addDevice.massImport.columns.required.name": "\nSì",
  "addDevice.massImport.columns.required.type": "\nSì",
  "addDevice.massImport.columns.required.siteName": "\nSì",
  "addDevice.massImport.columns.required.rfidTag": "\nNo",
  "addDevice.massImport.columns.required.gpsLat": "\nSì",
  "addDevice.massImport.columns.required.gpsLon": "\nSì",
  "addDevice.massImport.columns.required.purchasePrice": "\nSì",
  "addDevice.massImport.columns.required.bookValue": "\nSì",
  "addDevice.massImport.columns.required.condition": "\nNo",
  "addDevice.massImport.columns.required.lifecycleStage": "\nNo",
  "addDevice.massImport.columns.example.name": "\nUnità sensore A1",
  "addDevice.massImport.columns.example.type": "INTERVALLO_DI_ALLENAMENTO",
  "addDevice.massImport.columns.example.siteName": "\nSito Alpha",
  "addDevice.massImport.columns.example.rfidTag": "RF-00123 (esempio)",
  "addDevice.massImport.columns.example.gpsLat": "51.5074 (esempio)",
  "addDevice.massImport.columns.example.gpsLon": "-0.1278 (esempio)",
  "addDevice.massImport.columns.example.purchasePrice": "1200.00 (esempio)",
  "addDevice.massImport.columns.example.bookValue": "950.00 (esempio)",
  "addDevice.massImport.columns.example.condition": "\nbene",
  "addDevice.massImport.columns.example.lifecycleStage": "\nattivo",
  "addDevice.massImport.formatTableRequiredYes": "\nSì",
  "addDevice.massImport.formatTableRequiredNo": "\nNo",
  "addDevice.workflow.title": "\nRevisione graduale del dispositivo",
  "addDevice.workflow.description":
    "\nRegistra il dispositivo, convalida le righe di importazione e rivedi il risultato prima dell'invio.",
  "deviceHistory.title": "\nCronologia dispositivo",
  "deviceHistory.subtitle":
    "\nAzioni recenti relative al ciclo di vita e alla manutenzione della tua flotta",
  "deviceHistory.filterLabel": "\nFiltra per dispositivo",
  "deviceHistory.filter.assigneeLabel": "\nAssegnatario",
  "deviceHistory.filter.assigneePlaceholder": "\nCerca per assegnatario",
  "deviceHistory.filter.statusLabel": "\nStato",
  "deviceHistory.filter.statusAll": "\nTutti gli stati",
  "deviceHistory.table.device": "\nDispositivo",
  "deviceHistory.table.event": "\nEvento",
  "deviceHistory.table.timestamp": "\nTimestamp",
  "deviceHistory.table.updatedAt": "\nAggiornato alle",
  "deviceHistory.table.status": "\nStato",
  "deviceHistory.table.assignee": "\nAssegnatario",
  "deviceHistory.table.priority": "\nPriorità",
  "deviceHistory.table.ariaLabel": "\nEventi cronologia dispositivo",
  "deviceHistory.table.notes": "\nNote",
  "deviceHistory.table.emptyTitle": "\nNessuna cronologia del dispositivo ancora",
  "deviceHistory.table.emptyDescription":
    "Modifica i filtri o attendi che la nuova attività del ciclo di vita venga visualizzata in questo feed.",
  "deviceHistory.table.errorTitle": "\nCronologia dispositivo non disponibile",
  "deviceHistory.table.errorDescription":
    "\nImpossibile caricare il feed della cronologia del dispositivo. Riprova la richiesta.",
  "deviceHistory.decisionTitle": "\nRevisione differenze e anomalie",
  "deviceHistory.decisionDescription":
    "\nConfronta gli eventi recenti, controlla le anomalie ed esporta il pacchetto di prove.",
  "deviceHistory.eventTask": "\nEvento attività",
  "deviceHistory.empty": "\nNessun evento della cronologia del dispositivo corrisponde ai filtri.",
  "profile.title": "\nProfilo",
  "profile.subtitle": "\nDettagli dell'account e contesto del ruolo",
  "profile.displayName": "\nNome visualizzato",
  "profile.email": "\nE-mail",
  "profile.role": "\nRuolo attuale",
  "profile.lastSignIn": "\nUltimo accesso",
  "profile.lastSignInUnavailable": "Non disponibile",
  "profile.workspaceHome": "\nCasa dell'area di lavoro",
  "profile.activeSessions": "\nSessioni attive",
  "profile.sessions.title": "\nSessioni attive",
  "profile.sessions.subtitle": "\nAccessi recenti e contesto del dispositivo per il tuo account",
  "profile.sessions.empty": "\nNessuna sessione recente registrata",
  "profile.sessions.emptyDescription":
    "\nGli accessi attivi e recenti verranno visualizzati qui dopo l'autenticazione.",
  "profile.sessions.current": "\nSessione corrente",
  "profile.sessions.unknownAddress": "\nRete sconosciuta",
  "profile.sessions.unknownDevice": "\nDispositivo sconosciuto",
  "profile.sessions.started": "\nIniziato",
  "profile.sessions.expires": "\nScadenza",
  "profile.sessions.deviceInventory": "\nDispositivi visti",
  "profile.sessions.networkCoverage": "\nReti viste",
  "profile.sessions.activityTitle": "\nAttività di sicurezza recente",
  "profile.sessions.activityDescription":
    "\nEsamina le modifiche più recenti a sessione, dispositivo e rete prima di interrompere l'accesso o ruotare le credenziali.",
  "profile.sessions.activityCurrentTitle": "\nPostura della sessione attuale",
  "profile.sessions.activityCurrentDescription": "\nSessione corrente stabilita {value}.",
  "profile.sessions.activityCurrentEmpty":
    "\nNessuna sessione corrente disponibile per la revisione.",
  "profile.sessions.activityDeviceTitle": "\nImpronta dispositivo",
  "profile.sessions.activityDeviceDescription":
    "\nI profili del dispositivo {count} sono visibili nel controllo della sessione recente.",
  "profile.sessions.activityNetworkTitle": "\nImpronta di rete",
  "profile.sessions.activityNetworkDescription":
    "\nLe origini della rete {count} sono visibili nel controllo della sessione recente.",
  "profile.sessions.expiringSoon": "\nIn scadenza a breve",
  "profile.sessions.activityExpiringDescription":
    "\n{count} le sessioni attive necessitano di revisione prima che la finestra di accesso corrente si chiuda.",
  "profile.sessions.expiresSoon": "\nScade a breve",
  "profile.sessions.remoteContext": "\nContesto remoto",
  "profile.sessions.activityRemoteDescription":
    "\nLe sessioni {count} sono attive al di fuori del contesto di rete attendibile principale.",
  "profile.signOutLabel": "\nEsci",
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
  "digitalTwin.title": "\nGemello digitale",
  "digitalTwin.subtitle": "\nVisibilità dell'hotspot spaziale e contesto delle risorse attive",
  "digitalTwin.scene.title": "\nScena delle operazioni spaziali",
  "digitalTwin.scene.description":
    "\nVisualizzazione doppia basata su server che mostra la copertura dell'hotspot in tempo reale e le coordinate collegate alle risorse.",
  "digitalTwin.scene.streamTitle": "\nStreaming in diretta",
  "digitalTwin.scene.streamDescription":
    "\nLe istantanee SSE pubblicano le coordinate attuali dell'hotspot.",
  "digitalTwin.videoStreams.title": "\nFeed in tempo reale",
  "digitalTwin.videoStreams.empty": "\nNessun live streaming configurato",
  "digitalTwin.videoStreams.live": "\nDal vivo",
  "digitalTwin.videoStreams.noStream": "\nNessun URL dello streaming",
  "digitalTwin.videoStreams.openStream": "\nApri flusso",
  "digitalTwin.videoStreams.notFound": "\nStream non trovato",
  "iot.telemetry.ingest": "\nImporta telemetria",
  "iot.devices.title": "\nDispositivi IoT",
  "iot.apiKeyInvalid": "\nChiave API non valida o mancante",
  "iot.assetNotFound": "\nRisorsa non trovata",
  "iot.siteNotFound": "\nSito non trovato",
  "iot.devices.empty": "\nNessun dispositivo IoT registrato",
  "iot.devices.register": "\nRegistra dispositivo",
  "iot.devices.mqttTopic": "\nArgomento MQTT",
  "iot.devices.mqttPlaceholder": "\ntelemetria/sito1/dispositivo1",
  "iot.devices.site": "\nSito",
  "iot.devices.asset": "\nRisorsa",
  "iot.devices.assetPlaceholder": "\nID risorsa",
  "iot.devices.lastSeen": "\nVisto l'ultima volta",
  "iot.devices.validation.required": "L'argomento e il sito MQTT sono obbligatori.",
  "iot.devices.validation.topicInUse": "\nL'argomento MQTT è già in uso.",
  "iot.devices.feedback.deviceAdded": "\nRegistra dispositivo: dispositivo aggiunto.",
  "iot.devices.table.ariaLabel": "\nDispositivi IoT registrati",
  "iot.apiKeyNotConfigured": "\nLa chiave API IoT non è configurata.",
  "iot.deviceNotFound": "\nDispositivo non trovato",
  "edgeControl.validation.payloadJsonInvalid": "\nIl payload deve essere un JSON valido.",
  "edgeControl.validation.commandRequired":
    "\nSeleziona un dispositivo e inserisci un nome di comando.",
  "edgeControl.validation.deviceRequired": "\nSeleziona un dispositivo valido.",
  "edgeControl.validation.automationTitleRequired": "\nIl titolo dell'automazione è obbligatorio.",
  "edgeControl.validation.automationDeviceRequired":
    "\nSeleziona un dispositivo e comanda per mettere in coda un'esecuzione di automazione.",
  "edgeControl.validation.automationKindRequired": "\nSeleziona un tipo di automazione valido.",
  "edgeControl.commands.title": "\nCoda comandi dispositivo",
  "edgeControl.commands.description":
    "\nAccoda i comandi sicuri per l'hardware per i dispositivi edge registrati e monitora lo stato di consegna.",
  "edgeControl.commands.device": "\nDispositivo",
  "edgeControl.commands.devicePlaceholder": "\nSeleziona un dispositivo",
  "edgeControl.commands.command": "\nComando",
  "edgeControl.commands.commandPlaceholder": "\nriavvia, calibra, sync-config",
  "edgeControl.commands.payload": "\nCarico utile JSON",
  "edgeControl.commands.payloadPlaceholder": '{"obiettivo":"zone-a"}',
  "edgeControl.commands.submit": "\nComando coda",
  "edgeControl.commands.empty": "\nNessun comando del dispositivo ancora in coda.",
  "edgeControl.commands.notFound": "\nComando dispositivo non trovato.",
  "edgeControl.commands.failed": "\nIl dispositivo ha segnalato un errore nel comando.",
  "edgeControl.commands.feedback.queued": "\nComando del dispositivo in coda per la consegna Edge.",
  "edgeControl.commands.table.device": "\nDispositivo",
  "edgeControl.commands.table.command": "\nComando",
  "edgeControl.commands.table.status": "\nStato",
  "edgeControl.commands.table.automation": "\nAutomazione",
  "edgeControl.commands.table.updatedAt": "\nAggiornato",
  "edgeControl.commands.status.QUEUED": "\nIn coda",
  "edgeControl.commands.status.DELIVERED": "\nConsegnato",
  "edgeControl.commands.status.ACKNOWLEDGED": "\nRiconosciuto",
  "edgeControl.commands.status.FAILED": "\nNon riuscito",
  "edgeControl.commands.status.CANCELED": "\nAnnullato",
  "edgeControl.automation.title": "\nL'automazione viene eseguita",
  "edgeControl.automation.description":
    "\nCrea record di esecuzione durevoli che accodano il funzionamento del dispositivo e conserva la cronologia delle esecuzioni all'interno del centro di controllo.",
  "edgeControl.automation.runTitle": "\nEsegui titolo",
  "edgeControl.automation.runTitlePlaceholder": "\nRipristino notturno del refrigeratore",
  "edgeControl.automation.kindLabel": "\nTipo automazione",
  "edgeControl.automation.device": "\nDispositivo",
  "edgeControl.automation.command": "\nComando",
  "edgeControl.automation.payload": "\nCarico utile JSON",
  "edgeControl.automation.notes": "\nNote",
  "edgeControl.automation.notesPlaceholder": "\nNota operatore opzionale",
  "edgeControl.automation.submit": "\nAutomazione code",
  "edgeControl.automation.empty": "\nNessuna esecuzione di automazione ancora creata.",
  "edgeControl.automation.feedback.queued":
    "\nEsecuzione dell'automazione in coda con un comando edge.",
  "edgeControl.automation.table.title": "\nCorri",
  "edgeControl.automation.table.kind": "\nGentile",
  "edgeControl.automation.table.status": "\nStato",
  "edgeControl.automation.table.device": "\nDispositivo",
  "edgeControl.automation.table.updatedAt": "\nAggiornato",
  "edgeControl.automation.kind.DEVICE_COMMAND": "\nComando dispositivo",
  "edgeControl.automation.kind.EDGE_RUNBOOK": "\nRunbook Edge",
  "edgeControl.automation.status.QUEUED": "\nIn coda",
  "edgeControl.automation.status.RUNNING": "\nIn corsa",
  "edgeControl.automation.status.SUCCEEDED": "\nRiuscito",
  "edgeControl.automation.status.FAILED": "\nNon riuscito",
  "edgeControl.automation.status.CANCELED": "\nAnnullato",
  "deployment.validation.airgappedProviderRequired":
    "\nLa distribuzione con airgapping consente solo fornitori di IA locali come RamaLama o Ollama.",
  "deployment.title": "\nPolitica di distribuzione",
  "deployment.description":
    "\nLa modalità di distribuzione regola l'accesso alla rete in uscita, i criteri del fornitore di intelligenza artificiale e i limiti di archiviazione.",
  "deployment.policyTitle": "\nPolitica",
  "deployment.policy.airgapped":
    "\nLe chiamate di rete esterne sono bloccate e l'intelligenza artificiale è limitata ai provider locali serviti all'interno dei confini di distribuzione.",
  "deployment.policy.cloud":
    "\nLe distribuzioni cloud consentono integrazioni in uscita mantenendo il comando edge e lo stato di automazione nel piano di controllo condiviso.",
  "deployment.policy.onPrem":
    "\nLe distribuzioni in sede rimangono ospitate autonomamente pur consentendo integrazioni esterne esplicitamente configurate.",
  "deployment.edgeControlTitle": "\nControllo bordi",
  "deployment.edgeControlDescription":
    "\nLe code dei comandi del dispositivo e le esecuzioni di automazione rimangono durevoli in Prisma, quindi il ridimensionamento dell'app non riduce il lavoro in volo.",
  "deployment.mode.CLOUD": "\nNuvola",
  "deployment.mode.ON_PREM": "\nIn sede",
  "deployment.mode.AIRGAPPED": "Modalità Air-gapped",
  "deployment.capability.externalNetworkEnabled": "\nRete esterna abilitata",
  "deployment.capability.externalNetworkDisabled": "\nRete esterna bloccata",
  "deployment.capability.externalEmailEnabled": "\nE-mail esterna consentita",
  "deployment.capability.externalEmailDisabled": "\nE-mail esterna bloccata",
  "deployment.capability.localProtocolReferencesOnly": "\nSolo riferimenti al protocollo locale",
  "deployment.capability.remoteProtocolReferencesAllowed":
    "\nRiferimenti al protocollo remoto consentiti",
  "deployment.capability.localAiOnly": "\nSolo IA locale",
  "deployment.capability.hybridAiAllowed": "\nIA ibrida consentita",
  "deployment.capability.localDeviceStorageOnly": "\nSolo archiviazione locale",
  "deployment.capability.objectStorageAllowed": "\nArchiviazione oggetti consentita",
  "assets.media.noFile": "\nNessun file fornito",
  "assets.media.invalidFileType": "\nTipo di file non valido. Consentiti: JPEG, PNG, GIF, WebP.",
  "assets.media.fileTooLarge": "\nFile troppo grande. Massimo 10 MB.",
  "assets.media.notFound": "\nSupporto non trovato",
  "assets.media.fileNotFound": "\nFile non trovato",
  "assets.media.assetNotFound": "\nRisorsa non trovata",
  "assets.annotations.title": "\nAnnotazioni immagine",
  "assets.annotations.empty": "\nAncora nessuna annotazione",
  "assets.annotations.open": "\nApri area di lavoro annotazione",
  "assets.annotations.segment": "\nEsegui segmentazione",
  "assets.annotations.segmentSuccess": "\nProposte di segmentazione create",
  "assets.annotations.segmentUnavailable":
    "\nLa segmentazione non è disponibile con l'attuale configurazione AI. L'annotazione manuale è ancora disponibile.",
  "assets.annotations.segmentInvalid":
    "\nImpossibile convertire la risposta di segmentazione in una geometria di annotazione valida.",
  "assets.annotations.manualAdd": "\nAggiungi annotazione manuale",
  "assets.annotations.edit": "\nModifica poligono",
  "assets.annotations.confirm": "\nConferma",
  "assets.annotations.reject": "\nRifiuta",
  "assets.annotations.archive": "\nArchivio",
  "assets.annotations.save": "\nSalva annotazione",
  "assets.annotations.clearDraft": "\nCancella bozza",
  "assets.annotations.label": "\nEtichetta",
  "assets.annotations.status": "\nStato",
  "assets.annotations.source": "\nFonte",
  "assets.annotations.confidence": "\nFiducia",
  "assets.annotations.mask": "\nMaschera",
  "assets.annotations.maskToggle": "\nMostra sovrapposizione maschera",
  "assets.annotations.boxTool": "\nStrumento scatola",
  "assets.annotations.polygonTool": "\nStrumento Poligono",
  "assets.annotations.regions": "\nRegioni",
  "assets.annotations.prompt": "\nRichiesta di segmentazione",
  "assets.annotations.promptPlaceholder":
    "\nEvidenzia perdite, corrosione, crepe, controlli o altre aree importanti",
  "assets.annotations.defaultLabel": "\nRegione",
  "assets.annotations.status.proposed": "\nProposto",
  "assets.annotations.status.confirmed": "\nConfermato",
  "assets.annotations.status.rejected": "\nRifiutato",
  "assets.annotations.status.archived": "\nArchiviato",
  "assets.annotations.source.ai": "IA",
  "assets.annotations.source.manual": "\nManuale",
  "assets.annotations.validation.labelRequired": "\nL'etichetta è obbligatoria",
  "assets.annotations.validation.polygonInvalid":
    "\nIl poligono deve contenere almeno tre punti normalizzati",
  "assets.annotations.validation.mediaNotFound":
    "\nIl supporto per l'annotazione non è stato trovato",
  "assets.annotations.validation.annotationNotFound": "\nAnnotazione non trovata",
  "assets.annotations.saved": "\nAnnotazione salvata",
  "assets.annotations.archived": "\nAnnotazione archiviata",
  "storage.notConfigured":
    "\nSpazio di archiviazione non configurato. Imposta le variabili di ambiente OBJECT_STORAGE_*.",
  "storage.operationFailed": "\nOperazione di archiviazione non riuscita",
  "assets.type.BUILDING": "\nEdificio",
  "assets.type.INFRASTRUCTURE": "\nInfrastrutture",
  "assets.type.TRAINING_RANGE": "\nCampo di allenamento",
  "assets.type.RANGE_SAFETY_SYSTEM": "\nSistema di sicurezza della gamma",
  "assets.type.TARGETRY_SYSTEM": "\nSistema di mira",
  "assets.type.HVAC": "Climatizzazione",
  "assets.type.ELECTRICAL": "\nElettrico",
  "assets.type.PLUMBING": "\nImpianti idraulici",
  "assets.type.STRUCTURAL": "\nStrutturale",
  "assets.type.MECHANICAL": "\nMeccanico",
  "assets.type.FIRE_SAFETY": "\nSicurezza antincendio",
  "assets.type.SECURITY": "\nSicurezza",
  "assets.type.IT_INFRASTRUCTURE": "\nInfrastruttura IT",
  "assets.type.VEHICLE": "\nVeicolo",
  "assets.type.PLANT_HEAVY_MACHINERY": "\nImpianti e macchinari pesanti",
  "assets.type.KITCHEN_CATERING_EQUIPMENT": "\nAttrezzature per cucina e ristorazione",
  "assets.type.FORESTRY_ASSET": "\nBene forestale",
  "assets.type.RURAL_ESTATE_ASSET": "\nAsset immobiliare rurale",
  "assets.type.HERITAGE_ASSET": "\nPatrimonio storico",
  "assets.type.ENVIRONMENTAL_ASSET": "\nRisorsa Ambientale",
  "assets.type.GOVERNMENT_FURNISHED_EQUIPMENT": "\nAttrezzatura fornita dal governo",
  "assets.type.EQUIPMENT": "\nAttrezzatura",
  "assets.type.OTHER": "\nAltro",
  "assets.hierarchy.ESTATE": "\nImmobiliare",
  "assets.hierarchy.FACILITY": "\nStruttura",
  "assets.hierarchy.SYSTEM": "\nSistema",
  "assets.hierarchy.SUBSYSTEM": "\nSottosistema",
  "assets.hierarchy.COMPONENT": "\nComponente",
  "assets.condition.OPERATIONAL": "\nOperativo",
  "assets.condition.DEGRADED": "\nDegradato",
  "assets.condition.CRITICAL": "\nCritico",
  "assets.condition.FATIGUING": "\nAffaticante",
  "assets.condition.DECOMMISSIONED": "\nDismesso",
  "assets.condition.unknown": "\nSconosciuto",
  "assets.lifecycle.ACTIVE": "\nAttivo",
  "assets.lifecycle.MONITORING": "\nMonitoraggio",
  "assets.lifecycle.FATIGUING": "\nAffaticante",
  "assets.lifecycle.DISPOSED": "\nSmaltito",
  "digitalTwin.scene.hotspotTitle": "\nCopertura hotspot",
  "digitalTwin.scene.hotspotDescription":
    "\nGli indicatori operativi si aggiornano dall'ultimo stato gemello persistente.",
  "digitalTwin.scene.assetTitle": "\nContesto risorsa",
  "digitalTwin.scene.assetDescription":
    "\nOgni hotspot può ricollegarsi alla risorsa infrastrutturale monitorata.",
  "digitalTwin.hotspots.title": "\nRegistro degli hotspot",
  "digitalTwin.hotspots.empty": "Nessun hotspot disponibile per l'attuale gemello digitale.",
  "digitalTwin.hotspots.noDescription": "\nNon è stata registrata alcuna descrizione dell'hotspot.",
  "digitalTwin.hotspots.openTarget": "\nApri bersaglio",
  "digitalTwin.coords.x": "Asse X",
  "digitalTwin.coords.y": "Asse Y",
  "digitalTwin.coords.z": "Asse Z",
  "kanban.title": "\nTabellone Kanban",
  "kanban.subtitle":
    "\nPipeline di esecuzione per assegnazioni, pianificazione e flusso del personale",
  "tasks.title": "\nScheda attività",
  "tasks.subtitle": "\nPipeline di esecuzione Kanban e flusso del team",
  "tasks.filter.priority": "\nPriorità",
  "tasks.filter.priority.all": "\nTutte le priorità",
  "tasks.filter.status": "\nStato",
  "tasks.filter.site": "\nSito",
  "tasks.filter.assignee": "\nAssegnatario",
  "tasks.filter.assigneePlaceholder": "\nCerca risorsa, assegnatario o equipaggio",
  "tasks.filter.priority.low": "\nBasso",
  "tasks.filter.priority.medium": "\nMedio",
  "tasks.filter.priority.high": "\nAlto",
  "tasks.filter.priority.critical": "\nCritico",
  "tasks.filter.site.allSites": "\nTutti i siti",
  "tasks.filter.site.northTraining": "\nSito di addestramento nord",
  "tasks.filter.site.centralCommand": "\nComando Centrale",
  "tasks.column.backlog": "\nArretrato",
  "tasks.column.scheduled": "\nProgrammato",
  "tasks.column.inProgress": "\nIn corso",
  "tasks.column.completed": "\nCompletato",
  "tasks.column.empty": "\nNessuna attività in questa colonna",
  "tasks.status.draft": "\nBozza",
  "tasks.status.cancelled": "\nAnnullato",
  "tasks.priority.LOW": "\nBasso",
  "tasks.priority.MEDIUM": "\nMedio",
  "tasks.priority.HIGH": "\nAlto",
  "tasks.priority.CRITICAL": "\nCritico",
  "tasks.type.INSPECTION": "\nIspezione",
  "tasks.type.REPAIR": "\nRiparazione",
  "tasks.type.REPLACEMENT": "\nSostituzione",
  "tasks.type.CALIBRATION": "\nCalibrazione",
  "tasks.type.EMERGENCY": "\nEmergenza",
  "tasks.card.asset": "\nRisorsa",
  "tasks.card.deadline": "\nScadenza",
  "tasks.card.crew": "\nEquipaggio",
  "tasks.card.priority": "\nPriorità",
  "tasks.card.open": "\nVisualizza attività",
  "tasks.card.openAria": "\nApri i dettagli dell'attività per {id}",
  "tasks.summary.pendingApproval": "\nIn attesa di approvazione",
  "tasks.detail.title": "\nDettagli attività",
  "tasks.detail.subtitle":
    "\nSeleziona una scheda attività per esaminare il contesto dell'assegnazione",
  "tasks.detail.listTitle": "\nElenco di controllo per il completamento delle attività",
  "tasks.detail.completionCriteria": "\nCriteri di completamento",
  "tasks.detail.requiredParts": "\nParti richieste",
  "tasks.detail.aiConfidence": "\nFiducia nell'IA",
  "tasks.workspace.title": "\nCompito Controllo missione",
  "tasks.workspace.heroEyebrow": "\nBanco di lavoro operativo",
  "tasks.workspace.heroNarrative":
    "\n{mode} visualizzazione incentrata su {preset}. {total} attività con ambito, {active} attivo nel flusso, {unassigned} senza proprietario, {dueSoon} con scadenza a breve.",
  "tasks.workspace.modeLabel": "\nModalità workbench attività",
  "tasks.workspace.mode.queue": "\nCoda prioritaria",
  "tasks.workspace.mode.board": "\nTavola di flusso",
  "tasks.workspace.mode.copilot": "\nCopilota",
  "tasks.workspace.navigatorTitle": "\nNavigatore",
  "tasks.workspace.navigatorSubtitle":
    "\nSalva il modello mentale dell'operatore: scegli una lente, quindi suddividi il set di dati.",
  "tasks.workspace.queueTitle": "\nCoda di esecuzione",
  "tasks.workspace.queueSubtitle":
    "\nPrimo elenco dettagliato per l'invio, la valutazione e la revisione dell'operatore.",
  "tasks.workspace.boardTitle": "\nFlusso di esecuzione",
  "tasks.workspace.boardSubtitle":
    "\nVisualizzazione della prima corsia del tabellone per la pianificazione, il monitoraggio WIP e le modifiche di stato.",
  "tasks.workspace.detailTitle": "\nDrillthrough",
  "tasks.workspace.detailSubtitle":
    "\nAttività selezionata, proprietario consigliato e percorso dell'azione successiva.",
  "tasks.workspace.detailEmpty":
    "\nSeleziona una scheda attività per esaminare il contesto di esecuzione e i suggerimenti dell'intelligenza artificiale.",
  "tasks.workspace.presetLabel": "Predefinito",
  "tasks.workspace.preset.all": "\nTutto il carico di lavoro",
  "tasks.workspace.preset.myQueue": "\nLa mia coda",
  "tasks.workspace.preset.triage": "\nNecessita di triage",
  "tasks.workspace.preset.unassigned": "\nNon assegnato",
  "tasks.workspace.preset.dueSoon": "\nA breve",
  "tasks.workspace.preset.active": "\nFlusso attivo",
  "tasks.workspace.preset.completed": "\nCompletato di recente",
  "tasks.workspace.preset.aiGenerated": "\nOriginato dall'AI",
  "tasks.workspace.preset.allDesc":
    "\nCarico di lavoro completamente filtrato attraverso la pianificazione e l'esecuzione.",
  "tasks.workspace.preset.myQueueDesc": "\nCompiti già assegnati all'operatore attuale.",
  "tasks.workspace.preset.triageDesc":
    "\nBozze e voci in arretrato che necessitano ancora di una decisione.",
  "tasks.workspace.preset.unassignedDesc":
    "\nLavora senza proprietà individuale o dell'equipaggio.",
  "tasks.workspace.preset.dueSoonDesc": "\nAttività previste nei prossimi sette giorni.",
  "tasks.workspace.preset.activeDesc":
    "\nIl lavoro di linea e in volo attualmente consuma capacità.",
  "tasks.workspace.preset.completedDesc":
    "\nLavoro chiuso di recente per convalida e trasferimento.",
  "tasks.workspace.preset.aiGeneratedDesc":
    "\nElementi di lavoro collegati alla previsione o con punteggio AI.",
  "tasks.workspace.savedViewLabel": "\nVisualizzazioni salvate",
  "tasks.workspace.savedView.dispatch": "Coda di spedizione",
  "tasks.workspace.savedView.dispatchDesc":
    "\nMantieni visibili il lavoro non assegnato e la pressione del personale per un instradamento rapido.",
  "tasks.workspace.savedView.slaWatch": "\nOrologio SLA",
  "tasks.workspace.savedView.slaWatchDesc":
    "\nContinua a lavorare a breve e in ritardo che necessita prima di un intervento.",
  "tasks.workspace.savedView.automation": "\nOrologio per l'automazione",
  "tasks.workspace.savedView.automationDesc":
    "\nEsamina le attività originate dall'intelligenza artificiale prima che passino alla pianificazione e all'esecuzione sul campo.",
  "tasks.workspace.savedView.execution": "\nFocus sull'esecuzione",
  "tasks.workspace.savedView.executionDesc":
    "\nSegui il lavoro programmato e in corso senza lasciare il banco di lavoro.",
  "tasks.workspace.metric.total": "\nAttività con ambito",
  "tasks.workspace.metric.totalDesc":
    "\nCarico di lavoro visibile dopo l'applicazione dei filtri attuali.",
  "tasks.workspace.metric.active": "\nIn esecuzione",
  "tasks.workspace.metric.activeDesc": "\nAttività pianificate e in corso nella vista corrente.",
  "tasks.workspace.metric.unassigned": "\nSenza proprietà",
  "tasks.workspace.metric.unassignedDesc": "\nIncarichi senza assegnatario diretto o equipaggio.",
  "tasks.workspace.metric.dueSoon": "\nA breve",
  "tasks.workspace.metric.dueSoonDesc": "\nAttività con scadenza nei prossimi sette giorni.",
  "tasks.workspace.metric.overdue": "\nIn ritardo",
  "tasks.workspace.primaryAction": "\nAggiungi attività",
  "tasks.workspace.filtersHint":
    "\nLa modifica di un filtro dei dati aggiorna la query della scheda e mantiene l'URL condivisibile.",
  "tasks.workspace.slaTitle": "\nInvecchiamento SLA",
  "tasks.workspace.slaDescription":
    "\nMantieni visibili i lavori in ritardo, in scadenza e di riassegnazione prima che passino al turno successivo.",
  "tasks.workspace.slaAging.overdue": "\n{count} giorno/i di ritardo",
  "tasks.workspace.slaAging.today": "\nScadenza oggi",
  "tasks.workspace.slaAging.dueIn": "\nScadenza tra {count} giorno/i",
  "tasks.workspace.slaAging.onTrack": "\nIn pista",
  "tasks.workspace.bulkCueTitle": "\nSegnali di triage in blocco",
  "tasks.workspace.bulkCueDescription":
    "\nPassa alle sezioni di valutazione, riassegnazione o chiusura senza ricostruire i filtri correnti.",
  "tasks.workspace.bulkTriageTitle": "\nValutazione collettiva",
  "tasks.workspace.bulkTriageDescription":
    "\nElimina i compiti scaduti, in scadenza a breve e che richiedono molta attenzione prima che invecchino nel turno successivo.",
  "tasks.workspace.bulkReassignTitle": "\nIndizi di riassegnazione",
  "tasks.workspace.bulkReassignDescription":
    "\nMantieni visibile il lavoro non assegnato in modo che l'invio e il trasferimento del personale restino in testa alla coda.",
  "tasks.workspace.shortcutTitle": "\nScorciatoie da tastiera",
  "tasks.workspace.shortcutDescription":
    "\nUtilizza le scorciatoie del workbench per la creazione rapida di attività, le modifiche alla scheda e il trasferimento dell'IA.",
  "tasks.workspace.bulkReassign": "\nRiassegnare lavoro senza proprietà",
  "tasks.workspace.bulkHandoff": "\nPrepara coda di trasferimento",
  "tasks.workspace.bulkCloseReady": "\nRivedi il lavoro quasi pronto",
  "tasks.workspace.wipTitle": "\nPostura WIP",
  "tasks.workspace.wipDescription":
    "\nTieni traccia della capacità in volo per corsia in modo che i lavori bloccati vengano intensificati prima che gli equipaggi si blocchino.",
  "tasks.workspace.wipHealthy": "\nIl flusso rientra nei limiti WIP attuali.",
  "tasks.workspace.wipAtRisk": "\nLe corsie {count} sono sopra gli attuali guardrail WIP.",
  "tasks.workspace.swimlaneTitle": "\nFocus corsia",
  "tasks.workspace.swimlaneDescription":
    "\nMantieni visibile il contesto corrente del sito e del proprietario mentre passi dalla modalità coda a quella scheda.",
  "tasks.workspace.clearFilterAria": "\nCancella filtro {label}",
  "tasks.workspace.unassignedValue": "\nNon assegnato",
  "tasks.workspace.aiConfidence": "\nFiducia nell'IA",
  "tasks.workspace.aiOriginLabel": "\nOrigine AI",
  "tasks.workspace.aiOrigin.prediction": "\nPronostico generato",
  "tasks.workspace.column.backlogDesc":
    "\nLavoro pronto prima che venga impegnata manodopera o capacità di calendario.",
  "tasks.workspace.column.scheduledDesc":
    "Lavoro impegnato organizzato per squadre, trasferimenti e finestre del sito.",
  "tasks.workspace.column.inProgressDesc":
    "\nEsecuzione del campo attivo che richiede la rimozione del blocco e il controllo dello SLA.",
  "tasks.workspace.column.completedDesc":
    "\nLavoro terminato in attesa di convalida, audit o trasferimento alle parti interessate.",
  "tasks.workspace.workflowTitle": "\nProgressione del flusso di lavoro",
  "tasks.workspace.moveTitle": "\nSposta attività",
  "tasks.workspace.empty.BACKLOG":
    "\nNessun elemento del backlog corrisponde alla sezione del set di dati corrente.",
  "tasks.workspace.empty.SCHEDULED":
    "\nNessun lavoro pianificato corrisponde alla sezione del set di dati corrente.",
  "tasks.workspace.empty.IN_PROGRESS":
    "\nNessun lavoro di esecuzione attivo corrisponde alla sezione del set di dati corrente.",
  "tasks.workspace.empty.COMPLETED":
    "\nNessun lavoro completato corrisponde alla sezione del set di dati corrente.",
  "tasks.workspace.queue.attention": "\nHa bisogno di attenzione",
  "tasks.workspace.queue.attentionDesc":
    "\nLavoro scaduto o a breve termine che richiede una decisione immediata da parte dell'operatore.",
  "tasks.workspace.queue.dispatch": "\nSpedizione e personale",
  "tasks.workspace.queue.dispatchDesc":
    "\nUtilizza questo elenco per assegnare il lavoro senza proprietà prima che diventi debito di flusso.",
  "tasks.workspace.queue.active": "\nIn esecuzione",
  "tasks.workspace.queue.activeDesc":
    "\nLavoro attualmente pianificato e in corso ordinato per data di scadenza e priorità.",
  "tasks.workspace.queue.closed": "\nCompletamenti recenti",
  "tasks.workspace.queue.closedDesc":
    "\nLavoro ultimato di recente per audit, trasferimento e follow-up.",
  "tasks.workspace.queue.empty": "\nQuesta coda è attualmente vuota per la sezione scelta.",
  "tasks.workspace.filteredEmpty.title": "\nNessun risultato corrisponde ai filtri",
  "tasks.workspace.filteredEmpty.description":
    "\nModifica i filtri o cancellali per rivedere le attività in questa corsia.",
  "tasks.workspace.recommendation.title": "\nRaccomandazione sul personale AI",
  "tasks.workspace.recommendation.confidenceLabel": "\nAffidabilità della raccomandazione",
  "tasks.workspace.recommendation.noMatch":
    "\nNessuna corrispondenza del personale ancora disponibile",
  "tasks.workspace.recommendation.assigneeRecommended": "\nCompito individuale consigliato",
  "tasks.workspace.recommendation.crewRecommended": "\nAssegnazione dell'equipaggio consigliata",
  "tasks.workspace.recommendation.reason.assigneeContinuity":
    "\nLa copertura {role} in {site} mantiene il contesto dell'attività corrente con {openTasks} attività attive.",
  "tasks.workspace.recommendation.reason.assigneeLoad":
    "\nLa copertura di {role} presso {site} ha il carico di lavoro attivo più leggero nelle attività di {openTasks}.",
  "tasks.workspace.recommendation.reason.crewEscalation":
    "\n{crew} copre {site} con un responsabile della manutenzione a rotazione per questa attività {taskType}.",
  "tasks.workspace.recommendation.reason.crewCapacity":
    "\n{crew} copre {site} con {memberCount} membri attivi e {openTasks} attività attive.",
  "tasks.workspace.recommendation.reason.noMatch":
    "\nNessuna copertura per il personale o i tecnici del sito è ancora configurata per {site}.",
  "tasks.workspace.test.completionCriterionSample":
    "\nVerificare la normalizzazione del flusso d'aria",
  "tasks.workspace.test.requiredPartSample": "\nPacchetto filtri",
  "tasks.workspace.chat.noSelection": "\nNessuna attività attualmente selezionata.",
  "tasks.workspace.chat.selection":
    "\nAttività selezionata {task}, stato {status}, priorità {priority}, proprietario {assignee}.",
  "tasks.workspace.chat.pageContext":
    "\nWorkbench delle attività nella vista {mode}. {stats}. {filters}. {task}.",
  "tasks.workspace.copilot.title": "\nCopilota AI",
  "tasks.workspace.copilot.subtitle":
    "\nLe azioni pronte per la richiesta rimangono legate al set di dati visibile e allo stato drill-through.",
  "tasks.workspace.copilot.description":
    "Mantieni l'assistente vicino al lavoro: riepiloga il carico di lavoro visibile, diagnostica i colli di bottiglia nel flusso o redige note di trasferimento senza lasciare il centro di comando.",
  "tasks.workspace.copilot.askAi": "\nChiedi ad AI",
  "tasks.workspace.copilot.openPrompt":
    "\nEsamina l'area di lavoro delle attività visibili e aiutami a decidere la prossima azione operativa.",
  "tasks.workspace.copilot.brief": "\nBrief operativo",
  "tasks.workspace.copilot.briefPrompt":
    "\nRiepiloga l'area di lavoro dell'attività {mode} corrente per la preimpostazione {preset}. Evidenzia le questioni urgenti, le carenze di personale e le azioni successive consigliate.",
  "tasks.workspace.copilot.bottleneck": "\nTrova colli di bottiglia",
  "tasks.workspace.copilot.bottleneckPrompt":
    "\nOsserva il carico di lavoro visibile delle attività e identifica i principali colli di bottiglia, gli ostacoli e i rischi WIP.",
  "tasks.workspace.copilot.handoff": "\nBozza di trasferimento",
  "tasks.workspace.copilot.handoffPrompt":
    "\nRedigere un conciso passaggio di consegne all'operatore per il carico di lavoro delle attività visibili, incluso cosa è cambiato, cosa è bloccato e cosa dovrebbe succedere dopo.",
  "tasks.workspace.copilot.executionPlan": "\nBozza del piano di esecuzione",
  "tasks.workspace.copilot.executionPlanPrompt":
    "\nCrea un piano di esecuzione per l'attività {task} sulla risorsa {asset} nel sito {site}. Includere sequenziamento, bloccanti da controllare e passaggi di comunicazione.",
  "tasks.workspace.copilot.blockers": "\nAnalizza bloccanti",
  "tasks.workspace.copilot.blockersPrompt":
    "\nAnalizza i probabili ostacoli, i dati mancanti e i punti di rischio per l'attività {task}.",
  "tasks.workspace.copilot.statusUpdate": "\nBozza di aggiornamento dello stato",
  "tasks.workspace.copilot.statusUpdatePrompt":
    "\nScrivi un aggiornamento di stato conciso per l'attività {task}. Lo stato attuale del flusso di lavoro è {status}.",
  "predictions.title": "\nFeed pronostici",
  "predictions.subtitle":
    "\nSegnali di manutenzione e di rischio del ciclo di vita generati dall'intelligenza artificiale",
  "predictions.filter.severity": "\nGravità",
  "predictions.filter.severity.all": "\nTutti",
  "predictions.filter.severity.info": "\nInformazioni",
  "predictions.filter.severity.warning": "\nAvviso",
  "predictions.filter.severity.critical": "\nCritico",
  "predictions.filter.severity.emergency": "\nEmergenza",
  "predictions.filter.site": "\nSito",
  "predictions.filter.site.allSites": "\nTutti i siti",
  "predictions.filter.site.northTraining": "\nSito di addestramento nord",
  "predictions.filter.site.westCompound": "\nComplesso ovest",
  "predictions.filter.assetType": "\nTipo di risorsa",
  "predictions.filter.assetType.all": "\nTutti i tipi",
  "predictions.filter.assetType.electrical": "\nElettrico",
  "predictions.filter.assetType.plumbing": "\nImpianti idraulici",
  "predictions.filter.assetType.hvac": "Climatizzazione",
  "predictions.feed.title": "\nCoda pronostici in tempo reale",
  "predictions.feed.reasoning": "\nRagionamento",
  "predictions.feed.remainingLife": "\nVita rimanente",
  "predictions.feed.confidence": "\nFiducia",
  "predictions.feed.expand": "\nEspandi catena",
  "predictions.feed.generatorFailureTitle": "\nFinestra di guasto del generatore A-21",
  "predictions.feed.pumpCollapseTitle": "\nCollasso pressione pompa P-08",
  "predictions.feed.generatorRemainingLife": "\n14 giorni",
  "predictions.feed.pumpRemainingLife": "\n6 giorni",
  "predictions.feed.generatorConfidence": "86% (esempio)",
  "predictions.feed.pumpConfidence": "93% (esempio)",
  "predictions.reasoning.title": "\nCatena di ragionamento",
  "predictions.reasoning.subtitle": "\nRiepilogo, contesto e raccomandazione del modello",
  "predictions.reasoning.list.variance":
    "\nLa varianza della telemetria ha superato il valore di riferimento mobile del 42%.",
  "predictions.reasoning.list.seal":
    "\nLa cronologia della manutenzione indica ripetuti modelli di degrado della tenuta.",
  "predictions.reasoning.list.action":
    "\nAzione consigliata: creazione automatica dell'attività di sostituzione della bozza entro 48 ore.",
  "predictions.reasoning.placeholder":
    "\nLa traccia del ragionamento verrà trasmessa in streaming quando saranno disponibili le previsioni.",
  "predictions.reasoning.asset": "\nRisorsa",
  "predictions.reasoning.model": "\nModello",
  "predictions.reasoning.confidence": "\nFiducia",
  "predictions.type.failure": "\nErrore",
  "predictions.type.degradation": "\nDegrado",
  "predictions.type.maintenanceDue": "\nManutenzione dovuta",
  "predictions.type.lifecycleEnd": "\nFine del ciclo di vita",
  "predictions.workspace.eyebrow": "\nComando rischio AI",
  "predictions.workspace.title":
    "\nPrevisione, inventario e flusso di azioni in un'unica superficie di controllo",
  "predictions.workspace.description":
    "Un'area di lavoro in stile Power BI per classificare i segnali di rischio dell'intelligenza artificiale in tempo reale rispetto all'inventario delle risorse, al backlog operativo e alla pressione di approvvigionamento o smaltimento a valle.",
  "predictions.workspace.live": "\nSi aggiorna ogni {seconds}s",
  "predictions.workspace.filtersTitle": "\nBarra dei comandi filtro",
  "predictions.workspace.filtersDescription":
    "\nCerca risorse e restringi la previsione corrente impostata per gravità, sito, tipo di risorsa e attualità della previsione.",
  "predictions.workspace.searchLabel": "\nCerca inventario",
  "predictions.workspace.searchPlaceholder": "\nFiltra per nome risorsa o sito",
  "predictions.workspace.legendDescription":
    "\nI colori della gravità rimangono coerenti nelle schede in evidenza, nella griglia dell'inventario e nella barra di spiegabilità.",
  "predictions.workspace.methodologyTitle": "\nModello di classifica",
  "predictions.workspace.methodologyDescription":
    "\nI punteggi combinano l'urgenza dell'intelligenza artificiale con l'inventario, il flusso di lavoro e il flusso commerciale in modo che gli operatori possano lavorare da un'unica coda.",
  "predictions.workspace.methodologyItemSignals":
    "\nLa fiducia dell'intelligenza artificiale, il tipo di previsione e le finestre di vita residua determinano l'urgenza operativa di base.",
  "predictions.workspace.methodologyItemInventory":
    "\nIl valore dell'inventario, le condizioni degli asset e la fase del ciclo di vita aumentano la pressione sugli asset ad alta esposizione.",
  "predictions.workspace.methodologyItemWorkflow":
    "\nLe attività aperte e l'attività attiva di approvvigionamento o smaltimento determinano le azioni successive.",
  "predictions.workspace.panelTitle": "\nCentro di comando del rischio",
  "predictions.workspace.panelDescription":
    "\nMonitora i segnali più forti dell'intelligenza artificiale, la loro esposizione all'inventario e il flusso operativo che si sta già sviluppando attorno a loro.",
  "predictions.workspace.generatedAt": "\nAggiornato {generatedAt}",
  "predictions.workspace.kpi.activeSignals": "\nSegnali attivi",
  "predictions.workspace.kpi.activeSignalsHint":
    "\nPrevisioni IA filtrate attualmente nella coda aziendale.",
  "predictions.workspace.kpi.activeSignalsTrend": "\n{count} critico o emergenza",
  "predictions.workspace.kpi.dueSoon": "\nA breve",
  "predictions.workspace.kpi.dueSoonHint":
    "\nSegnalazioni la cui vita residua è all'interno della soglia di intervento.",
  "predictions.workspace.kpi.inventoryExposure": "\nEsposizione inventario",
  "predictions.workspace.kpi.inventoryExposureHint":
    "\nValore contabile rappresentato dall'insieme di previsioni filtrate.",
  "predictions.workspace.kpi.aiCoverage": "\nCopertura AI",
  "predictions.workspace.kpi.aiCoverageHint":
    "\nRisorse nella porzione di inventario corrente con cronologia delle previsioni.",
  "predictions.workspace.kpi.averageConfidenceTrend": "\n{confidence}% confidenza media",
  "predictions.workspace.kpi.liveTrend": "\nDal {generatedAt}",
  "predictions.workspace.distribution.severity": "\nMix di gravità",
  "predictions.workspace.distribution.assetMix": "\nMix di risorse",
  "predictions.workspace.distribution.siteMix": "\nMix di siti",
  "predictions.workspace.boardTitle": "\nTabellone dei rischi classificato",
  "predictions.workspace.boardDescription":
    "\nI segnali più forti relativi a guasti, degrado, manutenzione e pressione del ciclo di vita, classificati in base all'urgenza e all'impatto aziendale.",
  "predictions.workspace.boardEmpty":
    "\nNon sono ancora disponibili previsioni filtrate. Espandi i filtri o attendi l'arrivo di altri dati di telemetria.",
  "predictions.workspace.table.title": "\nGriglia del rischio di inventario",
  "predictions.workspace.table.description":
    "Una fitta griglia di operatori per la scansione dell'esposizione delle risorse, della pressione del flusso di lavoro e della successiva azione di spiegabilità.",
  "predictions.workspace.table.asset": "\nRisorsa",
  "predictions.workspace.table.severity": "\nSegnale",
  "predictions.workspace.table.inventory": "\nInventario",
  "predictions.workspace.table.workflow": "\nFlusso di lavoro",
  "predictions.workspace.table.inspect": "\nApri prova",
  "predictions.workspace.tableEmpty":
    "\nNessuna riga dell'inventario corrisponde al set di filtri corrente.",
  "predictions.workspace.railTitle": "\nSpiegabilità rail",
  "predictions.workspace.railDescription":
    "\nUn brief conciso sull'intelligenza artificiale più il modello del segnale selezionato, i dati di origine e le prove operative di supporto.",
  "predictions.workspace.assistant.title": "\nBrief sulle operazioni IA",
  "predictions.workspace.assistant.description":
    "\nUn breve riepilogo aziendale basato sul set di dati di previsione attivo e sul segnale selezionato.",
  "predictions.workspace.assistant.sourceAI": "\nBrief sull'IA",
  "predictions.workspace.assistant.sourceSystem": "\nBrief di sistema",
  "predictions.workspace.assistant.generatedAt": "\nGenerato {generatedAt}",
  "predictions.workspace.chatContext":
    "\nCentro di controllo dei pronostici. Spazio di lavoro unificato per segnali di rischio dell'intelligenza artificiale, esposizione alle scorte, arretrato operativo e pressione sugli approvvigionamenti a valle. Controlli: ricerca, gravità, sito, tipo di risorsa e intervallo di date. Sezioni principali: striscia KPI, scheda dei rischi classificati, griglia dell'inventario e barra delle prove AI.",
  "predictions.workspace.assistant.headlineCritical":
    "\nIl rischio critico sta definendo la postura operativa",
  "predictions.workspace.assistant.headlineMonitor":
    "\nLe finestre di intervento si stanno comprimendo nella coda",
  "predictions.workspace.assistant.headlineStable": "\nLa coda è attiva ma ampiamente controllata",
  "predictions.workspace.assistant.fallbackLead":
    "\n{asset} al {site} è il candidato principale all'intervento con {days} giorni di vita rimanente al {confidence}% di confidenza.",
  "predictions.workspace.assistant.fallbackEmpty":
    "\nNessuna previsione dominante è in testa alla coda filtrata in questo momento. Mantieni sana la copertura della telemetria e monitora i nuovi segnali non appena arrivano.",
  "predictions.workspace.assistant.fallbackCoverage":
    "\nLa sezione corrente contiene {signals} segnali in tempo reale che rappresentano circa {exposure} di esposizione dell'inventario, con finestre di intervento {dueSoon} già all'interno della soglia a breve termine.",
  "predictions.workspace.card.score": "\nPunteggio",
  "predictions.workspace.card.scoreValue": "\nPunteggio {score}",
  "predictions.workspace.card.remainingLifeValue": "\n{days} giorni",
  "predictions.workspace.card.inventory": "\nInventario",
  "predictions.workspace.card.signalCoverage": "\nDati di origine",
  "predictions.workspace.card.signalCoverageValue": "\n{count} gruppi di funzionalità",
  "predictions.workspace.card.openTasksValue": "\n{count} attività aperte",
  "predictions.workspace.card.workOrdersValue": "\n{count} ordini di lavoro attivi",
  "predictions.workspace.card.documentsValue": "\n{count} apri documenti",
  "predictions.workspace.card.generatedTask": "\nAttività generata",
  "predictions.workspace.action.escalate":
    "\nPassare immediatamente alla leadership della manutenzione e convalidare la capacità di intervento entro la finestra operativa successiva.",
  "predictions.workspace.action.procure":
    "\nConferma la copertura delle parti, allinea l'approvvigionamento e sposta la risorsa nel successivo slot di intervento disponibile.",
  "predictions.workspace.action.schedule":
    "Pianifica la revisione della manutenzione e verifica che il backlog e il piano dell'inventario possano assorbire il segnale prima che si indurisca.",
  "predictions.workspace.action.monitor":
    "\nMantieni stabile la raccolta di telemetria, esamina la linea di tendenza delle risorse e monitora un ulteriore peggioramento prima di inviare il lavoro.",
  "predictions.workspace.detail.evidence": "\nEvidenze operative",
  "predictions.workspace.detail.evidenceDescription":
    "\nProve deterministiche raccolte da set di dati di risorse, flusso di lavoro e documenti transazionali attorno al segnale selezionato.",
  "predictions.workspace.detail.sourceData": "\nDati di origine e metadati del modello",
  "predictions.workspace.detail.sourceDataDescription":
    "\nGruppi di funzionalità acquisiti dal payload di input archiviato, insieme ai metadati del modello e del fornitore.",
  "predictions.workspace.detail.lifecycle": "\nCiclo di vita",
  "predictions.workspace.detail.condition": "\nCondizione",
  "predictions.workspace.detail.generatedAt": "\nGenerato alle",
  "predictions.workspace.detail.openTasksEvidence":
    "\n{count} attività di manutenzione attive sono già aperte per questa risorsa.",
  "predictions.workspace.detail.noOpenTasksEvidence":
    "\nNessuna attività di manutenzione attiva è attualmente collegata a questa risorsa.",
  "predictions.workspace.detail.workOrdersEvidence":
    "\n{count} gli ordini di lavoro attivi sono già collegati a questa risorsa.",
  "predictions.workspace.detail.customerOrdersEvidence":
    "\nGli ordini dei clienti {count} stanno attualmente fluendo attraverso questo contesto di risorsa.",
  "predictions.workspace.detail.purchaseOrdersEvidence":
    "\nGli ordini di acquisto {count} sono ancora aperti nel contesto di questo asset.",
  "predictions.workspace.detail.invoicesEvidence":
    "\nLe fatture {count} comportano ancora pressioni di riscossione o di evasione per questo contesto di risorsa.",
  "predictions.workspace.detail.noDocumentEvidence":
    "\nNessun ordine di lavoro, ordine cliente, ordine di acquisto o fattura collegato è attualmente aperto.",
  "predictions.workspace.detail.createdEvidence": "\nSegnale generato {generatedAt}.",
  "predictions.workspace.outcomeTitle": "\nRisultati dalla promozione all'azione",
  "predictions.workspace.outcomeDescription":
    "\nSposta il segnale più forte nell'attività, nell'approvvigionamento o nel monitoraggio del follow-through.",
  "finance.title": "\nFinanza",
  "finance.subtitle": "\nEsposizione al deprezzamento e valutazioni corrette per AI",
  "financePlanning.title": "\nPianificazione finanziaria",
  "financePlanning.subtitle":
    "\nPosizione del budget, pressione del capitale e pianificazione del ciclo di vita",
  "financePlanning.coverage":
    "\nUtilizza la situazione attuale di asset, sito, documento e previsione come base di riferimento per la pianificazione del budget e dello scenario.",
  "financePlanning.kpi.assets": "\nRisorse monitorate",
  "financePlanning.kpi.assetsDesc":
    "\nAsset che possono essere inseriti negli scenari di pianificazione",
  "financePlanning.kpi.sites": "\nSiti nell'ambito",
  "financePlanning.kpi.sitesDesc": "\nSedi che contribuiscono alla pianificazione del budget",
  "financePlanning.kpi.openDocuments": "\nApri documenti",
  "financePlanning.kpi.openDocumentsDesc":
    "\nDocumenti transazionali attualmente attivi tra domanda, consegna, acquisto e fatturazione",
  "financePlanning.kpi.dueSoon": "\nA breve segnali",
  "financePlanning.kpi.dueSoonDesc":
    "\nSegnali che possono trasformarsi in domanda di sostituzione",
  "financePlanning.summary.alertTitle":
    "\nLa strategia di pianificazione può già essere basata sui dati di portafoglio in tempo reale",
  "financePlanning.summary.alertDescription":
    "Utilizza profili di pianificazione del sito, indicatori di risorse con scadenza imminente, documenti pronti per l'esecuzione e report salvati per organizzare budget e scenari senza uno stack di pianificazione separato.",
  "financePlanning.summary.tab.readiness": "\nProntezza",
  "financePlanning.summary.tab.handoff": "\nTrasferimento",
  "financePlanning.summary.tab.intake": "\nAssunzione interdominio",
  "financePlanning.summary.siteTitle": "\nPreparazione alla pianificazione del sito",
  "financePlanning.summary.siteDescription":
    "\nI profili di pianificazione rappresentano la struttura attuale per integrare la struttura, la flotta e il contesto operativo nelle decisioni finanziarie.",
  "financePlanning.summary.siteProfiles": "\nProfili di pianificazione",
  "financePlanning.summary.siteProfilesDesc":
    "\nI siti {total} sono attualmente disponibili per la pianificazione.",
  "financePlanning.summary.assetScope": "\nPortafoglio in ambito",
  "financePlanning.summary.assetScopeDesc":
    "\nL'attuale base di risorse gestite è già sufficientemente ampia da supportare porzioni di pianificazione basate su scenari.",
  "financePlanning.summary.postureTitle": "\nPostura di prontezza",
  "financePlanning.summary.postureDescription":
    "\nPromuovi insieme il contesto di pianificazione del sito, i documenti pronti per l'esecuzione e i segnali di rischio in modo che la pianificazione finanziaria diventi un flusso di lavoro connesso anziché un'esportazione di fogli di calcolo.",
  "financePlanning.summary.badgeSites": "\nSiti",
  "financePlanning.summary.badgeDocuments": "\nDocumenti",
  "financePlanning.summary.badgeSignals": "\nSegnali",
  "financePlanning.summary.pressureTitle": "\nPressione di capitale in scadenza a breve",
  "financePlanning.summary.pressureDesc":
    "\nLe previsioni all'interno della finestra a breve termine sono l'attuale indicatore anticipatore del budget e della domanda di sostituzione.",
  "financePlanning.summary.documentsTitle": "\nDocumenti pronti per l'esecuzione",
  "financePlanning.summary.documentsDesc":
    "\nI documenti operativi approvati ed emessi sono già organizzati per la consegna, l'acquisto e il follow-through degli incassi.",
  "financePlanning.summary.reportTitle": "\nOutput di pianificazione salvati",
  "financePlanning.summary.reportDesc":
    "\nI report salvati rappresentano l'attuale superficie di trasferimento per il confezionamento delle parti interessate e la revisione della pianificazione.",
  "financePlanning.summary.intakeTitle": "\nAssunzione di pianificazione interdominio",
  "financePlanning.summary.intakeDescription":
    "\nLa pianificazione finanziaria è ora la superficie di raccolta per la domanda operativa catturata nella flotta, negli edifici e nei sensori.",
  "financePlanning.summary.intakeFleetTitle":
    "\nIniziative della flotta in attesa del confezionamento dello scenario",
  "financePlanning.summary.intakeFleetDesc":
    "\nLe iniziative di sostituzione, conformità e manutenzione dei veicoli possono ora essere conteggiate come input di finanziamento diretto.",
  "financePlanning.summary.intakeBuildingsTitle":
    "\nIniziative per le strutture pronte per la definizione del budget",
  "financePlanning.summary.intakeBuildingsDesc":
    "\nSono disponibili iniziative sul sistema edilizio e sullo spazio per la definizione degli scenari operativi e di capitale.",
  "financePlanning.summary.intakeSensorsTitle":
    "\nAvvisi del sensore che segnalano la pressione di pianificazione",
  "financePlanning.summary.intakeSensorsDesc":
    "\nLe regole di avviso del sensore identificano le condizioni di telemetria che possono giustificare l'intervento, i ricambi o il budget per la sostituzione.",
  "financePlanning.summary.intakeAlert":
    "Utilizza questa corsia di immissione per trasformare il lavoro operativo in scenari di pianificazione senza modificare nuovamente lo stesso contesto decisionale.",
  "financePlanning.summary.intakeTotal": "\nSegnali operativi in entrata",
  "financePlanning.summary.intakeTotalDesc":
    "\nIniziative e regole intersettoriali attualmente disponibili per essere tradotte in scenari di pianificazione finanziaria.",
  "financePlanning.summary.scenarioDrafts": "\nScenari sul ponte",
  "financePlanning.summary.scenarioDraftsDesc":
    "\nScenari di pianificazione esistenti già acquisiti nell'area di lavoro di pianificazione finanziaria.",
  "financePlanning.summary.badgeFleet": "\nFlotta",
  "financePlanning.summary.badgeBuildings": "\nEdifici",
  "financePlanning.summary.badgeSensors": "\nSensori",
  "financePlanning.summary.intakePosture":
    "\nL'area di lavoro di pianificazione finanziaria può ora fungere da punto di passaggio condiviso tra l'acquisizione di iniziative operative e la definizione del budget a livello di portafoglio.",
  "financePlanning.seed.ready": "\nPronto per la semina",
  "financePlanning.seed.empty":
    "\nNessun segnale di pianificazione è ancora disponibile per il seeding.",
  "financePlanning.seed.count": "\n{count} segnali in aspirazione",
  "financePlanning.seed.apply": "\nScenario seme",
  "financePlanning.seed.unavailable": "\nNessun seme disponibile",
  "financePlanning.seed.applied": "\n{source} contesto copiato nel modulo scenario.",
  "financePlanning.seed.fleet.title": "\nSeme dalla flotta",
  "financePlanning.seed.fleet.description":
    "\nUtilizza l'ultima iniziativa della flotta per precompilare uno scenario di pianificazione con ambito, urgenza e note operative.",
  "financePlanning.seed.buildings.title": "\nSeme da edifici",
  "financePlanning.seed.buildings.description":
    "\nUtilizza l'ultima iniziativa relativa alle strutture per precompilare il capitale o il contesto di pianificazione operativa.",
  "financePlanning.seed.sensors.title": "\nSeme da sensori",
  "financePlanning.seed.sensors.description":
    "\nUtilizza la più recente regola di avviso del sensore per trasformare la pressione della telemetria in uno scenario di pianificazione iniziale.",
  "financePlanning.seed.fleetPrefix": "\nTrasferimento flotta",
  "financePlanning.seed.fleetContext":
    "\nSeminato dall'iniziativa della flotta. Categoria: {category}. Priorità: {priority}.",
  "financePlanning.seed.fleetSummary": "\nUltima iniziativa flotta aggiornata {updatedAt}.",
  "financePlanning.seed.buildingsPrefix": "\nTrasferimento delle strutture",
  "financePlanning.seed.buildingsContext":
    "\nSeminato dall'iniziativa delle strutture. Categoria: {category}. Fase: {phase}.",
  "financePlanning.seed.buildingsSummary": "\nUltima iniziativa strutture aggiornata {updatedAt}.",
  "financePlanning.seed.sensorsPrefix": "\nTrasferimento del sensore",
  "financePlanning.seed.sensorsContext":
    "\nSeminato dalla regola di avviso del sensore. Serie: {seriesKey}. Comparatore: {comparator}. Soglia: {threshold}. Gravità: {severity}.",
  "financePlanning.seed.sensorsSummary":
    "\nUltima regola di avviso del sensore aggiornata {updatedAt}.",
  "financePlanning.form.title": "\nCrea uno scenario di pianificazione",
  "financePlanning.form.description":
    "\nCattura il prossimo scenario di budget o di capitale direttamente dalla pianificazione in tempo reale, quindi trasferiscilo nella finanza, nei flussi di lavoro dei documenti e nei flussi di reporting.",
  "financePlanning.form.badge": "\nFlusso SSR durevole",
  "financePlanning.form.nameLabel": "\nTitolo dello scenario",
  "financePlanning.form.namePlaceholder": "\nAggiornamento HVAC del campus 2027",
  "financePlanning.form.nameHint":
    "\nAssegna un nome al pacchetto decisionale che gli operatori riconosceranno in seguito.",
  "financePlanning.form.scopeLabel": "\nAmbito",
  "financePlanning.form.scopePlaceholder": "Edifici, flotta, sensori o porzione di portafoglio",
  "financePlanning.form.scopeHint":
    "\nMantieni l'ambito allineato a un dipartimento, un gruppo di siti o un tema di portfolio.",
  "financePlanning.form.horizonLabel": "\nOrizzonte di pianificazione",
  "financePlanning.form.horizonHint": "\n{min}-{max} mesi, a seconda del ciclo di pianificazione.",
  "financePlanning.form.horizonUnit": "\nmesi",
  "financePlanning.form.horizonValue": "\n{months} mesi",
  "financePlanning.form.notesLabel": "\nNote e ipotesi",
  "financePlanning.form.notesPlaceholder":
    "\nCattura le ipotesi di spesa, i vincoli temporali, la posizione di rischio e cosa dovrebbe essere spostato successivamente nell'approvvigionamento o nel reporting.",
  "financePlanning.form.notesHint":
    "\nUtilizzalo per registrare il ragionamento che dovrebbe sopravvivere nelle approvazioni e nei pacchetti di rapporti.",
  "financePlanning.form.requiredHint": "\nTitolo, ambito e orizzonte sono obbligatori.",
  "financePlanning.form.submit": "\nSalva scenario",
  "financePlanning.form.submitAria": "\nSalva scenario di pianificazione finanziaria",
  "financePlanning.form.recentTitle": "\nScenari recenti",
  "financePlanning.form.recentDescription":
    "\nQuesti scenari vengono ora mantenuti come record di pianificazione finanziaria durevole senza uscire dal flusso SSR.",
  "financePlanning.form.empty":
    "\nNessuno scenario di pianificazione finanziaria ancora acquisito.",
  "financePlanning.form.savedAt": "\nAggiornato {updatedAt}",
  "financePlanning.form.notesEmpty": "\nNessuna nota ancora catturata.",
  "financePlanning.validation.titleRequired": "Il titolo dello scenario e obbligatorio.",
  "financePlanning.validation.scopeRequired": "\nL'ambito dello scenario è obbligatorio.",
  "financePlanning.validation.seedSourceInvalid":
    "\nLa fonte del seme deve provenire da flotta, edifici o sensori.",
  "financePlanning.validation.horizonRange":
    "\nL'orizzonte di pianificazione deve essere compreso tra {min} e {max} mesi.",
  "financePlanning.feedback.draftSaved":
    "\nScenario finanziario salvato nell'area di lavoro di pianificazione finanziaria.",
  "financePlanning.feedback.draftSaveFailed":
    "\nImpossibile mantenere lo scenario finanziario in questo momento.",
  "financePlanning.status.draft": "\nScenario",
  "financePlanning.draft.promoteReports": "Apri nei report",
  "financePlanning.readiness.assets":
    "\nLa struttura delle risorse e del sito alimenta già l'ambito della pianificazione.",
  "financePlanning.readiness.documents":
    "\nLe richieste di offerta, gli ordini, gli ordini di lavoro, gli ordini di acquisto e le fatture possono essere inseriti direttamente nelle decisioni dello scenario.",
  "financePlanning.readiness.reporting":
    "\nLe attuali superfici di reporting possono raggruppare i risultati della pianificazione senza un nuovo stack.",
  "financePlanning.page.eyebrow": "Finanza",
  "financePlanning.action.createScenario": "Crea scenario",
  "financePlanning.action.finance":
    "\nEsaminare l'esposizione all'ammortamento in tempo reale prima di modificare il piano.",
  "financePlanning.action.documents":
    "\nTrasferisci le decisioni relative agli scenari negli spazi di lavoro dei documenti per preventivi, ordini e follow-through degli acquisti.",
  "financePlanning.action.reports":
    "\nPosizione di pianificazione del pacchetto in pacchetti di report rivolti alle parti interessate.",
  "financePlanning.action.fleet":
    "\nCollegare la domanda e la pressione di sostituzione alle operazioni del veicolo.",
  "financePlanning.action.buildings":
    "\nSegui la pressione del capitale nelle strutture e nella copertura del sistema edilizio.",
  "financePlanning.action.sensors":
    "\nUtilizza il sensore e la postura di allerta per verificare la disponibilità dei test di pressione e le ipotesi di pianificazione.",
  "estate.title": "\nImmobiliare",
  "estate.subtitle":
    "Governance del portafoglio, garanzia del servizio, preparazione e controlli del programma",
  "estate.coverage":
    "\nUn piano di controllo patrimoniale autorevole per registro, governance FM, preparazione, partnership, gestione e azioni di reporting.",
  "estate.kpi.assets": "\nBeni registrati",
  "estate.kpi.assetsDesc":
    "\nCopertura attuale del registro dei beni immobiliari in tutte le classi di beni gestiti.",
  "estate.kpi.facilities": "\nSiti di strutture",
  "estate.kpi.facilitiesDesc":
    "\nSiti già contrassegnati come strutture all'interno della gerarchia immobiliare.",
  "estate.kpi.workOrders": "\nOrdini di lavoro attivi",
  "estate.kpi.workOrdersDesc":
    "\nLa consegna operativa è attualmente in fase di esecuzione di FM ed esecuzione patrimoniale.",
  "estate.kpi.approvals": "\nApprovazioni in sospeso",
  "estate.kpi.approvalsDesc":
    "\nIniziative immobiliari e approvazioni di progetti attualmente in attesa di avanzamento attraverso la governance.",
  "estate.summary.alertTitle":
    "\nLa governance patrimoniale ora si trova su sistemi operativi live di registrazione",
  "estate.summary.alertDescription":
    "\nUtilizza il registro corrente, il flusso di consegna FM, il grafico dei documenti commerciali e i controlli di approvazione per gestire la governance, la garanzia e la preparazione del portafoglio da un'unica superficie immobiliare connessa.",
  "estate.summary.tab.registry": "\nRegistro",
  "estate.summary.tab.delivery": "\nErogazione del servizio",
  "estate.summary.tab.maintenance": "\ngovernance FM",
  "estate.summary.tab.readiness": "\nProntezza",
  "estate.summary.tab.partnerships": "\nTerreno e soci",
  "estate.summary.tab.stewardship": "\nGestione",
  "estate.summary.tab.operations": "\nIntervalli e GFE",
  "estate.summary.tab.strategy": "\nStrategia",
  "estate.summary.tab.programme": "\nProgramma",
  "estate.summary.registryTitle": "\nPreparazione del registro delle risorse",
  "estate.summary.registryDescription":
    "\nLa copertura di asset e strutture ora fornisce la gerarchia patrimoniale autorevole per la governance del portafoglio, la garanzia e la revisione degli investimenti.",
  "estate.summary.registryAssets": "\nAsset nell'ambito",
  "estate.summary.registryAssetsDesc":
    "\nLe strutture {total} attualmente si trovano all'interno dell'area gestita.",
  "estate.summary.registryTelemetry": "\nRisorse collegate alla telemetria",
  "estate.summary.registryTelemetryDesc":
    "\nLe risorse connesse forniscono condizioni in tempo reale e contesto di utilizzo per la definizione delle priorità.",
  "estate.summary.registryHierarchy": "\nRisorse mappate gerarchicamente",
  "estate.summary.registryHierarchyDesc":
    "\n{coverage} del registro ora riporta un posizionamento esplicito nella gerarchia patrimoniale.",
  "estate.summary.registryCapability": "\nAsset collegati alle capacità",
  "estate.summary.registryCapabilityDesc":
    "\n{coverage} del registro ora nomina la capacità operativa supportata da ciascuna risorsa.",
  "estate.summary.postureTitle": "\nControlla la postura",
  "estate.summary.postureDescription":
    "\nMantieni allineati la copertura delle risorse, i segnali operativi in tempo reale e le iniziative durevoli in modo che la gestione strategica del patrimonio rimanga collegata all'esecuzione.",
  "estate.summary.badgeIso": "ISO 55001 conforme",
  "estate.summary.badgeFm": "\nConsegna FM",
  "estate.summary.badgeP3m": "Livello P3M",
  "estate.summary.deliveryTitle": "\nErogazione del servizio operativo",
  "estate.summary.deliveryDescription":
    "L'esecuzione concreta del FM, l'attività contrattuale e i documenti a valle mostrano l'attuale pressione di consegna nel modello operativo immobiliare.",
  "estate.summary.deliveryOpenWorkOrders": "\nOrdini di lavoro aperti",
  "estate.summary.deliveryOpenWorkOrdersDesc":
    "\nEsecuzione attualmente attiva nel flusso di manutenzione, garanzia e ripristino.",
  "estate.summary.deliveryOverdueWorkOrders": "\nOrdini di lavoro scaduti",
  "estate.summary.deliveryOverdueWorkOrdersDesc":
    "\nLavoro programmato già al di fuori delle date previste e che richiede attenzione di mitigazione.",
  "estate.summary.deliveryDocuments": "\nDocumenti operativi attivi",
  "estate.summary.deliveryDocumentsDesc":
    "\nRichieste di offerta, ordini, ordini di acquisto, fatture e ordini di lavoro continuano a spostarsi nel grafico del contratto.",
  "estate.summary.deliveryExecutionReady": "\nDocumenti pronti per l'esecuzione",
  "estate.summary.deliveryExecutionReadyDesc":
    "\nDocumenti che hanno già superato l'acquisizione e possono favorire l'attività di consegna o fatturazione.",
  "estate.summary.maintenanceAlertTitle":
    "\nLa governance dura e quella morbida del FM ora si trovano all'interno dello stesso spazio di lavoro immobiliare strategico",
  "estate.summary.maintenanceAlertDescription":
    "\nUtilizzare un registro duraturo per i programmi SFG20, le ispezioni statutarie, le revisioni di garanzia, i servizi FM soft e i segnali di riferimento invece di separare la governance FM dal quadro patrimoniale più ampio.",
  "estate.summary.maintenanceTitle": "\nPosizione di governance del FM",
  "estate.summary.maintenanceDescription":
    "\nTieni traccia della manutenzione pianificata, dell'ispezione legale, della fornitura di servizi FM soft e della pressione di riferimento senza uscire dal livello di controllo della proprietà SSR.",
  "estate.summary.maintenanceRegister": "\nRegistro della governance FM",
  "estate.summary.maintenanceRegisterDesc":
    "\nI record {count} attualmente necessitano di un intervento di conformità o di consegna.",
  "estate.summary.maintenanceHardFm": "\nControlli FM rigidi",
  "estate.summary.maintenanceHardFmDesc":
    "\nLe {count} ispezioni legali sono attualmente conservate nel registro di manutenzione.",
  "estate.summary.maintenanceSoftFm": "\nControlli FM morbidi",
  "estate.summary.maintenanceSoftFmDesc":
    "\n{count} I record di benchmarking attualmente confrontano l'output del servizio e il livello di produttività.",
  "estate.summary.maintenancePerformance": "\nPrestazioni del servizio",
  "estate.summary.maintenancePerformanceDesc":
    "\n{count} I record di servizio programmati attualmente modellano il calendario operativo FM.",
  "estate.summary.maintenancePerformanceEmpty": "\nNessun punteggio ancora",
  "estate.summary.maintenancePerformanceValue": "\n{score}% punteggio medio",
  "estate.summary.readinessAlertTitle":
    "\nLa preparazione dell'immobile ora riflette il grafico operativo in tempo reale",
  "estate.summary.readinessAlertDescription":
    "\nLe risorse di capacità legate all'intervallo, i vincoli infrastrutturali, il debito di ispezione, l'attività della forza lavoro e il rischio di progetto sono combinati in un'unica visualizzazione di preparazione SSR.",
  "estate.summary.readinessTitle": "\nPosizione di preparazione immobiliare",
  "estate.summary.readinessDescription":
    "Utilizza questo livello di preparazione per monitorare la disponibilità della gamma, i vincoli infrastrutturali, il livello di capacità e l'impatto della forza lavoro senza uscire dal piano di controllo della proprietà.",
  "estate.summary.readinessRangeAvailability": "\nDisponibilità della gamma",
  "estate.summary.readinessRangeAvailabilityDesc":
    "\n{total} Le risorse collegate all'intervallo e all'addestramento sono attualmente monitorate per il monitoraggio della preparazione.",
  "estate.summary.readinessConstraints": "\nVincoli infrastrutturali",
  "estate.summary.readinessConstraintsDesc":
    "\n{assets} beni vincolati e {projects} progetti ad alto rischio stanno attualmente contribuendo alla pressione patrimoniale.",
  "estate.summary.readinessCapability": "\nDisponibilità delle capacità",
  "estate.summary.readinessCapabilityDesc":
    "\nI raggruppamenti di capacità {watch} rimangono sotto sorveglianza nei raggruppamenti di disponibilità monitorati {total}.",
  "estate.summary.readinessWorkforce": "\nOre di lavoro registrate",
  "estate.summary.readinessWorkforceDesc":
    "\n{inspections} le attività di ispezione scadute rimangono aperte rispetto al quadro attuale della disponibilità.",
  "estate.summary.programmeTitle": "\nProgramma e flusso di approvazione",
  "estate.summary.programmeDescription":
    "\nLe iniziative patrimoniali, i registri dei progetti, le fasi di approvazione e gli scenari finanziari forniscono l'attuale passaggio alla consegna P3M, alla revisione DIO e al reporting del programma.",
  "estate.summary.programmeInitiatives": "\nIniziative immobiliari",
  "estate.summary.programmeInitiativesDesc":
    "\nRecord di programmi durevoli ora acquisiti nell'area di lavoro dell'estate.",
  "estate.summary.programmeProjects": "\nRegistro progetti",
  "estate.summary.programmeProjectsDesc":
    "\nI progetti immobiliari durevoli ora registrano il tipo di consegna, la situazione dei costi, la pressione delle risorse e lo stato di approvazione.",
  "estate.summary.programmeApprovalQueue": "\nApprovazioni progetto",
  "estate.summary.programmeApprovalQueueDesc":
    "\n{delayed} gli elementi ritardati rimangono attualmente nella coda di approvazione del progetto attivo.",
  "estate.summary.programmeControls": "\nControlli del progetto",
  "estate.summary.programmeControlsDesc":
    "\nGli elementi di modifica del progetto {changes} attualmente rimangono all'interno del flusso di controllo del progetto attivo.",
  "estate.summary.partnershipsAlertTitle":
    "\nLa supervisione del territorio, del commercio e della ristorazione ora si trova all'interno dello spazio di lavoro strategico della proprietà",
  "estate.summary.partnershipsAlertDescription":
    "\nLe licenze e le locazioni rurali, i registri dei redditi di terzi e la supervisione della ristorazione da parte dell'ESS vengono ora acquisiti come registri di contratti patrimoniali durevoli legati a siti e attrezzature.",
  "estate.summary.partnershipsTitle": "\nCoordinamento territorio e partner",
  "estate.summary.partnershipsDescription":
    "\nUtilizza questo registro per gestire l'uso del terreno rurale, l'attività commerciale di terzi e il coordinamento della ristorazione rispetto allo stesso sito e al grafico delle risorse che guida le operazioni immobiliari.",
  "estate.summary.partnershipsRegister": "\nRegistro accordi",
  "estate.summary.partnershipsRegisterDesc":
    "I documenti dell'accordo {count} sono attualmente attivi nel registro immobiliare.",
  "estate.summary.partnershipsRural": "\nAccordi rurali",
  "estate.summary.partnershipsRuralDesc":
    "\nI registri di pascolo, locazione e accesso ai terreni ora convivono insieme alle operazioni immobiliari.",
  "estate.summary.partnershipsCommercial": "\nRicavi commerciali",
  "estate.summary.partnershipsCommercialDesc":
    "\nI record di accordo {count} attualmente si collegano direttamente a una risorsa per la supervisione dell'utilizzo.",
  "estate.summary.partnershipsCoordination": "\nConflitti di coordinamento",
  "estate.summary.partnershipsCoordinationDesc":
    "\nLa supervisione della ristorazione attualmente ha una media di {score} tra i record di servizio valutati.",
  "estate.summary.partnershipsCateringValue": "\n{score}% punteggio medio",
  "estate.summary.partnershipsCateringValueEmpty": "\nnessun record segnato",
  "estate.summary.stewardshipAlertTitle":
    "\nI controlli forestali, del patrimonio e dell'ambiente ora condividono un unico registro per la gestione patrimoniale",
  "estate.summary.stewardshipAlertDescription":
    "\nI programmi dei boschi, la pressione sul consenso al patrimonio, il monitoraggio degli habitat e i registri delle specie protette ora si trovano sullo stesso sito e grafico delle risorse della consegna e della disponibilità.",
  "estate.summary.stewardshipTitle": "\nAtteggiamento di gestione patrimoniale",
  "estate.summary.stewardshipDescription":
    "\nUtilizza questo registro per coordinare le operazioni forestali, la condizione del patrimonio, la pressione sul consenso e gli obblighi di gestione ambientale senza lasciare l'area di lavoro della tenuta.",
  "estate.summary.stewardshipRegister": "\nRegistro dell'amministrazione",
  "estate.summary.stewardshipRegisterDesc":
    "\nI dati di gestione {count} attualmente richiedono attenzione a rischio o orientata alla conformità.",
  "estate.summary.stewardshipForestry": "\nRegistri forestali",
  "estate.summary.stewardshipForestryDesc":
    "\nIl valore della produzione di legname monitorato ammonta attualmente a {value} tra le rese forestali registrate.",
  "estate.summary.stewardshipHeritage": "\nDocumenti del patrimonio",
  "estate.summary.stewardshipHeritageDesc":
    "\nGli {count} elementi di consenso al lavoro attualmente rimangono nella coda di approvazione del patrimonio.",
  "estate.summary.stewardshipEnvironment": "\nDocumenti ambientali",
  "estate.summary.stewardshipEnvironmentDesc":
    "\n{count} i registri delle specie protette sono attualmente attivi nel registro di gestione.",
  "estate.summary.operationsAlertTitle":
    "\nOperazioni di tiro, sicurezza, tiro al bersaglio e GFE ora condividono un registro di controllo della proprietà durevole",
  "estate.summary.operationsAlertDescription":
    "\nLa disponibilità del range di addestramento, i difetti di sicurezza, la disponibilità del target e la posizione di sostituzione del GFE ora si trovano sullo stesso sito e grafico delle risorse come controlli di consegna, disponibilità e P3M.",
  "estate.summary.operationsTitle": "\nControlli operativi del centro di addestramento",
  "estate.summary.operationsDescription":
    "\nUtilizza questo registro per gestire l'attività TAROM, la conformità alla sicurezza MOD, il ciclo di vita del bersaglio e la postura delle attrezzature fornite dal governo senza lasciare l'area di lavoro della tenuta.",
  "estate.summary.operationsRegister": "Registro di controllo operativo",
  "estate.summary.operationsRegisterDesc":
    "\nI record {count} attualmente mostrano una postura operativa limitata o non conforme.",
  "estate.summary.operationsRanges": "\nOperazioni sulla gamma",
  "estate.summary.operationsRangesDesc":
    "\nI record di disponibilità dell'intervallo {count} sono attualmente contrassegnati come disponibili.",
  "estate.summary.operationsTargetry": "\nRecord di bersagli",
  "estate.summary.operationsTargetryDesc":
    "\n{count} Le corsie o i sistemi target sono attualmente registrati come disponibili.",
  "estate.summary.operationsGfe": "\nRecord GFE",
  "estate.summary.operationsGfeDesc":
    "\nGli elementi sostitutivi {count} attualmente rimangono nella coda GFE attiva.",
  "estate.summary.strategyAlertTitle":
    "\nI piani strategici delle risorse ora si trovano nello stesso spazio di lavoro immobiliare di finanza, consegna e approvazioni",
  "estate.summary.strategyAlertDescription":
    "\nConservare il piano di gestione strategica delle risorse come registro patrimoniale durevole collegato alle fasi del ciclo di vita, alla definizione delle priorità e agli scenari facoltativi di pianificazione finanziaria.",
  "estate.summary.strategyTitle": "\nAtteggiamento di gestione strategica delle risorse",
  "estate.summary.strategyDescription":
    "\nUtilizza questo livello per mantenere la pianificazione ISO 55001 allineata agli obiettivi organizzativi, alla definizione delle priorità in base al rischio, agli obiettivi prestazionali degli asset e alle decisioni di investimento infrastrutturale a lungo orizzonte.",
  "estate.summary.strategyRegister": "\nPiani strategici",
  "estate.summary.strategyRegisterDesc":
    "\nGli {count} elementi del piano rimangono attualmente nella coda di approvazione della strategia attiva.",
  "estate.summary.strategyLongHorizon": "\nPiani a lungo orizzonte",
  "estate.summary.strategyLongHorizonDesc":
    "\nPiani con infrastrutture o orizzonti del ciclo di vita pari o superiori alla soglia di pianificazione a lungo termine.",
  "estate.summary.strategyFinanceLinked": "\nPiani legati al finanziamento",
  "estate.summary.strategyFinanceLinkedDesc":
    "\nPiani strategici già collegati direttamente a scenari di pianificazione finanziaria salvata.",
  "estate.summary.strategyRiskLed": "\nPiani orientati al rischio",
  "estate.summary.strategyRiskLedDesc":
    "\nL'orizzonte medio di pianificazione strategica è attualmente di {average} mesi nel registro.",
  "estate.strategyForm.title": "\nMantenere il piano strategico di gestione patrimoniale",
  "estate.strategyForm.description":
    "\nAcquisisci record di strategia patrimoniale allineati allo standard ISO 55001 che collegano obiettivi organizzativi, approccio al ciclo di vita, definizione delle priorità basata sul rischio e pianificazione degli investimenti a lungo termine.",
  "estate.strategyForm.badge": "\nPiano strategico SAM",
  "estate.strategyForm.nameLabel": "\nTitolo del piano",
  "estate.strategyForm.namePlaceholder": "\nPiano strategico di rinnovamento immobiliare Nord",
  "estate.strategyForm.nameHint":
    "\nUtilizza un titolo che possa rimanere stabile nei pacchetti di governance, nei report DIO e nelle revisioni della pianificazione.",
  "estate.strategyForm.scopeLabel": "\nAmbito immobiliare",
  "estate.strategyForm.scopePlaceholder":
    "\nProprietà di formazione nord, aree regionali o fetta di proprietà aziendale",
  "estate.strategyForm.scopeHint":
    "Mantenere l'ambito allineato all'impronta patrimoniale o al portafoglio di capacità disciplinato dal piano.",
  "estate.strategyForm.objectiveLabel": "\nObiettivo organizzativo",
  "estate.strategyForm.objectiveHint":
    "\nScegli l'obiettivo organizzativo principale a cui si allinea questo piano strategico.",
  "estate.strategyForm.lifecycleLabel": "\nFocus sul ciclo di vita",
  "estate.strategyForm.lifecycleHint":
    "\nAssegna un nome alla fase dominante del ciclo di vita che il piano sta attualmente gestendo.",
  "estate.strategyForm.prioritisationLabel": "\nBase di priorità",
  "estate.strategyForm.prioritisationHint":
    "\nMostra se il piano è guidato dal rischio, dalla performance, dalla conformità, dalla domanda o dal valore.",
  "estate.strategyForm.horizonLabel": "\nOrizzonte di pianificazione",
  "estate.strategyForm.horizonHint":
    "\nUtilizza la finestra di pianificazione in mesi per decisioni a lungo termine sull'infrastruttura e sul ciclo di vita.",
  "estate.strategyForm.financeScenarioLabel": "\nScenario di pianificazione finanziaria",
  "estate.strategyForm.financeScenarioHint":
    "\nFacoltativamente, collega il piano direttamente a uno scenario di pianificazione finanziaria salvato per il trasferimento degli investimenti.",
  "estate.strategyForm.financeScenarioOptional": "\nNessuno scenario finanziario collegato",
  "estate.strategyForm.performanceTargetLabel": "\nObiettivo di rendimento",
  "estate.strategyForm.performanceTargetPlaceholder":
    "\nRipristina la disponibilità dell'autonomia del 95% su corsie limitate",
  "estate.strategyForm.performanceTargetHint":
    "\nDai un nome al servizio misurabile, alla preparazione o al risultato della condizione che questo piano sta generando.",
  "estate.strategyForm.investmentCaseLabel": "\nInvestment and infrastructure case",
  "estate.strategyForm.investmentCasePlaceholder":
    "\nSequenza di aggiornamenti di civili, servizi pubblici e ciclo di vita nel successivo periodo di controllo.",
  "estate.strategyForm.investmentCaseHint":
    "\nRiepilogare il caso di investimento infrastrutturale a lungo termine o la logica di intervento sul ciclo di vita.",
  "estate.strategyForm.approvalLabel": "\nPosizione di approvazione",
  "estate.strategyForm.approvalHint":
    "\nTieni traccia se il piano strategico è ancora in bozza, inviato, approvato o rifiutato.",
  "estate.strategyForm.notesLabel": "\nBolle di consegna",
  "estate.strategyForm.notesPlaceholder":
    "\nAcquisisci dipendenze, rivedi la cadenza o osserva i punti di controllo sulle prestazioni delle risorse.",
  "estate.strategyForm.notesHint":
    "\nUtilizza le note per il contesto di governance che dovrebbero rimanere visibili durante la manutenzione del piano.",
  "estate.strategyForm.requiredHint":
    "\nI campi obbligatori devono essere completati prima di poter salvare il piano.",
  "estate.strategyForm.submit": "\nSalva piano strategico",
  "estate.strategyForm.submitAria": "\nSalva il piano di gestione patrimoniale strategica",
  "estate.strategyForm.recentTitle": "\nRegistro del piano strategico",
  "estate.strategyForm.recentDescription":
    "\nI piani strategici recenti vengono visualizzati insieme alla loro posizione nel ciclo di vita, allo stato di approvazione e al collegamento finanziario.",
  "estate.strategyForm.empty": "\nNessun piano patrimoniale strategico è stato ancora acquisito.",
  "estate.strategyForm.notesEmpty": "\nNon sono state acquisite note di consegna aggiuntive.",
  "estate.strategyForm.feedback.saved":
    "\nPiano di gestione strategica delle risorse salvato nell'area di lavoro dell'eredità.",
  "estate.strategyForm.feedback.saveFailed":
    "\nImpossibile mantenere il piano di gestione strategica delle risorse in questo momento.",
  "estate.strategyForm.summary.approvalQueue": "{count} nel flusso di approvazione",
  "estate.strategyForm.summary.financeLinked": "\n{count} legato alla finanza",
  "estate.strategyForm.summary.horizonPosture":
    "\n{long} piano/i a lungo orizzonte/i, {risk} piano/i basato/i sul rischio, {average} orizzonte/i medio mensile.",
  "estate.strategyForm.tableAria": "\nPiani strategici di gestione patrimoniale",
  "estate.strategyForm.table.plan": "\nPiano",
  "estate.strategyForm.table.scope": "\nAmbito e obiettivo",
  "estate.strategyForm.table.lifecycle": "\nCiclo di vita e priorità",
  "estate.strategyForm.table.performance": "\nPerformance e orizzonte",
  "estate.strategyForm.table.approval": "\nLink approvazione e finanziamento",
  "estate.strategyForm.table.investment": "\nCaso di investimento",
  "estate.strategyForm.table.updatedAt": "\nAggiornato {date}",
  "estate.strategyForm.table.horizonValue": "\n{months} mesi",
  "estate.strategyForm.table.financeScenarioUnlinked": "\nNessuno scenario finanziario collegato",
  "estate.strategyForm.validation.titleRequired":
    "\nIl titolo del piano strategico è obbligatorio.",
  "estate.strategyForm.validation.scopeRequired": "\nL'ambito del piano strategico è obbligatorio.",
  "estate.strategyForm.validation.objectiveRequired":
    "\nPer il piano è richiesto un obiettivo strategico.",
  "estate.strategyForm.validation.lifecycleRequired":
    "\nPer il piano è richiesto un focus sul ciclo di vita.",
  "estate.strategyForm.validation.prioritisationRequired":
    "\nPer il piano è richiesta una base di priorità.",
  "estate.strategyForm.validation.horizonRange":
    "\nL'orizzonte di pianificazione deve essere compreso tra {min} e {max} mesi.",
  "estate.strategyForm.validation.performanceTargetRequired":
    "\nPer il piano è richiesto un obiettivo di performance.",
  "estate.strategyForm.validation.investmentCaseRequired":
    "\nPer il piano è richiesto un caso di investimenti e infrastrutture.",
  "estate.strategyForm.validation.financeScenarioInvalid":
    "\nImpossibile trovare lo scenario di pianificazione finanziaria selezionato.",
  "estate.strategyForm.validation.approvalRequired":
    "\nPer il piano è richiesta una posizione di approvazione valida.",
  "estate.strategyForm.objective.CAPABILITY_READINESS": "\nDisponibilità delle capacità",
  "estate.strategyForm.objective.COMPLIANCE_ASSURANCE": "\nGaranzia di conformità",
  "estate.strategyForm.objective.SERVICE_PERFORMANCE": "\nPrestazioni del servizio",
  "estate.strategyForm.objective.LIFECYCLE_SUSTAINMENT": "\nSostenibilità del ciclo di vita",
  "estate.strategyForm.objective.INFRASTRUCTURE_INVESTMENT": "\nInvestimenti infrastrutturali",
  "estate.strategyForm.lifecycle.ACQUIRE": "\nAcquisisci",
  "estate.strategyForm.lifecycle.OPERATE": "\nAziona",
  "estate.strategyForm.lifecycle.MAINTAIN": "\nMantieni",
  "estate.strategyForm.lifecycle.REFRESH": "\nAggiorna",
  "estate.strategyForm.lifecycle.DISPOSE": "\nSmaltisci",
  "estate.strategyForm.prioritisation.RISK": "\nGuidato dal rischio",
  "estate.strategyForm.prioritisation.PERFORMANCE": "\nGuidato dalle prestazioni",
  "estate.strategyForm.prioritisation.COMPLIANCE": "\nGuidato dalla conformità",
  "estate.strategyForm.prioritisation.DEMAND": "\nBasato sulla domanda",
  "estate.strategyForm.prioritisation.VALUE": "\nValore-led",
  "estate.initiativeForm.title": "\nCrea un'iniziativa immobiliare",
  "estate.initiativeForm.description":
    "\nAcquisisci un record strategico che possa sopravvivere in approvazioni, revisioni di programmi, follow-through FM e pacchetti di report.",
  "estate.initiativeForm.badge": "\nFlusso di beni durevoli",
  "estate.initiativeForm.nameLabel": "\nTitolo iniziativa",
  "estate.initiativeForm.namePlaceholder": "\nTenuta di allenamento difficile recupero FM",
  "estate.initiativeForm.nameHint":
    "\nUtilizza un titolo che possa rimanere stabile durante approvazioni, report e passaggi da parte dell'operatore.",
  "estate.initiativeForm.scopeLabel": "\nAmbito immobiliare",
  "estate.initiativeForm.scopePlaceholder":
    "\nCatene meridionali, edifici storici o supporto della flotta regionale",
  "estate.initiativeForm.scopeHint":
    "\nAssegnare un nome alla porzione immobiliare, alla geografia, all'area contrattuale o all'impronta operativa interessata.",
  "estate.initiativeForm.domainLabel": "\nDominio",
  "estate.initiativeForm.domainHint":
    "\nScegli il flusso di lavoro immobiliare che l'iniziativa promuove principalmente.",
  "estate.initiativeForm.domain.STRATEGIC_ASSET": "\nGestione patrimoniale strategica",
  "estate.initiativeForm.domain.HARD_FM": "\nDifficile FM",
  "estate.initiativeForm.domain.SOFT_FM": "\nFM morbido",
  "estate.initiativeForm.domain.RANGE_OPERATIONS": "\nOperazioni sulla portata",
  "estate.initiativeForm.domain.RANGE_SAFETY": "\nSicurezza portata",
  "estate.initiativeForm.domain.TARGETRY": "\nBersaglio",
  "estate.initiativeForm.domain.GFE": "Attrezzature fornite dal governo",
  "estate.initiativeForm.domain.FLEET": "\nFlotta e attrezzature",
  "estate.initiativeForm.domain.RURAL": "\nTenuta Rurale",
  "estate.initiativeForm.domain.FORESTRY": "\nSilvicoltura",
  "estate.initiativeForm.domain.HERITAGE": "\nPatrimonio",
  "estate.initiativeForm.domain.ENVIRONMENT": "\nGestione ambientale",
  "estate.initiativeForm.domain.COMMERCIAL": "\nRedditi di terzi",
  "estate.initiativeForm.domain.CATERING": "\nIntegrazione ristorazione",
  "estate.initiativeForm.domain.P3M": "\nConsegna P3M",
  "estate.initiativeForm.priorityLabel": "\nPriorità",
  "estate.initiativeForm.priorityHint":
    "\nCollocare l'iniziativa nell'attuale orizzonte operativo immobiliare.",
  "estate.initiativeForm.priority.NOW": "\nOra",
  "estate.initiativeForm.priority.NEXT": "\nSuccessivo",
  "estate.initiativeForm.priority.LATER": "\nPiù tardi",
  "estate.initiativeForm.priority.WATCH": "\nGuarda",
  "estate.initiativeForm.approvalLabel": "\nStato approvazione",
  "estate.initiativeForm.approvalHint":
    "\nTieni traccia della posizione attuale dell'iniziativa nel percorso di approvazione del programma.",
  "estate.initiativeForm.approval.DRAFT": "\nBozza",
  "estate.initiativeForm.approval.SUBMITTED": "\nInviato",
  "estate.initiativeForm.approval.APPROVED": "Approvato",
  "estate.initiativeForm.approval.REJECTED": "\nRifiutato",
  "estate.initiativeForm.notesLabel": "\nNote e ipotesi",
  "estate.initiativeForm.notesPlaceholder":
    "\nCattura rischio, collegamento di capacità, implicazioni contrattuali o ipotesi sul ciclo di vita.",
  "estate.initiativeForm.notesHint":
    "\nUtilizzalo per preservare il contesto che dovrebbe sopravvivere nelle approvazioni, nella pianificazione finanziaria e nel reporting.",
  "estate.initiativeForm.requiredHint":
    "\nSono obbligatori titolo, ambito patrimoniale, dominio, priorità e stato di approvazione.",
  "estate.initiativeForm.submit": "\nIniziativa Salva patrimonio",
  "estate.initiativeForm.submitAria": "\nIniziativa Salva patrimonio",
  "estate.initiativeForm.recentTitle": "\nRecenti iniziative immobiliari",
  "estate.initiativeForm.recentDescription":
    "\nQueste iniziative ora persistono come documenti patrimoniali durevoli senza lasciare l'area di lavoro SSR.",
  "estate.initiativeForm.empty": "\nNessuna iniziativa immobiliare ancora catturata.",
  "estate.initiativeForm.savedAt": "\nAggiornato {updatedAt}",
  "estate.initiativeForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "estate.initiativeForm.validation.titleRequired": "\nIl titolo dell'iniziativa è obbligatorio.",
  "estate.initiativeForm.validation.scopeRequired": "\nL'ambito immobiliare è obbligatorio.",
  "estate.initiativeForm.validation.domainRequired": "\nIl dominio è obbligatorio.",
  "estate.initiativeForm.validation.priorityRequired": "\nLa priorità è obbligatoria.",
  "estate.initiativeForm.validation.approvalRequired": "\nLo stato di approvazione è obbligatorio.",
  "estate.initiativeForm.feedback.saved":
    "\nIniziativa immobiliare salvata nell'area di lavoro immobiliare.",
  "estate.initiativeForm.feedback.saveFailed":
    "\nImpossibile mantenere l'iniziativa immobiliare in questo momento.",
  "estate.projectForm.title": "\nRegistra un progetto immobiliare",
  "estate.projectForm.description":
    "\nAcquisisci un record di progetti immobiliari durevoli con approvazione, situazione finanziaria, risorse e rischi all'interno dell'area di lavoro immobiliare SSR.",
  "estate.projectForm.badge": "\nRegistro P3M",
  "estate.projectForm.nameLabel": "\nTitolo del progetto",
  "estate.projectForm.namePlaceholder": "\nRecupero infrastrutture raggio regionale",
  "estate.projectForm.nameHint":
    "\nUtilizza un titolo che rimanga stabile tra registri, approvazioni, revisioni finanziarie e rapporti di consegna.",
  "estate.projectForm.programmeLabel": "\nNome del programma",
  "estate.projectForm.programmePlaceholder":
    "\nIncremento del ciclo di vita del complesso formativo",
  "estate.projectForm.programmeHint":
    "\nRaggruppare il progetto nella linea di programma o di portfolio utilizzata per il reporting patrimoniale.",
  "estate.projectForm.scopeLabel": "\nAmbito immobiliare",
  "estate.projectForm.scopePlaceholder":
    "\nPacchetto South Ranges, cluster storico o portafoglio ordini FM regionale",
  "estate.projectForm.scopeHint":
    "\nAssegnare un nome all'area geografica, all'area contrattuale, alla porzione immobiliare o all'impronta operativa interessata.",
  "estate.projectForm.deliveryTypeLabel": "\nTipo di consegna",
  "estate.projectForm.deliveryTypeHint":
    "\nDistinguere tra flusso di progetti ad alto volume e fornitura di infrastrutture complesse.",
  "estate.projectForm.deliveryType.HIGH_VOLUME_LOW_VALUE": "\nVolume elevato, valore basso",
  "estate.projectForm.deliveryType.COMPLEX_INFRASTRUCTURE": "\nInfrastrutture complesse",
  "estate.projectForm.approvalLabel": "\nStato approvazione",
  "estate.projectForm.approvalHint":
    "\nTieni traccia se il progetto è ancora in bozza, attivamente in fase di approvazione, approvato o rifiutato.",
  "estate.projectForm.approvalStageLabel": "\nFase di approvazione",
  "estate.projectForm.approvalStageHint":
    "\nTieni traccia della posizione attuale del progetto nel flusso DIO e di governance interna.",
  "estate.projectForm.approvalStage.REGISTERED": "\nRegistrato",
  "estate.projectForm.approvalStage.BUSINESS_CASE": "\nCaso aziendale",
  "estate.projectForm.approvalStage.DIO_REVIEW": "\nRecensione DIO",
  "estate.projectForm.approvalStage.COMMERCIAL_REVIEW": "\nRevisione commerciale",
  "estate.projectForm.approvalStage.DELIVERY_AUTHORIZATION": "\nAutorizzazione alla consegna",
  "estate.projectForm.approvalStage.IN_DELIVERY": "\nIn consegna",
  "estate.projectForm.approvalStage.CLOSED": "\nChiuso",
  "estate.projectForm.approvalAuthorityLabel": "\nAutorità di approvazione",
  "estate.projectForm.approvalAuthorityPlaceholder":
    "Responsabile regionale DIO, comitato commerciale o comitato per la distribuzione immobiliare",
  "estate.projectForm.approvalAuthorityHint":
    "\nNominare l'autorità o il consiglio attualmente responsabile della prossima decisione di approvazione.",
  "estate.projectForm.budgetAmountLabel": "\nImporto budget",
  "estate.projectForm.budgetAmountHint":
    "\nAcquisisci l'attuale previsione di budget approvata o proposta per il progetto.",
  "estate.projectForm.committedCostLabel": "\nCosto impegnato",
  "estate.projectForm.committedCostHint":
    "\nRegistra il costo attuale impegnato già allegato al progetto.",
  "estate.projectForm.forecastFinalCostLabel": "\nCosto finale previsto",
  "estate.projectForm.forecastFinalCostHint":
    "\nTieni traccia dell'ultima previsione del costo finale per il monitoraggio della consegna.",
  "estate.projectForm.retentionAmountLabel": "\nImporto della trattenuta",
  "estate.projectForm.retentionAmountHint":
    "\nCattura il valore commerciale trattenuto ancora trattenuto dopo il completamento o l'accettazione.",
  "estate.projectForm.riskProvisionAmountLabel": "\nFondo rischi",
  "estate.projectForm.riskProvisionAmountHint":
    "\nTieni traccia dell'attuale accantonamento finanziario riservato per l'esposizione al rischio del progetto.",
  "estate.projectForm.plannedResourcesLabel": "\nRisorse pianificate",
  "estate.projectForm.plannedResourcesHint":
    "\nAcquisisci la forza lavoro pianificata o l'allocazione delle risorse per la consegna.",
  "estate.projectForm.actualResourcesLabel": "\nRisorse effettive",
  "estate.projectForm.actualResourcesHint":
    "\nAcquisisci la forza lavoro effettiva o l'utilizzo delle risorse di consegna attualmente assegnate.",
  "estate.projectForm.riskLevelLabel": "\nLivello di rischio",
  "estate.projectForm.riskLevelHint":
    "\nEvidenziare l'attuale situazione qualitativa del rischio di consegna del progetto.",
  "estate.projectForm.riskLevel.LOW": "\nBasso",
  "estate.projectForm.riskLevel.MODERATE": "\nModerato",
  "estate.projectForm.riskLevel.HIGH": "\nAlto",
  "estate.projectForm.riskLevel.CRITICAL": "\nCritico",
  "estate.projectForm.notesLabel": "\nNote e ipotesi",
  "estate.projectForm.notesPlaceholder":
    "\nCattura le ipotesi di cambiamento, dipendenza, rischio, commerciale o approvazione DIO che dovrebbero sopravvivere nel reporting.",
  "estate.projectForm.notesHint":
    "\nUtilizzalo per preservare la governance e il contesto di consegna insieme alla voce del registro del progetto.",
  "estate.projectForm.requiredHint":
    "\nSono obbligatori il titolo del progetto, il programma, l'ambito, i campi di approvazione, i campi finanziari, i campi delle risorse e il livello di rischio.",
  "estate.projectForm.submit": "\nSalva progetto immobiliare",
  "estate.projectForm.submitAria": "\nSalva progetto immobiliare",
  "estate.projectForm.recentTitle": "\nProgetti immobiliari recenti",
  "estate.projectForm.recentDescription":
    "\nLe voci recenti del registro dei progetti mostrano la pressione sull'approvazione, la situazione finanziaria e il conflitto di risorse all'interno dell'area di lavoro immobiliare.",
  "estate.projectForm.empty": "\nNessun progetto immobiliare ancora acquisito.",
  "estate.projectForm.summary.approvalQueue": "\n{count} in attesa di approvazione",
  "estate.projectForm.summary.delayed": "\n{count} ritardato",
  "estate.projectForm.summary.resourcePressure":
    "\nI progetti {count} attualmente mostrano conflitti di risorse e {risk} sono contrassegnati ad alto rischio.",
  "estate.projectForm.tableAria": "\nProgetti immobiliari",
  "estate.projectForm.table.project": "\nProgetto",
  "estate.projectForm.table.scope": "\nAmbito",
  "estate.projectForm.table.approval": "\nApprovazione",
  "estate.projectForm.table.authority": "\nAutorità",
  "estate.projectForm.table.budget": "\nBudget",
  "estate.projectForm.table.provisions": "\nDisposizioni",
  "estate.projectForm.table.resources": "\nRisorse",
  "estate.projectForm.table.risk": "\nRischio",
  "estate.projectForm.table.daysInStage": "\n{days} giorni in scena",
  "estate.projectForm.table.forecastValue": "\nPrevisioni {value}",
  "estate.projectForm.table.resourcesValue": "\nPianificato {planned} / Effettivo {actual}",
  "estate.projectForm.table.resourceConflict": "\nConflitto di risorse",
  "estate.projectForm.table.delayFlag": "\nRitardo approvazione",
  "estate.projectForm.validation.titleRequired": "\nIl titolo del progetto è obbligatorio.",
  "estate.projectForm.validation.programmeRequired": "\nIl nome del programma è obbligatorio.",
  "estate.projectForm.validation.scopeRequired": "\nL'ambito immobiliare è obbligatorio.",
  "estate.projectForm.validation.deliveryTypeRequired": "\nIl tipo di consegna è obbligatorio.",
  "estate.projectForm.validation.approvalRequired": "\nLo stato di approvazione è obbligatorio.",
  "estate.projectForm.validation.approvalStageRequired": "\nÈ necessaria la fase di approvazione.",
  "estate.projectForm.validation.approvalAuthorityRequired":
    "È richiesta l'autorità di approvazione.",
  "estate.projectForm.validation.budgetAmount":
    "\nL'importo del budget deve essere pari a zero o superiore.",
  "estate.projectForm.validation.committedCost":
    "\nIl costo impegnato deve essere pari a zero o superiore.",
  "estate.projectForm.validation.forecastFinalCost":
    "\nIl costo finale previsto deve essere pari o superiore a zero.",
  "estate.projectForm.validation.retentionAmount":
    "\nL'importo della trattenuta deve essere pari a zero o superiore.",
  "estate.projectForm.validation.riskProvisionAmount":
    "\nL'accantonamento per i rischi deve essere pari a zero o superiore.",
  "estate.projectForm.validation.plannedResources":
    "\nLe risorse pianificate devono essere un numero intero uguale o superiore a zero.",
  "estate.projectForm.validation.actualResources":
    "\nLe risorse effettive devono essere un numero intero uguale o superiore a zero.",
  "estate.projectForm.validation.riskLevelRequired": "\nÈ richiesto il livello di rischio.",
  "estate.projectForm.feedback.saved":
    "\nProgetto immobiliare salvato nell'area di lavoro immobiliare.",
  "estate.projectForm.feedback.saveFailed":
    "\nImpossibile rendere persistente il progetto immobiliare in questo momento.",
  "estate.projectControls.emptyTitle": "\nCrea un progetto prima di acquisire i controlli",
  "estate.projectControls.emptyDescription":
    "\nI registri dei rischi e i registri di controllo delle modifiche si allegano direttamente a una voce del registro del progetto immobiliare.",
  "estate.projectControls.emptyProjects": "\nNessun progetto immobiliare disponibile",
  "estate.projectRiskForm.title": "\nRegistro dei rischi del progetto",
  "estate.projectRiskForm.description":
    "\nAcquisisci dati durevoli sui rischi P3M rispetto ai progetti immobiliari in modo che l'esposizione e la mitigazione sopravvivano alle approvazioni e alla rendicontazione.",
  "estate.projectRiskForm.projectLabel": "\nProgetto immobiliare",
  "estate.projectRiskForm.projectHint":
    "\nSeleziona la voce del registro del progetto a cui appartiene questo record di rischio.",
  "estate.projectRiskForm.nameLabel": "\nTitolo del rischio",
  "estate.projectRiskForm.namePlaceholder": "\nRevisione DIO ritardata sul pacchetto Range Civils",
  "estate.projectRiskForm.nameHint":
    "\nUtilizza un titolo breve che possa rimanere stabile nelle schede e nei report del progetto.",
  "estate.projectRiskForm.impactAreaLabel": "\nArea di impatto",
  "estate.projectRiskForm.impactAreaHint":
    "\nIdentificare l'area di consegna principale interessata dall'esposizione al rischio.",
  "estate.projectRiskForm.impactArea.COST": "\nCosto",
  "estate.projectRiskForm.impactArea.SCHEDULE": "\nProgramma",
  "estate.projectRiskForm.impactArea.CAPABILITY": "\nCapacità",
  "estate.projectRiskForm.impactArea.SAFETY": "\nSicurezza",
  "estate.projectRiskForm.impactArea.COMPLIANCE": "\nConformità",
  "estate.projectRiskForm.severityLabel": "\nGravità",
  "estate.projectRiskForm.severityHint":
    "\nUtilizza la stessa scala di gravità qualitativa del registro dei progetti.",
  "estate.projectRiskForm.statusLabel": "\nStato di rischio",
  "estate.projectRiskForm.statusHint":
    "\nTieni traccia se il rischio è aperto, in fase di mitigazione, formalmente accettato o chiuso.",
  "estate.projectRiskForm.status.OPEN": "\nApri",
  "estate.projectRiskForm.status.MITIGATING": "\nAttenuante",
  "estate.projectRiskForm.status.ACCEPTED": "\nAccettato",
  "estate.projectRiskForm.status.CLOSED": "\nChiuso",
  "estate.projectRiskForm.ownerLabel": "\nProprietario",
  "estate.projectRiskForm.ownerPlaceholder": "\nLead controlli del programma",
  "estate.projectRiskForm.ownerHint":
    "\nNomina il proprietario responsabile responsabile della mitigazione o dell'accettazione della guida.",
  "estate.projectRiskForm.mitigationLabel": "\nPiano di mitigazione",
  "estate.projectRiskForm.mitigationPlaceholder":
    "\nCattura il piano di risposta, il percorso di escalation o la logica di accettazione.",
  "estate.projectRiskForm.mitigationHint":
    "\nPreserva la successiva azione attenuante in modo che sopravviva nei pacchetti di governance.",
  "estate.projectRiskForm.targetDateLabel": "\nData prevista",
  "estate.projectRiskForm.targetDateHint":
    "\nData target facoltativa per il successivo punto di controllo di mitigazione o decisione di chiusura.",
  "estate.projectRiskForm.requiredHint":
    "Sono obbligatori il progetto, il titolo del rischio, l'area di impatto, la gravità, lo stato, il piano di mitigazione e il proprietario.",
  "estate.projectRiskForm.submit": "\nRisparmia sul rischio del progetto",
  "estate.projectRiskForm.submitAria": "\nRisparmia sul rischio del progetto",
  "estate.projectRiskForm.summary.critical": "\n{count} critico",
  "estate.projectRiskForm.tableAria": "\nRegistro dei rischi del progetto",
  "estate.projectRiskForm.table.risk": "\nRischio",
  "estate.projectRiskForm.table.exposure": "\nEsposizione",
  "estate.projectRiskForm.table.status": "\nStato",
  "estate.projectRiskForm.table.owner": "\nProprietario",
  "estate.projectRiskForm.table.mitigation": "\nMitigazione",
  "estate.projectRiskForm.table.targetDateValue": "\nObiettivo {date}",
  "estate.projectRiskForm.table.targetDateEmpty": "\nNessuna data target impostata",
  "estate.projectRiskForm.empty": "\nNessun rischio di progetto ancora acquisito.",
  "estate.projectRiskForm.validation.projectRequired":
    "\nSeleziona un progetto immobiliare valido.",
  "estate.projectRiskForm.validation.titleRequired": "\nIl titolo del rischio è obbligatorio.",
  "estate.projectRiskForm.validation.impactAreaRequired": "\nL'area di impatto è obbligatoria.",
  "estate.projectRiskForm.validation.severityRequired": "\nLa gravità è richiesta.",
  "estate.projectRiskForm.validation.statusRequired": "\nLo stato di rischio è obbligatorio.",
  "estate.projectRiskForm.validation.mitigationRequired": "\nÈ richiesto un piano di mitigazione.",
  "estate.projectRiskForm.validation.ownerRequired":
    "\nIl proprietario del rischio è obbligatorio.",
  "estate.projectRiskForm.validation.targetDate":
    "\nLa data target deve essere una data di calendario valida.",
  "estate.projectRiskForm.feedback.saved":
    "\nRischio del progetto salvato nell'area di lavoro immobiliare.",
  "estate.projectRiskForm.feedback.saveFailed":
    "\nImpossibile mantenere il rischio del progetto in questo momento.",
  "estate.projectChangeForm.title": "\nControllo modifiche progetto",
  "estate.projectChangeForm.description":
    "\nAcquisisci le richieste di modifica, l'impatto sui costi e sulla pianificazione e lo stato di approvazione all'interno del flusso del programma relativo ai beni durevoli.",
  "estate.projectChangeForm.projectLabel": "\nProgetto immobiliare",
  "estate.projectChangeForm.projectHint":
    "\nSeleziona la voce del registro del progetto a cui appartiene questa voce di modifica.",
  "estate.projectChangeForm.nameLabel": "\nCambia titolo",
  "estate.projectChangeForm.namePlaceholder":
    "\nEspandi l'ambito del pacchetto Civils per includere le corsie target",
  "estate.projectChangeForm.nameHint":
    "\nUtilizza un titolo breve che possa persistere durante gli aggiornamenti di approvazione e consegna.",
  "estate.projectChangeForm.typeLabel": "\nCambia tipo",
  "estate.projectChangeForm.typeHint":
    "\nIdentificare la categoria di controllo principale interessata da questo elemento di modifica.",
  "estate.projectChangeForm.type.SCOPE": "\nAmbito",
  "estate.projectChangeForm.type.SCHEDULE": "\nProgramma",
  "estate.projectChangeForm.type.COST": "\nCosto",
  "estate.projectChangeForm.type.RESOURCE": "\nRisorsa",
  "estate.projectChangeForm.type.COMPLIANCE": "\nConformità",
  "estate.projectChangeForm.statusLabel": "\nModifica stato",
  "estate.projectChangeForm.statusHint":
    "\nTieni traccia se la modifica è proposta, in corso di revisione, approvata, rifiutata o implementata.",
  "estate.projectChangeForm.status.PROPOSED": "\nProposto",
  "estate.projectChangeForm.status.IN_REVIEW": "\nIn revisione",
  "estate.projectChangeForm.status.APPROVED": "Approvato",
  "estate.projectChangeForm.status.REJECTED": "\nRifiutato",
  "estate.projectChangeForm.status.IMPLEMENTED": "\nImplementato",
  "estate.projectChangeForm.scheduleImpactLabel": "\nImpatto della pianificazione (giorni)",
  "estate.projectChangeForm.scheduleImpactHint":
    "\nRegistrare l'effetto della pianificazione attuale previsto se la modifica procede.",
  "estate.projectChangeForm.costImpactLabel": "\nImpatto sui costi",
  "estate.projectChangeForm.costImpactHint":
    "\nRegistrare l'effetto sui costi attualmente stimato della richiesta di modifica.",
  "estate.projectChangeForm.requestedByLabel": "\nRichiesto da",
  "estate.projectChangeForm.requestedByPlaceholder": "\nRegional delivery lead",
  "estate.projectChangeForm.requestedByHint":
    "\nNomina lo sponsor, il consiglio o il responsabile operativo che richiede la modifica.",
  "estate.projectChangeForm.notesLabel": "\nModifica note",
  "estate.projectChangeForm.notesPlaceholder":
    "\nAcquisisci la modifica richiesta, le dipendenze e le approvazioni richieste.",
  "estate.projectChangeForm.notesHint":
    "\nPreserva un contesto sufficiente per le bacheche di revisione e i rapporti sulla consegna.",
  "estate.projectChangeForm.requiredHint":
    "\nSono obbligatori il progetto, il titolo della modifica, il tipo, lo stato, l'impatto sulla pianificazione, l'impatto sui costi, il richiedente e le note.",
  "estate.projectChangeForm.submit": "\nSalva modifica progetto",
  "estate.projectChangeForm.submitAria": "\nSalva modifica progetto",
  "estate.projectChangeForm.summary.pending": "\n{count} in sospeso",
  "estate.projectChangeForm.summary.approved": "\n{count} approvato o implementato",
  "estate.projectChangeForm.tableAria": "\nControllo modifiche progetto",
  "estate.projectChangeForm.table.change": "\nCambia",
  "estate.projectChangeForm.table.type": "\nTipo",
  "estate.projectChangeForm.table.status": "\nStato",
  "estate.projectChangeForm.table.impact": "\nImpatto",
  "estate.projectChangeForm.table.requestedBy": "\nRichiesto da",
  "estate.projectChangeForm.table.scheduleValue":
    "\n{days} impatto della pianificazione giornaliera",
  "estate.projectChangeForm.empty": "\nNessuna modifica al progetto ancora catturata.",
  "estate.projectChangeForm.validation.projectRequired":
    "\nSeleziona un progetto immobiliare valido.",
  "estate.projectChangeForm.validation.titleRequired": "È necessario modificare il titolo.",
  "estate.projectChangeForm.validation.changeTypeRequired": "\nIl tipo di modifica è obbligatorio.",
  "estate.projectChangeForm.validation.statusRequired": "\nLa modifica dello stato è obbligatoria.",
  "estate.projectChangeForm.validation.scheduleImpactDays":
    "\nL'impatto della pianificazione deve essere un numero intero uguale o superiore a zero.",
  "estate.projectChangeForm.validation.costImpactAmount":
    "\nL'impatto sui costi deve essere pari o superiore a zero.",
  "estate.projectChangeForm.validation.requestedByRequired": "\nIl richiedente è obbligatorio.",
  "estate.projectChangeForm.validation.notesRequired": "\nLe note di modifica sono obbligatorie.",
  "estate.projectChangeForm.feedback.saved":
    "\nModifica del progetto salvata nell'area di lavoro dell'estate.",
  "estate.projectChangeForm.feedback.saveFailed":
    "\nImpossibile rendere persistente la modifica del progetto al momento.",
  "estate.agreementForm.title": "\nRegistra un contratto successorio",
  "estate.agreementForm.description":
    "\nCattura l'uso del territorio rurale, l'attività commerciale di terzi e la supervisione della ristorazione ESS in un unico registro immobiliare durevole.",
  "estate.agreementForm.alertTitle":
    "\nUn registro ora copre il coordinamento rurale, commerciale e della ristorazione",
  "estate.agreementForm.alertDescription":
    "\nI registri rurali richiedono un segnale sulle condizioni del terreno, i registri commerciali richiedono entrate e utilizzo e i registri di ristorazione richiedono un punteggio di servizio.",
  "estate.agreementForm.domainLabel": "\nDominio",
  "estate.agreementForm.domainHint":
    "\nScegli se questo record appartiene alla gestione della proprietà rurale, all'uso commerciale o alla supervisione della ristorazione.",
  "estate.agreementForm.domain.RURAL": "\nTenuta rurale",
  "estate.agreementForm.domain.COMMERCIAL": "\nProventi di terzi",
  "estate.agreementForm.domain.CATERING": "\nIntegrazione ristorazione",
  "estate.agreementForm.typeLabel": "\nTipo di contratto",
  "estate.agreementForm.typeHint":
    "\nSeleziona la licenza, la locazione, l'accesso o il tipo di servizio che meglio si adatta al dominio selezionato.",
  "estate.agreementForm.type.GRAZING_LICENSE": "\nLicenza di pascolo",
  "estate.agreementForm.type.AGRICULTURAL_TENANCY": "\nLocazione agricola",
  "estate.agreementForm.type.LAND_ACCESS": "\nContratto di accesso al terreno",
  "estate.agreementForm.type.COMMERCIAL_LICENSE": "\nLicenza per uso commerciale",
  "estate.agreementForm.type.EVENT_LICENSE": "\nLicenza per eventi e visitatori",
  "estate.agreementForm.type.CATERING_SERVICE": "\nServizio ristorazione",
  "estate.agreementForm.nameLabel": "\nTitolo del contratto",
  "estate.agreementForm.namePlaceholder": "\nLicenza di pascolo per zone meridionali",
  "estate.agreementForm.nameHint":
    "\nUtilizza un titolo che possa sopravvivere nelle riunioni di supervisione, nelle revisioni dei partner e nei rapporti.",
  "estate.agreementForm.siteLabel": "\nSito",
  "estate.agreementForm.siteHint":
    "\nAllega la scheda al sito immobiliare che detiene il coordinamento operativo.",
  "estate.agreementForm.assetLabel": "\nRisorsa o attrezzatura collegata",
  "estate.agreementForm.assetHint":
    "\nFacoltativamente, collega il record a una risorsa specifica o a un articolo di attrezzatura per ristorazione sullo stesso sito.",
  "estate.agreementForm.assetOptional": "\nNessuna risorsa collegata",
  "estate.agreementForm.counterpartyLabel": "\nControparte",
  "estate.agreementForm.counterpartyPlaceholder":
    "\nESS, Hill Farm Partnership o Regional Events Ltd",
  "estate.agreementForm.counterpartyHint":
    "\nNominare il locatario, il partner, il fornitore o la controparte commerciale titolare del contratto.",
  "estate.agreementForm.statusLabel": "\nStato contratto",
  "estate.agreementForm.statusHint":
    "\nTieni traccia se il record è bozza, attivo, sotto controllo o scaduto.",
  "estate.agreementForm.status.DRAFT": "\nBozza",
  "estate.agreementForm.status.ACTIVE": "\nAttivo",
  "estate.agreementForm.status.WATCH": "\nGuarda",
  "estate.agreementForm.status.EXPIRED": "\nScaduto",
  "estate.agreementForm.coordinationLabel": "\nCoordinamento formazione",
  "estate.agreementForm.coordinationHint":
    "Mostra se l'accordo attualmente è in linea con l'attività di formazione, necessita di controllo o è in conflitto.",
  "estate.agreementForm.coordination.ALIGNED": "\nAllineato",
  "estate.agreementForm.coordination.WATCH": "\nGuarda",
  "estate.agreementForm.coordination.CONFLICT": "\nConflitto",
  "estate.agreementForm.landConditionLabel": "\nStato del terreno",
  "estate.agreementForm.landConditionHint":
    "\nObbligatorio per i registri rurali per monitorare la pressione del pascolo, le condizioni di accesso o la posizione di locazione.",
  "estate.agreementForm.landCondition.GOOD": "\nBuono",
  "estate.agreementForm.landCondition.WATCH": "\nGuarda",
  "estate.agreementForm.landCondition.RECOVERY": "\nRecupero richiesto",
  "estate.agreementForm.revenueLabel": "\nValore annuo",
  "estate.agreementForm.revenueHint":
    "\nObbligatorio per i registri commerciali per tenere traccia delle entrate annuali o del valore concesso in licenza.",
  "estate.agreementForm.utilisationLabel": "\nPercentuale di utilizzo",
  "estate.agreementForm.utilisationHint":
    "\nObbligatorio per i registri commerciali per tenere traccia dell'intensità di utilizzo del sito o della risorsa concessa in licenza.",
  "estate.agreementForm.performanceLabel": "\nPunteggio di servizio",
  "estate.agreementForm.performanceHint":
    "\nObbligatorio per i registri del catering per acquisire le prestazioni attuali del servizio ESS.",
  "estate.agreementForm.startDateLabel": "\nData di inizio",
  "estate.agreementForm.startDateHint":
    "\nData di inizio facoltativa per la durata del contratto corrente o il periodo di supervisione.",
  "estate.agreementForm.endDateLabel": "\nData di fine",
  "estate.agreementForm.endDateHint":
    "\nData di fine facoltativa per la durata del contratto o la finestra di licenza corrente.",
  "estate.agreementForm.notesLabel": "\nNote operative",
  "estate.agreementForm.notesPlaceholder":
    "\nCattura i vincoli di formazione, le finestre di accesso, gli obblighi dei partner o la copertura delle apparecchiature.",
  "estate.agreementForm.notesHint":
    "\nUtilizzalo per preservare il contesto che deve sopravvivere nelle revisioni immobiliari e nel coordinamento dei partner.",
  "estate.agreementForm.requiredHint":
    "\nSono sempre obbligatori titolo, dominio, tipologia, sito, controparte, stato dell'accordo, stato del coordinamento e note. Le metriche specifiche del dominio vengono convalidate automaticamente.",
  "estate.agreementForm.submit": "\nSalva contratto patrimoniale",
  "estate.agreementForm.submitAria": "\nSalva contratto patrimoniale",
  "estate.agreementForm.summary.active": "\n{count} attivo",
  "estate.agreementForm.summary.conflicts": "\n{count} conflitti",
  "estate.agreementForm.empty": "\nNessun accordo immobiliare ancora acquisito.",
  "estate.agreementForm.emptySites": "\nNessun sito attivo disponibile",
  "estate.agreementForm.emptySitesTitle":
    "\nCrea un sito prima di acquisire i contratti immobiliari",
  "estate.agreementForm.emptySitesDescription":
    "\nI record rurali, commerciali e di ristorazione si allegano direttamente a un sito gestito e a una risorsa facoltativa dello stesso sito.",
  "estate.agreementForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "estate.agreementForm.tableAria": "\nContratti immobiliari",
  "estate.agreementForm.table.agreement": "\nContratto",
  "estate.agreementForm.table.domain": "\nDominio",
  "estate.agreementForm.table.site": "\nSito e risorsa",
  "estate.agreementForm.table.status": "\nStato",
  "estate.agreementForm.table.signal": "\nSegnale operativo",
  "estate.agreementForm.table.notes": "\nNote",
  "estate.agreementForm.table.signalRural": "\nStato del terreno: {condition}",
  "estate.agreementForm.table.signalCommercial": "\nEntrate {revenue} · {utilisation}",
  "estate.agreementForm.table.signalCatering": "\nServizio {score} · Risorsa {asset}",
  "estate.agreementForm.table.signalUtilisation": "\n{percent}% utilizzato",
  "estate.agreementForm.table.signalScore": "\n{score}% punteggio",
  "estate.agreementForm.table.signalNone": "\nNessun segnale operativo ancora registrato.",
  "estate.agreementForm.table.metricEmpty": "\nnon registrato",
  "estate.agreementForm.table.assetUnlinked": "\nNessuna risorsa collegata",
  "estate.agreementForm.table.startDateValue": "\nIniziato {date}",
  "estate.agreementForm.table.startDateEmpty": "\nNessuna data di inizio registrata",
  "estate.agreementForm.validation.titleRequired": "\nIl titolo del contratto è obbligatorio.",
  "estate.agreementForm.validation.domainRequired": "\nScegli un dominio di contratto valido.",
  "estate.agreementForm.validation.typeRequired": "\nScegli un tipo di contratto valido.",
  "estate.agreementForm.validation.typeDomainMismatch":
    "Scegli un tipo di contratto che corrisponda al dominio selezionato.",
  "estate.agreementForm.validation.siteRequired": "\nSeleziona un sito immobiliare valido.",
  "estate.agreementForm.validation.assetMismatch":
    "\nLe risorse collegate devono appartenere al sito immobiliare selezionato.",
  "estate.agreementForm.validation.counterpartyRequired": "\nLa controparte è obbligatoria.",
  "estate.agreementForm.validation.statusRequired": "\nLo stato del contratto è obbligatorio.",
  "estate.agreementForm.validation.coordinationRequired":
    "\nÈ richiesto lo stato di coordinamento della formazione.",
  "estate.agreementForm.validation.landConditionRequired":
    "\nI registri rurali richiedono uno stato di condizione fondiaria.",
  "estate.agreementForm.validation.revenueRequired":
    "\nI documenti commerciali richiedono un valore annuale.",
  "estate.agreementForm.validation.utilisationRequired":
    "\nI registri commerciali richiedono una percentuale di utilizzo.",
  "estate.agreementForm.validation.performanceRequired":
    "\nI registri della ristorazione richiedono un punteggio di servizio.",
  "estate.agreementForm.validation.revenueInvalid":
    "\nIl valore annuale deve essere zero o maggiore.",
  "estate.agreementForm.validation.utilisationInvalid":
    "\nLa percentuale di utilizzo deve essere un numero intero compreso tra 0 e 100.",
  "estate.agreementForm.validation.performanceInvalid":
    "\nIl punteggio del servizio deve essere un numero intero compreso tra 0 e 100.",
  "estate.agreementForm.validation.dateInvalid":
    "\nLe date devono essere valori di calendario validi.",
  "estate.agreementForm.validation.dateOrderInvalid":
    "\nLa data di fine deve essere uguale o successiva alla data di inizio.",
  "estate.agreementForm.feedback.saved":
    "\nAccordo patrimoniale salvato nell'area di lavoro immobiliare.",
  "estate.agreementForm.feedback.saveFailed":
    "\nImpossibile mantenere l'accordo patrimoniale in questo momento.",
  "estate.stewardshipForm.title": "\nRegistra un record di amministrazione",
  "estate.stewardshipForm.description":
    "\nCattura le operazioni forestali, i controlli del patrimonio e gli obblighi di gestione ambientale in un unico registro dei beni durevoli.",
  "estate.stewardshipForm.alertTitle":
    "\nUn registro di amministrazione ora copre la silvicoltura, il patrimonio e i controlli ambientali",
  "estate.stewardshipForm.alertDescription":
    "\nI registri della produzione di legname richiedono un valore misurato, i registri del consenso ai lavori richiedono una data obiettivo e ogni registro riporta condizioni condivise e atteggiamento di conformità.",
  "estate.stewardshipForm.domainLabel": "\nDominio",
  "estate.stewardshipForm.domainHint":
    "\nScegli se il record appartiene a operazioni forestali, gestione del patrimonio o tutela ambientale.",
  "estate.stewardshipForm.domain.FORESTRY": "\nOperazioni forestali",
  "estate.stewardshipForm.domain.HERITAGE": "\nGestione del patrimonio culturale",
  "estate.stewardshipForm.domain.ENVIRONMENT": "\nGestione ambientale",
  "estate.stewardshipForm.recordTypeLabel": "\nTipo di registrazione",
  "estate.stewardshipForm.recordTypeHint":
    "\nSeleziona il record operativo, il sondaggio, la pianificazione o l'elemento di consenso che meglio si adatta al dominio di gestione scelto.",
  "estate.stewardshipForm.recordType.WOODLAND_ASSET": "\nRisorsa boschiva",
  "estate.stewardshipForm.recordType.PLANTING_SCHEDULE": "\nOrario di piantumazione",
  "estate.stewardshipForm.recordType.HARVEST_SCHEDULE": "\nProgramma di raccolta",
  "estate.stewardshipForm.recordType.TIMBER_OUTPUT": "\nProduzione legname",
  "estate.stewardshipForm.recordType.HERITAGE_ASSET": "\nPatrimonio",
  "estate.stewardshipForm.recordType.CONSERVATION_SURVEY": "\nIndagine sulla conservazione",
  "estate.stewardshipForm.recordType.WORKS_CONSENT": "\nConsenso ai lavori",
  "estate.stewardshipForm.recordType.BIODIVERSITY_MONITORING": "\nMonitoraggio della biodiversità",
  "estate.stewardshipForm.recordType.HABITAT_SURVEY": "\nIndagine sugli habitat",
  "estate.stewardshipForm.recordType.ENVIRONMENTAL_INSPECTION": "\nIspezione ambientale",
  "estate.stewardshipForm.recordType.PROTECTED_SPECIES": "\nRegistro delle specie protette",
  "estate.stewardshipForm.nameLabel": "\nTitolo del disco",
  "estate.stewardshipForm.namePlaceholder": "\nRitorno uscita bosco sud",
  "estate.stewardshipForm.nameHint":
    "Utilizza un titolo che possa sopravvivere nelle revisioni della gestione, nelle discussioni sulla conformità e nei pacchetti di rapporti.",
  "estate.stewardshipForm.siteLabel": "\nSito",
  "estate.stewardshipForm.siteHint":
    "\nAllega il record al sito titolare dell'attuale obbligo o attività di gestione.",
  "estate.stewardshipForm.assetLabel": "\nRisorsa collegata",
  "estate.stewardshipForm.assetHint":
    "\nFacoltativamente, collega il record a una risorsa dello stesso sito, ad esempio una struttura elencata, una risorsa boschiva o un sistema monitorato.",
  "estate.stewardshipForm.assetOptional": "\nNessuna risorsa collegata",
  "estate.stewardshipForm.statusLabel": "\nStato registrazione",
  "estate.stewardshipForm.statusHint":
    "\nTieni traccia se il record di gestione è in bozza, attivo, sotto controllo o chiuso.",
  "estate.stewardshipForm.status.DRAFT": "\nBozza",
  "estate.stewardshipForm.status.ACTIVE": "\nAttivo",
  "estate.stewardshipForm.status.WATCH": "\nGuarda",
  "estate.stewardshipForm.status.CLOSED": "\nChiuso",
  "estate.stewardshipForm.conditionStatusLabel": "\nCondizione postura",
  "estate.stewardshipForm.conditionStatusHint":
    "\nIndividua se il bosco, l'elemento del patrimonio o il segnale ambientale sono favorevoli, in ripresa o a rischio.",
  "estate.stewardshipForm.conditionStatus.FAVOURABLE": "\nFavorevole",
  "estate.stewardshipForm.conditionStatus.RECOVERING": "\nRecupero",
  "estate.stewardshipForm.conditionStatus.AT_RISK": "\nA rischio",
  "estate.stewardshipForm.complianceStatusLabel": "\nAtteggiamento di conformità",
  "estate.stewardshipForm.complianceStatusHint":
    "\nTieni traccia se il record corrente è conforme, sotto controllo, in attesa di consenso o non conforme.",
  "estate.stewardshipForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.stewardshipForm.complianceStatus.WATCH": "\nGuarda",
  "estate.stewardshipForm.complianceStatus.CONSENT_REQUIRED": "\nConsenso richiesto",
  "estate.stewardshipForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.stewardshipForm.metricValueLabel": "\nValore misurato",
  "estate.stewardshipForm.metricValueHint":
    "\nUtilizzalo per la produzione di legname, i conteggi della biodiversità o altre misure di gestione quantificate.",
  "estate.stewardshipForm.metricUnitLabel": "\nUnità metrica",
  "estate.stewardshipForm.metricUnitPlaceholder": "\ntonnellate, ettari o avvistamenti",
  "estate.stewardshipForm.metricUnitHint":
    "\nAssegnare un nome all'unità associata al valore misurato quando ne viene registrato uno.",
  "estate.stewardshipForm.targetDateLabel": "\nData prevista",
  "estate.stewardshipForm.targetDateHint":
    "\nUtilizzalo per le finestre di raccolta, le date dei sondaggi, le scadenze delle ispezioni o i traguardi di consenso richiesti.",
  "estate.stewardshipForm.notesLabel": "\nNote operative",
  "estate.stewardshipForm.notesPlaceholder":
    "\nCattura i vincoli di gestione, il contesto di conformità, le aree protette o le dipendenze operative.",
  "estate.stewardshipForm.notesHint":
    "\nConserva dettagli sufficienti per le revisioni di conformità, il coordinamento della consegna e il reporting patrimoniale.",
  "estate.stewardshipForm.requiredHint":
    "\nTitolo, dominio, tipo di record, sito, stato, condizione, conformità e note sono sempre obbligatori. Le metriche specifiche del dominio vengono convalidate automaticamente.",
  "estate.stewardshipForm.submit": "\nSalva record di gestione",
  "estate.stewardshipForm.submitAria": "\nSalva record di gestione",
  "estate.stewardshipForm.summary.atRisk": "\n{count} a rischio",
  "estate.stewardshipForm.summary.consents": "\n{count} coda consenso",
  "estate.stewardshipForm.empty": "\nNessun record di gestione ancora acquisito.",
  "estate.stewardshipForm.emptySites": "\nNessun sito attivo disponibile",
  "estate.stewardshipForm.emptySitesTitle":
    "\nCrea un sito prima di acquisire i registri di gestione",
  "estate.stewardshipForm.emptySitesDescription":
    "\nI documenti relativi alla silvicoltura, al patrimonio e alla gestione ambientale si allegano direttamente a un sito gestito e a una risorsa facoltativa dello stesso sito.",
  "estate.stewardshipForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "estate.stewardshipForm.tableAria": "\nDocumenti di amministrazione",
  "estate.stewardshipForm.table.record": "\nRegistra",
  "estate.stewardshipForm.table.domain": "\nDominio",
  "estate.stewardshipForm.table.site": "\nSito e risorsa",
  "estate.stewardshipForm.table.status": "\nStato",
  "estate.stewardshipForm.table.signal": "\nSegnale operativo",
  "estate.stewardshipForm.table.notes": "\nNote",
  "estate.stewardshipForm.table.assetUnlinked": "\nNessuna risorsa collegata",
  "estate.stewardshipForm.table.updatedAt": "\nAggiornato {date}",
  "estate.stewardshipForm.table.signalTimberOutput": "\n{value} {unit} registrato",
  "estate.stewardshipForm.table.signalConsent": "Posizione del consenso: {status}",
  "estate.stewardshipForm.table.signalProtectedSpecies":
    "\nPostura delle specie protette: {condition}",
  "estate.stewardshipForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.stewardshipForm.table.signalNone": "\nNessun segnale operativo ancora registrato.",
  "estate.stewardshipForm.validation.titleRequired": "\nÈ richiesto il titolo di amministrazione.",
  "estate.stewardshipForm.validation.domainRequired": "\nScegli un dominio di gestione valido.",
  "estate.stewardshipForm.validation.recordTypeRequired":
    "\nScegli un tipo di record di gestione valido.",
  "estate.stewardshipForm.validation.recordTypeDomainMismatch":
    "\nScegli un tipo di record che corrisponda al dominio di amministrazione selezionato.",
  "estate.stewardshipForm.validation.siteRequired": "\nSeleziona un sito immobiliare valido.",
  "estate.stewardshipForm.validation.assetMismatch":
    "\nLe risorse collegate devono appartenere al sito immobiliare selezionato.",
  "estate.stewardshipForm.validation.statusRequired": "\nÈ richiesto lo stato di amministrazione.",
  "estate.stewardshipForm.validation.conditionStatusRequired":
    "\nÈ richiesta la postura condizionale.",
  "estate.stewardshipForm.validation.complianceStatusRequired":
    "\nÈ richiesto un atteggiamento di conformità.",
  "estate.stewardshipForm.validation.metricValueRequired":
    "\nI registri della produzione di legname richiedono un valore misurato.",
  "estate.stewardshipForm.validation.metricValueInvalid":
    "\nIl valore misurato deve essere zero o maggiore.",
  "estate.stewardshipForm.validation.metricUnitRequired":
    "\nL'unità metrica è richiesta quando viene registrato un valore misurato.",
  "estate.stewardshipForm.validation.targetDateRequired":
    "\nI record del consenso dei lavori richiedono una data prevista.",
  "estate.stewardshipForm.validation.targetDateInvalid":
    "\nLa data prevista deve essere un valore di calendario valido.",
  "estate.stewardshipForm.feedback.saved":
    "\nRecord di amministrazione salvato nell'area di lavoro della proprietà.",
  "estate.stewardshipForm.feedback.saveFailed":
    "\nImpossibile mantenere il record di gestione in questo momento.",
  "estate.fmGovernanceForm.title": "\nRegistra un record di governance FM",
  "estate.fmGovernanceForm.description":
    "\nCattura la governance FM dura, la garanzia statutaria, i programmi di servizio e la posizione di benchmark FM morbida all'interno di un registro patrimoniale.",
  "estate.fmGovernanceForm.alertTitle":
    "\nSFG20, SOP19 e la governance soft FM ora si trovano all'interno di un'unica superficie di controllo immobiliare",
  "estate.fmGovernanceForm.alertDescription":
    "\nI registri di pianificazione, ispezione, audit e assistenza utilizzano date target, mentre i registri di manutenzione reattiva e benchmark riportano valori di output misurati.",
  "estate.fmGovernanceForm.domainLabel": "\nDominio",
  "estate.fmGovernanceForm.domainHint":
    "\nSeparare la governance della manutenzione FM hardware dal servizio Soft FM e dai controlli benchmark.",
  "estate.fmGovernanceForm.domain.HARD_FM": "\nGovernance dura del FM",
  "estate.fmGovernanceForm.domain.SOFT_FM": "\nGovernance morbida del FM",
  "estate.fmGovernanceForm.recordTypeLabel": "\nTipo di registrazione",
  "estate.fmGovernanceForm.recordTypeHint":
    "\nScegli la manutenzione pianificata, la garanzia, il servizio o il controllo benchmark da registrare.",
  "estate.fmGovernanceForm.recordType.PPM_SCHEDULE":
    "\nProgramma di manutenzione preventiva pianificata",
  "estate.fmGovernanceForm.recordType.SFG20_SCHEDULE": "\nProgramma di manutenzione SFG20",
  "estate.fmGovernanceForm.recordType.STATUTORY_INSPECTION": "\nIspezione legale",
  "estate.fmGovernanceForm.recordType.REACTIVE_MAINTENANCE":
    "\nPrestazioni di manutenzione reattiva",
  "estate.fmGovernanceForm.recordType.COMPLIANCE_AUDIT": "\nVerifica di conformità",
  "estate.fmGovernanceForm.recordType.ASSURANCE_REVIEW":
    "\nRevisione della garanzia di manutenzione",
  "estate.fmGovernanceForm.recordType.SERVICE_SCHEDULE": "\nProgramma del servizio Soft FM",
  "estate.fmGovernanceForm.recordType.GROUNDS_PROGRAMME": "\nProgramma di manutenzione del verde",
  "estate.fmGovernanceForm.recordType.WASTE_SERVICE": "\nProgramma servizio rifiuti",
  "estate.fmGovernanceForm.recordType.SERVICE_PERFORMANCE":
    "\nMisurazione della prestazione del servizio",
  "estate.fmGovernanceForm.recordType.PRODUCTIVITY_BENCHMARK": "\nBenchmark sulla produttività",
  "estate.fmGovernanceForm.recordType.INDUSTRY_BENCHMARK": "\nPunto di riferimento del settore",
  "estate.fmGovernanceForm.nameLabel": "\nTitolo del disco",
  "estate.fmGovernanceForm.namePlaceholder": "\nCiclo di ispezione legale della tenuta Nord",
  "estate.fmGovernanceForm.nameHint":
    "\nAssegna un nome all'elemento di governance FM in modo che sopravviva nelle revisioni operative e nei pacchetti di assicurazione patrimoniale.",
  "estate.fmGovernanceForm.siteLabel": "\nSito",
  "estate.fmGovernanceForm.siteHint":
    "Seleziona l'ubicazione dell'immobile a cui appartiene l'elemento di gestione della manutenzione o del servizio.",
  "estate.fmGovernanceForm.assetLabel": "\nRisorsa collegata",
  "estate.fmGovernanceForm.assetHint":
    "\nCollegare il controllo a un asset quando il record si applica a uno specifico elemento dell'impianto o componente dell'infrastruttura.",
  "estate.fmGovernanceForm.assetOptional": "\nNessuna risorsa collegata",
  "estate.fmGovernanceForm.statusLabel": "\nStato registrazione",
  "estate.fmGovernanceForm.statusHint":
    "\nImposta se l'elemento di governance è attivo, sotto controllo o chiuso.",
  "estate.fmGovernanceForm.status.DRAFT": "\nBozza",
  "estate.fmGovernanceForm.status.ACTIVE": "\nAttivo",
  "estate.fmGovernanceForm.status.WATCH": "\nGuarda",
  "estate.fmGovernanceForm.status.CLOSED": "\nChiuso",
  "estate.fmGovernanceForm.deliveryStatusLabel": "\nPostura di consegna",
  "estate.fmGovernanceForm.deliveryStatusHint":
    "\nScopri se il programma o il servizio è in linea, sotto pressione o fuori programma.",
  "estate.fmGovernanceForm.deliveryStatus.ON_TRACK": "\nIn pista",
  "estate.fmGovernanceForm.deliveryStatus.UNDER_PRESSURE": "\nSotto pressione",
  "estate.fmGovernanceForm.deliveryStatus.OFF_TRACK": "\nFuori pista",
  "estate.fmGovernanceForm.complianceStatusLabel": "\nAtteggiamento di conformità",
  "estate.fmGovernanceForm.complianceStatusHint":
    "\nTieni traccia se il controllo è conforme, necessita di azioni o è passato alla non conformità.",
  "estate.fmGovernanceForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.fmGovernanceForm.complianceStatus.WATCH": "\nGuarda",
  "estate.fmGovernanceForm.complianceStatus.ACTION_REQUIRED": "\nAzione richiesta",
  "estate.fmGovernanceForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.fmGovernanceForm.metricValueLabel": "\nValore misurato",
  "estate.fmGovernanceForm.metricValueHint":
    "\nUtilizza un valore per la manutenzione reattiva, le prestazioni e il punteggio benchmark.",
  "estate.fmGovernanceForm.metricUnitLabel": "\nUnità metrica",
  "estate.fmGovernanceForm.metricUnitPlaceholder": "\npunteggio, posti di lavoro, ettari o ore",
  "estate.fmGovernanceForm.metricUnitHint":
    "\nDescrivere l'unità utilizzata per il servizio misurato o il valore di riferimento.",
  "estate.fmGovernanceForm.targetDateLabel": "\nData prevista",
  "estate.fmGovernanceForm.targetDateHint":
    "\nUtilizza le date target per pianificazioni, ispezioni, audit, revisioni di garanzia e programmi di servizio.",
  "estate.fmGovernanceForm.notesLabel": "\nNote operative",
  "estate.fmGovernanceForm.notesPlaceholder":
    "\nAcquisisci dettagli su SFG20, SOP19, prestazioni del servizio, benchmark o mitigazione che dovrebbero persistere nel registro patrimoniale.",
  "estate.fmGovernanceForm.notesHint":
    "\nMantieni note brevi, operative e specifiche per l'elemento di governance FM.",
  "estate.fmGovernanceForm.requiredHint":
    "\nTitolo, dominio, tipo, sito, stati e note sono obbligatori. Alcuni tipi di record richiedono anche una metrica o una data target.",
  "estate.fmGovernanceForm.submit": "\nSalva record di governance FM",
  "estate.fmGovernanceForm.submitAria": "\nSalva record di governance FM",
  "estate.fmGovernanceForm.summary.complianceAttention": "\n{count} ho bisogno di attenzione",
  "estate.fmGovernanceForm.summary.benchmarks": "\n{count} benchmark tracciati",
  "estate.fmGovernanceForm.empty": "\nNessun record di governance FM ancora acquisito.",
  "estate.fmGovernanceForm.emptySites": "\nNessun sito attivo disponibile",
  "estate.fmGovernanceForm.emptySitesTitle":
    "\nCrea un sito prima di acquisire i record di governance FM",
  "estate.fmGovernanceForm.emptySitesDescription":
    "\nIl registro della governance FM dipende dall'elenco dei siti immobiliari in modo che gli orari e i servizi possano essere legati alla posizione corretta.",
  "estate.fmGovernanceForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "estate.fmGovernanceForm.tableAria": "\nRegistri di governance FM",
  "estate.fmGovernanceForm.table.record": "\nRegistra",
  "estate.fmGovernanceForm.table.domain": "\nDominio",
  "estate.fmGovernanceForm.table.site": "\nSito e risorsa",
  "estate.fmGovernanceForm.table.status": "\nStato",
  "estate.fmGovernanceForm.table.signal": "\nSegnale operativo",
  "estate.fmGovernanceForm.table.notes": "\nNote",
  "estate.fmGovernanceForm.table.assetUnlinked": "\nNessuna risorsa collegata",
  "estate.fmGovernanceForm.table.updatedAt": "\nAggiornato {date}",
  "estate.fmGovernanceForm.table.signalMetric": "\n{value} {unit} registrato",
  "estate.fmGovernanceForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.fmGovernanceForm.table.signalCompliance": "\nAtteggiamento di conformità: {status}",
  "estate.fmGovernanceForm.validation.titleRequired":
    "\nIl titolo di governance FM è obbligatorio.",
  "estate.fmGovernanceForm.validation.domainRequired":
    "\nScegli un dominio di governance FM valido.",
  "estate.fmGovernanceForm.validation.recordTypeRequired":
    "\nScegli un tipo di record di governance FM valido.",
  "estate.fmGovernanceForm.validation.recordTypeDomainMismatch":
    "\nScegli un tipo di record che corrisponda al dominio di governance FM selezionato.",
  "estate.fmGovernanceForm.validation.siteRequired": "\nSeleziona un sito immobiliare valido.",
  "estate.fmGovernanceForm.validation.assetMismatch":
    "\nLa risorsa collegata deve appartenere al sito immobiliare selezionato.",
  "estate.fmGovernanceForm.validation.statusRequired":
    "\nLo stato di governance FM è obbligatorio.",
  "estate.fmGovernanceForm.validation.deliveryStatusRequired":
    "È richiesta la posizione di consegna della governance FM.",
  "estate.fmGovernanceForm.validation.complianceStatusRequired":
    "\nÈ richiesto un atteggiamento di conformità alla governance FM.",
  "estate.fmGovernanceForm.validation.metricValueRequired":
    "\nI record di manutenzione reattiva, prestazioni e benchmark richiedono un valore misurato.",
  "estate.fmGovernanceForm.validation.metricValueInvalid":
    "\nIl valore misurato deve essere zero o maggiore.",
  "estate.fmGovernanceForm.validation.metricUnitRequired":
    "\nL'unità metrica è richiesta quando viene registrato un valore misurato.",
  "estate.fmGovernanceForm.validation.targetDateRequired":
    "\nI registri di pianificazione, ispezione, audit, garanzia e servizio richiedono una data prevista.",
  "estate.fmGovernanceForm.validation.targetDateInvalid":
    "\nLa data prevista deve essere un valore di calendario valido.",
  "estate.fmGovernanceForm.feedback.saved":
    "\nRecord di governance FM salvato nell'area di lavoro dell'eredità.",
  "estate.fmGovernanceForm.feedback.saveFailed":
    "\nImpossibile rendere persistente il record di governance FM in questo momento.",
  "estate.rangeControlForm.title": "\nRegistra un intervallo e un record di controllo GFE",
  "estate.rangeControlForm.description":
    "\nCattura l'attività TAROM, i controlli di sicurezza della gamma, la postura del ciclo di vita del bersaglio e i segnali delle attrezzature fornite dal governo all'interno di un registro immobiliare durevole.",
  "estate.rangeControlForm.alertTitle":
    "\nUn registro di controllo operativo ora copre distanze, sicurezza, mira e GFE",
  "estate.rangeControlForm.alertDescription":
    "\nI record di disponibilità e utilizzo richiedono un valore misurato, le azioni di ispezione e ripristino richiedono una data prevista e i record di destinazione o GFE richiedono una risorsa collegata dello stesso sito.",
  "estate.rangeControlForm.domainLabel": "\nDominio",
  "estate.rangeControlForm.domainHint":
    "\nScegli se il record appartiene alla consegna TAROM, alla conformità alla sicurezza del raggio d'azione, alla gestione del bersaglio o alla supervisione del ciclo di vita GFE.",
  "estate.rangeControlForm.domain.RANGE_OPERATIONS":
    "\nAree di addestramento e operazioni sul poligono",
  "estate.rangeControlForm.domain.RANGE_SAFETY": "\nConformità alla sicurezza della gamma",
  "estate.rangeControlForm.domain.TARGETRY": "\nGestione del ciclo di vita del target",
  "estate.rangeControlForm.domain.GFE": "\nAttrezzatura fornita dal governo",
  "estate.rangeControlForm.recordTypeLabel": "\nTipo di registrazione",
  "estate.rangeControlForm.recordTypeHint":
    "\nSeleziona il record di controllo operativo, ispezione, disponibilità, archiviazione o sostituzione che meglio si adatta al dominio selezionato.",
  "estate.rangeControlForm.recordType.RANGE_REGISTRY": "\nRecord di registro dell'intervallo",
  "estate.rangeControlForm.recordType.RANGE_AVAILABILITY": "\nDisponibilità della gamma",
  "estate.rangeControlForm.recordType.RANGE_PREPARATION": "\nFinestra di preparazione della gamma",
  "estate.rangeControlForm.recordType.RANGE_RECOVERY": "\nFinestra di recupero autonomia",
  "estate.rangeControlForm.recordType.SAFETY_INSPECTION": "\nIspezione di sicurezza",
  "estate.rangeControlForm.recordType.SAFETY_DEFECT": "\nDifetto di sicurezza",
  "estate.rangeControlForm.recordType.CORRECTIVE_ACTION": "\nAzione correttiva",
  "estate.rangeControlForm.recordType.TARGET_ASSET": "\nRisorsa target",
  "estate.rangeControlForm.recordType.TARGET_DEPLOYMENT": "\nFinestra di distribuzione target",
  "estate.rangeControlForm.recordType.TARGET_STORAGE": "\nPosizione di archiviazione target",
  "estate.rangeControlForm.recordType.TARGET_AVAILABILITY": "\nDisponibilità target",
  "estate.rangeControlForm.recordType.GFE_CONDITION": "\nCondizione GFE",
  "estate.rangeControlForm.recordType.GFE_UTILISATION": "\nUtilizzo GFE",
  "estate.rangeControlForm.recordType.GFE_REPLACEMENT": "\nPiano di sostituzione GFE",
  "estate.rangeControlForm.nameLabel": "\nTitolo del disco",
  "estate.rangeControlForm.namePlaceholder": "\nRendimento disponibilità target settore Nord",
  "estate.rangeControlForm.nameHint":
    "\nUtilizza un titolo che possa sopravvivere ai range board, alle revisioni di conformità e ai report operativi.",
  "estate.rangeControlForm.siteLabel": "\nSito",
  "estate.rangeControlForm.siteHint":
    "\nAllega il record al sito dell'azienda agricola che attualmente possiede l'attività o il controllo.",
  "estate.rangeControlForm.assetLabel": "\nRisorsa o attrezzatura collegata",
  "estate.rangeControlForm.assetHint":
    "\nCollega i record targetry e GFE alla risorsa o all'attrezzatura dello stesso sito che descrivono direttamente.",
  "estate.rangeControlForm.assetOptional": "\nNessuna risorsa collegata",
  "estate.rangeControlForm.statusLabel": "\nStato registrazione",
  "estate.rangeControlForm.statusHint":
    "Tieni traccia se il record è bozza, attivo, sotto controllo o chiuso.",
  "estate.rangeControlForm.status.DRAFT": "\nBozza",
  "estate.rangeControlForm.status.ACTIVE": "\nAttivo",
  "estate.rangeControlForm.status.WATCH": "\nGuarda",
  "estate.rangeControlForm.status.CLOSED": "\nChiuso",
  "estate.rangeControlForm.operationalStatusLabel": "\nPostura operativa",
  "estate.rangeControlForm.operationalStatusHint":
    "\nScopri se l'intervallo, il sistema di sicurezza, la risorsa di mira o l'elemento GFE sono disponibili, limitati o non disponibili.",
  "estate.rangeControlForm.operationalStatus.AVAILABLE": "\nDisponibile",
  "estate.rangeControlForm.operationalStatus.CONSTRAINED": "\nVincolato",
  "estate.rangeControlForm.operationalStatus.UNAVAILABLE": "\nNon disponibile",
  "estate.rangeControlForm.complianceStatusLabel": "\nAtteggiamento di conformità",
  "estate.rangeControlForm.complianceStatusHint":
    "\nTieni traccia se il controllo corrente è conforme, sotto controllo, richiede un'azione o non è conforme.",
  "estate.rangeControlForm.complianceStatus.COMPLIANT": "\nConforme",
  "estate.rangeControlForm.complianceStatus.WATCH": "\nGuarda",
  "estate.rangeControlForm.complianceStatus.ACTION_REQUIRED": "\nAzione richiesta",
  "estate.rangeControlForm.complianceStatus.NON_COMPLIANT": "\nNon conforme",
  "estate.rangeControlForm.metricValueLabel": "\nValore misurato",
  "estate.rangeControlForm.metricValueHint":
    "\nUtilizzalo per conteggi di disponibilità, totali di utilizzo o altri segnali operativi quantificati.",
  "estate.rangeControlForm.metricUnitLabel": "\nUnità metrica",
  "estate.rangeControlForm.metricUnitPlaceholder": "\nintervalli, corsie, veicoli o orari",
  "estate.rangeControlForm.metricUnitHint":
    "\nAssegnare un nome all'unità associata al valore misurato quando ne viene registrato uno.",
  "estate.rangeControlForm.targetDateLabel": "\nData prevista",
  "estate.rangeControlForm.targetDateHint":
    "\nUtilizzalo per date di ispezione, finestre di preparazione e ripristino, distribuzioni o tappe fondamentali di sostituzione.",
  "estate.rangeControlForm.notesLabel": "\nNote operative",
  "estate.rangeControlForm.notesPlaceholder":
    "\nCattura il coordinamento del fuoco vivo, il contesto di sicurezza, i vincoli di manutenzione, i dettagli di implementazione o le ipotesi di sostituzione.",
  "estate.rangeControlForm.notesHint":
    "\nPreservare un contesto sufficiente per la pianificazione TAROM, la garanzia della sicurezza e il reporting operativo rivolto al DIO.",
  "estate.rangeControlForm.requiredHint":
    "\nTitolo, dominio, tipo di record, sito, stato del flusso di lavoro, comportamento operativo, comportamento di conformità e note sono sempre obbligatori. Le regole per asset, metrica e data di destinazione vengono convalidate automaticamente.",
  "estate.rangeControlForm.submit": "\nSalva record di controllo operativo",
  "estate.rangeControlForm.submitAria": "\nSalva record di controllo operativo",
  "estate.rangeControlForm.summary.constraints": "\n{count} vincolato",
  "estate.rangeControlForm.summary.actions": "\n{count} azione richiesta",
  "estate.rangeControlForm.empty": "\nNessun record di controllo operativo ancora acquisito.",
  "estate.rangeControlForm.emptySites": "\nNessun sito attivo disponibile",
  "estate.rangeControlForm.emptySitesTitle":
    "\nCrea un sito prima di acquisire l'intervallo e i record di controllo GFE",
  "estate.rangeControlForm.emptySitesDescription":
    "\nI record di raggio operativo, sicurezza, mira e GFE si collegano direttamente a un sito gestito e a una risorsa facoltativa dello stesso sito.",
  "estate.rangeControlForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "estate.rangeControlForm.tableAria": "\nRecord di controllo gamma e GFE",
  "estate.rangeControlForm.table.record": "\nRegistra",
  "estate.rangeControlForm.table.domain": "\nDominio",
  "estate.rangeControlForm.table.site": "\nSito e risorsa",
  "estate.rangeControlForm.table.status": "\nStato",
  "estate.rangeControlForm.table.signal": "\nSegnale operativo",
  "estate.rangeControlForm.table.notes": "\nNote",
  "estate.rangeControlForm.table.assetUnlinked": "\nNessuna risorsa collegata",
  "estate.rangeControlForm.table.updatedAt": "\nAggiornato {date}",
  "estate.rangeControlForm.table.signalRangeAvailability": "\n{value} {unit} disponibile",
  "estate.rangeControlForm.table.signalTargetAvailability": "\n{value} {unit} disponibile",
  "estate.rangeControlForm.table.signalGfeUtilisation": "\n{value} {unit} utilizzato",
  "estate.rangeControlForm.table.signalSafetyDefect": "\nPostura difettosa: {status}",
  "estate.rangeControlForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.rangeControlForm.table.signalNone": "\nNessun segnale operativo ancora registrato.",
  "estate.rangeControlForm.validation.titleRequired":
    "\nÈ richiesto il titolo di controllo operativo.",
  "estate.rangeControlForm.validation.domainRequired":
    "\nScegli un dominio di controllo dell'intervallo valido.",
  "estate.rangeControlForm.validation.recordTypeRequired":
    "\nScegli un tipo di record di controllo dell'intervallo valido.",
  "estate.rangeControlForm.validation.recordTypeDomainMismatch":
    "\nScegli un tipo di record che corrisponda al dominio di controllo dell'intervallo selezionato.",
  "estate.rangeControlForm.validation.siteRequired": "\nSeleziona un sito immobiliare valido.",
  "estate.rangeControlForm.validation.assetRequired":
    "\nI record Targetry e GFE richiedono una risorsa collegata allo stesso sito.",
  "estate.rangeControlForm.validation.assetMismatch":
    "\nLe risorse collegate devono appartenere al sito immobiliare selezionato.",
  "estate.rangeControlForm.validation.statusRequired":
    "\nÈ richiesto lo stato di controllo operativo.",
  "estate.rangeControlForm.validation.operationalStatusRequired":
    "\nÈ richiesta la postura operativa.",
  "estate.rangeControlForm.validation.complianceStatusRequired":
    "\nÈ richiesto un atteggiamento di conformità.",
  "estate.rangeControlForm.validation.metricValueRequired":
    "I record di disponibilità e utilizzo richiedono un valore misurato.",
  "estate.rangeControlForm.validation.metricValueInvalid":
    "\nIl valore misurato deve essere zero o maggiore.",
  "estate.rangeControlForm.validation.metricUnitRequired":
    "\nL'unità metrica è richiesta quando viene registrato un valore misurato.",
  "estate.rangeControlForm.validation.targetDateRequired":
    "\nQuesto tipo di record richiede una data di destinazione.",
  "estate.rangeControlForm.validation.targetDateInvalid":
    "\nLa data prevista deve essere un valore di calendario valido.",
  "estate.rangeControlForm.validation.safetyDefectComplianceMismatch":
    "\nI difetti di sicurezza non possono essere registrati come conformi.",
  "estate.rangeControlForm.feedback.saved":
    "\nRecord di controllo operativo salvato nell'area di lavoro della tenuta.",
  "estate.rangeControlForm.feedback.saveFailed":
    "\nImpossibile rendere persistente il record di controllo operativo al momento.",
  "estate.rangeControlForm.feedback.updated": "\nRecord di controllo operativo aggiornato.",
  "estate.rangeControlForm.feedback.deleted":
    "\nRecord di controllo operativo rimosso dall'area di lavoro.",
  "estate.rangeControlForm.feedback.deleteFailed":
    "\nImpossibile rimuovere il record di controllo operativo in questo momento.",
  "estate.rangeControlForm.validation.recordNotFound":
    "\nIl record di controllo dell'intervallo richiesto non è stato trovato.",
  "estate.readiness.assets":
    "\nLa situazione delle risorse e delle strutture fornisce già l'attuale riferimento immobiliare.",
  "estate.readiness.delivery":
    "\nGli ordini di lavoro e i documenti operativi già ancorano la consegna FM e il monitoraggio del contratto.",
  "estate.readiness.programme":
    "\nI registri dei progetti, la pianificazione finanziaria e le iniziative durevoli possono già portare le approvazioni nel flusso del programma.",
  "estate.action.assets":
    "\nEsaminare il registro delle risorse autorevoli, la gerarchia, la condizione e la situazione del ciclo di vita.",
  "estate.action.workOrders":
    "\nPassa direttamente all'Hard FM attivo, al recupero e al lavoro statutario che modella l'assicurazione patrimoniale.",
  "estate.action.finance":
    "\nTrasferisci la pressione patrimoniale nella definizione del budget, negli scenari di pianificazione e nelle discussioni di approvazione.",
  "estate.action.reports":
    "\nAssembla la situazione, la preparazione, le prestazioni e l'attività di mitigazione nei pacchetti di report esecutivi.",
  "estate.action.buildings":
    "\nIspeziona le strutture, la situazione degli asset costruiti e la disponibilità dei gemelli all'interno della gerarchia immobiliare.",
  "estate.page.eyebrow": "\nAereo di controllo immobiliare",
  "estate.page.readinessRailDescription":
    "\nTieni traccia del segnale attuale del portafoglio in termini di disponibilità delle risorse, pressione di consegna in tempo reale e blocchi dei programmi prima di instradare il lavoro nei domini downstream.",
  "estate.page.readinessRail.assetSignal":
    "\nLa disponibilità legata ad asset e gamma rimane il segnale principale per la preparazione dell'immobile e il supporto alla formazione.",
  "estate.page.readinessRail.deliverySignal":
    "\nLa pressione di consegna comprende il lavoro aperto, le ispezioni scadute e le attività di mitigazione che incidono sulla posizione di garanzia.",
  "estate.page.readinessRail.programmeSignal":
    "\nI controlli del programma mostrano dove le approvazioni, i progetti ad alto rischio e le dipendenze finanziarie limitano il ripristino operativo.",
  "estate.page.readinessRail.sites":
    "I segnali del sito vincolato {count} richiedono la mitigazione della disponibilità e il follow-through operativo.",
  "estate.page.readinessRail.inspections":
    "\nI {count} segnali di ispezione scaduti rimangono attivi nell'immagine della proprietà.",
  "estate.page.readinessRail.delivery":
    "\n{count} i segnali dell'ordine di lavoro violati stanno modellando il quadro attuale della consegna.",
  "estate.page.performanceTitle": "\nEsecuzione della consegna e controllo del contratto",
  "estate.page.performanceDescription":
    "\nMonitora il throughput di esecuzione, la capacità della forza lavoro, la produttività e la domanda di miglioramento all'interno dello stesso piano di controllo aziendale.",
  "estate.page.performanceControlsTitle": "\nAzioni di miglioramento",
  "estate.page.performanceControlsDescription":
    "\nI risultati del contratto {changes} rimangono scaduti e continuano a formare la coda di miglioramento attiva.",
  "estate.page.decisionBoardTitle": "\nScheda di comando eccezione",
  "estate.page.decisionBoardDescription":
    "\nRisolvere gli ostacoli alla preparazione, le violazioni della consegna, le approvazioni e i problemi di dipendenza che richiedono un intervento prima del ciclo operativo successivo.",
  "estate.page.decisionBoardBriefTitle": "\nAttenzione immediata",
  "estate.page.decisionBoardBriefDescription":
    "\nInizia con siti vincolati, lavoro violato, dipendenze instabili o approvazioni ritardate prima di indirizzare l'impegno verso report e pacchetti.",
  "estate.page.overviewActionsDescription":
    "\nPassa direttamente dalla valutazione delle eccezioni ai pacchetti di report, alle superfici di amministrazione e ai flussi di lavoro di pianificazione che gestiscono il recupero patrimoniale.",
  "estate.page.approvalsFocusDescription":
    "\nGuidare con approvazioni ritardate, iniziative ad alto rischio e pressione sulle risorse prima di passare alla strategia, alle iniziative e ai controlli del progetto.",
  "estate.page.assuranceFocusDescription":
    "\nGestire il rischio patrimoniale, le violazioni nella consegna e le azioni di miglioramento aperte prima di approfondire il registro, la governance FM e le prove di gestione.",
  "estate.page.partnershipsFocusDescription":
    "\nGuidare con i conflitti di accordo, la qualità del servizio e l'attenzione all'integrazione prima di passare alle superfici dettagliate del contratto e delle dipendenze.",
  "estate.page.commandCard.watchTitle": "\nFunzionalità della lista di controllo",
  "estate.page.commandCard.watchDescription":
    "\n{total} i segnali di capacità tracciati sono in gioco nella posizione dell'azienda.",
  "estate.page.commandCard.constrainedSitesTitle": "\nSiti vincolati",
  "estate.page.commandCard.constrainedSitesDescription":
    "\n{inspections} I segnali di ispezione scaduti stanno modellando il quadro della proprietà vincolata.",
  "estate.page.commandCard.inspectionsTitle": "\nIspezioni scadute",
  "estate.page.commandCard.inspectionsDescription":
    "\nChiari controlli legali e di preparazione prima che il debito assicurativo si allarghi in tutto il patrimonio.",
  "estate.page.commandCard.highRiskTitle": "\nProgetti ad alto rischio",
  "estate.page.commandCard.highRiskDescription":
    "{conflicts} i segnali di conflitto di risorse stanno già influenzando la riga di approvazione e consegna.",
  "estate.page.commandCard.resourceConflictsTitle": "\nConflitti di risorse",
  "estate.page.commandCard.resourceConflictsDescription":
    "\nPortare il personale, i finanziamenti e la pressione sulle consegne nelle superfici di pianificazione prima che i controlli scivolino.",
  "estate.page.commandCard.deliveryBreachesTitle": "\nOrdini di lavoro violati",
  "estate.page.commandCard.deliveryBreachesDescription":
    "\n{actions} le azioni di miglioramento aperte sono ancora dietro l'attuale quadro della violazione della consegna.",
  "estate.page.commandCard.partnershipConflictsTitle": "\nConflitti di coordinamento",
  "estate.page.commandCard.partnershipConflictsDescription":
    "\nI segnali di accordo attivo {agreements} necessitano ancora di un follow-through commerciale e operativo allineato.",
  "estate.page.commandCard.cateringTitle": "\nPunteggio servizio ristorazione",
  "estate.page.commandCard.cateringDescription":
    "\nTratta la qualità ESS come una misura operativa reale insieme ad accordi, dipendenze e supporto alla costruzione.",
  "estate.page.commandCard.integrationsDescription":
    "\n{configured} delle {total} integrazioni collegate all'azienda sono attualmente configurate all'interno del piano di controllo.",
  "estate.page.decisionCard.readinessTitle": "\nElimina i blocchi di preparazione",
  "estate.page.decisionCard.readinessDescription":
    "\nIncrementa i siti vincolati, le ispezioni scadute e le funzionalità di watchlist nei flussi di lavoro che gestiscono la mitigazione.",
  "estate.page.decisionCard.performanceTitle": "\nStabilizza le prestazioni di consegna",
  "estate.page.decisionCard.performanceDescription":
    "\nAgire sugli ordini di lavoro violati, sulla pressione del lavoro e sulle azioni di miglioramento del contratto prima che i termini di servizio si allarghino.",
  "estate.page.decisionCard.dependenciesTitle": "\nRipristina dipendenze critiche",
  "estate.page.decisionCard.dependenciesDescription":
    "\nTratta le integrazioni di finanza, documenti, approvvigionamento ed ESS come controlli operativi in tempo reale anziché come metadati di amministrazione.",
  "estate.page.decisionCard.approvalsTitle": "\nSblocca decisioni sul programma",
  "estate.page.decisionCard.approvalsDescription":
    "\nEliminare le approvazioni ritardate, la pressione finanziaria e i cambiamenti di controllo prima che blocchino il recupero immobiliare e il lavoro di assicurazione.",
  "estate.page.launchpadsTitle": "\nLaunchpad esecutivi",
  "estate.page.launchpadsDescription":
    "\nPassa dalla posizione patrimoniale al reporting DIO, alla garanzia FM, alla supervisione della gestione e alla revisione delle dipendenze di integrazione senza uscire dalla shell.",
  "estate.page.launchpadsBadge": "\nControlli del portafoglio",
  "estate.page.launchpadsBriefTitle": "\nBrief per l'operatore",
  "estate.page.launchpadsBriefDescription":
    "\nUtilizza questi launchpad quando la conversazione di controllo deve passare dalla postura in tempo reale ai pacchetti di reporting, alle prove di garanzia o alle dipendenze di sistema di supporto.",
  "estate.page.launchpadsLane.governanceTitle": "\nGovernance",
  "estate.page.launchpadsLane.governanceHeadline":
    "\nTieni sotto controllo strategia, approvazioni e decisioni di investimento.",
  "estate.page.launchpadsLane.governanceDescription":
    "Mantieni allineati la strategia patrimoniale, i controlli dei programmi e la pianificazione finanziaria prima che le decisioni lascino il piano di controllo.",
  "estate.page.launchpadsLane.assuranceTitle": "\nGaranzia",
  "estate.page.launchpadsLane.assuranceHeadline":
    "\nCollega la consegna FM, la gestione e i segnali contrattuali a prove pronte per l'audit.",
  "estate.page.launchpadsLane.assuranceDescription":
    "\nUtilizza i pacchetti di governance e gestione FM per fornire informazioni su problemi di conformità, prestazioni e ripristino con un contesto operativo condiviso.",
  "estate.page.launchpadsLane.readinessTitle": "\nProntezza",
  "estate.page.launchpadsLane.readinessHeadline":
    "\nAumenta tempestivamente portata, capacità e blocchi dell'infrastruttura.",
  "estate.page.launchpadsLane.readinessDescription":
    "\nInserisci segnali di preparazione nel reporting e nella pianificazione prima che i vincoli diventino errori di servizio, formazione o approvazione.",
  "estate.page.launchpadsLane.externalTitle": "\nDipendenze",
  "estate.page.launchpadsLane.externalHeadline":
    "\nTratta le integrazioni aziendali e i sistemi dei partner come controlli operativi.",
  "estate.page.launchpadsLane.externalDescription":
    "\nEsaminare le dipendenze finanziarie, documentali, di approvvigionamento e di ristorazione come parte del quadro operativo dell'eredità anziché come dati amministrativi separati.",
  "estate.readiness.actionsTitle": "\nAzioni del flusso di lavoro di preparazione",
  "estate.readiness.actionsDescription":
    "\nIncrementa il livello di preparazione nei flussi di lavoro connessi che possiedono prove di mitigazione, finanziamento e garanzia.",
  "estate.readiness.action.report": "\nApri il pacchetto di preparazione",
  "estate.readiness.action.workOrders": "\nOrdini di lavoro aperti",
  "estate.readiness.action.finance": "\nPianificazione finanza aperta",
  "estate.operationalPicture.actionsTitle": "\nAzioni immagine operativa",
  "estate.operationalPicture.actionsDescription":
    "\nPassare dal quadro di controllo integrato alle superfici dettagliate che possiedono prove anagrafiche, esecuzione del lavoro e reporting esecutivo.",
  "estate.operationalPicture.action.report": "\nApri pacchetto operativo",
  "estate.operationalPicture.action.assets": "\nApri risorse",
  "estate.operationalPicture.action.workOrders": "\nOrdini di lavoro aperti",
  "fleet.title": "\nFlotta",
  "fleet.subtitle": "\nPostura veicolo, utilizzo e pressione di manutenzione",
  "fleet.coverage":
    "\nInizia con l'attuale sezione della piattaforma relativa ai veicoli, per poi ampliare la sezione di spedizione, conformità e telematica.",
  "fleet.view.overview": "\nPanoramica",
  "fleet.view.operations": "\nOperazioni",
  "fleet.view.initiatives": "\nIniziative",
  "fleet.view.dependencies": "\nDipendenze",
  "fleet.kpi.vehicles": "\nVeicoli",
  "fleet.kpi.vehiclesDesc": "\nBeni attualmente classificati come flotta di veicoli",
  "fleet.kpi.telemetry": "\nVeicoli supportati da telemetria",
  "fleet.kpi.telemetryDesc": "\nVeicoli che già riportano segnali operativi",
  "fleet.kpi.tasks": "\nAttività flotta aperte",
  "fleet.kpi.tasksDesc": "\nArretrato di manutenzione collegato agli asset del veicolo",
  "fleet.kpi.operations": "\nControlli della flotta",
  "fleet.kpi.operationsDesc": "\nRegistri relativi a condizioni durevoli, incidenti e sostituzioni",
  "fleet.kpi.sites": "\nSiti flotta",
  "fleet.kpi.sitesDesc": "\nSiti che attualmente ospitano almeno una risorsa veicolo",
  "fleet.summary.alertTitle":
    "\nL'implementazione della flotta può già essere ancorata ai dati delle operazioni in tempo reale",
  "fleet.summary.alertDescription":
    "Utilizza la copertura telemetrica, il lavoro attivo e i segnali AI per organizzare l'invio, la conformità e l'espansione della manutenzione senza uno stack di flotta separato.",
  "fleet.summary.tab.coverage": "\nCopertura",
  "fleet.summary.tab.maintenance": "\nPressione di mantenimento",
  "fleet.summary.tab.operations": "\nControllo operazioni",
  "fleet.summary.telemetryTitle": "\nPredisposizione telemetria veicolo",
  "fleet.summary.telemetryDescription":
    "\nI veicoli supportati dalla telemetria forniscono le basi attuali per la sicurezza delle spedizioni e le operazioni della flotta consapevoli dell'utilizzo.",
  "fleet.summary.telemetryConnected": "\nVeicoli connessi tramite telemetria",
  "fleet.summary.telemetryConnectedDesc":
    "\n{total} i veicoli sono attualmente nella sezione attiva della flotta.",
  "fleet.summary.telemetryStale": "\nVeicoli telemetrici obsoleti",
  "fleet.summary.telemetryStaleDesc":
    "\n{coverage} della flotta utilizza attualmente dati di telemetria non aggiornati.",
  "fleet.summary.postureTitle": "\nPostura di prontezza",
  "fleet.summary.postureDescription":
    "\nPromuovi insieme l'aggiornamento della telemetria, il contesto del segnale AI e il follow-through delle attività in modo che la flotta diventi un sistema operativo anziché un elenco di risorse filtrato.",
  "fleet.summary.badgeTelemetry": "\nTelemetria",
  "fleet.summary.badgeStaleness": "\nStanchità",
  "fleet.summary.badgeSignals": "\nSegnali AI",
  "fleet.summary.openTasksTitle": "\nAttività di manutenzione aperte",
  "fleet.summary.openTasksDesc":
    "\nLavoro arretrato, programmato e in corso attualmente collegato alle risorse del veicolo.",
  "fleet.summary.overdueTasksTitle": "\nLavoro in ritardo",
  "fleet.summary.overdueTasksDesc":
    "\nGli interventi scaduti del veicolo sono il segnale più chiaro della pressione dei tempi di fermo dovuti alla manutenzione.",
  "fleet.summary.signalsTitle": "\nVeicoli con segnaletica",
  "fleet.summary.signalsDesc":
    "\nÈ possibile dare priorità ai veicoli con previsioni AI attive per la spedizione, la sostituzione o l'intervento.",
  "fleet.summary.operationsTitle": "Registro di controllo operativo",
  "fleet.summary.operationsDescription":
    "\nAcquisisci i dati relativi a condizioni durevoli, incidenti, manutenzione, utilizzo e sostituzione nello stesso spazio di lavoro della flotta SSR.",
  "fleet.summary.operationsCountLabel":
    "\n{count} record operativi della flotta sono presenti nel registro attuale.",
  "fleet.summary.accidentsTitle": "\nRegistro degli incidenti",
  "fleet.summary.accidentsDesc":
    "\nGli incidenti della flotta registrati ora persistono come controlli operativi durevoli invece che come note ad hoc.",
  "fleet.summary.downtimeTitle": "\nTempo di inattività o sostituzione dovuta",
  "fleet.summary.downtimeDesc":
    "\nI record contrassegnati o in scadenza di sostituzione mostrano i casi in cui la disponibilità della flotta è già limitata.",
  "fleet.summary.replacementTitle": "\nPianificazione sostituzione",
  "fleet.summary.replacementDesc":
    "\nI piani di sostituzione ora si affiancano alla strategia della flotta attiva in modo che la pressione del ciclo di vita possa spostarsi nella finanza e nel reporting.",
  "fleet.initiativeForm.title": "\nCrea un'iniziativa flotta",
  "fleet.initiativeForm.description":
    "\nOrganizza il prossimo intervento di invio, manutenzione, conformità o sostituzione della flotta direttamente dalla telemetria in tempo reale e dalla postura di lavoro.",
  "fleet.initiativeForm.badge": "\nFlusso durevole della flotta",
  "fleet.initiativeForm.nameLabel": "\nTitolo iniziativa",
  "fleet.initiativeForm.namePlaceholder":
    "\nSprint per la riduzione dei tempi di fermo del furgone",
  "fleet.initiativeForm.nameHint":
    "Utilizza un titolo che possa sopravvivere nei report e nei passaggi agli operatori.",
  "fleet.initiativeForm.scopeLabel": "\nAmbito flotta",
  "fleet.initiativeForm.scopePlaceholder":
    "\nFurgoni critici, deposito ovest o percorsi sensibili alla conformità",
  "fleet.initiativeForm.scopeHint":
    "\nAssegna un nome al gruppo di percorso, alla classe del veicolo, al deposito o alla porzione di servizio interessata.",
  "fleet.initiativeForm.categoryLabel": "\nCategoria",
  "fleet.initiativeForm.categoryHint":
    "\nClassificare l'iniziativa in base al risultato principale della flotta.",
  "fleet.initiativeForm.category.DISPATCH": "\nSpedizione",
  "fleet.initiativeForm.category.UTILISATION": "\nUtilizzo",
  "fleet.initiativeForm.category.MAINTENANCE": "\nManutenzione",
  "fleet.initiativeForm.category.COMPLIANCE": "\nConformità",
  "fleet.initiativeForm.category.ENERGY": "\nEnergia",
  "fleet.initiativeForm.category.REPLACEMENT": "\nSostituzione",
  "fleet.initiativeForm.priorityLabel": "\nPriorità",
  "fleet.initiativeForm.priorityHint": "\nCollocare l'iniziativa nell'orizzonte operativo attuale.",
  "fleet.initiativeForm.priority.NOW": "\nOra",
  "fleet.initiativeForm.priority.NEXT": "\nSuccessivo",
  "fleet.initiativeForm.priority.LATER": "\nPiù tardi",
  "fleet.initiativeForm.priority.WATCH": "\nGuarda",
  "fleet.initiativeForm.notesLabel": "\nNote e ipotesi",
  "fleet.initiativeForm.notesPlaceholder":
    "\nCattura la pressione dei tempi di inattività, i problemi di conformità, i vincoli di spedizione o i segnali di sostituzione alla base di questa iniziativa.",
  "fleet.initiativeForm.notesHint":
    "\nRegistrare il ragionamento che dovrebbe sopravvivere nel follow-through dell'invio e della manutenzione.",
  "fleet.initiativeForm.requiredHint":
    "\nTitolo, ambito della flotta, categoria e priorità sono obbligatori.",
  "fleet.initiativeForm.submit": "\nSalva iniziativa flotta",
  "fleet.initiativeForm.submitAria": "\nSalva iniziativa flotta",
  "fleet.initiativeForm.recentTitle": "\nIniziative recenti sulla flotta",
  "fleet.initiativeForm.recentDescription":
    "\nQueste iniziative ora persistono come record durevoli della flotta senza lasciare l'area di lavoro SSR.",
  "fleet.initiativeForm.empty": "\nNessuna iniziativa della flotta ancora catturata.",
  "fleet.initiativeForm.emptyCta":
    "\nCrea la tua prima iniziativa per la flotta per iniziare a monitorare i miglioramenti operativi.",
  "fleet.initiativeForm.savedAt": "\nAggiornato {updatedAt}",
  "fleet.initiativeForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "fleet.initiativeForm.validation.titleRequired": "\nIl titolo dell'iniziativa è obbligatorio.",
  "fleet.initiativeForm.validation.scopeRequired": "\nL'ambito della flotta è obbligatorio.",
  "fleet.initiativeForm.validation.categoryRequired": "\nLa categoria è obbligatoria.",
  "fleet.initiativeForm.validation.priorityRequired": "\nLa priorità è obbligatoria.",
  "fleet.initiativeForm.feedback.saved":
    "\nIniziativa della flotta salvata nell'area di lavoro della flotta.",
  "fleet.initiativeForm.feedback.saveFailed":
    "\nImpossibile mantenere l'iniziativa della flotta in questo momento.",
  "fleet.operationsForm.title": "\nAcquisisci un record di operazione della flotta",
  "fleet.operationsForm.description":
    "\nRegistra le condizioni del veicolo, gli incidenti, l'attività di manutenzione, le revisioni dell'utilizzo e la pianificazione della sostituzione direttamente dall'area di lavoro in tempo reale della flotta.",
  "fleet.operationsForm.badge": "\nControllo operativo duraturo",
  "fleet.operationsForm.nameLabel": "\nTitolo del disco",
  "fleet.operationsForm.namePlaceholder":
    "\nRevisione della disponibilità alla sostituzione del veicolo 12",
  "fleet.operationsForm.nameHint":
    "\nUtilizza un titolo che abbia ancora senso nei rapporti, nei passaggi di consegne e nelle discussioni finanziarie.",
  "fleet.operationsForm.assetLabel": "\nAsset flotta collegata",
  "fleet.operationsForm.assetPlaceholder": "\nSeleziona un asset della flotta",
  "fleet.operationsForm.assetHint":
    "\nCollega il record alla risorsa del veicolo che trasporta l'impatto operativo o il segnale di revisione.",
  "fleet.operationsForm.assetOption": "Risorsa: {name} – {siteName}",
  "fleet.operationsForm.recordTypeLabel": "\nTipo di registrazione",
  "fleet.operationsForm.recordTypeHint":
    "\nScegli il controllo operativo che questo record aggiunge al registro della flotta.",
  "fleet.operationsForm.recordType.CONDITION_CHECK": "\nControllo delle condizioni",
  "fleet.operationsForm.recordType.ACCIDENT_RECORD": "\nRegistro degli incidenti",
  "fleet.operationsForm.recordType.MAINTENANCE_ACTIVITY": "\nAttività di manutenzione",
  "fleet.operationsForm.recordType.UTILISATION_REVIEW": "\nRevisione dell'utilizzo",
  "fleet.operationsForm.recordType.REPLACEMENT_PLAN": "\nPiano di sostituzione",
  "fleet.operationsForm.statusLabel": "\nStato del flusso di lavoro",
  "fleet.operationsForm.statusHint":
    "\nUtilizza lo stato del flusso di lavoro per indicare se il controllo è attivo, osservato o chiuso.",
  "fleet.operationsForm.status.DRAFT": "\nBozza",
  "fleet.operationsForm.status.ACTIVE": "\nAttivo",
  "fleet.operationsForm.status.WATCH": "\nGuarda",
  "fleet.operationsForm.status.CLOSED": "\nChiuso",
  "fleet.operationsForm.conditionStatusLabel": "\nCondizione postura",
  "fleet.operationsForm.conditionStatusHint":
    "Registra le condizioni operative della risorsa della flotta collegata.",
  "fleet.operationsForm.conditionStatus.OPERATIONAL": "\nOperativo",
  "fleet.operationsForm.conditionStatus.WATCH": "\nGuarda",
  "fleet.operationsForm.conditionStatus.DOWN": "\nGiù",
  "fleet.operationsForm.conditionStatus.REPLACEMENT_DUE": "\nSostituzione dovuta",
  "fleet.operationsForm.metricValueLabel": "\nValore misurato",
  "fleet.operationsForm.metricValuePlaceholder": "ad esempio 78",
  "fleet.operationsForm.metricValueHint":
    "\nUtilizzalo per punteggi di utilizzo, conteggi di output o altri segnali misurati della flotta.",
  "fleet.operationsForm.metricUnitLabel": "\nUnità metrica",
  "fleet.operationsForm.metricUnitPlaceholder": "\npercentuale, ore o viaggi",
  "fleet.operationsForm.metricUnitHint":
    "\nAggiungere un'unità ogni volta che viene registrato un valore misurato in modo che i rapporti rimangano interpretabili.",
  "fleet.operationsForm.incidentDateLabel": "\nData dell'incidente",
  "fleet.operationsForm.incidentDateHint":
    "\nLe registrazioni degli incidenti richiedono la data di calendario dell'incidente.",
  "fleet.operationsForm.targetDateLabel": "\nData prevista",
  "fleet.operationsForm.targetDateHint":
    "\nI piani di sostituzione dovrebbero riportare la prossima data di revisione o azione target.",
  "fleet.operationsForm.notesLabel": "\nNote e contesto operativo",
  "fleet.operationsForm.notesPlaceholder":
    "\nCattura l'impatto dei tempi di inattività, i risultati sull'utilizzo, le azioni correttive o le ipotesi sul ciclo di vita alla base di questo record.",
  "fleet.operationsForm.notesHint":
    "\nQueste note dovrebbero sopravvivere nei rapporti, nel follow-through della manutenzione e nella pianificazione delle sostituzioni.",
  "fleet.operationsForm.requiredHint":
    "\nSono obbligatori il titolo, la risorsa della flotta collegata, il tipo di record, lo stato del flusso di lavoro, lo stato delle condizioni e le note.",
  "fleet.operationsForm.submit": "\nSalva record operazioni flotta",
  "fleet.operationsForm.submitAria": "\nSalva record operazioni flotta",
  "fleet.operationsForm.recentTitle": "\nRegistri recenti delle operazioni della flotta",
  "fleet.operationsForm.recentDescription":
    "\nIl registro della flotta ora conserva i record di controllo operativo direttamente nell'area di lavoro SSR.",
  "fleet.operationsForm.empty":
    "\nNessun record relativo alle operazioni della flotta ancora acquisito.",
  "fleet.operationsForm.emptyCta":
    "\nAcquisisci un registro delle operazioni della flotta per iniziare a creare il registro di controllo.",
  "fleet.operationsForm.emptyVehiclesTitle":
    "\nNessuna risorsa della flotta è ancora pronta per i controlli operativi",
  "fleet.operationsForm.emptyVehiclesDescription":
    "\nCrea o classifica prima le risorse del veicolo in modo che le condizioni della flotta e i record di sostituzione possano essere collegati alle risorse reali.",
  "fleet.operationsForm.savedAt": "\nAggiornato {updatedAt}",
  "fleet.operationsForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "fleet.operationsForm.signal.asset": "\nRisorsa",
  "fleet.operationsForm.signal.metric": "\nSegnale misurato",
  "fleet.operationsForm.signal.incidentDate": "\nData dell'incidente",
  "fleet.operationsForm.signal.targetDate": "\nData prevista",
  "fleet.operationsForm.validation.titleRequired": "\nIl titolo del record è obbligatorio.",
  "fleet.operationsForm.validation.assetRequired": "\nÈ richiesto un asset della flotta collegato.",
  "fleet.operationsForm.validation.recordTypeRequired": "\nIl tipo di record è obbligatorio.",
  "fleet.operationsForm.validation.statusRequired":
    "\nLo stato del flusso di lavoro è obbligatorio.",
  "fleet.operationsForm.validation.conditionStatusRequired":
    "\nÈ richiesta la postura condizionale.",
  "fleet.operationsForm.validation.notesRequired": "\nSono necessarie note operative.",
  "fleet.operationsForm.validation.metricValueInvalid":
    "\nIl valore misurato deve essere un numero valido maggiore o uguale a zero.",
  "fleet.operationsForm.validation.metricValueRequired":
    "\nLe revisioni dell'utilizzo richiedono un valore misurato.",
  "fleet.operationsForm.validation.metricUnitRequired":
    "\nL'unità metrica è richiesta quando viene registrato un valore misurato.",
  "fleet.operationsForm.validation.incidentDateInvalid":
    "\nLa data dell'incidente deve essere un valore di calendario valido.",
  "fleet.operationsForm.validation.incidentDateRequired":
    "\nI registri degli incidenti richiedono una data dell'incidente.",
  "fleet.operationsForm.validation.targetDateInvalid":
    "\nLa data prevista deve essere un valore di calendario valido.",
  "fleet.operationsForm.validation.targetDateRequired":
    "\nI piani di sostituzione richiedono una data prevista.",
  "fleet.operationsForm.validation.assetNotFound":
    "\nImpossibile trovare la risorsa della flotta collegata.",
  "fleet.operationsForm.feedback.saved":
    "\nRecord delle operazioni della flotta salvato nell'area di lavoro della flotta.",
  "fleet.operationsForm.feedback.saveFailed":
    "Impossibile mantenere il record delle operazioni della flotta in questo momento.",
  "fleet.readiness.vehicles":
    "\nLe risorse classificate come veicoli forniscono già una base di riferimento iniziale per la flotta.",
  "fleet.readiness.telemetry":
    "\nI veicoli supportati dalla telemetria possono ancorare le implementazioni di spedizioni e conformità.",
  "fleet.readiness.tasks":
    "\nI flussi di lavoro di manutenzione esistenti comportano già il lavoro della flotta.",
  "fleet.page.eyebrow": "\nCockpit operativo della flotta",
  "fleet.page.readinessRailDescription":
    "\nUtilizza questo binario per decidere dove il rischio del servizio, la pressione della manutenzione e la governance delle sostituzioni richiedono attenzione prima di passare ai flussi di lavoro di coda, finanza o reporting.",
  "fleet.page.readinessRail.vehicleSignal":
    "\nLa disponibilità dei veicoli e la copertura telemetrica rimangono il punto di riferimento per la garanzia della flotta.",
  "fleet.page.readinessRail.maintenanceSignal":
    "\nI tempi di inattività, la gestione degli incidenti e le attività scadute definiscono la pressione operativa immediata.",
  "fleet.page.readinessRail.replacementSignal":
    "\nI candidati sostitutivi e le flotte obsolete dovrebbero passare alla pianificazione finanziaria prima delle finestre di interruzione del servizio.",
  "fleet.page.commandTitle": "\nPosizione di comando della flotta",
  "fleet.page.commandDescription":
    "\nCombina disponibilità dei veicoli, follow-up della manutenzione, controlli degli incidenti e pressione di sostituzione in un'unica immagine della flotta rivolta all'operatore.",
  "fleet.page.launchpadsTitle": "\nLaunchpad per decisioni sulla flotta",
  "fleet.page.launchpadsDescription":
    "\nPassare dalla telemetria operativa e dall'interruzione del servizio ad azioni regolamentate per l'utilizzo, la manutenzione, la sostituzione e il reporting.",
  "fleet.page.launchpadsBadge": "\nFlusso di lavoro aziendale",
  "fleet.page.launchpadsBriefTitle":
    "\nLa flotta ora si comporta come un portafoglio operativo gestito",
  "fleet.page.launchpadsBriefDescription":
    "\nLa cabina di pilotaggio può supportare le decisioni di deposito, percorso, conformità e sostituzione senza lasciare l'aereo di controllo della flotta.",
  "fleet.page.launchpadsLane.maintenanceTitle": "\nControllo manutenzione",
  "fleet.page.launchpadsLane.maintenanceHeadline":
    "\nUtilizza record durevoli e code di lavoro attive per evitare che i tempi di inattività diventino perdite di servizio.",
  "fleet.page.launchpadsLane.maintenanceDescription":
    "\nAssocia i record degli incidenti, lo stato delle condizioni e il lavoro aperto con la coda di manutenzione e i pacchetti di consegna operativi.",
  "fleet.page.launchpadsLane.utilisationTitle": "\nPressione di utilizzo",
  "fleet.page.launchpadsLane.utilisationHeadline":
    "\nSpiega i picchi della domanda di veicoli con la telemetria in tempo reale e i segnali di servizio arretrato.",
  "fleet.page.launchpadsLane.utilisationDescription":
    "\nInstradare la pressione di utilizzo nella cabina di pilotaggio prima che flotte sottoutilizzate o sovraccariche distorcano la pianificazione.",
  "fleet.page.launchpadsLane.replacementTitle": "\nGovernance sostitutiva",
  "fleet.page.launchpadsLane.replacementHeadline":
    "Promuovere i veicoli obsoleti nella pianificazione degli investimenti mentre la continuità del servizio è ancora controllabile.",
  "fleet.page.launchpadsLane.replacementDescription":
    "\nUtilizza insieme i piani di sostituzione, i modelli di inattività e le conversazioni di capitale invece di righe di registro isolate.",
  "fleet.page.launchpadsLane.assuranceTitle": "\nGaranzia e reporting",
  "fleet.page.launchpadsLane.assuranceHeadline":
    "\nPrepara il pacchetto sullo stato dei veicoli, sugli arretrati e sulla preparazione per gli operatori, i leader finanziari e le revisioni della governance.",
  "fleet.page.launchpadsLane.assuranceDescription":
    "\nMantieni i pacchetti di report e le conversazioni finanziarie allineate con gli stessi controlli in tempo reale utilizzati dal team operativo.",
  "fleet.action.utilisation":
    "\nUtilizza il comportamento di utilizzo per identificare i picchi di domanda e la capacità inattiva.",
  "fleet.action.tasks":
    "\nPassa direttamente alla coda di lavoro eliminando i tempi di fermo del veicolo.",
  "fleet.action.reports":
    "\nRiepilogare la situazione della flotta per gli operatori e le parti interessate finanziarie.",
  "fleet.action.sensors":
    "\nIspeziona la copertura della telemetria in tempo reale e i dispositivi obsoleti che influiscono sulla fiducia della flotta.",
  "fleet.action.buildings":
    "\nCoordinare il contesto di depositi, piazzali e strutture con la domanda della flotta.",
  "fleet.action.addVehicle": "\nRegistrare un nuovo asset veicolo nella flotta.",
  "buildings.title": "\nEdifici",
  "buildings.subtitle": "\nPosizione delle strutture, copertura doppia e impronta operativa",
  "buildings.coverage":
    "\nCrea una gestione delle strutture basata su siti attuali, risorse non legate ai veicoli, gemelli digitali e dispositivi collegati.",
  "buildings.view.overview": "\nPanoramica",
  "buildings.view.initiatives": "\nIniziative",
  "buildings.view.performance": "\nPrestazioni",
  "buildings.view.dependencies": "\nDipendenze",
  "buildings.kpi.facilities": "\nStrutture",
  "buildings.kpi.facilitiesDesc": "\nSiti attualmente contrassegnati come strutture",
  "buildings.kpi.assets": "\nAsset della struttura",
  "buildings.kpi.assetsDesc": "\nBeni non automobilistici attualmente gestiti dalle strutture",
  "buildings.kpi.twins": "\nGemelli digitali",
  "buildings.kpi.twinsDesc": "\nModelli gemelli già allegati alla station wagon",
  "buildings.kpi.devices": "\nDispositivi collegati",
  "buildings.kpi.devicesDesc":
    "\nDispositivi IoT già disponibili per l'implementazione delle strutture",
  "buildings.summary.alertTitle":
    "\nL'implementazione delle strutture può già essere basata sui dati immobiliari",
  "buildings.summary.alertDescription":
    "\nUtilizza profili di pianificazione, gemelli digitali e dispositivi collegati per organizzare la gerarchia degli edifici e l'implementazione delle operazioni senza creare uno stack di strutture parallelo.",
  "buildings.summary.tab.facility": "\nPostura della struttura",
  "buildings.summary.tab.operations": "\nCopertura operativa",
  "buildings.summary.planningTitle": "\nPreparazione alla pianificazione e alla gerarchia",
  "buildings.summary.planningDescription":
    "\nI profili di pianificazione del sito rappresentano l'ancora attuale per l'area, la capacità della flotta e il contesto delle ore di funzionamento.",
  "buildings.summary.planningProfiles": "\nProfili di pianificazione",
  "buildings.summary.planningProfilesDesc":
    "\nLe strutture {total} sono attualmente incluse nell'ambito.",
  "buildings.summary.facilityAssets": "\nAsset della struttura",
  "buildings.summary.facilityAssetsDesc":
    "\nLe risorse non legate ai veicoli rappresentano l'attuale livello di base per sistemi, componenti e implementazione a livello di stanza.",
  "buildings.summary.postureTitle": "\nPostura di prontezza",
  "buildings.summary.postureDescription":
    "Promuovi insieme il contesto di pianificazione, i gemelli spaziali e i dispositivi collegati in modo che gli edifici diventino una gerarchia operativa anziché un elenco di siti semplici.",
  "buildings.summary.badgePlanning": "\nPianificazione",
  "buildings.summary.badgeTwin": "\nTwin-linked",
  "buildings.summary.badgeSensors": "\nSensore pronto",
  "buildings.summary.twinLinkedTitle": "\nImpianti gemelli",
  "buildings.summary.twinLinkedDesc":
    "\nStrutture con almeno un gemello digitale già collegato per flussi di lavoro spaziali.",
  "buildings.summary.sensorReadyTitle": "\nStrutture predisposte per sensori",
  "buildings.summary.sensorReadyDesc":
    "\nLe strutture con dispositivi IoT collegati possono supportare l'espansione della telemetria di stanze, zone e sistema.",
  "buildings.initiativeForm.title": "\nCrea un'iniziativa per le strutture",
  "buildings.initiativeForm.description":
    "\nOrganizza il prossimo pacchetto di implementazione o riparazione delle strutture direttamente dalla pianificazione in tempo reale, dal twin e dalla copertura dei sensori.",
  "buildings.initiativeForm.badge": "\nFlusso di strutture durevoli",
  "buildings.initiativeForm.nameLabel": "\nTitolo iniziativa",
  "buildings.initiativeForm.namePlaceholder": "\nRimessa in servizio HVAC per piani occupati",
  "buildings.initiativeForm.nameHint":
    "\nUtilizza un titolo che possa essere inserito nei resoconti e nel lavoro successivo.",
  "buildings.initiativeForm.scopeLabel": "\nAmbito della struttura",
  "buildings.initiativeForm.scopePlaceholder":
    "\nQuartier generale nord, campus ovest o cluster di strutture critiche",
  "buildings.initiativeForm.scopeHint":
    "\nAssegnare un nome al gruppo di strutture, all'area del campus o alla sezione operativa interessata.",
  "buildings.initiativeForm.categoryLabel": "\nCategoria",
  "buildings.initiativeForm.categoryHint":
    "\nClassificare l'iniziativa in base ai principali risultati delle strutture.",
  "buildings.initiativeForm.category.SPACE": "\nSpazio",
  "buildings.initiativeForm.category.SYSTEM": "\nSistema",
  "buildings.initiativeForm.category.ENERGY": "\nEnergia",
  "buildings.initiativeForm.category.COMPLIANCE": "\nConformità",
  "buildings.initiativeForm.phaseLabel": "\nFase",
  "buildings.initiativeForm.phaseHint":
    "\nPosiziona l'iniziativa nell'orizzonte di implementazione corrente.",
  "buildings.initiativeForm.phase.NOW": "\nOra",
  "buildings.initiativeForm.phase.NEXT": "\nSuccessivo",
  "buildings.initiativeForm.phase.LATER": "\nPiù tardi",
  "buildings.initiativeForm.notesLabel": "\nNote e ipotesi",
  "buildings.initiativeForm.notesPlaceholder":
    "\nCattura la pressione operativa, il contesto spaziale, l'esigenza di conformità o l'obiettivo energetico dietro questa iniziativa.",
  "buildings.initiativeForm.notesHint":
    "\nRegistra il ragionamento che dovrebbe sopravvivere nelle revisioni delle strutture e nei passaggi di consegne ai dirigenti.",
  "buildings.initiativeForm.requiredHint":
    "\nTitolo, ambito della struttura, categoria e fase sono obbligatori.",
  "buildings.initiativeForm.submit": "\nIniziativa salva strutture",
  "buildings.initiativeForm.submitAria": "\nSalva iniziativa edilizia",
  "buildings.initiativeForm.recentTitle": "\nIniziative recenti per le strutture",
  "buildings.initiativeForm.recentDescription":
    "\nQueste iniziative ora persistono come strutture durevoli senza lasciare l'area di lavoro SSR.",
  "buildings.initiativeForm.recentCountLabel":
    "\n{count} iniziative stanno attualmente modellando il registro delle strutture.",
  "buildings.initiativeForm.empty": "\nNessuna iniziativa per le strutture ancora acquisita.",
  "buildings.initiativeForm.emptyCta":
    "\nCrea la tua prima iniziativa per le strutture per iniziare a monitorare i miglioramenti degli edifici.",
  "buildings.initiativeForm.savedAt": "\nAggiornato {updatedAt}",
  "buildings.initiativeForm.notesEmpty": "\nNessuna nota ancora catturata.",
  "buildings.initiativeForm.validation.titleRequired":
    "\nIl titolo dell'iniziativa è obbligatorio.",
  "buildings.initiativeForm.validation.scopeRequired": "\nL'ambito della struttura è obbligatorio.",
  "buildings.initiativeForm.validation.categoryRequired": "\nLa categoria è obbligatoria.",
  "buildings.initiativeForm.validation.phaseRequired": "\nLa fase è obbligatoria.",
  "buildings.initiativeForm.feedback.saved":
    "\nIniziativa relativa alle strutture salvata nell'area di lavoro degli edifici.",
  "buildings.initiativeForm.feedback.saveFailed":
    "\nImpossibile mantenere l'iniziativa sulle strutture al momento.",
  "buildings.readiness.facilities":
    "\nL'assetto del sito e della struttura fornisce già il primo livello della gerarchia dell'edificio.",
  "buildings.readiness.twins":
    "La copertura Digital Twin può ancorare i flussi di lavoro di stanze, zone e sistemi.",
  "buildings.readiness.devices":
    "\nI dispositivi collegati possono essere promossi in visualizzazioni di telemetria delle strutture.",
  "buildings.page.eyebrow": "\nPiano di controllo delle strutture",
  "buildings.page.readinessRailDescription":
    "\nUtilizza questo binario per valutare la governance delle strutture, la doppia copertura e la conformità alla conformità prima di passare ai report, alla telemetria o alla pianificazione del capitale.",
  "buildings.page.readinessRail.facilitySignal":
    "\nLa gerarchia delle strutture e la postura dell'iniziativa definiscono l'attuale linea di base operativa dell'edificio.",
  "buildings.page.readinessRail.twinSignal":
    "\nLe strutture twin-linked sono il miglior ancoraggio per stanza, sistema e contesto di intervento.",
  "buildings.page.readinessRail.complianceSignal":
    "\nLe strutture predisposte per i sensori e guidate dalla revisione indicano dove ci si può fidare delle prove di garanzia oggi.",
  "buildings.page.commandTitle": "\nPostura dei comandi delle strutture",
  "buildings.page.commandDescription":
    "\nCombina la gerarchia delle strutture, il doppio collegamento, la disponibilità della telemetria e la pressione sulle azioni di miglioramento in un'unica visualizzazione delle strutture aziendali.",
  "buildings.page.launchpadsTitle": "\nPunti di lancio per le decisioni sulle strutture",
  "buildings.page.launchpadsDescription":
    "\nTraduci la postura dell'edificio in operazioni spaziali, garanzia di conformità e conversazioni di capitale senza creare uno stack di pianificazione separato.",
  "buildings.page.launchpadsBadge": "\nFlusso di lavoro aziendale",
  "buildings.page.launchpadsBriefTitle":
    "\nGli edifici ora vengono letti come un portafoglio di strutture gestite",
  "buildings.page.launchpadsBriefDescription":
    "\nLo spazio di lavoro può supportare la governance delle strutture, il follow-through dei gemelli digitali e l'escalation di capitale da un'unica superficie operativa.",
  "buildings.page.launchpadsLane.governanceTitle": "\nGovernance delle strutture",
  "buildings.page.launchpadsLane.governanceHeadline":
    "\nMantenere le iniziative della struttura legate alla gerarchia immobiliare e al quadro del rischio operativo.",
  "buildings.page.launchpadsLane.governanceDescription":
    "\nUtilizza il registro delle iniziative come superficie di controllo durevole per il lavoro su sistemi, spazio, energia e conformità.",
  "buildings.page.launchpadsLane.twinTitle": "\nTwin e telemetria",
  "buildings.page.launchpadsLane.twinHeadline":
    "\nPromuovere strutture gemelle e pronte per i sensori in prove spaziali prima di emettere interventi importanti.",
  "buildings.page.launchpadsLane.twinDescription":
    "\nEffettua un controllo incrociato della postura delle strutture rispetto al gemello digitale e alle superfici dei sensori invece di pianificare solo in base alle note narrative.",
  "buildings.page.launchpadsLane.complianceTitle": "\nGaranzia di conformità",
  "buildings.page.launchpadsLane.complianceHeadline":
    "\nUtilizzare l'approccio costruttivo per organizzare ispezioni, prove statutarie e reporting di garanzia.",
  "buildings.page.launchpadsLane.complianceDescription":
    "Lo stesso piano di controllo delle strutture ora supporta il follow-through operativo e il reporting pronto per l'audit.",
  "buildings.page.launchpadsLane.capitalTitle": "\nCoordinamento patrimoniale",
  "buildings.page.launchpadsLane.capitalHeadline":
    "\nIncrementa in anticipo il rischio di costruzione, la pressione di miglioramento e il lavoro del ciclo di vita nella finanza e nei pacchetti di programmi.",
  "buildings.page.launchpadsLane.capitalDescription":
    "\nPassare dall'atteggiamento delle strutture alla preparazione, alla governance FM e ai pacchetti operativi immobiliari senza ricostruire la storia dei dati.",
  "buildings.action.twin":
    "\nApri la superficie del gemello digitale esistente per il contesto delle operazioni spaziali.",
  "buildings.action.assets":
    "\nIspezionare la proprietà non automobilistica a supporto delle operazioni di costruzione.",
  "buildings.action.reports":
    "\nPrestazioni delle strutture del pacchetto per conformità e revisione esecutiva.",
  "buildings.action.sensors":
    "\nTraccia i problemi di costruzione nella telemetria in tempo reale e nella copertura del dispositivo.",
  "buildings.action.fleet":
    "\nCoordina le risorse mobili, i depositi e la logistica sul campo con gli edifici.",
  "buildings.action.add": "Registra un nuovo edificio o struttura.",
  "sensors.title": "\nSensori",
  "sensors.subtitle":
    "\nCopertura telemetrica, postura del dispositivo e disponibilità del segnale",
  "sensors.coverage": "Copertura telemetria risorse",
  "sensors.view.overview": "\nPanoramica",
  "sensors.view.alertRules": "\nRegole di avviso",
  "sensors.view.quality": "\nQualità",
  "sensors.view.dependencies": "\nDipendenze",
  "sensors.kpi.devices": "\nDispositivi registrati",
  "sensors.kpi.devicesDesc": "\nDispositivi attualmente registrati nel piano di controllo",
  "sensors.kpi.telemetry": "\nPunti di telemetria",
  "sensors.kpi.telemetryDesc": "\nCampioni di telemetria grezza già archiviati",
  "sensors.kpi.coverage": "\nAsset con telemetria",
  "sensors.kpi.coverageDesc": "\nAsset distinti già ricevono la telemetria",
  "sensors.kpi.unseen": "\nDispositivi mai visti",
  "sensors.kpi.unseenDesc":
    "\nDispositivi registrati che non hanno ancora effettuato la segnalazione",
  "sensors.summary.alertTitle": "\nLa semantica dei sensori è pronta per essere resa operativa",
  "sensors.summary.alertDescription":
    "\nTieni traccia del completamento dei metadati del dispositivo e del tagging della telemetria semantica prima di espanderlo negli adattatori di protocollo e negli avvisi.",
  "sensors.summary.tab.device": "\nPostura del dispositivo",
  "sensors.summary.tab.semantic": "\nTelemetria semantica",
  "sensors.summary.metadataTitle": "\nDisponibilità dei metadati del dispositivo",
  "sensors.summary.metadataDescription":
    "\nContare i dispositivi con dettagli identificativi sufficienti per supportare i flussi di lavoro di operazioni, calibrazione e messa in servizio.",
  "sensors.summary.metadataReady": "\nDispositivi pronti per i metadati",
  "sensors.summary.metadataReadyDesc":
    "\n{count} dispositivi registrati totali nel piano di controllo.",
  "sensors.summary.commissioned": "\nDispositivi commissionati",
  "sensors.summary.commissionedDesc":
    "\n{coverage} dei dispositivi registrati include una data di messa in servizio.",
  "sensors.summary.postureTitle": "\nPostura di prontezza",
  "sensors.summary.postureDescription":
    "\nPromuovi fornitore, modello, firmware, posizione di installazione e dati di messa in servizio prima di trattare il registro come un inventario duraturo dei sensori.",
  "sensors.summary.badgeMetadata": "\nMetadati",
  "sensors.summary.badgeInstall": "Installa contesto",
  "sensors.summary.badgeCommissioning": "\nMessa in servizio",
  "sensors.summary.seriesKeyTitle": "\nChiavi di serie",
  "sensors.summary.seriesKeyDesc": "\n{total} campioni di telemetria attualmente archiviati.",
  "sensors.summary.unitTitle": "\nUnità allegate",
  "sensors.summary.unitDesc":
    "\nLe unità rappresentano il contratto semantico minimo per dati di telemetria comparabili.",
  "sensors.summary.qualityTitle": "\nQualità contrassegnata",
  "sensors.summary.qualityDesc":
    "\nI contrassegni di qualità consentono ai flussi di lavoro a valle di distinguere i dati attendibili da quelli stimati.",
  "sensors.alertRuleForm.title": "\nCrea una regola di avviso",
  "sensors.alertRuleForm.description":
    "\nCrea avvisi basati su soglia direttamente dalla disponibilità della telemetria in tempo reale all'interno del flusso del piano di controllo del sensore durevole.",
  "sensors.alertRuleForm.badge": "\nRegola durevole",
  "sensors.alertRuleForm.nameLabel": "\nTitolo regola",
  "sensors.alertRuleForm.namePlaceholder": "\nElevata CO2 nelle stanze occupate",
  "sensors.alertRuleForm.nameHint":
    "\nUtilizza un titolo che gli operatori possono riutilizzare nei report e nella creazione di follow-through.",
  "sensors.alertRuleForm.seriesKeyLabel": "\nChiave della serie",
  "sensors.alertRuleForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertRuleForm.seriesKeyHint":
    "\nCorrisponde alla chiave di telemetria semantica da valutare.",
  "sensors.alertRuleForm.comparatorLabel": "\nComparatore",
  "sensors.alertRuleForm.comparatorHint":
    "\nScegli come confrontare la lettura in tempo reale con la soglia.",
  "sensors.alertRuleForm.comparator.GT": "Maggiore",
  "sensors.alertRuleForm.comparator.LT": "Minore",
  "sensors.alertRuleForm.comparator.EQ": "Uguale",
  "sensors.alertRuleForm.thresholdLabel": "\nSoglia",
  "sensors.alertRuleForm.thresholdPlaceholder": "1200 (es.)",
  "sensors.alertRuleForm.thresholdHint":
    "\nUtilizza il limite numerico che dovrebbe attivare la regola.",
  "sensors.alertRuleForm.severityLabel": "\nGravità",
  "sensors.alertRuleForm.severityHint": "\nImposta l'urgenza visibile all'operatore per la regola.",
  "sensors.alertRuleForm.severity.INFO": "\nInformazioni",
  "sensors.alertRuleForm.severity.WARNING": "\nAvviso",
  "sensors.alertRuleForm.severity.CRITICAL": "\nCritico",
  "sensors.alertRuleForm.requiredHint":
    "\nTitolo, chiave della serie, comparatore, soglia e gravità sono obbligatori.",
  "sensors.alertRuleForm.submit": "\nSalva regola di avviso",
  "sensors.alertRuleForm.submitAria": "\nSalva regola di avviso sensore",
  "sensors.alertRules.feedback.saved":
    "\nRegola di avviso del sensore salvata nell'area di lavoro dei sensori.",
  "sensors.alertForm.title": "\nCrea una regola di avviso",
  "sensors.alertForm.description":
    "\nCrea avvisi basati su soglia direttamente dalla disponibilità della telemetria in tempo reale all'interno del flusso di lavoro durevole del piano di controllo del sensore.",
  "sensors.alertForm.badge": "\nRegola durevole",
  "sensors.alertForm.nameLabel": "\nTitolo regola",
  "sensors.alertForm.namePlaceholder": "\nElevata CO2 nelle stanze occupate",
  "sensors.alertForm.nameHint":
    "\nUtilizza un titolo che gli operatori possono riutilizzare nei report e nella creazione di follow-through.",
  "sensors.alertForm.seriesKeyLabel": "\nChiave della serie",
  "sensors.alertForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertForm.seriesKeyHint":
    "\nCorrisponde alla chiave di telemetria semantica da valutare.",
  "sensors.alertForm.comparatorLabel": "\nComparatore",
  "sensors.alertForm.comparatorHint":
    "\nScegli come confrontare la lettura in tempo reale con la soglia.",
  "sensors.alertForm.comparator.GT": "Maggiore",
  "sensors.alertForm.comparator.LT": "Minore",
  "sensors.alertForm.comparator.EQ": "Uguale",
  "sensors.alertForm.thresholdLabel": "\nSoglia",
  "sensors.alertForm.thresholdPlaceholder": "1200 (es.)",
  "sensors.alertForm.thresholdHint":
    "\nUtilizza il limite numerico che dovrebbe attivare la regola.",
  "sensors.alertForm.severityLabel": "\nGravità",
  "sensors.alertForm.severityHint": "\nImposta l'urgenza visibile all'operatore per la regola.",
  "sensors.alertForm.severity.INFO": "\nInformazioni",
  "sensors.alertForm.severity.WARNING": "\nAvviso",
  "sensors.alertForm.severity.CRITICAL": "\nCritico",
  "sensors.alertForm.requiredHint":
    "\nTitolo, chiave della serie, comparatore, soglia e gravità sono obbligatori.",
  "sensors.alertForm.submit": "\nSalva regola di avviso",
  "sensors.alertForm.submitAria": "\nSalva regola di avviso sensore",
  "sensors.alertForm.recentTitle": "\nRegole di avviso recenti",
  "sensors.alertForm.recentDescription":
    "\nLe regole di avviso ora persistono direttamente nel modello durevole del piano di controllo del sensore.",
  "sensors.alertForm.empty": "\nNessuna regola di avviso del sensore ancora acquisita.",
  "sensors.alertForm.emptyCta":
    "\nCrea la tua prima regola di avviso per iniziare a monitorare la telemetria del sensore.",
  "sensors.alertForm.savedAt": "\nAggiornato {updatedAt}",
  "sensors.alertForm.validation.titleRequired":
    "\nIl titolo della regola di avviso è obbligatorio.",
  "sensors.alertForm.validation.seriesKeyRequired": "\nÈ richiesta la chiave della serie.",
  "sensors.alertForm.validation.comparatorRequired": "\nIl comparatore è obbligatorio.",
  "sensors.alertForm.validation.thresholdRequired": "\nLa soglia deve essere numerica.",
  "sensors.alertForm.validation.severityRequired": "\nLa gravità è richiesta.",
  "sensors.alertForm.feedback.saved":
    "\nRegola di avviso del sensore salvata nell'area di lavoro dei sensori.",
  "sensors.alertForm.feedback.saveFailed":
    "\nImpossibile mantenere la regola di avviso del sensore al momento.",
  "sensors.alertRules.title": "\nRegole di avviso durevoli",
  "sensors.alertRules.description":
    "\nLe regole promosse persistono nel modello del piano di controllo del sensore e possono avviare il lavoro di esecuzione a valle.",
  "sensors.alertRules.empty":
    "\nNon è stata ancora creata alcuna regola di avviso durevole del sensore.",
  "sensors.alertRules.promote": "\nPromuovi a regola",
  "sensors.alertRules.column.title": "\nRegola",
  "sensors.alertRules.column.seriesKey": "\nChiave della serie",
  "sensors.alertRules.column.threshold": "\nSoglia",
  "sensors.alertRules.column.severity": "\nGravità",
  "sensors.alertRules.column.updatedAt": "\nAggiornato",
  "sensors.alertRules.badge.enabled": "\nAbilitato",
  "sensors.alertRules.badge.disabled": "\nDisabilitato",
  "sensors.alertRules.validation.titleRequired":
    "\nÈ obbligatorio il titolo della regola di avviso permanente.",
  "sensors.alertRules.validation.seriesKeyRequired":
    "\nÈ richiesta la chiave della serie di regole di avviso durature.",
  "sensors.alertRules.validation.thresholdRequired":
    "\nLa soglia della regola di avviso permanente deve essere numerica.",
  "sensors.alertRules.feedback.saveFailed":
    "Impossibile mantenere la regola di avviso durevole del sensore al momento.",
  "sensors.readiness.devices":
    "\nIl registro del dispositivo corrente supporta già una linea di base del piano di controllo.",
  "sensors.readiness.telemetry":
    "\nI campioni di telemetria in tempo reale possono essere normalizzati in modelli di serie semantiche.",
  "sensors.readiness.coverage":
    "\nLa telemetria collegata alle risorse fornisce già la copertura operativa iniziale.",
  "sensors.page.eyebrow": "\nPiano di controllo telemetrico",
  "sensors.page.readinessRailDescription":
    "\nUtilizza questo binario per valutare lo stato dei metadati, la completezza della messa in servizio e la qualità del segnale prima di promuovere la telemetria in avvisi, report o decisioni operative a valle.",
  "sensors.page.readinessRail.metadataSignal":
    "\nLa completezza dei metadati è la base per la proprietà e il routing affidabili dei dispositivi.",
  "sensors.page.readinessRail.commissioningSignal":
    "\nLa postura di messa in servizio determina se le letture in tempo reale possono supportare l'escalation operativa.",
  "sensors.page.readinessRail.qualitySignal":
    "\nLa telemetria con tag di qualità è il controllo che separa i segnali affidabili dai feed rumorosi.",
  "sensors.page.commandTitle": "\nPostura comando telemetria",
  "sensors.page.commandDescription":
    "\nCombina la disponibilità dei metadati, la copertura della messa in servizio, la profondità delle serie semantiche e il tagging di qualità in un'unica immagine di telemetria rivolta all'operatore.",
  "sensors.page.launchpadsTitle": "\nLaunchpad per decisioni di telemetria",
  "sensors.page.launchpadsDescription":
    "\nPromuovi il comportamento del dispositivo e la qualità del segnale in avvisi, analisi e reporting aziendale senza frammentare il contratto di telemetria.",
  "sensors.page.launchpadsBadge": "\nFlusso di lavoro aziendale",
  "sensors.page.launchpadsBriefTitle":
    "\nI sensori ora si comportano come un sistema di telemetria governato",
  "sensors.page.launchpadsBriefDescription":
    "\nL'area di lavoro può supportare la governance semantica, la promozione delle regole e l'escalation operativa a valle da un piano di controllo.",
  "sensors.page.launchpadsLane.metadataTitle": "\nGovernance dei metadati",
  "sensors.page.launchpadsLane.metadataHeadline":
    "\nStandardizza la proprietà del dispositivo, le chiavi delle serie e il significato semantico prima di ridimensionare gli avvisi o le analisi.",
  "sensors.page.launchpadsLane.metadataDescription":
    "\nUtilizza la posizione del dispositivo e dei metadati come punto di riferimento della qualità per ogni consumatore operativo a valle.",
  "sensors.page.launchpadsLane.alertingTitle": "\nGaranzia di avviso",
  "sensors.page.launchpadsLane.alertingHeadline":
    "\nPromuovi le serie affidabili trasformandole in regole durevoli sulle quali gli operatori possono agire in tutti gli edifici e nella flotta.",
  "sensors.page.launchpadsLane.alertingDescription":
    "\nLe regole di avviso dovrebbero riflettere la telemetria regolamentata, non soglie una tantum disconnesse dal piano di controllo.",
  "sensors.page.launchpadsLane.analyticsTitle": "\nAnalisi operativa",
  "sensors.page.launchpadsLane.analyticsHeadline":
    "Trasforma la telemetria semantica in prove di utilizzo, disponibilità e decisioni strategiche.",
  "sensors.page.launchpadsLane.analyticsDescription":
    "\nUtilizza la qualità delle serie e il livello di soglia per rafforzare l'analisi predittiva e operativa.",
  "sensors.page.launchpadsLane.escalationTitle": "\nEscalation e reporting",
  "sensors.page.launchpadsLane.escalationHeadline":
    "\nPassa dai problemi dei dispositivi ai flussi di lavoro di preparazione e creazione di report prima che la fiducia tra i team diminuisca.",
  "sensors.page.launchpadsLane.escalationDescription":
    "\nMantieni report, ordini di lavoro e pacchetti decisionali operativi allineati con lo stesso contratto di telemetria.",
  "sensors.action.utilisation":
    "\nUtilizza la qualità della telemetria per spiegare la confidenza e le lacune nell'utilizzo.",
  "sensors.action.twin":
    "\nSovrapponi la postura del dispositivo al contesto gemello spaziale e hotspot.",
  "sensors.action.reports":
    "\nEsporta lo stato del dispositivo e la copertura del segnale in pacchetti di report.",
  "sensors.action.buildings":
    "\nSegui i problemi relativi alla stanza e alle strutture nell'integrità del sensore.",
  "sensors.action.fleet":
    "\nCollega gli angoli ciechi della telemetria del veicolo all'area di lavoro della flotta.",
  "sensors.action.add": "Registra un nuovo sensore o dispositivo.",
  "common.liveSummary": "\nRiepilogo in tempo reale",
  "common.domainCoverage": "\nCopertura dominio",
  "common.nextActions": "\nAzioni successive",
  "common.readinessSummary": "\nAttuale disponibilità per l'implementazione",
  "common.connectedWorkflows": "\nFlussi di lavoro connessi",
  "common.connectedWorkflowsHint":
    "\nCollega questo dominio alle operazioni, alla finanza e al reporting senza uscire dalla shell.",
  "common.workflowOps": "\nFollow-through operativo",
  "common.workflowOpsHint":
    "\nUtilizza le superfici di attività, utilizzo ed esecuzione del campo per agire sul segnale in tempo reale.",
  "common.workflowFinance": "\nAllineamento finanziario",
  "common.workflowFinanceHint":
    "\nIntegra rischio, domanda e approvazioni in budget, scenari e flusso di documenti.",
  "common.workflowReporting": "\nConfezione delle parti interessate",
  "common.workflowReportingHint":
    "\nRiepilogare lo stato attivo nei pacchetti di report una volta che il working set è stabile.",
  "common.workspaceGuide": "\nGuida allo spazio di lavoro",
  "common.now": "\nOra",
  "common.next": "\nSuccessivo",
  "common.later": "\nPiù tardi",
  "common.autoRefreshMinute": "\nAggiornamento automatico ogni minuto",
  "common.guideAlertTitle": "\nPercorso di implementazione pronto per l'operatore",
  "common.guideAlertDescription":
    "\nUtilizza prima il riepilogo in tempo reale, quindi spostati nei sistemi connessi prima di confezionare il risultato.",
  "common.timelineNowTitle": "\nLeggi la postura dal vivo",
  "common.timelineNowDescription":
    "\nParti dal riepilogo che si aggiorna automaticamente e verifica cosa è già coperto nell'attuale patrimonio.",
  "common.timelineNextTitle": "\nAgisci in flussi di lavoro connessi",
  "common.timelineNextDescription":
    "\nPassa ad attività, finanza, flotta, edifici, sensori o report in base alla superficie di pressione che devi risolvere.",
  "common.timelineLaterTitle": "\nPromuovere il programma di lavoro duraturo",
  "common.timelineLaterDescription":
    "Una volta che il percorso live è stabile, rafforzalo in approvazioni, gerarchia, semantica e reporting esecutivo.",
  "common.workflowHint":
    "\nSpostati nelle superfici attive connesse che già supportano questa espansione.",
  "common.strategicWorkspace.chatContext":
    "\n{title} spazio di lavoro. {subtitle} Connesso alla shell delle operazioni renderizzate dal server corrente, al limite di autenticazione condivisa e al modello parziale HTMX.",
  "iot.assetRequired":
    "\nIl contesto dell'asset è obbligatorio per l'acquisizione della telemetria.",
  "iot.metricRequired": "\nÈ richiesta una metrica di telemetria o una chiave di serie.",
  "finance.action.assets":
    "\nIspeziona l'attuale porzione di portafoglio prima di riallocare il capitale.",
  "finance.action.planning":
    "\nPassare dall'esposizione all'ammortamento agli scenari di pianificazione e alle approvazioni.",
  "finance.action.purchaseOrders":
    "\nEsaminare gli impegni relativi agli ordini di acquisto e il follow-through dei fornitori che influiscono sulla situazione finanziaria.",
  "finance.action.reports":
    "\nInserisci lo stato del portafoglio visibile in un rapporto esecutivo.",
  "finance.workspace.title": "\nCentro di comando dell'ammortamento",
  "finance.workspace.description":
    "\nTieni traccia della deriva della valutazione, del rischio di concentrazione e dell'esposizione al deprezzamento in tempo reale in tutto il portafoglio.",
  "finance.relatedLinks.title": "\nCorrelato",
  "finance.relatedLinks.description":
    "\nPassa al registro delle risorse o alle aree di lavoro dei documenti per coordinare il follow-through finanziario.",
  "finance.cockpit.filters.eyebrow": "\nFiltri",
  "finance.cockpit.filters.title": "\nMisura la cabina di pilotaggio",
  "finance.cockpit.filters.description":
    "\nFiltra il pannello di controllo finanziario per sito, periodo fiscale e densità della tabella prima di esportare la sezione corrente.",
  "finance.cockpit.filters.exportDescription":
    "\nEsporta il portafoglio di ammortamento attualmente filtrato come CSV o PDF.",
  "finance.cockpit.actions.eyebrow": "\nFlussi di lavoro connessi",
  "finance.cockpit.actions.title": "\nPassare dalla valutazione all'azione",
  "finance.cockpit.actions.description":
    "\nPassa direttamente ai sistemi operativi che spiegano o risolvono la varianza del portafoglio.",
  "finance.cockpit.hero.eyebrow": "\nCockpit finanziario",
  "finance.cockpit.hero.title":
    "\nEsposizione, pressione della coda e concentrazione regolati dall'intelligenza artificiale in un unico spazio di lavoro",
  "finance.cockpit.hero.description":
    "\nUna cabina di pilotaggio finanziaria rappresentata su server per esaminare fianco a fianco la deviazione della valutazione, la concentrazione del sito, la pressione delle attività e il flusso di approvvigionamento o smaltimento.",
  "finance.cockpit.hero.live": "\nAggiorna automaticamente ogni {seconds} secondi",
  "finance.cockpit.chat.pageContext":
    "Pagina Cockpit finanziario. Spazio di lavoro unificato per esposizione corretta dall'intelligenza artificiale, concentrazione del sito, arretrato di manutenzione, approvazioni di documenti e varianza del portafoglio. Controlli: filtro sito, periodo fiscale, dimensione pagina, esportazione CSV, esportazione PDF. Sezioni principali: briefing sul portfolio AI, copertura del set di dati, striscia KPI, classifica del sito, coda delle azioni, schede di concentrazione e tabella del portfolio.",
  "finance.cockpit.action.disposalReview": "\nVerifica smaltimento",
  "finance.cockpit.action.immediateIntervention": "\nIntervento immediato",
  "finance.cockpit.action.replacementPlan": "\nPianifica sostituzione",
  "finance.cockpit.action.procurementReview": "\nEsamina l'approvvigionamento",
  "finance.cockpit.action.workOrderFollowUp": "\nSegui l'ordine di lavoro",
  "finance.cockpit.action.invoiceFollowUp": "\nFattura di follow-up",
  "finance.cockpit.action.purchaseOrderFollowUp": "\nSeguire l'ordine di acquisto",
  "finance.cockpit.action.customerOrderFollowUp": "\nSegui l'ordine del cliente",
  "finance.cockpit.action.monitor": "\nMonitora esposizione",
  "finance.cockpit.briefing.eyebrow": "\nBrief del portfolio",
  "finance.cockpit.briefing.title": "\nBrief finanziario",
  "finance.cockpit.briefing.summary":
    "\nPer {site} superiori a {period}, l'esposizione corretta per l'intelligenza artificiale è pari a {adjustedExposure} con un delta di valutazione di {delta}. {signalCount} asset garantiti da segnali e {openTasks} attività aperte stanno determinando l'attuale pressione finanziaria.",
  "finance.cockpit.briefing.recommendationTitle": "\nMossa successiva consigliata",
  "finance.cockpit.briefing.recommendationPortfolio":
    "\nNessuna singola risorsa domina la coda. Rivedere la concentrazione e il flusso di documenti aperti in {site} prima di riallocare il capitale.",
  "finance.cockpit.briefing.recommendationAsset":
    '\nDai la priorità a {asset} e spostalo in "{action}" in modo che il rischio di valutazione e la resistenza operativa non si comportino.',
  "finance.cockpit.generatedAt": "\nGenerato {date}",
  "finance.cockpit.datasets.title": "\nCopertura del set di dati",
  "finance.cockpit.datasets.description":
    "\nIl Cockpit combina valutazione, rischio AI, carico di lavoro di manutenzione e flusso di documenti transazionali in un'unica superficie decisionale finanziaria.",
  "finance.cockpit.datasets.assetsTitle": "\nAsset nell'ambito",
  "finance.cockpit.datasets.assetsDescription":
    "\nAttività che attualmente contribuiscono al portafoglio finanziario filtrato.",
  "finance.cockpit.datasets.signalsTitle": "\nSegnali supportati dall'intelligenza artificiale",
  "finance.cockpit.datasets.signalsDescription":
    "\nI segnali di {critical} critico/emergenza e {warning} di allarme stanno influenzando la valutazione.",
  "finance.cockpit.datasets.tasksTitle": "\nApri elementi di lavoro",
  "finance.cockpit.datasets.tasksDescription":
    "\n{overdue} le attività scadute stanno aumentando la pressione finanziaria a breve termine.",
  "finance.cockpit.datasets.documentsTitle": "\nApri flusso di documenti",
  "finance.cockpit.datasets.documentsDescription":
    "\n{workOrders} ordini di lavoro, {purchaseOrders} ordini di acquisto e {invoices} fatture sono ancora attivi.",
  "finance.cockpit.kpi.adjustedExposure": "\nTasso di aggiustamento AI {rate}",
  "finance.cockpit.kpi.deltaTitle": "\nDelta valutazione",
  "finance.cockpit.kpi.deltaDescription":
    "\nDifferenza tra l'esposizione all'ammortamento standard e la valutazione corretta per AI.",
  "finance.cockpit.kpi.highRiskDescription":
    "\nGli asset {count} comportano attualmente il rischio finanziario e operativo più elevato.",
  "finance.cockpit.kpi.confidenceTitle": "Confidenza media",
  "finance.cockpit.kpi.confidenceDescription":
    "\nLe risorse {due} sono già all'interno della finestra di previsione con scadenza imminente.",
  "finance.cockpit.condition.description":
    "\nIl mix di esposizioni in base alla condizione degli asset aiuta a rivelare se il rischio di capitale si concentra attorno agli asset deteriorati.",
  "finance.cockpit.type.description":
    "\nScopri quali tipologie di asset rappresentano la quota maggiore dell'esposizione finanziaria corrente.",
  "finance.cockpit.lifecycle.title": "\nMix del ciclo di vita",
  "finance.cockpit.lifecycle.description":
    "\nLa distribuzione del ciclo di vita mostra quanta parte del portafoglio attuale si trova negli stati attivo, di monitoraggio, affaticato o smaltito.",
  "finance.cockpit.lifecycle.share": "\n{share} di esposizione visibile",
  "finance.cockpit.lifecycle.assets": "\nRisorse",
  "finance.cockpit.site.title": "\nConcentrazione sito",
  "finance.cockpit.site.description":
    "\nConfronta l'esposizione corretta a livello di sito, le risorse ad alto rischio, le attività attive e il flusso di documenti aperti.",
  "finance.cockpit.site.share": "\n{share} di esposizione visibile",
  "finance.cockpit.site.risk": "\nRischio alto",
  "finance.cockpit.site.tasks": "\nAttività aperte",
  "finance.cockpit.site.queue": "\nCoda in sospeso",
  "finance.cockpit.queue.title": "\nCoda di azioni",
  "finance.cockpit.queue.description":
    "\nBeni classificati in base alla varianza della valutazione, alla gravità del rischio e al lavoro a valle o alla pressione dei documenti.",
  "finance.cockpit.queue.summary": "\n{tasks} attività attive • {documents} documenti aperti",
  "finance.cockpit.opportunity.purchaseOrdersTitle": "\nEsposizione ordine di acquisto",
  "finance.cockpit.opportunity.purchaseOrdersDescription":
    "\nGli ordini di acquisto {count} sono ancora aperti a fronte di attività finanziariamente esposte.",
  "finance.cockpit.opportunity.invoicesTitle": "\nEsposizione collezioni",
  "finance.cockpit.opportunity.invoicesDescription":
    "\n{count} le fatture hanno ancora una pressione di recupero aperto nel portafoglio.",
  "finance.cockpit.opportunity.tasksTitle": "\nLavoro in ritardo",
  "finance.cockpit.opportunity.tasksDescription":
    "\nLe attività di manutenzione scadute stanno amplificando la resistenza alla valutazione e il rischio operativo.",
  "finance.cockpit.opportunity.dueSoonTitle": "\nA breve segnali",
  "finance.cockpit.opportunity.dueSoonDescription":
    "\nFinestre di previsione prossime all'intervento e che potrebbero influenzare la pianificazione del capitale.",
  "finance.overview.documentSummary": "\nApri flusso di documenti",
  "finance.overview.documentSummaryDescription":
    "\nGli ordini di lavoro {workOrders}, gli ordini di acquisto {purchaseOrders} e le fatture {invoices} sono attualmente aperti.",
  "finance.cockpit.table.title": "\nPortafoglio finanziario",
  "finance.cockpit.table.description":
    "\nVisualizzazione del portafoglio ordinabile che combina valore standard, valore corretto dall'intelligenza artificiale, confidenza e pressione della coda.",
  "finance.cockpit.table.live": "\nTavolo dal vivo",
  "finance.cockpit.table.asset": "\nRisorsa",
  "finance.cockpit.table.signal": "\nSegnale",
  "finance.cockpit.table.aiAdjusted": "\nRettificato dall'IA",
  "finance.cockpit.table.delta": "\nDelta",
  "finance.cockpit.table.confidence": "\nFiducia",
  "finance.cockpit.table.queue": "\nCoda",
  "finance.cockpit.table.remainingLifeNone":
    "\nA questa risorsa non è allegata alcuna previsione sulla vita residua.",
  "finance.cockpit.table.remainingLifeValue": "\n{days} giorni di vita rimanenti",
  "finance.cockpit.table.activeTasksValue": "\n{count} attività attive",
  "finance.cockpit.table.overdueTasksValue": "\n{count} in ritardo",
  "finance.cockpit.pdf.title": "\nRapporto sul pannello di controllo finanziario",
  "finance.cockpit.pdf.subject":
    "\nEsposizione al deprezzamento corretta per AI e varianza del portafoglio",
  "finance.cockpit.pdf.scope": "\nAmbito: {site} • {period}",
  "finance.cockpit.pdf.summary.adjustedExposure": "\nEsposizione corretta: {value}",
  "finance.cockpit.pdf.summary.delta": "\nDelta valutazione: {value} ({percent})",
  "finance.cockpit.pdf.summary.risk": "\nEsposizione ad alto rischio: {value} su {count} asset",
  "finance.cockpit.pdf.summary.queue": "\nAttività aperte: {tasks} • Documenti aperti: {documents}",
  "reports.title": "\nRapporti",
  "reports.subtitle": "Rapporti sui cespiti, riepiloghi degli ammortamenti ed esportazione MOD",
  "reports.category.financial": "\nFinanziario",
  "reports.category.financialDesc":
    "\nReport sugli ammortamenti, sulle valutazioni e sull'esposizione finanziaria",
  "reports.category.operations": "\nAsset e operazioni",
  "reports.category.operationsDesc":
    "\nInventario delle risorse, previsioni e analisi dell'utilizzo",
  "reports.category.executive": "\nDirigente",
  "reports.category.executiveDesc": "\nCruscotti esecutivi e indicatori chiave di prestazione",
  "reports.workspace.chat.categoryLine": "\n{label}: {count} set di dati",
  "reports.workspace.chat.noAiBrief": "\nNessun briefing AI attivo caricato.",
  "reports.workspace.chat.aiBriefActive":
    "\nBriefing attivo: {title}. Pubblico {audience}. Metti a fuoco {focusLabel}. Copertura {coverageScore} percento.",
  "reports.workspace.chat.journeyStep": "{title} ({statusPart}) → {targetLabel}",
  "reports.workspace.chat.stepStatusRecommended": "\n{status}, consigliato",
  "reports.workspace.chat.priorityDataset":
    "\nSet di dati di dettaglio prioritario: {title}. Salute {health}.",
  "reports.workspace.chat.noPinnedSources":
    "\nNessuna azione di origine correlata è attualmente bloccata.",
  "reports.workspace.chat.pinnedSourcesPrefix": "\nAzioni sorgente correlate:",
  "reports.workspace.chat.sourceLink": "{label} → {supporting}",
  "reports.workspace.chat.generalCoverage": "\ncopertura generale",
  "reports.workspace.chat.mission":
    "\nProssima mossa consigliata: {title}. Obiettivo {targetLabel}.",
  "reports.workspace.chat.builder":
    "\nPubblico {audience}. Metti a fuoco {focus}. Sezioni {sections}.",
  "reports.workspace.chat.pageIntro": "\nArea di lavoro report.",
  "reports.workspace.chat.workflowInventory":
    "\nLa pagina include un navigatore del flusso di lavoro, un centro di comando del set di dati, una barra di comando AI, un generatore di report, una barra di modelli, un hub di dati di origine, un pannello di drill-down e una cronologia di report salvata.",
  "reports.workspace.chat.body":
    "{intro} Categorie: {categorySummary}. Set de dados: {datasetSummary}. {prioritySummary} {sourceSummary} {missionSummary} {builderSummary} {aiSummary} Passaggi del flusso di lavoro: {journeySummary}. {workflowInventory}",
  "reports.workspace.heroEyebrow": "\nReportistica aziendale",
  "reports.workspace.title": "\nCentro di comando per la reportistica del portafoglio",
  "reports.workspace.description":
    "\nPacchetti di report pronti per il consiglio, visualizzazioni di garanzia operativa e approfondimenti collegati alle prove forniti tramite un unico spazio di lavoro rappresentato dal server.",
  "reports.workspace.sectionTitle": "\nSegnala catalogo",
  "reports.workspace.sectionDescription":
    "\nPassa tra finanza, operazioni ed executive pack senza lasciare l'area di lavoro di reporting.",
  "reports.workspace.datasetTitle": "\nCentro di comando del set di dati",
  "reports.workspace.datasetDescription":
    "\nEsamina la finanza in tempo reale, le operazioni e i set di dati esecutivi prima di generare un pacchetto di report o aprire i dettagli.",
  "reports.workspace.aiBriefTitle": "\nBriefing sull'IA",
  "reports.workspace.aiBriefDescription":
    "\nUna narrazione pronta per la decisione sintetizzata dal pacchetto attivo, dalle prove a supporto e dallo stato attuale del flusso di lavoro.",
  "reports.workspace.aiBriefEmpty":
    "\nGenera un pacchetto di report per creare un briefing sull'intelligenza artificiale per le parti interessate finanziarie, operative o esecutive.",
  "reports.workspace.launchpadTitle": "\nLaunchpad decisionale",
  "reports.workspace.launchpadDescription":
    "\nPassa direttamente ai pacchetti esecutivi, alle visualizzazioni di garanzia operativa o alle revisioni delle dipendenze senza ricostruire il contesto.",
  "reports.workspace.launchpad.priorityDatasetTitle": "\nSet di dati prioritari",
  "reports.workspace.launchpad.offlineSourcesTitle": "\nFonti offline",
  "reports.workspace.launchpad.reportingScopeTitle": "\nAmbito del reporting",
  "reports.workspace.launchpad.openPack": "\nApri pacchetto",
  "reports.workspace.launchpad.openWorkspace": "\nApri spazio di lavoro",
  "reports.workspace.launchpad.openEstateWorkspace": "\nSpazio di lavoro aperto",
  "reports.workspace.launchpad.openFinancePlanningWorkspace":
    "Area di lavoro di pianificazione finanziaria aperta",
  "reports.workspace.launchpad.lane.boardBadge": "\nPacchetto tavole",
  "reports.workspace.launchpad.lane.boardTitle":
    "\nPacchetto di intelligence decisionale strategica",
  "reports.workspace.launchpad.lane.boardDescription":
    "\nLancia il pacchetto rivolto al consiglio di amministrazione per i compromessi sul ciclo di vita, la postura del rischio e la sequenza degli investimenti.",
  "reports.workspace.launchpad.lane.operationsBadge": "\nPacchetto operativo",
  "reports.workspace.launchpad.lane.operationsTitle": "\nPacchetto immagini operative immobiliari",
  "reports.workspace.launchpad.lane.operationsDescription":
    "\nApri il pacchetto di garanzia operativa per i blocchi di prontezza, la pressione di consegna FM e i segnali di controllo della proprietà.",
  "reports.workspace.launchpad.lane.dependenciesBadge": "\nRevisione delle dipendenze",
  "reports.workspace.launchpad.lane.dependenciesTitle":
    "\nRevisione della dipendenza dall'integrazione aziendale",
  "reports.workspace.launchpad.lane.dependenciesDescription":
    "\nPassa alla posizione di integrazione quando i sistemi dei partner finanziari, delle risorse umane, degli appalti o della ristorazione stanno influenzando la fiducia dei report.",
  "reports.workspace.activePackDescription":
    "\nIl pacchetto di report attivo combina la descrizione dell'intelligenza artificiale, prove tra set di dati e sezioni pronte per l'esportazione in un unico spazio di lavoro rappresentato dal server.",
  "reports.workspace.mission.title": "\nMossa successiva consigliata",
  "reports.workspace.mission.description":
    "\nL'area di lavoro trasforma lo stato del portfolio in una mossa successiva pronta per la decisione in modo che gli operatori possano allestire un pacchetto, prove aperte o una breve leadership senza reinterpretare l'intera pagina.",
  "reports.workspace.mission.progressTitle": "\nPreparazione del flusso di lavoro",
  "reports.workspace.mission.progressValue": "\n{completed}/{total} pronto",
  "reports.workspace.mission.progressDescription":
    "\n{completed} passaggi del viaggio di {total} sono pronti. L'attuale disponibilità del flusso di lavoro è {percent}%.",
  "reports.workspace.mission.progressStatDescription":
    "\nIl {percent}% del flusso di reporting è pronto per il trasferimento.",
  "reports.workspace.mission.nextStageTitle": "\nFase successiva",
  "reports.workspace.mission.priorityDatasetTitle": "\nSet di dati prioritari",
  "reports.workspace.mission.dataTitle": "\nRiconnetti la copertura della sorgente",
  "reports.workspace.mission.dataDescription":
    "\nI set di dati {count} sono offline. Inizia con {source} per ripristinare la sicurezza prima dell'esportazione.",
  "reports.workspace.mission.firstPackTitle": "\nAssembla il primo pacchetto",
  "reports.workspace.mission.firstPackDescription":
    "\nUtilizza {dataset} come punto di partenza, quindi gli input dello stage builder per il pubblico {audience}.",
  "reports.workspace.mission.drilldownTitle": "\nEsamina {dataset}",
  "reports.workspace.mission.drilldownDescription":
    "\n{dataset} è contrassegnato come {health}. Apri le prove dettagliate prima di cambiare la storia.",
  "reports.workspace.mission.coverageTitle": "\nAumenta la copertura del pacchetto",
  "reports.workspace.mission.coverageDescription":
    "\n{pack} ha attualmente una copertura del {score}%. Restringi sezioni, approfondimenti o narrativa prima di condividerlo.",
  "reports.workspace.mission.briefTitle": "\nRedigere il briefing decisionale",
  "reports.workspace.mission.briefDescription":
    "\n{pack} è strutturato e pronto per un riepilogo AI, un passaggio di domande e risposte o un briefing specifico per il pubblico.",
  "reports.workspace.mission.briefPrompt":
    "Redigere un briefing pronto per la decisione per il pacchetto di rapporti {pack}. Le sezioni attive sono {sections}. Riepilogare i principali rischi, spiegare le prove più convincenti e preparare probabili domande di follow-up.",
  "reports.workspace.journey.selectTitle": "\nSeleziona copertura",
  "reports.workspace.journey.selectDescription":
    "\nInizia con il set di dati più materiale: {dataset}. Conferma se appartiene al pacchetto successivo.",
  "reports.workspace.journey.gotoDataset": "\nApri set di dati",
  "reports.workspace.journey.askAi": "\nChiedi ad AI",
  "reports.workspace.journey.changeTitle": "\nCambia la storia",
  "reports.workspace.journey.changeDescription":
    "\nEsaminare il mix di sezioni attive prima di modificare la narrazione o l'inquadramento delle parti interessate: {sections}.",
  "reports.workspace.journey.gotoActivePack": "\nApri pacchetto attivo",
  "reports.workspace.journey.changePrompt":
    "\nAiutami a cambiare la storia del rapporto attuale. Le sezioni attive sono {sections}. Consiglia cosa dovrebbe essere enfatizzato, de-enfatizzato o riscritto.",
  "reports.workspace.journey.modifyTitle": "\nModifica il pacchetto",
  "reports.workspace.journey.modifyDescription":
    "\nRiorienta il rapporto corrente per il pubblico {audience} senza perdere i segnali chiave.",
  "reports.workspace.journey.gotoBuilder": "\nApri generatore",
  "reports.workspace.journey.modifyPrompt":
    "\nAiutami a modificare il pacchetto di rapporti corrente per il pubblico {audience} con un focus su {focus}. Consiglia come regolare gli input del builder.",
  "reports.workspace.journey.drilldownTitle": "\nEsamina la varianza",
  "reports.workspace.journey.drilldownDescription":
    "\nPassare dalle schede riepilogative alle tabelle delle prove per {dataset}.",
  "reports.workspace.journey.gotoDrilldown": "\nApri dettaglio",
  "reports.workspace.journey.drilldownPrompt":
    "\nEsamina il set di dati {dataset}. Attualmente è contrassegnato come {health}. Spiegare i probabili fattori determinanti e le prossime domande dettagliate che dovrei porre.",
  "reports.workspace.journey.addDataTitle": "\nAggiungi dati di origine",
  "reports.workspace.journey.addDataDescription":
    "\nSe la sicurezza è bassa, apri {source} e aggiungi o aggiorna le prove sottostanti.",
  "reports.workspace.journey.gotoSource": "\nSorgente aperta",
  "reports.workspace.journey.addDataPrompt":
    "\nDimmi quali dati aggiuntivi dovrei aggiungere da {source} per migliorare il pacchetto di report attivo ({activePack}).",
  "reports.workspace.ai.explainPostureTitle": "\nSpiega la postura attuale",
  "reports.workspace.ai.explainPostureDescription":
    "\nRiassumi i segnali più materiali, iniziando con {dataset}.",
  "reports.workspace.ai.explainDriversTitle": "\nSpiegare i conducenti e la fiducia",
  "reports.workspace.ai.explainDriversDescription":
    "\nTraccia i fattori principali, l'incertezza e le prove a sostegno di {dataset}.",
  "reports.workspace.ai.explainDriversPrompt":
    "Per il set di dati {dataset}, spiegare i fattori principali, il livello di fiducia, l'incertezza e quali prove cambierebbero maggiormente la decisione. La salute è {health}. Il pacchetto attivo è {pack}. Le sezioni attive sono {sections}. Sono presenti {count} set di dati offline. Effettuare un controllo incrociato di inventario, attività arretrate, utilizzo, finanza e segnali di approvvigionamento o smaltimento quando esistono prove.",
  "reports.workspace.ai.modifyPackTitle": "\nRetarget this pack",
  "reports.workspace.ai.modifyPackDescription":
    "\nConsiglia come dovrebbe cambiare il pacchetto {pack} per un pubblico o un decisore diverso.",
  "reports.workspace.ai.modifyPackPrompt":
    "\nAiutami a modificare il pacchetto di rapporti {pack}. Le sezioni attuali sono {sections}. Consiglia cosa aggiungere, rimuovere o stringere.",
  "reports.workspace.ai.comparePackTitle": "\nConfronta con cronologia",
  "reports.workspace.ai.comparePackDescription":
    "\nControlla in che modo il pacchetto attuale {pack} differisce dalla cronologia salvata e cosa è cambiato.",
  "reports.workspace.ai.comparePackPrompt":
    "\nConfronta il pacchetto di report corrente {pack} con la cronologia dei report salvata. Le sezioni attive sono {sections}. Evidenzia cosa è cambiato, cosa rimane irrisolto e cosa merita di essere approfondito prima della condivisione.",
  "reports.workspace.ai.findGapsTitle": "\nTrova lacune nei dati",
  "reports.workspace.ai.findGapsDescription":
    "\nSono presenti {count} set di dati offline che influiscono sull'attendibilità dei rapporti.",
  "reports.workspace.ai.findGapsPrompt":
    "\nIdentificare i dati mancanti o non aggiornati in questa area di lavoro di reporting. Attualmente sono presenti {count} set di dati offline. Spiegare quali sistemi di origine aggiornare per primi.",
  "reports.workspace.ai.explainSelectionTitle": "\nSpiega la selezione",
  "reports.workspace.ai.explainSelectionDescription":
    "\nUtilizza la selezione del testo corrente per chiedere una spiegazione in un linguaggio semplice nella chat.",
  "reports.workspace.source.estate":
    "\nApri l'area di lavoro dell'estate per esaminare la preparazione, le approvazioni dei progetti e la posizione del programma strategico alla base di questo rapporto.",
  "reports.workspace.source.assets":
    "\nAprire il registro delle risorse per aggiungere o correggere i record delle apparecchiature a sostegno di questo rapporto.",
  "reports.workspace.source.buildings":
    "\nApri gli edifici per ispezionare la gerarchia delle strutture, la postura FM e i blocchi di prontezza che influenzano questo rapporto.",
  "reports.workspace.source.fleet":
    "\nApri la flotta per ispezionare l'utilizzo, i tempi di inattività, la pressione di sostituzione e lo stato delle attrezzature operative alla base di questo rapporto.",
  "reports.workspace.source.financePlanning":
    "Pianificazione della finanza aperta per esaminare la pressione di approvazione, gli scenari di investimento e i compromessi di capitale collegati a questo rapporto.",
  "reports.workspace.source.admin":
    "\nIntegrazioni amministrative aperte per esaminare l'integrità del sistema partner e gli effetti di dipendenza che danno forma a questo rapporto.",
  "reports.workspace.source.sensors":
    "\nSensori aperti per ispezionare la copertura della telemetria, le lacune nella messa in servizio e i problemi di qualità del dispositivo alla base di questo rapporto.",
  "reports.workspace.source.tasks":
    "\nOperazioni di attività aperte per convalidare il backlog, la pressione di manutenzione e le azioni scadute.",
  "reports.workspace.source.predictions":
    "\nAprire le operazioni di previsione per esaminare le finestre di errore, la gravità e la copertura del modello.",
  "reports.workspace.source.finance":
    "\nFinanza aperta per convalidare l'esposizione al deprezzamento, la deriva della valutazione e il rischio di concentrazione.",
  "reports.workspace.source.utilisation":
    "\nUtilizzo aperto per ispezionare il carico supportato dalla telemetria, la saturazione e le prove di occupazione.",
  "reports.workspace.source.rfqs":
    "\nAprire l'area di lavoro RFQ per esaminare la domanda in entrata, l'attività dei preventivi e la preparazione alla conversione.",
  "reports.workspace.source.customerOrders":
    "\nAprire gli ordini dei clienti per convalidare l'avanzamento della pipeline, le approvazioni e la disponibilità all'evasione.",
  "reports.workspace.source.workOrders":
    "\nApri gli ordini di lavoro per ispezionare il flusso di esecuzione, la situazione dello SLA e la pressione di consegna.",
  "reports.workspace.source.purchaseOrders":
    "\nApri gli ordini di acquisto per rivedere gli impegni, le ricevute e l'invecchiamento dei fornitori.",
  "reports.workspace.source.invoices":
    "\nFatture aperte per rivedere l'emissione, lo stato di riscossione e i saldi scaduti.",
  "reports.navigation.title": "\nNavigatore flusso di lavoro",
  "reports.navigation.description":
    "\nPassa dalla selezione del set di dati alle modifiche del pacchetto, ai dettagli e alla revisione delle lacune nei dati senza uscire dall'area di lavoro dei report.",
  "reports.navigation.menuTitle": "\nSezioni",
  "reports.navigation.menuDescription":
    "\nPassa direttamente alla fase corrente del flusso di lavoro di reporting.",
  "reports.navigation.lanesTitle": "\nCorsie decisionali",
  "reports.navigation.lanesDescription":
    "\nPassa da un intento operatore all'altro prima di approfondire le azioni a livello di sezione o di passare lo stato corrente alla chat.",
  "reports.navigation.cluster.decideTitle": "\nDecidi",
  "reports.navigation.cluster.decideDescription":
    "\nEsamina la postura attuale, la mossa successiva consigliata e la disponibilità del set di dati prima di cambiare il pacchetto.",
  "reports.navigation.cluster.composeTitle": "\nComponi",
  "reports.navigation.cluster.composeDescription":
    "\nModifica il pubblico, l'obiettivo, le sezioni e la struttura del rapporto attivo prima di eseguire il briefing o l'esportazione.",
  "reports.navigation.cluster.investigateTitle": "\nInvestiga",
  "reports.navigation.cluster.investigateDescription":
    "\nPassa dal riassunto alle prove, confronta la cronologia e conferma ciò che è cambiato.",
  "reports.navigation.cluster.improveTitle": "\nMigliora",
  "reports.navigation.cluster.improveDescription":
    "Utilizza la chat e i sistemi di origine per colmare le lacune, ripristinare la copertura e rafforzare la fiducia.",
  "reports.navigation.cluster.itemCount": "\n{count} sezioni",
  "reports.navigation.stage.overview": "\nPanoramica",
  "reports.navigation.stage.overviewDesc":
    "\nPosizione del portafoglio, KPI riepilogativi e briefing AI attivo.",
  "reports.navigation.stage.journey": "\nViaggio",
  "reports.navigation.stage.journeyDesc":
    "\nPassaggi guidati dalla decisione per la selezione della copertura, il cambiamento del focus e l'analisi della varianza.",
  "reports.navigation.stage.datasets": "\nSet di dati",
  "reports.navigation.stage.datasetsDesc":
    "\nSet di dati finanziari, operativi e esecutivi in tempo reale che alimentano ogni pacchetto di report.",
  "reports.navigation.stage.aiCopilot": "\nCopilota AI",
  "reports.navigation.stage.aiCopilotDesc":
    "\nRichieste predefinite che aprono la chat con lo stato corrente del rapporto già allegato.",
  "reports.navigation.stage.builder": "\nCostruttore",
  "reports.navigation.stage.builderDesc":
    "\nPubblico, focus, intervallo di date, sezioni e controlli narrativi.",
  "reports.navigation.stage.templates": "\nModelli",
  "reports.navigation.stage.templatesDesc":
    "\nPacchetti di report integrati e salvati che possono essere avviati nell'area di lavoro.",
  "reports.navigation.stage.sourceHub": "\nHub di origine",
  "reports.navigation.stage.sourceHubDesc":
    "\nSistemi operativi che possono aggiungere prove, aggiornare la copertura o risolvere una lacuna nei dati.",
  "reports.navigation.stage.drilldown": "\nDettaglio",
  "reports.navigation.stage.drilldownDesc":
    "\nDettagli a livello di riga e segnali di concentrazione dietro il riepilogo corrente.",
  "reports.navigation.stage.history": "\nCronologia",
  "reports.navigation.stage.historyDesc":
    "\nCronologia dei report salvata per confronto, riproduzione e governance.",
  "reports.navigation.stage.activePack": "\nPacchetto attivo",
  "reports.navigation.stage.activePackDesc":
    "\nIl pacchetto di report corrente rappresentato dal server, la descrizione e le sezioni pronte per l'esportazione.",
  "reports.navigation.badge.live": "\nTutti in diretta",
  "reports.navigation.badge.ready": "\nPronto",
  "reports.navigation.badge.offlineCount": "\n{count} offline",
  "reports.navigation.badge.datasetCount": "\n{count} set di dati",
  "reports.navigation.badge.sectionCount": "\n{count} sezioni",
  "reports.navigation.badge.stepCount": "\n{count} passi",
  "reports.navigation.badge.templateCount": "\n{count} confezioni",
  "reports.navigation.badge.aiActionCount": "\n{count} richiede",
  "reports.navigation.badge.sourceCount": "\n{count} fonti",
  "reports.navigation.badge.savedCount": "\n{count} salvato",
  "reports.navigation.badge.coverage": "\nCopertura {score}%",
  "reports.navigation.badge.focus": "\n{focus} focus",
  "reports.navigation.badge.attention": "Attenzione: {label}",
  "reports.navigation.status.recommended": "\nConsigliato",
  "reports.navigation.status.complete": "\nCompleta",
  "reports.navigation.status.attention": "\nAttenzione",
  "reports.navigation.status.ready": "\nPronto",
  "reports.navigation.action.jump": "\nApri sezione",
  "reports.navigation.action.askAi": "\nChiedi ad AI",
  "reports.navigation.action.loadBuilder": "\nCostruttore di palcoscenici",
  "reports.navigation.action.loadBuilderAria": "\nCostruttore di scenografie da {name}",
  "reports.navigation.action.loadDrilldown": "\nCarica dettaglio",
  "reports.navigation.whyNow": "\nPerché adesso",
  "reports.navigation.whyNowComplete":
    "\nQuesto passaggio è già in uno stato utilizzabile. Riaprilo quando il pacchetto, le prove o il pubblico delle decisioni cambiano.",
  "reports.navigation.whyNowAttention":
    "\nRisolvi qui la varianza segnalata, la fonte obsoleta o le prove mancanti prima di condividere il pacchetto.",
  "reports.navigation.whyNowReady":
    "\nQuesto passaggio è disponibile quando è necessario perfezionare la storia, aprire prove o aggiungere dati di supporto.",
  "reports.journey.title": "\nViaggio decisionale",
  "reports.journey.description":
    "\nUn flusso di lavoro incentrato sulla finanza per selezionare la copertura, cambiare il focus, modificare i pacchetti, approfondire la varianza e identificare i dati mancanti.",
  "reports.ai.title": "\nCopilota AI",
  "reports.ai.description":
    "\nInvia lo stato corrente del rapporto in chat con istruzioni predefinite o spiega le righe selezionate da qualsiasi tabella.",
  "reports.workspace.health.healthy": "Sano",
  "reports.workspace.health.monitor": "\nMonitor",
  "reports.workspace.health.attention": "\nHa bisogno di attenzione",
  "reports.workspace.health.offline": "\nNon in linea",
  "reports.posture.title": "\nSegnalazione postura",
  "reports.posture.description":
    "\nCopertura in diretta attuale dei pacchetti di reportistica su finanza, operazioni e leadership.",
  "reports.generatedAt": "\nGenerato {date}",
  "reports.overview.reportCount": "\nSegnala pacchetti",
  "reports.overview.assetsCovered": "\nBeni coperti",
  "reports.overview.predictionsDue": "\nPronostici in scadenza",
  "reports.card.cadence.daily": "\nOgni giorno",
  "reports.card.cadence.weekly": "\nSettimanale",
  "reports.card.cadence.monthly": "\nMensile",
  "reports.card.metric.totalTypes": "\nTipi di asset",
  "reports.card.metric.criticalAssets": "\nRisorse critiche",
  "reports.card.metric.criticalSignals": "\nSegnali critici",
  "reports.types.depreciation": "\nRiepilogo ammortamento",
  "reports.types.depreciationDesc":
    "\nValore contabile, esposizione corretta per l'intelligenza artificiale e asset principali per ammortamento",
  "reports.types.assets": "\nRiepilogo risorse",
  "reports.types.assetsDesc": "\nCespiti per tipologia, stato e ripartizione del valore contabile",
  "reports.types.predictions": "\nRiepilogo pronostici",
  "reports.types.predictionsDesc": "\nPrevisioni di guasti e degrado per gravità e tipo",
  "reports.types.utilisation": "\nRiepilogo utilizzo",
  "reports.types.utilisationDesc": "\nTassi di utilizzo delle risorse e parametri di occupazione",
  "reports.types.executive": "\nRiepilogo esecutivo",
  "reports.types.executiveDesc": "\nIndicatori chiave di prestazione e panoramica del sistema",
  "reports.types.estateOperational": "\nImmagine operativa immobiliare",
  "reports.types.estateOperationalDesc":
    "\nReporting integrato rivolto al DIO su condizioni, ciclo di vita, preparazione, progetti, ispezioni e attività della forza lavoro",
  "reports.types.strategicDecision": "\nIntelligenza decisionale strategica",
  "reports.types.strategicDecisionDesc":
    "\nAnalisi del ciclo di vita, rischio infrastrutturale, pressione predittiva, analisi delle prestazioni e definizione delle priorità degli investimenti in un unico pacchetto decisionale",
  "reports.types.workOrders": "\nProduttività ordini di lavoro",
  "reports.types.workOrdersDesc":
    "\nThroughput operativo, produttività della forza lavoro, pressione sugli SLA e costi di mitigazione negli ordini di lavoro",
  "reports.types.purchaseOrders": "\nDurata ordine d'acquisto",
  "reports.types.purchaseOrdersDesc":
    "\nPressione di consegna del fornitore, tempi di consegna e spesa impegnata per tutti gli ordini di acquisto",
  "reports.types.customerOrders": "\nImbuto ordine cliente",
  "reports.types.customerOrdersDesc":
    "\nProgressione dell'ordine cliente dall'approvazione all'evasione e al completamento",
  "reports.types.invoices": "\nScadenza fattura",
  "reports.types.invoicesDesc":
    "\nSaldi in sospeso, modalità di riscossione e pressione per scaduti sulle fatture",
  "reports.types.rfqs": "\nConversione richiesta di offerta",
  "reports.types.rfqsDesc":
    "\nQualificazione RFQ, preventivo, accettazione e conversione in ordini cliente",
  "reports.summary": "\nRiepilogo",
  "reports.topAssets": "\nRisorse principali",
  "reports.asset": "\nRisorsa",
  "reports.bookValue": "\nValore contabile",
  "reports.severity": "\nGravità",
  "reports.severity.info": "\nInformazioni",
  "reports.severity.warning": "\nAvviso",
  "reports.severity.critical": "\nCritico",
  "reports.severity.emergency": "\nEmergenza",
  "reports.totalAssets": "\nTotale attivo",
  "reports.totalBookValue": "\nValore contabile totale",
  "reports.adjustedExposure": "\nEsposizione corretta",
  "reports.byType": "\nPer tipo",
  "reports.byCondition": "\nPer condizione",
  "reports.bySeverity": "\nPer gravità",
  "reports.type": "\nTipo",
  "reports.condition": "\nCondizione",
  "reports.status": "\nStato",
  "reports.columns.workOrder": "\nOrdine di lavoro",
  "reports.columns.activity": "\nAttività",
  "reports.columns.region": "\nRegione",
  "reports.columns.labourHours": "\nOre di lavoro",
  "reports.columns.productivity": "\nProduttività",
  "reports.columns.cycleHours": "\nOre ciclo",
  "reports.columns.cost": "\nCosto",
  "reports.columns.mitigation": "\nMitigazione",
  "reports.columns.purchaseOrder": "\nOrdine d'acquisto",
  "reports.columns.vendor": "\nVenditore",
  "reports.columns.ageDays": "\nGiorni di età",
  "reports.columns.order": "\nOrdine",
  "reports.columns.customer": "\nCliente",
  "reports.columns.workOrders": "\nOrdini di lavoro",
  "reports.columns.invoice": "\nFattura",
  "reports.columns.due": "\nScadenza",
  "reports.columns.rfq": "Richiesta di preventivo",
  "reports.columns.title": "\nTitolo",
  "reports.count": "\nConte",
  "reports.recentPredictions": "\nPronostici recenti",
  "reports.remainingDays": "\nGiorni rimasti",
  "reports.confidence": "\nFiducia",
  "reports.avgUtilisation": "\nUtilizzo medio",
  "reports.minMax": "\nMin – Max",
  "reports.topByUtilisation": "\nSuperiore per utilizzo",
  "reports.utilisation": "\nUtilizzo",
  "reports.metric": "\nMetrico",
  "reports.value": "\nValore",
  "reports.overdueMaintenance": "\nManutenzione scaduta",
  "reports.openDocuments": "\nApri documenti",
  "reports.workOrders.open": "\nOrdini di lavoro aperti",
  "reports.workOrders.reviewQueue": "\nCoda di revisione",
  "reports.workOrders.completed": "\nOrdini di lavoro completati",
  "reports.workOrders.breached": "\nSLA violato",
  "reports.workOrders.averageCycle": "\nCiclo medio",
  "reports.workOrders.productivity": "\nProduttività media",
  "reports.workOrders.mitigationCost": "\nCosto di mitigazione",
  "reports.workOrders.mitigationHours": "Ore di mitigazione",
  "reports.workOrders.regionWatch": "\nRegione sotto controllo",
  "reports.workOrders.improvementFocus": "\nObiettivo miglioramento",
  "reports.workOrders.mitigationActive": "\nMitigazione attiva",
  "reports.workOrders.mitigationClear": "\nSul bersaglio",
  "reports.estate.readiness": "\nDisponibilità delle capacità",
  "reports.estate.rangeReadiness": "\nProntezza autonomia",
  "reports.estate.criticalSignals": "\nSegnali critici",
  "reports.estate.approvalPressure": "\nPressione di approvazione",
  "reports.estate.approvalDelays": "\nApprovazioni ritardate",
  "reports.estate.labourHours": "\nOre di lavoro registrate",
  "reports.strategy.priorityFocus": "\nObiettivo prioritario",
  "reports.strategy.lifecyclePressure": "\nPressione del ciclo di vita",
  "reports.strategy.infrastructureRisk": "\nRischio infrastrutturale",
  "reports.strategy.predictiveSignals": "\nSegnali predittivi",
  "reports.strategy.investmentPressure": "\nPressione sugli investimenti",
  "reports.strategic.focus.lifecycle": "\nRinnovo del ciclo di vita",
  "reports.strategic.focus.infrastructure": "\nRischio infrastrutturale",
  "reports.strategic.focus.predictive": "\nManutenzione predittiva",
  "reports.strategic.focus.performance": "\nAndamento operativo",
  "reports.strategic.focus.investment": "\nPriorità degli investimenti",
  "reports.purchaseOrders.awaitingReceipt": "\nIn attesa di ricezione",
  "reports.purchaseOrders.overdue": "\nOrdini di acquisto scaduti",
  "reports.purchaseOrders.avgLeadTime": "\nTempo medio di consegna",
  "reports.purchaseOrders.committed": "\nSpesa impegnata",
  "reports.customerOrders.pending": "\nIn attesa di approvazione",
  "reports.customerOrders.confirmed": "\nOrdini confermati",
  "reports.customerOrders.fulfilment": "\nIn adempimento",
  "reports.customerOrders.converted": "\nConvertito da RFQ",
  "reports.customerOrders.booked": "\nValore prenotato",
  "reports.invoices.outstanding": "\nImporto dovuto",
  "reports.invoices.overdue": "\nFatture scadute",
  "reports.invoices.collected": "\nContanti incassati",
  "reports.invoices.partial": "\nParzialmente pagato",
  "reports.rfqs.submitted": "\nRichieste di offerta inviate",
  "reports.rfqs.quoted": "\nRichieste di offerta quotate",
  "reports.rfqs.accepted": "\nRichieste di offerta accettate",
  "reports.rfqs.converted": "\nRFQ convertite",
  "reports.rfqs.averageBudget": "\nBudget medio",
  "reports.rfqs.pipeline": "\nGasdotto attivo",
  "reports.downloadPdf": "\nScarica PDF",
  "reports.viewAnalysis": "\nVisualizza analisi",
  "reports.analysis": "\nAnalisi dei dati",
  "reports.analysisLoading": "\nCaricamento analisi…",
  "reports.ai.askAi": "\nChiedi a .bao",
  "reports.ai.askAiMissionAria": "\nChiedi a .bao la mossa successiva consigliata",
  "reports.ai.askAiTemplateAria": "\nChiedi a .bao informazioni sul modello {name}",
  "reports.ai.askAiPackAria": "\nChiedi a .bao informazioni sul pacchetto di rapporti {name}",
  "reports.ai.askAiSectionAria": "\nChiedi a .bao informazioni sulla sezione {name}",
  "reports.ai.askAiDrilldownAria": "\nChiedi a .bao informazioni sull'approfondimento {name}",
  "reports.insights": "\nApprofondimenti",
  "reports.insights.depreciationCritical":
    "\n{count} previsioni critiche che influiscono sulla valutazione",
  "reports.insights.depreciationHealthy":
    "\nNessuna previsione critica che incide sulla valutazione",
  "reports.insights.depreciationTotal": "\n{count} beni nell'ambito dell'ammortamento",
  "reports.insights.topAssetType": "\n{type}: {count} risorse",
  "reports.insights.noAssets": "\nNessuna risorsa nel sistema",
  "reports.insights.criticalAssets": "\n{count} asset in condizioni critiche",
  "reports.insights.noCritical": "\nNessuna risorsa in condizioni critiche",
  "reports.insights.predictionsDue": "\n{count} previsione/i con scadenza entro {days} giorni",
  "reports.insights.noPredictionsDue": "\nNessun pronostico in scadenza entro {days} giorni",
  "reports.insights.criticalPredictions": "\n{count} previsione/i critica/di emergenza",
  "reports.insights.highUtilisation": "\nUtilizzo elevato: considerare la revisione della capacità",
  "reports.insights.utilisationNormal": "\nUtilizzo entro range normale",
  "reports.insights.utilisationMonitor":
    "\nL'utilizzo è al di fuori della banda preferita e deve essere monitorato",
  "reports.insights.assetCount": "\n{count} risorse monitorate",
  "reports.insights.overdueTasks": "\n{count} attività di manutenzione scadute",
  "reports.insights.noOverdue": "\nNessuna attività di manutenzione scaduta",
  "reports.insights.workOrders.breached":
    "\nGli ordini di lavoro {count} sono attualmente fuori dallo SLA.",
  "reports.insights.workOrders.noBreach":
    "\nNessun ordine di lavoro campionato è esterno allo SLA.",
  "reports.insights.workOrders.avgCycle":
    "\nIl ciclo medio di completamento è di {hours} ore tra i completamenti recenti.",
  "reports.insights.workOrders.noCompleted":
    "\nNessun ordine di lavoro completato disponibile per l'analisi della produttività.",
  "reports.insights.workOrders.productivity":
    "\nLa produttività media è di {rate} unità di output per ora di lavoro in {hours} ore registrate.",
  "reports.insights.workOrders.mitigationCost":
    "Gli {count} ordini di lavoro violati attualmente comportano {cost} di mitigazione per {hours} ore di lavoro.",
  "reports.insights.workOrders.noMitigation":
    "\nNessun ordine di lavoro violato attualmente comporta manodopera di mitigazione tracciata.",
  "reports.insights.workOrders.activityWatch":
    "\n{activity} è il tipo di lavoro con la produttività più bassa con {rate} unità di output per ora di lavoro.",
  "reports.insights.workOrders.regionWatch":
    "\n{region} è il carico di lavoro regionale campionato più debole con {rate} unità di produzione per ora di lavoro.",
  "reports.insights.workOrders.improvementFocus":
    "\nDai priorità alle azioni di miglioramento delle prestazioni attorno a {focus}.",
  "reports.insights.workOrders.noImprovementFocus":
    "\nDall'attuale campione di ordini di lavoro non emerge un singolo focus di miglioramento.",
  "reports.insights.estateOperational.infrastructureRisk":
    "\n{count} i segnali di rischio immobiliare sono attivi nei dati relativi a condizioni, ispezione e previsione.",
  "reports.insights.estateOperational.infrastructureRiskClear":
    "\nNon sono attivi segnali critici di rischio immobiliare nel quadro immobiliare integrato.",
  "reports.insights.estateOperational.readinessGap":
    "\n{ready} delle {total} funzionalità monitorate sono completamente pronte, con {constrainedSites} siti vincolati che influiscono ancora sulla disponibilità.",
  "reports.insights.estateOperational.readinessClear":
    "\nLe capacità tracciate sono attualmente pronte per i report senza vincoli a livello di proprietà.",
  "reports.insights.estateOperational.approvalDelay":
    "\nL'approvazione/i dei progetti {delayed} è in ritardo, con {queue} ulteriori progetti ancora in coda.",
  "reports.insights.estateOperational.approvalQueue":
    "\nLe {queue} approvazioni del progetto rimangono nella coda corrente.",
  "reports.insights.estateOperational.approvalClear":
    "\nNessuna approvazione di progetto è attualmente ritardata o in coda.",
  "reports.insights.estateOperational.inspectionBacklog":
    "\nGli articoli da ispezionare {count} sono scaduti mentre le {hours} ore di manodopera vengono registrate rispetto all'attività di consegna corrente.",
  "reports.insights.estateOperational.workforceSignal":
    "\nLe {hours} ore di manodopera sono attualmente registrate nell'attività di consegna operativa.",
  "reports.insights.estateOperational.investmentPressure":
    "\n{count} segnali di pressione sugli investimenti sono attivi nei progetti {projects} e nelle iniziative strategiche {initiatives}.",
  "reports.insights.estateOperational.investmentStable":
    "\nLe iniziative strategiche rimangono registrate senza ulteriori segnali di pressione sugli investimenti oltre l'attuale riferimento di {initiatives}.",
  "reports.insights.strategicDecision.lifecyclePressure":
    "\nSono attive le risorse {count} Lifecycle Watch, che rappresentano il {rate}% della base immobiliare attuale.",
  "reports.insights.strategicDecision.lifecycleStable":
    "\nNessun asset sottoposto a monitoraggio del ciclo di vita sta attualmente distorcendo la posizione strategica degli investimenti.",
  "reports.insights.strategicDecision.infrastructureRisk":
    "\nSono attivi {count} segnali di rischio infrastrutturale, equivalenti al {rate}% dell'attuale patrimonio immobiliare.",
  "reports.insights.strategicDecision.infrastructureRiskClear":
    "I segnali di rischio infrastrutturale sono attualmente chiari nel quadro strategico.",
  "reports.insights.strategicDecision.predictiveLoad":
    "\n{count} segnali di manutenzione predittiva sono attivi, incluse {critical} previsioni critiche, con il {rate}% delle risorse in scadenza a breve.",
  "reports.insights.strategicDecision.predictiveClear":
    "\nI segnali di manutenzione predittiva sono attualmente chiari in tutta l'area monitorata.",
  "reports.insights.strategicDecision.performanceSignal":
    "\nLe prestazioni operative rimangono modellate su {focus}, con prontezza al {readiness}% e produttività a {productivity} unità di output per ora di lavoro.",
  "reports.insights.strategicDecision.performanceStable":
    "\nLe prestazioni operative rimangono stabili con disponibilità al {readiness}% e produttività a {productivity} unità di output per ora di lavoro.",
  "reports.insights.strategicDecision.investmentPriority":
    "\nLa definizione delle priorità degli investimenti è attualmente guidata da {focus}, con segnali collegati {count} e approvazioni ritardate {delayed} che continuano a influenzare la coda.",
  "reports.insights.strategicDecision.investmentStable":
    "\nLa posizione di investimento strategico è stabile, con {focus} che rimane l'area principale sotto osservazione piuttosto che una corsia di pressione attiva.",
  "reports.insights.purchaseOrders.overdue": "\nGli ordini di acquisto {count} sono scaduti.",
  "reports.insights.purchaseOrders.noOverdue": "\nNessun ordine di acquisto è attualmente scaduto.",
  "reports.insights.purchaseOrders.awaitingReceipt":
    "\nGli ordini di acquisto {count} sono ancora in attesa di ricezione completa.",
  "reports.insights.purchaseOrders.avgLeadTime":
    "\nIl tempo medio di consegna del fornitore è di {days} giorni.",
  "reports.insights.customerOrders.fulfilment":
    "\nGli ordini dei clienti {count} sono attualmente in evasione.",
  "reports.insights.customerOrders.noFulfilment":
    "\nNessun ordine cliente è attualmente in evasione.",
  "reports.insights.customerOrders.converted":
    "\nGli ordini cliente {count} sono stati creati da richieste di offerta accettate.",
  "reports.insights.invoices.overdue":
    "\nLe fatture {count} sono scadute e necessitano di follow-up per la riscossione.",
  "reports.insights.invoices.noOverdue": "\nNessuna fattura è attualmente scaduta.",
  "reports.insights.invoices.paymentMix":
    "\nLe fatture {paidCount} sono state interamente pagate e {partialCount} rimangono parzialmente pagate.",
  "reports.insights.rfqs.converted":
    "\n{count} Le richieste di offerta sono state convertite in ordini cliente.",
  "reports.insights.rfqs.pipeline":
    "\n{count} Le RFQ rimangono attive nelle fasi di qualificazione o preventivo.",
  "reports.insights.rfqs.noPipeline":
    "\nNessuna richiesta di offerta è attualmente attiva nella pipeline commerciale.",
  "reports.unknownReportType": "\nTipo di rapporto sconosciuto",
  "reports.generateFailed": "\nGenerazione del rapporto non riuscita",
  "reports.dataset.prompt":
    "Esamina il set di dati {dataset}. La salute è {health}. Metriche chiave: {metrics}. Approfondimenti: {insights}. Spiega cosa è cambiato, perché è importante e se questo set di dati appartiene al pacchetto di report corrente.",
  "reports.pdfAuthor": "{brandName}",
  "reports.rawMetrics": "\nMetriche grezze",
  "reports.rawMetricsLower": "\nmetriche grezze",
  "reports.viewAnalysisAria": "\nVisualizza l'analisi per {label}",
  "reports.journey.prompt.select":
    "\nIn base all'attuale area di lavoro di reporting e alle sezioni selezionate ({sections}), quali set di dati dovrei includere nel pacchetto successivo e perché?",
  "reports.journey.prompt.change":
    "\nAiutami a modificare il rapporto corrente per il pubblico {audience} con un focus su {focus}. Consiglia come modificare il pubblico, l'obiettivo o l'intervallo di date e spiega i compromessi.",
  "reports.journey.prompt.modify":
    "\nEsamina il pacchetto di rapporti corrente con le sezioni {sections}. Suggerisci modifiche concrete alla narrazione, al mix di sezioni e all'ordinamento.",
  "reports.journey.prompt.drilldown":
    "\nEsamina il set di dati {dataset}. Attualmente è contrassegnato come {health}. Spiegare i probabili fattori determinanti e le prossime domande dettagliate che dovrei porre.",
  "reports.journey.prompt.drilldownUnavailable":
    "\nNessun set di dati ha attualmente la priorità per il drilldown.",
  "reports.journey.prompt.drilldownFallback":
    "\nIdentificare l'area successiva del report che merita un approfondimento e spiegare quali prove dovrei esaminare per prime.",
  "reports.journey.prompt.addData":
    "\nIdentifica i dati mancanti o non aggiornati in questa area di lavoro di reporting. Attualmente sono presenti {offlineCount} set di dati offline. Spiega quali dati aggiungere o aggiornare successivamente.",
  "reports.journey.prompt.addDataSource":
    "\nDimmi quali prove aggiuntive dovrei aggiungere o aggiornare in {source} per migliorare questo pacchetto di rapporti.",
  "reports.ai.prompt.explainPosture":
    "\nSpiega l'attuale approccio di reporting, i segnali più rilevanti e su cosa dovrebbe concentrarsi in seguito un lettore finanziario o esecutivo.",
  "reports.ai.prompt.modifyPack":
    "\nAiutami a modificare il pacchetto di rapporti corrente per il pubblico {audience} con un focus su {focus}. Le sezioni attuali sono {sections}. Consiglia cosa aggiungere, rimuovere o stringere.",
  "reports.ai.prompt.findGaps":
    "\nIdentifica la copertura mancante o i dati non aggiornati in quest'area di lavoro di reporting e spiega quali set di dati, filtri o aggiornamenti aggiuntivi migliorerebbero la sicurezza.",
  "reports.ai.prompt.findGapsWithSource":
    "\nIdentifica la copertura mancante o i dati non aggiornati in quest'area di lavoro di reporting. Inizia con {source} e spiega come migliorerebbe il pacchetto attivo {pack}.",
  "reports.ai.prompt.sectionAnalysis":
    "Analizza la sezione {section}. Spiegare i segnali chiave, i valori anomali e le prossime domande che un operatore dovrebbe porre.",
  "reports.templates.builtin.financeControl": "\nPacchetto controllo finanziario",
  "reports.templates.builtin.financeControlDesc":
    "\nEsposizione all'ammortamento e sintesi per la supervisione finanziaria",
  "reports.templates.builtin.riskWatch": "\nPacchetto controllo rischi",
  "reports.templates.builtin.riskWatchDesc":
    "\nPrevisioni, utilizzo e riepilogo esecutivo per le operazioni",
  "reports.templates.builtin.boardPack": "\nPacchetto tavole",
  "reports.templates.builtin.boardPackDesc":
    "\nRiepilogo esecutivo con ammortamento e ripartizione delle attività per la leadership",
  "reports.templates.builtin.fmGovernance": "\nPacchetto governance FM",
  "reports.templates.builtin.fmGovernanceDesc":
    "\nPosizione di governance FM, produttività degli ordini di lavoro e intelligence decisionale strategica per la revisione del rischio",
  "reports.templates.builtin.stewardship": "\nPacchetto Gestione",
  "reports.templates.builtin.stewardshipDesc":
    "\nPosizione di gestione patrimoniale con copertura patrimoniale e informazioni decisionali strategiche per la revisione operativa",
  "reports.templates.builtin.cateringEss": "\nRistorazione / Pacchetto ESS",
  "reports.templates.builtin.cateringEssDesc":
    "\nQuadro operativo dell'azienda, produttività delle consegne e posizione esecutiva per il catering e la supervisione dell'ESS",
  "reports.templates.builtin.programmeControls": "\nPacchetto controlli programma",
  "reports.templates.builtin.programmeControlsDesc":
    "\nPosizione esecutiva, segnali di consegna del patrimonio e informazioni decisionali strategiche per la governance del programma",
  "reports.builder.eyebrow": "\nStudio costruttore",
  "reports.builder.title": "\nGeneratore di report personalizzato",
  "reports.builder.description":
    "\nCrea pacchetti di report interfunzionali con narrazioni .bao, modelli salvati e approfondimenti più approfonditi.",
  "reports.builder.aiTitle": "\nCopilota costruttore",
  "reports.builder.aiDescription":
    "\nUtilizza la chat per testare la combinazione di sezioni, l'inquadratura del pubblico e le indicazioni del costruttore prima della generazione.",
  "reports.builder.ai.planTitle": "\nConsiglia la sezione mix",
  "reports.builder.ai.planDescription":
    "\nEsamina il pubblico attuale, il focus e le sezioni selezionate prima di rigenerare il pacchetto.",
  "reports.builder.ai.planPrompt":
    "\nConsiglia la migliore combinazione di sezioni per un rapporto rivolto al pubblico {audience} con un focus {focus}. Le sezioni attualmente selezionate sono {sections}. Spiega cosa mantenere, rimuovere o aggiungere prima della generazione.",
  "reports.builder.ai.guidanceTitle": "\nBozza della guida per l'operatore",
  "reports.builder.ai.guidanceDescription":
    "\nTrasforma l'attuale configurazione del builder in una guida concisa che l'operatore può applicare o incollare nel modulo.",
  "reports.builder.ai.guidancePrompt":
    "Crea una bozza di linee guida concise per un report rivolto al pubblico {audience} con un focus su {focus}. Le sezioni selezionate sono {sections}. La narrazione è {includeNarrative}. I drilldown sono {includeDrilldowns}. Suggerisci il testo guida finale e spiega perché migliorerà il pacchetto.",
  "reports.builder.controlsTitle": "\nParametri di creazione",
  "reports.builder.controlsDescription":
    "\nDefinire il pubblico, l'obiettivo, la copertura e le indicazioni dell'operatore per il pacchetto di report generato.",
  "reports.builder.reportTitleLabel": "\nTitolo della segnalazione",
  "reports.builder.reportTitleHint":
    "\nUtilizzato come titolo per il pacchetto di report generato.",
  "reports.builder.audienceLabel": "\nPubblico",
  "reports.builder.audience.risk": "\nRischio e garanzia",
  "reports.builder.focusLabel": "\nFocus",
  "reports.builder.sectionsLabel": "\nSezioni",
  "reports.builder.sectionsHint": "\nSeleziona almeno una sezione del rapporto da includere.",
  "reports.builder.includeNarrative": "\nGenera riassunto narrativo",
  "reports.builder.includeNarrativeHint":
    "\nUtilizza il provider AI configurato e torna a un riepilogo deterministico quando non disponibile.",
  "reports.builder.includeDrilldowns": "\nIncludi approfondimenti",
  "reports.builder.includeDrilldownsHint":
    "\nAllega dettagli operativi a livello di tabella e metriche più approfondite a ogni sezione selezionata.",
  "reports.builder.guidanceLabel": "\nGuida",
  "reports.builder.guidanceHint": "\nGuida opzionale che modella la narrativa e l'enfasi generate.",
  "reports.builder.seed.financePlanning.source": "\nPianificazione finanziaria",
  "reports.builder.seed.financePlanning.alert":
    "\nTestato da {source}: {title}. Esamina l'ambito ereditato prima di generare il pacchetto.",
  "reports.builder.seed.financePlanning.title": "\nTrasferimento della pianificazione finanziaria",
  "reports.builder.seed.financePlanning.description":
    "\nQuesta sessione del builder è stata precaricata da uno scenario finanziario in modo che il pacchetto di report possa riutilizzare il contesto di pianificazione approvato.",
  "reports.builder.seed.financePlanning.scopeLabel": "\nAmbito",
  "reports.builder.seed.financePlanning.horizonLabel": "\nOrizzonte",
  "reports.builder.seed.financePlanning.horizonValue": "\n{months} mesi",
  "reports.builder.seed.financePlanning.guidanceLabel": "\nGuida ereditata",
  "reports.builder.generate": "\nGenera pacchetto di rapporti",
  "reports.builder.loadDataset": "\nCarica set di dati",
  "reports.builder.loadDatasetAria": "\nCarica il set di dati {name} nel builder",
  "reports.builder.loadTemplate": "\nCarica modello",
  "reports.builder.loadTemplateAria": "\nCarica il modello {name} nel builder",
  "reports.builder.loadCurrentPack": "\nCarica pacchetto corrente",
  "reports.builder.loadCurrentPackAria": "\nCarica il pacchetto corrente {name} nel builder",
  "reports.builder.loadSection": "\nCarica sezione",
  "reports.builder.loadSectionAria": "\nCarica la sezione {name} nel builder",
  "reports.builder.loadDrilldown": "\nCarica dettaglio",
  "reports.builder.loadDrilldownAria": "\nCarica il drilldown {name} nel builder",
  "reports.builder.loadedDataset": "\nGeneratore aggiornato dal set di dati {name}.",
  "reports.builder.loadedTemplate": "\nGeneratore aggiornato dal modello {name}.",
  "reports.builder.loadedSection": "\nIl costruttore si è concentrato sulla sezione {name}.",
  "reports.builder.loadedPack": "\nGeneratore aggiornato dal pacchetto di report {name}.",
  "reports.builder.audience.finance": "\nFinanza",
  "reports.builder.audience.operations": "\nOperazioni",
  "reports.builder.audience.executive": "\nDirigente",
  "reports.templates.saveTitle": "\nSalva il generatore corrente come modello",
  "reports.templates.saveDescription":
    "\nMantieni le opzioni di mix, pubblico e report della sezione corrente come pacchetto riutilizzabile.",
  "reports.templates.nameLabel": "\nNome modello",
  "reports.templates.descriptionLabel": "\nDescrizione",
  "reports.templates.saveAction": "\nSalva modello",
  "reports.templates.error.invalid":
    "\nModello non valido. Nome e almeno una sezione sono obbligatori.",
  "reports.templates.error.saveFailed": "\nImpossibile salvare il modello. Per favore riprova.",
  "reports.builder.focus.financial": "\nFinanziario",
  "reports.builder.focus.operations": "\nOperazioni",
  "reports.builder.focus.risk": "\nRischio",
  "reports.builder.focus.executive": "\nDirigente",
  "reports.custom.sectionsTitle": "Sezioni disponibili",
  "reports.custom.previewTitle": "\nArea di lavoro report attivo",
  "reports.custom.previewDescription":
    "\nPacchetto di report renderizzati sul server con descrizione, analisi delle sezioni e dati drill-down in tempo reale.",
  "reports.custom.error.invalid":
    "\nSeleziona almeno una sezione del rapporto per generare un pacchetto personalizzato.",
  "reports.custom.generatedTitleSingle": "Per {audience}: {primarySection}",
  "reports.custom.generatedTitlePair": "Per {audience}: {primarySection} e {secondarySection}",
  "reports.custom.fallbackNarrativeIntro":
    "\nLa copertura si estende su {count} sezioni per il pubblico {audience} con un focus {focus}.",
  "reports.custom.narrativeDisabled":
    "\nLa sintesi narrativa è disabilitata per questa build di report.",
  "reports.custom.workspaceEmpty":
    "\nEsegui un modello o scegli le sezioni per assemblare un pacchetto di report in tempo reale.",
  "reports.custom.fallbackNarrativeGuidance": "\nGuida dell'operatore: {guidance}.",
  "reports.custom.section.depreciation":
    "\nL'esposizione all'ammortamento è pari a {adjustedExposure} per tutti gli {totalAssets} asset.",
  "reports.custom.section.assets":
    "\nLe risorse critiche {criticalAssets} sono distribuite tra {totalTypes} tipi di risorse monitorate.",
  "reports.custom.section.predictions":
    "\nA breve arriveranno le {predictionsDue} finestre di previsione, inclusi {criticalCount} segnali critici.",
  "reports.custom.section.utilisation":
    "\nL'utilizzo medio è {utilisationRate} tra {assetCount} risorse attive.",
  "reports.custom.section.executive":
    "\n{activeTasks} attività aperte e {openDocuments} documenti operativi rimangono attivi nei flussi di lavoro di consegna e entrate.",
  "reports.custom.section.estateOperational":
    "\n{criticalSignals} i segnali di rischio immobiliare rimangono attivi, le capacità sono pronte a {readiness} e le approvazioni dei progetti {delayed} sono ritardate.",
  "reports.custom.section.strategicDecision":
    "\nL'intelligence sulle decisioni strategiche è attualmente guidata da {focus}, con {riskCount} segnali di rischio infrastrutturale e {investmentCount} segnali di pressione sugli investimenti.",
  "reports.custom.section.workOrders":
    "\nGli ordini di lavoro {breachedCount} non rientrano nello SLA, la produttività media è {productivityRate} e il costo di mitigazione è pari a {mitigationCost}.",
  "reports.custom.section.purchaseOrders":
    "\nGli ordini di acquisto di {overdueCount} sono scaduti e il tempo di consegna medio è di {avgLeadDays} giorni.",
  "reports.custom.section.customerOrders":
    "\nGli ordini dei clienti {fulfilmentCount} sono in fase di evasione e {convertedCount} hanno avuto origine da richieste di offerta.",
  "reports.custom.section.invoices":
    "\nLe fatture {overdueCount} sono scadute e {outstandingAmount} sono ancora in sospeso.",
  "reports.custom.section.rfqs":
    "\n{convertedCount} Le richieste di offerta sono state convertite in ordini e {quotedCount} rimangono nella fase di preventivo.",
  "reports.drilldown.band.overloaded": "\nSovraccarico",
  "reports.drilldown.band.watch": "\nGuarda",
  "reports.drilldown.band.stable": "\nStabile",
  "reports.drilldown.depreciationTitle": "\nAnalisi dettagliata dell'esposizione all'ammortamento",
  "reports.drilldown.depreciationDescription":
    "\nConcentrazione del valore massimo, condizione attuale e ultimi segnali di gravità per le attività sensibili all'ammortamento.",
  "reports.drilldown.assetsTitle": "\nDettaglio della composizione delle risorse",
  "reports.drilldown.assetsDescription":
    "\nComposizione del portafoglio per sito, tipologia, condizione e attuale concentrazione del valore contabile.",
  "reports.drilldown.predictionsTitle": "Analisi approfondita della pressione prevista",
  "reports.drilldown.predictionsDescription":
    "\nEventi di previsione recenti con gravità, confidenza e contesto di vita residua.",
  "reports.drilldown.utilisationTitle": "\nAnalisi approfondita dell'intensità di utilizzo",
  "reports.drilldown.utilisationDescription":
    "\nStato di utilizzo allineato allo spazio di lavoro nel portafoglio attuale con sito, tipo di risorsa e contesto di carico corrente.",
  "reports.drilldown.maxUtilisation": "\nUtilizzo massimo",
  "reports.drilldown.bandTitle": "\nPostura",
  "reports.drilldown.executiveTitle": "\nApprofondimento sulla pressione dei dirigenti",
  "reports.drilldown.executiveDescription":
    "\nSegnali di pressione operativa che abbracciano l'arretrato di manutenzione, l'esposizione alle previsioni, il flusso di documenti e il valore del portafoglio.",
  "reports.drilldown.estateOperationalTitle":
    "\nAnalisi dettagliata del quadro operativo della proprietà",
  "reports.drilldown.estateOperationalDescription":
    "\nAtteggiamento integrato a livello di proprietà in termini di condizioni, ciclo di vita, preparazione, ispezioni, approvazioni di progetti e pressione di consegna.",
  "reports.drilldown.strategicDecisionTitle":
    "\nApprofondimento sull'intelligence decisionale strategica",
  "reports.drilldown.strategicDecisionDescription":
    "\nTraccia l'esposizione al ciclo di vita, il rischio infrastrutturale, la domanda predittiva, le prestazioni operative e l'attenzione agli investimenti da un unico pacchetto di intelligence strategica.",
  "reports.drilldown.workOrdersTitle":
    "\nAnalisi dettagliata della produttività dell'ordine di lavoro",
  "reports.drilldown.workOrdersDescription":
    "\nOrdini di lavoro recenti con ambito regionale, mix di attività, stato di produttività, stato di mitigazione e costi di esecuzione monitorati.",
  "reports.drilldown.purchaseOrdersTitle":
    "\nAnalisi dettagliata della scadenza dell'ordine di acquisto",
  "reports.drilldown.purchaseOrdersDescription":
    "\nOrdini di acquisto recenti con proprietà del fornitore, invecchiamento, stato di consegna e valore commerciale impegnato.",
  "reports.drilldown.customerOrdersTitle":
    "\nAnalisi dettagliata della canalizzazione dell'ordine cliente",
  "reports.drilldown.customerOrdersDescription":
    "\nOrdini clienti recenti con stato di evasione, volume degli ordini di lavoro collegati e valore prenotato.",
  "reports.drilldown.invoicesTitle": "\nAnalisi approfondita dell'invecchiamento delle fatture",
  "reports.drilldown.invoicesDescription":
    "\nFatture recenti con proprietà del cliente, situazione dovuta, valore residuo e movimento dei pagamenti.",
  "reports.drilldown.rfqsTitle":
    "\nAnalisi dettagliata della conversione della richiesta di offerta",
  "reports.drilldown.rfqsDescription":
    "\nRichieste di offerta recenti con fase commerciale, budget dichiarato e visibilità della conversione degli ordini a valle.",
  "reports.drilldown.empty.workOrders": "\nNessun ordine di lavoro disponibile per il drilldown.",
  "reports.drilldown.empty.estateOperational":
    "\nNon sono disponibili segnali grafici operativi immobiliari per il drilldown.",
  "reports.drilldown.empty.strategicDecision":
    "\nNon sono disponibili segnali di intelligence decisionale strategica per il drilldown.",
  "reports.drilldown.empty.purchaseOrders":
    "\nNessun ordine di acquisto disponibile per il drill-down.",
  "reports.drilldown.empty.customerOrders": "\nNessun ordine cliente disponibile per il drilldown.",
  "reports.drilldown.empty.invoices": "\nNessuna fattura disponibile per il dettaglio.",
  "reports.drilldown.empty.rfqs": "Non sono disponibili richieste di offerta per il drill-down.",
  "reports.drilldown.outlookTitle": "\nProspettive",
  "reports.drilldown.noteTitle": "\nNota",
  "reports.drilldown.executive.openDocumentsNote":
    "\nI documenti operativi {count} rimangono attivi: {rfqs} RFQ, {customerOrders} ordini cliente, {workOrders} ordini di lavoro, {purchaseOrders} ordini di acquisto e {invoices} fatture.",
  "reports.drilldown.executive.openDocumentsClear":
    "\nAl momento non sono aperti documenti operativi.",
  "reports.drilldown.executive.bookValueNote":
    "\nL'utilizzo medio in tutta la tenuta è attualmente {rate}.",
  "reports.drilldown.estateOperational.row.condition": "\nStato immobile",
  "reports.drilldown.estateOperational.row.lifecycle": "\nRischio del ciclo di vita",
  "reports.drilldown.estateOperational.row.readiness": "\nPreparazione alla formazione",
  "reports.drilldown.estateOperational.row.inspection": "\nIspezione e forza lavoro",
  "reports.drilldown.estateOperational.row.approvals": "\nApprovazioni progetto",
  "reports.drilldown.estateOperational.row.delivery": "\nConsegna del progetto",
  "reports.drilldown.strategicDecision.row.lifecycle": "\nAnalisi del ciclo di vita degli asset",
  "reports.drilldown.strategicDecision.row.infrastructure":
    "\nValutazione del rischio infrastrutturale",
  "reports.drilldown.strategicDecision.row.predictive":
    "\nModellazione della manutenzione predittiva",
  "reports.drilldown.strategicDecision.row.performance": "\nAnalisi delle prestazioni operative",
  "reports.drilldown.strategicDecision.row.investment": "\nPriorità degli investimenti",
  "reports.drilldown.estateOperational.value.condition":
    "\n{critical} critico per le {total} risorse monitorate",
  "reports.drilldown.estateOperational.value.lifecycle":
    "\n{critical} segnali critici • {due} a breve",
  "reports.drilldown.estateOperational.value.readiness": "\n{ready} di {total} funzionalità pronte",
  "reports.drilldown.estateOperational.value.inspection": "\n{count} ispezione/i scadute",
  "reports.drilldown.estateOperational.value.approvals": "\n{delayed} ritardato • {queue} in coda",
  "reports.drilldown.estateOperational.value.delivery":
    "\n{highRisk} ad alto rischio • {conflicts} conflitto/i",
  "reports.drilldown.strategicDecision.value.lifecycle":
    "\nLe risorse {count} sottoposte a monitoraggio del ciclo di vita rappresentano attualmente {rate} della base immobiliare.",
  "reports.drilldown.strategicDecision.value.infrastructure":
    "\nI {count} segnali di rischio infrastrutturale rappresentano attualmente {rate} del patrimonio immobiliare.",
  "reports.drilldown.strategicDecision.value.predictive":
    "\n{count} segnali di manutenzione predittiva sono attivi, incluse {critical} previsioni critiche.",
  "reports.drilldown.strategicDecision.value.performance":
    "\nIl livello di preparazione delle capacità è {readiness} e la produttività è {productivity} unità di output per ora di lavoro.",
  "reports.drilldown.strategicDecision.value.investment":
    "\n{count} segnali di pressione di investimento sono attivi, guidati da {focus}.",
  "reports.drilldown.estateOperational.note.condition":
    "\nLe risorse {watch} sono in fase di monitoraggio o di stressante ciclo di vita.",
  "reports.drilldown.estateOperational.note.lifecycle":
    "\nLe {initiatives} iniziative strategiche rimangono nel registro del programma patrimoniale.",
  "reports.drilldown.estateOperational.note.readiness":
    "\nDisponibilità dell'intervallo {rate} con {constrainedSites} siti vincolati.",
  "reports.drilldown.estateOperational.note.inspection":
    "\n{hours} ore di manodopera registrate nell'attività di consegna operativa corrente.",
  "reports.drilldown.estateOperational.note.approvals":
    "\n{projects} progetto(i) attualmente registrato nel portafoglio immobiliare.",
  "reports.drilldown.estateOperational.note.delivery":
    "\n{count} i segnali aggregati di pressione dell'investimento sono attivi.",
  "reports.drilldown.strategicDecision.note.lifecycle":
    "\n{total} asset totali sono rappresentati nell'attuale base strategica.",
  "reports.drilldown.strategicDecision.note.infrastructure":
    "\n{constrained} siti vincolati e {inspections} ispezioni scadute contribuiscono ancora al rischio infrastrutturale.",
  "reports.drilldown.strategicDecision.note.predictive":
    "Le previsioni {due} sono previste a breve e rappresentano {rate} della base immobiliare.",
  "reports.drilldown.strategicDecision.note.performance":
    "\n{focus} è attualmente la principale area di monitoraggio delle prestazioni, con {mitigationCost} legata all'attività di mitigazione.",
  "reports.drilldown.strategicDecision.note.investment":
    "\n{delayed} approvazioni ritardate e {projects} segnali di pressione di consegna del progetto rimangono attivi.",
  "reports.drilldown.open": "\nApri dettaglio",
  "reports.drilldown.openAria": "\nVisualizza il dettaglio per {label}",
  "reports.drilldown.tableAria": "\nDati dettagliati per {title}",
  "reports.drilldown.consoleEyebrow": "\nConsole di drill-down",
  "reports.drilldown.consoleDescription":
    "\nPassa dalle metriche di riepilogo alle righe operative, ai segnali di concentrazione e ai dettagli pronti all'azione.",
  "reports.drilldown.consoleTitle": "\nConsole di drill-down",
  "reports.custom.sourceAi": "\nNarrazione dell'IA",
  "reports.custom.sourceSystem": "\nRiepilogo basato su regole",
  "reports.custom.provenance.financePlanning": "\nOriginato da Pianificazione finanziaria",
  "reports.custom.provenance.summary":
    "\nDistribuito da {title} per {scope} in un orizzonte di pianificazione di {months}mesi.",
  "reports.custom.templateApplied": "\nModello: {name}",
  "reports.custom.coverageTitle": "\nPunteggio di copertura",
  "reports.custom.coverageDescription": "\nLe sezioni {count} sono incluse in questo pacchetto.",
  "reports.custom.tablePreview":
    "\nVisualizzazione di {visible} di {total} righe nell'anteprima di questa sezione.",
  "reports.custom.guidanceApplied": "\nGuida applicata: {guidance}",
  "reports.custom.narrativeTitle": "\nRiepilogo narrativo",
  "reports.templates.libraryTitle": "\nLibreria modelli",
  "reports.templates.libraryDescription":
    "\nPacchetti di report integrati e salvati che gli operatori possono avviare direttamente nell'area di lavoro del report attivo.",
  "reports.templates.badgeBuiltin": "\nIntegrato",
  "reports.templates.badgeCustom": "\nSalvato",
  "reports.templates.badgeNarrative": "\nNarrativa",
  "reports.templates.badgeDrilldowns": "\nApprofondimenti",
  "reports.templates.run": "\nEsegui pacchetto",
  "reports.templates.runAria": "\nPacchetto Esegui: {name}",
  "reports.templates.saved": "\nModello salvato nella libreria.",
  "utilisation.title": "\nUtilizzo",
  "utilisation.subtitle":
    "\nCockpit di utilizzo aziendale per telemetria, segnali AI e flusso operativo",
  "utilisation.cockpit.chatContext":
    "\nPagina del Cockpit di utilizzo. Spazio di lavoro unificato per stato di utilizzo della flotta, aggiornamento della telemetria, contesto di previsione dell'intelligenza artificiale, arretrato di manutenzione, confronto dei siti, statistiche dei comandi, azioni del copilota dell'intelligenza artificiale, drill-through del flusso di lavoro, classifica del sito, matrice di utilizzo, coda delle azioni, scheda delle tendenze, cronologia e tabella del portfolio ordinabile. Controlli: filtro del sito, intervallo di date, dimensioni della pagina, esportazione CSV e cancellazione filtri.",
  "utilisation.cockpit.hero.eyebrow": "\nCockpit di utilizzo",
  "utilisation.cockpit.hero.title":
    "\nTelemetria, segnali AI e flusso di capacità in un unico spazio di lavoro",
  "utilisation.cockpit.hero.description":
    "\nTieni traccia della pressione del sito, della capacità sottoutilizzata, della telemetria obsoleta e del contesto di manutenzione in un pannello di controllo sull'utilizzo in stile Power BI progettato per il processo decisionale operativo.",
  "utilisation.cockpit.hero.live": "\nAggiorna automaticamente ogni {seconds} secondi",
  "utilisation.cockpit.filters.eyebrow": "\nFiltri",
  "utilisation.cockpit.filters.title": "\nAmbito dell'area di lavoro",
  "utilisation.cockpit.filters.description":
    "Filtra il pannello di controllo per sito e finestra temporale, regola la densità della tabella ed esporta la vista analitica corrente.",
  "utilisation.cockpit.filters.exportDescription":
    "\nEsporta il portafoglio di utilizzo filtrato corrente in formato CSV.",
  "utilisation.cockpit.legend.eyebrow": "\nBande di performance",
  "utilisation.cockpit.legend.title": "\nLeggi le fasce posturali",
  "utilisation.cockpit.legend.description":
    "\nOgni risorsa è classificata in una posizione operativa deterministica, quindi le stesse soglie guidano le carte, l'accodamento e la tabella del portafoglio.",
  "utilisation.cockpit.legend.optimal":
    "\nAsset in esecuzione nella banda di utilizzo preferita con carico bilanciato e copertura telemetrica sana.",
  "utilisation.cockpit.legend.watch":
    "\nAsset che tendono al di fuori dell'intervallo preferito e che vale la pena monitorare prima che si trasformino in punti di pressione.",
  "utilisation.cockpit.legend.under":
    "\nAsset che operano al di sotto della fascia target, indicando capacità inutilizzata o possibile squilibrio della domanda.",
  "utilisation.cockpit.legend.over":
    "\nAsset che operano al di sopra della soglia e che molto probabilmente necessitano di riduzione del carico, ispezione o riallocazione.",
  "utilisation.cockpit.actions.eyebrow": "\nFlussi di lavoro connessi",
  "utilisation.cockpit.actions.title": "\nMantieni il flusso in movimento",
  "utilisation.cockpit.actions.description":
    "\nPassa direttamente dalla modalità di utilizzo ai flussi di lavoro che spiegano o risolvono la pressione sulla capacità.",
  "utilisation.cockpit.actions.predictions":
    "\nEsamina le previsioni dell'intelligenza artificiale e i segnali di vita residua che influiscono sulle risorse calde o instabili.",
  "utilisation.cockpit.actions.tasks":
    "\nEliminare gli arretrati di manutenzione e il lavoro scaduto legati alla pressione di utilizzo.",
  "utilisation.cockpit.actions.reports":
    "\nGenera report pronti per le parti interessate dallo stesso set di dati di utilizzo.",
  "utilisation.filters.title": "\nFiltri portafoglio",
  "utilisation.filters.description":
    "\nApplica insieme le modifiche al sito, alla finestra temporale e alle dimensioni della pagina prima di aggiornare il registro di utilizzo.",
  "utilisation.filters.batchMode": "\nFiltri batch",
  "utilisation.filters.applyHint":
    "\nUtilizza Applica filtri per aggiornare insieme la striscia di riepilogo, il registro e l'ispettore.",
  "utilisation.cockpit.briefing.title": "\nBreve descrizione dell'utilizzo",
  "utilisation.cockpit.briefing.eyebrow": "\nBrief del portfolio",
  "utilisation.cockpit.briefing.headlineDemand":
    "\nLa pressione della domanda si concentra su un insieme limitato di asset",
  "utilisation.cockpit.briefing.headlineCapacity":
    "\nLa capacità inutilizzata è visibile nel portafoglio attuale",
  "utilisation.cockpit.briefing.headlineData":
    "\nL'aggiornamento della telemetria limita l'immagine di utilizzo",
  "utilisation.cockpit.briefing.headlineBalanced":
    "\nLa posizione di utilizzo è sostanzialmente bilanciata nell'ambito attuale",
  "utilisation.cockpit.briefing.summary":
    "\nPer {site} oltre {period}, l'utilizzo medio della flotta è {average}. La telemetria attualmente copre le risorse {telemetry}, con {over} in esaurimento e {under} che mostra capacità inutilizzata.",
  "utilisation.cockpit.briefing.recommendationTitle": "\nMossa successiva consigliata",
  "utilisation.cockpit.briefing.recommendationPortfolio":
    "Nessuna singola risorsa domina la coda in questo momento. Mantieni aggiornata la telemetria su {site} e concentrati sul mantenimento di una copertura bilanciata.",
  "utilisation.cockpit.briefing.recommendationAsset":
    '\nDai priorità a {asset} successivo. Attualmente è il candidato più valido per "{action}" in base alla modalità di utilizzo, al contesto del segnale AI e al backlog di lavoro attivo.',
  "utilisation.cockpit.generatedAt": "\nGenerato {date}",
  "utilisation.cockpit.datasets.title": "\nCopertura del set di dati",
  "utilisation.cockpit.datasets.description":
    "\nLa cabina di pilotaggio combina telemetria, contesto di previsione dell'intelligenza artificiale e segnali di esecuzione del lavoro in un'unica superficie decisionale.",
  "utilisation.cockpit.datasets.assetsTitle": "\nAsset nell'ambito",
  "utilisation.cockpit.datasets.assetsDescription":
    "\n{sites} siti rappresentati nell'attuale portafoglio filtrato",
  "utilisation.cockpit.datasets.telemetryTitle": "\nLetture telemetriche",
  "utilisation.cockpit.datasets.telemetryDescription":
    "\n{count} asset con telemetria nel periodo selezionato",
  "utilisation.cockpit.datasets.aiTitle": "\nSegnali supportati dall'intelligenza artificiale",
  "utilisation.cockpit.datasets.aiDescription":
    "\n{due} risorse con scadenza imminente in base alla previsione della vita rimanente",
  "utilisation.cockpit.datasets.tasksTitle": "\nApri elementi di lavoro",
  "utilisation.cockpit.datasets.tasksDescription":
    "\n{overdue} le attività scadute stanno attualmente influenzando il flusso di capacità",
  "utilisation.cockpit.command.coverageTitle": "\nCopertura telemetrica",
  "utilisation.cockpit.command.coverageDescription":
    "\n{covered} coperto • {blind} punti ciechi • {stale} feed obsoleti",
  "utilisation.cockpit.command.aiTitle": "\nCopertura AI",
  "utilisation.cockpit.command.aiDescription":
    "\n{signals} asset con segnali AI • {due} con scadenza a breve",
  "utilisation.cockpit.command.pressureTitle": "\nRisorse di pressione",
  "utilisation.cockpit.command.pressureDescription":
    "\n{hot} caldo • {under} sottoutilizzato • {stale} stantio",
  "utilisation.cockpit.command.documentsTitle": "\nApri flusso di documenti",
  "utilisation.cockpit.command.documentsDescription":
    "\n{workOrders} ordini di lavoro e {documents} documenti collegati totali rimangono attivi.",
  "utilisation.cockpit.kpi.averageTitle": "\nMedia flotta",
  "utilisation.cockpit.kpi.averageDescription":
    "\nUtilizzo medio del portafoglio filtrato, normalizzato in una scala operativa da 0 a 100.",
  "utilisation.cockpit.kpi.optimalTitle": "\nAsset ottimali",
  "utilisation.cockpit.kpi.optimalDescription":
    "\nBeni operanti all'interno della fascia di utilizzo preferenziale.",
  "utilisation.cockpit.kpi.warningTitle": "\nAsset della lista di controllo",
  "utilisation.cockpit.kpi.warningDescription":
    "\n{under} sottoutilizzato e {watch} fuori dalla banda preferita ma non ancora critico.",
  "utilisation.cockpit.kpi.criticalTitle": "\nAttenzione critica",
  "utilisation.cockpit.kpi.criticalDescription":
    "\n{over} in esaurimento e {stale} con telemetria mancante o non aggiornata.",
  "utilisation.inspector.summary.pressureBadge": "\n{count} eccezioni in tempo reale",
  "utilisation.inspector.summary.telemetryBadge": "\n{count} eccezioni telemetria",
  "utilisation.inspector.summary.averageHint":
    "\nMedia attuale del portafoglio nell'ambito di utilizzo filtrato.",
  "utilisation.inspector.summary.exceptionTitle": "\nEccezioni",
  "utilisation.inspector.summary.exceptionHint":
    "\nSono attivi asset di telemetria {over} sovraccarichi, {under} sottoutilizzati e {stale} obsoleti.",
  "utilisation.inspector.summary.coverageHint":
    "\n{blind} punti ciechi e {stale} feed obsoleti limitano ancora la fiducia.",
  "utilisation.cockpit.posture.optimal": "\nOttimale",
  "utilisation.cockpit.posture.watch": "\nGuarda",
  "utilisation.cockpit.posture.under": "\nSottoutilizzato",
  "utilisation.cockpit.posture.over": "\nSovraccarico",
  "utilisation.cockpit.site.title": "\nClassifica sito",
  "utilisation.cockpit.site.description":
    "\nConfronta la postura del sito in base all'utilizzo medio, alla copertura telemetrica in tempo reale e al mix di pressione.",
  "utilisation.cockpit.site.empty":
    "Nessun dato sulle prestazioni del sito disponibile per i filtri correnti.",
  "utilisation.cockpit.site.meta": "\n{assets} asset • {telemetry} con telemetria",
  "utilisation.cockpit.site.share": "\n{share} di risorse visibili",
  "utilisation.cockpit.site.over": "\n{count} caldo",
  "utilisation.cockpit.site.under": "\n{count} sottoutilizzato",
  "utilisation.cockpit.site.watch": "\n{count} orologio",
  "utilisation.cockpit.site.optimal": "\n{count} ottimale",
  "utilisation.cockpit.queue.title": "\nCoda di azioni",
  "utilisation.cockpit.queue.description":
    "\nRisorse classificate in base a pressione, aggiornamento della telemetria, gravità del segnale AI e lavoro operativo irrisolto.",
  "utilisation.cockpit.queue.empty":
    "\nNessun elemento della coda di azioni di utilizzo è attivo al momento.",
  "utilisation.cockpit.queue.current": "\nCorrente {current} • Media {average}",
  "utilisation.cockpit.queue.tasks": "\n{open} attività aperte • {overdue} scadute",
  "utilisation.cockpit.queue.lifeUnknown":
    "\nA questa risorsa non è allegata alcuna previsione sulla vita residua.",
  "utilisation.cockpit.queue.lifeValue": "\n{days} giorni di vita rimanenti",
  "utilisation.cockpit.queue.telemetryMissing":
    "\nAl momento non è disponibile la telemetria in tempo reale.",
  "utilisation.cockpit.queue.telemetryFresh": "\nUltima telemetria {date}",
  "utilisation.cockpit.mix.title": "\nMix di posture",
  "utilisation.cockpit.mix.description":
    "\nScopri come si distribuisce il portafoglio di asset visibili nelle fasce di postura operativa.",
  "utilisation.cockpit.mix.empty":
    "\nPer il portafoglio attuale non è disponibile alcun mix di posture.",
  "utilisation.cockpit.mix.assetCount": "\n{count} risorse",
  "utilisation.cockpit.mix.average": "\nMedio {value}",
  "utilisation.cockpit.matrix.title": "\nMatrice di utilizzo",
  "utilisation.cockpit.matrix.description":
    "\nUna griglia di focus equilibrata tra asset sovraccarichi, sottoutilizzati, monitorati e ottimali classificati in base alla rilevanza operativa.",
  "utilisation.cockpit.matrix.empty":
    "\nNon sono disponibili asset della matrice di utilizzo per i filtri correnti.",
  "utilisation.cockpit.matrix.average": "\nMedio {value}",
  "utilisation.cockpit.copilot.title": "\nCopilota AI",
  "utilisation.cockpit.copilot.description":
    "\nTrasforma l'ambito attuale in un brief esecutivo, una revisione della fiducia dei dati o un piano di intervento senza lasciare la cabina di pilotaggio.",
  "utilisation.cockpit.copilot.focus": "\nFocus attuale",
  "utilisation.cockpit.copilot.brief": "\nScrivi il brief",
  "utilisation.cockpit.copilot.briefPrompt":
    "\nScrivi un brief sull'utilizzo esecutivo per {site} su {period}. Evidenzia l'utilizzo medio {average}, {over} asset sovraccarichi, {under} asset sottoutilizzati e {stale} feed di telemetria obsoleti. Consiglia le prossime azioni operative.",
  "utilisation.cockpit.copilot.data": "\nVerifica attendibilità dei dati",
  "utilisation.cockpit.copilot.dataPrompt":
    "\nValutare la qualità dei dati per l'utilizzo corrente dell'area di lavoro. Sono presenti risorse {covered} con telemetria, {blind} senza telemetria e feed {stale} non aggiornati. Spiega quanta fiducia gli operatori dovrebbero riporre in questa cabina di pilotaggio e quali lacune nei dati correggere prima.",
  "utilisation.cockpit.copilot.intervention": "\nBozza piano di intervento",
  "utilisation.cockpit.copilot.interventionPromptAsset":
    "Redigere un piano di intervento per l'asset {asset} presso {site}. L'utilizzo attuale è {current}, la media è {average}, la postura è {posture}, l'azione consigliata è {action}, ci sono {open} attività aperte e {overdue} attività scadute e la vita rimanente è {life}.",
  "utilisation.cockpit.copilot.interventionPromptPortfolio":
    "\nRedigere un piano di intervento a livello di portafoglio per {site} su {period}. Concentrati sulle risorse di telemetria sovraccariche, sottoutilizzate e obsolete e sequenzia le azioni successive.",
  "utilisation.cockpit.workflow.title": "\nFollow-through trasversale al sistema",
  "utilisation.cockpit.workflow.description":
    "\nPassare dalla postura di utilizzo ai sistemi che spiegano i rischi, chiariscono il lavoro o raccolgono la storia per le parti interessate.",
  "utilisation.cockpit.workflow.predictionsMeta":
    "\n{signals} risorse supportate da segnali • {due} con scadenza a breve",
  "utilisation.cockpit.workflow.tasksMeta": "\n{open} attività aperte • {overdue} scadute",
  "utilisation.cockpit.workflow.reportsMeta":
    "\n{blind} angoli ciechi telemetria • {documents} documenti aperti",
  "utilisation.cockpit.workflow.fleetMeta":
    "\n{vehicles} asset in movimento • {backlog} attività aperte",
  "utilisation.cockpit.workflow.sensorsMeta":
    "\n{blind} punti ciechi della telemetria • {stale} feed obsoleti",
  "utilisation.cockpit.workflow.buildingsMeta":
    "\n{sites} siti attivi • {signals} Risorse supportate dall'intelligenza artificiale",
  "utilisation.cockpit.trend.title": "\nScheda tendenze",
  "utilisation.cockpit.trend.description":
    "\nI punti di tendenza dell'utilizzo quotidiano aiutano gli operatori a individuare la deriva, la volatilità e la densità di campionamento nel tempo.",
  "utilisation.cockpit.trend.empty":
    "\nNessun punto di trend di utilizzo disponibile per la finestra temporale corrente.",
  "utilisation.cockpit.trend.samples": "\n{count} campioni di telemetria",
  "utilisation.cockpit.trend.low": "\nBasso {value}",
  "utilisation.cockpit.trend.high": "\nAlto {value}",
  "utilisation.cockpit.chronology.title": "\nCronologia utilizzo",
  "utilisation.cockpit.chronology.description":
    "\nGli eventi di telemetria recenti forniscono un rapido audit trail di come è stata osservata la postura attuale.",
  "utilisation.cockpit.chronology.empty":
    "\nNon è disponibile alcuna cronologia di telemetria per l'ambito del filtro corrente.",
  "utilisation.cockpit.chronology.value": "\nOsservato {value}",
  "utilisation.cockpit.table.title": "\nPortafoglio di utilizzo",
  "utilisation.cockpit.table.description":
    "\nVisualizzazione ordinabile del portafoglio che combina l'utilizzo corrente, la direzione del trend, il contesto del segnale AI e la pressione della coda.",
  "utilisation.cockpit.table.live": "\nTavolo dal vivo",
  "utilisation.cockpit.table.asset": "\nRisorsa",
  "utilisation.cockpit.table.current": "\nAttuale",
  "utilisation.cockpit.table.trend": "\nTendenza",
  "utilisation.cockpit.table.signal": "\nSegnale",
  "utilisation.cockpit.table.queue": "\nCoda",
  "utilisation.cockpit.table.average": "\nMedia {value}",
  "utilisation.cockpit.table.trendValue": "Tendenza {direction} {value}",
  "utilisation.cockpit.table.trendUp": "\nSu",
  "utilisation.cockpit.table.trendDown": "\nGiù",
  "utilisation.cockpit.table.trendFlat": "\nPiatto",
  "utilisation.cockpit.table.tasksValue": "\n{count} attività aperte",
  "utilisation.cockpit.table.queueValue":
    "\n{overdue} scaduto • {workOrders} ordini di lavoro • {documents} documenti",
  "utilisation.cockpit.table.empty":
    "\nNon sono disponibili dati sull'utilizzo per i filtri selezionati. Collega la telemetria o amplia la finestra temporale per popolare il portafoglio.",
  "utilisation.cockpit.table.emptyAction": "\nVisualizza risorse",
  "utilisation.inspector.title": "\nInterpretazione selezionata",
  "utilisation.inspector.subtitle":
    "Esamina la risorsa attiva, le sue eccezioni attuali e la successiva azione di reporting da un ispettore.",
  "utilisation.inspector.emptyTitle": "\nSeleziona una risorsa",
  "utilisation.inspector.emptyDescription":
    "\nScegli una riga di registro per esaminare lo stato di utilizzo, i motivi dell'eccezione e le azioni di reporting.",
  "utilisation.inspector.generatedLabel": "\nAggiornamento ispettore",
  "utilisation.inspector.assetSubtitle": "{site} • {type} • {condition} • {lifecycle}",
  "utilisation.inspector.stats.signalHint":
    "\n{tasks} attività aperte e {workOrders} ordini di lavoro attivi contribuiscono al consiglio corrente.",
  "utilisation.inspector.reasonsTitle": "\nMotivi dell'eccezione",
  "utilisation.inspector.aiPrompt":
    "\nRiepiloga la situazione di utilizzo per {asset} in {site}. L'utilizzo attuale è {current}, l'utilizzo medio è {average} e l'azione consigliata attuale è {action}. Spiegare le probabili cause, il rischio operativo e la prossima azione di reporting.",
  "utilisation.inspector.tableSubtitle":
    "\nUtilizzare il registro come superficie di analisi primaria; seleziona una riga per aggiornare il pannello di interpretazione di destra.",
  "utilisation.inspector.tableBadge": "\nRegistro dominante",
  "utilisation.inspector.interpretation.noTelemetry":
    "\n{asset} in {site} non può essere considerato affidabile dal punto di vista operativo perché non sono presenti dati di telemetria correnti che alimentano la vista di utilizzo.",
  "utilisation.inspector.interpretation.staleTelemetry":
    "\n{asset} mostra {current} utilizzo corrente rispetto a una media di {average}, ma il feed è obsoleto e necessita della conferma della telemetria prima che gli operatori agiscano.",
  "utilisation.inspector.interpretation.overloaded":
    "\n{asset} funziona al di sopra della banda preferita con un utilizzo corrente di {current} rispetto a una media di {average}. La riduzione della domanda o la ridistribuzione del carico di lavoro dovrebbero essere esaminate successivamente.",
  "utilisation.inspector.interpretation.underused":
    "\n{asset} è al di sotto della banda preferita con un utilizzo corrente di {current} rispetto a una media di {average}. Potrebbe essere disponibile capacità di riserva per la ridistribuzione.",
  "utilisation.inspector.interpretation.watch":
    "\n{asset} è al di fuori della banda bilanciata con un utilizzo corrente di {current} rispetto a una media di {average}. Mantieni la coda sotto controllo prima che l'eccezione venga rafforzata.",
  "utilisation.inspector.interpretation.balanced":
    "\n{asset} è attualmente bilanciato a {current} utilizzo corrente rispetto a una media di {average}, senza alcuna eccezione dominante che richieda un'escalation immediata.",
  "utilisation.inspector.reason.noTelemetry":
    "Manca la telemetria in tempo reale, quindi la situazione di utilizzo è attualmente dedotta dal contesto operativo parziale.",
  "utilisation.inspector.reason.staleTelemetry":
    "\nL'aggiornamento della telemetria è ridotto, pertanto è necessario confermare l'ultima lettura dell'utilizzo.",
  "utilisation.inspector.reason.overloaded":
    "\nL'utilizzo è superiore alla banda operativa preferita e potrebbe richiedere una riduzione della domanda.",
  "utilisation.inspector.reason.underused":
    "\nL'utilizzo è inferiore alla fascia operativa preferita e potrebbe indicare capacità inutilizzata.",
  "utilisation.inspector.reason.watch":
    "\nL'utilizzo è al di fuori della fascia di equilibrio e dovrebbe rimanere nella watchlist.",
  "utilisation.inspector.reason.remainingLife":
    "\nLa postura della vita rimanente dell'IA è scesa a {days} giorni e dovrebbe essere presa in considerazione nelle azioni successive.",
  "utilisation.inspector.reason.overdueTasks":
    "\n{count} attività di manutenzione scadute sono ancora aperte per questa risorsa.",
  "utilisation.inspector.reason.workOrders":
    "\n{count} ordini di lavoro attivi sono già collegati a questa risorsa.",
  "utilisation.inspector.reason.documents":
    "\nI documenti collegati {count} rimangono aperti nel flusso di lavoro commerciale.",
  "utilisation.inspector.reason.none":
    "\nNessuna eccezione dominante è attiva oltre la condizione di utilizzo corrente.",
  "utilisation.cockpit.csv.asset": "\nRisorsa",
  "utilisation.cockpit.csv.site": "\nSito",
  "utilisation.cockpit.csv.type": "\nTipo",
  "utilisation.cockpit.csv.condition": "\nCondizione",
  "utilisation.cockpit.csv.lifecycle": "\nCiclo di vita",
  "utilisation.cockpit.csv.current": "\nUtilizzo attuale",
  "utilisation.cockpit.csv.average": "\nUtilizzo medio",
  "utilisation.cockpit.csv.trend": "\nDelta tendenza",
  "utilisation.cockpit.csv.posture": "\nPostura",
  "utilisation.cockpit.csv.latestTelemetry": "\nUltima telemetria",
  "utilisation.cockpit.csv.telemetrySamples": "\nCampioni di telemetria",
  "utilisation.cockpit.csv.severity": "\nGravità IA",
  "utilisation.cockpit.csv.confidence": "\nFiducia nell'IA",
  "utilisation.cockpit.csv.remainingLifeDays": "\nGiorni di vita rimanenti",
  "utilisation.cockpit.csv.openTasks": "\nAttività aperte",
  "utilisation.cockpit.csv.overdueTasks": "\nAttività scadute",
  "utilisation.cockpit.csv.activeWorkOrders": "\nOrdini di lavoro attivi",
  "utilisation.cockpit.csv.openDocuments": "\nApri documenti",
  "utilisation.cockpit.csv.recommendedAction": "\nAzione consigliata",
  "utilisation.cockpit.action.connectData": "\nConnetti telemetria",
  "utilisation.cockpit.action.refreshTelemetry": "\nAggiorna telemetria",
  "utilisation.cockpit.action.inspectAsset": "\nIspeziona risorsa",
  "utilisation.cockpit.action.relieveDemand": "\nAlleviare la domanda",
  "utilisation.cockpit.action.clearBacklog": "\nCancella arretrato",
  "utilisation.cockpit.action.redeployCapacity": "\nRidistribuisci capacità",
  "utilisation.cockpit.action.coordinateWorkOrders": "\nCoordinare gli ordini di lavoro",
  "utilisation.cockpit.action.alignDocuments": "\nAllinea flusso di documenti",
  "utilisation.cockpit.action.monitorFlow": "\nMonitorare il flusso",
  "admin.title": "\nCentro di controllo amministratore",
  "admin.subtitle":
    "\nSpazio di lavoro aziendale per identità, posizioni, intelligenza artificiale, integrazioni aziendali, sicurezza e governance",
  "admin.audit.at": "\nAlle",
  "admin.audit.timestamp": "\nTimestamp",
  "admin.audit.actor": "\nAttore",
  "admin.audit.action": "\nAzione",
  "admin.audit.entity": "\nEntità",
  "admin.system.users": "\nUtenti",
  "admin.system.assets": "\nRisorse",
  "admin.system.tasks": "\nCompiti",
  "admin.system.predictions": "\nPronostici",
  "admin.system.registeredRoutes": "\nPercorsi registrati",
  "admin.system.apiRoutes": "\nPercorsi API",
  "admin.system.htmlRoutes": "\nPercorsi HTML",
  "admin.system.staticRoutes": "\nPercorsi statici",
  "admin.system.authRoutes": "\nPercorsi di autenticazione",
  "admin.system.databaseConfigured": "\nDatabase configurato",
  "admin.system.selfHostedAssets": "\nRisorse ospitate autonomamente",
  "utilisation.chart.metaTitle": "\nPannello trend e riepilogo",
  "utilisation.chart.summaryLabel": "\nUltimo utilizzo aggregato nelle 24 ore.",
  "utilisation.chart.avgMinMax": "\nMedio {avg}%, Min {min}%, Max {max}%",
  "finance.depreciation.summary.title": "\nEsposizione alla svalutazione",
  "finance.depreciation.summary.description":
    "\nValutazione combinata standard e corretta per l'intelligenza artificiale",
  "finance.depreciation.summary.totalAssetsDescription": "\nPatrimonio totale: {count}",
  "finance.depreciation.summary.adjustmentHint": "\nFattori di aggiustamento AI applicati",
  "finance.depreciation.summary.severityCount": "\n{critical} critico, {warning} avviso",
  "finance.depreciation.summary.delta": "\nDelta valutazione AI",
  "finance.depreciation.summary.deltaDescription":
    "\n{amount} scostamento dal valore contabile di riferimento",
  "finance.depreciation.summary.highRiskExposure": "\nEsposizione ad alto rischio",
  "finance.depreciation.summary.highRiskExposureDescription":
    "\n{count} asset in condizioni critiche o affaticanti",
  "finance.depreciation.summary.adjustmentRate": "\nTasso di aggiustamento {rate}",
  "finance.depreciation.mix.assetCount": "\n{count} risorse",
  "finance.depreciation.conditionMix.title": "\nConcentrazione condizionale",
  "finance.depreciation.conditionMix.description":
    "Esposizione al valore contabile raggruppata per condizione attuale delle attività.",
  "finance.depreciation.typeMix.title": "\nDigita concentrazione",
  "finance.depreciation.typeMix.description":
    "\nLe classi di asset di maggior valore determinano l'attuale situazione di deprezzamento.",
  "finance.depreciation.topAssets.title": "\nAsset prioritari",
  "finance.depreciation.topAssets.description":
    "\nBeni di valore più elevato con il maggiore impatto di ammortamento.",
  "finance.depreciation.topAssets.empty": "\nNessuna risorsa",
  "finance.depreciation.topAssets.aiAdjusted": "\nRettificato dall'IA",
  "finance.depreciation.table.title": "\nTabella ammortamento",
  "finance.depreciation.table.description":
    "\nValore contabile standard rispetto all'esposizione corretta per l'intelligenza artificiale, allo stato delle condizioni e al segnale di rischio in tempo reale.",
  "finance.depreciation.table.site": "\nSito",
  "finance.depreciation.table.type": "\nTipo",
  "finance.depreciation.table.condition": "\nCondizione",
  "finance.depreciation.table.signal": "\nSegnale",
  "finance.depreciation.table.aiAdjusted": "\nAI modificato",
  "finance.depreciation.table.variance": "\nVarianza",
  "finance.depreciation.stage.acquisition": "\nAcquisizione",
  "finance.depreciation.stage.activeService": "\nServizio attivo",
  "finance.depreciation.stage.midLife": "\nMeta vita",
  "finance.depreciation.stage.endOfLife": "\nFine vita",
  "finance.depreciation.stage.disposal": "\nSmaltimento",
  "finance.depreciation.stage.lifecycleLabel": "\nFasi del ciclo di vita dell'asset",
  "finance.period.currentQuarter": "\nTrimestre corrente",
  "finance.period.lastQuarter": "\nUltimo trimestre",
  "finance.period.ytd": "\nAnno ad oggi",
  "finance.period.all": "\nTutti i tempi",
  "finance.tab.overview": "\nPanoramica",
  "finance.tab.depreciation": "\nAnalisi dell'ammortamento",
  "finance.tab.costAnalysis": "\nCosto e valutazione",
  "finance.overview.portfolioValue": "\nValore del portafoglio",
  "finance.overview.portfolioDescription": "\nValore contabile totale di tutti gli asset",
  "finance.overview.aiExposure": "\nEsposizione regolata dall'intelligenza artificiale",
  "finance.overview.aiExposureDescription": "\nValutazione corretta per il rischio",
  "finance.overview.depreciationRate": "\nTasso di aggiustamento",
  "finance.overview.depreciationRateDescription":
    "\nMoltiplicatore di ammortamento basato sull'intelligenza artificiale",
  "finance.overview.assetCount": "\nRisorse monitorate",
  "finance.overview.assetCountDescription": "\nTotale patrimonio in gestione",
  "finance.overview.byDepMethod": "\nPer metodo di ammortamento",
  "finance.overview.byCondition": "\nPer condizione",
  "finance.depMethod.STRAIGHT_LINE": "\nLinea retta",
  "finance.depMethod.DECLINING_BALANCE": "\nSaldo in calo",
  "finance.depMethod.UNITS_OF_PRODUCTION": "\nUnità di produzione",
  "finance.depMethod.AI_ADJUSTED": "\nAI modificato",
  "finance.costAnalysis.purchaseVsBook": "\nAcquisto rispetto al valore contabile",
  "finance.costAnalysis.totalPurchasePrice": "\nPrezzo di acquisto totale",
  "finance.costAnalysis.totalBookValue": "\nValore contabile corrente",
  "finance.costAnalysis.totalDepreciation": "\nAmmortamento totale",
  "finance.costAnalysis.totalDepreciationDescription": "\nAmmortamento totale: {amount}",
  "finance.costAnalysis.depreciationPercent": "\nAmmortamento %",
  "finance.costAnalysis.topDepreciating": "\nPrincipali beni in deprezzamento",
  "finance.costAnalysis.topDepreciatingEmpty":
    "\nNessun dato sull'ammortamento disponibile per i filtri selezionati.",
  "finance.costAnalysis.byLifecycle": "\nPer fase del ciclo di vita",
  "finance.costAnalysis.avgAge": "\nEtà media delle risorse",
  "finance.costAnalysis.avgAgeDescription": "\nDalla data di acquisto ad oggi",
  "finance.costAnalysis.days": "\n{count} giorni",
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
  "reports.tab.financial": "\nFinanziario",
  "reports.tab.operations": "\nOperazioni",
  "reports.tab.executive": "\nDirigente",
  "reports.summary.totalReports": "\nRapporti disponibili",
  "reports.summary.totalReportsDesc": "\nIn tutte le categorie",
  "reports.summary.criticalPredictions": "\nPrevisioni critiche",
  "reports.summary.criticalPredictionsDesc": "\nInfluenza sulle valutazioni degli asset",
  "reports.summary.totalBookValue": "\nValore contabile totale",
  "reports.summary.totalBookValueDesc": "\nValutazione attuale del portafoglio",
  "reports.summary.assetCount": "\nRisorse monitorate",
  "reports.summary.assetCountDesc": "\nIn gestione attiva",
  "admin.system.online": "\nSistema in linea",
  "admin.aiSettings.title": "\nFornitore IA",
  "admin.aiSettings.subtitle":
    "\nImposta il provider attivo, lo stato della chiave di runtime e l'identificatore del modello.",
  "admin.aiSettings.provider": "\nFornitore",
  "admin.aiSettings.apiKey": "\nChiave API",
  "admin.aiSettings.apiKeyPlaceholder": "\nLascia vuoto per mantenere la chiave corrente",
  "admin.aiSettings.model": "\nModello",
  "admin.aiSettings.modelPlaceholder": "\nInserisci l'ID modello specifico del fornitore",
  "admin.aiSettings.save": "\nSalva impostazioni",
  "admin.aiSettings.saved": "\nImpostazioni salvate e applicate alle nuove richieste AI.",
  "admin.aiSettings.current": "\nValore di esecuzione corrente",
  "admin.aiSettings.currentProvider": "\nFornitore attuale",
  "admin.aiSettings.currentModel": "\nModello attuale",
  "admin.aiSettings.currentSource": "\nSorgente attuale",
  "admin.aiSettings.providerPlaceholder": "\nSeleziona fornitore",
  "admin.aiSettings.notConfigured": "\nNon configurato",
  "admin.aiSettings.apiKeyConfigured": "\nConfigurato",
  "admin.aiSettings.source.environment": "\nImpostazioni predefinite dell'ambiente",
  "admin.aiSettings.source.systemConfig": "\nConfigurazione del sistema",
  "admin.aiSettings.validation.providerRequired": "\nSeleziona un fornitore AI valido.",
  "admin.aiSettings.validation.modelRequired": "\nL'identificatore del modello è obbligatorio.",
  "admin.aiSettings.saveFailed": "\nImpossibile salvare le impostazioni .bao in questo momento.",
  "admin.aiSettings.systemConfigDescription":
    "\nImpostazioni di runtime AI persistenti applicate alle nuove richieste AI.",
  "admin.aiSettings.airgappedHint":
    "\nLe distribuzioni con airgapping consentono solo fornitori di IA locali come RamaLama o Ollama.",
  "admin.aiSettings.airgappedCurrentProviderBlocked":
    "Il fornitore persistente è al di fuori della politica di airgapped. Seleziona un provider locale per salvare un'impostazione di runtime conforme.",
  "admin.aiSettings.envNote":
    "\nLa configurazione del sistema sovrascrive le impostazioni predefinite dell'ambiente per le nuove richieste AI. Imposta AI_BASE_URL nell'ambiente solo quando hai bisogno di un endpoint del provider personalizzato.",
  "admin.section.overview": "\nPanoramica",
  "admin.section.overviewDescription":
    "\nMonitora identità, dipendenza dalla piattaforma, runtime AI e comportamento di governance da un unico piano di controllo.",
  "admin.section.users": "\nGestione utenti",
  "admin.section.usersDescription":
    "\nIspeziona, modifica e regola l'accesso, le sessioni e le preferenze dell'operatore.",
  "admin.section.branding": "Branding",
  "admin.section.brandingDescription":
    "Manage default and party-owned brands, domain mappings, metadata, and runtime theme tokens.",
  "admin.section.locations": "\nPosizioni e bordi",
  "admin.section.locationsDescription":
    "\nGestisci i siti, l'impronta operativa e la copertura dei dispositivi in tutta l'azienda.",
  "admin.section.ai": "\nOperazioni IA",
  "admin.section.aiDescription":
    "\nControlla la configurazione del runtime e tracciala fino ai set di dati che alimentano la piattaforma.",
  "admin.section.integrations": "\nIntegrazioni aziendali",
  "admin.section.integrationsDescription":
    "\nRegistrare i sistemi relativi alle risorse umane, alla finanza, agli appalti e ai documenti che rimangono i sistemi di registrazione esterni.",
  "admin.section.security": "\nAtteggiamento di sicurezza",
  "admin.section.securityDescription":
    "\nEsamina l'accesso basato sui ruoli, l'attività di controllo e il comportamento dei limiti di archiviazione da un unico spazio di lavoro.",
  "admin.section.governance": "\nGovernance",
  "admin.section.governanceDescription":
    "\nCerca, esporta e analizza eventi amministrativi e di autenticazione.",
  "admin.nav.metricDatabaseOnline": "\nBanca dati online",
  "admin.nav.metricDatabaseOffline": "\nDatabase offline",
  "admin.nav.metricUnavailable": "\nNon disponibile",
  "admin.nav.usersMetric": "\n{count} utenti • {sessions} sessioni live",
  "admin.nav.brandingMetric": "{count} brands managed",
  "admin.nav.locationsMetric": "\n{count} siti • {devices} dispositivi",
  "admin.nav.aiMetric": "Fornitore: {provider} • Modello: {model}",
  "admin.nav.integrationsMetric": "\n{count} impianti configurati",
  "admin.nav.securityMetric": "\n{privileged} privilegiato • {events} eventi",
  "admin.nav.governanceMetric": "\n{count} eventi recenti",
  "admin.controlCenter.kicker": "\nAmministrazione aziendale",
  "admin.controlCenter.description":
    "\nPassa dalla situazione immobiliare ai dettagli relativi a utente, posizione, intelligenza artificiale, integrazione, sicurezza e governance senza lasciare il centro di controllo.",
  "admin.summary.activeWorkspace": "\nArea di lavoro attiva",
  "admin.summary.aiRuntime": "\nRuntime AI",
  "admin.summary.userSessions": "\nSessioni dal vivo",
  "admin.summary.userSessionsHint": "\nSessioni operatore simultanee attive in questo momento",
  "admin.copilot.title": "\nCopilota amministratore",
  "admin.copilot.description":
    "\nAvvia un'indagine, modifica il piano o un brief per l'operatore in chat utilizzando il contesto dell'area di lavoro corrente.",
  "admin.launchpads.title": "\nLaunchpad dell'area di lavoro",
  "admin.launchpads.description":
    "\nEntra direttamente negli spazi di lavoro che possiedono accesso, runtime, integrazioni e comportamento di audit, con metriche in tempo reale trasportate in ogni corsia.",
  "admin.launchpads.metricTitle": "\nPostura attuale",
  "admin.launchpads.openWorkspace": "\nApri spazio di lavoro",
  "admin.navigation.title": "\nCentro di controllo",
  "admin.navigation.description":
    "Aree di lavoro di amministrazione con collegamenti profondi per identità, integrazioni, sicurezza e dipendenze operative.",
  "admin.overview.managedUsers": "\nUtenti gestiti",
  "admin.overview.managedUsersHint": "\nRecord di identità e accesso attualmente nell'ambito",
  "admin.overview.verifiedIdentities": "\nIdentità verificate",
  "admin.overview.verifiedIdentitiesHint": "\nLe {count} identità devono ancora essere verificate",
  "admin.overview.edgeFootprint": "\nImpronta del bordo",
  "admin.overview.edgeFootprintHint": "\n{count} siti attivi collegati all'azienda",
  "admin.overview.auditWindow": "\nGovernance 24 ore su 24",
  "admin.overview.auditWindowHint":
    "\nAttività recenti di autenticazione e modifica nel centro di controllo",
  "admin.overview.datasetLedger": "\nRegistro dei set di dati AI",
  "admin.overview.datasetLedgerDescription":
    "\nSet di dati operativi che alimentano previsioni, flusso di annotazioni e reporting.",
  "admin.overview.predictions": "\nPronostici",
  "admin.overview.annotations": "\nAnnotazioni",
  "admin.overview.savedReports": "\nRapporti salvati",
  "admin.overview.copilotDescription":
    "\nUtilizza l'intelligenza artificiale per riepilogare la postura, le anomalie della superficie o generare un trasferimento dell'operatore dallo stato attuale del centro di controllo.",
  "admin.users.stats.total": "\nDimensione della directory",
  "admin.users.stats.totalHint": "\nUtenti che corrispondono ai filtri della directory corrente",
  "admin.users.stats.active": "\nAttivo",
  "admin.users.stats.activeHint":
    "\nUtenti con sessioni dal vivo e nessun segnale di attenzione aperta",
  "admin.users.stats.attention": "\nHa bisogno di attenzione",
  "admin.users.stats.attentionHint":
    "\nUtenti con rischi di verifica, preferenza o comportamento della sessione",
  "admin.users.stats.inactive": "\nInattivo",
  "admin.users.stats.inactiveHint": "\nUtenti senza sessioni attive nel set di risultati corrente",
  "admin.users.detailTitle": "\nDirectory utente",
  "admin.users.detailDescription":
    "\nSeleziona un operatore per controllare accesso, sessioni, preferenze e cronologia recente della governance.",
  "admin.users.searchLabel": "\nCerca utenti",
  "admin.users.searchPlaceholder": "\nCerca per nome o email",
  "admin.users.roleFilterLabel": "\nRuolo",
  "admin.users.roleAll": "\nTutti i ruoli",
  "admin.users.activityFilterLabel": "\nAttività",
  "admin.users.activityAll": "\nTutte le attività",
  "admin.users.applyFilters": "\nApplica filtri",
  "admin.users.table.person": "\nPersona",
  "admin.users.table.access": "\nAccesso",
  "admin.users.table.sessions": "\nSessioni",
  "admin.users.table.preferences": "\nPreferenze",
  "admin.users.table.signal": "\nSegnale",
  "admin.users.activeSessionCount": "\n{count} sessioni attive",
  "admin.users.lastSeenNever": "\nNessuna attività di sessione recente",
  "admin.users.chatEnabled": "\nChat abilitata",
  "admin.users.chatDisabled": "\nChat disabilitata",
  "admin.users.notificationsEnabled": "\nNotifiche abilitate",
  "admin.users.notificationsDisabled": "\nNotifiche disattivate",
  "admin.users.empty": "\nNessun utente corrisponde ai filtri attuali.",
  "admin.users.returnOverview": "\nTorna alla panoramica",
  "admin.users.selectPrompt": "\nSeleziona un utente per aprire il riquadro dei dettagli.",
  "admin.users.detail.activeSessions": "\nSessioni attive",
  "admin.users.detail.activeSessionsHint": "\nIn {count} sessioni totali",
  "admin.users.detail.assignedTasks": "\nCompiti assegnati",
  "admin.users.detail.assignedTasksHint":
    "\nLavoro attuale di proprietà dell'operatore selezionato",
  "admin.users.detail.approvals": "\nApprovazioni documenti",
  "admin.users.detail.approvalsHint":
    "\nOrdini di lavoro approvati, ordini cliente e ordini di acquisto attribuiti a questo operatore",
  "admin.users.detail.editTitle": "\nAccesso e preferenze",
  "admin.users.detail.editDescription":
    "\nModifica ruolo, impostazioni internazionali e disponibilità dell'assistente per l'operatore selezionato.",
  "admin.users.roleLabel": "\nRuolo",
  "admin.users.save": "\nSalva modifiche",
  "admin.users.savedSuccess": "\nAccesso utente e preferenze aggiornate.",
  "admin.users.revokeSessions": "\nRevoca sessioni",
  "admin.users.revokeSuccess":
    "\nTutte le sessioni sono state revocate per l'operatore selezionato.",
  "admin.users.detail.revokeTitle": "\nRipristino sessione",
  "admin.users.detail.revokeDescription":
    "\nForza un nuovo accesso nel browser e nelle sessioni memorizzate nella cache per questo operatore.",
  "admin.users.detail.sessionsTitle": "\nSessioni recenti",
  "admin.users.detail.sessionsDescription":
    "Ultima attività della sessione e posizione di scadenza per l'operatore selezionato.",
  "admin.users.detail.auditTitle": "\nAttività di governance recente",
  "admin.users.detail.auditDescription":
    "\nVoci di controllo recenti associate all'operatore selezionato.",
  "admin.users.sessionExpiresAt": "\nScadenza {value}",
  "admin.users.sessionsEmpty": "\nNessuna sessione recente registrata per questo operatore.",
  "admin.users.signal.privileged": "\nPrivilegiato",
  "admin.users.signal.unverified": "\nNon verificato",
  "admin.users.signal.concurrentSessions": "\nSessioni simultanee",
  "admin.users.signal.preferencesMissing": "\nPreferenze mancanti",
  "admin.users.signal.noSessions": "\nNessuna sessione",
  "admin.users.status.active": "\nAttivo",
  "admin.users.status.attention": "\nHa bisogno di attenzione",
  "admin.users.status.inactive": "\nInattivo",
  "admin.users.error.invalidRole": "\nSeleziona un ruolo valido prima di salvare.",
  "admin.users.error.invalidName": "\nInserisci un nome visualizzato valido prima di salvare.",
  "admin.users.error.notFound": "\nImpossibile trovare l'utente selezionato.",
  "admin.users.error.saveFailed":
    "\nImpossibile salvare le modifiche dell'utente in questo momento.",
  "admin.locations.totalSites": "\nSiti registrati",
  "admin.locations.totalSitesHint": "\nBasi e strutture gestite nella piattaforma",
  "admin.locations.activeSites": "\nSiti attivi",
  "admin.locations.activeSitesHint":
    "\nSiti attualmente contrassegnati come attivi per le operazioni",
  "admin.locations.totalDevices": "\nDispositivi collegati",
  "admin.locations.totalDevicesHint": "\nDispositivi edge mappati al patrimonio gestito",
  "admin.locations.devicesDescription":
    "\nRegistra e verifica la copertura del dispositivo insieme alla struttura del sito che lo possiede.",
  "admin.aiOps.provider": "\nFornitore",
  "admin.aiOps.providerHint":
    "\nProvider di runtime che serve nuove richieste di assistente e previsione",
  "admin.aiOps.model": "\nModello",
  "admin.aiOps.sourceLabel": "\nFonte: {value}",
  "admin.aiOps.predictions": "\nPronostici",
  "admin.aiOps.predictionsHint": "\nRecord di previsione attivi in tutta la tenuta",
  "admin.aiOps.annotations": "\nAnnotazioni",
  "admin.aiOps.annotationsHint": "\nEtichette di revisione e record di annotazioni acquisiti",
  "admin.aiOps.datasetTitle": "\nOperazioni sul set di dati",
  "admin.aiOps.datasetDescription":
    "\nCollega le modifiche di runtime ai set di dati che guidano previsioni, reporting e revisione operativa.",
  "admin.aiOps.savedReports": "\nRapporti salvati",
  "admin.aiOps.managedUsers": "\nUtenti gestiti",
  "admin.aiOps.copilotDescription":
    "\nUtilizza l'intelligenza artificiale per tracciare il comportamento in fase di runtime rispetto alle modifiche del modello, del set di dati e dell'operatore prima di modificare la configurazione.",
  "admin.operationalContext.title": "\nContesto operativo",
  "admin.operationalContext.description":
    "\nQuesti valori provengono da variabili di ambiente del server e corrispondono al contesto inserito negli assistenti AI: OPERATIONAL_CURRENCY, FACILITY_TIMEZONE, FACILITY_LATITUDE e FACILITY_LONGITUDE (sia la latitudine che la longitudine sono richieste per il meteo).",
  "admin.operationalContext.currencyLabel": "\nValuta commerciale predefinita",
  "admin.operationalContext.facilityTimeLabel": "\nOra locale della struttura",
  "admin.operationalContext.facilityTimeBody": "Fuso orario: {timezone} — {localTime}",
  "admin.operationalContext.facilityTimeEmpty":
    "\nImposta FACILITY_TIMEZONE su un fuso orario IANA (ad esempio Europa/Londra) per mostrare l'orologio della struttura.",
  "admin.operationalContext.coordinatesLabel": "\nCoordinate struttura (WGS84)",
  "admin.operationalContext.coordinatesBody": "Lat: {lat}, Lon: {lon}",
  "admin.operationalContext.coordinatesEmpty":
    "\nImposta FACILITY_LATITUDE e FACILITY_LONGITUDE insieme per abilitare le coordinate e il meteo in tempo reale quando è consentito l'accesso alla rete in uscita.",
  "admin.operationalContext.weatherLabel": "\nIstantanea meteo",
  "admin.operationalContext.weatherOk":
    "\n{tempC} °C, vento {windKmh} km/h, codice WMO {code} (Open-Meteo).",
  "admin.operationalContext.weatherSkippedAirgapped":
    "Il meteo non viene recuperato nelle distribuzioni AIRGAPPED.",
  "admin.operationalContext.weatherSkippedNoCoordinates":
    "\nConfigura latitudine e longitudine della struttura per recuperare le condizioni attuali.",
  "admin.operationalContext.weatherUnavailable":
    "\nI dati meteorologici non sono temporaneamente disponibili. Riprova più tardi.",
  "admin.integrations.totalDomains": "\nDomini richiesti",
  "admin.integrations.totalDomainsHint":
    "\nSistemi aziendali con cui la piattaforma deve integrarsi",
  "admin.integrations.configured": "\nConfigurato",
  "admin.integrations.configuredHint":
    "\nIntegrazioni di domini con una voce del registro di sistema attiva",
  "admin.integrations.degraded": "\nDegradato",
  "admin.integrations.degradedHint":
    "\nSistemi registrati che attualmente operano al di sotto della postura target",
  "admin.integrations.offline": "\nNon in linea",
  "admin.integrations.offlineHint":
    "\nSistemi registrati che attualmente richiedono ripristino o fallback",
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
  "admin.branding.operationalCurrencyLabel": "Valuta commerciale",
  "admin.branding.operationalCurrencyHint":
    "La valuta per finanza, checkout e documenti resta un’impostazione globale di runtime e non un override per singolo brand.",
  "admin.branding.supportedLocalesLabel": "Lingue supportate",
  "admin.branding.supportedLocalesHint":
    "Shell del brand e metadati passano attraverso i dizionari di lingua condivisi distribuiti con la piattaforma.",
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
    "\nLe risorse umane aziendali, la finanza, gli appalti e i sistemi documentali rimangono i sistemi di registrazione. Questo registro tiene traccia del contratto di integrazione e della postura operativa all'interno di {brandName}.",
  "admin.integrations.formTitle": "\nRegistro di integrazione",
  "admin.integrations.formDescription":
    "\nCrea o aggiorna il contratto di integrazione per un dominio aziendale richiesto.",
  "admin.integrations.registerTitle": "\nRegistro corrente",
  "admin.integrations.registerDescription":
    "\nTutti i domini aziendali richiesti, comprese le aree non configurate che necessitano ancora di onboarding.",
  "admin.integrations.domainLabel": "\nDominio aziendale",
  "admin.integrations.systemNameLabel": "\nNome del sistema",
  "admin.integrations.systemNamePlaceholder": "\nInserisci il nome del sistema aziendale",
  "admin.integrations.syncModeLabel": "\nModalità sincronizzazione",
  "admin.integrations.statusLabel": "\nStato operativo",
  "admin.integrations.ownerLabel": "\nProprietario del servizio",
  "admin.integrations.ownerPlaceholder": "\nInserisci il proprietario o il team responsabile",
  "admin.integrations.lastSyncLabel": "\nUltima sincronizzazione verificata",
  "admin.integrations.notesLabel": "\nNote",
  "admin.integrations.notesPlaceholder":
    "\nRegistrare note contrattuali, operative o di delimitazione dei dati",
  "admin.integrations.save": "\nSalva integrazione",
  "admin.integrations.saved": "\nAggiornato registro delle integrazioni aziendali.",
  "admin.integrations.systemOfRecord": "\nSistema di registrazione",
  "admin.integrations.unconfigured": "\nNon configurato",
  "admin.integrations.domain.HR": "Risorse Umane",
  "admin.integrations.domain.FINANCE": "\nFinanza",
  "admin.integrations.domain.PROCUREMENT": "\nApprovvigionamenti",
  "admin.integrations.domain.DOCUMENT_MANAGEMENT": "\nGestione documenti",
  "admin.integrations.domain.CATERING_SERVICES": "\nRistorazione / ESS",
  "admin.integrations.syncMode.API": "Interfaccia API",
  "admin.integrations.syncMode.FILE_DROP": "\nRilascio file",
  "admin.integrations.syncMode.MANUAL": "\nManuale",
  "admin.integrations.status.HEALTHY": "Sano",
  "admin.integrations.status.DEGRADED": "\nDegradato",
  "admin.integrations.status.OFFLINE": "\nNon in linea",
  "admin.integrations.table.domain": "\nDominio",
  "admin.integrations.table.system": "\nSistema",
  "admin.integrations.table.syncMode": "\nModalità sincronizzazione",
  "admin.integrations.table.owner": "\nProprietario",
  "admin.integrations.table.lastSync": "\nUltima sincronizzazione",
  "admin.integrations.table.updatedAt": "\nAggiornato",
  "admin.integrations.error.invalidSystemName":
    "\nImmettere un nome di sistema valido prima di salvare.",
  "admin.integrations.error.invalidSelection":
    "\nSeleziona un dominio aziendale, una modalità di sincronizzazione e uno stato operativo validi.",
  "admin.integrations.error.saveFailed":
    "\nAl momento non è possibile salvare il registro delle integrazioni aziendali.",
  "admin.integrations.systemConfigDescription":
    "\nRegistro dell'integrazione dei sistemi aziendali e postura operativa.",
  "admin.integrations.dependenciesTitle": "\nMappa delle dipendenze",
  "admin.integrations.dependenciesDescription":
    "\nTieni traccia delle superfici operative, dei proprietari e delle azioni successive per ciascuna dipendenza aziendale richiesta.",
  "admin.integrations.dependency.systemLabel": "\nSistema",
  "admin.integrations.dependency.ownerLabel": "\nProprietario",
  "admin.integrations.dependency.syncLabel": "\nSincronizzazione: {syncMode}",
  "admin.integrations.dependency.lastSyncLabel": "\nUltima sincronizzazione",
  "admin.integrations.dependency.updatedLabel": "\nUltimo aggiornamento",
  "admin.integrations.dependency.notesLabel": "\nNote operative",
  "admin.integrations.dependency.impactLabel": "\nFlussi di lavoro interessati",
  "admin.integrations.dependency.noteEmpty": "\nNessuna nota operativa ancora registrata.",
  "admin.integrations.dependency.remediationLabel": "\nAzione successiva",
  "admin.integrations.dependency.lastSyncEmpty":
    "\nNessuna sincronizzazione ancora registrata con successo.",
  "admin.integrations.dependency.updatedEmpty":
    "\nNessun aggiornamento del registro ancora registrato.",
  "admin.integrations.dependency.emptyTitle": "\nNessuna posizione di dipendenza disponibile",
  "admin.integrations.dependency.emptyDescription":
    "Aggiorna la mappa dipendente dell'integrazione una volta disponibili i dati dell'area di lavoro di supporto.",
  "admin.integrations.dependency.errorTitle": "\nMappa delle dipendenze non disponibile",
  "admin.integrations.dependency.errorDescription":
    "\nImpossibile aggiornare il pannello delle dipendenze di integrazione. Riprova la richiesta o verifica il registro a monte.",
  "admin.integrations.dependency.posture.HEALTHY": "Sano",
  "admin.integrations.dependency.posture.DEGRADED": "\nDegradato",
  "admin.integrations.dependency.posture.OFFLINE": "\nNon in linea",
  "admin.integrations.dependency.posture.UNCONFIGURED": "\nNon configurato",
  "admin.integrations.dependency.remediation.HEALTHY":
    "\nContinua a monitorare lo stato di sincronizzazione pianificata e mantieni lo spazio di lavoro downstream allineato con l'attuale sistema di registrazione.",
  "admin.integrations.dependency.remediation.DEGRADED":
    "\nEsamina le ultime note di sincronizzazione, conferma la disponibilità upstream e cancella il flusso di lavoro danneggiato prima che gli operatori dipendano da dati non aggiornati.",
  "admin.integrations.dependency.remediation.OFFLINE":
    "\nIncrementa l'interruzione delle dipendenze, passa i team a valle ai controlli manuali e ripristina il sistema di registrazione prima del ciclo operativo successivo.",
  "admin.integrations.dependency.remediation.UNCONFIGURED":
    "\nRegistrare il sistema di record, assegnare un proprietario e definire la modalità di sincronizzazione prima che questa dipendenza venga considerata operativamente pronta.",
  "admin.integrations.dependency.attentionTitle": "\nAttenzione all'integrazione richiesta",
  "admin.integrations.dependency.attentionDescription":
    "\nLe dipendenze {degraded} degradate, {offline} offline e {unconfigured} non configurate richiedono un'azione.",
  "admin.integrations.dependency.healthyTitle": "\nDipendenze allineate",
  "admin.integrations.dependency.healthyDescription":
    "\nTutte le dipendenze richieste sono configurate e attualmente funzionano secondo il comportamento previsto.",
  "admin.integrations.dependency.action.HR": "\nApri operazioni utente",
  "admin.integrations.dependency.action.FINANCE": "\nPianificazione finanza aperta",
  "admin.integrations.dependency.action.PROCUREMENT": "\nApri area di lavoro flotta",
  "admin.integrations.dependency.action.DOCUMENT_MANAGEMENT": "\nApri area di lavoro report",
  "admin.integrations.dependency.action.CATERING_SERVICES": "\nSpazio di lavoro aperto",
  "admin.integrations.dependency.description.HR":
    "\nL'identità, il personale e la copertura degli operatori dipendono dal fatto che il sistema HR rimanga allineato ai ruoli e alla proprietà della piattaforma.",
  "admin.integrations.dependency.description.FINANCE":
    "\nLa posizione del budget, gli scenari di pianificazione e i controlli finanziari dipendono dalla sincronizzazione del sistema finanziario dei record.",
  "admin.integrations.dependency.description.PROCUREMENT":
    "\nGli impegni di approvvigionamento, l'attività dei fornitori e l'esecuzione della flotta dipendono da acquisti tempestivi e flussi contrattuali.",
  "admin.integrations.dependency.description.DOCUMENT_MANAGEMENT":
    "\nRapporti, approvazioni e prove documentali dipendono dalla disponibilità del sistema di gestione dei documenti condiviso.",
  "admin.integrations.dependency.description.CATERING_SERVICES":
    "\nLa consegna dell'immobile, la preparazione dell'ESS e il coordinamento del catering dipendono dal fatto che questo contratto di servizio rimanga operativo.",
  "admin.integrations.dependency.impact.HR.primary": "\nAssegnazioni di ruoli",
  "admin.integrations.dependency.impact.HR.secondary": "\nRevisioni di accesso privilegiato",
  "admin.integrations.dependency.impact.HR.tertiary":
    "\nTrasferimenti di preparazione della forza lavoro",
  "admin.integrations.dependency.impact.FINANCE.primary": "\nPianificazione dello scenario",
  "admin.integrations.dependency.impact.FINANCE.secondary": "\nControlli del budget",
  "admin.integrations.dependency.impact.FINANCE.tertiary": "\nPacchetti di reporting esecutivo",
  "admin.integrations.dependency.impact.PROCUREMENT.primary": "Esecuzione del fornitore",
  "admin.integrations.dependency.impact.PROCUREMENT.secondary":
    "\nPosizione di consegna della flotta",
  "admin.integrations.dependency.impact.PROCUREMENT.tertiary": "\nRouting di evasione commerciale",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.primary": "\nPacchetti prove",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.secondary":
    "\nFlussi di lavoro di approvazione",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.tertiary":
    "\nSegnalazione pubblicazione",
  "admin.integrations.dependency.impact.CATERING_SERVICES.primary": "\nPredisposizione ESS",
  "admin.integrations.dependency.impact.CATERING_SERVICES.secondary":
    "\nCoordinamento consegna immobiliare",
  "admin.integrations.dependency.impact.CATERING_SERVICES.tertiary":
    "\nTrasferimento supporto catering",
  "admin.integrations.dependency.surface.HR": "\nUtenti, ruoli e preparazione della forza lavoro",
  "admin.integrations.dependency.surface.FINANCE":
    "\nBudget, scenari di pianificazione e supervisione finanziaria esecutiva",
  "admin.integrations.dependency.surface.PROCUREMENT":
    "\nConsegna della flotta, esecuzione dei fornitori e coordinamento degli approvvigionamenti",
  "admin.integrations.dependency.surface.DOCUMENT_MANAGEMENT":
    "\nReport, pacchetti di prove e flussi di lavoro dei documenti operativi",
  "admin.integrations.dependency.surface.CATERING_SERVICES":
    "\nConsegna immobiliare, supporto alla ristorazione e superfici di coordinamento ESS",
  "admin.security.privilegedUsers": "\nUtenti privilegiati",
  "admin.security.privilegedUsersHint":
    "\nAmministratori attualmente in possesso di accesso privilegiato",
  "admin.security.unverifiedPrivilegedUsers": "\nPrivilegiato non verificato",
  "admin.security.unverifiedPrivilegedUsersHint":
    "\nAlle identità privilegiate manca ancora la verifica email",
  "admin.security.concurrentSessionWarnings": "\nSessioni simultanee",
  "admin.security.concurrentSessionWarningsHint":
    "\nOperatori con più sessioni attive che richiedono revisione",
  "admin.security.totalEvents": "\nEventi di sicurezza 7d",
  "admin.security.totalEventsHint":
    "\nAttività di modifica relativa all'autenticazione e all'accesso nell'attuale periodo di sicurezza",
  "admin.security.rbacTitle": "\nControllo degli accessi basato sui ruoli",
  "admin.security.rbacDescription":
    "\nEsamina la distribuzione dei ruoli, l'impronta di accesso attivo e la postura di verifica tra gli operatori interni.",
  "admin.security.storageTitle": "\nPosizione di archiviazione sicura dei dati",
  "admin.security.storageDescription":
    "\nTieni traccia dei controlli dei limiti di distribuzione che influenzano la località di archiviazione, la località di riferimento e l'esposizione esterna.",
  "admin.security.auditTitle": "\nAttività di sicurezza recente",
  "admin.security.auditDescription":
    "\nVoci di controllo relative all'autenticazione e all'accesso dall'attuale periodo di sicurezza di sette giorni.",
  "admin.security.auditEmpty":
    "\nNessun evento di sicurezza recente è stato registrato nella finestra corrente.",
  "admin.security.roleTable.role": "\nRuolo",
  "admin.security.roleTable.users": "\nUtenti",
  "admin.security.roleTable.activeSessions": "\nSessioni attive",
  "admin.security.roleTable.unverified": "\nNon verificato",
  "admin.security.authEvents": "\nEventi di autenticazione",
  "admin.security.accessChangeEvents": "\nModifiche di accesso",
  "admin.security.databaseLabel": "\nBanca dati",
  "admin.governance.totalEvents": "\nEventi filtrati",
  "admin.governance.totalEventsHint": "\nEventi di controllo nella sezione di governance corrente",
  "admin.governance.authEvents": "\nEventi di autenticazione",
  "admin.governance.authEventsHint":
    "\nAttività di accesso e disconnessione nella sezione corrente",
  "admin.governance.changeEvents": "\nModifica eventi",
  "admin.governance.changeEventsHint":
    "\nCrea, aggiorna, approva, elimina ed esporta azioni nell'ambito",
  "admin.governance.searchLabel": "\nCerca governance",
  "admin.governance.searchPlaceholder": "\nCerca attore, entità o ID richiesta",
  "admin.governance.actionLabel": "\nAzione",
  "admin.governance.actionAll": "\nTutte le azioni",
  "admin.governance.windowLabel": "\nFinestra temporale",
  "admin.governance.window.24h": "\nUltime 24 ore",
  "admin.governance.window.7d": "\nUltimi 7 giorni",
  "admin.governance.window.30d": "\nUltimi 30 giorni",
  "admin.governance.window.all": "\nTutti i tempi",
  "admin.governance.applyFilters": "\nApplica filtri",
  "admin.governance.exportFiltered": "\nEsporta CSV filtrato",
  "admin.governance.requestId": "\nRichiedi ID",
  "admin.governance.requestIdValue": "\nID richiesta {value}",
  "admin.governance.empty": "\nNessun evento di governance corrisponde ai filtri correnti.",
  "admin.chat.overviewReviewLabel": "\nRiepiloga la postura",
  "admin.chat.overviewReviewPrompt":
    "Riepiloga la panoramica corrente dell'amministratore, evidenzia le anomalie tra utenti, set di dati e governance e consiglia le prossime azioni amministrative.",
  "admin.chat.overviewOpsLabel": "\nPianifica le azioni del centro di controllo",
  "admin.chat.overviewOpsPrompt":
    "\nUtilizzando l'attuale panoramica dell'amministratore, proponi un piano d'azione con priorità per la gestione degli utenti, le posizioni, le operazioni di intelligenza artificiale e la governance.",
  "admin.chat.userReviewLabel": "\nEsamina l'utente selezionato",
  "admin.chat.userReviewPrompt":
    "\nEsamina l'utente selezionato, spiega i rischi di accesso, sessione e preferenze e consiglia le successive azioni amministrative.",
  "admin.chat.userOpsLabel": "\nBozza del piano di modifica degli accessi",
  "admin.chat.userOpsPrompt":
    "\nUtilizzando l'attuale area di lavoro di gestione degli utenti, elabora un piano preciso per aggiornare i ruoli, revocare le sessioni se necessario e comunicare le modifiche.",
  "admin.chat.brandingReviewLabel": "Review brand posture",
  "admin.chat.brandingReviewPrompt":
    "Review the current brand register, identify domain, metadata, or theming gaps, and recommend the next branding actions.",
  "admin.chat.locationsReviewLabel": "\nEsamina l'impronta del bordo",
  "admin.chat.locationsReviewPrompt":
    "\nEsamina le posizioni attuali e la postura dei dispositivi periferici, evidenzia lacune o anomalie e consiglia le prossime azioni operative.",
  "admin.chat.aiReviewLabel": "\nRivedi la postura dell'IA",
  "admin.chat.aiReviewPrompt":
    "\nEsamina l'attuale runtime dell'IA e la situazione del set di dati, spiega i rischi e consiglia le prossime azioni amministrative.",
  "admin.chat.aiOpsLabel": "\nBozza del piano di implementazione dell'IA",
  "admin.chat.aiOpsPrompt":
    "\nUtilizzando l'attuale area di lavoro delle operazioni .bao, elabora un piano di implementazione per le modifiche al runtime, gli impatti sui set di dati e la comunicazione con l'operatore.",
  "admin.chat.integrationsReviewLabel": "\nRivedi le integrazioni aziendali",
  "admin.chat.integrationsReviewPrompt":
    "\nEsaminare il registro dell'integrazione aziendale, identificare le lacune di onboarding o di resilienza nei sistemi di risorse umane, finanza, approvvigionamento e documenti e consigliare le successive azioni amministrative.",
  "admin.chat.securityReviewLabel": "\nEsamina il livello di sicurezza",
  "admin.chat.securityReviewPrompt":
    "\nEsaminare l'attuale area di lavoro sulla sicurezza, riepilogare i rischi RBAC, controllo e limiti di archiviazione e consigliare le prossime azioni di conformità.",
  "admin.chat.governanceReviewLabel": "\nRivedi l'attività di governance",
  "admin.chat.governanceReviewPrompt":
    "\nEsamina l'attuale area di lavoro di governance, riepiloga gli accessi importanti o gli eventi di modifica e consiglia le prossime azioni di conformità.",
  "admin.audit.action.CREATE": "\nCreato",
  "admin.audit.action.UPDATE": "\nAggiornato",
  "admin.audit.action.DELETE": "\nEliminato",
  "admin.audit.action.APPROVE": "Approvato",
  "admin.audit.action.LOGIN": "\nAccesso",
  "admin.audit.action.LOGOUT": "\nDisconnesso",
  "admin.audit.action.EXPORT": "\nEsportato",
  "admin.invite.title": "\nInviti utente",
  "admin.invite.description":
    "\nInvita nuovi operatori via email con ruolo preassegnato e finestra di scadenza.",
  "admin.invite.emailLabel": "\nIndirizzo e-mail",
  "admin.invite.emailPlaceholder": "operatore@esempio.com",
  "admin.invite.roleLabel": "\nRuolo",
  "admin.invite.expiresLabel": "\nScade tra (giorni)",
  "admin.invite.send": "\nInvia invito",
  "admin.invite.sent": "\nInvito inviato con successo.",
  "admin.invite.pending": "\nIn sospeso",
  "admin.invite.expired": "\nScaduto",
  "admin.invite.accepted": "\nAccettato",
  "admin.invite.revoked": "\nRevocato",
  "admin.invite.resend": "\nInvia di nuovo",
  "admin.invite.pendingTitle": "\nInviti in sospeso",
  "admin.invite.pendingDescription":
    "\nInviti in attesa di accettazione da parte degli operatori invitati.",
  "admin.invite.table.email": "\nE-mail",
  "admin.invite.table.role": "\nRuolo",
  "admin.invite.table.status": "\nStato",
  "admin.invite.table.expiresAt": "\nScadenza",
  "admin.invite.table.invitedBy": "\nInvitato da",
  "admin.invite.table.createdAt": "\nInviato",
  "admin.invite.empty": "\nNessun invito in sospeso.",
  "admin.invite.error.invalidEmail": "\nInserisci un indirizzo email valido.",
  "admin.invite.error.invalidRole": "\nSeleziona un ruolo valido.",
  "admin.invite.error.sendFailed": "\nImpossibile inviare l'invito in questo momento.",
  "admin.invite.error.alreadyInvited": "\nQuesta email ha già un invito in sospeso.",
  "admin.bulkImport.title": "\nImportazione utente in blocco",
  "admin.bulkImport.description":
    "\nCarica un file CSV per eseguire il provisioning di più account operatore contemporaneamente.",
  "admin.bulkImport.uploadLabel": "\nFile CSV",
  "admin.bulkImport.uploadHint": "\nColonne previste: nome, email, ruolo",
  "admin.bulkImport.previewTitle": "\nImporta anteprima",
  "admin.bulkImport.previewDescription":
    "\nEsamina le righe analizzate prima di confermare l'importazione.",
  "admin.bulkImport.confirmImport": "\nConferma importazione",
  "admin.bulkImport.rowCount": "\n{count} righe analizzate",
  "admin.bulkImport.validRows": "\n{count} valido",
  "admin.bulkImport.errorRows": "\n{count} errori",
  "admin.bulkImport.table.row": "\nRiga",
  "admin.bulkImport.table.name": "\nNome",
  "admin.bulkImport.table.email": "\nE-mail",
  "admin.bulkImport.table.role": "\nRuolo",
  "admin.bulkImport.table.status": "\nStato",
  "admin.bulkImport.table.error": "\nErrore",
  "admin.bulkImport.statusValid": "\nValido",
  "admin.bulkImport.statusError": "\nErrore",
  "admin.bulkImport.imported": "\n{count} utenti importati correttamente.",
  "admin.bulkImport.error.noFile": "\nSeleziona un file CSV da caricare.",
  "admin.bulkImport.error.parseFailed": "\nImpossibile analizzare il file CSV.",
  "admin.bulkImport.error.importFailed":
    "\nImpossibile completare l'importazione in questo momento.",
  "admin.bulkImport.error.noValidRows": "\nNessuna riga valida da importare.",
  "admin.bulkImport.validation.missingName": "\nNome mancante",
  "admin.bulkImport.validation.invalidEmail": "\nE-mail non valida",
  "admin.bulkImport.validation.invalidRole": "\nRuolo non valido",
  "admin.health.title": "\nStato del sistema",
  "admin.health.description":
    "\nDiagnostica della piattaforma in tempo reale con metriche di sistema aggiornate in tempo reale.",
  "admin.health.uptime": "\nTempo di attività",
  "admin.health.uptimeHint": "\nTempo trascorso dall'avvio del processo Bun",
  "admin.health.latencyP50": "\nLatenza P50",
  "admin.health.latencyP50Hint": "\nLatenza media delle richieste negli esempi recenti",
  "admin.health.latencyP99": "\nLatenza P99",
  "admin.health.latencyP99Hint": "\nLatenza delle richieste in coda negli esempi recenti",
  "admin.health.memoryUsage": "\nUtilizzo della memoria",
  "admin.health.memoryUsageHint": "\nConsumo di memoria heap del runtime Bun",
  "admin.health.dbConnections": "\nStato database",
  "admin.health.dbConnectionsHint": "\nIntegrità del pool di connessioni PostgreSQL",
  "admin.health.errorRate": "\nTasso di errore",
  "admin.health.errorRateHint": "\nPercentuale di risposte con stato 5xx nella finestra corrente",
  "admin.health.refreshInterval": "\nAggiornamento automatico ogni 5 secondi",
  "admin.health.statusOnline": "\nIn linea",
  "admin.health.statusDegraded": "\nDegradato",
  "admin.health.statusOffline": "\nNon in linea",
  "admin.apiKeys.title": "\nGestione delle chiavi API",
  "admin.apiKeys.description":
    "\nCrea, ruota e revoca le chiavi API per le integrazioni di sistema.",
  "admin.apiKeys.create": "\nCrea chiave API",
  "admin.apiKeys.nameLabel": "\nNome chiave",
  "admin.apiKeys.namePlaceholder": "\nad es. Pipeline CI, agente di monitoraggio",
  "admin.apiKeys.scopeLabel": "\nAmbito",
  "admin.apiKeys.scopeRead": "\nLeggi",
  "admin.apiKeys.scopeWrite": "\nScrivi",
  "admin.apiKeys.scopeAdmin": "\nAmministratore",
  "admin.apiKeys.expiresLabel": "\nScade tra (giorni)",
  "admin.apiKeys.expiresNever": "\nMai",
  "admin.apiKeys.lastUsed": "\nUltimo utilizzato",
  "admin.apiKeys.lastUsedNever": "\nMai usato",
  "admin.apiKeys.revoke": "\nRevoca",
  "admin.apiKeys.revokeTitle": "\nRevoca chiave API",
  "admin.apiKeys.revokeDescription":
    "\nQuesta chiave API verrà disattivata in modo permanente. Questa azione non può essere annullata.",
  "admin.apiKeys.revokeConfirm": "\nRevoca chiave",
  "admin.apiKeys.revoked": "\nLa chiave API è stata revocata.",
  "admin.apiKeys.created": "\nChiave API creata. Copia la chiave adesso: non verrà più mostrata.",
  "admin.apiKeys.table.name": "\nNome",
  "admin.apiKeys.table.prefix": "\nPrefisso chiave",
  "admin.apiKeys.table.scope": "\nAmbito",
  "admin.apiKeys.table.createdBy": "\nCreato da",
  "admin.apiKeys.table.expiresAt": "\nScadenza",
  "admin.apiKeys.table.lastUsedAt": "\nUltimo utilizzato",
  "admin.apiKeys.table.status": "\nStato",
  "admin.apiKeys.table.actions": "\nAzioni",
  "admin.apiKeys.statusActive": "\nAttivo",
  "admin.apiKeys.statusRevoked": "\nRevocato",
  "admin.apiKeys.statusExpired": "\nScaduto",
  "admin.apiKeys.empty": "\nNessuna chiave API creata.",
  "admin.apiKeys.error.invalidName": "\nInserisci un nome chiave valido.",
  "admin.apiKeys.error.invalidScope": "\nSeleziona un ambito valido.",
  "admin.apiKeys.error.createFailed": "Impossibile creare la chiave API in questo momento.",
  "admin.apiKeys.error.revokeFailed": "\nImpossibile revocare la chiave API in questo momento.",
  "admin.lms.title": "\nSistema di gestione dell'apprendimento",
  "admin.lms.description":
    "\nGestisci contenuti educativi, piani di studio e monitoraggio dei progressi degli studenti.",
  "admin.lms.courses.title": "\nCorsi",
  "admin.lms.modules.title": "\nModuli",
  "admin.lms.enrollments.title": "\nIscrizioni",
  "admin.lms.createCourse": "\nCrea corso",
  "admin.lms.table.courseName": "\nNome del corso",
  "admin.lms.table.instructor": "\nIstruttore",
  "admin.lms.table.enrolled": "\nIscritto",
  "admin.lms.table.completionRate": "\nTasso di completamento",
  "admin.lms.status.published": "\nPubblicato",
  "admin.lms.status.draft": "\nBozza",
  "admin.lms.status.archived": "\nArchiviato",

  "admin.webhooks.title": "\nConfigurazione webhook",
  "admin.webhooks.description":
    "\nRegistra gli endpoint webhook per la distribuzione di eventi in tempo reale a sistemi esterni.",
  "admin.webhooks.urlLabel": "\nURL dell'endpoint",
  "admin.webhooks.urlPlaceholder": "\nhttps://example.com/webhooks/platform",
  "admin.webhooks.secretLabel": "\nFirma segreta",
  "admin.webhooks.eventsLabel": "\nEventi a cui sei iscritto",
  "admin.webhooks.eventsPlaceholder": "\nworkOrder.creato, attività.completata",
  "admin.webhooks.eventsHint":
    "\nTipi di eventi separati da virgole (ad esempio workOrder.created, task.completed)",
  "admin.webhooks.activeLabel": "\nAttivo",
  "admin.webhooks.create": "\nRegistra webhook",
  "admin.webhooks.created": "\nWebhook registrato correttamente.",
  "admin.webhooks.test": "\nInvia prova",
  "admin.webhooks.deliveryLog": "\nRegistro consegne",
  "admin.webhooks.table.url": "\nPunto finale",
  "admin.webhooks.table.events": "\nEventi",
  "admin.webhooks.table.status": "\nStato",
  "admin.webhooks.table.lastDelivered": "\nUltima consegna",
  "admin.webhooks.table.createdBy": "\nCreato da",
  "admin.webhooks.table.actions": "\nAzioni",
  "admin.webhooks.statusActive": "\nAttivo",
  "admin.webhooks.statusInactive": "\nInattivo",
  "admin.webhooks.empty": "\nNessun webhook registrato.",
  "admin.webhooks.deleteTitle": "\nRimuovi webhook",
  "admin.webhooks.deleteDescription":
    "\nQuesto webhook verrà disattivato e rimosso in modo permanente.",
  "admin.webhooks.deleteConfirm": "\nRimuovi webhook",
  "admin.webhooks.deleted": "\nIl webhook è stato rimosso.",
  "admin.webhooks.error.invalidUrl": "\nInserisci un URL HTTPS valido.",
  "admin.webhooks.error.invalidEvents": "\nSeleziona almeno un tipo di evento.",
  "admin.webhooks.error.createFailed": "\nImpossibile registrare il webhook in questo momento.",
  "admin.webhooks.error.deleteFailed": "\nImpossibile rimuovere il webhook in questo momento.",
  "system.databaseUnavailable":
    "\nL'accesso al database live non è configurato. Imposta DATABASE_URL per abilitare percorsi supportati da dati.",
  "brand.error.hostNotConfigured": "\nQuesto host non è configurato per un contesto di brand.",
  "kpi.total_assets": "\nTotale attivo",
  "kpi.active_tasks": "\nAttività attive",
  "kpi.predictions_due": "\nPronostici in scadenza",
  "kpi.utilisation_rate": "\nTasso di utilizzo",
  "kpi.overdue_maintenance": "\nManutenzione scaduta",
  "kpi.depreciation_total": "\nTotale ammortamento",
  "common.title": "Title",
  "common.compare": "Compare",
  "common.confidence": "Confidence",
  "common.rationale": "Rationale",
  "common.savedView": "Saved view",
  "common.whatChanged": "What changed",
  "common.back": "\nIndietro",
  "common.close": "\nChiudi",
  "common.closeIcon": "✖",
  "common.confirmDelete": "\nEliminare questo elemento?",
  "common.delete": "\nElimina",
  "common.notFound": "\nNon trovato",
  "common.yes": "\nsì",
  "common.no": "\nno",
  "common.retry": "\nRiprova",
  "common.key.alt": "\nAlt",
  "common.key.enter": "\nInserisci",
  "common.key.shift": "\nMaiusc",
  "common.open": "\nApri",
  "common.refresh": "\nAggiorna",
  "common.selectionNone": "\nNessun articolo selezionato",
  "common.selectionOne": "\nUno",
  "common.selectAllVisible": "\nSeleziona tutto visibile",
  "common.selectAllResults": "\nSeleziona tutti i risultati",
  "common.lastUpdated": "\nUltimo aggiornamento",
  "common.updatedAt": "\nAggiornato",
  "common.live": "\nDal vivo",
  "common.loading": "\nCaricamento in corso",
  "common.offlineMessage": "\nSembra che tu sia offline. Controlla la tua connessione.",
  "common.tabs": "\nSchede",
  "common.toolbar": "\nBarra degli strumenti",
  "common.emptyValue": "N/D",
  "common.filterChipAria": "\nCancella filtro {label}: {value}",
  "common.pending": "In sospeso",
  "common.enabled": "\nAbilitato",
  "common.disabled": "\nDisabilitato",
  "common.percentFormat": "\n{value}%",
  "common.optional": "\nopzionale",
  "common.system": "\nsistema",
  "common.unknownRole": "\nSconosciuto",
  "common.status": "\nStato",
  "common.actions": "\nAzioni",
  "common.confirm": "\nConferma",
  "common.confirmAction": "\nSei sicuro?",
  "common.createdBy": "\nCreato da",
  "common.date": "\nData",
  "common.sharedBy": "\nCondiviso da",
  "common.notifications": "\nNotifiche",
  "common.period": "\nPeriodo",
  "common.empty": "\nNessun dato disponibile",
  "common.emptyTable": "\nNessun dato da visualizzare",
  "common.no_results": "\nNessun risultato",
  "common.emptySearch": "\nNessun risultato. Prova a modificare i filtri.",
  "common.error": "\nQualcosa è andato storto",
  "common.success": "\nSuccesso",
  "workspace.livePanel.lastUpdatedEmpty": "\nIn attesa del primo aggiornamento",
  "workspace.livePanel.emptyDescription":
    "\nQuesto pannello live non ha ancora dati. Aggiorna prima la superficie o completa prima il flusso di lavoro a monte.",
  "workspace.livePanel.errorDescription":
    "\nImpossibile aggiornare questo pannello live. Riprova la richiesta o verifica il servizio upstream.",
  "assets.table.empty": "\nNessuna risorsa ancora. Registra il tuo primo dispositivo per iniziare.",
  "assets.table.emptyAction": "\nAggiungi dispositivo",
  "finance.depreciation.table.empty":
    "\nNessun dato di ammortamento. Le risorse con valori di acquisto e contabili verranno visualizzate qui.",
  "finance.depreciation.table.emptyAction": "\nVisualizza risorse",
  "common.unknownError": "\nErrore sconosciuto",
  "common.unauthorized": "\nNon hai accesso a questa visualizzazione",
  "errors.crossOriginRequestBlocked": "\nRichiesta multiorigine bloccata",
  "errors.invalidFileName": "\nNome file non valido",
  "errors.invalidOriginHeader": "\nIntestazione origine non valida",
  "errors.requestOriginRequired": "Impossibile verificare l'origine della richiesta",
  "errors.pageTitle": "\nErrore",
  "errors.backToDashboard": "\nTorna alla dashboard",
  "errors.genericMessage": "\nQualcosa è andato storto. Riprova o torna alla dashboard.",
  "common.pagination.page": "\nPagina {page} di {totalPages}",
  "common.pagination.ariaLabel": "\nNavigazione pagine",
  "common.pagination.resultCount": "{start}–{end} di {count}",
  "common.pagination.range": "{start}–{end} di {total}",
  "common.pagination.pageSize": "\nArticoli per pagina",
  "common.pagination.previous": "\nPagina precedente",
  "common.pagination.next": "\nPagina successiva",
  "common.pagination.pageN": "\nPagina {n}",
  "common.pagination.ellipsis": "\nAltre pagine",
  "common.sort.asc": "\nOrdinamento crescente",
  "common.sort.desc": "\nOrdina discendente",
  "common.sort.unsorted": "\nOrdina per questa colonna",
  "chat.bubble.title": "\n.bao Chat",
  "chat.bubble.placeholder": "\nAsk through .bao...",
  "chat.bubble.send": "\nInvia",
  "chat.bubble.open": "\nOpen .bao chat",
  "chat.bubble.close": "\nChiudi chat",
  "chat.bubble.intro": "\nChiedi informazioni su risorse, attività, previsioni o utilizzo.",
  "chat.bubble.assistantName": "\n.bao",
  "chat.bubble.emptyMessageError": "\nInserisci un messaggio prima di inviare.",
  "chat.bubble.sending": "\nInvio...",
  "chat.bubble.networkError": "\nErrore di rete. Per favore riprova.",
  "chat.bubble.voiceStart": "\nAvvia input vocale",
  "chat.bubble.voiceStop": "\nInterrompi input vocale",
  "chat.bubble.voiceUnsupported": "\nInserimento vocale non supportato in questo browser.",
  "chat.bubble.voiceListening": "\nAscolto...",
  "chat.bubble.contextSelectionLabel": "\nSelezione",
  "chat.bubble.contextTitle": "\nContesto intelligente",
  "chat.bubble.contextSubtitle":
    "\nIl contesto della pagina corrente, il testo selezionato e i file rilasciati vengono inseriti nella risposta successiva.",
  "chat.bubble.contextPageLabel": "\nPagina",
  "chat.bubble.contextAttachmentLabel": "\nFile",
  "chat.bubble.addFiles": "\nAggiungi file",
  "chat.bubble.smartChipSummary": "\nPagina di riepilogo",
  "chat.bubble.smartChipSummaryPrompt": "\nRiassumi il contesto più importante in questa pagina.",
  "chat.bubble.smartChipActions": "\nAzioni successive",
  "chat.bubble.smartChipActionsPrompt":
    "\nIdentifica le azioni successive in base al contesto della pagina corrente.",
  "chat.bubble.smartChipSelection": "\nSpiega la selezione",
  "chat.bubble.smartChipSelectionPrompt":
    "\nSpiega il contenuto selezionato nel contesto di questa pagina.",
  "chat.bubble.dropHint": "\nTrascina qui immagini o documenti oppure fai clic per allegarli.",
  "chat.bubble.dropMeta":
    "\nLe immagini vengono inviate ai provider multimodali quando supportate. I documenti contribuiscono al contesto estratto.",
  "chat.bubble.composeLabel": "\nRichiesta",
  "chat.bubble.composeHint": "\nPremi Invio per inviare. Utilizza Maiusc+Invio per una nuova riga.",
  "chat.bubble.attachmentMetadataOnly": "\nsolo metadati",
  "chat.bubble.attachmentUnsupported":
    "\nFile non supportato. Utilizza un documento immagine, PDF, TXT, MD, CSV, JSON, HTML o XML.",
  "chat.bubble.attachmentLimitReached": "\nPuoi allegare fino a {count} file per messaggio.",
  "chat.bubble.attachmentImageTooLarge":
    "\nL'immagine allegata supera il limite di dimensioni della chat .bao.",
  "chat.bubble.attachmentDocumentTooLarge":
    "\nIl documento allegato supera il limite di dimensioni della chat .bao.",
  "chat.bubble.attachmentRemove": "\nRimuovi allegato",
  "chat.bubble.defaultContextPrompt":
    "\nUtilizza il contesto della pagina disponibile e gli allegati per facilitare questa richiesta.",
  "chat.bubble.advisoryOnly": "SOLO CONSIGLIO – richiede approvazione umana prima dell'esecuzione.",
  "chat.systemPrompt.pageContext": "\n\n\n**Contesto della pagina corrente:**",
  "chat.systemPrompt.selectionContext": "\n\n\n**Testo della pagina selezionata:**",
  "chat.systemPrompt.attachmentContext": "\n\n\n**Contesto del file allegato:**",
  "chat.systemPrompt.relevantDocs":
    "\n\n\n**Documentazione pertinente (utilizzare per informare la risposta):**\n",
  "chat.systemPrompt.operationalContextHeader": "\n\n\n**Contesto operativo:**",
  "chat.systemPrompt.operationalCurrencyLine": "\n- Valuta commerciale predefinita: {currency}",
  "chat.systemPrompt.facilityLocalTimeLine":
    "\n- Ora locale della struttura ({timezone}): {localTime}",
  "chat.systemPrompt.facilityWeatherLine":
    "- Istantanea meteo della struttura (Open-Meteo): {tempC} °C, vento {windKmh} km/h, codice WMO {code}.",
  "chat.error.network": "\nErrore di rete. Per favore riprova.",
  "chat.error.auth": "\nAutenticazione non riuscita. Controlla la chiave API.",
  "chat.error.rateLimit": "\nLimite di velocità superato. Riprova più tardi.",
  "chat.error.invalidResponse": "\nRisposta non valida dal servizio AI.",
  "chat.error.providerError": "Errore: {message}",
  "chat.error.httpStatus": "\nHTTP {status}",
  "context7.error.fetchFailed": "\nRecupero documentazione Context7 non riuscito.",
  "context7.error.rateLimitExceeded": "\nLimite di velocità Context7 superato. Riprova più tardi.",
  "context7.error.apiKeyInvalid": "\nChiave API Context7 non valida.",
  "context7.error.searchFailed": "\nRicerca Context7 non riuscita: {status}",
  "context7.error.responseParseFailed": "\nAnalisi della risposta Context7 non riuscita.",
  "context7.error.contextFailed": "\nContesto Context7 non riuscito: {status}",
  "context7.error.textReadFailed": "\nLettura del testo Context7 non riuscita.",
  "context7.error.jsonParseFailed": "\nAnalisi JSON Context7 non riuscita.",
  "auth.signIn.rememberMe": "\nRicordami",
  "auth.signIn.recoveryHelp":
    "\nPassword dimenticata? Utilizza il flusso di ripristino della tua organizzazione.",
  "auth.signIn.accountProvisioning":
    "\nNuovo sulla piattaforma? Contatta il tuo amministratore per il provisioning dell'account.",
  "auth.signIn.requestAccess": "Request access",
  "auth.signIn.forgotPasswordLink": "\nPassword dimenticata?",
  "auth.signIn.createAccount": "\nCrea nuovo account",
  "auth.signIn.validationEmail": "\nInserisci un indirizzo email valido",
  "auth.signIn.validationPassword": "\nLa password deve contenere almeno 8 caratteri",
  "auth.signIn.heroAlt": "\nIllustrazione dell'accesso sicuro",
  "auth.signIn.errorInvalidCredentials": "\nE-mail o password non valide. Per favore riprova.",
  "auth.signIn.errorGeneric": "\nAccesso non riuscito. Per favore riprova.",
  "auth.signIn.loggedOut": "\nSei stato disconnesso. Accedi di nuovo.",
  "auth.signIn.securityEyebrow": "\nAtteggiamento di sicurezza",
  "auth.signIn.contextTitle": "\nContesto di accesso",
  "auth.signIn.contextDescription":
    "\nRiporta gli utenti nell'area di lavoro corretta, mantieni il ripristino nelle vicinanze e rendi visibile il livello di sicurezza prima dell'autenticazione.",
  "auth.signIn.destinationLabel": "\nDestinazione di ritorno",
  "auth.signIn.capabilitiesLabel": "\nMetodi di autenticazione abilitati",
  "auth.signIn.capabilityPasswordOnly":
    "\nL'autenticazione della password è attualmente abilitata.",
  "auth.signIn.capabilityPasswordPasskey":
    "\nL'autenticazione con password e chiave di accesso è abilitata per questa area di lavoro.",
  "auth.signIn.capabilityPasswordSso":
    "\nPassword e Single Sign-On sono abilitati per questa area di lavoro.",
  "auth.signIn.capabilityPasswordPasskeySso":
    "\nPassword, passkey e Single Sign-On sono abilitati per questa area di lavoro.",
  "auth.signIn.passkeyLabel": "\nOpzioni di autenticazione",
  "auth.signIn.passkeyValue": "\nPassword oggi, passkey e SSO pronti",
  "auth.signIn.methodTitle": "\nMetodi di autenticazione",
  "auth.signIn.methodDescription":
    "\nScegli il percorso di accesso per questa area di lavoro. La password rimane disponibile anche quando l'identità aziendale è abilitata.",
  "auth.signIn.methodPasswordTitle": "\nAccesso con password",
  "auth.signIn.methodPasswordDescription":
    "\nUtilizza la tua email e password per accedere direttamente allo spazio di lavoro richiesto.",
  "auth.signIn.methodPasswordBadge": "\nPredefinito",
  "auth.signIn.methodPasswordAction": "\nUtilizza password",
  "auth.signIn.methodPasskeyTitle": "\nAccesso con passkey",
  "auth.signIn.methodPasskeyDescription":
    "\nUsa una passkey del dispositivo per completare l’autenticazione senza inserire la password.",
  "auth.signIn.methodPasskeyAction": "Continua con passkey",
  "auth.signIn.methodSsoTitle": "\nAccesso singolo",
  "auth.signIn.methodSsoDescription":
    "\nContinua con il provider di identità della tua organizzazione e torna all'area di lavoro richiesta dopo la verifica.",
  "auth.signIn.methodSsoBadge": "\nConsigliato",
  "auth.signIn.methodSsoAction": "Continua con SSO",
  "auth.signIn.passkeyAutoFillHint":
    "\nSe il browser lo supporta, una passkey salvata può comparire nel completamento automatico di questa pagina.",
  "auth.signIn.passkeyPending": "\nCompleta la verifica con passkey per continuare.",
  "auth.signIn.errorPasskeyUnavailable":
    "\nL’accesso con passkey non è disponibile in questo browser.",
  "auth.signIn.errorPasskeyFailed":
    "\nNon è stato possibile completare l’accesso con passkey. Riprova.",
  "auth.signIn.errorSsoUnavailable":
    "\nIl Single Sign-On non è ancora disponibile per quest'area di lavoro.",
  "auth.signIn.errorSsoStart": "\nImpossibile avviare il Single Sign-On. Per favore riprova.",
  "auth.signIn.progressTitle": "\nFlusso di accesso",
  "auth.signIn.progressDescription":
    "\nConferma la destinazione, esegui l'autenticazione, quindi esamina il livello di sicurezza prima di accedere all'area di lavoro.",
  "auth.signIn.progressStep.destination": "\nDestinazione",
  "auth.signIn.progressStep.authenticate": "\nAutentica",
  "auth.signIn.progressStep.review": "\nControlla l'accesso",
  "auth.signIn.securityPointOne":
    "\nL'accesso basato sui ruoli mantiene isolate le superfici finanziarie, operative e di reporting.",
  "auth.signIn.securityPointTwo":
    "\nI flussi di lavoro rappresentati dal server riducono l'esposizione lato client per i dati operativi.",
  "auth.signIn.securityPointThree":
    "\nLe azioni relative a risorse, attività e report supportate da controlli rimangono tracciabili dopo l'accesso.",
  "auth.password.showPassword": "\nMostra password",
  "auth.password.hidePassword": "\nNascondi password",
  "apiExplorer.page.eyebrow": "Strumenti per sviluppatori",
  "apiExplorer.title": "\nEsploratore API",
  "api.docs.title": "Baohaus API",
  "api.docs.description": "Public, operations, and partner APIs surfaced by the Baohaus platform.",
  "apiExplorer.subtitle": "\nSfoglia tutti i percorsi, gli endpoint e le superfici registrati",
  "apiExplorer.searchLabel": "\nCerca percorsi",
  "apiExplorer.searchPlaceholder": "\nFiltra per percorso o metodo",
  "apiExplorer.filters.title": "\nPerfeziona l'inventario dei percorsi",
  "apiExplorer.filters.description":
    "\nFiltra il manifest del percorso registrato per superficie o query.",
  "apiExplorer.filters.surface": "\nSuperficie",
  "apiExplorer.table.index": "N.",
  "apiExplorer.table.method": "\nMetodo",
  "apiExplorer.table.path": "\nPercorso",
  "apiExplorer.table.surface": "\nSuperficie",
  "apiExplorer.table.action": "\nApri percorso",
  "apiExplorer.summary.filtered": "\nFiltrato",
  "apiExplorer.summary.filteredDescription":
    "\nPercorsi attualmente visibili in quest'area di lavoro",
  "apiExplorer.summary.total": "\nTotale",
  "apiExplorer.summary.totalDescription": "\nPercorsi registrati nell'applicazione",
  "apiExplorer.summary.htmlDescription": "\nPagine SSR disponibili nella shell autenticata",
  "apiExplorer.summary.apiDescription": "\nOperazioni ed endpoint API della piattaforma",
  "apiExplorer.summary.regionAria": "\nRiepilogo percorso API Explorer",
  "apiExplorer.results.title": "\nInventario percorsi",
  "apiExplorer.results.initialLimitTitle": "\nMostra le prime {shown} route",
  "apiExplorer.results.initialLimitDescription":
    "\nUsa i filtri di superficie o la ricerca per esaminare l’inventario completo di {total} route registrate.",
  "apiExplorer.results.summary": "\n{filtered} filtrato / {total} totale",
  "apiExplorer.empty.title": "\nNessun percorso corrisponde a questi filtri",
  "apiExplorer.empty.description":
    "\nCancella i filtri attuali o amplia il termine di ricerca per esaminare più parti dell'inventario dei percorsi.",
  "apiExplorer.openHtmlAria": "\nApri percorso area di lavoro",
  "apiExplorer.openEndpointAria": "\nApri endpoint",
  "apiExplorer.tab.all": "\nTutti",
  "apiExplorer.tab.api": "Interfaccia API",
  "apiExplorer.tab.html": "Vista HTML",
  "apiExplorer.tab.static": "\nStatico",
  "apiExplorer.tab.auth": "\nAut",
  "nav.apiExplorer": "\nEsploratore API",
  "customisation.title": "\nPersonalizzazione",
  "customisation.subtitle": "\nTema, preferenze e opzioni di visualizzazione",
  "customisation.theme": "\nTema",
  "customisation.themeDescription": "\nScegli la modalità chiara o scura per l'interfaccia",
  "customisation.preferences": "\nPreferenze",
  "customisation.lightMode": "\nModalità luce",
  "customisation.preferencesDescription": "\nPreferenze di visualizzazione e notifica.",
  "customisation.chatBubble": "\nMostra il fumetto della chat .bao sulla dashboard",
  "customisation.workspaceDefaults.title": "\nImpostazioni predefinite dell'area di lavoro",
  "customisation.workspaceDefaults.subtitle":
    "\nImposta la pagina di destinazione e gli assistenti che definiscono il tuo punto di partenza quotidiano.",
  "customisation.autoSaveHint": "Le modifiche vengono salvate automaticamente",
  "customisation.workspacePresets.title": "\nPreimpostazioni dell'area di lavoro",
  "customisation.workspacePresets.subtitle":
    "\nScegli le impostazioni predefinite dell'area di lavoro delle attività che rimangono fissate ai cookie dell'area di lavoro.",
  "customisation.workspacePresets.primaryView": "\nVisualizzazione attività principale",
  "customisation.workspacePresets.secondaryView": "\nVisualizzazione attività secondaria",
  "customisation.workspacePresets.taskView.activeBoard": "\nScheda attiva",
  "customisation.workspacePresets.taskView.activeBoardDescription":
    "\nApri la scheda di flusso sul lavoro attivo già in esecuzione.",
  "customisation.workspacePresets.taskView.triageBoard": "\nTabellone triage",
  "customisation.workspacePresets.taskView.triageBoardDescription":
    "\nInizia dal lavoro arretrato e dalle bozze che necessitano ancora di una decisione da parte dell'operatore.",
  "customisation.workspacePresets.taskView.dispatchQueue": "Coda di spedizione",
  "customisation.workspacePresets.taskView.dispatchQueueDescription":
    "Apri la coda con il lavoro non assegnato pronto per il personale e la pianificazione.",
  "customisation.workspacePresets.taskView.slaQueue": "\nCoda SLA",
  "customisation.workspacePresets.taskView.slaQueueDescription":
    "\nRimani al lavoro in scadenza con la pressione delle scadenze visibile per impostazione predefinita.",
  "customisation.workspacePresets.taskView.myQueue": "\nLa mia coda",
  "customisation.workspacePresets.taskView.myQueueDescription":
    "\nInizia dalle attività già possedute dall'operatore attuale.",
  "customisation.defaultLanding.title": "\nPagina di destinazione predefinita",
  "customisation.defaultLanding.description":
    "\nScegli quale area di lavoro si apre immediatamente dopo l'accesso.",
  "digitalTwin.view3D": "\nVista 3D",
  "digitalTwin.view2D": "\nVista 2D",
  "digitalTwin.viewToggle": "\nAttiva/disattiva visualizzazione gemello digitale",
  "digitalTwin.filters": "\nFiltri",
  "digitalTwin.overlays": "\nSovrapposizioni",
  "digitalTwin.loadModel": "\nCarica modello USD",
  "digitalTwin.filter.showHotspots": "\nMostra hotspot",
  "digitalTwin.filter.showGrid": "\nMostra griglia",
  "digitalTwin.filter.showAssetLabels": "\nMostra etichette delle risorse",
  "digitalTwin.badge.view3D": "Vista 3D",
  "digitalTwin.badge.stream": "Streaming",
  "digitalTwin.error.modelLoadFailed":
    "\nCaricamento del modello non riuscito. Visualizzazione di riserva.",
  "digitalTwin.error.viewerInitFailed": "\nInizializzazione del visualizzatore 3D non riuscita.",
  "nav.collapseSidebar": "\nComprimi barra laterale",
  "nav.expandSidebar": "\nEspandi barra laterale",
  "nav.commandPalette": "\nTavolozza comandi",
  "nav.commandPaletteHint": "\nCerca pagine, risorse, attività e azioni...",
  "nav.commandPaletteOpen": "\nApri la tavolozza dei comandi",
  "nav.commandPaletteDismissKey": "\nEsc",
  "nav.commandPaletteEmpty": "\nNessun risultato trovato",
  "nav.commandPaletteNavigation": "\nNavigazione",
  "nav.commandPaletteAssets": "\nRisorse",
  "nav.commandPaletteTasks": "\nCompiti",
  "nav.commandPaletteActions": "\nAzioni",
  "common.sortAsc": "\nOrdinamento crescente",
  "common.sortDesc": "\nOrdina discendente",
  "common.sortNone": "\nNon ordinati",
  "common.bulkSelect": "\nSeleziona",
  "common.bulkActions": "\nAzioni collettive",
  "common.bulkSelectAll": "\nSeleziona tutto",
  "common.clearFilters": "\nCancella tutti i filtri",
  "common.clearSelection": "\nAnnulla selezione",
  "common.selectedCount": "\n{selected} di {total} selezionato/i",
  "common.stats": "\nStatistiche",
  "common.dashboard": "\nDashboard",
  "filter.label": "\nFiltra risultati",
  "filter.resultCount": "\n{count} risultati",
  "list.empty.description": "\nNessun elemento da visualizzare",
  "nav.no_tiles": "\nNessun riquadro di navigazione",
  "nav.no_tiles.description": "\nNessun elemento disponibile in questa sezione",
  "common.filter.search": "\nCerca…",
  "common.markReviewed": "\nContrassegna come recensito",
  "common.filterChipClear": "\nRimuovi filtro",
  "common.clearAll": "\nCancella tutto",
  "common.exportCsv": "\nEsporta CSV",
  "common.dateRange": "\nIntervallo di date",
  "common.dateRange.7d": "\nUltimi 7 giorni",
  "common.dateRange.30d": "\nUltimi 30 giorni",
  "common.dateRange.90d": "\nUltimi 90 giorni",
  "common.dateRange.custom": "\nIntervallo personalizzato",
  "common.last7Days": "\nUltimi 7 giorni",
  "common.last30Days": "\nUltimi 30 giorni",
  "common.last90Days": "\nUltimi 90 giorni",
  "common.allTime": "\nTutti i tempi",
  "common.currentQuarter": "\nTrimestre corrente",
  "common.lastQuarter": "\nUltimo trimestre",
  "common.yearToDate": "\nAnno ad oggi",
  "common.addAnother": "\nAggiungi un altro",
  "common.edit": "\nModifica",
  "common.save": "\nSalva",
  "common.cancel": "\nAnnulla",
  "common.noData": "\nNessun dato disponibile",
  "common.tryAgain": "\nRiprova",
  "common.loadingSkeleton": "\nCaricamento contenuto",
  "common.stepOf": "\nPassaggio {current} di {total}",
  "common.getStarted": "\nInizia",
  "common.learnMore": "\nScopri di più",
  "common.viewAll": "\nVisualizza tutto",
  "common.collapse": "\nComprimi",
  "common.expand": "\nEspandi",
  "assets.bulkExport": "\nEsporta selezionato",
  "assets.bulkStatusUpdate": "\nAggiorna stato",
  "assets.bulkExportSuccess": "\nEsportazione preparata per {count} risorse",
  "assets.bulkStatusSuccess": "\nAggiornamento dello stato in coda per {count} risorse",
  "assets.empty": "\nNessuna risorsa trovata",
  "assets.emptyCta": "\nAggiungi dispositivo",
  "assets.mediaEmpty": "\nNessun supporto: trascina i file qui o fai clic per caricarli",
  "assets.mediaFormats": "\nAccettati: JPEG, PNG, WebP",
  "assets.mediaMaxSize": "\nDimensione massima file: 10 MB",
  "assets.editAsset": "\nModifica risorsa",
  "assets.detail.metadata": "\nMetadati della risorsa",
  "assets.detail.pinnedTitle": "\nMessa a fuoco bloccata",
  "assets.detail.pinnedDescription":
    "\nMantieni bloccata la scheda corrente mentre ti sposti tra le visualizzazioni del rischio, del ciclo di vita e della governance.",
  "assets.detail.pinnedBadge": "\nAppuntato",
  "assets.detail.pinnedCurrent": "\nVista bloccata corrente",
  "assets.detail.pinnedOpen": "\nApri vista bloccata",
  "assets.detail.pinnedReset": "\nRipristina panoramica",
  "assets.detail.unresolvedInspectionEmpty": "\nNessuna ispezione ancora registrata.",
  "assets.detail.unresolvedRisk": "\nAtteggiamento al rischio",
  "assets.detail.unresolvedRiskDescription":
    "\nEsaminare gli attuali fattori di rischio, i segnali AI e le ispezioni scadute.",
  "assets.detail.unresolvedLifecycle": "\nPostura nel ciclo di vita",
  "assets.detail.unresolvedLifecycleDescription":
    "\nEsamina il costo del ciclo di vita, la vita rimanente e la pianificazione della sostituzione.",
  "assets.detail.unresolvedGovernance": "\nPosizione di governance",
  "assets.detail.unresolvedGovernanceDescription":
    "\nEsaminare la governance FM, la copertura della conformità e i record collegati.",
  "assets.detail.unresolvedTitle": "\nAree di interesse irrisolte",
  "assets.detail.unresolvedDescription":
    "\nUtilizza questi punti di ingresso per passare direttamente al successivo problema relativo alle risorse irrisolte.",
  "assets.detail.unresolvedBadge": "\nNecessita di revisione",
  "assets.detail.summaryTitle": "\nRiepilogo dell'area di lavoro",
  "assets.detail.summaryDescription":
    "Mantieni visibili il contesto corrente della risorsa, l'ultima ispezione e il carico di lavoro collegato durante la navigazione.",
  "assets.detail.summarySiteDescription": "\nTipo di sito e risorsa",
  "assets.detail.summaryInspectionTitle": "\nUltima ispezione",
  "assets.detail.summaryInspectionDescription":
    "\nStato dell'ispezione più recente registrato su questa risorsa.",
  "assets.detail.summaryInspectionSupporting":
    "\nLa cronologia delle ispezioni segue il registro di manutenzione condiviso.",
  "assets.detail.summaryWorkOrderTitle": "\nOrdini di lavoro collegati",
  "assets.detail.summaryWorkOrderDescription":
    "\nCarico di lavoro collegato corrente nell'attività del ciclo di vita.",
  "assets.detail.navigatorTitle": "\nNavigatore di sezione",
  "assets.detail.navigatorDescription":
    "\nSpostati tra le sezioni dei dettagli della risorsa senza perdere il contesto corrente della risorsa.",
  "assets.detail.priorityTitle": "\nPriorità e performance del rischio",
  "assets.detail.priorityDescription":
    "\nPosizione derivata per la definizione delle priorità di manutenzione basata sul rischio utilizzando la condizione attuale, il lavoro aperto, le ispezioni e i segnali di previsione dell'intelligenza artificiale.",
  "assets.detail.priorityStateStable": "\nStabile",
  "assets.detail.priorityStateWatch": "\nGuarda",
  "assets.detail.priorityStateCritical": "\nCritico",
  "assets.detail.priorityAlertCriticalTitle": "\nSi consiglia un intervento immediato",
  "assets.detail.priorityAlertCriticalDescription":
    "\n{count} segnali di previsione critici, condizioni vincolate o ispezioni scadute stanno portando questa risorsa in cima alla coda.",
  "assets.detail.priorityAlertWatchTitle": "\nSono richiesti monitoraggio e pianificazione attivi",
  "assets.detail.priorityAlertWatchDescription":
    "\n{count} attività aperte, lavoro attivo o segnali non critici richiedono ancora l'attenzione dell'operatore per questa risorsa.",
  "assets.detail.priorityAlertStableTitle":
    "\nL'asset opera entro il livello di riferimento controllato",
  "assets.detail.priorityAlertStableDescription":
    "\nNessuna condizione attiva, ispezione, ordine di lavoro o previsione sta attualmente elevando questa risorsa.",
  "assets.detail.priorityConditionDriver":
    "\nLa postura delle condizioni contribuisce alla definizione delle priorità.",
  "assets.detail.prioritySignalsDriver":
    "\nI segnali di previsione dell'intelligenza artificiale stanno aumentando l'urgenza dell'intervento.",
  "assets.detail.priorityInspectionsDriver":
    "\nLe ispezioni scadute stanno limitando la preparazione.",
  "assets.detail.priorityWorkOrdersDriver":
    "\nGli ordini di lavoro attivi indicano un carico di lavoro operativo non risolto.",
  "assets.detail.priorityTasksDriver":
    "\nIl backlog delle attività aperte richiede ancora l'attenzione delle risorse.",
  "assets.detail.priorityNoDrivers": "\nNessun driver di priorità attivo.",
  "assets.detail.priorityUtilisationTitle": "\nOre di utilizzo",
  "assets.detail.priorityUtilisationDescription":
    "\nSegnale delle ore di funzionamento monitorate attualmente conservato su questo record di asset.",
  "assets.detail.priorityOpenTasksTitle": "\nAttività aperte",
  "assets.detail.priorityOpenTasksDescription":
    "\nAttività arretrate, pianificate e in corso collegate a questa risorsa.",
  "assets.detail.priorityInspectionsTitle": "\nIspezioni scadute",
  "assets.detail.priorityInspectionsDescription":
    "\nAttività di ispezione scadute e ancora irrisolte.",
  "assets.detail.priorityWorkOrdersTitle": "\nOrdini di lavoro attivi",
  "assets.detail.priorityWorkOrdersDescription":
    "\nGli ordini di lavoro collegati sono ancora in fase di consegna operativa.",
  "assets.detail.priorityPredictionsTitle": "\nSegnali di previsione recenti",
  "assets.detail.priorityPredictionsDescription":
    "\n{count} segnali di previsione totali sono attualmente collegati a questa risorsa.",
  "assets.detail.priorityPredictionsEmpty":
    "Nessun segnale di previsione è attualmente collegato a questa risorsa.",
  "assets.detail.priorityPredictionsColumnType": "\nSegnale",
  "assets.detail.priorityPredictionsColumnSeverity": "\nGravità",
  "assets.detail.priorityPredictionsColumnRemainingLife": "\nVita rimanente",
  "assets.detail.priorityPredictionsColumnConfidence": "\nFiducia",
  "assets.detail.priorityPredictionsColumnAction": "\nAzione generata",
  "assets.detail.priorityPredictionsRemainingLifeValue": "\n{days} giorni",
  "assets.detail.priorityGeneratedTask": "\nAttività generata",
  "assets.detail.priorityGeneratedWorkOrderAria": "\nApri ordine di lavoro generato {number}",
  "assets.detail.priorityNoAction": "\nNessuna azione generata",
  "assets.detail.readinessTitle": "\nProntezza operativa e disponibilità",
  "assets.detail.readinessDescription":
    "\nStato di preparazione a livello di risorsa utilizzando record di controllo di intervallo, sicurezza, target e GFE collegati insieme al carico di lavoro corrente di ispezione e consegna.",
  "assets.detail.readinessStateReady": "\nPronto",
  "assets.detail.readinessStateWatch": "\nGuarda",
  "assets.detail.readinessStateConstrained": "\nVincolato",
  "assets.detail.readinessAlertConstrainedTitle":
    "\nLa disponibilità operativa è attualmente limitata",
  "assets.detail.readinessAlertConstrainedDescription":
    "\nI record di controllo collegati {controls} richiedono un'azione e le attività di ispezione scadute {inspections} rimangono aperte per questa risorsa.",
  "assets.detail.readinessAlertCoverageGapTitle":
    "\nÈ necessario stabilire la copertura della preparazione",
  "assets.detail.readinessAlertCoverageGapDescription":
    "\nQuesta risorsa collegata alle capacità non è ancora supportata dai record di controllo operativo collegati per {capability}. Acquisisci i controlli di disponibilità per ripristinare la visibilità della disponibilità diretta.",
  "assets.detail.readinessAlertWatchTitle":
    "\nLa preparazione dovrebbe essere monitorata attentamente",
  "assets.detail.readinessAlertWatchDescription":
    "\nI record di controllo collegati {controls} rimangono sotto sorveglianza e gli ordini di lavoro attivi {workOrders} continuano a influenzare questa risorsa.",
  "assets.detail.readinessAlertReadyTitle":
    "\nNessun blocco della prontezza attivo è attualmente registrato",
  "assets.detail.readinessAlertReadyDescription":
    "\nI record di controllo collegati {controls} sono attualmente disponibili e conformi per questa risorsa.",
  "assets.detail.readinessControlDriver":
    "\nI record di controllo operativo collegati mancano o mostrano pressioni sulla disponibilità anticipata.",
  "assets.detail.readinessComplianceDriver":
    "\nL'atteggiamento di conformità sta limitando attivamente la disponibilità delle risorse.",
  "assets.detail.readinessConditionDriver":
    "\nLa condizione delle risorse contribuisce all'attuale stato di preparazione.",
  "assets.detail.readinessInspectionDriver":
    "\nLe ispezioni scadute stanno limitando la disponibilità operativa.",
  "assets.detail.readinessWorkOrderDriver":
    "\nGli ordini di lavoro attivi continuano a influenzare la disponibilità delle risorse.",
  "assets.detail.readinessTaskDriver":
    "\nLe attività operative aperte devono ancora essere compensate con questa risorsa.",
  "assets.detail.readinessCapabilityDriver":
    "\nLe risorse simili nella stessa fascia di capacità rimangono limitate.",
  "assets.detail.readinessNoDrivers": "\nNessun driver di preparazione attivo.",
  "assets.detail.readinessDriversTitle": "\nDriver di preparazione",
  "assets.detail.readinessCapabilityValue": "\nCapacità: {capability}",
  "assets.detail.readinessLinkedControlsTitle": "\nRecord di controllo collegati",
  "assets.detail.readinessLinkedControlsDescription":
    "\n{available} attualmente disponibile o compatibile, ultimo aggiornamento {timestamp}.",
  "assets.detail.readinessLinkedControlsEmptyDescription":
    "\nNessun record di controllo operativo collegato è stato ancora acquisito per questa risorsa.",
  "assets.detail.readinessActionRequiredTitle": "\nControlli che richiedono un'azione",
  "assets.detail.readinessActionRequiredDescription":
    "\n{watch} ulteriori record di controllo rimangono sotto sorveglianza.",
  "assets.detail.readinessInspectionTitle": "\nIspezioni scadute",
  "assets.detail.readinessInspectionDescription":
    "Attività di ispezione scadute e ancora irrisolte.",
  "assets.detail.readinessWorkOrdersTitle": "\nOrdini di lavoro attivi",
  "assets.detail.readinessWorkOrdersDescription":
    "\nOrdini di lavoro collegati attualmente in fase di consegna operativa.",
  "assets.detail.readinessTasksTitle": "\nAttività operative aperte",
  "assets.detail.readinessTasksDescription":
    "\nIl lavoro arretrato, programmato e in corso è ancora collegato a questa risorsa.",
  "assets.detail.readinessCapabilityTitle": "\nGruppo di capacità",
  "assets.detail.readinessCapabilityValueShort": "\n{ready}/{total} pronto",
  "assets.detail.readinessCapabilityDescription":
    "\nLe risorse peer {constrained} rimangono vincolate in questo gruppo di capacità collegate.",
  "assets.detail.readinessCapabilityEmptyDescription":
    "\nNessun collegamento di capacità operativa attualmente acquisito per questa risorsa.",
  "assets.detail.readinessRecordsTitle": "\nRecord di disponibilità collegati",
  "assets.detail.readinessRecordsDescription":
    "\nRecord recenti di controllo di portata, sicurezza, mira e GFE collegati direttamente a questa risorsa.",
  "assets.detail.readinessRecordsEmpty":
    "\nNessun record di disponibilità o disponibilità collegato è stato ancora acquisito per questa risorsa.",
  "assets.detail.readinessControlColumn": "\nControllo",
  "assets.detail.readinessOperationalColumn": "\nPostura operativa",
  "assets.detail.readinessComplianceColumn": "\nAtteggiamento di conformità",
  "assets.detail.readinessSignalColumn": "\nSegnale operativo",
  "assets.detail.readinessUpdatedColumn": "\nAggiornato",
  "assets.detail.readinessSignalMetric": "{value} ",
  "assets.detail.readinessSignalMetricWithUnit": "Valore: {value} {unit}",
  "assets.detail.readinessSignalTargetDate": "\nData prevista {date}",
  "assets.detail.readinessSignalNone": "\nNessun segnale operativo ancora registrato.",
  "assets.detail.readinessOpenWorkspace": "\nSpazio di lavoro aperto",
  "assets.detail.readinessOpenWorkspaceAria": "\nSpazio di lavoro aperto",
  "assets.detail.fmGovernanceTitle": "\nGovernance FM e posizione di conformità",
  "assets.detail.fmGovernanceDescription":
    "\nGovernance della gestione delle strutture a livello di asset utilizzando programmi SFG20 collegati, ispezioni statutarie, registri di conformità e attività di consegna connesse.",
  "assets.detail.fmGovernanceStateAssured": "\nSicuro",
  "assets.detail.fmGovernanceStateWatch": "\nGuarda",
  "assets.detail.fmGovernanceStateActionRequired": "\nAzione richiesta",
  "assets.detail.fmGovernanceAlertActionRequiredTitle":
    "\nLa governance del FM richiede attenzione immediata",
  "assets.detail.fmGovernanceAlertActionRequiredDescription":
    "\nI record di governance collegati {attention} richiedono un'azione e gli elementi della pianificazione {overdue} sono già scaduti per questa risorsa.",
  "assets.detail.fmGovernanceAlertCoverageGapTitle":
    "\nLa copertura della governance FM non è stata stabilita",
  "assets.detail.fmGovernanceAlertCoverageGapDescription":
    "\nNessun record di governance FM collegato è attualmente acquisito per questa risorsa. Aggiungi record statutari, SFG20 o di governance dei servizi per ripristinare la visibilità della garanzia.",
  "assets.detail.fmGovernanceAlertWatchTitle":
    "\nLa governance del FM dovrebbe essere monitorata attentamente",
  "assets.detail.fmGovernanceAlertWatchDescription":
    "\nI record di governance collegati {watch} rimangono sotto sorveglianza, la scadenza per {dueSoon} è imminente e gli ordini di lavoro collegati {workOrders} sono ancora attivi.",
  "assets.detail.fmGovernanceAlertAssuredTitle": "\nLa governance del FM è attualmente assicurata",
  "assets.detail.fmGovernanceAlertAssuredDescription":
    "\nI {linked} record di governance collegati sono attualmente monitorati senza blocchi di conformità FM attivi per questa risorsa.",
  "assets.detail.fmGovernanceCoverageDriver":
    "\nPer questa risorsa manca la copertura della governance FM collegata.",
  "assets.detail.fmGovernanceAttentionDriver":
    "\nUno o più record di governance FM richiedono già un'azione correttiva.",
  "assets.detail.fmGovernanceMonitoringDriver":
    "\nI dati di governance rimangono sotto sorveglianza e necessitano di un attento monitoraggio.",
  "assets.detail.fmGovernanceScheduleDriver":
    "\nLe date di governance imminenti o scadute determinano la situazione attuale.",
  "assets.detail.fmGovernanceWorkOrdersDriver":
    "Gli ordini di lavoro collegati stanno ancora spostando le azioni di governance FM fino alla consegna.",
  "assets.detail.fmGovernanceNoDrivers": "\nNessun driver di governance FM attivo.",
  "assets.detail.fmGovernanceDriversTitle": "\nFattori di governance della FM",
  "assets.detail.fmGovernanceLinkedRecordsTitle": "\nRecord di governance collegati",
  "assets.detail.fmGovernanceLinkedRecordsDescription":
    "\nUltima attività di governance aggiornata {timestamp}.",
  "assets.detail.fmGovernanceLinkedRecordsEmptyDescription":
    "\nNessun record di governance FM è stato ancora collegato a questa risorsa.",
  "assets.detail.fmGovernanceAttentionTitle": "\nRegistrazioni di attenzione",
  "assets.detail.fmGovernanceAttentionDescription":
    "\n{watch} ulteriori record di governance rimangono sotto sorveglianza.",
  "assets.detail.fmGovernanceScheduleTitle": "\nProgrammi scaduti",
  "assets.detail.fmGovernanceScheduleDescription":
    "\n{dueSoon} ulteriori record di governance saranno rilasciati a breve.",
  "assets.detail.fmGovernanceWorkOrdersTitle": "\nOrdini di lavoro collegati attivi",
  "assets.detail.fmGovernanceWorkOrdersDescription":
    "\nOrdini di lavoro collegati direttamente alla consegna della governance FM per questa risorsa.",
  "assets.detail.fmGovernanceStatutoryTitle": "\nIspezioni regolamentari",
  "assets.detail.fmGovernanceStatutoryDescription":
    "\nDocumenti di governance dell'ispezione legale diretta collegati a questa risorsa.",
  "assets.detail.fmGovernanceSfg20Title": "\nOrari SFG20",
  "assets.detail.fmGovernanceSfg20Description":
    "\nPiani di manutenzione SFG20 collegati monitorati rispetto a questa risorsa.",
  "assets.detail.fmGovernanceRecordsTitle": "\nRecord recenti di governance FM",
  "assets.detail.fmGovernanceRecordsDescription":
    "\nDocumenti recenti sulla governance della gestione delle strutture collegati direttamente a questa risorsa.",
  "assets.detail.fmGovernanceRecordsEmpty":
    "\nNessun record di governance o conformità FM è stato ancora acquisito per questa risorsa.",
  "assets.detail.fmGovernanceRecordColumn": "\nRegistra",
  "assets.detail.fmGovernanceDomainColumn": "\nDominio",
  "assets.detail.fmGovernancePostureColumn": "\nPostura",
  "assets.detail.fmGovernanceDueColumn": "\nScadenza e misura",
  "assets.detail.fmGovernanceWorkOrderColumn": "\nOrdine di lavoro collegato",
  "assets.detail.fmGovernanceUpdatedColumn": "\nAggiornato",
  "assets.detail.fmGovernanceDueOverdue": "\nIn ritardo",
  "assets.detail.fmGovernanceDueSoon": "\nA breve",
  "assets.detail.fmGovernanceDueScheduled": "\nProgrammato",
  "assets.detail.fmGovernanceDueUnset": "\nNessuna data di scadenza",
  "assets.detail.fmGovernanceDueDateValue": "\nScadenza {date}",
  "assets.detail.fmGovernanceDueUnsetDescription":
    "\nAl momento non è registrata alcuna data di scadenza per questo elemento di governance.",
  "assets.detail.fmGovernanceMetricValue": "\n{value} registrato",
  "assets.detail.fmGovernanceMetricValueWithUnit": "\n{value} {unit} registrato",
  "assets.detail.fmGovernanceNoWorkOrder": "\nNessun ordine di lavoro collegato",
  "assets.detail.fmGovernanceLinkedWorkOrdersValue": "\n{count} ordini di lavoro collegati",
  "assets.detail.fmGovernanceOpenWorkspace": "\nSpazio di lavoro aperto",
  "assets.detail.fmGovernanceOpenWorkspaceAria": "\nSpazio di lavoro aperto",
  "assets.detail.fmGovernanceOpenWorkOrderAria":
    "\nOrdine di lavoro aperto sulla governance FM {number}",
  "assets.detail.performanceTitle": "\nMonitoraggio dell'utilizzo e delle prestazioni",
  "assets.detail.performanceDescription":
    "\nStato di utilizzo in tempo reale per questa risorsa utilizzando i dati di telemetria acquisiti, le ore di funzionamento del registro e il carico di lavoro operativo collegato.",
  "assets.detail.performanceStateBlindSpot": "\nPunto cieco della telemetria",
  "assets.detail.performanceStateStale": "\nTelemetria non aggiornata",
  "assets.detail.performanceAlertBlindSpotTitle":
    "\nLa telemetria sull'utilizzo in tempo reale non è ancora disponibile",
  "assets.detail.performanceAlertBlindSpotDescription":
    "\nQuesta risorsa attualmente si basa sulla base di riferimento del registro di {current} finché la telemetria di utilizzo non inizia a generare report.",
  "assets.detail.performanceAlertStaleTitle": "\nLa telemetria di utilizzo richiede attenzione",
  "assets.detail.performanceAlertStaleDescription":
    "\nL'ultimo campione di utilizzo è stato acquisito {timestamp}. Aggiorna la copertura del dispositivo o della telemetria per ripristinare il monitoraggio corrente.",
  "assets.detail.performanceAlertOverTitle":
    "\nL'asset funziona al di sopra della fascia di utilizzo ottimale",
  "assets.detail.performanceAlertOverDescription":
    "L'utilizzo attuale è {current} rispetto a una media di {average}, con {critical} segnali critici già collegati a questa risorsa.",
  "assets.detail.performanceAlertUnderTitle":
    "\nL'utilizzo è inferiore alla fascia operativa prevista",
  "assets.detail.performanceAlertUnderDescription":
    "\nL'utilizzo attuale è {current} rispetto a una media di {average}. Esamina i vincoli di distribuzione, disponibilità o pianificazione.",
  "assets.detail.performanceAlertWatchTitle":
    "\nL'utilizzo dovrebbe essere monitorato attentamente",
  "assets.detail.performanceAlertWatchDescription":
    "\nL'utilizzo attuale è {current} rispetto a una media di {average}. La risorsa si sta avvicinando a una situazione di sovra o sottoutilizzo.",
  "assets.detail.performanceAlertOptimalTitle":
    "\nL'utilizzo rientra nella fascia operativa equilibrata",
  "assets.detail.performanceAlertOptimalDescription":
    "\nL'utilizzo attuale è {current} rispetto a una media di {average} e la copertura telemetrica è attiva per questa risorsa.",
  "assets.detail.performanceRecordedHoursTitle": "\nOre di funzionamento registrate",
  "assets.detail.performanceRecordedHoursValue": "\n{hours} ore",
  "assets.detail.performanceRecordedHoursDescription":
    "\nCifra delle ore di funzionamento monitorate attualmente memorizzata nel record dell'asset.",
  "assets.detail.performanceCurrentTitle": "\nUtilizzo attuale",
  "assets.detail.performanceCurrentDescription":
    "\nUltimi dati di telemetria sull'utilizzo acquisiti per questa risorsa.",
  "assets.detail.performanceCurrentFallbackDescription":
    "\nLa situazione attuale utilizza la base delle ore di funzionamento del registro perché non è disponibile la telemetria.",
  "assets.detail.performanceAverageTitle": "\nUtilizzo medio",
  "assets.detail.performanceAverageDescription":
    "\nUtilizzo medio dei campioni di telemetria acquisiti.",
  "assets.detail.performanceCoverageTitle": "\nCopertura telemetrica",
  "assets.detail.performanceCoverageDescription":
    "\n{timestamp} è stato l'ultimo campione di utilizzo acquisito per questa risorsa.",
  "assets.detail.performanceCoverageEmptyDescription":
    "\nNessun campione di telemetria di utilizzo è stato ancora acquisito per questa risorsa.",
  "assets.detail.performanceTasksTitle": "\nCarico di lavoro operativo aperto",
  "assets.detail.performanceTasksDescription":
    "\nAttività aperte ancora collegate a questa risorsa durante la consegna di ispezione e manutenzione.",
  "assets.detail.performanceSignalsTitle": "\nSegnali di previsione",
  "assets.detail.performanceSignalsDescription":
    "\n{count} segnali critici sono attualmente collegati a questa risorsa.",
  "assets.detail.performanceSamplesTitle": "\nEsempi di utilizzo recente",
  "assets.detail.performanceSamplesDescription":
    "\nEsempi di telemetria recenti per questa risorsa, con un intervallo corrente compreso tra {min} e {max} e {activeWorkOrders} ordini di lavoro attivi in corso.",
  "assets.detail.performanceSamplesEmpty":
    "\nNon è stata ancora acquisita alcuna telemetria sull'utilizzo per questa risorsa.",
  "assets.detail.performanceTimestampColumn": "\nCatturato",
  "assets.detail.performanceUtilisationColumn": "\nUtilizzo",
  "assets.detail.performancePostureColumn": "\nPostura",
  "assets.detail.performanceOpenWorkspace": "\nApri spazio di lavoro di utilizzo",
  "assets.detail.performanceOpenWorkspaceAria": "\nApri spazio di lavoro di utilizzo",
  "assets.detail.replacementTitle": "\nPianificazione della sostituzione e postura del capitale",
  "assets.detail.replacementDescription":
    "\nPosizione di sostituzione derivata per questa risorsa utilizzando lo stato del ciclo di vita, la condizione, i segnali di previsione dell'intelligenza artificiale e il lavoro di sostituzione attivo.",
  "assets.detail.replacementStateBaseline": "\nRiferimento",
  "assets.detail.replacementStatePlan": "\nPiano",
  "assets.detail.replacementStateReplace": "\nSostituisci",
  "assets.detail.replacementAlertReplaceTitle":
    "\nEsegui la pianificazione della sostituzione adesso",
  "assets.detail.replacementAlertReplaceDescription":
    "Segnali urgenti relativi a ciclo di vita, condizione, previsione o ordine di lavoro attivo indicano che questa risorsa dovrebbe passare all'esecuzione di sostituzione attiva.",
  "assets.detail.replacementAlertPlanTitle": "\nPreparare la causa capitale",
  "assets.detail.replacementAlertPlanDescription":
    "\nLa pressione emergente del ciclo di vita o il lavoro di sostituzione in coda significa che questa risorsa dovrebbe essere inserita nella pianificazione finanziaria e nella revisione della sostituzione.",
  "assets.detail.replacementAlertBaselineTitle":
    "\nNon viene rilevata alcuna pressione di sostituzione attiva",
  "assets.detail.replacementAlertBaselineDescription":
    "\nIl ciclo di vita, le condizioni e i segnali di lavoro attuali non richiedono ancora una risposta di pianificazione della sostituzione per questa risorsa.",
  "assets.detail.replacementLifecycleDriver":
    "\nLa postura del ciclo di vita sta spingendo questa risorsa verso la sostituzione.",
  "assets.detail.replacementConditionDriver":
    "\nIl degrado delle condizioni contribuisce alla pianificazione della sostituzione.",
  "assets.detail.replacementPredictionDriver":
    "\nI segnali di previsione indicano una pista con vita residua più breve.",
  "assets.detail.replacementTasksDriver":
    "\nLe attività di sostituzione sono già in coda per questa risorsa.",
  "assets.detail.replacementWorkOrdersDriver":
    "\nGli ordini di lavoro sostitutivi attivi mostrano che la consegna è già in corso.",
  "assets.detail.replacementNoDrivers": "\nNessun driver sostitutivo attivo.",
  "assets.detail.replacementDriversTitle": "\nDriver sostitutivi",
  "assets.detail.replacementBookValueTitle": "\nValore contabile attuale",
  "assets.detail.replacementBookValueDescription":
    "\nValore contabile corrente detenuto rispetto a questo record di attività.",
  "assets.detail.replacementAdjustedValueTitle": "\nValore sostitutivo rettificato",
  "assets.detail.replacementAdjustedValueDescription":
    "\nValore di sostituzione stimato adeguato in base alla gravità della previsione corrente.",
  "assets.detail.replacementCapitalGapTitle": "\nGap di capitale",
  "assets.detail.replacementCapitalGapDescription":
    "\nScostamento rispetto al valore contabile corrente: {percent}.",
  "assets.detail.replacementLifeTitle": "\nVita rimanente",
  "assets.detail.replacementLifeValue": "\n{days} giorni",
  "assets.detail.replacementLifeDescription":
    "\nUltimo segnale di vita residua prevista, se disponibile.",
  "assets.detail.replacementTasksTitle": "\nAttività di sostituzione",
  "assets.detail.replacementTasksDescription":
    "\n{count} gli ordini di lavoro sostitutivi attivi sono attualmente collegati a questa risorsa.",
  "assets.detail.replacementActionsTitle": "\nAzioni di sostituzione attive",
  "assets.detail.replacementActionsDescription":
    "\nAttività di sostituzione recenti e ordini di lavoro collegati che attualmente determinano la consegna di sostituzione.",
  "assets.detail.replacementActionsEmpty":
    "\nNessuna azione di sostituzione attiva è ancora collegata a questa risorsa.",
  "assets.detail.replacementPriorityColumn": "\nPriorità",
  "assets.detail.replacementStatusColumn": "\nStato",
  "assets.detail.replacementWorkOrderColumn": "\nOrdine di lavoro collegato",
  "assets.detail.replacementAssigneeColumn": "\nAssegnatario",
  "assets.detail.replacementDeadlineColumn": "\nScadenza",
  "assets.detail.replacementUpdatedColumn": "\nAggiornato",
  "assets.detail.replacementStandalone": "\nAttività di sostituzione autonoma",
  "assets.detail.replacementNoAssignee": "\nNessun assegnatario",
  "assets.detail.replacementNoDeadline": "\nNessuna scadenza",
  "assets.detail.replacementOpenPlanning": "\nPianificazione finanza aperta",
  "assets.detail.replacementOpenPlanningAria":
    "Area di lavoro di pianificazione finanziaria aperta",
  "assets.detail.replacementOpenWorkOrderAria": "\nApri ordine di lavoro sostitutivo {number}",
  "assets.detail.inspectionsTitle": "\nRegistri di ispezione",
  "assets.detail.inspectionsDescription":
    "\nAttività di ispezione recenti e ordini di lavoro collegati per questa risorsa, ordinati in base all'ultima attività operativa.",
  "assets.detail.inspectionsEmpty":
    "\nNessun record di ispezione è stato ancora acquisito per questa risorsa.",
  "assets.detail.inspectionsStatus": "\nStato ispezione",
  "assets.detail.inspectionsWorkOrder": "\nOrdine di lavoro collegato",
  "assets.detail.inspectionsAssignee": "\nAssegnatario",
  "assets.detail.inspectionsDeadline": "\nScadenza",
  "assets.detail.inspectionsCompleted": "\nCompletato",
  "assets.detail.inspectionsUpdated": "\nAggiornato",
  "assets.detail.inspectionsStandalone": "\nAttività di ispezione autonoma",
  "assets.detail.inspectionsUnassigned": "\nNessun assegnatario",
  "assets.detail.inspectionsNoDeadline": "\nNessuna scadenza",
  "assets.detail.inspectionsNoCompletion": "\nNon completato",
  "assets.detail.maintenanceTitle": "\nAttività di manutenzione",
  "assets.detail.maintenanceDescription":
    "Lavori recenti di riparazione, calibrazione e di emergenza collegati a questa risorsa, incluso lo stato dell'attività e la consegna dell'ordine di lavoro connesso.",
  "assets.detail.maintenanceAlertActiveTitle": "\nIl carico di lavoro di manutenzione è attivo",
  "assets.detail.maintenanceAlertActiveDescription":
    "\n{openTasks} attività di manutenzione aperte e {activeWorkOrders} ordini di lavoro attivi sono attualmente collegati a questa risorsa.",
  "assets.detail.maintenanceAlertIdleTitle":
    "\nNessun carico di lavoro di manutenzione attivo è aperto",
  "assets.detail.maintenanceAlertIdleDescription":
    "\nNon sono presenti elementi di riparazione, calibrazione o lavoro di emergenza attivi attualmente collegati a questa risorsa.",
  "assets.detail.maintenanceOpenTasksTitle": "\nAttività di manutenzione aperte",
  "assets.detail.maintenanceOpenTasksDescription":
    "\nRiparazione, calibrazione e attività di emergenza ancora in volo.",
  "assets.detail.maintenanceCompletedTasksTitle": "\nAttività di manutenzione completate",
  "assets.detail.maintenanceCompletedTasksDescription":
    "\nAttività di manutenzione già chiuse per questa risorsa.",
  "assets.detail.maintenanceActiveWorkOrdersTitle": "\nOrdini di lavoro di manutenzione attivi",
  "assets.detail.maintenanceActiveWorkOrdersDescription":
    "\nGli ordini di lavoro collegati sono ancora in fase di consegna operativa.",
  "assets.detail.maintenanceCompletedWorkOrdersTitle":
    "\nOrdini di lavoro di manutenzione completati",
  "assets.detail.maintenanceCompletedWorkOrdersDescription":
    "\nOrdini di lavoro collegati già completati per questa risorsa.",
  "assets.detail.maintenanceRecordsTitle": "\nRegistri di manutenzione recenti",
  "assets.detail.maintenanceRecordsDescription":
    "\nLe ultime attività di manutenzione e gli ordini di lavoro collegati, ordinati per movimento più recente.",
  "assets.detail.maintenanceEmpty":
    "\nPer questa risorsa non è stata ancora acquisita alcuna registrazione di riparazione, calibrazione o manutenzione di emergenza.",
  "assets.detail.maintenanceTypeColumn": "\nTipo",
  "assets.detail.maintenancePriorityColumn": "\nPriorità",
  "assets.detail.maintenanceStatusColumn": "\nStato",
  "assets.detail.maintenanceWorkOrderColumn": "\nOrdine di lavoro collegato",
  "assets.detail.maintenanceAssigneeColumn": "\nAssegnatario",
  "assets.detail.maintenanceDeadlineColumn": "\nScadenza",
  "assets.detail.maintenanceCompletedColumn": "\nCompletato",
  "assets.detail.maintenanceUpdatedColumn": "\nAggiornato",
  "assets.detail.maintenanceStandalone": "\nAttività di manutenzione autonoma",
  "assets.detail.maintenanceNoAssignee": "\nNessun assegnatario",
  "assets.detail.maintenanceNoDeadline": "\nNessuna scadenza",
  "assets.detail.maintenanceNoCompletion": "\nNon completato",
  "assets.detail.maintenanceOpenWorkOrders": "\nOrdini di lavoro aperti",
  "assets.detail.maintenanceOpenWorkOrdersAria": "\nApri area di lavoro ordini di lavoro",
  "assets.detail.maintenanceOpenWorkOrderAria": "\nApri ordine di lavoro di manutenzione {number}",
  "assets.detail.costsTitle": "\nAllocazione dei costi del ciclo di vita",
  "assets.detail.costsDescription":
    "\nAttribuzione recente dei costi dell'ordine di lavoro collegati a questa risorsa, inclusi manodopera, materiali e altre spese operative.",
  "assets.detail.costsEmpty":
    "\nNessun record di costo dell'ordine di lavoro collegato è stato ancora acquisito per questa risorsa.",
  "assets.detail.costsTotalTitle": "\nCosto collegato totale",
  "assets.detail.costsTotalDescription": "\n{count} ordini di lavoro collegati",
  "assets.detail.costsActiveTitle": "\nOrdini di lavoro attivi",
  "assets.detail.costsActiveDescription":
    "\nCarico di lavoro operativo ancora in corso per questa risorsa.",
  "assets.detail.costsLabourTitle": "\nAllocazione manodopera",
  "assets.detail.costsLabourDescription":
    "\nCosto totale della manodopera registrato negli ordini di lavoro collegati.",
  "assets.detail.costsMaterialTitle": "\nAllocazione materiale",
  "assets.detail.costsMaterialDescription":
    "\nImpegni materiali collegati tramite la consegna dell'ordine di lavoro.",
  "assets.detail.costsWorkOrder": "\nOrdine di lavoro",
  "assets.detail.costsStatus": "\nStato",
  "assets.detail.costsLabourColumn": "\nManodopera",
  "assets.detail.costsMaterialColumn": "\nMateriale",
  "assets.detail.costsOtherColumn": "\nAltro",
  "assets.detail.costsTotalColumn": "\nTotale",
  "assets.detail.costsUpdatedColumn": "\nUltimo movimento",
  "assets.detail.costsCompletedValue": "\nCompletato {date}",
  "assets.lifecycleProfile.title": "\nProfilo di gestione del ciclo di vita",
  "assets.lifecycleProfile.description":
    "\nTieni traccia delle condizioni operative attuali, dello stato del ciclo di vita e dell'ultima ispezione confermata per questa risorsa.",
  "assets.lifecycleProfile.conditionLabel": "\nCondizione",
  "assets.lifecycleProfile.conditionHint":
    "\nImposta la condizione operativa corrente utilizzata dall'analisi del ciclo di vita, dal reporting di disponibilità e dalla definizione delle priorità.",
  "assets.lifecycleProfile.lifecycleLabel": "\nFase del ciclo di vita",
  "assets.lifecycleProfile.lifecycleHint":
    "Scegli l'attuale stato del ciclo di vita in modo che il reporting strategico sulle risorse possa distinguere le risorse attive, monitorate e a fine vita.",
  "assets.lifecycleProfile.lastInspectionLabel": "\nData dell'ultima ispezione",
  "assets.lifecycleProfile.lastInspectionHint":
    "\nCattura l'ultima data di ispezione confermata quando la cronologia di cui sopra non riflette ancora il registro immobiliare corrente.",
  "assets.lifecycleProfile.submit": "\nSalva profilo del ciclo di vita",
  "assets.lifecycleProfile.submitAria": "\nSalva profilo di gestione del ciclo di vita dell'asset",
  "assets.lifecycleProfile.snapshotTitle": "\nIstantanea della postura del ciclo di vita",
  "assets.lifecycleProfile.snapshotDescription":
    "\nLo stato corrente del ciclo di vita utilizzato dall'analisi di disponibilità, condizione e pianificazione della sostituzione.",
  "assets.lifecycleProfile.snapshotCondition": "\nCondizione",
  "assets.lifecycleProfile.snapshotLifecycle": "\nFase del ciclo di vita",
  "assets.lifecycleProfile.snapshotInspection": "\nUltima ispezione",
  "assets.lifecycleProfile.snapshotUpdated": "\nUltimo aggiornamento",
  "assets.lifecycleProfile.historyTitle": "\nCronologia del ciclo di vita",
  "assets.lifecycleProfile.historyDescription":
    "\nLe modifiche al ciclo di vita con versione vengono acquisite qui per la governance delle condizioni e la pianificazione dello smaltimento.",
  "assets.lifecycleProfile.historyEmpty":
    "\nNon è stata ancora registrata alcuna modifica al ciclo di vita. Salva un aggiornamento per avviare l'audit trail.",
  "assets.lifecycleProfile.historyUpdated": "\nAggiornamento del ciclo di vita",
  "assets.lifecycleProfile.historyFrom": "\nDa",
  "assets.lifecycleProfile.historyTo": "\nA",
  "assets.lifecycleProfile.history.fieldCondition": "\nCondizione",
  "assets.lifecycleProfile.history.fieldStage": "\nFase del ciclo di vita",
  "assets.lifecycleProfile.history.fieldInspection": "\nUltima ispezione",
  "assets.lifecycleProfile.feedback.saved": "\nProfilo del ciclo di vita dell'asset salvato.",
  "assets.lifecycleProfile.feedback.loadFailed":
    "\nImpossibile caricare il profilo del ciclo di vita della risorsa in questo momento.",
  "assets.lifecycleProfile.feedback.saveFailed":
    "\nImpossibile salvare il profilo del ciclo di vita della risorsa in questo momento.",
  "assets.lifecycleProfile.validation.conditionRequired": "\nScegli una condizione valida.",
  "assets.lifecycleProfile.validation.lifecycleRequired":
    "\nScegli una fase del ciclo di vita valida.",
  "assets.lifecycleProfile.validation.lastInspectionInvalid":
    "\nUtilizzare una data di ispezione valida.",
  "assets.registry.title": "\nProfilo anagrafico",
  "assets.registry.description":
    "\nMappa questa risorsa nella gerarchia patrimoniale e collegala alla capacità di formazione che supporta.",
  "assets.registry.hierarchyLabel": "\nLivello gerarchico",
  "assets.registry.parentLabel": "\nRisorsa principale",
  "assets.registry.capabilityLabel": "\nCollegamento delle capacità operative",
  "assets.registry.capabilityPlaceholder":
    "\nEsempio: disponibilità dell'assortimento, disponibilità dell'alloggio, spedizione del veicolo",
  "assets.registry.capabilityHint":
    "\nDescrivi il risultato operativo che questa risorsa consente in modo che il reporting patrimoniale possa essere raggruppato in base alla capacità.",
  "assets.registry.parentHint":
    "\nScegli un genitore dello stesso sito quando questa risorsa si trova in una struttura, sistema o sottosistema nella gerarchia immobiliare.",
  "assets.registry.hierarchyHint":
    "\nUtilizzare Proprietà → Struttura → Sistema → Sottosistema → Componente per mantenere coerente il registro.",
  "assets.registry.parentRoot": "\nNessuna risorsa principale",
  "assets.registry.submit": "\nSalva profilo anagrafico",
  "assets.registry.submitAria": "\nSalva profilo anagrafico",
  "assets.registry.snapshotTitle": "\nIstantanea del collegamento del registro",
  "assets.registry.snapshotDescription":
    "\nL'attuale catena gerarchica e il rollup delle capacità utilizzati dalla strategia patrimoniale, dalla pianificazione degli ordini di lavoro e dalle esportazioni.",
  "assets.registry.snapshotParent": "\nRisorsa principale",
  "assets.registry.snapshotChildren": "\nAsset secondari diretti",
  "assets.registry.snapshotCapability": "\nCollegamento di capacità",
  "assets.registry.snapshotUpdated": "\nUltimo aggiornamento",
  "assets.registry.historyTitle": "\nCronologia modifiche",
  "assets.registry.historyDescription":
    "Gli aggiornamenti del registro con versione vengono acquisiti qui per la governance della gerarchia e delle capacità.",
  "assets.registry.historyEmpty":
    "\nNon è stata ancora registrata alcuna modifica al registro. Salva un aggiornamento per avviare l'audit trail.",
  "assets.registry.historyUpdated": "\nAggiornamento del registro",
  "assets.registry.historyFrom": "\nDa",
  "assets.registry.historyTo": "\nA",
  "assets.registry.history.fieldHierarchy": "\nLivello gerarchico",
  "assets.registry.history.fieldParent": "\nRisorsa principale",
  "assets.registry.history.fieldCapability": "\nCollegamento delle capacità operative",
  "assets.registry.feedback.saved": "\nProfilo del registro delle risorse salvato.",
  "assets.registry.feedback.loadFailed":
    "\nImpossibile caricare il profilo del registro delle risorse in questo momento.",
  "assets.registry.feedback.saveFailed":
    "\nImpossibile salvare il profilo del registro delle risorse in questo momento.",
  "assets.registry.validation.hierarchyLevelRequired": "\nScegli un livello gerarchico valido.",
  "assets.registry.validation.parentSelf":
    "\nUna risorsa non può essere l'elemento principale di se stessa.",
  "assets.registry.validation.parentMissing":
    "\nScegli una risorsa principale valida da questo registro.",
  "assets.registry.validation.parentSiteMismatch":
    "\nI beni principali devono appartenere allo stesso sito per preservare l'integrità della gerarchia patrimoniale.",
  "assets.registry.validation.parentLevel":
    "\nScegli una risorsa principale che si trova al di sopra del livello gerarchico selezionato.",
  "assets.registry.validation.parentCycle":
    "\nQuesto genitore creerebbe una gerarchia patrimoniale circolare.",
  "tasks.quickAdd": "\nAttività di aggiunta rapida",
  "tasks.quickAddAsset": "\nRisorsa",
  "tasks.quickAddSuccess": "\nAttività creata",
  "tasks.quickAddPlaceholder": "\nTitolo dell'attività...",
  "tasks.newTask": "\nNuova attività",
  "tasks.quickAddAdd": "\nAggiungi",
  "tasks.quickAddStatus": "\nStato",
  "tasks.dragToReorder": "\nTrascina per modificare lo stato",
  "tasks.detail": "\nDettagli attività",
  "tasks.statusUpdated": "\nStato dell'attività aggiornato",
  "tasks.empty": "\nNessuna attività corrispondente trovata",
  "tasks.emptyBacklog": "\nNessuna attività nel Backlog",
  "tasks.emptyInProgress": "\nNessuna attività in corso",
  "tasks.emptyReview": "\nNessuna attività in revisione",
  "tasks.emptyDone": "\nNessuna attività completata",
  "tasks.addToColumn": "\nAggiungi attività",
  "tasks.moveToStatus": "\nPassa allo stato",
  "predictions.markReviewed": "\nContrassegna come recensito",
  "predictions.emptyExplainer":
    "\nLe previsioni vengono visualizzate quando i dispositivi segnalano la telemetria per più di 7 giorni",
  "predictions.severityLegend": "\nLegenda della gravità",
  "predictions.severityInfo": "\nInformativo: nessuna azione necessaria",
  "predictions.severityWarning": "\nÈ necessaria attenzione: programmare la manutenzione",
  "predictions.severityCritical": "\nÈ richiesta un'azione immediata",
  "profile.edit": "\nModifica profilo",
  "profile.editName": "\nModifica nome",
  "profile.nameRequired": "\nIl nome è obbligatorio",
  "profile.saved": "\nProfilo aggiornato",
  "profile.preferencesSaved": "\nPreferenze salvate",
  "profile.notificationPreferences": "\nPreferenze di notifica",
  "profile.enableNotifications": "\nAbilita notifiche email",
  "profile.locale": "\nLocale",
  "profile.localeEnGb": "\nInglese (Regno Unito)",
  "profile.localeEnUs": "\nInglese (Stati Uniti)",
  "profile.savePreferences": "\nSalva preferenze",
  "profile.languageLocale": "\nLingua/località",
  "profile.avatarAlt": "\nAvatar del profilo",
  "auth.forgotPassword": "\nPassword dimenticata?",
  "auth.forgotPassword.documentTitle": "\nPassword dimenticata — Piattaforma operativa",
  "auth.forgotPasswordHelp": "\nInserisci l'indirizzo email utilizzato per il tuo account.",
  "auth.forgotPasswordPageHelp":
    "\nInvieremo un collegamento sicuro per la reimpostazione della password se l'account esiste.",
  "auth.forgotPassword.contextTitle": "\nArea di lavoro di ripristino",
  "auth.forgotPassword.contextDescription":
    "\nMantieni il recupero sullo stesso flusso sicuro, conferma l'indirizzo dell'account e rendi esplicito il passaggio successivo prima di lasciare questa schermata.",
  "auth.forgotPassword.progressTitle": "\nFlusso di recupero",
  "auth.forgotPassword.progressDescription":
    "\nRichiedi il collegamento, controlla la tua casella di posta, imposta una nuova password, quindi rivedi le sessioni attive.",
  "auth.forgotPassword.progressStep.request": "\nRichiedi collegamento",
  "auth.forgotPassword.progressStep.inbox": "\nControlla la posta in arrivo",
  "auth.forgotPassword.progressStep.reset": "\nReimposta password",
  "auth.forgotPassword.responseWindowLabel": "\nAspettativa di consegna",
  "auth.forgotPassword.responseWindowValue":
    "\nLa consegna del collegamento inizia immediatamente dopo l'invio",
  "auth.forgotPassword.channelLabel": "Canale di recupero",
  "auth.forgotPassword.channelValue": "\nRipristino basato su email con reindirizzamento sicuro",
  "auth.forgotPassword.checklist.accountTitle": "\nConferma prima l'e-mail dell'account",
  "auth.forgotPassword.checklist.accountDescription":
    "\nUtilizza l'indirizzo che ha già accesso all'area di lavoro dell'organizzazione per evitare di riavviare il flusso di ripristino.",
  "auth.forgotPassword.checklist.inboxTitle": "\nControlla la posta in arrivo e le cartelle spam",
  "auth.forgotPassword.checklist.inboxDescription":
    "\nIl collegamento sicuro potrebbe arrivare pochi istanti dopo l'invio, a seconda del gateway di posta dell'organizzazione.",
  "auth.forgotPassword.checklist.supportTitle":
    "\nUtilizza lo stesso percorso di ripristino per il supporto",
  "auth.forgotPassword.checklist.supportDescription":
    "\nSe il messaggio non arriva, riprova da questa schermata e mantieni lo stesso contesto dell'account invece di creare un nuovo percorso di accesso.",
  "auth.forgotPassword.timingTitle": "\nTempi di recupero",
  "auth.forgotPassword.timingDescription":
    "\nTieni informato l'operatore su quando arriva la richiesta, quando controllare la posta in arrivo e quando riprovare.",
  "auth.forgotPassword.timingSubmittedTitle": "\nRichiesta inviata",
  "auth.forgotPassword.timingSubmittedDescription":
    "\nMettiamo in coda l'e-mail di ripristino sicuro non appena la richiesta viene accettata.",
  "auth.forgotPassword.timingInboxTitle": "\nControlla la posta in arrivo",
  "auth.forgotPassword.timingInboxDescription":
    "\nCerca prima l'e-mail di recupero nella posta in arrivo principale, quindi nelle cartelle spam o quarantena.",
  "auth.forgotPassword.timingRetryTitle": "\nRiprova solo dopo che la finestra è passata",
  "auth.forgotPassword.timingRetryDescription":
    "\nSe il collegamento non è arrivato dopo il periodo previsto, riprovare da questa pagina in modo che lo stesso percorso di ripristino rimanga attivo.",
  "auth.forgotPasswordResetTitle": "\nReimposta la tua password",
  "auth.resetPassword.documentTitle": "\nReimposta password — Piattaforma operativa",
  "auth.forgotPasswordCheckEmail": "\nControlla la tua email",
  "auth.forgotPassword.sent.documentTitle": "\nControlla la tua email — Piattaforma operativa",
  "auth.forgotPasswordCheckEmailDesc":
    "\nSe esiste un account con quell'e-mail, abbiamo inviato un collegamento per la reimpostazione della password.",
  "auth.forgotPassword.sentTitle": "\nLink di recupero inviato",
  "auth.forgotPassword.sentDescription":
    "\nUtilizza il collegamento sicuro dalla tua casella di posta, quindi torna allo stesso flusso di accesso in modo che la destinazione dell'area di lavoro venga preservata.",
  "auth.forgotPassword.sentTimingTitle": "\nCosa succede dopo",
  "auth.forgotPassword.sentTimingDescription":
    "\nUtilizza subito il collegamento e-mail, riprova solo se necessario e mantieni visibile il contesto di sicurezza durante l'attesa.",
  "auth.forgotPassword.sentTimingArrivalTitle": "\nArrivo collegamento",
  "auth.forgotPassword.sentTimingArrivalDescription":
    "\nL'e-mail di reimpostazione dovrebbe arrivare poco dopo l'invio, a seconda del gateway di posta dell'organizzazione.",
  "auth.forgotPassword.sentTimingRetryTitle": "\nRiprova guida",
  "auth.forgotPassword.sentTimingRetryDescription":
    "\nSe non arriva nulla dopo il periodo previsto, invia nuovamente la richiesta dallo stesso flusso di ripristino invece di ricominciare da capo altrove.",
  "auth.forgotPassword.sentTimingSecurityTitle": "\nPromemoria di sicurezza",
  "auth.forgotPassword.sentTimingSecurityDescription":
    "Utilizza solo il collegamento dal canale e-mail attendibile e ignora i messaggi imprevisti di reimpostazione della password.",
  "auth.sendResetLink": "\nInvia link di reimpostazione",
  "auth.backToSignIn": "\nTorna all'accesso",
  "auth.forgotPasswordSent":
    "\nControlla la tua email per un collegamento per la reimpostazione della password",
  "auth.resetPasswordHelp": "\nScegli una nuova password per il tuo account.",
  "auth.resetPassword.contextTitle": "\nRevisione della reimpostazione della password",
  "auth.resetPassword.contextDescription":
    "\nAggiorna la credenziale, conferma una volta il nuovo segreto e mantieni visibile il passaggio di sicurezza successivo prima di continuare.",
  "auth.resetPassword.progressTitle": "\nReimposta flusso di lavoro",
  "auth.resetPassword.progressDescription":
    "\nImposta la nuova password, confermala una volta e rivedi le sessioni dopo il ripristino.",
  "auth.resetPassword.progressStep.request": "\nRichiedi collegamento",
  "auth.resetPassword.progressStep.reset": "\nImposta nuova password",
  "auth.resetPassword.progressStep.review": "\nSessioni di revisione",
  "auth.resetPasswordNewPasswordLabel": "\nNuova password",
  "auth.resetPasswordConfirmPasswordLabel": "\nConferma nuova password",
  "auth.resetPasswordNewPasswordHint": "\nUtilizza almeno {count} caratteri.",
  "auth.resetPasswordConfirmPasswordHint": "\nInserisci di nuovo la stessa password.",
  "auth.resetPassword.policyLabel": "\nPolitica sulla password",
  "auth.resetPassword.policyValue": "\nMinimo {count} caratteri con un valore univoco",
  "auth.resetPassword.sessionLabel": "\nDopo il ripristino",
  "auth.resetPassword.sessionValue": "\nRivedi le sessioni e torna allo spazio di lavoro protetto",
  "auth.resetPassword.checklist.passwordTitle": "\nCrea una nuova password",
  "auth.resetPassword.checklist.passwordDescription":
    "\nUtilizza almeno {count} caratteri ed evita di riutilizzare le credenziali condivise tra gli strumenti.",
  "auth.resetPassword.checklist.confirmTitle": "\nAbbina il campo di conferma",
  "auth.resetPassword.checklist.confirmDescription":
    "\nConferma la password in questa schermata in modo che il flusso di ripristino venga completato senza un secondo tentativo.",
  "auth.resetPassword.checklist.securityTitle": "\nControlla la sicurezza dell'account avanti",
  "auth.resetPassword.checklist.securityDescription":
    "\nUna volta completato il ripristino, accedi nuovamente e controlla le sessioni recenti prima di tornare al lavoro quotidiano.",
  "auth.resetPassword.monitoringTitle": "\nReimposta disponibilità",
  "auth.resetPassword.monitoringDescription":
    "\nTieni traccia della sicurezza della password, dello stato di conferma e della revisione finale della sicurezza prima di inviare la reimpostazione.",
  "auth.resetPassword.monitoringStep.passwordTitle": "\nRispetta la politica sulla password",
  "auth.resetPassword.monitoringStep.passwordDescription":
    "\nUtilizza almeno {count} caratteri ed evita credenziali già utilizzate altrove.",
  "auth.resetPassword.monitoringStep.matchTitle": "\nConferma la nuova password",
  "auth.resetPassword.monitoringStep.matchDescription":
    "\nAbbina esattamente il campo di conferma in modo che il ripristino possa essere completato in un unico passaggio.",
  "auth.resetPassword.monitoringStep.reviewTitle": "\nEsamina il passaggio di sicurezza successivo",
  "auth.resetPassword.monitoringStep.reviewDescription":
    "\nPianifica di accedere nuovamente e di controllare le sessioni recenti una volta completato l'aggiornamento della password.",
  "auth.resetPassword.monitoringLengthLabel": "\nLunghezza password",
  "auth.resetPassword.monitoringLengthPending":
    "\nAggiungi almeno {count} caratteri per soddisfare le attuali norme sulla password.",
  "auth.resetPassword.monitoringLengthReady":
    "\nRequisito di lunghezza della password soddisfatto.",
  "auth.resetPassword.monitoringPending": "\nIn sospeso",
  "auth.resetPassword.monitoringReady": "\nPronto",
  "auth.resetPassword.monitoringMatchLabel": "\nCorrispondenza di conferma",
  "auth.resetPassword.monitoringMatchPending":
    "\nInserisci la stessa password nel campo di conferma per continuare.",
  "auth.resetPassword.monitoringMatchReady": "Le password corrispondono e sono pronte per l'invio.",
  "auth.resetPassword.monitoringReviewLabel": "\nFollow-up sulla sicurezza",
  "auth.resetPassword.monitoringReviewValue":
    "\nAccedi di nuovo, rivedi le sessioni recenti e conferma il percorso di recupero prima di tornare al lavoro.",
  "auth.resetPassword.monitoringReviewState": "\nRevisione dopo il ripristino",
  "auth.resetPassword.monitoringLiveIdle":
    "\nIl monitoraggio della reimpostazione della password è in attesa di una password che soddisfi i criteri.",
  "auth.resetPassword.monitoringLiveConfirm":
    "\nPolitica sulla password soddisfatta. Conferma la password per completare il ripristino.",
  "auth.resetPassword.monitoringLiveReady":
    "\nI requisiti per la reimpostazione della password sono completi e pronti per essere inviati.",
  "auth.resetPasswordSubmit": "\nReimposta password",
  "auth.resetPasswordSuccessTitle": "\nPassword aggiornata",
  "auth.resetPassword.success.documentTitle": "\nPassword aggiornata — Piattaforma operativa",
  "auth.resetPasswordSuccessBody":
    "\nLa tua password è stata aggiornata. Puoi accedere con la nuova password adesso.",
  "auth.resetPassword.reviewSecurity": "\nControlla la sicurezza dopo l'accesso",
  "auth.resetPasswordMissingToken":
    "\nQuesto collegamento per la reimpostazione della password è incompleto. Richiedine uno nuovo per continuare.",
  "auth.resetPasswordInvalidToken":
    "\nQuesto collegamento per la reimpostazione della password non è valido o è scaduto. Richiedine uno nuovo per continuare.",
  "auth.resetPasswordPasswordsDoNotMatch": "\nLa conferma della password non corrisponde.",
  "auth.resetPasswordPasswordTooShort": "\nLa password deve contenere almeno {count} caratteri.",
  "auth.resetPasswordRequestEmailRequired":
    "\nInserisci l'indirizzo email associato al tuo account.",
  "auth.resetPasswordEmailSubject": "\nReimposta la tua password {brandName}",
  "auth.resetPasswordEmailIntro":
    "\nUtilizza il link sottostante per reimpostare la tua password {brandName}:",
  "auth.resetPasswordEmailOutro":
    "\nSe non hai richiesto tu questa modifica, puoi ignorare questa email.",
  "auth.tooManyAttempts": "\nTroppi tentativi. Riprova tra {minutes} minuti.",
  "dashboard.dateRange": "\nIntervallo di date",
  "dashboard.last7Days": "\nUltimi 7 giorni",
  "dashboard.last30Days": "\nUltimi 30 giorni",
  "dashboard.last90Days": "\nUltimi 90 giorni",
  "dashboard.activityFeed.title": "\nAttività recente",
  "dashboard.activityFeed.subtitle": "\nUltimi eventi della piattaforma e cambiamenti di stato",
  "dashboard.platformStats": "\nRiepilogo piattaforma",
  "dashboard.onboardingTitle": "\nInizia con {brandName}",
  "dashboard.onboardingStep1": "\nAggiungi il tuo primo dispositivo",
  "dashboard.onboardingStep2": "\nVisualizza previsioni AI",
  "dashboard.onboardingStep3": "\nConfigura report",
  "finance.empty": "\nNessun cespite ha dati di ammortamento configurati",
  "finance.fiscalPeriod": "\nPeriodo fiscale",
  "finance.exportData": "\nEsporta dati",
  "finance.export.csvTooltip": "\nScarica la visualizzazione filtrata corrente in formato CSV",
  "finance.depreciation.table.accumulatedDepreciation": "\nAmmortamento accumulato",
  "finance.depreciation.table.netBookValue": "\nValore contabile netto",
  "reports.dateRange": "\nIntervallo di date",
  "reports.reportHistory": "\nSegnala cronologia",
  "reports.noHistory": "\nNessun rapporto ancora generato",
  "reports.history.title": "\nCronologia report salvati",
  "reports.history.description":
    "\nMantieni i report personalizzati generati, rivedi la cronologia e riapri gli output recenti.",
  "reports.history.empty":
    "\nNessun rapporto ancora salvato. Genera e salva un report personalizzato per avviare la cronologia.",
  "reports.history.emptyFinancePlanning":
    "\nNessun report iniziale di pianificazione finanziaria è stato ancora salvato.",
  "reports.history.filter.all": "\nTutti",
  "reports.history.filter.financePlanning": "\nPianificazione finanziaria",
  "reports.history.saveAction": "\nSalva rapporto",
  "reports.history.saved": "\nRapporto salvato nella cronologia",
  "reports.history.savedMeta":
    "{generatedAt} • {sectionCount} sezioni • Copertura {coverageScore}% • {createdBy}",
  "reports.history.loadAria": "\nCarica il report salvato {name} nel builder",
  "reports.history.askAiAria": "\nChiedi a .bao informazioni sul report salvato {name}",
  "reports.history.reviewPrompt":
    "Esamina il rapporto salvato {report}. Si rivolge al pubblico {audience} con un focus {focus} e include {sections}. Spiegare quando questa voce della cronologia deve essere riutilizzata, aggiornata o ritirata.",
  "reports.history.comparePrompt":
    "\nConfronta il report salvato {report} con il pacchetto attivo {activePack}. Il pacchetto salvato si rivolge al pubblico {audience} con un focus su {focus} e include {sections}. Spiega cosa è cambiato, cosa conta ancora e quali approfondimenti o aggiornamenti dei dati dovrebbero avvenire successivamente.",
  "reports.history.error.invalid":
    "\nIl report generato è incompleto e non è stato possibile salvarlo.",
  "reports.history.error.saveFailed":
    "\nImpossibile salvare la voce della cronologia del rapporto in questo momento.",
  "sites.title": "\nBasi e strutture",
  "sites.subtitle": "\nGestisci sedi operative, classificazioni e dipendenze.",
  "sites.kind.base": "\nBase",
  "sites.kind.facility": "\nStruttura",
  "sites.stats.active": "\nSiti attivi",
  "sites.stats.bases": "\nBasi",
  "sites.stats.facilities": "\nStrutture",
  "sites.table.name": "\nPosizione",
  "sites.table.kind": "\nTipo",
  "sites.table.coordinates": "\nCoordinate",
  "sites.table.dependencies": "\nDipendenze",
  "sites.table.status": "\nStato",
  "sites.metrics.assets": "\n{count} risorse",
  "sites.metrics.crews": "\n{count} equipaggi",
  "sites.metrics.iot": "\n{count} Dispositivi IoT",
  "sites.status.active": "\nAttivo",
  "sites.status.inactive": "\nInattivo",
  "sites.actions.edit": "\nModifica posizione",
  "sites.actions.delete": "\nElimina posizione",
  "sites.form.nameLabel": "\nNome",
  "sites.form.kindLabel": "\nClassificazione",
  "sites.form.locationLabel": "\nPosizione",
  "sites.form.descriptionLabel": "\nDescrizione",
  "sites.form.gpsLatLabel": "\nLatitudine",
  "sites.form.gpsLonLabel": "\nLongitudine",
  "sites.form.activeLabel": "\nAttivo e disponibile per le operazioni",
  "sites.form.updateAction": "\nSalva modifiche",
  "sites.form.createAction": "\nCrea posizione",
  "sites.form.createTitle": "\nAggiungi base o struttura",
  "sites.form.createDescription":
    "\nCrea un nuovo sito operativo e rendilo disponibile nei flussi di lavoro finanziari, documentali e di utilizzo.",
  "sites.feedback.created": "\nPosizione creata con successo.",
  "sites.feedback.updated": "\nPosizione aggiornata correttamente.",
  "sites.feedback.deleted": "\nPosizione eliminata correttamente.",
  "sites.error.invalid": "\nInserisci un nome e una posizione validi per il sito.",
  "sites.error.invalidCoordinates": "\nLatitudine e longitudine sono fuori limite.",
  "sites.error.inUse":
    "\nQuesto sito presenta ancora dipendenze operative e non può essere eliminato.",
  "sites.error.notFound": "\nImpossibile trovare il sito richiesto.",
  "sites.error.saveFailed": "\nImpossibile salvare la modifica del sito.",
  "documentWorkspace.section.eyebrow": "\nArea di lavoro transazionale",
  "documentWorkspace.section.filtersAria": "\nFiltri dell'area di lavoro",
  "documentWorkspace.section.savedViewTitle": "\nVisualizzazioni salvate basate sul ruolo",
  "documentWorkspace.section.savedViewDescription":
    "\nMantieni disponibile la combinazione corrente di ruolo, filtro e scheda come sezione dell'area di lavoro durevole.",
  "documentWorkspace.section.commandTitle": "\nPostura di comando",
  "documentWorkspace.section.commandDescription":
    "\nTieni traccia della fase corrente del documento, del trasferimento di consegna e della pressione di controllo prima di approfondire i record in tempo reale.",
  "documentWorkspace.section.recentTitle": "\nDocumenti recenti",
  "documentWorkspace.section.recentDescription": "\nUltimi record nell'ambito attuale.",
  "documentWorkspace.section.historyTitle": "\nCronologia del ciclo di vita",
  "documentWorkspace.history.approvalRoutedTitle": "\nApprovazione instradata",
  "documentWorkspace.history.approvalRoutedDescription":
    "\nIl dipartimento finanziario ha messo in coda il passaggio di revisione successivo.",
  "documentWorkspace.section.historyDescription":
    "\nCronologia immutabile per lo spostamento dei documenti.",
  "documentWorkspace.section.compareTitle": "\nDecisione confronta vassoio",
  "documentWorkspace.section.compareDescription":
    "Mantieni visibili il documento principale, la pressione di approvazione e la posizione di esportazione in un unico binario condiviso.",
  "documentWorkspace.section.approvalInboxTitle": "\nCasella di posta di approvazione",
  "documentWorkspace.section.approvalInboxDescription":
    "\nFai emergere la prossima decisione in sospeso e mantieni visibile la coda di approvazione.",
  "documentWorkspace.section.exportPackTitle": "\nPacchetto di esportazione e prove",
  "documentWorkspace.section.exportPackDescription":
    "\nPrepara il record selezionato, la cronologia e le prove di supporto per il flusso di lavoro successivo.",
  "documentWorkspace.section.collectionsTitle": "\nFlusso di incassi e discrepanze",
  "documentWorkspace.section.collectionsDescription":
    "\nTieni traccia del pagamento rimanente, della ricevuta o della pressione di scostamento prima che diventi un blocco.",
  "documentWorkspace.section.relatedActivityTitle": "\nContesto attività correlata",
  "documentWorkspace.section.relatedActivityDescription":
    "\nMantieni visibili gli ultimi movimenti, i record collegati e il passaggio dell'operatore dalla stessa area di lavoro.",
  "documentWorkspace.metricTone.neutral": "\nFisso",
  "documentWorkspace.metricTone.primary": "\nPriorità",
  "documentWorkspace.metricTone.info": "\nIn revisione",
  "documentWorkspace.metricTone.success": "\nIn pista",
  "documentWorkspace.metricTone.warning": "\nAttenzione",
  "documentWorkspace.metricTone.error": "\nRiassegnato",
  "documentWorkspace.table.document": "\nDocumento",
  "documentWorkspace.table.status": "\nStato",
  "documentWorkspace.table.amount": "\nImporto",
  "documentWorkspace.table.date": "\nData",
  "documentWorkspace.list.filterBarAria": "\nFiltri elenco documenti",
  "documentWorkspace.list.searchPlaceholder": "\nCerca documenti…",
  "documentWorkspace.list.searchAria": "\nCerca documenti",
  "documentWorkspace.list.statusFilterAria": "\nFiltra per stato",
  "documentWorkspace.list.tableAria": "\nDocumenti — {documentType}",
  "documentWorkspace.list.emptyTitle": "\nNessun documento ancora",
  "documentWorkspace.list.emptyCta": "\nCrea documento",
  "documentWorkspace.list.tableLoading": "\nCaricamento documenti",
  "documentWorkspace.list.sectionAria": "\nElenco documenti",
  "documentWorkspace.tab.overview": "\nPanoramica",
  "documentWorkspace.tab.documents": "\nDocumenti",
  "documentWorkspace.tab.history": "\nStoria",
  "documentWorkspace.filter.all": "\nTutti",
  "documentWorkspace.metric.total": "\nTotale",
  "documentWorkspace.metric.completed": "\nCompletato",
  "documentWorkspace.emptyCta":
    "\nCrea il tuo primo documento per iniziare a monitorare questo flusso di lavoro.",
  "documentWorkspace.emptyTimelineCta":
    "\nL'attività del documento verrà visualizzata qui una volta creati i record.",
  "documentWorkspace.rfq.heading": "\nRichieste di offerta",
  "documentWorkspace.rfq.description":
    "\nCanalizzazione di qualificazione in entrata per richieste pubbliche, conversazioni con i partner e conversione di preventivi.",
  "documentWorkspace.rfq.empty": "\nNessuna richiesta RFQ è ancora disponibile.",
  "documentWorkspace.rfq.timelineEmpty":
    "\nNon è ancora disponibile alcuna cronologia delle richieste di offerta.",
  "documentWorkspace.rfq.timelineFallback": "\nFlusso di lavoro RFQ aggiornato.",
  "documentWorkspace.rfq.metric.submitted": "\nInviato",
  "documentWorkspace.rfq.metric.quoted": "\nCitato",
  "documentWorkspace.rfq.metric.accepted": "\nAccettato",
  "documentWorkspace.rfq.filter.submitted": "\nInviato",
  "documentWorkspace.rfq.filter.quoted": "\nCitato",
  "documentWorkspace.rfq.filter.accepted": "\nAccettato",
  "documentWorkspace.rfq.step.draft": "\nBozza",
  "documentWorkspace.rfq.step.submitted": "\nInviato",
  "documentWorkspace.rfq.step.qualified": "\nQualificato",
  "documentWorkspace.rfq.step.quoted": "\nCitato",
  "documentWorkspace.rfq.step.accepted": "\nAccettato",
  "documentWorkspace.rfq.step.declined": "\nRifiutato",
  "documentWorkspace.rfq.step.expired": "\nScaduto",
  "documentWorkspace.rfq.secondaryFallback": "\nRichiesta anonima",
  "documentWorkspace.rfq.amountFallback": "\nBudget da definire",
  "documentWorkspace.rfq.notFound": "\nLa richiesta di offerta non è stata trovata.",
  "documentWorkspace.rfq.submitted": "\nRichiesta di offerta {requestNumber} inviata.",
  "documentWorkspace.rfq.lineItemFallback": "\nAmbito generale del progetto",
  "documentWorkspace.rfq.validation.title": "\nDicci a cosa serve la richiesta.",
  "documentWorkspace.rfq.validation.summary":
    "\nAggiungi un breve riepilogo operativo in modo che il triage inizi con il contesto.",
  "documentWorkspace.rfq.validation.email": "\nInserisci un'e-mail di contatto valida.",
  "documentWorkspace.rfq.validation.dueDate": "\nUtilizza una data di scadenza valida.",
  "documentWorkspace.rfq.validation.budget": "\nUtilizza un budget numerico valido.",
  "documentWorkspace.rfq.validation.error":
    "\nL'invio della richiesta di offerta richiede alcune correzioni.",
  "documentWorkspace.workOrder.heading": "\nOrdini di lavoro",
  "documentWorkspace.workOrder.description":
    "\nCronologia di approvazione, pianificazione, SLA e completamento per la consegna operativa.",
  "documentWorkspace.workOrder.empty": "\nNessun ordine di lavoro è ancora disponibile.",
  "documentWorkspace.workOrder.timelineEmpty":
    "\nNon è ancora disponibile alcuna cronologia degli ordini di lavoro.",
  "documentWorkspace.workOrder.timelineFallback":
    "\nCiclo di vita dell'ordine di lavoro aggiornato.",
  "documentWorkspace.workOrder.metric.inProgress": "\nIn corso",
  "documentWorkspace.workOrder.metric.reviewQueue": "\nCoda di revisione",
  "documentWorkspace.workOrder.filter.triage": "\nTriage",
  "documentWorkspace.workOrder.filter.scheduled": "\nProgrammato",
  "documentWorkspace.workOrder.filter.review": "\nPronto per la revisione",
  "documentWorkspace.workOrder.step.draft": "\nBozza",
  "documentWorkspace.workOrder.step.triage": "\nTriage",
  "documentWorkspace.workOrder.step.approved": "Approvato",
  "documentWorkspace.workOrder.step.scheduled": "\nProgrammato",
  "documentWorkspace.workOrder.step.inProgress": "\nIn corso",
  "documentWorkspace.workOrder.step.readyForReview": "\nPronto per la revisione",
  "documentWorkspace.workOrder.step.completed": "\nCompletato",
  "documentWorkspace.workOrder.step.cancelled": "\nAnnullato",
  "documentWorkspace.workOrder.notFound": "\nL'ordine di lavoro non è stato trovato.",
  "workOrders.detail.title": "\nDettagli ordine di lavoro",
  "workOrders.detail.subtitle":
    "\nTieni traccia dell'allocazione della manodopera, della produzione della forza lavoro e dell'acquisizione dei costi rispetto a un ordine operativo.",
  "workOrders.detail.summaryTitle": "\nRiepilogo esecuzione",
  "workOrders.detail.summaryDescription":
    "\nStato di consegna attuale, contesto dell'assegnatario e accumulo dei costi trattenuti rispetto a questo ordine.",
  "workOrders.detail.site": "\nSito",
  "workOrders.detail.customerOrder": "\nOrdine cliente",
  "workOrders.detail.assignee": "\nAssegnatario",
  "workOrders.detail.schedule": "\nFinestra programmata",
  "workOrders.detail.costs.labour": "\nCosto manodopera",
  "workOrders.detail.costs.material": "\nCosto materiale",
  "workOrders.detail.costs.other": "\nAltro costo",
  "workOrders.detail.assigneeRole": "Ruolo assegnato",
  "workOrders.detail.updatedAt": "\nUltimo aggiornamento",
  "workOrders.detail.outputUnits": "\nUnità di uscita",
  "workOrders.detail.signoffPending": "\nApprovazione del supervisore in sospeso",
  "workOrders.detail.signoffReady": "\nPronto per la firma del supervisore",
  "workOrders.detail.signoffComplete": "\nApprovazione del supervisore completata",
  "workOrders.detail.descriptionTitle": "\nBrief operativo",
  "workOrders.detail.descriptionDescription":
    "\nConserva la descrizione dell'ambito e le note di esecuzione accanto al registro del lavoro.",
  "workOrders.labor.feedback.saved":
    "\nVoce di manodopera salvata e accumulo dei costi dell'ordine di lavoro aggiornato.",
  "workOrders.labor.activity.inspection": "\nIspezione",
  "workOrders.labor.activity.maintenance": "\nManutenzione",
  "workOrders.labor.activity.repair": "\nRiparazione",
  "workOrders.labor.activity.installation": "\nInstallazione",
  "workOrders.labor.activity.range_support": "\nSupporto portata",
  "workOrders.labor.activity.soft_fm": "\nFM morbido",
  "workOrders.labor.activity.compliance": "\nConformità",
  "workOrders.labor.summary.totalHours": "\nOre registrate",
  "workOrders.labor.summary.totalHoursDesc":
    "\nMonitoraggio dell'impegno lavorativo nel registro corrente.",
  "workOrders.labor.summary.totalCost": "\nCosto manodopera prenotato",
  "workOrders.labor.summary.totalCostDesc":
    "\nInserito nel campo costo manodopera dell'ordine di lavoro.",
  "workOrders.labor.summary.workerCount": "\nLavoratori assegnati",
  "workOrders.labor.summary.workerCountDesc":
    "\nDipendenti distinti registrati a fronte di questo ordine.",
  "workOrders.labor.summary.productivity": "\nTasso di produttività",
  "workOrders.labor.summary.productivityDesc":
    "\n{output} unità di output registrate nel registro corrente.",
  "workOrders.labor.form.title": "\nCattura l'attività della forza lavoro",
  "workOrders.labor.form.description":
    "\nRegistra l'impegno della scheda attività, le unità di output e il costo della manodopera direttamente rispetto all'ordine di lavoro operativo.",
  "workOrders.labor.form.submitAria": "\nSalva inserimento manodopera nell'ordine di lavoro",
  "workOrders.labor.form.employee": "\nDipendente",
  "workOrders.labor.form.employeePlaceholder": "\nSeleziona un dipendente",
  "workOrders.labor.form.employeeHint":
    "\nUtilizza la directory utente interna condivisa come fonte di verità per la forza lavoro.",
  "workOrders.labor.form.activity": "\nAttività",
  "workOrders.labor.form.activityPlaceholder": "\nSeleziona attività",
  "workOrders.labor.form.activityHint":
    "\nClassificare i risultati operativi in modo da poter confrontare produttività e mix di forza lavoro.",
  "workOrders.labor.form.entryDate": "\nData inserimento",
  "workOrders.labor.form.entryDateHint": "\nCattura la data in cui è stato eseguito il lavoro.",
  "workOrders.labor.form.hours": "\nOrari",
  "workOrders.labor.form.hoursHint":
    "\nUtilizza le ore decimali per l'impegno lavorativo registrato.",
  "workOrders.labor.form.hourlyRate": "\nTariffa oraria",
  "workOrders.labor.form.hourlyRateHint":
    "\nCatturato in {currency} e inserito nel costo della manodopera.",
  "workOrders.labor.form.outputUnits": "\nUnità di uscita",
  "workOrders.labor.form.outputUnitsHint":
    "\nQuantità di produttività opzionale utilizzata per confrontare la produttività operativa.",
  "workOrders.labor.form.notes": "\nNote",
  "workOrders.labor.form.notesHint": "\nCattura note di turno, blocchi o commenti di garanzia.",
  "workOrders.labor.form.submit": "\nAggiungi voce manodopera",
  "workOrders.labor.table.title": "\nRegistro manodopera",
  "workOrders.labor.table.description":
    "\nVoci di manodopera durevoli in stile scheda attività collegate a un output operativo.",
  "workOrders.labor.table.employee": "\nDipendente",
  "workOrders.labor.table.activity": "\nAttività",
  "workOrders.labor.table.entryDate": "\nData",
  "workOrders.labor.table.hours": "\nOrari",
  "workOrders.labor.table.outputUnits": "\nUscita",
  "workOrders.labor.table.totalCost": "\nCosto",
  "workOrders.labor.table.notes": "\nNote",
  "workOrders.labor.table.loggedBy": "\nRegistrato da {name}",
  "workOrders.labor.table.empty":
    "\nNessuna voce di manodopera ancora acquisita per questo ordine di lavoro.",
  "workOrders.labor.validation.formInvalid":
    "\nCorreggi il modulo di inserimento manodopera prima di salvare.",
  "workOrders.labor.validation.employeeId":
    "\nSeleziona il dipendente che ha completato il lavoro.",
  "workOrders.labor.validation.employeeMissing":
    "\nIl dipendente selezionato non è più disponibile per l'allocazione della manodopera.",
  "workOrders.labor.validation.activity": "\nSeleziona un'attività lavorativa valida.",
  "workOrders.labor.validation.entryDate": "\nUtilizza una data di ingresso del travaglio valida.",
  "workOrders.labor.validation.hours": "\nInserisci le ore lavorate.",
  "workOrders.labor.validation.hoursPositive": "\nLe ore devono essere maggiori di zero.",
  "workOrders.labor.validation.hourlyRate": "\nUtilizza una tariffa oraria valida.",
  "workOrders.labor.validation.outputUnits": "\nUtilizza un valore di unità di output valido.",
  "documentWorkspace.purchaseOrder.heading": "\nOrdini di acquisto",
  "documentWorkspace.purchaseOrder.description":
    "Approvazioni dei fornitori, monitoraggio delle ricevute e punti di controllo della fatturazione per il Procure-to-Pay.",
  "documentWorkspace.purchaseOrder.empty": "\nNessun ordine di acquisto è ancora disponibile.",
  "documentWorkspace.purchaseOrder.timelineEmpty":
    "\nNon è ancora disponibile alcuna cronologia degli ordini di acquisto.",
  "documentWorkspace.purchaseOrder.timelineFallback":
    "\nCiclo di vita dell'ordine d'acquisto aggiornato.",
  "documentWorkspace.purchaseOrder.metric.pending": "\nIn sospeso",
  "documentWorkspace.purchaseOrder.metric.received": "\nRicevuto",
  "documentWorkspace.purchaseOrder.metric.billed": "\nFatturato",
  "documentWorkspace.purchaseOrder.filter.requested": "\nRichiesto",
  "documentWorkspace.purchaseOrder.filter.sent": "\nInviato",
  "documentWorkspace.purchaseOrder.filter.received": "\nRicevuto",
  "documentWorkspace.purchaseOrder.step.draft": "\nBozza",
  "documentWorkspace.purchaseOrder.step.requested": "\nRichiesto",
  "documentWorkspace.purchaseOrder.step.approved": "Approvato",
  "documentWorkspace.purchaseOrder.step.sent": "\nInviato",
  "documentWorkspace.purchaseOrder.step.partiallyReceived": "\nParzialmente ricevuto",
  "documentWorkspace.purchaseOrder.step.received": "\nRicevuto",
  "documentWorkspace.purchaseOrder.step.billed": "\nFatturato",
  "documentWorkspace.purchaseOrder.step.closed": "\nChiuso",
  "documentWorkspace.purchaseOrder.step.cancelled": "\nAnnullato",
  "documentWorkspace.purchaseOrder.notFound": "\nL'ordine d'acquisto non è stato trovato.",
  "documentWorkspace.customerOrder.heading": "\nOrdini cliente",
  "documentWorkspace.customerOrder.description":
    "\nImpegni commerciali, approvazioni, adempimento e conversione da richieste di offerta.",
  "documentWorkspace.customerOrder.empty": "\nNessun ordine cliente è ancora disponibile.",
  "documentWorkspace.customerOrder.timelineEmpty":
    "\nNon è ancora disponibile alcuna cronologia degli ordini dei clienti.",
  "documentWorkspace.customerOrder.timelineFallback":
    "\nCiclo di vita dell'ordine cliente aggiornato.",
  "documentWorkspace.customerOrder.metric.approvalQueue": "\nCoda di approvazione",
  "documentWorkspace.customerOrder.metric.inFulfilment": "\nIn esecuzione",
  "documentWorkspace.customerOrder.filter.approval": "\nIn attesa di approvazione",
  "documentWorkspace.customerOrder.filter.confirmed": "\nConfermato",
  "documentWorkspace.customerOrder.filter.fulfilment": "\nIn esecuzione",
  "documentWorkspace.customerOrder.step.draft": "\nBozza",
  "documentWorkspace.customerOrder.step.pendingApproval": "\nIn attesa di approvazione",
  "documentWorkspace.customerOrder.step.approved": "Approvato",
  "documentWorkspace.customerOrder.step.confirmed": "\nConfermato",
  "documentWorkspace.customerOrder.step.inFulfilment": "\nIn esecuzione",
  "documentWorkspace.customerOrder.step.completed": "\nCompletato",
  "documentWorkspace.customerOrder.step.cancelled": "\nAnnullato",
  "documentWorkspace.customerOrder.secondaryFallback": "\nConto diretto",
  "documentWorkspace.customerOrder.notFound": "\nL'ordine del cliente non è stato trovato.",
  "documentWorkspace.invoice.heading": "\nFatture",
  "documentWorkspace.invoice.description":
    "\nTracciamento AR operativo, riscossioni e invecchiamento delle fatture prima dell'esportazione contabile.",
  "documentWorkspace.invoice.empty": "\nNessuna fattura è ancora disponibile.",
  "documentWorkspace.invoice.timelineEmpty": "\nNon è ancora disponibile lo storico delle fatture.",
  "documentWorkspace.invoice.timelineFallback": "\nCiclo di vita della fattura aggiornato.",
  "documentWorkspace.invoice.metric.openExposure": "\nApri esposizione",
  "documentWorkspace.invoice.metric.paid": "\nPagato",
  "documentWorkspace.invoice.metric.draft": "\nBozza",
  "documentWorkspace.invoice.filter.issued": "\nEmesso",
  "documentWorkspace.invoice.filter.partiallyPaid": "\nParzialmente pagato",
  "documentWorkspace.invoice.filter.paid": "\nPagato",
  "documentWorkspace.invoice.step.draft": "\nBozza",
  "documentWorkspace.invoice.step.issued": "\nEmesso",
  "documentWorkspace.invoice.step.partiallyPaid": "\nParzialmente pagato",
  "documentWorkspace.invoice.step.paid": "\nPagato",
  "documentWorkspace.invoice.step.void": "\nVuoto",
  "documentWorkspace.invoice.step.writtenOff": "\nCancellato",
  "documentWorkspace.invoice.notFound": "\nLa fattura non è stata trovata.",
  "portal.title": "\nPortale partner",
  "portal.logoLabel": "\nPortale",
  "portal.authenticatedWorkspace": "\nArea di lavoro autenticata",
  "portal.sidebar.title": "\nAccesso ai documenti condivisi",
  "portal.sidebar.description":
    "\nOrdini, lavoro, fatture e approvvigionamenti riguardano l'appartenenza alla tua organizzazione.",
  "portal.nav.overview": "\nPanoramica",
  "portal.nav.orders": "\nOrdini",
  "portal.nav.workOrders": "\nOrdini di lavoro",
  "portal.nav.invoices": "\nFatture",
  "portal.nav.purchaseOrders": "\nOrdini di acquisto",
  "portal.summary.eyebrow": "\nArea di lavoro partner",
  "portal.summary.totalLabel": "totale",
  "portal.summary.title": "\nIstantanea commerciale condivisa",
  "portal.summary.description":
    "\nVisibilità corrente di ordini, lavoro, fatture e approvvigionamenti per l'ambito dell'organizzazione autenticata.",
  "portal.summary.actionHubTitle": "\nCorsia di azione prioritaria",
  "portal.summary.actionHubDescription":
    "\nMantieni visibili il successivo spostamento dei documenti, il flusso di lavoro responsabile e il follow-up rivolto ai partner dalla panoramica del portale.",
  "portal.summary.activityTitle": "\nAttività recente del partner",
  "portal.summary.activityDescription":
    "\nTieni traccia degli ultimi movimenti di ordini cliente, ordini di lavoro, fatture e approvvigionamenti da un unico posto.",
  "portal.summary.activityFallback": "\nNessuna attività del partner è stata ancora registrata.",
  "portal.summary.exceptionTitle": "\nOrologio eccezionale",
  "portal.summary.exceptionDescription":
    "\nGuarda gli elementi che necessitano ancora di riconoscimento, risposta o escalation da parte del team partner.",
  "portal.summary.exceptionFallbackTitle":
    "\nNessuna eccezione attiva necessita di follow-up in questo momento.",
  "portal.summary.exceptionFallbackDescription":
    "\nContinua a monitorare le aree di lavoro dei documenti per nuove approvazioni, contestazioni e blocchi dell'adempimento.",
  "portal.summary.exceptionItem": "Documento: {document}: {status}",
  "portal.summary.exceptionItemDescription": "Titolo: {title} – {date}",
  "portal.summary.nextOrders": "\nArea di lavoro ordini aperti",
  "portal.summary.ordersDescription": "Visualizza e gestisci ordini cliente.",
  "portal.summary.workOrdersDescription": "Monitora avanzamento e evasione ordini di lavoro.",
  "portal.summary.invoicesDescription": "Verifica fatture pendenti e pagate.",
  "portal.summary.purchaseOrdersDescription": "Gestisci ordini di acquisto con i fornitori.",
  "portal.summary.nextWorkOrders": "\nApri area di lavoro ordini di lavoro",
  "portal.summary.nextInvoices": "\nArea di lavoro fatture aperte",
  "portal.summary.nextPurchaseOrders": "\nArea di lavoro Apri ordini di acquisto",
  "portal.page.orders": "\nOrdini sul portale",
  "portal.page.workOrders": "\nOrdini di lavoro del portale",
  "portal.page.invoices": "\nFatture portale",
  "portal.page.purchaseOrders": "Ordini di acquisto del portale",
  "portal.documentList.sectionTitle": "Documenti",
  "portal.documentList.tableCaption": "Elenco documenti",
  "portal.documentList.col.id": "ID",
  "portal.documentList.col.document": "Documento",
  "portal.documentList.col.status": "Stato",
  "portal.documentList.col.value": "Valore",
  "portal.documentList.col.date": "Data",
  "portal.documentList.col.amount": "Importo",
  "portal.documentList.col.actions": "Azioni",
  "portal.documentList.viewAction": "Visualizza",
  "portal.documentList.filtersLabel": "Filtra per stato",
  "portal.documentList.loading": "Caricamento documenti…",
  "portal.documentList.empty.title": "Nessun documento",
  "portal.documentList.empty.cta": "Crea documento",
  "portal.documentList.error.description": "Non è stato possibile caricare i documenti.",
  "portal.documentList.searchPlaceholder": "Cerca documenti…",
  "portal.documentList.searchLabel": "Cerca documenti",
  "portal.documentList.resultCount": "{count} documenti",
  "portal.documentList.paginationInfo": "Pagina {page} di {totalPages} ({totalCount} totali)",
  "portal.documentDetail.loading": "Caricamento documento…",
  "portal.documentDetail.overviewTitle": "Panoramica",
  "portal.documentDetail.lineItemsTitle": "Voci",
  "portal.documentDetail.timelineTitle": "Cronologia attività",
  "portal.documentDetail.actionsTitle": "Azioni disponibili",
  "portal.documentDetail.downloadInvoice": "Scarica fattura",
  "portal.documentDetail.contactSupport": "Contatta supporto",
  "portal.documentDetail.payInvoice": "Paga fattura",
  "portal.documentDetail.empty.title": "Documento non trovato",
  "portal.documentDetail.empty.description":
    "Non è stato possibile trovare il documento richiesto.",
  "portal.documentDetail.empty.fields": "Nessun dettaglio disponibile.",
  "portal.documentDetail.empty.lineItems": "Nessuna voce.",
  "portal.documentDetail.empty.timeline": "Nessuna attività registrata.",
  "portal.documentDetail.error.description": "Non è stato possibile caricare il documento.",
  "portal.documentDetail.relatedLinksTitle": "Link correlati",
  "portal.documentDetail.delete.title": "Elimina documento",
  "portal.documentDetail.delete.description":
    'Sei sicuro di voler eliminare "{title}"? Questa azione non può essere annullata.',
  "portal.chat.contextTitle": "\nCorsia di proprietà del servizio",
  "portal.chat.contextDescription":
    "\nMantieni visibili il proprietario attuale, i record commerciali collegati e il percorso di escalation mentre il thread del partner è attivo.",
  "portal.chat.ownerLabel": "\nProprietario attuale",
  "portal.chat.ownerFallback": "\nAssegna un proprietario partner",
  "portal.chat.latestFallback": "\nNessun aggiornamento in thread è stato ancora registrato.",
  "portal.chat.checklistOwnerTitle": "\nCattura il proprietario responsabile",
  "portal.chat.checklistOwnerDescription":
    "\nIndica chi possiede la risposta successiva o il passaggio di evasione prima che il thread passi di mano.",
  "portal.chat.checklistSlaTitle": "\nImposta la finestra di risposta",
  "portal.chat.checklistSlaDescription":
    "\nConferma la tempistica nel thread ogni volta che la consegna, la fatturazione o la prova del servizio vengono bloccate.",
  "portal.chat.checklistEscalationTitle": "\nInoltra con record collegati",
  "portal.chat.checklistEscalationDescription":
    "\nAprire il documento correlato o l'area di lavoro del membro quando la conversazione necessita di un follow-up operativo.",
  "portal.chat.openLinkedAction": "\nApri record collegato",
  "portal.chat.composeDescription":
    "\nUtilizza il thread del partner per acquisire proprietà, tempi di risposta ed eventuali passaggi commerciali bloccati.",
  "portal.chat.composeHint":
    "\nMantieni visibili in ogni risposta il proprietario successivo e la finestra di risposta promessa.",
  "portal.chat.aiActionsDescription":
    "\nUtilizza le azioni .bao per riepilogare il thread del partner prima di passare al follow-up di ordini, lavoro o fatture.",
  "deviceHistory.exportCsv": "\nEsporta CSV",
  "customisation.chatBubbleToggle": "\nBolla chat .bao",
  "customisation.chatBubbleDescription": "\nMostra il fumetto mobile della chat .bao",
  "apiExplorer.searchRoutes": "\nCerca percorsi...",
  "apiExplorer.tryIt": "\nProvalo",
  "apiExplorer.response": "\nRisposta",
  "apiExplorer.errorPrefix": "\nErrore:",
  "transfer.title": "\nTrasferisci risorsa",
  "transfer.subtitle": "\nSposta questa risorsa in un sito o struttura diversa",
  "transfer.form.destination": "\nSito di destinazione",
  "transfer.form.destinationPlaceholder": "\nSeleziona destinazione",
  "transfer.form.reason": "\nMotivo del trasferimento",
  "transfer.form.reasonPlaceholder": "\nInserisci motivo del trasferimento",
  "transfer.form.notes": "\nNote aggiuntive",
  "transfer.form.notesPlaceholder": "\nNote facoltative su questo trasferimento",
  "transfer.form.submit": "\nConferma trasferimento",
  "transfer.form.cancel": "\nAnnulla",
  "transfer.validation.sameLocation":
    "\nLa destinazione non può essere la stessa della posizione corrente",
  "transfer.validation.assetNotFound": "\nRisorsa non trovata",
  "transfer.validation.siteNotFound": "\nSito di destinazione non trovato",
  "transfer.validation.destinationRequired": "\nIl sito di destinazione è obbligatorio",
  "transfer.feedback.success": "\nAsset trasferito con successo",
  "transfer.feedback.error": "\nImpossibile trasferire la risorsa",
  "transfer.history.title": "\nCronologia trasferimenti",
  "transfer.history.empty": "\nNessuna cronologia dei trasferimenti per questa risorsa",
  "transfer.history.from": "\nDa",
  "transfer.history.to": "\nA",
  "transfer.history.date": "\nData",
  "transfer.history.initiatedBy": "\nAvviato da",
  "transfer.history.reason": "\nMotivo",
  "transfer.history.notes": "\nNote",
  "transfer.modal.title": "\nTrasferisci risorsa",
  "transfer.modal.description":
    "\nSeleziona il sito di destinazione in cui trasferire questa risorsa a",
  "transfer.modal.confirm": "\nTrasferimento",
  "transfer.action": "\nTrasferimento",
  "ucp.checkout.notFound": "La sessione di checkout non e stata trovata.",
  "ucp.order.notFound": "\nL'ordine non è stato trovato.",
  "ucp.checkout.error.currency":
    "\nLa valuta {currency} non è supportata per questa selezione di catalogo.",
  "ucp.checkout.error.itemUnavailable":
    "\nUno o più articoli del catalogo selezionati non sono disponibili.",
  "ucp.checkout.error.empty":
    "\nAggiungi almeno un articolo del catalogo prima di completare il pagamento.",
  "ucp.checkout.error.paymentHandler":
    "Seleziona uno strumento di pagamento supportato prima di completare il pagamento.",
  "ucp.checkout.error.terminal": "\nQuesta sessione di pagamento non può più essere modificata.",
  "ucp.checkout.error.idMismatch": "\nID pagamento non corrispondente.",
  "ucp.checkout.ai.single":
    "\n{title}: {summary} Totale {total} {currency}. Controlla i dettagli dell'acquirente, quindi completa il pagamento per creare l'ordine operativo.",
  "ucp.checkout.ai.multi":
    "\n{count} pacchetti operativi selezionati: {titles}. Totale {total} {currency}. Conferma l'allineamento dell'ambito, quindi completa il pagamento per creare l'ordine.",
  "ucp.checkout.completed": "Checkout completato. L ordine {orderNumber} e ora confermato.",
  "ucp.checkout.canceled": "\nPagamento annullato.",
  "ucp.reference.service.title": "\n{merchantName} servizio spesa",
  "ucp.reference.checkout.specTitle": "\nFunzionalità di pagamento degli acquisti",
  "ucp.reference.checkout.schemaTitle": "\nSchema della funzionalità di pagamento degli acquisti",
  "ucp.reference.order.specTitle": "\nFunzionalità dell'ordine di acquisto",
  "ucp.reference.order.schemaTitle": "\nSchema della funzionalità dell'ordine di acquisto",
  "ucp.reference.fulfillment.specTitle": "\nCapacità di evasione degli acquisti",
  "ucp.reference.fulfillment.schemaTitle": "\nSchema della capacità di evasione degli acquisti",
  "ucp.reference.buyerConsent.specTitle":
    "\nFunzionalità di consenso dell'acquirente per gli acquisti",
  "ucp.reference.buyerConsent.schemaTitle":
    "\nSchema della funzionalità di consenso dell'acquirente per gli acquisti",
  "ucp.reference.paymentHandler.specTitle":
    "\nSpecifica del gestore dei pagamenti del commerciante",
  "ucp.reference.paymentHandler.configSchemaTitle":
    "\nSchema di configurazione del gestore dei pagamenti del commerciante",
  "ucp.reference.paymentHandler.instrumentSchemaTitle": "\nSchema strumento di pagamento con carta",
  "nav.chat": "\nChatta",
  "nav.automations": "\nAutomazioni",
  "chat.title": "\nChat di squadra",
  "chat.subtitle":
    "\nThread di collaborazione condivisi tra operazioni, portale e trasferimenti AI",
  "chat.workspace.eyebrow": "\nOperazioni collaborative",
  "chat.workspace.internalTitle": "\nCollaborazione operativa",
  "chat.workspace.internalDescription":
    "\nThread della sala interna per operatori, analisti e flussi di lavoro .bao.",
  "chat.workspace.portalTitle": "\nCollaborazione con i partner",
  "chat.workspace.portalDescription":
    "\nThread di conversazione sicuri per il portale per il coordinamento della consegna, il contesto del documento e il trasferimento assistito da .bao.",
  "chat.workspace.publicTitle": "\nSessioni dell'assistente pubblico",
  "chat.workspace.publicDescription":
    "\nSessioni di assunzione pubbliche basate su .bao che possono degenerare in portali o flussi di lavoro operativi.",
  "chat.workspace.threadListTitle": "\nDiscussioni",
  "chat.workspace.threadListDescription":
    "\nOgni thread è persistente in modo che le azioni .bao, i trasferimenti e il contesto di consegna rimangano collegati alla stessa cronologia dell'entità.",
  "chat.workspace.composeTitle": "\nInvia aggiornamento",
  "chat.workspace.composeDescription":
    "\nI messaggi vengono archiviati come eventi di collaborazione di prima classe in modo che l'automazione, il reporting e le azioni .bao possano fare riferimento allo stesso thread.",
  "chat.workspace.messageLabel": "\nMessaggio",
  "chat.workspace.messagePlaceholder":
    "\nScrivi una nota di aggiornamento, richiesta o escalation del team",
  "chat.workspace.composeHint":
    "\nUtilizza la bolla .bao condivisa per istruzioni guidate; utilizza questo modulo per aggiornamenti durevoli del thread.",
  "chat.workspace.sendAction": "\nInvia messaggio",
  "chat.workspace.askAiAction": "\nChiedi a .bao nel thread",
  "chat.workspace.summarizeThreadAction": "Riepiloga thread",
  "chat.workspace.automationRunAction": "\nEsecuzione dell'automazione della coda",
  "chat.workspace.reportPackBuildAction": "\nCrea pacchetto di rapporti",
  "chat.workspace.reportPackCompareAction": "\nConfronta le versioni del pacchetto",
  "chat.workspace.convertTaskAction": "\nConverti in attività",
  "chat.workspace.convertReportAction": "\nConverti in rapporto",
  "chat.workspace.mlAnalysisAction": "\nRichiedi analisi ML",
  "chat.workspace.publicHandoffAction": "\nCrea nota di trasferimento",
  "chat.workspace.aiActionsTitle": "\nAzioni dell'assistente",
  "chat.workspace.aiActionsDescription":
    "\nMantieni le risposte dell'assistente, i riepiloghi e le azioni del piano di controllo nella stessa cronologia dei thread.",
  "chat.workspace.aiDefaultPrompt":
    "\nEsamina il thread corrente e aiuta con l'azione successiva dell'operatore.",
  "chat.workspace.emptyThread":
    "\nSeleziona una conversazione per rivedere la cronologia dei messaggi.",
  "chat.workspace.noThreadsTitle": "\nNessun thread di collaborazione è ancora attivo.",
  "chat.workspace.noThreadsDescription":
    "\nCrea o instrada una conversazione in questa superficie prima di utilizzare la cronologia dei thread condivisi e le azioni dell'assistente.",
  "chat.workspace.composeUnavailableTitle":
    "\nSeleziona un thread prima di pubblicare o eseguire le azioni dell'assistente.",
  "chat.workspace.composeUnavailableDescription":
    "\nI messaggi dei thread, i riepiloghi, le esecuzioni di automazione e le note di trasferimento persistono tutti in una conversazione attiva.",
  "chat.workspace.surfaceInternal": "\nInterno",
  "chat.workspace.surfacePortal": "\nPortale",
  "chat.workspace.surfacePublic": "\nPubblico",
  "chat.workspace.threadCount": "\n{count} discussioni",
  "chat.workspace.typeChannel": "\nCanale",
  "chat.workspace.typeDirectMessage": "\nMessaggio diretto",
  "chat.workspace.typeEntityThread": "\nThread entità",
  "chat.workspace.typePartyThread": "\nDiscussione del partner",
  "chat.workspace.typePublicAssistant": "\nSessione assistente",
  "chat.workspace.participantsTitle": "\nPartecipanti",
  "chat.workspace.participantsDescription":
    "\nChi è attivo in questa conversazione e può essere taggato nei nuovi messaggi.",
  "chat.workspace.noParticipants":
    "\nNessun partecipante è ancora collegato a questa conversazione.",
  "chat.workspace.featuresTitle": "\nCaratteristiche discussione",
  "chat.workspace.featuresDescription":
    "\nIl tipo di conversazione, i record collegati, il volume dei messaggi e la disponibilità dell'intelligenza artificiale rimangono visibili accanto al thread.",
  "chat.workspace.linkedRecordsTitle": "\nRecord collegati",
  "chat.workspace.linkedRecordsDescription":
    "\nI documenti commerciali e operativi allegati a questa conversazione rimangono visibili nello stesso spazio di lavoro.",
  "chat.workspace.noLinkedRecords":
    "\nNessun record collegato è ancora allegato a questa conversazione.",
  "chat.workspace.tagPeopleTitle": "\nTagga persone e AI",
  "chat.workspace.tagPeopleDescription":
    "\nI partecipanti selezionati vengono memorizzati con il messaggio in modo che i trasferimenti e il lavoro di follow-up mantengano lo stesso contesto.",
  "chat.workspace.tagParticipantAria": "\nTagga {participant} in questo messaggio",
  "chat.workspace.noTagTargets":
    "\nNon sono ancora disponibili target tag per questa conversazione.",
  "chat.workspace.participantCount": "\n{count} partecipanti",
  "chat.workspace.messageCount": "\n{count} messaggi",
  "chat.workspace.linkedRecordCount": "\n{count} record collegati",
  "chat.workspace.participantMetricLabel": "\nPartecipanti",
  "chat.workspace.messageMetricLabel": "\nMessaggi",
  "chat.workspace.linkedRecordMetricLabel": "\nCollegato",
  "chat.workspace.slaQueueTitle": "\nCoda SLA",
  "chat.workspace.slaQueueDescription":
    "\nDiscussioni non lette o appena aggiornate che necessitano di un follow-up programmato o di una decisione di inoltro.",
  "chat.workspace.ownerQueueTitle": "\nPostura del proprietario",
  "chat.workspace.ownerQueueDescription":
    "\nMantieni visibili il set di partecipanti attivi e la profondità del messaggio prima di assegnare il proprietario successivo.",
  "chat.workspace.triageModesTitle": "\nModalità triage",
  "chat.workspace.triageModesDescription":
    "Passa dalla revisione del thread alla conversione delle attività, al reporting o al follow-up del proprietario senza perdere il contesto della conversazione.",
  "chat.workspace.aiEnabled": "\nAI pronto",
  "chat.workspace.aiDisabled": "\nAI disattivato",
  "chat.workspace.participantAudienceAi": "IA",
  "chat.workspace.participantAudienceOperator": "\nOperatore",
  "chat.workspace.participantAudiencePartner": "\nPartner",
  "chat.workspace.participantAudiencePublic": "\nPubblico",
  "chat.workspace.participantRoleOwner": "\nProprietario",
  "chat.workspace.participantRoleMember": "\nMembro",
  "chat.workspace.participantRoleObserver": "\nOsservatore",
  "chat.workspace.participantRoleAssistant": "\nAssistente",
  "chat.workspace.viewerParticipant": "\nTu",
  "chat.validation.messageRequired": "\nIl contenuto del messaggio è obbligatorio.",
  "chat.validation.conversationNotFound": "\nImpossibile trovare la conversazione.",
  "chat.validation.mentionNotFound": "\nImpossibile risolvere uno o più partecipanti taggati.",
  "chat.assistant.action.automationRunCreated":
    "\nEsecuzione dell'automazione in coda per {title}. Stato attuale: {status}.",
  "chat.assistant.action.reportPackBuilt":
    "\nCreata una nuova versione del pacchetto di report per {title}. ID versione attiva: {versionId}.",
  "chat.assistant.action.publicHandoffStarted":
    "\nTrasferimento pubblico avviato per {title}. Thread di escalation interno: {threadId}.",
  "chat.assistant.action.publicHandoffAutomationQueued":
    "\nEsecuzione dell'automazione in coda {runId} per instradare l'escalation.",
  "chat.assistant.action.mlRunRequested":
    "\nEsecuzione dell'analisi ML in coda {runId}. Stato attuale: {status}.",
  "chat.assistant.handoff.threadTitle": "\nTrasferimento pubblico: {title}",
  "chat.assistant.handoff.threadDescription":
    "\nThread di escalation interno creato da una sessione dell'assistente pubblico.",
  "chat.assistant.handoff.seedMessage":
    "\nL'assistente pubblico ha inoltrato il messaggio a {title}. Contesto più recente: {summary}",
  "chat.assistant.handoff.runNotes":
    "\nTrasferimento pubblico per {title}. ID conversazione di origine: {conversationId}.",
  "chat.seed.actors.ai": "IA",
  "chat.seed.actors.operator": "\nOperatore",
  "chat.seed.actors.partner": "\nPartner",
  "chat.seed.internal.operationsTitle": "\nValutazione della preparazione operativa",
  "chat.seed.internal.operationsDescription":
    "\nAggiornamenti sulla preparazione interfunzionale che collegano risorse, pacchetti ed escalation.",
  "chat.seed.internal.operationsPreview":
    "\nL'intelligenza artificiale ha segnalato due delta di prontezza e ha suggerito di aggiornare il pacchetto schede prima del briefing delle 18:00.",
  "chat.seed.internal.operationsAiMessage":
    "\nHo trovato due delta di prontezza che influenzano l'attuale pacchetto di schede. Aggiorna il pacchetto operativo prima del prossimo briefing.",
  "chat.seed.internal.operationsUserMessage":
    "\nIncrementa i delta nel pacchetto attivo e avvisa il responsabile immobiliare se la previsione di utilizzo diminuisce nuovamente.",
  "chat.seed.internal.estateLead": "\nLead immobiliare",
  "chat.seed.internal.operationsAnchorPack": "\nPacchetto operativo v3",
  "chat.seed.internal.operationsAnchorEstate": "\nProntezza immobiliare",
  "chat.seed.internal.reportsTitle": "\nSegnala le recensioni dei pacchetti",
  "chat.seed.internal.reportsDescription":
    "\nCommenti in thread per report salvati, revisioni di pacchetti e confronti cronologici.",
  "chat.seed.internal.reportsPreview":
    "\nIl Board Pack v3 è pronto per la revisione con il contesto delle anomalie aggiornato e le note sull'esposizione commerciale.",
  "chat.seed.portal.fulfilmentTitle": "\nConsegna dell'adempimento del partner",
  "chat.seed.portal.fulfilmentDescription":
    "\nThread visibile nel portale per confermare l'ambito di lavoro, lo stato del documento e le bozze di risposta assistite dall'intelligenza artificiale.",
  "chat.seed.portal.fulfilmentPreview":
    "\nL'operatore AI ha redatto un riepilogo del trasferimento per l'ultima tappa fondamentale dell'ordine di lavoro e la sospensione della fattura.",
  "chat.seed.portal.fulfilmentMessage":
    "Conferma il traguardo dell'ordine di lavoro modificato e facci sapere se la sospensione della fattura può ora essere cancellata.",
  "chat.seed.portal.operatorLabel": "\nCoordinatore operativo",
  "chat.seed.portal.anchorLabel": "\nTraguardo dell'ordine di lavoro del partner",
  "chat.seed.public.assistantTitle": "\nAssistente per l'immissione della richiesta di offerta",
  "chat.seed.public.assistantDescription":
    "\nThread pubblico di assunzione dell'IA collegato alle domande dell'acquirente e al contesto della richiesta di offerta.",
  "chat.seed.public.assistantPreview":
    "\nL'assistente ha catturato i requisiti dell'acquirente, ha chiarito i tempi di consegna e ha preparato un percorso di escalation.",
  "chat.seed.public.assistantMessage":
    "\nPosso raccogliere i tuoi requisiti, riassumere l'ambito e inoltrarli a un operatore quando è necessaria una revisione commerciale.",
  "chat.seed.public.buyerLabel": "\nAcquirente",
  "chat.seed.public.anchorLabel": "\nRichiesta di offerta",
  "controlPlane.validation.definitionNotFound":
    "\nImpossibile trovare la definizione di automazione.",
  "controlPlane.validation.definitionRequired": "\nÈ richiesta la definizione dell'automazione.",
  "controlPlane.validation.definitionTitleRequired":
    "\nIl titolo della definizione di automazione è obbligatorio.",
  "controlPlane.validation.definitionStatusInvalid":
    "\nLa transizione di stato richiesta non è valida.",
  "controlPlane.validation.automationActivationRequiresTrigger":
    "\nAggiungi almeno un trigger prima di attivare questa definizione di automazione.",
  "controlPlane.validation.automationActivationRequiresSteps":
    "\nAggiungi almeno un passaggio prima di attivare questa definizione di automazione.",
  "controlPlane.validation.automationActivationRequiresSchedule":
    "\nLe definizioni di automazione pianificata richiedono almeno una pianificazione prima dell'attivazione.",
  "controlPlane.validation.automationTriggerNameRequired":
    "\nIl nome del trigger di automazione è obbligatorio.",
  "controlPlane.validation.automationStepNameRequired":
    "\nIl nome del passaggio di automazione è obbligatorio.",
  "controlPlane.validation.automationScheduleRuleRequired":
    "\nLa regola di pianificazione dell'automazione è obbligatoria.",
  "controlPlane.validation.automationScheduleTimezoneRequired":
    "\nIl fuso orario della pianificazione dell'automazione è obbligatorio.",
  "controlPlane.validation.automationScheduleTimestampInvalid":
    "\nI timestamp della pianificazione dell'automazione devono essere valori di data e ora validi.",
  "controlPlane.validation.automationArtifactTitleRequired":
    "\nIl titolo dell'artefatto di automazione è obbligatorio.",
  "controlPlane.validation.automationRunNotFound":
    "\nImpossibile trovare l'esecuzione dell'automazione.",
  "controlPlane.validation.automationRunTransitionInvalid":
    "\nLa transizione dell'esecuzione dell'automazione richiesta non è valida.",
  "controlPlane.validation.automationRunDefinitionRequired":
    "\nQuesta esecuzione di automazione non è collegata a una definizione riutilizzabile.",
  "controlPlane.validation.automationRunRetryInvalid":
    "\nÈ possibile ritentare solo le esecuzioni di automazione non riuscite o annullate.",
  "controlPlane.definition.created": '\nCreazione della definizione di automazione "{title}".',
  "controlPlane.definition.statusUpdated": "\nStato aggiornato a {status}.",
  "controlPlane.validation.reportPackNotFound": "\nPacchetto di rapporti non trovato.",
  "controlPlane.validation.reportPackCompareRequiresVersions":
    "\nPrima del confronto sono necessarie almeno due versioni del pacchetto di report.",
  "controlPlane.validation.mlExperimentNotFound": "\nEsperimento ML non trovato.",
  "controlPlane.validation.modelVersionNotFound": "\nImpossibile trovare la versione del modello.",
  "controlPlane.validation.mlRequestTargetRequired":
    "\nSeleziona un esperimento ML o una versione del modello prima di richiedere l'analisi.",
  "controlPlane.reportPack.compareSummary":
    "\nConfronta le ultime versioni del pacchetto di report per {title}. Versione più recente: {newerVersionId}. Versione precedente: {olderVersionId}.",
  "controlPlane.seed.automation.packRefreshTitle": "\nAggiornamento pacchetto strategico",
  "controlPlane.seed.automation.packRefreshDescription":
    "Ricostruisci il board pack attivo, pubblica gli ultimi delta della cronologia e informa il thread di revisione.",
  "controlPlane.seed.automation.packRefreshArtifactBoardPackTitle": "\nPacchetto tavole v3",
  "controlPlane.seed.automation.packRefreshArtifactInputSnapshotTitle":
    "\nIstantanea dell'input esecutivo",
  "controlPlane.seed.automation.packRefreshArtifactDraftTitle": "\nBozza del pacchetto di schede",
  "controlPlane.seed.automation.portalHandoffTitle": "\nTrasferimento dell'adempimento del portale",
  "controlPlane.seed.automation.portalHandoffDescription":
    "\nCrea un riepilogo visibile al partner quando cambiano ordini di lavoro, fatture o traguardi di consegna.",
  "controlPlane.seed.automation.portalHandoffArtifactMemoTitle":
    "\nMemo di trasferimento del portale",
  "controlPlane.seed.automation.portalHandoffArtifactNoteTitle":
    "\nNota di trasferimento del portale partner",
  "controlPlane.seed.datasets.estateTitle": "\nDataset posturale immobiliare",
  "controlPlane.seed.datasets.estateDescription":
    "\nMetriche di comportamento tra spazi di lavoro per disponibilità, utilizzo e rischio di intervento.",
  "controlPlane.seed.datasets.orderTitle": "\nSet di dati del flusso degli ordini",
  "controlPlane.seed.datasets.orderDescription":
    "\nMetriche della sequenza temporale commerciale che coprono richieste di offerta, ordini cliente, ordini di lavoro e fatture.",
  "controlPlane.seed.packs.boardTitle": "\nPacchetto tavole",
  "controlPlane.seed.packs.boardDescription":
    "\nPacchetto decisionale strategico con cronologia, atteggiamento e contesto di rischio commerciale.",
  "controlPlane.seed.packs.operationsTitle": "\nPacchetto operazioni",
  "controlPlane.seed.packs.operationsDescription":
    "\nPacchetto operativo sul campo con delta di utilizzo, preparazione ed esecuzione del lavoro.",
  "controlPlane.seed.ml.demandForecastTitle": "\nEsperimento di previsione della domanda",
  "controlPlane.seed.ml.demandForecastObjective":
    "\nPrevisione della domanda commerciale e trigger di anomalia per il prossimo orizzonte operativo.",
  "controlPlane.seed.models.demandTitle": "\nModello di previsione della domanda",
  "controlPlane.seed.models.demandDescription":
    "\nVoce del registro per le versioni di previsione della domanda approvate e il relativo stato di distribuzione.",
  "insurance.seed.policy.generalLiabilityDescription":
    "\nCopertura di responsabilità generale per le operazioni del sito di formazione Nord.",
  "insurance.seed.policy.propertyDescription":
    "\nCopertura della proprietà per edifici e infrastrutture del West Compound.",
  "insurance.seed.policy.cyberDescription":
    "\nCopertura della responsabilità informatica per piattaforma e patrimonio IoT.",
  "insurance.seed.coverage.bodilyInjury": "\nLesioni personali per evento",
  "insurance.seed.coverage.propertyDamage": "\nDanni materiali per evento",
  "insurance.seed.coverage.aggregate": "\nAggregato generale",
  "insurance.seed.claim.waterDamageDescription":
    "\nDanni causati dall'acqua al tetto della struttura di allenamento a seguito della tempesta. Riparazioni temporanee completate.",
  "insurance.seed.claim.vehicleDamageDescription":
    "\nDanni lievi al veicolo nel parcheggio condominiale. Nessun ferito.",
  "reports.expansion.title": "\nPiano di controllo di scienza dei dati e automazione",
  "reports.expansion.description":
    "\nI set di dati, i pacchetti di report, il monitoraggio ML e i trigger di automazione rimangono connessi all'area di lavoro di reporting invece di frammentarsi in strumenti separati.",
  "reports.expansion.openChat": "\nApri chat",
  "reports.expansion.datasetsTitle": "\nRegistro del set di dati",
  "reports.expansion.datasetsDescription":
    "\nSet di dati analitici in tempo reale e monitorati che forniscono pacchetti, metriche e istantanee dei modelli.",
  "reports.expansion.openDatasets": "\nApri la sezione dei set di dati",
  "reports.expansion.packsTitle": "\nSegnala pacchetti",
  "reports.expansion.packsDescription":
    "\nScheda con versione e pacchetti operativi con supporto durevole per stato, derivazione e cronologia.",
  "reports.expansion.openPacks": "\nApri la sezione del pacchetto attivo",
  "reports.expansion.mlTitle": "Piano di controllo ML",
  "reports.expansion.mlDescription":
    "\nEsperimenti, esecuzioni e voci di registro che espongono previsioni e comportamenti di anomalie accanto alla composizione del report.",
  "reports.expansion.openModels": "\nGovernance dell'IA aperta",
  "reports.expansion.automationsTitle": "\nRegistro automazioni",
  "reports.expansion.automationsDescription":
    "\nDefinizioni di automazione native di Bun che coordinano l'aggiornamento dei report, le notifiche e i flussi di lavoro collegati alla chat.",
  "reports.expansion.openAutomations": "\nApri spazio di lavoro automazioni",
  "automations.title": "\nAutomazioni",
  "automations.subtitle":
    "\nDefinizioni, esecuzioni e modalità di esecuzione da una superficie di controllo SSR",
  "automations.workspace.eyebrow": "\nArea di lavoro di automazione",
  "automations.workspace.title": "\nPiano di controllo dell'automazione dedicato",
  "automations.workspace.description":
    "\nEsamina le definizioni di automazione, le esecuzioni recenti, i tipi di trigger e la postura di esecuzione senza uscire dalla shell delle operazioni.",
  "automations.workspace.definitionTitle": "\nDefinizioni di automazione",
  "automations.workspace.definitionDescription":
    "\nRecord di definizione, modalità di trigger e tempi di esecuzione successiva per il catalogo di automazione corrente.",
  "automations.workspace.runTitle": "\nEsecuzioni recenti di automazione",
  "automations.workspace.runDescription":
    "\nLe ultime esecuzioni in coda, in esecuzione e completate sono emerse dal piano di controllo.",
  "automations.workspace.definitionCount": "\n{count} definizioni",
  "automations.workspace.runCount": "\n{count} corre",
  "automations.workspace.activeDefinitionCount": "\n{count} definizioni attive",
  "automations.workspace.runningRunCount": "\n{count} corre corre",
  "automations.workspace.definitionTrigger": "\nTrigger",
  "automations.workspace.definitionSteps": "\n{count} passi",
  "automations.workspace.definitionNextRun": "\nProssima corsa",
  "automations.workspace.definitionSurface": "\nSuperficie",
  "automations.workspace.definitionState": "\nStato",
  "automations.workspace.runsEmpty": "\nNon sono ancora disponibili esecuzioni di automazione.",
  "automations.workspace.definitionsEmpty":
    "\nNon sono ancora disponibili definizioni di automazione.",
  "automations.workspace.runCreatedAt": "\nCreato",
  "automations.workspace.runCompletedAt": "\nCompletato",
  "automations.workspace.runDefinition": "\nDefinizione",
  "automations.workspace.runKind": "\nGentile",
  "automations.workspace.runStatus": "\nStato",
  "automations.workspace.openReports": "\nApri rapporti",
  "automations.workspace.openAdmin": "\nApri governance amministrativa",
  "automations.workspace.posture.title": "Execution posture",
  "automations.workspace.posture.description":
    "Keep approvals, live runs, and execution pressure visible while you work definitions or review recent activity.",
  "automations.workspace.posture.approvals":
    "{count} definition(s) still require approval coverage before all runs can start cleanly.",
  "automations.workspace.posture.pending":
    "{count} run(s) are waiting for an approval decision before leaving the queue.",
  "automations.workspace.posture.running":
    "{count} run(s) are currently executing across the active automation surface.",
  "automations.workspace.stats.definitions": "\nDefinizioni",
  "automations.workspace.stats.running": "\nIn corsa",
  "automations.workspace.stats.successRate": "\nTasso di successo",
  "automations.workspace.runDetail.status": "\nStato",
  "automations.workspace.runDetail.created": "\nCreato",
  "automations.workspace.runDetail.completed": "\nCompletato",
  "automations.workspace.runDetail.definition": "\nDefinizione",
  "automations.workspace.runDetail.steps": "\nPassaggi di esecuzione",
  "automations.workspace.runDetail.artifacts": "\nArtefatti",
  "automations.workspace.runDetail.artifactsEmpty": "\nNessun artefatto generato",
  "automations.workspace.definitionPreview.title": "\nAnteprima del flusso di lavoro",
  "automations.workspace.definitionPreview.steps": "\nPassaggi",
  "automations.workspace.definitionPreview.description":
    "\nIspeziona la sequenza del flusso di lavoro selezionata, la postura della pianificazione e gli ultimi artefatti.",
  "automations.workspace.definitionPreview.empty":
    "\nScegli una definizione per esaminarne il flusso di lavoro e gli ultimi artefatti di automazione.",
  "automations.workspace.definitionPreview.guideFlow":
    "Inspect the current workflow sequence before moving the automation into downstream review or incident response.",
  "automations.workspace.definitionPreview.guideSchedule":
    "Keep the next run window and timezone visible while reviewing trigger cadence and operating coverage.",
  "automations.workspace.definitionPreview.guideArtifacts":
    "Use the latest artifacts to confirm the workflow is still producing the expected operational output.",
  "automations.workspace.definitionPreview.timezone": "\nFuso orario",
  "automations.workspace.filters.definitionStatus":
    "\nFiltra le definizioni di automazione per status",
  "automations.workspace.filters.runStatus":
    "\nL'automazione del filtro viene eseguita in base allo status",
  "automations.workspace.filters.definitionScope":
    "\nL'automazione del filtro viene eseguita per definizione",
  "automations.workspace.filters.allStatuses": "\nTutti gli stati",
  "automations.workspace.filters.allDefinitions": "\nTutte le definizioni",
  "automations.workspace.actions.preview": "\nAnteprima del flusso di lavoro",
  "automations.workspace.actions.showRuns": "\nMostra corse",
  "automations.workspace.runDetail.notFound":
    "\nImpossibile trovare l'esecuzione dell'automazione richiesta.",
  "automations.workspace.runDetail.started": "\nIniziato",
  "automations.workspace.runDetail.claimed": "\nRivendicato",
  "automations.workspace.runDetail.heartbeat": "\nBattito cardiaco",
  "automations.workspace.runDetail.surface": "\nSuperficie",
  "automations.workspace.runDetail.trigger": "\nTrigger",
  "automations.workspace.runDetail.notes": "\nNote",
  "automations.workspace.manualRun.title": "\nLancio esecuzione manuale",
  "automations.workspace.manualRun.description":
    "\nMetti in coda l'esecuzione di un flusso di lavoro in tempo reale senza uscire dall'area di lavoro di automazione.",
  "automations.workspace.manualRun.databaseRequired":
    "\nGli lanci manuali sono disponibili solo quando è configurato il piano di controllo supportato da database.",
  "automations.workspace.manualRun.noActiveDefinitions":
    "\nNessuna definizione di automazione attiva è attualmente disponibile per l'avvio manuale.",
  "automations.workspace.manualRun.definitionLabel": "\nDefinizione coda",
  "automations.workspace.manualRun.definitionHint":
    "Solo le definizioni di automazione attive possono essere accodate da questo spazio di lavoro.",
  "automations.workspace.manualRun.notesLabel": "\nEsegui note",
  "automations.workspace.manualRun.notesHint":
    "\nContesto operatore facoltativo da allegare all'esecuzione dell'automazione in coda.",
  "automations.workspace.manualRun.submit": "\nAvvia corsa",
  "automations.workspace.manualRun.created": "\n{title} è stato messo in coda correttamente.",
  "automations.workspace.definitionStatus.DRAFT": "\nBozza",
  "automations.workspace.definitionStatus.ACTIVE": "\nAttivo",
  "automations.workspace.definitionStatus.PAUSED": "\nIn pausa",
  "automations.workspace.definitionStatus.ARCHIVED": "\nArchiviato",
  "automations.workspace.runStatus.QUEUED": "\nIn coda",
  "automations.workspace.runStatus.RUNNING": "\nIn corsa",
  "automations.workspace.runStatus.SUCCEEDED": "\nRiuscito",
  "automations.workspace.runStatus.FAILED": "\nNon riuscito",
  "automations.workspace.runStatus.CANCELED": "\nAnnullato",
  "automations.workspace.runKind.REPORT_PACK": "\nSegnala pacchetto",
  "automations.workspace.runKind.WORKFLOW": "\nFlusso di lavoro",
  "automations.workspace.runKind.EDGE_RUNBOOK": "\nRunbook Edge",
  "automations.workspace.runKind.DEVICE_COMMAND": "\nComando dispositivo",
  "automations.workspace.runKind.ML_PIPELINE": "\nPipeline di machine learning",
  "automations.workspace.runStatus.AWAITING_APPROVAL": "\nIn attesa di approvazione",
  "automations.workspace.triggerKind.COMPLETION_OF": "\nCompletamento di",
  "automations.workspace.approvalGate.title": "\nCancello di approvazione",
  "automations.workspace.approvalGate.description":
    "\nQuesta automazione richiede l'approvazione manuale prima dell'inizio dell'esecuzione.",
  "automations.workspace.approvalGate.approve": "\nApprova esecuzione",
  "automations.workspace.approvalGate.reject": "\nRifiuta esecuzione",
  "automations.workspace.approvalGate.pending": "\nIn attesa di approvazione",
  "automations.workspace.approvalGate.approvedBy": "\nApprovato da {name}",
  "automations.workspace.approvalGate.approvedAt": "\nApprovato il",
  "automations.workspace.approvalGate.confirmTitle": "\nConferma approvazione",
  "automations.workspace.approvalGate.confirmDescription":
    "\nL'approvazione di questa corsa la farà passare allo stato IN ESECUZIONE. Questa azione non può essere annullata.",
  "automations.workspace.approvalGate.rejectTitle": "\nConferma rifiuto",
  "automations.workspace.approvalGate.rejectDescription":
    "\nRifiutare questa corsa la annullerà. Questa azione non può essere annullata.",
  "automations.workspace.approvalGate.requiresApproval": "\nRichiede l'approvazione",
  "automations.workspace.approvalGate.noApprovalRequired": "\nNessuna approvazione richiesta",
  "automations.workspace.scheduleEditor.title": "\nEditor della pianificazione",
  "automations.workspace.scheduleEditor.description":
    "\nConfigura quando viene eseguita questa automazione utilizzando i selettori del giorno della settimana, dell'ora e del fuso orario.",
  "automations.workspace.scheduleEditor.cronLabel": "\nRegola di ricorrenza",
  "automations.workspace.scheduleEditor.timezoneLabel": "\nFuso orario",
  "automations.workspace.scheduleEditor.previewLabel": "\nAnteprima esecuzione successiva",
  "automations.workspace.scheduleEditor.save": "\nSalva programma",
  "automations.workspace.scheduleEditor.daysOfWeek": "\nGiorni della settimana",
  "automations.workspace.scheduleEditor.hourLabel": "\nOra (24h)",
  "automations.workspace.scheduleEditor.minuteLabel": "\nMinuto",
  "automations.workspace.scheduleEditor.monday": "\nLun",
  "automations.workspace.scheduleEditor.tuesday": "\nMar",
  "automations.workspace.scheduleEditor.wednesday": "\nMer",
  "automations.workspace.scheduleEditor.thursday": "\nGio",
  "automations.workspace.scheduleEditor.friday": "\nVen",
  "automations.workspace.scheduleEditor.saturday": "\nSab",
  "automations.workspace.scheduleEditor.sunday": "\nSole",
  "automations.workspace.retryPolicy.title": "\nRiprova policy",
  "automations.workspace.retryPolicy.description":
    "\nConfigura il comportamento dei tentativi automatici per le esecuzioni di automazione non riuscite.",
  "automations.workspace.retryPolicy.maxAttempts": "\nNumero massimo di tentativi",
  "automations.workspace.retryPolicy.backoffMs": "\nIntervallo di backoff (ms)",
  "automations.workspace.retryPolicy.retryOnLabel": "\nRiprova su status",
  "automations.workspace.retryPolicy.save": "\nSalva criterio di nuovo tentativo",
  "automations.workspace.retryPolicy.noPolicy": "\nNessun criterio di ripetizione configurato.",
  "automations.workspace.retryPolicy.attempt": "\nNuovo tentativo {attempt}",
  "automations.workspace.retryPolicy.parentRun": "\nCorsa principale",
  "automations.workspace.auditTrail.title": "\nTraccia di controllo",
  "automations.workspace.auditTrail.description":
    "\nVisualizza chi ha avviato le esecuzioni di automazione, quando sono state attivate e i relativi risultati.",
  "automations.workspace.auditTrail.whoRan": "\nRichiesto da",
  "automations.workspace.auditTrail.triggeredBy": "\nTrigger",
  "automations.workspace.auditTrail.definition": "\nDefinizione",
  "automations.workspace.auditTrail.outcome": "\nRisultato",
  "automations.workspace.auditTrail.timestamp": "\nTimestamp",
  "automations.workspace.auditTrail.empty": "\nNessuna voce dell'audit trail trovata.",
  "automations.workspace.auditTrail.filterByUser": "\nFiltra per utente",
  "automations.workspace.auditTrail.filterByDefinition": "\nFiltra per definizione",
  "automations.workspace.auditTrail.filterByDateRange": "\nFiltra per intervallo di date",
  "automations.workspace.auditTrail.searchPlaceholder": "\nCerca traccia di controllo...",
  "automations.workspace.auditTrail.searchAria": "\nCerca voci della traccia di controllo",
  "automations.workspace.chainedSequence.title": "\nSequenza concatenata",
  "automations.workspace.chainedSequence.description":
    "\nConcatena questa automazione per attivarsi al completamento di un'altra definizione.",
  "automations.workspace.chainedSequence.upstream": "\nDefinizione a monte",
  "automations.workspace.chainedSequence.downstream": "\nDefinizioni a valle",
  "automations.workspace.chainedSequence.selectUpstream": "\nSeleziona la definizione upstream",
  "automations.workspace.chainedSequence.save": "\nSalva catena",
  "automations.workspace.chainedSequence.noChain": "\nNessuna catena configurata.",
  "automations.workspace.chainedSequence.chainVisualization": "\nVisualizzazione catena",
  "admin.aiSettings.provider.RAMALAMA": "\nRamaLama",
  "admin.aiSettings.provider.OLLAMA": "\nOllama",
  "admin.aiSettings.provider.OPENAI": "\nApriAI",
  "admin.aiSettings.provider.CLAUDE": "\nClaudio",
  "admin.aiSettings.provider.HUGGINGFACE": "\nIl viso che abbraccia",
  "admin.aiSettings.provider.GEMINI": "\nGemelli",
  "documentWorkflow.bar.label": "\nFlusso di lavoro del documento",
  "documentWorkflow.action.submit": "\nInvia",
  "documentWorkflow.action.approve": "\nApprova",
  "documentWorkflow.action.reject": "\nRifiuta",
  "documentWorkflow.action.qualify": "\nQualificazione",
  "documentWorkflow.action.quote": "\nCitazione",
  "documentWorkflow.action.accept": "\nAccetta",
  "documentWorkflow.action.decline": "\nRifiuta",
  "documentWorkflow.action.confirm": "\nConferma",
  "documentWorkflow.action.startFulfilment": "\nInizia l'adempimento",
  "documentWorkflow.action.complete": "\nCompleta",
  "documentWorkflow.action.schedule": "\nProgramma",
  "documentWorkflow.action.startWork": "\nInizia a lavorare",
  "documentWorkflow.action.submitReview": "\nInvia per la revisione",
  "documentWorkflow.action.send": "\nInvia",
  "documentWorkflow.action.close": "\nChiudi",
  "documentWorkflow.action.receiveItems": "\nRicevi articoli",
  "documentWorkflow.action.recordPayment": "\nRegistra pagamento",
  "documentWorkflow.action.issue": "\nProblema",
  "documentWorkflow.action.void": "\nVuoto",
  "documentWorkflow.status.draft": "\nBozza",
  "documentWorkflow.status.submitted": "\nInviato",
  "documentWorkflow.status.qualified": "\nQualificato",
  "documentWorkflow.status.quoted": "\nCitato",
  "documentWorkflow.status.accepted": "\nAccettato",
  "documentWorkflow.status.declined": "\nRifiutato",
  "documentWorkflow.status.pendingApproval": "\nIn attesa di approvazione",
  "documentWorkflow.status.approved": "Approvato",
  "documentWorkflow.status.confirmed": "\nConfermato",
  "documentWorkflow.status.inFulfilment": "\nIn esecuzione",
  "documentWorkflow.status.completed": "\nCompletato",
  "documentWorkflow.status.triage": "\nTriage",
  "documentWorkflow.status.scheduled": "\nProgrammato",
  "documentWorkflow.status.inProgress": "\nIn corso",
  "documentWorkflow.status.readyForReview": "\nPronto per la revisione",
  "documentWorkflow.status.requested": "\nRichiesto",
  "documentWorkflow.status.sent": "\nInviato",
  "documentWorkflow.status.partiallyReceived": "\nParzialmente ricevuto",
  "documentWorkflow.status.received": "\nRicevuto",
  "documentWorkflow.status.billed": "\nFatturato",
  "documentWorkflow.status.closed": "\nChiuso",
  "documentWorkflow.status.issued": "\nEmesso",
  "documentWorkflow.status.partiallyPaid": "\nParzialmente pagato",
  "documentWorkflow.status.paid": "\nPagato",
  "documentWorkflow.status.cancelled": "\nAnnullato",
  "documentWorkflow.status.void": "\nVuoto",
  "documentWorkflow.status.writtenOff": "\nCancellato",
  "documentWorkflow.status.expired": "\nScaduto",
  "nav.mlops": "\nMLOps",
  "mlops.title": "\nMLOps",
  "mlops.subtitle":
    "\nEsperimenti in tempo reale, versioni di modelli, implementazioni e comportamento dei dati upstream",
  "mlops.heroEyebrow": "Piano di controllo ML",
  "mlops.coverage":
    "Tieni traccia della situazione dell'esperimento, delle esecuzioni in coda, dei modelli distribuiti e delle dipendenze dei dati upstream da un'unica area di lavoro con rendering su server live.",
  "mlops.chatContext":
    "\nArea di lavoro MLOps. {experiments} esperimenti, {runs} esecuzioni attive, {models} voci di registro e {deployments} distribuzioni attive o in fasi.",
  "mlops.stats.experiments": "\nEsperimenti",
  "mlops.stats.experimentsDescription":
    "\nDefinizioni degli esperimenti attualmente monitorate nel grafico del piano di controllo in tempo reale.",
  "mlops.stats.activeRuns": "\nCorse attive",
  "mlops.stats.activeRunsDescription":
    "\nEsecuzioni di machine learning e automazione attualmente in coda o in esecuzione nella pipeline.",
  "mlops.stats.failedRuns": "\nEsecuzioni non riuscite",
  "mlops.stats.failedRunsDescription":
    "\nEsecuzioni che attualmente necessitano di analisi prima che la promozione del modello continui.",
  "mlops.stats.models": "\nVoci di registro",
  "mlops.stats.modelsDescription":
    "\nRecord del modello disponibili per la valutazione, la gestione temporanea o il rilascio.",
  "mlops.stats.deployments": "\nDistribuzioni in tempo reale",
  "mlops.stats.deploymentsDescription":
    "\nDistribuzioni attualmente organizzate o attive nel percorso di distribuzione del modello.",
  "mlops.stats.dataSources": "\nSorgenti a monte",
  "mlops.stats.dataSourcesDescription":
    "\nSet di dati e pacchetti di report che alimentano l'attuale superficie di revisione MLOps.",
  "mlops.actions.eyebrow": "\nFlussi di lavoro connessi",
  "mlops.actions.title": "\nPassa dalla postura del modello all'azione",
  "mlops.actions.description":
    "\nApri le aree di lavoro connesse che già possiedono reporting, automazione e indagine assistita dall'intelligenza artificiale per questo piano di controllo.",
  "mlops.action.reports":
    "\nEsamina set di dati, pacchetti di report e analisi downstream legate al ciclo di vita del modello corrente.",
  "mlops.action.automations":
    "\nEsamina le esecuzioni di automazione in coda e le definizioni del flusso di lavoro che supportano la promozione della distribuzione.",
  "mlops.action.chat":
    "\nApri lo spazio di lavoro AI condiviso per indagare sulle anomalie, riassumere la postura e pianificare l'azione successiva.",
  "mlops.manualRun.title": "\nAvvia esecuzione manuale",
  "mlops.manualRun.description":
    "\nMetti in coda un'esecuzione manuale di machine learning rispetto a un esperimento, una versione del modello distribuito o entrambi senza uscire dall'area di lavoro.",
  "mlops.manualRun.databaseRequired":
    "\nConfigurare il database prima di avviare esecuzioni manuali di machine learning da quest'area di lavoro.",
  "mlops.manualRun.noTargets":
    "\nNessun esperimento o versione del modello distribuito è ancora disponibile per le esecuzioni manuali di machine learning.",
  "mlops.manualRun.experimentLabel": "\nEsperimento",
  "mlops.manualRun.experimentHint":
    "\nFacoltativo. Scegli un esperimento quando l'esecuzione deve essere allegata a un percorso di valutazione attivo.",
  "mlops.manualRun.experimentOptional": "\nNessun target dell'esperimento",
  "mlops.manualRun.modelVersionLabel": "\nVersione del modello distribuito",
  "mlops.manualRun.modelVersionHint":
    "Opzionale. Scegli una versione del modello distribuito quando l'esecuzione deve valutare una destinazione di rilascio promossa.",
  "mlops.manualRun.modelVersionOptional": "\nNessuna versione del modello distribuita target",
  "mlops.manualRun.submit": "\nEsecuzione manuale coda",
  "mlops.manualRun.created": "\nL'esecuzione manuale di ML è stata accodata correttamente.",
  "mlops.summary.eyebrow": "\nBrief operativo",
  "mlops.summary.title": "\nPostura MLOps attuale",
  "mlops.summary.description":
    "\nQuesta area di lavoro consolida l'esecuzione dell'esperimento, la preparazione alla distribuzione, l'aggiornamento dei dati upstream e la pressione dell'automazione dal grafico in tempo reale.",
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
    "\n{live} dal vivo, {monitor} sotto sorveglianza, {offline} set di dati offline.",
  "mlops.summary.reportPacks":
    "\n{ready} pronto, {building} in costruzione, {failed} pacchetti di report non riusciti.",
  "mlops.summary.automationRuns":
    "\nLe esecuzioni di automazione {count} sono attualmente in coda o in esecuzione.",
  "mlops.summary.deployments": "\nLe distribuzioni {count} sono attualmente in fase o attive.",
  "mlops.runQueue.title": "\nEsegui coda",
  "mlops.runQueue.description":
    "\nDai la priorità al modello e alle esecuzioni di automazione attualmente in coda, in esecuzione o bloccate da un errore.",
  "mlops.runQueue.empty":
    "\nNessuna esecuzione attiva o non riuscita richiede attenzione in questo momento.",
  "mlops.runQueue.table.item": "\nArticolo",
  "mlops.runQueue.table.type": "\nTipo",
  "mlops.runQueue.table.status": "\nStato",
  "mlops.runQueue.table.updated": "\nAggiornato",
  "mlops.runQueue.kind.ml": "\nEsecuzione di machine learning",
  "mlops.runQueue.kind.automation": "\nAutomazione / {kind}",
  "mlops.runQueue.mlFallbackTitle": "\nEsecuzione ML non assegnata",
  "mlops.experiments.title": "\nEsperimenti",
  "mlops.experiments.description":
    "\nEsamina gli obiettivi dell'esperimento, lo stato attuale ed esegui la copertura prima di promuovere nuove versioni del modello.",
  "mlops.experiments.name": "\nNome",
  "mlops.experiments.objective": "\nObiettivo",
  "mlops.experiments.status": "\nStato",
  "mlops.experiments.runCount": "\nEsegue",
  "mlops.experiments.lastUpdated": "\nUltimo aggiornamento",
  "mlops.experiments.empty": "\nNessun esperimento ML ancora connesso.",
  "mlops.registry.title": "\nRegistro modelli",
  "mlops.registry.description":
    "\nEsaminare le voci del registro e l'ultima fase di distribuzione prima di spostare le versioni in produzione.",
  "mlops.registry.name": "\nModello",
  "mlops.registry.stage": "\nPalcoscenico",
  "mlops.registry.versions": "\nVersioni",
  "mlops.registry.empty": "\nNessuna voce di registro del modello è ancora disponibile.",
  "mlops.deployments.title": "\nDistribuzioni",
  "mlops.deployments.description":
    "\nEsamina l'impronta della distribuzione, lo stato della promozione e i timestamp dell'ultima versione dal grafico del modello in tempo reale.",
  "mlops.deployments.model": "\nModello",
  "mlops.deployments.version": "\nVersione",
  "mlops.deployments.environment": "\nAmbiente",
  "mlops.deployments.status": "\nStato",
  "mlops.deployments.deployedAt": "\nSchierato",
  "mlops.deployments.empty": "\nNessuna distribuzione del modello è ancora attiva.",
  "mlops.upstream.title": "\nDipendenze a monte",
  "mlops.upstream.description":
    "\nTieni traccia dell'aggiornamento dei set di dati e dello stato di creazione del pacchetto di report che può bloccare la consegna del modello e l'analisi downstream.",
  "mlops.upstream.empty": "\nNessun set di dati o pacchetto di report upstream è ancora connesso.",
  "mlops.upstream.table.item": "\nArticolo",
  "mlops.upstream.table.kind": "\nGentile",
  "mlops.upstream.table.status": "\nStato",
  "mlops.upstream.table.updated": "\nAggiornato",
  "mlops.upstream.kind.dataset": "\nSet di dati",
  "mlops.upstream.kind.pack": "\nSegnala pacchetto",
  "mlops.runStatus.QUEUED": "\nIn coda",
  "mlops.runStatus.RUNNING": "\nIn corsa",
  "mlops.runStatus.SUCCEEDED": "\nRiuscito",
  "mlops.runStatus.FAILED": "\nNon riuscito",
  "mlops.runStatus.CANCELED": "\nAnnullato",
  "mlops.deploymentStatus.DRAFT": "\nBozza",
  "mlops.deploymentStatus.STAGED": "\nIn scena",
  "mlops.deploymentStatus.ACTIVE": "\nAttivo",
  "mlops.deploymentStatus.ROLLED_BACK": "\nRipristinato",
  "mlops.deploymentStatus.RETIRED": "\nIn pensione",
  "mlops.datasetFreshness.LIVE": "\nDal vivo",
  "mlops.datasetFreshness.MONITOR": "\nMonitor",
  "mlops.datasetFreshness.OFFLINE": "\nNon in linea",
  "mlops.reportPackState.DRAFT": "\nBozza",
  "mlops.reportPackState.BUILDING": "\nEdificio",
  "mlops.reportPackState.READY": "\nPronto",
  "mlops.reportPackState.FAILED": "\nNon riuscito",
  "mlops.reportPackState.ARCHIVED": "\nArchiviato",
  "mlops.automationKind.DEVICE_COMMAND": "\nComando dispositivo",
  "mlops.automationKind.EDGE_RUNBOOK": "\nRunbook Edge",
  "mlops.automationKind.WORKFLOW": "\nFlusso di lavoro",
  "mlops.automationKind.REPORT_PACK": "\nSegnala pacchetto",
  "mlops.automationKind.ML_PIPELINE": "\nPipeline di machine learning",
  "nav.training": "\nFormazione",
  "training.title": "\nPreparazione alla formazione",
  "training.subtitle": "\nDistanze, sistemi di sicurezza, postura del bersaglio e azioni operative",
  "training.heroEyebrow": "\nOperazioni di addestramento",
  "training.coverage":
    "Utilizza le risorse del campo di addestramento in tempo reale, i record di controllo del campo, la pressione degli arretrati e i problemi del sito per favorire la preparazione da un'area di lavoro SSR.",
  "training.view.readiness": "\nProntezza",
  "training.view.controls": "\nControlli",
  "training.view.incidents": "\nIncidenti",
  "training.view.history": "\nStoria",
  "training.chatContext":
    "\nArea di lavoro di preparazione alla formazione. {assets} risorse su {sites} siti. {actions} azioni aperte. {controls} record di controllo della portata in tempo reale.",
  "training.stats.assets": "\nRisorse monitorate",
  "training.stats.assetsDescription":
    "\nCampi di addestramento, sistemi di sicurezza e risorse di mira nell'ambito.",
  "training.stats.readyAssets": "\nPronto adesso",
  "training.stats.readyAssetsDescription":
    "\nBeni attualmente operativi o degradati anziché vincolati.",
  "training.stats.sites": "\nSiti coperti",
  "training.stats.sitesDescription":
    "\nSiti con risorse immobiliari di formazione nel grafico live.",
  "training.stats.actions": "\nAzioni aperte",
  "training.stats.actionsDescription":
    "\nAttività, previsioni critiche e ticket di supporto attivi che necessitano di follow-up.",
  "training.stats.controls": "\nControlli dal vivo",
  "training.stats.controlsDescription":
    "\nRegistri di controllo della portata disponibili per l'area di addestramento.",
  "training.actions.eyebrow": "\nFlussi di lavoro connessi",
  "training.actions.title": "\nPassare dalla preparazione all'esecuzione",
  "training.actions.description":
    "\nApri le aree di lavoro connesse che già possiedono soluzioni di correzione, supporto e reporting per il patrimonio formativo.",
  "training.action.assets":
    "\nIspezionare il registro delle risorse attive e la gerarchia del sistema di supporto.",
  "training.action.tasks":
    "\nInviare ispezioni, riparazioni e lavori di sostituzione per i sistemi di addestramento.",
  "training.action.support":
    "\nEsamina le escalation dei siti live e le code di supporto legate ai siti di formazione.",
  "training.action.reports":
    "\nApri il pacchetto di preparazione per la scheda senza lasciare la shell.",
  "training.action.estate":
    "\nAprire il piano di controllo immobiliare per governance e controlli collegati.",
  "training.workspace.brief.title": "Operational handoff",
  "training.workspace.brief.description":
    "Judge readiness coverage, pending controls, and support pressure before moving through controls, incidents, or history.",
  "training.summary.eyebrow": "\nInformazioni sulla preparazione",
  "training.summary.title": "\nAttuale atteggiamento di preparazione",
  "training.summary.description":
    "\nQuesto spazio di lavoro consolida la disponibilità della formazione, l'attività di controllo e la pressione di follow-up dal grafico operativo in tempo reale.",
  "training.summary.capabilities":
    "\n{ready} delle {total} funzionalità di formazione monitorate sono attualmente pronte.",
  "training.summary.inspections":
    "\n{count} le attività di ispezione scadute stanno attualmente influenzando la disponibilità.",
  "training.summary.controls":
    "\n{count} i record di controllo della portata sono contrassegnati per l'azione richiesta.",
  "training.summary.replacementQueue": "\nGli articoli sostitutivi {count} rimangono in coda.",
  "training.readiness.title": "\nScheda di preparazione alla formazione",
  "training.readiness.description":
    "\nEsaminare la copertura delle capacità, la pressione delle ispezioni e la postura di controllo prima di inviare il lavoro operativo.",
  "training.readiness.empty": "\nNessuna risorsa di formazione dal vivo è ancora collegata.",
  "training.readiness.capabilities": "\nFunzionalità monitorate",
  "training.readiness.capabilitiesDescription":
    "Etichette di capacità attualmente mappate su risorse e intervalli di addestramento.",
  "training.readiness.readyCapabilities": "\nFunzionalità pronte",
  "training.readiness.readyCapabilitiesDescription":
    "\nFunzionalità senza blocco del sito o delle condizioni al momento.",
  "training.readiness.watchCapabilities": "\nFunzionalità dell'orologio",
  "training.readiness.watchCapabilitiesDescription":
    "\nFunzionalità attualmente sotto sorveglianza a causa del degrado o della pressione del sito.",
  "training.readiness.overdueInspections": "\nIspezioni scadute",
  "training.readiness.overdueInspectionsDescription":
    "\nLavoro di ispezione che può ridurre direttamente la disponibilità di formazione.",
  "training.readiness.alertTitle": "\nPostura di controllo operativo",
  "training.readiness.alertDescription":
    "\nI record di controllo {actionRequired} richiedono un'azione, gli articoli sostitutivi {replacementQueue} rimangono in coda e {labourHours} di manodopera è stato registrato nel lavoro di preparazione.",
  "training.siteFocus.title": "\nFocus sul sito",
  "training.siteFocus.subtitle":
    "\nDai la priorità ai siti in cui risorse limitate, arretrati o ticket attivi possono interrompere l'erogazione della formazione.",
  "training.siteFocus.empty": "\nNessun sito di formazione è ancora disponibile.",
  "training.siteFocus.itemDescription":
    "\n{assets} asset, {constrained} vincolati, {tasks} attività aperte, {predictions} previsioni critiche, {tickets} ticket live.",
  "training.attentionAssets.title": "\nRisorse di attenzione",
  "training.attentionAssets.subtitle":
    "\nEsamina le risorse che subiscono maggiori pressioni prima che i problemi si riversino nella consegna.",
  "training.attentionAssets.empty":
    "\nNessuna risorsa di formazione attualmente richiede un'escalation.",
  "training.attentionAssets.itemDescription":
    "\n{site} / {type} / {condition} / Ultima ispezione: {lastInspection} / {signals} segnali in tempo reale.",
  "training.attentionAssets.lastInspectionNone": "\nNon registrato",
  "training.actionQueue.title": "\nCoda di azioni",
  "training.actionQueue.description":
    "\nIn questa coda vengono visualizzati il lavoro scaduto, le previsioni critiche e i problemi di supporto in tempo reale collegati ai siti di formazione.",
  "training.actionQueue.empty":
    "\nNessuna azione di formazione richiede un'escalation in questo momento.",
  "training.actionQueue.kind.task": "\nCompito",
  "training.actionQueue.kind.prediction": "\nPronostico",
  "training.actionQueue.kind.support": "\nSupporto",
  "training.actionQueue.taskDescription": "\n{status} / {site} / Scadenza {deadline}.",
  "training.actionQueue.predictionDescription":
    "\n{severity} / {site} / {remainingLife} giorni rimanenti.",
  "training.actionQueue.supportDescription": "\n{status} / {site} / {priority} priorità.",
  "training.rangeControls.title": "\nControlli della portata recenti",
  "training.rangeControls.description":
    "\nUtilizza le ultime registrazioni di controllo della portata per confermare la posizione operativa e di conformità.",
  "training.rangeControls.empty":
    "\nNon sono ancora disponibili record di controllo della portata.",
  "training.rangeControls.table.record": "\nRegistra",
  "training.rangeControls.table.location": "\nPosizione",
  "training.rangeControls.table.signal": "\nSegnale",
  "training.rangeControls.table.updated": "\nAggiornato",
  "training.rangeControls.signalSummary":
    "Stato {status} / Operativo {operational} / Conformità {compliance}",
  "training.quickLog.title": "\nControllo intervallo registro",
  "training.quickLog.description":
    "\nAcquisisci gli ultimi controlli operativi o di conformità senza lasciare l'area di lavoro di preparazione.",
  "training.quickLog.databaseRequired":
    "\nÈ necessario un database configurato prima di poter registrare gli aggiornamenti del controllo di addestramento.",
  "training.quickLog.empty":
    "\nNessun sito di formazione è ancora disponibile per la registrazione dei controlli.",
  "training.quickLog.emptyDescription":
    "Inserire prima le risorse di formazione nell'ambito in modo che gli aggiornamenti di controllo possano essere allegati al sito o alla risorsa dell'intervallo corretti.",
  "training.quickLog.assetOptional": "\nSolo controllo a livello di sito",
  "training.quickLog.helper":
    "\nRegistra qui la posizione di controllo corrente, quindi lascia che l'area di lavoro live aggiorni l'immagine di preparazione attorno ad essa.",
  "training.quickLog.submit": "\nAggiornamento controllo registro",
  "training.quickLog.submitAria":
    "\nAggiornamento del controllo dell'intervallo di addestramento del registro",
  "training.quickLog.feedback.saved":
    "\nAggiornamento del controllo dell'allenamento registrato correttamente.",
  "notifications.title": "\nNotifiche",
  "notifications.bell": "\nApri notifiche",
  "notifications.empty": "\nTutto cancellato",
  "notifications.emptyDescription": "\nNessuna nuova notifica al momento.",
  "notifications.unread": "\nNon letto",
  "notifications.markRead": "\nSegna come letto",
  "notifications.dismiss": "\nIgnora",
  "chat.workspace.systemEvent": "\nSistema",
  "chat.workspace.toolResult": "\nStrumento",
  "chat.workspace.handoffNote": "\nTrasferimento",
  "chat.workspace.delivered": "\nConsegnato",
  "chat.workspace.unreadCount": "\n{count} non letto",
  "admin.integrationHealth.title": "\nSalute integrazione",
  "admin.integrationHealth.subtitle": "\nSincronizza lo stato tra i sistemi connessi",
  "admin.integrationHealth.syncsTotal": "\nSincronizzazioni totali",
  "admin.integrationHealth.syncsFailed": "\nNon riuscito",
  "admin.integrationHealth.syncsSuccess": "\nRiuscito",
  "admin.integrationHealth.lastSync": "\nUltima sincronizzazione",
  "admin.auditTimeline.title": "\nRegistro di controllo",
  "admin.auditTimeline.subtitle": "\nEventi recenti del sistema e modifiche dello stato",
  "admin.iotCommands.title": "\nCiclo di vita dei comandi IoT",
  "admin.iotCommands.subtitle": "\nStato di consegna e riconoscimento dei comandi del dispositivo",
  "admin.iotCommands.queued": "\nIn coda",
  "admin.iotCommands.delivered": "\nConsegnato",
  "admin.iotCommands.acknowledged": "\nRiconosciuto",
  "admin.iotCommands.completed": "\nCompletato",
  "admin.iotCommands.failed": "\nNon riuscito",
  "admin.portalMembership.title": "\nIscrizione al portale",
  "admin.portalMembership.subtitle": "\nAccesso partner e gestione inviti",
  "admin.portalMembership.email": "\nE-mail",
  "admin.portalMembership.role": "\nRuolo",
  "admin.portalMembership.status": "\nStato",
  "admin.portalMembership.invited": "\nInvitato",
  "admin.portalMembership.active": "\nAttivo",
  "admin.portalMembership.pending": "\nIn sospeso",
  "fleet.stats.vehicles": "\nVeicoli",
  "fleet.stats.activeOps": "\nOperazioni attive",
  "fleet.stats.initiatives": "\nIniziative",
  "fleet.accordion.operations": "\nRiepilogo operazioni",
  "fleet.accordion.regional": "\nConfronto regionale",
  "fleet.accordion.focus": "\nObiettivo miglioramento",
  "buildings.stats.total": "\nEdifici",
  "buildings.stats.initiatives": "\nIniziative",
  "buildings.stats.contracts": "\nMisure contrattuali",
  "buildings.accordion.performance": "\nConfronto prestazioni",
  "buildings.accordion.initiatives": "\nAvanzamento iniziativa",
  "sensors.stats.total": "\nSensori",
  "sensors.stats.activeAlerts": "\nAvvisi attivi",
  "sensors.stats.alertRules": "\nRegole di avviso",
  "sensors.health.title": "\nStato del sensore",
  "predictions.stats.total": "\nPronostici",
  "predictions.stats.critical": "\nCritico",
  "predictions.stats.avgConfidence": "\nConfidenza media",
  "predictions.timeline.title": "\nProssimi pronostici",
  "predictions.timeline.subtitle": "\nPronostici ordinati per data prevista",
  "predictions.filter.all": "\nTutti",
  "predictions.filter.critical": "\nCritico",
  "predictions.filter.high": "\nAlto",
  "predictions.filter.medium": "\nMedio",
  "predictions.filter.low": "\nBasso",
  "digitalTwin.hotspot.title": "\nDettaglio hotspot",
  "digitalTwin.hotspot.created": '\nHotspot "{title}" creato.',
  "digitalTwin.hotspot.deleted": "\nHotspot rimosso.",
  "digitalTwin.hotspots.noTwinAvailable":
    "\nNessun gemello digitale è configurato. Crea prima un gemello per un sito.",
  "digitalTwin.overlay.sensors": "\nSovrapposizione sensore",
  "digitalTwin.overlay.status": "\nStato dispositivo",
  "financePlanning.compare.title": "\nConfronto scenari",
  "financePlanning.compare.subtitle": "\nAnalisi delle proiezioni affiancate",
  "financePlanning.compare.scenarioA": "\nScenario A",
  "financePlanning.compare.scenarioB": "\nScenario B",
  "financePlanning.compare.delta": "\nDelta",
  "financePlanning.compare.select": "\nSeleziona scenari",
  "estate.governance.title": "\nGovernance",
  "estate.governance.agreements": "\nAccordi",
  "estate.governance.fmControls": "\nControlli FM",
  "estate.governance.stewardship": "\nGestione",
  "estate.governance.rangeControls": "\nControlli della portata",
  "estate.tabs.overview": "\nPanoramica",
  "estate.tabs.governance": "\nApprovazioni",
  "estate.tabs.assurance": "\nRisorse e garanzie",
  "estate.tabs.readiness": "\nProntezza",
  "estate.tabs.partnerships": "\nContratti e Integrazioni",
  "analytics.title": "\nAnalisi",
  "analytics.subtitle": "\nGestione dataset e definizioni metriche",
  "analytics.datasets.name": "\nSet di dati",
  "analytics.datasets.freshness": "\nFreschezza",
  "analytics.datasets.metrics": "\nMetriche",
  "analytics.datasets.empty": "\nNessun set di dati configurato",
  "analytics.datasets.emptyCta":
    "\nConfigura il tuo primo set di dati di analisi per iniziare a monitorare le metriche.",
  "portal.members.title": "\nMembri",
  "portal.members.subtitle": "\nAccesso partner e gestione inviti",
  "portal.members.invite": "\nInvita membro",
  "portal.members.email": "\nE-mail",
  "portal.members.role": "\nRuolo",
  "portal.members.status": "\nStato",
  "portal.members.status.active": "\nAttivo",
  "portal.members.status.pending": "\nIn sospeso",
  "portal.members.status.expired": "\nScaduto",
  "portal.members.stage.invited": "\nInvitato",
  "portal.members.stage.accepted": "\nAccettato",
  "portal.members.stage.active": "\nAttivo",
  "portal.members.empty": "\nNessun membro ancora",
  "portal.members.emptyCta": "\nInvita il tuo primo partner al portale.",
  "portal.members.searchPlaceholder": "\nCerca membri…",
  "portal.members.searchLabel": "\nCerca membri del portale",
  "portal.members.filter.allStatuses": "\nTutti gli stati",
  "portal.members.filter.allParties": "\nTutte le parti",
  "onboarding.title": "\nInizia",
  "onboarding.subtitle": "\nCompleta questi passaggi per configurare il tuo spazio di lavoro",
  "onboarding.step.registerAsset": "\nRegistra il primo asset",
  "onboarding.step.configureIntegrations": "\nConfigura integrazioni",
  "onboarding.step.inviteTeam": "\nInvita membri del team",
  "onboarding.step.setupAutomation": "\nConfigura la prima automazione",
  "onboarding.step.generateReport": "\nGenera primo rapporto",
  "onboarding.dismiss": "\nIgnora guida",
  "customisation.dashboard.title": "\nWidget della dashboard",
  "customisation.dashboard.subtitle": "\nScegli quali sezioni visualizzare sulla tua dashboard",
  "customisation.dashboard.kpiWidgets": "\nWidget KPI",
  "customisation.dashboard.activityFeed": "\nFeed attività",
  "customisation.dashboard.quickActions": "Azioni rapide",
  "customisation.dashboardPreset.title": "\nPreimpostazioni dashboard",
  "customisation.dashboardPreset.commandCenter": "\nCentro di comando",
  "customisation.dashboardPreset.commandCenterDescription":
    "\nMostra insieme widget KPI, feed attività e azioni rapide.",
  "customisation.dashboardPreset.shiftFocus": "\nSposta messa a fuoco",
  "customisation.dashboardPreset.shiftFocusDescription":
    "\nMantieni visibili i widget KPI e le azioni rapide mentre riduci il feed delle attività.",
  "customisation.dashboardPreset.quiet": "\nTavola silenziosa",
  "customisation.dashboardPreset.quietDescription":
    "\nRiduci la dashboard ai widget KPI per una pagina di destinazione giornaliera silenziosa.",
  "customisation.dashboardPreset.custom": "\nLayout personalizzato",
  "customisation.dashboardPreset.customDescription":
    "\nLe impostazioni attuali del dashboard non corrispondono a una delle preimpostazioni integrate.",
  "customisation.dashboardPreset.subtitle":
    "\nScegli la postura del cruscotto che meglio si adatta al tuo ritmo operativo attuale.",
  "nav.supportTickets": "\nTicket di supporto",
  "supportTickets.title": "\nTicket di supporto",
  "supportTickets.subtitle": "\nTieni traccia e gestisci le richieste di supporto",
  "supportTickets.status.OPEN": "\nApri",
  "supportTickets.status.IN_PROGRESS": "\nIn corso",
  "supportTickets.status.AWAITING_CUSTOMER": "\nIn attesa del cliente",
  "supportTickets.status.RESOLVED": "\nRisolto",
  "supportTickets.status.CLOSED": "\nChiuso",
  "supportTickets.priority.LOW": "\nBasso",
  "supportTickets.priority.MEDIUM": "\nMedio",
  "supportTickets.priority.HIGH": "\nAlto",
  "supportTickets.priority.URGENT": "\nUrgente",
  "supportTickets.category.GENERAL_INQUIRY": "\nRichiesta generale",
  "supportTickets.category.TECHNICAL_ISSUE": "\nProblema tecnico",
  "supportTickets.category.BILLING": "\nFatturazione",
  "supportTickets.category.FEATURE_REQUEST": "\nRichiesta di funzionalità",
  "supportTickets.category.BUG_REPORT": "\nSegnalazione bug",
  "supportTickets.category.ACCOUNT_ACCESS": "\nAccesso all'account",
  "supportTickets.category.INTEGRATION": "\nIntegrazione",
  "supportTickets.category.OTHER": "\nAltro",
  "supportTickets.stats.total": "\nBiglietti totali",
  "supportTickets.stats.breached": "Breached",
  "supportTickets.stats.open": "\nApri",
  "supportTickets.stats.inProgress": "\nIn corso",
  "supportTickets.stats.resolved": "\nRisolto",
  "supportTickets.tab.all": "\nTutti i biglietti",
  "supportTickets.tab.open": "\nApri",
  "supportTickets.tab.inProgress": "\nIn corso",
  "supportTickets.tab.resolved": "\nRisolto",
  "supportTickets.tab.closed": "\nChiuso",
  "supportTickets.table.ticketNumber": "Ticket n.",
  "supportTickets.table.subject": "\nOggetto",
  "supportTickets.table.status": "\nStato",
  "supportTickets.table.priority": "\nPriorità",
  "supportTickets.table.category": "\nCategoria",
  "supportTickets.table.assignedTo": "\nAssegnato a",
  "supportTickets.table.createdAt": "\nCreato",
  "supportTickets.table.updatedAt": "\nAggiornato",
  "supportTickets.table.ariaLabel": "\nElenco ticket di supporto",
  "supportTickets.searchPlaceholder": "\nCerca biglietti…",
  "supportTickets.searchLabel": "\nCerca ticket di supporto",
  "supportTickets.empty": "\nNessun ticket di supporto trovato.",
  "supportTickets.emptyCta": "\nCrea un nuovo ticket per iniziare.",
  "supportTickets.workspace.listTitle": "Ticket inbox",
  "supportTickets.workspace.listDescription":
    "Review the queue, then open a ticket to continue triage, replies, and status changes in the workbench.",
  "supportTickets.workspace.listEmptyDescription":
    "This queue is clear. Adjust filters or create a new ticket to start the next response thread.",
  "supportTickets.create.title": "\nNuovo ticket di supporto",
  "supportTickets.create.subject": "\nOggetto",
  "supportTickets.create.subjectPlaceholder": "\nBreve descrizione del problema",
  "supportTickets.create.description": "\nDescrizione",
  "supportTickets.create.descriptionPlaceholder": "\nFornisci dettagli sul problema",
  "supportTickets.create.priority": "\nPriorità",
  "supportTickets.create.category": "\nCategoria",
  "supportTickets.create.site": "\nSito",
  "supportTickets.create.sitePlaceholder": "\nSeleziona un sito",
  "supportTickets.create.submit": "\nCrea biglietto",
  "supportTickets.create.submitting": "\nCreazione…",
  "supportTickets.create.success": "\nBiglietto {ticketNumber} creato correttamente.",
  "supportTickets.create.error": "\nImpossibile creare il ticket: {message}",
  "supportTickets.detail.title": "\nDettagli biglietto",
  "supportTickets.detail.statusLabel": "\nStato",
  "supportTickets.detail.priorityLabel": "\nPriorità",
  "supportTickets.detail.categoryLabel": "\nCategoria",
  "supportTickets.detail.assigneeLabel": "\nAssegnatario",
  "supportTickets.detail.siteLabel": "\nSito",
  "supportTickets.detail.createdLabel": "\nCreato",
  "supportTickets.detail.updatedLabel": "\nUltimo aggiornamento",
  "supportTickets.detail.resolvedLabel": "\nRisolto",
  "supportTickets.detail.closedLabel": "\nChiuso",
  "supportTickets.detail.unassigned": "\nNon assegnato",
  "supportTickets.detail.noSite": "\nNessun sito",
  "supportTickets.detail.selectPromptTitle": "\nSeleziona un biglietto",
  "supportTickets.detail.selectPromptDescription":
    "\nScegli un ticket di supporto per rivedere i messaggi, aggiornare lo stato e inviare risposte.",
  "supportTickets.detail.selectGuideMessages":
    "Read the full conversation and internal notes before drafting the next reply.",
  "supportTickets.detail.selectGuideActions":
    "Promote the next status, request evidence, or hand the ticket to the next owner without leaving the workbench.",
  "supportTickets.detail.selectGuideCloseout":
    "Keep timestamps, site context, and final updates visible for an audit-ready closeout.",
  "supportTickets.detail.messages": "\nMessaggi",
  "supportTickets.detail.messagesEmpty": "\nNessun messaggio ancora.",
  "supportTickets.detail.addMessage": "\nAggiungi risposta",
  "supportTickets.detail.messagePlaceholder": "\nScrivi la tua risposta…",
  "supportTickets.detail.sendMessage": "\nInvia",
  "supportTickets.detail.internalNote": "\nNota interna",
  "supportTickets.detail.updateStatus": "\nAggiorna stato",
  "supportTickets.detail.close": "\nChiudi Ticket",
  "supportTickets.detail.reopen": "\nRiapri ticket",
  "supportTickets.filter.status": "\nStato",
  "supportTickets.filter.priority": "\nPriorità",
  "supportTickets.filter.category": "\nCategoria",
  "supportTickets.filter.site": "\nSito",
  "supportTickets.filter.allStatuses": "\nTutti gli stati",
  "supportTickets.filter.allPriorities": "\nTutte le priorità",
  "supportTickets.filter.allCategories": "\nTutte le categorie",
  "supportTickets.filter.allSites": "\nTutti i siti",
  "supportTickets.validation.subjectRequired": "\nL'oggetto è obbligatorio.",
  "supportTickets.validation.descriptionRequired": "\nLa descrizione è obbligatoria.",
  "supportTickets.message.sent": "\nRisposta inviata.",
  "supportTickets.message.error": "\nImpossibile inviare la risposta: {message}",
  "supportTickets.statusUpdate.success": "\nStato del biglietto aggiornato.",
  "supportTickets.statusUpdate.error": "\nImpossibile aggiornare lo stato: {message}",
  "chat.workspace.threadPanelTitle": "\nDiscussione",
  "common.emptySearchTitle": "\nNessun risultato trovato",
  "common.emptySearchDescription": "\nProva a modificare i criteri di ricerca o di filtro.",
  "common.pagination.summary": "\nMostra {from}–{to} di {total}",
  "documentDetail.breadcrumb.navAria": "\nNavigazione breadcrumb",
  "documentDetail.title": "\nDettaglio documento",
  "documentDetail.loading": "\nCaricamento documento…",
  "documentDetail.error.title": "\nErrore durante il caricamento del documento",
  "documentDetail.error.description": "\nImpossibile caricare il documento. Per favore riprova.",
  "documentDetail.field.title": "\nTitolo",
  "documentDetail.field.customer": "\nCliente",
  "documentDetail.field.customerEmail": "\nE-mail cliente",
  "documentDetail.field.customerOrder": "\nOrdine cliente",
  "documentDetail.field.createdOrder": "\nOrdine creato",
  "documentDetail.field.site": "\nSito",
  "documentDetail.field.dueDate": "\nData di scadenza",
  "documentDetail.field.requestedAt": "\nRichiesto a",
  "documentDetail.field.requestedBy": "\nRichiesto da",
  "documentDetail.field.requestedDeliveryAt": "\nConsegna richiesta",
  "documentDetail.field.totalAmount": "\nImporto totale",
  "documentDetail.field.budget": "\nBudget",
  "documentDetail.field.approvedBy": "\nApprovato da",
  "documentDetail.field.assignee": "\nAssegnatario",
  "documentDetail.field.estimatedCloseAt": "\nChiusura stimata",
  "documentDetail.field.issuedAt": "\nEmesso il",
  "documentDetail.field.paidAt": "\nPagato a",
  "documentDetail.field.paymentTerm": "\nTermine di pagamento",
  "documentDetail.field.labourCost": "\nCosto manodopera",
  "documentDetail.field.materialCost": "\nCosto materiale",
  "documentDetail.field.outstandingAmount": "\nImporto dovuto",
  "documentDetail.field.receipts": "\nRicevute",
  "documentDetail.field.discrepancy": "\nDiscrepanza",
  "documentDetail.field.dispatchWindow": "\nFinestra di spedizione",
  "documentDetail.field.sla": "Livello di servizio",
  "documentDetail.field.signoff": "\nChiusura",
  "documentDetail.field.scheduleWindow": "Finestra di pianificazione",
  "documentDetail.field.sourceRfq": "\nRichiesta di offerta di origine",
  "documentDetail.field.updatedAt": "\nAggiornato alle",
  "documentDetail.field.vendor": "\nVenditore",
  "documentDetail.field.vendorReference": "\nRiferimento venditore",
  "documentDetail.field.workOrder": "\nOrdine di lavoro",
  "documentDetail.section.overviewTitle": "\nPanoramica",
  "documentDetail.section.overviewDescription": "\nDettagli chiave per questo documento.",
  "documentDetail.section.lineItemsTitle": "\nElementi pubblicitari",
  "documentDetail.section.lineItemsDescription": "\nArticoli inclusi in questo documento.",
  "documentDetail.section.relatedTitle": "\nDocumenti correlati",
  "documentDetail.section.relatedDescription": "\nDocumenti collegati a questo record.",
  "documentDetail.table.description": "\nDescrizione",
  "documentDetail.table.quantity": "\nQtà",
  "documentDetail.table.amount": "\nImporto",
  "documentDetail.table.total": "\nTotale",
  "documentDetail.empty.lineItems": "\nNessun elemento pubblicitario.",
  "documentDetail.empty.related": "\nNessun documento correlato.",
  "documentDetail.empty.timeline": "\nNessuna voce nella sequenza temporale.",
  "documentWorkflow.feedback.updated": "\nStato del flusso di lavoro aggiornato.",
  "documentWorkflow.feedback.invalidAction": "\nAzione del flusso di lavoro non valida.",
  "estate.focus.title": "\nFocus immobiliare",
  "estate.integration.title": "\nIntegrazioni",
  "estate.integration.coverageLabel": "\n{configured} integrazioni su {total} sono configurate.",
  "mlops.summary.experiments": "\nEsperimenti",
  "mlops.summary.registry": "\nRegistro modelli",
  "portal.invite.title": "\nInvito al portale",
  "portal.invite.subtitle": "\nSei stato invitato a iscriverti al portale.",
  "portal.invite.accept": "\nAccetta l'invito",
  "portal.invite.email": "\nE-mail",
  "portal.invite.party": "\nOrganizzazione",
  "portal.invite.expires": "\nScadenza",
  "portal.invite.metadata": "\nDettagli invito",
  "portal.invite.accessTitle": "\nAnteprima accesso partner",
  "portal.invite.accessDescription":
    "\nVisualizza l'anteprima dell'organizzazione invitata, conferma l'account ricevente e mantieni il percorso di accettazione sulla stessa schermata sicura.",
  "portal.invite.openPortal": "\nApri portale",
  "portal.invite.signIn": "\nAccedi",
  "portal.invite.signOut": "\nEsci",
  "portal.invite.signedInAs": "\nAccedi come {email}",
  "portal.invite.checklist.scopeTitle": "\nEsamina l'organizzazione invitata",
  "portal.invite.checklist.scopeDescription":
    "\nQuesto invito concede l'accesso mirato alla superficie del portale condiviso solo per l'organizzazione elencata.",
  "portal.invite.checklist.expiryTitle": "\nAccetta prima che l'invito scada",
  "portal.invite.checklist.expiryDescription":
    "\nUtilizza lo stesso percorso di invito prima della data di scadenza in modo che l'accettazione rimanga allegata alla richiesta originaria.",
  "portal.invite.checklist.supportTitle": "\nUtilizza l'account invitato o cambia in modo pulito",
  "portal.invite.checklist.supportDescription":
    "\nAccedi con l'indirizzo email invitato per continuare. Se l'accesso continua a fallire, riprova da questo invito invece di aprire un percorso del portale separato.",
  "portal.invite.checklist.switchAccountDescription":
    "\nSe hai effettuato l'accesso con l'indirizzo email sbagliato, esci prima e torna a questo invito in modo che il diritto rimanga allineato.",
  "portal.invite.error.expired": "\nQuesto invito è scaduto.",
  "portal.invite.error.invalid": "\nQuesto invito non è valido.",
  "portal.invite.error.unauthenticated": "\nAccedi per accettare questo invito.",
  "portal.invite.error.emailMismatch":
    "\nQuesto invito è stato inviato a un indirizzo email diverso.",
  "portal.members.access.invite": "\nInvita membro",
  "portal.members.access.pendingAcceptance": "\nIn attesa di accettazione",
  "portal.members.access.membership": "\nIscrizione",
  "portal.members.rolePending": "\nIn sospeso",
  "portal.members.error.alreadyMember": "\nQuesto utente è già membro.",
  "portal.members.error.invalidInput": "\nControlla il modulo e riprova.",
  "portal.members.error.partyNotFound": "\nOrganizzazione non trovata.",
  "portal.members.error.notFound": "\nImpossibile trovare il membro selezionato.",
  "portal.members.error.invalidRole": "\nScegli un ruolo del portale valido.",
  "portal.members.error.roleUnavailable":
    "\nLe modifiche al ruolo sono disponibili solo per gli abbonamenti attivi.",
  "portal.members.roleChange": "\nCambio di ruolo",
  "portal.members.updateRole": "\nAggiorna ruolo",
  "portal.members.revoke": "\nRevoca accesso",
  "portal.members.revokeDescription":
    "\nRevoca l'invito o l'appartenenza selezionata senza uscire dal contesto dell'area di lavoro corrente.",
  "portal.members.unavailable.title": "\nMembri del portale non disponibili",
  "portal.members.unavailable.description":
    "\nL’area di lavoro dei membri non è disponibile mentre il database è offline. Filtri, inviti e azioni sui membri sono disattivati finché la connessione non torna.",
  "portal.members.history.title": "\nCronologia accessi",
  "portal.members.history.invitedTitle": "\nInvito emesso",
  "portal.members.history.invitedDescription": "L'accesso iniziale è stato preparato il {date}.",
  "portal.members.history.inviteAccessTitle": "\nStato accesso invito",
  "portal.members.history.membershipAccessTitle": "\nStato di accesso dell'iscrizione",
  "portal.members.history.accessDescription": "\nPosizione di accesso attuale: {state}.",
  "portal.members.history.systemActor": "\nFlusso di lavoro del sistema",
  "portal.members.history.acceptedTitle": "\nInvito accettato",
  "portal.members.history.acceptedDescription":
    "\n{actor} ha accettato l'invito al portale e ha continuato nell'area di lavoro del partner.",
  "portal.members.history.activatedTitle": "\nAbbonamento attivato",
  "portal.members.history.activatedDescription":
    "\n{actor} ha attivato l'iscrizione a Workspace per questo contatto del gruppo.",
  "portal.members.history.roleUpdatedTitle": "\nRuolo aggiornato",
  "portal.members.history.roleUpdatedDescription":
    "\n{actor} ha cambiato il ruolo da {previousRole} a {nextRole}.",
  "portal.members.history.revokedTitle": "\nAccesso revocato",
  "portal.members.history.revokedDescription": "\n{actor} ha revocato questo accesso al portale.",
  "portal.members.history.summaryTitle": "\nSintesi della governance",
  "portal.members.history.summaryDescription":
    "\nMantieni visibili l'emissione di inviti, le modifiche dei ruoli, le revoche e l'ultimo evento di governance durante la gestione dell'accesso.",
  "portal.members.history.trackedChangesLabel": "\nVoci monitorate",
  "portal.members.history.roleChangeCountLabel": "\nCambiamenti di ruolo",
  "portal.members.history.revokeCountLabel": "\nRevoche",
  "portal.members.history.latestEventLabel": "\nUltimo evento di governance",
  "portal.members.history.latestEventFallback":
    "\nIn attesa del prossimo aggiornamento sulla governance",
  "portal.members.reissue": "\nRiemetti invito",
  "portal.members.alert.inviteSuccess": "\nInvito preparato per {email} in {party}.",
  "portal.members.alert.reissueSuccess": "\nInvito riemesso per {email} in {party}.",
  "portal.members.alert.roleSuccess": "\nRuolo aggiornato per {email} in {party}.",
  "portal.members.alert.revokeSuccess": "\nAccesso revocato per {email} in {party}.",
  "portal.nav.collaboration": "\nCollaborazione",
  "portal.nav.documents": "\nDocumenti",
  "portal.nav.members": "\nMembri",
  "reports.activePackage.title": "\nPacchetto attivo",
  "reports.datasets.title": "\nSet di dati",
  "reports.schedule.title": "\nConsegna prevista",
  "reports.schedule.description":
    "\nConfigura l'invio automatico dei report via email secondo una pianificazione ricorrente.",
  "reports.schedule.frequency": "\nFrequenza",
  "reports.schedule.daily": "\nOgni giorno",
  "reports.schedule.weekly": "\nSettimanale",
  "reports.schedule.monthly": "\nMensile",
  "reports.schedule.deliveryChannel": "\nCanale di consegna",
  "reports.schedule.email": "\nE-mail",
  "reports.schedule.webhook": "\nWebhook",
  "reports.schedule.recipientsLabel": "\nDestinatari",
  "reports.schedule.recipientsPlaceholder": "\nInserisci gli indirizzi email separati da virgole",
  "reports.schedule.timezoneLabel": "\nFuso orario",
  "reports.schedule.save": "\nSalva programma",
  "reports.schedule.disable": "\nDisabilita pianificazione",
  "reports.schedule.nextDelivery": "\nProssima consegna",
  "reports.schedule.lastDelivery": "\nUltima consegna",
  "reports.schedule.active": "\nAttivo",
  "reports.schedule.inactive": "\nInattivo",
  "reports.schedule.created": "\nProgramma creato con successo.",
  "reports.schedule.updated": "\nProgramma aggiornato correttamente.",
  "reports.schedule.empty": "\nNessun programma di consegna configurato.",
  "reports.schedule.emptyAction":
    "\nAggiungi una pianificazione per consegnare questo rapporto automaticamente.",
  "reports.sharing.title": "\nCondivisione e permessi",
  "reports.sharing.description": "\nControlla chi può visualizzare o modificare questo rapporto.",
  "reports.sharing.addUser": "\nAggiungi utente",
  "reports.sharing.addRole": "\nAggiungi ruolo",
  "reports.sharing.permissionView": "\nVisualizza",
  "reports.sharing.permissionEdit": "\nModifica",
  "reports.sharing.permissionAdmin": "\nAmministratore",
  "reports.sharing.remove": "\nRimuovi",
  "reports.sharing.userLabel": "\nUtente",
  "reports.sharing.userPlaceholder": "\nSeleziona un utente",
  "reports.sharing.permissionLabel": "\nAutorizzazione",
  "reports.sharing.save": "\nCondividi rapporto",
  "reports.sharing.empty": "\nQuesto rapporto non è stato condiviso con nessuno.",
  "reports.sharing.emptyAction": "\nCondividi questo rapporto con i membri del team.",
  "reports.sharing.shared": "\nRapporto condiviso correttamente.",
  "reports.sharing.removed": "\nAccesso rimosso con successo.",
  "reports.export.title": "\nEsporta rapporto",
  "reports.export.pdf": "\nEsporta PDF",
  "reports.export.csv": "\nEsporta CSV",
  "reports.export.excel": "\nEsporta Excel",
  "reports.export.arrow": "\nEsporta Arrow",
  "reports.export.parquet": "\nEsporta Parquet",
  "reports.export.generating": "\nGenerazione esportazione in corso...",
  "reports.export.download": "\nScarica",
  "reports.export.error": "\nEsportazione non riuscita. Per favore riprova.",
  "reports.dateRange.custom": "\nIntervallo di date personalizzato",
  "reports.dateRange.from": "\nDa",
  "reports.dateRange.to": "\nA",
  "reports.dateRange.apply": "\nApplica intervallo",
  "reports.dateRange.clear": "\nCancella intervallo",
  "reports.dateRange.hint": "\nSeleziona le date di inizio e fine per filtrare i dati del report.",
  "reports.drilldown.clickToExpand": "\nFare clic per visualizzare i dettagli",
  "reports.drilldown.backToSummary": "\nTorna al riepilogo",
  "reports.drilldown.breadcrumbRoot": "\nRiepilogo",
  "reports.drilldown.loadingDetail": "\nCaricamento vista dettagli...",
  "reports.drilldown.detailTitle": "\nVista dettagliata",
  "reports.drilldown.detailBreakdown": "\nRipartizione dettagliata per {item}",
  "reports.drilldown.detailContent": "Ripartizione dettagliata della voce {item}.",
  "workOrderDetail.title": "\nDettaglio ordine di lavoro",
  "training.courses.title": "\nCorsi di formazione",
  "training.courses.description":
    "\nGestisci corsi di formazione, moduli e iscrizioni dei dipendenti.",
  "training.courses.create": "\nCrea corso",
  "training.courses.editTitle": "\nModifica corso",
  "training.courses.moduleCount": "\n{count} moduli",
  "training.courses.enrolledCount": "\n{count} iscritto",
  "training.courses.completionRate": "\n{rate}% completamento",
  "training.courses.durationLabel": "\nDurata",
  "training.courses.mandatoryLabel": "\nObbligatorio",
  "training.courses.optionalLabel": "\nOpzionale",
  "training.courses.empty": "\nNessun corso di formazione è stato ancora creato.",
  "training.modules.title": "\nModuli del corso",
  "training.modules.add": "\nAggiungi modulo",
  "training.modules.contentType": "\nTipo di contenuto",
  "training.modules.video": "\nVideo",
  "training.modules.document": "\nDocumento",
  "training.modules.quiz": "\nQuiz",
  "training.modules.sortOrder": "\nOrdine",
  "training.modules.duration": "\nDurata (min)",
  "training.certification.title": "\nCertificazioni",
  "training.certification.description":
    "\nTieni traccia della validità e della scadenza della certificazione per la conformità.",
  "training.certification.expiresAt": "\nScadenza",
  "training.certification.daysUntilExpiry": "\n{days} giorni rimanenti",
  "training.certification.expired": "\nScaduto",
  "training.certification.expiringSoon": "\nIn scadenza a breve",
  "training.certification.valid": "\nValido",
  "training.certification.expiringAlert": "\n{count} certificazioni in scadenza entro 30 giorni",
  "training.certification.renewAction": "\nRinnova",
  "training.certification.downloadCertificate": "\nScarica certificato",
  "training.certification.issuedBy": "\nEmesso da",
  "training.certification.issuedAt": "\nEmesso il",
  "training.certification.name": "\nNome certificato",
  "training.certification.empty": "\nNessuna certificazione registrata.",
  "training.competencyMatrix.title": "\nMatrice delle competenze",
  "training.competencyMatrix.description":
    "\nMappare le competenze richieste rispetto alle effettive qualifiche dei dipendenti.",
  "training.competencyMatrix.requiredLevel": "\nRichiesto",
  "training.competencyMatrix.currentLevel": "\nAttuale",
  "training.competencyMatrix.gap": "\nSpazio",
  "training.competencyMatrix.noGap": "\nIncontrato",
  "training.competencyMatrix.employee": "\nDipendente",
  "training.competencyMatrix.competency": "\nCompetenza",
  "training.competencyMatrix.level": "\nLivello",
  "training.competencyMatrix.empty": "\nNessuna definizione di competenza ancora configurata.",
  "training.competencyMatrix.emptyEmployee":
    "\nNessuna valutazione delle competenze dei dipendenti registrata.",
  "common.approvalSignoff": "\nApprovazione e firma",
  "common.dispatchBoard": "\nTabellone spedizioni",
  "common.serviceBoard": "\nScheda di servizio",
  "common.ownerQueue": "\nCoda proprietario",
  "common.slaTimers": "\nTemporizzatori SLA",
  "common.macros": "\nMacro",
  "common.certificationWorkflow": "\nFlusso di lavoro della certificazione",
  "common.escalationWorkflow": "\nFlusso di lavoro dell'escalation",
  "common.cohortCompare": "\nConfronto di coorte",
  "common.pinboard": "\nBacheca dei problemi",
  "common.governanceControls": "\nControlli di governance",
  "predictions.workspace.promote.eyebrow": "\nPromuovi all'azione",
  "predictions.workspace.promote.title": "\nPromuovi il segnale nel lavoro",
  "predictions.workspace.promote.description":
    "\nInserisci la previsione in tempo reale nell'invio, nel ripristino del servizio, nella pianificazione o in un pacchetto di report senza lasciare l'area di lavoro.",
  "predictions.workspace.promote.dispatchLabel": "\nFollow-up della spedizione",
  "predictions.workspace.promote.dispatchDescription":
    "\nApri la coda delle attività tenendo presente la posizione di previsione dal vivo.",
  "predictions.workspace.promote.serviceLabel": "\nApri il tabellone dei servizi",
  "predictions.workspace.promote.serviceDescription":
    "\nSposta il segnale attivo nel coordinamento dell'ordine di lavoro e nell'esecuzione sul campo.",
  "predictions.workspace.promote.planningLabel": "\nPromuovi a pianificazione",
  "predictions.workspace.promote.planningDescription":
    "\nTrasporta il segnale di rischio nella pianificazione finanziaria e nella revisione degli investimenti.",
  "predictions.workspace.promote.reportLabel": "\nCrea pacchetto di rapporti",
  "predictions.workspace.promote.reportDescription":
    "\nCattura le prove attuali dell'intelligenza artificiale in un flusso di lavoro di report duraturo.",
  "predictions.workspace.ownerQueue.eyebrow": "\nCoda proprietario",
  "predictions.workspace.ownerQueue.title": "\nTrasferimento al proprietario attuale",
  "predictions.workspace.ownerQueue.description":
    "\nMantieni visibili l'operatore successivo, l'affidabilità e i proprietari degli approvvigionamenti accanto alla scheda dei rischi classificati.",
  "predictions.workspace.ownerQueue.dispatchItem":
    "\nIl proprietario della spedizione conferma l'azione sul campo successiva e il periodo di scadenza.",
  "predictions.workspace.ownerQueue.reliabilityItem":
    "\nIl proprietario dell'affidabilità convalida le prove dell'intelligenza artificiale prima che il segnale si solidifichi in un lavoro ripetuto.",
  "predictions.workspace.ownerQueue.procurementItem":
    "Il proprietario dell'approvvigionamento rimane attento a parti, sostituzioni o pressione sullo smaltimento.",
  "finance.cockpit.savedSlices.title": "\nSezioni finanziarie salvate",
  "finance.cockpit.savedSlices.description":
    "\nSpostarsi tra i settori finanziari che gli operatori riaprono più spesso durante la revisione e l'approvazione.",
  "finance.cockpit.savedSlices.portfolio": "\nOrologio portafoglio",
  "finance.cockpit.savedSlices.depreciation": "\nControllo ammortamento",
  "finance.cockpit.savedSlices.controls": "\nRevisione controllo",
  "finance.cockpit.savedSlices.reviewWindow": "\nFinestra di revisione",
  "finance.cockpit.savedSlices.ownerQueue": "\nCoda proprietario",
  "finance.cockpit.savedSlices.packReady": "\nPacchetto pronto",
  "finance.cockpit.signoff.title": "\nCiclo di approvazione e distribuzione",
  "finance.cockpit.signoff.description":
    "\nMantieni la linea di base della pianificazione, il follow-through dell'approvvigionamento e la distribuzione dei report visibili in un unico vassoio di approvazione.",
  "finance.cockpit.signoff.planTitle": "\nBase di pianificazione",
  "finance.cockpit.signoff.planDescription":
    "\nRivedere la previsione di pianificazione finanziaria attiva.",
  "finance.cockpit.signoff.planSupport":
    "\nMantieni l'attuale posizione di deprezzamento nella prossima tornata di approvazione.",
  "finance.cockpit.signoff.procurementTitle": "\nFollow-through dell'approvvigionamento",
  "finance.cockpit.signoff.procurementDescription":
    "\nControlla il percorso dell'ordine di acquisto prima di rilasciare la spesa.",
  "finance.cockpit.signoff.procurementSupport":
    "\nMantieni visibili le azioni di acquisto a valle accanto alla sezione finanziaria corrente.",
  "finance.cockpit.signoff.distributionTitle": "\nDistribuzione del rapporto",
  "finance.cockpit.signoff.distributionDescription":
    "\nSpingere l'attuale posizione finanziaria nel prossimo pacchetto di stakeholder.",
  "finance.cockpit.signoff.distributionSupport":
    "\nIndirizza il riepilogo approvato nella cronologia e nella distribuzione del report salvato.",
  "financePlanning.workflow.title": "\nCadenza di approvazione",
  "financePlanning.workflow.description":
    "\nTieni traccia della linea di base attuale, della pressione di approvazione e della preparazione della distribuzione prima che gli scenari si spostino a valle.",
  "financePlanning.workflow.baseline":
    "\nGli {count} scenari di base rimangono nel set di revisione attivo.",
  "financePlanning.workflow.approvals":
    "\n{count} I segnali di approvazione o di dipendenza necessitano ancora dell'approvazione prima del rilascio.",
  "financePlanning.workflow.distribution":
    "\nI percorsi di distribuzione connessi {count} sono pronti per il prossimo pacchetto certificato.",
  "utilisation.cockpit.savedViews.title": "\nViste di utilizzo salvate",
  "utilisation.cockpit.savedViews.description":
    "\nPassa tra le sezioni di coorte salvate che gli operatori utilizzano per confrontare la domanda equilibrata, sotto pressione e in ripresa.",
  "utilisation.cockpit.savedViews.cohort": "\nConfronto di coorte",
  "utilisation.cockpit.savedViews.workflow": "\nTrasferimento del flusso di lavoro",
  "utilisation.cockpit.cohortCompare.title": "\nConfronto di coorte",
  "utilisation.cockpit.cohortCompare.description":
    "\nUtilizza la data corrente come base per il confronto tra siti peer e risorse peer.",
  "utilisation.cockpit.cohortCompare.supporting":
    "\nTrasporta questa visione di gruppo nel successivo reporting o passaggio di intervento.",
  "apiExplorer.savedRequests.title": "\nRichieste salvate",
  "apiExplorer.savedRequests.description":
    "\nMantieni i comuni controlli HTML, API e di autenticazione a portata di mano per ripetere le indagini.",
  "apiExplorer.savedRequests.dashboard": "\nSonda HTML dashboard",
  "apiExplorer.savedRequests.ucp": "\nSonda API UCP",
  "apiExplorer.savedRequests.auth": "\nProbe percorso autenticazione",
  "apiExplorer.history.title": "\nRichiedi cronologia",
  "apiExplorer.history.description":
    "\nI modelli di richiesta recenti rimangono visibili in modo che gli operatori possano ripetere i filtri senza ricostruirli.",
  "apiExplorer.history.active": "Superficie attiva: {surface}",
  "apiExplorer.history.html": "\nI sondaggi di navigazione HTML recenti rimangono bloccati qui.",
  "apiExplorer.history.api": "\nI sondaggi API recenti rimangono bloccati qui per la riproduzione.",
  "supportTickets.workspace.sla.title": "\nSLA e postura della coda",
  "supportTickets.workspace.sla.description":
    "\nMantieni visibili la coda attiva e la posizione del ticket selezionato durante la valutazione del riquadro dei dettagli.",
  "supportTickets.workspace.sla.openQueue":
    "\nI {count} ticket aperti attualmente rimangono all'interno della finestra SLA attiva.",
  "supportTickets.workspace.sla.activeQueue":
    "\nI ticket {count} rimangono attivi nella coda di supporto corrente.",
  "supportTickets.workspace.sla.selectTicket":
    "\nSeleziona un ticket per verificare la posizione attuale dello SLA e il trasferimento del proprietario.",
  "supportTickets.workspace.sla.selectedTicket":
    "\nIl biglietto selezionato è {status} con priorità {priority}.",
  "supportTickets.workspace.macros.title": "\nSupporto macro",
  "supportTickets.workspace.macros.description":
    "\nUtilizza macro di risposta ripetibili per mantenere coerenti la valutazione, le richieste di prove e la chiusura.",
  "supportTickets.workspace.macros.requestEvidence":
    "\nMacro: richiedi prova cliente prima che il ticket lasci la coda attiva.",
  "supportTickets.workspace.macros.escalate":
    "\nMacro: inoltra il ticket al successivo proprietario del servizio con il contesto corrente intatto.",
  "supportTickets.workspace.macros.closeLoop":
    "\nMacro: chiudi il ciclo con un aggiornamento dello stato finale e un riepilogo pronto per l'audit.",
  "training.workflow.certificationTitle": "\nCadenza di certificazione ricorrente",
  "training.workflow.certificationDescription":
    "\nMantieni le revisioni della preparazione, gli aggiornamenti dei controlli e le prove di certificazione attraverso un flusso di lavoro ricorrente.",
  "training.workflow.certificationReadiness":
    "\nI record di capacità di preparazione dei {count} sono attualmente sufficientemente solidi per la revisione della certificazione.",
  "training.workflow.certificationReview":
    "\n{count} gli elementi di revisione del controllo necessitano ancora dell'approvazione della certificazione.",
  "training.workflow.certificationHistory":
    "\n{count} gli aggiornamenti recenti del controllo sono disponibili come prova di certificazione ricorrente.",
  "training.workflow.escalationTitle": "\nFlusso di lavoro dell'escalation",
  "training.workflow.escalationDescription":
    "\nRiporta le ispezioni scadute, il supporto aperto e le code di azioni in un'unica corsia di escalation.",
  "training.workflow.escalationActions":
    "\nLe attività {count} sono attualmente in attesa nella coda di escalation.",
  "training.workflow.escalationInspections":
    "\nLe {count} ispezioni scadute rimangono attive nella sezione di formazione corrente.",
  "training.workflow.escalationSupport":
    "\n{count} i ticket di supporto aperti necessitano ancora del completamento dell'escalation.",
  "fleet.dispatch.title": "\nTabellone spedizioni",
  "fleet.dispatch.description":
    "\nTrasferisci i problemi della flotta al giusto comitato operativo prima che si trasformino in una perdita di disponibilità.",
  "fleet.dispatch.taskQueue": "\nCoda attività",
  "fleet.dispatch.taskQueueDescription":
    "\nEsamina l'attuale arretrato di spedizioni e assegna l'equipaggio successivo.",
  "fleet.dispatch.serviceBoard": "\nScheda di servizio",
  "fleet.dispatch.serviceBoardDescription":
    "\nIndirizza gli incidenti attivi e i tempi di inattività al ripristino del servizio.",
  "fleet.dispatch.reportPack": "\nSegnala pacchetto",
  "fleet.dispatch.reportPackDescription":
    "Inserisci l'attuale pressione della flotta nel prossimo brief decisionale.",
  "fleet.ownerQueue.title": "\nCoda del proprietario della flotta",
  "fleet.ownerQueue.description":
    "\nMantieni allineati i proprietari di spedizione, manutenzione e sostituzione sulla porzione di flotta corrente.",
  "fleet.ownerQueue.dispatch":
    "\nI record della flotta {count} sono in attesa di proprietà della spedizione.",
  "fleet.ownerQueue.recovery":
    "\n{count} gli ordini di lavoro attivi sono ancora in fase di ripristino del servizio.",
  "fleet.ownerQueue.replacement":
    "\n{count} gli articoli del piano sostitutivo rimangono in coda per la revisione.",
  "fleet.serviceBoard.title": "\nScheda di servizio",
  "fleet.serviceBoard.description":
    "\nRiepilogare l'attuale pressione relativa alla manutenzione e ai tempi di inattività in una corsia di servizio operativo.",
  "fleet.serviceBoard.accidents":
    "\n{count} i registri degli incidenti attualmente richiedono una revisione.",
  "fleet.serviceBoard.downtime":
    "\nI record di inattività {count} rimangono attivi nella corsia di servizio.",
  "fleet.serviceBoard.replacement":
    "\n{count} gli elementi di pianificazione della sostituzione necessitano ancora di allineamento del servizio flotta.",
  "buildings.heatmap.title": "\nMappa termica del portafoglio",
  "buildings.heatmap.description":
    "\nEvidenzia l'attuale pressione dell'edificio in termini di preparazione, copertura dei sensori, garanzia e carico del programma.",
  "buildings.heatmap.readiness": "\nPressione di prontezza",
  "buildings.heatmap.readinessDescription":
    "\nRisorse e ordini di lavoro che attualmente determinano la preparazione dell'edificio.",
  "buildings.heatmap.coverage": "\nCopertura sensore",
  "buildings.heatmap.coverageDescription":
    "\nCarico di revisione collegato ai sensori nell'attuale gruppo di edifici.",
  "buildings.heatmap.assurance": "\nRischio assicurativo",
  "buildings.heatmap.assuranceDescription":
    "\nLe azioni di garanzia aperta continuano a modellare la postura del portafoglio.",
  "buildings.heatmap.programme": "\nCarico programma",
  "buildings.heatmap.programmeDescription":
    "\nIniziative che interessano ancora l'attuale coorte edilizia.",
  "buildings.compare.title": "\nConfronto portafoglio",
  "buildings.compare.description":
    "\nPassa dalla mappa termica dell'edificio al report successivo o al confronto di base senza ricostruire il contesto.",
  "buildings.compare.reportPack": "\nApri pacchetto di rapporti",
  "buildings.compare.reportPackDescription":
    "\nAvvia la sezione dell'edificio corrente nell'area di lavoro dei report.",
  "buildings.compare.portfolioBaseline": "\nApri confronto riferimento",
  "buildings.compare.portfolioBaselineDescription":
    "\nUtilizza l'attuale approccio di costruzione come base di riferimento del portafoglio successivo.",
  "buildings.compare.ownerQueueTitle": "\nCoda del proprietario dell'edificio",
  "buildings.compare.ownerQueueDescription":
    "\nMostra quali proprietari di edifici dovranno rispondere successivamente in termini di pianificazione, sensori e garanzia.",
  "buildings.compare.ownerQueuePlanning":
    "\n{count} gli elementi di pianificazione necessitano ancora della revisione del proprietario dell'edificio.",
  "buildings.compare.ownerQueueSensors":
    "\n{count} gli elementi di recensione collegati al sensore rimangono attivi in questa coorte.",
  "buildings.compare.ownerQueueAssurance":
    "\nLe azioni di garanzia {count} sono ancora in attesa del completamento da parte del proprietario.",
  "sensors.calibration.title": "\nCorsia di calibrazione e simulazione",
  "sensors.calibration.description":
    "Trasferisci i problemi dei sensori alla calibrazione, alla revisione delle regole o all'escalation senza lasciare la cabina di pilotaggio.",
  "sensors.calibration.queueLabel": "\nCoda di calibrazione",
  "sensors.calibration.queueDescription":
    "\nEsaminare il carico di lavoro di calibrazione corrente per il set di sensori attivo.",
  "sensors.calibration.rulesLabel": "\nSimulazione regole",
  "sensors.calibration.rulesDescription":
    "\nControlla le modifiche alle regole di avviso prima che vengano promosse alla corsia live.",
  "sensors.calibration.escalationLabel": "\nCorsia di escalation",
  "sensors.calibration.escalationDescription":
    "\nRiporta i problemi del sensore di pressione più elevato al prossimo passaggio di proprietà.",
  "sensors.ownerQueue.title": "\nCoda proprietario sensore",
  "sensors.ownerQueue.description":
    "\nMantieni allineati i proprietari di calibrazione, SLA e garanzia sul set di eccezioni corrente.",
  "sensors.ownerQueue.calibration":
    "\nLe regole di avviso o gli elementi di calibrazione {count} rimangono nella coda attiva.",
  "sensors.ownerQueue.slaLane":
    "\n{count} gli elementi di lavoro basati su sensori violati stanno plasmando la corsia SLA.",
  "sensors.ownerQueue.assurance":
    "\nLe azioni di garanzia {count} necessitano ancora di un proprietario nominato.",
  "digitalTwin.pinboard.title": "\nBacheca dei problemi",
  "digitalTwin.pinboard.description":
    "\nAppunta gli hotspot principali, i problemi di copertura e i controlli di uscita accanto alla scena dal vivo.",
  "digitalTwin.pinboard.hotspotItem":
    "\nIl pin dell'hotspot rimane attivo e necessita della conferma dell'operatore nella vista gemella corrente.",
  "digitalTwin.pinboard.coverageItem":
    "\nIl perno dell'intervallo di copertura rimane aperto per la telemetria e la sezione della telecamera correnti.",
  "digitalTwin.pinboard.egressItem":
    "\nIl perno di uscita e flusso è pronto per la procedura dettagliata della scena successiva.",
  "digitalTwin.actions.title": "\nBinario d'azione",
  "digitalTwin.actions.description":
    "\nSposta il problema del gemello attivo nel lavoro, nel supporto o nell'acquisizione di prove senza lasciare lo spettatore.",
  "digitalTwin.actions.dispatchLabel": "\nFollow-up della spedizione",
  "digitalTwin.actions.dispatchDescription":
    "\nApri la coda operativa per l'emissione gemella attiva.",
  "digitalTwin.actions.supportLabel": "\nApri corsia di supporto",
  "digitalTwin.actions.supportDescription":
    "\nInoltra il problema gemello nell'area di lavoro di supporto con il contesto corrente.",
  "digitalTwin.actions.evidenceLabel": "\nCattura prove",
  "digitalTwin.actions.evidenceDescription":
    "\nApri il feed delle prove dell'hotspot per la scena gemella attiva.",
  "reports.workspace.distributionTitle": "\nControlli distribuzione",
  "reports.workspace.distributionDescription":
    "\nMantieni visibili le approvazioni, le sottoscrizioni e il confronto delle versioni mentre ti sposti nell'area di lavoro del report.",
  "reports.workspace.distributionApprovals": "\nPosizione di approvazione",
  "reports.workspace.distributionApprovalsValue":
    "\nI pacchetti salvati {count} rimangono disponibili per l'approvazione o il riutilizzo.",
  "reports.workspace.distributionSubscriptions": "\nPosizione di abbonamento",
  "reports.workspace.distributionSubscriptionsValue":
    "\nLe rotte modello {count} rimangono disponibili per la distribuzione ripetuta.",
  "reports.workspace.distributionCompare": "\nConfronto versioni",
  "reports.workspace.distributionCompareHistory":
    "\nLa visualizzazione cronologia è pronta per la cronologia e il confronto dei pacchetti salvati.",
  "reports.workspace.distributionCompareReview":
    "\nEsamina il pacchetto attivo prima di promuovere la successiva versione distribuita.",
  "mlops.governance.title": "\nGovernance MLOps",
  "mlops.governance.description":
    "Tieni traccia dei cancelli di promozione, della pressione del rischio e dell'impatto dell'automazione accanto allo spazio di lavoro MLOps live.",
  "mlops.governance.riskRegister":
    "\nGli elementi {count} con esecuzione non riuscita o set di dati offline appartengono attualmente al registro dei rischi.",
  "mlops.governance.promotionGate":
    "\n{count} I cancelli di promozione dell'implementazione sono attualmente attivi.",
  "tasks.dependency.title": "\nDipendenze",
  "tasks.dependency.description": "\nGestisci i blocchi delle attività e le attività correlate.",
  "tasks.dependency.blockedBy": "\nBloccato da",
  "tasks.dependency.blocking": "\nBlocco",
  "tasks.dependency.add": "\nAggiungi dipendenza",
  "tasks.dependency.remove": "\nRimuovi dipendenza",
  "tasks.dependency.circularError": "\nImpossibile creare una dipendenza circolare.",
  "tasks.dependency.type.blocks": "\nBlocchi",
  "tasks.dependency.type.related": "\nCorrelato",
  "tasks.dependency.empty": "\nNessuna dipendenza configurata.",
  "tasks.dependency.blockedBadge": "\nBloccato",
  "tasks.dependency.selectTask": "\nSeleziona un'attività",
  "tasks.dependency.selectTaskHint": "\nCerca per etichetta o ID attività.",
  "tasks.comments.title": "\nAttività e commenti",
  "tasks.comments.description": "\nThread di discussione e registro attività per questa attività.",
  "tasks.comments.placeholder": "\nAggiungi un commento...",
  "tasks.comments.submit": "\nPubblica commento",
  "tasks.comments.empty": "\nNessun commento ancora Inizia la conversazione.",
  "tasks.comments.postedBy": "\nInserito da {author}",
  "tasks.timeTracking.title": "\nMonitoraggio del tempo",
  "tasks.timeTracking.description": "\nRegistra il tempo impiegato per questa attività.",
  "tasks.timeTracking.logTime": "\nRegistra tempo",
  "tasks.timeTracking.minutes": "\nMinuti",
  "tasks.timeTracking.minutesHint": "\nDurata in minuti.",
  "tasks.timeTracking.descriptionLabel": "\nDescrizione",
  "tasks.timeTracking.descriptionHint": "\nBreve nota sul lavoro eseguito.",
  "tasks.timeTracking.date": "\nData",
  "tasks.timeTracking.dateHint": "\nData in cui è stato eseguito il lavoro.",
  "tasks.timeTracking.totalLogged": "\nTotale registrato",
  "tasks.timeTracking.totalLoggedDesc": "\nSomma di tutti gli orari immessi per questa attività.",
  "tasks.timeTracking.entries": "\nImmissioni orari",
  "tasks.timeTracking.empty": "\nNon è stato ancora registrato alcun tempo.",
  "tasks.timeTracking.durationHoursMinutes": "\n{hours}h {minutes}m",
  "tasks.timeTracking.durationMinutesOnly": "\n{minutes}m",
  "tasks.timeTracking.submitAria": "\nInvia immissione ora",
  "workOrders.templates.title": "\nModelli di ordini di lavoro",
  "workOrders.templates.description":
    "\nModelli riutilizzabili per tipi di ordini di lavoro ricorrenti.",
  "workOrders.templates.create": "\nCrea modello",
  "workOrders.templates.useTemplate": "\nUtilizza modello",
  "workOrders.templates.defaultLines": "\nElementi pubblicitari predefiniti",
  "workOrders.templates.defaultSla": "\nSLA predefinito (ore)",
  "workOrders.templates.empty":
    "\nNessun modello disponibile. Creane uno per velocizzare la creazione dell'ordine di lavoro.",
  "workOrders.templates.titleLabel": "\nNome modello",
  "workOrders.templates.titleHint": "\nUn breve nome descrittivo per il modello.",
  "workOrders.templates.descriptionLabel": "\nDescrizione",
  "workOrders.templates.descriptionHint":
    "\nDescrizione facoltativa di quando utilizzare questo modello.",
  "workOrders.templates.scopeLabel": "\nAmbito",
  "workOrders.templates.scopeHint":
    "\nAmbito di lavoro predefinito per gli ordini da questo modello.",
  "workOrders.templates.selectTemplate": "\nSeleziona un modello",
  "workOrders.templates.selectTemplateHint":
    "\nScegli un modello per precompilare i campi dell'ordine di lavoro.",
  "workOrders.templates.submitAria": "\nSalva modello ordine di lavoro",
  "addDevice.review.title": "\nRivedi prima di inviare",
  "addDevice.review.description":
    "\nConferma la configurazione, la postura di importazione e i dettagli di registrazione finali prima di creare il dispositivo.",
  "addDevice.review.items.setup":
    "\nVerificare la configurazione del dispositivo e il contesto del sito di distribuzione.",
  "addDevice.review.items.import":
    "\nConferma i campi importati e tutti i valori predefiniti generati.",
  "addDevice.review.items.confirm": "\nApprova il payload di registrazione finale per l'invio.",
  "addDevice.review.pending": "\nIn attesa di revisione",
  "addDevice.presets.title": "\nLibreria di preimpostazioni",
  "addDevice.presets.description":
    "\nUtilizza i modelli iniziali per i modelli di implementazione comuni prima di creare o importare dispositivi.",
  "addDevice.presets.apply": "\nApplica preimpostazione",
  "addDevice.presets.template": "\nModello",
  "addDevice.presets.baseline.title": "\nImplementazione di base del dispositivo",
  "addDevice.presets.baseline.description":
    "Inizia dal modello di registrazione operativa predefinito con campi standard per risorse e telemetria.",
  "addDevice.presets.fieldKit.title": "\nDistribuzione del kit sul campo",
  "addDevice.presets.fieldKit.description":
    "\nUtilizza una configurazione pronta per il campo per i dispositivi portatili che richiedono una rapida assegnazione del sito e revisione dell'importazione.",
  "addDevice.presets.capital.title": "\nApporto di capitale fisso",
  "addDevice.presets.capital.description":
    "\nImpostazione delle impostazioni predefinite a livello finanziario per i dispositivi di valore più elevato che necessitano di un ciclo di vita e di un monitoraggio del valore più rigorosi.",
  "addDevice.workflow.stepSetup": "\nConfigurazione",
  "addDevice.workflow.stepImport": "\nImporta",
  "addDevice.workflow.stepReview": "\nRecensione",
  "deviceHistory.review.title": "\nRivedi la postura",
  "deviceHistory.review.description":
    "\nConfronta la cronologia recente, il contesto dell'anomalia e la situazione dell'esportazione prima di intensificare la traccia degli eventi.",
  "deviceHistory.review.diffTitle": "\nModifica recensione",
  "deviceHistory.review.diffDescription":
    "\nTieni traccia dell'ultima configurazione o delta del ciclo di vita prima di accettare l'aggiornamento.",
  "deviceHistory.review.diffValue": "\nUltima differenza nell'ambito",
  "deviceHistory.review.anomalyTitle": "\nOrologio anomalo",
  "deviceHistory.review.anomalyDescription":
    "\nMantieni visibili il ciclo di vita o i modelli di manutenzione insoliti per un rapido follow-up.",
  "deviceHistory.review.anomalyValue": "\nRevisione anomalie pronta",
  "deviceHistory.review.exportTitle": "\nEsportazione prove",
  "deviceHistory.review.exportDescription":
    "\nInserisci la cronologia filtrata e il comportamento di revisione in un report o in un trasferimento CSV.",
  "deviceHistory.review.openReports": "\nApri rapporti",
  "deviceHistory.review.raiseFollowUp": "\nAumenta il follow-up",
  "documentDetail.section.activityTitle": "\nAttività correlata",
  "documentDetail.section.activityDescription":
    "\nMantieni visibili gli ultimi movimenti, i record collegati e il contesto operativo a valle.",
  "documentDetail.section.nextDecisionTitle": "\nProssima decisione",
  "documentDetail.section.nextDecisionDescription":
    "\nFai emergere la prossima mossa commerciale o operativa prima di modificare lo stato del flusso di lavoro.",
  "documentDetail.section.signoffTitle": "\nFirma e approvazione",
  "documentDetail.section.signoffDescription":
    "\nMantieni le approvazioni, la posizione di approvazione e le prove di supporto visibili in un unico binario.",
  "documentWorkspace.role.procurement": "\nApprovvigionamenti",
  "documentWorkspace.section.discrepancyTitle": "\nRisoluzione discrepanze",
  "documentWorkspace.section.discrepancyDescription":
    "\nTieni traccia di scostamenti, eccezioni e attività di follow-up prima che il record venga chiuso.",
  "documentWorkspace.section.nextDecisionTitle": "\nProssima decisione",
  "documentWorkspace.section.nextDecisionDescription":
    "\nMantieni visibile nell'area di lavoro la successiva approvazione, mossa commerciale o trasferimento dell'operatore.",
  "documentWorkspace.section.receiptTitle": "\nRicezione e assunzione",
  "documentWorkspace.section.receiptDescription":
    "\nGuarda le prove ricevute, la conferma dell'assunzione e tutte le eventuali lacune rimanenti nelle ricevute.",
  "documentWorkspace.section.slaTitle": "\nOrologio SLA",
  "documentWorkspace.section.slaDescription":
    "\nMonitora le finestre di servizio, i timer e qualsiasi pressione di violazione in sospeso dalla stessa rotaia.",
  "layout.analysisCanvas.leftRail": "\nFiltri",
  "layout.analysisCanvas.stage": "\nContenuto principale",
  "layout.analysisCanvas.rightRail": "\nDettagli",
  "common.view": "\nVedi",
  "training.view.library": "\nBiblioteca",
  "training.view.enrollments": "\nIscrizioni",
  "training.library.title": "\nBiblioteca di corsi",
  "training.library.description": "\nGestisci i corsi di formazione disponibili ei moduli.",
  "training.library.titleColumn": "\nTitolo",
  "training.library.durationColumn": "\nDurata",
  "training.library.modulesColumn": "\nModuli",
  "training.library.enrollmentsColumn": "\nIscrizioni",
  "training.library.empty": "\nNessun corso disponibile.",
  "training.library.mandatory": "\nObbligatorio",
  "training.library.optional": "\nOpzionale",
  "training.enrollment.description":
    "\nMonitora i progressi in tutti i corsi obbligatori e opzionali.",
  "training.enrollment.learnerColumn": "\nApprendista",
  "training.enrollment.courseColumn": "\nCorso",
  "training.enrollment.completed": "\nCompletato",
  "training.enrollment.notStarted": "\nNon avviato",
  "training.enrollment.title": "\nMonitoraggio iscrizioni",
  "training.enrollment.empty": "\nNessuna iscrizione trovata.",

  /* ── API error messages ──────────────────────────────────── */
  "errors.unauthorized": "Non autorizzato",
  "errors.cartNotFound": "Carrello non trovato",
  "errors.articleNotFound": "Articolo non trovato",
  "errors.resellerProfileNotFound": "Profilo rivenditore non trovato",
  "errors.tenantNotFound": "Tenant non trovato",
  "errors.deploymentNotFound": "Distribuzione non trovata",
  "errors.schemaMigrationGovernance":
    "Non è stato soddisfatto il prerequisito di governance della migrazione dello schema.",
  "errors.deploymentMigrationGate":
    "Distribuzione rifiutata: ogni migrazione dello schema elencata deve essere completata con un approvatore.",
  "errors.configVersionNotFound": "Versione di configurazione non trovata.",
  "errors.promotedDirectly": "Promosso direttamente (nessun gate configurato).",
  "errors.noActiveConfigVersion": "Nessuna versione di configurazione attiva da cui ripristinare.",
  "errors.targetVersionAlreadyActive": "La versione di destinazione è già attiva.",
  "errors.approvalNotFound": "Approvazione non trovata o non in sospeso.",
  "errors.noActiveCatalogItem":
    "Il prodotto non ha un articolo di catalogo attivo per questa parte.",
  "errors.noResultsFound": "Nessun risultato trovato",
  "errors.dsarNotFound": "Richiesta dell’interessato non trovata.",
  "errors.dsarExportInvalidStatus":
    "L'esportazione può essere preparata solo per richieste in bozza o inviate.",
  "errors.dsarPurgeInvalidStatus":
    "La purge può essere eseguita solo dopo l’approvazione della richiesta per la purge.",

  /* ── Success messages ────────────────────────────────────── */
  "success.promotionApproved": "Promozione approvata.",
  "success.configVersionActivated": "Versione di configurazione attivata.",
  "success.shipmentCreated": "Spedizione creata.",

  /* ── Labels ──────────────────────────────────────────────── */
  "labels.savings.automation": "Automazione",
  "labels.savings.inventory": "Inventario",

  // Commerce – cart
  "cart.browseProducts": "Sfoglia prodotti",
  "cart.category": "Categoria",
  "cart.clearCart": "Svuota carrello",
  "cart.empty": "Il carrello è vuoto",
  "cart.emptyDescription":
    "Il tuo carrello è vuoto. Sfoglia il nostro catalogo per aggiungere articoli.",
  "cart.emptyTitle": "Nessun articolo nel carrello",
  "cart.items": "articoli",
  "cart.itemCount": "{count} articolo/i",
  "cart.loadError": "Impossibile caricare il carrello. Riprova.",
  "cart.loading": "Caricamento carrello",
  "cart.poNumber": "N. ordine d'acquisto",
  "cart.poNumberPlaceholder": "Inserisci il numero dell'ordine d'acquisto",
  "cart.proceedToCheckout": "Procedi al checkout",
  "cart.product": "Prodotto",
  "cart.quantity": "Quantità",
  "cart.removeItem": "Rimuovi {name}",
  "cart.saveCart": "Salva carrello",
  "cart.summary": "Riepilogo ordine",
  "cart.title": "Carrello",
  "cart.total": "Totale",
  "cart.unitPrice": "Prezzo unitario",
  "cart.updateQuantity": "Aggiorna quantità per {name}",
  "cart.lineItemsTableAria": "Righe del carrello",

  // Commerce – checkout
  "checkout.backToCart": "Torna al carrello",
  "checkout.billingInformation": "Informazioni di fatturazione",
  "checkout.items": "Articoli dell'ordine",
  "checkout.noShippingAddresses": "Nessun indirizzo di spedizione disponibile.",
  "checkout.notes": "Note sull'ordine",
  "checkout.notesPlaceholder": "Aggiungi istruzioni speciali o note",
  "checkout.orderSummary": "Riepilogo ordine",
  "checkout.placeOrder": "Effettua ordine",
  "checkout.poNumber": "N. ordine d'acquisto",
  "checkout.poNumberPlaceholder": "Inserisci il numero dell'ordine d'acquisto",
  "checkout.paymentMethod": "Metodo di pagamento",
  "checkout.shippingAddress": "Indirizzo di spedizione",
  "checkout.step.billing": "Fatturazione",
  "checkout.step.cart": "Carrello",
  "checkout.step.confirm": "Conferma",
  "checkout.step.review": "Revisione",
  "checkout.step.shipping": "Spedizione",
  "checkout.subtitle": "Rivedi il tuo ordine e completa l'acquisto.",
  "checkout.title": "Checkout",
  "checkout.total": "Totale",

  // Commerce – approvals and inventory
  "commerce.approvals.title": "Approvazioni",
  "commerce.approvals.subtitle":
    "Esamina le decisioni in sospeso e verifica le approvazioni completate.",
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
  "commerce.buyingLists.title": "Liste di acquisto",
  "commerce.buyingLists.shared": "Condivisa",
  "commerce.buyingLists.itemCount": "{count} articoli",
  "commerce.buyingLists.emptyTitle": "Nessuna lista di acquisto",
  "commerce.buyingLists.emptyDescription":
    "Crea una lista di acquisto per raggruppare righe catalogo prima del checkout.",
  "commerce.buyingLists.subtitle":
    "Raggruppa righe catalogo e trasferiscile al carrello quando sei pronto.",
  "commerce.buyingLists.createNew": "Crea lista di acquisto",
  "commerce.buyingLists.detail.eyebrow": "Lista di acquisto",
  "commerce.buyingLists.detail.shellTitle": "Lista di acquisto",
  "commerce.buyingLists.detail.notFoundTitle": "Lista di acquisto non trovata",
  "commerce.buyingLists.detail.notFoundDescription":
    "Questa lista non esiste oppure non hai accesso.",
  "commerce.buyingLists.detail.tableCaption": "Righe lista di acquisto",
  "commerce.buyingLists.detail.col.product": "Prodotto",
  "commerce.buyingLists.detail.col.sku": "SKU",
  "commerce.buyingLists.detail.col.quantity": "Qtà",
  "commerce.buyingLists.detail.col.unitPrice": "Prezzo unitario",
  "commerce.buyingLists.detail.col.lineTotal": "Totale riga",
  "commerce.buyingLists.detail.convertToCart": "Invia lista al carrello",
  "commerce.buyingLists.detail.emptyRows":
    "Questa lista non ha ancora righe. Aggiungi prodotti dal catalogo.",
  "commerce.cart.title": "Carrello",
  "commerce.checkout.title": "Checkout",
  "commerce.inventory.title": "Inventario",
  "commerce.inventory.subtitle":
    "Monitora livelli di stock, alert di scorta bassa e azioni di rifornimento.",

  "commerce.workspace.operationsLead":
    "Strumenti di approvvigionamento e catalogo nell’area di lavoro.",
  "commerce.workspace.cartLead":
    "Controlla righe del carrello, quantità e totali prima del checkout.",
  "commerce.workspace.buyingListDetailLead":
    "Esamina le righe preparate e invia l’elenco al carrello quando sei pronto.",
  "commerce.workspace.productDetailLead":
    "Specifiche, prezzi e disponibilità per questo articolo del catalogo.",

  // Commerce – compliance
  "commerce.compliance.contract": "Contratto",
  "commerce.compliance.contractTooltip": "Acquistato a prezzi contrattuali",
  "commerce.compliance.offContract": "Fuori contratto",
  "commerce.compliance.offContractWithCatalog": "Fuori contratto ({catalogType})",

  // Commerce – fulfilment
  "commerce.fulfilment.blindFulfilment": "Evasione cieca",
  "commerce.fulfilment.blindFulfilmentDescription":
    "Nascondi i dettagli del fornitore su distinte di imballaggio e documenti di consegna.",
  "commerce.fulfilment.configDescription":
    "Configura l'evasione cieca e le regole di imballaggio per questo partner.",
  "commerce.fulfilment.configTitle": "Configurazione evasione",
  "commerce.fulfilment.packagingRules": "Regole di imballaggio",
  "commerce.fulfilment.saveConfig": "Salva configurazione",
  "commerce.fulfilment.toggleBlind": "Attiva/disattiva evasione cieca",

  // Commerce – orders (customer order history list)
  "commerce.orders.date": "Data",
  "commerce.orders.emptyDescription": "Quando effettui ordini, compaiono qui con stato e totali.",
  "commerce.orders.emptyTitle": "Nessun ordine ancora",
  "commerce.orders.filterBarDescription":
    "I risultati si aggiornano dopo una breve pausa di digitazione. Usa «Cancella tutti i filtri» per azzerare l'elenco.",
  "commerce.orders.filterBarEyebrow": "Filtri",
  "commerce.orders.filterBarTitle": "Cerca ordini",
  "commerce.orders.filteredEmptyDescription":
    "Prova parole chiave diverse o cancella i filtri per vedere tutti gli ordini.",
  "commerce.orders.filteredEmptyTitle": "Nessun risultato corrisponde ai filtri",
  "commerce.orders.items": "Articoli",
  "commerce.orders.orderNumber": "Ordine",
  "commerce.orders.reorder": "Riordina",
  "commerce.orders.resultCount": "{count} ordini",
  "commerce.orders.search": "Cerca",
  "commerce.orders.searchLabel": "Cerca ordini",
  "commerce.orders.searchPlaceholder": "Cerca per numero ordine…",
  "commerce.orders.status": "Stato",
  "commerce.orders.subtitle": "Rivedi acquisti passati, totali e riordina in un unico posto.",
  "commerce.orders.tableLabel": "Cronologia ordini",
  "commerce.orders.title": "Cronologia ordini",
  "commerce.orders.total": "Totale",
  "commerce.orders.view": "Visualizza ordine",

  // Commerce – knowledge base
  "commerce.knowledgeBase.categoryLegend": "Categorie",
  "commerce.knowledgeBase.emptyDescription": "Sfoglia guide e risposte per partner e operazioni.",
  "commerce.knowledgeBase.emptyTitle": "Nessun articolo ancora",
  "commerce.knowledgeBase.filterBarDescription":
    "I risultati si aggiornano dopo una breve pausa di digitazione. Le categorie restano attive finché non scegli «Tutti» o «Cancella tutti i filtri».",
  "commerce.knowledgeBase.filterBarEyebrow": "Filtri",
  "commerce.knowledgeBase.filterBarTitle": "Cerca articoli",
  "commerce.knowledgeBase.filteredEmptyDescription":
    "Prova altre parole chiave, un'altra categoria o cancella tutti i filtri.",
  "commerce.knowledgeBase.filteredEmptyTitle": "Nessun risultato corrisponde ai filtri",
  "commerce.knowledgeBase.loadingArticles": "Caricamento articoli",
  "commerce.knowledgeBase.resultCount": "{count} articoli",
  "commerce.knowledgeBase.search": "Cerca",
  "commerce.knowledgeBase.searchLabel": "Cerca articoli",
  "commerce.knowledgeBase.searchPlaceholder": "Cerca in titoli e tag…",
  "commerce.knowledgeBase.subtitle": "Trova guide sui prodotti, policy e articoli pratici.",
  "commerce.knowledgeBase.title": "Knowledge base",
  "commerce.knowledgeBase.views": "visualizzazioni",

  // Commerce – products
  "commerce.products.addToCart": "Aggiungi al carrello",
  "commerce.products.allProducts": "Tutti i prodotti",
  "commerce.products.availability": "Disponibilità",
  "commerce.products.categories": "Categorie",
  "commerce.products.categoryNav": "Navigazione categoria prodotti",
  "commerce.products.customerPartNumber": "N. parte cliente",
  "commerce.products.days": "giorni",
  "commerce.products.description": "Descrizione",
  "commerce.products.emptyDescription":
    "Prova ad aggiustare la ricerca o i filtri per trovare ciò che cerchi.",
  "commerce.products.emptyTitle": "Nessun prodotto trovato",
  "commerce.products.imageGallery": "Galleria immagini del prodotto",
  "commerce.products.inStock": "disponibile",
  "commerce.products.leadTime": "Tempo di consegna",
  "commerce.products.loadingProducts": "Caricamento prodotti",
  "commerce.products.minOrderQty": "Quantità minima d'ordine",
  "commerce.products.noSearchResults": 'Nessun risultato trovato per "{query}".',
  "commerce.products.noStockInfo":
    "Le informazioni sulle scorte non sono disponibili per questo prodotto.",
  "commerce.products.notFound": "Prodotto non trovato",
  "commerce.products.notFoundDescription": "Il prodotto che cerchi non esiste o è stato rimosso.",
  "commerce.products.pricing": "Prezzi",
  "commerce.products.quantity": "Quantità",
  "commerce.products.relatedProducts": "Prodotti correlati",
  "commerce.products.search": "Cerca",
  "commerce.products.searchLabel": "Cerca prodotti",
  "commerce.products.searchPlaceholder": "Cerca prodotti...",
  "commerce.products.searchResults": "Risultati di ricerca",
  "commerce.products.specifications": "Specifiche",
  "commerce.products.subtitle": "Sfoglia il nostro catalogo prodotti.",
  "commerce.products.filterBarEyebrow": "Filtri",
  "commerce.products.filterBarTitle": "Cerca nel catalogo",
  "commerce.products.filterBarDescription":
    "\nI risultati si aggiornano dopo una breve pausa di digitazione. La categoria resta applicata finché non scegli Tutti i prodotti o Cancella tutti i filtri.",
  "commerce.products.title": "Prodotti",
  "commerce.products.unitOfMeasure": "Unità di misura",
  "commerce.products.viewAllResults": "Vedi tutti i {count} risultati",
  "commerce.products.viewDetails": "Vedi dettagli",

  // Commerce – reseller
  "commerce.reseller.blindFulfillment": "Evasione cieca",
  "commerce.reseller.contactSupport": "Contatta supporto",
  "commerce.reseller.refreshOrders": "Aggiorna cronologia ordini",
  "commerce.reseller.refreshInvoices": "Aggiorna fatture",
  "commerce.reseller.dashboardDescription":
    "Gestisci il tuo profilo rivenditore e monitora le prestazioni.",
  "commerce.reseller.dashboardTitle": "Dashboard rivenditore",
  "commerce.reseller.date": "Data",
  "commerce.reseller.discount": "Sconto",
  "commerce.reseller.discountRate": "Tasso di sconto",
  "commerce.reseller.freightEligible": "Idoneo per spedizione",
  "commerce.reseller.invoiceNumber": "Fattura n.",
  "commerce.reseller.invoices": "Fatture",
  "commerce.reseller.invoicesEmptyDescription":
    "Le fatture compaiono qui quando ricevi documenti fatturabili.",
  "commerce.reseller.invoicesEmptyTitle": "Nessuna fattura ancora",
  "commerce.reseller.invoicesTableAria": "Fatture rivenditore",
  "commerce.reseller.onboarded": "Integrato",
  "commerce.reseller.orderHistory": "Cronologia ordini",
  "commerce.reseller.orderNumber": "Ordine n.",
  "commerce.reseller.ordersEmptyDescription":
    "Gli ordini compaiono qui dopo averli effettuati dal portale.",
  "commerce.reseller.ordersEmptyTitle": "Nessun ordine ancora",
  "commerce.reseller.ordersTableAria": "Cronologia ordini rivenditore",
  "commerce.reseller.profileInfo": "Informazioni profilo",
  "commerce.reseller.status": "Stato",
  "commerce.reseller.tier": "Livello",
  "commerce.reseller.total": "Totale",
  "commerce.reseller.partyName": "Partner",
  "commerce.reseller.blind": "Evasione cieca",
  "commerce.reseller.freight": "Spedizione",
  "commerce.reseller.volumeThreshold": "Soglia di volume",
  "commerce.reseller.actions": "Azioni",
  "commerce.reseller.adminTitle": "Amministrazione rivenditori",
  "commerce.reseller.adminDescription":
    "Esamina livelli partner, opzioni di evasione e stato di onboarding.",
  "commerce.reseller.createProfile": "Crea profilo rivenditore",
  "commerce.reseller.totalResellers": "Rivenditori totali",
  "commerce.reseller.activeResellers": "Rivenditori attivi",
  "commerce.reseller.noResellers": "Nessun profilo rivenditore corrisponde al filtro corrente.",
  "commerce.reseller.profilesTableAria": "Profili rivenditore",

  // Commerce – spending limits
  "commerce.spending.active": "Attivo",
  "commerce.spending.addLimit": "Aggiungi limite di spesa",
  "commerce.spending.annually": "Annualmente",
  "commerce.spending.currency": "Valuta",
  "commerce.spending.delete": "Elimina",
  "commerce.spending.edit": "Modifica",
  "commerce.spending.emptyDescription":
    "Imposta limiti di spesa per controllare i budget di acquisto per ruolo.",
  "commerce.spending.emptyTitle": "Nessun limite di spesa configurato",
  "commerce.spending.inactive": "Inattivo",
  "commerce.spending.limit": "Limite",
  "commerce.spending.limitAmount": "Importo limite",
  "commerce.spending.monthly": "Mensile",
  "commerce.spending.period": "Periodo",
  "commerce.spending.quarterly": "Trimestrale",
  "commerce.spending.role": "Ruolo",
  "commerce.spending.saveLimit": "Salva limite",
  "commerce.spending.selectRole": "Seleziona un ruolo",
  "commerce.spending.status": "Stato",
  "commerce.spending.subtitle":
    "Gestisci limiti di spesa e budget per i ruoli di approvvigionamento.",
  "commerce.spending.limitsTableAria": "Limiti di spesa",
  "commerce.spending.title": "Limiti di spesa",
  "commerce.spending.user": "Utente",

  // Commerce – three-way match
  "commerce.threeWayMatch.discrepanciesFound": "Discrepanze trovate",
  "commerce.threeWayMatch.discrepancy": "Discrepanza",
  "commerce.threeWayMatch.discrepancyCount": "{count} discrepanza/e",
  "commerce.threeWayMatch.invoiceTotal": "Totale fattura",
  "commerce.threeWayMatch.invoiceUnitPrice": "Prezzo unitario fattura",
  "commerce.threeWayMatch.invoicedQty": "Qtà fatturata",
  "commerce.threeWayMatch.matched": "Corrispondente",
  "commerce.threeWayMatch.ok": "OK",
  "commerce.threeWayMatch.poQty": "Qtà OA",
  "commerce.threeWayMatch.poTotal": "Totale OA",
  "commerce.threeWayMatch.poUnitPrice": "Prezzo unitario OA",
  "commerce.threeWayMatch.product": "Prodotto",
  "commerce.threeWayMatch.shipmentTotal": "Totale spedizione",
  "commerce.threeWayMatch.shippedQty": "Qtà spedita",
  "commerce.threeWayMatch.subtitle": "Riconciliazione tripla per l'OA {poNumber}.",
  "commerce.threeWayMatch.title": "Riconciliazione tripla",
  "commerce.threeWayMatch.viewPO": "Vedi OA",

  // Commerce – usage reports
  "commerce.usageReports.dateFrom": "Data da",
  "commerce.usageReports.dateTo": "Data a",
  "commerce.usageReports.emptyDescription":
    "Esegui un report per visualizzare i dati di utilizzo degli acquisti.",
  "commerce.usageReports.export": "Esporta",
  "commerce.usageReports.filterLabel": "Filtri report di utilizzo",
  "commerce.usageReports.grandTotal": "Totale generale",
  "commerce.usageReports.groupBy": "Raggruppa per",
  "commerce.usageReports.groupLabel": "Gruppo",
  "commerce.usageReports.orderCount": "Ordini",
  "commerce.usageReports.runReport": "Esegui report",
  "commerce.usageReports.subtitle": "Analizza i modelli di acquisto e la spesa per categoria.",
  "commerce.usageReports.title": "Report di utilizzo",
  "commerce.usageReports.totalQuantity": "Qtà totale",
  "commerce.usageReports.totalSpend": "Spesa totale",

  // Common – additional keys
  "common.breadcrumb": "Breadcrumb",

  /* ── Commerce ────────────────────────────────────────────── */
  "commerce.quickOrder.exampleSkus": "SKU-001 x 10\nSKU-002 x 5\nSKU-003 x 25",

  "commerce.customerOrders.title": "Ordini cliente",
  "commerce.customerOrders.subtitle": "Gestisci ordini aperti, importi e stato di evasione.",
  "commerce.customerOrders.action.browseCatalog": "Sfoglia catalogo",
  "commerce.customerOrders.action.viewOrder": "Vedi ordine",
  "commerce.customerOrders.search": "Cerca ordini",
  "commerce.customerOrders.searchLabel": "Cerca ordini cliente",
  "commerce.customerOrders.searchPlaceholder": "Cerca per numero ordine o cliente",
  "commerce.customerOrders.tableCaption": "Ordini cliente",
  "commerce.customerOrders.listRegionLabel": "Risultati ordini",
  "commerce.customerOrders.col.id": "Ordine",
  "commerce.customerOrders.col.customer": "Cliente",
  "commerce.customerOrders.col.status": "Stato",
  "commerce.customerOrders.col.amount": "Importo",
  "commerce.customerOrders.col.date": "Aggiornato",
  "commerce.customerOrders.pagination.count": "{start}\u2013{end} di {count} ordini",
  "commerce.customerOrders.empty.title": "Nessun ordine ancora",
  "commerce.customerOrders.empty.description":
    "Gli ordini da catalogo e preventivi compaiono qui dopo l’invio.",
  "commerce.customerOrders.empty.cta": "Aggiorna elenco",
  "commerce.customerOrders.error.title": "Impossibile caricare gli ordini",
  "commerce.customerOrders.error.retry": "Riprova",
  "commerce.customerOrders.detail.eyebrow": "Ordine cliente",
  "commerce.customerOrders.detail.summaryLabel": "Riepilogo ordine",
  "commerce.customerOrders.detail.stat.status": "Stato",
  "commerce.customerOrders.detail.attributesLabel": "Dettagli",
  "commerce.customerOrders.detail.attributesTitle": "Attributi ordine",
  "commerce.customerOrders.detail.fieldset.identity": "Identità e cliente",
  "commerce.customerOrders.detail.fieldset.schedule": "Pianificazione",
  "commerce.customerOrders.detail.lineItemsLabel": "Righe",
  "commerce.customerOrders.detail.lineItemsTitle": "Articoli nell’ordine",
  "commerce.customerOrders.detail.lineItemsEmpty": "Nessuna riga per questo ordine.",
  "commerce.customerOrders.detail.lineItemsTableCaption": "Righe ordine",
  "commerce.customerOrders.detail.col.description": "Descrizione",
  "commerce.customerOrders.detail.col.qty": "Qtà",
  "commerce.customerOrders.detail.col.total": "Totale riga",
  "commerce.customerOrders.detail.historyLabel": "Attività",
  "commerce.customerOrders.detail.historyTitle": "Cronologia ordine",
  "commerce.customerOrders.detail.timelineEmpty": "Nessun evento ancora.",
  "commerce.customerOrders.detail.action.editOrder": "Modifica ordine",
  "commerce.customerOrders.detail.action.deleteOrder": "Elimina ordine",

  "commerce.rfqs.title": "Richieste di offerta",
  "commerce.rfqs.subtitle": "Monitora volume RFQ, referenti e follow-up cliente.",
  "commerce.rfqs.action.createRequest": "Avvia RFQ pubblico",
  "commerce.rfqs.action.viewRequest": "Vedi richiesta",
  "commerce.rfqs.search": "Cerca richieste",
  "commerce.rfqs.searchLabel": "Cerca RFQ",
  "commerce.rfqs.searchPlaceholder": "Per Nr., titolo o cliente",
  "commerce.rfqs.tableCaption": "Richieste di offerta",
  "commerce.rfqs.listRegionLabel": "Risultati RFQ",
  "commerce.rfqs.col.id": "Richiesta",
  "commerce.rfqs.col.name": "Titolo",
  "commerce.rfqs.col.customer": "Cliente",
  "commerce.rfqs.col.status": "Stato",
  "commerce.rfqs.col.amount": "Budget",
  "commerce.rfqs.col.date": "Richiesta",
  "commerce.rfqs.pagination.count": "{start}\u2013{end} di {count} richieste",
  "commerce.rfqs.empty.title": "Nessuna RFQ ancora",
  "commerce.rfqs.empty.description": "Le richieste cliente emergono qui dopo l’invio.",
  "commerce.rfqs.empty.cta": "Aggiorna elenco",
  "commerce.rfqs.error.title": "Impossibile caricare le RFQ",
  "commerce.rfqs.error.retry": "Riprova",
  "commerce.rfqs.detail.eyebrow": "Richiesta di offerta",
  "commerce.rfqs.detail.summaryLabel": "Riepilogo RFQ",
  "commerce.rfqs.detail.stat.status": "Stato",
  "commerce.rfqs.detail.attributesLabel": "Dettagli",
  "commerce.rfqs.detail.attributesTitle": "Attributi RFQ",
  "commerce.rfqs.detail.fieldset.identity": "Identità e cliente",
  "commerce.rfqs.detail.fieldset.schedule": "Pianificazione",
  "commerce.rfqs.detail.lineItemsLabel": "Righe",
  "commerce.rfqs.detail.lineItemsTitle": "Articoli richiesti",
  "commerce.rfqs.detail.lineItemsEmpty": "Nessuna riga su questa richiesta.",
  "commerce.rfqs.detail.lineItemsTableCaption": "Righe RFQ",
  "commerce.rfqs.detail.col.description": "Descrizione",
  "commerce.rfqs.detail.col.qty": "Qtà",
  "commerce.rfqs.detail.col.unitPrice": "Prezzo unitario",
  "commerce.rfqs.detail.historyLabel": "Attività",
  "commerce.rfqs.detail.historyTitle": "Cronologia RFQ",
  "commerce.rfqs.detail.timelineEmpty": "Nessun evento ancora.",
  "commerce.rfqs.detail.action.editRequest": "Modifica richiesta",
  "commerce.rfqs.detail.action.deleteRequest": "Elimina richiesta",

  /* ── Form aria-labels ──────────────────────────────────── */
  "forms.checkout.paymentMethod": "Seleziona metodo di pagamento",
  "forms.punchout.partyName": "Nome della controparte",
  "forms.punchout.protocol": "Seleziona protocollo",
  "forms.quickOrder.csvFile": "File CSV",
  "forms.spending.role": "Seleziona ruolo",
  "forms.spending.limitAmount": "Importo limite",
  "forms.spending.currency": "Valuta",
  "forms.spending.period": "Seleziona periodo",
  "forms.usageReports.groupBy": "Raggruppa per",
  "forms.warehouse.name": "Nome del magazzino",
  "forms.warehouse.code": "Codice del magazzino",
  "forms.warehouse.type": "Seleziona tipo di magazzino",
  "forms.warehouse.site": "Sede del magazzino",

  /* ── Additional errors ─────────────────────────────────── */
  "errors.faqNotFound": "FAQ non trovata",

  /* ── UI standards (audit) ──────────────────────────────── */
  "common.undo": "Annulla",
  "common.moreActions": "Altre azioni",
  "common.required": "obbligatorio",
  "common.submitting": "Invio…",
  "common.saving": "Salvataggio…",
  "common.bulkActionBar": "Barra azioni in blocco",
  "common.dismissNotification": "Chiudi notifica",
  "public.catalog.index.gridTitle": "Track di servizio",
  "public.catalog.index.empty.title": "Ancora nessun track di servizio",
  "public.catalog.index.empty.description":
    "I track di servizio appariranno qui non appena pubblicati.",
  "public.catalog.card.cardLabel": "Visualizza track di servizio {title}",
  "public.home.catalog.cardLabel": "Visualizza {title}",
  "public.products.empty.title": "Nessun prodotto corrisponde alla ricerca",
  "public.products.empty.description":
    "Prova una parola chiave diversa o cancella i filtri attivi.",
  "public.products.empty.clear": "Cancella ricerca",
  "public.products.card.cardLabel": "Visualizza prodotto {name}",
  "rfq.form.submitting": "Invio…",
  "rfq.form.eyebrow": "Richiedi un preventivo",
  "rfq.form.pageDescription": "Descrivi i tuoi requisiti — rispondiamo entro un giorno lavorativo.",
  "rfq.thanks.returnToCatalog": "Torna al catalogo",
  "rfq.draft.title": "Bozze RFQ",
  "rfq.draft.description": "Riprendi una bozza per completare la tua richiesta.",
  "assistant.stream.live": "Messaggi della conversazione",
  "assistant.empty.title": "Inizia la conversazione",
  "assistant.empty.description": "Fai una domanda su ambito, consegna o condizioni commerciali.",
  "assistant.error.disconnected.title": "Connessione persa",
  "assistant.error.disconnected.description":
    "Lo stream della conversazione si è disconnesso. La pagina si riconnetterà automaticamente.",
  "digital.twin.unsupported.title": "Il tuo browser non supporta la visualizzazione 3D",
  "digital.twin.unsupported.description":
    "Aggiorna a un browser moderno o abilita WebGL per visualizzare il gemello digitale.",
  "admin.dsar.purgeConfirm.title": "Eliminare il record dell’interessato?",
  "admin.dsar.purgeConfirm.description":
    "Questo eliminerà definitivamente tutti i dati collegati a {subject}. Azione irreversibile.",
  "admin.dsar.purgeConfirm.action": "Elimina dati",
  "admin.user.deleteConfirm.title": "Eliminare utente?",
  "admin.user.deleteConfirm.description":
    "Tutti gli accessi di {user} saranno revocati e i dati personali rimossi. Irreversibile.",
  "admin.user.deleteConfirm.action": "Elimina utente",
  "admin.tenant.suspendConfirm.title": "Sospendere il tenant?",
  "admin.tenant.suspendConfirm.description":
    "Tutti i membri di {tenant} perderanno l’accesso immediatamente. Puoi riattivare in seguito.",
  "admin.tenant.suspendConfirm.action": "Sospendi tenant",
  "admin.config.promoteConfirm.title": "Promuovere la configurazione in {env}?",
  "admin.config.promoteConfirm.description":
    "La configurazione selezionata sarà attivata in {env}. I valori esistenti saranno archiviati.",
  "admin.config.promoteConfirm.action": "Promuovi configurazione",
  "profile.security.session.revokeConfirm.title": "Revocare la sessione?",
  "profile.security.session.revokeConfirm.description":
    "La sessione selezionata sarà disconnessa immediatamente dal dispositivo.",
  "profile.security.session.revokeConfirm.action": "Revoca sessione",
  "profile.security.passkey.deleteConfirm.title": "Eliminare passkey?",
  "profile.security.passkey.deleteConfirm.description":
    "Non potrai più accedere con questo passkey. Puoi registrarne uno nuovo in qualsiasi momento.",
  "profile.security.passkey.deleteConfirm.action": "Elimina passkey",
  "tasks.kanban.moveTo": "Sposta in {status}",
  "cart.toast.removed": "Articolo rimosso dal carrello",
  "support.replyForm.legend": "Rispondi al ticket",
  "governance.generated.warning":
    "Questo artefatto è generato. Modifica invece la sorgente canonica.",
  "commerce.product.relatedHeading": "Prodotti correlati",
  "common.a11y.toggleSidebar": "Attiva/disattiva barra laterale",
  "common.a11y.toggleTheme": "Attiva/disattiva tema",
  "common.a11y.mainNavigation": "Navigazione principale",
  "common.a11y.topNavigation": "Barra superiore",
  "common.a11y.openProfileMenu": "Apri menu profilo",
  "common.actions.settings": "Impostazioni",
  "common.actions.logout": "Disconnetti",
  "hub.notifications.navbarTitle": "Notifiche",
  "nav.ecosystemSection": "Ecosistema",
} satisfies I18nDictionary<EnKey>;

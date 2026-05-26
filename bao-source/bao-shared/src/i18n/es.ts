import type { EnKey, I18nDictionary } from "./en";

/** ES translation dictionary generated from the English source. */
export const es = {
  "app.name": "Plataforma operativa",
  "app.tagline": "\nInteligencia operativa de activos",
  "layout.brand": "\nConsola operativa",
  "layout.appHeader": "Encabezado de la aplicación",
  "layout.mobileNav": "Navegación móvil principal",
  "layout.sync": "\nSincronización",
  "layout.toggleTheme": "\nAlternar modo de color",
  "layout.authChromeNav": "\nNavegación de inicio de sesión",
  "layout.toggleDarkMode": "\nAlternar modo oscuro",
  "layout.userMenu": "\nMenú de usuario",
  "layout.userMenuOpen": "\nAbrir menú de usuario para {name}",
  "layout.signOut": "\nCerrar sesión",
  "layout.language": "\nIdioma",
  "layout.languageMenu": "\nMenú de idioma",
  "layout.languageDescription": "\nCambiar idioma de visualización",
  "layout.languageCurrent": "\nIdioma actual: {language}",
  "layout.languageSelectAria": "\nCambiar idioma a {language}",
  "layout.languageSaved": "\nIdioma actualizado.",
  "layout.releaseStage": "\nVersión preliminar",
  "layout.footerNav": "\nNavegación de pie de página",
  "layout.footerTagline":
    "\nSuperficies de operaciones renderizadas por el servidor para inteligencia de activos, flujo de mantenimiento y visibilidad transaccional.",
  "layout.footerThemeNote": "\nSistema temático de {brandName}",
  "layout.footerCopyright": "\nCopyright © 2026 {brandName}",
  "layout.logoAlt": "Plataforma operativa",
  "roles.admin": "\nAdministrador",
  "roles.estateManager": "\nGerente de finca",
  "roles.maintenanceLead": "\nLíder de mantenimiento",
  "roles.fieldTechnician": "\nTécnico de campo",
  "roles.financeOfficer": "\nOficial de finanzas",
  "roles.unknown": "\nOperador",
  "admin.systemCounters": "\nContadores del sistema",
  "admin.createAdmin.databaseRequired":
    "\nEstablezca DATABASE_URL antes de ejecutar el script de arranque del administrador.",
  "admin.createAdmin.credentialsRequired":
    "\nConfigure CREATE_ADMIN_EMAIL y CREATE_ADMIN_PASSWORD antes de ejecutar el script de arranque del administrador.",
  "admin.createAdmin.updatedRole": "\nSe actualizó el usuario existente {email} al rol ADMIN.",
  "admin.createAdmin.createdUser": "\nUsuario administrador creado: {email}",
  "common.summary": "\nResumen",
  "common.applyFilters": "\nAplicar filtros",
  "common.userFallback": "\nOperador",
  "common.moreInfo": "\nMás información",
  "common.moreInfoFor": "\nMás información sobre {subject}",
  "addDevice.form.submitAria": "\nEnviar registro de dispositivo",
  "layout.mobileNavigation": "\nNavegación móvil",
  "layout.headerNavigation": "\nNavegación del encabezado",
  "layout.sidebarNavigation": "\nNavegación principal",
  "nav.dashboard": "\nPanel",
  "nav.assets": "\nActivos",
  "nav.section.core": "\nNúcleo",
  "nav.section.assets": "\nActivos",
  "nav.section.account": "\nCuenta",
  "nav.section.operations": "\nOperaciones",
  "nav.section.insights": "\nPerspectivas",
  "nav.section.finance": "\nFinanzas",
  "nav.section.documents": "\nDocumentos",
  "nav.section.admin": "\nAdministración",
  "nav.section.home": "\nInicio",
  "nav.section.operate": "\nOperar",
  "nav.section.monitor": "\nMonitor",
  "nav.section.plan": "\nPlan",
  "nav.section.commercial": "\nComercial",
  "nav.section.procurement": "\nAdquisiciones",
  "nav.section.control": "\nControl",
  "nav.predictions": "\nPredicciones",
  "nav.tasks": "\nTareas",
  "nav.finance": "\nFinanzas",
  "nav.financePlanning": "\nPlanificación financiera",
  "nav.estate": "\nPropiedad",
  "nav.portfolio": "\nPortafolio",
  "nav.rfqs": "\nRFQ",
  "nav.customerOrders": "\nPedidos de clientes",
  "nav.workOrders": "\nÓrdenes de trabajo",
  "nav.purchaseOrders": "\nÓrdenes de compra",
  "nav.invoices": "\nFacturas",
  "nav.fleet": "\nFlota",
  "nav.buildings": "\nEdificios",
  "nav.sensors": "\nSensores",
  "nav.reports": "\nInformes",
  "nav.aiPlayground": "Zona de pruebas de IA",
  "nav.agentic": "Agéntico",
  "nav.agenticStorage": "Almacenamiento agéntico",
  "app.nav.git": "Espacios de trabajo",
  "app.nav.repos": "Repositorios alojados",
  "app.nav.activity": "Actividad de preparación de lanzamiento",
  "registry.nav.publish": "Publicar paquetes",
  "nav.sandbox": "Permisos de sandbox",
  "nav.utilisation": "\nUtilización",
  "nav.admin": "Administracion",
  "nav.digitalTwin": "\nGemelo digital",
  "nav.openSidebar": "\nAbrir barra lateral",
  "nav.closeSidebar": "\nCerrar barra lateral",
  "nav.skipToContent": "\nSaltar al contenido principal",
  "nav.breadcrumb": "\nRuta de navegación",
  "nav.breadcrumbTruncated": "Más",
  "nav.profile": "\nPerfil",
  "nav.customisation": "\nPersonalización",
  "nav.kanban": "\nKanban",
  "nav.addDevice": "\nAgregar dispositivo",
  "nav.deviceHistory": "\nHistorial del dispositivo",
  "nav.userRole": "\nRol de usuario",
  "locale.option.en": "\nEspañol",
  "locale.option.de": "\nalemán",
  "locale.option.fr": "\nFrancés",
  "locale.option.es": "\nEspañol",
  "locale.option.it": "\nItaliano",
  "locale.option.pt": "\nPortugués",
  "public.meta.description":
    "\nUna plataforma para capturar la demanda pública, documentos comerciales, visibilidad de socios, orientación de IA, generación de informes y comercio asistido por máquinas.",
  "public.nav.home": "\nInicio",
  "public.nav.catalog": "\nCatálogo",
  "public.nav.requestQuote": "\nSolicitar cotización",
  "public.nav.startRfq": "\nIniciar RFQ",
  "public.nav.signIn": "\nIniciar sesión",
  "public.assistant.breadcrumb.session": "\nSesión del asistente",
  "public.assistant.breadcrumb.transcript": "\nTranscripción",
  "public.footer.description":
    "\nEntrada de público, control comercial, visibilidad de socios, orientación de IA, generación de informes y automatización para operaciones basadas en documentos.",
  "public.footer.rfq": "Solicitud de presupuesto (RFQ)",
  "public.footer.portalSignIn": "\nIniciar sesión en el portal",
  "public.page.catalog": "\nCatálogo",
  "public.page.requestQuote": "\nSolicitar cotización",
  "public.page.rfqSubmitted": "\nSolicitud de cotización enviada",
  "public.assistant.panel.eyebrow": "\nAsistente público",
  "public.assistant.panel.formAria": "\nIniciar una sesión de asistente público",
  "public.assistant.panel.titleLabel": "\nTítulo de la sesión",
  "public.assistant.panel.descriptionLabel": "\nAviso de sesión",
  "public.assistant.panel.titleHint":
    "\nUtilice una etiqueta corta que coincida con el alcance del servicio o la solicitud que se está preparando.",
  "public.assistant.panel.descriptionHint":
    "Resuma el alcance, los plazos, las aprobaciones y las limitaciones de entrega que el asistente debe preservar.",
  "public.assistant.panel.titlePlaceholder": "\nEjemplo: planificación de confiabilidad de activos",
  "public.assistant.panel.descriptionPlaceholder":
    "\nEjemplo: capturar el alcance del sitio, las fechas solicitadas, las dependencias y los desencadenantes de escalamiento antes de enviar la solicitud de cotización.",
  "public.assistant.panel.helpText":
    "\nEsto crea una sesión de asistente público para el contexto de la página actual.",
  "public.assistant.panel.launchError":
    "\nNo se pudo iniciar la sesión del asistente. Revise el contexto actual y vuelva a intentarlo.",
  "public.assistant.panel.submit": "\nIniciar sesión de asistente",
  "public.assistant.catalog.title": "\nAsistente de catálogo",
  "public.assistant.catalog.description":
    "\nUtilice el detalle del catálogo actual como contexto y luego transmítalo a la sesión del asistente público.",
  "public.assistant.rfq.title": "\nAsistente de RFQ",
  "public.assistant.rfq.description":
    "\nCree una sesión de asistente público con el contexto de la página RFQ antes de enviar la solicitud.",
  "public.assistant.rfq.prompt":
    "\nCapture el contexto de la solicitud, aclare el alcance y prepare la transferencia pública.",
  "public.assistant.rfq.bundlePrompt":
    "\nCapture el contexto de solicitud incluido para {services}, aclare el alcance y prepare la transferencia pública.",
  "public.assistant.started.description":
    "\nLa sesión de asistente público está lista. Continúe refinando la solicitud con el mismo contexto.",
  "public.assistant.started.openAction": "\nSesión abierta",
  "public.assistant.started.sessionLabel": "\nID de sesión pública",
  "public.assistant.started.restartAction": "\nIniciar otra sesión",
  "public.assistant.started.nextStepsTitle": "\nPróximos pasos",
  "public.assistant.started.nextStep.session":
    "\nContinúe la sesión en vivo para capturar aclaraciones y preservar el contexto del comprador.",
  "public.assistant.started.nextStep.context":
    "\nRegrese a la página actual cuando necesite actualizar el alcance, los detalles de la solicitud de presupuesto o el contexto del catálogo.",
  "public.assistant.started.nextStep.handoff":
    "\nEscalar dentro de la sesión cuando se requiera la revisión del operador o una transferencia pública.",
  "public.assistant.workspace.eyebrow": "\nSesión de asistente público",
  "public.assistant.workspace.summaryTitle": "\nResumen de la sesión",
  "public.assistant.workspace.sessionBadge": "\nSesión en vivo",
  "public.assistant.workspace.sessionIdLabel": "\nID de sesión",
  "public.assistant.workspace.contextLabel": "\nContexto capturado",
  "public.assistant.workspace.messageCountLabel": "\nMensajes capturados",
  "public.assistant.workspace.participantCountLabel": "\nParticipantes",
  "public.assistant.workspace.linkedRecordCountLabel": "\nRegistros vinculados",
  "public.assistant.workspace.sameThreadLabel": "\nModelo de hilo",
  "public.assistant.workspace.sameThreadValue": "\nHilo único persistente",
  "public.assistant.workspace.completenessLabel": "\nIntegridad",
  "public.assistant.workspace.completenessReady": "\nListo para transferencia comercial",
  "public.assistant.workspace.completenessNeedsWork":
    "\nCapture más alcance antes de la transferencia",
  "public.assistant.workspace.historyTitle": "\nHistorial de sesiones",
  "public.assistant.workspace.historyStartedTitle": "\nConversación iniciada",
  "public.assistant.workspace.historyStartedEmpty": "\nEsperando el primer mensaje capturado.",
  "public.assistant.workspace.historyStartedDescription":
    "\nEl primer mensaje con alcance se capturó en {timestamp}.",
  "public.assistant.workspace.historyLatestTitle": "\nÚltima actualización",
  "public.assistant.workspace.historyLatestEmpty": "\nAún no se ha registrado ningún seguimiento.",
  "public.assistant.workspace.historyLatestDescription":
    "\n{author} publicó la última actualización en {timestamp}.",
  "public.assistant.workspace.historyTranscriptTitle": "\nCobertura de transcripción",
  "public.assistant.workspace.historyTranscriptDescription":
    "{count} entradas de transcripciones están disponibles para exportación y revisión.",
  "public.assistant.workspace.historyParticipantsTitle": "\nContinuidad del participante",
  "public.assistant.workspace.historyParticipantsDescription":
    "\n{participants} los perfiles de los participantes están adjuntos al mismo hilo persistente.",
  "public.assistant.workspace.historyShareTitle": "\nRegistro compartido",
  "public.assistant.workspace.historyShareEmpty":
    "\nAún no hay ningún registro de catálogo o RFQ relacionado vinculado.",
  "public.assistant.workspace.historyShareDescription":
    "\nVinculado a {record} para la próxima transferencia de flujo de trabajo.",
  "public.assistant.workspace.historyCloseoutTitle": "\nPreparación para el cierre",
  "public.assistant.workspace.historyCloseoutReady":
    "\nLa sesión tiene suficiente contexto para exportar, compartir y enrutar al siguiente flujo de trabajo.",
  "public.assistant.workspace.historyCloseoutPending":
    "\nCapture un poco más de alcance o vinculación antes de considerar esta sesión como lista para la transferencia.",
  "public.assistant.workspace.exportTranscript": "\nExportar transcripción",
  "public.assistant.transcript.documentTitle": "\nTranscripción del asistente",
  "public.assistant.transcript.eyebrow": "\nAsistente público",
  "public.assistant.transcript.description":
    "\nHistorial completo de mensajes de esta sesión. Use el navegador para imprimir o guardar como PDF.",
  "public.assistant.transcript.backToConversation": "\nVolver a la conversación",
  "public.assistant.transcript.fallbackTitle": "\nSesión {id}",
  "public.assistant.transcript.tableAria": "\nTranscripción de la conversación",
  "public.assistant.transcript.colTime": "\nHora",
  "public.assistant.transcript.colAuthor": "\nAutor",
  "public.assistant.transcript.colMessage": "\nMensaje",
  "public.assistant.transcript.emptyTitle": "\nAún no hay mensajes",
  "public.assistant.transcript.emptyDescription":
    "\nLos mensajes aparecerán aquí cuando el asistente registre respuestas en esta sesión.",
  "public.assistant.transcript.notFoundTitle": "\nSesión no disponible",
  "public.assistant.transcript.notFoundDescription":
    "\nNo se pudo cargar esta conversación. Puede haber caducado o el enlace ser incorrecto.",
  "public.assistant.workspace.shareSummary": "\nCompartir resumen",
  "public.assistant.workspace.shareHistoryHint":
    "\nComparta el resumen del hilo o exporte la transcripción antes de pasar la entrada a un flujo de trabajo posterior.",
  "public.assistant.workspace.shareSubject": "\nResumen del asistente público: {title}",
  "public.assistant.workspace.continuityTitle": "\nInstantánea de continuidad",
  "public.assistant.workspace.continuityDescription":
    "\nMantenga visibles el contexto de la sesión en vivo, los registros vinculados y la última respuesta antes de la transferencia.",
  "public.assistant.workspace.continuityContextLabel": "\nContexto de la página",
  "public.assistant.workspace.continuityParticipantsValue": "\n{count} participante(s)",
  "public.assistant.workspace.continuityContextFallback":
    "\nAún no se ha adjuntado ningún contexto de página a esta sesión de asistente público.",
  "public.assistant.workspace.continuityLinkedLabel": "\nRegistros vinculados",
  "public.assistant.workspace.continuityLinkedValue": "\n{count} registro(s) vinculado(s)",
  "public.assistant.workspace.continuityLatestLabel": "\nÚltima respuesta",
  "public.assistant.workspace.continuityLatestValue": "\n{author} respondió en {timestamp}.",
  "public.assistant.workspace.handoffTitle": "\nCómo funciona el traspaso",
  "public.assistant.workspace.handoffDescription":
    "\nUtilice esta sesión para capturar el alcance, aclarar los requisitos y escalar a operaciones cuando sea necesaria una revisión comercial.",
  "public.assistant.workspace.stepCaptureTitle": "\nAlcance de captura",
  "public.assistant.workspace.stepCaptureDescription":
    "\nMantenga el alcance, las fechas, las aprobaciones y las restricciones del comprador en la misma sesión persistente.",
  "public.assistant.workspace.stepClarifyTitle": "\nAclarar con AI",
  "public.assistant.workspace.stepClarifyDescription":
    "\nUtilice resúmenes y respuestas para ajustar la solicitud sin perder el contexto del hilo existente.",
  "public.assistant.workspace.stepEscalateTitle": "\nEscalar limpiamente",
  "public.assistant.workspace.stepEscalateDescription":
    "\nCree una nota de transferencia cuando la sesión esté lista para la revisión del operador interno.",
  "public.assistant.workspace.composeDescription":
    "\nAgregue notas de sesión duraderas para que el alcance, el tiempo de entrega y las aprobaciones permanezcan unidos al mismo hilo de admisión.",
  "public.assistant.workspace.composeHint":
    "\nCapture el contexto del comprador aquí antes de solicitar un traspaso del operador.",
  "public.assistant.workspace.aiActionsDescription":
    "\nUtilice resúmenes para estrechar el hilo y notas de transferencia para intensificar la participación del público en las operaciones.",
  "public.assistant.workspace.returnAction": "\nVolver a la página fuente",
  "public.assistant.workspace.missingTitle": "\nSesión de asistente público no disponible",
  "public.assistant.workspace.missingDescription":
    "No se pudo cargar la sesión del asistente solicitada. Regrese a la página de detalles del catálogo o RFQ para iniciar una nueva sesión.",
  "public.catalog.card.track": "\nPista de servicio",
  "public.catalog.card.viewScope": "\nVer alcance",
  "public.catalog.card.requestQuote": "\nSolicitar cotización",
  "public.catalog.card.deliverables": "entregables",
  "public.home.page.title":
    "\nUna plataforma para captura de demanda, control de entrega y visibilidad de socios.",
  "public.home.page.description":
    "\n{brandName} convierte solicitudes dispersas en pedidos rastreados.",
  "public.home.hero.badge": "\nSitio público, operaciones, portal, IA y UCP",
  "public.home.hero.title":
    "\nConvierta solicitudes, pedidos, trabajo de campo, adquisiciones y generación de informes en un flujo operativo conectado.",
  "public.home.hero.description":
    "\nEnviado el jueves, aprobado el viernes, rastreado hasta facturación.",
  "public.home.hero.primaryCta": "\nIniciar una RFQ",
  "public.home.hero.secondaryCta": "\nExplorar soluciones",
  "public.home.hero.stat.documents": "\nTipos de documento",
  "public.home.hero.stat.documentsValue": "6",
  "public.home.hero.stat.surfaces": "\nSuperficies",
  "public.home.hero.stat.surfacesValue": "4",
  "public.home.hero.stat.surfacesDesc": "Web, API, portal, UCP",
  "public.home.hero.stat.database": "\nEspacios de trabajo",
  "public.home.hero.stat.databaseValue": "3",
  "public.home.hero.stat.databaseDesc": "Ops, comercio, portal",
  "public.home.delivery.eyebrow": "\nModelo de entrega",
  "public.home.delivery.title": "\nCitado, con alcance, visible para el socio.",
  "public.home.delivery.step.submit": "\nEnviar RFQ",
  "public.home.delivery.step.qualify": "\nCalifica y cotiza",
  "public.home.delivery.step.convert": "\nConvertir a orden",
  "public.home.delivery.step.track": "\nSeguimiento de ejecución y facturación",
  "public.home.map.aria": "\nResumen de capacidad de la plataforma",
  "public.home.map.intake.title": "\nIngesta",
  "public.home.map.intake.value": "\nSitio público y UCP",
  "public.home.map.intake.description":
    "\nCapture solicitudes de compradores, socios y flujos de pago asistidos por máquinas.",
  "public.home.map.documents.title": "\nDocumentos",
  "public.home.map.documents.value": "\nSolicitudes de cotización a facturas",
  "public.home.map.documents.description":
    "\nMantenga precios, aprobaciones, cumplimiento, adquisiciones y facturación en un solo documento.",
  "public.home.map.operations.title": "\nOperaciones",
  "public.home.map.operations.value": "\nActivos, trabajo y telemetría",
  "public.home.map.operations.description":
    "\nDesplegar equipos, monitorear actividad, capturar finalización.",
  "public.home.map.intelligence.title": "\nInteligencia",
  "public.home.map.intelligence.value": "\nIA, automatización y ML",
  "public.home.map.intelligence.description":
    "\nResúmenes de IA, acciones programadas, predicciones de escasez.",
  "public.home.flow.eyebrow": "\nFlujo de negocio",
  "public.home.flow.title": "\nCómo se mueve el trabajo a través de la plataforma",
  "public.home.flow.description":
    "\n{brandName} mantiene la captura de la demanda, la entrega, la visibilidad de los socios y las acciones de seguimiento en el mismo registro en lugar de volver a ingresar el trabajo a través de herramientas desconectadas.",
  "public.home.flow.step.capture.label": "\nCaptura",
  "public.home.flow.step.capture.content":
    "\nLos clientes, socios o clientes de máquinas comienzan con el contexto de pago de catálogo, RFQ o UCP.",
  "public.home.flow.step.qualify.label": "\nCalificar",
  "public.home.flow.step.qualify.content": "\nBloquear alcance, cronograma y tarifas.",
  "public.home.flow.step.deliver.label": "\nEntregar",
  "public.home.flow.step.deliver.content": "\nOrden de trabajo emitida, portal actualizado.",
  "public.home.flow.step.improve.label": "\nMejorar",
  "public.home.flow.step.improve.content": "\nAlertas, pronósticos y puntuaciones de cumplimiento.",
  "public.home.flow.card.eyebrow": "\nComience externamente, termine con control",
  "public.home.flow.card.title":
    "\nComience con la necesidad empresarial, no con otra forma desconectada.",
  "public.home.flow.card.description":
    "\nLa entrada pública permanece conectada a los documentos posteriores, la evidencia de cumplimiento, las actualizaciones del portal y el estado de las facturas.",
  "public.home.flow.card.cta": "\nIniciar una RFQ",
  "public.home.surfaces.eyebrow": "\nSuperficies de plataforma",
  "public.home.surfaces.title": "\nUna plataforma, cuatro caminos conectados en",
  "public.home.surfaces.description":
    "\nDiferentes audiencias utilizan diferentes espacios de trabajo, pero todos dependen del mismo registro comercial subyacente.",
  "public.home.surfaces.public.eyebrow": "\nPúblico",
  "public.home.surfaces.public.title": "\nSitio público y comercio de máquinas",
  "public.home.surfaces.public.description":
    "\nUtilice páginas de catálogo, entrada de solicitudes de presupuesto y puntos finales de comerciantes UCP para iniciar la demanda de compradores o máquinas.",
  "public.home.surfaces.commerce.eyebrow": "\nComercial",
  "public.home.surfaces.commerce.title": "\nControl comercial",
  "public.home.surfaces.commerce.description":
    "\nMantenga conectadas las solicitudes de presupuesto, los pedidos de los clientes, las órdenes de compra, las órdenes de trabajo y las facturas en lugar de volver a ingresarlas en todas las herramientas.",
  "public.home.surfaces.operations.eyebrow": "\nOperaciones",
  "public.home.surfaces.operations.title": "\nEntrega operativa",
  "public.home.surfaces.operations.description":
    "\nEjecute activos, tareas, planificación, finanzas, utilización, flota, edificios, sensores y supervisión de gemelos digitales.",
  "public.home.surfaces.portal.eyebrow": "\nPortal",
  "public.home.surfaces.portal.title": "\nVisibilidad en el ámbito del socio",
  "public.home.surfaces.portal.description":
    "\nOfrezca a los clientes y socios visibilidad de estado compartida y chatee sin exponer todo el espacio de trabajo interno.",
  "public.home.persona.eyebrow": "\nElige tu punto de partida",
  "public.home.persona.title": "\nPrimero dirija a cada audiencia al espacio de trabajo adecuado",
  "public.home.persona.description":
    "\nLos compradores deben comenzar con la captura del alcance, los operadores deben aterrizar en el espacio de trabajo de comando y los socios deben ingresar al portal compartido sin buscar pantallas adicionales.",
  "public.home.persona.buyer.eyebrow": "\nComprador",
  "public.home.persona.buyer.title": "\nCapture un requisito y pase directamente a RFQ",
  "public.home.persona.buyer.description": "\nExplorar, comparar y solicitar cotización.",
  "public.home.persona.buyer.action": "Iniciar entrada de compradores",
  "public.home.persona.operations.eyebrow": "\nOperador",
  "public.home.persona.operations.title": "\nRegresar al espacio de trabajo de operaciones en vivo",
  "public.home.persona.operations.description": "\nDespachar, monitorear y confirmar finalización.",
  "public.home.persona.operations.action": "\nAbrir espacio de trabajo de operaciones",
  "public.home.persona.partner.eyebrow": "\nSocio",
  "public.home.persona.partner.title":
    "\nInicie sesión en el portal de socios con la cuenta correcta",
  "public.home.persona.partner.description": "\nRastrear entregas y descargar facturas.",
  "public.home.persona.partner.action": "\nAcceso de socio abierto",
  "public.home.catalog.eyebrow": "\nCatálogo",
  "public.home.catalog.title": "\nVías de servicio construidas sobre el mismo modelo operativo",
  "public.home.catalog.description":
    "\nEstas ofertas públicas muestran cómo la plataforma convierte las mociones de servicios comunes en una entrega controlada y una ejecución visible para los socios.",
  "public.home.catalog.seeAll": "\nVer todas las ofertas",
  "public.home.catalog.compareTitle": "\nCompare el ajuste operativo antes de abrir una cotización",
  "public.home.catalog.continuityTitle":
    "\nMantenga estable la lista corta mientras la admisión avanza",
  "public.home.catalog.fitLabel": "\nAjuste operativo",
  "public.home.intelligence.eyebrow": "\nCapa de inteligencia",
  "public.home.intelligence.title":
    "\nLa IA, los informes, la automatización y el aprendizaje automático permanecen unidos a los mismos registros",
  "public.home.intelligence.description":
    "\nEstas capacidades no son productos ni exportaciones separados. Utilizan los mismos pedidos, trabajo, telemetría y contexto de socios en los que ya operan los equipos.",
  "public.home.intelligence.supportTitle": "\nQué permanece unido al mismo registro",
  "public.home.intelligence.ai.eyebrow": "\n.bao",
  "public.home.intelligence.ai.title": "\n.bao fabric con contexto empresarial",
  "public.home.intelligence.ai.description":
    "\nResuma las solicitudes, explique el contexto, compare la actividad relacionada y ayude a los equipos a elegir el siguiente paso operativo.",
  "public.home.intelligence.reporting.eyebrow": "\nInformes y ciencia de datos",
  "public.home.intelligence.reporting.title":
    "\nInformes y ciencia de datos que permanecen cerca de la ejecución",
  "public.home.intelligence.reporting.description":
    "\nCree paquetes de informes, revisiones operativas, pronósticos y vistas de anomalías sin trasladar el trabajo a un segundo sistema.",
  "public.home.intelligence.automation.eyebrow": "\nAutomatización",
  "public.home.intelligence.automation.title": "\nAutomatización en el mismo plano de control",
  "public.home.intelligence.automation.description":
    "\nActive flujos de trabajo nativos de Bun, seguimiento programado y acciones respaldadas por ML desde el mismo plano de control.",
  "public.home.cta.title":
    "\n¿Listo para conectar la admisión, la entrega, los informes y la visibilidad de los socios?",
  "public.home.cta.description":
    "\nComience con una solicitud de cotización si ya conoce el requisito o explore el catálogo si desea ver primero las rutas del servicio.",
  "public.home.cta.primary": "\nIniciar una RFQ",
  "public.home.cta.secondary": "\nExplorar soluciones",
  "public.catalog.index.eyebrow": "\nCatálogo",
  "public.catalog.index.title": "\nOfertas operativas basadas en documentos",
  "public.catalog.index.description":
    "Elija la vía operativa que se ajuste al requisito de propiedad, proveedor o servicio y luego inicie la solicitud de cotización con el contexto adecuado.",
  "public.catalog.detail.eyebrow": "\nDetalle del catálogo",
  "public.catalog.detail.startRfq": "\nIniciar RFQ",
  "public.catalog.detail.backToCatalog": "\nVolver al catálogo",
  "public.catalog.detail.includedTitle": "\nQué incluye",
  "public.catalog.detail.whyTitle": "\nPor qué RFQ-first",
  "public.catalog.detail.tab.scope": "\nAlcance",
  "public.catalog.detail.tab.approval": "\nAprobación",
  "public.catalog.detail.tab.delivery": "\nEntrega",
  "public.catalog.detail.summaryTitle": "\nResumen de decisión",
  "public.catalog.detail.summaryScopeValue": "\nAlcance listo",
  "public.catalog.detail.summaryApprovalValue": "\nRevisión comercial alineada",
  "public.catalog.detail.summaryDeliveryValue": "\nTraspaso preparado",
  "public.catalog.detail.shortlistLabel": "\nComparar postura",
  "public.catalog.detail.shortlistSelectedValue": "\nYa en la lista corta",
  "public.catalog.detail.shortlistAvailableValue": "\nDisponible para comparar y agrupar",
  "public.catalog.detail.continuityLabel": "\nContinuidad",
  "public.catalog.detail.continuityBundled": "\nAgrupe este servicio en el RFQ",
  "public.catalog.detail.continuitySingle": " compartido\nLlevar este servicio en un solo RFQ",
  "public.catalog.detail.shareHistoryTitle": "\nCompartir y trasladar",
  "public.catalog.detail.shareHistoryDescription":
    "\nMantenga visible el mismo contexto de servicio mientras exporta el resumen, comparte el paquete y pasa a la RFQ o al flujo de trabajo asistente.",
  "public.catalog.detail.shareHistoryShortlistTitle": "\nPostura de lista corta",
  "public.catalog.detail.shareHistoryShortlistReady":
    "\nEste servicio ya está en la lista corta y se puede incluir en la solicitud de presupuesto compartida.",
  "public.catalog.detail.shareHistoryShortlistSingle":
    "\nEste servicio puede comenzar como una solicitud de cotización de servicio único y expandirse más adelante sin perder contexto.",
  "public.catalog.detail.shareHistoryBriefTitle": "\nBreve exportación",
  "public.catalog.detail.shareHistoryBriefDescription":
    "\nExporte el resumen cuando los revisores internos necesiten el resumen del servicio antes de que comience la RFQ.",
  "public.catalog.detail.shareHistoryAssistantTitle": "\nTraspaso del asistente",
  "public.catalog.detail.shareHistoryAssistantDescription":
    "\nUtilice el lanzamiento del asistente y la ruta del paquete {href} para mantener el mismo contexto de servicio adjunto a la siguiente entrada.",
  "public.catalog.detail.checklistScope": "\nConfirmar el alcance operativo",
  "public.catalog.detail.checklistApproval": "\nAlinear precios y postura de aprobación",
  "public.catalog.detail.checklistHandoff": "\nLlevar el contexto a la RFQ o revisión asistente",
  "public.catalog.detail.exportBrief": "\nResumen de exportación",
  "public.catalog.detail.sharePack": "\nCompartir paquete",
  "public.catalog.detail.whyDescription":
    "\nLa RFQ captura el alcance, los contactos de los clientes, las fechas solicitadas y el contexto comercial desde el principio, lo que mantiene las órdenes de trabajo y las facturas posteriores ancladas en el mismo rastro de documentos.",
  "public.catalog.compare.title": "\nSelecciona y compara",
  "public.catalog.compare.description":
    "\nMantenga visible una pequeña lista de trabajo mientras compara las rutas de servicio y luego transfiera el alcance seleccionado a una RFQ incluida.",
  "public.catalog.compare.shortlistLabel": "\nLista corta de trabajo",
  "public.catalog.compare.shortlistValue": "\n{count} servicios visibles",
  "public.catalog.compare.bundleLabel": "\nTransferencia de RFQ",
  "public.catalog.compare.bundleValue": "\nLlevar el alcance seleccionado en una sola solicitud",
  "public.catalog.compare.compareLabel": "\nModo de comparación",
  "public.catalog.compare.compareValue":
    "\nTítulo de la reseña, resumen y aspectos destacados uno al lado del otro",
  "public.catalog.compare.continuityLabel": "\nPostura de continuidad",
  "public.catalog.compare.continuityReady": "\nLista corta lista para RFQ",
  "public.catalog.compare.continuityWaiting": "Agregue servicios a la lista corta primero",
  "public.catalog.compare.continuityPanelTitle": "\nContinuidad de la lista corta",
  "public.catalog.compare.continuityPanelDescription":
    "\nLa lista corta sigue el mismo flujo de trabajo público, por lo que el trabajo de comparación puede continuar durante la revisión, el inicio de sesión y la transferencia de RFQ.",
  "public.catalog.compare.continuityPersistTitle": "\nPersistir lista corta",
  "public.catalog.compare.continuityPersistReady":
    "\nLa lista corta actual ya está activa y lista para comparar o transferir RFQ.",
  "public.catalog.compare.continuityPersistWaiting":
    "\nAgregue el primer servicio para iniciar la lista corta persistente para este flujo de trabajo.",
  "public.catalog.compare.continuityMergeTitle": "\nFusionar al iniciar sesión",
  "public.catalog.compare.continuityMergeDescription":
    "\nLas opciones de lista corta anónimas se fusionan en la lista corta registrada cuando el mismo usuario continúa con la admisión.",
  "public.catalog.compare.continuityBundleTitle": "\nPaquete aguas abajo",
  "public.catalog.compare.continuityBundleDescription":
    "\nLleve los servicios preseleccionados a una solicitud de cotización en lugar de recrear la decisión de comparación más adelante.",
  "public.catalog.compare.progressTitle": "\nComparar flujo de trabajo",
  "public.catalog.compare.progressDescription":
    "\nElija la lista corta, compare las opciones visibles y luego agrupe el alcance seleccionado en la RFQ.",
  "public.catalog.compare.workspaceHint":
    "\nRevise cada servicio en la misma pantalla antes de continuar.",
  "public.catalog.compare.stepShortlist": "\nLista corta",
  "public.catalog.compare.stepCompare": "\nComparar",
  "public.catalog.compare.stepBundle": "\nPaquete RFQ",
  "public.catalog.compare.priceLabel": "\nPrecio indicativo",
  "public.catalog.compare.bundleAction": "\nPaquete de alcance preseleccionado",
  "public.catalog.compare.empty":
    "\nHaga una lista corta de servicios aquí para mantener la bandeja de comparación persistente.",
  "public.catalog.shortlist.add": "\nAñadir a la lista corta",
  "public.catalog.shortlist.remove": "\nEliminar de la lista corta",
  "public.rfq.eyebrow": "\nSolicitud de cotización",
  "public.rfq.title": "\nCapture el trabajo antes de que comience.",
  "public.rfq.description":
    "\nPresentar la necesidad operativa una vez. Lo utilizamos para calificar el alcance, valorar el trabajo y mantener la trazabilidad de la entrega de los socios hasta el cumplimiento.",
  "public.rfq.bundle.label": "\nServicios combinados",
  "public.rfq.bundle.loaded": "\nAlcance incluido cargado para {services}.",
  "public.rfq.bundle.returnToCatalog": "\nVolver al alcance del catálogo incluido",
  "public.rfq.bundle.summarySingle": "\nSolicite una cotización para {title}.",
  "public.rfq.bundle.summaryMultiple":
    "\nSolicite una cotización para el alcance incluido: {titles}.",
  "public.rfq.bundle.titleSingle": "\nSolicitud de cotización para {title}",
  "public.rfq.bundle.titleMultiple": "\nRFQ para {primary} + {count} más",
  "public.rfq.form.aria": "\nFormulario de solicitud de cotización",
  "public.rfq.form.title": "\nTítulo de la solicitud",
  "public.rfq.form.summary": "\nResumen operativo",
  "public.rfq.form.contactEmail": "\nCorreo electrónico de contacto",
  "public.rfq.form.requestedBy": "\nSolicitado por",
  "public.rfq.form.budget": "\nOrientación presupuestaria",
  "public.rfq.form.requirements": "\nRequisitos o líneas de pedido",
  "public.rfq.form.requirementsPlaceholder": "\nUn requisito por línea",
  "public.rfq.submit": "\nEnviar RFQ",
  "public.rfq.reviewCatalog": "\nRevisar catálogo",
  "public.rfq.workspace.title": "\nEspacio de trabajo de solicitud de cotización",
  "public.rfq.workspace.description":
    "\nCapture el resumen operativo, los detalles de los requisitos y el calendario comercial en un espacio de trabajo preparado antes de que la solicitud se convierta posteriormente.",
  "public.rfq.workspace.fact.scopeLabel": "\nPostura del alcance",
  "public.rfq.workspace.fact.scopeValue": "\nInforme del comprador en curso",
  "public.rfq.workspace.fact.responseLabel": "\nModelo de respuesta",
  "public.rfq.workspace.fact.responseValue": "Calificación, cotización y seguimiento del portal",
  "public.rfq.workspace.draftTitle": "\nBorrador del espacio de trabajo",
  "public.rfq.workspace.draftDescription":
    "\nEsta solicitud de cotización permanece en borrador hasta que la envíe. Utilice el asistente y la revisión del catálogo para perfeccionar el resumen primero.",
  "public.rfq.workspace.draftStatusLabel": "\nEstado del borrador",
  "public.rfq.workspace.draftStatusValue": "\nBorrador de trabajo",
  "public.rfq.workspace.resumeLabel": "\nReanudar ruta",
  "public.rfq.workspace.resumeValue": "\nMantenga abierto el mismo contexto de solicitud aquí",
  "public.rfq.workspace.draftHint":
    "\nGuarde el borrador aquí y luego regrese al mismo contexto de solicitud sin reconstruir la entrada.",
  "public.rfq.workspace.draftEmptyTitle": "Ningún campo completado",
  "public.rfq.workspace.draftEmptyFields": "0 de 6 campos completados",
  "public.rfq.workflow.progressLabel": "\nFinalización del borrador",
  "public.rfq.workflow.progressValue": "\n{percent}% completo",
  "public.rfq.workflow.reviewStageLabel": "\nEtapa de revisión",
  "public.rfq.workflow.lastUpdatedLabel": "\nÚltima actualización",
  "public.rfq.workflow.collaboratorHeading": "\nEstado colaborador",
  "public.rfq.workflow.collaboratorPending": "\nEsperando contacto del colaborador",
  "public.rfq.workflow.collaboratorValue": "\nRevisor: {email}",
  "public.rfq.workflow.supportTitle": "\nPostura de revisión y colaboración",
  "public.rfq.workflow.supportDescription":
    "\nMantenga visibles la etapa de revisión actual, el estado del colaborador y el último borrador de actualización antes de enviar la solicitud.",
  "public.rfq.workflow.stage.capture": "\nAlcance de captura",
  "public.rfq.workflow.stage.review": "\nRevisar borrador",
  "public.rfq.workflow.stage.ready": "\nListo para enviar",
  "public.rfq.workflow.historyTitle": "\nProyecto de actividad",
  "public.rfq.workflow.historyDescription":
    "\n{count} las actualizaciones rastreadas mantienen la solicitud en un historial de flujo de trabajo compartido.",
  "public.rfq.workflow.activity.placeholderTitle": "\nBorrador iniciado",
  "public.rfq.workflow.activity.placeholderDescription":
    "\nMantenga el informe del comprador moviéndose aquí antes de que se convierta en una RFQ enviada.",
  "public.rfq.workflow.activity.createdTitle": "\nBorrador creado",
  "public.rfq.workflow.activity.createdDescription":
    "\n{actor} abrió {requestNumber} como borrador rastreado.",
  "public.rfq.workflow.activity.updatedTitle": "\nBorrador actualizado",
  "public.rfq.workflow.activity.updatedDescription":
    "\n{actor} movió el escrito a {progress} y {reviewStage}.",
  "public.rfq.workflow.systemActor": "\nFlujo de trabajo del sistema",
  "public.rfq.draft.save": "\nGuardar borrador",
  "public.rfq.draft.saved": "\nBorrador guardado {requestNumber}.",
  "public.rfq.draft.loaded": "\nBorrador reanudado {requestNumber}.",
  "public.rfq.draft.resumeReady": "\nReanudar el resumen del comprador guardado aquí",
  "public.rfq.draft.fallbackTitle": "\nBorrador de solicitud de cotización pública",
  "public.rfq.draft.error.empty": "\nAgregue al menos un campo antes de guardar un borrador.",
  "public.rfq.workspace.checklist.summaryTitle": "\nResumir la necesidad operativa",
  "public.rfq.workspace.checklist.summaryDescription":
    "\nDescriba el objetivo comercial, los sitios afectados y la urgencia para que la clasificación comience con el contexto empresarial adecuado.",
  "public.rfq.workspace.checklist.requirementsTitle": "\nAgregar requisitos y detalles de partidas",
  "public.rfq.workspace.checklist.requirementsDescription":
    "\nEnumere las restricciones, las cantidades y los archivos adjuntos antes de fijar el precio de la solicitud o convertirla en trabajo.",
  "public.rfq.workspace.checklist.handoffTitle": "\nPreparar el traspaso aguas abajo",
  "public.rfq.workspace.checklist.handoffDescription":
    "\nMantenga el contacto, las fechas y la orientación presupuestaria en el mismo registro para que el siguiente equipo no reinicie la admisión.",
  "public.rfq.next.title":
    "\n¿Qué pasa después? ZZ0__\nRevisión de calificación y adecuación del sitio",
  "public.rfq.next.step.qualify": "\nConversión de cotizaciones, pedidos y órdenes de trabajo",
  "public.rfq.next.step.convert": "\nActualizaciones del portal de socios hasta su finalización",
  "public.rfq.next.step.portal": "\nBorrador",
  "public.rfq.workspace.stepDraft": "\nRevisión",
  "public.rfq.workspace.stepReview": "\nEnviar",
  "public.rfq.workspace.stepSubmit": "\nTransferencia de portal",
  "public.rfq.workspace.stepPortal": "\nLa RFQ __PH0__ se envió correctamente.",
  "public.rfq.thanks.alert": "",
  "public.rfq.thanks.title": "Su solicitud está en clasificación.",
  "public.rfq.thanks.description":
    "\nConserve el número de referencia para su seguimiento. Si su equipo recibe una invitación al portal, la misma solicitud aparecerá en el historial del documento compartido.",
  "public.rfq.thanks.returnCatalog": "\nVolver al catálogo",
  "public.rfq.thanks.submitAnother": "\nEnviar otra RFQ",
  "public.rfq.thanks.pending": "\nPendiente",
  "public.rfq.thanks.nextTitle": "\nContinuar la solicitud sin perder contexto",
  "public.rfq.thanks.nextDescription":
    "\nInvite a colaboradores, mantenga los archivos de soporte en movimiento y envíe el mismo número de solicitud a la siguiente conversación en lugar de iniciar una segunda entrada.",
  "public.rfq.thanks.collaborate": "\nInvitar colaboradores",
  "public.rfq.thanks.collaborationSubject": "\nRevisar solicitud de presupuesto {requestNumber}",
  "public.rfq.thanks.collaborationBody":
    "\nLa RFQ {requestNumber} está lista para su revisión. Continúe con la misma solicitud en lugar de iniciar una nueva admisión.",
  "public.catalog.assetReliability.title": "\nProgramas de confiabilidad de activos",
  "public.catalog.assetReliability.summary":
    "\nMantenimiento planificado, clasificación de criticidad y ejecución del ciclo de vida para sitios distribuidos.",
  "public.catalog.assetReliability.detail":
    "\nCombine la planificación de confiabilidad, la ejecución de órdenes de trabajo y los informes en un único ritmo operativo para fincas y equipos de campo.",
  "public.catalog.assetReliability.highlight1":
    "\nAuditorías de confiabilidad y configuración del trabajo pendiente",
  "public.catalog.assetReliability.highlight2":
    "\nPlanificación de órdenes de trabajo sitio por sitio",
  "public.catalog.assetReliability.highlight3":
    "\nEvidencia de finalización e informes de recuperación",
  "public.catalog.procureToPay.title": "\nOperaciones de adquisición a pago",
  "public.catalog.procureToPay.summary":
    "\nFlujos de trabajo de RFQ, órdenes de compra, recibos y facturación con visibilidad de socios.",
  "public.catalog.procureToPay.detail":
    "\nMueva las adquisiciones de eventos aislados a un control de documentos consciente del proveedor con historial de aprobación, recepción y facturación.",
  "public.catalog.procureToPay.highlight1": "\nIncorporación de proveedores y coordinación de RFQ",
  "public.catalog.procureToPay.highlight2": "\nSeguimiento del ciclo de vida de la orden de compra",
  "public.catalog.procureToPay.highlight3":
    "\nVisibilidad de recepción, facturación y plazos de entrega",
  "public.catalog.fieldServices.title": "\nServicios de campo basados en documentos",
  "public.catalog.fieldServices.summary":
    "\nPedidos de clientes, órdenes de trabajo, facturas y actualizaciones del portal desde un gráfico operativo compartido.",
  "public.catalog.fieldServices.detail":
    "\nConvierta los requisitos entrantes en trabajo controlado, progreso visible para los socios y resultados listos para facturar sin agregar complejidad al proceso de pago.",
  "public.catalog.fieldServices.highlight1": "\nConversión de RFQ a pedido",
  "public.catalog.fieldServices.highlight2": "\nEjecución respaldada por TaskCard",
  "public.catalog.fieldServices.highlight3": "\nSeguimiento del estado de pago y factura",
  "auth.signIn.title": "\nIniciar sesión",
  "auth.signIn.subtitle": "\nAcceda a la plataforma operativa",
  "auth.signIn.pageTitle": "\nIniciar sesión — Plataforma operativa",
  "auth.signIn.moreDetailsSummary": "\nDetalles de la sesión y otras opciones de inicio de sesión",
  "auth.signIn.ssoContinueLoading": "\nContinuando…",
  "auth.signIn.heading": "\nBienvenido de nuevo",
  "auth.signIn.subheading": "\nInicia sesión para acceder a la plataforma",
  "auth.signIn.email": "\nDirección de correo electrónico",
  "auth.signIn.emailLabel": "\nDirección de correo electrónico",
  "auth.signIn.emailPlaceholder": "\njane@company.com",
  "auth.signIn.password": "\nContraseña",
  "auth.signIn.passwordLabel": "\nContraseña",
  "auth.signIn.passwordPlaceholder": "\n••••••••",
  "auth.signIn.helper": "\nUtilice sus credenciales registradas",
  "auth.signIn.loading": "\nIniciando sesión...",
  "auth.signIn.submit": "\nIniciar sesión en el espacio de trabajo",
  "auth.signIn.forgotPassword": "\n¿Olvidaste tu contraseña?",
  "auth.signIn.unauthorized": "\nPor favor inicia sesión para continuar.",
  "auth.required": "\nSe requiere autenticación.",
  "auth.signOut": "\nCerrar sesión",
  "dashboard.title": "\nPanel de operaciones",
  "dashboard.subtitle": "\nResumen de inteligencia y desempeño en vivo",
  "dashboard.welcome": "\nBienvenido de nuevo, {name}",
  "dashboard.kpi.assetHealth": "\nEstado de los activos",
  "dashboard.kpi.openTasks": "\nAbrir tareas",
  "dashboard.kpi.predictionAlerts": "\nAlertas de predicción",
  "dashboard.kpi.utilisation": "\nUtilización",
  "dashboard.kpi.spend": "\nGasto en comercio",
  "dashboard.kpi.depreciation": "\nExposición a la depreciación",
  "dashboard.kpi.placeholderValue": "\nCargando",
  "dashboard.kpi.predictionsDueDescription": "\nVida restante <= {days} días",
  "dashboard.kpi.totalAssetsDescription": "\nEn todos los sitios",
  "dashboard.kpi.activeTasksDescription": "\nTrabajo pendiente, programado y en progreso",
  "dashboard.kpi.utilisationDescription": "\nDerivado del promedio de horas de utilización",
  "dashboard.kpi.noOverdueTasks": "\nNo hay tareas atrasadas",
  "dashboard.kpi.deadlinePassed": "\nLa fecha límite ha pasado",
  "dashboard.kpi.depreciationDescription": "\nValor contable actual total",
  "dashboard.refresh": "\nActualización automática cada {seconds} segundos",
  "dashboard.quickActions": "\nAcciones rápidas",
  "dashboard.quickActions.subtitle": "\nNavegar a áreas clave de la plataforma",
  "dashboard.greeting.morning": "\nBuenos días, {name}",
  "dashboard.greeting.afternoon": "\nBuenas tardes, {name}",
  "dashboard.greeting.evening": "\nBuenas noches, {name}",
  "dashboard.kpi.sectionTitle": "\nMétricas de rendimiento",
  "dashboard.kpi.sectionSubtitle": "\nResumen de inteligencia y desempeño en vivo",
  "dashboard.kpi.trendVsPreviousMonth": "\nfrente al mes anterior",
  "dashboard.kpi.trendPendingComparison": "\nLos datos comparativos aún no están disponibles.",
  "dashboard.dateLabel": "\nHoy",
  "dashboard.chat.pageContext":
    "\nPanel de operaciones. Métricas clave: {kpis}. Rol de usuario: {role}.",
  "dashboard.quickAction.assets": "\nExplorar el registro de activos",
  "dashboard.quickAction.addDevice": "\nRegistrar nuevo dispositivo",
  "dashboard.quickAction.deviceHistory": "\nVer historial de mantenimiento",
  "dashboard.quickAction.digitalTwin": "\nExplora el gemelo digital 3D",
  "dashboard.quickAction.tasks": "\nAdministrar tablero de tareas",
  "dashboard.quickAction.kanban": "\nVer tablero Kanban",
  "dashboard.quickAction.predictions": "\nPredicciones y alertas de IA",
  "dashboard.quickAction.utilisation": "\nCabina de utilización",
  "dashboard.quickAction.fleet": "\nPostura del vehículo y carga de mantenimiento",
  "dashboard.quickAction.buildings": "\nCobertura de instalaciones y preparación gemela",
  "dashboard.quickAction.sensors": "\nCobertura de telemetría y estado del dispositivo",
  "dashboard.quickAction.reports": "\nGenerar informes",
  "dashboard.quickAction.finance": "\nDepreciación y valoración",
  "dashboard.quickAction.financePlanning": "\nPresupuestos, escenarios y postura de capital",
  "dashboard.quickAction.admin": "\nAdministración del sistema",
  "dashboard.quickAction.apiExplorer": "\nReferencia API",
  "dashboard.quickAction.profile": "\nTu perfil",
  "dashboard.quickAction.customisation": "\nTema y preferencias",
  "assets.title": "\nRegistro de Bienes",
  "assets.subtitle": "\nBuscar, inspeccionar y clasificar activos de infraestructura",
  "assets.searchLabel": "\nBuscar activos",
  "assets.searchPlaceholder": "\nEscriba el nombre del activo, RFID o sitio",
  "assets.filterLabel": "\nTipo de activo",
  "assets.filterAll": "\nTodos los tipos",
  "assets.savedView.label": "\nVista guardada",
  "assets.savedView.all": "\nTodos los activos",
  "assets.savedView.critical": "\nCondición crítica",
  "assets.savedView.fatiguing": "\nCiclo de vida fatigante",
  "assets.savedView.watch": "\nLista de seguimiento",
  "assets.columnSet.label": "\nConjunto de columnas",
  "assets.columnSet.description":
    "\nCambie las columnas del espacio de trabajo de activos a la perspectiva operativa, de cartera o de gobernanza.",
  "assets.columnSet.footer":
    "\nUtilice el conjunto de columnas que coincida con el contexto de revisión actual antes de exportar o compartir el espacio de trabajo.",
  "assets.columnSet.operations": "\nOperativa",
  "assets.columnSet.portfolio": "\nCartera",
  "assets.columnSet.governance": "\nGobernanza",
  "assets.compare.add": "\nAñadir para comparar",
  "assets.compare.remove": "\nQuitar de comparar",
  "assets.compare.title": "\nComparar bandeja",
  "assets.compare.description":
    "\nMantenga hasta {count} activos uno al lado del otro mientras revisa la condición, la jerarquía y el contexto del sitio.",
  "assets.compare.emptyDescription":
    "Seleccione activos de la tabla para mantener visible una bandeja de comparación en vivo aquí.",
  "assets.compare.savedViewDescription":
    "\nMantenga visible el contexto de la vista guardada mientras se mueve entre las perspectivas de comparación y de conjunto de columnas.",
  "assets.compare.footer":
    "\nLas selecciones de comparación permanecen adjuntas a la URL del espacio de trabajo actual para una ruta de revisión compartida.",
  "assets.filterApply": "\nAplicar filtros",
  "assets.kpi.total": "\nActivos totales",
  "assets.kpi.critical": "\nCondición crítica",
  "assets.kpi.fatiguing": "\nCiclo de vida fatigante",
  "assets.summary.title": "\nCartera de activos",
  "assets.summary.description": "\nLínea base de inventario operativo",
  "assets.table.name": "\nActivo",
  "assets.table.type": "\nTipo",
  "assets.table.site": "\nSitio",
  "assets.table.condition": "\nCondición",
  "assets.table.hierarchy": "\nJerarquía",
  "assets.table.lifecycle": "\nCiclo de vida",
  "assets.table.bookValue": "\nValor contable",
  "assets.table.lastInspection": "\nÚltima inspección",
  "assets.table.action": "\nAcción",
  "assets.table.open": "\nAbierto",
  "assets.export.csv": "\nExportar CSV",
  "assets.export.pdf": "\nExportar PDF",
  "assets.export.id": "Identificador",
  "assets.export.purchaseDate": "\nFecha de compra",
  "assets.export.purchasePrice": "\nPrecio de compra",
  "assets.export.rfidTag": "\nEtiqueta RFID",
  "assets.export.hierarchy": "\nNivel de jerarquía",
  "assets.export.parentAsset": "\nActivo principal",
  "assets.export.capability": "\nEnlace de capacidad",
  "assets.export.utilisationHours": "\nHoras de utilización",
  "assets.export.unsupportedFormat": "\nFormato no compatible. Usar formato=csv",
  "assets.inspector.aiPrompt":
    "\nRevise el activo {name} en {site}. Resuma el riesgo actual, la preparación y la siguiente mejor acción del contexto del inspector seleccionado.",
  "assets.workspace.summaryTitle": "Registro de activos",
  "assets.workspace.summarySupporting": "Todos los tipos, todos los sitios",
  "assets.workspace.filterBarEyebrow": "Filtros",
  "assets.workspace.filterBarTitle": "Buscar y acotar activos",
  "assets.workspace.filterBarDescription":
    "\nLa búsqueda actualiza el registro tras una breve pausa al escribir. Los desplegables se aplican al instante; use Aplicar filtros para actualizar tras ediciones manuales.",
  "assets.inspector.emptyEyebrow": "Inspector de activos",
  "assets.inspector.emptyTitle": "Ningún activo seleccionado",
  "assets.inspector.conditionLabel": "Condición",
  "assets.inspector.openTasksLabel": "Tareas abiertas",
  "assets.inspector.predictionsLabel": "Predicciones",
  "assets.inspector.emptyDescription":
    "\nElija una fila del registro de activos para inspeccionar el riesgo, la preparación y las acciones recomendadas.",
  "assets.media.title": "\nFotos",
  "assets.media.empty": "\nAún no hay fotos",
  "assets.media.upload": "\nSubir foto",
  "assets.media.viewImage": "\nVer imagen",
  "assets.media.annotate": "\nAnotar",
  "addDevice.title": "\nAgregar dispositivo",
  "addDevice.subtitle": "\nRegistre un nuevo dispositivo y asígnelo a su flota operativa",
  "addDevice.form.title": "\nRegistro del dispositivo",
  "addDevice.form.nameLabel": "\nNombre del dispositivo",
  "addDevice.form.serialLabel": "\nSeñal serie/RF",
  "addDevice.form.typeLabel": "\nCategoría de dispositivo",
  "addDevice.form.siteLabel": "\nSitio de implementación",
  "addDevice.form.sitePlaceholder": "\nSeleccione un sitio de implementación",
  "addDevice.form.siteHint":
    "\nElija entre {count} sitios activos en el registro operativo en vivo.",
  "addDevice.form.siteLabelWithId": "\nSitio de implementación/ID",
  "addDevice.form.lifecycleLabel": "\nEtapa del ciclo de vida",
  "addDevice.form.lifecycleActive": "\nActivo",
  "addDevice.form.lifecycleMonitor": "\nMonitoreo",
  "addDevice.form.lifecycleFatiguing": "\nFatigante",
  "addDevice.form.lifecycleDisposed": "\nEliminado",
  "addDevice.form.lifecycleDefault": "\nActivo",
  "addDevice.form.conditionLabel": "\nCondición",
  "addDevice.form.conditionAny": "\nCualquier",
  "addDevice.form.gpsLatLabel": "\nLatitud GPS",
  "addDevice.form.gpsLonLabel": "\nLongitud GPS",
  "addDevice.form.purchasePriceLabel": "\nPrecio de compra",
  "addDevice.form.bookValueLabel": "\nValor contable",
  "addDevice.form.requiredHint": "\nLos campos marcados con * son obligatorios",
  "addDevice.form.submit": "\nCrear dispositivo",
  "addDevice.validation.unauthorized": "\nNo autorizado para crear dispositivos",
  "addDevice.validation.nameRequired": "\nEl nombre del dispositivo es obligatorio",
  "addDevice.validation.typeRequired": "\nLa categoría del dispositivo es obligatoria",
  "addDevice.validation.siteRequired": "\nSe requiere sitio",
  "addDevice.validation.locationRequired": "\nSe requieren coordenadas GPS",
  "addDevice.validation.locationInvalidRange": "\nLas coordenadas GPS están fuera de los límites",
  "addDevice.validation.numericValuesRequired":
    "\nEl precio de compra y el valor contable deben ser numéricos",
  "addDevice.validation.siteNotFound": "\nEl sitio especificado no existe",
  "addDevice.validation.rfidUsed": "\nLa señal RF/etiqueta RFID ya está en uso",
  "addDevice.prerequisite.databaseUnavailableTitle":
    "\nLa configuración del dispositivo requiere datos del sitio en vivo",
  "addDevice.prerequisite.siteUnavailableTitle":
    "\nAgregue un sitio activo antes de registrar dispositivos",
  "addDevice.prerequisite.siteUnavailableDescription":
    "Cree una base o instalación en el espacio de trabajo del patrimonio y luego regrese aquí para registrar o importar dispositivos en el catálogo del sitio en vivo.",
  "addDevice.prerequisite.openEstate": "\nEspacio de trabajo abierto",
  "addDevice.feedback.created": "\nDispositivo {name} registrado correctamente",
  "addDevice.form.postCreateNote":
    "\nDespués del registro, adjunte telemetría, fotografías y actividad de mantenimiento del registro de activos.",
  "addDevice.massImport.title": "\nImportación masiva",
  "addDevice.massImport.subtitle": "\nElija un archivo CSV para importar registros de dispositivos",
  "addDevice.massImport.acceptedTypes": "\nSólo archivos CSV",
  "addDevice.massImport.maxFiles": "\nUn archivo a la vez",
  "addDevice.massImport.importing": "\nImportando…",
  "addDevice.massImport.success": "\nImportado {created} de {total} dispositivos",
  "addDevice.massImport.partial": "\nImportado {created} de {total}. {failed} falló.",
  "addDevice.massImport.error": "\nError de importación: {message}",
  "addDevice.massImport.emptyFile": "\nCSV no tiene filas de datos",
  "addDevice.massImport.fileLabel": "\nArchivo CSV",
  "addDevice.massImport.submit": "\nImportar dispositivos",
  "addDevice.massImport.downloadTemplate": "\nDescargar plantilla CSV",
  "addDevice.massImport.editorTitle": "\nRevisar y editar contenido de importación",
  "addDevice.massImport.editorDescription":
    "\nCargue un CSV, pegue filas de la hoja de cálculo o edite celdas individuales antes de importar.",
  "addDevice.massImport.contentLabel": "\nImportar contenido",
  "addDevice.massImport.contentPlaceholder":
    "\nPegue las filas CSV aquí. Se requiere una fila de encabezado para la importación directa.",
  "addDevice.massImport.notesLabel": "\nNotas sin procesar para el análisis de IA",
  "addDevice.massImport.notesPlaceholder":
    "\nPegue listas con viñetas, tablas copiadas, correos electrónicos o notas técnicas y deje que AI las convierta en filas listas para importar.",
  "addDevice.massImport.parseWithAi": "\nAnalizar con AI",
  "addDevice.massImport.aiParsing": "\nAnalizando contenido…",
  "addDevice.massImport.aiSuccess": "\nAI preparó {count} importar filas",
  "addDevice.massImport.aiError": "\nError en el análisis de IA: {message}",
  "addDevice.massImport.gridTitle": "\nEditor de celda",
  "addDevice.massImport.addRow": "\nAñadir fila",
  "addDevice.massImport.clearContent": "\nBorrar contenido",
  "addDevice.massImport.emptyGrid": "\nPegue o analice el contenido para comenzar a editar filas.",
  "addDevice.massImport.fileImported": "\nArchivo importado al editor",
  "addDevice.massImport.parseEmpty": "\nAgregue notas sin procesar antes de usar el análisis de IA",
  "addDevice.massImport.invalidContent":
    "\nNo se encontraron filas importables en el contenido del editor",
  "addDevice.massImport.templateSeed":
    "\nnombre, tipo, nombre del sitio, etiqueta rfid, gpsLat, gpsLon, precio de compra, valor del libro, condición, ciclo de vidaEtapa",
  "addDevice.massImport.columns.name": "\nNombre",
  "addDevice.massImport.columns.type": "\nTipo",
  "addDevice.massImport.columns.siteName": "\nSitio",
  "addDevice.massImport.columns.rfidTag": "\nRFID / Serie",
  "addDevice.massImport.columns.gpsLat": "\nLatitud",
  "addDevice.massImport.columns.gpsLon": "\nLongitud",
  "addDevice.massImport.columns.purchasePrice": "\nPrecio de compra",
  "addDevice.massImport.columns.bookValue": "\nValor contable",
  "addDevice.massImport.columns.condition": "\nCondición",
  "addDevice.massImport.columns.lifecycleStage": "\nCiclo de vida",
  "addDevice.massImport.formatTableTitle": "\nReferencia de formato de importación",
  "addDevice.massImport.formatTableColumnName": "\nColumna",
  "addDevice.massImport.formatTableColumnRequired": "\nRequerido",
  "addDevice.massImport.formatTableColumnExample": "\nEjemplo",
  "addDevice.massImport.columns.required.name": "\nSí",
  "addDevice.massImport.columns.required.type": "\nSí",
  "addDevice.massImport.columns.required.siteName": "\nSí",
  "addDevice.massImport.columns.required.rfidTag": "\nNo",
  "addDevice.massImport.columns.required.gpsLat": "\nSí",
  "addDevice.massImport.columns.required.gpsLon": "\nSí",
  "addDevice.massImport.columns.required.purchasePrice": "\nSí",
  "addDevice.massImport.columns.required.bookValue": "\nSí",
  "addDevice.massImport.columns.required.condition": "\nNo",
  "addDevice.massImport.columns.required.lifecycleStage": "\nNo",
  "addDevice.massImport.columns.example.name": "\nUnidad de sensor A1",
  "addDevice.massImport.columns.example.type": "RANGO_DE_ENTRENAMIENTO",
  "addDevice.massImport.columns.example.siteName": "\nSitio Alfa",
  "addDevice.massImport.columns.example.rfidTag": "RF-00123 (ejemplo)",
  "addDevice.massImport.columns.example.gpsLat": "51.5074 (ejemplo)",
  "addDevice.massImport.columns.example.gpsLon": "-0.1278 (ejemplo)",
  "addDevice.massImport.columns.example.purchasePrice": "1200.00 (ejemplo)",
  "addDevice.massImport.columns.example.bookValue": "950.00 (ejemplo)",
  "addDevice.massImport.columns.example.condition": "\nbueno",
  "addDevice.massImport.columns.example.lifecycleStage": "\nactivo",
  "addDevice.massImport.formatTableRequiredYes": "\nSí",
  "addDevice.massImport.formatTableRequiredNo": "\nNo",
  "addDevice.workflow.title": "\nRevisión del dispositivo por etapas",
  "addDevice.workflow.description":
    "\nRegistre el dispositivo, valide las filas de importación y revise el resultado antes de enviarlo.",
  "deviceHistory.title": "\nHistorial del dispositivo",
  "deviceHistory.subtitle":
    "\nAcciones recientes de mantenimiento y ciclo de vida en toda su flota",
  "deviceHistory.filterLabel": "\nFiltrar por dispositivo",
  "deviceHistory.filter.assigneeLabel": "\nCesionario",
  "deviceHistory.filter.assigneePlaceholder": "\nBuscar por asignado",
  "deviceHistory.filter.statusLabel": "\nEstado",
  "deviceHistory.filter.statusAll": "\nTodos los estados",
  "deviceHistory.table.device": "\nDispositivo",
  "deviceHistory.table.event": "\nEvento",
  "deviceHistory.table.timestamp": "\nMarca de tiempo",
  "deviceHistory.table.updatedAt": "\nActualizado a las",
  "deviceHistory.table.status": "\nEstado",
  "deviceHistory.table.assignee": "\nCesionario",
  "deviceHistory.table.priority": "\nPrioridad",
  "deviceHistory.table.ariaLabel": "\nEventos del historial del dispositivo",
  "deviceHistory.table.notes": "\nNotas",
  "deviceHistory.table.emptyTitle": "\nAún no hay historial del dispositivo",
  "deviceHistory.table.emptyDescription":
    "Ajuste los filtros o espere a que aparezca nueva actividad del ciclo de vida en este feed.",
  "deviceHistory.table.errorTitle": "\nHistorial del dispositivo no disponible",
  "deviceHistory.table.errorDescription":
    "\nNo se pudo cargar el historial del dispositivo. Vuelva a intentar la solicitud.",
  "deviceHistory.decisionTitle": "\nRevisión de diferencias y anomalías",
  "deviceHistory.decisionDescription":
    "\nCompare eventos recientes, esté atento a anomalías y exporte el paquete de evidencia.",
  "deviceHistory.eventTask": "\nEvento de tarea",
  "deviceHistory.empty": "\nNingún evento del historial del dispositivo coincide con tus filtros.",
  "profile.title": "\nPerfil",
  "profile.subtitle": "\nDetalles de la cuenta y contexto del rol",
  "profile.displayName": "\nNombre para mostrar",
  "profile.email": "\nCorreo electrónico",
  "profile.role": "\nFunción actual",
  "profile.lastSignIn": "\nÚltimo inicio de sesión",
  "profile.lastSignInUnavailable": "No disponible",
  "profile.workspaceHome": "\nEspacio de trabajo hogar",
  "profile.activeSessions": "\nSesiones activas",
  "profile.sessions.title": "\nSesiones activas",
  "profile.sessions.subtitle":
    "\nInicios de sesión recientes y contexto del dispositivo para su cuenta",
  "profile.sessions.empty": "\nNo se han registrado sesiones recientes",
  "profile.sessions.emptyDescription":
    "\nLos inicios de sesión activos y recientes aparecerán aquí después de autenticarse.",
  "profile.sessions.current": "\nSesión actual",
  "profile.sessions.unknownAddress": "\nRed desconocida",
  "profile.sessions.unknownDevice": "\nDispositivo desconocido",
  "profile.sessions.started": "\nIniciado",
  "profile.sessions.expires": "\nExpira",
  "profile.sessions.deviceInventory": "\nDispositivos vistos",
  "profile.sessions.networkCoverage": "\nRedes vistas",
  "profile.sessions.activityTitle": "\nActividad de seguridad reciente",
  "profile.sessions.activityDescription":
    "\nRevise los últimos cambios en la sesión, el dispositivo y la red antes de finalizar el acceso o rotar las credenciales.",
  "profile.sessions.activityCurrentTitle": "\nPostura de la sesión actual",
  "profile.sessions.activityCurrentDescription": "\nSesión actual establecida {value}.",
  "profile.sessions.activityCurrentEmpty":
    "\nNo hay ninguna sesión actual disponible para revisión.",
  "profile.sessions.activityDeviceTitle": "\nHuella del dispositivo",
  "profile.sessions.activityDeviceDescription":
    "\n{count} los perfiles del dispositivo son visibles en la auditoría de sesión reciente.",
  "profile.sessions.activityNetworkTitle": "\nHuella de red",
  "profile.sessions.activityNetworkDescription":
    "\n{count} los orígenes de la red son visibles en la auditoría de sesión reciente.",
  "profile.sessions.expiringSoon": "\nExpira pronto",
  "profile.sessions.activityExpiringDescription":
    "\n{count} las sesiones activas necesitan revisión antes de que se cierre la ventana de acceso actual.",
  "profile.sessions.expiresSoon": "\nExpira pronto",
  "profile.sessions.remoteContext": "\nContexto remoto",
  "profile.sessions.activityRemoteDescription":
    "\n{count} sesiones están activas fuera del contexto de red principal de confianza.",
  "profile.signOutLabel": "\nCerrar sesión",
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
  "digitalTwin.title": "\nGemelo digital",
  "digitalTwin.subtitle":
    "\nVisibilidad de puntos de acceso espacial y contexto de activos activos",
  "digitalTwin.scene.title": "\nEscena de operaciones espaciales",
  "digitalTwin.scene.description":
    "\nVista gemela impulsada por el servidor que muestra la cobertura del punto de acceso en vivo y las coordenadas vinculadas a los activos.",
  "digitalTwin.scene.streamTitle": "\nTransmisión en vivo",
  "digitalTwin.scene.streamDescription":
    "\nLas instantáneas SSE publican las coordenadas actuales del punto de acceso.",
  "digitalTwin.videoStreams.title": "\nTransmisiones en vivo",
  "digitalTwin.videoStreams.empty": "\nNo hay transmisiones en vivo configuradas",
  "digitalTwin.videoStreams.live": "\nEn vivo",
  "digitalTwin.videoStreams.noStream": "\nSin transmisión URL",
  "digitalTwin.videoStreams.openStream": "\nAbrir flujo",
  "digitalTwin.videoStreams.notFound": "\nTransmisión no encontrada",
  "iot.telemetry.ingest": "\nTelemetría de ingesta",
  "iot.devices.title": "\nDispositivos de IoT",
  "iot.apiKeyInvalid": "\nClave API no válida o faltante",
  "iot.assetNotFound": "\nActivo no encontrado",
  "iot.siteNotFound": "\nSitio no encontrado",
  "iot.devices.empty": "\nNo hay dispositivos IoT registrados",
  "iot.devices.register": "\nRegistrar dispositivo",
  "iot.devices.mqttTopic": "\nTema MQTT",
  "iot.devices.mqttPlaceholder": "\ntelemetría/sitio1/dispositivo1",
  "iot.devices.site": "\nSitio",
  "iot.devices.asset": "\nActivo",
  "iot.devices.assetPlaceholder": "\nID de activo",
  "iot.devices.lastSeen": "\nVisto por última vez",
  "iot.devices.validation.required": "El tema y el sitio MQTT son obligatorios.",
  "iot.devices.validation.topicInUse": "\nEl tema MQTT ya está en uso.",
  "iot.devices.feedback.deviceAdded": "\nRegistrar dispositivo: dispositivo agregado.",
  "iot.devices.table.ariaLabel": "\nDispositivos IoT registrados",
  "iot.apiKeyNotConfigured": "\nLa clave API de IoT no está configurada.",
  "iot.deviceNotFound": "\nDispositivo no encontrado",
  "edgeControl.validation.payloadJsonInvalid": "\nLa carga útil debe ser JSON.",
  "edgeControl.validation.commandRequired":
    " válido\nSeleccione un dispositivo e ingrese un nombre de comando.",
  "edgeControl.validation.deviceRequired": "\nSeleccione un dispositivo válido.",
  "edgeControl.validation.automationTitleRequired": "\nSe requiere título de automatización.",
  "edgeControl.validation.automationDeviceRequired":
    "\nSeleccione un dispositivo y un comando para poner en cola una ejecución de automatización.",
  "edgeControl.validation.automationKindRequired": "\nSeleccione un tipo de automatización válido.",
  "edgeControl.commands.title": "\nCola de comandos del dispositivo",
  "edgeControl.commands.description":
    "\nPonga en cola comandos seguros para hardware para dispositivos periféricos registrados y supervise el estado de entrega.",
  "edgeControl.commands.device": "\nDispositivo",
  "edgeControl.commands.devicePlaceholder": "\nSeleccione un dispositivo",
  "edgeControl.commands.command": "\nComando",
  "edgeControl.commands.commandPlaceholder": "\nreiniciar, calibrar, sincronizar-config",
  "edgeControl.commands.payload": "\nCarga útil JSON",
  "edgeControl.commands.payloadPlaceholder": '{"objetivo":"zone-a"}',
  "edgeControl.commands.submit": "\nComando de cola",
  "edgeControl.commands.empty": "\nAún no hay comandos de dispositivo en cola.",
  "edgeControl.commands.notFound": "\nComando de dispositivo no encontrado.",
  "edgeControl.commands.failed": "\nEl dispositivo informó falla de comando.",
  "edgeControl.commands.feedback.queued":
    "\nComando del dispositivo en cola para entrega perimetral.",
  "edgeControl.commands.table.device": "\nDispositivo",
  "edgeControl.commands.table.command": "\nComando",
  "edgeControl.commands.table.status": "\nEstado",
  "edgeControl.commands.table.automation": "\nAutomatización",
  "edgeControl.commands.table.updatedAt": "\nActualizado",
  "edgeControl.commands.status.QUEUED": "\nEn cola",
  "edgeControl.commands.status.DELIVERED": "\nEntregado",
  "edgeControl.commands.status.ACKNOWLEDGED": "\nReconocido",
  "edgeControl.commands.status.FAILED": "\nFallido",
  "edgeControl.commands.status.CANCELED": "\nCancelado",
  "edgeControl.automation.title": "\nEjecuciones de automatización",
  "edgeControl.automation.description":
    "\nCree registros de ejecución duraderos que pongan en cola el trabajo del dispositivo y mantengan el historial de ejecución dentro del centro de control.",
  "edgeControl.automation.runTitle": "\nEjecutar título",
  "edgeControl.automation.runTitlePlaceholder": "\nReinicio nocturno del enfriador",
  "edgeControl.automation.kindLabel": "\nTipo de automatización",
  "edgeControl.automation.device": "\nDispositivo",
  "edgeControl.automation.command": "\nComando",
  "edgeControl.automation.payload": "\nCarga útil JSON",
  "edgeControl.automation.notes": "\nNotas",
  "edgeControl.automation.notesPlaceholder": "\nNota del operador opcional",
  "edgeControl.automation.submit": "\nAutomatización de colas",
  "edgeControl.automation.empty": "\nAún no se han creado ejecuciones de automatización.",
  "edgeControl.automation.feedback.queued":
    "\nEjecución de automatización en cola con un comando de borde.",
  "edgeControl.automation.table.title": "\nEjecutar",
  "edgeControl.automation.table.kind": "\nAmable",
  "edgeControl.automation.table.status": "\nEstado",
  "edgeControl.automation.table.device": "\nDispositivo",
  "edgeControl.automation.table.updatedAt": "\nActualizado",
  "edgeControl.automation.kind.DEVICE_COMMAND": "\nComando del dispositivo",
  "edgeControl.automation.kind.EDGE_RUNBOOK": "\nLibro de ejecución de borde",
  "edgeControl.automation.status.QUEUED": "\nEn cola",
  "edgeControl.automation.status.RUNNING": "\nCorriendo",
  "edgeControl.automation.status.SUCCEEDED": "\nTuvo éxito",
  "edgeControl.automation.status.FAILED": "\nFallido",
  "edgeControl.automation.status.CANCELED": "\nCancelado",
  "deployment.validation.airgappedProviderRequired":
    "\nLa implementación con espacio aéreo solo permite proveedores de IA locales como RamaLama u Ollama.",
  "deployment.title": "\nPolítica de implementación",
  "deployment.description":
    "\nEl modo de implementación rige el acceso a la red saliente, la política del proveedor de IA y los límites de almacenamiento.",
  "deployment.policyTitle": "\nPolítica",
  "deployment.policy.airgapped":
    "\nLas llamadas de la red externa están bloqueadas y la IA está restringida a los proveedores locales atendidos dentro del límite de implementación.",
  "deployment.policy.cloud":
    "\nLas implementaciones en la nube permiten integraciones salientes y al mismo tiempo mantienen el comando perimetral y el estado de automatización en el plano de control compartido.",
  "deployment.policy.onPrem":
    "\nLas implementaciones locales permanecen autohospedadas y al mismo tiempo permiten integraciones externas configuradas explícitamente.",
  "deployment.edgeControlTitle": "\nControl de borde",
  "deployment.edgeControlDescription":
    "\nLas colas de comandos de dispositivos y las ejecuciones de automatización se mantienen duraderas en Prisma, por lo que escalar la aplicación no reduce el trabajo en vuelo.",
  "deployment.mode.CLOUD": "\nNube",
  "deployment.mode.ON_PREM": "\nLocal",
  "deployment.mode.AIRGAPPED": "Con espacio de aire",
  "deployment.capability.externalNetworkEnabled": "\nRed externa habilitada",
  "deployment.capability.externalNetworkDisabled": "\nRed externa bloqueada",
  "deployment.capability.externalEmailEnabled": "\nCorreo electrónico externo permitido",
  "deployment.capability.externalEmailDisabled": "\nCorreo electrónico externo bloqueado",
  "deployment.capability.localProtocolReferencesOnly": "\nSolo referencias de protocolo local",
  "deployment.capability.remoteProtocolReferencesAllowed":
    "\nSe permiten referencias de protocolo remoto",
  "deployment.capability.localAiOnly": "\nSolo IA local",
  "deployment.capability.hybridAiAllowed": "\nSe permite IA híbrida",
  "deployment.capability.localDeviceStorageOnly": "\nSolo almacenamiento local",
  "deployment.capability.objectStorageAllowed": "\nAlmacenamiento de objetos permitido",
  "assets.media.noFile": "\nNo se proporcionó ningún archivo",
  "assets.media.invalidFileType": "\nTipo de archivo no válido. Permitido: JPEG, PNG, GIF, WebP.",
  "assets.media.fileTooLarge": "\nArchivo demasiado grande. Máximo 10 MB.",
  "assets.media.notFound": "\nMedios no encontrados",
  "assets.media.fileNotFound": "\nArchivo no encontrado",
  "assets.media.assetNotFound": "\nActivo no encontrado",
  "assets.annotations.title": "\nAnotaciones de imagen",
  "assets.annotations.empty": "\nAún no hay anotaciones",
  "assets.annotations.open": "\nAbrir espacio de trabajo de anotaciones",
  "assets.annotations.segment": "\nEjecutar segmentación",
  "assets.annotations.segmentSuccess": "\nPropuestas de segmentación creadas",
  "assets.annotations.segmentUnavailable":
    "\nLa segmentación no está disponible con la configuración de IA actual. La anotación manual todavía está disponible.",
  "assets.annotations.segmentInvalid":
    "\nLa respuesta de segmentación no se pudo convertir en una geometría de anotación válida.",
  "assets.annotations.manualAdd": "\nAgregar anotación manual",
  "assets.annotations.edit": "\nEditar polígono",
  "assets.annotations.confirm": "\nConfirmar",
  "assets.annotations.reject": "\nRechazar",
  "assets.annotations.archive": "\nArchivo",
  "assets.annotations.save": "\nGuardar anotación",
  "assets.annotations.clearDraft": "\nBorrar borrador",
  "assets.annotations.label": "\nEtiqueta",
  "assets.annotations.status": "\nEstado",
  "assets.annotations.source": "\nFuente",
  "assets.annotations.confidence": "\nConfianza",
  "assets.annotations.mask": "\nMáscara",
  "assets.annotations.maskToggle": "\nMostrar máscara superpuesta",
  "assets.annotations.boxTool": "\nCaja de herramientas",
  "assets.annotations.polygonTool": "\nHerramienta polígono",
  "assets.annotations.regions": "\nRegiones",
  "assets.annotations.prompt": "\nMensaje de segmentación",
  "assets.annotations.promptPlaceholder":
    "\nResalte fugas, corrosión, grietas, controles u otras regiones importantes",
  "assets.annotations.defaultLabel": "\nRegión",
  "assets.annotations.status.proposed": "\nPropuesto",
  "assets.annotations.status.confirmed": "\nConfirmado",
  "assets.annotations.status.rejected": "\nRechazado",
  "assets.annotations.status.archived": "\nArchivado",
  "assets.annotations.source.ai": "IA",
  "assets.annotations.source.manual": "\nManual",
  "assets.annotations.validation.labelRequired": "\nSe requiere etiqueta",
  "assets.annotations.validation.polygonInvalid":
    "\nEl polígono debe contener al menos tres puntos normalizados",
  "assets.annotations.validation.mediaNotFound": "\nNo se encontraron medios de anotación",
  "assets.annotations.validation.annotationNotFound": "\nAnotación no encontrada",
  "assets.annotations.saved": "\nAnotación guardada",
  "assets.annotations.archived": "\nAnotación archivada",
  "storage.notConfigured":
    "\nAlmacenamiento no configurado. Establezca las variables de entorno OBJECT_STORAGE_*.",
  "storage.operationFailed": "\nError en la operación de almacenamiento",
  "assets.type.BUILDING": "\nEdificio",
  "assets.type.INFRASTRUCTURE": "\nInfraestructura",
  "assets.type.TRAINING_RANGE": "\nRango de entrenamiento",
  "assets.type.RANGE_SAFETY_SYSTEM": "\nSistema de seguridad de rango",
  "assets.type.TARGETRY_SYSTEM": "\nSistema de puntería",
  "assets.type.HVAC": "Climatización",
  "assets.type.ELECTRICAL": "\nEléctrico",
  "assets.type.PLUMBING": "\nPlomería",
  "assets.type.STRUCTURAL": "\nEstructural",
  "assets.type.MECHANICAL": "\nMecánico",
  "assets.type.FIRE_SAFETY": "\nSeguridad contra incendios",
  "assets.type.SECURITY": "\nSeguridad",
  "assets.type.IT_INFRASTRUCTURE": "\nInfraestructura de TI",
  "assets.type.VEHICLE": "\nVehículo",
  "assets.type.PLANT_HEAVY_MACHINERY": "\nPlanta y Maquinaria Pesada",
  "assets.type.KITCHEN_CATERING_EQUIPMENT": "\nEquipamiento de cocina y restauración",
  "assets.type.FORESTRY_ASSET": "\nActivo forestal",
  "assets.type.RURAL_ESTATE_ASSET": "\nActivo de finca rural",
  "assets.type.HERITAGE_ASSET": "\nBien patrimonial",
  "assets.type.ENVIRONMENTAL_ASSET": "\nActivo ambiental",
  "assets.type.GOVERNMENT_FURNISHED_EQUIPMENT": "\nEquipo proporcionado por el gobierno",
  "assets.type.EQUIPMENT": "\nEquipo",
  "assets.type.OTHER": "\nOtro",
  "assets.hierarchy.ESTATE": "\nPropiedad",
  "assets.hierarchy.FACILITY": "\nInstalación",
  "assets.hierarchy.SYSTEM": "\nSistema",
  "assets.hierarchy.SUBSYSTEM": "\nSubsistema",
  "assets.hierarchy.COMPONENT": "\nComponente",
  "assets.condition.OPERATIONAL": "\nOperacional",
  "assets.condition.DEGRADED": "\nDegradado",
  "assets.condition.CRITICAL": "\nCrítico",
  "assets.condition.FATIGUING": "\nFatigante",
  "assets.condition.DECOMMISSIONED": "\nFuera de servicio",
  "assets.condition.unknown": "\nDesconocido",
  "assets.lifecycle.ACTIVE": "\nActivo",
  "assets.lifecycle.MONITORING": "\nMonitoreo",
  "assets.lifecycle.FATIGUING": "\nFatigante",
  "assets.lifecycle.DISPOSED": "\nEliminado",
  "digitalTwin.scene.hotspotTitle": "\nCobertura de punto de acceso",
  "digitalTwin.scene.hotspotDescription":
    "\nLos marcadores operativos se actualizan desde el último estado gemelo persistente.",
  "digitalTwin.scene.assetTitle": "\nContexto del activo",
  "digitalTwin.scene.assetDescription":
    "\nCada punto de acceso puede vincularse al activo de infraestructura rastreado.",
  "digitalTwin.hotspots.title": "\nRegistro de hotspot",
  "digitalTwin.hotspots.empty":
    "No hay puntos de acceso disponibles para el gemelo digital actual.",
  "digitalTwin.hotspots.noDescription":
    "\nNo se ha registrado ninguna descripción del punto de acceso.",
  "digitalTwin.hotspots.openTarget": "\nObjetivo abierto",
  "digitalTwin.coords.x": "Eje X",
  "digitalTwin.coords.y": "Eje Y",
  "digitalTwin.coords.z": "Eje Z",
  "kanban.title": "\nTablero Kanban",
  "kanban.subtitle": "\nCanal de ejecución para asignaciones, programación y flujo de personal",
  "tasks.title": "\nTablero de tareas",
  "tasks.subtitle": "\nCanal de ejecución de Kanban y flujo de personal",
  "tasks.filter.priority": "\nPrioridad",
  "tasks.filter.priority.all": "\nTodas las prioridades",
  "tasks.filter.status": "\nEstado",
  "tasks.filter.site": "\nSitio",
  "tasks.filter.assignee": "\nCesionario",
  "tasks.filter.assigneePlaceholder": "\nBuscar activo, cesionario o equipo",
  "tasks.filter.priority.low": "\nBajo",
  "tasks.filter.priority.medium": "\nMedio",
  "tasks.filter.priority.high": "\nAlto",
  "tasks.filter.priority.critical": "\nCrítico",
  "tasks.filter.site.allSites": "\nTodos los sitios",
  "tasks.filter.site.northTraining": "\nSitio de entrenamiento norte",
  "tasks.filter.site.centralCommand": "\nComando Central",
  "tasks.column.backlog": "\nTrabajo pendiente",
  "tasks.column.scheduled": "\nProgramado",
  "tasks.column.inProgress": "\nEn progreso",
  "tasks.column.completed": "\nCompletado",
  "tasks.column.empty": "\nNo hay tareas en esta columna",
  "tasks.status.draft": "\nRevisión",
  "tasks.status.cancelled": "\nCancelado",
  "tasks.priority.LOW": "\nBajo",
  "tasks.priority.MEDIUM": "\nMedio",
  "tasks.priority.HIGH": "\nAlto",
  "tasks.priority.CRITICAL": "\nCrítico",
  "tasks.type.INSPECTION": "\nInspección",
  "tasks.type.REPAIR": "\nReparación",
  "tasks.type.REPLACEMENT": "\nReemplazo",
  "tasks.type.CALIBRATION": "\nCalibración",
  "tasks.type.EMERGENCY": "\nEmergencia",
  "tasks.card.asset": "\nActivo",
  "tasks.card.deadline": "\nFecha límite",
  "tasks.card.crew": "\nTripulación",
  "tasks.card.priority": "\nPrioridad",
  "tasks.card.open": "\nVer tarea",
  "tasks.card.openAria": "\nAbrir detalles de la tarea para {id}",
  "tasks.summary.pendingApproval": "\nPendiente de aprobación",
  "tasks.detail.title": "\nDetalle de la tarea",
  "tasks.detail.subtitle":
    "\nSeleccione una tarjeta de tarea para inspeccionar el contexto de la tarea",
  "tasks.detail.listTitle": "\nLista de verificación para completar tareas",
  "tasks.detail.completionCriteria": "\nCriterios de finalización",
  "tasks.detail.requiredParts": "\nPiezas requeridas",
  "tasks.detail.aiConfidence": "\nConfianza en la IA",
  "tasks.workspace.title": "\nControl de misión de tarea",
  "tasks.workspace.heroEyebrow": "\nBanco de trabajo de operaciones",
  "tasks.workspace.heroNarrative":
    "\nVista {mode} enfocada en {preset}. {total} tareas con alcance, {active} activas en flujo, {unassigned} sin propietario, {dueSoon} próximamente.",
  "tasks.workspace.modeLabel": "\nModo de banco de trabajo de tareas",
  "tasks.workspace.mode.queue": "\nCola de prioridad",
  "tasks.workspace.mode.board": "\nTablero de flujo",
  "tasks.workspace.mode.copilot": "\nCopiloto",
  "tasks.workspace.navigatorTitle": "\nNavegador",
  "tasks.workspace.navigatorSubtitle":
    "\nGuarde el modelo mental del operador: elija una lente y luego corte el conjunto de datos.",
  "tasks.workspace.queueTitle": "\nCola de ejecución",
  "tasks.workspace.queueSubtitle":
    "\nDetalle de lista primero para despacho, clasificación y revisión del operador.",
  "tasks.workspace.boardTitle": "\nFlujo de ejecución",
  "tasks.workspace.boardSubtitle":
    "\nVista del primer carril del tablero para programación, monitoreo de WIP y cambios de estado.",
  "tasks.workspace.detailTitle": "\nObtención de detalles",
  "tasks.workspace.detailSubtitle":
    "\nTarea seleccionada, propietario recomendado y siguiente ruta de acción.",
  "tasks.workspace.detailEmpty":
    "\nSeleccione una tarjeta de tarea para inspeccionar el contexto de ejecución y las recomendaciones de IA.",
  "tasks.workspace.presetLabel": "\nPreestablecido",
  "tasks.workspace.preset.all": "\nToda la carga de trabajo",
  "tasks.workspace.preset.myQueue": "\nMi cola",
  "tasks.workspace.preset.triage": "\nNecesita clasificación",
  "tasks.workspace.preset.unassigned": "\nNo asignado",
  "tasks.workspace.preset.dueSoon": "\nVencimiento pronto",
  "tasks.workspace.preset.active": "\nFlujo activo",
  "tasks.workspace.preset.completed": "\nRecientemente completado",
  "tasks.workspace.preset.aiGenerated": "\nOriginado en IA",
  "tasks.workspace.preset.allDesc":
    "\nCarga de trabajo filtrada completa en planificación y ejecución.",
  "tasks.workspace.preset.myQueueDesc": "\nTareas ya asignadas al operador actual.",
  "tasks.workspace.preset.triageDesc":
    "\nBorradores y elementos pendientes que aún necesitan una decisión.",
  "tasks.workspace.preset.unassignedDesc": "\nTrabajo sin propiedad individual o colectiva.",
  "tasks.workspace.preset.dueSoonDesc": "\nTareas pendientes en los próximos siete días.",
  "tasks.workspace.preset.activeDesc":
    "\nEl trabajo programado y en vuelo consume capacidad actualmente.",
  "tasks.workspace.preset.completedDesc":
    "\nTrabajo cerrado recientemente para validación y traspaso.",
  "tasks.workspace.preset.aiGeneratedDesc":
    "\nElementos de trabajo vinculados a predicciones o puntuados por IA.",
  "tasks.workspace.savedViewLabel": "\nVistas guardadas",
  "tasks.workspace.savedView.dispatch": "Cola de despacho",
  "tasks.workspace.savedView.dispatchDesc":
    "\nMantenga visible el trabajo no asignado y la presión del personal para una ruta rápida.",
  "tasks.workspace.savedView.slaWatch": "\nVigilancia SLA",
  "tasks.workspace.savedView.slaWatchDesc":
    "\nPermanezca en el trabajo vencido pronto y atrasado que necesita intervención primero.",
  "tasks.workspace.savedView.automation": "\nVigilancia de automatización",
  "tasks.workspace.savedView.automationDesc":
    "\nRevisar las tareas originadas por IA antes de pasar a la programación y ejecución en campo.",
  "tasks.workspace.savedView.execution": "\nEnfoque de ejecución",
  "tasks.workspace.savedView.executionDesc":
    "\nSiga el trabajo programado y en progreso sin abandonar el banco de trabajo.",
  "tasks.workspace.metric.total": "\nTareas con alcance",
  "tasks.workspace.metric.totalDesc":
    "\nCarga de trabajo visible después de aplicar los filtros actuales.",
  "tasks.workspace.metric.active": "\nEn ejecución",
  "tasks.workspace.metric.activeDesc": "\nTareas programadas y en curso en la vista actual.",
  "tasks.workspace.metric.unassigned": "\nSin dueño",
  "tasks.workspace.metric.unassignedDesc": "\nTareas sin asignado directo ni tripulación.",
  "tasks.workspace.metric.dueSoon": "\nVencimiento pronto",
  "tasks.workspace.metric.dueSoonDesc": "\nTareas con fecha límite en los próximos siete días.",
  "tasks.workspace.metric.overdue": "\nVencido",
  "tasks.workspace.primaryAction": "\nAgregar tarea",
  "tasks.workspace.filtersHint":
    "\nCambiar una segmentación actualiza la consulta del tablero y mantiene la URL compartible.",
  "tasks.workspace.slaTitle": "\nEnvejecimiento de SLA",
  "tasks.workspace.slaDescription":
    "\nMantenga visible el trabajo atrasado, que vence pronto y la reasignación antes de que pase al siguiente turno.",
  "tasks.workspace.slaAging.overdue": "\n{count} día(s) de retraso",
  "tasks.workspace.slaAging.today": "\nVencimiento hoy",
  "tasks.workspace.slaAging.dueIn": "\nVencimiento en {count} día(s)",
  "tasks.workspace.slaAging.onTrack": "\nEn camino",
  "tasks.workspace.bulkCueTitle": "\nSeñales de clasificación masiva",
  "tasks.workspace.bulkCueDescription":
    "\nVaya a segmentos de clasificación, reasignación o cierre sin reconstruir los filtros actuales.",
  "tasks.workspace.bulkTriageTitle": "\nTriaje masivo",
  "tasks.workspace.bulkTriageDescription":
    "\nElimine las tareas atrasadas, que vencen pronto y que requieren mucha atención antes de que pasen al siguiente turno.",
  "tasks.workspace.bulkReassignTitle": "\nSeñales de reasignación",
  "tasks.workspace.bulkReassignDescription":
    "\nMantenga visible el trabajo no asignado para que el despacho y el traspaso de la tripulación se mantengan por delante de la cola.",
  "tasks.workspace.shortcutTitle": "\nAtajos de teclado",
  "tasks.workspace.shortcutDescription":
    "\nUtilice los atajos del banco de trabajo para crear tareas rápidamente, realizar cambios en el tablero y transferir IA.",
  "tasks.workspace.bulkReassign": "\nReasignar trabajo sin propietario",
  "tasks.workspace.bulkHandoff": "\nPreparar cola de transferencia",
  "tasks.workspace.bulkCloseReady": "\nRevisar el trabajo listo para cerrar",
  "tasks.workspace.wipTitle": "\nPostura WIP",
  "tasks.workspace.wipDescription":
    "\nRealice un seguimiento de la capacidad en vuelo por carril para que el trabajo bloqueado se intensifique antes de que las cuadrillas se detengan.",
  "tasks.workspace.wipHealthy": "\nEl flujo está dentro de los límites WIP actuales.",
  "tasks.workspace.wipAtRisk":
    "\n{count} carril(es) están por encima de las barandillas WIP actuales.",
  "tasks.workspace.swimlaneTitle": "\nEnfoque de carril",
  "tasks.workspace.swimlaneDescription":
    "\nMantenga visible el sitio actual y el contexto del propietario mientras cambia entre los modos de cola y tablero.",
  "tasks.workspace.clearFilterAria": "\nBorrar filtro {label}",
  "tasks.workspace.unassignedValue": "\nNo asignado",
  "tasks.workspace.aiConfidence": "\nConfianza en la IA",
  "tasks.workspace.aiOriginLabel": "\nOrigen de la IA",
  "tasks.workspace.aiOrigin.prediction": "\nGenerado por predicción",
  "tasks.workspace.column.backlogDesc":
    "\nTrabajo listo para dar forma antes de que se comprometa la capacidad laboral o de calendario.",
  "tasks.workspace.column.scheduledDesc":
    "Trabajo comprometido organizado para cuadrillas, traspasos y ventanas del sitio.",
  "tasks.workspace.column.inProgressDesc":
    "\nEjecución de campo activo que necesita eliminación de bloqueadores y vigilancia de SLA.",
  "tasks.workspace.column.completedDesc":
    "\nTrabajo terminado en espera de validación, auditoría o transferencia a las partes interesadas.",
  "tasks.workspace.workflowTitle": "\nProgresión del flujo de trabajo",
  "tasks.workspace.moveTitle": "\nMover tarea",
  "tasks.workspace.empty.BACKLOG":
    "\nNingún elemento pendiente coincide con el segmento del conjunto de datos actual.",
  "tasks.workspace.empty.SCHEDULED":
    "\nNingún trabajo programado coincide con el segmento del conjunto de datos actual.",
  "tasks.workspace.empty.IN_PROGRESS":
    "\nNingún trabajo de ejecución activo coincide con el segmento del conjunto de datos actual.",
  "tasks.workspace.empty.COMPLETED":
    "\nNingún trabajo completado coincide con el segmento del conjunto de datos actual.",
  "tasks.workspace.queue.attention": "\nNecesita atención",
  "tasks.workspace.queue.attentionDesc":
    "\nTrabajo atrasado o a corto plazo que necesita una decisión del operador ahora.",
  "tasks.workspace.queue.dispatch": "\nDespacho y dotación de personal",
  "tasks.workspace.queue.dispatchDesc":
    "\nUtilice esta lista para asignar trabajo sin propietario antes de que se convierta en deuda de flujo.",
  "tasks.workspace.queue.active": "\nEn ejecución",
  "tasks.workspace.queue.activeDesc":
    "\nTrabajo actual planificado y en progreso ordenado por fecha de entrega y prioridad.",
  "tasks.workspace.queue.closed": "\nFinalizaciones recientes",
  "tasks.workspace.queue.closedDesc":
    "\nTrabajo recién finalizado para auditoría, traspaso y seguimiento.",
  "tasks.workspace.queue.empty": "\nEsta cola está actualmente despejada para el segmento elegido.",
  "tasks.workspace.filteredEmpty.title": "\nNingún resultado coincide con sus filtros",
  "tasks.workspace.filteredEmpty.description":
    "\nAjuste sus filtros o elimínelos para volver a ver tareas en este carril.",
  "tasks.workspace.recommendation.title": "\nRecomendación de dotación de personal de IA",
  "tasks.workspace.recommendation.confidenceLabel": "\nConfianza de la recomendación",
  "tasks.workspace.recommendation.noMatch": "\nAún no hay coincidencia de personal disponible",
  "tasks.workspace.recommendation.assigneeRecommended": "\nAsignación individual recomendada",
  "tasks.workspace.recommendation.crewRecommended": "\nAsignación de tripulación recomendada",
  "tasks.workspace.recommendation.reason.assigneeContinuity":
    "\nLa cobertura de {role} en {site} mantiene el contexto de la tarea actual con {openTasks} tareas activas.",
  "tasks.workspace.recommendation.reason.assigneeLoad":
    "\nLa cobertura de {role} en {site} tiene la carga de trabajo activa más ligera en {openTasks} tareas.",
  "tasks.workspace.recommendation.reason.crewEscalation":
    "\n{crew} cubre a {site} con un cable de mantenimiento en rotación para esta tarea {taskType}.",
  "tasks.workspace.recommendation.reason.crewCapacity":
    "\n{crew} cubre {site} con {memberCount} miembros activos y {openTasks} tareas activas.",
  "tasks.workspace.recommendation.reason.noMatch":
    "\nAún no hay cobertura de personal o técnico configurada para {site}.",
  "tasks.workspace.test.completionCriterionSample":
    "\nVerificar la normalización del flujo de aire",
  "tasks.workspace.test.requiredPartSample": "\nPaquete de filtros",
  "tasks.workspace.chat.noSelection": "\nActualmente no hay ninguna tarea seleccionada.",
  "tasks.workspace.chat.selection":
    "\nTarea seleccionada {task}, estado {status}, prioridad {priority}, propietario {assignee}.",
  "tasks.workspace.chat.pageContext":
    "\nBanco de trabajo de tareas en la vista {mode}. {stats}. {filters}. {task}.",
  "tasks.workspace.copilot.title": "\nCopiloto de IA",
  "tasks.workspace.copilot.subtitle":
    "\nLas acciones listas para solicitar permanecen vinculadas al conjunto de datos visible y al estado de obtención de detalles.",
  "tasks.workspace.copilot.description":
    "Mantenga al asistente cerca del trabajo: resuma la carga de trabajo visible, diagnostique cuellos de botella en el flujo o redacte notas de transferencia sin salir del centro de comando.",
  "tasks.workspace.copilot.askAi": "\nPreguntar a AI",
  "tasks.workspace.copilot.openPrompt":
    "\nRevise el espacio de trabajo de tareas visible y ayúdeme a decidir la próxima acción operativa.",
  "tasks.workspace.copilot.brief": "\nResumen operativo",
  "tasks.workspace.copilot.briefPrompt":
    "\nResuma el espacio de trabajo de la tarea {mode} actual para el valor preestablecido {preset}. Resalte los elementos urgentes, las carencias de personal y las próximas acciones recomendadas.",
  "tasks.workspace.copilot.bottleneck": "\nEncontrar cuellos de botella",
  "tasks.workspace.copilot.bottleneckPrompt":
    "\nObserve la carga de trabajo de tareas visible e identifique los principales cuellos de botella, obstáculos y riesgos de WIP.",
  "tasks.workspace.copilot.handoff": "\nBorrador de transferencia",
  "tasks.workspace.copilot.handoffPrompt":
    "\nRedacte un traspaso de operador conciso para la carga de trabajo de tareas visible, incluido qué cambió, qué está bloqueado y qué debería suceder a continuación.",
  "tasks.workspace.copilot.executionPlan": "\nBorrador del plan de ejecución",
  "tasks.workspace.copilot.executionPlanPrompt":
    "\nCree un plan de ejecución para la tarea {task} en el activo {asset} en el sitio {site}. Incluya secuenciación, bloqueadores para verificar y pasos de comunicación.",
  "tasks.workspace.copilot.blockers": "\nAnalizar bloqueadores",
  "tasks.workspace.copilot.blockersPrompt":
    "\nAnalice posibles bloqueadores, datos faltantes y puntos de riesgo para la tarea {task}.",
  "tasks.workspace.copilot.statusUpdate": "\nActualización de estado del borrador",
  "tasks.workspace.copilot.statusUpdatePrompt":
    "\nEscriba una actualización de estado concisa para la tarea {task}. El estado actual del flujo de trabajo es {status}.",
  "predictions.title": "\nPredicciones Feed",
  "predictions.subtitle": "\nSeñales de riesgo de ciclo de vida y mantenimiento generadas por IA",
  "predictions.filter.severity": "\nGravedad",
  "predictions.filter.severity.all": "\nTodos",
  "predictions.filter.severity.info": "\nInformación",
  "predictions.filter.severity.warning": "\nAdvertencia",
  "predictions.filter.severity.critical": "\nCrítico",
  "predictions.filter.severity.emergency": "\nEmergencia",
  "predictions.filter.site": "\nSitio",
  "predictions.filter.site.allSites": "\nTodos los sitios",
  "predictions.filter.site.northTraining": "\nSitio de entrenamiento norte",
  "predictions.filter.site.westCompound": "\nCompuesto Oeste",
  "predictions.filter.assetType": "\nTipo de activo",
  "predictions.filter.assetType.all": "\nTodos los tipos",
  "predictions.filter.assetType.electrical": "\nEléctrico",
  "predictions.filter.assetType.plumbing": "\nPlomería",
  "predictions.filter.assetType.hvac": "Climatización",
  "predictions.feed.title": "\nCola de predicción en vivo",
  "predictions.feed.reasoning": "\nRazonamiento",
  "predictions.feed.remainingLife": "\nVida restante",
  "predictions.feed.confidence": "\nConfianza",
  "predictions.feed.expand": "\nExpandir cadena",
  "predictions.feed.generatorFailureTitle": "\nVentana de falla del generador A-21",
  "predictions.feed.pumpCollapseTitle": "\nColapso de presión de la bomba P-08",
  "predictions.feed.generatorRemainingLife": "\n14 días",
  "predictions.feed.pumpRemainingLife": "\n6 días",
  "predictions.feed.generatorConfidence": "86% (ejemplo)",
  "predictions.feed.pumpConfidence": "93% (ejemplo)",
  "predictions.reasoning.title": "\nCadena de razonamiento",
  "predictions.reasoning.subtitle": "\nResumen del modelo, contexto y recomendación",
  "predictions.reasoning.list.variance":
    "\nLa variación de la telemetría superó la línea de base móvil en un 42 %.",
  "predictions.reasoning.list.seal":
    "\nEl historial de mantenimiento indica un patrón repetido de degradación del sello.",
  "predictions.reasoning.list.action":
    "\nAcción recomendada: crear automáticamente una tarea de reemplazo de borrador dentro de las 48 h.",
  "predictions.reasoning.placeholder":
    "\nEl rastreo de razonamiento se transmitirá cuando las predicciones estén disponibles.",
  "predictions.reasoning.asset": "\nActivo",
  "predictions.reasoning.model": "\nModelo",
  "predictions.reasoning.confidence": "\nConfianza",
  "predictions.type.failure": "\nFallo",
  "predictions.type.degradation": "\nDegradación",
  "predictions.type.maintenanceDue": "\nMantenimiento vencido",
  "predictions.type.lifecycleEnd": "\nFin del ciclo de vida",
  "predictions.workspace.eyebrow": "\nComando de riesgo de IA",
  "predictions.workspace.title":
    "\nFlujo de predicción, inventario y acción en una superficie de control",
  "predictions.workspace.description":
    "Un espacio de trabajo estilo Power BI para clasificar las señales de riesgo de IA en vivo frente al inventario de activos, el trabajo atrasado operativo y la presión de adquisición o eliminación posterior.",
  "predictions.workspace.live": "\nActualiza cada {seconds}s",
  "predictions.workspace.filtersTitle": "\nBarra de comando de filtro",
  "predictions.workspace.filtersDescription":
    "\nBusque activos y limite la predicción actual establecida por gravedad, sitio, tipo de activo y antigüedad de la predicción.",
  "predictions.workspace.searchLabel": "\nBuscar inventario",
  "predictions.workspace.searchPlaceholder": "\nFiltrar por nombre de activo o sitio",
  "predictions.workspace.legendDescription":
    "\nLos colores de gravedad se mantienen consistentes en las tarjetas destacadas, la cuadrícula de inventario y el carril de explicabilidad.",
  "predictions.workspace.methodologyTitle": "\nModelo de clasificación",
  "predictions.workspace.methodologyDescription":
    "\nLas puntuaciones combinan la urgencia de la IA con el inventario, el flujo de trabajo y el flujo comercial para que los operadores puedan trabajar desde una sola cola.",
  "predictions.workspace.methodologyItemSignals":
    "\nLa confianza de la IA, el tipo de predicción y las ventanas de vida restante impulsan la urgencia operativa básica.",
  "predictions.workspace.methodologyItemInventory":
    "\nEl valor del inventario, la condición de los activos y la etapa del ciclo de vida aumentan la presión sobre los activos de alta exposición.",
  "predictions.workspace.methodologyItemWorkflow":
    "\nLas tareas abiertas más la actividad activa de adquisición o eliminación dan forma a lo que debería moverse a continuación.",
  "predictions.workspace.panelTitle": "\nCentro de mando de riesgos",
  "predictions.workspace.panelDescription":
    "\nSupervise las señales de IA más potentes, la exposición de su inventario y el flujo operativo que ya se está generando a su alrededor.",
  "predictions.workspace.generatedAt": "\nActualizado {generatedAt}",
  "predictions.workspace.kpi.activeSignals": "\nSeñales activas",
  "predictions.workspace.kpi.activeSignalsHint":
    "\nPredicciones de IA filtradas actualmente en la cola empresarial.",
  "predictions.workspace.kpi.activeSignalsTrend": "\n{count} crítico o emergencia",
  "predictions.workspace.kpi.dueSoon": "\nVencimiento pronto",
  "predictions.workspace.kpi.dueSoonHint":
    "\nSeñales cuya vida restante está dentro del umbral de intervención.",
  "predictions.workspace.kpi.inventoryExposure": "\nExposición de inventario",
  "predictions.workspace.kpi.inventoryExposureHint":
    "\nValor contable representado por el conjunto de predicción filtrado.",
  "predictions.workspace.kpi.aiCoverage": "\nCobertura de IA",
  "predictions.workspace.kpi.aiCoverageHint":
    "\nActivos en el segmento de inventario actual con historial de predicción.",
  "predictions.workspace.kpi.averageConfidenceTrend": "\n{confidence}% confianza promedio",
  "predictions.workspace.kpi.liveTrend": "\nEn vivo a partir de {generatedAt}",
  "predictions.workspace.distribution.severity": "\nMezcla de gravedad",
  "predictions.workspace.distribution.assetMix": "\nMezcla de activos",
  "predictions.workspace.distribution.siteMix": "\nMezcla de sitios",
  "predictions.workspace.boardTitle": "\nTablero de riesgo clasificado",
  "predictions.workspace.boardDescription":
    "\nLas señales más fuertes sobre fallas, degradación, mantenimiento y presión del ciclo de vida, clasificadas por urgencia e impacto empresarial.",
  "predictions.workspace.boardEmpty":
    "\nAún no hay predicciones filtradas disponibles. Expande los filtros o espera a que llegue más telemetría.",
  "predictions.workspace.table.title": "\nCuadrícula de riesgos de inventario",
  "predictions.workspace.table.description":
    "Una densa red de operadores para escanear la exposición de los activos, la presión del flujo de trabajo y la siguiente acción explicativa.",
  "predictions.workspace.table.asset": "\nActivo",
  "predictions.workspace.table.severity": "\nSeñal",
  "predictions.workspace.table.inventory": "\nInventario",
  "predictions.workspace.table.workflow": "\nFlujo de trabajo",
  "predictions.workspace.table.inspect": "\nEvidencia abierta",
  "predictions.workspace.tableEmpty":
    "\nNinguna fila de inventario coincide con el conjunto de filtros actual.",
  "predictions.workspace.railTitle": "\nCarril de explicabilidad",
  "predictions.workspace.railDescription":
    "\nUn resumen conciso de IA más el modelo de la señal seleccionada, los datos de origen y la evidencia operativa de respaldo.",
  "predictions.workspace.assistant.title": "\nResumen de operaciones de IA",
  "predictions.workspace.assistant.description":
    "\nUn breve resumen empresarial basado en el conjunto de datos de predicción activo y la señal seleccionada.",
  "predictions.workspace.assistant.sourceAI": "\nResumen de IA",
  "predictions.workspace.assistant.sourceSystem": "\nResumen del sistema",
  "predictions.workspace.assistant.generatedAt": "\nGenerado {generatedAt}",
  "predictions.workspace.chatContext":
    "\nCentro de control de predicciones. Espacio de trabajo unificado para señales de riesgo de IA, exposición de inventario, retrasos operativos y presión de adquisiciones posteriores. Controles: búsqueda, gravedad, sitio, tipo de activo y rango de fechas. Secciones principales: franja de KPI, tablero de riesgo clasificado, cuadrícula de inventario y carril de evidencia de IA.",
  "predictions.workspace.assistant.headlineCritical":
    "\nEl riesgo crítico es establecer la postura operativa",
  "predictions.workspace.assistant.headlineMonitor":
    "\nLas ventanas de intervención se están comprimiendo en la cola",
  "predictions.workspace.assistant.headlineStable":
    "\nLa cola está activa pero ampliamente controlada",
  "predictions.workspace.assistant.fallbackLead":
    "\n{asset} en {site} es el candidato principal a la intervención con {days} días restantes de vida con un {confidence}% de confianza.",
  "predictions.workspace.assistant.fallbackEmpty":
    "\nNinguna predicción dominante encabeza la cola filtrada en este momento. Mantenga saludable la cobertura de telemetría y controle las nuevas señales a medida que llegan.",
  "predictions.workspace.assistant.fallbackCoverage":
    "\nEl segmento actual contiene {signals} señales activas que representan aproximadamente {exposure} de exposición del inventario, con {dueSoon} ventanas de intervención ya dentro del umbral a corto plazo.",
  "predictions.workspace.card.score": "\nPuntuación",
  "predictions.workspace.card.scoreValue": "\nPuntuación {score}",
  "predictions.workspace.card.remainingLifeValue": "\n{days} días",
  "predictions.workspace.card.inventory": "\nInventario",
  "predictions.workspace.card.signalCoverage": "\nDatos de origen",
  "predictions.workspace.card.signalCoverageValue": "\n{count} grupos de funciones",
  "predictions.workspace.card.openTasksValue": "\n{count} tareas abiertas",
  "predictions.workspace.card.workOrdersValue": "\n{count} órdenes de trabajo activas",
  "predictions.workspace.card.documentsValue": "\n{count} documentos abiertos",
  "predictions.workspace.card.generatedTask": "\nTarea generada",
  "predictions.workspace.action.escalate":
    "\nEscalar inmediatamente al liderazgo de mantenimiento y validar la capacidad de intervención dentro de la siguiente ventana operativa.",
  "predictions.workspace.action.procure":
    "\nConfirme la cobertura de piezas, alinee la adquisición y mueva el activo al siguiente espacio de intervención disponible.",
  "predictions.workspace.action.schedule":
    "Programe la revisión de mantenimiento y verifique que el plan de inventario y el trabajo pendiente puedan absorber la señal antes de que se endurezca.",
  "predictions.workspace.action.monitor":
    "\nMantenga estable la recopilación de telemetría, revise la línea de tendencia de los activos y supervise una mayor degradación antes de enviar el trabajo.",
  "predictions.workspace.detail.evidence": "\nEvidencia operativa",
  "predictions.workspace.detail.evidenceDescription":
    "\nEvidencia determinista recopilada a partir de conjuntos de datos de activos, flujos de trabajo y documentos transaccionales en torno a la señal seleccionada.",
  "predictions.workspace.detail.sourceData": "\nDatos de origen y metadatos del modelo",
  "predictions.workspace.detail.sourceDataDescription":
    "\nGrupos de funciones capturados a partir de la carga útil de entrada almacenada, junto con los metadatos del modelo y del proveedor.",
  "predictions.workspace.detail.lifecycle": "\nCiclo de vida",
  "predictions.workspace.detail.condition": "\nCondición",
  "predictions.workspace.detail.generatedAt": "\nGenerado en",
  "predictions.workspace.detail.openTasksEvidence":
    "\n{count} tareas de mantenimiento activas ya están abiertas para este activo.",
  "predictions.workspace.detail.noOpenTasksEvidence":
    "\nActualmente no hay ninguna tarea de mantenimiento activa vinculada a este activo.",
  "predictions.workspace.detail.workOrdersEvidence":
    "\n{count} las órdenes de trabajo activas ya están vinculadas a este activo.",
  "predictions.workspace.detail.customerOrdersEvidence":
    "\n{count} pedidos de clientes fluyen actualmente a través de este contexto de activos.",
  "predictions.workspace.detail.purchaseOrdersEvidence":
    "\n{count} orden(es) de compra todavía están abiertas en este contexto de activo.",
  "predictions.workspace.detail.invoicesEvidence":
    "\n{count} las facturas aún conllevan presión de cobro o cumplimiento para este contexto de activo.",
  "predictions.workspace.detail.noDocumentEvidence":
    "\nActualmente no hay órdenes de trabajo, órdenes de clientes, órdenes de compra o facturas vinculadas abiertas.",
  "predictions.workspace.detail.createdEvidence": "\nSeñal generada {generatedAt}.",
  "predictions.workspace.outcomeTitle": "\nResultados de promoción de la acción",
  "predictions.workspace.outcomeDescription":
    "\nTraslade la señal más fuerte al seguimiento de tareas, adquisiciones o monitoreo.",
  "finance.title": "\nFinanzas",
  "finance.subtitle": "\nExposición a la depreciación y valoraciones ajustadas por IA",
  "financePlanning.title": "\nPlanificación financiera",
  "financePlanning.subtitle":
    "\nPostura presupuestaria, presión de capital y planificación del ciclo de vida",
  "financePlanning.coverage":
    "\nUtilice los activos, el sitio, los documentos y la postura de predicción actuales como base para la planificación del presupuesto y de los escenarios.",
  "financePlanning.kpi.assets": "\nActivos rastreados",
  "financePlanning.kpi.assetsDesc": "\nActivos que pueden incluirse en escenarios de planificación",
  "financePlanning.kpi.sites": "\nSitios dentro del alcance",
  "financePlanning.kpi.sitesDesc":
    "\nUbicaciones que contribuyen a la planificación presupuestaria",
  "financePlanning.kpi.openDocuments": "\nAbrir documentos",
  "financePlanning.kpi.openDocumentsDesc":
    "\nDocumentos transaccionales actualmente activos en demanda, entrega, compras y facturación",
  "financePlanning.kpi.dueSoon": "\nSeñales de vencimiento pronto",
  "financePlanning.kpi.dueSoonDesc": "\nSeñales que pueden convertirse en demanda de reemplazo",
  "financePlanning.summary.alertTitle":
    "\nLa postura de planificación ya puede basarse en datos de cartera en vivo",
  "financePlanning.summary.alertDescription":
    "Utilice perfiles de planificación del sitio, señales de activos que vencen pronto, documentos listos para ejecución e informes guardados para preparar presupuestos y escenarios sin una pila de planificación separada.",
  "financePlanning.summary.tab.readiness": "\nPreparación",
  "financePlanning.summary.tab.handoff": "\nTraspaso",
  "financePlanning.summary.tab.intake": "\nIngesta entre dominios",
  "financePlanning.summary.siteTitle": "\nPreparación para la planificación del sitio",
  "financePlanning.summary.siteDescription":
    "\nLos perfiles de planificación son la estructura actual para incorporar las instalaciones, la flota y el contexto operativo en las decisiones financieras.",
  "financePlanning.summary.siteProfiles": "\nPerfiles de planificación",
  "financePlanning.summary.siteProfilesDesc":
    "\n{total} sitios están actualmente disponibles para planificación.",
  "financePlanning.summary.assetScope": "\nPortafolio dentro del alcance",
  "financePlanning.summary.assetScopeDesc":
    "\nLa base de activos gestionados actual ya es lo suficientemente grande como para soportar porciones de planificación basadas en escenarios.",
  "financePlanning.summary.postureTitle": "\nPostura de preparación",
  "financePlanning.summary.postureDescription":
    "\nPromueva el contexto de planificación del sitio, los documentos listos para su ejecución y las señales de riesgo en conjunto para que la planificación financiera se convierta en un flujo de trabajo conectado en lugar de una exportación de hoja de cálculo.",
  "financePlanning.summary.badgeSites": "\nSitios",
  "financePlanning.summary.badgeDocuments": "\nDocumentos",
  "financePlanning.summary.badgeSignals": "\nSeñales",
  "financePlanning.summary.pressureTitle": "\nPresión de capital que vence pronto",
  "financePlanning.summary.pressureDesc":
    "\nLas predicciones dentro del período de corto plazo son el principal indicador actual del presupuesto y la demanda de reemplazo.",
  "financePlanning.summary.documentsTitle": "\nDocumentos listos para ejecución",
  "financePlanning.summary.documentsDesc":
    "\nLos documentos operativos aprobados y emitidos ya están preparados para el seguimiento de entrega, compras y cobranzas.",
  "financePlanning.summary.reportTitle": "\nSalidas de planificación guardadas",
  "financePlanning.summary.reportDesc":
    "\nLos informes guardados son la superficie de transferencia actual para la revisión de la planificación y el empaquetado de las partes interesadas.",
  "financePlanning.summary.intakeTitle": "\nIngesta de planificación entre dominios",
  "financePlanning.summary.intakeDescription":
    "\nLa planificación financiera es ahora la superficie acumulada para la demanda operativa capturada en flotas, edificios y sensores.",
  "financePlanning.summary.intakeFleetTitle":
    "\nIniciativas de flota esperando embalaje de escenario",
  "financePlanning.summary.intakeFleetDesc":
    "\nLas iniciativas de reemplazo, cumplimiento y mantenimiento de vehículos ahora pueden contarse como insumos financieros directos.",
  "financePlanning.summary.intakeBuildingsTitle":
    "\nIniciativas de instalaciones listas para la elaboración del presupuesto",
  "financePlanning.summary.intakeBuildingsDesc":
    "\nLas iniciativas de sistemas de construcción y espacio están disponibles para la configuración de escenarios operativos y de capital.",
  "financePlanning.summary.intakeSensorsTitle":
    "\nAlertas de sensores que indican presión de planificación",
  "financePlanning.summary.intakeSensorsDesc":
    "\nLas reglas de alerta de sensores identifican condiciones de telemetría que pueden justificar una intervención, repuestos o presupuesto de reemplazo.",
  "financePlanning.summary.intakeAlert":
    "Utilice esta línea de entrada para convertir el trabajo operativo en escenarios de planificación sin tener que volver a introducir el mismo contexto de decisión.",
  "financePlanning.summary.intakeTotal": "\nSeñales operativas entrantes",
  "financePlanning.summary.intakeTotalDesc":
    "\nIniciativas y reglas entre dominios actualmente disponibles para traducirse en escenarios de planificación financiera.",
  "financePlanning.summary.scenarioDrafts": "\nEscenarios en cubierta",
  "financePlanning.summary.scenarioDraftsDesc":
    "\nEscenarios de planificación existentes ya capturados en el espacio de trabajo de planificación financiera.",
  "financePlanning.summary.badgeFleet": "\nFlota",
  "financePlanning.summary.badgeBuildings": "\nEdificios",
  "financePlanning.summary.badgeSensors": "\nSensores",
  "financePlanning.summary.intakePosture":
    "\nEl espacio de trabajo de planificación financiera ahora puede actuar como punto de transferencia compartido entre la captura de iniciativas operativas y la configuración del presupuesto a nivel de cartera.",
  "financePlanning.seed.ready": "\nListo para sembrar",
  "financePlanning.seed.empty": "\nAún no hay señal de planificación disponible para sembrar.",
  "financePlanning.seed.count": "\n{count} señales en la ingesta",
  "financePlanning.seed.apply": "\nEscenario semilla",
  "financePlanning.seed.unavailable": "\nNo hay semillas disponibles",
  "financePlanning.seed.applied": "\n{source} contexto copiado en el formulario del escenario.",
  "financePlanning.seed.fleet.title": "\nSemilla de flota",
  "financePlanning.seed.fleet.description":
    "\nUtilice la última iniciativa de flota para completar un escenario de planificación con alcance, urgencia y notas operativas.",
  "financePlanning.seed.buildings.title": "\nSemilla de edificios",
  "financePlanning.seed.buildings.description":
    "\nUtilice la última iniciativa de instalaciones para precargar el contexto de planificación operativa o de capital.",
  "financePlanning.seed.sensors.title": "\nSemilla de sensores",
  "financePlanning.seed.sensors.description":
    "\nUtilice la última regla de alerta de sensores para convertir la presión de telemetría en un escenario de planificación inicial.",
  "financePlanning.seed.fleetPrefix": "\nTraspaso de flota",
  "financePlanning.seed.fleetContext":
    "\nSembrado por iniciativa de la flota. Categoría: {category}. Prioridad: {priority}.",
  "financePlanning.seed.fleetSummary": "\nÚltima iniciativa de flota actualizada {updatedAt}.",
  "financePlanning.seed.buildingsPrefix": "\nTraspaso de instalaciones",
  "financePlanning.seed.buildingsContext":
    "\nSembrado a partir de la iniciativa de instalaciones. Categoría: {category}. Fase: {phase}.",
  "financePlanning.seed.buildingsSummary":
    "\nÚltima iniciativa de instalaciones actualizada {updatedAt}.",
  "financePlanning.seed.sensorsPrefix": "\nTransferencia de sensores",
  "financePlanning.seed.sensorsContext":
    "\nSembrado a partir de la regla de alerta del sensor. Serie: {seriesKey}. Comparador: {comparator}. Umbral: {threshold}. Gravedad: {severity}.",
  "financePlanning.seed.sensorsSummary":
    "\nÚltima regla de alerta de sensor actualizada {updatedAt}.",
  "financePlanning.form.title": "\nCrear un escenario de planificación",
  "financePlanning.form.description":
    "\nCapture el próximo presupuesto o escenario de capital directamente desde la postura de planificación en vivo y luego entréguelo a finanzas, flujos de trabajo de documentos y flujos de informes.",
  "financePlanning.form.badge": "\nFlujo SSR duradero",
  "financePlanning.form.nameLabel": "\nTítulo del escenario",
  "financePlanning.form.namePlaceholder": "\nActualización de HVAC del campus 2027",
  "financePlanning.form.nameHint":
    "\nNombre el paquete de decisiones que los operadores reconocerán más adelante.",
  "financePlanning.form.scopeLabel": "\nAlcance",
  "financePlanning.form.scopePlaceholder": "Edificios, flota, sensores o segmento de cartera",
  "financePlanning.form.scopeHint":
    "\nMantenga el alcance alineado con un departamento, grupo de sitios o tema de cartera.",
  "financePlanning.form.horizonLabel": "\nHorizonte de planificación",
  "financePlanning.form.horizonHint":
    "\n{min}-{max} meses, dependiendo del ciclo de planificación.",
  "financePlanning.form.horizonUnit": "\nmeses",
  "financePlanning.form.horizonValue": "\n{months} meses",
  "financePlanning.form.notesLabel": "\nNotas y suposiciones",
  "financePlanning.form.notesPlaceholder":
    "\nCapture los supuestos de gasto, las limitaciones de tiempo, la postura de riesgo y lo que debería pasar a la adquisición o la presentación de informes a continuación.",
  "financePlanning.form.notesHint":
    "\nUtilícelo para registrar el razonamiento que debería sobrevivir en las aprobaciones y los paquetes de informes.",
  "financePlanning.form.requiredHint": "\nSe requieren título, alcance y horizonte.",
  "financePlanning.form.submit": "\nGuardar escenario",
  "financePlanning.form.submitAria": "\nGuardar escenario de planificación financiera",
  "financePlanning.form.recentTitle": "\nEscenarios recientes",
  "financePlanning.form.recentDescription":
    "\nEstos escenarios ahora persisten como registros duraderos de planificación financiera sin abandonar el flujo de SSR.",
  "financePlanning.form.empty": "\nAún no se han capturado escenarios de planificación financiera.",
  "financePlanning.form.savedAt": "\nActualizado {updatedAt}",
  "financePlanning.form.notesEmpty": "\nAún no se han capturado notas.",
  "financePlanning.validation.titleRequired": "El titulo del escenario es obligatorio.",
  "financePlanning.validation.scopeRequired": "\nSe requiere alcance del escenario.",
  "financePlanning.validation.seedSourceInvalid":
    "\nLa fuente de semillas debe provenir de flotas, edificios o sensores.",
  "financePlanning.validation.horizonRange":
    "\nEl horizonte de planificación debe estar entre {min} y {max} meses.",
  "financePlanning.feedback.draftSaved":
    "\nEscenario financiero guardado en el espacio de trabajo de planificación financiera.",
  "financePlanning.feedback.draftSaveFailed":
    "\nNo se puede persistir en el escenario financiero en este momento.",
  "financePlanning.status.draft": "\nEscenario",
  "financePlanning.draft.promoteReports": "Abrir en informes",
  "financePlanning.readiness.assets":
    "\nLa situación de los activos y el sitio ya alimenta el alcance de la planificación.",
  "financePlanning.readiness.documents":
    "\nLas solicitudes de cotizaciones, pedidos, órdenes de trabajo, órdenes de compra y facturas pueden incluirse directamente en las decisiones de escenarios.",
  "financePlanning.readiness.reporting":
    "\nLas superficies de informes actuales pueden agrupar los resultados de la planificación sin una nueva pila.",
  "financePlanning.page.eyebrow": "\nFinanzas",
  "financePlanning.action.createScenario": "\nCrear escenario",
  "financePlanning.action.finance":
    "\nRevise la exposición a la depreciación en vivo antes de cambiar el plan.",
  "financePlanning.action.documents":
    "\nLleve las decisiones de escenarios a los espacios de trabajo de documentos para realizar cotizaciones, pedidos y seguimiento de compras.",
  "financePlanning.action.reports":
    "\nPostura de planificación del paquete en paquetes de informes orientados a las partes interesadas.",
  "financePlanning.action.fleet":
    "\nConecte la demanda y la presión de reemplazo a las operaciones del vehículo.",
  "financePlanning.action.buildings":
    "\nSiga la presión de capital sobre las instalaciones y la cobertura del sistema de edificios.",
  "financePlanning.action.sensors":
    "\nUtilice el sensor y la postura de alerta para comprobar la preparación y los supuestos de planificación.",
  "estate.title": "\nPropiedad",
  "estate.subtitle":
    "Gobernanza de cartera, garantía de servicio, preparación y controles de programa",
  "estate.coverage":
    "\nUn plano autorizado de control patrimonial que abarca el registro, la gobernanza de FM, la preparación, las asociaciones, la administración y las acciones de presentación de informes.",
  "estate.kpi.assets": "\nActivos registrados",
  "estate.kpi.assetsDesc":
    "\nCobertura actual del registro de activos patrimoniales en todas las clases de activos gestionados.",
  "estate.kpi.facilities": "\nSitios de instalaciones",
  "estate.kpi.facilitiesDesc":
    "\nSitios ya marcados como instalaciones dentro de la jerarquía del patrimonio.",
  "estate.kpi.workOrders": "\nÓrdenes de trabajo activas",
  "estate.kpi.workOrdersDesc":
    "\nLa entrega operativa actualmente avanza a través de FM y ejecución patrimonial.",
  "estate.kpi.approvals": "\nAprobaciones pendientes",
  "estate.kpi.approvalsDesc":
    "\nIniciativas inmobiliarias y aprobaciones de proyectos actualmente en espera de avance a través de la gobernanza.",
  "estate.summary.alertTitle":
    "\nLa gobernanza patrimonial ahora se basa en sistemas operativos activos registrados",
  "estate.summary.alertDescription":
    "\nUtilice el registro actual, el flujo de entrega de FM, el gráfico de documentos comerciales y los controles de aprobación para ejecutar la gobernanza, el aseguramiento y la preparación de la cartera desde una superficie patrimonial conectada.",
  "estate.summary.tab.registry": "\nRegistro",
  "estate.summary.tab.delivery": "\nPrestación de servicios",
  "estate.summary.tab.maintenance": "\nGobernanza FM",
  "estate.summary.tab.readiness": "\nPreparación",
  "estate.summary.tab.partnerships": "\nTerreno y socios",
  "estate.summary.tab.stewardship": "\nMayordomía",
  "estate.summary.tab.operations": "\nRangos y GFE",
  "estate.summary.tab.strategy": "\nEstrategia",
  "estate.summary.tab.programme": "\nPrograma",
  "estate.summary.registryTitle": "\nPreparación del registro de activos",
  "estate.summary.registryDescription":
    "\nLa cobertura de activos e instalaciones ahora proporciona la jerarquía patrimonial autorizada para la gobernanza, el aseguramiento y la revisión de inversiones de la cartera.",
  "estate.summary.registryAssets": "\nActivos dentro del alcance",
  "estate.summary.registryAssetsDesc":
    "\nLas instalaciones {total} se encuentran actualmente dentro del área de propiedad administrada.",
  "estate.summary.registryTelemetry": "\nActivos vinculados a telemetría",
  "estate.summary.registryTelemetryDesc":
    "\nLos activos conectados proporcionan condiciones en vivo y contexto de utilización para la priorización.",
  "estate.summary.registryHierarchy": "\nActivos asignados por jerarquía",
  "estate.summary.registryHierarchyDesc":
    "\n{coverage} del registro ahora lleva una ubicación explícita en la jerarquía patrimonial.",
  "estate.summary.registryCapability": "\nActivos vinculados a capacidades",
  "estate.summary.registryCapabilityDesc":
    "\n{coverage} del registro ahora nombra la capacidad operativa que admite cada activo.",
  "estate.summary.postureTitle": "\nControlar la postura",
  "estate.summary.postureDescription":
    "\nMantenga alineadas la cobertura de activos, las señales operativas en vivo y las iniciativas duraderas para que la gestión patrimonial estratégica permanezca conectada con la ejecución.",
  "estate.summary.badgeIso": "ISO 55001 certificado",
  "estate.summary.badgeFm": "\nEntrega FM",
  "estate.summary.badgeP3m": "P3M Nivel",
  "estate.summary.deliveryTitle": "\nPrestación de servicios operativos",
  "estate.summary.deliveryDescription":
    "La ejecución estricta de FM, la actividad contractual y los documentos posteriores muestran la presión de entrega actual en todo el modelo operativo inmobiliario.",
  "estate.summary.deliveryOpenWorkOrders": "\nÓrdenes de trabajo abiertas",
  "estate.summary.deliveryOpenWorkOrdersDesc":
    "\nEjecución actualmente activa en el flujo de mantenimiento, aseguramiento y recuperación.",
  "estate.summary.deliveryOverdueWorkOrders": "\nÓrdenes de trabajo vencidas",
  "estate.summary.deliveryOverdueWorkOrdersDesc":
    "\nEl trabajo programado ya está fuera de las fechas previstas y requiere atención de mitigación.",
  "estate.summary.deliveryDocuments": "\nDocumentos operativos activos",
  "estate.summary.deliveryDocumentsDesc":
    "\nLas solicitudes de presupuesto, pedidos, órdenes de compra, facturas y órdenes de trabajo aún se mueven en el gráfico del contrato.",
  "estate.summary.deliveryExecutionReady": "\nDocumentos listos para ejecución",
  "estate.summary.deliveryExecutionReadyDesc":
    "\nDocumentos que ya han sido admitidos y que pueden impulsar la actividad de entrega o facturación.",
  "estate.summary.maintenanceAlertTitle":
    "\nLa gobernanza de FM dura y blanda ahora se encuentran dentro del mismo espacio de trabajo estratégico",
  "estate.summary.maintenanceAlertDescription":
    "\nUtilice un registro duradero para los cronogramas, inspecciones legales, revisiones de aseguramiento, servicios suaves de FM y señales de referencia del SFG20 en lugar de dividir la gobernanza de FM del panorama más amplio del patrimonio.",
  "estate.summary.maintenanceTitle": "\nPostura de gobernanza de FM",
  "estate.summary.maintenanceDescription":
    "\nRealice un seguimiento del mantenimiento planificado, la inspección legal, la prestación de servicios de FM suave y la presión de referencia sin salir de la capa de control del estado de SSR.",
  "estate.summary.maintenanceRegister": "\nRegistro de gobernanza FM",
  "estate.summary.maintenanceRegisterDesc":
    "\nLos registros {count} actualmente necesitan cumplimiento o intervención de entrega.",
  "estate.summary.maintenanceHardFm": "\nControles FM duros",
  "estate.summary.maintenanceHardFmDesc":
    "\n{count} las inspecciones legales se llevan a cabo actualmente en el registro de mantenimiento.",
  "estate.summary.maintenanceSoftFm": "\nControles suaves de FM",
  "estate.summary.maintenanceSoftFmDesc":
    "\n{count} los registros de evaluación comparativa actualmente comparan la producción de servicios y la postura de productividad.",
  "estate.summary.maintenancePerformance": "\nRendimiento del servicio",
  "estate.summary.maintenancePerformanceDesc":
    "\n{count} los registros de servicio programados actualmente dan forma al calendario operativo de FM.",
  "estate.summary.maintenancePerformanceEmpty": "\nAún no hay puntuación",
  "estate.summary.maintenancePerformanceValue": "\n{score}% puntuación promedio",
  "estate.summary.readinessAlertTitle":
    "\nLa preparación del patrimonio ahora refleja el gráfico operativo en vivo",
  "estate.summary.readinessAlertDescription":
    "\nLos activos de capacidad vinculados al rango, las limitaciones de infraestructura, la deuda de inspección, la actividad de la fuerza laboral y el riesgo del proyecto se combinan en una vista de preparación para la SSR.",
  "estate.summary.readinessTitle": "\nPostura de preparación patrimonial",
  "estate.summary.readinessDescription":
    "Utilice esta capa de preparación para monitorear la disponibilidad del alcance, las limitaciones de la infraestructura, la situación de la capacidad y el impacto de la fuerza laboral sin abandonar el plano de control del estado.",
  "estate.summary.readinessRangeAvailability": "\nDisponibilidad de rango",
  "estate.summary.readinessRangeAvailabilityDesc":
    "\nActualmente se realiza un seguimiento de {total} activos vinculados al rango y al entrenamiento para monitorear su preparación.",
  "estate.summary.readinessConstraints": "\nRestricciones de infraestructura",
  "estate.summary.readinessConstraintsDesc":
    "\n{assets} activos limitados y {projects} proyectos de alto riesgo contribuyen actualmente a la presión patrimonial.",
  "estate.summary.readinessCapability": "\nDisponibilidad de capacidad",
  "estate.summary.readinessCapabilityDesc":
    "\n{watch} agrupaciones de capacidad permanecen bajo vigilancia en {total} agrupaciones de preparación rastreadas.",
  "estate.summary.readinessWorkforce": "\nHoras de fuerza laboral registradas",
  "estate.summary.readinessWorkforceDesc":
    "\n{inspections} las tareas de inspección atrasadas permanecen abiertas según el panorama de preparación actual.",
  "estate.summary.programmeTitle": "\nFlujo de programación y aprobación",
  "estate.summary.programmeDescription":
    "\nLas iniciativas inmobiliarias, los registros de proyectos, las etapas de aprobación y los escenarios financieros proporcionan la transferencia actual a la entrega de P3M, la revisión de DIO y la presentación de informes del programa.",
  "estate.summary.programmeInitiatives": "\nIniciativas inmobiliarias",
  "estate.summary.programmeInitiativesDesc":
    "\nLos registros duraderos del programa ahora se capturan en el espacio de trabajo del patrimonio.",
  "estate.summary.programmeProjects": "\nRegistro de proyecto",
  "estate.summary.programmeProjectsDesc":
    "\nLos proyectos inmobiliarios duraderos ahora capturan el tipo de entrega, la situación de los costos, la presión de los recursos y el estado de aprobación.",
  "estate.summary.programmeApprovalQueue": "\nAprobaciones de proyectos",
  "estate.summary.programmeApprovalQueueDesc":
    "\n{delayed} los elementos retrasados permanecen actualmente dentro de la cola de aprobación del proyecto activo.",
  "estate.summary.programmeControls": "\nControles del proyecto",
  "estate.summary.programmeControlsDesc":
    "\n{changes} los elementos de cambio del proyecto permanecen actualmente dentro del flujo de control del proyecto activo.",
  "estate.summary.partnershipsAlertTitle":
    "\nLa supervisión de terrenos, comercios y catering ahora se encuentra dentro del espacio de trabajo estratégico del patrimonio",
  "estate.summary.partnershipsAlertDescription":
    "\nLas licencias y arrendamientos rurales, los registros de ingresos de terceros y la supervisión de servicios de catering de ESS ahora se capturan como registros de acuerdos de patrimonio duradero vinculados a sitios y equipos.",
  "estate.summary.partnershipsTitle": "\nCoordinación de tierras y socios",
  "estate.summary.partnershipsDescription":
    "\nUtilice este registro para gestionar el uso del suelo rural, la actividad comercial de terceros y la coordinación de catering en el mismo sitio y gráfico de activos que impulsa las operaciones inmobiliarias.",
  "estate.summary.partnershipsRegister": "\nRegistro de acuerdos",
  "estate.summary.partnershipsRegisterDesc":
    "{count} registros de acuerdo están actualmente activos dentro del registro de patrimonio.",
  "estate.summary.partnershipsRural": "\nConvenios rurales",
  "estate.summary.partnershipsRuralDesc":
    "\nLos registros de pastoreo, arrendamiento y acceso a la tierra ahora conviven con las operaciones de propiedad.",
  "estate.summary.partnershipsCommercial": "\nIngresos comerciales",
  "estate.summary.partnershipsCommercialDesc":
    "\n{count} registros de acuerdo actualmente vinculados directamente a un activo para la supervisión de utilización.",
  "estate.summary.partnershipsCoordination": "\nConflictos de coordinación",
  "estate.summary.partnershipsCoordinationDesc":
    "\nLa supervisión del catering actualmente tiene un promedio de {score} en todos los registros de servicio calificados.",
  "estate.summary.partnershipsCateringValue": "\n{score}% puntuación promedio",
  "estate.summary.partnershipsCateringValueEmpty": "\nsin registros puntuados",
  "estate.summary.stewardshipAlertTitle":
    "\nLos controles forestales, patrimoniales y ambientales ahora comparten un registro de administración de patrimonio",
  "estate.summary.stewardshipAlertDescription":
    "\nLos cronogramas de bosques, la presión para el consentimiento del patrimonio, el monitoreo de hábitats y los registros de especies protegidas ahora se encuentran en el mismo sitio y gráfico de activos que la entrega y la preparación.",
  "estate.summary.stewardshipTitle": "\nPostura de administración del patrimonio",
  "estate.summary.stewardshipDescription":
    "\nUtilice este registro para coordinar operaciones forestales, condición patrimonial y presión de consentimiento, y obligaciones de gestión ambiental sin abandonar el espacio de trabajo de la finca.",
  "estate.summary.stewardshipRegister": "\nRegistro de mayordomía",
  "estate.summary.stewardshipRegisterDesc":
    "\n{count} los registros de gestión actualmente requieren atención en riesgo o basada en el cumplimiento.",
  "estate.summary.stewardshipForestry": "\nRegistros forestales",
  "estate.summary.stewardshipForestryDesc":
    "\nEl valor de la producción de madera rastreado asciende actualmente a {value} entre los rendimientos forestales registrados.",
  "estate.summary.stewardshipHeritage": "\nRegistros patrimoniales",
  "estate.summary.stewardshipHeritageDesc":
    "\n{count} artículos de consentimiento de obras permanecen actualmente en la cola de aprobación de patrimonio.",
  "estate.summary.stewardshipEnvironment": "\nRegistros ambientales",
  "estate.summary.stewardshipEnvironmentDesc":
    "\n{count} registros de especies protegidas están actualmente activos en el registro de administración.",
  "estate.summary.operationsAlertTitle":
    "\nLas operaciones de campo, la seguridad, la puntería y el GFE ahora comparten un registro de control de patrimonio duradero",
  "estate.summary.operationsAlertDescription":
    "\nLa preparación del rango de entrenamiento, los defectos de seguridad, la disponibilidad de objetivos y la postura de reemplazo de GFE ahora se encuentran en el mismo sitio y gráfico de activos que la entrega, la preparación y los controles de P3M.",
  "estate.summary.operationsTitle": "\nControles operativos del centro de formación",
  "estate.summary.operationsDescription":
    "\nUtilice este registro para gestionar la actividad TAROM, el cumplimiento de seguridad MOD, el ciclo de vida de los objetivos y la postura de los equipos proporcionados por el gobierno sin salir del espacio de trabajo del patrimonio.",
  "estate.summary.operationsRegister": "Registro de control operativo",
  "estate.summary.operationsRegisterDesc":
    "\nLos registros {count} actualmente muestran una postura operativa restringida o que no cumple con las normas.",
  "estate.summary.operationsRanges": "\nOperaciones de rango",
  "estate.summary.operationsRangesDesc":
    "\n{count} registros de disponibilidad de rango están actualmente marcados como disponibles.",
  "estate.summary.operationsTargetry": "\nRegistros de puntería",
  "estate.summary.operationsTargetryDesc":
    "\n{count} carriles o sistemas objetivo están registrados actualmente como disponibles.",
  "estate.summary.operationsGfe": "\nRegistros GFE",
  "estate.summary.operationsGfeDesc":
    "\n{count} los artículos de reemplazo permanecen actualmente dentro de la cola activa de GFE.",
  "estate.summary.strategyAlertTitle":
    "\nLos planes de activos estratégicos ahora se encuentran dentro del mismo espacio de trabajo patrimonial que las finanzas, la entrega y las aprobaciones",
  "estate.summary.strategyAlertDescription":
    "\nMantener el Plan Estratégico de Gestión de Activos como un registro patrimonial duradero vinculado a las etapas del ciclo de vida, la postura de priorización y los escenarios opcionales de planificación financiera.",
  "estate.summary.strategyTitle": "\nPostura estratégica de gestión de activos",
  "estate.summary.strategyDescription":
    "\nUtilice esta capa para mantener la planificación ISO 55001 alineada con los objetivos organizacionales, la priorización basada en riesgos, los objetivos de desempeño de los activos y las decisiones de inversión en infraestructura a largo plazo.",
  "estate.summary.strategyRegister": "\nPlanes estratégicos",
  "estate.summary.strategyRegisterDesc":
    "\n{count} elementos del plan permanecen actualmente dentro de la cola de aprobación de estrategia activa.",
  "estate.summary.strategyLongHorizon": "\nPlanes a largo plazo",
  "estate.summary.strategyLongHorizonDesc":
    "\nPlanes con horizontes de infraestructura o de ciclo de vida iguales o superiores al umbral de planificación a largo plazo.",
  "estate.summary.strategyFinanceLinked": "\nPlanes vinculados a finanzas",
  "estate.summary.strategyFinanceLinkedDesc":
    "\nPlanes estratégicos ya vinculados directamente a escenarios de planificación financiera guardados.",
  "estate.summary.strategyRiskLed": "\nPlanes basados en riesgos",
  "estate.summary.strategyRiskLedDesc":
    "\nEl horizonte promedio de planificación estratégica es actualmente de {average} meses en todo el registro.",
  "estate.strategyForm.title": "\nMantener el plan estratégico de gestión de activos",
  "estate.strategyForm.description":
    "\nCapture registros de estrategia patrimonial alineados con ISO 55001 que conectan los objetivos organizacionales, la postura del ciclo de vida, la priorización basada en riesgos y la planificación de inversiones a largo plazo.",
  "estate.strategyForm.badge": "\nPlan estratégico SAM",
  "estate.strategyForm.nameLabel": "\nTítulo del plan",
  "estate.strategyForm.namePlaceholder": "\nPlan estratégico de renovación del predio norte",
  "estate.strategyForm.nameHint":
    "\nUtilice un título que pueda permanecer estable en los paquetes de gobernanza, informes DIO y revisiones de planificación.",
  "estate.strategyForm.scopeLabel": "\nAlcance del patrimonio",
  "estate.strategyForm.scopePlaceholder":
    "\nPolígono de formación norte, rangos regionales o segmento de polígono empresarial",
  "estate.strategyForm.scopeHint":
    "Mantenga el alcance alineado con la huella patrimonial o la cartera de capacidades que rige el plan.",
  "estate.strategyForm.objectiveLabel": "\nObjetivo organizacional",
  "estate.strategyForm.objectiveHint":
    "\nElija el objetivo organizacional principal con el que se alinea este plan estratégico.",
  "estate.strategyForm.lifecycleLabel": "\nEnfoque del ciclo de vida",
  "estate.strategyForm.lifecycleHint":
    "\nNombre la etapa dominante del ciclo de vida que el plan está gestionando actualmente.",
  "estate.strategyForm.prioritisationLabel": "\nBase de priorización",
  "estate.strategyForm.prioritisationHint":
    "\nMuestre si el plan está liderado por el riesgo, el desempeño, el cumplimiento, la demanda o la postura de valor.",
  "estate.strategyForm.horizonLabel": "\nHorizonte de planificación",
  "estate.strategyForm.horizonHint":
    "\nUtilice la ventana de planificación en meses para tomar decisiones sobre infraestructura y ciclo de vida a largo plazo.",
  "estate.strategyForm.financeScenarioLabel": "\nEscenario de planificación financiera",
  "estate.strategyForm.financeScenarioHint":
    "\nOpcionalmente, vincule el plan directamente a un escenario de planificación financiera guardado para la transferencia de inversiones.",
  "estate.strategyForm.financeScenarioOptional": "\nSin escenario financiero vinculado",
  "estate.strategyForm.performanceTargetLabel": "\nObjetivo de rendimiento",
  "estate.strategyForm.performanceTargetPlaceholder":
    "\nRestaurar el 95% de disponibilidad de alcance en carriles restringidos",
  "estate.strategyForm.performanceTargetHint":
    "\nNombre el resultado medible de servicio, preparación o condición que este plan está impulsando.",
  "estate.strategyForm.investmentCaseLabel": "\nCaso de inversión e infraestructura",
  "estate.strategyForm.investmentCasePlaceholder":
    "\nSecuenciar la actualización de civiles, servicios públicos y ciclo de vida durante el siguiente período de control.",
  "estate.strategyForm.investmentCaseHint":
    "\nResuma el caso de inversión en infraestructura a largo plazo o la lógica de intervención del ciclo de vida.",
  "estate.strategyForm.approvalLabel": "\nPostura de aprobación",
  "estate.strategyForm.approvalHint":
    "\nRealice un seguimiento de si el plan estratégico aún está en borrador, presentado, aprobado o rechazado.",
  "estate.strategyForm.notesLabel": "\nAlbaranes de entrega",
  "estate.strategyForm.notesPlaceholder":
    "\nCapture dependencias, revise la cadencia o los puntos de vigilancia del rendimiento de los activos.",
  "estate.strategyForm.notesHint":
    "\nUtilice notas para el contexto de gobernanza que deben permanecer visibles durante el mantenimiento del plan.",
  "estate.strategyForm.requiredHint":
    "\nLos campos obligatorios deben completarse antes de poder guardar el plan.",
  "estate.strategyForm.submit": "\nGuardar plan estratégico",
  "estate.strategyForm.submitAria": "\nGuardar plan estratégico de gestión de activos",
  "estate.strategyForm.recentTitle": "\nRegistro del plan estratégico",
  "estate.strategyForm.recentDescription":
    "\nLos planes estratégicos recientes permanecen presentados junto con su postura del ciclo de vida, estado de aprobación y vínculo financiero.",
  "estate.strategyForm.empty": "\nAún no se han capturado planes de activos estratégicos.",
  "estate.strategyForm.notesEmpty": "\nNo se capturaron albaranes de entrega adicionales.",
  "estate.strategyForm.feedback.saved":
    "\nPlan estratégico de gestión de activos guardado en el espacio de trabajo del patrimonio.",
  "estate.strategyForm.feedback.saveFailed":
    "\nNo se puede persistir en el plan estratégico de gestión de activos en este momento.",
  "estate.strategyForm.summary.approvalQueue": "{count} en flujo de aprobación",
  "estate.strategyForm.summary.financeLinked": "\n{count} vinculado a las finanzas",
  "estate.strategyForm.summary.horizonPosture":
    "\n{long} plan(es) a largo plazo, {risk} plan(es) basado en riesgos, {average} horizonte promedio mensual.",
  "estate.strategyForm.tableAria": "\nPlanes estratégicos de gestión de activos",
  "estate.strategyForm.table.plan": "\nPlan",
  "estate.strategyForm.table.scope": "\nAlcance y objetivo",
  "estate.strategyForm.table.lifecycle": "\nCiclo de vida y prioridad",
  "estate.strategyForm.table.performance": "\nRendimiento y horizonte",
  "estate.strategyForm.table.approval": "\nEnlace de aprobación y financiación",
  "estate.strategyForm.table.investment": "\nCaso de inversión",
  "estate.strategyForm.table.updatedAt": "\nActualizado {date}",
  "estate.strategyForm.table.horizonValue": "\n{months} meses",
  "estate.strategyForm.table.financeScenarioUnlinked": "\nSin escenario financiero vinculado",
  "estate.strategyForm.validation.titleRequired": "\nSe requiere título del plan estratégico.",
  "estate.strategyForm.validation.scopeRequired": "\nSe requiere el alcance del plan estratégico.",
  "estate.strategyForm.validation.objectiveRequired":
    "\nSe requiere un objetivo estratégico para el plan.",
  "estate.strategyForm.validation.lifecycleRequired":
    "\nSe requiere un enfoque de ciclo de vida para el plan.",
  "estate.strategyForm.validation.prioritisationRequired":
    "\nSe requiere una base de priorización para el plan.",
  "estate.strategyForm.validation.horizonRange":
    "\nEl horizonte de planificación debe estar entre {min} y {max} meses.",
  "estate.strategyForm.validation.performanceTargetRequired":
    "\nSe requiere un objetivo de desempeño para el plan.",
  "estate.strategyForm.validation.investmentCaseRequired":
    "\nSe requiere un caso de inversión e infraestructura para el plan.",
  "estate.strategyForm.validation.financeScenarioInvalid":
    "\nNo se pudo encontrar el escenario de planificación financiera seleccionado.",
  "estate.strategyForm.validation.approvalRequired":
    "\nSe requiere una postura de aprobación válida para el plan.",
  "estate.strategyForm.objective.CAPABILITY_READINESS": "\nDisponibilidad de capacidad",
  "estate.strategyForm.objective.COMPLIANCE_ASSURANCE": "\nGarantía de cumplimiento",
  "estate.strategyForm.objective.SERVICE_PERFORMANCE": "\nRendimiento del servicio",
  "estate.strategyForm.objective.LIFECYCLE_SUSTAINMENT": "\nMantenimiento del ciclo de vida",
  "estate.strategyForm.objective.INFRASTRUCTURE_INVESTMENT": "\nInversión en infraestructura",
  "estate.strategyForm.lifecycle.ACQUIRE": "\nAdquirir",
  "estate.strategyForm.lifecycle.OPERATE": "\nOperar",
  "estate.strategyForm.lifecycle.MAINTAIN": "\nMantener",
  "estate.strategyForm.lifecycle.REFRESH": "\nActualizar",
  "estate.strategyForm.lifecycle.DISPOSE": "\nDesechar",
  "estate.strategyForm.prioritisation.RISK": "\nBasado en riesgos",
  "estate.strategyForm.prioritisation.PERFORMANCE": "\nBasado en el rendimiento",
  "estate.strategyForm.prioritisation.COMPLIANCE": "\nDirigido por el cumplimiento",
  "estate.strategyForm.prioritisation.DEMAND": "\nBasado en la demanda",
  "estate.strategyForm.prioritisation.VALUE": "\nBasado en valores",
  "estate.initiativeForm.title": "\nCrear una iniciativa patrimonial",
  "estate.initiativeForm.description":
    "\nCapture un registro de patrimonio estratégico que pueda sobrevivir en aprobaciones, revisiones de programas, seguimiento de FM y paquetes de informes.",
  "estate.initiativeForm.badge": "\nFlujo de patrimonio duradero",
  "estate.initiativeForm.nameLabel": "\nTítulo de la iniciativa",
  "estate.initiativeForm.namePlaceholder": "\nEstado de entrenamiento duro recuperación FM",
  "estate.initiativeForm.nameHint":
    "\nUtilice un título que pueda permanecer estable en aprobaciones, informes y traspasos de operadores.",
  "estate.initiativeForm.scopeLabel": "\nAlcance del patrimonio",
  "estate.initiativeForm.scopePlaceholder":
    "\nCordilleras del sur, edificios patrimoniales o apoyo a la flota regional",
  "estate.initiativeForm.scopeHint":
    "\nNombre la porción del patrimonio, la geografía, el área del contrato o la huella operativa afectada.",
  "estate.initiativeForm.domainLabel": "\nDominio",
  "estate.initiativeForm.domainHint":
    "\nElija el flujo de trabajo de patrimonio en el que avanza principalmente la iniciativa.",
  "estate.initiativeForm.domain.STRATEGIC_ASSET": "\nGestión Estratégica de Activos",
  "estate.initiativeForm.domain.HARD_FM": "\nDuro FM",
  "estate.initiativeForm.domain.SOFT_FM": "\nSuave FM",
  "estate.initiativeForm.domain.RANGE_OPERATIONS": "\nOperaciones de rango",
  "estate.initiativeForm.domain.RANGE_SAFETY": "\nSeguridad de alcance",
  "estate.initiativeForm.domain.TARGETRY": "\nObjetivo",
  "estate.initiativeForm.domain.GFE": "Equipo provisto por el gobierno",
  "estate.initiativeForm.domain.FLEET": "\nFlota y Equipo",
  "estate.initiativeForm.domain.RURAL": "\nFinca Rústica",
  "estate.initiativeForm.domain.FORESTRY": "\nSilvicultura",
  "estate.initiativeForm.domain.HERITAGE": "\nPatrimonio",
  "estate.initiativeForm.domain.ENVIRONMENT": "\nGestión ambiental",
  "estate.initiativeForm.domain.COMMERCIAL": "\nIngresos de terceros",
  "estate.initiativeForm.domain.CATERING": "\nIntegración de catering",
  "estate.initiativeForm.domain.P3M": "\nEntrega P3M",
  "estate.initiativeForm.priorityLabel": "\nPrioridad",
  "estate.initiativeForm.priorityHint":
    "\nColoque la iniciativa en el horizonte operativo del patrimonio actual.",
  "estate.initiativeForm.priority.NOW": "\nAhora",
  "estate.initiativeForm.priority.NEXT": "\nSiguiente",
  "estate.initiativeForm.priority.LATER": "\nMás tarde",
  "estate.initiativeForm.priority.WATCH": "\nVer",
  "estate.initiativeForm.approvalLabel": "\nEstado de aprobación",
  "estate.initiativeForm.approvalHint":
    "\nRealice un seguimiento de la situación actual de la iniciativa en el proceso de aprobación del programa.",
  "estate.initiativeForm.approval.DRAFT": "\nRevisión",
  "estate.initiativeForm.approval.SUBMITTED": "\nEnviado",
  "estate.initiativeForm.approval.APPROVED": "Aprobado",
  "estate.initiativeForm.approval.REJECTED": "\nRechazado",
  "estate.initiativeForm.notesLabel": "\nNotas y suposiciones",
  "estate.initiativeForm.notesPlaceholder":
    "\nCaptar riesgos, vínculos de capacidad, implicaciones contractuales o supuestos del ciclo de vida.",
  "estate.initiativeForm.notesHint":
    "\nUtilícelo para preservar el contexto que debería sobrevivir en las aprobaciones, la planificación financiera y los informes.",
  "estate.initiativeForm.requiredHint":
    "\nSe requieren título, alcance patrimonial, dominio, prioridad y estado de aprobación.",
  "estate.initiativeForm.submit": "\nIniciativa para salvar el patrimonio",
  "estate.initiativeForm.submitAria": "\nIniciativa para salvar el patrimonio",
  "estate.initiativeForm.recentTitle": "\nIniciativas inmobiliarias recientes",
  "estate.initiativeForm.recentDescription":
    "\nEstas iniciativas ahora persisten como registros patrimoniales duraderos sin salir del espacio de trabajo de SSR.",
  "estate.initiativeForm.empty": "\nAún no se han capturado iniciativas inmobiliarias.",
  "estate.initiativeForm.savedAt": "\nActualizado {updatedAt}",
  "estate.initiativeForm.notesEmpty": "\nAún no se han capturado notas.",
  "estate.initiativeForm.validation.titleRequired": "\nSe requiere el título de la iniciativa.",
  "estate.initiativeForm.validation.scopeRequired": "\nSe requiere alcance patrimonial.",
  "estate.initiativeForm.validation.domainRequired": "\nSe requiere dominio.",
  "estate.initiativeForm.validation.priorityRequired": "\nSe requiere prioridad.",
  "estate.initiativeForm.validation.approvalRequired": "\nSe requiere estado de aprobación.",
  "estate.initiativeForm.feedback.saved":
    "\nIniciativa de patrimonio guardada en el espacio de trabajo de patrimonio.",
  "estate.initiativeForm.feedback.saveFailed":
    "\nNo se puede conservar la iniciativa patrimonial en este momento.",
  "estate.projectForm.title": "\nRegistrar un proyecto inmobiliario",
  "estate.projectForm.description":
    "\nCapture un registro de proyecto de patrimonio duradero con aprobación, situación financiera, de recursos y de riesgo dentro del espacio de trabajo de patrimonio de SSR.",
  "estate.projectForm.badge": "\nRegistro P3M",
  "estate.projectForm.nameLabel": "\nTítulo del proyecto",
  "estate.projectForm.namePlaceholder": "\nRecuperación de infraestructura de alcance regional",
  "estate.projectForm.nameHint":
    "\nUtilice un título que se mantenga estable en registros, aprobaciones, revisiones financieras e informes de entrega.",
  "estate.projectForm.programmeLabel": "\nNombre del programa",
  "estate.projectForm.programmePlaceholder":
    "\nMejora del ciclo de vida del patrimonio de formación",
  "estate.projectForm.programmeHint":
    "\nAgrupe el proyecto en el programa o línea de cartera utilizada para los informes patrimoniales.",
  "estate.projectForm.scopeLabel": "\nAlcance del patrimonio",
  "estate.projectForm.scopePlaceholder":
    "\nPaquete de rangos del sur, grupo de patrimonio o cartera regional de FM duro",
  "estate.projectForm.scopeHint":
    "\nNombre la geografía, el área del contrato, la porción del patrimonio o la huella operativa afectada.",
  "estate.projectForm.deliveryTypeLabel": "\nTipo de entrega",
  "estate.projectForm.deliveryTypeHint":
    "\nDistinguir entre flujo de proyectos de gran volumen y entrega de infraestructura compleja.",
  "estate.projectForm.deliveryType.HIGH_VOLUME_LOW_VALUE": "\nAlto volumen y bajo valor",
  "estate.projectForm.deliveryType.COMPLEX_INFRASTRUCTURE": "\nInfraestructura compleja",
  "estate.projectForm.approvalLabel": "\nEstado de aprobación",
  "estate.projectForm.approvalHint":
    "\nRealice un seguimiento de si el proyecto aún está en borrador, activamente en aprobación, aprobado o rechazado.",
  "estate.projectForm.approvalStageLabel": "\nEtapa de aprobación",
  "estate.projectForm.approvalStageHint":
    "\nRealice un seguimiento de la ubicación actual del proyecto en el DIO y el flujo de gobierno interno.",
  "estate.projectForm.approvalStage.REGISTERED": "\nRegistrado",
  "estate.projectForm.approvalStage.BUSINESS_CASE": "\nCaso de negocio",
  "estate.projectForm.approvalStage.DIO_REVIEW": "\nRevisión de DIO",
  "estate.projectForm.approvalStage.COMMERCIAL_REVIEW": "\nReseña comercial",
  "estate.projectForm.approvalStage.DELIVERY_AUTHORIZATION": "\nAutorización de entrega",
  "estate.projectForm.approvalStage.IN_DELIVERY": "\nEn entrega",
  "estate.projectForm.approvalStage.CLOSED": "\nCerrado",
  "estate.projectForm.approvalAuthorityLabel": "\nAutoridad de aprobación",
  "estate.projectForm.approvalAuthorityPlaceholder":
    "Líder regional de DIO, junta comercial o panel de entrega de bienes",
  "estate.projectForm.approvalAuthorityHint":
    "\nNombre la autoridad o junta actualmente responsable de la próxima decisión de aprobación.",
  "estate.projectForm.budgetAmountLabel": "\nMonto del presupuesto",
  "estate.projectForm.budgetAmountHint":
    "\nCapture la línea base del presupuesto actual aprobado o propuesto para el proyecto.",
  "estate.projectForm.committedCostLabel": "\nCosto comprometido",
  "estate.projectForm.committedCostHint":
    "\nRegistre el costo comprometido actual ya adjunto al proyecto.",
  "estate.projectForm.forecastFinalCostLabel": "\nPrevisión de coste final",
  "estate.projectForm.forecastFinalCostHint":
    "\nRealice un seguimiento del coste final previsto más reciente para el seguimiento de la entrega.",
  "estate.projectForm.retentionAmountLabel": "\nMonto de retención",
  "estate.projectForm.retentionAmountHint":
    "\nCapture el valor comercial retenido que aún se conserva hasta su finalización o aceptación.",
  "estate.projectForm.riskProvisionAmountLabel": "\nProvisión de riesgos",
  "estate.projectForm.riskProvisionAmountHint":
    "\nRealice un seguimiento de la provisión financiera actual reservada para la exposición al riesgo del proyecto.",
  "estate.projectForm.plannedResourcesLabel": "\nRecursos planificados",
  "estate.projectForm.plannedResourcesHint":
    "\nCapture la fuerza laboral planificada o la asignación de recursos de entrega.",
  "estate.projectForm.actualResourcesLabel": "\nRecursos reales",
  "estate.projectForm.actualResourcesHint":
    "\nCapture la fuerza laboral real o la utilización de recursos de entrega actualmente asignados.",
  "estate.projectForm.riskLevelLabel": "\nNivel de riesgo",
  "estate.projectForm.riskLevelHint":
    "\nResalte la postura cualitativa actual del riesgo de entrega del proyecto.",
  "estate.projectForm.riskLevel.LOW": "\nBajo",
  "estate.projectForm.riskLevel.MODERATE": "\nModerado",
  "estate.projectForm.riskLevel.HIGH": "\nAlto",
  "estate.projectForm.riskLevel.CRITICAL": "\nCrítico",
  "estate.projectForm.notesLabel": "\nNotas y suposiciones",
  "estate.projectForm.notesPlaceholder":
    "\nCapture los supuestos de cambio, dependencia, riesgo, comerciales o de aprobación de DIO que deberían sobrevivir en los informes.",
  "estate.projectForm.notesHint":
    "\nUtilícelo para preservar el contexto de gobernanza y entrega junto con la entrada del registro del proyecto.",
  "estate.projectForm.requiredHint":
    "\nEl título del proyecto, el programa, el alcance, los campos de aprobación, los campos financieros, los campos de recursos y el nivel de riesgo son obligatorios.",
  "estate.projectForm.submit": "\nGuardar proyecto inmobiliario",
  "estate.projectForm.submitAria": "\nGuardar proyecto inmobiliario",
  "estate.projectForm.recentTitle": "\nProyectos inmobiliarios recientes",
  "estate.projectForm.recentDescription":
    "\nLas entradas recientes del registro de proyectos muestran presión de aprobación, situación financiera y conflicto de recursos dentro del espacio de trabajo del patrimonio.",
  "estate.projectForm.empty": "\nAún no se han capturado proyectos inmobiliarios.",
  "estate.projectForm.summary.approvalQueue": "\n{count} en espera de aprobación",
  "estate.projectForm.summary.delayed": "\n{count} retrasado",
  "estate.projectForm.summary.resourcePressure":
    "\nLos proyectos {count} actualmente muestran conflictos de recursos y {risk} están marcados como de alto riesgo.",
  "estate.projectForm.tableAria": "\nProyectos inmobiliarios",
  "estate.projectForm.table.project": "\nProyecto",
  "estate.projectForm.table.scope": "\nAlcance",
  "estate.projectForm.table.approval": "\nAprobación",
  "estate.projectForm.table.authority": "\nAutoridad",
  "estate.projectForm.table.budget": "\nPresupuesto",
  "estate.projectForm.table.provisions": "\nProvisiones",
  "estate.projectForm.table.resources": "\nRecursos",
  "estate.projectForm.table.risk": "\nRiesgo",
  "estate.projectForm.table.daysInStage": "\n{days} días en etapa",
  "estate.projectForm.table.forecastValue": "\nPronóstico {value}",
  "estate.projectForm.table.resourcesValue": "\nPlanificado {planned} / Real {actual}",
  "estate.projectForm.table.resourceConflict": "\nConflicto de recursos",
  "estate.projectForm.table.delayFlag": "\nRetraso de aprobación",
  "estate.projectForm.validation.titleRequired": "\nEl título del proyecto es obligatorio.",
  "estate.projectForm.validation.programmeRequired": "\nEl nombre del programa es obligatorio.",
  "estate.projectForm.validation.scopeRequired": "\nSe requiere alcance patrimonial.",
  "estate.projectForm.validation.deliveryTypeRequired": "\nSe requiere el tipo de entrega.",
  "estate.projectForm.validation.approvalRequired": "\nSe requiere estado de aprobación.",
  "estate.projectForm.validation.approvalStageRequired": "\nSe requiere etapa de aprobación.",
  "estate.projectForm.validation.approvalAuthorityRequired": "Se requiere autoridad de aprobación.",
  "estate.projectForm.validation.budgetAmount": "\nEl monto del presupuesto debe ser cero o mayor.",
  "estate.projectForm.validation.committedCost": "\nEl costo comprometido debe ser cero o mayor.",
  "estate.projectForm.validation.forecastFinalCost":
    "\nEl costo final previsto debe ser cero o mayor.",
  "estate.projectForm.validation.retentionAmount": "\nEl monto de retención debe ser cero o mayor.",
  "estate.projectForm.validation.riskProvisionAmount":
    "\nLa provisión de riesgo debe ser cero o mayor.",
  "estate.projectForm.validation.plannedResources":
    "\nLos recursos planificados deben ser un número entero igual o superior a cero.",
  "estate.projectForm.validation.actualResources":
    "\nLos recursos reales deben ser un número entero igual o superior a cero.",
  "estate.projectForm.validation.riskLevelRequired": "\nSe requiere nivel de riesgo.",
  "estate.projectForm.feedback.saved":
    "\nProyecto inmobiliario guardado en el espacio de trabajo inmobiliario.",
  "estate.projectForm.feedback.saveFailed":
    "\nNo se puede conservar el proyecto inmobiliario en este momento.",
  "estate.projectControls.emptyTitle": "\nCrear un proyecto antes de capturar controles",
  "estate.projectControls.emptyDescription":
    "\nLos registros de riesgos y los registros de control de cambios se adjuntan directamente a una entrada de registro de proyecto patrimonial.",
  "estate.projectControls.emptyProjects": "\nNo hay proyectos inmobiliarios disponibles",
  "estate.projectRiskForm.title": "\nRegistro de riesgos del proyecto",
  "estate.projectRiskForm.description":
    "\nCapture registros de riesgo P3M duraderos contra proyectos inmobiliarios para que la exposición y la mitigación sobrevivan a las aprobaciones y los informes.",
  "estate.projectRiskForm.projectLabel": "\nProyecto inmobiliario",
  "estate.projectRiskForm.projectHint":
    "\nSeleccione la entrada del registro del proyecto propietaria de este registro de riesgo.",
  "estate.projectRiskForm.nameLabel": "\nTítulo del riesgo",
  "estate.projectRiskForm.namePlaceholder": "\nRevisión DIO retrasada en el paquete Range Civils",
  "estate.projectRiskForm.nameHint":
    "\nUtilice un título breve que pueda permanecer estable en todos los tableros de proyectos e informes.",
  "estate.projectRiskForm.impactAreaLabel": "\nÁrea de impacto",
  "estate.projectRiskForm.impactAreaHint":
    "\nIdentifique el área principal de parto afectada por la exposición al riesgo.",
  "estate.projectRiskForm.impactArea.COST": "\nCosto",
  "estate.projectRiskForm.impactArea.SCHEDULE": "\nHorario",
  "estate.projectRiskForm.impactArea.CAPABILITY": "\nCapacidad",
  "estate.projectRiskForm.impactArea.SAFETY": "\nSeguridad",
  "estate.projectRiskForm.impactArea.COMPLIANCE": "\nCumplimiento",
  "estate.projectRiskForm.severityLabel": "\nGravedad",
  "estate.projectRiskForm.severityHint":
    "\nUtilice la misma escala de gravedad cualitativa que el registro del proyecto.",
  "estate.projectRiskForm.statusLabel": "\nEstado de riesgo",
  "estate.projectRiskForm.statusHint":
    "\nRealice un seguimiento de si el riesgo está abierto, bajo mitigación, aceptado formalmente o cerrado.",
  "estate.projectRiskForm.status.OPEN": "\nAbierto",
  "estate.projectRiskForm.status.MITIGATING": "\nMitigando",
  "estate.projectRiskForm.status.ACCEPTED": "\nAceptado",
  "estate.projectRiskForm.status.CLOSED": "\nCerrado",
  "estate.projectRiskForm.ownerLabel": "\nPropietario",
  "estate.projectRiskForm.ownerPlaceholder": "\nControles del programa líder",
  "estate.projectRiskForm.ownerHint":
    "\nNombre el propietario responsable de conducir la mitigación o aceptación.",
  "estate.projectRiskForm.mitigationLabel": "\nPlan de mitigación",
  "estate.projectRiskForm.mitigationPlaceholder":
    "\nCapture el plan de respuesta, la ruta de escalada o el fundamento de aceptación.",
  "estate.projectRiskForm.mitigationHint":
    "\nPreservar la próxima acción de mitigación para que sobreviva en los paquetes de gobernanza.",
  "estate.projectRiskForm.targetDateLabel": "\nFecha objetivo",
  "estate.projectRiskForm.targetDateHint":
    "\nFecha objetivo opcional para el próximo punto de control de mitigación o decisión de cierre.",
  "estate.projectRiskForm.requiredHint":
    "Se requieren proyecto, título del riesgo, área de impacto, gravedad, estado, plan de mitigación y propietario.",
  "estate.projectRiskForm.submit": "\nGuardar riesgo del proyecto",
  "estate.projectRiskForm.submitAria": "\nGuardar riesgo del proyecto",
  "estate.projectRiskForm.summary.critical": "\n{count} crítico",
  "estate.projectRiskForm.tableAria": "\nRegistro de riesgos del proyecto",
  "estate.projectRiskForm.table.risk": "\nRiesgo",
  "estate.projectRiskForm.table.exposure": "\nExposición",
  "estate.projectRiskForm.table.status": "\nEstado",
  "estate.projectRiskForm.table.owner": "\nPropietario",
  "estate.projectRiskForm.table.mitigation": "\nMitigación",
  "estate.projectRiskForm.table.targetDateValue": "\nObjetivo {date}",
  "estate.projectRiskForm.table.targetDateEmpty": "\nNo se ha establecido una fecha objetivo",
  "estate.projectRiskForm.empty": "\nAún no se han capturado riesgos del proyecto.",
  "estate.projectRiskForm.validation.projectRequired":
    "\nSeleccione un proyecto inmobiliario válido.",
  "estate.projectRiskForm.validation.titleRequired": "\nSe requiere título de riesgo.",
  "estate.projectRiskForm.validation.impactAreaRequired": "\nSe requiere área de impacto.",
  "estate.projectRiskForm.validation.severityRequired": "\nSe requiere severidad.",
  "estate.projectRiskForm.validation.statusRequired": "\nSe requiere estado de riesgo.",
  "estate.projectRiskForm.validation.mitigationRequired": "\nSe requiere un plan de mitigación.",
  "estate.projectRiskForm.validation.ownerRequired": "\nSe requiere propietario del riesgo.",
  "estate.projectRiskForm.validation.targetDate":
    "\nLa fecha prevista debe ser una fecha del calendario válida.",
  "estate.projectRiskForm.feedback.saved":
    "\nRiesgo del proyecto guardado en el espacio de trabajo del patrimonio.",
  "estate.projectRiskForm.feedback.saveFailed":
    "\nNo se puede persistir el riesgo del proyecto en este momento.",
  "estate.projectChangeForm.title": "\nControl de cambios del proyecto",
  "estate.projectChangeForm.description":
    "\nCapture las solicitudes de cambio, el impacto en los costos y el cronograma y el estado de aprobación dentro del flujo del programa de patrimonio duradero.",
  "estate.projectChangeForm.projectLabel": "\nProyecto inmobiliario",
  "estate.projectChangeForm.projectHint":
    "\nSeleccione la entrada del registro del proyecto propietaria de este elemento de cambio.",
  "estate.projectChangeForm.nameLabel": "\nCambiar título",
  "estate.projectChangeForm.namePlaceholder":
    "\nAmpliar el alcance del paquete civil para incluir carriles objetivo",
  "estate.projectChangeForm.nameHint":
    "\nUtilice un título breve que pueda persistir en las actualizaciones de aprobación y entrega.",
  "estate.projectChangeForm.typeLabel": "\nTipo de cambio",
  "estate.projectChangeForm.typeHint":
    "\nIdentifique la principal categoría de control afectada por este elemento de cambio.",
  "estate.projectChangeForm.type.SCOPE": "\nAlcance",
  "estate.projectChangeForm.type.SCHEDULE": "\nHorario",
  "estate.projectChangeForm.type.COST": "\nCosto",
  "estate.projectChangeForm.type.RESOURCE": "\nRecurso",
  "estate.projectChangeForm.type.COMPLIANCE": "\nCumplimiento",
  "estate.projectChangeForm.statusLabel": "\nCambiar estado",
  "estate.projectChangeForm.statusHint":
    "\nRealice un seguimiento de si el cambio se propone, se está revisando, se aprueba, se rechaza o se implementa.",
  "estate.projectChangeForm.status.PROPOSED": "\nPropuesto",
  "estate.projectChangeForm.status.IN_REVIEW": "\nEn revisión",
  "estate.projectChangeForm.status.APPROVED": "Aprobado",
  "estate.projectChangeForm.status.REJECTED": "\nRechazado",
  "estate.projectChangeForm.status.IMPLEMENTED": "\nImplementado",
  "estate.projectChangeForm.scheduleImpactLabel": "\nImpacto en el cronograma (días)",
  "estate.projectChangeForm.scheduleImpactHint":
    "\nRegistre el efecto del cronograma actual esperado si el cambio continúa.",
  "estate.projectChangeForm.costImpactLabel": "\nImpacto en los costos",
  "estate.projectChangeForm.costImpactHint":
    "\nRegistre el efecto de costo estimado actual de la solicitud de cambio.",
  "estate.projectChangeForm.requestedByLabel": "\nSolicitado por",
  "estate.projectChangeForm.requestedByPlaceholder": "\nLíder de entrega regional",
  "estate.projectChangeForm.requestedByHint":
    "\nNombre el patrocinador, la junta directiva o el líder operativo que solicita el cambio.",
  "estate.projectChangeForm.notesLabel": "\nCambiar notas",
  "estate.projectChangeForm.notesPlaceholder":
    "\nCapture el cambio solicitado, las dependencias y las aprobaciones requeridas.",
  "estate.projectChangeForm.notesHint":
    "\nPreservar suficiente contexto para las juntas de revisión y los informes de entrega.",
  "estate.projectChangeForm.requiredHint":
    "\nSe requieren proyecto, título de cambio, tipo, estado, impacto en el cronograma, impacto en los costos, solicitante y notas.",
  "estate.projectChangeForm.submit": "\nGuardar cambio de proyecto",
  "estate.projectChangeForm.submitAria": "\nGuardar cambio de proyecto",
  "estate.projectChangeForm.summary.pending": "\n{count} pendiente",
  "estate.projectChangeForm.summary.approved": "\n{count} aprobado o implementado",
  "estate.projectChangeForm.tableAria": "\nControl de cambios del proyecto",
  "estate.projectChangeForm.table.change": "\nCambiar",
  "estate.projectChangeForm.table.type": "\nTipo",
  "estate.projectChangeForm.table.status": "\nEstado",
  "estate.projectChangeForm.table.impact": "\nImpacto",
  "estate.projectChangeForm.table.requestedBy": "\nSolicitado por",
  "estate.projectChangeForm.table.scheduleValue": "\n{days} impacto del horario del día",
  "estate.projectChangeForm.empty": "\nAún no se han capturado cambios en el proyecto.",
  "estate.projectChangeForm.validation.projectRequired":
    "\nSeleccione un proyecto inmobiliario válido.",
  "estate.projectChangeForm.validation.titleRequired": "Se requiere cambiar el título.",
  "estate.projectChangeForm.validation.changeTypeRequired": "\nSe requiere tipo de cambio.",
  "estate.projectChangeForm.validation.statusRequired": "\nSe requiere cambiar el estado.",
  "estate.projectChangeForm.validation.scheduleImpactDays":
    "\nEl impacto del cronograma debe ser un número entero igual o superior a cero.",
  "estate.projectChangeForm.validation.costImpactAmount":
    "\nEl impacto en los costos debe ser cero o mayor.",
  "estate.projectChangeForm.validation.requestedByRequired": "\nSe requiere solicitante.",
  "estate.projectChangeForm.validation.notesRequired": "\nSe requieren notas de cambio.",
  "estate.projectChangeForm.feedback.saved":
    "\nCambio de proyecto guardado en el espacio de trabajo del patrimonio.",
  "estate.projectChangeForm.feedback.saveFailed":
    "\nNo se puede conservar el cambio del proyecto en este momento.",
  "estate.agreementForm.title": "\nRegistrar un acuerdo patrimonial",
  "estate.agreementForm.description":
    "\nCapture el uso de la tierra rural, la actividad comercial de terceros y la supervisión del servicio de catering de ESS dentro de un registro de patrimonio duradero.",
  "estate.agreementForm.alertTitle":
    "\nUn registro cubre ahora la coordinación rural, comercial y de restauración",
  "estate.agreementForm.alertDescription":
    "\nLos registros rurales requieren una señal sobre el estado del terreno, los registros comerciales requieren ingresos y utilización, y los registros de catering requieren una puntuación de servicio.",
  "estate.agreementForm.domainLabel": "\nDominio",
  "estate.agreementForm.domainHint":
    "\nElija si este registro pertenece a gestión de finca rústica, uso comercial o supervisión de restauración.",
  "estate.agreementForm.domain.RURAL": "\nFinca rústica",
  "estate.agreementForm.domain.COMMERCIAL": "\nIngresos de terceros",
  "estate.agreementForm.domain.CATERING": "\nIntegración de catering",
  "estate.agreementForm.typeLabel": "\nTipo de acuerdo",
  "estate.agreementForm.typeHint":
    "\nSeleccione la licencia, arrendamiento, acceso o tipo de servicio que mejor se adapte al dominio seleccionado.",
  "estate.agreementForm.type.GRAZING_LICENSE": "\nLicencia de pastoreo",
  "estate.agreementForm.type.AGRICULTURAL_TENANCY": "\nArrendamiento agrícola",
  "estate.agreementForm.type.LAND_ACCESS": "\nAcuerdo de acceso a la tierra",
  "estate.agreementForm.type.COMMERCIAL_LICENSE": "\nLicencia de uso comercial",
  "estate.agreementForm.type.EVENT_LICENSE": "\nLicencia de evento y visitante",
  "estate.agreementForm.type.CATERING_SERVICE": "\nServicio de catering",
  "estate.agreementForm.nameLabel": "\nTítulo del acuerdo",
  "estate.agreementForm.namePlaceholder": "\nLicencia de pastoreo de las Cordilleras del Sur",
  "estate.agreementForm.nameHint":
    "\nUtilice un título que pueda sobrevivir en reuniones de supervisión, revisiones de socios e informes.",
  "estate.agreementForm.siteLabel": "\nSitio",
  "estate.agreementForm.siteHint":
    "\nAdjuntar el registro al sitio del inmueble titular de la coordinación operativa.",
  "estate.agreementForm.assetLabel": "\nActivo o equipo vinculado",
  "estate.agreementForm.assetHint":
    "\nOpcionalmente, vincule el registro a un activo específico o a un elemento de equipo de catering en el mismo sitio.",
  "estate.agreementForm.assetOptional": "\nNingún activo vinculado",
  "estate.agreementForm.counterpartyLabel": "\nContraparte",
  "estate.agreementForm.counterpartyPlaceholder":
    "\nESS, Hill Farm Partnership o Regional Events Ltd",
  "estate.agreementForm.counterpartyHint":
    "\nNombre el inquilino, socio, proveedor o contraparte comercial propietaria del acuerdo.",
  "estate.agreementForm.statusLabel": "\nEstado del acuerdo",
  "estate.agreementForm.statusHint":
    "\nRealice un seguimiento de si el registro está en borrador, activo, bajo vigilancia o vencido.",
  "estate.agreementForm.status.DRAFT": "\nRevisión",
  "estate.agreementForm.status.ACTIVE": "\nActivo",
  "estate.agreementForm.status.WATCH": "\nVer",
  "estate.agreementForm.status.EXPIRED": "\nCaducado",
  "estate.agreementForm.coordinationLabel": "\nCoordinación de entrenamiento",
  "estate.agreementForm.coordinationHint":
    "Muestre si el acuerdo actualmente se alinea con la actividad de capacitación, necesita vigilancia o está en conflicto.",
  "estate.agreementForm.coordination.ALIGNED": "\nAlineado",
  "estate.agreementForm.coordination.WATCH": "\nVer",
  "estate.agreementForm.coordination.CONFLICT": "\nConflicto",
  "estate.agreementForm.landConditionLabel": "\nCondición del terreno",
  "estate.agreementForm.landConditionHint":
    "\nRequerido para que los registros rurales monitoreen la presión del pastoreo, las condiciones de acceso o la postura de arrendamiento.",
  "estate.agreementForm.landCondition.GOOD": "\nBueno",
  "estate.agreementForm.landCondition.WATCH": "\nVer",
  "estate.agreementForm.landCondition.RECOVERY": "\nRecuperación requerida",
  "estate.agreementForm.revenueLabel": "\nValor anual",
  "estate.agreementForm.revenueHint":
    "\nRequerido para que los registros comerciales realicen un seguimiento de los ingresos anuales o del valor de la licencia.",
  "estate.agreementForm.utilisationLabel": "\nPorcentaje de utilización",
  "estate.agreementForm.utilisationHint":
    "\nRequerido para que los registros comerciales realicen un seguimiento del uso intensivo del sitio o activo con licencia.",
  "estate.agreementForm.performanceLabel": "\nPuntuación de servicio",
  "estate.agreementForm.performanceHint":
    "\nRequerido para que los registros de catering capturen el desempeño actual del servicio de ESS.",
  "estate.agreementForm.startDateLabel": "\nFecha de inicio",
  "estate.agreementForm.startDateHint":
    "\nFecha de inicio opcional para el plazo del acuerdo actual o período de supervisión.",
  "estate.agreementForm.endDateLabel": "\nFecha de finalización",
  "estate.agreementForm.endDateHint":
    "\nFecha de finalización opcional para el plazo del acuerdo actual o ventana de licencia.",
  "estate.agreementForm.notesLabel": "\nNotas operativas",
  "estate.agreementForm.notesPlaceholder":
    "\nCapture restricciones de capacitación, ventanas de acceso, obligaciones de socios o cobertura de equipos.",
  "estate.agreementForm.notesHint":
    "\nUtilice esto para preservar el contexto que debe sobrevivir en las revisiones patrimoniales y la coordinación de socios.",
  "estate.agreementForm.requiredHint":
    "\nSiempre se requieren título, dominio, tipo, sitio, contraparte, estado del acuerdo, estado de coordinación y notas. Las métricas específicas del dominio se validan automáticamente.",
  "estate.agreementForm.submit": "\nGuardar acuerdo patrimonial",
  "estate.agreementForm.submitAria": "\nGuardar acuerdo patrimonial",
  "estate.agreementForm.summary.active": "\n{count} activo",
  "estate.agreementForm.summary.conflicts": "\n{count} conflictos",
  "estate.agreementForm.empty": "\nAún no se han capturado acuerdos patrimoniales.",
  "estate.agreementForm.emptySites": "\nNo hay sitios activos disponibles",
  "estate.agreementForm.emptySitesTitle":
    "\nCrear un sitio antes de capturar acuerdos patrimoniales",
  "estate.agreementForm.emptySitesDescription":
    "\nLos registros rurales, comerciales y de catering se adjuntan directamente a un sitio administrado y a un activo opcional en el mismo sitio.",
  "estate.agreementForm.notesEmpty": "\nAún no se han capturado notas.",
  "estate.agreementForm.tableAria": "\nAcuerdos patrimoniales",
  "estate.agreementForm.table.agreement": "\nAcuerdo",
  "estate.agreementForm.table.domain": "\nDominio",
  "estate.agreementForm.table.site": "\nSitio y activo",
  "estate.agreementForm.table.status": "\nEstado",
  "estate.agreementForm.table.signal": "\nSeñal operativa",
  "estate.agreementForm.table.notes": "\nNotas",
  "estate.agreementForm.table.signalRural": "\nCondición del terreno: {condition}",
  "estate.agreementForm.table.signalCommercial": "\nIngresos {revenue} · {utilisation}",
  "estate.agreementForm.table.signalCatering": "\nServicio {score} · Activo {asset}",
  "estate.agreementForm.table.signalUtilisation": "\n{percent}% utilizado",
  "estate.agreementForm.table.signalScore": "\n{score}% puntuación",
  "estate.agreementForm.table.signalNone": "\nAún no se ha registrado ninguna señal operativa.",
  "estate.agreementForm.table.metricEmpty": "\nno grabado",
  "estate.agreementForm.table.assetUnlinked": "\nNingún activo vinculado",
  "estate.agreementForm.table.startDateValue": "\nIniciado {date}",
  "estate.agreementForm.table.startDateEmpty": "\nNo se registró fecha de inicio",
  "estate.agreementForm.validation.titleRequired": "\nSe requiere título del acuerdo.",
  "estate.agreementForm.validation.domainRequired": "\nElija un dominio de acuerdo válido.",
  "estate.agreementForm.validation.typeRequired": "\nElija un tipo de acuerdo válido.",
  "estate.agreementForm.validation.typeDomainMismatch":
    "Elija un tipo de acuerdo que coincida con el dominio seleccionado.",
  "estate.agreementForm.validation.siteRequired": "\nSeleccione un sitio inmobiliario válido.",
  "estate.agreementForm.validation.assetMismatch":
    "\nLos activos vinculados deben pertenecer al sitio inmobiliario seleccionado.",
  "estate.agreementForm.validation.counterpartyRequired": "\nSe requiere contraparte.",
  "estate.agreementForm.validation.statusRequired": "\nSe requiere estado del acuerdo.",
  "estate.agreementForm.validation.coordinationRequired":
    "\nSe requiere estado de coordinación de capacitación.",
  "estate.agreementForm.validation.landConditionRequired":
    "\nLos registros rurales requieren un estado de condición de la tierra.",
  "estate.agreementForm.validation.revenueRequired":
    "\nLos registros comerciales requieren un valor anual.",
  "estate.agreementForm.validation.utilisationRequired":
    "\nLos registros comerciales requieren un porcentaje de utilización.",
  "estate.agreementForm.validation.performanceRequired":
    "\nLos registros de catering requieren una puntuación de servicio.",
  "estate.agreementForm.validation.revenueInvalid": "\nEl valor anual debe ser cero o mayor.",
  "estate.agreementForm.validation.utilisationInvalid":
    "\nEl porcentaje de utilización debe ser un número entero entre 0 y 100.",
  "estate.agreementForm.validation.performanceInvalid":
    "\nLa puntuación del servicio debe ser un número entero entre 0 y 100.",
  "estate.agreementForm.validation.dateInvalid":
    "\nLas fechas deben ser valores de calendario válidos.",
  "estate.agreementForm.validation.dateOrderInvalid":
    "\nLa fecha de finalización debe ser igual o posterior a la fecha de inicio.",
  "estate.agreementForm.feedback.saved":
    "\nAcuerdo patrimonial guardado en el espacio de trabajo patrimonial.",
  "estate.agreementForm.feedback.saveFailed":
    "\nNo se puede conservar el acuerdo patrimonial en este momento.",
  "estate.stewardshipForm.title": "\nRegistrar un registro de mayordomía",
  "estate.stewardshipForm.description":
    "\nRegistrar las operaciones forestales, los controles patrimoniales y las obligaciones de gestión ambiental dentro de un registro de patrimonio duradero.",
  "estate.stewardshipForm.alertTitle":
    "\nUn registro de gestión ahora cubre los controles forestales, patrimoniales y ambientales",
  "estate.stewardshipForm.alertDescription":
    "\nLos registros de producción de madera requieren un valor medido, los registros de consentimiento de obras requieren una fecha objetivo y cada registro incluye una condición compartida y una postura de cumplimiento.",
  "estate.stewardshipForm.domainLabel": "\nDominio",
  "estate.stewardshipForm.domainHint":
    "\nElija si el registro pertenece a operaciones forestales, gestión del patrimonio o gestión ambiental.",
  "estate.stewardshipForm.domain.FORESTRY": "\nOperaciones forestales",
  "estate.stewardshipForm.domain.HERITAGE": "\nGestión de bienes patrimoniales",
  "estate.stewardshipForm.domain.ENVIRONMENT": "\nGestión ambiental",
  "estate.stewardshipForm.recordTypeLabel": "\nTipo de registro",
  "estate.stewardshipForm.recordTypeHint":
    "\nSeleccione el registro operativo, la encuesta, el cronograma o el elemento de consentimiento que mejor se ajuste al dominio de administración elegido.",
  "estate.stewardshipForm.recordType.WOODLAND_ASSET": "\nActivo arbolado",
  "estate.stewardshipForm.recordType.PLANTING_SCHEDULE": "\nCalendario de siembra",
  "estate.stewardshipForm.recordType.HARVEST_SCHEDULE": "\nCalendario de cosecha",
  "estate.stewardshipForm.recordType.TIMBER_OUTPUT": "\nSalida de madera",
  "estate.stewardshipForm.recordType.HERITAGE_ASSET": "\nBien patrimonial",
  "estate.stewardshipForm.recordType.CONSERVATION_SURVEY": "\nEstudio de conservación",
  "estate.stewardshipForm.recordType.WORKS_CONSENT": "\nConsentimiento de obras",
  "estate.stewardshipForm.recordType.BIODIVERSITY_MONITORING": "\nMonitoreo de la biodiversidad",
  "estate.stewardshipForm.recordType.HABITAT_SURVEY": "\nEncuesta de hábitat",
  "estate.stewardshipForm.recordType.ENVIRONMENTAL_INSPECTION": "\nInspección ambiental",
  "estate.stewardshipForm.recordType.PROTECTED_SPECIES": "\nRegistro de especies protegidas",
  "estate.stewardshipForm.nameLabel": "\nTítulo del disco",
  "estate.stewardshipForm.namePlaceholder": "\nRetorno de producción de bosques del sur",
  "estate.stewardshipForm.nameHint":
    "Utilice un título que pueda sobrevivir en revisiones de gestión, debates sobre cumplimiento y paquetes de informes.",
  "estate.stewardshipForm.siteLabel": "\nSitio",
  "estate.stewardshipForm.siteHint":
    "\nAdjunte el registro al sitio propietario de la obligación o actividad de administración actual.",
  "estate.stewardshipForm.assetLabel": "\nActivo vinculado",
  "estate.stewardshipForm.assetHint":
    "\nOpcionalmente, vincule el registro a un activo del mismo sitio, como una estructura catalogada, un activo forestal o un sistema monitoreado.",
  "estate.stewardshipForm.assetOptional": "\nNingún activo vinculado",
  "estate.stewardshipForm.statusLabel": "\nEstado del registro",
  "estate.stewardshipForm.statusHint":
    "\nRealice un seguimiento de si el registro de administración está en borrador, activo, bajo vigilancia o cerrado.",
  "estate.stewardshipForm.status.DRAFT": "\nRevisión",
  "estate.stewardshipForm.status.ACTIVE": "\nActivo",
  "estate.stewardshipForm.status.WATCH": "\nVer",
  "estate.stewardshipForm.status.CLOSED": "\nCerrado",
  "estate.stewardshipForm.conditionStatusLabel": "\nCondición postura",
  "estate.stewardshipForm.conditionStatusHint":
    "\nCapture si el bosque, elemento patrimonial o señal ambiental es favorable, se está recuperando o está en riesgo.",
  "estate.stewardshipForm.conditionStatus.FAVOURABLE": "\nFavorable",
  "estate.stewardshipForm.conditionStatus.RECOVERING": "\nRecuperando",
  "estate.stewardshipForm.conditionStatus.AT_RISK": "\nEn riesgo",
  "estate.stewardshipForm.complianceStatusLabel": "\nPostura de cumplimiento",
  "estate.stewardshipForm.complianceStatusHint":
    "\nRealice un seguimiento de si el registro actual cumple, está bajo vigilancia, espera consentimiento o no cumple.",
  "estate.stewardshipForm.complianceStatus.COMPLIANT": "\nCumple",
  "estate.stewardshipForm.complianceStatus.WATCH": "\nVer",
  "estate.stewardshipForm.complianceStatus.CONSENT_REQUIRED": "\nSe requiere consentimiento",
  "estate.stewardshipForm.complianceStatus.NON_COMPLIANT": "\nNo conforme",
  "estate.stewardshipForm.metricValueLabel": "\nValor medido",
  "estate.stewardshipForm.metricValueHint":
    "\nÚselo para producción de madera, recuentos de biodiversidad u otras medidas de gestión cuantificadas.",
  "estate.stewardshipForm.metricUnitLabel": "\nUnidad métrica",
  "estate.stewardshipForm.metricUnitPlaceholder": "\ntoneladas, hectáreas o avistamientos",
  "estate.stewardshipForm.metricUnitHint":
    "\nNombra la unidad asociada con el valor medido cuando se registra uno.",
  "estate.stewardshipForm.targetDateLabel": "\nFecha objetivo",
  "estate.stewardshipForm.targetDateHint":
    "\nUtilice esto para ventanas de cosecha, fechas de encuestas, fechas límite de inspección o hitos de consentimiento requeridos.",
  "estate.stewardshipForm.notesLabel": "\nNotas operativas",
  "estate.stewardshipForm.notesPlaceholder":
    "\nCapture restricciones de gestión, contexto de cumplimiento, áreas protegidas o dependencias operativas.",
  "estate.stewardshipForm.notesHint":
    "\nConserve suficientes detalles para revisiones de cumplimiento, coordinación de entregas e informes patrimoniales.",
  "estate.stewardshipForm.requiredHint":
    "\nSiempre se requieren título, dominio, tipo de registro, sitio, estado, postura de condición, postura de cumplimiento y notas. Las métricas específicas del dominio se validan automáticamente.",
  "estate.stewardshipForm.submit": "\nGuardar registro de administración",
  "estate.stewardshipForm.submitAria": "\nGuardar registro de administración",
  "estate.stewardshipForm.summary.atRisk": "\n{count} en riesgo",
  "estate.stewardshipForm.summary.consents": "\n{count} cola de consentimiento",
  "estate.stewardshipForm.empty": "\nAún no se han capturado registros de administración.",
  "estate.stewardshipForm.emptySites": "\nNo hay sitios activos disponibles",
  "estate.stewardshipForm.emptySitesTitle":
    "\nCree un sitio antes de capturar registros de administración",
  "estate.stewardshipForm.emptySitesDescription":
    "\nLos registros forestales, patrimoniales y de gestión ambiental se adjuntan directamente a un sitio administrado y a un activo opcional en el mismo sitio.",
  "estate.stewardshipForm.notesEmpty": "\nAún no se han capturado notas.",
  "estate.stewardshipForm.tableAria": "\nRegistros de mayordomía",
  "estate.stewardshipForm.table.record": "\nRegistro",
  "estate.stewardshipForm.table.domain": "\nDominio",
  "estate.stewardshipForm.table.site": "\nSitio y activo",
  "estate.stewardshipForm.table.status": "\nEstado",
  "estate.stewardshipForm.table.signal": "\nSeñal operativa",
  "estate.stewardshipForm.table.notes": "\nNotas",
  "estate.stewardshipForm.table.assetUnlinked": "\nNingún activo vinculado",
  "estate.stewardshipForm.table.updatedAt": "\nActualizado {date}",
  "estate.stewardshipForm.table.signalTimberOutput": "\n{value} {unit} grabado",
  "estate.stewardshipForm.table.signalConsent": "Postura de consentimiento: {status}",
  "estate.stewardshipForm.table.signalProtectedSpecies":
    "\nPostura de especie protegida: {condition}",
  "estate.stewardshipForm.table.signalTargetDate": "\nFecha prevista {date}",
  "estate.stewardshipForm.table.signalNone": "\nAún no se ha registrado ninguna señal operativa.",
  "estate.stewardshipForm.validation.titleRequired": "\nSe requiere título de mayordomía.",
  "estate.stewardshipForm.validation.domainRequired":
    "\nElija un dominio de administración válido.",
  "estate.stewardshipForm.validation.recordTypeRequired":
    "\nElija un tipo de registro de administración válido.",
  "estate.stewardshipForm.validation.recordTypeDomainMismatch":
    "\nElija un tipo de registro que coincida con el dominio de administración seleccionado.",
  "estate.stewardshipForm.validation.siteRequired": "\nSeleccione un sitio inmobiliario válido.",
  "estate.stewardshipForm.validation.assetMismatch":
    "\nLos activos vinculados deben pertenecer al sitio inmobiliario seleccionado.",
  "estate.stewardshipForm.validation.statusRequired": "\nSe requiere estatus de mayordomía.",
  "estate.stewardshipForm.validation.conditionStatusRequired":
    "\nSe requiere postura de condición.",
  "estate.stewardshipForm.validation.complianceStatusRequired":
    "\nSe requiere una postura de cumplimiento.",
  "estate.stewardshipForm.validation.metricValueRequired":
    "\nLos registros de producción de madera requieren un valor medido.",
  "estate.stewardshipForm.validation.metricValueInvalid":
    "\nEl valor medido debe ser cero o mayor.",
  "estate.stewardshipForm.validation.metricUnitRequired":
    "\nSe requiere unidad métrica cuando se registra un valor medido.",
  "estate.stewardshipForm.validation.targetDateRequired":
    "\nLos registros de consentimiento de trabajo requieren una fecha límite.",
  "estate.stewardshipForm.validation.targetDateInvalid":
    "\nLa fecha objetivo debe ser un valor de calendario válido.",
  "estate.stewardshipForm.feedback.saved":
    "\nRegistro de mayordomía guardado en el espacio de trabajo del patrimonio.",
  "estate.stewardshipForm.feedback.saveFailed":
    "\nNo se puede conservar el registro de administración en este momento.",
  "estate.fmGovernanceForm.title": "\nRegistrar un registro de gobernanza de FM",
  "estate.fmGovernanceForm.description":
    "\nCapture una gobernanza estricta de FM, garantía legal, cronogramas de servicio y una postura de referencia de FM suave dentro de un registro patrimonial.",
  "estate.fmGovernanceForm.alertTitle":
    "\nSFG20, SOP19 y la gobernanza suave de FM ahora se encuentran dentro de una superficie de control patrimonial",
  "estate.fmGovernanceForm.alertDescription":
    "\nLos registros de programación, inspección, auditoría y servicio utilizan fechas objetivo, mientras que los registros de mantenimiento reactivo y de referencia llevan valores de salida medidos.",
  "estate.fmGovernanceForm.domainLabel": "\nDominio",
  "estate.fmGovernanceForm.domainHint":
    "\nSepare la gobernanza de mantenimiento de FM estricta del servicio de FM suave y los controles de referencia.",
  "estate.fmGovernanceForm.domain.HARD_FM": "\nGobernanza FM dura",
  "estate.fmGovernanceForm.domain.SOFT_FM": "\nGobernanza FM suave",
  "estate.fmGovernanceForm.recordTypeLabel": "\nTipo de registro",
  "estate.fmGovernanceForm.recordTypeHint":
    "\nElija el mantenimiento planificado, la garantía, el servicio o el control de referencia que se está registrando.",
  "estate.fmGovernanceForm.recordType.PPM_SCHEDULE":
    "\nPrograma de mantenimiento preventivo planificado",
  "estate.fmGovernanceForm.recordType.SFG20_SCHEDULE": "\nPrograma de mantenimiento SFG20",
  "estate.fmGovernanceForm.recordType.STATUTORY_INSPECTION": "\nInspección legal",
  "estate.fmGovernanceForm.recordType.REACTIVE_MAINTENANCE":
    "\nRendimiento de mantenimiento reactivo",
  "estate.fmGovernanceForm.recordType.COMPLIANCE_AUDIT": "\nAuditoría de cumplimiento",
  "estate.fmGovernanceForm.recordType.ASSURANCE_REVIEW": "\nRevisión de garantía de mantenimiento",
  "estate.fmGovernanceForm.recordType.SERVICE_SCHEDULE": "\nHorario de servicio Soft FM",
  "estate.fmGovernanceForm.recordType.GROUNDS_PROGRAMME": "\nPrograma de mantenimiento de terrenos",
  "estate.fmGovernanceForm.recordType.WASTE_SERVICE": "\nPrograma de servicio de residuos",
  "estate.fmGovernanceForm.recordType.SERVICE_PERFORMANCE": "\nMedida de desempeño del servicio",
  "estate.fmGovernanceForm.recordType.PRODUCTIVITY_BENCHMARK":
    "\nPunto de referencia de productividad",
  "estate.fmGovernanceForm.recordType.INDUSTRY_BENCHMARK": "\nPunto de referencia de la industria",
  "estate.fmGovernanceForm.nameLabel": "\nTítulo del disco",
  "estate.fmGovernanceForm.namePlaceholder": "\nCiclo de inspección legal de la finca norte",
  "estate.fmGovernanceForm.nameHint":
    "\nAsigne un nombre al elemento de gobernanza de FM para que sobreviva en las revisiones operativas y en los paquetes de garantía patrimonial.",
  "estate.fmGovernanceForm.siteLabel": "\nSitio",
  "estate.fmGovernanceForm.siteHint":
    "Seleccione la ubicación del patrimonio propietaria del elemento de gestión de mantenimiento o servicio.",
  "estate.fmGovernanceForm.assetLabel": "\nActivo vinculado",
  "estate.fmGovernanceForm.assetHint":
    "\nVincular el control a un activo cuando el registro se aplica a un elemento de planta o componente de infraestructura específico.",
  "estate.fmGovernanceForm.assetOptional": "\nNingún activo vinculado",
  "estate.fmGovernanceForm.statusLabel": "\nEstado del registro",
  "estate.fmGovernanceForm.statusHint":
    "\nEstablezca si el elemento de gobernanza está activo, bajo vigilancia o cerrado.",
  "estate.fmGovernanceForm.status.DRAFT": "\nRevisión",
  "estate.fmGovernanceForm.status.ACTIVE": "\nActivo",
  "estate.fmGovernanceForm.status.WATCH": "\nVer",
  "estate.fmGovernanceForm.status.CLOSED": "\nCerrado",
  "estate.fmGovernanceForm.deliveryStatusLabel": "\nPostura de parto",
  "estate.fmGovernanceForm.deliveryStatusHint":
    "\nCapture si el cronograma o el servicio está según lo previsto, bajo presión o fuera de lo previsto.",
  "estate.fmGovernanceForm.deliveryStatus.ON_TRACK": "\nEn camino",
  "estate.fmGovernanceForm.deliveryStatus.UNDER_PRESSURE": "\nBajo presión",
  "estate.fmGovernanceForm.deliveryStatus.OFF_TRACK": "\nFuera de pista",
  "estate.fmGovernanceForm.complianceStatusLabel": "\nPostura de cumplimiento",
  "estate.fmGovernanceForm.complianceStatusHint":
    "\nRealice un seguimiento de si el control cumple, necesita acción o ha llegado a un nivel de incumplimiento.",
  "estate.fmGovernanceForm.complianceStatus.COMPLIANT": "\nCumple",
  "estate.fmGovernanceForm.complianceStatus.WATCH": "\nVer",
  "estate.fmGovernanceForm.complianceStatus.ACTION_REQUIRED": "\nAcción requerida",
  "estate.fmGovernanceForm.complianceStatus.NON_COMPLIANT": "\nNo conforme",
  "estate.fmGovernanceForm.metricValueLabel": "\nValor medido",
  "estate.fmGovernanceForm.metricValueHint":
    "\nUtilice un valor para mantenimiento reactivo, rendimiento y puntuación de referencia.",
  "estate.fmGovernanceForm.metricUnitLabel": "\nUnidad métrica",
  "estate.fmGovernanceForm.metricUnitPlaceholder": "\npuntaje, empleos, hectáreas u horas",
  "estate.fmGovernanceForm.metricUnitHint":
    "\nDescriba la unidad utilizada para el servicio medido o valor de referencia.",
  "estate.fmGovernanceForm.targetDateLabel": "\nFecha objetivo",
  "estate.fmGovernanceForm.targetDateHint":
    "\nUtilice fechas objetivo para cronogramas, inspecciones, auditorías, revisiones de aseguramiento y programas de servicio.",
  "estate.fmGovernanceForm.notesLabel": "\nNotas operativas",
  "estate.fmGovernanceForm.notesPlaceholder":
    "\nCapture SFG20, SOP19, desempeño del servicio, punto de referencia o detalles de mitigación que deben persistir en el registro patrimonial.",
  "estate.fmGovernanceForm.notesHint":
    "\nMantenga notas breves, operativas y específicas para el elemento de gobernanza de gestión financiera.",
  "estate.fmGovernanceForm.requiredHint":
    "\nSe requieren título, dominio, tipo, sitio, estados y notas. Algunos tipos de registros también requieren una métrica o una fecha objetivo.",
  "estate.fmGovernanceForm.submit": "\nGuardar registro de gobierno de FM",
  "estate.fmGovernanceForm.submitAria": "\nGuardar registro de gobierno de FM",
  "estate.fmGovernanceForm.summary.complianceAttention": "\n{count} necesita atención",
  "estate.fmGovernanceForm.summary.benchmarks": "\n{count} puntos de referencia seguidos",
  "estate.fmGovernanceForm.empty": "\nAún no se han capturado registros de gobernanza de FM.",
  "estate.fmGovernanceForm.emptySites": "\nNo hay sitios activos disponibles",
  "estate.fmGovernanceForm.emptySitesTitle":
    "\nCrear un sitio antes de capturar registros de gobernanza de FM",
  "estate.fmGovernanceForm.emptySitesDescription":
    "\nEl registro de gobierno de FM depende de la lista de sitios de la propiedad, por lo que los horarios y servicios se pueden vincular a la ubicación correcta.",
  "estate.fmGovernanceForm.notesEmpty": "\nAún no se han capturado notas.",
  "estate.fmGovernanceForm.tableAria": "\nRegistros de gobierno de FM",
  "estate.fmGovernanceForm.table.record": "\nRegistro",
  "estate.fmGovernanceForm.table.domain": "\nDominio",
  "estate.fmGovernanceForm.table.site": "\nSitio y activo",
  "estate.fmGovernanceForm.table.status": "\nEstado",
  "estate.fmGovernanceForm.table.signal": "\nSeñal operativa",
  "estate.fmGovernanceForm.table.notes": "\nNotas",
  "estate.fmGovernanceForm.table.assetUnlinked": "\nNingún activo vinculado",
  "estate.fmGovernanceForm.table.updatedAt": "\nActualizado {date}",
  "estate.fmGovernanceForm.table.signalMetric": "\n{value} {unit} grabado",
  "estate.fmGovernanceForm.table.signalTargetDate": "\nFecha prevista {date}",
  "estate.fmGovernanceForm.table.signalCompliance": "\nPostura de cumplimiento: {status}",
  "estate.fmGovernanceForm.validation.titleRequired": "\nSe requiere título de gobernanza de FM.",
  "estate.fmGovernanceForm.validation.domainRequired":
    "\nElija un dominio de gobierno de FM válido.",
  "estate.fmGovernanceForm.validation.recordTypeRequired":
    "\nElija un tipo de registro de gobierno de FM válido.",
  "estate.fmGovernanceForm.validation.recordTypeDomainMismatch":
    "\nElija un tipo de registro que coincida con el dominio de gobierno de FM seleccionado.",
  "estate.fmGovernanceForm.validation.siteRequired": "\nSeleccione un sitio inmobiliario válido.",
  "estate.fmGovernanceForm.validation.assetMismatch":
    "\nEl activo vinculado debe pertenecer al sitio inmobiliario seleccionado.",
  "estate.fmGovernanceForm.validation.statusRequired": "\nSe requiere estado de gobernanza de FM.",
  "estate.fmGovernanceForm.validation.deliveryStatusRequired":
    "Se requiere una postura de entrega de gobernanza de FM.",
  "estate.fmGovernanceForm.validation.complianceStatusRequired":
    "\nSe requiere una postura de cumplimiento de gobernanza de FM.",
  "estate.fmGovernanceForm.validation.metricValueRequired":
    "\nLos registros de mantenimiento reactivo, rendimiento y puntos de referencia requieren un valor medido.",
  "estate.fmGovernanceForm.validation.metricValueInvalid":
    "\nEl valor medido debe ser cero o mayor.",
  "estate.fmGovernanceForm.validation.metricUnitRequired":
    "\nSe requiere unidad métrica cuando se registra un valor medido.",
  "estate.fmGovernanceForm.validation.targetDateRequired":
    "\nLos registros de cronograma, inspección, auditoría, aseguramiento y servicio requieren una fecha objetivo.",
  "estate.fmGovernanceForm.validation.targetDateInvalid":
    "\nLa fecha objetivo debe ser un valor de calendario válido.",
  "estate.fmGovernanceForm.feedback.saved":
    "\nRegistro de gobierno de FM guardado en el espacio de trabajo del patrimonio.",
  "estate.fmGovernanceForm.feedback.saveFailed":
    "\nNo se puede conservar el registro de gobernanza de FM en este momento.",
  "estate.rangeControlForm.title": "\nRegistrar un rango y registro de control GFE",
  "estate.rangeControlForm.description":
    "\nCapture la actividad TAROM, los controles de seguridad del alcance, la postura del ciclo de vida de los objetivos y las señales de equipos proporcionados por el gobierno dentro de un registro de patrimonio duradero.",
  "estate.rangeControlForm.alertTitle":
    "\nUn registro de control operativo ahora cubre alcances, seguridad, tiro y GFE",
  "estate.rangeControlForm.alertDescription":
    "\nLos registros de disponibilidad y utilización requieren un valor medido, las acciones de inspección y recuperación requieren una fecha objetivo y los registros de destino o GFE requieren un activo vinculado en el mismo sitio.",
  "estate.rangeControlForm.domainLabel": "\nDominio",
  "estate.rangeControlForm.domainHint":
    "\nElija si el registro pertenece a la entrega TAROM, cumplimiento de seguridad de alcance, gestión de objetivos o supervisión del ciclo de vida de GFE.",
  "estate.rangeControlForm.domain.RANGE_OPERATIONS":
    "\nÁreas de entrenamiento y operaciones de campo",
  "estate.rangeControlForm.domain.RANGE_SAFETY": "\nCumplimiento de seguridad de la gama",
  "estate.rangeControlForm.domain.TARGETRY": "\nGestión del ciclo de vida de Targetry",
  "estate.rangeControlForm.domain.GFE": "\nEquipo proporcionado por el gobierno",
  "estate.rangeControlForm.recordTypeLabel": "\nTipo de registro",
  "estate.rangeControlForm.recordTypeHint":
    "\nSeleccione el registro de control operativo, inspección, disponibilidad, almacenamiento o reemplazo que mejor se ajuste al dominio seleccionado.",
  "estate.rangeControlForm.recordType.RANGE_REGISTRY": "\nRegistro de registro de rango",
  "estate.rangeControlForm.recordType.RANGE_AVAILABILITY": "\nDisponibilidad de rango",
  "estate.rangeControlForm.recordType.RANGE_PREPARATION": "\nVentana de preparación de rango",
  "estate.rangeControlForm.recordType.RANGE_RECOVERY": "\nVentana de recuperación de rango",
  "estate.rangeControlForm.recordType.SAFETY_INSPECTION": "\nInspección de seguridad",
  "estate.rangeControlForm.recordType.SAFETY_DEFECT": "\nDefecto de seguridad",
  "estate.rangeControlForm.recordType.CORRECTIVE_ACTION": "\nAcción correctiva",
  "estate.rangeControlForm.recordType.TARGET_ASSET": "\nActivo objetivo",
  "estate.rangeControlForm.recordType.TARGET_DEPLOYMENT": "\nVentana de implementación de destino",
  "estate.rangeControlForm.recordType.TARGET_STORAGE": "\nUbicación de almacenamiento de destino",
  "estate.rangeControlForm.recordType.TARGET_AVAILABILITY": "\nDisponibilidad objetivo",
  "estate.rangeControlForm.recordType.GFE_CONDITION": "\nCondición GFE",
  "estate.rangeControlForm.recordType.GFE_UTILISATION": "\nUtilización de GFE",
  "estate.rangeControlForm.recordType.GFE_REPLACEMENT": "\nPlan de reemplazo de GFE",
  "estate.rangeControlForm.nameLabel": "\nTítulo del disco",
  "estate.rangeControlForm.namePlaceholder":
    "\nRetorno de disponibilidad objetivo del sector norte",
  "estate.rangeControlForm.nameHint":
    "\nUtilice un título que pueda sobrevivir a las juntas de rango, las revisiones de cumplimiento y los informes operativos.",
  "estate.rangeControlForm.siteLabel": "\nSitio",
  "estate.rangeControlForm.siteHint":
    "\nAdjunte el registro al sitio del predio de capacitación que actualmente posee la actividad o control.",
  "estate.rangeControlForm.assetLabel": "\nActivo o equipo vinculado",
  "estate.rangeControlForm.assetHint":
    "\nVincular registros de objetivos y GFE al activo o elemento de equipo del mismo sitio que describen directamente.",
  "estate.rangeControlForm.assetOptional": "\nNingún activo vinculado",
  "estate.rangeControlForm.statusLabel": "\nEstado del registro",
  "estate.rangeControlForm.statusHint":
    "Realice un seguimiento de si el registro está en borrador, activo, bajo vigilancia o cerrado.",
  "estate.rangeControlForm.status.DRAFT": "\nRevisión",
  "estate.rangeControlForm.status.ACTIVE": "\nActivo",
  "estate.rangeControlForm.status.WATCH": "\nVer",
  "estate.rangeControlForm.status.CLOSED": "\nCerrado",
  "estate.rangeControlForm.operationalStatusLabel": "\nPostura operativa",
  "estate.rangeControlForm.operationalStatusHint":
    "\nCapture si el alcance, el sistema de seguridad, el recurso de puntería o el elemento GFE están disponibles, restringidos o no disponibles.",
  "estate.rangeControlForm.operationalStatus.AVAILABLE": "\nDisponible",
  "estate.rangeControlForm.operationalStatus.CONSTRAINED": "\nRestringido",
  "estate.rangeControlForm.operationalStatus.UNAVAILABLE": "\nNo disponible",
  "estate.rangeControlForm.complianceStatusLabel": "\nPostura de cumplimiento",
  "estate.rangeControlForm.complianceStatusHint":
    "\nRealice un seguimiento de si el control actual cumple, está bajo vigilancia, requiere acción o no cumple.",
  "estate.rangeControlForm.complianceStatus.COMPLIANT": "\nCumple",
  "estate.rangeControlForm.complianceStatus.WATCH": "\nVer",
  "estate.rangeControlForm.complianceStatus.ACTION_REQUIRED": "\nAcción requerida",
  "estate.rangeControlForm.complianceStatus.NON_COMPLIANT": "\nNo conforme",
  "estate.rangeControlForm.metricValueLabel": "\nValor medido",
  "estate.rangeControlForm.metricValueHint":
    "\nUtilícelo para recuentos de disponibilidad, totales de utilización u otras señales operativas cuantificadas.",
  "estate.rangeControlForm.metricUnitLabel": "\nUnidad métrica",
  "estate.rangeControlForm.metricUnitPlaceholder": "\nrangos, carriles, vehículos u horas",
  "estate.rangeControlForm.metricUnitHint":
    "\nNombra la unidad asociada con el valor medido cuando se registra uno.",
  "estate.rangeControlForm.targetDateLabel": "\nFecha objetivo",
  "estate.rangeControlForm.targetDateHint":
    "\nÚselo para fechas de inspección, ventanas de preparación y recuperación, implementaciones o hitos de reemplazo.",
  "estate.rangeControlForm.notesLabel": "\nNotas operativas",
  "estate.rangeControlForm.notesPlaceholder":
    "\nCapture la coordinación con fuego real, el contexto de seguridad, las limitaciones de mantenimiento, los detalles del despliegue o las suposiciones de reemplazo.",
  "estate.rangeControlForm.notesHint":
    "\nPreservar suficiente contexto para la planificación TAROM, la garantía de seguridad y los informes operativos orientados a DIO.",
  "estate.rangeControlForm.requiredHint":
    "\nSiempre se requieren título, dominio, tipo de registro, sitio, estado del flujo de trabajo, postura operativa, postura de cumplimiento y notas. Las reglas de activos, métricas y fechas objetivo se validan automáticamente.",
  "estate.rangeControlForm.submit": "\nGuardar registro de control operativo",
  "estate.rangeControlForm.submitAria": "\nGuardar registro de control operativo",
  "estate.rangeControlForm.summary.constraints": "\n{count} restringido",
  "estate.rangeControlForm.summary.actions": "\n{count} acción requerida",
  "estate.rangeControlForm.empty": "\nAún no se han capturado registros de control operativo.",
  "estate.rangeControlForm.emptySites": "\nNo hay sitios activos disponibles",
  "estate.rangeControlForm.emptySitesTitle":
    "\nCrear un sitio antes de capturar registros de control de rango y GFE",
  "estate.rangeControlForm.emptySitesDescription":
    "\nLos registros de alcance operativo, seguridad, objetivos y GFE se adjuntan directamente a un sitio administrado y a un activo opcional en el mismo sitio.",
  "estate.rangeControlForm.notesEmpty": "\nAún no se han capturado notas.",
  "estate.rangeControlForm.tableAria": "\nRegistros de control de rango y GFE",
  "estate.rangeControlForm.table.record": "\nRegistro",
  "estate.rangeControlForm.table.domain": "\nDominio",
  "estate.rangeControlForm.table.site": "\nSitio y activo",
  "estate.rangeControlForm.table.status": "\nEstado",
  "estate.rangeControlForm.table.signal": "\nSeñal operativa",
  "estate.rangeControlForm.table.notes": "\nNotas",
  "estate.rangeControlForm.table.assetUnlinked": "\nNingún activo vinculado",
  "estate.rangeControlForm.table.updatedAt": "\nActualizado {date}",
  "estate.rangeControlForm.table.signalRangeAvailability": "\n{value} {unit} disponible",
  "estate.rangeControlForm.table.signalTargetAvailability": "\n{value} {unit} disponible",
  "estate.rangeControlForm.table.signalGfeUtilisation": "\n{value} {unit} utilizado",
  "estate.rangeControlForm.table.signalSafetyDefect": "\nPostura del defecto: {status}",
  "estate.rangeControlForm.table.signalTargetDate": "\nFecha prevista {date}",
  "estate.rangeControlForm.table.signalNone": "\nAún no se ha registrado ninguna señal operativa.",
  "estate.rangeControlForm.validation.titleRequired": "\nSe requiere título de control operativo.",
  "estate.rangeControlForm.validation.domainRequired":
    "\nElija un dominio de control de rango válido.",
  "estate.rangeControlForm.validation.recordTypeRequired":
    "\nElija un tipo de registro de control de rango válido.",
  "estate.rangeControlForm.validation.recordTypeDomainMismatch":
    "\nElija un tipo de registro que coincida con el dominio de control de rango seleccionado.",
  "estate.rangeControlForm.validation.siteRequired": "\nSeleccione un sitio inmobiliario válido.",
  "estate.rangeControlForm.validation.assetRequired":
    "\nLos registros Targetry y GFE requieren un recurso vinculado en el mismo sitio.",
  "estate.rangeControlForm.validation.assetMismatch":
    "\nLos activos vinculados deben pertenecer al sitio inmobiliario seleccionado.",
  "estate.rangeControlForm.validation.statusRequired": "\nSe requiere estado de control operativo.",
  "estate.rangeControlForm.validation.operationalStatusRequired":
    "\nSe requiere postura operativa.",
  "estate.rangeControlForm.validation.complianceStatusRequired":
    "\nSe requiere una postura de cumplimiento.",
  "estate.rangeControlForm.validation.metricValueRequired":
    "Los registros de disponibilidad y utilización requieren un valor medido.",
  "estate.rangeControlForm.validation.metricValueInvalid":
    "\nEl valor medido debe ser cero o mayor.",
  "estate.rangeControlForm.validation.metricUnitRequired":
    "\nSe requiere unidad métrica cuando se registra un valor medido.",
  "estate.rangeControlForm.validation.targetDateRequired":
    "\nEste tipo de registro requiere una fecha objetivo.",
  "estate.rangeControlForm.validation.targetDateInvalid":
    "\nLa fecha objetivo debe ser un valor de calendario válido.",
  "estate.rangeControlForm.validation.safetyDefectComplianceMismatch":
    "\nLos defectos de seguridad no pueden registrarse como conformes.",
  "estate.rangeControlForm.feedback.saved":
    "\nRegistro de control operativo guardado en el espacio de trabajo del patrimonio.",
  "estate.rangeControlForm.feedback.saveFailed":
    "\nNo se puede conservar el registro de control operativo en este momento.",
  "estate.rangeControlForm.feedback.updated": "\nRegistro de control operativo actualizado.",
  "estate.rangeControlForm.feedback.deleted":
    "\nRegistro de control operativo eliminado del espacio de trabajo.",
  "estate.rangeControlForm.feedback.deleteFailed":
    "\nNo se puede eliminar el registro de control operativo en este momento.",
  "estate.rangeControlForm.validation.recordNotFound":
    "\nNo se encontró el registro de control de rango solicitado.",
  "estate.readiness.assets":
    "\nLa situación de los activos y las instalaciones ya proporciona la base de referencia actual del patrimonio.",
  "estate.readiness.delivery":
    "\nLas órdenes de trabajo y los documentos operativos ya sustentan la entrega de FM y el seguimiento de contratos.",
  "estate.readiness.programme":
    "\nLos registros de proyectos, la planificación financiera y las iniciativas duraderas ya pueden incluir aprobaciones en el flujo del programa.",
  "estate.action.assets":
    "\nInspeccionar el registro de activos autorizado, la jerarquía, la condición y la postura del ciclo de vida.",
  "estate.action.workOrders":
    "\nPase directamente al Hard FM activo, recuperación y trabajo legal que configura el aseguramiento patrimonial.",
  "estate.action.finance":
    "\nLlevar la presión patrimonial a la formulación del presupuesto, los escenarios de planificación y las discusiones de aprobación.",
  "estate.action.reports":
    "\nEmpaquetar la postura del estado, la preparación, el rendimiento y la actividad de mitigación en paquetes de informes ejecutivos.",
  "estate.action.buildings":
    "\nInspeccionar las instalaciones, la situación de los activos construidos y la preparación de los gemelos en toda la jerarquía del patrimonio.",
  "estate.page.eyebrow": "\nPlano de control de finca",
  "estate.page.readinessRailDescription":
    "\nRealice un seguimiento de la señal de la cartera actual a través de la disponibilidad de activos, la presión de entrega en vivo y los bloqueadores de programas antes de dirigir el trabajo a dominios posteriores.",
  "estate.page.readinessRail.assetSignal":
    "\nLa disponibilidad de activos y rango vinculado sigue siendo la señal principal para la preparación del patrimonio y el apoyo a la capacitación.",
  "estate.page.readinessRail.deliverySignal":
    "\nLa presión de entrega captura el trabajo abierto, las inspecciones atrasadas y la actividad de mitigación que afecta la postura de aseguramiento.",
  "estate.page.readinessRail.programmeSignal":
    "\nLos controles del programa muestran dónde las aprobaciones, los proyectos de alto riesgo y las dependencias financieras limitan la recuperación operativa.",
  "estate.page.readinessRail.sites":
    "{count} las señales del sitio restringidas requieren mitigación de preparación y seguimiento operativo.",
  "estate.page.readinessRail.inspections":
    "\n{count} las señales de inspección vencidas permanecen activas en toda la imagen del patrimonio.",
  "estate.page.readinessRail.delivery":
    "\n{count} las señales de orden de trabajo incumplidas están dando forma al panorama de entrega actual.",
  "estate.page.performanceTitle": "\nCumplimiento de la entrega y control del contrato",
  "estate.page.performanceDescription":
    "\nSupervise el rendimiento de ejecución, la capacidad de la fuerza laboral, la productividad y la demanda de mejora dentro del mismo plano de control del estado.",
  "estate.page.performanceControlsTitle": "\nAcciones de mejora",
  "estate.page.performanceControlsDescription":
    "\nLos resultados del contrato {changes} siguen vencidos y continúan dando forma a la cola de mejora activa.",
  "estate.page.decisionBoardTitle": "\nTablero de comando de excepción",
  "estate.page.decisionBoardDescription":
    "\nTrabaje los bloqueadores de preparación, las infracciones de entrega, las aprobaciones y los problemas de dependencia que necesitan acción antes del siguiente ciclo operativo.",
  "estate.page.decisionBoardBriefTitle": "\nAtención inmediata",
  "estate.page.decisionBoardBriefDescription":
    "\nComience con sitios restringidos, trabajo violado, dependencias inestables o aprobaciones retrasadas antes de dirigir el esfuerzo a informes y paquetes.",
  "estate.page.overviewActionsDescription":
    "\nPase directamente de la clasificación de excepciones a los paquetes de informes, las superficies de administración y los flujos de trabajo de planificación que poseen la recuperación del patrimonio.",
  "estate.page.approvalsFocusDescription":
    "\nLiderar con aprobaciones retrasadas, iniciativas de alto riesgo y presión de recursos antes de pasar a la estrategia, las iniciativas y los controles del proyecto.",
  "estate.page.assuranceFocusDescription":
    "\nLiderar con riesgo de activos, incumplimientos en la entrega y acciones de mejora abiertas antes de profundizar en el registro, la gobernanza de FM y la evidencia de administración.",
  "estate.page.partnershipsFocusDescription":
    "\nLiderar con conflictos de acuerdo, calidad del servicio y atención a la integración antes de pasar al contrato detallado y las superficies de dependencia.",
  "estate.page.commandCard.watchTitle": "\nCapacidades de lista de vigilancia",
  "estate.page.commandCard.watchDescription":
    "\n{total} señales de capacidad rastreadas están en juego en toda la postura del estado.",
  "estate.page.commandCard.constrainedSitesTitle": "\nSitios restringidos",
  "estate.page.commandCard.constrainedSitesDescription":
    "\n{inspections} las señales de inspección atrasadas están dando forma al panorama del patrimonio restringido.",
  "estate.page.commandCard.inspectionsTitle": "\nInspecciones vencidas",
  "estate.page.commandCard.inspectionsDescription":
    "\nInspecciones legales y de preparación claras antes de que la deuda de garantía se amplíe en todo el patrimonio.",
  "estate.page.commandCard.highRiskTitle": "\nProyectos de alto riesgo",
  "estate.page.commandCard.highRiskDescription":
    "{conflicts} señales de conflicto de recursos ya están afectando la línea de aprobación y entrega.",
  "estate.page.commandCard.resourceConflictsTitle": "\nConflictos de recursos",
  "estate.page.commandCard.resourceConflictsDescription":
    "\nLleve la presión sobre personal, financiación y entrega a las superficies de planificación antes de que se deslicen los controles.",
  "estate.page.commandCard.deliveryBreachesTitle": "\nÓrdenes de trabajo incumplidas",
  "estate.page.commandCard.deliveryBreachesDescription":
    "\n{actions} acciones de mejora abiertas aún se encuentran detrás del panorama actual de incumplimiento de entrega.",
  "estate.page.commandCard.partnershipConflictsTitle": "\nConflictos de coordinación",
  "estate.page.commandCard.partnershipConflictsDescription":
    "\n{agreements} las señales de acuerdo activo aún necesitan un seguimiento comercial y operativo alineado.",
  "estate.page.commandCard.cateringTitle": "\nPuntuación del servicio de catering",
  "estate.page.commandCard.cateringDescription":
    "\nTrate la calidad de ESS como una medida operativa activa junto con acuerdos, dependencias y soporte de construcción.",
  "estate.page.commandCard.integrationsDescription":
    "\n{configured} de {total} integraciones vinculadas a propiedades están configuradas actualmente dentro del plano de control.",
  "estate.page.decisionCard.readinessTitle": "\nBorrar bloqueadores de preparación",
  "estate.page.decisionCard.readinessDescription":
    "\nEscale los sitios restringidos, las inspecciones atrasadas y las capacidades de la lista de vigilancia a los flujos de trabajo que poseen la mitigación.",
  "estate.page.decisionCard.performanceTitle": "\nEstabilizar el rendimiento de entrega",
  "estate.page.decisionCard.performanceDescription":
    "\nActuar sobre órdenes de trabajo incumplidas, presión laboral y acciones de mejora de contratos antes de que se amplíen los retrasos en el servicio.",
  "estate.page.decisionCard.dependenciesTitle": "\nRestaurar dependencias críticas",
  "estate.page.decisionCard.dependenciesDescription":
    "\nTrate las integraciones de finanzas, documentos, adquisiciones y ESS como controles operativos en vivo en lugar de metadatos administrativos.",
  "estate.page.decisionCard.approvalsTitle": "\nDesbloquear decisiones del programa",
  "estate.page.decisionCard.approvalsDescription":
    "\nAvanzar en las aprobaciones retrasadas, la presión financiera y los cambios de control antes de que detengan el trabajo de recuperación y aseguramiento del patrimonio.",
  "estate.page.launchpadsTitle": "\nPlataformas de lanzamiento ejecutivas",
  "estate.page.launchpadsDescription":
    "\nPasar de la postura patrimonial a los informes DIO, la garantía de FM, la supervisión de la administración y la revisión de la dependencia de integración sin salir del caparazón.",
  "estate.page.launchpadsBadge": "\nControles de cartera",
  "estate.page.launchpadsBriefTitle": "\nResumen del operador",
  "estate.page.launchpadsBriefDescription":
    "\nUtilice estas plataformas de lanzamiento cuando la conversación de control necesite pasar de una postura en vivo a paquetes de informes, evidencia de aseguramiento o dependencias del sistema de soporte.",
  "estate.page.launchpadsLane.governanceTitle": "\nGobernanza",
  "estate.page.launchpadsLane.governanceHeadline":
    "\nMantenga la estrategia, las aprobaciones y las decisiones de inversión en una misma línea de visión.",
  "estate.page.launchpadsLane.governanceDescription":
    "Mantenga alineados la estrategia patrimonial, los controles del programa y la planificación financiera antes de que las decisiones abandonen el plano de control.",
  "estate.page.launchpadsLane.assuranceTitle": "\nGarantía",
  "estate.page.launchpadsLane.assuranceHeadline":
    "\nVincule las señales de entrega, administración y contrato de FM con evidencia lista para auditoría.",
  "estate.page.launchpadsLane.assuranceDescription":
    "\nUtilice los paquetes de gestión y gestión de FM para informar sobre los problemas de cumplimiento, rendimiento y recuperación con un contexto operativo compartido.",
  "estate.page.launchpadsLane.readinessTitle": "\nPreparación",
  "estate.page.launchpadsLane.readinessHeadline":
    "\nIncrementar los bloqueadores de alcance, capacidad e infraestructura con anticipación.",
  "estate.page.launchpadsLane.readinessDescription":
    "\nIncorpore señales de preparación a los informes y la planificación antes de que las limitaciones se conviertan en fallas de servicio, capacitación o aprobación.",
  "estate.page.launchpadsLane.externalTitle": "\nDependencias",
  "estate.page.launchpadsLane.externalHeadline":
    "\nTrate las integraciones corporativas y los sistemas de socios como controles operativos.",
  "estate.page.launchpadsLane.externalDescription":
    "\nRevisar las dependencias de finanzas, documentos, adquisiciones y catering como parte del panorama operativo del patrimonio en lugar de como datos administrativos separados.",
  "estate.readiness.actionsTitle": "\nAcciones de flujo de trabajo de preparación",
  "estate.readiness.actionsDescription":
    "\nEscalar la postura de preparación a los flujos de trabajo conectados que poseen evidencia de mitigación, financiamiento y aseguramiento.",
  "estate.readiness.action.report": "\nPaquete de preparación abierto",
  "estate.readiness.action.workOrders": "\nÓrdenes de trabajo abiertas",
  "estate.readiness.action.finance": "\nPlanificación de finanzas abiertas",
  "estate.operationalPicture.actionsTitle": "\nAcciones del cuadro operativo",
  "estate.operationalPicture.actionsDescription":
    "\nPase de la imagen de control integrada a las superficies detalladas que poseen evidencia de registro, ejecución de trabajo e informes ejecutivos.",
  "estate.operationalPicture.action.report": "\nPaquete operativo abierto",
  "estate.operationalPicture.action.assets": "\nActivos abiertos",
  "estate.operationalPicture.action.workOrders": "\nÓrdenes de trabajo abiertas",
  "fleet.title": "\nFlota",
  "fleet.subtitle": "\nPostura del vehículo, utilización y presión de mantenimiento",
  "fleet.coverage":
    "\nComience con la sección actual de vehículos de la plataforma y luego aumente hasta alcanzar la profundidad de despacho, cumplimiento y telemática.",
  "fleet.view.overview": "\nDescripción general",
  "fleet.view.operations": "\nOperaciones",
  "fleet.view.initiatives": "\nIniciativas",
  "fleet.view.dependencies": "\nDependencias",
  "fleet.kpi.vehicles": "\nVehículos",
  "fleet.kpi.vehiclesDesc": "\nActivos actualmente clasificados como flota de vehículos",
  "fleet.kpi.telemetry": "\nVehículos respaldados por telemetría",
  "fleet.kpi.telemetryDesc": "\nVehículos que ya informan señales operativas",
  "fleet.kpi.tasks": "\nTareas de flota abiertas",
  "fleet.kpi.tasksDesc": "\nTrabajo pendiente de mantenimiento adjunto a los activos del vehículo",
  "fleet.kpi.operations": "\nControles de flota",
  "fleet.kpi.operationsDesc": "\nRegistros de condición duradera, accidentes y reemplazo",
  "fleet.kpi.sites": "\nSitios de flota",
  "fleet.kpi.sitesDesc": "\nSitios que actualmente albergan al menos un activo de vehículo",
  "fleet.summary.alertTitle":
    "\nEl despliegue de la flota ya puede basarse en datos de operaciones reales",
  "fleet.summary.alertDescription":
    "Utilice cobertura de telemetría, trabajo activo y señales de IA para organizar la expansión del despacho, el cumplimiento y el mantenimiento sin una pila de flota separada.",
  "fleet.summary.tab.coverage": "\nCobertura",
  "fleet.summary.tab.maintenance": "\nPresión de mantenimiento",
  "fleet.summary.tab.operations": "\nControl de operaciones",
  "fleet.summary.telemetryTitle": "\nPreparación de telemetría del vehículo",
  "fleet.summary.telemetryDescription":
    "\nLos vehículos respaldados por telemetría proporcionan la base actual para la confianza en el despacho y las operaciones de flota conscientes de la utilización.",
  "fleet.summary.telemetryConnected": "\nVehículos conectados a telemetría",
  "fleet.summary.telemetryConnectedDesc":
    "\n{total} vehículos se encuentran actualmente en el segmento de flota activo.",
  "fleet.summary.telemetryStale": "\nVehículos de telemetría obsoletos",
  "fleet.summary.telemetryStaleDesc":
    "\n{coverage} de la flota se está ejecutando actualmente con telemetría obsoleta.",
  "fleet.summary.postureTitle": "\nPostura de preparación",
  "fleet.summary.postureDescription":
    "\nPromover la actualización de la telemetría, el contexto de la señal de IA y el seguimiento de las tareas en conjunto para que la flota se convierta en un sistema operativo en lugar de una lista de activos filtrada.",
  "fleet.summary.badgeTelemetry": "\nTelemetría",
  "fleet.summary.badgeStaleness": "\nEstancamiento",
  "fleet.summary.badgeSignals": "\nSeñales de IA",
  "fleet.summary.openTasksTitle": "\nTareas de mantenimiento abiertas",
  "fleet.summary.openTasksDesc":
    "\nTrabajos pendientes, programados y en progreso actualmente adjuntos a los activos del vehículo.",
  "fleet.summary.overdueTasksTitle": "\nTrabajo atrasado",
  "fleet.summary.overdueTasksDesc":
    "\nLas tareas del vehículo atrasadas son la señal más clara de la presión del tiempo de inactividad provocada por el mantenimiento.",
  "fleet.summary.signalsTitle": "\nVehículos con señal trasera",
  "fleet.summary.signalsDesc":
    "\nLos vehículos con predicciones de IA activas pueden tener prioridad para su envío, reemplazo o intervención.",
  "fleet.summary.operationsTitle": "Registro de control operativo",
  "fleet.summary.operationsDescription":
    "\nCapture registros de condiciones duraderas, accidentes, mantenimiento, utilización y reemplazo en el mismo espacio de trabajo de la flota SSR.",
  "fleet.summary.operationsCountLabel":
    "\n{count} registros de operaciones de flota figuran en el registro actual.",
  "fleet.summary.accidentsTitle": "\nRegistros de accidentes",
  "fleet.summary.accidentsDesc":
    "\nLos incidentes de flota registrados ahora persisten como controles operativos duraderos en lugar de notas ad hoc.",
  "fleet.summary.downtimeTitle": "\nTiempo de inactividad o reemplazo debido",
  "fleet.summary.downtimeDesc":
    "\nLos registros rebajados o con reemplazo pendiente muestran dónde la disponibilidad de la flota ya está limitada.",
  "fleet.summary.replacementTitle": "\nPlanificación de reemplazo",
  "fleet.summary.replacementDesc":
    "\nLos planes de reemplazo ahora se encuentran junto a la postura de la flota en vivo para que la presión del ciclo de vida pueda trasladarse a las finanzas y los informes.",
  "fleet.initiativeForm.title": "\nCrear una iniciativa de flota",
  "fleet.initiativeForm.description":
    "\nOrganice el próximo envío de flota, mantenimiento, cumplimiento o reemplazo directamente desde la telemetría en vivo y la postura de trabajo.",
  "fleet.initiativeForm.badge": "\nFlujo de flota duradero",
  "fleet.initiativeForm.nameLabel": "\nTítulo de la iniciativa",
  "fleet.initiativeForm.namePlaceholder":
    "\nSprint de reducción del tiempo de inactividad de la furgoneta",
  "fleet.initiativeForm.nameHint":
    "Utilice un título que pueda sobrevivir en informes y traspasos de operadores.",
  "fleet.initiativeForm.scopeLabel": "\nAlcance de la flota",
  "fleet.initiativeForm.scopePlaceholder":
    "\nFurgonetas críticas, depósito oeste o rutas sensibles al cumplimiento",
  "fleet.initiativeForm.scopeHint":
    "\nNombre el grupo de ruta, clase de vehículo, depósito o tramo de servicio afectado.",
  "fleet.initiativeForm.categoryLabel": "\nCategoría",
  "fleet.initiativeForm.categoryHint":
    "\nClasifique la iniciativa según el resultado principal de la flota.",
  "fleet.initiativeForm.category.DISPATCH": "\nDespacho",
  "fleet.initiativeForm.category.UTILISATION": "\nUtilización",
  "fleet.initiativeForm.category.MAINTENANCE": "\nMantenimiento",
  "fleet.initiativeForm.category.COMPLIANCE": "\nCumplimiento",
  "fleet.initiativeForm.category.ENERGY": "\nEnergía",
  "fleet.initiativeForm.category.REPLACEMENT": "\nReemplazo",
  "fleet.initiativeForm.priorityLabel": "\nPrioridad",
  "fleet.initiativeForm.priorityHint": "\nColocar la iniciativa en el horizonte operativo actual.",
  "fleet.initiativeForm.priority.NOW": "\nAhora",
  "fleet.initiativeForm.priority.NEXT": "\nSiguiente",
  "fleet.initiativeForm.priority.LATER": "\nMás tarde",
  "fleet.initiativeForm.priority.WATCH": "\nVer",
  "fleet.initiativeForm.notesLabel": "\nNotas y suposiciones",
  "fleet.initiativeForm.notesPlaceholder":
    "\nCapture la presión del tiempo de inactividad, las preocupaciones de cumplimiento, las limitaciones de despacho o las señales de reemplazo detrás de esta iniciativa.",
  "fleet.initiativeForm.notesHint":
    "\nRegistre el razonamiento que debe sobrevivir al envío y al seguimiento del mantenimiento.",
  "fleet.initiativeForm.requiredHint":
    "\nSe requieren título, alcance de la flota, categoría y prioridad.",
  "fleet.initiativeForm.submit": "\nIniciativa para salvar la flota",
  "fleet.initiativeForm.submitAria": "\nIniciativa para salvar la flota",
  "fleet.initiativeForm.recentTitle": "\nIniciativas recientes sobre flotas",
  "fleet.initiativeForm.recentDescription":
    "\nEstas iniciativas ahora persisten como registros de flota duraderos sin salir del espacio de trabajo de SSR.",
  "fleet.initiativeForm.empty": "\nAún no se han capturado iniciativas de flota.",
  "fleet.initiativeForm.emptyCta":
    "\nCree su primera iniciativa de flota para comenzar a realizar un seguimiento de las mejoras operativas.",
  "fleet.initiativeForm.savedAt": "\nActualizado {updatedAt}",
  "fleet.initiativeForm.notesEmpty": "\nAún no se han capturado notas.",
  "fleet.initiativeForm.validation.titleRequired": "\nSe requiere el título de la iniciativa.",
  "fleet.initiativeForm.validation.scopeRequired": "\nSe requiere alcance de flota.",
  "fleet.initiativeForm.validation.categoryRequired": "\nLa categoría es obligatoria.",
  "fleet.initiativeForm.validation.priorityRequired": "\nSe requiere prioridad.",
  "fleet.initiativeForm.feedback.saved":
    "\nIniciativa de flota guardada en el espacio de trabajo de la flota.",
  "fleet.initiativeForm.feedback.saveFailed":
    "\nNo se puede persistir la iniciativa de la flota en este momento.",
  "fleet.operationsForm.title": "\nCapturar un registro de operación de flota",
  "fleet.operationsForm.description":
    "\nRegistre el estado del vehículo, los accidentes, la actividad de mantenimiento, las revisiones de utilización y la planificación de reemplazo directamente desde el espacio de trabajo de la flota en vivo.",
  "fleet.operationsForm.badge": "\nControl operativo duradero",
  "fleet.operationsForm.nameLabel": "\nTítulo del disco",
  "fleet.operationsForm.namePlaceholder":
    "\nRevisión de la preparación para el reemplazo del vehículo 12",
  "fleet.operationsForm.nameHint":
    "\nUtilice un título que siga teniendo sentido en informes, traspasos y debates financieros.",
  "fleet.operationsForm.assetLabel": "\nActivo de flota vinculado",
  "fleet.operationsForm.assetPlaceholder": "\nSeleccione un activo de flota",
  "fleet.operationsForm.assetHint":
    "\nVincular el registro al activo del vehículo que lleva la señal de revisión o impacto operativo.",
  "fleet.operationsForm.assetOption": "Activo: {name} – {siteName}",
  "fleet.operationsForm.recordTypeLabel": "\nTipo de registro",
  "fleet.operationsForm.recordTypeHint":
    "\nElija el control operativo que este registro agrega al registro de flota.",
  "fleet.operationsForm.recordType.CONDITION_CHECK": "\nVerificación de condición",
  "fleet.operationsForm.recordType.ACCIDENT_RECORD": "\nRegistro de accidente",
  "fleet.operationsForm.recordType.MAINTENANCE_ACTIVITY": "\nActividad de mantenimiento",
  "fleet.operationsForm.recordType.UTILISATION_REVIEW": "\nRevisión de utilización",
  "fleet.operationsForm.recordType.REPLACEMENT_PLAN": "\nPlan de reemplazo",
  "fleet.operationsForm.statusLabel": "\nEstado del flujo de trabajo",
  "fleet.operationsForm.statusHint":
    "\nUtilice el estado del flujo de trabajo para reflejar si el control está activo, supervisado o cerrado.",
  "fleet.operationsForm.status.DRAFT": "\nRevisión",
  "fleet.operationsForm.status.ACTIVE": "\nActivo",
  "fleet.operationsForm.status.WATCH": "\nVer",
  "fleet.operationsForm.status.CLOSED": "\nCerrado",
  "fleet.operationsForm.conditionStatusLabel": "\nCondición postura",
  "fleet.operationsForm.conditionStatusHint":
    "Registre la condición operativa del activo de flota vinculado.",
  "fleet.operationsForm.conditionStatus.OPERATIONAL": "\nOperacional",
  "fleet.operationsForm.conditionStatus.WATCH": "\nVer",
  "fleet.operationsForm.conditionStatus.DOWN": "\nAbajo",
  "fleet.operationsForm.conditionStatus.REPLACEMENT_DUE": "\nReemplazo debido",
  "fleet.operationsForm.metricValueLabel": "\nValor medido",
  "fleet.operationsForm.metricValuePlaceholder": "Por ejemplo, 78",
  "fleet.operationsForm.metricValueHint":
    "\nUtilícelo para puntuaciones de utilización, recuentos de producción u otras señales medidas de la flota.",
  "fleet.operationsForm.metricUnitLabel": "\nUnidad métrica",
  "fleet.operationsForm.metricUnitPlaceholder": "\nporcentaje, horas o trayectos",
  "fleet.operationsForm.metricUnitHint":
    "\nAgregue una unidad cada vez que se registre un valor medido para que los informes sigan siendo interpretables.",
  "fleet.operationsForm.incidentDateLabel": "\nFecha del incidente",
  "fleet.operationsForm.incidentDateHint":
    "\nLos registros de accidentes requieren la fecha calendario del incidente.",
  "fleet.operationsForm.targetDateLabel": "\nFecha objetivo",
  "fleet.operationsForm.targetDateHint":
    "\nLos planes de reemplazo deben incluir la próxima revisión objetivo o fecha de acción.",
  "fleet.operationsForm.notesLabel": "\nNotas y contexto operativo",
  "fleet.operationsForm.notesPlaceholder":
    "\nCapture el impacto del tiempo de inactividad, los hallazgos de utilización, las acciones correctivas o los supuestos del ciclo de vida detrás de este registro.",
  "fleet.operationsForm.notesHint":
    "\nEstas notas deben sobrevivir en informes, seguimiento del mantenimiento y planificación de reemplazo.",
  "fleet.operationsForm.requiredHint":
    "\nSe requieren título, activo de flota vinculado, tipo de registro, estado del flujo de trabajo, estado de la condición y notas.",
  "fleet.operationsForm.submit": "\nGuardar registro de operación de flota",
  "fleet.operationsForm.submitAria": "\nGuardar registro de operación de flota",
  "fleet.operationsForm.recentTitle": "\nRegistros recientes de operaciones de flota",
  "fleet.operationsForm.recentDescription":
    "\nEl registro de flota ahora conserva los registros de control operativo directamente en el espacio de trabajo SSR.",
  "fleet.operationsForm.empty": "\nAún no se han capturado registros de operaciones de la flota.",
  "fleet.operationsForm.emptyCta":
    "\nCapture un registro de operación de flota para comenzar a construir el registro de control.",
  "fleet.operationsForm.emptyVehiclesTitle":
    "\nNingún activo de la flota está listo para los controles operativos todavía",
  "fleet.operationsForm.emptyVehiclesDescription":
    "\nPrimero cree o clasifique los activos de vehículos para que los registros de condición y reemplazo de la flota se puedan vincular a los activos reales.",
  "fleet.operationsForm.savedAt": "\nActualizado {updatedAt}",
  "fleet.operationsForm.notesEmpty": "\nAún no se han capturado notas.",
  "fleet.operationsForm.signal.asset": "\nActivo",
  "fleet.operationsForm.signal.metric": "\nSeñal medida",
  "fleet.operationsForm.signal.incidentDate": "\nFecha del incidente",
  "fleet.operationsForm.signal.targetDate": "\nFecha objetivo",
  "fleet.operationsForm.validation.titleRequired": "\nSe requiere título del registro.",
  "fleet.operationsForm.validation.assetRequired": "\nSe requiere un activo de flota vinculado.",
  "fleet.operationsForm.validation.recordTypeRequired": "\nEl tipo de registro es obligatorio.",
  "fleet.operationsForm.validation.statusRequired":
    "\nEl estado del flujo de trabajo es obligatorio.",
  "fleet.operationsForm.validation.conditionStatusRequired": "\nSe requiere postura de condición.",
  "fleet.operationsForm.validation.notesRequired": "\nSe requieren notas operativas.",
  "fleet.operationsForm.validation.metricValueInvalid":
    "\nEl valor medido debe ser un número válido mayor o igual a cero.",
  "fleet.operationsForm.validation.metricValueRequired":
    "\nLas revisiones de utilización requieren un valor medido.",
  "fleet.operationsForm.validation.metricUnitRequired":
    "\nSe requiere unidad métrica cuando se registra un valor medido.",
  "fleet.operationsForm.validation.incidentDateInvalid":
    "\nLa fecha del incidente debe ser un valor de calendario válido.",
  "fleet.operationsForm.validation.incidentDateRequired":
    "\nLos registros de accidentes requieren una fecha del incidente.",
  "fleet.operationsForm.validation.targetDateInvalid":
    "\nLa fecha objetivo debe ser un valor de calendario válido.",
  "fleet.operationsForm.validation.targetDateRequired":
    "\nLos planes de reemplazo requieren una fecha objetivo.",
  "fleet.operationsForm.validation.assetNotFound":
    "\nNo se pudo encontrar el activo de flota vinculado.",
  "fleet.operationsForm.feedback.saved":
    "\nRegistro de operación de flota guardado en el espacio de trabajo de la flota.",
  "fleet.operationsForm.feedback.saveFailed":
    "No se puede conservar el registro de operación de la flota en este momento.",
  "fleet.readiness.vehicles":
    "\nLos activos clasificados como vehículos ya proporcionan una base de referencia inicial para la flota.",
  "fleet.readiness.telemetry":
    "\nLos vehículos respaldados por telemetría pueden anclar las implementaciones de despacho y cumplimiento.",
  "fleet.readiness.tasks":
    "\nLos flujos de trabajo de mantenimiento existentes ya incluyen trabajo de flota.",
  "fleet.page.eyebrow": "\nCabina de flota operativa",
  "fleet.page.readinessRailDescription":
    "\nUtilice esta guía para decidir dónde es necesario prestar atención al riesgo de servicio, la presión de mantenimiento y la gobernanza de reemplazo antes de pasar a flujos de trabajo de colas, finanzas o informes.",
  "fleet.page.readinessRail.vehicleSignal":
    "\nLa disponibilidad de vehículos y la cobertura de telemetría siguen siendo la base para garantizar la flota.",
  "fleet.page.readinessRail.maintenanceSignal":
    "\nEl tiempo de inactividad, el seguimiento de accidentes y las tareas atrasadas definen la presión operativa inmediata.",
  "fleet.page.readinessRail.replacementSignal":
    "\nLos candidatos de reemplazo y las flotas obsoletas deben pasar a la planificación financiera antes de los períodos de falla del servicio.",
  "fleet.page.commandTitle": "\nPostura de mando de flota",
  "fleet.page.commandDescription":
    "\nCombine la disponibilidad del vehículo, el seguimiento del mantenimiento, los controles de incidentes y la presión de reemplazo en una sola imagen de la flota de cara al operador.",
  "fleet.page.launchpadsTitle": "\nPlataformas de lanzamiento de decisiones de flota",
  "fleet.page.launchpadsDescription":
    "\nPasar de la telemetría operativa y la interrupción del servicio a acciones gobernadas para la utilización, el mantenimiento, el reemplazo y la generación de informes.",
  "fleet.page.launchpadsBadge": "\nFlujo de trabajo empresarial",
  "fleet.page.launchpadsBriefTitle":
    "\nLa flota ahora se comporta como una cartera operativa gestionada",
  "fleet.page.launchpadsBriefDescription":
    "\nLa cabina puede respaldar decisiones de depósito, ruta, cumplimiento y reemplazo sin abandonar el avión de control de la flota.",
  "fleet.page.launchpadsLane.maintenanceTitle": "\nControl de mantenimiento",
  "fleet.page.launchpadsLane.maintenanceHeadline":
    "\nUtilice registros duraderos y colas de trabajo activas para evitar que el tiempo de inactividad se convierta en una pérdida de servicio.",
  "fleet.page.launchpadsLane.maintenanceDescription":
    "\nEmparejar registros de incidentes, postura de condición y trabajo abierto con la cola de mantenimiento y los paquetes de entrega operativos.",
  "fleet.page.launchpadsLane.utilisationTitle": "\nPresión de utilización",
  "fleet.page.launchpadsLane.utilisationHeadline":
    "\nExplique los picos de demanda de vehículos con telemetría en vivo y señales de retraso en el servicio.",
  "fleet.page.launchpadsLane.utilisationDescription":
    "\nEnrute la presión de utilización hacia la cabina de utilización antes de que flotas infrautilizadas o sobrecargadas distorsionen la planificación.",
  "fleet.page.launchpadsLane.replacementTitle": "\nGobernanza de reemplazo",
  "fleet.page.launchpadsLane.replacementHeadline":
    "Promover los vehículos antiguos en la planificación de inversiones mientras la continuidad del servicio aún sea controlable.",
  "fleet.page.launchpadsLane.replacementDescription":
    "\nUtilice planes de reemplazo, patrones de tiempo de inactividad y conversaciones de capital juntos en lugar de filas de registro aisladas.",
  "fleet.page.launchpadsLane.assuranceTitle": "\nAseguramiento y presentación de informes",
  "fleet.page.launchpadsLane.assuranceHeadline":
    "\nEstado del vehículo del paquete, trabajo pendiente y preparación para operadores, líderes financieros y revisiones de gobernanza.",
  "fleet.page.launchpadsLane.assuranceDescription":
    "\nMantenga los paquetes de informes y las conversaciones financieras alineados con los mismos controles en vivo utilizados por el equipo operativo.",
  "fleet.action.utilisation":
    "\nUtilice la postura de utilización para identificar picos de demanda y capacidad inactiva.",
  "fleet.action.tasks":
    "\nPasar directamente a la cola de trabajo eliminando el tiempo de inactividad del vehículo.",
  "fleet.action.reports":
    "\nResumir la postura de la flota para los operadores y las partes interesadas financieras.",
  "fleet.action.sensors":
    "\nInspeccionar la cobertura de telemetría en vivo y los dispositivos obsoletos que afectan la confianza de la flota.",
  "fleet.action.buildings":
    "\nCoordinar el contexto de depósitos, patios e instalaciones con la demanda de la flota.",
  "fleet.action.addVehicle": "\nRegistrar un nuevo activo vehicular en la flota.",
  "buildings.title": "\nEdificios",
  "buildings.subtitle": "\nPosición de las instalaciones, cobertura gemela y huella operativa",
  "buildings.coverage":
    "\nCree una gestión de instalaciones sobre los sitios actuales, activos que no sean vehículos, gemelos digitales y dispositivos conectados.",
  "buildings.view.overview": "\nDescripción general",
  "buildings.view.initiatives": "\nIniciativas",
  "buildings.view.performance": "\nRendimiento",
  "buildings.view.dependencies": "\nDependencias",
  "buildings.kpi.facilities": "\nInstalaciones",
  "buildings.kpi.facilitiesDesc": "\nSitios actualmente marcados como instalaciones",
  "buildings.kpi.assets": "\nActivos de las instalaciones",
  "buildings.kpi.assetsDesc":
    "\nActivos no vehiculares actualmente bajo operaciones de instalaciones",
  "buildings.kpi.twins": "\nGemelos digitales",
  "buildings.kpi.twinsDesc": "\nModelos gemelos ya adjuntos a la finca",
  "buildings.kpi.devices": "\nDispositivos conectados",
  "buildings.kpi.devicesDesc":
    "\nDispositivos IoT ya disponibles para el despliegue de instalaciones",
  "buildings.summary.alertTitle":
    "\nLa implementación de instalaciones ya se puede basar en datos inmobiliarios reales",
  "buildings.summary.alertDescription":
    "\nUtilice perfiles de planificación, gemelos digitales y dispositivos conectados para organizar la jerarquía del edificio y el despliegue de operaciones sin crear una pila de instalaciones paralelas.",
  "buildings.summary.tab.facility": "\nPostura de la instalación",
  "buildings.summary.tab.operations": "\nCobertura operativa",
  "buildings.summary.planningTitle": "\nPreparación para la planificación y la jerarquía",
  "buildings.summary.planningDescription":
    "\nSite planning profiles are the current anchor for area, fleet capacity, and operating-hour context.",
  "buildings.summary.planningProfiles": "\nPerfiles de planificación",
  "buildings.summary.planningProfilesDesc":
    "\n{total} instalaciones están actualmente dentro del alcance.",
  "buildings.summary.facilityAssets": "\nActivos de las instalaciones",
  "buildings.summary.facilityAssetsDesc":
    "\nLos activos que no son vehículos son la capa base actual para sistemas, componentes y despliegue a nivel de sala.",
  "buildings.summary.postureTitle": "\nPostura de preparación",
  "buildings.summary.postureDescription":
    "Promover el contexto de planificación, los gemelos espaciales y los dispositivos conectados juntos para que los edificios se conviertan en una jerarquía operativa en lugar de una lista plana de sitios.",
  "buildings.summary.badgePlanning": "\nPlanificación",
  "buildings.summary.badgeTwin": "\nLigado gemelo",
  "buildings.summary.badgeSensors": "\nSensor listo",
  "buildings.summary.twinLinkedTitle": "\nInstalaciones gemelas",
  "buildings.summary.twinLinkedDesc":
    "\nInstalaciones con al menos un gemelo digital ya conectado para flujos de trabajo espaciales.",
  "buildings.summary.sensorReadyTitle": "\nInstalaciones listas para sensores",
  "buildings.summary.sensorReadyDesc":
    "\nLas instalaciones con dispositivos IoT conectados pueden admitir la expansión de telemetría de salas, zonas y sistemas.",
  "buildings.initiativeForm.title": "\nCrear una iniciativa de instalaciones",
  "buildings.initiativeForm.description":
    "\nOrganice la próxima implementación de instalaciones o paquete de remediación directamente desde la planificación en vivo, la cobertura gemela y de sensores.",
  "buildings.initiativeForm.badge": "\nFlujo de instalaciones duraderas",
  "buildings.initiativeForm.nameLabel": "\nTítulo de la iniciativa",
  "buildings.initiativeForm.namePlaceholder": "\nPuesta en servicio de HVAC para pisos ocupados",
  "buildings.initiativeForm.nameHint":
    "\nUtilice un título que pueda incluirse en los informes y en el trabajo de seguimiento.",
  "buildings.initiativeForm.scopeLabel": "\nAlcance de la instalación",
  "buildings.initiativeForm.scopePlaceholder":
    "\nSede norte, campus oeste o grupo de instalaciones críticas",
  "buildings.initiativeForm.scopeHint":
    "\nNombre el grupo de instalaciones, el área del campus o el sector operativo afectado.",
  "buildings.initiativeForm.categoryLabel": "\nCategoría",
  "buildings.initiativeForm.categoryHint":
    "\nClasifique la iniciativa según el resultado de las principales instalaciones.",
  "buildings.initiativeForm.category.SPACE": "\nEspacio",
  "buildings.initiativeForm.category.SYSTEM": "\nSistema",
  "buildings.initiativeForm.category.ENERGY": "\nEnergía",
  "buildings.initiativeForm.category.COMPLIANCE": "\nCumplimiento",
  "buildings.initiativeForm.phaseLabel": "\nFase",
  "buildings.initiativeForm.phaseHint":
    "\nColoque la iniciativa en el horizonte de implementación actual.",
  "buildings.initiativeForm.phase.NOW": "\nAhora",
  "buildings.initiativeForm.phase.NEXT": "\nSiguiente",
  "buildings.initiativeForm.phase.LATER": "\nMás tarde",
  "buildings.initiativeForm.notesLabel": "\nNotas y suposiciones",
  "buildings.initiativeForm.notesPlaceholder":
    "\nCapture la presión operativa, el contexto espacial, la necesidad de cumplimiento o el objetivo energético detrás de esta iniciativa.",
  "buildings.initiativeForm.notesHint":
    "\nRegistre el razonamiento que debería sobrevivir en las revisiones de las instalaciones y los traspasos ejecutivos.",
  "buildings.initiativeForm.requiredHint":
    "\nSe requieren título, alcance de la instalación, categoría y fase.",
  "buildings.initiativeForm.submit": "\nIniciativa para salvar instalaciones",
  "buildings.initiativeForm.submitAria": "\nGuardar iniciativa de construcción",
  "buildings.initiativeForm.recentTitle": "\nIniciativas de instalaciones recientes",
  "buildings.initiativeForm.recentDescription":
    "\nEstas iniciativas ahora persisten como registros de instalaciones duraderas sin salir del espacio de trabajo de SSR.",
  "buildings.initiativeForm.recentCountLabel":
    "\n{count} iniciativas están dando forma al registro de instalaciones.",
  "buildings.initiativeForm.empty": "\nAún no se han capturado iniciativas de instalaciones.",
  "buildings.initiativeForm.emptyCta":
    "\nCree su primera iniciativa de instalaciones para comenzar a realizar un seguimiento de las mejoras del edificio.",
  "buildings.initiativeForm.savedAt": "\nActualizado {updatedAt}",
  "buildings.initiativeForm.notesEmpty": "\nAún no se han capturado notas.",
  "buildings.initiativeForm.validation.titleRequired": "\nSe requiere el título de la iniciativa.",
  "buildings.initiativeForm.validation.scopeRequired": "\nSe requiere alcance de la instalación.",
  "buildings.initiativeForm.validation.categoryRequired": "\nLa categoría es obligatoria.",
  "buildings.initiativeForm.validation.phaseRequired": "\nSe requiere fase.",
  "buildings.initiativeForm.feedback.saved":
    "\nIniciativa de instalaciones guardada en el espacio de trabajo del edificio.",
  "buildings.initiativeForm.feedback.saveFailed":
    "\nNo se puede conservar la iniciativa de instalaciones en este momento.",
  "buildings.readiness.facilities":
    "\nLa ubicación del sitio y de las instalaciones ya proporciona la primera capa de jerarquía del edificio.",
  "buildings.readiness.twins":
    "La cobertura del gemelo digital puede anclar los flujos de trabajo de salas, zonas y sistemas.",
  "buildings.readiness.devices":
    "\nLos dispositivos conectados se pueden promocionar a vistas de telemetría de instalaciones.",
  "buildings.page.eyebrow": "\nPlano de control de instalaciones",
  "buildings.page.readinessRailDescription":
    "\nUtilice esta guía para juzgar la gobernanza de las instalaciones, la cobertura gemela y la preparación para el cumplimiento antes de pasar a los informes, la telemetría o la planificación de capital.",
  "buildings.page.readinessRail.facilitySignal":
    "\nLa jerarquía de las instalaciones y la postura de iniciativa definen la línea base operativa actual del edificio.",
  "buildings.page.readinessRail.twinSignal":
    "\nLas instalaciones gemelas son el mejor ancla para la sala, el sistema y el contexto de intervención.",
  "buildings.page.readinessRail.complianceSignal":
    "\nLas instalaciones listas para sensores y basadas en revisiones indican dónde se puede confiar en la evidencia de aseguramiento hoy.",
  "buildings.page.commandTitle": "\nPostura de mando de instalaciones",
  "buildings.page.commandDescription":
    "\nCombine la jerarquía de las instalaciones, la vinculación gemela, la preparación para la telemetría y la presión de las acciones de mejora en una vista de las instalaciones empresariales.",
  "buildings.page.launchpadsTitle":
    "\nPlataformas de lanzamiento de decisiones sobre instalaciones",
  "buildings.page.launchpadsDescription":
    "\nTraducir la postura del edificio en operaciones espaciales, garantía de cumplimiento y conversaciones de capital sin crear una pila de planificación separada.",
  "buildings.page.launchpadsBadge": "\nFlujo de trabajo empresarial",
  "buildings.page.launchpadsBriefTitle":
    "\nLos edificios ahora se leen como una cartera de instalaciones administradas",
  "buildings.page.launchpadsBriefDescription":
    "\nEl espacio de trabajo puede respaldar la gobernanza de las instalaciones, el seguimiento del gemelo digital y el escalamiento de capital desde una superficie operativa.",
  "buildings.page.launchpadsLane.governanceTitle": "\nGobernanza de instalaciones",
  "buildings.page.launchpadsLane.governanceHeadline":
    "\nMantenga las iniciativas de las instalaciones vinculadas a la jerarquía del inmueble y al panorama de riesgo operativo.",
  "buildings.page.launchpadsLane.governanceDescription":
    "\nUtilice el registro de iniciativas como superficie de control duradera para trabajos de sistemas, espacio, energía y cumplimiento.",
  "buildings.page.launchpadsLane.twinTitle": "\nGemelo y telemetría",
  "buildings.page.launchpadsLane.twinHeadline":
    "\nPromover instalaciones gemelas y listas para sensores como evidencia espacial antes de realizar intervenciones importantes.",
  "buildings.page.launchpadsLane.twinDescription":
    "\nVerifique la postura de las instalaciones con respecto a las superficies de sensores y gemelos digitales en lugar de planificar únicamente a partir de notas narrativas.",
  "buildings.page.launchpadsLane.complianceTitle": "\nGarantía de cumplimiento",
  "buildings.page.launchpadsLane.complianceHeadline":
    "\nUtilice la postura del edificio para organizar inspecciones, pruebas legales e informes de aseguramiento.",
  "buildings.page.launchpadsLane.complianceDescription":
    "El mismo plano de control de instalaciones ahora admite el seguimiento operativo y los informes listos para auditoría.",
  "buildings.page.launchpadsLane.capitalTitle": "\nCoordinación de capital",
  "buildings.page.launchpadsLane.capitalHeadline":
    "\nIncrementar el riesgo del edificio, la presión de mejora y el trabajo del ciclo de vida a los paquetes de programas y finanzas antes.",
  "buildings.page.launchpadsLane.capitalDescription":
    "\nPasar de la postura de las instalaciones a los paquetes de preparación, gobernanza de FM y operaciones del patrimonio sin reconstruir la historia de los datos.",
  "buildings.action.twin":
    "\nAbra la superficie del gemelo digital existente para el contexto de operaciones espaciales.",
  "buildings.action.assets":
    "\nInspeccionar el patrimonio no vehicular que respalda las operaciones de construcción.",
  "buildings.action.reports":
    "\nDesempeño de las instalaciones del paquete para cumplimiento y revisión ejecutiva.",
  "buildings.action.sensors":
    "\nRastree los problemas del edificio en telemetría en vivo y cobertura del dispositivo.",
  "buildings.action.fleet":
    "\nCoordinar activos móviles, depósitos y logística de campo con edificios.",
  "buildings.action.add": "\nRegistrar un nuevo edificio o instalación.",
  "sensors.title": "\nSensores",
  "sensors.subtitle":
    "\nCobertura de telemetría, postura del dispositivo y preparación de la señal",
  "sensors.coverage": "Cobertura de telemetría de activos",
  "sensors.view.overview": "\nDescripción general",
  "sensors.view.alertRules": "\nReglas de alerta",
  "sensors.view.quality": "\nCalidad",
  "sensors.view.dependencies": "\nDependencias",
  "sensors.kpi.devices": "\nDispositivos registrados",
  "sensors.kpi.devicesDesc": "\nDispositivos actualmente registrados en el plano de control",
  "sensors.kpi.telemetry": "\nPuntos de telemetría",
  "sensors.kpi.telemetryDesc": "\nMuestras de telemetría sin procesar ya almacenadas",
  "sensors.kpi.coverage": "\nActivos con telemetría",
  "sensors.kpi.coverageDesc": "\nActivos distintos que ya reciben telemetría",
  "sensors.kpi.unseen": "\nDispositivos nunca vistos",
  "sensors.kpi.unseenDesc": "\nDispositivos registrados que aún no han informado",
  "sensors.summary.alertTitle": "\nLa semántica del sensor está lista para ser operativa",
  "sensors.summary.alertDescription":
    "\nRealice un seguimiento de la finalización de metadatos del dispositivo y del etiquetado de telemetría semántica antes de expandirse a adaptadores de protocolo y alertas.",
  "sensors.summary.tab.device": "\nPostura del dispositivo",
  "sensors.summary.tab.semantic": "\nTelemetría semántica",
  "sensors.summary.metadataTitle": "\nPreparación de metadatos del dispositivo",
  "sensors.summary.metadataDescription":
    "\nCuente los dispositivos con suficientes detalles de identificación para respaldar los flujos de trabajo de operaciones, calibración y puesta en servicio.",
  "sensors.summary.metadataReady": "\nDispositivos listos para metadatos",
  "sensors.summary.metadataReadyDesc":
    "\n{count} total de dispositivos registrados en el plano de control.",
  "sensors.summary.commissioned": "\nDispositivos puestos en servicio",
  "sensors.summary.commissionedDesc":
    "\n{coverage} de dispositivos registrados incluyen una fecha de puesta en servicio.",
  "sensors.summary.postureTitle": "\nPostura de preparación",
  "sensors.summary.postureDescription":
    "\nPromocione los datos del proveedor, modelo, firmware, ubicación de instalación y puesta en servicio antes de tratar el registro como un inventario de sensores duraderos.",
  "sensors.summary.badgeMetadata": "\nMetadatos",
  "sensors.summary.badgeInstall": "Instalar contexto",
  "sensors.summary.badgeCommissioning": "\nPuesta en servicio",
  "sensors.summary.seriesKeyTitle": "\nClaves de serie",
  "sensors.summary.seriesKeyDesc": "\n{total} muestras de telemetría almacenadas actualmente.",
  "sensors.summary.unitTitle": "\nUnidades adjuntas",
  "sensors.summary.unitDesc":
    "\nLas unidades son el contrato semántico mínimo para telemetría comparable.",
  "sensors.summary.qualityTitle": "\nCalidad etiquetada",
  "sensors.summary.qualityDesc":
    "\nLos indicadores de calidad permiten que los flujos de trabajo posteriores distingan los datos confiables y estimados.",
  "sensors.alertRuleForm.title": "\nCrear una regla de alerta",
  "sensors.alertRuleForm.description":
    "\nCree alertas basadas en umbrales directamente desde la preparación de telemetría en vivo dentro del flujo duradero del plano de control del sensor.",
  "sensors.alertRuleForm.badge": "\nRegla duradera",
  "sensors.alertRuleForm.nameLabel": "\nTítulo de la regla",
  "sensors.alertRuleForm.namePlaceholder": "\nAlto nivel de CO2 en habitaciones ocupadas",
  "sensors.alertRuleForm.nameHint":
    "\nUtilice un título que los operadores puedan reutilizar en informes y en el seguimiento de la creación.",
  "sensors.alertRuleForm.seriesKeyLabel": "\nClave de serie",
  "sensors.alertRuleForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertRuleForm.seriesKeyHint":
    "\nHaga coincidir la clave de telemetría semántica que debe evaluarse.",
  "sensors.alertRuleForm.comparatorLabel": "\nComparador",
  "sensors.alertRuleForm.comparatorHint":
    "\nElija cómo se debe comparar la lectura en vivo con el umbral.",
  "sensors.alertRuleForm.comparator.GT": "Mayor",
  "sensors.alertRuleForm.comparator.LT": "Menor",
  "sensors.alertRuleForm.comparator.EQ": "Igual",
  "sensors.alertRuleForm.thresholdLabel": "\nUmbral",
  "sensors.alertRuleForm.thresholdPlaceholder": "1200 (ej.)",
  "sensors.alertRuleForm.thresholdHint":
    "\nUtilice el límite numérico que debería activar la regla.",
  "sensors.alertRuleForm.severityLabel": "\nGravedad",
  "sensors.alertRuleForm.severityHint":
    "\nEstablezca la urgencia visible para el operador para la regla.",
  "sensors.alertRuleForm.severity.INFO": "\nInformación",
  "sensors.alertRuleForm.severity.WARNING": "\nAdvertencia",
  "sensors.alertRuleForm.severity.CRITICAL": "\nCrítico",
  "sensors.alertRuleForm.requiredHint":
    "\nSe requieren título, clave de serie, comparador, umbral y gravedad.",
  "sensors.alertRuleForm.submit": "\nGuardar regla de alerta",
  "sensors.alertRuleForm.submitAria": "\nGuardar regla de alerta del sensor",
  "sensors.alertRules.feedback.saved":
    "\nRegla de alerta de sensor guardada en el espacio de trabajo de sensores.",
  "sensors.alertForm.title": "\nCrear una regla de alerta",
  "sensors.alertForm.description":
    "\nCree alertas basadas en umbrales directamente desde la preparación de telemetría en vivo dentro del flujo de trabajo duradero del plano de control del sensor.",
  "sensors.alertForm.badge": "\nRegla duradera",
  "sensors.alertForm.nameLabel": "\nTítulo de la regla",
  "sensors.alertForm.namePlaceholder": "\nAlto nivel de CO2 en habitaciones ocupadas",
  "sensors.alertForm.nameHint":
    "\nUtilice un título que los operadores puedan reutilizar en informes y en el seguimiento de la creación.",
  "sensors.alertForm.seriesKeyLabel": "\nClave de serie",
  "sensors.alertForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertForm.seriesKeyHint":
    "\nHaga coincidir la clave de telemetría semántica que debe evaluarse.",
  "sensors.alertForm.comparatorLabel": "\nComparador",
  "sensors.alertForm.comparatorHint":
    "\nElija cómo se debe comparar la lectura en vivo con el umbral.",
  "sensors.alertForm.comparator.GT": "Mayor",
  "sensors.alertForm.comparator.LT": "Menor",
  "sensors.alertForm.comparator.EQ": "Igual",
  "sensors.alertForm.thresholdLabel": "\nUmbral",
  "sensors.alertForm.thresholdPlaceholder": "1200 (ej.)",
  "sensors.alertForm.thresholdHint": "\nUtilice el límite numérico que debería activar la regla.",
  "sensors.alertForm.severityLabel": "\nGravedad",
  "sensors.alertForm.severityHint":
    "\nEstablezca la urgencia visible para el operador para la regla.",
  "sensors.alertForm.severity.INFO": "\nInformación",
  "sensors.alertForm.severity.WARNING": "\nAdvertencia",
  "sensors.alertForm.severity.CRITICAL": "\nCrítico",
  "sensors.alertForm.requiredHint":
    "\nSe requieren título, clave de serie, comparador, umbral y gravedad.",
  "sensors.alertForm.submit": "\nGuardar regla de alerta",
  "sensors.alertForm.submitAria": "\nGuardar regla de alerta del sensor",
  "sensors.alertForm.recentTitle": "\nReglas de alerta recientes",
  "sensors.alertForm.recentDescription":
    "\nLas reglas de alerta ahora persisten directamente en el modelo de plano de control de sensor duradero.",
  "sensors.alertForm.empty": "\nAún no se han capturado reglas de alerta de sensor.",
  "sensors.alertForm.emptyCta":
    "\nCree su primera regla de alerta para comenzar a monitorear la telemetría del sensor.",
  "sensors.alertForm.savedAt": "\nActualizado {updatedAt}",
  "sensors.alertForm.validation.titleRequired": "\nEl título de la regla de alerta es obligatorio.",
  "sensors.alertForm.validation.seriesKeyRequired": "\nSe requiere clave de serie.",
  "sensors.alertForm.validation.comparatorRequired": "\nSe requiere comparador.",
  "sensors.alertForm.validation.thresholdRequired": "\nEl umbral debe ser numérico.",
  "sensors.alertForm.validation.severityRequired": "\nSe requiere severidad.",
  "sensors.alertForm.feedback.saved":
    "\nRegla de alerta de sensor guardada en el espacio de trabajo de sensores.",
  "sensors.alertForm.feedback.saveFailed":
    "\nNo se puede mantener la regla de alerta del sensor en este momento.",
  "sensors.alertRules.title": "\nReglas de alerta duraderas",
  "sensors.alertRules.description":
    "\nLas reglas promocionadas persisten en el modelo del plano de control del sensor y pueden generar trabajo de ejecución posterior.",
  "sensors.alertRules.empty": "\nAún no se han creado reglas de alerta de sensor duraderas.",
  "sensors.alertRules.promote": "\nPromocionar a regla",
  "sensors.alertRules.column.title": "\nRegla",
  "sensors.alertRules.column.seriesKey": "\nClave de serie",
  "sensors.alertRules.column.threshold": "\nUmbral",
  "sensors.alertRules.column.severity": "\nGravedad",
  "sensors.alertRules.column.updatedAt": "\nActualizado",
  "sensors.alertRules.badge.enabled": "\nHabilitado",
  "sensors.alertRules.badge.disabled": "\nDeshabilitado",
  "sensors.alertRules.validation.titleRequired": "\nDurable alert rule title is required.",
  "sensors.alertRules.validation.seriesKeyRequired":
    "\nSe requiere una clave de serie de reglas de alerta duradera.",
  "sensors.alertRules.validation.thresholdRequired":
    "\nEl umbral de la regla de alerta duradera debe ser numérico.",
  "sensors.alertRules.feedback.saveFailed":
    "No se puede mantener la regla de alerta del sensor duradero en este momento.",
  "sensors.readiness.devices":
    "\nEl registro de dispositivo actual ya admite una línea base del plano de control.",
  "sensors.readiness.telemetry":
    "\nLas muestras de telemetría en vivo se pueden normalizar en modelos de series semánticas.",
  "sensors.readiness.coverage":
    "\nLa telemetría vinculada a activos ya proporciona cobertura operativa inicial.",
  "sensors.page.eyebrow": "\nPlano de control de telemetría",
  "sensors.page.readinessRailDescription":
    "\nUtilice este riel para juzgar el estado de los metadatos, la integridad de la puesta en servicio y la calidad de la señal antes de promover la telemetría en alertas, informes o decisiones operativas posteriores.",
  "sensors.page.readinessRail.metadataSignal":
    "\nLa integridad de los metadatos es la base para la propiedad y el enrutamiento confiables de los dispositivos.",
  "sensors.page.readinessRail.commissioningSignal":
    "\nLa postura de puesta en servicio determina si las lecturas en vivo pueden respaldar la escalada operativa.",
  "sensors.page.readinessRail.qualitySignal":
    "\nLa telemetría con etiquetas de calidad es el control que separa las señales confiables de las ruidosas.",
  "sensors.page.commandTitle": "\nPostura del comando de telemetría",
  "sensors.page.commandDescription":
    "\nCombine la preparación de metadatos, la cobertura de puesta en servicio, la profundidad de las series semánticas y el etiquetado de calidad en una imagen de telemetría orientada al operador.",
  "sensors.page.launchpadsTitle": "\nPlataformas de lanzamiento de decisiones de telemetría",
  "sensors.page.launchpadsDescription":
    "\nPromueva la postura del dispositivo y la calidad de la señal en alertas, análisis e informes empresariales sin fragmentar el contrato de telemetría.",
  "sensors.page.launchpadsBadge": "\nFlujo de trabajo empresarial",
  "sensors.page.launchpadsBriefTitle":
    "\nLos sensores ahora se comportan como un estado de telemetría gobernado",
  "sensors.page.launchpadsBriefDescription":
    "\nEl espacio de trabajo puede respaldar la gobernanza semántica, la promoción de reglas y la escalada operativa posterior desde un plano de control.",
  "sensors.page.launchpadsLane.metadataTitle": "\nGobernanza de metadatos",
  "sensors.page.launchpadsLane.metadataHeadline":
    "\nEstandarice la propiedad del dispositivo, las claves de serie y el significado semántico antes de escalar las alertas o los análisis.",
  "sensors.page.launchpadsLane.metadataDescription":
    "\nUtilice la postura del dispositivo y los metadatos como puerta de calidad para cada consumidor operativo posterior.",
  "sensors.page.launchpadsLane.alertingTitle": "\nGarantía de alerta",
  "sensors.page.launchpadsLane.alertingHeadline":
    "\nPromover series confiables en reglas duraderas sobre las que los operadores puedan actuar en todos los edificios y flotas.",
  "sensors.page.launchpadsLane.alertingDescription":
    "\nLas reglas de alerta deben reflejar la telemetría gobernada, no umbrales únicos desconectados del plano de control.",
  "sensors.page.launchpadsLane.analyticsTitle": "\nAnálisis operativo",
  "sensors.page.launchpadsLane.analyticsHeadline":
    "Convierta la telemetría semántica en evidencia de utilización, preparación y toma de decisiones estratégicas.",
  "sensors.page.launchpadsLane.analyticsDescription":
    "\nUtilice la calidad de la serie y la postura del umbral para fortalecer el análisis predictivo y operativo.",
  "sensors.page.launchpadsLane.escalationTitle": "\nEscalamiento y presentación de informes",
  "sensors.page.launchpadsLane.escalationHeadline":
    "\nPase de los problemas del dispositivo a los flujos de trabajo de preparación y generación de informes antes de que la confianza se degrade entre los equipos.",
  "sensors.page.launchpadsLane.escalationDescription":
    "\nMantenga informes, órdenes de trabajo y paquetes de decisiones operativas alineados con el mismo contrato de telemetría.",
  "sensors.action.utilisation":
    "\nUtilice la calidad de la telemetría para explicar la confianza en la utilización y las brechas.",
  "sensors.action.twin":
    "\nSuperponga la postura del dispositivo en el contexto del gemelo espacial y del punto de acceso.",
  "sensors.action.reports":
    "\nExportar el estado del dispositivo y la cobertura de la señal a paquetes de informes.",
  "sensors.action.buildings":
    "\nSiga los problemas de la habitación y las instalaciones hasta el estado del sensor.",
  "sensors.action.fleet":
    "\nConecte los puntos ciegos de telemetría del vehículo al espacio de trabajo de la flota.",
  "sensors.action.add": "\nRegistrar un nuevo sensor o dispositivo.",
  "common.liveSummary": "\nResumen en vivo",
  "common.domainCoverage": "\nCobertura de dominio",
  "common.nextActions": "\nPróximas acciones",
  "common.readinessSummary": "\nPreparación de implementación actual",
  "common.connectedWorkflows": "\nFlujos de trabajo conectados",
  "common.connectedWorkflowsHint":
    "\nVuelva a vincular este dominio con operaciones, finanzas e informes sin salir del shell.",
  "common.workflowOps": "\nSeguimiento operativo",
  "common.workflowOpsHint":
    "\nUtilice superficies de ejecución de tareas, utilización y campo para actuar sobre la señal en vivo.",
  "common.workflowFinance": "\nAlineación financiera",
  "common.workflowFinanceHint":
    "\nLlevar el riesgo, la demanda y las aprobaciones a los presupuestos, escenarios y flujo de documentos.",
  "common.workflowReporting": "\nEmbalaje de partes interesadas",
  "common.workflowReportingHint":
    "\nResuma el estado en vivo en paquetes de informes una vez que el conjunto de trabajo esté estable.",
  "common.workspaceGuide": "\nGuía del espacio de trabajo",
  "common.now": "\nAhora",
  "common.next": "\nSiguiente",
  "common.later": "\nMás tarde",
  "common.autoRefreshMinute": "\nActualización automática cada minuto",
  "common.guideAlertTitle": "\nRuta de implementación lista para el operador",
  "common.guideAlertDescription":
    "\nUtilice primero el resumen en vivo y luego pase a los sistemas conectados antes de empaquetar el resultado.",
  "common.timelineNowTitle": "\nLea la postura en vivo",
  "common.timelineNowDescription":
    "\nComience desde el resumen de actualización automática y verifique lo que ya está cubierto en el patrimonio actual.",
  "common.timelineNextTitle": "\nActuar en flujos de trabajo conectados",
  "common.timelineNextDescription":
    "\nPase a tareas, finanzas, flota, edificios, sensores o informes según la superficie de presión que necesita resolver.",
  "common.timelineLaterTitle": "\nPromover a trabajo de programa duradero",
  "common.timelineLaterDescription":
    "Una vez que la ruta en vivo sea estable, confórmela en aprobaciones, jerarquía, semántica e informes ejecutivos.",
  "common.workflowHint":
    "\nVaya a las superficies activas conectadas que ya admiten esta expansión.",
  "common.strategicWorkspace.chatContext":
    "\n{title} espacio de trabajo. {subtitle} Conectado al shell de operaciones renderizado por el servidor actual, al límite de autenticación compartido y al modelo parcial HTMX.",
  "iot.assetRequired": "\nSe requiere contexto de activo para la ingesta de telemetría.",
  "iot.metricRequired": "\nSe requiere una métrica de telemetría o una clave de serie.",
  "finance.action.assets":
    "\nInspeccione la porción actual de la cartera antes de reasignar capital.",
  "finance.action.planning":
    "\nPasar de la exposición a la depreciación a escenarios de planificación y aprobaciones.",
  "finance.action.purchaseOrders":
    "\nRevisar los compromisos de órdenes de compra y el seguimiento de los proveedores que afectan la situación financiera.",
  "finance.action.reports": "\nEmpaquete el estado visible de la cartera en un informe ejecutivo.",
  "finance.workspace.title": "\nCentro de comando de depreciación",
  "finance.workspace.description":
    "\nRealice un seguimiento de la deriva de valoración, el riesgo de concentración y la exposición a la depreciación en vivo en toda la cartera.",
  "finance.relatedLinks.title": "\nRelacionado",
  "finance.relatedLinks.description":
    "\nVaya al registro de activos o a los espacios de trabajo de documentos para coordinar el seguimiento financiero.",
  "finance.cockpit.filters.eyebrow": "\nFiltros",
  "finance.cockpit.filters.title": "\nAlcance la cabina",
  "finance.cockpit.filters.description":
    "\nFiltre el cuadro de mando de finanzas por sitio, período fiscal y densidad de tabla antes de exportar el segmento actual.",
  "finance.cockpit.filters.exportDescription":
    "\nExporte la cartera de depreciación actualmente filtrada como CSV o PDF.",
  "finance.cockpit.actions.eyebrow": "\nFlujos de trabajo conectados",
  "finance.cockpit.actions.title": "\nPasar de la valoración a la acción",
  "finance.cockpit.actions.description":
    "\nVaya directamente a los sistemas operativos que explican o resuelven la variación de la cartera.",
  "finance.cockpit.hero.eyebrow": "\nCabina de finanzas",
  "finance.cockpit.hero.title":
    "\nExposición, presión de cola y concentración ajustadas por IA en un espacio de trabajo",
  "finance.cockpit.hero.description":
    "\nUna cabina de finanzas renderizada por un servidor para revisar la desviación de la valoración, la concentración del sitio, la presión de las tareas y el flujo de adquisición o disposición en paralelo.",
  "finance.cockpit.hero.live": "\nActualización automática cada {seconds} segundos",
  "finance.cockpit.chat.pageContext":
    "Página de cabina de finanzas. Espacio de trabajo unificado para exposición ajustada a la IA, concentración del sitio, trabajo pendiente de mantenimiento, aprobaciones de documentos y variación de cartera. Controles: filtro de sitio, período fiscal, tamaño de página, exportación CSV, exportación PDF. Secciones principales: resumen de la cartera de IA, cobertura del conjunto de datos, franja de KPI, tabla de clasificación del sitio, cola de acciones, tarjetas de concentración y tabla de cartera.",
  "finance.cockpit.action.disposalReview": "\nRevisar eliminación",
  "finance.cockpit.action.immediateIntervention": "\nIntervención inmediata",
  "finance.cockpit.action.replacementPlan": "\nReemplazo del plan",
  "finance.cockpit.action.procurementReview": "\nRevisar adquisiciones",
  "finance.cockpit.action.workOrderFollowUp": "\nSeguimiento de orden de trabajo",
  "finance.cockpit.action.invoiceFollowUp": "\nFactura de seguimiento",
  "finance.cockpit.action.purchaseOrderFollowUp": "\nSeguimiento de orden de compra",
  "finance.cockpit.action.customerOrderFollowUp": "\nSeguimiento del pedido del cliente",
  "finance.cockpit.action.monitor": "\nMonitorear la exposición",
  "finance.cockpit.briefing.eyebrow": "\nResumen del portafolio",
  "finance.cockpit.briefing.title": "\nResumen financiero",
  "finance.cockpit.briefing.summary":
    "\nPara {site} sobre {period}, la exposición ajustada por IA se sitúa en {adjustedExposure} con un delta de valoración de {delta}. {signalCount} activos respaldados por señales y {openTasks} tareas abiertas están dando forma a la presión financiera actual.",
  "finance.cockpit.briefing.recommendationTitle": "\nSiguiente movimiento recomendado",
  "finance.cockpit.briefing.recommendationPortfolio":
    "\nNingún activo domina la cola. Revise la concentración y abra el flujo de documentos en {site} antes de reasignar capital.",
  "finance.cockpit.briefing.recommendationAsset":
    '\nPriorice {asset} a continuación y muévalo a "{action}" para que el riesgo de valoración y el arrastre operativo no se acumulen.',
  "finance.cockpit.generatedAt": "\nGenerado {date}",
  "finance.cockpit.datasets.title": "\nCobertura del conjunto de datos",
  "finance.cockpit.datasets.description":
    "\nLa cabina combina valoración, riesgo de IA, carga de trabajo de mantenimiento y flujo de documentos transaccionales en una superficie de decisión financiera.",
  "finance.cockpit.datasets.assetsTitle": "\nActivos dentro del alcance",
  "finance.cockpit.datasets.assetsDescription":
    "\nActivos que actualmente contribuyen a la cartera financiera filtrada.",
  "finance.cockpit.datasets.signalsTitle": "\nSeñales respaldadas por IA",
  "finance.cockpit.datasets.signalsDescription":
    "\n{critical} señales críticas/de emergencia y {warning} de advertencia están influyendo en la valoración.",
  "finance.cockpit.datasets.tasksTitle": "\nAbrir elementos de trabajo",
  "finance.cockpit.datasets.tasksDescription":
    "\n{overdue} las tareas atrasadas están aumentando la presión financiera a corto plazo.",
  "finance.cockpit.datasets.documentsTitle": "\nAbrir flujo de documentos",
  "finance.cockpit.datasets.documentsDescription":
    "\n{workOrders} órdenes de trabajo, {purchaseOrders} órdenes de compra y {invoices} facturas aún están activas.",
  "finance.cockpit.kpi.adjustedExposure": "\nTasa de ajuste de IA {rate}",
  "finance.cockpit.kpi.deltaTitle": "\nDelta de valoración",
  "finance.cockpit.kpi.deltaDescription":
    "\nDiferencia entre la exposición a la depreciación estándar y la valoración ajustada por IA.",
  "finance.cockpit.kpi.highRiskDescription":
    "\nLos activos {count} actualmente conllevan el mayor riesgo financiero y operativo.",
  "finance.cockpit.kpi.confidenceTitle": "Confianza media",
  "finance.cockpit.kpi.confidenceDescription":
    "\n{due} activos ya están dentro de la ventana de predicción de vencimiento próximo.",
  "finance.cockpit.condition.description":
    "\nLa combinación de exposición por condición de activo ayuda a revelar si el riesgo de capital se está agrupando en torno a activos degradados.",
  "finance.cockpit.type.description":
    "\nVea qué tipos de activos conllevan la mayor parte de la exposición financiera actual.",
  "finance.cockpit.lifecycle.title": "\nMezcla de ciclo de vida",
  "finance.cockpit.lifecycle.description":
    "\nLa distribución del ciclo de vida muestra qué parte de la cartera actual se encuentra en estados activo, de monitoreo, fatigante o desechado.",
  "finance.cockpit.lifecycle.share": "\n{share} de exposición visible",
  "finance.cockpit.lifecycle.assets": "\nActivos",
  "finance.cockpit.site.title": "\nConcentración del sitio",
  "finance.cockpit.site.description":
    "\nCompare la exposición ajustada a nivel del sitio, los activos de alto riesgo, las tareas activas y el flujo de documentos abiertos.",
  "finance.cockpit.site.share": "\n{share} de exposición visible",
  "finance.cockpit.site.risk": "\nAlto riesgo",
  "finance.cockpit.site.tasks": "\nTareas abiertas",
  "finance.cockpit.site.queue": "\nCola pendiente",
  "finance.cockpit.queue.title": "\nCola de acciones",
  "finance.cockpit.queue.description":
    "\nActivos clasificados por variación de valoración, gravedad del riesgo y presión de trabajo o documentos posteriores.",
  "finance.cockpit.queue.summary": "\n{tasks} tareas activas • {documents} documentos abiertos",
  "finance.cockpit.opportunity.purchaseOrdersTitle": "\nExposición de orden de compra",
  "finance.cockpit.opportunity.purchaseOrdersDescription":
    "\n{count} las órdenes de compra aún están abiertas contra activos financieramente expuestos.",
  "finance.cockpit.opportunity.invoicesTitle": "\nExposición de colecciones",
  "finance.cockpit.opportunity.invoicesDescription":
    "\nLas facturas {count} aún tienen presión de cobro abierto en la cartera.",
  "finance.cockpit.opportunity.tasksTitle": "\nTrabajo atrasado",
  "finance.cockpit.opportunity.tasksDescription":
    "\nLas tareas de mantenimiento atrasadas están amplificando la carga de valoración y el riesgo operativo.",
  "finance.cockpit.opportunity.dueSoonTitle": "\nSeñales de vencimiento pronto",
  "finance.cockpit.opportunity.dueSoonDescription":
    "\nVentanas de predicción cercanas a la intervención y que probablemente afecten la planificación de capital.",
  "finance.overview.documentSummary": "\nAbrir flujo de documentos",
  "finance.overview.documentSummaryDescription":
    "\n{workOrders} órdenes de trabajo, {purchaseOrders} órdenes de compra y {invoices} facturas están abiertas actualmente.",
  "finance.cockpit.table.title": "\nCartera financiera",
  "finance.cockpit.table.description":
    "\nVista de cartera ordenable que combina valor estándar, valor ajustado por IA, confianza y presión de cola.",
  "finance.cockpit.table.live": "\nMesa en vivo",
  "finance.cockpit.table.asset": "\nActivo",
  "finance.cockpit.table.signal": "\nSeñal",
  "finance.cockpit.table.aiAdjusted": "\nAjustado por IA",
  "finance.cockpit.table.delta": "\nDelta",
  "finance.cockpit.table.confidence": "\nConfianza",
  "finance.cockpit.table.queue": "\nCola",
  "finance.cockpit.table.remainingLifeNone":
    "\nNo se adjunta ninguna predicción de vida restante a este activo.",
  "finance.cockpit.table.remainingLifeValue": "\n{days} días restantes de vida",
  "finance.cockpit.table.activeTasksValue": "\n{count} tareas activas",
  "finance.cockpit.table.overdueTasksValue": "\n{count} vencido",
  "finance.cockpit.pdf.title": "\nInforme de cabina de finanzas",
  "finance.cockpit.pdf.subject":
    "\nExposición a la depreciación ajustada por IA y variación de la cartera",
  "finance.cockpit.pdf.scope": "\nAlcance: {site} • {period}",
  "finance.cockpit.pdf.summary.adjustedExposure": "\nExposición ajustada: {value}",
  "finance.cockpit.pdf.summary.delta": "\nDelta de valoración: {value} ({percent})",
  "finance.cockpit.pdf.summary.risk": "\nExposición de alto riesgo: {value} en {count} activos",
  "finance.cockpit.pdf.summary.queue":
    "\nTareas abiertas: {tasks} • Documentos abiertos: {documents}",
  "reports.title": "\nInformes",
  "reports.subtitle": "Informes de activos, resúmenes de depreciación y exportación de MOD",
  "reports.category.financial": "\nFinanciero",
  "reports.category.financialDesc":
    "\nInformes de depreciación, valoraciones y exposición financiera",
  "reports.category.operations": "\nActivos y operaciones",
  "reports.category.operationsDesc":
    "\nInventario de activos, predicciones y análisis de utilización",
  "reports.category.executive": "\nEjecutivo",
  "reports.category.executiveDesc": "\nPaneles ejecutivos e indicadores clave de desempeño",
  "reports.workspace.chat.categoryLine": "\n{label}: {count} conjuntos de datos",
  "reports.workspace.chat.noAiBrief": "\nNo se ha cargado ningún informe de IA activo.",
  "reports.workspace.chat.aiBriefActive":
    "\nInformación activa: {title}. Audiencia {audience}. Enfoque {focusLabel}. Cobertura {coverageScore} por ciento.",
  "reports.workspace.chat.journeyStep": "{title} ({statusPart}) → {targetLabel}",
  "reports.workspace.chat.stepStatusRecommended": "\n{status}, recomendado",
  "reports.workspace.chat.priorityDataset":
    "\nConjunto de datos desglosado prioritario: {title}. Salud {health}.",
  "reports.workspace.chat.noPinnedSources":
    "\nActualmente no hay acciones de origen relacionadas fijadas.",
  "reports.workspace.chat.pinnedSourcesPrefix": "\nAcciones de fuentes relacionadas:",
  "reports.workspace.chat.sourceLink": "{label} → {supporting}",
  "reports.workspace.chat.generalCoverage": "\ncobertura general",
  "reports.workspace.chat.mission":
    "\nSiguiente movimiento recomendado: {title}. Objetivo {targetLabel}.",
  "reports.workspace.chat.builder":
    "\nAudiencia {audience}. Enfoque {focus}. Secciones {sections}.",
  "reports.workspace.chat.pageIntro": "\nEspacio de trabajo de informes.",
  "reports.workspace.chat.workflowInventory":
    "\nLa página incluye un navegador de flujo de trabajo, un centro de comando de conjuntos de datos, un carril de comando de IA, un generador de informes, un carril de plantillas, un centro de datos de origen, un panel de desglose y una cronología de informes guardados.",
  "reports.workspace.chat.body":
    "{intro} Categorías: {categorySummary}. Conjuntos de datos: {datasetSummary}. {prioritySummary} {sourceSummary} {missionSummary} {builderSummary} {aiSummary} Pasos de flujo de trabajo: {journeySummary}. {workflowInventory}",
  "reports.workspace.heroEyebrow": "\nInformes empresariales",
  "reports.workspace.title": "\nCentro de comando de informes de cartera",
  "reports.workspace.description":
    "\nPaquetes de informes listos para la junta, vistas de garantía operativa y desgloses vinculados a evidencia entregados a través de un espacio de trabajo renderizado por servidor.",
  "reports.workspace.sectionTitle": "\nCatálogo de informes",
  "reports.workspace.sectionDescription":
    "\nCambie entre los paquetes de finanzas, operaciones y ejecutivo sin salir del espacio de trabajo de informes.",
  "reports.workspace.datasetTitle": "\nCentro de comando del conjunto de datos",
  "reports.workspace.datasetDescription":
    "\nRevise los conjuntos de datos ejecutivos, de operaciones y financieros en vivo antes de generar un paquete de informes o abrir desgloses.",
  "reports.workspace.aiBriefTitle": "\nInforme de IA",
  "reports.workspace.aiBriefDescription":
    "\nUna narrativa lista para tomar decisiones sintetizada a partir del paquete activo, la evidencia de respaldo y el estado actual del flujo de trabajo.",
  "reports.workspace.aiBriefEmpty":
    "\nGenere un paquete de informes para crear un informe de IA para finanzas, operaciones o partes interesadas ejecutivas.",
  "reports.workspace.launchpadTitle": "\nPlataforma de lanzamiento de decisiones",
  "reports.workspace.launchpadDescription":
    "\nPase directamente a paquetes ejecutivos, vistas de garantía operativa o revisiones de dependencia sin reconstruir el contexto.",
  "reports.workspace.launchpad.priorityDatasetTitle": "\nConjunto de datos prioritario",
  "reports.workspace.launchpad.offlineSourcesTitle": "\nFuentes sin conexión",
  "reports.workspace.launchpad.reportingScopeTitle": "\nAlcance del informe",
  "reports.workspace.launchpad.openPack": "\nPaquete abierto",
  "reports.workspace.launchpad.openWorkspace": "\nAbrir espacio de trabajo",
  "reports.workspace.launchpad.openEstateWorkspace": "\nEspacio de trabajo abierto",
  "reports.workspace.launchpad.openFinancePlanningWorkspace":
    "Espacio de trabajo de planificación financiera abierto",
  "reports.workspace.launchpad.lane.boardBadge": "\nPaquete de tablero",
  "reports.workspace.launchpad.lane.boardTitle":
    "\nPaquete de inteligencia de decisiones estratégicas",
  "reports.workspace.launchpad.lane.boardDescription":
    "\nLanzar el paquete de cara al directorio para las compensaciones del ciclo de vida, la postura de riesgo y la secuenciación de inversiones.",
  "reports.workspace.launchpad.lane.operationsBadge": "\nPaquete operativo",
  "reports.workspace.launchpad.lane.operationsTitle":
    "\nPaquete de imágenes operativas del inmueble",
  "reports.workspace.launchpad.lane.operationsDescription":
    "\nAbra el paquete de garantía operativa para bloqueadores de preparación, presión de entrega de FM y señales de control de estado.",
  "reports.workspace.launchpad.lane.dependenciesBadge": "\nRevisión de dependencia",
  "reports.workspace.launchpad.lane.dependenciesTitle":
    "\nRevisión de dependencia de integración corporativa",
  "reports.workspace.launchpad.lane.dependenciesDescription":
    "\nAdopte una postura de integración cuando los sistemas de finanzas, recursos humanos, adquisiciones o socios de catering estén dando forma a la confianza en los informes.",
  "reports.workspace.activePackDescription":
    "\nEl paquete de informes activos combina narrativa de IA, evidencia de conjuntos de datos cruzados y secciones listas para exportar en un espacio de trabajo renderizado por el servidor.",
  "reports.workspace.mission.title": "\nSiguiente movimiento recomendado",
  "reports.workspace.mission.description":
    "\nEl espacio de trabajo convierte el estado de la cartera en un próximo paso listo para tomar decisiones, de modo que los operadores puedan organizar un paquete, abrir evidencia o informar un liderazgo sin reinterpretar toda la página.",
  "reports.workspace.mission.progressTitle": "\nPreparación del flujo de trabajo",
  "reports.workspace.mission.progressValue": "\n{completed}/{total} listo",
  "reports.workspace.mission.progressDescription":
    "\n{completed} de {total} pasos del recorrido están listos. La preparación actual del flujo de trabajo es {percent}%.",
  "reports.workspace.mission.progressStatDescription":
    "\n{percent}% del flujo de informes está listo para la transferencia.",
  "reports.workspace.mission.nextStageTitle": "\nSiguiente etapa",
  "reports.workspace.mission.priorityDatasetTitle": "\nConjunto de datos prioritario",
  "reports.workspace.mission.dataTitle": "\nReconectar la cobertura de la fuente",
  "reports.workspace.mission.dataDescription":
    "\n{count} conjuntos de datos están fuera de línea. Comience con {source} para restaurar la confianza antes de exportar.",
  "reports.workspace.mission.firstPackTitle": "\nArmar el primer paquete",
  "reports.workspace.mission.firstPackDescription":
    "\nUtilice {dataset} como punto de partida, luego prepare las entradas del constructor para la audiencia {audience}.",
  "reports.workspace.mission.drilldownTitle": "\nInvestigar {dataset}",
  "reports.workspace.mission.drilldownDescription":
    "\n{dataset} está marcado como {health}. Abra la evidencia detallada antes de cambiar la historia.",
  "reports.workspace.mission.coverageTitle": "\nAumentar la cobertura del paquete",
  "reports.workspace.mission.coverageDescription":
    "\n{pack} tiene actualmente una cobertura del {score}%. Ajusta las secciones, los desgloses o la narrativa antes de compartirla.",
  "reports.workspace.mission.briefTitle": "\nRedactar el informe de decisión",
  "reports.workspace.mission.briefDescription":
    "\n{pack} está estructurado y listo para un resumen de IA, un pase de preguntas y respuestas o una sesión informativa específica para la audiencia.",
  "reports.workspace.mission.briefPrompt":
    "Redacte un informe listo para tomar decisiones para el paquete de informes {pack}. Las secciones activas son {sections}. Resuma los principales riesgos, explique la evidencia más sólida y prepare posibles preguntas de seguimiento.",
  "reports.workspace.journey.selectTitle": "\nSeleccionar cobertura",
  "reports.workspace.journey.selectDescription":
    "\nComience con el conjunto de datos más material: {dataset}. Confirma si pertenece al siguiente paquete.",
  "reports.workspace.journey.gotoDataset": "\nConjuntos de datos abiertos",
  "reports.workspace.journey.askAi": "\nPreguntar a AI",
  "reports.workspace.journey.changeTitle": "\nCambiar la historia",
  "reports.workspace.journey.changeDescription":
    "\nRevise la combinación de secciones activas antes de cambiar la narrativa o el marco de las partes interesadas: {sections}.",
  "reports.workspace.journey.gotoActivePack": "\nAbrir paquete activo",
  "reports.workspace.journey.changePrompt":
    "\nAyúdame a cambiar la historia del informe actual. Las secciones activas son {sections}. Recomendar lo que se debe enfatizar, restar énfasis o reescribir.",
  "reports.workspace.journey.modifyTitle": "\nModificar el paquete",
  "reports.workspace.journey.modifyDescription":
    "\nVuelva a orientar el informe actual para la audiencia {audience} sin perder las señales clave.",
  "reports.workspace.journey.gotoBuilder": "\nConstructor abierto",
  "reports.workspace.journey.modifyPrompt":
    "\nAyúdame a modificar el paquete de informes actual para la audiencia {audience} con un enfoque {focus}. Recomendar cómo ajustar las entradas del constructor.",
  "reports.workspace.journey.drilldownTitle": "\nProfundizar en la variación",
  "reports.workspace.journey.drilldownDescription":
    "\nPasar de tarjetas de resumen a tablas de evidencia para {dataset}.",
  "reports.workspace.journey.gotoDrilldown": "\nAbrir desglose",
  "reports.workspace.journey.drilldownPrompt":
    "\nInvestigue el conjunto de datos {dataset}. Actualmente está marcado como {health}. Explique los posibles impulsores y las siguientes preguntas detalladas que debo hacer.",
  "reports.workspace.journey.addDataTitle": "\nAgregar datos de origen",
  "reports.workspace.journey.addDataDescription":
    "\nSi la confianza es baja, abra {source} y agregue o actualice la evidencia subyacente.",
  "reports.workspace.journey.gotoSource": "\nCódigo abierto",
  "reports.workspace.journey.addDataPrompt":
    "\nDime qué datos adicionales debo agregar de {source} para mejorar el paquete de informes activos ({activePack}).",
  "reports.workspace.ai.explainPostureTitle": "\nExplicar la postura actual",
  "reports.workspace.ai.explainPostureDescription":
    "\nResuma las señales más importantes, comenzando con {dataset}.",
  "reports.workspace.ai.explainDriversTitle": "\nExplicar los conductores y la confianza",
  "reports.workspace.ai.explainDriversDescription":
    "\nRastree los principales impulsores, la incertidumbre y la evidencia que respalda {dataset}.",
  "reports.workspace.ai.explainDriversPrompt":
    "Para el conjunto de datos {dataset}, explique los principales factores, el nivel de confianza, la incertidumbre y qué evidencia cambiaría más la decisión. La salud es {health}. El paquete activo es {pack}. Las secciones activas son {sections}. Hay {count} conjuntos de datos fuera de línea. Verifique el inventario, las tareas pendientes, la utilización, las finanzas y las señales de adquisición o eliminación cuando exista evidencia.",
  "reports.workspace.ai.modifyPackTitle": "\nReorientar este paquete",
  "reports.workspace.ai.modifyPackDescription":
    "\nRecomiende cómo debe cambiar el paquete {pack} para una audiencia o tomador de decisiones diferente.",
  "reports.workspace.ai.modifyPackPrompt":
    "\nAyúdame a modificar el paquete de informes {pack}. Las secciones actuales son {sections}. Recomendar qué agregar, quitar o ajustar.",
  "reports.workspace.ai.comparePackTitle": "\nComparar con cronología",
  "reports.workspace.ai.comparePackDescription":
    "\nCompruebe en qué se diferencia el paquete actual {pack} de la cronología guardada y qué cambió.",
  "reports.workspace.ai.comparePackPrompt":
    "\nCompare el paquete de informes actual {pack} con la cronología del informe guardado. Las secciones activas son {sections}. Resalte lo que cambió, lo que sigue sin resolverse y lo que merece un análisis detallado antes de compartirlo.",
  "reports.workspace.ai.findGapsTitle": "\nEncontrar lagunas de datos",
  "reports.workspace.ai.findGapsDescription":
    "\nHay {count} conjuntos de datos fuera de línea que afectan la confianza en los informes.",
  "reports.workspace.ai.findGapsPrompt":
    "\nIdentifique los datos faltantes o obsoletos en este espacio de trabajo de informes. Actualmente hay {count} conjuntos de datos fuera de línea. Explique qué sistemas fuente actualizar primero.",
  "reports.workspace.ai.explainSelectionTitle": "\nExplicar la selección",
  "reports.workspace.ai.explainSelectionDescription":
    "\nUtilice la selección de texto actual para solicitar una explicación en lenguaje sencillo en el chat.",
  "reports.workspace.source.estate":
    "\nAbra el espacio de trabajo inmobiliario para revisar la preparación, las aprobaciones de proyectos y la postura estratégica del programa detrás de este informe.",
  "reports.workspace.source.assets":
    "\nAbra el registro de activos para agregar o corregir los registros de equipos que respaldan este informe.",
  "reports.workspace.source.buildings":
    "\nAbra los edificios para inspeccionar la jerarquía de las instalaciones, la postura de FM y los bloqueadores de preparación que influyen en este informe.",
  "reports.workspace.source.fleet":
    "\nFlota abierta para inspeccionar la utilización, el tiempo de inactividad, la presión de reemplazo y la situación operativa del equipo detrás de este informe.",
  "reports.workspace.source.financePlanning":
    "Planificación financiera abierta para inspeccionar la presión de aprobación, los escenarios de inversión y las compensaciones de capital relacionadas con este informe.",
  "reports.workspace.source.admin":
    "\nIntegraciones de administración abiertas para inspeccionar el estado del sistema asociado y los efectos de dependencia que dan forma a este informe.",
  "reports.workspace.source.sensors":
    "\nAbra sensores para inspeccionar la cobertura de telemetría, las brechas en la puesta en servicio y los problemas de calidad del dispositivo detrás de este informe.",
  "reports.workspace.source.tasks":
    "\nAbrir operaciones de tareas para validar el trabajo pendiente, la presión de mantenimiento y las acciones vencidas.",
  "reports.workspace.source.predictions":
    "\nAbra operaciones de predicción para revisar las ventanas de falla, la gravedad y la cobertura del modelo.",
  "reports.workspace.source.finance":
    "\nFinanzas abiertas para validar la exposición a la depreciación, la deriva de valoración y el riesgo de concentración.",
  "reports.workspace.source.utilisation":
    "\nUtilización abierta para inspeccionar evidencia de carga, saturación y ocupación respaldada por telemetría.",
  "reports.workspace.source.rfqs":
    "\nAbra el espacio de trabajo de RFQ para revisar la demanda entrante, la actividad de cotización y el estado de preparación para la conversión.",
  "reports.workspace.source.customerOrders":
    "\nAbrir pedidos de clientes para validar el progreso del proceso, las aprobaciones y la preparación para el cumplimiento.",
  "reports.workspace.source.workOrders":
    "\nAbra órdenes de trabajo para inspeccionar el flujo de ejecución, la postura del SLA y la presión de entrega.",
  "reports.workspace.source.purchaseOrders":
    "\nAbrir órdenes de compra para revisar los compromisos, recibos y antigüedad de los proveedores.",
  "reports.workspace.source.invoices":
    "\nAbrir facturas para revisar la emisión, la situación de los cobros y los saldos vencidos.",
  "reports.navigation.title": "\nNavegador de flujo de trabajo",
  "reports.navigation.description":
    "\nPase de la selección de conjuntos de datos a paquetes de cambios, desgloses y revisión de lagunas de datos sin salir del espacio de trabajo de informes.",
  "reports.navigation.menuTitle": "\nSecciones",
  "reports.navigation.menuDescription":
    "\nSaltar directamente a la etapa actual del flujo de trabajo de informes.",
  "reports.navigation.lanesTitle": "\nLíneas de decisión",
  "reports.navigation.lanesDescription":
    "\nCambie entre las intenciones del operador antes de profundizar en las acciones a nivel de sección o pasar el estado actual al chat.",
  "reports.navigation.cluster.decideTitle": "\nDecidir",
  "reports.navigation.cluster.decideDescription":
    "\nRevise la postura actual, el próximo movimiento recomendado y la preparación del conjunto de datos antes de cambiar el paquete.",
  "reports.navigation.cluster.composeTitle": "\nComponer",
  "reports.navigation.cluster.composeDescription":
    "\nCambie la audiencia, el enfoque, las secciones y la estructura del informe activo antes de informar o exportar.",
  "reports.navigation.cluster.investigateTitle": "\nInvestigar",
  "reports.navigation.cluster.investigateDescription":
    "\nPasar del resumen a la evidencia, comparar la cronología y validar lo que cambió.",
  "reports.navigation.cluster.improveTitle": "\nMejorar",
  "reports.navigation.cluster.improveDescription":
    "Utilice sistemas de chat y fuentes para cerrar brechas, restaurar la cobertura y fortalecer la confianza.",
  "reports.navigation.cluster.itemCount": "\n{count} secciones",
  "reports.navigation.stage.overview": "\nDescripción general",
  "reports.navigation.stage.overviewDesc":
    "\nPostura de la cartera, KPI resumidos y sesión informativa activa de IA.",
  "reports.navigation.stage.journey": "\nViaje",
  "reports.navigation.stage.journeyDesc":
    "\nPasos basados en decisiones para seleccionar la cobertura, cambiar el enfoque y profundizar en la variación.",
  "reports.navigation.stage.datasets": "\nConjuntos de datos",
  "reports.navigation.stage.datasetsDesc":
    "\nConjuntos de datos ejecutivos, de operaciones y financieros en vivo que alimentan cada paquete de informes.",
  "reports.navigation.stage.aiCopilot": "\nCopiloto de IA",
  "reports.navigation.stage.aiCopilotDesc":
    "\nMensajes prediseñados que abren el chat con el estado del informe actual ya adjunto.",
  "reports.navigation.stage.builder": "\nConstructor",
  "reports.navigation.stage.builderDesc":
    "\nAudiencia, enfoque, rango de fechas, secciones y controles narrativos.",
  "reports.navigation.stage.templates": "\nPlantillas",
  "reports.navigation.stage.templatesDesc":
    "\nPaquetes de informes integrados y guardados que se pueden iniciar en el espacio de trabajo.",
  "reports.navigation.stage.sourceHub": "\nCentro de origen",
  "reports.navigation.stage.sourceHubDesc":
    "\nSistemas operativos que pueden agregar evidencia, actualizar la cobertura o resolver una brecha de datos.",
  "reports.navigation.stage.drilldown": "\nDesglose",
  "reports.navigation.stage.drilldownDesc":
    "\nDetalle a nivel de fila y señales de concentración detrás del resumen actual.",
  "reports.navigation.stage.history": "\nCronología",
  "reports.navigation.stage.historyDesc":
    "\nHistorial de informes guardado para comparación, reproducción y control.",
  "reports.navigation.stage.activePack": "\nPaquete activo",
  "reports.navigation.stage.activePackDesc":
    "\nEl paquete de informes actual generado por el servidor, la narrativa y las secciones listas para exportar.",
  "reports.navigation.badge.live": "\nTodos en vivo",
  "reports.navigation.badge.ready": "\nListo",
  "reports.navigation.badge.offlineCount": "\n{count} desconectado",
  "reports.navigation.badge.datasetCount": "\n{count} conjuntos de datos",
  "reports.navigation.badge.sectionCount": "\n{count} secciones",
  "reports.navigation.badge.stepCount": "\n{count} pasos",
  "reports.navigation.badge.templateCount": "\n{count} paquetes",
  "reports.navigation.badge.aiActionCount": "\n{count} solicita",
  "reports.navigation.badge.sourceCount": "\n{count} fuentes",
  "reports.navigation.badge.savedCount": "\n{count} guardado",
  "reports.navigation.badge.coverage": "\nCobertura {score}%",
  "reports.navigation.badge.focus": "\n{focus} enfoque",
  "reports.navigation.badge.attention": "Atención: {label}",
  "reports.navigation.status.recommended": "\nRecomendado",
  "reports.navigation.status.complete": "\nCompleto",
  "reports.navigation.status.attention": "\nAtención",
  "reports.navigation.status.ready": "\nListo",
  "reports.navigation.action.jump": "\nAbrir sección",
  "reports.navigation.action.askAi": "\nPreguntar a AI",
  "reports.navigation.action.loadBuilder": "\nConstructor de escenario",
  "reports.navigation.action.loadBuilderAria": "\nConstructor de escenarios de {name}",
  "reports.navigation.action.loadDrilldown": "\nCargar desglose",
  "reports.navigation.whyNow": "\n¿Por qué ahora",
  "reports.navigation.whyNowComplete":
    "?\nEste paso ya está en un estado utilizable. Vuelva a abrirlo cuando cambie el paquete, la evidencia o la audiencia de decisión.",
  "reports.navigation.whyNowAttention":
    "\nResuelva aquí la variación marcada, la fuente obsoleta o la evidencia faltante antes de compartir el paquete.",
  "reports.navigation.whyNowReady":
    "\nEste paso está disponible cuando necesita refinar la historia, abrir evidencia o agregar datos de respaldo.",
  "reports.journey.title": "\nViaje de decisión",
  "reports.journey.description":
    "\nUn flujo de trabajo que prioriza las finanzas para seleccionar cobertura, cambiar el enfoque, modificar paquetes, profundizar en la variación e identificar datos faltantes.",
  "reports.ai.title": "\nCopiloto de IA",
  "reports.ai.description":
    "\nEnvíe el estado actual del informe al chat con indicaciones prediseñadas o explique las filas seleccionadas de cualquier tabla.",
  "reports.workspace.health.healthy": "Saludable",
  "reports.workspace.health.monitor": "\nMonitor",
  "reports.workspace.health.attention": "\nNecesita atención",
  "reports.workspace.health.offline": "\nDesconectado",
  "reports.posture.title": "\nPostura de informe",
  "reports.posture.description":
    "\nCobertura actual en vivo de los paquetes de informes de finanzas, operaciones y liderazgo.",
  "reports.generatedAt": "\nGenerado {date}",
  "reports.overview.reportCount": "\nPaquetes de informes",
  "reports.overview.assetsCovered": "\nActivos cubiertos",
  "reports.overview.predictionsDue": "\nPredicciones debidas",
  "reports.card.cadence.daily": "\nDiario",
  "reports.card.cadence.weekly": "\nSemanal",
  "reports.card.cadence.monthly": "\nMensual",
  "reports.card.metric.totalTypes": "\nTipos de activos",
  "reports.card.metric.criticalAssets": "\nActivos críticos",
  "reports.card.metric.criticalSignals": "\nSeñales críticas",
  "reports.types.depreciation": "\nResumen de depreciación",
  "reports.types.depreciationDesc":
    "\nValor contable, exposición ajustada por IA y activos principales por depreciación",
  "reports.types.assets": "\nResumen de activos",
  "reports.types.assetsDesc": "\nActivos por tipo, condición y desglose de valor contable",
  "reports.types.predictions": "\nResumen de predicciones",
  "reports.types.predictionsDesc": "\nPredicciones de fallas y degradación por gravedad y tipo",
  "reports.types.utilisation": "\nResumen de utilización",
  "reports.types.utilisationDesc": "\nTasas de utilización de activos y métricas de ocupación",
  "reports.types.executive": "\nResumen ejecutivo",
  "reports.types.executiveDesc":
    "\nIndicadores clave de rendimiento y descripción general del sistema",
  "reports.types.estateOperational": "\nImagen operativa del patrimonio",
  "reports.types.estateOperationalDesc":
    "\nInformes integrados de DIO sobre condición, ciclo de vida, preparación, proyectos, inspecciones y actividad laboral",
  "reports.types.strategicDecision": "\nInteligencia de decisiones estratégicas",
  "reports.types.strategicDecisionDesc":
    "\nAnálisis del ciclo de vida, riesgo de infraestructura, presión predictiva, análisis de rendimiento y priorización de inversiones en un solo paquete de decisiones",
  "reports.types.workOrders": "\nRendimiento de la orden de trabajo",
  "reports.types.workOrdersDesc":
    "\nRendimiento operativo, productividad de la fuerza laboral, presión de SLA y costos de mitigación en todas las órdenes de trabajo",
  "reports.types.purchaseOrders": "\nAntigüedad de la orden de compra",
  "reports.types.purchaseOrdersDesc":
    "\nPresión de entrega del proveedor, plazo de entrega y gasto comprometido en las órdenes de compra",
  "reports.types.customerOrders": "\nEmbudo de pedidos de clientes",
  "reports.types.customerOrdersDesc":
    "\nProgresión del pedido del cliente desde la aprobación hasta el cumplimiento y finalización",
  "reports.types.invoices": "\nAntigüedad de factura",
  "reports.types.invoicesDesc":
    "\nSaldos pendientes, postura de cobranza y presión vencida en todas las facturas",
  "reports.types.rfqs": "\nConversión de solicitud de cotización",
  "reports.types.rfqsDesc":
    "\nCalificación de RFQ, cotización, aceptación y conversión en pedidos de clientes",
  "reports.summary": "\nResumen",
  "reports.topAssets": "\nActivos principales",
  "reports.asset": "\nActivo",
  "reports.bookValue": "\nValor contable",
  "reports.severity": "\nGravedad",
  "reports.severity.info": "\nInformación",
  "reports.severity.warning": "\nAdvertencia",
  "reports.severity.critical": "\nCrítico",
  "reports.severity.emergency": "\nEmergencia",
  "reports.totalAssets": "\nActivos totales",
  "reports.totalBookValue": "\nValor total en libros",
  "reports.adjustedExposure": "\nExposición ajustada",
  "reports.byType": "\nPor tipo",
  "reports.byCondition": "\nPor condición",
  "reports.bySeverity": "\nPor gravedad",
  "reports.type": "\nTipo",
  "reports.condition": "\nCondición",
  "reports.status": "\nEstado",
  "reports.columns.workOrder": "\nOrden de trabajo",
  "reports.columns.activity": "\nActividad",
  "reports.columns.region": "\nRegión",
  "reports.columns.labourHours": "\nHoras de mano de obra",
  "reports.columns.productivity": "\nProductividad",
  "reports.columns.cycleHours": "\nHoras de ciclo",
  "reports.columns.cost": "\nCosto",
  "reports.columns.mitigation": "\nMitigación",
  "reports.columns.purchaseOrder": "\nOrden de compra",
  "reports.columns.vendor": "\nProveedor",
  "reports.columns.ageDays": "\nEdad Días",
  "reports.columns.order": "\nOrden",
  "reports.columns.customer": "\nCliente",
  "reports.columns.workOrders": "\nÓrdenes de trabajo",
  "reports.columns.invoice": "\nFactura",
  "reports.columns.due": "\nVencimiento",
  "reports.columns.rfq": "Solicitud de presupuesto",
  "reports.columns.title": "\nTítulo",
  "reports.count": "\nContar",
  "reports.recentPredictions": "\nPredicciones recientes",
  "reports.remainingDays": "\nDías restantes",
  "reports.confidence": "\nConfianza",
  "reports.avgUtilisation": "\nUtilización promedio",
  "reports.minMax": "\nMín – Máx",
  "reports.topByUtilisation": "\nArriba por utilización",
  "reports.utilisation": "\nUtilización",
  "reports.metric": "\nMétrica",
  "reports.value": "\nValor",
  "reports.overdueMaintenance": "\nMantenimiento vencido",
  "reports.openDocuments": "\nAbrir documentos",
  "reports.workOrders.open": "\nÓrdenes de trabajo abiertas",
  "reports.workOrders.reviewQueue": "\nCola de revisión",
  "reports.workOrders.completed": "\nÓrdenes de trabajo completadas",
  "reports.workOrders.breached": "\nSLA incumplido",
  "reports.workOrders.averageCycle": "\nCiclo promedio",
  "reports.workOrders.productivity": "\nProductividad media",
  "reports.workOrders.mitigationCost": "\nCosto de mitigación",
  "reports.workOrders.mitigationHours": "Horas de mitigación",
  "reports.workOrders.regionWatch": "\nRegión bajo vigilancia",
  "reports.workOrders.improvementFocus": "\nEnfoque de mejora",
  "reports.workOrders.mitigationActive": "\nMitigación activa",
  "reports.workOrders.mitigationClear": "\nEn el objetivo",
  "reports.estate.readiness": "\nDisponibilidad de capacidad",
  "reports.estate.rangeReadiness": "\nDisponibilidad de alcance",
  "reports.estate.criticalSignals": "\nSeñales críticas",
  "reports.estate.approvalPressure": "\nPresión de aprobación",
  "reports.estate.approvalDelays": "\nAprobaciones retrasadas",
  "reports.estate.labourHours": "\nHoras de mano de obra registradas",
  "reports.strategy.priorityFocus": "\nEnfoque prioritario",
  "reports.strategy.lifecyclePressure": "\nPresión del ciclo de vida",
  "reports.strategy.infrastructureRisk": "\nRiesgo de infraestructura",
  "reports.strategy.predictiveSignals": "\nSeñales predictivas",
  "reports.strategy.investmentPressure": "\nPresión inversora",
  "reports.strategic.focus.lifecycle": "\nRenovación del ciclo de vida",
  "reports.strategic.focus.infrastructure": "\nRiesgo de infraestructura",
  "reports.strategic.focus.predictive": "\nMantenimiento predictivo",
  "reports.strategic.focus.performance": "\nRendimiento operativo",
  "reports.strategic.focus.investment": "\nPriorización de inversiones",
  "reports.purchaseOrders.awaitingReceipt": "\nEn espera de recibo",
  "reports.purchaseOrders.overdue": "\nÓrdenes de compra vencidas",
  "reports.purchaseOrders.avgLeadTime": "\nPlazo de entrega medio",
  "reports.purchaseOrders.committed": "\nGasto comprometido",
  "reports.customerOrders.pending": "\nPendiente de aprobación",
  "reports.customerOrders.confirmed": "\nPedidos confirmados",
  "reports.customerOrders.fulfilment": "\nEn cumplimiento",
  "reports.customerOrders.converted": "\nConvertido de RFQ",
  "reports.customerOrders.booked": "\nValor reservado",
  "reports.invoices.outstanding": "\nImporte pendiente",
  "reports.invoices.overdue": "\nFacturas vencidas",
  "reports.invoices.collected": "\nEfectivo cobrado",
  "reports.invoices.partial": "\nPagado parcialmente",
  "reports.rfqs.submitted": "\nSolicitudes de cotización enviadas",
  "reports.rfqs.quoted": "\nRFQ cotizadas",
  "reports.rfqs.accepted": "\nRFQ aceptadas",
  "reports.rfqs.converted": "\nRFQ convertidas",
  "reports.rfqs.averageBudget": "\nPresupuesto medio",
  "reports.rfqs.pipeline": "\nTubería activa",
  "reports.downloadPdf": "\nDescargar PDF",
  "reports.viewAnalysis": "\nVer análisis",
  "reports.analysis": "\nAnálisis de datos",
  "reports.analysisLoading": "\nCargando análisis…",
  "reports.ai.askAi": "\nPreguntar a .bao",
  "reports.ai.askAiMissionAria": "\nPregúntale a .bao sobre el próximo movimiento recomendado",
  "reports.ai.askAiTemplateAria": "\nPregúntele a .bao sobre la plantilla {name}",
  "reports.ai.askAiPackAria": "\nPregúntele a .bao sobre el paquete de informes {name}",
  "reports.ai.askAiSectionAria": "\nPregúntale a .bao sobre la sección {name}",
  "reports.ai.askAiDrilldownAria": "\nPregúntele a .bao sobre el desglose {name}",
  "reports.insights": "\nPerspectivas",
  "reports.insights.depreciationCritical":
    "\n{count} predicción(es) crítica(s) que afectan la valoración",
  "reports.insights.depreciationHealthy":
    "\nNo hay predicciones críticas que afecten la valoración",
  "reports.insights.depreciationTotal": "\n{count} activos en el ámbito de depreciación",
  "reports.insights.topAssetType": "\n{type}: {count} activos",
  "reports.insights.noAssets": "\nNo hay activos en el sistema",
  "reports.insights.criticalAssets": "\n{count} activo(s) en condición crítica",
  "reports.insights.noCritical": "\nNo hay activos en condición crítica",
  "reports.insights.predictionsDue": "\n{count} predicciones vencen dentro de {days} días",
  "reports.insights.noPredictionsDue": "\nNo se realizarán predicciones dentro de {days} días",
  "reports.insights.criticalPredictions": "\n{count} predicción(es) crítica/de emergencia",
  "reports.insights.highUtilisation": "\nAlta utilización: considere la revisión de capacidad",
  "reports.insights.utilisationNormal": "\nUtilización dentro del rango normal",
  "reports.insights.utilisationMonitor":
    "\nLa utilización está fuera de la banda preferida y debe ser monitoreada",
  "reports.insights.assetCount": "\n{count} activos rastreados",
  "reports.insights.overdueTasks": "\n{count} tarea(s) de mantenimiento vencida",
  "reports.insights.noOverdue": "\nNo hay tareas de mantenimiento atrasadas",
  "reports.insights.workOrders.breached":
    "\n{count} orden(es) de trabajo están actualmente fuera de SLA.",
  "reports.insights.workOrders.noBreach": "\nNo hay órdenes de trabajo de muestra fuera del SLA.",
  "reports.insights.workOrders.avgCycle":
    "\nEl ciclo de finalización promedio es de {hours} horas en las finalizaciones recientes.",
  "reports.insights.workOrders.noCompleted":
    "\nNo hay órdenes de trabajo completadas disponibles para el análisis de rendimiento.",
  "reports.insights.workOrders.productivity":
    "\nLa productividad promedio es {rate} unidades de producción por hora de mano de obra en {hours} horas registradas.",
  "reports.insights.workOrders.mitigationCost":
    "{count} orden(es) de trabajo incumplidas actualmente conllevan {cost} de mitigación durante {hours} horas laborales.",
  "reports.insights.workOrders.noMitigation":
    "\nActualmente, ninguna orden de trabajo incumplida incluye mano de obra de mitigación rastreada.",
  "reports.insights.workOrders.activityWatch":
    "\n{activity} es el tipo de trabajo de menor productividad con {rate} unidades de producción por hora de trabajo.",
  "reports.insights.workOrders.regionWatch":
    "\n{region} es la carga de trabajo regional muestreada más débil con {rate} unidades de producción por hora de trabajo.",
  "reports.insights.workOrders.improvementFocus":
    "\nPriorizar acciones de mejora del desempeño en torno a {focus}.",
  "reports.insights.workOrders.noImprovementFocus":
    "\nNo surge ningún enfoque de mejora único de la muestra de orden de trabajo actual.",
  "reports.insights.estateOperational.infrastructureRisk":
    "\n{count} señales de riesgo patrimonial están activas en todos los datos de condición, inspección y predicción.",
  "reports.insights.estateOperational.infrastructureRiskClear":
    "\nNo hay señales críticas de riesgo patrimonial activas en el panorama patrimonial integrado.",
  "reports.insights.estateOperational.readinessGap":
    "\n{ready} de {total} capacidades rastreadas están completamente listas, y {constrainedSites} sitios restringidos aún afectan la preparación.",
  "reports.insights.estateOperational.readinessClear":
    "\nLas capacidades rastreadas actualmente están listas y sin restricciones a nivel de estado.",
  "reports.insights.estateOperational.approvalDelay":
    "\n{delayed} aprobaciones de proyectos están retrasadas, con {queue} proyectos adicionales todavía en la cola.",
  "reports.insights.estateOperational.approvalQueue":
    "\n{queue} aprobaciones de proyecto permanecen en la cola actual.",
  "reports.insights.estateOperational.approvalClear":
    "\nActualmente no hay aprobaciones de proyectos retrasadas ni en cola.",
  "reports.insights.estateOperational.inspectionBacklog":
    "\n{count} artículos de inspección están vencidos mientras que {hours} horas de mano de obra se registran en la actividad de entrega actual.",
  "reports.insights.estateOperational.workforceSignal":
    "\nActualmente se registran {hours} horas de mano de obra en toda la actividad operativa de entrega.",
  "reports.insights.estateOperational.investmentPressure":
    "\n{count} señales de presión de inversión están activas en {projects} proyectos y {initiatives} iniciativas estratégicas.",
  "reports.insights.estateOperational.investmentStable":
    "\nLas iniciativas estratégicas siguen registradas sin señales adicionales de presión inversora más allá de la base actual de {initiatives}.",
  "reports.insights.strategicDecision.lifecyclePressure":
    "\n{count} activos de vigilancia del ciclo de vida están activos y representan el {rate}% de la base patrimonial actual.",
  "reports.insights.strategicDecision.lifecycleStable":
    "\nActualmente, ningún activo sujeto a vigilancia del ciclo de vida está distorsionando la postura de inversión estratégica.",
  "reports.insights.strategicDecision.infrastructureRisk":
    "\n{count} señal(es) de riesgo de infraestructura están activas, equivalente al {rate}% de la base patrimonial actual.",
  "reports.insights.strategicDecision.infrastructureRiskClear":
    "Las señales de riesgo de infraestructura son actualmente claras en todo el panorama estratégico.",
  "reports.insights.strategicDecision.predictiveLoad":
    "\n{count} señales de mantenimiento predictivo están activas, incluidas {critical} predicciones críticas, y el {rate}% de los activos vence pronto.",
  "reports.insights.strategicDecision.predictiveClear":
    "\nLas señales de mantenimiento predictivo son actualmente claras en toda la propiedad monitoreada.",
  "reports.insights.strategicDecision.performanceSignal":
    "\nEl rendimiento operativo sigue determinado por {focus}, con una preparación del {readiness} % y una productividad de {productivity} unidades de producción por hora de trabajo.",
  "reports.insights.strategicDecision.performanceStable":
    "\nEl rendimiento operativo se mantiene estable con una preparación del {readiness}% y una productividad de {productivity} unidades de producción por hora de mano de obra.",
  "reports.insights.strategicDecision.investmentPriority":
    "\nLa priorización de inversiones actualmente está liderada por {focus}, con {count} señales vinculadas y {delayed} aprobaciones retrasadas que aún afectan la cola.",
  "reports.insights.strategicDecision.investmentStable":
    "\nLa postura de inversión estratégica es estable, y {focus} sigue siendo el área de vigilancia líder en lugar de una vía de presión activa.",
  "reports.insights.purchaseOrders.overdue":
    "\n{count} la(s) orden(es) de compra están más allá de su fecha de vencimiento.",
  "reports.insights.purchaseOrders.noOverdue": "\nActualmente no hay órdenes de compra vencidas.",
  "reports.insights.purchaseOrders.awaitingReceipt":
    "\n{count} las órdenes de compra aún están pendientes de recepción completa.",
  "reports.insights.purchaseOrders.avgLeadTime":
    "\nEl plazo medio de entrega del proveedor es de {days} días.",
  "reports.insights.customerOrders.fulfilment":
    "\n{count} los pedidos del cliente se encuentran actualmente en cumplimiento.",
  "reports.insights.customerOrders.noFulfilment":
    "\nActualmente no se están procesando pedidos de clientes.",
  "reports.insights.customerOrders.converted":
    "\n{count} pedidos de clientes se crearon a partir de RFQ aceptadas.",
  "reports.insights.invoices.overdue":
    "\n{count} las facturas están vencidas y necesitan seguimiento de cobros.",
  "reports.insights.invoices.noOverdue": "\nActualmente no hay facturas vencidas.",
  "reports.insights.invoices.paymentMix":
    "\n{paidCount} factura(s) están totalmente pagadas y {partialCount} permanecen parcialmente pagadas.",
  "reports.insights.rfqs.converted": "\n{count} Las RFQ se han convertido en pedidos de clientes.",
  "reports.insights.rfqs.pipeline":
    "\n{count} Las RFQ permanecen activas en las etapas de calificación o cotización.",
  "reports.insights.rfqs.noPipeline": "\nActualmente no hay RFQ activas en proceso comercial.",
  "reports.unknownReportType": "\nTipo de informe desconocido",
  "reports.generateFailed": "\nError al generar el informe",
  "reports.dataset.prompt":
    "Revise el conjunto de datos {dataset}. La salud es {health}. Métricas clave: {metrics}. Perspectivas: {insights}. Explique qué cambió, por qué es importante y si este conjunto de datos pertenece al paquete de informes actual.",
  "reports.pdfAuthor": "{brandName}",
  "reports.rawMetrics": "\nMétricas sin procesar",
  "reports.rawMetricsLower": "\nmétricas sin procesar",
  "reports.viewAnalysisAria": "\nVer análisis de {label}",
  "reports.journey.prompt.select":
    "\nSegún el espacio de trabajo de informes actual y las secciones seleccionadas ({sections}), ¿qué conjuntos de datos debo incluir en el siguiente paquete y por qué?",
  "reports.journey.prompt.change":
    "\nAyúdame a cambiar el informe actual para la audiencia {audience} con un enfoque {focus}. Recomiende cómo ajustar la audiencia, el enfoque o el rango de fechas y explique las ventajas y desventajas.",
  "reports.journey.prompt.modify":
    "\nRevise el paquete de informes actual con las secciones {sections}. Sugerir modificaciones concretas a la narrativa, la combinación de secciones y el orden.",
  "reports.journey.prompt.drilldown":
    "\nInvestigue el conjunto de datos {dataset}. Actualmente está marcado como {health}. Explique los posibles impulsores y las siguientes preguntas detalladas que debo hacer.",
  "reports.journey.prompt.drilldownUnavailable":
    "\nActualmente, ningún conjunto de datos tiene prioridad para el desglose.",
  "reports.journey.prompt.drilldownFallback":
    "\nIdentifique el siguiente área del informe que merece un análisis detallado y explique qué evidencia debo inspeccionar primero.",
  "reports.journey.prompt.addData":
    "\nIdentifique datos faltantes o obsoletos en este espacio de trabajo de informes. Actualmente hay {offlineCount} conjuntos de datos fuera de línea. Explique qué datos agregar o actualizar a continuación.",
  "reports.journey.prompt.addDataSource":
    "\nDígame qué evidencia adicional debo agregar o actualizar en {source} para mejorar este paquete de informes.",
  "reports.ai.prompt.explainPosture":
    "\nExplique la postura actual en materia de presentación de informes, las señales más importantes y en qué debería centrarse a continuación un lector ejecutivo o de finanzas.",
  "reports.ai.prompt.modifyPack":
    "\nAyúdame a modificar el paquete de informes actual para la audiencia {audience} con un enfoque {focus}. Las secciones actuales son {sections}. Recomendar qué agregar, quitar o ajustar.",
  "reports.ai.prompt.findGaps":
    "\nIdentifique la cobertura faltante o los datos obsoletos en este espacio de trabajo de informes y explique qué conjuntos de datos, filtros o actualizaciones adicionales mejorarían la confianza.",
  "reports.ai.prompt.findGapsWithSource":
    "\nIdentifique la cobertura faltante o los datos obsoletos en este espacio de trabajo de informes. Comienza con {source} y explica cómo mejoraría el paquete activo {pack}.",
  "reports.ai.prompt.sectionAnalysis":
    "Analizar la sección {section}. Explique las señales clave, los valores atípicos y las siguientes preguntas que debe hacer un operador.",
  "reports.templates.builtin.financeControl": "\nPaquete de control financiero",
  "reports.templates.builtin.financeControlDesc":
    "\nExposición a la depreciación y resumen ejecutivo para la supervisión financiera",
  "reports.templates.builtin.riskWatch": "\nPaquete de vigilancia de riesgos",
  "reports.templates.builtin.riskWatchDesc":
    "\nPredicciones, utilización y resumen ejecutivo de operaciones",
  "reports.templates.builtin.boardPack": "\nPaquete de tablero",
  "reports.templates.builtin.boardPackDesc":
    "\nResumen ejecutivo con depreciación y desglose de activos para el liderazgo",
  "reports.templates.builtin.fmGovernance": "\nPaquete de gobernanza FM",
  "reports.templates.builtin.fmGovernanceDesc":
    "\nPostura de gobernanza de FM, rendimiento de las órdenes de trabajo e inteligencia de decisiones estratégicas para la revisión de riesgos",
  "reports.templates.builtin.stewardship": "\nPaquete de mayordomía",
  "reports.templates.builtin.stewardshipDesc":
    "\nPostura de administración patrimonial con cobertura de activos e inteligencia de decisiones estratégicas para revisión operativa",
  "reports.templates.builtin.cateringEss": "\nPaquete Catering / ESS",
  "reports.templates.builtin.cateringEssDesc":
    "\nPanorama operativo del inmueble, rendimiento de entrega y postura ejecutiva para la supervisión de catering y ESS",
  "reports.templates.builtin.programmeControls": "\nPaquete de controles del programa",
  "reports.templates.builtin.programmeControlsDesc":
    "\nPostura ejecutiva, señales de entrega de bienes e inteligencia de decisiones estratégicas para la gobernanza del programa",
  "reports.builder.eyebrow": "\nEstudio constructor",
  "reports.builder.title": "\nGenerador de informes personalizados",
  "reports.builder.description":
    "\nReúna paquetes de informes multifuncionales con narrativas de IA, plantillas guardadas y desgloses más profundos.",
  "reports.builder.aiTitle": "\nCopiloto constructor",
  "reports.builder.aiDescription":
    "\nUtilice el chat para probar la combinación de secciones, el encuadre de la audiencia y la orientación del creador antes de la generación.",
  "reports.builder.ai.planTitle": "\nRecomendar sección mix",
  "reports.builder.ai.planDescription":
    "\nRevise la audiencia actual, el enfoque y las secciones seleccionadas antes de regenerar el paquete.",
  "reports.builder.ai.planPrompt":
    "\nRecomiende la mejor combinación de secciones para un informe dirigido a la audiencia {audience} con un enfoque {focus}. Las secciones seleccionadas actualmente son {sections}. Explique qué conservar, eliminar o agregar antes de la generación.",
  "reports.builder.ai.guidanceTitle": "\nBorrador de guía para el operador",
  "reports.builder.ai.guidanceDescription":
    "\nConvierta la configuración actual del constructor en una guía concisa que el operador pueda aplicar o pegar en el formulario.",
  "reports.builder.ai.guidancePrompt":
    "Borrador de una guía concisa para la creación de un informe dirigido a la audiencia {audience} con un enfoque {focus}. Las secciones seleccionadas son {sections}. La narrativa es {includeNarrative}. Los desgloses son {includeDrilldowns}. Sugiera el texto de orientación final y explique por qué mejorará el paquete.",
  "reports.builder.controlsTitle": "\nParámetros de compilación",
  "reports.builder.controlsDescription":
    "\nDefina la audiencia, el enfoque, la cobertura y la orientación del operador para el paquete de informes generado.",
  "reports.builder.reportTitleLabel": "\nTítulo del informe",
  "reports.builder.reportTitleHint": "\nSe utiliza como título del paquete de informes generado.",
  "reports.builder.audienceLabel": "\nAudiencia",
  "reports.builder.audience.risk": "\nRiesgo y garantía",
  "reports.builder.focusLabel": "\nEnfoque",
  "reports.builder.sectionsLabel": "\nSecciones",
  "reports.builder.sectionsHint": "\nSeleccione al menos una sección de informes para incluir.",
  "reports.builder.includeNarrative": "\nGenerar resumen narrativo",
  "reports.builder.includeNarrativeHint":
    "\nUtiliza el proveedor de IA configurado y recurre a un resumen determinista cuando no está disponible.",
  "reports.builder.includeDrilldowns": "\nIncluir desgloses",
  "reports.builder.includeDrilldownsHint":
    "\nAdjunte detalles operativos a nivel de tabla y métricas más profundas a cada sección seleccionada.",
  "reports.builder.guidanceLabel": "\nOrientación",
  "reports.builder.guidanceHint":
    "\nOrientación opcional que da forma a la narrativa generada y al énfasis.",
  "reports.builder.seed.financePlanning.source": "\nPlanificación financiera",
  "reports.builder.seed.financePlanning.alert":
    "\nSembrado de {source}: {title}. Revisar el alcance heredado antes de generar el paquete.",
  "reports.builder.seed.financePlanning.title": "\nTransferencia de planificación financiera",
  "reports.builder.seed.financePlanning.description":
    "\nEsta sesión de creación se cargó previamente desde un escenario financiero para que el paquete de informes pueda reutilizar el contexto de planificación aprobado.",
  "reports.builder.seed.financePlanning.scopeLabel": "\nAlcance",
  "reports.builder.seed.financePlanning.horizonLabel": "\nHorizonte",
  "reports.builder.seed.financePlanning.horizonValue": "\n{months} meses",
  "reports.builder.seed.financePlanning.guidanceLabel": "\nOrientación heredada",
  "reports.builder.generate": "\nGenerar paquete de informes",
  "reports.builder.loadDataset": "\nCargar conjunto de datos",
  "reports.builder.loadDatasetAria": "\nCargue el conjunto de datos {name} en el constructor ",
  "reports.builder.loadTemplate": "\nCargar plantilla",
  "reports.builder.loadTemplateAria": "\nCargue la plantilla {name} en el constructor ",
  "reports.builder.loadCurrentPack": "\nCargar paquete actual",
  "reports.builder.loadCurrentPackAria": "\nCargue el paquete actual {name} en el constructor",
  "reports.builder.loadSection": "\nSección de carga",
  "reports.builder.loadSectionAria": "\nCargue la sección {name} en el constructor",
  "reports.builder.loadDrilldown": "\nCargar desglose",
  "reports.builder.loadDrilldownAria": "\nCargue el desglose {name} en el constructor",
  "reports.builder.loadedDataset": "\nGenerador actualizado desde el conjunto de datos {name}.",
  "reports.builder.loadedTemplate": "\nGenerador actualizado desde la plantilla {name}.",
  "reports.builder.loadedSection": "\nConstructor centrado en la sección {name}.",
  "reports.builder.loadedPack": "\nGenerador actualizado desde el paquete de informes {name}.",
  "reports.builder.audience.finance": "\nFinanzas",
  "reports.builder.audience.operations": "\nOperaciones",
  "reports.builder.audience.executive": "\nEjecutivo",
  "reports.templates.saveTitle": "\nGuardar el constructor actual como plantilla",
  "reports.templates.saveDescription":
    "\nConservar las opciones actuales de combinación de secciones, audiencia e informe como un paquete reutilizable.",
  "reports.templates.nameLabel": "\nNombre de plantilla",
  "reports.templates.descriptionLabel": "\nDescripción",
  "reports.templates.saveAction": "\nGuardar plantilla",
  "reports.templates.error.invalid":
    "\nPlantilla no válida. Se requiere nombre y al menos una sección.",
  "reports.templates.error.saveFailed":
    "\nNo se pudo guardar la plantilla. Por favor, inténtalo de nuevo.",
  "reports.builder.focus.financial": "\nFinanciero",
  "reports.builder.focus.operations": "\nOperaciones",
  "reports.builder.focus.risk": "\nRiesgo",
  "reports.builder.focus.executive": "\nEjecutivo",
  "reports.custom.sectionsTitle": "Secciones disponibles",
  "reports.custom.previewTitle": "\nEspacio de trabajo de informe activo",
  "reports.custom.previewDescription":
    "\nPaquete de informes generado por el servidor con narrativa, análisis de secciones y datos desglosados en vivo.",
  "reports.custom.error.invalid":
    "\nSeleccione al menos una sección del informe para generar un paquete personalizado.",
  "reports.custom.generatedTitleSingle": "Para {audience}: {primarySection}",
  "reports.custom.generatedTitlePair": "Para {audience}: {primarySection} y {secondarySection}",
  "reports.custom.fallbackNarrativeIntro":
    "\nLa cobertura abarca {count} secciones para la audiencia {audience} con un enfoque {focus}.",
  "reports.custom.narrativeDisabled":
    "\nLa síntesis narrativa está deshabilitada para la compilación de este informe.",
  "reports.custom.workspaceEmpty":
    "\nEjecute una plantilla o elija secciones para crear un paquete de informes en vivo.",
  "reports.custom.fallbackNarrativeGuidance": "\nGuía del operador: {guidance}.",
  "reports.custom.section.depreciation":
    "\nLa exposición a la depreciación se sitúa en {adjustedExposure} en {totalAssets} activos.",
  "reports.custom.section.assets":
    "\n{criticalAssets} activos críticos se distribuyen entre {totalTypes} tipos de activos rastreados.",
  "reports.custom.section.predictions":
    "\nLas ventanas de predicción {predictionsDue} vencen pronto, incluidas las señales críticas {criticalCount}.",
  "reports.custom.section.utilisation":
    "\nLa utilización promedio es {utilisationRate} en {assetCount} activos activos.",
  "reports.custom.section.executive":
    "\n{activeTasks} tareas abiertas y {openDocuments} documentos operativos permanecen activos en todos los flujos de trabajo de entrega e ingresos.",
  "reports.custom.section.estateOperational":
    "\nLas señales de riesgo patrimonial de {criticalSignals} permanecen activas, la capacidad de preparación es {readiness} y las aprobaciones de proyectos {delayed} están retrasadas.",
  "reports.custom.section.strategicDecision":
    "\nLa inteligencia de decisiones estratégicas está actualmente dirigida por {focus}, con {riskCount} señal(es) de riesgo de infraestructura y {investmentCount} señal(es) de presión de inversión.",
  "reports.custom.section.workOrders":
    "\n{breachedCount} las órdenes de trabajo están fuera del SLA, la productividad promedio es {productivityRate} y el costo de mitigación es {mitigationCost}.",
  "reports.custom.section.purchaseOrders":
    "\n{overdueCount} las órdenes de compra están vencidas y el tiempo de entrega promedio es {avgLeadDays} días.",
  "reports.custom.section.customerOrders":
    "\n{fulfilmentCount} los pedidos de los clientes están en cumplimiento y {convertedCount} se originaron a partir de RFQ.",
  "reports.custom.section.invoices":
    "\n{overdueCount} facturas están vencidas y {outstandingAmount} aún está pendiente.",
  "reports.custom.section.rfqs":
    "\n{convertedCount} Las RFQ se han convertido en pedidos y {quotedCount} permanecen en la etapa de cotización.",
  "reports.drilldown.band.overloaded": "\nSobrecargado",
  "reports.drilldown.band.watch": "\nVer",
  "reports.drilldown.band.stable": "\nEstable",
  "reports.drilldown.depreciationTitle": "\nDesglose de la exposición a la depreciación",
  "reports.drilldown.depreciationDescription":
    "\nConcentración de valor máximo, condición actual y señales de gravedad más recientes para activos sensibles a la depreciación.",
  "reports.drilldown.assetsTitle": "\nDesglose de composición de activos",
  "reports.drilldown.assetsDescription":
    "\nComposición de la cartera por sitio, tipo, condición y concentración del valor contable actual.",
  "reports.drilldown.predictionsTitle": "Desglose de presión de predicción",
  "reports.drilldown.predictionsDescription":
    "\nEventos de predicción recientes con gravedad, confianza y contexto de vida restante.",
  "reports.drilldown.utilisationTitle": "\nDesglose de intensidad de utilización",
  "reports.drilldown.utilisationDescription":
    "\nPostura de utilización alineada con el espacio de trabajo en toda la cartera actual con sitio, tipo de activo y contexto de carga actual.",
  "reports.drilldown.maxUtilisation": "\nUtilización máxima",
  "reports.drilldown.bandTitle": "\nPostura",
  "reports.drilldown.executiveTitle": "\nDesglose de presión ejecutiva",
  "reports.drilldown.executiveDescription":
    "\nSeñales de presión operativa que abarcan el trabajo pendiente de mantenimiento, la exposición a la predicción, el flujo de documentos y el valor de la cartera.",
  "reports.drilldown.estateOperationalTitle": "\nDesglose del cuadro operativo del inmueble",
  "reports.drilldown.estateOperationalDescription":
    "\nPostura integrada a nivel de propiedad en cuanto a condición, ciclo de vida, preparación, inspecciones, aprobaciones de proyectos y presión de entrega.",
  "reports.drilldown.strategicDecisionTitle":
    "\nDesglose de inteligencia de decisiones estratégicas",
  "reports.drilldown.strategicDecisionDescription":
    "\nRealice un seguimiento de la exposición al ciclo de vida, el riesgo de infraestructura, la demanda predictiva, el rendimiento operativo y el enfoque de inversión desde un paquete de inteligencia estratégica.",
  "reports.drilldown.workOrdersTitle": "\nDesglose del rendimiento de la orden de trabajo",
  "reports.drilldown.workOrdersDescription":
    "\nÓrdenes de trabajo recientes con alcance regional, combinación de actividades, postura de productividad, estado de mitigación y costo de ejecución rastreado.",
  "reports.drilldown.purchaseOrdersTitle": "\nDesglose de antigüedad de órdenes de compra",
  "reports.drilldown.purchaseOrdersDescription":
    "\nÓrdenes de compra recientes con propiedad del proveedor, antigüedad, estado de entrega y valor comercial comprometido.",
  "reports.drilldown.customerOrdersTitle": "\nDesglose del embudo de pedidos de clientes",
  "reports.drilldown.customerOrdersDescription":
    "\nPedidos recientes de clientes con estado de cumplimiento, volumen de órdenes de trabajo vinculados y valor reservado.",
  "reports.drilldown.invoicesTitle": "\nDesglose de antigüedad de factura",
  "reports.drilldown.invoicesDescription":
    "\nFacturas recientes con propiedad del cliente, postura vencida, valor pendiente y movimiento de pago.",
  "reports.drilldown.rfqsTitle": "\nDesglose de conversión de RFQ",
  "reports.drilldown.rfqsDescription":
    "\nRFQ recientes con etapa comercial, presupuesto establecido y visibilidad de conversión de pedidos posteriores.",
  "reports.drilldown.empty.workOrders": "\nNo hay órdenes de trabajo disponibles para desglose.",
  "reports.drilldown.empty.estateOperational":
    "\nNo hay señales de imagen operativa del estado disponibles para el desglose.",
  "reports.drilldown.empty.strategicDecision":
    "\nNo hay señales de inteligencia de decisiones estratégicas disponibles para el desglose.",
  "reports.drilldown.empty.purchaseOrders": "\nNo hay órdenes de compra disponibles para desglose.",
  "reports.drilldown.empty.customerOrders":
    "\nNo hay pedidos de clientes disponibles para desglose.",
  "reports.drilldown.empty.invoices": "\nNo hay facturas disponibles para desglose.",
  "reports.drilldown.empty.rfqs": "No hay solicitudes de cotización disponibles para desglose.",
  "reports.drilldown.outlookTitle": "\nOutlook",
  "reports.drilldown.noteTitle": "\nNota",
  "reports.drilldown.executive.openDocumentsNote":
    "\n{count} documentos operativos permanecen activos: {rfqs} RFQ, {customerOrders} pedidos de clientes, {workOrders} órdenes de trabajo, {purchaseOrders} órdenes de compra y {invoices} facturas.",
  "reports.drilldown.executive.openDocumentsClear":
    "\nActualmente no hay documentos operativos abiertos.",
  "reports.drilldown.executive.bookValueNote":
    "\nLa utilización promedio en todo el patrimonio es actualmente {rate}.",
  "reports.drilldown.estateOperational.row.condition": "\nEstado del inmueble",
  "reports.drilldown.estateOperational.row.lifecycle": "\nRiesgo del ciclo de vida",
  "reports.drilldown.estateOperational.row.readiness": "\nPreparación para el entrenamiento",
  "reports.drilldown.estateOperational.row.inspection": "\nInspección y mano de obra",
  "reports.drilldown.estateOperational.row.approvals": "\nAprobaciones de proyectos",
  "reports.drilldown.estateOperational.row.delivery": "\nEntrega del proyecto",
  "reports.drilldown.strategicDecision.row.lifecycle":
    "\nAnálisis del ciclo de vida de los activos",
  "reports.drilldown.strategicDecision.row.infrastructure":
    "\nEvaluación de riesgos de infraestructura",
  "reports.drilldown.strategicDecision.row.predictive": "\nModelado de mantenimiento predictivo",
  "reports.drilldown.strategicDecision.row.performance": "\nAnálisis de rendimiento operativo",
  "reports.drilldown.strategicDecision.row.investment": "\nPriorización de inversiones",
  "reports.drilldown.estateOperational.value.condition":
    "\n{critical} crítico en {total} activos rastreados",
  "reports.drilldown.estateOperational.value.lifecycle":
    "\n{critical} señales críticas • {due} vence pronto",
  "reports.drilldown.estateOperational.value.readiness": "\n{ready} de {total} capacidades listas",
  "reports.drilldown.estateOperational.value.inspection": "\n{count} inspecciones vencidas",
  "reports.drilldown.estateOperational.value.approvals": "\n{delayed} retrasado • {queue} en cola",
  "reports.drilldown.estateOperational.value.delivery":
    "\n{highRisk} alto riesgo • {conflicts} conflicto(s)",
  "reports.drilldown.strategicDecision.value.lifecycle":
    "\n{count} activos de vigilancia del ciclo de vida representan actualmente {rate} de la base patrimonial.",
  "reports.drilldown.strategicDecision.value.infrastructure":
    "\n{count} señales de riesgo de infraestructura representan actualmente {rate} de la base patrimonial.",
  "reports.drilldown.strategicDecision.value.predictive":
    "\nLas señales de mantenimiento predictivo {count} están activas, incluidas las predicciones críticas {critical}.",
  "reports.drilldown.strategicDecision.value.performance":
    "\nLa disponibilidad de capacidad es {readiness} y la productividad es {productivity} unidades de producción por hora de trabajo.",
  "reports.drilldown.strategicDecision.value.investment":
    "\nLas señales de presión de inversión {count} están activas, lideradas por {focus}.",
  "reports.drilldown.estateOperational.note.condition":
    "\n{watch} activos se encuentran en etapas de monitoreo o fatiga del ciclo de vida.",
  "reports.drilldown.estateOperational.note.lifecycle":
    "\n{initiatives} iniciativas estratégicas permanecen en el registro del programa patrimonial.",
  "reports.drilldown.estateOperational.note.readiness":
    "\n{rate} preparación del rango con {constrainedSites} sitio(s) restringido(s).",
  "reports.drilldown.estateOperational.note.inspection":
    "\n{hours} horas de mano de obra registradas en la actividad de entrega operativa actual.",
  "reports.drilldown.estateOperational.note.approvals":
    "\n{projects} proyecto(s) actualmente registrados en la cartera inmobiliaria.",
  "reports.drilldown.estateOperational.note.delivery":
    "\n{count} señal(es) de presión de inversión agregada están activas.",
  "reports.drilldown.strategicDecision.note.lifecycle":
    "\n{total} los activos totales están representados en la base estratégica actual.",
  "reports.drilldown.strategicDecision.note.infrastructure":
    "\n{constrained} sitios restringidos y {inspections} inspecciones atrasadas aún contribuyen al riesgo de infraestructura.",
  "reports.drilldown.strategicDecision.note.predictive":
    "Las predicciones {due} vencen pronto y representan {rate} de la base patrimonial.",
  "reports.drilldown.strategicDecision.note.performance":
    "\n{focus} es actualmente el área de vigilancia de desempeño líder, con {mitigationCost} vinculada a la actividad de mitigación.",
  "reports.drilldown.strategicDecision.note.investment":
    "\n{delayed} aprobaciones retrasadas y {projects} señales de presión de entrega del proyecto permanecen activas.",
  "reports.drilldown.open": "\nAbrir desglose",
  "reports.drilldown.openAria": "\nVer desglose de {label}",
  "reports.drilldown.tableAria": "\nDatos desglosados para {title}",
  "reports.drilldown.consoleEyebrow": "\nConsola de desglose",
  "reports.drilldown.consoleDescription":
    "\nPase de métricas resumidas a filas operativas, señales de concentración y detalles listos para la acción.",
  "reports.drilldown.consoleTitle": "\nConsola de desglose",
  "reports.custom.sourceAi": "\nNarrativa de IA",
  "reports.custom.sourceSystem": "\nResumen basado en reglas",
  "reports.custom.provenance.financePlanning": "\nSemillas de Planificación Financiera",
  "reports.custom.provenance.summary":
    "\nSembrado desde {title} para {scope} en un horizonte de planificación de {months} meses.",
  "reports.custom.templateApplied": "\nPlantilla: {name}",
  "reports.custom.coverageTitle": "\nPuntuación de cobertura",
  "reports.custom.coverageDescription": "\n{count} secciones están incluidas en este paquete.",
  "reports.custom.tablePreview":
    "\nMostrando {visible} de {total} filas en la vista previa de esta sección.",
  "reports.custom.guidanceApplied": "\nOrientación aplicada: {guidance}",
  "reports.custom.narrativeTitle": "\nResumen narrativo",
  "reports.templates.libraryTitle": "\nBiblioteca de plantillas",
  "reports.templates.libraryDescription":
    "\nPaquetes de informes integrados y guardados que los operadores pueden iniciar directamente en el espacio de trabajo de informes activo.",
  "reports.templates.badgeBuiltin": "\nIncorporado",
  "reports.templates.badgeCustom": "\nGuardado",
  "reports.templates.badgeNarrative": "\nNarrativa",
  "reports.templates.badgeDrilldowns": "\nDesgloses",
  "reports.templates.run": "\nEjecutar paquete",
  "reports.templates.runAria": "\nPaquete de ejecución: {name}",
  "reports.templates.saved": "\nPlantilla guardada en la biblioteca.",
  "utilisation.title": "\nUtilización",
  "utilisation.subtitle":
    "\nCabina de utilización empresarial para telemetría, señales de IA y flujo operativo",
  "utilisation.cockpit.chatContext":
    "\nPágina de cabina de utilización. Espacio de trabajo unificado para la postura de utilización de la flota, la actualización de la telemetría, el contexto de predicción de la IA, el trabajo pendiente de mantenimiento, la comparación de sitios, las estadísticas de comando, las acciones del copiloto de la IA, la obtención de detalles del flujo de trabajo, la tabla de clasificación del sitio, la matriz de utilización, la cola de acciones, el tablero de tendencias, la cronología y la tabla de cartera ordenable. Controles: filtro de sitio, rango de fechas, tamaño de página, exportación CSV y borrar filtros.",
  "utilisation.cockpit.hero.eyebrow": "\nCabina de utilización",
  "utilisation.cockpit.hero.title":
    "\nTelemetría, señales de IA y flujo de capacidad en un solo espacio de trabajo",
  "utilisation.cockpit.hero.description":
    "\nRealice un seguimiento de la presión del sitio, la capacidad infrautilizada, la telemetría obsoleta y el contexto de mantenimiento en una cabina de utilización estilo Power BI diseñada para la toma de decisiones operativas.",
  "utilisation.cockpit.hero.live": "\nActualización automática cada {seconds} segundos",
  "utilisation.cockpit.filters.eyebrow": "\nFiltros",
  "utilisation.cockpit.filters.title": "\nAlcance del espacio de trabajo",
  "utilisation.cockpit.filters.description":
    "Filtre la cabina por sitio y ventana de tiempo, ajuste la densidad de la tabla y exporte la vista analítica actual.",
  "utilisation.cockpit.filters.exportDescription":
    "\nExporta la cartera de utilización filtrada actual en formato CSV.",
  "utilisation.cockpit.legend.eyebrow": "\nBandas de actuación",
  "utilisation.cockpit.legend.title": "\nLeer las bandas de postura",
  "utilisation.cockpit.legend.description":
    "\nCada activo se clasifica en una postura operativa determinista, de modo que los mismos umbrales controlan las tarjetas, las colas y la tabla de cartera.",
  "utilisation.cockpit.legend.optimal":
    "\nActivos que se ejecutan en la banda de utilización preferida con carga equilibrada y cobertura de telemetría saludable.",
  "utilisation.cockpit.legend.watch":
    "\nActivos con tendencias fuera del rango preferido y que vale la pena monitorear antes de que se conviertan en puntos de presión.",
  "utilisation.cockpit.legend.under":
    "\nActivos que operan por debajo de la banda objetivo, lo que indica capacidad excedente o posible desequilibrio de la demanda.",
  "utilisation.cockpit.legend.over":
    "\nActivos que operan por encima del umbral y que es más probable que necesiten alivio de carga, inspección o reasignación.",
  "utilisation.cockpit.actions.eyebrow": "\nFlujos de trabajo conectados",
  "utilisation.cockpit.actions.title": "\nMantenga el flujo en movimiento",
  "utilisation.cockpit.actions.description":
    "\nSalte directamente de la postura de utilización a los flujos de trabajo que explican o resuelven la presión de capacidad.",
  "utilisation.cockpit.actions.predictions":
    "\nRevise las predicciones de la IA y las señales de vida restante que afectan a los activos activos o inestables.",
  "utilisation.cockpit.actions.tasks":
    "\nEliminar los trabajos pendientes de mantenimiento y los trabajos atrasados relacionados con la presión de utilización.",
  "utilisation.cockpit.actions.reports":
    "\nGenere informes listos para las partes interesadas a partir del mismo conjunto de datos de utilización.",
  "utilisation.filters.title": "\nFiltros de cartera",
  "utilisation.filters.description":
    "\nAplique los cambios de sitio, ventana de tiempo y tamaño de página juntos antes de actualizar el registro de utilización.",
  "utilisation.filters.batchMode": "\nFiltros por lotes",
  "utilisation.filters.applyHint":
    "\nUtilice Aplicar filtros para actualizar la tira de resumen, el registro y el inspector juntos.",
  "utilisation.cockpit.briefing.title": "\nResumen de utilización",
  "utilisation.cockpit.briefing.eyebrow": "\nResumen del portafolio",
  "utilisation.cockpit.briefing.headlineDemand":
    "\nLa presión de la demanda se está concentrando en torno a un pequeño conjunto de activos",
  "utilisation.cockpit.briefing.headlineCapacity":
    "\nLa capacidad sobrante es visible en toda la cartera actual",
  "utilisation.cockpit.briefing.headlineData":
    "\nLa actualización de la telemetría está limitando la imagen de utilización",
  "utilisation.cockpit.briefing.headlineBalanced":
    "\nLa postura de utilización está ampliamente equilibrada en todo el ámbito actual",
  "utilisation.cockpit.briefing.summary":
    "\nPara {site} sobre {period}, la utilización promedio de la flota es {average}. Actualmente, la telemetría cubre {telemetry} activos, {over} está funcionando en caliente y {under} muestra capacidad adicional.",
  "utilisation.cockpit.briefing.recommendationTitle": "\nSiguiente movimiento recomendado",
  "utilisation.cockpit.briefing.recommendationPortfolio":
    "Ningún activo domina la cola en este momento. Mantenga actualizada la telemetría en {site} y concéntrese en mantener una cobertura equilibrada.",
  "utilisation.cockpit.briefing.recommendationAsset":
    '\nPriorice {asset} a continuación. Actualmente es el candidato más fuerte para "{action}" según la postura de utilización, el contexto de la señal de IA y la acumulación de trabajo activo.',
  "utilisation.cockpit.generatedAt": "\nGenerado {date}",
  "utilisation.cockpit.datasets.title": "\nCobertura del conjunto de datos",
  "utilisation.cockpit.datasets.description":
    "\nLa cabina combina telemetría, contexto de predicción de IA y señales de ejecución de trabajo en una sola superficie de decisión.",
  "utilisation.cockpit.datasets.assetsTitle": "\nActivos dentro del alcance",
  "utilisation.cockpit.datasets.assetsDescription":
    "\n{sites} sitios representados en el portafolio filtrado actual",
  "utilisation.cockpit.datasets.telemetryTitle": "\nLecturas de telemetría",
  "utilisation.cockpit.datasets.telemetryDescription":
    "\n{count} activos con telemetría en el periodo seleccionado",
  "utilisation.cockpit.datasets.aiTitle": "\nSeñales respaldadas por IA",
  "utilisation.cockpit.datasets.aiDescription":
    "\n{due} activos que vencen pronto según la predicción de vida restante",
  "utilisation.cockpit.datasets.tasksTitle": "\nAbrir elementos de trabajo",
  "utilisation.cockpit.datasets.tasksDescription":
    "\n{overdue} las tareas atrasadas están afectando actualmente el flujo de capacidad",
  "utilisation.cockpit.command.coverageTitle": "\nCobertura de telemetría",
  "utilisation.cockpit.command.coverageDescription":
    "\n{covered} cubierto • {blind} puntos ciegos • {stale} feeds obsoletos",
  "utilisation.cockpit.command.aiTitle": "\nCobertura de IA",
  "utilisation.cockpit.command.aiDescription":
    "\n{signals} activos con señales de IA • {due} vence pronto",
  "utilisation.cockpit.command.pressureTitle": "\nActivos de presión",
  "utilisation.cockpit.command.pressureDescription":
    "\n{hot} caliente • {under} infrautilizado • {stale} obsoleto",
  "utilisation.cockpit.command.documentsTitle": "\nAbrir flujo de documentos",
  "utilisation.cockpit.command.documentsDescription":
    "\n{workOrders} órdenes de trabajo y {documents} total de documentos vinculados permanecen activos.",
  "utilisation.cockpit.kpi.averageTitle": "\nPromedio de flota",
  "utilisation.cockpit.kpi.averageDescription":
    "\nUtilización promedio en toda la cartera filtrada, normalizada en una escala operativa de 0 a 100.",
  "utilisation.cockpit.kpi.optimalTitle": "\nActivos óptimos",
  "utilisation.cockpit.kpi.optimalDescription":
    "\nActivos que operan dentro de la banda de utilización preferida.",
  "utilisation.cockpit.kpi.warningTitle": "\nActivos de la lista de seguimiento",
  "utilisation.cockpit.kpi.warningDescription":
    "\n{under} infrautilizado y {watch} fuera de la banda preferida pero aún no crítico.",
  "utilisation.cockpit.kpi.criticalTitle": "\nAtención crítica",
  "utilisation.cockpit.kpi.criticalDescription":
    "\n{over} funcionando en caliente y {stale} con telemetría faltante o obsoleta.",
  "utilisation.inspector.summary.pressureBadge": "\n{count} excepciones en vivo",
  "utilisation.inspector.summary.telemetryBadge": "\n{count} excepciones de telemetría",
  "utilisation.inspector.summary.averageHint":
    "\nPromedio de la cartera actual en todo el alcance de utilización filtrado.",
  "utilisation.inspector.summary.exceptionTitle": "\nExcepciones",
  "utilisation.inspector.summary.exceptionHint":
    "\n{over} activos de telemetría sobrecargados, {under} infrautilizados y {stale} obsoletos están activos.",
  "utilisation.inspector.summary.coverageHint":
    "\n{blind} puntos ciegos y {stale} feeds obsoletos aún limitan la confianza.",
  "utilisation.cockpit.posture.optimal": "\nÓptimo",
  "utilisation.cockpit.posture.watch": "\nVer",
  "utilisation.cockpit.posture.under": "\nInfrautilizado",
  "utilisation.cockpit.posture.over": "\nSobrecargado",
  "utilisation.cockpit.site.title": "\nClasificación del sitio",
  "utilisation.cockpit.site.description":
    "\nCompare la postura del sitio según la utilización promedio, la cobertura de telemetría en vivo y la combinación de presiones.",
  "utilisation.cockpit.site.empty":
    "No hay datos de rendimiento del sitio disponibles para los filtros actuales.",
  "utilisation.cockpit.site.meta": "\n{assets} activos • {telemetry} con telemetría",
  "utilisation.cockpit.site.share": "\n{share} de activos visibles",
  "utilisation.cockpit.site.over": "\n{count} caliente",
  "utilisation.cockpit.site.under": "\n{count} infrautilizado",
  "utilisation.cockpit.site.watch": "\n{count} reloj",
  "utilisation.cockpit.site.optimal": "\n{count} óptimo",
  "utilisation.cockpit.queue.title": "\nCola de acciones",
  "utilisation.cockpit.queue.description":
    "\nActivos clasificados por presión, actualidad de la telemetría, gravedad de la señal de IA y trabajo operativo no resuelto.",
  "utilisation.cockpit.queue.empty":
    "\nNo hay ningún elemento de cola de acciones de utilización activo en este momento.",
  "utilisation.cockpit.queue.current": "\nActual {current} • Promedio {average}",
  "utilisation.cockpit.queue.tasks": "\n{open} tareas abiertas • {overdue} vencidas",
  "utilisation.cockpit.queue.lifeUnknown":
    "\nNo se adjunta ninguna predicción de vida restante a este activo.",
  "utilisation.cockpit.queue.lifeValue": "\n{days} días restantes de vida",
  "utilisation.cockpit.queue.telemetryMissing":
    "\nActualmente no hay telemetría en vivo disponible.",
  "utilisation.cockpit.queue.telemetryFresh": "\nÚltima telemetría {date}",
  "utilisation.cockpit.mix.title": "\nMezcla de posturas",
  "utilisation.cockpit.mix.description":
    "\nVea cómo se distribuye la cartera de activos visibles en las bandas de postura operativa.",
  "utilisation.cockpit.mix.empty":
    "\nNo hay ninguna combinación de posturas disponible para el portafolio actual.",
  "utilisation.cockpit.mix.assetCount": "\n{count} activos",
  "utilisation.cockpit.mix.average": "\nPromedio {value}",
  "utilisation.cockpit.matrix.title": "\nMatriz de utilización",
  "utilisation.cockpit.matrix.description":
    "\nUna cuadrícula de enfoque equilibrada entre activos sobrecargados, infrautilizados, en vigilancia y óptimos clasificados por materialidad operativa.",
  "utilisation.cockpit.matrix.empty":
    "\nNo hay activos de matriz de utilización disponibles para los filtros actuales.",
  "utilisation.cockpit.matrix.average": "\nPromedio {value}",
  "utilisation.cockpit.copilot.title": "\nCopiloto de IA",
  "utilisation.cockpit.copilot.description":
    "\nConvierta el alcance actual en un informe ejecutivo, una revisión de datos confiables o un plan de intervención sin salir de la cabina.",
  "utilisation.cockpit.copilot.focus": "\nEnfoque actual",
  "utilisation.cockpit.copilot.brief": "\nEscribir breve",
  "utilisation.cockpit.copilot.briefPrompt":
    "\nEscriba un resumen de utilización ejecutiva para {site} sobre {period}. Resalte la utilización promedio {average}, {over} activos sobrecargados, {under} activos infrautilizados y {stale} fuentes de telemetría obsoletas. Recomendar las próximas acciones operativas.",
  "utilisation.cockpit.copilot.data": "\nComprobar la confianza de los datos",
  "utilisation.cockpit.copilot.dataPrompt":
    "\nEvaluar la calidad de los datos para el espacio de trabajo de utilización actual. Hay {covered} activos con telemetría, {blind} sin telemetría y {stale} feeds obsoletos. Explique cuánta confianza deben depositar los operadores en esta cabina y qué lagunas de datos deben corregirse primero.",
  "utilisation.cockpit.copilot.intervention": "\nBorrador del plan de intervención",
  "utilisation.cockpit.copilot.interventionPromptAsset":
    "Elaborar un plan de intervención para el activo {asset} en {site}. La utilización actual es {current}, el promedio es {average}, la postura es {posture}, la acción recomendada es {action}, hay {open} tareas abiertas y {overdue} tareas vencidas y la vida restante es {life}.",
  "utilisation.cockpit.copilot.interventionPromptPortfolio":
    "\nRedactar un plan de intervención a nivel de cartera para {site} durante {period}. Concéntrese en los recursos de telemetría sobrecargados, infrautilizados y obsoletos y secuencia las siguientes acciones.",
  "utilisation.cockpit.workflow.title": "\nSeguimiento entre sistemas",
  "utilisation.cockpit.workflow.description":
    "\nPasar de la postura de utilización a los sistemas que explican el riesgo, aclaran el trabajo o empaquetan la historia para las partes interesadas.",
  "utilisation.cockpit.workflow.predictionsMeta":
    "\n{signals} activos respaldados por señales • {due} vence pronto",
  "utilisation.cockpit.workflow.tasksMeta": "\n{open} tareas abiertas • {overdue} vencidas",
  "utilisation.cockpit.workflow.reportsMeta":
    "\n{blind} puntos ciegos de telemetría • {documents} documentos abiertos",
  "utilisation.cockpit.workflow.fleetMeta":
    "\n{vehicles} activos en movimiento • {backlog} tareas abiertas",
  "utilisation.cockpit.workflow.sensorsMeta":
    "\n{blind} puntos ciegos de telemetría • {stale} feeds obsoletos",
  "utilisation.cockpit.workflow.buildingsMeta":
    "\n{sites} sitios activos • {signals} activos respaldados por IA",
  "utilisation.cockpit.trend.title": "\nTablero de tendencias",
  "utilisation.cockpit.trend.description":
    "\nLos puntos de tendencia de utilización diaria ayudan a los operadores a detectar la deriva, la volatilidad y la densidad de muestreo a lo largo del tiempo.",
  "utilisation.cockpit.trend.empty":
    "\nNo hay puntos de tendencia de utilización disponibles para el período de tiempo actual.",
  "utilisation.cockpit.trend.samples": "\n{count} muestras de telemetría",
  "utilisation.cockpit.trend.low": "\nBajo {value}",
  "utilisation.cockpit.trend.high": "\nAlto {value}",
  "utilisation.cockpit.chronology.title": "\nCronología de utilización",
  "utilisation.cockpit.chronology.description":
    "\nLos eventos de telemetría recientes proporcionan un seguimiento de auditoría rápido de cómo se observó la postura actual.",
  "utilisation.cockpit.chronology.empty":
    "\nNo hay cronología de telemetría disponible para el alcance del filtro actual.",
  "utilisation.cockpit.chronology.value": "\nObservado {value}",
  "utilisation.cockpit.table.title": "\nCartera de utilización",
  "utilisation.cockpit.table.description":
    "\nVista de cartera ordenable que combina la utilización actual, la dirección de la tendencia, el contexto de la señal de IA y la presión de la cola.",
  "utilisation.cockpit.table.live": "\nMesa en vivo",
  "utilisation.cockpit.table.asset": "\nActivo",
  "utilisation.cockpit.table.current": "\nActual",
  "utilisation.cockpit.table.trend": "\nTendencia",
  "utilisation.cockpit.table.signal": "\nSeñal",
  "utilisation.cockpit.table.queue": "\nCola",
  "utilisation.cockpit.table.average": "\nPromedio {value}",
  "utilisation.cockpit.table.trendValue": "Tendencia {direction} {value}",
  "utilisation.cockpit.table.trendUp": "\nArriba",
  "utilisation.cockpit.table.trendDown": "\nAbajo",
  "utilisation.cockpit.table.trendFlat": "\nPiso",
  "utilisation.cockpit.table.tasksValue": "\n{count} tareas abiertas",
  "utilisation.cockpit.table.queueValue":
    "\n{overdue} vencidos • {workOrders} órdenes de trabajo • {documents} documentos",
  "utilisation.cockpit.table.empty":
    "\nNo hay datos de utilización disponibles para los filtros seleccionados. Conecte la telemetría o amplíe la ventana de tiempo para completar el portafolio.",
  "utilisation.cockpit.table.emptyAction": "\nVer activos",
  "utilisation.inspector.title": "\nInterpretación seleccionada",
  "utilisation.inspector.subtitle":
    "Revise el activo activo, sus excepciones actuales y la próxima acción de informe de un inspector.",
  "utilisation.inspector.emptyTitle": "\nSeleccione un activo",
  "utilisation.inspector.emptyDescription":
    "\nElija una fila de registro para inspeccionar la situación de utilización, los motivos de excepción y las acciones de informes.",
  "utilisation.inspector.generatedLabel": "\nActualización del inspector",
  "utilisation.inspector.assetSubtitle": "{site} • {type} • {condition} • {lifecycle}",
  "utilisation.inspector.stats.signalHint":
    "\n{tasks} tareas abiertas y {workOrders} órdenes de trabajo activas contribuyen a la recomendación actual.",
  "utilisation.inspector.reasonsTitle": "\nRazones de excepción",
  "utilisation.inspector.aiPrompt":
    "\nResuma la postura de utilización para {asset} en {site}. La utilización actual es {current}, la utilización promedio es {average} y la acción recomendada actual es {action}. Explique las causas probables, el riesgo operativo y la próxima acción de presentación de informes.",
  "utilisation.inspector.tableSubtitle":
    "\nUtilice el registro como superficie de análisis principal; seleccione una fila para actualizar el panel de interpretación de la derecha.",
  "utilisation.inspector.tableBadge": "\nRegistro dominante",
  "utilisation.inspector.interpretation.noTelemetry":
    "\nNo se puede confiar en {asset} en {site} desde el punto de vista operativo porque no hay telemetría actual que alimente la vista de utilización.",
  "utilisation.inspector.interpretation.staleTelemetry":
    "\n{asset} muestra la utilización actual de {current} frente a un promedio de {average}, pero la fuente está obsoleta y necesita confirmación de telemetría antes de que los operadores actúen.",
  "utilisation.inspector.interpretation.overloaded":
    "\n{asset} está funcionando por encima de la banda preferida con la utilización actual de {current} frente a un promedio de {average}. A continuación se debe revisar el alivio de la demanda o la redistribución de la carga de trabajo.",
  "utilisation.inspector.interpretation.underused":
    "\n{asset} está funcionando por debajo de la banda preferida con la utilización actual de {current} frente a un promedio de {average}. Es posible que haya capacidad adicional disponible para su redistribución.",
  "utilisation.inspector.interpretation.watch":
    "\n{asset} está fuera de la banda equilibrada en la utilización actual de {current} frente a un promedio de {average}. Mantenga la cola bajo revisión antes de que se endurezca la excepción.",
  "utilisation.inspector.interpretation.balanced":
    "\n{asset} actualmente está equilibrado en {current} utilización actual frente a un promedio de {average}, sin ninguna excepción dominante que exija una escalada inmediata.",
  "utilisation.inspector.reason.noTelemetry":
    "Falta telemetría en vivo, por lo que la situación de utilización se infiere actualmente del contexto operativo parcial.",
  "utilisation.inspector.reason.staleTelemetry":
    "\nLa actualización de la telemetría está degradada, por lo que es necesario confirmar la última lectura de utilización.",
  "utilisation.inspector.reason.overloaded":
    "\nLa utilización está por encima de la banda operativa preferida y puede requerir alivio de la demanda.",
  "utilisation.inspector.reason.underused":
    "\nLa utilización está por debajo de la banda operativa preferida y puede indicar capacidad excedente.",
  "utilisation.inspector.reason.watch":
    "\nLa utilización está fuera de la banda equilibrada y debería permanecer en la lista de vigilancia.",
  "utilisation.inspector.reason.remainingLife":
    "\nLa postura de vida restante de la IA se ha reducido a {days} días y debe tenerse en cuenta en las próximas acciones.",
  "utilisation.inspector.reason.overdueTasks":
    "\n{count} las tareas de mantenimiento vencidas todavía están abiertas para este activo.",
  "utilisation.inspector.reason.workOrders":
    "\n{count} las órdenes de trabajo activas ya están vinculadas a este activo.",
  "utilisation.inspector.reason.documents":
    "\n{count} los documentos vinculados permanecen abiertos en todo el flujo de trabajo comercial.",
  "utilisation.inspector.reason.none":
    "\nNo hay ninguna excepción dominante activa más allá de la postura de utilización actual.",
  "utilisation.cockpit.csv.asset": "\nActivo",
  "utilisation.cockpit.csv.site": "\nSitio",
  "utilisation.cockpit.csv.type": "\nTipo",
  "utilisation.cockpit.csv.condition": "\nCondición",
  "utilisation.cockpit.csv.lifecycle": "\nCiclo de vida",
  "utilisation.cockpit.csv.current": "\nUtilización actual",
  "utilisation.cockpit.csv.average": "\nUtilización media",
  "utilisation.cockpit.csv.trend": "\nDelta de tendencia",
  "utilisation.cockpit.csv.posture": "\nPostura",
  "utilisation.cockpit.csv.latestTelemetry": "\nÚltima telemetría",
  "utilisation.cockpit.csv.telemetrySamples": "\nMuestras de telemetría",
  "utilisation.cockpit.csv.severity": "\nGravedad de la IA",
  "utilisation.cockpit.csv.confidence": "\nConfianza en la IA",
  "utilisation.cockpit.csv.remainingLifeDays": "\nDías de vida restantes",
  "utilisation.cockpit.csv.openTasks": "\nTareas abiertas",
  "utilisation.cockpit.csv.overdueTasks": "\nTareas atrasadas",
  "utilisation.cockpit.csv.activeWorkOrders": "\nÓrdenes de trabajo activas",
  "utilisation.cockpit.csv.openDocuments": "\nAbrir documentos",
  "utilisation.cockpit.csv.recommendedAction": "\nAcción recomendada",
  "utilisation.cockpit.action.connectData": "\nConectar telemetría",
  "utilisation.cockpit.action.refreshTelemetry": "\nActualizar telemetría",
  "utilisation.cockpit.action.inspectAsset": "\nInspeccionar activo",
  "utilisation.cockpit.action.relieveDemand": "\nAliviar la demanda",
  "utilisation.cockpit.action.clearBacklog": "\nBorrar trabajos pendientes",
  "utilisation.cockpit.action.redeployCapacity": "\nRedistribuir capacidad",
  "utilisation.cockpit.action.coordinateWorkOrders": "\nCoordinar órdenes de trabajo",
  "utilisation.cockpit.action.alignDocuments": "\nAlinear el flujo de documentos",
  "utilisation.cockpit.action.monitorFlow": "\nMonitorear flujo",
  "admin.title": "\nCentro de control de administración",
  "admin.subtitle":
    "\nEspacio de trabajo empresarial para identidad, ubicaciones, inteligencia artificial, integraciones corporativas, seguridad y gobernanza",
  "admin.audit.at": "\nEn",
  "admin.audit.timestamp": "\nMarca de tiempo",
  "admin.audit.actor": "\nActor",
  "admin.audit.action": "\nAcción",
  "admin.audit.entity": "\nEntidad",
  "admin.system.users": "\nUsuarios",
  "admin.system.assets": "\nActivos",
  "admin.system.tasks": "\nTareas",
  "admin.system.predictions": "\nPredicciones",
  "admin.system.registeredRoutes": "\nRutas registradas",
  "admin.system.apiRoutes": "\nRutas API",
  "admin.system.htmlRoutes": "\nRutas HTML",
  "admin.system.staticRoutes": "\nRutas estáticas",
  "admin.system.authRoutes": "\nRutas de autenticación",
  "admin.system.databaseConfigured": "\nBase de datos configurada",
  "admin.system.selfHostedAssets": "\nActivos autohospedados",
  "utilisation.chart.metaTitle": "\nPanel de tendencias y resumen",
  "utilisation.chart.summaryLabel": "\nÚltimo agregado de utilización de 24 horas.",
  "utilisation.chart.avgMinMax": "\nPromedio {avg}%, Mín. {min}%, Máx. {max}%",
  "finance.depreciation.summary.title": "\nExposición a la depreciación",
  "finance.depreciation.summary.description": "\nValoración combinada estándar y ajustada por IA",
  "finance.depreciation.summary.totalAssetsDescription": "\nActivos totales: {count}",
  "finance.depreciation.summary.adjustmentHint": "\nFactores de ajuste de IA aplicados",
  "finance.depreciation.summary.severityCount": "\n{critical} crítico, {warning} advertencia",
  "finance.depreciation.summary.delta": "\nValoración de IA delta",
  "finance.depreciation.summary.deltaDescription":
    "\n{amount} variación del valor contable inicial",
  "finance.depreciation.summary.highRiskExposure": "\nExposición de alto riesgo",
  "finance.depreciation.summary.highRiskExposureDescription":
    "\n{count} activos en condición crítica o fatigante",
  "finance.depreciation.summary.adjustmentRate": "\nTasa de ajuste {rate}",
  "finance.depreciation.mix.assetCount": "\n{count} activos",
  "finance.depreciation.conditionMix.title": "\nConcentración de condición",
  "finance.depreciation.conditionMix.description":
    "Exposición de valor contable agrupada por condición de activo actual.",
  "finance.depreciation.typeMix.title": "\nTipo concentración",
  "finance.depreciation.typeMix.description":
    "\nLas clases de activos de mayor valor impulsan la postura actual de depreciación.",
  "finance.depreciation.topAssets.title": "\nActivos prioritarios",
  "finance.depreciation.topAssets.description":
    "\nActivos de mayor valor con mayor impacto de depreciación.",
  "finance.depreciation.topAssets.empty": "\nSin activos",
  "finance.depreciation.topAssets.aiAdjusted": "\nAjustado por IA",
  "finance.depreciation.table.title": "\nTabla de depreciación",
  "finance.depreciation.table.description":
    "\nValor contable estándar versus exposición ajustada por IA, estado de condición y señal de riesgo real.",
  "finance.depreciation.table.site": "\nSitio",
  "finance.depreciation.table.type": "\nTipo",
  "finance.depreciation.table.condition": "\nCondición",
  "finance.depreciation.table.signal": "\nSeñal",
  "finance.depreciation.table.aiAdjusted": "\nIA ajustada",
  "finance.depreciation.table.variance": "\nVarianza",
  "finance.depreciation.stage.acquisition": "\nAdquisición",
  "finance.depreciation.stage.activeService": "\nServicio activo",
  "finance.depreciation.stage.midLife": "\nMitad de vida",
  "finance.depreciation.stage.endOfLife": "\nFin de vida",
  "finance.depreciation.stage.disposal": "\nBaja",
  "finance.depreciation.stage.lifecycleLabel": "\nEtapas del ciclo de vida del activo",
  "finance.period.currentQuarter": "\nTrimestre actual",
  "finance.period.lastQuarter": "\nÚltimo trimestre",
  "finance.period.ytd": "\nAño hasta la fecha",
  "finance.period.all": "\nTodo el tiempo",
  "finance.tab.overview": "\nDescripción general",
  "finance.tab.depreciation": "\nAnálisis de depreciación",
  "finance.tab.costAnalysis": "\nCosto y valoración",
  "finance.overview.portfolioValue": "\nValor de cartera",
  "finance.overview.portfolioDescription": "\nValor contable total en todos los activos",
  "finance.overview.aiExposure": "\nExposición ajustada por IA",
  "finance.overview.aiExposureDescription": "\nValoración ajustada al riesgo",
  "finance.overview.depreciationRate": "\nTasa de ajuste",
  "finance.overview.depreciationRateDescription":
    "\nMultiplicador de depreciación impulsado por IA",
  "finance.overview.assetCount": "\nActivos rastreados",
  "finance.overview.assetCountDescription": "\nActivos totales bajo gestión",
  "finance.overview.byDepMethod": "\nPor método de depreciación",
  "finance.overview.byCondition": "\nPor condición",
  "finance.depMethod.STRAIGHT_LINE": "\nLínea recta",
  "finance.depMethod.DECLINING_BALANCE": "\nSaldo decreciente",
  "finance.depMethod.UNITS_OF_PRODUCTION": "\nUnidades de Producción",
  "finance.depMethod.AI_ADJUSTED": "\nIA ajustada",
  "finance.costAnalysis.purchaseVsBook": "\nCompra vs valor contable",
  "finance.costAnalysis.totalPurchasePrice": "\nPrecio total de compra",
  "finance.costAnalysis.totalBookValue": "\nValor contable actual",
  "finance.costAnalysis.totalDepreciation": "\nDepreciación total",
  "finance.costAnalysis.totalDepreciationDescription": "\nDepreciación total: {amount}",
  "finance.costAnalysis.depreciationPercent": "\nDepreciación %",
  "finance.costAnalysis.topDepreciating": "\nPrincipales activos que se deprecian",
  "finance.costAnalysis.topDepreciatingEmpty":
    "\nNo hay datos de depreciación disponibles para los filtros seleccionados.",
  "finance.costAnalysis.byLifecycle": "\nPor etapa del ciclo de vida",
  "finance.costAnalysis.avgAge": "\nEdad promedio de los activos",
  "finance.costAnalysis.avgAgeDescription": "\nDesde la fecha de compra hasta hoy",
  "finance.costAnalysis.days": "\n{count} días",
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
  "reports.tab.financial": "\nFinanciero",
  "reports.tab.operations": "\nOperaciones",
  "reports.tab.executive": "\nEjecutivo",
  "reports.summary.totalReports": "\nInformes disponibles",
  "reports.summary.totalReportsDesc": "\nEn todas las categorías",
  "reports.summary.criticalPredictions": "\nPredicciones críticas",
  "reports.summary.criticalPredictionsDesc": "\nAfectando las valoraciones de activos",
  "reports.summary.totalBookValue": "\nValor total en libros",
  "reports.summary.totalBookValueDesc": "\nValoración actual de la cartera",
  "reports.summary.assetCount": "\nActivos rastreados",
  "reports.summary.assetCountDesc": "\nBajo gestión activa",
  "admin.system.online": "\nSistema en línea",
  "admin.aiSettings.title": "\nProveedor de IA",
  "admin.aiSettings.subtitle":
    "\nEstablezca el proveedor activo, el estado de la clave de tiempo de ejecución y el identificador del modelo.",
  "admin.aiSettings.provider": "\nProveedor",
  "admin.aiSettings.apiKey": "\nClave API",
  "admin.aiSettings.apiKeyPlaceholder": "\nDéjelo en blanco para mantener la clave actual",
  "admin.aiSettings.model": "\nModelo",
  "admin.aiSettings.modelPlaceholder": "\nIngrese el ID de modelo específico del proveedor",
  "admin.aiSettings.save": "\nGuardar configuración",
  "admin.aiSettings.saved": "\nConfiguraciones guardadas y aplicadas a nuevas solicitudes de IA.",
  "admin.aiSettings.current": "\nValor de tiempo de ejecución actual",
  "admin.aiSettings.currentProvider": "\nProveedor actual",
  "admin.aiSettings.currentModel": "\nModelo actual",
  "admin.aiSettings.currentSource": "\nFuente actual",
  "admin.aiSettings.providerPlaceholder": "\nSeleccione proveedor",
  "admin.aiSettings.notConfigured": "\nNo configurado",
  "admin.aiSettings.apiKeyConfigured": "\nConfigurado",
  "admin.aiSettings.source.environment": "\nValores predeterminados del entorno",
  "admin.aiSettings.source.systemConfig": "\nConfiguración del sistema",
  "admin.aiSettings.validation.providerRequired": "\nSeleccione un proveedor de IA válido.",
  "admin.aiSettings.validation.modelRequired": "\nSe requiere el identificador del modelo.",
  "admin.aiSettings.saveFailed": "\nNo se puede guardar la configuración de IA en este momento.",
  "admin.aiSettings.systemConfigDescription":
    "\nConfiguración de tiempo de ejecución de IA persistente aplicada a nuevas solicitudes de IA.",
  "admin.aiSettings.airgappedHint":
    "\nLas implementaciones con espacio aéreo solo permiten proveedores de IA locales como RamaLama u Ollama.",
  "admin.aiSettings.airgappedCurrentProviderBlocked":
    "El proveedor persistente está fuera de la política de espacio aéreo. Seleccione un proveedor local para guardar una configuración de tiempo de ejecución compatible.",
  "admin.aiSettings.envNote":
    "\nLa configuración del sistema anula los valores predeterminados del entorno para nuevas solicitudes de IA. Configure AI_BASE_URL en el entorno solo cuando necesite un punto final de proveedor personalizado.",
  "admin.section.overview": "\nDescripción general",
  "admin.section.overviewDescription":
    "\nSupervise la identidad, la dependencia de la plataforma, el tiempo de ejecución de la IA y la postura de gobernanza desde un plano de control.",
  "admin.section.users": "\nGestión de usuarios",
  "admin.section.usersDescription":
    "\nInspeccionar, modificar y controlar el acceso, las sesiones y las preferencias del operador.",
  "admin.section.branding": "Branding",
  "admin.section.brandingDescription":
    "Manage default and party-owned brands, domain mappings, metadata, and runtime theme tokens.",
  "admin.section.locations": "\nUbicaciones y borde",
  "admin.section.locationsDescription":
    "\nAdministre sitios, huella operativa y cobertura de dispositivos en todo el patrimonio.",
  "admin.section.ai": "\nOperaciones de IA",
  "admin.section.aiDescription":
    "\nControle la configuración del tiempo de ejecución y rastree hasta los conjuntos de datos que alimentan la plataforma.",
  "admin.section.integrations": "\nIntegraciones corporativas",
  "admin.section.integrationsDescription":
    "\nRegistre los sistemas de recursos humanos, finanzas, adquisiciones y documentos que siguen siendo los sistemas de registro externos.",
  "admin.section.security": "\nPostura de seguridad",
  "admin.section.securityDescription":
    "\nRevise el acceso basado en roles, la actividad de auditoría y la situación de los límites de almacenamiento desde un espacio de trabajo.",
  "admin.section.governance": "\nGobernanza",
  "admin.section.governanceDescription":
    "\nBuscar, exportar e investigar eventos administrativos y de autenticación.",
  "admin.nav.metricDatabaseOnline": "\nBase de datos en línea",
  "admin.nav.metricDatabaseOffline": "\nBase de datos fuera de línea",
  "admin.nav.metricUnavailable": "\nNo disponible",
  "admin.nav.usersMetric": "\n{count} usuarios • {sessions} sesiones en vivo",
  "admin.nav.brandingMetric": "{count} brands managed",
  "admin.nav.locationsMetric": "\n{count} sitios • {devices} dispositivos",
  "admin.nav.aiMetric": "Proveedor: {provider} • Modelo: {model}",
  "admin.nav.integrationsMetric": "\n{count} sistemas configurados",
  "admin.nav.securityMetric": "\n{privileged} privilegiado • {events} eventos",
  "admin.nav.governanceMetric": "\n{count} eventos recientes",
  "admin.controlCenter.kicker": "\nAdministración empresarial",
  "admin.controlCenter.description":
    "\nPase de la postura del estado a los detalles del usuario, la ubicación, la IA, la integración, la seguridad y la gobernanza sin salir del centro de control.",
  "admin.summary.activeWorkspace": "\nEspacio de trabajo activo",
  "admin.summary.aiRuntime": "\nTiempo de ejecución de IA",
  "admin.summary.userSessions": "\nSesiones en vivo",
  "admin.summary.userSessionsHint": "\nSesiones de operador simultáneas activas en este momento",
  "admin.copilot.title": "\nCopiloto administrador",
  "admin.copilot.description":
    "\nInicie una investigación, un plan de cambio o un informe del operador en el chat utilizando el contexto del espacio de trabajo actual.",
  "admin.launchpads.title": "\nPlataformas de lanzamiento del espacio de trabajo",
  "admin.launchpads.description":
    "\nVaya directamente a los espacios de trabajo que poseen acceso, tiempo de ejecución, integraciones y estado de auditoría, con métricas en vivo en cada carril.",
  "admin.launchpads.metricTitle": "\nPostura actual",
  "admin.launchpads.openWorkspace": "\nAbrir espacio de trabajo",
  "admin.navigation.title": "\nCentro de control",
  "admin.navigation.description":
    "Espacios de trabajo de administración con vínculos profundos para identidad, integraciones, seguridad y dependencias operativas.",
  "admin.overview.managedUsers": "\nUsuarios administrados",
  "admin.overview.managedUsersHint": "\nRegistros de identidad y acceso actualmente en el alcance",
  "admin.overview.verifiedIdentities": "\nIdentidades verificadas",
  "admin.overview.verifiedIdentitiesHint": "\nLas identidades {count} aún necesitan verificación",
  "admin.overview.edgeFootprint": "\nHuella de borde",
  "admin.overview.edgeFootprintHint": "\n{count} sitios activos conectados al patrimonio",
  "admin.overview.auditWindow": "\nGobernanza 24h",
  "admin.overview.auditWindowHint":
    "\nActividad reciente de autenticación y cambios en el centro de control",
  "admin.overview.datasetLedger": "\nLibro mayor de conjuntos de datos de IA",
  "admin.overview.datasetLedgerDescription":
    "\nConjuntos de datos operativos que alimentan predicciones, flujo de anotaciones y generación de informes.",
  "admin.overview.predictions": "\nPredicciones",
  "admin.overview.annotations": "\nAnotaciones",
  "admin.overview.savedReports": "\nInformes guardados",
  "admin.overview.copilotDescription":
    "\nUtilice IA para resumir la postura, las anomalías de la superficie o generar un traspaso del operador desde el estado actual del centro de control.",
  "admin.users.stats.total": "\nTamaño del directorio",
  "admin.users.stats.totalHint": "\nUsuarios que coinciden con los filtros del directorio actual",
  "admin.users.stats.active": "\nActivo",
  "admin.users.stats.activeHint": "\nUsuarios con sesiones en vivo y sin señal de atención abierta",
  "admin.users.stats.attention": "\nNecesita atención",
  "admin.users.stats.attentionHint":
    "\nUsuarios con riesgos de verificación, preferencia o postura de sesión",
  "admin.users.stats.inactive": "\nInactivo",
  "admin.users.stats.inactiveHint":
    "\nUsuarios sin sesiones activas en el conjunto de resultados actual",
  "admin.users.detailTitle": "\nDirectorio de usuarios",
  "admin.users.detailDescription":
    "\nSeleccione un operador para inspeccionar el acceso, las sesiones, las preferencias y el historial de gobierno reciente.",
  "admin.users.searchLabel": "\nBuscar usuarios",
  "admin.users.searchPlaceholder": "\nBuscar por nombre o correo electrónico",
  "admin.users.roleFilterLabel": "\nRol",
  "admin.users.roleAll": "\nTodos los roles",
  "admin.users.activityFilterLabel": "\nActividad",
  "admin.users.activityAll": "\nToda la actividad",
  "admin.users.applyFilters": "\nAplicar filtros",
  "admin.users.table.person": "\nPersona",
  "admin.users.table.access": "\nAcceso",
  "admin.users.table.sessions": "\nSesiones",
  "admin.users.table.preferences": "\nPreferencias",
  "admin.users.table.signal": "\nSeñal",
  "admin.users.activeSessionCount": "\n{count} sesiones activas",
  "admin.users.lastSeenNever": "\nNo hay actividad de sesión reciente",
  "admin.users.chatEnabled": "\nChat habilitado",
  "admin.users.chatDisabled": "\nChat deshabilitado",
  "admin.users.notificationsEnabled": "\nNotificaciones habilitadas",
  "admin.users.notificationsDisabled": "\nNotificaciones silenciadas",
  "admin.users.empty": "\nNingún usuario coincidió con los filtros actuales.",
  "admin.users.returnOverview": "\nVolver a la descripción general",
  "admin.users.selectPrompt": "\nSeleccione un usuario para abrir el panel de detalles.",
  "admin.users.detail.activeSessions": "\nSesiones activas",
  "admin.users.detail.activeSessionsHint": "\nEn {count} sesiones totales",
  "admin.users.detail.assignedTasks": "\nTareas asignadas",
  "admin.users.detail.assignedTasksHint": "\nTrabajo actual propiedad del operador seleccionado",
  "admin.users.detail.approvals": "\nAprobación de documentos",
  "admin.users.detail.approvalsHint":
    "\nÓrdenes de trabajo aprobadas, órdenes de clientes y órdenes de compra atribuidas a este operador",
  "admin.users.detail.editTitle": "\nAcceso y preferencias",
  "admin.users.detail.editDescription":
    "\nModifique la función, la ubicación y la disponibilidad del asistente para el operador seleccionado.",
  "admin.users.roleLabel": "\nRol",
  "admin.users.save": "\nGuardar cambios",
  "admin.users.savedSuccess": "\nAcceso de usuario y preferencias actualizados.",
  "admin.users.revokeSessions": "\nRevocar sesiones",
  "admin.users.revokeSuccess":
    "\nTodas las sesiones fueron revocadas para el operador seleccionado.",
  "admin.users.detail.revokeTitle": "\nRestablecimiento de sesión",
  "admin.users.detail.revokeDescription":
    "\nFuerce un nuevo inicio de sesión en el navegador y en las sesiones en caché para este operador.",
  "admin.users.detail.sessionsTitle": "\nSesiones recientes",
  "admin.users.detail.sessionsDescription":
    "Última actividad de sesión y postura de vencimiento para el operador seleccionado.",
  "admin.users.detail.auditTitle": "\nActividad de gobernanza reciente",
  "admin.users.detail.auditDescription":
    "\nEntradas de auditoría recientes asociadas con el operador seleccionado.",
  "admin.users.sessionExpiresAt": "\nVence {value}",
  "admin.users.sessionsEmpty": "\nNo se han registrado sesiones recientes para este operador.",
  "admin.users.signal.privileged": "\nPrivilegiado",
  "admin.users.signal.unverified": "\nNo verificado",
  "admin.users.signal.concurrentSessions": "\nSesiones simultáneas",
  "admin.users.signal.preferencesMissing": "\nFaltan preferencias",
  "admin.users.signal.noSessions": "\nSin sesiones",
  "admin.users.status.active": "\nActivo",
  "admin.users.status.attention": "\nNecesita atención",
  "admin.users.status.inactive": "\nInactivo",
  "admin.users.error.invalidRole": "\nSeleccione un rol válido antes de guardar.",
  "admin.users.error.invalidName": "\nIngrese un nombre para mostrar válido antes de guardar.",
  "admin.users.error.notFound": "\nNo se pudo encontrar el usuario seleccionado.",
  "admin.users.error.saveFailed":
    "\nLos cambios del usuario no se pudieron guardar en este momento.",
  "admin.locations.totalSites": "\nSitios registrados",
  "admin.locations.totalSitesHint": "\nBases e instalaciones gestionadas en la plataforma",
  "admin.locations.activeSites": "\nSitios activos",
  "admin.locations.activeSitesHint": "\nSitios actualmente marcados como activos para operaciones",
  "admin.locations.totalDevices": "\nDispositivos conectados",
  "admin.locations.totalDevicesHint":
    "\nDispositivos perimetrales asignados al patrimonio administrado",
  "admin.locations.devicesDescription":
    "\nRegistre e inspeccione la cobertura del dispositivo junto con la estructura del sitio propietaria.",
  "admin.aiOps.provider": "\nProveedor",
  "admin.aiOps.providerHint":
    "\nProveedor de tiempo de ejecución que atiende nuevas solicitudes de asistente y predicción",
  "admin.aiOps.model": "\nModelo",
  "admin.aiOps.sourceLabel": "\nFuente: {value}",
  "admin.aiOps.predictions": "\nPredicciones",
  "admin.aiOps.predictionsHint": "\nRegistros de predicción activos en todo el patrimonio",
  "admin.aiOps.annotations": "\nAnotaciones",
  "admin.aiOps.annotationsHint": "\nEtiquetas de revisión capturadas y registros de anotaciones",
  "admin.aiOps.datasetTitle": "\nOperaciones de conjunto de datos",
  "admin.aiOps.datasetDescription":
    "\nVincule los cambios del tiempo de ejecución con los conjuntos de datos que impulsan las predicciones, los informes y la revisión operativa.",
  "admin.aiOps.savedReports": "\nInformes guardados",
  "admin.aiOps.managedUsers": "\nUsuarios administrados",
  "admin.aiOps.copilotDescription":
    "\nUtilice IA para rastrear la postura del tiempo de ejecución hasta el modelo, el conjunto de datos y los cambios del operador antes de cambiar la configuración.",
  "admin.operationalContext.title": "\nContexto operativo",
  "admin.operationalContext.description":
    "\nEstos valores provienen de variables de entorno del servidor y coinciden con el contexto inyectado en los asistentes de IA: OPERATIONAL_CURRENCY, FACILITY_TIMEZONE, FACILITY_LATITUDE y FACILITY_LONGITUDE (tanto la latitud como la longitud son necesarias para el clima).",
  "admin.operationalContext.currencyLabel": "\nMoneda comercial predeterminada",
  "admin.operationalContext.facilityTimeLabel": "\nHora local de la instalación",
  "admin.operationalContext.facilityTimeBody": "Zona horaria: {timezone} — {localTime}",
  "admin.operationalContext.facilityTimeEmpty":
    "\nConfigure FACILITY_TIMEZONE en una zona horaria de la IANA (por ejemplo, Europa/Londres) para mostrar el reloj de la instalación.",
  "admin.operationalContext.coordinatesLabel": "\nCoordenadas de la instalación (WGS84)",
  "admin.operationalContext.coordinatesBody": "Latitud: {lat}, Longitud: {lon}",
  "admin.operationalContext.coordinatesEmpty":
    "\nConfigure FACILITY_LATITUDE y FACILITY_LONGITUDE juntos para habilitar las coordenadas y el clima en vivo cuando se permita el acceso a la red saliente.",
  "admin.operationalContext.weatherLabel": "\nInstantánea del tiempo",
  "admin.operationalContext.weatherOk":
    "\n{tempC} °C, viento {windKmh} km/h, código OMM {code} (Open-Meteo).",
  "admin.operationalContext.weatherSkippedAirgapped":
    "El clima no se recupera en implementaciones AIRGAPPED.",
  "admin.operationalContext.weatherSkippedNoCoordinates":
    "\nConfigure la latitud y longitud de las instalaciones para obtener las condiciones actuales.",
  "admin.operationalContext.weatherUnavailable":
    "\nLos datos meteorológicos no están disponibles temporalmente. Vuelve a intentarlo más tarde.",
  "admin.integrations.totalDomains": "\nDominios requeridos",
  "admin.integrations.totalDomainsHint":
    "\nSistemas corporativos con los que debe integrarse la plataforma",
  "admin.integrations.configured": "\nConfigurado",
  "admin.integrations.configuredHint":
    "\nIntegraciones de dominio con una entrada de registro del sistema activo",
  "admin.integrations.degraded": "\nDegradado",
  "admin.integrations.degradedHint":
    "\nSistemas registrados que actualmente funcionan por debajo de la postura objetivo",
  "admin.integrations.offline": "\nDesconectado",
  "admin.integrations.offlineHint":
    "\nSistemas registrados que actualmente requieren recuperación o respaldo",
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
  "admin.branding.operationalCurrencyLabel": "Moneda comercial",
  "admin.branding.operationalCurrencyHint":
    "La moneda de finanzas, checkout y documentos sigue siendo una configuración global de ejecución y no una anulación por marca.",
  "admin.branding.supportedLocalesLabel": "Idiomas compatibles",
  "admin.branding.supportedLocalesHint":
    "Los shells y metadatos de marca se enrutan a través de los diccionarios de idioma compartidos que entrega la plataforma.",
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
    "\nLos sistemas corporativos de recursos humanos, finanzas, adquisiciones y documentos siguen siendo los sistemas de registro. Este registro rastrea el contrato de integración y la postura operativa dentro de {brandName}.",
  "admin.integrations.formTitle": "\nRegistro de integración",
  "admin.integrations.formDescription":
    "\nCree o actualice el contrato de integración para un dominio corporativo requerido.",
  "admin.integrations.registerTitle": "\nRegistro actual",
  "admin.integrations.registerDescription":
    "\nTodos los dominios corporativos requeridos, incluidas las áreas no configuradas que aún necesitan incorporación.",
  "admin.integrations.domainLabel": "\nDominio corporativo",
  "admin.integrations.systemNameLabel": "\nNombre del sistema",
  "admin.integrations.systemNamePlaceholder": "\nIngrese el nombre del sistema corporativo",
  "admin.integrations.syncModeLabel": "\nModo de sincronización",
  "admin.integrations.statusLabel": "\nEstado operativo",
  "admin.integrations.ownerLabel": "\nPropietario del servicio",
  "admin.integrations.ownerPlaceholder": "\nIngrese el propietario o equipo responsable",
  "admin.integrations.lastSyncLabel": "\nÚltima sincronización verificada",
  "admin.integrations.notesLabel": "\nNotas",
  "admin.integrations.notesPlaceholder":
    "\nRegistrar notas contractuales, operativas o de límites de datos",
  "admin.integrations.save": "\nGuardar integración",
  "admin.integrations.saved": "\nRegistro de integración corporativa actualizado.",
  "admin.integrations.systemOfRecord": "\nSistema de registro",
  "admin.integrations.unconfigured": "\nDesconfigurado",
  "admin.integrations.domain.HR": "RRHH",
  "admin.integrations.domain.FINANCE": "\nFinanzas",
  "admin.integrations.domain.PROCUREMENT": "\nAdquisiciones",
  "admin.integrations.domain.DOCUMENT_MANAGEMENT": "\nGestión documental",
  "admin.integrations.domain.CATERING_SERVICES": "\nCatering / ESS",
  "admin.integrations.syncMode.API": "Interfaz API",
  "admin.integrations.syncMode.FILE_DROP": "\nSoltar archivo",
  "admin.integrations.syncMode.MANUAL": "\nManual",
  "admin.integrations.status.HEALTHY": "Saludable",
  "admin.integrations.status.DEGRADED": "\nDegradado",
  "admin.integrations.status.OFFLINE": "\nDesconectado",
  "admin.integrations.table.domain": "\nDominio",
  "admin.integrations.table.system": "\nSistema",
  "admin.integrations.table.syncMode": "\nModo de sincronización",
  "admin.integrations.table.owner": "\nPropietario",
  "admin.integrations.table.lastSync": "\nÚltima sincronización",
  "admin.integrations.table.updatedAt": "\nActualizado",
  "admin.integrations.error.invalidSystemName":
    "\nIngrese un nombre de sistema válido antes de guardar.",
  "admin.integrations.error.invalidSelection":
    "\nSeleccione un dominio corporativo válido, un modo de sincronización y un estado operativo.",
  "admin.integrations.error.saveFailed":
    "\nEl registro de integración corporativa no se pudo guardar en este momento.",
  "admin.integrations.systemConfigDescription":
    "\nRegistro de integración de sistemas corporativos y postura operativa.",
  "admin.integrations.dependenciesTitle": "\nMapa de dependencia",
  "admin.integrations.dependenciesDescription":
    "\nRealice un seguimiento de las superficies operativas, los propietarios y las próximas acciones para cada dependencia corporativa requerida.",
  "admin.integrations.dependency.systemLabel": "\nSistema",
  "admin.integrations.dependency.ownerLabel": "\nPropietario",
  "admin.integrations.dependency.syncLabel": "\nSincronización: {syncMode}",
  "admin.integrations.dependency.lastSyncLabel": "\nÚltima sincronización",
  "admin.integrations.dependency.updatedLabel": "\nÚltima actualización",
  "admin.integrations.dependency.notesLabel": "\nNotas operativas",
  "admin.integrations.dependency.impactLabel": "\nFlujos de trabajo afectados",
  "admin.integrations.dependency.noteEmpty": "\nAún no se han registrado notas operativas.",
  "admin.integrations.dependency.remediationLabel": "\nSiguiente acción",
  "admin.integrations.dependency.lastSyncEmpty":
    "\nAún no se ha registrado ninguna sincronización exitosa.",
  "admin.integrations.dependency.updatedEmpty":
    "\nAún no se ha registrado ninguna actualización de registro.",
  "admin.integrations.dependency.emptyTitle": "\nNo hay postura de dependencia disponible",
  "admin.integrations.dependency.emptyDescription":
    "Actualice el mapa de dependencia de integración una vez que los datos del espacio de trabajo de respaldo estén disponibles.",
  "admin.integrations.dependency.errorTitle": "\nMapa de dependencia no disponible",
  "admin.integrations.dependency.errorDescription":
    "\nEl panel de dependencia de integración no se pudo actualizar. Vuelva a intentar la solicitud o verifique el registro ascendente.",
  "admin.integrations.dependency.posture.HEALTHY": "Saludable",
  "admin.integrations.dependency.posture.DEGRADED": "\nDegradado",
  "admin.integrations.dependency.posture.OFFLINE": "\nDesconectado",
  "admin.integrations.dependency.posture.UNCONFIGURED": "\nDesconfigurado",
  "admin.integrations.dependency.remediation.HEALTHY":
    "\nContinúe monitoreando la postura de sincronización programada y mantenga el espacio de trabajo posterior alineado con el sistema de registro actual.",
  "admin.integrations.dependency.remediation.DEGRADED":
    "\nRevise las notas de sincronización más recientes, confirme la disponibilidad ascendente y borre el flujo de trabajo degradado antes de que los operadores dependan de datos obsoletos.",
  "admin.integrations.dependency.remediation.OFFLINE":
    "\nIntensifique la interrupción de la dependencia, cambie los equipos posteriores a controles manuales y restaure el sistema de registro antes del siguiente ciclo operativo.",
  "admin.integrations.dependency.remediation.UNCONFIGURED":
    "\nRegistre el sistema de registro, asigne un propietario y defina el modo de sincronización antes de que esta dependencia se considere operativa.",
  "admin.integrations.dependency.attentionTitle": "\nSe requiere atención de integración",
  "admin.integrations.dependency.attentionDescription":
    "\n{degraded} dependencias degradadas, {offline} fuera de línea y {unconfigured} no configuradas necesitan acción.",
  "admin.integrations.dependency.healthyTitle": "\nDependencias alineadas",
  "admin.integrations.dependency.healthyDescription":
    "\nTodas las dependencias requeridas están configuradas y actualmente funcionando dentro de la postura esperada.",
  "admin.integrations.dependency.action.HR": "\nAbrir operaciones de usuario",
  "admin.integrations.dependency.action.FINANCE": "\nPlanificación de finanzas abiertas",
  "admin.integrations.dependency.action.PROCUREMENT": "\nAbrir espacio de trabajo de flota",
  "admin.integrations.dependency.action.DOCUMENT_MANAGEMENT":
    "\nAbrir espacio de trabajo de informes",
  "admin.integrations.dependency.action.CATERING_SERVICES": "\nEspacio de trabajo abierto",
  "admin.integrations.dependency.description.HR":
    "\nLa identidad, la dotación de personal y la cobertura de los operadores dependen de que el sistema de recursos humanos permanezca alineado con las funciones y la propiedad de la plataforma.",
  "admin.integrations.dependency.description.FINANCE":
    "\nLa postura presupuestaria, los escenarios de planificación y los controles financieros dependen de que el sistema financiero registrado se mantenga sincronizado.",
  "admin.integrations.dependency.description.PROCUREMENT":
    "\nLos compromisos de adquisiciones, la actividad de los proveedores y la ejecución de la flota dependen de los flujos oportunos de compras y contratos.",
  "admin.integrations.dependency.description.DOCUMENT_MANAGEMENT":
    "\nLos informes, aprobaciones y pruebas documentales dependen de que el sistema de gestión de documentos compartido permanezca disponible.",
  "admin.integrations.dependency.description.CATERING_SERVICES":
    "\nLa entrega del patrimonio, la preparación de ESS y la coordinación del catering dependen de que este contrato de servicio permanezca operativo.",
  "admin.integrations.dependency.impact.HR.primary": "\nAsignaciones de roles",
  "admin.integrations.dependency.impact.HR.secondary": "\nRevisiones de acceso privilegiado",
  "admin.integrations.dependency.impact.HR.tertiary":
    "\nTraspasos de preparación de la fuerza laboral",
  "admin.integrations.dependency.impact.FINANCE.primary": "\nPlanificación de escenarios",
  "admin.integrations.dependency.impact.FINANCE.secondary": "\nControles presupuestarios",
  "admin.integrations.dependency.impact.FINANCE.tertiary": "\nPaquetes de informes ejecutivos",
  "admin.integrations.dependency.impact.PROCUREMENT.primary": "Ejecución del proveedor",
  "admin.integrations.dependency.impact.PROCUREMENT.secondary": "\nPostura de entrega de la flota",
  "admin.integrations.dependency.impact.PROCUREMENT.tertiary": "\nRuta de cumplimiento comercial",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.primary": "\nPaquetes de evidencia",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.secondary":
    "\nFlujos de trabajo de aprobación",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.tertiary": "\nPublicación del informe",
  "admin.integrations.dependency.impact.CATERING_SERVICES.primary": "\nPreparación de ESS",
  "admin.integrations.dependency.impact.CATERING_SERVICES.secondary":
    "\nCoordinación de entrega de patrimonio",
  "admin.integrations.dependency.impact.CATERING_SERVICES.tertiary":
    "\nTraspaso de soporte de catering",
  "admin.integrations.dependency.surface.HR":
    "\nUsuarios, roles y preparación de la fuerza laboral",
  "admin.integrations.dependency.surface.FINANCE":
    "\nElaboración de presupuestos, escenarios de planificación y supervisión financiera ejecutiva",
  "admin.integrations.dependency.surface.PROCUREMENT":
    "\nEntrega de flotas, ejecución de proveedores y coordinación de adquisiciones",
  "admin.integrations.dependency.surface.DOCUMENT_MANAGEMENT":
    "\nInformes, paquetes de pruebas y flujos de trabajo de documentos operativos",
  "admin.integrations.dependency.surface.CATERING_SERVICES":
    "\nSuperficies de entrega de bienes, soporte de catering y coordinación de ESS",
  "admin.security.privilegedUsers": "\nUsuarios privilegiados",
  "admin.security.privilegedUsersHint":
    "\nAdministradores que actualmente tienen acceso privilegiado",
  "admin.security.unverifiedPrivilegedUsers": "\nPrivilegiado no verificado",
  "admin.security.unverifiedPrivilegedUsersHint":
    "\nA las identidades privilegiadas aún les falta la verificación por correo electrónico",
  "admin.security.concurrentSessionWarnings": "\nSesiones simultáneas",
  "admin.security.concurrentSessionWarningsHint":
    "\nOperadores con múltiples sesiones activas que requieren revisión",
  "admin.security.totalEvents": "\nEventos de seguridad 7d",
  "admin.security.totalEventsHint":
    "\nActividad de cambios relacionados con la autenticación y el acceso en la ventana de seguridad actual",
  "admin.security.rbacTitle": "\nControl de acceso basado en roles",
  "admin.security.rbacDescription":
    "\nRevisar la distribución de roles, la huella de acceso activo y la postura de verificación entre los operadores internos.",
  "admin.security.storageTitle": "\nPostura de almacenamiento seguro de datos",
  "admin.security.storageDescription":
    "\nRealice un seguimiento de los controles de límites de implementación que influyen en la localidad de almacenamiento, la localidad de referencia y la exposición externa.",
  "admin.security.auditTitle": "\nActividad de seguridad reciente",
  "admin.security.auditDescription":
    "\nEntradas de auditoría relacionadas con la autenticación y el acceso desde la ventana de seguridad actual de siete días.",
  "admin.security.auditEmpty":
    "\nNo se registraron eventos de seguridad recientes en la ventana actual.",
  "admin.security.roleTable.role": "\nRol",
  "admin.security.roleTable.users": "\nUsuarios",
  "admin.security.roleTable.activeSessions": "\nSesiones activas",
  "admin.security.roleTable.unverified": "\nNo verificado",
  "admin.security.authEvents": "\nEventos de autenticación",
  "admin.security.accessChangeEvents": "\nCambios de acceso",
  "admin.security.databaseLabel": "\nBase de datos",
  "admin.governance.totalEvents": "\nEventos filtrados",
  "admin.governance.totalEventsHint": "\nAuditar eventos en el segmento de gobernanza actual",
  "admin.governance.authEvents": "\nEventos de autenticación",
  "admin.governance.authEventsHint":
    "\nActividad de inicio y cierre de sesión en el segmento actual",
  "admin.governance.changeEvents": "\nCambiar eventos",
  "admin.governance.changeEventsHint":
    "\nCrear, actualizar, aprobar, eliminar y exportar acciones en el alcance",
  "admin.governance.searchLabel": "\nGobernanza de búsqueda",
  "admin.governance.searchPlaceholder": "\nBuscar actor, entidad o ID de solicitud",
  "admin.governance.actionLabel": "\nAcción",
  "admin.governance.actionAll": "\nTodas las acciones",
  "admin.governance.windowLabel": "\nVentana de tiempo",
  "admin.governance.window.24h": "\nÚltimas 24 horas",
  "admin.governance.window.7d": "\nÚltimos 7 días",
  "admin.governance.window.30d": "\nÚltimos 30 días",
  "admin.governance.window.all": "\nTodo el tiempo",
  "admin.governance.applyFilters": "\nAplicar filtros",
  "admin.governance.exportFiltered": "\nExportar filtrado CSV",
  "admin.governance.requestId": "\nID de solicitud",
  "admin.governance.requestIdValue": "\nID de solicitud {value}",
  "admin.governance.empty": "\nNingún evento de gobernanza coincidió con los filtros actuales.",
  "admin.chat.overviewReviewLabel": "\nResumir postura",
  "admin.chat.overviewReviewPrompt":
    "Resuma la descripción general actual del administrador, resalte las anomalías entre los usuarios, los conjuntos de datos y la gobernanza, y recomiende las próximas acciones administrativas.",
  "admin.chat.overviewOpsLabel": "\nPlanificar acciones del centro de control",
  "admin.chat.overviewOpsPrompt":
    "\nUtilizando la descripción general actual del administrador, proponga un plan de acción priorizado para la gestión de usuarios, ubicaciones, operaciones de IA y gobernanza.",
  "admin.chat.userReviewLabel": "\nRevisar usuario seleccionado",
  "admin.chat.userReviewPrompt":
    "\nRevisar el usuario seleccionado, explicar los riesgos de acceso, sesión y preferencias, y recomendar las próximas acciones administrativas.",
  "admin.chat.userOpsLabel": "\nBorrador del plan de cambio de acceso",
  "admin.chat.userOpsPrompt":
    "\nUtilizando el espacio de trabajo de administración de usuarios actual, redacte un plan preciso para actualizar roles, revocar sesiones si es necesario y comunicar los cambios.",
  "admin.chat.brandingReviewLabel": "Review brand posture",
  "admin.chat.brandingReviewPrompt":
    "Review the current brand register, identify domain, metadata, or theming gaps, and recommend the next branding actions.",
  "admin.chat.locationsReviewLabel": "\nRevisar la huella del borde",
  "admin.chat.locationsReviewPrompt":
    "\nRevise las ubicaciones actuales y la posición de los dispositivos de borde, resalte brechas o anomalías y recomiende las próximas acciones operativas.",
  "admin.chat.aiReviewLabel": "\nRevisar la postura de la IA",
  "admin.chat.aiReviewPrompt":
    "\nRevise el tiempo de ejecución actual de la IA y la postura del conjunto de datos, explique los riesgos y recomiende las próximas acciones administrativas.",
  "admin.chat.aiOpsLabel": "\nBorrador del plan de implementación de IA",
  "admin.chat.aiOpsPrompt":
    "\nUtilizando el espacio de trabajo de operaciones de IA actual, redacte un plan de implementación para cambios en el tiempo de ejecución, impactos en el conjunto de datos y comunicación con el operador.",
  "admin.chat.integrationsReviewLabel": "\nRevisar integraciones corporativas",
  "admin.chat.integrationsReviewPrompt":
    "\nRevisar el registro de integración corporativa, identificar brechas de incorporación o resiliencia en los sistemas de recursos humanos, finanzas, adquisiciones y documentos, y recomendar las próximas acciones administrativas.",
  "admin.chat.securityReviewLabel": "\nRevisar la postura de seguridad",
  "admin.chat.securityReviewPrompt":
    "\nRevise el espacio de trabajo de seguridad actual, resuma RBAC, auditoría y riesgos de límites de almacenamiento, y recomiende las próximas acciones de cumplimiento.",
  "admin.chat.governanceReviewLabel": "\nRevisar la actividad de gobernanza",
  "admin.chat.governanceReviewPrompt":
    "\nRevise el espacio de trabajo de gobernanza actual, resuma los eventos de cambio o acceso notables y recomiende las próximas acciones de cumplimiento.",
  "admin.audit.action.CREATE": "\nCreado",
  "admin.audit.action.UPDATE": "\nActualizado",
  "admin.audit.action.DELETE": "\nEliminado",
  "admin.audit.action.APPROVE": "Aprobado",
  "admin.audit.action.LOGIN": "\nIniciado sesión",
  "admin.audit.action.LOGOUT": "\nCerrado sesión",
  "admin.audit.action.EXPORT": "\nExportado",
  "admin.invite.title": "\nInvitaciones de usuario",
  "admin.invite.description":
    "\nInvitar a nuevos operadores por correo electrónico con un rol preasignado y una ventana de vencimiento.",
  "admin.invite.emailLabel": "\nDirección de correo electrónico",
  "admin.invite.emailPlaceholder": "operador@ejemplo.com",
  "admin.invite.roleLabel": "\nRol",
  "admin.invite.expiresLabel": "\nVence en (días)",
  "admin.invite.send": "\nEnviar invitación",
  "admin.invite.sent": "\nInvitación enviada exitosamente.",
  "admin.invite.pending": "\nPendiente",
  "admin.invite.expired": "\nCaducado",
  "admin.invite.accepted": "\nAceptado",
  "admin.invite.revoked": "\nRevocado",
  "admin.invite.resend": "\nReenviar",
  "admin.invite.pendingTitle": "\nInvitaciones pendientes",
  "admin.invite.pendingDescription":
    "\nInvitaciones en espera de aceptación por parte de los operadores invitados.",
  "admin.invite.table.email": "\nCorreo electrónico",
  "admin.invite.table.role": "\nRol",
  "admin.invite.table.status": "\nEstado",
  "admin.invite.table.expiresAt": "\nExpira",
  "admin.invite.table.invitedBy": "\nInvitado por",
  "admin.invite.table.createdAt": "\nEnviado",
  "admin.invite.empty": "\nNo hay invitaciones pendientes.",
  "admin.invite.error.invalidEmail": "\nIntroduzca una dirección de correo electrónico válida.",
  "admin.invite.error.invalidRole": "\nSeleccione un rol válido.",
  "admin.invite.error.sendFailed": "\nNo se puede enviar la invitación en este momento.",
  "admin.invite.error.alreadyInvited":
    "\nEste correo electrónico ya tiene una invitación pendiente.",
  "admin.bulkImport.title": "\nImportación masiva de usuarios",
  "admin.bulkImport.description":
    "\nCargue un archivo CSV para aprovisionar varias cuentas de operador a la vez.",
  "admin.bulkImport.uploadLabel": "\nArchivo CSV",
  "admin.bulkImport.uploadHint": "\nColumnas esperadas: nombre, correo electrónico, rol",
  "admin.bulkImport.previewTitle": "\nImportar vista previa",
  "admin.bulkImport.previewDescription":
    "\nRevise las filas analizadas antes de confirmar la importación.",
  "admin.bulkImport.confirmImport": "\nConfirmar importación",
  "admin.bulkImport.rowCount": "\n{count} filas analizadas",
  "admin.bulkImport.validRows": "\n{count} válido",
  "admin.bulkImport.errorRows": "\n{count} errores",
  "admin.bulkImport.table.row": "\nFila",
  "admin.bulkImport.table.name": "\nNombre",
  "admin.bulkImport.table.email": "\nCorreo electrónico",
  "admin.bulkImport.table.role": "\nRol",
  "admin.bulkImport.table.status": "\nEstado",
  "admin.bulkImport.table.error": "\nError",
  "admin.bulkImport.statusValid": "\nVálido",
  "admin.bulkImport.statusError": "\nError",
  "admin.bulkImport.imported": "\n{count} usuarios importados exitosamente.",
  "admin.bulkImport.error.noFile": "\nSeleccione un archivo CSV para cargar.",
  "admin.bulkImport.error.parseFailed": "\nNo se puede analizar el archivo CSV.",
  "admin.bulkImport.error.importFailed": "\nNo se puede completar la importación en este momento.",
  "admin.bulkImport.error.noValidRows": "\nNo hay filas válidas para importar.",
  "admin.bulkImport.validation.missingName": "\nNombre faltante",
  "admin.bulkImport.validation.invalidEmail": "\nCorreo electrónico no válido",
  "admin.bulkImport.validation.invalidRole": "\nRol no válido",
  "admin.health.title": "\nEstado del sistema",
  "admin.health.description":
    "\nDiagnóstico de plataforma en tiempo real con métricas del sistema que se actualizan en vivo.",
  "admin.health.uptime": "\nTiempo de actividad",
  "admin.health.uptimeHint": "\nTiempo transcurrido desde que comenzó el proceso Bun",
  "admin.health.latencyP50": "\nLatencia P50",
  "admin.health.latencyP50Hint": "\nLatencia de solicitud media en muestras recientes",
  "admin.health.latencyP99": "\nLatencia P99",
  "admin.health.latencyP99Hint": "\nLatencia de solicitud de cola en muestras recientes",
  "admin.health.memoryUsage": "\nUso de memoria",
  "admin.health.memoryUsageHint": "\nConsumo de memoria del montón del tiempo de ejecución de Bun",
  "admin.health.dbConnections": "\nEstado de la base de datos",
  "admin.health.dbConnectionsHint": "\nEstado del grupo de conexiones PostgreSQL",
  "admin.health.errorRate": "\nTasa de error",
  "admin.health.errorRateHint": "\nPorcentaje de respuestas con estado 5xx en la ventana actual",
  "admin.health.refreshInterval": "\nActualización automática cada 5 segundos",
  "admin.health.statusOnline": "\nEn línea",
  "admin.health.statusDegraded": "\nDegradado",
  "admin.health.statusOffline": "\nDesconectado",
  "admin.apiKeys.title": "\nGestión de claves API",
  "admin.apiKeys.description":
    "\nCrear, rotar y revocar claves API para integraciones de sistemas.",
  "admin.apiKeys.create": "\nCrear clave API",
  "admin.apiKeys.nameLabel": "\nNombre clave",
  "admin.apiKeys.namePlaceholder": "\npor ej. Tubería de CI, agente de monitoreo",
  "admin.apiKeys.scopeLabel": "\nAlcance",
  "admin.apiKeys.scopeRead": "\nLeer",
  "admin.apiKeys.scopeWrite": "\nEscribir",
  "admin.apiKeys.scopeAdmin": "\nAdministrador",
  "admin.apiKeys.expiresLabel": "\nVence en (días)",
  "admin.apiKeys.expiresNever": "\nNunca",
  "admin.apiKeys.lastUsed": "\nUsado por última vez",
  "admin.apiKeys.lastUsedNever": "\nNunca usado",
  "admin.apiKeys.revoke": "\nRevocar",
  "admin.apiKeys.revokeTitle": "\nRevocar clave API",
  "admin.apiKeys.revokeDescription":
    "\nEsta clave API se desactivará permanentemente. Esta acción no se puede deshacer.",
  "admin.apiKeys.revokeConfirm": "\nRevocar clave",
  "admin.apiKeys.revoked": "\nLa clave API ha sido revocada.",
  "admin.apiKeys.created": "\nClave API creada. Copie la clave ahora; no se volverá a mostrar.",
  "admin.apiKeys.table.name": "\nNombre",
  "admin.apiKeys.table.prefix": "\nPrefijo clave",
  "admin.apiKeys.table.scope": "\nAlcance",
  "admin.apiKeys.table.createdBy": "\nCreado por",
  "admin.apiKeys.table.expiresAt": "\nExpira",
  "admin.apiKeys.table.lastUsedAt": "\nUsado por última vez",
  "admin.apiKeys.table.status": "\nEstado",
  "admin.apiKeys.table.actions": "\nAcciones",
  "admin.apiKeys.statusActive": "\nActivo",
  "admin.apiKeys.statusRevoked": "\nRevocado",
  "admin.apiKeys.statusExpired": "\nCaducado",
  "admin.apiKeys.empty": "\nNo se han creado claves API.",
  "admin.apiKeys.error.invalidName": "\nIntroduzca un nombre de clave válido.",
  "admin.apiKeys.error.invalidScope": "\nSeleccione un alcance válido.",
  "admin.apiKeys.error.createFailed": "No se puede crear la clave API en este momento.",
  "admin.apiKeys.error.revokeFailed": "\nNo se puede revocar la clave API en este momento.",
  "admin.lms.title": "\nSistema de gestión del aprendizaje",
  "admin.lms.description":
    "\nGestione contenido educativo, planes de estudio y seguimiento del progreso de los alumnos.",
  "admin.lms.courses.title": "\nCursos",
  "admin.lms.modules.title": "\nMódulos",
  "admin.lms.enrollments.title": "\nInscripciones",
  "admin.lms.createCourse": "\nCrear curso",
  "admin.lms.table.courseName": "\nNombre del curso",
  "admin.lms.table.instructor": "\nInstructor",
  "admin.lms.table.enrolled": "\nInscrito",
  "admin.lms.table.completionRate": "\nTasa de finalización",
  "admin.lms.status.published": "\nPublicado",
  "admin.lms.status.draft": "\nBorrador",
  "admin.lms.status.archived": "\nArchivado",

  "admin.webhooks.title": "\nConfiguración de webhook",
  "admin.webhooks.description":
    "\nRegistre puntos finales de webhook para la entrega de eventos en tiempo real a sistemas externos.",
  "admin.webhooks.urlLabel": "\nURL del punto final",
  "admin.webhooks.urlPlaceholder": "\nhttps://example.com/webhooks/platform",
  "admin.webhooks.secretLabel": "\nSecreto de firma",
  "admin.webhooks.eventsLabel": "\nEventos suscritos",
  "admin.webhooks.eventsPlaceholder": "\norden de trabajo.creada, tarea.completada",
  "admin.webhooks.eventsHint":
    "\nTipos de eventos separados por comas (por ejemplo, orden de trabajo.creada, tarea.completada)",
  "admin.webhooks.activeLabel": "\nActivo",
  "admin.webhooks.create": "\nRegistrar webhook",
  "admin.webhooks.created": "\nWebhook registrado correctamente.",
  "admin.webhooks.test": "\nEnviar prueba",
  "admin.webhooks.deliveryLog": "\nRegistro de entrega",
  "admin.webhooks.table.url": "\nPunto final",
  "admin.webhooks.table.events": "\nEventos",
  "admin.webhooks.table.status": "\nEstado",
  "admin.webhooks.table.lastDelivered": "\nÚltima entrega",
  "admin.webhooks.table.createdBy": "\nCreado por",
  "admin.webhooks.table.actions": "\nAcciones",
  "admin.webhooks.statusActive": "\nActivo",
  "admin.webhooks.statusInactive": "\nInactivo",
  "admin.webhooks.empty": "\nNo se han registrado webhooks.",
  "admin.webhooks.deleteTitle": "\nQuitar webhook",
  "admin.webhooks.deleteDescription": "\nEste webhook se desactivará y eliminará permanentemente.",
  "admin.webhooks.deleteConfirm": "\nQuitar webhook",
  "admin.webhooks.deleted": "\nSe ha eliminado el webhook.",
  "admin.webhooks.error.invalidUrl": "\nIngrese una URL HTTPS válida.",
  "admin.webhooks.error.invalidEvents": "\nSeleccione al menos un tipo de evento.",
  "admin.webhooks.error.createFailed": "\nNo se puede registrar el webhook en este momento.",
  "admin.webhooks.error.deleteFailed": "\nNo se puede eliminar el webhook en este momento.",
  "system.databaseUnavailable":
    "\nEl acceso a la base de datos en vivo no está configurado. Configure DATABASE_URL para habilitar rutas respaldadas por datos.",
  "brand.error.hostNotConfigured": "\nEste host no está configurado para un contexto de marca.",
  "kpi.total_assets": "\nActivos totales",
  "kpi.active_tasks": "\nTareas activas",
  "kpi.predictions_due": "\nPredicciones debidas",
  "kpi.utilisation_rate": "\nTasa de utilización",
  "kpi.overdue_maintenance": "\nMantenimiento vencido",
  "kpi.depreciation_total": "\nDepreciación Total",
  "common.title": "Title",
  "common.compare": "Compare",
  "common.confidence": "Confidence",
  "common.rationale": "Rationale",
  "common.savedView": "Saved view",
  "common.whatChanged": "What changed",
  "common.back": "\nAtrás",
  "common.close": "\nCerrar",
  "common.closeIcon": "✖",
  "common.confirmDelete": "\n¿Eliminar este elemento?",
  "common.delete": "\nEliminar",
  "common.notFound": "\nNo encontrado",
  "common.yes": "\nsi",
  "common.no": "\nno",
  "common.retry": "\nReintentar",
  "common.key.alt": "\nAlt",
  "common.key.enter": "\nIntroduzca",
  "common.key.shift": "\nMayús",
  "common.open": "\nAbierto",
  "common.refresh": "\nActualizar",
  "common.selectionNone": "\nNo hay elementos seleccionados",
  "common.selectionOne": "\nUno",
  "common.selectAllVisible": "\nSeleccionar todo visible",
  "common.selectAllResults": "\nSeleccionar todos los resultados",
  "common.lastUpdated": "\nÚltima actualización",
  "common.updatedAt": "\nActualizado",
  "common.live": "\nEn vivo",
  "common.loading": "\nCargando",
  "common.offlineMessage": "\nParece que estás desconectado. Por favor verifique su conexión.",
  "common.tabs": "\nPestañas",
  "common.toolbar": "\nBarra de herramientas",
  "common.emptyValue": "Sin datos",
  "common.filterChipAria": "\nBorrar filtro {label}: {value}",
  "common.pending": "Pendiente",
  "common.enabled": "\nHabilitado",
  "common.disabled": "\nDeshabilitado",
  "common.percentFormat": "\n{value}%",
  "common.optional": "\nopcional",
  "common.system": "\nsistema",
  "common.unknownRole": "\nDesconocido",
  "common.status": "\nEstado",
  "common.actions": "\nAcciones",
  "common.confirm": "\nConfirmar",
  "common.confirmAction": "\n¿Estás seguro?",
  "common.createdBy": "\nCreado por",
  "common.date": "\nFecha",
  "common.sharedBy": "\nCompartido por",
  "common.notifications": "\nNotificaciones",
  "common.period": "\nPeriodo",
  "common.empty": "\nNo hay datos disponibles",
  "common.emptyTable": "\nNo hay datos para mostrar",
  "common.no_results": "\nSin resultados",
  "common.emptySearch": "\nSin resultados. Intente ajustar sus filtros.",
  "common.error": "\nAlgo salió mal",
  "common.success": "\nÉxito",
  "workspace.livePanel.lastUpdatedEmpty": "\nEsperando la primera actualización",
  "workspace.livePanel.emptyDescription":
    "\nEste panel en vivo aún no tiene datos. Actualice la superficie o complete el flujo de trabajo ascendente primero.",
  "workspace.livePanel.errorDescription":
    "\nEste panel en vivo no se pudo actualizar. Vuelva a intentar la solicitud o verifique el servicio ascendente.",
  "assets.table.empty": "\nAún no hay activos. Registre su primer dispositivo para comenzar.",
  "assets.table.emptyAction": "\nAgregar dispositivo",
  "finance.depreciation.table.empty":
    "\nSin datos de depreciación. Los activos con valores de compra y contables aparecerán aquí.",
  "finance.depreciation.table.emptyAction": "\nVer activos",
  "common.unknownError": "\nError desconocido",
  "common.unauthorized": "\nNo tienes acceso a esta vista",
  "errors.crossOriginRequestBlocked": "\nSolicitud de origen cruzado bloqueada",
  "errors.invalidFileName": "\nNombre de archivo no válido",
  "errors.invalidOriginHeader": "\nEncabezado de origen no válido",
  "errors.requestOriginRequired": "No se pudo verificar el origen de la solicitud",
  "errors.pageTitle": "\nError",
  "errors.backToDashboard": "\nVolver al panel",
  "errors.genericMessage": "\nAlgo salió mal. Inténtelo de nuevo o regrese al panel.",
  "common.pagination.page": "\nPágina {page} de {totalPages}",
  "common.pagination.ariaLabel": "\nNavegación de paginación",
  "common.pagination.resultCount": "{start}–{end} de {count}",
  "common.pagination.range": "{start}–{end} de {total}",
  "common.pagination.pageSize": "\nArtículos por página",
  "common.pagination.previous": "\nPágina anterior",
  "common.pagination.next": "\nPágina siguiente",
  "common.pagination.pageN": "\nPágina {n}",
  "common.pagination.ellipsis": "\nMás páginas",
  "common.sort.asc": "\nOrden ascendente",
  "common.sort.desc": "\nOrden descendente",
  "common.sort.unsorted": "\nOrdenar por esta columna",
  "chat.bubble.title": "\n.bao Chat",
  "chat.bubble.placeholder": "\nAsk through .bao...",
  "chat.bubble.send": "\nEnviar",
  "chat.bubble.open": "\nOpen .bao chat",
  "chat.bubble.close": "\nCerrar chat",
  "chat.bubble.intro": "\nPregunte sobre activos, tareas, predicciones o utilización.",
  "chat.bubble.assistantName": "\n.bao",
  "chat.bubble.emptyMessageError": "\nIngrese un mensaje antes de enviar.",
  "chat.bubble.sending": "\nEnviando...",
  "chat.bubble.networkError": "\nError de red. Por favor, inténtalo de nuevo.",
  "chat.bubble.voiceStart": "\nIniciar entrada de voz",
  "chat.bubble.voiceStop": "\nDetener entrada de voz",
  "chat.bubble.voiceUnsupported": "\nLa entrada de voz no es compatible con este navegador.",
  "chat.bubble.voiceListening": "\nEscuchando...",
  "chat.bubble.contextSelectionLabel": "\nSelección",
  "chat.bubble.contextTitle": "\nContexto inteligente",
  "chat.bubble.contextSubtitle":
    "\nEl contexto de la página actual, el texto seleccionado y los archivos eliminados se trasladan a la siguiente respuesta.",
  "chat.bubble.contextPageLabel": "\nPágina",
  "chat.bubble.contextAttachmentLabel": "\nArchivos",
  "chat.bubble.addFiles": "\nAgregar archivos",
  "chat.bubble.smartChipSummary": "\nResumir página",
  "chat.bubble.smartChipSummaryPrompt": "\nResume el contexto más importante de esta página.",
  "chat.bubble.smartChipActions": "\nPróximas acciones",
  "chat.bubble.smartChipActionsPrompt":
    "\nIdentifique las siguientes acciones según el contexto de la página actual.",
  "chat.bubble.smartChipSelection": "\nExplicar la selección",
  "chat.bubble.smartChipSelectionPrompt":
    "\nExplique el contenido seleccionado en el contexto de esta página.",
  "chat.bubble.dropHint": "\nSuelte imágenes o documentos aquí o haga clic para adjuntar.",
  "chat.bubble.dropMeta":
    "\nLas imágenes se envían a proveedores multimodales cuando son compatibles. Los documentos contribuyen al contexto extraído.",
  "chat.bubble.composeLabel": "\nMensaje",
  "chat.bubble.composeHint":
    "\nPresione Entrar para enviar. Utilice Shift+Enter para una nueva línea.",
  "chat.bubble.attachmentMetadataOnly": "\nsolo metadatos",
  "chat.bubble.attachmentUnsupported":
    "\nArchivo no compatible. Utilice un documento de imagen, PDF, TXT, MD, CSV, JSON, HTML o XML.",
  "chat.bubble.attachmentLimitReached": "\nPuede adjuntar hasta {count} archivos por mensaje.",
  "chat.bubble.attachmentImageTooLarge":
    "\nLa imagen adjunta supera el límite de tamaño del chat .bao.",
  "chat.bubble.attachmentDocumentTooLarge":
    "\nEl documento adjunto supera el límite de tamaño del chat .bao.",
  "chat.bubble.attachmentRemove": "\nQuitar archivo adjunto",
  "chat.bubble.defaultContextPrompt":
    "\nUtilice el contexto de la página disponible y los archivos adjuntos para ayudar con esta solicitud.",
  "chat.bubble.advisoryOnly":
    "SOLO ASESORAMIENTO – requiere aprobación humana antes de la ejecución.",
  "chat.systemPrompt.pageContext": "\n\n\n**Contexto de la página actual:**",
  "chat.systemPrompt.selectionContext": "\n\n\n**Texto de página seleccionada:**",
  "chat.systemPrompt.attachmentContext": "\n\n\n**Contexto del archivo adjunto:**",
  "chat.systemPrompt.relevantDocs":
    "\n\n\n**Documentación relevante (úsela para informar su respuesta):**\n",
  "chat.systemPrompt.operationalContextHeader": "\n\n\n**Contexto operativo:**",
  "chat.systemPrompt.operationalCurrencyLine": "\n- Moneda comercial predeterminada: {currency}",
  "chat.systemPrompt.facilityLocalTimeLine":
    "\n- Hora local de la instalación ({timezone}): {localTime}",
  "chat.systemPrompt.facilityWeatherLine":
    "- Instantánea meteorológica de la instalación (Open-Meteo): {tempC} °C, viento {windKmh} km/h, código OMM {code}.",
  "chat.error.network": "\nError de red. Por favor, inténtalo de nuevo.",
  "chat.error.auth": "\nLa autenticación falló. Por favor verifique su clave API.",
  "chat.error.rateLimit": "\nSe superó el límite de tarifa. Inténtelo de nuevo más tarde.",
  "chat.error.invalidResponse": "\nRespuesta no válida del servicio de IA.",
  "chat.error.providerError": "Error: {message}",
  "chat.error.httpStatus": "\nHTTP {status}",
  "context7.error.fetchFailed": "\nError al recuperar la documentación de Context7.",
  "context7.error.rateLimitExceeded":
    "\nSe superó el límite de velocidad de Context7. Vuelve a intentarlo más tarde.",
  "context7.error.apiKeyInvalid": "\nClave API de Context7 no válida.",
  "context7.error.searchFailed": "\nLa búsqueda de Context7 falló: {status}",
  "context7.error.responseParseFailed": "\nError en el análisis de la respuesta de Context7.",
  "context7.error.contextFailed": "\nContexto7 falló: {status}",
  "context7.error.textReadFailed": "\nError de lectura de texto de Context7.",
  "context7.error.jsonParseFailed": "\nError en el análisis JSON de Context7.",
  "auth.signIn.rememberMe": "\nRecuérdame",
  "auth.signIn.recoveryHelp":
    "\n¿Olvidaste tu contraseña? Utilice el flujo de recuperación de su organización.",
  "auth.signIn.accountProvisioning":
    "\n¿Nuevo en la plataforma? Comuníquese con su administrador para el aprovisionamiento de cuentas.",
  "auth.signIn.requestAccess": "Request access",
  "auth.signIn.forgotPasswordLink": "\n¿Olvidaste tu contraseña?",
  "auth.signIn.createAccount": "\nCrear nueva cuenta",
  "auth.signIn.validationEmail": "\nIngrese una dirección de correo electrónico válida",
  "auth.signIn.validationPassword": "\nLa contraseña debe tener al menos 8 caracteres",
  "auth.signIn.heroAlt": "\nIlustración de inicio de sesión seguro",
  "auth.signIn.errorInvalidCredentials":
    "\nCorreo electrónico o contraseña no válidos. Por favor, inténtalo de nuevo.",
  "auth.signIn.errorGeneric": "\nError al iniciar sesión. Por favor, inténtalo de nuevo.",
  "auth.signIn.loggedOut": "\nHas cerrado tu sesión. Por favor inicia sesión nuevamente.",
  "auth.signIn.securityEyebrow": "\nPostura de seguridad",
  "auth.signIn.contextTitle": "\nContexto de inicio de sesión",
  "auth.signIn.contextDescription":
    "\nDevuelva a los usuarios al espacio de trabajo correcto, mantenga la recuperación cerca y haga visible la postura de seguridad antes de la autenticación.",
  "auth.signIn.destinationLabel": "\nDestino de regreso",
  "auth.signIn.capabilitiesLabel": "\nMétodos de autenticación habilitados",
  "auth.signIn.capabilityPasswordOnly":
    "\nLa autenticación de contraseña está actualmente habilitada.",
  "auth.signIn.capabilityPasswordPasskey":
    "\nLa autenticación con contraseña y clave de acceso está habilitada para este espacio de trabajo.",
  "auth.signIn.capabilityPasswordSso":
    "\nLa contraseña y el inicio de sesión único están habilitados para este espacio de trabajo.",
  "auth.signIn.capabilityPasswordPasskeySso":
    "\nLa contraseña, la clave de acceso y el inicio de sesión único están habilitados para este espacio de trabajo.",
  "auth.signIn.passkeyLabel": "\nOpciones de autenticación",
  "auth.signIn.passkeyValue": "\nContraseña hoy, clave de acceso y SSO listo",
  "auth.signIn.methodTitle": "\nMétodos de autenticación",
  "auth.signIn.methodDescription":
    "\nElija la ruta de inicio de sesión para este espacio de trabajo. La contraseña permanece disponible incluso cuando la identidad empresarial está habilitada.",
  "auth.signIn.methodPasswordTitle": "\nInicio de sesión con contraseña",
  "auth.signIn.methodPasswordDescription":
    "\nUtilice su correo electrónico y contraseña para ingresar directamente al espacio de trabajo solicitado.",
  "auth.signIn.methodPasswordBadge": "\nPredeterminado",
  "auth.signIn.methodPasswordAction": "\nUsar contraseña",
  "auth.signIn.methodPasskeyTitle": "\nInicio de sesión con clave de acceso",
  "auth.signIn.methodPasskeyDescription":
    "\nUse una clave de acceso del dispositivo para completar la autenticación sin escribir su contraseña.",
  "auth.signIn.methodPasskeyAction": "Continuar con clave de acceso",
  "auth.signIn.methodSsoTitle": "\nInicio de sesión único",
  "auth.signIn.methodSsoDescription":
    "\nContinúe con el proveedor de identidad de su organización y regrese al espacio de trabajo solicitado después de la verificación.",
  "auth.signIn.methodSsoBadge": "\nRecomendado",
  "auth.signIn.methodSsoAction": "Continuar con SSO",
  "auth.signIn.passkeyAutoFillHint":
    "\nSi su navegador lo admite, una clave de acceso guardada puede aparecer en el autocompletado de esta página.",
  "auth.signIn.passkeyPending": "\nComplete la verificación con clave de acceso para continuar.",
  "auth.signIn.errorPasskeyUnavailable":
    "\nEl inicio de sesión con clave de acceso no está disponible en este navegador.",
  "auth.signIn.errorPasskeyFailed":
    "\nNo se pudo completar el inicio de sesión con clave de acceso. Inténtelo de nuevo.",
  "auth.signIn.errorSsoUnavailable":
    "\nEl inicio de sesión único aún no está disponible para este espacio de trabajo.",
  "auth.signIn.errorSsoStart":
    "\nNo se pudo iniciar el inicio de sesión único. Por favor, inténtalo de nuevo.",
  "auth.signIn.progressTitle": "\nFlujo de inicio de sesión",
  "auth.signIn.progressDescription":
    "\nConfirme el destino, autentíquese y luego revise la postura de seguridad antes de ingresar al espacio de trabajo.",
  "auth.signIn.progressStep.destination": "\nDestino",
  "auth.signIn.progressStep.authenticate": "\nAutenticar",
  "auth.signIn.progressStep.review": "\nAcceso a revisión",
  "auth.signIn.securityPointOne":
    "\nEl acceso basado en roles mantiene aisladas las superficies de finanzas, operaciones y generación de informes.",
  "auth.signIn.securityPointTwo":
    "\nLos flujos de trabajo renderizados por el servidor reducen la exposición del lado del cliente a los datos operativos.",
  "auth.signIn.securityPointThree":
    "\nLas acciones de activos, tareas e informes respaldadas por auditoría permanecen rastreables después del inicio de sesión.",
  "auth.password.showPassword": "\nMostrar contraseña",
  "auth.password.hidePassword": "\nOcultar contraseña",
  "apiExplorer.page.eyebrow": "\nHerramientas de desarrollo",
  "apiExplorer.title": "\nExplorador de API",
  "api.docs.title": "Baohaus API",
  "api.docs.description": "Public, operations, and partner APIs surfaced by the Baohaus platform.",
  "apiExplorer.subtitle": "\nExplorar todas las rutas, puntos finales y superficies registrados",
  "apiExplorer.searchLabel": "\nBuscar rutas",
  "apiExplorer.searchPlaceholder": "\nFiltrar por ruta o método",
  "apiExplorer.filters.title": "\nRefinar el inventario de rutas",
  "apiExplorer.filters.description":
    "\nFiltrar el manifiesto de ruta registrado por superficie o consulta.",
  "apiExplorer.filters.surface": "\nSuperficie",
  "apiExplorer.table.index": "N°",
  "apiExplorer.table.method": "\nMétodo",
  "apiExplorer.table.path": "\nRuta",
  "apiExplorer.table.surface": "\nSuperficie",
  "apiExplorer.table.action": "\nRuta abierta",
  "apiExplorer.summary.filtered": "\nFiltrado",
  "apiExplorer.summary.filteredDescription":
    "\nRutas actualmente visibles en este espacio de trabajo",
  "apiExplorer.summary.total": "\nTotal",
  "apiExplorer.summary.totalDescription": "\nRutas registradas en la aplicación",
  "apiExplorer.summary.htmlDescription": "\nPáginas SSR disponibles en el shell autenticado",
  "apiExplorer.summary.apiDescription": "\nPuntos finales de API de plataforma y operaciones",
  "apiExplorer.summary.regionAria": "\nResumen de ruta de API Explorer",
  "apiExplorer.results.title": "\nInventario de rutas",
  "apiExplorer.results.initialLimitTitle": "\nMostrando las primeras {shown} rutas",
  "apiExplorer.results.initialLimitDescription":
    "\nUsa los filtros de superficie o la búsqueda para revisar el inventario completo de {total} rutas registradas.",
  "apiExplorer.results.summary": "\n{filtered} filtrado / {total} total",
  "apiExplorer.empty.title": "\nNinguna ruta coincide con estos filtros",
  "apiExplorer.empty.description":
    "\nBorre los filtros actuales o amplíe el término de búsqueda para inspeccionar más del inventario de rutas.",
  "apiExplorer.openHtmlAria": "\nAbrir ruta del espacio de trabajo",
  "apiExplorer.openEndpointAria": "\nPunto final abierto",
  "apiExplorer.tab.all": "\nTodos",
  "apiExplorer.tab.api": "Interfaz API",
  "apiExplorer.tab.html": "Vista HTML",
  "apiExplorer.tab.static": "\nEstático",
  "apiExplorer.tab.auth": "\nAutenticación",
  "nav.apiExplorer": "\nExplorador de API",
  "customisation.title": "\nPersonalización",
  "customisation.subtitle": "\nTema, preferencias y opciones de visualización",
  "customisation.theme": "\nTema",
  "customisation.themeDescription": "\nElija el modo claro u oscuro para la interfaz",
  "customisation.preferences": "\nPreferencias",
  "customisation.lightMode": "\nModo de luz",
  "customisation.preferencesDescription": "\nPreferencias de visualización y notificación.",
  "customisation.chatBubble": "\nMostrar burbuja de chat .bao en el panel",
  "customisation.workspaceDefaults.title": "\nValores predeterminados del espacio de trabajo",
  "customisation.workspaceDefaults.subtitle":
    "\nEstablece la página de destino y los asistentes que dan forma a tu punto de partida diario.",
  "customisation.autoSaveHint": "Los cambios se guardan automáticamente",
  "customisation.workspacePresets.title": "\nAjustes preestablecidos del espacio de trabajo",
  "customisation.workspacePresets.subtitle":
    "\nElija los valores predeterminados del banco de trabajo de tareas que permanecen anclados a las cookies de su espacio de trabajo.",
  "customisation.workspacePresets.primaryView": "\nVista de tarea principal",
  "customisation.workspacePresets.secondaryView": "\nVista de tarea secundaria",
  "customisation.workspacePresets.taskView.activeBoard": "\nTablero activo",
  "customisation.workspacePresets.taskView.activeBoardDescription":
    "\nAbra el tablero de flujo en el trabajo activo que ya está en ejecución.",
  "customisation.workspacePresets.taskView.triageBoard": "\nJunta de triaje",
  "customisation.workspacePresets.taskView.triageBoardDescription":
    "\nComience desde el trabajo pendiente y el borrador que aún necesita una decisión del operador.",
  "customisation.workspacePresets.taskView.dispatchQueue": "Cola de despacho",
  "customisation.workspacePresets.taskView.dispatchQueueDescription":
    "Abrir la cola con trabajo no asignado listo para dotación de personal y programación.",
  "customisation.workspacePresets.taskView.slaQueue": "\nCola SLA",
  "customisation.workspacePresets.taskView.slaQueueDescription":
    "\nManténgase en el trabajo de entrega inmediata con la presión de fecha límite visible de forma predeterminada.",
  "customisation.workspacePresets.taskView.myQueue": "\nMi cola",
  "customisation.workspacePresets.taskView.myQueueDescription":
    "\nComience desde las tareas que ya posee el operador actual.",
  "customisation.defaultLanding.title": "\nPágina de destino predeterminada",
  "customisation.defaultLanding.description":
    "\nElija qué espacio de trabajo se abre inmediatamente después de iniciar sesión.",
  "digitalTwin.view3D": "\nVista 3D",
  "digitalTwin.view2D": "\nVista 2D",
  "digitalTwin.viewToggle": "\nAlternar vista gemela digital",
  "digitalTwin.filters": "\nFiltros",
  "digitalTwin.overlays": "\nSuperposiciones",
  "digitalTwin.loadModel": "\nCargar modelo USD",
  "digitalTwin.filter.showHotspots": "\nMostrar puntos de acceso",
  "digitalTwin.filter.showGrid": "\nMostrar cuadrícula",
  "digitalTwin.filter.showAssetLabels": "\nMostrar etiquetas de activos",
  "digitalTwin.badge.view3D": "Vista 3D",
  "digitalTwin.badge.stream": "Streaming",
  "digitalTwin.error.modelLoadFailed": "\nError al cargar el modelo. Mostrando respaldo.",
  "digitalTwin.error.viewerInitFailed": "\nError al inicializar el visor 3D.",
  "nav.collapseSidebar": "\nContraer barra lateral",
  "nav.expandSidebar": "\nExpandir barra lateral",
  "nav.commandPalette": "\nPaleta de comandos",
  "nav.commandPaletteHint": "\nBuscar páginas, activos, tareas y acciones...",
  "nav.commandPaletteOpen": "\nAbrir paleta de comandos",
  "nav.commandPaletteDismissKey": "\nEsc",
  "nav.commandPaletteEmpty": "\nNo se encontraron resultados",
  "nav.commandPaletteNavigation": "\nNavegación",
  "nav.commandPaletteAssets": "\nActivos",
  "nav.commandPaletteTasks": "\nTareas",
  "nav.commandPaletteActions": "\nAcciones",
  "common.sortAsc": "\nOrden ascendente",
  "common.sortDesc": "\nOrden descendente",
  "common.sortNone": "\nSin clasificar",
  "common.bulkSelect": "\nSeleccione",
  "common.bulkActions": "\nAcciones masivas",
  "common.bulkSelectAll": "\nSeleccionar todo",
  "common.clearFilters": "\nBorrar todos los filtros",
  "common.clearSelection": "\nLimpiar selección",
  "common.selectedCount": "\n{selected} de {total} seleccionado(s)",
  "common.stats": "\nEstadísticas",
  "common.dashboard": "\nPanel de control",
  "filter.label": "\nFiltrar resultados",
  "filter.resultCount": "\n{count} resultados",
  "list.empty.description": "\nNo hay elementos para mostrar",
  "nav.no_tiles": "\nSin mosaicos de navegación",
  "nav.no_tiles.description": "\nNo hay elementos disponibles en esta sección",
  "common.filter.search": "\nBuscar…",
  "common.markReviewed": "\nMarcar como reseñado",
  "common.filterChipClear": "\nQuitar filtro",
  "common.clearAll": "\nBorrar todo",
  "common.exportCsv": "\nExportar CSV",
  "common.dateRange": "\nRango de fechas",
  "common.dateRange.7d": "\nÚltimos 7 días",
  "common.dateRange.30d": "\nÚltimos 30 días",
  "common.dateRange.90d": "\nÚltimos 90 días",
  "common.dateRange.custom": "\nRango personalizado",
  "common.last7Days": "\nÚltimos 7 días",
  "common.last30Days": "\nÚltimos 30 días",
  "common.last90Days": "\nÚltimos 90 días",
  "common.allTime": "\nTodo el tiempo",
  "common.currentQuarter": "\nTrimestre actual",
  "common.lastQuarter": "\nÚltimo trimestre",
  "common.yearToDate": "\nAño hasta la fecha",
  "common.addAnother": "\nAñadir otro",
  "common.edit": "\nEditar",
  "common.save": "\nGuardar",
  "common.cancel": "\nCancelar",
  "common.noData": "\nNo hay datos disponibles",
  "common.tryAgain": "\nInténtalo de nuevo",
  "common.loadingSkeleton": "\nCargando contenido",
  "common.stepOf": "\nPaso {current} de {total}",
  "common.getStarted": "\nEmpezar",
  "common.learnMore": "\nMás información",
  "common.viewAll": "\nVer todo",
  "common.collapse": "\nContraer",
  "common.expand": "\nExpandir",
  "assets.bulkExport": "\nExportar seleccionado",
  "assets.bulkStatusUpdate": "\nEstado de actualización",
  "assets.bulkExportSuccess": "\nExportación preparada para {count} activos",
  "assets.bulkStatusSuccess": "\nActualización de estado en cola para {count} activos",
  "assets.empty": "\nNo se encontraron activos",
  "assets.emptyCta": "\nAgregar dispositivo",
  "assets.mediaEmpty": "\nSin medios: arrastre los archivos aquí o haga clic para cargar",
  "assets.mediaFormats": "\nAceptado: JPEG, PNG, WebP",
  "assets.mediaMaxSize": "\nTamaño máximo de archivo: 10 MB",
  "assets.editAsset": "\nEditar activo",
  "assets.detail.metadata": "\nMetadatos del activo",
  "assets.detail.pinnedTitle": "\nEnfoque fijado",
  "assets.detail.pinnedDescription":
    "\nMantenga fijada la pestaña actual mientras se desplaza entre las vistas de riesgo, ciclo de vida y gobernanza.",
  "assets.detail.pinnedBadge": "\nFijado",
  "assets.detail.pinnedCurrent": "\nVista fijada actual",
  "assets.detail.pinnedOpen": "\nAbrir vista fijada",
  "assets.detail.pinnedReset": "\nRestablecer a descripción general",
  "assets.detail.unresolvedInspectionEmpty": "\nAún no se ha registrado ninguna inspección.",
  "assets.detail.unresolvedRisk": "\nPostura de riesgo",
  "assets.detail.unresolvedRiskDescription":
    "\nRevise los factores de riesgo actuales, las señales de IA y las inspecciones atrasadas.",
  "assets.detail.unresolvedLifecycle": "\nPostura del ciclo de vida",
  "assets.detail.unresolvedLifecycleDescription":
    "\nRevisar el costo del ciclo de vida, la vida restante y la planificación de reemplazo.",
  "assets.detail.unresolvedGovernance": "\nPostura de gobernanza",
  "assets.detail.unresolvedGovernanceDescription":
    "\nRevisar la gobernanza de FM, la cobertura de cumplimiento y los registros vinculados.",
  "assets.detail.unresolvedTitle": "\nÁreas de enfoque no resueltas",
  "assets.detail.unresolvedDescription":
    "\nUtilice estos puntos de entrada para pasar directamente al siguiente problema de activos no resuelto.",
  "assets.detail.unresolvedBadge": "\nNecesita revisión",
  "assets.detail.summaryTitle": "\nResumen del espacio de trabajo",
  "assets.detail.summaryDescription":
    "Mantenga visibles el contexto actual del activo, la última inspección y la carga de trabajo vinculada mientras navega.",
  "assets.detail.summarySiteDescription": "\nTipo de sitio y activo",
  "assets.detail.summaryInspectionTitle": "\nÚltima inspección",
  "assets.detail.summaryInspectionDescription":
    "\nEstado de inspección más reciente registrado en este activo.",
  "assets.detail.summaryInspectionSupporting":
    "\nEl historial de inspección sigue el registro de mantenimiento compartido.",
  "assets.detail.summaryWorkOrderTitle": "\nÓrdenes de trabajo vinculadas",
  "assets.detail.summaryWorkOrderDescription":
    "\nCarga de trabajo vinculada actual a lo largo de la actividad del ciclo de vida.",
  "assets.detail.navigatorTitle": "\nNavegador de sección",
  "assets.detail.navigatorDescription":
    "\nMoverse entre secciones de detalles de activos sin perder el contexto actual del activo.",
  "assets.detail.priorityTitle": "\nPriorización de riesgos y desempeño",
  "assets.detail.priorityDescription":
    "\nPostura derivada para la priorización del mantenimiento basada en riesgos utilizando la condición actual, trabajo abierto, inspecciones y señales de predicción de IA.",
  "assets.detail.priorityStateStable": "\nEstable",
  "assets.detail.priorityStateWatch": "\nVer",
  "assets.detail.priorityStateCritical": "\nCrítico",
  "assets.detail.priorityAlertCriticalTitle": "\nSe recomienda intervención inmediata",
  "assets.detail.priorityAlertCriticalDescription":
    "\n{count} señales de predicción críticas, condiciones restringidas o inspecciones atrasadas están llevando a este activo a la cima de la cola.",
  "assets.detail.priorityAlertWatchTitle": "\nSe requiere monitoreo y programación activos",
  "assets.detail.priorityAlertWatchDescription":
    "\n{count} tareas abiertas, trabajo activo o señales no críticas aún requieren la atención del operador para este activo.",
  "assets.detail.priorityAlertStableTitle":
    "\nEl activo está operando dentro de la línea base controlada",
  "assets.detail.priorityAlertStableDescription":
    "\nNinguna condición activa, inspección, orden de trabajo o impulsores de predicción están elevando este activo actualmente.",
  "assets.detail.priorityConditionDriver":
    "\nLa postura de condición contribuye a la priorización.",
  "assets.detail.prioritySignalsDriver":
    "\nLas señales de predicción de la IA aumentan la urgencia de la intervención.",
  "assets.detail.priorityInspectionsDriver":
    "\nLas inspecciones atrasadas están limitando la preparación.",
  "assets.detail.priorityWorkOrdersDriver":
    "\nLas órdenes de trabajo activas indican una carga de trabajo operativa no resuelta.",
  "assets.detail.priorityTasksDriver":
    "\nLa acumulación de tareas pendientes todavía requiere atención a los activos.",
  "assets.detail.priorityNoDrivers": "\nNo hay controladores de priorización activos.",
  "assets.detail.priorityUtilisationTitle": "\nHoras de utilización",
  "assets.detail.priorityUtilisationDescription":
    "\nSeñal de horas de funcionamiento rastreadas actualmente en este registro de activo.",
  "assets.detail.priorityOpenTasksTitle": "\nTareas abiertas",
  "assets.detail.priorityOpenTasksDescription":
    "\nTareas pendientes, programadas y en progreso vinculadas a este activo.",
  "assets.detail.priorityInspectionsTitle": "\nInspecciones vencidas",
  "assets.detail.priorityInspectionsDescription":
    "\nTareas de inspección vencidas y aún sin resolver.",
  "assets.detail.priorityWorkOrdersTitle": "\nÓrdenes de trabajo activas",
  "assets.detail.priorityWorkOrdersDescription":
    "\nLas órdenes de trabajo vinculadas aún avanzan hacia la entrega operativa.",
  "assets.detail.priorityPredictionsTitle": "\nSeñales de predicción recientes",
  "assets.detail.priorityPredictionsDescription":
    "\n{count} la(s) señal(es) de predicción total están actualmente vinculadas a este activo.",
  "assets.detail.priorityPredictionsEmpty":
    "Actualmente no hay señales de predicción vinculadas a este activo.",
  "assets.detail.priorityPredictionsColumnType": "\nSeñal",
  "assets.detail.priorityPredictionsColumnSeverity": "\nGravedad",
  "assets.detail.priorityPredictionsColumnRemainingLife": "\nVida restante",
  "assets.detail.priorityPredictionsColumnConfidence": "\nConfianza",
  "assets.detail.priorityPredictionsColumnAction": "\nAcción generada",
  "assets.detail.priorityPredictionsRemainingLifeValue": "\n{days} días",
  "assets.detail.priorityGeneratedTask": "\nTarea generada",
  "assets.detail.priorityGeneratedWorkOrderAria": "\nAbrir orden de trabajo generada {number}",
  "assets.detail.priorityNoAction": "\nNinguna acción generada",
  "assets.detail.readinessTitle": "\nDisponibilidad y preparación operativa",
  "assets.detail.readinessDescription":
    "\nEstado de preparación a nivel de activos utilizando registros vinculados de alcance, seguridad, orientación y control GFE junto con la carga de trabajo actual de inspección y entrega.",
  "assets.detail.readinessStateReady": "\nListo",
  "assets.detail.readinessStateWatch": "\nVer",
  "assets.detail.readinessStateConstrained": "\nRestringido",
  "assets.detail.readinessAlertConstrainedTitle":
    "\nLa disponibilidad operativa está actualmente limitada",
  "assets.detail.readinessAlertConstrainedDescription":
    "\n{controls} registros de control vinculados requieren acción y {inspections} tareas de inspección vencidas permanecen abiertas para este activo.",
  "assets.detail.readinessAlertCoverageGapTitle":
    "\nEs necesario establecer la cobertura de preparación",
  "assets.detail.readinessAlertCoverageGapDescription":
    "\nEste activo vinculado a capacidad aún no está respaldado por registros de control operativo vinculados para {capability}. Capture controles de preparación para restaurar la visibilidad de disponibilidad directa.",
  "assets.detail.readinessAlertWatchTitle": "\nLa preparación debe ser monitoreada de cerca",
  "assets.detail.readinessAlertWatchDescription":
    "\n{controls} registros de control vinculados permanecen bajo vigilancia y {workOrders} órdenes de trabajo activas todavía influyen en este activo.",
  "assets.detail.readinessAlertReadyTitle":
    "\nActualmente no se registran bloqueadores de preparación activos",
  "assets.detail.readinessAlertReadyDescription":
    "\n{controls} registros de control vinculados están actualmente disponibles y cumplen con los requisitos para este activo.",
  "assets.detail.readinessControlDriver":
    "\nFaltan registros de control operativo vinculados o muestran presión de disponibilidad temprana.",
  "assets.detail.readinessComplianceDriver":
    "\nLa postura de cumplimiento está restringiendo activamente la preparación de los activos.",
  "assets.detail.readinessConditionDriver":
    "\nLa condición de los activos está contribuyendo a la postura de preparación actual.",
  "assets.detail.readinessInspectionDriver":
    "\nLas inspecciones atrasadas están limitando la disponibilidad operativa.",
  "assets.detail.readinessWorkOrderDriver":
    "\nLas órdenes de trabajo activas aún influyen en la disponibilidad de los activos.",
  "assets.detail.readinessTaskDriver":
    "\nLas tareas operativas abiertas aún deben borrarse de este activo.",
  "assets.detail.readinessCapabilityDriver":
    "\nLos activos pares en la misma cohorte de capacidad siguen restringidos.",
  "assets.detail.readinessNoDrivers": "\nNo hay controladores de preparación activos.",
  "assets.detail.readinessDriversTitle": "\nControladores de preparación",
  "assets.detail.readinessCapabilityValue": "\nCapacidad: {capability}",
  "assets.detail.readinessLinkedControlsTitle": "\nRegistros de control vinculados",
  "assets.detail.readinessLinkedControlsDescription":
    "\n{available} actualmente disponible o compatible, última actualización {timestamp}.",
  "assets.detail.readinessLinkedControlsEmptyDescription":
    "\nAún no se han capturado registros de control operativo vinculados para este activo.",
  "assets.detail.readinessActionRequiredTitle": "\nControles que requieren acción",
  "assets.detail.readinessActionRequiredDescription":
    "\n{watch} registros de control adicionales permanecen bajo vigilancia.",
  "assets.detail.readinessInspectionTitle": "\nInspecciones vencidas",
  "assets.detail.readinessInspectionDescription":
    "Tareas de inspección que han vencido la fecha límite y aún no resueltas.",
  "assets.detail.readinessWorkOrdersTitle": "\nÓrdenes de trabajo activas",
  "assets.detail.readinessWorkOrdersDescription":
    "\nÓrdenes de trabajo vinculadas actualmente en proceso de entrega operativa.",
  "assets.detail.readinessTasksTitle": "\nTareas operativas abiertas",
  "assets.detail.readinessTasksDescription":
    "\nEl trabajo pendiente, programado y en progreso aún está vinculado a este activo.",
  "assets.detail.readinessCapabilityTitle": "\nCohorte de capacidad",
  "assets.detail.readinessCapabilityValueShort": "\n{ready}/{total} listo",
  "assets.detail.readinessCapabilityDescription":
    "\n{constrained} activos de pares permanecen restringidos en esta cohorte de capacidad vinculada.",
  "assets.detail.readinessCapabilityEmptyDescription":
    "\nActualmente no se captura ningún vínculo de capacidad operativa para este activo.",
  "assets.detail.readinessRecordsTitle": "\nRegistros de preparación vinculados",
  "assets.detail.readinessRecordsDescription":
    "\nRegistros recientes de alcance, seguridad, puntería y control GFE vinculados directamente a este activo.",
  "assets.detail.readinessRecordsEmpty":
    "\nAún no se han capturado registros vinculados de preparación o disponibilidad para este activo.",
  "assets.detail.readinessControlColumn": "\nControl",
  "assets.detail.readinessOperationalColumn": "\nPostura operativa",
  "assets.detail.readinessComplianceColumn": "\nPostura de cumplimiento",
  "assets.detail.readinessSignalColumn": "\nSeñal operativa",
  "assets.detail.readinessUpdatedColumn": "\nActualizado",
  "assets.detail.readinessSignalMetric": "{value} ",
  "assets.detail.readinessSignalMetricWithUnit": "Valor: {value} {unit}",
  "assets.detail.readinessSignalTargetDate": "\nFecha prevista {date}",
  "assets.detail.readinessSignalNone": "\nAún no se ha registrado ninguna señal operativa.",
  "assets.detail.readinessOpenWorkspace": "\nEspacio de trabajo abierto",
  "assets.detail.readinessOpenWorkspaceAria": "\nEspacio de trabajo abierto",
  "assets.detail.fmGovernanceTitle": "\nPostura de cumplimiento y gobernanza de FM",
  "assets.detail.fmGovernanceDescription":
    "\nGobernanza de la gestión de instalaciones a nivel de activos utilizando cronogramas SFG20 vinculados, inspecciones legales, registros de cumplimiento y trabajo de entrega conectado.",
  "assets.detail.fmGovernanceStateAssured": "\nAsegurado",
  "assets.detail.fmGovernanceStateWatch": "\nVer",
  "assets.detail.fmGovernanceStateActionRequired": "\nAcción requerida",
  "assets.detail.fmGovernanceAlertActionRequiredTitle":
    "\nLa gobernanza de FM requiere atención inmediata",
  "assets.detail.fmGovernanceAlertActionRequiredDescription":
    "\n{attention} registros de gobierno vinculados requieren acción y {overdue} elementos del cronograma ya están vencidos para este activo.",
  "assets.detail.fmGovernanceAlertCoverageGapTitle":
    "\nNo se ha establecido la cobertura de la gobernanza de FM",
  "assets.detail.fmGovernanceAlertCoverageGapDescription":
    "\nActualmente no se capturan registros de gobernanza de FM vinculados para este activo. Agregue registros legales, SFG20 o de gestión de servicios para restaurar la visibilidad del aseguramiento.",
  "assets.detail.fmGovernanceAlertWatchTitle":
    "\nLa gobernanza de la gestión financiera debe ser monitoreada de cerca",
  "assets.detail.fmGovernanceAlertWatchDescription":
    "\n{watch} registros de gobierno vinculados permanecen bajo vigilancia, {dueSoon} vencen pronto y {workOrders} órdenes de trabajo vinculadas aún están activas.",
  "assets.detail.fmGovernanceAlertAssuredTitle": "\nLa gobernanza de FM está actualmente asegurada",
  "assets.detail.fmGovernanceAlertAssuredDescription":
    "\nActualmente se realiza un seguimiento de los registros de gobernanza vinculados {linked} sin bloqueadores de cumplimiento de FM activos para este activo.",
  "assets.detail.fmGovernanceCoverageDriver":
    "\nFalta la cobertura de gobernanza de FM vinculada para este activo.",
  "assets.detail.fmGovernanceAttentionDriver":
    "\nUno o más registros de gestión de FM ya requieren medidas correctivas.",
  "assets.detail.fmGovernanceMonitoringDriver":
    "\nLos registros de gobernanza siguen bajo vigilancia y necesitan un seguimiento estrecho.",
  "assets.detail.fmGovernanceScheduleDriver":
    "\nLas fechas de gobernanza próximas o vencidas están impulsando la postura actual.",
  "assets.detail.fmGovernanceWorkOrdersDriver":
    "Las órdenes de trabajo vinculadas siguen impulsando las acciones de gobernanza de FM hasta la entrega.",
  "assets.detail.fmGovernanceNoDrivers": "\nNo hay controladores activos de gobernanza de FM.",
  "assets.detail.fmGovernanceDriversTitle": "\nImpulsores de la gobernanza de FM",
  "assets.detail.fmGovernanceLinkedRecordsTitle": "\nRegistros de gobierno vinculados",
  "assets.detail.fmGovernanceLinkedRecordsDescription":
    "\nÚltima actividad de gobernanza actualizada {timestamp}.",
  "assets.detail.fmGovernanceLinkedRecordsEmptyDescription":
    "\nAún no se han vinculado registros de gobernanza de FM a este activo.",
  "assets.detail.fmGovernanceAttentionTitle": "\nRegistros de atención",
  "assets.detail.fmGovernanceAttentionDescription":
    "\n{watch} registros de gobernanza adicionales permanecen bajo vigilancia.",
  "assets.detail.fmGovernanceScheduleTitle": "\nHorarios vencidos",
  "assets.detail.fmGovernanceScheduleDescription":
    "\n{dueSoon} registros de gobernanza adicionales se entregarán pronto.",
  "assets.detail.fmGovernanceWorkOrdersTitle": "\nÓrdenes de trabajo vinculadas activas",
  "assets.detail.fmGovernanceWorkOrdersDescription":
    "\nÓrdenes de trabajo conectadas directamente a la entrega de gobierno de FM para este activo.",
  "assets.detail.fmGovernanceStatutoryTitle": "\nInspecciones legales",
  "assets.detail.fmGovernanceStatutoryDescription":
    "\nRegistros de gobierno de inspección legal directa vinculados a este activo.",
  "assets.detail.fmGovernanceSfg20Title": "\nHorarios SFG20",
  "assets.detail.fmGovernanceSfg20Description":
    "\nProgramaciones de mantenimiento SFG20 vinculadas rastreadas con respecto a este activo.",
  "assets.detail.fmGovernanceRecordsTitle": "\nRegistros recientes de gobernanza de FM",
  "assets.detail.fmGovernanceRecordsDescription":
    "\nRegistros recientes de gobierno de gestión de instalaciones vinculados directamente a este activo.",
  "assets.detail.fmGovernanceRecordsEmpty":
    "\nAún no se han capturado registros de cumplimiento o gobernanza de FM para este activo.",
  "assets.detail.fmGovernanceRecordColumn": "\nRegistro",
  "assets.detail.fmGovernanceDomainColumn": "\nDominio",
  "assets.detail.fmGovernancePostureColumn": "\nPostura",
  "assets.detail.fmGovernanceDueColumn": "\nVencimiento y medida",
  "assets.detail.fmGovernanceWorkOrderColumn": "\nOrden de trabajo vinculada",
  "assets.detail.fmGovernanceUpdatedColumn": "\nActualizado",
  "assets.detail.fmGovernanceDueOverdue": "\nVencido",
  "assets.detail.fmGovernanceDueSoon": "\nVencimiento pronto",
  "assets.detail.fmGovernanceDueScheduled": "\nProgramado",
  "assets.detail.fmGovernanceDueUnset": "\nSin fecha de vencimiento",
  "assets.detail.fmGovernanceDueDateValue": "\nVencimiento {date}",
  "assets.detail.fmGovernanceDueUnsetDescription":
    "\nActualmente no se ha registrado ninguna fecha de vencimiento para este elemento de gobierno.",
  "assets.detail.fmGovernanceMetricValue": "\n{value} grabado",
  "assets.detail.fmGovernanceMetricValueWithUnit": "\n{value} {unit} grabado",
  "assets.detail.fmGovernanceNoWorkOrder": "\nNo hay orden de trabajo vinculada",
  "assets.detail.fmGovernanceLinkedWorkOrdersValue": "\n{count} orden(es) de trabajo vinculadas",
  "assets.detail.fmGovernanceOpenWorkspace": "\nEspacio de trabajo abierto",
  "assets.detail.fmGovernanceOpenWorkspaceAria": "\nEspacio de trabajo abierto",
  "assets.detail.fmGovernanceOpenWorkOrderAria":
    "\nOrden de trabajo de gobernanza de FM abierta {number}",
  "assets.detail.performanceTitle": "\nMonitoreo de utilización y desempeño",
  "assets.detail.performanceDescription":
    "\nPostura de utilización en vivo de este activo mediante telemetría capturada, horas de funcionamiento del registro y carga de trabajo operativa vinculada.",
  "assets.detail.performanceStateBlindSpot": "\nPunto ciego de telemetría",
  "assets.detail.performanceStateStale": "\nTelemetría obsoleta",
  "assets.detail.performanceAlertBlindSpotTitle":
    "\nLa telemetría de utilización en vivo aún no está disponible",
  "assets.detail.performanceAlertBlindSpotDescription":
    "\nEste activo actualmente depende de la línea base del registro de {current} hasta que la telemetría de utilización comience a informar.",
  "assets.detail.performanceAlertStaleTitle": "\nLa telemetría de utilización necesita atención",
  "assets.detail.performanceAlertStaleDescription":
    "\nLa última muestra de utilización se capturó {timestamp}. Actualice la cobertura del dispositivo o de telemetría para restaurar el monitoreo actual.",
  "assets.detail.performanceAlertOverTitle":
    "\nEl activo está operando por encima de la banda de utilización óptima",
  "assets.detail.performanceAlertOverDescription":
    "La utilización actual es {current} frente a un promedio de {average}, con {critical} señales críticas ya vinculadas a este activo.",
  "assets.detail.performanceAlertUnderTitle":
    "\nLa utilización está por debajo de la banda operativa esperada",
  "assets.detail.performanceAlertUnderDescription":
    "\nLa utilización actual es {current} frente a un promedio de {average}. Revisar las restricciones de implementación, disponibilidad o programación.",
  "assets.detail.performanceAlertWatchTitle": "\nLa utilización debe controlarse de cerca",
  "assets.detail.performanceAlertWatchDescription":
    "\nLa utilización actual es {current} frente a un promedio de {average}. El activo se está acercando a una postura sobreutilizada o infrautilizada.",
  "assets.detail.performanceAlertOptimalTitle":
    "\nLa utilización está dentro de la banda operativa equilibrada",
  "assets.detail.performanceAlertOptimalDescription":
    "\nLa utilización actual es {current} frente a un promedio de {average} y la cobertura de telemetría está activa para este activo.",
  "assets.detail.performanceRecordedHoursTitle": "\nHoras de funcionamiento registradas",
  "assets.detail.performanceRecordedHoursValue": "\n{hours} horas",
  "assets.detail.performanceRecordedHoursDescription":
    "\nCifra de horas de funcionamiento registradas actualmente almacenadas en el registro de activos.",
  "assets.detail.performanceCurrentTitle": "\nUtilización actual",
  "assets.detail.performanceCurrentDescription":
    "\nTelemetría de utilización capturada más reciente para este recurso.",
  "assets.detail.performanceCurrentFallbackDescription":
    "\nLa situación actual utiliza la línea base de horas de funcionamiento del registro porque no hay telemetría disponible.",
  "assets.detail.performanceAverageTitle": "\nUtilización media",
  "assets.detail.performanceAverageDescription":
    "\nUtilización promedio en muestras de telemetría capturadas.",
  "assets.detail.performanceCoverageTitle": "\nCobertura de telemetría",
  "assets.detail.performanceCoverageDescription":
    "\n{timestamp} fue la última muestra de utilización capturada para este activo. ",
  "assets.detail.performanceCoverageEmptyDescription":
    "\nAún no se han capturado muestras de telemetría de utilización para este recurso.",
  "assets.detail.performanceTasksTitle": "\nCarga de trabajo operativa abierta",
  "assets.detail.performanceTasksDescription":
    "\nTareas abiertas aún vinculadas a este activo durante la inspección y la entrega de mantenimiento.",
  "assets.detail.performanceSignalsTitle": "\nSeñales de predicción",
  "assets.detail.performanceSignalsDescription":
    "\n{count} señales críticas están actualmente vinculadas a este activo.",
  "assets.detail.performanceSamplesTitle": "\nMuestras de utilización recientes",
  "assets.detail.performanceSamplesDescription":
    "\nMuestras de telemetría recientes para este activo, con un rango actual de {min} a {max} y {activeWorkOrders} orden(es) de trabajo activas en vuelo.",
  "assets.detail.performanceSamplesEmpty":
    "\nAún no se ha capturado ninguna telemetría de utilización para este recurso.",
  "assets.detail.performanceTimestampColumn": "\nCapturado",
  "assets.detail.performanceUtilisationColumn": "\nUtilización",
  "assets.detail.performancePostureColumn": "\nPostura",
  "assets.detail.performanceOpenWorkspace": "\nEspacio de trabajo de utilización abierto",
  "assets.detail.performanceOpenWorkspaceAria": "\nEspacio de trabajo de utilización abierto",
  "assets.detail.replacementTitle": "\nPlanificación de reemplazo y postura de capital",
  "assets.detail.replacementDescription":
    "\nPostura de reemplazo derivada para este activo utilizando el estado del ciclo de vida, la condición, las señales de predicción de IA y el trabajo de reemplazo activo.",
  "assets.detail.replacementStateBaseline": "\nLínea de base",
  "assets.detail.replacementStatePlan": "\nPlan",
  "assets.detail.replacementStateReplace": "\nReemplazar",
  "assets.detail.replacementAlertReplaceTitle": "\nEjecute la planificación de reemplazo ahora",
  "assets.detail.replacementAlertReplaceDescription":
    "Las señales urgentes de ciclo de vida, condición, predicción o orden de trabajo activa indican que este activo debe pasar a ejecución de reemplazo activo.",
  "assets.detail.replacementAlertPlanTitle": "\nPreparar el caso capital",
  "assets.detail.replacementAlertPlanDescription":
    "\nLa presión emergente del ciclo de vida o el trabajo de reemplazo en cola significa que este activo debe ingresar a la planificación financiera y la revisión de reemplazo.",
  "assets.detail.replacementAlertBaselineTitle": "\nNo se detecta presión de reemplazo activa",
  "assets.detail.replacementAlertBaselineDescription":
    "\nEl ciclo de vida, la condición y las señales de trabajo actuales aún no requieren una respuesta de planificación de reemplazo para este activo.",
  "assets.detail.replacementLifecycleDriver":
    "\nLa postura del ciclo de vida está empujando a este activo hacia el reemplazo.",
  "assets.detail.replacementConditionDriver":
    "\nLa degradación de la condición contribuye a la planificación del reemplazo.",
  "assets.detail.replacementPredictionDriver":
    "\nLas señales de predicción indican una pista con vida útil restante más corta.",
  "assets.detail.replacementTasksDriver":
    "\nLas tareas de reemplazo ya están en cola para este recurso.",
  "assets.detail.replacementWorkOrdersDriver":
    "\nLas órdenes de trabajo de reemplazo activas muestran que la entrega ya está en marcha.",
  "assets.detail.replacementNoDrivers": "\nNo hay controladores de reemplazo activos.",
  "assets.detail.replacementDriversTitle": "\nControladores de repuesto",
  "assets.detail.replacementBookValueTitle": "\nValor contable actual",
  "assets.detail.replacementBookValueDescription":
    "\nValor en libros actual mantenido contra este registro de activo.",
  "assets.detail.replacementAdjustedValueTitle": "\nValor de reposición ajustado",
  "assets.detail.replacementAdjustedValueDescription":
    "\nValor de reemplazo estimado ajustado por la gravedad de la predicción actual.",
  "assets.detail.replacementCapitalGapTitle": "\nBrecha de capital",
  "assets.detail.replacementCapitalGapDescription":
    "\nVariación contra el valor contable actual: {percent}.",
  "assets.detail.replacementLifeTitle": "\nVida restante",
  "assets.detail.replacementLifeValue": "\n{days} días",
  "assets.detail.replacementLifeDescription":
    "\nÚltima señal de vida restante prevista cuando esté disponible.",
  "assets.detail.replacementTasksTitle": "\nTareas de reemplazo",
  "assets.detail.replacementTasksDescription":
    "\n{count} orden(es) de trabajo de reemplazo activas están actualmente vinculadas a este activo.",
  "assets.detail.replacementActionsTitle": "\nAcciones de reemplazo activo",
  "assets.detail.replacementActionsDescription":
    "\nTareas de reemplazo recientes y órdenes de trabajo vinculadas que actualmente impulsan la entrega de reemplazo.",
  "assets.detail.replacementActionsEmpty":
    "\nAún no hay acciones de reemplazo activas vinculadas a este activo.",
  "assets.detail.replacementPriorityColumn": "\nPrioridad",
  "assets.detail.replacementStatusColumn": "\nEstado",
  "assets.detail.replacementWorkOrderColumn": "\nOrden de trabajo vinculada",
  "assets.detail.replacementAssigneeColumn": "\nCesionario",
  "assets.detail.replacementDeadlineColumn": "\nFecha límite",
  "assets.detail.replacementUpdatedColumn": "\nActualizado",
  "assets.detail.replacementStandalone": "\nTarea de reemplazo independiente",
  "assets.detail.replacementNoAssignee": "\nSin cesionario",
  "assets.detail.replacementNoDeadline": "\nSin fecha límite",
  "assets.detail.replacementOpenPlanning": "\nPlanificación de finanzas abiertas",
  "assets.detail.replacementOpenPlanningAria":
    "Espacio de trabajo de planificación financiera abierto",
  "assets.detail.replacementOpenWorkOrderAria": "\nOrden de trabajo de reemplazo abierta {number}",
  "assets.detail.inspectionsTitle": "\nRegistros de inspección",
  "assets.detail.inspectionsDescription":
    "\nTareas de inspección recientes y órdenes de trabajo vinculadas para este activo, ordenadas por última actividad operativa.",
  "assets.detail.inspectionsEmpty":
    "\nAún no se han capturado registros de inspección para este activo.",
  "assets.detail.inspectionsStatus": "\nEstado de inspección",
  "assets.detail.inspectionsWorkOrder": "\nOrden de trabajo vinculada",
  "assets.detail.inspectionsAssignee": "\nCesionario",
  "assets.detail.inspectionsDeadline": "\nFecha límite",
  "assets.detail.inspectionsCompleted": "\nCompletado",
  "assets.detail.inspectionsUpdated": "\nActualizado",
  "assets.detail.inspectionsStandalone": "\nTarea de inspección independiente",
  "assets.detail.inspectionsUnassigned": "\nSin cesionario",
  "assets.detail.inspectionsNoDeadline": "\nSin fecha límite",
  "assets.detail.inspectionsNoCompletion": "\nNo completado",
  "assets.detail.maintenanceTitle": "\nActividad de mantenimiento",
  "assets.detail.maintenanceDescription":
    "Trabajos de reparación, calibración y emergencia recientes vinculados a este activo, incluido el estado de la tarea y la entrega de la orden de trabajo conectada.",
  "assets.detail.maintenanceAlertActiveTitle": "\nLa carga de trabajo de mantenimiento está activa",
  "assets.detail.maintenanceAlertActiveDescription":
    "\n{openTasks} tareas de mantenimiento abiertas y {activeWorkOrders} órdenes de trabajo activas están actualmente vinculadas a este activo.",
  "assets.detail.maintenanceAlertIdleTitle":
    "\nNo hay ninguna carga de trabajo de mantenimiento activa abierta",
  "assets.detail.maintenanceAlertIdleDescription":
    "\nActualmente no hay elementos activos de reparación, calibración o trabajo de emergencia vinculados a este activo.",
  "assets.detail.maintenanceOpenTasksTitle": "\nTareas de mantenimiento abiertas",
  "assets.detail.maintenanceOpenTasksDescription":
    "\nTareas de reparación, calibración y emergencia aún en vuelo.",
  "assets.detail.maintenanceCompletedTasksTitle": "\nTareas de mantenimiento completadas",
  "assets.detail.maintenanceCompletedTasksDescription":
    "\nTareas de mantenimiento ya cerradas para este activo.",
  "assets.detail.maintenanceActiveWorkOrdersTitle": "\nÓrdenes de trabajo de mantenimiento activo",
  "assets.detail.maintenanceActiveWorkOrdersDescription":
    "\nLas órdenes de trabajo vinculadas aún avanzan hacia la entrega operativa.",
  "assets.detail.maintenanceCompletedWorkOrdersTitle":
    "\nÓrdenes de trabajo de mantenimiento completadas",
  "assets.detail.maintenanceCompletedWorkOrdersDescription":
    "\nÓrdenes de trabajo vinculadas ya completadas para este activo.",
  "assets.detail.maintenanceRecordsTitle": "\nRegistros de mantenimiento recientes",
  "assets.detail.maintenanceRecordsDescription":
    "\nLas últimas tareas de mantenimiento y órdenes de trabajo vinculadas, ordenadas por movimiento más reciente.",
  "assets.detail.maintenanceEmpty":
    "\nAún no se han capturado registros de reparación, calibración o mantenimiento de emergencia para este activo.",
  "assets.detail.maintenanceTypeColumn": "\nTipo",
  "assets.detail.maintenancePriorityColumn": "\nPrioridad",
  "assets.detail.maintenanceStatusColumn": "\nEstado",
  "assets.detail.maintenanceWorkOrderColumn": "\nOrden de trabajo vinculada",
  "assets.detail.maintenanceAssigneeColumn": "\nCesionario",
  "assets.detail.maintenanceDeadlineColumn": "\nFecha límite",
  "assets.detail.maintenanceCompletedColumn": "\nCompletado",
  "assets.detail.maintenanceUpdatedColumn": "\nActualizado",
  "assets.detail.maintenanceStandalone": "\nTarea de mantenimiento independiente",
  "assets.detail.maintenanceNoAssignee": "\nSin cesionario",
  "assets.detail.maintenanceNoDeadline": "\nSin fecha límite",
  "assets.detail.maintenanceNoCompletion": "\nNo completado",
  "assets.detail.maintenanceOpenWorkOrders": "\nÓrdenes de trabajo abiertas",
  "assets.detail.maintenanceOpenWorkOrdersAria": "\nAbrir espacio de trabajo de órdenes de trabajo",
  "assets.detail.maintenanceOpenWorkOrderAria":
    "\nOrden de trabajo de mantenimiento abierta {number}",
  "assets.detail.costsTitle": "\nAsignación de costos del ciclo de vida",
  "assets.detail.costsDescription":
    "\nAsignación de costos de órdenes de trabajo recientes vinculadas a este activo, incluida mano de obra, materiales y otros gastos operativos.",
  "assets.detail.costsEmpty":
    "\nAún no se han capturado registros de costos de órdenes de trabajo vinculados para este activo.",
  "assets.detail.costsTotalTitle": "\nCosto total vinculado",
  "assets.detail.costsTotalDescription": "\n{count} orden(es) de trabajo vinculadas",
  "assets.detail.costsActiveTitle": "\nÓrdenes de trabajo activas",
  "assets.detail.costsActiveDescription":
    "\nCarga de trabajo operativa aún en curso para este activo.",
  "assets.detail.costsLabourTitle": "\nAsignación de mano de obra",
  "assets.detail.costsLabourDescription":
    "\nCosto total de mano de obra registrado en las órdenes de trabajo vinculadas.",
  "assets.detail.costsMaterialTitle": "\nAsignación de materiales",
  "assets.detail.costsMaterialDescription":
    "\nCompromisos materiales vinculados a través de la entrega de órdenes de trabajo.",
  "assets.detail.costsWorkOrder": "\nOrden de trabajo",
  "assets.detail.costsStatus": "\nEstado",
  "assets.detail.costsLabourColumn": "\nLabor",
  "assets.detail.costsMaterialColumn": "\nMaterial",
  "assets.detail.costsOtherColumn": "\nOtro",
  "assets.detail.costsTotalColumn": "\nTotal",
  "assets.detail.costsUpdatedColumn": "\nÚltimo movimiento",
  "assets.detail.costsCompletedValue": "\nCompletado {date}",
  "assets.lifecycleProfile.title": "\nPerfil de gestión del ciclo de vida",
  "assets.lifecycleProfile.description":
    "\nRealice un seguimiento del estado operativo actual, la situación del ciclo de vida y la última inspección confirmada para este activo.",
  "assets.lifecycleProfile.conditionLabel": "\nCondición",
  "assets.lifecycleProfile.conditionHint":
    "\nEstablezca la condición operativa actual utilizada por el análisis del ciclo de vida, los informes de preparación y la priorización.",
  "assets.lifecycleProfile.lifecycleLabel": "\nEtapa del ciclo de vida",
  "assets.lifecycleProfile.lifecycleHint":
    "Elija la postura actual del ciclo de vida para que los informes estratégicos de activos puedan distinguir los activos activos, monitoreados y al final de su vida útil.",
  "assets.lifecycleProfile.lastInspectionLabel": "\nFecha de la última inspección",
  "assets.lifecycleProfile.lastInspectionHint":
    "\nCapture la última fecha de inspección confirmada cuando la cronología anterior aún no refleje el registro patrimonial actual.",
  "assets.lifecycleProfile.submit": "\nGuardar perfil de ciclo de vida",
  "assets.lifecycleProfile.submitAria":
    "\nGuardar perfil de gestión del ciclo de vida de los activos",
  "assets.lifecycleProfile.snapshotTitle": "\nInstantánea de la postura del ciclo de vida",
  "assets.lifecycleProfile.snapshotDescription":
    "\nEl estado actual del ciclo de vida utilizado por el análisis de preparación, condición y planificación de reemplazo.",
  "assets.lifecycleProfile.snapshotCondition": "\nCondición",
  "assets.lifecycleProfile.snapshotLifecycle": "\nEtapa del ciclo de vida",
  "assets.lifecycleProfile.snapshotInspection": "\nÚltima inspección",
  "assets.lifecycleProfile.snapshotUpdated": "\nÚltima actualización",
  "assets.lifecycleProfile.historyTitle": "\nHistorial del ciclo de vida",
  "assets.lifecycleProfile.historyDescription":
    "\nLos cambios versionados del ciclo de vida se capturan aquí para el control de condiciones y la planificación de eliminación.",
  "assets.lifecycleProfile.historyEmpty":
    "\nAún no se han registrado cambios en el ciclo de vida. Guarde una actualización para iniciar el seguimiento de auditoría.",
  "assets.lifecycleProfile.historyUpdated": "\nActualización del ciclo de vida",
  "assets.lifecycleProfile.historyFrom": "\nDe",
  "assets.lifecycleProfile.historyTo": "\nPara",
  "assets.lifecycleProfile.history.fieldCondition": "\nCondición",
  "assets.lifecycleProfile.history.fieldStage": "\nEtapa del ciclo de vida",
  "assets.lifecycleProfile.history.fieldInspection": "\nÚltima inspección",
  "assets.lifecycleProfile.feedback.saved": "\nPerfil del ciclo de vida del activo guardado.",
  "assets.lifecycleProfile.feedback.loadFailed":
    "\nNo se puede cargar el perfil del ciclo de vida del activo en este momento.",
  "assets.lifecycleProfile.feedback.saveFailed":
    "\nNo se puede guardar el perfil del ciclo de vida del activo en este momento.",
  "assets.lifecycleProfile.validation.conditionRequired": "\nElija una condición válida.",
  "assets.lifecycleProfile.validation.lifecycleRequired":
    "\nElija una etapa válida del ciclo de vida.",
  "assets.lifecycleProfile.validation.lastInspectionInvalid":
    "\nUtilice una fecha de inspección válida.",
  "assets.registry.title": "\nPerfil registral de la propiedad",
  "assets.registry.description":
    "\nAsigne este activo a la jerarquía patrimonial y vincúlelo a la capacidad de capacitación que admite.",
  "assets.registry.hierarchyLabel": "\nNivel de jerarquía",
  "assets.registry.parentLabel": "\nActivo principal",
  "assets.registry.capabilityLabel": "\nVinculación de capacidad operativa",
  "assets.registry.capabilityPlaceholder":
    "\nEjemplo: Disponibilidad de alcance, disponibilidad de alojamiento, despacho de vehículos",
  "assets.registry.capabilityHint":
    "\nDescriba el resultado operativo que este activo permite para que los informes patrimoniales puedan acumularse por capacidad.",
  "assets.registry.parentHint":
    "\nElija un padre del mismo sitio cuando este activo se encuentre bajo una instalación, sistema o subsistema en la jerarquía del patrimonio.",
  "assets.registry.hierarchyHint":
    "\nUtilice Estado → Instalación → Sistema → Subsistema → Componente para mantener el registro coherente.",
  "assets.registry.parentRoot": "\nSin activo principal",
  "assets.registry.submit": "\nGuardar perfil de registro",
  "assets.registry.submitAria": "\nGuardar perfil de registro patrimonial",
  "assets.registry.snapshotTitle": "\nInstantánea de vinculación del registro",
  "assets.registry.snapshotDescription":
    "\nLa cadena jerárquica actual y el resumen de capacidades utilizados por la estrategia patrimonial, la planificación de órdenes de trabajo y las exportaciones.",
  "assets.registry.snapshotParent": "\nActivo principal",
  "assets.registry.snapshotChildren": "\nActivos secundarios directos",
  "assets.registry.snapshotCapability": "\nVinculación de capacidad",
  "assets.registry.snapshotUpdated": "\nÚltima actualización",
  "assets.registry.historyTitle": "\nHistorial de cambios",
  "assets.registry.historyDescription":
    "Las actualizaciones de registro versionadas se capturan aquí para la gestión de jerarquía y capacidad.",
  "assets.registry.historyEmpty":
    "\nAún no se han registrado cambios en el registro. Guarde una actualización para iniciar el seguimiento de auditoría.",
  "assets.registry.historyUpdated": "\nActualización del registro",
  "assets.registry.historyFrom": "\nDe",
  "assets.registry.historyTo": "\nPara",
  "assets.registry.history.fieldHierarchy": "\nNivel de jerarquía",
  "assets.registry.history.fieldParent": "\nActivo principal",
  "assets.registry.history.fieldCapability": "\nVinculación de capacidad operativa",
  "assets.registry.feedback.saved": "\nPerfil de registro de activos guardado.",
  "assets.registry.feedback.loadFailed":
    "\nNo se puede cargar el perfil de registro de activos en este momento.",
  "assets.registry.feedback.saveFailed":
    "\nNo se puede guardar el perfil de registro de activos en este momento.",
  "assets.registry.validation.hierarchyLevelRequired": "\nElija un nivel de jerarquía válido.",
  "assets.registry.validation.parentSelf": "\nUn activo no puede ser su propio padre.",
  "assets.registry.validation.parentMissing":
    "\nElija un activo principal válido de este registro.",
  "assets.registry.validation.parentSiteMismatch":
    "\nLos activos principales deben pertenecer al mismo sitio para preservar la integridad de la jerarquía patrimonial.",
  "assets.registry.validation.parentLevel":
    "\nElija un activo principal que se encuentre por encima del nivel de jerarquía seleccionado.",
  "assets.registry.validation.parentCycle":
    "\nEste padre crearía una jerarquía de patrimonio circular.",
  "tasks.quickAdd": "\nTarea de adición rápida",
  "tasks.quickAddAsset": "\nActivo",
  "tasks.quickAddSuccess": "\nTarea creada",
  "tasks.quickAddPlaceholder": "\nTítulo de la tarea...",
  "tasks.newTask": "\nNueva tarea",
  "tasks.quickAddAdd": "\nAgregar",
  "tasks.quickAddStatus": "\nEstado",
  "tasks.dragToReorder": "\nArrastre para cambiar el estado",
  "tasks.detail": "\nDetalle de la tarea",
  "tasks.statusUpdated": "\nEstado de la tarea actualizado",
  "tasks.empty": "\nNo se encontraron tareas coincidentes",
  "tasks.emptyBacklog": "\nNo hay tareas en Backlog",
  "tasks.emptyInProgress": "\nNo hay tareas en progreso",
  "tasks.emptyReview": "\nNo hay tareas en revisión",
  "tasks.emptyDone": "\nNo hay tareas completadas",
  "tasks.addToColumn": "\nAgregar tarea",
  "tasks.moveToStatus": "\nMover al estado",
  "predictions.markReviewed": "\nMarcar como reseñado",
  "predictions.emptyExplainer":
    "\nLas predicciones aparecen cuando los dispositivos informan telemetría durante más de 7 días",
  "predictions.severityLegend": "\nLeyenda de gravedad",
  "predictions.severityInfo": "\nInformativo: no es necesario realizar ninguna acción",
  "predictions.severityWarning": "\nSe necesita atención: programar el mantenimiento",
  "predictions.severityCritical": "\nSe requiere acción inmediata",
  "profile.edit": "\nEditar perfil",
  "profile.editName": "\nEditar nombre",
  "profile.nameRequired": "\nEl nombre es obligatorio",
  "profile.saved": "\nPerfil actualizado",
  "profile.preferencesSaved": "\nPreferencias guardadas",
  "profile.notificationPreferences": "\nPreferencias de notificación",
  "profile.enableNotifications": "\nHabilitar notificaciones por correo electrónico",
  "profile.locale": "\nConfiguración regional",
  "profile.localeEnGb": "\nInglés (Reino Unido)",
  "profile.localeEnUs": "\nInglés (Estados Unidos)",
  "profile.savePreferences": "\nGuardar preferencias",
  "profile.languageLocale": "\nIdioma/localización",
  "profile.avatarAlt": "\nAvatar de perfil",
  "auth.forgotPassword": "\n¿Olvidaste tu contraseña?",
  "auth.forgotPassword.documentTitle": "\nContraseña olvidada — Plataforma operativa",
  "auth.forgotPasswordHelp":
    "\nIngrese la dirección de correo electrónico utilizada para su cuenta.",
  "auth.forgotPasswordPageHelp":
    "\nLe enviaremos un enlace seguro para restablecer la contraseña si la cuenta existe.",
  "auth.forgotPassword.contextTitle": "\nEspacio de trabajo de recuperación",
  "auth.forgotPassword.contextDescription":
    "\nMantenga la recuperación en el mismo flujo seguro, confirme la dirección de la cuenta y haga explícito el siguiente paso antes de salir de esta pantalla.",
  "auth.forgotPassword.progressTitle": "\nFlujo de recuperación",
  "auth.forgotPassword.progressDescription":
    "\nSolicite el enlace, revise su bandeja de entrada, establezca una nueva contraseña y luego revise las sesiones activas.",
  "auth.forgotPassword.progressStep.request": "\nSolicitar enlace",
  "auth.forgotPassword.progressStep.inbox": "\nRevisar bandeja de entrada",
  "auth.forgotPassword.progressStep.reset": "\nRestablecer contraseña",
  "auth.forgotPassword.responseWindowLabel": "\nExpectativa de entrega",
  "auth.forgotPassword.responseWindowValue":
    "\nLa entrega del enlace comienza inmediatamente después del envío",
  "auth.forgotPassword.channelLabel": "Canal de recuperación",
  "auth.forgotPassword.channelValue":
    "\nRestablecimiento basado en correo electrónico con redireccionamiento seguro",
  "auth.forgotPassword.checklist.accountTitle":
    "\nConfirme el correo electrónico de la cuenta primero",
  "auth.forgotPassword.checklist.accountDescription":
    "\nUtilice la dirección que ya tiene acceso al espacio de trabajo de la organización para evitar reiniciar el flujo de recuperación.",
  "auth.forgotPassword.checklist.inboxTitle":
    "\nVigilar la bandeja de entrada y las carpetas de spam",
  "auth.forgotPassword.checklist.inboxDescription":
    "\nEl enlace seguro puede llegar unos momentos después del envío, según la puerta de enlace de correo de la organización.",
  "auth.forgotPassword.checklist.supportTitle":
    "\nUtilice la misma ruta de recuperación para soporte",
  "auth.forgotPassword.checklist.supportDescription":
    "\nSi el mensaje no llega, vuelva a intentarlo desde esta pantalla y mantenga el mismo contexto de cuenta en lugar de crear una nueva ruta de inicio de sesión.",
  "auth.forgotPassword.timingTitle": "\nTiempo de recuperación",
  "auth.forgotPassword.timingDescription":
    "\nMantenga informado al operador sobre cuándo llega la solicitud, cuándo se debe revisar la bandeja de entrada y cuándo volver a intentarlo.",
  "auth.forgotPassword.timingSubmittedTitle": "\nSolicitud enviada",
  "auth.forgotPassword.timingSubmittedDescription":
    "\nPonemos en cola el correo electrónico de restablecimiento seguro tan pronto como se acepta la solicitud.",
  "auth.forgotPassword.timingInboxTitle": "\nRevisa la bandeja de entrada",
  "auth.forgotPassword.timingInboxDescription":
    "\nBusque el correo electrónico de recuperación primero en la bandeja de entrada principal y luego en las carpetas de spam o cuarentena.",
  "auth.forgotPassword.timingRetryTitle":
    "\nVuelva a intentarlo solo después de que pase la ventana",
  "auth.forgotPassword.timingRetryDescription":
    "\nSi el enlace no ha llegado después de la ventana esperada, vuelva a intentarlo desde esta página para que la misma ruta de recuperación permanezca activa.",
  "auth.forgotPasswordResetTitle": "\nRestablece tu contraseña",
  "auth.resetPassword.documentTitle": "\nRestablecer contraseña — Plataforma operativa",
  "auth.forgotPasswordCheckEmail": "\nRevisa tu correo electrónico",
  "auth.forgotPassword.sent.documentTitle": "\nRevisa tu correo electrónico — Plataforma operativa",
  "auth.forgotPasswordCheckEmailDesc":
    "\nSi existe una cuenta con ese correo electrónico, le hemos enviado un enlace para restablecer la contraseña.",
  "auth.forgotPassword.sentTitle": "\nEnlace de recuperación enviado",
  "auth.forgotPassword.sentDescription":
    "\nUtilice el enlace seguro de su bandeja de entrada y luego regrese al mismo flujo de inicio de sesión para conservar el destino del espacio de trabajo.",
  "auth.forgotPassword.sentTimingTitle":
    "\n¿Qué pasa después? ZZ0__\nRevisión de calificación y adecuación del sitio",
  "auth.forgotPassword.sentTimingDescription":
    "\nUtilice el enlace de correo electrónico de inmediato, vuelva a intentarlo solo si es necesario y mantenga visible el contexto de seguridad mientras espera.",
  "auth.forgotPassword.sentTimingArrivalTitle": "\nLlegada del enlace",
  "auth.forgotPassword.sentTimingArrivalDescription":
    "\nEl correo electrónico de restablecimiento debería llegar poco después del envío, según la puerta de enlace de correo de la organización.",
  "auth.forgotPassword.sentTimingRetryTitle": "\nReintentar orientación",
  "auth.forgotPassword.sentTimingRetryDescription":
    "\nSi no llega nada después de la ventana esperada, vuelva a enviar la solicitud desde el mismo flujo de recuperación en lugar de comenzar de nuevo en otro lugar.",
  "auth.forgotPassword.sentTimingSecurityTitle": "\nRecordatorio de seguridad",
  "auth.forgotPassword.sentTimingSecurityDescription":
    "Utilice únicamente el enlace del canal de correo electrónico de confianza e ignore los mensajes inesperados de restablecimiento de contraseña.",
  "auth.sendResetLink": "\nEnviar enlace de reinicio",
  "auth.backToSignIn": "\nVolver a iniciar sesión",
  "auth.forgotPasswordSent":
    "\nRevise su correo electrónico para ver si hay un enlace para restablecer su contraseña",
  "auth.resetPasswordHelp": "\nElija una nueva contraseña para su cuenta.",
  "auth.resetPassword.contextTitle": "\nRevisión de restablecimiento de contraseña",
  "auth.resetPassword.contextDescription":
    "\nActualice la credencial, confirme el nuevo secreto una vez y mantenga visible el siguiente paso de seguridad antes de continuar.",
  "auth.resetPassword.progressTitle": "\nRestablecer flujo de trabajo",
  "auth.resetPassword.progressDescription":
    "\nEstablezca la nueva contraseña, confírmela una vez y revise las sesiones después del restablecimiento.",
  "auth.resetPassword.progressStep.request": "\nSolicitar enlace",
  "auth.resetPassword.progressStep.reset": "\nEstablecer nueva contraseña",
  "auth.resetPassword.progressStep.review": "\nSesiones de revisión",
  "auth.resetPasswordNewPasswordLabel": "\nNueva contraseña",
  "auth.resetPasswordConfirmPasswordLabel": "\nConfirmar nueva contraseña",
  "auth.resetPasswordNewPasswordHint": "\nUtilice al menos {count} caracteres.",
  "auth.resetPasswordConfirmPasswordHint": "\nVuelva a escribir la misma contraseña.",
  "auth.resetPassword.policyLabel": "\nPolítica de contraseñas",
  "auth.resetPassword.policyValue": "\nMínimo {count} caracteres con un valor único ",
  "auth.resetPassword.sessionLabel": "\nDespués del reinicio",
  "auth.resetPassword.sessionValue":
    "\nRevisar las sesiones y regresar al espacio de trabajo seguro",
  "auth.resetPassword.checklist.passwordTitle": "\nCrea una nueva contraseña",
  "auth.resetPassword.checklist.passwordDescription":
    "\nUtilice al menos {count} caracteres y evite reutilizar credenciales que se compartieron entre herramientas.",
  "auth.resetPassword.checklist.confirmTitle": "\nCoincide con el campo de confirmación",
  "auth.resetPassword.checklist.confirmDescription":
    "\nConfirme la contraseña en esta pantalla para que el flujo de recuperación se complete sin un segundo reintento.",
  "auth.resetPassword.checklist.securityTitle": "\nRevisar la seguridad de la cuenta siguiente",
  "auth.resetPassword.checklist.securityDescription":
    "\nUna vez que el reinicio se realice correctamente, inicie sesión nuevamente y verifique las sesiones recientes antes de regresar al trabajo diario.",
  "auth.resetPassword.monitoringTitle": "\nRestablecer preparación",
  "auth.resetPassword.monitoringDescription":
    "\nRealice un seguimiento de la seguridad de la contraseña, el estado de confirmación y la revisión de seguridad final antes de enviar el restablecimiento.",
  "auth.resetPassword.monitoringStep.passwordTitle": "\nCumplir con la política de contraseñas",
  "auth.resetPassword.monitoringStep.passwordDescription":
    "\nUtilice al menos {count} caracteres y evite credenciales que ya se hayan utilizado en otros lugares.",
  "auth.resetPassword.monitoringStep.matchTitle": "\nConfirme la nueva contraseña",
  "auth.resetPassword.monitoringStep.matchDescription":
    "\nHaga coincidir exactamente el campo de confirmación para que el reinicio se pueda completar en una sola pasada.",
  "auth.resetPassword.monitoringStep.reviewTitle": "\nRevisar el siguiente paso de seguridad",
  "auth.resetPassword.monitoringStep.reviewDescription":
    "\nPlanee iniciar sesión nuevamente e inspeccionar las sesiones recientes una vez que la actualización de la contraseña se realice correctamente.",
  "auth.resetPassword.monitoringLengthLabel": "\nLongitud de la contraseña",
  "auth.resetPassword.monitoringLengthPending":
    "\nAgregue al menos {count} caracteres para cumplir con la política de contraseñas actual.",
  "auth.resetPassword.monitoringLengthReady":
    "\nSe cumplió el requisito de longitud de la contraseña.",
  "auth.resetPassword.monitoringPending": "\nPendiente",
  "auth.resetPassword.monitoringReady": "\nListo",
  "auth.resetPassword.monitoringMatchLabel": "\nCoincidencia de confirmación",
  "auth.resetPassword.monitoringMatchPending":
    "\nIngrese la misma contraseña en el campo de confirmación para continuar.",
  "auth.resetPassword.monitoringMatchReady":
    "Las contraseñas coinciden y están listas para enviarse.",
  "auth.resetPassword.monitoringReviewLabel": "\nSeguimiento de seguridad",
  "auth.resetPassword.monitoringReviewValue":
    "\nInicie sesión nuevamente, revise las sesiones recientes y confirme la ruta de recuperación antes de regresar al trabajo.",
  "auth.resetPassword.monitoringReviewState": "\nRevisar después del reinicio",
  "auth.resetPassword.monitoringLiveIdle":
    "\nLa supervisión de restablecimiento de contraseña está esperando una contraseña que cumpla con la política.",
  "auth.resetPassword.monitoringLiveConfirm":
    "\nSe cumplió la política de contraseñas. Confirme la contraseña para finalizar el restablecimiento.",
  "auth.resetPassword.monitoringLiveReady":
    "\nLos requisitos para restablecer la contraseña están completos y listos para enviarse.",
  "auth.resetPasswordSubmit": "\nRestablecer contraseña",
  "auth.resetPasswordSuccessTitle": "\nContraseña actualizada",
  "auth.resetPassword.success.documentTitle": "\nContraseña actualizada — Plataforma operativa",
  "auth.resetPasswordSuccessBody":
    "\nSu contraseña ha sido actualizada. Puedes iniciar sesión con la nueva contraseña ahora.",
  "auth.resetPassword.reviewSecurity": "\nRevisar la seguridad después de iniciar sesión",
  "auth.resetPasswordMissingToken":
    "\nEste enlace para restablecer contraseña está incompleto. Solicite uno nuevo para continuar.",
  "auth.resetPasswordInvalidToken":
    "\nEste enlace para restablecer contraseña no es válido o ha caducado. Solicite uno nuevo para continuar.",
  "auth.resetPasswordPasswordsDoNotMatch": "\nLa confirmación de contraseña no coincide.",
  "auth.resetPasswordPasswordTooShort": "\nLa contraseña debe tener al menos {count} caracteres.",
  "auth.resetPasswordRequestEmailRequired":
    "\nIngrese la dirección de correo electrónico asociada con su cuenta.",
  "auth.resetPasswordEmailSubject": "\nRestablezca su contraseña de {brandName}",
  "auth.resetPasswordEmailIntro":
    "\nUtilice el siguiente enlace para restablecer su contraseña de {brandName}:",
  "auth.resetPasswordEmailOutro":
    "\nSi no solicitó este cambio, puede ignorar este correo electrónico.",
  "auth.tooManyAttempts": "\nDemasiados intentos. Inténtelo de nuevo en {minutes} minutos.",
  "dashboard.dateRange": "\nRango de fechas",
  "dashboard.last7Days": "\nÚltimos 7 días",
  "dashboard.last30Days": "\nÚltimos 30 días",
  "dashboard.last90Days": "\nÚltimos 90 días",
  "dashboard.activityFeed.title": "\nActividad reciente",
  "dashboard.activityFeed.subtitle": "\nÚltimos eventos de plataforma y cambios de estado",
  "dashboard.platformStats": "\nResumen de la plataforma",
  "dashboard.onboardingTitle": "\nComience con {brandName}",
  "dashboard.onboardingStep1": "\nAñade tu primer dispositivo",
  "dashboard.onboardingStep2": "\nVer predicciones de IA",
  "dashboard.onboardingStep3": "\nConfigurar informes",
  "finance.empty": "\nNingún activo tiene datos de depreciación configurados",
  "finance.fiscalPeriod": "\nPeríodo fiscal",
  "finance.exportData": "\nExportar datos",
  "finance.export.csvTooltip": "\nDescarga la vista filtrada actual en formato CSV",
  "finance.depreciation.table.accumulatedDepreciation": "\nDepreciación acumulada",
  "finance.depreciation.table.netBookValue": "\nValor neto contable",
  "reports.dateRange": "\nRango de fechas",
  "reports.reportHistory": "\nHistorial de informes",
  "reports.noHistory": "\nAún no se han generado informes",
  "reports.history.title": "\nCronología del informe guardado",
  "reports.history.description":
    "\nPersista en generar informes personalizados, revisar la cronología y reabrir resultados recientes.",
  "reports.history.empty":
    "\nAún no hay informes guardados. Genere y guarde un informe personalizado para iniciar la cronología.",
  "reports.history.emptyFinancePlanning":
    "\nAún no se ha guardado ningún informe inicial de planificación financiera.",
  "reports.history.filter.all": "\nTodos",
  "reports.history.filter.financePlanning": "\nPlanificación financiera",
  "reports.history.saveAction": "\nGuardar informe",
  "reports.history.saved": "\nInforme guardado en cronología",
  "reports.history.savedMeta":
    "{generatedAt} • {sectionCount} secciones • Cobertura {coverageScore}% • {createdBy}",
  "reports.history.loadAria": "\nCargue el informe guardado {name} en el constructor ",
  "reports.history.askAiAria": "\nPreguntar a AI sobre el informe guardado {name}",
  "reports.history.reviewPrompt":
    "Revise el informe guardado {report}. Se dirige a la audiencia {audience} con un enfoque {focus} e incluye {sections}. Explique cuándo se debe reutilizar, actualizar o retirar esta entrada cronológica.",
  "reports.history.comparePrompt":
    "\nCompare el informe guardado {report} con el paquete activo {activePack}. El paquete guardado está dirigido a la audiencia {audience} con un enfoque {focus} e incluye {sections}. Explique qué cambió, qué sigue siendo importante y qué desgloses o actualizaciones de datos deberían realizarse a continuación.",
  "reports.history.error.invalid": "\nEl informe generado está incompleto y no se pudo guardar.",
  "reports.history.error.saveFailed":
    "\nNo se puede guardar la entrada cronológica del informe en este momento.",
  "sites.title": "\nBases e instalaciones",
  "sites.subtitle": "\nGestionar ubicaciones operativas, clasificaciones y dependencias.",
  "sites.kind.base": "\nBase",
  "sites.kind.facility": "\nInstalación",
  "sites.stats.active": "\nSitios activos",
  "sites.stats.bases": "\nBases",
  "sites.stats.facilities": "\nInstalaciones",
  "sites.table.name": "\nUbicación",
  "sites.table.kind": "\nTipo",
  "sites.table.coordinates": "\nCoordenadas",
  "sites.table.dependencies": "\nDependencias",
  "sites.table.status": "\nEstado",
  "sites.metrics.assets": "\n{count} activos",
  "sites.metrics.crews": "\n{count} tripulaciones",
  "sites.metrics.iot": "\n{count} dispositivos IoT",
  "sites.status.active": "\nActivo",
  "sites.status.inactive": "\nInactivo",
  "sites.actions.edit": "\nEditar ubicación",
  "sites.actions.delete": "\nEliminar ubicación",
  "sites.form.nameLabel": "\nNombre",
  "sites.form.kindLabel": "\nClasificación",
  "sites.form.locationLabel": "\nUbicación",
  "sites.form.descriptionLabel": "\nDescripción",
  "sites.form.gpsLatLabel": "\nLatitud",
  "sites.form.gpsLonLabel": "\nLongitud",
  "sites.form.activeLabel": "\nActivo y disponible para operaciones",
  "sites.form.updateAction": "\nGuardar cambios",
  "sites.form.createAction": "\nCrear ubicación",
  "sites.form.createTitle": "\nAgregar base o instalación",
  "sites.form.createDescription":
    "\nCree un nuevo sitio operativo y póngalo disponible en los flujos de trabajo de finanzas, documentos y utilización.",
  "sites.feedback.created": "\nUbicación creada correctamente.",
  "sites.feedback.updated": "\nUbicación actualizada correctamente.",
  "sites.feedback.deleted": "\nUbicación eliminada correctamente.",
  "sites.error.invalid": "\nIngrese un nombre de sitio y una ubicación válidos.",
  "sites.error.invalidCoordinates": "\nLa latitud o la longitud están fuera de los límites.",
  "sites.error.inUse": "\nEste sitio todavía tiene dependencias operativas y no se puede eliminar.",
  "sites.error.notFound": "\nNo se pudo encontrar el sitio solicitado.",
  "sites.error.saveFailed": "\nNo se pudo guardar el cambio de sitio.",
  "documentWorkspace.section.eyebrow": "\nEspacio de trabajo transaccional",
  "documentWorkspace.section.filtersAria": "\nFiltros de espacio de trabajo",
  "documentWorkspace.section.savedViewTitle": "\nVistas guardadas basadas en roles",
  "documentWorkspace.section.savedViewDescription":
    "\nMantenga la combinación actual de función, filtro y pestaña disponible como una porción duradera del espacio de trabajo.",
  "documentWorkspace.section.commandTitle": "\nPostura de mando",
  "documentWorkspace.section.commandDescription":
    "\nRealice un seguimiento de la fase del documento actual, la transferencia de entrega y controle la presión antes de profundizar en los registros en vivo.",
  "documentWorkspace.section.recentTitle": "\nDocumentos recientes",
  "documentWorkspace.section.recentDescription": "\nÚltimos registros en el ámbito actual.",
  "documentWorkspace.section.historyTitle": "\nHistorial del ciclo de vida",
  "documentWorkspace.history.approvalRoutedTitle": "\nAprobación enrutada",
  "documentWorkspace.history.approvalRoutedDescription":
    "\nFinanzas puso en cola el siguiente paso de revisión.",
  "documentWorkspace.section.historyDescription":
    "\nCronología inmutable para el movimiento de documentos.",
  "documentWorkspace.section.compareTitle": "\nBandeja de comparación de decisiones",
  "documentWorkspace.section.compareDescription":
    "Mantenga visibles el documento principal, la presión de aprobación y la postura de exportación en un carril compartido.",
  "documentWorkspace.section.approvalInboxTitle": "\nBandeja de entrada de aprobación",
  "documentWorkspace.section.approvalInboxDescription":
    "\nMuestra la siguiente decisión pendiente y mantén visible la cola de aprobación.",
  "documentWorkspace.section.exportPackTitle": "\nPaquete de exportación y evidencia",
  "documentWorkspace.section.exportPackDescription":
    "\nEmpaquetar el registro seleccionado, el historial y la evidencia de respaldo para el siguiente flujo de trabajo.",
  "documentWorkspace.section.collectionsTitle": "\nFlujo de cobros y discrepancias",
  "documentWorkspace.section.collectionsDescription":
    "\nRealice un seguimiento de la presión de pago, recibo o variación restante antes de que se convierta en un bloqueador.",
  "documentWorkspace.section.relatedActivityTitle": "\nContexto de actividad relacionada",
  "documentWorkspace.section.relatedActivityDescription":
    "\nMantenga visibles el movimiento más reciente, los registros vinculados y el traspaso del operador desde el mismo espacio de trabajo.",
  "documentWorkspace.metricTone.neutral": "\nEstable",
  "documentWorkspace.metricTone.primary": "\nPrioridad",
  "documentWorkspace.metricTone.info": "\nEn revisión",
  "documentWorkspace.metricTone.success": "\nEn camino",
  "documentWorkspace.metricTone.warning": "\nAtención",
  "documentWorkspace.metricTone.error": "\nEscalado",
  "documentWorkspace.table.document": "\nDocumento",
  "documentWorkspace.table.status": "\nEstado",
  "documentWorkspace.table.amount": "\nCantidad",
  "documentWorkspace.table.date": "\nFecha",
  "documentWorkspace.list.filterBarAria": "\nFiltros de la lista de documentos",
  "documentWorkspace.list.searchPlaceholder": "\nBuscar documentos…",
  "documentWorkspace.list.searchAria": "\nBuscar documentos",
  "documentWorkspace.list.statusFilterAria": "\nFiltrar por estado",
  "documentWorkspace.list.tableAria": "\nDocumentos — {documentType}",
  "documentWorkspace.list.emptyTitle": "\nAún no hay documentos",
  "documentWorkspace.list.emptyCta": "\nCrear documento",
  "documentWorkspace.list.tableLoading": "\nCargando documentos",
  "documentWorkspace.list.sectionAria": "\nLista de documentos",
  "documentWorkspace.tab.overview": "\nDescripción general",
  "documentWorkspace.tab.documents": "\nDocumentos",
  "documentWorkspace.tab.history": "\nHistoria",
  "documentWorkspace.filter.all": "\nTodos",
  "documentWorkspace.metric.total": "\nTotal",
  "documentWorkspace.metric.completed": "\nCompletado",
  "documentWorkspace.emptyCta":
    "\nCree su primer documento para comenzar a realizar un seguimiento de este flujo de trabajo.",
  "documentWorkspace.emptyTimelineCta":
    "\nLa actividad del documento aparecerá aquí una vez que se creen los registros.",
  "documentWorkspace.rfq.heading": "\nRFQ",
  "documentWorkspace.rfq.description":
    "\nEmbudo de calificación entrante para solicitudes públicas, conversaciones con socios y conversión de cotizaciones.",
  "documentWorkspace.rfq.empty": "\nAún no hay solicitudes de cotización disponibles.",
  "documentWorkspace.rfq.timelineEmpty": "\nAún no hay ningún historial de RFQ disponible.",
  "documentWorkspace.rfq.timelineFallback": "\nFlujo de trabajo de RFQ actualizado.",
  "documentWorkspace.rfq.metric.submitted": "\nEnviado",
  "documentWorkspace.rfq.metric.quoted": "\nCitado",
  "documentWorkspace.rfq.metric.accepted": "\nAceptado",
  "documentWorkspace.rfq.filter.submitted": "\nEnviado",
  "documentWorkspace.rfq.filter.quoted": "\nCitado",
  "documentWorkspace.rfq.filter.accepted": "\nAceptado",
  "documentWorkspace.rfq.step.draft": "\nRevisión",
  "documentWorkspace.rfq.step.submitted": "\nEnviado",
  "documentWorkspace.rfq.step.qualified": "\nCalificado",
  "documentWorkspace.rfq.step.quoted": "\nCitado",
  "documentWorkspace.rfq.step.accepted": "\nAceptado",
  "documentWorkspace.rfq.step.declined": "\nRechazado",
  "documentWorkspace.rfq.step.expired": "\nCaducado",
  "documentWorkspace.rfq.secondaryFallback": "\nSolicitud anónima",
  "documentWorkspace.rfq.amountFallback":
    "\nPresupuesto por determinar\nNo se encontró la solicitud de cotización.",
  "documentWorkspace.rfq.notFound": "\nRFQ __PH0__ enviada.",
  "documentWorkspace.rfq.submitted": "\nAlcance general del proyecto",
  "documentWorkspace.rfq.lineItemFallback": "\nCuéntanos para qué es la solicitud.",
  "documentWorkspace.rfq.validation.title":
    "\nAgregue un breve resumen operativo para que la clasificación comience con el contexto.",
  "documentWorkspace.rfq.validation.summary": "\nIngrese un correo electrónico de contacto válido.",
  "documentWorkspace.rfq.validation.email": "\nUtilice una fecha de solicitud válida.",
  "documentWorkspace.rfq.validation.dueDate": "\nUtilice un presupuesto numérico válido.",
  "documentWorkspace.rfq.validation.budget": "\nEl envío de RFQ necesita algunas correcciones.",
  "documentWorkspace.rfq.validation.error":
    "\nAprobación, programación, SLA e historial de finalización para la entrega operativa.",
  "documentWorkspace.workOrder.heading": "\nÓrdenes de trabajo",
  "documentWorkspace.workOrder.description": "\nAún no hay órdenes de trabajo disponibles.",
  "documentWorkspace.workOrder.empty":
    "\nAún no hay ningún historial de órdenes de trabajo disponible.",
  "documentWorkspace.workOrder.timelineEmpty":
    "\nCiclo de vida de la orden de trabajo actualizado.",
  "documentWorkspace.workOrder.timelineFallback": "\nCola de revisión",
  "documentWorkspace.workOrder.metric.inProgress": "\nEn progreso",
  "documentWorkspace.workOrder.metric.reviewQueue": "\nTriaje",
  "documentWorkspace.workOrder.filter.triage": "\nListo para revisión",
  "documentWorkspace.workOrder.filter.scheduled": "\nProgramado",
  "documentWorkspace.workOrder.filter.review": "\nNo se encontró la orden de trabajo.",
  "documentWorkspace.workOrder.step.draft": "\nRevisión",
  "documentWorkspace.workOrder.step.triage": "\nListo para revisión",
  "documentWorkspace.workOrder.step.approved": "Aprobado",
  "documentWorkspace.workOrder.step.scheduled": "\nProgramado",
  "documentWorkspace.workOrder.step.inProgress": "\nEn progreso",
  "documentWorkspace.workOrder.step.readyForReview": "\nNo se encontró la orden de trabajo.",
  "documentWorkspace.workOrder.step.completed": "\nCompletado",
  "documentWorkspace.workOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.workOrder.notFound": "\nDetalle de orden de trabajo",
  "workOrders.detail.title":
    "\nRealice un seguimiento de la asignación de mano de obra, la producción de la fuerza laboral y la captura de costos en comparación con una orden operativa.",
  "workOrders.detail.subtitle": "\nResumen de ejecución",
  "workOrders.detail.summaryTitle":
    "\nEstado de entrega actual, contexto del cesionario y acumulación de costos retenida contra este pedido.",
  "workOrders.detail.summaryDescription": "\nPedido del cliente",
  "workOrders.detail.site": "\nSitio",
  "workOrders.detail.customerOrder": "\nVentana programada",
  "workOrders.detail.assignee": "\nCesionario",
  "workOrders.detail.schedule": "\nCosto laboral",
  "workOrders.detail.costs.labour": "\nCosto de materiales",
  "workOrders.detail.costs.material": "\nOtro costo",
  "workOrders.detail.costs.other": "",
  "workOrders.detail.assigneeRole": "Rol asignado",
  "workOrders.detail.updatedAt": "\nÚltima actualización",
  "workOrders.detail.outputUnits": "\nUnidades de salida",
  "workOrders.detail.signoffPending": "\nAprobación del supervisor pendiente",
  "workOrders.detail.signoffReady": "\nListo para la aprobación del supervisor",
  "workOrders.detail.signoffComplete": "\nAprobación del supervisor completa",
  "workOrders.detail.descriptionTitle": "\nResumen operativo",
  "workOrders.detail.descriptionDescription":
    "\nMantenga la descripción del alcance y las notas de ejecución al lado del libro mayor de mano de obra.",
  "workOrders.labor.feedback.saved":
    "\nEntrada de mano de obra guardada y acumulación de costos de órdenes de trabajo actualizada.",
  "workOrders.labor.activity.inspection": "\nInspección",
  "workOrders.labor.activity.maintenance": "\nMantenimiento",
  "workOrders.labor.activity.repair": "\nReparación",
  "workOrders.labor.activity.installation": "\nInstalación",
  "workOrders.labor.activity.range_support": "\nSoporte de rango",
  "workOrders.labor.activity.soft_fm": "\nSuave FM",
  "workOrders.labor.activity.compliance": "\nCumplimiento",
  "workOrders.labor.summary.totalHours": "\nHoras registradas",
  "workOrders.labor.summary.totalHoursDesc":
    "\nSeguimiento del esfuerzo laboral en el libro mayor actual.",
  "workOrders.labor.summary.totalCost": "\nCosto de mano de obra reservado",
  "workOrders.labor.summary.totalCostDesc":
    "\nIngresado al campo de costo laboral de la orden de trabajo.",
  "workOrders.labor.summary.workerCount": "\nTrabajadores asignados",
  "workOrders.labor.summary.workerCountDesc": "\nDistintos empleados registrados en esta orden.",
  "workOrders.labor.summary.productivity": "\nTasa de productividad",
  "workOrders.labor.summary.productivityDesc":
    "\n{output} unidades de salida registradas en el libro mayor actual.",
  "workOrders.labor.form.title": "\nCapturar la actividad de la fuerza laboral",
  "workOrders.labor.form.description":
    "\nRegistre el esfuerzo de la hoja de horas, las unidades de producción y el costo de mano de obra directamente con la orden de trabajo operativa.",
  "workOrders.labor.form.submitAria": "\nGuardar entrada de mano de obra de orden de trabajo",
  "workOrders.labor.form.employee": "\nEmpleado",
  "workOrders.labor.form.employeePlaceholder": "\nSeleccione un empleado",
  "workOrders.labor.form.employeeHint":
    "\nUtilice el directorio de usuarios interno compartido como fuente de verdad para la fuerza laboral.",
  "workOrders.labor.form.activity": "\nActividad",
  "workOrders.labor.form.activityPlaceholder": "\nSeleccionar actividad",
  "workOrders.labor.form.activityHint":
    "\nClasifique la producción operativa para poder comparar la productividad y la combinación de fuerza laboral.",
  "workOrders.labor.form.entryDate": "\nFecha de entrada",
  "workOrders.labor.form.entryDateHint": "\nCapture la fecha en que se realizó el trabajo.",
  "workOrders.labor.form.hours": "\nHoras",
  "workOrders.labor.form.hoursHint":
    "\nUtilice horas decimales para el esfuerzo laboral registrado.",
  "workOrders.labor.form.hourlyRate": "\nTarifa por hora",
  "workOrders.labor.form.hourlyRateHint":
    "\nCapturado en {currency} y transferido al costo laboral.",
  "workOrders.labor.form.outputUnits": "\nUnidades de salida",
  "workOrders.labor.form.outputUnitsHint":
    "\nCantidad de productividad opcional utilizada para comparar el rendimiento operativo.",
  "workOrders.labor.form.notes": "\nNotas",
  "workOrders.labor.form.notesHint":
    "\nCapture notas de turno, bloqueadores o comentarios de seguridad.",
  "workOrders.labor.form.submit": "\nAgregar entrada de mano de obra",
  "workOrders.labor.table.title": "\nLibro mayor de mano de obra",
  "workOrders.labor.table.description":
    "\nEntradas de mano de obra duraderas estilo hoja de horas vinculadas a una salida operativa.",
  "workOrders.labor.table.employee": "\nEmpleado",
  "workOrders.labor.table.activity": "\nActividad",
  "workOrders.labor.table.entryDate": "\nFecha",
  "workOrders.labor.table.hours": "\nHoras",
  "workOrders.labor.table.outputUnits": "\nSalida",
  "workOrders.labor.table.totalCost": "\nCosto",
  "workOrders.labor.table.notes": "\nNotas",
  "workOrders.labor.table.loggedBy": "\nRegistrado por {name}",
  "workOrders.labor.table.empty":
    "\nAún no se han capturado entradas de mano de obra para esta orden de trabajo.",
  "workOrders.labor.validation.formInvalid":
    "\nCorrija el formulario de entrada de mano de obra antes de guardar.",
  "workOrders.labor.validation.employeeId": "\nSeleccione el empleado que completó el trabajo.",
  "workOrders.labor.validation.employeeMissing":
    "\nEl empleado seleccionado ya no está disponible para la asignación de mano de obra.",
  "workOrders.labor.validation.activity": "\nSeleccione una actividad laboral válida.",
  "workOrders.labor.validation.entryDate": "\nUtilice una fecha de entrada de mano de obra válida.",
  "workOrders.labor.validation.hours": "\nIngrese las horas trabajadas.",
  "workOrders.labor.validation.hoursPositive": "\nLas horas deben ser mayores que cero.",
  "workOrders.labor.validation.hourlyRate": "\nUtilice una tarifa por hora válida.",
  "workOrders.labor.validation.outputUnits": "\nUtilice un valor de unidad de salida válido.",
  "documentWorkspace.purchaseOrder.heading": "\nÓrdenes de compra",
  "documentWorkspace.purchaseOrder.description":
    "Aprobaciones de proveedores, seguimiento de recibos y puntos de control de facturación desde la adquisición hasta el pago.",
  "documentWorkspace.purchaseOrder.empty": "\nAún no hay órdenes de compra disponibles.",
  "documentWorkspace.purchaseOrder.timelineEmpty":
    "\nAún no hay ningún historial de órdenes de compra disponible.",
  "documentWorkspace.purchaseOrder.timelineFallback":
    "\nCiclo de vida de la orden de compra actualizado.",
  "documentWorkspace.purchaseOrder.metric.pending": "\nPendiente",
  "documentWorkspace.purchaseOrder.metric.received": "\nRecibido",
  "documentWorkspace.purchaseOrder.metric.billed": "\nFacturado",
  "documentWorkspace.purchaseOrder.filter.requested": "\nSolicitado",
  "documentWorkspace.purchaseOrder.filter.sent": "\nEnviado",
  "documentWorkspace.purchaseOrder.filter.received": "\nRecibido",
  "documentWorkspace.purchaseOrder.step.draft": "\nRevisión",
  "documentWorkspace.purchaseOrder.step.requested": "\nSolicitado",
  "documentWorkspace.purchaseOrder.step.approved": "Aprobado",
  "documentWorkspace.purchaseOrder.step.sent": "\nEnviado",
  "documentWorkspace.purchaseOrder.step.partiallyReceived": "\nRecibido parcialmente",
  "documentWorkspace.purchaseOrder.step.received": "\nRecibido",
  "documentWorkspace.purchaseOrder.step.billed": "\nFacturado",
  "documentWorkspace.purchaseOrder.step.closed": "\nCerrado",
  "documentWorkspace.purchaseOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.purchaseOrder.notFound": "\nNo se encontró la orden de compra.",
  "documentWorkspace.customerOrder.heading": "\nPedidos de clientes",
  "documentWorkspace.customerOrder.description":
    "\nCompromisos comerciales, aprobaciones, cumplimiento y conversión de RFQ.",
  "documentWorkspace.customerOrder.empty": "\nAún no hay pedidos de clientes disponibles.",
  "documentWorkspace.customerOrder.timelineEmpty":
    "\nAún no hay ningún historial de pedidos de clientes disponible.",
  "documentWorkspace.customerOrder.timelineFallback":
    "\nCiclo de vida del pedido del cliente actualizado.",
  "documentWorkspace.customerOrder.metric.approvalQueue": "\nCola de aprobación",
  "documentWorkspace.customerOrder.metric.inFulfilment": "\nEn cumplimiento",
  "documentWorkspace.customerOrder.filter.approval": "\nPendiente de aprobación",
  "documentWorkspace.customerOrder.filter.confirmed": "\nConfirmado",
  "documentWorkspace.customerOrder.filter.fulfilment": "\nEn cumplimiento",
  "documentWorkspace.customerOrder.step.draft": "\nRevisión",
  "documentWorkspace.customerOrder.step.pendingApproval": "\nPendiente de aprobación",
  "documentWorkspace.customerOrder.step.approved": "Aprobado",
  "documentWorkspace.customerOrder.step.confirmed": "\nConfirmado",
  "documentWorkspace.customerOrder.step.inFulfilment": "\nEn cumplimiento",
  "documentWorkspace.customerOrder.step.completed": "\nCompletado",
  "documentWorkspace.customerOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.customerOrder.secondaryFallback": "\nCuenta directa",
  "documentWorkspace.customerOrder.notFound": "\nNo se encontró el pedido del cliente.",
  "documentWorkspace.invoice.heading": "\nFacturas",
  "documentWorkspace.invoice.description":
    "\nSeguimiento operativo de AR, cobros y antigüedad de facturas antes de la exportación contable.",
  "documentWorkspace.invoice.empty": "\nAún no hay facturas disponibles.",
  "documentWorkspace.invoice.timelineEmpty":
    "\nAún no hay ningún historial de facturas disponible.",
  "documentWorkspace.invoice.timelineFallback": "\nCiclo de vida de la factura actualizado.",
  "documentWorkspace.invoice.metric.openExposure": "\nExposición abierta",
  "documentWorkspace.invoice.metric.paid": "\nPagado",
  "documentWorkspace.invoice.metric.draft": "\nRevisión",
  "documentWorkspace.invoice.filter.issued": "\nEmitido",
  "documentWorkspace.invoice.filter.partiallyPaid": "\nPagado parcialmente",
  "documentWorkspace.invoice.filter.paid": "\nPagado",
  "documentWorkspace.invoice.step.draft": "\nRevisión",
  "documentWorkspace.invoice.step.issued": "\nEmitido",
  "documentWorkspace.invoice.step.partiallyPaid": "\nPagado parcialmente",
  "documentWorkspace.invoice.step.paid": "\nPagado",
  "documentWorkspace.invoice.step.void": "\nVacío",
  "documentWorkspace.invoice.step.writtenOff": "\nCancelado",
  "documentWorkspace.invoice.notFound": "\nNo se encontró la factura.",
  "portal.title": "\nPortal de socios",
  "portal.logoLabel": "\nPortal",
  "portal.authenticatedWorkspace": "\nEspacio de trabajo autenticado",
  "portal.sidebar.title": "\nAcceso a documentos compartidos",
  "portal.sidebar.description":
    "\nPedidos, trabajos, facturas y adquisiciones en el ámbito de la membresía de su organización.",
  "portal.nav.overview": "\nDescripción general",
  "portal.nav.orders": "\nÓrdenes",
  "portal.nav.workOrders": "\nÓrdenes de trabajo",
  "portal.nav.invoices": "\nFacturas",
  "portal.nav.purchaseOrders": "\nÓrdenes de compra",
  "portal.summary.eyebrow": "\nEspacio de trabajo de socio",
  "portal.summary.totalLabel": "total",
  "portal.summary.title": "\nInstantánea comercial compartida",
  "portal.summary.description":
    "\nVisibilidad actual de pedidos, trabajos, facturas y adquisiciones para el alcance de la organización autenticada.",
  "portal.summary.actionHubTitle": "\nLínea de acción prioritaria",
  "portal.summary.actionHubDescription":
    "\nMantenga visibles el próximo movimiento de documentos, el flujo de trabajo responsable y el seguimiento de cara a los socios desde la descripción general del portal.",
  "portal.summary.activityTitle": "\nActividad reciente del socio",
  "portal.summary.activityDescription":
    "\nRealice un seguimiento de los últimos movimientos de pedidos de clientes, órdenes de trabajo, facturas y adquisiciones desde un solo lugar.",
  "portal.summary.activityFallback": "\nAún no se ha registrado ninguna actividad de socios.",
  "portal.summary.exceptionTitle": "\nVigilancia de excepción",
  "portal.summary.exceptionDescription":
    "\nObserve los elementos que aún necesitan reconocimiento, respuesta o derivación por parte del equipo de socios.",
  "portal.summary.exceptionFallbackTitle":
    "\nNinguna excepción activa necesita seguimiento en este momento.",
  "portal.summary.exceptionFallbackDescription":
    "\nContinuar monitoreando los espacios de trabajo de documentos para detectar nuevas aprobaciones, disputas y bloqueadores de cumplimiento.",
  "portal.summary.exceptionItem": "Documento: {document}: {status}",
  "portal.summary.exceptionItemDescription": "Título: {title} – {date}",
  "portal.summary.nextOrders": "\nEspacio de trabajo de pedidos abiertos",
  "portal.summary.ordersDescription": "Ver y gestionar pedidos de clientes.",
  "portal.summary.workOrdersDescription":
    "Realizar seguimiento del progreso y cumplimiento de órdenes de trabajo.",
  "portal.summary.invoicesDescription": "Revisar facturas pendientes y pagadas.",
  "portal.summary.purchaseOrdersDescription": "Gestionar pedidos de compra con proveedores.",
  "portal.summary.nextWorkOrders": "\nAbrir espacio de trabajo de órdenes de trabajo",
  "portal.summary.nextInvoices": "\nAbrir espacio de trabajo de facturas",
  "portal.summary.nextPurchaseOrders": "\nAbrir espacio de trabajo de órdenes de compra",
  "portal.page.orders": "\nÓrdenes del portal",
  "portal.page.workOrders": "\nÓrdenes de trabajo del portal",
  "portal.page.invoices": "\nPortal Facturas",
  "portal.page.purchaseOrders": "Órdenes de compra del portal",
  "portal.documentList.sectionTitle": "Documentos",
  "portal.documentList.tableCaption": "Lista de documentos",
  "portal.documentList.col.id": "ID",
  "portal.documentList.col.document": "Documento",
  "portal.documentList.col.status": "Estado",
  "portal.documentList.col.value": "Valor",
  "portal.documentList.col.date": "Fecha",
  "portal.documentList.col.amount": "Importe",
  "portal.documentList.col.actions": "Acciones",
  "portal.documentList.viewAction": "Ver",
  "portal.documentList.filtersLabel": "Filtrar por estado",
  "portal.documentList.loading": "Cargando documentos…",
  "portal.documentList.empty.title": "Sin documentos",
  "portal.documentList.empty.cta": "Crear documento",
  "portal.documentList.error.description": "No se han podido cargar los documentos.",
  "portal.documentList.searchPlaceholder": "Buscar documentos…",
  "portal.documentList.searchLabel": "Buscar documentos",
  "portal.documentList.resultCount": "{count} documentos",
  "portal.documentList.paginationInfo": "Página {page} de {totalPages} ({totalCount} totales)",
  "portal.documentDetail.loading": "Cargando documento…",
  "portal.documentDetail.overviewTitle": "Resumen",
  "portal.documentDetail.lineItemsTitle": "Posiciones",
  "portal.documentDetail.timelineTitle": "Cronología de actividad",
  "portal.documentDetail.actionsTitle": "Acciones disponibles",
  "portal.documentDetail.downloadInvoice": "Descargar factura",
  "portal.documentDetail.contactSupport": "Contactar con soporte",
  "portal.documentDetail.payInvoice": "Pagar factura",
  "portal.documentDetail.empty.title": "Documento no encontrado",
  "portal.documentDetail.empty.description": "No se ha encontrado el documento solicitado.",
  "portal.documentDetail.empty.fields": "No hay detalles disponibles.",
  "portal.documentDetail.empty.lineItems": "Sin posiciones.",
  "portal.documentDetail.empty.timeline": "Sin actividad registrada.",
  "portal.documentDetail.error.description": "No se ha podido cargar el documento.",
  "portal.documentDetail.relatedLinksTitle": "Enlaces relacionados",
  "portal.documentDetail.delete.title": "Eliminar documento",
  "portal.documentDetail.delete.description":
    '¿Está seguro de que desea eliminar "{title}"? Esta acción no se puede deshacer.',
  "portal.chat.contextTitle": "\nCarril de propiedad del servicio",
  "portal.chat.contextDescription":
    "\nMantenga visibles el propietario actual, los registros comerciales vinculados y la ruta de derivación mientras el hilo del socio esté activo.",
  "portal.chat.ownerLabel": "\nPropietario actual",
  "portal.chat.ownerFallback": "\nAsignar un socio propietario",
  "portal.chat.latestFallback": "\nAún no se ha registrado ninguna actualización del hilo.",
  "portal.chat.checklistOwnerTitle": "\nCapture al propietario responsable",
  "portal.chat.checklistOwnerDescription":
    "\nIndique quién es el propietario de la siguiente respuesta o paso de cumplimiento antes de que el hilo cambie de manos.",
  "portal.chat.checklistSlaTitle": "\nEstablecer la ventana de respuesta",
  "portal.chat.checklistSlaDescription":
    "\nConfirme el tiempo en el hilo siempre que se bloquee la entrega, la facturación o la evidencia del servicio.",
  "portal.chat.checklistEscalationTitle": "\nEscalar con registros vinculados",
  "portal.chat.checklistEscalationDescription":
    "\nAbra el documento relacionado o el espacio de trabajo para miembros cuando la conversación necesite un seguimiento operativo.",
  "portal.chat.openLinkedAction": "\nAbrir registro vinculado",
  "portal.chat.composeDescription":
    "\nUtilice el hilo del socio para capturar la propiedad, el tiempo de respuesta y cualquier paso comercial bloqueado.",
  "portal.chat.composeHint":
    "\nMantenga visibles el siguiente propietario y la ventana de respuesta prometida en cada respuesta.",
  "portal.chat.aiActionsDescription":
    "\nUtilice acciones .bao para resumir el hilo del socio antes de pasar al seguimiento de pedidos, trabajos o facturas.",
  "deviceHistory.exportCsv": "\nExportar CSV",
  "customisation.chatBubbleToggle": "\nBurbuja de chat .bao",
  "customisation.chatBubbleDescription": "\nMostrar la burbuja de chat .bao",
  "apiExplorer.searchRoutes": "\nBuscar rutas...",
  "apiExplorer.tryIt": "\nPruébalo",
  "apiExplorer.response": "\nRespuesta",
  "apiExplorer.errorPrefix": "\nError:",
  "transfer.title": "\nTransferir activo",
  "transfer.subtitle": "\nMover este activo a un sitio o instalación diferente",
  "transfer.form.destination": "\nSitio de destino",
  "transfer.form.destinationPlaceholder": "\nSelecciona destino",
  "transfer.form.reason": "\nMotivo de la transferencia",
  "transfer.form.reasonPlaceholder": "\nIngrese el motivo de la transferencia",
  "transfer.form.notes": "\nNotas adicionales",
  "transfer.form.notesPlaceholder": "\nNotas opcionales sobre esta transferencia",
  "transfer.form.submit": "\nConfirmar transferencia",
  "transfer.form.cancel": "\nCancelar",
  "transfer.validation.sameLocation": "\nEl destino no puede ser el mismo que la ubicación actual",
  "transfer.validation.assetNotFound": "\nActivo no encontrado",
  "transfer.validation.siteNotFound": "\nSitio de destino no encontrado",
  "transfer.validation.destinationRequired": "\nSe requiere el sitio de destino",
  "transfer.feedback.success": "\nActivo transferido exitosamente",
  "transfer.feedback.error": "\nNo se pudo transferir el activo",
  "transfer.history.title": "\nHistorial de transferencias",
  "transfer.history.empty": "\nNo hay historial de transferencias para este activo",
  "transfer.history.from": "\nDe",
  "transfer.history.to": "\nPara",
  "transfer.history.date": "\nFecha",
  "transfer.history.initiatedBy": "\nIniciado por",
  "transfer.history.reason": "\nRazón",
  "transfer.history.notes": "\nNotas",
  "transfer.modal.title": "\nTransferir activo",
  "transfer.modal.description": "\nSeleccione el sitio de destino para transferir este activo a",
  "transfer.modal.confirm": "\nTransferir",
  "transfer.action": "\nTransferir",
  "ucp.checkout.notFound": "No se encontro la sesion de checkout.",
  "ucp.order.notFound": "\nNo se encontró el pedido.",
  "ucp.checkout.error.currency":
    "\nLa moneda {currency} no es compatible con esta selección de catálogo.",
  "ucp.checkout.error.itemUnavailable":
    "\nUno o más artículos del catálogo seleccionados no están disponibles.",
  "ucp.checkout.error.empty":
    "\nAgregue al menos un artículo del catálogo antes de completar el pago.",
  "ucp.checkout.error.paymentHandler":
    "Seleccione un instrumento de pago admitido antes de completar el pago.",
  "ucp.checkout.error.terminal": "\nEsta sesión de pago ya no se puede cambiar.",
  "ucp.checkout.error.idMismatch": "\nEl ID de pago no coincide.",
  "ucp.checkout.ai.single":
    "\n{title}: {summary} Total {total} {currency}. Revise los detalles del comprador y luego complete el proceso de pago para crear el pedido operativo.",
  "ucp.checkout.ai.multi":
    "\n{count} paquetes operativos seleccionados: {titles}. Total {total} {currency}. Confirme la alineación del alcance y luego complete el pago para crear el pedido.",
  "ucp.checkout.completed": "Checkout completado. El pedido {orderNumber} ya esta confirmado.",
  "ucp.checkout.canceled": "\nPago cancelado.",
  "ucp.reference.service.title": "\n{merchantName} servicio de compras",
  "ucp.reference.checkout.specTitle": "\nCapacidad de pago de compras",
  "ucp.reference.checkout.schemaTitle": "\nEsquema de capacidad de pago de compras",
  "ucp.reference.order.specTitle": "\nCapacidad de orden de compra",
  "ucp.reference.order.schemaTitle": "\nEsquema de capacidad de orden de compra",
  "ucp.reference.fulfillment.specTitle": "\nCapacidad de cumplimiento de compras",
  "ucp.reference.fulfillment.schemaTitle": "\nEsquema de capacidad de cumplimiento de compras",
  "ucp.reference.buyerConsent.specTitle": "\nCapacidad de consentimiento del comprador de compras",
  "ucp.reference.buyerConsent.schemaTitle":
    "\nEsquema de capacidad de consentimiento del comprador de compras",
  "ucp.reference.paymentHandler.specTitle":
    "\nEspecificación del controlador de pagos del comerciante",
  "ucp.reference.paymentHandler.configSchemaTitle":
    "\nEsquema de configuración del controlador de pagos del comerciante",
  "ucp.reference.paymentHandler.instrumentSchemaTitle":
    "\nEsquema del instrumento de pago con tarjeta",
  "nav.chat": "\nChat",
  "nav.automations": "\nAutomatizaciones",
  "chat.title": "\nChat de equipo",
  "chat.subtitle":
    "\nHilos de colaboración compartidos entre operaciones, portales y transferencias de IA",
  "chat.workspace.eyebrow": "\nOperaciones colaborativas",
  "chat.workspace.internalTitle": "\nColaboración en operaciones",
  "chat.workspace.internalDescription":
    "\nHilos de sala interna para operadores, analistas y flujos de trabajo .bao.",
  "chat.workspace.portalTitle": "\nColaboración de socios",
  "chat.workspace.portalDescription":
    "\nHilos de conversación seguros en el portal para coordinación de entrega, contexto de documentos y transferencia asistida por .bao.",
  "chat.workspace.publicTitle": "\nSesiones de asistente público",
  "chat.workspace.publicDescription":
    "\nSesiones de admisión públicas basadas en .bao que pueden escalar a portales o flujos de trabajo de operaciones.",
  "chat.workspace.threadListTitle": "\nTemas",
  "chat.workspace.threadListDescription":
    "\nCada hilo persiste para que las acciones .bao, las transferencias y el contexto de entrega permanezcan adjuntos al mismo historial de entidad.",
  "chat.workspace.composeTitle": "\nEnviar actualización",
  "chat.workspace.composeDescription":
    "\nLos mensajes se almacenan como eventos de colaboración de primera clase para que la automatización, los informes y las acciones .bao puedan hacer referencia al mismo hilo.",
  "chat.workspace.messageLabel": "\nMensaje",
  "chat.workspace.messagePlaceholder":
    "\nEscriba una actualización, solicitud o nota de derivación del equipo",
  "chat.workspace.composeHint":
    "\nUtilice la burbuja .bao compartida para recibir indicaciones guiadas; utilice este formulario para actualizaciones duraderas de subprocesos.",
  "chat.workspace.sendAction": "\nEnviar mensaje",
  "chat.workspace.askAiAction": "\nPregúntale a .bao en el hilo",
  "chat.workspace.summarizeThreadAction": "Resumir hilo",
  "chat.workspace.automationRunAction": "\nEjecución de automatización de cola",
  "chat.workspace.reportPackBuildAction": "\nCrear paquete de informes",
  "chat.workspace.reportPackCompareAction": "\nComparar versiones del paquete",
  "chat.workspace.convertTaskAction": "\nConvertir a tarea",
  "chat.workspace.convertReportAction": "\nConvertir a informe",
  "chat.workspace.mlAnalysisAction": "\nSolicitar análisis de ML",
  "chat.workspace.publicHandoffAction": "\nCrear nota de transferencia",
  "chat.workspace.aiActionsTitle": "\nAcciones del asistente",
  "chat.workspace.aiActionsDescription":
    "\nConservar las respuestas del asistente, los resúmenes y las acciones del plano de control en el mismo historial del hilo.",
  "chat.workspace.aiDefaultPrompt":
    "\nRevise el hilo actual y ayude con la siguiente acción del operador.",
  "chat.workspace.emptyThread":
    "\nSeleccione una conversación para revisar su historial de mensajes.",
  "chat.workspace.noThreadsTitle": "\nAún no hay hilos de colaboración activos.",
  "chat.workspace.noThreadsDescription":
    "\nCree o dirija una conversación a esta superficie antes de usar el historial de conversaciones compartidas y las acciones del asistente.",
  "chat.workspace.composeUnavailableTitle":
    "\nSeleccione un hilo antes de publicar o ejecutar acciones del asistente.",
  "chat.workspace.composeUnavailableDescription":
    "\nLos mensajes de hilo, los resúmenes, las ejecuciones de automatización y las notas de transferencia persisten en una conversación activa.",
  "chat.workspace.surfaceInternal": "\nInterno",
  "chat.workspace.surfacePortal": "\nPortal",
  "chat.workspace.surfacePublic": "\nPúblico",
  "chat.workspace.threadCount": "\n{count} hilos",
  "chat.workspace.typeChannel": "\nCanal",
  "chat.workspace.typeDirectMessage": "\nMensaje directo",
  "chat.workspace.typeEntityThread": "\nHilo de entidad",
  "chat.workspace.typePartyThread": "\nHilo de socio",
  "chat.workspace.typePublicAssistant": "\nAsistente de sesión",
  "chat.workspace.participantsTitle": "\nParticipantes",
  "chat.workspace.participantsDescription":
    "\nQuién está activo en esta conversación y puede ser etiquetado en mensajes nuevos.",
  "chat.workspace.noParticipants": "\nAún no hay participantes adjuntos a esta conversación.",
  "chat.workspace.featuresTitle": "\nCaracterísticas del hilo",
  "chat.workspace.featuresDescription":
    "\nEl tipo de conversación, los registros vinculados, el volumen de mensajes y la preparación de la IA permanecen visibles junto al hilo.",
  "chat.workspace.linkedRecordsTitle": "\nRegistros vinculados",
  "chat.workspace.linkedRecordsDescription":
    "\nLos registros comerciales y operativos adjuntos a esta conversación permanecen visibles en el mismo espacio de trabajo.",
  "chat.workspace.noLinkedRecords":
    "\nAún no hay registros vinculados adjuntos a esta conversación.",
  "chat.workspace.tagPeopleTitle": "\nEtiquetar personas y AI",
  "chat.workspace.tagPeopleDescription":
    "\nLos participantes seleccionados se almacenan con el mensaje para que las transferencias y el trabajo de seguimiento mantengan el mismo contexto.",
  "chat.workspace.tagParticipantAria": "\nEtiqueta {participant} en este mensaje",
  "chat.workspace.noTagTargets":
    "\nAún no hay objetivos de etiquetas disponibles para esta conversación.",
  "chat.workspace.participantCount": "\n{count} participantes",
  "chat.workspace.messageCount": "\n{count} mensajes",
  "chat.workspace.linkedRecordCount": "\n{count} registros vinculados",
  "chat.workspace.participantMetricLabel": "\nParticipantes",
  "chat.workspace.messageMetricLabel": "\nMensajes",
  "chat.workspace.linkedRecordMetricLabel": "\nVinculado",
  "chat.workspace.slaQueueTitle": "\nCola SLA",
  "chat.workspace.slaQueueDescription":
    "\nHilos no leídos o recién actualizados que necesitan un seguimiento cronometrado o una decisión de derivación.",
  "chat.workspace.ownerQueueTitle": "\nPostura del propietario",
  "chat.workspace.ownerQueueDescription":
    "\nMantenga visible el conjunto de participantes activos y la profundidad del mensaje antes de asignar el siguiente propietario.",
  "chat.workspace.triageModesTitle": "\nModos de clasificación",
  "chat.workspace.triageModesDescription":
    "Pase de la revisión del hilo a la conversión de tareas, informes o seguimiento del propietario sin perder el contexto de la conversación.",
  "chat.workspace.aiEnabled": "\nIA lista",
  "chat.workspace.aiDisabled": "\nIA apagada",
  "chat.workspace.participantAudienceAi": "IA",
  "chat.workspace.participantAudienceOperator": "\nOperador",
  "chat.workspace.participantAudiencePartner": "\nSocio",
  "chat.workspace.participantAudiencePublic": "\nPúblico",
  "chat.workspace.participantRoleOwner": "\nPropietario",
  "chat.workspace.participantRoleMember": "\nMiembro",
  "chat.workspace.participantRoleObserver": "\nObservador",
  "chat.workspace.participantRoleAssistant": "\nAsistente",
  "chat.workspace.viewerParticipant": "\nTu",
  "chat.validation.messageRequired": "\nEl contenido del mensaje es obligatorio.",
  "chat.validation.conversationNotFound": "\nNo se encontró la conversación.",
  "chat.validation.mentionNotFound":
    "\nNo se pudieron resolver uno o más participantes etiquetados.",
  "chat.assistant.action.automationRunCreated":
    "\nEjecución de automatización en cola para {title}. Estado actual: {status}.",
  "chat.assistant.action.reportPackBuilt":
    "\nCreó una nueva versión del paquete de informes para {title}. ID de versión activa: {versionId}.",
  "chat.assistant.action.publicHandoffStarted":
    "\nSe inició la transferencia pública para {title}. Hilo de escalada interno: {threadId}.",
  "chat.assistant.action.publicHandoffAutomationQueued":
    "\nLa automatización en cola ejecuta {runId} para enrutar la escalada.",
  "chat.assistant.action.mlRunRequested":
    "\nEjecución del análisis de ML en cola {runId}. Estado actual: {status}.",
  "chat.assistant.handoff.threadTitle": "\nTraspaso público: {title}",
  "chat.assistant.handoff.threadDescription":
    "\nHilo de escalada interno creado a partir de una sesión de asistente público.",
  "chat.assistant.handoff.seedMessage":
    "\nEl asistente público intensificó {title}. Último contexto: {summary}",
  "chat.assistant.handoff.runNotes":
    "\nTraspaso público para {title}. ID de conversación de origen: {conversationId}.",
  "chat.seed.actors.ai": "IA",
  "chat.seed.actors.operator": "\nOperador",
  "chat.seed.actors.partner": "\nSocio",
  "chat.seed.internal.operationsTitle": "\nClasificación de preparación para operaciones",
  "chat.seed.internal.operationsDescription":
    "\nActualizaciones de preparación multifuncional que vinculan activos, paquetes y escalamientos.",
  "chat.seed.internal.operationsPreview":
    "\nAI marcó dos deltas de preparación y sugirió actualizar el paquete del tablero antes de la sesión informativa de las 18:00.",
  "chat.seed.internal.operationsAiMessage":
    "\nEncontré dos deltas de preparación que afectan el paquete de placa actual. Actualizar el paquete operativo antes de la próxima sesión informativa.",
  "chat.seed.internal.operationsUserMessage":
    "\nEscale los deltas al paquete activo y notifique al líder del patrimonio si el pronóstico de utilización vuelve a caer.",
  "chat.seed.internal.estateLead": "\nLíder inmobiliario",
  "chat.seed.internal.operationsAnchorPack": "\nPaquete de operaciones v3",
  "chat.seed.internal.operationsAnchorEstate": "\nPreparación del patrimonio",
  "chat.seed.internal.reportsTitle": "\nInforme de reseñas de paquetes",
  "chat.seed.internal.reportsDescription":
    "\nComentarios encadenados para informes guardados, revisiones de paquetes y comparaciones cronológicas.",
  "chat.seed.internal.reportsPreview":
    "\nEl paquete de placa v3 está listo para su revisión con contexto de anomalía actualizado y notas de exposición comercial.",
  "chat.seed.portal.fulfilmentTitle": "\nTraspaso de cumplimiento del socio",
  "chat.seed.portal.fulfilmentDescription":
    "\nHilo visible en el portal para confirmar el alcance del trabajo, el estado del documento y los borradores de respuesta asistidos por IA.",
  "chat.seed.portal.fulfilmentPreview":
    "\nEl operador AI redactó un resumen de transferencia para el último hito de la orden de trabajo y la retención de facturas.",
  "chat.seed.portal.fulfilmentMessage":
    "Confirme el hito de la orden de trabajo revisada y háganos saber si ahora se puede borrar la retención de la factura.",
  "chat.seed.portal.operatorLabel": "\nCoordinador de operaciones",
  "chat.seed.portal.anchorLabel": "\nHito de la orden de trabajo del socio",
  "chat.seed.public.assistantTitle": "\nAsistente de admisión de RFQ",
  "chat.seed.public.assistantDescription":
    "\nHilo público de admisión de IA vinculado a preguntas de compradores y contexto de RFQ.",
  "chat.seed.public.assistantPreview":
    "\nEl asistente capturó los requisitos del comprador, aclaró los tiempos de entrega y preparó una ruta de escalamiento.",
  "chat.seed.public.assistantMessage":
    "\nPuedo recopilar sus requisitos, resumir el alcance y derivarlo a un operador cuando sea necesaria una revisión comercial.",
  "chat.seed.public.buyerLabel": "\nComprador",
  "chat.seed.public.anchorLabel": "\nEntrada de RFQ",
  "controlPlane.validation.definitionNotFound": "\nNo se encontró la definición de automatización.",
  "controlPlane.validation.definitionRequired": "\nSe requiere definición de automatización.",
  "controlPlane.validation.definitionTitleRequired":
    "\nSe requiere título de definición de automatización.",
  "controlPlane.validation.definitionStatusInvalid":
    "\nLa transición de estado solicitada no es válida.",
  "controlPlane.validation.automationActivationRequiresTrigger":
    "\nAgregue al menos un activador antes de activar esta definición de automatización.",
  "controlPlane.validation.automationActivationRequiresSteps":
    "\nAgregue al menos un paso antes de activar esta definición de automatización.",
  "controlPlane.validation.automationActivationRequiresSchedule":
    "\nLas definiciones de automatización programadas necesitan al menos una programación antes de la activación.",
  "controlPlane.validation.automationTriggerNameRequired":
    "\nEl nombre del activador de automatización es obligatorio.",
  "controlPlane.validation.automationStepNameRequired":
    "\nEl nombre del paso de automatización es obligatorio.",
  "controlPlane.validation.automationScheduleRuleRequired":
    "\nSe requiere regla de programación de automatización.",
  "controlPlane.validation.automationScheduleTimezoneRequired":
    "\nSe requiere la zona horaria del programa de automatización.",
  "controlPlane.validation.automationScheduleTimestampInvalid":
    "\nLas marcas de tiempo del programa de automatización deben ser valores de fecha y hora válidos.",
  "controlPlane.validation.automationArtifactTitleRequired":
    "\nSe requiere el título del artefacto de automatización.",
  "controlPlane.validation.automationRunNotFound":
    "\nNo se encontró la ejecución de automatización.",
  "controlPlane.validation.automationRunTransitionInvalid":
    "\nLa transición de ejecución de automatización solicitada no es válida.",
  "controlPlane.validation.automationRunDefinitionRequired":
    "\nEsta ejecución de automatización no está vinculada a una definición reutilizable.",
  "controlPlane.validation.automationRunRetryInvalid":
    "\nSólo se pueden reintentar las ejecuciones de automatización fallidas o canceladas.",
  "controlPlane.definition.created": '\nDefinición de automatización "{title}" creada.',
  "controlPlane.definition.statusUpdated": "\nEstado actualizado a {status}.",
  "controlPlane.validation.reportPackNotFound": "\nNo se encontró el paquete de informes.",
  "controlPlane.validation.reportPackCompareRequiresVersions":
    "\nSe requieren al menos dos versiones del paquete de informes antes de realizar la comparación.",
  "controlPlane.validation.mlExperimentNotFound": "\nNo se encontró el experimento ML.",
  "controlPlane.validation.modelVersionNotFound": "\nNo se encontró la versión del modelo.",
  "controlPlane.validation.mlRequestTargetRequired":
    "\nSeleccione un experimento de ML o una versión de modelo antes de solicitar el análisis.",
  "controlPlane.reportPack.compareSummary":
    "\nComparó las últimas versiones del paquete de informes para {title}. Versión más reciente: {newerVersionId}. Versión anterior: {olderVersionId}.",
  "controlPlane.seed.automation.packRefreshTitle": "\nActualización del paquete estratégico",
  "controlPlane.seed.automation.packRefreshDescription":
    "Reconstruya el paquete de tablero activo, publique los deltas de cronología más recientes y notifique el hilo de revisión.",
  "controlPlane.seed.automation.packRefreshArtifactBoardPackTitle": "\nPaquete de tablero v3",
  "controlPlane.seed.automation.packRefreshArtifactInputSnapshotTitle":
    "\nInstantánea de entrada ejecutiva",
  "controlPlane.seed.automation.packRefreshArtifactDraftTitle": "\nBorrador del paquete de tablero",
  "controlPlane.seed.automation.portalHandoffTitle": "\nTraspaso de cumplimiento del portal",
  "controlPlane.seed.automation.portalHandoffDescription":
    "\nCree un resumen visible para los socios cuando cambien los hitos de la orden de trabajo, la factura o la entrega.",
  "controlPlane.seed.automation.portalHandoffArtifactMemoTitle":
    "\nMemo de transferencia del portal",
  "controlPlane.seed.automation.portalHandoffArtifactNoteTitle":
    "\nNota de transferencia del portal de socios",
  "controlPlane.seed.datasets.estateTitle": "\nConjunto de datos de postura patrimonial",
  "controlPlane.seed.datasets.estateDescription":
    "\nMétricas de postura en todos los espacios de trabajo para preparación, utilización y riesgo de intervención.",
  "controlPlane.seed.datasets.orderTitle": "\nConjunto de datos de flujo de pedidos",
  "controlPlane.seed.datasets.orderDescription":
    "\nMétricas del cronograma comercial que cubren RFQ, pedidos de clientes, órdenes de trabajo y facturas.",
  "controlPlane.seed.packs.boardTitle": "\nPaquete de tablero",
  "controlPlane.seed.packs.boardDescription":
    "\nPaquete de decisiones estratégicas con cronología, postura y contexto de riesgo comercial.",
  "controlPlane.seed.packs.operationsTitle": "\nPaquete de operaciones",
  "controlPlane.seed.packs.operationsDescription":
    "\nPaquete de campo operativo con deltas de utilización, preparación y ejecución del trabajo.",
  "controlPlane.seed.ml.demandForecastTitle": "\nExperimento de previsión de demanda",
  "controlPlane.seed.ml.demandForecastObjective":
    "\nPronosticar la demanda comercial y los desencadenantes de anomalías para el próximo horizonte operativo.",
  "controlPlane.seed.models.demandTitle": "\nModelo de previsión de demanda",
  "controlPlane.seed.models.demandDescription":
    "\nEntrada de registro para las versiones de previsión de demanda aprobadas y su postura de implementación.",
  "insurance.seed.policy.generalLiabilityDescription":
    "\nCobertura de responsabilidad general para las operaciones del Sitio de Capacitación Norte.",
  "insurance.seed.policy.propertyDescription":
    "\nCobertura de propiedad para edificios e infraestructura de West Compound.",
  "insurance.seed.policy.cyberDescription":
    "\nCobertura de responsabilidad cibernética para plataforma y patrimonio de IoT.",
  "insurance.seed.coverage.bodilyInjury": "\nLesiones corporales por ocurrencia",
  "insurance.seed.coverage.propertyDamage": "\nDaños a la propiedad por ocurrencia",
  "insurance.seed.coverage.aggregate": "\nAgregado general",
  "insurance.seed.claim.waterDamageDescription":
    "\nDaños por agua en el techo de las instalaciones de entrenamiento después de la tormenta. Reparaciones temporales completadas.",
  "insurance.seed.claim.vehicleDamageDescription":
    "\nDaños menores al vehículo en el área de estacionamiento del complejo. Sin heridos.",
  "reports.expansion.title": "\nPlano de control de automatización y ciencia de datos",
  "reports.expansion.description":
    "\nLos conjuntos de datos, los paquetes de informes, la supervisión del aprendizaje automático y los activadores de automatización permanecen conectados al espacio de trabajo de informes en lugar de fragmentarse en herramientas independientes.",
  "reports.expansion.openChat": "\nAbrir chat",
  "reports.expansion.datasetsTitle": "\nRegistro de conjuntos de datos",
  "reports.expansion.datasetsDescription":
    "\nConjuntos de datos analíticos en vivo y monitoreados que alimentan paquetes, métricas e instantáneas de modelos.",
  "reports.expansion.openDatasets": "\nAbrir sección de conjuntos de datos",
  "reports.expansion.packsTitle": "\nPaquetes de informes",
  "reports.expansion.packsDescription":
    "\nPaquetes de operaciones y tablero versionados con soporte duradero de estado, linaje y cronología.",
  "reports.expansion.openPacks": "\nAbrir sección de paquete activo",
  "reports.expansion.mlTitle": "Plano de control ML",
  "reports.expansion.mlDescription":
    "\nExperimentos, ejecuciones y entradas de registro que exponen el pronóstico y la situación de anomalía junto a la composición del informe.",
  "reports.expansion.openModels": "\nGobernanza abierta de IA",
  "reports.expansion.automationsTitle": "\nRegistro de automatización",
  "reports.expansion.automationsDescription":
    "\nDefiniciones de automatización nativas de Bun que coordinan la actualización de informes, las notificaciones y los flujos de trabajo vinculados al chat.",
  "reports.expansion.openAutomations": "\nEspacio de trabajo de automatizaciones abiertas",
  "automations.title": "\nAutomatizaciones",
  "automations.subtitle":
    "\nDefiniciones, ejecuciones y postura de ejecución desde una superficie de control SSR",
  "automations.workspace.eyebrow": "\nEspacio de trabajo de automatización",
  "automations.workspace.title": "\nPlano de control de automatización dedicado",
  "automations.workspace.description":
    "\nRevise las definiciones de automatización, las ejecuciones recientes, los tipos de desencadenadores y la postura de ejecución sin salir del shell de operaciones.",
  "automations.workspace.definitionTitle": "\nDefiniciones de automatización",
  "automations.workspace.definitionDescription":
    "\nRegistros de definición, modos de activación y sincronización de la siguiente ejecución para el catálogo de automatización actual.",
  "automations.workspace.runTitle": "\nEjecuciones de automatización recientes",
  "automations.workspace.runDescription":
    "\nLas últimas ejecuciones en cola, en ejecución y completadas aparecieron desde el plano de control.",
  "automations.workspace.definitionCount": "\n{count} definiciones",
  "automations.workspace.runCount": "\n{count} ejecuta",
  "automations.workspace.activeDefinitionCount": "\n{count} definiciones activas",
  "automations.workspace.runningRunCount": "\n{count} corriendo carreras",
  "automations.workspace.definitionTrigger": "\nGatillo",
  "automations.workspace.definitionSteps": "\n{count} pasos",
  "automations.workspace.definitionNextRun": "\nPróxima ejecución",
  "automations.workspace.definitionSurface": "\nSuperficie",
  "automations.workspace.definitionState": "\nEstado",
  "automations.workspace.runsEmpty": "\nAún no hay ejecuciones de automatización disponibles.",
  "automations.workspace.definitionsEmpty":
    "\nAún no hay definiciones de automatización disponibles.",
  "automations.workspace.runCreatedAt": "\nCreado",
  "automations.workspace.runCompletedAt": "\nCompletado",
  "automations.workspace.runDefinition": "\nDefinición",
  "automations.workspace.runKind": "\nAmable",
  "automations.workspace.runStatus": "\nEstado",
  "automations.workspace.openReports": "\nInformes abiertos",
  "automations.workspace.openAdmin": "\nGobernanza de administración abierta",
  "automations.workspace.posture.title": "Execution posture",
  "automations.workspace.posture.description":
    "Keep approvals, live runs, and execution pressure visible while you work definitions or review recent activity.",
  "automations.workspace.posture.approvals":
    "{count} definition(s) still require approval coverage before all runs can start cleanly.",
  "automations.workspace.posture.pending":
    "{count} run(s) are waiting for an approval decision before leaving the queue.",
  "automations.workspace.posture.running":
    "{count} run(s) are currently executing across the active automation surface.",
  "automations.workspace.stats.definitions": "\nDefiniciones",
  "automations.workspace.stats.running": "\nCorriendo",
  "automations.workspace.stats.successRate": "\nTasa de éxito",
  "automations.workspace.runDetail.status": "\nEstado",
  "automations.workspace.runDetail.created": "\nCreado",
  "automations.workspace.runDetail.completed": "\nCompletado",
  "automations.workspace.runDetail.definition": "\nDefinición",
  "automations.workspace.runDetail.steps": "\nPasos de ejecución",
  "automations.workspace.runDetail.artifacts": "\nArtefactos",
  "automations.workspace.runDetail.artifactsEmpty": "\nNo se generaron artefactos",
  "automations.workspace.definitionPreview.title": "\nVista previa del flujo de trabajo",
  "automations.workspace.definitionPreview.steps": "\nPasos",
  "automations.workspace.definitionPreview.description":
    "\nInspeccione la secuencia de flujo de trabajo seleccionada, la postura del programa y los artefactos más recientes.",
  "automations.workspace.definitionPreview.empty":
    "\nElija una definición para inspeccionar su flujo de trabajo y los artefactos de automatización más recientes.",
  "automations.workspace.definitionPreview.guideFlow":
    "Inspect the current workflow sequence before moving the automation into downstream review or incident response.",
  "automations.workspace.definitionPreview.guideSchedule":
    "Keep the next run window and timezone visible while reviewing trigger cadence and operating coverage.",
  "automations.workspace.definitionPreview.guideArtifacts":
    "Use the latest artifacts to confirm the workflow is still producing the expected operational output.",
  "automations.workspace.definitionPreview.timezone": "\nZona horaria",
  "automations.workspace.filters.definitionStatus":
    "\nFiltrar definiciones de automatización por estado",
  "automations.workspace.filters.runStatus": "\nLa automatización del filtro se ejecuta por estado",
  "automations.workspace.filters.definitionScope":
    "\nLa automatización del filtro se ejecuta por definición",
  "automations.workspace.filters.allStatuses": "\nTodos los estados",
  "automations.workspace.filters.allDefinitions": "\nTodas las definiciones",
  "automations.workspace.actions.preview": "\nVista previa del flujo de trabajo",
  "automations.workspace.actions.showRuns": "\nMostrar ejecuciones",
  "automations.workspace.runDetail.notFound":
    "\nNo se pudo encontrar la ejecución de automatización solicitada.",
  "automations.workspace.runDetail.started": "\nIniciado",
  "automations.workspace.runDetail.claimed": "\nReclamado",
  "automations.workspace.runDetail.heartbeat": "\nLatido del corazón",
  "automations.workspace.runDetail.surface": "\nSuperficie",
  "automations.workspace.runDetail.trigger": "\nGatillo",
  "automations.workspace.runDetail.notes": "\nNotas",
  "automations.workspace.manualRun.title": "\nLanzamiento de ejecución manual",
  "automations.workspace.manualRun.description":
    "\nPoner en cola una ejecución de flujo de trabajo en vivo sin salir del espacio de trabajo de automatización.",
  "automations.workspace.manualRun.databaseRequired":
    "\nLos inicios manuales solo están disponibles cuando el plano de control respaldado por la base de datos está configurado.",
  "automations.workspace.manualRun.noActiveDefinitions":
    "\nActualmente no hay definiciones de automatización activas disponibles para el lanzamiento manual.",
  "automations.workspace.manualRun.definitionLabel": "\nDefinición de hacer cola",
  "automations.workspace.manualRun.definitionHint":
    "Solo las definiciones de automatización activas se pueden poner en cola desde este espacio de trabajo.",
  "automations.workspace.manualRun.notesLabel": "\nEjecutar notas",
  "automations.workspace.manualRun.notesHint":
    "\nContexto de operador opcional para adjuntar a la ejecución de automatización en cola.",
  "automations.workspace.manualRun.submit": "\nEjecutar ejecución",
  "automations.workspace.manualRun.created": "\n{title} se puso en cola exitosamente.",
  "automations.workspace.definitionStatus.DRAFT": "\nRevisión",
  "automations.workspace.definitionStatus.ACTIVE": "\nActivo",
  "automations.workspace.definitionStatus.PAUSED": "\nEn pausa",
  "automations.workspace.definitionStatus.ARCHIVED": "\nArchivado",
  "automations.workspace.runStatus.QUEUED": "\nEn cola",
  "automations.workspace.runStatus.RUNNING": "\nCorriendo",
  "automations.workspace.runStatus.SUCCEEDED": "\nTuvo éxito",
  "automations.workspace.runStatus.FAILED": "\nFallido",
  "automations.workspace.runStatus.CANCELED": "\nCancelado",
  "automations.workspace.runKind.REPORT_PACK": "\nPaquete de informes",
  "automations.workspace.runKind.WORKFLOW": "\nFlujo de trabajo",
  "automations.workspace.runKind.EDGE_RUNBOOK": "\nLibro de ejecución de borde",
  "automations.workspace.runKind.DEVICE_COMMAND": "\nComando del dispositivo",
  "automations.workspace.runKind.ML_PIPELINE": "\nCanalización de aprendizaje automático",
  "automations.workspace.runStatus.AWAITING_APPROVAL": "\nEn espera de aprobación",
  "automations.workspace.triggerKind.COMPLETION_OF": "\nFinalización de",
  "automations.workspace.approvalGate.title": "\nPuerta de aprobación",
  "automations.workspace.approvalGate.description":
    "\nEsta automatización requiere aprobación manual antes de que comience la ejecución.",
  "automations.workspace.approvalGate.approve": "\nAprobar ejecución",
  "automations.workspace.approvalGate.reject": "\nRechazar ejecución",
  "automations.workspace.approvalGate.pending": "\nPendiente de aprobación",
  "automations.workspace.approvalGate.approvedBy": "\nAprobado por {name}",
  "automations.workspace.approvalGate.approvedAt": "\nAprobado en",
  "automations.workspace.approvalGate.confirmTitle": "\nConfirmar aprobación",
  "automations.workspace.approvalGate.confirmDescription":
    "\nAl aprobar esta ejecución, pasará al estado EN EJECUCIÓN. Esta acción no se puede deshacer.",
  "automations.workspace.approvalGate.rejectTitle": "\nConfirmar rechazo",
  "automations.workspace.approvalGate.rejectDescription":
    "\nRechazar esta ejecución la cancelará. Esta acción no se puede deshacer.",
  "automations.workspace.approvalGate.requiresApproval": "\nRequiere aprobación",
  "automations.workspace.approvalGate.noApprovalRequired": "\nNo se requiere aprobación",
  "automations.workspace.scheduleEditor.title": "\nEditor de horarios",
  "automations.workspace.scheduleEditor.description":
    "\nConfigure cuándo se ejecuta esta automatización utilizando los selectores de día de la semana, hora y zona horaria.",
  "automations.workspace.scheduleEditor.cronLabel": "\nRegla de recurrencia",
  "automations.workspace.scheduleEditor.timezoneLabel": "\nZona horaria",
  "automations.workspace.scheduleEditor.previewLabel": "\nSiguiente ejecución previa",
  "automations.workspace.scheduleEditor.save": "\nGuardar horario",
  "automations.workspace.scheduleEditor.daysOfWeek": "\nDías de la semana",
  "automations.workspace.scheduleEditor.hourLabel": "\nHora (24h)",
  "automations.workspace.scheduleEditor.minuteLabel": "\nMinuto",
  "automations.workspace.scheduleEditor.monday": "\nLun",
  "automations.workspace.scheduleEditor.tuesday": "\nmartes",
  "automations.workspace.scheduleEditor.wednesday": "\nMié",
  "automations.workspace.scheduleEditor.thursday": "\nJue",
  "automations.workspace.scheduleEditor.friday": "\nVie",
  "automations.workspace.scheduleEditor.saturday": "\nSábado",
  "automations.workspace.scheduleEditor.sunday": "\nsol",
  "automations.workspace.retryPolicy.title": "\nReintentar política",
  "automations.workspace.retryPolicy.description":
    "\nConfigure el comportamiento de reintento automático para ejecuciones de automatización fallidas.",
  "automations.workspace.retryPolicy.maxAttempts": "\nNúmero máximo de intentos de reintento",
  "automations.workspace.retryPolicy.backoffMs": "\nIntervalo de retroceso (ms)",
  "automations.workspace.retryPolicy.retryOnLabel": "\nReintentar en status",
  "automations.workspace.retryPolicy.save": "\nGuardar política de reintento",
  "automations.workspace.retryPolicy.noPolicy":
    "\nNo hay ninguna política de reintento configurada.",
  "automations.workspace.retryPolicy.attempt": "\nReintentar {attempt}",
  "automations.workspace.retryPolicy.parentRun": "\nEjecución principal",
  "automations.workspace.auditTrail.title": "\nPista de auditoría",
  "automations.workspace.auditTrail.description":
    "\nVea quién lanzó ejecuciones de automatización, cuándo se activaron y sus resultados.",
  "automations.workspace.auditTrail.whoRan": "\nSolicitado por",
  "automations.workspace.auditTrail.triggeredBy": "\nGatillo",
  "automations.workspace.auditTrail.definition": "\nDefinición",
  "automations.workspace.auditTrail.outcome": "\nResultado",
  "automations.workspace.auditTrail.timestamp": "\nMarca de tiempo",
  "automations.workspace.auditTrail.empty":
    "\nNo se encontraron entradas de seguimiento de auditoría.",
  "automations.workspace.auditTrail.filterByUser": "\nFiltrar por usuario",
  "automations.workspace.auditTrail.filterByDefinition": "\nFiltrar por definición",
  "automations.workspace.auditTrail.filterByDateRange": "\nFiltrar por rango de fechas",
  "automations.workspace.auditTrail.searchPlaceholder": "\nBuscar pista de auditoría...",
  "automations.workspace.auditTrail.searchAria": "\nBuscar entradas de seguimiento de auditoría",
  "automations.workspace.chainedSequence.title": "\nSecuencia encadenada",
  "automations.workspace.chainedSequence.description":
    "\nEncadene esta automatización para que se active al completar otra definición.",
  "automations.workspace.chainedSequence.upstream": "\nDefinición ascendente",
  "automations.workspace.chainedSequence.downstream": "\nDefiniciones posteriores",
  "automations.workspace.chainedSequence.selectUpstream": "\nSeleccione la definición ascendente",
  "automations.workspace.chainedSequence.save": "\nGuardar cadena",
  "automations.workspace.chainedSequence.noChain": "\nNo hay cadena configurada.",
  "automations.workspace.chainedSequence.chainVisualization": "\nVisualización de cadena",
  "admin.aiSettings.provider.RAMALAMA": "\nRamaLama",
  "admin.aiSettings.provider.OLLAMA": "\nOllama",
  "admin.aiSettings.provider.OPENAI": "\nAbiertoAI",
  "admin.aiSettings.provider.CLAUDE": "\nClaude",
  "admin.aiSettings.provider.HUGGINGFACE": "\nAbrazando la cara",
  "admin.aiSettings.provider.GEMINI": "\nGéminis",
  "documentWorkflow.bar.label": "\nFlujo de trabajo del documento",
  "documentWorkflow.action.submit": "\nTransferencia de portal",
  "documentWorkflow.action.approve": "\nAprobar",
  "documentWorkflow.action.reject": "\nRechazar",
  "documentWorkflow.action.qualify": "\nCalificar",
  "documentWorkflow.action.quote": "\nCita",
  "documentWorkflow.action.accept": "\nAceptar",
  "documentWorkflow.action.decline": "\nRechazar",
  "documentWorkflow.action.confirm": "\nConfirmar",
  "documentWorkflow.action.startFulfilment": "\nIniciar cumplimiento",
  "documentWorkflow.action.complete": "\nCompleto",
  "documentWorkflow.action.schedule": "\nHorario",
  "documentWorkflow.action.startWork": "\nEmpezar a trabajar",
  "documentWorkflow.action.submitReview": "\nEnviar para revisión",
  "documentWorkflow.action.send": "\nEnviar",
  "documentWorkflow.action.close": "\nCerrar",
  "documentWorkflow.action.receiveItems": "\nRecibir artículos",
  "documentWorkflow.action.recordPayment": "\nPago récord",
  "documentWorkflow.action.issue": "\nNúmero",
  "documentWorkflow.action.void": "\nVacío",
  "documentWorkflow.status.draft": "\nRevisión",
  "documentWorkflow.status.submitted": "\nEnviado",
  "documentWorkflow.status.qualified": "\nCalificado",
  "documentWorkflow.status.quoted": "\nCitado",
  "documentWorkflow.status.accepted": "\nAceptado",
  "documentWorkflow.status.declined": "\nRechazado",
  "documentWorkflow.status.pendingApproval": "\nPendiente de aprobación",
  "documentWorkflow.status.approved": "Aprobado",
  "documentWorkflow.status.confirmed": "\nConfirmado",
  "documentWorkflow.status.inFulfilment": "\nEn cumplimiento",
  "documentWorkflow.status.completed": "\nCompletado",
  "documentWorkflow.status.triage": "\nListo para revisión",
  "documentWorkflow.status.scheduled": "\nProgramado",
  "documentWorkflow.status.inProgress": "\nEn progreso",
  "documentWorkflow.status.readyForReview": "\nNo se encontró la orden de trabajo.",
  "documentWorkflow.status.requested": "\nSolicitado",
  "documentWorkflow.status.sent": "\nEnviado",
  "documentWorkflow.status.partiallyReceived": "\nRecibido parcialmente",
  "documentWorkflow.status.received": "\nRecibido",
  "documentWorkflow.status.billed": "\nFacturado",
  "documentWorkflow.status.closed": "\nCerrado",
  "documentWorkflow.status.issued": "\nEmitido",
  "documentWorkflow.status.partiallyPaid": "\nPagado parcialmente",
  "documentWorkflow.status.paid": "\nPagado",
  "documentWorkflow.status.cancelled": "\nCancelado",
  "documentWorkflow.status.void": "\nVacío",
  "documentWorkflow.status.writtenOff": "\nCancelado",
  "documentWorkflow.status.expired": "\nCaducado",
  "nav.mlops": "\nMLOps",
  "mlops.title": "\nMLOps",
  "mlops.subtitle":
    "\nExperimentos en vivo, lanzamientos de modelos, implementaciones y postura de datos ascendentes",
  "mlops.heroEyebrow": "Plano de control ML",
  "mlops.coverage":
    "Realice un seguimiento de la postura del experimento, las ejecuciones en cola, los modelos implementados y las dependencias de datos ascendentes desde un espacio de trabajo renderizado en vivo por el servidor.",
  "mlops.chatContext":
    "\nEspacio de trabajo MLOps. {experiments} experimentos, {runs} ejecuciones activas, {models} entradas de registro e {deployments} implementaciones activas o en etapas.",
  "mlops.stats.experiments": "\nExperimentos",
  "mlops.stats.experimentsDescription":
    "\nDefiniciones de experimentos actualmente rastreadas en el gráfico del plano de control en vivo.",
  "mlops.stats.activeRuns": "\nEjecuciones activas",
  "mlops.stats.activeRunsDescription":
    "\nLas ejecuciones de automatización y aprendizaje automático están actualmente en cola o ejecutándose en todo el proceso.",
  "mlops.stats.failedRuns": "\nEjecuciones fallidas",
  "mlops.stats.failedRunsDescription":
    "\nEjecuciones que actualmente necesitan investigación antes de continuar con la promoción del modelo.",
  "mlops.stats.models": "\nEntradas de registro",
  "mlops.stats.modelsDescription":
    "\nRegistros modelo que están disponibles para evaluación, preparación o publicación.",
  "mlops.stats.deployments": "\nImplementaciones en vivo",
  "mlops.stats.deploymentsDescription":
    "\nImplementaciones actualmente en etapa de preparación o activas en la ruta de entrega del modelo.",
  "mlops.stats.dataSources": "\nFuentes ascendentes",
  "mlops.stats.dataSourcesDescription":
    "\nConjuntos de datos y paquetes de informes que alimentan la superficie de revisión actual de MLOps.",
  "mlops.actions.eyebrow": "\nFlujos de trabajo conectados",
  "mlops.actions.title": "\nPasar de la postura del modelo a la acción",
  "mlops.actions.description":
    "\nAbra los espacios de trabajo conectados que ya poseen informes, automatización e investigación asistida por IA para este plano de control.",
  "mlops.action.reports":
    "\nInspeccionar conjuntos de datos, paquetes de informes y análisis posteriores vinculados al ciclo de vida del modelo actual.",
  "mlops.action.automations":
    "\nRevise las ejecuciones de automatización en cola y las definiciones de flujo de trabajo que respaldan la promoción de implementación.",
  "mlops.action.chat":
    "\nAbra el espacio de trabajo compartido de IA para investigar anomalías, resumir la postura y planificar la siguiente acción.",
  "mlops.manualRun.title": "\nIniciar ejecución manual",
  "mlops.manualRun.description":
    "\nPonga en cola un ML manual ejecutado contra un experimento, una versión de modelo implementada o ambos sin salir del espacio de trabajo.",
  "mlops.manualRun.databaseRequired":
    "\nConfigure la base de datos antes de iniciar ejecuciones manuales de aprendizaje automático desde este espacio de trabajo.",
  "mlops.manualRun.noTargets":
    "\nAún no hay experimentos ni versiones de modelos implementadas disponibles para ejecuciones de aprendizaje automático manual.",
  "mlops.manualRun.experimentLabel": "\nExperimento",
  "mlops.manualRun.experimentHint":
    "\nOpcional. Elija un experimento cuando la ejecución deba adjuntarse a una pista de evaluación activa.",
  "mlops.manualRun.experimentOptional": "\nSin objetivo de experimento",
  "mlops.manualRun.modelVersionLabel": "\nVersión del modelo implementado",
  "mlops.manualRun.modelVersionHint":
    "Opcional. Elija una versión de modelo implementada cuando la ejecución deba evaluar un objetivo de lanzamiento promocionado.",
  "mlops.manualRun.modelVersionOptional": "\nNo hay versión de modelo implementada target",
  "mlops.manualRun.submit": "\nEjecución manual de cola",
  "mlops.manualRun.created": "\nLa ejecución manual de ML se puso en cola correctamente.",
  "mlops.summary.eyebrow": "\nResumen operativo",
  "mlops.summary.title": "\nPostura actual de MLOps",
  "mlops.summary.description":
    "\nEste espacio de trabajo consolida la ejecución de experimentos, la preparación para la implementación, la actualización de los datos ascendentes y la presión de la automatización desde el gráfico en vivo.",
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
    "\n{live} en vivo, {monitor} bajo vigilancia, {offline} conjuntos de datos fuera de línea.",
  "mlops.summary.reportPacks":
    "\n{ready} listo, {building} edificio, {failed} paquetes de informes fallidos.",
  "mlops.summary.automationRuns":
    "\n{count} las ejecuciones de automatización están actualmente en cola o en ejecución.",
  "mlops.summary.deployments":
    "\nLas implementaciones {count} están actualmente en etapa de preparación o activas.",
  "mlops.runQueue.title": "\nEjecutar cola",
  "mlops.runQueue.description":
    "\nPriorice el modelo y las ejecuciones de automatización que actualmente están en cola, ejecutándose o bloqueadas por falla.",
  "mlops.runQueue.empty": "\nNinguna ejecución activa o fallida requiere atención en este momento.",
  "mlops.runQueue.table.item": "\nArtículo",
  "mlops.runQueue.table.type": "\nTipo",
  "mlops.runQueue.table.status": "\nEstado",
  "mlops.runQueue.table.updated": "\nActualizado",
  "mlops.runQueue.kind.ml": "\nEjecución de ML",
  "mlops.runQueue.kind.automation": "\nAutomatización / {kind}",
  "mlops.runQueue.mlFallbackTitle": "\nEjecución de ML no asignada",
  "mlops.experiments.title": "\nExperimentos",
  "mlops.experiments.description":
    "\nRevise los objetivos del experimento, el estado actual y la cobertura de ejecución antes de promocionar nuevas versiones del modelo.",
  "mlops.experiments.name": "\nNombre",
  "mlops.experiments.objective": "\nObjetivo",
  "mlops.experiments.status": "\nEstado",
  "mlops.experiments.runCount": "\nEjecuta",
  "mlops.experiments.lastUpdated": "\nÚltima actualización",
  "mlops.experiments.empty": "\nAún no hay experimentos de ML conectados.",
  "mlops.registry.title": "\nRegistro de modelo",
  "mlops.registry.description":
    "\nRevise las entradas del registro y la última etapa de implementación antes de pasar las versiones a producción.",
  "mlops.registry.name": "\nModelo",
  "mlops.registry.stage": "\nEtapa",
  "mlops.registry.versions": "\nVersiones",
  "mlops.registry.empty": "\nAún no hay entradas de registro de modelo disponibles.",
  "mlops.deployments.title": "\nImplementaciones",
  "mlops.deployments.description":
    "\nInspeccione el espacio de implementación, el estado de la promoción y las marcas de tiempo de la última versión en el gráfico del modelo en vivo.",
  "mlops.deployments.model": "\nModelo",
  "mlops.deployments.version": "\nVersión",
  "mlops.deployments.environment": "\nMedio ambiente",
  "mlops.deployments.status": "\nEstado",
  "mlops.deployments.deployedAt": "\nImplementado",
  "mlops.deployments.empty": "\nAún no hay implementaciones de modelos activas.",
  "mlops.upstream.title": "\nDependencias ascendentes",
  "mlops.upstream.description":
    "\nRealice un seguimiento de la actualización del conjunto de datos y de la postura de creación del paquete de informes que puede bloquear la entrega del modelo y el análisis posterior.",
  "mlops.upstream.empty":
    "\nAún no hay conjuntos de datos ascendentes ni paquetes de informes conectados.",
  "mlops.upstream.table.item": "\nArtículo",
  "mlops.upstream.table.kind": "\nAmable",
  "mlops.upstream.table.status": "\nEstado",
  "mlops.upstream.table.updated": "\nActualizado",
  "mlops.upstream.kind.dataset": "\nConjunto de datos",
  "mlops.upstream.kind.pack": "\nPaquete de informes",
  "mlops.runStatus.QUEUED": "\nEn cola",
  "mlops.runStatus.RUNNING": "\nCorriendo",
  "mlops.runStatus.SUCCEEDED": "\nTuvo éxito",
  "mlops.runStatus.FAILED": "\nFallido",
  "mlops.runStatus.CANCELED": "\nCancelado",
  "mlops.deploymentStatus.DRAFT": "\nRevisión",
  "mlops.deploymentStatus.STAGED": "\nEn escena",
  "mlops.deploymentStatus.ACTIVE": "\nActivo",
  "mlops.deploymentStatus.ROLLED_BACK": "\nRevertido",
  "mlops.deploymentStatus.RETIRED": "\nJubilado",
  "mlops.datasetFreshness.LIVE": "\nEn vivo",
  "mlops.datasetFreshness.MONITOR": "\nMonitor",
  "mlops.datasetFreshness.OFFLINE": "\nDesconectado",
  "mlops.reportPackState.DRAFT": "\nRevisión",
  "mlops.reportPackState.BUILDING": "\nEdificio",
  "mlops.reportPackState.READY": "\nListo",
  "mlops.reportPackState.FAILED": "\nFallido",
  "mlops.reportPackState.ARCHIVED": "\nArchivado",
  "mlops.automationKind.DEVICE_COMMAND": "\nComando del dispositivo",
  "mlops.automationKind.EDGE_RUNBOOK": "\nLibro de ejecución de borde",
  "mlops.automationKind.WORKFLOW": "\nFlujo de trabajo",
  "mlops.automationKind.REPORT_PACK": "\nPaquete de informes",
  "mlops.automationKind.ML_PIPELINE": "\nCanalización de aprendizaje automático",
  "nav.training": "\nEntrenamiento",
  "training.title": "\nPreparación para el entrenamiento",
  "training.subtitle":
    "\nCampos de tiro, sistemas de seguridad, postura de tiro y acciones operativas",
  "training.heroEyebrow": "\nOperaciones de entrenamiento",
  "training.coverage":
    "Utilice recursos de campo de entrenamiento en vivo, registros de control de rango, presión de trabajo pendiente y problemas del sitio para impulsar la preparación desde un espacio de trabajo de SSR.",
  "training.view.readiness": "\nPreparación",
  "training.view.controls": "\nControles",
  "training.view.incidents": "\nIncidentes",
  "training.view.history": "\nHistoria",
  "training.chatContext":
    "\nEspacio de trabajo de preparación para la formación. {assets} activos en {sites} sitios. {actions} acciones abiertas. {controls} registros de control de alcance en vivo.",
  "training.stats.assets": "\nActivos rastreados",
  "training.stats.assetsDescription":
    "\nCampos de entrenamiento, sistemas de seguridad y recursos de puntería incluidos en el alcance.",
  "training.stats.readyAssets": "\nListo ahora",
  "training.stats.readyAssetsDescription":
    "\nActivos actualmente operativos o degradados en lugar de restringidos.",
  "training.stats.sites": "\nSitios cubiertos",
  "training.stats.sitesDescription":
    "\nSitios con activos inmobiliarios de formación en el gráfico en vivo.",
  "training.stats.actions": "\nAcciones abiertas",
  "training.stats.actionsDescription":
    "\nTareas, predicciones críticas y tickets de soporte activos que necesitan seguimiento.",
  "training.stats.controls": "\nControles en vivo",
  "training.stats.controlsDescription":
    "\nRegistros de control de alcance disponibles para el campo de entrenamiento.",
  "training.actions.eyebrow": "\nFlujos de trabajo conectados",
  "training.actions.title": "\nPasar de la preparación a la ejecución",
  "training.actions.description":
    "\nAbra los espacios de trabajo conectados que ya poseen corrección, soporte e informes para el entorno de capacitación.",
  "training.action.assets":
    "\nInspeccione el registro de activos del área viva y la jerarquía del sistema de soporte.",
  "training.action.tasks":
    "\nEnvío de inspecciones, reparaciones y trabajos de sustitución de sistemas de formación.",
  "training.action.support":
    "\nRevise las escalaciones de sitios en vivo y las colas de soporte vinculadas a los sitios de capacitación.",
  "training.action.reports":
    "\nAbra el paquete de preparación listo para la placa sin salir del shell.",
  "training.action.estate":
    "\nAbrir el plano de control de patrimonio para controles y gobernanza vinculados.",
  "training.workspace.brief.title": "Operational handoff",
  "training.workspace.brief.description":
    "Judge readiness coverage, pending controls, and support pressure before moving through controls, incidents, or history.",
  "training.summary.eyebrow": "\nResumen de preparación",
  "training.summary.title": "\nPostura de preparación actual",
  "training.summary.description":
    "\nEste espacio de trabajo consolida la disponibilidad de capacitación, la actividad de control y la presión de seguimiento desde el gráfico operativo en vivo.",
  "training.summary.capabilities":
    "\n{ready} de {total} capacidades de capacitación rastreadas están actualmente listas.",
  "training.summary.inspections":
    "\n{count} las tareas de inspección atrasadas están afectando actualmente la preparación.",
  "training.summary.controls":
    "\n{count} los registros de control de rango están marcados para la acción requerida.",
  "training.summary.replacementQueue": "\n{count} los artículos de reemplazo permanecen en cola.",
  "training.readiness.title": "\nTablero de preparación para el entrenamiento",
  "training.readiness.description":
    "\nRevise la cobertura de capacidad, la presión de inspección y la postura de control antes de enviar el trabajo operativo.",
  "training.readiness.empty": "\nAún no hay activos de capacitación en vivo conectados.",
  "training.readiness.capabilities": "\nCapacidades rastreadas",
  "training.readiness.capabilitiesDescription":
    "Etiquetas de capacidad actualmente asignadas a recursos y rangos de entrenamiento.",
  "training.readiness.readyCapabilities": "\nCapacidades listas",
  "training.readiness.readyCapabilitiesDescription":
    "\nCapacidades sin sitio ni bloqueador de condiciones en este momento.",
  "training.readiness.watchCapabilities": "\nCapacidades del reloj",
  "training.readiness.watchCapabilitiesDescription":
    "\nCapacidades actualmente bajo vigilancia debido a degradación o presión del sitio.",
  "training.readiness.overdueInspections": "\nInspecciones vencidas",
  "training.readiness.overdueInspectionsDescription":
    "\nTrabajos de inspección que pueden reducir directamente la disponibilidad de formación.",
  "training.readiness.alertTitle": "\nPostura de control operativo",
  "training.readiness.alertDescription":
    "\n{actionRequired} registros de control requieren acción, {replacementQueue} artículos de reemplazo permanecen en cola y {labourHours} de mano de obra se ha registrado en todo el trabajo de preparación.",
  "training.siteFocus.title": "\nEnfoque del sitio",
  "training.siteFocus.subtitle":
    "\nPriorice los sitios donde los activos limitados, el trabajo pendiente o los tickets activos pueden interrumpir la impartición de la capacitación.",
  "training.siteFocus.empty": "\nAún no hay sitios de capacitación disponibles.",
  "training.siteFocus.itemDescription":
    "\n{assets} activos, {constrained} restringidos, {tasks} tareas abiertas, {predictions} predicciones críticas, {tickets} entradas en vivo.",
  "training.attentionAssets.title": "\nActivos de atención",
  "training.attentionAssets.subtitle":
    "\nRevise los activos que tienen la mayor presión de preparación antes de que los problemas se extiendan a la entrega.",
  "training.attentionAssets.empty":
    "\nActualmente, ningún activo de capacitación requiere escalamiento.",
  "training.attentionAssets.itemDescription":
    "\n{site} / {type} / {condition} / Última inspección: {lastInspection} / {signals} señales en vivo.",
  "training.attentionAssets.lastInspectionNone": "\nNo registrado",
  "training.actionQueue.title": "\nCola de acciones",
  "training.actionQueue.description":
    "\nEsta cola muestra trabajos atrasados, predicciones críticas y problemas de soporte en vivo vinculados a sitios de capacitación.",
  "training.actionQueue.empty":
    "\nNinguna acción de capacitación requiere escalamiento en este momento.",
  "training.actionQueue.kind.task": "\nTarea",
  "training.actionQueue.kind.prediction": "\nPredicción",
  "training.actionQueue.kind.support": "\nSoporte",
  "training.actionQueue.taskDescription": "\n{status} / {site} / Vencimiento {deadline}.",
  "training.actionQueue.predictionDescription":
    "\n{severity} / {site} / {remainingLife} días restantes de vida.",
  "training.actionQueue.supportDescription": "\n{status} / {site} / {priority} prioridad.",
  "training.rangeControls.title": "\nControles de rango recientes",
  "training.rangeControls.description":
    "\nUtilice los registros de control de alcance más recientes para confirmar la postura operativa y de cumplimiento.",
  "training.rangeControls.empty": "\nAún no hay registros de control de alcance disponibles.",
  "training.rangeControls.table.record": "\nRegistro",
  "training.rangeControls.table.location": "\nUbicación",
  "training.rangeControls.table.signal": "\nSeñal",
  "training.rangeControls.table.updated": "\nActualizado",
  "training.rangeControls.signalSummary":
    "Estado {status} / Operacional {operational} / Cumplimiento {compliance}",
  "training.quickLog.title": "\nControl de rango de registro",
  "training.quickLog.description":
    "\nCapture el control operativo o de cumplimiento más reciente sin salir del espacio de trabajo de preparación.",
  "training.quickLog.databaseRequired":
    "\nSe requiere una base de datos configurada antes de que se puedan registrar las actualizaciones del control de entrenamiento.",
  "training.quickLog.empty":
    "\nAún no hay sitios de capacitación disponibles para el registro de control.",
  "training.quickLog.emptyDescription":
    "Primero incluya los recursos de capacitación en el alcance para que las actualizaciones de control se puedan adjuntar al sitio o recurso de rango correcto.",
  "training.quickLog.assetOptional": "\nSolo control a nivel de sitio",
  "training.quickLog.helper":
    "\nRegistre aquí la postura de control actual y luego deje que el espacio de trabajo en vivo actualice la imagen de preparación a su alrededor.",
  "training.quickLog.submit": "\nActualización de control de registro",
  "training.quickLog.submitAria":
    "\nActualización de control de rango de entrenamiento de registro",
  "training.quickLog.feedback.saved":
    "\nLa actualización del control de entrenamiento se registró correctamente.",
  "notifications.title": "\nNotificaciones",
  "notifications.bell": "\nNotificaciones abiertas",
  "notifications.empty": "\nTodo despejado",
  "notifications.emptyDescription": "\nNo hay notificaciones nuevas en este momento.",
  "notifications.unread": "\nNo leído",
  "notifications.markRead": "\nMarcar como leído",
  "notifications.dismiss": "\nDescartar",
  "chat.workspace.systemEvent": "\nSistema",
  "chat.workspace.toolResult": "\nHerramienta",
  "chat.workspace.handoffNote": "\nTraspaso",
  "chat.workspace.delivered": "\nEntregado",
  "chat.workspace.unreadCount": "\n{count} sin leer",
  "admin.integrationHealth.title": "\nSalud de integración",
  "admin.integrationHealth.subtitle": "\nEstado de sincronización entre sistemas conectados",
  "admin.integrationHealth.syncsTotal": "\nSincronizaciones totales",
  "admin.integrationHealth.syncsFailed": "\nFallido",
  "admin.integrationHealth.syncsSuccess": "\nExitoso",
  "admin.integrationHealth.lastSync": "\nÚltima sincronización",
  "admin.auditTimeline.title": "\nRegistro de auditoría",
  "admin.auditTimeline.subtitle": "\nEventos recientes del sistema y cambios de estado",
  "admin.iotCommands.title": "\nCiclo de vida del comando de IoT",
  "admin.iotCommands.subtitle": "\nEstado de entrega y confirmación del comando del dispositivo",
  "admin.iotCommands.queued": "\nEn cola",
  "admin.iotCommands.delivered": "\nEntregado",
  "admin.iotCommands.acknowledged": "\nReconocido",
  "admin.iotCommands.completed": "\nCompletado",
  "admin.iotCommands.failed": "\nFallido",
  "admin.portalMembership.title": "\nMembresía del portal",
  "admin.portalMembership.subtitle": "\nAcceso de socios y gestión de invitaciones",
  "admin.portalMembership.email": "\nCorreo electrónico",
  "admin.portalMembership.role": "\nRol",
  "admin.portalMembership.status": "\nEstado",
  "admin.portalMembership.invited": "\nInvitado",
  "admin.portalMembership.active": "\nActivo",
  "admin.portalMembership.pending": "\nPendiente",
  "fleet.stats.vehicles": "\nVehículos",
  "fleet.stats.activeOps": "\nOperaciones activas",
  "fleet.stats.initiatives": "\nIniciativas",
  "fleet.accordion.operations": "\nResumen de operaciones",
  "fleet.accordion.regional": "\nComparación regional",
  "fleet.accordion.focus": "\nEnfoque de mejora",
  "buildings.stats.total": "\nEdificios",
  "buildings.stats.initiatives": "\nIniciativas",
  "buildings.stats.contracts": "\nMedidas del contrato",
  "buildings.accordion.performance": "\nComparación de rendimiento",
  "buildings.accordion.initiatives": "\nProgreso de la iniciativa",
  "sensors.stats.total": "\nSensores",
  "sensors.stats.activeAlerts": "\nAlertas activas",
  "sensors.stats.alertRules": "\nReglas de alerta",
  "sensors.health.title": "\nEstado del sensor",
  "predictions.stats.total": "\nPredicciones",
  "predictions.stats.critical": "\nCrítico",
  "predictions.stats.avgConfidence": "\nConfianza promedio",
  "predictions.timeline.title": "\nPróximas predicciones",
  "predictions.timeline.subtitle": "\nPredicciones ordenadas por fecha prevista",
  "predictions.filter.all": "\nTodos",
  "predictions.filter.critical": "\nCrítico",
  "predictions.filter.high": "\nAlto",
  "predictions.filter.medium": "\nMedio",
  "predictions.filter.low": "\nBajo",
  "digitalTwin.hotspot.title": "\nDetalle del punto de acceso",
  "digitalTwin.hotspot.created": '\nPunto de acceso "{title}" creado.',
  "digitalTwin.hotspot.deleted": "\nPunto de acceso eliminado.",
  "digitalTwin.hotspots.noTwinAvailable":
    "\nNo hay ningún gemelo digital configurado. Primero cree un gemelo para un sitio.",
  "digitalTwin.overlay.sensors": "\nSuperposición de sensores",
  "digitalTwin.overlay.status": "\nEstado del dispositivo",
  "financePlanning.compare.title": "\nComparación de escenarios",
  "financePlanning.compare.subtitle": "\nAnálisis de proyección en paralelo",
  "financePlanning.compare.scenarioA": "\nEscenario A",
  "financePlanning.compare.scenarioB": "\nEscenario B",
  "financePlanning.compare.delta": "\nDelta",
  "financePlanning.compare.select": "\nSeleccionar escenarios",
  "estate.governance.title": "\nGobernanza",
  "estate.governance.agreements": "\nAcuerdos",
  "estate.governance.fmControls": "\nControles FM",
  "estate.governance.stewardship": "\nMayordomía",
  "estate.governance.rangeControls": "\nControles de rango",
  "estate.tabs.overview": "\nDescripción general",
  "estate.tabs.governance": "\nAprobaciones",
  "estate.tabs.assurance": "\nActivos y aseguramiento",
  "estate.tabs.readiness": "\nPreparación",
  "estate.tabs.partnerships": "\nContratos e integraciones",
  "analytics.title": "\nAnálisis",
  "analytics.subtitle": "\nGestión de conjuntos de datos y definiciones de métricas",
  "analytics.datasets.name": "\nConjunto de datos",
  "analytics.datasets.freshness": "\nFrescura",
  "analytics.datasets.metrics": "\nMétricas",
  "analytics.datasets.empty": "\nNo hay conjuntos de datos configurados",
  "analytics.datasets.emptyCta":
    "\nConfigure su primer conjunto de datos analíticos para comenzar a realizar un seguimiento de las métricas.",
  "portal.members.title": "\nMiembros",
  "portal.members.subtitle": "\nAcceso de socios y gestión de invitaciones",
  "portal.members.invite": "\nInvitar miembro",
  "portal.members.email": "\nCorreo electrónico",
  "portal.members.role": "\nRol",
  "portal.members.status": "\nEstado",
  "portal.members.status.active": "\nActivo",
  "portal.members.status.pending": "\nPendiente",
  "portal.members.status.expired": "\nCaducado",
  "portal.members.stage.invited": "\nInvitado",
  "portal.members.stage.accepted": "\nAceptado",
  "portal.members.stage.active": "\nActivo",
  "portal.members.empty": "\nAún no hay miembros",
  "portal.members.emptyCta": "\nInvita a tu primer socio al portal.",
  "portal.members.searchPlaceholder": "\nBuscar miembros…",
  "portal.members.searchLabel": "\nBuscar miembros del portal",
  "portal.members.filter.allStatuses": "\nTodos los estados",
  "portal.members.filter.allParties": "\nTodas las partes",
  "onboarding.title": "\nEmpezar",
  "onboarding.subtitle": "\nComplete estos pasos para configurar su espacio de trabajo",
  "onboarding.step.registerAsset": "\nRegistrar el primer activo",
  "onboarding.step.configureIntegrations": "\nConfigurar integraciones",
  "onboarding.step.inviteTeam": "\nInvitar a miembros del equipo",
  "onboarding.step.setupAutomation": "\nConfigurar la primera automatización",
  "onboarding.step.generateReport": "\nGenerar primer informe",
  "onboarding.dismiss": "\nDescartar guía",
  "customisation.dashboard.title": "\nWidgets del panel",
  "customisation.dashboard.subtitle": "\nElija qué secciones aparecen en su panel",
  "customisation.dashboard.kpiWidgets": "\nWidgets de KPI",
  "customisation.dashboard.activityFeed": "\nFeed de actividad",
  "customisation.dashboard.quickActions": "Acciones rápidas",
  "customisation.dashboardPreset.title": "\nAjustes preestablecidos del panel",
  "customisation.dashboardPreset.commandCenter": "\nCentro de mando",
  "customisation.dashboardPreset.commandCenterDescription":
    "\nMuestre widgets de KPI, el feed de actividades y acciones rápidas juntos.",
  "customisation.dashboardPreset.shiftFocus": "\nCambiar enfoque",
  "customisation.dashboardPreset.shiftFocusDescription":
    "\nMantenga visibles los widgets de KPI y las acciones rápidas mientras silencia el feed de actividad.",
  "customisation.dashboardPreset.quiet": "\nTablero silencioso",
  "customisation.dashboardPreset.quietDescription":
    "\nReduzca el panel a widgets de KPI para una página de destino diaria silenciosa.",
  "customisation.dashboardPreset.custom": "\nDiseño personalizado",
  "customisation.dashboardPreset.customDescription":
    "\nLa configuración actual del panel no coincide con uno de los ajustes preestablecidos integrados.",
  "customisation.dashboardPreset.subtitle":
    "\nElija la postura del tablero que mejor se adapte a su ritmo operativo actual.",
  "nav.supportTickets": "\nTickets de soporte",
  "supportTickets.title": "\nTickets de soporte",
  "supportTickets.subtitle": "\nSeguimiento y gestión de solicitudes de soporte",
  "supportTickets.status.OPEN": "\nAbierto",
  "supportTickets.status.IN_PROGRESS": "\nEn progreso",
  "supportTickets.status.AWAITING_CUSTOMER": "\nEsperando cliente",
  "supportTickets.status.RESOLVED": "\nResuelto",
  "supportTickets.status.CLOSED": "\nCerrado",
  "supportTickets.priority.LOW": "\nBajo",
  "supportTickets.priority.MEDIUM": "\nMedio",
  "supportTickets.priority.HIGH": "\nAlto",
  "supportTickets.priority.URGENT": "\nUrgente",
  "supportTickets.category.GENERAL_INQUIRY": "\nConsulta general",
  "supportTickets.category.TECHNICAL_ISSUE": "\nProblema técnico",
  "supportTickets.category.BILLING": "\nFacturación",
  "supportTickets.category.FEATURE_REQUEST": "\nSolicitud de función",
  "supportTickets.category.BUG_REPORT": "\nInforme de error",
  "supportTickets.category.ACCOUNT_ACCESS": "\nAcceso a la cuenta",
  "supportTickets.category.INTEGRATION": "\nIntegración",
  "supportTickets.category.OTHER": "\nOtro",
  "supportTickets.stats.total": "\nEntradas totales",
  "supportTickets.stats.breached": "Breached",
  "supportTickets.stats.open": "\nAbierto",
  "supportTickets.stats.inProgress": "\nEn progreso",
  "supportTickets.stats.resolved": "\nResuelto",
  "supportTickets.tab.all": "\nTodas las entradas",
  "supportTickets.tab.open": "\nAbierto",
  "supportTickets.tab.inProgress": "\nEn progreso",
  "supportTickets.tab.resolved": "\nResuelto",
  "supportTickets.tab.closed": "\nCerrado",
  "supportTickets.table.ticketNumber": "N. de ticket",
  "supportTickets.table.subject": "\nAsunto",
  "supportTickets.table.status": "\nEstado",
  "supportTickets.table.priority": "\nPrioridad",
  "supportTickets.table.category": "\nCategoría",
  "supportTickets.table.assignedTo": "\nAsignado a",
  "supportTickets.table.createdAt": "\nCreado",
  "supportTickets.table.updatedAt": "\nActualizado",
  "supportTickets.table.ariaLabel": "\nLista de tickets de soporte",
  "supportTickets.searchPlaceholder": "\nBuscar entradas…",
  "supportTickets.searchLabel": "\nBuscar tickets de soporte",
  "supportTickets.empty": "\nNo se encontraron tickets de soporte.",
  "supportTickets.emptyCta": "\nCree un nuevo ticket para comenzar.",
  "supportTickets.workspace.listTitle": "Ticket inbox",
  "supportTickets.workspace.listDescription":
    "Review the queue, then open a ticket to continue triage, replies, and status changes in the workbench.",
  "supportTickets.workspace.listEmptyDescription":
    "This queue is clear. Adjust filters or create a new ticket to start the next response thread.",
  "supportTickets.create.title": "\nNuevo ticket de soporte",
  "supportTickets.create.subject": "\nAsunto",
  "supportTickets.create.subjectPlaceholder": "\nBreve descripción del problema",
  "supportTickets.create.description": "\nDescripción",
  "supportTickets.create.descriptionPlaceholder": "\nProporcione detalles sobre el problema",
  "supportTickets.create.priority": "\nPrioridad",
  "supportTickets.create.category": "\nCategoría",
  "supportTickets.create.site": "\nSitio",
  "supportTickets.create.sitePlaceholder": "\nSeleccione un sitio",
  "supportTickets.create.submit": "\nCrear ticket",
  "supportTickets.create.submitting": "\nCreando…",
  "supportTickets.create.success": "\nTicket {ticketNumber} creado exitosamente.",
  "supportTickets.create.error": "\nNo se pudo crear el ticket: {message}",
  "supportTickets.detail.title": "\nDetalles del billete",
  "supportTickets.detail.statusLabel": "\nEstado",
  "supportTickets.detail.priorityLabel": "\nPrioridad",
  "supportTickets.detail.categoryLabel": "\nCategoría",
  "supportTickets.detail.assigneeLabel": "\nCesionario",
  "supportTickets.detail.siteLabel": "\nSitio",
  "supportTickets.detail.createdLabel": "\nCreado",
  "supportTickets.detail.updatedLabel": "\nÚltima actualización",
  "supportTickets.detail.resolvedLabel": "\nResuelto",
  "supportTickets.detail.closedLabel": "\nCerrado",
  "supportTickets.detail.unassigned": "\nNo asignado",
  "supportTickets.detail.noSite": "\nSin sitio",
  "supportTickets.detail.selectPromptTitle": "\nSeleccione un billete",
  "supportTickets.detail.selectPromptDescription":
    "\nElija un ticket de soporte para revisar mensajes, actualizar el estado y enviar respuestas.",
  "supportTickets.detail.selectGuideMessages":
    "Read the full conversation and internal notes before drafting the next reply.",
  "supportTickets.detail.selectGuideActions":
    "Promote the next status, request evidence, or hand the ticket to the next owner without leaving the workbench.",
  "supportTickets.detail.selectGuideCloseout":
    "Keep timestamps, site context, and final updates visible for an audit-ready closeout.",
  "supportTickets.detail.messages": "\nMensajes",
  "supportTickets.detail.messagesEmpty": "\nAún no hay mensajes.",
  "supportTickets.detail.addMessage": "\nAñadir respuesta",
  "supportTickets.detail.messagePlaceholder": "\nEscribe tu respuesta…",
  "supportTickets.detail.sendMessage": "\nEnviar",
  "supportTickets.detail.internalNote": "\nNota interna",
  "supportTickets.detail.updateStatus": "\nEstado de actualización",
  "supportTickets.detail.close": "\nCerrar ticket",
  "supportTickets.detail.reopen": "\nReabrir ticket",
  "supportTickets.filter.status": "\nEstado",
  "supportTickets.filter.priority": "\nPrioridad",
  "supportTickets.filter.category": "\nCategoría",
  "supportTickets.filter.site": "\nSitio",
  "supportTickets.filter.allStatuses": "\nTodos los estados",
  "supportTickets.filter.allPriorities": "\nTodas las prioridades",
  "supportTickets.filter.allCategories": "\nTodas las categorías",
  "supportTickets.filter.allSites": "\nTodos los sitios",
  "supportTickets.validation.subjectRequired": "\nEl asunto es obligatorio.",
  "supportTickets.validation.descriptionRequired": "\nSe requiere descripción.",
  "supportTickets.message.sent": "\nRespuesta enviada.",
  "supportTickets.message.error": "\nNo se pudo enviar la respuesta: {message}",
  "supportTickets.statusUpdate.success": "\nEstado del ticket actualizado.",
  "supportTickets.statusUpdate.error": "\nNo se pudo actualizar el estado: {message}",
  "chat.workspace.threadPanelTitle": "\nTema",
  "common.emptySearchTitle": "\nNo se encontraron resultados",
  "common.emptySearchDescription": "\nIntente ajustar sus criterios de búsqueda o filtro.",
  "common.pagination.summary": "\nMostrando {from}–{to} de {total}",
  "documentDetail.breadcrumb.navAria": "\nNavegación de ruta",
  "documentDetail.title": "\nDetalle del documento",
  "documentDetail.loading": "\nCargando documento…",
  "documentDetail.error.title": "\nError al cargar el documento",
  "documentDetail.error.description":
    "\nNo se pudo cargar el documento. Por favor, inténtalo de nuevo.",
  "documentDetail.field.title": "\nTítulo",
  "documentDetail.field.customer": "\nCliente",
  "documentDetail.field.customerEmail": "\nCorreo electrónico del cliente",
  "documentDetail.field.customerOrder": "\nVentana programada",
  "documentDetail.field.createdOrder": "\nOrden creada",
  "documentDetail.field.site": "\nSitio",
  "documentDetail.field.dueDate": "\nFecha de vencimiento",
  "documentDetail.field.requestedAt": "\nSolicitado en",
  "documentDetail.field.requestedBy": "\nSolicitado por",
  "documentDetail.field.requestedDeliveryAt": "\nEntrega solicitada",
  "documentDetail.field.totalAmount": "\nImporte total",
  "documentDetail.field.budget": "\nPresupuesto",
  "documentDetail.field.approvedBy": "\nAprobado por",
  "documentDetail.field.assignee": "\nCesionario",
  "documentDetail.field.estimatedCloseAt": "\nCierre estimado",
  "documentDetail.field.issuedAt": "\nEmitido en",
  "documentDetail.field.paidAt": "\nPagado en",
  "documentDetail.field.paymentTerm": "\nPlazo de pago",
  "documentDetail.field.labourCost": "\nCosto de materiales",
  "documentDetail.field.materialCost": "\nOtro costo",
  "documentDetail.field.outstandingAmount": "\nImporte pendiente",
  "documentDetail.field.receipts": "\nRecibos",
  "documentDetail.field.discrepancy": "\nDiscrepancia",
  "documentDetail.field.dispatchWindow": "\nVentana de despacho",
  "documentDetail.field.sla": "Nivel de servicio",
  "documentDetail.field.signoff": "\nAprobación",
  "documentDetail.field.scheduleWindow": "Ventana de programación",
  "documentDetail.field.sourceRfq": "\nFuente RFQ",
  "documentDetail.field.updatedAt": "\nActualizado a las",
  "documentDetail.field.vendor": "\nProveedor",
  "documentDetail.field.vendorReference": "\nReferencia del proveedor",
  "documentDetail.field.workOrder": "\nOrden de trabajo",
  "documentDetail.section.overviewTitle": "\nDescripción general",
  "documentDetail.section.overviewDescription": "\nDetalles clave para este documento.",
  "documentDetail.section.lineItemsTitle": "\nLíneas de pedido",
  "documentDetail.section.lineItemsDescription": "\nElementos incluidos en este documento.",
  "documentDetail.section.relatedTitle": "\nDocumentos relacionados",
  "documentDetail.section.relatedDescription": "\nDocumentos vinculados a este registro.",
  "documentDetail.table.description": "\nDescripción",
  "documentDetail.table.quantity": "\nCantidad",
  "documentDetail.table.amount": "\nCantidad",
  "documentDetail.table.total": "\nTotal",
  "documentDetail.empty.lineItems": "\nSin líneas de pedido.",
  "documentDetail.empty.related": "\nSin documentos relacionados.",
  "documentDetail.empty.timeline": "\nNo hay entradas en la línea de tiempo.",
  "documentWorkflow.feedback.updated": "\nEstado del flujo de trabajo actualizado.",
  "documentWorkflow.feedback.invalidAction": "\nAcción de flujo de trabajo no válida.",
  "estate.focus.title": "\nEnfoque inmobiliario",
  "estate.integration.title": "\nIntegraciones",
  "estate.integration.coverageLabel": "\n{configured} de {total} integraciones están configuradas.",
  "mlops.summary.experiments": "\nExperimentos",
  "mlops.summary.registry": "\nRegistro de modelo",
  "portal.invite.title": "\nInvitación al portal",
  "portal.invite.subtitle": "\nHas sido invitado a unirte al portal.",
  "portal.invite.accept": "\nAceptar invitación",
  "portal.invite.email": "\nCorreo electrónico",
  "portal.invite.party": "\nOrganización",
  "portal.invite.expires": "\nExpira",
  "portal.invite.metadata": "\nDetalles de la invitación",
  "portal.invite.accessTitle": "\nVista previa del acceso de socio",
  "portal.invite.accessDescription":
    "\nObtenga una vista previa de la organización invitada, confirme la cuenta receptora y mantenga la ruta de aceptación en la misma pantalla segura.",
  "portal.invite.openPortal": "\nPortal abierto",
  "portal.invite.signIn": "\nIniciar sesión",
  "portal.invite.signOut": "\nCerrar sesión",
  "portal.invite.signedInAs": "\nIniciado sesión como {email}",
  "portal.invite.checklist.scopeTitle": "\nRevisar la organización invitada",
  "portal.invite.checklist.scopeDescription":
    "\nEsta invitación otorga acceso limitado a la superficie del portal compartido solo para la organización incluida en la lista.",
  "portal.invite.checklist.expiryTitle": "\nAceptar antes de que caduque la invitación",
  "portal.invite.checklist.expiryDescription":
    "\nUtilice la misma ruta de invitación antes de la fecha de vencimiento para que la aceptación permanezca adjunta a la solicitud original.",
  "portal.invite.checklist.supportTitle": "\nUtilice la cuenta invitada o cambie limpiamente",
  "portal.invite.checklist.supportDescription":
    "\nInicie sesión con la dirección de correo electrónico invitada para continuar. Si el acceso aún falla, vuelva a intentarlo desde esta invitación en lugar de abrir una ruta de portal separada.",
  "portal.invite.checklist.switchAccountDescription":
    "\nSi inició sesión con la dirección de correo electrónico incorrecta, cierre sesión primero y regrese a esta invitación para que los derechos permanezcan alineados.",
  "portal.invite.error.expired": "\nEsta invitación ha caducado.",
  "portal.invite.error.invalid": "\nEsta invitación no es válida.",
  "portal.invite.error.unauthenticated": "\nPor favor inicia sesión para aceptar esta invitación.",
  "portal.invite.error.emailMismatch":
    "\nEsta invitación se envió a una dirección de correo electrónico diferente.",
  "portal.members.access.invite": "\nInvitar miembro",
  "portal.members.access.pendingAcceptance": "\nPendiente de aceptación",
  "portal.members.access.membership": "\nMembresía",
  "portal.members.rolePending": "\nPendiente",
  "portal.members.error.alreadyMember": "\nEste usuario ya es miembro.",
  "portal.members.error.invalidInput": "\nPor favor revise el formulario e inténtelo nuevamente.",
  "portal.members.error.partyNotFound": "\nOrganización no encontrada.",
  "portal.members.error.notFound": "\nNo se pudo encontrar el miembro seleccionado.",
  "portal.members.error.invalidRole": "\nElija una función de portal válida.",
  "portal.members.error.roleUnavailable":
    "\nLos cambios de rol solo están disponibles para membresías activas.",
  "portal.members.roleChange": "\nCambio de rol",
  "portal.members.updateRole": "\nActualizar rol",
  "portal.members.revoke": "\nRevocar acceso",
  "portal.members.revokeDescription":
    "\nRevocar la invitación o membresía seleccionada sin salir del contexto del espacio de trabajo actual.",
  "portal.members.unavailable.title": "\nMiembros del portal no disponibles",
  "portal.members.unavailable.description":
    "\nEl espacio de trabajo de miembros no está disponible mientras la base de datos está sin conexión. Los filtros, las invitaciones y las acciones de miembros están deshabilitados hasta que vuelva la conexión.",
  "portal.members.history.title": "\nHistorial de acceso",
  "portal.members.history.invitedTitle": "\nInvitación emitida",
  "portal.members.history.invitedDescription": "El acceso inicial se preparó el {date}.",
  "portal.members.history.inviteAccessTitle": "\nEstado de acceso de invitación",
  "portal.members.history.membershipAccessTitle": "\nEstado de acceso a la membresía",
  "portal.members.history.accessDescription": "\nPostura de acceso actual: {state}.",
  "portal.members.history.systemActor": "\nFlujo de trabajo del sistema",
  "portal.members.history.acceptedTitle": "\nInvitación aceptada",
  "portal.members.history.acceptedDescription":
    "\n{actor} aceptó la invitación al portal y continuó en el espacio de trabajo del socio.",
  "portal.members.history.activatedTitle": "\nMembresía activada",
  "portal.members.history.activatedDescription":
    "\n{actor} activó la membresía del espacio de trabajo para este contacto de parte.",
  "portal.members.history.roleUpdatedTitle": "\nRol actualizado",
  "portal.members.history.roleUpdatedDescription":
    "\n{actor} cambió el rol de {previousRole} a {nextRole}.",
  "portal.members.history.revokedTitle": "\nAcceso revocado",
  "portal.members.history.revokedDescription": "\n{actor} revocó este acceso desde el portal.",
  "portal.members.history.summaryTitle": "\nResumen de gobernanza",
  "portal.members.history.summaryDescription":
    "\nMantenga visibles la emisión de invitaciones, los cambios de roles, las revocaciones y el último evento de gobernanza mientras administra el acceso.",
  "portal.members.history.trackedChangesLabel": "\nEntradas rastreadas",
  "portal.members.history.roleChangeCountLabel": "\nCambios de rol",
  "portal.members.history.revokeCountLabel": "\nRevocaciones",
  "portal.members.history.latestEventLabel": "\nÚltimo evento de gobernanza",
  "portal.members.history.latestEventFallback":
    "\nA la espera de la próxima actualización de gobernanza",
  "portal.members.reissue": "\nInvitación de reedición",
  "portal.members.alert.inviteSuccess": "\nInvitación preparada para {email} en {party}.",
  "portal.members.alert.reissueSuccess": "\nInvitación reeditada para {email} en {party}.",
  "portal.members.alert.roleSuccess": "\nRol actualizado para {email} en {party}.",
  "portal.members.alert.revokeSuccess": "\nAcceso revocado para {email} en {party}.",
  "portal.nav.collaboration": "\nColaboración",
  "portal.nav.documents": "\nDocumentos",
  "portal.nav.members": "\nMiembros",
  "reports.activePackage.title": "\nPaquete activo",
  "reports.datasets.title": "\nConjuntos de datos",
  "reports.schedule.title": "\nEntrega programada",
  "reports.schedule.description":
    "\nConfigure la entrega automática de informes por correo electrónico de forma periódica.",
  "reports.schedule.frequency": "\nFrecuencia",
  "reports.schedule.daily": "\nDiario",
  "reports.schedule.weekly": "\nSemanal",
  "reports.schedule.monthly": "\nMensual",
  "reports.schedule.deliveryChannel": "\nCanal de entrega",
  "reports.schedule.email": "\nCorreo electrónico",
  "reports.schedule.webhook": "\nGancho web",
  "reports.schedule.recipientsLabel": "\nDestinatarios",
  "reports.schedule.recipientsPlaceholder":
    "\nIntroduzca direcciones de correo electrónico separadas por comas",
  "reports.schedule.timezoneLabel": "\nZona horaria",
  "reports.schedule.save": "\nGuardar horario",
  "reports.schedule.disable": "\nDesactivar programación",
  "reports.schedule.nextDelivery": "\nPróxima entrega",
  "reports.schedule.lastDelivery": "\nÚltima entrega",
  "reports.schedule.active": "\nActivo",
  "reports.schedule.inactive": "\nInactivo",
  "reports.schedule.created": "\nHorario creado exitosamente.",
  "reports.schedule.updated": "\nHorario actualizado exitosamente.",
  "reports.schedule.empty": "\nNo hay horarios de entrega configurados.",
  "reports.schedule.emptyAction":
    "\nAgregue un cronograma para entregar este informe automáticamente.",
  "reports.sharing.title": "\nCompartir y permisos",
  "reports.sharing.description": "\nControlar quién puede ver o editar este informe.",
  "reports.sharing.addUser": "\nAgregar usuario",
  "reports.sharing.addRole": "\nAñadir rol",
  "reports.sharing.permissionView": "\nVer",
  "reports.sharing.permissionEdit": "\nEditar",
  "reports.sharing.permissionAdmin": "\nAdministrador",
  "reports.sharing.remove": "\nEliminar",
  "reports.sharing.userLabel": "\nUsuario",
  "reports.sharing.userPlaceholder": "\nSeleccione un usuario",
  "reports.sharing.permissionLabel": "\nPermiso",
  "reports.sharing.save": "\nCompartir informe",
  "reports.sharing.empty": "\nEste informe no ha sido compartido con nadie.",
  "reports.sharing.emptyAction": "\nComparta este informe con los miembros del equipo.",
  "reports.sharing.shared": "\nInforme compartido correctamente.",
  "reports.sharing.removed": "\nAcceso eliminado exitosamente.",
  "reports.export.title": "\nInforme de exportación",
  "reports.export.pdf": "\nExportar PDF",
  "reports.export.csv": "\nExportar CSV",
  "reports.export.excel": "\nExportar Excel",
  "reports.export.arrow": "\nExportar Arrow",
  "reports.export.parquet": "\nExportar Parquet",
  "reports.export.generating": "\nGenerando exportación...",
  "reports.export.download": "\nDescargar",
  "reports.export.error": "\nLa exportación falló. Por favor, inténtalo de nuevo.",
  "reports.dateRange.custom": "\nRango de fechas personalizado",
  "reports.dateRange.from": "\nDe",
  "reports.dateRange.to": "\nPara",
  "reports.dateRange.apply": "\nAplicar rango",
  "reports.dateRange.clear": "\nBorrar rango",
  "reports.dateRange.hint":
    "\nSeleccione las fechas de inicio y finalización para filtrar los datos del informe.",
  "reports.drilldown.clickToExpand": "\nHaga clic para ver detalles",
  "reports.drilldown.backToSummary": "\nVolver al resumen",
  "reports.drilldown.breadcrumbRoot": "\nResumen",
  "reports.drilldown.loadingDetail": "\nCargando vista detallada...",
  "reports.drilldown.detailTitle": "\nVista detallada",
  "reports.drilldown.detailBreakdown": "\nDesglose detallado de {item}",
  "reports.drilldown.detailContent": "Desglose detallado del artículo {item}.",
  "workOrderDetail.title": "\nDetalle de la orden de trabajo",
  "training.courses.title": "\nCursos de formación",
  "training.courses.description":
    "\nGestionar cursos de formación, módulos e inscripciones de empleados.",
  "training.courses.create": "\nCrear curso",
  "training.courses.editTitle": "\nEditar curso",
  "training.courses.moduleCount": "\n{count} módulos",
  "training.courses.enrolledCount": "\n{count} inscrito",
  "training.courses.completionRate": "\n{rate}% finalización",
  "training.courses.durationLabel": "\nDuración",
  "training.courses.mandatoryLabel": "\nObligatorio",
  "training.courses.optionalLabel": "\nOpcional",
  "training.courses.empty": "\nAún no se han creado cursos de formación.",
  "training.modules.title": "\nMódulos del curso",
  "training.modules.add": "\nAgregar módulo",
  "training.modules.contentType": "\nTipo de contenido",
  "training.modules.video": "\nVídeo",
  "training.modules.document": "\nDocumento",
  "training.modules.quiz": "\nPrueba",
  "training.modules.sortOrder": "\nOrden",
  "training.modules.duration": "\nDuración (min)",
  "training.certification.title": "\nCertificaciones",
  "training.certification.description":
    "\nRealice un seguimiento de la validez y el vencimiento de la certificación para comprobar su cumplimiento.",
  "training.certification.expiresAt": "\nExpira",
  "training.certification.daysUntilExpiry": "\n{days} días restantes",
  "training.certification.expired": "\nCaducado",
  "training.certification.expiringSoon": "\nExpira pronto",
  "training.certification.valid": "\nVálido",
  "training.certification.expiringAlert":
    "\n{count} certificaciones que vencen dentro de los 30 días",
  "training.certification.renewAction": "\nRenovar",
  "training.certification.downloadCertificate": "\nDescargar certificado",
  "training.certification.issuedBy": "\nEmitido por",
  "training.certification.issuedAt": "\nEmitido en",
  "training.certification.name": "\nNombre del certificado",
  "training.certification.empty": "\nNo hay certificaciones registradas.",
  "training.competencyMatrix.title": "\nMatriz de Competencias",
  "training.competencyMatrix.description":
    "\nMapee las competencias requeridas con las calificaciones reales de los empleados.",
  "training.competencyMatrix.requiredLevel": "\nRequerido",
  "training.competencyMatrix.currentLevel": "\nActual",
  "training.competencyMatrix.gap": "\nBrecha",
  "training.competencyMatrix.noGap": "\nConocí",
  "training.competencyMatrix.employee": "\nEmpleado",
  "training.competencyMatrix.competency": "\nCompetencia",
  "training.competencyMatrix.level": "\nNivel",
  "training.competencyMatrix.empty": "\nAún no se han configurado definiciones de competencias.",
  "training.competencyMatrix.emptyEmployee":
    "\nNo se registraron evaluaciones de competencia de los empleados.",
  "common.approvalSignoff": "\nAprobación y aprobación",
  "common.dispatchBoard": "\nTablero de despacho",
  "common.serviceBoard": "\nTablero de servicio",
  "common.ownerQueue": "\nCola de propietario",
  "common.slaTimers": "\nTemporizadores SLA",
  "common.macros": "\nMacros",
  "common.certificationWorkflow": "\nFlujo de trabajo de certificación",
  "common.escalationWorkflow": "\nFlujo de trabajo de escalamiento",
  "common.cohortCompare": "\nComparación de cohortes",
  "common.pinboard": "\nTablero de problemas",
  "common.governanceControls": "\nControles de gobernanza",
  "predictions.workspace.promote.eyebrow": "\nPromocionar a la acción",
  "predictions.workspace.promote.title": "\nPromocionar la señal en el trabajo",
  "predictions.workspace.promote.description":
    "\nInserte la predicción en vivo en el envío, la recuperación del servicio, la planificación o un paquete de informes sin salir del espacio de trabajo.",
  "predictions.workspace.promote.dispatchLabel": "\nSeguimiento del envío",
  "predictions.workspace.promote.dispatchDescription":
    "\nAbra la cola de tareas teniendo en cuenta la postura de predicción en vivo.",
  "predictions.workspace.promote.serviceLabel": "\nAbrir tablero de servicio",
  "predictions.workspace.promote.serviceDescription":
    "\nMover la señal activa a coordinación de orden de trabajo y ejecución de campo.",
  "predictions.workspace.promote.planningLabel": "\nPromocionar a planificación",
  "predictions.workspace.promote.planningDescription":
    "\nLlevar la señal de riesgo a la planificación financiera y la revisión de inversiones.",
  "predictions.workspace.promote.reportLabel": "\nCrear paquete de informes",
  "predictions.workspace.promote.reportDescription":
    "\nCapture la evidencia actual de IA en un flujo de trabajo de informes duradero.",
  "predictions.workspace.ownerQueue.eyebrow": "\nCola de propietario",
  "predictions.workspace.ownerQueue.title": "\nTraspaso del propietario actual",
  "predictions.workspace.ownerQueue.description":
    "\nMantenga visibles al siguiente operador, confiabilidad y propietarios de adquisiciones junto al tablero de riesgo clasificado.",
  "predictions.workspace.ownerQueue.dispatchItem":
    "\nEl propietario del envío confirma la siguiente acción del campo y la ventana de vencimiento.",
  "predictions.workspace.ownerQueue.reliabilityItem":
    "\nEl propietario de la confiabilidad valida la evidencia de IA antes de que la señal se consolide y se repita el trabajo.",
  "predictions.workspace.ownerQueue.procurementItem":
    "El propietario de la adquisición permanece atento a las piezas, los reemplazos o la presión de eliminación.",
  "finance.cockpit.savedSlices.title": "\nPorciones financieras guardadas",
  "finance.cockpit.savedSlices.description":
    "\nMuévase entre los sectores financieros que los operadores vuelven a abrir con mayor frecuencia durante la revisión y el cierre de sesión.",
  "finance.cockpit.savedSlices.portfolio": "\nVigilancia de cartera",
  "finance.cockpit.savedSlices.depreciation": "\nVigilancia de depreciación",
  "finance.cockpit.savedSlices.controls": "\nRevisión de control",
  "finance.cockpit.savedSlices.reviewWindow": "\nVentana de revisión",
  "finance.cockpit.savedSlices.ownerQueue": "\nCola de propietario",
  "finance.cockpit.savedSlices.packReady": "\nEmpacar listo",
  "finance.cockpit.signoff.title": "\nBucle de cierre y distribución",
  "finance.cockpit.signoff.description":
    "\nMantenga la línea base de planificación, el seguimiento de las adquisiciones y la distribución de informes visibles en una bandeja de aprobación.",
  "finance.cockpit.signoff.planTitle": "\nLínea base de planificación",
  "finance.cockpit.signoff.planDescription":
    "\nRevisar la línea base de planificación financiera activa.",
  "finance.cockpit.signoff.planSupport":
    "\nLlevar la postura actual de depreciación a la próxima ronda de aprobación.",
  "finance.cockpit.signoff.procurementTitle": "\nSeguimiento de adquisiciones",
  "finance.cockpit.signoff.procurementDescription":
    "\nVerifique la ruta de la orden de compra antes de liberar el gasto.",
  "finance.cockpit.signoff.procurementSupport":
    "\nMantenga visibles las acciones de compra posteriores junto al segmento financiero actual.",
  "finance.cockpit.signoff.distributionTitle": "\nDistribución de informes",
  "finance.cockpit.signoff.distributionDescription":
    "\nImpulsar la postura financiera actual al próximo paquete de partes interesadas.",
  "finance.cockpit.signoff.distributionSupport":
    "\nEnrute el resumen aprobado a la cronología y distribución del informe guardado.",
  "financePlanning.workflow.title": "\nCadencia de aprobación",
  "financePlanning.workflow.description":
    "\nRealice un seguimiento de la línea de base actual, la presión de aprobación y la preparación de la distribución antes de que los escenarios avancen.",
  "financePlanning.workflow.baseline":
    "\n{count} escenario(s) de referencia permanecen en el conjunto de revisión activo.",
  "financePlanning.workflow.approvals":
    "\n{count} la(s) señal(es) de aprobación o dependencia aún necesitan aprobación antes del lanzamiento.",
  "financePlanning.workflow.distribution":
    "\n{count} las rutas de distribución conectadas están listas para el siguiente paquete certificado.",
  "utilisation.cockpit.savedViews.title": "\nVistas de utilización guardadas",
  "utilisation.cockpit.savedViews.description":
    "\nCambie entre los sectores de cohortes guardados que los operadores utilizan para comparar la demanda equilibrada, presionada y en recuperación.",
  "utilisation.cockpit.savedViews.cohort": "\nComparación de cohortes",
  "utilisation.cockpit.savedViews.workflow": "\nTransferencia de flujo de trabajo",
  "utilisation.cockpit.cohortCompare.title": "\nComparación de cohortes",
  "utilisation.cockpit.cohortCompare.description":
    "\nUtilice el segmento de fecha actual como base para la comparación entre sitios y activos entre pares.",
  "utilisation.cockpit.cohortCompare.supporting":
    "\nLlevar esta vista de cohorte al siguiente informe o transferencia de intervención.",
  "apiExplorer.savedRequests.title": "\nSolicitudes guardadas",
  "apiExplorer.savedRequests.description":
    "\nMantenga las sondas de autenticación, API y HTML comunes a su alcance para repetir la investigación.",
  "apiExplorer.savedRequests.dashboard": "\nSonda HTML del panel",
  "apiExplorer.savedRequests.ucp": "\nSonda API de UCP",
  "apiExplorer.savedRequests.auth": "\nSonda de ruta de autenticación",
  "apiExplorer.history.title": "\nHistorial de solicitudes",
  "apiExplorer.history.description":
    "\nLos patrones de solicitudes recientes permanecen visibles para que los operadores puedan repetir los filtros sin reconstruirlos.",
  "apiExplorer.history.active": "Superficie activa: {surface}",
  "apiExplorer.history.html": "\nLas pruebas de navegación HTML recientes permanecen fijadas aquí.",
  "apiExplorer.history.api":
    "\nLas sondas API recientes permanecen fijadas aquí para su reproducción.",
  "supportTickets.workspace.sla.title": "\nSLA y postura de cola",
  "supportTickets.workspace.sla.description":
    "\nMantenga visibles la cola activa y la posición del ticket seleccionado mientras clasifica el panel de detalles.",
  "supportTickets.workspace.sla.openQueue":
    "\n{count} los tickets abiertos permanecen actualmente dentro de la ventana SLA activa.",
  "supportTickets.workspace.sla.activeQueue":
    "\n{count} tickets permanecen activos en la cola de soporte actual.",
  "supportTickets.workspace.sla.selectTicket":
    "\nSeleccione un ticket para inspeccionar la postura actual del SLA y la transferencia del propietario.",
  "supportTickets.workspace.sla.selectedTicket":
    "\nEl ticket seleccionado es {status} con prioridad {priority}.",
  "supportTickets.workspace.macros.title": "\nMacros de soporte",
  "supportTickets.workspace.macros.description":
    "\nUtilice macros de respuesta repetibles para mantener la coherencia en la clasificación, las solicitudes de evidencia y el cierre.",
  "supportTickets.workspace.macros.requestEvidence":
    "\nMacro: solicitar evidencia del cliente antes de que el ticket abandone la cola activa.",
  "supportTickets.workspace.macros.escalate":
    "\nMacro: escalar el ticket al siguiente propietario del servicio con el contexto actual intacto.",
  "supportTickets.workspace.macros.closeLoop":
    "\nMacro: cierre el ciclo con una actualización de estado final y un resumen listo para la auditoría.",
  "training.workflow.certificationTitle": "\nCadencia de certificación recurrente",
  "training.workflow.certificationDescription":
    "\nMantenga las revisiones de preparación, las actualizaciones de control y las pruebas de certificación en movimiento a través de un flujo de trabajo recurrente.",
  "training.workflow.certificationReadiness":
    "\n{count} los registros de capacidad de preparación son actualmente lo suficientemente sólidos para la revisión de la certificación.",
  "training.workflow.certificationReview":
    "\n{count} los elementos de revisión de control aún necesitan la aprobación de la certificación.",
  "training.workflow.certificationHistory":
    "\n{count} actualizaciones de control recientes están disponibles como evidencia de certificación recurrente.",
  "training.workflow.escalationTitle": "\nFlujo de trabajo de escalamiento",
  "training.workflow.escalationDescription":
    "\nLleve las inspecciones atrasadas, el soporte abierto y las colas de acción a un solo carril de escalada.",
  "training.workflow.escalationActions":
    "\n{count} elementos de acción están actualmente esperando en la cola de escalada.",
  "training.workflow.escalationInspections":
    "\n{count} las inspecciones vencidas permanecen activas en el segmento de capacitación actual.",
  "training.workflow.escalationSupport":
    "\n{count} los tickets de soporte abiertos aún necesitan seguimiento de derivación.",
  "fleet.dispatch.title": "\nTablero de despacho",
  "fleet.dispatch.description":
    "\nMueva los problemas de la flota al tablero operativo correcto antes de que se conviertan en una pérdida de disponibilidad.",
  "fleet.dispatch.taskQueue": "\nCola de tareas",
  "fleet.dispatch.taskQueueDescription":
    "\nRevise el trabajo pendiente de despacho actual y asigne el siguiente equipo.",
  "fleet.dispatch.serviceBoard": "\nTablero de servicio",
  "fleet.dispatch.serviceBoardDescription":
    "\nDirija los incidentes activos y el tiempo de inactividad hacia la recuperación del servicio.",
  "fleet.dispatch.reportPack": "\nPaquete de informes",
  "fleet.dispatch.reportPackDescription":
    "Incluya la presión actual de la flota en el próximo resumen de decisiones.",
  "fleet.ownerQueue.title": "\nCola del propietario de la flota",
  "fleet.ownerQueue.description":
    "\nMantenga alineados a los propietarios de despacho, mantenimiento y reemplazo en el segmento de flota actual.",
  "fleet.ownerQueue.dispatch":
    "\n{count} registros de flota están esperando ser enviados como propietarios.",
  "fleet.ownerQueue.recovery":
    "\n{count} las órdenes de trabajo activas aún están en recuperación de servicio.",
  "fleet.ownerQueue.replacement":
    "\n{count} elementos del plan de reemplazo permanecen en cola para revisión.",
  "fleet.serviceBoard.title": "\nTablero de servicio",
  "fleet.serviceBoard.description":
    "\nResumir la presión actual de mantenimiento y tiempo de inactividad en un carril de servicio operativo.",
  "fleet.serviceBoard.accidents":
    "\n{count} registros de accidentes actualmente requieren revisión.",
  "fleet.serviceBoard.downtime":
    "\n{count} los registros de tiempo de inactividad permanecen activos en el carril de servicio.",
  "fleet.serviceBoard.replacement":
    "\n{count} los elementos de planificación de reemplazo aún necesitan alineación con el servicio de la flota.",
  "buildings.heatmap.title": "\nMapa de calor de la cartera",
  "buildings.heatmap.description":
    "\nResalte la presión actual del edificio en términos de preparación, cobertura de sensores, seguridad y carga del programa.",
  "buildings.heatmap.readiness": "\nPresión de preparación",
  "buildings.heatmap.readinessDescription":
    "\nActivos y órdenes de trabajo que actualmente dan forma a la preparación del edificio.",
  "buildings.heatmap.coverage": "\nCobertura del sensor",
  "buildings.heatmap.coverageDescription":
    "\nCarga de revisión vinculada a sensores en la cohorte de edificios actual.",
  "buildings.heatmap.assurance": "\nRiesgo de aseguramiento",
  "buildings.heatmap.assuranceDescription":
    "\nLas acciones de aseguramiento abierto siguen dando forma a la postura de la cartera.",
  "buildings.heatmap.programme": "\nCarga del programa",
  "buildings.heatmap.programmeDescription":
    "\nIniciativas que aún afectan al grupo de edificios actual.",
  "buildings.compare.title": "\nComparación de cartera",
  "buildings.compare.description":
    "\nPasar del mapa de calor del edificio al siguiente informe o comparación de referencia sin reconstruir el contexto.",
  "buildings.compare.reportPack": "\nAbrir paquete de informes",
  "buildings.compare.reportPackDescription":
    "\nInicie la sección del edificio actual en el espacio de trabajo de informes.",
  "buildings.compare.portfolioBaseline": "\nAbrir comparación de línea base",
  "buildings.compare.portfolioBaselineDescription":
    "\nUtilice la postura actual del edificio como próxima línea base de la cartera.",
  "buildings.compare.ownerQueueTitle": "\nCola del propietario del edificio",
  "buildings.compare.ownerQueueDescription":
    "\nMuestre qué propietarios de edificios deben responder a continuación en materia de planificación, sensores y garantía.",
  "buildings.compare.ownerQueuePlanning":
    "\n{count} los elementos de planificación aún necesitan la revisión del propietario del edificio.",
  "buildings.compare.ownerQueueSensors":
    "\n{count} elementos de revisión vinculados a sensores permanecen activos en esta cohorte.",
  "buildings.compare.ownerQueueAssurance":
    "\n{count} acciones de aseguramiento todavía están esperando el seguimiento del propietario.",
  "sensors.calibration.title": "\nLínea de calibración y simulación",
  "sensors.calibration.description":
    "Mueva los problemas del sensor a calibración, revisión de reglas o escalamiento sin salir de la cabina.",
  "sensors.calibration.queueLabel": "\nCola de calibración",
  "sensors.calibration.queueDescription":
    "\nRevise la carga de trabajo de calibración actual para el conjunto de sensores activos.",
  "sensors.calibration.rulesLabel": "\nSimulación de reglas",
  "sensors.calibration.rulesDescription":
    "\nVerifique los cambios en las reglas de alerta antes de que se promuevan al carril activo.",
  "sensors.calibration.escalationLabel": "\nCarril de escalada",
  "sensors.calibration.escalationDescription":
    "\nLleve los problemas del sensor de presión más alta al próximo traspaso de propietario.",
  "sensors.ownerQueue.title": "\nCola del propietario del sensor",
  "sensors.ownerQueue.description":
    "\nMantenga alineados a los propietarios de calibración, SLA y aseguramiento con el conjunto de excepciones actual.",
  "sensors.ownerQueue.calibration":
    "\n{count} la regla de alerta o los elementos de calibración permanecen en la cola activa.",
  "sensors.ownerQueue.slaLane":
    "\n{count} elementos de trabajo controlados por sensores violados están dando forma al carril SLA.",
  "sensors.ownerQueue.assurance":
    "\n{count} las acciones de aseguramiento aún necesitan un propietario designado.",
  "digitalTwin.pinboard.title": "\nTablero de problemas",
  "digitalTwin.pinboard.description":
    "\nFije los puntos de acceso clave, los problemas de cobertura y los controles de salida junto a la escena en vivo.",
  "digitalTwin.pinboard.hotspotItem":
    "\nEl PIN del punto de acceso permanece activo y necesita la confirmación del operador en la vista gemela actual.",
  "digitalTwin.pinboard.coverageItem":
    "\nEl pin de brecha de cobertura permanece abierto para la telemetría y el segmento de cámara actuales.",
  "digitalTwin.pinboard.egressItem":
    "\nEl pin de salida y flujo está listo para el siguiente recorrido por la escena.",
  "digitalTwin.actions.title": "\nCarril de acción",
  "digitalTwin.actions.description":
    "\nMueva el problema gemelo activo a captura de trabajo, soporte o evidencia sin salir del visor.",
  "digitalTwin.actions.dispatchLabel": "\nSeguimiento del envío",
  "digitalTwin.actions.dispatchDescription":
    "\nAbra la cola operativa para el problema del gemelo activo.",
  "digitalTwin.actions.supportLabel": "\nAbrir carril de soporte",
  "digitalTwin.actions.supportDescription":
    "\nEscalar el problema gemelo al espacio de trabajo de soporte con el contexto actual.",
  "digitalTwin.actions.evidenceLabel": "\nCapturar evidencia",
  "digitalTwin.actions.evidenceDescription":
    "\nAbra la fuente de evidencia del punto de acceso para la escena gemela activa.",
  "reports.workspace.distributionTitle": "\nControles de distribución",
  "reports.workspace.distributionDescription":
    "\nMantenga visibles las aprobaciones, suscripciones y la comparación de versiones mientras se desplaza por el espacio de trabajo del informe.",
  "reports.workspace.distributionApprovals": "\nPostura de aprobación",
  "reports.workspace.distributionApprovalsValue":
    "\n{count} paquetes guardados permanecen disponibles para aprobación o reutilización.",
  "reports.workspace.distributionSubscriptions": "\nPostura de suscripción",
  "reports.workspace.distributionSubscriptionsValue":
    "\n{count} ruta(s) de plantilla permanecen disponibles para repetición de distribución.",
  "reports.workspace.distributionCompare": "\nComparación de versiones",
  "reports.workspace.distributionCompareHistory":
    "\nLa vista del historial está lista para la cronología y la comparación de paquetes guardados.",
  "reports.workspace.distributionCompareReview":
    "\nRevise el paquete activo antes de promocionar la próxima versión distribuida.",
  "mlops.governance.title": "\nGobernanza de MLOps",
  "mlops.governance.description":
    "Realice un seguimiento de las puertas de ascenso, la presión del riesgo y el impacto de la automatización junto al espacio de trabajo de MLOps en vivo.",
  "mlops.governance.riskRegister":
    "\n{count} elementos del conjunto de datos ejecutados con error o fuera de línea pertenecen actualmente al registro de riesgos.",
  "mlops.governance.promotionGate":
    "\n{count} puertas de promoción de implementación están actualmente activas.",
  "tasks.dependency.title": "\nDependencias",
  "tasks.dependency.description": "\nAdministrar bloqueadores de tareas y tareas relacionadas.",
  "tasks.dependency.blockedBy": "\nBloqueado por",
  "tasks.dependency.blocking": "\nBloqueando",
  "tasks.dependency.add": "\nAgregar dependencia",
  "tasks.dependency.remove": "\nEliminar dependencia",
  "tasks.dependency.circularError": "\nNo se puede crear una dependencia circular.",
  "tasks.dependency.type.blocks": "\nBloques",
  "tasks.dependency.type.related": "\nRelacionado",
  "tasks.dependency.empty": "\nNo hay dependencias configuradas.",
  "tasks.dependency.blockedBadge": "\nBloqueado",
  "tasks.dependency.selectTask": "\nSeleccione una tarea",
  "tasks.dependency.selectTaskHint": "\nBuscar por etiqueta de tarea o ID.",
  "tasks.comments.title": "\nActividad y comentarios",
  "tasks.comments.description": "\nHilo de discusión y registro de actividad para esta tarea.",
  "tasks.comments.placeholder": "\nAñadir un comentario...",
  "tasks.comments.submit": "\nPublicar comentario",
  "tasks.comments.empty": "\nAún no hay comentarios. Inicia la conversación.",
  "tasks.comments.postedBy": "\nPublicado por {author}",
  "tasks.timeTracking.title": "\nSeguimiento del tiempo",
  "tasks.timeTracking.description": "\nRegistrar el tiempo dedicado a esta tarea.",
  "tasks.timeTracking.logTime": "\nHora de registro",
  "tasks.timeTracking.minutes": "\nMinutos",
  "tasks.timeTracking.minutesHint": "\nDuración en minutos.",
  "tasks.timeTracking.descriptionLabel": "\nDescripción",
  "tasks.timeTracking.descriptionHint": "\nBreve nota sobre el trabajo realizado.",
  "tasks.timeTracking.date": "\nFecha",
  "tasks.timeTracking.dateHint": "\nFecha en que se realizó el trabajo.",
  "tasks.timeTracking.totalLogged": "\nTotal registrado",
  "tasks.timeTracking.totalLoggedDesc": "\nSuma de todas las entradas de tiempo para esta tarea.",
  "tasks.timeTracking.entries": "\nEntradas de tiempo",
  "tasks.timeTracking.empty": "\nAún no se ha registrado ningún tiempo.",
  "tasks.timeTracking.durationHoursMinutes": "\n{hours}h {minutes}m",
  "tasks.timeTracking.durationMinutesOnly": "\n{minutes}m",
  "tasks.timeTracking.submitAria": "\nEnviar entrada de hora",
  "workOrders.templates.title": "\nPlantillas de órdenes de trabajo",
  "workOrders.templates.description":
    "\nPlantillas reutilizables para tipos de órdenes de trabajo recurrentes.",
  "workOrders.templates.create": "\nCrear plantilla",
  "workOrders.templates.useTemplate": "\nUsar plantilla",
  "workOrders.templates.defaultLines": "\nLíneas de pedido predeterminadas",
  "workOrders.templates.defaultSla": "\nSLA predeterminado (horas)",
  "workOrders.templates.empty":
    "\nNo hay plantillas disponibles. Cree uno para acelerar la creación de órdenes de trabajo.",
  "workOrders.templates.titleLabel": "\nNombre de plantilla",
  "workOrders.templates.titleHint": "\nUn nombre descriptivo breve para la plantilla.",
  "workOrders.templates.descriptionLabel": "\nDescripción",
  "workOrders.templates.descriptionHint":
    "\nDescripción opcional de cuándo utilizar esta plantilla.",
  "workOrders.templates.scopeLabel": "\nAlcance",
  "workOrders.templates.scopeHint":
    "\nAlcance de trabajo predeterminado para pedidos de esta plantilla.",
  "workOrders.templates.selectTemplate": "\nSeleccione una plantilla",
  "workOrders.templates.selectTemplateHint":
    "\nElija una plantilla para completar previamente los campos de la orden de trabajo.",
  "workOrders.templates.submitAria": "\nGuardar plantilla de orden de trabajo",
  "addDevice.review.title": "\nRevisar antes de enviar",
  "addDevice.review.description":
    "\nConfirme la configuración, importe la postura y los detalles de registro final antes de crear el dispositivo.",
  "addDevice.review.items.setup":
    "\nVerifique el contexto del sitio de implementación y configuración del dispositivo.",
  "addDevice.review.items.import":
    "\nConfirme los campos importados y los valores predeterminados generados.",
  "addDevice.review.items.confirm": "\nAprobar la carga útil de registro final para su envío.",
  "addDevice.review.pending": "\nPendiente de revisión",
  "addDevice.presets.title": "\nBiblioteca preestablecida",
  "addDevice.presets.description":
    "\nUtilice plantillas iniciales para patrones de implementación comunes antes de crear o importar dispositivos.",
  "addDevice.presets.apply": "\nAplicar preajuste",
  "addDevice.presets.template": "\nPlantilla",
  "addDevice.presets.baseline.title": "\nLanzamiento básico del dispositivo",
  "addDevice.presets.baseline.description":
    "Comience desde el patrón de registro operativo predeterminado con campos estándar de telemetría y activos.",
  "addDevice.presets.fieldKit.title": "\nDespliegue del kit de campo",
  "addDevice.presets.fieldKit.description":
    "\nUtilice una configuración lista para usar en el campo para dispositivos portátiles que necesitan una rápida asignación de sitios y revisión de importaciones.",
  "addDevice.presets.capital.title": "\nEntrada de activos de capital",
  "addDevice.presets.capital.description":
    "\nOrganiza los valores predeterminados relacionados con las finanzas para dispositivos de mayor valor que necesitan un ciclo de vida y un seguimiento del valor más estrictos.",
  "addDevice.workflow.stepSetup": "\nConfiguración",
  "addDevice.workflow.stepImport": "\nImportar",
  "addDevice.workflow.stepReview": "\nEnviar",
  "deviceHistory.review.title": "\nRevisar la postura",
  "deviceHistory.review.description":
    "\nCompare la historia reciente, el contexto de anomalías y la postura de exportación antes de escalar el rastro del evento.",
  "deviceHistory.review.diffTitle": "\nCambiar revisión",
  "deviceHistory.review.diffDescription":
    "\nRealice un seguimiento de la configuración más reciente o delta del ciclo de vida antes de aceptar la actualización.",
  "deviceHistory.review.diffValue": "\nÚltima diferencia en alcance",
  "deviceHistory.review.anomalyTitle": "\nVigilancia de anomalía",
  "deviceHistory.review.anomalyDescription":
    "\nMantenga visibles los patrones de mantenimiento o ciclo de vida inusuales para un seguimiento rápido.",
  "deviceHistory.review.anomalyValue": "\nRevisión de anomalías lista",
  "deviceHistory.review.exportTitle": "\nExportación de evidencia",
  "deviceHistory.review.exportDescription":
    "\nEmpaquete el historial filtrado y revise la postura en un informe o transferencia CSV.",
  "deviceHistory.review.openReports": "\nInformes abiertos",
  "deviceHistory.review.raiseFollowUp": "\nAumentar seguimiento",
  "documentDetail.section.activityTitle": "\nActividad relacionada",
  "documentDetail.section.activityDescription":
    "\nMantenga visibles el movimiento más reciente, los registros vinculados y el contexto operativo posterior.",
  "documentDetail.section.nextDecisionTitle": "\nPróxima decisión",
  "documentDetail.section.nextDecisionDescription":
    "\nDescubra el próximo movimiento comercial u operativo antes de cambiar el estado del flujo de trabajo.",
  "documentDetail.section.signoffTitle": "\nFirma y aprobación",
  "documentDetail.section.signoffDescription":
    "\nMantenga las aprobaciones, la postura de aprobación y la evidencia de respaldo visibles en un solo carril.",
  "documentWorkspace.role.procurement": "\nAdquisiciones",
  "documentWorkspace.section.discrepancyTitle": "\nResolución de discrepancia",
  "documentWorkspace.section.discrepancyDescription":
    "\nRealice un seguimiento de las variaciones, las excepciones y la actividad de seguimiento antes de cerrar el registro.",
  "documentWorkspace.section.nextDecisionTitle": "\nPróxima decisión",
  "documentWorkspace.section.nextDecisionDescription":
    "\nMantenga visible en el espacio de trabajo la próxima aprobación, movimiento comercial o traspaso de operador.",
  "documentWorkspace.section.receiptTitle": "\nRecibo y admisión",
  "documentWorkspace.section.receiptDescription":
    "\nObserve la evidencia recibida, la confirmación de admisión y cualquier espacio restante en el recibo.",
  "documentWorkspace.section.slaTitle": "\nVigilancia SLA",
  "documentWorkspace.section.slaDescription":
    "\nSupervise las ventanas de servicio, los temporizadores y cualquier presión de ruptura pendiente desde el mismo riel.",
  "layout.analysisCanvas.leftRail": "\nFiltros",
  "layout.analysisCanvas.stage": "\nContenido principal",
  "layout.analysisCanvas.rightRail": "\nDetalles",
  "common.view": "\nVer",
  "training.view.library": "\nBiblioteca",
  "training.view.enrollments": "\nInscripciones",
  "training.library.title": "\nBiblioteca de cursos",
  "training.library.description": "\nGestione los cursos de formación disponibles y los módulos.",
  "training.library.titleColumn": "\nTítulo",
  "training.library.durationColumn": "\nDuración",
  "training.library.modulesColumn": "\nMódulos",
  "training.library.enrollmentsColumn": "\nInscripciones",
  "training.library.empty": "\nNo hay cursos disponibles.",
  "training.library.mandatory": "\nObligatorio",
  "training.library.optional": "\nOpcional",
  "training.enrollment.description":
    "\nSeguimiento del progreso en todos los cursos obligatorios y opcionales.",
  "training.enrollment.learnerColumn": "\nAprendiz",
  "training.enrollment.courseColumn": "\nCurso",
  "training.enrollment.completed": "\nCompletado",
  "training.enrollment.notStarted": "\nNo iniciado",
  "training.enrollment.title": "\nSeguimiento de inscripciones",
  "training.enrollment.empty": "\nNo se encontraron inscripciones.",

  /* ── API error messages ──────────────────────────────────── */
  "errors.unauthorized": "No autorizado",
  "errors.cartNotFound": "Carrito no encontrado",
  "errors.articleNotFound": "Artículo no encontrado",
  "errors.resellerProfileNotFound": "Perfil de revendedor no encontrado",
  "errors.tenantNotFound": "Inquilino no encontrado",
  "errors.deploymentNotFound": "Implementación no encontrada",
  "errors.schemaMigrationGovernance":
    "No se cumplió el requisito de gobernanza de migración de esquema.",
  "errors.deploymentMigrationGate":
    "Implementación rechazada: cada migración de esquema listada debe estar completada con un aprobador.",
  "errors.configVersionNotFound": "Versión de configuración no encontrada.",
  "errors.promotedDirectly": "Promovido directamente (sin puertas configuradas).",
  "errors.noActiveConfigVersion": "No hay versión de configuración activa para revertir.",
  "errors.targetVersionAlreadyActive": "La versión objetivo ya está activa.",
  "errors.approvalNotFound": "Aprobación no encontrada o no pendiente.",
  "errors.noActiveCatalogItem":
    "El producto no tiene un artículo de catálogo activo para esta parte.",
  "errors.noResultsFound": "No se encontraron resultados",
  "errors.dsarNotFound": "No se encontró la solicitud del interesado.",
  "errors.dsarExportInvalidStatus":
    "La exportación solo puede prepararse para solicitudes en borrador o enviadas.",
  "errors.dsarPurgeInvalidStatus":
    "La purga solo puede ejecutarse después de aprobar la solicitud para purga.",

  /* ── Success messages ────────────────────────────────────── */
  "success.promotionApproved": "Promoción aprobada.",
  "success.configVersionActivated": "Versión de configuración activada.",
  "success.shipmentCreated": "Envío creado.",

  /* ── Labels ──────────────────────────────────────────────── */
  "labels.savings.automation": "Automatización",
  "labels.savings.inventory": "Inventario",

  // Commerce – cart
  "cart.browseProducts": "Explorar productos",
  "cart.category": "Categoría",
  "cart.clearCart": "Vaciar carrito",
  "cart.empty": "El carrito está vacío",
  "cart.emptyDescription":
    "Su carrito de compras está vacío. Explore nuestro catálogo para añadir artículos.",
  "cart.emptyTitle": "No hay artículos en el carrito",
  "cart.items": "artículos",
  "cart.itemCount": "{count} artículo(s)",
  "cart.loadError": "No se pudo cargar el carrito. Por favor, inténtelo de nuevo.",
  "cart.loading": "Cargando carrito",
  "cart.poNumber": "Nº de orden de compra",
  "cart.poNumberPlaceholder": "Ingrese el número de orden de compra",
  "cart.proceedToCheckout": "Proceder al pago",
  "cart.product": "Producto",
  "cart.quantity": "Cantidad",
  "cart.removeItem": "Eliminar {name}",
  "cart.saveCart": "Guardar carrito",
  "cart.summary": "Resumen del pedido",
  "cart.title": "Carrito",
  "cart.total": "Total",
  "cart.unitPrice": "Precio unitario",
  "cart.updateQuantity": "Actualizar cantidad de {name}",
  "cart.lineItemsTableAria": "Líneas del carrito",

  // Commerce – checkout
  "checkout.backToCart": "Volver al carrito",
  "checkout.billingInformation": "Información de facturación",
  "checkout.items": "Artículos del pedido",
  "checkout.noShippingAddresses": "No hay direcciones de envío disponibles.",
  "checkout.notes": "Notas del pedido",
  "checkout.notesPlaceholder": "Añada instrucciones especiales o notas",
  "checkout.orderSummary": "Resumen del pedido",
  "checkout.placeOrder": "Realizar pedido",
  "checkout.poNumber": "Nº de orden de compra",
  "checkout.poNumberPlaceholder": "Ingrese el número de orden de compra",
  "checkout.paymentMethod": "Método de pago",
  "checkout.shippingAddress": "Dirección de envío",
  "checkout.step.billing": "Facturación",
  "checkout.step.cart": "Carrito",
  "checkout.step.confirm": "Confirmar",
  "checkout.step.review": "Revisar",
  "checkout.step.shipping": "Envío",
  "checkout.subtitle": "Revise su pedido y complete su compra.",
  "checkout.title": "Pago",
  "checkout.total": "Total",

  // Commerce – approvals and inventory
  "commerce.approvals.title": "Aprobaciones",
  "commerce.approvals.subtitle":
    "Revise decisiones pendientes y audite las aprobaciones completadas.",
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
  "commerce.buyingLists.title": "Listas de compra",
  "commerce.buyingLists.shared": "Compartida",
  "commerce.buyingLists.itemCount": "{count} artículos",
  "commerce.buyingLists.emptyTitle": "Aún no hay listas de compra",
  "commerce.buyingLists.emptyDescription":
    "Cree una lista de compra para agrupar líneas del catálogo antes del checkout.",
  "commerce.buyingLists.subtitle":
    "Agrupe líneas del catálogo y conviértalas en un carrito cuando esté listo.",
  "commerce.buyingLists.createNew": "Crear lista de compra",
  "commerce.buyingLists.detail.eyebrow": "Lista de compra",
  "commerce.buyingLists.detail.shellTitle": "Lista de compra",
  "commerce.buyingLists.detail.notFoundTitle": "Lista de compra no encontrada",
  "commerce.buyingLists.detail.notFoundDescription":
    "Esa lista no existe o no tiene acceso a ella.",
  "commerce.buyingLists.detail.tableCaption": "Líneas de la lista de compra",
  "commerce.buyingLists.detail.col.product": "Producto",
  "commerce.buyingLists.detail.col.sku": "SKU",
  "commerce.buyingLists.detail.col.quantity": "Cant.",
  "commerce.buyingLists.detail.col.unitPrice": "Precio unitario",
  "commerce.buyingLists.detail.col.lineTotal": "Total línea",
  "commerce.buyingLists.detail.convertToCart": "Enviar lista al carrito",
  "commerce.buyingLists.detail.emptyRows":
    "Esta lista aún no tiene líneas. Añada productos desde el catálogo.",
  "commerce.cart.title": "Carrito",
  "commerce.checkout.title": "Pago",
  "commerce.inventory.title": "Inventario",
  "commerce.inventory.subtitle":
    "Supervise niveles de stock, alertas de stock bajo y acciones de reposición.",

  "commerce.workspace.operationsLead":
    "Herramientas de compras y catálogo dentro de su espacio de trabajo.",
  "commerce.workspace.cartLead": "Revise líneas del carrito, cantidades y totales antes del pago.",
  "commerce.workspace.buyingListDetailLead":
    "Revise las líneas preparadas y envíe la lista al carrito cuando esté listo.",
  "commerce.workspace.productDetailLead":
    "Especificaciones, precios y disponibilidad de este artículo del catálogo.",

  // Commerce – customer orders (ERP lists + detail)
  "commerce.customerOrders.title": "Pedidos de cliente",
  "commerce.customerOrders.subtitle": "Revise pedidos abiertos, importes y estado de cumplimiento.",
  "commerce.customerOrders.action.browseCatalog": "Explorar catálogo",
  "commerce.customerOrders.action.viewOrder": "Ver pedido",
  "commerce.customerOrders.search": "Buscar pedidos",
  "commerce.customerOrders.searchLabel": "Buscar pedidos de cliente",
  "commerce.customerOrders.searchPlaceholder": "Buscar por número de pedido o cliente",
  "commerce.customerOrders.tableCaption": "Pedidos de cliente",
  "commerce.customerOrders.listRegionLabel": "Resultados de pedidos",
  "commerce.customerOrders.col.id": "Pedido",
  "commerce.customerOrders.col.customer": "Cliente",
  "commerce.customerOrders.col.status": "Estado",
  "commerce.customerOrders.col.amount": "Importe",
  "commerce.customerOrders.col.date": "Actualizado",
  "commerce.customerOrders.pagination.count": "{start}\u2013{end} de {count} pedidos",
  "commerce.customerOrders.empty.title": "Aún no hay pedidos",
  "commerce.customerOrders.empty.description":
    "Los pedidos del catálogo y cotizaciones aparecen aquí al confirmarse.",
  "commerce.customerOrders.empty.cta": "Actualizar lista",
  "commerce.customerOrders.error.title": "No se pudieron cargar los pedidos",
  "commerce.customerOrders.error.retry": "Reintentar",
  "commerce.customerOrders.detail.eyebrow": "Pedido de cliente",
  "commerce.customerOrders.detail.summaryLabel": "Resumen del pedido",
  "commerce.customerOrders.detail.stat.status": "Estado",
  "commerce.customerOrders.detail.attributesLabel": "Detalles",
  "commerce.customerOrders.detail.attributesTitle": "Atributos del pedido",
  "commerce.customerOrders.detail.fieldset.identity": "Identidad y cliente",
  "commerce.customerOrders.detail.fieldset.schedule": "Planificación",
  "commerce.customerOrders.detail.lineItemsLabel": "Líneas",
  "commerce.customerOrders.detail.lineItemsTitle": "Productos en el pedido",
  "commerce.customerOrders.detail.lineItemsEmpty": "No hay líneas para este pedido.",
  "commerce.customerOrders.detail.lineItemsTableCaption": "Líneas del pedido",
  "commerce.customerOrders.detail.col.description": "Descripción",
  "commerce.customerOrders.detail.col.qty": "Cant.",
  "commerce.customerOrders.detail.col.total": "Total línea",
  "commerce.customerOrders.detail.historyLabel": "Actividad",
  "commerce.customerOrders.detail.historyTitle": "Cronología del pedido",
  "commerce.customerOrders.detail.timelineEmpty": "Aún no hay eventos.",
  "commerce.customerOrders.detail.action.editOrder": "Editar pedido",
  "commerce.customerOrders.detail.action.deleteOrder": "Eliminar pedido",

  // Commerce – RFQs (ERP lists + detail)
  "commerce.rfqs.title": "Solicitudes de cotización",
  "commerce.rfqs.subtitle": "Supervise volumen de RFQ, responsables y seguimiento al cliente.",
  "commerce.rfqs.action.createRequest": "Iniciar RFQ pública",
  "commerce.rfqs.action.viewRequest": "Ver solicitud",
  "commerce.rfqs.search": "Buscar solicitudes",
  "commerce.rfqs.searchLabel": "Buscar RFQ",
  "commerce.rfqs.searchPlaceholder": "N.º, título o cliente",
  "commerce.rfqs.tableCaption": "Solicitudes de cotización",
  "commerce.rfqs.listRegionLabel": "Resultados RFQ",
  "commerce.rfqs.col.id": "Solicitud",
  "commerce.rfqs.col.name": "Título",
  "commerce.rfqs.col.customer": "Cliente",
  "commerce.rfqs.col.status": "Estado",
  "commerce.rfqs.col.amount": "Presupuesto",
  "commerce.rfqs.col.date": "Solicitado",
  "commerce.rfqs.pagination.count": "{start}\u2013{end} de {count} solicitudes",
  "commerce.rfqs.empty.title": "Aún no hay RFQ",
  "commerce.rfqs.empty.description": "Las solicitudes de clientes aparecen aquí al enviarse.",
  "commerce.rfqs.empty.cta": "Actualizar lista",
  "commerce.rfqs.error.title": "No se pudieron cargar las RFQ",
  "commerce.rfqs.error.retry": "Reintentar",
  "commerce.rfqs.detail.eyebrow": "Solicitud de cotización",
  "commerce.rfqs.detail.summaryLabel": "Resumen RFQ",
  "commerce.rfqs.detail.stat.status": "Estado",
  "commerce.rfqs.detail.attributesLabel": "Detalles",
  "commerce.rfqs.detail.attributesTitle": "Atributos RFQ",
  "commerce.rfqs.detail.fieldset.identity": "Identidad y cliente",
  "commerce.rfqs.detail.fieldset.schedule": "Planificación",
  "commerce.rfqs.detail.lineItemsLabel": "Líneas",
  "commerce.rfqs.detail.lineItemsTitle": "Ítems solicitados",
  "commerce.rfqs.detail.lineItemsEmpty": "No hay líneas en esta solicitud.",
  "commerce.rfqs.detail.lineItemsTableCaption": "Líneas RFQ",
  "commerce.rfqs.detail.col.description": "Descripción",
  "commerce.rfqs.detail.col.qty": "Cant.",
  "commerce.rfqs.detail.col.unitPrice": "Precio unitario",
  "commerce.rfqs.detail.historyLabel": "Actividad",
  "commerce.rfqs.detail.historyTitle": "Cronología RFQ",
  "commerce.rfqs.detail.timelineEmpty": "Aún no hay eventos.",
  "commerce.rfqs.detail.action.editRequest": "Editar solicitud",
  "commerce.rfqs.detail.action.deleteRequest": "Eliminar solicitud",

  // Commerce – compliance
  "commerce.compliance.contract": "Contrato",
  "commerce.compliance.contractTooltip": "Comprado a precios contractuales",
  "commerce.compliance.offContract": "Fuera de contrato",
  "commerce.compliance.offContractWithCatalog": "Fuera de contrato ({catalogType})",

  // Commerce – fulfilment
  "commerce.fulfilment.blindFulfilment": "Cumplimiento ciego",
  "commerce.fulfilment.blindFulfilmentDescription":
    "Ocultar los datos del proveedor en albaranes y documentos de entrega.",
  "commerce.fulfilment.configDescription":
    "Configure el cumplimiento ciego y las reglas de embalaje para este socio.",
  "commerce.fulfilment.configTitle": "Configuración de cumplimiento",
  "commerce.fulfilment.packagingRules": "Reglas de embalaje",
  "commerce.fulfilment.saveConfig": "Guardar configuración",
  "commerce.fulfilment.toggleBlind": "Alternar cumplimiento ciego",

  // Commerce – orders (customer order history list)
  "commerce.orders.date": "Fecha",
  "commerce.orders.emptyDescription":
    "Cuando realice pedidos, aparecerán aquí con el estado y los totales.",
  "commerce.orders.emptyTitle": "Aún no hay pedidos",
  "commerce.orders.filterBarDescription":
    "Los resultados se actualizan tras una breve pausa al escribir. Use «Borrar todos los filtros» para restablecer la lista.",
  "commerce.orders.filterBarEyebrow": "Filtros",
  "commerce.orders.filterBarTitle": "Buscar pedidos",
  "commerce.orders.filteredEmptyDescription":
    "Pruebe otras palabras clave o borre los filtros para ver todos los pedidos.",
  "commerce.orders.filteredEmptyTitle": "Ningún resultado coincide con sus filtros",
  "commerce.orders.items": "Artículos",
  "commerce.orders.orderNumber": "Pedido",
  "commerce.orders.reorder": "Volver a pedir",
  "commerce.orders.resultCount": "{count} pedidos",
  "commerce.orders.search": "Buscar",
  "commerce.orders.searchLabel": "Buscar pedidos",
  "commerce.orders.searchPlaceholder": "Buscar por número de pedido…",
  "commerce.orders.status": "Estado",
  "commerce.orders.subtitle":
    "Revise compras anteriores, totales y vuelva a pedir en un solo lugar.",
  "commerce.orders.tableLabel": "Historial de pedidos",
  "commerce.orders.title": "Historial de pedidos",
  "commerce.orders.total": "Total",
  "commerce.orders.view": "Ver pedido",

  // Commerce – knowledge base
  "commerce.knowledgeBase.categoryLegend": "Categorías",
  "commerce.knowledgeBase.emptyDescription":
    "Explore guías y respuestas redactadas para socios y operaciones.",
  "commerce.knowledgeBase.emptyTitle": "Aún no hay artículos",
  "commerce.knowledgeBase.filterBarDescription":
    "Los resultados se actualizan tras una breve pausa al escribir. Las categorías se mantienen hasta que elija «Todos» o «Borrar todos los filtros».",
  "commerce.knowledgeBase.filterBarEyebrow": "Filtros",
  "commerce.knowledgeBase.filterBarTitle": "Buscar artículos",
  "commerce.knowledgeBase.filteredEmptyDescription":
    "Pruebe otras palabras clave, otra categoría o borre todos los filtros.",
  "commerce.knowledgeBase.filteredEmptyTitle": "Ningún resultado coincide con sus filtros",
  "commerce.knowledgeBase.loadingArticles": "Cargando artículos",
  "commerce.knowledgeBase.resultCount": "{count} artículos",
  "commerce.knowledgeBase.search": "Buscar",
  "commerce.knowledgeBase.searchLabel": "Buscar artículos",
  "commerce.knowledgeBase.searchPlaceholder": "Buscar en títulos y etiquetas…",
  "commerce.knowledgeBase.subtitle":
    "Encuentre guías de producto, políticas y artículos prácticos.",
  "commerce.knowledgeBase.title": "Base de conocimiento",
  "commerce.knowledgeBase.views": "vistas",

  // Commerce – products
  "commerce.products.addToCart": "Añadir al carrito",
  "commerce.products.allProducts": "Todos los productos",
  "commerce.products.availability": "Disponibilidad",
  "commerce.products.categories": "Categorías",
  "commerce.products.categoryNav": "Navegación por categoría de producto",
  "commerce.products.customerPartNumber": "Nº de pieza del cliente",
  "commerce.products.days": "días",
  "commerce.products.description": "Descripción",
  "commerce.products.emptyDescription":
    "Intente ajustar su búsqueda o filtros para encontrar lo que busca.",
  "commerce.products.emptyTitle": "No se encontraron productos",
  "commerce.products.imageGallery": "Galería de imágenes del producto",
  "commerce.products.inStock": "en stock",
  "commerce.products.leadTime": "Tiempo de entrega",
  "commerce.products.loadingProducts": "Cargando productos",
  "commerce.products.minOrderQty": "Cantidad mínima de pedido",
  "commerce.products.noSearchResults": 'No se encontraron resultados para "{query}".',
  "commerce.products.noStockInfo": "La información de stock no está disponible para este producto.",
  "commerce.products.notFound": "Producto no encontrado",
  "commerce.products.notFoundDescription": "El producto que busca no existe o ha sido eliminado.",
  "commerce.products.pricing": "Precios",
  "commerce.products.quantity": "Cantidad",
  "commerce.products.relatedProducts": "Productos relacionados",
  "commerce.products.search": "Buscar",
  "commerce.products.searchLabel": "Buscar productos",
  "commerce.products.searchPlaceholder": "Buscar productos...",
  "commerce.products.searchResults": "Resultados de búsqueda",
  "commerce.products.specifications": "Especificaciones",
  "commerce.products.subtitle": "Explore nuestro catálogo de productos.",
  "commerce.products.filterBarEyebrow": "Filtros",
  "commerce.products.filterBarTitle": "Buscar en el catálogo",
  "commerce.products.filterBarDescription":
    "\nLos resultados se actualizan tras una breve pausa al escribir. La categoría se mantiene hasta que elija Todos los productos o Borrar todos los filtros.",
  "commerce.products.title": "Productos",
  "commerce.products.unitOfMeasure": "Unidad de medida",
  "commerce.products.viewAllResults": "Ver los {count} resultados",
  "commerce.products.viewDetails": "Ver detalles",

  // Commerce – reseller
  "commerce.reseller.blindFulfillment": "Cumplimiento ciego",
  "commerce.reseller.contactSupport": "Contactar soporte",
  "commerce.reseller.refreshOrders": "Actualizar historial de pedidos",
  "commerce.reseller.refreshInvoices": "Actualizar facturas",
  "commerce.reseller.dashboardDescription":
    "Gestione su perfil de revendedor y siga el rendimiento.",
  "commerce.reseller.dashboardTitle": "Panel de revendedor",
  "commerce.reseller.date": "Fecha",
  "commerce.reseller.discount": "Descuento",
  "commerce.reseller.discountRate": "Tasa de descuento",
  "commerce.reseller.freightEligible": "Elegible para flete",
  "commerce.reseller.invoiceNumber": "Factura n.º",
  "commerce.reseller.invoices": "Facturas",
  "commerce.reseller.invoicesEmptyDescription":
    "Las facturas aparecen aquí cuando reciba documentos facturables.",
  "commerce.reseller.invoicesEmptyTitle": "Aún no hay facturas",
  "commerce.reseller.invoicesTableAria": "Facturas del revendedor",
  "commerce.reseller.onboarded": "Incorporado",
  "commerce.reseller.orderHistory": "Historial de pedidos",
  "commerce.reseller.orderNumber": "Pedido n.º",
  "commerce.reseller.ordersEmptyDescription":
    "Los pedidos aparecen aquí después de realizarlos en el portal.",
  "commerce.reseller.ordersEmptyTitle": "Aún no hay pedidos",
  "commerce.reseller.ordersTableAria": "Historial de pedidos del revendedor",
  "commerce.reseller.profileInfo": "Información del perfil",
  "commerce.reseller.status": "Estado",
  "commerce.reseller.tier": "Nivel",
  "commerce.reseller.total": "Total",
  "commerce.reseller.partyName": "Socio",
  "commerce.reseller.blind": "Envío ciego",
  "commerce.reseller.freight": "Flete",
  "commerce.reseller.volumeThreshold": "Umbral de volumen",
  "commerce.reseller.actions": "Acciones",
  "commerce.reseller.adminTitle": "Administración de revendedores",
  "commerce.reseller.adminDescription":
    "Revise niveles de socios, opciones de cumplimiento y estado de incorporación.",
  "commerce.reseller.createProfile": "Crear perfil de revendedor",
  "commerce.reseller.totalResellers": "Revendedores totales",
  "commerce.reseller.activeResellers": "Revendedores activos",
  "commerce.reseller.noResellers": "Ningún perfil de revendedor coincide con el filtro actual.",
  "commerce.reseller.profilesTableAria": "Perfiles de revendedor",

  // Commerce – spending limits
  "commerce.spending.active": "Activo",
  "commerce.spending.addLimit": "Añadir límite de gasto",
  "commerce.spending.annually": "Anualmente",
  "commerce.spending.currency": "Moneda",
  "commerce.spending.delete": "Eliminar",
  "commerce.spending.edit": "Editar",
  "commerce.spending.emptyDescription":
    "Configure límites de gasto para controlar los presupuestos de compra por rol.",
  "commerce.spending.emptyTitle": "No hay límites de gasto configurados",
  "commerce.spending.inactive": "Inactivo",
  "commerce.spending.limit": "Límite",
  "commerce.spending.limitAmount": "Monto del límite",
  "commerce.spending.monthly": "Mensual",
  "commerce.spending.period": "Período",
  "commerce.spending.quarterly": "Trimestral",
  "commerce.spending.role": "Rol",
  "commerce.spending.saveLimit": "Guardar límite",
  "commerce.spending.selectRole": "Seleccionar un rol",
  "commerce.spending.status": "Estado",
  "commerce.spending.subtitle":
    "Gestione límites de gasto y presupuestos para roles de aprovisionamiento.",
  "commerce.spending.limitsTableAria": "Límites de gasto",
  "commerce.spending.title": "Límites de gasto",
  "commerce.spending.user": "Usuario",

  // Commerce – three-way match
  "commerce.threeWayMatch.discrepanciesFound": "Discrepancias encontradas",
  "commerce.threeWayMatch.discrepancy": "Discrepancia",
  "commerce.threeWayMatch.discrepancyCount": "{count} discrepancia(s)",
  "commerce.threeWayMatch.invoiceTotal": "Total factura",
  "commerce.threeWayMatch.invoiceUnitPrice": "Precio unitario factura",
  "commerce.threeWayMatch.invoicedQty": "Cant. facturada",
  "commerce.threeWayMatch.matched": "Concordante",
  "commerce.threeWayMatch.ok": "OK",
  "commerce.threeWayMatch.poQty": "Cant. OC",
  "commerce.threeWayMatch.poTotal": "Total OC",
  "commerce.threeWayMatch.poUnitPrice": "Precio unitario OC",
  "commerce.threeWayMatch.product": "Producto",
  "commerce.threeWayMatch.shipmentTotal": "Total envío",
  "commerce.threeWayMatch.shippedQty": "Cant. enviada",
  "commerce.threeWayMatch.subtitle": "Conciliación triple para la OC {poNumber}.",
  "commerce.threeWayMatch.title": "Conciliación triple",
  "commerce.threeWayMatch.viewPO": "Ver OC",

  // Commerce – usage reports
  "commerce.usageReports.dateFrom": "Fecha desde",
  "commerce.usageReports.dateTo": "Fecha hasta",
  "commerce.usageReports.emptyDescription":
    "Ejecute un informe para ver los datos de uso de compras.",
  "commerce.usageReports.export": "Exportar",
  "commerce.usageReports.filterLabel": "Filtros del informe de uso",
  "commerce.usageReports.grandTotal": "Total general",
  "commerce.usageReports.groupBy": "Agrupar por",
  "commerce.usageReports.groupLabel": "Grupo",
  "commerce.usageReports.orderCount": "Pedidos",
  "commerce.usageReports.runReport": "Ejecutar informe",
  "commerce.usageReports.subtitle": "Analice patrones de compra y gastos por categoría.",
  "commerce.usageReports.title": "Informes de uso",
  "commerce.usageReports.totalQuantity": "Cant. total",
  "commerce.usageReports.totalSpend": "Gasto total",

  // Common – additional keys
  "common.breadcrumb": "Migas de pan",

  /* ── Commerce ────────────────────────────────────────────── */
  "commerce.quickOrder.exampleSkus": "SKU-001 x 10\nSKU-002 x 5\nSKU-003 x 25",

  /* ── Form aria-labels ──────────────────────────────────── */
  "forms.checkout.paymentMethod": "Seleccionar método de pago",
  "forms.punchout.partyName": "Nombre de la parte",
  "forms.punchout.protocol": "Seleccionar protocolo",
  "forms.quickOrder.csvFile": "Archivo CSV",
  "forms.spending.role": "Seleccionar rol",
  "forms.spending.limitAmount": "Monto del límite",
  "forms.spending.currency": "Moneda",
  "forms.spending.period": "Seleccionar período",
  "forms.usageReports.groupBy": "Agrupar por",
  "forms.warehouse.name": "Nombre del almacén",
  "forms.warehouse.code": "Código del almacén",
  "forms.warehouse.type": "Seleccionar tipo de almacén",
  "forms.warehouse.site": "Sede del almacén",

  /* ── Additional errors ─────────────────────────────────── */
  "errors.faqNotFound": "FAQ no encontrada",

  /* ── UI standards (audit) ──────────────────────────────── */
  "common.undo": "Deshacer",
  "common.moreActions": "Más acciones",
  "common.required": "requerido",
  "common.submitting": "Enviando…",
  "common.saving": "Guardando…",
  "common.bulkActionBar": "Barra de acciones masivas",
  "common.dismissNotification": "Descartar notificación",
  "public.catalog.index.gridTitle": "Tracks de servicio",
  "public.catalog.index.empty.title": "Aún no hay tracks de servicio",
  "public.catalog.index.empty.description":
    "Los tracks de servicio aparecerán aquí en cuanto se publiquen.",
  "public.catalog.card.cardLabel": "Ver track de servicio {title}",
  "public.home.catalog.cardLabel": "Ver {title}",
  "public.products.empty.title": "No hay productos que coincidan con tu búsqueda",
  "public.products.empty.description":
    "Prueba con otra palabra clave o elimina los filtros activos.",
  "public.products.empty.clear": "Limpiar búsqueda",
  "public.products.card.cardLabel": "Ver producto {name}",
  "rfq.form.submitting": "Enviando…",
  "rfq.form.eyebrow": "Solicitar cotización",
  "rfq.form.pageDescription": "Describe tus requisitos y responderemos en un día hábil.",
  "rfq.thanks.returnToCatalog": "Volver al catálogo",
  "rfq.draft.title": "Borradores de RFQ",
  "rfq.draft.description": "Retoma un borrador para terminar tu solicitud.",
  "assistant.stream.live": "Mensajes de la conversación",
  "assistant.empty.title": "Inicia la conversación",
  "assistant.empty.description": "Pregunta sobre alcance, entrega o términos comerciales.",
  "assistant.error.disconnected.title": "Conexión perdida",
  "assistant.error.disconnected.description":
    "La transmisión de la conversación se desconectó. La página se reconectará automáticamente.",
  "digital.twin.unsupported.title": "Tu navegador no admite la visualización 3D",
  "digital.twin.unsupported.description":
    "Actualiza a un navegador moderno o habilita WebGL para ver el gemelo digital.",
  "admin.dsar.purgeConfirm.title": "¿Purgar el registro del titular de datos?",
  "admin.dsar.purgeConfirm.description":
    "Esto eliminará permanentemente todos los datos vinculados a {subject}. Esta acción no se puede deshacer.",
  "admin.dsar.purgeConfirm.action": "Purgar datos",
  "admin.user.deleteConfirm.title": "¿Eliminar usuario?",
  "admin.user.deleteConfirm.description":
    "Se revocarán todos los accesos de {user} y se eliminarán sus datos personales. No se puede deshacer.",
  "admin.user.deleteConfirm.action": "Eliminar usuario",
  "admin.tenant.suspendConfirm.title": "¿Suspender inquilino?",
  "admin.tenant.suspendConfirm.description":
    "Todos los miembros de {tenant} perderán acceso de inmediato. Puedes reactivar más tarde.",
  "admin.tenant.suspendConfirm.action": "Suspender inquilino",
  "admin.config.promoteConfirm.title": "¿Promover configuración a {env}?",
  "admin.config.promoteConfirm.description":
    "Esto activará la configuración seleccionada en {env}. Los valores existentes serán archivados.",
  "admin.config.promoteConfirm.action": "Promover configuración",
  "profile.security.session.revokeConfirm.title": "¿Revocar sesión?",
  "profile.security.session.revokeConfirm.description":
    "La sesión seleccionada se cerrará inmediatamente en su dispositivo.",
  "profile.security.session.revokeConfirm.action": "Revocar sesión",
  "profile.security.passkey.deleteConfirm.title": "¿Eliminar passkey?",
  "profile.security.passkey.deleteConfirm.description":
    "Ya no podrás iniciar sesión con este passkey. Puedes registrar uno nuevo en cualquier momento.",
  "profile.security.passkey.deleteConfirm.action": "Eliminar passkey",
  "tasks.kanban.moveTo": "Mover a {status}",
  "cart.toast.removed": "Artículo eliminado del carrito",
  "support.replyForm.legend": "Responder ticket",
  "governance.generated.warning":
    "Este artefacto es generado. Edita en su lugar la fuente canónica.",
  "commerce.product.relatedHeading": "Productos relacionados",
  "common.a11y.toggleSidebar": "Alternar barra lateral",
  "common.a11y.toggleTheme": "Alternar tema",
  "common.a11y.mainNavigation": "Navegación principal",
  "common.a11y.topNavigation": "Barra superior",
  "common.a11y.openProfileMenu": "Abrir menú de perfil",
  "common.actions.settings": "Ajustes",
  "common.actions.logout": "Cerrar sesión",
  "hub.notifications.navbarTitle": "Notificaciones",
  "nav.ecosystemSection": "Ecosistema",
} satisfies I18nDictionary<EnKey>;

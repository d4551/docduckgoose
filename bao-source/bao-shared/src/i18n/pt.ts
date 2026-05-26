import type { EnKey, I18nDictionary } from "./en";

/** PT translation dictionary generated from the English source. */
export const pt = {
  "app.name": "Plataforma operacional",
  "app.tagline": "\nInteligência operacional de ativos",
  "layout.brand": "\nConsole operacional",
  "layout.appHeader": "Cabeçalho do aplicativo",
  "layout.mobileNav": "Navegação móvel principal",
  "layout.sync": "\nSincronizar",
  "layout.toggleTheme": "\nAlternar modo de cor",
  "layout.authChromeNav": "\nNavegação de início de sessão",
  "layout.toggleDarkMode": "\nAlternar modo escuro",
  "layout.userMenu": "\nMenu do usuário",
  "layout.userMenuOpen": "\nAbra o menu do usuário para {name}",
  "layout.signOut": "\nSair",
  "layout.language": "\nIdioma",
  "layout.languageMenu": "\nMenu de idiomas",
  "layout.languageDescription": "\nAlterar idioma de exibição",
  "layout.languageCurrent": "\nIdioma atual: {language}",
  "layout.languageSelectAria": "\nMude o idioma para {language}",
  "layout.languageSaved": "\nIdioma atualizado.",
  "layout.releaseStage": "\nVersão de pré-lançamento",
  "layout.footerNav": "\nNavegação de rodapé",
  "layout.footerTagline":
    "\nSuperfícies de operações renderizadas pelo servidor para inteligência de ativos, fluxo de manutenção e visibilidade transacional.",
  "layout.footerThemeNote": "\nSistema de tema {brandName}",
  "layout.footerCopyright": "\nDireitos autorais © 2026 {brandName}",
  "layout.logoAlt": "Plataforma operacional",
  "roles.admin": "\nAdministrador",
  "roles.estateManager": "\nGerente de Imóveis",
  "roles.maintenanceLead": "\nLíder de Manutenção",
  "roles.fieldTechnician": "\nTécnico de Campo",
  "roles.financeOfficer": "\nDiretor Financeiro",
  "roles.unknown": "\nOperador",
  "admin.systemCounters": "\nContadores do sistema",
  "admin.createAdmin.databaseRequired":
    "\nDefina DATABASE_URL antes de executar o script de inicialização do administrador.",
  "admin.createAdmin.credentialsRequired":
    "\nDefina CREATE_ADMIN_EMAIL e CREATE_ADMIN_PASSWORD antes de executar o script de inicialização do administrador.",
  "admin.createAdmin.updatedRole": "\nUsuário existente {email} atualizado para a função ADMIN.",
  "admin.createAdmin.createdUser": "\nUsuário administrador criado: {email}",
  "common.summary": "\nResumo",
  "common.applyFilters": "\nAplicar filtros",
  "common.userFallback": "\nOperador",
  "common.moreInfo": "\nMais informações",
  "common.moreInfoFor": "\nMais informações sobre {subject}",
  "addDevice.form.submitAria": "\nEnviar registro do dispositivo",
  "layout.mobileNavigation": "\nNavegação móvel",
  "layout.headerNavigation": "\nNavegação do cabeçalho",
  "layout.sidebarNavigation": "\nNavegação primária",
  "nav.dashboard": "\nPainel",
  "nav.assets": "\nAtivos",
  "nav.section.core": "\nNúcleo",
  "nav.section.assets": "\nAtivos",
  "nav.section.account": "\nConta",
  "nav.section.operations": "\nOperações",
  "nav.section.insights": "\nInformações",
  "nav.section.finance": "\nFinanças",
  "nav.section.documents": "\nDocumentos",
  "nav.section.admin": "\nAdministração",
  "nav.section.home": "\nInício",
  "nav.section.operate": "\nOperar",
  "nav.section.monitor": "\nMonitor",
  "nav.section.plan": "\nPlano",
  "nav.section.commercial": "\nComercial",
  "nav.section.procurement": "\nAquisições",
  "nav.section.control": "\nControle",
  "nav.predictions": "\nPrevisões",
  "nav.tasks": "\nTarefas",
  "nav.finance": "\nFinanças",
  "nav.financePlanning": "\nPlanejamento Financeiro",
  "nav.estate": "\nPropriedade",
  "nav.portfolio": "\nPortfólio",
  "nav.rfqs": "\nSolicitações de cotação",
  "nav.customerOrders": "\nPedidos de clientes",
  "nav.workOrders": "\nOrdens de Serviço",
  "nav.purchaseOrders": "\nPedidos de compra",
  "nav.invoices": "\nFaturas",
  "nav.fleet": "\nFrota",
  "nav.buildings": "\nEdifícios",
  "nav.sensors": "\nSensores",
  "nav.reports": "\nRelatórios",
  "nav.aiPlayground": "Playground de IA",
  "nav.agentic": "Agêntico",
  "nav.agenticStorage": "Armazenamento agêntico",
  "app.nav.git": "Áreas de trabalho",
  "app.nav.repos": "Repositórios hospedados",
  "app.nav.activity": "Atividade de prontidão de lançamento",
  "registry.nav.publish": "Publicar pacotes",
  "nav.sandbox": "Permissões de sandbox",
  "nav.utilisation": "\nUtilização",
  "nav.admin": "Administracao",
  "nav.digitalTwin": "\nGêmeo Digital",
  "nav.openSidebar": "\nAbrir barra lateral",
  "nav.closeSidebar": "\nFechar barra lateral",
  "nav.skipToContent": "\nPular para o conteúdo principal",
  "nav.breadcrumb": "\nPão ralado",
  "nav.breadcrumbTruncated": "Mais",
  "nav.profile": "\nPerfil",
  "nav.customisation": "\nPersonalização",
  "nav.kanban": "\nKanban",
  "nav.addDevice": "\nAdicionar dispositivo",
  "nav.deviceHistory": "\nHistórico do dispositivo",
  "nav.userRole": "\nFunção do usuário",
  "locale.option.en": "\nInglês",
  "locale.option.de": "\nAlemão",
  "locale.option.fr": "\nFrancês",
  "locale.option.es": "\nEspanhol",
  "locale.option.it": "\nItaliano",
  "locale.option.pt": "\nPortuguês",
  "public.meta.description":
    "\nUma plataforma para captura de demanda pública, documentos comerciais, visibilidade de parceiros, orientação de IA, relatórios e comércio assistido por máquina.",
  "public.nav.home": "\nInício",
  "public.nav.catalog": "\nCatálogo",
  "public.nav.requestQuote": "\nSolicitar orçamento",
  "public.nav.startRfq": "\nIniciar RFQ",
  "public.nav.signIn": "\nEntrar",
  "public.assistant.breadcrumb.session": "\nSessão do assistente",
  "public.assistant.breadcrumb.transcript": "\nTranscrição",
  "public.footer.description":
    "\nCaptação de público, controle comercial, visibilidade de parceiros, orientação de IA, relatórios e automação para operações baseadas em documentos.",
  "public.footer.rfq": "Pedido de cotação (RFQ)",
  "public.footer.portalSignIn": "\nLogin do portal",
  "public.page.catalog": "\nCatálogo",
  "public.page.requestQuote": "\nSolicitar orçamento",
  "public.page.rfqSubmitted": "\nRFQ enviada",
  "public.assistant.panel.eyebrow": "\nAssistente público",
  "public.assistant.panel.formAria": "\nIniciar uma sessão de assistente público",
  "public.assistant.panel.titleLabel": "\nTítulo da sessão",
  "public.assistant.panel.descriptionLabel": "\nSolicitação de sessão",
  "public.assistant.panel.titleHint":
    "\nUse uma etiqueta curta que corresponda ao escopo do serviço ou solicitação que está sendo preparada.",
  "public.assistant.panel.descriptionHint":
    "Resuma o escopo, o prazo, as aprovações e as restrições de entrega que o assistente deve preservar.",
  "public.assistant.panel.titlePlaceholder": "\nExemplo: Planejamento de confiabilidade de ativos",
  "public.assistant.panel.descriptionPlaceholder":
    "\nExemplo: capture o escopo do site, as datas solicitadas, as dependências e os acionadores de escalonamento antes do envio da RFQ.",
  "public.assistant.panel.helpText":
    "\nIsso cria uma sessão de assistente público para o contexto da página atual.",
  "public.assistant.panel.launchError":
    "\nA sessão do assistente não pôde ser iniciada. Revise o contexto atual e tente novamente.",
  "public.assistant.panel.submit": "\nIniciar sessão do assistente",
  "public.assistant.catalog.title": "\nAssistente de catálogo",
  "public.assistant.catalog.description":
    "\nUse os detalhes do catálogo atual como contexto e depois passe para a sessão do assistente público.",
  "public.assistant.rfq.title": "\nAssistente de RFQ",
  "public.assistant.rfq.description":
    "\nCrie uma sessão de assistente público com o contexto da página RFQ antes de a solicitação ser enviada.",
  "public.assistant.rfq.prompt":
    "\nCapture o contexto da solicitação, esclareça o escopo e prepare a transferência pública.",
  "public.assistant.rfq.bundlePrompt":
    "\nCapture o contexto de solicitação agrupado para {services}, esclareça o escopo e prepare a transferência pública.",
  "public.assistant.started.description":
    "\nA sessão do assistente público está pronta. Continue refinando a solicitação com o mesmo contexto.",
  "public.assistant.started.openAction": "\nSessão aberta",
  "public.assistant.started.sessionLabel": "\nID da sessão pública",
  "public.assistant.started.restartAction": "\nIniciar outra sessão",
  "public.assistant.started.nextStepsTitle": "\nPróximas etapas",
  "public.assistant.started.nextStep.session":
    "\nContinue a sessão ao vivo para obter esclarecimentos e preservar o contexto do comprador.",
  "public.assistant.started.nextStep.context":
    "\nRetorne à página atual quando precisar atualizar o escopo, os detalhes da RFQ ou o contexto do catálogo.",
  "public.assistant.started.nextStep.handoff":
    "\nEscalar dentro da sessão quando for necessária a revisão do operador ou uma transferência pública.",
  "public.assistant.workspace.eyebrow": "\nSessão de assistente público",
  "public.assistant.workspace.summaryTitle": "\nResumo da sessão",
  "public.assistant.workspace.sessionBadge": "\nSessão ao vivo",
  "public.assistant.workspace.sessionIdLabel": "\nID da sessão",
  "public.assistant.workspace.contextLabel": "\nContexto capturado",
  "public.assistant.workspace.messageCountLabel": "\nMensagens capturadas",
  "public.assistant.workspace.participantCountLabel": "\nParticipantes",
  "public.assistant.workspace.linkedRecordCountLabel": "\nRegistros vinculados",
  "public.assistant.workspace.sameThreadLabel": "\nModelo de rosca",
  "public.assistant.workspace.sameThreadValue": "\nThread persistente único",
  "public.assistant.workspace.completenessLabel": "\nCompletude",
  "public.assistant.workspace.completenessReady": "\nPronto para transferência comercial",
  "public.assistant.workspace.completenessNeedsWork":
    "\nCapture mais escopo antes da transferência",
  "public.assistant.workspace.historyTitle": "\nHistórico da sessão",
  "public.assistant.workspace.historyStartedTitle": "\nConversa iniciada",
  "public.assistant.workspace.historyStartedEmpty": "\nAguardando a primeira mensagem capturada.",
  "public.assistant.workspace.historyStartedDescription":
    "\nA primeira mensagem com escopo definido foi capturada em {timestamp}.",
  "public.assistant.workspace.historyLatestTitle": "\nÚltima atualização",
  "public.assistant.workspace.historyLatestEmpty": "\nNenhum acompanhamento foi registrado ainda.",
  "public.assistant.workspace.historyLatestDescription":
    "\n{author} postou a atualização mais recente em {timestamp}.",
  "public.assistant.workspace.historyTranscriptTitle": "\nCobertura da transcrição",
  "public.assistant.workspace.historyTranscriptDescription":
    "{count} entradas de transcrição estão disponíveis para exportação e revisão.",
  "public.assistant.workspace.historyParticipantsTitle": "\nContinuidade do participante",
  "public.assistant.workspace.historyParticipantsDescription":
    "\n{participants} perfis de participantes são anexados ao mesmo tópico persistente.",
  "public.assistant.workspace.historyShareTitle": "\nRegistro compartilhado",
  "public.assistant.workspace.historyShareEmpty":
    "\nNenhuma solicitação de cotação ou registro de catálogo relacionado está vinculado ainda.",
  "public.assistant.workspace.historyShareDescription":
    "\nVinculado a {record} para a próxima transferência de fluxo de trabalho.",
  "public.assistant.workspace.historyCloseoutTitle": "\nProntidão de encerramento",
  "public.assistant.workspace.historyCloseoutReady":
    "\nA sessão tem contexto suficiente para exportar, compartilhar e encaminhar para o próximo fluxo de trabalho.",
  "public.assistant.workspace.historyCloseoutPending":
    "\nCapture um pouco mais de escopo ou ligação antes de tratar esta sessão como pronta para transferência.",
  "public.assistant.workspace.exportTranscript": "\nExportar transcrição",
  "public.assistant.transcript.documentTitle": "\nTranscrição do assistente",
  "public.assistant.transcript.eyebrow": "\nAssistente público",
  "public.assistant.transcript.description":
    "\nHistórico completo de mensagens desta sessão. Use o navegador para imprimir ou guardar como PDF.",
  "public.assistant.transcript.backToConversation": "\nVoltar à conversa",
  "public.assistant.transcript.fallbackTitle": "\nSessão {id}",
  "public.assistant.transcript.tableAria": "\nTranscrição da conversa",
  "public.assistant.transcript.colTime": "\nHora",
  "public.assistant.transcript.colAuthor": "\nAutor",
  "public.assistant.transcript.colMessage": "\nMensagem",
  "public.assistant.transcript.emptyTitle": "\nAinda não há mensagens",
  "public.assistant.transcript.emptyDescription":
    "\nAs mensagens aparecem aqui quando o assistente regista respostas nesta sessão.",
  "public.assistant.transcript.notFoundTitle": "\nSessão indisponível",
  "public.assistant.transcript.notFoundDescription":
    "\nNão foi possível carregar esta conversação. Pode ter expirado ou a ligação estar incorreta.",
  "public.assistant.workspace.shareSummary": "\nCompartilhar resumo",
  "public.assistant.workspace.shareHistoryHint":
    "\nCompartilhe o resumo do tópico ou exporte a transcrição antes de mover a entrada para um fluxo de trabalho downstream.",
  "public.assistant.workspace.shareSubject": "\nResumo do assistente público: {title}",
  "public.assistant.workspace.continuityTitle": "\nInstantâneo de continuidade",
  "public.assistant.workspace.continuityDescription":
    "\nMantenha o contexto da sessão ao vivo, os registros vinculados e a resposta mais recente visíveis antes da transferência.",
  "public.assistant.workspace.continuityContextLabel": "\nContexto da página",
  "public.assistant.workspace.continuityParticipantsValue": "\n{count} participante(s)",
  "public.assistant.workspace.continuityContextFallback":
    "\nNenhum contexto de página está anexado a esta sessão do assistente público ainda.",
  "public.assistant.workspace.continuityLinkedLabel": "\nRegistros vinculados",
  "public.assistant.workspace.continuityLinkedValue": "\n{count} registro(s) vinculado(s)",
  "public.assistant.workspace.continuityLatestLabel": "\nÚltima resposta",
  "public.assistant.workspace.continuityLatestValue": "\n{author} respondeu em {timestamp}.",
  "public.assistant.workspace.handoffTitle": "\nComo funciona a transferência",
  "public.assistant.workspace.handoffDescription":
    "\nUse esta sessão para capturar o escopo, esclarecer requisitos e escalar para operações quando uma revisão comercial for necessária.",
  "public.assistant.workspace.stepCaptureTitle": "\nEscopo de captura",
  "public.assistant.workspace.stepCaptureDescription":
    "\nMantenha o escopo, as datas, as aprovações e as restrições do comprador na mesma sessão persistente.",
  "public.assistant.workspace.stepClarifyTitle": "\nEsclareça com AI",
  "public.assistant.workspace.stepClarifyDescription":
    "\nUse resumos e respostas para restringir a solicitação sem perder o contexto do thread existente.",
  "public.assistant.workspace.stepEscalateTitle": "\nEscalar de forma limpa",
  "public.assistant.workspace.stepEscalateDescription":
    "\nCrie uma nota de transferência quando a sessão estiver pronta para revisão interna do operador.",
  "public.assistant.workspace.composeDescription":
    "\nAdicione notas de sessão duráveis para que o escopo, o prazo de entrega e as aprovações permaneçam vinculados ao mesmo tópico de entrada.",
  "public.assistant.workspace.composeHint":
    "\nCapture o contexto do comprador aqui antes de solicitar uma transferência do operador.",
  "public.assistant.workspace.aiActionsDescription":
    "\nUse resumos para reforçar a discussão e notas de transferência para aumentar a entrada de público nas operações.",
  "public.assistant.workspace.returnAction": "\nRetornar à página de origem",
  "public.assistant.workspace.missingTitle": "\nSessão do assistente público indisponível",
  "public.assistant.workspace.missingDescription":
    "A sessão do assistente solicitada não pôde ser carregada. Retorne aos detalhes do catálogo ou página de RFQ para iniciar uma nova sessão.",
  "public.catalog.card.track": "\nFaixa de serviço",
  "public.catalog.card.viewScope": "\nVer escopo",
  "public.catalog.card.requestQuote": "\nSolicitar orçamento",
  "public.catalog.card.deliverables": "entregáveis",
  "public.home.page.title":
    "\nUma plataforma para captura de demanda, controle de entrega e visibilidade de parceiros.",
  "public.home.page.description":
    "\n{brandName} transforma solicitações dispersas em pedidos rastreados.",
  "public.home.hero.badge": "\nSite público, operações, portal, IA e UCP",
  "public.home.hero.title":
    "\nTransforme solicitações, pedidos, trabalho de campo, compras e relatórios em um fluxo operacional conectado.",
  "public.home.hero.description": "\nEnviado quinta, aprovado sexta, rastreado até faturamento.",
  "public.home.hero.primaryCta": "\nIniciar uma RFQ",
  "public.home.hero.secondaryCta": "\nProcure soluções",
  "public.home.hero.stat.documents": "\nTipos de documento",
  "public.home.hero.stat.documentsValue": "6",
  "public.home.hero.stat.surfaces": "\nSuperfícies",
  "public.home.hero.stat.surfacesValue": "4",
  "public.home.hero.stat.surfacesDesc": "Web, API, portal, UCP",
  "public.home.hero.stat.database": "\nEspaços de trabalho",
  "public.home.hero.stat.databaseValue": "3",
  "public.home.hero.stat.databaseDesc": "Ops, comércio, portal",
  "public.home.delivery.eyebrow": "\nModelo de entrega",
  "public.home.delivery.title": "\nCitado, com escopo definido, visível para o parceiro.",
  "public.home.delivery.step.submit": "\nEnviar RFQ",
  "public.home.delivery.step.qualify": "\nQualifique-se e cote",
  "public.home.delivery.step.convert": "\nConverter para pedido",
  "public.home.delivery.step.track": "\nAcompanhar execução e faturamento",
  "public.home.map.aria": "\nResumo de capacidade da plataforma",
  "public.home.map.intake.title": "\nIngestão",
  "public.home.map.intake.value": "\nSite público e UCP",
  "public.home.map.intake.description":
    "\nCapture solicitações de compradores, parceiros e fluxos de checkout assistidos por máquina.",
  "public.home.map.documents.title": "\nDocumentos",
  "public.home.map.documents.value": "\nRFQs para faturas",
  "public.home.map.documents.description":
    "\nMantenha preços, aprovações, cumprimento, aquisição e faturamento em um único documento.",
  "public.home.map.operations.title": "\nOperações",
  "public.home.map.operations.value": "\nAtivos, trabalho e telemetria",
  "public.home.map.operations.description":
    "\nImplantar equipes, monitorar atividade, capturar conclusão.",
  "public.home.map.intelligence.title": "\nInteligência",
  "public.home.map.intelligence.value": "\nIA, automação e ML",
  "public.home.map.intelligence.description":
    "\nResumos de IA, ações programadas, previsões de escassez.",
  "public.home.flow.eyebrow": "\nFluxo de negócios",
  "public.home.flow.title": "\nComo o trabalho se move pela plataforma",
  "public.home.flow.description":
    "\n{brandName} mantém a captura de demanda, entrega, visibilidade do parceiro e ações de acompanhamento no mesmo registro, em vez de reinserir o trabalho em ferramentas desconectadas.",
  "public.home.flow.step.capture.label": "\nCaptura",
  "public.home.flow.step.capture.content":
    "\nClientes, parceiros ou clientes de máquina começam com contexto de checkout de catálogo, RFQ ou UCP.",
  "public.home.flow.step.qualify.label": "\nQualificar",
  "public.home.flow.step.qualify.content": "\nBloquear escopo, cronograma e taxas.",
  "public.home.flow.step.deliver.label": "\nEntregar",
  "public.home.flow.step.deliver.content": "\nOrdem de serviço emitida, portal atualizado.",
  "public.home.flow.step.improve.label": "\nMelhorar",
  "public.home.flow.step.improve.content": "\nAlertas, previsões e pontuações de conformidade.",
  "public.home.flow.card.eyebrow": "\nComece externamente, termine com control",
  "public.home.flow.card.title":
    "\nComece com a necessidade do negócio, não com outra forma desconectada.",
  "public.home.flow.card.description":
    "\nA entrada pública permanece conectada a documentos posteriores, evidências de cumprimento, atualizações do portal e status da fatura.",
  "public.home.flow.card.cta": "\nIniciar uma RFQ",
  "public.home.surfaces.eyebrow": "\nSuperfícies da plataforma",
  "public.home.surfaces.title": "\nUma plataforma, quatro formas conectadas em",
  "public.home.surfaces.description":
    "\nPúblicos diferentes usam espaços de trabalho diferentes, mas todos dependem do mesmo registro comercial subjacente.",
  "public.home.surfaces.public.eyebrow": "\nPúblico",
  "public.home.surfaces.public.title": "\nSite público e comércio de máquinas",
  "public.home.surfaces.public.description":
    "\nUse páginas de catálogo, entrada de RFQ e pontos finais de comerciante UCP para iniciar a demanda de compradores ou máquinas.",
  "public.home.surfaces.commerce.eyebrow": "\nComercial",
  "public.home.surfaces.commerce.title": "\nControle comercial",
  "public.home.surfaces.commerce.description":
    "\nMantenha RFQs, pedidos de clientes, pedidos de compra, ordens de serviço e faturas conectados em vez de inseri-los novamente nas ferramentas.",
  "public.home.surfaces.operations.eyebrow": "\nOperações",
  "public.home.surfaces.operations.title": "\nEntrega operacional",
  "public.home.surfaces.operations.description":
    "\nExecute ativos, tarefas, planejamento, finanças, utilização, frota, edifícios, sensores e supervisão de gêmeos digitais.",
  "public.home.surfaces.portal.eyebrow": "\nPortal",
  "public.home.surfaces.portal.title": "\nVisibilidade no escopo do parceiro",
  "public.home.surfaces.portal.description":
    "\nDê aos clientes e parceiros visibilidade de status compartilhado e bate-papo sem expor todo o espaço de trabalho interno.",
  "public.home.persona.eyebrow": "\nEscolha o seu ponto de partida",
  "public.home.persona.title": "\nDirecione cada público para o espaço de trabalho certo primeiro",
  "public.home.persona.description":
    "\nOs compradores devem começar com a captura do escopo, os operadores devem chegar ao espaço de trabalho de comando e os parceiros devem entrar no portal compartilhado sem procurar telas extras.",
  "public.home.persona.buyer.eyebrow": "\nComprador",
  "public.home.persona.buyer.title": "\nCapture um requisito e vá direto para RFQ",
  "public.home.persona.buyer.description": "\nNavegar, comparar e solicitar cotação.",
  "public.home.persona.buyer.action": "Iniciar captação de compradores",
  "public.home.persona.operations.eyebrow": "\nOperador",
  "public.home.persona.operations.title": "\nRetorne ao espaço de trabalho de operações ao vivo",
  "public.home.persona.operations.description": "\nDespachar, monitorar e confirmar conclusão.",
  "public.home.persona.operations.action": "\nEspaço de trabalho de operações abertas",
  "public.home.persona.partner.eyebrow": "\nParceiro",
  "public.home.persona.partner.title": "\nFaça login no portal do parceiro com a conta correta",
  "public.home.persona.partner.description": "\nRastrear entregas e baixar faturas.",
  "public.home.persona.partner.action": "\nAcesso de parceiro aberto",
  "public.home.catalog.eyebrow": "\nCatálogo",
  "public.home.catalog.title": "\nPistas de serviço construídas no mesmo modelo operacional",
  "public.home.catalog.description":
    "\nEssas ofertas públicas mostram como a plataforma transforma movimentos de serviço comuns em entrega controlada e execução visível para o parceiro.",
  "public.home.catalog.seeAll": "\nVer todas as ofertas",
  "public.home.catalog.compareTitle": "\nCompare o encaixe operacional antes de abrir uma cotação",
  "public.home.catalog.continuityTitle":
    "\nMantenha a lista curta estável enquanto a entrada avança",
  "public.home.catalog.fitLabel": "\nEncaixe operacional",
  "public.home.intelligence.eyebrow": "\nCamada de inteligência",
  "public.home.intelligence.title":
    "\nIA, relatórios, automação e ML permanecem vinculados aos mesmos registros",
  "public.home.intelligence.description":
    "\nEstas capacidades não são produtos ou exportações separadas. Eles usam os mesmos pedidos, trabalho, telemetria e contexto de parceiro em que as equipes já operam.",
  "public.home.intelligence.supportTitle": "\nO que permanece ligado ao mesmo registro",
  "public.home.intelligence.ai.eyebrow": "\nAssistente de IA",
  "public.home.intelligence.ai.title": "\nIA que funciona no contexto de negócios",
  "public.home.intelligence.ai.description":
    "\nResuma as solicitações, explique o contexto, compare as atividades relacionadas e ajude as equipes a escolher a próxima etapa operacional.",
  "public.home.intelligence.reporting.eyebrow": "\nRelatórios e ciência de dados",
  "public.home.intelligence.reporting.title":
    "\nRelatórios e ciência de dados próximos da execução",
  "public.home.intelligence.reporting.description":
    "\nCrie pacotes de relatórios, revisões operacionais, previsões e visualizações de anomalias sem mover o trabalho para um segundo sistema.",
  "public.home.intelligence.automation.eyebrow": "\nAutomação",
  "public.home.intelligence.automation.title": "\nAutomação no mesmo plano de controle",
  "public.home.intelligence.automation.description":
    "\nAcione fluxos de trabalho nativos do Bun, acompanhamento programado e ações apoiadas por ML no mesmo plano de controle.",
  "public.home.cta.title":
    "\nPronto para conectar entrada, entrega, relatórios e visibilidade do parceiro?",
  "public.home.cta.description":
    "\nComece com uma RFQ se você já conhece o requisito ou navegue no catálogo se quiser ver primeiro os acompanhamentos de serviço.",
  "public.home.cta.primary": "\nIniciar uma RFQ",
  "public.home.cta.secondary": "\nProcure soluções",
  "public.catalog.index.eyebrow": "\nCatálogo",
  "public.catalog.index.title": "\nOfertas operacionais baseadas em documentos",
  "public.catalog.index.description":
    "Escolha o caminho operacional que se adapta ao requisito de propriedade, fornecedor ou serviço e, em seguida, inicie a RFQ com o contexto certo.",
  "public.catalog.detail.eyebrow": "\nDetalhe do catálogo",
  "public.catalog.detail.startRfq": "\nIniciar RFQ",
  "public.catalog.detail.backToCatalog": "\nVoltar ao catálogo",
  "public.catalog.detail.includedTitle": "\nO que está incluído",
  "public.catalog.detail.whyTitle": "\nPor que RFQ-first",
  "public.catalog.detail.tab.scope": "\nEscopo",
  "public.catalog.detail.tab.approval": "\nAprovação",
  "public.catalog.detail.tab.delivery": "\nEntrega",
  "public.catalog.detail.summaryTitle": "\nResumo da decisão",
  "public.catalog.detail.summaryScopeValue": "\nEscopo pronto",
  "public.catalog.detail.summaryApprovalValue": "\nRevisão comercial alinhada",
  "public.catalog.detail.summaryDeliveryValue": "\nTransferência preparada",
  "public.catalog.detail.shortlistLabel": "\nComparar postura",
  "public.catalog.detail.shortlistSelectedValue": "\nJá está na lista",
  "public.catalog.detail.shortlistAvailableValue": "\nDisponível para comparação e pacote",
  "public.catalog.detail.continuityLabel": "\nContinuidade",
  "public.catalog.detail.continuityBundled": "\nAgrupe este serviço no RFQ",
  "public.catalog.detail.continuitySingle": " compartilhado\nLeve este serviço em um único RFQ",
  "public.catalog.detail.shareHistoryTitle": "\nCompartilhar e transportar",
  "public.catalog.detail.shareHistoryDescription":
    "\nMantenha o mesmo contexto de serviço visível enquanto você exporta o briefing, compartilha o pacote e passa para a RFQ ou fluxo de trabalho do assistente.",
  "public.catalog.detail.shareHistoryShortlistTitle": "\nPostura da lista restrita",
  "public.catalog.detail.shareHistoryShortlistReady":
    "\nEste serviço já está na lista e pode ser incluído na RFQ compartilhada.",
  "public.catalog.detail.shareHistoryShortlistSingle":
    "\nEste serviço pode começar como uma RFQ de serviço único e expandir posteriormente sem perder o contexto.",
  "public.catalog.detail.shareHistoryBriefTitle": "\nBreve exportação",
  "public.catalog.detail.shareHistoryBriefDescription":
    "\nExporte o resumo quando os revisores internos precisarem do resumo do serviço antes do início da RFQ.",
  "public.catalog.detail.shareHistoryAssistantTitle": "\nTransferência do assistente",
  "public.catalog.detail.shareHistoryAssistantDescription":
    "\nUse o lançamento do assistente e o caminho do pacote {href} para manter o mesmo contexto de serviço anexado ao próximo consumo.",
  "public.catalog.detail.checklistScope": "\nConfirme o escopo operacional",
  "public.catalog.detail.checklistApproval": "\nAlinhar preços e postura de aprovação",
  "public.catalog.detail.checklistHandoff":
    "\nLeve o contexto para a RFQ ou para a revisão do assistente",
  "public.catalog.detail.exportBrief": "\nResumo de exportação",
  "public.catalog.detail.sharePack": "\nCompartilhar pacote",
  "public.catalog.detail.whyDescription":
    "\nA RFQ captura antecipadamente o escopo, os contatos do cliente, as datas solicitadas e o contexto comercial, o que mantém as ordens de serviço e faturas posteriores ancoradas na mesma trilha de documentos.",
  "public.catalog.compare.title": "\nListar e comparar",
  "public.catalog.compare.description":
    "\nMantenha uma pequena lista de trabalho visível enquanto você compara faixas de serviço e, em seguida, transfira o escopo selecionado para uma RFQ agrupada.",
  "public.catalog.compare.shortlistLabel": "\nLista restrita de trabalho",
  "public.catalog.compare.shortlistValue": "\n{count} serviços visíveis",
  "public.catalog.compare.bundleLabel": "\nTransporte de RFQ",
  "public.catalog.compare.bundleValue": "\nCarregue o escopo selecionado em uma solicitação",
  "public.catalog.compare.compareLabel": "\nModo de comparação",
  "public.catalog.compare.compareValue": "\nRevise o título, o resumo e os destaques lado a lado",
  "public.catalog.compare.continuityLabel": "\nPostura de continuidade",
  "public.catalog.compare.continuityReady": "\nLista pronta para pacote RFQ",
  "public.catalog.compare.continuityWaiting": "Adicione serviços à lista primeiro",
  "public.catalog.compare.continuityPanelTitle": "\nContinuidade da lista",
  "public.catalog.compare.continuityPanelDescription":
    "\nA lista segue o mesmo fluxo de trabalho público para que o trabalho de comparação possa continuar durante a revisita, login e encaminhamento de RFQ.",
  "public.catalog.compare.continuityPersistTitle": "\nPersistir lista",
  "public.catalog.compare.continuityPersistReady":
    "\nA lista atual já está ativa e pronta para comparação ou transferência de RFQ.",
  "public.catalog.compare.continuityPersistWaiting":
    "\nAdicione o primeiro serviço para iniciar a lista persistente para este fluxo de trabalho.",
  "public.catalog.compare.continuityMergeTitle": "\nMesclar no login",
  "public.catalog.compare.continuityMergeDescription":
    "\nAs opções anônimas da lista restrita são mescladas na lista restrita quando o mesmo usuário continua a entrada.",
  "public.catalog.compare.continuityBundleTitle": "\nPacote downstream",
  "public.catalog.compare.continuityBundleDescription":
    "\nTransforme os serviços selecionados em uma única RFQ em vez de recriar a decisão de comparação posteriormente.",
  "public.catalog.compare.progressTitle": "\nComparar fluxo de trabalho",
  "public.catalog.compare.progressDescription":
    "\nEscolha a lista, compare as opções visíveis e, em seguida, agrupe o escopo selecionado na RFQ.",
  "public.catalog.compare.workspaceHint":
    "\nRevise cada serviço na mesma tela antes de levá-lo adiante.",
  "public.catalog.compare.stepShortlist": "\nLista",
  "public.catalog.compare.stepCompare": "\nComparar",
  "public.catalog.compare.stepBundle": "\nPacote RFQ",
  "public.catalog.compare.priceLabel": "\nPreço indicativo",
  "public.catalog.compare.bundleAction": "\nEscopo selecionado do pacote",
  "public.catalog.compare.empty":
    "\nSelecione os serviços aqui para manter a bandeja de comparação persistente.",
  "public.catalog.shortlist.add": "\nAdicionar à lista",
  "public.catalog.shortlist.remove": "\nRemover da lista",
  "public.rfq.eyebrow": "\nSolicitação de orçamento",
  "public.rfq.title": "\nCapture o trabalho antes de começar.",
  "public.rfq.description":
    "\nEnvie a necessidade operacional uma vez. Nós o usamos para qualificar o escopo, definir o preço do trabalho e manter a entrega do parceiro rastreável até o cumprimento.",
  "public.rfq.bundle.label": "\nServiços agrupados",
  "public.rfq.bundle.loaded": "\nEscopo empacotado carregado para {services}.",
  "public.rfq.bundle.returnToCatalog": "\nRetornar ao escopo do catálogo agrupado",
  "public.rfq.bundle.summarySingle": "\nSolicite um orçamento para {title}.",
  "public.rfq.bundle.summaryMultiple": "\nSolicite um orçamento para o escopo incluído: {titles}.",
  "public.rfq.bundle.titleSingle": "\nSolicitação de cotação para {title}",
  "public.rfq.bundle.titleMultiple": "\nRFQ para {primary} + {count} mais",
  "public.rfq.form.aria": "\nFormulário de solicitação de orçamento",
  "public.rfq.form.title": "\nSolicitar título",
  "public.rfq.form.summary": "\nResumo operacional",
  "public.rfq.form.contactEmail": "\nE-mail de contato",
  "public.rfq.form.requestedBy": "\nSolicitado por",
  "public.rfq.form.budget": "\nOrientação orçamentária",
  "public.rfq.form.requirements": "\nRequisitos ou itens de linha",
  "public.rfq.form.requirementsPlaceholder": "\nUm requisito por linha",
  "public.rfq.submit": "\nEnviar RFQ",
  "public.rfq.reviewCatalog": "\nRevisar catálogo",
  "public.rfq.workspace.title": "\nEspaço de trabalho de RFQ",
  "public.rfq.workspace.description":
    "\nCapture o resumo operacional, os detalhes dos requisitos e o cronograma comercial em um espaço de trabalho preparado antes que a solicitação seja convertida no downstream.",
  "public.rfq.workspace.fact.scopeLabel": "\nPostura do escopo",
  "public.rfq.workspace.fact.scopeValue": "\nResumo do comprador em andamento",
  "public.rfq.workspace.fact.responseLabel": "\nModelo de resposta",
  "public.rfq.workspace.fact.responseValue": "Qualificação, cotação e acompanhamento do portal",
  "public.rfq.workspace.draftTitle": "\nRascunho do espaço de trabalho",
  "public.rfq.workspace.draftDescription":
    "\nEsta RFQ permanece em rascunho até você enviá-la. Use o assistente e a revisão do catálogo para refinar o briefing primeiro.",
  "public.rfq.workspace.draftStatusLabel": "\nStatus do rascunho",
  "public.rfq.workspace.draftStatusValue": "\nRascunho de trabalho",
  "public.rfq.workspace.resumeLabel": "\nRetomar caminho",
  "public.rfq.workspace.resumeValue": "\nMantenha o mesmo contexto de solicitação aberto aqui",
  "public.rfq.workspace.draftHint":
    "\nSalve o rascunho aqui e retorne ao mesmo contexto de solicitação sem reconstruir o consumo.",
  "public.rfq.workspace.draftEmptyTitle": "Nenhum campo preenchido",
  "public.rfq.workspace.draftEmptyFields": "0 de 6 campos preenchidos",
  "public.rfq.workflow.progressLabel": "\nConclusão do rascunho",
  "public.rfq.workflow.progressValue": "\n{percent}% concluído",
  "public.rfq.workflow.reviewStageLabel": "\nEtapa de revisão",
  "public.rfq.workflow.lastUpdatedLabel": "\nÚltima atualização",
  "public.rfq.workflow.collaboratorHeading": "\nEstado do colaborador",
  "public.rfq.workflow.collaboratorPending": "\nAguardando contato do colaborador",
  "public.rfq.workflow.collaboratorValue": "\nRevisor: {email}",
  "public.rfq.workflow.supportTitle": "\nPostura de revisão e colaboração",
  "public.rfq.workflow.supportDescription":
    "\nMantenha o estágio de revisão atual, o estado do colaborador e a última atualização do rascunho visíveis antes do envio da solicitação.",
  "public.rfq.workflow.stage.capture": "\nEscopo de captura",
  "public.rfq.workflow.stage.review": "\nRevisar rascunho",
  "public.rfq.workflow.stage.ready": "\nPronto para enviar",
  "public.rfq.workflow.historyTitle": "\nRascunho de atividade",
  "public.rfq.workflow.historyDescription":
    "\n{count} atualizações rastreadas mantêm a solicitação em um histórico de fluxo de trabalho compartilhado.",
  "public.rfq.workflow.activity.placeholderTitle": "\nRascunho iniciado",
  "public.rfq.workflow.activity.placeholderDescription":
    "\nMantenha o comprador informado aqui antes que se torne uma RFQ enviada.",
  "public.rfq.workflow.activity.createdTitle": "\nRascunho criado",
  "public.rfq.workflow.activity.createdDescription":
    "\n{actor} abriu {requestNumber} como um rascunho rastreado.",
  "public.rfq.workflow.activity.updatedTitle": "\nRascunho atualizado",
  "public.rfq.workflow.activity.updatedDescription":
    "\n{actor} moveu o briefing para {progress} e {reviewStage}.",
  "public.rfq.workflow.systemActor": "\nFluxo de trabalho do sistema",
  "public.rfq.draft.save": "\nSalvar rascunho",
  "public.rfq.draft.saved": "\nRascunho salvo {requestNumber}.",
  "public.rfq.draft.loaded": "\nRascunho retomado {requestNumber}.",
  "public.rfq.draft.resumeReady": "\nRetome o resumo do comprador salvo aqui",
  "public.rfq.draft.fallbackTitle": "\nRascunho público da RFQ",
  "public.rfq.draft.error.empty": "\nAdicione pelo menos um campo antes de salvar um rascunho.",
  "public.rfq.workspace.checklist.summaryTitle": "\nResuma a necessidade operacional",
  "public.rfq.workspace.checklist.summaryDescription":
    "\nDescreva o objetivo comercial, os locais afetados e a urgência para que a triagem comece com o contexto comercial correto.",
  "public.rfq.workspace.checklist.requirementsTitle":
    "\nAdicione requisitos e detalhes do item de linha",
  "public.rfq.workspace.checklist.requirementsDescription":
    "\nListe restrições, quantidades e anexos antes que a solicitação seja precificada ou convertida em trabalho.",
  "public.rfq.workspace.checklist.handoffTitle": "\nPrepare a transferência downstream",
  "public.rfq.workspace.checklist.handoffDescription":
    "\nMantenha contato, datas e orientação orçamentária no mesmo registro para que a próxima equipe não reinicie a captação.",
  "public.rfq.next.title": "\nO que acontece a seguir",
  "public.rfq.next.step.qualify": "\nAvaliação de qualificação e adequação ao local",
  "public.rfq.next.step.convert": "\nConversão de cotação, pedido e ordem de serviço",
  "public.rfq.next.step.portal": "\nAtualizações do portal do parceiro até a conclusão",
  "public.rfq.workspace.stepDraft": "\nRascunho",
  "public.rfq.workspace.stepReview": "\nRevisão",
  "public.rfq.workspace.stepSubmit": "\nEnviar",
  "public.rfq.workspace.stepPortal": "\nTransferência do portal",
  "public.rfq.thanks.alert": "\nA RFQ {requestNumber} foi enviada com sucesso.",
  "public.rfq.thanks.title": "Sua solicitação está em triagem.",
  "public.rfq.thanks.description":
    "\nGuarde o número de referência para acompanhamento. Se sua equipe receber um convite do portal, a mesma solicitação aparecerá no histórico do documento compartilhado.",
  "public.rfq.thanks.returnCatalog": "\nVoltar ao catálogo",
  "public.rfq.thanks.submitAnother": "\nEnvie outra RFQ",
  "public.rfq.thanks.pending": "\nPendente",
  "public.rfq.thanks.nextTitle": "\nContinue a solicitação sem perder context",
  "public.rfq.thanks.nextDescription":
    "\nConvide colaboradores, continue apoiando a movimentação de arquivos e encaminhe o mesmo número de solicitação para a próxima conversa em vez de iniciar uma segunda entrada.",
  "public.rfq.thanks.collaborate": "\nConvidar colaboradores",
  "public.rfq.thanks.collaborationSubject": "\nAnalisar RFQ {requestNumber}",
  "public.rfq.thanks.collaborationBody":
    "\nA RFQ {requestNumber} está pronta para revisão. Continue a mesma solicitação em vez de iniciar uma nova entrada.",
  "public.catalog.assetReliability.title": "\nProgramas de confiabilidade de ativos",
  "public.catalog.assetReliability.summary":
    "\nManutenção planejada, triagem de criticidade e execução do ciclo de vida para sites distribuídos.",
  "public.catalog.assetReliability.detail":
    "\nAgrupe o planejamento de confiabilidade, a execução de ordens de serviço e os relatórios em um único ritmo operacional para propriedades e equipes de campo.",
  "public.catalog.assetReliability.highlight1":
    "\nAuditorias de confiabilidade e modelagem de backlog",
  "public.catalog.assetReliability.highlight2": "\nPlanejamento de ordem de serviço site por site",
  "public.catalog.assetReliability.highlight3":
    "\nEvidência de conclusão e relatório de recuperação",
  "public.catalog.procureToPay.title": "\nOperações de aquisição até pagamento",
  "public.catalog.procureToPay.summary":
    "\nFluxos de trabalho de RFQ, ordem de compra, recebimento e cobrança com visibilidade do parceiro.",
  "public.catalog.procureToPay.detail":
    "\nTransfira a aquisição de eventos isolados para o controle de documentos com reconhecimento do fornecedor, com aprovação, recebimento e histórico de cobrança.",
  "public.catalog.procureToPay.highlight1": "\nIntegração do fornecedor e coordenação de RFQ",
  "public.catalog.procureToPay.highlight2": "\nAcompanhamento do ciclo de vida do pedido de compra",
  "public.catalog.procureToPay.highlight3":
    "\nVisibilidade de recebimento, faturamento e prazo de entrega",
  "public.catalog.fieldServices.title": "\nServiços de campo baseados em documentos",
  "public.catalog.fieldServices.summary":
    "\nPedidos de clientes, ordens de serviço, faturas e atualizações do portal a partir de um gráfico operacional compartilhado.",
  "public.catalog.fieldServices.detail":
    "\nTransforme os requisitos recebidos em trabalho controlado, progresso visível para o parceiro e resultados prontos para faturas sem adicionar complexidade de checkout.",
  "public.catalog.fieldServices.highlight1": "\nConversão de RFQ para pedido",
  "public.catalog.fieldServices.highlight2": "\nExecução apoiada por TaskCard",
  "public.catalog.fieldServices.highlight3": "\nAcompanhamento de fatura e status de pagamento",
  "auth.signIn.title": "\nEntrar",
  "auth.signIn.subtitle": "\nAcesse a plataforma operacional",
  "auth.signIn.pageTitle": "\nEntrar — Plataforma operacional",
  "auth.signIn.moreDetailsSummary": "\nDetalhes da sessão e outras opções de entrada",
  "auth.signIn.ssoContinueLoading": "\nContinuando…",
  "auth.signIn.heading": "\nBem vindo de volta",
  "auth.signIn.subheading": "\nFaça login para acessar a plataforma",
  "auth.signIn.email": "\nEndereço de e-mail",
  "auth.signIn.emailLabel": "\nEndereço de e-mail",
  "auth.signIn.emailPlaceholder": "\njane@company.com",
  "auth.signIn.password": "\nSenha",
  "auth.signIn.passwordLabel": "\nSenha",
  "auth.signIn.passwordPlaceholder": "\n••••••••",
  "auth.signIn.helper": "\nUse suas credenciais registradas",
  "auth.signIn.loading": "\nFazendo login...",
  "auth.signIn.submit": "\nEntrar na área de trabalho",
  "auth.signIn.forgotPassword": "\nEsqueceu sua senha?",
  "auth.signIn.unauthorized": "\nFaça login para continuar.",
  "auth.required": "\nAutenticação necessária.",
  "auth.signOut": "\nSair",
  "dashboard.title": "\nPainel de operações",
  "dashboard.subtitle": "\nDesempenho ao vivo e resumo de inteligência",
  "dashboard.welcome": "\nBem-vindo de volta, {name}",
  "dashboard.kpi.assetHealth": "\nSaúde do Ativo",
  "dashboard.kpi.openTasks": "\nAbrir Tarefas",
  "dashboard.kpi.predictionAlerts": "\nAlertas de previsão",
  "dashboard.kpi.utilisation": "\nUtilização",
  "dashboard.kpi.spend": "\nGastos comerciais",
  "dashboard.kpi.depreciation": "\nExposição à Depreciação",
  "dashboard.kpi.placeholderValue": "\nCarregando",
  "dashboard.kpi.predictionsDueDescription": "\nVida restante <= {days} dias",
  "dashboard.kpi.totalAssetsDescription": "\nEm todos os sites",
  "dashboard.kpi.activeTasksDescription": "\nBacklog, agendado e em andamento",
  "dashboard.kpi.utilisationDescription": "\nDerivado da média de horas de utilização",
  "dashboard.kpi.noOverdueTasks": "\nNenhuma tarefa atrasada",
  "dashboard.kpi.deadlinePassed": "\nO prazo expirou",
  "dashboard.kpi.depreciationDescription": "\nValor contábil atual total",
  "dashboard.refresh": "\nAtualização automática a cada {seconds} segundos",
  "dashboard.quickActions": "\nAções Rápidas",
  "dashboard.quickActions.subtitle": "\nNavegue até as principais áreas da plataforma",
  "dashboard.greeting.morning": "\nBom dia, {name}",
  "dashboard.greeting.afternoon": "\nBoa tarde, {name}",
  "dashboard.greeting.evening": "\nBoa noite, {name}",
  "dashboard.kpi.sectionTitle": "\nMétricas de desempenho",
  "dashboard.kpi.sectionSubtitle": "\nDesempenho ao vivo e resumo de inteligência",
  "dashboard.kpi.trendVsPreviousMonth": "\nem relação ao mês anterior",
  "dashboard.kpi.trendPendingComparison": "\nOs dados comparativos ainda não estão disponíveis.",
  "dashboard.dateLabel": "\nHoje",
  "dashboard.chat.pageContext":
    "\nPainel de operações. Métricas principais: {kpis}. Função do usuário: {role}.",
  "dashboard.quickAction.assets": "\nNavegar no registro de ativos",
  "dashboard.quickAction.addDevice": "\nRegistrar novo dispositivo",
  "dashboard.quickAction.deviceHistory": "\nVer histórico de manutenção",
  "dashboard.quickAction.digitalTwin": "\nExplore o gêmeo digital 3D",
  "dashboard.quickAction.tasks": "\nGerenciar quadro de tarefas",
  "dashboard.quickAction.kanban": "\nVer quadro Kanban",
  "dashboard.quickAction.predictions": "\nPrevisões e alertas de IA",
  "dashboard.quickAction.utilisation": "\nCockpit de utilização",
  "dashboard.quickAction.fleet": "\nPostura do veículo e carga de manutenção",
  "dashboard.quickAction.buildings": "\nCobertura de instalações e prontidão dupla",
  "dashboard.quickAction.sensors": "\nCobertura de telemetria e integridade do dispositivo",
  "dashboard.quickAction.reports": "\nGerar relatórios",
  "dashboard.quickAction.finance": "\nDepreciação e avaliação",
  "dashboard.quickAction.financePlanning": "\nOrçamentos, cenários e postura de capital",
  "dashboard.quickAction.admin": "\nAdministração do sistema",
  "dashboard.quickAction.apiExplorer": "\nReferência API",
  "dashboard.quickAction.profile": "\nSeu perfil",
  "dashboard.quickAction.customisation": "\nTema e preferências",
  "assets.title": "\nRegistro de Ativos",
  "assets.subtitle": "\nPesquisar, inspecionar e fazer triagem de ativos de infraestrutura",
  "assets.searchLabel": "\nPesquisar ativos",
  "assets.searchPlaceholder": "\nDigite o nome do ativo, RFID ou site",
  "assets.filterLabel": "\nTipo de ativo",
  "assets.filterAll": "\nTodos os tipos",
  "assets.savedView.label": "\nVisualização salva",
  "assets.savedView.all": "\nTodos os ativos",
  "assets.savedView.critical": "\nCondição crítica",
  "assets.savedView.fatiguing": "\nCiclo de vida fatigante",
  "assets.savedView.watch": "\nLista de observação",
  "assets.columnSet.label": "\nConjunto de colunas",
  "assets.columnSet.description":
    "\nMude as colunas do espaço de trabalho de ativos para a perspectiva operacional, de portfólio ou de governança.",
  "assets.columnSet.footer":
    "\nUse o conjunto de colunas que corresponde ao contexto de revisão atual antes de exportar ou compartilhar o espaço de trabalho.",
  "assets.columnSet.operations": "\nOperacional",
  "assets.columnSet.portfolio": "\nPortfólio",
  "assets.columnSet.governance": "\nGovernança",
  "assets.compare.add": "\nAdicionar para comparar",
  "assets.compare.remove": "\nRemover da comparação",
  "assets.compare.title": "\nComparar bandeja",
  "assets.compare.description":
    "\nMantenha até {count} ativos lado a lado enquanto analisa a condição, a hierarquia e o contexto do site.",
  "assets.compare.emptyDescription":
    "Selecione ativos da tabela para manter uma bandeja de comparação ao vivo visível aqui.",
  "assets.compare.savedViewDescription":
    "\nMantenha o contexto da visualização salva visível enquanto você alterna entre as perspectivas de comparação e de conjunto de colunas.",
  "assets.compare.footer":
    "\nAs seleções de comparação permanecem anexadas ao URL do espaço de trabalho atual para um caminho de revisão compartilhado.",
  "assets.filterApply": "\nAplicar filtros",
  "assets.kpi.total": "\nAtivos Totais",
  "assets.kpi.critical": "\nCondição Crítica",
  "assets.kpi.fatiguing": "\nCiclo de vida fatigante",
  "assets.summary.title": "\nCarteira de Ativos",
  "assets.summary.description": "\nLinha de base do estoque operacional",
  "assets.table.name": "\nAtivo",
  "assets.table.type": "\nTipo",
  "assets.table.site": "\nLocal",
  "assets.table.condition": "\nCondição",
  "assets.table.hierarchy": "\nHierarquia",
  "assets.table.lifecycle": "\nCiclo de vida",
  "assets.table.bookValue": "\nValor contábil",
  "assets.table.lastInspection": "\nÚltima inspeção",
  "assets.table.action": "\nAção",
  "assets.table.open": "\nAbrir",
  "assets.export.csv": "\nExportar CSV",
  "assets.export.pdf": "\nExportar PDF",
  "assets.export.id": "Identificador",
  "assets.export.purchaseDate": "\nData de compra",
  "assets.export.purchasePrice": "\nPreço de compra",
  "assets.export.rfidTag": "\nEtiqueta RFID",
  "assets.export.hierarchy": "\nNível de hierarquia",
  "assets.export.parentAsset": "\nAtivo pai",
  "assets.export.capability": "\nLigação de capacidade",
  "assets.export.utilisationHours": "\nHoras de utilização",
  "assets.export.unsupportedFormat": "\nFormato não suportado. Use formato=csv",
  "assets.inspector.aiPrompt":
    "\nRevise o ativo {name} em {site}. Resuma o risco atual, a prontidão e a próxima melhor ação do contexto do inspetor selecionado.",
  "assets.workspace.summaryTitle": "Registro de ativos",
  "assets.workspace.summarySupporting": "Todos os tipos, todos os sites",
  "assets.workspace.filterBarEyebrow": "Filtros",
  "assets.workspace.filterBarTitle": "Encontrar e restringir ativos",
  "assets.workspace.filterBarDescription":
    "\nA pesquisa atualiza o registo após uma breve pausa ao escrever. As listas aplicam-se de imediato; use Aplicar filtros para atualizar após edições manuais.",
  "assets.inspector.emptyEyebrow": "Inspetor de ativos",
  "assets.inspector.emptyTitle": "Nenhum ativo selecionado",
  "assets.inspector.conditionLabel": "Condição",
  "assets.inspector.openTasksLabel": "Tarefas abertas",
  "assets.inspector.predictionsLabel": "Previsões",
  "assets.inspector.emptyDescription":
    "\nEscolha uma linha do registro de ativos para inspecionar risco, prontidão e ações recomendadas.",
  "assets.media.title": "\nFotos",
  "assets.media.empty": "\nAinda não há fotos",
  "assets.media.upload": "\nCarregar foto",
  "assets.media.viewImage": "\nVer imagem",
  "assets.media.annotate": "\nAnotar",
  "addDevice.title": "\nAdicionar dispositivo",
  "addDevice.subtitle": "\nRegistre um novo dispositivo e mapeie-o para sua frota operacional",
  "addDevice.form.title": "\nRegistro do dispositivo",
  "addDevice.form.nameLabel": "\nNome do dispositivo",
  "addDevice.form.serialLabel": "\nSinal serial/RF",
  "addDevice.form.typeLabel": "\nCategoria do dispositivo",
  "addDevice.form.siteLabel": "\nLocal de implantação",
  "addDevice.form.sitePlaceholder": "\nSelecione um site de implantação",
  "addDevice.form.siteHint": "\nEscolha entre {count} sites ativos no registro operacional ativo.",
  "addDevice.form.siteLabelWithId": "\nSite de implantação / ID",
  "addDevice.form.lifecycleLabel": "\nEstágio do ciclo de vida",
  "addDevice.form.lifecycleActive": "\nAtivo",
  "addDevice.form.lifecycleMonitor": "\nMonitoramento",
  "addDevice.form.lifecycleFatiguing": "\nFatigante",
  "addDevice.form.lifecycleDisposed": "\nDescartado",
  "addDevice.form.lifecycleDefault": "\nAtivo",
  "addDevice.form.conditionLabel": "\nCondição",
  "addDevice.form.conditionAny": "\nQualquer",
  "addDevice.form.gpsLatLabel": "\nLatitude GPS",
  "addDevice.form.gpsLonLabel": "\nLongitude GPS",
  "addDevice.form.purchasePriceLabel": "\nPreço de compra",
  "addDevice.form.bookValueLabel": "\nValor contábil",
  "addDevice.form.requiredHint": "\nOs campos marcados com * são obrigatórios",
  "addDevice.form.submit": "\nCriar dispositivo",
  "addDevice.validation.unauthorized": "\nNão autorizado para criar dispositivos",
  "addDevice.validation.nameRequired": "\nO nome do dispositivo é obrigatório",
  "addDevice.validation.typeRequired": "\nA categoria do dispositivo é obrigatória",
  "addDevice.validation.siteRequired": "\nO site é obrigatório",
  "addDevice.validation.locationRequired": "\nCoordenadas GPS são obrigatórias",
  "addDevice.validation.locationInvalidRange": "\nAs coordenadas GPS estão fora dos limites",
  "addDevice.validation.numericValuesRequired":
    "\nO preço de compra e o valor contábil devem ser numéricos",
  "addDevice.validation.siteNotFound": "\nO site especificado não existe",
  "addDevice.validation.rfidUsed": "\nO sinal RF/etiqueta RFID já está em uso",
  "addDevice.prerequisite.databaseUnavailableTitle":
    "\nA configuração do dispositivo requer dados do site ativos",
  "addDevice.prerequisite.siteUnavailableTitle":
    "\nAdicione um site ativo antes de registrar dispositivos",
  "addDevice.prerequisite.siteUnavailableDescription":
    "Crie uma base ou instalação no espaço de trabalho da propriedade e retorne aqui para registrar ou importar dispositivos no catálogo do site ativo.",
  "addDevice.prerequisite.openEstate": "\nEspaço de trabalho de propriedade aberta",
  "addDevice.feedback.created": "\nDispositivo {name} registrado com sucesso",
  "addDevice.form.postCreateNote":
    "\nApós o registro, anexe telemetria, fotos e atividades de manutenção do registro do ativo.",
  "addDevice.massImport.title": "\nImportação em massa",
  "addDevice.massImport.subtitle":
    "\nEscolha um arquivo CSV para importar registros do dispositivo",
  "addDevice.massImport.acceptedTypes": "\nSomente arquivos CSV",
  "addDevice.massImport.maxFiles": "\nUm arquivo por vez",
  "addDevice.massImport.importing": "\nImportando…",
  "addDevice.massImport.success": "\n{created} importado de {total} dispositivos",
  "addDevice.massImport.partial": "\nImportado {created} de {total}. {failed} falhou.",
  "addDevice.massImport.error": "\nFalha na importação: {message}",
  "addDevice.massImport.emptyFile": "\nCSV não possui linhas de dados",
  "addDevice.massImport.fileLabel": "\nArquivo CSV",
  "addDevice.massImport.submit": "\nImportar dispositivos",
  "addDevice.massImport.downloadTemplate": "\nBaixe o modelo CSV",
  "addDevice.massImport.editorTitle": "\nRevise e edite o conteúdo importado",
  "addDevice.massImport.editorDescription":
    "\nCarregue um CSV, cole linhas da planilha ou edite células individuais antes de importar.",
  "addDevice.massImport.contentLabel": "\nImportar conteúdo",
  "addDevice.massImport.contentPlaceholder":
    "\nCole as linhas CSV aqui. A linha do cabeçalho é obrigatória para importação direta.",
  "addDevice.massImport.notesLabel": "\nNotas brutas para análise de IA",
  "addDevice.massImport.notesPlaceholder":
    "\nCole listas com marcadores, tabelas copiadas, e-mails ou notas técnicas e deixe a IA convertê-los em linhas prontas para importação.",
  "addDevice.massImport.parseWithAi": "\nAnalisar com AI",
  "addDevice.massImport.aiParsing": "\nAnalisando conteúdo…",
  "addDevice.massImport.aiSuccess": "\nAI preparou {count} linhas de importação",
  "addDevice.massImport.aiError": "\nFalha na análise de IA: {message}",
  "addDevice.massImport.gridTitle": "\nEditor de células",
  "addDevice.massImport.addRow": "\nAdicionar linha",
  "addDevice.massImport.clearContent": "\nLimpar conteúdo",
  "addDevice.massImport.emptyGrid": "\nCole ou analise o conteúdo para começar a editar as linhas.",
  "addDevice.massImport.fileImported": "\nArquivo importado para o editor",
  "addDevice.massImport.parseEmpty": "\nAdicione notas brutas antes de usar a análise de IA",
  "addDevice.massImport.invalidContent":
    "\nNenhuma linha importável foi encontrada no editor content",
  "addDevice.massImport.templateSeed":
    "\nnome,tipo,siteName,rfidTag,gpsLat,gpsLon,purchasePrice,bookValue,condição,lifecycleStage",
  "addDevice.massImport.columns.name": "\nNome",
  "addDevice.massImport.columns.type": "\nTipo",
  "addDevice.massImport.columns.siteName": "\nLocal",
  "addDevice.massImport.columns.rfidTag": "\nRFID/Serial",
  "addDevice.massImport.columns.gpsLat": "\nLatitude",
  "addDevice.massImport.columns.gpsLon": "\nLongitude",
  "addDevice.massImport.columns.purchasePrice": "\nPreço de compra",
  "addDevice.massImport.columns.bookValue": "\nValor contábil",
  "addDevice.massImport.columns.condition": "\nCondição",
  "addDevice.massImport.columns.lifecycleStage": "\nCiclo de vida",
  "addDevice.massImport.formatTableTitle": "\nReferência de formato de importação",
  "addDevice.massImport.formatTableColumnName": "\nColuna",
  "addDevice.massImport.formatTableColumnRequired": "\nObrigatório",
  "addDevice.massImport.formatTableColumnExample": "\nExemplo",
  "addDevice.massImport.columns.required.name": "\nSim",
  "addDevice.massImport.columns.required.type": "\nSim",
  "addDevice.massImport.columns.required.siteName": "\nSim",
  "addDevice.massImport.columns.required.rfidTag": "\nNão",
  "addDevice.massImport.columns.required.gpsLat": "\nSim",
  "addDevice.massImport.columns.required.gpsLon": "\nSim",
  "addDevice.massImport.columns.required.purchasePrice": "\nSim",
  "addDevice.massImport.columns.required.bookValue": "\nSim",
  "addDevice.massImport.columns.required.condition": "\nNão",
  "addDevice.massImport.columns.required.lifecycleStage": "\nNão",
  "addDevice.massImport.columns.example.name": "\nUnidade Sensora A1",
  "addDevice.massImport.columns.example.type": "FAIXA_DE_TREINO",
  "addDevice.massImport.columns.example.siteName": "\nSite Alfa",
  "addDevice.massImport.columns.example.rfidTag": "RF-00123 (exemplo)",
  "addDevice.massImport.columns.example.gpsLat": "51.5074 (exemplo)",
  "addDevice.massImport.columns.example.gpsLon": "-0.1278 (exemplo)",
  "addDevice.massImport.columns.example.purchasePrice": "1200.00 (exemplo)",
  "addDevice.massImport.columns.example.bookValue": "950.00 (exemplo)",
  "addDevice.massImport.columns.example.condition": "\nbom",
  "addDevice.massImport.columns.example.lifecycleStage": "\nativo",
  "addDevice.massImport.formatTableRequiredYes": "\nSim",
  "addDevice.massImport.formatTableRequiredNo": "\nNão",
  "addDevice.workflow.title": "\nRevisão encenada do dispositivo",
  "addDevice.workflow.description":
    "\nRegistre o dispositivo, valide as linhas de importação e revise o resultado antes do envio.",
  "deviceHistory.title": "\nHistórico do dispositivo",
  "deviceHistory.subtitle": "\nAções recentes de ciclo de vida e manutenção em sua frota",
  "deviceHistory.filterLabel": "\nFiltrar por dispositivo",
  "deviceHistory.filter.assigneeLabel": "\nCessionário",
  "deviceHistory.filter.assigneePlaceholder": "\nPesquisar por responsável",
  "deviceHistory.filter.statusLabel": "\nStatus",
  "deviceHistory.filter.statusAll": "\nTodos os status",
  "deviceHistory.table.device": "\nDispositivo",
  "deviceHistory.table.event": "\nEvento",
  "deviceHistory.table.timestamp": "\nCarimbo de data/hora",
  "deviceHistory.table.updatedAt": "\nAtualizado em",
  "deviceHistory.table.status": "\nStatus",
  "deviceHistory.table.assignee": "\nCessionário",
  "deviceHistory.table.priority": "\nPrioridade",
  "deviceHistory.table.ariaLabel": "\nEventos do histórico do dispositivo",
  "deviceHistory.table.notes": "\nNotas",
  "deviceHistory.table.emptyTitle": "\nAinda não há histórico do dispositivo",
  "deviceHistory.table.emptyDescription":
    "Ajuste os filtros ou aguarde que novas atividades de ciclo de vida apareçam neste feed.",
  "deviceHistory.table.errorTitle": "\nHistórico do dispositivo indisponível",
  "deviceHistory.table.errorDescription":
    "\nNão foi possível carregar o feed do histórico do dispositivo. Tente novamente a solicitação.",
  "deviceHistory.decisionTitle": "\nRevisão de diferenças e anomalias",
  "deviceHistory.decisionDescription":
    "\nCompare eventos recentes, observe anomalias e exporte o pacote de evidências.",
  "deviceHistory.eventTask": "\nEvento de tarefa",
  "deviceHistory.empty":
    "\nNenhum evento do histórico do dispositivo corresponde aos seus filtros.",
  "profile.title": "\nPerfil",
  "profile.subtitle": "\nDetalhes da conta e contexto da função",
  "profile.displayName": "\nNome de exibição",
  "profile.email": "\nE-mail",
  "profile.role": "\nFunção atual",
  "profile.lastSignIn": "\nÚltimo login",
  "profile.lastSignInUnavailable": "Não disponível",
  "profile.workspaceHome": "\nEspaço de trabalho em casa",
  "profile.activeSessions": "\nSessões ativas",
  "profile.sessions.title": "\nSessões ativas",
  "profile.sessions.subtitle": "\nLogins recentes e contexto do dispositivo para sua conta",
  "profile.sessions.empty": "\nNenhuma sessão recente gravada",
  "profile.sessions.emptyDescription":
    "\nOs logins ativos e recentes aparecerão aqui após a autenticação.",
  "profile.sessions.current": "\nSessão atual",
  "profile.sessions.unknownAddress": "\nRede desconhecida",
  "profile.sessions.unknownDevice": "\nDispositivo desconhecido",
  "profile.sessions.started": "\nIniciado",
  "profile.sessions.expires": "\nExpira",
  "profile.sessions.deviceInventory": "\nDispositivos vistos",
  "profile.sessions.networkCoverage": "\nRedes vistas",
  "profile.sessions.activityTitle": "\nAtividade de segurança recente",
  "profile.sessions.activityDescription":
    "\nRevise as alterações mais recentes de sessão, dispositivo e rede antes de encerrar o acesso ou alternar credenciais.",
  "profile.sessions.activityCurrentTitle": "\nPostura da sessão atual",
  "profile.sessions.activityCurrentDescription": "\nSessão atual estabelecida {value}.",
  "profile.sessions.activityCurrentEmpty": "\nNenhuma sessão atual está disponível para revisão.",
  "profile.sessions.activityDeviceTitle": "\nPegada do dispositivo",
  "profile.sessions.activityDeviceDescription":
    "\n{count} perfis de dispositivo estão visíveis na auditoria de sessão recente.",
  "profile.sessions.activityNetworkTitle": "\nPegada de rede",
  "profile.sessions.activityNetworkDescription":
    "\n{count} origens da rede estão visíveis na auditoria de sessão recente.",
  "profile.sessions.expiringSoon": "\nExpira em breve",
  "profile.sessions.activityExpiringDescription":
    "\n{count} sessões ativas precisam ser revisadas antes que a janela de acesso atual feche.",
  "profile.sessions.expiresSoon": "\nExpira em breve",
  "profile.sessions.remoteContext": "\nContexto remoto",
  "profile.sessions.activityRemoteDescription":
    "\n{count} sessões estão ativas fora do contexto de rede confiável principal.",
  "profile.signOutLabel": "\nSair",
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
  "digitalTwin.title": "\nGêmeo Digital",
  "digitalTwin.subtitle": "\nVisibilidade do ponto de acesso espacial e contexto de ativos ao vivo",
  "digitalTwin.scene.title": "\nCena de operações espaciais",
  "digitalTwin.scene.description":
    "\nVisualização dupla orientada pelo servidor mostrando cobertura de ponto de acesso ao vivo e coordenadas vinculadas a ativos.",
  "digitalTwin.scene.streamTitle": "\nTransmissão ao vivo",
  "digitalTwin.scene.streamDescription":
    "\nOs instantâneos SSE publicam as coordenadas atuais do ponto de acesso.",
  "digitalTwin.videoStreams.title": "\nFeeds ao vivo",
  "digitalTwin.videoStreams.empty": "\nNenhuma transmissão ao vivo configurada",
  "digitalTwin.videoStreams.live": "\nAo vivo",
  "digitalTwin.videoStreams.noStream": "\nNenhum URL de transmissão",
  "digitalTwin.videoStreams.openStream": "\nAbrir fluxo",
  "digitalTwin.videoStreams.notFound": "\nTransmissão não encontrada",
  "iot.telemetry.ingest": "\nIngerir telemetria",
  "iot.devices.title": "\nDispositivos IoT",
  "iot.apiKeyInvalid": "\nChave de API inválida ou ausente",
  "iot.assetNotFound": "\nAtivo não encontrado",
  "iot.siteNotFound": "\nSite não encontrado",
  "iot.devices.empty": "\nNenhum dispositivo IoT registrado",
  "iot.devices.register": "\nRegistrar dispositivo",
  "iot.devices.mqttTopic": "\nTópico MQTT",
  "iot.devices.mqttPlaceholder": "\ntelemetria/site1/dispositivo1",
  "iot.devices.site": "\nLocal",
  "iot.devices.asset": "\nAtivo",
  "iot.devices.assetPlaceholder": "\nID do recurso",
  "iot.devices.lastSeen": "\nVisto pela última vez",
  "iot.devices.validation.required": "O tópico e o site MQTT são obrigatórios.",
  "iot.devices.validation.topicInUse": "\nO tópico MQTT já está em uso.",
  "iot.devices.feedback.deviceAdded": "\nRegistrar dispositivo — dispositivo adicionado.",
  "iot.devices.table.ariaLabel": "\nDispositivos IoT registrados",
  "iot.apiKeyNotConfigured": "\nA chave da API IoT não está configurada.",
  "iot.deviceNotFound": "\nDispositivo não encontrado",
  "edgeControl.validation.payloadJsonInvalid": "\nA carga útil deve ser JSON.",
  "edgeControl.validation.commandRequired":
    " válido\nSelecione um dispositivo e digite um nome de comando.",
  "edgeControl.validation.deviceRequired": "\nSelecione um dispositivo válido.",
  "edgeControl.validation.automationTitleRequired": "\nO título da automação é obrigatório.",
  "edgeControl.validation.automationDeviceRequired":
    "\nSelecione um dispositivo e um comando para enfileirar uma execução de automação.",
  "edgeControl.validation.automationKindRequired": "\nSelecione um tipo de automação válido.",
  "edgeControl.commands.title": "\nFila de comandos do dispositivo",
  "edgeControl.commands.description":
    "\nEnfileire comandos seguros de hardware para dispositivos de borda registrados e monitore o estado de entrega.",
  "edgeControl.commands.device": "\nDispositivo",
  "edgeControl.commands.devicePlaceholder": "\nSelecione um dispositivo",
  "edgeControl.commands.command": "\nComando",
  "edgeControl.commands.commandPlaceholder": "\nreiniciar, calibrar, sincronizar-config",
  "edgeControl.commands.payload": "\nCarga útil JSON",
  "edgeControl.commands.payloadPlaceholder": '{"alvo":"zone-a"}',
  "edgeControl.commands.submit": "\nComando de fila",
  "edgeControl.commands.empty": "\nNenhum comando de dispositivo na fila ainda.",
  "edgeControl.commands.notFound": "\nComando do dispositivo não encontrado.",
  "edgeControl.commands.failed": "\nFalha de comando relatada pelo dispositivo.",
  "edgeControl.commands.feedback.queued": "\nComando do dispositivo na fila para entrega de borda.",
  "edgeControl.commands.table.device": "\nDispositivo",
  "edgeControl.commands.table.command": "\nComando",
  "edgeControl.commands.table.status": "\nStatus",
  "edgeControl.commands.table.automation": "\nAutomação",
  "edgeControl.commands.table.updatedAt": "\nAtualizado",
  "edgeControl.commands.status.QUEUED": "\nNa fila",
  "edgeControl.commands.status.DELIVERED": "\nEntregue",
  "edgeControl.commands.status.ACKNOWLEDGED": "\nReconhecido",
  "edgeControl.commands.status.FAILED": "\nFalha",
  "edgeControl.commands.status.CANCELED": "\nCancelado",
  "edgeControl.automation.title": "\nAutomação é executada",
  "edgeControl.automation.description":
    "\nCrie registros de execução duráveis que enfileiram o trabalho do dispositivo e mantêm o histórico de execução dentro do centro de controle.",
  "edgeControl.automation.runTitle": "\nExecute título",
  "edgeControl.automation.runTitlePlaceholder": "\nReinicialização noturna do resfriador",
  "edgeControl.automation.kindLabel": "\nTipo de automação",
  "edgeControl.automation.device": "\nDispositivo",
  "edgeControl.automation.command": "\nComando",
  "edgeControl.automation.payload": "\nCarga útil JSON",
  "edgeControl.automation.notes": "\nNotas",
  "edgeControl.automation.notesPlaceholder": "\nNota opcional do operador",
  "edgeControl.automation.submit": "\nAutomação de fila",
  "edgeControl.automation.empty": "\nNenhuma execução de automação foi criada ainda.",
  "edgeControl.automation.feedback.queued":
    "\nExecução de automação enfileirada com um comando de borda.",
  "edgeControl.automation.table.title": "\nCorre",
  "edgeControl.automation.table.kind": "\nTipo",
  "edgeControl.automation.table.status": "\nStatus",
  "edgeControl.automation.table.device": "\nDispositivo",
  "edgeControl.automation.table.updatedAt": "\nAtualizado",
  "edgeControl.automation.kind.DEVICE_COMMAND": "\nComando do dispositivo",
  "edgeControl.automation.kind.EDGE_RUNBOOK": "\nRunbook de borda",
  "edgeControl.automation.status.QUEUED": "\nNa fila",
  "edgeControl.automation.status.RUNNING": "\nCorrendo",
  "edgeControl.automation.status.SUCCEEDED": "\nSucesso",
  "edgeControl.automation.status.FAILED": "\nFalha",
  "edgeControl.automation.status.CANCELED": "\nCancelado",
  "deployment.validation.airgappedProviderRequired":
    "\nA implantação airgapped permite apenas provedores locais de IA, como RamaLama ou Ollama.",
  "deployment.title": "\nPolítica de implantação",
  "deployment.description":
    "\nO modo de implantação rege o acesso de saída à rede, a política do provedor de IA e os limites de armazenamento.",
  "deployment.policyTitle": "\nPolítica",
  "deployment.policy.airgapped":
    "\nAs chamadas de rede externa são bloqueadas e a IA é restrita a provedores locais atendidos dentro do limite de implantação.",
  "deployment.policy.cloud":
    "\nAs implantações em nuvem permitem integrações de saída, mantendo o comando de borda e o estado de automação no plano de controle compartilhado.",
  "deployment.policy.onPrem":
    "\nAs implantações locais permanecem auto-hospedadas, mas ainda permitem integrações externas configuradas explicitamente.",
  "deployment.edgeControlTitle": "\nControle de borda",
  "deployment.edgeControlDescription":
    "\nAs filas de comando do dispositivo e as execuções de automação permanecem duráveis no Prisma, portanto, o dimensionamento do aplicativo não interrompe o trabalho em andamento.",
  "deployment.mode.CLOUD": "\nNuvem",
  "deployment.mode.ON_PREM": "\nNo local",
  "deployment.mode.AIRGAPPED": "Modo Air-gapped",
  "deployment.capability.externalNetworkEnabled": "\nRede externa habilitada",
  "deployment.capability.externalNetworkDisabled": "\nRede externa bloqueada",
  "deployment.capability.externalEmailEnabled": "\nE-mail externo permitido",
  "deployment.capability.externalEmailDisabled": "\nE-mail externo bloqueado",
  "deployment.capability.localProtocolReferencesOnly": "\nSomente referências de protocolo local",
  "deployment.capability.remoteProtocolReferencesAllowed":
    "\nReferências de protocolo remoto permitidas",
  "deployment.capability.localAiOnly": "\nApenas IA local",
  "deployment.capability.hybridAiAllowed": "\nIA híbrida permitida",
  "deployment.capability.localDeviceStorageOnly": "\nSomente armazenamento local",
  "deployment.capability.objectStorageAllowed": "\nArmazenamento de objetos permitido",
  "assets.media.noFile": "\nNenhum arquivo fornecido",
  "assets.media.invalidFileType": "\nTipo de arquivo inválido. Permitido: JPEG, PNG, GIF, WebP.",
  "assets.media.fileTooLarge": "\nArquivo muito grande. Máximo de 10 MB.",
  "assets.media.notFound": "\nMídia não encontrada",
  "assets.media.fileNotFound": "\nArquivo não encontrado",
  "assets.media.assetNotFound": "\nAtivo não encontrado",
  "assets.annotations.title": "\nAnotações de imagem",
  "assets.annotations.empty": "\nAinda não há anotações",
  "assets.annotations.open": "\nAbrir espaço de trabalho de anotação",
  "assets.annotations.segment": "\nExecute segmentação",
  "assets.annotations.segmentSuccess": "\nPropostas de segmentação criadas",
  "assets.annotations.segmentUnavailable":
    "\nA segmentação não está disponível com a configuração de IA atual. A anotação manual ainda está disponível.",
  "assets.annotations.segmentInvalid":
    "\nA resposta de segmentação não pôde ser convertida em geometria de anotação válida.",
  "assets.annotations.manualAdd": "\nAdicionar anotação manual",
  "assets.annotations.edit": "\nEditar polígono",
  "assets.annotations.confirm": "\nConfirmar",
  "assets.annotations.reject": "\nRejeitar",
  "assets.annotations.archive": "\nArquivo",
  "assets.annotations.save": "\nSalvar anotação",
  "assets.annotations.clearDraft": "\nLimpar rascunho",
  "assets.annotations.label": "\nEtiqueta",
  "assets.annotations.status": "\nStatus",
  "assets.annotations.source": "\nFonte",
  "assets.annotations.confidence": "\nConfiança",
  "assets.annotations.mask": "\nMáscara",
  "assets.annotations.maskToggle": "\nMostrar sobreposição de máscara",
  "assets.annotations.boxTool": "\nFerramenta de caixa",
  "assets.annotations.polygonTool": "\nFerramenta Polígono",
  "assets.annotations.regions": "\nRegiões",
  "assets.annotations.prompt": "\nSolicitação de segmentação",
  "assets.annotations.promptPlaceholder":
    "\nDestaque vazamentos, corrosão, rachaduras, controles ou outras regiões importantes",
  "assets.annotations.defaultLabel": "\nRegião",
  "assets.annotations.status.proposed": "\nProposto",
  "assets.annotations.status.confirmed": "\nConfirmado",
  "assets.annotations.status.rejected": "\nRejeitado",
  "assets.annotations.status.archived": "\nArquivado",
  "assets.annotations.source.ai": "IA",
  "assets.annotations.source.manual": "\nManual",
  "assets.annotations.validation.labelRequired": "\nO rótulo é obrigatório",
  "assets.annotations.validation.polygonInvalid":
    "\nO polígono deve conter pelo menos três pontos normalizados",
  "assets.annotations.validation.mediaNotFound": "\nA mídia de anotação não foi encontrada",
  "assets.annotations.validation.annotationNotFound": "\nAnotação não encontrada",
  "assets.annotations.saved": "\nAnotação salva",
  "assets.annotations.archived": "\nAnotação arquivada",
  "storage.notConfigured":
    "\nArmazenamento não configurado. Defina variáveis de ambiente OBJECT_STORAGE_*.",
  "storage.operationFailed": "\nFalha na operação de armazenamento",
  "assets.type.BUILDING": "\nEdifício",
  "assets.type.INFRASTRUCTURE": "\nInfraestrutura",
  "assets.type.TRAINING_RANGE": "\nFaixa de treinamento",
  "assets.type.RANGE_SAFETY_SYSTEM": "\nSistema de segurança de alcance",
  "assets.type.TARGETRY_SYSTEM": "\nSistema de Alvo",
  "assets.type.HVAC": "ACM",
  "assets.type.ELECTRICAL": "\nElétrica",
  "assets.type.PLUMBING": "\nEncanamento",
  "assets.type.STRUCTURAL": "\nEstrutural",
  "assets.type.MECHANICAL": "\nMecânico",
  "assets.type.FIRE_SAFETY": "\nSegurança contra incêndio",
  "assets.type.SECURITY": "\nSegurança",
  "assets.type.IT_INFRASTRUCTURE": "\nInfraestrutura de TI",
  "assets.type.VEHICLE": "\nVeículo",
  "assets.type.PLANT_HEAVY_MACHINERY": "\nPlantas e máquinas pesadas",
  "assets.type.KITCHEN_CATERING_EQUIPMENT": "\nEquipamentos de cozinha e catering",
  "assets.type.FORESTRY_ASSET": "\nAtivo Florestal",
  "assets.type.RURAL_ESTATE_ASSET": "\nAtivo Imobiliário Rural",
  "assets.type.HERITAGE_ASSET": "\nPatrimônio Patrimonial",
  "assets.type.ENVIRONMENTAL_ASSET": "\nAtivo Ambiental",
  "assets.type.GOVERNMENT_FURNISHED_EQUIPMENT": "\nEquipamento fornecido pelo governo",
  "assets.type.EQUIPMENT": "\nEquipamento",
  "assets.type.OTHER": "\nOutro",
  "assets.hierarchy.ESTATE": "\nPropriedade",
  "assets.hierarchy.FACILITY": "\nInstalação",
  "assets.hierarchy.SYSTEM": "\nSistema",
  "assets.hierarchy.SUBSYSTEM": "\nSubsistema",
  "assets.hierarchy.COMPONENT": "\nComponente",
  "assets.condition.OPERATIONAL": "\nOperacional",
  "assets.condition.DEGRADED": "\nDegradado",
  "assets.condition.CRITICAL": "\nCrítico",
  "assets.condition.FATIGUING": "\nFatigante",
  "assets.condition.DECOMMISSIONED": "\nDesativado",
  "assets.condition.unknown": "\nDesconhecido",
  "assets.lifecycle.ACTIVE": "\nAtivo",
  "assets.lifecycle.MONITORING": "\nMonitoramento",
  "assets.lifecycle.FATIGUING": "\nFatigante",
  "assets.lifecycle.DISPOSED": "\nDescartado",
  "digitalTwin.scene.hotspotTitle": "\nCobertura de ponto de acesso",
  "digitalTwin.scene.hotspotDescription":
    "\nOs marcadores operacionais são atualizados a partir do último estado gêmeo persistente.",
  "digitalTwin.scene.assetTitle": "\nContexto do ativo",
  "digitalTwin.scene.assetDescription":
    "\nCada ponto de acesso pode ser vinculado ao ativo de infraestrutura rastreado.",
  "digitalTwin.hotspots.title": "\nRegistro de ponto de acesso",
  "digitalTwin.hotspots.empty":
    "Nenhum ponto de acesso está disponível para o gêmeo digital atual.",
  "digitalTwin.hotspots.noDescription": "\nNenhuma descrição de ponto de acesso foi registrada.",
  "digitalTwin.hotspots.openTarget": "\nAbrir alvo",
  "digitalTwin.coords.x": "Eixo X",
  "digitalTwin.coords.y": "Eixo Y",
  "digitalTwin.coords.z": "Eixo Z",
  "kanban.title": "\nQuadro Kanban",
  "kanban.subtitle": "\nPipeline de execução para atribuições, agendamento e fluxo da equipe",
  "tasks.title": "\nQuadro de Tarefas",
  "tasks.subtitle": "\nPipeline de execução Kanban e fluxo de equipe",
  "tasks.filter.priority": "\nPrioridade",
  "tasks.filter.priority.all": "\nTodas as prioridades",
  "tasks.filter.status": "\nStatus",
  "tasks.filter.site": "\nLocal",
  "tasks.filter.assignee": "\nCessionário",
  "tasks.filter.assigneePlaceholder": "\nPesquisar ativo, cessionário ou equipe",
  "tasks.filter.priority.low": "\nBaixo",
  "tasks.filter.priority.medium": "\nMédio",
  "tasks.filter.priority.high": "\nAlto",
  "tasks.filter.priority.critical": "\nCrítico",
  "tasks.filter.site.allSites": "\nTodos os sites",
  "tasks.filter.site.northTraining": "\nLocal de Treinamento Norte",
  "tasks.filter.site.centralCommand": "\nComando Central",
  "tasks.column.backlog": "\nLista de pendências",
  "tasks.column.scheduled": "\nAgendado",
  "tasks.column.inProgress": "\nEm andamento",
  "tasks.column.completed": "\nConcluído",
  "tasks.column.empty": "\nNenhuma tarefa nesta coluna",
  "tasks.status.draft": "\nRascunho",
  "tasks.status.cancelled": "\nCancelado",
  "tasks.priority.LOW": "\nBaixo",
  "tasks.priority.MEDIUM": "\nMédio",
  "tasks.priority.HIGH": "\nAlto",
  "tasks.priority.CRITICAL": "\nCrítico",
  "tasks.type.INSPECTION": "\nInspeção",
  "tasks.type.REPAIR": "\nReparar",
  "tasks.type.REPLACEMENT": "\nSubstituição",
  "tasks.type.CALIBRATION": "\nCalibração",
  "tasks.type.EMERGENCY": "\nEmergência",
  "tasks.card.asset": "\nAtivo",
  "tasks.card.deadline": "\nPrazo",
  "tasks.card.crew": "\nTripulação",
  "tasks.card.priority": "\nPrioridade",
  "tasks.card.open": "\nVer Tarefa",
  "tasks.card.openAria": "\nAbrir detalhes da tarefa para {id}",
  "tasks.summary.pendingApproval": "\nAprovação pendente",
  "tasks.detail.title": "\nDetalhe da tarefa",
  "tasks.detail.subtitle":
    "\nSelecione um cartão de tarefa para inspecionar o contexto de atribuição",
  "tasks.detail.listTitle": "\nLista de verificação de conclusão de tarefa",
  "tasks.detail.completionCriteria": "\nCritérios de conclusão",
  "tasks.detail.requiredParts": "\nPeças necessárias",
  "tasks.detail.aiConfidence": "\nConfiança em IA",
  "tasks.workspace.title": "\nTarefa Controle de Missão",
  "tasks.workspace.heroEyebrow": "\nBancada de operações",
  "tasks.workspace.heroNarrative":
    "\nVisualização {mode} focada em {preset}. {total} tarefas com escopo definido, {active} ativo no fluxo, {unassigned} sem proprietário, {dueSoon} previsto para breve.",
  "tasks.workspace.modeLabel": "\nModo de bancada de tarefas",
  "tasks.workspace.mode.queue": "\nFila prioritária",
  "tasks.workspace.mode.board": "\nPlaca de fluxo",
  "tasks.workspace.mode.copilot": "\nCopiloto",
  "tasks.workspace.navigatorTitle": "\nNavegador",
  "tasks.workspace.navigatorSubtitle":
    "\nSalve o modelo mental do operador: escolha uma lente e, em seguida, divida o conjunto de dados.",
  "tasks.workspace.queueTitle": "\nFila de execução",
  "tasks.workspace.queueSubtitle":
    "\nListar primeiro detalhamento para envio, triagem e revisão do operador.",
  "tasks.workspace.boardTitle": "\nFluxo de Execução",
  "tasks.workspace.boardSubtitle":
    "\nVisualização da primeira pista para agendamento, monitoramento de WIP e alterações de status.",
  "tasks.workspace.detailTitle": "\nDrillthrough",
  "tasks.workspace.detailSubtitle":
    "\nTarefa selecionada, proprietário recomendado e próximo caminho de ação.",
  "tasks.workspace.detailEmpty":
    "\nSelecione um cartão de tarefa para inspecionar o contexto de execução e as recomendações de IA.",
  "tasks.workspace.presetLabel": "\nPredefinição",
  "tasks.workspace.preset.all": "\nToda a carga de trabalho",
  "tasks.workspace.preset.myQueue": "\nMinha fila",
  "tasks.workspace.preset.triage": "\nPrecisa de triagem",
  "tasks.workspace.preset.unassigned": "\nNão atribuído",
  "tasks.workspace.preset.dueSoon": "\nVencimento em breve",
  "tasks.workspace.preset.active": "\nFluxo ativo",
  "tasks.workspace.preset.completed": "\nConcluído recentemente",
  "tasks.workspace.preset.aiGenerated": "\nOriginado por IA",
  "tasks.workspace.preset.allDesc":
    "\nCarga de trabalho filtrada completa entre planejamento e execução.",
  "tasks.workspace.preset.myQueueDesc": "\nTarefas já atribuídas ao operador atual.",
  "tasks.workspace.preset.triageDesc":
    "\nItens de rascunho e pendências que ainda precisam de decisão.",
  "tasks.workspace.preset.unassignedDesc": "\nTrabalhe sem propriedade individual ou de equipe.",
  "tasks.workspace.preset.dueSoonDesc": "\nTarefas com vencimento nos próximos sete dias.",
  "tasks.workspace.preset.activeDesc":
    "\nTrabalho programado e em voo que atualmente consome capacidade.",
  "tasks.workspace.preset.completedDesc":
    "\nTrabalho encerrado recentemente para validação e transferência.",
  "tasks.workspace.preset.aiGeneratedDesc":
    "\nItens de trabalho vinculados à previsão ou com pontuação de IA.",
  "tasks.workspace.savedViewLabel": "\nVisualizações salvas",
  "tasks.workspace.savedView.dispatch": "Fila de despacho",
  "tasks.workspace.savedView.dispatchDesc":
    "\nMantenha o trabalho não atribuído e a pressão da equipe visíveis para encaminhamento rápido.",
  "tasks.workspace.savedView.slaWatch": "\nRelógio SLA",
  "tasks.workspace.savedView.slaWatchDesc":
    "\nFique atento ao trabalho que precisa ser intervencionado primeiro.",
  "tasks.workspace.savedView.automation": "\nRelógio de automação",
  "tasks.workspace.savedView.automationDesc":
    "\nRevise as tarefas originadas pela IA antes que elas passem para o agendamento e execução em campo.",
  "tasks.workspace.savedView.execution": "\nFoco de execução",
  "tasks.workspace.savedView.executionDesc":
    "\nAcompanhe o trabalho programado e em andamento sem sair da bancada.",
  "tasks.workspace.metric.total": "\nTarefas com escopo",
  "tasks.workspace.metric.totalDesc":
    "\nCarga de trabalho visível após a aplicação dos filtros atuais.",
  "tasks.workspace.metric.active": "\nEm execução",
  "tasks.workspace.metric.activeDesc": "\nTarefas agendadas e em andamento na visualização atual.",
  "tasks.workspace.metric.unassigned": "\nSem dono",
  "tasks.workspace.metric.unassignedDesc": "\nTarefas sem responsável direto ou equipe.",
  "tasks.workspace.metric.dueSoon": "\nVencimento em breve",
  "tasks.workspace.metric.dueSoonDesc": "\nTarefas com prazos nos próximos sete dias.",
  "tasks.workspace.metric.overdue": "\nVencido",
  "tasks.workspace.primaryAction": "\nAdicionar tarefa",
  "tasks.workspace.filtersHint":
    "\nA alteração de uma segmentação de dados atualiza a consulta do quadro e mantém o URL compartilhável.",
  "tasks.workspace.slaTitle": "\nEnvelhecimento do SLA",
  "tasks.workspace.slaDescription":
    "\nMantenha visíveis os trabalhos atrasados, com vencimento em breve e de reatribuição antes que passem para o próximo turno.",
  "tasks.workspace.slaAging.overdue": "\n{count} dia(s) de atraso",
  "tasks.workspace.slaAging.today": "\nVencimento hoje",
  "tasks.workspace.slaAging.dueIn": "\nVencimento em {count} dia(s)",
  "tasks.workspace.slaAging.onTrack": "\nNo caminho certo",
  "tasks.workspace.bulkCueTitle": "\nDicas de triagem em massa",
  "tasks.workspace.bulkCueDescription":
    "\nVá para as fatias de triagem, reatribuição ou encerramento sem reconstruir os filtros atuais.",
  "tasks.workspace.bulkTriageTitle": "\nTriagem em massa",
  "tasks.workspace.bulkTriageDescription":
    "\nVarra tarefas atrasadas, que vencem em breve e que exigem muita atenção antes que elas passem para o próximo turno.",
  "tasks.workspace.bulkReassignTitle": "\nDicas de reatribuição",
  "tasks.workspace.bulkReassignDescription":
    "\nMantenha o trabalho não atribuído visível para que o despacho e a transferência da equipe fiquem à frente da fila.",
  "tasks.workspace.shortcutTitle": "\nAtalhos de teclado",
  "tasks.workspace.shortcutDescription":
    "\nUse os atalhos do ambiente de trabalho para criação rápida de tarefas, alterações de quadro e transferência de IA.",
  "tasks.workspace.bulkReassign": "\nReatribuir trabalho sem dono",
  "tasks.workspace.bulkHandoff": "\nPreparar fila de transferência",
  "tasks.workspace.bulkCloseReady": "\nRevise o trabalho pronto",
  "tasks.workspace.wipTitle": "\nPostura WIP",
  "tasks.workspace.wipDescription":
    "\nRastreie a capacidade de voo por faixa para que o trabalho bloqueado seja escalado antes que as tripulações parem.",
  "tasks.workspace.wipHealthy": "\nO fluxo está dentro dos limites atuais de WIP.",
  "tasks.workspace.wipAtRisk":
    "\n{count} a(s) pista(s) estão acima das grades de proteção WIP atuais.",
  "tasks.workspace.swimlaneTitle": "\nFoco na raia",
  "tasks.workspace.swimlaneDescription":
    "\nMantenha o site atual e o contexto do proprietário visíveis enquanto você alterna entre os modos de fila e quadro.",
  "tasks.workspace.clearFilterAria": "\nLimpar filtro {label}",
  "tasks.workspace.unassignedValue": "\nNão atribuído",
  "tasks.workspace.aiConfidence": "\nConfiança em IA",
  "tasks.workspace.aiOriginLabel": "\nOrigem da IA",
  "tasks.workspace.aiOrigin.prediction": "\nGerado por previsão",
  "tasks.workspace.column.backlogDesc":
    "\nTrabalho pronto para moldar antes que a capacidade de mão de obra ou calendário seja comprometida.",
  "tasks.workspace.column.scheduledDesc":
    "Trabalho comprometido organizado para equipes, transferências e janelas do local.",
  "tasks.workspace.column.inProgressDesc":
    "\nExecução de campo ativo que precisa de remoção de bloqueador e observação de SLA.",
  "tasks.workspace.column.completedDesc":
    "\nTrabalho concluído aguardando validação, auditoria ou transferência das partes interessadas.",
  "tasks.workspace.workflowTitle": "\nProgressão do fluxo de trabalho",
  "tasks.workspace.moveTitle": "\nMover tarefa",
  "tasks.workspace.empty.BACKLOG":
    "\nNenhum item do backlog corresponde à fatia do conjunto de dados atual.",
  "tasks.workspace.empty.SCHEDULED":
    "\nNenhum trabalho agendado corresponde à fatia do conjunto de dados atual.",
  "tasks.workspace.empty.IN_PROGRESS":
    "\nNenhum trabalho de execução ativo corresponde à fatia do conjunto de dados atual.",
  "tasks.workspace.empty.COMPLETED":
    "\nNenhum trabalho concluído corresponde à fatia do conjunto de dados atual.",
  "tasks.workspace.queue.attention": "\nPrecisa de atenção",
  "tasks.workspace.queue.attentionDesc":
    "\nTrabalho atrasado ou de curto prazo que precisa de uma decisão do operador agora.",
  "tasks.workspace.queue.dispatch": "\nDespacho e pessoal",
  "tasks.workspace.queue.dispatchDesc":
    "\nUse esta lista para atribuir trabalho sem dono antes que se torne uma dívida de fluxo.",
  "tasks.workspace.queue.active": "\nEm execução",
  "tasks.workspace.queue.activeDesc":
    "\nTrabalho atual planejado e em andamento ordenado por data de vencimento e prioridade.",
  "tasks.workspace.queue.closed": "\nConclusões recentes",
  "tasks.workspace.queue.closedDesc":
    "\nTrabalho recentemente concluído para auditoria, transferência e acompanhamento.",
  "tasks.workspace.queue.empty": "\nEsta fila está atualmente limpa para a fatia escolhida.",
  "tasks.workspace.filteredEmpty.title": "\nNenhum resultado corresponde aos seus filtros",
  "tasks.workspace.filteredEmpty.description":
    "\nAjuste ou limpe os filtros para voltar a ver tarefas nesta faixa.",
  "tasks.workspace.recommendation.title": "\nRecomendação de pessoal de IA",
  "tasks.workspace.recommendation.confidenceLabel": "\nConfiança na recomendação",
  "tasks.workspace.recommendation.noMatch": "\nNenhuma correspondência de pessoal disponível ainda",
  "tasks.workspace.recommendation.assigneeRecommended": "\nTrabalho individual recomendado",
  "tasks.workspace.recommendation.crewRecommended": "\nAtribuição de tripulação recomendada",
  "tasks.workspace.recommendation.reason.assigneeContinuity":
    "\nA cobertura {role} em {site} mantém o contexto da tarefa atual com {openTasks} tarefas ativas.",
  "tasks.workspace.recommendation.reason.assigneeLoad":
    "\nA cobertura de {role} em {site} tem a carga de trabalho ativa mais leve em tarefas de {openTasks}.",
  "tasks.workspace.recommendation.reason.crewEscalation":
    "\n{crew} cobre {site} com um líder de manutenção em rotação para esta tarefa {taskType}.",
  "tasks.workspace.recommendation.reason.crewCapacity":
    "\n{crew} cobre {site} com {memberCount} membros ativos e {openTasks} tarefas ativas.",
  "tasks.workspace.recommendation.reason.noMatch":
    "\nNenhuma equipe do local ou cobertura técnica está configurada para {site} ainda.",
  "tasks.workspace.test.completionCriterionSample": "\nVerifique a normalização do fluxo de ar",
  "tasks.workspace.test.requiredPartSample": "\nPacote de filtros",
  "tasks.workspace.chat.noSelection": "\nNenhuma tarefa está selecionada no momento.",
  "tasks.workspace.chat.selection":
    "\nTarefa selecionada {task}, status {status}, prioridade {priority}, proprietário {assignee}.",
  "tasks.workspace.chat.pageContext":
    "\nBancada de tarefas na visualização {mode}. {stats}. {filters}. {task}.",
  "tasks.workspace.copilot.title": "\nCopiloto de IA",
  "tasks.workspace.copilot.subtitle":
    "\nAs ações prontas para prompt permanecem vinculadas ao conjunto de dados visível e ao estado de detalhamento.",
  "tasks.workspace.copilot.description":
    "Mantenha o assistente próximo ao trabalho: resuma a carga de trabalho visível, diagnostique gargalos de fluxo ou elabore notas de transferência sem sair do centro de comando.",
  "tasks.workspace.copilot.askAi": "\nPergunte a AI",
  "tasks.workspace.copilot.openPrompt":
    "\nRevise o espaço de trabalho de tarefas visíveis e ajude-me a decidir a próxima ação operacional.",
  "tasks.workspace.copilot.brief": "\nResumo operacional",
  "tasks.workspace.copilot.briefPrompt":
    "\nResuma o espaço de trabalho da tarefa {mode} atual para a predefinição {preset}. Destaque itens urgentes, lacunas de pessoal e próximas ações recomendadas.",
  "tasks.workspace.copilot.bottleneck": "\nEncontre gargalos",
  "tasks.workspace.copilot.bottleneckPrompt":
    "\nObserve a carga de trabalho da tarefa visível e identifique os principais gargalos, bloqueadores e riscos de WIP.",
  "tasks.workspace.copilot.handoff": "\nTransferência de rascunho",
  "tasks.workspace.copilot.handoffPrompt":
    "\nElabore uma transferência concisa do operador para a carga de trabalho da tarefa visível, incluindo o que mudou, o que está bloqueado e o que deve acontecer a seguir.",
  "tasks.workspace.copilot.executionPlan": "\nProjeto de plano de execução",
  "tasks.workspace.copilot.executionPlanPrompt":
    "\nCrie um plano de execução para a tarefa {task} no ativo {asset} no site {site}. Inclui sequenciamento, bloqueadores a serem verificados e etapas de comunicação.",
  "tasks.workspace.copilot.blockers": "\nAnalisar bloqueadores",
  "tasks.workspace.copilot.blockersPrompt":
    "\nAnalise prováveis bloqueadores, dados ausentes e pontos de risco para a tarefa {task}.",
  "tasks.workspace.copilot.statusUpdate": "\nAtualização de status do rascunho",
  "tasks.workspace.copilot.statusUpdatePrompt":
    "\nEscreva uma atualização de status concisa para a tarefa {task}. O status atual do fluxo de trabalho é {status}.",
  "predictions.title": "\nFeed de previsões",
  "predictions.subtitle": "\nSinais de risco de ciclo de vida e manutenção gerados por IA",
  "predictions.filter.severity": "\nGravidade",
  "predictions.filter.severity.all": "\nTodos",
  "predictions.filter.severity.info": "\nInformações",
  "predictions.filter.severity.warning": "\nAviso",
  "predictions.filter.severity.critical": "\nCrítico",
  "predictions.filter.severity.emergency": "\nEmergência",
  "predictions.filter.site": "\nLocal",
  "predictions.filter.site.allSites": "\nTodos os sites",
  "predictions.filter.site.northTraining": "\nLocal de Treinamento Norte",
  "predictions.filter.site.westCompound": "\nComposto Oeste",
  "predictions.filter.assetType": "\nTipo de ativo",
  "predictions.filter.assetType.all": "\nTodos os tipos",
  "predictions.filter.assetType.electrical": "\nElétrica",
  "predictions.filter.assetType.plumbing": "\nEncanamento",
  "predictions.filter.assetType.hvac": "ACM",
  "predictions.feed.title": "\nFila de previsão ao vivo",
  "predictions.feed.reasoning": "\nRaciocínio",
  "predictions.feed.remainingLife": "\nVida restante",
  "predictions.feed.confidence": "\nConfiança",
  "predictions.feed.expand": "\nExpandir cadeia",
  "predictions.feed.generatorFailureTitle": "\nJanela de falha do gerador A-21",
  "predictions.feed.pumpCollapseTitle": "\nColapso de pressão da bomba P-08",
  "predictions.feed.generatorRemainingLife": "\n14 dias",
  "predictions.feed.pumpRemainingLife": "\n6 dias",
  "predictions.feed.generatorConfidence": "86% (exemplo)",
  "predictions.feed.pumpConfidence": "93% (exemplo)",
  "predictions.reasoning.title": "\nCadeia de raciocínio",
  "predictions.reasoning.subtitle": "\nResumo do modelo, contexto e recomendação",
  "predictions.reasoning.list.variance":
    "\nA variação da telemetria excedeu a linha de base móvel em 42%.",
  "predictions.reasoning.list.seal":
    "\nO histórico de manutenção indica padrão repetido de degradação do selo.",
  "predictions.reasoning.list.action":
    "\nAção recomendada: criar automaticamente tarefa de substituição de rascunho em 48h.",
  "predictions.reasoning.placeholder":
    "\nO rastreamento de raciocínio será transmitido quando as previsões estiverem disponíveis.",
  "predictions.reasoning.asset": "\nAtivo",
  "predictions.reasoning.model": "\nModelo",
  "predictions.reasoning.confidence": "\nConfiança",
  "predictions.type.failure": "\nFalha",
  "predictions.type.degradation": "\nDegradação",
  "predictions.type.maintenanceDue": "\nManutenção vencida",
  "predictions.type.lifecycleEnd": "\nFim do ciclo de vida",
  "predictions.workspace.eyebrow": "\nComando de risco de IA",
  "predictions.workspace.title":
    "\nPrevisão, inventário e fluxo de ação em uma superfície de controle",
  "predictions.workspace.description":
    "Um espaço de trabalho estilo Power BI para classificar sinais de risco de IA em tempo real em relação ao inventário de ativos, backlog operacional e pressão de aquisição ou descarte downstream.",
  "predictions.workspace.live": "\nAtualiza a cada {seconds}s",
  "predictions.workspace.filtersTitle": "\nBarra de comando de filtro",
  "predictions.workspace.filtersDescription":
    "\nPesquise ativos e restrinja a previsão atual definida por gravidade, site, tipo de ativo e tempo recente da previsão.",
  "predictions.workspace.searchLabel": "\nPesquisar inventário",
  "predictions.workspace.searchPlaceholder": "\nFiltrar por nome do ativo ou site",
  "predictions.workspace.legendDescription":
    "\nAs cores de gravidade permanecem consistentes nos cartões de destaque, na grade de inventário e no trilho de explicabilidade.",
  "predictions.workspace.methodologyTitle": "\nModelo de classificação",
  "predictions.workspace.methodologyDescription":
    "\nAs pontuações combinam a urgência da IA com inventário, fluxo de trabalho e fluxo comercial para que os operadores possam trabalhar em uma fila.",
  "predictions.workspace.methodologyItemSignals":
    "\nA confiança da IA, o tipo de previsão e as janelas de vida restante impulsionam a urgência operacional básica.",
  "predictions.workspace.methodologyItemInventory":
    "\nO valor do estoque, a condição dos ativos e o estágio do ciclo de vida aumentam a pressão sobre os ativos de alta exposição.",
  "predictions.workspace.methodologyItemWorkflow":
    "\nTarefas abertas mais atividades ativas de aquisição ou descarte moldam o que deve acontecer a seguir.",
  "predictions.workspace.panelTitle": "\nCentro de comando de risco",
  "predictions.workspace.panelDescription":
    "\nMonitore os sinais de IA mais fortes, sua exposição ao estoque e o fluxo operacional que já está sendo construído em torno deles.",
  "predictions.workspace.generatedAt": "\nAtualizado {generatedAt}",
  "predictions.workspace.kpi.activeSignals": "\nSinais ativos",
  "predictions.workspace.kpi.activeSignalsHint":
    "\nPrevisões de IA filtradas atualmente na fila corporativa.",
  "predictions.workspace.kpi.activeSignalsTrend": "\n{count} crítico ou emergencial",
  "predictions.workspace.kpi.dueSoon": "\nVencimento em breve",
  "predictions.workspace.kpi.dueSoonHint":
    "\nSinais cuja vida restante está dentro do limite de intervenção.",
  "predictions.workspace.kpi.inventoryExposure": "\nExposição de estoque",
  "predictions.workspace.kpi.inventoryExposureHint":
    "\nValor contábil representado pelo conjunto de previsões filtrado.",
  "predictions.workspace.kpi.aiCoverage": "\nCobertura de IA",
  "predictions.workspace.kpi.aiCoverageHint":
    "\nAtivos na fatia de inventário atual com histórico de previsão.",
  "predictions.workspace.kpi.averageConfidenceTrend": "\n{confidence}% confiança média",
  "predictions.workspace.kpi.liveTrend": "\nAo vivo a partir de {generatedAt}",
  "predictions.workspace.distribution.severity": "\nMistura de gravidade",
  "predictions.workspace.distribution.assetMix": "\nCombinação de ativos",
  "predictions.workspace.distribution.siteMix": "\nMistura de sites",
  "predictions.workspace.boardTitle": "\nQuadro de risco classificado",
  "predictions.workspace.boardDescription":
    "\nOs sinais mais fortes em termos de falha, degradação, manutenção e pressão do ciclo de vida, classificados por urgência e impacto empresarial.",
  "predictions.workspace.boardEmpty":
    "\nNenhuma previsão filtrada está disponível ainda. Expanda os filtros ou aguarde a chegada de mais telemetria.",
  "predictions.workspace.table.title": "\nGrade de risco de estoque",
  "predictions.workspace.table.description":
    "Uma densa grade de operadores para verificar a exposição de ativos, a pressão do fluxo de trabalho e a próxima ação de explicabilidade.",
  "predictions.workspace.table.asset": "\nAtivo",
  "predictions.workspace.table.severity": "\nSinal",
  "predictions.workspace.table.inventory": "\nEstoque",
  "predictions.workspace.table.workflow": "\nFluxo de trabalho",
  "predictions.workspace.table.inspect": "\nEvidência aberta",
  "predictions.workspace.tableEmpty":
    "\nNenhuma linha de inventário corresponde ao conjunto de filtros atual.",
  "predictions.workspace.railTitle": "\nTrilho de explicabilidade",
  "predictions.workspace.railDescription":
    "\nUm resumo conciso da IA, além do modelo do sinal selecionado, dados de origem e evidências operacionais de apoio.",
  "predictions.workspace.assistant.title": "\nResumo de operações de IA",
  "predictions.workspace.assistant.description":
    "\nUm breve resumo empresarial baseado no conjunto de dados de previsão ativo e no sinal selecionado.",
  "predictions.workspace.assistant.sourceAI": "\nResumo de IA",
  "predictions.workspace.assistant.sourceSystem": "\nResumo do sistema",
  "predictions.workspace.assistant.generatedAt": "\nGerado {generatedAt}",
  "predictions.workspace.chatContext":
    "\nCentro de controle de previsões. Espaço de trabalho unificado para sinais de risco de IA, exposição de inventário, pendências operacionais e pressão de aquisição downstream. Controles: pesquisa, gravidade, site, tipo de ativo e intervalo de datas. Seções primárias: faixa de KPI, quadro de risco classificado, grade de inventário e trilho de evidências de IA.",
  "predictions.workspace.assistant.headlineCritical":
    "\nO risco crítico é definir a postura operacional",
  "predictions.workspace.assistant.headlineMonitor":
    "\nAs janelas de intervenção estão sendo compactadas na fila",
  "predictions.workspace.assistant.headlineStable":
    "\nA fila está ativa, mas amplamente controlada",
  "predictions.workspace.assistant.fallbackLead":
    "\n{asset} em {site} é o candidato principal à intervenção com {days} dias restantes de vida com {confidence}% de confiança.",
  "predictions.workspace.assistant.fallbackEmpty":
    "\nNenhuma previsão dominante está liderando a fila filtrada no momento. Mantenha a cobertura de telemetria saudável e monitore novos sinais conforme eles chegam.",
  "predictions.workspace.assistant.fallbackCoverage":
    "\nA fatia atual contém {signals} sinais ao vivo que representam cerca de {exposure} de exposição de estoque, com {dueSoon} janelas de intervenção já dentro do limite de curto prazo.",
  "predictions.workspace.card.score": "\nPontuação",
  "predictions.workspace.card.scoreValue": "\nPontuação {score}",
  "predictions.workspace.card.remainingLifeValue": "\n{days} dias",
  "predictions.workspace.card.inventory": "\nEstoque",
  "predictions.workspace.card.signalCoverage": "\nDados de origem",
  "predictions.workspace.card.signalCoverageValue": "\n{count} grupos de recursos",
  "predictions.workspace.card.openTasksValue": "\n{count} abrir tarefas",
  "predictions.workspace.card.workOrdersValue": "\n{count} ordens de serviço ativas",
  "predictions.workspace.card.documentsValue": "\n{count} abrir documentos",
  "predictions.workspace.card.generatedTask": "\nTarefa gerada",
  "predictions.workspace.action.escalate":
    "\nEncaminhe imediatamente para a liderança de manutenção e valide a capacidade de intervenção dentro da próxima janela operacional.",
  "predictions.workspace.action.procure":
    "\nConfirme a cobertura das peças, alinhe a aquisição e mova o ativo para o próximo slot de intervenção disponível.",
  "predictions.workspace.action.schedule":
    "Agende a revisão de manutenção e verifique se o backlog e o plano de estoque podem absorver o sinal antes que ele endureça.",
  "predictions.workspace.action.monitor":
    "\nMantenha a coleta de telemetria estável, revise a linha de tendência dos ativos e monitore a degradação adicional antes de despachar o trabalho.",
  "predictions.workspace.detail.evidence": "\nEvidência operacional",
  "predictions.workspace.detail.evidenceDescription":
    "\nEvidência determinística reunida a partir de conjuntos de dados de ativos, fluxo de trabalho e documentos transacionais em torno do sinal selecionado.",
  "predictions.workspace.detail.sourceData": "\nDados de origem e metadados do modelo",
  "predictions.workspace.detail.sourceDataDescription":
    "\nGrupos de recursos capturados da carga útil de entrada armazenada, juntamente com metadados de modelo e provedor.",
  "predictions.workspace.detail.lifecycle": "\nCiclo de vida",
  "predictions.workspace.detail.condition": "\nCondição",
  "predictions.workspace.detail.generatedAt": "\nGerado em",
  "predictions.workspace.detail.openTasksEvidence":
    "\n{count} tarefas de manutenção ativas já estão abertas para este ativo.",
  "predictions.workspace.detail.noOpenTasksEvidence":
    "\nNenhuma tarefa de manutenção ativa está atualmente vinculada a este ativo.",
  "predictions.workspace.detail.workOrdersEvidence":
    "\n{count} ordens de serviço ativas já estão vinculadas a este ativo.",
  "predictions.workspace.detail.customerOrdersEvidence":
    "\n{count} pedidos de clientes estão atualmente fluindo através deste contexto de ativo.",
  "predictions.workspace.detail.purchaseOrdersEvidence":
    "\n{count} ordens de compra ainda estão abertas neste contexto de ativo.",
  "predictions.workspace.detail.invoicesEvidence":
    "\n{count} fatura(s) ainda carregam pressão de cobrança ou cumprimento para este contexto de ativo.",
  "predictions.workspace.detail.noDocumentEvidence":
    "\nNenhuma ordem de serviço, pedido de cliente, pedido de compra ou fatura vinculado está aberto no momento.",
  "predictions.workspace.detail.createdEvidence": "\nSinal gerado {generatedAt}.",
  "predictions.workspace.outcomeTitle": "\nResultados da promoção para ação",
  "predictions.workspace.outcomeDescription":
    "\nMova o sinal mais forte para o acompanhamento de tarefas, aquisições ou monitoramento.",
  "finance.title": "\nFinanças",
  "finance.subtitle": "\nExposição à depreciação e avaliações ajustadas por IA",
  "financePlanning.title": "\nPlanejamento Financeiro",
  "financePlanning.subtitle":
    "\nPostura orçamentária, pressão de capital e planejamento do ciclo de vida",
  "financePlanning.coverage":
    "\nUse o ativo atual, o local, o documento e a postura de previsão como base para o planejamento de orçamento e cenário.",
  "financePlanning.kpi.assets": "\nAtivos rastreados",
  "financePlanning.kpi.assetsDesc": "\nAtivos que podem ser incluídos nos cenários de planejamento",
  "financePlanning.kpi.sites": "\nSites no escopo",
  "financePlanning.kpi.sitesDesc": "\nLocais que contribuem para o planejamento orçamentário",
  "financePlanning.kpi.openDocuments": "\nDocumentos abertos",
  "financePlanning.kpi.openDocumentsDesc":
    "\nDocumentos transacionais atualmente ativos em demanda, entrega, compra e faturamento",
  "financePlanning.kpi.dueSoon": "\nEm breve sinaliza",
  "financePlanning.kpi.dueSoonDesc": "\nSinais que podem se transformar em demanda de substituição",
  "financePlanning.summary.alertTitle":
    "\nA postura de planejamento já pode ser baseada em dados de portfólio em tempo real",
  "financePlanning.summary.alertDescription":
    "Use perfis de planejamento do local, sinais de ativos com vencimento em breve, documentos prontos para execução e relatórios salvos para preparar orçamentos e cenários sem uma pilha de planejamento separada.",
  "financePlanning.summary.tab.readiness": "\nProntidão",
  "financePlanning.summary.tab.handoff": "\nTransferência",
  "financePlanning.summary.tab.intake": "\nIngestão de vários domínios",
  "financePlanning.summary.siteTitle": "\nProntidão de planejamento do local",
  "financePlanning.summary.siteDescription":
    "\nOs perfis de planejamento são a estrutura atual para levar as instalações, a frota e o contexto operacional às decisões financeiras.",
  "financePlanning.summary.siteProfiles": "\nPerfis de planejamento",
  "financePlanning.summary.siteProfilesDesc":
    "\n{total} sites estão atualmente disponíveis para planejamento.",
  "financePlanning.summary.assetScope": "\nPortfólio no escopo",
  "financePlanning.summary.assetScopeDesc":
    "\nA atual base de ativos gerenciados já é grande o suficiente para suportar fatias de planejamento orientadas por cenários.",
  "financePlanning.summary.postureTitle": "\nPostura de prontidão",
  "financePlanning.summary.postureDescription":
    "\nPromova o contexto de planejamento do local, documentos prontos para execução e sinais de risco juntos para que o planejamento financeiro se torne um fluxo de trabalho conectado em vez de uma exportação de planilha.",
  "financePlanning.summary.badgeSites": "\nSites",
  "financePlanning.summary.badgeDocuments": "\nDocumentos",
  "financePlanning.summary.badgeSignals": "\nSinais",
  "financePlanning.summary.pressureTitle": "\nPressão de capital prevista para breve",
  "financePlanning.summary.pressureDesc":
    "\nAs previsões dentro da janela de curto prazo são o indicador antecedente atual para o orçamento e a demanda de reposição.",
  "financePlanning.summary.documentsTitle": "\nDocumentos prontos para execução",
  "financePlanning.summary.documentsDesc":
    "\nOs documentos operacionais aprovados e emitidos já estão preparados para entrega, compras e acompanhamento de coletas.",
  "financePlanning.summary.reportTitle": "\nSaídas de planejamento salvas",
  "financePlanning.summary.reportDesc":
    "\nOs relatórios salvos são a superfície de transferência atual para empacotamento das partes interessadas e revisão de planejamento.",
  "financePlanning.summary.intakeTitle": "\nIngestão de planejamento entre domínios",
  "financePlanning.summary.intakeDescription":
    "\nO planejamento financeiro é agora a superfície de acúmulo para a demanda operacional capturada em frota, edifícios e sensores.",
  "financePlanning.summary.intakeFleetTitle":
    "\nIniciativas de frota aguardando embalagem de cenário",
  "financePlanning.summary.intakeFleetDesc":
    "\nIniciativas de substituição, conformidade e manutenção de veículos agora podem ser contadas como insumos financeiros diretos.",
  "financePlanning.summary.intakeBuildingsTitle":
    "\nIniciativas de instalações prontas para enquadramento orçamentário",
  "financePlanning.summary.intakeBuildingsDesc":
    "\nIniciativas de sistemas construtivos e espaciais estão disponíveis para modelagem de cenários operacionais e de capital.",
  "financePlanning.summary.intakeSensorsTitle":
    "\nAlertas de sensores sinalizando pressão de planejamento",
  "financePlanning.summary.intakeSensorsDesc":
    "\nAs regras de alerta do sensor identificam condições de telemetria que podem justificar intervenção, peças sobressalentes ou orçamento de substituição.",
  "financePlanning.summary.intakeAlert":
    "Use esta via de entrada para transformar o trabalho operacional em cenários de planejamento sem redigitar o mesmo contexto de decisão.",
  "financePlanning.summary.intakeTotal": "\nSinais operacionais de entrada",
  "financePlanning.summary.intakeTotalDesc":
    "\nIniciativas e regras entre domínios atualmente disponíveis para serem traduzidas em cenários de planejamento financeiro.",
  "financePlanning.summary.scenarioDrafts": "\nCenários no convés",
  "financePlanning.summary.scenarioDraftsDesc":
    "\nCenários de planejamento existentes já capturados no espaço de trabalho de planejamento financeiro.",
  "financePlanning.summary.badgeFleet": "\nFrota",
  "financePlanning.summary.badgeBuildings": "\nEdifícios",
  "financePlanning.summary.badgeSensors": "\nSensores",
  "financePlanning.summary.intakePosture":
    "\nO espaço de trabalho de planejamento financeiro agora pode atuar como ponto de transferência compartilhado entre a captura da iniciativa operacional e a modelagem do orçamento em nível de portfólio.",
  "financePlanning.seed.ready": "\nPronto para semear",
  "financePlanning.seed.empty":
    "\nNenhum sinal de planejamento está disponível para propagação ainda.",
  "financePlanning.seed.count": "\n{count} sinaliza na entrada",
  "financePlanning.seed.apply": "\nCenário semente",
  "financePlanning.seed.unavailable": "\nNenhuma semente disponível",
  "financePlanning.seed.applied": "\n{source} contexto copiado para o formulário do cenário.",
  "financePlanning.seed.fleet.title": "\nSemente da frota",
  "financePlanning.seed.fleet.description":
    "\nUse a iniciativa de frota mais recente para preencher previamente um cenário de planejamento com escopo, urgência e notas operacionais.",
  "financePlanning.seed.buildings.title": "\nSemente de edifícios",
  "financePlanning.seed.buildings.description":
    "\nUse a mais recente iniciativa de instalações para preencher previamente o contexto de planejamento operacional ou de capital.",
  "financePlanning.seed.sensors.title": "\nSemente de sensores",
  "financePlanning.seed.sensors.description":
    "\nUse a regra de alerta de sensor mais recente para transformar a pressão de telemetria em um cenário de planejamento inicial.",
  "financePlanning.seed.fleetPrefix": "\nTransferência de frota",
  "financePlanning.seed.fleetContext":
    "\nSemeado a partir da iniciativa da frota. Categoria: {category}. Prioridade: {priority}.",
  "financePlanning.seed.fleetSummary": "\nÚltima iniciativa de frota atualizada {updatedAt}.",
  "financePlanning.seed.buildingsPrefix": "\nTransferência de instalações",
  "financePlanning.seed.buildingsContext":
    "\nSemeado a partir da iniciativa de instalações. Categoria: {category}. Fase: {phase}.",
  "financePlanning.seed.buildingsSummary":
    "\nÚltima iniciativa de instalações atualizada {updatedAt}.",
  "financePlanning.seed.sensorsPrefix": "\nTransferência do sensor",
  "financePlanning.seed.sensorsContext":
    "\nSemeado a partir da regra de alerta do sensor. Série: {seriesKey}. Comparador: {comparator}. Limite: {threshold}. Gravidade: {severity}.",
  "financePlanning.seed.sensorsSummary":
    "\nRegra de alerta de sensor mais recente atualizada {updatedAt}.",
  "financePlanning.form.title": "\nCrie um cenário de planejamento",
  "financePlanning.form.description":
    "\nCapture o próximo orçamento ou cenário de capital diretamente da postura de planejamento em tempo real e, em seguida, entregue-o às finanças, aos fluxos de trabalho de documentos e aos fluxos de relatórios.",
  "financePlanning.form.badge": "\nFluxo SSR durável",
  "financePlanning.form.nameLabel": "\nTítulo do cenário",
  "financePlanning.form.namePlaceholder": "\nAtualização HVAC do campus 2027",
  "financePlanning.form.nameHint":
    "\nNomeie o pacote de decisão que os operadores reconhecerão mais tarde.",
  "financePlanning.form.scopeLabel": "\nEscopo",
  "financePlanning.form.scopePlaceholder": "Edifícios, frota, sensores ou fatia do portfólio",
  "financePlanning.form.scopeHint":
    "\nMantenha o escopo alinhado a um departamento, grupo de sites ou tema de portfólio.",
  "financePlanning.form.horizonLabel": "\nHorizonte de planejamento",
  "financePlanning.form.horizonHint": "\n{min}-{max} meses, dependendo do ciclo de planejamento.",
  "financePlanning.form.horizonUnit": "\nmeses",
  "financePlanning.form.horizonValue": "\n{months} meses",
  "financePlanning.form.notesLabel": "\nNotas e suposições",
  "financePlanning.form.notesPlaceholder":
    "\nCapture suposições de gastos, restrições de tempo, postura de risco e o que deve ser transferido para compras ou relatórios a seguir.",
  "financePlanning.form.notesHint":
    "\nUse isto para registrar o raciocínio que deve sobreviver em aprovações e pacotes de relatórios.",
  "financePlanning.form.requiredHint": "\nTítulo, escopo e horizonte são obrigatórios.",
  "financePlanning.form.submit": "\nSalvar cenário",
  "financePlanning.form.submitAria": "\nSalvar cenário de planejamento financeiro",
  "financePlanning.form.recentTitle": "\nCenários recentes",
  "financePlanning.form.recentDescription":
    "\nEsses cenários agora persistem como registros de planejamento financeiro duráveis, sem sair do fluxo SSR.",
  "financePlanning.form.empty": "\nNenhum cenário de planejamento financeiro capturado ainda.",
  "financePlanning.form.savedAt": "\nAtualizado {updatedAt}",
  "financePlanning.form.notesEmpty": "\nNenhuma nota capturada ainda.",
  "financePlanning.validation.titleRequired": "O titulo do cenario e obrigatorio.",
  "financePlanning.validation.scopeRequired": "\nO escopo do cenário é obrigatório.",
  "financePlanning.validation.seedSourceInvalid":
    "\nA fonte da semente deve vir de frota, edifícios ou sensores.",
  "financePlanning.validation.horizonRange":
    "\nO horizonte de planejamento deve estar entre {min} e {max} meses.",
  "financePlanning.feedback.draftSaved":
    "\nCenário financeiro salvo no espaço de trabalho de planejamento financeiro.",
  "financePlanning.feedback.draftSaveFailed":
    "\nIncapaz de persistir o cenário financeiro neste momento.",
  "financePlanning.status.draft": "\nCenário",
  "financePlanning.draft.promoteReports": "Abrir nos relatorios",
  "financePlanning.readiness.assets":
    "\nA postura dos ativos e do site já alimenta o escopo do planejamento.",
  "financePlanning.readiness.documents":
    "\nRFQs, pedidos, ordens de serviço, pedidos de compra e faturas podem ser incluídos diretamente nas decisões do cenário.",
  "financePlanning.readiness.reporting":
    "\nAs superfícies de relatórios atuais podem empacotar os resultados do planejamento sem uma nova pilha.",
  "financePlanning.page.eyebrow": "Finanças",
  "financePlanning.action.createScenario": "Criar cenário",
  "financePlanning.action.finance":
    "\nRevise a exposição à depreciação em tempo real antes de alterar o plano.",
  "financePlanning.action.documents":
    "\nLeve as decisões do cenário para os espaços de trabalho de documentos para acompanhamento de cotações, pedidos e compras.",
  "financePlanning.action.reports":
    "\nEmpacote a postura de planejamento em pacotes de relatórios voltados para as partes interessadas.",
  "financePlanning.action.fleet":
    "\nConecte a demanda e a pressão de reposição de volta às operações do veículo.",
  "financePlanning.action.buildings":
    "\nSiga a pressão do capital nas instalações e na cobertura do sistema predial.",
  "financePlanning.action.sensors":
    "\nUse o sensor e a postura de alerta para testar a pressão de prontidão e suposições de planejamento.",
  "estate.title": "\nPropriedade",
  "estate.subtitle":
    "Governança de portfólio, garantia de serviço, prontidão e controles de programa",
  "estate.coverage":
    "\nUm plano de controle patrimonial oficial em ações de registro, governança de FM, prontidão, parcerias, administração e relatórios.",
  "estate.kpi.assets": "\nAtivos registrados",
  "estate.kpi.assetsDesc":
    "\nCobertura atual de registro de ativos imobiliários em todas as classes de ativos gerenciados.",
  "estate.kpi.facilities": "\nLocais de instalações",
  "estate.kpi.facilitiesDesc":
    "\nSites já marcados como instalações dentro da hierarquia de propriedades.",
  "estate.kpi.workOrders": "\nOrdens de serviço ativas",
  "estate.kpi.workOrdersDesc":
    "\nEntrega operacional atualmente passando por FM e execução imobiliária.",
  "estate.kpi.approvals": "\nAprovações pendentes",
  "estate.kpi.approvalsDesc":
    "\nIniciativas imobiliárias e aprovações de projetos atualmente aguardando progressão através da governança.",
  "estate.summary.alertTitle":
    "\nA governança imobiliária agora depende de sistemas operacionais de registro em tempo real",
  "estate.summary.alertDescription":
    "\nUse o registro atual, o fluxo de entrega FM, o gráfico de documentos comerciais e os controles de aprovação para executar governança, garantia e prontidão do portfólio a partir de uma superfície de propriedade conectada.",
  "estate.summary.tab.registry": "\nRegistro",
  "estate.summary.tab.delivery": "\nPrestação de serviço",
  "estate.summary.tab.maintenance": "\nGovernança FM",
  "estate.summary.tab.readiness": "\nProntidão",
  "estate.summary.tab.partnerships": "\nTerreno e sócios",
  "estate.summary.tab.stewardship": "\nMordomia",
  "estate.summary.tab.operations": "\nIntervalos e GFE",
  "estate.summary.tab.strategy": "\nEstratégia",
  "estate.summary.tab.programme": "\nPrograma",
  "estate.summary.registryTitle": "\nProntidão do registro de ativos",
  "estate.summary.registryDescription":
    "\nA cobertura de ativos e instalações agora fornece a hierarquia de propriedade oficial para governança de portfólio, garantia e revisão de investimentos.",
  "estate.summary.registryAssets": "\nAtivos no escopo",
  "estate.summary.registryAssetsDesc":
    "\n{total} instalações atualmente ficam dentro da área de propriedade gerenciada.",
  "estate.summary.registryTelemetry": "\nAtivos vinculados à telemetria",
  "estate.summary.registryTelemetryDesc":
    "\nAtivos conectados fornecem condição ativa e contexto de utilização para priorização.",
  "estate.summary.registryHierarchy": "\nAtivos mapeados por hierarquia",
  "estate.summary.registryHierarchyDesc":
    "\n{coverage} do registro agora traz uma colocação explícita de hierarquia de propriedade.",
  "estate.summary.registryCapability": "\nAtivos vinculados à capacidade",
  "estate.summary.registryCapabilityDesc":
    "\n{coverage} do registro agora nomeia a capacidade operacional que cada ativo suporta.",
  "estate.summary.postureTitle": "\nPostura de controle",
  "estate.summary.postureDescription":
    "\nMantenha a cobertura de ativos, sinais operacionais em tempo real e iniciativas duráveis alinhadas para que a gestão estratégica do patrimônio permaneça conectada à execução.",
  "estate.summary.badgeIso": "ISO 55001 conforme",
  "estate.summary.badgeFm": "\nEntrega FM",
  "estate.summary.badgeP3m": "Nível P3M",
  "estate.summary.deliveryTitle": "\nEntrega de serviço operacional",
  "estate.summary.deliveryDescription":
    "A execução rigorosa do FM, a atividade contratual e os documentos posteriores mostram a atual pressão de entrega em todo o modelo operacional imobiliário.",
  "estate.summary.deliveryOpenWorkOrders": "\nOrdens de serviço abertas",
  "estate.summary.deliveryOpenWorkOrdersDesc":
    "\nExecução atualmente ativa no fluxo de manutenção, garantia e recuperação.",
  "estate.summary.deliveryOverdueWorkOrders": "\nOrdens de serviço vencidas",
  "estate.summary.deliveryOverdueWorkOrdersDesc":
    "\nTrabalho programado já fora das datas previstas e exigindo atenção de mitigação.",
  "estate.summary.deliveryDocuments": "\nDocumentos operacionais ativos",
  "estate.summary.deliveryDocumentsDesc":
    "\nRFQs, pedidos, ordens de compra, faturas e ordens de serviço ainda em movimento no gráfico do contrato.",
  "estate.summary.deliveryExecutionReady": "\nDocumentos prontos para execução",
  "estate.summary.deliveryExecutionReadyDesc":
    "\nDocumentos que já foram liberados para entrada e podem gerar atividade de entrega ou faturamento.",
  "estate.summary.maintenanceAlertTitle":
    "\nA governança de FM rígida e flexível agora fica dentro do mesmo espaço de trabalho imobiliário estratégico",
  "estate.summary.maintenanceAlertDescription":
    "\nUse um registro durável para cronogramas do SFG20, inspeções legais, revisões de garantia, serviços de FM suaves e sinais de referência, em vez de separar a governança de FM do quadro imobiliário mais amplo.",
  "estate.summary.maintenanceTitle": "\nPostura de governança FM",
  "estate.summary.maintenanceDescription":
    "\nRastreie a manutenção planejada, a inspeção legal, a prestação de serviços FM suaves e a pressão de referência sem sair da camada de controle de propriedade SSR.",
  "estate.summary.maintenanceRegister": "\nRegistro de governança FM",
  "estate.summary.maintenanceRegisterDesc":
    "\nAtualmente, os registros {count} precisam de conformidade ou intervenção de entrega.",
  "estate.summary.maintenanceHardFm": "\nControles FM rígidos",
  "estate.summary.maintenanceHardFmDesc":
    "\n{count} as inspeções legais são atualmente realizadas no registro de manutenção.",
  "estate.summary.maintenanceSoftFm": "\nControles FM suaves",
  "estate.summary.maintenanceSoftFmDesc":
    "\n{count} os registros de benchmarking atualmente comparam a produção do serviço e a postura de produtividade.",
  "estate.summary.maintenancePerformance": "\nDesempenho do serviço",
  "estate.summary.maintenancePerformanceDesc":
    "\n{count} registros de serviços programados atualmente moldam o calendário FM operacional.",
  "estate.summary.maintenancePerformanceEmpty": "\nNenhuma pontuação ainda",
  "estate.summary.maintenancePerformanceValue": "\n{score}% pontuação média",
  "estate.summary.readinessAlertTitle":
    "\nA prontidão do patrimônio agora reflete o gráfico operacional ao vivo",
  "estate.summary.readinessAlertDescription":
    "\nAtivos de capacidade vinculados, restrições de infraestrutura, dívida de inspeção, atividade da força de trabalho e risco do projeto são combinados em uma visão de prontidão de SSR.",
  "estate.summary.readinessTitle": "\nPostura de prontidão imobiliária",
  "estate.summary.readinessDescription":
    "Use esta camada de prontidão para monitorar a disponibilidade de alcance, restrições de infraestrutura, postura de capacidade e impacto na força de trabalho sem sair do plano de controle de propriedade.",
  "estate.summary.readinessRangeAvailability": "\nDisponibilidade de intervalo",
  "estate.summary.readinessRangeAvailabilityDesc":
    "\n{total} ativos vinculados ao intervalo e ao treinamento são atualmente rastreados para monitoramento de prontidão.",
  "estate.summary.readinessConstraints": "\nRestrições de infraestrutura",
  "estate.summary.readinessConstraintsDesc":
    "\n{assets} ativos restritos e {projects} projetos de alto risco estão atualmente contribuindo para a pressão imobiliária.",
  "estate.summary.readinessCapability": "\nProntidão de capacidade",
  "estate.summary.readinessCapabilityDesc":
    "\n{watch} agrupamentos de capacidade permanecem sob vigilância em {total} agrupamentos de prontidão rastreados.",
  "estate.summary.readinessWorkforce": "\nHoras registradas da força de trabalho",
  "estate.summary.readinessWorkforceDesc":
    "\n{inspections} tarefas de inspeção atrasadas permanecem abertas em relação ao quadro de prontidão atual.",
  "estate.summary.programmeTitle": "\nFluxo de programa e aprovação",
  "estate.summary.programmeDescription":
    "\nIniciativas imobiliárias, registros de projetos, estágios de aprovação e cenários financeiros fornecem a transferência atual para entrega P3M, revisão DIO e relatórios do programa.",
  "estate.summary.programmeInitiatives": "\nIniciativas imobiliárias",
  "estate.summary.programmeInitiativesDesc":
    "\nRegistros de programas duráveis agora capturados no espaço de trabalho imobiliário.",
  "estate.summary.programmeProjects": "\nRegistro do projeto",
  "estate.summary.programmeProjectsDesc":
    "\nProjetos imobiliários duráveis agora capturam tipo de entrega, postura de custos, pressão de recursos e estado de aprovação.",
  "estate.summary.programmeApprovalQueue": "\nAprovações de projetos",
  "estate.summary.programmeApprovalQueueDesc":
    "\n{delayed} itens atrasados permanecem atualmente na fila de aprovação do projeto ativo.",
  "estate.summary.programmeControls": "\nControles do projeto",
  "estate.summary.programmeControlsDesc":
    "\n{changes} item(s) de alteração do projeto atualmente permanecem dentro do fluxo de controle do projeto ativo.",
  "estate.summary.partnershipsAlertTitle":
    "\nA supervisão de terrenos, comércio e catering agora fica dentro do espaço de trabalho imobiliário estratégico",
  "estate.summary.partnershipsAlertDescription":
    "\nLicenças e arrendamentos rurais, registros de renda de terceiros e supervisão de catering do ESS agora são capturados como registros de contratos de propriedade durável vinculados a locais e equipamentos.",
  "estate.summary.partnershipsTitle": "\nCoordenação de terrenos e parceiros",
  "estate.summary.partnershipsDescription":
    "\nUse este registro para gerenciar o uso da terra rural, atividades comerciais de terceiros e coordenação de catering no mesmo local e gráfico de ativos que impulsiona as operações imobiliárias.",
  "estate.summary.partnershipsRegister": "\nRegistro de contrato",
  "estate.summary.partnershipsRegisterDesc":
    "{count} registros de contrato estão atualmente ativos no registro de imóveis.",
  "estate.summary.partnershipsRural": "\nAcordos rurais",
  "estate.summary.partnershipsRuralDesc":
    "\nOs registros de pastoreio, arrendamento e acesso à terra agora convivem com as operações imobiliárias.",
  "estate.summary.partnershipsCommercial": "\nReceita comercial",
  "estate.summary.partnershipsCommercialDesc":
    "\n{count} registros de contrato atualmente estão vinculados diretamente a um ativo para supervisão de utilização.",
  "estate.summary.partnershipsCoordination": "\nConflitos de coordenação",
  "estate.summary.partnershipsCoordinationDesc":
    "\nA supervisão do catering atualmente tem uma média de {score} em todos os registros de serviço pontuados.",
  "estate.summary.partnershipsCateringValue": "\n{score}% pontuação média",
  "estate.summary.partnershipsCateringValueEmpty": "\nsem registros pontuados",
  "estate.summary.stewardshipAlertTitle":
    "\nOs controles florestais, patrimoniais e ambientais agora compartilham um registro de administração de propriedades",
  "estate.summary.stewardshipAlertDescription":
    "\nCronogramas florestais, pressão de consentimento patrimonial, monitoramento de habitat e registros de espécies protegidas agora ficam no mesmo local e gráfico de ativos que a entrega e a prontidão.",
  "estate.summary.stewardshipTitle": "\nPostura de administração patrimonial",
  "estate.summary.stewardshipDescription":
    "\nUse este registro para coordenar operações florestais, condições de patrimônio e pressão de consentimento e obrigações de gestão ambiental sem sair do espaço de trabalho da propriedade.",
  "estate.summary.stewardshipRegister": "\nRegistro de administração",
  "estate.summary.stewardshipRegisterDesc":
    "\n{count} registro(s) de administração atualmente requerem atenção em risco ou orientada para conformidade.",
  "estate.summary.stewardshipForestry": "\nRegistros florestais",
  "estate.summary.stewardshipForestryDesc":
    "\nO valor da produção de madeira rastreado atualmente totaliza {value} em todos os retornos florestais registrados.",
  "estate.summary.stewardshipHeritage": "\nRegistros de patrimônio",
  "estate.summary.stewardshipHeritageDesc":
    "\n{count} item(s) de autorização de obras atualmente permanecem na fila de aprovação de patrimônio.",
  "estate.summary.stewardshipEnvironment": "\nRegistros ambientais",
  "estate.summary.stewardshipEnvironmentDesc":
    "\n{count} registros de espécies protegidas estão atualmente ativos no registro de manejo.",
  "estate.summary.operationsAlertTitle":
    "\nOperações de alcance, segurança, alvos e GFE agora compartilham um registro de controle de propriedade durável",
  "estate.summary.operationsAlertDescription":
    "\nA prontidão do intervalo de treinamento, os defeitos de segurança, a disponibilidade do alvo e a postura de substituição do GFE agora ficam no mesmo local e gráfico de ativos que a entrega, a prontidão e os controles P3M.",
  "estate.summary.operationsTitle": "\nControles operacionais da área de treinamento",
  "estate.summary.operationsDescription":
    "\nUse este registro para gerenciar atividades TAROM, conformidade de segurança MOD, ciclo de vida de alvos e postura de equipamentos fornecidos pelo governo sem sair do espaço de trabalho da propriedade.",
  "estate.summary.operationsRegister": "Registro de controle operacional",
  "estate.summary.operationsRegisterDesc":
    "\n{count} registro(s) atualmente mostram postura operacional restrita ou não compatível.",
  "estate.summary.operationsRanges": "\nOperações de intervalo",
  "estate.summary.operationsRangesDesc":
    "\n{count} registros de disponibilidade de intervalo estão atualmente marcados como disponíveis.",
  "estate.summary.operationsTargetry": "\nRegistros de destino",
  "estate.summary.operationsTargetryDesc":
    "\n{count} faixas ou sistemas alvo estão atualmente registrados como disponíveis.",
  "estate.summary.operationsGfe": "\nRegistros GFE",
  "estate.summary.operationsGfeDesc":
    "\n{count} itens de substituição permanecem atualmente na fila ativa do GFE.",
  "estate.summary.strategyAlertTitle":
    "\nOs planos estratégicos de ativos agora ficam no mesmo espaço de trabalho imobiliário que finanças, entrega e aprovações",
  "estate.summary.strategyAlertDescription":
    "\nManter o Plano Estratégico de Gestão de Ativos como um registro de patrimônio durável vinculado aos estágios do ciclo de vida, postura de priorização e cenários opcionais de planejamento financeiro.",
  "estate.summary.strategyTitle": "\nPostura estratégica de gestão de ativos",
  "estate.summary.strategyDescription":
    "\nUse esta camada para manter o planejamento da ISO 55001 alinhado aos objetivos organizacionais, à priorização baseada em riscos, às metas de desempenho de ativos e às decisões de investimento em infraestrutura de longo horizonte.",
  "estate.summary.strategyRegister": "\nPlanos estratégicos",
  "estate.summary.strategyRegisterDesc":
    "\n{count} itens de plano permanecem atualmente na fila de aprovação de estratégia ativa.",
  "estate.summary.strategyLongHorizon": "\nPlanos de longo horizonte",
  "estate.summary.strategyLongHorizonDesc":
    "\nPlanos com infraestrutura ou horizontes de ciclo de vida iguais ou superiores ao limite de planejamento de longo prazo.",
  "estate.summary.strategyFinanceLinked": "\nPlanos vinculados a finanças",
  "estate.summary.strategyFinanceLinkedDesc":
    "\nPlanos estratégicos já vinculados diretamente a cenários de planejamento financeiro salvos.",
  "estate.summary.strategyRiskLed": "\nPlanos orientados ao risco",
  "estate.summary.strategyRiskLedDesc":
    "\nO horizonte médio de planejamento estratégico é atualmente de {average} meses no registro.",
  "estate.strategyForm.title": "\nManter o plano estratégico de gestão de ativos",
  "estate.strategyForm.description":
    "\nCapture registros de estratégia imobiliária alinhados à ISO 55001 que conectam objetivos organizacionais, postura de ciclo de vida, priorização baseada em risco e planejamento de investimento de longo prazo.",
  "estate.strategyForm.badge": "\nPlano estratégico SAM",
  "estate.strategyForm.nameLabel": "\nTítulo do plano",
  "estate.strategyForm.namePlaceholder": "\nPlano estratégico de renovação imobiliária do Norte",
  "estate.strategyForm.nameHint":
    "\nUse um título que possa permanecer estável em pacotes de governança, relatórios DIO e revisões de planejamento.",
  "estate.strategyForm.scopeLabel": "\nEscopo imobiliário",
  "estate.strategyForm.scopePlaceholder":
    "\nPropriedade de treinamento do Norte, faixas regionais ou fatia de propriedade empresarial",
  "estate.strategyForm.scopeHint":
    "Mantenha o escopo alinhado à área ocupada ou ao portfólio de capacidade que o plano governa.",
  "estate.strategyForm.objectiveLabel": "\nObjetivo organizacional",
  "estate.strategyForm.objectiveHint":
    "\nEscolha o objetivo organizacional principal ao qual este plano estratégico está alinhado.",
  "estate.strategyForm.lifecycleLabel": "\nFoco no ciclo de vida",
  "estate.strategyForm.lifecycleHint":
    "\nNomeie o estágio dominante do ciclo de vida que o plano está gerenciando atualmente.",
  "estate.strategyForm.prioritisationLabel": "\nBase de priorização",
  "estate.strategyForm.prioritisationHint":
    "\nMostre se o plano é liderado por risco, desempenho, conformidade, demanda ou postura de valor.",
  "estate.strategyForm.horizonLabel": "\nHorizonte de planejamento",
  "estate.strategyForm.horizonHint":
    "\nUse a janela de planejamento em meses para decisões de infraestrutura e ciclo de vida de longo prazo.",
  "estate.strategyForm.financeScenarioLabel": "\nCenário de planejamento financeiro",
  "estate.strategyForm.financeScenarioHint":
    "\nOpcionalmente, vincule o plano diretamente a um cenário de planejamento financeiro salvo para transferência de investimento.",
  "estate.strategyForm.financeScenarioOptional": "\nNenhum cenário financeiro vinculado",
  "estate.strategyForm.performanceTargetLabel": "\nMeta de desempenho",
  "estate.strategyForm.performanceTargetPlaceholder":
    "\nRestaurar 95% da disponibilidade de alcance em faixas restritas",
  "estate.strategyForm.performanceTargetHint":
    "\nNomeie o resultado mensurável de serviço, prontidão ou condição que este plano está gerando.",
  "estate.strategyForm.investmentCaseLabel": "\nCaso de investimento e infraestrutura",
  "estate.strategyForm.investmentCasePlaceholder":
    "\nSequenciar civis, utilitários e atualização do ciclo de vida durante o próximo período de controle.",
  "estate.strategyForm.investmentCaseHint":
    "\nResuma o caso de investimento em infraestrutura de longo prazo ou a lógica de intervenção no ciclo de vida.",
  "estate.strategyForm.approvalLabel": "\nPostura de aprovação",
  "estate.strategyForm.approvalHint":
    "\nAcompanhe se o plano estratégico ainda está em rascunho, enviado, aprovado ou rejeitado.",
  "estate.strategyForm.notesLabel": "\nNotas de entrega",
  "estate.strategyForm.notesPlaceholder":
    "\nCapture dependências, cadência de revisão ou pontos de controle de desempenho de ativos.",
  "estate.strategyForm.notesHint":
    "\nUse notas para o contexto de governança que devem permanecer visíveis durante a manutenção do plano.",
  "estate.strategyForm.requiredHint":
    "\nOs campos obrigatórios devem ser preenchidos antes que o plano possa ser salvo.",
  "estate.strategyForm.submit": "\nSalvar plano estratégico",
  "estate.strategyForm.submitAria": "\nSalvar plano estratégico de gerenciamento de ativos",
  "estate.strategyForm.recentTitle": "\nRegistro do plano estratégico",
  "estate.strategyForm.recentDescription":
    "\nOs planos estratégicos recentes são apresentados juntamente com sua postura de ciclo de vida, estado de aprovação e vínculo financeiro.",
  "estate.strategyForm.empty": "\nNenhum plano estratégico de ativos foi capturado ainda.",
  "estate.strategyForm.notesEmpty": "\nNenhuma nota de entrega adicional foi capturada.",
  "estate.strategyForm.feedback.saved":
    "\nPlano estratégico de gerenciamento de ativos salvo no espaço de trabalho imobiliário.",
  "estate.strategyForm.feedback.saveFailed":
    "\nIncapaz de persistir o plano estratégico de gestão de ativos neste momento.",
  "estate.strategyForm.summary.approvalQueue": "{count} no fluxo de aprovação",
  "estate.strategyForm.summary.financeLinked": "\n{count} vinculado a finanças",
  "estate.strategyForm.summary.horizonPosture":
    "\n{long} plano(s) de longo prazo, {risk} plano(s) baseado(s) no risco, {average} horizonte médio mensal.",
  "estate.strategyForm.tableAria": "\nPlanos estratégicos de gestão de ativos",
  "estate.strategyForm.table.plan": "\nPlano",
  "estate.strategyForm.table.scope": "\nEscopo e objetivo",
  "estate.strategyForm.table.lifecycle": "\nCiclo de vida e prioridade",
  "estate.strategyForm.table.performance": "\nDesempenho e horizonte",
  "estate.strategyForm.table.approval": "\nLink de aprovação e financiamento",
  "estate.strategyForm.table.investment": "\nCaso de investimento",
  "estate.strategyForm.table.updatedAt": "\nAtualizado {date}",
  "estate.strategyForm.table.horizonValue": "\n{months} meses",
  "estate.strategyForm.table.financeScenarioUnlinked": "\nNenhum cenário financeiro vinculado",
  "estate.strategyForm.validation.titleRequired": "\nO título do plano estratégico é obrigatório.",
  "estate.strategyForm.validation.scopeRequired": "\nO escopo do plano estratégico é obrigatório.",
  "estate.strategyForm.validation.objectiveRequired":
    "\nUm objetivo estratégico é necessário para o plano.",
  "estate.strategyForm.validation.lifecycleRequired":
    "\nUm foco no ciclo de vida é necessário para o plano.",
  "estate.strategyForm.validation.prioritisationRequired":
    "\nUma base de priorização é necessária para o plano.",
  "estate.strategyForm.validation.horizonRange":
    "\nO horizonte de planejamento deve estar entre {min} e {max} meses.",
  "estate.strategyForm.validation.performanceTargetRequired":
    "\nUma meta de desempenho é necessária para o plano.",
  "estate.strategyForm.validation.investmentCaseRequired":
    "\nUm caso de investimento e infraestrutura é necessário para o plano.",
  "estate.strategyForm.validation.financeScenarioInvalid":
    "\nO cenário de planejamento financeiro selecionado não foi encontrado.",
  "estate.strategyForm.validation.approvalRequired":
    "\nUma postura de aprovação válida é necessária para o plano.",
  "estate.strategyForm.objective.CAPABILITY_READINESS": "\nProntidão de capacidade",
  "estate.strategyForm.objective.COMPLIANCE_ASSURANCE": "\nGarantia de conformidade",
  "estate.strategyForm.objective.SERVICE_PERFORMANCE": "\nDesempenho do serviço",
  "estate.strategyForm.objective.LIFECYCLE_SUSTAINMENT": "\nSustentação do ciclo de vida",
  "estate.strategyForm.objective.INFRASTRUCTURE_INVESTMENT": "\nInvestimento em infraestrutura",
  "estate.strategyForm.lifecycle.ACQUIRE": "\nAdquirir",
  "estate.strategyForm.lifecycle.OPERATE": "\nOperar",
  "estate.strategyForm.lifecycle.MAINTAIN": "\nManter",
  "estate.strategyForm.lifecycle.REFRESH": "\nAtualizar",
  "estate.strategyForm.lifecycle.DISPOSE": "\nDescartar",
  "estate.strategyForm.prioritisation.RISK": "\nLiderado pelo risco",
  "estate.strategyForm.prioritisation.PERFORMANCE": "\nLiderado por desempenho",
  "estate.strategyForm.prioritisation.COMPLIANCE": "\nLiderado por conformidade",
  "estate.strategyForm.prioritisation.DEMAND": "\nLiderado pela demanda",
  "estate.strategyForm.prioritisation.VALUE": "\nOrientado por valor",
  "estate.initiativeForm.title": "\nCrie uma iniciativa imobiliária",
  "estate.initiativeForm.description":
    "\nCapture um registro patrimonial estratégico que pode sobreviver a aprovações, revisões de programas, acompanhamento de FM e pacotes de relatórios.",
  "estate.initiativeForm.badge": "\nFluxo de bens duráveis",
  "estate.initiativeForm.nameLabel": "\nTítulo da iniciativa",
  "estate.initiativeForm.namePlaceholder": "\nTreinamento de propriedade difícil recuperação FM",
  "estate.initiativeForm.nameHint":
    "\nUse um título que possa permanecer estável em aprovações, relatórios e transferências de operadores.",
  "estate.initiativeForm.scopeLabel": "\nEscopo imobiliário",
  "estate.initiativeForm.scopePlaceholder":
    "\nCordilheiras do Sul, edifícios históricos ou apoio à frota regional",
  "estate.initiativeForm.scopeHint":
    "\nNomeie a fatia de propriedade, geografia, área de contrato ou área operacional afetada.",
  "estate.initiativeForm.domainLabel": "\nDomínio",
  "estate.initiativeForm.domainHint":
    "\nEscolha o fluxo de trabalho imobiliário que a iniciativa irá promover principalmente.",
  "estate.initiativeForm.domain.STRATEGIC_ASSET": "\nGestão Estratégica de Ativos",
  "estate.initiativeForm.domain.HARD_FM": "\nFM",
  "estate.initiativeForm.domain.SOFT_FM": " Difícil\nSuave FM",
  "estate.initiativeForm.domain.RANGE_OPERATIONS": "\nOperações de intervalo",
  "estate.initiativeForm.domain.RANGE_SAFETY": "\nSegurança de alcance",
  "estate.initiativeForm.domain.TARGETRY": "\nAlvo",
  "estate.initiativeForm.domain.GFE": "Equipamento fornecido pelo governo",
  "estate.initiativeForm.domain.FLEET": "\nFrota e Equipamentos",
  "estate.initiativeForm.domain.RURAL": "\nPropriedade Rural",
  "estate.initiativeForm.domain.FORESTRY": "\nSilvicultura",
  "estate.initiativeForm.domain.HERITAGE": "\nHerança",
  "estate.initiativeForm.domain.ENVIRONMENT": "\nGestão Ambiental",
  "estate.initiativeForm.domain.COMMERCIAL": "\nRenda de Terceiros",
  "estate.initiativeForm.domain.CATERING": "\nIntegração de catering",
  "estate.initiativeForm.domain.P3M": "\nEntrega P3M",
  "estate.initiativeForm.priorityLabel": "\nPrioridade",
  "estate.initiativeForm.priorityHint":
    "\nColoque a iniciativa no atual horizonte operacional imobiliário.",
  "estate.initiativeForm.priority.NOW": "\nAgora",
  "estate.initiativeForm.priority.NEXT": "\nPróximo",
  "estate.initiativeForm.priority.LATER": "\nMais tarde",
  "estate.initiativeForm.priority.WATCH": "\nAssistir",
  "estate.initiativeForm.approvalLabel": "\nStatus de aprovação",
  "estate.initiativeForm.approvalHint":
    "\nAcompanhe onde a iniciativa se encontra atualmente no caminho de aprovação do programa.",
  "estate.initiativeForm.approval.DRAFT": "\nRascunho",
  "estate.initiativeForm.approval.SUBMITTED": "\nEnviado",
  "estate.initiativeForm.approval.APPROVED": "Aprovado",
  "estate.initiativeForm.approval.REJECTED": "\nRejeitado",
  "estate.initiativeForm.notesLabel": "\nNotas e suposições",
  "estate.initiativeForm.notesPlaceholder":
    "\nCapture riscos, vinculação de capacidade, implicações contratuais ou suposições de ciclo de vida.",
  "estate.initiativeForm.notesHint":
    "\nUse isso para preservar o contexto que deve sobreviver às aprovações, planejamento financeiro e relatórios.",
  "estate.initiativeForm.requiredHint":
    "\nTítulo, escopo de propriedade, domínio, prioridade e status de aprovação são obrigatórios.",
  "estate.initiativeForm.submit": "\nSalvar iniciativa imobiliária",
  "estate.initiativeForm.submitAria": "\nSalvar iniciativa imobiliária",
  "estate.initiativeForm.recentTitle": "\nIniciativas imobiliárias recentes",
  "estate.initiativeForm.recentDescription":
    "\nEssas iniciativas agora persistem como registros patrimoniais duráveis sem sair do espaço de trabalho do SSR.",
  "estate.initiativeForm.empty": "\nNenhuma iniciativa imobiliária capturada ainda.",
  "estate.initiativeForm.savedAt": "\nAtualizado {updatedAt}",
  "estate.initiativeForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "estate.initiativeForm.validation.titleRequired": "\nO título da iniciativa é obrigatório.",
  "estate.initiativeForm.validation.scopeRequired": "\nO escopo da propriedade é obrigatório.",
  "estate.initiativeForm.validation.domainRequired": "\nO domínio é obrigatório.",
  "estate.initiativeForm.validation.priorityRequired": "\nA prioridade é obrigatória.",
  "estate.initiativeForm.validation.approvalRequired": "\nO status de aprovação é obrigatório.",
  "estate.initiativeForm.feedback.saved":
    "\nIniciativa imobiliária salva no espaço de trabalho imobiliário.",
  "estate.initiativeForm.feedback.saveFailed":
    "\nIncapaz de persistir a iniciativa imobiliária no momento.",
  "estate.projectForm.title": "\nCadastre um projeto imobiliário",
  "estate.projectForm.description":
    "\nCapture um registro de projeto imobiliário durável com aprovação, postura financeira, de recursos e de risco dentro do espaço de trabalho imobiliário SSR.",
  "estate.projectForm.badge": "\nRegistro P3M",
  "estate.projectForm.nameLabel": "\nTítulo do projeto",
  "estate.projectForm.namePlaceholder": "\nRecuperação de infraestrutura de alcance regional",
  "estate.projectForm.nameHint":
    "\nUse um título que permaneça estável em registros, aprovações, análises financeiras e relatórios de entrega.",
  "estate.projectForm.programmeLabel": "\nNome do programa",
  "estate.projectForm.programmePlaceholder":
    "\nAumento do ciclo de vida da propriedade de treinamento",
  "estate.projectForm.programmeHint":
    "\nAgrupe o projeto no programa ou linha de portfólio usado para relatórios imobiliários.",
  "estate.projectForm.scopeLabel": "\nEscopo imobiliário",
  "estate.projectForm.scopePlaceholder":
    "\nPacote South Ranges, cluster de patrimônio ou backlog regional de FM_ZZ0__\nNomeie a geografia, área de contrato, fatia de propriedade ou área operacional afetada.",
  "estate.projectForm.scopeHint": "\nTipo de entrega",
  "estate.projectForm.deliveryTypeLabel":
    "\nDistinguir entre fluxo de projeto de alto volume e entrega de infraestrutura complexa.",
  "estate.projectForm.deliveryTypeHint": "\nAlto volume e baixo valor",
  "estate.projectForm.deliveryType.HIGH_VOLUME_LOW_VALUE": "\nInfraestrutura complexa",
  "estate.projectForm.deliveryType.COMPLEX_INFRASTRUCTURE":
    "\nAcompanhe se o projeto ainda está em rascunho, em aprovação, aprovado ou rejeitado.",
  "estate.projectForm.approvalLabel": "\nStatus de aprovação",
  "estate.projectForm.approvalHint": "\nEstágio de aprovação",
  "estate.projectForm.approvalStageLabel":
    "\nAcompanhe onde o projeto está atualmente no DIO e no fluxo de governança interna.",
  "estate.projectForm.approvalStageHint": "\nRegistrado",
  "estate.projectForm.approvalStage.REGISTERED": "\nCaso de negócios",
  "estate.projectForm.approvalStage.BUSINESS_CASE": "\nRevisão DIO",
  "estate.projectForm.approvalStage.DIO_REVIEW": "\nRevisão comercial",
  "estate.projectForm.approvalStage.COMMERCIAL_REVIEW": "\nAutorização de entrega",
  "estate.projectForm.approvalStage.DELIVERY_AUTHORIZATION": "\nEm entrega",
  "estate.projectForm.approvalStage.IN_DELIVERY": "\nFechado",
  "estate.projectForm.approvalStage.CLOSED": "\nAutoridade de aprovação",
  "estate.projectForm.approvalAuthorityLabel": "",
  "estate.projectForm.approvalAuthorityPlaceholder":
    "Líder regional DIO, conselho comercial ou painel de entrega de bens",
  "estate.projectForm.approvalAuthorityHint":
    "\nNomeie a autoridade ou conselho atualmente responsável pela próxima decisão de aprovação.",
  "estate.projectForm.budgetAmountLabel": "\nValor do orçamento",
  "estate.projectForm.budgetAmountHint":
    "\nCapture a linha de base do orçamento atual aprovado ou proposto para o projeto.",
  "estate.projectForm.committedCostLabel": "\nCusto comprometido",
  "estate.projectForm.committedCostHint":
    "\nRegistre o custo atual comprometido já vinculado ao projeto.",
  "estate.projectForm.forecastFinalCostLabel": "\nCusto final previsto",
  "estate.projectForm.forecastFinalCostHint":
    "\nAcompanhe a última previsão de custo final para monitoramento de entrega.",
  "estate.projectForm.retentionAmountLabel": "\nValor de retenção",
  "estate.projectForm.retentionAmountHint":
    "\nCapture o valor comercial retido ainda retido até a conclusão ou aceitação.",
  "estate.projectForm.riskProvisionAmountLabel": "\nProvisão de risco",
  "estate.projectForm.riskProvisionAmountHint":
    "\nAcompanhe a provisão financeira atual reservada para exposição ao risco do projeto.",
  "estate.projectForm.plannedResourcesLabel": "\nRecursos planejados",
  "estate.projectForm.plannedResourcesHint":
    "\nCapture a força de trabalho planejada ou a alocação de recursos de entrega.",
  "estate.projectForm.actualResourcesLabel": "\nRecursos reais",
  "estate.projectForm.actualResourcesHint":
    "\nCapture a força de trabalho real ou a utilização de recursos de entrega atualmente atribuída.",
  "estate.projectForm.riskLevelLabel": "\nNível de risco",
  "estate.projectForm.riskLevelHint":
    "\nDestaque a postura atual de risco de entrega qualitativa para o projeto.",
  "estate.projectForm.riskLevel.LOW": "\nBaixo",
  "estate.projectForm.riskLevel.MODERATE": "\nModerado",
  "estate.projectForm.riskLevel.HIGH": "\nAlto",
  "estate.projectForm.riskLevel.CRITICAL": "\nCrítico",
  "estate.projectForm.notesLabel": "\nNotas e suposições",
  "estate.projectForm.notesPlaceholder":
    "\nCapture suposições de mudança, dependência, risco, comercial ou aprovação DIO que devem sobreviver aos relatórios.",
  "estate.projectForm.notesHint":
    "\nUse isto para preservar o contexto de governança e entrega junto com a entrada de registro do projeto.",
  "estate.projectForm.requiredHint":
    "\nTítulo do projeto, programa, escopo, campos de aprovação, campos financeiros, campos de recursos e nível de risco são obrigatórios.",
  "estate.projectForm.submit": "\nSalvar projeto imobiliário",
  "estate.projectForm.submitAria": "\nSalvar projeto imobiliário",
  "estate.projectForm.recentTitle": "\nProjetos imobiliários recentes",
  "estate.projectForm.recentDescription":
    "\nEntradas recentes no registro do projeto mostram pressão de aprovação, postura financeira e conflito de recursos dentro do espaço de trabalho imobiliário.",
  "estate.projectForm.empty": "\nNenhum projeto imobiliário capturado ainda.",
  "estate.projectForm.summary.approvalQueue": "\n{count} aguardando aprovação",
  "estate.projectForm.summary.delayed": "\n{count} atrasado",
  "estate.projectForm.summary.resourcePressure":
    "\nOs projetos {count} atualmente mostram conflito de recursos e {risk} são marcados como de alto risco.",
  "estate.projectForm.tableAria": "\nProjetos imobiliários",
  "estate.projectForm.table.project": "\nProjeto",
  "estate.projectForm.table.scope": "\nEscopo",
  "estate.projectForm.table.approval": "\nAprovação",
  "estate.projectForm.table.authority": "\nAutoridade",
  "estate.projectForm.table.budget": "\nOrçamento",
  "estate.projectForm.table.provisions": "\nProvisões",
  "estate.projectForm.table.resources": "\nRecursos",
  "estate.projectForm.table.risk": "\nRisco",
  "estate.projectForm.table.daysInStage": "\n{days} dias no estágio",
  "estate.projectForm.table.forecastValue": "\nPrevisão {value}",
  "estate.projectForm.table.resourcesValue": "\nPlanejado {planned} / Real {actual}",
  "estate.projectForm.table.resourceConflict": "\nConflito de recursos",
  "estate.projectForm.table.delayFlag": "\nAtraso na aprovação",
  "estate.projectForm.validation.titleRequired": "\nO título do projeto é obrigatório.",
  "estate.projectForm.validation.programmeRequired": "\nO nome do programa é obrigatório.",
  "estate.projectForm.validation.scopeRequired": "\nO escopo da propriedade é obrigatório.",
  "estate.projectForm.validation.deliveryTypeRequired": "\nO tipo de entrega é obrigatório.",
  "estate.projectForm.validation.approvalRequired": "\nO status de aprovação é obrigatório.",
  "estate.projectForm.validation.approvalStageRequired": "\nO estágio de aprovação é obrigatório.",
  "estate.projectForm.validation.approvalAuthorityRequired":
    "Autoridade de aprovação é necessária.",
  "estate.projectForm.validation.budgetAmount": "\nO valor do orçamento deve ser zero ou maior.",
  "estate.projectForm.validation.committedCost": "\nO custo comprometido deve ser zero ou maior.",
  "estate.projectForm.validation.forecastFinalCost":
    "\nO custo final previsto deve ser zero ou superior.",
  "estate.projectForm.validation.retentionAmount":
    "\nO valor de retenção deve ser zero ou superior.",
  "estate.projectForm.validation.riskProvisionAmount":
    "\nA provisão de risco deve ser zero ou superior.",
  "estate.projectForm.validation.plannedResources":
    "\nOs recursos planejados devem ser um número inteiro igual ou superior a zero.",
  "estate.projectForm.validation.actualResources":
    "\nOs recursos reais devem ser um número inteiro igual ou superior a zero.",
  "estate.projectForm.validation.riskLevelRequired": "\nO nível de risco é obrigatório.",
  "estate.projectForm.feedback.saved":
    "\nProjeto imobiliário salvo no espaço de trabalho imobiliário.",
  "estate.projectForm.feedback.saveFailed":
    "\nNão é possível persistir no projeto imobiliário no momento.",
  "estate.projectControls.emptyTitle": "\nCrie um projeto antes de capturar os controles",
  "estate.projectControls.emptyDescription":
    "\nRegistros de risco e registros de controle de mudanças são anexados diretamente a uma entrada de registro de projeto imobiliário.",
  "estate.projectControls.emptyProjects": "\nNenhum projeto imobiliário disponível",
  "estate.projectRiskForm.title": "\nRegistro de riscos do projeto",
  "estate.projectRiskForm.description":
    "\nCapture registros de risco P3M duráveis contra projetos imobiliários para que a exposição e a mitigação sobrevivam às aprovações e relatórios.",
  "estate.projectRiskForm.projectLabel": "\nProjeto imobiliário",
  "estate.projectRiskForm.projectHint":
    "\nSelecione a entrada de registro do projeto que possui este registro de risco.",
  "estate.projectRiskForm.nameLabel": "\nTítulo de risco",
  "estate.projectRiskForm.namePlaceholder": "\nRevisão DIO atrasada no pacote civil de alcance",
  "estate.projectRiskForm.nameHint":
    "\nUse um título curto que possa permanecer estável em painéis e relatórios do projeto.",
  "estate.projectRiskForm.impactAreaLabel": "\nÁrea de impacto",
  "estate.projectRiskForm.impactAreaHint":
    "\nIdentifique a principal área de entrega afetada pela exposição ao risco.",
  "estate.projectRiskForm.impactArea.COST": "\nCusto",
  "estate.projectRiskForm.impactArea.SCHEDULE": "\nAgenda",
  "estate.projectRiskForm.impactArea.CAPABILITY": "\nCapacidade",
  "estate.projectRiskForm.impactArea.SAFETY": "\nSegurança",
  "estate.projectRiskForm.impactArea.COMPLIANCE": "\nConformidade",
  "estate.projectRiskForm.severityLabel": "\nGravidade",
  "estate.projectRiskForm.severityHint":
    "\nUse a mesma escala de severidade qualitativa do registro do projeto.",
  "estate.projectRiskForm.statusLabel": "\nStatus de risco",
  "estate.projectRiskForm.statusHint":
    "\nAcompanhe se o risco está aberto, sob mitigação, formalmente aceito ou fechado.",
  "estate.projectRiskForm.status.OPEN": "\nAbrir",
  "estate.projectRiskForm.status.MITIGATING": "\nMitigando",
  "estate.projectRiskForm.status.ACCEPTED": "\nAceito",
  "estate.projectRiskForm.status.CLOSED": "\nAutoridade de aprovação",
  "estate.projectRiskForm.ownerLabel": "\nProprietário",
  "estate.projectRiskForm.ownerPlaceholder": "\nO programa controla lead",
  "estate.projectRiskForm.ownerHint":
    "\nNomeie o proprietário responsável por conduzir a mitigação ou aceitação.",
  "estate.projectRiskForm.mitigationLabel": "\nPlano de mitigação",
  "estate.projectRiskForm.mitigationPlaceholder":
    "\nCapture o plano de resposta, caminho de escalonamento ou justificativa de aceitação.",
  "estate.projectRiskForm.mitigationHint":
    "\nPreservar a próxima ação mitigadora para que ela sobreviva nos pacotes de governança.",
  "estate.projectRiskForm.targetDateLabel": "\nData prevista",
  "estate.projectRiskForm.targetDateHint":
    "\nData prevista opcional para o próximo ponto de verificação de mitigação ou decisão de fechamento.",
  "estate.projectRiskForm.requiredHint":
    "Projeto, título do risco, área de impacto, gravidade, status, plano de mitigação e proprietário são obrigatórios.",
  "estate.projectRiskForm.submit": "\nSalvar risco do projeto",
  "estate.projectRiskForm.submitAria": "\nSalvar risco do projeto",
  "estate.projectRiskForm.summary.critical": "\n{count} crítico",
  "estate.projectRiskForm.tableAria": "\nRegistro de riscos do projeto",
  "estate.projectRiskForm.table.risk": "\nRisco",
  "estate.projectRiskForm.table.exposure": "\nExposição",
  "estate.projectRiskForm.table.status": "\nStatus",
  "estate.projectRiskForm.table.owner": "\nProprietário",
  "estate.projectRiskForm.table.mitigation": "\nMitigação",
  "estate.projectRiskForm.table.targetDateValue": "\nAlvo {date}",
  "estate.projectRiskForm.table.targetDateEmpty": "\nNenhuma data prevista definida",
  "estate.projectRiskForm.empty": "\nNenhum risco do projeto capturado ainda.",
  "estate.projectRiskForm.validation.projectRequired": "\nSelecione um projeto imobiliário válido.",
  "estate.projectRiskForm.validation.titleRequired": "\nO título do risco é obrigatório.",
  "estate.projectRiskForm.validation.impactAreaRequired": "\nA área de impacto é obrigatória.",
  "estate.projectRiskForm.validation.severityRequired": "\nA gravidade é necessária.",
  "estate.projectRiskForm.validation.statusRequired": "\nO status de risco é obrigatório.",
  "estate.projectRiskForm.validation.mitigationRequired": "\nÉ necessário um plano de mitigação.",
  "estate.projectRiskForm.validation.ownerRequired": "\nO proprietário do risco é obrigatório.",
  "estate.projectRiskForm.validation.targetDate":
    "\nA data prevista deve ser uma data de calendário válida.",
  "estate.projectRiskForm.feedback.saved":
    "\nRisco do projeto salvo no espaço de trabalho imobiliário.",
  "estate.projectRiskForm.feedback.saveFailed":
    "\nIncapaz de persistir o risco do projeto no momento.",
  "estate.projectChangeForm.title": "\nControle de alterações do projeto",
  "estate.projectChangeForm.description":
    "\nCapture solicitações de mudança, impacto no custo e no cronograma e estado de aprovação dentro do fluxo do programa de bens duráveis.",
  "estate.projectChangeForm.projectLabel": "\nProjeto imobiliário",
  "estate.projectChangeForm.projectHint":
    "\nSelecione a entrada de registro do projeto que possui este item de mudança.",
  "estate.projectChangeForm.nameLabel": "\nAlterar título",
  "estate.projectChangeForm.namePlaceholder":
    "\nExpanda o escopo do pacote civil para incluir pistas de destino",
  "estate.projectChangeForm.nameHint":
    "\nUse um título curto que possa persistir durante a aprovação e atualizações de entrega.",
  "estate.projectChangeForm.typeLabel": "\nAlterar tipo",
  "estate.projectChangeForm.typeHint":
    "\nIdentifique a principal categoria de controle afetada por este item de mudança.",
  "estate.projectChangeForm.type.SCOPE": "\nEscopo",
  "estate.projectChangeForm.type.SCHEDULE": "\nAgenda",
  "estate.projectChangeForm.type.COST": "\nCusto",
  "estate.projectChangeForm.type.RESOURCE": "\nRecurso",
  "estate.projectChangeForm.type.COMPLIANCE": "\nConformidade",
  "estate.projectChangeForm.statusLabel": "\nAlterar status",
  "estate.projectChangeForm.statusHint":
    "\nAcompanhe se a mudança foi proposta, em revisão, aprovada, rejeitada ou implementada.",
  "estate.projectChangeForm.status.PROPOSED": "\nProposto",
  "estate.projectChangeForm.status.IN_REVIEW": "\nEm revisão",
  "estate.projectChangeForm.status.APPROVED": "Aprovado",
  "estate.projectChangeForm.status.REJECTED": "\nRejeitado",
  "estate.projectChangeForm.status.IMPLEMENTED": "\nImplementado",
  "estate.projectChangeForm.scheduleImpactLabel": "\nImpacto no cronograma (dias)",
  "estate.projectChangeForm.scheduleImpactHint":
    "\nRegistre o efeito do cronograma atual esperado se a mudança continuar.",
  "estate.projectChangeForm.costImpactLabel": "\nImpacto no custo",
  "estate.projectChangeForm.costImpactHint":
    "\nRegistre o efeito de custo estimado atual da solicitação de mudança.",
  "estate.projectChangeForm.requestedByLabel": "\nSolicitado por",
  "estate.projectChangeForm.requestedByPlaceholder": "\nLíder de entrega regional",
  "estate.projectChangeForm.requestedByHint":
    "\nNomeie o patrocinador, conselho ou líder operacional que está solicitando a mudança.",
  "estate.projectChangeForm.notesLabel": "\nAlterar notas",
  "estate.projectChangeForm.notesPlaceholder":
    "\nCapture a mudança solicitada, as dependências e as aprovações necessárias.",
  "estate.projectChangeForm.notesHint":
    "\nPreserve contexto suficiente para painéis de revisão e relatórios de entrega.",
  "estate.projectChangeForm.requiredHint":
    "\nProjeto, título da mudança, tipo, status, impacto no cronograma, impacto no custo, solicitante e notas são obrigatórios.",
  "estate.projectChangeForm.submit": "\nSalvar alteração do projeto",
  "estate.projectChangeForm.submitAria": "\nSalvar alteração do projeto",
  "estate.projectChangeForm.summary.pending": "\n{count} pendente",
  "estate.projectChangeForm.summary.approved": "\n{count} aprovado ou implementado",
  "estate.projectChangeForm.tableAria": "\nControle de alterações do projeto",
  "estate.projectChangeForm.table.change": "\nAlterar",
  "estate.projectChangeForm.table.type": "\nTipo",
  "estate.projectChangeForm.table.status": "\nStatus",
  "estate.projectChangeForm.table.impact": "\nImpacto",
  "estate.projectChangeForm.table.requestedBy": "\nSolicitado por",
  "estate.projectChangeForm.table.scheduleValue": "\n{days} impacto na programação diária",
  "estate.projectChangeForm.empty": "\nNenhuma alteração do projeto capturada ainda.",
  "estate.projectChangeForm.validation.projectRequired":
    "\nSelecione um projeto imobiliário válido.",
  "estate.projectChangeForm.validation.titleRequired": "A alteração do título é obrigatória.",
  "estate.projectChangeForm.validation.changeTypeRequired": "\nO tipo de alteração é obrigatório.",
  "estate.projectChangeForm.validation.statusRequired": "\nA alteração do status é obrigatória.",
  "estate.projectChangeForm.validation.scheduleImpactDays":
    "\nO impacto do cronograma deve ser um número inteiro igual ou superior a zero.",
  "estate.projectChangeForm.validation.costImpactAmount":
    "\nO impacto no custo deve ser zero ou superior.",
  "estate.projectChangeForm.validation.requestedByRequired": "\nO solicitante é obrigatório.",
  "estate.projectChangeForm.validation.notesRequired": "\nNotas de alteração são obrigatórias.",
  "estate.projectChangeForm.feedback.saved":
    "\nAlteração do projeto salva no espaço de trabalho da propriedade.",
  "estate.projectChangeForm.feedback.saveFailed":
    "\nNão é possível persistir a alteração do projeto no momento.",
  "estate.agreementForm.title": "\nRegistrar um contrato de propriedade",
  "estate.agreementForm.description":
    "\nCapture o uso da terra rural, a atividade comercial de terceiros e a supervisão do catering ESS dentro de um registro de propriedade durável.",
  "estate.agreementForm.alertTitle":
    "\nUm registo abrange agora a coordenação rural, comercial e de restauração",
  "estate.agreementForm.alertDescription":
    "\nOs registros rurais exigem um sinal sobre as condições da terra, os registros comerciais exigem receita e utilização e os registros de catering exigem uma pontuação de serviço.",
  "estate.agreementForm.domainLabel": "\nDomínio",
  "estate.agreementForm.domainHint":
    "\nEscolha se este registro pertence à administração de propriedade rural, uso comercial ou supervisão de catering.",
  "estate.agreementForm.domain.RURAL": "\nImóvel rural",
  "estate.agreementForm.domain.COMMERCIAL": "\nRenda de terceiros",
  "estate.agreementForm.domain.CATERING": "\nIntegração de catering",
  "estate.agreementForm.typeLabel": "\nTipo de contrato",
  "estate.agreementForm.typeHint":
    "\nSelecione a licença, locação, acesso ou tipo de serviço que melhor se adapta ao domínio selecionado.",
  "estate.agreementForm.type.GRAZING_LICENSE": "\nLicença de pastoreio",
  "estate.agreementForm.type.AGRICULTURAL_TENANCY": "\nArrendamento agrícola",
  "estate.agreementForm.type.LAND_ACCESS": "\nContrato de acesso à terra",
  "estate.agreementForm.type.COMMERCIAL_LICENSE": "\nLicença de uso comercial",
  "estate.agreementForm.type.EVENT_LICENSE": "\nLicença de evento e visitante",
  "estate.agreementForm.type.CATERING_SERVICE": "\nServiço de catering",
  "estate.agreementForm.nameLabel": "\nTítulo do contrato",
  "estate.agreementForm.namePlaceholder": "\nLicença de pastoreio na Cordilheira Sul",
  "estate.agreementForm.nameHint":
    "\nUse um título que possa sobreviver em reuniões de supervisão, análises de parceiros e relatórios.",
  "estate.agreementForm.siteLabel": "\nLocal",
  "estate.agreementForm.siteHint":
    "\nAnexe o registro ao sítio imobiliário que possui a coordenação operacional.",
  "estate.agreementForm.assetLabel": "\nAtivo ou equipamento vinculado",
  "estate.agreementForm.assetHint":
    "\nOpcionalmente, vincule o registro a um ativo específico ou item de equipamento de catering no mesmo local.",
  "estate.agreementForm.assetOptional": "\nNenhum ativo vinculado",
  "estate.agreementForm.counterpartyLabel": "\nContraparte",
  "estate.agreementForm.counterpartyPlaceholder":
    "\nESS, Hill Farm Partnership ou Regional Events Ltd",
  "estate.agreementForm.counterpartyHint":
    "\nNomeie o inquilino, parceiro, fornecedor ou contraparte comercial proprietária do contrato.",
  "estate.agreementForm.statusLabel": "\nStatus do contrato",
  "estate.agreementForm.statusHint":
    "\nAcompanhe se o registro está em rascunho, ativo, sob vigilância ou expirado.",
  "estate.agreementForm.status.DRAFT": "\nRascunho",
  "estate.agreementForm.status.ACTIVE": "\nAtivo",
  "estate.agreementForm.status.WATCH": "\nAssistir",
  "estate.agreementForm.status.EXPIRED": "\nExpirado",
  "estate.agreementForm.coordinationLabel": "\nCoordenação de treinamento",
  "estate.agreementForm.coordinationHint":
    "Mostre se o acordo atualmente está alinhado com a atividade de treinamento, precisa de observação ou está em conflito.",
  "estate.agreementForm.coordination.ALIGNED": "\nAlinhado",
  "estate.agreementForm.coordination.WATCH": "\nAssistir",
  "estate.agreementForm.coordination.CONFLICT": "\nConflito",
  "estate.agreementForm.landConditionLabel": "\nCondição do terreno",
  "estate.agreementForm.landConditionHint":
    "\nObrigatório para que os registros rurais monitorem a pressão do pastoreio, as condições de acesso ou a postura de arrendamento.",
  "estate.agreementForm.landCondition.GOOD": "\nBom",
  "estate.agreementForm.landCondition.WATCH": "\nAssistir",
  "estate.agreementForm.landCondition.RECOVERY": "\nRecuperação necessária",
  "estate.agreementForm.revenueLabel": "\nValor anual",
  "estate.agreementForm.revenueHint":
    "\nObrigatório para registros comerciais rastrearem a receita anual ou o valor licenciado.",
  "estate.agreementForm.utilisationLabel": "\nPorcentagem de utilização",
  "estate.agreementForm.utilisationHint":
    "\nObrigatório para registros comerciais rastrearem a intensidade de uso do site ou ativo licenciado.",
  "estate.agreementForm.performanceLabel": "\nPontuação de serviço",
  "estate.agreementForm.performanceHint":
    "\nObrigatório para registros de catering para capturar o desempenho atual do serviço ESS.",
  "estate.agreementForm.startDateLabel": "\nData de início",
  "estate.agreementForm.startDateHint":
    "\nData de início opcional para o termo do contrato atual ou período de supervisão.",
  "estate.agreementForm.endDateLabel": "\nData de término",
  "estate.agreementForm.endDateHint":
    "\nData de término opcional para o período de licença ou termo do contrato atual.",
  "estate.agreementForm.notesLabel": "\nNotas operacionais",
  "estate.agreementForm.notesPlaceholder":
    "\nCapture restrições de treinamento, janelas de acesso, obrigações de parceiros ou cobertura de equipamentos.",
  "estate.agreementForm.notesHint":
    "\nUse isso para preservar o contexto que deve sobreviver às revisões imobiliárias e à coordenação de parceiros.",
  "estate.agreementForm.requiredHint":
    "\nTítulo, domínio, tipo, site, contraparte, status do contrato, status de coordenação e notas são sempre obrigatórios. As métricas específicas do domínio são validadas automaticamente.",
  "estate.agreementForm.submit": "\nSalvar contrato de propriedade",
  "estate.agreementForm.submitAria": "\nSalvar contrato de propriedade",
  "estate.agreementForm.summary.active": "\n{count} ativo",
  "estate.agreementForm.summary.conflicts": "\n{count} conflitos",
  "estate.agreementForm.empty": "\nNenhum acordo imobiliário capturado ainda.",
  "estate.agreementForm.emptySites": "\nNenhum site ativo disponível",
  "estate.agreementForm.emptySitesTitle": "\nCrie um site antes de capturar contratos imobiliários",
  "estate.agreementForm.emptySitesDescription":
    "\nOs registros rurais, comerciais e de catering são anexados diretamente a um local gerenciado e a um ativo opcional do mesmo local.",
  "estate.agreementForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "estate.agreementForm.tableAria": "\nContratos imobiliários",
  "estate.agreementForm.table.agreement": "\nContrato",
  "estate.agreementForm.table.domain": "\nDomínio",
  "estate.agreementForm.table.site": "\nSite e ativo",
  "estate.agreementForm.table.status": "\nStatus",
  "estate.agreementForm.table.signal": "\nSinal operacional",
  "estate.agreementForm.table.notes": "\nNotas",
  "estate.agreementForm.table.signalRural": "\nCondição do terreno: {condition}",
  "estate.agreementForm.table.signalCommercial": "\nReceita {revenue} · {utilisation}",
  "estate.agreementForm.table.signalCatering": "\nServiço {score} · Ativo {asset}",
  "estate.agreementForm.table.signalUtilisation": "\n{percent}% utilizado",
  "estate.agreementForm.table.signalScore": "\n{score}% pontuação",
  "estate.agreementForm.table.signalNone": "\nNenhum sinal operacional registrado ainda.",
  "estate.agreementForm.table.metricEmpty": "\nnão registrado",
  "estate.agreementForm.table.assetUnlinked": "\nNenhum ativo vinculado",
  "estate.agreementForm.table.startDateValue": "\nComeçou {date}",
  "estate.agreementForm.table.startDateEmpty": "\nNenhuma data de início registrada",
  "estate.agreementForm.validation.titleRequired": "\nO título do contrato é obrigatório.",
  "estate.agreementForm.validation.domainRequired": "\nEscolha um domínio de contrato válido.",
  "estate.agreementForm.validation.typeRequired": "\nEscolha um tipo de contrato válido.",
  "estate.agreementForm.validation.typeDomainMismatch":
    "Escolha um tipo de contrato que corresponda ao domínio selecionado.",
  "estate.agreementForm.validation.siteRequired": "\nSelecione um site imobiliário válido.",
  "estate.agreementForm.validation.assetMismatch":
    "\nOs ativos vinculados devem pertencer ao imóvel selecionado.",
  "estate.agreementForm.validation.counterpartyRequired": "\nA contraparte é obrigatória.",
  "estate.agreementForm.validation.statusRequired": "\nO status do contrato é obrigatório.",
  "estate.agreementForm.validation.coordinationRequired":
    "\nO status de coordenação de treinamento é obrigatório.",
  "estate.agreementForm.validation.landConditionRequired":
    "\nOs registros rurais exigem um status de condição da terra.",
  "estate.agreementForm.validation.revenueRequired":
    "\nOs registros comerciais exigem um valor anual.",
  "estate.agreementForm.validation.utilisationRequired":
    "\nOs registros comerciais exigem uma porcentagem de utilização.",
  "estate.agreementForm.validation.performanceRequired":
    "\nOs registros de catering exigem uma pontuação de serviço.",
  "estate.agreementForm.validation.revenueInvalid": "\nO valor anual deve ser zero ou superior.",
  "estate.agreementForm.validation.utilisationInvalid":
    "\nA porcentagem de utilização deve ser um número inteiro entre 0 e 100.",
  "estate.agreementForm.validation.performanceInvalid":
    "\nA pontuação do serviço deve ser um número inteiro entre 0 e 100.",
  "estate.agreementForm.validation.dateInvalid":
    "\nAs datas devem ser valores de calendário válidos.",
  "estate.agreementForm.validation.dateOrderInvalid":
    "\nA data de término deve ser igual ou posterior à data de início.",
  "estate.agreementForm.feedback.saved":
    "\nContrato imobiliário salvo no espaço de trabalho imobiliário.",
  "estate.agreementForm.feedback.saveFailed":
    "\nIncapaz de manter o acordo de propriedade no momento.",
  "estate.stewardshipForm.title": "\nRegistre um registro de administração",
  "estate.stewardshipForm.description":
    "\nCapture operações florestais, controles de patrimônio e obrigações de gestão ambiental dentro de um registro de propriedade durável.",
  "estate.stewardshipForm.alertTitle":
    "\nUm registro de manejo agora cobre controles florestais, patrimoniais e ambientais",
  "estate.stewardshipForm.alertDescription":
    "\nOs registros de produção de madeira exigem um valor medido, os registros de autorização de trabalho exigem uma data prevista e cada registro carrega condição compartilhada e postura de conformidade.",
  "estate.stewardshipForm.domainLabel": "\nDomínio",
  "estate.stewardshipForm.domainHint":
    "\nEscolha se o registro pertence a operações florestais, gestão de patrimônio ou gestão ambiental.",
  "estate.stewardshipForm.domain.FORESTRY": "\nOperações florestais",
  "estate.stewardshipForm.domain.HERITAGE": "\nGestão de ativos patrimoniais",
  "estate.stewardshipForm.domain.ENVIRONMENT": "\nGestão ambiental",
  "estate.stewardshipForm.recordTypeLabel": "\nTipo de registro",
  "estate.stewardshipForm.recordTypeHint":
    "\nSelecione o registro operacional, pesquisa, cronograma ou item de consentimento que melhor se adapta ao domínio de administração escolhido.",
  "estate.stewardshipForm.recordType.WOODLAND_ASSET": "\nAtivo florestal",
  "estate.stewardshipForm.recordType.PLANTING_SCHEDULE": "\nCronograma de plantio",
  "estate.stewardshipForm.recordType.HARVEST_SCHEDULE": "\nCronograma de colheita",
  "estate.stewardshipForm.recordType.TIMBER_OUTPUT": "\nProdução de madeira",
  "estate.stewardshipForm.recordType.HERITAGE_ASSET": "\nAtivo patrimonial",
  "estate.stewardshipForm.recordType.CONSERVATION_SURVEY": "\nPesquisa de conservação",
  "estate.stewardshipForm.recordType.WORKS_CONSENT": "\nConsentimento de obras",
  "estate.stewardshipForm.recordType.BIODIVERSITY_MONITORING": "\nMonitoramento da biodiversidade",
  "estate.stewardshipForm.recordType.HABITAT_SURVEY": "\nPesquisa de habitat",
  "estate.stewardshipForm.recordType.ENVIRONMENTAL_INSPECTION": "\nInspeção Ambiental",
  "estate.stewardshipForm.recordType.PROTECTED_SPECIES": "\nRegistro de espécies protegidas",
  "estate.stewardshipForm.nameLabel": "\nTítulo do registro",
  "estate.stewardshipForm.namePlaceholder": "\nRetorno da produção da floresta sul",
  "estate.stewardshipForm.nameHint":
    "Use um título que possa sobreviver em revisões de administração, discussões de conformidade e pacotes de relatórios.",
  "estate.stewardshipForm.siteLabel": "\nLocal",
  "estate.stewardshipForm.siteHint":
    "\nAnexe o registro ao site que possui a obrigação ou atividade de administração atual.",
  "estate.stewardshipForm.assetLabel": "\nAtivo vinculado",
  "estate.stewardshipForm.assetHint":
    "\nOpcionalmente, vincule o registro a um ativo do mesmo local, como uma estrutura listada, ativo florestal ou sistema monitorado.",
  "estate.stewardshipForm.assetOptional": "\nNenhum ativo vinculado",
  "estate.stewardshipForm.statusLabel": "\nStatus do registro",
  "estate.stewardshipForm.statusHint":
    "\nAcompanhe se o registro de administração está como rascunho, ativo, sob vigilância ou fechado.",
  "estate.stewardshipForm.status.DRAFT": "\nRascunho",
  "estate.stewardshipForm.status.ACTIVE": "\nAtivo",
  "estate.stewardshipForm.status.WATCH": "\nAssistir",
  "estate.stewardshipForm.status.CLOSED": "\nAutoridade de aprovação",
  "estate.stewardshipForm.conditionStatusLabel": "\nCondição postura",
  "estate.stewardshipForm.conditionStatusHint":
    "\nCapture se a floresta, o elemento patrimonial ou o sinal ambiental são favoráveis, em recuperação ou estão em risco.",
  "estate.stewardshipForm.conditionStatus.FAVOURABLE": "\nFavorável",
  "estate.stewardshipForm.conditionStatus.RECOVERING": "\nRecuperando",
  "estate.stewardshipForm.conditionStatus.AT_RISK": "\nEm risco",
  "estate.stewardshipForm.complianceStatusLabel": "\nPostura de conformidade",
  "estate.stewardshipForm.complianceStatusHint":
    "\nRastreie se o registro atual está em conformidade, sob vigilância, aguardando consentimento ou não conforme.",
  "estate.stewardshipForm.complianceStatus.COMPLIANT": "\nCompatível",
  "estate.stewardshipForm.complianceStatus.WATCH": "\nAssistir",
  "estate.stewardshipForm.complianceStatus.CONSENT_REQUIRED": "\nConsentimento necessário",
  "estate.stewardshipForm.complianceStatus.NON_COMPLIANT": "\nNão compatível",
  "estate.stewardshipForm.metricValueLabel": "\nValor medido",
  "estate.stewardshipForm.metricValueHint":
    "\nUse isto para produção de madeira, contagens de biodiversidade ou outras medidas de manejo quantificadas.",
  "estate.stewardshipForm.metricUnitLabel": "\nUnidade métrica",
  "estate.stewardshipForm.metricUnitPlaceholder": "\ntoneladas, hectares ou avistamentos",
  "estate.stewardshipForm.metricUnitHint":
    "\nNomeie a unidade associada ao valor medido quando um for registrado.",
  "estate.stewardshipForm.targetDateLabel": "\nData prevista",
  "estate.stewardshipForm.targetDateHint":
    "\nUse isto para janelas de colheita, datas de pesquisa, prazos de inspeção ou marcos de consentimento necessários.",
  "estate.stewardshipForm.notesLabel": "\nNotas operacionais",
  "estate.stewardshipForm.notesPlaceholder":
    "\nCapture restrições de administração, contexto de conformidade, áreas protegidas ou dependências operacionais.",
  "estate.stewardshipForm.notesHint":
    "\nPreserve detalhes suficientes para análises de conformidade, coordenação de entrega e relatórios patrimoniais.",
  "estate.stewardshipForm.requiredHint":
    "\nTítulo, domínio, tipo de registro, site, status, postura de condição, postura de conformidade e notas são sempre obrigatórios. As métricas específicas do domínio são validadas automaticamente.",
  "estate.stewardshipForm.submit": "\nSalvar registro de administração",
  "estate.stewardshipForm.submitAria": "\nSalvar registro de administração",
  "estate.stewardshipForm.summary.atRisk": "\n{count} em risco",
  "estate.stewardshipForm.summary.consents": "\n{count} fila de consentimento",
  "estate.stewardshipForm.empty": "\nNenhum registro de administração capturado ainda.",
  "estate.stewardshipForm.emptySites": "\nNenhum site ativo disponível",
  "estate.stewardshipForm.emptySitesTitle":
    "\nCrie um site antes de capturar registros de administração",
  "estate.stewardshipForm.emptySitesDescription":
    "\nOs registros florestais, patrimoniais e de manejo ambiental são anexados diretamente a um local gerenciado e a um ativo opcional do mesmo local.",
  "estate.stewardshipForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "estate.stewardshipForm.tableAria": "\nRegistros de administração",
  "estate.stewardshipForm.table.record": "\nRegistro",
  "estate.stewardshipForm.table.domain": "\nDomínio",
  "estate.stewardshipForm.table.site": "\nSite e ativo",
  "estate.stewardshipForm.table.status": "\nStatus",
  "estate.stewardshipForm.table.signal": "\nSinal operacional",
  "estate.stewardshipForm.table.notes": "\nNotas",
  "estate.stewardshipForm.table.assetUnlinked": "\nNenhum ativo vinculado",
  "estate.stewardshipForm.table.updatedAt": "\nAtualizado {date}",
  "estate.stewardshipForm.table.signalTimberOutput": "\n{value} {unit} gravado",
  "estate.stewardshipForm.table.signalConsent": "Postura de consentimento: {status}",
  "estate.stewardshipForm.table.signalProtectedSpecies":
    "\nPostura de espécie protegida: {condition}",
  "estate.stewardshipForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.stewardshipForm.table.signalNone": "\nNenhum sinal operacional registrado ainda.",
  "estate.stewardshipForm.validation.titleRequired": "\nO título de administrador é obrigatório.",
  "estate.stewardshipForm.validation.domainRequired":
    "\nEscolha um domínio de administração válido.",
  "estate.stewardshipForm.validation.recordTypeRequired":
    "\nEscolha um tipo de registro de administração válido.",
  "estate.stewardshipForm.validation.recordTypeDomainMismatch":
    "\nEscolha um tipo de registro que corresponda ao domínio de administração selecionado.",
  "estate.stewardshipForm.validation.siteRequired": "\nSelecione um site imobiliário válido.",
  "estate.stewardshipForm.validation.assetMismatch":
    "\nOs ativos vinculados devem pertencer ao imóvel selecionado.",
  "estate.stewardshipForm.validation.statusRequired": "\nO status de administração é obrigatório.",
  "estate.stewardshipForm.validation.conditionStatusRequired":
    "\nA postura da condição é necessária.",
  "estate.stewardshipForm.validation.complianceStatusRequired":
    "\nA postura de conformidade é necessária.",
  "estate.stewardshipForm.validation.metricValueRequired":
    "\nOs registros de produção de madeira exigem um valor medido.",
  "estate.stewardshipForm.validation.metricValueInvalid":
    "\nO valor medido deve ser zero ou maior.",
  "estate.stewardshipForm.validation.metricUnitRequired":
    "\nA unidade métrica é necessária quando um valor medido é registrado.",
  "estate.stewardshipForm.validation.targetDateRequired":
    "\nOs registros de consentimento de obras exigem uma data prevista.",
  "estate.stewardshipForm.validation.targetDateInvalid":
    "\nA data prevista deve ser um valor de calendário válido.",
  "estate.stewardshipForm.feedback.saved":
    "\nRegistro de administração salvo no espaço de trabalho imobiliário.",
  "estate.stewardshipForm.feedback.saveFailed":
    "\nNão é possível manter o registro de administração no momento.",
  "estate.fmGovernanceForm.title": "\nRegistre um registro de governança FM",
  "estate.fmGovernanceForm.description":
    "\nCapture governança de FM rígida, garantia estatutária, cronogramas de serviço e postura de referência de FM flexível em um único registro imobiliário.",
  "estate.fmGovernanceForm.alertTitle":
    "\nSFG20, SOP19 e governança de FM suave agora ficam dentro de uma superfície de controle imobiliário",
  "estate.fmGovernanceForm.alertDescription":
    "\nOs registros de cronograma, inspeção, auditoria e serviço usam datas previstas, enquanto os registros de manutenção reativa e de referência carregam valores de saída medidos.",
  "estate.fmGovernanceForm.domainLabel": "\nDomínio",
  "estate.fmGovernanceForm.domainHint":
    "\nSepare a governança de manutenção de FM rígida do serviço de FM flexível e dos controles de benchmark.",
  "estate.fmGovernanceForm.domain.HARD_FM": "\nGovernança FM rígida",
  "estate.fmGovernanceForm.domain.SOFT_FM": "\nGovernança suave de FM",
  "estate.fmGovernanceForm.recordTypeLabel": "\nTipo de registro",
  "estate.fmGovernanceForm.recordTypeHint":
    "\nEscolha a manutenção planejada, garantia, serviço ou controle de referência que está sendo registrado.",
  "estate.fmGovernanceForm.recordType.PPM_SCHEDULE":
    "\nCronograma de manutenção preventiva planejada",
  "estate.fmGovernanceForm.recordType.SFG20_SCHEDULE": "\nCronograma de manutenção do SFG20",
  "estate.fmGovernanceForm.recordType.STATUTORY_INSPECTION": "\nInspeção legal",
  "estate.fmGovernanceForm.recordType.REACTIVE_MAINTENANCE": "\nDesempenho de manutenção reativa",
  "estate.fmGovernanceForm.recordType.COMPLIANCE_AUDIT": "\nAuditoria de conformidade",
  "estate.fmGovernanceForm.recordType.ASSURANCE_REVIEW": "\nRevisão de garantia de manutenção",
  "estate.fmGovernanceForm.recordType.SERVICE_SCHEDULE": "\nProgramação de serviço Soft FM",
  "estate.fmGovernanceForm.recordType.GROUNDS_PROGRAMME": "\nPrograma de manutenção de terreno",
  "estate.fmGovernanceForm.recordType.WASTE_SERVICE": "\nPrograma de serviço de resíduos",
  "estate.fmGovernanceForm.recordType.SERVICE_PERFORMANCE": "\nMedida de desempenho do serviço",
  "estate.fmGovernanceForm.recordType.PRODUCTIVITY_BENCHMARK": "\nReferência de produtividade",
  "estate.fmGovernanceForm.recordType.INDUSTRY_BENCHMARK": "\nReferência do setor",
  "estate.fmGovernanceForm.nameLabel": "\nTítulo do registro",
  "estate.fmGovernanceForm.namePlaceholder": "\nCiclo de fiscalização legal do imóvel Norte",
  "estate.fmGovernanceForm.nameHint":
    "\nNomeie o item de governança de FM para que sobreviva às revisões operacionais e aos pacotes de garantia patrimonial.",
  "estate.fmGovernanceForm.siteLabel": "\nLocal",
  "estate.fmGovernanceForm.siteHint":
    "Selecione o local da propriedade que possui o item de manutenção ou governança de serviço.",
  "estate.fmGovernanceForm.assetLabel": "\nAtivo vinculado",
  "estate.fmGovernanceForm.assetHint":
    "\nVincule o controle a um ativo quando o registro se aplicar a um item específico da planta ou componente de infraestrutura.",
  "estate.fmGovernanceForm.assetOptional": "\nNenhum ativo vinculado",
  "estate.fmGovernanceForm.statusLabel": "\nStatus do registro",
  "estate.fmGovernanceForm.statusHint":
    "\nDefina se o item de governança está ativo, sob vigilância ou fechado.",
  "estate.fmGovernanceForm.status.DRAFT": "\nRascunho",
  "estate.fmGovernanceForm.status.ACTIVE": "\nAtivo",
  "estate.fmGovernanceForm.status.WATCH": "\nAssistir",
  "estate.fmGovernanceForm.status.CLOSED": "\nAutoridade de aprovação",
  "estate.fmGovernanceForm.deliveryStatusLabel": "\nPostura de parto",
  "estate.fmGovernanceForm.deliveryStatusHint":
    "\nCapture se o cronograma ou serviço está no caminho certo, sob pressão ou fora do caminho.",
  "estate.fmGovernanceForm.deliveryStatus.ON_TRACK": "\nNo caminho certo",
  "estate.fmGovernanceForm.deliveryStatus.UNDER_PRESSURE": "\nSob pressão",
  "estate.fmGovernanceForm.deliveryStatus.OFF_TRACK": "\nFora do caminho",
  "estate.fmGovernanceForm.complianceStatusLabel": "\nPostura de conformidade",
  "estate.fmGovernanceForm.complianceStatusHint":
    "\nRastreie se o controle está em conformidade, precisa de ação ou entrou em não conformidade.",
  "estate.fmGovernanceForm.complianceStatus.COMPLIANT": "\nCompatível",
  "estate.fmGovernanceForm.complianceStatus.WATCH": "\nAssistir",
  "estate.fmGovernanceForm.complianceStatus.ACTION_REQUIRED": "\nAção necessária",
  "estate.fmGovernanceForm.complianceStatus.NON_COMPLIANT": "\nNão compatível",
  "estate.fmGovernanceForm.metricValueLabel": "\nValor medido",
  "estate.fmGovernanceForm.metricValueHint":
    "\nUse um valor para manutenção reativa, desempenho e pontuação de benchmark.",
  "estate.fmGovernanceForm.metricUnitLabel": "\nUnidade métrica",
  "estate.fmGovernanceForm.metricUnitPlaceholder": "\npontuação, empregos, hectares ou horas",
  "estate.fmGovernanceForm.metricUnitHint":
    "\nDescreva a unidade usada para o serviço medido ou valor de referência.",
  "estate.fmGovernanceForm.targetDateLabel": "\nData prevista",
  "estate.fmGovernanceForm.targetDateHint":
    "\nUse datas previstas para cronogramas, inspeções, auditorias, revisões de garantia e programas de serviço.",
  "estate.fmGovernanceForm.notesLabel": "\nNotas operacionais",
  "estate.fmGovernanceForm.notesPlaceholder":
    "\nCapture SFG20, SOP19, desempenho de serviço, benchmark ou detalhes de mitigação que devem persistir no registro de patrimônio.",
  "estate.fmGovernanceForm.notesHint":
    "\nMantenha as notas curtas, operacionais e específicas para o item de governança de FM.",
  "estate.fmGovernanceForm.requiredHint":
    "\nTítulo, domínio, tipo, site, status e notas são obrigatórios. Alguns tipos de registro também exigem uma métrica ou data prevista.",
  "estate.fmGovernanceForm.submit": "\nSalvar registro de governança FM",
  "estate.fmGovernanceForm.submitAria": "\nSalvar registro de governança FM",
  "estate.fmGovernanceForm.summary.complianceAttention": "\n{count} precisa de atenção",
  "estate.fmGovernanceForm.summary.benchmarks": "\n{count} benchmarks rastreados",
  "estate.fmGovernanceForm.empty": "\nNenhum registro de governança de FM capturado ainda.",
  "estate.fmGovernanceForm.emptySites": "\nNenhum site ativo disponível",
  "estate.fmGovernanceForm.emptySitesTitle":
    "\nCrie um site antes de capturar registros de governança FM",
  "estate.fmGovernanceForm.emptySitesDescription":
    "\nO registro de governança FM depende da lista de locais da propriedade para que horários e serviços possam ser vinculados ao local correto.",
  "estate.fmGovernanceForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "estate.fmGovernanceForm.tableAria": "\nRegistros de governança FM",
  "estate.fmGovernanceForm.table.record": "\nRegistro",
  "estate.fmGovernanceForm.table.domain": "\nDomínio",
  "estate.fmGovernanceForm.table.site": "\nSite e ativo",
  "estate.fmGovernanceForm.table.status": "\nStatus",
  "estate.fmGovernanceForm.table.signal": "\nSinal operacional",
  "estate.fmGovernanceForm.table.notes": "\nNotas",
  "estate.fmGovernanceForm.table.assetUnlinked": "\nNenhum ativo vinculado",
  "estate.fmGovernanceForm.table.updatedAt": "\nAtualizado {date}",
  "estate.fmGovernanceForm.table.signalMetric": "\n{value} {unit} gravado",
  "estate.fmGovernanceForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.fmGovernanceForm.table.signalCompliance": "\nPostura de conformidade: {status}",
  "estate.fmGovernanceForm.validation.titleRequired": "\nO título de governança FM é obrigatório.",
  "estate.fmGovernanceForm.validation.domainRequired":
    "\nEscolha um domínio de governança FM válido.",
  "estate.fmGovernanceForm.validation.recordTypeRequired":
    "\nEscolha um tipo de registro de governança FM válido.",
  "estate.fmGovernanceForm.validation.recordTypeDomainMismatch":
    "\nEscolha um tipo de registro que corresponda ao domínio de governança FM selecionado.",
  "estate.fmGovernanceForm.validation.siteRequired": "\nSelecione um site imobiliário válido.",
  "estate.fmGovernanceForm.validation.assetMismatch":
    "\nO ativo vinculado deve pertencer ao terreno selecionado.",
  "estate.fmGovernanceForm.validation.statusRequired": "\nO status de governança FM é obrigatório.",
  "estate.fmGovernanceForm.validation.deliveryStatusRequired":
    "É necessária uma postura de entrega de governança FM.",
  "estate.fmGovernanceForm.validation.complianceStatusRequired":
    "\nÉ necessária uma postura de conformidade com a governança FM.",
  "estate.fmGovernanceForm.validation.metricValueRequired":
    "\nManutenção reativa, desempenho e registros de benchmark exigem um valor medido.",
  "estate.fmGovernanceForm.validation.metricValueInvalid":
    "\nO valor medido deve ser zero ou maior.",
  "estate.fmGovernanceForm.validation.metricUnitRequired":
    "\nA unidade métrica é necessária quando um valor medido é registrado.",
  "estate.fmGovernanceForm.validation.targetDateRequired":
    "\nRegistros de cronograma, inspeção, auditoria, garantia e serviço exigem uma data prevista.",
  "estate.fmGovernanceForm.validation.targetDateInvalid":
    "\nA data prevista deve ser um valor de calendário válido.",
  "estate.fmGovernanceForm.feedback.saved":
    "\nRegistro de governança FM salvo no espaço de trabalho imobiliário.",
  "estate.fmGovernanceForm.feedback.saveFailed":
    "\nIncapaz de manter o histórico de governança de FM no momento.",
  "estate.rangeControlForm.title": "\nRegistre um intervalo e registro de controle GFE",
  "estate.rangeControlForm.description":
    "\nCapture a atividade do TAROM, controles de segurança de alcance, postura do ciclo de vida do alvo e sinais de equipamentos fornecidos pelo governo dentro de um registro de propriedade durável.",
  "estate.rangeControlForm.alertTitle":
    "\nUm registro de controle operacional agora cobre alcance, segurança, alvos e GFE",
  "estate.rangeControlForm.alertDescription":
    "\nOs registros de disponibilidade e utilização exigem um valor medido, as ações de inspeção e recuperação exigem uma data prevista e os registros de destino ou GFE exigem um ativo vinculado no mesmo local.",
  "estate.rangeControlForm.domainLabel": "\nDomínio",
  "estate.rangeControlForm.domainHint":
    "\nEscolha se o registro pertence à entrega TAROM, conformidade de segurança de alcance, gerenciamento de alvos ou supervisão do ciclo de vida GFE.",
  "estate.rangeControlForm.domain.RANGE_OPERATIONS":
    "\nÁreas de treinamento e operações de alcance",
  "estate.rangeControlForm.domain.RANGE_SAFETY": "\nConformidade de segurança de faixa",
  "estate.rangeControlForm.domain.TARGETRY": "\nGerenciamento do ciclo de vida do alvo",
  "estate.rangeControlForm.domain.GFE": "\nEquipamento fornecido pelo governo",
  "estate.rangeControlForm.recordTypeLabel": "\nTipo de registro",
  "estate.rangeControlForm.recordTypeHint":
    "\nSelecione o registro de controle operacional, inspeção, disponibilidade, armazenamento ou substituição que melhor se adapta ao domínio selecionado.",
  "estate.rangeControlForm.recordType.RANGE_REGISTRY": "\nRegistro de registro de intervalo",
  "estate.rangeControlForm.recordType.RANGE_AVAILABILITY": "\nDisponibilidade de intervalo",
  "estate.rangeControlForm.recordType.RANGE_PREPARATION": "\nJanela de preparação de faixa",
  "estate.rangeControlForm.recordType.RANGE_RECOVERY": "\nJanela de recuperação de intervalo",
  "estate.rangeControlForm.recordType.SAFETY_INSPECTION": "\nInspeção de segurança",
  "estate.rangeControlForm.recordType.SAFETY_DEFECT": "\nDefeito de segurança",
  "estate.rangeControlForm.recordType.CORRECTIVE_ACTION": "\nAção corretiva",
  "estate.rangeControlForm.recordType.TARGET_ASSET": "\nAtivo alvo",
  "estate.rangeControlForm.recordType.TARGET_DEPLOYMENT": "\nJanela de implantação de destino",
  "estate.rangeControlForm.recordType.TARGET_STORAGE": "\nLocal de armazenamento de destino",
  "estate.rangeControlForm.recordType.TARGET_AVAILABILITY": "\nDisponibilidade desejada",
  "estate.rangeControlForm.recordType.GFE_CONDITION": "\nCondição GFE",
  "estate.rangeControlForm.recordType.GFE_UTILISATION": "\nUtilização do GFE",
  "estate.rangeControlForm.recordType.GFE_REPLACEMENT": "\nPlano de substituição do GFE",
  "estate.rangeControlForm.nameLabel": "\nTítulo do registro",
  "estate.rangeControlForm.namePlaceholder": "\nRetorno de disponibilidade da meta do setor Norte",
  "estate.rangeControlForm.nameHint":
    "\nUse um título que possa sobreviver aos painéis de alcance, às análises de conformidade e aos relatórios operacionais.",
  "estate.rangeControlForm.siteLabel": "\nLocal",
  "estate.rangeControlForm.siteHint":
    "\nAnexe o registro ao site de treinamento que atualmente possui a atividade ou controle.",
  "estate.rangeControlForm.assetLabel": "\nAtivo ou equipamento vinculado",
  "estate.rangeControlForm.assetHint":
    "\nVincule registros de destino e GFE ao ativo ou item de equipamento do mesmo local que eles descrevem diretamente.",
  "estate.rangeControlForm.assetOptional": "\nNenhum ativo vinculado",
  "estate.rangeControlForm.statusLabel": "\nStatus do registro",
  "estate.rangeControlForm.statusHint":
    "Acompanhe se o registro está como rascunho, ativo, sob vigilância ou fechado.",
  "estate.rangeControlForm.status.DRAFT": "\nRascunho",
  "estate.rangeControlForm.status.ACTIVE": "\nAtivo",
  "estate.rangeControlForm.status.WATCH": "\nAssistir",
  "estate.rangeControlForm.status.CLOSED": "\nAutoridade de aprovação",
  "estate.rangeControlForm.operationalStatusLabel": "\nPostura operacional",
  "estate.rangeControlForm.operationalStatusHint":
    "\nCapture se o alcance, o sistema de segurança, o ativo de alvo ou o item GFE estão disponíveis, restritos ou indisponíveis.",
  "estate.rangeControlForm.operationalStatus.AVAILABLE": "\nDisponível",
  "estate.rangeControlForm.operationalStatus.CONSTRAINED": "\nRestrito",
  "estate.rangeControlForm.operationalStatus.UNAVAILABLE": "\nIndisponível",
  "estate.rangeControlForm.complianceStatusLabel": "\nPostura de conformidade",
  "estate.rangeControlForm.complianceStatusHint":
    "\nRastreie se o controle atual está em conformidade, sob vigilância, requer ação ou não está em conformidade.",
  "estate.rangeControlForm.complianceStatus.COMPLIANT": "\nCompatível",
  "estate.rangeControlForm.complianceStatus.WATCH": "\nAssistir",
  "estate.rangeControlForm.complianceStatus.ACTION_REQUIRED": "\nAção necessária",
  "estate.rangeControlForm.complianceStatus.NON_COMPLIANT": "\nNão compatível",
  "estate.rangeControlForm.metricValueLabel": "\nValor medido",
  "estate.rangeControlForm.metricValueHint":
    "\nUse isto para contagens de disponibilidade, totais de utilização ou outros sinais operacionais quantificados.",
  "estate.rangeControlForm.metricUnitLabel": "\nUnidade métrica",
  "estate.rangeControlForm.metricUnitPlaceholder": "\nintervalos, faixas, veículos ou horas",
  "estate.rangeControlForm.metricUnitHint":
    "\nNomeie a unidade associada ao valor medido quando um for registrado.",
  "estate.rangeControlForm.targetDateLabel": "\nData prevista",
  "estate.rangeControlForm.targetDateHint":
    "\nUse isto para datas de inspeção, janelas de preparação e recuperação, implantações ou marcos de substituição.",
  "estate.rangeControlForm.notesLabel": "\nNotas operacionais",
  "estate.rangeControlForm.notesPlaceholder":
    "\nCapture coordenação de incêndio real, contexto de segurança, restrições de manutenção, detalhes de implantação ou suposições de substituição.",
  "estate.rangeControlForm.notesHint":
    "\nPreserve contexto suficiente para planejamento TAROM, garantia de segurança e relatórios operacionais voltados para DIO.",
  "estate.rangeControlForm.requiredHint":
    "\nTítulo, domínio, tipo de registro, site, status do fluxo de trabalho, postura operacional, postura de conformidade e notas são sempre necessários. As regras de ativos, métricas e data prevista são validadas automaticamente.",
  "estate.rangeControlForm.submit": "\nSalvar registro de controle operacional",
  "estate.rangeControlForm.submitAria": "\nSalvar registro de controle operacional",
  "estate.rangeControlForm.summary.constraints": "\n{count} restrito",
  "estate.rangeControlForm.summary.actions": "\n{count} ação necessária",
  "estate.rangeControlForm.empty": "\nNenhum registro de controle operacional capturado ainda.",
  "estate.rangeControlForm.emptySites": "\nNenhum site ativo disponível",
  "estate.rangeControlForm.emptySitesTitle":
    "\nCrie um site antes de capturar registros de controle de alcance e GFE",
  "estate.rangeControlForm.emptySitesDescription":
    "\nOs registros de alcance operacional, segurança, alvo e GFE são anexados diretamente a um local gerenciado e a um ativo opcional no mesmo local.",
  "estate.rangeControlForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "estate.rangeControlForm.tableAria": "\nRegistros de controle de faixa e GFE",
  "estate.rangeControlForm.table.record": "\nRegistro",
  "estate.rangeControlForm.table.domain": "\nDomínio",
  "estate.rangeControlForm.table.site": "\nSite e ativo",
  "estate.rangeControlForm.table.status": "\nStatus",
  "estate.rangeControlForm.table.signal": "\nSinal operacional",
  "estate.rangeControlForm.table.notes": "\nNotas",
  "estate.rangeControlForm.table.assetUnlinked": "\nNenhum ativo vinculado",
  "estate.rangeControlForm.table.updatedAt": "\nAtualizado {date}",
  "estate.rangeControlForm.table.signalRangeAvailability": "\n{value} {unit} disponível",
  "estate.rangeControlForm.table.signalTargetAvailability": "\n{value} {unit} disponível",
  "estate.rangeControlForm.table.signalGfeUtilisation": "\n{value} {unit} utilizado",
  "estate.rangeControlForm.table.signalSafetyDefect": "\nPostura do defeito: {status}",
  "estate.rangeControlForm.table.signalTargetDate": "\nData prevista {date}",
  "estate.rangeControlForm.table.signalNone": "\nNenhum sinal operacional registrado ainda.",
  "estate.rangeControlForm.validation.titleRequired":
    "\nO título de controle operacional é obrigatório.",
  "estate.rangeControlForm.validation.domainRequired":
    "\nEscolha um domínio de controle de intervalo válido.",
  "estate.rangeControlForm.validation.recordTypeRequired":
    "\nEscolha um tipo de registro de controle de intervalo válido.",
  "estate.rangeControlForm.validation.recordTypeDomainMismatch":
    "\nEscolha um tipo de registro que corresponda ao domínio de controle de intervalo selecionado.",
  "estate.rangeControlForm.validation.siteRequired": "\nSelecione um site imobiliário válido.",
  "estate.rangeControlForm.validation.assetRequired":
    "\nOs registros Targetry e GFE exigem um recurso vinculado no mesmo site.",
  "estate.rangeControlForm.validation.assetMismatch":
    "\nOs ativos vinculados devem pertencer ao imóvel selecionado.",
  "estate.rangeControlForm.validation.statusRequired":
    "\nO status do controle operacional é obrigatório.",
  "estate.rangeControlForm.validation.operationalStatusRequired":
    "\nPostura operacional é necessária.",
  "estate.rangeControlForm.validation.complianceStatusRequired":
    "\nA postura de conformidade é necessária.",
  "estate.rangeControlForm.validation.metricValueRequired":
    "Os registros de disponibilidade e utilização exigem um valor medido.",
  "estate.rangeControlForm.validation.metricValueInvalid":
    "\nO valor medido deve ser zero ou maior.",
  "estate.rangeControlForm.validation.metricUnitRequired":
    "\nA unidade métrica é necessária quando um valor medido é registrado.",
  "estate.rangeControlForm.validation.targetDateRequired":
    "\nEste tipo de registro requer uma data prevista.",
  "estate.rangeControlForm.validation.targetDateInvalid":
    "\nA data prevista deve ser um valor de calendário válido.",
  "estate.rangeControlForm.validation.safetyDefectComplianceMismatch":
    "\nDefeitos de segurança não podem ser registrados como conformes.",
  "estate.rangeControlForm.feedback.saved":
    "\nRegistro de controle operacional salvo no espaço de trabalho imobiliário.",
  "estate.rangeControlForm.feedback.saveFailed":
    "\nNão é possível persistir o registro de controle operacional no momento.",
  "estate.rangeControlForm.feedback.updated": "\nRegistro de controle operacional atualizado.",
  "estate.rangeControlForm.feedback.deleted":
    "\nRegistro de controle operacional removido do espaço de trabalho.",
  "estate.rangeControlForm.feedback.deleteFailed":
    "\nNão é possível remover o registro de controle operacional no momento.",
  "estate.rangeControlForm.validation.recordNotFound":
    "\nO registro de controle de intervalo solicitado não foi encontrado.",
  "estate.readiness.assets":
    "\nA postura de ativos e instalações já fornece a linha de base atual do patrimônio.",
  "estate.readiness.delivery":
    "\nOrdens de serviço e documentos operacionais já ancoram a entrega de FM e o monitoramento de contratos.",
  "estate.readiness.programme":
    "\nRegistros de projetos, planejamento financeiro e iniciativas duradouras já podem trazer aprovações para o fluxo do programa.",
  "estate.action.assets":
    "\nInspecione o registro de ativos oficial, a hierarquia, a condição e a postura do ciclo de vida.",
  "estate.action.workOrders":
    "\nPasse diretamente para Hard FM ativo, recuperação e trabalho estatutário que molda a garantia patrimonial.",
  "estate.action.finance":
    "\nLeve a pressão imobiliária para a definição do orçamento, cenários de planejamento e discussões de aprovação.",
  "estate.action.reports":
    "\nAgrupe a postura, a prontidão, o desempenho e as atividades de mitigação em pacotes de relatórios executivos.",
  "estate.action.buildings":
    "\nInspecione as instalações, a postura dos ativos construídos e a prontidão dupla em toda a hierarquia da propriedade.",
  "estate.page.eyebrow": "\nPlano de controle imobiliário",
  "estate.page.readinessRailDescription":
    "\nRastreie o sinal atual do portfólio em termos de disponibilidade de ativos, pressão de entrega ao vivo e bloqueadores de programas antes de encaminhar o trabalho para domínios downstream.",
  "estate.page.readinessRail.assetSignal":
    "\nA disponibilidade de ativos e de faixa continua sendo o principal sinal de prontidão imobiliária e suporte de treinamento.",
  "estate.page.readinessRail.deliverySignal":
    "\nA pressão de entrega captura trabalhos em aberto, inspeções atrasadas e atividades de mitigação que afetam a postura de garantia.",
  "estate.page.readinessRail.programmeSignal":
    "\nOs controles do programa mostram onde as aprovações, os projetos de alto risco e as dependências de financiamento restringem a recuperação operacional.",
  "estate.page.readinessRail.sites":
    "{count} sinais de site restritos requerem mitigação de prontidão e acompanhamento operacional.",
  "estate.page.readinessRail.inspections":
    "\n{count} sinais de inspeção vencidos permanecem ativos em toda a imagem da propriedade.",
  "estate.page.readinessRail.delivery":
    "\n{count} sinais de ordem de serviço violados estão moldando o quadro atual de entrega.",
  "estate.page.performanceTitle": "\nDesempenho de entrega e controle de contrato",
  "estate.page.performanceDescription":
    "\nMonitore o rendimento da execução, a capacidade da força de trabalho, a produtividade e a demanda de melhoria dentro do mesmo plano de controle imobiliário.",
  "estate.page.performanceControlsTitle": "\nAções de melhoria",
  "estate.page.performanceControlsDescription":
    "\n{changes} resultado(s) do contrato permanecem atrasados e continuam a moldar a fila de melhorias ativas.",
  "estate.page.decisionBoardTitle": "\nPlaca de comando de exceção",
  "estate.page.decisionBoardDescription":
    "\nTrabalhe os bloqueadores de prontidão, violações de entrega, aprovações e problemas de dependência que precisam de ação antes do próximo ciclo operacional.",
  "estate.page.decisionBoardBriefTitle": "\nAtenção imediata",
  "estate.page.decisionBoardBriefDescription":
    "\nComece com sites restritos, trabalho violado, dependências instáveis ou aprovações atrasadas antes de direcionar o esforço para relatórios e pacotes.",
  "estate.page.overviewActionsDescription":
    "\nPasse direto da triagem de exceções para os pacotes de relatórios, superfícies administrativas e fluxos de trabalho de planejamento que possuem recuperação de patrimônio.",
  "estate.page.approvalsFocusDescription":
    "\nLidere com aprovações atrasadas, iniciativas de alto risco e pressão de recursos antes de passar para estratégia, iniciativas e controles de projeto.",
  "estate.page.assuranceFocusDescription":
    "\nLidere o risco de ativos, violações de entrega e ações de melhoria abertas antes de aprofundar o registro, a governança de FM e as evidências de administração.",
  "estate.page.partnershipsFocusDescription":
    "\nLidere os conflitos de acordo, a qualidade do serviço e a atenção à integração antes de passar para o contrato detalhado e as superfícies de dependência.",
  "estate.page.commandCard.watchTitle": "\nCapacidades de lista de observação",
  "estate.page.commandCard.watchDescription":
    "\n{total} sinais de capacidade rastreados estão em ação em toda a postura da propriedade.",
  "estate.page.commandCard.constrainedSitesTitle": "\nSites restritos",
  "estate.page.commandCard.constrainedSitesDescription":
    "\n{inspections} sinais de inspeção vencidos estão moldando a imagem da propriedade restrita.",
  "estate.page.commandCard.inspectionsTitle": "\nInspeções atrasadas",
  "estate.page.commandCard.inspectionsDescription":
    "\nInspeções legais e de prontidão claras antes que a dívida de garantia se espalhe por toda a propriedade.",
  "estate.page.commandCard.highRiskTitle": "\nProjetos de alto risco",
  "estate.page.commandCard.highRiskDescription":
    "{conflicts} sinais de conflito de recursos já estão afetando a linha de aprovação e entrega.",
  "estate.page.commandCard.resourceConflictsTitle": "\nConflitos de recursos",
  "estate.page.commandCard.resourceConflictsDescription":
    "\nLeve a pressão de pessoal, financiamento e entrega às superfícies de planejamento antes que os controles falhem.",
  "estate.page.commandCard.deliveryBreachesTitle": "\nOrdens de serviço violadas",
  "estate.page.commandCard.deliveryBreachesDescription":
    "\n{actions} ações de melhoria aberta ainda estão atrás do quadro atual de violação de entrega.",
  "estate.page.commandCard.partnershipConflictsTitle": "\nConflitos de coordenação",
  "estate.page.commandCard.partnershipConflictsDescription":
    "\n{agreements} sinais de acordo ativos ainda precisam de acompanhamento comercial e operacional alinhado.",
  "estate.page.commandCard.cateringTitle": "\nPontuação do serviço de catering",
  "estate.page.commandCard.cateringDescription":
    "\nTrate a qualidade do ESS como uma medida operacional ativa juntamente com acordos, dependências e suporte de construção.",
  "estate.page.commandCard.integrationsDescription":
    "\n{configured} de {total} integrações vinculadas à propriedade estão atualmente configuradas dentro do plano de controle.",
  "estate.page.decisionCard.readinessTitle": "\nBloqueadores de prontidão claros",
  "estate.page.decisionCard.readinessDescription":
    "\nEscale locais restritos, inspeções atrasadas e recursos de lista de observação nos fluxos de trabalho que possuem mitigação.",
  "estate.page.decisionCard.performanceTitle": "\nEstabilizar o desempenho da entrega",
  "estate.page.decisionCard.performanceDescription":
    "\nAja sobre ordens de serviço violadas, pressão trabalhista e ações de melhoria de contrato antes que os recibos de serviço aumentem.",
  "estate.page.decisionCard.dependenciesTitle": "\nRestaurar dependências críticas",
  "estate.page.decisionCard.dependenciesDescription":
    "\nTrate as integrações financeiras, documentais, de compras e ESS como controles operacionais em tempo real, em vez de metadados administrativos.",
  "estate.page.decisionCard.approvalsTitle": "\nDesbloquear decisões do programa",
  "estate.page.decisionCard.approvalsDescription":
    "\nMova as aprovações atrasadas, a pressão financeira e as mudanças de controle antes que elas atrapalhem o trabalho de recuperação e garantia de propriedade.",
  "estate.page.launchpadsTitle": "\nPlataformas de lançamento executivas",
  "estate.page.launchpadsDescription":
    "\nMude da postura de propriedade para relatórios DIO, garantia de FM, supervisão de administração e revisão de dependência de integração sem sair do shell.",
  "estate.page.launchpadsBadge": "\nControles de portfólio",
  "estate.page.launchpadsBriefTitle": "\nResumo do operador",
  "estate.page.launchpadsBriefDescription":
    "\nUse essas plataformas de lançamento quando a conversa de controle precisar passar da postura ao vivo para pacotes de relatórios, evidências de garantia ou suporte a dependências do sistema.",
  "estate.page.launchpadsLane.governanceTitle": "\nGovernança",
  "estate.page.launchpadsLane.governanceHeadline":
    "\nMantenha estratégias, aprovações e decisões de investimento em uma única linha de visão.",
  "estate.page.launchpadsLane.governanceDescription":
    "Mantenha a estratégia imobiliária, os controles do programa e o planejamento financeiro alinhados antes que as decisões saiam do plano de controle.",
  "estate.page.launchpadsLane.assuranceTitle": "\nGarantia",
  "estate.page.launchpadsLane.assuranceHeadline":
    "\nVincule a entrega, administração e sinais de contrato de FM a evidências prontas para auditoria.",
  "estate.page.launchpadsLane.assuranceDescription":
    "\nUse pacotes de governança e administração de FM para resumir questões de conformidade, desempenho e recuperação com contexto operacional compartilhado.",
  "estate.page.launchpadsLane.readinessTitle": "\nProntidão",
  "estate.page.launchpadsLane.readinessHeadline":
    "\nAumente antecipadamente os bloqueadores de alcance, capacidade e infraestrutura.",
  "estate.page.launchpadsLane.readinessDescription":
    "\nTraga sinais de prontidão para relatórios e planejamento antes que as restrições se transformem em falhas de serviço, treinamento ou aprovação.",
  "estate.page.launchpadsLane.externalTitle": "\nDependências",
  "estate.page.launchpadsLane.externalHeadline":
    "\nTrate as integrações corporativas e os sistemas de parceiros como controles operacionais.",
  "estate.page.launchpadsLane.externalDescription":
    "\nRevise as dependências de finanças, documentos, compras e catering como parte do quadro operacional da propriedade, e não como dados administrativos separados.",
  "estate.readiness.actionsTitle": "\nAções de fluxo de trabalho de preparação",
  "estate.readiness.actionsDescription":
    "\nAmplie a postura de prontidão nos fluxos de trabalho conectados que possuem evidências de mitigação, financiamento e garantia.",
  "estate.readiness.action.report": "\nPacote de preparação aberto",
  "estate.readiness.action.workOrders": "\nOrdens de serviço abertas",
  "estate.readiness.action.finance": "\nPlanejamento financeiro aberto",
  "estate.operationalPicture.actionsTitle": "\nAções de imagem operacional",
  "estate.operationalPicture.actionsDescription":
    "\nPasse da imagem de controle integrado para as superfícies detalhadas que possuem evidências de registro, execução de trabalho e relatórios executivos.",
  "estate.operationalPicture.action.report": "\nAbra o pacote operacional",
  "estate.operationalPicture.action.assets": "\nAtivos abertos",
  "estate.operationalPicture.action.workOrders": "\nOrdens de serviço abertas",
  "fleet.title": "\nFrota",
  "fleet.subtitle": "\nPostura do veículo, utilização e pressão de manutenção",
  "fleet.coverage":
    "\nComece com a fatia atual do veículo da plataforma e, em seguida, amplie a profundidade de despacho, conformidade e telemática.",
  "fleet.view.overview": "\nVisão geral",
  "fleet.view.operations": "\nOperações",
  "fleet.view.initiatives": "\nIniciativas",
  "fleet.view.dependencies": "\nDependências",
  "fleet.kpi.vehicles": "\nVeículos",
  "fleet.kpi.vehiclesDesc": "\nAtivos atualmente classificados como frota de veículos",
  "fleet.kpi.telemetry": "\nVeículos apoiados por telemetria",
  "fleet.kpi.telemetryDesc": "\nVeículos já reportando sinais operacionais",
  "fleet.kpi.tasks": "\nAbrir tarefas de frota",
  "fleet.kpi.tasksDesc": "\nPendências de manutenção anexadas aos ativos do veículo",
  "fleet.kpi.operations": "\nControles de frota",
  "fleet.kpi.operationsDesc": "\nRegistros de condição durável, acidente e substituição",
  "fleet.kpi.sites": "\nLocais de frota",
  "fleet.kpi.sitesDesc": "\nSites que hospedam atualmente pelo menos um ativo de veículo",
  "fleet.summary.alertTitle":
    "\nA implementação da frota já pode ser ancorada em dados de operações ao vivo",
  "fleet.summary.alertDescription":
    "Use cobertura de telemetria, trabalho ativo e sinais de IA para preparar a expansão de expedição, conformidade e manutenção sem uma pilha de frota separada.",
  "fleet.summary.tab.coverage": "\nCobertura",
  "fleet.summary.tab.maintenance": "\nPressão de manutenção",
  "fleet.summary.tab.operations": "\nControle de operações",
  "fleet.summary.telemetryTitle": "\nProntidão de telemetria do veículo",
  "fleet.summary.telemetryDescription":
    "\nOs veículos apoiados por telemetria fornecem a base atual para a confiança no despacho e operações de frota conscientes da utilização.",
  "fleet.summary.telemetryConnected": "\nVeículos conectados por telemetria",
  "fleet.summary.telemetryConnectedDesc":
    "\n{total} veículos estão atualmente na fatia ativa da frota.",
  "fleet.summary.telemetryStale": "\nVeículos de telemetria obsoletos",
  "fleet.summary.telemetryStaleDesc":
    "\n{coverage} da frota está atualmente operando com telemetria obsoleta.",
  "fleet.summary.postureTitle": "\nPostura de prontidão",
  "fleet.summary.postureDescription":
    "\nPromova a atualização da telemetria, o contexto do sinal de IA e o acompanhamento das tarefas em conjunto para que a frota se torne um sistema operacional em vez de uma lista de ativos filtrados.",
  "fleet.summary.badgeTelemetry": "\nTelemetria",
  "fleet.summary.badgeStaleness": "\nEstabilidade",
  "fleet.summary.badgeSignals": "\nSinais de IA",
  "fleet.summary.openTasksTitle": "\nAbrir tarefas de manutenção",
  "fleet.summary.openTasksDesc":
    "\nTrabalho em atraso, programado e em andamento atualmente vinculado aos ativos do veículo.",
  "fleet.summary.overdueTasksTitle": "\nTrabalho atrasado",
  "fleet.summary.overdueTasksDesc":
    "\nAs tarefas atrasadas do veículo são o sinal mais claro da pressão do tempo de inatividade devido à manutenção.",
  "fleet.summary.signalsTitle": "\nVeículos apoiados por sinal",
  "fleet.summary.signalsDesc":
    "\nVeículos com previsões de IA ativas podem ser priorizados para envio, substituição ou intervenção.",
  "fleet.summary.operationsTitle": "Registro de controle operacional",
  "fleet.summary.operationsDescription":
    "\nCapture registros de condições duráveis, acidentes, manutenção, utilização e substituição no mesmo espaço de trabalho da frota SSR.",
  "fleet.summary.operationsCountLabel":
    "\n{count} registros operacionais da frota estão no registro atual.",
  "fleet.summary.accidentsTitle": "\nRegistros de acidentes",
  "fleet.summary.accidentsDesc":
    "\nOs incidentes de frota registrados agora persistem como controles operacionais duráveis em vez de notas ad hoc.",
  "fleet.summary.downtimeTitle": "\nTempo de inatividade ou substituição devido",
  "fleet.summary.downtimeDesc":
    "\nRegistros marcados ou com substituição vencida mostram onde a disponibilidade da frota já está limitada.",
  "fleet.summary.replacementTitle": "\nPlanejamento de substituição",
  "fleet.summary.replacementDesc":
    "\nOs planos de substituição agora acompanham a postura da frota em tempo real para que a pressão do ciclo de vida possa ser transferida para finanças e relatórios.",
  "fleet.initiativeForm.title": "\nCrie uma iniciativa de frota",
  "fleet.initiativeForm.description":
    "\nPrepare o próximo envio, manutenção, conformidade ou substituição da frota diretamente da telemetria ao vivo e da postura de trabalho.",
  "fleet.initiativeForm.badge": "\nFluxo de frota durável",
  "fleet.initiativeForm.nameLabel": "\nTítulo da iniciativa",
  "fleet.initiativeForm.namePlaceholder": "\nSprint de redução do tempo de inatividade da van",
  "fleet.initiativeForm.nameHint":
    "Use um título que possa sobreviver em relatórios e transferências de operadores.",
  "fleet.initiativeForm.scopeLabel": "\nEscopo da frota",
  "fleet.initiativeForm.scopePlaceholder":
    "\nVans críticas, depósito oeste ou rotas sensíveis à conformidade",
  "fleet.initiativeForm.scopeHint":
    "\nNomeie o grupo de rotas, classe de veículo, depósito ou fatia de serviço afetada.",
  "fleet.initiativeForm.categoryLabel": "\nCategoria",
  "fleet.initiativeForm.categoryHint":
    "\nClassifique a iniciativa pelo resultado da frota principal.",
  "fleet.initiativeForm.category.DISPATCH": "\nDespacho",
  "fleet.initiativeForm.category.UTILISATION": "\nUtilização",
  "fleet.initiativeForm.category.MAINTENANCE": "\nManutenção",
  "fleet.initiativeForm.category.COMPLIANCE": "\nConformidade",
  "fleet.initiativeForm.category.ENERGY": "\nEnergia",
  "fleet.initiativeForm.category.REPLACEMENT": "\nSubstituição",
  "fleet.initiativeForm.priorityLabel": "\nPrioridade",
  "fleet.initiativeForm.priorityHint": "\nColoque a iniciativa no horizonte operacional atual.",
  "fleet.initiativeForm.priority.NOW": "\nAgora",
  "fleet.initiativeForm.priority.NEXT": "\nPróximo",
  "fleet.initiativeForm.priority.LATER": "\nMais tarde",
  "fleet.initiativeForm.priority.WATCH": "\nAssistir",
  "fleet.initiativeForm.notesLabel": "\nNotas e suposições",
  "fleet.initiativeForm.notesPlaceholder":
    "\nCapture a pressão do tempo de inatividade, preocupações de conformidade, restrições de despacho ou sinais de substituição por trás desta iniciativa.",
  "fleet.initiativeForm.notesHint":
    "\nRegistre o raciocínio que deve sobreviver ao acompanhamento do despacho e manutenção.",
  "fleet.initiativeForm.requiredHint":
    "\nTítulo, escopo da frota, categoria e prioridade são obrigatórios.",
  "fleet.initiativeForm.submit": "\nIniciativa Salvar Frota",
  "fleet.initiativeForm.submitAria": "\nIniciativa Salvar Frota",
  "fleet.initiativeForm.recentTitle": "\nIniciativas recentes de frota",
  "fleet.initiativeForm.recentDescription":
    "\nEssas iniciativas agora persistem como registros de frota duráveis sem sair do espaço de trabalho do SSR.",
  "fleet.initiativeForm.empty": "\nNenhuma iniciativa de frota capturada ainda.",
  "fleet.initiativeForm.emptyCta":
    "\nCrie sua primeira iniciativa de frota para começar a monitorar melhorias operacionais.",
  "fleet.initiativeForm.savedAt": "\nAtualizado {updatedAt}",
  "fleet.initiativeForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "fleet.initiativeForm.validation.titleRequired": "\nO título da iniciativa é obrigatório.",
  "fleet.initiativeForm.validation.scopeRequired": "\nO escopo da frota é obrigatório.",
  "fleet.initiativeForm.validation.categoryRequired": "\nA categoria é obrigatória.",
  "fleet.initiativeForm.validation.priorityRequired": "\nA prioridade é obrigatória.",
  "fleet.initiativeForm.feedback.saved":
    "\nIniciativa de frota salva no espaço de trabalho da frota.",
  "fleet.initiativeForm.feedback.saveFailed":
    "\nIncapaz de persistir a iniciativa da frota neste momento.",
  "fleet.operationsForm.title": "\nCapture um registro de operação de frota",
  "fleet.operationsForm.description":
    "\nRegistre a condição do veículo, acidentes, atividades de manutenção, análises de utilização e planejamento de substituição diretamente do espaço de trabalho da frota ativa.",
  "fleet.operationsForm.badge": "\nControle operacional durável",
  "fleet.operationsForm.nameLabel": "\nTítulo do registro",
  "fleet.operationsForm.namePlaceholder": "\nRevisão de prontidão para substituição do veículo 12",
  "fleet.operationsForm.nameHint":
    "\nUse um título que ainda faça sentido em relatórios, transferências e discussões financeiras.",
  "fleet.operationsForm.assetLabel": "\nAtivo de frota vinculado",
  "fleet.operationsForm.assetPlaceholder": "\nSelecione um ativo de frota",
  "fleet.operationsForm.assetHint":
    "\nVincule o registro ao ativo do veículo que transporta o impacto operacional ou sinal de revisão.",
  "fleet.operationsForm.assetOption": "Recurso: {name} – {siteName}",
  "fleet.operationsForm.recordTypeLabel": "\nTipo de registro",
  "fleet.operationsForm.recordTypeHint":
    "\nEscolha o controle operacional que este registro está adicionando ao cadastro da frota.",
  "fleet.operationsForm.recordType.CONDITION_CHECK": "\nVerificação de condição",
  "fleet.operationsForm.recordType.ACCIDENT_RECORD": "\nRegistro de acidente",
  "fleet.operationsForm.recordType.MAINTENANCE_ACTIVITY": "\nAtividade de manutenção",
  "fleet.operationsForm.recordType.UTILISATION_REVIEW": "\nRevisão de utilização",
  "fleet.operationsForm.recordType.REPLACEMENT_PLAN": "\nPlano de substituição",
  "fleet.operationsForm.statusLabel": "\nStatus do fluxo de trabalho",
  "fleet.operationsForm.statusHint":
    "\nUse o status do fluxo de trabalho para refletir se o controle está ativo, sendo monitorado ou fechado.",
  "fleet.operationsForm.status.DRAFT": "\nRascunho",
  "fleet.operationsForm.status.ACTIVE": "\nAtivo",
  "fleet.operationsForm.status.WATCH": "\nAssistir",
  "fleet.operationsForm.status.CLOSED": "\nAutoridade de aprovação",
  "fleet.operationsForm.conditionStatusLabel": "\nCondição postura",
  "fleet.operationsForm.conditionStatusHint":
    "Registre a condição operacional do ativo de frota vinculado.",
  "fleet.operationsForm.conditionStatus.OPERATIONAL": "\nOperacional",
  "fleet.operationsForm.conditionStatus.WATCH": "\nAssistir",
  "fleet.operationsForm.conditionStatus.DOWN": "\nBaixo",
  "fleet.operationsForm.conditionStatus.REPLACEMENT_DUE": "\nSubstituição vencida",
  "fleet.operationsForm.metricValueLabel": "\nValor medido",
  "fleet.operationsForm.metricValuePlaceholder": "p.ex. 78",
  "fleet.operationsForm.metricValueHint":
    "\nUse isto para pontuações de utilização, contagens de produção ou outros sinais de frota medidos.",
  "fleet.operationsForm.metricUnitLabel": "\nUnidade métrica",
  "fleet.operationsForm.metricUnitPlaceholder": "\nporcentagem, horas ou viagens",
  "fleet.operationsForm.metricUnitHint":
    "\nAdicione uma unidade sempre que um valor medido for registrado para que os relatórios permaneçam interpretáveis.",
  "fleet.operationsForm.incidentDateLabel": "\nData do incidente",
  "fleet.operationsForm.incidentDateHint":
    "\nOs registros de acidentes exigem a data do calendário do incidente.",
  "fleet.operationsForm.targetDateLabel": "\nData prevista",
  "fleet.operationsForm.targetDateHint":
    "\nOs planos de substituição devem incluir a próxima revisão prevista ou data de ação.",
  "fleet.operationsForm.notesLabel": "\nNotas e contexto operacional",
  "fleet.operationsForm.notesPlaceholder":
    "\nCapture o impacto do tempo de inatividade, descobertas de utilização, ações corretivas ou suposições de ciclo de vida por trás desse registro.",
  "fleet.operationsForm.notesHint":
    "\nEssas notas devem sobreviver em relatórios, acompanhamento de manutenção e planejamento de substituição.",
  "fleet.operationsForm.requiredHint":
    "\nTítulo, ativo de frota vinculado, tipo de registro, status do fluxo de trabalho, postura da condição e notas são obrigatórios.",
  "fleet.operationsForm.submit": "\nSalvar registro de operação da frota",
  "fleet.operationsForm.submitAria": "\nSalvar registro de operação da frota",
  "fleet.operationsForm.recentTitle": "\nRegistros recentes de operação de frota",
  "fleet.operationsForm.recentDescription":
    "\nO cadastro de frota agora persiste os registros de controle operacional diretamente no espaço de trabalho SSR.",
  "fleet.operationsForm.empty": "\nNenhum registro de operação de frota capturado ainda.",
  "fleet.operationsForm.emptyCta":
    "\nCapture um registro de operação da frota para começar a construir o registro de controle.",
  "fleet.operationsForm.emptyVehiclesTitle":
    "\nNenhum ativo da frota está pronto para controles operacionais ainda",
  "fleet.operationsForm.emptyVehiclesDescription":
    "\nCrie ou classifique os ativos dos veículos primeiro para que a condição da frota e os registros de substituição possam ser vinculados aos ativos reais.",
  "fleet.operationsForm.savedAt": "\nAtualizado {updatedAt}",
  "fleet.operationsForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "fleet.operationsForm.signal.asset": "\nAtivo",
  "fleet.operationsForm.signal.metric": "\nSinal medido",
  "fleet.operationsForm.signal.incidentDate": "\nData do incidente",
  "fleet.operationsForm.signal.targetDate": "\nData prevista",
  "fleet.operationsForm.validation.titleRequired": "\nO título do registro é obrigatório.",
  "fleet.operationsForm.validation.assetRequired": "\nÉ necessário um ativo de frota vinculado.",
  "fleet.operationsForm.validation.recordTypeRequired": "\nO tipo de registro é obrigatório.",
  "fleet.operationsForm.validation.statusRequired":
    "\nO status do fluxo de trabalho é obrigatório.",
  "fleet.operationsForm.validation.conditionStatusRequired":
    "\nA postura da condição é necessária.",
  "fleet.operationsForm.validation.notesRequired": "\nNotas operacionais são obrigatórias.",
  "fleet.operationsForm.validation.metricValueInvalid":
    "\nO valor medido deve ser um número válido maior ou igual a zero.",
  "fleet.operationsForm.validation.metricValueRequired":
    "\nAs revisões de utilização exigem um valor medido.",
  "fleet.operationsForm.validation.metricUnitRequired":
    "\nA unidade métrica é necessária quando um valor medido é registrado.",
  "fleet.operationsForm.validation.incidentDateInvalid":
    "\nA data do incidente deve ser um valor de calendário válido.",
  "fleet.operationsForm.validation.incidentDateRequired":
    "\nOs registros de acidentes exigem uma data do incidente.",
  "fleet.operationsForm.validation.targetDateInvalid":
    "\nA data prevista deve ser um valor de calendário válido.",
  "fleet.operationsForm.validation.targetDateRequired":
    "\nOs planos de substituição exigem uma data prevista.",
  "fleet.operationsForm.validation.assetNotFound":
    "\nO ativo da frota vinculado não foi encontrado.",
  "fleet.operationsForm.feedback.saved":
    "\nRegistro de operação de frota salvo no espaço de trabalho da frota.",
  "fleet.operationsForm.feedback.saveFailed":
    "Não é possível persistir o registro de operação da frota no momento.",
  "fleet.readiness.vehicles":
    "\nAtivos classificados como veículos já fornecem uma linha de base inicial para a frota.",
  "fleet.readiness.telemetry":
    "\nVeículos apoiados por telemetria podem ancorar implementações de despacho e conformidade.",
  "fleet.readiness.tasks":
    "\nOs fluxos de trabalho de manutenção existentes já realizam trabalho de frota.",
  "fleet.page.eyebrow": "\nCockpit da frota operacional",
  "fleet.page.readinessRailDescription":
    "\nUse este trilho para decidir onde o risco de serviço, a pressão de manutenção e a governança de substituição precisam de atenção antes de passar para fluxos de trabalho de fila, finanças ou relatórios.",
  "fleet.page.readinessRail.vehicleSignal":
    "\nA disponibilidade do veículo e a cobertura de telemetria continuam sendo a base para a garantia da frota.",
  "fleet.page.readinessRail.maintenanceSignal":
    "\nO tempo de inatividade, o acompanhamento de acidentes e as tarefas atrasadas definem a pressão operacional imediata.",
  "fleet.page.readinessRail.replacementSignal":
    "\nCandidatos a substituição e frotas antigas devem passar para o planejamento financeiro antes das janelas de falha de serviço.",
  "fleet.page.commandTitle": "\nPostura de comando da frota",
  "fleet.page.commandDescription":
    "\nCombine a disponibilidade do veículo, o acompanhamento da manutenção, os controles de incidentes e a pressão de substituição em uma imagem de frota voltada para o operador.",
  "fleet.page.launchpadsTitle": "\nPlataformas de lançamento de decisão de frota",
  "fleet.page.launchpadsDescription":
    "\nPasse da telemetria operacional e interrupção de serviço para ações governadas para utilização, manutenção, substituição e relatórios.",
  "fleet.page.launchpadsBadge": "\nFluxo de trabalho empresarial",
  "fleet.page.launchpadsBriefTitle":
    "\nA frota agora se comporta como um portfólio operacional gerenciado",
  "fleet.page.launchpadsBriefDescription":
    "\nO cockpit pode suportar decisões de depósito, rota, conformidade e substituição sem sair do avião de controle da frota.",
  "fleet.page.launchpadsLane.maintenanceTitle": "\nControle de manutenção",
  "fleet.page.launchpadsLane.maintenanceHeadline":
    "\nUse registros duráveis e filas de trabalho ativas para evitar que o tempo de inatividade se transforme em perda de serviço.",
  "fleet.page.launchpadsLane.maintenanceDescription":
    "\nCombine registros de incidentes, postura de condição e trabalho aberto com a fila de manutenção e pacotes de entrega operacional.",
  "fleet.page.launchpadsLane.utilisationTitle": "\nPressão de utilização",
  "fleet.page.launchpadsLane.utilisationHeadline":
    "\nExplique os picos de demanda de veículos com telemetria ao vivo e sinais de pendências de serviço.",
  "fleet.page.launchpadsLane.utilisationDescription":
    "\nDirecione a pressão de utilização para o cockpit de utilização antes que frotas subutilizadas ou sobrecarregadas distorçam o planejamento.",
  "fleet.page.launchpadsLane.replacementTitle": "\nGovernança de substituição",
  "fleet.page.launchpadsLane.replacementHeadline":
    "Promova veículos antigos no planejamento de investimentos enquanto a continuidade do serviço ainda é controlável.",
  "fleet.page.launchpadsLane.replacementDescription":
    "\nUse planos de substituição, padrões de tempo de inatividade e conversas importantes juntos, em vez de linhas de registro isoladas.",
  "fleet.page.launchpadsLane.assuranceTitle": "\nGarantia e relatórios",
  "fleet.page.launchpadsLane.assuranceHeadline":
    "\nPostura do veículo do pacote, backlog e prontidão para operadores, líderes financeiros e análises de governança.",
  "fleet.page.launchpadsLane.assuranceDescription":
    "\nMantenha os pacotes de relatórios e as conversas financeiras alinhadas com os mesmos controles ao vivo usados pela equipe operacional.",
  "fleet.action.utilisation":
    "\nUse a postura de utilização para identificar picos de demanda e capacidade ociosa.",
  "fleet.action.tasks":
    "\nVá diretamente para a fila de trabalho, eliminando o tempo de inatividade do veículo.",
  "fleet.action.reports":
    "\nResuma a postura da frota para operadores e partes interessadas financeiras.",
  "fleet.action.sensors":
    "\nInspecione a cobertura de telemetria ao vivo e dispositivos obsoletos que afetam a confiança da frota.",
  "fleet.action.buildings":
    "\nCoordene o contexto de depósitos, pátios e instalações com a demanda da frota.",
  "fleet.action.addVehicle": "\nRegistrar um novo ativo de veículo na frota.",
  "buildings.title": "\nEdifícios",
  "buildings.subtitle": "\nPostura das instalações, cobertura dupla e área operacional",
  "buildings.coverage":
    "\nCrie gerenciamento de instalações com base em locais atuais, ativos não veiculares, gêmeos digitais e dispositivos conectados.",
  "buildings.view.overview": "\nVisão geral",
  "buildings.view.initiatives": "\nIniciativas",
  "buildings.view.performance": "\nDesempenho",
  "buildings.view.dependencies": "\nDependências",
  "buildings.kpi.facilities": "\nInstalações",
  "buildings.kpi.facilitiesDesc": "\nSites atualmente marcados como instalações",
  "buildings.kpi.assets": "\nAtivos da instalação",
  "buildings.kpi.assetsDesc": "\nAtivos não veiculares atualmente em operação de instalações",
  "buildings.kpi.twins": "\nGêmeos digitais",
  "buildings.kpi.twinsDesc": "\nModelos gêmeos já anexados à propriedade",
  "buildings.kpi.devices": "\nDispositivos conectados",
  "buildings.kpi.devicesDesc": "\nDispositivos IoT já disponíveis para implantação nas instalações",
  "buildings.summary.alertTitle":
    "\nA implementação de instalações já pode ser baseada em dados imobiliários ao vivo",
  "buildings.summary.alertDescription":
    "\nUse perfis de planejamento, gêmeos digitais e dispositivos conectados para preparar a hierarquia de construção e a implementação de operações sem criar uma pilha de instalações paralelas.",
  "buildings.summary.tab.facility": "\nPostura da instalação",
  "buildings.summary.tab.operations": "\nCobertura operacional",
  "buildings.summary.planningTitle": "\nPreparação para planejamento e hierarquia",
  "buildings.summary.planningDescription":
    "\nOs perfis de planejamento do local são a âncora atual para área, capacidade da frota e contexto de horário de operação.",
  "buildings.summary.planningProfiles": "\nPerfis de planejamento",
  "buildings.summary.planningProfilesDesc": "\n{total} instalações estão atualmente no escopo.",
  "buildings.summary.facilityAssets": "\nAtivos da instalação",
  "buildings.summary.facilityAssetsDesc":
    "\nAtivos não veiculares são a camada base atual para sistemas, componentes e implementação em nível de sala.",
  "buildings.summary.postureTitle": "\nPostura de prontidão",
  "buildings.summary.postureDescription":
    "Promova o contexto de planejamento, gêmeos espaciais e dispositivos conectados juntos para que os edifícios se tornem uma hierarquia operacional em vez de uma lista plana de locais.",
  "buildings.summary.badgePlanning": "\nPlanejamento",
  "buildings.summary.badgeTwin": "\nVinculado duplo",
  "buildings.summary.badgeSensors": "\nPronto para sensor",
  "buildings.summary.twinLinkedTitle": "\nInstalações interligadas",
  "buildings.summary.twinLinkedDesc":
    "\nInstalações com pelo menos um gêmeo digital já conectado para fluxos de trabalho espaciais.",
  "buildings.summary.sensorReadyTitle": "\nInstalações prontas para sensores",
  "buildings.summary.sensorReadyDesc":
    "\nInstalações com dispositivos IoT conectados podem oferecer suporte à expansão de telemetria de salas, zonas e sistemas.",
  "buildings.initiativeForm.title": "\nCrie uma iniciativa de instalações",
  "buildings.initiativeForm.description":
    "\nPreparar a próxima implementação de instalações ou pacote de remediação diretamente do planejamento em tempo real, da cobertura dupla e do sensor.",
  "buildings.initiativeForm.badge": "\nFluxo de instalações duráveis",
  "buildings.initiativeForm.nameLabel": "\nTítulo da iniciativa",
  "buildings.initiativeForm.namePlaceholder": "\nRecomissionamento de HVAC para andares ocupados",
  "buildings.initiativeForm.nameHint":
    "\nUse um título que possa ser usado em relatórios e trabalhos de acompanhamento.",
  "buildings.initiativeForm.scopeLabel": "\nEscopo da instalação",
  "buildings.initiativeForm.scopePlaceholder":
    "\nSede norte, campus oeste ou cluster de instalações críticas",
  "buildings.initiativeForm.scopeHint":
    "\nNomeie o grupo de instalações, a área do campus ou a fatia operacional afetada.",
  "buildings.initiativeForm.categoryLabel": "\nCategoria",
  "buildings.initiativeForm.categoryHint":
    "\nClassifique a iniciativa pelo resultado das principais instalações.",
  "buildings.initiativeForm.category.SPACE": "\nEspaço",
  "buildings.initiativeForm.category.SYSTEM": "\nSistema",
  "buildings.initiativeForm.category.ENERGY": "\nEnergia",
  "buildings.initiativeForm.category.COMPLIANCE": "\nConformidade",
  "buildings.initiativeForm.phaseLabel": "\nFase",
  "buildings.initiativeForm.phaseHint":
    "\nColoque a iniciativa no horizonte de implementação atual.",
  "buildings.initiativeForm.phase.NOW": "\nAgora",
  "buildings.initiativeForm.phase.NEXT": "\nPróximo",
  "buildings.initiativeForm.phase.LATER": "\nMais tarde",
  "buildings.initiativeForm.notesLabel": "\nNotas e suposições",
  "buildings.initiativeForm.notesPlaceholder":
    "\nCapture a pressão operacional, o contexto espacial, a necessidade de conformidade ou a meta de energia por trás desta iniciativa.",
  "buildings.initiativeForm.notesHint":
    "\nRegistre o raciocínio que deve sobreviver nas revisões das instalações e nas transferências executivas.",
  "buildings.initiativeForm.requiredHint":
    "\nTítulo, escopo da instalação, categoria e fase são obrigatórios.",
  "buildings.initiativeForm.submit": "\nIniciativa Salvar Instalações",
  "buildings.initiativeForm.submitAria": "\nSalvar iniciativa de construção",
  "buildings.initiativeForm.recentTitle": "\nIniciativas recentes de instalações",
  "buildings.initiativeForm.recentDescription":
    "\nEssas iniciativas agora persistem como registros de instalações duráveis sem sair do espaço de trabalho do SSR.",
  "buildings.initiativeForm.recentCountLabel":
    "\n{count} iniciativas estão moldando o registro de instalações.",
  "buildings.initiativeForm.empty": "\nNenhuma iniciativa de instalações capturada ainda.",
  "buildings.initiativeForm.emptyCta":
    "\nCrie sua primeira iniciativa de instalações para começar a monitorar melhorias em edifícios.",
  "buildings.initiativeForm.savedAt": "\nAtualizado {updatedAt}",
  "buildings.initiativeForm.notesEmpty": "\nNenhuma nota capturada ainda.",
  "buildings.initiativeForm.validation.titleRequired": "\nO título da iniciativa é obrigatório.",
  "buildings.initiativeForm.validation.scopeRequired": "\nO escopo da instalação é obrigatório.",
  "buildings.initiativeForm.validation.categoryRequired": "\nA categoria é obrigatória.",
  "buildings.initiativeForm.validation.phaseRequired": "\nA fase é obrigatória.",
  "buildings.initiativeForm.feedback.saved":
    "\nIniciativa de instalações salva no espaço de trabalho dos edifícios.",
  "buildings.initiativeForm.feedback.saveFailed":
    "\nIncapaz de persistir a iniciativa de instalações neste momento.",
  "buildings.readiness.facilities":
    "\nA postura do local e das instalações já fornece a primeira camada de hierarquia do edifício.",
  "buildings.readiness.twins":
    "A cobertura de gêmeo digital pode ancorar fluxos de trabalho de sala, zona e sistema.",
  "buildings.readiness.devices":
    "\nOs dispositivos anexados podem ser promovidos para visualizações de telemetria de instalações.",
  "buildings.page.eyebrow": "\nPlano de controle de instalações",
  "buildings.page.readinessRailDescription":
    "\nUse este trilho para avaliar a governança das instalações, a cobertura dupla e a prontidão para conformidade antes de passar para relatórios, telemetria ou planejamento de capital.",
  "buildings.page.readinessRail.facilitySignal":
    "\nA hierarquia das instalações e a postura de iniciativa definem a linha de base operacional atual do edifício.",
  "buildings.page.readinessRail.twinSignal":
    "\nInstalações geminadas são a melhor âncora para o contexto da sala, do sistema e da intervenção.",
  "buildings.page.readinessRail.complianceSignal":
    "\nInstalações preparadas para sensores e orientadas para revisão indicam onde as evidências de garantia podem ser confiáveis hoje.",
  "buildings.page.commandTitle": "\nPostura de comando das instalações",
  "buildings.page.commandDescription":
    "\nCombine hierarquia de instalações, ligação dupla, prontidão de telemetria e pressão de ação de melhoria em uma visão de instalações corporativas.",
  "buildings.page.launchpadsTitle": "\nPlataformas de decisão de instalações",
  "buildings.page.launchpadsDescription":
    "\nTraduza a postura do edifício em operações espaciais, garantia de conformidade e conversas importantes sem criar uma pilha de planejamento separada.",
  "buildings.page.launchpadsBadge": "\nFluxo de trabalho empresarial",
  "buildings.page.launchpadsBriefTitle":
    "\nOs edifícios agora são considerados um portfólio de instalações gerenciadas",
  "buildings.page.launchpadsBriefDescription":
    "\nO espaço de trabalho pode apoiar a governança de instalações, o acompanhamento de gêmeos digitais e o escalonamento de capital a partir de uma superfície operacional.",
  "buildings.page.launchpadsLane.governanceTitle": "\nGovernança de instalações",
  "buildings.page.launchpadsLane.governanceHeadline":
    "\nMantenha as iniciativas das instalações vinculadas à hierarquia de imóveis e ao quadro de risco operacional.",
  "buildings.page.launchpadsLane.governanceDescription":
    "\nUse o registro de iniciativa como superfície de controle durável para trabalho de sistema, espaço, energia e conformidade.",
  "buildings.page.launchpadsLane.twinTitle": "\nGêmeo e telemetria",
  "buildings.page.launchpadsLane.twinHeadline":
    "\nPromova instalações interligadas e prontas para sensores em evidências espaciais antes de emitir grandes intervenções.",
  "buildings.page.launchpadsLane.twinDescription":
    "\nVerifique a postura das instalações com as superfícies dos gêmeos digitais e dos sensores, em vez de planejar apenas com notas narrativas.",
  "buildings.page.launchpadsLane.complianceTitle": "\nGarantia de conformidade",
  "buildings.page.launchpadsLane.complianceHeadline":
    "\nUse a postura do edifício para realizar inspeções, evidências legais e relatórios de garantia.",
  "buildings.page.launchpadsLane.complianceDescription":
    "O mesmo plano de controle de instalações agora suporta acompanhamento operacional e relatórios prontos para auditoria.",
  "buildings.page.launchpadsLane.capitalTitle": "\nCoordenação de capital",
  "buildings.page.launchpadsLane.capitalHeadline":
    "\nAumente o risco de construção, a pressão de melhoria e o trabalho do ciclo de vida em pacotes financeiros e de programas mais cedo.",
  "buildings.page.launchpadsLane.capitalDescription":
    "\nPasse da postura de instalações para pacotes de prontidão, governança de FM e operações imobiliárias sem reconstruir a história dos dados.",
  "buildings.action.twin":
    "\nAbra a superfície gêmea digital existente para contexto de operações espaciais.",
  "buildings.action.assets":
    "\nInspecione a propriedade não veicular que dá suporte às operações do edifício.",
  "buildings.action.reports":
    "\nDesempenho das instalações do pacote para conformidade e revisão executiva.",
  "buildings.action.sensors":
    "\nRastreie problemas de construção em telemetria ao vivo e cobertura de dispositivos.",
  "buildings.action.fleet":
    "\nCoordene ativos móveis, depósitos e logística de campo com edifícios.",
  "buildings.action.add": "Registar um novo edifício ou instalação.",
  "sensors.title": "\nSensores",
  "sensors.subtitle": "\nCobertura de telemetria, postura do dispositivo e prontidão do sinal",
  "sensors.coverage": "Cobertura de telemetria de ativos",
  "sensors.view.overview": "\nVisão geral",
  "sensors.view.alertRules": "\nRegras de alerta",
  "sensors.view.quality": "\nQualidade",
  "sensors.view.dependencies": "\nDependências",
  "sensors.kpi.devices": "\nDispositivos registrados",
  "sensors.kpi.devicesDesc": "\nDispositivos atualmente registrados no plano de controle",
  "sensors.kpi.telemetry": "\nPontos de telemetria",
  "sensors.kpi.telemetryDesc": "\nAmostras brutas de telemetria já armazenadas",
  "sensors.kpi.coverage": "\nAtivos com telemetria",
  "sensors.kpi.coverageDesc": "\nAtivos distintos já recebendo telemetria",
  "sensors.kpi.unseen": "\nDispositivos nunca vistos",
  "sensors.kpi.unseenDesc": "\nDispositivos registrados que ainda não reportaram",
  "sensors.summary.alertTitle": "\nA semântica do sensor está pronta para ser operacionalizada",
  "sensors.summary.alertDescription":
    "\nRastreie a conclusão dos metadados do dispositivo e a marcação de telemetria semântica antes de expandir para adaptadores de protocolo e alertas.",
  "sensors.summary.tab.device": "\nPostura do dispositivo",
  "sensors.summary.tab.semantic": "\nTelemetria semântica",
  "sensors.summary.metadataTitle": "\nProntidão de metadados do dispositivo",
  "sensors.summary.metadataDescription":
    "\nConte dispositivos com detalhes de identificação suficientes para dar suporte aos fluxos de trabalho de operações, calibração e comissionamento.",
  "sensors.summary.metadataReady": "\nDispositivos prontos para metadados",
  "sensors.summary.metadataReadyDesc":
    "\n{count} total de dispositivos registrados no plano de controle.",
  "sensors.summary.commissioned": "\nDispositivos comissionados",
  "sensors.summary.commissionedDesc":
    "\n{coverage} dos dispositivos registrados incluem uma data de comissionamento.",
  "sensors.summary.postureTitle": "\nPostura de prontidão",
  "sensors.summary.postureDescription":
    "\nPromova dados de fornecedor, modelo, firmware, local de instalação e comissionamento antes de tratar o registro como um inventário de sensor durável.",
  "sensors.summary.badgeMetadata": "\nMetadados",
  "sensors.summary.badgeInstall": "Instalar contexto",
  "sensors.summary.badgeCommissioning": "\nComissionamento",
  "sensors.summary.seriesKeyTitle": "\nChaves de série",
  "sensors.summary.seriesKeyDesc": "\n{total} amostras de telemetria armazenadas atualmente.",
  "sensors.summary.unitTitle": "\nUnidades anexadas",
  "sensors.summary.unitDesc":
    "\nAs unidades são o contrato semântico mínimo para telemetria comparável.",
  "sensors.summary.qualityTitle": "\nQualidade marcada",
  "sensors.summary.qualityDesc":
    "\nOs sinalizadores de qualidade permitem que os fluxos de trabalho downstream distingam dados confiáveis e estimados.",
  "sensors.alertRuleForm.title": "\nCrie uma regra de alerta",
  "sensors.alertRuleForm.description":
    "\nCrie alertas baseados em limites diretamente da prontidão de telemetria ao vivo dentro do fluxo durável do plano de controle do sensor.",
  "sensors.alertRuleForm.badge": "\nRegra durável",
  "sensors.alertRuleForm.nameLabel": "\nTítulo da regra",
  "sensors.alertRuleForm.namePlaceholder": "\nAlto CO2 em salas ocupadas",
  "sensors.alertRuleForm.nameHint":
    "\nUse um título que os operadores podem reutilizar em relatórios e na construção de acompanhamento.",
  "sensors.alertRuleForm.seriesKeyLabel": "\nChave de série",
  "sensors.alertRuleForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertRuleForm.seriesKeyHint":
    "\nCombine a chave de telemetria semântica que deve ser avaliada.",
  "sensors.alertRuleForm.comparatorLabel": "\nComparador",
  "sensors.alertRuleForm.comparatorHint":
    "\nEscolha como a leitura ao vivo deve ser comparada com o limite.",
  "sensors.alertRuleForm.comparator.GT": "Maior",
  "sensors.alertRuleForm.comparator.LT": "Menor",
  "sensors.alertRuleForm.comparator.EQ": "Igual",
  "sensors.alertRuleForm.thresholdLabel": "\nLimite",
  "sensors.alertRuleForm.thresholdPlaceholder": "1200 (ex.)",
  "sensors.alertRuleForm.thresholdHint": "\nUse o limite numérico que deve acionar a regra.",
  "sensors.alertRuleForm.severityLabel": "\nGravidade",
  "sensors.alertRuleForm.severityHint": "\nDefina a urgência visível do operador para a regra.",
  "sensors.alertRuleForm.severity.INFO": "\nInformações",
  "sensors.alertRuleForm.severity.WARNING": "\nAviso",
  "sensors.alertRuleForm.severity.CRITICAL": "\nCrítico",
  "sensors.alertRuleForm.requiredHint":
    "\nTítulo, chave da série, comparador, limite e gravidade são obrigatórios.",
  "sensors.alertRuleForm.submit": "\nSalvar regra de alerta",
  "sensors.alertRuleForm.submitAria": "\nSalvar regra de alerta do sensor",
  "sensors.alertRules.feedback.saved":
    "\nRegra de alerta de sensor salva no espaço de trabalho de sensores.",
  "sensors.alertForm.title": "\nCrie uma regra de alerta",
  "sensors.alertForm.description":
    "\nCrie alertas baseados em limites diretamente da prontidão de telemetria ao vivo dentro do fluxo de trabalho durável do plano de controle do sensor.",
  "sensors.alertForm.badge": "\nRegra durável",
  "sensors.alertForm.nameLabel": "\nTítulo da regra",
  "sensors.alertForm.namePlaceholder": "\nAlto CO2 em salas ocupadas",
  "sensors.alertForm.nameHint":
    "\nUse um título que os operadores podem reutilizar em relatórios e na construção de acompanhamento.",
  "sensors.alertForm.seriesKeyLabel": "\nChave de série",
  "sensors.alertForm.seriesKeyPlaceholder": "\niaq.co2",
  "sensors.alertForm.seriesKeyHint":
    "\nCombine a chave de telemetria semântica que deve ser avaliada.",
  "sensors.alertForm.comparatorLabel": "\nComparador",
  "sensors.alertForm.comparatorHint":
    "\nEscolha como a leitura ao vivo deve ser comparada com o limite.",
  "sensors.alertForm.comparator.GT": "Maior",
  "sensors.alertForm.comparator.LT": "Menor",
  "sensors.alertForm.comparator.EQ": "Igual",
  "sensors.alertForm.thresholdLabel": "\nLimite",
  "sensors.alertForm.thresholdPlaceholder": "1200 (ex.)",
  "sensors.alertForm.thresholdHint": "\nUse o limite numérico que deve acionar a regra.",
  "sensors.alertForm.severityLabel": "\nGravidade",
  "sensors.alertForm.severityHint": "\nDefina a urgência visível do operador para a regra.",
  "sensors.alertForm.severity.INFO": "\nInformações",
  "sensors.alertForm.severity.WARNING": "\nAviso",
  "sensors.alertForm.severity.CRITICAL": "\nCrítico",
  "sensors.alertForm.requiredHint":
    "\nTítulo, chave da série, comparador, limite e gravidade são obrigatórios.",
  "sensors.alertForm.submit": "\nSalvar regra de alerta",
  "sensors.alertForm.submitAria": "\nSalvar regra de alerta do sensor",
  "sensors.alertForm.recentTitle": "\nRegras de alerta recentes",
  "sensors.alertForm.recentDescription":
    "\nAs regras de alerta agora persistem diretamente no modelo de plano de controle do sensor durável.",
  "sensors.alertForm.empty": "\nNenhuma regra de alerta de sensor capturada ainda.",
  "sensors.alertForm.emptyCta":
    "\nCrie sua primeira regra de alerta para começar a monitorar a telemetria do sensor.",
  "sensors.alertForm.savedAt": "\nAtualizado {updatedAt}",
  "sensors.alertForm.validation.titleRequired": "\nO título da regra de alerta é obrigatório.",
  "sensors.alertForm.validation.seriesKeyRequired": "\nA chave da série é obrigatória.",
  "sensors.alertForm.validation.comparatorRequired": "\nO comparador é obrigatório.",
  "sensors.alertForm.validation.thresholdRequired": "\nO limite deve ser numérico.",
  "sensors.alertForm.validation.severityRequired": "\nA gravidade é necessária.",
  "sensors.alertForm.feedback.saved":
    "\nRegra de alerta de sensor salva no espaço de trabalho de sensores.",
  "sensors.alertForm.feedback.saveFailed":
    "\nNão é possível persistir a regra de alerta do sensor no momento.",
  "sensors.alertRules.title": "\nRegras de alerta duráveis",
  "sensors.alertRules.description":
    "\nAs regras promovidas persistem no modelo do plano de controle do sensor e podem propagar o trabalho de execução downstream.",
  "sensors.alertRules.empty": "\nNenhuma regra de alerta de sensor durável foi criada ainda.",
  "sensors.alertRules.promote": "\nPromover para regra",
  "sensors.alertRules.column.title": "\nRegra",
  "sensors.alertRules.column.seriesKey": "\nChave de série",
  "sensors.alertRules.column.threshold": "\nLimite",
  "sensors.alertRules.column.severity": "\nGravidade",
  "sensors.alertRules.column.updatedAt": "\nAtualizado",
  "sensors.alertRules.badge.enabled": "\nAtivado",
  "sensors.alertRules.badge.disabled": "\nDesativado",
  "sensors.alertRules.validation.titleRequired":
    "\nO título da regra de alerta durável é obrigatório.",
  "sensors.alertRules.validation.seriesKeyRequired":
    "\nA chave da série de regras de alerta duráveis é obrigatória.",
  "sensors.alertRules.validation.thresholdRequired":
    "\nO limite da regra de alerta durável deve ser numérico.",
  "sensors.alertRules.feedback.saveFailed":
    "Não é possível persistir a regra de alerta do sensor durável no momento.",
  "sensors.readiness.devices":
    "\nO registro do dispositivo atual já oferece suporte a uma linha de base do plano de controle.",
  "sensors.readiness.telemetry":
    "\nAmostras de telemetria ao vivo podem ser normalizadas em modelos de série semântica.",
  "sensors.readiness.coverage":
    "\nA telemetria vinculada a ativos já fornece cobertura operacional inicial.",
  "sensors.page.eyebrow": "\nPlano de controle de telemetria",
  "sensors.page.readinessRailDescription":
    "\nUse este trilho para avaliar a integridade dos metadados, a integridade do comissionamento e a qualidade do sinal antes de promover a telemetria em alertas, relatórios ou decisões operacionais downstream.",
  "sensors.page.readinessRail.metadataSignal":
    "\nA integridade dos metadados é a base para propriedade e roteamento confiáveis de dispositivos.",
  "sensors.page.readinessRail.commissioningSignal":
    "\nA postura de comissionamento determina se as leituras ao vivo podem apoiar o escalonamento operacional.",
  "sensors.page.readinessRail.qualitySignal":
    "\nA telemetria com etiqueta de qualidade é o controle que separa sinais confiáveis de feeds ruidosos.",
  "sensors.page.commandTitle": "\nPostura de comando de telemetria",
  "sensors.page.commandDescription":
    "\nCombine prontidão de metadados, cobertura de comissionamento, profundidade de série semântica e marcação de qualidade em uma imagem de telemetria voltada para o operador.",
  "sensors.page.launchpadsTitle": "\nPlataformas de lançamento de decisão de telemetria",
  "sensors.page.launchpadsDescription":
    "\nPromova a postura do dispositivo e a qualidade do sinal em alertas, análises e relatórios empresariais sem fragmentar o contrato de telemetria.",
  "sensors.page.launchpadsBadge": "\nFluxo de trabalho empresarial",
  "sensors.page.launchpadsBriefTitle":
    "\nOs sensores agora se comportam como uma propriedade de telemetria governada",
  "sensors.page.launchpadsBriefDescription":
    "\nO espaço de trabalho pode suportar governança semântica, promoção de regras e escalonamento operacional downstream de um plano de controle.",
  "sensors.page.launchpadsLane.metadataTitle": "\nGovernança de metadados",
  "sensors.page.launchpadsLane.metadataHeadline":
    "\nPadronize a propriedade do dispositivo, as chaves de série e o significado semântico antes de dimensionar alertas ou análises.",
  "sensors.page.launchpadsLane.metadataDescription":
    "\nUse a postura do dispositivo e dos metadados como porta de qualidade para cada consumidor operacional downstream.",
  "sensors.page.launchpadsLane.alertingTitle": "\nGarantia de alerta",
  "sensors.page.launchpadsLane.alertingHeadline":
    "\nPromova séries confiáveis em regras duráveis sobre as quais os operadores possam agir em edifícios e frotas.",
  "sensors.page.launchpadsLane.alertingDescription":
    "\nAs regras de alerta devem refletir a telemetria governada, e não limites únicos desconectados do plano de controle.",
  "sensors.page.launchpadsLane.analyticsTitle": "\nAnálise operacional",
  "sensors.page.launchpadsLane.analyticsHeadline":
    "Transforme a telemetria semântica em evidência de utilização, prontidão e decisão estratégica.",
  "sensors.page.launchpadsLane.analyticsDescription":
    "\nUse a qualidade da série e a postura limite para fortalecer a análise preditiva e operacional.",
  "sensors.page.launchpadsLane.escalationTitle": "\nEscalação e relatórios",
  "sensors.page.launchpadsLane.escalationHeadline":
    "\nPasse dos problemas do dispositivo para os fluxos de trabalho de preparação e pacote de relatórios antes que a confiança entre as equipes diminua.",
  "sensors.page.launchpadsLane.escalationDescription":
    "\nMantenha relatórios, ordens de serviço e pacotes de decisões operacionais alinhados com o mesmo contrato de telemetria.",
  "sensors.action.utilisation":
    "\nUse a qualidade da telemetria para explicar a confiança e as lacunas de utilização.",
  "sensors.action.twin":
    "\nSobreponha a postura do dispositivo no gêmeo espacial e no contexto do ponto de acesso.",
  "sensors.action.reports":
    "\nExporte a integridade do dispositivo e a cobertura do sinal para pacotes de relatórios.",
  "sensors.action.buildings":
    "\nAcompanhe os problemas da sala e das instalações até a integridade do sensor.",
  "sensors.action.fleet":
    "\nConecte os pontos cegos de telemetria do veículo ao espaço de trabalho da frota.",
  "sensors.action.add": "Registar um novo sensor ou dispositivo.",
  "common.liveSummary": "\nResumo ao vivo",
  "common.domainCoverage": "\nCobertura de domínio",
  "common.nextActions": "\nPróximas ações",
  "common.readinessSummary": "\nProntidão de implementação atual",
  "common.connectedWorkflows": "\nFluxos de trabalho conectados",
  "common.connectedWorkflowsHint":
    "\nVincule este domínio às operações, finanças e relatórios sem sair do shell.",
  "common.workflowOps": "\nAcompanhamento operacional",
  "common.workflowOpsHint":
    "\nUse superfícies de tarefa, utilização e execução de campo para atuar no sinal ao vivo.",
  "common.workflowFinance": "\nAlinhamento financeiro",
  "common.workflowFinanceHint":
    "\nLeve riscos, demandas e aprovações em orçamentos, cenários e fluxo de documentos.",
  "common.workflowReporting": "\nEmbalagem das partes interessadas",
  "common.workflowReportingHint":
    "\nResuma o estado ativo em pacotes de relatórios quando o conjunto de trabalho estiver estável.",
  "common.workspaceGuide": "\nGuia do espaço de trabalho",
  "common.now": "\nAgora",
  "common.next": "\nPróximo",
  "common.later": "\nMais tarde",
  "common.autoRefreshMinute": "\nAtualização automática a cada minuto",
  "common.guideAlertTitle": "\nCaminho de implementação pronto para o operador",
  "common.guideAlertDescription":
    "\nUse o resumo ao vivo primeiro e depois passe para os sistemas conectados antes de empacotar o resultado.",
  "common.timelineNowTitle": "\nLeia a postura ao vivo",
  "common.timelineNowDescription":
    "\nComece pelo resumo de atualização automática e verifique o que já está coberto no patrimônio atual.",
  "common.timelineNextTitle": "\nAtuar em fluxos de trabalho conectados",
  "common.timelineNextDescription":
    "\nPasse para tarefas, finanças, frota, edifícios, sensores ou relatórios com base na superfície de pressão que você precisa resolver.",
  "common.timelineLaterTitle": "\nPromova um trabalho de programa durável",
  "common.timelineLaterDescription":
    "Quando o caminho ativo estiver estável, reforce-o em aprovações, hierarquia, semântica e relatórios executivos.",
  "common.workflowHint":
    "\nMova-se para as superfícies ativas conectadas que já suportam esta expansão.",
  "common.strategicWorkspace.chatContext":
    "\n{title} espaço de trabalho. {subtitle} Conectado ao shell de operações renderizado pelo servidor atual, limite de autenticação compartilhado e modelo parcial HTMX.",
  "iot.assetRequired": "\nO contexto do ativo é necessário para ingestão de telemetria.",
  "iot.metricRequired": "\nÉ necessária uma métrica de telemetria ou chave de série.",
  "finance.action.assets": "\nInspecione a fatia atual do portfólio antes de realocar o capital.",
  "finance.action.planning":
    "\nPasse da exposição à depreciação para cenários de planejamento e aprovações.",
  "finance.action.purchaseOrders":
    "\nRevise os compromissos do pedido de compra e o acompanhamento do fornecedor que afetam a postura financeira.",
  "finance.action.reports": "\nEmpacote o estado visível do portfólio em um relatório executivo.",
  "finance.workspace.title": "\nCentro de comando de depreciação",
  "finance.workspace.description":
    "\nAcompanhe o desvio de avaliação, o risco de concentração e a exposição à depreciação em tempo real em todo o portfólio.",
  "finance.relatedLinks.title": "\nRelacionado",
  "finance.relatedLinks.description":
    "\nAcesse o registro de ativos ou os espaços de trabalho de documentos para coordenar o acompanhamento financeiro.",
  "finance.cockpit.filters.eyebrow": "\nFiltros",
  "finance.cockpit.filters.title": "\nEscopo do cockpit",
  "finance.cockpit.filters.description":
    "\nFiltre o cockpit financeiro por site, período fiscal e densidade da tabela antes de exportar a fatia atual.",
  "finance.cockpit.filters.exportDescription":
    "\nExporte o portfólio de depreciação atualmente filtrado como CSV ou PDF.",
  "finance.cockpit.actions.eyebrow": "\nFluxos de trabalho conectados",
  "finance.cockpit.actions.title": "\nPasse da avaliação para a ação",
  "finance.cockpit.actions.description":
    "\nVá diretamente para os sistemas operacionais que explicam ou resolvem a variação do portfólio.",
  "finance.cockpit.hero.eyebrow": "\nCockpit financeiro",
  "finance.cockpit.hero.title":
    "\nExposição ajustada por IA, pressão na fila e concentração em um espaço de trabalho",
  "finance.cockpit.hero.description":
    "\nUm cockpit financeiro renderizado por servidor para revisar desvios de avaliação, concentração de locais, pressão de tarefas e fluxo de aquisição ou descarte lado a lado.",
  "finance.cockpit.hero.live": "\nAtualização automática a cada {seconds} segundos",
  "finance.cockpit.chat.pageContext":
    "Página do cockpit financeiro. Espaço de trabalho unificado para exposição ajustada por IA, concentração de locais, pendências de manutenção, aprovações de documentos e variação de portfólio. Controles: filtro do site, período fiscal, tamanho da página, exportação de CSV, exportação de PDF. Seções primárias: briefing do portfólio de IA, cobertura do conjunto de dados, faixa de KPI, placar do site, fila de ações, cartões de concentração e tabela de portfólio.",
  "finance.cockpit.action.disposalReview": "\nAnalisar descarte",
  "finance.cockpit.action.immediateIntervention": "\nIntervenção imediata",
  "finance.cockpit.action.replacementPlan": "\nPlanejar substituição",
  "finance.cockpit.action.procurementReview": "\nAnalisar aquisição",
  "finance.cockpit.action.workOrderFollowUp": "\nAcompanhar ordem de serviço",
  "finance.cockpit.action.invoiceFollowUp": "\nFatura de acompanhamento",
  "finance.cockpit.action.purchaseOrderFollowUp": "\nAcompanhar pedido de compra",
  "finance.cockpit.action.customerOrderFollowUp": "\nAcompanhar pedido do cliente",
  "finance.cockpit.action.monitor": "\nMonitorar a exposição",
  "finance.cockpit.briefing.eyebrow": "\nResumo do portfólio",
  "finance.cockpit.briefing.title": "\nResumo financeiro",
  "finance.cockpit.briefing.summary":
    "\nPara {site} acima de {period}, a exposição ajustada por IA é de {adjustedExposure} com um delta de avaliação de {delta}. {signalCount} ativos garantidos por sinal e {openTasks} tarefas abertas estão moldando a pressão financeira atual.",
  "finance.cockpit.briefing.recommendationTitle": "\nPróximo movimento recomendado",
  "finance.cockpit.briefing.recommendationPortfolio":
    "\nNenhum ativo está dominando a fila. Revise a concentração e abra o fluxo de documentos em {site} antes de realocar o capital.",
  "finance.cockpit.briefing.recommendationAsset":
    '\nPriorize {asset} em seguida e mova-o para "{action}" para que o risco de avaliação e o arrasto operacional não se agravem.',
  "finance.cockpit.generatedAt": "\nGerado {date}",
  "finance.cockpit.datasets.title": "\nCobertura do conjunto de dados",
  "finance.cockpit.datasets.description":
    "\nO cockpit combina avaliação, risco de IA, carga de trabalho de manutenção e fluxo de documentos transacionais em uma superfície de decisão financeira.",
  "finance.cockpit.datasets.assetsTitle": "\nAtivos no escopo",
  "finance.cockpit.datasets.assetsDescription":
    "\nAtivos que atualmente contribuem para a carteira financeira filtrada.",
  "finance.cockpit.datasets.signalsTitle": "\nSinais apoiados por IA",
  "finance.cockpit.datasets.signalsDescription":
    "\n{critical} sinais críticos/emergenciais e {warning} de alerta estão influenciando a avaliação.",
  "finance.cockpit.datasets.tasksTitle": "\nAbrir itens de trabalho",
  "finance.cockpit.datasets.tasksDescription":
    "\n{overdue} tarefas atrasadas estão aumentando a pressão financeira no curto prazo.",
  "finance.cockpit.datasets.documentsTitle": "\nAbrir fluxo de documentos",
  "finance.cockpit.datasets.documentsDescription":
    "\n{workOrders} ordens de serviço, ordens de compra {purchaseOrders} e faturas {invoices} ainda estão ativas.",
  "finance.cockpit.kpi.adjustedExposure": "\nTaxa de ajuste de IA {rate}",
  "finance.cockpit.kpi.deltaTitle": "\nDelta de avaliação",
  "finance.cockpit.kpi.deltaDescription":
    "\nDiferença entre a exposição à depreciação padrão e a avaliação ajustada por IA.",
  "finance.cockpit.kpi.highRiskDescription":
    "\n{count} ativos atualmente apresentam o maior risco financeiro e operacional.",
  "finance.cockpit.kpi.confidenceTitle": "Confiança média",
  "finance.cockpit.kpi.confidenceDescription":
    "\n{due} ativos já estão dentro da janela de previsão de vencimento em breve.",
  "finance.cockpit.condition.description":
    "\nO mix de exposição por condição de ativo ajuda a revelar se o risco de capital está se agrupando em torno de ativos degradados.",
  "finance.cockpit.type.description":
    "\nVeja quais tipos de ativos representam a maior parcela da exposição financeira atual.",
  "finance.cockpit.lifecycle.title": "\nMistura de ciclo de vida",
  "finance.cockpit.lifecycle.description":
    "\nA distribuição do ciclo de vida mostra quanto do portfólio atual está em estados ativos, de monitoramento, fatigantes ou descartados.",
  "finance.cockpit.lifecycle.share": "\n{share} de exposição visível",
  "finance.cockpit.lifecycle.assets": "\nAtivos",
  "finance.cockpit.site.title": "\nConcentração do local",
  "finance.cockpit.site.description":
    "\nCompare a exposição ajustada no nível do site, ativos de alto risco, tarefas ativas e fluxo de documentos abertos.",
  "finance.cockpit.site.share": "\n{share} de exposição visível",
  "finance.cockpit.site.risk": "\nAlto risco",
  "finance.cockpit.site.tasks": "\nAbrir tarefas",
  "finance.cockpit.site.queue": "\nFila pendente",
  "finance.cockpit.queue.title": "\nFila de ações",
  "finance.cockpit.queue.description":
    "\nAtivos classificados por variação de avaliação, gravidade do risco e trabalho posterior ou pressão documental.",
  "finance.cockpit.queue.summary": "\n{tasks} tarefas ativas • {documents} documentos abertos",
  "finance.cockpit.opportunity.purchaseOrdersTitle": "\nExposição do pedido de compra",
  "finance.cockpit.opportunity.purchaseOrdersDescription":
    "\n{count} pedidos de compra ainda estão abertos contra ativos expostos financeiramente.",
  "finance.cockpit.opportunity.invoicesTitle": "\nExposição de coleções",
  "finance.cockpit.opportunity.invoicesDescription":
    "\n{count} faturas ainda carregam pressão de cobrança em aberto na carteira.",
  "finance.cockpit.opportunity.tasksTitle": "\nTrabalho atrasado",
  "finance.cockpit.opportunity.tasksDescription":
    "\nTarefas de manutenção atrasadas estão amplificando o arrasto na avaliação e o risco operacional.",
  "finance.cockpit.opportunity.dueSoonTitle": "\nEm breve sinaliza",
  "finance.cockpit.opportunity.dueSoonDescription":
    "\nJanelas de previsão que estão próximas da intervenção e que provavelmente afetarão o planejamento de capital.",
  "finance.overview.documentSummary": "\nAbrir fluxo de documentos",
  "finance.overview.documentSummaryDescription":
    "\n{workOrders} ordens de serviço, ordens de compra {purchaseOrders} e faturas {invoices} estão abertas no momento.",
  "finance.cockpit.table.title": "\nCarteira financeira",
  "finance.cockpit.table.description":
    "\nVisualização de portfólio classificável combinando valor padrão, valor ajustado por IA, confiança e pressão na fila.",
  "finance.cockpit.table.live": "\nMesa ao vivo",
  "finance.cockpit.table.asset": "\nAtivo",
  "finance.cockpit.table.signal": "\nSinal",
  "finance.cockpit.table.aiAdjusted": "\nAjustado por IA",
  "finance.cockpit.table.delta": "\nDelta",
  "finance.cockpit.table.confidence": "\nConfiança",
  "finance.cockpit.table.queue": "\nFila",
  "finance.cockpit.table.remainingLifeNone":
    "\nNenhuma previsão de vida útil restante está anexada a este ativo.",
  "finance.cockpit.table.remainingLifeValue": "\n{days} dias restantes de vida",
  "finance.cockpit.table.activeTasksValue": "\n{count} tarefas ativas",
  "finance.cockpit.table.overdueTasksValue": "\n{count} atrasado",
  "finance.cockpit.pdf.title": "\nRelatório do cockpit financeiro",
  "finance.cockpit.pdf.subject":
    "\nExposição à depreciação ajustada por IA e variação do portfólio",
  "finance.cockpit.pdf.scope": "\nEscopo: {site} • {period}",
  "finance.cockpit.pdf.summary.adjustedExposure": "\nExposição ajustada: {value}",
  "finance.cockpit.pdf.summary.delta": "\nDelta de avaliação: {value} ({percent})",
  "finance.cockpit.pdf.summary.risk": "\nExposição de alto risco: {value} em {count} ativos",
  "finance.cockpit.pdf.summary.queue":
    "\nTarefas abertas: {tasks} • Documentos abertos: {documents}",
  "reports.title": "\nRelatórios",
  "reports.subtitle": "Relatórios de ativos, resumos de depreciação e exportação MOD",
  "reports.category.financial": "\nFinanceiro",
  "reports.category.financialDesc":
    "\nRelatórios de depreciação, avaliações e exposição financeira",
  "reports.category.operations": "\nAtivos e Operações",
  "reports.category.operationsDesc": "\nInventário de ativos, previsões e análises de utilização",
  "reports.category.executive": "\nExecutivo",
  "reports.category.executiveDesc": "\nPainéis executivos e indicadores-chave de desempenho",
  "reports.workspace.chat.categoryLine": "\n{label}: {count} conjuntos de dados",
  "reports.workspace.chat.noAiBrief": "\nNenhum briefing de IA ativo foi carregado.",
  "reports.workspace.chat.aiBriefActive":
    "\nBriefing ativo: {title}. Público {audience}. Foco {focusLabel}. Cobertura {coverageScore} por cento.",
  "reports.workspace.chat.journeyStep": "{title} ({statusPart}) → {targetLabel}",
  "reports.workspace.chat.stepStatusRecommended": "\n{status}, recomendado",
  "reports.workspace.chat.priorityDataset":
    "\nConjunto de dados de detalhamento prioritário: {title}. Saúde {health}.",
  "reports.workspace.chat.noPinnedSources":
    "\nNenhuma ação de origem relacionada está fixada no momento.",
  "reports.workspace.chat.pinnedSourcesPrefix": "\nAções de origem relacionadas:",
  "reports.workspace.chat.sourceLink": "{label} → {supporting}",
  "reports.workspace.chat.generalCoverage": "\ncobertura geral",
  "reports.workspace.chat.mission": "\nPróximo movimento recomendado: {title}. Alvo {targetLabel}.",
  "reports.workspace.chat.builder": "\nPúblico {audience}. Foco {focus}. Seções {sections}.",
  "reports.workspace.chat.pageIntro": "\nEspaço de trabalho de relatórios.",
  "reports.workspace.chat.workflowInventory":
    "\nA página inclui um navegador de fluxo de trabalho, um centro de comando de conjunto de dados, uma barra de comando de IA, um construtor de relatórios, uma barra de modelo, um hub de dados de origem, um painel de detalhamento e cronologia de relatório salva.",
  "reports.workspace.chat.body":
    "{intro} Categorias: {categorySummary}. Conjuntos de dados: {datasetSummary}. {prioritySummary} {sourceSummary} {missionSummary} {builderSummary} {aiSummary} Etapas do fluxo de trabalho: {journeySummary}. {workflowInventory}",
  "reports.workspace.heroEyebrow": "\nRelatórios empresariais",
  "reports.workspace.title": "\nCentro de comando de relatórios de portfólio",
  "reports.workspace.description":
    "\nPacotes de relatórios prontos para o conselho, visualizações de garantia operacional e detalhamentos vinculados a evidências entregues por meio de um espaço de trabalho renderizado por servidor.",
  "reports.workspace.sectionTitle": "\nCatálogo de relatórios",
  "reports.workspace.sectionDescription":
    "\nAlterne entre pacotes financeiros, operacionais e executivos sem sair do espaço de trabalho de relatórios.",
  "reports.workspace.datasetTitle": "\nCentro de comando do conjunto de dados",
  "reports.workspace.datasetDescription":
    "\nRevise os conjuntos de dados financeiros, operacionais e executivos em tempo real antes de gerar um pacote de relatórios ou abrir detalhamentos.",
  "reports.workspace.aiBriefTitle": "\nBriefing de IA",
  "reports.workspace.aiBriefDescription":
    "\nUma narrativa pronta para decisão sintetizada a partir do pacote ativo, evidências de apoio e estado atual do fluxo de trabalho.",
  "reports.workspace.aiBriefEmpty":
    "\nGere um pacote de relatórios para criar um briefing de IA para partes interessadas financeiras, operacionais ou executivas.",
  "reports.workspace.launchpadTitle": "\nPlataforma de lançamento de decisão",
  "reports.workspace.launchpadDescription":
    "\nPasse diretamente para pacotes executivos, visualizações de garantia operacional ou revisões de dependência sem reconstruir o contexto.",
  "reports.workspace.launchpad.priorityDatasetTitle": "\nConjunto de dados prioritário",
  "reports.workspace.launchpad.offlineSourcesTitle": "\nFontes off-line",
  "reports.workspace.launchpad.reportingScopeTitle": "\nEscopo do relatório",
  "reports.workspace.launchpad.openPack": "\nPacote aberto",
  "reports.workspace.launchpad.openWorkspace": "\nAbrir espaço de trabalho",
  "reports.workspace.launchpad.openEstateWorkspace": "\nEspaço de trabalho de propriedade aberta",
  "reports.workspace.launchpad.openFinancePlanningWorkspace":
    "Espaço de trabalho de planejamento financeiro aberto",
  "reports.workspace.launchpad.lane.boardBadge": "\nPacote de tabuleiro",
  "reports.workspace.launchpad.lane.boardTitle": "\nPacote de inteligência de decisão estratégica",
  "reports.workspace.launchpad.lane.boardDescription":
    "\nLance o pacote voltado para o conselho para compensações do ciclo de vida, postura de risco e sequenciamento de investimentos.",
  "reports.workspace.launchpad.lane.operationsBadge": "\nPacote operacional",
  "reports.workspace.launchpad.lane.operationsTitle":
    "\nPacote de imagens operacionais da propriedade",
  "reports.workspace.launchpad.lane.operationsDescription":
    "\nAbra o pacote de garantia operacional para bloqueadores de prontidão, pressão de entrega FM e sinais de controle de propriedade.",
  "reports.workspace.launchpad.lane.dependenciesBadge": "\nRevisão de dependência",
  "reports.workspace.launchpad.lane.dependenciesTitle":
    "\nRevisão de dependência de integração corporativa",
  "reports.workspace.launchpad.lane.dependenciesDescription":
    "\nAdote uma postura de integração quando os sistemas financeiros, de RH, de compras ou de parceiros de catering estiverem moldando a confiança nos relatórios.",
  "reports.workspace.activePackDescription":
    "\nO pacote de relatórios ativos combina narrativa de IA, evidências de conjuntos de dados cruzados e seções prontas para exportação em um espaço de trabalho renderizado por servidor.",
  "reports.workspace.mission.title": "\nPróximo movimento recomendado",
  "reports.workspace.mission.description":
    "\nO espaço de trabalho transforma o estado do portfólio em um próximo passo pronto para decisão, para que os operadores possam preparar um pacote, abrir evidências ou liderar brevemente sem reinterpretar a página inteira.",
  "reports.workspace.mission.progressTitle": "\nProntidão do fluxo de trabalho",
  "reports.workspace.mission.progressValue": "\n{completed}/{total} pronto",
  "reports.workspace.mission.progressDescription":
    "\n{completed} de {total} etapas da jornada estão prontas. A prontidão do fluxo de trabalho atual é {percent}%.",
  "reports.workspace.mission.progressStatDescription":
    "\n{percent}% do fluxo de relatórios está pronto para transferência.",
  "reports.workspace.mission.nextStageTitle": "\nPróxima etapa",
  "reports.workspace.mission.priorityDatasetTitle": "\nConjunto de dados prioritário",
  "reports.workspace.mission.dataTitle": "\nReconecte a cobertura da fonte",
  "reports.workspace.mission.dataDescription":
    "\nOs conjuntos de dados {count} estão offline. Comece com {source} para restaurar a confiança antes de exportar.",
  "reports.workspace.mission.firstPackTitle": "\nMonte o primeiro pacote",
  "reports.workspace.mission.firstPackDescription":
    "\nUse {dataset} como ponto de partida e, em seguida, prepare as entradas do construtor para o público {audience}.",
  "reports.workspace.mission.drilldownTitle": "\nInvestigue {dataset}",
  "reports.workspace.mission.drilldownDescription":
    "\n{dataset} está marcado como {health}. Abra a evidência detalhada antes de alterar a história.",
  "reports.workspace.mission.coverageTitle": "\nAumentar a cobertura do pacote",
  "reports.workspace.mission.coverageDescription":
    "\n{pack} está atualmente com cobertura de {score}%. Aperte seções, detalhamentos ou narrativa antes de compartilhá-los.",
  "reports.workspace.mission.briefTitle": "\nElabore o briefing de decisão",
  "reports.workspace.mission.briefDescription":
    "\n{pack} está estruturado e pronto para um resumo de IA, perguntas e respostas ou briefing específico do público.",
  "reports.workspace.mission.briefPrompt":
    "Elabore um briefing pronto para decisão para o pacote de relatórios {pack}. As seções ativas são {sections}. Resuma os principais riscos, explique as evidências mais fortes e prepare prováveis perguntas de acompanhamento.",
  "reports.workspace.journey.selectTitle": "\nSelecione a cobertura",
  "reports.workspace.journey.selectDescription":
    "\nComece com o conjunto de dados mais relevante: {dataset}. Confirme se pertence ao próximo pacote.",
  "reports.workspace.journey.gotoDataset": "\nConjuntos de dados abertos",
  "reports.workspace.journey.askAi": "\nPergunte a AI",
  "reports.workspace.journey.changeTitle": "\nMude a história",
  "reports.workspace.journey.changeDescription":
    "\nRevise o mix de seções ativas antes de alterar a narrativa ou o enquadramento das partes interessadas: {sections}.",
  "reports.workspace.journey.gotoActivePack": "\nAbra o pacote ativo",
  "reports.workspace.journey.changePrompt":
    "\nAjude-me a mudar a história do relatório atual. As seções ativas são {sections}. Recomende o que deve ser enfatizado, desenfatizado ou reescrito.",
  "reports.workspace.journey.modifyTitle": "\nModifique o pacote",
  "reports.workspace.journey.modifyDescription":
    "\nRedirecione o relatório atual para o público {audience} sem perder os principais sinais.",
  "reports.workspace.journey.gotoBuilder": "\nAbrir construtor",
  "reports.workspace.journey.modifyPrompt":
    "\nAjude-me a modificar o pacote de relatórios atual para o público {audience} com foco {focus}. Recomende como ajustar as entradas do construtor.",
  "reports.workspace.journey.drilldownTitle": "\nAnalise a variação",
  "reports.workspace.journey.drilldownDescription":
    "\nPasse de cartões de resumo para tabelas de evidências para {dataset}.",
  "reports.workspace.journey.gotoDrilldown": "\nAbrir detalhamento",
  "reports.workspace.journey.drilldownPrompt":
    "\nInvestigue o conjunto de dados {dataset}. Atualmente está marcado como {health}. Explique os prováveis motivadores e as próximas perguntas detalhadas que devo fazer.",
  "reports.workspace.journey.addDataTitle": "\nAdicionar dados de origem",
  "reports.workspace.journey.addDataDescription":
    "\nSe a confiança for baixa, abra {source} e adicione ou atualize a evidência subjacente.",
  "reports.workspace.journey.gotoSource": "\nCódigo aberto",
  "reports.workspace.journey.addDataPrompt":
    "\nDiga-me quais dados adicionais devo adicionar de {source} para melhorar o pacote de relatórios ativos ({activePack}).",
  "reports.workspace.ai.explainPostureTitle": "\nExplique a postura atual",
  "reports.workspace.ai.explainPostureDescription":
    "\nResuma os sinais mais relevantes, começando com {dataset}.",
  "reports.workspace.ai.explainDriversTitle": "\nExplique os drivers e a confiança",
  "reports.workspace.ai.explainDriversDescription":
    "\nRastreie os principais motivadores, incertezas e evidências de apoio por trás de {dataset}.",
  "reports.workspace.ai.explainDriversPrompt":
    "Para o conjunto de dados {dataset}, explique os principais fatores, o nível de confiança, a incerteza e quais evidências mais mudariam a decisão. Saúde é {health}. O pacote ativo é {pack}. As seções ativas são {sections}. Existem conjuntos de dados offline {count}. Verifique o inventário, o acúmulo de tarefas, a utilização, as finanças e os sinais de aquisição ou descarte quando essa evidência existir.",
  "reports.workspace.ai.modifyPackTitle": "\nRedirecione este pacote",
  "reports.workspace.ai.modifyPackDescription":
    "\nRecomende como o pacote {pack} deve mudar para um público ou tomador de decisão diferente.",
  "reports.workspace.ai.modifyPackPrompt":
    "\nAjude-me a modificar o pacote de relatórios {pack}. As seções atuais são {sections}. Recomende o que adicionar, remover ou apertar.",
  "reports.workspace.ai.comparePackTitle": "\nCompare com a cronologia",
  "reports.workspace.ai.comparePackDescription":
    "\nVerifique como o pacote atual {pack} difere da cronologia salva e o que mudou.",
  "reports.workspace.ai.comparePackPrompt":
    "\nCompare o pacote de relatórios atual {pack} com a cronologia do relatório salvo. As seções ativas são {sections}. Destaque o que mudou, o que permanece sem solução e o que merece detalhamento antes de compartilhar.",
  "reports.workspace.ai.findGapsTitle": "\nEncontre lacunas de dados",
  "reports.workspace.ai.findGapsDescription":
    "\nExistem {count} conjuntos de dados off-line que afetam a confiança dos relatórios.",
  "reports.workspace.ai.findGapsPrompt":
    "\nIdentifique os dados ausentes ou obsoletos neste espaço de trabalho de relatórios. Atualmente existem conjuntos de dados offline {count}. Explique quais sistemas de origem atualizar primeiro.",
  "reports.workspace.ai.explainSelectionTitle": "\nExplique a seleção",
  "reports.workspace.ai.explainSelectionDescription":
    "\nUse a seleção de texto atual para solicitar uma explicação em linguagem simples no chat.",
  "reports.workspace.source.estate":
    "\nAbra o espaço de trabalho imobiliário para revisar a preparação, as aprovações de projetos e a postura do programa estratégico por trás deste relatório.",
  "reports.workspace.source.assets":
    "\nAbra o registro de ativos para adicionar ou corrigir os registros de equipamentos que respaldam este relatório.",
  "reports.workspace.source.buildings":
    "\nAbra edifícios para inspecionar a hierarquia das instalações, a postura FM e os bloqueadores de prontidão que influenciam este relatório.",
  "reports.workspace.source.fleet":
    "\nFrota aberta para inspecionar a utilização, tempo de inatividade, pressão de substituição e postura operacional do equipamento por trás deste relatório.",
  "reports.workspace.source.financePlanning":
    "Abra o planejamento financeiro para inspecionar a pressão de aprovação, cenários de investimento e compensações de capital relacionadas a este relatório.",
  "reports.workspace.source.admin":
    "\nAbra integrações administrativas para inspecionar a integridade do sistema parceiro e os efeitos de dependência que moldam este relatório.",
  "reports.workspace.source.sensors":
    "\nAbra sensores para inspecionar a cobertura de telemetria, lacunas de comissionamento e problemas de qualidade do dispositivo por trás deste relatório.",
  "reports.workspace.source.tasks":
    "\nAbra operações de tarefas para validar pendências, pressão de manutenção e ações atrasadas.",
  "reports.workspace.source.predictions":
    "\nAbra operações de previsão para revisar janelas de falha, gravidade e cobertura do modelo.",
  "reports.workspace.source.finance":
    "\nAbra o financiamento para validar a exposição à depreciação, desvio de avaliação e risco de concentração.",
  "reports.workspace.source.utilisation":
    "\nUtilização aberta para inspecionar evidências de carga, saturação e ocupação apoiadas por telemetria.",
  "reports.workspace.source.rfqs":
    "\nAbra o espaço de trabalho RFQ para revisar a demanda recebida, a atividade de cotação e a preparação para conversão.",
  "reports.workspace.source.customerOrders":
    "\nAbra pedidos de clientes para validar a progressão do pipeline, aprovações e prontidão de atendimento.",
  "reports.workspace.source.workOrders":
    "\nAbra ordens de serviço para inspecionar o fluxo de execução, a postura do SLA e a pressão de entrega.",
  "reports.workspace.source.purchaseOrders":
    "\nAbra pedidos de compra para revisar compromissos, recebimentos e vencimento do fornecedor.",
  "reports.workspace.source.invoices":
    "\nFaturas abertas para revisar emissão, postura de cobrança e saldos vencidos.",
  "reports.navigation.title": "\nNavegador de fluxo de trabalho",
  "reports.navigation.description":
    "\nPasse da seleção do conjunto de dados para alterações de pacotes, detalhamentos e revisão de lacunas de dados sem sair do espaço de trabalho de relatórios.",
  "reports.navigation.menuTitle": "\nSeções",
  "reports.navigation.menuDescription":
    "\nVá diretamente para o estágio atual do fluxo de trabalho de relatórios.",
  "reports.navigation.lanesTitle": "\nPistas de decisão",
  "reports.navigation.lanesDescription":
    "\nAlterne entre as intenções do operador antes de detalhar as ações no nível da seção ou passar o estado atual para o chat.",
  "reports.navigation.cluster.decideTitle": "\nDecida",
  "reports.navigation.cluster.decideDescription":
    "\nRevise a postura atual, o próximo movimento recomendado e a preparação do conjunto de dados antes de alterar o pacote.",
  "reports.navigation.cluster.composeTitle": "\nCompor",
  "reports.navigation.cluster.composeDescription":
    "\nAltere o público, o foco, as seções e a estrutura ativa do relatório antes de fazer o briefing ou exportar.",
  "reports.navigation.cluster.investigateTitle": "\nInvestigar",
  "reports.navigation.cluster.investigateDescription":
    "\nPasse do resumo às evidências, compare a cronologia e valide o que mudou.",
  "reports.navigation.cluster.improveTitle": "\nMelhorar",
  "reports.navigation.cluster.improveDescription":
    "Use sistemas de bate-papo e fontes para preencher lacunas, restaurar a cobertura e fortalecer a confiança.",
  "reports.navigation.cluster.itemCount": "\n{count} seções",
  "reports.navigation.stage.overview": "\nVisão geral",
  "reports.navigation.stage.overviewDesc":
    "\nPostura do portfólio, KPIs resumidos e briefing de IA ativa.",
  "reports.navigation.stage.journey": "\nJornada",
  "reports.navigation.stage.journeyDesc":
    "\nEtapas baseadas em decisões para selecionar cobertura, mudar o foco e aprofundar a variação.",
  "reports.navigation.stage.datasets": "\nConjuntos de dados",
  "reports.navigation.stage.datasetsDesc":
    "\nConjuntos de dados financeiros, operacionais e executivos em tempo real que alimentam cada pacote de relatórios.",
  "reports.navigation.stage.aiCopilot": "\nCopiloto de IA",
  "reports.navigation.stage.aiCopilotDesc":
    "\nPrompts pré-construídos que abrem o bate-papo com o estado atual do relatório já anexado.",
  "reports.navigation.stage.builder": "\nConstrutor",
  "reports.navigation.stage.builderDesc":
    "\nPúblico, foco, intervalo de datas, seções e controles narrativos.",
  "reports.navigation.stage.templates": "\nModelos",
  "reports.navigation.stage.templatesDesc":
    "\nPacotes de relatórios integrados e salvos que podem ser iniciados na área de trabalho.",
  "reports.navigation.stage.sourceHub": "\nCentro de origem",
  "reports.navigation.stage.sourceHubDesc":
    "\nSistemas operacionais que podem adicionar evidências, atualizar a cobertura ou resolver uma lacuna de dados.",
  "reports.navigation.stage.drilldown": "\nDetalhamento",
  "reports.navigation.stage.drilldownDesc":
    "\nDetalhe em nível de linha e sinais de concentração por trás do resumo atual.",
  "reports.navigation.stage.history": "\nCronologia",
  "reports.navigation.stage.historyDesc":
    "\nHistórico de relatórios salvo para comparação, reprodução e governança.",
  "reports.navigation.stage.activePack": "\nPacote ativo",
  "reports.navigation.stage.activePackDesc":
    "\nO pacote atual de relatórios renderizados pelo servidor, narrativa e seções prontas para exportação.",
  "reports.navigation.badge.live": "\nTodos ao vivo",
  "reports.navigation.badge.ready": "\nPronto",
  "reports.navigation.badge.offlineCount": "\n{count} off-line",
  "reports.navigation.badge.datasetCount": "\n{count} conjuntos de dados",
  "reports.navigation.badge.sectionCount": "\n{count} seções",
  "reports.navigation.badge.stepCount": "\n{count} passos",
  "reports.navigation.badge.templateCount": "\n{count} pacotes",
  "reports.navigation.badge.aiActionCount": "\n{count} avisa",
  "reports.navigation.badge.sourceCount": "\n{count} fontes",
  "reports.navigation.badge.savedCount": "\n{count} salvo",
  "reports.navigation.badge.coverage": "\nCobertura {score}%",
  "reports.navigation.badge.focus": "\n{focus} foco",
  "reports.navigation.badge.attention": "Atenção: {label}",
  "reports.navigation.status.recommended": "\nRecomendado",
  "reports.navigation.status.complete": "\nConcluído",
  "reports.navigation.status.attention": "\nAtenção",
  "reports.navigation.status.ready": "\nPronto",
  "reports.navigation.action.jump": "\nAbrir seção",
  "reports.navigation.action.askAi": "\nPergunte a AI",
  "reports.navigation.action.loadBuilder": "\nConstrutor de palco",
  "reports.navigation.action.loadBuilderAria": "\nConstrutor de palco de {name}",
  "reports.navigation.action.loadDrilldown": "\nCarregar detalhamento",
  "reports.navigation.whyNow": "\nPor que agora",
  "reports.navigation.whyNowComplete":
    "\nEsta etapa já está em um estado utilizável. Reabra-o quando o pacote, a evidência ou o público de decisão mudar.",
  "reports.navigation.whyNowAttention":
    "\nResolva a variação sinalizada, a fonte obsoleta ou a evidência ausente aqui antes de compartilhar o pacote.",
  "reports.navigation.whyNowReady":
    "\nEsta etapa está disponível quando você precisa refinar a história, abrir evidências ou adicionar dados de apoio.",
  "reports.journey.title": "\nJornada de decisão",
  "reports.journey.description":
    "\nUm fluxo de trabalho financeiro para selecionar cobertura, mudar o foco, modificar pacotes, detalhar a variação e identificar dados ausentes.",
  "reports.ai.title": "\nCopiloto de IA",
  "reports.ai.description":
    "\nEnvie o estado atual do relatório para o chat com prompts pré-construídos ou explique as linhas selecionadas de qualquer tabela.",
  "reports.workspace.health.healthy": "Saudável",
  "reports.workspace.health.monitor": "\nMonitor",
  "reports.workspace.health.attention": "\nPrecisa de atenção",
  "reports.workspace.health.offline": "\nOff-line",
  "reports.posture.title": "\nPostura de denúncia",
  "reports.posture.description":
    "\nCobertura atual ao vivo em pacotes de relatórios financeiros, operacionais e de liderança.",
  "reports.generatedAt": "\nGerado {date}",
  "reports.overview.reportCount": "\nPacotes de relatórios",
  "reports.overview.assetsCovered": "\nAtivos cobertos",
  "reports.overview.predictionsDue": "\nPrevisões devidas",
  "reports.card.cadence.daily": "\nDiariamente",
  "reports.card.cadence.weekly": "\nSemanal",
  "reports.card.cadence.monthly": "\nMensal",
  "reports.card.metric.totalTypes": "\nTipos de ativos",
  "reports.card.metric.criticalAssets": "\nAtivos críticos",
  "reports.card.metric.criticalSignals": "\nSinais críticos",
  "reports.types.depreciation": "\nResumo de depreciação",
  "reports.types.depreciationDesc":
    "\nValor contábil, exposição ajustada por IA e principais ativos por depreciação",
  "reports.types.assets": "\nResumo de ativos",
  "reports.types.assetsDesc": "\nAtivos por tipo, condição e detalhamento do valor contábil",
  "reports.types.predictions": "\nResumo de previsões",
  "reports.types.predictionsDesc": "\nPrevisões de falhas e degradação por gravidade e tipo",
  "reports.types.utilisation": "\nResumo de utilização",
  "reports.types.utilisationDesc": "\nTaxas de utilização de ativos e métricas de ocupação",
  "reports.types.executive": "\nResumo Executivo",
  "reports.types.executiveDesc": "\nPrincipais indicadores de desempenho e visão geral do sistema",
  "reports.types.estateOperational": "\nImagem Operacional Imobiliária",
  "reports.types.estateOperationalDesc":
    "\nRelatórios integrados voltados para DIO em condições, ciclo de vida, prontidão, projetos, inspeções e atividades da força de trabalho",
  "reports.types.strategicDecision": "\nInteligência de Decisão Estratégica",
  "reports.types.strategicDecisionDesc":
    "\nAnálise do ciclo de vida, risco de infraestrutura, pressão preditiva, análise de desempenho e priorização de investimentos em um pacote de decisões",
  "reports.types.workOrders": "\nTaxa de transferência de ordem de serviço",
  "reports.types.workOrdersDesc":
    "\nRendimento operacional, produtividade da força de trabalho, pressão do SLA e custo de mitigação em ordens de serviço",
  "reports.types.purchaseOrders": "\nVencimento do pedido de compra",
  "reports.types.purchaseOrdersDesc":
    "\nPressão de entrega do fornecedor, prazo de entrega e gastos comprometidos em pedidos de compra",
  "reports.types.customerOrders": "\nFunil de pedido do cliente",
  "reports.types.customerOrdersDesc":
    "\nProgressão do pedido do cliente desde a aprovação até o cumprimento e conclusão",
  "reports.types.invoices": "\nVencimento da fatura",
  "reports.types.invoicesDesc":
    "\nSaldos pendentes, postura de cobrança e pressão vencida nas faturas",
  "reports.types.rfqs": "\nConversão de RFQ",
  "reports.types.rfqsDesc":
    "\nQualificação de RFQ, cotação, aceitação e conversão em pedidos de clientes",
  "reports.summary": "\nResumo",
  "reports.topAssets": "\nPrincipais ativos",
  "reports.asset": "\nAtivo",
  "reports.bookValue": "\nValor contábil",
  "reports.severity": "\nGravidade",
  "reports.severity.info": "\nInformações",
  "reports.severity.warning": "\nAviso",
  "reports.severity.critical": "\nCrítico",
  "reports.severity.emergency": "\nEmergência",
  "reports.totalAssets": "\nAtivos Totais",
  "reports.totalBookValue": "\nValor contábil total",
  "reports.adjustedExposure": "\nExposição ajustada",
  "reports.byType": "\nPor tipo",
  "reports.byCondition": "\nPor Condição",
  "reports.bySeverity": "\nPor gravidade",
  "reports.type": "\nTipo",
  "reports.condition": "\nCondição",
  "reports.status": "\nStatus",
  "reports.columns.workOrder": "\nOrdem de Serviço",
  "reports.columns.activity": "\nAtividade",
  "reports.columns.region": "\nRegião",
  "reports.columns.labourHours": "\nHorário de Trabalho",
  "reports.columns.productivity": "\nProdutividade",
  "reports.columns.cycleHours": "\nHoras de ciclo",
  "reports.columns.cost": "\nCusto",
  "reports.columns.mitigation": "\nMitigação",
  "reports.columns.purchaseOrder": "\nPedido de compra",
  "reports.columns.vendor": "\nFornecedor",
  "reports.columns.ageDays": "\nDias de Idade",
  "reports.columns.order": "\nPedido",
  "reports.columns.customer": "\nCliente",
  "reports.columns.workOrders": "\nOrdens de Serviço",
  "reports.columns.invoice": "\nFatura",
  "reports.columns.due": "\nVencimento",
  "reports.columns.rfq": "Pedido de cotação",
  "reports.columns.title": "\nTítulo",
  "reports.count": "\nContagem",
  "reports.recentPredictions": "\nPrevisões recentes",
  "reports.remainingDays": "\nDias restantes",
  "reports.confidence": "\nConfiança",
  "reports.avgUtilisation": "\nUtilização Média",
  "reports.minMax": "\nMínimo – Máx",
  "reports.topByUtilisation": "\nSuperior por utilização",
  "reports.utilisation": "\nUtilização",
  "reports.metric": "\nMétrica",
  "reports.value": "\nValor",
  "reports.overdueMaintenance": "\nManutenção vencida",
  "reports.openDocuments": "\nDocumentos abertos",
  "reports.workOrders.open": "\nOrdens de serviço abertas",
  "reports.workOrders.reviewQueue": "\nRevisar fila",
  "reports.workOrders.completed": "\nOrdens de serviço concluídas",
  "reports.workOrders.breached": "\nSLA violado",
  "reports.workOrders.averageCycle": "\nCiclo médio",
  "reports.workOrders.productivity": "\nProdutividade média",
  "reports.workOrders.mitigationCost": "\nCusto de mitigação",
  "reports.workOrders.mitigationHours": "Horas de mitigação",
  "reports.workOrders.regionWatch": "\nRegião sob vigilância",
  "reports.workOrders.improvementFocus": "\nFoco em melhoria",
  "reports.workOrders.mitigationActive": "\nMitigação ativa",
  "reports.workOrders.mitigationClear": "\nNo alvo",
  "reports.estate.readiness": "\nProntidão de capacidade",
  "reports.estate.rangeReadiness": "\nProntidão de alcance",
  "reports.estate.criticalSignals": "\nSinais críticos",
  "reports.estate.approvalPressure": "\nPressão de aprovação",
  "reports.estate.approvalDelays": "\nAprovações atrasadas",
  "reports.estate.labourHours": "\nHoras de trabalho registradas",
  "reports.strategy.priorityFocus": "\nFoco prioritário",
  "reports.strategy.lifecyclePressure": "\nPressão do ciclo de vida",
  "reports.strategy.infrastructureRisk": "\nRisco de infraestrutura",
  "reports.strategy.predictiveSignals": "\nSinais preditivos",
  "reports.strategy.investmentPressure": "\nPressão de investimento",
  "reports.strategic.focus.lifecycle": "\nRenovação do ciclo de vida",
  "reports.strategic.focus.infrastructure": "\nRisco de infraestrutura",
  "reports.strategic.focus.predictive": "\nManutenção preditiva",
  "reports.strategic.focus.performance": "\nDesempenho operacional",
  "reports.strategic.focus.investment": "\nPriorização de investimento",
  "reports.purchaseOrders.awaitingReceipt": "\nAguardando recebimento",
  "reports.purchaseOrders.overdue": "\nPedidos de compra vencidos",
  "reports.purchaseOrders.avgLeadTime": "\nPrazo médio de entrega",
  "reports.purchaseOrders.committed": "\nGasto comprometido",
  "reports.customerOrders.pending": "\nAprovação pendente",
  "reports.customerOrders.confirmed": "\nPedidos confirmados",
  "reports.customerOrders.fulfilment": "\nEm cumprimento",
  "reports.customerOrders.converted": "\nConvertido de RFQ",
  "reports.customerOrders.booked": "\nValor reservado",
  "reports.invoices.outstanding": "\nValor pendente",
  "reports.invoices.overdue": "\nFaturas vencidas",
  "reports.invoices.collected": "\nDinheiro arrecadado",
  "reports.invoices.partial": "\nParcialmente pago",
  "reports.rfqs.submitted": "\nSolicitações de cotação enviadas",
  "reports.rfqs.quoted": "\nSolicitações de cotação cotadas",
  "reports.rfqs.accepted": "\nSolicitações de cotação aceitas",
  "reports.rfqs.converted": "\nRFQs convertidas",
  "reports.rfqs.averageBudget": "\nOrçamento médio",
  "reports.rfqs.pipeline": "\nPipeline ativo",
  "reports.downloadPdf": "\nBaixar PDF",
  "reports.viewAnalysis": "\nVer Análise",
  "reports.analysis": "\nAnálise de dados",
  "reports.analysisLoading": "\nCarregando análise…",
  "reports.ai.askAi": "\nPergunte a AI",
  "reports.ai.askAiMissionAria": "\nPergunte à IA sobre o próximo movimento recomendado",
  "reports.ai.askAiTemplateAria": "\nPergunte à IA sobre o modelo {name}",
  "reports.ai.askAiPackAria": "\nPergunte à IA sobre o pacote de relatórios {name}",
  "reports.ai.askAiSectionAria": "\nPergunte à IA sobre a seção {name}",
  "reports.ai.askAiDrilldownAria": "\nPergunte à IA sobre o detalhamento {name}",
  "reports.insights": "\nInformações",
  "reports.insights.depreciationCritical": "\n{count} previsões críticas que afetam a avaliação",
  "reports.insights.depreciationHealthy": "\nNenhuma previsão crítica afetando a avaliação",
  "reports.insights.depreciationTotal": "\n{count} ativos no escopo de depreciação",
  "reports.insights.topAssetType": "\n{type}: {count} ativos",
  "reports.insights.noAssets": "\nNenhum ativo no sistema",
  "reports.insights.criticalAssets": "\n{count} ativo(s) em estado crítico",
  "reports.insights.noCritical": "\nNenhum ativo em estado crítico",
  "reports.insights.predictionsDue": "\n{count} previsão(ões) com vencimento em {days} dias",
  "reports.insights.noPredictionsDue": "\nNenhuma previsão prevista para {days} dias",
  "reports.insights.criticalPredictions": "\n{count} previsão(ões) crítica(s)/de emergência",
  "reports.insights.highUtilisation": "\nAlta utilização – considere revisão de capacidade",
  "reports.insights.utilisationNormal": "\nUtilização dentro da faixa normal",
  "reports.insights.utilisationMonitor":
    "\nA utilização está fora da faixa preferencial e deve ser monitorada",
  "reports.insights.assetCount": "\n{count} ativos rastreados",
  "reports.insights.overdueTasks": "\n{count} tarefas de manutenção atrasadas",
  "reports.insights.noOverdue": "\nNenhuma tarefa de manutenção atrasada",
  "reports.insights.workOrders.breached":
    "\n{count} ordens de serviço estão atualmente fora do SLA.",
  "reports.insights.workOrders.noBreach": "\nNenhuma ordem de serviço de amostra está fora do SLA.",
  "reports.insights.workOrders.avgCycle":
    "\nO ciclo médio de conclusão é de {hours} horas nas conclusões recentes.",
  "reports.insights.workOrders.noCompleted":
    "\nNenhuma ordem de serviço concluída está disponível para análise de rendimento.",
  "reports.insights.workOrders.productivity":
    "\nA produtividade média é de {rate} unidades de produção por hora de trabalho em {hours} horas registradas.",
  "reports.insights.workOrders.mitigationCost":
    "{count} ordens de serviço violadas atualmente carregam {cost} de mitigação ao longo de {hours} horas de trabalho.",
  "reports.insights.workOrders.noMitigation":
    "\nNenhuma ordem de serviço violada atualmente possui mão de obra de mitigação rastreada.",
  "reports.insights.workOrders.activityWatch":
    "\n{activity} é o tipo de trabalho de menor produtividade em {rate} unidades de produção por hora de trabalho.",
  "reports.insights.workOrders.regionWatch":
    "\n{region} é a carga de trabalho regional amostrada mais fraca em {rate} unidades de produção por hora de trabalho.",
  "reports.insights.workOrders.improvementFocus":
    "\nPriorize ações de melhoria de desempenho em torno de {focus}.",
  "reports.insights.workOrders.noImprovementFocus":
    "\nNenhum foco único de melhoria está emergindo da amostra atual de ordens de serviço.",
  "reports.insights.estateOperational.infrastructureRisk":
    "\n{count} sinais de risco imobiliário estão ativos em dados de condição, inspeção e previsão.",
  "reports.insights.estateOperational.infrastructureRiskClear":
    "\nNenhum sinal crítico de risco imobiliário está ativo em todo o cenário imobiliário integrado.",
  "reports.insights.estateOperational.readinessGap":
    "\n{ready} dos {total} recursos rastreados estão totalmente prontos, com {constrainedSites} sites restritos ainda afetando a prontidão.",
  "reports.insights.estateOperational.readinessClear":
    "\nOs recursos rastreados estão atualmente prontos para relatórios, sem restrições de nível de propriedade.",
  "reports.insights.estateOperational.approvalDelay":
    "\n{delayed} aprovações de projetos estão atrasadas, com {queue} projetos adicionais ainda na fila.",
  "reports.insights.estateOperational.approvalQueue":
    "\n{queue} aprovações de projetos permanecem na fila atual.",
  "reports.insights.estateOperational.approvalClear":
    "\nNenhuma aprovação de projeto está atrasada ou em fila.",
  "reports.insights.estateOperational.inspectionBacklog":
    "\n{count} item(s) de inspeção estão atrasados enquanto {hours} horas de trabalho são registradas em relação à atividade de entrega atual.",
  "reports.insights.estateOperational.workforceSignal":
    "\n{hours} as horas de trabalho estão atualmente registradas na atividade de entrega operacional.",
  "reports.insights.estateOperational.investmentPressure":
    "\n{count} sinais de pressão de investimento estão ativos em {projects} projetos e {initiatives} iniciativas estratégicas.",
  "reports.insights.estateOperational.investmentStable":
    "\nAs iniciativas estratégicas permanecem registadas sem sinais adicionais de pressão de investimento além da linha de base atual de {initiatives}.",
  "reports.insights.strategicDecision.lifecyclePressure":
    "\n{count} ativo(s) de observação do ciclo de vida estão ativos, representando {rate}% da base de patrimônio atual.",
  "reports.insights.strategicDecision.lifecycleStable":
    "\nAtualmente, nenhum ativo de observação do ciclo de vida está distorcendo a postura de investimento estratégico.",
  "reports.insights.strategicDecision.infrastructureRisk":
    "\n{count} sinais de risco de infraestrutura estão ativos, equivalentes a {rate}% da base atual de patrimônio.",
  "reports.insights.strategicDecision.infrastructureRiskClear":
    "Os sinais de risco de infraestrutura são atualmente claros em todo o cenário estratégico.",
  "reports.insights.strategicDecision.predictiveLoad":
    "\n{count} sinais de manutenção preditiva estão ativos, incluindo {critical} previsões críticas, com {rate}% dos ativos com vencimento em breve.",
  "reports.insights.strategicDecision.predictiveClear":
    "\nOs sinais de manutenção preditiva estão claros em toda a propriedade monitorada.",
  "reports.insights.strategicDecision.performanceSignal":
    "\nO desempenho operacional permanece moldado por {focus}, com prontidão em {readiness}% e produtividade em {productivity} unidades de produção por hora de trabalho.",
  "reports.insights.strategicDecision.performanceStable":
    "\nO desempenho operacional permanece estável com prontidão em {readiness}% e produtividade em {productivity} unidades de produção por hora de trabalho.",
  "reports.insights.strategicDecision.investmentPriority":
    "\nA priorização de investimentos é atualmente liderada por {focus}, com {count} sinais vinculados e {delayed} aprovações atrasadas ainda afetando a fila.",
  "reports.insights.strategicDecision.investmentStable":
    "\nA postura de investimento estratégico é estável, com {focus} permanecendo a principal área de observação, em vez de uma via de pressão ativa.",
  "reports.insights.purchaseOrders.overdue": "\n{count} os pedidos de compra estão vencidos.",
  "reports.insights.purchaseOrders.noOverdue": "\nNenhum pedido de compra está vencido no momento.",
  "reports.insights.purchaseOrders.awaitingReceipt":
    "\n{count} pedidos de compra ainda aguardam recebimento completo.",
  "reports.insights.purchaseOrders.avgLeadTime":
    "\nO prazo médio de entrega do fornecedor é de {days} dias.",
  "reports.insights.customerOrders.fulfilment":
    "\n{count} pedidos de clientes estão atualmente em processamento.",
  "reports.insights.customerOrders.noFulfilment":
    "\nNenhum pedido de cliente está atualmente em processamento.",
  "reports.insights.customerOrders.converted":
    "\n{count} pedidos de clientes foram criados a partir de solicitações de cotação aceitas.",
  "reports.insights.invoices.overdue":
    "\n{count} fatura(s) estão vencidas e precisam de acompanhamento de cobrança.",
  "reports.insights.invoices.noOverdue": "\nNenhuma fatura está vencida no momento.",
  "reports.insights.invoices.paymentMix":
    "\n{paidCount} fatura(s) estão totalmente pagas e {partialCount} permanecem parcialmente pagas.",
  "reports.insights.rfqs.converted": "\n{count} RFQ(s) foram convertidas em pedidos de clientes.",
  "reports.insights.rfqs.pipeline":
    "\n{count} RFQ(s) permanecem ativos nas etapas de qualificação ou cotação.",
  "reports.insights.rfqs.noPipeline": "\nNenhuma RFQ está atualmente ativa no pipeline comercial.",
  "reports.unknownReportType": "\nTipo de relatório desconhecido",
  "reports.generateFailed": "\nFalha na geração do relatório",
  "reports.dataset.prompt":
    "Revise o conjunto de dados {dataset}. Saúde é {health}. Métricas principais: {metrics}. Informações: {insights}. Explique o que mudou, por que isso é importante e se esse conjunto de dados pertence ao pacote de relatórios atual.",
  "reports.pdfAuthor": "{brandName}",
  "reports.rawMetrics": "\nMétricas brutas",
  "reports.rawMetricsLower": "\nmétricas brutas",
  "reports.viewAnalysisAria": "\nVer análise para {label}",
  "reports.journey.prompt.select":
    "\nCom base no espaço de trabalho de relatórios atual e nas seções selecionadas ({sections}), quais conjuntos de dados devo incluir no próximo pacote e por quê?",
  "reports.journey.prompt.change":
    "\nAjude-me a mudar o relatório atual para o público {audience} com foco em {focus}. Recomende como ajustar o público, o foco ou o intervalo de datas e explique as compensações.",
  "reports.journey.prompt.modify":
    "\nRevise o pacote de relatórios atual com as seções {sections}. Sugira modificações concretas na narrativa, combinação de seções e ordem.",
  "reports.journey.prompt.drilldown":
    "\nInvestigue o conjunto de dados {dataset}. Atualmente está marcado como {health}. Explique os prováveis motivadores e as próximas perguntas detalhadas que devo fazer.",
  "reports.journey.prompt.drilldownUnavailable":
    "\nNenhum conjunto de dados está atualmente priorizado para detalhamento.",
  "reports.journey.prompt.drilldownFallback":
    "\nIdentifique a próxima área do relatório que merece um detalhamento e explique quais evidências devo inspecionar primeiro.",
  "reports.journey.prompt.addData":
    "\nIdentifique dados ausentes ou obsoletos neste espaço de trabalho de relatórios. Atualmente existem conjuntos de dados offline {offlineCount}. Explique quais dados adicionar ou atualizar em seguida.",
  "reports.journey.prompt.addDataSource":
    "\nDiga-me quais evidências adicionais devo adicionar ou atualizar em {source} para melhorar este pacote de relatórios.",
  "reports.ai.prompt.explainPosture":
    "\nExplique a postura atual de relatórios, os sinais mais relevantes e o que um leitor financeiro ou executivo deve focar a seguir.",
  "reports.ai.prompt.modifyPack":
    "\nAjude-me a modificar o pacote de relatórios atual para o público {audience} com foco {focus}. As seções atuais são {sections}. Recomende o que adicionar, remover ou apertar.",
  "reports.ai.prompt.findGaps":
    "\nIdentifique cobertura ausente ou dados desatualizados neste espaço de trabalho de relatórios e explique quais conjuntos de dados, filtros ou atualizações adicionais aumentariam a confiança.",
  "reports.ai.prompt.findGapsWithSource":
    "\nIdentifique cobertura ausente ou dados obsoletos neste espaço de trabalho de relatórios. Comece com {source} e explique como isso melhoraria o pacote ativo {pack}.",
  "reports.ai.prompt.sectionAnalysis":
    "Analise a seção {section}. Explique os principais sinais, valores discrepantes e as próximas perguntas que um operador deve fazer.",
  "reports.templates.builtin.financeControl": "\nPacote de controle financeiro",
  "reports.templates.builtin.financeControlDesc":
    "\nExposição à depreciação e resumo executivo para supervisão financeira",
  "reports.templates.builtin.riskWatch": "\nPacote de Observação de Risco",
  "reports.templates.builtin.riskWatchDesc":
    "\nPrevisões, utilização e resumo executivo para operações",
  "reports.templates.builtin.boardPack": "\nPacote de tabuleiro",
  "reports.templates.builtin.boardPackDesc":
    "\nResumo executivo com depreciação e detalhamento de ativos para liderança",
  "reports.templates.builtin.fmGovernance": "\nPacote de Governança FM",
  "reports.templates.builtin.fmGovernanceDesc":
    "\nPostura de governança FM, processamento de ordens de serviço e inteligência de decisão estratégica para revisão de riscos",
  "reports.templates.builtin.stewardship": "\nPacote de Administração",
  "reports.templates.builtin.stewardshipDesc":
    "\nPostura de administração patrimonial com cobertura de ativos e inteligência de decisão estratégica para revisão operacional",
  "reports.templates.builtin.cateringEss": "\nPacote Catering / ESS",
  "reports.templates.builtin.cateringEssDesc":
    "\nImagem operacional da propriedade, rendimento de entrega e postura executiva para catering e supervisão de ESS",
  "reports.templates.builtin.programmeControls": "\nPacote de controles de programa",
  "reports.templates.builtin.programmeControlsDesc":
    "\nPostura executiva, sinais de entrega de patrimônio e inteligência de decisão estratégica para governança do programa",
  "reports.builder.eyebrow": "\nEstúdio de construção",
  "reports.builder.title": "\nConstrutor de relatório personalizado",
  "reports.builder.description":
    "\nMonte pacotes de relatórios multifuncionais com narrativas de IA, modelos salvos e detalhamentos mais profundos.",
  "reports.builder.aiTitle": "\nCopiloto do construtor",
  "reports.builder.aiDescription":
    "\nUse o bate-papo para testar a combinação de seções, enquadramento de público e orientação do construtor antes da geração.",
  "reports.builder.ai.planTitle": "\nRecomendar seção mix",
  "reports.builder.ai.planDescription":
    "\nRevise o público atual, o foco e as seções selecionadas antes de gerar novamente o pacote.",
  "reports.builder.ai.planPrompt":
    "\nRecomende o melhor mix de seções para um relatório direcionado ao público {audience} com foco {focus}. As seções atualmente selecionadas são {sections}. Explique o que manter, remover ou adicionar antes da geração.",
  "reports.builder.ai.guidanceTitle": "\nRascunho da orientação do operador",
  "reports.builder.ai.guidanceDescription":
    "\nTransforme a configuração atual do construtor em uma orientação concisa que o operador pode aplicar ou colar no formulário.",
  "reports.builder.ai.guidancePrompt":
    "Elabore uma orientação concisa do construtor para um relatório direcionado ao público {audience} com foco em {focus}. As seções selecionadas são {sections}. A narrativa é {includeNarrative}. Os detalhamentos são {includeDrilldowns}. Sugira o texto de orientação final e explique por que ele melhorará o pacote.",
  "reports.builder.controlsTitle": "\nParâmetros de construção",
  "reports.builder.controlsDescription":
    "\nDefina o público, o foco, a cobertura e a orientação do operador para o pacote de relatórios gerado.",
  "reports.builder.reportTitleLabel": "\nTítulo do relatório",
  "reports.builder.reportTitleHint": "\nUsado como título para o pacote de relatórios gerado.",
  "reports.builder.audienceLabel": "\nPúblico",
  "reports.builder.audience.risk": "\nRisco e garantia",
  "reports.builder.focusLabel": "\nFoco",
  "reports.builder.sectionsLabel": "\nSeções",
  "reports.builder.sectionsHint": "\nSelecione pelo menos uma seção de relatório para incluir.",
  "reports.builder.includeNarrative": "\nGerar resumo narrativo",
  "reports.builder.includeNarrativeHint":
    "\nUsa o provedor de IA configurado e recorre a um resumo determinístico quando indisponível.",
  "reports.builder.includeDrilldowns": "\nIncluir detalhamentos",
  "reports.builder.includeDrilldownsHint":
    "\nAnexe detalhes operacionais em nível de tabela e métricas mais profundas a cada seção selecionada.",
  "reports.builder.guidanceLabel": "\nOrientação",
  "reports.builder.guidanceHint": "\nOrientação opcional que molda a narrativa e a ênfase geradas.",
  "reports.builder.seed.financePlanning.source": "\nPlanejamento Financeiro",
  "reports.builder.seed.financePlanning.alert":
    "\nSemeado de {source}: {title}. Revise o escopo herdado antes de gerar o pack.",
  "reports.builder.seed.financePlanning.title": "\nTransferência de planejamento financeiro",
  "reports.builder.seed.financePlanning.description":
    "\nEsta sessão do construtor foi pré-carregada a partir de um cenário financeiro para que o pacote de relatórios possa reutilizar o contexto de planejamento aprovado.",
  "reports.builder.seed.financePlanning.scopeLabel": "\nEscopo",
  "reports.builder.seed.financePlanning.horizonLabel": "\nHorizonte",
  "reports.builder.seed.financePlanning.horizonValue": "\n{months} meses",
  "reports.builder.seed.financePlanning.guidanceLabel": "\nOrientação herdada",
  "reports.builder.generate": "\nGerar pacote de relatórios",
  "reports.builder.loadDataset": "\nCarregar conjunto de dados",
  "reports.builder.loadDatasetAria": "\nCarregue o conjunto de dados {name} no construtor",
  "reports.builder.loadTemplate": "\nCarregar modelo",
  "reports.builder.loadTemplateAria": "\nCarregar modelo {name} no construtor",
  "reports.builder.loadCurrentPack": "\nCarregar pacote atual",
  "reports.builder.loadCurrentPackAria": "\nCarregue o pacote atual {name} no construtor",
  "reports.builder.loadSection": "\nCarregar seção",
  "reports.builder.loadSectionAria": "\nCarregar seção {name} no construtor",
  "reports.builder.loadDrilldown": "\nCarregar detalhamento",
  "reports.builder.loadDrilldownAria": "\nCarregar detalhamento {name} no construtor",
  "reports.builder.loadedDataset": "\nConstrutor atualizado a partir do conjunto de dados {name}.",
  "reports.builder.loadedTemplate": "\nConstrutor atualizado a partir do modelo {name}.",
  "reports.builder.loadedSection": "\nConstrutor focado na seção {name}.",
  "reports.builder.loadedPack": "\nBuilder atualizado a partir do pacote de relatórios {name}.",
  "reports.builder.audience.finance": "\nFinanças",
  "reports.builder.audience.operations": "\nOperações",
  "reports.builder.audience.executive": "\nExecutivo",
  "reports.templates.saveTitle": "\nSalvar o construtor atual como template",
  "reports.templates.saveDescription":
    "\nPersistir o mix de seções, público-alvo e opções de relatório atuais como um pacote reutilizável.",
  "reports.templates.nameLabel": "\nNome do modelo",
  "reports.templates.descriptionLabel": "\nDescrição",
  "reports.templates.saveAction": "\nSalvar modelo",
  "reports.templates.error.invalid":
    "\nModelo inválido. Nome e pelo menos uma seção são obrigatórios.",
  "reports.templates.error.saveFailed": "\nFalha ao salvar o modelo. Por favor, tente novamente.",
  "reports.builder.focus.financial": "\nFinanceiro",
  "reports.builder.focus.operations": "\nOperações",
  "reports.builder.focus.risk": "\nRisco",
  "reports.builder.focus.executive": "\nExecutivo",
  "reports.custom.sectionsTitle": "Seções disponíveis",
  "reports.custom.previewTitle": "\nEspaço de trabalho de relatório ativo",
  "reports.custom.previewDescription":
    "\nPacote de relatórios renderizados pelo servidor com narrativa, análise de seção e dados detalhados em tempo real.",
  "reports.custom.error.invalid":
    "\nSelecione pelo menos uma seção do relatório para gerar um pacote personalizado.",
  "reports.custom.generatedTitleSingle": "Para {audience}: {primarySection}",
  "reports.custom.generatedTitlePair": "Para {audience}: {primarySection} e {secondarySection}",
  "reports.custom.fallbackNarrativeIntro":
    "\nA cobertura abrange {count} seções para o público {audience} com foco {focus}.",
  "reports.custom.narrativeDisabled":
    "\nA síntese narrativa está desativada para esta compilação de relatório.",
  "reports.custom.workspaceEmpty":
    "\nExecute um modelo ou escolha seções para montar um pacote de relatórios ao vivo.",
  "reports.custom.fallbackNarrativeGuidance": "\nOrientação do operador: {guidance}.",
  "reports.custom.section.depreciation":
    "\nA exposição à depreciação é de {adjustedExposure} em {totalAssets} ativos.",
  "reports.custom.section.assets":
    "\n{criticalAssets} ativos críticos são distribuídos entre {totalTypes} tipos de ativos rastreados.",
  "reports.custom.section.predictions":
    "\n{predictionsDue} janelas de previsão serão lançadas em breve, incluindo {criticalCount} sinais críticos.",
  "reports.custom.section.utilisation":
    "\nA utilização média é de {utilisationRate} em {assetCount} ativos ativos.",
  "reports.custom.section.executive":
    "\n{activeTasks} tarefas abertas e {openDocuments} documentos operacionais permanecem ativos em fluxos de trabalho de entrega e receita.",
  "reports.custom.section.estateOperational":
    "\n{criticalSignals} os sinais de risco imobiliário permanecem ativos, a prontidão da capacidade é {readiness} e {delayed} as aprovações do(s) projeto(s) estão atrasadas.",
  "reports.custom.section.strategicDecision":
    "\nA inteligência de decisão estratégica é atualmente liderada por {focus}, com {riskCount} sinais de risco de infraestrutura e {investmentCount} sinais de pressão de investimento.",
  "reports.custom.section.workOrders":
    "\n{breachedCount} as ordens de serviço estão fora do SLA, a produtividade média é {productivityRate} e o custo de mitigação é {mitigationCost}.",
  "reports.custom.section.purchaseOrders":
    "\n{overdueCount} pedidos de compra estão vencidos e o prazo médio de entrega é de {avgLeadDays} dias.",
  "reports.custom.section.customerOrders":
    "\n{fulfilmentCount} pedidos de clientes estão em processamento e {convertedCount} foram originados de RFQs.",
  "reports.custom.section.invoices":
    "\n{overdueCount} faturas vencidas e {outstandingAmount} ainda pendentes.",
  "reports.custom.section.rfqs":
    "\n{convertedCount} RFQs foram convertidos em pedidos e {quotedCount} permanecem na fase de cotação.",
  "reports.drilldown.band.overloaded": "\nSobrecarregado",
  "reports.drilldown.band.watch": "\nAssistir",
  "reports.drilldown.band.stable": "\nEstável",
  "reports.drilldown.depreciationTitle": "\nDetalhamento da exposição à depreciação",
  "reports.drilldown.depreciationDescription":
    "\nConcentração de valor máximo, condição atual e sinais de gravidade mais recentes para ativos sensíveis à depreciação.",
  "reports.drilldown.assetsTitle": "\nDetalhamento da composição do ativo",
  "reports.drilldown.assetsDescription":
    "\nComposição do portfólio por local, tipo, condição e concentração do valor contábil atual.",
  "reports.drilldown.predictionsTitle": "Detalhamento da pressão de previsão",
  "reports.drilldown.predictionsDescription":
    "\nEventos de previsão recentes com gravidade, confiança e contexto de vida restante.",
  "reports.drilldown.utilisationTitle": "\nDetalhamento da intensidade de utilização",
  "reports.drilldown.utilisationDescription":
    "\nPostura de utilização alinhada ao espaço de trabalho em todo o portfólio atual com site, tipo de ativo e contexto de carga atual.",
  "reports.drilldown.maxUtilisation": "\nUtilização máxima",
  "reports.drilldown.bandTitle": "\nPostura",
  "reports.drilldown.executiveTitle": "\nDetalhamento da pressão executiva",
  "reports.drilldown.executiveDescription":
    "\nSinais de pressão operacional abrangendo backlog de manutenção, exposição de previsão, fluxo de documentos e valor do portfólio.",
  "reports.drilldown.estateOperationalTitle": "\nDetalhamento da imagem operacional da propriedade",
  "reports.drilldown.estateOperationalDescription":
    "\nPostura integrada em nível de propriedade em relação à condição, ciclo de vida, prontidão, inspeções, aprovações de projetos e pressão de entrega.",
  "reports.drilldown.strategicDecisionTitle":
    "\nDetalhamento de inteligência de decisão estratégica",
  "reports.drilldown.strategicDecisionDescription":
    "\nRastreie a exposição do ciclo de vida, o risco de infraestrutura, a demanda preditiva, o desempenho operacional e o foco em investimentos a partir de um pacote de inteligência estratégica.",
  "reports.drilldown.workOrdersTitle": "\nDetalhamento do rendimento da ordem de serviço",
  "reports.drilldown.workOrdersDescription":
    "\nOrdens de serviço recentes com escopo regional, mix de atividades, postura de produtividade, status de mitigação e custo de execução rastreado.",
  "reports.drilldown.purchaseOrdersTitle": "\nDetalhamento da antiguidade do pedido de compra",
  "reports.drilldown.purchaseOrdersDescription":
    "\nPedidos de compra recentes com propriedade do fornecedor, vencimento, status de entrega e valor comercial comprometido.",
  "reports.drilldown.customerOrdersTitle": "\nDetalhamento do funil de pedido do cliente",
  "reports.drilldown.customerOrdersDescription":
    "\nPedidos recentes de clientes com status de atendimento, volume de ordens de serviço vinculadas e valor reservado.",
  "reports.drilldown.invoicesTitle": "\nDetalhamento do vencimento da fatura",
  "reports.drilldown.invoicesDescription":
    "\nFaturas recentes com propriedade do cliente, postura devida, valor pendente e movimentação de pagamento.",
  "reports.drilldown.rfqsTitle": "\nDetalhamento de conversão de RFQ",
  "reports.drilldown.rfqsDescription":
    "\nRFQs recentes com estágio comercial, orçamento declarado e visibilidade de conversão de pedido downstream.",
  "reports.drilldown.empty.workOrders":
    "\nNenhuma ordem de serviço está disponível para detalhamento.",
  "reports.drilldown.empty.estateOperational":
    "\nNenhum sinal de imagem operacional da propriedade está disponível para detalhamento.",
  "reports.drilldown.empty.strategicDecision":
    "\nNenhum sinal de inteligência de decisão estratégica está disponível para detalhamento.",
  "reports.drilldown.empty.purchaseOrders":
    "\nNenhum pedido de compra está disponível para detalhamento.",
  "reports.drilldown.empty.customerOrders":
    "\nNenhum pedido de cliente está disponível para detalhamento.",
  "reports.drilldown.empty.invoices": "\nNenhuma fatura está disponível para detalhamento.",
  "reports.drilldown.empty.rfqs": "Nenhuma RFQ está disponível para detalhamento.",
  "reports.drilldown.outlookTitle": "\nPerspectiva",
  "reports.drilldown.noteTitle": "\nNota",
  "reports.drilldown.executive.openDocumentsNote":
    "\n{count} documentos operacionais permanecem ativos: {rfqs} RFQs, {customerOrders} pedidos de clientes, {workOrders} ordens de serviço, {purchaseOrders} pedidos de compra e {invoices} faturas.",
  "reports.drilldown.executive.openDocumentsClear":
    "\nNenhum documento operacional está aberto no momento.",
  "reports.drilldown.executive.bookValueNote":
    "\nA utilização média em toda a propriedade é atualmente {rate}.",
  "reports.drilldown.estateOperational.row.condition": "\nCondição do imóvel",
  "reports.drilldown.estateOperational.row.lifecycle": "\nRisco de ciclo de vida",
  "reports.drilldown.estateOperational.row.readiness": "\nProntidão para treinamento",
  "reports.drilldown.estateOperational.row.inspection": "\nInspeção e mão de obra",
  "reports.drilldown.estateOperational.row.approvals": "\nAprovações de projetos",
  "reports.drilldown.estateOperational.row.delivery": "\nEntrega do projeto",
  "reports.drilldown.strategicDecision.row.lifecycle": "\nAnálise do ciclo de vida dos ativos",
  "reports.drilldown.strategicDecision.row.infrastructure":
    "\nAvaliação de risco de infraestrutura",
  "reports.drilldown.strategicDecision.row.predictive": "\nModelagem de manutenção preditiva",
  "reports.drilldown.strategicDecision.row.performance": "\nAnálise de desempenho operacional",
  "reports.drilldown.strategicDecision.row.investment": "\nPriorização de investimento",
  "reports.drilldown.estateOperational.value.condition":
    "\n{critical} crítico em {total} ativos rastreados",
  "reports.drilldown.estateOperational.value.lifecycle":
    "\n{critical} sinais críticos • {due} previsto para breve",
  "reports.drilldown.estateOperational.value.readiness": "\n{ready} de {total} capacidades prontas",
  "reports.drilldown.estateOperational.value.inspection": "\n{count} inspeções atrasadas",
  "reports.drilldown.estateOperational.value.approvals": "\n{delayed} atrasado • {queue} na fila",
  "reports.drilldown.estateOperational.value.delivery":
    "\n{highRisk} alto risco • {conflicts} conflito(s)",
  "reports.drilldown.strategicDecision.value.lifecycle":
    "\n{count} ativo(s) de observação do ciclo de vida atualmente representam {rate} da base imobiliária.",
  "reports.drilldown.strategicDecision.value.infrastructure":
    "\n{count} sinais de risco de infraestrutura atualmente representam {rate} da base imobiliária.",
  "reports.drilldown.strategicDecision.value.predictive":
    "\n{count} sinais de manutenção preditiva estão ativos, incluindo {critical} previsões críticas.",
  "reports.drilldown.strategicDecision.value.performance":
    "\nA prontidão da capacidade é {readiness} e a produtividade é {productivity} unidades de produção por hora de trabalho.",
  "reports.drilldown.strategicDecision.value.investment":
    "\n{count} sinais de pressão de investimento estão ativos, liderados por {focus}.",
  "reports.drilldown.estateOperational.note.condition":
    "\n{watch} ativos estão em estágios de monitoramento ou fadiga do ciclo de vida.",
  "reports.drilldown.estateOperational.note.lifecycle":
    "\n{initiatives} iniciativas estratégicas permanecem no registro do programa imobiliário.",
  "reports.drilldown.estateOperational.note.readiness":
    "\n{rate} prontidão de intervalo com {constrainedSites} site(s) restrito(s).",
  "reports.drilldown.estateOperational.note.inspection":
    "\n{hours} horas de trabalho registradas na atividade de entrega operacional atual.",
  "reports.drilldown.estateOperational.note.approvals":
    "\n{projects} projeto(s) atualmente registrado(s) na carteira imobiliária.",
  "reports.drilldown.estateOperational.note.delivery":
    "\n{count} sinais agregados de pressão de investimento estão ativos.",
  "reports.drilldown.strategicDecision.note.lifecycle":
    "\n{total} o(s) ativo(s) total(is) está(ão) representado(s) na base estratégica atual.",
  "reports.drilldown.strategicDecision.note.infrastructure":
    "\n{constrained} locais restritos e {inspections} inspeções atrasadas ainda contribuem para o risco de infraestrutura.",
  "reports.drilldown.strategicDecision.note.predictive":
    "{due} previsão(ões) serão lançadas em breve, representando {rate} da base imobiliária.",
  "reports.drilldown.strategicDecision.note.performance":
    "\n{focus} é atualmente a principal área de observação de desempenho, com {mitigationCost} vinculada à atividade de mitigação.",
  "reports.drilldown.strategicDecision.note.investment":
    "\n{delayed} aprovações atrasadas e {projects} sinais de pressão de entrega do projeto permanecem ativos.",
  "reports.drilldown.open": "\nAbrir detalhamento",
  "reports.drilldown.openAria": "\nVer detalhamento de {label}",
  "reports.drilldown.tableAria": "\nDados detalhados para {title}",
  "reports.drilldown.consoleEyebrow": "\nConsole de detalhamento",
  "reports.drilldown.consoleDescription":
    "\nPasse de métricas de resumo para linhas operacionais, sinais de concentração e detalhes prontos para ação.",
  "reports.drilldown.consoleTitle": "\nConsole de detalhamento",
  "reports.custom.sourceAi": "\nNarrativa de IA",
  "reports.custom.sourceSystem": "\nResumo baseado em regras",
  "reports.custom.provenance.financePlanning": "\nSemeado do Planejamento Financeiro",
  "reports.custom.provenance.summary":
    "\nSemeado de {title} para {scope} em um horizonte de planejamento de {months} meses.",
  "reports.custom.templateApplied": "\nModelo: {name}",
  "reports.custom.coverageTitle": "\nPontuação de cobertura",
  "reports.custom.coverageDescription": "\n{count} seções estão incluídas neste pacote.",
  "reports.custom.tablePreview":
    "\nMostrando {visible} de {total} linhas nesta visualização da seção.",
  "reports.custom.guidanceApplied": "\nOrientação aplicada: {guidance}",
  "reports.custom.narrativeTitle": "\nResumo narrativo",
  "reports.templates.libraryTitle": "\nBiblioteca de modelos",
  "reports.templates.libraryDescription":
    "\nPacotes de relatórios integrados e salvos que os operadores podem iniciar diretamente no espaço de trabalho de relatório ativo.",
  "reports.templates.badgeBuiltin": "\nIntegrado",
  "reports.templates.badgeCustom": "\nSalvo",
  "reports.templates.badgeNarrative": "\nNarrativa",
  "reports.templates.badgeDrilldowns": "\nDetalhamentos",
  "reports.templates.run": "\nExecute pack",
  "reports.templates.runAria": "\nPacote de execução: {name}",
  "reports.templates.saved": "\nModelo salvo na biblioteca.",
  "utilisation.title": "\nUtilização",
  "utilisation.subtitle":
    "\nCockpit de utilização empresarial para telemetria, sinais de IA e fluxo operacional",
  "utilisation.cockpit.chatContext":
    "\nPágina do cockpit de utilização. Espaço de trabalho unificado para postura de utilização da frota, atualização de telemetria, contexto de previsão de IA, pendências de manutenção, comparação de locais, estatísticas de comando, ações de copiloto de IA, detalhamento de fluxo de trabalho, tabela de classificação de locais, matriz de utilização, fila de ações, quadro de tendências, cronologia e tabela de portfólio classificável. Controles: filtro do site, intervalo de datas, tamanho da página, exportação de CSV e limpeza de filtros.",
  "utilisation.cockpit.hero.eyebrow": "\nCockpit de utilização",
  "utilisation.cockpit.hero.title":
    "\nTelemetria, sinais de IA e fluxo de capacidade em um espaço de trabalho",
  "utilisation.cockpit.hero.description":
    "\nAcompanhe a pressão do local, a capacidade subutilizada, a telemetria obsoleta e o contexto de manutenção em um cockpit de utilização estilo Power BI projetado para tomada de decisões operacionais.",
  "utilisation.cockpit.hero.live": "\nAtualização automática a cada {seconds} segundos",
  "utilisation.cockpit.filters.eyebrow": "\nFiltros",
  "utilisation.cockpit.filters.title": "\nEscopo do espaço de trabalho",
  "utilisation.cockpit.filters.description":
    "Filtre o cockpit por local e janela de tempo, ajuste a densidade da tabela e exporte a visão analítica atual.",
  "utilisation.cockpit.filters.exportDescription":
    "\nExporta o portfólio de utilização filtrado atual em formato CSV.",
  "utilisation.cockpit.legend.eyebrow": "\nBandas de apresentação",
  "utilisation.cockpit.legend.title": "\nLeia as faixas de postura",
  "utilisation.cockpit.legend.description":
    "\nCada ativo é classificado em uma postura operacional determinística para que os mesmos limites conduzam os cartões, o enfileiramento e a tabela de portfólio.",
  "utilisation.cockpit.legend.optimal":
    "\nAtivos operando na faixa de utilização preferencial com carga balanceada e cobertura de telemetria saudável.",
  "utilisation.cockpit.legend.watch":
    "\nTendência de ativos fora da faixa preferida e que vale a pena monitorar antes que se transformem em pontos de pressão.",
  "utilisation.cockpit.legend.under":
    "\nAtivos operando abaixo da faixa-alvo, indicando capacidade ociosa ou possível desequilíbrio de demanda.",
  "utilisation.cockpit.legend.over":
    "\nAtivos operando acima do limite e com maior probabilidade de precisar de alívio de carga, inspeção ou realocação.",
  "utilisation.cockpit.actions.eyebrow": "\nFluxos de trabalho conectados",
  "utilisation.cockpit.actions.title": "\nMantenha o fluxo em movimento",
  "utilisation.cockpit.actions.description":
    "\nPasse diretamente da postura de utilização para os fluxos de trabalho que explicam ou resolvem a pressão de capacidade.",
  "utilisation.cockpit.actions.predictions":
    "\nRevise as previsões de IA e os sinais de vida restante que afetam ativos quentes ou instáveis.",
  "utilisation.cockpit.actions.tasks":
    "\nLimpar atrasos de manutenção e trabalho atrasado vinculado à pressão de utilização.",
  "utilisation.cockpit.actions.reports":
    "\nGere relatórios prontos para as partes interessadas a partir do mesmo conjunto de dados de utilização.",
  "utilisation.filters.title": "\nFiltros de portfólio",
  "utilisation.filters.description":
    "\nAplique alterações de site, janela de tempo e tamanho de página antes de atualizar o registro de utilização.",
  "utilisation.filters.batchMode": "\nFiltros em lote",
  "utilisation.filters.applyHint":
    "\nUse Aplicar filtros para atualizar a faixa de resumo, registro e inspetor juntos.",
  "utilisation.cockpit.briefing.title": "\nResumo de utilização",
  "utilisation.cockpit.briefing.eyebrow": "\nResumo do portfólio",
  "utilisation.cockpit.briefing.headlineDemand":
    "\nA pressão da demanda está se agrupando em torno de um pequeno conjunto de ativos",
  "utilisation.cockpit.briefing.headlineCapacity":
    "\nA capacidade ociosa é visível em todo o portfólio atual",
  "utilisation.cockpit.briefing.headlineData":
    "\nA atualização da telemetria está limitando a imagem de utilização",
  "utilisation.cockpit.briefing.headlineBalanced":
    "\nA postura de utilização está amplamente equilibrada em todo o escopo atual",
  "utilisation.cockpit.briefing.summary":
    "\nPara {site} acima de {period}, a utilização média da frota é {average}. A telemetria atualmente cobre {telemetry} ativos, com {over} funcionando muito bem e {under} mostrando capacidade ociosa.",
  "utilisation.cockpit.briefing.recommendationTitle": "\nPróximo movimento recomendado",
  "utilisation.cockpit.briefing.recommendationPortfolio":
    "Nenhum ativo domina a fila no momento. Mantenha a telemetria atualizada em {site} e concentre-se em manter uma cobertura equilibrada.",
  "utilisation.cockpit.briefing.recommendationAsset":
    '\nPriorize {asset} em seguida. Atualmente é o candidato mais forte para "{action}" com base na postura de utilização, contexto de sinal de IA e backlog de trabalho ativo.',
  "utilisation.cockpit.generatedAt": "\nGerado {date}",
  "utilisation.cockpit.datasets.title": "\nCobertura do conjunto de dados",
  "utilisation.cockpit.datasets.description":
    "\nO cockpit combina telemetria, contexto de previsão de IA e sinais de execução de trabalho em uma superfície de decisão.",
  "utilisation.cockpit.datasets.assetsTitle": "\nAtivos no escopo",
  "utilisation.cockpit.datasets.assetsDescription":
    "\n{sites} sites representados no portfólio filtrado atual",
  "utilisation.cockpit.datasets.telemetryTitle": "\nLeituras de telemetria",
  "utilisation.cockpit.datasets.telemetryDescription":
    "\n{count} ativos com telemetria no período selecionado",
  "utilisation.cockpit.datasets.aiTitle": "\nSinais apoiados por IA",
  "utilisation.cockpit.datasets.aiDescription":
    "\n{due} ativos com vencimento em breve com base na previsão de vida útil restante",
  "utilisation.cockpit.datasets.tasksTitle": "\nAbrir itens de trabalho",
  "utilisation.cockpit.datasets.tasksDescription":
    "\n{overdue} tarefas atrasadas estão afetando o fluxo de capacidade",
  "utilisation.cockpit.command.coverageTitle": "\nCobertura de telemetria",
  "utilisation.cockpit.command.coverageDescription":
    "\n{covered} coberto • {blind} pontos cegos • {stale} feeds obsoletos",
  "utilisation.cockpit.command.aiTitle": "\nCobertura de IA",
  "utilisation.cockpit.command.aiDescription":
    "\n{signals} ativos com sinais de IA • {due} previsto para breve",
  "utilisation.cockpit.command.pressureTitle": "\nAtivos de pressão",
  "utilisation.cockpit.command.pressureDescription":
    "\n{hot} quente • {under} subutilizado • {stale} obsoleto",
  "utilisation.cockpit.command.documentsTitle": "\nAbrir fluxo de documentos",
  "utilisation.cockpit.command.documentsDescription":
    "\n{workOrders} ordens de serviço e {documents} total de documentos vinculados permanecem ativos.",
  "utilisation.cockpit.kpi.averageTitle": "\nMédia da frota",
  "utilisation.cockpit.kpi.averageDescription":
    "\nUtilização média em todo o portfólio filtrado, normalizada em uma escala operacional de 0 a 100.",
  "utilisation.cockpit.kpi.optimalTitle": "\nAtivos ideais",
  "utilisation.cockpit.kpi.optimalDescription":
    "\nAtivos operando dentro da faixa de utilização preferencial.",
  "utilisation.cockpit.kpi.warningTitle": "\nAtivos da lista de observação",
  "utilisation.cockpit.kpi.warningDescription":
    "\n{under} subutilizado e {watch} fora da banda preferida, mas ainda não crítico.",
  "utilisation.cockpit.kpi.criticalTitle": "\nAtenção crítica",
  "utilisation.cockpit.kpi.criticalDescription":
    "\n{over} esquentando e {stale} com telemetria ausente ou obsoleta.",
  "utilisation.inspector.summary.pressureBadge": "\n{count} exceções ativas",
  "utilisation.inspector.summary.telemetryBadge": "\n{count} exceções de telemetria",
  "utilisation.inspector.summary.averageHint":
    "\nMédia atual do portfólio em todo o escopo de utilização filtrado.",
  "utilisation.inspector.summary.exceptionTitle": "\nExceções",
  "utilisation.inspector.summary.exceptionHint":
    "\n{over} ativos de telemetria sobrecarregados, {under} subutilizados e {stale} obsoletos estão ativos.",
  "utilisation.inspector.summary.coverageHint":
    "\n{blind} pontos cegos e feeds obsoletos de {stale} ainda limitam a confiança.",
  "utilisation.cockpit.posture.optimal": "\nÓtimo",
  "utilisation.cockpit.posture.watch": "\nAssistir",
  "utilisation.cockpit.posture.under": "\nSubutilizado",
  "utilisation.cockpit.posture.over": "\nSobrecarregado",
  "utilisation.cockpit.site.title": "\nTabela de classificação do site",
  "utilisation.cockpit.site.description":
    "\nCompare a postura do local por utilização média, cobertura de telemetria ao vivo e combinação de pressão.",
  "utilisation.cockpit.site.empty":
    "Nenhum dado de desempenho do site está disponível para os filtros atuais.",
  "utilisation.cockpit.site.meta": "\n{assets} ativos • {telemetry} com telemetria",
  "utilisation.cockpit.site.share": "\n{share} de ativos visíveis",
  "utilisation.cockpit.site.over": "\n{count} quente",
  "utilisation.cockpit.site.under": "\n{count} subutilizado",
  "utilisation.cockpit.site.watch": "\n{count} assistir",
  "utilisation.cockpit.site.optimal": "\n{count} ideal",
  "utilisation.cockpit.queue.title": "\nFila de ações",
  "utilisation.cockpit.queue.description":
    "\nAtivos classificados por pressão, atualização de telemetria, gravidade do sinal de IA e trabalho operacional não resolvido.",
  "utilisation.cockpit.queue.empty":
    "\nNenhum item da fila de ação de utilização está ativo no momento.",
  "utilisation.cockpit.queue.current": "\nAtual {current} • Média {average}",
  "utilisation.cockpit.queue.tasks": "\n{open} tarefas abertas • {overdue} atrasadas",
  "utilisation.cockpit.queue.lifeUnknown":
    "\nNenhuma previsão de vida útil restante está anexada a este ativo.",
  "utilisation.cockpit.queue.lifeValue": "\n{days} dias restantes de vida",
  "utilisation.cockpit.queue.telemetryMissing":
    "\nNenhuma telemetria ao vivo está disponível no momento.",
  "utilisation.cockpit.queue.telemetryFresh": "\nTelemetria mais recente {date}",
  "utilisation.cockpit.mix.title": "\nMistura de postura",
  "utilisation.cockpit.mix.description":
    "\nVeja como o portfólio de ativos visíveis se distribui pelas faixas de postura operacional.",
  "utilisation.cockpit.mix.empty":
    "\nNenhuma combinação de posturas está disponível para o portfólio atual.",
  "utilisation.cockpit.mix.assetCount": "\n{count} ativos",
  "utilisation.cockpit.mix.average": "\nMédia {value}",
  "utilisation.cockpit.matrix.title": "\nMatriz de utilização",
  "utilisation.cockpit.matrix.description":
    "\nUma grade de foco equilibrada entre ativos sobrecarregados, subutilizados, sob vigilância e ótimos, classificados por materialidade operacional.",
  "utilisation.cockpit.matrix.empty":
    "\nNenhum ativo de matriz de utilização está disponível para os filtros atuais.",
  "utilisation.cockpit.matrix.average": "\nMédia {value}",
  "utilisation.cockpit.copilot.title": "\nCopiloto de IA",
  "utilisation.cockpit.copilot.description":
    "\nTransforme o escopo atual em um resumo executivo, uma revisão de confiança de dados ou um plano de intervenção sem sair do cockpit.",
  "utilisation.cockpit.copilot.focus": "\nFoco atual",
  "utilisation.cockpit.copilot.brief": "\nEscreva um resumo",
  "utilisation.cockpit.copilot.briefPrompt":
    "\nEscreva um resumo de utilização executiva para {site} em vez de {period}. Destaque a utilização média {average}, {over} ativos sobrecarregados, {under} ativos subutilizados e {stale} feeds de telemetria obsoletos. Recomendar as próximas ações operacionais.",
  "utilisation.cockpit.copilot.data": "\nVerifique a confiança dos dados",
  "utilisation.cockpit.copilot.dataPrompt":
    "\nAvalie a qualidade dos dados para o espaço de trabalho de utilização atual. Existem {covered} ativos com telemetria, {blind} sem telemetria e {stale} feeds obsoletos. Explique quanta confiança os operadores devem depositar neste cockpit e quais lacunas de dados devem ser corrigidas primeiro.",
  "utilisation.cockpit.copilot.intervention": "\nProjeto de plano de intervenção",
  "utilisation.cockpit.copilot.interventionPromptAsset":
    "Elaborar um plano de intervenção para o ativo {asset} em {site}. A utilização atual é {current}, a média é {average}, a postura é {posture}, a ação recomendada é {action}, há {open} tarefas abertas e {overdue} tarefas atrasadas e a vida útil restante é {life}.",
  "utilisation.cockpit.copilot.interventionPromptPortfolio":
    "\nElabore um plano de intervenção em nível de portfólio para {site} em vez de {period}. Concentre-se em ativos de telemetria sobrecarregados, subutilizados e obsoletos e sequencie as próximas ações.",
  "utilisation.cockpit.workflow.title": "\nAcompanhamento entre sistemas",
  "utilisation.cockpit.workflow.description":
    "\nPasse da postura de utilização para sistemas que explicam o risco, esclarecem o trabalho ou empacotam a história para as partes interessadas.",
  "utilisation.cockpit.workflow.predictionsMeta":
    "\n{signals} ativos garantidos por sinal • {due} com vencimento em breve",
  "utilisation.cockpit.workflow.tasksMeta": "\n{open} tarefas abertas • {overdue} atrasadas",
  "utilisation.cockpit.workflow.reportsMeta":
    "\n{blind} pontos cegos de telemetria • {documents} documentos abertos",
  "utilisation.cockpit.workflow.fleetMeta":
    "\n{vehicles} ativos em movimento • {backlog} tarefas abertas",
  "utilisation.cockpit.workflow.sensorsMeta":
    "\n{blind} pontos cegos de telemetria • {stale} feeds obsoletos",
  "utilisation.cockpit.workflow.buildingsMeta":
    "\n{sites} sites ativos • {signals} ativos apoiados por IA",
  "utilisation.cockpit.trend.title": "\nQuadro de tendências",
  "utilisation.cockpit.trend.description":
    "\nOs pontos de tendência de utilização diária ajudam os operadores a detectar desvios, volatilidade e densidade de amostragem ao longo do tempo.",
  "utilisation.cockpit.trend.empty":
    "\nNenhum ponto de tendência de utilização está disponível para a janela de tempo atual.",
  "utilisation.cockpit.trend.samples": "\n{count} amostras de telemetria",
  "utilisation.cockpit.trend.low": "\nBaixo {value}",
  "utilisation.cockpit.trend.high": "\nAlto {value}",
  "utilisation.cockpit.chronology.title": "\nCronologia de utilização",
  "utilisation.cockpit.chronology.description":
    "\nEventos recentes de telemetria fornecem uma trilha de auditoria rápida de como a postura atual foi observada.",
  "utilisation.cockpit.chronology.empty":
    "\nNenhuma cronologia de telemetria está disponível para o escopo do filtro atual.",
  "utilisation.cockpit.chronology.value": "\nObservado {value}",
  "utilisation.cockpit.table.title": "\nPortfólio de utilização",
  "utilisation.cockpit.table.description":
    "\nVisualização do portfólio classificável combinando utilização atual, direção da tendência, contexto do sinal de IA e pressão da fila.",
  "utilisation.cockpit.table.live": "\nMesa ao vivo",
  "utilisation.cockpit.table.asset": "\nAtivo",
  "utilisation.cockpit.table.current": "\nAtual",
  "utilisation.cockpit.table.trend": "\nTendência",
  "utilisation.cockpit.table.signal": "\nSinal",
  "utilisation.cockpit.table.queue": "\nFila",
  "utilisation.cockpit.table.average": "\nMédia {value}",
  "utilisation.cockpit.table.trendValue": "Tendência {direction} {value}",
  "utilisation.cockpit.table.trendUp": "\nAcima",
  "utilisation.cockpit.table.trendDown": "\nBaixo",
  "utilisation.cockpit.table.trendFlat": "\nPlano",
  "utilisation.cockpit.table.tasksValue": "\n{count} abrir tarefas",
  "utilisation.cockpit.table.queueValue":
    "\n{overdue} vencido • {workOrders} ordens de serviço • {documents} documentos",
  "utilisation.cockpit.table.empty":
    "\nNenhum dado de utilização está disponível para os filtros selecionados. Conecte a telemetria ou amplie a janela de tempo para preencher o portfólio.",
  "utilisation.cockpit.table.emptyAction": "\nVer ativos",
  "utilisation.inspector.title": "\nInterpretação selecionada",
  "utilisation.inspector.subtitle":
    "Revise o ativo ativo, suas exceções atuais e a próxima ação de relatório de um inspetor.",
  "utilisation.inspector.emptyTitle": "\nSelecione um ativo",
  "utilisation.inspector.emptyDescription":
    "\nEscolha uma linha de registro para inspecionar a postura de utilização, motivos de exceção e ações de relatório.",
  "utilisation.inspector.generatedLabel": "\nAtualização do inspetor",
  "utilisation.inspector.assetSubtitle": "{site} • {type} • {condition} • {lifecycle}",
  "utilisation.inspector.stats.signalHint":
    "\n{tasks} tarefas abertas e {workOrders} ordens de serviço ativas estão contribuindo para a recomendação atual.",
  "utilisation.inspector.reasonsTitle": "\nRazões de exceção",
  "utilisation.inspector.aiPrompt":
    "\nResuma a postura de utilização para {asset} em {site}. A utilização atual é {current}, a utilização média é {average} e a ação recomendada atualmente é {action}. Explique as causas prováveis, o risco operacional e a próxima ação de reporte.",
  "utilisation.inspector.tableSubtitle":
    "\nUse o registro como superfície de análise primária; selecione uma linha para atualizar o painel de interpretação à direita.",
  "utilisation.inspector.tableBadge": "\nRegistro dominante",
  "utilisation.inspector.interpretation.noTelemetry":
    "\n{asset} em {site} não é confiável operacionalmente porque não há telemetria atual alimentando a visualização de utilização.",
  "utilisation.inspector.interpretation.staleTelemetry":
    "\n{asset} está mostrando a utilização atual de {current} em relação a uma média de {average}, mas o feed está desatualizado e precisa de confirmação de telemetria antes que os operadores atuem.",
  "utilisation.inspector.interpretation.overloaded":
    "\n{asset} está operando acima da banda preferencial em {current} utilização atual contra uma média de {average}. O alívio da demanda ou a redistribuição da carga de trabalho devem ser revisados a seguir.",
  "utilisation.inspector.interpretation.underused":
    "\n{asset} está funcionando abaixo da banda preferida em {current} utilização atual contra uma média de {average}. A capacidade sobressalente pode estar disponível para redistribuição.",
  "utilisation.inspector.interpretation.watch":
    "\n{asset} está fora da faixa balanceada na utilização atual de {current} contra uma média de {average}. Mantenha a fila sob revisão antes que a exceção endureça.",
  "utilisation.inspector.interpretation.balanced":
    "\n{asset} está atualmente equilibrado em {current} utilização atual em relação a uma média de {average}, sem nenhuma exceção dominante exigindo escalonamento imediato.",
  "utilisation.inspector.reason.noTelemetry":
    "A telemetria ao vivo está faltando, então a postura de utilização é atualmente inferida do contexto operacional parcial.",
  "utilisation.inspector.reason.staleTelemetry":
    "\nA atualização da telemetria está degradada, portanto, a leitura de utilização mais recente precisa de confirmação.",
  "utilisation.inspector.reason.overloaded":
    "\nA utilização está acima da faixa operacional preferencial e pode exigir alívio de demanda.",
  "utilisation.inspector.reason.underused":
    "\nA utilização está abaixo da faixa operacional preferencial e pode indicar capacidade ociosa.",
  "utilisation.inspector.reason.watch":
    "\nA utilização está fora da faixa balanceada e deve permanecer na lista de observação.",
  "utilisation.inspector.reason.remainingLife":
    "\nA postura de vida restante da IA caiu para {days} dias e deve ser considerada nas próximas ações.",
  "utilisation.inspector.reason.overdueTasks":
    "\n{count} tarefas de manutenção atrasadas ainda estão abertas para este ativo.",
  "utilisation.inspector.reason.workOrders":
    "\n{count} ordens de serviço ativas já estão vinculadas a este ativo.",
  "utilisation.inspector.reason.documents":
    "\n{count} documentos vinculados permanecem abertos em todo o fluxo de trabalho comercial.",
  "utilisation.inspector.reason.none":
    "\nNenhuma exceção dominante está ativa além da postura de utilização atual.",
  "utilisation.cockpit.csv.asset": "\nAtivo",
  "utilisation.cockpit.csv.site": "\nLocal",
  "utilisation.cockpit.csv.type": "\nTipo",
  "utilisation.cockpit.csv.condition": "\nCondição",
  "utilisation.cockpit.csv.lifecycle": "\nCiclo de vida",
  "utilisation.cockpit.csv.current": "\nUtilização atual",
  "utilisation.cockpit.csv.average": "\nUtilização média",
  "utilisation.cockpit.csv.trend": "\nTendência delta",
  "utilisation.cockpit.csv.posture": "\nPostura",
  "utilisation.cockpit.csv.latestTelemetry": "\nTelemetria mais recente",
  "utilisation.cockpit.csv.telemetrySamples": "\nAmostras de telemetria",
  "utilisation.cockpit.csv.severity": "\nGravidade da IA",
  "utilisation.cockpit.csv.confidence": "\nConfiança em IA",
  "utilisation.cockpit.csv.remainingLifeDays": "\nDias de vida restantes",
  "utilisation.cockpit.csv.openTasks": "\nAbrir tarefas",
  "utilisation.cockpit.csv.overdueTasks": "\nTarefas atrasadas",
  "utilisation.cockpit.csv.activeWorkOrders": "\nOrdens de serviço ativas",
  "utilisation.cockpit.csv.openDocuments": "\nDocumentos abertos",
  "utilisation.cockpit.csv.recommendedAction": "\nAção recomendada",
  "utilisation.cockpit.action.connectData": "\nConectar telemetria",
  "utilisation.cockpit.action.refreshTelemetry": "\nAtualizar telemetria",
  "utilisation.cockpit.action.inspectAsset": "\nInspecionar ativo",
  "utilisation.cockpit.action.relieveDemand": "\nAliviar a demanda",
  "utilisation.cockpit.action.clearBacklog": "\nLimpar pendências",
  "utilisation.cockpit.action.redeployCapacity": "\nReimplantar capacidade",
  "utilisation.cockpit.action.coordinateWorkOrders": "\nCoordenar ordens de serviço",
  "utilisation.cockpit.action.alignDocuments": "\nAlinhar fluxo de documentos",
  "utilisation.cockpit.action.monitorFlow": "\nMonitorar fluxo",
  "admin.title": "\nCentro de controle administrativo",
  "admin.subtitle":
    "\nEspaço de trabalho empresarial para identidade, locais, IA, integrações corporativas, segurança e governança",
  "admin.audit.at": "\nEm",
  "admin.audit.timestamp": "\nCarimbo de data/hora",
  "admin.audit.actor": "\nAtor",
  "admin.audit.action": "\nAção",
  "admin.audit.entity": "\nEntidade",
  "admin.system.users": "\nUsuários",
  "admin.system.assets": "\nAtivos",
  "admin.system.tasks": "\nTarefas",
  "admin.system.predictions": "\nPrevisões",
  "admin.system.registeredRoutes": "\nRotas Registradas",
  "admin.system.apiRoutes": "\nRotas API",
  "admin.system.htmlRoutes": "\nRotas HTML",
  "admin.system.staticRoutes": "\nRotas estáticas",
  "admin.system.authRoutes": "\nRotas de autenticação",
  "admin.system.databaseConfigured": "\nBanco de dados configurado",
  "admin.system.selfHostedAssets": "\nAtivos auto-hospedados",
  "utilisation.chart.metaTitle": "\nPainel de tendências e resumo",
  "utilisation.chart.summaryLabel": "\nÚltimo agregado de utilização de 24 horas.",
  "utilisation.chart.avgMinMax": "\nMédia {avg}%, Mín. {min}%, Máx. {max}%",
  "finance.depreciation.summary.title": "\nExposição à depreciação",
  "finance.depreciation.summary.description": "\nAvaliação combinada padrão e ajustada por IA",
  "finance.depreciation.summary.totalAssetsDescription": "\nAtivos totais: {count}",
  "finance.depreciation.summary.adjustmentHint": "\nFatores de ajuste de IA aplicados",
  "finance.depreciation.summary.severityCount": "\n{critical} crítico, {warning} aviso",
  "finance.depreciation.summary.delta": "\nDelta de avaliação de IA",
  "finance.depreciation.summary.deltaDescription":
    "\n{amount} variação do valor contábil da linha de base",
  "finance.depreciation.summary.highRiskExposure": "\nExposição de alto risco",
  "finance.depreciation.summary.highRiskExposureDescription":
    "\n{count} ativos em condição crítica ou fatigante",
  "finance.depreciation.summary.adjustmentRate": "\nTaxa de ajuste {rate}",
  "finance.depreciation.mix.assetCount": "\n{count} ativos",
  "finance.depreciation.conditionMix.title": "\nConcentração de condição",
  "finance.depreciation.conditionMix.description":
    "Exposição ao valor contábil agrupada pela condição do ativo circulante.",
  "finance.depreciation.typeMix.title": "\nDigite concentração",
  "finance.depreciation.typeMix.description":
    "\nClasses de ativos de maior valor impulsionando a postura atual de depreciação.",
  "finance.depreciation.topAssets.title": "\nAtivos prioritários",
  "finance.depreciation.topAssets.description":
    "\nAtivos de maior valor com maior impacto de depreciação.",
  "finance.depreciation.topAssets.empty": "\nSem ativos",
  "finance.depreciation.topAssets.aiAdjusted": "\nAjustado por IA",
  "finance.depreciation.table.title": "\nTabela de depreciação",
  "finance.depreciation.table.description":
    "\nValor contábil padrão versus exposição ajustada por IA, estado de condição e sinal de risco em tempo real.",
  "finance.depreciation.table.site": "\nLocal",
  "finance.depreciation.table.type": "\nTipo",
  "finance.depreciation.table.condition": "\nCondição",
  "finance.depreciation.table.signal": "\nSinal",
  "finance.depreciation.table.aiAdjusted": "\nIA ajustada",
  "finance.depreciation.table.variance": "\nVariância",
  "finance.depreciation.stage.acquisition": "\nAquisição",
  "finance.depreciation.stage.activeService": "\nServiço ativo",
  "finance.depreciation.stage.midLife": "\nMeia-vida",
  "finance.depreciation.stage.endOfLife": "\nFim de vida",
  "finance.depreciation.stage.disposal": "\nDescarte",
  "finance.depreciation.stage.lifecycleLabel": "\nEtapas do ciclo de vida do ativo",
  "finance.period.currentQuarter": "\nTrimestre atual",
  "finance.period.lastQuarter": "\nÚltimo trimestre",
  "finance.period.ytd": "\nAno acumulado",
  "finance.period.all": "\nTodos os tempos",
  "finance.tab.overview": "\nVisão geral",
  "finance.tab.depreciation": "\nAnálise de Depreciação",
  "finance.tab.costAnalysis": "\nCusto e avaliação",
  "finance.overview.portfolioValue": "\nValor do portfólio",
  "finance.overview.portfolioDescription": "\nValor contábil total de todos os ativos",
  "finance.overview.aiExposure": "\nExposição ajustada por IA",
  "finance.overview.aiExposureDescription": "\nAvaliação ajustada ao risco",
  "finance.overview.depreciationRate": "\nTaxa de ajuste",
  "finance.overview.depreciationRateDescription": "\nMultiplicador de depreciação baseado em IA",
  "finance.overview.assetCount": "\nAtivos rastreados",
  "finance.overview.assetCountDescription": "\nTotal de ativos sob gestão",
  "finance.overview.byDepMethod": "\nPor Método de Depreciação",
  "finance.overview.byCondition": "\nPor Condição",
  "finance.depMethod.STRAIGHT_LINE": "\nLinha Reta",
  "finance.depMethod.DECLINING_BALANCE": "\nSaldo decrescente",
  "finance.depMethod.UNITS_OF_PRODUCTION": "\nUnidades de Produção",
  "finance.depMethod.AI_ADJUSTED": "\nIA ajustada",
  "finance.costAnalysis.purchaseVsBook": "\nCompra versus valor contábil",
  "finance.costAnalysis.totalPurchasePrice": "\nPreço total de compra",
  "finance.costAnalysis.totalBookValue": "\nValor contábil atual",
  "finance.costAnalysis.totalDepreciation": "\nDepreciação Total",
  "finance.costAnalysis.totalDepreciationDescription": "\nDepreciação total: {amount}",
  "finance.costAnalysis.depreciationPercent": "\nDepreciação %",
  "finance.costAnalysis.topDepreciating": "\nPrincipais ativos depreciados",
  "finance.costAnalysis.topDepreciatingEmpty":
    "\nNão há dados de depreciação disponíveis para os filtros selecionados.",
  "finance.costAnalysis.byLifecycle": "\nPor Estágio do Ciclo de Vida",
  "finance.costAnalysis.avgAge": "\nIdade média dos ativos",
  "finance.costAnalysis.avgAgeDescription": "\nDa data de compra até hoje",
  "finance.costAnalysis.days": "\n{count} dias",
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
  "reports.tab.financial": "\nFinanceiro",
  "reports.tab.operations": "\nOperações",
  "reports.tab.executive": "\nExecutivo",
  "reports.summary.totalReports": "\nRelatórios disponíveis",
  "reports.summary.totalReportsDesc": "\nEm todas as categorias",
  "reports.summary.criticalPredictions": "\nPrevisões Críticas",
  "reports.summary.criticalPredictionsDesc": "\nAfetando avaliações de ativos",
  "reports.summary.totalBookValue": "\nValor contábil total",
  "reports.summary.totalBookValueDesc": "\nAvaliação atual do portfólio",
  "reports.summary.assetCount": "\nAtivos rastreados",
  "reports.summary.assetCountDesc": "\nSob gestão ativa",
  "admin.system.online": "\nSistema on-line",
  "admin.aiSettings.title": "\nProvedor de IA",
  "admin.aiSettings.subtitle":
    "\nDefina o provedor ativo, o status da chave de tempo de execução e o identificador do modelo.",
  "admin.aiSettings.provider": "\nProvedor",
  "admin.aiSettings.apiKey": "\nChave API",
  "admin.aiSettings.apiKeyPlaceholder": "\nDeixe em branco para manter a chave atual",
  "admin.aiSettings.model": "\nModelo",
  "admin.aiSettings.modelPlaceholder": "\nInsira o ID do modelo específico do provedor",
  "admin.aiSettings.save": "\nSalvar configurações",
  "admin.aiSettings.saved": "\nConfigurações salvas e aplicadas a novas solicitações de IA.",
  "admin.aiSettings.current": "\nValor de tempo de execução atual",
  "admin.aiSettings.currentProvider": "\nProvedor atual",
  "admin.aiSettings.currentModel": "\nModelo atual",
  "admin.aiSettings.currentSource": "\nFonte atual",
  "admin.aiSettings.providerPlaceholder": "\nSelecione o provedor",
  "admin.aiSettings.notConfigured": "\nNão configurado",
  "admin.aiSettings.apiKeyConfigured": "\nConfigurado",
  "admin.aiSettings.source.environment": "\nPadrões de ambiente",
  "admin.aiSettings.source.systemConfig": "\nConfiguração do sistema",
  "admin.aiSettings.validation.providerRequired": "\nSelecione um provedor de IA válido.",
  "admin.aiSettings.validation.modelRequired": "\nO identificador do modelo é obrigatório.",
  "admin.aiSettings.saveFailed": "\nNão é possível salvar as configurações de IA no momento.",
  "admin.aiSettings.systemConfigDescription":
    "\nConfigurações de tempo de execução de IA persistentes aplicadas a novas solicitações de IA.",
  "admin.aiSettings.airgappedHint":
    "\nAs implantações airgapped permitem apenas provedores locais de IA, como RamaLama ou Ollama.",
  "admin.aiSettings.airgappedCurrentProviderBlocked":
    "O provedor persistente está fora da política de airgapped. Selecione um provedor local para salvar uma configuração de tempo de execução compatível.",
  "admin.aiSettings.envNote":
    "\nA configuração do sistema substitui os padrões do ambiente para novas solicitações de IA. Defina AI_BASE_URL no ambiente somente quando precisar de um endpoint de provedor personalizado.",
  "admin.section.overview": "\nVisão geral",
  "admin.section.overviewDescription":
    "\nMonitore a identidade, a dependência da plataforma, o tempo de execução da IA e a postura de governança em um plano de controle.",
  "admin.section.users": "\nGerenciamento de usuários",
  "admin.section.usersDescription":
    "\nInspecione, modifique e controle o acesso, as sessões e as preferências do operador.",
  "admin.section.branding": "Branding",
  "admin.section.brandingDescription":
    "Manage default and party-owned brands, domain mappings, metadata, and runtime theme tokens.",
  "admin.section.locations": "\nLocais e borda",
  "admin.section.locationsDescription":
    "\nGerencie locais, área operacional e cobertura de dispositivos em toda a propriedade.",
  "admin.section.ai": "\nOperações de IA",
  "admin.section.aiDescription":
    "\nControle a configuração do tempo de execução e rastreie-a até os conjuntos de dados que alimentam a plataforma.",
  "admin.section.integrations": "\nIntegrações corporativas",
  "admin.section.integrationsDescription":
    "\nRegistre os sistemas de RH, finanças, compras e documentos que permanecem como sistemas externos de registro.",
  "admin.section.security": "\nPostura de segurança",
  "admin.section.securityDescription":
    "\nRevise o acesso baseado em função, a atividade de auditoria e a postura do limite de armazenamento em um espaço de trabalho.",
  "admin.section.governance": "\nGovernança",
  "admin.section.governanceDescription":
    "\nPesquise, exporte e investigue eventos administrativos e de autenticação.",
  "admin.nav.metricDatabaseOnline": "\nBanco de dados on-line",
  "admin.nav.metricDatabaseOffline": "\nBanco de dados off-line",
  "admin.nav.metricUnavailable": "\nIndisponível",
  "admin.nav.usersMetric": "\n{count} usuários • {sessions} sessões ao vivo",
  "admin.nav.brandingMetric": "{count} brands managed",
  "admin.nav.locationsMetric": "\n{count} sites • {devices} dispositivos",
  "admin.nav.aiMetric": "Provedor: {provider} • Modelo: {model}",
  "admin.nav.integrationsMetric": "\n{count} sistemas configurados",
  "admin.nav.securityMetric": "\n{privileged} privilegiado • {events} eventos",
  "admin.nav.governanceMetric": "\n{count} eventos recentes",
  "admin.controlCenter.kicker": "\nAdministração empresarial",
  "admin.controlCenter.description":
    "\nMude da postura imobiliária para detalhes de usuário, localização, IA, integração, segurança e governança sem sair do centro de controle.",
  "admin.summary.activeWorkspace": "\nEspaço de trabalho ativo",
  "admin.summary.aiRuntime": "\nTempo de execução da IA",
  "admin.summary.userSessions": "\nSessões ao vivo",
  "admin.summary.userSessionsHint": "\nSessões simultâneas do operador ativas agora",
  "admin.copilot.title": "\nCopiloto administrador",
  "admin.copilot.description":
    "\nInicie uma investigação, plano de mudança ou briefing do operador no chat usando o contexto atual do espaço de trabalho.",
  "admin.launchpads.title": "\nPlataformas de lançamento do espaço de trabalho",
  "admin.launchpads.description":
    "\nVá diretamente para os espaços de trabalho que possuem acesso, tempo de execução, integrações e postura de auditoria, com métricas ao vivo transportadas para cada via.",
  "admin.launchpads.metricTitle": "\nPostura atual",
  "admin.launchpads.openWorkspace": "\nAbrir espaço de trabalho",
  "admin.navigation.title": "\nCentro de controle",
  "admin.navigation.description":
    "Espaços de trabalho administrativos com links profundos para identidade, integrações, segurança e dependências operacionais.",
  "admin.overview.managedUsers": "\nUsuários gerenciados",
  "admin.overview.managedUsersHint": "\nRegistros de identidade e acesso atualmente no escopo",
  "admin.overview.verifiedIdentities": "\nIdentidades verificadas",
  "admin.overview.verifiedIdentitiesHint": "\n{count} identidades ainda precisam de verificação",
  "admin.overview.edgeFootprint": "\nPegada de borda",
  "admin.overview.edgeFootprintHint": "\n{count} sites ativos conectados à propriedade",
  "admin.overview.auditWindow": "\nGovernança 24h",
  "admin.overview.auditWindowHint":
    "\nAtividade recente de autenticação e alteração no centro de controle",
  "admin.overview.datasetLedger": "\nLivro razão do conjunto de dados de IA",
  "admin.overview.datasetLedgerDescription":
    "\nConjuntos de dados operacionais que alimentam previsões, fluxo de anotações e relatórios.",
  "admin.overview.predictions": "\nPrevisões",
  "admin.overview.annotations": "\nAnotações",
  "admin.overview.savedReports": "\nRelatórios salvos",
  "admin.overview.copilotDescription":
    "\nUse IA para resumir postura, anomalias de superfície ou gerar uma transferência do operador a partir do estado atual do centro de controle.",
  "admin.users.stats.total": "\nTamanho do diretório",
  "admin.users.stats.totalHint": "\nUsuários que correspondem ao diretório atual filter",
  "admin.users.stats.active": "\nAtivo",
  "admin.users.stats.activeHint": "\nUsuários com sessões ao vivo e sem sinal de atenção aberta",
  "admin.users.stats.attention": "\nPrecisa de atenção",
  "admin.users.stats.attentionHint":
    "\nUsuários com riscos de verificação, preferência ou postura de sessão",
  "admin.users.stats.inactive": "\nInativo",
  "admin.users.stats.inactiveHint": "\nUsuários sem sessões ativas no conjunto de resultados atual",
  "admin.users.detailTitle": "\nDiretório de usuário",
  "admin.users.detailDescription":
    "\nSelecione um operador para inspecionar acesso, sessões, preferências e histórico recente de governança.",
  "admin.users.searchLabel": "\nPesquisar usuários",
  "admin.users.searchPlaceholder": "\nPesquise por nome ou e-mail",
  "admin.users.roleFilterLabel": "\nFunção",
  "admin.users.roleAll": "\nTodas as funções",
  "admin.users.activityFilterLabel": "\nAtividade",
  "admin.users.activityAll": "\nTodas as atividades",
  "admin.users.applyFilters": "\nAplicar filtros",
  "admin.users.table.person": "\nPessoa",
  "admin.users.table.access": "\nAcesso",
  "admin.users.table.sessions": "\nSessões",
  "admin.users.table.preferences": "\nPreferências",
  "admin.users.table.signal": "\nSinal",
  "admin.users.activeSessionCount": "\n{count} sessões ativas",
  "admin.users.lastSeenNever": "\nNenhuma atividade de sessão recente",
  "admin.users.chatEnabled": "\nBate-papo ativado",
  "admin.users.chatDisabled": "\nBate-papo desativado",
  "admin.users.notificationsEnabled": "\nNotificações ativadas",
  "admin.users.notificationsDisabled": "\nNotificações silenciadas",
  "admin.users.empty": "\nNenhum usuário correspondeu aos filtros atuais.",
  "admin.users.returnOverview": "\nRetornar à visão geral",
  "admin.users.selectPrompt": "\nSelecione um usuário para abrir o painel de detalhes.",
  "admin.users.detail.activeSessions": "\nSessões ativas",
  "admin.users.detail.activeSessionsHint": "\nEm {count} total de sessões",
  "admin.users.detail.assignedTasks": "\nTarefas atribuídas",
  "admin.users.detail.assignedTasksHint": "\nTrabalho atual de propriedade do operador selecionado",
  "admin.users.detail.approvals": "\nAprovações de documentos",
  "admin.users.detail.approvalsHint":
    "\nOrdens de serviço, pedidos de clientes e pedidos de compra aprovados atribuídos a este operador",
  "admin.users.detail.editTitle": "\nAcesso e preferências",
  "admin.users.detail.editDescription":
    "\nModifique a função, a localidade e a disponibilidade do assistente para o operador selecionado.",
  "admin.users.roleLabel": "\nFunção",
  "admin.users.save": "\nSalvar alterações",
  "admin.users.savedSuccess": "\nAcesso e preferências do usuário atualizados.",
  "admin.users.revokeSessions": "\nRevogar sessões",
  "admin.users.revokeSuccess": "\nTodas as sessões foram revogadas para o operador selecionado.",
  "admin.users.detail.revokeTitle": "\nRedefinição de sessão",
  "admin.users.detail.revokeDescription":
    "\nForçar um novo login no navegador e nas sessões em cache para este operador.",
  "admin.users.detail.sessionsTitle": "\nSessões recentes",
  "admin.users.detail.sessionsDescription":
    "Atividade da última sessão e postura de expiração para o operador selecionado.",
  "admin.users.detail.auditTitle": "\nAtividade recente de governança",
  "admin.users.detail.auditDescription":
    "\nEntradas de auditoria recentes associadas ao operador selecionado.",
  "admin.users.sessionExpiresAt": "\nExpira em {value}",
  "admin.users.sessionsEmpty": "\nNenhuma sessão recente registrada para este operador.",
  "admin.users.signal.privileged": "\nPrivilegiado",
  "admin.users.signal.unverified": "\nNão verificado",
  "admin.users.signal.concurrentSessions": "\nSessões simultâneas",
  "admin.users.signal.preferencesMissing": "\nPreferências ausentes",
  "admin.users.signal.noSessions": "\nSem sessões",
  "admin.users.status.active": "\nAtivo",
  "admin.users.status.attention": "\nPrecisa de atenção",
  "admin.users.status.inactive": "\nInativo",
  "admin.users.error.invalidRole": "\nSelecione uma função válida antes de salvar.",
  "admin.users.error.invalidName": "\nInsira um nome de exibição válido antes de salvar.",
  "admin.users.error.notFound": "\nO usuário selecionado não foi encontrado.",
  "admin.users.error.saveFailed": "\nAs alterações do usuário não puderam ser salvas no momento.",
  "admin.locations.totalSites": "\nSites registrados",
  "admin.locations.totalSitesHint": "\nBases e instalações gerenciadas na plataforma",
  "admin.locations.activeSites": "\nSites ativos",
  "admin.locations.activeSitesHint": "\nSites atualmente marcados como ativos para operações",
  "admin.locations.totalDevices": "\nDispositivos conectados",
  "admin.locations.totalDevicesHint":
    "\nDispositivos de borda mapeados para a propriedade gerenciada",
  "admin.locations.devicesDescription":
    "\nRegistre e inspecione a cobertura do dispositivo junto com a estrutura do site que o possui.",
  "admin.aiOps.provider": "\nProvedor",
  "admin.aiOps.providerHint":
    "\nProvedor de tempo de execução que atende novas solicitações de assistente e previsão",
  "admin.aiOps.model": "\nModelo",
  "admin.aiOps.sourceLabel": "\nFonte: {value}",
  "admin.aiOps.predictions": "\nPrevisões",
  "admin.aiOps.predictionsHint": "\nRegistros de previsão ativos em toda a propriedade",
  "admin.aiOps.annotations": "\nAnotações",
  "admin.aiOps.annotationsHint": "\nRótulos de revisão capturados e registros de anotação",
  "admin.aiOps.datasetTitle": "\nOperações de conjunto de dados",
  "admin.aiOps.datasetDescription":
    "\nVincule as alterações de tempo de execução aos conjuntos de dados que geram previsões, relatórios e revisão operacional.",
  "admin.aiOps.savedReports": "\nRelatórios salvos",
  "admin.aiOps.managedUsers": "\nUsuários gerenciados",
  "admin.aiOps.copilotDescription":
    "\nUse IA para rastrear a postura do tempo de execução até as alterações do modelo, do conjunto de dados e do operador antes de alterar a configuração.",
  "admin.operationalContext.title": "\nContexto operacional",
  "admin.operationalContext.description":
    "\nEsses valores vêm de variáveis de ambiente do servidor e correspondem ao contexto injetado nos assistentes de IA: OPERATIONAL_CURRENCY, FACILITY_TIMEZONE, FACILITY_LATITUDE e FACILITY_LONGITUDE (latitude e longitude são necessárias para o clima).",
  "admin.operationalContext.currencyLabel": "\nMoeda comercial padrão",
  "admin.operationalContext.facilityTimeLabel": "\nHora local da instalação",
  "admin.operationalContext.facilityTimeBody": "Fuso horário: {timezone} — {localTime}",
  "admin.operationalContext.facilityTimeEmpty":
    "\nDefina FACILITY_TIMEZONE para um fuso horário da IANA (por exemplo, Europa/Londres) para mostrar o relógio da instalação.",
  "admin.operationalContext.coordinatesLabel": "\nCoordenadas da instalação (WGS84)",
  "admin.operationalContext.coordinatesBody": "Lat: {lat}, Lon: {lon}",
  "admin.operationalContext.coordinatesEmpty":
    "\nDefina FACILITY_LATITUDE e FACILITY_LONGITUDE juntos para ativar coordenadas e clima ao vivo quando o acesso de saída à rede for permitido.",
  "admin.operationalContext.weatherLabel": "\nInstantâneo do tempo",
  "admin.operationalContext.weatherOk":
    "\n{tempC} °C, vento {windKmh} km/h, código WMO {code} (Open-Meteo).",
  "admin.operationalContext.weatherSkippedAirgapped":
    "O clima não é obtido em implantações AIRGAPPED.",
  "admin.operationalContext.weatherSkippedNoCoordinates":
    "\nConfigure a latitude e longitude da instalação para buscar as condições atuais.",
  "admin.operationalContext.weatherUnavailable":
    "\nOs dados meteorológicos estão temporariamente indisponíveis. Tente novamente mais tarde.",
  "admin.integrations.totalDomains": "\nDomínios necessários",
  "admin.integrations.totalDomainsHint":
    "\nSistemas corporativos que a plataforma deve integrar com",
  "admin.integrations.configured": "\nConfigurado",
  "admin.integrations.configuredHint":
    "\nIntegrações de domínio com uma entrada de registro de sistema ativa",
  "admin.integrations.degraded": "\nDegradado",
  "admin.integrations.degradedHint":
    "\nSistemas registrados atualmente operando abaixo da postura alvo",
  "admin.integrations.offline": "\nOff-line",
  "admin.integrations.offlineHint":
    "\nSistemas registrados que atualmente exigem recuperação ou fallback",
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
  "admin.branding.operationalCurrencyLabel": "Moeda comercial",
  "admin.branding.operationalCurrencyHint":
    "A moeda de finanças, checkout e documentos continua a ser uma configuração global de runtime, não uma substituição por marca.",
  "admin.branding.supportedLocalesLabel": "Idiomas suportados",
  "admin.branding.supportedLocalesHint":
    "Shells de marca e metadados passam pelos dicionários de locale partilhados distribuídos com a plataforma.",
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
    "\nOs sistemas corporativos de RH, finanças, compras e documentos continuam sendo os sistemas de registro. Este registro rastreia o contrato de integração e a postura operacional dentro de {brandName}.",
  "admin.integrations.formTitle": "\nRegistro de integração",
  "admin.integrations.formDescription":
    "\nCrie ou atualize o contrato de integração para um domínio corporativo necessário.",
  "admin.integrations.registerTitle": "\nRegistro atual",
  "admin.integrations.registerDescription":
    "\nTodos os domínios corporativos necessários, incluindo áreas não configuradas que ainda precisam de integração.",
  "admin.integrations.domainLabel": "\nDomínio corporativo",
  "admin.integrations.systemNameLabel": "\nNome do sistema",
  "admin.integrations.systemNamePlaceholder": "\nInsira o nome do sistema corporativo",
  "admin.integrations.syncModeLabel": "\nModo de sincronização",
  "admin.integrations.statusLabel": "\nStatus operacional",
  "admin.integrations.ownerLabel": "\nProprietário do serviço",
  "admin.integrations.ownerPlaceholder": "\nInsira o proprietário ou equipe responsável",
  "admin.integrations.lastSyncLabel": "\nÚltima sincronização verificada",
  "admin.integrations.notesLabel": "\nNotas",
  "admin.integrations.notesPlaceholder":
    "\nRegistre notas contratuais, operacionais ou de limite de dados",
  "admin.integrations.save": "\nSalvar integração",
  "admin.integrations.saved": "\nCadastro de integração corporativa atualizado.",
  "admin.integrations.systemOfRecord": "\nSistema de registro",
  "admin.integrations.unconfigured": "\nNão configurado",
  "admin.integrations.domain.HR": "RH",
  "admin.integrations.domain.FINANCE": "\nFinanças",
  "admin.integrations.domain.PROCUREMENT": "\nAquisições",
  "admin.integrations.domain.DOCUMENT_MANAGEMENT": "\nGerenciamento de documentos",
  "admin.integrations.domain.CATERING_SERVICES": "\nCatering / ESS",
  "admin.integrations.syncMode.API": "Interface API",
  "admin.integrations.syncMode.FILE_DROP": "\nDescarte de arquivo",
  "admin.integrations.syncMode.MANUAL": "\nManual",
  "admin.integrations.status.HEALTHY": "Saudável",
  "admin.integrations.status.DEGRADED": "\nDegradado",
  "admin.integrations.status.OFFLINE": "\nOff-line",
  "admin.integrations.table.domain": "\nDomínio",
  "admin.integrations.table.system": "\nSistema",
  "admin.integrations.table.syncMode": "\nModo de sincronização",
  "admin.integrations.table.owner": "\nProprietário",
  "admin.integrations.table.lastSync": "\nÚltima sincronização",
  "admin.integrations.table.updatedAt": "\nAtualizado",
  "admin.integrations.error.invalidSystemName":
    "\nInsira um nome de sistema válido antes de salvar.",
  "admin.integrations.error.invalidSelection":
    "\nSelecione um domínio corporativo válido, modo de sincronização e status operacional.",
  "admin.integrations.error.saveFailed":
    "\nO cadastro de integração corporativa não pôde ser salvo neste momento.",
  "admin.integrations.systemConfigDescription":
    "\nCadastro de integração de sistemas corporativos e postura operacional.",
  "admin.integrations.dependenciesTitle": "\nMapa de dependência",
  "admin.integrations.dependenciesDescription":
    "\nRastreie as superfícies operacionais, proprietários e próximas ações para cada dependência corporativa necessária.",
  "admin.integrations.dependency.systemLabel": "\nSistema",
  "admin.integrations.dependency.ownerLabel": "\nProprietário",
  "admin.integrations.dependency.syncLabel": "\nSincronizar: {syncMode}",
  "admin.integrations.dependency.lastSyncLabel": "\nÚltima sincronização",
  "admin.integrations.dependency.updatedLabel": "\nÚltima atualização",
  "admin.integrations.dependency.notesLabel": "\nNotas operacionais",
  "admin.integrations.dependency.impactLabel": "\nFluxos de trabalho impactados",
  "admin.integrations.dependency.noteEmpty": "\nNenhuma nota operacional registrada ainda.",
  "admin.integrations.dependency.remediationLabel": "\nPróxima ação",
  "admin.integrations.dependency.lastSyncEmpty":
    "\nNenhuma sincronização bem-sucedida registrada ainda.",
  "admin.integrations.dependency.updatedEmpty":
    "\nNenhuma atualização de registro registrada ainda.",
  "admin.integrations.dependency.emptyTitle": "\nNenhuma postura de dependência disponível",
  "admin.integrations.dependency.emptyDescription":
    "Atualize o mapa de dependências de integração assim que os dados do espaço de trabalho de suporte estiverem disponíveis.",
  "admin.integrations.dependency.errorTitle": "\nMapa de dependência indisponível",
  "admin.integrations.dependency.errorDescription":
    "\nO painel de dependência de integração não pôde ser atualizado. Tente novamente a solicitação ou verifique o registro upstream.",
  "admin.integrations.dependency.posture.HEALTHY": "Saudável",
  "admin.integrations.dependency.posture.DEGRADED": "\nDegradado",
  "admin.integrations.dependency.posture.OFFLINE": "\nOff-line",
  "admin.integrations.dependency.posture.UNCONFIGURED": "\nNão configurado",
  "admin.integrations.dependency.remediation.HEALTHY":
    "\nContinue monitorando a postura de sincronização agendada e mantenha o espaço de trabalho downstream alinhado com o sistema de registro atual.",
  "admin.integrations.dependency.remediation.DEGRADED":
    "\nRevise as notas de sincronização mais recentes, confirme a disponibilidade upstream e limpe o fluxo de trabalho degradado antes que os operadores dependam de dados obsoletos.",
  "admin.integrations.dependency.remediation.OFFLINE":
    "\nAumente a interrupção da dependência, mude as equipes downstream para controles manuais e restaure o sistema de registro antes do próximo ciclo operacional.",
  "admin.integrations.dependency.remediation.UNCONFIGURED":
    "\nRegistre o sistema de registro, atribua um proprietário e defina o modo de sincronização antes que esta dependência seja tratada como operacionalmente pronta.",
  "admin.integrations.dependency.attentionTitle": "\nAtenção de integração necessária",
  "admin.integrations.dependency.attentionDescription":
    "\n{degraded} degradadas, {offline} off-line e {unconfigured} dependências não configuradas precisam de ação.",
  "admin.integrations.dependency.healthyTitle": "\nDependências alinhadas",
  "admin.integrations.dependency.healthyDescription":
    "\nTodas as dependências necessárias estão configuradas e operando atualmente dentro da postura esperada.",
  "admin.integrations.dependency.action.HR": "\nAbrir operações do usuário",
  "admin.integrations.dependency.action.FINANCE": "\nPlanejamento financeiro aberto",
  "admin.integrations.dependency.action.PROCUREMENT": "\nEspaço de trabalho de frota aberta",
  "admin.integrations.dependency.action.DOCUMENT_MANAGEMENT":
    "\nAbra a área de trabalho de relatórios",
  "admin.integrations.dependency.action.CATERING_SERVICES":
    "\nEspaço de trabalho de propriedade aberta",
  "admin.integrations.dependency.description.HR":
    "\nA identidade, a equipe e a cobertura do operador dependem do sistema de RH permanecer alinhado com as funções e propriedade da plataforma.",
  "admin.integrations.dependency.description.FINANCE":
    "\nA postura orçamentária, os cenários de planejamento e os controles financeiros dependem da sincronização do sistema financeiro de registro.",
  "admin.integrations.dependency.description.PROCUREMENT":
    "\nOs compromissos de aquisição, a atividade do fornecedor e a execução da frota dependem de compras oportunas e fluxos de contrato.",
  "admin.integrations.dependency.description.DOCUMENT_MANAGEMENT":
    "\nRelatórios, aprovações e evidências documentais dependem da disponibilidade do sistema compartilhado de gerenciamento de documentos.",
  "admin.integrations.dependency.description.CATERING_SERVICES":
    "\nA entrega da propriedade, a prontidão do ESS e a coordenação do catering dependem da manutenção operacional deste contrato de serviço.",
  "admin.integrations.dependency.impact.HR.primary": "\nAtribuições de funções",
  "admin.integrations.dependency.impact.HR.secondary": "\nAvaliações de acesso privilegiado",
  "admin.integrations.dependency.impact.HR.tertiary":
    "\nTransferências de prontidão da força de trabalho",
  "admin.integrations.dependency.impact.FINANCE.primary": "\nPlanejamento de cenário",
  "admin.integrations.dependency.impact.FINANCE.secondary": "\nControles de orçamento",
  "admin.integrations.dependency.impact.FINANCE.tertiary": "\nPacotes de relatórios executivos",
  "admin.integrations.dependency.impact.PROCUREMENT.primary": "Execução do fornecedor",
  "admin.integrations.dependency.impact.PROCUREMENT.secondary": "\nPostura de entrega da frota",
  "admin.integrations.dependency.impact.PROCUREMENT.tertiary":
    "\nRoteamento de atendimento comercial",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.primary": "\nPacotes de evidências",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.secondary":
    "\nFluxos de trabalho de aprovação",
  "admin.integrations.dependency.impact.DOCUMENT_MANAGEMENT.tertiary": "\nPublicação do relatório",
  "admin.integrations.dependency.impact.CATERING_SERVICES.primary": "\nProntidão do ESS",
  "admin.integrations.dependency.impact.CATERING_SERVICES.secondary":
    "\nCoordenação de entrega de imóveis",
  "admin.integrations.dependency.impact.CATERING_SERVICES.tertiary":
    "\nTransferência de suporte de catering",
  "admin.integrations.dependency.surface.HR":
    "\nUsuários, funções e preparação da força de trabalho",
  "admin.integrations.dependency.surface.FINANCE":
    "\nOrçamento, cenários de planejamento e supervisão financeira executiva",
  "admin.integrations.dependency.surface.PROCUREMENT":
    "\nEntrega de frota, execução de fornecedores e coordenação de compras",
  "admin.integrations.dependency.surface.DOCUMENT_MANAGEMENT":
    "\nRelatórios, pacotes de evidências e fluxos de trabalho de documentos operacionais",
  "admin.integrations.dependency.surface.CATERING_SERVICES":
    "\nEntrega de propriedades, suporte de catering e superfícies de coordenação ESS",
  "admin.security.privilegedUsers": "\nUsuários privilegiados",
  "admin.security.privilegedUsersHint": "\nAdministradores atualmente com acesso privilegiado",
  "admin.security.unverifiedPrivilegedUsers": "\nPrivilegiado não verificado",
  "admin.security.unverifiedPrivilegedUsersHint":
    "\nIdentidades privilegiadas ainda sem verificação de e-mail",
  "admin.security.concurrentSessionWarnings": "\nSessões simultâneas",
  "admin.security.concurrentSessionWarningsHint":
    "\nOperadores com múltiplas sessões ativas que exigem revisão",
  "admin.security.totalEvents": "\nEventos de segurança 7d",
  "admin.security.totalEventsHint":
    "\nAtividade de alteração relacionada à autenticação e acesso na janela de segurança atual",
  "admin.security.rbacTitle": "\nControle de acesso baseado em função",
  "admin.security.rbacDescription":
    "\nRevise a distribuição de funções, a pegada de acesso ativo e a postura de verificação entre operadores internos.",
  "admin.security.storageTitle": "\nPostura segura de armazenamento de dados",
  "admin.security.storageDescription":
    "\nRastreie os controles de limite de implantação que influenciam a localidade de armazenamento, localidade de referência e exposição externa.",
  "admin.security.auditTitle": "\nAtividade de segurança recente",
  "admin.security.auditDescription":
    "\nEntradas de auditoria relacionadas a autenticação e acesso da janela de segurança atual de sete dias.",
  "admin.security.auditEmpty":
    "\nNenhum evento de segurança recente foi registrado na janela atual.",
  "admin.security.roleTable.role": "\nFunção",
  "admin.security.roleTable.users": "\nUsuários",
  "admin.security.roleTable.activeSessions": "\nSessões ativas",
  "admin.security.roleTable.unverified": "\nNão verificado",
  "admin.security.authEvents": "\nEventos de autenticação",
  "admin.security.accessChangeEvents": "\nAlterações de acesso",
  "admin.security.databaseLabel": "\nBanco de dados",
  "admin.governance.totalEvents": "\nEventos filtrados",
  "admin.governance.totalEventsHint": "\nEventos de auditoria na fatia de governança atual",
  "admin.governance.authEvents": "\nEventos de autenticação",
  "admin.governance.authEventsHint": "\nAtividade de login e logout na fatia atual",
  "admin.governance.changeEvents": "\nAlterar eventos",
  "admin.governance.changeEventsHint":
    "\nCriar, atualizar, aprovar, excluir e exportar ações no escopo",
  "admin.governance.searchLabel": "\nGovernança de pesquisa",
  "admin.governance.searchPlaceholder": "\nID de ator, entidade ou solicitação de pesquisa",
  "admin.governance.actionLabel": "\nAção",
  "admin.governance.actionAll": "\nTodas as ações",
  "admin.governance.windowLabel": "\nJanela de tempo",
  "admin.governance.window.24h": "\nÚltimas 24 horas",
  "admin.governance.window.7d": "\nÚltimos 7 dias",
  "admin.governance.window.30d": "\nÚltimos 30 dias",
  "admin.governance.window.all": "\nTodos os tempos",
  "admin.governance.applyFilters": "\nAplicar filtros",
  "admin.governance.exportFiltered": "\nExportar CSV",
  "admin.governance.requestId": " filtrado\nSolicitar ID",
  "admin.governance.requestIdValue": "\nID da solicitação {value}",
  "admin.governance.empty": "\nNenhum evento de governança correspondeu aos filtros atuais.",
  "admin.chat.overviewReviewLabel": "\nResuma a postura",
  "admin.chat.overviewReviewPrompt":
    "Resuma a visão geral atual do administrador, destaque anomalias entre usuários, conjuntos de dados e governança e recomende as próximas ações administrativas.",
  "admin.chat.overviewOpsLabel": "\nPlanejar ações do centro de controle",
  "admin.chat.overviewOpsPrompt":
    "\nUsando a visão geral do administrador atual, proponha um plano de ação priorizado para gerenciamento de usuários, locais, operações de IA e governança.",
  "admin.chat.userReviewLabel": "\nRevise o usuário selecionado",
  "admin.chat.userReviewPrompt":
    "\nRevise o usuário selecionado, explique os riscos de acesso, sessão e preferência e recomende as próximas ações administrativas.",
  "admin.chat.userOpsLabel": "\nRascunho do plano de mudança de acesso",
  "admin.chat.userOpsPrompt":
    "\nUsando o espaço de trabalho atual de gerenciamento de usuários, elabore um plano preciso para atualizar funções, revogar sessões, se necessário, e comunicar as alterações.",
  "admin.chat.brandingReviewLabel": "Review brand posture",
  "admin.chat.brandingReviewPrompt":
    "Review the current brand register, identify domain, metadata, or theming gaps, and recommend the next branding actions.",
  "admin.chat.locationsReviewLabel": "\nRevise a pegada da borda",
  "admin.chat.locationsReviewPrompt":
    "\nRevise as localizações atuais e a postura dos dispositivos de borda, destaque lacunas ou anomalias e recomende as próximas ações operacionais.",
  "admin.chat.aiReviewLabel": "\nRevise a postura da IA",
  "admin.chat.aiReviewPrompt":
    "\nRevise o tempo de execução atual da IA e a postura do conjunto de dados, explique os riscos e recomende as próximas ações administrativas.",
  "admin.chat.aiOpsLabel": "\nRascunho do plano de implementação de IA",
  "admin.chat.aiOpsPrompt":
    "\nUsando o espaço de trabalho de operações de IA atual, elabore um plano de implementação para alterações no tempo de execução, impactos no conjunto de dados e comunicação do operador.",
  "admin.chat.integrationsReviewLabel": "\nRevise as integrações corporativas",
  "admin.chat.integrationsReviewPrompt":
    "\nRevise o registro de integração corporativa, identifique lacunas de integração ou resiliência nos sistemas de RH, finanças, compras e documentos e recomende as próximas ações administrativas.",
  "admin.chat.securityReviewLabel": "\nRevise a postura de segurança",
  "admin.chat.securityReviewPrompt":
    "\nRevise o espaço de trabalho de segurança atual, resuma os riscos de RBAC, auditoria e limites de armazenamento e recomende as próximas ações de conformidade.",
  "admin.chat.governanceReviewLabel": "\nRevise a atividade de governança",
  "admin.chat.governanceReviewPrompt":
    "\nRevise o espaço de trabalho de governança atual, resuma eventos notáveis de acesso ou mudança e recomende as próximas ações de conformidade.",
  "admin.audit.action.CREATE": "\nCriado",
  "admin.audit.action.UPDATE": "\nAtualizado",
  "admin.audit.action.DELETE": "\nExcluído",
  "admin.audit.action.APPROVE": "Aprovado",
  "admin.audit.action.LOGIN": "\nLogado",
  "admin.audit.action.LOGOUT": "\nDesconectado",
  "admin.audit.action.EXPORT": "\nExportado",
  "admin.invite.title": "\nConvites de usuários",
  "admin.invite.description":
    "\nConvide novos operadores por e-mail com uma função pré-atribuída e janela de expiração.",
  "admin.invite.emailLabel": "\nEndereço de e-mail",
  "admin.invite.emailPlaceholder": "operador@exemplo.com",
  "admin.invite.roleLabel": "\nFunção",
  "admin.invite.expiresLabel": "\nExpira em (dias)",
  "admin.invite.send": "\nEnviar convite",
  "admin.invite.sent": "\nConvite enviado com sucesso.",
  "admin.invite.pending": "\nPendente",
  "admin.invite.expired": "\nExpirado",
  "admin.invite.accepted": "\nAceito",
  "admin.invite.revoked": "\nRevogado",
  "admin.invite.resend": "\nReenviar",
  "admin.invite.pendingTitle": "\nConvites pendentes",
  "admin.invite.pendingDescription": "\nConvites aguardando aceitação dos operadores convidados.",
  "admin.invite.table.email": "\nE-mail",
  "admin.invite.table.role": "\nFunção",
  "admin.invite.table.status": "\nStatus",
  "admin.invite.table.expiresAt": "\nExpira",
  "admin.invite.table.invitedBy": "\nConvidado por",
  "admin.invite.table.createdAt": "\nEnviado",
  "admin.invite.empty": "\nNenhum convite pendente.",
  "admin.invite.error.invalidEmail": "\nInsira um endereço de e-mail válido.",
  "admin.invite.error.invalidRole": "\nSelecione uma função válida.",
  "admin.invite.error.sendFailed": "\nNão é possível enviar o convite no momento.",
  "admin.invite.error.alreadyInvited": "\nEste e-mail já possui um convite pendente.",
  "admin.bulkImport.title": "\nImportação de usuários em massa",
  "admin.bulkImport.description":
    "\nFaça upload de um arquivo CSV para provisionar várias contas de operadora de uma só vez.",
  "admin.bulkImport.uploadLabel": "\nArquivo CSV",
  "admin.bulkImport.uploadHint": "\nColunas esperadas: nome, email, função",
  "admin.bulkImport.previewTitle": "\nVisualização da importação",
  "admin.bulkImport.previewDescription":
    "\nRevise as linhas analisadas antes de confirmar a importação.",
  "admin.bulkImport.confirmImport": "\nConfirmar importação",
  "admin.bulkImport.rowCount": "\n{count} linhas analisadas",
  "admin.bulkImport.validRows": "\n{count} válido",
  "admin.bulkImport.errorRows": "\n{count} erros",
  "admin.bulkImport.table.row": "\nLinha",
  "admin.bulkImport.table.name": "\nNome",
  "admin.bulkImport.table.email": "\nE-mail",
  "admin.bulkImport.table.role": "\nFunção",
  "admin.bulkImport.table.status": "\nStatus",
  "admin.bulkImport.table.error": "\nErro",
  "admin.bulkImport.statusValid": "\nVálido",
  "admin.bulkImport.statusError": "\nErro",
  "admin.bulkImport.imported": "\n{count} usuários importados com sucesso.",
  "admin.bulkImport.error.noFile": "\nSelecione um arquivo CSV para fazer upload.",
  "admin.bulkImport.error.parseFailed": "\nNão foi possível analisar o arquivo CSV.",
  "admin.bulkImport.error.importFailed": "\nNão é possível concluir a importação no momento.",
  "admin.bulkImport.error.noValidRows": "\nNenhuma linha válida para importar.",
  "admin.bulkImport.validation.missingName": "\nNome ausente",
  "admin.bulkImport.validation.invalidEmail": "\nE-mail inválido",
  "admin.bulkImport.validation.invalidRole": "\nFunção inválida",
  "admin.health.title": "\nSaúde do sistema",
  "admin.health.description":
    "\nDiagnóstico da plataforma em tempo real com métricas do sistema atualizadas ao vivo.",
  "admin.health.uptime": "\nTempo de atividade",
  "admin.health.uptimeHint": "\nTempo decorrido desde o início do processo Bun",
  "admin.health.latencyP50": "\nLatência P50",
  "admin.health.latencyP50Hint": "\nLatência média da solicitação em amostras recentes",
  "admin.health.latencyP99": "\nLatência P99",
  "admin.health.latencyP99Hint": "\nLatência da solicitação final em amostras recentes",
  "admin.health.memoryUsage": "\nUso de memória",
  "admin.health.memoryUsageHint": "\nConsumo de memória heap do tempo de execução Bun",
  "admin.health.dbConnections": "\nStatus do banco de dados",
  "admin.health.dbConnectionsHint": "\nIntegridade do conjunto de conexões PostgreSQL",
  "admin.health.errorRate": "\nTaxa de erro",
  "admin.health.errorRateHint": "\nPorcentagem de respostas com status 5xx na janela atual",
  "admin.health.refreshInterval": "\nAtualização automática a cada 5 segundos",
  "admin.health.statusOnline": "\nOn-line",
  "admin.health.statusDegraded": "\nDegradado",
  "admin.health.statusOffline": "\nOff-line",
  "admin.apiKeys.title": "\nGerenciamento de chaves de API",
  "admin.apiKeys.description":
    "\nCrie, alterne e revogue chaves de API para integrações de sistema.",
  "admin.apiKeys.create": "\nCriar chave de API",
  "admin.apiKeys.nameLabel": "\nNome da chave",
  "admin.apiKeys.namePlaceholder": "\npor exemplo Pipeline de CI, agente de monitoramento",
  "admin.apiKeys.scopeLabel": "\nEscopo",
  "admin.apiKeys.scopeRead": "\nLeia",
  "admin.apiKeys.scopeWrite": "\nEscreva",
  "admin.apiKeys.scopeAdmin": "\nAdministrador",
  "admin.apiKeys.expiresLabel": "\nExpira em (dias)",
  "admin.apiKeys.expiresNever": "\nNunca",
  "admin.apiKeys.lastUsed": "\nÚltima utilização",
  "admin.apiKeys.lastUsedNever": "\nNunca usado",
  "admin.apiKeys.revoke": "\nRevogar",
  "admin.apiKeys.revokeTitle": "\nRevogar chave API",
  "admin.apiKeys.revokeDescription":
    "\nEsta chave API será desativada permanentemente. Esta ação não pode ser desfeita.",
  "admin.apiKeys.revokeConfirm": "\nRevogar chave",
  "admin.apiKeys.revoked": "\nA chave de API foi revogada.",
  "admin.apiKeys.created":
    "\nChave de API criada. Copie a chave agora — ela não será mostrada novamente.",
  "admin.apiKeys.table.name": "\nNome",
  "admin.apiKeys.table.prefix": "\nPrefixo chave",
  "admin.apiKeys.table.scope": "\nEscopo",
  "admin.apiKeys.table.createdBy": "\nCriado por",
  "admin.apiKeys.table.expiresAt": "\nExpira",
  "admin.apiKeys.table.lastUsedAt": "\nÚltima utilização",
  "admin.apiKeys.table.status": "\nStatus",
  "admin.apiKeys.table.actions": "\nAções",
  "admin.apiKeys.statusActive": "\nAtivo",
  "admin.apiKeys.statusRevoked": "\nRevogado",
  "admin.apiKeys.statusExpired": "\nExpirado",
  "admin.apiKeys.empty": "\nNenhuma chave de API foi criada.",
  "admin.apiKeys.error.invalidName": "\nInsira um nome de chave válido.",
  "admin.apiKeys.error.invalidScope": "\nSelecione um escopo válido.",
  "admin.apiKeys.error.createFailed": "Não é possível criar a chave de API no momento.",
  "admin.apiKeys.error.revokeFailed": "\nNão é possível revogar a chave de API no momento.",
  "admin.lms.title": "\nSistema de gestão da aprendizagem",
  "admin.lms.description":
    "\nGerencie conteúdo educacional, currículos e rastreamento do progresso dos alunos.",
  "admin.lms.courses.title": "\nCursos",
  "admin.lms.modules.title": "\nMódulos",
  "admin.lms.enrollments.title": "\nInscrições",
  "admin.lms.createCourse": "\nCriar curso",
  "admin.lms.table.courseName": "\nNome do curso",
  "admin.lms.table.instructor": "\nInstrutor",
  "admin.lms.table.enrolled": "\nInscrito",
  "admin.lms.table.completionRate": "\nTaxa de conclusão",
  "admin.lms.status.published": "\nPublicado",
  "admin.lms.status.draft": "\nRascunho",
  "admin.lms.status.archived": "\nArquivado",

  "admin.webhooks.title": "\nConfiguração do webhook",
  "admin.webhooks.description":
    "\nRegistre endpoints de webhook para entrega de eventos em tempo real para sistemas externos.",
  "admin.webhooks.urlLabel": "\nURL do ponto final",
  "admin.webhooks.urlPlaceholder": "\nhttps://example.com/webhooks/platform",
  "admin.webhooks.secretLabel": "\nAssinando segredo",
  "admin.webhooks.eventsLabel": "\nEventos inscritos",
  "admin.webhooks.eventsPlaceholder": "\nordem de trabalho.criada, tarefa.concluída",
  "admin.webhooks.eventsHint":
    "\nTipos de eventos separados por vírgula (por exemplo, workOrder.created, task.completed)",
  "admin.webhooks.activeLabel": "\nAtivo",
  "admin.webhooks.create": "\nRegistrar webhook",
  "admin.webhooks.created": "\nWebhook registrado com sucesso.",
  "admin.webhooks.test": "\nEnviar teste",
  "admin.webhooks.deliveryLog": "\nRegistro de entrega",
  "admin.webhooks.table.url": "\nPonto final",
  "admin.webhooks.table.events": "\nEventos",
  "admin.webhooks.table.status": "\nStatus",
  "admin.webhooks.table.lastDelivered": "\nÚltima entrega",
  "admin.webhooks.table.createdBy": "\nCriado por",
  "admin.webhooks.table.actions": "\nAções",
  "admin.webhooks.statusActive": "\nAtivo",
  "admin.webhooks.statusInactive": "\nInativo",
  "admin.webhooks.empty": "\nNenhum webhooks foi registrado.",
  "admin.webhooks.deleteTitle": "\nRemover webhook",
  "admin.webhooks.deleteDescription": "\nEste webhook será permanentemente desativado e removido.",
  "admin.webhooks.deleteConfirm": "\nRemover webhook",
  "admin.webhooks.deleted": "\nO webhook foi removido.",
  "admin.webhooks.error.invalidUrl": "\nInsira um URL HTTPS válido.",
  "admin.webhooks.error.invalidEvents": "\nSelecione pelo menos um tipo de evento.",
  "admin.webhooks.error.createFailed": "\nNão é possível registrar o webhook no momento.",
  "admin.webhooks.error.deleteFailed": "\nNão é possível remover o webhook no momento.",
  "system.databaseUnavailable":
    "\nO acesso ao banco de dados ativo não está configurado. Defina DATABASE_URL para ativar rotas baseadas em dados.",
  "brand.error.hostNotConfigured": "\nEste host não está configurado para um contexto de marca.",
  "kpi.total_assets": "\nAtivos Totais",
  "kpi.active_tasks": "\nTarefas Ativas",
  "kpi.predictions_due": "\nPrevisões para vencimento",
  "kpi.utilisation_rate": "\nTaxa de utilização",
  "kpi.overdue_maintenance": "\nManutenção vencida",
  "kpi.depreciation_total": "\nDepreciação Total",
  "common.title": "Title",
  "common.compare": "Compare",
  "common.confidence": "Confidence",
  "common.rationale": "Rationale",
  "common.savedView": "Saved view",
  "common.whatChanged": "What changed",
  "common.back": "\nVoltar",
  "common.close": "\nFechar",
  "common.closeIcon": "✖",
  "common.confirmDelete": "\nExcluir este item?",
  "common.delete": "\nExcluir",
  "common.notFound": "\nNão encontrado",
  "common.yes": "\nsim",
  "common.no": "\nnão",
  "common.retry": "\nTentar novamente",
  "common.key.alt": "\nAlt",
  "common.key.enter": "\nDigite",
  "common.key.shift": "\nTurno",
  "common.open": "\nAbrir",
  "common.refresh": "\nAtualizar",
  "common.selectionNone": "\nNenhum item selecionado",
  "common.selectionOne": "\nUm",
  "common.selectAllVisible": "\nSelecione todos visíveis",
  "common.selectAllResults": "\nSelecione todos os resultados",
  "common.lastUpdated": "\nÚltima atualização",
  "common.updatedAt": "\nAtualizado",
  "common.live": "\nAo vivo",
  "common.loading": "\nCarregando",
  "common.offlineMessage": "\nVocê parece estar off-line. Verifique sua conexão.",
  "common.tabs": "\nGuias",
  "common.toolbar": "\nBarra de ferramentas",
  "common.emptyValue": "N/D",
  "common.filterChipAria": "\nLimpar filtro {label}: {value}",
  "common.pending": "Pendente",
  "common.enabled": "\nAtivado",
  "common.disabled": "\nDesativado",
  "common.percentFormat": "\n{value}%",
  "common.optional": "\nopcional",
  "common.system": "\nsistema",
  "common.unknownRole": "\nDesconhecido",
  "common.status": "\nStatus",
  "common.actions": "\nAções",
  "common.confirm": "\nConfirmar",
  "common.confirmAction": "\nTem certeza?",
  "common.createdBy": "\nCriado por",
  "common.date": "\nData",
  "common.sharedBy": "\nCompartilhado por",
  "common.notifications": "\nNotificações",
  "common.period": "\nPeríodo",
  "common.empty": "\nNenhum dado disponível",
  "common.emptyTable": "\nNenhum dado para exibir",
  "common.no_results": "\nSem resultados",
  "common.emptySearch": "\nSem resultados. Tente ajustar seus filtros.",
  "common.error": "\nAlgo deu errado",
  "common.success": "\nSucesso",
  "workspace.livePanel.lastUpdatedEmpty": "\nAguardando a primeira atualização",
  "workspace.livePanel.emptyDescription":
    "\nEste painel ao vivo ainda não possui dados. Atualize a superfície ou conclua primeiro o fluxo de trabalho upstream.",
  "workspace.livePanel.errorDescription":
    "\nEste painel ativo não pôde ser atualizado. Tente novamente a solicitação ou verifique o serviço upstream.",
  "assets.table.empty": "\nAinda não há ativos. Registre seu primeiro dispositivo para começar.",
  "assets.table.emptyAction": "\nAdicionar dispositivo",
  "finance.depreciation.table.empty":
    "\nNão há dados de depreciação. Ativos com valores de compra e contábeis aparecerão aqui.",
  "finance.depreciation.table.emptyAction": "\nVer ativos",
  "common.unknownError": "\nErro desconhecido",
  "common.unauthorized": "\nVocê não tem acesso a esta visualização",
  "errors.crossOriginRequestBlocked": "\nSolicitação de origem cruzada bloqueada",
  "errors.invalidFileName": "\nNome de arquivo inválido",
  "errors.invalidOriginHeader": "\nCabeçalho de origem inválido",
  "errors.requestOriginRequired": "A origem da solicitação não pôde ser verificada",
  "errors.pageTitle": "\nErro",
  "errors.backToDashboard": "\nVoltar ao painel",
  "errors.genericMessage": "\nAlgo deu errado. Tente novamente ou retorne ao painel.",
  "common.pagination.page": "\nPágina {page} de {totalPages}",
  "common.pagination.ariaLabel": "\nNavegação de paginação",
  "common.pagination.resultCount": "{start}–{end} de {count}",
  "common.pagination.range": "{start}–{end} de {total}",
  "common.pagination.pageSize": "\nItens por página",
  "common.pagination.previous": "\nPágina anterior",
  "common.pagination.next": "\nPróxima página",
  "common.pagination.pageN": "\nPágina {n}",
  "common.pagination.ellipsis": "\nMais páginas",
  "common.sort.asc": "\nOrdenar crescente",
  "common.sort.desc": "\nClassificar em ordem decrescente",
  "common.sort.unsorted": "\nClassificar por esta coluna",
  "chat.bubble.title": "\nAssistente de IA",
  "chat.bubble.placeholder": "\nFaça uma pergunta...",
  "chat.bubble.send": "\nEnviar",
  "chat.bubble.open": "\nAbrir bate-papo com IA",
  "chat.bubble.close": "\nFechar chat",
  "chat.bubble.intro": "\nPergunte sobre ativos, tarefas, previsões ou utilização.",
  "chat.bubble.assistantName": "\nAssistente",
  "chat.bubble.emptyMessageError": "\nDigite uma mensagem antes de enviar.",
  "chat.bubble.sending": "\nEnviando...",
  "chat.bubble.networkError": "\nErro de rede. Por favor, tente novamente.",
  "chat.bubble.voiceStart": "\nIniciar entrada de voz",
  "chat.bubble.voiceStop": "\nParar a entrada de voz",
  "chat.bubble.voiceUnsupported": "\nA entrada de voz não é suportada neste navegador.",
  "chat.bubble.voiceListening": "\nOuvindo...",
  "chat.bubble.contextSelectionLabel": "\nSeleção",
  "chat.bubble.contextTitle": "\nContexto inteligente",
  "chat.bubble.contextSubtitle":
    "\nO contexto da página atual, o texto selecionado e os arquivos descartados são transportados para a próxima resposta.",
  "chat.bubble.contextPageLabel": "\nPágina",
  "chat.bubble.contextAttachmentLabel": "\nArquivos",
  "chat.bubble.addFiles": "\nAdicionar arquivos",
  "chat.bubble.smartChipSummary": "\nResumir página",
  "chat.bubble.smartChipSummaryPrompt": "\nResuma o contexto mais importante desta página.",
  "chat.bubble.smartChipActions": "\nPróximas ações",
  "chat.bubble.smartChipActionsPrompt":
    "\nIdentifique as próximas ações com base no contexto da página atual.",
  "chat.bubble.smartChipSelection": "\nExplique a seleção",
  "chat.bubble.smartChipSelectionPrompt":
    "\nExplique o conteúdo selecionado no contexto desta página.",
  "chat.bubble.dropHint": "\nSolte imagens ou documentos aqui ou clique para anexar.",
  "chat.bubble.dropMeta":
    "\nAs imagens são enviadas para provedores multimodais quando suportados. Os documentos contribuem com o contexto extraído.",
  "chat.bubble.composeLabel": "\nAlerta",
  "chat.bubble.composeHint": "\nPressione Enter para enviar. Use Shift+Enter para uma nova linha.",
  "chat.bubble.attachmentMetadataOnly": "\napenas metadados",
  "chat.bubble.attachmentUnsupported":
    "\nArquivo não suportado. Use um documento de imagem, PDF, TXT, MD, CSV, JSON, HTML ou XML.",
  "chat.bubble.attachmentLimitReached": "\nVocê pode anexar até {count} arquivos por mensagem.",
  "chat.bubble.attachmentImageTooLarge":
    "\nO anexo de imagem excede o limite de tamanho do bate-papo da IA.",
  "chat.bubble.attachmentDocumentTooLarge":
    "\nO anexo do documento excede o limite de tamanho do bate-papo da IA.",
  "chat.bubble.attachmentRemove": "\nRemover anexo",
  "chat.bubble.defaultContextPrompt":
    "\nUse o contexto da página disponível e os anexos para ajudar com esta solicitação.",
  "chat.bubble.advisoryOnly": "APENAS ORIENTAÇÃO – requer aprovação humana antes da execução.",
  "chat.systemPrompt.pageContext": "\n\n\n**Contexto da página atual:**",
  "chat.systemPrompt.selectionContext": "\n\n\n**Texto da página selecionada:**",
  "chat.systemPrompt.attachmentContext": "\n\n\n**Contexto do arquivo anexado:**",
  "chat.systemPrompt.relevantDocs":
    "\n\n\n**Documentação relevante (use para informar sua resposta):**\n",
  "chat.systemPrompt.operationalContextHeader": "\n\n\n**Contexto operacional:**",
  "chat.systemPrompt.operationalCurrencyLine": "\n- Moeda comercial padrão: {currency}",
  "chat.systemPrompt.facilityLocalTimeLine":
    "\n- Hora local da instalação ({timezone}): {localTime}",
  "chat.systemPrompt.facilityWeatherLine":
    "- Instantâneo meteorológico da instalação (Open-Meteo): {tempC} °C, vento {windKmh} km/h, código WMO {code}.",
  "chat.error.network": "\nErro de rede. Por favor, tente novamente.",
  "chat.error.auth": "\nFalha na autenticação. Verifique sua chave de API.",
  "chat.error.rateLimit": "\nLimite de taxa excedido. Por favor, tente novamente mais tarde.",
  "chat.error.invalidResponse": "\nResposta inválida do serviço de IA.",
  "chat.error.providerError": "Erro: {message}",
  "chat.error.httpStatus": "\nHTTP{status}",
  "context7.error.fetchFailed": "\nFalha na busca da documentação do Context7.",
  "context7.error.rateLimitExceeded":
    "\nLimite de taxa Context7 excedido. Tente novamente mais tarde.",
  "context7.error.apiKeyInvalid": "\nChave de API Context7 inválida.",
  "context7.error.searchFailed": "\nFalha na pesquisa do Context7: {status}",
  "context7.error.responseParseFailed": "\nFalha na análise da resposta Context7.",
  "context7.error.contextFailed": "\nContexto Context7 falhou: {status}",
  "context7.error.textReadFailed": "\nFalha na leitura do texto Context7.",
  "context7.error.jsonParseFailed": "\nFalha na análise JSON do Context7.",
  "auth.signIn.rememberMe": "\nLembre-se de mim",
  "auth.signIn.recoveryHelp": "\nEsqueceu a senha? Use o fluxo de recuperação da sua organização.",
  "auth.signIn.accountProvisioning":
    "\nNovo na plataforma? Entre em contato com seu administrador para provisionamento de conta.",
  "auth.signIn.requestAccess": "Request access",
  "auth.signIn.forgotPasswordLink": "\nEsqueceu a senha?",
  "auth.signIn.createAccount": "\nCriar nova conta",
  "auth.signIn.validationEmail": "\nInsira um endereço de e-mail válido",
  "auth.signIn.validationPassword": "\nA senha deve ter pelo menos 8 caracteres",
  "auth.signIn.heroAlt": "\nIlustração de login seguro",
  "auth.signIn.errorInvalidCredentials": "\nE-mail ou senha inválidos. Por favor, tente novamente.",
  "auth.signIn.errorGeneric": "\nFalha no login. Por favor, tente novamente.",
  "auth.signIn.loggedOut": "\nVocê foi desconectado. Faça login novamente.",
  "auth.signIn.securityEyebrow": "\nPostura de segurança",
  "auth.signIn.contextTitle": "\nContexto de login",
  "auth.signIn.contextDescription":
    "\nRetorne os usuários ao espaço de trabalho correto, mantenha a recuperação por perto e torne a postura de segurança visível antes da autenticação.",
  "auth.signIn.destinationLabel": "\nDestino de retorno",
  "auth.signIn.capabilitiesLabel": "\nMétodos de autenticação habilitados",
  "auth.signIn.capabilityPasswordOnly": "\nA autenticação por senha está habilitada no momento.",
  "auth.signIn.capabilityPasswordPasskey":
    "\nA autenticação por senha e chave de acesso está habilitada para este espaço de trabalho.",
  "auth.signIn.capabilityPasswordSso":
    "\nA senha e o logon único estão habilitados para este espaço de trabalho.",
  "auth.signIn.capabilityPasswordPasskeySso":
    "\nSenha, chave de acesso e logon único estão habilitados para este espaço de trabalho.",
  "auth.signIn.passkeyLabel": "\nOpções de autenticação",
  "auth.signIn.passkeyValue": "\nSenha hoje, senha e SSO prontos",
  "auth.signIn.methodTitle": "\nMétodos de autenticação",
  "auth.signIn.methodDescription":
    "\nEscolha o caminho de login para este espaço de trabalho. A senha permanece disponível mesmo quando a identidade corporativa está habilitada.",
  "auth.signIn.methodPasswordTitle": "\nLogin com senha",
  "auth.signIn.methodPasswordDescription":
    "\nUse seu e-mail e senha para entrar diretamente no espaço de trabalho solicitado.",
  "auth.signIn.methodPasswordBadge": "\nPadrão",
  "auth.signIn.methodPasswordAction": "\nUsar senha",
  "auth.signIn.methodPasskeyTitle": "\nEntrar com passkey",
  "auth.signIn.methodPasskeyDescription":
    "\nUse uma passkey do dispositivo para concluir a autenticação sem digitar sua senha.",
  "auth.signIn.methodPasskeyAction": "Continuar com passkey",
  "auth.signIn.methodSsoTitle": "\nLogon único",
  "auth.signIn.methodSsoDescription":
    "\nContinue com o provedor de identidade da sua organização e retorne ao espaço de trabalho solicitado após a verificação.",
  "auth.signIn.methodSsoBadge": "\nRecomendado",
  "auth.signIn.methodSsoAction": "Continuar com SSO",
  "auth.signIn.passkeyAutoFillHint":
    "\nSe o navegador oferecer suporte, uma passkey salva pode aparecer no preenchimento automático desta página.",
  "auth.signIn.passkeyPending": "\nConclua a verificação com passkey para continuar.",
  "auth.signIn.errorPasskeyUnavailable":
    "\nO login com passkey não está disponível neste navegador.",
  "auth.signIn.errorPasskeyFailed":
    "\nNão foi possível concluir o login com passkey. Tente novamente.",
  "auth.signIn.errorSsoUnavailable":
    "\nO logon único ainda não está disponível para este espaço de trabalho.",
  "auth.signIn.errorSsoStart":
    "\nNão foi possível iniciar o logon único. Por favor, tente novamente.",
  "auth.signIn.progressTitle": "\nFluxo de login",
  "auth.signIn.progressDescription":
    "\nConfirme o destino, autentique e revise a postura de segurança antes de entrar no espaço de trabalho.",
  "auth.signIn.progressStep.destination": "\nDestino",
  "auth.signIn.progressStep.authenticate": "\nAutenticar",
  "auth.signIn.progressStep.review": "\nRevise o acesso",
  "auth.signIn.securityPointOne":
    "\nO acesso com escopo de função mantém as áreas de finanças, operações e relatórios isoladas.",
  "auth.signIn.securityPointTwo":
    "\nOs fluxos de trabalho renderizados pelo servidor reduzem a exposição do lado do cliente aos dados operacionais.",
  "auth.signIn.securityPointThree":
    "\nAs ações de ativos, tarefas e relatórios apoiados por auditoria permanecem rastreáveis após o login.",
  "auth.password.showPassword": "\nMostrar senha",
  "auth.password.hidePassword": "\nOcultar senha",
  "apiExplorer.page.eyebrow": "Ferramentas de desenvolvedor",
  "apiExplorer.title": "\nAPI Explorer",
  "api.docs.title": "Baohaus API",
  "api.docs.description": "Public, operations, and partner APIs surfaced by the Baohaus platform.",
  "apiExplorer.subtitle": "\nNavegue por todas as rotas, pontos finais e superfícies registrados",
  "apiExplorer.searchLabel": "\nPesquisar rotas",
  "apiExplorer.searchPlaceholder": "\nFiltrar por caminho ou método",
  "apiExplorer.filters.title": "\nRefinar inventário de rota",
  "apiExplorer.filters.description":
    "\nFiltre o manifesto da rota registrada por superfície ou consulta.",
  "apiExplorer.filters.surface": "\nSuperfície",
  "apiExplorer.table.index": "N.º",
  "apiExplorer.table.method": "\nMétodo",
  "apiExplorer.table.path": "\nCaminho",
  "apiExplorer.table.surface": "\nSuperfície",
  "apiExplorer.table.action": "\nRota aberta",
  "apiExplorer.summary.filtered": "\nFiltrado",
  "apiExplorer.summary.filteredDescription": "\nRotas atualmente visíveis neste espaço de trabalho",
  "apiExplorer.summary.total": "\nTotal",
  "apiExplorer.summary.totalDescription": "\nRotas registradas na aplicação",
  "apiExplorer.summary.htmlDescription": "\nPáginas SSR disponíveis no shell autenticado",
  "apiExplorer.summary.apiDescription": "\nEndpoints de API de operações e plataforma",
  "apiExplorer.summary.regionAria": "\nResumo da rota do API Explorer",
  "apiExplorer.results.title": "\nRotear inventário",
  "apiExplorer.results.initialLimitTitle": "\nMostrando as primeiras {shown} rotas",
  "apiExplorer.results.initialLimitDescription":
    "\nUse os filtros de superfície ou a pesquisa para inspecionar o inventário completo de {total} rotas registadas.",
  "apiExplorer.results.summary": "\n{filtered} filtrado / {total} total",
  "apiExplorer.empty.title": "\nNenhuma rota corresponde a esses filtros",
  "apiExplorer.empty.description":
    "\nLimpe os filtros atuais ou amplie o termo de pesquisa para inspecionar mais o inventário de rotas.",
  "apiExplorer.openHtmlAria": "\nAbrir rota do espaço de trabalho",
  "apiExplorer.openEndpointAria": "\nTerminal aberto",
  "apiExplorer.tab.all": "\nTodos",
  "apiExplorer.tab.api": "Interface API",
  "apiExplorer.tab.html": "Visualização HTML",
  "apiExplorer.tab.static": "\nEstático",
  "apiExplorer.tab.auth": "\nAutenticação",
  "nav.apiExplorer": "\nAPI Explorer",
  "customisation.title": "\nPersonalização",
  "customisation.subtitle": "\nTema, preferências e opções de exibição",
  "customisation.theme": "\nTema",
  "customisation.themeDescription": "\nEscolha o modo claro ou escuro para a interface",
  "customisation.preferences": "\nPreferências",
  "customisation.lightMode": "\nModo de luz",
  "customisation.preferencesDescription": "\nPreferências de exibição e notificação.",
  "customisation.chatBubble": "\nMostrar balão de bate-papo de IA no painel",
  "customisation.workspaceDefaults.title": "\nPadrões do espaço de trabalho",
  "customisation.workspaceDefaults.subtitle":
    "\nDefina a página de destino e os assistentes que moldam seu ponto de partida diário.",
  "customisation.autoSaveHint": "As alterações são salvas automaticamente",
  "customisation.workspacePresets.title": "\nPredefinições de espaço de trabalho",
  "customisation.workspacePresets.subtitle":
    "\nEscolha os padrões do ambiente de trabalho de tarefas que permanecem fixados nos cookies do seu espaço de trabalho.",
  "customisation.workspacePresets.primaryView": "\nVisualização de tarefa primária",
  "customisation.workspacePresets.secondaryView": "\nVisualização de tarefa secundária",
  "customisation.workspacePresets.taskView.activeBoard": "\nPlaca ativa",
  "customisation.workspacePresets.taskView.activeBoardDescription":
    "\nAbra o quadro de fluxo no trabalho ativo que já está em execução.",
  "customisation.workspacePresets.taskView.triageBoard": "\nQuadro de triagem",
  "customisation.workspacePresets.taskView.triageBoardDescription":
    "\nComece com o backlog e o rascunho do trabalho que ainda precisa de uma decisão do operador.",
  "customisation.workspacePresets.taskView.dispatchQueue": "Fila de despacho",
  "customisation.workspacePresets.taskView.dispatchQueueDescription":
    "Abra a fila com trabalhos não atribuídos prontos para definição de equipe e agendamento.",
  "customisation.workspacePresets.taskView.slaQueue": "\nFila SLA",
  "customisation.workspacePresets.taskView.slaQueueDescription":
    "\nContinue trabalhando em breve com a pressão do prazo visível por padrão.",
  "customisation.workspacePresets.taskView.myQueue": "\nMinha fila",
  "customisation.workspacePresets.taskView.myQueueDescription":
    "\nComece pelas tarefas já pertencentes ao operador atual.",
  "customisation.defaultLanding.title": "\nPágina de destino padrão",
  "customisation.defaultLanding.description":
    "\nEscolha qual espaço de trabalho será aberto imediatamente após o login.",
  "digitalTwin.view3D": "\nVisualização 3D",
  "digitalTwin.view2D": "\nVista 2D",
  "digitalTwin.viewToggle": "\nAlternar visualização dupla digital",
  "digitalTwin.filters": "\nFiltros",
  "digitalTwin.overlays": "\nSobreposições",
  "digitalTwin.loadModel": "\nCarregar modelo USD",
  "digitalTwin.filter.showHotspots": "\nMostrar pontos de acesso",
  "digitalTwin.filter.showGrid": "\nMostrar grade",
  "digitalTwin.filter.showAssetLabels": "\nMostrar rótulos de recursos",
  "digitalTwin.badge.view3D": "Visualização 3D",
  "digitalTwin.badge.stream": "Streaming",
  "digitalTwin.error.modelLoadFailed": "\nFalha no carregamento do modelo. Mostrando substituto.",
  "digitalTwin.error.viewerInitFailed": "\nFalha na inicialização do visualizador 3D.",
  "nav.collapseSidebar": "\nRecolher barra lateral",
  "nav.expandSidebar": "\nExpandir barra lateral",
  "nav.commandPalette": "\nPaleta de comandos",
  "nav.commandPaletteHint": "\nPesquise páginas, ativos, tarefas e ações...",
  "nav.commandPaletteOpen": "\nAbrir paleta de comando",
  "nav.commandPaletteDismissKey": "\nEsc",
  "nav.commandPaletteEmpty": "\nNenhum resultado encontrado",
  "nav.commandPaletteNavigation": "\nNavegação",
  "nav.commandPaletteAssets": "\nAtivos",
  "nav.commandPaletteTasks": "\nTarefas",
  "nav.commandPaletteActions": "\nAções",
  "common.sortAsc": "\nOrdenar crescente",
  "common.sortDesc": "\nClassificar em ordem decrescente",
  "common.sortNone": "\nNão classificado",
  "common.bulkSelect": "\nSelecione",
  "common.bulkActions": "\nAções em massa",
  "common.bulkSelectAll": "\nSelecionar tudo",
  "common.clearFilters": "\nLimpar todos os filtros",
  "common.clearSelection": "\nLimpar seleção",
  "common.selectedCount": "\n{selected} de {total} selecionado(s)",
  "common.stats": "\nEstatísticas",
  "common.dashboard": "\nPainel",
  "filter.label": "\nFiltrar resultados",
  "filter.resultCount": "\n{count} resultados",
  "list.empty.description": "\nNenhum item para exibir",
  "nav.no_tiles": "\nSem blocos de navegação",
  "nav.no_tiles.description": "\nNenhum item disponível nesta seção",
  "common.filter.search": "\nPesquisar…",
  "common.markReviewed": "\nMarcar como revisado",
  "common.filterChipClear": "\nRemover filtro",
  "common.clearAll": "\nLimpar tudo",
  "common.exportCsv": "\nExportar CSV",
  "common.dateRange": "\nPeríodo",
  "common.dateRange.7d": "\nÚltimos 7 dias",
  "common.dateRange.30d": "\nÚltimos 30 dias",
  "common.dateRange.90d": "\nÚltimos 90 dias",
  "common.dateRange.custom": "\nIntervalo personalizado",
  "common.last7Days": "\nÚltimos 7 dias",
  "common.last30Days": "\nÚltimos 30 dias",
  "common.last90Days": "\nÚltimos 90 dias",
  "common.allTime": "\nTodos os tempos",
  "common.currentQuarter": "\nTrimestre atual",
  "common.lastQuarter": "\nÚltimo trimestre",
  "common.yearToDate": "\nAno acumulado",
  "common.addAnother": "\nAdicione outro",
  "common.edit": "\nEditar",
  "common.save": "\nSalvar",
  "common.cancel": "\nCancelar",
  "common.noData": "\nNenhum dado disponível",
  "common.tryAgain": "\nTente novamente",
  "common.loadingSkeleton": "\nCarregando conteúdo",
  "common.stepOf": "\nEtapa {current} de {total}",
  "common.getStarted": "\nComece",
  "common.learnMore": "\nSaiba mais",
  "common.viewAll": "\nVer tudo",
  "common.collapse": "\nRecolher",
  "common.expand": "\nExpandir",
  "assets.bulkExport": "\nExportar selecionado",
  "assets.bulkStatusUpdate": "\nAtualizar status",
  "assets.bulkExportSuccess": "\nExportação preparada para {count} ativos",
  "assets.bulkStatusSuccess": "\nAtualização de status na fila para {count} ativos",
  "assets.empty": "\nNenhum ativo encontrado",
  "assets.emptyCta": "\nAdicionar dispositivo",
  "assets.mediaEmpty": "\nSem mídia — arraste os arquivos aqui ou clique para fazer upload",
  "assets.mediaFormats": "\nAceito: JPEG, PNG, WebP",
  "assets.mediaMaxSize": "\nTamanho máximo do arquivo: 10 MB",
  "assets.editAsset": "\nEditar ativo",
  "assets.detail.metadata": "\nMetadados de ativos",
  "assets.detail.pinnedTitle": "\nFoco fixado",
  "assets.detail.pinnedDescription":
    "\nMantenha a guia atual fixada enquanto você alterna entre as visualizações de risco, ciclo de vida e governança.",
  "assets.detail.pinnedBadge": "\nFixado",
  "assets.detail.pinnedCurrent": "\nVisualização fixada atual",
  "assets.detail.pinnedOpen": "\nAbrir visualização fixada",
  "assets.detail.pinnedReset": "\nRedefinir para visão geral",
  "assets.detail.unresolvedInspectionEmpty": "\nNenhuma inspeção registrada ainda.",
  "assets.detail.unresolvedRisk": "\nPostura de risco",
  "assets.detail.unresolvedRiskDescription":
    "\nRevise os fatores de risco atuais, sinais de IA e inspeções atrasadas.",
  "assets.detail.unresolvedLifecycle": "\nPostura do ciclo de vida",
  "assets.detail.unresolvedLifecycleDescription":
    "\nRevise o custo do ciclo de vida, a vida útil restante e o planejamento de substituição.",
  "assets.detail.unresolvedGovernance": "\nPostura de governança",
  "assets.detail.unresolvedGovernanceDescription":
    "\nRevise a governança de FM, a cobertura de conformidade e os registros vinculados.",
  "assets.detail.unresolvedTitle": "\nÁreas de foco não resolvidas",
  "assets.detail.unresolvedDescription":
    "\nUse esses pontos de entrada para passar diretamente para a próxima questão de ativos não resolvida.",
  "assets.detail.unresolvedBadge": "\nPrecisa de revisão",
  "assets.detail.summaryTitle": "\nResumo do espaço de trabalho",
  "assets.detail.summaryDescription":
    "Mantenha o contexto atual do ativo, a inspeção mais recente e a carga de trabalho vinculada visíveis enquanto você navega.",
  "assets.detail.summarySiteDescription": "\nTipo de site e recurso",
  "assets.detail.summaryInspectionTitle": "\nÚltima inspeção",
  "assets.detail.summaryInspectionDescription":
    "\nStatus de inspeção mais recente registrado neste ativo.",
  "assets.detail.summaryInspectionSupporting":
    "\nO histórico de inspeções segue o registro de manutenção compartilhado.",
  "assets.detail.summaryWorkOrderTitle": "\nOrdens de serviço vinculadas",
  "assets.detail.summaryWorkOrderDescription":
    "\nCarga de trabalho vinculada atual em todas as atividades do ciclo de vida.",
  "assets.detail.navigatorTitle": "\nNavegador de seção",
  "assets.detail.navigatorDescription":
    "\nMova-se entre as seções de detalhes do ativo sem perder o contexto atual do ativo.",
  "assets.detail.priorityTitle": "\nPriorização e desempenho de riscos",
  "assets.detail.priorityDescription":
    "\nPostura derivada para priorização de manutenção baseada em risco usando condição atual, trabalho aberto, inspeções e sinais de previsão de IA.",
  "assets.detail.priorityStateStable": "\nEstável",
  "assets.detail.priorityStateWatch": "\nAssistir",
  "assets.detail.priorityStateCritical": "\nCrítico",
  "assets.detail.priorityAlertCriticalTitle": "\nIntervenção imediata é recomendada",
  "assets.detail.priorityAlertCriticalDescription":
    "\n{count} sinais críticos de previsão, condições restritas ou inspeções atrasadas estão levando este ativo para o topo da fila.",
  "assets.detail.priorityAlertWatchTitle": "\nMonitoramento e agendamento ativos são necessários",
  "assets.detail.priorityAlertWatchDescription":
    "\n{count} tarefa(s) aberta(s), trabalho ativo ou sinais não críticos ainda requerem atenção do operador para este ativo.",
  "assets.detail.priorityAlertStableTitle":
    "\nO ativo está operando dentro da linha de base controlada",
  "assets.detail.priorityAlertStableDescription":
    "\nNenhuma condição ativa, inspeção, ordem de serviço ou fatores de previsão estão atualmente elevando este ativo.",
  "assets.detail.priorityConditionDriver":
    "\nA postura da condição está contribuindo para a priorização.",
  "assets.detail.prioritySignalsDriver":
    "\nOs sinais de previsão de IA estão aumentando a urgência da intervenção.",
  "assets.detail.priorityInspectionsDriver":
    "\nAs inspeções atrasadas estão restringindo a prontidão.",
  "assets.detail.priorityWorkOrdersDriver":
    "\nOrdens de serviço ativas indicam carga de trabalho operacional não resolvida.",
  "assets.detail.priorityTasksDriver":
    "\nO backlog de tarefas abertas ainda requer atenção aos ativos.",
  "assets.detail.priorityNoDrivers": "\nNenhum driver de priorização ativo.",
  "assets.detail.priorityUtilisationTitle": "\nHoras de utilização",
  "assets.detail.priorityUtilisationDescription":
    "\nSinal de horário de operação rastreado atualmente mantido neste registro de ativo.",
  "assets.detail.priorityOpenTasksTitle": "\nAbrir tarefas",
  "assets.detail.priorityOpenTasksDescription":
    "\nTarefas pendentes, agendadas e em andamento vinculadas a este ativo.",
  "assets.detail.priorityInspectionsTitle": "\nInspeções atrasadas",
  "assets.detail.priorityInspectionsDescription":
    "\nAs tarefas de inspeção ultrapassaram o prazo e ainda não foram resolvidas.",
  "assets.detail.priorityWorkOrdersTitle": "\nOrdens de serviço ativas",
  "assets.detail.priorityWorkOrdersDescription":
    "\nOrdens de serviço vinculadas ainda em andamento na entrega operacional.",
  "assets.detail.priorityPredictionsTitle": "\nSinais de previsão recentes",
  "assets.detail.priorityPredictionsDescription":
    "\n{count} sinais totais de previsão estão atualmente vinculados a este ativo.",
  "assets.detail.priorityPredictionsEmpty":
    "Nenhum sinal de previsão está atualmente vinculado a este ativo.",
  "assets.detail.priorityPredictionsColumnType": "\nSinal",
  "assets.detail.priorityPredictionsColumnSeverity": "\nGravidade",
  "assets.detail.priorityPredictionsColumnRemainingLife": "\nVida restante",
  "assets.detail.priorityPredictionsColumnConfidence": "\nConfiança",
  "assets.detail.priorityPredictionsColumnAction": "\nAção gerada",
  "assets.detail.priorityPredictionsRemainingLifeValue": "\n{days} dias",
  "assets.detail.priorityGeneratedTask": "\nTarefa gerada",
  "assets.detail.priorityGeneratedWorkOrderAria": "\nAbrir ordem de serviço gerada {number}",
  "assets.detail.priorityNoAction": "\nNenhuma ação gerada",
  "assets.detail.readinessTitle": "\nProntidão operacional e disponibilidade",
  "assets.detail.readinessDescription":
    "\nPostura de prontidão em nível de ativo usando registros vinculados de alcance, segurança, alvo e controle GFE junto com inspeção atual e carga de trabalho de entrega.",
  "assets.detail.readinessStateReady": "\nPronto",
  "assets.detail.readinessStateWatch": "\nAssistir",
  "assets.detail.readinessStateConstrained": "\nRestrito",
  "assets.detail.readinessAlertConstrainedTitle":
    "\nA disponibilidade operacional está limitada no momento",
  "assets.detail.readinessAlertConstrainedDescription":
    "\n{controls} registros de controle vinculados requerem ação e {inspections} tarefas de inspeção vencidas permanecem abertas para este ativo.",
  "assets.detail.readinessAlertCoverageGapTitle":
    "\nA cobertura de prontidão precisa ser estabelecida",
  "assets.detail.readinessAlertCoverageGapDescription":
    "\nEste ativo vinculado à capacidade ainda não é respaldado por registros de controle operacional vinculados para {capability}. Capture controles de prontidão para restaurar a visibilidade direta da disponibilidade.",
  "assets.detail.readinessAlertWatchTitle": "\nA prontidão deve ser monitorada de perto",
  "assets.detail.readinessAlertWatchDescription":
    "\n{controls} registros de controle vinculados permanecem sob vigilância e {workOrders} ordens de serviço ativas ainda estão influenciando este ativo.",
  "assets.detail.readinessAlertReadyTitle":
    "\nNenhum bloqueador de prontidão ativo está registrado atualmente",
  "assets.detail.readinessAlertReadyDescription":
    "\n{controls} registros de controle vinculados estão atualmente disponíveis e em conformidade para este ativo.",
  "assets.detail.readinessControlDriver":
    "\nOs registros de controle operacional vinculados estão ausentes ou mostram pressão de disponibilidade antecipada.",
  "assets.detail.readinessComplianceDriver":
    "\nA postura de conformidade está restringindo ativamente a prontidão dos ativos.",
  "assets.detail.readinessConditionDriver":
    "\nA condição dos ativos está contribuindo para a atual postura de prontidão.",
  "assets.detail.readinessInspectionDriver":
    "\nInspeções atrasadas estão restringindo a disponibilidade operacional.",
  "assets.detail.readinessWorkOrderDriver":
    "\nAs ordens de serviço ativas ainda influenciam a disponibilidade dos ativos.",
  "assets.detail.readinessTaskDriver":
    "\nAs tarefas operacionais abertas ainda precisam ser compensadas neste ativo.",
  "assets.detail.readinessCapabilityDriver":
    "\nAtivos pares na mesma coorte de capacidade permanecem restritos.",
  "assets.detail.readinessNoDrivers": "\nNenhum driver de prontidão ativo.",
  "assets.detail.readinessDriversTitle": "\nDrivers de prontidão",
  "assets.detail.readinessCapabilityValue": "\nCapacidade: {capability}",
  "assets.detail.readinessLinkedControlsTitle": "\nRegistros de controle vinculados",
  "assets.detail.readinessLinkedControlsDescription":
    "\n{available} atualmente disponível ou em conformidade, atualização mais recente {timestamp}.",
  "assets.detail.readinessLinkedControlsEmptyDescription":
    "\nNenhum registro de controle operacional vinculado foi capturado para este ativo ainda.",
  "assets.detail.readinessActionRequiredTitle": "\nControles que requerem ação",
  "assets.detail.readinessActionRequiredDescription":
    "\n{watch} registros de controle adicionais permanecem sob vigilância.",
  "assets.detail.readinessInspectionTitle": "\nInspeções atrasadas",
  "assets.detail.readinessInspectionDescription":
    "Tarefas de inspeção que ultrapassaram o prazo e ainda não foram resolvidas.",
  "assets.detail.readinessWorkOrdersTitle": "\nOrdens de serviço ativas",
  "assets.detail.readinessWorkOrdersDescription":
    "\nOrdens de serviço vinculadas atualmente passando pela entrega operacional.",
  "assets.detail.readinessTasksTitle": "\nAbra tarefas operacionais",
  "assets.detail.readinessTasksDescription":
    "\nTrabalhos pendentes, programados e em andamento ainda vinculados a este ativo.",
  "assets.detail.readinessCapabilityTitle": "\nCoorte de capacidade",
  "assets.detail.readinessCapabilityValueShort": "\n{ready}/{total} pronto",
  "assets.detail.readinessCapabilityDescription":
    "\n{constrained} ativos pares permanecem restritos nesta coorte de capacidade vinculada.",
  "assets.detail.readinessCapabilityEmptyDescription":
    "\nNenhuma ligação de capacidade operacional foi capturada atualmente para este ativo.",
  "assets.detail.readinessRecordsTitle": "\nRegistros de prontidão vinculados",
  "assets.detail.readinessRecordsDescription":
    "\nRegistros recentes de alcance, segurança, alvo e controle GFE vinculados diretamente a este ativo.",
  "assets.detail.readinessRecordsEmpty":
    "\nNenhum registro de prontidão ou disponibilidade vinculado foi capturado para este ativo ainda.",
  "assets.detail.readinessControlColumn": "\nControle",
  "assets.detail.readinessOperationalColumn": "\nPostura operacional",
  "assets.detail.readinessComplianceColumn": "\nPostura de conformidade",
  "assets.detail.readinessSignalColumn": "\nSinal operacional",
  "assets.detail.readinessUpdatedColumn": "\nAtualizado",
  "assets.detail.readinessSignalMetric": "{value} ",
  "assets.detail.readinessSignalMetricWithUnit": "Valor: {value} {unit}",
  "assets.detail.readinessSignalTargetDate": "\nData prevista {date}",
  "assets.detail.readinessSignalNone": "\nNenhum sinal operacional registrado ainda.",
  "assets.detail.readinessOpenWorkspace": "\nEspaço de trabalho de propriedade aberta",
  "assets.detail.readinessOpenWorkspaceAria": "\nEspaço de trabalho de propriedade aberta",
  "assets.detail.fmGovernanceTitle": "\nPostura de governança e conformidade de FM",
  "assets.detail.fmGovernanceDescription":
    "\nGovernança de gerenciamento de instalações em nível de ativos usando cronogramas SFG20 vinculados, inspeções legais, registros de conformidade e trabalho de entrega conectado.",
  "assets.detail.fmGovernanceStateAssured": "\nGarantido",
  "assets.detail.fmGovernanceStateWatch": "\nAssistir",
  "assets.detail.fmGovernanceStateActionRequired": "\nAção necessária",
  "assets.detail.fmGovernanceAlertActionRequiredTitle":
    "\nA governança de FM requer atenção imediata",
  "assets.detail.fmGovernanceAlertActionRequiredDescription":
    "\n{attention} registros de governança vinculados exigem ação e {overdue} item(s) de cronograma já estão vencidos para este ativo.",
  "assets.detail.fmGovernanceAlertCoverageGapTitle":
    "\nA cobertura da governança FM não foi estabelecida",
  "assets.detail.fmGovernanceAlertCoverageGapDescription":
    "\nNenhum registro de governança de FM vinculado foi capturado atualmente para este ativo. Adicione registros estatutários, SFG20 ou de governança de serviço para restaurar a visibilidade da garantia.",
  "assets.detail.fmGovernanceAlertWatchTitle": "\nA governança de FM deve ser monitorada de perto",
  "assets.detail.fmGovernanceAlertWatchDescription":
    "\n{watch} registros de governança vinculados permanecem sob vigilância, {dueSoon} vencem em breve e {workOrders} ordens de serviço vinculadas ainda estão ativas.",
  "assets.detail.fmGovernanceAlertAssuredTitle": "\nA governança de FM está atualmente garantida",
  "assets.detail.fmGovernanceAlertAssuredDescription":
    "\n{linked} registros de governança vinculados são atualmente rastreados sem bloqueadores ativos de conformidade de FM para este ativo.",
  "assets.detail.fmGovernanceCoverageDriver":
    "\nFalta cobertura de governança FM vinculada para este ativo.",
  "assets.detail.fmGovernanceAttentionDriver":
    "\nUm ou mais registros de governança de FM já exigem ação corretiva.",
  "assets.detail.fmGovernanceMonitoringDriver":
    "\nOs registros de governança permanecem sob vigilância e precisam de monitoramento rigoroso.",
  "assets.detail.fmGovernanceScheduleDriver":
    "\nDatas de governança futuras ou vencidas estão impulsionando a postura atual.",
  "assets.detail.fmGovernanceWorkOrdersDriver":
    "As ordens de serviço vinculadas ainda estão movimentando as ações de governança de FM por meio da entrega.",
  "assets.detail.fmGovernanceNoDrivers": "\nNenhum impulsionador ativo de governança de FM.",
  "assets.detail.fmGovernanceDriversTitle": "\nDirecionadores de governança FM",
  "assets.detail.fmGovernanceLinkedRecordsTitle": "\nRegistros de governança vinculados",
  "assets.detail.fmGovernanceLinkedRecordsDescription":
    "\nÚltima atividade de governança atualizada {timestamp}.",
  "assets.detail.fmGovernanceLinkedRecordsEmptyDescription":
    "\nNenhum registro de governança de FM foi vinculado a este ativo ainda.",
  "assets.detail.fmGovernanceAttentionTitle": "\nRegistros de atenção",
  "assets.detail.fmGovernanceAttentionDescription":
    "\n{watch} registros adicionais de governança permanecem sob vigilância.",
  "assets.detail.fmGovernanceScheduleTitle": "\nAgendamentos atrasados",
  "assets.detail.fmGovernanceScheduleDescription":
    "\n{dueSoon} registros adicionais de governança serão lançados em breve.",
  "assets.detail.fmGovernanceWorkOrdersTitle": "\nOrdens de serviço vinculadas ativas",
  "assets.detail.fmGovernanceWorkOrdersDescription":
    "\nOrdens de serviço conectadas diretamente à entrega de governança de FM para este ativo.",
  "assets.detail.fmGovernanceStatutoryTitle": "\nInspeções legais",
  "assets.detail.fmGovernanceStatutoryDescription":
    "\nRegistros de governança de inspeção estatutária direta vinculados a este ativo.",
  "assets.detail.fmGovernanceSfg20Title": "\nHorários SFG20",
  "assets.detail.fmGovernanceSfg20Description":
    "\nCronogramas de manutenção vinculados do SFG20 rastreados em relação a este ativo.",
  "assets.detail.fmGovernanceRecordsTitle": "\nRegistros recentes de governança FM",
  "assets.detail.fmGovernanceRecordsDescription":
    "\nRegistros recentes de governança de gerenciamento de instalações vinculados diretamente a este ativo.",
  "assets.detail.fmGovernanceRecordsEmpty":
    "\nNenhum registro de governança ou conformidade de FM foi capturado para este ativo ainda.",
  "assets.detail.fmGovernanceRecordColumn": "\nRegistro",
  "assets.detail.fmGovernanceDomainColumn": "\nDomínio",
  "assets.detail.fmGovernancePostureColumn": "\nPostura",
  "assets.detail.fmGovernanceDueColumn": "\nVencimento e medida",
  "assets.detail.fmGovernanceWorkOrderColumn": "\nOrdem de serviço vinculada",
  "assets.detail.fmGovernanceUpdatedColumn": "\nAtualizado",
  "assets.detail.fmGovernanceDueOverdue": "\nVencido",
  "assets.detail.fmGovernanceDueSoon": "\nVencimento em breve",
  "assets.detail.fmGovernanceDueScheduled": "\nAgendado",
  "assets.detail.fmGovernanceDueUnset": "\nSem data de vencimento",
  "assets.detail.fmGovernanceDueDateValue": "\nVencimento {date}",
  "assets.detail.fmGovernanceDueUnsetDescription":
    "\nNenhuma data de vencimento está atualmente registrada para este item de governança.",
  "assets.detail.fmGovernanceMetricValue": "\n{value} gravado",
  "assets.detail.fmGovernanceMetricValueWithUnit": "\n{value} {unit} gravado",
  "assets.detail.fmGovernanceNoWorkOrder": "\nNenhuma ordem de serviço vinculada",
  "assets.detail.fmGovernanceLinkedWorkOrdersValue": "\n{count} ordens de serviço vinculadas",
  "assets.detail.fmGovernanceOpenWorkspace": "\nEspaço de trabalho de propriedade aberta",
  "assets.detail.fmGovernanceOpenWorkspaceAria": "\nEspaço de trabalho de propriedade aberta",
  "assets.detail.fmGovernanceOpenWorkOrderAria":
    "\nOrdem de serviço de governança FM aberta {number}",
  "assets.detail.performanceTitle": "\nMonitoramento de utilização e desempenho",
  "assets.detail.performanceDescription":
    "\nPostura de utilização ativa para esse ativo usando telemetria capturada, registro de horas de operação e carga de trabalho operacional vinculada.",
  "assets.detail.performanceStateBlindSpot": "\nPonto cego de telemetria",
  "assets.detail.performanceStateStale": "\nTelemetria obsoleta",
  "assets.detail.performanceAlertBlindSpotTitle":
    "\nA telemetria de utilização ao vivo ainda não está disponível",
  "assets.detail.performanceAlertBlindSpotDescription":
    "\nNo momento, este ativo depende da linha de base do registro de {current} até que a telemetria de utilização comece a relatar.",
  "assets.detail.performanceAlertStaleTitle": "\nA telemetria de utilização precisa de atenção",
  "assets.detail.performanceAlertStaleDescription":
    "\nA última amostra de utilização foi capturada {timestamp}. Atualize o dispositivo ou a cobertura de telemetria para restaurar o monitoramento atual.",
  "assets.detail.performanceAlertOverTitle":
    "\nO ativo está operando acima da faixa de utilização ideal",
  "assets.detail.performanceAlertOverDescription":
    "A utilização atual é de {current} contra uma média de {average}, com {critical} sinais críticos já vinculados a este ativo.",
  "assets.detail.performanceAlertUnderTitle":
    "\nA utilização está abaixo da faixa operacional esperada",
  "assets.detail.performanceAlertUnderDescription":
    "\nA utilização atual é de {current} contra uma média de {average}. Revise as restrições de implantação, disponibilidade ou agendamento.",
  "assets.detail.performanceAlertWatchTitle": "\nA utilização deve ser monitorada de perto",
  "assets.detail.performanceAlertWatchDescription":
    "\nA utilização atual é de {current} contra uma média de {average}. O ativo está se aproximando de uma postura super ou subutilizada.",
  "assets.detail.performanceAlertOptimalTitle":
    "\nA utilização está dentro da faixa operacional balanceada",
  "assets.detail.performanceAlertOptimalDescription":
    "\nA utilização atual é de {current} contra uma média de {average}, e a cobertura de telemetria está ativa para este ativo.",
  "assets.detail.performanceRecordedHoursTitle": "\nHoras de operação registradas",
  "assets.detail.performanceRecordedHoursValue": "\n{hours} horas",
  "assets.detail.performanceRecordedHoursDescription":
    "\nNúmero de horas de operação rastreadas atualmente armazenado no registro de ativo.",
  "assets.detail.performanceCurrentTitle": "\nUtilização atual",
  "assets.detail.performanceCurrentDescription":
    "\nTelemetria de utilização capturada mais recente para este ativo.",
  "assets.detail.performanceCurrentFallbackDescription":
    "\nA postura atual está usando a linha de base do horário de operação do registro porque nenhuma telemetria está disponível.",
  "assets.detail.performanceAverageTitle": "\nUtilização média",
  "assets.detail.performanceAverageDescription":
    "\nUtilização média em amostras de telemetria capturadas.",
  "assets.detail.performanceCoverageTitle": "\nCobertura de telemetria",
  "assets.detail.performanceCoverageDescription":
    "\n{timestamp} foi a última amostra de utilização capturada para este ativo.",
  "assets.detail.performanceCoverageEmptyDescription":
    "\nNenhuma amostra de telemetria de utilização foi capturada para este ativo ainda.",
  "assets.detail.performanceTasksTitle": "\nCarga de trabalho operacional aberta",
  "assets.detail.performanceTasksDescription":
    "\nTarefas abertas ainda vinculadas a este ativo na entrega de inspeção e manutenção.",
  "assets.detail.performanceSignalsTitle": "\nSinais de previsão",
  "assets.detail.performanceSignalsDescription":
    "\n{count} sinais críticos estão atualmente vinculados a este ativo.",
  "assets.detail.performanceSamplesTitle": "\nAmostras de utilização recente",
  "assets.detail.performanceSamplesDescription":
    "\nAmostras de telemetria recentes para este ativo, com um intervalo atual de {min} a {max} e {activeWorkOrders} ordens de serviço ativas em andamento.",
  "assets.detail.performanceSamplesEmpty":
    "\nNenhuma telemetria de utilização foi capturada para este ativo ainda.",
  "assets.detail.performanceTimestampColumn": "\nCapturado",
  "assets.detail.performanceUtilisationColumn": "\nUtilização",
  "assets.detail.performancePostureColumn": "\nPostura",
  "assets.detail.performanceOpenWorkspace": "\nEspaço de trabalho de utilização aberta",
  "assets.detail.performanceOpenWorkspaceAria": "\nEspaço de trabalho de utilização aberta",
  "assets.detail.replacementTitle": "\nPlanejamento de substituição e postura de capital",
  "assets.detail.replacementDescription":
    "\nPostura de substituição derivada para este ativo usando estado do ciclo de vida, condição, sinais de previsão de IA e trabalho de substituição ativo.",
  "assets.detail.replacementStateBaseline": "\nLinha de base",
  "assets.detail.replacementStatePlan": "\nPlano",
  "assets.detail.replacementStateReplace": "\nSubstituir",
  "assets.detail.replacementAlertReplaceTitle": "\nExecute o planejamento de substituição agora",
  "assets.detail.replacementAlertReplaceDescription":
    "Sinais urgentes de ciclo de vida, condição, previsão ou ordem de serviço ativa indicam que este ativo deve passar para a execução de substituição ativa.",
  "assets.detail.replacementAlertPlanTitle": "\nPrepare o caso capital",
  "assets.detail.replacementAlertPlanDescription":
    "\nA pressão emergente do ciclo de vida ou o trabalho de substituição em fila significa que este ativo deve entrar no planejamento financeiro e na revisão de substituição.",
  "assets.detail.replacementAlertBaselineTitle":
    "\nNenhuma pressão de reposição ativa foi detectada",
  "assets.detail.replacementAlertBaselineDescription":
    "\nO ciclo de vida atual, a condição e os sinais de trabalho ainda não exigem uma resposta de planejamento de substituição para este ativo.",
  "assets.detail.replacementLifecycleDriver":
    "\nA postura do ciclo de vida está empurrando esse ativo para a substituição.",
  "assets.detail.replacementConditionDriver":
    "\nA degradação das condições está contribuindo para o planejamento da substituição.",
  "assets.detail.replacementPredictionDriver":
    "\nOs sinais de previsão indicam uma pista com vida útil restante mais curta.",
  "assets.detail.replacementTasksDriver":
    "\nAs tarefas de substituição já estão na fila para este ativo.",
  "assets.detail.replacementWorkOrdersDriver":
    "\nAs ordens de serviço de substituição ativas mostram que a entrega já está em andamento.",
  "assets.detail.replacementNoDrivers": "\nNenhum driver de substituição ativo.",
  "assets.detail.replacementDriversTitle": "\nDrivers de substituição",
  "assets.detail.replacementBookValueTitle": "\nValor contábil atual",
  "assets.detail.replacementBookValueDescription":
    "\nValor contábil atual mantido contra este registro de ativo.",
  "assets.detail.replacementAdjustedValueTitle": "\nValor de reposição ajustado",
  "assets.detail.replacementAdjustedValueDescription":
    "\nValor de substituição estimado ajustado pela gravidade da previsão atual.",
  "assets.detail.replacementCapitalGapTitle": "\nLacuna de capital",
  "assets.detail.replacementCapitalGapDescription":
    "\nVariação em relação ao valor contábil atual: {percent}.",
  "assets.detail.replacementLifeTitle": "\nVida restante",
  "assets.detail.replacementLifeValue": "\n{days} dias",
  "assets.detail.replacementLifeDescription":
    "\nÚltimo sinal de vida restante previsto, quando disponível.",
  "assets.detail.replacementTasksTitle": "\nTarefas de substituição",
  "assets.detail.replacementTasksDescription":
    "\n{count} ordens de serviço de substituição ativas estão atualmente vinculadas a este ativo.",
  "assets.detail.replacementActionsTitle": "\nAções de substituição ativa",
  "assets.detail.replacementActionsDescription":
    "\nTarefas de substituição recentes e ordens de serviço vinculadas que atualmente impulsionam a entrega de substituição.",
  "assets.detail.replacementActionsEmpty":
    "\nNenhuma ação de substituição ativa está vinculada a este ativo ainda.",
  "assets.detail.replacementPriorityColumn": "\nPrioridade",
  "assets.detail.replacementStatusColumn": "\nStatus",
  "assets.detail.replacementWorkOrderColumn": "\nOrdem de serviço vinculada",
  "assets.detail.replacementAssigneeColumn": "\nCessionário",
  "assets.detail.replacementDeadlineColumn": "\nPrazo",
  "assets.detail.replacementUpdatedColumn": "\nAtualizado",
  "assets.detail.replacementStandalone": "\nTarefa de substituição independente",
  "assets.detail.replacementNoAssignee": "\nNenhum cessionário",
  "assets.detail.replacementNoDeadline": "\nSem prazo",
  "assets.detail.replacementOpenPlanning": "\nPlanejamento financeiro aberto",
  "assets.detail.replacementOpenPlanningAria":
    "Espaço de trabalho de planejamento financeiro aberto",
  "assets.detail.replacementOpenWorkOrderAria": "\nAbrir ordem de serviço de substituição {number}",
  "assets.detail.inspectionsTitle": "\nRegistros de inspeção",
  "assets.detail.inspectionsDescription":
    "\nTarefas de inspeção recentes e ordens de serviço vinculadas para este ativo, ordenadas pela atividade operacional mais recente.",
  "assets.detail.inspectionsEmpty":
    "\nNenhum registro de inspeção foi capturado para este ativo ainda.",
  "assets.detail.inspectionsStatus": "\nStatus de inspeção",
  "assets.detail.inspectionsWorkOrder": "\nOrdem de serviço vinculada",
  "assets.detail.inspectionsAssignee": "\nCessionário",
  "assets.detail.inspectionsDeadline": "\nPrazo",
  "assets.detail.inspectionsCompleted": "\nConcluído",
  "assets.detail.inspectionsUpdated": "\nAtualizado",
  "assets.detail.inspectionsStandalone": "\nTarefa de inspeção autônoma",
  "assets.detail.inspectionsUnassigned": "\nNenhum cessionário",
  "assets.detail.inspectionsNoDeadline": "\nSem prazo",
  "assets.detail.inspectionsNoCompletion": "\nNão concluído",
  "assets.detail.maintenanceTitle": "\nAtividade de manutenção",
  "assets.detail.maintenanceDescription":
    "Reparos recentes, calibração e trabalhos de emergência vinculados a este ativo, incluindo status da tarefa e entrega de ordem de serviço conectada.",
  "assets.detail.maintenanceAlertActiveTitle": "\nA carga de trabalho de manutenção está ativa",
  "assets.detail.maintenanceAlertActiveDescription":
    "\n{openTasks} tarefas de manutenção abertas e {activeWorkOrders} ordens de serviço ativas estão atualmente vinculadas a este ativo.",
  "assets.detail.maintenanceAlertIdleTitle":
    "\nNenhuma carga de trabalho de manutenção ativa está aberta",
  "assets.detail.maintenanceAlertIdleDescription":
    "\nNão há itens ativos de reparo, calibração ou trabalho de emergência atualmente vinculados a este ativo.",
  "assets.detail.maintenanceOpenTasksTitle": "\nAbrir tarefas de manutenção",
  "assets.detail.maintenanceOpenTasksDescription":
    "\nTarefas de reparo, calibração e emergência ainda em vôo.",
  "assets.detail.maintenanceCompletedTasksTitle": "\nTarefas de manutenção concluídas",
  "assets.detail.maintenanceCompletedTasksDescription":
    "\nTarefas de manutenção já encerradas para este ativo.",
  "assets.detail.maintenanceActiveWorkOrdersTitle": "\nOrdens de serviço de manutenção ativas",
  "assets.detail.maintenanceActiveWorkOrdersDescription":
    "\nOrdens de serviço vinculadas ainda em andamento na entrega operacional.",
  "assets.detail.maintenanceCompletedWorkOrdersTitle":
    "\nOrdens de serviço de manutenção concluídas",
  "assets.detail.maintenanceCompletedWorkOrdersDescription":
    "\nOrdens de serviço vinculadas já concluídas para este ativo.",
  "assets.detail.maintenanceRecordsTitle": "\nRegistros de manutenção recentes",
  "assets.detail.maintenanceRecordsDescription":
    "\nAs últimas tarefas de manutenção e ordens de serviço vinculadas, ordenadas pelo movimento mais recente.",
  "assets.detail.maintenanceEmpty":
    "\nNenhum registro de reparo, calibração ou manutenção de emergência foi capturado para este ativo ainda.",
  "assets.detail.maintenanceTypeColumn": "\nTipo",
  "assets.detail.maintenancePriorityColumn": "\nPrioridade",
  "assets.detail.maintenanceStatusColumn": "\nStatus",
  "assets.detail.maintenanceWorkOrderColumn": "\nOrdem de serviço vinculada",
  "assets.detail.maintenanceAssigneeColumn": "\nCessionário",
  "assets.detail.maintenanceDeadlineColumn": "\nPrazo",
  "assets.detail.maintenanceCompletedColumn": "\nConcluído",
  "assets.detail.maintenanceUpdatedColumn": "\nAtualizado",
  "assets.detail.maintenanceStandalone": "\nTarefa de manutenção autônoma",
  "assets.detail.maintenanceNoAssignee": "\nNenhum cessionário",
  "assets.detail.maintenanceNoDeadline": "\nSem prazo",
  "assets.detail.maintenanceNoCompletion": "\nNão concluído",
  "assets.detail.maintenanceOpenWorkOrders": "\nOrdens de serviço abertas",
  "assets.detail.maintenanceOpenWorkOrdersAria":
    "\nEspaço de trabalho de ordens de serviço abertas",
  "assets.detail.maintenanceOpenWorkOrderAria": "\nAbrir ordem de serviço de manutenção {number}",
  "assets.detail.costsTitle": "\nAlocação de custos do ciclo de vida",
  "assets.detail.costsDescription":
    "\nAlocação recente de custos de ordens de serviço vinculadas a este ativo, incluindo mão de obra, materiais e outros gastos operacionais.",
  "assets.detail.costsEmpty":
    "\nNenhum registro de custo de ordem de serviço vinculado foi capturado para este ativo ainda.",
  "assets.detail.costsTotalTitle": "\nCusto total vinculado",
  "assets.detail.costsTotalDescription": "\n{count} ordens de serviço vinculadas",
  "assets.detail.costsActiveTitle": "\nOrdens de serviço ativas",
  "assets.detail.costsActiveDescription":
    "\nCarga de trabalho operacional ainda em andamento para este ativo.",
  "assets.detail.costsLabourTitle": "\nAlocação de mão de obra",
  "assets.detail.costsLabourDescription":
    "\nCusto total de mão de obra registrado nas ordens de serviço vinculadas.",
  "assets.detail.costsMaterialTitle": "\nAlocação de materiais",
  "assets.detail.costsMaterialDescription":
    "\nCompromissos materiais vinculados por meio de entrega de ordem de serviço.",
  "assets.detail.costsWorkOrder": "\nOrdem de serviço",
  "assets.detail.costsStatus": "\nStatus",
  "assets.detail.costsLabourColumn": "\nMão de obra",
  "assets.detail.costsMaterialColumn": "\nMaterial",
  "assets.detail.costsOtherColumn": "\nOutro",
  "assets.detail.costsTotalColumn": "\nTotal",
  "assets.detail.costsUpdatedColumn": "\nÚltimo movimento",
  "assets.detail.costsCompletedValue": "\nConcluído {date}",
  "assets.lifecycleProfile.title": "\nPerfil de gerenciamento do ciclo de vida",
  "assets.lifecycleProfile.description":
    "\nRastreie a condição operacional atual, a postura do ciclo de vida e a última inspeção confirmada para este ativo.",
  "assets.lifecycleProfile.conditionLabel": "\nCondição",
  "assets.lifecycleProfile.conditionHint":
    "\nDefina a condição operacional atual usada pela análise do ciclo de vida, relatórios de prontidão e priorização.",
  "assets.lifecycleProfile.lifecycleLabel": "\nEstágio do ciclo de vida",
  "assets.lifecycleProfile.lifecycleHint":
    "Escolha a postura atual do ciclo de vida para que os relatórios estratégicos de ativos possam distinguir ativos ativos, monitorados e em fim de vida.",
  "assets.lifecycleProfile.lastInspectionLabel": "\nData da última inspeção",
  "assets.lifecycleProfile.lastInspectionHint":
    "\nCapture a última data de inspeção confirmada quando a cronologia acima ainda não reflete o registro atual do patrimônio.",
  "assets.lifecycleProfile.submit": "\nSalvar perfil de ciclo de vida",
  "assets.lifecycleProfile.submitAria":
    "\nSalvar perfil de gerenciamento do ciclo de vida de ativos",
  "assets.lifecycleProfile.snapshotTitle": "\nInstantâneo da postura do ciclo de vida",
  "assets.lifecycleProfile.snapshotDescription":
    "\nO status atual do ciclo de vida usado pela análise de prontidão, condição e planejamento de substituição.",
  "assets.lifecycleProfile.snapshotCondition": "\nCondição",
  "assets.lifecycleProfile.snapshotLifecycle": "\nEstágio do ciclo de vida",
  "assets.lifecycleProfile.snapshotInspection": "\nÚltima inspeção",
  "assets.lifecycleProfile.snapshotUpdated": "\nÚltima atualização",
  "assets.lifecycleProfile.historyTitle": "\nHistórico do ciclo de vida",
  "assets.lifecycleProfile.historyDescription":
    "\nAs alterações versionadas do ciclo de vida são capturadas aqui para governança de condições e planejamento de descarte.",
  "assets.lifecycleProfile.historyEmpty":
    "\nNenhuma mudança no ciclo de vida foi registrada ainda. Salve uma atualização para iniciar a trilha de auditoria.",
  "assets.lifecycleProfile.historyUpdated": "\nAtualização do ciclo de vida",
  "assets.lifecycleProfile.historyFrom": "\nDe",
  "assets.lifecycleProfile.historyTo": "\nPara",
  "assets.lifecycleProfile.history.fieldCondition": "\nCondição",
  "assets.lifecycleProfile.history.fieldStage": "\nEstágio do ciclo de vida",
  "assets.lifecycleProfile.history.fieldInspection": "\nÚltima inspeção",
  "assets.lifecycleProfile.feedback.saved": "\nPerfil de ciclo de vida do ativo salvo.",
  "assets.lifecycleProfile.feedback.loadFailed":
    "\nNão é possível carregar o perfil do ciclo de vida do ativo no momento.",
  "assets.lifecycleProfile.feedback.saveFailed":
    "\nNão é possível salvar o perfil do ciclo de vida do ativo no momento.",
  "assets.lifecycleProfile.validation.conditionRequired": "\nEscolha uma condição válida.",
  "assets.lifecycleProfile.validation.lifecycleRequired":
    "\nEscolha um estágio de ciclo de vida válido.",
  "assets.lifecycleProfile.validation.lastInspectionInvalid": "\nUse uma data de inspeção válida.",
  "assets.registry.title": "\nPerfil de registro imobiliário",
  "assets.registry.description":
    "\nMapeie esse ativo na hierarquia de propriedade e vincule-o à capacidade de treinamento que ele suporta.",
  "assets.registry.hierarchyLabel": "\nNível de hierarquia",
  "assets.registry.parentLabel": "\nAtivo pai",
  "assets.registry.capabilityLabel": "\nLigação de capacidade operacional",
  "assets.registry.capabilityPlaceholder":
    "\nExemplo: disponibilidade de autonomia, disponibilidade de acomodação, envio de veículo",
  "assets.registry.capabilityHint":
    "\nDescreva o resultado operacional que este ativo permite para que os relatórios imobiliários possam ser acumulados por capacidade.",
  "assets.registry.parentHint":
    "\nEscolha um pai no mesmo local quando esse ativo estiver em uma instalação, sistema ou subsistema na hierarquia de propriedade.",
  "assets.registry.hierarchyHint":
    "\nUse Propriedade → Instalação → Sistema → Subsistema → Componente para manter o registro consistente.",
  "assets.registry.parentRoot": "\nNenhum recurso pai",
  "assets.registry.submit": "\nSalvar perfil de registro",
  "assets.registry.submitAria": "\nSalvar perfil de registro de imóveis",
  "assets.registry.snapshotTitle": "\nInstantâneo de vinculação de registro",
  "assets.registry.snapshotDescription":
    "\nA cadeia de hierarquia atual e o acúmulo de recursos usados pela estratégia de propriedade, planejamento de ordens de serviço e exportações.",
  "assets.registry.snapshotParent": "\nAtivo pai",
  "assets.registry.snapshotChildren": "\nAtivos filhos diretos",
  "assets.registry.snapshotCapability": "\nLigação de capacidade",
  "assets.registry.snapshotUpdated": "\nÚltima atualização",
  "assets.registry.historyTitle": "\nAlterar histórico",
  "assets.registry.historyDescription":
    "As atualizações de registro versionadas são capturadas aqui para hierarquia e governança de recursos.",
  "assets.registry.historyEmpty":
    "\nNenhuma alteração no registro foi registrada ainda. Salve uma atualização para iniciar a trilha de auditoria.",
  "assets.registry.historyUpdated": "\nAtualização de registro",
  "assets.registry.historyFrom": "\nDe",
  "assets.registry.historyTo": "\nPara",
  "assets.registry.history.fieldHierarchy": "\nNível de hierarquia",
  "assets.registry.history.fieldParent": "\nAtivo pai",
  "assets.registry.history.fieldCapability": "\nLigação de capacidade operacional",
  "assets.registry.feedback.saved": "\nPerfil de registro de ativos salvo.",
  "assets.registry.feedback.loadFailed":
    "\nNão é possível carregar o perfil de registro de ativos no momento.",
  "assets.registry.feedback.saveFailed":
    "\nNão é possível salvar o perfil de registro de ativos no momento.",
  "assets.registry.validation.hierarchyLevelRequired": "\nEscolha um nível de hierarquia válido.",
  "assets.registry.validation.parentSelf": "\nUm ativo não pode ser seu próprio pai.",
  "assets.registry.validation.parentMissing": "\nEscolha um ativo pai válido deste registro.",
  "assets.registry.validation.parentSiteMismatch":
    "\nOs ativos principais devem pertencer ao mesmo local para preservar a integridade da hierarquia patrimonial.",
  "assets.registry.validation.parentLevel":
    "\nEscolha um ativo pai que fique acima do nível de hierarquia selecionado.",
  "assets.registry.validation.parentCycle":
    "\nEste pai criaria uma hierarquia de propriedade circular.",
  "tasks.quickAdd": "\nTarefa de adição rápida",
  "tasks.quickAddAsset": "\nAtivo",
  "tasks.quickAddSuccess": "\nTarefa criada",
  "tasks.quickAddPlaceholder": "\nTítulo da tarefa...",
  "tasks.newTask": "\nNova tarefa",
  "tasks.quickAddAdd": "\nAdicionar",
  "tasks.quickAddStatus": "\nStatus",
  "tasks.dragToReorder": "\nArraste para alterar o status",
  "tasks.detail": "\nDetalhe da tarefa",
  "tasks.statusUpdated": "\nStatus da tarefa atualizado",
  "tasks.empty": "\nNenhuma tarefa correspondente encontrada",
  "tasks.emptyBacklog": "\nNenhuma tarefa no Backlog",
  "tasks.emptyInProgress": "\nNenhuma tarefa em andamento",
  "tasks.emptyReview": "\nNenhuma tarefa em revisão",
  "tasks.emptyDone": "\nNenhuma tarefa concluída",
  "tasks.addToColumn": "\nAdicionar tarefa",
  "tasks.moveToStatus": "\nMover para status",
  "predictions.markReviewed": "\nMarcar como revisado",
  "predictions.emptyExplainer":
    "\nAs previsões aparecem quando os dispositivos relatam telemetria por mais de 7 dias",
  "predictions.severityLegend": "\nLegenda de gravidade",
  "predictions.severityInfo": "\nInformativo – nenhuma ação necessária",
  "predictions.severityWarning": "\nAtenção necessária – agendar manutenção",
  "predictions.severityCritical": "\nAção imediata necessária",
  "profile.edit": "\nEditar perfil",
  "profile.editName": "\nEditar nome",
  "profile.nameRequired": "\nO nome é obrigatório",
  "profile.saved": "\nPerfil atualizado",
  "profile.preferencesSaved": "\nPreferências salvas",
  "profile.notificationPreferences": "\nPreferências de notificação",
  "profile.enableNotifications": "\nAtivar notificações por e-mail",
  "profile.locale": "\nLocal",
  "profile.localeEnGb": "\nInglês (Reino Unido)",
  "profile.localeEnUs": "\nInglês (EUA)",
  "profile.savePreferences": "\nSalvar preferências",
  "profile.languageLocale": "\nIdioma/localidade",
  "profile.avatarAlt": "\nAvatar do perfil",
  "auth.forgotPassword": "\nEsqueceu a senha?",
  "auth.forgotPassword.documentTitle": "\nSenha esquecida — Plataforma operacional",
  "auth.forgotPasswordHelp": "\nDigite o endereço de e-mail usado para sua conta.",
  "auth.forgotPasswordPageHelp":
    "\nEnviaremos um link seguro para redefinição de senha se a conta existir.",
  "auth.forgotPassword.contextTitle": "\nEspaço de trabalho de recuperação",
  "auth.forgotPassword.contextDescription":
    "\nMantenha a recuperação no mesmo fluxo seguro, confirme o endereço da conta e deixe explícito o próximo passo antes de sair desta tela.",
  "auth.forgotPassword.progressTitle": "\nFluxo de recuperação",
  "auth.forgotPassword.progressDescription":
    "\nSolicite o link, verifique sua caixa de entrada, defina uma nova senha e revise as sessões ativas.",
  "auth.forgotPassword.progressStep.request": "\nSolicitar link",
  "auth.forgotPassword.progressStep.inbox": "\nVerifique a caixa de entrada",
  "auth.forgotPassword.progressStep.reset": "\nRedefinir senha",
  "auth.forgotPassword.responseWindowLabel": "\nExpectativa de entrega",
  "auth.forgotPassword.responseWindowValue":
    "\nA entrega do link começa imediatamente após o envio",
  "auth.forgotPassword.channelLabel": "Canal de recuperação",
  "auth.forgotPassword.channelValue": "\nRedefinição baseada em e-mail com redirecionamento seguro",
  "auth.forgotPassword.checklist.accountTitle": "\nConfirme primeiro o e-mail da conta",
  "auth.forgotPassword.checklist.accountDescription":
    "\nUse o endereço que já tem acesso ao espaço de trabalho da organização para evitar reiniciar o fluxo de recuperação.",
  "auth.forgotPassword.checklist.inboxTitle": "\nObserve a caixa de entrada e as pastas de spam",
  "auth.forgotPassword.checklist.inboxDescription":
    "\nO link seguro pode chegar alguns momentos após o envio, dependendo do gateway de correio da organização.",
  "auth.forgotPassword.checklist.supportTitle": "\nUse o mesmo caminho de recuperação para support",
  "auth.forgotPassword.checklist.supportDescription":
    "\nSe a mensagem não chegar, tente novamente nesta tela e mantenha o mesmo contexto da conta em vez de criar um novo caminho de login.",
  "auth.forgotPassword.timingTitle": "\nTempo de recuperação",
  "auth.forgotPassword.timingDescription":
    "\nMantenha o operador informado sobre quando a solicitação chega, quando a caixa de entrada deve ser verificada e quando tentar novamente.",
  "auth.forgotPassword.timingSubmittedTitle": "\nSolicitação enviada",
  "auth.forgotPassword.timingSubmittedDescription":
    "\nColocamos o e-mail de redefinição segura na fila assim que a solicitação for aceita.",
  "auth.forgotPassword.timingInboxTitle": "\nVerifique a caixa de entrada",
  "auth.forgotPassword.timingInboxDescription":
    "\nProcure primeiro o e-mail de recuperação na caixa de entrada principal e depois nas pastas de spam ou quarentena.",
  "auth.forgotPassword.timingRetryTitle": "\nTente novamente somente depois que a janela passar",
  "auth.forgotPassword.timingRetryDescription":
    "\nSe o link não chegar após a janela esperada, tente novamente nesta página para que o mesmo caminho de recuperação permaneça ativo.",
  "auth.forgotPasswordResetTitle": "\nRedefinir sua senha",
  "auth.resetPassword.documentTitle": "\nRedefinir senha — Plataforma operacional",
  "auth.forgotPasswordCheckEmail": "\nVerifique seu e-mail",
  "auth.forgotPassword.sent.documentTitle": "\nVerifique seu e-mail — Plataforma operacional",
  "auth.forgotPasswordCheckEmailDesc":
    "\nSe existir uma conta com esse e-mail, enviamos um link de redefinição de senha.",
  "auth.forgotPassword.sentTitle": "\nLink de recuperação enviado",
  "auth.forgotPassword.sentDescription":
    "\nUse o link seguro da sua caixa de entrada e retorne ao mesmo fluxo de login para que o destino do espaço de trabalho seja preservado.",
  "auth.forgotPassword.sentTimingTitle": "\nO que acontece a seguir",
  "auth.forgotPassword.sentTimingDescription":
    "\nUse o link de e-mail imediatamente, tente novamente somente se necessário e mantenha o contexto de segurança visível enquanto espera.",
  "auth.forgotPassword.sentTimingArrivalTitle": "\nChegada do link",
  "auth.forgotPassword.sentTimingArrivalDescription":
    "\nO e-mail de redefinição deve chegar logo após o envio, dependendo do gateway de e-mail da organização.",
  "auth.forgotPassword.sentTimingRetryTitle": "\nTente novamente a orientação",
  "auth.forgotPassword.sentTimingRetryDescription":
    "\nSe nada chegar após a janela esperada, reenvie a solicitação do mesmo fluxo de recuperação em vez de recomeçar em outro lugar.",
  "auth.forgotPassword.sentTimingSecurityTitle": "\nLembrete de segurança",
  "auth.forgotPassword.sentTimingSecurityDescription":
    "Use apenas o link do canal de e-mail confiável e ignore mensagens inesperadas de redefinição de senha.",
  "auth.sendResetLink": "\nEnviar link de redefinição",
  "auth.backToSignIn": "\nVoltar para fazer login",
  "auth.forgotPasswordSent": "\nVerifique seu e-mail para obter um link de redefinição de senha",
  "auth.resetPasswordHelp": "\nEscolha uma nova senha para sua conta.",
  "auth.resetPassword.contextTitle": "\nRevisão de redefinição de senha",
  "auth.resetPassword.contextDescription":
    "\nAtualize a credencial, confirme o novo segredo uma vez e mantenha a próxima etapa de segurança visível antes de continuar.",
  "auth.resetPassword.progressTitle": "\nRedefinir fluxo de trabalho",
  "auth.resetPassword.progressDescription":
    "\nDefina a nova senha, confirme-a uma vez e revise as sessões após a redefinição.",
  "auth.resetPassword.progressStep.request": "\nSolicitar link",
  "auth.resetPassword.progressStep.reset": "\nDefinir nova senha",
  "auth.resetPassword.progressStep.review": "\nSessões de revisão",
  "auth.resetPasswordNewPasswordLabel": "\nNova senha",
  "auth.resetPasswordConfirmPasswordLabel": "\nConfirme a nova senha",
  "auth.resetPasswordNewPasswordHint": "\nUse pelo menos {count} caracteres.",
  "auth.resetPasswordConfirmPasswordHint": "\nDigite a mesma senha novamente.",
  "auth.resetPassword.policyLabel": "\nPolítica de senha",
  "auth.resetPassword.policyValue": "\nMínimo de {count} caracteres com um valor exclusivo",
  "auth.resetPassword.sessionLabel": "\nApós redefinir",
  "auth.resetPassword.sessionValue": "\nRevise as sessões e retorne ao espaço de trabalho seguro",
  "auth.resetPassword.checklist.passwordTitle": "\nCrie uma nova senha",
  "auth.resetPassword.checklist.passwordDescription":
    "\nUse pelo menos {count} caracteres e evite reutilizar credenciais que foram compartilhadas entre ferramentas.",
  "auth.resetPassword.checklist.confirmTitle": "\nCombine o campo de confirmação",
  "auth.resetPassword.checklist.confirmDescription":
    "\nConfirme a senha nesta tela para que o fluxo de recuperação seja concluído sem uma segunda tentativa.",
  "auth.resetPassword.checklist.securityTitle": "\nRevise a segurança da conta next",
  "auth.resetPassword.checklist.securityDescription":
    "\nAfter the reset succeeds, sign in again and check recent sessions before returning to day-to-day work.",
  "auth.resetPassword.monitoringTitle": "\nRedefinir prontidão",
  "auth.resetPassword.monitoringDescription":
    "\nRastreie a força da senha, o estado de confirmação e a análise final de segurança antes de enviar a redefinição.",
  "auth.resetPassword.monitoringStep.passwordTitle": "\nConheça a política de senha",
  "auth.resetPassword.monitoringStep.passwordDescription":
    "\nUse pelo menos {count} caracteres e evite credenciais que já foram usadas em outro lugar.",
  "auth.resetPassword.monitoringStep.matchTitle": "\nConfirme a nova senha",
  "auth.resetPassword.monitoringStep.matchDescription":
    "\nCombine exatamente o campo de confirmação para que a redefinição possa ser concluída em uma única passagem.",
  "auth.resetPassword.monitoringStep.reviewTitle": "\nRevise a próxima etapa de segurança",
  "auth.resetPassword.monitoringStep.reviewDescription":
    "\nPlaneje fazer login novamente e inspecionar as sessões recentes assim que a atualização da senha for bem-sucedida.",
  "auth.resetPassword.monitoringLengthLabel": "\nComprimento da senha",
  "auth.resetPassword.monitoringLengthPending":
    "\nAdicione pelo menos {count} caracteres para atender à política de senha atual.",
  "auth.resetPassword.monitoringLengthReady": "\nRequisito de comprimento de senha atendido.",
  "auth.resetPassword.monitoringPending": "\nPendente",
  "auth.resetPassword.monitoringReady": "\nPronto",
  "auth.resetPassword.monitoringMatchLabel": "\nCorrespondência de confirmação",
  "auth.resetPassword.monitoringMatchPending":
    "\nDigite a mesma senha no campo de confirmação para continuar.",
  "auth.resetPassword.monitoringMatchReady": "As senhas correspondem e estão prontas para envio.",
  "auth.resetPassword.monitoringReviewLabel": "\nAcompanhamento de segurança",
  "auth.resetPassword.monitoringReviewValue":
    "\nFaça login novamente, revise as sessões recentes e confirme o caminho de recuperação antes de retornar ao trabalho.",
  "auth.resetPassword.monitoringReviewState": "\nRevisão após reinicialização",
  "auth.resetPassword.monitoringLiveIdle":
    "\nO monitoramento de redefinição de senha está aguardando uma senha que atenda à política.",
  "auth.resetPassword.monitoringLiveConfirm":
    "\nPolítica de senha atendida. Confirme a senha para finalizar a redefinição.",
  "auth.resetPassword.monitoringLiveReady":
    "\nOs requisitos de redefinição de senha estão concluídos e prontos para serem enviados.",
  "auth.resetPasswordSubmit": "\nRedefinir senha",
  "auth.resetPasswordSuccessTitle": "\nSenha atualizada",
  "auth.resetPassword.success.documentTitle": "\nSenha atualizada — Plataforma operacional",
  "auth.resetPasswordSuccessBody":
    "\nSua senha foi atualizada. Você pode fazer login com a nova senha agora.",
  "auth.resetPassword.reviewSecurity": "\nRevise a segurança após fazer login",
  "auth.resetPasswordMissingToken":
    "\nEste link de redefinição de senha está incompleto. Solicite um novo para continuar.",
  "auth.resetPasswordInvalidToken":
    "\nEste link de redefinição de senha é inválido ou expirou. Solicite um novo para continuar.",
  "auth.resetPasswordPasswordsDoNotMatch": "\nA confirmação da senha não corresponde.",
  "auth.resetPasswordPasswordTooShort": "\nA senha deve ter pelo menos {count} caracteres.",
  "auth.resetPasswordRequestEmailRequired": "\nDigite o endereço de e-mail associado à sua conta.",
  "auth.resetPasswordEmailSubject": "\nRedefina sua senha de {brandName}",
  "auth.resetPasswordEmailIntro": "\nUse o link abaixo para redefinir sua senha de {brandName}:",
  "auth.resetPasswordEmailOutro":
    "\nSe você não solicitou esta alteração, você pode ignorar este e-mail.",
  "auth.tooManyAttempts": "\nMuitas tentativas. Tente novamente em {minutes} minutos.",
  "dashboard.dateRange": "\nPeríodo",
  "dashboard.last7Days": "\nÚltimos 7 dias",
  "dashboard.last30Days": "\nÚltimos 30 dias",
  "dashboard.last90Days": "\nÚltimos 90 dias",
  "dashboard.activityFeed.title": "\nAtividade recente",
  "dashboard.activityFeed.subtitle": "\nÚltimos eventos da plataforma e mudanças de estado",
  "dashboard.platformStats": "\nResumo da plataforma",
  "dashboard.onboardingTitle": "\nComece com {brandName}",
  "dashboard.onboardingStep1": "\nAdicione seu primeiro dispositivo",
  "dashboard.onboardingStep2": "\nVer previsões de IA",
  "dashboard.onboardingStep3": "\nConfigurar relatórios",
  "finance.empty": "\nNenhum ativo possui dados de depreciação configurados",
  "finance.fiscalPeriod": "\nPeríodo fiscal",
  "finance.exportData": "\nExportar dados",
  "finance.export.csvTooltip": "\nBaixa a visualização filtrada atual no formato CSV",
  "finance.depreciation.table.accumulatedDepreciation": "\nDepreciação Acumulada",
  "finance.depreciation.table.netBookValue": "\nValor contábil líquido",
  "reports.dateRange": "\nPeríodo",
  "reports.reportHistory": "\nHistórico de relatórios",
  "reports.noHistory": "\nNenhum relatório gerado ainda",
  "reports.history.title": "\nCronologia do relatório salvo",
  "reports.history.description":
    "\nPersista nos relatórios personalizados gerados, revise a cronologia e reabra os resultados recentes.",
  "reports.history.empty":
    "\nAinda não há relatórios salvos. Gere e salve um relatório personalizado para iniciar a cronologia.",
  "reports.history.emptyFinancePlanning":
    "\nNenhum relatório inicial de planejamento financeiro foi salvo ainda.",
  "reports.history.filter.all": "\nTodos",
  "reports.history.filter.financePlanning": "\nPlanejamento Financeiro",
  "reports.history.saveAction": "\nSalvar relatório",
  "reports.history.saved": "\nRelatório salvo em cronologia",
  "reports.history.savedMeta":
    "{generatedAt} • {sectionCount} seções • Cobertura {coverageScore}% • {createdBy}",
  "reports.history.loadAria": "\nCarregar relatório salvo {name} no construtor",
  "reports.history.askAiAria": "\nPergunte à IA sobre o relatório salvo {name}",
  "reports.history.reviewPrompt":
    "Revise o relatório salvo {report}. Ele tem como alvo o público {audience} com foco em {focus} e inclui {sections}. Explique quando esta entrada de cronologia deve ser reutilizada, atualizada ou retirada.",
  "reports.history.comparePrompt":
    "\nCompare o relatório salvo {report} com o pacote ativo {activePack}. O pacote salvo é direcionado ao público {audience} com foco em {focus} e inclui {sections}. Explique o que mudou, o que ainda importa e quais detalhamentos ou atualizações de dados devem acontecer a seguir.",
  "reports.history.error.invalid": "\nO relatório gerado está incompleto e não pôde ser salvo.",
  "reports.history.error.saveFailed":
    "\nNão é possível salvar a entrada da cronologia do relatório no momento.",
  "sites.title": "\nBases e instalações",
  "sites.subtitle": "\nGerenciar locais operacionais, classificações e dependências.",
  "sites.kind.base": "\nBase",
  "sites.kind.facility": "\nInstalação",
  "sites.stats.active": "\nSites ativos",
  "sites.stats.bases": "\nBases",
  "sites.stats.facilities": "\nInstalações",
  "sites.table.name": "\nLocalização",
  "sites.table.kind": "\nTipo",
  "sites.table.coordinates": "\nCoordenadas",
  "sites.table.dependencies": "\nDependências",
  "sites.table.status": "\nStatus",
  "sites.metrics.assets": "\n{count} ativos",
  "sites.metrics.crews": "\n{count} equipes",
  "sites.metrics.iot": "\n{count} Dispositivos IoT",
  "sites.status.active": "\nAtivo",
  "sites.status.inactive": "\nInativo",
  "sites.actions.edit": "\nEditar local",
  "sites.actions.delete": "\nExcluir local",
  "sites.form.nameLabel": "\nNome",
  "sites.form.kindLabel": "\nClassificação",
  "sites.form.locationLabel": "\nLocalização",
  "sites.form.descriptionLabel": "\nDescrição",
  "sites.form.gpsLatLabel": "\nLatitude",
  "sites.form.gpsLonLabel": "\nLongitude",
  "sites.form.activeLabel": "\nAtivo e disponível para operações",
  "sites.form.updateAction": "\nSalvar alterações",
  "sites.form.createAction": "\nCriar local",
  "sites.form.createTitle": "\nAdicionar base ou instalação",
  "sites.form.createDescription":
    "\nCrie um novo site operacional e disponibilize-o em fluxos de trabalho de finanças, documentos e utilização.",
  "sites.feedback.created": "\nLocal criado com sucesso.",
  "sites.feedback.updated": "\nLocalização atualizada com sucesso.",
  "sites.feedback.deleted": "\nLocal excluído com sucesso.",
  "sites.error.invalid": "\nInsira um nome e local de site válidos.",
  "sites.error.invalidCoordinates": "\nA latitude ou longitude está fora dos limites.",
  "sites.error.inUse":
    "\nEste site ainda possui dependências operacionais e não pode ser excluído.",
  "sites.error.notFound": "\nO site solicitado não foi encontrado.",
  "sites.error.saveFailed": "\nA alteração do site não pôde ser salva.",
  "documentWorkspace.section.eyebrow": "\nEspaço de trabalho transacional",
  "documentWorkspace.section.filtersAria": "\nFiltros de espaço de trabalho",
  "documentWorkspace.section.savedViewTitle": "\nVisualizações salvas baseadas em função",
  "documentWorkspace.section.savedViewDescription":
    "\nMantenha a combinação atual de função, filtro e guia disponível como uma fatia durável do espaço de trabalho.",
  "documentWorkspace.section.commandTitle": "\nPostura de comando",
  "documentWorkspace.section.commandDescription":
    "\nRastreie a fase atual do documento, a transferência de entrega e controle a pressão antes de detalhar os registros ativos.",
  "documentWorkspace.section.recentTitle": "\nDocumentos recentes",
  "documentWorkspace.section.recentDescription": "\nRegistros mais recentes no escopo atual.",
  "documentWorkspace.section.historyTitle": "\nHistórico do ciclo de vida",
  "documentWorkspace.history.approvalRoutedTitle": "\nAprovação encaminhada",
  "documentWorkspace.history.approvalRoutedDescription":
    "\nO departamento financeiro colocou na fila a próxima etapa de revisão.",
  "documentWorkspace.section.historyDescription":
    "\nCronologia imutável para movimentação de documentos.",
  "documentWorkspace.section.compareTitle": "\nBandeja de comparação de decisão",
  "documentWorkspace.section.compareDescription":
    "Mantenha o documento principal, a pressão de aprovação e a postura de exportação visíveis em um único trilho compartilhado.",
  "documentWorkspace.section.approvalInboxTitle": "\nCaixa de entrada de aprovação",
  "documentWorkspace.section.approvalInboxDescription":
    "\nMostre a próxima decisão pendente e mantenha a fila de aprovação visível.",
  "documentWorkspace.section.exportPackTitle": "\nPacote de exportação e evidências",
  "documentWorkspace.section.exportPackDescription":
    "\nEmpacote o registro selecionado, o histórico e as evidências de apoio para o próximo fluxo de trabalho.",
  "documentWorkspace.section.collectionsTitle": "\nFluxo de cobranças e discrepâncias",
  "documentWorkspace.section.collectionsDescription":
    "\nRastreie o pagamento, recebimento ou pressão de variação restante antes que se torne um bloqueador.",
  "documentWorkspace.section.relatedActivityTitle": "\nContexto da atividade relacionada",
  "documentWorkspace.section.relatedActivityDescription":
    "\nMantenha o movimento mais recente, os registros vinculados e a transferência do operador visíveis no mesmo espaço de trabalho.",
  "documentWorkspace.metricTone.neutral": "\nEstável",
  "documentWorkspace.metricTone.primary": "\nPrioridade",
  "documentWorkspace.metricTone.info": "\nEm revisão",
  "documentWorkspace.metricTone.success": "\nNo caminho certo",
  "documentWorkspace.metricTone.warning": "\nAtenção",
  "documentWorkspace.metricTone.error": "\nEscalado",
  "documentWorkspace.table.document": "\nDocumento",
  "documentWorkspace.table.status": "\nStatus",
  "documentWorkspace.table.amount": "\nValor",
  "documentWorkspace.table.date": "\nData",
  "documentWorkspace.list.filterBarAria": "\nFiltros da lista de documentos",
  "documentWorkspace.list.searchPlaceholder": "\nPesquisar documentos…",
  "documentWorkspace.list.searchAria": "\nPesquisar documentos",
  "documentWorkspace.list.statusFilterAria": "\nFiltrar por estado",
  "documentWorkspace.list.tableAria": "\nDocumentos — {documentType}",
  "documentWorkspace.list.emptyTitle": "\nNenhum documento ainda",
  "documentWorkspace.list.emptyCta": "\nCriar documento",
  "documentWorkspace.list.tableLoading": "\nA carregar documentos",
  "documentWorkspace.list.sectionAria": "\nLista de documentos",
  "documentWorkspace.tab.overview": "\nVisão geral",
  "documentWorkspace.tab.documents": "\nDocumentos",
  "documentWorkspace.tab.history": "\nHistória",
  "documentWorkspace.filter.all": "\nTodos",
  "documentWorkspace.metric.total": "\nTotal",
  "documentWorkspace.metric.completed": "\nConcluído",
  "documentWorkspace.emptyCta":
    "\nCrie seu primeiro documento para começar a monitorar esse fluxo de trabalho.",
  "documentWorkspace.emptyTimelineCta":
    "\nA atividade do documento aparecerá aqui assim que os registros forem criados.",
  "documentWorkspace.rfq.heading": "\nSolicitações de cotação",
  "documentWorkspace.rfq.description":
    "\nFunil de qualificação de entrada para solicitações públicas, conversas com parceiros e conversão de cotações.",
  "documentWorkspace.rfq.empty": "\nNenhuma solicitação de RFQ está disponível ainda.",
  "documentWorkspace.rfq.timelineEmpty": "\nNenhum histórico de RFQ está disponível ainda.",
  "documentWorkspace.rfq.timelineFallback": "\nFluxo de trabalho de RFQ atualizado.",
  "documentWorkspace.rfq.metric.submitted": "\nEnviado",
  "documentWorkspace.rfq.metric.quoted": "\nCitado",
  "documentWorkspace.rfq.metric.accepted": "\nAceito",
  "documentWorkspace.rfq.filter.submitted": "\nEnviado",
  "documentWorkspace.rfq.filter.quoted": "\nCitado",
  "documentWorkspace.rfq.filter.accepted": "\nAceito",
  "documentWorkspace.rfq.step.draft": "\nRascunho",
  "documentWorkspace.rfq.step.submitted": "\nEnviado",
  "documentWorkspace.rfq.step.qualified": "\nQualificado",
  "documentWorkspace.rfq.step.quoted": "\nCitado",
  "documentWorkspace.rfq.step.accepted": "\nAceito",
  "documentWorkspace.rfq.step.declined": "\nRecusado",
  "documentWorkspace.rfq.step.expired": "\nExpirado",
  "documentWorkspace.rfq.secondaryFallback": "\nSolicitação anônima",
  "documentWorkspace.rfq.amountFallback":
    "\nOrçamento a definir\nA solicitação de cotação não foi encontrada.",
  "documentWorkspace.rfq.notFound": "\nRFQ __PH0__ enviada.",
  "documentWorkspace.rfq.submitted": "\nEscopo geral do projeto",
  "documentWorkspace.rfq.lineItemFallback": "\nDiga-nos para que serve a solicitação.",
  "documentWorkspace.rfq.validation.title":
    "\nAdicione um breve resumo operacional para que a triagem comece com o contexto.",
  "documentWorkspace.rfq.validation.summary": "\nInsira um e-mail de contato válido.",
  "documentWorkspace.rfq.validation.email": "\nUse uma data de solicitação válida.",
  "documentWorkspace.rfq.validation.dueDate": "\nUse um orçamento numérico válido.",
  "documentWorkspace.rfq.validation.budget": "\nO envio da RFQ precisa de algumas correções.",
  "documentWorkspace.rfq.validation.error":
    "\nAprovação, agendamento, SLA e histórico de conclusão para entrega operacional.",
  "documentWorkspace.workOrder.heading": "\nOrdens de Serviço",
  "documentWorkspace.workOrder.description": "\nNenhuma ordem de serviço está disponível ainda.",
  "documentWorkspace.workOrder.empty":
    "\nNenhum histórico de ordens de serviço está disponível ainda.",
  "documentWorkspace.workOrder.timelineEmpty": "\nCiclo de vida da ordem de serviço atualizado.",
  "documentWorkspace.workOrder.timelineFallback": "\nRevisar Fila",
  "documentWorkspace.workOrder.metric.inProgress": "\nEm andamento",
  "documentWorkspace.workOrder.metric.reviewQueue": "\nTriagem",
  "documentWorkspace.workOrder.filter.triage": "\nPronto para revisão",
  "documentWorkspace.workOrder.filter.scheduled": "\nAgendado",
  "documentWorkspace.workOrder.filter.review": "\nA ordem de serviço não foi encontrada.",
  "documentWorkspace.workOrder.step.draft": "\nRascunho",
  "documentWorkspace.workOrder.step.triage": "\nPronto para revisão",
  "documentWorkspace.workOrder.step.approved": "Aprovado",
  "documentWorkspace.workOrder.step.scheduled": "\nAgendado",
  "documentWorkspace.workOrder.step.inProgress": "\nEm andamento",
  "documentWorkspace.workOrder.step.readyForReview": "\nA ordem de serviço não foi encontrada.",
  "documentWorkspace.workOrder.step.completed": "\nConcluído",
  "documentWorkspace.workOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.workOrder.notFound": "\nDetalhe da Ordem de Serviço",
  "workOrders.detail.title":
    "\nAcompanhe a alocação de mão de obra, a produção da força de trabalho e a captura de custos em relação a uma ordem operacional.",
  "workOrders.detail.subtitle": "\nResumo de execução",
  "workOrders.detail.summaryTitle":
    "\nPostura de entrega atual, contexto do responsável e acúmulo de custos realizado neste pedido.",
  "workOrders.detail.summaryDescription": "\nPedido do cliente",
  "workOrders.detail.site": "\nLocal",
  "workOrders.detail.customerOrder": "\nJanela agendada",
  "workOrders.detail.assignee": "\nCessionário",
  "workOrders.detail.schedule": "\nCusto de mão de obra",
  "workOrders.detail.costs.labour": "\nCusto do material",
  "workOrders.detail.costs.material": "\nOutro custo",
  "workOrders.detail.costs.other": "",
  "workOrders.detail.assigneeRole": "Função atribuída",
  "workOrders.detail.updatedAt": "\nÚltima atualização",
  "workOrders.detail.outputUnits": "\nUnidades de saída",
  "workOrders.detail.signoffPending": "\nAprovação do supervisor pendente",
  "workOrders.detail.signoffReady": "\nPronto para aprovação do supervisor",
  "workOrders.detail.signoffComplete": "\nAprovação do supervisor concluída",
  "workOrders.detail.descriptionTitle": "\nResumo operacional",
  "workOrders.detail.descriptionDescription":
    "\nMantenha a narrativa do escopo e as notas de execução ao lado do livro-razão de trabalho.",
  "workOrders.labor.feedback.saved":
    "\nEntrada de mão de obra salva e acúmulo de custos de ordem de serviço atualizado.",
  "workOrders.labor.activity.inspection": "\nInspeção",
  "workOrders.labor.activity.maintenance": "\nManutenção",
  "workOrders.labor.activity.repair": "\nReparar",
  "workOrders.labor.activity.installation": "\nInstalação",
  "workOrders.labor.activity.range_support": "\nSuporte de alcance",
  "workOrders.labor.activity.soft_fm": " Difícil\nSuave FM",
  "workOrders.labor.activity.compliance": "\nConformidade",
  "workOrders.labor.summary.totalHours": "\nHoras registradas",
  "workOrders.labor.summary.totalHoursDesc":
    "\nEsforço de mão de obra rastreado em todo o razão atual.",
  "workOrders.labor.summary.totalCost": "\nCusto de mão de obra contratado",
  "workOrders.labor.summary.totalCostDesc":
    "\nRolado no campo custo de mão de obra da ordem de serviço.",
  "workOrders.labor.summary.workerCount": "\nTrabalhadores alocados",
  "workOrders.labor.summary.workerCountDesc":
    "\nFuncionários distintos registrados contra este pedido.",
  "workOrders.labor.summary.productivity": "\nTaxa de produtividade",
  "workOrders.labor.summary.productivityDesc":
    "\n{output} unidades de saída registradas no razão atual.",
  "workOrders.labor.form.title": "\nCapturar atividade da força de trabalho",
  "workOrders.labor.form.description":
    "\nRegistre o esforço do quadro de horários, unidades de produção e custo de mão de obra diretamente na ordem de serviço operacional.",
  "workOrders.labor.form.submitAria": "\nSalvar entrada de mão de obra da ordem de serviço",
  "workOrders.labor.form.employee": "\nFuncionário",
  "workOrders.labor.form.employeePlaceholder": "\nSelecione um funcionário",
  "workOrders.labor.form.employeeHint":
    "\nUse o diretório de usuários interno compartilhado como fonte de verdade da força de trabalho.",
  "workOrders.labor.form.activity": "\nAtividade",
  "workOrders.labor.form.activityPlaceholder": "\nSelecione a atividade",
  "workOrders.labor.form.activityHint":
    "\nClassifique a produção operacional para que a produtividade e o mix da força de trabalho possam ser comparados.",
  "workOrders.labor.form.entryDate": "\nData de entrada",
  "workOrders.labor.form.entryDateHint": "\nCapture a data em que o trabalho foi realizado.",
  "workOrders.labor.form.hours": "\nHoras",
  "workOrders.labor.form.hoursHint":
    "\nUse horas decimais para o esforço de mão de obra registrado.",
  "workOrders.labor.form.hourlyRate": "\nTaxa horária",
  "workOrders.labor.form.hourlyRateHint":
    "\nCapturado em {currency} e transferido para custo de mão de obra.",
  "workOrders.labor.form.outputUnits": "\nUnidades de saída",
  "workOrders.labor.form.outputUnitsHint":
    "\nQuantidade de produtividade opcional usada para comparar o rendimento operacional.",
  "workOrders.labor.form.notes": "\nNotas",
  "workOrders.labor.form.notesHint":
    "\nCapture notas de turno, bloqueadores ou comentários de garantia.",
  "workOrders.labor.form.submit": "\nAdicionar entrada de mão de obra",
  "workOrders.labor.table.title": "\nLivro de registro de trabalho",
  "workOrders.labor.table.description":
    "\nEntradas de mão de obra duráveis no estilo quadro de horários vinculadas a uma saída operacional.",
  "workOrders.labor.table.employee": "\nFuncionário",
  "workOrders.labor.table.activity": "\nAtividade",
  "workOrders.labor.table.entryDate": "\nData",
  "workOrders.labor.table.hours": "\nHoras",
  "workOrders.labor.table.outputUnits": "\nSaída",
  "workOrders.labor.table.totalCost": "\nCusto",
  "workOrders.labor.table.notes": "\nNotas",
  "workOrders.labor.table.loggedBy": "\nRegistrado por {name}",
  "workOrders.labor.table.empty":
    "\nNenhuma entrada de mão de obra foi capturada para esta ordem de serviço ainda.",
  "workOrders.labor.validation.formInvalid":
    "\nCorrija o formulário de entrada de mão de obra antes de salvar.",
  "workOrders.labor.validation.employeeId": "\nSelecione o funcionário que concluiu o trabalho.",
  "workOrders.labor.validation.employeeMissing":
    "\nO funcionário selecionado não está mais disponível para alocação de mão de obra.",
  "workOrders.labor.validation.activity": "\nSelecione uma atividade laboral válida.",
  "workOrders.labor.validation.entryDate": "\nUse uma data de entrada de mão de obra válida.",
  "workOrders.labor.validation.hours": "\nInsira as horas trabalhadas.",
  "workOrders.labor.validation.hoursPositive": "\nAs horas devem ser maiores que zero.",
  "workOrders.labor.validation.hourlyRate": "\nUse uma taxa horária válida.",
  "workOrders.labor.validation.outputUnits": "\nUse um valor de unidade de saída válido.",
  "documentWorkspace.purchaseOrder.heading": "\nPedidos de compra",
  "documentWorkspace.purchaseOrder.description":
    "Aprovações de fornecedores, rastreamento de recebimento e pontos de verificação de faturamento da aquisição ao pagamento.",
  "documentWorkspace.purchaseOrder.empty": "\nNenhum pedido de compra está disponível ainda.",
  "documentWorkspace.purchaseOrder.timelineEmpty":
    "\nNenhum histórico de pedidos de compra está disponível ainda.",
  "documentWorkspace.purchaseOrder.timelineFallback":
    "\nCiclo de vida do pedido de compra atualizado.",
  "documentWorkspace.purchaseOrder.metric.pending": "\nPendente",
  "documentWorkspace.purchaseOrder.metric.received": "\nRecebido",
  "documentWorkspace.purchaseOrder.metric.billed": "\nFaturado",
  "documentWorkspace.purchaseOrder.filter.requested": "\nSolicitado",
  "documentWorkspace.purchaseOrder.filter.sent": "\nEnviado",
  "documentWorkspace.purchaseOrder.filter.received": "\nRecebido",
  "documentWorkspace.purchaseOrder.step.draft": "\nRascunho",
  "documentWorkspace.purchaseOrder.step.requested": "\nSolicitado",
  "documentWorkspace.purchaseOrder.step.approved": "Aprovado",
  "documentWorkspace.purchaseOrder.step.sent": "\nEnviado",
  "documentWorkspace.purchaseOrder.step.partiallyReceived": "\nRecebido Parcialmente",
  "documentWorkspace.purchaseOrder.step.received": "\nRecebido",
  "documentWorkspace.purchaseOrder.step.billed": "\nFaturado",
  "documentWorkspace.purchaseOrder.step.closed": "\nAutoridade de aprovação",
  "documentWorkspace.purchaseOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.purchaseOrder.notFound": "\nO pedido de compra não foi encontrado.",
  "documentWorkspace.customerOrder.heading": "\nPedidos de clientes",
  "documentWorkspace.customerOrder.description":
    "\nCompromissos comerciais, aprovações, cumprimento e conversão de RFQs.",
  "documentWorkspace.customerOrder.empty": "\nNenhum pedido de cliente está disponível ainda.",
  "documentWorkspace.customerOrder.timelineEmpty":
    "\nNenhum histórico de pedidos de clientes está disponível ainda.",
  "documentWorkspace.customerOrder.timelineFallback":
    "\nCiclo de vida do pedido do cliente atualizado.",
  "documentWorkspace.customerOrder.metric.approvalQueue": "\nFila de aprovação",
  "documentWorkspace.customerOrder.metric.inFulfilment": "\nEm Cumprimento",
  "documentWorkspace.customerOrder.filter.approval": "\nAprovação pendente",
  "documentWorkspace.customerOrder.filter.confirmed": "\nConfirmado",
  "documentWorkspace.customerOrder.filter.fulfilment": "\nEm Cumprimento",
  "documentWorkspace.customerOrder.step.draft": "\nRascunho",
  "documentWorkspace.customerOrder.step.pendingApproval": "\nAprovação pendente",
  "documentWorkspace.customerOrder.step.approved": "Aprovado",
  "documentWorkspace.customerOrder.step.confirmed": "\nConfirmado",
  "documentWorkspace.customerOrder.step.inFulfilment": "\nEm Cumprimento",
  "documentWorkspace.customerOrder.step.completed": "\nConcluído",
  "documentWorkspace.customerOrder.step.cancelled": "\nCancelado",
  "documentWorkspace.customerOrder.secondaryFallback": "\nConta direta",
  "documentWorkspace.customerOrder.notFound": "\nO pedido do cliente não foi encontrado.",
  "documentWorkspace.invoice.heading": "\nFaturas",
  "documentWorkspace.invoice.description":
    "\nRastreamento operacional de AR, cobranças e vencimento de faturas antes da exportação contábil.",
  "documentWorkspace.invoice.empty": "\nNenhuma fatura está disponível ainda.",
  "documentWorkspace.invoice.timelineEmpty": "\nNenhum histórico de faturas está disponível ainda.",
  "documentWorkspace.invoice.timelineFallback": "\nCiclo de vida da fatura atualizado.",
  "documentWorkspace.invoice.metric.openExposure": "\nExposição aberta",
  "documentWorkspace.invoice.metric.paid": "\nPago",
  "documentWorkspace.invoice.metric.draft": "\nRascunho",
  "documentWorkspace.invoice.filter.issued": "\nEmitido",
  "documentWorkspace.invoice.filter.partiallyPaid": "\nParcialmente pago",
  "documentWorkspace.invoice.filter.paid": "\nPago",
  "documentWorkspace.invoice.step.draft": "\nRascunho",
  "documentWorkspace.invoice.step.issued": "\nEmitido",
  "documentWorkspace.invoice.step.partiallyPaid": "\nParcialmente pago",
  "documentWorkspace.invoice.step.paid": "\nPago",
  "documentWorkspace.invoice.step.void": "\nVazio",
  "documentWorkspace.invoice.step.writtenOff": "\nAnulado",
  "documentWorkspace.invoice.notFound": "\nA fatura não foi encontrada.",
  "portal.title": "\nPortal de parceiros",
  "portal.logoLabel": "\nPortal",
  "portal.authenticatedWorkspace": "\nEspaço de trabalho autenticado",
  "portal.sidebar.title": "\nAcesso a documentos compartilhados",
  "portal.sidebar.description":
    "\nPedidos, trabalhos, faturas e aquisições com escopo definido para a associação à sua organização.",
  "portal.nav.overview": "\nVisão geral",
  "portal.nav.orders": "\nPedidos",
  "portal.nav.workOrders": "\nOrdens de Serviço",
  "portal.nav.invoices": "\nFaturas",
  "portal.nav.purchaseOrders": "\nPedidos de compra",
  "portal.summary.eyebrow": "\nEspaço de trabalho do parceiro",
  "portal.summary.totalLabel": "total",
  "portal.summary.title": "\nInstantâneo comercial compartilhado",
  "portal.summary.description":
    "\nVisibilidade atual de pedidos, trabalhos, faturas e compras para o escopo da organização autenticada.",
  "portal.summary.actionHubTitle": "\nVia de ação prioritária",
  "portal.summary.actionHubDescription":
    "\nMantenha a próxima movimentação de documentos, o fluxo de trabalho responsável e o acompanhamento voltado para o parceiro visíveis na visão geral do portal.",
  "portal.summary.activityTitle": "\nAtividade recente do parceiro",
  "portal.summary.activityDescription":
    "\nAcompanhe os últimos movimentos de pedidos de clientes, ordens de serviço, faturas e compras em um só lugar.",
  "portal.summary.activityFallback": "\nNenhuma atividade de parceiro foi registrada ainda.",
  "portal.summary.exceptionTitle": "\nRelógio de exceção",
  "portal.summary.exceptionDescription":
    "\nObserve os itens que ainda precisam de reconhecimento, resposta ou escalonamento da equipe parceira.",
  "portal.summary.exceptionFallbackTitle":
    "\nNenhuma exceção ativa precisa de acompanhamento agora.",
  "portal.summary.exceptionFallbackDescription":
    "\nContinue monitorando os espaços de trabalho de documentos em busca de novas aprovações, disputas e bloqueadores de cumprimento.",
  "portal.summary.exceptionItem": "Documento: {document}: {status}",
  "portal.summary.exceptionItemDescription": "Título: {title} – {date}",
  "portal.summary.nextOrders": "\nEspaço de trabalho de pedidos abertos",
  "portal.summary.ordersDescription": "Ver e gerenciar pedidos de clientes.",
  "portal.summary.workOrdersDescription": "Acompanhar progresso e conclusão de ordens de serviço.",
  "portal.summary.invoicesDescription": "Revisar faturas pendentes e pagas.",
  "portal.summary.purchaseOrdersDescription": "Gerenciar pedidos de compra com fornecedores.",
  "portal.summary.nextWorkOrders": "\nEspaço de trabalho de ordens de serviço abertas",
  "portal.summary.nextInvoices": "\nEspaço de trabalho de faturas abertas",
  "portal.summary.nextPurchaseOrders": "\nEspaço de trabalho de pedidos de compra abertos",
  "portal.page.orders": "\nPedidos do Portal",
  "portal.page.workOrders": "\nOrdens de Serviço do Portal",
  "portal.page.invoices": "\nFaturas do Portal",
  "portal.page.purchaseOrders": "Pedidos de Compra do Portal",
  "portal.documentList.sectionTitle": "Documentos",
  "portal.documentList.tableCaption": "Lista de documentos",
  "portal.documentList.col.id": "ID",
  "portal.documentList.col.document": "Documento",
  "portal.documentList.col.status": "Estado",
  "portal.documentList.col.value": "Valor",
  "portal.documentList.col.date": "Data",
  "portal.documentList.col.amount": "Valor",
  "portal.documentList.col.actions": "Ações",
  "portal.documentList.viewAction": "Ver",
  "portal.documentList.filtersLabel": "Filtrar por estado",
  "portal.documentList.loading": "A carregar documentos…",
  "portal.documentList.empty.title": "Sem documentos",
  "portal.documentList.empty.cta": "Criar documento",
  "portal.documentList.error.description": "Não foi possível carregar os documentos.",
  "portal.documentList.searchPlaceholder": "Pesquisar documentos…",
  "portal.documentList.searchLabel": "Pesquisar documentos",
  "portal.documentList.resultCount": "{count} documentos",
  "portal.documentList.paginationInfo": "Página {page} de {totalPages} ({totalCount} no total)",
  "portal.documentDetail.loading": "A carregar documento…",
  "portal.documentDetail.overviewTitle": "Visão geral",
  "portal.documentDetail.lineItemsTitle": "Itens",
  "portal.documentDetail.timelineTitle": "Linha do tempo de atividades",
  "portal.documentDetail.actionsTitle": "Ações disponíveis",
  "portal.documentDetail.downloadInvoice": "Transferir fatura",
  "portal.documentDetail.contactSupport": "Contactar suporte",
  "portal.documentDetail.payInvoice": "Pagar fatura",
  "portal.documentDetail.empty.title": "Documento não encontrado",
  "portal.documentDetail.empty.description": "Não foi possível encontrar o documento solicitado.",
  "portal.documentDetail.empty.fields": "Sem detalhes disponíveis.",
  "portal.documentDetail.empty.lineItems": "Sem itens.",
  "portal.documentDetail.empty.timeline": "Sem atividade registada.",
  "portal.documentDetail.error.description": "Não foi possível carregar o documento.",
  "portal.documentDetail.relatedLinksTitle": "Links relacionados",
  "portal.documentDetail.delete.title": "Eliminar documento",
  "portal.documentDetail.delete.description":
    'Tem a certeza de que deseja eliminar "{title}"? Esta ação não pode ser anulada.',
  "portal.chat.contextTitle": "\nVia de propriedade do serviço",
  "portal.chat.contextDescription":
    "\nMantenha o proprietário atual, os registros comerciais vinculados e o caminho de escalonamento visíveis enquanto a conversa do parceiro estiver ativa.",
  "portal.chat.ownerLabel": "\nProprietário atual",
  "portal.chat.ownerFallback": "\nAtribuir um parceiro proprietário",
  "portal.chat.latestFallback": "\nNenhuma atualização encadeada foi registrada ainda.",
  "portal.chat.checklistOwnerTitle": "\nCapture o proprietário responsável",
  "portal.chat.checklistOwnerDescription":
    "\nIndique quem é o proprietário da próxima etapa de resposta ou atendimento antes que o tópico mude de mãos.",
  "portal.chat.checklistSlaTitle": "\nDefina a janela de resposta",
  "portal.chat.checklistSlaDescription":
    "\nConfirme o tempo no thread sempre que a entrega, o faturamento ou a evidência de serviço forem bloqueados.",
  "portal.chat.checklistEscalationTitle": "\nEscalar com registros vinculados",
  "portal.chat.checklistEscalationDescription":
    "\nAbra o documento relacionado ou o espaço de trabalho do membro quando a conversa precisar de acompanhamento operacional.",
  "portal.chat.openLinkedAction": "\nAbrir registro vinculado",
  "portal.chat.composeDescription":
    "\nUse o tópico do parceiro para capturar propriedade, tempo de resposta e qualquer etapa comercial bloqueada.",
  "portal.chat.composeHint":
    "\nMantenha o próximo proprietário e a janela de resposta prometida visíveis em cada resposta.",
  "portal.chat.aiActionsDescription":
    "\nUse ações de IA para resumir a discussão do parceiro antes de passar para pedidos, trabalho ou acompanhamento de faturas.",
  "deviceHistory.exportCsv": "\nExportar CSV",
  "customisation.chatBubbleToggle": "\nBolha de bate-papo de IA",
  "customisation.chatBubbleDescription":
    "\nMostrar a bolha flutuante de bate-papo do assistente de IA",
  "apiExplorer.searchRoutes": "\nPesquisar rotas...",
  "apiExplorer.tryIt": "\nExperimente",
  "apiExplorer.response": "\nResposta",
  "apiExplorer.errorPrefix": "\nErro:",
  "transfer.title": "\nTransferir ativo",
  "transfer.subtitle": "\nMova este ativo para um local ou instalação diferente",
  "transfer.form.destination": "\nSite de destino",
  "transfer.form.destinationPlaceholder": "\nSelecione o destino",
  "transfer.form.reason": "\nMotivo da transferência",
  "transfer.form.reasonPlaceholder": "\nInsira o motivo da transferência",
  "transfer.form.notes": "\nNotas adicionais",
  "transfer.form.notesPlaceholder": "\nNotas opcionais sobre esta transferência",
  "transfer.form.submit": "\nConfirmar transferência",
  "transfer.form.cancel": "\nCancelar",
  "transfer.validation.sameLocation": "\nO destino não pode ser igual ao local atual",
  "transfer.validation.assetNotFound": "\nAtivo não encontrado",
  "transfer.validation.siteNotFound": "\nSite de destino não encontrado",
  "transfer.validation.destinationRequired": "\nO site de destino é obrigatório",
  "transfer.feedback.success": "\nAtivo transferido com sucesso",
  "transfer.feedback.error": "\nFalha ao transferir ativo",
  "transfer.history.title": "\nHistórico de transferência",
  "transfer.history.empty": "\nNenhum histórico de transferência para este ativo",
  "transfer.history.from": "\nDe",
  "transfer.history.to": "\nPara",
  "transfer.history.date": "\nData",
  "transfer.history.initiatedBy": "\nIniciado por",
  "transfer.history.reason": "\nRazão",
  "transfer.history.notes": "\nNotas",
  "transfer.modal.title": "\nTransferir ativo",
  "transfer.modal.description": "\nSelecione o local de destino para transferir este ativo para",
  "transfer.modal.confirm": "\nTransferir",
  "transfer.action": "\nTransferir",
  "ucp.checkout.notFound": "A sessao de checkout nao foi encontrada.",
  "ucp.order.notFound": "\nO pedido não foi encontrado.",
  "ucp.checkout.error.currency":
    "\nA moeda {currency} não é suportada para esta seleção de catálogo.",
  "ucp.checkout.error.itemUnavailable":
    "\nUm ou mais itens de catálogo selecionados estão indisponíveis.",
  "ucp.checkout.error.empty":
    "\nAdicione pelo menos um item do catálogo antes de finalizar a compra.",
  "ucp.checkout.error.paymentHandler":
    "Selecione um instrumento de pagamento compatível antes de concluir a compra.",
  "ucp.checkout.error.terminal": "\nEsta sessão de checkout não pode mais ser alterada.",
  "ucp.checkout.error.idMismatch": "\nIncompatibilidade de ID de checkout.",
  "ucp.checkout.ai.single":
    "\n{title}: {summary} Total {total} {currency}. Revise os detalhes do comprador e conclua a finalização da compra para criar o pedido operacional.",
  "ucp.checkout.ai.multi":
    "\n{count} pacotes operacionais selecionados: {titles}. Total {total} {currency}. Confirme o alinhamento do escopo e conclua a finalização da compra para criar o pedido.",
  "ucp.checkout.completed": "Checkout concluido. A encomenda {orderNumber} esta agora confirmada.",
  "ucp.checkout.canceled": "\nCheck-out cancelado.",
  "ucp.reference.service.title": "\n{merchantName} serviço de compras",
  "ucp.reference.checkout.specTitle": "\nCapacidade de checkout de compras",
  "ucp.reference.checkout.schemaTitle": "\nEsquema de capacidade de checkout de compras",
  "ucp.reference.order.specTitle": "\nCapacidade de pedido de compras",
  "ucp.reference.order.schemaTitle": "\nEsquema de capacidade de pedido de compras",
  "ucp.reference.fulfillment.specTitle": "\nCapacidade de atendimento de compras",
  "ucp.reference.fulfillment.schemaTitle": "\nEsquema de capacidade de atendimento de compras",
  "ucp.reference.buyerConsent.specTitle": "\nCapacidade de consentimento do comprador de compras",
  "ucp.reference.buyerConsent.schemaTitle":
    "\nEsquema de capacidade de consentimento do comprador de compras",
  "ucp.reference.paymentHandler.specTitle":
    "\nEspecificação do gerenciador de pagamento do comerciante",
  "ucp.reference.paymentHandler.configSchemaTitle":
    "\nEsquema de configuração do gerenciador de pagamento do comerciante",
  "ucp.reference.paymentHandler.instrumentSchemaTitle":
    "\nEsquema de instrumento de pagamento com cartão",
  "nav.chat": "\nBate-papo",
  "nav.automations": "\nAutomações",
  "chat.title": "\nBate-papo da equipe",
  "chat.subtitle":
    "\nThreads de colaboração compartilhada entre operações, portal e transferências de IA",
  "chat.workspace.eyebrow": "\nOperações colaborativas",
  "chat.workspace.internalTitle": "\nColaboração de operações",
  "chat.workspace.internalDescription":
    "\nThreads de sala interna para operadores, analistas e fluxos de trabalho de copiloto de IA.",
  "chat.workspace.portalTitle": "\nColaboração do parceiro",
  "chat.workspace.portalDescription":
    "\nTópicos de conversa seguros no portal para coordenação de entrega, contexto de documentos e transferência assistida por IA.",
  "chat.workspace.publicTitle": "\nSessões de assistente público",
  "chat.workspace.publicDescription":
    "\nSessões públicas de admissão com IA que podem se transformar em fluxos de trabalho de portal ou operações.",
  "chat.workspace.threadListTitle": "\nTópicos",
  "chat.workspace.threadListDescription":
    "\nCada thread é persistido para que as ações de IA, transferências e contexto de entrega permaneçam anexados ao mesmo histórico da entidade.",
  "chat.workspace.composeTitle": "\nEnviar atualização",
  "chat.workspace.composeDescription":
    "\nAs mensagens são armazenadas como eventos de colaboração de primeira classe para que ações de automação, relatórios e IA possam fazer referência ao mesmo thread.",
  "chat.workspace.messageLabel": "\nMensagem",
  "chat.workspace.messagePlaceholder":
    "\nEscreva uma atualização, solicitação ou nota de escalonamento da equipe",
  "chat.workspace.composeHint":
    "\nUse o balão de IA compartilhado para solicitações guiadas; use este formulário para atualizações de thread duráveis.",
  "chat.workspace.sendAction": "\nEnviar mensagem",
  "chat.workspace.askAiAction": "\nPergunte à IA no tópico",
  "chat.workspace.summarizeThreadAction": "Resumir tópico",
  "chat.workspace.automationRunAction": "\nAutomação de fila executada",
  "chat.workspace.reportPackBuildAction": "\nCriar pacote de relatórios",
  "chat.workspace.reportPackCompareAction": "\nComparar versões do pacote",
  "chat.workspace.convertTaskAction": "\nConverter para tarefa",
  "chat.workspace.convertReportAction": "\nConverter para relatório",
  "chat.workspace.mlAnalysisAction": "\nSolicitar análise de ML",
  "chat.workspace.publicHandoffAction": "\nCriar nota de transferência",
  "chat.workspace.aiActionsTitle": "\nAções assistentes",
  "chat.workspace.aiActionsDescription":
    "\nPersistir respostas do assistente, resumos e ações do plano de controle no mesmo histórico de thread.",
  "chat.workspace.aiDefaultPrompt":
    "\nRevise o tópico atual e ajude com a próxima ação do operador.",
  "chat.workspace.emptyThread": "\nSelecione uma conversa para revisar seu histórico de mensagens.",
  "chat.workspace.noThreadsTitle": "\nNenhum tópico de colaboração está ativo ainda.",
  "chat.workspace.noThreadsDescription":
    "\nCrie ou encaminhe uma conversa para esta superfície antes de usar o histórico de conversas compartilhadas e as ações do assistente.",
  "chat.workspace.composeUnavailableTitle":
    "\nSelecione um tópico antes de postar ou executar ações do assistente.",
  "chat.workspace.composeUnavailableDescription":
    "\nMensagens de thread, resumos, execuções de automação e notas de transferência persistem em uma conversa ativa.",
  "chat.workspace.surfaceInternal": "\nInterno",
  "chat.workspace.surfacePortal": "\nPortal",
  "chat.workspace.surfacePublic": "\nPúblico",
  "chat.workspace.threadCount": "\n{count} tópicos",
  "chat.workspace.typeChannel": "\nCanal",
  "chat.workspace.typeDirectMessage": "\nMensagem direta",
  "chat.workspace.typeEntityThread": "\nTópico de entidade",
  "chat.workspace.typePartyThread": "\nTópico do parceiro",
  "chat.workspace.typePublicAssistant": "\nSessão do assistente",
  "chat.workspace.participantsTitle": "\nParticipantes",
  "chat.workspace.participantsDescription":
    "\nQuem está ativo nesta conversa e pode ser marcado em novas mensagens.",
  "chat.workspace.noParticipants": "\nNenhum participante está vinculado a esta conversa ainda.",
  "chat.workspace.featuresTitle": "\nRecursos do tópico",
  "chat.workspace.featuresDescription":
    "\nO tipo de conversa, os registros vinculados, o volume de mensagens e a prontidão da IA permanecem visíveis ao lado do tópico.",
  "chat.workspace.linkedRecordsTitle": "\nRegistros vinculados",
  "chat.workspace.linkedRecordsDescription":
    "\nOs registros comerciais e operacionais anexados a esta conversa permanecem visíveis no mesmo espaço de trabalho.",
  "chat.workspace.noLinkedRecords":
    "\nNenhum registro vinculado está anexado a esta conversa ainda.",
  "chat.workspace.tagPeopleTitle": "\nMarque pessoas e AI",
  "chat.workspace.tagPeopleDescription":
    "\nOs participantes selecionados são armazenados com a mensagem para que as transferências e o trabalho de acompanhamento mantenham o mesmo contexto.",
  "chat.workspace.tagParticipantAria": "\nMarque {participant} nesta mensagem",
  "chat.workspace.noTagTargets": "\nNenhum alvo de tag está disponível para esta conversa ainda.",
  "chat.workspace.participantCount": "\n{count} participantes",
  "chat.workspace.messageCount": "\n{count} mensagens",
  "chat.workspace.linkedRecordCount": "\n{count} registros vinculados",
  "chat.workspace.participantMetricLabel": "\nParticipantes",
  "chat.workspace.messageMetricLabel": "\nMensagens",
  "chat.workspace.linkedRecordMetricLabel": "\nVinculado",
  "chat.workspace.slaQueueTitle": "\nFila SLA",
  "chat.workspace.slaQueueDescription":
    "\nTópicos não lidos ou atualizados recentemente que precisam de acompanhamento cronometrado ou decisão de escalonamento.",
  "chat.workspace.ownerQueueTitle": "\nPostura do proprietário",
  "chat.workspace.ownerQueueDescription":
    "\nMantenha o conjunto de participantes ativos e a profundidade da mensagem visíveis antes de atribuir o próximo proprietário.",
  "chat.workspace.triageModesTitle": "\nModos de triagem",
  "chat.workspace.triageModesDescription":
    "Passe da revisão do tópico para a conversão de tarefas, relatórios ou acompanhamento do proprietário sem perder o contexto da conversa.",
  "chat.workspace.aiEnabled": "\nPronto para IA",
  "chat.workspace.aiDisabled": "\nIA desligada",
  "chat.workspace.participantAudienceAi": "IA",
  "chat.workspace.participantAudienceOperator": "\nOperador",
  "chat.workspace.participantAudiencePartner": "\nParceiro",
  "chat.workspace.participantAudiencePublic": "\nPúblico",
  "chat.workspace.participantRoleOwner": "\nProprietário",
  "chat.workspace.participantRoleMember": "\nMembro",
  "chat.workspace.participantRoleObserver": "\nObservador",
  "chat.workspace.participantRoleAssistant": "\nAssistente",
  "chat.workspace.viewerParticipant": "\nVocê",
  "chat.validation.messageRequired": "\nO conteúdo da mensagem é obrigatório.",
  "chat.validation.conversationNotFound": "\nA conversa não foi encontrada.",
  "chat.validation.mentionNotFound":
    "\nUm ou mais participantes marcados não puderam ser resolvidos.",
  "chat.assistant.action.automationRunCreated":
    "\nAutomação na fila executada para {title}. Status atual: {status}.",
  "chat.assistant.action.reportPackBuilt":
    "\nCriei uma nova versão do pacote de relatórios para {title}. ID da versão ativa: {versionId}.",
  "chat.assistant.action.publicHandoffStarted":
    "\nTransferência pública iniciada para {title}. Tópico de escalonamento interno: {threadId}.",
  "chat.assistant.action.publicHandoffAutomationQueued":
    "\nA automação na fila executa {runId} para rotear o escalonamento.",
  "chat.assistant.action.mlRunRequested":
    "\nA análise de ML na fila é executada {runId}. Status atual: {status}.",
  "chat.assistant.handoff.threadTitle": "\nTransferência pública: {title}",
  "chat.assistant.handoff.threadDescription":
    "\nThread de escalonamento interno criado a partir de uma sessão de assistente público.",
  "chat.assistant.handoff.seedMessage":
    "\nAssistente público escalado {title}. Contexto mais recente: {summary}",
  "chat.assistant.handoff.runNotes":
    "\nTransferência pública para {title}. ID da conversa de origem: {conversationId}.",
  "chat.seed.actors.ai": "IA",
  "chat.seed.actors.operator": "\nOperador",
  "chat.seed.actors.partner": "\nParceiro",
  "chat.seed.internal.operationsTitle": "\nTriagem de prontidão de operações",
  "chat.seed.internal.operationsDescription":
    "\nAtualizações de prontidão multifuncional vinculando ativos, pacotes e escalonamentos.",
  "chat.seed.internal.operationsPreview":
    "\nAI sinalizou dois deltas de prontidão e sugeriu atualizar o pacote do conselho antes do briefing das 18h.",
  "chat.seed.internal.operationsAiMessage":
    "\nEncontrei dois deltas de prontidão que afetam o pacote de tabuleiro atual. Atualize o pacote operacional antes do próximo briefing.",
  "chat.seed.internal.operationsUserMessage":
    "\nEscale os deltas para o pacote ativo e notifique o líder da propriedade se a previsão de utilização cair novamente.",
  "chat.seed.internal.estateLead": "\nLíder imobiliário",
  "chat.seed.internal.operationsAnchorPack": "\nPacote de operações v3",
  "chat.seed.internal.operationsAnchorEstate": "\nPreparação imobiliária",
  "chat.seed.internal.reportsTitle": "\nAvaliações do pacote de relatórios",
  "chat.seed.internal.reportsDescription":
    "\nComentários encadeados para relatórios salvos, revisões de pacotes e comparações de cronologia.",
  "chat.seed.internal.reportsPreview":
    "\nO Board Pack v3 está pronto para revisão com contexto de anomalia atualizado e notas de exposição comercial.",
  "chat.seed.portal.fulfilmentTitle": "\nTransferência de cumprimento do parceiro",
  "chat.seed.portal.fulfilmentDescription":
    "\nThread visível no portal para confirmar o escopo do trabalho, status do documento e rascunhos de respostas assistidas por IA.",
  "chat.seed.portal.fulfilmentPreview":
    "\nA Operadora AI elaborou um resumo de transferência para o último marco da ordem de serviço e retenção de fatura.",
  "chat.seed.portal.fulfilmentMessage":
    "Confirme o marco revisado da ordem de serviço e informe-nos se a retenção da fatura pode agora ser compensada.",
  "chat.seed.portal.operatorLabel": "\nCoordenador de operações",
  "chat.seed.portal.anchorLabel": "\nMarco da ordem de serviço do parceiro",
  "chat.seed.public.assistantTitle": "\nAssistente de entrada de RFQ",
  "chat.seed.public.assistantDescription":
    "\nTópico público de entrada de IA vinculado a perguntas do comprador e contexto de RFQ.",
  "chat.seed.public.assistantPreview":
    "\nO assistente capturou os requisitos do comprador, esclareceu o prazo de entrega e preparou um caminho de escalonamento.",
  "chat.seed.public.assistantMessage":
    "\nPosso coletar seus requisitos, resumir o escopo e encaminhar para um operador quando uma análise comercial for necessária.",
  "chat.seed.public.buyerLabel": "\nComprador",
  "chat.seed.public.anchorLabel": "\nEntrada de RFQ",
  "controlPlane.validation.definitionNotFound": "\nA definição de automação não foi encontrada.",
  "controlPlane.validation.definitionRequired": "\nA definição de automação é obrigatória.",
  "controlPlane.validation.definitionTitleRequired":
    "\nO título da definição de automação é obrigatório.",
  "controlPlane.validation.definitionStatusInvalid":
    "\nA transição de status solicitada não é válida.",
  "controlPlane.validation.automationActivationRequiresTrigger":
    "\nAdicione pelo menos um gatilho antes de ativar esta definição de automação.",
  "controlPlane.validation.automationActivationRequiresSteps":
    "\nAdicione pelo menos uma etapa antes de ativar esta definição de automação.",
  "controlPlane.validation.automationActivationRequiresSchedule":
    "\nAs definições de automação agendada precisam de pelo menos um agendamento antes da ativação.",
  "controlPlane.validation.automationTriggerNameRequired":
    "\nO nome do gatilho de automação é obrigatório.",
  "controlPlane.validation.automationStepNameRequired":
    "\nO nome da etapa de automação é obrigatório.",
  "controlPlane.validation.automationScheduleRuleRequired":
    "\nA regra de agendamento de automação é obrigatória.",
  "controlPlane.validation.automationScheduleTimezoneRequired":
    "\nO fuso horário da programação de automação é obrigatório.",
  "controlPlane.validation.automationScheduleTimestampInvalid":
    "\nOs carimbos de data/hora da programação de automação devem ser valores de data e hora válidos.",
  "controlPlane.validation.automationArtifactTitleRequired":
    "\nO título do artefato de automação é obrigatório.",
  "controlPlane.validation.automationRunNotFound": "\nA execução de automação não foi encontrada.",
  "controlPlane.validation.automationRunTransitionInvalid":
    "\nA transição de execução de automação solicitada não é válida.",
  "controlPlane.validation.automationRunDefinitionRequired":
    "\nEsta execução de automação não está vinculada a uma definição reutilizável.",
  "controlPlane.validation.automationRunRetryInvalid":
    "\nSomente execuções de automação com falha ou canceladas podem ser repetidas.",
  "controlPlane.definition.created": '\nDefinição de automação "{title}" criada.',
  "controlPlane.definition.statusUpdated": "\nStatus atualizado para {status}.",
  "controlPlane.validation.reportPackNotFound": "\nO pacote de relatórios não foi encontrado.",
  "controlPlane.validation.reportPackCompareRequiresVersions":
    "\nPelo menos duas versões do pacote de relatórios são necessárias antes da comparação.",
  "controlPlane.validation.mlExperimentNotFound": "\nO experimento de ML não foi encontrado.",
  "controlPlane.validation.modelVersionNotFound": "\nA versão do modelo não foi encontrada.",
  "controlPlane.validation.mlRequestTargetRequired":
    "\nSelecione um experimento de ML ou uma versão do modelo antes de solicitar a análise.",
  "controlPlane.reportPack.compareSummary":
    "\nComparamos as versões mais recentes do pacote de relatórios para {title}. Versão mais recente: {newerVersionId}. Versão anterior: {olderVersionId}.",
  "controlPlane.seed.automation.packRefreshTitle": "\nAtualização do pacote estratégico",
  "controlPlane.seed.automation.packRefreshDescription":
    "Reconstrua o pacote de quadro ativo, publique os deltas de cronologia mais recentes e notifique o tópico de revisão.",
  "controlPlane.seed.automation.packRefreshArtifactBoardPackTitle": "\nPacote de tabuleiro v3",
  "controlPlane.seed.automation.packRefreshArtifactInputSnapshotTitle":
    "\nInstantâneo de entrada executiva",
  "controlPlane.seed.automation.packRefreshArtifactDraftTitle": "\nRascunho do pacote de tabuleiro",
  "controlPlane.seed.automation.portalHandoffTitle": "\nTransferência de atendimento do portal",
  "controlPlane.seed.automation.portalHandoffDescription":
    "\nCrie um resumo visível ao parceiro quando os marcos da ordem de serviço, da fatura ou da entrega mudarem.",
  "controlPlane.seed.automation.portalHandoffArtifactMemoTitle":
    "\nMemorando de transferência do portal",
  "controlPlane.seed.automation.portalHandoffArtifactNoteTitle":
    "\nNota de transferência do portal do parceiro",
  "controlPlane.seed.datasets.estateTitle": "\nConjunto de dados de postura imobiliária",
  "controlPlane.seed.datasets.estateDescription":
    "\nMétricas de postura entre espaços de trabalho para prontidão, utilização e risco de intervenção.",
  "controlPlane.seed.datasets.orderTitle": "\nConjunto de dados de fluxo de pedidos",
  "controlPlane.seed.datasets.orderDescription":
    "\nMétricas de cronograma comercial cobrindo solicitações de cotação, pedidos de clientes, ordens de serviço e faturas.",
  "controlPlane.seed.packs.boardTitle": "\nPacote de tabuleiro",
  "controlPlane.seed.packs.boardDescription":
    "\nPacote de decisões estratégicas com cronologia, postura e contexto de risco comercial.",
  "controlPlane.seed.packs.operationsTitle": "\nPacote de operações",
  "controlPlane.seed.packs.operationsDescription":
    "\nPacote de campo operacional com deltas de utilização, prontidão e execução de trabalho.",
  "controlPlane.seed.ml.demandForecastTitle": "\nExperimento de previsão de demanda",
  "controlPlane.seed.ml.demandForecastObjective":
    "\nPrevisão de demanda comercial e gatilhos de anomalias para o próximo horizonte operacional.",
  "controlPlane.seed.models.demandTitle": "\nModelo de previsão de demanda",
  "controlPlane.seed.models.demandDescription":
    "\nEntrada de registro para versões de previsão de demanda aprovadas e sua postura de implantação.",
  "insurance.seed.policy.generalLiabilityDescription":
    "\nCobertura de responsabilidade geral para operações do Local de Treinamento Norte.",
  "insurance.seed.policy.propertyDescription":
    "\nCobertura de propriedade para edifícios e infraestrutura do West Compound.",
  "insurance.seed.policy.cyberDescription":
    "\nCobertura de responsabilidade cibernética para plataforma e propriedade de IoT.",
  "insurance.seed.coverage.bodilyInjury": "\nLesão corporal por ocorrência",
  "insurance.seed.coverage.propertyDamage": "\nDanos materiais por ocorrência",
  "insurance.seed.coverage.aggregate": "\nAgregado geral",
  "insurance.seed.claim.waterDamageDescription":
    "\nDanos causados pela água no telhado do centro de treinamento após tempestade. Reparos temporários concluídos.",
  "insurance.seed.claim.vehicleDamageDescription":
    "\nPequenos danos ao veículo na área de estacionamento do complexo. Sem ferimentos.",
  "reports.expansion.title": "\nPlano de controle de automação e ciência de dados",
  "reports.expansion.description":
    "\nConjuntos de dados, pacotes de relatórios, monitoramento de ML e acionadores de automação permanecem conectados ao espaço de trabalho de relatórios em vez de serem fragmentados em ferramentas separadas.",
  "reports.expansion.openChat": "\nAbrir bate-papo",
  "reports.expansion.datasetsTitle": "\nRegistro do conjunto de dados",
  "reports.expansion.datasetsDescription":
    "\nConjuntos de dados analíticos ao vivo e monitorados alimentando pacotes, métricas e instantâneos de modelo.",
  "reports.expansion.openDatasets": "\nSeção de conjuntos de dados abertos",
  "reports.expansion.packsTitle": "\nPacotes de relatórios",
  "reports.expansion.packsDescription":
    "\nPlaca versionada e pacotes de operações com suporte durável para estado, linhagem e cronologia.",
  "reports.expansion.openPacks": "\nAbra a seção do pacote ativo",
  "reports.expansion.mlTitle": "Plano de controle ML",
  "reports.expansion.mlDescription":
    "\nExperimentos, execuções e entradas de registro expondo previsão e postura de anomalia ao lado da composição do relatório.",
  "reports.expansion.openModels": "\nGovernança de IA aberta",
  "reports.expansion.automationsTitle": "\nRegistro de automação",
  "reports.expansion.automationsDescription":
    "\nDefinições de automação nativa que coordenam atualização de relatórios, notificações e fluxos de trabalho vinculados a chat.",
  "reports.expansion.openAutomations": "\nEspaço de trabalho de automações abertas",
  "automations.title": "\nAutomações",
  "automations.subtitle":
    "\nDefinições, execuções e postura de execução de uma superfície de controle SSR",
  "automations.workspace.eyebrow": "\nEspaço de trabalho de automação",
  "automations.workspace.title": "\nPlano de controle de automação dedicado",
  "automations.workspace.description":
    "\nRevise as definições de automação, execuções recentes, tipos de gatilho e postura de execução sem sair do shell de operações.",
  "automations.workspace.definitionTitle": "\nDefinições de automação",
  "automations.workspace.definitionDescription":
    "\nRegistros de definição, modos de disparo e tempo da próxima execução para o catálogo de automação atual.",
  "automations.workspace.runTitle": "\nExecuções recentes de automação",
  "automations.workspace.runDescription":
    "\nAs últimas execuções enfileiradas, em execução e concluídas surgiram do plano de controle.",
  "automations.workspace.definitionCount": "\n{count} definições",
  "automations.workspace.runCount": "\n{count} corre",
  "automations.workspace.activeDefinitionCount": "\n{count} definições ativas",
  "automations.workspace.runningRunCount": "\n{count} executando corridas",
  "automations.workspace.definitionTrigger": "\nGatilho",
  "automations.workspace.definitionSteps": "\n{count} passos",
  "automations.workspace.definitionNextRun": "\nPróxima execução",
  "automations.workspace.definitionSurface": "\nSuperfície",
  "automations.workspace.definitionState": "\nEstado",
  "automations.workspace.runsEmpty": "\nNenhuma execução de automação está disponível ainda.",
  "automations.workspace.definitionsEmpty":
    "\nNenhuma definição de automação está disponível ainda.",
  "automations.workspace.runCreatedAt": "\nCriado",
  "automations.workspace.runCompletedAt": "\nConcluído",
  "automations.workspace.runDefinition": "\nDefinição",
  "automations.workspace.runKind": "\nTipo",
  "automations.workspace.runStatus": "\nStatus",
  "automations.workspace.openReports": "\nAbrir relatórios",
  "automations.workspace.openAdmin": "\nGovernança administrativa aberta",
  "automations.workspace.posture.title": "Execution posture",
  "automations.workspace.posture.description":
    "Keep approvals, live runs, and execution pressure visible while you work definitions or review recent activity.",
  "automations.workspace.posture.approvals":
    "{count} definition(s) still require approval coverage before all runs can start cleanly.",
  "automations.workspace.posture.pending":
    "{count} run(s) are waiting for an approval decision before leaving the queue.",
  "automations.workspace.posture.running":
    "{count} run(s) are currently executing across the active automation surface.",
  "automations.workspace.stats.definitions": "\nDefinições",
  "automations.workspace.stats.running": "\nCorrendo",
  "automations.workspace.stats.successRate": "\nTaxa de sucesso",
  "automations.workspace.runDetail.status": "\nStatus",
  "automations.workspace.runDetail.created": "\nCriado",
  "automations.workspace.runDetail.completed": "\nConcluído",
  "automations.workspace.runDetail.definition": "\nDefinição",
  "automations.workspace.runDetail.steps": "\nEtapas de execução",
  "automations.workspace.runDetail.artifacts": "\nArtefatos",
  "automations.workspace.runDetail.artifactsEmpty": "\nNenhum artefato gerado",
  "automations.workspace.definitionPreview.title": "\nVisualização do fluxo de trabalho",
  "automations.workspace.definitionPreview.steps": "\nEtapas",
  "automations.workspace.definitionPreview.description":
    "\nInspecione a sequência de fluxo de trabalho selecionada, a postura do cronograma e os artefatos mais recentes.",
  "automations.workspace.definitionPreview.empty":
    "\nEscolha uma definição para inspecionar seu fluxo de trabalho e os artefatos de automação mais recentes.",
  "automations.workspace.definitionPreview.guideFlow":
    "Inspect the current workflow sequence before moving the automation into downstream review or incident response.",
  "automations.workspace.definitionPreview.guideSchedule":
    "Keep the next run window and timezone visible while reviewing trigger cadence and operating coverage.",
  "automations.workspace.definitionPreview.guideArtifacts":
    "Use the latest artifacts to confirm the workflow is still producing the expected operational output.",
  "automations.workspace.definitionPreview.timezone": "\nFuso horário",
  "automations.workspace.filters.definitionStatus": "\nFiltrar definições de automação por status",
  "automations.workspace.filters.runStatus": "\nA automação do filtro é executada por status",
  "automations.workspace.filters.definitionScope":
    "\nA automação do filtro é executada por definição",
  "automations.workspace.filters.allStatuses": "\nTodos os status",
  "automations.workspace.filters.allDefinitions": "\nTodas as definições",
  "automations.workspace.actions.preview": "\nVisualizar fluxo de trabalho",
  "automations.workspace.actions.showRuns": "\nMostrar corridas",
  "automations.workspace.runDetail.notFound":
    "\nA execução de automação solicitada não foi encontrada.",
  "automations.workspace.runDetail.started": "\nIniciado",
  "automations.workspace.runDetail.claimed": "\nReivindicado",
  "automations.workspace.runDetail.heartbeat": "\nBatimento cardíaco",
  "automations.workspace.runDetail.surface": "\nSuperfície",
  "automations.workspace.runDetail.trigger": "\nGatilho",
  "automations.workspace.runDetail.notes": "\nNotas",
  "automations.workspace.manualRun.title": "\nLançamento de execução manual",
  "automations.workspace.manualRun.description":
    "\nEnfileirar uma execução de fluxo de trabalho ao vivo sem sair do espaço de trabalho de automação.",
  "automations.workspace.manualRun.databaseRequired":
    "\nAs execuções manuais só estão disponíveis quando o plano de controle apoiado pelo banco de dados está configurado.",
  "automations.workspace.manualRun.noActiveDefinitions":
    "\nNenhuma definição de automação ativa está disponível atualmente para inicialização manual.",
  "automations.workspace.manualRun.definitionLabel": "\nDefinição para fila",
  "automations.workspace.manualRun.definitionHint":
    "Somente definições de automação ativas podem ser enfileiradas neste espaço de trabalho.",
  "automations.workspace.manualRun.notesLabel": "\nExecutar notas",
  "automations.workspace.manualRun.notesHint":
    "\nContexto do operador opcional para anexar à execução de automação na fila.",
  "automations.workspace.manualRun.submit": "\nIniciar execução",
  "automations.workspace.manualRun.created": "\n{title} foi colocado na fila com sucesso.",
  "automations.workspace.definitionStatus.DRAFT": "\nRascunho",
  "automations.workspace.definitionStatus.ACTIVE": "\nAtivo",
  "automations.workspace.definitionStatus.PAUSED": "\nPausado",
  "automations.workspace.definitionStatus.ARCHIVED": "\nArquivado",
  "automations.workspace.runStatus.QUEUED": "\nNa fila",
  "automations.workspace.runStatus.RUNNING": "\nCorrendo",
  "automations.workspace.runStatus.SUCCEEDED": "\nSucesso",
  "automations.workspace.runStatus.FAILED": "\nFalha",
  "automations.workspace.runStatus.CANCELED": "\nCancelado",
  "automations.workspace.runKind.REPORT_PACK": "\nPacote de relatórios",
  "automations.workspace.runKind.WORKFLOW": "\nFluxo de trabalho",
  "automations.workspace.runKind.EDGE_RUNBOOK": "\nRunbook de borda",
  "automations.workspace.runKind.DEVICE_COMMAND": "\nComando do dispositivo",
  "automations.workspace.runKind.ML_PIPELINE": "\nPipeline de ML",
  "automations.workspace.runStatus.AWAITING_APPROVAL": "\nAguardando aprovação",
  "automations.workspace.triggerKind.COMPLETION_OF": "\nConclusão de",
  "automations.workspace.approvalGate.title": "\nPortão de aprovação",
  "automations.workspace.approvalGate.description":
    "\nEsta automação requer aprovação manual antes do início da execução.",
  "automations.workspace.approvalGate.approve": "\nAprovar execução",
  "automations.workspace.approvalGate.reject": "\nRejeitar execução",
  "automations.workspace.approvalGate.pending": "\nAprovação pendente",
  "automations.workspace.approvalGate.approvedBy": "\nAprovado por {name}",
  "automations.workspace.approvalGate.approvedAt": "\nAprovado em",
  "automations.workspace.approvalGate.confirmTitle": "\nConfirmar aprovação",
  "automations.workspace.approvalGate.confirmDescription":
    "\nA aprovação desta execução fará a transição para o estado RUNNING. Esta ação não pode ser desfeita.",
  "automations.workspace.approvalGate.rejectTitle": "\nConfirmar rejeição",
  "automations.workspace.approvalGate.rejectDescription":
    "\nRejeitar esta execução irá cancelá-la. Esta ação não pode ser desfeita.",
  "automations.workspace.approvalGate.requiresApproval": "\nRequer aprovação",
  "automations.workspace.approvalGate.noApprovalRequired": "\nNenhuma aprovação necessária",
  "automations.workspace.scheduleEditor.title": "\nEditor de agendamento",
  "automations.workspace.scheduleEditor.description":
    "\nConfigure quando esta automação é executada usando seletores de dia da semana, hora e fuso horário.",
  "automations.workspace.scheduleEditor.cronLabel": "\nRegra de recorrência",
  "automations.workspace.scheduleEditor.timezoneLabel": "\nFuso horário",
  "automations.workspace.scheduleEditor.previewLabel": "\nVisualização da próxima execução",
  "automations.workspace.scheduleEditor.save": "\nSalvar agendamento",
  "automations.workspace.scheduleEditor.daysOfWeek": "\nDias da semana",
  "automations.workspace.scheduleEditor.hourLabel": "\nHora (24h)",
  "automations.workspace.scheduleEditor.minuteLabel": "\nMinuto",
  "automations.workspace.scheduleEditor.monday": "\nSeg",
  "automations.workspace.scheduleEditor.tuesday": "\nTer",
  "automations.workspace.scheduleEditor.wednesday": "\nQuarta",
  "automations.workspace.scheduleEditor.thursday": "\nQui",
  "automations.workspace.scheduleEditor.friday": "\nSex",
  "automations.workspace.scheduleEditor.saturday": "\nSáb",
  "automations.workspace.scheduleEditor.sunday": "\nDom",
  "automations.workspace.retryPolicy.title": "\nPolítica de nova tentativa",
  "automations.workspace.retryPolicy.description":
    "\nConfigure o comportamento de nova tentativa automática para execuções de automação com falha.",
  "automations.workspace.retryPolicy.maxAttempts": "\nMáximo de tentativas de repetição",
  "automations.workspace.retryPolicy.backoffMs": "\nIntervalo de espera (ms)",
  "automations.workspace.retryPolicy.retryOnLabel": "\nTentar novamente no status",
  "automations.workspace.retryPolicy.save": "\nSalvar política de novas tentativas",
  "automations.workspace.retryPolicy.noPolicy": "\nNenhuma política de nova tentativa configurada.",
  "automations.workspace.retryPolicy.attempt": "\nNova tentativa {attempt}",
  "automations.workspace.retryPolicy.parentRun": "\nExecução pai",
  "automations.workspace.auditTrail.title": "\nTrilha de auditoria",
  "automations.workspace.auditTrail.description":
    "\nVeja quem iniciou as execuções de automação, quando foram acionadas e seus resultados.",
  "automations.workspace.auditTrail.whoRan": "\nSolicitado por",
  "automations.workspace.auditTrail.triggeredBy": "\nGatilho",
  "automations.workspace.auditTrail.definition": "\nDefinição",
  "automations.workspace.auditTrail.outcome": "\nResultado",
  "automations.workspace.auditTrail.timestamp": "\nCarimbo de data/hora",
  "automations.workspace.auditTrail.empty": "\nNenhuma entrada de trilha de auditoria encontrada.",
  "automations.workspace.auditTrail.filterByUser": "\nFiltrar por usuário",
  "automations.workspace.auditTrail.filterByDefinition": "\nFiltrar por definição",
  "automations.workspace.auditTrail.filterByDateRange": "\nFiltrar por período",
  "automations.workspace.auditTrail.searchPlaceholder": "\nPesquisar trilha de auditoria...",
  "automations.workspace.auditTrail.searchAria": "\nPesquisar entradas da trilha de auditoria",
  "automations.workspace.chainedSequence.title": "\nSequência encadeada",
  "automations.workspace.chainedSequence.description":
    "\nEncadeie esta automação para ser acionada após a conclusão de outra definição.",
  "automations.workspace.chainedSequence.upstream": "\nDefinição ascendente",
  "automations.workspace.chainedSequence.downstream": "\nDefinições posteriores",
  "automations.workspace.chainedSequence.selectUpstream": "\nSelecione definição upstream",
  "automations.workspace.chainedSequence.save": "\nSalvar cadeia",
  "automations.workspace.chainedSequence.noChain": "\nNenhuma cadeia configurada.",
  "automations.workspace.chainedSequence.chainVisualization": "\nVisualização de cadeia",
  "admin.aiSettings.provider.RAMALAMA": "\nRamaLama",
  "admin.aiSettings.provider.OLLAMA": "\nOllama",
  "admin.aiSettings.provider.OPENAI": "\nOpenAI",
  "admin.aiSettings.provider.CLAUDE": "\nCláudio",
  "admin.aiSettings.provider.HUGGINGFACE": "\nAbraçando Rosto",
  "admin.aiSettings.provider.GEMINI": "\nGêmeos",
  "documentWorkflow.bar.label": "\nFluxo de trabalho do documento",
  "documentWorkflow.action.submit": "\nEnviar",
  "documentWorkflow.action.approve": "\nAprovar",
  "documentWorkflow.action.reject": "\nRejeitar",
  "documentWorkflow.action.qualify": "\nQualificar",
  "documentWorkflow.action.quote": "\nCitação",
  "documentWorkflow.action.accept": "\nAceitar",
  "documentWorkflow.action.decline": "\nRecusar",
  "documentWorkflow.action.confirm": "\nConfirmar",
  "documentWorkflow.action.startFulfilment": "\nIniciar cumprimento",
  "documentWorkflow.action.complete": "\nConcluído",
  "documentWorkflow.action.schedule": "\nAgenda",
  "documentWorkflow.action.startWork": "\nComece a trabalhar",
  "documentWorkflow.action.submitReview": "\nEnviar para revisão",
  "documentWorkflow.action.send": "\nEnviar",
  "documentWorkflow.action.close": "\nFechar",
  "documentWorkflow.action.receiveItems": "\nReceber itens",
  "documentWorkflow.action.recordPayment": "\nRegistrar pagamento",
  "documentWorkflow.action.issue": "\nProblema",
  "documentWorkflow.action.void": "\nVazio",
  "documentWorkflow.status.draft": "\nRascunho",
  "documentWorkflow.status.submitted": "\nEnviado",
  "documentWorkflow.status.qualified": "\nQualificado",
  "documentWorkflow.status.quoted": "\nCitado",
  "documentWorkflow.status.accepted": "\nAceito",
  "documentWorkflow.status.declined": "\nRecusado",
  "documentWorkflow.status.pendingApproval": "\nAprovação pendente",
  "documentWorkflow.status.approved": "Aprovado",
  "documentWorkflow.status.confirmed": "\nConfirmado",
  "documentWorkflow.status.inFulfilment": "\nEm Cumprimento",
  "documentWorkflow.status.completed": "\nConcluído",
  "documentWorkflow.status.triage": "\nPronto para revisão",
  "documentWorkflow.status.scheduled": "\nAgendado",
  "documentWorkflow.status.inProgress": "\nEm andamento",
  "documentWorkflow.status.readyForReview": "\nA ordem de serviço não foi encontrada.",
  "documentWorkflow.status.requested": "\nSolicitado",
  "documentWorkflow.status.sent": "\nEnviado",
  "documentWorkflow.status.partiallyReceived": "\nRecebido Parcialmente",
  "documentWorkflow.status.received": "\nRecebido",
  "documentWorkflow.status.billed": "\nFaturado",
  "documentWorkflow.status.closed": "\nAutoridade de aprovação",
  "documentWorkflow.status.issued": "\nEmitido",
  "documentWorkflow.status.partiallyPaid": "\nParcialmente pago",
  "documentWorkflow.status.paid": "\nPago",
  "documentWorkflow.status.cancelled": "\nCancelado",
  "documentWorkflow.status.void": "\nVazio",
  "documentWorkflow.status.writtenOff": "\nAnulado",
  "documentWorkflow.status.expired": "\nExpirado",
  "nav.mlops": "\nMLOps",
  "mlops.title": "\nMLOps",
  "mlops.subtitle":
    "\nExperimentos ao vivo, lançamentos de modelos, implantações e postura de dados upstream",
  "mlops.heroEyebrow": "Plano de controle ML",
  "mlops.coverage":
    "Rastreie a postura do experimento, execuções em fila, modelos implantados e dependências de dados upstream em um espaço de trabalho renderizado em servidor ativo.",
  "mlops.chatContext":
    "\nEspaço de trabalho MLOps. {experiments} experimentos, {runs} execuções ativas, {models} entradas de registro e {deployments} implantações preparadas ou ativas.",
  "mlops.stats.experiments": "\nExperimentos",
  "mlops.stats.experimentsDescription":
    "\nDefinições de experimento atualmente rastreadas no gráfico do plano de controle ao vivo.",
  "mlops.stats.activeRuns": "\nExecuções ativas",
  "mlops.stats.activeRunsDescription":
    "\nML e execuções de automação atualmente enfileiradas ou em execução no pipeline.",
  "mlops.stats.failedRuns": "\nExecuções com falha",
  "mlops.stats.failedRunsDescription":
    "\nExecuções que atualmente precisam de investigação antes que a promoção do modelo continue.",
  "mlops.stats.models": "\nEntradas de registro",
  "mlops.stats.modelsDescription":
    "\nRegistros de modelo que estão disponíveis para avaliação, preparação ou liberação.",
  "mlops.stats.deployments": "\nImplantações ao vivo",
  "mlops.stats.deploymentsDescription":
    "\nImplantações atualmente preparadas ou ativas em todo o caminho de entrega do modelo.",
  "mlops.stats.dataSources": "\nFontes upstream",
  "mlops.stats.dataSourcesDescription":
    "\nConjuntos de dados e pacotes de relatórios que alimentam a superfície de revisão MLOps atual.",
  "mlops.actions.eyebrow": "\nFluxos de trabalho conectados",
  "mlops.actions.title": "\nPasse da postura do modelo para a ação",
  "mlops.actions.description":
    "\nAbra os espaços de trabalho conectados que já possuem relatórios, automação e investigação assistida por IA para este plano de controle.",
  "mlops.action.reports":
    "\nInspecione conjuntos de dados, pacotes de relatórios e análises downstream vinculadas ao ciclo de vida do modelo atual.",
  "mlops.action.automations":
    "\nRevise as execuções de automação enfileiradas e as definições de fluxo de trabalho que dão suporte à promoção de implantação.",
  "mlops.action.chat":
    "\nAbra o espaço de trabalho de IA compartilhado para investigar anomalias, resumir a postura e planejar a próxima ação.",
  "mlops.manualRun.title": "\nIniciar execução manual",
  "mlops.manualRun.description":
    "\nEnfileirar uma execução manual de ML em um experimento, uma versão de modelo implantada ou ambos sem sair do espaço de trabalho.",
  "mlops.manualRun.databaseRequired":
    "\nConfigure o banco de dados antes de iniciar execuções manuais de ML neste espaço de trabalho.",
  "mlops.manualRun.noTargets":
    "\nNenhum experimento ou versão de modelo implantado está disponível para execuções manuais de ML ainda.",
  "mlops.manualRun.experimentLabel": "\nExperimento",
  "mlops.manualRun.experimentHint":
    "\nOpcional. Escolha um experimento quando a execução deve ser anexada a uma faixa de avaliação ativa.",
  "mlops.manualRun.experimentOptional": "\nNenhum alvo de experimento",
  "mlops.manualRun.modelVersionLabel": "\nVersão do modelo implantado",
  "mlops.manualRun.modelVersionHint":
    "Opcional. Escolha uma versão de modelo implantada quando a execução avaliar um destino de lançamento promovido.",
  "mlops.manualRun.modelVersionOptional": "\nNenhuma versão de modelo implantada alvo",
  "mlops.manualRun.submit": "\nFila manual run",
  "mlops.manualRun.created": "\nA execução manual de ML foi enfileirada com sucesso.",
  "mlops.summary.eyebrow": "\nResumo operacional",
  "mlops.summary.title": "\nPostura atual de MLOps",
  "mlops.summary.description":
    "\nEste espaço de trabalho consolida a execução do experimento, a prontidão da implantação, a atualização dos dados upstream e a pressão de automação do gráfico ao vivo.",
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
    "\n{live} ao vivo, {monitor} sob vigilância, {offline} conjuntos de dados off-line.",
  "mlops.summary.reportPacks":
    "\n{ready} pronto, {building} construindo, {failed} pacotes de relatórios com falha.",
  "mlops.summary.automationRuns":
    "\n{count} execuções de automação estão atualmente na fila ou em execução.",
  "mlops.summary.deployments": "\n{count} implantações estão atualmente preparadas ou ativas.",
  "mlops.runQueue.title": "\nExecute fila",
  "mlops.runQueue.description":
    "\nPriorize as execuções de modelo e automação que estão atualmente na fila, em execução ou bloqueadas por falha.",
  "mlops.runQueue.empty": "\nNenhuma execução ativa ou com falha requer atenção agora.",
  "mlops.runQueue.table.item": "\nItem",
  "mlops.runQueue.table.type": "\nTipo",
  "mlops.runQueue.table.status": "\nStatus",
  "mlops.runQueue.table.updated": "\nAtualizado",
  "mlops.runQueue.kind.ml": "\nML executado",
  "mlops.runQueue.kind.automation": "\nAutomação / {kind}",
  "mlops.runQueue.mlFallbackTitle": "\nExecução de ML não atribuída",
  "mlops.experiments.title": "\nExperimentos",
  "mlops.experiments.description":
    "\nRevise os objetivos do experimento, o status atual e a cobertura da execução antes de promover novas versões do modelo.",
  "mlops.experiments.name": "\nNome",
  "mlops.experiments.objective": "\nObjetivo",
  "mlops.experiments.status": "\nStatus",
  "mlops.experiments.runCount": "\nExecuta",
  "mlops.experiments.lastUpdated": "\nÚltima atualização",
  "mlops.experiments.empty": "\nNenhum experimento de ML está conectado ainda.",
  "mlops.registry.title": "\nRegistro de modelo",
  "mlops.registry.description":
    "\nRevise as entradas do registro e o estágio de implantação mais recente antes de mover as versões para produção.",
  "mlops.registry.name": "\nModelo",
  "mlops.registry.stage": "\nEstágio",
  "mlops.registry.versions": "\nVersões",
  "mlops.registry.empty": "\nNenhuma entrada de registro de modelo está disponível ainda.",
  "mlops.deployments.title": "\nImplantações",
  "mlops.deployments.description":
    "\nInspecione o volume de implantação, o estado da promoção e os carimbos de data/hora da versão mais recente no gráfico do modelo ativo.",
  "mlops.deployments.model": "\nModelo",
  "mlops.deployments.version": "\nVersão",
  "mlops.deployments.environment": "\nAmbiente",
  "mlops.deployments.status": "\nStatus",
  "mlops.deployments.deployedAt": "\nImplantado",
  "mlops.deployments.empty": "\nNenhuma implantação de modelo está ativa ainda.",
  "mlops.upstream.title": "\nDependências ascendentes",
  "mlops.upstream.description":
    "\nRastreie a atualização do conjunto de dados e a postura de construção do pacote de relatórios que pode bloquear a entrega do modelo e a análise downstream.",
  "mlops.upstream.empty":
    "\nNenhum conjunto de dados upstream ou pacote de relatórios está conectado ainda.",
  "mlops.upstream.table.item": "\nItem",
  "mlops.upstream.table.kind": "\nTipo",
  "mlops.upstream.table.status": "\nStatus",
  "mlops.upstream.table.updated": "\nAtualizado",
  "mlops.upstream.kind.dataset": "\nConjunto de dados",
  "mlops.upstream.kind.pack": "\nPacote de relatórios",
  "mlops.runStatus.QUEUED": "\nNa fila",
  "mlops.runStatus.RUNNING": "\nCorrendo",
  "mlops.runStatus.SUCCEEDED": "\nSucesso",
  "mlops.runStatus.FAILED": "\nFalha",
  "mlops.runStatus.CANCELED": "\nCancelado",
  "mlops.deploymentStatus.DRAFT": "\nRascunho",
  "mlops.deploymentStatus.STAGED": "\nEncenado",
  "mlops.deploymentStatus.ACTIVE": "\nAtivo",
  "mlops.deploymentStatus.ROLLED_BACK": "\nRevertido",
  "mlops.deploymentStatus.RETIRED": "\nAposentado",
  "mlops.datasetFreshness.LIVE": "\nAo vivo",
  "mlops.datasetFreshness.MONITOR": "\nMonitor",
  "mlops.datasetFreshness.OFFLINE": "\nOff-line",
  "mlops.reportPackState.DRAFT": "\nRascunho",
  "mlops.reportPackState.BUILDING": "\nEdifício",
  "mlops.reportPackState.READY": "\nPronto",
  "mlops.reportPackState.FAILED": "\nFalha",
  "mlops.reportPackState.ARCHIVED": "\nArquivado",
  "mlops.automationKind.DEVICE_COMMAND": "\nComando do dispositivo",
  "mlops.automationKind.EDGE_RUNBOOK": "\nRunbook de borda",
  "mlops.automationKind.WORKFLOW": "\nFluxo de trabalho",
  "mlops.automationKind.REPORT_PACK": "\nPacote de relatórios",
  "mlops.automationKind.ML_PIPELINE": "\nPipeline de ML",
  "nav.training": "\nTreinamento",
  "training.title": "\nProntidão para treinamento",
  "training.subtitle": "\nAlcances, sistemas de segurança, postura de alvo e ações operacionais",
  "training.heroEyebrow": "\nOperações de treinamento",
  "training.coverage":
    "Use ativos de intervalo de treinamento ao vivo, registros de controle de intervalo, pressão de backlog e problemas no local para aumentar a prontidão de um espaço de trabalho SSR.",
  "training.view.readiness": "\nProntidão",
  "training.view.controls": "\nControles",
  "training.view.incidents": "\nIncidentes",
  "training.view.history": "\nHistória",
  "training.chatContext":
    "\nEspaço de trabalho de preparação para treinamento. {assets} ativos em {sites} sites. {actions} ações abertas. {controls} registros de controle de alcance ao vivo.",
  "training.stats.assets": "\nAtivos rastreados",
  "training.stats.assetsDescription":
    "\nFaixas de treinamento, sistemas de segurança e ativos de alvo no escopo.",
  "training.stats.readyAssets": "\nPronto agora",
  "training.stats.readyAssetsDescription":
    "\nAtivos atualmente operacionais ou degradados, em vez de restritos.",
  "training.stats.sites": "\nSites cobertos",
  "training.stats.sitesDescription":
    "\nSites com ativos imobiliários de treinamento no gráfico ao vivo.",
  "training.stats.actions": "\nAções abertas",
  "training.stats.actionsDescription":
    "\nTarefas, previsões críticas e tickets de suporte ativos que precisam de acompanhamento.",
  "training.stats.controls": "\nControles ao vivo",
  "training.stats.controlsDescription":
    "\nRegistros de controle de alcance disponíveis para a propriedade de treinamento.",
  "training.actions.eyebrow": "\nFluxos de trabalho conectados",
  "training.actions.title": "\nPasse da prontidão para a execução",
  "training.actions.description":
    "\nAbra os espaços de trabalho conectados que já possuem remediação, suporte e relatórios para o conjunto de treinamento.",
  "training.action.assets":
    "\nInspecione o registro de ativos de alcance ao vivo e a hierarquia do sistema de suporte.",
  "training.action.tasks":
    "\nDespachar inspeções, reparos e trabalhos de substituição para sistemas de treinamento.",
  "training.action.support":
    "\nRevise os escalonamentos do site ao vivo e as filas de suporte vinculadas aos sites de treinamento.",
  "training.action.reports": "\nAbra o pacote de preparação pronto para uso sem sair da casca.",
  "training.action.estate":
    "\nAbra o plano de controle patrimonial para governança e controles vinculados.",
  "training.workspace.brief.title": "Operational handoff",
  "training.workspace.brief.description":
    "Judge readiness coverage, pending controls, and support pressure before moving through controls, incidents, or history.",
  "training.summary.eyebrow": "\nResumo de preparação",
  "training.summary.title": "\nPostura de prontidão atual",
  "training.summary.description":
    "\nEste espaço de trabalho consolida a disponibilidade de treinamento, a atividade de controle e a pressão de acompanhamento do gráfico operacional ao vivo.",
  "training.summary.capabilities":
    "\n{ready} dos {total} recursos de treinamento monitorados estão prontos no momento.",
  "training.summary.inspections":
    "\n{count} tarefas de inspeção atrasadas estão afetando a prontidão.",
  "training.summary.controls":
    "\n{count} registros de controle de intervalo são sinalizados para ação necessária.",
  "training.summary.replacementQueue": "\n{count} itens de reposição permanecem na fila.",
  "training.readiness.title": "\nQuadro de preparação para treinamento",
  "training.readiness.description":
    "\nRevise a cobertura da capacidade, a pressão de inspeção e a postura de controle antes de despachar o trabalho operacional.",
  "training.readiness.empty": "\nNenhum ativo de treinamento ao vivo está conectado ainda.",
  "training.readiness.capabilities": "\nCapacidades rastreadas",
  "training.readiness.capabilitiesDescription":
    "Rótulos de capacidade atualmente mapeados para ativos e intervalos de treinamento.",
  "training.readiness.readyCapabilities": "\nCapacidades prontas",
  "training.readiness.readyCapabilitiesDescription":
    "\nCapacidades sem bloqueador de site ou condição no momento.",
  "training.readiness.watchCapabilities": "\nCapacidades de observação",
  "training.readiness.watchCapabilitiesDescription":
    "\nCapacidades atualmente sob vigilância devido à degradação ou pressão do local.",
  "training.readiness.overdueInspections": "\nInspeções atrasadas",
  "training.readiness.overdueInspectionsDescription":
    "\nTrabalho de inspeção que pode reduzir diretamente a disponibilidade de treinamento.",
  "training.readiness.alertTitle": "\nPostura de controle operacional",
  "training.readiness.alertDescription":
    "\n{actionRequired} registros de controle exigem ação, {replacementQueue} itens de reposição permanecem na fila e {labourHours} de mão de obra foi registrada no trabalho de preparação.",
  "training.siteFocus.title": "\nFoco do site",
  "training.siteFocus.subtitle":
    "\nPriorize os locais onde ativos restritos, pendências ou tickets em tempo real podem interromper a entrega do treinamento.",
  "training.siteFocus.empty": "\nNenhum site de treinamento está disponível ainda.",
  "training.siteFocus.itemDescription":
    "\n{assets} ativos, {constrained} restritos, {tasks} tarefas abertas, {predictions} previsões críticas, {tickets} tickets ativos.",
  "training.attentionAssets.title": "\nAtenção ativos",
  "training.attentionAssets.subtitle":
    "\nRevise os ativos que sofrem maior pressão de prontidão antes que os problemas cheguem à entrega.",
  "training.attentionAssets.empty":
    "\nAtualmente, nenhum ativo de treinamento requer escalonamento.",
  "training.attentionAssets.itemDescription":
    "\n{site} / {type} / {condition} / Última inspeção: {lastInspection} / {signals} sinais ao vivo.",
  "training.attentionAssets.lastInspectionNone": "\nNão registrado",
  "training.actionQueue.title": "\nFila de ações",
  "training.actionQueue.description":
    "\nEssa fila revela trabalhos atrasados, previsões críticas e problemas de suporte ao vivo vinculados aos locais de treinamento.",
  "training.actionQueue.empty": "\nNenhuma ação de treinamento requer escalonamento no momento.",
  "training.actionQueue.kind.task": "\nTarefa",
  "training.actionQueue.kind.prediction": "\nPrevisão",
  "training.actionQueue.kind.support": "\nSuporte",
  "training.actionQueue.taskDescription": "\n{status} / {site} / Vencimento {deadline}.",
  "training.actionQueue.predictionDescription":
    "\n{severity} / {site} / {remainingLife} dias restantes de vida.",
  "training.actionQueue.supportDescription": "\nPrioridade {status} / {site} / {priority}.",
  "training.rangeControls.title": "\nControles de intervalo recentes",
  "training.rangeControls.description":
    "\nUse os registros de controle de alcance mais recentes para confirmar a postura operacional e de conformidade.",
  "training.rangeControls.empty": "\nNenhum registro de controle de faixa está disponível ainda.",
  "training.rangeControls.table.record": "\nRegistro",
  "training.rangeControls.table.location": "\nLocalização",
  "training.rangeControls.table.signal": "\nSinal",
  "training.rangeControls.table.updated": "\nAtualizado",
  "training.rangeControls.signalSummary":
    "Estado {status} / Operacional {operational} / Conformidade {compliance}",
  "training.quickLog.title": "\nControle de intervalo de log",
  "training.quickLog.description":
    "\nCapture o controle operacional ou de conformidade mais recente sem sair do espaço de trabalho de prontidão.",
  "training.quickLog.databaseRequired":
    "\nUm banco de dados configurado é necessário antes que as atualizações de controle de treinamento possam ser registradas.",
  "training.quickLog.empty":
    "\nNenhum site de treinamento está disponível para registro de controle ainda.",
  "training.quickLog.emptyDescription":
    "Coloque os ativos de treinamento no escopo primeiro para que as atualizações de controle possam ser anexadas ao site ou ao ativo de intervalo correto.",
  "training.quickLog.assetOptional": "\nApenas controle em nível de site",
  "training.quickLog.helper":
    "\nRegistre a postura de controle atual aqui e deixe o espaço de trabalho ao vivo atualizar a imagem de prontidão ao seu redor.",
  "training.quickLog.submit": "\nAtualização de controle de log",
  "training.quickLog.submitAria": "\nAtualização de controle de faixa de treinamento de registro",
  "training.quickLog.feedback.saved":
    "\nAtualização de controle de treinamento registrada com sucesso.",
  "notifications.title": "\nNotificações",
  "notifications.bell": "\nAbrir notificações",
  "notifications.empty": "\nTudo limpo",
  "notifications.emptyDescription": "\nNenhuma nova notificação no momento.",
  "notifications.unread": "\nNão lido",
  "notifications.markRead": "\nMarcar como lido",
  "notifications.dismiss": "\nDispensar",
  "chat.workspace.systemEvent": "\nSistema",
  "chat.workspace.toolResult": "\nFerramenta",
  "chat.workspace.handoffNote": "\nTransferência",
  "chat.workspace.delivered": "\nEntregue",
  "chat.workspace.unreadCount": "\n{count} não lido",
  "admin.integrationHealth.title": "\nSaúde de integração",
  "admin.integrationHealth.subtitle": "\nStatus de sincronização entre sistemas conectados",
  "admin.integrationHealth.syncsTotal": "\nTotal de sincronizações",
  "admin.integrationHealth.syncsFailed": "\nFalha",
  "admin.integrationHealth.syncsSuccess": "\nSucesso",
  "admin.integrationHealth.lastSync": "\nÚltima sincronização",
  "admin.auditTimeline.title": "\nRegistro de auditoria",
  "admin.auditTimeline.subtitle": "\nEventos recentes do sistema e mudanças de estado",
  "admin.iotCommands.title": "\nCiclo de vida do comando IoT",
  "admin.iotCommands.subtitle": "\nStatus de entrega e confirmação do comando do dispositivo",
  "admin.iotCommands.queued": "\nNa fila",
  "admin.iotCommands.delivered": "\nEntregue",
  "admin.iotCommands.acknowledged": "\nReconhecido",
  "admin.iotCommands.completed": "\nConcluído",
  "admin.iotCommands.failed": "\nFalha",
  "admin.portalMembership.title": "\nAssociação ao portal",
  "admin.portalMembership.subtitle": "\nAcesso de parceiros e gerenciamento de convites",
  "admin.portalMembership.email": "\nE-mail",
  "admin.portalMembership.role": "\nFunção",
  "admin.portalMembership.status": "\nStatus",
  "admin.portalMembership.invited": "\nConvidado",
  "admin.portalMembership.active": "\nAtivo",
  "admin.portalMembership.pending": "\nPendente",
  "fleet.stats.vehicles": "\nVeículos",
  "fleet.stats.activeOps": "\nOperações ativas",
  "fleet.stats.initiatives": "\nIniciativas",
  "fleet.accordion.operations": "\nResumo de operações",
  "fleet.accordion.regional": "\nComparação regional",
  "fleet.accordion.focus": "\nFoco em melhoria",
  "buildings.stats.total": "\nEdifícios",
  "buildings.stats.initiatives": "\nIniciativas",
  "buildings.stats.contracts": "\nMedidas contratuais",
  "buildings.accordion.performance": "\nComparação de desempenho",
  "buildings.accordion.initiatives": "\nProgresso da iniciativa",
  "sensors.stats.total": "\nSensores",
  "sensors.stats.activeAlerts": "\nAlertas ativos",
  "sensors.stats.alertRules": "\nRegras de alerta",
  "sensors.health.title": "\nSaúde do sensor",
  "predictions.stats.total": "\nPrevisões",
  "predictions.stats.critical": "\nCrítico",
  "predictions.stats.avgConfidence": "\nConfiança média",
  "predictions.timeline.title": "\nPróximas previsões",
  "predictions.timeline.subtitle": "\nPrevisões classificadas por data esperada",
  "predictions.filter.all": "\nTodos",
  "predictions.filter.critical": "\nCrítico",
  "predictions.filter.high": "\nAlto",
  "predictions.filter.medium": "\nMédio",
  "predictions.filter.low": "\nBaixo",
  "digitalTwin.hotspot.title": "\nDetalhe do ponto de acesso",
  "digitalTwin.hotspot.created": '\nPonto de acesso "{title}" criado.',
  "digitalTwin.hotspot.deleted": "\nPonto de acesso removido.",
  "digitalTwin.hotspots.noTwinAvailable":
    "\nNenhum gêmeo digital está configurado. Crie primeiro um gêmeo para um site.",
  "digitalTwin.overlay.sensors": "\nSobreposição do sensor",
  "digitalTwin.overlay.status": "\nStatus do dispositivo",
  "financePlanning.compare.title": "\nComparação de cenários",
  "financePlanning.compare.subtitle": "\nAnálise de projeção lado a lado",
  "financePlanning.compare.scenarioA": "\nCenário A",
  "financePlanning.compare.scenarioB": "\nCenário B",
  "financePlanning.compare.delta": "\nDelta",
  "financePlanning.compare.select": "\nSelecione cenários",
  "estate.governance.title": "\nGovernança",
  "estate.governance.agreements": "\nContratos",
  "estate.governance.fmControls": "\nControles FM",
  "estate.governance.stewardship": "\nMordomia",
  "estate.governance.rangeControls": "\nControles de faixa",
  "estate.tabs.overview": "\nVisão geral",
  "estate.tabs.governance": "\nAprovações",
  "estate.tabs.assurance": "\nAtivos e garantias",
  "estate.tabs.readiness": "\nProntidão",
  "estate.tabs.partnerships": "\nContratos e Integrações",
  "analytics.title": "\nAnálise",
  "analytics.subtitle": "\nGerenciamento de conjunto de dados e definições de métricas",
  "analytics.datasets.name": "\nConjunto de dados",
  "analytics.datasets.freshness": "\nFrescura",
  "analytics.datasets.metrics": "\nMétricas",
  "analytics.datasets.empty": "\nNenhum conjunto de dados configurado",
  "analytics.datasets.emptyCta":
    "\nConfigure seu primeiro conjunto de dados analíticos para começar a rastrear métricas.",
  "portal.members.title": "\nMembros",
  "portal.members.subtitle": "\nAcesso de parceiros e gerenciamento de convites",
  "portal.members.invite": "\nConvidar membro",
  "portal.members.email": "\nE-mail",
  "portal.members.role": "\nFunção",
  "portal.members.status": "\nStatus",
  "portal.members.status.active": "\nAtivo",
  "portal.members.status.pending": "\nPendente",
  "portal.members.status.expired": "\nExpirado",
  "portal.members.stage.invited": "\nConvidado",
  "portal.members.stage.accepted": "\nAceito",
  "portal.members.stage.active": "\nAtivo",
  "portal.members.empty": "\nAinda não há membros",
  "portal.members.emptyCta": "\nConvide seu primeiro parceiro para o portal.",
  "portal.members.searchPlaceholder": "\nPesquisar membros…",
  "portal.members.searchLabel": "\nPesquisar membros do portal",
  "portal.members.filter.allStatuses": "\nTodos os status",
  "portal.members.filter.allParties": "\nTodas as partes",
  "onboarding.title": "\nComece",
  "onboarding.subtitle": "\nConclua estas etapas para configurar seu espaço de trabalho",
  "onboarding.step.registerAsset": "\nCadastre o primeiro ativo",
  "onboarding.step.configureIntegrations": "\nConfigurar integrações",
  "onboarding.step.inviteTeam": "\nConvide membros da equipe",
  "onboarding.step.setupAutomation": "\nConfigure a primeira automação",
  "onboarding.step.generateReport": "\nGerar primeiro relatório",
  "onboarding.dismiss": "\nDispensar guia",
  "customisation.dashboard.title": "\nWidgets do painel",
  "customisation.dashboard.subtitle": "\nEscolha quais seções aparecem em seu painel",
  "customisation.dashboard.kpiWidgets": "\nWidgets de KPI",
  "customisation.dashboard.activityFeed": "\nFeed de atividades",
  "customisation.dashboard.quickActions": "Ações rápidas",
  "customisation.dashboardPreset.title": "\nPredefinições do painel",
  "customisation.dashboardPreset.commandCenter": "\nCentro de comando",
  "customisation.dashboardPreset.commandCenterDescription":
    "\nMostre widgets de KPI, feed de atividades e ações rápidas juntos.",
  "customisation.dashboardPreset.shiftFocus": "\nMudar foco",
  "customisation.dashboardPreset.shiftFocusDescription":
    "\nMantenha os widgets de KPI e as ações rápidas visíveis enquanto silencia o feed de atividades.",
  "customisation.dashboardPreset.quiet": "\nPlaca silenciosa",
  "customisation.dashboardPreset.quietDescription":
    "\nReduza o painel para widgets de KPI para uma página de destino diária de baixo ruído.",
  "customisation.dashboardPreset.custom": "\nLayout personalizado",
  "customisation.dashboardPreset.customDescription":
    "\nAs configurações atuais do painel não correspondem a uma das predefinições integradas.",
  "customisation.dashboardPreset.subtitle":
    "\nEscolha a postura do painel que melhor se adapta ao seu ritmo operacional atual.",
  "nav.supportTickets": "\nTíquetes de suporte",
  "supportTickets.title": "\nTíquetes de suporte",
  "supportTickets.subtitle": "\nRastreie e gerencie solicitações de suporte",
  "supportTickets.status.OPEN": "\nAbrir",
  "supportTickets.status.IN_PROGRESS": "\nEm andamento",
  "supportTickets.status.AWAITING_CUSTOMER": "\nAguardando Cliente",
  "supportTickets.status.RESOLVED": "\nResolvido",
  "supportTickets.status.CLOSED": "\nAutoridade de aprovação",
  "supportTickets.priority.LOW": "\nBaixo",
  "supportTickets.priority.MEDIUM": "\nMédio",
  "supportTickets.priority.HIGH": "\nAlto",
  "supportTickets.priority.URGENT": "\nUrgente",
  "supportTickets.category.GENERAL_INQUIRY": "\nConsulta Geral",
  "supportTickets.category.TECHNICAL_ISSUE": "\nProblema Técnico",
  "supportTickets.category.BILLING": "\nFaturamento",
  "supportTickets.category.FEATURE_REQUEST": "\nSolicitação de recurso",
  "supportTickets.category.BUG_REPORT": "\nRelatório de bug",
  "supportTickets.category.ACCOUNT_ACCESS": "\nAcesso à conta",
  "supportTickets.category.INTEGRATION": "\nIntegração",
  "supportTickets.category.OTHER": "\nOutro",
  "supportTickets.stats.total": "\nTotal de ingressos",
  "supportTickets.stats.breached": "Breached",
  "supportTickets.stats.open": "\nAbrir",
  "supportTickets.stats.inProgress": "\nEm andamento",
  "supportTickets.stats.resolved": "\nResolvido",
  "supportTickets.tab.all": "\nTodos os ingressos",
  "supportTickets.tab.open": "\nAbrir",
  "supportTickets.tab.inProgress": "\nEm andamento",
  "supportTickets.tab.resolved": "\nResolvido",
  "supportTickets.tab.closed": "\nAutoridade de aprovação",
  "supportTickets.table.ticketNumber": "N. do ticket",
  "supportTickets.table.subject": "\nAssunto",
  "supportTickets.table.status": "\nStatus",
  "supportTickets.table.priority": "\nPrioridade",
  "supportTickets.table.category": "\nCategoria",
  "supportTickets.table.assignedTo": "\nAtribuído a",
  "supportTickets.table.createdAt": "\nCriado",
  "supportTickets.table.updatedAt": "\nAtualizado",
  "supportTickets.table.ariaLabel": "\nLista de tickets de suporte",
  "supportTickets.searchPlaceholder": "\nPesquisar ingressos…",
  "supportTickets.searchLabel": "\nPesquisar tickets de suporte",
  "supportTickets.empty": "\nNenhum ticket de suporte encontrado.",
  "supportTickets.emptyCta": "\nCrie um novo ticket para começar.",
  "supportTickets.workspace.listTitle": "Ticket inbox",
  "supportTickets.workspace.listDescription":
    "Review the queue, then open a ticket to continue triage, replies, and status changes in the workbench.",
  "supportTickets.workspace.listEmptyDescription":
    "This queue is clear. Adjust filters or create a new ticket to start the next response thread.",
  "supportTickets.create.title": "\nNovo ticket de suporte",
  "supportTickets.create.subject": "\nAssunto",
  "supportTickets.create.subjectPlaceholder": "\nBreve descrição do problema",
  "supportTickets.create.description": "\nDescrição",
  "supportTickets.create.descriptionPlaceholder": "\nForneça detalhes sobre o problema",
  "supportTickets.create.priority": "\nPrioridade",
  "supportTickets.create.category": "\nCategoria",
  "supportTickets.create.site": "\nLocal",
  "supportTickets.create.sitePlaceholder": "\nSelecione um site",
  "supportTickets.create.submit": "\nCriar ingresso",
  "supportTickets.create.submitting": "\nCriando…",
  "supportTickets.create.success": "\nTicket {ticketNumber} criado com sucesso.",
  "supportTickets.create.error": "\nFalha ao criar ticket: {message}",
  "supportTickets.detail.title": "\nDetalhes do ingresso",
  "supportTickets.detail.statusLabel": "\nStatus",
  "supportTickets.detail.priorityLabel": "\nPrioridade",
  "supportTickets.detail.categoryLabel": "\nCategoria",
  "supportTickets.detail.assigneeLabel": "\nCessionário",
  "supportTickets.detail.siteLabel": "\nLocal",
  "supportTickets.detail.createdLabel": "\nCriado",
  "supportTickets.detail.updatedLabel": "\nÚltima atualização",
  "supportTickets.detail.resolvedLabel": "\nResolvido",
  "supportTickets.detail.closedLabel": "\nAutoridade de aprovação",
  "supportTickets.detail.unassigned": "\nNão atribuído",
  "supportTickets.detail.noSite": "\nNenhum site",
  "supportTickets.detail.selectPromptTitle": "\nSelecione um ingresso",
  "supportTickets.detail.selectPromptDescription":
    "\nEscolha um ticket de suporte para revisar mensagens, atualizar status e enviar respostas.",
  "supportTickets.detail.selectGuideMessages":
    "Read the full conversation and internal notes before drafting the next reply.",
  "supportTickets.detail.selectGuideActions":
    "Promote the next status, request evidence, or hand the ticket to the next owner without leaving the workbench.",
  "supportTickets.detail.selectGuideCloseout":
    "Keep timestamps, site context, and final updates visible for an audit-ready closeout.",
  "supportTickets.detail.messages": "\nMensagens",
  "supportTickets.detail.messagesEmpty": "\nNenhuma mensagem ainda.",
  "supportTickets.detail.addMessage": "\nAdicionar resposta",
  "supportTickets.detail.messagePlaceholder": "\nDigite sua resposta…",
  "supportTickets.detail.sendMessage": "\nEnviar",
  "supportTickets.detail.internalNote": "\nNota interna",
  "supportTickets.detail.updateStatus": "\nAtualizar status",
  "supportTickets.detail.close": "\nFechar ticket",
  "supportTickets.detail.reopen": "\nReabrir ticket",
  "supportTickets.filter.status": "\nStatus",
  "supportTickets.filter.priority": "\nPrioridade",
  "supportTickets.filter.category": "\nCategoria",
  "supportTickets.filter.site": "\nLocal",
  "supportTickets.filter.allStatuses": "\nTodos os status",
  "supportTickets.filter.allPriorities": "\nTodas as prioridades",
  "supportTickets.filter.allCategories": "\nTodas as categorias",
  "supportTickets.filter.allSites": "\nTodos os sites",
  "supportTickets.validation.subjectRequired": "\nO assunto é obrigatório.",
  "supportTickets.validation.descriptionRequired": "\nA descrição é obrigatória.",
  "supportTickets.message.sent": "\nResposta enviada.",
  "supportTickets.message.error": "\nFalha ao enviar resposta: {message}",
  "supportTickets.statusUpdate.success": "\nStatus do ticket atualizado.",
  "supportTickets.statusUpdate.error": "\nFalha ao atualizar o status: {message}",
  "chat.workspace.threadPanelTitle": "\nTópico",
  "common.emptySearchTitle": "\nNenhum resultado encontrado",
  "common.emptySearchDescription": "\nTente ajustar seus critérios de pesquisa ou filtro.",
  "common.pagination.summary": "\nMostrando {from}–{to} de {total}",
  "documentDetail.breadcrumb.navAria": "\nNavegação estrutural",
  "documentDetail.title": "\nDetalhe do documento",
  "documentDetail.loading": "\nCarregando documento…",
  "documentDetail.error.title": "\nErro ao carregar documento",
  "documentDetail.error.description":
    "\nO documento não pôde ser carregado. Por favor, tente novamente.",
  "documentDetail.field.title": "\nTítulo",
  "documentDetail.field.customer": "\nCliente",
  "documentDetail.field.customerEmail": "\nE-mail do cliente",
  "documentDetail.field.customerOrder": "\nJanela agendada",
  "documentDetail.field.createdOrder": "\nPedido criado",
  "documentDetail.field.site": "\nLocal",
  "documentDetail.field.dueDate": "\nData de vencimento",
  "documentDetail.field.requestedAt": "\nSolicitado em",
  "documentDetail.field.requestedBy": "\nSolicitado por",
  "documentDetail.field.requestedDeliveryAt": "\nEntrega solicitada",
  "documentDetail.field.totalAmount": "\nValor total",
  "documentDetail.field.budget": "\nOrçamento",
  "documentDetail.field.approvedBy": "\nAprovado por",
  "documentDetail.field.assignee": "\nCessionário",
  "documentDetail.field.estimatedCloseAt": "\nFechamento estimado",
  "documentDetail.field.issuedAt": "\nEmitido em",
  "documentDetail.field.paidAt": "\nPago em",
  "documentDetail.field.paymentTerm": "\nPrazo de pagamento",
  "documentDetail.field.labourCost": "\nCusto do material",
  "documentDetail.field.materialCost": "\nOutro custo",
  "documentDetail.field.outstandingAmount": "\nValor pendente",
  "documentDetail.field.receipts": "\nRecibos",
  "documentDetail.field.discrepancy": "\nDiscrepância",
  "documentDetail.field.dispatchWindow": "\nJanela de despacho",
  "documentDetail.field.sla": "Nível de serviço",
  "documentDetail.field.signoff": "\nAprovação",
  "documentDetail.field.scheduleWindow": "Janela de agendamento",
  "documentDetail.field.sourceRfq": "\nFonte RFQ",
  "documentDetail.field.updatedAt": "\nAtualizado em",
  "documentDetail.field.vendor": "\nFornecedor",
  "documentDetail.field.vendorReference": "\nReferência do fornecedor",
  "documentDetail.field.workOrder": "\nOrdem de serviço",
  "documentDetail.section.overviewTitle": "\nVisão geral",
  "documentDetail.section.overviewDescription": "\nDetalhes principais deste documento.",
  "documentDetail.section.lineItemsTitle": "\nItens de linha",
  "documentDetail.section.lineItemsDescription": "\nItens incluídos neste documento.",
  "documentDetail.section.relatedTitle": "\nDocumentos relacionados",
  "documentDetail.section.relatedDescription": "\nDocumentos vinculados a este registro.",
  "documentDetail.table.description": "\nDescrição",
  "documentDetail.table.quantity": "\nQuantidade",
  "documentDetail.table.amount": "\nValor",
  "documentDetail.table.total": "\nTotal",
  "documentDetail.empty.lineItems": "\nNenhum item de linha.",
  "documentDetail.empty.related": "\nNenhum documento relacionado.",
  "documentDetail.empty.timeline": "\nNenhuma entrada na linha do tempo.",
  "documentWorkflow.feedback.updated": "\nStatus do fluxo de trabalho atualizado.",
  "documentWorkflow.feedback.invalidAction": "\nAção de fluxo de trabalho inválida.",
  "estate.focus.title": "\nFoco imobiliário",
  "estate.integration.title": "\nIntegrações",
  "estate.integration.coverageLabel": "\n{configured} de {total} integrações estão configuradas.",
  "mlops.summary.experiments": "\nExperimentos",
  "mlops.summary.registry": "\nRegistro de modelo",
  "portal.invite.title": "\nConvite do portal",
  "portal.invite.subtitle": "\nVocê foi convidado a ingressar no portal.",
  "portal.invite.accept": "\nAceitar convite",
  "portal.invite.email": "\nE-mail",
  "portal.invite.party": "\nOrganização",
  "portal.invite.expires": "\nExpira",
  "portal.invite.metadata": "\nDetalhes do convite",
  "portal.invite.accessTitle": "\nVisualização do acesso do parceiro",
  "portal.invite.accessDescription":
    "\nVisualize a organização convidada, confirme a conta receptora e mantenha o caminho de aceitação na mesma tela segura.",
  "portal.invite.openPortal": "\nAbrir portal",
  "portal.invite.signIn": "\nEntrar",
  "portal.invite.signOut": "\nSair",
  "portal.invite.signedInAs": "\nConectado como {email}",
  "portal.invite.checklist.scopeTitle": "\nRevise a organização convidada",
  "portal.invite.checklist.scopeDescription":
    "\nEste convite concede acesso com escopo à superfície do portal compartilhado apenas para a organização listada.",
  "portal.invite.checklist.expiryTitle": "\nAceite antes que o convite expire",
  "portal.invite.checklist.expiryDescription":
    "\nUse o mesmo caminho de convite antes da data de expiração para que a aceitação permaneça anexada à solicitação original.",
  "portal.invite.checklist.supportTitle": "\nUse a conta convidada ou troque de forma limpa",
  "portal.invite.checklist.supportDescription":
    "\nFaça login com o endereço de e-mail convidado para continuar. Se o acesso ainda falhar, tente novamente a partir deste convite em vez de abrir um caminho de portal separado.",
  "portal.invite.checklist.switchAccountDescription":
    "\nSe você estiver conectado com o endereço de e-mail errado, saia primeiro e retorne a este convite para que os direitos permaneçam alinhados.",
  "portal.invite.error.expired": "\nEste convite expirou.",
  "portal.invite.error.invalid": "\nEste convite é inválido.",
  "portal.invite.error.unauthenticated": "\nFaça login para aceitar este convite.",
  "portal.invite.error.emailMismatch":
    "\nEste convite foi enviado para um endereço de e-mail diferente.",
  "portal.members.access.invite": "\nConvidar membro",
  "portal.members.access.pendingAcceptance": "\nAceitação pendente",
  "portal.members.access.membership": "\nAssociação",
  "portal.members.rolePending": "\nPendente",
  "portal.members.error.alreadyMember": "\nEste usuário já é membro.",
  "portal.members.error.invalidInput": "\nVerifique o formulário e tente novamente.",
  "portal.members.error.partyNotFound": "\nOrganização não encontrada.",
  "portal.members.error.notFound": "\nO membro selecionado não foi encontrado.",
  "portal.members.error.invalidRole": "\nEscolha uma função de portal válida.",
  "portal.members.error.roleUnavailable":
    "\nAs alterações de função estão disponíveis apenas para assinaturas ativas.",
  "portal.members.roleChange": "\nMudança de função",
  "portal.members.updateRole": "\nAtualizar função",
  "portal.members.revoke": "\nRevogar acesso",
  "portal.members.revokeDescription":
    "\nRevogar o convite ou associação selecionado sem sair do contexto atual do espaço de trabalho.",
  "portal.members.unavailable.title": "\nMembros do portal indisponíveis",
  "portal.members.unavailable.description":
    "\nO espaço de trabalho dos membros fica indisponível enquanto o banco de dados estiver offline. Filtros, convites e ações de membros ficam desativados até a conexão retornar.",
  "portal.members.history.title": "\nHistórico de acesso",
  "portal.members.history.invitedTitle": "\nConvite emitido",
  "portal.members.history.invitedDescription": "O acesso inicial foi preparado em {date}.",
  "portal.members.history.inviteAccessTitle": "\nEstado de acesso do convite",
  "portal.members.history.membershipAccessTitle": "\nEstado de acesso de membro",
  "portal.members.history.accessDescription": "\nPostura de acesso atual: {state}.",
  "portal.members.history.systemActor": "\nFluxo de trabalho do sistema",
  "portal.members.history.acceptedTitle": "\nConvite aceito",
  "portal.members.history.acceptedDescription":
    "\n{actor} aceitou o convite do portal e continuou no espaço de trabalho do parceiro.",
  "portal.members.history.activatedTitle": "\nAssociação ativada",
  "portal.members.history.activatedDescription":
    "\n{actor} ativou a associação ao espaço de trabalho para este contato do grupo.",
  "portal.members.history.roleUpdatedTitle": "\nFunção atualizada",
  "portal.members.history.roleUpdatedDescription":
    "\n{actor} alterou a função de {previousRole} para {nextRole}.",
  "portal.members.history.revokedTitle": "\nAcesso revogado",
  "portal.members.history.revokedDescription": "\n{actor} revogou este acesso do portal.",
  "portal.members.history.summaryTitle": "\nResumo de governança",
  "portal.members.history.summaryDescription":
    "\nMantenha visíveis a emissão de convites, mudanças de função, revogações e o último evento de governança enquanto gerencia o acesso.",
  "portal.members.history.trackedChangesLabel": "\nEntradas rastreadas",
  "portal.members.history.roleChangeCountLabel": "\nMudanças de função",
  "portal.members.history.revokeCountLabel": "\nRevogações",
  "portal.members.history.latestEventLabel": "\nÚltimo evento de governança",
  "portal.members.history.latestEventFallback": "\nAguardando a próxima atualização de governança",
  "portal.members.reissue": "\nReemitir convite",
  "portal.members.alert.inviteSuccess": "\nConvite preparado para {email} em {party}.",
  "portal.members.alert.reissueSuccess": "\nConvite reemitido para {email} em {party}.",
  "portal.members.alert.roleSuccess": "\nFunção atualizada para {email} em {party}.",
  "portal.members.alert.revokeSuccess": "\nAcesso revogado para {email} em {party}.",
  "portal.nav.collaboration": "\nColaboração",
  "portal.nav.documents": "\nDocumentos",
  "portal.nav.members": "\nMembros",
  "reports.activePackage.title": "\nPacote ativo",
  "reports.datasets.title": "\nConjuntos de dados",
  "reports.schedule.title": "\nEntrega agendada",
  "reports.schedule.description":
    "\nConfigure a entrega automática de relatórios por e-mail em uma programação recorrente.",
  "reports.schedule.frequency": "\nFrequência",
  "reports.schedule.daily": "\nDiariamente",
  "reports.schedule.weekly": "\nSemanal",
  "reports.schedule.monthly": "\nMensal",
  "reports.schedule.deliveryChannel": "\nCanal de entrega",
  "reports.schedule.email": "\nE-mail",
  "reports.schedule.webhook": "\nWebhook",
  "reports.schedule.recipientsLabel": "\nDestinatários",
  "reports.schedule.recipientsPlaceholder":
    "\nInsira os endereços de e-mail separados por vírgulas",
  "reports.schedule.timezoneLabel": "\nFuso horário",
  "reports.schedule.save": "\nSalvar agendamento",
  "reports.schedule.disable": "\nDesativar agendamento",
  "reports.schedule.nextDelivery": "\nPróxima entrega",
  "reports.schedule.lastDelivery": "\nÚltima entrega",
  "reports.schedule.active": "\nAtivo",
  "reports.schedule.inactive": "\nInativo",
  "reports.schedule.created": "\nAgenda criada com sucesso.",
  "reports.schedule.updated": "\nCronograma atualizado com sucesso.",
  "reports.schedule.empty": "\nNenhuma programação de entrega configurada.",
  "reports.schedule.emptyAction":
    "\nAdicione uma programação para entregar este relatório automaticamente.",
  "reports.sharing.title": "\nCompartilhamento e permissões",
  "reports.sharing.description": "\nControle quem pode visualizar ou editar este relatório.",
  "reports.sharing.addUser": "\nAdicionar usuário",
  "reports.sharing.addRole": "\nAdicionar função",
  "reports.sharing.permissionView": "\nVer",
  "reports.sharing.permissionEdit": "\nEditar",
  "reports.sharing.permissionAdmin": "\nAdministrador",
  "reports.sharing.remove": "\nRemover",
  "reports.sharing.userLabel": "\nUsuário",
  "reports.sharing.userPlaceholder": "\nSelecione um usuário",
  "reports.sharing.permissionLabel": "\nPermissão",
  "reports.sharing.save": "\nCompartilhar relatório",
  "reports.sharing.empty": "\nEste relatório não foi compartilhado com ninguém.",
  "reports.sharing.emptyAction": "\nCompartilhe este relatório com os membros da equipe.",
  "reports.sharing.shared": "\nRelatório compartilhado com sucesso.",
  "reports.sharing.removed": "\nAcesso removido com sucesso.",
  "reports.export.title": "\nExportar relatório",
  "reports.export.pdf": "\nExportar PDF",
  "reports.export.csv": "\nExportar CSV",
  "reports.export.excel": "\nExportar Excel",
  "reports.export.arrow": "\nExportar Arrow",
  "reports.export.parquet": "\nExportar Parquet",
  "reports.export.generating": "\nGerando exportação...",
  "reports.export.download": "\nBaixar",
  "reports.export.error": "\nFalha na exportação. Por favor, tente novamente.",
  "reports.dateRange.custom": "\nPeríodo personalizado",
  "reports.dateRange.from": "\nDe",
  "reports.dateRange.to": "\nPara",
  "reports.dateRange.apply": "\nAplicar intervalo",
  "reports.dateRange.clear": "\nLimpar intervalo",
  "reports.dateRange.hint":
    "\nSelecione as datas de início e término para filtrar os dados do relatório.",
  "reports.drilldown.clickToExpand": "\nClique para ver detalhes",
  "reports.drilldown.backToSummary": "\nVoltar ao resumo",
  "reports.drilldown.breadcrumbRoot": "\nResumo",
  "reports.drilldown.loadingDetail": "\nCarregando visualização detalhada...",
  "reports.drilldown.detailTitle": "\nVisualização detalhada",
  "reports.drilldown.detailBreakdown": "\nDetalhamento detalhado para {item}",
  "reports.drilldown.detailContent": "Detalhamento detalhado do item {item}.",
  "workOrderDetail.title": "\nDetalhe da ordem de serviço",
  "training.courses.title": "\nCursos de Treinamento",
  "training.courses.description":
    "\nGerenciar cursos de treinamento, módulos e inscrições de funcionários.",
  "training.courses.create": "\nCriar curso",
  "training.courses.editTitle": "\nEditar curso",
  "training.courses.moduleCount": "\n{count} módulos",
  "training.courses.enrolledCount": "\n{count} inscrito",
  "training.courses.completionRate": "\n{rate}% conclusão",
  "training.courses.durationLabel": "\nDuração",
  "training.courses.mandatoryLabel": "\nObrigatório",
  "training.courses.optionalLabel": "\nOpcional",
  "training.courses.empty": "\nNenhum curso de treinamento foi criado ainda.",
  "training.modules.title": "\nMódulos do Curso",
  "training.modules.add": "\nAdicionar módulo",
  "training.modules.contentType": "\nTipo de conteúdo",
  "training.modules.video": "\nVídeo",
  "training.modules.document": "\nDocumento",
  "training.modules.quiz": "\nQuestionário",
  "training.modules.sortOrder": "\nPedido",
  "training.modules.duration": "\nDuração (min)",
  "training.certification.title": "\nCertificações",
  "training.certification.description":
    "\nRastreie a validade e a expiração da certificação para conformidade.",
  "training.certification.expiresAt": "\nExpira",
  "training.certification.daysUntilExpiry": "\n{days} dias restantes",
  "training.certification.expired": "\nExpirado",
  "training.certification.expiringSoon": "\nExpira em breve",
  "training.certification.valid": "\nVálido",
  "training.certification.expiringAlert": "\n{count} certificações expirando em 30 dias",
  "training.certification.renewAction": "\nRenovar",
  "training.certification.downloadCertificate": "\nBaixar certificado",
  "training.certification.issuedBy": "\nEmitido por",
  "training.certification.issuedAt": "\nEmitido em",
  "training.certification.name": "\nNome do certificado",
  "training.certification.empty": "\nNenhuma certificação registrada.",
  "training.competencyMatrix.title": "\nMatriz de Competências",
  "training.competencyMatrix.description":
    "\nMapeie as competências necessárias em relação às qualificações reais dos funcionários.",
  "training.competencyMatrix.requiredLevel": "\nObrigatório",
  "training.competencyMatrix.currentLevel": "\nAtual",
  "training.competencyMatrix.gap": "\nLacuna",
  "training.competencyMatrix.noGap": "\nConheci",
  "training.competencyMatrix.employee": "\nFuncionário",
  "training.competencyMatrix.competency": "\nCompetência",
  "training.competencyMatrix.level": "\nNível",
  "training.competencyMatrix.empty": "\nNenhuma definição de competência configurada ainda.",
  "training.competencyMatrix.emptyEmployee":
    "\nNenhuma avaliação de competência de funcionários registrada.",
  "common.approvalSignoff": "\nAprovação e aprovação",
  "common.dispatchBoard": "\nQuadro de despacho",
  "common.serviceBoard": "\nPlaca de serviço",
  "common.ownerQueue": "\nFila do proprietário",
  "common.slaTimers": "\nTemporizadores de SLA",
  "common.macros": "\nMacros",
  "common.certificationWorkflow": "\nFluxo de trabalho de certificação",
  "common.escalationWorkflow": "\nFluxo de trabalho de escalonamento",
  "common.cohortCompare": "\nComparação de coorte",
  "common.pinboard": "\nEmitir quadro de avisos",
  "common.governanceControls": "\nControles de governança",
  "predictions.workspace.promote.eyebrow": "\nPromova para ação",
  "predictions.workspace.promote.title": "\nPromova o sinal para trabalho",
  "predictions.workspace.promote.description":
    "\nEnvie a previsão ao vivo para expedição, recuperação de serviço, planejamento ou pacote de relatórios sem sair do espaço de trabalho.",
  "predictions.workspace.promote.dispatchLabel": "\nAcompanhamento de despacho",
  "predictions.workspace.promote.dispatchDescription":
    "\nAbra a fila de tarefas com a postura de previsão ao vivo em mente.",
  "predictions.workspace.promote.serviceLabel": "\nPlaca de serviço aberta",
  "predictions.workspace.promote.serviceDescription":
    "\nMova o sinal ativo para coordenação de ordem de serviço e execução de campo.",
  "predictions.workspace.promote.planningLabel": "\nPromover para planejamento",
  "predictions.workspace.promote.planningDescription":
    "\nLeve o sinal de risco para o planejamento financeiro e a revisão de investimentos.",
  "predictions.workspace.promote.reportLabel": "\nCriar pacote de relatórios",
  "predictions.workspace.promote.reportDescription":
    "\nCapture as evidências atuais de IA em um fluxo de trabalho de relatório durável.",
  "predictions.workspace.ownerQueue.eyebrow": "\nFila do proprietário",
  "predictions.workspace.ownerQueue.title": "\nTransferência do proprietário atual",
  "predictions.workspace.ownerQueue.description":
    "\nMantenha o próximo operador, confiabilidade e proprietários de compras visíveis ao lado do quadro de risco classificado.",
  "predictions.workspace.ownerQueue.dispatchItem":
    "\nO proprietário do despacho confirma a próxima ação de campo e a janela de vencimento.",
  "predictions.workspace.ownerQueue.reliabilityItem":
    "\nO proprietário da confiabilidade valida a evidência de IA antes que o sinal se transforme em trabalho repetido.",
  "predictions.workspace.ownerQueue.procurementItem":
    "O proprietário da aquisição fica atento a peças, substituições ou pressão de descarte.",
  "finance.cockpit.savedSlices.title": "\nFatias financeiras salvas",
  "finance.cockpit.savedSlices.description":
    "\nMova-se entre as fatias financeiras que as operadoras reabrem com mais frequência durante a revisão e aprovação.",
  "finance.cockpit.savedSlices.portfolio": "\nRelógio de portfólio",
  "finance.cockpit.savedSlices.depreciation": "\nRelógio de depreciação",
  "finance.cockpit.savedSlices.controls": "\nRevisão de controle",
  "finance.cockpit.savedSlices.reviewWindow": "\nJanela de revisão",
  "finance.cockpit.savedSlices.ownerQueue": "\nFila do proprietário",
  "finance.cockpit.savedSlices.packReady": "\nPacote pronto",
  "finance.cockpit.signoff.title": "\nLoop de aprovação e distribuição",
  "finance.cockpit.signoff.description":
    "\nMantenha a linha de base do planejamento, o acompanhamento das aquisições e a distribuição do relatório visíveis em uma bandeja de aprovação.",
  "finance.cockpit.signoff.planTitle": "\nLinha de base do planejamento",
  "finance.cockpit.signoff.planDescription":
    "\nRevise a linha de base do planejamento financeiro ativo.",
  "finance.cockpit.signoff.planSupport":
    "\nLeve a postura atual de depreciação para a próxima rodada de aprovação.",
  "finance.cockpit.signoff.procurementTitle": "\nAcompanhamento de aquisições",
  "finance.cockpit.signoff.procurementDescription":
    "\nVerifique o caminho do pedido de compra antes de liberar os gastos.",
  "finance.cockpit.signoff.procurementSupport":
    "\nMantenha as ações de compra posteriores visíveis ao lado da fatia financeira atual.",
  "finance.cockpit.signoff.distributionTitle": "\nDistribuição de relatórios",
  "finance.cockpit.signoff.distributionDescription":
    "\nEmpurre a postura financeira atual para o próximo pacote de partes interessadas.",
  "finance.cockpit.signoff.distributionSupport":
    "\nEncaminhe o resumo aprovado para a cronologia e distribuição do relatório salvo.",
  "financePlanning.workflow.title": "\nCadência de aprovação",
  "financePlanning.workflow.description":
    "\nAcompanhe a linha de base atual, a pressão de aprovação e a prontidão de distribuição antes que os cenários se movam posteriormente.",
  "financePlanning.workflow.baseline":
    "\n{count} cenário(s) de linha de base permanecem no conjunto de revisão ativo.",
  "financePlanning.workflow.approvals":
    "\n{count} sinais de aprovação ou dependência ainda precisam de aprovação antes do lançamento.",
  "financePlanning.workflow.distribution":
    "\n{count} caminhos de distribuição conectados estão prontos para o próximo pacote certificado.",
  "utilisation.cockpit.savedViews.title": "\nVisualizações de utilização salvas",
  "utilisation.cockpit.savedViews.description":
    "\nAlternar entre as fatias de coorte salvas que os operadores usam para comparar a demanda equilibrada, pressionada e em recuperação.",
  "utilisation.cockpit.savedViews.cohort": "\nComparação de coorte",
  "utilisation.cockpit.savedViews.workflow": "\nTransferência de fluxo de trabalho",
  "utilisation.cockpit.cohortCompare.title": "\nComparação de coorte",
  "utilisation.cockpit.cohortCompare.description":
    "\nUse a fatia de data atual como linha de base para comparação de sites peer e ativos peer.",
  "utilisation.cockpit.cohortCompare.supporting":
    "\nLeve esta visão de coorte para o próximo relatório ou transferência de intervenção.",
  "apiExplorer.savedRequests.title": "\nSolicitações salvas",
  "apiExplorer.savedRequests.description":
    "\nMantenha as sondagens comuns de HTML, API e autenticação ao seu alcance para investigação repetida.",
  "apiExplorer.savedRequests.dashboard": "\nSonda HTML do painel",
  "apiExplorer.savedRequests.ucp": "\nSonda API UCP",
  "apiExplorer.savedRequests.auth": "\nSonda de caminho de autenticação",
  "apiExplorer.history.title": "\nHistórico de solicitações",
  "apiExplorer.history.description":
    "\nOs padrões de solicitação recentes permanecem visíveis para que os operadores possam repetir os filtros sem reconstruí-los.",
  "apiExplorer.history.active": "Superfície ativa: {surface}",
  "apiExplorer.history.html": "\nAs sondagens recentes de navegação HTML permanecem fixadas aqui.",
  "apiExplorer.history.api":
    "\nAs sondagens recentes da API permanecem fixadas aqui para reprodução.",
  "supportTickets.workspace.sla.title": "\nSLA e postura da fila",
  "supportTickets.workspace.sla.description":
    "\nMantenha a fila ativa e a postura do ticket selecionada visíveis durante a triagem do painel de detalhes.",
  "supportTickets.workspace.sla.openQueue":
    "\n{count} tickets abertos atualmente permanecem dentro da janela de SLA ativo.",
  "supportTickets.workspace.sla.activeQueue":
    "\n{count} tickets permanecem ativos na fila de suporte atual.",
  "supportTickets.workspace.sla.selectTicket":
    "\nSelecione um ticket para inspecionar a postura atual do SLA e a transferência do proprietário.",
  "supportTickets.workspace.sla.selectedTicket":
    "\nO ticket selecionado é {status} com prioridade {priority}.",
  "supportTickets.workspace.macros.title": "\nMacros de suporte",
  "supportTickets.workspace.macros.description":
    "\nUse macros de resposta repetíveis para manter a triagem, as solicitações de evidências e o encerramento consistentes.",
  "supportTickets.workspace.macros.requestEvidence":
    "\nMacro: solicitar evidência do cliente antes que o ticket saia da fila ativa.",
  "supportTickets.workspace.macros.escalate":
    "\nMacro: escalar o ticket para o próximo proprietário do serviço com o contexto atual intacto.",
  "supportTickets.workspace.macros.closeLoop":
    "\nMacro: feche o ciclo com uma atualização de status final e um resumo pronto para auditoria.",
  "training.workflow.certificationTitle": "\nCadência de certificação recorrente",
  "training.workflow.certificationDescription":
    "\nMantenha as revisões de preparação, as atualizações de controle e as evidências de certificação em movimento por meio de um fluxo de trabalho recorrente.",
  "training.workflow.certificationReadiness":
    "\n{count} os registros de capacidade de prontidão são atualmente fortes o suficiente para revisão de certificação.",
  "training.workflow.certificationReview":
    "\n{count} itens de revisão de controle ainda precisam de aprovação de certificação.",
  "training.workflow.certificationHistory":
    "\n{count} atualizações de controle recentes estão disponíveis como evidência de certificação recorrente.",
  "training.workflow.escalationTitle": "\nFluxo de trabalho de escalonamento",
  "training.workflow.escalationDescription":
    "\nRealize inspeções atrasadas, suporte aberto e filas de ação em uma via de escalonamento.",
  "training.workflow.escalationActions":
    "\n{count} itens de ação estão atualmente aguardando na fila de escalonamento.",
  "training.workflow.escalationInspections":
    "\n{count} inspeções atrasadas permanecem ativas na fatia de treinamento atual.",
  "training.workflow.escalationSupport":
    "\n{count} tickets de suporte abertos ainda precisam de acompanhamento de escalonamento.",
  "fleet.dispatch.title": "\nQuadro de despacho",
  "fleet.dispatch.description":
    "\nMova os problemas da frota para o quadro operacional correto antes que se transformem em perda de disponibilidade.",
  "fleet.dispatch.taskQueue": "\nFila de tarefas",
  "fleet.dispatch.taskQueueDescription":
    "\nRevise o backlog de despacho atual e designe a próxima equipe.",
  "fleet.dispatch.serviceBoard": "\nPlaca de serviço",
  "fleet.dispatch.serviceBoardDescription":
    "\nEncaminhe incidentes ativos e tempo de inatividade para recuperação de serviço.",
  "fleet.dispatch.reportPack": "\nPacote de relatórios",
  "fleet.dispatch.reportPackDescription":
    "Empacote a pressão atual da frota no próximo resumo de decisão.",
  "fleet.ownerQueue.title": "\nFila do proprietário da frota",
  "fleet.ownerQueue.description":
    "\nMantenha os proprietários de expedição, manutenção e substituição alinhados com a fatia atual da frota.",
  "fleet.ownerQueue.dispatch":
    "\n{count} registros de frota estão aguardando propriedade de despacho.",
  "fleet.ownerQueue.recovery":
    "\n{count} ordens de serviço ativas ainda estão em recuperação de serviço.",
  "fleet.ownerQueue.replacement":
    "\n{count} item(s) do plano de substituição permanecem na fila para revisão.",
  "fleet.serviceBoard.title": "\nPlaca de serviço",
  "fleet.serviceBoard.description":
    "\nResuma a pressão atual de manutenção e tempo de inatividade em uma via de serviço operacional.",
  "fleet.serviceBoard.accidents": "\n{count} registros de acidentes atualmente exigem revisão.",
  "fleet.serviceBoard.downtime":
    "\n{count} registros de tempo de inatividade permanecem ativos na faixa de serviço.",
  "fleet.serviceBoard.replacement":
    "\n{count} itens de planejamento de substituição ainda precisam de alinhamento de serviço de frota.",
  "buildings.heatmap.title": "\nMapa de calor do portfólio",
  "buildings.heatmap.description":
    "\nDestaque a pressão atual do edifício em termos de prontidão, cobertura do sensor, garantia e carga do programa.",
  "buildings.heatmap.readiness": "\nPressão de prontidão",
  "buildings.heatmap.readinessDescription":
    "\nAtivos e ordens de serviço atualmente moldando a prontidão do edifício.",
  "buildings.heatmap.coverage": "\nCobertura do sensor",
  "buildings.heatmap.coverageDescription":
    "\nCarga de revisão vinculada ao sensor no grupo de construção atual.",
  "buildings.heatmap.assurance": "\nRisco de garantia",
  "buildings.heatmap.assuranceDescription":
    "\nAções de garantia aberta ainda moldam a postura do portfólio.",
  "buildings.heatmap.programme": "\nCarregamento do programa",
  "buildings.heatmap.programmeDescription":
    "\nIniciativas que ainda afetam o atual grupo de construção.",
  "buildings.compare.title": "\nComparação de portfólio",
  "buildings.compare.description":
    "\nPasse do mapa de calor do edifício para o próximo relatório ou comparação de linha de base sem reconstruir o contexto.",
  "buildings.compare.reportPack": "\nAbra o pacote de relatórios",
  "buildings.compare.reportPackDescription":
    "\nInicie a fatia de construção atual na área de trabalho de relatórios.",
  "buildings.compare.portfolioBaseline": "\nComparação de linha de base aberta",
  "buildings.compare.portfolioBaselineDescription":
    "\nUse a postura de construção atual como a próxima linha de base do portfólio.",
  "buildings.compare.ownerQueueTitle": "\nFila do proprietário do edifício",
  "buildings.compare.ownerQueueDescription":
    "\nMostre quais proprietários de edifícios precisam responder em seguida em termos de planejamento, sensores e garantia.",
  "buildings.compare.ownerQueuePlanning":
    "\n{count} itens de planejamento ainda precisam de revisão do proprietário do edifício.",
  "buildings.compare.ownerQueueSensors":
    "\n{count} itens de revisão vinculados ao sensor permanecem ativos nesta coorte.",
  "buildings.compare.ownerQueueAssurance":
    "\n{count} ações de garantia ainda estão aguardando o acompanhamento do proprietário.",
  "sensors.calibration.title": "\nPista de calibração e simulação",
  "sensors.calibration.description":
    "Mova os problemas do sensor para calibração, revisão de regras ou escalonamento sem sair do cockpit.",
  "sensors.calibration.queueLabel": "\nFila de calibração",
  "sensors.calibration.queueDescription":
    "\nRevise a carga de trabalho de calibração atual para o conjunto de sensores ativos.",
  "sensors.calibration.rulesLabel": "\nSimulação de regras",
  "sensors.calibration.rulesDescription":
    "\nVerifique as alterações nas regras de alerta antes de serem promovidas para a faixa ativa.",
  "sensors.calibration.escalationLabel": "\nFaixa de escalada",
  "sensors.calibration.escalationDescription":
    "\nLeve os problemas do sensor de pressão mais alta para a próxima transferência do proprietário.",
  "sensors.ownerQueue.title": "\nFila de proprietário do sensor",
  "sensors.ownerQueue.description":
    "\nMantenha os proprietários de calibração, SLA e garantia alinhados com o conjunto de exceções atual.",
  "sensors.ownerQueue.calibration":
    "\n{count} regra de alerta ou item(s) de calibração permanecem na fila ativa.",
  "sensors.ownerQueue.slaLane":
    "\n{count} itens de trabalho acionados por sensor violados estão moldando a faixa de SLA.",
  "sensors.ownerQueue.assurance":
    "\n{count} ações de garantia ainda precisam de um proprietário nomeado.",
  "digitalTwin.pinboard.title": "\nEmitir quadro de avisos",
  "digitalTwin.pinboard.description":
    "\nFixe os principais pontos de acesso, problemas de cobertura e verificações de saída ao lado da cena ao vivo.",
  "digitalTwin.pinboard.hotspotItem":
    "\nO pino do ponto de acesso permanece ativo e precisa da confirmação do operador na visualização dupla atual.",
  "digitalTwin.pinboard.coverageItem":
    "\nO pino de lacuna de cobertura permanece aberto para a telemetria atual e o corte da câmera.",
  "digitalTwin.pinboard.egressItem":
    "\nO pino de saída e fluxo está pronto para o próximo passo a passo da cena.",
  "digitalTwin.actions.title": "\nTrilho de ação",
  "digitalTwin.actions.description":
    "\nMova o problema do gêmeo ativo para trabalho, suporte ou captura de evidências sem sair do visualizador.",
  "digitalTwin.actions.dispatchLabel": "\nAcompanhamento de despacho",
  "digitalTwin.actions.dispatchDescription":
    "\nAbra a fila operacional para o problema gêmeo ativo.",
  "digitalTwin.actions.supportLabel": "\nAbrir pista de suporte",
  "digitalTwin.actions.supportDescription":
    "\nEscale o problema duplo para o espaço de trabalho de suporte com o contexto atual.",
  "digitalTwin.actions.evidenceLabel": "\nCapturar evidências",
  "digitalTwin.actions.evidenceDescription":
    "\nAbra o feed de evidências do ponto de acesso para a cena gêmea ativa.",
  "reports.workspace.distributionTitle": "\nControles de distribuição",
  "reports.workspace.distributionDescription":
    "\nMantenha as aprovações, assinaturas e comparações de versões visíveis enquanto percorre o espaço de trabalho do relatório.",
  "reports.workspace.distributionApprovals": "\nPostura de aprovação",
  "reports.workspace.distributionApprovalsValue":
    "\n{count} pacote(s) salvo(s) permanecem disponíveis para aprovação ou reutilização.",
  "reports.workspace.distributionSubscriptions": "\nPostura de assinatura",
  "reports.workspace.distributionSubscriptionsValue":
    "\n{count} rota(s) modelo permanecem disponíveis para distribuição repetida.",
  "reports.workspace.distributionCompare": "\nComparação de versões",
  "reports.workspace.distributionCompareHistory":
    "\nA visualização do histórico está pronta para cronologia e comparação de pacotes salvos.",
  "reports.workspace.distributionCompareReview":
    "\nRevise o pacote ativo antes de promover a próxima versão distribuída.",
  "mlops.governance.title": "\nGovernança MLOps",
  "mlops.governance.description":
    "Rastreie as portas de promoção, a pressão de risco e o impacto da automação ao lado do espaço de trabalho MLOps ao vivo.",
  "mlops.governance.riskRegister":
    "\n{count} item(s) de execução com falha ou conjunto de dados off-line atualmente pertencem ao registro de risco.",
  "mlops.governance.promotionGate":
    "\n{count} portas de promoção de implantação estão ativas no momento.",
  "tasks.dependency.title": "\nDependências",
  "tasks.dependency.description": "\nGerenciar bloqueadores de tarefas e tarefas relacionadas.",
  "tasks.dependency.blockedBy": "\nBloqueado por",
  "tasks.dependency.blocking": "\nBloqueio",
  "tasks.dependency.add": "\nAdicionar dependência",
  "tasks.dependency.remove": "\nRemover dependência",
  "tasks.dependency.circularError": "\nNão é possível criar dependência circular.",
  "tasks.dependency.type.blocks": "\nBlocos",
  "tasks.dependency.type.related": "\nRelacionado",
  "tasks.dependency.empty": "\nNenhuma dependência configurada.",
  "tasks.dependency.blockedBadge": "\nBloqueado",
  "tasks.dependency.selectTask": "\nSelecione uma tarefa",
  "tasks.dependency.selectTaskHint": "\nPesquise por rótulo de tarefa ou ID.",
  "tasks.comments.title": "\nAtividade e comentários",
  "tasks.comments.description": "\nTópico de discussão e registro de atividades para esta tarefa.",
  "tasks.comments.placeholder": "\nAdicione um comentário...",
  "tasks.comments.submit": "\nPostar comentário",
  "tasks.comments.empty": "\nNenhum comentário ainda. Inicie a conversa.",
  "tasks.comments.postedBy": "\nEnviado por {author}",
  "tasks.timeTracking.title": "\nControle de tempo",
  "tasks.timeTracking.description": "\nRegistre o tempo gasto nesta tarefa.",
  "tasks.timeTracking.logTime": "\nHora de registro",
  "tasks.timeTracking.minutes": "\nMinutos",
  "tasks.timeTracking.minutesHint": "\nDuração em minutos.",
  "tasks.timeTracking.descriptionLabel": "\nDescrição",
  "tasks.timeTracking.descriptionHint": "\nBreve nota sobre o trabalho realizado.",
  "tasks.timeTracking.date": "\nData",
  "tasks.timeTracking.dateHint": "\nData em que o trabalho foi executado.",
  "tasks.timeTracking.totalLogged": "\nTotal registrado",
  "tasks.timeTracking.totalLoggedDesc": "\nSoma de todas as entradas de tempo para esta tarefa.",
  "tasks.timeTracking.entries": "\nEntradas de tempo",
  "tasks.timeTracking.empty": "\nNenhum tempo foi registrado ainda.",
  "tasks.timeTracking.durationHoursMinutes": "\n{hours}h {minutes}m",
  "tasks.timeTracking.durationMinutesOnly": "\n{minutes}m",
  "tasks.timeTracking.submitAria": "\nEnviar entrada de horário",
  "workOrders.templates.title": "\nModelos de ordem de serviço",
  "workOrders.templates.description":
    "\nModelos reutilizáveis para tipos de ordens de serviço recorrentes.",
  "workOrders.templates.create": "\nCriar modelo",
  "workOrders.templates.useTemplate": "\nUsar modelo",
  "workOrders.templates.defaultLines": "\nItens de linha padrão",
  "workOrders.templates.defaultSla": "\nSLA padrão (horas)",
  "workOrders.templates.empty":
    "\nNenhum modelo disponível. Crie um para acelerar a criação de ordens de serviço.",
  "workOrders.templates.titleLabel": "\nNome do modelo",
  "workOrders.templates.titleHint": "\nUm nome descritivo curto para o modelo.",
  "workOrders.templates.descriptionLabel": "\nDescrição",
  "workOrders.templates.descriptionHint": "\nDescrição opcional de quando usar este modelo.",
  "workOrders.templates.scopeLabel": "\nEscopo",
  "workOrders.templates.scopeHint": "\nEscopo de trabalho padrão para pedidos deste modelo.",
  "workOrders.templates.selectTemplate": "\nSelecione um modelo",
  "workOrders.templates.selectTemplateHint":
    "\nEscolha um modelo para preencher previamente os campos da ordem de serviço.",
  "workOrders.templates.submitAria": "\nSalvar modelo de ordem de serviço",
  "addDevice.review.title": "\nRevise antes de enviar",
  "addDevice.review.description":
    "\nConfirme a configuração, a postura de importação e os detalhes finais do registro antes de criar o dispositivo.",
  "addDevice.review.items.setup":
    "\nVerifique a configuração do dispositivo e o contexto do site de implantação.",
  "addDevice.review.items.import": "\nConfirme os campos importados e quaisquer padrões gerados.",
  "addDevice.review.items.confirm": "\nAprovar a carga final de registro para envio.",
  "addDevice.review.pending": "\nRevisão pendente",
  "addDevice.presets.title": "\nBiblioteca predefinida",
  "addDevice.presets.description":
    "\nUse modelos iniciais para padrões de implementação comuns antes de criar ou importar dispositivos.",
  "addDevice.presets.apply": "\nAplicar predefinição",
  "addDevice.presets.template": "\nModelo",
  "addDevice.presets.baseline.title": "\nImplementação do dispositivo de linha de base",
  "addDevice.presets.baseline.description":
    "Comece a partir do padrão de registro operacional padrão com campos padrão de ativos e telemetria.",
  "addDevice.presets.fieldKit.title": "\nImplantação do kit de campo",
  "addDevice.presets.fieldKit.description":
    "\nUse uma configuração pronta para uso em campo para dispositivos portáteis que precisam de atribuição rápida de local e revisão de importação.",
  "addDevice.presets.capital.title": "\nEntrada de ativos de capital",
  "addDevice.presets.capital.description":
    "\nPreparar padrões voltados para finanças para dispositivos de maior valor que precisam de ciclo de vida e rastreamento de valor mais rígidos.",
  "addDevice.workflow.stepSetup": "\nConfiguração",
  "addDevice.workflow.stepImport": "\nImportar",
  "addDevice.workflow.stepReview": "\nRevisão",
  "deviceHistory.review.title": "\nRever postura",
  "deviceHistory.review.description":
    "\nCompare o histórico recente, o contexto da anomalia e a postura de exportação antes de escalar a trilha do evento.",
  "deviceHistory.review.diffTitle": "\nRevisão de alteração",
  "deviceHistory.review.diffDescription":
    "\nAcompanhe a configuração mais recente ou o delta do ciclo de vida antes de aceitar a atualização.",
  "deviceHistory.review.diffValue": "\nÚltima diferença no escopo",
  "deviceHistory.review.anomalyTitle": "\nRelógio de anomalia",
  "deviceHistory.review.anomalyDescription":
    "\nMantenha o ciclo de vida incomum ou os padrões de manutenção visíveis para um acompanhamento rápido.",
  "deviceHistory.review.anomalyValue": "\nRevisão de anomalia pronta",
  "deviceHistory.review.exportTitle": "\nExportação de evidências",
  "deviceHistory.review.exportDescription":
    "\nEmpacote o histórico filtrado e revise a postura em um relatório ou transferência CSV.",
  "deviceHistory.review.openReports": "\nAbrir relatórios",
  "deviceHistory.review.raiseFollowUp": "\nAumente o acompanhamento",
  "documentDetail.section.activityTitle": "\nAtividade relacionada",
  "documentDetail.section.activityDescription":
    "\nMantenha visíveis o movimento mais recente, os registros vinculados e o contexto operacional downstream.",
  "documentDetail.section.nextDecisionTitle": "\nPróxima decisão",
  "documentDetail.section.nextDecisionDescription":
    "\nDescubra o próximo movimento comercial ou operacional antes de alterar o estado do fluxo de trabalho.",
  "documentDetail.section.signoffTitle": "\nAprovação e aprovação",
  "documentDetail.section.signoffDescription":
    "\nMantenha as aprovações, a postura de aprovação e as evidências de apoio visíveis em um único trilho.",
  "documentWorkspace.role.procurement": "\nAquisições",
  "documentWorkspace.section.discrepancyTitle": "\nResolução de discrepância",
  "documentWorkspace.section.discrepancyDescription":
    "\nRastreie a variação, as exceções e as atividades de acompanhamento antes que o registro seja fechado.",
  "documentWorkspace.section.nextDecisionTitle": "\nPróxima decisão",
  "documentWorkspace.section.nextDecisionDescription":
    "\nMantenha a próxima aprovação, movimento comercial ou transferência do operador visível na área de trabalho.",
  "documentWorkspace.section.receiptTitle": "\nRecebimento e entrada",
  "documentWorkspace.section.receiptDescription":
    "\nObserve as evidências recebidas, a confirmação de admissão e quaisquer lacunas restantes no recebimento.",
  "documentWorkspace.section.slaTitle": "\nRelógio SLA",
  "documentWorkspace.section.slaDescription":
    "\nMonitore janelas de serviço, temporizadores e qualquer pressão de violação pendente do mesmo trilho.",
  "layout.analysisCanvas.leftRail": "\nFiltros",
  "layout.analysisCanvas.stage": "\nConteúdo principal",
  "layout.analysisCanvas.rightRail": "\nDetalhes",
  "common.view": "\nVer",
  "training.view.library": "\nBiblioteca",
  "training.view.enrollments": "\nInscrições",
  "training.library.title": "\nBiblioteca de cursos",
  "training.library.description": "\nGerencie os cursos de formação disponíveis e os módulos.",
  "training.library.titleColumn": "\nTítulo",
  "training.library.durationColumn": "\nDuração",
  "training.library.modulesColumn": "\nMódulos",
  "training.library.enrollmentsColumn": "\nInscrições",
  "training.library.empty": "\nNenhum curso disponível.",
  "training.library.mandatory": "\nObrigatório",
  "training.library.optional": "\nOpcional",
  "training.enrollment.description":
    "\nAcompanhe o progresso em todos os cursos obrigatórios e opcionais.",
  "training.enrollment.learnerColumn": "\nAprendiz",
  "training.enrollment.courseColumn": "\nCurso",
  "training.enrollment.completed": "\nConcluído",
  "training.enrollment.notStarted": "\nNão iniciado",
  "training.enrollment.title": "\nAcompanhamento de inscrições",
  "training.enrollment.empty": "\nNenhuma inscrição encontrada.",

  /* ── API error messages ──────────────────────────────────── */
  "errors.unauthorized": "Não autorizado",
  "errors.cartNotFound": "Carrinho não encontrado",
  "errors.articleNotFound": "Artigo não encontrado",
  "errors.resellerProfileNotFound": "Perfil de revendedor não encontrado",
  "errors.tenantNotFound": "Inquilino não encontrado",
  "errors.deploymentNotFound": "Implantação não encontrada",
  "errors.schemaMigrationGovernance":
    "O pré-requisito de governança de migração de esquema não foi cumprido.",
  "errors.deploymentMigrationGate":
    "Implantação rejeitada: cada migração de esquema listada deve estar concluída com um aprovador.",
  "errors.configVersionNotFound": "Versão de configuração não encontrada.",
  "errors.promotedDirectly": "Promovido diretamente (sem gates configurados).",
  "errors.noActiveConfigVersion": "Nenhuma versão de configuração ativa para reverter.",
  "errors.targetVersionAlreadyActive": "A versão de destino já está ativa.",
  "errors.approvalNotFound": "Aprovação não encontrada ou não pendente.",
  "errors.noActiveCatalogItem": "O produto não tem um item de catálogo ativo para esta parte.",
  "errors.noResultsFound": "Nenhum resultado encontrado",
  "errors.dsarNotFound": "Pedido do titular dos dados não encontrado.",
  "errors.dsarExportInvalidStatus":
    "A exportação só pode ser preparada para pedidos em rascunho ou submetidos.",
  "errors.dsarPurgeInvalidStatus":
    "A eliminação só pode ser executada após aprovação do pedido para eliminação.",

  /* ── Success messages ────────────────────────────────────── */
  "success.promotionApproved": "Promoção aprovada.",
  "success.configVersionActivated": "Versão de configuração ativada.",
  "success.shipmentCreated": "Remessa criada.",

  /* ── Labels ──────────────────────────────────────────────── */
  "labels.savings.automation": "Automação",
  "labels.savings.inventory": "Inventário",

  // Commerce – cart
  "cart.browseProducts": "Explorar produtos",
  "cart.category": "Categoria",
  "cart.clearCart": "Esvaziar carrinho",
  "cart.empty": "O carrinho está vazio",
  "cart.emptyDescription":
    "O seu carrinho de compras está vazio. Explore o nosso catálogo para adicionar itens.",
  "cart.emptyTitle": "Nenhum item no carrinho",
  "cart.items": "itens",
  "cart.itemCount": "{count} item(ns)",
  "cart.loadError": "Não foi possível carregar o carrinho. Tente novamente.",
  "cart.loading": "A carregar carrinho",
  "cart.poNumber": "N.º da ordem de compra",
  "cart.poNumberPlaceholder": "Insira o número da ordem de compra",
  "cart.proceedToCheckout": "Prosseguir para o checkout",
  "cart.product": "Produto",
  "cart.quantity": "Quantidade",
  "cart.removeItem": "Remover {name}",
  "cart.saveCart": "Guardar carrinho",
  "cart.summary": "Resumo do pedido",
  "cart.title": "Carrinho",
  "cart.total": "Total",
  "cart.unitPrice": "Preço unitário",
  "cart.updateQuantity": "Atualizar quantidade de {name}",
  "cart.lineItemsTableAria": "Itens do carrinho",

  // Commerce – checkout
  "checkout.backToCart": "Voltar ao carrinho",
  "checkout.billingInformation": "Informações de faturação",
  "checkout.items": "Itens do pedido",
  "checkout.noShippingAddresses": "Nenhum endereço de envio disponível.",
  "checkout.notes": "Notas do pedido",
  "checkout.notesPlaceholder": "Adicione instruções especiais ou notas",
  "checkout.orderSummary": "Resumo do pedido",
  "checkout.placeOrder": "Finalizar pedido",
  "checkout.poNumber": "N.º da ordem de compra",
  "checkout.poNumberPlaceholder": "Insira o número da ordem de compra",
  "checkout.paymentMethod": "Método de pagamento",
  "checkout.shippingAddress": "Endereço de envio",
  "checkout.step.billing": "Faturação",
  "checkout.step.cart": "Carrinho",
  "checkout.step.confirm": "Confirmar",
  "checkout.step.review": "Rever",
  "checkout.step.shipping": "Envio",
  "checkout.subtitle": "Revise o seu pedido e complete a sua compra.",
  "checkout.title": "Checkout",
  "checkout.total": "Total",

  // Commerce – approvals and inventory
  "commerce.approvals.title": "Aprovações",
  "commerce.approvals.subtitle": "Revise decisões pendentes e audite aprovações concluídas.",
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
  "commerce.buyingLists.shared": "Partilhada",
  "commerce.buyingLists.itemCount": "{count} itens",
  "commerce.buyingLists.emptyTitle": "Ainda não há listas de compra",
  "commerce.buyingLists.emptyDescription":
    "Crie uma lista de compra para agrupar linhas do catálogo antes do checkout.",
  "commerce.buyingLists.subtitle":
    "Agrupe linhas do catálogo e envie-as para o carrinho quando estiver pronto.",
  "commerce.buyingLists.createNew": "Criar lista de compra",
  "commerce.buyingLists.detail.eyebrow": "Lista de compra",
  "commerce.buyingLists.detail.shellTitle": "Lista de compra",
  "commerce.buyingLists.detail.notFoundTitle": "Lista de compra não encontrada",
  "commerce.buyingLists.detail.notFoundDescription": "Essa lista não existe ou não tem acesso.",
  "commerce.buyingLists.detail.tableCaption": "Linhas da lista de compra",
  "commerce.buyingLists.detail.col.product": "Produto",
  "commerce.buyingLists.detail.col.sku": "SKU",
  "commerce.buyingLists.detail.col.quantity": "Qtd.",
  "commerce.buyingLists.detail.col.unitPrice": "Preço unitário",
  "commerce.buyingLists.detail.col.lineTotal": "Total da linha",
  "commerce.buyingLists.detail.convertToCart": "Enviar lista para o carrinho",
  "commerce.buyingLists.detail.emptyRows":
    "Esta lista ainda não tem linhas. Adicione produtos do catálogo.",
  "commerce.cart.title": "Carrinho",
  "commerce.checkout.title": "Checkout",
  "commerce.inventory.title": "Inventário",
  "commerce.inventory.subtitle":
    "Acompanhe níveis de stock, alertas de stock baixo e ações de reposição.",

  "commerce.workspace.operationsLead":
    "Ferramentas de compras e catálogo no seu espaço de trabalho.",
  "commerce.workspace.cartLead":
    "Revise linhas do carrinho, quantidades e totais antes do checkout.",
  "commerce.workspace.buyingListDetailLead":
    "Revise linhas preparadas e envie a lista para o carrinho quando estiver pronto.",
  "commerce.workspace.productDetailLead":
    "Especificações, preços e disponibilidade para este item do catálogo.",

  // Commerce – compliance
  "commerce.compliance.contract": "Contrato",
  "commerce.compliance.contractTooltip": "Comprado a preços contratuais",
  "commerce.compliance.offContract": "Fora do contrato",
  "commerce.compliance.offContractWithCatalog": "Fora do contrato ({catalogType})",

  // Commerce – fulfilment
  "commerce.fulfilment.blindFulfilment": "Cumprimento cego",
  "commerce.fulfilment.blindFulfilmentDescription":
    "Ocultar detalhes do fornecedor em guias de remessa e documentos de entrega.",
  "commerce.fulfilment.configDescription":
    "Configure o cumprimento cego e as regras de embalagem para este parceiro.",
  "commerce.fulfilment.configTitle": "Configuração de cumprimento",
  "commerce.fulfilment.packagingRules": "Regras de embalagem",
  "commerce.fulfilment.saveConfig": "Guardar configuração",
  "commerce.fulfilment.toggleBlind": "Alternar cumprimento cego",

  // Commerce – orders (customer order history list)
  "commerce.orders.date": "Data",
  "commerce.orders.emptyDescription":
    "Quando fizer encomendas, elas aparecem aqui com estado e totais.",
  "commerce.orders.emptyTitle": "Ainda sem encomendas",
  "commerce.orders.filterBarDescription":
    "Os resultados atualizam-se após uma breve pausa ao escrever. Use «Limpar todos os filtros» para repor a lista.",
  "commerce.orders.filterBarEyebrow": "Filtros",
  "commerce.orders.filterBarTitle": "Pesquisar encomendas",
  "commerce.orders.filteredEmptyDescription":
    "Experimente outras palavras-chave ou limpe os filtros para ver todas as encomendas.",
  "commerce.orders.filteredEmptyTitle": "Nenhum resultado corresponde aos seus filtros",
  "commerce.orders.items": "Itens",
  "commerce.orders.orderNumber": "Encomenda",
  "commerce.orders.reorder": "Voltar a encomendar",
  "commerce.orders.resultCount": "{count} encomendas",
  "commerce.orders.search": "Pesquisar",
  "commerce.orders.searchLabel": "Pesquisar encomendas",
  "commerce.orders.searchPlaceholder": "Pesquisar por número de encomenda…",
  "commerce.orders.status": "Estado",
  "commerce.orders.subtitle":
    "Reveja compras anteriores, totais e volte a encomendar num só lugar.",
  "commerce.orders.tableLabel": "Histórico de encomendas",
  "commerce.orders.title": "Histórico de encomendas",
  "commerce.orders.total": "Total",
  "commerce.orders.view": "Ver encomenda",

  // Commerce – knowledge base
  "commerce.knowledgeBase.categoryLegend": "Categorias",
  "commerce.knowledgeBase.emptyDescription":
    "Explore guias e respostas escritas para parceiros e operações.",
  "commerce.knowledgeBase.emptyTitle": "Ainda sem artigos",
  "commerce.knowledgeBase.filterBarDescription":
    "Os resultados atualizam-se após uma breve pausa ao escrever. As categorias mantêm-se até escolher «Todos» ou «Limpar todos os filtros».",
  "commerce.knowledgeBase.filterBarEyebrow": "Filtros",
  "commerce.knowledgeBase.filterBarTitle": "Pesquisar artigos",
  "commerce.knowledgeBase.filteredEmptyDescription":
    "Experimente outras palavras-chave, outra categoria ou limpe todos os filtros.",
  "commerce.knowledgeBase.filteredEmptyTitle": "Nenhum resultado corresponde aos seus filtros",
  "commerce.knowledgeBase.loadingArticles": "A carregar artigos",
  "commerce.knowledgeBase.resultCount": "{count} artigos",
  "commerce.knowledgeBase.search": "Pesquisar",
  "commerce.knowledgeBase.searchLabel": "Pesquisar artigos",
  "commerce.knowledgeBase.searchPlaceholder": "Pesquisar títulos e etiquetas…",
  "commerce.knowledgeBase.subtitle":
    "Encontre orientações de produto, políticas e artigos práticos.",
  "commerce.knowledgeBase.title": "Base de conhecimento",
  "commerce.knowledgeBase.views": "visualizações",

  // Commerce – products
  "commerce.products.addToCart": "Adicionar ao carrinho",
  "commerce.products.allProducts": "Todos os produtos",
  "commerce.products.availability": "Disponibilidade",
  "commerce.products.categories": "Categorias",
  "commerce.products.categoryNav": "Navegação por categoria de produto",
  "commerce.products.customerPartNumber": "N.º de peça do cliente",
  "commerce.products.days": "dias",
  "commerce.products.description": "Descrição",
  "commerce.products.emptyDescription":
    "Tente ajustar a sua pesquisa ou filtros para encontrar o que procura.",
  "commerce.products.emptyTitle": "Nenhum produto encontrado",
  "commerce.products.imageGallery": "Galeria de imagens do produto",
  "commerce.products.inStock": "em stock",
  "commerce.products.leadTime": "Prazo de entrega",
  "commerce.products.loadingProducts": "A carregar produtos",
  "commerce.products.minOrderQty": "Quantidade mínima de encomenda",
  "commerce.products.noSearchResults": 'Nenhum resultado encontrado para "{query}".',
  "commerce.products.noStockInfo":
    "As informações de stock não estão disponíveis para este produto.",
  "commerce.products.notFound": "Produto não encontrado",
  "commerce.products.notFoundDescription": "O produto que procura não existe ou foi removido.",
  "commerce.products.pricing": "Preços",
  "commerce.products.quantity": "Quantidade",
  "commerce.products.relatedProducts": "Produtos relacionados",
  "commerce.products.search": "Pesquisar",
  "commerce.products.searchLabel": "Pesquisar produtos",
  "commerce.products.searchPlaceholder": "Pesquisar produtos...",
  "commerce.products.searchResults": "Resultados da pesquisa",
  "commerce.products.specifications": "Especificações",
  "commerce.products.subtitle": "Explore o nosso catálogo de produtos.",
  "commerce.products.filterBarEyebrow": "Filtros",
  "commerce.products.filterBarTitle": "Pesquisar no catálogo",
  "commerce.products.filterBarDescription":
    "\nOs resultados atualizam-se após uma breve pausa ao escrever. A categoria mantém-se até escolher Todos os produtos ou Limpar todos os filtros.",
  "commerce.products.title": "Produtos",
  "commerce.products.unitOfMeasure": "Unidade de medida",
  "commerce.products.viewAllResults": "Ver todos os {count} resultados",
  "commerce.products.viewDetails": "Ver detalhes",

  // Commerce – reseller
  "commerce.reseller.blindFulfillment": "Cumprimento cego",
  "commerce.reseller.contactSupport": "Contactar suporte",
  "commerce.reseller.refreshOrders": "Atualizar histórico de pedidos",
  "commerce.reseller.refreshInvoices": "Atualizar faturas",
  "commerce.reseller.dashboardDescription":
    "Gira o seu perfil de revendedor e acompanhe o desempenho.",
  "commerce.reseller.dashboardTitle": "Painel do revendedor",
  "commerce.reseller.date": "Data",
  "commerce.reseller.discount": "Desconto",
  "commerce.reseller.discountRate": "Taxa de desconto",
  "commerce.reseller.freightEligible": "Elegível para frete",
  "commerce.reseller.invoiceNumber": "Fatura n.º",
  "commerce.reseller.invoices": "Faturas",
  "commerce.reseller.invoicesEmptyDescription":
    "As faturas aparecem aqui quando receber documentos faturáveis.",
  "commerce.reseller.invoicesEmptyTitle": "Ainda sem faturas",
  "commerce.reseller.invoicesTableAria": "Faturas do revendedor",
  "commerce.reseller.onboarded": "Integrado",
  "commerce.reseller.orderHistory": "Histórico de encomendas",
  "commerce.reseller.orderNumber": "Encomenda n.º",
  "commerce.reseller.ordersEmptyDescription":
    "As encomendas aparecem aqui depois de as efetuar no portal.",
  "commerce.reseller.ordersEmptyTitle": "Ainda sem encomendas",
  "commerce.reseller.ordersTableAria": "Histórico de encomendas do revendedor",
  "commerce.reseller.profileInfo": "Informações do perfil",
  "commerce.reseller.status": "Estado",
  "commerce.reseller.tier": "Nível",
  "commerce.reseller.total": "Total",
  "commerce.reseller.partyName": "Parceiro",
  "commerce.reseller.blind": "Cumprimento cego",
  "commerce.reseller.freight": "Frete",
  "commerce.reseller.volumeThreshold": "Limiar de volume",
  "commerce.reseller.actions": "Ações",
  "commerce.reseller.adminTitle": "Administração de revendedores",
  "commerce.reseller.adminDescription":
    "Revise níveis de parceiros, opções de cumprimento e estado de integração.",
  "commerce.reseller.createProfile": "Criar perfil de revendedor",
  "commerce.reseller.totalResellers": "Revendedores no total",
  "commerce.reseller.activeResellers": "Revendedores ativos",
  "commerce.reseller.noResellers": "Nenhum perfil de revendedor corresponde ao filtro atual.",
  "commerce.reseller.profilesTableAria": "Perfis de revendedor",

  // Commerce – spending limits
  "commerce.spending.active": "Ativo",
  "commerce.spending.addLimit": "Adicionar limite de gastos",
  "commerce.spending.annually": "Anualmente",
  "commerce.spending.currency": "Moeda",
  "commerce.spending.delete": "Eliminar",
  "commerce.spending.edit": "Editar",
  "commerce.spending.emptyDescription":
    "Configure limites de gastos para controlar orçamentos de compra por função.",
  "commerce.spending.emptyTitle": "Nenhum limite de gastos configurado",
  "commerce.spending.inactive": "Inativo",
  "commerce.spending.limit": "Limite",
  "commerce.spending.limitAmount": "Montante do limite",
  "commerce.spending.monthly": "Mensal",
  "commerce.spending.period": "Período",
  "commerce.spending.quarterly": "Trimestral",
  "commerce.spending.role": "Função",
  "commerce.spending.saveLimit": "Guardar limite",
  "commerce.spending.selectRole": "Selecionar uma função",
  "commerce.spending.status": "Estado",
  "commerce.spending.subtitle":
    "Gira limites de gastos e orçamentos para funções de aprovisionamento.",
  "commerce.spending.limitsTableAria": "Limites de gastos",
  "commerce.spending.title": "Limites de gastos",
  "commerce.spending.user": "Utilizador",

  // Commerce – three-way match
  "commerce.threeWayMatch.discrepanciesFound": "Discrepâncias encontradas",
  "commerce.threeWayMatch.discrepancy": "Discrepância",
  "commerce.threeWayMatch.discrepancyCount": "{count} discrepância(s)",
  "commerce.threeWayMatch.invoiceTotal": "Total da fatura",
  "commerce.threeWayMatch.invoiceUnitPrice": "Preço unitário da fatura",
  "commerce.threeWayMatch.invoicedQty": "Qtd. faturada",
  "commerce.threeWayMatch.matched": "Correspondente",
  "commerce.threeWayMatch.ok": "OK",
  "commerce.threeWayMatch.poQty": "Qtd. OC",
  "commerce.threeWayMatch.poTotal": "Total OC",
  "commerce.threeWayMatch.poUnitPrice": "Preço unitário OC",
  "commerce.threeWayMatch.product": "Produto",
  "commerce.threeWayMatch.shipmentTotal": "Total da remessa",
  "commerce.threeWayMatch.shippedQty": "Qtd. enviada",
  "commerce.threeWayMatch.subtitle": "Reconciliação tripla para a OC {poNumber}.",
  "commerce.threeWayMatch.title": "Reconciliação tripla",
  "commerce.threeWayMatch.viewPO": "Ver OC",

  // Commerce – usage reports
  "commerce.usageReports.dateFrom": "Data de",
  "commerce.usageReports.dateTo": "Data até",
  "commerce.usageReports.emptyDescription":
    "Execute um relatório para ver os dados de utilização de compras.",
  "commerce.usageReports.export": "Exportar",
  "commerce.usageReports.filterLabel": "Filtros do relatório de utilização",
  "commerce.usageReports.grandTotal": "Total geral",
  "commerce.usageReports.groupBy": "Agrupar por",
  "commerce.usageReports.groupLabel": "Grupo",
  "commerce.usageReports.orderCount": "Encomendas",
  "commerce.usageReports.runReport": "Executar relatório",
  "commerce.usageReports.subtitle": "Analise padrões de compra e gastos por categoria.",
  "commerce.usageReports.title": "Relatórios de utilização",
  "commerce.usageReports.totalQuantity": "Qtd. total",
  "commerce.usageReports.totalSpend": "Gasto total",

  // Common – additional keys
  "common.breadcrumb": "Migalhas de pão",

  /* ── Commerce ────────────────────────────────────────────── */
  "commerce.quickOrder.exampleSkus": "SKU-001 x 10\nSKU-002 x 5\nSKU-003 x 25",

  "commerce.customerOrders.title": "Pedidos do cliente",
  "commerce.customerOrders.subtitle": "Veja pedidos abertos, valores e estado de cumprimento.",
  "commerce.customerOrders.action.browseCatalog": "Explorar catálogo",
  "commerce.customerOrders.action.viewOrder": "Ver pedido",
  "commerce.customerOrders.search": "Pesquisar pedidos",
  "commerce.customerOrders.searchLabel": "Pesquisar pedidos",
  "commerce.customerOrders.searchPlaceholder": "Pesquisar por nº ou cliente",
  "commerce.customerOrders.tableCaption": "Pedidos do cliente",
  "commerce.customerOrders.listRegionLabel": "Resultados de pedidos",
  "commerce.customerOrders.col.id": "Pedido",
  "commerce.customerOrders.col.customer": "Cliente",
  "commerce.customerOrders.col.status": "Estado",
  "commerce.customerOrders.col.amount": "Valor",
  "commerce.customerOrders.col.date": "Atualizado",
  "commerce.customerOrders.pagination.count": "A mostrar {start}\u2013{end} de {count} pedidos",
  "commerce.customerOrders.empty.title": "Ainda sem pedidos",
  "commerce.customerOrders.empty.description":
    "Pedidos do catálogo e cotações surgem aqui após confirmar.",
  "commerce.customerOrders.empty.cta": "Atualizar lista",
  "commerce.customerOrders.error.title": "Não foi possível carregar pedidos",
  "commerce.customerOrders.error.retry": "Tentar novamente",
  "commerce.customerOrders.detail.eyebrow": "Pedido do cliente",
  "commerce.customerOrders.detail.summaryLabel": "Resumo do pedido",
  "commerce.customerOrders.detail.stat.status": "Estado",
  "commerce.customerOrders.detail.attributesLabel": "Detalhes",
  "commerce.customerOrders.detail.attributesTitle": "Atributos do pedido",
  "commerce.customerOrders.detail.fieldset.identity": "Identidade e cliente",
  "commerce.customerOrders.detail.fieldset.schedule": "Planeamento",
  "commerce.customerOrders.detail.lineItemsLabel": "Linhas",
  "commerce.customerOrders.detail.lineItemsTitle": "Produtos neste pedido",
  "commerce.customerOrders.detail.lineItemsEmpty": "Sem linhas neste pedido.",
  "commerce.customerOrders.detail.lineItemsTableCaption": "Linhas do pedido",
  "commerce.customerOrders.detail.col.description": "Descrição",
  "commerce.customerOrders.detail.col.qty": "Qtd.",
  "commerce.customerOrders.detail.col.total": "Total da linha",
  "commerce.customerOrders.detail.historyLabel": "Atividade",
  "commerce.customerOrders.detail.historyTitle": "Linha cronológica do pedido",
  "commerce.customerOrders.detail.timelineEmpty": "Sem eventos ainda.",
  "commerce.customerOrders.detail.action.editOrder": "Editar pedido",
  "commerce.customerOrders.detail.action.deleteOrder": "Eliminar pedido",

  "commerce.rfqs.title": "Pedidos de orçamento",
  "commerce.rfqs.subtitle": "Acompanhe volume RFQ, responsáveis e acompanhamento.",
  "commerce.rfqs.action.createRequest": "Iniciar RFQ público",
  "commerce.rfqs.action.viewRequest": "Ver pedido",
  "commerce.rfqs.search": "Pesquisar pedidos",
  "commerce.rfqs.searchLabel": "Pesquisar RFQ",
  "commerce.rfqs.searchPlaceholder": "Por nº., título ou cliente",
  "commerce.rfqs.tableCaption": "Pedidos de orçamento",
  "commerce.rfqs.listRegionLabel": "Resultados RFQ",
  "commerce.rfqs.col.id": "Pedido",
  "commerce.rfqs.col.name": "Título",
  "commerce.rfqs.col.customer": "Cliente",
  "commerce.rfqs.col.status": "Estado",
  "commerce.rfqs.col.amount": "Orçamento",
  "commerce.rfqs.col.date": "Pedido",
  "commerce.rfqs.pagination.count": "A mostrar {start}\u2013{end} de {count} pedidos",
  "commerce.rfqs.empty.title": "Ainda sem RFQs",
  "commerce.rfqs.empty.description": "Os pedidos de clientes aparecem aqui após envio.",
  "commerce.rfqs.empty.cta": "Atualizar lista",
  "commerce.rfqs.error.title": "Não foi possível carregar RFQs",
  "commerce.rfqs.error.retry": "Tentar novamente",
  "commerce.rfqs.detail.eyebrow": "Pedido de orçamento",
  "commerce.rfqs.detail.summaryLabel": "Resumo RFQ",
  "commerce.rfqs.detail.stat.status": "Estado",
  "commerce.rfqs.detail.attributesLabel": "Detalhes",
  "commerce.rfqs.detail.attributesTitle": "Atributos RFQ",
  "commerce.rfqs.detail.fieldset.identity": "Identidade e cliente",
  "commerce.rfqs.detail.fieldset.schedule": "Planeamento",
  "commerce.rfqs.detail.lineItemsLabel": "Linhas",
  "commerce.rfqs.detail.lineItemsTitle": "Itens solicitados",
  "commerce.rfqs.detail.lineItemsEmpty": "Sem linhas neste pedido.",
  "commerce.rfqs.detail.lineItemsTableCaption": "Linhas RFQ",
  "commerce.rfqs.detail.col.description": "Descrição",
  "commerce.rfqs.detail.col.qty": "Qtd.",
  "commerce.rfqs.detail.col.unitPrice": "Preço unitário",
  "commerce.rfqs.detail.historyLabel": "Atividade",
  "commerce.rfqs.detail.historyTitle": "Linha cronológica RFQ",
  "commerce.rfqs.detail.timelineEmpty": "Sem eventos ainda.",
  "commerce.rfqs.detail.action.editRequest": "Editar pedido",
  "commerce.rfqs.detail.action.deleteRequest": "Eliminar pedido",

  /* ── Form aria-labels ──────────────────────────────────── */
  "forms.checkout.paymentMethod": "Selecionar método de pagamento",
  "forms.punchout.partyName": "Nome da parte",
  "forms.punchout.protocol": "Selecionar protocolo",
  "forms.quickOrder.csvFile": "Ficheiro CSV",
  "forms.spending.role": "Selecionar função",
  "forms.spending.limitAmount": "Montante do limite",
  "forms.spending.currency": "Moeda",
  "forms.spending.period": "Selecionar período",
  "forms.usageReports.groupBy": "Agrupar por",
  "forms.warehouse.name": "Nome do armazém",
  "forms.warehouse.code": "Código do armazém",
  "forms.warehouse.type": "Selecionar tipo de armazém",
  "forms.warehouse.site": "Sede do armazém",

  /* ── Additional errors ─────────────────────────────────── */
  "errors.faqNotFound": "FAQ não encontrada",

  /* ── UI standards (audit) ──────────────────────────────── */
  "common.undo": "Desfazer",
  "common.moreActions": "Mais ações",
  "common.required": "obrigatório",
  "common.submitting": "Enviando…",
  "common.saving": "Salvando…",
  "common.bulkActionBar": "Barra de ações em massa",
  "common.dismissNotification": "Dispensar notificação",
  "public.catalog.index.gridTitle": "Trilhas de serviço",
  "public.catalog.index.empty.title": "Ainda não há trilhas de serviço",
  "public.catalog.index.empty.description":
    "As trilhas de serviço aparecerão aqui assim que forem publicadas.",
  "public.catalog.card.cardLabel": "Ver trilha de serviço {title}",
  "public.home.catalog.cardLabel": "Ver {title}",
  "public.products.empty.title": "Nenhum produto corresponde à sua busca",
  "public.products.empty.description": "Tente outra palavra-chave ou limpe os filtros ativos.",
  "public.products.empty.clear": "Limpar busca",
  "public.products.card.cardLabel": "Ver produto {name}",
  "rfq.form.submitting": "Enviando…",
  "rfq.form.eyebrow": "Solicitar orçamento",
  "rfq.form.pageDescription": "Descreva seus requisitos — responderemos em um dia útil.",
  "rfq.thanks.returnToCatalog": "Voltar ao catálogo",
  "rfq.draft.title": "Rascunhos de RFQ",
  "rfq.draft.description": "Retome um rascunho para concluir seu pedido.",
  "assistant.stream.live": "Mensagens da conversa",
  "assistant.empty.title": "Iniciar a conversa",
  "assistant.empty.description": "Faça uma pergunta sobre escopo, entrega ou condições comerciais.",
  "assistant.error.disconnected.title": "Conexão perdida",
  "assistant.error.disconnected.description":
    "O fluxo da conversa foi desconectado. A página reconectará automaticamente.",
  "digital.twin.unsupported.title": "Seu navegador não suporta visualização 3D",
  "digital.twin.unsupported.description":
    "Atualize para um navegador moderno ou ative WebGL para visualizar o gêmeo digital.",
  "admin.dsar.purgeConfirm.title": "Purgar registro do titular dos dados?",
  "admin.dsar.purgeConfirm.description":
    "Isso excluirá permanentemente todos os dados vinculados a {subject}. Ação irreversível.",
  "admin.dsar.purgeConfirm.action": "Purgar dados",
  "admin.user.deleteConfirm.title": "Excluir usuário?",
  "admin.user.deleteConfirm.description":
    "Todos os acessos de {user} serão revogados e seus dados pessoais removidos. Irreversível.",
  "admin.user.deleteConfirm.action": "Excluir usuário",
  "admin.tenant.suspendConfirm.title": "Suspender tenant?",
  "admin.tenant.suspendConfirm.description":
    "Todos os membros de {tenant} perderão acesso imediatamente. Você pode reativar depois.",
  "admin.tenant.suspendConfirm.action": "Suspender tenant",
  "admin.config.promoteConfirm.title": "Promover configuração para {env}?",
  "admin.config.promoteConfirm.description":
    "A configuração selecionada será ativada em {env}. Os valores existentes serão arquivados.",
  "admin.config.promoteConfirm.action": "Promover configuração",
  "profile.security.session.revokeConfirm.title": "Revogar sessão?",
  "profile.security.session.revokeConfirm.description":
    "A sessão selecionada será desconectada imediatamente em seu dispositivo.",
  "profile.security.session.revokeConfirm.action": "Revogar sessão",
  "profile.security.passkey.deleteConfirm.title": "Excluir passkey?",
  "profile.security.passkey.deleteConfirm.description":
    "Você não poderá mais entrar com este passkey. Pode registrar um novo a qualquer momento.",
  "profile.security.passkey.deleteConfirm.action": "Excluir passkey",
  "tasks.kanban.moveTo": "Mover para {status}",
  "cart.toast.removed": "Item removido do carrinho",
  "support.replyForm.legend": "Responder ao chamado",
  "governance.generated.warning": "Este artefato é gerado. Edite a origem canônica em vez disso.",
  "commerce.product.relatedHeading": "Produtos relacionados",
  "common.a11y.toggleSidebar": "Alternar barra lateral",
  "common.a11y.toggleTheme": "Alternar tema",
  "common.a11y.mainNavigation": "Navegação principal",
  "common.a11y.topNavigation": "Barra superior",
  "common.a11y.openProfileMenu": "Abrir menu do perfil",
  "common.actions.settings": "Configurações",
  "common.actions.logout": "Sair",
  "hub.notifications.navbarTitle": "Notificações",
  "nav.ecosystemSection": "Ecossistema",
} satisfies I18nDictionary<EnKey>;

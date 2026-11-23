// Tradução da interface: português (pt-BR, fonte) <-> espanhol (es).
// Como o site é estático, os textos ficam em dois dicionários com as mesmas chaves.
//
// - PT/ES  : textos da própria interface, identificados por chave (ex.: 'calc.titulo').
// - SERVIDOR: textos que vêm da API (produtos, regras, guia, erros e mensagens),
//            identificados pelo texto original em português. Assim, mesmo que uma
//            resposta chegue já traduzida e seja guardada na tela, ela pode ser
//            normalizada e reexibida no idioma escolhido naquele momento.
//
// Preferência: localStorage -> idioma do navegador -> português.

const CHAVE = 'agrotax-idioma';
export const IDIOMAS = ['pt', 'es'];

const PT = {
  'meta.titulo': 'AgroTax — Calculadora Tributária',
  'meta.descricao':
    'Estimativa tributária simples para produtores rurais, cooperativas, contadores e profissionais do agronegócio.',

  'topo.nav_principal': 'Principal',
  'topo.inicio': 'Início',
  'topo.calculadora': 'Calculadora',
  'topo.guia': 'Guia Fiscal',
  'topo.sobre': 'Sobre',
  'topo.cta': 'Calcular agora',
  'topo.idioma_grupo': 'Selecionar idioma',
  'tema.escuro': 'Alternar para o tema escuro',
  'tema.claro': 'Alternar para o tema claro',

  'hero.selo': 'Tecnologia para o agronegócio',
  'hero.titulo': 'Simplifique a sua <em>estimativa tributária</em>',
  'hero.destaque':
    'O AgroTax ajuda produtores rurais, cooperativas, contadores e profissionais do agronegócio a estimar a carga tributária de operações agrícolas de forma simples e organizada.',
  'hero.abrir': 'Abrir calculadora',
  'hero.conhecer': 'Conhecer o guia fiscal',
  'hero.aviso':
    'Os resultados são estimativas e não substituem a análise de um contador ou especialista tributário.',
  'hero.cartao_aria': 'Tributos considerados',
  'hero.cartao_titulo': 'Tributação no agronegócio',
  'hero.cartao_texto': 'Consulte os produtos cadastrados e faça uma simulação rápida.',
  'hero.estimativa': 'Estimativa',

  'porque.sobretitulo': 'Por que usar o AgroTax?',
  'porque.titulo': 'Uma forma mais simples de organizar sua estimativa tributária',
  'porque.subtitulo':
    'Reúna os dados da operação e consulte uma estimativa dos principais tributos considerados pelo sistema.',
  'porque.card1_titulo': 'Cálculo simplificado',
  'porque.card1_texto':
    'Informe os dados da operação e receba o resultado estimado dos tributos cadastrados.',
  'porque.card2_titulo': 'Foco no agronegócio',
  'porque.card2_texto':
    'O sistema foi pensado para operações agrícolas envolvendo produtos do campo.',
  'porque.card3_titulo': 'Resultado organizado',
  'porque.card3_texto':
    'Veja valores individuais, o total estimado e a carga tributária percentual.',

  'calc.sobretitulo': 'Calculadora tributária',
  'calc.titulo': 'Faça sua simulação',
  'calc.subtitulo':
    'Selecione o produto, informe o valor da operação e escolha as opções correspondentes.',
  'calc.produto': 'Produto',
  'calc.carregando': 'Carregando produtos…',
  'calc.produto_vazio': 'Selecione um produto',
  'calc.produto_erro': 'Não foi possível carregar os produtos',
  'calc.valor': 'Valor da operação (R$)',
  'calc.valor_exemplo': 'Ex.: 100000',
  'calc.regime': 'Regime tributário',
  'calc.operacao': 'Tipo de operação',
  'calc.op_compra': 'Compra',
  'calc.op_venda': 'Venda',
  'calc.botao': 'Calcular tributos',
  'calc.calculando': 'Calculando…',
  'calc.dica': 'O resultado apresentado é uma estimativa baseada nas regras cadastradas no sistema.',
  'calc.res_small': 'Resultado da simulação',
  'calc.res_titulo': 'Resumo tributário',
  'calc.res_vazio': 'Preencha os dados ao lado e clique em <b>Calcular tributos</b>.',
  'calc.carga': 'Carga estimada: {carga} sobre {valor}',
  'calc.liquido': 'Valor líquido: {valor}',
  'calc.res_meta': '{produto} · {regime} · {operacao}<br>Estimativa — confirme com um contador.',
  'calc.erro_produto': 'Selecione um produto.',
  'calc.erro_valor': 'Informe um valor maior que zero.',

  'passos.sobretitulo': 'Como funciona',
  'passos.titulo': 'Três passos para fazer uma simulação',
  'passos.passo1_titulo': 'Escolha o produto',
  'passos.passo1_texto': 'Selecione o produto agrícola da operação.',
  'passos.passo2_titulo': 'Informe os dados',
  'passos.passo2_texto': 'Digite o valor, o regime e o tipo de operação.',
  'passos.passo3_titulo': 'Consulte o resultado',
  'passos.passo3_texto': 'Veja a estimativa de cada tributo e o total.',

  'guia.sobretitulo': 'Guia fiscal',
  'guia.titulo': 'Entenda os principais tributos considerados pelo AgroTax',
  'guia.subtitulo':
    'Consulte informações organizadas sobre os tributos utilizados nas simulações do sistema.',
  'guia.carregando': 'Carregando…',
  'guia.erro': 'Não foi possível carregar o guia agora.',
  'guia.faixa': 'Alíquotas cadastradas: {faixa}',

  'sobre.sobretitulo': 'Sobre o projeto',
  'sobre.titulo': 'AgroTax',
  'sobre.subtitulo':
    'Projeto criado para facilitar a compreensão da tributação no agronegócio. Os valores exibidos são estimativas e dependem das regras cadastradas; sempre confirme com um contador.',
  'sobre.form_titulo': 'Fale com a gente',
  'sobre.nome': 'Nome',
  'sobre.email': 'E-mail',
  'sobre.mensagem': 'Mensagem',
  'sobre.armadilha': 'Não preencha',
  'sobre.dica': 'Usamos seu nome e e-mail apenas para responder a esta mensagem.',
  'sobre.botao': 'Enviar mensagem',

  'rodape.texto': 'AgroTax — estimativas tributárias para o agronegócio.',

  'util.resposta_invalida': 'Resposta inválida do servidor.',
  'util.erro_inesperado': 'Erro inesperado.',
};

const ES = {
  'meta.titulo': 'AgroTax — Calculadora tributaria',
  'meta.descricao':
    'Estimación tributaria sencilla para productores rurales, cooperativas, contadores y profesionales del sector agropecuario.',

  'topo.nav_principal': 'Principal',
  'topo.inicio': 'Inicio',
  'topo.calculadora': 'Calculadora',
  'topo.guia': 'Guía Fiscal',
  'topo.sobre': 'Acerca de',
  'topo.cta': 'Calcular ahora',
  'topo.idioma_grupo': 'Seleccionar idioma',
  'tema.escuro': 'Cambiar al tema oscuro',
  'tema.claro': 'Cambiar al tema claro',

  'hero.selo': 'Tecnología para el sector agropecuario',
  'hero.titulo': 'Simplifique su <em>estimación tributaria</em>',
  'hero.destaque':
    'AgroTax ayuda a productores rurales, cooperativas, contadores y profesionales del sector agropecuario a estimar la carga tributaria de las operaciones agrícolas de forma sencilla y ordenada.',
  'hero.abrir': 'Abrir calculadora',
  'hero.conhecer': 'Ver la guía fiscal',
  'hero.aviso':
    'Los resultados son estimaciones y no sustituyen el análisis de un contador o especialista tributario.',
  'hero.cartao_aria': 'Tributos considerados',
  'hero.cartao_titulo': 'Tributación en el sector agropecuario',
  'hero.cartao_texto': 'Consulte los productos registrados y haga una simulación rápida.',
  'hero.estimativa': 'Estimación',

  'porque.sobretitulo': '¿Por qué usar AgroTax?',
  'porque.titulo': 'Una forma más sencilla de organizar su estimación tributaria',
  'porque.subtitulo':
    'Reúna los datos de la operación y consulte una estimación de los principales tributos considerados por el sistema.',
  'porque.card1_titulo': 'Cálculo simplificado',
  'porque.card1_texto':
    'Introduzca los datos de la operación y reciba el resultado estimado de los tributos registrados.',
  'porque.card2_titulo': 'Foco en el sector agropecuario',
  'porque.card2_texto':
    'El sistema fue pensado para operaciones agrícolas que involucran productos del campo.',
  'porque.card3_titulo': 'Resultado organizado',
  'porque.card3_texto':
    'Vea los valores individuales, el total estimado y la carga tributaria porcentual.',

  'calc.sobretitulo': 'Calculadora tributaria',
  'calc.titulo': 'Haga su simulación',
  'calc.subtitulo':
    'Seleccione el producto, introduzca el valor de la operación y elija las opciones correspondientes.',
  'calc.produto': 'Producto',
  'calc.carregando': 'Cargando productos…',
  'calc.produto_vazio': 'Seleccione un producto',
  'calc.produto_erro': 'No fue posible cargar los productos',
  'calc.valor': 'Valor de la operación (R$)',
  'calc.valor_exemplo': 'Ej.: 100000',
  'calc.regime': 'Régimen tributario',
  'calc.operacao': 'Tipo de operación',
  'calc.op_compra': 'Compra',
  'calc.op_venda': 'Venta',
  'calc.botao': 'Calcular tributos',
  'calc.calculando': 'Calculando…',
  'calc.dica': 'El resultado presentado es una estimación basada en las reglas registradas en el sistema.',
  'calc.res_small': 'Resultado de la simulación',
  'calc.res_titulo': 'Resumen tributario',
  'calc.res_vazio': 'Complete los datos del formulario y haga clic en <b>Calcular tributos</b>.',
  'calc.carga': 'Carga estimada: {carga} sobre {valor}',
  'calc.liquido': 'Valor neto: {valor}',
  'calc.res_meta': '{produto} · {regime} · {operacao}<br>Estimación — confirme con un contador.',
  'calc.erro_produto': 'Seleccione un producto.',
  'calc.erro_valor': 'Informe un valor mayor que cero.',

  'passos.sobretitulo': 'Cómo funciona',
  'passos.titulo': 'Tres pasos para hacer una simulación',
  'passos.passo1_titulo': 'Elija el producto',
  'passos.passo1_texto': 'Seleccione el producto agrícola de la operación.',
  'passos.passo2_titulo': 'Introduzca los datos',
  'passos.passo2_texto': 'Introduzca el valor, el régimen y el tipo de operación.',
  'passos.passo3_titulo': 'Consulte el resultado',
  'passos.passo3_texto': 'Vea la estimación de cada tributo y el total.',

  'guia.sobretitulo': 'Guía fiscal',
  'guia.titulo': 'Entienda los principales tributos considerados por AgroTax',
  'guia.subtitulo':
    'Consulte información organizada sobre los tributos utilizados en las simulaciones del sistema.',
  'guia.carregando': 'Cargando…',
  'guia.erro': 'No fue posible cargar la guía ahora.',
  'guia.faixa': 'Alícuotas registradas: {faixa}',

  'sobre.sobretitulo': 'Acerca del proyecto',
  'sobre.titulo': 'AgroTax',
  'sobre.subtitulo':
    'Proyecto creado para facilitar la comprensión de la tributación en el sector agropecuario. Los valores mostrados son estimaciones y dependen de las reglas registradas; confirme siempre con un contador.',
  'sobre.form_titulo': 'Hable con nosotros',
  'sobre.nome': 'Nombre',
  'sobre.email': 'E-mail',
  'sobre.mensagem': 'Mensaje',
  'sobre.armadilha': 'No lo complete',
  'sobre.dica': 'Usamos su nombre y e-mail solo para responder a este mensaje.',
  'sobre.botao': 'Enviar mensaje',

  'rodape.texto': 'AgroTax — estimaciones tributarias para el sector agropecuario.',

  'util.resposta_invalida': 'Respuesta no válida del servidor.',
  'util.erro_inesperado': 'Error inesperado.',
};

// Textos produzidos pela API: chave = português (fonte), valor = espanhol.
// Mantenha em sincronia com API/src/utilitarios/i18n.js.
const SERVIDOR = {
  // Validações e erros
  'Selecione um produto válido.': 'Seleccione un producto válido.',
  'Informe um valor da operação entre R$ 0,01 e R$ 1 trilhão.':
    'Informe un valor de la operación entre R$ 0,01 y R$ 1 billón.',
  'Regime tributário inválido.': 'Régimen tributario no válido.',
  'Tipo de operação inválido.': 'Tipo de operación no válido.',
  'Informe seu nome (2 a 100 caracteres).': 'Informe su nombre (de 2 a 100 caracteres).',
  'Informe um e-mail válido.': 'Informe un e-mail válido.',
  'A mensagem deve ter de 5 a 1000 caracteres.': 'El mensaje debe tener de 5 a 1000 caracteres.',
  'Produto não encontrado.': 'Producto no encontrado.',
  'Simulação não encontrada.': 'Simulación no encontrada.',
  'Mensagem enviada! Entraremos em contato.': '¡Mensaje enviado! Nos pondremos en contacto.',
  'Recebido.': 'Recibido.',
  'Não autorizado.': 'No autorizado.',
  'Rota não encontrada.': 'Ruta no encontrada.',
  'JSON inválido.': 'JSON no válido.',
  'Requisição grande demais.': 'Solicitud demasiado grande.',
  'Erro interno do servidor.': 'Error interno del servidor.',
  'Muitas requisições. Aguarde um instante.': 'Demasiadas solicitudes. Espere un momento.',
  'Sem regra cadastrada': 'Sin regla registrada',

  // Regimes e operações (ecoados pela API)
  'Lucro Presumido': 'Utilidades presuntas',
  'Lucro Real': 'Utilidades reales',
  'Simples Nacional': 'Simples Nacional',
  'Produtor Rural PF': 'Productor rural PF',
  'Compra': 'Compra',
  'Venda': 'Venta',

  // Guia fiscal (API/src/config/constantes.js)
  'Tributo considerado pelo sistema conforme a alíquota cadastrada para o produto.':
    'Tributo considerado por el sistema según la alícuota registrada para el producto.',
  'Incluído no cálculo quando existe alíquota correspondente cadastrada.':
    'Incluido en el cálculo cuando existe una alícuota correspondiente registrada.',
  'Contribuição calculada conforme o regime tributário informado.':
    'Contribución calculada según el régimen tributario informado.',
  'Percentual cadastrado para a simulação de operações de venda do produtor rural.':
    'Porcentaje registrado para la simulación de operaciones de venta del productor rural.',
  'Considerado de acordo com o regime utilizado pelo sistema.':
    'Considerado según el régimen utilizado por el sistema.',

  // Produtos de exemplo
  'Soja em grão': 'Soja en grano',
  'Milho em grão': 'Maíz en grano',
  'Café cru em grão': 'Café crudo en grano',
  'Boi gordo': 'Buey gordo',
  'Leite in natura': 'Leche in natura',

  // Observações das regras tributárias de exemplo
  'Alíquota de referência (exemplo)': 'Alícuota de referencia (ejemplo)',
  'Produto in natura costuma ser não tributado': 'El producto in natura suele no estar gravado',
  'Regime cumulativo': 'Régimen cumulativo',
  'Regime não cumulativo, sem créditos': 'Régimen no cumulativo, sin créditos',
  'Já incluído no DAS': 'Ya incluido en el DAS',
  'Não se aplica à pessoa física': 'No se aplica a la persona física',
  'INSS 1,2% + RAT 0,1% sobre a receita bruta': 'INSS 1,2% + RAT 0,1% sobre los ingresos brutos',
  'Contribuição ao SENAR sobre a receita bruta': 'Contribución al SENAR sobre los ingresos brutos',
};

// Índice espanhol -> português, para normalizar respostas que já chegaram traduzidas.
const SERVIDOR_INVERSO = (() => {
  const indice = {};
  for (const [pt, es] of Object.entries(SERVIDOR)) if (indice[es] === undefined) indice[es] = pt;
  return indice;
})();

function ler(chave) {
  if (IDIOMA === 'es' && ES[chave] !== undefined) return ES[chave];
  return PT[chave] ?? chave;
}

function detectar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (IDIOMAS.includes(salvo)) return salvo;
  } catch {
    /* armazenamento indisponível (modo privado): segue para o navegador */
  }
  const navegadores = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])
    .filter(Boolean)
    .map((idioma) => idioma.toLowerCase());
  for (const idioma of navegadores) {
    if (idioma.startsWith('es')) return 'es';
    if (idioma.startsWith('pt')) return 'pt';
  }
  return 'pt'; // português é o padrão quando não há preferência compatível
}

let IDIOMA = detectar();
const OBSERVADORES = [];

export const idiomaAtual = () => IDIOMA;

// Locale para números, moeda e porcentagens (o valor continua em reais).
export const locale = () => (IDIOMA === 'es' ? 'es-ES' : 'pt-BR');

// Traduz uma chave da interface: t('calc.titulo') ou t('calc.carga', { carga: '12%' })
export function t(chave, parametros) {
  let texto = ler(chave);
  if (parametros) {
    for (const [nome, valor] of Object.entries(parametros)) texto = texto.split(`{${nome}}`).join(valor);
  }
  return texto;
}

// Leva um texto vindo da API (em português ou já em espanhol) para o idioma atual.
export function textoServidor(texto) {
  if (typeof texto !== 'string' || texto === '') return texto;
  const canonico = SERVIDOR[texto] !== undefined ? texto : SERVIDOR_INVERSO[texto] ?? texto;
  if (IDIOMA !== 'es') return canonico;
  return SERVIDOR[canonico] ?? canonico;
}

const SELETOR = [
  '[data-i18n]',
  '[data-i18n-html]',
  '[data-i18n-placeholder]',
  '[data-i18n-aria]',
  '[data-i18n-title]',
  '[data-i18n-content]',
].join(',');

const ATRIBUTOS = {
  'data-i18n-placeholder': 'placeholder',
  'data-i18n-aria': 'aria-label',
  'data-i18n-title': 'title',
  'data-i18n-content': 'content',
};

function aplicarDocumento() {
  document.querySelectorAll(SELETOR).forEach((el) => {
    if (el.hasAttribute('data-i18n')) el.textContent = t(el.getAttribute('data-i18n'));
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = t(el.getAttribute('data-i18n-html'));
    for (const [origem, destino] of Object.entries(ATRIBUTOS)) {
      const chave = el.getAttribute(origem);
      if (chave) el.setAttribute(destino, t(chave));
    }
  });
  document.documentElement.lang = IDIOMA === 'es' ? 'es' : 'pt-BR';
}

// Registra um callback chamado sempre que o idioma muda (para redesenhar conteúdo dinâmico).
export function aoTraduzir(funcao) {
  OBSERVADORES.push(funcao);
}

export function definirIdioma(novo) {
  if (!IDIOMAS.includes(novo) || novo === IDIOMA) return;
  IDIOMA = novo;
  try {
    localStorage.setItem(CHAVE, novo);
  } catch {
    /* sem armazenamento o site continua funcionando, só perde a preferência */
  }
  sincronizarBotoes();
  aplicarDocumento();
  OBSERVADORES.forEach((funcao) => funcao(novo));
}

function sincronizarBotoes() {
  document.querySelectorAll('[data-idioma]').forEach((botao) => {
    const ativo = botao.dataset.idioma === IDIOMA;
    botao.setAttribute('aria-pressed', String(ativo));
  });
}

export function iniciarI18n() {
  aplicarDocumento();
  sincronizarBotoes();
  document.querySelectorAll('[data-idioma]').forEach((botao) => {
    botao.addEventListener('click', () => definirIdioma(botao.dataset.idioma));
  });
}

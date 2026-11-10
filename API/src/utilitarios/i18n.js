// Tradução dos textos emitidos pela API (erros, guia, resultados e mensagens).
// O português é a fonte: cada chave é a string original em pt-BR.
// O cliente informa o idioma com o cabeçalho Accept-Language; sem cabeçalho, tudo continua em português.
// Nada é gravado no banco: a tradução acontece só na resposta.

const ES = {
  // Validações (utilitarios/validadores)
  'Selecione um produto válido.': 'Seleccione un producto válido.',
  'Informe um valor da operação entre R$ 0,01 e R$ 1 trilhão.':
    'Informe un valor de la operación entre R$ 0,01 y R$ 1 billón.',
  'Regime tributário inválido.': 'Régimen tributario no válido.',
  'Tipo de operação inválido.': 'Tipo de operación no válido.',
  'Informe seu nome (2 a 100 caracteres).': 'Informe su nombre (de 2 a 100 caracteres).',
  'Informe um e-mail válido.': 'Informe un e-mail válido.',
  'A mensagem deve ter de 5 a 1000 caracteres.': 'El mensaje debe tener de 5 a 1000 caracteres.',

  // Serviços e controladores
  'Produto não encontrado.': 'Producto no encontrado.',
  'Simulação não encontrada.': 'Simulación no encontrada.',
  'Mensagem enviada! Entraremos em contato.': '¡Mensaje enviado! Nos pondremos en contacto.',
  'Recebido.': 'Recibido.',
  'Não autorizado.': 'No autorizado.',

  // Middlewares
  'Rota não encontrada.': 'Ruta no encontrada.',
  'JSON inválido.': 'JSON no válido.',
  'Requisição grande demais.': 'Solicitud demasiado grande.',
  'Erro interno do servidor.': 'Error interno del servidor.',
  'Muitas requisições. Aguarde um instante.': 'Demasiadas solicitudes. Espere un momento.',

  // Motor tributário
  'Sem regra cadastrada': 'Sin regla registrada',

  // Regimes e operações (ecoados na resposta da simulação)
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

  // Produtos de exemplo (banco/banco de dados)
  'Soja em grão': 'Soja en grano',
  'Milho em grão': 'Maíz en grano',
  'Café cru em grão': 'Café crudo en grano',
  'Boi gordo': 'Buey gordo',
  'Leite in natura': 'Leche in natura',

  // Observações das regras tributárias de exemplo (banco/banco de dados)
  'Alíquota de referência (exemplo)': 'Alícuota de referencia (ejemplo)',
  'Produto in natura costuma ser não tributado': 'El producto in natura suele no estar gravado',
  'Regime cumulativo': 'Régimen cumulativo',
  'Regime não cumulativo, sem créditos': 'Régimen no cumulativo, sin créditos',
  'Já incluído no DAS': 'Ya incluido en el DAS',
  'Não se aplica à pessoa física': 'No se aplica a la persona física',
  'INSS 1,2% + RAT 0,1% sobre a receita bruta': 'INSS 1,2% + RAT 0,1% sobre los ingresos brutos',
  'Contribuição ao SENAR sobre a receita bruta': 'Contribución al SENAR sobre los ingresos brutos',
};

// Lê o Accept-Language e devolve 'es' ou 'pt' (padrão). Só 'es' tem tradução pronta;
// qualquer outro idioma cai no português, que é a fonte do site.
function idiomaRequisicao(cabecalho) {
  if (!cabecalho || typeof cabecalho !== 'string') return 'pt';

  const preferidos = cabecalho
    .split(',')
    .map((parte) => {
      const [tipo, ...parametros] = parte.trim().split(';');
      const q = parametros.find((p) => p.trim().startsWith('q='));
      const peso = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return { tipo: tipo.trim().toLowerCase(), peso: Number.isFinite(peso) ? peso : 0 };
    })
    .filter((item) => item.tipo && item.peso > 0)
    .sort((a, b) => b.peso - a.peso);

  for (const { tipo } of preferidos) {
    if (tipo === '*') break;
    const primario = tipo.split('-')[0];
    if (primario === 'es') return 'es';
    if (primario === 'pt') return 'pt';
  }
  return 'pt';
}

function traduzir(texto, idioma) {
  if (idioma !== 'es' || typeof texto !== 'string') return texto;
  return ES[texto] ?? texto;
}

// Resposta de POST /api/calculos: só os textos mudam, valores e chaves ficam idênticos.
function traduzirSimulacao(dados, idioma) {
  if (idioma !== 'es' || !dados) return dados;
  return {
    ...dados,
    regimeTributario: traduzir(dados.regimeTributario, idioma),
    tipoOperacao: traduzir(dados.tipoOperacao, idioma),
    produto: dados.produto ? { ...dados.produto, nome: traduzir(dados.produto.nome, idioma) } : dados.produto,
    tributos: Array.isArray(dados.tributos)
      ? dados.tributos.map((t) => ({ ...t, observacao: traduzir(t.observacao, idioma) }))
      : dados.tributos,
  };
}

// Resposta de GET /api/tributos: rótulo e descrição de cada tributo.
function traduzirTributos(tributos, idioma) {
  if (idioma !== 'es' || !Array.isArray(tributos)) return tributos;
  return tributos.map((t) => ({ ...t, rotulo: traduzir(t.rotulo, idioma), descricao: traduzir(t.descricao, idioma) }));
}

module.exports = { ES, idiomaRequisicao, traduzir, traduzirSimulacao, traduzirTributos };

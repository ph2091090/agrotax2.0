// Testa a camada de tradução da API (Accept-Language + textos de resposta).
process.env.ARQUIVO_BANCO = ':memory:';

const test = require('node:test');
const assert = require('node:assert');

const { iniciarBanco } = require('../iniciarBanco');
iniciarBanco();

const { idiomaRequisicao, traduzir, traduzirSimulacao, traduzirTributos } = require('../src/utilitarios/i18n');
const calc = require('../src/controladores/calculadoraControlador');
const guia = require('../src/controladores/guiaControlador');
const leads = require('../src/controladores/leadControlador');
const { ErroAplicacao, tratadorErros } = require('../src/middlewares/erros');

function resposta() {
  return {
    codigo: 200, corpo: null,
    status(c) { this.codigo = c; return this; },
    json(c) { this.corpo = c; return this; },
  };
}

test('Accept-Language: espanhol é reconhecido, português e o resto caem no padrão', () => {
  assert.strictEqual(idiomaRequisicao('es'), 'es');
  assert.strictEqual(idiomaRequisicao('es-ES,es;q=0.9,en;q=0.8'), 'es');
  assert.strictEqual(idiomaRequisicao('pt-BR,pt;q=0.9,en;q=0.8'), 'pt');
  assert.strictEqual(idiomaRequisicao('en-US,en;q=0.9'), 'pt'); // idioma sem tradução => português
  assert.strictEqual(idiomaRequisicao('es;q=0.2,pt;q=0.9'), 'pt'); // maior prioridade vence
  assert.strictEqual(idiomaRequisicao('*'), 'pt');
  assert.strictEqual(idiomaRequisicao(''), 'pt');
  assert.strictEqual(idiomaRequisicao(undefined), 'pt');
  assert.strictEqual(idiomaRequisicao('!!lixo!!'), 'pt');
});

test('traduzir só muda no espanhol e devolve textos desconhecidos como estão', () => {
  assert.strictEqual(traduzir('Produto não encontrado.', 'es'), 'Producto no encontrado.');
  assert.strictEqual(traduzir('Produto não encontrado.', 'pt'), 'Produto não encontrado.');
  assert.strictEqual(traduzir('Produto não encontrado.', undefined), 'Produto não encontrado.');
  assert.strictEqual(traduzir('Nome de produto novo que ninguém cadastrou', 'es'),
    'Nome de produto novo que ninguém cadastrou');
  assert.strictEqual(traduzir(null, 'es'), null);
});

test('traduzirSimulacao troca só os textos: valores e chaves ficam idênticos', () => {
  const res = resposta();
  calc.calcular({ body: { produtoId: 1, valor: 100000, regime: 'Produtor Rural PF', operacao: 'Venda' } }, res);
  const pt = res.corpo.dados;

  const es = traduzirSimulacao(pt, 'es');
  assert.strictEqual(es.regimeTributario, 'Productor rural PF');
  assert.strictEqual(es.tipoOperacao, 'Venta');
  assert.strictEqual(es.produto.nome, 'Soja en grano');
  assert.strictEqual(es.totalCentavos, pt.totalCentavos); // R$ 13.500,00 continua igual
  assert.strictEqual(es.cargaTributaria, pt.cargaTributaria);
  assert.strictEqual(es.valorCentavos, pt.valorCentavos);
  assert.strictEqual(es.tributos.length, pt.tributos.length);
  assert.deepStrictEqual(es.tributos.map((t) => t.valorCentavos), pt.tributos.map((t) => t.valorCentavos));
  assert.strictEqual(es.tributos.find((t) => t.tributo === 'FUNRURAL').observacao,
    'INSS 1,2% + RAT 0,1% sobre los ingresos brutos');

  const semIdioma = traduzirSimulacao(pt, undefined);
  assert.strictEqual(semIdioma.regimeTributario, 'Produtor Rural PF');
  assert.strictEqual(semIdioma.produto.nome, pt.produto.nome);
});

test('traduzirTributos traduz a descrição e mantém as alíquotas', () => {
  const res = resposta();
  guia.listarTributos({ idioma: 'es' }, res);
  const es = res.corpo.dados;
  assert.strictEqual(es.length, 6);
  const icms = es.find((t) => t.tributo === 'ICMS');
  assert.strictEqual(icms.aliquotaMinima, 12);
  assert.strictEqual(icms.descricao,
    'Tributo considerado por el sistema según la alícuota registrada para el producto.');
  assert.strictEqual(icms.rotulo, 'ICMS'); // siglas e nomes técnicos ficam

  const pt = resposta();
  guia.listarTributos({}, pt);
  assert.strictEqual(pt.corpo.dados.find((t) => t.tributo === 'ICMS').descricao,
    'Tributo considerado pelo sistema conforme a alíquota cadastrada para o produto.');
});

test('erro do controlador sai em espanhol quando o cliente pede', () => {
  let capturado = null;
  try {
    calc.calcular({ idioma: 'es', body: { produtoId: 999, valor: 10, regime: 'Lucro Real', operacao: 'Venda' } }, resposta());
  } catch (e) {
    capturado = e;
  }
  assert.ok(capturado instanceof ErroAplicacao);
  assert.strictEqual(capturado.status, 404);

  const es = resposta();
  tratadorErros(capturado, { idioma: 'es' }, es, () => {});
  assert.strictEqual(es.corpo.erro, 'Producto no encontrado.');

  const pt = resposta();
  tratadorErros(capturado, { idioma: 'pt' }, pt, () => {});
  assert.strictEqual(pt.corpo.erro, 'Produto não encontrado.');
});

test('validação e mensagem de contato também seguem o idioma', () => {
  const err = { status: 400, message: 'Informe um e-mail válido.' };
  const es = resposta();
  tratadorErros(err, { idioma: 'es' }, es, () => {});
  assert.strictEqual(es.corpo.erro, 'Informe un e-mail válido.');

  const res = resposta();
  leads.criar({ idioma: 'es', body: { nome: 'Ana', email: 'ana@exemplo.com', mensagem: 'Quiero más información.' } }, res);
  assert.strictEqual(res.codigo, 201);
  assert.strictEqual(res.corpo.dados.mensagem, '¡Mensaje enviado! Nos pondremos en contacto.');

  const pt = resposta();
  leads.criar({ body: { nome: 'Bruno', email: 'bruno@exemplo.com', mensagem: 'Preciso de ajuda, por favor.' } }, pt);
  assert.strictEqual(pt.corpo.dados.mensagem, 'Mensagem enviada! Entraremos em contato.');
});

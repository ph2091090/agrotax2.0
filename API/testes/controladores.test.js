// Teste de integração: controladores + banco SQLite em memória (sem subir servidor).
process.env.ARQUIVO_BANCO = ':memory:';
process.env.TOKEN_ADMIN = 'segredo-de-teste';

const test = require('node:test');
const assert = require('node:assert');
const { iniciarBanco } = require('../iniciarBanco');
iniciarBanco();
iniciarBanco(); // rodar duas vezes não pode duplicar nada

const calc = require('../src/controladores/calculadoraControlador');
const guia = require('../src/controladores/guiaControlador');
const leads = require('../src/controladores/leadControlador');
const autenticacaoAdmin = require('../src/middlewares/autenticacaoAdmin');

function resposta() {
  return {
    codigo: 200, corpo: null,
    status(c) { this.codigo = c; return this; },
    json(c) { this.corpo = c; return this; },
  };
}

test('lista produtos cadastrados sem duplicar', () => {
  const res = resposta();
  calc.listarProdutos({}, res);
  assert.strictEqual(res.corpo.dados.length, 5);
});

test('calcula e salva uma simulação (Produtor Rural PF vendendo)', () => {
  const res = resposta();
  calc.calcular({ body: { produtoId: 1, valor: 100000, regime: 'Produtor Rural PF', operacao: 'Venda' } }, res);
  assert.strictEqual(res.codigo, 201);
  const d = res.corpo.dados;
  assert.strictEqual(d.totalCentavos, 1350000); // 12% + 1,3% + 0,2% de R$ 100.000 = R$ 13.500,00
  assert.strictEqual(d.cargaTributaria, 13.5);

  const busca = resposta();
  calc.buscarSimulacao({ params: { id: String(d.id) } }, busca);
  assert.strictEqual(busca.corpo.dados.total_centavos, d.totalCentavos);
});

test('rejeita entrada inválida e produto inexistente', () => {
  assert.throws(() => calc.calcular({ body: { produtoId: 1, valor: -1, regime: 'Lucro Real', operacao: 'Venda' } }, resposta()), { status: 400 });
  assert.throws(() => calc.calcular({ body: { produtoId: 999, valor: 10, regime: 'Lucro Real', operacao: 'Venda' } }, resposta()), { status: 404 });
  assert.throws(() => calc.buscarSimulacao({ params: { id: 'abc' } }, resposta()), { status: 404 });
});

test('guia fiscal traz os 6 tributos com faixa de alíquota', () => {
  const res = resposta();
  guia.listarTributos({}, res);
  assert.strictEqual(res.corpo.dados.length, 6);
  const icms = res.corpo.dados.find((t) => t.tributo === 'ICMS');
  assert.strictEqual(icms.aliquotaMinima, 12);
});

test('contato salva lead, ignora robô e lista só com token', () => {
  const ok = resposta();
  leads.criar({ body: { nome: 'Maria', email: 'maria@exemplo.com', mensagem: 'Quero saber mais.' } }, ok);
  assert.strictEqual(ok.codigo, 201);

  leads.criar({ body: { nome: 'Robô', email: 'r@r.com', mensagem: 'compre agora!!!', site: 'spam' } }, resposta());

  const lista = resposta();
  leads.listar({}, lista);
  assert.strictEqual(lista.corpo.dados.length, 1); // o robô não foi salvo
  assert.throws(() => leads.criar({ body: { nome: 'x', email: 'ruim', mensagem: '' } }, resposta()), { status: 400 });
});

test('rota de leads exige o token correto', () => {
  const chamar = (auth) => {
    let erro = 'sem-erro';
    autenticacaoAdmin({ get: () => auth }, {}, (e) => { if (e) erro = e; });
    return erro;
  };
  assert.strictEqual(chamar('Bearer segredo-de-teste'), 'sem-erro');
  assert.strictEqual(chamar('Bearer errado').status, 401);
  assert.strictEqual(chamar(undefined).status, 401);
});

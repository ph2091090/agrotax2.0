const test = require('node:test');
const assert = require('node:assert');
const { validarSimulacao, validarLead } = require('../src/utilitarios/validadores');

const simOk = { produtoId: 1, valor: 1000, regime: 'Lucro Real', operacao: 'Venda' };

test('simulação válida passa', () => {
  assert.deepStrictEqual(validarSimulacao(simOk).erros, []);
});

test('simulação rejeita valores inválidos', () => {
  assert.ok(validarSimulacao({ ...simOk, valor: -5 }).erros.length);
  assert.ok(validarSimulacao({ ...simOk, valor: '1000' }).erros.length); // texto não é número
  assert.ok(validarSimulacao({ ...simOk, valor: Infinity }).erros.length);
  assert.ok(validarSimulacao({ ...simOk, produtoId: '1; DROP TABLE produtos' }).erros.length);
  assert.ok(validarSimulacao({ ...simOk, regime: 'Inventado' }).erros.length);
  assert.ok(validarSimulacao({ ...simOk, operacao: 'Troca' }).erros.length);
  assert.ok(validarSimulacao(undefined).erros.length);
});

test('lead válido é normalizado', () => {
  const r = validarLead({ nome: '  Ana  ', email: ' ANA@Exemplo.com ', mensagem: 'Olá, tudo bem?' });
  assert.deepStrictEqual(r.erros, []);
  assert.strictEqual(r.dados.nome, 'Ana');
  assert.strictEqual(r.dados.email, 'ana@exemplo.com');
});

test('lead rejeita e-mail inválido e mensagem curta', () => {
  assert.ok(validarLead({ nome: 'Ana', email: 'ana@', mensagem: 'Olá, tudo bem?' }).erros.length);
  assert.ok(validarLead({ nome: 'Ana', email: 'a@b.com', mensagem: 'oi' }).erros.length);
  assert.ok(validarLead({ nome: 'A', email: 'a@b.com', mensagem: 'mensagem ok' }).erros.length);
});

test('lead detecta robô pelo campo escondido', () => {
  assert.strictEqual(validarLead({ nome: 'Ana', email: 'a@b.com', mensagem: 'mensagem ok', site: 'http://spam' }).robo, true);
  assert.strictEqual(validarLead({ nome: 'Ana', email: 'a@b.com', mensagem: 'mensagem ok' }).robo, false);
});

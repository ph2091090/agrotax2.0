const test = require('node:test');
const assert = require('node:assert');
const { calcularTributos } = require('../src/utilitarios/calculadoraTributaria');

const regras = [
  { tributo: 'ICMS', produto_id: 0, regime: '*', operacao: '*', aliquota: 12, vigente_desde: '2024-01-01', vigente_ate: '2026-12-31', observacao: null },
  { tributo: 'ICMS', produto_id: 0, regime: '*', operacao: '*', aliquota: 18, vigente_desde: '2027-01-01', vigente_ate: null, observacao: null },
  { tributo: 'PIS', produto_id: 0, regime: 'Lucro Presumido', operacao: '*', aliquota: 0.65, vigente_desde: '2024-01-01', vigente_ate: null, observacao: null },
  { tributo: 'COFINS', produto_id: 0, regime: 'Lucro Presumido', operacao: '*', aliquota: 3, vigente_desde: '2024-01-01', vigente_ate: null, observacao: null },
  { tributo: 'ICMS', produto_id: 7, regime: '*', operacao: '*', aliquota: 4, vigente_desde: '2024-01-01', vigente_ate: null, observacao: 'específica' },
];

const base = { valorCentavos: 100000, produtoId: 1, regime: 'Lucro Presumido', operacao: 'Compra', data: '2026-10-03', regras };
const pegar = (r, t) => r.tributos.find((x) => x.tributo === t);

test('calcula ICMS, PIS e COFINS em centavos', () => {
  const r = calcularTributos(base);
  assert.strictEqual(pegar(r, 'ICMS').valorCentavos, 12000);
  assert.strictEqual(pegar(r, 'PIS').valorCentavos, 650);
  assert.strictEqual(pegar(r, 'COFINS').valorCentavos, 3000);
  assert.strictEqual(r.totalCentavos, 15650);
  assert.strictEqual(r.liquidoCentavos, 84350);
  assert.strictEqual(r.cargaTributaria, 15.65);
});

test('usa a regra vigente na data da operação (lei mudou em 2027)', () => {
  assert.strictEqual(pegar(calcularTributos({ ...base, data: '2027-02-01' }), 'ICMS').aliquota, 18);
  assert.strictEqual(pegar(calcularTributos({ ...base, data: '2026-12-31' }), 'ICMS').aliquota, 12);
});

test('regra do produto vence a regra geral', () => {
  assert.strictEqual(pegar(calcularTributos({ ...base, produtoId: 7 }), 'ICMS').aliquota, 4);
});

test('tributo sem regra vira 0 e avisa', () => {
  const t = pegar(calcularTributos(base), 'FUNRURAL');
  assert.strictEqual(t.valorCentavos, 0);
  assert.strictEqual(t.observacao, 'Sem regra cadastrada');
});

test('arredonda sem erro de ponto flutuante', () => {
  const r = calcularTributos({ ...base, valorCentavos: 1 }); // 1 centavo
  assert.ok(Number.isInteger(r.totalCentavos));
});

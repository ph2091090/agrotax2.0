import { api, esc, dinheiro, porcento, aviso } from './utilitarios.js';

const REGIMES = ['Lucro Presumido', 'Lucro Real', 'Simples Nacional', 'Produtor Rural PF'];
const ROTULOS = { ICMS: 'ICMS', IPI: 'IPI', PIS: 'PIS', COFINS: 'COFINS', FUNRURAL: 'Funrural', SENAR: 'SENAR' };

function mostrarResultado(caixa, r) {
  const linhas = r.tributos
    .map(
      (t) => `<li><span>${esc(ROTULOS[t.tributo] || t.tributo)}
              <small>${porcento(t.aliquota)}${t.observacao ? ' · ' + esc(t.observacao) : ''}</small></span>
              <strong>${dinheiro(t.valorCentavos)}</strong></li>`
    )
    .join('');
  caixa.innerHTML = `
    <small>Resultado da simulação</small>
    <h3>Resumo tributário</h3>
    <div class="total">${dinheiro(r.totalCentavos)}</div>
    <p class="meta">Carga estimada: ${porcento(r.cargaTributaria)} sobre ${dinheiro(r.valorCentavos)}<br>Valor líquido: ${dinheiro(r.liquidoCentavos)}</p>
    <ul class="linhas">${linhas}</ul>
    <p class="meta">${esc(r.produto.nome)} · ${esc(r.regimeTributario)} · ${esc(r.tipoOperacao)}<br>Estimativa — confirme com um contador.</p>`;
}

export async function iniciarCalculadora() {
  const form = document.getElementById('form-calculo');
  const botao = document.getElementById('botao-calcular');
  const caixa = document.getElementById('resultado');
  const selectProduto = document.getElementById('produto');

  document.getElementById('regime').innerHTML = REGIMES.map((r) => `<option>${esc(r)}</option>`).join('');

  try {
    const produtos = await api('/produtos');
    selectProduto.innerHTML =
      '<option value="">Selecione um produto</option>' +
      produtos.map((p) => `<option value="${p.id}">${esc(p.nome)} (NCM ${esc(p.ncm)})</option>`).join('');
  } catch (e) {
    selectProduto.innerHTML = '<option value="">Não foi possível carregar os produtos</option>';
    aviso(e.message);
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const corpo = { produtoId: Number(f.produtoId), valor: Number(f.valor), regime: f.regime, operacao: f.operacao };

    if (!corpo.produtoId) return aviso('Selecione um produto.');
    if (!(corpo.valor > 0)) return aviso('Informe um valor maior que zero.');

    botao.disabled = true;
    botao.textContent = 'Calculando…';
    try {
      mostrarResultado(caixa, await api('/calculos', { metodo: 'POST', corpo }));
    } catch (e) {
      caixa.innerHTML = `<small>Resultado da simulação</small><h3>Resumo tributário</h3><p class="erro">${esc(e.message)}</p>`;
    } finally {
      botao.disabled = false;
      botao.textContent = 'Calcular tributos';
    }
  });
}

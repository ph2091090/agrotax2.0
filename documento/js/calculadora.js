import { api, esc, dinheiro, porcento, aviso } from './utilitarios.js';
import { t, textoServidor, aoTraduzir } from './i18n.js';

// Valores enviados à API são sempre em português (a API os valida assim).
const REGIMES = ['Lucro Presumido', 'Lucro Real', 'Simples Nacional', 'Produtor Rural PF'];
const ROTULOS = { ICMS: 'ICMS', IPI: 'IPI', PIS: 'PIS', COFINS: 'COFINS', FUNRURAL: 'Funrural', SENAR: 'SENAR' };

export async function iniciarCalculadora() {
  const form = document.getElementById('form-calculo');
  const botao = document.getElementById('botao-calcular');
  const caixa = document.getElementById('resultado');
  const selectProduto = document.getElementById('produto');

  const estado = { produtos: null, erroProdutos: false, calculando: false, resultado: null, erro: null };

  function montarRegimes() {
    const seletor = document.getElementById('regime');
    const valorAtual = seletor.value;
    seletor.innerHTML = REGIMES.map((regime) => `<option value="${esc(regime)}">${esc(textoServidor(regime))}</option>`).join('');
    if (valorAtual) seletor.value = valorAtual;
  }

  function montarProdutos() {
    const valorAtual = selectProduto.value;
    if (estado.erroProdutos) {
      selectProduto.innerHTML = `<option value="">${esc(t('calc.produto_erro'))}</option>`;
    } else if (!estado.produtos) {
      selectProduto.innerHTML = `<option value="">${esc(t('calc.carregando'))}</option>`;
    } else {
      selectProduto.innerHTML =
        `<option value="">${esc(t('calc.produto_vazio'))}</option>` +
        estado.produtos
          .map((p) => `<option value="${p.id}">${esc(textoServidor(p.nome))} (NCM ${esc(p.ncm)})</option>`)
          .join('');
    }
    if (valorAtual) selectProduto.value = valorAtual;
  }

  function montarBotao() {
    botao.textContent = estado.calculando ? t('calc.calculando') : t('calc.botao');
  }

  function montarResultado() {
    const cabecalho = `<small>${esc(t('calc.res_small'))}</small><h3>${esc(t('calc.res_titulo'))}</h3>`;

    if (estado.erro) {
      caixa.innerHTML = `${cabecalho}<p class="erro">${esc(textoServidor(estado.erro))}</p>`;
      return;
    }
    if (!estado.resultado) {
      caixa.innerHTML = `${cabecalho}<p class="apagado">${t('calc.res_vazio')}</p>`;
      return;
    }

    const r = estado.resultado;
    const linhas = r.tributos
      .map((tributo) => {
        const observacao = tributo.observacao ? ` · ${esc(textoServidor(tributo.observacao))}` : '';
        return `<li><span>${esc(ROTULOS[tributo.tributo] || tributo.tributo)}
                <small>${porcento(tributo.aliquota)}${observacao}</small></span>
                <strong>${dinheiro(tributo.valorCentavos)}</strong></li>`;
      })
      .join('');

    const meta = t('calc.res_meta', {
      produto: esc(textoServidor(r.produto.nome)),
      regime: esc(textoServidor(r.regimeTributario)),
      operacao: esc(textoServidor(r.tipoOperacao)),
    });

    caixa.innerHTML = `${cabecalho}
      <div class="total">${dinheiro(r.totalCentavos)}</div>
      <p class="meta">${t('calc.carga', { carga: porcento(r.cargaTributaria), valor: dinheiro(r.valorCentavos) })}<br>${t('calc.liquido', { valor: dinheiro(r.liquidoCentavos) })}</p>
      <ul class="linhas">${linhas}</ul>
      <p class="meta">${meta}</p>`;
  }

  function redesenhar() {
    montarRegimes();
    montarProdutos();
    montarBotao();
    montarResultado();
  }

  redesenhar();
  aoTraduzir(redesenhar);

  try {
    estado.produtos = await api('/produtos');
  } catch (e) {
    estado.erroProdutos = true;
    aviso(textoServidor(e.message));
  }
  montarProdutos();

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const corpo = { produtoId: Number(f.produtoId), valor: Number(f.valor), regime: f.regime, operacao: f.operacao };

    if (!corpo.produtoId) return aviso(t('calc.erro_produto'));
    if (!(corpo.valor > 0)) return aviso(t('calc.erro_valor'));

    estado.calculando = true;
    estado.erro = null;
    botao.disabled = true;
    montarBotao();
    try {
      estado.resultado = await api('/calculos', { metodo: 'POST', corpo });
      estado.erro = null;
    } catch (e) {
      estado.resultado = null;
      estado.erro = e.message; // guardado na fonte: o redesenho traduz no idioma vigente
    } finally {
      estado.calculando = false;
      botao.disabled = false;
      montarBotao();
      montarResultado();
    }
  });
}

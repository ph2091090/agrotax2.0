import { api, esc, porcento } from './utilitarios.js';

export async function iniciarGuia() {
  const caixa = document.getElementById('guia-tributos');
  try {
    const tributos = await api('/tributos');
    caixa.innerHTML = tributos
      .map((t) => {
        const faixa =
          t.aliquotaMinima === null
            ? ''
            : t.aliquotaMinima === t.aliquotaMaxima
              ? porcento(t.aliquotaMinima)
              : `${porcento(t.aliquotaMinima)} a ${porcento(t.aliquotaMaxima)}`;
        return `<article class="cartao"><h3>${esc(t.rotulo)}</h3><p>${esc(t.descricao)}</p>
                ${faixa ? `<span class="faixa">Alíquotas cadastradas: ${faixa}</span>` : ''}</article>`;
      })
      .join('');
  } catch {
    caixa.innerHTML = '<p class="apagado">Não foi possível carregar o guia agora.</p>';
  }
}

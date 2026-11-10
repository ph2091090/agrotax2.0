import { api, esc, porcento } from './utilitarios.js';
import { t, textoServidor, aoTraduzir } from './i18n.js';

export async function iniciarGuia() {
  const caixa = document.getElementById('guia-tributos');
  const estado = { tributos: null, erro: false };

  function montar() {
    if (estado.erro) {
      caixa.innerHTML = `<p class="apagado">${esc(t('guia.erro'))}</p>`;
      return;
    }
    if (!estado.tributos) {
      caixa.innerHTML = `<p class="apagado">${esc(t('guia.carregando'))}</p>`;
      return;
    }

    caixa.innerHTML = estado.tributos
      .map((tributo) => {
        const faixa =
          tributo.aliquotaMinima === null
            ? ''
            : tributo.aliquotaMinima === tributo.aliquotaMaxima
              ? porcento(tributo.aliquotaMinima)
              : `${porcento(tributo.aliquotaMinima)} a ${porcento(tributo.aliquotaMaxima)}`;
        return `<article class="cartao"><h3>${esc(textoServidor(tributo.rotulo))}</h3><p>${esc(textoServidor(tributo.descricao))}</p>
                ${faixa ? `<span class="faixa">${esc(t('guia.faixa', { faixa }))}</span>` : ''}</article>`;
      })
      .join('');
  }

  montar();
  aoTraduzir(montar);

  try {
    estado.tributos = await api('/tributos');
  } catch {
    estado.erro = true;
  }
  montar();
}

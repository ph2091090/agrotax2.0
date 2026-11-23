import { idiomaAtual, locale, t } from './i18n.js';

// Em desenvolvimento com Live Server (porta 5500) a API roda em outra porta.
export const API = location.port === '5500' ? 'http://localhost:3000/api' : '/api';

export async function api(caminho, { metodo = 'GET', corpo } = {}) {
  const resp = await fetch(API + caminho, {
    method: metodo,
    body: corpo ? JSON.stringify(corpo) : undefined,
    headers: {
      'Content-Type': 'application/json',
      // A API traduz as mensagens que ela própria gera.
      'Accept-Language': idiomaAtual() === 'es' ? 'es' : 'pt-BR',
    },
  });
  const json = await resp
    .json()
    .catch(() => ({ sucesso: false, erro: t('util.resposta_invalida') }));
  if (!json.sucesso) throw new Error(json.erro || t('util.erro_inesperado'));
  return json.dados;
}

// Escapa texto antes de colocar no HTML (protege contra XSS).
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Números seguem o idioma escolhido; a moeda continua sendo o real (R$).
export const dinheiro = (centavos) =>
  (Number(centavos) / 100).toLocaleString(locale(), { style: 'currency', currency: 'BRL' });
export const porcento = (n) => `${Number(n).toLocaleString(locale(), { maximumFractionDigits: 2 })}%`;

let temporizador;
export function aviso(mensagem) {
  const el = document.getElementById('aviso-toast');
  el.textContent = mensagem;
  el.classList.add('mostrar');
  clearTimeout(temporizador);
  temporizador = setTimeout(() => el.classList.remove('mostrar'), 4000);
}

// Em desenvolvimento com Live Server (porta 5500) a API roda em outra porta.
export const API = location.port === '5500' ? 'http://localhost:3000/api' : '/api';

export async function api(caminho, { metodo = 'GET', corpo } = {}) {
  const resp = await fetch(API + caminho, {
    method: metodo,
    body: corpo ? JSON.stringify(corpo) : undefined,
    headers: { 'Content-Type': 'application/json' },
  });
  const json = await resp.json().catch(() => ({ sucesso: false, erro: 'Resposta inválida do servidor.' }));
  if (!json.sucesso) throw new Error(json.erro || 'Erro inesperado.');
  return json.dados;
}

// Escapa texto antes de colocar no HTML (protege contra XSS).
export const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const dinheiro = (centavos) => (Number(centavos) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const porcento = (n) => `${Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;

let temporizador;
export function aviso(mensagem) {
  const el = document.getElementById('aviso-toast');
  el.textContent = mensagem;
  el.classList.add('mostrar');
  clearTimeout(temporizador);
  temporizador = setTimeout(() => el.classList.remove('mostrar'), 4000);
}

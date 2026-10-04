import { api, aviso } from './utilitarios.js';

export function iniciarContato() {
  const form = document.getElementById('form-contato');
  const botao = document.getElementById('botao-contato');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const corpo = Object.fromEntries(new FormData(form));
    botao.disabled = true;
    try {
      const r = await api('/leads', { metodo: 'POST', corpo });
      aviso(r.mensagem);
      form.reset();
    } catch (e) {
      aviso(e.message);
    } finally {
      botao.disabled = false;
    }
  });
}

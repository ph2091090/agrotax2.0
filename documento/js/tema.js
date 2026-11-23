import { t, aoTraduzir } from './i18n.js';

const CHAVE = 'agrotax-tema';
const ESCURO = 'escuro';
const CLARO = 'claro';

let botao;
let icone;

const atual = () => (document.documentElement.getAttribute('data-tema') === ESCURO ? ESCURO : CLARO);

function escolhidoPeloUsuario() {
  try {
    return localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}

function aplicar(tema, salvar) {
  document.documentElement.setAttribute('data-tema', tema);
  if (salvar) {
    try {
      localStorage.setItem(CHAVE, tema);
    } catch {
      /* sem armazenamento o tema continua valendo nesta sessão */
    }
  }

  if (!botao || !icone) return;
  const escuro = tema === ESCURO;
  icone.textContent = escuro ? '☀️' : '🌙';
  botao.setAttribute('aria-pressed', String(escuro));
  botao.setAttribute('aria-label', escuro ? t('tema.claro') : t('tema.escuro'));
}

export function iniciarTema() {
  botao = document.getElementById('botao-tema');
  icone = document.getElementById('icone-tema');
  if (!botao || !icone) return;

  aplicar(atual(), false); // só sincroniza o botão com o que o <head> já aplicou

  botao.addEventListener('click', () => aplicar(atual() === ESCURO ? CLARO : ESCURO, true));

  // O texto do botão depende do idioma: atualiza quando o idioma muda.
  aoTraduzir(() => aplicar(atual(), false));

  // Segue o sistema enquanto o usuário não tiver escolhido um tema.
  if (window.matchMedia) {
    const consulta = window.matchMedia('(prefers-color-scheme: dark)');
    consulta.addEventListener('change', (evento) => {
      if (!escolhidoPeloUsuario()) aplicar(evento.matches ? ESCURO : CLARO, false);
    });
  }
}

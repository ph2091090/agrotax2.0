// Tema claro/escuro: aplica a preferência salva antes da primeira pintura
// (arquivo clássico no <head>, para o navegador não "piscar" no tema errado).
// Também escuta o tema do sistema enquanto o usuário não escolher um.
(function () {
  var tema = null;
  try {
    tema = localStorage.getItem('agrotax-tema');
  } catch (e) {
    tema = null;
  }
  if (tema !== 'claro' && tema !== 'escuro') {
    tema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
  }
  document.documentElement.setAttribute('data-tema', tema);
})();

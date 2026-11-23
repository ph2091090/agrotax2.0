import { iniciarI18n } from './i18n.js';
import { iniciarTema } from './tema.js';
import { iniciarCalculadora } from './calculadora.js';
import { iniciarGuia } from './guia.js';
import { iniciarContato } from './contato.js';

iniciarI18n(); // idioma primeiro: todo o resto já monta no idioma escolhido
iniciarTema();
document.getElementById('ano').textContent = new Date().getFullYear();
iniciarCalculadora();
iniciarGuia();
iniciarContato();

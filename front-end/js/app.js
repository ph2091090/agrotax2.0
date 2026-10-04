import { iniciarCalculadora } from './calculadora.js';
import { iniciarGuia } from './guia.js';
import { iniciarContato } from './contato.js';

document.getElementById('ano').textContent = new Date().getFullYear();
iniciarCalculadora();
iniciarGuia();
iniciarContato();

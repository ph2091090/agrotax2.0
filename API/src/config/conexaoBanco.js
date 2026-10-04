// Abre o SQLite (better-sqlite3) com as proteções ligadas.
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { arquivoBanco } = require('./ambiente');

if (arquivoBanco !== ':memory:') fs.mkdirSync(path.dirname(arquivoBanco), { recursive: true });

const banco = new Database(arquivoBanco);
banco.pragma('journal_mode = WAL');
banco.pragma('foreign_keys = ON'); // sem isso o SQLite ignora as chaves estrangeiras

module.exports = banco;

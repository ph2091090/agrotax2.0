#!/usr/bin/env bash
# Inicia o AgroTax em Linux/macOS: instala dependências (se faltar), cria o .env e sobe o servidor.
set -e
cd "$(dirname "$0")/API"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js não encontrado. Instale a versão LTS em https://nodejs.org e tente de novo."
  exit 1
fi
if [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 18 ]; then
  echo "Node.js 18 ou superior é necessário (versão atual: $(node --version))."
  exit 1
fi

[ -d node_modules ] || { echo "Instalando dependências..."; npm install; }
[ -f .env ] || { cp .env.example .env; echo "Arquivo .env criado a partir de .env.example."; }

URL="http://localhost:${PORT:-3000}"
echo "Abrindo $URL (Ctrl+C para parar)"
( sleep 2; { command -v xdg-open >/dev/null && xdg-open "$URL"; } || { command -v open >/dev/null && open "$URL"; } || true ) >/dev/null 2>&1 &
npm start

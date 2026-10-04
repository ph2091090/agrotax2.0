@echo off
chcp 65001 >nul
rem Inicia o AgroTax no Windows: instala dependencias (se faltar), cria o .env e sobe o servidor.
cd /d "%~dp0API"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e tente de novo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 ( echo Falha no npm install. & pause & exit /b 1 )
)
if not exist .env (
  copy .env.example .env >nul
  echo Arquivo .env criado a partir de .env.example.
)

echo Abrindo http://localhost:3000 (Ctrl+C para parar)
start "" "http://localhost:3000"
call npm start
pause

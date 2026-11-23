# Changelog

Formato baseado em *Keep a Changelog*; versionamento semântico (maior.menor.correção).

## [2.0.0] — 2026-10-04

### Adicionado
- Banco de dados SQLite: `produtos`, `regras_tributarias` (versionadas por data), `simulacoes` e `leads`, com chaves estrangeiras, `CHECK`, índice e carga inicial idempotente.
- API REST em camadas (rotas, controladores, serviços, modelos) com 7 endpoints.
- Motor tributário em função pura, cálculo em centavos inteiros.
- Guia Fiscal alimentado pelo banco e formulário de contato funcional.
- Segurança: validação no servidor, SQL parametrizado, CSP e demais cabeçalhos, limite de requisições por IP, CORS restrito, token administrativo, honeypot, escape contra XSS.
- 16 testes automatizados (`npm test`).
- Scripts `iniciar.bat`, `iniciar.sh` e `iniciar.command`.
- Documentação completa em `documento/`: escopo, requisitos de usuário e de sistema, histórias de usuário, plano de testes, matriz de rastreabilidade, decisões arquiteturais, API, banco, segurança e manual do usuário.
- `PASSO_A_PASSO_GITHUB.md`.

### Alterado
- Front-end reescrito em módulos ES e CSS próprio (`estilo.css`) com variáveis de design; `tailwind.js` removido.
- Escopo do projeto reescrito.

### Segurança
- Aviso de privacidade no formulário de contato.

## [1.0.0] — **[PREENCHER data]**
- Versão inicial apresentada ao professor (protótipo da calculadora).

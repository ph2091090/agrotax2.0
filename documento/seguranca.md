# Segurança

## O que está implementado

| Risco | Proteção | Onde |
|---|---|---|
| Dados maliciosos ou absurdos | Validação no servidor de tipo, faixa, tamanho e lista permitida | `utilitarios/validadores.js` |
| SQL Injection | Todas as consultas usam parâmetros (`?`); nenhuma concatena texto do usuário | `modelos/` |
| XSS | Todo texto vindo da API é escapado (`esc`) antes de entrar no HTML; CSP bloqueia scripts externos e inline | `front-end/js/utilitarios.js`, `middlewares/seguranca.js` |
| Clickjacking / sniffing | `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `X-Content-Type-Options: nosniff` | `middlewares/seguranca.js` |
| Força bruta / abuso | Limite de requisições por IP (cálculo 60/min, contato 5/hora) | `middlewares/limitadorRequisicoes.js` |
| Spam no formulário | Limite por IP + campo escondido (honeypot) que robôs preenchem | `leadControlador.js` |
| Acesso indevido aos leads | Token em `Authorization: Bearer`, comparado em tempo constante; rota desativada se `TOKEN_ADMIN` vazio | `middlewares/autenticacaoAdmin.js` |
| Chamadas de outros sites | CORS só para origens listadas em `CORS_ORIGIN` | `app.js` |
| Corpo gigante | `express.json({ limit: '10kb' })` | `app.js` |
| Vazamento de detalhes | Erros 500 mostram mensagem genérica; detalhe só no log | `middlewares/erros.js` |
| Segredos no GitHub | `.env` e o banco estão no `.gitignore`; só `.env.example` é versionado | `.gitignore` |
| Transporte | HTTPS fornecido pelo Render + HSTS em produção | `seguranca.js` |
| Rastreabilidade | Log por requisição com id, método, rota, status e tempo (sem corpo) | `middlewares/registroRequisicoes.js` |

## O que NÃO existe (e por quê)

- **Login de usuários:** o sistema não tem contas nem dados privados por usuário. Se forem criadas, usar senha com `argon2` ou `bcrypt`, nunca em texto puro.
- **Limitador distribuído:** o limite fica em memória; com várias instâncias, usar Redis.
- **Auditoria de alterações de regras:** as regras são alteradas por SQL direto. Um painel admin deveria registrar quem mudou o quê.

## Boas práticas para quem for mexer

1. Nunca montar SQL com `` `...${variavel}...` ``; use `?`.
2. Nunca confiar na validação do navegador.
3. Rodar `npm audit` de tempos em tempos para checar dependências.
4. Gerar `TOKEN_ADMIN` com algo como `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Privacidade (LGPD)

O formulário coleta somente nome, e-mail e mensagem, e informa que serão usados apenas para responder. Não há cookies nem
rastreadores. Pendências: política de privacidade formal, prazo de retenção e rotina de exclusão de contatos (L-11).
O navegador baixa fontes do Google Fonts, e esse serviço recebe o IP do visitante (L-12).

## Limitações do que foi verificado

Os controles de borda (cabeçalhos, CORS, limite de requisições) estão implementados, mas **não têm teste automatizado** (L-08):
use os casos CT-M10 a CT-M16 de `plano_de_testes.md`. A lista completa de lacunas está em `requisitos_de_sistema.md`, seção 9.

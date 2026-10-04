# AgroTax

Calculadora de **estimativa tributária para o agronegócio**: o usuário escolhe o produto, informa o valor,
o regime e o tipo de operação, e recebe ICMS, IPI, PIS, COFINS, Funrural e SENAR estimados.

> ⚠️ Os resultados são **estimativas** e as alíquotas iniciais (`API/banco/dados_iniciais.sql`) são **exemplos**.
> Não substituem a análise de um contador.

Demo: https://agrotax.onrender.com

## O que o projeto tem

| Camada | O que foi feito |
|---|---|
| **Banco de dados** | SQLite com 4 tabelas (`produtos`, `regras_tributarias`, `simulacoes`, `leads`), chaves estrangeiras, `CHECK`, índice e dados iniciais |
| **Back-end** | API REST em Express organizada em rotas → controladores → serviços → modelos, com motor de cálculo separado |
| **Front-end** | HTML/CSS/JS em módulos; produtos, guia fiscal e cálculo vêm da API; formulário de contato funcional |
| **Segurança** | Validação no servidor, consultas parametrizadas, cabeçalhos HTTP (CSP etc.), limite de requisições, CORS restrito, token para área administrativa, escape contra XSS |
| **Testes** | 16 testes automatizados (motor, validações e integração com banco) + 23 casos manuais em `documento/plano_de_testes.md` |
| **Documentação** | 12 documentos em `documento/` (escopo, requisitos de usuário e de sistema, histórias, plano de testes, rastreabilidade, ADRs, API, banco, segurança, manual). Índice em `documento/README.md`. Para publicar: `PASSO_A_PASSO_GITHUB.md` |

## Estrutura

```
AgroTax/
├── API/
│   ├── banco/              schema.sql e dados_iniciais.sql
│   ├── src/
│   │   ├── config/         ambiente.js, conexaoBanco.js, constantes.js
│   │   ├── controladores/  calculadoraControlador, guiaControlador, leadControlador
│   │   ├── middlewares/    seguranca, limitadorRequisicoes, erros, registroRequisicoes, autenticacaoAdmin
│   │   ├── modelos/        produtoModelo, regraModelo, simulacaoModelo, leadModelo
│   │   ├── rotas/          calculadoraRotas, guiaRotas, leadRotas
│   │   ├── servicos/       calculadoraServico
│   │   ├── utilitarios/    calculadoraTributaria (motor), validadores
│   │   ├── app.js
│   │   └── server.js
│   ├── testes/
│   ├── iniciarBanco.js
│   ├── .env.example
│   └── package.json
├── front-end/              index.html, css/estilo.css, js/, assets/
├── documento/              12 documentos + README.md (índice)
├── iniciar.bat · iniciar.sh · iniciar.command
├── PASSO_A_PASSO_GITHUB.md
├── CHANGELOG.md
└── README.md
```

## Como rodar

Requisito: Node.js 18 ou superior.

**Jeito mais rápido:** dê duplo clique em `iniciar.bat` (Windows) ou `iniciar.command` (macOS), ou rode `./iniciar.sh`.
Ele confere o Node, instala as dependências, cria o `.env` e abre o navegador.

**Manualmente:**

```bash
cd API
npm install
cp .env.example .env      # opcional em desenvolvimento
npm run dev               # abre http://localhost:3000 (API + site)
npm test                  # roda os testes
```

O banco é criado sozinho na primeira execução (`API/dados/agrotax.db`). Para recriar manualmente: `npm run banco`.

Também funciona abrindo `front-end/index.html` com o Live Server (porta 5500): ele chama a API em `localhost:3000`.

## Variáveis de ambiente (`API/.env`)

| Variável | Para que serve |
|---|---|
| `PORT` | Porta do servidor (padrão 3000) |
| `NODE_ENV` | `production` liga o HSTS e fecha o CORS |
| `CORS_ORIGIN` | Sites autorizados a chamar a API |
| `ARQUIVO_BANCO` | Caminho do arquivo SQLite |
| `TOKEN_ADMIN` | Senha para `GET /api/leads` (vazio = rota desativada) |

## Deploy no Render

- **Root Directory:** `API` · **Build:** `npm install` · **Start:** `npm start`
- Variáveis: `NODE_ENV=production` e, se quiser consultar os leads, `TOKEN_ADMIN` com um valor longo e aleatório.
- ⚠️ No plano gratuito o disco é **efêmero**: o SQLite volta ao estado inicial a cada deploy. Para guardar leads e
  simulações de forma permanente, use um disco persistente do Render ou migre para PostgreSQL.

## Como atualizar uma alíquota quando a lei mudar

Não edite o código. Insira uma regra nova em `regras_tributarias` com `vigente_desde` na nova data e preencha
`vigente_ate` da regra antiga. Detalhes em `documento/banco-de-dados.md`.

## Limitações conhecidas

- Alíquotas são exemplos; falta validar com contador (ICMS real varia por estado, NCM e operação).
- Não há contas de usuário nem login: a única área restrita é a consulta de leads, protegida por token.
- Limite de requisições em memória: vale para uma instância só.

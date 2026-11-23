# AgroTax - Documentação do Projeto

## Visão Geral

O **AgroTax** é uma calculadora de estimativa tributária para o agronegócio. O usuário escolhe o produto, informa o valor, o regime e o tipo de operação, e recebe estimativas de ICMS, IPI, PIS, COFINS, Funrural e SENAR.

> ⚠️ **Atenção**: Os resultados são **estimativas** e as alíquotas iniciais são **exemplos**. Não substituem a análise de um contador.

- **Demo**: https://agrotax.onrender.com
- **Arquitetura**: API REST em Express + Front-end HTML/CSS/JS
- **Banco de dados**: SQLite com 4 tabelas

---

## Estrutura de Diretórios

```
AgroTax/
├── API/                      # Back-end (Node.js/Express)
│   ├── banco/               # Schema e dados iniciais do SQLite
│   ├── src/
│   │   ├── config/          # Ambiente, conexão e constantes
│   │   ├── controladores/   # Controladores da API
│   │   ├── middlewares/     # Segurança, rate limiting, tratamento de erros
│   │   ├── modelos/         # Modelos de banco de dados
│   │   ├── rotas/           # Rotas da API
│   │   ├── servicos/        # Lógica de cálculo tributário
│   │   ├── utilitarios/     # Motor tributário e validadores
│   │   ├── app.js           # Instanciação do Express
│   │   └── server.js        # Ponto de entrada do servidor
│   ├── testes/              # Testes automatizados
│   ├── iniciarBanco.js      # Script de inicialização do banco
│   ├── .env.example         # Variáveis de ambiente exemplo
│   └── package.json         # Dependências e scripts
├── front-end/               # Interface do usuário
│   ├── index.html           # Página principal (HTML com i18n)
│   ├── js/                  # JavaScript modular
│   │   ├── app.js           # Aplicação principal
│   │   ├── calculadora.js   # Lógica da calculadora
│   │   └── tema-inicio.js   # Alternador de tema
│   ├── css/estilo.css       # Estilização responsiva
│   └── assets/              # Ícones e mídia
├── documento/               # Documentação complementar
│   ├── 12 documentos        # Escopo, requisitos, ADRs, etc.
│   └── README.md            # Índice dos documentos
├── iniciar.bat              # Script de inicialização (Windows)
├── iniciar.command          # Script de inicialização (macOS)
├── iniciar.sh               # Script de inicialização (Linux/macOS)
├── PASSO_A_PASSO_GITHUB.md  # Guia de publicação no GitHub
├── CHANGELOG.md             # Histórico de alterações
└── README.md                # Documentação geral (esta introdução)
```

---

## Back-end (API - Node.js/Express)

### Tecnologias
- **Node.js** ≥ 18
- **Express** 4.19.2
- **better-sqlite3** 11.3.0 (SQLite nativo)
- **cors** 2.8.5
- **dotenv** 16.4.5

### Rotas Principais
| Métric | Endpoint | Descrição |
|--------|----------|-----------|
| `GET /api/produtos` | Lista todos os produtos cadastrados |
| `GET /api/guia` | Informações sobre os tributos |
| `POST /api/calcular` | Realiza simulação tributária |
| `GET /api/leads` | Área administrativa - consulta de leads (protegido por token) |

### Middlewares de Segurança
- **seguranca** - Headers CSP, CORS restrito, XSS escape
- **limitadorRequisicoes** - Limite de requisições em memória
- **erros** - Tratamento centralizado de erros

### Variáveis de Ambiente (`API/.env`)
| Variável | Descrição |
|----------|-----------|
| `PORT` | Porta do servidor (padrão 3000) |
| `NODE_ENV` | `production` liga HSTS e fecha CORS |
| `CORS_ORIGIN` | Sites autorizados a chamar a API |
| `ARQUIVO_BANCO` | Caminho do arquivo SQLite |
| `TOKEN_ADMIN` | Senha para `GET /api/leads` (vazio = rota desativada) |

### Scripts disponíveis
```bash
npm install    # Instalar dependências
npm run dev    # Iniciar em modo desenvolvimento (com hot-reload)
npm start      # Iniciar o servidor
npm test       # Executar testes automatizados
npm run banco  # Recriar o banco de dados manualmente
```

---

## Front-end (Interface Usuário)

### Tecnologias
- **HTML5** com estrutura semântica
- **CSS3** com layout responsivo (grade flexível)
- **JavaScript ES6+** - módulos com `import/export`
- **i18n** - Sistema de internacionalização com atributos `data-i18n`

### Páginas e Seções
1. **Herói** - Apresentação com chamada para calculadora
2. **Calculadora** - Formulário de simulação com seleção de produto, valor, regime e tipo de operação
3. **Guia Fiscal** - Informações sobre tributos (ICMS, IPI, PIS/COFINS, Funrural)
4. **Sobre** - Informações do projeto e formulário de contato
5. **Rodapé** - Ano automático e texto institucional

### Recursos de UI/UX
- **Tema escuro/claro** - Toggle com ícone lunar/solar
- **Seletor de idioma** - Português/Espanhol
- **Validação de formulário** - Both client-side e server-side
- **Toast de avisos** - Feedback visual para ações
- **Layout gradeado** - Responsivo para mobile e desktop

### Endpoints consumidos pelo front-end
- `GET /api/produtos` - Popula o select de produtos
- `GET /api/guia` - Preenche a seção de guia fiscal
- `POST /api/calcular` - Envia dados da simulação
- `GET /api/leads` - (Administrador) Consulta leads cadastrados

---

## Banco de Dados (SQLite)

### Tabelas
1. **produtos** - Produtos agrícolas cadastrados (5 produtos: soja, milho, café, leite, boi gordo)
2. **regras_tributarias** - Alíquotas e regras de cálculo por regime e tipo de operação
3. **simulacoes** - Histórico das simulações realizadas
4. **leads** - Contatos do formulário de "Fale conosco"

### Recursos
- **CHECK constraints** - Validação de dados na inserção
- **Índices** - Performance nas consultas
- **Chaves estrangeiras** - Integridade relacional
- **Dados iniciais** - SQL de seed em `API/banco/dados_iniciais.sql`

### Atualização de alíquotas
Não edite código. Insira uma regra nova em `regras_tributarias` com `vigente_desde` na nova data e preencha `vigente_ate` da regra antiga. Detalhes em `documento/banco-de-dados.md`.

---

## Segurança

- Validação no servidor
- Consultas parametrizadas (prevenção SQL injection)
- Headers HTTP (CSP, CORS restrito)
- Limite de requisições em memória
- Token para área administrativa
- Escape contra XSS

---

## Testes

- **16 testes automatizados** - Motor de cálculo, validações e integração com banco
- **23 casos manuais** - Em `documento/plano_de_testes.md`
- Framework: `node --test` (Node.js nativo)

---

## Deploy

### Render.com
- **Root Directory**: `API`
- **Build**: `npm install`
- **Start**: `npm start`
- Variáveis: `NODE_ENV=production` e `TOKEN_ADMIN` (opcional)

### Limitações do plano gratuito
- Disco efêmero: SQLite volta ao estado inicial a cada deploy
- Para leads/simulações permanentes: usar disco persistente do Render ou migrar para PostgreSQL

---

## Como Rodar Localmente

### Método Rápido
1. Dê duplo clique em `iniciar.bat` (Windows) ou `iniciar.command` (macOS)
2. Ou rode `./iniciar.sh` (Linux/macOS)
3. O script instala dependências, cria `.env` e abre o navegador

### Método Manual
```bash
cd API
npm install
cp .env.example .env      # Opcional em desenvolvimento
npm run dev              # Abre http://localhost:3000 (API + site)
npm test               # Roda os testes
```

Acesse o front-end em `http://localhost:5500` com Live Server, ou o API em `http://localhost:3000`.

---

## Licença e Metadados

- **Versão**: 2.0.0
- **Nome**: AgroTax
- **Descrição**: Calculadora de estimativa tributária para o agronegócio
- **Engines**: Node.js >= 18
- **Licença**: Informar em `package.json` ou documento próprio

---

## Contatos e Suporte

- **GitHub**: Consultar `PASSO_A_PASSO_GITHUB.md` para publicação
- **Documentação**: 12 documentos em `documento/`
- **Changelog**: `CHANGELOG.md` para histórico de alterações
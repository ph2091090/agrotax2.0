# Registro de Decisões Arquiteturais (ADR) — AgroTax

Formato: contexto, decisão, consequências, alternativas. Situação de todas: **Aceita** (decisão já refletida no código).

## ADR-001 — Node.js com Express
- **Contexto:** equipe pequena e acadêmica; precisa de API REST e de entregar o site no mesmo lugar.
- **Decisão:** Node.js (≥ 18) e Express 4.
- **Consequências:** uma linguagem (JavaScript) no cliente e no servidor; ecossistema grande. Tarefas pesadas de CPU bloqueariam o processo (não existem hoje).
- **Alternativas:** FastAPI (Python), NestJS. Descartadas pelo custo de aprendizado e de configuração.

## ADR-002 — SQLite como banco
- **Contexto:** a crítica recebida foi a ausência de banco; precisa ser simples de instalar e demonstrar.
- **Decisão:** SQLite via `better-sqlite3` (síncrono, arquivo único `API/dados/agrotax.db`).
- **Consequências:** zero configuração e testes em memória (`:memory:`). Uma única instância de escrita e, no Render gratuito, disco efêmero (L-02).
- **Alternativas:** PostgreSQL (mais robusto, exige serviço externo). Fica como evolução; a troca afeta `modelos/` e `conexaoBanco.js`.

## ADR-003 — Regras tributárias versionadas por data, em tabela
- **Contexto:** a legislação muda; alíquotas fixas no código obrigam novo deploy e perdem o histórico.
- **Decisão:** tabela `regras_tributarias` com `vigente_desde`/`vigente_ate`, especificidade por produto, regime e operação (`0` e `*` significam "todos").
- **Consequências:** mudança de lei = nova linha; o sistema sabe qual regra valia em cada data. Exige fechar a vigência da regra antiga; sem painel, a edição é por SQL (L-05).
- **Alternativas:** constantes no código; arquivo JSON de configuração.

## ADR-004 — Motor tributário como função pura
- **Contexto:** a regra de cálculo é a parte mais importante e mais sujeita a erro.
- **Decisão:** `calcularTributos` recebe tudo por parâmetro (valor, contexto, regras) e não acessa banco nem HTTP.
- **Consequências:** testável isoladamente e reutilizável por outros clientes. Carrega todas as regras em memória por simulação (aceitável para dezenas de regras).
- **Alternativas:** consultas SQL dentro do cálculo.

## ADR-005 — Dinheiro em centavos inteiros
- **Contexto:** `0,1 + 0,2` não é `0,3` em ponto flutuante.
- **Decisão:** valores calculados e gravados em centavos (`Math.round`); o front formata em reais.
- **Consequências:** sem acúmulo de erro; é preciso converter na entrada (`valor × 100`) e na exibição.
- **Alternativas:** `NUMERIC`/`Decimal` (sem suporte nativo no SQLite).

## ADR-006 — API e site no mesmo processo
- **Contexto:** hospedagem simples no Render, uma única URL.
- **Decisão:** o Express serve `front-end/` como arquivos estáticos e a API em `/api`.
- **Consequências:** sem problema de CORS em produção; front e API escalam juntos. Para o Live Server (porta 5500) o CORS libera `localhost:5500` em desenvolvimento.
- **Alternativas:** site estático separado (Render Static Site) apontando para a API.

## ADR-007 — Controles de segurança implementados sem bibliotecas dedicadas
- **Contexto:** objetivo didático e poucas dependências.
- **Decisão:** cabeçalhos (inclui CSP), limitador de requisições, validação e autenticação por token escritos no próprio projeto, usando `crypto` nativo.
- **Consequências:** o código é pequeno e explicável. Em contrapartida, não tem a maturidade de `helmet` e `express-rate-limit`, e o limitador vale para uma instância (L-03).
- **Recomendação:** em uso real, migrar para `helmet`, `express-rate-limit` (com Redis) e um validador como Zod.

## ADR-008 — Token estático para a área administrativa
- **Contexto:** só existe uma rota restrita (listar contatos) e não há contas de usuário.
- **Decisão:** `Authorization: Bearer <TOKEN_ADMIN>`, comparado com `timingSafeEqual`; sem o token configurado a rota é desativada (404).
- **Consequências:** simples e seguro por padrão. Sem rotação, sem registro de quem acessou (L-09).
- **Alternativas:** JWT com login (exigiria usuários, senhas com argon2 ou bcrypt e telas).

## ADR-009 — Honeypot e limite por IP contra spam (sem CAPTCHA)
- **Contexto:** formulário público de contato.
- **Decisão:** campo escondido `site` (robô preenche, humano não) e no máximo 5 envios por hora por IP.
- **Consequências:** sem atrito para o usuário e sem serviço externo. Robôs sofisticados podem contornar.
- **Alternativas:** reCAPTCHA/hCaptcha (terceiros e privacidade).

## ADR-010 — Front-end em HTML, CSS e JavaScript puros (módulos ES)
- **Contexto:** poucas telas, sem build; o projeto anterior usava Tailwind via arquivo local.
- **Decisão:** `estilo.css` próprio com variáveis (tokens de cor, raio e espaço) e módulos JS por responsabilidade.
- **Consequências:** carrega rápido e roda em qualquer hospedagem; sem framework, o estado da tela é manual. Todo texto vindo da API passa por `esc()` (XSS).
- **Alternativas:** React/Vite, Tailwind compilado.

## ADR-011 — Diagramas em Mermaid dentro dos `.md`
- **Contexto:** a documentação precisa de diagramas versionados junto ao código.
- **Decisão:** blocos ```mermaid, renderizados nativamente pelo GitHub e por extensões do VS Code.
- **Consequências:** diagramas em texto, revisáveis em *pull request*. Em editores sem suporte aparecem como código.
- **Alternativas:** PlantUML (exige servidor ou extensão), imagens exportadas (difíceis de manter).

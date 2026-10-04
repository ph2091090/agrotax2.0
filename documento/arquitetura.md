# Arquitetura

```
  Navegador (front-end)
        │  HTTPS · JSON
        ▼
  Express (app.js)
   ├─ middlewares: registro → segurança → CORS → JSON (10 KB) → limitador
   ├─ rotas ──► controladores ──► serviços ──► modelos ──► SQLite
   │                       └──► utilitários (motor tributário e validadores)
   └─ arquivos estáticos (front-end/)
```

## Responsabilidade de cada camada

| Camada | Pasta | Faz | Não faz |
|---|---|---|---|
| Rotas | `rotas/` | Liga URL + método a um controlador e aplica limitador/autenticação | Regra de negócio |
| Controladores | `controladores/` | Lê a requisição, valida, devolve a resposta HTTP | Falar com o banco direto |
| Serviços | `servicos/` | Orquestra: busca produto, regras, calcula e salva a simulação | Conhecer HTTP |
| Modelos | `modelos/` | Únicas funções que escrevem SQL | Regra de negócio |
| Utilitários | `utilitarios/` | Motor de cálculo e validadores (funções puras) | Acessar banco ou rede |

## Motor tributário (`utilitarios/calculadoraTributaria.js`)

`calcularTributos({ valorCentavos, produtoId, regime, operacao, data, regras })`

1. Para cada tributo (ICMS, IPI, PIS, COFINS, Funrural, SENAR) filtra as regras **vigentes na data**.
2. Entre as candidatas, escolhe a **mais específica**: produto (4 pontos) > regime (2) > operação (1). Empate: a mais recente.
3. Calcula em **centavos inteiros** (evita erros como 0,1 + 0,2 ≠ 0,3).
4. Devolve tributos, total, valor líquido e carga tributária (%).

Como não depende de banco nem de Express, o motor é testado isoladamente e poderia ser reutilizado por outro front (app, painel).

## Fluxo de uma simulação

1. `POST /api/calculos` com `{ produtoId, valor, regime, operacao }`.
2. `validarSimulacao` rejeita qualquer dado fora do esperado (400).
3. `calculadoraServico.simular` busca o produto (404 se não existir) e todas as regras.
4. O motor calcula; o resultado é gravado em `simulacoes` e devolvido com status 201.

## Decisões de projeto

- **Alíquotas no banco, não no código:** a lei muda; o código não precisa mudar.
- **SQLite:** zero configuração, ideal para projeto acadêmico. A troca para PostgreSQL só mexe em `modelos/` e `conexaoBanco.js`.
- **Um servidor só:** o Express entrega a API e o site, então no deploy há uma única URL e não há problema de CORS.

## Camada de serviços (atual)

`servicos/calculadoraServico.js` (simulação), `servicos/guiaServico.js` (faixa de alíquotas do Guia Fiscal) e
`servicos/leadServico.js` (validação e gravação de contatos). Os controladores só leem a requisição e devolvem a resposta.
Exceção conhecida: `calculadoraControlador` ainda acessa dois modelos diretamente (L-13).

## Onde se aprofundar

Diagramas de componentes e implantação em `escopo_do_projeto.md`; sequência, classes, estados e dicionário de dados em
`requisitos_de_sistema.md`; decisões e alternativas em `decisoes_arquiteturais.md`.

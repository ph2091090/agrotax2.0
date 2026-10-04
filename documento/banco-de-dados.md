# Banco de dados (SQLite)

Arquivos: `API/banco/schema.sql` (estrutura) e `API/banco/dados_iniciais.sql` (exemplos).
Executados por `iniciarBanco.js`; podem rodar várias vezes sem duplicar dados (`IF NOT EXISTS`, `INSERT OR IGNORE`).

```
produtos 1 ───< simulacoes
regras_tributarias   (produto_id = 0 significa "todos os produtos")
leads                (formulário de contato)
```

## `produtos`
| Coluna | Tipo | Observação |
|---|---|---|
| id | INTEGER PK | autoincremento |
| nome | TEXT | obrigatório |
| ncm | TEXT | obrigatório e único |
| ativo | INTEGER | 0 ou 1 (`CHECK`) |

## `regras_tributarias`
| Coluna | Tipo | Observação |
|---|---|---|
| tributo | TEXT | `ICMS`, `IPI`, `PIS`, `COFINS`, `FUNRURAL` ou `SENAR` (`CHECK`) |
| produto_id | INTEGER | 0 = vale para todos |
| regime | TEXT | `*` = todos |
| operacao | TEXT | `*` = todas (`Compra`/`Venda`) |
| aliquota | REAL | de 0 a 100 (`CHECK`) |
| vigente_desde / vigente_ate | TEXT | datas `AAAA-MM-DD`; `vigente_ate` nulo = em vigor |
| observacao | TEXT | texto mostrado ao usuário |

Única por `(tributo, produto_id, regime, operacao, vigente_desde)`.

## `simulacoes`
Guarda cada cálculo (valores em **centavos**) e o resultado completo em `resultado_json`.
`produto_id` tem chave estrangeira para `produtos` (as chaves estrangeiras são ativadas com `PRAGMA foreign_keys = ON`).
Índice em `criado_em`.

## `leads`
`nome`, `email`, `mensagem`, `criado_em`. Só é lida pela rota protegida `GET /api/leads`.

## Exemplo: o ICMS mudou em 2027

```sql
UPDATE regras_tributarias SET vigente_ate = '2026-12-31'
 WHERE tributo = 'ICMS' AND produto_id = 0 AND regime = '*' AND operacao = '*' AND vigente_ate IS NULL;

INSERT INTO regras_tributarias (tributo, regime, operacao, aliquota, vigente_desde, observacao)
VALUES ('ICMS', '*', '*', 18, '2027-01-01', 'Nova alíquota');
```

O sistema passa a usar 18% a partir de 2027 e continua sabendo que antes era 12%.

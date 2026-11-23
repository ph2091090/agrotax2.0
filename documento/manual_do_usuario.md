# Manual do Usuário — AgroTax

O AgroTax estima os tributos de uma operação do agronegócio. **O resultado é uma estimativa** e não substitui a análise de um contador.

## 1. Como fazer uma simulação

1. Abra o site e vá até **"Faça sua simulação"** (botão **Abrir calculadora** ou menu **Calculadora**).
2. **Produto:** escolha o produto da operação (a lista mostra o NCM).
3. **Valor da operação (R$):** digite o valor, por exemplo `100000`.
4. **Regime tributário:** escolha entre *Lucro Presumido*, *Lucro Real*, *Simples Nacional* ou *Produtor Rural PF*.
5. **Tipo de operação:** *Compra* ou *Venda*.
6. Clique em **Calcular tributos**.

## 2. Como ler o resultado

| Campo | Significado |
|---|---|
| **Total (grande, em verde)** | Soma estimada de todos os tributos |
| **Carga estimada** | Total dividido pelo valor da operação, em % |
| **Valor líquido** | Valor da operação menos o total de tributos |
| **Lista de tributos** | ICMS, IPI, PIS, COFINS, Funrural e SENAR, cada um com a alíquota usada, uma observação e o valor |

Exemplo: Soja em grão, R$ 100.000,00, Produtor Rural PF, Venda → total de R$ 13.500,00 (13,5%).

Se um tributo aparecer com "Sem regra cadastrada", o sistema não tem alíquota para essa combinação e considerou **zero**.

## 3. Guia Fiscal

A seção **Guia fiscal** explica cada tributo e mostra a faixa de alíquotas cadastradas hoje no sistema.

## 4. Fale conosco

Na seção **Sobre**, preencha nome, e-mail e mensagem (de 5 a 1000 caracteres) e clique em **Enviar mensagem**. Usamos seu nome e e-mail apenas para responder.

## 5. Problemas comuns

| O que aparece | O que fazer |
|---|---|
| "Selecione um produto." | Escolha um produto na lista |
| "Informe um valor maior que zero." | Digite um valor maior que 0 |
| "Não foi possível carregar os produtos" | O servidor pode estar iniciando (no plano gratuito demora alguns segundos): recarregue a página |
| "Muitas requisições. Aguarde um instante." | Espere cerca de um minuto e tente de novo |
| "Informe um e-mail válido." | Confira o e-mail digitado |

## 6. Para a equipe (administração)

- **Ver contatos recebidos:** `GET /api/leads` com o cabeçalho `Authorization: Bearer <TOKEN_ADMIN>` (ver `api.md`).
- **Atualizar uma alíquota:** inserir uma regra nova com a data de início, sem apagar a antiga (ver `banco-de-dados.md`).

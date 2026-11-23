# Plano de Testes — AgroTax

| Campo | Valor |
|---|---|
| **Sistema** | AgroTax `agrotax-api` 2.0.0 |
| **Versão do documento** | 1.0 |
| **Referências** | ISO/IEC/IEEE 29119 (conceitos de teste de software); ISO/IEC 25010 |
| **Documentos relacionados** | `requisitos_de_usuario.md`, `requisitos_de_sistema.md`, `historias_de_usuario.md`, `matriz_de_rastreabilidade.md` |

> **Nota metodológica.** A Parte A descreve os **16 testes automatizados que existem no repositório**.
> A Parte B reúne **casos manuais para a equipe executar e registrar**; os campos "Resultado obtido" e "Status"
> ficam em branco de propósito: **não foram executados** por quem escreveu este documento.

---

## 1. Estratégia

| Nível | O que cobre | Como | Onde |
|---|---|---|---|
| **Unitário** | Motor tributário e validadores (funções puras) | `node:test` | `API/testes/calculadoraTributaria.test.js`, `validadores.test.js` |
| **Integração** | Controladores + serviços + modelos + SQLite real em memória | `node:test` | `API/testes/controladores.test.js` |
| **Sistema / manual** | Site no navegador e API via HTTP (`curl`) | Roteiro da Parte B | este documento |
| **Segurança** | Cabeçalhos, CORS, limites, entradas maliciosas | `curl` (Parte B) | este documento |

**Ambiente automatizado:** Node.js 18+; banco `:memory:` (variável `ARQUIVO_BANCO` definida no próprio teste), portanto os testes nunca tocam no arquivo real.

**Como executar:** `cd API && npm install && npm test`.
**Resultado esperado:** `# tests 16`, `# pass 16`, `# fail 0`.

**Fora do alcance dos testes automatizados (L-08):** servidor HTTP, cabeçalhos de segurança, CORS, limite de requisições, arquivos estáticos e tratador de erros. Por isso a Parte B cobre essas áreas manualmente.

---

## 2. Parte A — Testes automatizados (16)

### 2.1 `calculadoraTributaria.test.js` (5)

| # | Teste | O que comprova | Requisitos |
|---|---|---|---|
| 1 | calcula ICMS, PIS e COFINS em centavos | Sobre R$ 1.000,00 (100.000 centavos), Lucro Presumido: ICMS 12.000, PIS 650, COFINS 3.000, total 15.650, líquido 84.350, carga 15,65% | RSF04, RNF-FUN01 |
| 2 | usa a regra vigente na data da operação | Em 2026-12-31 o ICMS é 12%; em 2027-02-01 é 18% | RSF03, RN01, RN06 |
| 3 | regra do produto vence a regra geral | Produto 7 usa 4% mesmo havendo regra geral de 12% | RSF03, RN02 |
| 4 | tributo sem regra vira 0 e avisa | Funrural sem regra = 0 e observação "Sem regra cadastrada" | RSF04, RN03 |
| 5 | arredonda sem erro de ponto flutuante | Para 1 centavo, o total é inteiro (**teste simples**: só confere que o total é um inteiro) | RNF-FUN01, RN07 |

### 2.2 `validadores.test.js` (5)

| # | Teste | O que comprova | Requisitos |
|---|---|---|---|
| 6 | simulação válida passa | Entrada correta não gera erros | RSF02 |
| 7 | simulação rejeita valores inválidos | Rejeita valor negativo, valor em texto, `Infinity`, `produtoId` com `1; DROP TABLE produtos`, regime inventado, operação inventada e corpo indefinido | RSF02, RNF-SEG01, RNF-SEG02 |
| 8 | lead válido é normalizado | Remove espaços do nome e coloca o e-mail em minúsculas | RSF08 |
| 9 | lead rejeita e-mail inválido e mensagem curta | E-mail sem domínio, mensagem de 2 caracteres e nome de 1 caractere geram erro | RSF08 |
| 10 | lead detecta robô pelo campo escondido | Campo `site` preenchido marca `robo = true` | RSF09 |

### 2.3 `controladores.test.js` (6)

| # | Teste | O que comprova | Requisitos |
|---|---|---|---|
| 11 | lista produtos cadastrados sem duplicar | Após iniciar o banco **duas vezes**, há exatamente 5 produtos | RSF01, RSF11, RNF-CON01 |
| 12 | calcula e salva uma simulação (Produtor Rural PF vendendo) | R$ 100.000 de Soja = total 1.350.000 centavos (R$ 13.500,00) e carga 13,5%; a simulação salva pode ser lida pelo id | RSF04, RSF05, RSF06, RNF-FUN02 |
| 13 | rejeita entrada inválida e produto inexistente | Valor negativo → status 400; produto 999 → 404; id "abc" → 404 | RSF02, RSF06, RSF15 |
| 14 | guia fiscal traz os 6 tributos com faixa de alíquota | 6 itens; ICMS com alíquota mínima 12 | RSF07 |
| 15 | contato salva lead, ignora robô e lista só com token | Contato válido → 201; robô não é gravado (lista com 1 item); e-mail ruim → 400 | RSF08, RSF09, RSF10 |
| 16 | rota de leads exige o token correto | Token certo passa; token errado e ausente → 401 | RSF10, RNF-SEG07 |

---

## 3. Parte B — Casos de teste manuais

**Preparação:** `iniciar.bat` (ou `iniciar.sh`) e abrir `http://localhost:3000`. Para os casos de API, definir `TOKEN_ADMIN` no `API/.env` e reiniciar.
Variável usada abaixo: `BASE=http://localhost:3000`.

| ID | Requisito | Passos | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|---|---|
| CT-M01 | RU01, RU05 | Abrir `BASE` | Título "Simplifique a sua estimativa tributária", aviso de estimativa, botões "Abrir calculadora" e "Conhecer o guia fiscal" | | |
| CT-M02 | RU01 | Clicar em Calculadora, Guia Fiscal e Sobre no menu | A página rola até cada seção | | |
| CT-M03 | RU02, RU03, RU04, RU05 | Soja em grão, valor 100000, Produtor Rural PF, Venda → "Calcular tributos" | Total R$ 13.500,00; carga 13,5%; líquido R$ 86.500,00; ICMS R$ 12.000,00; Funrural R$ 1.300,00; SENAR R$ 200,00; rodapé "Estimativa — confirme com um contador." | | |
| CT-M04 | RU03, RU12 | Clicar em "Calcular tributos" sem produto; depois com produto e valor vazio | "Selecione um produto." e "Informe um valor maior que zero."; nada enviado (aba Rede do navegador vazia) | | |
| CT-M05 | RU12 | Parar o servidor e recarregar/tentar calcular | Campo Produto: "Não foi possível carregar os produtos"; erro visível ao calcular | | |
| CT-M06 | RU06 | Rolar até o Guia Fiscal | 6 cartões (ICMS, IPI, PIS, COFINS, Funrural, SENAR) com "Alíquotas cadastradas" | | |
| CT-M07 | RU07 | Enviar nome "Maria", e-mail "maria@exemplo.com", mensagem "Quero saber mais." | "Mensagem enviada! Entraremos em contato."; formulário limpo; contato aparece em CT-M12 | | |
| CT-M08 | RU07, RU12 | Enviar e-mail "ruim" | "Informe um e-mail válido."; nada gravado | | |
| CT-M09 | RU07 (RSF09) | Com DevTools, preencher o campo escondido `site` e enviar | Resposta de sucesso, **sem** novo contato na lista | | |
| CT-M10 | RU12 (RSF16) | `for i in $(seq 1 65); do curl -s -o /dev/null -w "%{http_code}\n" -X POST $BASE/api/calculos -H "Content-Type: application/json" -d '{"produtoId":1,"valor":1000,"regime":"Lucro Real","operacao":"Venda"}'; done \| sort \| uniq -c` | Cerca de 60 respostas `201` e as restantes `429` (a janela é fixa, o corte pode variar um pouco) | | |
| CT-M11 | RU12 (RSF16) | Enviar 6 contatos válidos seguidos pela API (`POST /api/leads`) | Os 5 primeiros `201`; o 6º `429` | | |
| CT-M12 | RU09 | `curl $BASE/api/leads` (sem token); `curl -H "Authorization: Bearer ERRADO" $BASE/api/leads`; `curl -H "Authorization: Bearer $TOKEN" $BASE/api/leads`; depois repetir com `TOKEN_ADMIN` vazio | `401`; `401`; `200` com a lista; com token vazio no servidor, `404` | | |
| CT-M13 | RNF-SEG04 | `curl -I $BASE/` | Cabeçalhos `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `X-Request-Id`; **sem** `X-Powered-By` | | |
| CT-M14 | RNF-SEG06 | `curl -i -H "Origin: http://site-estranho.com" $BASE/api/produtos` | **Sem** cabeçalho `Access-Control-Allow-Origin` para essa origem | | |
| CT-M15 | RNF-SEG01, RNF-SEG02 | `POST /api/calculos` com `{"produtoId":"1; DROP TABLE produtos","valor":10,"regime":"Lucro Real","operacao":"Venda"}` | `400` "Selecione um produto válido."; tabela `produtos` intacta | | |
| CT-M16 | RSF15 | `POST` com corpo `{ruim`; `POST` com corpo maior que 10 KB | `400` "JSON inválido."; `413` "Requisição grande demais." | | |
| CT-M17 | RU11 | DevTools em 375 px de largura | Menu oculto, formulário e resultado empilhados, sem rolagem horizontal | | |
| CT-M18 | RNF-USA02 | Navegar só com Tab | Foco visível em links, botões e campos; ordem lógica | | |
| CT-M19 | RU10 | Com o servidor parado, abrir o banco e aplicar o SQL de exemplo de `banco-de-dados.md` (ICMS 18% a partir de 2027-01-01); repetir CT-M03 trocando a data do computador, ou conferir o Guia | Antes da data, 12%; depois, 18% | | |
| CT-M20 | HU17 | Executar `iniciar.bat` (Windows), `iniciar.sh` (Linux/macOS) ou `iniciar.command` (macOS) em máquina limpa | Instala dependências, cria `.env`, abre o navegador | | |
| CT-M21 | RSF11 | Reiniciar o servidor 3 vezes | `GET /api/produtos` continua com 5 produtos | | |
| CT-M22 | RU08 | Fazer uma simulação; `curl $BASE/api/calculos/1` e `curl $BASE/api/calculos/abc` | `200` com a simulação; `404` "Simulação não encontrada." | | |
| CT-M23 | CA-08 | `git status` após rodar o sistema | `.env` e `API/dados/agrotax.db` **não** aparecem | | |

---

## 4. Critérios de entrada e saída

| Critério | Definição |
|---|---|
| **Entrada** | Dependências instaladas; banco inicializável; Node.js 18+ |
| **Saída (aprovação)** | 16/16 automatizados passam; casos CT-M01 a CT-M23 executados; defeitos de severidade alta corrigidos |
| **Suspensão** | `npm install` falha ou o servidor não sobe |

## 5. Gestão de defeitos

| Severidade | Exemplo | Ação |
|---|---|---|
| Alta | Cálculo errado; dado sem validação; área administrativa aberta | Corrigir antes da entrega |
| Média | Mensagem de erro confusa; falha de layout no celular | Corrigir ou registrar em lacuna |
| Baixa | Ajuste visual | Registrar no CHANGELOG |

Registro: *Issue* no GitHub com passos, resultado esperado e obtido.

## 6. Lacunas de teste conhecidas

| ID | Lacuna | Sugestão |
|---|---|---|
| L-08 | Sem testes HTTP automatizados (cabeçalhos, CORS, limite, estáticos, tratador de erros) | Testes de integração com `fetch` ou supertest |
| — | Sem testes de interface (E2E) | Playwright ou Cypress |
| — | Sem medição de desempenho (RNF-DES01 é meta) | Teste de carga simples |
| — | Teste 5 (arredondamento) é fraco | Casos com frações (ex.: 0,65% de 1 centavo) |

## 7. Modelo de relatório de execução

| Data | Executor | Versão | Automatizados (pass/total) | Manuais (ok/total) | Defeitos abertos | Observações |
|---|---|---|---|---|---|---|
| **[PREENCHER]** | **[PREENCHER]** | 2.0.0 | /16 | /23 | | |

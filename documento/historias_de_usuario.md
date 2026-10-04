# Histórias de Usuário — AgroTax

| Campo | Valor |
|---|---|
| **Sistema** | AgroTax |
| **Versão do documento** | 1.0 |
| **Versão do sistema analisado** | `agrotax-api` 2.0.0 |
| **Formato** | "Como *[ator]*, quero *[ação]*, para *[benefício]*" + critérios de aceitação em Gherkin (Dado / Quando / Então) |
| **Priorização** | MoSCoW: Must, Should, Could, Won't (nesta versão) |
| **Estimativa de esforço** | Não informada pela equipe (**[PREENCHER]** se o professor exigir pontos ou horas) |
| **Documentos relacionados** | `requisitos_de_usuario.md`, `requisitos_de_sistema.md`, `plano_de_testes.md`, `matriz_de_rastreabilidade.md` |

> **Nota metodológica.** A coluna "Situação" foi conferida no código e nos 16 testes automatizados. Histórias marcadas
> **[PROPOSTO]** não existem e servem como backlog.

---

## 1. Épicos

| Épico | Descrição | Histórias |
|---|---|---|
| **E1 — Simulação tributária** | Escolher produto, informar dados e entender o resultado | HU03–HU08 |
| **E2 — Guia Fiscal** | Aprender o que é cada tributo | HU10, HU11 |
| **E3 — Contato** | Falar com a equipe com segurança contra spam | HU12, HU13 |
| **E4 — Administração** | Manter contatos e alíquotas | HU14–HU16 |
| **E5 — Experiência de uso** | Entender o produto e usá-lo em qualquer tela | HU01, HU02, HU09 |
| **E6 — Plataforma e qualidade** | Executar, testar, proteger e documentar | HU17–HU20 |
| **E7 — Evoluções** | Itens futuros | HU21–HU24 |

## 2. Quadro-resumo

| ID | Título | Épico | Prioridade | Situação | RU | UC |
|---|---|---|---|---|---|---|
| HU01 | Entender a proposta do AgroTax | E5 | Must | Implementada | RU01 | UC01 |
| HU02 | Navegar entre as seções | E5 | Should | Implementada | RU01 | UC01 |
| HU03 | Escolher o produto | E1 | Must | Implementada e testada | RU02 | UC02 |
| HU04 | Informar os dados da operação | E1 | Must | Implementada e testada | RU03 | UC02 |
| HU05 | Ver o valor de cada tributo | E1 | Must | Implementada e testada | RU04 | UC02 |
| HU06 | Ver total, líquido e carga tributária | E1 | Must | Implementada e testada | RU04 | UC02 |
| HU07 | Ser avisado de que é uma estimativa | E1 | Must | Implementada | RU05 | UC01, UC02 |
| HU08 | Receber erro claro para dado inválido | E1 | Must | Implementada e testada | RU12 | UC02, UC04 |
| HU09 | Usar o site no celular | E5 | Should | Implementada (verificação manual pendente) | RU11 | UC01 |
| HU10 | Consultar o Guia Fiscal | E2 | Should | Implementada e testada | RU06 | UC03 |
| HU11 | Ver a faixa de alíquotas no guia | E2 | Could | Implementada e testada | RU06 | UC03 |
| HU12 | Enviar mensagem de contato | E3 | Should | Implementada e testada | RU07 | UC04 |
| HU13 | Barrar robôs e spam no contato | E3 | Should | Implementada e testada | RU07 | UC04 |
| HU14 | Consultar contatos recebidos | E4 | Should | Implementada e testada | RU09 | UC06 |
| HU15 | Atualizar alíquotas por data, sem mexer no código | E4 | Must | Implementada e testada (via SQL) | RU10 | UC07 |
| HU16 | Consultar uma simulação salva | E4 | Could | Implementada e testada (API) | RU08 | UC05 |
| HU17 | Iniciar o sistema com um comando | E6 | Should | Implementada (scripts não executados pela IA) | — | — |
| HU18 | Ter testes automatizados | E6 | Should | Implementada | — | — |
| HU19 | Proteger a API contra abuso | E6 | Must | Implementada (parte testada) | — | — |
| HU20 | Ter documentação clara | E6 | Must | Implementada | — | — |
| HU21 | Gerenciar regras em um painel | E7 | Won't | **[PROPOSTO]** | RU13 | — |
| HU22 | Exportar a simulação em PDF | E7 | Won't | **[PROPOSTO]** | RU14 | — |
| HU23 | Alíquotas por estado e por NCM | E7 | Won't | **[PROPOSTO]** | — | — |
| HU24 | Ter login e histórico próprio | E7 | Won't | **[PROPOSTO]** | — | — |

---

## 3. Histórias detalhadas

### E5 — Experiência de uso

#### HU01 — Entender a proposta do AgroTax
**Como** visitante, **quero** ver logo ao abrir o site o que o AgroTax faz, **para** decidir rapidamente se ele me serve.

```gherkin
Cenário: Página inicial
  Dado que abri o endereço do site
  Quando a página carrega
  Então vejo o título "Simplifique a sua estimativa tributária"
  E vejo os botões "Abrir calculadora" e "Conhecer o guia fiscal"
  E vejo os tributos considerados: ICMS, IPI, PIS/COFINS e Funrural
```

#### HU02 — Navegar entre as seções
**Como** visitante, **quero** um menu e botões que levem às seções, **para** chegar rápido ao que preciso.

```gherkin
Cenário: Menu superior
  Dado que estou em qualquer ponto da página
  Quando clico em "Calculadora", "Guia Fiscal" ou "Sobre"
  Então a página rola até a seção escolhida
  E o menu continua visível no topo
```

#### HU09 — Usar o site no celular
**Como** produtor no campo, **quero** usar o site no celular, **para** simular sem depender de um computador.

```gherkin
Cenário: Tela estreita
  Dado que abro o site em uma tela de até 820 px
  Quando a página carrega
  Então o formulário e o resultado aparecem um sob o outro
  E o botão "Calcular agora" continua no topo
  E não há rolagem horizontal
```

### E1 — Simulação tributária

#### HU03 — Escolher o produto
**Como** usuário, **quero** escolher o produto em uma lista, **para** que o cálculo use o item correto.

```gherkin
Cenário: Lista de produtos
  Dado que a API está no ar
  Quando a seção "Faça sua simulação" carrega
  Então o campo Produto lista os produtos ativos em ordem alfabética com o NCM

Cenário: Falha ao carregar produtos
  Dado que a API está fora do ar
  Quando a página carrega
  Então o campo Produto mostra "Não foi possível carregar os produtos"

Cenário: Produto não escolhido
  Dado que não selecionei produto
  Quando clico em "Calcular tributos"
  Então vejo "Selecione um produto." e nada é enviado
```

#### HU04 — Informar os dados da operação
**Como** usuário, **quero** informar valor, regime e tipo de operação, **para** simular minha situação real.

```gherkin
Cenário: Campos disponíveis
  Dado que estou na calculadora
  Então posso escolher o regime entre Lucro Presumido, Lucro Real, Simples Nacional e Produtor Rural PF
  E posso escolher a operação entre Compra e Venda
  E o campo valor aceita números com até 2 casas decimais

Cenário: Valor inválido
  Dado que deixei o valor vazio ou digitei 0
  Quando clico em "Calcular tributos"
  Então vejo "Informe um valor maior que zero." e nada é enviado
```

#### HU05 — Ver o valor de cada tributo
**Como** usuário, **quero** ver quanto cada tributo representa, **para** entender de onde vem o total.

```gherkin
Cenário: Estimativa de referência
  Dado que escolhi Soja em grão, valor R$ 100.000,00, regime "Produtor Rural PF" e operação "Venda"
  Quando clico em "Calcular tributos"
  Então vejo uma linha para cada tributo com alíquota e valor
  E ICMS = R$ 12.000,00 (12%)
  E Funrural = R$ 1.300,00 (1,3%)
  E SENAR = R$ 200,00 (0,2%)
  E IPI, PIS e COFINS = R$ 0,00
```

#### HU06 — Ver total, líquido e carga tributária
**Como** usuário, **quero** ver o total de tributos, o valor líquido e o percentual da carga, **para** avaliar se a operação compensa.

```gherkin
Cenário: Totais
  Dado o cenário de referência da HU05
  Quando o resultado é exibido
  Então o total estimado é R$ 13.500,00
  E a carga estimada é 13,5% sobre R$ 100.000,00
  E o valor líquido é R$ 86.500,00
```

#### HU07 — Ser avisado de que é uma estimativa
**Como** usuário, **quero** saber que o resultado é uma estimativa, **para** não tratá-lo como valor oficial.

```gherkin
Cenário: Avisos
  Dado que estou no site
  Então vejo, na página inicial, "Os resultados são estimativas e não substituem a análise de um contador ou especialista tributário."
  E vejo, abaixo do formulário, que o resultado é baseado nas regras cadastradas
  E vejo, no resultado, "Estimativa — confirme com um contador."
```

#### HU08 — Receber erro claro para dado inválido
**Como** usuário, **quero** mensagens claras quando algo está errado, **para** saber como corrigir.

```gherkin
Esquema do Cenário: Erros da API
  Dado que a API recebeu <entrada>
  Quando responde
  Então o status é <status> e a mensagem é <mensagem>

  Exemplos:
    | entrada               | status | mensagem                                                    |
    | valor negativo        | 400    | Informe um valor da operação entre R$ 0,01 e R$ 1 trilhão.  |
    | regime inexistente    | 400    | Regime tributário inválido.                                 |
    | produto inexistente   | 404    | Produto não encontrado.                                     |
    | JSON malformado       | 400    | JSON inválido.                                              |
    | 61ª simulação no minuto | 429  | Muitas requisições. Aguarde um instante.                    |
```

### E2 — Guia Fiscal

#### HU10 — Consultar o Guia Fiscal
**Como** estudante, **quero** ler o que é cada tributo, **para** entender a simulação.

```gherkin
Cenário: Cartões do guia
  Dado que abri a página
  Quando a seção "Guia fiscal" carrega
  Então vejo 6 cartões: ICMS, IPI, PIS, COFINS, Funrural e SENAR
  E cada cartão tem uma descrição

Cenário: Falha
  Dado que a API está fora do ar
  Então vejo "Não foi possível carregar o guia agora."
```

#### HU11 — Ver a faixa de alíquotas no guia
**Como** contadora, **quero** ver as alíquotas cadastradas, **para** conferir o que o sistema usa.

```gherkin
Cenário: Faixa vigente
  Dado que há regras de ICMS vigentes com alíquota 12%
  Quando o guia carrega
  Então o cartão do ICMS mostra "Alíquotas cadastradas: 12%"

Cenário: Mais de uma alíquota
  Dado que o PIS tem alíquotas vigentes de 0% a 1,65%
  Então o cartão do PIS mostra "Alíquotas cadastradas: 0% a 1,65%"
```

### E3 — Contato

#### HU12 — Enviar mensagem de contato
**Como** visitante, **quero** enviar nome, e-mail e mensagem, **para** falar com a equipe.

```gherkin
Cenário: Envio válido
  Dado que preenchi nome "Maria", e-mail "maria@exemplo.com" e mensagem "Quero saber mais."
  Quando clico em "Enviar mensagem"
  Então vejo "Mensagem enviada! Entraremos em contato."
  E o formulário é limpo
  E o contato fica gravado no banco

Cenário: Dados inválidos
  Dado que informei e-mail "ruim"
  Quando envio
  Então vejo "Informe um e-mail válido." e nada é gravado

Cenário: Privacidade
  Então vejo "Usamos seu nome e e-mail apenas para responder a esta mensagem."
```

#### HU13 — Barrar robôs e spam no contato
**Como** administrador, **quero** que robôs não encham o banco, **para** só ler mensagens de pessoas.

```gherkin
Cenário: Campo armadilha preenchido
  Dado que um robô preencheu o campo escondido "site"
  Quando envia o formulário
  Então a API responde sucesso ("Recebido.")
  E nada é gravado

Cenário: Excesso de envios
  Dado que um mesmo IP já enviou 5 contatos na última hora
  Quando tenta o 6º
  Então recebe 429
```

### E4 — Administração

#### HU14 — Consultar contatos recebidos
**Como** administrador, **quero** ler os contatos com segurança, **para** responder aos interessados.

```gherkin
Cenário: Token correto
  Dado que TOKEN_ADMIN está definido
  Quando chamo GET /api/leads com "Authorization: Bearer <token>"
  Então recebo até 100 contatos, do mais recente ao mais antigo

Cenário: Token errado ou ausente
  Quando chamo sem token ou com token errado
  Então recebo 401 "Não autorizado."

Cenário: Área desativada
  Dado que TOKEN_ADMIN está vazio
  Então recebo 404 "Área administrativa desativada."
```

#### HU15 — Atualizar alíquotas por data, sem mexer no código
**Como** administrador, **quero** inserir uma nova alíquota com data de início, **para** acompanhar a lei sem reescrever código.

```gherkin
Cenário: ICMS muda em 2027
  Dado uma regra de ICMS de 12% com vigente_ate = 2026-12-31
  E uma regra de ICMS de 18% com vigente_desde = 2027-01-01
  Quando simulo em 2026-12-31
  Então o ICMS usa 12%
  Quando simulo em 2027-02-01
  Então o ICMS usa 18%

Cenário: Regra específica vence a geral
  Dado uma regra de ICMS 12% para todos os produtos
  E uma regra de ICMS 4% para o produto 7
  Quando simulo o produto 7
  Então o ICMS usa 4%

Cenário: Alíquota inválida
  Quando insiro alíquota 150
  Então o banco rejeita (CHECK entre 0 e 100)
```

#### HU16 — Consultar uma simulação salva
**Como** integrador, **quero** buscar uma simulação pelo id, **para** reutilizar o resultado.

```gherkin
Cenário: Id existente
  Dado que a simulação 1 foi gravada
  Quando chamo GET /api/calculos/1
  Então recebo 200 com os valores em centavos e o resultado completo

Cenário: Id inexistente ou inválido
  Quando chamo GET /api/calculos/999 ou /api/calculos/abc
  Então recebo 404 "Simulação não encontrada."
```

### E6 — Plataforma e qualidade

#### HU17 — Iniciar o sistema com um comando
**Como** integrante da equipe, **quero** um script que prepare e inicie tudo, **para** rodar em qualquer máquina sem configuração manual.

```gherkin
Cenário: Primeira execução
  Dado que tenho Node.js 18 ou superior
  Quando executo iniciar.bat (Windows), iniciar.sh (Linux/macOS) ou iniciar.command (macOS)
  Então as dependências são instaladas se faltarem
  E o arquivo .env é criado a partir de .env.example
  E o servidor sobe em http://localhost:3000 e o navegador abre

Cenário: Sem Node.js
  Dado que o Node.js não está instalado
  Então o script informa onde instalar e termina
```

#### HU18 — Ter testes automatizados
**Como** integrante da equipe, **quero** testes que rodem com um comando, **para** mudar o código sem medo.

```gherkin
Cenário: Suíte
  Quando executo "npm test" na pasta API
  Então 16 testes rodam em banco de memória
  E todos passam
```

#### HU19 — Proteger a API contra abuso
**Como** equipe, **quero** limites e validações na API, **para** reduzir ataques comuns.

```gherkin
Cenário: Controles
  Então toda entrada é validada no servidor
  E as consultas SQL usam parâmetros
  E as respostas levam cabeçalhos de segurança (CSP, nosniff, frame deny)
  E o CORS só aceita origens configuradas
  E o corpo das requisições é limitado a 10 KB
  E há limite de requisições por IP no cálculo e no contato
```

#### HU20 — Ter documentação clara
**Como** professor ou novo integrante, **quero** documentos completos, **para** entender, avaliar e evoluir o sistema.

```gherkin
Cenário: Conjunto de documentos
  Então existem escopo, requisitos de usuário e de sistema, histórias, plano de testes,
       matriz de rastreabilidade, decisões arquiteturais, API, banco, segurança e manual do usuário
  E nenhum requisito Must fica sem implementação ou sem lacuna registrada
```

### E7 — Evoluções **[PROPOSTO]**

| ID | História | Observação |
|---|---|---|
| HU21 | **Como** administrador, **quero** um painel para cadastrar produtos e regras, **para** não editar SQL | Exige login de administrador |
| HU22 | **Como** contadora, **quero** exportar a simulação em PDF, **para** anexar ao atendimento | Exige exibir o id da simulação (RU13) |
| HU23 | **Como** produtor, **quero** alíquotas por estado e NCM, **para** estimativas mais próximas da realidade | Exige fonte oficial |
| HU24 | **Como** usuário, **quero** entrar na minha conta e ver meu histórico, **para** comparar simulações | Exige autenticação, senha com argon2 ou bcrypt |

---

## 4. Definição de Pronto (DoP) e de Concluído (DoD)

**Definition of Ready (pronta para desenvolver)**
- Tem ator, ação e benefício claros.
- Tem critérios de aceitação em Gherkin.
- Está ligada a um RU e, quando aplicável, a um UC.

**Definition of Done (concluída)**
- Código revisado em *pull request*.
- `npm test` passa e há teste novo quando há regra nova.
- Entradas inválidas rejeitadas no servidor.
- Documentos afetados atualizados (`api.md`, `banco-de-dados.md`, requisitos, matriz).
- Entrada no `CHANGELOG.md`.

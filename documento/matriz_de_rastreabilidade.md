# Matriz de Rastreabilidade — AgroTax

| Campo | Valor |
|---|---|
| **Versão do documento** | 1.0 |
| **Sistema** | AgroTax `agrotax-api` 2.0.0 |
| **Finalidade** | Mostrar, para cada necessidade do usuário, onde ela é descrita, implementada e verificada. Serve para achar requisitos órfãos e medir o impacto de uma mudança |
| **Documentos relacionados** | `escopo_do_projeto.md`, `requisitos_de_usuario.md`, `historias_de_usuario.md`, `requisitos_de_sistema.md`, `plano_de_testes.md` |

> Legenda de teste automatizado: **CT** = `calculadoraTributaria.test`, **VAL** = `validadores.test`, **CTRL** = `controladores.test`. Testes manuais: `CT-Mxx` em `plano_de_testes.md`.
> "—" significa que não há teste automatizado (e, quando aplicável, há caso manual).

## 1. Objetivos → Requisitos de usuário

| Objetivo (escopo) | Requisitos de usuário |
|---|---|
| OBJ-01 Simular tributos | RU02, RU03, RU04, RU05 |
| OBJ-02 Persistir em banco | RU04, RU07, RU08 |
| OBJ-03 Alíquotas atualizáveis sem código | RU10 |
| OBJ-04 Proteger a aplicação | RU09, RU12 (e RNF-SEG01 a SEG11) |
| OBJ-05 Qualidade verificável | todos (via plano de testes) |
| OBJ-06 Documentar | todos |
| OBJ-07 Publicar e executar | HU17 |

## 2. Requisitos de usuário → Casos de uso → Histórias → Requisitos de sistema → Código → Testes

| RU | UC | HU | RSF | Código principal | Automatizado | Manual | Situação |
|---|---|---|---|---|---|---|---|
| RU01 | UC01 | HU01, HU02 | RSF12 | `front-end/index.html`, `app.js` (estático) | — | CT-M01, CT-M02 | Implementado |
| RU02 | UC02 | HU03 | RSF01 | `produtoModelo.js`, `calculadora.js` | CTRL | CT-M03, CT-M05 | Implementado e testado |
| RU03 | UC02 | HU04 | RSF02 | `validadores.js`, `calculadora.js` | VAL | CT-M03, CT-M04, CT-M15 | Implementado e testado |
| RU04 | UC02 | HU05, HU06 | RSF03, RSF04, RSF05 | `calculadoraTributaria.js`, `calculadoraServico.js`, `simulacaoModelo.js` | CT, CTRL | CT-M03 | Implementado e testado |
| RU05 | UC01, UC02 | HU07 | — | `index.html`, `calculadora.js` | — | CT-M01, CT-M03 | Implementado |
| RU06 | UC03 | HU10, HU11 | RSF07 | `guiaServico.js`, `guia.js` | CTRL | CT-M06 | Implementado e testado |
| RU07 | UC04 | HU12, HU13 | RSF08, RSF09 | `leadServico.js`, `validadores.js`, `leadModelo.js`, `contato.js` | VAL, CTRL | CT-M07, CT-M08, CT-M09, CT-M11 | Implementado e testado |
| RU08 | UC05 | HU16 | RSF06 | `calculadoraControlador.js`, `simulacaoModelo.js` | CTRL | CT-M22 | Implementado e testado (API) |
| RU09 | UC06 | HU14 | RSF10 | `autenticacaoAdmin.js`, `leadModelo.js` | CTRL | CT-M12 | Implementado e testado |
| RU10 | UC07 | HU15 | RSF03, RSF11 | `schema.sql`, `dados_iniciais.sql`, `iniciarBanco.js` | CT, CTRL | CT-M19, CT-M21 | Implementado (via SQL) |
| RU11 | UC01, UC02 | HU09 | — | `estilo.css` | — | CT-M17 | Implementado; verificação manual pendente |
| RU12 | UC02, UC04 | HU08 | RSF15, RSF16 | `erros.js`, `limitadorRequisicoes.js`, `calculadora.js` | CTRL (parcial) | CT-M04, CT-M05, CT-M10, CT-M16 | Implementado (parte testada) |
| RU13 | — | HU21 | RSF20 | — | — | — | **[PROPOSTO]** |
| RU14 | — | HU22 | RSF20 | — | — | — | **[PROPOSTO]** |

## 3. Requisitos de sistema sem origem em RU (técnicos)

| RSF | Descrição | Origem | Código | Teste |
|---|---|---|---|---|
| RSF13 | `GET /api/saude` | Operação / monitoramento | `app.js` | — |
| RSF14 | Log por requisição | Observabilidade (RNF-OBS01) | `registroRequisicoes.js` | — |
| RSF17 | Cabeçalhos de segurança | Segurança (RNF-SEG03, SEG04, SEG10) | `seguranca.js` | CT-M13 |
| RSF18 | CORS restrito | Segurança (RNF-SEG06) | `app.js` | CT-M14 |
| RSF19 | Cadastro por interface | **[PROPOSTO]** | — | — |

## 4. Requisitos não funcionais → verificação

| Grupo | IDs | Como é verificado |
|---|---|---|
| Adequação funcional | RNF-FUN01, FUN02 | CT, CTRL |
| Desempenho | RNF-DES01 (meta), DES02 | Não medido; CT-M16 |
| Compatibilidade | RNF-COM01, COM02 | `engines` no `package.json` |
| Usabilidade | RNF-USA01 a USA06 | CT-M17, CT-M18 |
| Confiabilidade | RNF-CON01 a CON05 | CTRL (CON01); revisão de código; CON05 não atendido |
| Segurança | RNF-SEG01 a SEG11 | VAL, CTRL (SEG01, SEG07); CT-M12 a CT-M15; revisão de código |
| Manutenibilidade | RNF-MAN01 a MAN04 | Revisão de código; CT |
| Portabilidade | RNF-POR01, POR02 | CT-M20 |
| Privacidade e observabilidade | RNF-PRI01 a PRI03, OBS01 | Revisão do formulário e do código |

## 5. Casos de aceitação (escopo) → verificação

| CA | Verificação |
|---|---|
| CA-01 Sistema sobe sem configuração | CT-M20 |
| CA-02 Testes passam | `npm test` (16/16) |
| CA-03 Simulação de referência | CTRL (teste 12), CT-M03 |
| CA-04 Entrada inválida rejeitada | VAL, CTRL, CT-M04, CT-M08, CT-M15 |
| CA-05 Regra versionada | CT (teste 2), CT-M19 |
| CA-06 Área administrativa protegida | CTRL (teste 16), CT-M12 |
| CA-07 Banco idempotente | CTRL (testes 11 e 12), CT-M21 |
| CA-08 Segredos fora do Git | CT-M23 |
| CA-09 Documentação completa | Esta matriz |

## 6. Lacunas por requisito

| Lacuna | Requisitos afetados |
|---|---|
| L-02 Disco efêmero | RU04, RU07 (dados somem a cada deploy) |
| L-04 Id sequencial sem autenticação | RU08 |
| L-05 Sem painel | RU10 |
| L-08 Sem testes HTTP | RU01, RU12, RSF12–RSF18 |
| L-11 Sem política LGPD | RU07 |
| L-15 Data em UTC | RU04, RU10 |
| L-17 Modelo tributário simplificado | RU04 |

## 7. Como usar esta matriz numa mudança

1. Localize o requisito afetado na tabela 2.
2. Veja o código e os testes da mesma linha: são o que precisa ser alterado ou criado.
3. Atualize os documentos citados na linha (história, caso de uso, API, banco).
4. Registre no `CHANGELOG.md`.

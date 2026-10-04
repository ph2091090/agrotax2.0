# Como colocar o AgroTax no GitHub (passo a passo)

Seu repositório **já existe** no GitHub. Então o caminho é: **baixar o repositório, colocar os arquivos
novos por cima, enviar de volta.** Faça numa branch separada: se algo der errado, o `main` continua intacto.

## 0. Antes de começar (uma vez só)

1. Instale o **Git**: https://git-scm.com/downloads (pode deixar tudo no padrão).
2. Instale o **Node.js 18+** (versão LTS): https://nodejs.org
3. No terminal do VS Code (`Ctrl + '`), configure seu nome e e-mail (os mesmos do GitHub):
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu-email@exemplo.com"
   ```
4. Confira: `git --version` e `node --version` devem mostrar números.

## 1. Baixar o repositório atual

Copie o endereço em **Code → HTTPS** na página do repositório e rode:

```bash
git clone https://github.com/SEU-USUARIO/AgroTax.git
cd AgroTax
git checkout -b refatoracao
```

(`git checkout -b refatoracao` cria uma branch nova chamada `refatoracao`.)

## 2. Colocar os arquivos novos

1. Extraia o `AgroTax.zip` que eu enviei.
2. **Copie o conteúdo** da pasta extraída (`API`, `front-end`, `documento`, `README.md`, `.gitignore`, `PASSO_A_PASSO_GITHUB.md`)
   para dentro da pasta `AgroTax` que você clonou, **substituindo** os arquivos com o mesmo nome.
3. **Apague o que ficou velho**: `front-end/js/tailwind.js` (o novo site usa `estilo.css`) e qualquer arquivo
   antigo em `API/src/` que não exista mais na estrutura nova.
4. **Escopo:** o escopo novo se chama `documento/escopo_do_projeto.md`. Apague o antigo
   (`documento/escopo_projeto_agrotax.md`) para não ficar com dois: `git rm documento/escopo_projeto_agrotax.md`.
   Os arquivos `escopo_projeto_novictium.md` e `plano_landingpage_nodejs.md` são de outro assunto: mantenha ou apague,
   como o grupo preferir.
5. Confira que existem na raiz `iniciar.bat`, `iniciar.sh` e `iniciar.command`, e `API/dados/.gitkeep`
   (a pasta `dados/` precisa existir no GitHub, mas o banco `.db` dentro dela não vai).

## 3. Testar antes de enviar

```bash
cd API
npm install
npm test        # tem que mostrar: pass 16, fail 0
npm run dev     # abra http://localhost:3000 e teste uma simulação e o formulário de contato
```

Atalho: em vez desses comandos, dê duplo clique em `iniciar.bat` (Windows) ou `iniciar.command` (macOS),
ou rode `./iniciar.sh` (Linux/macOS). Ele instala, cria o `.env` e abre o navegador.
Depois percorra os casos manuais de `documento/plano_de_testes.md` e anote os resultados.

Pare o servidor com `Ctrl + C` e volte para a pasta principal: `cd ..`

> O `npm install` cria o `package-lock.json`. **Envie esse arquivo também** (ele trava as versões).

## 4. Conferir que nada secreto vai junto

```bash
git status
```

- ✅ Deve aparecer: `API/`, `front-end/`, `documento/`, `README.md`...
- ❌ **Não pode aparecer:** `.env`, `node_modules/`, `dados/` ou arquivos `.db`.
  Se aparecerem, o `.gitignore` não foi copiado: copie de novo antes de continuar.

## 5. Salvar (commit) e enviar (push)

```bash
git add .
git commit -m "Refatora AgroTax: banco SQLite, API em camadas, seguranca, testes e documentacao"
git push -u origin refatoracao
```

Na primeira vez o GitHub vai pedir login:

- **VS Code / navegador:** uma janela abre pedindo para autorizar. Clique em autorizar e pronto.
- **Se pedir usuário e senha no terminal:** a senha **não** é a da sua conta. Use um *Personal Access Token*:
  GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token,
  marque `repo`, copie o token e cole no lugar da senha.

## 6. Juntar na branch principal

1. Abra o repositório no GitHub. Vai aparecer o botão **Compare & pull request**. Clique.
2. Confira os arquivos alterados e clique em **Create pull request** e depois **Merge pull request**.
3. De volta ao terminal, para atualizar sua cópia local:
   ```bash
   git checkout main
   git pull
   ```
   (se a sua branch principal se chamar `master`, troque `main` por `master`.)

## 7. Atualizar o site no Render

No painel do Render, abra o serviço do AgroTax → **Settings** e confira:

| Campo | Valor |
|---|---|
| Root Directory | `API` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Branch | a que você acabou de juntar (`main`) |

Em **Environment** adicione `NODE_ENV` = `production`. Para consultar os contatos, adicione também `TOKEN_ADMIN`
com um valor longo e aleatório (gere com `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).

Clique em **Manual Deploy → Deploy latest commit** e espere. Depois teste https://agrotax.onrender.com.

> ⚠️ No plano gratuito do Render o banco SQLite volta ao inicial a cada deploy. Para a apresentação isso é
> aceitável; a documentação explica como resolver.

## 8. Depois, no dia a dia

```bash
git status                       # o que mudou
git add .                        # separa tudo para o commit
git commit -m "o que voce fez"   # salva com uma mensagem
git push                         # envia para o GitHub
git pull                         # baixa o que seus colegas enviaram
```

Em grupo: **sempre `git pull` antes de começar a mexer**, para evitar conflitos.

## Problemas comuns

| Mensagem | O que fazer |
|---|---|
| `fatal: not a git repository` | Você não está dentro da pasta do projeto: use `cd AgroTax` |
| `Authentication failed` | Use o token do passo 5 em vez da senha |
| `rejected ... fetch first` | Alguém enviou antes: rode `git pull` e depois `git push` |
| `.env` apareceu no `git status` | Rode `git rm --cached API/.env` e confira o `.gitignore`. Se já foi enviado, **troque** o `TOKEN_ADMIN` |
| `npm: command not found` | Instale o Node.js e reabra o VS Code |
| Site no Render mostra erro | Veja a aba **Logs** do serviço; confira Root Directory = `API` |

## Checklist final antes de apresentar

- [ ] `npm test` passa
- [ ] Simulação e formulário de contato funcionam no site publicado
- [ ] `.env` e `node_modules` **não** estão no GitHub
- [ ] README, `documento/` e o novo escopo estão no repositório
- [ ] Campos **[PREENCHER]** foram preenchidos em `escopo_do_projeto.md`, `historias_de_usuario.md`, `plano_de_testes.md` e `CHANGELOG.md` (equipe, disciplina, datas, link, responsáveis)
- [ ] Casos manuais do `plano_de_testes.md` executados e registrados

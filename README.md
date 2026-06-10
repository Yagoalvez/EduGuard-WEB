# EduGuard — Sistema de Gestão Escolar Infantil

Sistema web desenvolvido para auxiliar escolas de educação infantil na gestão de alunos, responsáveis, funcionários, turmas, entrada e saída, rotina diária, medicação, comunicados, histórico, portal dos responsáveis e logs administrativos.

O projeto foi organizado com separação entre **frontend**, **backend** e **banco de dados**, utilizando uma API REST no backend e uma interface web em React no frontend.

---

## Arquitetura Geral

```text
Frontend (React + Vite) → Backend (Node.js + Express REST API) → PostgreSQL
```

O frontend é responsável pela interface do usuário.  
O backend concentra as regras de negócio, autenticação, permissões e rotas da API.  
O PostgreSQL é responsável pela persistência dos dados.

---

## Organização MVC, REST e Clean Code

O projeto foi estruturado buscando separar responsabilidades e facilitar manutenção.

No **frontend**, as telas em `pages/` funcionam como a camada de **View**, os componentes reutilizáveis ficam em `components/`, o estado global de autenticação fica em `context/`, e a comunicação com a API fica em `services/`.

No **backend**, a estrutura segue uma organização em camadas:

| Camada | Responsabilidade |
|---|---|
| `routes/` | Define os endpoints da API |
| `controllers/` | Recebe requisições e retorna respostas HTTP |
| `services/` | Concentra regras de negócio |
| `repositories/` | Executa queries SQL no PostgreSQL |
| `middleware/` | Cuida de autenticação, autorização e validações intermediárias |
| `config/` | Configura conexão com banco e outras ferramentas |
| `utils/` | Funções auxiliares reutilizáveis |

Fluxo principal do backend:

```text
Route → Controller → Service → Repository → PostgreSQL
```

Essa separação evita misturar interface, regra de negócio e acesso ao banco no mesmo arquivo, deixando o projeto mais limpo, organizado e fácil de evoluir.

---

## Estrutura de Pastas

```text
eduguard/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js
│   └── server.js
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Lucide React
- CSS puro com variáveis globais
- Design system próprio

### Backend

- Node.js
- Express
- PostgreSQL com `pg`
- JWT para autenticação
- bcrypt para hash de senhas
- CORS
- multer

### Banco de Dados

- PostgreSQL
- Scripts SQL em `database/schema.sql` e `database/seed.sql`

---

## Funcionalidades Principais

- Login com autenticação JWT
- Controle de acesso por cargo/perfil
- Login de responsáveis
- Portal exclusivo para responsáveis
- Controle de acesso por tipo de usuário
- Dashboard administrativo
- Gestão de alunos
- Gestão de responsáveis/famílias
- Gestão de funcionários/equipe
- Ativação e desativação de funcionários
- Gestão de turmas
- Designação de professor responsável por turma
- Bloqueio para impedir aluno em duas turmas ao mesmo tempo
- Registro de entrada dos alunos
- Liberação de saída com validação por CPF do responsável
- Exibição de foto do aluno, responsável e funcionário
- Registro de rotina diária: alimentação, higiene e sono
- Controle de medicação com receita médica
- Visualização da receita anexada
- Registro de administração de medicação
- Medicação administrada no histórico do aluno
- Publicação de comunicados
- Comunicação para todas as turmas
- Comunicação para turma específica
- Comunicação para responsáveis específicos
- Resposta de comunicados pelos responsáveis
- Visualização das respostas na aba Comunicados
- Histórico de atividades do aluno
- Logs de auditoria do sistema
- Filtro de logs por data
- Perfil do usuário

---

## Como Rodar o Projeto

### Pré-requisitos

Antes de rodar o projeto, instale:

- Node.js
- npm
- PostgreSQL
- VS Code ou outro editor

Para verificar se o Node e o npm estão instalados:

```bash
node -v
npm -v
```

---

## 1. Abrir o projeto no VS Code

Abra a pasta principal do projeto:

```text
eduguard
```

A estrutura deve ficar parecida com:

```text
eduguard/
├── backend/
├── database/
├── frontend/
├── README.md
└── .gitignore
```

---

## 2. Configurar o Backend

Entre na pasta do backend:

```bash
cd backend
```

Crie o arquivo `.env` a partir do exemplo.

### Windows

```cmd
copy .env.example .env
```

### Linux/Mac

```bash
cp .env.example .env
```

Abra o arquivo `.env` e configure os dados do PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=SUA_SENHA_AQUI
DB_NAME=eduguard
JWT_SECRET=eduguard-secret-key-2026
PORT=3000
FCM_SERVER_KEY=
```

Troque `SUA_SENHA_AQUI` pela senha do seu PostgreSQL.

---

## 3. Instalar as Dependências do Backend

Ainda dentro da pasta `backend`, rode:

```bash
npm install
```

---

## 4. Criar o Banco de Dados no PostgreSQL

Antes de rodar o seed, é necessário criar o banco de dados `eduguard` no PostgreSQL.

O projeto **não cria o banco automaticamente**.  
O comando `npm run seed` cria/recria as tabelas e insere os dados iniciais, mas o banco `eduguard` precisa existir antes.

### Opção 1 — Criar pelo pgAdmin

1. Abra o pgAdmin.
2. Clique com o botão direito em **Databases**.
3. Clique em **Create > Database**.
4. No campo **Database**, digite:

```text
eduguard
```

5. Clique em **Save**.

---

## 5. Criar as Tabelas e Popular o Banco

Depois de criar o banco `eduguard`, ainda dentro da pasta `backend`, rode:

```bash
npm run seed
```

Esse comando executa os scripts `schema.sql` e `seed.sql`, criando as tabelas e inserindo os dados iniciais do sistema.

Se aparecer uma mensagem parecida com esta, está correto:

```text
Seed executado com sucesso!
```

Atenção: o comando `npm run seed` recria as tabelas do banco.  
Ele pode apagar dados existentes no banco local antes de inserir novamente os dados de teste.

Use esse comando apenas em ambiente de desenvolvimento ou demonstração.

---

## 6. Rodar o Backend

Ainda dentro da pasta `backend`, rode:

```bash
npm run dev
```

O backend será iniciado em:

```text
http://localhost:3000
```

Para testar se a API está funcionando, abra no navegador:

```text
http://localhost:3000/api/health
```

Se aparecer status OK, o backend está rodando corretamente.

---

## 7. Rodar o Frontend

Abra outro terminal no VS Code.

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o frontend:

```bash
npm run dev
```

O frontend será iniciado em:

```text
http://localhost:5173
```

Acesse no navegador:

```text
http://localhost:5173
```

---

## Ordem Correta para Rodar

Use dois terminais.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

---

## Observação sobre o Seed

Use o comando abaixo somente quando quiser resetar o banco de dados:

```bash
cd backend
npm run seed
```

Atenção: esse comando apaga os dados atuais e recria tudo com base no `seed.sql`.

Se você cadastrou dados pela interface web e depois rodar `npm run seed`, esses dados podem sumir caso não estejam no seed.

---

## Logins de Teste

### Funcionários

| Perfil | E-mail | Senha |
|---|---|---|
| Diretor | `Romulo@diretor.com` | `12345678` |
| Porteiro | `carlos@escola.com` | `12345678` |

### Responsáveis

Todos os responsáveis cadastrados no seed possuem senha padrão:

```text
12345678
```

Exemplos principais:

| Responsável | E-mail | Senha | Aluno vinculado |
|---|---|---|---|
| Mariano Rocha Freitas | `marianorocha@gmail.com` | `12345678` | Heitor Andrade |
| Kushina Uzumaki | `kushina@gmail.com` | `12345678` | Naruto Uzumaki |
| Minato Namikaze | `minato@gmail.com` | `12345678` | Naruto Uzumaki |

---

## Comunicados de Demonstração

O seed cria comunicados organizados para testar as regras de visibilidade.

### 1. Comunicado geral

```text
Título: Aviso Geral da Escola
Destino: Todas as turmas
Visibilidade: Todos os responsáveis com alunos vinculados
```

### 2. Comunicado de turma específica

```text
Título: Atividade do 3º Ano A
Destino: Turma específica
Visibilidade: Apenas responsáveis de alunos da turma 3º Ano A
```

### 3. Comunicado para responsável específico

```text
Título: Convocação de Responsável
Destino: Responsáveis específicos
Responsável selecionado: Kushina Uzumaki
Visibilidade: Apenas Kushina Uzumaki
```

Observação importante:

Se o aluno tiver dois responsáveis, somente o responsável selecionado diretamente no comunicado específico poderá visualizar esse comunicado.

Exemplo:

```text
Naruto tem Kushina e Minato.
Se o comunicado foi enviado apenas para Kushina:
- Kushina vê.
- Minato não vê.
```

---

## Telas do Sistema

1. **Login** — autenticação com e-mail e senha.
2. **Dashboard** — painel inicial com estatísticas e acesso rápido.
3. **Alunos** — cadastro, edição, consulta, turma, professor e vínculo familiar.
4. **Famílias / Responsáveis** — gestão dos responsáveis dos alunos e seus vínculos.
5. **Equipe / Funcionários** — gestão dos funcionários da escola.
6. **Turmas** — criação e gestão de turmas com professor responsável.
7. **Registro de Frequência** — registro de entrada e liberação de saída dos alunos.
8. **Rotina Diária** — registro de alimentação, higiene e sono.
9. **Medicação** — agendamento e administração de medicamentos com receita.
10. **Comunicados** — publicação de avisos, convocações e visualização de respostas.
11. **Histórico** — timeline de atividades do aluno por período.
12. **Logs** — auditoria de ações do sistema.
13. **Perfil** — visualização e edição dos dados do usuário.
14. **Portal do Responsável** — área exclusiva para responsáveis acompanharem alunos vinculados, comunicados e resumo diário.

---

## Permissões por Perfil

### Diretor

- Acesso total ao sistema.

### Coordenador

- Acesso total ao sistema.

### Secretário

- Acesso a comunicados.
- Consulta de histórico.
- Logs do sistema.
- Acesso às funções principais administrativas.

### Professor

- Acesso a alunos.
- Acesso a responsáveis/famílias.
- Acesso a turmas.
- Acesso à rotina diária.
- Acesso à medicação.
- Acesso a comunicados.
- Consulta de histórico.

### Porteiro

- Acesso a alunos.
- Acesso a famílias/responsáveis.
- Acesso ao Registro de Frequência.

### Responsável

- Acesso apenas ao Portal do Responsável.
- Visualiza somente os alunos vinculados a ele.
- Visualiza comunicados destinados a ele, à turma do aluno ou a todas as turmas.
- Pode responder comunicados.
- Não acessa áreas administrativas.

---

## Endpoints Principais

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Login do usuário |
| GET | `/api/auth/me` | Dados do usuário autenticado |
| POST | `/api/auth/logout` | Logout |

### Usuários / Funcionários

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/usuarios` | Lista funcionários/usuários |
| POST | `/api/usuarios` | Cadastra funcionário/usuário |
| PUT | `/api/usuarios/:id` | Atualiza funcionário/usuário |
| PATCH | `/api/usuarios/:id/status` | Ativa ou inativa funcionário/usuário |

### Alunos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/alunos` | Lista alunos |
| POST | `/api/alunos` | Cadastra aluno |
| GET | `/api/alunos/:id` | Consulta aluno por ID |
| PUT | `/api/alunos/:id` | Atualiza aluno |

### Responsáveis

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/responsaveis` | Lista responsáveis |
| POST | `/api/responsaveis` | Cadastra responsável |
| GET | `/api/responsaveis/:id` | Consulta responsável por ID |
| PUT | `/api/responsaveis/:id` | Atualiza responsável |
| POST | `/api/responsaveis/:id/alunos` | Vincula aluno ao responsável |
| DELETE | `/api/responsaveis/:id/alunos/:idAluno` | Remove vínculo entre aluno e responsável |

### Turmas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/turmas` | Lista turmas |
| POST | `/api/turmas` | Cria turma |
| PUT | `/api/turmas/:id` | Atualiza turma |

### Registro de Frequência

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/ponto` | Lista registros de frequência |
| POST | `/api/ponto/entrada` | Registra entrada da criança |
| POST | `/api/ponto/validar-responsavel` | Valida responsável por CPF |
| POST | `/api/ponto/saida` | Libera saída da criança |

### Rotina

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/rotina` | Consulta rotina |
| POST | `/api/rotina` | Registra rotina diária |

### Medicação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/medicacao` | Lista medicações |
| POST | `/api/medicacao` | Agenda medicação |
| POST | `/api/medicacao/:id/administrar` | Registra administração de medicação |

### Comunicados

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/comunicacao/avisos` | Lista comunicados |
| POST | `/api/comunicacao/avisos` | Publica comunicado |
| PUT | `/api/comunicacao/avisos/:id` | Edita comunicado |
| POST | `/api/comunicacao/avisos/:id/responder` | Registra resposta do responsável |

### Portal do Responsável

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/portal/alunos` | Lista alunos vinculados ao responsável |
| GET | `/api/portal/comunicados` | Lista comunicados visíveis para o responsável |

### Logs

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/logs` | Lista logs do sistema |

---

## Como Funciona o Fluxo do Sistema

### Login de Funcionário

```text
1. O funcionário digita e-mail e senha no frontend.
2. O frontend envia os dados para o backend pela rota /api/auth/login.
3. O backend consulta o PostgreSQL.
4. O backend valida a senha.
5. Se estiver correto, gera um token JWT.
6. O frontend armazena o token.
7. O funcionário acessa as telas protegidas conforme seu perfil.
```

### Login de Responsável

```text
1. O responsável digita e-mail e senha na tela de login.
2. O backend identifica que o usuário é um responsável.
3. Se a senha estiver correta, gera um token JWT com tipo_usuario = responsavel.
4. O frontend redireciona para o Portal do Responsável.
5. O responsável visualiza apenas os alunos vinculados a ele e seus comunicados permitidos.
```

### Registro de Entrada

```text
1. O usuário seleciona a criança na tela de Registro de Frequência.
2. O frontend envia a requisição para /api/ponto/entrada.
3. O backend valida autenticação e permissão.
4. O service aplica as regras de negócio.
5. O sistema impede entrada duplicada no mesmo dia.
6. O repository grava o registro no PostgreSQL.
7. O frontend atualiza a lista de registros do dia.
```

### Liberação de Saída

```text
1. O usuário seleciona a criança.
2. O sistema exige o CPF da pessoa responsável.
3. O backend valida se o CPF pertence a uma pessoa responsável vinculada à criança.
4. Se a validação for permitida, o sistema libera o botão de saída.
5. O backend impede saída sem entrada e saída duplicada no mesmo dia.
6. O registro é salvo no PostgreSQL.
7. O log da ação é registrado.
```

### Comunicados

```text
1. Usuários autorizados criam comunicados.
2. O comunicado pode ser geral, de turma específica ou para responsáveis específicos.
3. Responsáveis visualizam apenas os comunicados permitidos.
4. Responsáveis podem responder comunicados pelo portal.
5. As respostas aparecem na aba Comunicados para usuários autorizados.
6. As ações também são registradas nos Logs.
```

### Logs do Sistema

```text
1. A cada ação importante, o backend registra um log.
2. O log armazena tipo, ação, descrição, responsável pela ação e data/hora.
3. A tela de Logs permite consultar os registros.
4. Os logs são somente leitura e não podem ser editados ou excluídos pela interface.
```

---

## Problemas Comuns

| Problema | Solução |
|---|---|
| Erro de conexão com banco | Verifique se o PostgreSQL está rodando e se o `.env` está correto |
| Banco `eduguard` não encontrado | Crie o banco no PostgreSQL antes de rodar o seed |
| `psql` não é reconhecido | Use o caminho completo do PostgreSQL ou configure o PATH |
| Porta 3000 em uso | Feche o terminal antigo ou altere `PORT` no `.env` |
| Porta 5173 em uso | Use a porta indicada pelo Vite no terminal |
| Login não funciona | Verifique se o `npm run seed` foi executado no backend |
| Erro de CORS | Confirme se o frontend está em `http://localhost:5173` |
| Frontend abre, mas não carrega dados | Confirme se o backend está rodando em `http://localhost:3000` |
| Imagens ou receitas não aparecem | Confirme se o backend está rodando e servindo arquivos de uploads |
| Banco sem dados | Rode `npm run seed` dentro da pasta `backend` |

---

## Entrega e GitHub

Antes de entregar ou subir o projeto no GitHub, confira se o `.gitignore` contém:

```gitignore
node_modules/
dist/
.env
uploads/
*.log
.DS_Store
```

Não envie:

```text
node_modules/
dist/
.env
uploads/
*.log
```

Esses arquivos e pastas devem ficar apenas no ambiente local.

O arquivo correto para orientar configuração é:

```text
backend/.env.example
```

---

## Status do Projeto

Projeto funcional para execução local, com frontend em React, backend em Node.js/Express, banco PostgreSQL, autenticação JWT, controle de permissões por perfil, portal dos responsáveis e organização em camadas REST.

A aplicação possui os principais fluxos acadêmicos implementados: gestão de alunos, responsáveis, funcionários, turmas, registro de frequência, rotina, medicação, comunicados, portal dos responsáveis, histórico e logs administrativos.

---

## Evoluções Futuras

- Autenticação multifator.
- Integração real com notificações push.
- Publicação em ambiente de produção.
- Melhorias de relatórios gerenciais.
- Versão mobile, caso seja definida como responsabilidade de outra frente do projeto.

---

## Licença

Projeto acadêmico desenvolvido para o curso de Análise e Desenvolvimento de Sistemas.

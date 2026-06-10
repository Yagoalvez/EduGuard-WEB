# EduGuard Web

Sistema web para gestão escolar infantil, desenvolvido para centralizar informações de alunos, responsáveis, funcionários, turmas, frequência, rotina diária, comunicados, histórico e logs do sistema.

O EduGuard tem como objetivo facilitar a organização da escola, melhorar a comunicação com os responsáveis e aumentar a segurança no acompanhamento diário das crianças.

---

## Funcionalidades principais

### Autenticação

* Login de funcionários.
* Login de responsáveis.
* Autenticação com token JWT.
* Controle de acesso por perfil.
* Bloqueio de login para usuários inativos.

### Alunos

* Cadastro de alunos.
* Edição de dados.
* Matrícula automática.
* Busca por nome e matrícula.
* Filtro por turma.
* Ativação e desativação.
* Remoção segura, preservando histórico quando necessário.

### Responsáveis / Famílias

* Cadastro de responsáveis.
* Edição de dados.
* Vinculação entre responsável e aluno.
* Filtro por turma.
* Ativação e desativação de acesso.
* Reativação de acesso.
* Remoção segura quando permitido.
* Bloqueio de acesso para responsáveis inativos.

### Funcionários / Equipe

* Cadastro de funcionários.
* Matrícula automática.
* Edição de dados.
* Filtro por função.
* Ativação e desativação de acesso.
* Reativação de acesso.
* Bloqueio de login para funcionários inativos.
* Proteção para impedir que o diretor logado remova ou desative a si mesmo.

### Turmas

* Cadastro de turmas.
* Edição de turmas.
* Ativação e desativação.
* Enturmação de alunos.
* Remoção de aluno da turma.
* Busca rápida de aluno por nome ou matrícula.

### Registro de Frequência

* Registro de entrada.
* Registro de saída.
* Validação de CPF do responsável na saída.
* Bloqueio de entrada duplicada no mesmo dia.
* Bloqueio de saída duplicada no mesmo dia.
* Filtro por turma.
* Busca por nome ou matrícula.
* Exibição dos registros computados do dia.
* Acesso restrito a Diretor e Porteiro.

### Rotina Diária

* Registro da rotina do aluno.
* Registro de alimentação, higiene, sono e observações.
* Filtro por turma.
* Seleção de aluno filtrada pela turma.
* Registros do dia.
* Histórico da rotina.
* Bloqueio de rotina para aluno sem entrada registrada no dia.

### Comunicados / Avisos

* Criação de comunicados.
* Comunicados gerais.
* Comunicados por turma.
* Comunicados para responsáveis específicos.
* Resposta de responsáveis.
* Visualização das respostas pelos funcionários autorizados.
* Remoção de comunicados.

### Portal do Responsável

* Acesso separado para responsáveis.
* Visualização apenas das crianças vinculadas.
* Visualização de comunicados permitidos.
* Resposta a comunicados.
* Bloqueio de acesso para responsável inativo.

### Histórico do Aluno

* Timeline com registros de frequência.
* Timeline com registros de rotina.
* Filtro por turma.
* Seleção de aluno por turma.

### Logs do Sistema

* Registro de ações importantes.
* Exibição de quem realizou a ação.
* Exibição do que foi feito.
* Exibição de data e hora.
* Logs com nomes reais em vez de IDs técnicos.
* Apoio à auditoria e rastreabilidade do sistema.

---

## Perfis de usuário

### Diretor

Perfil com maior nível de acesso administrativo.

Pode acessar e gerenciar:

* Alunos.
* Responsáveis.
* Funcionários.
* Turmas.
* Frequência.
* Rotina.
* Comunicados.
* Histórico.
* Logs.

### Porteiro

Perfil voltado ao controle de entrada e saída.

Pode acessar:

* Alunos.
* Responsáveis.
* Registro de Frequência.

### Professor

Perfil voltado ao acompanhamento pedagógico e à rotina escolar.

Pode acessar módulos permitidos conforme as regras do sistema, sem acesso ao Registro de Frequência.

### Secretário / Coordenador

Perfis administrativos com acesso conforme permissões definidas no sistema.

### Responsável

Perfil externo, com acesso apenas ao Portal do Responsável.

Pode visualizar:

* Crianças vinculadas.
* Comunicados permitidos.
* Resumo/rotina quando disponível.
* Responder comunicados.

---

## Tecnologias utilizadas

### Frontend

* React.js
* Vite
* React Router
* JavaScript
* CSS
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* JWT
* bcrypt
* Multer

### Banco de dados

* PostgreSQL
* Supabase/PostgreSQL, conforme configuração do arquivo `.env`

---

## Arquitetura geral

Fluxo principal da aplicação:

```text
Frontend React
    ↓
Backend Node.js / Express
    ↓
Prisma ORM
    ↓
PostgreSQL / Supabase
```

O frontend não acessa diretamente o banco de dados. Toda comunicação passa pelo backend, que valida regras de negócio, autenticação e permissões antes de consultar ou alterar dados.

---

## Estrutura do projeto

```text
eduguard/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── database/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── README.md
└── package.json
```

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Yagoalvez/EduGuard-Web.git
cd EduGuard-Web
```

---

## Configurar o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example`.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Inicie o backend:

```bash
npm run dev
```

O backend deve rodar em:

```text
http://localhost:3000
```

---

## Configurar o frontend

Em outro terminal, entre na pasta do frontend:

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

O frontend deve rodar em:

```text
http://localhost:5173
```

---

## Comandos úteis

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Build do frontend

```bash
cd frontend
npm run build
```

---

## Observações sobre segurança

* O arquivo `.env` não deve ser enviado ao GitHub.
* Credenciais do banco de dados devem ficar apenas no backend.
* O frontend não deve conter `DATABASE_URL`.
* O acesso ao sistema é controlado por JWT.
* Perfis possuem permissões diferentes.
* Responsáveis acessam apenas dados vinculados a eles.

---

## Arquivos que não devem ser enviados ao GitHub

O projeto deve ignorar:

```text
node_modules/
dist/
.env
backend/.env
frontend/.env
uploads/
*.log
```

---

## Usuários de teste

### Diretor

```text
E-mail: Romulo@diretor.com
Senha: 12345678
```

### Responsável

```text
E-mail: marianorocha@gmail.com
Senha: 12345678
```

> Observação: os usuários dependem dos dados existentes no banco configurado.

---

## Status do projeto

Projeto web funcional com foco em gestão escolar infantil, autenticação por perfil, controle de frequência, rotina diária, comunicados, histórico e logs.

O sistema está preparado para evolução futura, incluindo integração com versão mobile.

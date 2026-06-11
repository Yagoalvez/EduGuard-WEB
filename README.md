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
* Proteção de rotas no frontend.
* Validação de permissões no backend.

### Alunos

* Cadastro de alunos.
* Edição de dados.
* Matrícula automática.
* Busca por nome e matrícula.
* Filtro por turma.
* Ativação e desativação.
* Remoção segura, preservando histórico quando necessário.
* Visualização de dados básicos para usuários autorizados.

### Responsáveis / Famílias

* Cadastro de responsáveis.
* Edição de dados.
* Vinculação entre responsável e aluno.
* Filtro por turma.
* Ativação e desativação de acesso.
* Reativação de acesso.
* Remoção segura quando permitido.
* Bloqueio de acesso para responsáveis inativos.
* Visualização dos alunos vinculados.

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
* Organização de alunos por série, turno e turma.

### Registro de Frequência

* Registro de entrada.
* Registro de saída.
* Validação de CPF do responsável na saída.
* Bloqueio de entrada duplicada no mesmo dia.
* Bloqueio de saída duplicada no mesmo dia.
* Filtro por turma.
* Busca por nome ou matrícula.
* Exibição dos registros computados do dia.
* Consulta de alunos presentes no dia.
* Acesso funcional restrito a Diretor e Porteiro, respeitando as permissões de cada perfil.

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
* Controle de acesso conforme perfil do usuário.

### Portal do Responsável

* Acesso separado para responsáveis.
* Visualização apenas das crianças vinculadas.
* Visualização de comunicados permitidos.
* Resposta a comunicados.
* Bloqueio de acesso para responsável inativo.
* Restrição de dados para impedir acesso a alunos não vinculados.

### Histórico do Aluno

* Timeline com registros de frequência.
* Timeline com registros de rotina.
* Filtro por turma.
* Seleção de aluno por turma.
* Consulta de informações consolidadas do aluno.

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

Perfil voltado exclusivamente ao controle de entrada e saída dos alunos.

Pode acessar funcionalmente:

* Registro de Frequência.

Pode visualizar, quando necessário para conferência no fluxo de frequência:

* Dados básicos de alunos.
* Dados básicos de responsáveis vinculados.

Não pode:

* Cadastrar alunos.
* Editar alunos.
* Remover alunos.
* Cadastrar responsáveis.
* Editar responsáveis.
* Remover responsáveis.
* Cadastrar funcionários.
* Editar funcionários.
* Remover funcionários.
* Gerenciar turmas.
* Acessar logs do sistema.
* Acessar rotina diária como módulo de gestão.
* Acessar comunicados como módulo de gestão.
* Acessar funcionalidades administrativas.

### Professor

Perfil voltado ao acompanhamento pedagógico e à rotina escolar.

Pode acessar módulos permitidos conforme as regras do sistema, sem acesso ao Registro de Frequência.

### Secretário / Coordenador

Perfis administrativos com acesso conforme permissões definidas no sistema.

Podem acessar funcionalidades administrativas de acordo com o nível de permissão atribuído.

### Responsável

Perfil externo, com acesso apenas ao Portal do Responsável.

Pode visualizar:

* Crianças vinculadas.
* Comunicados permitidos.
* Resumo/rotina quando disponível.
* Responder comunicados.

Não pode acessar dados de outros alunos ou áreas administrativas do sistema.

---

## Regras de acesso

O sistema utiliza controle de acesso por perfil.

As principais regras são:

* Usuários não autenticados não acessam rotas protegidas.
* Funcionários inativos não conseguem realizar login.
* Responsáveis inativos não conseguem acessar o portal.
* Responsáveis visualizam apenas alunos vinculados a eles.
* Porteiro possui acesso funcional somente ao Registro de Frequência.
* Diretor possui acesso administrativo completo.
* Ações sensíveis são protegidas por validações no backend.
* O frontend oculta opções de menu não permitidas para cada perfil.

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

### Verificar status do Git

```bash
git status
```

### Commit das alterações

```bash
git add .
git commit -m "Atualiza documentação do EduGuard"
git push
```

---

## Validação do sistema

Após a remoção dos módulos inativos de Dashboard e Medicação, o sistema foi validado sem referências órfãs.

Foram realizadas as seguintes verificações:

* Busca por referências antigas no projeto.
* Correção de rotas e menus.
* Build do frontend.
* Execução do backend na porta 3000.
* Validação de permissões de acesso.
* Execução do script `testGatekeeper.js`.

O script de validação do Porteiro passou em 20 cenários, confirmando a separação correta entre os acessos do Porteiro e do Diretor.

---

## Observações sobre segurança

* O arquivo `.env` não deve ser enviado ao GitHub.
* Credenciais do banco de dados devem ficar apenas no backend.
* O frontend não deve conter `DATABASE_URL`.
* O acesso ao sistema é controlado por JWT.
* Perfis possuem permissões diferentes.
* Responsáveis acessam apenas dados vinculados a eles.
* Ações administrativas são restritas a usuários autorizados.
* O Porteiro não possui permissão para gerenciar cadastros administrativos.

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

O sistema está estável sem os módulos de Dashboard e Medicação, que foram removidos por não fazerem mais parte do escopo ativo da aplicação.

O projeto está preparado para evolução futura, incluindo integração com versão mobile e expansão de novas funcionalidades conforme necessidade da escola.

---

## Autor

Projeto desenvolvido para fins acadêmicos.

**EduGuard Web** — Sistema de gestão escolar infantil.

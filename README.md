# 🚀 Backend Architecture Boilerplate

> Um boilerplate de backend robusto e escalável construído em Node.js, TypeScript, Zod e PrismaIO, aplicando rigorosamente os princípios **SOLID**, **Clean Architecture**, **Programação Orientada a Objetos (POO)** e **Inversão de Controle (IoC)**.

---

## 🛠️ Tech Stack & Ferramentas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Framework HTTP:** [Fastify](https://www.fastify.io/)
- **Injeção de Dependência (IoC):** [TSyringe](https://github.com/microsoft/tsyringe)
- **Validação de Dados:** [Zod](https://zod.dev/)
- **Segurança & Criptografia:** `bcryptjs`
- **Testes (Planejado):** Testes unitários e de integração
- **Containerização (Planejado):** Docker & Docker Compose

---

## 🏛️ Arquitetura e Decisões de Design

Este projeto foi estruturado para servir como referência de estudo e base para APIs de nível corporativo, focando nos seguintes pilares:

1. **Separação de Camadas (Clean Architecture):**
   - **Controllers:** Responsáveis estritamente pelo protocolo HTTP (receber a requisição, validar com Zod e retornar a resposta).
   - **Use Cases:** Onde residem as **Regras de Negócio** da aplicação de forma isolada e agnóstica de frameworks.
   - **Repositories / Infra:** Camada responsável pela persistência de dados (incluindo implementação em memória e suporte a banco de dados).
2. **Inversão de Controle (IoC):** Utilização do `tsyringe` para gerenciar dependências automaticamente, eliminando acoplamentos fortes e facilitando testes automatizados.
3. **Tratamento Global de Erros:** Arquitetura centralizada com classes de erros customizadas (`AppError`, `ValidationError`, `ConflictError`, etc.) e um `errorHandler` global do Fastify que padroniza todas as respostas de falha da API.
4. **Validação Rigorosa de Entrada:** Uso de Schemas do Zod na borda da aplicação, incluindo validações de domínio complexas (como validação matemática de CPF).

---

## 📁 Estrutura de Pastas

```text
src/
├── @types/                 # Definições globais de tipagem
├── config/                 # Configurações de ambiente validadas com Zod
├── modules/                # Módulos de negócio (ex: users)
│   └── users/
│       ├── DTOs/           # Contratos e interfaces de dados
│       ├── infra/          # Repositórios concretos e banco de dados
│       ├── repositories/   # Interfaces dos repositórios
│       └── useCases/       # Casos de uso, controllers e validações Zod
└── shared/                 # Recursos compartilhados da aplicação
    ├── containers/         # Configuração do Container IoC (TSyringe)
    └── http/               # Configurações do servidor, app, rotas e erros globais
```

## ⚙️ Como Executar o Projeto

1. **Clone o repositório:**

```bash
  git clone [https://github.com/seu-usuario/backend-architecture-boilerplate.git](https://github.com/seu-usuario/backend-architecture-boilerplate.git)

  cd backend-architecture-boilerplate
```

2. **Instale as dependências:**

```bash
  npm install
```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo .env na raiz baseado no seu schema de validação:

```json
  NODE_ENV="development"
  PORT=3333
  DATABASE_URL=postgresql:"//user:password@localhost:5432/db"
  JWT_SECRET="sua_chave_secreta_com_mais_de_dezesseis_caracteres"
```

4. **Execute em modo de desenvolvimento:**

```bash
  npm run dev
```

## 👨‍💻 Autor

**Jonatas Rosa Moura:** [Portfólio](https://jonatasrmoura.vercel.app/)

Desenvolvido com foco em boas práticas de engenharia de software.

<div align="center">
  <h1>Conectar - API</h1>
</div>

<p align="center">
  API RESTful para gerenciamento de clientes e usuários, desenvolvida com NestJS como parte de um desafio técnico. A aplicação implementa autenticação JWT, controle de acesso por papéis e uma arquitetura modular.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize">
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🚀 Como Executar](#-como-executar)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [📍 Estrutura dos Endpoints](#-estrutura-dos-endpoints)

---

## 📖 Sobre o Projeto

O **Conectar API** é o backend do desafio, projetado para ser uma base segura e escalável para a aplicação de frontend. Construído com **NestJS** e **TypeScript**, o projeto segue uma arquitetura modular, separando as responsabilidades em módulos, controllers e services.

O foco foi criar um sistema robusto com um sistema de autenticação completo, validação de dados de entrada (DTOs) e controle de permissões.

---

## ✨ Funcionalidades

-   🔐 **Autenticação e Autorização**:
    -   Registro e Login de usuários com **JWT (JSON Web Tokens)**.
    -   Rotas protegidas que exigem autenticação.
    -   Controle de acesso baseado em papéis (`admin`, `user`) usando Guards.

-   👤 **Gerenciamento de Usuários**:
    -   CRUD completo para usuários.
    -   Usuários `admin` podem gerenciar todos os outros usuários.
    -   Usuários `user` podem gerenciar apenas seus próprios dados.

-   👥 **Gerenciamento de Clientes**:
    -   CRUD completo para clientes.

-   🔗 **Relacionamentos**:
    -   Relação **Muitos-para-Muitos** entre usuários e clientes, gerenciada através de uma tabela de junção.

---

## 🛠️ Tecnologias Utilizadas

-   **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construir aplicações eficientes e escaláveis.
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
-   **[Sequelize](https://sequelize.org/)**: ORM (Object-Relational Mapper) para Node.js.
-   **[SQLite](https://www.sqlite.org/index.html)**: Banco de dados SQL embutido, baseado em arquivo.
-   **[Passport.js](http://www.passportjs.org/)**: Middleware de autenticação para Node.js, com estratégias `passport-jwt` e `passport-local`.
-   **[Class Validator](https://github.com/typestack/class-validator)**: Validação de DTOs baseada em decorators.
-   **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)**: Módulo para gerenciamento de variáveis de ambiente.

---

## 🚀 Como Executar

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório**
    ```bash
    git clone <url-do-seu-repositorio-api>
    ```

2.  **Navegue até o diretório do projeto**
    ```bash
    cd conectar-api
    ```

3.  **Instale as dependências**
    ```bash
    npm install
    ```

4.  **Configure as Variáveis de Ambiente**
    -   Crie um arquivo `.env` na raiz do projeto (você pode copiar o `.env.example`).
    -   Defina a variável `JWT_SECRET` com uma chave secreta forte.
    ```env
    # .env
    JWT_SECRET=SEU_SEGREDO_SUPER_SECRETO_E_LONGO
    ```

5.  **Execute a aplicação**
    ```bash
    npm run start:dev
    ```

A API estará disponível em `http://localhost:3000`.

---

## 📜 Scripts Disponíveis

-   `npm run start:dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
-   `npm run start`: Inicia o servidor em modo de produção.
-   `npm run build`: Compila o código TypeScript para JavaScript.
-   `npm run lint`: Executa o linter para análise de código.
-   `npm run test`: Executa os testes unitários e de integração.

---

## 📍 Estrutura dos Endpoints

Os principais endpoints disponíveis são:

| Método | Rota             | Descrição                               | Acesso   |
| :----- | :--------------- | :-------------------------------------- | :------- |
| `POST` | `/auth/login`    | Autentica um usuário e retorna um token | Público  |
| `POST` | `/users`         | Cria um novo usuário                    | Público  |
| `GET` | `/users`         | Lista todos os usuários                 | Admin    |
| `GET` | `/users/:id`     | Busca um usuário por ID                 | Admin    |
| `GET` | `/clients`       | Lista todos os clientes                 | Autenticado |
| `POST` | `/clients`       | Cria um novo cliente                    | Autenticado |
| `PUT` | `/clients/:id`   | Atualiza um cliente                     | Autenticado |
| `DELETE`| `/clients/:id`   | Deleta um cliente                       | Autenticado |
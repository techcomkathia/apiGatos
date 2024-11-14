# 📦 Node.js API com Autenticação (JWT, Bcrypt) e MySQL


## 📖 Sobre o Projeto
Esta é uma API desenvolvida em Node.js que implementa autenticação com `JWT` (JSON Web Token) e `bcrypt` para hashing de senhas. Ela utiliza o MySQL como banco de dados relacional. O projeto é ideal para quem precisa de uma base para iniciar o desenvolvimento de aplicações seguras com autenticação e autorização. Tem por objetivo ser base para explorar os testes com JEST. 

## ✨ Funcionalidades
- Cadastro de usuários com senha criptografada.
- Autenticação de usuários (Login).
- Geração de tokens JWT para autenticação.
- Rotas protegidas que requerem um token válido para acesso.
- Endpoints CRUD para gerenciamento de dados no banco MySQL.

## 🛠 Tecnologias Utilizadas
- **Node.js** (JavaScript no backend)
- **Express** (Framework para Node.js)
- **MySQL** (Banco de dados relacional)
- **Sequelize** (ORM para MySQL)
- **bcrypt** (Hashing de senhas)
- **JWT (jsonwebtoken)** (Autenticação baseada em token)
- **dotenv** (Gerenciamento de variáveis de ambiente)

## ⚙️ Pré-requisitos
Certifique-se de ter os seguintes itens instalados em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/downloads/) (versão 5.7 ou superior)
- [Git](https://git-scm.com/)

## 🚀 Instalação
1. Faça um **fork** deste repositório clicando no botão "Fork" no canto superior direito da página.

2. Em seguida, clone o fork na sua máquina local:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

3. Navegue até o diretório do projeto:

    ```bash
       cd nome-do-repositorio
    ```

4. Instale as dependências:

    ```bash
        npm install --save dev
    ```

5. Altere as variáveis de ambiente:
    Confirgure com os dados da sua conexão com o banco


# Projeto BackEnd (2024-1): API de Livraria 

Este projeto consiste no desenvolvimento de uma API RESTful para gerenciar uma livraria, permitindo a administração de clientes, livros, pedidos e itens relacionados aos pedidos. A API é construída utilizando Node.js com o framework Express, Sequelize como ORM, e o banco de dados SQLite.

## Funcionalidades Principais

- **Clientes**: Cadastro, consulta, atualização e exclusão de clientes.
- **Livros**: Gerenciamento de livros, incluindo cadastro, consulta, atualização e exclusão.
- **Pedidos**: Criação, consulta, atualização (fechamento) e exclusão de pedidos feitos pelos clientes.
- **Itens**: Adição, consulta, atualização e remoção de itens em um pedido aberto.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs em Node.js.
- **Sequelize**: ORM para manipulação do banco de dados relacional SQLite.
- **SQLite**: Banco de dados utilizado para armazenar as informações da API.
- **JSON Web Token (JWT)**: Utilizado para autenticação e autorização dos usuários.
- **Swagger**: Ferramenta utilizada para a documentação da API.

## Estrutura do Banco de Dados

### Tabelas

- **Admin**: Contém informações dos administradores do sistema.
- **Customer**: Tabela de clientes, armazenando informações básicas como nome, e-mail, senha, telefone e endereço.
- **Book**: Tabela de livros, contendo título, autor, preço, estoque, data de publicação e gênero.
- **Order**: Tabela de pedidos, relacionando clientes com os itens pedidos e armazenando o estado (aberto ou fechado) do pedido.
- **Item**: Tabela intermediária entre livros e pedidos, contendo a quantidade de um livro específico em um pedido.

### Relacionamentos

- Um cliente pode ter vários pedidos.
- Um pedido pertence a um cliente.
- Um pedido pode ter vários itens.
- Um item pertence a um pedido.
- Um livro pode estar relacionado a vários pedidos através da tabela de itens.
- Um pedido pode ter vários livros através da tabela de itens.

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/luanvsalmeida/API-Back-End.git
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor**:
   ```bash
   npm start
   ```

4. **Acesse a API**:
   A API estará disponível em `http://localhost:3000`.

## Autenticação

A autenticação é realizada utilizando JWT. Após o login, o token gerado deve ser incluído no cabeçalho das requisições seguintes para garantir o acesso autorizado.

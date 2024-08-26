# API-Back-End
 Projeto 2 da disciplina de Programação Web Back-end (2024-01)


## Regras de negócios API livraria

### Banco de Dados

O sistema irá registrar as informações a respeito dos clientes, administradores, livros, pedidos e itens dos pedidos.

O objeto livro terá as seguintes informações: id do livro, título, autor, preço, estoque, data de publicação e categoria.

O objeto cliente terá as seguintes informações: id do cliente, nome, e-mail, senha, telefone e endereço.

O objeto administrador terá as seguintes informações: id do administrador, nome, e-mail, senha, telefone e data de submissão.

O objeto pedido terá as seguintes informações: id do pedido, id do cliente (chave estrangeira) e data do pedido.


O objeto item do pedido terá as seguintes informações: id do item, id do pedido, id do livro, quantidade.

Um cliente pode realizar muitos pedidos, mas um pedido pertencerá a apenas um cliente (1 cliente para muitos pedidos).

Um pedido pode conter muitos livros e um livro pode aparecer em muitos pedidos (muitos para muitos).

Caso os itens data do pedido (pedido) ou data de submissão (administrador) não esteja especificada o valor padrão será a data atual.

### Operações CRUD


### Autenticação

As rotas para criação de usuário não será autenticada (pois qualquer um pode criar um usuário). 

As rotas para ler, alterar e deletar usuários só poderão ser acessadas por administradores.

As rotas para ler, criar, alterar e deletar administradores só poderão ser acessadas por administradores.

As rotas para pesquisar livros será disponível somente para usuários.

As rotas para criar, editar e deletar livros só poderão ser acessadas por adminsitradores.

Compras só poderão ser feitas por usuários e administradores.

As operações para ler, alterar ou deletar compras só poderão ser feitas pelos administradores.

As operações para criar items para compra só poderão ser feitas por usuários e administradores.

As operações restantes relacionas aos itens (pesquisar, alterar e deletar) só poderão ser feitas por administradores.

As senhas deverão ter no mínimo 8 caracteres e pelo menos um número.

Os nomes identificadores para login serão e-mail (usuário) e senha.


## Instruções para teste


### Login
rota: /api/user/signIn

Exemplo de conteúdo JSON para o body:
{
    "mail": "al.capone@mail.com"
    "password": "capone123"
}

### Criar Admininstrador ('/api/admin/newAdmin')
Exemplo de conteúdo JSON para o body
{
    "name": "Gollum",
    "mail": "precious@mail.com",
    "phone": "+55 21 98812-1232",
    "hire-date": "2024-08-22T12:34:56Z",
    "password": "gollum123"
}

### Atualizar Administrador ('/api/admin/updateAdmin')
Exemplo de conteúdo JSON para o body
{
    "id": 2,
    "name": "Zlatan Ibrahimovic",
    "mail": "zlatan@mail.com",
    "phone": "+55 11 99821-2133",
    "hireDate": "2024-02-21T12:34:56Z",
    "password": "zlatan123"
}


### Gerar Compra 
#### Método 1 Adicionar ao carrinho
Exemplo de conteúdo JSON para o body
{
    "customer_id": 0,
    "items": [
        {
            "book_id": 3,
            "quantity": 1
        },
        {
            "booke_id": 2,
            "quantity": 1
        }
    ]
}

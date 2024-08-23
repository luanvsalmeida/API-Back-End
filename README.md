# API-Back-End
 Projeto 2 da disciplina de Programação Web Back-end (2024-01)


## Regras de negócios API livraria

O sistema irá registrar as informações a respeito dos clientes, administradores, livros, pedidos, itens dos pedidos.

O objeto livro terá as seguintes informações: id do livro, título, autor, preço, estoque, data de publicação e categoria.

O objeto cliente terá as seguintes informações: id do cliente, nome, e-mail, telefone, endereço.

O objeto administrador terá as seguintes informações: id do administrador, nome, e-mail, telefone, data de submissão.

O objeto pedido terá as seguintes informações: id do pedido, id do cliente (chave estrangeira), data do pedido, total do pedido.

O objeto item do pedido terá as seguintes informações: id do item, id do pedido (chave estrangeira), id do livro (chave estrangeira), quantidade.

Um cliente pode realizar muitos pedidos, mas um pedido pertencerá a apenas um cliente (1 cliente para muitos pedidos).

Um pedido pode conter muitos livros e um livro pode aparecer em muitos pedidos (muitos para muitos).


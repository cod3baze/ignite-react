# dt money

> react with styled-components (intro)

## mirageJS

(mock) adicionar uma camada fictícia.

- API-fake: roda junto com o frontend, possuí DB, relacionamentos..

## context

- compartilhamento de estado entre vários components da aplicação

- separar uma lógica/dados, que possam ser acessados a quaisquer consumer

tipagens

```ts
// pega todos os campos da ITransaction, exceto o 'id' e createdAt
type TransactionInput = Omit<ITransaction, "id" | "createdAt">;

// pega apenas os campos informados
type TransactionInput = Pick<ITransaction, "title" | "amount">;
```

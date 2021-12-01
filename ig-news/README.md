# ig.news

### Prismic CMS

> painel de administração pra poder cadastrar infos, e servir esses dados através de uma API.

ex: Blog: os posts são criados através do CMS

### \_App.tsx

> é a pagina principal no NextJS, como o index.html no ReactJS.

- é a página que fica em volta de tudo.
- é chamado sempre que altera uma rota

- \_document.tsx: é chamado somente 1 única vez

### Stripe

- plataforma de pagamento, permite usuários fazer pagamentos com cartões de credit principalmente.

### SSR & SSG

- SSR: renderizado á partir do servidor.

  - a página vai ser construída no servidor e depois entregue ao client(navegador)

- SSG: Static Site Generation.
  - mesmo processo que o SSR. porém vai manter uma cópia do HTML estático em cache, e não vai recriar a página de novo a cada acesso.

### API routes

- server em node, pode fazer requisições no DB.
- usuário não tem acesso/debug.
- Serverless: quando hosted, não fica um server esperando as request, o server só liga quando a rota é chamada.
- as rotas são colocadas dentro da pasta: `src/api/**`.

### Auth

- JWT (storage)
- Next Auth (independe de backend): fazer login simples, login com Social...
- Authentication as a service: Cognito, Auth0

- nextAuth
  - callbacks: funções que são executadas de forma automática, assim que acontece alguma ação. ex: (signIn)

### DB

faunaDB: lida bem com Serverless através da conexão que é feita em protocolo HTTP.

- reconhece o campo pelo índex

```ts
// condicional
q.If(
  // se nao existir, cria um novo, senão pega os dados
  q.Not(q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))),
  q.Create(q.Collection("users"), { data: { email } }),
  q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
);
```

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

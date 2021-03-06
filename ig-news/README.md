# ig.news

## Frontend tests

> garantem confiança para dar manuntenção no futuro.

- **teste unitário**: garante que uma parte específica do código está funcionando.

  - testa um único component. ex: Um botão.

- **teste de integração**: testa se duas ou mais funcionalidades funcionam juntas.

  - testa se ao adicionar um user ele aparece na listagem. ex: Listagem de users | Adicionar user.

- **teste E2E**: testa a maneira que o user customa utilizar a aplicação.

  - como se fosse um roteiro. ex: Acessar página de login, digitar credentials > verificar se foi redirecionado ao dashboard.

- libs: `jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/react babel-jest -D`

- jest config

```js
module.exports = {
  testPathIgnorePatterns: ["/node_module/", "/.next/"],
  // arquivos que vao ser executados antes de rodar os tests
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  // transforma o código antes de executar: .ts para .js
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  // ambiente de execução dos tests
  testEnvironment: "jsdom",
  ,
  moduleNameMapper: {
    // converte os styles
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },
};

setupTests.ts;
// trás funcionalidades para que o jest trabalhe com a DOM
import "@testing-libary/jest-dom/extend-expect";
```

- Mocks: camadas fakes que adicionam uma funcionalidade na aplicação.

  - imitações fictícias.
  - ex: sempre que precisarmos testar um component que usa uma funcionalidade externa, o mock adiciona essa função.

  ex:

  ```tsx
  /*
    toda vez que o teste/component importar a lib *next/router*, ela vai retornar o *<return>*
  */
  jest.mock("next/router", () => {
    return {
      useRouter() {
        return {
          asPath: "/",
        };
      },
    };
  });

  test("ActiveLink renders correctly", () => {
    const { debug } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    debug();
  });
  ```

  ```tsx
  jest.mock("next-auth/client");

  it("renders correctly when users is NOT authenticated", () => {
    const useSessionMocked = mocked(useSession);

    // a próxima vez que a função *useSession* for chamada vai retornar [null, false]
    useSessionMocked.mockReturnValue([null, false]);
    // vai mockar apenas o primeiro retorno.
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with github")).toBeInTheDocument();
  });
  ```

- `identity-obj-proxy`: lib que identifica arquivos _css_ dentro dos tests no next

- `ts-jest`: lib que integra _jest_ ao **typescript**

## Prismic CMS

> painel de administração pra poder cadastrar infos, e servir esses dados através de uma API.

ex: Blog: os posts são criados através do CMS

### \_App.tsx

> é a pagina principal no NextJS, como o index.html no ReactJS.

- é a página que fica em volta de tudo.
- é chamado sempre que altera uma rota

- \_document.tsx: é chamado somente 1 única vez

### Stripe

- plataforma de pagamento, permite usuários fazer pagamentos com cartões de credit principalmente.

```js
// cria o usuário no stripe
const stripeCustomer = await stripe.customers.create({
  email: session.user.email,
});

const checkoutSession = await stripe.checkout.sessions.create({
  customer: stripeCustomer.id, // usuário fazendo a compra
  payment_method_types: ["card"],
  billing_address_collection: "required",
  line_items: [
    // produtos sendo adquiridos
    {
      price: "price_1K1jEhFUIBq7a12y00ihXAVy",
      quantity: 1,
    },
  ],
  mode: "subscription", // forma de cobrança: mensalmente...
  allow_promotion_codes: true,
  success_url: process.env.STRIPE_SUCCESS_URL,
  cancel_url: process.env.STRIPE_CANCEL_URL,
});
```

### SSR & SSG

- SSR: renderizado á partir do servidor.

  - a página vai ser construída no servidor e depois entregue ao client(navegador)

- SSG: Static Site Generation.

  - mesmo processo que o SSR. porém vai manter uma cópia do HTML estático em cache, e não vai recriar a página de novo a cada acesso.

  - getStaticPaths: necessário quando a **route** é **dynamic**

    - permite gerar as páginas estáticas durante a _build_
    - permite gerar a página estática no _primeiro acesso_
    - permite gerar a página estática em _partes das rotas_

  - ex:

  ```ts
  export const getStaticPaths = () => {
    return {
      paths: [
        {
          params: {
            slug: "uid-da-rota", // gera um estático para essa slug/página
          },
        },
      ],
      fallback: "blocking",
    };
  };

  return {
    paths: [], // gera estático apenas quando acessada
    fallback: "blocking".
    /**
     * true: se não estiver gerado, a página carrega nom lado do client.
     false: se não foi gerado ainda vai retornar 404
     blocking: se não foi gerado ainda vai carregar na camada do Next: *ServerSideRendering*
    */
  }
  ```

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

### webhook

quando uma aplicação 3° avisa a nossa aplicação de determinado evento.
ex: cartão recusado

- stipe envia os events em forma de Streams-chunks (pedaços)

- **.\stripe.exe listen --forward-to localhost:3000/api/webhooks**: vai passar todos os webhooks para determinada rota

### JAMStack

- aplicações que dependem menos de um backend.

JavaScript: funcionamento da aplicação
API: api de terceiros. ex: FAuna, stripe, CMS..
Markup: HTML, estrutura da página

- CMS
  Content Management System

- painel de administração de conteúdo. ex: criar posts.

ex:

- Wordpress
- Drupal

headless CMS: painel de ADM onde todos os dados são servidos através de uma API...

- Strapi (muitos tipos)
- Ghost (Blog)
- Keystone

- GraphCMS
- PrismicCMS
- Contentful
